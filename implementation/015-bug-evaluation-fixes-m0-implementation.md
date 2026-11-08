---
ID: 015
Origin: 015
UUID: 861e5f61
Status: Active
Status-Detail: "M0 delivered and committed on website chain/015-bug-evaluation-fixes; awaiting code review. M1 onward is not started. Plan is at rev 8; M1-c's no-account and ordering cells are held by steering until the rev-8 gates pass."
Handoff-At: "037935d — repos=website"
---

# Implementation 015 — M0 (baseline and gate instrument)

## Plan Reference

`agent-output/planning/015-bug-evaluation-fixes.md`. Started on rev 7 (`38b12e6`); the plan is now rev 8 (`1f7715b`), whose delta touches M1-c and M8-0 only, so M0 is unaffected. QA Phase 1: `qa/015-bug-evaluation-fixes-qa.md` (`ba277d8`, re-keyed to rev 8 at `c2a657a`).

## Date

2026-11-08

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-08T05:57 | steering-hooks-015 → implementer-hooks-015 (brief) | Implement plan 015 from M0 | M0 delivered at website `037935d`: baseline recorded, `.next/dev/types` deleted (D7), typecheck gate green, bot test collection landed (QA Testing Infrastructure item 1). Plan Status → In Progress (`7c00518`). |

## Implementation Summary

M0 makes the two gates every later milestone leans on trustworthy:

- **The typecheck gate** fails at the base only because of a stale git-ignored `next dev` output. With it deleted, `pnpm run typecheck` exits 0, so a later red there is a milestone's own.
- **The vitest comparand** is re-recorded with exit code and path membership.
- **The bot collection change** (QA item 1, binding from M0 by the brief) means a test placed under `bot/**/__tests__` is collected and type-checked. Without it M7's tests would be silently uncollected.

## Milestones Completed

M0 only.

## Entry Conditions

| Condition | Where satisfied | Pinned by |
|---|---|---|
| Stage start (GLOSSARY) | Rulings block "implementation start recorded" (`7efd8b0`): critic `1ce2ae4`, architect `592eb23`, QA Phase 1 `ba277d8`. No `OPEN QUESTION` open (`grep -c 'OPEN QUESTION:'` of the rulings block, as steering recorded it) | Not a test |
| QA Phase 1 document at `Phase: 1` covering M0 | `qa/015-bug-evaluation-fixes-qa.md`, § M0 and § Testing Infrastructure item 1 | The planted case in TDD row 1 |
| `PREMISE-STALE` marks | None in the plan (read in full) | Not a test |
| Held shared state: `website/node_modules` | Not touched; no install run | Not a test |
| D7: delete `website/.next/dev/types` after `pgrep` shows no `next dev` for this tree | `pgrep -af '[n]ext dev\|[n]ext-server\|[n]ext/dist'` returned no process (exit 1) immediately before; the directory held 3 files; `.next` file count 3348 → 3345 | `verification/015/m0-captures-037935d.txt` § 2–3 |
| E-7: typecheck exit 0, vitest counters and exit, path membership | Table below | `m0-captures-037935d.txt` § 7 |
| E-8: no lockfile pin moves | `git diff --numstat 7ce866b -- pnpm-lock.yaml package-lock.json` empty (0 bytes). `package-lock.json` is not tracked in website | `m0-captures-037935d.txt` § 7 |
| E-1 to E-6, E-9 | Not owed at M0 (generator probes, network stubs, walks); bind from the milestone that reaches them. E-6 is met here by TDD row 1 | — |

**User-visible surface.** None. M0 touches two test-runner config files and deletes ignored build output, so no flow questions go to steering.

**Plan rev 8.** The plan moved from rev 7 to rev 8 during M0. I did not read the rev-8 delta beyond the plan's changelog row for rev 8 and the diffstat (`git diff --stat 38b12e6 1f7715b`: `planning/015-bug-evaluation-fixes.md` 57 lines changed); the row names M1-c and M8-0 as the touched text. I will read the delta before M1-c. Steering's message holds only M1-c's no-account and ordering cells, which M0 does not reach.

## Files Modified

| Path | Changes | Lines |
|---|---|---|
| `website/vitest.config.ts` | node project `include` gains `'bot/**/*.test.ts'` | +1 −1 |
| `website/tsconfig.test.json` | `include` gains `"bot/**/__tests__/**/*.ts"` | +1 |

## Files Created

| Path | Purpose |
|---|---|
| `agent-output/verification/015/m0-captures-037935d.txt` | Captured outputs for M0's red/green and gate runs |

## Patterns Extended

