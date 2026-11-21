---
ID: n/a
Origin: fix-import-save-conflict
UUID: 0030da7d
Status: Active
Status-Detail: "Fix committed on website chain/fix-import-save-conflict; handed to code review at 3c6f16f. 22 added production lines, so QA Phase 2 is owed after review. One question is with steering (Open questions): three eslint FAILs the convention check reports in NewMessageModal.tsx, all present at base f4baebb."
Handoff-At: 3c6f16f — repos=website
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
- `contentFloorError` → `disableSave` and the red floor notice. It now floors the settled draft, as `JsonModalBody.tsx:171` does.
- `onSubmit` → `gateBeforePersist(settledMessage ?? loadedMessage)`. Rows A to D are gated and written as the settled draft. Row E is gated on the raw draft, so `mustAsk` is true and the existing choice UI opens.

**Consumers that still read the raw `loadedMessage`, unchanged:**
- `commitChoice` → `applyDisposition(loadedMessage, mode)`. The row E options are computed on the raw draft, as the JSON tab's own `commitChoice` does.
- The `!loadedMessage` guards (`disableSave`, Continue, `showPreview`, the floor-notice `show`). A settled draft exists exactly when a non-row-E draft is loaded, so these guards give the same answers they gave before.
- The preview (`MessagePreview messageData={loadedMessage}`). It is unchanged and still shows the raw draft. Base and fix behave the same here (no regression), so it is not this chain's to change; see Open questions.

**Hazard 2 (a JSON-tab draft resolved twice).** The JSON tab hands the dialog a draft it has already settled or chosen, and the dialog now settles it again. `switchToClassic` and `switchToV2` are idempotent by their code (they set the same fields to the same values). I also checked this end to end: the JSON row E → "Save as Components V2" case saves the V2 components unchanged, and its control (`settled-draft-loses-components`) turns it red. A settled JSON draft is row A or C, so `noticeMessageForSettled` returns null and the dialog adds no second notice.

**Residue in production.** The defect has been on `master` since `12f4ce6` (2026-08-24). The failing path writes nothing, because Save is disabled before `upsertMessage` is called, so no rows were written by it and nothing needs repair. The release form is Vercel serving a client bundle. Each browser gets the fix the next time it loads the page; a tab opened before the deploy keeps the old behaviour, which writes nothing on these drafts, until it reloads. No live-state check is owed for this path. Production data was not read; that is the owner's to check.

## Change

- `src/app/message/_components/NewMessageModal.tsx`: a memoised `resolveContentLoss` over the loaded draft gives `settledMessage` (`applyDisposition` for rows A to D, none for row E) and `settledNotice` (`noticeMessageForSettled`). The floor checks `settledMessage`. `onSubmit` gates `settledMessage ?? loadedMessage`. A warning line under the import tabs shows the settled notice, with the JSON tab's text and `text-warning` class. +22 / −4.
- `src/app/message/_components/__tests__/NewMessageModal.persist-gate-wiring.test.tsx`: five spec-form cases added (below). The header comment is deleted: it said the file avoids row E because the choice UI was unreachable, which is false after the fix, and the comment allowlist admits no replacement prose. The file's pre-existing lint findings are fixed (import grouping, `import/first`, and `unbound-method` by mirroring the siblings' `Reflect.set(HTMLInputElement.prototype, 'value', …)`).
- Not touched: `NewMessageJsonInput.tsx` and the utilities. The resolution is shared by calling the existing exports; nothing new is written beside them.

Commits on website `chain/fix-import-save-conflict`: `5b6c6e3` (fix and four cases), `3c6f16f` (the JSON-tab case).

## Test

Spec-form cases in `NewMessageModal.persist-gate-wiring.test.tsx`. Each one mounts the real dialog and drives it with the real Continue, name and Save buttons. The import cases feed `message.getFromUrl` query data built by the real `discordResponseToMessage`:

1. A V2-flagged message with content and no V2 components (row D) saves as Classic with the flag cleared, under the settled notice.
2. A message with V2 components and no V2 flag (row B) saves with the flag set, under the settled notice.
3. A message with both (row E) asks on Save, and Save as Classic writes the content without the V2 components.
4. Row E: Save as Components V2 writes the components without the content.
5. A row E JSON draft kept as Components V2 in the JSON tab saves those components unchanged.

**Invented value (Iron Law 5).** The tRPC wrapper `{ guildId: '1', message, droppedComponentTypes }` is the test's transcription of the router's return (`src/server/api/routers/message.ts:120-121`), and the wire's superjson transform is not run. If that shape were wrong, the dialog would show no preview and Continue would stay disabled. The test's own `findButton('Continue')` press would then fail on every import case, and it does not.

**Red run** at `f4baebb`: the final test file was copied into a detached `git worktree add --detach` export of `f4baebb` (removed after the run) and run with `npx vitest run <file> --reporter=json`. Exit 1: cases 1 to 4 failed, the existing classic case passed, and case 5 passed. Capture: `verification/fix-import-save-conflict/red-run-f4baebb.json` and `.txt` (exit line).

