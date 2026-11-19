---
ID: 017
Origin: 017
UUID: 5c3e9a71
Status: Committed
Status-Detail: "Committed at release identifier chain/017-existing-items-backlog (website 7293a35, generator 8512a1d) by devops Stage 1 at 2026-11-19T19:13Z; closed. Anchor fields above keep the values the document was written at. Post-deploy rows B-6 to B-11 ride handoff/017-existing-items-backlog-post-deploy-2026-11-19.md."
Handoff-At: 8147661 — repos=website
---

# Implementation 017 — M1: hygiene in the test tree, and the dead mode-rule function (item 5)

## Plan Reference

`agent-output/planning/017-existing-items-backlog.md`, revision 4 (agent-output `a97628d`; R-6 `99643d4`
registration only). Milestone M1 (§ Plan: M1-a, M1-b, M1-c). Website chain branch
`chain/017-existing-items-backlog`, cut from `origin/master` `1ad625e` by steering at 00:29Z. Plan Status set
to `In Progress` by R-7 (agent-output `f4dc17e`).

## Date

2026-11-19.

## Changelog

| Date | Agent | Change |
|---|---|---|
| 2026-11-19T00:36 | implementer-hooks-017 | M1 delivered at website `8147661`: M1-a four renames, M1-b the dead function and its 14 cases removed, M1-c five editor error lines asserted by exact text. Self-check sweep and evidence below. |
| 2026-11-19T19:13 | devops-hooks-017 | Document closed. Status: Committed. Plan 017 is committed on chain/017-existing-items-backlog (website 7293a35, generator 8512a1d) at devops Stage 1; the release is Stage 2. |

## Implementation Summary

M1 changes no product behaviour. It moves four test files beside the modules they import (M1-a), deletes
`enforceImportMutualExclusivity` and its `describe` block, which had no production caller (M1-b,
Recommendation 6), and adds an exact-text assertion over every error line `DiscordMessageEditor` renders
(M1-c, `handoff/editor-error-lines-render-text-unasserted-2026-11-11.md`). It delivers item 5's hygiene limb
(Value Statement 4): the next change to these files starts from a placed, checked base. Rollback:
`git -C website revert 8147661` on the chain branch.

## Milestones Completed

M1-a, M1-b, M1-c. M2 to M7 not started.

## Entry Conditions

| Condition | Where satisfied | Pinned by |
|---|---|---|
| Stage start (GLOSSARY): steering's recorded start of the milestone | `steering/017-rulings.md` block "2026-11-19T00:29Z" (implementation start on revision 4, every pre-code gate approved, no OPEN QUESTION open that M1 depends on) | not owed (record fact) |
| QA Phase 1 at `Phase: 1` covering the milestone, committed at a SHA | `qa/017-existing-items-backlog-qa.md` at `3af80aa`, § Test Strategy, M1 | not owed (record fact) |
| Plan and QA strategy read | Plan Reading Order (implementer row) read in full; QA § M1 and § Named mutants read; `qa.md` § Test-Driven Development to § An Instrument Score Travels With Its Predicate read | not owed |
| Open questions | OQ-7 is open and blocks M5 and M6 code only (his D-15). OQ-1 to OQ-6 and OQ-8 to OQ-13 resolved. M1 depends on none open. | not owed |
| Premise | No milestone is marked `PREMISE-STALE`; M1's surfaces were checked at `1ad625e` (see Patterns Extended). | `git grep -c enforceImportMutualExclusivity` at `1ad625e` found the definition and the test uses only |
| Plan `Status` → `In Progress` with a changelog row | R-7, agent-output `f4dc17e` | not owed |
| Suite green at the base in the shared install (the brief did not check it) | 1508 of 1508, 123 files, process exit 0, in the shared tree's install with the network isolated: `verification/017/impl/base/` | `vitest-1ad625e.json`, `vitest.exit` |
| M1-a: counts and pass sets identical by path | `verification/017/impl/m1/compare.out` | `compare.py` |
| M1-b: 19 surviving cases by title; no line from `git grep -c` | same | `compare.py`; `git grep -c enforceImportMutualExclusivity -- src` prints nothing (exit 1) at `8147661` |
| M1-c: each member red under QA's NM-1 and the kill table | `verification/017/impl/m1/8147661-m1c/` | the nine mutants below |

## Files Modified