| Surface | Pattern extended |
|---|---|
| `vitest.config.ts` node project | Extends the existing `include` array in place; the `project()` factory is untouched |
| `tsconfig.test.json` | Extends the existing `include` list in place. `tsconfig.json` is untouched: its `**/__tests__` exclude already covers `bot/` by glob, confirmed by the type-error run below (the error came from the test program only) |

## TDD Compliance

M0 adds no function or class. The one behaviour change is "a test under `bot/` is collected and type-checked", a config change. Its test is a planted case, placed first, run red against the pre-change config, then removed.

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|---|---|---|---|---|---|
| node project collects `bot/**/*.test.ts` | planted `bot/utils/__tests__/collection.planted.test.ts` (`expect(1).toBe(2)`), removed after | Yes | Yes | Pre-change: the case is **uncollected** (vitest exit 0, 598 tests, 54 files, 0 under `/bot/`), so a case that must fail goes unseen. Post-change: collected, `AssertionError: expected 1 to be 2`, exit 1, 599 tests, 55 files | Yes — planted file removed, vitest exit 0, 598/598, 54 files, path membership identical to base |
| `tsconfig.test.json` type-checks `bot/**/__tests__` | the same file with `const planted: number = 'a'` appended, removed after | Yes | Yes | Post-change: `TS2322: Type 'string' is not assignable to type 'number'` from the test program, `pnpm run typecheck` exit 2. The pre-change tsconfig does not include the path; I did not run it red pre-change, so this row's red is the post-change detection, with the base program staying green (exit stopped at the test program, so the production program passed) | Yes — file removed, typecheck exit 0 |

The second row has no pre-change red run: that is a gap I am disclosing rather than papering over. The first row's "red" is the absent collection. The assertion-level red appears only after the change. Both are as the QA document (§ Testing Infrastructure item 1) asks: "a planted failing `bot/**/__tests__` case seen red, then removed".

## Class Sweep

Not owed: no fix round.

## Test Execution Results

Raw outputs: `agent-output/verification/015/m0-captures-037935d.txt`. Counts come from the vitest JSON reporter's `numTotalTests`, `numPassedTests`, `numFailedTests` and `testResults.length` (one entry per file); path membership is a `diff` of the sorted `testResults` names.

| Command | Result | Exit |
|---|---|---|
| `npx vitest run --reporter=json` at `7ce866b` | 598 tests, 598 passed, 0 failed, 54 files — equals the planner's and QA's figures | 0 |
| `pnpm run typecheck` at `7ce866b`, before deletion | 2 `error TS` lines, both in `.next/dev/types/validator.ts` | 1 |
| `pnpm run typecheck` after `rm -r .next/dev/types`, before any source change | 0 `error TS` lines | 0 |
| Planted failing case, config unchanged | 598 tests, 0 failed, 54 files; planted case not collected | 0 |
| Planted failing case, `include` changed | 599 tests, 1 failed, 55 files; `AssertionError: expected 1 to be 2` | 1 |
| Planted type error, `tsconfig.test.json` changed | `TS2322` from the test program | 2 |
| `npx vitest run --reporter=json` at `037935d` (content identical to the working tree run; `git diff --quiet HEAD` over both files passed) | 598 tests, 598 passed, 0 failed, 54 files; path membership identical to the base's 54 | 0 |
| `pnpm run typecheck` at `037935d` | 0 errors | 0 |
| `git diff --numstat 7ce866b -- pnpm-lock.yaml package-lock.json` | empty | — |

- Compilation, lint and compatibility: typecheck above. No lint script was run; none was asked.
- Coverage: no new production code.
- `convention-check.js website --since=7ce866b`: 0 FAIL, 0 CANDIDATE, 2 SKIP. Skip 1: `tsconfig.test.json` is outside the examined extensions (JSON). Skip 2: the id-token basename check does not run because it looks for `agent-output/TEST-CONVENTIONS.md` above the repository and the conventions live in `agent-output/CLAUDE.md`. So that check is **unchecked**, not passed; M0 adds no test file, so the gap does not bear on it.

## Outstanding Items

- **Gap, TDD row 2:** no pre-change red run for the type-check limb (above). Risk: low, because the include line is the only change and a type error in a planted file was detected after it. Validation: a reviewer can revert `tsconfig.test.json` locally and re-plant the file.
- **`next dev` regenerates `.next/dev/types`.** Whoever next runs `next dev` or `next build` in `website/` regenerates the directory, and if it is again malformed the gate goes red. D7 settles the deletion as a one-time act; I did not guard against regeneration.
- **Self-diagnosis (method):** my first `pgrep -af "next dev"` matched its own shell's command line and so could not show absence; I re-ran with a self-excluding bracket pattern before the deletion. Nothing was deleted on the first result.

## Next Steps

Code review of `037935d` (website), then QA Phase 2 for M0. Then M1 onward, starting from the sites not held by steering's message.
