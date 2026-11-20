---
UUID: d1349a21
Status: Addressed
Status-Detail: "Every post-deploy row of plan 018 is PASS on hooks.gg after website master moved 7923a1d to d1bb9b0 (2026-11-20T08:07:52Z): B-7 (devops, 13:37Z), B-6 and B-10 (uat, 13:45Z), B-8 (qa, 13:47Z). X-12 was met (the push followed P-1's PASS). QA M3's function-trace assumption stays NOT VERIFIED, a stated limit with no behaviour resting on it; QA M2's is answered by the build log and B-10. Nothing is owed by this document."
Owning-Stage: devops
Review-Trigger: "the READY production deployment of website master whose commit contains d1bb9b0 (verification/018/devops/read-serving-deployment.sh exits 0), which is the event that fills the E-WEBSITE-PUSH ledger row's serving limb; each reader acts on it"
---

# Post-deploy rows of plan 018 — Next.js 16.4.6 and the save-size cap (H-002, M-001)

## What is seeded

Plan 018 ships website `master` from `7923a1d` to `d1bb9b0` (Next.js 16.1.6 → 16.4.6; every save list refused over its bound; ESLint 9;
zod pinned at 3.22.4). QA's blocking-condition register (`qa/018-next-upgrade-save-size-cap-qa.md`, rows B-1 to B-10; closed by Stage 1 at
`qa/closed/`) and UAT (`uat/closed/018-next-upgrade-save-size-cap-uat.md`, decision APPROVED FOR RELEASE at `d1bb9b0`) classed four rows
post-deploy-observable: they gate nothing of the release act. This record carries them, in full. **None is a timed read**: each is decidable
the moment Vercel's production deployment of the release is READY, and each is a signed-in or public read that a stage runs; no scheduled
headless run is needed, so no crontab line is installed and no `post-deploy-launcher.js` smoke is owed (the launcher's kit is for timed
reads). A reader stage is cued by steering at the push (devops's report to steering names this record).

**Gate for every row (decidable when):** `bash verification/018/devops/read-serving-deployment.sh <out-file>` exits 0 — the newest READY
production deployment's `githubCommitSha` contains `d1bb9b0`. Exit 1 means not yet (a read before the build is live answers from 7923a1d);
exit 3 is unreadable, and three consecutive exit 3 is a stop. Baseline before the release (production serving `7923a1d`): exit 1; controls
exit 0 (tip `7923a1d`) and exit 3 (bogus ref; no `.vercel`): `verification/018/devops/read-serving-deployment-baseline.txt`.

**Event ledger** (devops writes; a reader never edits it):

| Event | What it is | When (UTC) | Ref and SHA | Source |
|---|---|---|---|---|
| E-RELEASE-CHECK | the release-check preview READY at the chain tip's child (M5-a, B-5) | 2026-11-20T06:21:54Z push; READY by 06:22:36Z | branch `release-check/018-next-upgrade-save-size-cap` `5677889cca3d6259de7ed7c60cfe00874ca7e14c` (parent `d1bb9b0`); `dpl_oVqvgvn5zFPquLnNehXZMWBHnq1E` | `verification/018/devops/m5-a-release-check.txt` |
| E-WEBSITE-PUSH | website `master` moved to the release | 2026-11-20T08:07:52Z (release-move.js exit 0; origin master read back `d1bb9b0724cded3c3c303203c2cbafe5df7bbf96`) | website `master` `d1bb9b0724cded3c3c303203c2cbafe5df7bbf96` (was `7923a1d`) | devops, Stage 2; `verification/018/devops/runbook-steps-3-4.txt` |
| E-SERVING | `read-serving-deployment.sh` first exits 0 | 2026-11-20T13:37:14Z read (the deployment was created 08:07:54Z) | production deployment `dpl_7RXkzDG2LDypubtd5xjum1EDseMo` READY, commit `d1bb9b0724cded3c3c303203c2cbafe5df7bbf96` | devops, Stage 2; `verification/018/devops/serving-read-1.txt` |

## Rows (carried in full from QA's register; the register's cell text is the authority for the instrument)

### B-6 (M1-h) — the over-limit embed list is refused with one issue on production

- **Reader:** uat (stage; a test account signed in to hooks.gg, Test accounts ruling `steering/015-rulings.md` line 429). **Class:** post-deploy-observable.
- **Condition:** one test-account `message.upsert` carrying 50 invalid embeds on hooks.gg is refused with the capped list.
- **Instrument:** through the stage browser, `POST /api/trpc/message.upsert` with the superjson body `{json: {message: {name: 'n', data: {embeds: 50 x {title: 1}}}}}`; parse the tRPC error message as the issue list and count it. Base read, same payload, 2026-11-20T04:09Z while production served 16.1.6: HTTP 400 `BAD_REQUEST`, **51** issues (`verification/018/qa/phase-1/prod-base-reads/README.md`, item 2).
- **Predicted:** 1 issue (the embed list over its bound of 10). One observation decides it. Nothing is written either way (the payload is refused at the input stage).
- **Failure mode:** 51 means production is not serving M1: a rollback question for the owner, never the reader's act.
- **Result:** **PASS** (2026-11-20T13:45Z, uat-hooks-018, stage browser signed in as the test account; read at 13:4xZ): HTTP 400 `BAD_REQUEST`, **1** issue, `too_big` at `message.data.embeds`, "Array must contain at most 10 element(s)"; `window.next.version` "16.4.6" (`verification/018/uat/post-deploy/b6-result-signed-in.json`, a transcription, re-parsed here). Refused at input, nothing written. A first read at 13:38Z was signed out (401 `UNAUTHORIZED`, `b6-result.json`) and decides nothing: the test account had lost its hooks.gg session, probably by UAT's own local-build "Log out" at about 06:28Z revoking the token of production's Discord app (inferred; `INBOX.md`, uat-hooks-018 hazard entry). It was signed in again through Discord's authorise page before this read.

### B-7 (M5-e) — production serves Next 16.4.6

- **Reader:** devops (stage), run by devops itself right after E-SERVING, a public GET with no session. **Class:** post-deploy-observable.
- **Condition:** hooks.gg's page script carries `window.next={version:"16.4.6"` and none carries 16.1.6.
- **Instrument (UAT-1 changes it):** `bash verification/018/uat/preview/m5e-version-read.sh https://hooks.gg <workdir>`, which fetches every `/_next/static/` script the page names. The planner's original capture (`verification/018/planning/prod-next-version-pre.txt`) lists only `/_next/static/chunks/*.js`; at 16.4.6 every script is under `/_next/static/immutable/chunks/`, so that form fetches nothing, fails "16.4.6 ≥ 1" falsely and passes "16.1.6 = 0" vacuously. The widened script read 16.1.6 on production and 16.4.6 on the preview (`verification/018/uat/preview/m5e-version-read.txt`).
- **Predicted:** `files-with-16.4.6` ≥ 1 and `files-with-16.1.6` = 0, with `scripts` > 0.
- **Failure mode:** 16.1.6 still served (or scripts = 0) means H-002 is not closed in production.
- **Result:** **PASS** (2026-11-20T13:37:23Z, devops): `m5e-version-read.sh https://hooks.gg` printed `16.4.6 in /_next/static/immutable/chunks/0xln_kpj6rjf7.js: window.next={version:"16.4.6"` and `scripts=13 files-with-16.4.6=1 files-with-16.1.6=0`, exit 0; capture `verification/018/devops/b7-production-version-read.txt`. H-002's human-observable form holds in production.

### B-8 (M1-e liveness, S11) — the recent-messages list keeps updating

- **Reader:** qa (stage; the stage browser signed in to hooks.gg as the test account). **Class:** post-deploy-observable.
- **Condition:** the recent list keeps updating after release.
- **Instrument:** `fetch('/api/auth/session')`, reading `user.preferences.recentMessageIds` (length and first id only). Open message A, then message B. Control: B's id moves to first place. Minting read 2026-11-20T04:09Z: 200, signed in, an array of length 10 (`prod-base-reads/README.md`, item 1).
- **Predicted:** first id = the message last opened; length ≤ 11.
- **Failure mode:** the first id does not move: updates are refused silently (no `onError`) and the recent list freezes for users.
- **Result:** **PASS** (2026-11-20T13:47Z, qa-hooks-018, through a browser-walker helper on the stage browser signed in as the test account; `verification/018/qa/post-deploy-b8/walk-3.md`; values are booleans, counts and positions only). Before: `/api/auth/session` 200, signed in, `recentMessageIds` length 10. A = position 8 and B = position 9, both personal messages in the session's hydration; first id != A. Opening A's editor: `message.getOne` 200, `user.updatePreferences` POST 200, then first id = A, length 10. Opening B's editor: getOne 200, a new updatePreferences POST 200, then first id = B, second = A, length 10. The first id moved on both opens: the recent list keeps updating after release. Limit: both messages were already in the list, so eviction at 11 was not exercised (the predicted length <= 11 holds at 10). Two earlier attempts decide nothing. `walk.md` (13:42Z) found the session signed out, the same loss B-6 recorded. `walk-2.md` (13:45Z) chose positions 2 and 3: getOne returned 500 for both, the editor showed a menubar-only shell, and no update fired. walk-3 shows positions 0 to 3 are absent from the session's hydration (6 of 10 ids hydrate). That is consistent with message numbers no row holds, the behaviour open handoffs `get-one-absent-number-fails-without-not-found-2026-11-19.md` and `deleted-message-url-serves-blank-editor-2026-11-20.md` already carry, and it is not a release regression: getOne and getMessage are unchanged in 7923a1d..d1bb9b0. The absent-row cause is inferred: no database read was made.

### B-10 (M2-e deploy limb) — production renders code blocks highlighted

- **Reader:** uat (stage; the editor limb signed in as the test account, no save). **Class:** post-deploy-observable.
- **Condition:** the same look as B-9 on hooks.gg: highlight.js 11.12.0 binds in production's bundle.
- **Instrument:** `browser_evaluate` on `https://hooks.gg/preview?data=…` (the URL committed in `verification/018/qa/m2-hljs-resolution/prod-preview-read.md`), counting elements whose class contains `hljs` and reading for "Invalid message data."; the editor limb on a signed-in editor page, without saving.
- **Predicted:** `/preview`: 11 `hljs` elements and the same 7 classes as at minting (2026-11-20T05:22Z, Next 16.1.6: 11 elements, 0 errors), give or take the finer 11.12.0 classes `hl-compare` names; no error boundary. One observation decides it.
- **Failure mode:** production renders users' code blocks unhighlighted, or breaks the preview page.
- **Result:** **PASS** (2026-11-20T13:45Z, uat-hooks-018). `/preview` (QA's URL): **11** `hljs` elements, the same 7 classes as at minting (`hljs`, `-addition`, `-attr`, `-built_in`, `-deletion`, `-keyword`, `-number`), no "Invalid message data.", 0 console errors (`b10-preview.json`, `b10-console.txt`, machine copies); control `/preview` with plain text: 0 (`b10-control.json`). Editor limb, signed in, `/message/m/0/edit` with UAT's three fenced blocks, not saved: preview state 19 elements, editor mounted 6 (`hljs-keyword`, `-addition`, `-deletion`), the same as the local tip and base builds (`b10-editor-preview-state.json`, `b10-editor.json`, transcriptions). The draft of that unsaved message stays in the kept profile's browser storage (the restore's Load stayed disabled); nothing reached the server.

## Sequencing against the open production carriers (X-12)

- **P-1** (`handoff/message-page-header-decode-post-deploy-2026-11-20.md`, reader P1R, fires every two hours at :07): it asks whether production's
  `/_next/image` answers 200 `image/png` at `7923a1d`. A read after this release exercises Next 16.4.6's optimiser, not `7923a1d`'s, and cannot decide it.
  So the release push waits for P-1's `Result` line (PASS or FAIL). At 07:08Z both fires so far (04:07Z, 06:07Z) were undecided: the cached pre-push entry (expired about 06:18Z), so the 08:07Z fire is the first that can decide.
- **017's B-7 (B7R, 07:17 and 19:17 daily) and B-10 (B10R, from 2026-12-19):** health reads of production runtime logs (`preview-image-failure` lines; a zero is evidence of nothing) and of the generator host. A deployment of master moves what produces the lines but neither query; B7R keeps its 23 h window across both deployments, and its control count re-shows liveness every fire. No reordering is owed against them; the release record names the 07:17Z and 19:17Z fires around the push.

## Forward items from the chain that only production (or a later chain) can decide

- **QA M3's Assumption Not Checked** (Vercel's install resolves the lockfile as the export did, so function traces gain only the 4 package-metadata paths): the preview's build log (`verification/018/devops/m5-a-preview-build-log.txt`) lists routes and no function trace contents. **NOT VERIFIED**, an artifact-side read that Vercel does not expose through the build log or deployment API read here. Effect if false: a JS file in a function's trace that the parent's lacked; no behaviour rests on it. Carried here as a stated limit; no row.
- **QA M2's Assumption Not Checked** (Vercel's own build equals the local export's: no "mandatory changes" line, `highlight.js` bound): the preview's build log has no "mandatory" line (0, `grep -c`); the `hljs` binding is B-10 (and B-9, EXECUTED locally).