| Path | Changes | Lines |
|---|---|---|
| `src/utils/index.ts` | `enforceImportMutualExclusivity` and its doc comment deleted | −21 |
| `src/utils/__tests__/limits.import-validation.test.ts` | the `enforceImportMutualExclusivity` `describe` and its banner deleted (14 cases); the import narrowed to `hasV2Components`; three now-unused helper imports (`makeLinkButton`, `makeThumbnail`, `makeSeparator`) dropped | −173 / +3 (`git diff --numstat 1ad625e 8147661`; corrected from −172/+1 after QA's note) |
| `src/components/DiscordMessageEditor/__tests__/DiscordMessageEditor.component-limit.test.tsx` | new `describe('DiscordMessageEditor error-line text')`: 11 cases | +35 (corrected from +34) |

Renamed with `git mv`, blob ids unchanged (`git hash-object` against `git rev-parse 1ad625e:<old>`):

| From | To | Blob |
|---|---|---|
| `src/utils/__tests__/messageStore.dropped-set-report.test.ts` | `src/utils/redis/__tests__/` | `c91a7d8` |
| `src/utils/__tests__/messageValidity.predicate.test.ts` | `src/server/api/utils/__tests__/` | `9d5ce5a` |
| `src/utils/__tests__/useApiMethods.json-editor-repair.test.ts` | `src/providers/MessageProvider/__tests__/` | `18c7033` |
| `src/utils/__tests__/usePusher.hash-parity.test.ts` | `src/providers/MessageProvider/__tests__/` | `94938db` |

## Files Created

None in `website`. Evidence under `agent-output/verification/017/impl/` (below).

## Patterns Extended

| Surface | Pattern extended |
|---|---|
| Test placement (M1-a) | `agent-output/CLAUDE.md` "Placement and naming": `src/**/__tests__/<module>.<behaviour>.test.ts` beside the module. The target directories already carry `__tests__/` (`src/providers/MessageProvider/__tests__/`, `src/server/api/utils/__tests__/`, `src/utils/redis/__tests__/`). |
| Dead-function removal (M1-b) | Test Conventions "Superseded implementation": delete; the current implementation is covered by `messageMode.detection.test.ts`, mutation-checked once (below). |
| Editor error-line assertion (M1-c) | `DiscordMessageEditor.component-limit.test.tsx` (tightened in place, no sibling file): its `mountDom`, `keyed`, `texts` helpers and its stubbed child editors. Test Conventions "Before adding a test": the covering test named and tightened. |

User-visible surfaces: M1 touches none (test files and a function with no production caller). No flow
question is owed for M1.

## TDD Compliance

M1 adds no new function or class. Its new tests characterise existing, unchanged production behaviour, so no
test could fail against absent code. Per Axiom A the red is a mutation of the guarded behaviour, run in an
isolated export (`$SCRATCH/exp-m1`, `git archive 8147661`, `node_modules` linked, network isolated, one change
per run, restored by hash). The spec was committed in the same commit as the code it covers (`8147661`), and
the mutants were run against that commit afterwards, so the first red run is recorded here and not in the
commit that added the spec. Written first: yes, against unchanged production code, green at its first run
(44 of 44 in the file, exit 0). One row per behaviour case; mutant per row named.

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|---|---|---|---|---|---|
| `noContentError` line text, case "renders only the reason text for no content" | `DiscordMessageEditor.component-limit.test.tsx` | Yes | Yes, mutant `nm1-noContentError` (`=` after `{noContentError}`) | AssertionError: rendered text `Message must have content, embeds, or components.=` | Yes |
| `embedCharacterError` line text, case "… for embed characters" | same | Yes | Yes, `nm1-embedCharacterError` | AssertionError, trailing `=` | Yes |
| `v2TextError` line text, case "… for displayable text" | same | Yes | Yes, `nm1-v2TextError` | AssertionError, trailing `=` | Yes |
| `componentCountError` line text, case "… for component count" | same | Yes | Yes, `nm1-componentCountError` | AssertionError, trailing `=` | Yes |
| `v2ComponentError` line text, case "… for V2 component reason" | same | Yes | Yes, `kt-347`, `kt-348-open`, `kt-348-close` (each alone reddens it) | AssertionError, stray `=` | Yes |
| accessories container and the region after each line carry no text, case "renders no text when the message has no error" | same | Yes | Yes, `kt-298` and `kt-349` (both redden it and every error case) | AssertionError: `=` against `''` | Yes |
| hidden-validation cases ("renders no text for %s when validation is hidden", ×5) | same | Yes | Yes, `kt-298` and `kt-349` (the unconditional-position mutants) | AssertionError | Yes |

Captures: `verification/017/impl/m1/8147661-m1c/<mutant>.result.json` (failed case names) and `.json`
(vitest JSON); `8147661-m1c.summary` (nine of nine killed). Driver: `verification/017/impl/mutate.py`
(output to files, process group killed at 180 s, restore by hash, refuses the shared tree). The mutant list is
`verification/017/impl/m1/m1c-mutants.json`: QA's NM-1 for the four other members plus the five kill-table
positions at `1ad625e`'s lines 298, 347, 348 (two), 349 (the file is unchanged from `395510e`).

Covering test for M1-b (Superseded implementation row): `messageMode.detection.test.ts`, mutant
`isMessageV2-or-to-and` (`||` to `&&` in `src/utils/messageMode.ts`) fails 7 of its cases
(`verification/017/impl/m1/8147661-m1b/`).

## Class Sweep

Not owed: this is first delivery, not a fix round, and no gap was exposed by a negative control (all nine
mutants were killed at the first run).

## Test Execution Results

| Command | Result |
|---|---|
| Base: `unshare -rn npx vitest run --reporter=json` at `1ad625e`, shared install | 1508 passed of 1508, 123 files, exit 0 (`verification/017/impl/base/`) |
| Tip: the same at `8147661` | 1505 passed of 1505, 123 files, exit 0 (`m1/vitest-m1.json`, `vitest-m1.exit`). 1508 − 14 (M1-b) + 11 (M1-c) = 1505. |
| `pnpm run typecheck` (both programs) | exit 0 (`m1/typecheck.out`, `typecheck.exit`) |
| `python3 -I m1/compare.py base.json tip.json <website>` | file-set difference is exactly the four renames; per-file (fullName, status) identical for all four (cases 1, 11, 7, 6); `limits.import-validation` 33 → 19, the 19 identical by title and all passing; the only other file whose cases differ is `component-limit` (33 → 44). RESULT OK (`m1/compare.out`). |
| `git grep -c enforceImportMutualExclusivity -- src` at `8147661` | no line (exit 1) |
| Counting method | vitest JSON `numTotalTests` and `testResults` by path; static call-site counts are not used. |

Compilation, lint and compatibility: typecheck exit 0. Lint (M7-b's instrument, partial, for the files M1
touched): `limits.import-validation.test.ts` 21 findings at `1ad625e` (linted from stdin with the repo config,
file path as in the shared tree) and 5 at `8147661` (3 `no-non-null-assertion` warnings, `import/order`,
`import/first`), all in code M1 did not write; `src/utils/index.ts` 2 at both (`import/no-cycle`,
`no-nested-ternary`). No rule count rose in any file M1 changed. Unit coverage: not measured (no coverage
command in the plan). Integration: none owed at M1.

Self-check sweep (`mutant-gen.js --range 1ad625e..8147661`, in a git clone of the tip): 0 mutants written.
The only production change is a deletion, which has no generator target; test files are skipped by the
generator (`m1/8147661-mutant-gen.out`). The mutants above stand in for it. Named mutants (QA's list): NM-1
built and run (nine of nine killed, above). NM-2 to NM-29: not yet built (their guards belong to M2 to M5).

convention-check (`--since=1ad625e`): 5 FAIL, 0 CANDIDATE, 19 SKIP (`m1/8147661-convention-check.out`). The
five FAILs are the eslint findings named above, in `limits.import-validation.test.ts`, none on a line M1 added
(they are the base's, fewer than before: 21 → 5). I did not fix them: D-9 records lint as accepted and fixes
none, and M7-b asks only that the chain add none. This departs from my definition's "every FAIL is fixed
before `Handoff-At` moves"; the departure is disclosed here and put to the reviewer and steering. The SKIPs
are `.playwright-mcp/*.png` (not mine, not examined), `src/utils/index.ts` (no added lines), and the checker's
own `id-token, basename` limb, which "did not run" because it does not implement `CLAUDE.md`'s class
verbatim. I ran that predicate by hand over the new `describe` and case titles and the new basenames: no ID
token in a basename, a title or a comment.

## Outstanding Items

- Departure from "fix every convention-check FAIL": above. Risk: low (pre-existing, accepted by D-9).
  Validation: M7-b at the chain tip.
- Process facts, disclosed in the round: (1) the stamp gate refused two of my rows, the first R-7 row (typed `00:31`, clock
  `00:30`) and this document's first changelog row (typed `00:55`, clock `00:36`); each corrected to the
  clock's minute, R-7 committed with `plan-row-commit.js` (`f4dc17e`). (2) I copied
  `.env.local` into the scratchpad export by mistake and deleted it in the next command; it was never read or
  printed. (3) The mutation export links the shared `node_modules`; ESLint refuses a linked install
  ("couldn't determine the plugin react uniquely"), so lint was run from stdin in the shared tree, which
  writes nothing.
- The mutants ran against `8147661` after it was committed, so each kill is of a committed instrument.

Correction (2026-11-19T00:57, QA's QAF-15, `qa/017-existing-items-backlog-m1-qa.md`): the "21 findings at
`1ad625e`" for `limits.import-validation.test.ts` came from linting the base blob on stdin in the shared tree,
which resolves types against the moved tree. The base count is 7 (`verification/017/entry/lint-1ad625e/nofix.json`),
and the tip's 5 stands. The conclusion (no rule count rose) is unchanged. M7-b reads base counts from that
whole-tree capture and lints the tip in a tree that is exactly the commit measured, with its own install (a
linked `node_modules` fails with "plugin react uniquely"; `verification/017/README.md`).

## Next Steps

Code review of `8147661`. M2 follows. When M1 to M4 are through, `steering-roadmap` is told, which starts
devops for the OQ-7 probe push (brief).
