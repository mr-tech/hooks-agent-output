# Brief — qa-hooks-017

Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/017-brief-common.md` (determination, stage
set, prohibitions, architecture record, hazards). Read it before your first act.

From `steering-roadmap`, 2026-11-18T23:2xZ. You are the session `qa-hooks-017`, launched in
`/usr/local/bin/hooks` (a cross-repository chain). Only `website` carries tests; the generator
carries none (`agent-output/CLAUDE.md`, repository table).

## Your phase

QA Phase 1 (test strategy) on plan `agent-output/planning/017-existing-items-backlog.md`, revision
1 (agent-output `97e6814`, the planner's commit of revision 1), from its Reading Order (qa row). His
answers on this revision: `steering/017-rulings.md` block "2026-11-18T23:26Z" (Exclusions X-1 to X-16
accepted, X-13 included). The critic and the architect read the same revision in parallel.

The website tree is on `master` at `1ad625e` and this chain's branch is not cut: run nothing in the
shared tree. Anything you run goes in an isolated export (`git -C /usr/local/bin/hooks/website archive
1ad625e …`) with its own install; the shared tree's `node_modules` is held. A run of a local build
that saves falls under the local-build rule quoted in the common part.

## Delivery

- Findings → `planner-hooks-017`, by SendMessage, with your committed Phase 1 document's path and SHA.
- No findings → `steering-roadmap`; `planner-hooks-017` instead where another gate has findings on
  this revision.
- Owner-needing items and spawn cues → `steering-roadmap` by SendMessage.

## Not checked by this brief

The suite's count and exit code at `1ad625e` (the plan's Entry facts carry the planner's figure);
whether the Turbopack builder treats a test file under `src/pages/api/` as a route (webpack did, a
helper's run, `steering/017-rulings.md` block 23:24Z).
