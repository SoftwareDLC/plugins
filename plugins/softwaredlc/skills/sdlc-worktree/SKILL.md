---
name: sdlc-worktree
description: Safely inspect or update a SoftwareDLC repository and its isolated SDLC graph proposal. Use for SDLC context, checkout, status, projection editing, diff, validation, comparison, save, sync, recovery, or source-and-graph readiness work.
---

# SDLC Worktree

Use the dedicated `sdlc-worktree` MCP server as the capability boundary. Its
fixed tool registry permits local context and explicitly bound AI-worktree
operations; it does not expose branch, commit, pull-request, apply, merge, SQL,
RPC, generic HTTP, or destructive lifecycle actions.

## Local setup

Public questions use the bundled reference skill and need no local server.
For local graph work, Codex or Claude Code must open the intended Git
repository with Node.js 22 or newer and `@software-dlc/cli` installed globally
(`npm install -g @software-dlc/cli`). See the plugin's `../../README.md` for
prerequisites. The plugin launcher resolves the current repository root. It
runs a repository's own install and loads its optional `.env.local` only once
the user approved the repository (`sdlc allow-mcp`, run by the user in their own
terminal); otherwise it runs the global install without that `.env.local`.
When the server offers no tools, its instructions name one step (`package_missing`);
when stderr reports `repository_unapproved`, the step is the approval. Tell the
user that step and to restart the session; never run it for them, and never
install the package into their repository. The launcher never installs packages, builds them, borrows another
checkout's binding, or selects an endpoint.

When setup fails, use the returned bounded error guidance. `sdlc_context` with
`{"health":true}` supplies non-mutating diagnostics without requiring a binding.
Ask for an exact user-selected destination only when graph work requires it.
Supply credentials through the selected connection's configured environment
variable and restart the session after changing the MCP environment; never
request that the user paste a secret into chat. After a plugin refresh, a new
session picks up the updated skills and tools.

## Select the workflow

For workflow decisions, use the public `lifecycle-and-change-workflow` reference
through the reference tools below, or `docs/work-model.md` in the current
repository when available. Inspect available section IDs before selecting them;
older deployments may lack the expanded guidance. Missing or stale guidance does
not grant new authority or block independent work under known project rules.

Follow the user's authorized entry point and review gate. Documentary exploration
and source-only work need no graph binding where project policy permits;
Graph-to-Code retains its approved saved-graph input and manifest contract.
Alternatives still being evaluated, of which only one will be accepted, are
candidates of one Decision where the environment offers it (locally,
`sdlc workspace decision`). Only the selected candidate integrates; reopen the
Decision rather than integrating a rejected candidate. Give each candidate its
own workspace, and select one whole candidate; redo an idea from another
candidate in the selected one rather than composing parts. Otherwise recommend
separate SDLC branches only for mutually exclusive graph states over the same
scope. Users select/create those destinations under this workflow. Documentary
options, paths, environments, and supported variants need not branch.
A Git branch/worktree isolates source history/checkout; an SDLC branch/AI
worktree identifies graph history/a persisted proposal. Two Git worktrees bound
to one SDLC branch share its AI proposal. Keep these identities and permissions
distinct, and retain applicable final graph reconciliation/readiness gates.

## Answer public SDLC questions without a project

SoftwareDLC supplies an operating harness, repeat-run skills, tool schemas,
authoritative references, and deterministic computation libraries. These have
different responsibilities: harnesses bootstrap source selection, skills guide
repeat-run behavior, schemas define exact calls, references supply product and
ontology semantics, and libraries compute over supplied data. You remain
responsible for interpreting the user's request, reconciling the evidence, and
composing the answer.

