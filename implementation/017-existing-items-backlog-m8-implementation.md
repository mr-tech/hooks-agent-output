---
ID: 017
Origin: 017
UUID: 5c3e9a71
Status: Active
Handoff-At: 6555f65 — repos=website; M8 fix round on QAF-22 (test-only, 6555f65); first delivery was c37d41a (production at a5069d6)
---

# Implementation 017 — M8: One Enter answers only the dialog that holds focus (D-26, D-29)

## Plan Reference

`agent-output/planning/017-existing-items-backlog.md`, revision 7, milestone M8 (M8-a to M8-d, "The form, mirrored"). Website chain branch
`chain/017-existing-items-backlog`; base for this milestone is M4's fix tip `5c3d03f` (code review and QA Phase 2 PASS at `5c3d03f`).
Start: `steering/017-rulings.md` block 2026-11-19T05:19Z (`04a5e55`); QA Phase 1 at `7eda138`.

## Date

2026-11-19.

## Changelog

| Date | Agent | Change |
|---|---|---|
| 2026-11-19T05:24 | implementer-hooks-017 | Resumed chain 017 on `steering-roadmap-hooks`'s message; M8 opened first (smallest, no shared file with M5 or M6). Plan Status stays In Progress; Status-Detail current (plan R-29, agent-output `98017a5`). |
| 2026-11-19T05:35 | implementer-hooks-017 | M8 built and committed at website `a5069d6` (production and 29 cases), `7780dac` (one case), `c37d41a` (one case). Full suite 1724 of 1724, exit 0; typecheck exit 0. Handed to code review at `c37d41a`. |
| 2026-11-19T06:01 | implementer-hooks-017 | Fix round on QA Phase 2 (QA Failed at `c37d41a`, QAF-22 MEDIUM, QAF-23 LOW) and code review Round 5 (CR-12 LOW). Test-only at website `6555f65`; full suite 1811 of 1811 exit 0 (the tree now holds M5's tests too); typecheck exit 0. Section `## Fix Round (QAF-22, QAF-23, CR-12)` below. The 05:35 row's claim that `row-warning-enabled-dropped` is equivalent was false and is corrected in place. |

## Implementation Summary

`src/utils/hooks/useDialogEnter.ts` (new) is the one place Enter is bound for a dialog's answer: it takes the answer and an `enabled` flag, returns a
ref, and runs the answer only when `ref.current?.closest('[role="dialog"]')?.contains(document.activeElement)`. This is the check
M4's `ConfirmationDialog` carried inline since `a5dd76f` (CR-9's form); lifting it is the plan's preferred form (AF-23), so the three dialogs
call one function and none holds a copy. `ConfirmationDialog` (`Inner`) calls it with the default `enabled`; `WarningDialog` and `ImageUploader` call it with
`open` and `isOpen`, and each puts the ref on a `div.contents` inside its own panel (the children of `PresetDialog`), so the ref is per instance and
inside the panel, as the plan's "where the ref goes" states. The dead compare `document.activeElement?.tagName !== '~/components/Button'` is gone from the
two remaining sites (M8-d).

## Milestones Completed

