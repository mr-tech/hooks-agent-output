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
- **Deployed ecosystem's `kill_timeout`: 5000, not 12000.** `deployed/prod/ecosystem.config.js` line 25 reads `kill_timeout: 5000` with `shutdown_with_message: true`. The brief's "12000 per the record" is the chain tip's value (`git diff 471578f 8de2b53 -- ecosystem.config.js`: 5000 → 12000); the deployed file is the pre-chain tree. So the transition stop at the first push still runs under the old 5000 ms window, which agrees with the plan's prediction that stop (1) shows a SIGKILL.
- **Running generator.** One process, `node .../deployed/prod/dist/server.js`, user root, started `Sun Aug 23 04:18:19 2026` (`ps -eo lstart`, read 2026-11-08T21:28Z). The deployed directory's mtime is 2023-08-22, which is its last file addition, not the last process start. That is the date to cite for any browser `ps` line: none was cited or read here.
- **PM2 logs.** `/etc/.pm2/logs/hooks-image-preview-generator-prod-error.log`: 110 lines, last written 2026-11-08T17:27:00Z; `...-prod-out.log`: 8,874,898 bytes, last written 2026-11-08T21:11:04Z. The preview app's two logs are last written 2023-08-20. The error log's last-write time is a Stage 2 baseline to compare at the read after the push; its contents were not read, since the log is not printed wholesale.

## Open items for Stage 2

- Phase 2A: release-tip QA verdict against the assembled tip (the merge result), packaging build at the tip, serving-ref ordering, `release-move.js --dry-run` re-run for website `master` and generator `prod` (the 04:37Z verdicts are stale), the readiness block per repository, the execution mode.
- The analyst's `pig-host-read.sh` "Created instance" extension (QAF-8) before run 2: the plan batch marks it discharged at rev 7/8 (`Created instance` primary, `POST /generate` secondary); the script's text is re-read at 2A before it is relied on.
- The release notes carry one conditional line (UAT-6, the phantom `AAAA…` server).
- The owner's release approval, the second production deploy (D19, `prod.yml` re-run), and `push-commands`, the F-2 check and the M7-a Discord check as owner steps (plan M9).
