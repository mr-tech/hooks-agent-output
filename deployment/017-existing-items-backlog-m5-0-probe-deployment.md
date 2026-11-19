---
ID: 017
Origin: 017
UUID: 5c3e9a71
Status: Active
Status-Detail: "M5-0 limb 2 probe run 2026-11-19T04:55Z–04:59Z on his approval (D-15): outcome kept alive; branch deleted; scope this probe only. Not a Stage 1 or Stage 2 record; the plan's release record is a separate document."
---

# Deployment Record: plan 017, gate M5-0 limb 2 — the `waitUntil` probe push

**Plan Reference**: `agent-output/planning/017-existing-items-backlog.md`, `Revision: 4` (agent-output `a97628d`), § M5 "M5-0 — gate before M5 or M6 code", Decisions Register D-15, D-17, D-19. Plan Status is not touched by this session.
**Commission**: `steering/backlog-2026-11-18-briefs/devops-hooks-017.md` (duties negated: Stage 1 and Stage 2; this session runs the probe push alone). Common part `steering/017-brief-common.md` read.
**Roadmap**: `agent-output/roadmap` is not cited; nothing is read from it for this probe.
**Release Identifier**: none. A probe branch, `probe/017-waituntil`, never merged and deleted after the read. No serving ref moves.
**Execution Mode**: A (agent-executed) for the push, the requests, the log read and the branch deletion; each on his approval below.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-19T04:52 | steering-roadmap → devops-hooks-017 (brief) | M5-0 limb 2 probe push | Brief, common part, plan § M5-0 and D-15/D-17/D-19 read. Pre-push work: E-6 and the deploy mechanism established (below). The first probe tip `d9030b9` would not build on Preview; the repair came as `aca8cb3` from implementer-hooks-017. Approval not yet asked at this row. Disclosed in this round: the record repository ignores `*.log`, so the captures are `.txt`; and a `sed -i` of this document in a shell line was refused by `record-write-gate-hook`, re-issued with the Edit tool (not retried in the refused form). |
| 2026-11-19T04:59 | owner → devops-hooks-017 (selection prompts, 04:55Z and ~04:58Z) | Push approval; bypass-secret revocation | Pushed `aca8cb3` to `probe/017-waituntil` 04:55:17Z; Preview Ready 04:56:07Z; both requests; logs read twice; outcome **kept alive**; branch deleted local and remote 04:57:41Z. `vercel curl` created a project bypass secret, disclosed to him and revoked at his word (0 entries read back 04:59Z). Record `42ccf5f` carried the pre-push state; this row and the sections below completed it. |

## The probe under push

| Item | Value | Instrument |
|---|---|---|
| Branch | `probe/017-waituntil` (local only; `git ls-remote --heads origin 'probe/*'` returned nothing) | `git -C website ls-remote` |
| Tip | `aca8cb312f5eef03a25e9383fa384d73fc01842a` (two commits on `1ad625e`: `d9030b9` the route, dependency and lockfile; `aca8cb3` `vercel.json` build override) | `git -C website log --format='%H %P' -2 probe/017-waituntil` |
| Diff against base | `git diff --stat 1ad625e aca8cb3`: `package.json` +1, `pnpm-lock.yaml` +84 −2, `src/pages/api/waituntil-probe.ts` +23, `vercel.json` +1 (4 files, 107 insertions, 2 deletions) | git |
| The `aca8cb3` line | `"buildCommand": "SKIP_ENV_VALIDATION=1 next build",` added as the first key; the `crons` entry unchanged; parses as JSON | `git diff d9030b9 aca8cb3`; `JSON.parse` of `git show aca8cb3:vercel.json` |
| The route | `GET /api/waituntil-probe?id=<token>[&mode=without]` writes `preview-image-failure probe-control mode=<m> id=<token>` before the response, and `preview-image-failure probe-post-response mode=<m> id=<token> elapsedMs=<~5000>` 5 s after it (stderr). `mode=with` hands the promise to `waitUntil`; `without` does not (H-2). It imports only `@vercel/functions` and `next` types: no database, no `src/env.mjs`, no secret | `git show aca8cb3:src/pages/api/waituntil-probe.ts`, read whole |
| The implementer's record | `verification/017/m5-0/README.md` (agent-output `7d4b1ec`; names `aca8cb3` after the second commit) | read |
| Shared website tree | on `chain/017-existing-items-backlog`; this session does not switch it. The push names the SHA: `git push origin aca8cb3:refs/heads/probe/017-waituntil` | `git -C website branch --show-current` |

