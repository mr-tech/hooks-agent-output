---
ID: 015
Origin: 015
UUID: 861e5f61
Status: Released
Status-Detail: "Released 2026-11-08: website master b96e364 (pushed 21:38:22Z), preview-image-generator prod 8de2b53 (pushed 21:38:42Z, deployed 22:02Z, re-run 22:04:49Z). Owner-authorized (21:38Z). B-8 EXECUTED PASS; B-6 and B-7 are post-deploy and ride handoff/bug-evaluation-fixes-post-deploy-2026-11-08.md."
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
| 2026-11-08T22:11 | devops-hooks-015 (Stage 2) | Phase 2D | Status: Released (was Active). Release executed, run 2 read, plan and release-tip QA record Released, obligations lodged, forward items carried. Moved to closed/. |
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

## Phase 2B: User Confirmation

- **Summary presented** (selection prompt in devops-hooks-015's own session, as the role-internal ask): release identifier = the SHA on each serving ref moved; plan 015; environment production; website `master` 7ce866b → b96e364 (Vercel) and preview-image-generator `prod` 471578f → 8de2b53 (`prod.yml`); both fast-forwards; dry-runs, tip builds and reverse-patch checks passing; the generator push stops the running process; the D19 re-run described as a separate later step.
- **Response, by selection, 2026-11-08T21:38Z:** release approval: "Yes, release both (Recommended)". D19 re-run: "Yes, approve it for later" (it runs only after the run-2 script extension is written and reviewed). The authorizer is the owner. The prompt's option texts are this stage's.
- Mode: A, agent-executed.

## Release Execution (Phase 2C, Mode A)

Log: `verification/015/devops-2c-release-execution-2026-11-08.txt`. Authorizer: the owner (Phase 2B above). Release identifier: the SHA on each serving ref moved.

| Repository | Ref | From | To | Pushed (release-move.js) | Read back |
|---|---|---|---|---|---|
| website | `master` | 7ce866b | `b96e36497d55075ae15753f99ec4148bf4ea60e8` | 2026-11-08T21:38:22Z, exit 0 | `git ls-remote origin refs/heads/master` = b96e364 at 21:38:29Z; tree on `master`, clean |
| preview-image-generator | `prod` | 471578f | `8de2b5337179623f7fbd82904221078c2930214a` | 2026-11-08T21:38:42Z, exit 0 | `ls-remote` prod = 8de2b53, master = 87dcb41 (behind, on one line) at 21:38:52Z; tree on `prod`, clean |

Both dry-runs were re-run immediately before each move (R2, R7) and passed. `release-move.js` switched each tree onto the moved branch itself ("tree on master", "tree on prod"), so runbook rows R4 and R8 are discharged by its output and the status reads (0 lines).

**Deploy evidence.** The two pushes are the deployment: website `master` (Vercel) and generator `prod` (`prod.yml`), refs and SHAs above.

**R10, the transition-stop read (read-only, `claude-ro`; the B-8 / RK-3 row, not a confirmation of serving state).** A bounded poll read the PM2 daemon log every 60 s for 15 reads, 21:39Z to 21:53Z (`verification/015/devops-2c-r10-transition-stop-read-2026-11-08.txt`). Prediction: a `Stopping app` line for the push's `startOrReload`, then `still alive` and a SIGKILL, then a new process. **Read: none of it.** No `pm2.log` line is dated 2026-11-08 after 04:17:40Z, and the generator process is unchanged (pid 1071971, started Sun Aug 23 04:18:19 2026). A further read at 21:54:44Z: `deployed/prod` and `dist/server.js` still carry mtime 2023-08-22, and the deployed `ecosystem.config.js` still reads `kill_timeout: 5000`. So at that minute 16 minutes after the push, the host shows none of the workflow's deploy steps (`deploy.sh` removes and recreates `deployed/prod` before its `pm2 startOrReload`). This is a reading, not a failure verdict: the runner's state is not read and is not carried as an open check. It means **B-8 has no stop to anchor on yet**.

**D19 (the `prod.yml` re-run) is held, not run.** Two reasons:
1. The re-run is defined to cause stop (2), the first stop of a process running the M8 commit, after stop (1) has happened (plan M8-0 "The two stops", RK-6). With no stop (1) on record, a re-run would queue behind or beside the push's own run and the two stops could not be told apart.
2. The mechanism does not work from this session: `gh api repos/hooks-gg/preview-image-generator` and `gh run list --workflow prod.yml` both return HTTP 404 for the authenticated account (`mr-tech`), so `gh workflow run` cannot dispatch it. The dispatch would be the owner's act in the GitHub UI (Mode B for that one act) or a token with access, which is his to supply.

The owner's approval of the re-run (2026-11-08T21:38Z, "Yes, approve it for later") stands for when stop (1) exists. The approved read instrument for run 2 is `verification/015/pig-host-read.sh` at agent-output f616d83 (code review f83fb09; CR-41, CR-42 resolved). Code review also asks for two checks when the run-2 capture is read: that [2] and [3] print `+0000` mtimes (D23), and that [4]'s prod `Stopping app` count is 4 (the push and the re-run each add one; if the push's `startOrReload` writes no such line, [6] has no stop (1) — code review's Assumption Not Checked, closed here at run 2).

### Stop (1) and the generator deploy (read 2026-11-08T22:03Z)

The generator's deploy ran after the owner's statement in steering's session, "runner started. deploy complete" (steering/015-rulings.md, block 22:03Z, a relayed ruling; steering's own reads at 22:02:53Z are re-read here). The push at 21:38:42Z is the deploy evidence; the owner's statement says the workflow ran after he started the runner at about 22:02Z. My own read-only re-read at 22:03:15Z (`verification/015/devops-2c-stop1-read-2026-11-08T2203Z.txt`):