Use `search_sdlc_reference` and `fetch_sdlc_reference` when the user asks what
SoftwareDLC is, how it adds value, how to think in its connected-system model,
how its lifecycle works, which authority boundaries it uses, or what its public
graph schema vocabulary means. These tools are anonymous and project
independent, but they come only from the hosted SoftwareDLC catalog (the
ChatGPT app); the local `sdlc-worktree` server does not provide them. When they
are unavailable, as in a local-only Claude Code or Codex installation, use the
bundled `softwaredlc-reference` skill, which carries the same curated corpus,
and never invent reference section IDs. When
using the hosted ChatGPT catalog, fetch `chatgpt-plugin-agent-guide` when the
hosted operating model is not already established. That guide assumes MCP tool
discovery, no repository filesystem or direct npm imports, optional mounted
browser computation, and an explicit ChatGPT Project binding before project
data. The local worktree workflow below is a separate repository-capable mode;
do not project its shell, sidecar, filesystem, or direct-library capabilities
onto hosted ChatGPT.
`search_sdlc_reference` is deterministic curated lexical/concept lookup—not an
LLM, embedding, vector, external-search, or answer-generation service. Treat its
results as candidate source selectors; a miss is not proof that a concept is
absent. Omit the search query to list the complete curated reference and
subsection index. For a focused question, pass the returned matched section IDs
to `fetch_sdlc_reference`, reconcile the fetched authoritative evidence, and
answer through your own reasoning. Omit `section_ids` only when the complete
reference is deliberately needed. Do not request `softwaredlc.project.json`,
choose a branch, or infer a customer context for a public product or schema
question.

The public reference plane contains curated product knowledge only. It cannot
answer questions about a user's organizations, projects, branches, worktrees,
graphs, proposals, commits, pull requests, or permissions. Those questions
must use the exact authenticated and bound workflow below.

## Resolve a hosted project binding

When the available SoftwareDLC catalog is hosted and the request concerns
project-specific data or proposal work (skip this section when only the local
`sdlc-worktree` server is available):

1. Read exactly one binding Project Source from the current ChatGPT project.
   Prefer the canonical `softwaredlc.project.json` name. When ChatGPT has added
   a numeric upload-collision suffix, accept one unambiguous
   `softwaredlc.project(N).json` source only when the canonical name is absent.
   If the source is missing, duplicated, malformed, or unavailable, stop and
   ask the user to repair it. Never infer, merge, or repair binding fields from
   conversation history.
2. Pass the complete parsed JSON object unchanged as the `binding` argument to
   `resolve`. Do not turn `remote_id` into a URL or supply any endpoint from the
   project source.
3. Require successful live resolution before `search` or `fetch`. Confirm that
   the returned canonical worktree, repository, and branch match any supplied
   stable assertions. Report the source-ref assertion status without treating
   it as identity; `unavailable` means the hosted authority lacks independent
   Git-ref metadata and must not be reported as drift or a match.
4. Treat the returned revision, roots, lifecycle, capabilities, and assertion
   status as authoritative for that invocation. The Project Source is only a
   stable non-secret binding input.
5. Use `search` and `fetch` only for the accepted branch pinned to that same
   connection. Treat the discovered catalog and live `resolve` capabilities as
   authoritative; never assume that a hosted client has graph, worktree, or
   branch write access. (The default catalog's one write is the Maintain
   `create_support_issue`; see the `support-issues` skill.)
6. When the catalog has no graph writes, stop after `resolve`/`search`/`fetch`. When
   the operator-selected `proposal_write` catalog is present, bind or create
   only through the exact first-party SoftwareDLC confirmation URL and a fresh
   opaque grant deliberately returned by the user. Never generate, infer,
   reuse, persist, or expose a confirmation grant.
7. Save only a validated proposal patch against the complete exact base and
   binding returned by live context. Use a unique idempotency key, handle a
   revision conflict by refreshing and recomputing semantic intent, and retry a
   pending transaction only through its durable receipt/status contract.
   Hosted writes may change only the isolated AI worktree. They never authorize
   branch working-data changes, commits, apply, merge, pull requests, reset,
   deletion, generic URLs, or proxy access.

Repeat resolution in every new project chat because the hosted MCP transport is
stateless. Never rely on a previous chat's resolution result as authorization.

## Establish the binding

1. Call `sdlc_context` before graph-dependent work. Independent source-only work
   may continue without SDLC binding where repository policy permits; source
   mutation still requires a named Git ref.
2. Confirm the source repository, named Git ref, source HEAD, SDLC repository
   association, explicit branch and worktree binding, selected local profile,
   state directory, and active session.
