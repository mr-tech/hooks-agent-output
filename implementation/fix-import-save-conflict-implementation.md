---
ID: n/a
Origin: fix-import-save-conflict
UUID: 0030da7d
Status: Active
Status-Detail: "QA Phase 2 answer (QAF-1 tests, QAF-2 flow wording) committed on website chain/fix-import-save-conflict at b829314, test file only, and handed to code review; QA's scoped refresh follows. 27 added production lines."
Handoff-At: b829314 — repos=website
Origin-Chain: 013
---

# Fix — the new-message dialog settles or asks on an imported draft whose content conflicts

## Scope statement

The owner's words, his selection in `steering/fixer-queue-2026-11-21-rulings.md`, block "2026-11-21T05:50Z" (Q2): "Agent: resolve like JSON tab (Recommended)" — "a fixer chain resolves the conflict the same way the JSON tab does, so Save works." The scope statement is steering's, quoted from `steering/fix-import-save-conflict-rulings.md`, block "2026-11-21T07:54Z", which relays it:

> Repository `website` only, from `origin/master` `f4baebb`, on `chain/fix-import-save-conflict`:
> 1. In `NewMessageModal`, a draft from any import tab whose content conflicts (rows A-E of the JSON tab's disposition) never leaves Save disabled with no way out: rows A-D are settled as the JSON tab settles them, with its settled notice; row E holds the draft for the user's choice of Classic or V2 (the dialog's existing choice UI), the other dropped, as the JSON tab does.
> 2. Save writes the settled or chosen draft, never the raw one (the handoff's owed test).

Route: owner selection → effort rulings block 05:50Z → this thread's reading, block 05:59Z → determination block 07:54Z → brief `steering/fix-import-save-conflict-brief-fixer.md`.

## Entry Conditions

| # | Condition | Value |
|---|---|---|
| 1 | Scoping determination | `steering/fix-import-save-conflict-rulings.md`, block "2026-11-21T07:54Z", relayed by `steering/fix-import-save-conflict-brief-fixer.md` and `…-brief-common.md` |
| 2 | Bounded scope statement | Quoted above. Write set: `NewMessageModal.tsx`, `NewMessageJsonInput.tsx` (sharing only), the disposition utilities (sharing only), their `__tests__/`; in the record, this document and `verification/fix-import-save-conflict/`. Excluded: the send page; normalising `discordResponseToMessage` at ingress. Sweep: `verification/fix-import-save-conflict/scoping/sweep.md` (commit `729a64f`) |
| 3 | Fix branch | website `chain/fix-import-save-conflict`, cut by steering from `origin/master` `f4baebb`. `git branch --show-current` read at start, HEAD `f4baebb000ac6fa31714108c9d2bf261dc3de4a4` |
| 4 | Record on the mechanism | `architecture/website.md` and `architecture/system-architecture.md` (named by the brief; this change does not alter what they say about the persist gate or the dispositions, so nothing goes to the architect). Plan 013 D17 and D31: `planning/closed/013-components-v2-editing-surfaces.md`. Source handoff: `handoff/newmessagemodal-persist-gate-choice-unreachable-2026-08-27.md` |

## Diagnosis

**Cause.** At `f4baebb`, `NewMessageModal.tsx:126` set `contentFloorError = validateContentRequirements(loadedMessage)` on the **raw** imported draft. `validateContentRequirements` (`src/utils/limits.tsx:233`) returns "Components V2 messages cannot contain embeds or content." whenever `isV2Message` is true (structural V2 components **or** the V2 flag) and content or embeds are present. That covers row D (flag set, content, no V2 components) and row E (V2 components and content). `disableSave` (`:192-196`) includes `!!contentFloorError`, so Save and the `Form` submit are disabled. That has two effects: the row E choice UI (`pendingChoice`, reached only through `onSubmit` → `gateBeforePersist`) can never be reached, and row D is blocked even though the JSON tab settles it as Classic. Rows A to D were also never given the JSON tab's settled notice.

**Instrument.** I read the code path at `f4baebb` (the lines above, plus `resolveContentLoss`/`applyDisposition`/`gateBeforePersist` in `src/utils/index.ts:115-209` and `applyModeSwitch` in `src/utils/messageMode.ts`). I also ran a reproduction: the red run below mounts the real dialog with a Message Link import built by the real converter `discordResponseToMessage`. The output is in `verification/fix-import-save-conflict/red-run-f4baebb.json`. At base the row D and row B cases fail because the settled notice is missing, the row E Classic case fails on the floor error ("expected … not to contain 'Components V2 messages cannot contain…'"), and the row E V2 case fails with "button not found: Save as Components V2".

**Origin-Chain.** `git blame -L 126,126 f4baebb` → `12f4ce6` "M3: Discord ingress carries V2" (plan 013). The gate line `:164` → `66e1974`, plan 013 M8-G. Both are on `origin/master`.

**Consumers of the resolved value** (`settledMessage`, which exists only when a draft is loaded and it is not row E):
- `contentFloorError` → `disableSave` and the red floor notice. It now floors the settled draft, as `JsonModalBody.tsx:171` does. That makes it the only check between a draft that is empty once settled and a write (code review CR-1).
- `onSubmit` → `gateBeforePersist(settledMessage ?? loadedMessage)`. Rows A to D are gated and written as the settled draft. Row E is gated on the raw draft, so `mustAsk` is true and the existing choice UI opens.
- The preview → `MessagePreview messageData={settledMessage ?? loadedMessage}` (from `fb1140f`). It shows the draft Save writes: the settled one, or the raw one while a row E choice is pending (steering ruling, block 2026-11-21T08:13Z; code review CR-2).

**Consumers that still read the raw `loadedMessage`, unchanged:**
- `commitChoice` → `applyDisposition(loadedMessage, mode)`. The row E options are computed on the raw draft, as the JSON tab's own `commitChoice` does.
- The `!loadedMessage` guards (`disableSave`, Continue, `showPreview`, the floor-notice `show`). A settled draft exists exactly when a non-row-E draft is loaded, so these guards give the same answers they gave before.

**Hazard 2 (a JSON-tab draft resolved twice).** The JSON tab hands the dialog a draft it has already settled or chosen, and the dialog now settles it again. `switchToClassic` and `switchToV2` are idempotent by their code (they set the same fields to the same values). I also checked this end to end: the JSON row E → "Save as Components V2" case saves the V2 components unchanged, and its control (`settled-draft-loses-components`) turns it red. A settled JSON draft is row A or C, so `noticeMessageForSettled` returns null and the dialog adds no second notice.

**Residue in production.** The defect has been on `master` since `12f4ce6` (2026-08-24). The failing path writes nothing, because Save is disabled before `upsertMessage` is called, so no rows were written by it and nothing needs repair. The release form is Vercel serving a client bundle. Each browser gets the fix the next time it loads the page; a tab opened before the deploy keeps the old behaviour, which writes nothing on these drafts, until it reloads. No live-state check is owed for this path. Production data was not read; that is the owner's to check.

## Change

- `src/app/message/_components/NewMessageModal.tsx`: a memoised `resolveContentLoss` over the loaded draft gives `settledMessage` (`applyDisposition` for rows A to D, none for row E) and `settledNotice` (`noticeMessageForSettled`). The floor checks `settledMessage`. `onSubmit` gates `settledMessage ?? loadedMessage`. A warning line under the import tabs shows the settled notice, with the JSON tab's text and `text-warning` class. The preview is fed `settledMessage ?? loadedMessage`. +27 / −5 in total.
- `src/app/message/_components/__tests__/NewMessageModal.persist-gate-wiring.test.tsx`: eight spec-form cases added (below), plus a stub of `~/components/MessagePreview` that records the `messageData` prop it receives (the real renderer is a `next/dynamic` import that does not settle in this harness; the dialog's choice of prop is what is under test). The header comment is deleted: it said the file avoids row E because the choice UI was unreachable, which is false after the fix, and the comment allowlist admits no replacement prose. The file's pre-existing lint findings are fixed (import grouping, `import/first`, and `unbound-method` by mirroring the siblings' `Reflect.set(HTMLInputElement.prototype, 'value', …)`).
- Not touched: `NewMessageJsonInput.tsx` and the utilities. The resolution is shared by calling the existing exports; nothing new is written beside them.

Commits on website `chain/fix-import-save-conflict`: `5b6c6e3` (fix and four cases), `3c6f16f` (the JSON-tab case), `fb1140f` (the preview and its two cases), `f23568a` (the settled-floor case), `b829314` (the post-mount and in-place cases).

## Test

Spec-form cases in `NewMessageModal.persist-gate-wiring.test.tsx`. Each one mounts the real dialog and drives it with the real Continue, name and Save buttons. The import cases feed `message.getFromUrl` query data built by the real `discordResponseToMessage`:

1. A V2-flagged message with content and no V2 components (row D) saves as Classic with the flag cleared, under the settled notice.
2. A message with V2 components and no V2 flag (row B) saves with the flag set, under the settled notice.
3. A message with both (row E) asks on Save, and Save as Classic writes the content without the V2 components.
4. Row E: Save as Components V2 writes the components without the content.
5. A row E JSON draft kept as Components V2 in the JSON tab saves those components unchanged.
6. The preview shows a row D message as the Classic message Save writes (flag cleared).
7. The preview shows a row E message as loaded (content, V2 container and flag) while the choice is pending.
8. A V2-flagged message whose only classic content is an empty embed (row C) is refused as empty once settled: the text "Message must have content, embeds, or components." is shown, the raw draft's "Components V2 messages cannot contain…" is not, and Save writes nothing.
9. A row D message that arrives after the dialog has opened (the user types the link) is settled, noticed and saved as Classic.
10. A loaded row D message replaced in place by a row E one asks on Save, instead of saving the earlier settled draft, and Save as Components V2 writes the components.

**Invented value (Iron Law 5).** The tRPC wrapper `{ guildId: '1', message, droppedComponentTypes }` is the test's transcription of the router's return (`src/server/api/routers/message.ts:120-121`), and the wire's superjson transform is not run. If that shape were wrong, the dialog would show no preview and Continue would stay disabled. The test's own `findButton('Continue')` press would then fail on every import case, and it does not.

**Red run** at `f4baebb`: the final test file was copied into a detached `git worktree add --detach` export of `f4baebb` (removed after the run) and run with `npx vitest run <file> --reporter=json`. Exit 1: cases 1 to 4 failed, the existing classic case passed, and case 5 passed. Capture: `verification/fix-import-save-conflict/red-run-f4baebb.json` and `.txt` (exit line). This run predates cases 6 to 8.

**Red run of the preview** at `3c6f16f`, the tip before the preview change, in a detached export with the `fb1140f` test file: exit 1, case 6 failed ("expected 32768 to be +0"), and cases 1 to 5 and 7 passed. Capture: `red-run-preview-3c6f16f.json` and `.txt`.

**Green run** at `b829314`: 11/11 in the file, and the full suite below.

**Negative controls** (`mutation-run.py` on committed SHAs, each run in its own export; tables under `verification/fix-import-save-conflict/negative-controls/` at `5b6c6e3`, `negative-controls-json-tab/` at `3c6f16f`, `negative-controls-preview/` at `fb1140f`, `negative-controls-floor/` at `f23568a` and `negative-controls-memo/` at `b829314`; mutants files beside them). All 12 KILLED, with test counts checked against their controls. The controls at earlier SHAs mutate lines that later commits did not change:

| Control | What it removes | Cases it turns red |
|---|---|---|
| `gate-on-raw-draft` | `onSubmit` gates the raw draft (the handoff's owed test) | 1 |
| `floor-on-raw-draft` | the floor reads the raw draft | 3, 4 |
| `settled-notice-not-shown` | the notice line | 1, 2 |
| `settled-notice-value-null` | the notice value | 1, 2 |
| `requires-choice-guard-removed` | the row E guard | 3, 4 |
| `no-draft-guard-removed` | the no-draft guard | the existing classic case |
| `settled-draft-loses-components` | the settled draft as written | 2, 5 |
| `preview-shows-raw-draft` | the preview reads the raw draft (CR-2) | 6 |
| `preview-shows-settled-only` | the preview's raw-draft fallback during a row E choice | 7 |
| `settled-floor-removed` | the floor, replaced with `undefined` (the reviewer's CR-1 probe) | 8, on its assertion "expected … to contain 'Message must have content…'" |
| `floor-on-raw-draft` (re-run at `f23568a`) | the floor reads the raw draft | 3, 4, 8 |
| `settled-memo-deps-empty` | the settled draft's memo dependency (`[loadedMessage]` → `[]`, QA's QAF-1 survivor; `react-hooks/exhaustive-deps` is off in the eslint config) | 9, 10, each on an assertion about the notice |

Case 5 passes at base. It is kept because the `settled-draft-loses-components` control turns it red. Case 7 passes at `3c6f16f`. It is kept because `preview-shows-settled-only` turns it red. Case 2's flag assertion alone does not separate base from fix, since the row B write sets the flag at base too; the case is red at base on its notice. This chain adds no lifetime and no time-based test. Row E's held draft is the existing choice UI; cases 3 and 4 follow it to its write, and they are red at base.

## Verification

| Check | Base `f4baebb` | Handoff `b829314` | Capture |
|---|---|---|---|
| Suite `npx vitest run --reporter=json` | 2303 total / 2303 passed, 159 files, exit 0 | 2313 total / 2313 passed, 159 files (same path set), exit 0 | `base-suite-f4baebb.json`, `fix-suite.json`, and `.txt` with the exit line |
| `pnpm run typecheck` (both programs) | — | exit 0 | `typecheck.txt` |
| eslint, touched files (the `lint` script runs `--fix`, so eslint was run directly without it; base read in a detached export) | modal 3 errors; test 6 errors | modal 3 errors, the same three rules (lines shifted by the insert); test 0 | `lint-base-*.json`, `lint-fix-*.json` |
| `convention-check.js --since=f4baebb` | — | 3 FAIL (the modal's three eslint errors at :107, :161 and :405, present at base; disposition below), 0 CANDIDATE, 18 SKIP: 17 untracked `.playwright-mcp/*.png` outside the examined set, and the id-token/basename check, which the checker states did not run (so naming is unchecked by it) | `convention-check.txt` |

The repository-wide eslint run without `--fix` reports problems across the whole repository at both trees. Only the two touched files are compared here; nothing outside them changed. No package-manager operation ran; the lockfile was not touched. No local build was served and no save was made, so the local-build prohibition did not come into play.

## User-visible flows

For the owner's own check, all in the "Create or upload a new message" dialog:

1. Message Link, Webhook or Message Context Command tab: load a message that has the Components V2 flag but only text or embeds. A yellow notice says it "has been saved as Classic and the flag cleared". Continue, name it, Save. The editor opens with a Classic message.
2. The same tabs, with a message that has V2 components but no V2 flag. A yellow notice says the flag "has been set to match". Save works.
3. The same tabs, with a message that has both V2 components and text or embeds. No red error is shown under the tabs and Save is enabled. The preview shows the message as loaded until a choice is made, so it marks the conflict with its own red line, "Components V2 messages cannot contain embeds or content." Save opens "Are you sure?" with Save as Classic and Save as Components V2, each naming what it drops, plus Cancel. The chosen one is saved.
4. In all three cases above, the Message Preview shows the message as it will be saved (for 3, as loaded until a choice is made).
5. The same tabs, with a V2-flagged message that has nothing in it but an empty embed: a red "Message must have content, embeds, or components." is shown and Save stays off.
6. The JSON tab behaves as before.

## Settled questions

- **Convention check: three FAILs at base.** The three eslint errors in `NewMessageModal.tsx` (`react-hooks/set-state-in-effect` twice, `react-hooks/refs`) are on lines this chain did not write, and they are present at `f4baebb`. The owner chose to ship as is and record the debt (selection, `steering/fix-import-save-conflict-rulings.md` block "2026-11-21T08:13Z"). Carrier: `handoff/newmessagemodal-preexisting-react-hooks-lint-errors-2026-11-21.md`.
- **Preview.** Steering ruled it in scope in the same block. It is done at `fb1140f` (Diagnosis, Test).

## Handoff

- SHA: `b829314` (website `chain/fix-import-save-conflict`), base `f4baebb`. Production lines added: 27 (`git diff --numstat f4baebb..b829314`, `NewMessageModal.tsx`), so QA Phase 2 is owed.
- Code review: `code-reviewer-fix-import-save-conflict`. Then QA Phase 2: `qa-fix-import-save-conflict`.
- Merge to website `master`: devops, on the owner's word. A push to `master` deploys to production through Vercel.

## Changelog

| Date | Agent | Change |
|---|---|---|
| 2026-11-21T08:09 | fixer-fix-import-save-conflict | Document created. Diagnosis, red run at `f4baebb`, fix `5b6c6e3` and test `3c6f16f`, 7 negative controls killed, verification recorded, handed to code review at `3c6f16f`. |
| 2026-11-21T08:11 | fixer-fix-import-save-conflict | The run captures were renamed from `.log` to `.txt`, because the record's `.gitignore` excludes `*.log` and the first commit (`b55fba9`) left them out; the references above are updated. |
| 2026-11-21T08:20 | fixer-fix-import-save-conflict | Round 1 answer, handed to code review at `f23568a`. Steering's 08:13Z rulings: the preview now shows the draft Save writes (`fb1140f`), and the lint debt is carried by `handoff/newmessagemodal-preexisting-react-hooks-lint-errors-2026-11-21.md`. Code review CR-1: the settled-floor case (`f23568a`); CR-2: the preview cases. Controls: 4 more, all killed. **Correction:** at 08:09 the Diagnosis said the preview's raw draft was the same at base and fix and not a regression. That was wrong, and the error was mine. At `f4baebb` the preview and Save both used the raw draft; the fix moved Save to the settled draft and left the preview behind, which opened the gap (steering's refutation, block 08:13Z). The claim is replaced in the Diagnosis. |
| 2026-11-21T08:43 | fixer-fix-import-save-conflict | QA Phase 2 answer (QA Failed at `f23568a`, `qa/fix-import-save-conflict-qa.md` at `362c24d7`). QAF-1: cases 9 and 10 at `b829314`, both killed by `settled-memo-deps-empty`. QAF-2: user-visible flow 3 restated; it had said no red "cannot contain" error is shown, but in the real build the preview of the raw row E draft renders that red line itself (QA walk steps 3 and 8). Test file and this document only; no production change. Handed to code review at `b829314`. |
