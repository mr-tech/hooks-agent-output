---
UUID: 39f2d12f
Status: Open
Status-Detail: "Fix released: website master 1ad625e (chain fix-dialog-closes-on-first-portal-load; push 2026-11-18T22:41Z). Owed: the production look, a fresh load of hooks.gg as the test account — new message, Upload Message, open Save To — dialog stays open. Not yet done: the devops session had no test-account browser. Closes Addressed on the look's pass."
Owning-Stage: a session holding the test-account browser (qa or uat, or a role session launched with --browser), for the production look; steering closes the handoff Addressed on its pass
Review-Trigger: when a session holding the discord-test-browser is next started for the website, or steering launches one for this look
---

# Upload Message dialog closes itself on a portal's first lazy load

## What is seeded

**The defect, as observed on production.** On hooks.gg, signed in, a fresh page load of `/message/f/0` followed by
"new message" → "Upload Message" shows no dialog: "Create or upload a new message" never appears, there is no console
error, and nothing is saved. The dialog does open when the same page lifetime has already loaded the `FloatingPortal`
module, for example after opening an editor page and following the app's own link to `/message/f/0`.

**The mechanism**, proven locally at website `b96e364` and `7ce866b` under both Turbopack and webpack builds:
1. The press opens NewMessageModal, a Headless UI `Dialog`.
2. The modal renders its portaled "Save To" Dropdown. Its popover's portal is
   `dynamic(() => …FloatingPortal, { ssr: true })` in `src/components/AnchoredPopover/Child.tsx`, with no `loading`
   option and no Suspense boundary of its own.
3. On the page lifetime's first render of that dynamic, the lazy read suspends up to the layout's boundary. React
   hides the boundary's existing host nodes with `display: none !important`, the Dialog's portal included.
4. Headless UI's `useOnDisappear` sees the Dialog root's zero rect and calls `onClose` (`closeNewMessageModal`). The
   dialog closes in the same interaction, so nothing ever paints.

A one-property mutation, `loading: () => null` on that dynamic, makes the dialog open (analysis V-4, the mutation
diff).

**The class.** Any Headless UI Dialog that is open when a portaled `AnchoredPopover` renders for the first time in
the page lifetime is closed by the same path. Likely members, not probed: `SaveAsMenu` and `ColorPicker`, which also
pass `portal`. A remedy is owed over the class (every consumer of the `FloatingPortal` dynamic, enumerated from its
importers), not only for NewMessageModal.

**Owed:** a fix and a test that is red on a fresh page lifetime, the shape the defect takes in production. Under the
owner's standing rule, the fix goes into the shared `AnchoredPopover/Child.tsx` once, never into one consumer.

## Evidence

- Analysis: `analysis/015-bug-evaluation-fixes-upload-dialog-analysis.md` (agent-output `f2b0487`), findings V-1 to
  V-6. V-6: `git log -S"mod.FloatingPortal"` dates the dynamic to `fae733f` (2023-02-28). Probes and results are in
  `verification/015/upload-dialog/`, including `instrumentation-and-mutation.diff` and `result-inst-mut.json`.
- Production, fresh load (uat-hooks-015, 2026-11-08, owner ruling D40): `verification/015/uat/hooksgg-upload-fresh-load.js`
  and `hooksgg-upload-fresh-load.png`. After `goto` and a 6 s wait, the session was signed in, there were 0
  `[data-floating-ui-portal]` nodes before the press, and no dialog text appeared at 0.5, 2, 5 or 8 s after it.
- Production, opening case (uat-hooks-015, third walk, ~20:28Z): `verification/015/uat/hooksgg-upload-dialog-live.js`
  and `hooksgg-upload-dialog.png`. Sign-in through Discord OAuth in a new tab, then `goto` `/message/f/0`, and the
  dialog opened. Why that sequence opens it is not established. It ran after an OAuth return in the same tab, which may
  have loaded the module earlier in that page's life.
- Live code: 23 of 24 `/message/f/0` chunk hashes match the local `7ce866b` build, and the 24th differs only in
  env-inlined code (`verification/015/upload-dialog/live-f0-chunks.txt`). Vercel's deployed SHA itself is unread.

## Origin

