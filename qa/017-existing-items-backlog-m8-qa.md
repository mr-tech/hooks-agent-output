---
ID: 017
Origin: 017
UUID: 5c3e9a71
Verified-At: "c37d41a — repos=website; M8 only. The suite, the typecheck, the probes and the named sweep ran in isolated git archive exports of c37d41a. The branch had moved to 72a1755 (M5's 9909fb3 and 72a1755) by this pass's end; neither touches M8's files (git diff --quiet c37d41a 72a1755 over src/components, src/utils/hooks and the layout test: exit 0)."
Status: QA Failed
Status-Detail: "M8 fails at website c37d41a on QAF-22 MEDIUM: no case fails when WarningDialog's hotkey stops being gated on open. The implementer and code review recorded that mutant as equivalent; a probe shows it is not. The fix is test-only. Suite 1724 of 1724, exit 0. 11 of QA's 12 mutants are killed. Milestone-scoped, so plan Status is unmoved."
Phase: 2
---

# QA Report: Plan 017 — M8 (one Enter answers only the dialog that holds focus)

**Plan Reference**: `agent-output/planning/017-existing-items-backlog.md`, revision 7. The plan's diff since my revision 7
re-key (`6ade256..225e4f3`) is rows R-27 to R-30, the Reading Order's "owed" cells and Status-Detail, so no criterion moved.
**Implementation Reference**: `implementation/017-existing-items-backlog-m8-implementation.md`, `Handoff-At: c37d41a`
(agent-output `167ec86`).
**Stage start**: code review Round 5, APPROVED_WITH_COMMENTS, `Reviewed-At: c37d41a`
(`code-review/017-existing-items-backlog-code-review.md`, agent-output `4950989`; plan row R-30 `225e4f3`), re-derived at
the record. `code-reviewer-hooks-017`'s message was the hand-off. Steering's brief for M8 has not arrived, so the stage start is
the committed review verdict. The plan's Decisions Register (D-26, D-29) and the predecessor's Assumption Not Checked (Round 5,
RK-11 to UAT B-13) were read for this pass.
**Blocking-condition register**: `qa/017-existing-items-backlog-qa.md`. This pass appends no row. B-13 (M8's human-observable
form, UAT) is inherited.
**Captures**: `verification/017/qa-m8/`.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-19T05:56 | code-reviewer-hooks-017 (cross-session message; review `4950989`, plan R-30 `225e4f3`) | QA Phase 2 for M8 at website `c37d41a` | Phase 2, M8 only. Suite 1724 of 1724, exit 0; typecheck exit 0; 136 shared files keep the same case sets. QA's named set: 11 of 12 killed. `qa-warning-enabled-dropped` survives, and a probe shows it is not equivalent. **QA Failed** on QAF-22 MEDIUM. QAF-23 LOW duplicates CR-12. Process fact: NM-35's first form did not parse (ABORTED, my instrument) and was re-run corrected and alone. |
| 2026-11-19T06:01 | steering-roadmap-hooks (cross-session message; rulings `9349040`) | M8 capped, block 06:01Z | QAF-23 is routed to the Planner batch as a stated limit and no longer rides QAF-22's round. QAF-22 keeps its round. The verdict is unmoved. |

## Criteria assessed

I recorded these before running anything: M8-a to M8-d, M8-b's decision table row by row, M8-c's positions per member, and
"The form, mirrored" (NM-38), as plan § `### M8` states them at revision 7. Also the Phase 1 obligations: NM-30 to NM-38, EC-3
(the off-button position covers the dialog element and the text), EC-4 (two mounted `ImageUploader` instances), and my
revision-6 entry condition: the real `react-hotkeys-hook`, focus asserted before each Enter, and `1ad625e` literals from a
`1ad625e` run.

**Example classes.**
- M8-b names its members as a finite table, so it is verified per row below.
- M8-c lists its positions per member, so it is verified per position.
- The human-observable form ("Delete Field?") is one example of W's three titles. All three render one component,
  `WarningDialog`, with the same props shape, so the component cases cover the class. The call sites are `EmbedField.tsx`,
  `EmbedEditor/index.tsx` and `ComponentEditor.tsx`.

## Implementation Review (Post-Implementation)

