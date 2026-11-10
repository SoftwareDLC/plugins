# SoftwareDLC local server (Codex and Claude Code)

**Beta.** SoftwareDLC is in Beta: skills, tools and the graph schema can
still change between versions.

The plugin bundles public reference skills and a local AI-worktree MCP server.
Public product/schema questions need no login, Git checkout, or project binding.

For repository graph work, open the intended Git repository in Codex or Claude
Code and use Node.js 22 or newer. Install `@software-dlc/cli`, which ships the
MCP servers, in that repository (`npm install --save-dev @software-dlc/cli`, or your package
manager's equivalent) or globally (`npm install -g @software-dlc/cli`). In the SoftwareDLC source repository, use
its documented dependency setup, then `pnpm build:packages`. The plugin does
not install dependencies, build packages, select a branch, or copy bindings.

Both hosts run one launcher, `scripts/start-worktree.mjs`. Claude Code runs it
from the plugin root (`${CLAUDE_PLUGIN_ROOT}`). The Codex MCP config embeds it
as a Node.js module evaluated in the session's working directory, which avoids
resolving a plugin-relative executable against the repository or changing cwd
to the plugin cache; the package contract checks that the embedded code matches
the script. The launcher finds the current Git repository's root even when the
session starts in a subdirectory. Once you approved that repository, it runs
the `sdlc-worktree-mcp` bin of the `@software-dlc/cli` installed in that
root's `node_modules` (never an ancestor folder's) and loads only that root's
optional `.env.local`. Otherwise it runs the `sdlc-worktree-mcp` on `PATH`
without the repository's `.env.local`, and says so on stderr when the
repository has either; with no install on `PATH` either, it returns
`package_missing` guidance. Approve a repository once per machine with
`sdlc allow-mcp` run in it in your own terminal (`--revoke` and `--list` undo
and show approvals), type
the folder's name when it asks, then restart the session. It asks at the
controlling terminal, so an agent's ordinary tool call, which has none, cannot
approve through it. That keeps the decision with you; it does not stop an agent
set on it, which could run the command under a pseudo-terminal of its own, or
write the approvals file itself. The approval is kept in
`$XDG_CONFIG_HOME/softwaredlc/mcp-approvals.json` (else `~/.config/softwaredlc/`)
and names the repository's primary checkout, so its linked worktrees share it
and a moved repository is asked again. Only layouts Git itself writes can be
approved: a checkout whose own `.git` is its Git directory, and a linked
worktree its primary checkout's `.git/worktrees` entry names back (for a bare
repository, its `worktrees` entry, and the approval names the bare directory). A symlinked
`.git`, a `core.worktree` or `commondir` pointing elsewhere, and the worktrees
of a submodule or a separate Git directory are never approved. The approval
trusts that path, as an editor's folder trust does: at every session start the
plugin runs whatever the folder's install and `.env.local` then hold, after a
pull, an install or a re-clone too, until you revoke it. The launcher speaks
MCP over standard input, so it cannot ask itself. Started outside a Git repository, such as a
folder that holds several repositories, the launcher stays connected with no
tools, and its MCP instructions say why and point to the `sdlc` command (the
`local-graph-start` skill), so the session lists no failed server. Host environment variables also work. The selected trusted SDLC connection decides
which credential variable to use; an ambient endpoint or another checkout's key
does not select a connection. Keep credentials out of plugin files and chat.

Start with `sdlc_context`. For incomplete setup, `sdlc_context` with
`{"health":true}` provides non-mutating local diagnostics. Establish the exact
user-selected binding through the supported CLI workflow before graph work.
Source-only work can continue without a binding where repository policy allows.

Startup diagnostics go to stderr; MCP stdout remains JSON-RPC only. Missing
packages, bindings, credentials, sessions, and projections have bounded setup
guidance. Unknown provider failures remain redacted: inspect status and pending
receipts before retrying a mutation, since a transport error does not prove it
was rolled back.

After updating the authored package, reinstall `softwaredlc@personal` through
the configured local marketplace and start a new session. Existing
sessions retain their loaded tools and instructions. The Claude manifest adds
the optional hosted connector beside the same launcher.

