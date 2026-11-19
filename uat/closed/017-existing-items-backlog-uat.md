---
ID: 017
Origin: 017
UUID: 5c3e9a71
Status: Committed
Status-Detail: "Committed at release identifier chain/017-existing-items-backlog (website 7293a35, generator 8512a1d) by devops Stage 1 at 2026-11-19T19:13Z; closed. Anchor fields above keep the values the document was written at. Post-deploy rows B-6 to B-11 ride handoff/017-existing-items-backlog-post-deploy-2026-11-19.md."
Verified-At: "7293a35,8512a1d — repos=website,preview-image-generator; pass 2 ran on git archive exports with their own installs, website as a production build (next build, next start) on 127.0.0.1:3000, generator under the M5 rig copy; plan read at Revision 11. Pass 1's verdict at 4b8db9c,8512a1d (next dev) is expired."
Release-Decision: APPROVED FOR RELEASE
---

# UAT Report: Plan 017 — the existing-items backlog

**Plan Reference**: `agent-output/planning/017-existing-items-backlog.md`: Revision 11 for pass 2 (agent-output `4c8be42`); Revision 9 for pass 1 (`bcc23c6`)
**Date**: 2026-11-19
**UAT Agent**: Product Owner (UAT), session `uat-hooks-017`

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-19T10:29 | steering-roadmap-hooks (brief `steering/backlog-2026-11-18-briefs/uat-hooks-017.md`) | UAT on plan 017 at website `4b8db9c`, generator `8512a1d`; register rows B-1 to B-4, B-12, B-13 | Stage start re-derived: QA document `QA Complete`, `Verified-At` `4b8db9c,8512a1d`, committed at `1a8edce`, effort-final sweep 124 of 140 killed. Both shared trees on `chain/017-existing-items-backlog` at those SHAs. Five browser walks on a local stack. Five rows EXECUTED and passed; B-1 FAIL (UAT-1), routed to the implementer. NOT APPROVED. |
| 2026-11-19T10:52 | implementer-hooks-017 (UAT-1 diagnosis, capture set); steering-roadmap-hooks (re-walk before any code change) | Re-walk B-1's M2-b window with the implementer's capture set | Walk 6 on a rebuilt stack at the same SHAs: the notice recurred in the saving tab in W3 and X5 (2 of 15 window runs), with every upsert 200, no crash or page error, and no error toast at X5. Candidate (1) is not supported at X5, and the crash precursor did not reproduce. In both recurrences the frame preceded the upsert response by 74–85 ms and the notice followed the response by 1–3 ms. Decision unchanged: NOT APPROVED. Stack removed again. |
| 2026-11-19T19:03 | steering-roadmap-hooks (re-walk brief by message) | UAT re-walk at website `7293a35`, generator `8512a1d` (plan-level QA Complete, `cf69ef1`); rows B-1 to B-4, B-12, B-13, B-15; code review's and QA's routed assumptions | Pass 2 on a production build. B-1 re-walked: 0 own-save notices in 16 valid window and plain runs, frames are JSON text decoded as strings. B-15 passes twice (one socket per tab across an in-app switch). B-12 limb 1 and B-13 limbs 1–3 pass after the recorder's control. The rest carry from pass 1, their paths unchanged. Bare number-shaped frames decode to numbers. O-1 recorded (four `/preview` error statuses, pre-existing surface). APPROVED FOR RELEASE; pass 1's verdict at `4b8db9c` expired. Stack removed. |
| 2026-11-19T19:13 | devops-hooks-017 (Stage 1) | Document closed | Document closed. Status: Committed. Plan 017 is committed on chain/017-existing-items-backlog (website 7293a35, generator 8512a1d) at devops Stage 1; the release is Stage 2. |

## Stage start and identity

- QA document `qa/017-existing-items-backlog-qa.md`: `Status: QA Complete`, `Verified-At` `4b8db9c,8512a1d`, last commit `1a8edce` (`git log -- <path>`), effort-final sweep recorded (124 of 140 killed, survivors dispositioned). Authority for the register rows: that document's "Blocking-condition register", re-read at this write.
- Shared trees (`git -C <repo> rev-parse --short HEAD`, `branch --show-current`, 09:15Z): website `4b8db9c`, generator `8512a1d`, both on `chain/017-existing-items-backlog`. The flows ran on `git archive` exports of exactly those SHAs. Any change to production code in either repository expires this verdict and the predecessor verdicts it rests on.
- Plan: the brief named Revision 8; the plan is at **Revision 9** (`bcc23c6`). Revision 9 adds Exclusions X-24 (QAF-25, `StyledLink` prefetch default) only. No criterion, milestone or register row this pass verifies moved. The critic's read of that delta is owed (plan, Owed re-verdicts) and is not this stage's.
- Steering's brief arrived and was read whole, with its common part.