- **TDD gate.** The table is present.
  - The new function, `useDialogEnter`, is exercised through its callers. It has two rows with assertion-level reds against
    `5c3d03f`: warning 3 of 12, image 2 of 17.
  - Two rows say "No": the loaded-after-open case and the closed-instance case. Neither is a new function, and each names the
    mutant that closed it.
  - The two extractions are each claimed behaviour-preserving, with an execution of both trees: the test helper `enter`, and
    `ConfirmationDialog`'s check moved into the hook.
  - The gate passed.
- **Production diff.** `git diff --numstat 5c3d03f c37d41a` covers four production paths: `useDialogEnter.ts` (new),
  `WarningDialog.tsx`, `ImageUploader.tsx` and `ConfirmationDialog.tsx`. These are the plan's surfaces plus the lifted
  sibling. `git diff -w` on `ImageUploader.tsx` is the import, the hook call and the wrapper only. No overreach.
- **M8-a and M8-d, re-derived at the tip** (`qa-m8/m8a-listings-c37d41a.out`):
  - `useHotkeys(['enter']` gives 1 hit, `useDialogEnter.ts:9`.
  - A raw `addEventListener('keydown'` gives no line (exit 1).
  - `useDocumentEventListener('keydown'` gives 1 hit, `EmojiPicker/Root.tsx:58`, the plan's non-member.
  - M8-d's command prints no line (exit 1). Its positive control is the same command at `5c3d03f`, which prints 2 files.
  - `useDialogEnter(` has 3 callers: `ConfirmationDialog` (default `enabled`), `ImageUploader` (`isOpen`) and
    `WarningDialog` (`open`).
- **Libraries.** The shared tree's `package.json` and lockfile carry another session's additions, `@vercel/functions`, which
  are uncommitted at this pass's start and are in `9909fb3` by its end. The lockfile diff adds lines only. The linked
  `node_modules` has `react-hotkeys-hook` 5.2.4 and `@headlessui/react` 2.2.9, the versions `pnpm-lock.yaml` names at
  `c37d41a`.
- **Nesting.** The gate reads `closest('[role="dialog"]')`. A dialog rendered inside another dialog's DOM would make the
  outer one answer for the inner. So I checked that no W, I or U render site sits inside another dialog:
  - The headlessui dialogs in production source are the `PresetDialog` users and `Drawer`. Two instruments agree that
    nothing renders `Drawer`. `<Drawer` appears only in its own wrapper and in a comment in `Sidebar.tsx`. Its one importer
    is a preload, `void import('~/components/Drawer')` in `edit/page.tsx`.
  - The editor page renders `DiscordMessageEditor`, which renders W and I, outside every dialog. U (`<ConfirmationDialog />`)
    is a sibling of the editor.
  - So none is nested, and no finding follows.

## Test Coverage Analysis

M8-b's table, row by row, each mapped to its case in the `c37d41a` run (W = `WarningDialog.enter-scope`, I =
`ImageUploader.enter-scope`). The mutants named are QA's, from `qa-m8/m8-mutants-qa.json` and `m8-mutants-qa-nm35.json`; "carries
alone" means that mutant reddens the case.