- `deployed/prod/dist/server.js` mtime 2026-11-08 22:02:24Z; the deployed `ecosystem.config.js` now reads `kill_timeout: 12000`.
- `pm2.log`: 22:02:25 `Stopping app:hooks-image-preview-generator-prod id:0`; repeated `failed to kill - retrying in 100ms` through 22:02:37; `Process with pid 1071971 still alive after 12000ms, sending it SIGKILL now...`; `exited with code [0] via signal [SIGKILL]`; restart; `online` at 22:02:38. New process pid 2502940, started Sun Nov 8 22:02:36 2026.
- Counts: `Stopping app:hooks-image-preview-generator-prod` lines in `pm2.log` = 3 (2024-06-15, 2026-06-15, this one). The re-run is to make it 4 (code review's check).
- This is stop (1), as the plan predicts: a SIGKILL at the full window, no shutdown line (`Server received` count 0 in the out log), and **the new `kill_timeout` of 12000 applied to the old process's stop** (the plan's V-3 claim, now read; the 21:54Z claim of 5000 in the host file was the pre-deploy tree).
- PM2 error log: 110 lines, mtime 17:27:00Z, unchanged. The D36 line: 0 in the error log and 0 in the out log, read 31 seconds after the new process started. The final B-8 read of that count is run 2's.
- Chromium with ppid 1 other than crashpad: 0.

The 24-minute gap between the push and the deploy is the runner not running, which the owner then started; it is not carried as an open check. Nothing about it changes the pushed SHA.

**State now.** Stop (2) (the D19 `prod.yml` re-run) has not happened. Its dispatch route is with the owner through steering (UI dispatch, or a credential for this session). Run 2 reads with `pig-host-read.sh` at f616d83 after it.

### Stop (2), M8-0 run 2 and B-8 (executed 2026-11-08T22:05Z)