## What a push of this branch triggers (the push gate)

| Question | Answer | Basis |
|---|---|---|
| CI in the repository | None. `git ls-files` shows `.github/prompts/` only: no workflow file. Repo hooks: `.git/hooks` holds only `.sample` files; no `core.hooksPath`, `pushurl` or `insteadOf`. `package.json` has no `prepush`, `prepare`, `postinstall` or husky/lefthook entry | refuting helper (`general-purpose-sonnet`, read-only) and my reads; it could not refute the conclusion |
| What deploys on a push | The Vercel project `hooks-gg/hooks-gg-website` is linked to GitHub `hooks-gg/website`, `productionBranch: master`, 0 deploy hooks. A branch other than `master` is built as a **Preview** deployment | `vercel api /v9/projects/<id>` (CLI 66.2.0), fields `link.*` only |
| Reaches production? | No by those facts: the production branch is `master`, the push is to `probe/017-waituntil`. **Not established**: GitHub-side automation (org webhooks, apps, required workflows) — `gh api repos/hooks-gg/website/...` returns HTTP 404 for this box's token, so it cannot be read here — and Vercel's Ignored Build Step / preview-branch settings (not in the fields read) | `gh` exit 1 and 404; helper caveats 1 and 2 |
| Cron | `vercel.json` has one cron, `/api/cron?key=vercel`, daily. Vercel documents crons as running for production deployments only. **Documentation, not executed here** | Vercel documentation |
| Deployment protection | The project JSON carries no `ssoProtection` or `passwordProtection` field (absent from the response, not `null`). Whether a preview URL answers an unauthenticated request is **unestablished**; `vercel curl` (CLI 66.2.0) is the instrument that handles protection | `vercel api` field read; `vercel curl --help` |
| Recent previews | The 20 most recent deployments listed (`vercel ls`) are all Production, newest 6 h old. No Preview deployment in that window, so there is no recent evidence that previews of this project build | `vercel ls --scope hooks-gg` |

## E-6 — what the Preview deployment's environment connects to (QA's `UNVERIFIED` row)

Read: `npx vercel@66.2.0 env ls --scope hooks-gg` (project `hooks-gg-website`), names and target environments only; the value column holds encrypted blobs and was never decoded. Capture: `verification/017/m5-0/devops/preview-env-names.txt` (value-free, 49 rows).

| Resource | Preview carries | Reading |
|---|---|---|
| Database (`DATABASE_URL`, `PG*`, `POSTGRES_*`) | none: every one is Production-only | A preview has no database settings of its own and none of production's. **Inference** from one record per name with a single target; no value read |
| Redis (`REDISHOST`, `REDISPORT`, `REDISUSER`, `REDISPASSWORD`, `REDIS_*`) | none: Production-only | same |
| Pusher (`PUSHER_APP_ID`, `PUSHER_SECRET`, `NEXT_PUBLIC_PUSHER_KEY`, `NEXT_PUBLIC_PUSHER_CLUSTER`) | one record spanning Development, Preview and Production | One record has one value, so Preview publishes to **the same Pusher app as production** (Inference; no value compared) |
| Bucket (`CDN_BUCKET`, `CDN_ENDPOINT`, `CDN_KEY`, `CDN_SECRET`) | one record spanning Preview, Production | The same bucket as production (Inference) |
| Preview generator (`PREVIEW_IMAGE_URL`, `PREVIEW_IMAGE_API_KEY`) | `PREVIEW_IMAGE_URL`: separate records for Production and Preview; `PREVIEW_IMAGE_API_KEY`: one record spanning Production, Preview | The URL may differ per target (values not compared); the key is shared |
| Discord, `NEXTAUTH_SECRET`, `ENCRYPTION_*`, `HOOKS_API_TOKEN`, `STATBOT_API_KEY`, `GITHUB_USER*` | spanning Production, Preview (and Development) | shared with production |