| Row (open; focus) | Case | Carries alone (QA mutant) |
|---|---|---|
| W alone; W off its buttons | W "alone … its dialog element", "… its message text" | NM-33 (dialog element). The text case is reddened by none (below). |
| W alone; one of W's buttons | W "alone … close button", "… Cancel", "… the confirm button" | none: the react-aria `Button` handles Enter, so no M8 code decides here (a control on the library premise) |
| I alone; I off its buttons | I "alone, with an image … its dialog element", "sets the loaded image …"; "with no image … its dialog element"; "sets an image that loaded after the dialog opened …" | NM-33; NM-37 (no image) |
| I alone; buttons or URL field | I "alone, with an image … URL field", close, Cancel, Clear, Save; "with no image …" URL field, close, Cancel | NM-36 (URL field, image loaded); the rest none (library premise). Without an image, Clear and Save are `isDisabled` (`!localImage`; `!localImage && !image`), so they cannot hold focus. |
| W and U; U off its buttons (red) | W "answers only the update prompt with focus on %s" ×2 | NM-30, NM-32, NM-33, NM-35, `qa-confirmation-enter-disabled` |
| W and U; W off its buttons | W "answers only the warning with focus on %s" ×2 | NM-32, NM-38, NM-35 (NM-33 on the dialog element) |
| W and U; U's Reload | W "answers only the update prompt's Reload …" | none (the plan marks it not discriminating) |
| I and U; U off its buttons (red) | I "answers only the update prompt with focus on %s" ×2 | NM-31, NM-32, NM-35, `qa-confirmation-enter-disabled` (NM-33 on the dialog element) |
| I and U; I off its buttons | I "answers only the image dialog with focus on its dialog element" | NM-32, NM-33, NM-35, NM-38 |
| U and L | layout "answers only the prompt that holds focus … the link prompt first", "… the update prompt first" | NM-32, NM-33, NM-35, NM-38, `qa-confirmation-enter-disabled` |
| W or I with L; W and I | no case owed (plan: unreachable). The nesting check above found no render site that puts one inside another. | — |
| none of W, I open | W "answers nothing once closed"; I "answers nothing from a closed instance, even with focus resting in its hidden dialog" | I: NM-34, `qa-hook-enabled-not-passed`, NM-31, NM-32. W: **none**. `qa-warning-enabled-dropped` survives (QAF-22). |
| each mounted instance (EC-4) | I "answers only the open instance when the %s is the open one" ×2 | NM-35 (first), NM-33 |

The other column, "every other open dialog stays open and unanswered, and can be answered on its own":
- *Unanswered* is asserted by the call counts in every two-dialog row.
- *Stays open*:
  - For U it is asserted (`dialogs(UPDATE)` and the body text), because U closes through real provider state.
  - For W and I the `open` and `isOpen` props are fixed in the fixture, so the check cannot fail. The call counts (`warnClose`
    and `close` at 0) carry it instead.
- *Answerable on its own afterwards*:
  - It has one case, W after U is answered. That case reddens under any change to the shared hook's gate.
  - The hook keeps no state across events beyond its ref (read at `c37d41a`). So the other rows' "afterwards" reduces to each
    dialog's lone row, which is covered.
  - This is recorded as residue, not a finding: no mutant I could form that is not a latch planted for the purpose separates
    the rows.

M8-c, per position:
- **W**: the dialog element, the message text, the close button, Cancel and the confirm button. Each has a case, and each is
  green at `1ad625e`.
- **I**: the dialog element, the URL field, the close button, Cancel, Clear and Save with an image; and the dialog element,
  the URL field, the close button and Cancel without one (Clear and Save are disabled then). Each has a case, and each is green
  at `1ad625e`.
- So all 18 "alone" cases pass in a `git archive 1ad625e` export, by the reporter's statuses in
  `qa-m8/tests-c37d41a-at-1ad625e.json`.
  - That run is 31 cases: 22 passed, 9 failed.
  - The 9 that fail are the 8 two-dialog rows that answer at the base (the U-focused rows, the W-focused and I-focused
    controls, and the "afterwards" row) plus the closed-instance row. At `1ad625e` the open instance's unscoped hotkey answers
    there.
  - The literals are the base's own behaviour (axiom E). This agrees with code review's figure.

**Seen-red coverage** (`qa-m8/seen-red-coverage.{py,out}`). The predicate: cases in the two M8 files, by `fullName` in
`vitest-c37d41a.json`, crossed with the `failing_titles` of every KILLED row in QA's two kill tables. 31 cases, 17 reddened, 14
never reddened. The instrument fires on its own run, so the 17 are its positive control. The 14 by reason:
- **10 are library-premise controls.** On each, a react-aria `Button` or a form field takes Enter before any document
  listener:
  - W: close, Cancel, confirm;
  - I with an image: close, Cancel, Clear, Save;
  - I without one: URL field, close, Cancel.

  They would fail only if Enter on a focused control also reached the hook. That is RK-11's browser question (UAT B-13), not
  M8's code. Non-discriminating against M8's diff.
- **2 Reload rows.** The plan marks them not discriminating.
- **W "alone … its message text".** NM-33 keeps the text inside the wrapper, so it passes. No mutant in the set gates on the
  dialog element alone. Non-discriminating under this set. Its sibling, the dialog-element case, carries the row.
