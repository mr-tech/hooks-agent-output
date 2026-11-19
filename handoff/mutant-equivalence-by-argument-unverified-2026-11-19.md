---
UUID: fbd149ad
Status: Open
Status-Detail: "Seven surviving mutants from chain 017 are dispositioned 'equivalent' by argument alone, with no case on a separating input. In 017, three of three argued equivalences that a case later tested were wrong. Owed: for each, a case driving the input that would separate the two forms (kill it), or a recorded run that shows none exists. Nothing blocks on it."
Owning-Stage: qa
Review-Trigger: "when the next chain's diff touches website src/**/leaveWithoutAlert.ts, messageDrafts.ts, withLocalStorage.ts or StyledLink.tsx, or preview-image-generator src/generateImage.ts"
---

# Seven mutants stand as "equivalent" on argument alone (chain 017)

## What is seeded

Each survivor below was judged equivalent by reading the code. No case drives an input that would tell the original from the
mutant. The owning stage, in the first chain whose diff touches the file, does one of two things for each. Either it adds a case on
the separating input and shows it red under the mutant and green at the head (Test Conventions, axiom A). Or it records the run or
argument that shows no input separates the forms, with the input classes it tried. A survivor whose file the chain does not touch
stays here.

| # | Repository | Mutant (generator id at 017's trees) | Who argued it | Note |
|---|---|---|---|---|
| 1 | website | `leaveWithoutAlert.ts:1:num` (M3 survivor 6) | implementer; QA's effort-final sweep re-found it | QA called it residue with no criterion member, not equivalent |
| 2 | website | `messageDrafts.ts:19:num:2` (M3 survivor 7) | implementer; QA agreed | |
| 3 | website | `messageDrafts.ts:19:num:3` (M3 survivor 8) | implementer; QA agreed | |
| 4 | website | `withLocalStorage.ts:13:if-false` (M3 survivor 12) | implementer; QA agreed | |
| 5 | website | `withLocalStorage.ts:19:true` (M3 survivor 14) | implementer; QA agreed | |
| 6 | website | `StyledLink.tsx:34:false` (M4) | implementer | QA did not agree: QAF-25 LOW, unasserted, parked as plan 017 X-24 |
| 7 | preview-image-generator | `generateImage.ts:36 num`, `?? 0` to `?? 1` (M6) | implementer; QA's M6 set agreed | argument: status compared `< 200`, so a null response answers 500 either way |

Line numbers are at 017's released trees: website `787bec5`, generator `8512a1d`. Re-locate each one by its text if the file has moved.

## Evidence

- `retrospectives/017-existing-items-backlog-retrospective.md` § "1. Mutants were called equivalent by argument" (agent-output
  `93f7adc`). It reads each "equivalent" hit in M2's Fix Round 6 class sweep and finds 3 withdrawn after a run (`nm44`, M8's
  `row-warning-enabled-dropped`, code review's R-32 row) and these 7 standing.
- M6's row: `implementation/closed/017-existing-items-backlog-m6-implementation.md` line 180.
- M3's survivors: the M3 implementation and `qa/closed/017-existing-items-backlog-qa.md` (effort-final sweep).

## Origin

Chain 017's retrospective, which found these seven had no carrier: M2 Fix Round 6 named "the retrospective" as their re-sweep owner,
and a retrospective runs no sweep. Seeded by `steering-roadmap-hooks` at 017's closure.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-19T20:41 | steering-roadmap-hooks | Created from 017's retrospective (`93f7adc`), which found the seven standing equivalence dispositions had no carrier. |
