---
ID: n/a
Origin: fix-import-save-conflict
UUID: 0030da7d
Reviewed-At: 3c6f16fbd53988cd51d20bde9dcbb37a917ec5e3 — repos=website
Status: In Review
Round: 1
Verdict: REJECTED
---

# Code Review: fix-import-save-conflict

**Plan Reference**: none (fixer chain). Scope statement: `steering/fix-import-save-conflict-rulings.md`, block "2026-11-21T07:54Z"; the preview ruling is block "2026-11-21T08:13Z".
**Implementation Reference**: `agent-output/implementation/fix-import-save-conflict-implementation.md` (record `1e4d899`, `Handoff-At: 3c6f16f`)
**Date**: 2026-11-21
**Reviewer**: code-reviewer-fix-import-save-conflict

## Changelog

| Date (UTC) | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-21T08:17 | steering-hooks (brief `steering/fix-import-save-conflict-brief-code-reviewer.md`) | Round 1: review website `chain/fix-import-save-conflict` at `3c6f16f` against the 07:54Z scope statement | Round 1 REJECTED. Two MEDIUM findings: CR-1, the floor on the settled draft has no assertion that fails if it is lost (my probe mutant survived all 14 cases in the four files that mount the dialog); CR-2, the preview shows the raw draft while Save writes the settled one (steering's 08:13Z ruling, which the fixer's next round already carries). The fix itself is correct for rows A to E. 22 added production lines, so QA Phase 2 is owed after approval. The branch moved to `fb1140f` during the review; that commit is the fixer's next round and is reviewed as a sub-entry of this round. Disclosed: the record's stamp gate refused a typed (estimated) changelog stamp; it was replaced with `date -u`'s value. |

## Identity

- `Reviewed-At` `3c6f16f`. At review start, `git rev-parse chain/fix-import-save-conflict` gave `3c6f16fb…`. At review end it gave `fb1140f`: the fixer's next round, committed while this review was in progress on steering's 08:13Z ruling. This round's verdict binds to `3c6f16f` only. Every file was read through `git show 3c6f16f:<path>`. The shared working tree had uncommitted edits to both reviewed files and was not read.
- Production lines, counted with `git diff --numstat f4baebb..3c6f16f`: `NewMessageModal.tsx` 22 added / 4 removed, plus the test file 119 / 20. That is 22 production lines, at or above 20, so QA Phase 2 is in the stage set and this review does not run the suite.

## Criteria assessed (recorded at round open)

From the scope statement, block 07:54Z:
1. A conflicting draft from any import tab (rows A to E) never leaves Save disabled with no way out. Rows A to D are settled as the JSON tab settles them, with its settled notice. Row E opens the dialog's existing Classic-or-V2 choice.
2. Save writes the settled or chosen draft, never the raw one.

**Growth after round open:** block 08:13Z added a third criterion: the preview shows the draft Save will write. It is recorded here as CR-2, and its re-verdict is scoped to the fixer's next SHA.

## Architecture Alignment

**System Architecture Reference**: `/usr/local/bin/hooks/agent-output/architecture/system-architecture.md` (exists, checked with `ls -d`); per-repo record `/usr/local/bin/hooks/agent-output/architecture/website.md`.
**Alignment Status**: ALIGNED

`system-architecture.md` § the persist gate says that `gateBeforePersist` runs `resolveContentLoss` before any user-driven save. The dialog still gates in `NewMessageModal` `onSubmit`, now on `settledMessage ?? loadedMessage`. For a row E draft `settledMessage` is undefined, so the gate still sees the raw draft and asks. The change follows the pattern the fixer claims. `JsonModalBody` (`src/app/message/m/[id]/_components/JsonModalBody.tsx`, `contentFloorError = … validateContentRequirements(applyDisposition(validatedDraft))`) floors the resolved draft, and so does `NewMessageModal` now. `NewMessageJsonInput`'s load effect (`resolveContentLoss` → `requiresChoice` → `noticeMessageForSettled` → `applyDisposition`) is the sequence the new `useMemo` reproduces. No new code is written beside the shared exports, and none is needed.

## Re-derived hazards (common brief)

1. **The row D floor.** Re-derived. `resolveContentLoss` returns row D (flag set, content, no V2 components) with mode `classic`. `switchToClassic` clears the flag, so `validateContentRequirements(settledMessage)` returns undefined and Save is enabled. Case 1 asserts the write.
2. **A JSON draft resolved twice.** Re-derived by reading `src/utils/messageMode.ts`. `switchToV2` sets content to `''`, embeds to `[]` and the flag on. `switchToClassic` filters components to type 1 and clears the flag. Each is a fixed point when applied to its own output, and an already-settled draft classifies as row A or C (notice class `none`), so the dialog's `settledNotice` is null and no second notice appears. Case 5 plus the fixer's `settled-draft-loses-components` control cover the components path.
3. **The JsonModalBody floor pattern.** Matched (above).
4. **The harness.** Reused. The header comment that avoided row E is removed.
5. **Whether Discord returns row E (BC-17).** Still open. This review takes it as given; see Assumption Not Checked.

