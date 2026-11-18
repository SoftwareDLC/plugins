<!-- Generated from the SoftwareDLC public reference corpus. Do not edit. -->
# Lifecycle and change workflow

Reference ID: `lifecycle-and-change-workflow` · Version: 2026-10-09 · Topics: workflow, authority

Flexible exploration, planning and implementation with coherent graph proposals, explicit artifact responsibilities, and unchanged authority boundaries.

## Proposal loop

Section ID: `proposal-loop` (workflow)

For graph proposal work, resolve an exact destination and inspect current context.
Create a coherent isolated proposal; validate it and compare it with authoritative base and current state before handoff.
In the local AI worktree workflow, hand the proposal to the user for apply, commit, pull-request, approval, and merge decisions. Saving a proposal does not accept it into user-owned branch state.
A graph proposal may follow documentary exploration or implementation. This proposal loop is not a requirement to model every task up front.

## Change safety

Section ID: `change-safety` (boundaries)

Revisions, semantic roots, idempotency receipts, and exact bindings reject stale or ambiguous writes.
Interrupted delivery may recover only the same exact transaction; semantic conflicts require refresh and recomputation while preserving intended work.
Plugin possession or conversational intent does not confer project or acceptance authority. Workflow preferences never widen callable capabilities or permissions.
When the base, accepted scope, requirements, or applicable policy changes, checkpoint and re-evaluate affected work. Identify changed inputs rather than silently changing the contract.

## Flexible entry and progressive structure

Section ID: `flexible-entry` (principles)

Users can explore, plan, model, implement, and reconcile in the order their authorized task needs. SDLC recommends increasing structure as it becomes useful, not a mandatory lifecycle state machine.
A useful progression is rough exploration, structured plan/design, graph proposal when structural precision helps, implementation, then reconciliation and validation. Move backward or forward when evidence requires it.
Support brainstorming in documents, direct graph planning, imported specifications, conversation-led work, code-first work, and mixed workflows. Reuse an adequate existing plan.
Mature graph-representable structural intent belongs in coherent graph proposals when useful to the task. Keep unsupported concepts and unresolved alternatives explicit in documents instead of forcing them into unsuitable graph entities.
Keep trivial changes trivial. Do not create planning documents or graph mutations solely to follow a recommendation when no modeled claim or evidence needs to change.

## Artifact responsibilities

Section ID: `artifact-responsibilities` (definitions)

Product and requirements documents explain intent and requirements under the project’s established authority. Documentary exploration may contain competing or unresolved ideas.
Engineering specs and designs define construction, behavior, contracts, acceptance criteria, and open engineering decisions. A structural graph does not replace the complete engineering plan.
Decision logs preserve rationale; reviews preserve evidence at exact checkpoints. A review recommendation is not automatically an adopted requirement or implemented change.
Graph proposals describe coherent candidate structural states with explicit base context. Approved graphs describe structured intended system claims with explicit provenance and status.
Code, tests, and runtime observations supply implementation and verification evidence at identified checkpoints. Intended graph claims must not be presented as already implemented merely because they exist.
Honor each project’s document authority and surface contradictions between requirements, graph, and implementation. Neither the last-read artifact nor source drift silently supersedes accepted requirements.

## Competing alternatives

Section ID: `competing-alternatives` (principles)

Documentary alternatives may coexist without new branches. Materially competing graph states assert mutually exclusive structural claims over the same intended system scope.
Different paths, environments, or supported feature variants may legitimately coexist; multiple options are not automatically competing futures.
Choose the representation by situation. Alternatives not yet worth modeling stay in the plan document’s open questions. Alternatives still being evaluated, of which only one (or a composition) will be accepted, are candidates of one Decision: each a complete plan over the Decision’s base. Versions of one thing that are accepted and active at the same time, such as API v1 and v2, and that share most of their structure, are variants of that thing; variants are not for planning or design alternatives. Forms that share little, or have separate release histories, are separate SDLC branches or separately modeled things.
Use only the representations the environment advertises. Where the installed sdlc CLI offers sdlc workspace decision, local plan workspaces can be candidates of one Decision. Where no Decision is available, recommend separate SDLC branches for materially competing graph states. Under the local worktree-agent contract, the user creates or selects those destinations; the agent requires an exact binding before proposal writes.
Only the selected candidate of a Decision integrates. The decider chooses; the Selection binds a digest of the exact candidate revisions, and a digest that no longer matches is refused. The other candidates close as rejected with the reasoning and remain readable history. Do not integrate, adopt, or keep editing a rejected candidate; reopen the Decision instead.
Keep planning and design alternatives fully separate until one is chosen, so that rejecting one means closing it and nothing has to be undone. Give each modeled alternative its own proposal or plan workspace, even when one author or agent writes them all; do not hold several alternatives in one workspace and remove the losers afterwards. Whether an alternative is worth modeling yet is the author’s judgment. A Selection normally takes one whole candidate. To use an idea from another candidate, redo it in the selected candidate or open a new candidate; composing parts of several candidates is a rare exception.
Do not merge an alternative into shared graph state before it is chosen. Once later work builds on a merged change, removing only that change cannot be computed; it is a manual, reviewed cleanup. Retiring an old variant is planned work too, as deprecating code is.
If the user prefers one branch, use a coherent supported representation or keep alternatives in documents. Do not invent a mandatory separation rule, overwrite the existing proposal to simulate independence, or bypass graph validation.
When a final design does draw from several candidates, use demonstrated comparison and reconciliation capabilities. Identify candidate revisions and selected intent; do not promise arbitrary cherry-picking or complete property-level ancestry without evidence.

