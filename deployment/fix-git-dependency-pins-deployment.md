---
ID: n/a
Origin: fix-git-dependency-pins
UUID: 84f208f7
Status: Active
Status-Detail: "Release 1 of 2 done: project-utils master moved to 40ba5d3 at 23:15Z (mid-chain, deploys nothing). Release 2 (website master, on the owner's word) follows a later brief; this record stays open for it."
---

# Deployment — fix-git-dependency-pins

Two releases: release 1 moves project-utils `master`; release 2 moves website `master`. Each has its own section; sections for release 2 are
written under its own brief.

## Changelog

| Date (UTC) | Agent | Change |
|---|---|---|
| 2026-11-21T23:14 | devops | Document created at Stage 2 readiness for release 1 (project-utils `master`). Brief `steering/fix-git-dependency-pins-brief-devops.md` and its common part read whole; steering's brief had arrived, so no gap is recorded there. This is the first pass: no earlier session. |
| 2026-11-21T23:15 | devops | Release 1 executed (Mode A): project-utils `master` `749606d` to `40ba5d3`, read back by `git ls-remote` at 23:15:10Z; `chain/fix-git-dependency-pins` deleted by `git branch -d`. Runbook results, Release Execution and Post-Release Status filled. Readiness committed first at record `e8f7d9d`. |

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

## Record notes

- One search call that named a path outside the brief's scope (`preview-image-generator`, which no stage reads) was not completed; it was re-issued once without that path.
  A read aimed at `hooks-deprecated/cdn` was not completed and was not re-issued.
- Release 2 is not started by this brief.
