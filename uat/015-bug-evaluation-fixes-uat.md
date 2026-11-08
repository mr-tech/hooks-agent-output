---
ID: 015
Origin: 015
UUID: 861e5f61
Status: UAT Complete
Status-Detail: "Conditional approval. B-2, B-4, B-5, B-11 (send-page leg), B-12, B-13 and B-14 EXECUTED PASS at website b96e364, each red at base 7ce866b. B-1 waits for the owner's account. B-9, B-10 and the B-11 dialog leg need a new route: the New Message dialog opens on production but not locally, under next dev or a next start build (UAT-4). These must reach a terminal state before the website merge to master. Owner's route pending (steering-hooks-015, 20:34Z)."
Verified-At: "b96e364,8de2b53 — repos=website,preview-image-generator; flows driven on website b96e364 (base 7ce866b as the red side); generator 8de2b53 not driven (no browser surface; B-8 post-deploy)"
Release-Decision: APPROVED FOR RELEASE
---

# UAT Report: Plan 015 — Bug-evaluation fixes

**Plan Reference**: `agent-output/planning/015-bug-evaluation-fixes.md` (Revision 28, read at agent-output `a1df8c7`)
**Date**: 2026-11-08
**UAT Agent**: Product Owner (UAT), uat-hooks-015

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-08T15:17 | steering-hooks-015 (brief `brief-uat-hooks-015.md`; rulings 14:44Z) | UAT on the QA effort-final PASS at website `b96e364`, generator `8de2b53` | Ran the no-sign-in rows and flows in the stage browser, tip against base. B-4, B-5, B-11 (send-page leg), B-12 and B-13 EXECUTED PASS. The signed-in rows are blocked by UAT-1 (no Postgres at 127.0.0.1:5432), escalated to steering 14:5xZ. Decision: APPROVED FOR RELEASE, conditional on those rows before the merge. |
| 2026-11-08T20:01 | steering-hooks-015 (owner's ruling on UAT-1, route (a), steering/015-rulings.md 5d29306; coordinator goes 19:48Z, 19:49Z) | Recreate the local Postgres and run the signed-in rows | `hooks-postgres-local` is recreated (left running). B-2 EXECUTED PASS (base red). B-1 and B-14 cannot run with the test account. B-9, B-10 and the B-11 dialog leg are blocked by UAT-4, a pre-existing dialog fault. Owner questions sent at 20:01Z. Decision unchanged, now conditional on B-1, B-9, B-10, B-14 and the B-11 dialog leg. |
| 2026-11-08T20:35 | steering-hooks-015 (owner rulings 20:08Z ff6a1a7, 20:12Z 29eee04; coordinator go ~20:10Z) | B-14 on a test server; the live Upload Message check | B-14 EXECUTED PASS (base red), on the existing "Claude" server with the bot added (owner solved the hCaptcha) and one webhook. The Upload Message dialog opens on production hooks.gg, so UAT-4 is reclassified as local-only. B-9, B-10 and the B-11 dialog leg need a route (asked 20:34Z). Released 20:34Z. |
| 2026-11-08T20:42 | steering-hooks-015 (owner ruling 20:38Z c68e0b7; coordinator go 20:38Z) | Route (a): B-9 and the B-11 dialog leg on a local production build | The build passes, but the dialog does not open under `next start` either, so B-9 and the B-11 dialog leg stay NOT EXECUTED. Route returned to the owner (20:41Z). Local-infra evaluation added (§ Local test infrastructure). Released 20:41Z. |

## Stage start and identity

- **Stage start.** QA effort-final `qa/015-bug-evaluation-fixes-effort-final-qa.md` at agent-output `3cab676`: `Status: QA Complete`, `Verified-At: "b96e364,8de2b53 …"` (read at write time). The plan is at `Status: QA Complete`, Revision 28 (91c714d). The brief came from steering-hooks-015.
- **Trees, re-derived.** At 14:44Z, `git rev-parse --short HEAD` gives website `b96e364` and preview-image-generator `8de2b53`, both on `chain/015-bug-evaluation-fixes`, and `git status --porcelain` gives 0 lines in each. `git cat-file -e <sha>^{commit}` succeeds for both. The flows ran against a `git archive b96e364` export, so the tree is the commit.
- **Expiry.** Code review's APPROVED (website `b96e364`, c878f4a), QA's PASS (b96e364, 8de2b53) and this decision all bind to those two SHAs. Any change to production code in either repository expires all three.
- **Plan revision.** This verdict read rev 28 (2a4533b; Status write 91c714d). A later revision expires it only where the delta changes a criterion, milestone or release condition verified here. *2026-11-08T20:52:* rev 29 (fba82bf, D38: `.env.local` is not the live database) moves no criterion. QA's register change 6ae61a2 (read): I-10 is re-specified; the live-schema Assumption Not Checked moves from B-1/B-2 to B-7; and B-1 and B-2 are unchanged, since their predictions hold on any Postgres. So this verdict stands. B-2's PASS on `hooks-postgres-local` shows the Prisma schema, not the live one; the live schema is B-7's, post-deploy.

## Flow Execution

**Build**: `next dev --webpack -H 127.0.0.1 -p 3000` from `git archive` exports of website `b96e364` (tip) and `7ce866b` (base), with `.env.local` copied in. The Playwright MCP Chrome ran on the kept profile under steering-coordinator's go (14:45Z), released 15:16Z. Scripts, raw results, screenshots and server logs are in `verification/015/uat/` (README there). **Degrade:** the site's Discord sign-in failed (`error=Callback`; next-auth `getUserByAccount` ECONNREFUSED 127.0.0.1:5432). So every flow that needs a session is unexecuted, and those flows are listed below as such (UAT-1). Nothing was saved and nothing was sent (E-9).

The flows are the implementer's per-flow tables (M2, M4, M5, M6 implementation documents) plus QA's register rows. Each PASS below was red at base on the same script, unless the row says otherwise.

| Flow | Action | Expected | Observed | Result |
|------|--------|----------|----------|--------|
| B-12 / M5-h bad preview data | `/preview` with `{"embeds":""}`, non-JSON, `5`, `null`, `{"embeds":[{"fields":""}]}`, and `{"embeds":[[]]}` | One red "Invalid message data." and no editor; `[[]]` shows the editor | As expected at the tip. Base: page errors on four cases and no line on any | PASS |
| B-13 / M5-a JSON dialog after Load | Load 39 components, confirm, reopen, Esc; reopen, click outside. Control: cancelled Load, then Esc | Closes on Esc and on outside click | Closes on both at the tip. Base: stays open on both. Control closes at both | PASS |
| B-4 / M6-l over 40 | At 39 text displays, Add Component → Section; Send page; `/preview`. Control 37+Section | Add completes; line names the total; red line and border in all three places; Send disabled; none at 40 | Add completes, total 42 (Section = 3). "Message has 42 components; the limit is 40." with red border in editor, Send page, `/preview`; Add Component hidden; Send disabled. None at 40. Base: no line | PASS |
| B-5 / M6-a code block | `/preview` two-line fence in content and in an embed field | Renders as a block | `pre` block in both. Base: no `pre` | PASS |
| B-11 / M4-d send-page leg | Send page, network cut, webhook URL typed; network restored, same URL | "Invalid URL" offline; existing refusal online | "Invalid URL" both. Base: no text either way | PASS |
| B-11 / M4-d dialog leg | New Message dialog, same act | "Invalid URL" | Not run: the dialog needs a session (UAT-1) | NOT EXECUTED |
| B-1 / M1-a no-admin message list | `/message` signed in, base and tip | Base fails; tip lists messages | Not run: no session (UAT-1) | NOT EXECUTED |
| B-2 / M2-a black embed save | Pick black, save, reload | Saves; black persists | Render half: `color: 0` draws a black bar (base: default grey). Save and reload not run (UAT-1) | NOT EXECUTED |
| B-9 / M4-d discordapp.com link | New Message bot load, discordapp.com link vs discord.com control | One `getFromUrl` request each | Not run (UAT-1) | NOT EXECUTED |
| B-10 / M4-d cross-server rider | Bot load of a link from a non-admin server | Refused, no content | Not run (UAT-1) | NOT EXECUTED |
| B-14 / M5-i first-visit tab | Guild send page, first visit | Opens on the guild's webhooks | Not run (UAT-1) | NOT EXECUTED |
| M2 limits | JSON dialog Load at author 256/257, title 256/257, footer 2048/2049 | Conforms at 256/256/2048, not one over | Load enabled at 256/256/2048, disabled at 257/257/2049. Base: footer 2048 refused (discriminates); author and title the same as base | PASS (footer); author and title not discriminated |
| M2 error texts | "Name is too long." over 256, "Title is too long." | Text shown | Not driven: the JSON dialog refuses an over-limit load, and typing into the fields was not driven | UNVERIFIED |
| M6-b image URL | Image dialog: `.jpeg`, `.webp`, `A.PNG`, `?x=1`; `a.png.html`, `.avif` | First four accepted, last two "Invalid url." | As expected. Base: `.jpeg`, `.webp` and `A.PNG` refused, `a.png.html` accepted | PASS |
| M6-c empty embed | `/preview` `{"embeds":[{}]}` | Not drawn | 4×0 px. Base: 32×24 px box | PASS |
| M6-f picker | Embed colours 0 and 0x00ff00 | Opens on `#000000` and `#00FF00` | As expected. Base: `255` for 0x00ff00 (discriminates); black the same as base | PASS |
| M6-g emoji | 👍🏽 and 👨‍👩‍👧 in content | One emoji each | One image each, at both tip and base: the read does not discriminate | UNVERIFIED |
| M5 Copy on a non-conforming draft | JSON dialog with an over-40 message | Copy disabled | Disabled (observed during B-4; not run at base) | PASS (tip only) |
| M4 Send pending, thread Clear, message id/link box, network-failure text | Send page with a webhook | As the M4 table | Not run: no session and no webhook; Send is never pressed (E-9) | UNVERIFIED |
| M5 Save As, Today labels, delete failure, guild dropdown, update prompt | Signed-in pages | As the M5 table | Not run (UAT-1) | UNVERIFIED |
| M6 duplicate placement, field timestamp edit | Editor menus | As the M6 table | Not driven this pass | UNVERIFIED |

**Second walk, 2026-11-08T19:49–20:01Z (route (a)).** The local Postgres is recreated: `postgres:16` container `hooks-postgres-local` on 127.0.0.1:5432, credentials from the unchanged `.env.local`, and `prisma db push --skip-generate` of `project-utils/prisma/schema.prisma` (9 tables). The test account signed in through Discord OAuth (consent page, Authorize). The walks wrote rows only to the local DB: the test account's Users and Accounts rows, and messages 1–4. Nothing was sent. `PREVIEW_IMAGE_URL` is 127.0.0.1:3002, where nothing listens, so the saves reached no preview generator and wrote nothing to the CDN. Scripts: `b01-signin-message-list.js`, `b14-first-visit-tab.js` and `newmessage-dialog-open.js`, in `verification/015/uat/`.

| Flow | Action | Expected | Observed | Result |
|------|--------|----------|----------|--------|
| B-2 / M2-a black embed save | Editor, picker → `#000000`, File → Save as… → My Account, reload | Saves; black persists | Saved (`message.upsert` 200, message 1). After reload: bar rgb(0,0,0), picker `#000000`, and the DB stores `embeds[0].color` = 0. Base `7ce866b`: the same save is refused, 400 "Number must be greater than 0" on `embeds[0].color` | PASS |
| B-1 / M1-a no-admin message list | Precondition read: the test account's server list | An account that administers no server | It administers three (AAAA…, Claude, statbot-065-install-test). The list loads at base and tip for this account, which says nothing for B-1 | NOT EXECUTED (precondition) |
| B-14 / M5-i first-visit tab | Saved to Claude and to statbot-065-install-test; each send page opened fresh | A guild with the bot and webhooks | Both show "The Hooks.gg bot is not in this server". AAAA… cannot be saved to (UAT-5) | NOT EXECUTED (precondition) |
| B-9, B-10, B-11 dialog leg | Account folder → "new message" → "Upload Message" (opens NewMessageModal) | The dialog opens | Nothing opens, by click, raw pointer press or Enter, with no console error. The same at base `7ce866b` (UAT-4) | NOT EXECUTED (blocked) |
| M5 Save As server list | Save As → Save To dropdown | Lists the session's servers | My Account plus the three servers (tip) | PASS (tip only) |

**Third walk, 2026-11-08T20:10–20:34Z** (owner rulings 20:08Z and 20:12Z). Scripts: `b14-fresh-message.js` and `hooksgg-upload-dialog-live.js`.

| Flow | Action | Expected | Observed | Result |
|------|--------|----------|----------|--------|
| B-14 / M5-i first-visit tab | Route: the existing "Claude" server (the owner's "use the test server"; no new server). Added the Hooks.gg bot (Discord bot-authorize page; the owner solved its hCaptcha, alerted 20:11Z, resolved ~20:30Z) and one webhook ("Spidey Bot", #general; nothing posted). Save As a never-visited copy to Claude, open its send page in a fresh tab, read the panels for 9 s | The guild's webhook panel opens | Tip (message 6): Claude=expanded, Custom Webhook=collapsed, in all 6 samples. Base (message 5): Custom Webhook=expanded, Claude=collapsed | PASS |
| UAT-4 live check | Production hooks.gg, test account signed in live (ruling 20:12Z), "new message" → "Upload Message" | Does the dialog open? | It opens: "Create or upload a new message", with Message Link, URL (Requires bot.), Webhook, Message Context Command, JSON and Continue (`hooksgg-upload-dialog.png`). Nothing saved | local-only fault |

**Fourth walk, 2026-11-08T20:38–20:41Z** (owner ruling 20:38Z, c68e0b7: route (a), a local production build). The tip export was built with `next build --webpack` (exit 0, `build-b96e364.txt`) and served with `next start` on 127.0.0.1:3000 (`server-b96e364-start.txt`), with the test account signed in. "new message" → "Upload Message" opens nothing, by Playwright click, by a click in a fresh tab, and by a DOM `click()` after dismissing the cookie banner. "Create or upload a new message" appears nowhere in the DOM, and no console error shows other than Vercel speed-insights 404s (`newmessage-dialog-prodbuild.js`). So the local fault is not dev-mode. Its cause was not established, by time-box. B-9 and the B-11 dialog leg stay NOT EXECUTED, and the route goes back to the owner (20:41Z).

Instrument note: `b14-first-visit-tab.js` on message 2, a message visited before, showed the webhook panel at **both** trees, so it does not discriminate and is not evidence. The fresh-message form is the one reported. Base's first fresh attempt copied message 1, whose black colour base refuses, so no message was created; it was re-run from message 4.

Every UNVERIFIED row above has suite coverage, by QA's effort-final PASS, which is QA's to restate, not mine. None is a register row.

## Blocking-condition register (QA's register, `qa/015-bug-evaluation-fixes-qa.md` § Blocking-condition register; states as of 20:01Z)

| Row | Class | State | Result / carrier |
|---|---|---|---|
| B-1 M1-a no-admin list | pre-release | NOT EXECUTED | The test account administers three servers (second walk), so the primary's subject is unavailable. Fallback owner: the owner, with an account that administers no server (Validation limb 1 already names him). Asked 20:01Z |
| B-2 M2-a black save | pre-release | EXECUTED 2026-11-08 PASS | second walk: saved, black after reload, DB `color` 0. Base refused |
| B-3 M3 | — | WITHDRAWN | rev 21, D30; the owner's ruling 07:26Z |
| B-4 M6-l over 40 | pre-release | EXECUTED 2026-11-08 PASS | above. The total is 42, not 41; the prediction admits "or the actual total" |
| B-5 M6-a code block | pre-release | EXECUTED 2026-11-08 PASS | above |
| B-9, B-10 | pre-release | NOT EXECUTED | The dialog opens on production but not locally, under `next dev` or a `next start` build (UAT-4; third and fourth walks). Route (a) was tried and failed (20:41Z). Options back to the owner: post-deploy on hooks.gg, his walk, or an investigation of the local cause. B-10 also waits for his server name (ruling 20:38Z) |
| B-14 | pre-release | EXECUTED 2026-11-08 PASS | third walk: tip opens the guild's webhook panel; base opens Custom Webhook |
| B-11 M4-d offline URL | pre-release | send-page leg EXECUTED PASS; dialog leg NOT EXECUTED | dialog leg: as B-9 (UAT-4) |
| B-12 M5-h | pre-release | EXECUTED 2026-11-08 PASS | above |
| B-13 M5-a | pre-release | EXECUTED 2026-11-08 PASS | above |
| B-6 M7-a Get Message | post-deploy | open, conditional | devops Stage 1 handoff; after `push-commands` |
| B-7 M1-a in production | post-deploy | open, conditional | devops Stage 1 handoff |
| B-8 M8-a drain + rev-28 D36 line | post-deploy | open, conditional | devops, same read session as stop (2) |
| B-15 CR-34 PM2 error-log check (minted here) | post-deploy | SUPERSEDED | by B-8's rev-28 limb: the same line (`generic-pool no longer exposes _waitingClientsQueue.dequeue`), the same log, the same reader (devops, `claude-ro`), predicted 0. Its operator signal is in Key Changes below |

Inherited and not discharged by this pass: B-1, B-9, B-10, B-14, the B-11 dialog leg, and B-6, B-7, B-8.

QA's handed observation (effort-final § Assumption Not Checked, `getCDNUrl` / `NEXT_PUBLIC_CDN_PORT`): the first walk did not observe it, because no page built a CDN URL. *Update 2026-11-08T20:01:* in the second walk, the message list built preview URLs of the form `https://cdn.hooks.gg/dev/previews/<id>/<nonce>.jpeg`, with no port. `NEXT_PUBLIC_CDN_PORT` is absent from `.env.local`. This shows the unset case only. QA's falsity signature ("no port when the variable is set") needs the variable set, and that case was not exercised. It stays an Assumption Not Checked for whoever sets the variable.

Code review's Assumption Not Checked (CR-38 sub-entry: an `autoFocus` button under a screen reader's virtual cursor is focused after transitions): **unverified.** No screen reader is available on this machine. No criterion requires it, so it is a stated limit, owned by code review's Assumption Not Checked.

## Local test infrastructure (owner's standing ruling, 20:38Z: tell him after, evaluate permanence, clean up)

**Set up on this box by this stage:**
- `postgres:16` container `hooks-postgres-local` on 127.0.0.1:5432, with the schema from `project-utils/prisma/schema.prisma`. Local test data: the test account's Users and Accounts rows, and messages 1–6.
- Production build output in the scratch export `web-b96e364/.next`.
- On Discord: the Hooks.gg bot in the test account's "Claude" server, and webhook "Spidey Bot" in #general.

**Cleanup:** deferred until B-1 and B-10 close, because both need the DB, and B-10 may need the "Claude" setup as a control. Then:
- the container is stopped and removed, and the image may stay;
- the scratch exports are deleted;
- the bot and webhook stay or go on the owner's word, since they're on his test server.

**Evaluation, for the retrospective.** Yes, make it permanent. This chain lost about an hour to a premise ("`.env.local` is the live DB") that had silently gone stale. A record tool such as `tools/uat-local-stack.sh up|down|status` would take that hour back. It would start or reuse the container from `.env.local`'s URL without printing it, push the schema with `--skip-generate`, report table counts, and tear down. It should pair with a readiness check UAT runs first (a `pg_isready` on the URL's port). The unknown local fault behind UAT-4 argues for one more permanent item: a Vercel preview deploy of the chain branch as the walk surface. That is the plan's own named alternative; it would point at production data and needs the owner's say.

