---
ID: n/a
Origin: fix-git-dependency-pins
UUID: 84f208f7
Reviewed-At: 40ba5d3a5b54447abb0dd44a9fcc7b43a35f8165 — repos=project-utils; round 1 covers the project-utils half only
Status: In Review
Round: 1
Verdict: APPROVED
---

# Code Review: fix-git-dependency-pins

**Plan Reference**: none (fixer route). Scope: `steering/fix-git-dependency-pins-rulings.md` blocks "2026-11-21T22:28",
"2026-11-21T22:58" and "2026-11-21T23:07"
**Implementation Reference**: `agent-output/implementation/fix-git-dependency-pins-implementation.md` (record `44bb065`,
`Handoff-At: 40ba5d3 — repos=project-utils; website half not started`)
**Date**: 2026-11-21
**Reviewer**: `code-reviewer-fix-git-dependency-pins`

## Changelog

| Date (UTC) | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-21T23:10 | steering-hooks (brief `steering/fix-git-dependency-pins-brief-code-reviewer.md`) | Round 1: the project-utils half at `40ba5d3` | Round 1: APPROVED. Red and green re-run, lockfile claim reproduced by a second instrument, the shared-cache rebuild checked. No findings |

## Scope of this round

The criteria assessed are scope items 1 and 2 as the 22:58 block states them, plus the 23:07 ruling:

1. `prisma-kysely` moves from `dependencies` to `devDependencies`; the lockfile changes only in that package's subtree's `dev` flags
   (no package added, removed or re-versioned).
2. `dist/prisma.js(.map)` are deleted; a clean rebuild leaves `dist/` byte-identical to the committed tree apart from those two.
3. (23:07) With the gitignored `build/js/prisma.js(.map)` cache gone, a rebuild leaves no untracked `dist/prisma.js`.

Items 3-4 (the website pin) are round 2's.