What it means for this probe: the probe route reads none of these and calls nothing (source read whole above), so the probe touches no production resource. The two exposures are a Preview deployment of the whole site (reachable at its URL unless protected) and, in principle, any other route on that deployment being called by someone holding the URL with the shared Pusher/bucket/key settings — not by the probe. The generator, database and Redis are not reached by anything this push or request does.

## Build: the first tip would not have built (repaired before the ask)

Instrument: a throwaway export of the commit (`git archive`), `pnpm install --frozen-lockfile`, `next build`, environment = the variable **names** the Preview target has, dummy values, none of the Production-only names. Script `verification/017/m5-0/devops/preview-env-build.sh`; run in a capped scope (`systemd-run --user --scope -p RuntimeMaxSec=1900 -p MemoryMax=8G -p TasksMax=2000`); exports removed at run end.

| Tip | Environment | Result | Capture |
|---|---|---|---|
| `d9030b9` | Preview names, no `SKIP_ENV_VALIDATION` | **exit 1**: `Invalid environment variables` for `DATABASE_URL`, `REDISHOST`, `REDISPORT`, `REDISUSER`, `REDISPASSWORD`, thrown from `src/env.mjs` while generating `/_not-found` | `probe-build-preview-env-no-skip.txt` |
| `d9030b9` | same plus `SKIP_ENV_VALIDATION=1` | exit 0; `/api/waituntil-probe` in the route table | `probe-build-preview-env-skip-validation.txt` |
| `aca8cb3` | same names, no `SKIP_ENV_VALIDATION`; the command run is the `vercel.json` `buildCommand` string through `sh -c` | exit 0; `/api/waituntil-probe` in the route table | `probe-aca8cb3-build-buildcommand-string.txt` |

A local build is not Vercel's: the machine, the install command (the project installs with a GitHub token for the `project-utils` and `paracord` git dependencies) and the Vercel handling of a `vercel.json` `buildCommand` are **not run here**. The Node version for the deployment is the project's setting: `nodeVersion: 24.x` (project JSON), which satisfies `@vercel/functions` `engines.node >= 20` (Observed as a setting, not as a built runtime).

Why this was done before the ask: a Preview that fails to build is outcome "not readable" under D-19 and spends the one repair. Without `aca8cb3` the first push was expected to fail at the build.

## Runbook (executed after his approval; one ordered artifact)

Each row has a blank result and its abort criterion. Rows 1–6 are the first run; row 7 is the one repair-and-re-run D-19 allows.

