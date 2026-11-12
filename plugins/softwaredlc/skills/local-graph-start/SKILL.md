---
name: local-graph-start
description: Build a first SoftwareDLC graph from code the user already has, on their machine, with no SoftwareDLC account and nothing committed to their repositories. Use when the user wants to try SoftwareDLC on an existing repository or a folder of repositories, map or model an existing codebase into an SDLC graph, or start a local graph from code. Not for hosted projects, the bound AI-worktree flow (sdlc-worktree), or public questions about SoftwareDLC (softwaredlc-reference).
---

# Start a local graph from existing code

Build a first SDLC graph from the user's code in a local workspace. Everything
stays on this machine. You never commit, push, install packages into, or edit
tracked files of the user's repositories, and nothing the flow adds is
tracked:

- The graph lives in Git-ignored `sdlc/` and `.sdlc/` folders of one home
  repository, with its history in that repository's `.git/sdlc/` directory.
  Code in every other repository in scope is cited from that one graph; the
  other repositories get no folders at all.
- `sdlc` commands other than `sdlc workspace`, and the plugin's sdlc-worktree
  tools, take a lock folder, `.sdlc.transition/`, at the root of the checkout
  they run in. This flow does not need them, and the folder is empty while no
  command runs, so Git does not list it.

## 1. Find the command

You need one command: `sdlc`, the graph CLI of the `@software-dlc/cli`
package (Node.js 22 or newer).

Check with `command -v sdlc`, then `sdlc --version`: this skill describes
version 0.157.5 or newer of `@software-dlc/cli`. If it is missing or older, follow the
`softwaredlc-setup` skill: the user installs or updates it globally in their
own terminal (`npm install -g @software-dlc/cli@latest`), and you check
`sdlc --version` again once they say it is done. The install is theirs to run
or decline. Never install the package into the user's repositories.

## 2. Agree the scope

Before reading code in depth, list what you found and confirm with the user:

- the repositories (one, or each Git repository in the folder) and the paths
  to leave out (vendored code, generated code, fixtures);
- the graph's home: the one repository whose `sdlc/` folder holds the graph.
  Suggest the repository that is closest to the system's entry point. The
  home only stores the graph and changes nothing it models;
- the depth: systems and containers only, or down to operations, tables,
  pages and key functions (the default).

