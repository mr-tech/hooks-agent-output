---
ID: n/a
Origin: fix-personal-message-access
UUID: 1b613853
Status: Active
Status-Detail: "Stage 1 done and Phase 2A readiness written for website master 787bec5 -> 983681c (a fast-forward). Waiting on QA's Phase 3 release-tip record, then the owner's release approval (Phase 2B). Nothing is pushed."
---

# Deployment Record: fix-personal-message-access

**Plan Reference**: none (fixer chain; the owner's scope selection, `steering/fix-personal-message-access-rulings.md`, blocks 2026-11-19T20:30Z, 22:35Z, amended 22:59Z).
**Stage start**: the QA Phase 2 verdict, `qa/closed/fix-personal-message-access-qa.md`, `Status` `QA Complete` at `Verified-At` `983681c` (refresh after round 5; record `1c88873`), re-read at write time. There is no UAT on a `fix-` chain. Anchors re-read at the record, all at `983681c`: fixer `Handoff-At` (`implementation/closed/…`, record `388f173`), code review Round 2 `Reviewed-At` `Verdict APPROVED` (record `9bd32a4`), security `Reviewed-At` APPROVED with M-001 resolved (record `dfea2f9`).
**Roadmap**: `agent-output/roadmap/` holds only `.gitkeep`; read nothing, cited nothing. The determination names no epic or criterion, so the chain owes the roadmap no entry.
**Release Identifier**: website `master` `787bec5627702d2881b826e596ec2b8f8853c4fa` → `983681ca6cd7cbacd0796ed093e094057ad7f9be`. `package.json` carries no `version` field and the repo has no CHANGELOG and no tags; none synthesised.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-20T00:24 | steering-roadmap-hooks (brief `steering/fix-personal-message-access-brief-devops.md`, spawn cue from security's re-review at `983681c`) | Stage 1 and Phase 2A for `chain/fix-personal-message-access` at `983681c` | Brief and its common part read whole. Stage 1 done: carrier handoff `handoff/fix-personal-message-access-post-deploy-2026-11-20.md` (record `c0ca805`); implementation, code-review and QA documents closed `Committed` (records `4e00eec`, `87352f7`, `1062ae1`). Tip build `next build` exit 0 in an isolated export. Dry run passed; reversing patch applies. QA Phase 3 requested (message `f4dfad51`). Nothing pushed |

## Stage 1 verification (website, at 983681c)

| Check | Result | Instrument |
|---|---|---|
| Tree on the chain branch at the head under release | `chain/fix-personal-message-access`, HEAD `983681ca6cd7cbacd0796ed093e094057ad7f9be`, no upstream | `git branch --show-current`; `git rev-parse HEAD` |
| Nothing in scope uncommitted | website `git status --porcelain`: the one entry is `?? .playwright-mcp/` (screenshots of 2026-11-11, not this chain's; `release-move` lists 17 such paths and leaves them alone). Record: `git status --porcelain -- verification/fix-personal-message-access` 0 lines (the three `?? verification/access-defects/browser-check/*.png` are untracked screenshots by his 09:01Z ruling and belong to another chain) | `git status --porcelain` |
| Chain range | 8 commits `787bec5..983681c` (2e50cd9, d597734, 5d9678d, 12bcd75, 16bf24d, ed88e7c, 75f1543, 983681c); 15 paths, 850 added and 91 removed lines. Production lines added (`git diff --numstat origin/master 983681c -- src ':!**/__tests__/**'`): 123 (MessageProvider 3, message.ts 21, shapes.ts 10, shared.ts 88, auth.ts 1). The fixer's document says 124; the one-line difference is its count method and moves nothing (QA's gate is 20) | `git log --oneline`; `git diff --numstat` |
| Fast-forward onto production | `git merge-base --is-ancestor origin/master 983681c` exit 0; remote `master` = `787bec5` (`git ls-remote origin master`) | exit status; `ls-remote` |
| QA binds the tip | Phase 2 `Verified-At` `983681c`; the tip tree is `68ad814a151b583e8a1e4c0cf76b9937dea60218` (`git rev-parse 983681c^{tree}`), which is the tree that verdict ran against (same SHA) | `qa/closed/…-qa.md` |
| Release consistency | `package.json` has no `version`; no CHANGELOG, no tags. `git diff --name-only origin/master 983681c` outside `src/` prints 0 lines: `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `vercel.json` and `next.config.js` are unchanged. The one cross-repo dependency, `project-utils: github:hooks-gg/project-utils#master`, is locked to `749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f` (`pnpm-lock.yaml` lines 166–168), which is the current remote `master` of project-utils (`git -C project-utils ls-remote origin master`) and the sibling clone's HEAD. The chain changes nothing in project-utils; the pin names the intended target | exit status; `ls-remote` |
| Open disagreements with predecessor documents | none open. Recorded, not disputed: code review's Round 1 error (it listed `getOne`'s owner compare as sound without running it under the race), which Round 2 states itself; the fixer's 124 against the numstat's 123, above | the documents |

## Blocking-condition register (the chain's one register)

Authority: `qa/closed/fix-personal-message-access-qa.md`, "Blocking-condition register", rows B-2 and B-1, both class post-deploy-observable. There is no pre-release row, so none is unterminated. Neither row can reach a terminal state before the release act, and neither blocks it. Both are carried in full, with the owner's residue read (R-1), by `handoff/fix-personal-message-access-post-deploy-2026-11-20.md` (Owning-Stage `uat`, event-form `Review-Trigger`, created at Stage 1, record `c0ca805`). No crontab line: the reader is a uat-role session on the test accounts, which steering spawns after the push, so there is no launcher and no `--smoke`. The code review, implementation and security documents carry no register row of their own.

## Stage 2 readiness (Phase 2A, 2026-11-20T00:24)

Included: chain `fix-personal-message-access` only. Execution mode: **Mode A, agent-executed**, the move run in this session after the owner's answer to the ask put in this session (a role session, not a subagent).

| Step | Result | Instrument |
|---|---|---|
| All chains committed | 1 of 1 (Stage 1 closes the chain's committed documents). The security document stays open under its own closing party, below | — |
| Tip assembled | the chain branch itself, a fast-forward of remote `master`; no merge commit and nothing assembled on a scratch branch | `release-move.js … --dry-run`: "ff-from-remote ok" |
| Release-tip verdict | QA Phase 2 `Verified-At` `983681c` covers the tip (tree `68ad814a…` on both sides). Owed: QA's Phase 3 record (qa-phase-3.md step 1b, the open-handoff sweep, and the gated time-based set), requested 2026-11-20T00:2xZ. _Record path and SHA: blank until it arrives_ | message `f4dfad51` |
| Consistency | see the Stage 1 table | |
| Populations (4b) | website is a leaf deployment. The one pin, project-utils, is unchanged and current (above). No package, subscriber or consumer is changed (`git diff` over the manifests, exit 0). Re-derived at the mechanism: `git diff --name-only origin/master 983681c` | exit status |
| Packaging (build at the tip) | `pnpm exec next build` (Next.js 16.1.6 Turbopack, node v24.14.0, pnpm 10.28.2) in an isolated `git archive` export of `983681c` (tree `68ad814a…`), `node_modules` copied, the Production variable names set to dummy values (no `.env.local` copied, nothing remote written), under `systemd-run --user --scope` caps (900 s, 6 G, 2000 tasks): **exit 0**, "Compiled successfully", 9 static pages generated, 10 app routes and 8 page-router routes plus the proxy listed; 2026-11-20T00:23:39Z to 00:24:00Z. Export deleted (`ls -d` exit 2). The diff carries no lockfile or package-manager change, so the host-major install check does not apply | `verification/fix-personal-message-access/devops/next-build-983681c/{build-output.txt,meta.txt,exit}`, `build-tip.sh` |
| Workspace | all eight chain commits are on the branch; website porcelain as above. Predecessor exclusions: QA's export copied the gitignored `next-env.d.ts`, and `.env.local*`, `.next`, `.vercel`, `node_modules` and the three `tsconfig*.tsbuildinfo` files are ignored (`git status --porcelain --ignored`). None affects a release mechanism: the move is a push of a commit, `release-move` reports "untracked 17 path(s) left alone", and Vercel builds from the pushed tree | `git status --porcelain --ignored`; dry-run output |
| History rewritten | no; the verified commit is the tip and is reachable | `git merge-base --is-ancestor` |
| Serving refs | remote heads: `backup`, `external-message-api`, `master`, `redesign`, `regex-refactor` (`git ls-remote --heads origin`). `release-move --report`: "one serving ref at origin (master); no pair". The split check is trivially met; no ref but `master` moves | `release-move.js --report` exit 0 |

**Assumption Not Checked, swept (Phase 2A step 9b).** Each predecessor's, with what the release form exercises and the read that closes it:
- **Code review** (the session carries the caller's own Discord id in `session.user.id`): security executed it locally (30 of 30 cases at each of `75f1543` and `983681c`, 7 failing at base). Production's values, the real ioredis client and a real Discord sign-in are unread. The release exercises it: the fix is only as good as that identity. Closed by B-2 then B-1 (security's RC-2), `handoff/fix-personal-message-access-post-deploy-2026-11-20.md`.
- **QA** (no production `Messages` row carries both `fk_users_id` and `fk_guilds_id`): same at base, not introduced here. Closed by the owner's residue read, row R-1 of the same handoff, which steering puts to him. It gates no release act.
- **Security** (RC-2; and "what this does not establish", the production values and the HTTP layer of tRPC): the same B-2 and B-1 walk. RC-1 (M-001) is satisfied at `983681c`, so no control gates the push.
- A live session could run none of these before the first ref moves: each needs production, which only the release changes, or the production database, which only he can query.

**Phase 2C block, re-derived against the mechanism (repository: website; only repository shipped):**
- **Deploy mechanism.** Re-derived: `.github/` exists but `.github/workflows` is absent (`ls -d` exit 2) and `release-move` prints "workflows none". `vercel.json` holds only a `crons` entry (configuration, not a trigger; the diff does not touch it). The git-integration deploy is re-derived from an earlier push, not read from the host: chain 017's `verification/017/devops/b11-website-deployments-787bec5.json` shows a Vercel deployment `dpl_37f5wm52P7tqpRaMyPGFtk5cU6h8` with `source: git`, `target: production` and `githubCommitRef: master` created two seconds after that chain's push of `787bec5` (E-WEBSITE-PUSH 2026-11-19T20:11:47Z, the carrier `handoff/017-existing-items-backlog-post-deploy-2026-11-19.md`). **Accepted as written, a named risk**: which commit the integration checks out is its default-ref behaviour. The push is the deploy evidence.
- **Rollback.** Dry-run: `git diff origin/master 983681c` written to a file, `git apply --check -R` on it against the tree at `983681c`, exit 0 (the revert applies cleanly). The owner's established fast path is Vercel promote of the previous deployment (`787bec5`'s deployment `dpl_37f5wm52P7tqpRaMyPGFtk5cU6h8` was `READY` and `isRollbackCandidate` at 017's read); not exercisable from here, so accepted as written. A git rollback is a new revert commit pushed as a fast-forward, which is a new ask. The fix writes no schema and no stored row of its own, so a rollback restores the pre-fix reads and writes; rows written by a collision before the fix are not undone by either direction.
- **Ordering.** Website only. The diff is `src/` only and uses columns that already exist (`fk_users_id`, `fk_guilds_id`); project-utils and its schema are unchanged, and no migration is involved. Order: dry run, the owner's yes, the move, `ls-remote`, then the post-deploy walk, B-2 before B-1. Nothing interleaves with the move.
- **Serving refs.** As in the table: `master` only.
- **A release step that runs a tool the diff changes**: none; the move runs `release-move.js` from `~/.claude/tools/`, which this diff does not touch.

**Runbook (one artifact; the results fill in on execution):**

| # | Step | Abort criterion | Result |
|---|---|---|---|
| 1 | `git -C /usr/local/bin/hooks/website ls-remote origin master` | not `787bec5627702d2881b826e596ec2b8f8853c4fa` → stop; the tip is no longer a fast-forward and the verdict must be re-taken | _blank_ |
| 2 | `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master 983681ca6cd7cbacd0796ed093e094057ad7f9be --dry-run` with the evidence flag of step 4 | exit ≠ 0 → stop | exit 0 (reason form) at 2026-11-20T00:2xZ: "every check passed; nothing moved". _Re-run with the final flag before step 4_ |
| 3 | the owner's yes to the release, in this session | no yes → Aborted; nothing moved | _blank_ |
| 4 | the same command without `--dry-run`, with `--qa-record <QA Phase 3 record>` once it is committed (moves local `master`, pushes, switches the tree back to `master`) | exit 2 → nothing moved, stop; exit 1 → read the report for ref state, route to the owner | _blank_ |
| 5 | `git ls-remote origin refs/heads/master` equals `983681ca…`; tree on `master`, `git status --porcelain` shows only `?? .playwright-mcp/` | any difference → route to the owner | _blank_ |
| 6 | `git branch -d chain/fix-personal-message-access` (merged); `ls-remote --heads origin 'chain/*'` shows none | `-d` refuses → name it to the owner; do not force | _blank_ |
| 7 | write E-WEBSITE-PUSH into the carrier handoff's ledger; the walk B-2 then B-1 is the uat-role session's | a falsifier seen (B-2 answers 500, or B-1 shows account 2's content) → Vercel promote of the previous deployment, his call | _blank_ |

## User Confirmation

_Not asked yet. The ask is put in this session after QA's Phase 3 record is committed and the dry run is re-run (Phase 2B)._

## Release Execution

_Not executed._

## Post-Release Status

_Open._

## Next Actions

Standing note: later documents are authoritative on current state.
- The post-deploy walk B-2 then B-1 and the owner's residue read: `handoff/fix-personal-message-access-post-deploy-2026-11-20.md` (Owning-Stage `uat`, event-form `Review-Trigger`).
