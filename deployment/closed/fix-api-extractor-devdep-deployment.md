---
ID: n/a
Origin: fix-api-extractor-devdep
UUID: 3c9e71a4
Status: Released
Status-Detail: "project-utils master moved 40ba5d3 to a47e683 at 2026-11-22T07:22Z (read back by git ls-remote); deploys nothing; fix branch deleted. Nothing open on this release."
---

# Deployment — fix-api-extractor-devdep

## Changelog

| Date (UTC) | Agent | Change |
|---|---|---|
| 2026-11-22T07:22 | devops | Document created at Stage 2 readiness. Brief `steering/fix-api-extractor-devdep-brief-devops.md` read whole; steering's brief had arrived, so no gap is recorded there. First pass: no earlier session. The cache-warm wake was armed (`CronList` showed none). Captures are under `verification/fix-api-extractor-devdep/devops/`. |
| 2026-11-22T07:22 | devops | Release executed (Mode A): project-utils `master` `40ba5d3` to `a47e683`, read back by `git ls-remote origin master` at 07:22:19Z; `chain/fix-api-extractor-devdep` deleted by `git branch -d`. Readiness was committed first, at record `f042fca9`. Runbook results, Release Execution, Post-Release Status and Phase 2D filled; Status `Released`. |

## Plan Reference

No plan: a fixer chain (`fix-`), `ID: n/a`, `Origin` and `UUID` from the fixer's document `implementation/fix-api-extractor-devdep-implementation.md`
(`Handoff-At: a47e683 — repos=project-utils; base 40ba5d3`, record `1168acc`). Scope: steering's determination,
`steering/fix-api-extractor-devdep-rulings.md`, blocks "2026-11-22T04:58" (scoping), "07:10" (two in-range hoisted lockfile bumps admitted) and "07:11" (the
pre-commit hook's rebuild in the shared tree admitted). Source handoffs: none (the defect was found by chain 7's sweep,
`verification/fix-git-dependency-pins/scoping/sweep.md`, P2 observation, which is not a handoff record).

Stage set (the brief): fixer, then code reviewer, then devops to project-utils `master` (no approval). No plan, critic, Phase 1, QA or UAT.

Roadmap: not read. The brief names no roadmap document and a `fix-` chain owes none (Phase 2D step 6), so none is cited.

## Release Identifier

project-utils `master` at `a47e683b1f33288ff89052c5ed7a982237b773aa` (no tag is created; the SHA on the serving ref identifies the release).

## Release Date

2026-11-22, pushed at about 07:22Z and read back at 07:22:19Z.

## Execution Mode

Agent-executed (Mode A), from this session: `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/project-utils master a47e683b1f33288ff89052c5ed7a982237b773aa --reason <text>`
in its default form (local `master` moved to the tip, tree switched onto `master`, push). The push deploys nothing (below), so no owner approval is asked, per
`~/.claude/CLAUDE.md` Git ("A push needs approval unless it deploys nothing") and the brief's naming of this end step. The tool refuses a tracked-dirty tree, a non-fast-forward and a split.

## Release Summary

- Type: build-tooling hygiene in a library. Environment: none. project-utils has no `.github/`, no deploy host and no auto-deploy; consumers take it only by re-pinning a SHA.
- Epic: none on record (`fix-` chain; the determination names none).
- Change: `@microsoft/api-extractor` `^7.49.2` joins `devDependencies` (`package.json`, one line); `package-lock.json` follows (745 lines added, 15 removed). `build:types` ran
  `api-extractor run` with the tool declared nowhere, so it resolved only through a global install on this box. No source or `dist/` line changes. No production line added.

## Repositories and SHAs shipped