## Flow Execution
**Build**: website export of `4b8db9c` (`pnpm install --frozen-lockfile`, `next dev -H 127.0.0.1 -p 3000`, `.env.local` symlinked from the shared tree and read for key names only). The process environment overrides it with `CDN_ENDPOINT`, `NEXT_PUBLIC_CDN_HOST`, `PREVIEW_IMAGE_URL` and `PREVIEW_IMAGE_API_KEY`, pointing at the rig; read back from the server's `/proc/<pid>/environ`. Generator export of `8512a1d` (`npm ci`), run by `verification/017/uat/rig-uat.mjs`. That is a copy of `m5-rig/rig.mjs` that adds generator-only stop and start (SIGUSR1/SIGUSR2) so the S3 stub keeps serving old previews. Postgres from `tools/uat-local-stack.sh up` (`local-stack-up.txt`): schema pushed, ids next 900000000000001. Real Pusher app. The kept Chrome profile was driven by `browser-walker` helpers, signed in through Discord to loopback. No write reached `hooks.gg`. Nothing was installed or built in the shared trees.

Flows: the implementer's per-flow tables (M3, M4, M5, M8 documents) plus each milestone's "Human-observable form" in the plan. M2 has no flow table, so its flow is the plan's M2 form. M1 and M7 (hygiene) and M6 (generator, observed through M5's list) add no flow of their own.

| Flow | Action | Expected | Observed | Result |
|------|--------|----------|----------|--------|
| B-1 / M2-c | A saves; B open on the same message | B shows "Message Update Detected" | B showed it 0.2–0.5 s after A's save in every valid run (walks 1–4) | PASS |
| B-1 / M2, no edit in flight | A types, stops, saves (walk 2 R3; walk 4 R5, R6) | A shows nothing | Nothing in A in all 3 runs (50–100 ms loggers) | PASS |
| B-1 / M2-b, edit in flight | A saves, then edits the name after the send and before the broadcast arrives | A shows nothing | **Walk 3 A1: A showed it at 10:05:19.423Z.** Save POST 10:05:19.101Z, edit 10:05:19.234Z, B 10:05:19.437Z (`walk-3/A1-result.json`). Clean in walk 3 A2 and walk 4 R1b–R4 (5 runs, edit 30–140 ms after the POST, frame 0.2–0.3 s after) | **FAIL** (UAT-1) |
| B-12 limb 1 | Link prompt open in A; B saves, so the update prompt opens over it; one Enter | Only the focused prompt answers; the other stays and is answered on its own | 2 dialogs; focus on Reload; one Enter ran Reload only; link prompt stayed open; Cancel kept the URL (`walk-1/B12-evidence.json`) | PASS |
| B-12 limb 2 | Lone link prompt; one Enter | Navigates | Focus on Leave Page; Enter went to `/message/f/0` | PASS |
| B-13 controls | Planted Delete+Reload (C1), image Save+Reload (C2), one task each | Recorder sees the stray action | C1 fields 8→7→8; C2 marker image visible (`walk-2/C1-…`, `C2-recorder-result.json`) | instrument valid |
| B-13 limb 1 | W open, U over it, focus on U's text off its buttons, one Enter | Reload only | Active element a DIV in U; fields 8/8/8 frame by frame; A got B's content; W unmounted with the reload (`walk-2/limbs.json`) | PASS |
| B-13 limb 2 | Same, with the image dialog (avatars/3.png loaded) | Reload only | Focus a DIV in U; marker never visible; Reload ran | PASS |
| B-13 limb 3 | W open, U arrives, Enter with no click | Reload only (health check) | U's autofocus on Reload; fields 8/8/8; Reload ran. RK-11's premise holds: U focuses its own Reload | PASS |
| B-13 limb 4 | W alone, click its text, one Enter | Field deleted | Focus a DIV in W; fields 8→7 (`walk-1/B13-evidence.json`) | PASS |
| B-2 / M3-a | Signed out at route 0: draft, reload, new tab, Log in, open M, back to route 0 | Draft kept throughout; no prompt on Log in | Draft `m3adraft` kept after reload (beforeunload shown, signed out), in a new tab, and after sign-in, M and back; no prompt on Log in (`walk-3/B2*.json`). The name cannot be edited signed out, so only content is compared | PASS |
| B-2 / M3-b | Committed unsaved edit on M; session row deleted; reload; sign in; open M from the list | Route 0 shows its own draft; M shows the edit | Reload control kept `m3bctl2`. After the expiry: landed on `/message/m/0/edit` showing `m3adraft`, not the marker. No prompt on Log in. M's editor showed `m3bmark2` (`walk-5/walk-5-evidence.json`) | PASS |
| B-3 / M4 | Unsaved edit; user-icon link; Cancel; Leave Page | Dialog; Cancel keeps the edit; Leave Page navigates | As expected; `/message/f/0` reached (`walk-3/C-results.json`) | PASS |
| M4, `/send` sidebar | On `/send` with an unsaved edit, Sidebar link to `/message` | Same dialog | Own `/send` link: no dialog. Sidebar link: dialog; Cancel stays; Leave Page goes to `/message` | PASS |
| M4, own and new-tab links | Own `/send`, crumb to own `/edit`, File > New, ctrl+click | No dialog | No dialog in any case; edit survived | PASS |
| M4, external link | NavMenu "Invite Bot", Cancel, then Leave Page | Dialog; no second browser prompt | Dialog both times; reached `discord.com/oauth2/authorize`; no second prompt; nothing clicked there | PASS |
| B-4 / M5 stale | Generator stopped (port 0, rig exit line); save M; reload list | Old preview, not broken; nonce unchanged | Same src, naturalWidth 192, nonce `v1795083621…` unchanged; D-8 line `class=network-error` logged | PASS |
| B-4 / M5 fresh | Generator started (port 1); save M; reload list | New preview | New src `v17950839533…`, naturalWidth 192, equal to the DB nonce | PASS |
| M5-d first render fails | Generator stopped; new message saved; reload list | Default image, not broken | Id 900000000000002, nonce empty, card shows Discord's default avatar (naturalWidth 256); D-8 line logged | PASS |

