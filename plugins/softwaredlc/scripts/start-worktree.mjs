#!/usr/bin/env node
import { execFileSync, spawn } from 'node:child_process';
import { constants } from 'node:fs';
import { access, lstat, readFile, realpath, stat } from 'node:fs/promises';
import { homedir } from 'node:os';
import { basename, delimiter, dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { createInterface } from 'node:readline';
import { pathToFileURL } from 'node:url';

// The installs whose sdlc-worktree-mcp bin a repository may provide, in order: @software-dlc/cli, which
// ships the MCP servers, then @software-dlc/mcp, the private workspace package they are built from, for
// the SoftwareDLC source repository, whose node_modules/@software-dlc/sdlc links sources without them.
const PACKAGES = ['@software-dlc/cli', '@software-dlc/mcp'];
const PACKAGE = PACKAGES[0];
const BIN = 'sdlc-worktree-mcp';
const APPROVALS_VERSION = 1;

function fail(code, instruction) {
  // MCP stdout is reserved for JSON-RPC. Never print caught errors or env values.
  process.stderr.write(`[softwaredlc] ${code}: ${instruction}\n`);
  process.exitCode = 1;
}

async function isFile(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

// Git without the caller's GIT_* variables, as allow-mcp runs it, so both name the same repository.
function git(cwd, args) {
  const env = Object.fromEntries(
    Object.entries(process.env).filter(([name]) => !name.startsWith('GIT_'))
  );
  return execFileSync('git', args, {
    cwd,
    env,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
    timeout: 5000
  }).trim();
}

const APPROVE = "run sdlc allow-mcp in it in the person's own terminal";

// The path an approval names for the folder at `cwd`, or null when none can (sdlc allow-mcp's
// repositoryKey and the engine's allow_mcp.repository_key hold the same rule, which
// allow-mcp-cases.json pins). Only these layouts git itself writes have a key: a checkout whose own
// .git (a directory, or a file whose gitdir: line names it) is both its git directory and the
// common directory, named by its top level; and a linked worktree whose .git file names
// <common>/worktrees/<id>, whose gitdir file names that .git back, named by its primary checkout
// (the parent of a .git common directory) or, for a bare repository (core.bare in its own config),
// the bare directory. A submodule's or a separate git directory's worktrees have no key. A
// symlinked .git, a commondir or core.worktree pointing elsewhere, or a .git file
// naming another repository's worktree entry names nothing. Throws outside a work tree.
async function repositoryKey(cwd) {
  const lines = git(cwd, [
    'rev-parse',
    '--path-format=absolute',
    '--show-toplevel',
    '--git-dir',
    '--git-common-dir'
  ]).split('\n');
  if (lines.length !== 3 || lines.some((line) => !line)) throw new Error('not a work tree');
  const [top, git_dir, common] = await Promise.all(lines.map((line) => realpath(line)));
  const dotgit = join(top, '.git'); // never followed through a symlink
  const found = await lstat(dotgit);
  if (!found.isDirectory() && !found.isFile()) return null;
  let own = dotgit;
  if (found.isFile()) {
    const named = /^gitdir: (.+)$/m.exec(await readFile(dotgit, 'utf8'));
    if (!named) return null;
    own = await realpath(resolve(top, named[1].trim()));
  }
  if (own !== git_dir) return null;
  if (git_dir === common) return top;
  if (!found.isFile() || dirname(git_dir) !== join(common, 'worktrees')) return null;
  let repository;
  if (basename(common) === '.git') repository = dirname(common);
  else if (await isBare(cwd, common)) repository = common;
  else return null;
  const named = (await readFile(join(git_dir, 'gitdir'), 'utf8')).trim();
  if (!named) return null;
  // Its folders resolved, its final .git never followed.
  const back = resolve(git_dir, named);
  return join(await realpath(dirname(back)), basename(back)) === dotgit ? repository : null;
}

// Whether the git directory's own config sets core.bare, so it has no primary checkout. Git never
// writes a .git inside a bare directory, so one holding a .git is a checkout's working tree posing
// as a bare repository through tracked files.
async function isBare(cwd, common) {
  try {
    await lstat(join(common, '.git'));
    return false;
  } catch {
    // No .git: it may be bare.
  }
  try {
    return git(cwd, ['config', '--file', join(common, 'config'), '--type=bool', '--get', 'core.bare']) === 'true';
  } catch {
    return false;
  }
}

// Whether the user approved this repository's own install (sdlc allow-mcp writes the file, after
// the person types the folder name at their terminal). A repository is its primary checkout, so
// its linked worktrees share the approval, and a moved repository is asked again. The approval
// trusts the path: whatever its install and .env.local hold now runs. The key is read from the
// session's own folder, so a core.worktree there pointing at an approved repository approves
// nothing. An unreadable file, or a folder no approval can name, approves nothing.
async function isApproved(cwd) {
  let key;
  try {
    key = await repositoryKey(cwd);
  } catch {
    return false;
  }
  if (key === null) return false;
  const config = isAbsolute(process.env.XDG_CONFIG_HOME ?? '')
    ? process.env.XDG_CONFIG_HOME
    : join(homedir(), '.config');
  try {
    const doc = JSON.parse(
      await readFile(join(config, 'softwaredlc', 'mcp-approvals.json'), 'utf8')
    );
    return (
      doc?.schema_version === APPROVALS_VERSION &&
      Array.isArray(doc.repositories) &&
      doc.repositories.some((entry) => entry?.path === key)
    );
  } catch {
    return false;
  }
}

// The server to run, or the reason there is none. An approved repository that installed one of
// PACKAGES decides (its top-level node_modules, never an ancestor's): the file the first manifest
// declaring the bin names, inside its package, imported here. Any other repository gets the first
// executable on an absolute PATH entry (a global install), run as its own process so any shim
// its package manager wrote works; `skipped` names the repository's own install it passed over, and
// `package` the approved install with no usable bin.
async function findServer(repository_root, approved) {
  const installs = [];
  for (const name of PACKAGES) {
    const package_root = join(repository_root, 'node_modules', name);
    try {
      installs.push({
        name,
        package_root,
        manifest: await readFile(join(package_root, 'package.json'), 'utf8')
      });
    } catch {
      // Not installed here.
    }
  }
  if (installs.length && approved) {
    for (const { name, package_root, manifest } of installs) {
      const unusable = { missing: 'repository', package: name };
      try {
        const bin = JSON.parse(manifest).bin?.[BIN];
        if (typeof bin !== 'string') continue;
        const root = await realpath(package_root);
        const entry = await realpath(join(package_root, bin));
        const inside = relative(root, entry);
        if (inside.startsWith(`..${sep}`) || isAbsolute(inside)) return unusable;
        return (await isFile(entry)) ? { module: entry } : unusable;
      } catch {
        return unusable;
      }
    }
    return { missing: 'repository', package: installs[0].name };
  }
  const skipped = installs[0]?.name ?? null;
  for (const dir of (process.env.PATH ?? '').split(delimiter)) {
    if (!isAbsolute(dir)) continue;
    const candidate = join(dir, BIN);
    try {
      await access(candidate, constants.X_OK);
      if (await isFile(candidate)) return { command: candidate, skipped };
    } catch {
      // Not here, or not executable; keep looking.
    }
  }
  return { missing: 'anywhere', skipped };
}

// Outside a Git repository this server has nothing to serve, but exiting shows the session a failed
// server (CONNECTION_CLOSED), as in a folder of repositories. So it answers MCP itself, with no
// tools and its reason as instructions, until the host closes standard input.
function serveNothing(code, reason) {
  process.stderr.write(`[softwaredlc] ${code}: ${reason}\n`);
  const reply = (id, body) =>
    process.stdout.write(`${JSON.stringify({ jsonrpc: '2.0', id, ...body })}\n`);
  createInterface({ input: process.stdin }).on('line', (line) => {
    let message;
    try {
      message = JSON.parse(line);
    } catch {
      return;
    }
    // A notification (no id) needs no answer.
    if (message?.id === undefined || message.id === null || typeof message.method !== 'string')
      return;
    if (message.method === 'initialize')
      reply(message.id, {
        result: {
          protocolVersion:
            typeof message.params?.protocolVersion === 'string'
              ? message.params.protocolVersion
              : '2025-06-18',
          capabilities: { tools: {} },
          serverInfo: { name: 'sdlc-worktree', version: '0.0.0' },
          instructions: reason
        }
      });
    else if (message.method === 'ping') reply(message.id, { result: {} });
    else if (message.method === 'tools/list') reply(message.id, { result: { tools: [] } });
    else
      reply(message.id, {
        error: { code: -32601, message: `${message.method} is not available here. ${reason}` }
      });
  });
}

function runCommand(command) {
  const child = spawn(command, [], { stdio: 'inherit', env: process.env });
  for (const signal of ['SIGINT', 'SIGTERM', 'SIGHUP'])
    process.on(signal, () => child.kill(signal));
  child.on('error', () =>
    fail(
      'package_unavailable',
      'The global MCP package could not start. Check its documented Node.js and build prerequisites, then restart the session.'
    )
  );
  child.on('exit', (code, signal) => {
    process.exitCode = code ?? (signal ? 1 : 0);
  });
}

async function start() {
  if (Number(process.versions.node.split('.')[0]) < 22) {
    fail('node_version', 'Use Node.js 22 or newer, then restart the session.');
    return;
  }

  let repository_root;
  try {
    repository_root = git(process.cwd(), ['rev-parse', '--show-toplevel']);
  } catch {
    serveNothing(
      'source_unavailable',
      'No Git repository is open in this session, so the sdlc-worktree server offers no tools here; its tools work in one Git repository, so open one to use them. In a folder that holds several repositories, read and build the local graph with the sdlc command (the local-graph-start skill). Public SoftwareDLC questions can use the bundled softwaredlc-reference skill without a repository.'
    );
    return;
  }

  const approved = await isApproved(process.cwd());
  const server = await findServer(repository_root, approved);
  // With no server to run, stay connected with no tools (as outside Git), so a first session shows
  // no failed server. The text is for the person: the agent relays the step and never runs it, and
  // it names only a global install and no path.
  if (server.missing) {
    const relay =
      'The sdlc-worktree server offers no tools until the person does the step below. Tell the person the step and let them run it in their own terminal; never run it yourself.';
    const global = `install ${PACKAGE} globally with npm install -g ${PACKAGE}`;
    const step =
      server.missing === 'repository'
        ? `This repository is approved, so the plugin runs only its own ${server.package} install, which has no usable ${BIN} bin. Step: if the sdlc command is missing, ${global}; then revoke the approval (run sdlc allow-mcp --revoke in it in the person's own terminal) so the global install runs, or instead rebuild the install the person approved; then restart the session.`
        : server.skipped
          ? `This repository has its own ${server.skipped} install, which the plugin runs only once the person approves the repository. Step: approve it (${APPROVE}, typing the folder name when asked), or ${global}; then restart the session.`
          : `The SoftwareDLC command line is not installed. Step: ${global}, then restart the session. Never install it into this repository.`;
    serveNothing('package_missing', `${relay} ${step} The plugin does not install or build anything itself.`);
    return;
  }
  const skipped_env =
    !approved && (await isFile(join(repository_root, '.env.local')));
  if (server.skipped || skipped_env)
    process.stderr.write(
      `[softwaredlc] repository_unapproved: running the global ${PACKAGE}${server.skipped ? " instead of this repository's own install" : ''}${skipped_env ? ' without its .env.local' : ''}; approve the repository to use ${server.skipped && skipped_env ? 'them' : 'it'} (${APPROVE}).\n`
    );

  // Only this repository supplies source context, credentials, and graph binding, and only once
  // approved: its .env.local could otherwise set NODE_OPTIONS or a loader variable for the server.
  try {
    process.chdir(repository_root);
    if (approved) process.loadEnvFile(join(repository_root, '.env.local'));
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      fail(
        'environment_unreadable',
        'Check that this repository and its .env.local are readable and well formed, then restart the session. Keep credentials out of chat.'
      );
      return;
    }
  }

  if (server.command) {
    runCommand(server.command);
    return;
  }
  try {
    await import(pathToFileURL(server.module).href);
  } catch {
    fail(
      'package_unavailable',
      'The local MCP package could not load. Check its documented Node.js and build prerequisites, then restart the session.'
    );
  }
}

await start();
