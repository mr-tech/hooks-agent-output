---
ID: 016
Origin: 016
UUID: 54673438
Status: UAT Complete
Status-Detail: "APPROVED FOR RELEASE at website 395510e (plan revision 7). Pre-release rows B-1, B-2 and B-5 EXECUTED and PASS. Post-deploy rows B-3, B-4 and B-6 stay open for devops's Stage 1 carrier; their unfixed values are recorded below. UAT-1 LOW (B-6(b)'s readable signature) is routed to devops's carrier and to QA."
Verified-At: "395510e — repos=website; plan revision 7; flows run on a next dev build of a git archive export of 395510e, base control 0e3d903"
Release-Decision: APPROVED FOR RELEASE
---

# UAT Report: Plan 016 — the send check refuses what Discord refuses

**Plan Reference**: `agent-output/planning/016-send-check-validity.md`, `Revision: 7` (record `b10b0f2`; R-16 at `9d5c73b` is a registration, no criterion moved)
**Date**: 2026-11-11
**UAT Agent**: Product Owner (UAT), session `uat-hooks-016`

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-11T14:12 | steering-queue-hooks → uat-hooks-016 (brief `steering/queue-hooks-briefs/uat-016-brief.md`) | UAT on QA Phase 2 PASS at website `395510e` (`qa/016-send-check-validity-qa.md`, `QA Complete`, record `2af91e5`, re-read `500a501`) | Stage start re-derived at the record. B-1, B-2 and B-5 executed on a local build of the tip and PASS. B-3's and B-6(b)'s unfixed values read on production before release. UAT-1 LOW raised. **APPROVED FOR RELEASE**, with B-3, B-4 and B-6 post-deploy. |

## Reading

The brief whole; the plan's Value Statement, Decisions Register, AC1-6, M1b's criteria, M2, M3 and Risks at revision 7; the rulings blocks for selections 14, 17 to 20, 21 and 22, and 23 (`steering/queue-hooks-rulings.md`); the QA document whole (record `500a501`); the implementation document's "User-visible flows" paragraph; the code review's Assumption Not Checked. The flows are the implementer's three (send page and editor refusal; `/preview` and the preview image; the description inputs) and QA's register rows B-1 to B-6. No flow held a decision.

## Flow Execution

**Build**: `next dev --webpack -H 127.0.0.1 -p 3000` from a `git archive 395510e` export, with `node_modules` symlinked and `.env.local` copied in. A second build of `0e3d903` on port 3001 served only as the `/preview` control. The local Postgres came from `tools/uat-local-stack.sh up`: `postgres:16`, 9 tables, at 13:51:16Z. Then, before the first save, at 13:51:25Z, `ALTER SEQUENCE "Messages_id_seq" RESTART WITH 900000000000001` was run with the table at 0 rows. **Id range written: 900000000000001 to 900000000000002.** `PREVIEW_IMAGE_URL` names 127.0.0.1:3002, where nothing listens, so no local save reached a preview generator or the CDN.

The browser was the kept test-account profile. Part A to C went to a browser-walker. After the MCP browser server disconnected, the rest ran through a saved runner on the same profile: `verification/016/uat/kept_profile_run.cjs`, with steps under `steps/`. `/preview` was read by `preview_chrome_read.cjs`, headless Chrome with real CSS. Captures are in `verification/016/uat/`.

