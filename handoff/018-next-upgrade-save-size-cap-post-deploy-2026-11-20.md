---
UUID: d1349a21
Status: Open
Status-Detail: "Carrier of plan 018's post-deploy rows B-6, B-7, B-8 and B-10 (QA register, UAT-1's B-7 instrument) after website master moves from 7923a1d to d1bb9b0. The push has not happened: the event ledger is blank. Each row names its reader stage; none is a timed read, so no crontab line exists. Sequenced after P-1's decisive read (X-12)."
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
| E-WEBSITE-PUSH | website `master` moved to the release | _blank_ | website `master` `d1bb9b0724cded3c3c303203c2cbafe5df7bbf96` (was `7923a1d`) | devops, Stage 2 |
| E-SERVING | `read-serving-deployment.sh` first exits 0 | _blank_ | production deployment id and commit | devops, Stage 2 |

## Rows (carried in full from QA's register; the register's cell text is the authority for the instrument)

### B-6 (M1-h) — the over-limit embed list is refused with one issue on production

- **Reader:** uat (stage; a test account signed in to hooks.gg, Test accounts ruling `steering/015-rulings.md` line 429). **Class:** post-deploy-observable.
- **Condition:** one test-account `message.upsert` carrying 50 invalid embeds on hooks.gg is refused with the capped list.
- **Instrument:** through the stage browser, `POST /api/trpc/message.upsert` with the superjson body `{json: {message: {name: 'n', data: {embeds: 50 x {title: 1}}}}}`; parse the tRPC error message as the issue list and count it. Base read, same payload, 2026-11-20T04:09Z while production served 16.1.6: HTTP 400 `BAD_REQUEST`, **51** issues (`verification/018/qa/phase-1/prod-base-reads/README.md`, item 2).
- **Predicted:** 1 issue (the embed list over its bound of 10). One observation decides it. Nothing is written either way (the payload is refused at the input stage).
- **Failure mode:** 51 means production is not serving M1: a rollback question for the owner, never the reader's act.
- **Result:** _blank_

### B-7 (M5-e) — production serves Next 16.4.6

- **Reader:** devops (stage), run by devops itself right after E-SERVING, a public GET with no session. **Class:** post-deploy-observable.
- **Condition:** hooks.gg's page script carries `window.next={version:"16.4.6"` and none carries 16.1.6.
- **Instrument (UAT-1 changes it):** `bash verification/018/uat/preview/m5e-version-read.sh https://hooks.gg <workdir>`, which fetches every `/_next/static/` script the page names. The planner's original capture (`verification/018/planning/prod-next-version-pre.txt`) lists only `/_next/static/chunks/*.js`; at 16.4.6 every script is under `/_next/static/immutable/chunks/`, so that form fetches nothing, fails "16.4.6 ≥ 1" falsely and passes "16.1.6 = 0" vacuously. The widened script read 16.1.6 on production and 16.4.6 on the preview (`verification/018/uat/preview/m5e-version-read.txt`).
- **Predicted:** `files-with-16.4.6` ≥ 1 and `files-with-16.1.6` = 0, with `scripts` > 0.
- **Failure mode:** 16.1.6 still served (or scripts = 0) means H-002 is not closed in production.
- **Result:** _blank_

### B-8 (M1-e liveness, S11) — the recent-messages list keeps updating

- **Reader:** qa (stage; the stage browser signed in to hooks.gg as the test account). **Class:** post-deploy-observable.
- **Condition:** the recent list keeps updating after release.
- **Instrument:** `fetch('/api/auth/session')`, reading `user.preferences.recentMessageIds` (length and first id only). Open message A, then message B. Control: B's id moves to first place. Minting read 2026-11-20T04:09Z: 200, signed in, an array of length 10 (`prod-base-reads/README.md`, item 1).
- **Predicted:** first id = the message last opened; length ≤ 11.
- **Failure mode:** the first id does not move: updates are refused silently (no `onError`) and the recent list freezes for users.
- **Result:** _blank_

### B-10 (M2-e deploy limb) — production renders code blocks highlighted

- **Reader:** uat (stage; the editor limb signed in as the test account, no save). **Class:** post-deploy-observable.
- **Condition:** the same look as B-9 on hooks.gg: highlight.js 11.12.0 binds in production's bundle.
- **Instrument:** `browser_evaluate` on `https://hooks.gg/preview?data=…` (the URL committed in `verification/018/qa/m2-hljs-resolution/prod-preview-read.md`), counting elements whose class contains `hljs` and reading for "Invalid message data."; the editor limb on a signed-in editor page, without saving.
- **Predicted:** `/preview`: 11 `hljs` elements and the same 7 classes as at minting (2026-11-20T05:22Z, Next 16.1.6: 11 elements, 0 errors), give or take the finer 11.12.0 classes `hl-compare` names; no error boundary. One observation decides it.
- **Failure mode:** production renders users' code blocks unhighlighted, or breaks the preview page.
- **Result:** _blank_

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