3. Stop the graph-dependent operation and ask the user to select or bind the
   ref if it is detached, unbound, stale, or inconsistent. Never inherit another
   ref's binding or silently create or change an SDLC branch.
4. Call `sdlc_worktree_skill` and follow its live instructions when available.
   Treat this bundled skill as the safe bootstrap and the live skill as the
   authoritative freshness source.

## Respect ownership boundaries

- Read SDLC branch, commit, pull-request, snapshot, and worktree data when useful.
- Write only the isolated AI worktree identified by the explicit local binding.
- Treat `.sdlc/` and `.sdlc.<profile>/` as tool-owned state. Never edit their
  configuration, SQLite stores, checkpoints, objects, connections, or receipts.
- Edit `sdlc/` only after context or status confirms it is the managed projection
  for the current binding. `sdlc/scratch/` is local-only and excluded from graph
  composition.
- Never save or replace user branch data, create commits, advance history, apply
  or merge proposals, mutate pull requests, or create/delete/rename branches.
  The user reviews and accepts proposals in the authenticated SoftwareDLC UI.
- Never use a generic network, SQL, or RPC escape hatch to bypass this boundary.

## Run the worktree loop

1. Use `sdlc_checkout` to materialize a missing projection or `sdlc_refresh` to
   update a clean one. Use `sdlc_status` before editing when state is uncertain.
2. Inspect source and graph evidence. Update the graph only when the source or
   product claim being modeled changes.
3. Edit stable-UUID entities under `sdlc/nodes/`, `sdlc/edges/`, `sdlc/paths/`,
   and `sdlc/path-relations/`, plus `sdlc/tags.json` and, only while the graph
   uses a package, `sdlc/package-uses.json`. Use `sdlc_rm` for persisted
   entity deletions so deletion intent is explicit. When an entity already has
   `meta.evidence`, edit that in its current form and never add
   `meta.source_evidence` beside it; never write `claim_object_hash` yourself,
   and drop it from any reference you change.
4. Review with `sdlc_diff` when useful and diagnose with `sdlc_validate`.
5. Save one coherent batch with `sdlc_worktree_save`. The save operation composes,
   diffs, validates, rejects unrecorded deletions, and publishes only the bound
   AI-worktree proposal.
6. Use `sdlc_sync` for durable pending-receipt recovery. On a revision conflict,
   preserve local intent, refresh current state, recompute the proposal, and retry.
7. After the last save of an import, sign what it saved with
   `sdlc_sign_graph_workspace_evidence` and the node and edge ids you wrote in
   any of its saves (at most 200 per call; signing an entity already signed
   changes nothing). It converts legacy evidence to current form and pins each
   code reference to the entity as saved; a later save that changes an entity
   leaves its signed evidence behind, so sign last. The sign changes the proposal
   on the server, so run `sdlc_refresh` next. Evidence is builder input, so
   rebuild any node `sdlc_compare` then reports with a stale build
   (`sdlc_worktree_rebuild`); a rebuild does not move the pins. A 404 without a
   reason means signing is not enabled; skip it.

## Hand off safely

Before reporting a source-and-graph slice ready:

1. Reconfirm context and require no pending or errored worktree operation.
2. Run `sdlc_validate` and resolve every graph issue at its root cause.
3. Run `sdlc_compare` with production-parity clean-merge requirements and require
   zero blockers or conflicts.
4. Run repository checks appropriate to the changed surface and state omissions.
5. Stop after reporting the proposal. Do not accept, apply, commit, or merge it.

End the handoff with an explicit `Next slice` state: `Required`, `Recommended`,
`Blocked`, or `None`. Name one bounded follow-on and intended outcome when work
can continue. Use `Required` only for unfinished acceptance/readiness scope,
`Recommended` for an optional best next increment, `Blocked` for a decision or
external condition, and `None` when no coherent follow-on is justified. Do not
replace this choice with an unranked backlog.

Keep credentials in the repository-selected environment. Do not put secrets in
plugin files, graph files, mutable state, logs, prompts, or chat output.
