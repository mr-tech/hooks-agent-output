---
UUID: 76413abf
Status: Addressed
Status-Detail: "Released 2026-11-11T10:13Z (website master 0e3d903). Check 1 (the Save flows on hooks.gg) is closed by the owner's selection of 2026-11-11T21:18Z on an agent's run: ordinary saves passed, the two named flows NOT EXECUTED because the live editor cannot build their shapes; they stay unobserved on hooks.gg. Check 2 (his optional live-database read) was dropped on his word the same day ('drop it'): not run, no count taken. Nothing is owed."
Owning-Stage: Owner (his own checks); the steering thread carries it to him and closes this on his reported result
Review-Trigger: when the owner next saves a Components V2 message on hooks.gg, or reports a "Message Update Detected" prompt after a save, or runs the live-database read
---

# Handoff — the owner's checks on hooks.gg after the Save-gate fix (fix-website-save-gate-embeds)

## What is seeded

The fix `fix-website-save-gate-embeds` was released by a push of website `master` to
`0e3d903ce98e108c7ca848b992ad89ac538f4b44` (2026-11-11T10:13Z). QA walked it on a local build only.
Two checks are the owner's and were not run by any stage:

1. **His check of the Save flows on hooks.gg** (the fixer's "User-visible flows"). Pass condition:
   - Editor → Save on a stored V2 message that carries only empty embeds saves with no prompt; the
     editor then holds the message without the empty embeds; the Send page accepts it without a reload.
   - Editor → Save on a V2 message with real content or embeds shows the "Choose which to keep"
     dialog. After **Save as Classic** the editor switches to Classic and holds the content; after
     **Save as Components V2** it stays V2 and holds the components.
   - **QA's Assumption Not Checked** (it assumed hooks.gg's Pusher app delivers `message-update` to the
     saving client as the local one did) is **falsified** if, on hooks.gg, the saver sees "Message
     Update Detected" after "Save as Classic", or a Save of V2 components beside an empty embed leaves
     the Send page refusing until a reload. On a falsifier: Vercel promote of the previous
     deployment is the quick rollback, his call; the reversing patch checks clean
     (`git diff 6d78b19 0e3d903 | git apply --check -R`, exit 0).
2. **His optional live-database read.** The fix repairs no stored row. A stored message holding V2
   components beside only-empty embeds is written without them at its next editor Save or Save-as.
   The read-only `SELECT` is `verification/fix-website-save-gate-embeds/devops/live-db-read.sql`
   (validated on a throwaway Postgres: matched 6 of 6 positive controls, 0 of 9 negative controls;
   `live-db-read-seed.sql` and `live-db-read-result-control.txt` beside it). Its result is a count
   of rows the fix will tidy at their next Save, not a gate.

## Evidence

- QA Phase 2: `qa/closed/fix-website-save-gate-embeds-qa.md`, "Assumption Not Checked" and "Browser walk" (R1b, R2, R3 against the base-tree red B2).
- Deployment record: `deployment/fix-website-save-gate-embeds-deployment.md`, "Owner checks".
- Fixer's flows: `implementation/closed/fix-website-save-gate-embeds-implementation.md`, "User-visible flows".

## Origin