Chain 015 UAT finding UAT-4 (`uat/015-bug-evaluation-fixes-uat.md`). Then the owner's rulings D39 (analyse it) and
D40 ("Agent: live check first"), in `steering/015-rulings.md` blocks 20:44Z and 21:14Z. The analysis was by
analyst-hooks-015 and the live check by uat-hooks-015. The handoff was written by the planner per D40.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-08T21:16 | planner (planner-hooks-015) | Created from the D39 analysis and UAT's D40 live check. |
| 2026-11-18T22:41 | devops (devops-fix-dialog-closes-on-first-portal-load) | Reconcile: the fix shipped at website `master` `1ad625e` (push 22:41Z, `release-move.js` exit 0; deployment record `deployment/closed/fix-dialog-closes-on-first-portal-load-deployment.md`). The production look (code review Round 1, Assumption Not Checked; falsity: the dialog vanishes or the page flashes to LoadingDots) was not done by devops: its session has no `mcp__playwright__*` tools (ToolSearch, twice, none found). Owning-Stage and Review-Trigger re-routed to the session that can run it. Flows to look at: Upload Message → Save To; SaveAsMenu → Save To; Navigation top-bar menus; embed colour picker, each on a fresh page load. |
| 2026-11-18T22:53 | uat (uat-fix-dialog-closes-on-first-portal-load) | Production look, build. hooks.gg served website `1ad625e`'s client bundle. Method: local Turbopack builds of `1ad625e` and its parent `395510e`, then the HTTP status of every chunk unique to one of them, fetched from hooks.gg at 22:46:37Z. All 12 `1ad625e`-only chunks returned 200, and all 11 `395510e`-only chunks returned 404. Vercel's recorded SHA and the server build were not read. Evidence: `verification/fix-dialog-closes-on-first-portal-load/post-deploy/build-identity.md` and `live-chunk-identity.txt`. Walk: test account, each flow on its own fresh `page.goto`, driven by a browser-walker helper. Instrument: `flash-observer.js`, an init script that logs loading-dots, `display: none !important`, and dialogs appearing or leaving. It was shown to catch a planted dots svg and a planted hide (`step0-planted-log.json`) before any flow was read. |
| 2026-11-18T22:53 | uat (uat-fix-dialog-closes-on-first-portal-load) | Flow 1, Upload Message → Save To: **EXECUTED PASS**. On a fresh `/message/f/0` load, "new message" then "Upload Message" opened "Create or upload a new message". A `[data-floating-ui-portal]` node mounted inside it 1 ms after it opened. That is the first portal of the page's life, the defect's trigger. The dialog was still present at 0.5, 2 and 5 s. After a JSON source was typed and Continue pressed, the "Save To" listbox opened (My Account / Claude / statbot-065-install-test) with the dialog still present. The log after the press has no `hidden-important` and no removal of this dialog. One `loading-dots` entry comes about 8 s after the press, with parent class `inline-block origin-top-left`. The walk did not timestamp its own clicks, so that entry cannot be placed against them. It is not the page-level dots (`flex justify-center py-4`), the hide is absent, and the screenshot shows no flash. All non-GET requests to hooks.gg were route-aborted during this step, apart from auth-session and Vercel telemetry; the aborted list is empty. Evidence: `flow1-log.json`, `flow1-dialog-open.png`, `flow1b-log.json`, `flow1b-saveto-open.png`, `flow1b-aborted.json`. |
| 2026-11-18T22:53 | uat (uat-fix-dialog-closes-on-first-portal-load) | Flow 2, editor Save As → Save To: **EXECUTED PASS**. On a fresh `/message/m/6012/edit`, the File menu was the first popover, then "Save as...". The "Save As" dialog was present at 0.5, 2 and 5 s. Its "Save To" listbox opened with 3 options while the dialog stayed. The log after the press has no `loading-dots`, no `hidden-important` and no `dialog-gone`. Nothing was saved. Evidence: `flow2-log.json`, `flow2-saveas-open.png`, `flow2-saveas-saveto-open.png`. |
| 2026-11-18T22:53 | uat (uat-fix-dialog-closes-on-first-portal-load) | Flow 3, editor top-bar menus: **EXECUTED PASS** for File, Edit, View and Help, each the first popover of its own fresh load of `/message/m/6012/edit`. Each panel opened with its items, and each log after the press holds only the mark. "Send" in that bar is a link, not a menu, and was not clicked. Evidence: `flow3-{File,Edit,View,Help}-log.json` and `-open.png`. |
| 2026-11-18T22:53 | uat (uat-fix-dialog-closes-on-first-portal-load) | Flow 4, embed colour picker: **EXECUTED PASS**. Message 6008 is the test account's only message with an embed. On a fresh `/message/m/6008/edit`, the embed's colour control opened the picker popover (colour field, hue slider, `#E348F9`). The log after the press holds only the mark. Evidence: `flow4-log.json`, `flow4-colorpicker-open.png`. |
| 2026-11-18T22:53 | uat (uat-fix-dialog-closes-on-first-portal-load) | Disclosures. (a) Steering's no-writes rule: no save, upload, send or create was pressed. Opening an editor URL makes the app itself send `POST /api/trpc/user.updatePreferences`. Six of these reached production during flows 2 to 4, each carrying only the test account's `recentMessageIds` re-ordered (`network-all-flows.txt`). That is a write to the test account's own preferences, caused by page load. (b) A record-write gate refused a shell heredoc that would have written `build-identity.md`. It was re-issued with the Write tool, the form the gate names. (c) Screenshots stay uncommitted (global CLAUDE.md, captured media). The code review's Round 1 Assumption Not Checked is falsified on none of its signatures. Status is left for steering to close. |
