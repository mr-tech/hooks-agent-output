# Brief — code-reviewer-hooks-018

Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/018-brief-common.md` (determination, his answers, stage set, prohibitions,
architecture record, hazards). Read it before your first act; each hazard is a candidate for you to re-derive. Its lines 25-28 (branch
not cut) are superseded: the chain branch is cut (below).

From `steering-roadmap-hooks`, 2026-11-20T05:26Z. You are the session `code-reviewer-hooks-018`, launched in
`/usr/local/bin/hooks/website`.

## Your review

- **Start:** on the implementer's committed document `agent-output/implementation/018-next-upgrade-save-size-cap-m1-implementation.md`
  at agent-output `003515a`, `Handoff-At` `f9e66c2` (website `chain/018-next-upgrade-save-size-cap`). Scope: **M1 only**.
- **Plan:** `agent-output/planning/018-next-upgrade-save-size-cap.md`. M1's criteria are unchanged since revision 5 (`e45e8cf`, the
  revision implementation started on); revisions 6 and 7 touch M2 only. Read the plan's current text for M1.
- **QA Phase 1:** `agent-output/qa/018-next-upgrade-save-size-cap-qa.md` (re-keyed to revision 7 at `a7394c6`).
- **The shared tree moves under you.** The implementer is coding M2 in `/usr/local/bin/hooks/website` now, and reinstalls
  `node_modules` to the chain's lockfile after the M2 commit (ruling, `steering/018-rulings.md` block "2026-11-20T04:51Z"). Run
  everything at `f9e66c2` in an isolated export (`git -C /usr/local/bin/hooks/website archive f9e66c2 …`) with its own install, under
  a cap. Read code at the SHA (`git -C … show f9e66c2:<path>`), never from the working tree.
- **M2 is capped** (block "2026-11-20T05:26Z"); this does not bear on M1. Your verdict carries `Reviewed-At: <sha>`.

## Delivery

- REJECTED → `implementer-hooks-018`.
- APPROVED → `qa-hooks-018` (QA Phase 2 on M1); to `steering-roadmap-hooks` when no `qa-hooks-018` session is live at delivery.
- Owner-needing items and spawn cues → `steering-roadmap-hooks`. All by SendMessage.

## Not checked by this brief

The implementer's reported counts (suite 2259/2259 exit 0 at the tip, base 1913/1913; typecheck exit 0; the mutant sweeps) are its
claims, to re-derive.