**Green run** at `3c6f16f`: 6/6 in the file, and the full suite below.

**Negative controls** (`mutation-run.py` on committed SHAs, each run in its own export; tables under `verification/fix-import-save-conflict/negative-controls/` at `5b6c6e3` and `negative-controls-json-tab/` at `3c6f16f`; mutants files beside them). All 7 KILLED, with test counts checked against their controls:

| Control | What it removes | Cases it turns red |
|---|---|---|
| `gate-on-raw-draft` | `onSubmit` gates the raw draft (the handoff's owed test) | 1 |
| `floor-on-raw-draft` | the floor reads the raw draft | 3, 4 |
| `settled-notice-not-shown` | the notice line | 1, 2 |
| `settled-notice-value-null` | the notice value | 1, 2 |
| `requires-choice-guard-removed` | the row E guard | 3, 4 |
| `no-draft-guard-removed` | the no-draft guard | the existing classic case |
| `settled-draft-loses-components` | the settled draft as written | 2, 5 |

Case 5 passes at base. It is kept because the `settled-draft-loses-components` control turns it red. Case 2's flag assertion alone does not separate base from fix, since the row B write sets the flag at base too; the case is red at base on its notice. This chain adds no lifetime and no time-based test. Row E's held draft is the existing choice UI; cases 3 and 4 follow it to its write, and they are red at base.

## Verification

| Check | Base `f4baebb` | Handoff `3c6f16f` | Capture |
|---|---|---|---|
| Suite `npx vitest run --reporter=json` | 2303 total / 2303 passed, 159 files, exit 0 | 2308 total / 2308 passed, 159 files (same path set), exit 0 | `base-suite-f4baebb.json`, `fix-suite.json`, and `.txt` with the exit line |
| `pnpm run typecheck` (both programs) | — | exit 0 | `typecheck.txt` |
| eslint, touched files (the `lint` script runs `--fix`, so eslint was run directly without it; base read in a detached export) | modal 3 errors; test 6 errors | modal 3 errors, the same three rules (lines shifted by the insert); test 0 | `lint-base-*.json`, `lint-fix-*.json` |
| `convention-check.js --since=f4baebb` | — | 3 FAIL (the modal's three eslint errors, present at base), 0 CANDIDATE, 18 SKIP: 17 untracked `.playwright-mcp/*.png` outside the examined set, and the id-token/basename check, which the checker states did not run (so naming is unchecked by it) | `convention-check.txt` |

The repository-wide eslint run without `--fix` reports problems across the whole repository at both trees. Only the two touched files are compared here; nothing outside them changed. No package-manager operation ran; the lockfile was not touched. No local build was served and no save was made, so the local-build prohibition did not come into play.

## User-visible flows

For the owner's own check, all in the "Create or upload a new message" dialog:

1. Message Link, Webhook or Message Context Command tab: load a message that has the Components V2 flag but only text or embeds. A yellow notice says it "has been saved as Classic and the flag cleared". Continue, name it, Save. The editor opens with a Classic message.
2. The same tabs, with a message that has V2 components but no V2 flag. A yellow notice says the flag "has been set to match". Save works.
3. The same tabs, with a message that has both V2 components and text or embeds. No red "cannot contain" error is shown and Save is enabled. Save opens "Are you sure?" with Save as Classic and Save as Components V2, each naming what it drops, plus Cancel. The chosen one is saved.
4. The JSON tab behaves as before.

## Open questions

- **Convention check: three FAILs at base.** The three eslint errors in `NewMessageModal.tsx` (`react-hooks/set-state-in-effect` twice, `react-hooks/refs`) are on lines this chain did not write, and they are present at `f4baebb`. Fixing them would change the guild-selection effects and the transition refs, which is outside the scope statement. This was put to `steering-hooks`, options: (a) record them as pre-existing and ship as is; (b) re-scope this chain to fix them; (c) stop here.
- **Observation, not absorbed:** the dialog's preview still shows the raw imported draft, not the settled one (for example, a row D draft previews as V2). Base and fix behave the same. It is reported to steering with the question above.

## Handoff

- SHA: `3c6f16f` (website `chain/fix-import-save-conflict`), base `f4baebb`. Production lines added: 22 (`git diff --numstat f4baebb..3c6f16f`, `NewMessageModal.tsx`), so QA Phase 2 is owed.
- Code review: `code-reviewer-fix-import-save-conflict`. Then QA Phase 2: `qa-fix-import-save-conflict`.
- Merge to website `master`: devops, on the owner's word. A push to `master` deploys to production through Vercel.

## Changelog

| Date | Agent | Change |
|---|---|---|
| 2026-11-21T08:09 | fixer-fix-import-save-conflict | Document created. Diagnosis, red run at `f4baebb`, fix `5b6c6e3` and test `3c6f16f`, 7 negative controls killed, verification recorded, handed to code review at `3c6f16f`. |
| 2026-11-21T08:11 | fixer-fix-import-save-conflict | The run captures were renamed from `.log` to `.txt`, because the record's `.gitignore` excludes `*.log` and the first commit (`b55fba9`) left them out; the references above are updated. |