Check each repository's origin with `git -C <repository> remote get-url
origin`. Code can be cited only from a repository whose origin names
`owner/name`; tell the user now which repositories, if any, will stay
uncited.

Say that nothing will be committed to their repositories, and that the only
files you add are the Git-ignored `sdlc/` and `.sdlc/` folders in the home
repository, with the graph's history in its `.git/sdlc/` directory.

## 3. Start the local graph

In the home repository only:

1. Append two lines to `.git/info/exclude` (create the file if needed):
   `/sdlc/` and `/.sdlc/`. Do not edit `.gitignore`, which is tracked.
2. Run `sdlc workspace init`. In a repository with no graph yet it starts an
   empty one. If it says `sdlc/ is not ignored by Git`, step 1 is missing.
   Run on a repository that already has a local graph, it prints that graph's
   status and changes nothing: continue from it. Read what it holds with
   `sdlc workspace find` and `sdlc workspace show` (step 6), tell the user
   what it covers, and add what the agreed depth lacks, such as the top-level
   system, actors, or a context description, rather than starting over.
   Rebuild it only if the user asks. If it says the worktree is
   `registered as closed`, stop and ask the user.
3. Keep the home repository on the Git branch init ran on. The graph is
   attached to that branch, and every commit refuses while the checkout is on
   another; `git switch` back to continue. To cite code from another branch
   of the home repository, record it with `--commit <ref>` (step 5) instead
   of switching.

Never run `sdlc workspace init` in the other repositories. One graph covers
every repository in scope, and this is a first graph for reading and
planning.

## 4. Model the code

Read the bundled `softwaredlc-reference` skill's
`references/public-graph-schema.md` first: it defines every node type,
relationship type, and which pairs are valid. Read it, and any other file of
this plugin, with your file-reading tool, not a shell command, so reading
never asks the user for permission. Then survey each repository and write
entity files in the home repository's `sdlc/` folder. To write them with a
script, save the script to a file with your file-writing tool and run that
file, rather than passing it inline or as a heredoc:

- `sdlc/nodes/<uuid>.json`:
  `{"id": "<uuid>", "type": "<node type>", "parentId": "<parent uuid>", "position": {"x": 0, "y": 0}, "data": {"data": {"label": "<name>", "description": "<what it does>"}, "meta": {}}}`
  (omit `parentId` for top-level nodes). A type's own fields go beside
  `label`, under the type's name: a `database` takes
  `"database": {"type": "dynamodb"}`, whose `type` is its engine;
- `sdlc/edges/<uuid>.json`:
  `{"id": "<uuid>", "source": "<node uuid>", "target": "<node uuid>", "type": "standard", "data": {"data": {"type": "<relationship type>", "label": "<relationship type>"}}}`.

Use a fresh random UUID (version 4) for every entity. Model from the outside
in, as the import guidance does. Each node goes under the parent named here.
The commit refuses a parent type the schema does not allow, and names it, but
it cannot tell a wrong parent of an allowed type:

1. one top-level `system` for the product, and top-level `actor` nodes for
   the people and outside systems that use it, with
   `"actor": {"actor_kind": "external_system"}` for such a system. An outside
   system the product uses instead (a payment provider, say) is a top-level
   `system` with `"system": {"external": true}`, which the product's `system`
   `integrates_with`;
2. one top-level `context` holding the deployables, with an edge from the
   system to it (`implements`);
3. under the context, one node per runnable or store: `container` (services,
   workers, CLIs), `website` or `app` (user interfaces), `database`,
   `message_broker`, `cache`, `object_store`, and a `library` for each shared
   package that is not deployed on its own (a workspace package, or an
   internal module other repositories install). Cite a library's entry
   source files, not only its manifest (`package.json` and the like), which
   coverage does not count as code;
4. under each container (or website or app): `http_operation`,
   `rpc_operation` and `async_operation` nodes for its routes and handlers,
   `function` nodes for entry points and key logic, `job` nodes for scheduled
   work, and `component` nodes only to name a major module. A function an
   operation runs either sits under that operation, with no edge between
   them, or beside it, with an `executes` edge: never both;
5. under each `database`, its `table` nodes; under each `website` or `app`,
   its `page` nodes, one per UI route;
6. the relationships between them.

Not every relationship is allowed between every pair; the reference's
relationship sections and canonical examples say which, and the commit in
step 6 refuses a pair the schema does not allow and names it. The ones a
first graph mostly needs:

- `actor` `interacts` with a `page`, `website` or `app`;
- a `page` `uses` the `http_operation` (or other operation) it calls;
- an operation `executes` a `function` that does not sit under it;
- a `function` `reads_from` or `writes_to` a `table`, `uses` or `executes`
  another function, and `publishes` to a broker's `topic` or `queue`;
- a `container` `depends_on` another container, a `library` it uses, or a
  store (`database`, `cache`, `message_broker`); a `system`
  `integrates_with` an outside `system`.

Placing a node under another already says the parent holds it, so draw no
edge between a node and its own ancestor or descendant: a container does not
`implements` the components under it. The commit lists such an edge under
`validation.warnings` as `EDGE_HIERARCHY_ANCESTOR_DESCENDANT_ANTIPATTERN`, as
a hosted save does; remove the edge, or move one node out from under the
other.

Leave out what the first graph cannot carry well:

- `ui_frame` and `ui_component_definition`: each needs a complete screen
  layout (`root_instance_tree`), which is design work, not something to infer
  from code;
- `product`, `feature`, `story` and their `start`, `process` and `end`
  flows: they record intent, which the user states, not the code. Offer to
  draft them with the user afterwards.

Describe what each node does in the system, not how its file is laid out.
Leave out what you cannot support from the code; never invent features.

## 5. Cite the code

For each node that code implements, list its files in a sources file outside
every repository (your scratch or temp folder), one file per repository:

```json
{
  "nodes": {
    "<node uuid>": [{ "path": "src/billing/charge.ts", "symbol": "chargeCard" }]
  }
}
```

`path` is relative to that repository. `symbol` (a name the file declares:
`default` for an `export default`, named or not, and `initChat` for
`window.initChat = function () {…}`),
`lines` (`[start, end]`, 1-based) and `relation` (default `defines`; use
`references` or `calls` for a file that only uses the name) are optional.
A node holds at most 100 references: for a node whose code spans more files
(a schema folder of migrations, say), cite the folder holding them once,
`{ "path": "schema/postgres" }`, instead of each file.
Then record each repository's references into the home graph and sign them:

```text
sdlc workspace evidence record --repository <repository> --graph <home repository> --sources <sources file> --sign
```

`--graph` names the home repository, whose graph the references go into;
`--repository` names the repository whose code they cite.

It checks every path, range and symbol at the repository's `HEAD`, writes the
references that hold, and lists each one that does not under `not_recorded`
(every reference of a node that would pass 100 among them, with the folder to
cite); it then exits 4 instead of 0. Fix each listed entry and run it again;
the references already written are replaced, not doubled. `--sign` pins each
reference it wrote to its node as it is now, so the graph can tell later when
a node's description moves on from the code it cites. Sign only references to
code you read for that node.

The references live in each entity file's `data.meta.evidence`. When you edit
a node or edge file after recording, change only the fields you mean to and
keep that block; writing the file again from scratch drops them. A commit that
drops references warns and names the entities; run `record` again for them.

When a checkout is behind the code to cite (its `HEAD` is an old branch, say,
while `upstream/main` has the current code), add `--commit <ref>`, for
example `--commit upstream/main`, to check and record against that commit
instead of `HEAD`. Model from that commit too (`git -C <repository> show
<ref>:<path>`), and never check it out: the user's working files stay as they
are.

References name the repository `owner/name` from the first hosted remote whose
fetched branches hold the recorded commit, trying the remote `main` (else
`master`, else the current branch) tracks, then `origin`, then the other
remotes a branch tracks, then the rest; when none holds it, the first of
those. `origin`, when first, gives way to a remote named `upstream` if its
main line (`origin/HEAD`, else `main`, else `master`) holds nothing past
upstream's fetched branches. So a fork checked out on its
upstream's commits, or whose main line is level with or behind its upstream,
is named from upstream even when its only branch tracks the fork or it has
pushed feature branches; a fork whose main line has commits of its own keeps
its own name; and a commit not yet pushed anywhere names the checkout's
`origin` first. A repository
with no remote of the form `owner/name` cannot be recorded; tell the user its
nodes stay uncited.

## 6. Commit and check coverage

1. In the home repository, run
   `sdlc workspace commit --message "First local graph"`. It validates the
   whole graph first; fix each reported issue at its cause and commit again.
   (`sdlc validate` and `sdlc save` are for hosted projects; do not use them
   here.)
2. Run `sdlc workspace evidence status --behind` in the home repository. A
   node you changed after signing it (fixing a commit issue, say) is listed
   as behind: check its references still describe it, sign it again with
   `sdlc workspace evidence sign --node <node uuid> --repository <repository>`
   once for each repository it cites (each run signs only the references
   citing that repository, and lists the others under `skipped`), and commit
   again.
3. For each repository, list the code files no node cites:
   `sdlc workspace evidence coverage --repository <repository> --graph <home repository> --commit HEAD --files`.
   If you recorded with `--commit <ref>`, give that ref in place of `HEAD`.
   A reference to a folder covers the files under it, so one node citing
   `src/` covers every file there, and the output says how many files are
   covered only through a cited folder. Minified bundles, `.d.ts`
   declarations, and files under `vendor/` or `node_modules/` are not
   counted.
4. If whole areas are missing that the agreed depth covers, do one follow-up
   pass: model them, cite and sign them, and commit again. An area covered
   only through a folder counts as missing when the agreed depth asks for
   its parts. Do not loop further.

The home repository can answer questions about the committed graph without
reading its files:

- `sdlc workspace blast-radius --files-from <file>` lists the nodes a set of
  changed files reaches. Give it one path per line, written
  `<owner>/<name>:<path>` for a file in another repository of the graph
  (`<name>:<path>` when one repository has that name), or `-` to read the list
  from standard input. Use it to show the user what the graph can tell them
  about a change.
- `sdlc workspace find <term>... [--type story,feature] [--limit <n>]` takes
  words or a pasted question, leaving out common words once there are several,
  and ranks a label holding a quoted phrase whole first, then labels holding
  more of the words, then nodes matching more of them, then by where (label,
  id, description, acceptance criteria, other data). Each row gives the id, type, label, a
  short description, the parent and its label, and where it matched.
- `sdlc workspace show <id>...` reads nodes or edges with their acceptance
  criteria, the files they cite, and up to 50 relations each way, leaving
  out layout and cutting a long field to `--budget` characters (2000 by
  default) with its size; `--full` gives each as stored.

## 7. Report

Tell the user:

- what the graph covers, by system, container and journey, with counts of
  nodes and relationships;
- what it does not cover: the coverage results, giving the files a node
  names directly apart from the files covered only through a cited folder
  (never only their sum, which reads as near-complete when a few nodes cite
  top-level folders), and anything you left out on purpose;
- where it lives (the home repository's `sdlc/` and `.sdlc/` folders and its
  `.git/sdlc/` directory) and that `git status` in every repository is
  unchanged; run it to confirm;
- how to remove it: delete the home repository's `sdlc/` and `.sdlc/` folders
  and its `.git/sdlc/` directory, and take the two lines out of
  `.git/info/exclude`. Removal is the user's to run; give them the commands.

Then offer next steps: plan a change against the graph, or refine an area.