## Value Delivery Assessment

The Value Statement (plan § Value Statement and Business Objective) names five user outcomes:
- **A multi-line code block renders:** delivered (B-5, seen red at base).
- **A Cancel key press never deletes:** already true before the chain (D30, Chrome read `8996505`), carried as such.
- **A black embed saves:** delivered (B-2, second walk; refused at base).
- **A user who administers no server can open the message list:** unexecuted (B-1). It is a server-side SQL fix with no browser-free surface.
- **A moderator with Manage Server sees *Get Message*:** post-deploy by construction (B-6).

The wider "what I build is what previews" promise is borne out on every surface I could drive: the over-40 line, the `/preview` crash set, the JSON dialog, image URL acceptance, the picker and empty embeds. No core value is deferred by the plan. One named outcome (B-1) is not yet shown in a running build, and one (B-6) is post-deploy by construction.

## Objective Alignment Assessment

**Does code meet original plan objective?**: PARTIAL. Every outcome observed so far matches; the signed-in outcomes are unobserved, not failed.
**Evidence**: the table above. Each PASS has a base-red read on the same script, except M5 Copy (tip only).
**Drift Detected**: none against the objective. One wording gap: the M6 implementation table says "41 in all" for 39 + Section, but a default Section adds 3, so the total is 42 (UAT-2).