- **W "answers nothing once closed".** It mounts W never open, so no panel exists and no gate is reached. Non-discriminating.
  This is QAF-22.

**Conventions** (`qa-m8/audit-predicates-m8.sh`, `.out`, over the two new files, `helpers/enter.ts` and the layout file at
`c37d41a`):
- ID tokens: 0 in titles, comments and basenames. The predicate's positive control fires 2 of 2.
- Both new basenames take the positive form. The helper sits under `src/components/__tests__/helpers/`.
- No source-text read, and no timer or clock read (the close is awaited with `vi.waitFor`). The "local render" hits
  (`mountWarning`, `mountUploader`, `mountTwo`) are fixture builders over `mountDom`, not hand-rolled renderers.
- No M8 file mocks `react-hotkeys-hook`.
- Helper policy: `focusAndCheck`, `dialogOf` and `Capture` have 2 copies each, so the third-copy lift is not yet owed.
- Fixtures:
  - `FakeImage` stands in for the browser's `Image` (QAF-23).
  - `textOf` and `messageTextOf` make a `p` focusable (`tabIndex = -1`) to place focus inside the content wrapper. EC-3 asked
    for that position. A browser user clicking the text focuses the nearest focusable ancestor instead. The case stands for "inside the wrapper, off
    the buttons", which W's panel offers a browser user no element for. Stated as a fixture limit; no finding.

## Test Execution Results

Every capture is under `verification/017/qa-m8/`. Every run was network-isolated (`unshare -rn`) in a `git archive` export
of website `c37d41a` with `node_modules` linked. The blobs of the 8 M8 paths were checked equal to `c37d41a`'s by
`git hash-object`.

| Command | Result |
|---|---|
| `npx vitest run --reporter=json` (`vitest-c37d41a.{json,out,exit}`) | 1724 of 1724 passed, 138 `testResults`, `success` true, process exit 0 |
| `pnpm run typecheck`, both programs (`typecheck-c37d41a.{out,exit}`) | exit 0 |
| `qa-m1/suite-compare.mjs` against `qa-m4-refresh/vitest-5c3d03f.json` (`compare-qa5c3d03f-vs-qac37d41a.out`) | No path is only in the base run. Two paths are only in the tip run: the two new files, 12 + 19 = 31 cases, 1693 + 31 = 1724. All 136 shared files keep the same (title, status) set, including the layout file's 33. |
| M8's two files run in an export of `1ad625e` (`tests-c37d41a-at-1ad625e.{json,out,exit}`) | 22 of 31 pass, exit 1; all 18 "alone" cases pass (above) |
| Closing-window probe (`probe-closing-window/`: the probe file, `run.sh`, `<variant>.probe`, `.out`, `.exit`) | below |
| QA's named sweep, `mutation-run.py --sha c37d41a`, whole suite (`m8-mutants-qa.json` blob `a1c17ca`, `sweep/`, `sweep-run.{out,err,exit}`) | Control 1724, exit 0. 10 KILLED, 1 SURVIVED, 1 ABORTED (NM-35: my anchor mixed `??` and `&&`, a parse error, 1403 run) |
| NM-35 corrected, alone (`m8-mutants-qa-nm35.json` blob `1a1d2c6`, `sweep-nm35/`, `sweep-nm35-run.{out,err,exit}`) | Control 1724, exit 0. KILLED, 10 cases |

**Scope of the sweep.** M8 adds no Irreversible Side-Effect Register entry (Phase 1, revision 6 re-key). This milestone's set is
therefore the named mutants NM-30 to NM-38, which Phase 1 bound for M8's Phase 2, plus three of QA's. All are built by
`build-qa-mutants.py` as exact-once anchors at `c37d41a`, independently of the implementer's edits file. The operator sweep
over the chain's production diff is the effort-final sweep and is still owed. The mutants file and the runner are the suite
instruments, and their blobs are in each kill table's `instruments`. No kill depends on an uncommitted test file.

