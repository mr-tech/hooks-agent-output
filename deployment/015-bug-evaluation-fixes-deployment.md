---
ID: 015
Origin: 015
UUID: 861e5f61
Status: Active
Status-Detail: "Stage 1 done: chain 015 is committed on chain/015-bug-evaluation-fixes in website (b96e364) and preview-image-generator (8de2b53); nothing pushed, nothing merged. Stage 2 (release) waits on the owner's approval of the release itself, asked by devops-hooks-015."
---

# Deployment Record: Plan 015 — Bug-evaluation fixes

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-08T21:31 | steering-hooks-015 (brief `devops-hooks-015-brief.md`; UAT f91b266) | Stage 1 on UAT approval | Gates re-derived (below). Post-deploy handoff and RK-8 handoff minted. Chain documents closed as Committed. No push, no merge. |

## Plan Reference

- Plan: `planning/015-bug-evaluation-fixes.md`, Revision 29 (row d4fabe4); closed to `planning/closed/` at Stage 1 as Committed.
- UAT: `uat/015-bug-evaluation-fixes-uat.md` (agent-output f91b266, log restore 032504b): `Status: UAT Complete`, `Release-Decision: APPROVED FOR RELEASE`, `Verified-At: "b96e364,8de2b53"`.
- QA effort-final: `qa/015-bug-evaluation-fixes-effort-final-qa.md` (agent-output 3cab676): `Status: QA Complete`, `Verified-At: "b96e364,8de2b53"`. The per-milestone QA passes are separate documents under the same ID.
- Code review: `code-review/015-bug-evaluation-fixes-code-review.md`, `Verdict: APPROVED_WITH_COMMENTS`; its latest sub-entries APPROVE website b96e364 (c878f4a) and the generator at 8de2b53 (Round 18 sub-entry). Its frontmatter still said `Status: In Review`, read in full before closing.

## Release Identifier and Target

Not assigned. Neither repository carries a version artefact; the identifier is the SHA on each serving ref that Stage 2 moves (devops.md Phase 2C step 2). Targets (plan "Target Release"): website `master` → the chain's merge SHA (Vercel production); preview-image-generator `prod` → the chain's merge SHA (`prod.yml`). project-utils ships nothing (plan X-1).

## Repositories and SHAs: committed state (Stage 1)

| Repository | Chain branch | Tip | Base | Commits | Worktree |
|---|---|---|---|---|---|
| website | `chain/015-bug-evaluation-fixes` | `b96e364` (2026-11-08T14:35:08Z) | `7ce866b` = `origin/master` | 57 | clean (`git status --porcelain`, 0 lines) |
| preview-image-generator | `chain/015-bug-evaluation-fixes` | `8de2b53` (2026-11-08T09:40:15Z) | `471578f` = `origin/prod` | 4 | clean (0 lines) |
| project-utils | none | `749606d` = `origin/master` | | 0 | clean |

Both chain tips equal the SHAs in the UAT and QA `Verified-At` fields. `git merge-base --is-ancestor` of base on tip holds in both repositories, so each release is a fast-forward of the serving ref. The commits are already on the chain branches (implementer), so no Stage 1 commit was made.

## Pre-Release Verification (Stage 1)