M8-a to M8-d in one slice, commit `a5069d6` (production: `useDialogEnter.ts`, `WarningDialog.tsx`, `ImageUploader.tsx`, `ConfirmationDialog.tsx`; tests: the two
new files, the shared `helpers/enter.ts`, and the layout file's import of it). `7780dac` and `c37d41a` follow, tests only: the image dialog's case for an image
that loaded after it opened (closes the mutant `row-hook-deps-empty`) and its case for a closed instance with focus in its hidden dialog (closes NM-34).

## Entry Conditions

| Condition | Where satisfied | Pinned by |
|---|---|---|
| Stage start | `steering/017-rulings.md` block 2026-11-19T05:19Z (`04a5e55`) | not owed |
| QA Phase 1 covering M8 | `qa/017-existing-items-backlog-qa.md` at `7eda138`, § "Phase 1 re-key on plan revision 7": NM-30 to NM-38, EC-3, EC-4, B-13 | not owed |
| Open questions | none open (OQ-14 is D-29; the rulings block states 0 unresolved) | not owed |
| Premise | M8 is not `PREMISE-STALE` (plan § M8 "Re-derivation gate") | not owed |
| M8-a, the three listings re-run at the tip first | `m8/m8a-listings-5c3d03f.out` (before the change: 3 hits, 0, 1; M8-d count 2 files) and `m8/m8a-listings-tip.out` (after) | not owed |
| M8-b, each open dialog answers only when focus lies inside it; the table's rows | the W and U, I and U rows in `WarningDialog.enter-scope`, `ImageUploader.enter-scope` | "answers only the update prompt with focus on %s" (both files, red at `5c3d03f`), "answers only the warning with focus on %s", "answers only the image dialog with focus on its dialog element", "answers only the update prompt's Reload with focus on it", "leaves the warning answerable on its own after the update prompt is answered" |
| M8-b, each mounted instance (EC-4, NM-35) | two mounted `ImageUploader` instances, the first and the second open | "answers only the open instance when the %s is the open one" |
| M8-b, none of W, I open: nothing (NM-34) | a closed instance mounted beside an open one answers nothing even with focus in its hidden dialog; a closed `WarningDialog` answers nothing | "answers nothing from a closed instance, even with focus resting in its hidden dialog", "answers nothing once closed" |
| M8-b, `submit` set only while an image is loaded (NM-37) | "alone, with no image loaded", the dialog-element row; and an image that loaded after the dialog opened | "with focus on its dialog element" (no image), "sets an image that loaded after the dialog opened when Enter is pressed off its buttons" |
| M8-b, U and L: M4-b unchanged, no case owed for W or I with L, or W and I | the layout file's M4 Enter cases, run unchanged (NM-38) | `layout.navigation-guard` "answers only the prompt that holds focus when Enter is pressed with both open" |
| M8-c, a lone dialog as at `1ad625e`, every focus position; expected values are literals recorded at `1ad625e` (EC-3: the dialog's text and the dialog's own element) | `m8/lone-literals-1ad625e.json`: the same files run in a `git archive` export of `1ad625e`, every "alone" row green there | "alone" describes in both files |
| M8-c, off-button position covers the dialog element (outside the content wrapper) and the text (inside it) (EC-3, NM-33) | W and U rows use both elements; lone rows use both for W and the dialog element for I | the rows named above; NM-33 killed |
| M8-c, Enter in the URL field (NM-36) | "alone, with an image loaded" and "with no image loaded", the URL field row | "with focus on its URL field" |
| M8-d, `git grep -c "tagName !== '~/components/Button'" -- src` prints no line at the tip | `m8/m8a-listings-tip.out` (command exit 1, no line) | not owed |
| QA's entry condition: the real `react-hotkeys-hook`; focus moved and asserted before every Enter; `1ad625e` literals recorded from an export of `1ad625e` | no module mock of the library in either file; `focusAndCheck` asserts `document.activeElement` before each `enter()`; `m8/lone-literals-1ad625e.json` | not owed |

## User-visible flows (derived from the codebase)

M8 touches a user-visible surface (the Enter key in two dialogs). Every flow is stated by the plan (M8-b, M8-c) or by the 05:01Z direction; none holds a decision.

| Flow | Surface | Trigger | What happens next | Rung of the pattern ladder |
|---|---|---|---|---|
| Enter with focus in a delete warning ("Delete Field?" and the like), alone | `WarningDialog` | Enter with focus off its buttons | the delete runs, as at `1ad625e`; on a button, only that button | rung 1: the same hotkey as at `1ad625e` |
| Enter with focus in the image dialog, alone | `ImageUploader` | Enter with focus off its buttons | with an image loaded, it is set and the dialog closes; with none, nothing | rung 1: as at `1ad625e` |
| Enter with "Message Update Detected" open over one of them | the three dialogs | Enter with focus in the update prompt | only the update prompt answers; the dialog underneath stays open and can be answered on its own | rung 1: M4's `ConfirmationDialog` scope (`a5dd76f`), extended to the other two |
| Enter with focus outside every dialog while one is open | the two dialogs | Enter | nothing answers (the plan's one stated change, M8-c) | the same rung; headlessui's focus trap keeps focus inside the open panel, so ordinary input cannot reach it |

No flow holds a decision, so no question goes to the owner.

## Deviations

None. The plan's preferred form (the lifted function) was built; no inline third copy exists.

## Files Modified

| Path | Changes | Lines |
|---|---|---|
| `src/components/WarningDialog.tsx` | the inline hotkey and its dead compare replaced by `useDialogEnter(onConfirm, open)`; the fragment child becomes `div.contents` holding the ref | +4 −6 (`git diff --numstat 5c3d03f c37d41a`) |
| `src/components/ImageUploader.tsx` | the same with `useDialogEnter(submit, isOpen)`; the panel's children wrapped in `div.contents` (the lint's JSX indentation re-indents the wrapped block: `git diff -w` shows 4 changed lines) | +58 −58 (`git diff --numstat`); +4 −4 under `git diff -w --numstat` |
| `src/components/ConfirmationDialog.tsx` | `Inner` calls the lifted function; its own ref and `useHotkeys` call removed; behaviour as approved at `a5dd76f` | +3 −7 |
| `src/app/message/__tests__/layout.navigation-guard.test.tsx` | its local `enter()` replaced by the shared helper (behaviour-preserving, evidence below) | +1 −9 |

## Files Created

| Path | Purpose |
|---|---|
| `src/utils/hooks/useDialogEnter.ts` | the lifted check: Enter answers only when focus lies inside the ref's own dialog |
| `src/components/__tests__/WarningDialog.enter-scope.test.tsx` | `WarningDialog` alone, beside the update prompt in both focus positions, closed (12 cases, 185 lines) |
| `src/components/__tests__/ImageUploader.enter-scope.test.tsx` | `ImageUploader` alone with and without an image, beside the update prompt, two instances mounted, a closed instance (19 cases, 272 lines) |
| `src/components/__tests__/helpers/enter.ts` | the shared Enter dispatch (keydown then keyup on the active element) |

## Patterns Extended

| Surface | Pattern extended | Rung |
|---|---|---|
| the dialogs' Enter scope | `ConfirmationDialog`'s `Inner` check (`a5dd76f`), lifted to one hook the three call | in-repo |
| `useDialogEnter` file and call shape | `useUnloadAlert.ts` (a default-exported hook, `'use client'`) | in-repo |
| tests | `mountDom`, `ConfirmationProvider` with the real `ConfirmationDialog`, the layout file's `enter`, `focus then assert` and the real `react-hotkeys-hook` (M4's Round 4 lesson) | in-repo |
| the lifted Enter dispatch | `helpers/` at the second consumer, lifted from the layout file's local copy | in-repo |