## Findings

UAT-1 MEDIUM — The plan's Validation premise "`.env.local`, whose database is the live one" is false at 2026-11-08. The only selectable `DATABASE_URL` points at 127.0.0.1:5432, the local stack the owner ruled "stay local" (`steering/014-rulings.md`, 2026-08-27). Nothing listens there, and `docker ps -a` lists no containers, so `hooks-postgres-local` (`uat/closed/014-test-suite-cleanup-uat.md`:428) is gone. Every signed-in pre-release row is blocked. Routed: environment choice to the owner via steering-hooks-015 (owner-needing, sent 14:5xZ); the Validation text to the planner through `INBOX.md` (entry "2026-11-08 — uat-hooks-015 — FYI"). *Environment limb resolved 2026-11-08T20:01:* the owner chose route (a) (steering/015-rulings.md, 5d29306), and `hooks-postgres-local` is recreated and running. The Validation-text limb stays with the planner.
UAT-2 INFO — The implementation document's M6 flow line "At 39, adding a Section completes (41 in all)" understates the total, which is 42. The product text shows the actual total, as the criterion allows. No action beyond the record.
UAT-4 MEDIUM — On the account folder page, "new message" → "Upload Message" opens nothing. That item's handler opens NewMessageModal, the surface of B-9, B-10 and the B-11 dialog leg. It fails by click, raw pointer press and Enter, with no console error, at website `b96e364` and equally at `7ce866b` (`verification/015/uat/newmessage-dialog-open.js`). So it predates the chain and is not its regression. Not established: whether it is a `next dev` artefact or a live production defect. Routed: the owner (via steering-hooks-015, 20:01Z), asked whether it opens on production. A pre-existing production defect becomes a handoff, minted once he answers. *Reconciled 2026-11-08T20:35:* it opens on production hooks.gg (third walk), so the fault is local and not a product defect. *Reconciled 2026-11-08T20:41:* it also fails under a local `next start` production build, so it is not dev-mode. The local cause is unknown. "Production runs `7ce866b`" is the brief's and steering's reading of `master`; I did not read Vercel's deployed SHA. No handoff. Severity stays MEDIUM, as a block on three register rows' route, not as a defect.
UAT-5 INFO — Save As to the test account's server named "AAAA…" (32 'A's) is refused with 400 `invalid_string` on `message.guildId`, at both trees. That server also has no folder link in the server list. Pre-existing, not a criterion. Recorded only.
UAT-3 INFO — A React hydration-mismatch console error shows on first load of the editor in `next dev` at the tip (dev overlay "1 Issue"). Not compared at base and not a criterion. Recorded only.

