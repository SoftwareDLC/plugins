---
name: softwaredlc-setup
description: Help the user set up the SoftwareDLC command line, sdlc, which the plugin's local skills and its local sdlc-worktree server need. Use when sdlc is missing or too old, when the sdlc-worktree server offers no tools in a Git repository and its instructions ask the user to install sdlc, approve a repository, or rebuild or revoke an approved install, or when the user asks how to install, update, or approve SoftwareDLC on their machine. Not for hosted sign-in (the softwaredlc-hosted connector) or public questions about SoftwareDLC (softwaredlc-reference).
---

# Set up the SoftwareDLC command line

The local skills (`local-graph-start`, `sdlc-worktree`) and the plugin's local
`sdlc-worktree` server need one thing on the user's machine: the `sdlc`
command line of the `@software-dlc/cli` package, on Node.js 22 or newer.

You may run the read-only checks below yourself. Every step that installs,
approves, or revokes is the user's: tell them the exact command, let them run
it in their own terminal, and wait for them to say it is done. Never run those
steps for them, and never install the package into one of their repositories.

## 1. Check what is there

Run these and read the results:

- `node --version`: Node.js 22 or newer is needed. If it is older or missing,
  tell the user to install a current Node.js from nodejs.org or their usual
  package manager, then come back.
- `command -v sdlc`, then `sdlc --version`: whether the command line is
  installed, and which version.

## 2. Install or update it

If `sdlc` is missing, or older than the skill the user wants to use says it
needs, give the user this command to run in their own terminal:

```bash
npm install -g @software-dlc/cli@latest
```

It installs into npm's global folder, outside every repository. On some
systems that folder is shared by every user and the install needs
administrator rights; that choice is the user's.
When they say it finished, run `sdlc --version` again to confirm.

## 3. A repository's own install

Some repositories install `@software-dlc/cli` themselves. The plugin's local
server runs a repository's own install only after the user approves that
repository once, and otherwise runs the global install from step 2. If the
user wants the repository's own install, give them this command to run in
their own terminal, inside that repository:

```bash
sdlc allow-mcp
```

It asks them to type the folder's name. Before they do, tell them what the
approval allows: at every session start, the plugin runs whatever that
repository's own install then holds and loads the repository's `.env.local`,
until they revoke it. `sdlc allow-mcp --list` shows their approvals and
`sdlc allow-mcp --revoke` removes this repository's.

An approved repository whose own install has no usable `sdlc-worktree-mcp`
program leaves the server with no tools; one whose program fails to load
shows a failed server. Either way the user rebuilds that install, or revokes
the approval so the global install runs.

## 4. Restart

The local server starts with the session. After an install, an update, an
approval, or a revoke, tell the user to restart the session; the new session
picks up the change.
