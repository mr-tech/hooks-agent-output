---
ID: 017
Origin: 017
UUID: 5c3e9a71
Status: UAT Failed
Status-Detail: "B-1 FAIL (UAT-1), reproduced: the saving tab raised 'Message Update Detected' for its own save in 2 of 15 further window runs (walk 6), no crash, upsert 200, no error toast in X5; with walk 3's A1, 3 of 21 captured window runs. Routed through steering-roadmap-hooks. B-2, B-3, B-4, B-12, B-13 EXECUTED and passed. Re-decision after a fix and a re-walk."
Verified-At: "4b8db9c,8512a1d — repos=website,preview-image-generator; flows ran against git archive exports of both SHAs with their own installs (website next dev on 127.0.0.1:3000, generator under the M5 rig copy); plan read at Revision 9"
Release-Decision: NOT APPROVED
---

# UAT Report: Plan 017 — the existing-items backlog

**Plan Reference**: `agent-output/planning/017-existing-items-backlog.md` (Revision 9, agent-output `bcc23c6`)
**Date**: 2026-11-19
**UAT Agent**: Product Owner (UAT), session `uat-hooks-017`

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-19T10:29 | steering-roadmap-hooks (brief `steering/backlog-2026-11-18-briefs/uat-hooks-017.md`) | UAT on plan 017 at website `4b8db9c`, generator `8512a1d`; register rows B-1 to B-4, B-12, B-13 | Stage start re-derived: QA document `QA Complete`, `Verified-At` `4b8db9c,8512a1d`, committed at `1a8edce`, effort-final sweep 124 of 140 killed. Both shared trees on `chain/017-existing-items-backlog` at those SHAs. Five browser walks on a local stack. Five rows EXECUTED and passed; B-1 FAIL (UAT-1), routed to the implementer. NOT APPROVED. |
| 2026-11-19T10:52 | implementer-hooks-017 (UAT-1 diagnosis, capture set); steering-roadmap-hooks (re-walk before any code change) | Re-walk B-1's M2-b window with the implementer's capture set | Walk 6 on a rebuilt stack at the same SHAs: the notice recurred in the saving tab in W3 and X5 (2 of 15 window runs), with every upsert 200, no crash or page error, and no error toast at X5. Candidate (1) is not supported at X5, and the crash precursor did not reproduce. In both recurrences the frame preceded the upsert response by 74–85 ms and the notice followed the response by 1–3 ms. Decision unchanged: NOT APPROVED. Stack removed again. |

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
| B-1 | EXECUTED 2026-11-19 (walks 1–4; re-walked in walk 6) — **FAIL** | Tab 2 shows the notice (M2-c holds). Tab 1 raised its own-save notice once in 6 captured runs that hit M2-b's window (walk 3 A1). Walk 1 also saw it once at about 09:23:45Z after a save at 09:22:38Z, but did not capture when it appeared, so that sighting is not weighed. UAT-1. Walk 6 (re-walk with captures): recurred in 2 of 15 window runs (W3, X5), so 3 of 21 captured window runs in all. |
| B-2 | EXECUTED 2026-11-19 | PASS (M3-a, M3-b) |
| B-3 | EXECUTED 2026-11-19 | PASS |
| B-4 | EXECUTED 2026-11-19 | PASS (stale, fresh, and first-failure default) |
| B-12 | EXECUTED 2026-11-19 | PASS (limbs 1 and 2) |
| B-13 | EXECUTED 2026-11-19 | PASS (limbs 1–4; limbs 1–2 read by the recorder after its controls) |

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

## Value Delivery Assessment

Against the plan's Value Statement (§ "Value Statement and Business Objective", items 1–5):
- **1, stale not broken previews**: delivered. With the generator down, the list kept the old preview, unbroken, and the save went through. With it up, the new one showed. A new message whose first render failed showed a default image, not a broken one.
- **2, the saving tab is not told about its own save**: largely delivered, not shown. The cross-tab notice is kept, and ordinary saves never raised it in the saving tab. One captured own-save notice in the in-flight window remains unexplained (UAT-1).
- **3, signed-out edits not lost without a warning**: delivered. Drafts survive sign-in, a new tab and the expired-session sign-out. Link prompts now work signed in and signed out, with Cancel and Leave Page behaving.
- **4, hygiene**: no user-visible flow; QA's verdict carries it.
- **5, one Enter answers one dialog**: delivered. Enter in the update prompt runs Reload only, both for the link prompt and for the delete and image dialogs underneath. A lone delete dialog still answers Enter.

No core value is deferred. Known limits: X-14 (unstoppable navigations), X-22 (the `/preview` fallback image, the owner's B-6 look), and the post-deploy rows B-6 to B-11.

## Objective Alignment Assessment
**Does code meet original plan objective?**: PARTIAL
**Evidence**: Items 1, 3 and 5 behave as stated on a running build at the verified SHAs. Item 2's cross-tab half holds; its own-tab half failed once in its distinguishing window (UAT-1).
**Drift Detected**: none in scope or behaviour. The difference is a single defect observation against M2-b, not a divergence from the objective.

## Release Decision
**Final Status**: NOT APPROVED
**Rationale**: QA is complete and five of six pre-release rows pass. B-1 failed once in the case that distinguishes the fix. A FAIL on a blocking row routes to the implementer and is not weighed away by later clean runs, because "for every save" is M2-b's claim. The decision is re-taken on the implementer's diagnosis: a fix (which expires this verdict and its predecessors at `4b8db9c`), or a demonstration that A1 arose from a state outside the class, such as the helper's synthetic-event crash, re-walked here.
**Recommended Version**: minor bump for the website (user-visible behaviour: link prompts, draft survival, preview fallback, Enter scoping); patch for the generator (it writes only a confirmed image and deletes nothing). This applies when approved.
**Key Changes for Changelog**:
- Previews keep the last good image when a new one cannot be made, instead of breaking.
- "Message Update Detected" is meant for other tabs' saves, not your own (pending UAT-1).
- Unsaved message drafts survive sign-in, a second tab and an expired session; links away from an editor with unsaved changes ask first.
- Enter answers only the dialog that holds focus.
- New operator-visible signal: a `preview-image-failure id=<id> class=<class> elapsedMs=<n>` line in the website's function log (stdout) on each failed preview generation (D-8).

## Next Actions
*Point-in-time list — later stage documents are authoritative on these items' current state.*
- implementer: diagnose UAT-1 with the captures named above; then UAT re-walks B-1's window.
- (walk 6) UAT-1 is reproduced with captures; it goes to the implementer through steering-roadmap-hooks (steering's routing, 10:3xZ). A fix moves the website tip and expires review, QA and this verdict at `4b8db9c`; UAT then re-walks B-1 with `b1-capture-init.js`.
- devops: not before a UAT approval. The post-deploy rows B-6 to B-11 keep their carriers.

## Stack set up and removed
Set up: exports under this session's scratchpad (`web/`, `gen/`), the rig (`rig-uat.mjs`, ports 39001 and 39002), `next dev` on 127.0.0.1:3000, and container `hooks-postgres-local`. Removed: the rig and `next dev` stopped by SIGINT (no matching process in `ps`; ports 3000, 39001 and 39002 not listening); the container removed by `uat-local-stack.sh down` (`local-stack-down.txt`); both exports deleted. The `.env.local` symlink lived only inside the website export.
