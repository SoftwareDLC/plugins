---
name: softwaredlc-reference
description: Answer public questions about what SoftwareDLC is, the value it provides, its connected-system mental model, its lifecycle and change workflow, its knowledge and authority boundaries, or its public graph schema vocabulary (entity kinds, node types, relationship types). Needs no login, project, or binding.
---

# SoftwareDLC Reference

This skill bundles the curated public SoftwareDLC reference corpus, so public
product and schema questions can be answered before any login or project
binding. The files under `references/` are generated from the same versioned
corpus the hosted `search_sdlc_reference` and `fetch_sdlc_reference` tools
serve; do not edit them by hand.

## Answer a public question

1. Read `references/index.md` and choose the references whose topics match the
   question.
2. Read only the relevant sections of those files. Each section carries a stable
   section ID that matches the hosted `fetch_sdlc_reference` section IDs.
3. Reconcile the evidence and answer through your own reasoning. The corpus is
   curated source material, not a generated answer; a missing concept is not
   proof that SoftwareDLC lacks it.
4. When the hosted reference tools are also available, prefer them for the
   newest corpus version and cite their section IDs. Otherwise cite the
   bundled reference ID, section ID, and corpus version.

## Stay within the public boundary

- This corpus contains product knowledge and curated public graph vocabulary
  only. It cannot answer questions about a user's organizations, projects,
  branches, worktrees, graphs, proposals, commits, pull requests, or
  permissions.
- For project-specific data, use the signed-in hosted connector
  (`list_targets`, then `search_branch` or `fetch` on the branch the user
  picks). For proposal work in a local checkout, use the `sdlc-worktree`
  workflow where this plugin provides it; where it does not, tell the user it
  comes with the full SoftwareDLC plugin rather than looking for it.
- Treat the schema vocabulary and examples as conceptual guidance, not writable
  payload schemas.