| Flow | Action | Expected | Observed | Result |
|------|--------|----------|----------|--------|
| B-1 refusal, editor | New V2 message (My Account), add one Text Display, leave it empty | One line naming the Text Display | "A Text Display is empty." (`walk/a-reads.json`, `a2-empty-textdisplay.png`) | PASS |
| B-1 refusal, send page | Send page of message 900000000000001, temporary test-server webhook **selected** | Line in the preview; Send disabled | Line present, red border, Send `disabled: true` (`walk2/send-gate-results.txt`, `send-gate-refused.png`) | PASS |
| B-1 filled, send page | Same page and webhook, Text Display "hello" | No line; Send enabled | `ERR` [], Send `disabled: false` (same capture, `send-gate-accepted.png`) | PASS |
| B-1 filled, editor | Replace the text with `hello` | Line goes | Line goes on blur. While the field still has focus the line stays (`walk/a-reads.json`) | PASS |
| B-1 send | Send to a bot-created webhook "uat-016" in the test server's `#general` | Success | Toast "Webhook sent!" at 13:58:34Z. Discord holds message `1570075272257081487`, flags 32768, `[(10,'hello')]` (`a8-discord-check.txt`) | PASS |
| B-1 N-2 | Type one space into the empty Text Display, save | Record it | Stored as `{"type": 10, "content": " "}`; the line "A Text Display is empty." shows (`walk2/n2-row.txt`, `walk2/n2_space.json`) | recorded |
| B-1 `/preview` record | `/preview` of the fresh-Text-Display draft | Record, not a pass condition | Tip: no line, no border. Base: the same, since no line existed for it at base (`c-scripted/`) | recorded |
| B-2 Thumbnail | Clipboard paste of 1100 `a` into the Thumbnail description, then End and `b` | 1024, then 1024 | 1024, then 1024 with the last char `a`, by the clipboard route (`walk/b-reads.json`, `b2-thumb.png`) | PASS |
| B-2 gallery item | The same in the gallery item description | 1024, then 1024 | 1024, then 1024 (`walk/b-reads.json`, `b3-gallery-alt.png`) | PASS |
| B-5 fresh Text Display | `/preview` at tip | No `.text-error`, no active `!ring-red-500` | `ERR` [], ring 0 (`c-scripted/preview-chrome-tip.json`) | PASS |
| B-5 41 components | `/preview` at tip; base control | Tip clean; base shows the line | Tip: `ERR` [], ring 0. Base: "Message has 41 components; the limit is 40.", ring 1 (`preview-chrome-base.json`) | PASS |
| B-5 empty username | `/preview` at tip; base control | Tip clean; base shows the line | Tip: `ERR` []. Base: "This username is too short or too long." | PASS |
| B-5 long content and description | `/preview` with content 2100 and an embed description 4097 (QA's revision-4 assumption) | No counter, ring or "Too long." | Tip and base: `ERR` [], ring 0, `TOOLONG` false, `data-erroring-state` 0 | PASS |
| B-5 control | A valid V2 draft, both trees | Nothing | Nothing on either | PASS |
| B-3 unfixed value (production, before release) | hooks.gg, test account's draft 5996, Components V2, edit mode, one empty Text Display (counter "1/40"). No save of that state, no send | Unfixed: no Text Display line | `ERR` [], no ring (`walk-production/prod_b3_unfixed.json`, `prod-b3-unfixed.png`) | recorded |
| B-6(b) unfixed value (production, before release) | The same draft loaded with 41 components, named `uat-016-b6b-41-components` and saved. Its image is read from `/message`: `cdn.hooks.gg/previews/5996/<nonce>.jpeg` | Unfixed: the 41-components line in the image | Editor: "Message has 41 components; the limit is 40.". Image (192×224): **red border visible**, but the text line falls below the crop (`walk-production/b6b-unfixed-preview-5996.jpeg`). See UAT-1 | recorded |

**Instruments seen to discriminate.** The send-gate pair shares one page and one selected webhook. Only the stored text differs, and Send flips from disabled to enabled with it. The `/preview` reader shows the 41-component and username lines on `0e3d903` and none on `395510e`.

**Superseded walk read, disclosed.** The browser-walker's Part C table reported the inverse: lines at tip, none at base. Its reads were hand-transcribed. Its screenshot named `c-41-text-displays-base.png` shows the empty-username draft, so the labels had shifted by one page. The scripted reader above replaces Part C. The walker's Part C files stay in `walk/` as recorded. Its A7 "FAIL as written" was my brief's error: Send also waits for a selected webhook (`allowSave`), which the send-gate pair now controls.

## Value Delivery Assessment

The value statement says a V2 message Discord will refuse is refused on the send page, with a reason that names the part. That is delivered for the case the owner reported. A V2 message with only an empty Text Display now shows "A Text Display is empty." in the editor and on the send page, and Send stays disabled until it is filled. On production today, the same draft shows no line (B-3's unfixed read). The fixed draft sends, and Discord accepts it.

The 1024 cap holds in both description inputs against a real paste. Preview images lose their validation chrome (D-14) for every member exercised in a real browser.

The wider class (L1 to L10, the 52 measured refusals) rests on QA's corpus and placement probe, not on this walk; this walk exercised the emptiness member and the 1024 bound. No core value is deferred.

Known limits, each from the plan: RK-3 (stored `valid` stays stale for older rows), RK-5 (old images keep their chrome until re-saved), RK-4 (the link-button URL marker and the send check can disagree), and X-1 (the generic toast stays, D-12).

## Objective Alignment Assessment

**Does code meet original plan objective?**: YES
**Evidence**: The editor and send page refuse the reported shape, the reason names it, and Send is disabled exactly when it shows (the code review's Assumption Not Checked, closed by the send-gate pair). The cap holds at 1024. `/preview` renders none of the seven chrome members' triggers that were exercised.
**Drift Detected**: None against the objective. One behaviour to note, not drift: the editor's line updates on blur, not per keystroke (B-1 filled, editor).

## Blocking-condition register (consumed from `qa/016-send-check-validity-qa.md`, the authority; re-read at record `500a501`)

| Row | Class | State | Result beside the prediction |
|---|---|---|---|
| B-1 | pre-release | **EXECUTED** 2026-11-11, PASS | Line present and Send disabled; filled: no line, Send enabled, send 200. N-2: a space is stored as `" "` and refused |
| B-2 | pre-release | **EXECUTED** 2026-11-11, PASS | 1024 and 1024 |
| B-5 | pre-release | **EXECUTED** 2026-11-11, PASS | `/preview` `[]` and no border for the three drafts; the base control shows two of them |
| B-3 | post-deploy | open, conditional; carrier is devops's Stage 1 handoff | Unfixed value recorded 2026-11-11T14:07Z: no line (prediction "no line" held). The fixed read follows the deploy |
| B-4 | post-deploy | open, conditional; same carrier | Not read before release (it has no unfixed limb). Locally, the filled V2 message sent (B-1) |
| B-6 | post-deploy | open, conditional; same carrier | (b) unfixed recorded 2026-11-11T14:11Z on message 5996: red border in the image, the text line outside the crop. The member was built as 39 Text Displays plus a Container holding one (41 in all), because the import caps the top-level array at 40. Post-deploy: re-save 5996 and read its new image (UAT-1) |

Rows inherited and not discharged: B-3, B-4, B-6 (post-deploy, by class). No second travelling list was found.

## Findings

UAT-1 LOW — **B-6(b)'s predicted signature, the "Message has 41 components" line, is not in the production preview image; the readable signature is the red border.** The image at `cdn.hooks.gg/previews/5996/7211dcbd1a114090ad1b6ddc132a171d.jpeg` is 192×224. It shows the border around the components and crops the line beneath them. Both are members of M1b's class, so the fixed/unfixed call still decides in one observation, read on the border. Routed to devops's Stage 1 carrier for B-6, by message, so that its executor reads the border. QA owns the register's prediction text. No criterion moves.

## Assumptions read on this pass

- QA's Phase 2 runtime assumption, browser half: in real Chrome, a single space is refused, as Discord does. U+0085 and U+FEFF were not driven in the browser. The deployed Node major remains devops's read.
- QA's webhook-kind assumption (F-11): one accepted V2 message through a bot-created webhook returned success. No refused member was sent through that kind.
- QA's revision-3 assumption, on images: B-5 used real CSS. Whether the image service crops or styles differently is shown by UAT-1 for the unfixed tree. The fixed tree waits for B-6.
- A hydration-mismatch console error appears on `/preview` at both trees (`c-scripted/console-41.txt`). It predates the chain and is not raised here.

## Release Decision

**Final Status**: APPROVED FOR RELEASE
**Rationale**: QA Phase 2 passed at `395510e`, and every pre-release blocking row is EXECUTED and passes in a real browser, with discriminating controls. The post-deploy rows are approved conditionally under their class and gate nothing of the push. The verdict is reached at website `395510e` and plan revision 7. Any change to production code after `395510e` expires QA's verdict and this one. M1 and M1b ship together in one merge (SE-6).
**Recommended Version**: No version artefact (plan M3). As a change it is a patch: a bug fix to the send check, plus a preview-only rendering change.
**Key Changes for Changelog**:
- The send page and editor refuse Components V2 messages Discord refuses, starting with empty Text Displays, and name the failing part ("A Text Display is empty.").
- The Thumbnail and gallery-item description inputs stop at 1024 characters.
- Preview images (`/preview`) no longer show validation error lines or the red border.
- The stored `valid` flag is false for newly saved messages in a refused V2 shape (the public v1 API serves it).

## Next Actions
*Point-in-time list — later stage documents are authoritative on these items' current state.*
- devops: prepare the release; carry B-3, B-4 and B-6 in the Stage 1 handoff, with UAT-1's border reading for B-6(b) and message 5996 as its subject.
- After the deploy, B-3's fixed read closes the emptiness handoff `components-v2-emptiness-not-caught-by-the-send-gate-2026-08-26.md` (plan M3).

## Process facts of this pass

- Set up and removed: the Postgres container (`uat-local-stack.sh down` at the end; `status` reads no container and 5432 free), the two `next dev` processes (killed; ports 3000 and 3001 free), and the two exports under the scratchpad (deleted).
- Test server: webhooks "uat-016" were created by the test bot and deleted three times. The webhook list is `["Spidey Bot"]` before and after, so `test-estate.json` is unchanged. The one sent message was deleted after recording (204).
- Production: the test account's draft 5996 was created on hooks.gg by the server picker and saved once with 41 components. It is kept as B-6's post-deploy subject. Nothing was sent from production.
- Local DB writes beyond the walk: message 900000000000001's Text Display was set to `""`, to `"hello"` and back to `""` by `UPDATE` for the send-gate pair and N-2.
- The kept profile's browser was closed by the runner on every path. The holder read gives no holder, and the caches are emptied.
- Screenshots and images stay uncommitted (CLAUDE.md, Git).
- `walk-brief-production.md` was drafted for a walker and was not run. The production reads ran through the step files under `steps/` instead. `prod_b6b_unfixed.json` records its last run, which stopped at the save button after the editor read. The save had already happened through the name save, as `prod_list_read.json` shows.