| Repository | Branch | Base | Tip shipped | Commits |
|---|---|---|---|---|
| project-utils | `chain/fix-api-extractor-devdep` to `master` | `40ba5d3a5b54447abb0dd44a9fcc7b43a35f8165` (= `origin/master`: brief at 07:19Z, this session's `git ls-remote origin master` at 07:2xZ, `ls-remote-before-log.txt`) | `a47e683b1f33288ff89052c5ed7a982237b773aa` | 1 (`git log --oneline origin/master..HEAD`); `40ba5d3` is the first parent of `a47e683`, so the move is a fast-forward |

Chain branch tip recorded (Stage 1 step 6): `chain/fix-api-extractor-devdep` at `a47e683b1f33288ff89052c5ed7a982237b773aa`, not pushed (no upstream). No other repository is shipped.

## Serving Ref at Cutover

One serving ref: `origin/master` (`release-move.js . --report`: "one serving ref at origin (master); no pair"). The remote also carries `chain/012-message-valid-field`
(from `git branch -a`), which is not a serving ref and is not touched. Before: `40ba5d3`. After (read back): `a47e683`.

## Stage 1 — committed state (recorded in this same pass, per the brief)

| Item | State |
|---|---|
| Stage start | No UAT or QA in the stage set (no production lines added). The start is the code review `code-review/fix-api-extractor-devdep-code-review.md`, `Reviewed-At: "a47e683 — repos=project-utils; base 40ba5d3"`, round 1, `Verdict` APPROVED_WITH_COMMENTS (record `f23a0fe`), and the fixer's document `Handoff-At: a47e683` (record `1168acc`). Both anchors were re-read from the files. |
| Blocking-condition register | None exists in this chain: no QA or UAT register, no plan. Nothing to terminate. |
| Plan at rest (2c) | No plan, no Planner batch, no critique. `grep -rl fix-api-extractor-devdep` over `architecture handoff critiques qa uat planning analysis security research`: no hit. |
| Chain branch and tip | `chain/fix-api-extractor-devdep` at `a47e683` (`git rev-parse HEAD`, 07:2xZ), cut from `origin/master` `40ba5d3`. |
| Uncommitted work | project-utils `git status --porcelain`: 0 lines. Record repository: nothing under `verification/fix-api-extractor-devdep/` (other than this stage's own writes), `implementation/` or `code-review/` uncommitted. The record's `INBOX.md` and `verification/016/` and a selection-ledger file are uncommitted and not this chain's (foreign, left alone). |
| Post-deploy-observable rows | None: no register. No carrier handoff is created. |
| Architecture findings | None carries this chain's ID (grep above). |

## Pre-Release Verification

Evidence is under `verification/fix-api-extractor-devdep/devops/` unless named otherwise.

| Item | State |
|---|---|
| QA | None in the stage set (no production lines, under the fixer route's 20). Not a gap. |
| UAT | None in the stage set. |
| Blocking-condition register | None exists. Nothing to terminate. |
| Release-tip verdict | No QA record, by the determination. The tip IS the reviewed commit: the release is a fast-forward of one commit onto `40ba5d3` with no assembly, merge or rebase (`git rev-parse HEAD` = `a47e683b1f33288ff89052c5ed7a982237b773aa`). The move takes `--reason` naming that review and its `Reviewed-At`, not `--qa-record`. This is the stage set's last verdict, the code review, and not a Phase 2 QA verdict. Freshness: the review's `Reviewed-At` SHA equals the tip. |
| Release consistency | project-utils `package.json` carries no `version` field, so none is synthesised and no CHANGELOG, README or tag is compared. Cross-repo references re-read: website `package.json:68` and `pnpm-lock.yaml:164-165` pin `github:hooks-gg/project-utils#40ba5d3a5b54447abb0dd44a9fcc7b43a35f8165` by SHA, so the push moves `master` past the pin and changes no consumer's install (and a devDependency is never installed by a consumer). |
| Consumers (re-derived by listing) | Every `package.json` under `/usr/local/bin` and `/home/dev` to depth 5, excluding `node_modules` and `.next`, naming `hooks-gg/project-utils` (`consumers-log.txt`): `/usr/local/bin/hooks/website` (pin by SHA), `/home/dev/review/website` (a review copy of website, same specifier), `/usr/local/bin/hooks-deprecated/cdn` (specifier `#master`, unread; the new line is a devDependency, which a consumer's install of project-utils never takes, and it changes only on its own re-install). 3 members. The population is the listed one; consumers on other hosts or outside those depths are unread. |
| Packaging integrity | A build re-run at the tip, by `tip-rebuild.sh`: `git archive` export of `a47e683`, `npm ci` (481 packages, exit 0), then `npm run rebuild` under `PATH=<shim: node,npm,npx>:/usr/bin:/bin` (`command -v api-extractor` finds nothing, exit 127), each step under `systemd-run --user --scope -p MemoryMax=8G -p TasksMax=512` and `timeout -s KILL 600`. Result: lint, build and `build:types` ran, "API Extractor completed successfully", `exit=0` (`tip-rebuild-log.txt`). `diff -r` of the committed `dist/` against the rebuilt one: exit 0, empty (`tip-dist-diff.txt`); the two sha256 manifests of 11 files are byte-equal (`cmp` exit 0). `package-lock.json` after the run equals the committed one (`tip-lock-unchanged-log.txt`, exit 0). Toolchain: node v24.14.0, npm 11.9.0 (`tip-toolchain-log.txt`). The red side (`40ba5d3` fails, exit 127) is the fixer's and the reviewer's capture and is not re-run here. |
| Deploy host's package-manager major | Not applicable: project-utils has no deploy host and this push deploys nothing. The package-manager major in play is npm 11.9.0 (the tool the lockfile, `lockfileVersion: 2`, came from). Consumers install project-utils with pnpm from their own lockfile and never from this one. |
| Workspace cleanliness | project-utils `git status --porcelain`: 0 lines; branch `chain/fix-api-extractor-devdep`; HEAD `a47e683`. The shared tree holds `node_modules/` (ruling 07:11, left in place) and regenerated gitignored `build/` output. Both are ignored, so they affect no release mechanism: `release-move.js` looks at tracked changes only ("untracked 0 path(s) left alone"), and no mechanism builds from this tree at the push. |
| Rewritten history | None between verification and release: `a47e683` is the chain branch's tip, which is not rebased, and the review's `Reviewed-At` is that SHA. It is reachable from the branch and, after the move, from `master`. |

## Operational text re-derived against the mechanism (before the first ref moves)

Repository: project-utils.

| Line | Statement | Mark |
|---|---|---|
| Deploy mechanism | A push to `master` triggers nothing in this repository: `.github/` is absent (`ls`), and `release-move.js` prints "workflows none — … .github/workflows absent: a push to master triggers no GitHub Actions workflow in this repository". The only tracked hook is `.githooks/pre-commit` (client side, runs at commit). | re-derived: `ls` and the tool's workflow read |
| Anything else watching the branch | Repository webhooks and branch protection are not readable from here (an earlier chain found the API returns 404 for this account). The effect of a push is bounded instead: consumers take project-utils by SHA, so a moved `master` changes no installed tree; `hooks-deprecated/cdn` names `#master` and re-installs only on its own act. | accepted as written, a named risk (webhook unread) |
| Rollback | Reverse application of the release diff to the tree: `git apply --check -R release-diff.patch` (the diff, `git diff 40ba5d3 a47e683`, written to a file first, 39,336 bytes), exit 0 (`rollback-dry-run-log.txt`). To roll back, a revert commit is released through the same tool. A consumer that re-pinned in between is not rolled back by it; none has (website pins `40ba5d3`). | re-derived by dry run |
| Ordering constraints | None: one repository, one commit, no consumer change. | re-derived from the stage set and the diff |
| Serving refs | `master` only at origin (`--report`: "one serving ref at origin (master); no pair"). `git ls-remote origin master` reads `40ba5d3`. | re-derived |
| Dry run of the move | `release-move.js . master a47e683… --dry-run --reason <text>`: "ff-from-remote ok; sibling serving refs (none) on one line ok", "workflows none", "DRY RUN: every check passed; nothing moved", exit 0 (`release-move-dry-run-log.txt`). | re-derived |

## Runbook (Mode A; results as run)

| # | Step | Abort if | Result |
|---|---|---|---|
| 1 | `git -C /usr/local/bin/hooks/project-utils ls-remote origin master` | not `40ba5d3…` (someone else moved it) | `40ba5d3a5b54447abb0dd44a9fcc7b43a35f8165` at 07:22:12Z — proceed |
| 2 | `git -C /usr/local/bin/hooks/project-utils status --porcelain` | any tracked change | 0 lines (branch `chain/fix-api-extractor-devdep`) — proceed |
| 3 | `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/project-utils master a47e683b1f33288ff89052c5ed7a982237b773aa --reason "<review record and Reviewed-At>"` | exit not 0, or a refusal, or a classifier or permission block (reported to steering and not retried in another form) | exit 0: "OK moved master: 40ba5d3… -> a47e683… on origin; tree on master" (`release-move-run-log.txt`) |
| 4 | `git -C /usr/local/bin/hooks/project-utils ls-remote origin master` | not `a47e683…` | `a47e683b1f33288ff89052c5ed7a982237b773aa refs/heads/master` at 07:22:19Z (`post-move-readback-log.txt`) |
| 5 | `git -C /usr/local/bin/hooks/project-utils branch --show-current`, `status --porcelain` | not `master`, or any tracked change | `master`; HEAD and `master` both `a47e683…`; porcelain 0 lines |
| 6 | `git -C /usr/local/bin/hooks/project-utils branch -d chain/fix-api-extractor-devdep`, output captured | refused (then `merge-base --is-ancestor` is read; `-D` only after that shows exit 0) | exit 0; `branch --list` shows `master` only; `merge-base --is-ancestor a47e683 origin/master` exit 0 (`branch-delete-log.txt`; the `rtk` filter printed the git message as "ok", which this record leaves as captured) |

## Open disagreements with predecessor documents

None open. The review's CR-2 (a stale "stops here" sentence in the fixer's document body, INFO, optional) is a reconcile note for the fixer, not tree-holding, and is
not a disagreement with this record. CR-1 (statbot-utils has the same undeclared tool) is steering's, routed to the statbot record's inbox (brief); it is not this release's.

## Assumption Not Checked, by predecessor, that this release exercises

| Predecessor | Assumption | Read that closes it | State |
|---|---|---|---|
| Code review (round 1) | An npm/node pair other than npm 11.9.0 / node v24.14.0 installs the same tree from this `lockfileVersion: 2` lock and rebuilds the same `dist/`. | A rebuild under another toolchain. This release records the toolchain it ran under: node v24.14.0, npm 11.9.0 (this stage's re-run and the fixer's hooked commit). | Not tested, by design: no other toolchain is in play (nothing deploys, no host). It stays a named risk; if false, `npm ci` on another developer's toolchain would rewrite the lock or the pre-commit hook would refuse. No production observation closes it, and no session can run another-toolchain read before the first ref moves. |

## User Confirmation

Not asked: the push deploys nothing and takes no owner approval (above). The brief naming the end step is the trigger.

## Release Execution

Mode A, run by this session, 2026-11-22T07:22Z. Commands and results are the runbook rows above (captures under `verification/fix-api-extractor-devdep/devops/`:
`release-move-dry-run-log.txt`, `release-move-run-log.txt`, `post-move-readback-log.txt`, `branch-delete-log.txt`). The readiness document was committed first (record `f042fca9`),
with the tip's packaging capture, before the ref moved.

- Ref moved: project-utils `origin/master`, `40ba5d3a5b54447abb0dd44a9fcc7b43a35f8165` to `a47e683b1f33288ff89052c5ed7a982237b773aa`, a fast-forward of one commit. Local `master` moved with it
  and the tree is on `master` (porcelain 0 lines; the shared tree keeps its gitignored `node_modules/` per ruling 07:11). No tag created; nothing published (a branch move has no registry).
- Deploy evidence: the push, ref `master`, SHA `a47e683`, 07:22Z, read back by `git ls-remote origin master`. The push deploys nothing: no workflow, no host. Serving state is not otherwise probed.
- Reconciliation, deployed against verified: the commit at the serving ref is `a47e683b1f33288ff89052c5ed7a982237b773aa`, which is the code review's `Reviewed-At` SHA and the fixer's `Handoff-At`. They are the same commit, so no surface diff is owed.
- Consumers resolving to the release: none do, and none change: website's `package.json` and `pnpm-lock.yaml` still pin `40ba5d3`, and the new line is a devDependency.
- The fix branch `chain/fix-api-extractor-devdep` was merged by the fast-forward and deleted by `git branch -d` alone (captured). Its commit is on `master`.
- Gate deviations: none. No control, classifier or permission block fired.
- Set up and removed: the packaging re-run's `git archive` export and `node_modules` lived under this session's scratchpad (`.../scratchpad/tip`) and were removed (`ls` of the scratchpad: empty); the capped `systemd-run` scopes ended with their commands (`ps`: no `npm`/`systemd-run` process of this run remains). The cache-warm wake stays armed in this session.

## Post-Release Status

Released 2026-11-22T07:22Z. Known issues: none on this release. Rollback Plan: the reverse-apply dry run above (a revert commit released through the same tool); no consumer has re-pinned.
The sibling defect (statbot-utils has the same undeclared `api-extractor`, review CR-1) is outside this workspace and is carried by the statbot record's inbox entry (below); it is not this release's.

## Phase 2D — post-release

| Step | State |
|---|---|
| Plans `Released` | No plan. The chain's stage documents are set `Released` and moved to `closed/`: the fixer's `implementation/fix-api-extractor-devdep-implementation.md`, the review `code-review/fix-api-extractor-devdep-code-review.md`, and this record. |
| Release-tip QA record | None exists (no QA in the stage set); nothing to close. |
| Deployed against verified | Same commit (above). |
| Fix branch | Merged and deleted (runbook row 6). |
| Architecture lines | None closed or invalidated. `architecture/system-architecture.md:143` and `:276-277` describe the `npm run rebuild`/api-extractor mechanism and the identical `build:types` in project-utils and statbot-utils; both still hold, and the change only declares the tool. The review judged the record ALIGNED. The "13 files" `dist/` count at `:277` was already stale (11) after chain 7 and is not touched by this change; it is not routed here. No architect entry is written. |
| Documents of the chain | By `Origin: fix-api-extractor-devdep` (frontmatter): the implementation, code-review and deployment documents, each `Released` and moved to `closed/`. `steering/fix-api-extractor-devdep-rulings.md` is steering's. No QA, UAT, plan, critique, handoff, analysis or architecture document carries the chain's ID. |
| Merged fixer chains | By `Handoff-At` ancestry of `a47e683` (`implementation/` open and `closed/`, anchors naming `project-utils`): `fix-git-dependency-pins` (`Handoff-At: 40ba5d3,3859c29`; `40ba5d3` is an ancestor of `a47e683`, `git merge-base --is-ancestor`, exit 0). Its implementation and code review are `Committed` and in `closed/`; its deployment record `deployment/fix-git-dependency-pins-deployment.md` is `Active` for its own release 2 (website `master`), held by steering's brief, and is not this stage's to close. Its project-utils half was released earlier (release 1, `40ba5d3`). No other fix chain anchors a project-utils commit. |
| Source handoffs | None named in the scoping block. |
| Forward items (5c) | Assumption Not Checked, found by `grep -l` over the chain's three documents (2 files with the string: the code review, this record): (1) the review's toolchain assumption: discharged here as the review defined its owner act, "records the toolchain under which the release's hooked rebuild ran" (node v24.14.0, npm 11.9.0, above); the untested remainder is a named risk with no production carrier, no event-form trigger and no host, so it has no handoff; (2) this record's own row, the same assumption. Routing phrases: review CR-1 (statbot-utils): carried by the entry in `/usr/local/bin/statbot/agent-output/INBOX.md` (line 264, an uncommitted working-tree entry in that record, steering's, read at 07:22Z); review CR-2 (a stale "stops here" sentence in the fixer's document body, INFO, optional): **uncarried as a body note** — a closed document's body is not mine to edit, so the implementation document's `Status-Detail` carries the 07:10 ruling instead and the sentence itself stays; review CR-3 (verification logs ignored by `*.log`): carried by the reviewer's uncommitted `INBOX.md` entry in this record (line 365, working tree), which this stage did not commit because that file holds 318 foreign uncommitted lines. The Risks-table falsifiers and Planner batch: none (no plan). |
| Roadmap obligation | None: a `fix-` chain owes none (the scoping determination names no epic or criterion). |
| Next Actions | None whose trigger is at or after this closure beyond the items above. |