Files under review (the implementation document's Change table, matched by `git -C project-utils diff --numstat 749606d 40ba5d3`):
`package.json` 1/1, `package-lock.json` 760/194, `dist/prisma.js` 0/21, `dist/prisma.js.map` 0/1. Read with `git show`. The shared tree
was at `40ba5d3`, branch `chain/fix-git-dependency-pins`, at the start and at the end of the review (`code-review/sha-start.txt`,
`sha-end.txt`). Its porcelain was empty at both points. It was not switched or built in.

All evidence paths below are under `/usr/local/bin/hooks/agent-output/verification/fix-git-dependency-pins/code-review/`.

## Architecture Alignment

**System Architecture Reference**: `/usr/local/bin/hooks/agent-output/architecture/system-architecture.md`. It is present on disk
(`ls`) and tracked at record HEAD (`git -C agent-output ls-files architecture/system-architecture.md`).
**Alignment Status**: ALIGNED

The change keeps the build-in-tree shape (`pinned-dep-shipping`): `dist/` is still committed and is still what a clean build
produces. The package entry point `dist/index.js` still loads under a runtime-only install (A4). L121/L166 record the project-utils pin
as `eb38a15`, which is already stale against the lock's `749606d`. Steering lodges that for the architect at closure (common brief);
this round does not edit it.

## Evidence

**Which process produces the evidence.** The claims are about what npm installs and what `tsc` plus the `build` script produce. So the
evidence is npm's and the build's own output in clean `git archive` exports. It is not the fixer's reading of the lockfile diff.

| Check | Instrument | Result |
|---|---|---|
| Red at `749606d` | the fixer's `../check-project-utils.sh`, re-run (`red-749606d.stdout`, `red-749606d/`) | A1 FAIL, A2 FAIL (`a2-dist.diff`: exactly `Only in committed/dist: prisma.js` and `prisma.js.map`, `grep -c ''` = 2), A3 FAIL (`prisma-kysely`, `@prisma/internals` and `@mrleebo/prisma-ast` all installed), A4 PASS. Same as the fixer's capture |
| Green at `40ba5d3` | same script (`green-40ba5d3.stdout`, `green-40ba5d3/`) | A1-A4 PASS. `a2-dist.diff` is 0 lines and `a2-src.diff` is empty. Lint and build both exit 0 |
| Hazard 1 (committed `dist/` is otherwise current) | A2 above, at both SHAs | At the base, the only difference from a clean rebuild is the two prisma files. At the fix, there is no difference. The stop condition did not fire |
| Lockfile claim: the subtree only gains `dev: true` | **R1**, a second instrument with a different shape from the fixer's classifier (`review-checks.sh`, `review/`): `npm ci --omit=dev` at both SHAs. It walks `node_modules` on disk at every depth and lists each package path and its on-disk version. It compares that list with the lock entries whose only key-sorted change is `dev` gained | `installedBase` 301, `installedFix` 18, removed 283, added 0, re-versioned 0, `lockDevGained` 283, and both set differences are empty (`review/r1-compare.json`). This reproduces the fixer's 283 from what npm actually installed, not from a reading of the lock |
| Lockfile classifier (the fixer's) | read in full (`../classify-lock-diff.js`). Its two negative controls are on record | Accepted as the first instrument. R1 is the cross-check |
| 23:07 ruling: no untracked `dist/prisma.js` after a rebuild | **R2**: an export of `40ba5d3` with the shared tree's current `build/` and `tsconfig.tsbuildinfo` copied in, then `npm ci`, `build` and `build:types`. Positive control: the same build with `build/js/prisma.js(.map)` planted from `749606d` | Cache-state build: `distdiff=0`, no `dist/prisma.js`. Planted control: `distdiff=1`, the two files reappear (`review/r2-dist-planted.diff`). So the instrument can see the failure, and the current cache does not cause it. `ls -d build/js/prisma.js build/js/prisma.js.map` in the shared tree: both absent |
| Release consequence | `ls -d /usr/local/bin/hooks/project-utils/.github`: absent. `git ls-files .github`: 0 | The project-utils push triggers no workflow. Whether anything else watches the branch is devops's to establish |
| Convention check | `node ~/.claude/tools/convention-check.js /usr/local/bin/hooks/project-utils --since=749606d` (`convention-check.txt`) | exit 0. 0 FAIL, 0 CANDIDATE, 5 SKIP. Unchecked: the two deleted files ("missing file"), the two `.json` files (outside the examined set), and the id-token/basename rule (not implemented verbatim). No source or comment changed |

**Disclosed, my instrument.** R1's first run (`review-run1-keyorder-bug/`) reported `lockDevGained` 57 and failed. The cause was my
comparison, not the change: it compared entries by `JSON.stringify` after adding `dev`, and that depends on key order. npm writes
`dev` mid-entry. I changed the comparison to key-sorted and re-ran. The committed `review/` capture is from that re-run. Its R2 lines
are the same in both runs.

**Runtime reach.** `git -C project-utils grep -n -i prisma 40ba5d3 -- src dist` finds nothing. So no shipped code imports the moved
package, and A4 confirms that the entry point loads without it.

## TDD Compliance Check

**TDD Table Present**: No. This is a fixer route with no plan. The red/green record is the implementation document's Test section.
**All Rows Complete**: Not applicable.
**Concerns**: None. project-utils has no test suite (workspace `CLAUDE.md`). The red instrument is a spec check that fails at the base
on the three assertions the fix targets, and passes at the fix. A4 is the guard for behaviour that must not regress: it passes at both
SHAs, and this round adds no mutation of it (the dist removal does not touch `index.js`). No test is owed in the project's own suite
because none exists to extend. Fewer than 20 production lines were added, so this review ran the build and the red evidence itself
(above). No suite exists to run.

## Findings

### Critical
None.

### High
None.

### Medium
None.

### Low/Info
None.

## Verdict

**Status**: APPROVED
**Rationale**: Both scope items and the 23:07 ruling hold under execution in clean exports. A second instrument, built from what npm
actually installs, reproduces the lockfile claim exactly (283 removed, 0 added, 0 re-versioned). The committed `dist/` is current apart
from the two deleted files. No source changed.

## Required Actions

None for round 1.

## Assumption Not Checked

This review assumes that no consumer outside the workspace loads `prisma-kysely` (or `@prisma/internals` /
`@mrleebo/prisma-ast`) through project-utils' runtime install, and it does not test that. If the assumption is false, such a consumer
fails at runtime with `Cannot find module 'prisma-kysely'` after it re-pins to the new commit. Nothing changes for any consumer until it
re-pins. Owner: steering-hooks. The determination excluded outside consumers ("what the sweep did not cover"). The one consumer inside
the workspace, website, is round 2's.

## Next Steps

- devops brings `40ba5d3` onto project-utils `master` and pushes it mid-chain (the stage set). The spawn cue goes to `steering-hooks`.
- steering-hooks: the outside-consumer assumption above.
- Round 2 (the website half) waits for a later brief.
