---
ID: 018
Origin: 018
UUID: 6273a762
Status: Released
Status-Detail: "Released: website master moved 7923a1d to d1bb9b0 at 2026-11-20T08:07:52Z on the owner's release approval (deployment/closed/018-next-upgrade-save-size-cap-deployment.md). APPROVED FOR RELEASE at website d1bb9b0 (plan revision 8). Pre-release rows B-1 to B-4, B-9 and M5-d EXECUTED; B-5 discharged by devops (READY, deployment record). Post-deploy rows ride the devops handoff with UAT-1's B-7 instrument."
Verified-At: "d1bb9b0 — repos=website; plan revision 8; production builds (next build, next start) of git archive exports of d1bb9b0 and of the base 7923a1d, each with its own frozen install; release-check preview 5677889 (d1bb9b0 plus vercel.json alone) for B-4"
Release-Decision: APPROVED FOR RELEASE
---

# UAT Report: Plan 018 — Next.js 16.4.6 and the save-list cap (H-002, M-001)

**Plan Reference**: `agent-output/planning/018-next-upgrade-save-size-cap.md`, `Revision: 8` (record `2dc79a3`). Read again at
`c417e5f` (R-21): the delta since `2dc79a3` is a Status write, Planner batch rows M2-I4 and CR-7 (stated limits) and the Resumption
State. No criterion, milestone or release condition this pass verifies moved.
**Date**: 2026-11-20
**UAT Agent**: Product Owner (UAT), session `uat-hooks-018`

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-20T06:47 | steering-roadmap-hooks → uat-hooks-018 (brief `steering/018-brief-uat.md`, record `f50c713`); devops-hooks-018 (M5-a READY, message 06:2xZ, capture `daf117a`) | UAT on QA's effort-final Phase 2 PASS at website `d1bb9b0` (`qa/018-next-upgrade-save-size-cap-m4-qa.md`, `QA Complete`, `62703f1`) | Stage start re-derived at the record. B-1, B-2 (both limbs), B-3, B-9 and M5-d executed on local production builds of the tip with base `7923a1d` as control; B-4 on the release-check preview. All PASS; R3 recorded (the limit holds); R5 shows no change from 16.1.6 but its instrument does not discriminate (UAT-2). UAT-1 MEDIUM: B-7's version instrument reads no scripts at 16.4.6. **APPROVED FOR RELEASE**; post-deploy rows ride devops's Stage-1 handoff. |
| 2026-11-20T07:12 | devops-hooks-018 (Stage 1, brief steering/018-brief-devops.md) | Close at Committed | Status: Committed. Closed to closed/ at Stage 1 of release website master d1bb9b0 (deployment/018-next-upgrade-save-size-cap-deployment.md); the document's anchor is unchanged. |
| 2026-11-20T13:40 | devops-hooks-018 (Phase 2D, brief steering/018-brief-devops.md) | Release | Status: Released. Website master moved 7923a1d to d1bb9b0 at 2026-11-20T08:07:52Z (deployment/closed/018-next-upgrade-save-size-cap-deployment.md); the document's anchor is unchanged. |

## Reading

