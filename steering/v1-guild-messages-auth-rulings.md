# Rulings — v1 guild-messages endpoints unauthenticated (handoff 8818bd89; no chain yet)

Steering session alias chain: steering-new → steering-H (renamed by the owner 2026-10-10).

## 2026-10-10 — "sort the handoffs by impact / severity and address the top one"
Owner's words, verbatim. Steering ranked the 9 Open handoffs; top = `handoff/v1-guild-messages-endpoints-unauthenticated-2026-08-24.md`.

## 2026-10-10 — scoping determination: Research first (by selection)
Prompt put and answered 2026-10-10. Options: Fixer (recommended) / Research first / Full chain / Hold.
Chosen: **Research first**, by selection, not his words. Content: a researcher establishes (a) whether
production answers /api/v1 with no key (one unauthenticated GET to production with a made-up guild ID)
and (b) whether Statbot's key matches the website's. Neither key's value is visible to an agent, so (b) may return to him.
Premises read this turn: at website `f2c85f5` (== origin/master) `src/middleware.ts` matcher is
`['/message/(.*)', '/api/guilds/(.*)', '/preview']` and the predicate is `startsWith('/api/v1/*')`
(`git show` + grep); both v1 handlers 0 matches for auth|session|Bearer|STATBOT|token (`grep -c`);
no commits to those paths b3f8ea9..f2c85f5. Statbot sends `Authorization: Bearer ${apiKey}` to the
hooks.gg client (`statbot-utils/src/api/ApiUtils.ts`, where the hooks.gg client is built, read). Key equality: unverified.

## 2026-10-10 — research returned (researcher subagent, `research/closed/v1-guild-messages-auth-exposure-2026-10-10.md`, b116210)
(a) Proven live: the one sanctioned unauthenticated GET to hooks.gg returned 200 from the handler. (b) Not
establishable by an agent → OWNER-QUEUE entry "Check that Statbot's hooks.gg key matches the website's".
Next: the pipeline for the fix is put to the owner.

## 2026-10-10 — fix route: Fixer (by selection)
Options: Fixer (recommended) / Planner (full chain) / Hold. Chosen **Fixer**, by selection. Scope statement: one
defect, the unauthenticated v1 guild-messages endpoints; files `src/middleware.ts`,
`src/pages/api/v1/guilds/[guildId]/messages.ts`, `.../messages/[id].ts` plus their tests; `website` only, no
other repo. No deploy or push until the owner's key check (OWNER-QUEUE) returns "match". Chain branch
`fix/v1-guild-messages-auth` created by steering at f2c85f5 (tree was clean; chore/agent-comment-sweep untouched, merge still HELD).

## 2026-10-10 — rider: 400 with no `.end()` (by selection) — SCOPE DELTA
Fixer round 1 handed back at website `1acffee` (impl record c97dd96) and reported a second defect: in both v1
handlers a ZodError hits `return res.status(400)` with no `.end()` (steering read it at `messages.ts` at 1acffee).
Options: Add as a rider (recommended) / Separate handoff / Leave it. Chosen **Add as a rider**, by selection.
Scope statement now also covers that 400 path in the same two handlers plus its test. Fixer round 2 on the same branch.
Reviewer start: Fresh subagent (rec) / You spawn it / Hold → **Fresh subagent**, by selection; after the rider round.

## 2026-10-10 — rider 2: `messages/codes/[code].ts` 400 with no `.end()` (by selection) — SCOPE DELTA
Code review round 1: APPROVED_WITH_COMMENTS at website c8c3d70 (`code-review/fix-v1-guild-messages-auth-code-review.md`,
3afec66). CR-2 found the same defect at `src/pages/api/messages/codes/[code].ts:23` (steering read it at c8c3d70).
Options: Rider on this fix (recommended; "the fixer does a third round") / Leave in the handoff. Chosen **Rider**, by
selection. This is the fixer's THIRD round; the option text named it as a fixer round, so this selection is
recorded as the owner's "continue as fixer". The question was not put separately. Scope now also covers that one
400 path plus its test. After round 3: code review re-runs on the new SHA, then QA.
QA start: Fresh subagent (rec) / You spawn it / Hold → **Fresh subagent**, by selection.