**Row E with the floor skipped.** For a row E draft `contentFloorError` is undefined, so nothing floors it before the choice. That is sound for this floor. Row E requires `hasV2Components` and `hasClassicContent`, so the Classic outcome keeps non-empty content or embeds, and the V2 outcome keeps V2 components and clears content and embeds. Neither outcome can fail `validateContentRequirements`, which checks only the V2-plus-content conflict and an empty message (`src/utils/limits.tsx` `validateContentRequirements`). `commitChoice` skips `dropEmptyEmbedsBesideV2`, but `switchToV2` already sets embeds to `[]`, so nothing is lost.

## TDD Compliance Check

**TDD Table Present**: The fixer's document has no TDD table. A fixer document records a red run, a green run and negative controls instead. All three are present: `verification/fix-import-save-conflict/red-run-f4baebb.json`, `fix-suite.json` and `negative-controls*/`. `tdd-check.py` applies to Python sources only, and this change has none.
**All Rows Complete**: n/a
**Concerns**: CR-1. Expectations are independent: the notice strings, flag bits and component types are literals, never computed by the code under test. The import fixture is built by the real `discordResponseToMessage`. The tRPC wrapper is an invented value, and the fixer's document names it (Iron Law 5) together with its falsity signature: Continue stays disabled. Tests are spec-form. No defect escaped before this chain, so no `// escaped:` line is owed, and none is present.

