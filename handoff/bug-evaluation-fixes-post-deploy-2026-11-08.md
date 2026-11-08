---
UUID: 84b2872f
Status: Open
Status-Detail: "Carries chain 015's post-deploy rows past the Stage 1 commit. B-8 EXECUTED PASS 2026-11-08T22:05Z (deployment/015-bug-evaluation-fixes-deployment.md). B-7 EXECUTED PASS 2026-11-08T22:38Z (uat, account 2 on hooks.gg). B-6 is open: the website deployed on the push at 21:38:22Z (b96e364); B-6 waits on the owner's push-commands. The live-schema residual is discharged for the list read only; the save leg stays a stated limit."
Owning-Stage: uat for B-6 and B-7 (the owner is the fallback subject); devops for B-8 (its reader, in the same session as the prod.yml re-run)
Review-Trigger: B-6 - when the owner reports push-commands run after the chain-015 website release; B-7 - when the owner sanctions a production sign-in of the second test account (or runs the list check himself)
---

# Post-deploy checks: chain 015 (bug-evaluation fixes)

## What is seeded

Chain 015 ships website (Vercel, on a push to `master`) and preview-image-generator (`prod.yml`, on a push to `prod`). Three rows of the chain's blocking-condition register can only be decided after those deploys. This handoff carries them in full; the register is `qa/015-bug-evaluation-fixes-qa.md` § Blocking-condition register (rows B-6, B-7, B-8), and the UAT document's copy of those rows says the same. None of the three gates the release act or the chain's closure. Release tips: website `b96e364`, preview-image-generator `8de2b53`; the merge SHAs are named in `deployment/015-bug-evaluation-fixes-deployment.md` once Stage 2 runs.

## B-6: a Manage Server member sees Get Message (M7-a, limb 2)

- **Condition.** After the owner's `push-commands` following the website release, a member holding Manage Server and not Administrator sees *Get Message* in a message's context menu.
- **Instrument.** The Discord web client in the stage browser, on a message's context menu, as the test account.
- **Subject and fallback.** The test account, if it is such a member in a guild that has the bot. Its role is read first. If it is not such a member, the owner does one Discord check, attested with a time. Account 2 (`discord_test_user_2`) holds neither permission in "Claude" at the tip (UAT, fifth walk), so it is not the subject.
- **Earliest decidable.** `push-commands` has run (owner step) and Discord's command cache has refreshed.
- **Predicted value.** Visible. Absent refutes D4's fix; the Discord semantics are inferred from the research, not executed.
- **Failure mode.** Moderators still cannot use Get Message.

## B-7: M1-a in production, and the live-schema residual