## 2026-10-10 — QA Phase 2: QA Complete at website 7606149 (`qa/fix-v1-guild-messages-auth-qa.md`, 9b4de7e)
QAF-1 (test-only patch) sent to the fixer to land; QA's blob check discharges it. Blocking release conditions
B-1 (owner key check, on OWNER-QUEUE) and B-2 (HOOKS_HOST on both Statbot hosts). Post-deploy B-3 and B-4. The register lives in the QA document.

## 2026-10-10 — B-2 and production probes (by selection)
B-2 options: Devops reads, count only (rec) / I'll check it myself / Hold → **Devops reads, count only**: at release
devops runs `grep -cx 'HOOKS_HOST=hooks.gg' <env file>` on statbot-api and statroles prod hosts over claude-ro
(prod-ro-access), expects 1, never prints the value, writes nothing.
Probe options: Yes, both (rec) / Only the post-deploy 401 / Neither → **Yes, both**: devops may send exactly
`curl -sI http://hooks.gg/` before deploy and one unauthenticated GET to
`https://hooks.gg/api/v1/guilds/9999999999999999999/messages` after deploy (expect 401); nothing else.

## 2026-10-10 — QAF-1 landed; devops Stage 1 as subagent (by selection)
Fixer landed QAF-1 at website ddbd750 (one path; blob 7dcbfa69… equals the hash the QA document names; production files
byte-identical to 7606149 — steering read all three). Steering observation on the fixer: its implementation record
(line ~330, "QAF-1 landed") says the QA document names no hash, but it does (qa doc, Discharge bullet). Its hand-back
also gave its record commit as 314ee9c, which is steering's own commit; the real one is a39b97c. Neither changes the result.
Devops options: Fresh subagent (rec) / You spawn it / Hold → **Fresh subagent**, by selection. Stage 1 only.

## 2026-10-10 — devops Stage 1 blocked; owner: "Just have the subagent prompt me"
Devops Stage 1 (b5e3a1a) stopped at its blocking-conditions gate on B-1 and B-2. It ran no host read or curl, because its definition
needs the sanction given in its own session. Asked who runs B-2 and the curl (You spawn devops session / I'll run them myself /
Hold), the owner answered in his own words: "Just have the subagent prompt me". Relayed verbatim. The subagent reported that no tool
in its run reaches him (no AskUserQuestion) and changed nothing. Back to the owner.

## 2026-10-10 — waiver of devops's in-session-sanction rule (by selection)
Options: You spawn devops session (rec) / Waive the in-session rule / I'll run them myself / Hold. Chosen **Waive the in-session
rule**, by selection, not his words (he picked the label and wrote no wording of his own). Binding content as the option stated it:
the owner waives devops's rule that an OK must be given in its own session, for these three reads only: the count-only
`grep -cx 'HOOKS_HOST=hooks.gg'` on the statbot-api host and on the statroles host, and the pre-deploy `curl -sI http://hooks.gg/`.
The OKs in block "B-2 and production probes" then count for devops. Not covered: the post-deploy GET (B-3), any other read.