The brief and its common part whole; the plan's Value Statement, Objective, Decisions Register, M1-f, M1-g, M1-h, M2-e, M4 and M5 at
revision 8; the QA register B-1 to B-10 and the Side-Effect Register (`qa/018-next-upgrade-save-size-cap-qa.md`, record `5dff766`); the
effort-final QA document's header, sweep and Assumption Not Checked; the implementer's user-visible-flow lines (M1: JSON view paste,
Save As and the new-message modal, Save's toast; M2: a code block with a language); the M4 implementation document's R1 to R6 rows.
Stage start: `qa/018-next-upgrade-save-size-cap-m4-qa.md` is `QA Complete`, `Verified-At` `d1bb9b0`, committed at `62703f1`, its
effort-final mutation sweep recorded with its kill table cited (section "Effort-final mutation sweep"). Steering's brief arrived.
The flows are the implementer's enumerated ones and QA's register rows; no flow held an owner decision.

## Flow Execution

**Build**: `git archive` exports of website `d1bb9b0` (tip, Next 16.4.6) and `7923a1d` (base, Next 16.1.6) under this session's
scratchpad, each `pnpm install --frozen-lockfile` (exit 0) and `next build` (exit 0; the logs name `Next.js 16.4.6` and `16.1.6`;
`zod` 3.22.4 in both), served by `next start -H 127.0.0.1 -p 3000` one at a time. `.env.local` symlinked from the shared tree, key
names read only; the process environment pointed `CDN_ENDPOINT`, `NEXT_PUBLIC_CDN_HOST`, `CDN_BUCKET`, `CDN_KEY`, `CDN_SECRET`,
`PREVIEW_IMAGE_URL` and `PREVIEW_IMAGE_API_KEY` at loopback (S3 stub `verification/018/uat/local/s3-stub-runner.mjs` on 39001;
nothing on 39002). Postgres from `tools/uat-local-stack.sh up` (`local-stack-up.txt`: schema pushed, next id 900000000000001,
fresh container). Real Pusher app. **Id range written: 900000000000001 only** (the B-2 seed, written on the base build);
`count(*) where id < 900000000000001` = 0 after the seed and at the end (`messages-final.txt`). The stub log is empty: no save
reached a storage call. The kept Chrome profile was driven by four `browser-walker` helpers (walks A, B1, B2, C, D, plus one planted
control run). Evidence under `verification/018/uat/local/` and `verification/018/uat/preview/`; the helpers' files are
transcriptions of tool output (they say so), and every number below that a row rests on was recomputed here from those files
(`grep -c`, a `python3 -I` parse) unless marked as the helper's. Nothing was installed or built in the shared tree.

B-4 ran on the release-check deployment `dpl_oVqvgvn5zFPquLnNehXZMWBHnq1E` at `5677889` (devops's capture
`verification/018/devops/m5-a-release-check.txt`; re-derived here: `git diff --name-only d1bb9b0 5677889` prints `vercel.json` alone,
`git merge-base --is-ancestor d1bb9b0 5677889` exit 0).

| Flow | Action | Expected | Observed | Result |
|------|--------|----------|----------|--------|
| M5-d sign-in (tip) | Log out, press "Log in" | Discord's authorise page | `discord.com/oauth2/authorize` reached; then authorised for the walks, session 200 with a user (`walk-b1/s1-session.json`) | PASS |
| B-1 JSON view, base | Paste 150 malformed `allowed_mentions.users` ids | 150 lines (control) | 150 lines, `grep -c .` (`walk-a/b1-base-errors.txt`); no request sent | PASS (control) |
| B-1 JSON view, tip | Same paste | 1 line naming 100; no request | 1 line: "Array must contain at most 100 element(s)" at `allowed_mentions.users` (`walk-b1/b1-tip-errors.txt`); no `/api/trpc` request | PASS |
| B-2 seed, base | Paste 150 well-formed ids, File > Save | Saves | `message.upsert` 200; row 900000000000001 holds 150 ids (db read) | PASS (set-up) |
| B-2 server limb, tip | Open 900000000000001 without the JSON view; File > Save As | 1 line naming 100; nothing written | 1 line at `message.data.allowed_mentions.users`, "at most 100" (`walk-b1/b2-saveas-error.txt`); upsert 400; still one row, its `updatedAt` the seed's | PASS |
| B-2 Save, tip | File > Save on the same message | Fixed toast (X-18, D-10) | "Error. Failed to save message. Please try again.", no reason; upsert 400 (`walk-b1/b2-save-toast.txt`) | PASS (stated limit) |
| B-2 capped refusal over HTTP, base | Signed-in POST `message.upsert`, 21 bad field names in one embed (`b2-capped-body.json`) | 21 field issues, no summary (control) | 400 `BAD_REQUEST`, 21 `invalid_type`, no summary, message 5347 bytes (`walk-a/b2-capped-base-response.json`) | PASS (control) |
| B-2 capped refusal over HTTP, tip | Same POST | 21 issues: the caller's 20, then `{custom, [], "Stopped checking after 20 errors"}`; < 16 KB | Exactly that (parsed and compared to the spec's list); first 20 equal to the base's first 20; message 4149 bytes as recomputed from the helper's reconstructed file (the helper reported 616) (`walk-b1/b2-capped-tip-response.json`) | PASS |
| B-9 preview limb, tip | Load three fenced blocks (`b9-code-blocks.json`), count `hljs` (`b9-hljs-count.js`) | > 0 with token classes; no "Invalid message data." | 19 elements, 9 classes incl. `hljs-keyword`, `-number`, `-addition`, `-deletion` (`walk-c/b9-code-preview.json`); plain-text control 0 | PASS |
| B-9 editor limb, tip | Click the content to mount Slate, count again | > 0 with token classes; 0 errors | Slate 1, 6 elements: `hljs-keyword`, `-addition`, `-deletion` (`walk-c/b9-code-editor.json`); control 0; console: only the local-only `/_vercel/speed-insights/script.js` 404 | PASS |
| B-9 base comparison | Same two reads on `7923a1d` | — | preview 19, editor 6, the same split (`walk-d/b9-base-*.json`): the editor shows no `hljs-number` at 16.1.6 either | as base |
| M2-e on Vercel's build | `/preview?data=…` on the release-check host (`b9-preview-url.txt`) | > 0, no error | 19 `hljs` elements, no "Invalid message data.", 0 console errors (`walk-d/b9-vercel-preview.json`) | PASS |
| B-3 R1 control | No edits; click the link to `/message/f/0` | Navigates, no dialog | As expected (`walk-b2/summary.txt`) | PASS (control) |
| B-3 R1 | Unsaved edit; same link; Cancel; again; Leave Page | Dialog; Cancel keeps; Leave Page navigates | "You have unsaved changes!"; Cancel kept URL and text; Leave Page reached `/message/f/0` | PASS |
| B-3 R2 | Unsaved edit; "Invite Bot" (another site); Cancel; again; Leave Page | Same dialog, no native prompt | As expected; reached `discord.com/oauth2/authorize`, nothing clicked there | PASS |
| B-3 R3 | `/message` → link into an editor → unsaved edit → browser back | Recorded, no prediction | No site dialog, no native prompt; back to `/message`; forward showed the editor without the edit (lost) | RECORDED: X-14 holds at 16.4.6 |
| B-3 R5 | Client navigation `/message` → editor under CDP throttling (40 KB/s, 600 ms), sampled 30 s (`r5-throttle-sampler-v2.js`) | Shell stays rendered while lazy children load | Tip ×2: "File" shell from ~2.7 s, never lost, 21 of 25 scripts finished after it (`walk-c/r5-run-*.json`). Base ×2 the same shape (`walk-d/r5-base-run-*.json`). Planted tip without `loading` on the six wrappers ×2: the same shape (`r5-planted/`) | EXECUTED: as 16.1.6; not discriminating (UAT-2) |
| B-4 pages, preview | GET `/`, `/legal/privacy`, `/legal/terms`, `/preview`, `/message`, `/message/m/0/edit`, `/message/m/0/send` | 200, rendered | All 200 (`b4-http.txt`), equal to the local tip (`b4-local-compare.txt`); each rendered, no error page, 0 broken images (`walk-c/b4-preview-render.json`). `/preview` without `data` renders nothing, as locally (the page returns `null`) | PASS |
| B-4 redirects, preview | `/support`, `/message/m/5` | 308 invite; 307 to `/edit` | 308 `discord.gg/…`; 307 `/message/m/5/edit` | PASS |
| M5-c images, preview | Landing image via `/_next/image`; a `cdn.discordapp.com` avatar via `/_next/image` | 200, image type | 200 `image/png` both (`m5c-images.txt`). Route table: base and tip builds list the same routes, so no route joins M5-b's set | PASS |
| M5-d on the preview | `/api/auth/providers`, `/api/auth/signin/discord` | 500, recorded (D-8) | 500 both; runtime log: "Invalid environment variables" naming the five Production-only keys (`runtime-log-digest.txt`) | RECORDED |
| M5-e, preview | Every script the page names, counted for `"16.4.6"` (`m5e-version-read.sh`) | `window.next={version:"16.4.6"` | 1 script of 13 carries it, 0 carry 16.1.6; the same instrument on hooks.gg reads 16.1.6 (`m5e-version-read.txt`) | PASS |

