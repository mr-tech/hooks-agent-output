---
ID: n/a
Origin: fix-import-save-conflict
UUID: 0030da7d
Reviewed-At: f23568aae25666650e687d7396c76f3ac9583bed — repos=website; Round 1 first pass at 3c6f16f, sub-entry 1 at f23568a
Status: In Review
Status-Detail: "Round 1 sub-entry 1 APPROVED at website f23568a; handed to QA Phase 2 (27 added production lines)."
Round: 1
Verdict: APPROVED
---

# Code Review: fix-import-save-conflict

**Plan Reference**: none (fixer chain). Scope statement: `steering/fix-import-save-conflict-rulings.md`, block "2026-11-21T07:54Z"; the preview ruling is block "2026-11-21T08:13Z".
**Implementation Reference**: `agent-output/implementation/fix-import-save-conflict-implementation.md` (record `28ac5cac`, `Handoff-At: f23568a`)
**Date**: 2026-11-21
**Reviewer**: code-reviewer-fix-import-save-conflict

## Changelog

| Date (UTC) | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-21T08:17 | steering-hooks (brief `steering/fix-import-save-conflict-brief-code-reviewer.md`) | Round 1: review website `chain/fix-import-save-conflict` at `3c6f16f` against the 07:54Z scope statement | Round 1 REJECTED on two MEDIUM findings: CR-1 (the settled-draft floor had no assertion that failed when it was lost) and CR-2 (the preview showed the raw draft; steering's 08:13Z ruling). The fix itself was correct for rows A to E. Disclosed: the record's stamp gate refused a typed (estimated) changelog stamp, and it was replaced with `date -u`'s value. Record `258f3fbf`. |
| 2026-11-21T08:23 | fixer-fix-import-save-conflict (SendMessage; implementation record `28ac5cac`) | Round 1 sub-entry 1: confirm the fix of CR-1 and CR-2 at `f23568a` | Round 1 sub-entry 1 APPROVED. CR-1 and CR-2 are RESOLVED. I re-ran 7 probes myself at `f23568a`, and all 7 were KILLED on the expected cases. The delta (`fb1140f`, `f23568a`) touches only the findings' scope, so no new round opens. Production lines are now 27, so the approval goes to QA Phase 2. I corrected one broken path in the Round 1 text (`eslint-base-NewMessageModal.json` is under `verification/…/code-review/`). |

## Identity

- `Reviewed-At` `f23568a`. `git rev-parse chain/fix-import-save-conflict` gave `f23568aa…` at the start and at the end of the sub-entry. Files were read through `git show <sha>:<path>` only.
- Round 1's first pass ran at `3c6f16f`. The branch moved to `fb1140f` during that pass, which was the fixer's next round on steering's ruling. The first-pass verdict bound to `3c6f16f` only.
- Production lines, counted with `git diff --numstat f4baebb..f23568a`: `NewMessageModal.tsx` 27 added / 5 removed. At 20 or more, QA Phase 2 is owed, so this review does not run the suite.

## Criteria assessed

Recorded at round open, from the scope statement in block 07:54Z:
1. A conflicting draft from any import tab (rows A to E) never leaves Save disabled with no way out. Rows A to D are settled as the JSON tab settles them, with its settled notice. Row E opens the existing Classic-or-V2 choice.
2. Save writes the settled or chosen draft, never the raw one.

**Growth after round open** (block 08:13Z, steering's ruling): 3. The preview shows the draft Save will write: the settled draft, or the raw draft while a row E choice is pending. It was assessed at sub-entry 1 only.

## Architecture Alignment

**System Architecture Reference**: `/usr/local/bin/hooks/agent-output/architecture/system-architecture.md` (exists, checked with `ls -d`); per-repo record `/usr/local/bin/hooks/agent-output/architecture/website.md`.
**Alignment Status**: ALIGNED

`system-architecture.md` § the persist gate says that `gateBeforePersist` runs `resolveContentLoss` before any user-driven save. The dialog still gates in `NewMessageModal` `onSubmit`, now on `settledMessage ?? loadedMessage`. For a row E draft `settledMessage` is undefined, so the gate sees the raw draft and asks. The change follows the claimed pattern. `JsonModalBody` (`src/app/message/m/[id]/_components/JsonModalBody.tsx`, `contentFloorError = … validateContentRequirements(applyDisposition(validatedDraft))`) floors the resolved draft, and so does `NewMessageModal` now. `NewMessageJsonInput`'s load effect (`resolveContentLoss` → `requiresChoice` → `noticeMessageForSettled` → `applyDisposition`) is the sequence the new `useMemo` reproduces, and the JSON tab hands the dialog a settled draft, which is the same thing the preview now shows. No code was written beside the shared exports, and none is needed. Nothing goes to the architect.

## Re-derived hazards (common brief)

1. **The row D floor.** Re-derived. `resolveContentLoss` gives row D mode `classic`, and `switchToClassic` clears the flag, so `validateContentRequirements(settledMessage)` passes. Case 1 asserts the write.
2. **A JSON draft resolved twice.** Re-derived from `src/utils/messageMode.ts`. `switchToV2` and `switchToClassic` are each a fixed point when applied to their own output. A settled draft classifies as row A or C (notice class `none`), so no second notice appears. Case 5 plus the fixer's `settled-draft-loses-components` control cover this.
3. **The JsonModalBody floor pattern.** Matched.
4. **The harness.** Reused.
5. **Whether Discord returns row E (BC-17).** Taken as given; see Assumption Not Checked.

**Row E with the floor skipped.** Sound. A row E draft has V2 components and classic content, so the Classic outcome keeps non-empty content or embeds, and the V2 outcome keeps V2 components with content and embeds cleared. Neither can fail `validateContentRequirements` (`src/utils/limits.tsx`), which checks only the V2-plus-content conflict and an empty message.

## TDD Compliance Check

**TDD Table Present**: The fixer's document has no TDD table. A fixer document records red runs, green runs and negative controls instead. All are present under `verification/fix-import-save-conflict/` (`red-run-f4baebb.*`, `red-run-preview-3c6f16f.*`, `fix-suite.*`, `negative-controls*/`). `tdd-check.py` applies to Python sources only.
**All Rows Complete**: n/a
**Concerns**: None open.
- Expectations are literals: notice strings, flag bits, component types.
- The import fixture is built by the real `discordResponseToMessage`. The tRPC wrapper is an invented value, and the fixer's document names it.
- The preview cases stub `~/components/MessagePreview` to capture its `messageData` prop. That asserts what the dialog hands the preview, which is the criterion's boundary, but not what the preview renders from it. This is covered by Assumption Not Checked, sub-entry 1.
- Tests are spec-form, with no `// escaped:` line owed.
- Naming: the basename matches the positive form, and an ID-token grep over the test file at `f23568a` gave 0.

**Convention check** (`convention-check.js --since=f4baebb`, each run over a detached worktree):
- At `3c6f16f` (`verification/fix-import-save-conflict/code-review/convention-check-3c6f16f.txt`) and at `f23568a` (`…/convention-check-f23568a.txt`): 3 FAIL, 0 CANDIDATE, 2 SKIP each. The SKIPs are `node_modules`, which is not examined, and the id-token and basename checks, which did not run in the export; the grep above covers those.
- The 3 FAILs are `react-hooks/set-state-in-effect` at `:107` and `:161` and `react-hooks/refs` at `:405`. All three are present at `f4baebb` at `:107`, `:146` and `:383` (`verification/fix-import-save-conflict/code-review/eslint-base-NewMessageModal.json`), and none is on a line this chain wrote.
- Their disposition is the owner's selection A (block 08:13Z): the handoff `handoff/newmessagemodal-preexisting-react-hooks-lint-errors-2026-11-21.md`, which is Status Open and has an event-form `Review-Trigger`.
- No comment-gate failures.

## Findings

### Critical
None.

### High
None.

### Medium

CR-1 MEDIUM Round 1 RESOLVED: case "a V2-flagged message whose only classic content is an empty embed is refused as empty once settled, and Save writes nothing", at website `f23568a`. Sweep re-run by the reviewer at `f23568a` over the 5 settled-draft decisions (`git grep -n "settledMessage\|settledNotice"`, 12 lines: floor, gate, notice, `requiresChoice` guard, preview), across the 4 dialog-mounting test files, control 17/17. All KILLED with the count checked: `settled-floor-removed` (case 8), `floor-on-raw-draft` (both row E cases and case 8), `gate-on-raw-draft`, `settled-notice-not-shown`, `requires-choice-guard-removed`. Checks: `verification/fix-import-save-conflict/code-review/subentry-f23568a/` and `subentry-f23568a-sweep/`, with the mutants files beside them. The Round 1 survival is in `code-review/floor-removed-all/`.

CR-2 MEDIUM Round 1 RESOLVED: `MessagePreview messageData={settledMessage ?? loadedMessage}` at website `fb1140f`, cases "the preview shows a V2-flagged message … as the Classic message Save writes" and "… as loaded while the choice is pending". I re-ran both controls at `f23568a`: `preview-shows-raw-draft` KILLED (the row D case) and `preview-shows-settled-only` KILLED (the row E pending case). Check: `verification/fix-import-save-conflict/code-review/subentry-f23568a/`.

### Low/Info
None.

## Verdict

**Status**: APPROVED (Round 1 sub-entry 1, at `f23568a`)
**Rationale**: Criteria 1, 2 and 3 hold on every row traced (A to E, plus the JSON tab's already-settled drafts). Each decision the dialog takes on its settled draft now has a test that fails when the decision is lost; I re-ran the probes myself. The lint debt is carried by the owner-chosen handoff. 27 added production lines, so this goes to QA Phase 2.

## Required Actions

None.

## Assumption Not Checked

- Round 1: This review assumes that what the real tRPC client hands `NewMessageModal` for a Message Link, Webhook or code import (after superjson and `makeEditable`) is the shape the test's invented wrapper `{ guildId, message, droppedComponentTypes }` stands in for, and it does not test that. Falsity signature: on a running build, the import tabs show no settled notice, or show the red "cannot contain" error, for the drafts in the fixer's User-visible flows 1 to 3, while the tests stay green. Owner: QA Phase 2, by walking flows 1 to 3 on a local build under the local-build prohibition.
- Round 1 sub-entry 1: This review assumes the real `MessagePreview` renders a settled row D draft (flag cleared, content kept) as a Classic message with its text, and it does not test that, because the cases stub `MessagePreview`. Falsity signature: in flow 1 the preview is blank, or still renders V2, while the notice says the draft is saved as Classic. Owner: QA Phase 2, in the same walk of flow 1.

## Next Steps

- Handed to QA Phase 2, `qa-fix-import-save-conflict`, at website `f23568a`; cued through `steering-hooks` if no QA session is live. QA owns both Assumption Not Checked lines above.
- After QA: devops for website `master`, on the owner's word.