# SoftwareDLC in Claude

Each hosted environment is its own OAuth issuer and database, so Claude
connects to one environment per connector.

Staging is behind Vercel Authentication, which neither a claude.ai connector
nor this plugin's connector can pass, so Claude uses local development or
production.

**Claude Code.** Invited SoftwareDLC users, with access to the private
SoftwareDLC/plugins-internal repository, add
`/plugin marketplace add SoftwareDLC/plugins-internal` (never
SoftwareDLC/plugins, the public repository; the internal `staging` branch
carries what SoftwareDLC staging runs). Everyone else adds the public
`/plugin marketplace add SoftwareDLC/plugins`. Either way, install
`softwaredlc@softwaredlc`. A checkout of the source repository installs
`softwaredlc@softwaredlc-local` from its marketplace
(`.claude-plugin/marketplace.json`). It runs the same local
`sdlc-worktree` server. The `softwaredlc-hosted` connector is on by default
against `https://www.softwaredlc.com` and waits for sign-in. For local
development, set the plugin's `hosted_origin` to `https://localhost:3000` in
`/plugin manage` (no tunnel, since Claude Code runs on this machine). A
local-only user turns `softwaredlc-hosted` off in `/mcp`. The connector belongs to the signed-in user, not
to one branch: `list_targets` lists the organizations, projects, and branches
the user may read, and the read-only `search_branch` and `fetch` read whichever
branch the chat chose.

**Support issues.** The `support-issues` skill, in Claude Code, Codex, and
the claude.ai zip, directs the hosted connector's `list_support_issues`,
`get_support_issue`, and `create_support_issue` tools. They list, read, and
log Maintain support issues as the signed-in user, only on projects where that
user is Maintain support staff; logging an issue is the one write the
connector makes. Codex declares no hosted server, so a Codex user connects the
SoftwareDLC app or adds the hosted URL as an HTTP MCP server.

**Local graph start.** The `local-graph-start` skill, in Claude Code and
Codex, has the agent build a first SDLC graph from code the user already has,
in one repository or several, with no SoftwareDLC account. The graph
lives in a Git-ignored local workspace of one home repository, each
repository's code is cited with `sdlc workspace evidence record`, and nothing
is committed to the user's repositories. It needs only the `sdlc` command of
`@software-dlc/cli`.

**claude.ai.** claude.ai loads skills and remote MCP servers with fixed URLs.
It ignores local servers and `${user_config.*}`, so it gets its own zip:

```bash
pnpm plugin:claude-ai production    # artifacts/claude-ai/softwaredlc-connector.zip
```

Its plugin is named `softwaredlc-connector`, not `softwaredlc`: the Claude
desktop app loads only the claude.ai copy of a plugin that is also installed
under the same name, so an upload named `softwaredlc` would hide this
plugin's local skills in desktop sessions. The zip holds the `softwaredlc-reference` and `support-issues` skills, the claude.ai-only
`softwaredlc-hosted` skill (`claude-ai/skills/`), and the connector
`https://www.softwaredlc.com/api/mcp?auth=required`. It leaves out the
`sdlc-worktree` and `local-graph-start` skills and the local server, which
need a local checkout or shell. One zip serves
every user and branch: the user picks a project and branch in chat and can
switch at any time.

If the account has an earlier upload named `softwaredlc`, remove it first
under Customize > Plugins: while it stays, desktop sessions keep loading it in
place of this plugin (`claude plugin list` shows it as `softwaredlc@synced`).
Then upload the zip under Customize > Plugins > Add, and
connect its connector on the plugin's Connectors tab (a new plugin's
connector is connected again). For direct MCP access without the plugin, add the
same URL as a custom connector instead.

claude.ai registers a new OAuth client on every Connect click, so an operator
cannot approve it by client id. Production admits any client whose only
callback is `https://claude.ai/api/mcp/auth_callback`
(`docs/runbooks/mcp-oauth-production-cutover.md`, step 5b). The user still
signs in and consents, and the connection shows as Unreviewed in Connected
apps.
Reconnecting the same connector reuses its client; deleting and re-adding it
registers a new client that needs approval again.