## Release Decision

**Final Status**: APPROVED FOR RELEASE, conditional on the execution of B-1, B-9, B-10 and the B-11 dialog leg (*2026-11-08T20:35:* B-14 EXECUTED PASS, third walk). If any of these fail, return to the implementer before release. Website pushes to `master` deploy to Vercel production, so these rows precede the merge. *Reconciled 2026-11-08T20:01:* B-2 left the list (EXECUTED PASS, second walk), and the owners moved. B-1 and B-14 are the owner's walk: the test account lacks the subject. B-9, B-10 and the B-11 dialog leg are the owner's walk if the dialog opens on production; otherwise they await his ruling (UAT-4). Target state for each: EXECUTED; WITHDRAWN only on his ruling. B-6, B-7 and B-8 are post-deploy, approved conditionally, and gate nothing of the release act. Their carrier is devops's Stage 1 handoff.
**Rationale**: QA's effort-final PASS (suite 1130/1130, exit 0) plus five register rows executed in a real browser, each seen red at base. No observed FAIL. The unexecuted rows are environment-blocked, not failing. The conditional form keeps them gating.
**Recommended Version**: patch for website and preview-image-generator. Defect fixes only, plus behaviour the owner chose to widen (discordapp.com links) or to refuse (over-40 messages, bad preview data). Neither repository carries a version the release bumps; deploy consequence: devops's to establish.
**Key Changes for Changelog**:
- Messages over 40 components can be built, but show "Message has N components; the limit is 40." and cannot be sent.
- Bad `/preview` links show "Invalid message data." instead of crashing.
- Multi-line code blocks render as blocks; empty embeds are no longer drawn.
- Black embeds keep their colour. The embed footer limit is 2048, and the author name limit is 256.
- The image URL check accepts .jpeg, .webp, upper case and query strings, and refuses .avif and look-alikes.
- The JSON dialog closes on Esc and outside click after a Load.
- discordapp.com message links load.
- Users with no server can open their message list; moderators with Manage Server get *Get Message* (after `push-commands`).
- The preview generator drains in-flight renders before a stop.
- Operator signal (B-8, B-15; channel: the generator's PM2 **error log** on the generator host): the line `generic-pool no longer exposes _waitingClientsQueue.dequeue` means the pool's failure handler is detached. From then on, a Chromium launch failure leaves requests hanging and floods that log (measured locally at about 36,000 lines/s, CR-34).

## Next Actions
*Point-in-time list — later stage documents are authoritative on these items' current state.*
- ~~Owner: choose the route for the signed-in rows~~ — answered: route (a), 5d29306.
- ~~Owner (asked 20:01Z): B-1 account; B-14 guild; Upload Message on production~~ — answered 20:08Z and 20:12Z. B-14 and the live check are done.
- Owner (via steering-hooks-015): supply the account for B-1; name the B-10 server. *2026-11-08T20:45:* the route for B-9, B-10 and the B-11 dialog leg is answered, "find the cause first" (015-rulings.md 20:44Z, d0c8ab9). The planner commissions an analyst on the local dialog fault (UAT-4), and uat retries all three once the cause is found. The local stack stays up until B-1 closes.
- Profile state left by the third walk: the test account's hooks.gg production session (3 cookies), from the ruled live sign-in. On Discord: the Hooks.gg bot added to the "Claude" server, and webhook "Spidey Bot" in #general. Both stay for the condition rows.
- uat: record his results here as they come, before the website merge.
- devops: release per M9 once the condition is met; carry B-6, B-7 and B-8 (with B-15's signal) in the Stage 1 handoff.
- planner: UAT-1's Validation text (`INBOX.md`, uat-hooks-015 entry).

Delivery note: no devops session for chain 015 existed at 15:2xZ (ListAgents), so this report is lodged here. A spawn cue naming this document went to steering-hooks-015. The `b96e364` export stays in uat-hooks-015's scratchpad (`web-b96e364/`) for the condition rows' re-run; the `7ce866b` export is deleted. *2026-11-08T20:01:* it was re-created for the second walk's base legs, and stays with the tip export until the condition rows close.
