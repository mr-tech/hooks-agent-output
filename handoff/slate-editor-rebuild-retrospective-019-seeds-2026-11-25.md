---
UUID: e11d87d1
Status: Open
Status-Detail: "Three process conditions from plan 019's retrospective for the editor rebuild's plan. They bind only that effort's planning, and nothing waits on them until it opens."
Owning-Stage: planner
Review-Trigger: "when the editor rebuild effort opens: its scoping determination, before the planner writes the plan's acceptance criteria"
---

# Seeds for the editor rebuild from retrospective 019

## What is seeded

The rebuild's planner writes three conditions into the plan.

1. **Class-recurrence stop.** Suppose a milestone's second consecutive fix round is rejected on a member of the same defect class as the first. For example, Slate's "Could not completely normalize the editor after 126 iterations" throw on a different keystroke or position. Then the next round does not start until two things have happened:
   - the architect has given a design read on whether the design generates the class;
   - steering has put "extend or redesign" to the owner.

   In 019 M6, Fix Rounds 2 to 5 were each rejected on CR-25 or CR-28, both HIGH members of a class the design produced.
2. **Probe-first literals.** A criterion literal that depends on Slate's internal behaviour is set from a probe on the real mounted code path, and the probe output is recorded under `verification/<chain>/planning/`. Examples are the number of `normalizeNode` calls, dirty paths per keystroke, or iterations. Without a probe, the limb is written as a property, such as equal counts at 200 and 2,048 lines, not as a number. In 019, AC-6.8 was rewritten in Revisions 16 to 20 because hand-derived literals failed correct fixes.
3. **Reuse the walk scripts.** The rebuild re-walks 019's flows, so QA Phase 1 and UAT start from 019's scripts instead of writing new ones:
   - `verification/019/qa/phase1-rev21/walk/run-K*.js` and `verification/019/qa/phase1-rev24/walk/`;
   - the M6 `walk/run-paste.js`, `run-drag.js` and `fix/browser/gt-caret-walk.js`;
   - UAT's `walk/b1-firefox.js`.

   Where the record by then has a pinned browser runner in `agent-output/tools/`, they run through it. The local stack is `tools/uat-local-stack.sh`.

## Evidence

- `retrospectives/019-slate-formatting-discord-engine-retrospective.md`, § What Went Well and What Didn't, and Recommendations 1, 2 and 11.
- The code review document `code-review/closed/019-slate-formatting-discord-engine-code-review.md`, changelog rows 2026-11-24T19:40 to 2026-11-25T09:47: four REJECTED rounds on M6.
- Plan changelog rows 2026-11-24T07:07 to 07:44 (Revisions 16 to 20), and effort rulings blocks 07:13Z, 07:15Z, 07:21Z and 07:42Z.
- `verification/019/retrospective/qa-uat-extract.md` § 2.6 and § 2.8, for where each walk script lives.

## Origin

Retrospective 019 (`retrospective-019`), 2026-11-25. Its Recommendations 1, 2 and 11 are the general forms, and they go to the definitions through pi.

## Changelog

| Date | Author | Change |
|------|--------|--------|
| 2026-11-25T18:22 | retrospective-019 | Created with three seeds for the rebuild's plan. |