**Naming and comments.** The basename `NewMessageModal.persist-gate-wiring.test.tsx` matches the positive form. An ID-token grep over the file at `3c6f16f` (`grep -c -i -P` with the class's regex) gave 0. I ran `convention-check.js --since=f4baebb` over a detached worktree of `3c6f16f`. Its output, `verification/fix-import-save-conflict/code-review/convention-check-3c6f16f.txt`, reports 3 FAIL, 0 CANDIDATE and 2 SKIP: `node_modules` not examined, and the id-token and basename checks not run in the export, which the grep above covers. There were no comment-gate failures, test file included.

**The 3 FAILs.** They are `react-hooks/set-state-in-effect` at `:107` and `:161`, and `react-hooks/refs` at `:401`. I linted `f4baebb` in its own worktree (`code-review/eslint-base-NewMessageModal.json`): the same three rules appear at `:107`, `:146` and `:383`, shifted by the 15 and 18 inserted lines. They are pre-existing and none is on a line this chain wrote. Their disposition is the owner's selection A (block 08:13Z): a handoff written by the fixer. I have not seen that handoff yet, so it is to be checked at the sub-entry.

## Findings

### Critical
None.

### High
None.

### Medium

**CR-1 MEDIUM Round 1 [test-coverage]: the dialog's floor on the settled draft has no assertion that fails when it is lost**
- **Location**: `src/app/message/_components/NewMessageModal.tsx` `contentFloorError` (the `settledMessage ? validateContentRequirements(settledMessage) : undefined` expression) → `disableSave` and the red floor notice; test `src/app/message/_components/__tests__/NewMessageModal.persist-gate-wiring.test.tsx`.
- **Class**: a decision `NewMessageModal` takes on its settled draft that no test in the suite fails without.
- **Enumeration**: `grep -n "settledMessage\|settledNotice"` over `NewMessageModal.tsx` at `3c6f16f` gives 11 lines and four decisions: (a) the floor → `disableSave` and the floor notice; (b) the gate input in `onSubmit`; (c) the notice line; (d) the `requiresChoice` guard in the memo. The fixer's controls kill (b), `gate-on-raw-draft`; (c), `settled-notice-not-shown` and `settled-notice-value-null`; and (d), `requires-choice-guard-removed`. For (a), `floor-on-raw-draft` was killed, but only through the row E conflict branch. My probe `settled-floor-removed` replaces the expression with `undefined`. It **SURVIVED**: first over the persist-gate file, then over all four files that mount the dialog (`failed-webhook-load`, `persist-gate-wiring`, `readable-mutation-error`, `f/[id]/page.message-list`), with the control at 14/14 passed. Files: `verification/fix-import-save-conflict/code-review/floor-removed-mutants.json`, `floor-removed/` and `floor-removed-all/` (driver line `settled-floor-removed SURVIVED`). What the predicate cannot see: a decision taken on the settled draft through a name other than these two identifiers (for example a future preview prop fed by another variable). The CR-2 consumer becomes a member once it reads `settledMessage`.
- **Why it matters**: the floor is now the only gate between an empty imported draft and a write. The server does not refuse such a write. `isMessageValid` only records `valid` (`src/server/api/utils/shared.ts`, the `valid: isMessageValid(message.data)` field). An attachment-only Discord message imports as an empty draft. So does a V2-flagged message with only whitespace content, or only an empty embed and no components, because row C settles to `switchToV2`, which clears content and embeds. If (a) is lost, Save writes an empty message and nothing goes red. The fixer's document claims "It now floors the settled draft", and that claim has no assertion behind it. This meets the severity floor, so it is MEDIUM and blocks the hand-off to QA.
- **Required Action**: add a spec-form case to the persist-gate file, through the real `discordResponseToMessage`, in which the loaded draft fails the floor **after settlement**. Assert that the floor's text ("Message must have content, embeds, or components.") is shown, and that pressing Save writes nothing (`capturedUpsertInput` undefined). Fixture property: the draft must fail the floor only after `applyDisposition`, not before. For example, a V2-flagged message whose only classic content is an empty embed: the raw floor reports the V2 conflict, and the settled floor reports the empty message. The case then also tells floor-on-settled apart from floor-on-raw by its text. Falsity signature: under `settled-floor-removed` the case fails on its assertion (the text is missing, or the upsert input is defined), not on a timeout. Record that kill beside the fixer's controls.
- **Minimum**: the same case without the before/after-settlement property, asserting only the empty-message text and no write.
- Per the brief's write set, the fixer adds only tests here and no production change.

**CR-2 MEDIUM Round 1 [correctness]: the preview shows the raw imported draft while Save writes the settled one**
- **Location**: `NewMessageModal.tsx`, `MessagePreview … messageData={loadedMessage}` in the page-0 preview block.
- **Class**: a surface in the dialog that shows the user a draft other than the one Save writes.
- **Enumeration**: `grep -n "loadedMessage"` over `NewMessageModal.tsx` at `3c6f16f`, read for consumers that show a draft. The one hit that shows draft content is `MessagePreview messageData={loadedMessage}`. The other `loadedMessage` reads are `!loadedMessage` guards (`disableSave`, Continue, `showPreview`, the floor-notice `show`), which give the same answer for either draft, plus the row E `commitChoice`, which correctly reads the raw draft. What the predicate cannot see: a child component that re-derives a draft from the query data itself (none found in this file).
- **Origin**: steering's ruling, block "2026-11-21T08:13Z" (in scope, with a test). At `f4baebb` the preview matched the write (both raw). The fix opened the gap. Row D is the example: it previews as V2 and saves as Classic.
- **Required Action**: the preview reads the draft Save writes: `settledMessage ?? loadedMessage`, so the raw draft only while a row E choice is pending. Add a spec-form case whose assertion fails on `messageData={loadedMessage}`, for example row D's content visible in the preview where the V2 render shows none. Use whatever selector a mutation of that prop actually turns red, and record the kill. This is already in the fixer's next round (`fb1140f`) and is checked at the sub-entry.

### Low/Info
None.

## Verdict

**Status**: REJECTED
**Rationale**: The fix is correct for criteria 1 and 2 on every row I traced (A to E, plus the JSON tab's already-settled drafts). It is rejected on two MEDIUM findings. CR-1 meets the severity floor: a claimed behaviour has no assertion behind it, and my probe shows that. CR-2 is steering's in-scope ruling on the preview, which grows the criteria. Both are test-sized or one-prop fixes, and the fixer is already on the round. QA's cue is held until the sub-entry approves, as steering asked at 08:13Z.

## Required Actions

1. CR-1: a spec-form case that fails under `settled-floor-removed`, with the kill recorded.
2. CR-2: the preview reads the settled draft, with a case that fails without it and the kill recorded.
3. The lint-debt handoff from the owner's selection A (block 08:13Z), named in the fixer's document.

## Assumption Not Checked

- Round 1: This review assumes that what the real tRPC client hands `NewMessageModal` for a Message Link, Webhook or code import (after the superjson transform and `makeEditable`) is the shape the test's invented wrapper `{ guildId, message, droppedComponentTypes }` stands in for, and it does not test that. Falsity signature: on a running build, the import tabs show no settled notice, or show the red "cannot contain" error, for the drafts in the fixer's User-visible flows 1 to 3, while the tests stay green. Owner: QA Phase 2, by walking flows 1 to 3 on a local build under the local-build prohibition, after the sub-entry approves.

## Next Steps

- Rejected to `fixer-fix-import-save-conflict` for CR-1 and CR-2 (CR-2 is already in its round at `fb1140f`). The fix confirmation is a sub-entry of Round 1 at the fixer's next handoff SHA.
- After the sub-entry approves: QA Phase 2 (`qa-fix-import-save-conflict`), which owns the Assumption Not Checked above. Steering is cued if no QA session is live.
