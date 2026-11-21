# Rulings — fixer chain `fix-import-save-conflict` (website: Save stays off in the new-message dialog on a conflicting imported draft)

Fixer chain steered by `steering-hooks` (cwd `/usr/local/bin/hooks`; coordinator `steering-coordinator`), chain 3 of effort
`fixer-queue-2026-11-21`. Commission and order: `steering/fixer-queue-2026-11-21-rulings.md`, blocks "2026-11-21T05:32Z", "05:38Z",
"05:50Z". Brief common part: `steering/fix-import-save-conflict-brief-common.md`. tmux category: `fix-import-save-conflict`.

## 2026-11-21T07:54Z — scoping determination: fixer chain, website, one handoff

**His words.** Effort block "2026-11-21T05:50Z", Q2, chosen by selection: "Agent: resolve like JSON tab (Recommended)" — "a fixer
chain resolves the conflict the same way the JSON tab does, so Save works." This thread's reading of "the way the JSON tab does",
agent-authored, effort block "2026-11-21T05:59Z": a row E draft (V2 components and classic content) is held for the user's choice of
Classic or V2, the other dropped (plan 013 D17); rows A-D are settled with `applyDisposition` and a settled notice.

**Source.** `handoff/newmessagemodal-persist-gate-choice-unreachable-2026-08-27.md`, IN whole, including the test it owes (one that fails
if `onSubmit` submits the raw draft rather than the gate's result).

**Shape.** Defect, user-visible (Save off with no way out on a bot, webhook or code import). No dated outside event. Cause read from code,
not run, re-read by this thread at website `origin/master` `f4baebb` (07:5xZ): `NewMessageModal.tsx:126` `contentFloorError =
validateContentRequirements(loadedMessage)` on the raw draft; `:192-193` `disableSave` includes it; the choice UI (`pendingChoice`,
`:150`, `:210-217`) is reached only through `gateBeforePersist` (`:164`) in `onSubmit`, which the disabled Save never reaches. The JSON
tab: `NewMessageJsonInput.tsx:96-110` (`resolveContentLoss`, `requiresChoice`, `noticeMessageForSettled`, `applyDisposition`), `:54`
`commitChoice`. Files unchanged `76da25c..f4baebb` (`git diff --stat`, empty). Blast radius: the new-message dialog's import tabs and its
two page hosts (`message/page.tsx`, `f/[id]/page.tsx`). No library holds the fix. End step: website `master`, Vercel production; his
word, asked by devops in its own session.
**Release ref.** `release-move.js … master f4baebb… --dry-run` (07:5xZ): "DRY RUN: every check passed; nothing moved"; no workflows;
one serving ref. Tree: `master` `f4baebb` = `origin/master`; `?? .playwright-mcp/` only. Lockfile unchanged `6f76c6d..f4baebb`.
**Released chains whose scope touched these routes:** plan 013 (D17, D31) and plan 014 (M4c, the test conversion that found this);
both closed. `fix-message-not-found` (released 07:51:38Z) touched `/message/m/[id]/**`, not this dialog.

**Scope sweep** (helper, `verification/fix-import-save-conflict/scoping/sweep.md`, commit `729a64f`, at `76da25c`; premises re-read at
`f4baebb` as above): only `NewMessageModal.tsx` has the property; the floor fires on row D (V2 flag plus content, no V2 components) as
well as row E; `SaveAsMenu`, the main editor save (`useApiMethods.ts:78-104`) and `JsonModalBody` offer the choice; the send page
(`send/page.tsx:160-170`) can see only a stored conflicting row, which the persist gates prevent (cannot tell from code). Ingresses:
bot, webhook and code imports through `discordResponseToMessage`, which copies `content`, embeds, components and `flags` unnormalised;
whether Discord returns both is unanswered (qa BC-17). Covering tests: `NewMessageModal.persist-gate-wiring.test.tsx` (one classic
case; header avoids row E), `discordResponseToMessage.rowE-persist-gate.test.ts`, the `NewMessageJsonInput` conflict and
settled-notice tests.

**Stage set:** `fixer-fix-import-save-conflict` → `code-reviewer-fix-import-save-conflict` (and QA Phase 2, `qa-fix-import-save-conflict`,
only at 20 or more added production lines; under 20 the reviewer also runs the suite and the red tests) → devops for website `master`
(his word). No plan, critic, Phase 1 or UAT; the fixer's **User-visible flows** list is quoted to him with the release.

**Scope statement (bounded).** Repository `website` only, from `origin/master` `f4baebb`, on `chain/fix-import-save-conflict`:
1. In `NewMessageModal`, a draft from any import tab whose content conflicts (rows A-E of the JSON tab's disposition) never leaves Save
   disabled with no way out: rows A-D are settled as the JSON tab settles them, with its settled notice; row E holds the draft for the
   user's choice of Classic or V2 (the dialog's existing choice UI), the other dropped, as the JSON tab does.
2. Save writes the settled or chosen draft, never the raw one (the handoff's owed test).
Write set: website `src/app/message/_components/NewMessageModal.tsx`, `src/app/message/_components/NewMessageJsonInput.tsx` (only to
share its existing resolution, not to change its behaviour), the disposition utilities it imports (`src/app/message/_components/utils/**`
or wherever `applyDisposition`/`resolveContentLoss` live, sharing only), their `__tests__/`; in the record, the fixer's document and
`verification/fix-import-save-conflict/`. A change to the JSON tab's own behaviour, `SaveAsMenu`, `JsonModalBody` or the send page is a
re-scope.

**Exclusions.** The send page's disabled send on a stored conflicting row: OUT (cannot tell from code that it is reachable; the persist
gates prevent the row). Normalising `discordResponseToMessage` at ingress: OUT (a different fix than his words name).

**What the sweep did not cover** (devops hazard lines): whether Discord ever returns row E (BC-17); production data; `PresetDialog` and
`Form` submit handling; the server `upsert` on a row E payload; `EditMessageMenu` and the `oldMessage` flow.

## 2026-11-21T08:13Z — the fixer's two items: lint debt by his selection; the preview by this thread's ruling

Source: `fixer-fix-import-save-conflict` by SendMessage 08:0xZ; `implementation/fix-import-save-conflict-implementation.md` (record
`1e4d899`, Handoff-At `3c6f16f`, 22 added production lines → QA Phase 2 owed). Refutation helper (08:1xZ; exports of `f4baebb` and
`3c6f16f` in `scratchpad/refute3/`, eslint run, the component read by grep and diff):
- Lint: HOLDS — 3 errors at both SHAs (`set-state-in-effect` 107 and 146→161, `refs` 383→401), none on lines the fix wrote.
  Selection prompt put 08:1xZ, answered 08:13Z (ledger block "2026-11-21T08:13Z — steering-hooks"); wording this thread's. Options: A
  "Agent: ship, record debt (Recommended)" — "the chain ships without touching those lines; the three errors are written up on a handoff
  as pre-existing, for a later chain"; B "Agent: fix them in this chain"; C "Agent: stop chain 3". Chosen by selection: **A**. The
  fixer writes the handoff in its next round.
- Preview: HOLDS, and sharper than reported — at `f4baebb` the preview (`MessagePreview messageData={loadedMessage}`, line 362) matched
  what Save wrote (the raw draft); at `3c6f16f` Save writes `gateBeforePersist(settledMessage ?? loadedMessage)` (line 179) while the
  preview stays on `loadedMessage` (line 380), so the fix opens a gap between what is shown and what is saved. **This thread's ruling, not
  put to him:** in scope — his words are "the way the JSON tab does", and the JSON tab settles the draft before it is previewed
  (`NewMessageJsonInput.tsx:110` `setMessage(applyDisposition(validated))`). The dialog's preview shows the draft Save will write
  (settled, or the raw draft while a row E choice is pending), with a test; same file, in the write set.
Recipients: `fixer-fix-import-save-conflict` (both), `code-reviewer-fix-import-save-conflict` (reviews the next round from the record).

## 2026-11-21T09:02Z — released; PD-1 closes on its read; the empty Message Link import gets a diagnose-first chain

Released: website `master` `f4baebb` → `b829314` at 08:53:57Z on his selection (devops's message; `git ls-remote` read back
`b82931402f…` by this thread). Deployment record closed Released. PD-1 (`qa-fix-import-save-conflict`, record `0818ae7c`): the release
serves (a row D draft in the Webhook tab gets the settled notice, Continue enabled); the Message Link limb is falsified upstream —
production's `message.getFromUrl` returned content "", embeds [] and no components for both test-bot fixtures (capture
`verification/fix-import-save-conflict/qa/pd1/evidence/getFromUrl-direct-read.json`). Refutation helper (09:0xZ, read at refs): HOLDS —
`src/server` and `src/utils` unchanged `f4baebb..b829314`; the fetch is `GET /channels/{id}/messages/{id}` with `DISCORD_BOT_TOKEN`
(`message.ts:116`, `discord.ts:12-17`); `content` copied verbatim, `droppedComponentTypes: []`; the Message Content intent is inference.
Selection prompt put 09:0xZ, answered 09:02Z (ledger block "2026-11-21T09:02Z — steering-hooks"); wording this thread's.
- Q link import: A "Agent: diagnose-first chain (Recommended)" — "add a diagnose-first fixer chain to the queue after chain 3b. It
  establishes the cause on the test server first. If the fix is your toggle in Discord's developer portal (the bot's Message Content
  intent), that step comes to you; if it is code, the chain fixes it."; B "You: check the bot's intent"; C "Agent: known limit,
  handoff"; D "Agent: don't track it". Chosen by selection: **A**.
