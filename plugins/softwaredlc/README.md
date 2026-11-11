# SoftwareDLC for Claude Code

**Beta.** SoftwareDLC is in Beta: skills, tools and the graph schema can still
change between versions.

SoftwareDLC keeps a graph of your software: the products, features and user
stories it serves, the components and code that build them, and the evidence
that links the two. This plugin brings that graph into Claude Code:

- **Start a graph from your code.** The `local-graph-start` skill has Claude
  build a first graph from repositories you already have, on your machine,
  with no SoftwareDLC account. The graph lives in Git-ignored folders of one
  repository, with its history under that repository's `.git` folder, and
  nothing is committed to your repositories.
- **Work on a bound repository.** The `sdlc-worktree` skill and its local MCP
  server let Claude inspect, edit, validate and compare the SDLC graph of a
  repository you have bound to a SoftwareDLC project, in an isolated AI
  worktree. Branch changes, commits, applying and merging stay in the
  SoftwareDLC app.
- **Read your SoftwareDLC projects.** The `softwaredlc-hosted` connector lists
  the organizations, projects and branches you can read and searches their
  graphs. Its one write is logging a support issue.
- **Support issues.** With the connector, the `support-issues` skill lists and
  reads Maintain support issues on projects where you are support staff, and
  logs new ones where you may also comment on the project.
- **Ask about SoftwareDLC.** The `softwaredlc-reference` skill answers
  questions about SoftwareDLC and its graph vocabulary, with no login.

## Install

```text
/plugin marketplace add SoftwareDLC/plugins
/plugin install softwaredlc@softwaredlc
```

The local skills need Node.js 22 or newer and the `sdlc` command line tool:

```bash
npm install -g @software-dlc/cli
```

or install `@software-dlc/cli` as a development dependency of the repository.
The plugin never installs or builds anything itself.

The local MCP server runs a repository's own installed copy of the tool only
after you approve that repository once, in your own terminal:

```bash
sdlc allow-mcp            # in the repository; --list and --revoke show and undo approvals
```

Until then it runs the copy on your `PATH`. Restart the Claude Code session
after approving.

## What the plugin runs, sends and stores

- **Runs on your machine.** The `sdlc-worktree` MCP server starts
  `scripts/start-worktree.mjs` with Node.js. The script finds the current Git
  repository's root (it runs `git`), then runs the `sdlc-worktree-mcp` program
  of `@software-dlc/cli`: the repository's own installed copy once you approved
  the repository, and otherwise the one on your `PATH`. For an approved
  repository it also loads that repository's `.env.local`. Skills ask Claude to
  run commands in your terminal, which you see and approve as usual: `sdlc`
  commands, read-only `git` commands such as `git status`, and, in
  `local-graph-start`, scripts Claude writes to read your code into the graph.
- **Sends to SoftwareDLC.** The `softwaredlc-hosted` connector is on by
  default and connects to `https://www.softwaredlc.com/api/mcp`. Until you sign
  in with `/mcp`, the service answers only with a sign-in request. Once you sign
  in, the connector sends your sign-in token, the plugin's version, and the tool
  calls you make: searches, the organization, project, branch and documents you
  pick, and the text of a support issue you log. SoftwareDLC records your tool
  use as described in its Privacy Policy. The local server sends
  graph changes to the SoftwareDLC service only for a repository you have bound
  to a SoftwareDLC project, with that binding's credential. A local graph made
  with `local-graph-start` sends nothing.
- **Stores on your machine.** Graph files in the repository's Git-ignored
  SoftwareDLC folders (`sdlc/` and `.sdlc/`), the local graph's history in
  `.git/sdlc/`, two lines that `local-graph-start` adds to `.git/info/exclude`
  to keep those folders out of Git, and your repository approvals in
  `~/.config/softwaredlc/mcp-approvals.json` (or under `$XDG_CONFIG_HOME`).

To use only the local tools, turn `softwaredlc-hosted` off in `/mcp`.

## Privacy, terms and support

- Privacy Policy: https://www.softwaredlc.com/privacy-policy
- Terms of Service: https://www.softwaredlc.com/terms
- Support: support@softwaredlc.com

## License

The plugin is licensed under the Functional Source License, Version 1.1, with
Apache 2.0 as the future license (FSL-1.1-ALv2); see `LICENSE`.