Not executed: the new-message modal's rendering of a refusal (the implementer's M1 flow 2, second surface). It renders through the
same `formatMutationError` as Save As, which B-2 drove; no register row names it. Weighed as unverified, not as covered.

Instruments and their failing runs (GLOSSARY, "Discriminating instrument"): B-1's and B-2's reads were seen to give the base values
(150 lines; a save; 21 issues with no summary) before the tip's were read. B-9's counter read 0 on a plain-text message in both
states. M5-e's widened instrument read 16.1.6 on production. R5's sampler was run on a planted tree first and did not fail there
(UAT-2). Two first-form instruments were wrong and are kept as run: `r5-throttle-sampler.js` read selectors the site lacks, and
walk B2's first B-9 read never mounted the editor; their v2 runs are the ones cited.

Removed at run end: both servers and the stub stopped by SIGINT (`wait-pid.py`: gone); ports 3000, 39001 and 5432 not listening, no
`next-server` or stub process (`ss`, `ps`); container removed (`local-stack-down.txt`, exit 0); the three exports deleted. The shared
website tree is unchanged (`git status`: only the pre-existing `.playwright-mcp/`, no file in it newer than this run's start).

## Blocking-condition register (authority: `qa/018-next-upgrade-save-size-cap-qa.md`, re-read at this write)

| Row | State | Result |
|---|---|---|
| B-1 | EXECUTED 2026-11-20 | Tip 1 line naming 100, base 150; no request sent. Prediction met. |
| B-2 | EXECUTED 2026-11-20 | Server limb: Save As 1 line, nothing written; Save shows X-18's toast. HTTP limb: 21 issues, the 21st the summary, first 20 equal to the caller's, under 16 KB; base 21 with no summary. Prediction met; QA's revision-3 Assumption Not Checked (the wire carries a capped refusal as the caller returns it) is closed by this read. |
| B-3 | EXECUTED 2026-11-20 | R1, R2 as at 16.1.6; R3 recorded (no confirmation; the edit is lost), carried to the architect by `handoff/018-m4-r3-navigation-limit-to-architecture-record-2026-11-20.md`; R5 as at 16.1.6 by the walked flow, its own property unverified (UAT-2). M5-d: authorise page reached. |
| B-4 | EXECUTED 2026-11-20 | M5-b and M5-c as predicted. QA's Assumption Not Checked (the preview serves as the tip's build) is closed: every page and redirect equal to the local tip; the one difference is `/api/auth/*`, D-8's. |
| B-5 | devops's (Discharging document: the deployment record) | READY at `5677889` per devops's capture; the tree identity re-derived here. |
| B-9 | EXECUTED 2026-11-20 | Both limbs > 0 with token classes, no error boundary; the editor limb's classes exclude `hljs-number` at base and tip alike (the prediction listed it; observed beside it). |
| B-6, B-7, B-8, B-10 | post-deploy-observable; approved conditionally, gate nothing of the release act | Carrier: devops's Stage-1 handoff. B-7's instrument per UAT-1. M1-h (B-6) and M2-e's deploy limb (B-10) are UAT's runs after the push. |

