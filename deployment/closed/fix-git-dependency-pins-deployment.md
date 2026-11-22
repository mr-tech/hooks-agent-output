---
ID: n/a
Origin: fix-git-dependency-pins
UUID: 84f208f7
Status: Released
Status-Detail: "Both releases done: project-utils master 749606d to 40ba5d3 (2026-11-21T23:15Z) and website master 132a7ab to 3859c29 (2026-11-22T17:04Z, on the owner's approval). Production deployment dpl_8oenan2E9c2YzyeB3kVrZvtD43XC is Ready, built from 3859c29 and serving hooks.gg. Forward items carried by two handoffs; architecture notice is steering's."
---

# Deployment — fix-git-dependency-pins

Two releases: release 1 moves project-utils `master`; release 2 moves website `master`. Each has its own section; sections for release 2 are
written under its own brief.

## Changelog

| Date (UTC) | Agent | Change |
|---|---|---|
| 2026-11-21T23:14 | devops | Document created at Stage 2 readiness for release 1 (project-utils `master`). Brief `steering/fix-git-dependency-pins-brief-devops.md` and its common part read whole; steering's brief had arrived, so no gap is recorded there. This is the first pass: no earlier session. |
| 2026-11-21T23:15 | devops | Release 1 executed (Mode A): project-utils `master` `749606d` to `40ba5d3`, read back by `git ls-remote` at 23:15:10Z; `chain/fix-git-dependency-pins` deleted by `git branch -d`. Runbook results, Release Execution and Post-Release Status filled. Readiness committed first at record `e8f7d9d`. |
| 2026-11-22T00:21 | devops | Release 2 brief read whole (steering `46d15db`). Stage 1 recorded for website `3859c29` on `chain/fix-git-dependency-pins`; deploy-host install read from the last successful production build log (pnpm 10.28.2; private fetch is HTTPS with a token, not SSH). Gate on the release ask not met: newest production deployment `Error`, newest Ready is the `0c14d5b` build. Two re-captures of the deployment list were not completed. |
| 2026-11-22T17:02 | devops | Gate read and met: `steering-hooks-fixer` reported the redeploy; this session read `vercel inspect https://hooks.gg` itself (`dpl_CnknfaUPDjpEMaaw1781YXMq34rW`, Ready, 16:55:59Z) and its log (Commit 132a7ab). Stage 2 Phase 2A readiness written: packaging at `3859c29` (cold store, pnpm 10.28.2: install and build exit 0), dry runs, operational re-derivation, runbook, refutation helper (not refuted). Found: project-utils `master` moved to `a47e683` after release 1 (fixer chain `fix-api-extractor-devdep`, not this chain's); pin `40ba5d3` still an ancestor. Owner ask not yet put. |
| 2026-11-22T17:07 | devops | Release 2 executed (Mode A) on the owner's yes (selection, answered by 17:03:47Z): website `master` `132a7ab` to `3859c29`, read back 17:04:08Z; production deployment `dpl_8oenan2E9c2YzyeB3kVrZvtD43XC` Ready, Commit 3859c29, serving hooks.gg (17:04:50Z). Chain branch deleted by `git branch -d`. Phase 2D done (items in § Phase 2D items): two handoffs written for forward items; the implementation and code-review documents set `Released`. Record closed `Released` and moved to `deployment/closed/`. |

## Plan Reference

No plan: a fixer chain (`fix-`), `ID: n/a`, `Origin` and `UUID` from the fixer's document `implementation/fix-git-dependency-pins-implementation.md`
(`Handoff-At: 40ba5d3 — repos=project-utils; website half not started`, record `44bb065`). Scope: the owner's determination,
`steering/fix-git-dependency-pins-rulings.md`, blocks "2026-11-21T22:28" (his selections), "22:58" (determination) and "23:07". Source handoffs:
`handoff/website-git-dependencies-resolve-unpinned-2026-11-20.md` (H37, its item 4 = H41) and `research/codebase-bug-evaluation-2026-11-08.md` F-36; both stay `Open` here
(closing them `Addressed` is steering's, at the chain's closure).

Stage set (quoted from the brief's common part): fixer, then code reviewer, then devops for project-utils `master` (mid-chain, no approval), then fixer for the
website pin, then reviewer, then devops for website `master` (his word). No plan, critic, Phase 1, QA or UAT.

Roadmap: not read. The brief for this release names no roadmap document, and none is cited here.

## Release 1 — project-utils `master`

### Release Identifier

project-utils `master` at `40ba5d3a5b54447abb0dd44a9fcc7b43a35f8165` (no tag is created; the SHA on the serving ref identifies the release).

### Release Date

2026-11-21, pushed and read back at 23:15Z.

### Execution Mode

Agent-executed (Mode A), from this session: `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/project-utils master 40ba5d3a5b54447abb0dd44a9fcc7b43a35f8165 --reason <text>`
in its default form (local `master` moved to the tip, tree switched onto `master`, push). The push deploys nothing (below), so no owner approval is asked, per `~/.claude/CLAUDE.md`
Git ("A push needs approval unless it deploys nothing") and the brief's naming of this end step. The tool refuses a tracked-dirty tree, a non-fast-forward and a split.

### Release Summary

- Type: dependency-manifest hygiene in a library. Environment: none. project-utils has no `.github/`, no deploy host and no auto-deploy; consumers take it only by re-pinning a SHA.
- Epic: none on record (`fix-` chain; the determination names none).
- Change: `prisma-kysely` moves from `dependencies` to `devDependencies` (`package.json`, same range `^1.5.0`); `package-lock.json` follows (283 entries gain `dev: true`
  in each of its two sections, none added, removed or re-versioned); the orphaned `dist/prisma.js` and `dist/prisma.js.map` are deleted. 1 production line added.

### Repositories and SHAs shipped

| Repository | Branch | Base | Tip shipped | Commits |
|---|---|---|---|---|
| project-utils | `chain/fix-git-dependency-pins` to `master` | `749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f` (= `origin/master`, `git ls-remote origin` at 2026-11-21T23:11Z per the brief and again by this session at 23:14Z) | `40ba5d3a5b54447abb0dd44a9fcc7b43a35f8165` | 1 (`git rev-list --count 749606d..40ba5d3`); `git merge-base 749606d 40ba5d3` is `749606d`, so the move is a fast-forward |

Chain branch tip recorded (Stage 1 step 6): `chain/fix-git-dependency-pins` at `40ba5d3a5b54447abb0dd44a9fcc7b43a35f8165`, not pushed (no upstream). No other repository is shipped
in release 1.

### Serving Ref at Cutover

One serving ref: `origin/master` (`release-move.js project-utils --report`: "one serving ref at origin (master); no pair"; capture `report-serving-refs.txt`). The remote also carries
`chain/012-message-valid-field` at `749606d`, which is not a serving ref and is not touched. Before: `749606d`. After (read back in Phase 2C): `40ba5d3`.

### Pre-Release Verification

Evidence is under `verification/fix-git-dependency-pins/devops/` unless named otherwise.

| Item | State |
|---|---|
| QA | None in the stage set (1 production line added, under the fixer route's 20). Not a gap. |
| UAT | None in the stage set. |
| Stage start | Code review `code-review/fix-git-dependency-pins-code-review.md`, `Reviewed-At` `40ba5d3a5b54447abb0dd44a9fcc7b43a35f8165`, `Verdict` APPROVED, round 1, no findings (record `fd88ffc`); round 1 covers the project-utils half only. |
| Blocking-condition register | None exists in this chain: no QA or UAT register, no plan. Nothing to terminate. |
| Release-tip verdict | No QA record, by the determination. The tip IS the reviewed commit: the release is a fast-forward of one commit onto `749606d` with no assembly, merge or rebase (`git rev-parse chain/fix-git-dependency-pins` = `40ba5d3a…`; `40ba5d3^{tree}` `466d25dc00949f29ba18abacc38c2e1297f945cd`, `tip-tree.txt`). The move takes `--reason` naming that review and its `Reviewed-At`, not `--qa-record`. This is the stage set's own last verdict, not a Phase 2 QA verdict, and it is said so here. |
| Release consistency | project-utils' `package.json` carries no `version` field, so none is synthesised and no CHANGELOG, README or tag is compared. Cross-repo references re-read: the only consumer in the workspace, website, names project-utils as `github:hooks-gg/project-utils#master` in `package.json:69` and pins it in `pnpm-lock.yaml:168` to `749606d01b7f…` (`git grep` at website `origin/master`). The push moves `master` past that pin and does not move the pin, so website's frozen install still resolves `749606d` until its own re-pin (release 2). That re-pin is the website half. |
| Consumers of the changed install set (re-derived, not carried) | Population by listing: every `package.json` under `/usr/local/bin` and `/home/dev` to depth 5, excluding `node_modules`, `.next` and `preview-image-generator`, naming `project-utils`: `/usr/local/bin/hooks/website`, `/home/dev/review/website` (a review copy of website, same specifier), `/usr/local/bin/hooks-deprecated/cdn` (specifier `github:hooks-gg/project-utils#master`), `/usr/local/bin/statbot-deprecated/statbot-locale` (its own `name` is `project-utils`; it is not a consumer) and project-utils itself. Steering's earlier read of `/usr/local/bin/statbot` and `/usr/local/bin/paracord` (brief) stands and is not repeated. **`/usr/local/bin/hooks-deprecated/cdn` is a consumer the brief did not name and its use of `prisma-kysely` was not read: a read aimed at it was not completed.** It is a deprecated tree and, like every consumer, changes only when it re-pins. Named to steering as the code review's Assumption Not Checked, narrowed by one listed member. Consumers elsewhere on other hosts are unread. |
| Packaging integrity | A build re-run at the tip, in a `git archive` export of `40ba5d3` under `/tmp`, by the committed spec check `check-project-utils.sh` (node v24.14.0, npm 11.9.0; run under `systemd-run --user --scope -p MemoryMax=8G -p RuntimeMaxSec=1500 -p TasksMax=512`): A1 PASS (`prisma-kysely` a devDependency in manifest and lockfile), A2 PASS (`npm ci`, then `build` and `build:types`, reproduce the committed `dist/` byte for byte; lint 0, build 0), A3 PASS (runtime-only install omits `prisma-kysely`), A4 PASS (`dist/index.js` loads under it), exit 0. Capture: `packaging-at-tip.stdout` and `packaging-at-tip/`. No process of the run remains (`ps`), and no `pu-check.*` directory remains under `/tmp`. |
| Deploy host's package-manager major | Not applicable to this push: project-utils has no deploy host and nothing installs it from this repository's `package-lock.json` (the fixer's document says the same: consumers install it with pnpm and read their own lockfile). The lockfile is npm's (`lockfileVersion: 2`, npm 11.9.0 produced it). pnpm's handling of a git dependency whose `devDependencies` changed is the website half's check, at its own lockfile and its own deploy host. Accepted as written, a named risk for release 2, not a mark here. |
| Workspace cleanliness | project-utils `git status --porcelain`: empty; branch `chain/fix-git-dependency-pins`; HEAD `40ba5d3`. `release-move.js`: "untracked 0 path(s) left alone". Predecessor exclusions: the gitignored `build/` outputs the fixer's pre-commit hook rewrote (the two stale `build/js/prisma.js(.map)` files were deleted under the 23:07 ruling). They affect no release mechanism: the tool looks at tracked changes, and no mechanism builds from this tree at the push. |
| Rewritten history | None between verification and release: `40ba5d3` is the chain branch's tip, which is not rebased. The verified SHA is reachable from `chain/fix-git-dependency-pins` and, after the move, from `master`. |

### Operational text re-derived against the mechanism (before the first ref moves)

Repository: project-utils.

| Line | Statement | Mark |
|---|---|---|
| Deploy mechanism | A push to `master` triggers nothing in this repository: `git ls-tree -r --name-only 40ba5d3` lists no `.github/`, and `release-move.js` prints "workflows none — … .github/workflows absent". No `vercel`, `netlify`, `docker`, `Procfile` or other CI file is tracked at the tip. The only tracked hook is `.githooks/pre-commit` (client side, runs at commit). | re-derived: `git ls-tree` and the tool's workflow read |
| Anything else watching the branch | Repository webhooks and branch protection could not be read: `gh api repos/hooks-gg/project-utils` returns 404 for the logged-in account (`mr-tech`), as do `/hooks` and `/actions/workflows`, so the API is not an instrument for this repository from here. SSH (`git ls-remote`) does reach it. | **not established** by API. The effect of a push is bounded by the mechanism instead: consumers take project-utils by SHA (`pnpm-lock.yaml:168`) so a moved `master` changes no installed tree; a webhook on the repository is accepted as unread, a named risk. |
| Rollback | Reverse application of the release diff to the tree: `git apply --check -R release-diff-749606d-40ba5d3.patch` (written to a file first, 4,680 lines), exit 0 (`rollback-dry-run.txt`). To roll back, a revert commit is released through the same tool. A consumer that re-pinned in between is not rolled back by it: its own lockfile names the commit. No consumer has re-pinned at the time of writing. | re-derived by dry run |
| Ordering constraints | The website pin must name a commit GitHub serves, so this push precedes the website half (common brief, hazard 3). Within this release, one repository, one commit. | re-derived from the stage set and the diff |
| Serving refs | `master` only at origin. `git ls-remote origin` reads `749606d` on `master` and on `chain/012-message-valid-field`, nothing else. | re-derived: `--report` and `ls-remote` at 23:14Z |
| Dry run of the move | `release-move.js project-utils master 40ba5d3a… --dry-run --reason <text>`: "ff-from-remote ok; sibling serving refs (none) on one line ok", "workflows none", "DRY RUN: every check passed; nothing moved", exit 0 (`release-move-dry-run.txt`). | re-derived |

### Runbook (Mode A; results blank until run)

| # | Step | Abort if | Result |
|---|---|---|---|
| 1 | `git -C /usr/local/bin/hooks/project-utils ls-remote origin master` | not `749606d…` (someone else moved it) | `749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f` — proceed |
| 2 | `git -C /usr/local/bin/hooks/project-utils status --porcelain` | any tracked change | 0 lines (branch `chain/fix-git-dependency-pins`) — proceed |
| 3 | `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/project-utils master 40ba5d3a5b54447abb0dd44a9fcc7b43a35f8165 --reason "<review record and Reviewed-At>"` | exit not 0, or a refusal, or a classifier or permission block (reported to steering and not retried in another form) | exit 0: "OK moved master: 749606d… -> 40ba5d3… on origin; tree on master" (`release-move-run.txt`) |
| 4 | `git -C /usr/local/bin/hooks/project-utils ls-remote origin master` | not `40ba5d3…` | `40ba5d3a5b54447abb0dd44a9fcc7b43a35f8165 refs/heads/master` at 23:15:10Z (`post-move-readback.txt`) |
| 5 | `git -C /usr/local/bin/hooks/project-utils branch --show-current` | not `master` | `master`; HEAD and `master` both `40ba5d3…`; porcelain 0 lines |
| 6 | `git -C /usr/local/bin/hooks/project-utils branch -d chain/fix-git-dependency-pins`, output captured | refused (then `merge-base --is-ancestor` is read; `-D` only after that shows exit 0) | "Deleted branch chain/fix-git-dependency-pins (was 40ba5d3)", exit 0; `branch --list` shows `master` only (`branch-delete.txt`) |

### Open disagreements with predecessor documents

None. Two places where this record is more careful than a predecessor: the release-tip verdict is the code review (the stage set has no QA), and the consumer population is listed
by instrument here and found one member (`hooks-deprecated/cdn`) that neither the brief nor the review names.

### Assumption Not Checked, by predecessor, that this release exercises

| Predecessor | Assumption | Read that closes it | State |
|---|---|---|---|
| Code review (round 1) | No consumer outside the workspace loads `prisma-kysely` (or `@prisma/internals`, `@mrleebo/prisma-ast`) through project-utils' runtime install. | A read of each consumer's code for those names. Steering read `/usr/local/bin/statbot` and `/usr/local/bin/paracord`; this session found `hooks-deprecated/cdn` and did not complete a read of it. | Open; owner of the read: `steering-hooks` (named in the code review). Nothing changes for any consumer until it re-pins, so this record does not wait on it. |
| Fixer | The website half is round 2's: website's runtime never imports `prisma-kysely`. | Release 2's own gates. | Carried to release 2. |

No session can run any of these reads before the first ref moves, except the `hooks-deprecated/cdn` read, which is named to steering in this turn's message.

### User Confirmation

Not asked: the push deploys nothing and takes no owner approval (above). The brief naming the end step is the trigger.

### Release Execution

Mode A, run by this session, 2026-11-21T23:15Z. Commands and results are the runbook rows above (captures under `verification/fix-git-dependency-pins/devops/`:
`release-move-run.txt`, `post-move-readback.txt`, `branch-delete.txt`).

- Ref moved: project-utils `origin/master`, `749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f` to `40ba5d3a5b54447abb0dd44a9fcc7b43a35f8165`, a fast-forward of one commit. Local `master` moved with it
  and the tree is on `master`. No tag created; nothing published (a branch move has no registry).
- Deploy evidence: the push, ref `master`, SHA `40ba5d3`, 23:15Z, read back by `git ls-remote origin master`. The push deploys nothing: no workflow, no host. Serving state is not otherwise probed.
- Reconciliation, deployed against verified: the commit at the serving ref is `40ba5d3a5b54447abb0dd44a9fcc7b43a35f8165`, which is the code review's `Reviewed-At` SHA. They are the same commit.
- Consumers resolving to the release: none do yet. Website's lockfile still pins `749606d` (above); it moves only in release 2.
- The fix branch `chain/fix-git-dependency-pins` was merged by the fast-forward and deleted by `git branch -d` alone (captured). Its commit is on `master`.

### Post-Release Status

Release 1: pushed 2026-11-21T23:15Z. Known issues: none known; the one open read is the outside-consumer assumption above, owned by `steering-hooks`, which this release does not wait on (it exercises no
host, and changes no consumer until a re-pin). Rollback Plan: the reverse-apply dry run above (a revert commit through the same tool); no consumer has re-pinned.
The chain stays open: the fixer's and the reviewer's documents are not closed here (brief), and release 2 follows.

## Release 2 — website `master`

Brief: `steering/fix-git-dependency-pins-brief-devops-release2.md` (agent-output `46d15db`), read whole, with the rulings blocks 23:58, 00:07 and 00:13. Steering's brief had arrived.

### Stage 1 — committed state

| Item | State |
|---|---|
| Stage start | No UAT, no QA in the stage set (3 production lines across both halves). The start is the code review `code-review/fix-git-dependency-pins-code-review.md` round 2, `Reviewed-At` `40ba5d3a5b54447abb0dd44a9fcc7b43a35f8165,3859c29d557c920a5b611b8e3a4e7b5bf7b1222e — repos=project-utils,website`, `Verdict` APPROVED, no findings (record `41193a1`); fixer document `Handoff-At: 40ba5d3,3859c29` (record `80a5778`). Both anchors re-read from the files. |
| Blocking-condition register | None exists in this chain. Nothing to terminate. |
| Plan at rest (2c) | No plan, no Planner batch, no critique, no architecture findings document carrying this chain's ID (`grep -rl` over `architecture handoff critiques qa uat planning analysis security`: no hit). |
| Chain branch and tip | website `chain/fix-git-dependency-pins` at `3859c29d557c920a5b611b8e3a4e7b5bf7b1222e`, cut from `origin/master` `132a7ab6f49d8a85ead507e2221ab3c3a531fd00`; `132a7ab` is an ancestor of the tip and `rev-list --count 132a7ab..3859c29` is 1. Not pushed; no upstream. Capture: `stage1-release2-tree-and-refs.txt` (00:16Z). project-utils half: already on project-utils `master` (release 1). |
| Uncommitted work | Website `git status --porcelain`: only `?? .playwright-mcp/` (another session's; left alone). Record repository: nothing under `verification/fix-git-dependency-pins/`, `implementation/` or `code-review/` uncommitted (`git status --porcelain` over them: empty before this stage's own writes). |
| Release consistency | No package carries a `version` field in either repository, so none is synthesised. Cross-repo references at the tip, re-derived: `package.json:68` `"project-utils": "github:hooks-gg/project-utils#40ba5d3a5b54447abb0dd44a9fcc7b43a35f8165"` and `:125` `"paracord": "github:mr-tech/paracord#3f203086ae38699f26dbee90dadbb395a96be227"`. The lockfile names the same commits (`pnpm-lock.yaml` lines 4991 and 11835 for project-utils, 4761 and 11576 for paracord, `git show 3859c29:pnpm-lock.yaml`). project-utils `origin/master` is `40ba5d3…` (`git ls-remote`, 00:16Z), so the pinned commit is served and is the serving head. paracord's commit `3f20308…` is served (`gh api repos/mr-tech/paracord/commits/3f203086…` returns the SHA). Neither names a stale branch. |
| Packaging at the tip | Deferred to Stage 2 (Phase 2A step 5), run at the tip then, because the base may move before the ask. The code review's cold-store frozen install, suite and typecheck at `3859c29` are the predecessor's and are not this stage's identity. |
| Roadmap and release tracker | No roadmap document cited, and a `fix-` chain owes none (Phase 2D step 6). |
| Documents closed (step 8) | Fixer implementation and code review, `Status` `Committed`, moved to `closed/` (changelog rows there). No QA, UAT or plan document exists. No post-deploy-observable rows exist, so no carrier handoff is created. |

### Deploy-host install, read from the last successful production deployment (brief: the code review's Assumption Not Checked, owner devops)

Instrument: the Vercel build log of the last Ready production deployment, `dpl_AsiVPq5vBJY7dqJim5PcmFVWCrn9` (`hooks-gg-website-oxeqdn0vp`, built from `0c14d5b`), captured look-only by chain 6's devops: `verification/fix-delete-dead-cron/devops/vercel-build-log-prod-0c14d5b.txt`. The errored 132a7ab build's log (`vercel-build-log-errored-132a7ab.txt`) is read for the same lines.

- pnpm: "Detected ENABLE_EXPERIMENTAL_COREPACK=1 and "pnpm@10.28.2" in package.json" in both logs: the `packageManager` pin, the version the reviewer's and fixer's frozen installs used.
- Install command: `git config --global url."https://${GITHUB_USER}:${GITHUB_USER_ACCESS_TOKEN}@github.com/".insteadOf "git@github.com:" && pnpm install 1> /dev/null`. So the private project-utils fetch is **not over SSH**: the lockfile's `git@github.com:` URL is rewritten to HTTPS with a token. That corrects the code review's wording ("over SSH") and does not change what it needs: a reachable private repo. Both `GITHUB_USER` and `GITHUB_USER_ACCESS_TOKEN` are set for Production (`vercel-env-names-2026-11-21.txt`, names only; no value read).
- The install step succeeded for the lockfile at `0c14d5b` and again for `132a7ab` (the errored build ran the install, then `next build` failed later on missing `DATABASE_URL` and `REDIS*` settings). Both resolve project-utils `749606d` over that mechanism. The new pin is another commit of the same repository, so the mechanism that fetched `749606d` is the one that fetches `40ba5d3`.
- The install output goes to `/dev/null`, so no git-fetch line is printed: the evidence is that the step completed, not a fetch line.
- Not established by any read: that pnpm on the host, run in CI mode, treats the hand-edited lockfile as the reviewer's `--frozen-lockfile` run did (`ERR_PNPM_OUTDATED_LOCKFILE` would be the failure). Same pnpm version and the reviewer's cold-store frozen install exit 0 make it expected; it is **accepted as written, a named risk**, and is decided by the production build after the push, which is read per the brief's deploy-evidence rule.

### Gate on Stage 2 (the release ask)

Brief: no release ask to the owner until a Ready production deployment of `132a7ab` serves `hooks.gg`.

- Read at 00:15Z (`vercel ls --prod`, look-only): the newest production deployment, `hooks-gg-website-dbbvp2cya` (55 minutes old, `Error`), is the `132a7ab` build whose log is captured above; the newest Ready one is `hooks-gg-website-oxeqdn0vp`, 6 hours old, built from `0c14d5b`. **The gate is not met.** Two later attempts to re-capture the list into a file were not completed (timeout); the 00:15Z read stands and is re-read before the ask.
- **Gate met at 2026-11-22T16:59Z.** `steering-hooks-fixer` messaged that the production build was redeployed (its read: `dpl_CnknfaUPDjpEMaaw1781YXMq34rW`, Ready, created 16:55:59Z; it did not read the commit). This session read it itself: `vercel inspect https://hooks.gg` (`gate-inspect-hooks-gg.txt`): `dpl_CnknfaUPDjpEMaaw1781YXMq34rW`, name `hooks-gg-website`, status Ready, created Sun Nov 22 2026 16:55:59 GMT+0000, aliases include `https://hooks.gg` and `…-git-master-…`. Its build log (`vercel logs https://hooks-gg-website-1nodvml13-hooks-gg.vercel.app`, `gate-build-log-1nodvml13.txt`): "Cloning github.com/hooks-gg/website (Branch: master, Commit: 132a7ab)", "Skipping build cache, deployment was triggered without cache", pnpm 10.28.2 downloaded by corepack, the install command, then `next build`. So a Ready production deployment of `132a7ab` serves `hooks.gg`, and a **cold-cache** production install of the pre-change lockfile completed on the host. The capture file is the head 40 lines of the log (the build's end is not in it); the status Ready is from `inspect`.

### Stage 2 — Phase 2A readiness (website `master`)

| Item | State |
|---|---|
| Release tracker | The one included chain; both halves `Committed` (documents closed at Stage 1). |
| Release tip assembled (2a) | No assembly: `chain/fix-git-dependency-pins` is a single commit over `origin/master`; the move is a fast-forward of one commit (`release-move.js` dry run: "ff-from-remote ok"). Website `git ls-remote origin master` at 17:02Z: `132a7ab6f49d8a85ead507e2221ab3c3a531fd00`. |
| Release-tip verdict (3) | No QA record exists (stage set). The tip IS the reviewed commit: `3859c29^{tree}` is `5259fe832f408658afd0984a53b38b82c5fba888` (`packaging-install-build-at-3859c29.txt`, line 1). The code review round 2, `code-review/closed/fix-git-dependency-pins-code-review.md`, `Reviewed-At` `…3859c29d557c920a5b611b8e3a4e7b5bf7b1222e`, APPROVED, no findings. The move takes `--reason` naming it, not `--qa-record`. This is the stage set's own last verdict, not a Phase 2 QA verdict. No defect first found at this gate. |
| Release consistency (4) | Re-read at 17:02Z (`stage2-readiness-refs.txt`): pins are full SHAs in `package.json` (`:68`, `:125`) and the lockfile. **project-utils `origin/master` has moved since release 1: it reads `a47e683b1f33288ff89052c5ed7a982237b773aa`** ("Declare @microsoft/api-extractor as a devDependency", author `lando`, 2026-11-22T07:12Z; `git diff --numstat 40ba5d3 origin/master`: `package.json` 1/0, `package-lock.json` 745/15). It is not this chain's: it is the commit of the fixer chain `fix-api-extractor-devdep` (`implementation/closed/fix-api-extractor-devdep-implementation.md`, `Handoff-At: a47e683 — repos=project-utils; base 40ba5d3`, `Released`, whose own record `deployment/fix-api-extractor-devdep-deployment.md` names the push at 2026-11-22T07:22Z), built on this chain's release 1. The pinned commit `40ba5d3` is still an ancestor of `origin/master` (`git merge-base --is-ancestor`, exit 0, after a `git fetch origin master` that moved only the remote-tracking ref), so the pin names a served commit and the intended target. The pin is deliberately not the branch head; the new commit adds a devDependency only, which no consumer installs. |
| Re-derived populations (4b) | Serving refs of website: `master` only (`report-serving-refs-website.txt`). Consumers of project-utils: website (this release), `hooks-deprecated/cdn` and `/home/dev/review/website` (listed at release 1; unread, change only on a re-pin). Consumers of paracord's pin: website only; the resolved tarball is the one the old lock held. |
| Packaging at the tip (5) | A build re-run at `3859c29` in a `git archive` export under the session scratch (no `.env*` file, 0 counted), driver `packaging-at-tip.sh` (parameterised from chain 6's), under pnpm 10.28.2 (the host's), node v24.14.0, with an **empty pnpm store**, as the host's cold-cache install: `pnpm install --frozen-lockfile` exit 0, lockfile byte-identical to the tip's blob afterwards; `SKIP_ENV_VALIDATION=1 pnpm run build` (`next build`, Turbopack) exit 0 (`packaging-install-build-at-3859c29.txt`). project-utils resolved to `…project-utils.git+40ba5d3a5b54447abb0dd44a9fcc7b43a35f8165`, with no `prisma` file under its `dist/` and no `prisma-kysely` directory in the store (`packaging-resolution-at-3859c29.txt`). The export and store were removed (`ls -A` of the scratch directory: empty); no process remains. The build ran with validation skipped, so it does not test the host's Production settings; that is the production build's read after the push. |
| Lockfile or package-manager change (5) | Yes (hand-edited lockfile). Installed under pnpm 10.28.2, the `packageManager` pin and the version the host's log shows (host's major read, not assumed). Result above. |
| Workspace (6) | Website `git status --porcelain`: only `?? .playwright-mcp/` (another session's; the tool leaves 17 untracked paths alone and refuses only tracked changes). Nothing under `verification/fix-git-dependency-pins/` is uncommitted before this stage's writes. Predecessor exclusions: the shared tree's gitignored `.next/types/validator.ts` (stale, per the common brief) affects no release mechanism: the tool reads tracked changes only, and Vercel builds from a clean clone. |
| Rewritten history (7) | None: `3859c29` is the chain branch's tip, not rebased; it stays reachable from `master` after the move. |
| Mode (8) | Mode A, this session. |
| Serving refs on one line (10) | `release-move.js website --report`: "one serving ref at origin (master); no pair". |

### Operational text re-derived against the mechanism (before the first ref moves)

Repository: website.

| Line | Statement | Mark |
|---|---|---|
| Deploy mechanism | A push to `master` makes Vercel's Git integration build and deploy production. No `.github/workflows` (`release-move.js` prints "workflows none … absent"; `git ls-tree -r 3859c29` lists no `.github`). The live deployment's log reads "Cloning … (Branch: master, Commit: 132a7ab)" and its aliases include `hooks.gg`. The build runs `git config … insteadOf … && pnpm install` then `next build`. | re-derived: log and `inspect` above |
| What a failed build does to the live site | If the production build of the new commit errors, which deployment keeps serving `hooks.gg` was not tested here. Vercel ordinarily keeps the last Ready deployment on the aliases, and the earlier Error build (`132a7ab`, 2026-11-21) left Ready deployments listed beneath it. | **accepted as written, a named risk**; told to the owner in the ask |
| Rollback | Reverse application of the release diff: `git apply --check -R release-diff-132a7ab-3859c29.patch` (diff written to a file first), exit 0 (`rollback-dry-run-website.txt`); a revert commit is released through the same tool and the same approval. Vercel also keeps the current Ready production deployment `dpl_CnknfaUPDjpEMaaw1781YXMq34rW` (built from `132a7ab`) for a dashboard redeploy. | the reverse apply is re-derived by dry run; the dashboard redeploy is accepted as written (not run), a named risk |
| Ordering constraints | project-utils `40ba5d3` must be on GitHub before this push: it is (an ancestor of project-utils `origin/master`, now `a47e683…`, read 17:02Z); paracord's commit is served (`gh api`, same read). No other ordering. | re-derived |
| Serving refs | `master` only. | re-derived: `--report` |
| Dry run of the move | `release-move.js /usr/local/bin/hooks/website master 3859c29… --dry-run --reason <text>`: "ff-from-remote ok; sibling serving refs (none) on one line ok", "workflows none", "DRY RUN: every check passed; nothing moved", exit 0 (`release-move-dry-run-website.txt`). | re-derived |

### Release refutation helper (Escalation Form: the asker's factual conclusion is tried against a refutation before it is put)

Conclusion put to a `general-purpose-sonnet` helper, briefed with the conclusion alone: the move from `132a7ab` to `3859c29` changes nothing observable (diff names only `package.json` and `pnpm-lock.yaml`; only the two references and the install set change; no website source imports a removed package; project-utils' shipped files differ only by the two deleted prisma files). Result, reported by 17:02Z, **not refuted**, each limb held: (a) two rows only (`package.json` 2/2, `pnpm-lock.yaml` 6/1190); (b) exactly the two reference lines changed; (c) the only added key in `packages:` and `snapshots:` is project-utils `#40ba5d3…`, 1276 package names became 1170 (106 names gone: `prisma-kysely` and its subtree; other removed keys are old versions of packages that stay at another version, so no installed version changes); (d) no website source, script or config at `3859c29` names any removed package (distinctive names by plain substring: no hit; generic names by import, require and dynamic-import forms: no hit; caveat: the generic names were searched by import form only), website's only `project-utils` specifier is the bare package name (45 uses, no sub-path), `kysely`, `prisma` and `@prisma/client` stay installed; (e) project-utils' `dist/` and `src/` differ only by the two deleted files, `getPostgres` still resolves through `postgres.js`. Not checked by the helper: runtime behaviour, a build, the suite (those are the reviewer's and this stage's runs above), and the paracord tree itself. Three of the helper's read calls were not completed and were re-issued by it as counts and listings. Its scratch files are under the session scratchpad `refute-release2/`.

### Runbook (Mode A)

| # | Step | Abort if | Result |
|---|---|---|---|
| 1 | `git -C /usr/local/bin/hooks/website ls-remote origin master` | not `132a7ab…` | `132a7ab6f49d8a85ead507e2221ab3c3a531fd00`, 17:03:47Z — proceed |
| 2 | `git -C /usr/local/bin/hooks/website status --porcelain` | any tracked change | only `?? .playwright-mcp/`; branch `chain/fix-git-dependency-pins` — proceed |
| 3 | `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master 3859c29d557c920a5b611b8e3a4e7b5bf7b1222e --reason "<review record and Reviewed-At>"` (a production move: only after the owner's yes in this session) | exit not 0, a refusal, or a classifier or permission block (reported to steering and the owner, never retried in another form) | exit 0: "OK moved master: 132a7ab… -> 3859c29… on origin; tree on master" (`release-move-real-website.txt`) |
| 4 | `git ls-remote origin master` | not `3859c29…` | `3859c29d557c920a5b611b8e3a4e7b5bf7b1222e refs/heads/master`, 17:04:08Z (`post-move-readback-website.txt`) |
| 5 | `git branch --show-current` | not `master` | `master`; HEAD and `master` both `3859c29…`; porcelain only `?? .playwright-mcp/` |
| 6 | Poll `vercel ls --prod` (website dir, stdin closed, look-only), a bounded loop: at most 20 reads 30 s apart; the loop exits non-zero after 3 consecutive unreadable reads (`poll-prod-deployment.sh`) | the newest production deployment is `Error`, or no new deployment appears in the bound | exit 0 after 2 reads: 17:04:13Z `hooks-gg-website-6sx0jkh48` Building; 17:04:44Z the same, Ready, 27 s (`poll-prod-deployment-website.txt`) |
| 7 | `vercel inspect https://hooks.gg`: the id differs from `dpl_CnknfaUPDjpEMaaw1781YXMq34rW`, status Ready | still the old id after the new one is Ready | 17:04:50Z: `dpl_8oenan2E9c2YzyeB3kVrZvtD43XC`, status Ready, created 17:04:00Z, aliases include `https://hooks.gg`, `www.hooks.gg` and `…-git-master-…` (`post-push-inspect-hooks-gg.txt`) |
| 8 | `vercel logs <new deployment url>`: "Commit: 3859c29", the install command ran, `next build` completed | Commit not `3859c29`; install or build error | "Cloning github.com/hooks-gg/website (Branch: master, Commit: 3859c29)"; pnpm 10.28.2 detected; the install command ran and the build proceeded; "Compiled successfully", "Finished TypeScript", static pages 9/9, "Build Completed in /vercel/output [18s]", "Deploying outputs…", no error line (`post-push-build-log-6sx0jkh48.txt`; a filtered capture). Note: this build restored a cache, so its install step ran warm; the cold-cache install of this tip is the packaging row above |
| 9 | `git -C /usr/local/bin/hooks/website branch -d chain/fix-git-dependency-pins`, output captured | refused (then `merge-base --is-ancestor`; `-D` only after exit 0) | "Deleted branch chain/fix-git-dependency-pins (was 3859c29)", exit 0 (`branch-delete-website.txt`) |

A step 6-8 abort would not have been rolled back by this session: the failure is reported to the owner and `steering-hooks` with the two rollback forms above; the rollback is his call. No abort fired.

### User Confirmation

Put by selection prompt from this session (`~/.claude/state/prompt-gate-off` absent, `ls` at 17:02Z), in his form: context first, plain English, no commit IDs or tool names. Summary presented: what the two halves are and that the first is live; that the change should alter nothing visible; the checks (suite 2,358 of 2,358; production build of the exact version on a cold cache under the host's pnpm; the independent refutation read; the site's last rebuild succeeded); what is not tested (the host's own build of this change decides it; that a failed build leaves the current version serving is Vercel's usual behaviour, not tested here; the dashboard redeploy of the previous version); that the fixer did not read where the site uses the Discord library while the reviewer did and found the code it loads unchanged; and his three own checks after release (site opens and sign-in; message list and one saved message; a saved change survives a reload). Options: "Agent: release now (Recommended)" and "Agent: don't release; hold".

Response: **"Agent: release now (Recommended)"**, by the owner, selection answered by 2026-11-22T17:03:47Z (the minute this record read the clock after the answer). Not declined.

### Release Execution (release 2)

Mode A, run by this session, 2026-11-22T17:03:47Z to 17:04:50Z, after the owner's yes above. Commands and results are the runbook rows (captures under `verification/fix-git-dependency-pins/devops/`).

- Ref moved: website `origin/master`, `132a7ab6f49d8a85ead507e2221ab3c3a531fd00` to `3859c29d557c920a5b611b8e3a4e7b5bf7b1222e`, a fast-forward of one commit. Local `master` moved with it and the tree is on `master`. No tag; nothing published.
- Deploy evidence: the push (ref `master`, SHA `3859c29`, 17:04Z, read back by `git ls-remote`), **and** the production deployment's own state, read as the brief requires: `dpl_8oenan2E9c2YzyeB3kVrZvtD43XC` is Ready, was built from `master` at commit `3859c29`, and serves `hooks.gg` (aliases). The push did not stand alone here.
- Reconciliation, deployed against verified, per repository: website, deployed ref `master` at `3859c29d557c920a5b611b8e3a4e7b5bf7b1222e` (pushed commit, read from local git and `ls-remote`, and the commit the host built); the code review's `Reviewed-At` website SHA is `3859c29d557c920a5b611b8e3a4e7b5bf7b1222e`: **the same commit**, so no surface diff is owed. project-utils: serving ref `master`, the pinned `40ba5d3a5b54447abb0dd44a9fcc7b43a35f8165` (release 1) equals the review's project-utils `Reviewed-At`; `master` has since moved on to `a47e683` (another chain), of which `40ba5d3` is an ancestor, and the site's install names `40ba5d3`, not the head.
- Suite: the 2,358-case run (exit 0) is the code reviewer's, at `3859c29`; this stage did not re-run the suite. What this stage ran at the tip: the frozen install and the production build on a cold store (above). The ask to the owner said "the test suite passed"; that is the reviewer's run.
- Consumers resolving to the release: website is the consumer and now resolves project-utils at `40ba5d3` (`packaging-resolution-at-3859c29.txt`, and the host's install ran at `3859c29`). The hand-edited lockfile was accepted by the host's install (the Stage 1 named risk): the host's build ran past install and completed. The host install line itself prints nothing (output to `/dev/null`), so the evidence is that the step completed and the build ran.
- The fix branch `chain/fix-git-dependency-pins` was merged by the fast-forward and deleted by `git branch -d` alone in each repository (captured: project-utils at release 1, website here).

### Post-Release Status (release 2)

Released 2026-11-22T17:04Z. Known issues: none known. Rollback Plan: the two forms above (a revert commit through the same tool and approval; or a dashboard redeploy of the previous Ready deployment `dpl_CnknfaUPDjpEMaaw1781YXMq34rW`, built from `132a7ab`, not run). The owner's own checks after release (site opens and sign-in; message list and one saved message; a saved change survives a reload) are his; this record does not wait on them, and no timed read exists, so no carrier handoff for post-deploy rows is needed (no QA register).

### Phase 2D items

1. Plans released: no plan. The fixer's implementation document and the code review are `Released` (closed, edited this turn); their `Committed` was Stage 1.
2. One deployment document: this one, covering both releases (release 1 project-utils, release 2 website), ID inherited from the fixer's document (`ID: n/a`, `Origin: fix-git-dependency-pins`, UUID `84f208f7`).
2b. Release-tip QA record: none exists (no QA in the stage set).
4. Fix branch merged and deleted in both repositories (above).
5. Architecture: the chain closes or invalidates the architecture record's statements the brief cites as `architecture/system-architecture.md` L121 and L166 (project-utils recorded as pinned `eb38a15`; now `40ba5d3`, and the lock named `749606d` before) and L236-237 (the 13 `dist/` files; `git ls-tree` counts 13 at `749606d` and 11 at `40ba5d3`, `prisma.js` and its map gone). Those line numbers are the brief's at compose time and no longer match this file's text (L236-237 now hold other rows; `grep` for `eb38a15` finds no line); this stage did not re-locate them. The brief and its common part assign that notice to the steering thread ("not edited by any stage: steering lodges them for the architect at closure"), so no inbox line is written here; named to `steering-hooks` in this turn's message.
5b. Chain documents by frontmatter, by `UUID 84f208f7` / `Origin: fix-git-dependency-pins`: `implementation/closed/fix-git-dependency-pins-implementation.md` (`Released`), `code-review/closed/fix-git-dependency-pins-code-review.md` (`Released`), this deployment record (`Released` on closing). Fix chains whose `Handoff-At` is an ancestor of the released tip (`git merge-base --is-ancestor` in website): `fix-delete-dead-cron` (`132a7ab`; implementation and code review `Released`, closed; its deployment record `deployment/fix-delete-dead-cron-deployment.md` is still open and is `devops-fix-delete-dead-cron`'s, awaiting the owner's dashboard cron read), and every other `Released` fix chain in `implementation/closed/` (listed by instrument, all terminal). One reads `Committed`: `fix-v1-guild-messages-auth` (`Handoff-At` `ddbd750c…`, an ancestor of `132a7ab`, so already in `master` before this release; not shipped or carried by this release; its `Status` `Committed` is stale against that and is the steering thread's to close). `fix-uat-local-stack-id-sequence` is `Committed` over `agent-output`, not website; not in this release. Source handoffs the chain answered: `handoff/website-git-dependencies-resolve-unpinned-2026-11-20.md` (H37, item 4 = H41), `Status` `Open` (closing it `Addressed` is steering's, at the chain's closure; `Owning-Stage` is devops and this release is the discharge), and `research/codebase-bug-evaluation-2026-11-08.md` (F-36), `Status` `Active` (not this stage's). The merged fixer chain `fix-api-extractor-devdep` (built on `40ba5d3`) is `Released` and closed.
5c. Forward items beyond the register, by `grep -l 'Assumption Not Checked'` over the chain's documents (the code review is the one file): (i) round 1, the outside consumers of project-utils: carried by `handoff/project-utils-consumers-outside-workspace-lose-prisma-kysely-2026-11-22.md` (`Owning-Stage` owner, event-form trigger); (ii) round 2, the deploy-host install: **closed here** (pnpm 10.28.2; HTTPS-with-token private fetch; the host's build ran past install on `3859c29`). Also: paracord in `devDependencies` while runtime source imports it (code review round 2, "noted here, not raised"): carried by `handoff/website-paracord-listed-as-devdependency-but-imported-at-runtime-2026-11-22.md`. The fixer's classifier blind spot (`classify-website-lock.js` does not constrain `transitivePeerDependencies`; checked against pnpm's own output): a probe note, carried by the code review document in `closed/`, no release decision rests on it. Webhooks on `hooks-gg/project-utils`: unread by API (404); no effect on this release. The release 1 `Assumption Not Checked` rows are re-read: nothing in release 2 falsifies a claim made at release 1 (the site's install resolved project-utils `40ba5d3` and built).
6. Roadmap: a `fix-` chain owes none (the determination names no epic or criterion).

## Record notes

- One search call that named a path outside the brief's scope (`preview-image-generator`, which no stage reads) was not completed; it was re-issued once without that path.
  A read aimed at `hooks-deprecated/cdn` was not completed and was not re-issued. Two attempts to re-capture `vercel ls --prod` into a file at 00:16Z and 00:18Z timed out and were not completed; the later reads (17:04Z) completed with stdin closed.
- An earlier row of this record's Stage 1 section said the first `vercel ls --prod` read was the gate read; the gate was later read afresh and met (above).
- Release 2 is done; this record is closed `Released` (moved to `deployment/closed/`) and steering is messaged.