- **UAT and QA.** Read in full, at the SHAs above (table in Plan Reference). The QA document carries `Verified-At: "b96e364,8de2b53"`, recorded here. That is a per-plan verdict; the binding freshness check is release-level, at Phase 2A against the assembled tip, and a stale per-plan SHA is not by itself a defect.
- **Blocking-condition register (Stage 1 step 2b).** One register: `qa/015-bug-evaluation-fixes-qa.md`, with UAT's copy in its document. Terminal states, read from the UAT document: B-1, B-2, B-4, B-5, B-9, B-10, B-11 (both legs), B-12, B-13, B-14 `EXECUTED` PASS at website b96e364 (B-1's base red not reproducible, UAT-6); B-3 `WITHDRAWN` (rev 21, D30, the owner's ruling 07:26Z); B-15 `SUPERSEDED` by B-8's D36 limb. B-6, B-7, B-8 are post-deploy-observable and do not block. No pre-release row is unterminated, and the UAT document exists.
- **Post-deploy carrier.** `handoff/bug-evaluation-fixes-post-deploy-2026-11-08.md` (B-6, B-7 with QA's live-schema residual, B-8 with B-15's signal). The readers are stages (uat; devops for B-8) and not scheduled headless runs, so no crontab line or launcher brief is installed, and none is recorded.
- **Release consistency (Core Responsibility 3).** No `version` field in either `package.json` (`grep -m1 '"version"'` returns nothing on the chain tips); no CHANGELOG or HISTORY file is tracked in either repository. Cross-repo references: website `package.json` names `project-utils` as `github:hooks-gg/project-utils#master`, and `pnpm-lock.yaml` resolves it to `749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f`, which equals `git ls-remote origin refs/heads/master` of project-utils. The chain's diff `7ce866b..b96e364` changes neither `package.json` nor the lockfile (empty `git diff --stat` on both). The generator's four commits change `ecosystem.config.js` (`kill_timeout` 5000 → 12000), `src/config.ts`, `src/generateImage.ts`, `src/getPool.ts` and `src/server.ts`; the lockfile is untouched, so generic-pool stays at 3.9.0.
- **Tracked build output.** `git ls-files` over `dist|build|.next` returns 0 in both repositories.
- **Uncommitted work.** None in scope (worktrees clean, above).
- **Packaging integrity** (build re-run at the assembled tip) is Phase 2A's and has not been run.

## Deploy Mechanisms (read at the files, 2026-11-08)

| Repository | Serving ref | Mechanism | Read |
|---|---|---|---|
| website | `master` | A push to `master` is deployed by Vercel. No workflow file exists for it. | re-derived: `git ls-tree -r --name-only` over `.github` is empty on `origin/master` and on the chain tip, and `website/.github/workflows` is absent on disk (the directory holds only an untracked, ignored `prompts/` folder). That Vercel is wired to `master` is the architecture record's statement (`system-architecture.md` line ~145) and the owner's, accepted as written, a named risk about what builds; it is not read from Vercel. |
| preview-image-generator | `prod` | `prod.yml`: `on: push: branches: [prod]` and `workflow_dispatch`; runs on a self-hosted runner; `actions/checkout@v3`, Node 18, `npm ci --omit=optional` when the `node_modules` cache misses, writes `.env`, `npm run build`, then `.github/deploy.sh` (copies the tree to `/usr/local/bin/$APP_NAME/deployed/$ENV`, `pm2 startOrReload ecosystem.config.js --update-env`, `pm2 reset`, `pm2 save`). The `preview` branch was deleted (rulings 05:26Z); `preview.yml` stays in the tree and nothing triggers it. | re-derived at the files. The workflow prints a plaintext API key in `prod.yml`; the value is not recorded here (handoff `preview-image-generator-api-key-in-workflow-files-2026-11-08.md` carries the finding, X-12). |

## Host facts read at Stage 1 (generator, over the standing `claude-ro` alias, reads only)

Capture: `verification/015/devops-stage1-host-read-2026-11-08T2128Z.txt` (host `date -u` 21:28:21Z).

- **Root PM2 daemon's Node version: 18.17.1.** `pm2.log` "Node.js version" lines: 2023-08-22T01:57:28, 2024-06-15T11:55:55, 2026-08-23T04:17:40 (the last is the daemon start the running generator belongs to). `/usr/bin/node` on `claude-ro`'s PATH is also v18.17.1 (security's read); the daemon's own interpreter is read from `pm2.log`, not from its `/proc` entry. This agrees with security's record.
- **Deployed ecosystem's `kill_timeout`: 5000, not 12000.** `deployed/prod/ecosystem.config.js` line 25 reads `kill_timeout: 5000` with `shutdown_with_message: true`. The brief's "12000 per the record" is the chain tip's value (`git diff 471578f 8de2b53 -- ecosystem.config.js`: 5000 → 12000); the deployed file is the pre-chain tree. The host file is the pre-chain tree; the push replaces it. Which window the transition stop runs under (the old process's stop at the push's startOrReload) is the plan's V-3 claim, that the new 12000 ms applies to it; it is not read from the host, and the run-2 read of stop (1) shows it. Either window ends in a SIGKILL of the old process, which the plan predicts and does not count as a refutation.
- **Running generator.** One process, `node .../deployed/prod/dist/server.js`, user root, started `Sun Aug 23 04:18:19 2026` (`ps -eo lstart`, read 2026-11-08T21:28Z). The deployed directory's mtime is 2023-08-22, which is its last file addition, not the last process start. That is the date to cite for any browser `ps` line: none was cited or read here.
- **PM2 logs.** `/etc/.pm2/logs/hooks-image-preview-generator-prod-error.log`: 110 lines, last written 2026-11-08T17:27:00Z; `...-prod-out.log`: 8,874,898 bytes, last written 2026-11-08T21:11:04Z. The preview app's two logs are last written 2023-08-20. The error log's last-write time is a Stage 2 baseline to compare at the read after the push; its contents were not read, since the log is not printed wholesale.

## Open items for Stage 2

- Phase 2A: release-tip QA verdict against the assembled tip (the merge result), packaging build at the tip, serving-ref ordering, `release-move.js --dry-run` re-run for website `master` and generator `prod` (the 04:37Z verdicts are stale), the readiness block per repository, the execution mode.
- The analyst's `pig-host-read.sh` "Created instance" extension (QAF-8) before run 2: the plan batch marks it discharged at rev 7/8 (`Created instance` primary, `POST /generate` secondary); the script's text is re-read at 2A before it is relied on.
- The release notes carry one conditional line (UAT-6, the phantom `AAAA…` server).
- The owner's release approval, the second production deploy (D19, `prod.yml` re-run), and `push-commands`, the F-2 check and the M7-a Discord check as owner steps (plan M9).

## Phase 2A: Release Readiness (devops-hooks-015)

Stage 1 is committed (agent-output 190e2c3, 69b5beb). This section is Phase 2A. Tree states are read at the time stamped; serving refs are read at the remote (`git ls-remote origin`, 2026-11-08T21:33Z).

### Readiness checks

| Step | Result |
|---|---|
| 1. Every plan for the release is Committed | One plan (015). `planning/closed/015-bug-evaluation-fixes.md` is `Status: Committed` (69b5beb). The roadmap does not exist (`agent-output/roadmap` holds only `.gitkeep`, per the plan); no release tracker to update. |
| 2a. Assemble the release tip | Both releases are fast-forwards of the serving ref (base is an ancestor of the chain tip; `release-move.js` checks `ff-from-remote`). There is no merge result: the assembled tip of each repository is its chain-branch tip, website `b96e36497d55075ae15753f99ec4148bf4ea60e8` and preview-image-generator `8de2b5337179623f7fbd82904221078c2930214a`. |
| 3. Release-tip verdict | The assembled tips are the commits the effort-final QA verified: `qa/closed/015-bug-evaluation-fixes-effort-final-qa.md`, `Verified-At: "b96e364,8de2b53"`, `Status: QA Complete`, suite 1130/1130, vitest exit 0, typecheck exit 0. The tree under verdict is the tree that ships, because no merge, rebase or squash separates them: each tip is its own `Verified-At` commit, so the identity is the SHA itself. The workspace carries no gated time-based set (`agent-output/CLAUDE.md` names none), so no further request to QA is owed. QA's Phase 3 release-tip document is therefore not requested; if the owner or steering holds a different reading, the release waits on it. |
| 4. Release consistency | Done at Stage 1 (above): no version fields; project-utils pin `749606d` = project-utils `master` head; neither `package.json` nor lockfile changes in the chain. |
| 4b. Populations re-derived at the mechanism | Consumers of project-utils: the lockfile line above (website). The chain ships no project-utils change. Serving refs: website `master` only (`release-move.js` serving list; the other remote branches `backup`, `external`, `redesign`, `regex-re` are not serving refs); generator `master` and `prod`. |
| 5. Packaging at the tip | Re-run from `git archive` exports of the two tips in the scratchpad (not the shared trees). Website: `next build` (the package script and Vercel's command; Next 16.1.6, Turbopack), exit 0, compiled successfully (`verification/015/devops-2a-website-build-b96e364.txt`; node v24.14.0 on this box, `node_modules` copied from the shared tree). Generator: `PUPPETEER_SKIP_DOWNLOAD=1 npm ci --omit=optional` exit 0 and `npm run build` (`tsc -b && rimraf dist && cp -r build dist`) exit 0, 8 files in `dist` (`devops-2a-generator-build-8de2b53.txt`; node v24.14.0, npm 11.9.0). The host builds under Node 18 with its own `npm ci`; this box's Node differs from the host's, and the chain changes no lockfile or package-manager file, so the install-under-the-host's-major check is not triggered. The Node 18 build itself is not run here; `prod.yml` runs it on push. |
| 6. Workspace | Both worktrees clean (`git status --porcelain`, 0 lines, 21:3xZ). Exclusions a predecessor declared: none that touch a release mechanism (no tracked build output; `release-move.js` reports "untracked 0 path(s) left alone"). The `.next/dev/types` artefact the plan discussed is git-ignored and untouched. |
| 7. History not rewritten | Both verified SHAs are the chain-branch tips and are reachable (`git cat-file -e`, `git merge-base --is-ancestor <base> <tip>` holds in both). |
| 8. Execution mode | **Mode A, agent-executed.** Branch moves go through `release-move.js`; the D19 re-run is a `gh workflow run`. The sanction for each production act is the owner's, asked from this session (Phase 2B); run as a subagent this would be Mode B. |
| 10. Serving refs on one line | website: `master` only. Generator: `prod` 471578f → 8de2b53 leaves `master` 87dcb41 behind it (`release-move.js` dry-run: "sibling serving refs (master) on one line ok"). No split. |

Dry runs, both exit 0, "every check passed; nothing moved": `verification/015/devops-release-move-dry-run-2026-11-08T2133Z.txt`. The 04:37Z scoping-time verdicts are stale and were re-run.

### Open disagreements with predecessor documents (9b)

1. The brief's "deployed ecosystem `kill_timeout` 12000 per the record" does not match the host: the deployed file reads 5000 (host read 21:28Z). 12000 is the chain tip's value; the plan's V-3 says it applies to the transition stop. Not a verdict-binding disagreement.
2. The plan's M8-0 text says `pig-host-read.sh` "gains" the `Created instance` and `POST /generate` reads before run 2, written by the analyst and reviewed by code review. The committed script has neither (`grep -c 'Created instance' pig-host-read.sh` returns no match at agent-output HEAD). So the extension is **not written**. This blocks B-8's run 2, not the push; it is raised to steering as a spawn cue. The liveness precondition (critic L-C3-1) is already met on the host: the production out log holds 339 `Created instance` lines (baseline read below).
3. The plan's Exclusions/Validation prose has not been re-statused for the D39/D40 outcome (the planner's batch row says the next planning pass does it); the plan is closed, so that row's carrier is `handoff/upload-message-dialog-closes-on-first-portal-load-2026-11-08.md`.

No verdict is requested while 2 stands; it does not gate the release act.

### Re-derivation of operational text, per repository

| Repository | Deploy mechanism | Rollback | Ordering | Serving refs |
|---|---|---|---|---|
| website | **re-derived:** `release-move.js` reports no push-triggered workflow; `.github/workflows` is absent on disk and `git ls-tree` over `.github` is empty on `origin/master`. That Vercel builds `master` is the architecture record's and the owner's statement, **accepted as written (named risk: what Vercel builds is not read from Vercel)**. | **re-derived (patch check):** `git diff --binary 7ce866b b96e364 \| git apply --check -R` against the tip export, exit 0 (the reverse applies cleanly). The reversing act is a revert commit pushed by `release-move.js`, or Vercel's promote of the previous production deployment (**accepted as written**: the owner's console; not run). | The plan names none between the two repos; M9 lists website first. The website change does not depend on the generator change (`git diff -G'PREVIEW_IMAGE|/generate|API_KEY|nonce' --numstat 7ce866b b96e364 -- src ':!src/**/__tests__/**'` lists no file, so no non-test line naming the generator's URL, route, key or nonce changed; the order itself is the plan's M9 order, **accepted as written**). | `master` 7ce866b |
| preview-image-generator | **re-derived:** `prod.yml` read at the file (push to `prod`, `workflow_dispatch`, self-hosted runner, `npm ci --omit=optional` on a cache miss, `npm run build`, `.github/deploy.sh`: copy to `deployed/$ENV`, `pm2 startOrReload ecosystem.config.js --update-env`, `pm2 reset`, `pm2 save`). | **re-derived (patch check):** `git apply --check -R` of `471578f..8de2b53` against the tip export, exit 0. The reversing act is a revert pushed to `prod`, which is a third deploy and stops the running process again. | After the website, per M9. The transition stop and the verifying stop follow the push in that order. | `prod` 471578f, `master` 87dcb41 |

### Host baseline read before the push (read-only, `claude-ro`, 2026-11-08T21:35Z)

Capture: `verification/015/devops-prepush-baseline-host-read-2026-11-08T2135Z.txt`. Predictions are the plan's and the QA register's.

| Read | Prediction | Live value |
|---|---|---|
| D36 line in the PM2 error log (`grep -cF`) | 0 (the line does not exist before the chain) | 0; the file has 110 lines, mtime 2026-11-08T17:27:00Z |
| D36 line in the out log | 0 | 0 |
| `Server received` in the out log | 0 (no shutdown handler before M8; run 1 read 0) | 0 of 180,481 lines |
| `Created instance` in the out log (the figure's liveness, L-C3-1) | non-zero | 339 |
| `POST /generate` in the out log | non-zero | 16,771 |
| `pm2.log` last stop | 2026-06-15T10:02:36 `Stopping app`, 10:02:41 `still alive after 5000ms`, SIGKILL | as predicted (run 1) |
| Generator process | one, started 2026-08-23 04:18:19 | `pid 1071971`, same start |
| Chromium with ppid 1, not crashpad | 0 | 0 |

### Runbook (one ordered artifact; results blank until executed)

Every act below is Mode A and runs only after the owner's release approval (Phase 2B). A read here is read-only over `claude-ro`. A poller exits non-zero after 3 consecutive unreadable reads, and that exit is a stop. Serving state is evidenced by the push (devops.md, "Deploy evidence"), not by these reads; the reads belong to the B-8 / RK-3 / RK-5 rows.

| # | Step | Command | Abort criterion | Result |
|---|---|---|---|---|
| R1 | Baseline reads | above | any live value contradicting its prediction: stop, report | done 21:35Z, all as predicted |
| R2 | Re-run the two dry-runs immediately before R3 | `node ~/.claude/tools/release-move.js website master b96e364 --dry-run` and the generator form | any refusal | |
| R3 | Move website `master` (owner-approved) | `node ~/.claude/tools/release-move.js website master b96e364` | exit not 0; record exit and state | |
| R4 | Switch the website tree back onto `master` | `git -C website status --porcelain` must be empty, then `git -C website checkout master` | a non-empty status: stop, route to the owner | |
| R5 | Record the website push: ref, SHA, time | `git -C website ls-remote origin refs/heads/master` | remote ≠ b96e364 | |
| R6 | Re-baseline the generator logs (the error log's line count and mtime, the D36 count) | the same read as R1, 3 minutes before R7 | any change from R1 other than log growth | |
| R7 | Move generator `prod` (owner-approved; the transition stop begins) | `node ~/.claude/tools/release-move.js preview-image-generator prod 8de2b53` | exit not 0 | |
| R8 | Switch the generator tree back onto `prod` | as R4 | as R4 | |
| R9 | Record the push | `git -C preview-image-generator ls-remote origin refs/heads/prod` | remote ≠ 8de2b53 | |
| R10 | Read the transition stop in `pm2.log` and the app's return | fixed greps for `Stopping app`, `still alive`, `SIGKILL`; 60 s apart, at most 15 reads | no new `Stopping app` line and no online app after 15 reads: report to steering and the owner (rollback is the owner's call) | |
| R11 | Owner approval of the second deploy (D19) | asked in this session before R12 | declined: record it, leave run 2 undone | |
| R12 | Re-run `prod.yml` | `gh workflow run prod.yml --repo hooks-gg/preview-image-generator --ref prod` | gh refuses or the classifier denies it: report, never retry in other words | |
| R13 | B-8 run 2 | the extended `pig-host-read.sh`, as `claude-ro`, anchored on stop (2) | the script is not yet extended or reviewed: do not run; report | |
| R14 | Owner steps after the website release | `push-commands` (M7-a), the F-2 check, the M7-a Discord check | | |