Instrument notes. Two walk failures traced to the walk, not the product: walk 3's M3-b step and walk 4's reload control both typed into the open content editor without closing it. That text never reaches the message or storage (walk 4's control lost it on a plain reload). Walk 5 committed each edit first and re-ran both. Walk 5's "leave prompt on reload after session expiry" was this stage's brief error: the prompt belongs to the reload itself, on a signed-in page with unsaved edits (unchanged `useUnloadAlert`). D-18 covers the sign-out exit after load, and it showed no prompt. The B-13 recorder (`verification/017/uat/enter-recorder.js`) was seen to fail on planted differences (C1, C2) before its limb runs were read. In the B-13 limbs, the update prompt's prediction "W or I stays open" cannot be observed: Reload re-renders the message and unmounts the dialog underneath. The recorder reads the discriminating part, whether the dialog's action ran.

Id range written (workspace `CLAUDE.md`): messages 900000000000001 and 900000000000002 only. `select count(*) from "Messages" where id < 900000000000001` returned 0 after the first save and at the end of every walk (`messages-final.txt`). This discharges `handoff/local-walk-save-can-write-a-client-sent-low-message-id-2026-11-11.md`: first save id 900000000000001, count 0. No save carried a foreign id. The E-9 check: the S3 stub's log holds the website's list (`GET /bucket/?prefix=dev/previews/<id>/`) and batch-delete (`POST /bucket/`) requests beside the generator's PUTs (`rig-log.jsonl`). Server log: 39 of 39 `message.upsert` returned 200 (`upsert-200-count.txt`); 2 D-8 lines (`d8-failure-lines.txt`).

Not completed: one recursive search of `verification/017/` while looking for prior local-build steps; the directories were listed by name instead. A helper's shell write of `walk-4/part1-results.md` was refused by the record-write hook and re-issued with the Write tool (a format gate satisfied).

## Blocking-condition register — execution state

Authority for each row's prediction, instrument and subject: QA's register (`qa/017-existing-items-backlog-qa.md`, re-read 10:30Z). B-5 and B-14 were executed by devops (QA's reconciles). B-6 to B-11 are post-deploy rows; this stage gates none of them.

| Row | State | Result |
|---|---|---|
| B-1 | EXECUTED 2026-11-19 at `7293a35` (walk 7) — PASS. *Pass 1 at `4b8db9c`: FAIL, below.* | Tab 2 shows the notice (M2-c holds). Tab 1 raised its own-save notice once in 6 captured runs that hit M2-b's window (walk 3 A1). Walk 1 also saw it once at about 09:23:45Z after a save at 09:22:38Z, but did not capture when it appeared, so that sighting is not weighed. UAT-1. Walk 6 (re-walk with captures): recurred in 2 of 15 window runs (W3, X5), so 3 of 21 captured window runs in all. |
| B-2 | EXECUTED 2026-11-19 (pass 1; path unchanged at `7293a35`) | PASS (M3-a, M3-b) |
| B-3 | EXECUTED 2026-11-19 (pass 1; path unchanged) | PASS |
| B-4 | EXECUTED 2026-11-19 (pass 1; save path smoke-checked at `7293a35`) | PASS (stale, fresh, and first-failure default) |
| B-12 | EXECUTED 2026-11-19 (limb 1 at `7293a35`, walk 8; limb 2 pass 1) | PASS (limbs 1 and 2) |
| B-13 | EXECUTED 2026-11-19 (limbs 1–3 at `7293a35`, walk 8; limb 4 pass 1) | PASS (limbs 1–4; limbs 1–2 read by the recorder after its controls, both passes) |
| B-15 | EXECUTED 2026-11-19 at `7293a35`, production build (walk 7) | PASS, two runs: one open Pusher socket per tab after each in-app switch; the old editor's socket closed on leaving; marker kept |

## Findings

UAT-1 HIGH — `website/src/providers/MessageProvider/usePusher.ts` (the own-save compare, M2). In walk 3 run A1, the saving tab A raised "Message Update Detected" for its own save. The content edit was verified; File > Save was clicked for real; the name was edited 133 ms after the upsert POST and before the broadcast reached A. A showed the notice at 10:05:19.423Z, B at .437Z. The server answered every upsert 200, so this is not M2's residue class (2) on the server side. The client's own view of that save was not captured. It did not reproduce in 5 later runs in the same window (walk 3 A2; walk 4 R1b–R4, with upsert bodies and Pusher frames captured in `walk-4/R1-partial.json` and `part1-results.md`). Just before A1, the helper had crashed tab A twice ("Application error", `TypeError … previousElementSibling` in a react-aria focus scope) by dispatching synthetic clicks on File, which no user does. Whether that state bears on A1 is not established. Against value statement 2 this is the defect itself, observed after the fix, so M2-b's "for every save" is not shown. Routed to `implementer-hooks-017` for diagnosis.

**Walk 6, the re-walk (UAT-1 reproduced).** The implementer could neither name a defect nor place A1 outside the class. Its ranked candidates were (1) a client-side mutation error whose `onError` forgets the record, and (2) a second live handler binding; it named a capture set. Steering ordered a re-walk before any code change. Instrument: `verification/017/uat/b1-capture-init.js`, installed with `addInitScript`. It records inbound `message-update` frames, the `message.upsert` start, response and status, window errors and rejections, and dialog and react-toastify toast changes at 25 ms. Stack rebuilt from the same SHAs on a fresh database (`local-stack-up-2.txt`); M = 900000000000001 again, and the count below 900000000000001 was 0 after creation and at the end (`walk-6/db-*.txt`). Results (`walk-6/summary-*.json`, `<run>-A-cap.json`, `<run>-B-cap.json`):
- **Recurred in the saving tab in W3 and X5, 2 of 15 window runs** (W1–W10; X1–X5 after the precursor attempt). B showed the notice in every run.
- Every upsert answered 200, in the capture and in the server log (38 of 38). No page error, unhandled rejection or crash anywhere in the walk.
- X5's toasts at the notice: only "Saving message...", no error toast. W3 still showed an error toast left over from control K.
- In W3 and X5 the frame reached A 85 ms and 74 ms before the upsert response, and the notice appeared 1–3 ms after the response was logged. In the 13 clean runs, frame and response came within about 10 ms of each other (frame first by 2–10 ms, or after by 9 ms in W5).
- Crash precursor: synthetic dispatch on File, then `element.click()` on File and Save, crashed nothing. A1's crash is not needed for the notice.
- Control K: the page was planted a 500 while the server stored and broadcast the save. Seen: status 500, the error toast, frames in both tabs, B's notice. A raised no notice, because its frame arrived 14 ms before the 500 and consumed the record. M2's residue class (2) shows only when the response is handled first. K proves the capture sees each element; it is no test of the notice.

Reading for the implementer (correlation over two runs, not a diagnosis): the notice is not raised when the frame arrives, but when a 200 response is handled about 80 ms after it. Candidate (1) is not supported at X5: no error toast and no page error. A second handler that would be consumed first is not what the timing shows, since the notice did not come at frame time. Either way the decision does not move: M2-b's "for every save" fails in about one window run in seven.

*Reconcile, pass 2:* UAT-1 is resolved by the fix the owner chose. Under the exact hash fix (`steering/017-rulings.md` block 2026-11-19T17:49Z, D-33), the producer sends the hash as JSON text and the tab compares exact strings. Code review found the mechanism (CR-20): pusher-js decoded number-shaped hashes such as W3's `6286e037` and X5's `-5e72712` into numbers. Re-walked at `7293a35` below: 0 own-save notices in 16 window and plain runs.

## Pass 2 — re-walk at website `7293a35`, generator `8512a1d`

**Stage start.** Steering's brief by message, 2026-11-19 (18:3xZ): rows B-1 to B-4, B-12, B-13 and B-15, at the plan-level QA Complete SHAs. Re-derived at 18:39Z:
- `qa/017-existing-items-backlog-qa.md`: `Status: QA Complete`, `Verified-At` `7293a35,8512a1d`, last commit `cf69ef1`.
- Shared trees: website `7293a35`, generator `8512a1d`, both on `chain/017-existing-items-backlog`.
- Plan at Revision 11 (`4c8be42`); Revision 11's delta is M2-d's walk wording, which B-15 carries.

Authority for B-15's prediction and instrument: QA's register row B-15 (re-read at this write).

**What moved, and what was re-walked.** `git -C website diff --stat 4b8db9c 7293a35`: the production change is `src/providers/MessageProvider/usePusher.ts` (9 lines) and `src/server/api/utils/shared.ts` (2 lines, the broadcast trigger); the rest is tests.
- Re-walked: every row whose prompt is raised through that path: B-1, B-15 (new), B-12 limb 1 and B-13 limbs 1–3, with the recorder's control re-run.
- Carried from pass 1: B-2 (M3), B-3 and B-12 limb 2 (M4), B-4 (M5/M6) and B-13 limb 4 (a lone dialog). None of their paths changed.
- `shared.ts` runs on every save, so the walk's saves served as B-4's smoke check. The rig log shows 35 preview writes, each followed by the website's list request, and 33 batch deletes (`rig-log-3.jsonl`). Preview handling still runs on every save at the new tip.

**Build**: the same rig and local stack as pass 1. The website export of `7293a35` was built as a **production build** (`next build`, exit 0; `next start -H 127.0.0.1 -p 3000`), with the rig's environment set at build and at start and read back from `/proc/<pid>/environ`. That answers QA's M2 Assumption Not Checked: B-15 ran on a production build. Fresh database from `uat-local-stack.sh up` (`local-stack-up-3.txt`); messages written 900000000000001 and 900000000000002 only, and the count below 900000000000001 was 0 after the first save and at the end of both walks (`walk-7/db-*.txt`, walk 8). Instruments, each saved where it is named:
- `b1-capture-init-2.js`, a copy of walk 6's script that adds the decoded value of each `message-update` frame and every WebSocket's open and close;
- `trigger-bare-frame.mjs`, which sends one bare-data `message-update` on a local id's channel, with credentials read from `.env.local` and never printed;
- `enter-recorder.js`, as in pass 1.

| Flow | Action | Expected | Observed | Result |
|------|--------|----------|----------|--------|
| B-15 run 1 | M1's editor, `__qaDoc = 1`, then in-app to M2: user menu → Servers → My Account → M2's card | 1 Pusher socket at M1; marker kept; 1 open at M2; M1's closed at the switch | 1 open at M1; M1's socket closed 18:46:27.483 on leaving; none opened on `/message` or `/message/f/0`; M2's opened 18:46:32.719; 1 open; `__qaDoc` = 1 (`walk-7/part1-run1-M1-to-M2.json`) | PASS |
| B-15 run 2 | The same, M2 → M1 | As run 1 | M2's socket closed 18:46:47.962; 1 open at M1; marker kept (`part1-run2-M2-to-M1.json`) | PASS |
| B-1 / M2-b | 15 window runs: A saves, name edited 30 ms after, 10 s capture | A never; B every run | A: no notice in 13 valid runs. B: notice in all 13. W2 and W3 were void: the typed word did not land, so A saved only a name change and B, correctly, showed nothing (`walk-7/part2-W*.json`) | PASS |
| B-1 / M2, plain and re-sync | P1–P3, plus 15 re-sync saves of A's pending name edit | A never; B every save | A: none. B: a notice for every save | PASS |
| B-1 frame form (code review Round 9 assumption) | Every captured frame in A and B | Data is JSON text, decoded to the exact string | Every frame `"data":"\"<hash>\""`, decoded `typeof string`, including number-shaped `"-104d3efa"`-style hashes | PASS |
| Bare number-shaped frame (QAF-27 assumption) | `trigger-bare-frame.mjs` with `6286e037`, `12345`, `-5e72712`; A and B with no unsaved edits | Record the decoded type | pusher-js's parse returned `number` 6.286e+40, `number` 12345, `number` -Infinity, in both tabs. Both tabs raised the notice, which is right under M2-c for a broadcast matching neither tab (`walk-7/part3-*.json`) | recorded |
| B-12 limb 1 | Link prompt L open; B saves; one Enter | Focused prompt only | Focus on Reload in U; one Enter ran Reload; L stayed open with focus on Leave Page; Cancel kept the URL (`walk-8/results.md`) | PASS |
| B-13 control C1 | Planted Delete + Reload in one task | min = first − 1 | 8 / 7 / 8 | instrument valid |
| B-13 limbs 1–3 | W, then I, then W with no click, under U; one Enter | Reload only | Fields 8/8/8 in L1 and L3; marker never visible in L2; Reload ran each time; focus a DIV in U for L1 and L2, Reload for L3 | PASS |

Limits of the instruments:
- QAF-27: the decode was observed at pusher-js's own `JSON.parse` call; that the `bind` callback receives the decoded value unchanged is inferred, not instrumented. The notice decision cannot tell it either way, since a string `6286e037` would also differ from both tabs' content. By code review's own "if false" text, the consequence is benign either way.
- Code review Round 10's assumption (`disconnect()` closes the socket in a browser) is discharged by B-15: close events seen, and no socket reopened after the leave.
- Walk 8's per-limb returns were transcribed by hand (`walk-8/results.md`); the run_code sandbox could not write files, and walk 7 used a loopback file sink (`walk-7/sink.mjs`, stopped).
- A helper's shell write of `walk-8/end.txt` was refused by the record-write hook, and the results went through the Write tool instead (a format gate satisfied).

**Observation O-1 (not a row, routed to steering).** During walk 7 the website's D-8 line logged `preview-image-failure id=900000000000001 class=status-500` four times, for four consecutive saves between 18:48:15Z and 18:48:46Z (W2, its re-sync, W3, its re-sync). The generator's class was `error-status`: the website's own `/preview` page answered its page load with an HTTP error status. Saves before (18:48:04) and after (from 18:49) rendered. W2's message data equalled the 18:48:04 save's, and only the name differed, so the cause is not visible here; the data `/preview` received was not captured (`walk-7/preview-failures-website.txt`, `preview-failures-generator.txt`).
- Item 2's value held through it: the stored preview stayed on the last good image.
- `/preview` is unchanged since `1ad625e` (X-22), so this is no delta of 017's. It is a pre-existing surface no 017 criterion covers. The owner's B-6 look and B-10's failure-stack count are the post-deploy instruments that would see it in production.

## Value Delivery Assessment

Against the plan's Value Statement (§ "Value Statement and Business Objective", items 1–5):
- **1, stale not broken previews**: delivered. With the generator down, the list kept the old preview, unbroken, and the save went through. With it up, the new one showed. A new message whose first render failed showed a default image, not a broken one.
- **2, the saving tab is not told about its own save**: delivered at `7293a35`. There were no own-save notices in 16 window and plain runs or in 15 re-sync saves, and the other tab was told every time. At `4b8db9c` it failed about one window run in seven (UAT-1, pass 1), which is the number-shaped hash case the exact hash fix removes. The editor also leaves no extra Pusher connection behind when you switch messages (M2-d, B-15).
- **3, signed-out edits not lost without a warning**: delivered. Drafts survive sign-in, a new tab and the expired-session sign-out. Link prompts now work signed in and signed out, with Cancel and Leave Page behaving.
- **4, hygiene**: no user-visible flow; QA's verdict carries it.
- **5, one Enter answers one dialog**: delivered. Enter in the update prompt runs Reload only, both for the link prompt and for the delete and image dialogs underneath. A lone delete dialog still answers Enter.

No core value is deferred. Known limits: X-14 (unstoppable navigations), X-22 (the `/preview` fallback image, the owner's B-6 look), and the post-deploy rows B-6 to B-11.

## Objective Alignment Assessment
**Does code meet original plan objective?**: YES
**Evidence**: All five value statements behave as stated on a running build at the verified SHAs: items 1, 3 and 5 per pass 1 (their paths unchanged since), and item 2 per pass 2 on a production build of `7293a35`.
**Drift Detected**: none in scope or behaviour. M2-d (closing the editor's Pusher connection) entered by the owner's selection (D-34), not by drift.

## Release Decision
**Final Status**: APPROVED FOR RELEASE
**Identity**: website `7293a35`, generator `8512a1d`. These are the trees QA's plan-level verdict was reached at (`Verified-At`, `cf69ef1`), re-derived from the shared trees at 18:39Z. Any change to production code in either repository expires those verdicts and this one.
**Rationale**: QA is complete at these SHAs. Every pre-release row this stage owns has reached EXECUTED and passed: B-1, B-12 limb 1, B-13 limbs 1–3 and B-15 at `7293a35`; B-2, B-3, B-4, B-12 limb 2 and B-13 limb 4 at `4b8db9c`, whose paths the delta does not touch, with B-4's save path smoke-checked at the new tip. UAT-1's case passes on every run under captures. Post-deploy rows B-6 to B-11 gate nothing here and keep their carriers. O-1 is a pre-existing `/preview` behaviour outside the delta, and item 2's stale-not-broken value held through it.
*Pass 1's decision, NOT APPROVED at `4b8db9c` (2026-11-19T10:29), is expired by the website's move through M2's fix rounds and is kept above as history.*
**Recommended Version**: minor bump for the website (user-visible behaviour: link prompts, draft survival, preview fallback, Enter scoping, the own-save notice); patch for the generator (it writes only a confirmed image and deletes nothing).
**Key Changes for Changelog**:
- Previews keep the last good image when a new one cannot be made, instead of breaking.
- "Message Update Detected" now appears only when another tab or person saved, not for your own save.
- Unsaved message drafts survive sign-in, a second tab and an expired session; links away from an editor with unsaved changes ask first.
- Enter answers only the dialog that holds focus.
- New operator-visible signal: a `preview-image-failure id=<id> class=<class> elapsedMs=<n>` line in the website's function log (stdout) on each failed preview generation (D-8).
- Operator-visible: the editor closes its Pusher connection when you leave or switch messages (M2-d), so Pusher's concurrent-connection count per editing user should drop to one per open editor.

## Next Actions
*Point-in-time list — later stage documents are authoritative on these items' current state.*
- devops: prepare the release at website `7293a35`, generator `8512a1d`. B-6 to B-11 are post-deploy rows with their carriers created at Stage 1.
- O-1 (four `/preview` error-status answers on the local production build, cause not captured) goes to steering for routing. No 017 criterion requires it, so it is a stated limit here; B-6 and B-10 are the post-deploy instruments that would see it in production.
- Pass 1's items on UAT-1 are closed: the fix landed (D-33), and pass 2 re-walked it.

## Stack set up and removed
Set up: exports under this session's scratchpad (`web/`, `gen/`), the rig (`rig-uat.mjs`, ports 39001 and 39002), `next dev` on 127.0.0.1:3000, and container `hooks-postgres-local`. Removed: the rig and `next dev` stopped by SIGINT (no matching process in `ps`; ports 3000, 39001 and 39002 not listening); the container removed by `uat-local-stack.sh down` (`local-stack-down.txt`); both exports deleted. The `.env.local` symlink lived only inside the website export. Walk 6 rebuilt the same stack and removed it the same way (`local-stack-down-2.txt`). Pass 2 set it up a third time with a production server (`next start`) and removed it: rig and server stopped by SIGINT, ports 3000, 39001 and 39002 not listening, no matching process in `ps`, container removed (`local-stack-down-3.txt`), exports deleted. Walk 7's loopback sink on port 39777 was stopped by the helper (no listener, no process).
