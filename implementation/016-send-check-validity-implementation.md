---
ID: 016
Origin: 016
UUID: 54673438
Status: Active
Handoff-At: "ee114ff — repos=website"
---

# Implementation: plan 016, the send check refuses what Discord refuses

## Plan Reference

`agent-output/planning/016-send-check-validity.md`, revision 6 at the time of writing (record
`07e2e41`; I implemented from revision 5 and read the revision 6 diff, which changes AC1-11, X-12,
the header and the Resumption State only). Chain branch `chain/016-send-check-validity`, base
website `0e3d903`.

## Date

2026-11-11

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-11T12:00 | steering-queue-hooks → implementer-hooks-016 | Implement revision 5 (brief `steering/queue-hooks-briefs/implementer-016-brief.md`) | M1 `ae7c8fe`, M1b `44ecd05`, M2 `df0fc0b` on the chain branch. Round 1 range sent to the deweeder. |
| 2026-11-11T12:40 | implementer-hooks-016 → code review | Hand-off | Deweeder rounds 1 and 2 answered (`7a268dc`, `4cdb81a`, `ee114ff`); self-check sweep taken at `4cdb81a` and again at `ee114ff`; two test gaps it exposed closed in `7c66b68`. Handed over at `ee114ff`. |
| 2026-11-11T12:55 | code-reviewer-hooks-016 → implementer-hooks-016 | Fix round for code review Round 1 (REJECTED at `ee114ff`; CR-1, CR-2, CR-3) | CR-2 and CR-3 fixed test-only at `64a3d26`; deweeder round 3 removed nothing; positional probe kills 10 of 10. CR-1 is routed to the planner (AC1-1 digest) and open: `Handoff-At` stays `ee114ff` until the regenerated fixture is re-copied. |

## Implementation Summary