- **Condition.** An account that administers no server opens the message list on production and it loads. This is B-1 repeated on production after the Vercel deploy.
- **Instrument.** The stage browser on production hooks.gg, as an account that administers no server.
- **Subject.** Account 2 (`discord_test_user_2`; its own Chrome profile is `/home/dev/.cache/discord-test-user-2-chrome`). Signing in on production writes that account's Users, Accounts and Sessions rows to the production database. The owner's sanction of 2026-11-08T20:12Z covered the first test account, not this one, so the session that runs the check puts that sanction to him first. The fallback is the owner opening the list with such an account.
- **Earliest decidable.** Vercel reports the production deployment of the merge SHA as live.
- **Predicted value.** The list loads. (At base `7ce866b` the site lists a phantom server named `AAAA…` for an account that administers none, UAT-6; whether production users see it today is unestablished. If production shows it, its absence after this deploy is a user-visible change, and the release-notes line says so.)
- **Failure mode.** The production list errors.
- **Residual carried here: the live-schema Assumption Not Checked** (QA, `qa/015-bug-evaluation-fixes-qa.md`, the block before the Rev 19 pass; re-routed to B-7 at agent-output `6ae61a2`). The assumption: the live Postgres schema matches the Kysely `DatabaseSchema` type the compile-only M1 tests were typed against, in particular `ScheduledMessages.error`'s nullability and the `Messages` owner columns `fk_users_id` and `fk_guilds_id`. The pre-release walks ran against `prisma db push` of `project-utils/prisma/schema.prisma`, so they show only that the Prisma schema matches the Kysely types. Signature of falsity: M1's compiled SQL passes in the suite but the production list or a save errors. It is a stated limit transferred to this row.
- **Result (uat-hooks-015, 2026-11-08T22:37:15–22:38:08Z): EXECUTED, PASS.** Under the owner's standing ruling cacdd97 and steering-coordinator's go at 22:36Z, account 2 ran in its own profile (`/home/dev/.cache/discord-test-user-2-chrome`). `mcp-chrome-313b550` was not opened. The driver was `verification/015/uat/b07-account2-prod-driver.cjs`, a copy of the B-1 driver with base `https://hooks.gg`; it saves nothing. Discord was already signed in. Site sign-in on hooks.gg went through OAuth with no challenge, and `/api/auth/session` returned a user. Save To lists "My Account" only, so the account administers no server and no phantom "AAAA…" server shows (UAT-6's prediction for production: absent). `/message/f/0`: `message.get` 200, "No Messages / Create a new message or upload an existing one.", no error toast (`verification/015/uat/b07-account2-prod-2026-11-08.json`, `.png`). The site served is the production deployment, which `deployment/closed/015-bug-evaluation-fixes-deployment.md` records as website master b96e364; the page does not expose its SHA. **Live-schema residual:** the list query ran against the live schema without error, so the Messages owner-column read holds in production. The save path (`ScheduledMessages.error` nullability and the owner columns on write) was not exercised, because the brief says to save no messages. That leg stays a stated limit, and its signature of falsity is still a production save error. Process released: the browser closed and no `SingletonLock` remains on the profile.
- **Observation carried with it** (QA effort-final Assumption Not Checked, UAT's update): `getCDNUrl` reads `NEXT_PUBLIC_CDN_PORT`, which Next inlines at build time. UAT saw preview URLs with no port with the variable unset. Production's value of the variable is unread. Signature of falsity: image and preview URLs on production carry no port when the variable is set. It needs a production Vercel environment read, which is the owner's.

## B-8: M8-a drain on the verifying stop, and the D36 startup line

- **Reader.** devops, in the same session as the `prod.yml` re-run (D19, L-6), over the standing `claude-ro` alias (`ssh hooks-pig`): reads only, no pm2 command, no write, `/home/nodejs/.pm2/dump.pm2` never opened, root's `dump.pm2` only through the filtered extract (name, `kill_timeout`, `shutdown_with_message`).
- **Instrument.** `verification/015/pig-host-read.sh` (run 2), captured to `verification/015/`. The span is anchored on stop (2)'s `Stopping app` line in `/etc/.pm2/pm2.log`, never stop (1)'s. Its bounds are the first ready lines after each stop, every ready line between them is a reported restart, and a missing bound is reported as no span (rev 11 form). The clock is D23's stated assumption that the host runs in UTC; a host time zone other than UTC voids the read until it is re-specified.
- **Earliest decidable.** The re-run has completed and `pm2.log` shows the app online after it.
- **Predicted value.** For stop (2): exactly one `Server received` line naming the trigger and the drain-complete line; exit before 12000 ms; no `still alive` and no SIGKILL. Stop (1), the transition stop at the first push, is predicted to show a SIGKILL because the old process has no drain; that is not a refutation. One `still alive` on stop (2) refutes by construction. Also read: RK-3 (the app is `online`), RK-5 (no Chromium with ppid 1 other than `chrome_crashpad`), and whether the stopped process had served a request (the drain-complete figure's idle or served reading; the plan's L-C2-2 form).
- **The D36 limb (absorbs B-15).** `grep -cF 'generic-pool no longer exposes _waitingClientsQueue.dequeue'` over the whole of the generator's PM2 error log, `/etc/.pm2/logs/hooks-image-preview-generator-prod-error.log` (read from the log directory at Stage 1: 110 lines, last written 2026-11-08T17:27:00Z, root-owned and world-readable; the deployed ecosystem sets no `error_file`, so PM2's default name applies). The file is shown readable, with its line count, in the same session. The line did not exist before this chain, so any occurrence is post-deploy. Predicted: 0. One occurrence refutes by construction: `checkPoolShape` judged the pool member absent and the failure handler is not attached on production's Node 18.17.1.
- **Operator signal (B-15, superseded by this limb).** The line above in the PM2 error log means the pool's failure handler is detached. From then on a Chromium launch failure leaves requests hanging and floods that log (measured locally at about 36,000 lines/s on Node 24 with no browser binary, CR-34; the rate on the host is unmeasured).
- **Failure mode.** The drain never runs and deploys still kill in-flight previews; or, for the D36 limb, F-34's hang returns after one log line. A non-zero D36 count is routed to the planner as a production defect; the release consequence is devops's to establish.

## Post-release falsifiers from the plan's Risks (carried here; no register row)

- **RK-4** (M7-a's `push-commands` republishes every command, not only `get_message`). Falsifier: a command's definition differing after the push. Reader: the owner, who runs `push-commands`; instrument: his Discord client's command list for a changed definition, compared before and after. Rides B-6's `push-commands` act.
- **RK-2** (M2 widens what saves: any consumer reading stored `color` or `footer.text` sees new values; statbot and chain 012's `valid` column are the named ones). Falsifier: a consumer refusing `color: 0` or a 2048-character footer. Reader: whoever next reports a statbot or `valid`-column failure on such a message; no instrument was named by the plan and none is invented here. It stays a stated residue with this record as its carrier.
- RK-1, RK-3, RK-5 and RK-7 were decided before or at the release (UAT B-5, run 2's `online` and Chromium reads, QA's RK-7 scan); RK-6 is a standing prediction about how an M8 observation is read, discharged by run 2's anchoring on stop (2).

## Evidence

- Register: `qa/015-bug-evaluation-fixes-qa.md` § Blocking-condition register, rows B-6, B-7, B-8 (with their reconciliations to rev 28); UAT copy: `uat/015-bug-evaluation-fixes-uat.md` § Blocking-condition register, including B-15 SUPERSEDED.
- Host facts read at Stage 1, over `ssh hooks-pig`: `verification/015/devops-stage1-host-read-2026-11-08T2128Z.txt`.
- Run 1 baseline for B-8: `verification/015/m8-0-run1-2026-11-08T0525Z.txt`.

## Origin

devops Stage 1, chain 015. The raising document is `deployment/015-bug-evaluation-fixes-deployment.md`.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-08T21:29 | devops-hooks-015 (Stage 1) | Created at the Stage 1 commit, carrying B-6, B-7 (with QA's live-schema residual) and B-8 (with B-15's signal) from the chain register in full. |
| 2026-11-08T22:06 | devops-hooks-015 (Stage 2) | B-8 EXECUTED, PASS at stop (2) 22:04:49Z: one `Server received`, `Drain complete in 1ms`, exit 0 s via SIGINT, no `still alive`, D36 count 0 in the error and out logs (captures `verification/015/m8-0-run2-2026-11-08T2205Z.txt`, `devops-2c-b8-d36-count-2026-11-08T2205Z.txt`). Drain of an in-flight render not observed (idle process). B-6 and B-7 stay open. |
| 2026-11-08T22:40 | uat-hooks-015 (brief uat-hooks-015-b7; ruling cacdd97; coordinator go 22:36Z) | B-7 EXECUTED PASS at 22:38Z: account 2 on production hooks.gg, list loads (`message.get` 200, "No Messages", no error), no administered server listed. Live-schema residual discharged for the list read only; the save leg is a stated limit. B-6 stays open. |