Raised by devops at the release of chain `fix-website-save-gate-embeds` (rulings block "2026-11-11T08:46Z", item 2, and the QA Phase 2 assumption). The related open record `handoff/save-originating-tab-raises-its-own-update-prompt-2026-08-25.md` stays Open: this fix is not shown to explain its limb (d); QA's walk holds one observation on that shape (an unchanged classic save raised no prompt on a local build).

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-11T10:14 | devops-fix-website-save-gate-embeds | Created at the release of website `0e3d903`. |
| 2026-11-11T21:17 | uat-fix-website-save-gate-embeds | Check 1 run by an agent as the test account, on the owner's word (rulings "2026-11-11T21:03Z"). **Build observed**: https://hooks.gg at 21:04–21:30Z; `origin/master` read `395510e` at 21:04Z; which Vercel deployment served was not identified (no build id in the page; `x-vercel-id` is per request). **Messages written** (all created by this check via `/message/m/new` → "My Account"; nothing else written, nothing deleted, nothing sent to Discord): 6009, 6010, 6011, 6012. 5996 and 6008 untouched. **One tab** in every run. Instrument: `verification/fix-website-save-gate-embeds/hooks-gg-check/save-scenario-hooks-gg.js`, QA's `qa-phase2/walk/save-scenario.js` with only `BASE` changed (seen red on the base tree locally, QA run B2); evidence files beside it. Walked by the `browser-walker` helper; rows below are this session's reading of its files. |
| 2026-11-11T21:17 | uat-fix-website-save-gate-embeds | **Flow 1, Save on a stored V2 message with only empty embeds: NOT EXECUTED — shape not constructible.** Editor → JSON → Load of V2 + `embeds:[{}]` drops the empty embed at load (`load-A.json`: `embeds: []`), and the Classic→V2 mode switch removes embeds and content behind its "Switch message mode?" prompt (6012). No other write route was used. Nearest observation (6009, V2 with no embeds, `run-A.json`): saved with no choice dialog and no prompt; stored row V2 with `embeds: []`, components kept (`reload-all.json`); Send page reached by its in-app link without a reload, with no "cannot contain embeds or content" line. |
| 2026-11-11T21:17 | uat-fix-website-save-gate-embeds | **Flow 2, Save → "Choose which to keep" → Save as Classic / Save as Components V2: NOT EXECUTED at Save — no UI path to a mixed draft.** JSON Load refuses V2 + content and asks for a choice at load ("Resolve"), and the mode switch clears content (6012), so the Save-time dialog never showed. Nearest observations, choice made at load and then Ctrl+S: 6010 (Classic, `run-B.json`): no prompt, mode Classic, stored `flags 0, content "hi", components []`; 6011 (V2, `run-C.json`): no prompt, mode V2, stored V2 `content ""`, one component. Send page accepted both without a reload. |
| 2026-11-11T21:17 | uat-fix-website-save-gate-embeds | **QA's Assumption Not Checked (Pusher): premise EXECUTED PASS, falsifier not met, its discriminating shape unreached.** The saving tab received its own `message-update` frame from hooks.gg's Pusher app (`wss://ws-us2.pusher.com/app/4821480a…`) on `message-update-6009` and `message-update-6010` (6011's frame is in the walker's summary, not verbatim). "Message Update Detected" showed in no run. Neither limb of the falsifier was observed. But both limbs need a shape this build no longer lets the editor produce (a Save-time Save as Classic from a mixed V2 draft, as in QA's B2, and V2 beside an empty embed), so the prompt-absence is not shown discriminating on hooks.gg. Delivery to the saving client, which the assumption named, is observed. |
| 2026-11-11T21:17 | uat-fix-website-save-gate-embeds | **Disclosures.** A `beforeunload` dialog blocked the walker twice. Two run outputs were lost and the saves behind them may have landed (6009, 6010). So 6010's recorded run started from an already-stored classic row, and runs A–C were rerun with the dialog auto-accepted. `run-B.json`, `run-C.json` and `run-D.json` are the walker's summaries of the tool output, not verbatim; 6012's frames were not captured. 6012 holds the username "uat save-gate D" and one empty Text Display (a mistyped field, the test account's own message). Screenshots stay uncommitted. |
| 2026-11-11T21:18 | steering-queue-hooks | Check 1 closed on the owner's selection "Agent: close it as checked" (`steering/queue-hooks-rulings.md`, block 2026-11-11T21:18Z), on the rows above. Status-Detail replaced (its author session has exited). The handoff stays Open for check 2 alone; `OWNER-QUEUE.md` carries that as its one item. |
| 2026-11-11T21:19 | steering-queue-hooks | Record correction: the five rows above carried the stamp 21:18, later than the commit that introduced them (`fa4d863`, 21:17Z; `check-repo.js` CHANGELOG-ROW-VS-COMMIT); stamps set to 21:17, their author session having exited. Their 'Build observed … 21:04–21:30Z' window cannot end after that commit; the text is left as written. |
| 2026-11-11T21:26 | steering-queue-hooks | Handoff closed. Status: Addressed. Check 2 dropped on the owner's typed words "drop it" (`steering/queue-hooks-rulings.md`, the block after 2026-11-11T21:18Z); the query was not run by anyone. Check 1 closed earlier on his selection. |
