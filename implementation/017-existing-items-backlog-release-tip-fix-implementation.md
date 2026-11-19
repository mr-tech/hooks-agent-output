---
ID: 017
Origin: 017
UUID: 5c3e9a71
Status: Active
Handoff-At: 787bec5 — repos=website; QAF-29 at 391c88b, QAF-30 at 787bec5, both test-only on 7293a35
---

# Implementation 017 — release-tip fix round: QAF-29 and QAF-30 (test-only)

## Plan Reference

`agent-output/planning/017-existing-items-backlog.md` (ID 017), M3 (the write matrix row "A share code opened at route 0: written (`codeMessage` effect) [same effect]") and M8 (the dialogs' `contents` wrapper).
Website chain branch `chain/017-existing-items-backlog`, tip before this round `7293a35`. The M3 and M8 implementation documents were closed by devops at Stage 1 (`implementation/closed/017-existing-items-backlog-m3-implementation.md`, `…-m8-…`), so this round has its own document and does not reopen them.

## Date

2026-11-19.

## Changelog

| Date | Agent | Change |
|---|---|---|
| 2026-11-19T19:57 | implementer-hooks-017 | Release-tip QA Phase 3 (`qa/website-7293a35-generator-8512a1d-release-tip-qa.md`, agent-output `4914aaa`) failed on QAF-29 MEDIUM and QAF-30 MEDIUM, both severity-floor and test-only. Steering's block 2026-11-19T19:54Z (`steering/017-rulings.md`, `11b2574`) gives both their round. Four tests added: QAF-29 at website `391c88b`, QAF-30 at `787bec5`. Handoff-At `787bec5`. |

## Implementation Summary

Plan 017's M3 claims that a share code opened at route 0 writes this tab's route-0 draft, and M8 relies on a `display: contents` wrapper in three dialogs so that `PresetDialog`'s flex panel spaces the dialog body.
QA's call-deletion set deleted each and the 1853 tests stayed green. This round adds the failing assertions. No production line changes. Nothing is built that the plan did not state; the two properties were already in the plan, without a test that fails when they are lost.

## Milestones Completed

None new. M3 and M8 are as closed; their claimed behaviour gains a test each.

## Entry Conditions

| Condition | Where satisfied | Pinned by |
|---|---|---|
| Stage start: steering's recorded start of this round | `steering/017-rulings.md`, block 2026-11-19T19:54Z (`11b2574`): "both get a round", the implementer adds the tests | the four cases below |
| QA's remedies: QAF-29 a spec-form case in the existing `MessageProvider.stored-draft` file, tightened first; QAF-30 an assertion in each dialog's existing DOM test that the ref-bearing wrapper's class includes `contents` and holds the message and `DialogFooter`; each seen red under its mutant (ids `index.tsx:153:stmt`, `ConfirmationDialog.tsx:17:attr:2`, `WarningDialog.tsx:23:attr:2`, `ImageUploader.tsx:96:attr:2`) and green at the head | the three existing test files named under Files Modified | the mutant runs below, one case each |
| Open questions | none open for this round (QA's record lists none) | not owed |
| Premise | no `PREMISE-STALE` marking on M3 or M8 in the plan; the findings are of the severity floor, not of the premise | not owed |

## Files Modified

| Path | Changes | Lines |
|---|---|---|
| `src/providers/MessageProvider/__tests__/MessageProvider.stored-draft.test.tsx` | the `useSearchParams` and `message.getFromCode` mocks read `hoisted.search` and `hoisted.fromCode` (both reset in `beforeEach`); one `describe` with one case | +27 −2 |
| `src/components/__tests__/WarningDialog.enter-scope.test.tsx` | helper `bodyWrapperOf`; one `describe` with one case over both dialogs (`it.each`: `WarningDialog`, `ConfirmationDialog`) | +19 |
| `src/components/__tests__/ImageUploader.enter-scope.test.tsx` | helper `bodyWrapperOf`; one `describe` with one case | +16 |

## Files Created

`implementation/017-existing-items-backlog-release-tip-fix-implementation.md` (this document); `verification/017/qaf29-30-fix/` (driver, mutant results, green run).

## Patterns Extended

| Surface | Pattern |
|---|---|
| QAF-29 | `MessageProvider.stored-draft.test.tsx`'s own mount, `visit`, `shown`, `content` and `unmountDom`/`openTab` helpers; the mock extension follows `MessageProvider.transient-toast.test.tsx`, which already feeds `message.getFromCode` through `buildApiMock`'s `queryData` |
| QAF-30 | each file's `dialogOf`, `buttonOf` / `controlOf` and `mountWarning` / `mountUploader`; the wrapper is found from the Cancel button (its parent is the `DialogFooter`, whose parent is the wrapper) |

User-visible flows: none. Tests only; the rendered spacing is a browser look and is UAT's, as QA's remedy says.

## TDD Compliance

The production lines are already right, so each case is green at the tip by construction and its red is QA's deletion mutant of the production line (the form a test-only fix takes), run in an isolated export of `git archive 787bec5`.

TDD Gate: Test `becomes this tab's route-0 draft, shown when route 0 is opened again without the code` fails as expected under `index.tsx:153:stmt` (`writeRouteZeroDraft(tmp);` deleted). Proceeding (production unchanged).
TDD Gate: Test `keeps its message and its footer in one wrapper that takes no box of its own, so the panel's layout spaces them` (rows `WarningDialog`, `ConfirmationDialog`) fails as expected under `WarningDialog.tsx:23:attr:2` and `ConfirmationDialog.tsx:17:attr:2`, one row each. Proceeding.
TDD Gate: Test `keeps its URL field and its footer in one wrapper that takes no box of its own, so the panel's layout spaces them` fails as expected under `ImageUploader.tsx:96:attr:2`. Proceeding.

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|---|---|---|---|---|---|
| `MessageProvider`'s `codeMessage` effect writes the route-0 draft (a share code at route 0 is shown at route 0 again without the code) | `MessageProvider.stored-draft.test.tsx` | Yes (production line exists; test-only) | Yes: mutant `index.tsx:153:stmt` at `787bec5` fails this case alone, 1 of 66 (`verification/017/qaf29-30-fix/787bec5/index.tsx-153-stmt.json`) | AssertionError: the intro message is shown where the share code's message is expected | Yes |
| `ConfirmationDialog`'s ref-bearing wrapper takes no box (`contents`) and holds the message and the footer | `WarningDialog.enter-scope.test.tsx` (row `ConfirmationDialog`) | Yes (same) | Yes: mutant `ConfirmationDialog.tsx:17:attr:2` fails the `ConfirmationDialog` row alone, 1 of 66 (`ConfirmationDialog.tsx-17-attr-2.json`) | AssertionError: `expected false to be true` on the class | Yes |
| `WarningDialog`'s wrapper, same property | same (row `WarningDialog`) | Yes (same) | Yes: mutant `WarningDialog.tsx:23:attr:2` fails the `WarningDialog` row alone, 1 of 66 (`WarningDialog.tsx-23-attr-2.json`) | AssertionError, same | Yes |
| `ImageUploader`'s wrapper, same property | `ImageUploader.enter-scope.test.tsx` | Yes (same) | Yes: mutant `ImageUploader.tsx:96:attr:2` fails this case alone, 1 of 66 (`ImageUploader.tsx-96-attr-2.json`) | AssertionError, same | Yes |

Mutants (isolated exports of `git archive 787bec5`, one exact-once edit each from QA's `web-call-deletion-mutants.json`, vitest over the three test files, network isolated, process group killed at 300 s; driver `verification/017/qaf29-30-fix/run-mutants.py`, results `787bec5/summary.txt`, `leftover exports: 0`): control 0 of 66 failed; the four mutants killed, 1 case each, the case named above.
The first run of the driver wrote its exports to paths with the mutant id's colons and exited 127 for the four mutants (the control ran). The colon in the working directory breaks the `PATH` npx runs under; the driver now writes `-` for `:` on disk, and the second run is the result. Driver defect disclosed; the first outputs were removed.

Fixture, QAF-29: `hoisted.fromCode` is a stored-message shape (`messageId`, `guildId`, `data`) that `storedToActive` turns into the message named "New Message"; the case mounts with `?code=abc`, checks the shown content, unmounts, clears the code and the query data, mounts again at route 0 in the same tab, and expects the shown data and name. The mock returns data whatever `enabled` says, so clearing `hoisted.fromCode` before the second mount is what keeps the second mount from re-running the `codeMessage` effect and masking the write.

Self-check sweep: no production line in the diff, so `mutant-gen.js` has nothing to mutate; QA's call-deletion set is the instrument and these four are its survivors. QA's Named mutants: none of their guards is touched.

## Class Sweep

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| QAF-29. Class: a production call that writes or removes a stored draft, whose deletion no test fails on. Derived by me; QA's instrument is the call-deletion set (58 website mutants, `qa-phase3/web-call-deletion-mutants.json`), which is the enumeration of calls. | `grep -rn "writeRouteZeroDraft(\|writeDraft(\|removeDraft(\|removeRouteZeroDraft(" src --include=*.ts --include=*.tsx --exclude-dir=__tests__` | 12 lines: `index.tsx` 153, 186, 188, 190, 224, 259, 261 (calls from the provider); `messageDrafts.ts` 42, 56, 71, 75, 76, 87, 88 are the helpers' definitions and their internal calls (the wrapper `writeRouteZeroDraft` at 75-76, `removeRouteZeroDraft` at 87-88, and `routeZeroDraftFor` at 71) | the seven provider calls are in QA's set, and QA's table lists the survivors of the 58: `index.tsx:153` (this round), the three `contents` attributes (this round), and `previewImage.ts:124` (`console.error`, QA: residue, no criterion member, not a draft call); so 186, 188, 190, 224, 259 and 261 were killed by existing cases. The helpers' internal calls are inside the helpers and are exercised by every case that reads a draft back. Residual: 0 survivors in the class after this round |
| QAF-30. Class: an element that carries `useDialogEnter`'s ref and relies on `display: contents`. Derived by me from the hook's call sites. | `grep -rn "useDialogEnter(" src --include=*.ts --include=*.tsx --exclude-dir=__tests__` and `grep -rn 'className="contents"' src --include=*.tsx --exclude-dir=__tests__` | `useDialogEnter(`: 3 (`ImageUploader.tsx:86`, `WarningDialog.tsx:19`, `ConfirmationDialog.tsx:14`). `className="contents"`: 3 (`ImageUploader.tsx:96`, `WarningDialog.tsx:23`, `ConfirmationDialog.tsx:17`); one more `contents` in a class list, `EmojiPicker/.../SectionHeader.tsx:32` | the 3 hook sites and the 3 wrappers: each now has a case that fails when its class is dropped (mutants above). `SectionHeader.tsx:32`: not applicable, an `aria-hidden` div in the emoji picker, no dialog hook, outside plan 017's diff. Residual: 0 wrappers without a case (3 of 3 before: 0 of 3 covered) |

## Test Execution Results

| Command | Result |
|---|---|
| The three changed test files, network isolated (`unshare -rn`), at `787bec5` | `MessageProvider.stored-draft` 30 of 30; the two dialog files 36 of 36 |
| Mutants at `787bec5` | control 0 of 66 failed; four mutants, 1 failed each (above) |
| Full suite at `787bec5`, network isolated | 1857 of 1857, 144 files by the reporter's `testResults`, vitest exit 0 (`qaf29-30-fix/green/full-suite.json`, `.exit`); 1853 + 4 |
| `pnpm run typecheck` at `787bec5` | exit 0, both programs (`qaf29-30-fix/green/typecheck.exit`) |
| `eslint`, scoped to the three changed files | exit 0 (file-scoped, not the whole tree) |
| `convention-check.js` | not run this round: tests only, no comment added, titles carry no ID token by hand (`QAF`, `M3`, `M8` appear only in this document) |

## Outstanding Items

- Nothing owed from this round. QAF-28 LOW is devops's carrier amendment (QA's routing), not this round.
- Not asserted: the rendered 16 px spacing itself. jsdom computes no Tailwind layout, so the instrument is the class; the look is UAT's (QA's remedy).
- Self-diagnosis for the retrospective: M3's matrix cell and M8's wrapper were each delivered with a green suite and no case that fails when the claimed line is removed. In both I tested what the surface does on the paths I drove (the `message` effect's write; the Enter key's scope) and not the other cell of the same claim (the `codeMessage` effect's write; the layout the wrapper exists for). The property I should have asked at delivery is "for each line this milestone adds to keep a behaviour, which case fails when it is deleted", the question QA's call-deletion set now asks.

## Next Steps

Code review: scoped check of `7293a35..787bec5` (test-only; `code-reviewer-hooks-017`). Then the architect's delta read at the new website tip (steering's route, devops step 2c), a fresh QA Phase 3 on devops's request, and devops's release ask.