Sibling sweep: predicate 1, text: `git grep -n "useHotkeys(" -- src ':!**/__tests__/**'` (and the plan's three M8-a listings); predicate 2, reference query: Serena
`find_referencing_symbols` is not available in this session and `typescript-language-server` is not on `PATH`, so not run. Results are in the Class Sweep.

## TDD Compliance

Red captures are under `verification/017/impl/m8/`. `useDialogEnter` is exercised through the components that call it (no test imports it directly), so there is no
compile-time red for it; every row is an assertion-level red against the pre-change tree (`5c3d03f`).

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|---|---|---|---|---|---|
| `useDialogEnter` through `WarningDialog`: with "Message Update Detected" open, Enter with focus in the update prompt (dialog element, message text) answers only the prompt; after it is answered the warning answers on its own | `WarningDialog.enter-scope.test.tsx` | Yes | Yes, `red-warning-5c3d03f.json` (3 of 12 failing; the nine "alone", "warning focused" and "Reload focused" rows pass, as controls) | AssertionError `expected { warnConfirm: 1, warnClose: +0, …(1) } to deeply equal { warnConfirm: 0, … }` (the warning's confirm ran with the update prompt's) | Yes, `green-m8-tests.json` (29 of 29 with the image file's first 17) |
| `useDialogEnter` through `ImageUploader`: with the update prompt open, Enter with focus in it answers only the prompt | `ImageUploader.enter-scope.test.tsx` | Yes | Yes, `red-image-5c3d03f.json` (2 of 17 failing; the rest are controls) | AssertionError `expected { close: 1, setImage: 1, …(3) } to deeply equal { close: +0, setImage: +0, …(3) }` | Yes |
| a lone `WarningDialog` and a lone `ImageUploader` behave as at `1ad625e` at every focus position (M8-c) | both files, "alone" describes | Yes | not a red: this is the "no change" limb. The expected values are literals recorded from the same cases run in an export of `1ad625e` (`lone-literals-1ad625e.json`: all 21 "alone" and control rows green there) and held by the mutants NM-33, NM-36, NM-37 and `row-warning-ref-unattached` (killed, below) | not owed (control rows) | Yes |
| an image that loaded after the dialog opened is set by Enter (`submit` is current) | `ImageUploader.enter-scope.test.tsx` "sets an image that loaded after the dialog opened…" | No (added after the first green, from the guard list) | closed by the mutant `row-hook-deps-empty` (the hook's dependency array emptied): killed, 1 failing | AssertionError (`setImage` not called) | Yes |
| a closed image-dialog instance answers nothing even with focus in its hidden dialog (NM-34) | same, "answers nothing from a closed instance…" | No (added after NM-34 survived the first sweep) | closed by NM-34 at `c37d41a`: killed, 1 failing (it survived at `a5069d6`, `a5069d6-named-sweep.out`) | AssertionError (`setImage` of the closed instance ran) | Yes |
| the shared `enter` helper lifted from the layout file | `helpers/enter.ts`; caller `layout.navigation-guard.test.tsx` | not owed: a behaviour-preserving extraction of a test helper | the evidence the extraction rule asks for: both trees executed over the layout file; the per-file case titles and statuses are identical by path (`layout-before-enter-lift-5c3d03f.json` against `layout-after-enter-lift.json`: 33 and 33 cases, 33 passed both) | not owed | Yes |
| `ConfirmationDialog` calls the lifted function | `layout.navigation-guard.test.tsx`, M4's Enter cases, unchanged | not owed: a behaviour-preserving extraction of production code | executed both trees over the surface: the 33 layout cases green at `5c3d03f` (inline check) and green after (`layout-after-enter-lift.json` is the post-lift run), and NM-38 (the lift changing the scope) killed by 13 cases | not owed | Yes |

`tdd-check.py` refuses JavaScript and TypeScript, so the rows above are read, not tool-checked.

## Class Sweep

First delivery. The gap my negative control exposed: NM-34 survived the first sweep (a `enabled` guard that only a case with focus inside the closed instance can discriminate);
the class, defined by its effect: a closed dialog instance that stays mounted and could answer an Enter meant for an open one.

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| Class A, a dialog Enter answer that listens at the document (CR-9's class, the plan's M8-a) | `git grep -n "useHotkeys(\['enter'\]" -- src ':!**/__tests__/**'` at the tip (`m8a-listings-tip.out`), plus the plan's raw-listener and `useDocumentEventListener('keydown'` listings | 1 hit: `src/utils/hooks/useDialogEnter.ts:9`. Raw listener: 0. `useDocumentEventListener('keydown'`: 1, `EmojiPicker/Root.tsx:58`. Before the change (`m8a-listings-5c3d03f.out`): 3, 0, 1 | the one hit is the lifted, scoped binding; `EmojiPicker/Root.tsx` tracks Shift, not a dialog's answer: not applicable (the plan's non-member). Residual 1, dispositioned |
| Class B, a dialog that answers Enter when it is closed but mounted (`unmount={false}` or a closed panel) | `git grep -n "unmount={false}" -- src ':!**/__tests__/**'` | `ImageUploader.tsx` (`PresetDialog … unmount={false}`) and `PresetDialog.tsx` (its prop) | `ImageUploader`: `enabled` is `isOpen`, covered by NM-34 (killed). `PresetDialog`: the prop's definition. Residual 0 |
| Class C, the dead tag-name compare | `git grep -c "tagName !== '~/components/Button'" -- src` (M8-d) | 0 hits, command exit 1, no line (was 2 files at `5c3d03f`, 3 at `1ad625e`) | closed (M8-d) |
| Class D, the other `useHotkeys` sites (are any a dialog's answer?) | `git grep -n "useHotkeys(" -- src ':!**/__tests__/**'` | 4 hits: `Sidebar.tsx:44` and `Navigation.tsx:100` (`esc` closes the sidebar), `edit/page.tsx:80` (the `ctrl+…` hot-key map), `useDialogEnter.ts:9` | the first three are not a dialog's answer (the plan's M8-a list); the fourth is the lifted binding. Residual 0 |

## Test Execution Results

Environment: website `chain/017-existing-items-backlog`, vitest 4.1.2; network-isolated (`unshare -rn`) for every run; mutation runs in `git archive` exports with `node_modules`
shared read-only; the shared tree never mutated; the exports were removed at the end of the run.

| Command | Result |
|---|---|
| `npx vitest run --reporter=json` at `c37d41a` (`vitest-m8-c37d41a.{json,out,exit}`) | 1724 of 1724 passed, 138 test files (`testResults` length), 0 failed, `success` true; process exit code 0; count method: the reporter's `numTotalTests`/`numPassedTests`/`numFailedTests`. M4's 1693 plus 12 + 19 new cases |
| `pnpm run typecheck` (both programs) (`typecheck-c37d41a.{out,exit}`) | exit 0 |
| `npx eslint` over the 8 changed or created files | 0 findings (the lint's `--fix` re-indented `ImageUploader.tsx`'s wrapped block and my first test drafts' two long lines; satisfied, not worked around) |
| `node ~/.claude/tools/convention-check.js website --since=5c3d03f` at `7780dac` (`convention-check-7780dac.out`) | 0 FAIL, 0 CANDIDATE, 18 SKIP: `.playwright-mcp/*.png` (held, not examined), and the checker's note that it does not implement the ID-token class verbatim, so basename and title ID tokens were not checked by it; my new names carry none by reading (`WarningDialog.enter-scope`, `ImageUploader.enter-scope`, `useDialogEnter`, `enter`) |
| Named mutants NM-30 to NM-38 and row mutants (`a5069d6-named-mutants-edits.json`, `mutate-edits.py`, `a5069d6-named-sweep.out`, `c37d41a-rerun.out`) | 16 of 17 killed at `a5069d6`; NM-34 survived and is killed at `c37d41a`; `row-warning-enabled-dropped` survives (equivalent, below) |
| Self-check sweep over `5c3d03f..c37d41a` (`mutant-gen.js --range`, `sweep-mutants-c37d41a….json`, `sweep-out-c37d41a…/`, `sweep-run-c37d41a….out`) | 3 of 14 killed (stillborn 0, aborted 0, control-failed 0); 11 survivors, dispositioned below |

Named mutants (QA's list), each made as one change set in the `a5069d6` export (`mutate-edits.py`), failing cases counted over the three test files that bear on them:

| Named mutant | Made as | Result |
|---|---|---|
| NM-30, `WarningDialog`'s Enter answers whatever holds focus | the local inline `useHotkeys` call returns, with no gate | killed, 3 failing (the W and U red rows and the answer-on-its-own row) |
| NM-31, the same for `ImageUploader` | the same in `ImageUploader.tsx` | killed, 2 failing |
| NM-32, the gate accepts focus inside any dialog | `document.activeElement?.closest('[role="dialog"]')` in the hook | killed, 10 failing |
| NM-33, the gate tests only the content wrapper | `ref.current?.contains(document.activeElement)` | killed, 13 failing (including the dialog-element rows, which only the `closest` form passes: EC-3) |
| NM-34, `ImageUploader`'s hotkey stays enabled while closed | `useDialogEnter(submit)` | SURVIVED at `a5069d6` (no case put focus inside a closed instance's hidden dialog); a case added; killed at `c37d41a`, 1 failing |
| NM-35, one ref shared by every instance | a module-scope holder replaces the per-call `useRef` | killed, 10 failing |
| NM-36, `enableOnFormTags` set | `{ enabled, enableOnFormTags: true }` | killed, 1 failing (the URL-field row) |
| NM-37, `submit` with no image | `useDialogEnter(onSetImage, isOpen)` | killed, 1 failing (the dialog-element row, no image) |
| NM-38, the lift changes `ConfirmationDialog`'s scope | the NM-33 form in the hook the three share | killed, 13 failing, including the layout file's M4 Enter cases |

Row mutants (one per guard of the hook and the wiring; `a5069d6-named-sweep.out`):

| Mutant | Result |
|---|---|
| `row-hook-enabled-default-false` | killed, 7 failing |
| `row-hook-deps-empty` | killed, 1 failing (closes the loaded-after-open case's row) |
| `row-hook-gate-negated` | killed, 17 failing |
| `row-hook-gate-removed` | killed, 10 failing |
| `row-warning-ref-unattached`, `row-image-ref-unattached`, `row-confirmation-ref-unattached` | killed, 5, 6 and 7 failing |
| `row-warning-enabled-dropped` (`useDialogEnter(onConfirm)`) | SURVIVED at `a5069d6` and `c37d41a`. **My first disposition ("equivalent: a closed `WarningDialog` renders no panel") was false** and is withdrawn: `PresetDialog` unmounts the panel only after its 75 ms leave transition, so for that window the panel is mounted and visible with focus inside it and `enabled` alone stops the answer (QA's probe, `verification/017/qa-m8/probe-closing-window/`). Killed at `6555f65` by the leave-window case; see the Fix Round |

Survivors of the self-check sweep (11, all in `ImageUploader.tsx` at lines 97, 101, 110, 116, 121, 147, none a line M8 wrote): the lines hold pre-existing JSX that the lint's indentation rule moved one level
when the wrapper `div.contents` was added, so the generator reads them as added. `git diff -w 5c3d03f c37d41a -- src/components/ImageUploader.tsx` shows four changed lines (the removed import,
the added import, the hook call and the wrapper's open and close). The survivors are mutations of the image-preview markup (`true`, `num`, `not` on class names and `draggable`) and of
the Save button's `isDisabled` (`!localImage && !image`); none is in the Enter path. Not M8 guards; no case added (adding one would test the preview markup, outside the plan). The two M8 lines the sweep reached
in `useDialogEnter.ts` (`:6` the `enabled = true` default and `:10` the gate) are both killed.

Test classes walked on the built tip, member by member (M8-b's table): W alone (dialog element, message text, close, Cancel, confirm), W and U in both focus positions and U's Reload, W answerable on its
own after U is answered, I alone with an image (dialog element, URL field, close, Cancel, Clear, Save) and without one (dialog element, URL field, close, Cancel; Clear and Save are disabled then
and cannot hold focus), an image that loaded after the dialog opened, I and U (U's dialog element and text, I's dialog element, U's Reload), two instances mounted with either open, a closed instance
with focus in its hidden dialog. M8-b's rows for W or I with the link prompt, and for W and I together, are stated unreachable by the plan: no case.

No timeout or time-based test was added; the closing transition of U is awaited by condition (`vi.waitFor`).

## Fix Round (QAF-22, QAF-23, CR-12)

Base `c37d41a`, tip `6555f65` (one commit, tests only: `git diff --numstat c37d41a 6555f65` over the two enter-scope files). Captures under `verification/017/impl/m8/` (`fix1-green.*`, `6555f65-fix-*`).
No production change, no new user-visible flow, no plan change.

TDD Compliance (this round):

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|---|---|---|---|---|---|
| `WarningDialog` answers no Enter while its panel is leaving after `open` turns false (focus on its dialog element, panel still mounted) | `WarningDialog.enter-scope.test.tsx` "answers nothing while its panel is still leaving after it is closed" | Yes (QA's probe is the red case; no production change owed) | Yes, against `useDialogEnter(onConfirm)` in an export of `6555f65` (`6555f65-fix-out/row-warning-enabled-dropped.result.json`): 1 failing, exactly this case | AssertionError (`onConfirm` ran once) | Yes, `fix1-green.json` (33 of 33 in the two files) |
| `ImageUploader` answers no Enter in the same window (its own Enter, `submit` then `onClose`, starts it) | `ImageUploader.enter-scope.test.tsx` "while its panel is still leaving after it is closed" | Yes | Yes, against `useDialogEnter(submit)` (NM-34, `6555f65-fix-out/NM-34-image-enabled-while-closed.result.json`): 2 failing, this case and the hidden-dialog case | AssertionError (`setImage` ran) | Yes |

Both cases assert that focus still lies inside the dialog after `open` is set false, so a vacuous pass (panel already gone) is excluded by the case itself. The existing "answers nothing once closed" and the hidden-dialog case are kept: the first covers a dialog never opened, the second a closed instance that stays mounted.

Class Sweep:

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| QAF-22, a dialog whose Enter answer is gated on an open flag, with no case holding focus in its still-mounted panel during the leave | `git grep -n "useDialogEnter(" -- src ':!**/__tests__/**'` at `6555f65` | 3 hits: `ConfirmationDialog.tsx:14` (no flag: it renders only while a confirmation is set, `props &&`), `ImageUploader.tsx:86` (`isOpen`), `WarningDialog.tsx:19` (`open`) | `ImageUploader` and `WarningDialog`: covered by the two cases above, both mutants killed. `ConfirmationDialog` has no `enabled` argument to drop: the reachable analogue is its content unmounting at once on answer (`props && <Inner …>`), and M4's cases with both prompts open cover its single answer. Residual 0 |
| QAF-22, a mutant I called equivalent by argument without a case driving its path | the Test Execution Results tables of this document | 1: `row-warning-enabled-dropped` | withdrawn above and killed. No other row of the tables is dispositioned equivalent by argument: the sweep's 11 survivors are re-indented lines, each shown by `git diff -w`. Residual 0 |

CR-12 / QAF-23, `FakeImage`: the image dialog's cases replace the global `Image` with `FakeImage` (in `ImageUploader.enter-scope.test.tsx`; the same stand-in the existing `ImageUploader.url-validation` test uses),
which sets `width = 1` and fires `onload` from a microtask when `src` is set, never `onerror`. Its fidelity: `checkImage` in `ImageUploader.tsx` reads only `onload`, `onerror` and `width > 0`, so
every URL the cases enter "loads"; the cases do not test the not-found path (`Invalid url.` / `Image not found.` are covered by `ImageUploader.url-validation`).

Test Execution Results (this round): `npx vitest run --reporter=json` over the whole suite at `6555f65` (`vitest-m8-6555f65.{json,out,exit}`): 1811 of 1811 passed, 143 test files, exit 0; count method: the reporter's counters
and `testResults` length. The tree also holds M5's committed tests (1724 at `c37d41a` plus 87). `pnpm run typecheck` exit 0 (`typecheck-6555f65.exit`). `convention-check.js website --since=c37d41a`: 0 FAIL, 0 CANDIDATE (`convention-check-6555f65.out`).

Process fact: the record-write gate refused one `sed -i` on this document (a changelog stamp); re-issued with the Edit tool, satisfied and not worked around.

Self-diagnosis, for the retrospective: I declared a surviving mutant equivalent from the component's mount structure ("the panel is unmounted when closed") without driving a closing state, and the transition keeps the panel mounted
for 75 ms. A disposition by argument needs the case or probe that drives the argued path; the rule I applied to removing a guard I did not apply to a survivor.

## Outstanding Items

- **For UAT (B-13):** which element a real browser focuses when "Message Update Detected" opens over an open dialog, and that Enter on a focused `Button` stays off the document there, are RK-11's and the plan's
  Assumption Not Checked; jsdom cannot show them. The tests hold either way (exactly one dialog answers, the focused one).
- **Instrument limit:** the closed-instance case focuses an element inside a `display: none` dialog, which jsdom allows and a browser does not. NM-34's kill no longer rests on it alone: the leave-window case (Fix Round) puts focus in a visible panel.
- **The sweep's 11 survivors** are on re-indented existing lines (above), not M8 guards. If the code reviewer prefers the diff to carry no re-indent, the wrapper would have to sit inside
  `PresetDialog` (a change to the shared component); not done.
- **Downstream:** M8 changes product behaviour observable outside the service's source: with the update prompt open over a delete warning or the image dialog, one Enter no longer answers both. M5 to M7 do not read this surface; UAT's B-13 is the milestone whose premise it sets.
- **Self-diagnosis, for the retrospective:** NM-34 survived because my "closed instance" case asked whether a closed instance answers when focus is elsewhere, which the scoped gate already
  answers, not whether the `enabled` flag carries its own part; I tested the plan's sentence, not the guard's conjunct. QA's named mutant found it, and the case that closes it puts focus where only `enabled` decides.

## Next Steps

Back to `code-reviewer-hooks-017` for a scoped check of the test-only round at `6555f65` (range `c37d41a..6555f65`), then QA's refresh (`qa-hooks-017`). Next in the implementer's order: M5 (website), M6 (generator), M7 last.