| Mutant | Result (failing cases, count checked) |
|---|---|
| NM-30, W's Enter unscoped (a local stand-in for the hook with no gate) | KILLED, 3: W's two U-focused rows and "afterwards" |
| NM-31, I's Enter unscoped | KILLED, 3: I's two U-focused rows and the closed-instance row |
| NM-32, the gate accepts focus in any dialog | KILLED, 11 |
| NM-33, the gate tests only the content wrapper | KILLED, 13 |
| NM-34, I's `enabled` dropped | KILLED, 1: the closed-instance row |
| NM-35, one ref shared across instances | KILLED, 10 (corrected form, alone) |
| NM-36, `enableOnFormTags` | KILLED, 1: I's URL field row with an image |
| NM-37, I answers `onSetImage` with no image | KILLED, 1: I's dialog-element row with no image |
| NM-38, `ConfirmationDialog` unscoped | KILLED, 5, including both layout M4 Enter cases |
| `qa-confirmation-enter-disabled` | KILLED, 7 |
| `qa-hook-enabled-not-passed` (the hook drops `{ enabled }`) | KILLED, 1: the closed-instance row |
| `qa-warning-enabled-dropped` (`useDialogEnter(onConfirm)`) | **SURVIVED**: QAF-22 |

**The closing-window probe.** Both the implementer's document and code review's Round 5 record `row-warning-enabled-dropped`
(the same mutant) as equivalent: "A closed `WarningDialog` renders no panel (`PresetDialog` unmounts it), so its ref is null".
But `PresetDialog` unmounts the panel only after its leave transition, and `styles.popInTransition`'s leave is `duration-75`.
The probe tests that window. It mounts each dialog open, focuses its dialog element, sets `open` (or `isOpen`) to false, and
presses Enter at once. Its four cases ran in a fresh `c37d41a` export per variant (`run.sh`):

| Variant | W, closed by its prop | W, closed by Escape | I, closed by its prop | U raised first, then W opened; focus in U |
|---|---|---|---|---|
| tip | panel mounted, not hidden, focus inside; `onConfirm` 0 | `onClose` 1; focus left the panel; `onConfirm` 0 | panel mounted, not hidden, focus inside; `setImage` 0 | U only (`updateConfirm` 1, `warnConfirm` 0) |
| `useDialogEnter(onConfirm)` in W | **`onConfirm` 1** | 0 | 0 | U only |
| `useDialogEnter(submit)` in I | 0 | 0 | **`setImage` 1** | U only |

So `enabled` decides while a dialog is closing. The mutant is not equivalent. The last column covers the Testing Strategy's
"both orders": the opening order the suite does not build gives the same answer, and no finding follows.

## Findings

QAF-22 MEDIUM Phase 2
- **What is missing.** No case fails when `WarningDialog`'s hotkey stops being gated on `open`.
  - `qa-warning-enabled-dropped` (`useDialogEnter(onConfirm)`) survives the whole suite at `c37d41a`.
  - The only closed-W case, "answers nothing once closed", mounts W never open. No panel exists, so the case passes whatever
    `enabled` is.
- **Why it is not equivalent.** The probe above: while W closes, its panel stays mounted and visible for the 75 ms leave with
  focus still inside. Under the mutant one Enter then runs `onConfirm`, and at the tip it runs nothing. The equivalence
  recorded in the implementation document's Test Execution Results ("SURVIVES … equivalent") and in code review Round 5's
  instruments table ("It holds") rests on "a closed W renders no panel", which is false during the leave.
- **Why it blocks.** M8-b's last row claims "nothing that W or I runs (each is enabled only while open, as at `1ad625e`)". M8
  keeps the `open` argument for that reason. A claimed behaviour with no assertion that fails when it is lost is the severity
  floor, MEDIUM, whatever the trigger's reach.
- **Reach, as far as measured.** W's three callers pass `onConfirm={onDelete}` (`EmbedField.tsx`, `EmbedEditor/index.tsx`)
  or `actions.delete` (`ComponentEditor.tsx`). Their only close paths are a button, Escape or an outside click, and in jsdom
  Escape moved focus out of the panel. So I have not shown a browser path where a user's Enter lands in W's closing window with
  focus off its buttons. For I it is the answer itself: Enter runs `submit`, which closes I with focus still in the visible
  panel, so a second Enter within 75 ms is in the window. There the guard is asserted (NM-34 killed), but only through a hidden
  dialog that the implementer's own Outstanding Items says a browser cannot focus.