- Q PD-1: A "Agent: close it on this read (Recommended)"; B "Agent: hold it open". Chosen by selection: **A**.
Recipients: `qa-fix-import-save-conflict` (close PD-1's handoff on this read, the Message Link limb carried by the new chain's
handoff). Effort order: a diagnose-first chain `fix-message-link-import-empty` after chain 3b (effort file).

## 2026-11-21T09:05Z — chain closed out

PD-1 closed Addressed by `qa-fix-import-save-conflict` (`e4f72e00`, `handoff/closed/fix-import-save-conflict-post-deploy-2026-11-21.md`);
the Message Link limb carried by `handoff/message-link-import-returns-empty-message-2026-11-21.md` (6cc5f883, `30729bcf`). Source handoff
7f21ac93 closed Addressed after PD-1 (this round). Created by the chain and left Open on their own triggers:
`handoff/newmessagemodal-preexisting-react-hooks-lint-errors-2026-11-21.md` (his 08:13Z selection) and
`handoff/fix-import-save-conflict-unchecked-hazards-2026-11-21.md` (devops; Owning-Stage this thread; its five hazard lines are the
determination's "did not cover"). Architecture/roadmap: none owed (devops's sweep). Sessions stopped 09:05Z (four). Scratch removed:
four chain session directories (`du -s` 60+72+24+1484 KB; `ls -d` fails after), none cited. No containers. Retrospective: joins the
next fixer batch (chains 3b onward).