## Value Delivery Assessment

The Value Statement (plan § Value Statement and Business Objective) asks for two outcomes and a lint move. **A crafted App Router
request on 16.1.6:** the release-check preview, built by Vercel from the tip, serves Next 16.4.6 (M5-e), and every public page,
redirect and image answers as the local tip does; production will carry it once the release moves `master` (B-7 after deploy).
**One oversized list:** a signed-in save with a 150-id list is refused with one line naming the bound, over HTTP and in the editor's
Save As, and nothing is written; a save with many errors is refused with 20 issues and one summary in a 4 KB message where the base
builds every issue. The JSON view refuses the paste in the browser with one line. **Lint:** QA verified M3; nothing user-visible.
No core value is deferred. Known limits: Save keeps its reason-less toast (D-10, X-18); browser back still discards unsaved edits
(X-14, X-20); R5's guarantee rests on 004's record, not on this pass's instrument.

## Objective Alignment Assessment

**Does code meet original plan objective?**: YES
**Evidence**: Objective 1 — 16.4.6 built and served (local tip, Vercel preview); production is the post-deploy read. Objective 2 —
B-1, B-2 above. Objective 3 — QA's M3 verdict (not re-run here). Objective 4 — R1, R2, R3 and R6 (implementer and QA) as at
16.1.6, R5 as at 16.1.6 by the walked flow, and the preview seen (B-4).
**Drift Detected**: none against the objective. One instrument drift: M5-e's capture method (UAT-1).

## Findings

