# Brief — qa-hooks-018

Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/018-brief-common.md` (determination, his answers, stage set, prohibitions,
architecture record, hazards). Read it before your first act.

From `steering-roadmap-hooks`, 2026-11-20T03:3xZ. You are the session `qa-hooks-018`, launched in `/usr/local/bin/hooks/website`.

## Your phase

QA Phase 1 (test strategy) on plan `agent-output/planning/018-next-upgrade-save-size-cap.md`, revision 1 (agent-output `c2a6b85`), from
its Reading Order (qa row). His answers on this revision: `steering/018-rulings.md` block "2026-11-20T03:25Z" (Exclusions X-1 to X-15
accepted). The critic and the architect read the same revision in parallel.

The website tree is on `master` at `7923a1d`, and this chain's branch is not cut, so run nothing in the shared tree.
- Anything you run goes in an isolated export (`git -C /usr/local/bin/hooks/website archive 7923a1d …`) with its own install, under a
  cap.
- A local build that saves falls under the local-build rule quoted in the common part.

The plan's "Open handoffs" section names three handoffs with Owning-Stage qa whose triggers this chain may fire. Disposition each at
Phase 1 as its trigger states:
- `mutant-equivalence-by-argument-unverified-2026-11-19.md`
- `bug-evaluation-fixes-unclosed-assumptions-2026-11-08.md`
- `qa-014-bc7-closing-observation-and-test-inventory-2026-11-10.md`

## Delivery

- Findings → `planner-hooks-018`, by SendMessage, with your committed Phase 1 document's path and SHA.
- No findings → `steering-roadmap-hooks`. Send them to `planner-hooks-018` instead where another gate has findings on this revision.
- Owner-needing items and spawn cues → `steering-roadmap-hooks` by SendMessage.

## Not checked by this brief

The suite's count and exit code at `7923a1d`. The planner's base validation is under `verification/018/planning/base-validation/`.