The owner dispatched `prod.yml` on `prod` in the GitHub UI ("it's ran", relayed by steering; the D19 route he chose). The dispatch is his act; the approval it needed was his (21:38Z). Run 2 used the code-reviewed script `verification/015/pig-host-read.sh` at agent-output `f616d83` (code review f83fb09; identical to HEAD at run time, `git diff --quiet f616d83 HEAD -- <path>`), as `claude-ro` over `hooks-pig`, reads only. Captures: `verification/015/m8-0-run2-2026-11-08T2205Z.txt` and `verification/015/devops-2c-b8-d36-count-2026-11-08T2205Z.txt`.

| B-8 prediction (QA register, rev 28 form) | Read |
|---|---|
| Exactly one `Server received` line naming the trigger on stop (2) | 1: `2026-11-08T22:04:49.988Z Server received shutdown message. Closing server.` (span 3) |
| The drain-complete line | `22:04:49.989Z Drain complete in 1ms.`; `Server closed.` follows |
| Exit before 12000 ms; no `still alive` and no SIGKILL for that stop | exit 0 s after `Stopping app` (22:04:49, +/-1 s), `exited with code [0] via signal [SIGINT]`; the `still alive` / SIGKILL list for the span is empty |
| RK-3: app `online` after the re-run | `online` 22:04:51; new pid 2503931, started Sun Nov 8 22:04:49 2026 |
| RK-5: no Chromium with ppid 1 other than `chrome_crashpad` | count 0 (and 0 Chromium processes at all) |
| D36 limb: `grep -cF 'generic-pool no longer exposes _waitingClientsQueue.dequeue'` over the whole PM2 error log, predicted 0 | **0** in the error log (readable; 110 lines; mtime 2026-11-08T17:27:00Z, unchanged by either deploy) and 0 in the out log, read at 22:05:50Z, after two starts of the M8 build |
| Stop (1) (expected, not a refutation) | span 2: `still alive after 12000ms`, SIGKILL, 12 s (+/-1 s), no `Server received` (the old process had no handler) |