- **The fix** (test-only):
  - *Minimum*: in `WarningDialog.enter-scope`, a W case in the probe's form: open, focus on its dialog element, `open` set
    false, Enter at once, expecting `onConfirm` 0. Its red run is recorded under `qa-warning-enabled-dropped`, and it is
    green at the tip.
  - *Preferred*: the same form for I. Then NM-34's kill rests on a state a browser reaches, the visible closing panel, and the
    hidden-dialog case no longer carries it alone. That answers the environment-fidelity convention's concern, which the
    implementer recorded as an instrument limit.
  - The probe's `Warning` and `Uploader` wrappers (`probe-closing-window/WarningDialog.closing-window.test.tsx`) show the
    shape. They hold `open` in state and expose its setter.
- **A routed correction.** The equivalence recorded by two prior gates is invalidated as a basis:
  - for `implementer-hooks-017`, the Test Execution Results row of `implementation/017-existing-items-backlog-m8-implementation.md`;
  - for `code-reviewer-hooks-017`, the instruments row "The equivalence claim for `row-warning-enabled-dropped`" of
    `code-review/017-existing-items-backlog-code-review.md` Round 5.

  Each is told in this pass's hand-off.

QAF-23 LOW Phase 2 Duplicates: CR-12 in code-review/017-existing-items-backlog-code-review.md
- **What is missing.** `ImageUploader.enter-scope`'s `FakeImage` stands in for the browser's `Image`, and the M8 document
  does not name it.
- **What I checked.** `checkImage` (`ImageUploader.tsx` at `c37d41a`) consumes `onload`, `onerror` and `width > 0`. The fake
  fires `onload` in a microtask with `width = 1`, the shape of "the URL loaded". So naming it is the whole remedy, and its
  fidelity is not in question. Not blocking.
- **Routing.** Steering capped M8 (`steering/017-rulings.md` block 2026-11-19T06:01Z, agent-output `9349040`): for M8, each
  further gap below HIGH that is not a severity-floor finding goes to the plan's Planner batch as a stated limit, with no fix
  round. QAF-22 keeps its round, and the ruling names nothing else. QAF-23 is below the floor, so it follows M4's precedent
  (QAF-19 under the 04:14Z cap): it goes to the Planner batch through `planner-hooks-017` and does not ride QAF-22's round.
  This pass's first hand-off had let it ride.

## Verdict

**QA Failed** for M8 at website `c37d41a`, on QAF-22.
- Every other M8-b row and M8-c position has a case.
- Every red row and every guard in M8's diff, except W's `enabled`, is reddened by a QA mutant: NM-30 to NM-38, each killed.
- M8-a and M8-d hold at the tip.
- The suite is 1724 of 1724, exit 0.

**The refresh.** The fix is test-only, so it reaches code review's scoped check first. The refresh then:
- re-runs the suite in an export of the new tip;
- re-runs `qa-warning-enabled-dropped`, and NM-34 if I's case changes, against the new cases;
- re-runs the seen-red coverage over the M8 files.

The round has no production change, so it re-runs only the survivors it closes.

Milestone-scoped: the plan's Status is unmoved. The effort-final sweep over the chain's production diff is still owed. Rows
inherited and not discharged: B-13 (UAT).

## Assumption Not Checked

This pass assumes that in a real browser focus stays inside a closing headlessui panel through its 75 ms leave, as jsdom shows
(`probe-closing-window/tip.probe`). It does not test that.
- **If it is false**, the closing window is jsdom-only. W's and I's `enabled` guards are then equivalent in the browser, and
  QAF-22's case specifies a guard no user can reach. The property is still the plan's, so the finding would stand.
- **Signature**: in a browser, after Escape or Cancel closes a delete warning, `document.activeElement` is outside the dialog
  before the leave ends.
- **Owner**: UAT, at B-13's walk. It is a look at `document.activeElement` straight after closing the image dialog with Enter.
  It is named again in the hand-off.

## Handoff

- **QA Failed** goes to `implementer-hooks-017` for QAF-22 alone.
- **QAF-23** goes to `planner-hooks-017` for the Planner batch, as a stated limit under the 06:01Z cap.
- **The equivalence correction** goes to `implementer-hooks-017` and `code-reviewer-hooks-017`, each for its own record (QAF-22).
- **To UAT**, when the chain reaches it: B-13, with this pass's assumption (focus in a closing panel).