UAT-1 MEDIUM — B-7's instrument cannot see Next 16.4.6's scripts. `verification/018/planning/prod-next-version-pre.txt` lists
`/_next/static/chunks/*.js`; at 16.4.6 every script the page names is under `/_next/static/immutable/chunks/` (the preview names 13
scripts there and 0 under the old path). Run as written on hooks.gg after release, it fetches nothing: "16.4.6 count ≥ 1" fails
although production serves 16.4.6, and "16.1.6 count 0" passes vacuously. Remedy: B-7 runs
`verification/018/uat/preview/m5e-version-read.sh https://hooks.gg <dir>`, which reads every `/_next/static/` script and was seen to
read 16.1.6 on production and 16.4.6 on the preview (`m5e-version-read.txt`). Routed to devops for its Stage-1 handoff's B-7 row.
UAT-2 LOW — R5's instrument does not discriminate. With `loading` removed from the six wrappers, Next 16.4.6's
`shared/lib/app-dynamic.js` (lines 48–52) renders the five `ssr: true` ones in a Fragment, not a Suspense boundary, yet the walked
client navigation looks the same on the plant, the tip and the base. So the walk shows no change from 16.1.6 in the flow a user
takes, and it does not show that `loading: () => null` is what keeps the shell. Carrier: `INBOX.md` entry (uat-hooks-018, 2026-11-20)
for the architect beside R3's handoff, since 004's assumption is the record's.
UAT-3 INFO — on the preview, `/message`, `/message/m/0/edit` and `/message/m/0/send` throw "Invalid environment variables" during
server rendering and fall back to client rendering (React error #419 in the console; digest `1363069307` in the HTML; runtime log
`runtime-log-digest.txt`). This is D-8's premise (the five keys are Production-only); the pages still render and the local tip shows
none of it. No action. The runtime log's PM2 initialisation errors on `/api/auth/providers` also appear in production's log at
16.1.6 (`runtime-log-prod-pm2-count.txt`: 4 records), so they predate this chain.

## Process facts of this run

- Walk B1's helper, at its exit-path cache cleanup, had `find … -delete` refused under the rtk rewrite and re-ran it as
  `/usr/bin/find …`, which emptied the caches. That re-issued the same act in a form the rewrite does not see. Disclosed here; whether
  it was a workaround is the owner's call. Later briefs told helpers to stop on any refusal; none occurred.
- Read-only Vercel reads by this session: `npx vercel@66.2.0 logs` for the preview deployment and for production (2 h), scope
  `hooks-gg`; record contents digested, no values beyond messages and paths kept.
- B-2's HTTP-limb message length: the helper reported 616 bytes; its saved file (a reconstruction) parses to 4149. Both are under the
  16 KB bound; the file's figure is the one cited.

## Release Decision

**Final Status**: APPROVED FOR RELEASE
**Rationale**: QA's effort-final Phase 2 passed M1 to M4 at `d1bb9b0`; every pre-release blocking row is EXECUTED with its
prediction met or recorded, on the tip's own production build with the base as control, and the preview Vercel built from the tip
serves the same pages. The verdict names website `d1bb9b0`, re-derived from the tree (`git rev-parse HEAD` in the shared tree on
`chain/018-next-upgrade-save-size-cap`; the exports were `git archive d1bb9b0`); the predecessor verdicts (QA `62703f1`, code review
`b937d63`, both at `d1bb9b0`) were reached there. Any change to production code after `d1bb9b0` — the release-check commit included,
which must not reach `master` — expires those verdicts and this one. Post-deploy rows are conditional and gate nothing of the release.
**Recommended Version**: none to cut — the package has no `version` field; the release is website `master` moving from `7923a1d` to
`d1bb9b0`. Were one cut, minor: a framework upgrade and new input refusals, no removed behaviour.
**Key Changes for Changelog**:
- Next.js 16.1.6 → 16.4.6, with its lint and analyzer packages; ESLint 9 with a flat config; highlight.js 11.12.0; zod pinned at 3.22.4.
- Every save list over its bound is refused with one error naming the bound, before its items are checked (JSON view, Save As, the API).
- A save with many errors is refused with the first 20 and "Stopped checking after 20 errors".
- No operator-visible signal change was routed to this stage.

## Next Actions

*Point-in-time list — later stage documents are authoritative on these items' current state.*
- devops: Stage 1 from this document; B-7 with UAT-1's instrument; the release-check branch never reaches `master`.
- UAT, after the push: B-6 (M1-h) and B-10 (M2-e deploy limb) from devops's handoff.
- architect: R3 from its handoff; UAT-2 from `INBOX.md`.