## 2026-10-10 — B-2 path: steering performs the classifier-blocked read (by selection)
Devops ran the pre-deploy curl (308 → https://hooks.gg/, same host; 60578b5). Its read of the local statbot-api and
statbot-statrole-remake deploy scripts and ecosystem files, done to find the env file path, was denied by the auto-mode classifier ("Credential Exploration").
Options: I'll give the paths (rec) / I'll run the greps myself / Steering does the blocked read / Hold. Chosen **Steering does the
blocked read**, by selection: steering runs that read itself, unchanged, takes only the env file path, and devops then runs the greps.
Steering ran the read once, unchanged in scope (path tokens only, no values printed). Found: statbot-api `.github/deploy.sh`
copies the checkout to and runs from `/usr/local/bin/$APP_NAME/deployed/$ENV`, and its `ecosystem.config.js` loads dotenv's
default `.env` from there. `$APP_NAME` and `$ENV` are not set in the files read. statbot-statrole-remake has no deploy script;
its `ecosystem.config.js` loads the default `.env` with no cwd. So neither host's path is fully established.

## 2026-10-10 — waiver widened: devops may locate the env files (by selection)
Options: I'll give the paths (rec) / I'll run the greps myself / Let devops find them / Hold. Chosen **Let devops find them**, by
selection, not his words. Binding content as the option stated it: the waiver now also covers, on the statbot-api host and the statroles
host, a read that prints only file paths, never values. Examples given: `ls -d /usr/local/bin/*/deployed/*/.env` and pm2's working
directory for the two apps. After that, devops runs the two count-only greps.

## 2026-10-10 — B-1 answered: key match (his words)
Asked via OWNER-QUEUE (f7767c0): compare Vercel Production `STATBOT_API_KEY` with `HOOKS_API_KEY` in statbot-api
production-blue, production-green, production-premium `.env` and statroles `/usr/local/bin/statbot-statrole-remake/.env`,
byte for byte; answer "match" or "differ / unset". Asked 2026-10-10 after f7767c0; answered 2026-10-10T15:46Z, his words: "match".
No values were pasted or recorded. Relayed to devops verbatim for its B-1 gate.

## 2026-10-10 — release approval and B-3 waiver (by selection)
Release: options Approve release (rec) / Merge locally, don't push / Hold. Chosen **Approve release**, by selection, not his
words. Binding content: devops runs Stage 2: `next build` at ddbd750, fast-forward website master f2c85f5→ddbd750, push to
origin. Premises put to him, each with the read behind it: devops Stage 1 record 783cb98 is in HEAD (merge-base); `.github` has
no files (find); vercel.json has only a cron (cat); "push deploys" rests on 014 precedent only (assumption); rollback is Vercel
promote (devops's statement). The chore branch is excluded.
B-3: options Waive for B-3 too (rec) / I'll run it myself / Skip B-3. Chosen **Waive for B-3 too**, by selection. Binding
content: the in-session waiver extends to one unauthenticated GET /api/v1/guilds/<id>/messages, sent once by the devops
subagent after Vercel shows ddbd750 live; pass = 401.

## 2026-10-10 — Stage 2 blocks: build and move (by selection)
Devops stopped Stage 2 (deployment record 4663891): (1) `next build` at ddbd750 cannot run, root fs 154M free (df -h /, this
turn); (2) its in-session rule does not cover a relayed move. Build: options I'll free disk space / Waive the local build (rec) /
Hold. Chosen **I'll free disk space**, by selection: he frees ~1.5G, devops then reruns the build at ddbd750. Move: options
Steering runs it (rec) / Waive for devops / I'll run it myself / Hold. Chosen **Steering runs it**, by selection: steering runs
`node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master ddbd750c1ab4808317f3408524cf5f9b7d8d0935` unchanged,
in this session, after the build passes. Tool existence checked (ls). Sequence: disk freed → devops build → steering move → B-3.

## 2026-10-10 — local build waived (by selection; reopens the build selection)
He said, in his words: "I can't free that space at this moment". That reopened the build selection. Options: Waive the local build (rec)
/ Hold until you free space / Don't release. Chosen **Waive the local build**, by selection. Binding content: Vercel's build at
ddbd750 is the only build; steering runs the release move now; B-3 tells which build is live (401 = fix, 200 = old).

## 2026-10-10 — release move executed by steering; Vercel live (his words)
Steering ran `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master ddbd750c1ab4808317f3408524cf5f9b7d8d0935`
unchanged: exit 0, "OK moved master: f2c85f5… -> ddbd750… on origin; tree on master", no workflows. ls-remote confirms origin
master = ddbd750. The owner, asked via OWNER-QUEUE whether Vercel's Production deployment for ddbd750 was Ready: "Yes, it's live"
(his words). B-3 is cleared to run under the B-3 waiver.