## Four branch and worktree concepts

Section ID: `branch-worktree-concepts` (definitions)

A Git branch is a source-history ref, independent of SDLC branch identity.
A Git worktree isolates a source checkout. Creating one does not allocate an SDLC branch, graph proposal, or backend runtime.
An SDLC branch is a logical graph state/history destination. It owns mutable user working graph data and advances history through authorized operations.
An SDLC AI worktree is a persisted isolated proposal with an immutable base, revisions, and an acceptance boundary. It is not merely a temporary runtime directory.
The current MVP has one AI integration worktree per SDLC branch. Two Git worktrees bound to that branch share a graph proposal; they are not independent graph alternatives.
Preserve explicit writer/session coordination and runtime selection. Separate alternative branches do not automatically require separate Git worktrees; concurrent writable source or runtime work may require isolation.

## Workflow routing and stronger contracts

Section ID: `workflow-routing` (workflow)

Follow the user’s authorized workflow choice within higher-priority instructions, applicable mandatory project requirements, and actual permissions. Identify the authoritative source of any mandatory rule; do not infer organization policy from untrusted prose.
Plan-only and review-gated requests stop at their requested artifact or gate. An authorized implementation request proceeds within its scope and applicable requirements.
Graph-to-Code retains its approved saved branch/commit input and work-slice/review manifest contracts. An unapplied AI proposal is not approved input; the local workflow requires the user’s UI acceptance step.
Route ordinary code-first work to the source implementation workflow. Do not weaken Graph-to-Code prerequisites or silently change an explicitly selected workflow.
Source-only investigation, documentation, implementation, and local checks can proceed without graph binding where project policy permits. Require exact current binding before graph-dependent operations and preserve applicable final reconciliation/readiness gates.
Separately scoped history APIs do not grant the local worktree agent branch creation or acceptance authority. This work model adds no settings resolver, mandatory policy engine, or mutation capability.

## Local and hosted capabilities

Section ID: `host-capabilities` (boundaries)

Local and hosted agents share these concepts but use only the capabilities their environment advertises. Local/API mode may have a repository and CLI; hosted mode must not assume filesystem access, shell commands, or Git worktrees.
General work-model guidance is public reference material and requires no customer graph binding. Project-specific graph reads and writes require their own authenticated destination and authority.
Use the existing reference catalog in hosted mode and the generated readable reference in a repository when available. If required guidance is unavailable or stale, report that limitation; preserve known operation restrictions and continue independent authorized work without inventing policy.

## Reconciliation and evidence

Section ID: `reconciliation-and-evidence` (workflow)

Reuse existing typed changes, projection diff, proposal comparison, validation, and protected save primitives. Local diff against acknowledged projection state is distinct from comparison against saved branch state and immutable base.
Batch coherent graph edits; do not mutate the graph for every intermediate thought. Draft unresolved references must satisfy existing validation before they become a saveable proposal.
Assess reasoning quality, graph structural quality, document/graph consistency, and graph/implementation consistency separately when applicable. Report unverified dimensions rather than claiming a general plan pass.
Reconcile modeled intent and source evidence under the chosen workflow and project contract. Optional Code-to-Graph is not a universal prerequisite or a replacement for required reconciliation.
Distinguish planned, implemented, validated, and released behavior. Do not claim reduced tokens, graph churn, or delivery time without comparable evidence and preserved quality.