**Checks code review asked for.** [2] and [3] print `+0000` mtimes (D23's UTC assumption holds as read on this host). [4]'s prod `Stopping app` count is 4: the push's `startOrReload` did write a `Stopping app` line (22:02:25), so stop (1) exists and code review's Assumption Not Checked is closed here. [2]'s extract shows `kill_timeout` 12000 and `shutdown_with_message` true.

**What stop (2) does not show.** Span 3 holds 0 `Created instance` and 0 `POST /generate` lines: the process stopped (pid 2502940, up 2 minutes) had served no request and created no pool. So the 1 ms drain-complete figure is an idle drain. The drain of an in-flight render is not observed; that is the plan's P3 idle cell, a stated limit of this read, and the QA register's reading rule for the figure. B-8 as written (one `Server received`, one drain-complete line, exit under 12000 ms, no `still alive`, plus the D36 limb) is met: **EXECUTED, PASS**.

## Phase 2D: Post-Release (devops-hooks-015, 2026-11-08)

### Release metadata

- **Release identifier:** the SHA on each serving ref: website `master` `b96e36497d55075ae15753f99ec4148bf4ea60e8`; preview-image-generator `prod` `8de2b5337179623f7fbd82904221078c2930214a`. No tag, no version (neither package carries one). Plan 015 is the only included plan.
- **Environment:** production. **Authorizer:** the owner (selection in this session, 2026-11-08T21:38Z, release and D19); the `prod.yml` dispatch was his own act in the GitHub UI.
- **Timestamps:** website pushed 21:38:22Z; generator pushed 21:38:42Z; generator deployed 22:02:25Z to 22:02:38Z (stop (1)) after the owner started the runner; re-run stop (2) 22:04:49Z to 22:04:51Z.
- **Plan Status:** `Released` (planning/closed/015-bug-evaluation-fixes.md). **Release-tip QA record:** `qa/closed/015-bug-evaluation-fixes-effort-final-qa.md`, `Released`.

### Deployed reconciled against verified, per repository

| Repository | Deployed ref and commit | Verdict SHA | Same? |
|---|---|---|---|
| website | `master` = `b96e364` (`git ls-remote origin refs/heads/master` at 21:38:29Z; the pushed commit, read from local git, standing as the serving commit on the push) | `Verified-At` `b96e364` (QA effort-final, UAT, code review) | **Yes, identical.** No diff owed. |
| preview-image-generator | `prod` = `8de2b53` (`ls-remote` at 21:38:52Z) | `Verified-At` `8de2b53` | **Yes, identical.** No diff owed. |

For the generator, the tree on the host is `deployed/prod`, which the workflow copies from its checkout. It is read through its effect (server.js and the ecosystem file replaced at 22:02:24Z, `kill_timeout` 12000, the M8 drain lines at stop (2)), not by hashing the host copy. The Vercel build of website `master` is not read; the push is the evidence (devops.md, "Deploy evidence").

### Verify success

- Deploy evidence: the two pushes; for the generator also the owner's "runner started. deploy complete" and the host reads above. Consumers: website's `project-utils` pin is `749606d`, equal to project-utils `master`, and unchanged by the chain. No `fix-` chain is in this release (`grep -l '^Origin: fix-'` over `implementation/` returns none), so no fix branch is merged or deleted. The chain branches `chain/015-bug-evaluation-fixes` in both repos equal their serving refs; they are left in place for the owner's decision.
- Errors: the generator's PM2 error log is unchanged since 17:27:00Z (110 lines); the D36 line count is 0.

### Release notes

The repository carries no changelog file, so the notes live here (UAT's Key Changes, with the one conditional line resolved as UAT-6 left it):
- Messages over 40 components can be built, but show "Message has N components; the limit is 40." and cannot be sent.
- Bad `/preview` links show "Invalid message data." instead of crashing.
- Multi-line code blocks render as blocks; empty embeds are no longer drawn.
- Black embeds keep their colour. The embed footer limit is 2048 and the author name limit is 256.
- The image URL check accepts .jpeg, .webp, upper case and query strings, and refuses .avif and look-alikes.
- The JSON dialog closes on Esc and outside click after a Load.
- discordapp.com message links load.
- Users who administer no server can open their message list; moderators with Manage Server get *Get Message* after `push-commands`. **Conditional line (UAT-6):** at base, such a user was shown a phantom "AAAA…" server; whether production showed it is unestablished, and B-7 reads it. If production showed it, its disappearance is a user-visible change.
- The preview generator drains in-flight renders before a stop (observed at stop (2), idle).
- Operator signal: the line `generic-pool no longer exposes _waitingClientsQueue.dequeue` in the generator's PM2 error log means the pool's failure handler is detached (RK-8).

### Architecture and roadmap obligations

Lodged in the record's `INBOX.md` (devops-hooks-015 entries of 2026-11-08): the two `architecture/` lines this chain touches (`system-architecture.md` § Components, preview-image-generator, the drain line; `preview-image-generator.md` P-3), routed to the architect with the stop (2) evidence; the roadmap obligation (no roadmap exists; no epic criterion moves; released state recorded); and the closing routings below.

### The chain's documents, by frontmatter ID 015 (`node tools/check-repo.js` population)

| Kind | Documents | Terminal token or reason it stays open |
|---|---|---|
| planning | `015-bug-evaluation-fixes` | `Released` |
| critiques | cycles 1 to 8 | `Resolved` (in `closed/`) |
| critiques | cycle 9 | `Open`. Its stated closing condition (L-C9-3 carries a Planner batch row or lands) is met by the plan's row "Discharged"; routed to the critic (INBOX) |
| implementation | m0, m1, m1-m2-qa-findings, m2, m4, m5, m6, m7, m8, qaf34-qaf35-cr26 | `Committed` (in `closed/`) |
| code-review | `015-bug-evaluation-fixes-code-review` | `Committed` |
| qa | effort-final | `Released` |
| qa | main (Phase 1), m0, m1, m1-m2-qa-findings, m2, m4, m5, m6, m7, m8, qaf34-qaf35-cr26 | `Committed` |
| uat | `015-bug-evaluation-fixes-uat` | `Committed` |
| analysis | `...-analysis` (M8-0), `...-upload-dialog-analysis` (D39) | `Active`, questions answered; routed to the analyst (INBOX) |
| architecture | `015-bug-evaluation-fixes-architecture-findings` | `Active`; routed to the architect (INBOX); never closed by devops |
| security | `015-preview-image-generator-security-audit` | `Active`. Its stated closing condition ("devops records the prod push of a SHA this review covers") is met by § Release Execution: prod 471578f → 8de2b53, the reviewed tip; routed to security (INBOX) |
| deployment | this record | `Released` |

### Forward items beyond the register (step 5c)

Found by instrument over the chain's documents: `grep -c 'Assumption Not Checked'` returns matches in 25 of them, and a read-only helper classified the 49 distinct items; the helper's CLOSED classifications were not all re-read (see the handoff). Each remaining item has a carrier:

| Item | Carrier |
|---|---|
| B-6 (Get Message), B-7 (production list; QA's live-schema Assumption Not Checked; the `NEXT_PUBLIC_CDN_PORT` observation), RK-2 and RK-4 falsifiers | `handoff/bug-evaluation-fixes-post-deploy-2026-11-08.md` (B-8 closed there: EXECUTED PASS) |
| RK-8 (generic-pool private field), CR-39, AF-32, L-C9-4, QA's `b21c7b5` item, CR-33/CR-34 residues | `handoff/preview-image-generator-generic-pool-private-field-2026-11-08.md` |
| Eight Assumption Not Checked items no document closed | `handoff/bug-evaluation-fixes-unclosed-assumptions-2026-11-08.md` |
| The plan's Planner-batch row for the D39 analysis (Open) | `handoff/upload-message-dialog-closes-on-first-portal-load-2026-11-08.md` |
| Plan Exclusions X-1 to X-26 | each row's own carrier named in the plan's Exclusions table (stated limits or handoffs; the handoffs it cites all exist and are Open, read at Stage 1) |
| Host posture H-001 to M-002 | `handoff/preview-image-generator-host-security-posture-2026-11-08.md` |
| The plaintext API key in the workflow files | `handoff/preview-image-generator-api-key-in-workflow-files-2026-11-08.md` |
| QA's plumbing-sweep widening (the owner's word needed) | held in `qa/closed/015-bug-evaluation-fixes-effort-final-qa.md`; no run is owed without his word |
| The CR-38 screen-reader observation | a stated limit in the UAT document (no screen reader on this machine); no carrier beyond that document |

Nothing is written here as "closed by this work" that its target record does not carry.

### Post-Release Status

- **Status:** Released. website live on the push (Vercel; the build is not read); generator deployed 22:02Z and re-run 22:04:49Z, B-8 PASS.
- **Known issues:** B-6 and B-7 are post-deploy and open in the handoff above (the owner's `push-commands`; a sanctioned production sign-in of the second test account). The Upload Message dialog does not open on a fresh load in production (pre-existing, 2023 code, not this chain's; handoff above). The generator deployed 24 minutes after the push because the self-hosted runner was not running until the owner started it. The drain of an in-flight render is unobserved (stop (2) was idle).
- **Rollback plan:** website: a revert commit pushed through `release-move.js` (the reverse patch applies cleanly, exit 0), or Vercel's promote of the previous production deployment (the owner's console, not run). Generator: a revert pushed to `prod` and the runner running; that is another deploy with another stop. Both re-derived at Phase 2A.
- **Next actions:** the owner's `push-commands`, F-2 check and M7-a Discord check; B-7's production sign-in sanction. Each has its carrier above.