## Evidence

- `verification/018/devops/m5-a-release-check.txt`, `m5-a-preview-build-log.txt`, `read-serving-deployment.sh`, `read-serving-deployment-baseline.txt`.
- UAT: `uat/closed/018-next-upgrade-save-size-cap-uat.md` (§ Blocking-condition register, UAT-1).

## Origin

devops Stage 1 for plan 018, from `steering/018-brief-devops.md`; rows from `qa/closed/018-next-upgrade-save-size-cap-qa.md` (§ Blocking-Condition Register) and UAT-1.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-20T07:09 | devops-hooks-018 | Opened at Stage 1 with rows B-6, B-7, B-8, B-10, the event ledger (E-RELEASE-CHECK filled; E-WEBSITE-PUSH and E-SERVING blank), the serving gate and its baseline, and the X-12 sequencing. No timed read, so no crontab line. |
| 2026-11-20T13:37 | devops-hooks-018 | Release executed (Stage 2, Phase 2C): E-WEBSITE-PUSH and E-SERVING filled (push 08:07:52Z after P-1's PASS at 08:07:06Z; production deployment READY at the tip; the serving gate exits 0). B-7 PASS. B-6 and B-10 (uat) and B-8 (qa) are open for their readers; steering is told to cue them.
| 2026-11-20T13:45 | uat-hooks-018 | B-6 and B-10 Result lines written: both PASS (evidence `verification/018/uat/post-deploy/`). B-6's first read was signed out (the test account's hooks.gg session lost, probable cause UAT's local-build Log out; hazard in `INBOX.md`). |
| 2026-11-20T13:48 | qa-hooks-018 | B-8 Result written: PASS (`verification/018/qa/post-deploy-b8/walk-3.md`). Two earlier walks are recorded as deciding nothing: one signed out, one on absent message numbers whose getOne returned 500 (existing handoffs). |
| 2026-11-20T13:49 | steering-roadmap-hooks | Document closed | Status: Addressed. All four Results PASS (B-6, B-7, B-8, B-10); closed by steering, since devops was cleared at its checkpoint and the criteria are recorded here. |

## Resumption State

Closed `Addressed`; nothing resumes here.