**What.** `validateMessage` (`src/utils/limits.tsx`) gains one validator, `validateV2Components`,
called after `validateComponentCount`. It refuses, anywhere in a V2 message's tree, the shapes the
requirement ledger L1 to L10 lists, and returns one reason that names the component type and the
fault (20 reasons). The editor shows that reason on one error line beside its siblings and joins the
red border (`DiscordMessageEditor/index.tsx`). The `/preview` route passes one optional prop,
`hideValidation`, which turns off every validation line and the red border in the editor tree (the
four existing lines, the new line, the border, and `Author`'s username line). Both description
inputs (Thumbnail, gallery item) carry `maxLength` from one new constant
`MAX_COMPONENT_DESCRIPTION_LENGTH` (1024) in `src/constants/messageLimits.ts`, which the check also
reads. The save schema is not edited (D-10).

**How it delivers the value.** A user who adds a component and presses Send gets the line naming
what is wrong and Send disabled, where before the send reached Discord and failed with the generic
toast. All 86 measured refusals are refused; all 34 measured acceptances send (the corpus test).

**Design choices of mine inside the agreed scope (agent-authored, the reason copy is UAT's to edit):**
- The reach test (`isV2Message`) is extracted from `validateContentRequirements` into one helper both
  it and the new validator call; behaviour of `validateContentRequirements` is unchanged (its
  existing test classes pass, see Test Execution Results).
- `validateV2Components(components, flags = 0)` takes the flags so the editor and `validateMessage`
  agree on reach (flag-only V2 and structure-only V2).
- Whitespace-empty is `!includes('﻿') && replace(/\u0085/g, '').trim() === ''`, which is the
  plan's per-character definition.
- The link-button scheme limb uses `new URL(requiredUrl.parse(url)).protocol` after the zod
  `url()` predicate, so the throw path is unreachable by construction (zod 3.22.4 `url()` parses
  with `new URL`).

## Milestones Completed

| Milestone | Commit | Criteria discharged by suite |
|---|---|---|
| M1 | `ae7c8fe` | AC1-1, AC1-2, AC1-3, AC1-4, AC1-5, AC1-7, AC1-8 (existing classes green), AC2-1 |
| M1b | `44ecd05` | AC1b-1 (six index members and Author cozy on the route, Author compact at the component), AC1b-2 (existing editor tests), AC1b-3 (call-site enumeration below) |
| M2 | `df0fc0b` | AC2-2 suite half, AC2-3 |

Not discharged by me, by the plan: AC1-6, AC1-6p, AC1b-4, AC2-2 browser half (UAT, B-1 to B-6);
AC1-9 differential and AC1-10, AC1-11 measurement at Phase 2 (QA). I ran AC1-10's probe and AC1-11's
counts below as entry evidence.

## Entry Conditions

| Condition | Where satisfied | Pinned by |
|---|---|---|
| Stage start, steering's record | rulings block "2026-11-11T11:43Z — implementation start" | n/a |
| QA Phase 1 at `Phase: 1`, SHA `97343f0` | `qa/016-send-check-validity-qa.md`, `Awaiting Implementation` | n/a |
| Plan Status `In Progress` with a changelog row | plan row R-5, record `9a3eb74` | n/a |
| No open `OPEN QUESTION` | plan: four `[RESOLVED]`, none open | n/a |
| Premise: no `PREMISE-STALE` marking | read the plan, none | n/a |
| Corpus fixture byte-identical | `src/utils/__tests__/helpers/discordV2SendCorpus.ts` sha256 `49b54f8e6b7226f1258a497b6e2f01d73126a85c9e66c2ef1acbff32bb15bb9b`, blob `9fb22ae` (`sha256sum`, `git hash-object` on the copy) | `limits.v2-send-validity.test.ts` › "covers the whole measured population" (86 and 34) |
| QA entry 1: blocked set at the base is exactly A3 A5 N2 N4 N6 N9 | first red run: 80 of 86 refused members failed at the base tree, 86 − 80 = 6 already refused | the corpus refuse cases |
| QA entry 2: the existing component-total line renders beside the new one | `component-limit.test.tsx` › "shows the line after the components-total line" | that case |
| QA entry 3: the description input passes `maxLength` through to the DOM `<input>` | direct `<input>` elements; red run `expected -1 to be 1024` then green | `ThumbnailEditor.description-limit.test.tsx`, `MediaGalleryEditor.description-limit.test.tsx` |

## Files Modified

| Path | Change | Lines |
|---|---|---|
| `src/utils/limits.tsx` | `validateV2Components` and helpers; `isV2Message` extracted; call in `validateMessage` | +102 −2 |
| `src/constants/messageLimits.ts` | `MAX_COMPONENT_DESCRIPTION_LENGTH` | +1 |
| `src/components/DiscordMessageEditor/index.tsx` | new reason line, border union, `hideValidation` prop | +16 −5 |
| `src/components/DiscordMessageEditor/components/Author.tsx` | `hideValidation` prop | +3 −2 |
| `src/app/preview/page.tsx` | passes `hideValidation` | +1 |
| `.../ComponentEditors/ThumbnailEditor.tsx`, `MediaGalleryEditor.tsx` | `maxLength` on the description input | +2 each |
| `src/components/DiscordMessageEditor/__tests__/DiscordMessageEditor.component-limit.test.tsx` | new describe; one case retitled | +105 |
| `src/app/preview/__tests__/page.invalid-data.test.tsx` | the "component limit" describe replaced | see `git diff` |
| `src/server/api/utils/__tests__/shapes.message-validation.test.ts` | description-bound describe | +20 |

## Files Created

| Path | Purpose |
|---|---|
| `src/utils/__tests__/limits.v2-send-validity.test.ts` | corpus, reach, whitespace, emoji, description bound, placements, reasons |
| `src/utils/__tests__/helpers/discordV2SendCorpus.ts` | QA's fixture, byte-identical |
| `src/components/DiscordMessageEditor/components/__tests__/Author.username-error.test.tsx` | Author's line, cozy and compact, with and without `hideValidation` |
| `.../ComponentEditors/__tests__/ThumbnailEditor.description-limit.test.tsx`, `MediaGalleryEditor.description-limit.test.tsx` | AC2-2 suite half |

## Patterns Extended

| Surface | Pattern extended | Rung |
|---|---|---|
| The reason line | the four error lines in `DiscordMessageEditor/index.tsx` (`NullableComponent` + `text-error`) and `styles.errorBorder` union | in-file, exercised by `component-limit.test.tsx` |
| The validator | `validateDisplayableTextCount` / `validateComponentCount` (plan 007), structural types | in-file |
| The description input | `LinkButtonEditor.tsx` `maxLength={MAX_BUTTON_LABEL_LENGTH}` | in-class, same directory |
| The preview signal | `editableState` prop passed down as `showEdit` (architect AF-13) | in-file |

**User-visible flows.** (1) The send page and editor refusal: trigger, a draft in a refused shape;
next, the reason line and Send disabled; rung: the existing lines. (2) `/preview` and the preview
image: trigger, any render of the route; next, no line and no border; rung: the plan states the
mechanism (D-14). (3) Description inputs: trigger, typing or pasting in a Thumbnail or gallery
description; next, the input stops at 1024; rung: `LinkButtonEditor`. The plan states each flow and
no flow holds a decision, so no ask went to the owner.

**Sibling sweep (two instruments).**
- Text predicate, derived from the class "validator output rendered as an error line":
  `git grep -n "font-semibold text-error" -- src ':!**/__tests__/**'`, 12 hits. Five are
  `DiscordMessageEditor/index.tsx` (the four siblings and the new line). The other seven are the
  embed parts, `DiscordContentEditor/Desktop.tsx`, `ContentEditable.tsx` and `TextField.tsx`,
  which render only in edit mode (QA's by-render enumeration confirmed each at the base).
- Reference query: `git grep -n "validateComponentCount\|validateDisplayableTextCount\|validateV2Components"`
  over production (a text stand-in for `find_referencing_symbols`, which this session did not
  run): the editor and `validateMessage` only, 3 and 3 hits. The new validator has exactly the
  siblings' two callers.
- `maxLength=` sweep: 4 hits, `Header.tsx`, `LinkButtonEditor.tsx`, and the two new.

## TDD Compliance

All tests were written before their code. Every first run was against the unmodified production
tree of the preceding commit and failed on an assertion.

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|---|---|---|---|---|---|
| `validateV2Components` (and its helpers) | `limits.v2-send-validity.test.ts` | Yes | Yes | first run, corpus only: 80 of 121 failed, `AssertionError: expected '' not to be ''`; full file: 250 of 344 failed, same assertion plus `expected '' to contain 'Text Display'`-form assertions | Yes (344 of 344) |
| `isV2Message` (extracted) | covered by `limits.send-gate-partition` and the reach cases | Yes (existing coverage) | not owed: behaviour-preserving extraction, evidence: the existing `limits.*`, `utils.mutual-exclusivity` and `messageValidity.predicate` suites pass unchanged | not owed | Yes |
| editor reason line (`v2ComponentError`) | `DiscordMessageEditor.component-limit.test.tsx` | Yes | Yes | 5 of 7 new cases failed: `expected [] to have a length of 1 but got +0`; the 2 controls (filled, classic) passed | Yes (30 of 30) |
| `hideValidation` on the editor | `page.invalid-data.test.tsx` | Yes | Yes | 7 of 8 new cases failed: `expected [ 'Embeds exceed 6000 characters.' ] to deeply equal []` and the like | Yes |
| `hideValidation` on `Author` | `Author.username-error.test.tsx` | Yes | Yes | 2 of 6 failed: `expected [ Array(1) ] to deeply equal []` (hide cozy, hide compact) | Yes |
| Thumbnail description `maxLength` | `ThumbnailEditor.description-limit.test.tsx` | Yes | Yes | `expected -1 to be 1024` | Yes |
| gallery description `maxLength` | `MediaGalleryEditor.description-limit.test.tsx` | Yes | Yes | `expected -1 to be 1024` | Yes |
| `MAX_COMPONENT_DESCRIPTION_LENGTH` | read by the check and both inputs | Yes | Yes (via the rows above) | n/a | Yes |

Row for the AC2-3 case, a guard that states the owner's ruling and passes at the base by design:
`shapes.message-validation.test.ts` › "discordMessageShape description bound". Its mutant, to be
run in an isolated export in the self-check sweep: `.max(1024)` on the Thumbnail `description`.
Result: pending.

Rows for `7c66b68`, added after my first sweep survived on two wiring gaps: the editor passes
`hideValidation` to the V2 editing `Author` (mutant `x-author-hide`, survived at `4cdb81a`: the pass
removed) and the text-length border (mutant `index.tsx:298:||`, `embedCharacterError || v2TextError`
flipped to `&&`). Red evidence for these two is the surviving mutant itself, run at `4cdb81a` against
the tests that existed then; their kill at `ee114ff` is in the sweep table.

`python3 ~/.claude/tools/tdd-check.py` is for Python sources and refuses these; rows are read.

## Class Sweep

No fix round, so no reviewer finding to sweep. Gaps my own instruments exposed during first delivery:

| Finding | Enumeration command | Full output | Disposition of every hit |
|---|---|---|---|
| Gap 1: the preview page's own tests asserted the old behaviour (the count line and border on `/preview`) | `git grep -n "preview" -- src '**/__tests__/**'` for tests that assert an error line on the route | the `component limit` describe in `page.invalid-data.test.tsx` (2 cases); the retitled "as on the preview page" case in `component-limit.test.tsx` | the 2 cases flipped to the new behaviour (they were the plan 015 D33 assertion D-14 reverses); the retitled case still asserts the no-prop default |
| Gap 2: AC1-1 and AC1-11 contradicted on the fixture | asked the planner | revision 6 (`07e2e41`) X-12 | closed by the planner |

## Test Execution Results

| Command | Result |
|---|---|
| base `npx vitest run --reporter=json` at `0e3d903` | exit 0; 1145 of 1145; 118 files |
| tip `npx vitest run --reporter=json` at `ee114ff` (`Handoff-At`) | exit 0; 1503 of 1503; 122 files (1514 at `df0fc0b`; round 1 removed 15 executed cases, 1499 at `4cdb81a`; `7c66b68` added 5, round 2 removed 1, so 1503) |
| `pnpm run typecheck` (both programs) | exit 0 |
| `npx ts-node -r tsconfig-paths/register -T -e "require('~/utils/limits')"` | printed `ok` (AC1-10 entry evidence; QA places the instrument) |
| `npx eslint <file> --format json` per changed file, base vs tip | equal counts on every changed file: `shapes.message-validation.test.ts` 10 errors 7 warnings both; `ThumbnailEditor.tsx` and `MediaGalleryEditor.tsx` 0 and 2 both; every other changed or new file 0 and 0; the corpus fixture is outside AC1-11 (X-12) |

The counts: 1514 is vitest's `numTotalTests`, where `it.each` rows are cases; test-file count is the
reporter's `testResults` entries.

## Deweeder

`deweeder-hooks-016`, table `verification/016/deweed.md`. Round 1, range `0e3d903..df0fc0b`: 15
executed cases removed, all scored 5 as repeats of a kept case (commit `7a268dc`; it also removed
the corpus population case, which this document's Entry Conditions row holds, so `4cdb81a` restored it
exactly). Its notes: the 29 "refuses a %s at %s" rows and 4 "names the component type" rows are
generated from faults × placements and stay; the AC2-3 schema cases are never-red guards, left
untouched. Round 2, range `4cdb81a..7c66b68`: one row removed (`ee114ff`, "gives the message body
hideValidation true", covered by the real `/preview` page case). I waited for each answer with the
tree untouched; the tree is clean at `ee114ff` (`git status --porcelain`: only `.playwright-mcp/`,
another session's).

## Mutation Self-Check (the implementer's sweep; QA's is the deciding one)

Instruments: `mutation-run.py` over `mutants-all.json` (blob `7196e92a…`), 90 mutants = 79 from
`mutant-gen.js --range 0e3d903..4cdb81a` (production lines the chain added: `limits.tsx` 62,
`index.tsx` 15, `Author.tsx` 1, `messageLimits.ts` 1) + 11 I wrote by hand for guards the generator
cannot express (the two schema `.max(1024)` mutants, both `maxLength` removals, the `/preview` page
pass, the two `hideValidation` passes, Author ignoring it, the border union, both reach conjuncts).
Exports of the SHA under `/tmp/claude-1000/…/scratchpad/sweepwork`, node_modules bound read-only,
240 s timeout, process group killed. Suite: `src/utils src/components/DiscordMessageEditor
src/app/preview src/server/api/utils` with `verification/016/implementer-sweep-ee114ff/vitest.sweep.config.mts`
(the repo's config uses `__dirname`, which fails under `--configLoader runner`). Outputs:
`verification/016/implementer-sweep-4cdb81a/` and `…-ee114ff/`.

| Run | KILLED | SURVIVED | ABORTED (count mismatch) |
|---|---|---|---|
| `4cdb81a` | 75 | 8 | 7 |
| `ee114ff` (`Handoff-At`) | 77 | 6 | 7 |

Dispositions of the 13 non-kills at `ee114ff` (every one; the predicate for "kill" is the runner's,
over the 83 mutants whose suite started):
- 7 ABORTED, `index.tsx:298/347/348/348:2/349` `<` and `limits.tsx:147` `<` and `>`: the mutated
  character is an angle bracket of JSX markup or a TypeScript generic (`<=div`, `Record<…>`); the file
  no longer parses and 1078 of 1175 (233 for `limits.tsx`) tests ran. Not code guards.
- 5 SURVIVED, `index.tsx:298/347/348/348:2/349` `>` → `>=`: the same angle bracket closing a JSX tag,
  which makes a literal `=` text child. Not a guard.
- 1 SURVIVED, `limits.tsx:228` `flags = 0` → `flags = 1`: equivalent, since `1 & 32768` is 0 so the V2 bit stays clear.
The two gaps the first run found (`index.tsx:298:||`, `x-author-hide`) are KILLED at `ee114ff`.
Kills named: both `maxLength` removals, both schema `.max(1024)` mutants (the AC2-3 never-red guard
row: killed), `x-page-hide`, `x-contentbody-hide`, `x-author-error-ignores-hide`, `x-border-union-drops-v2`,
`x-reach-flag-conjunct` and `x-reach-struct-conjunct` (each reach conjunct decides alone).

## Convention check

`node ~/.claude/tools/convention-check.js /usr/local/bin/hooks/website --since=0e3d903`: 7101 FAIL,
0 CANDIDATE, 2 SKIP. The FAILs by file: 7080 on the corpus fixture, corrected after code review Round 1 to 7079 eslint
(`grep -c '^FAIL eslint src/utils/__tests__/helpers/discordV2SendCorpus'`) plus 1 comment-gate (the fixture's 4-line header, CR-1, open: the eslint part is byte-fixed by AC1-1 and outside
AC1-11 by plan revision 6 X-12, the comment part is not covered by X-12; `git hash-object` equals `9fb22ae`), 17 on
`shapes.message-validation.test.ts` (10 errors + 7 warnings at the base tree too; the lines are all
before my appended lines and the per-file count is equal, which is AC1-11's measure) and 4 warnings on
`ThumbnailEditor.tsx` and `MediaGalleryEditor.tsx` (2 each at the base too). I fixed none of the 21
pre-existing findings: the plan scopes the base tree's lint red out (X-10). SKIP 1: the checker does not implement the
ID-token class verbatim; I ran the class's own pattern (`grep -c -i -P`) over every changed file: 0 hits in
each (14 files). SKIP 2: a `.yml` file outside the chain, another session's.

## Fix Round: code review Round 1 (REJECTED at `ee114ff`)

Record: `code-review/016-send-check-validity-code-review.md`. Fix commit `64a3d26` (test-only; `git diff --quiet 64a3d26 -- src/utils/limits.tsx` holds, and `git diff --stat ee114ff 64a3d26` touches three test files only).

**CR-2 (MEDIUM).** The `place()` helper in `limits.v2-send-validity.test.ts` now puts the fault between valid siblings (`[ok, fault, ok]`) in the top-level list, the Container's children, the Action Row's buttons and the gallery's items, and a third placement, `section`, puts the two Text Display faults between two valid Text Displays in a Section's children (the Section walk had no case at all). The cases are the existing `each refused component fault at every placement` table; no new describe. Executed with the reviewer's own instrument, `verification/016/code-review-round1/positional-probe.sh` run in a `git worktree` export of `64a3d26` (removed after), output `verification/016/code-review-round1/positional-probe-64a3d26/`:

| Mutant | ee114ff (review) | 64a3d26 |
|---|---|---|
| top-first | killed 42 | killed 89 of 334 |
| top-last | survived | killed 47 |
| container-first | killed 37 | killed 37 |
| container-last | survived | killed 23 |
| row-first | killed 16 | killed 16 |
| row-last | survived | killed 16 |
| gallery-first | killed 18 | killed 18 |
| gallery-last | survived | killed 16 |
| section-first | survived | killed 2 |
| section-last | survived | killed 2 |

All ten killed. The first-only and last-only mutants are the TDD rows' red against the pre-change shape (the `ee114ff` tests); production is unchanged, so the only red a test can have is against a mutant.

**CR-3 (LOW).** Both "stops typing and pasting at 1024 characters" cases retitled "caps the description input at 1024 characters" (the assertion reads the `maxLength` attribute).

**CR-1 (MEDIUM).** Routed to `planner-hooks-016` (AC1-1's identity) and `qa-hooks-016` (generator). The planner's decision: `make_fixture.py` stops emitting the header comment; QA regenerates with the data unchanged; the planner writes revision 7 with the new sha256 and blob; I hold the re-copy until that message. Not done at this commit.

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---------|---------------------|----------------------------------|--------------------------|
| CR-2: a list walk with no case putting the fault neither first nor last | the reviewer's: `git grep -n -E '\.map\((componentReason\|linkButtonReason\|\(item\) => imageReason)' 64a3d26 -- src/utils/limits.tsx` | 5 hits: `limits.tsx` 207 (Section children), 213 (gallery items), 217 (Container children), 220 (Action Row buttons), 230 (top level) | all five covered by a middle-position case, shown by the probe above. Residual (hits with no killing case): 0 of 5. Widened by me: `git grep -n -E '\.(some\|every\|reduce\|forEach)\(\|for \(' 64a3d26 -- src/utils/limits.tsx` gives 7 hits (lines 34, 37, 53, 72, 78, 142 and the `for` loops), all in `validateDisplayableTextCount` / `validateComponentCount` / `isV2Message`, plan 007 code that this chain did not change; not applicable to the V2 validator |
| CR-3: a title naming an observation where the assertion reads a precondition | `git grep -n "stops typing" -- 'src/**/__tests__/**'` | at `ee114ff`: 2 hits (`MediaGalleryEditor.description-limit.test.tsx:32`, `ThumbnailEditor.description-limit.test.tsx:29`); at `64a3d26`: 0 | both retitled. I read the other new titles in the diff for the same class and found none |
| CR-1: prose source comments outside the allowlist | `grep -c '^FAIL comment'` over `convention-check` | at `ee114ff`: 1 (the fixture); at `64a3d26`: 1 (same file, `verification/016/implementer-fix-64a3d26/convention-check.txt`) | open, awaiting revision 7 and the regenerated fixture; this is the only member of the class in the chain's range |

**Self-check sweep over the round's diff.** The round changed no production line, so `mutant-gen.js --range ee114ff..64a3d26` has nothing to generate; the mutants the review names are the ten above and all are killed.

**Deweeder, round 3** (range `ee114ff..64a3d26`, table `verification/016/deweed.md` § "Round 3"): removed nothing; 48 rows held as answering CR-2; the three "sends a filled piece" rows kept as controls. The tree was untouched while it ran.

**Test results at `64a3d26`** (`verification/016/implementer-fix-64a3d26/`): `npx vitest run --reporter=json` exit 0, 1506 of 1506 tests in 122 files (1503 at `ee114ff` plus 3 new `section` rows: two refusals and one control), `vitest.json` `numTotalTests`; `pnpm run typecheck` exit 0; `npx eslint` over the three changed files, no output; ID-token class (`grep -c -i -P`) 0 in each changed file; `convention-check` exit 1, the same 7101 FAIL as at `ee114ff` (`grep -c '^FAIL eslint'` 7100 = 7079 on the fixture + 21 pre-existing in the base tree's files, X-10; `grep -c '^FAIL comment'` 1 = the fixture), 0 CANDIDATE, 2 SKIP (as before).

**Self-diagnosis (method).** I wrote the placement cases so that the fault sat last in each list, because that is the order in which the code reads naturally, and tested "a fault is refused" without testing "a fault is refused wherever it sits". I tested the plan's example rather than the property the criterion quantifies over ("every item").

## Outstanding Items

- **Escaped-defect self-diagnosis:** none escaped to a later gate yet. My first test run on `/preview` isolated nothing: the empty default username fired Author's line in the control, so I fixed the fixture, not the assertion (the fixtures now set a valid username).
- **For the reviewer:** the 21 pre-existing lint findings in files I changed are left (X-10). `validateV2Components` has `flags = 0` as a default whose only caller passing nothing is the editor when `message.flags` is undefined.
- **Product behaviour observable outside the service:** the stored `valid` column and the public v1
  API change for rows saved after release (plan § Stored rows). Downstream milestones whose premise
  may expire: none in this chain; Statbot's reading of `valid` is devops's (QA SE-2).
- **Pre-existing, not touched:** the base tree's eslint red (plan X-10).
- **Unverified assumption:** the server's Node major for `trim()` (QA's stated gap).

## Next Steps

Code review (spawn cue to `steering-queue-hooks`), then QA Phase 2, UAT, devops.

## Resumption State

Rewritten at the fix-round seam (after code review Round 1, REJECTED at `ee114ff`). Read this first on resume.

- **Done:** CR-2 and CR-3 fixed at website `64a3d26` (test-only), probe 10 of 10 killed, deweeder round 3 removed nothing, suite 1506 of 1506, typecheck and eslint clean; document updated (§ Fix Round).
- **Open:** CR-1. `planner-hooks-016` decided the structural remedy; `qa-hooks-016` regenerates `verification/016/corpus/fixture/discordV2SendCorpus.ts` without the header comment (and lint-clean if it can, AF-14); the planner writes revision 7 and messages me the new sha256 and blob. **Hold the re-copy until that message; never edit the copy by hand.**
- **Next on revision 7's digest:** `cp` the fixture into `src/utils/__tests__/helpers/discordV2SendCorpus.ts`, check `sha256sum` and `git hash-object` equal revision 7's, run the suite (the corpus cases need 86 and 34), typecheck, `convention-check` (`grep -c '^FAIL comment'` must be 0), commit by pathspec, send the new range to the deweeder (the fixture is not a test case but the helper changed), move `Handoff-At`, deliver to `code-reviewer-hooks-016` as a sub-entry of Round 1 scoped to `ee114ff..<tip>`.
- **Trees:** website on `chain/016-send-check-validity` at `64a3d26`, clean apart from `.playwright-mcp/` (another session's). Probe worktree removed.
- **Cache-warm wake:** armed (job re-arms itself every 55 minutes).