| # | Step | Command / instrument | Abort criterion | Result |
|---|---|---|---|---|
| 1 | Confirm the tip and that the remote has no probe ref | `git -C website rev-parse probe/017-waituntil` = `aca8cb3…`; `git -C website ls-remote --heads origin 'probe/*'` empty | tip differs from the SHA he approved, or the ref exists remotely: stop | 04:55:12Z: tip `aca8cb312f5eef03a25e9383fa384d73fc01842a`; `ls-remote` returned no `probe/*` ref. Continue. |
| 2 | Push the SHA to the probe ref | `git -C website push origin aca8cb312f5eef03a25e9383fa384d73fc01842a:refs/heads/probe/017-waituntil` | a classifier or hook denial is reported, never retried | 04:55:17Z: `[new branch] aca8cb312f5eef03a25e9383fa384d73fc01842a -> probe/017-waituntil`; `ls-remote` then showed the ref at that SHA. No denial. Tree stayed on `chain/017-existing-items-backlog`. |
| 3 | Find the Preview deployment and wait for Ready | `npx vercel@66.2.0 ls --scope hooks-gg` (newest Preview row), `inspect`; poll with a bound of 12 reads, 15 s apart, exit non-zero after 3 consecutive unreadable reads | state Error/Canceled, or no deployment after the bound: outcome **not readable** (row 7) | Reads at 04:55:27Z (Building, 8 s), 04:55:47Z (Building), 04:56:07Z (**Ready**, build 32 s). Deployment `dpl_3uSQzQSbhHnwacfAMut5PQggNfv5`, `https://hooks-gg-website-j8roqbrco-hooks-gg.vercel.app`; deployments API: `readyState READY`, `target` null (a Preview), branch `probe/017-waituntil`, commit `aca8cb312f5eef03a25e9383fa384d73fc01842a`. The `vercel.json` build override built on Vercel. |
| 4 | Request `with` once | `npx vercel@66.2.0 curl "/api/waituntil-probe?id=with-<UTC stamp>" --deployment <URL>`, status recorded | 401/403 (protection) or non-200: not readable (row 7) | Request id `with-20261119T045623`: HTTP body `{"mode":"with","id":"with-20261119T045623"}` (the CLI's curl printed 43 bytes; the status code was not printed separately, the body is the route's 200 JSON). The function's control line is stamped 04:56:30.171Z. **Side effect, see "Side effect" below**: `vercel curl` created a project bypass secret on this call. |
| 5 | Request `without` once | same with `&mode=without` and `id=without-<UTC stamp>` | record only (H-2); not a gate | Request id `without-20261119T045623`: body `{"mode":"without","id":"without-20261119T045623"}`; control line stamped 04:56:35.682Z. |
| 6 | Wait ≥ 30 s, then read the runtime logs | `npx vercel@66.2.0 logs -p hooks-gg-website --scope hooks-gg --deployment <URL> --json -n 1000 -s 20m` (flags checked against `logs --help`); the capture to `verification/017/m5-0/devops/`; classify per D-19 on the `with` token | control line absent: not readable; control present, post-response absent: **not kept alive** (a failure, M5 and M6 stop); both present: **kept alive** | First read 04:56:45Z (22 s after the `with` request began, earlier than this row's 30 s; the 5 s line was already present, so the shorter wait cost nothing; disclosed): 3 records. Second read 04:57:34Z, `-s 30m`: the same 3 records, summary `recordsReturned 3`, no excluded interval, no further page. Classification in "Outcome": **kept alive**. Captures `probe-runtime-logs-first-run.jsonl`, `probe-runtime-logs-second-read.jsonl`. |
| 7 | One repair and re-run, only for a not-readable first run | state the cause first; repair inside the approved push (a new commit on the probe branch from the implementer, or a bypass via `vercel curl`); push the same ref; repeat rows 3–6 | a second not-readable run goes to him; no further repair | Not run: the first run was readable and classified (no repair owed). |
| 8 | Delete the probe branch after the read | `git -C website push origin --delete probe/017-waituntil`; `git -C website branch -D probe/017-waituntil`; `git ls-remote` empty; the Preview deployment is left to Vercel's retention (a deployment is not a branch; deleting it is not asked) | | 04:57:41Z: `git push origin --delete probe/017-waituntil` (`[deleted]`), `git branch -D probe/017-waituntil` (ok); `ls-remote --heads origin 'probe/*'` count 0 (`grep -c .`); `rev-parse --verify` of the local ref exit 1. The Preview deployment remains. |

## User Confirmation

Asked in this session by selection prompt (the prompt gate flag `~/.claude/state/prompt-gate-off` absent), after the options were tested by a refuting helper and the pre-push reads above. Before the ask I re-read the plan's Decisions Register (D-15, D-19) and the chain's rulings file; neither answers the push itself (D-15: "the probe push is not approved by this answer").
- Presented: push `probe/017-waituntil` at `aca8cb3`, run the test, record, delete the branch; one repair under the same approval (D-19). The options named what was read and what was not (GitHub-side automation, preview protection, a Vercel build).
- Response: **"Agent: push the probe and run the test (Recommended)"**, on 2026-11-19T04:55Z (first command of the runbook at 04:55:12Z). Authorizer: the owner.
- Second prompt (a side effect, below): "Agent: revoke the bypass secret I created (Recommended)", answered after the 04:57:41Z deletion; executed 04:58–04:59Z.

## Release Execution

Mode A. No release; no serving ref moved. The only ref moved was the probe ref: created at `aca8cb3` 04:55:17Z, deleted 04:57:41Z (runbook rows 2 and 8). The website `master` stayed at `1ad625e` (`ls-remote` at 04:52Z; not moved by any command here). Serving state is not a question for a probe: the deployment's evidence is the push (ref, SHA, time) and the deployments API row above.

## Side effect — a project bypass secret created by `vercel curl`, and its revocation

- What: the row-4 command `vercel curl … --deployment <URL>` printed "Added a Protection Bypass for Automation secret to project prj_nhlL7VUS0C9BzgD1Kvh3E1AUv72r. It stays on the project until you revoke it." I had read `vercel curl --help` ("automatic protection bypass") but not that it writes a project setting; it is a defect in my pre-run read of the instrument, not an owner-approved act.
- Read after: `GET /v9/projects/<id>` (`protectionBypass` field, secret never printed): one entry, scope `automation-bypass`, created 2026-11-19T04:56:28.872Z, `isEnvVar: true`. Whether the project held a bypass entry before the request: **not established** (not read before).
- Put to him as a second selection prompt; he chose to revoke. Revoked with `vercel project protection disable <project> --protection-bypass --protection-bypass-secret <secret>` (CLI output: `"protectionBypass": false`), the secret substituted out of the printed output. Read back at 04:59Z: `protectionBypass` entries 0; `vercel env ls` lines matching `AUTOMATION_BYPASS` count 0.
- No other Vercel setting was written by this session. The reads were `env ls`, `api GET`, `ls`, `logs`.

## Outcome

**kept alive.** For the `mode=with` request the function wrote both lines under one request id (`2t9kz…`): `probe-control` at 2026-11-19T04:56:30.171Z and `probe-post-response … elapsedMs=5006` at 04:56:35.177Z, 5.006 s after the response began, on deployment `dpl_3uSQzQSbhHnwacfAMut5PQggNfv5` (preview, branch `probe/017-waituntil`, commit `aca8cb3`, runtime `nodejs24.x`, region `pdx1`), read with `npx vercel@66.2.0 logs … --deployment <URL> --json`. D-19: only "not kept alive" is a failure; this is not one. Gate M5-0 limb 2 is met; with limb 1 (AN-4, met), M5 and M6 code may start.

- H-2 control (`mode=without`, request id `kppt6…`): `probe-control` at 04:56:35.682Z; **no** `probe-post-response` line in either read, the second at 04:57:34Z, 54 s after its response. The same timer not handed to `waitUntil` did not produce its line within that read; what it would do on a later invocation of the same instance was not read.
- The first real members of the M5-f prefix query on a Preview deployment: 3 records, `level: error`, `stream: stderr`, `source: function`, `environment: preview` — the instrument (`--deployment`, no `-e`) returned them without the `-e production` that QA's B-7 read used.
- Node: runtime observed `nodejs24.x`, satisfying `@vercel/functions` `engines.node >= 20`.
- What this does not establish: behaviour under the production project's load, with a real generator call, or a post-response promise lasting up to T = 40 s (the probe's was 5 s). The M5-f window is the plan's, not this probe's.

## Post-Release Status

Status Active (a probe record, not a plan release). Known issues: the Preview deployment `dpl_3uSQzQSbhHnwacfAMut5PQggNfv5` remains until Vercel expires it (deleting a deployment was not asked; the route is live at its URL, protected state not established). Rollback: nothing to revert; the branch is deleted. Scratch removed: the two exports and the install under the session scratchpad, the `vc` working directory. Local scratch commits `d9030b9` and `aca8cb3` are now unreachable from any ref (the branch was deleted as the plan requires); they are named here and in `verification/017/m5-0/README.md` and remain in the object store until git prunes.

Next Actions: none with a trigger at or after this record's closure; no handoff is owed. Routing: `implementer-hooks-017` (M5 and M6 code may start on gate M5-0), naming this document.
