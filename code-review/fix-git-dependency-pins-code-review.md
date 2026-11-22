---
ID: n/a
Origin: fix-git-dependency-pins
UUID: 84f208f7
Reviewed-At: 40ba5d3a5b54447abb0dd44a9fcc7b43a35f8165,3859c29d557c920a5b611b8e3a4e7b5bf7b1222e — repos=project-utils,website; round 1 the project-utils half, round 2 the website half
Status: In Review
Round: 2
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
| 2026-11-22T00:12 | steering-hooks (brief `steering/fix-git-dependency-pins-brief-code-reviewer-round2.md`, record `41d56a7`) | Round 2: the website half at `3859c29` | Round 2: APPROVED. Red and green re-run (suite, typecheck, frozen install). Cold-store install fetches both commits. The installed set reproduces the 144-package removal. Classifier controls run; one blind spot found, and the field it misses checked against pnpm's own output. No findings |

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
  Done: `git -C project-utils ls-remote origin master` shows `40ba5d3…` (read at round 2).
- steering-hooks: the outside-consumer assumption above.

---

# Round 2 — the website half

## Scope of this round

Stage start: the fixer's document at record `80a5778`, `Handoff-At: 40ba5d3,3859c29 — repos=project-utils,website`. The brief is
`steering/fix-git-dependency-pins-brief-code-reviewer-round2.md` (record `41d56a7`). The criteria assessed are scope items 3 and 4 as
the 22:58 block states them:

3. `package.json` names project-utils by the pushed commit and paracord by `3f203086…`, both as full SHAs.
4. `pnpm-lock.yaml` is edited by hand (his selection A). It changes the two specifiers, project-utils' resolved commit and its
   dependency list (`prisma-kysely` and whatever only it held leave). No other package version moves.
   `pnpm install --frozen-lockfile`, the suite and `pnpm run typecheck` all exit 0.

Hazard 3 (both pinned commits are fetchable) is re-derived as well.

Files under review: `git -C website diff --numstat 132a7ab 3859c29` gives `package.json` 2/2 and `pnpm-lock.yaml` 6/1190. Both were
read with `git show` and `git diff`. The shared website tree was at `3859c29` on `chain/fix-git-dependency-pins` at the start and at the
end (`code-review/website-sha-start.txt`, `website-sha-end.txt`). Its porcelain was only the foreign `?? .playwright-mcp/` at both
points. It was not switched, installed into or built in.

## Architecture Alignment

**Alignment Status**: ALIGNED. Pinning git dependencies by full commit is what H37/F-36 ask for, and `system-architecture.md`
L121/L166 record project-utils as consumed by commit. L166's `eb38a15` is stale against both the old and the new pin, and is lodged
for the architect at closure (common brief).

## Evidence

Evidence paths are under `/usr/local/bin/hooks/agent-output/verification/fix-git-dependency-pins/code-review/`.

**Which process produces the evidence.** These claims are about pnpm's resolution and install, vitest and tsc. So the evidence is
their output in `git archive` exports.

| Check | Instrument | Result |
|---|---|---|
| Red at `132a7ab` | the fixer's `../check-website.sh`, re-run (`website-red-132a7ab.stdout`, `website-red-132a7ab/`) | W1 FAIL (`#master`, no ref on paracord). W3 FAIL (the store holds `prisma-kysely@1.7.1`, `@prisma+internals@5.3.1` and project-utils `749606d`). W2, W4 and W5 PASS. Same as the fixer's capture |
| Green at `3859c29` | same script (`website-green-3859c29.stdout`, `website-green-3859c29/`) | W1-W5 PASS. Vitest: 2358 cases, 2358 passed, 0 failed, 0 pending, 165 files. Process exit 0 (W4 asserts the exit code beside the counters). The file sets at both revisions are identical by path (`cmp` of the two `w4-files.txt`, exit 0). `pnpm run typecheck` exit 0, after `next typegen` |
| Hazard 3: both commits fetchable | **R3** (`review-website.sh`, `website-review/r3-install-cold.txt`): `pnpm install --frozen-lockfile --store-dir <empty dir>` at `3859c29`, so nothing comes from a warm store. Also `git -C project-utils ls-remote origin master`, `gh api repos/mr-tech/paracord/commits/3f20308…`, and a `curl -I` of paracord's codeload tarball | Cold install exit 0, and project-utils resolves to the `…project-utils.git+40ba5d3…` store directory. `origin/master` is `40ba5d3a5b54447abb0dd44a9fcc7b43a35f8165`. paracord's commit returns its SHA, and the tarball returns HTTP 200. `gh api` on `hooks-gg/project-utils` returns 404 because this token cannot see the private repo; the SSH `ls-remote` and the cold install are the evidence instead |
| Item 4: nothing but the pin's subtree moves | **R4**, a second instrument with a different shape from the fixer's classifier: the `node_modules/.pnpm` directory listing after a frozen install at each revision. It is compared with the lockfile's removed and added `snapshots` keys, parsed with js-yaml (`website-review/r4-compare.json`) | 1404 → 1260 directories. 145 removed (144 plus the old project-utils), matching the 145 removed snapshot keys one for one by name@version. The only directory added is the new project-utils. This reproduces the fixer's 144 from what pnpm installed |
| Item 4: the fixer's classifier | `../classify-website-lock.js` re-run over `git show` of both locks (`website-lock-classify-3859c29.json`). Plus four controls of mine (`website-classifier-controls.js`, `website-classifier-controls/summary.json`) | Committed lock: exit 0. C1, deleting a still-reachable snapshot (`kysely@0.26.1`): exit 1. C2, putting `prisma-kysely@1.7.1` back: exit 1. C3, re-versioning `zod`: exit 1. **C4, changing the project-utils snapshot's `transitivePeerDependencies`: exit 0.** So the classifier does not constrain that field (below) |
| The one field the classifier misses | the fixer's captured pnpm regeneration, `../website-lock-classify-control-pnpm-lockfile-only.json` `projectUtilsSnapshot` | pnpm's own `--lockfile-only` result gives `transitivePeerDependencies: [pg-native]`, the same as the committed hand edit. So the committed value is right, by pnpm's own output |
| Real project-utils loads from website's install | **R5** (`website-review/r5-require-*.txt`): `require('project-utils')` in each export after a frozen install. 31 test files name `project-utils` (`git grep -l` under `__tests__`). 28 replace it with `vi.mock`, and the other 3 import only `type { DatabaseSchema }`, which is erased at runtime. So the suite never loads the real module | exit 0 at both revisions; exports `getPostgres` |
| Production build | not run. `dist/index.js` and every other shipped file of project-utils is byte-identical between `749606d` and `40ba5d3` (round 1: the numstat names only the two deleted prisma files). paracord's resolved tarball is unchanged (same `version`, deep-equal snapshot: classifier C0). So the bundle's inputs do not change. Website `master`'s production build fails today for missing settings, unrelated to this chain (chain 6 rulings block 23:55) | not run; reason as stated |
| Deploy-host pnpm | `package.json` `packageManager: pnpm@10.28.2`, the version these runs used | same version |
| Convention check | `node ~/.claude/tools/convention-check.js /usr/local/bin/hooks/website --since=132a7ab` (`convention-check-website.txt`) | exit 0. 0 FAIL, 0 CANDIDATE, 20 SKIP: 17 are the foreign `.playwright-mcp/*.png`, two are the changed `.json`/`.yaml` files (outside the examined set), and one is the id-token rule (not implemented verbatim). No source changed |

**Classifier blind spot.** `classify-website-lock.js` compares the new project-utils snapshot's `dependencies` against the base minus
`prisma-kysely`, but nothing constrains its `transitivePeerDependencies` (C4). This is the fixer's one-shot record probe, not the
project's suite, and it does not move the verdict: the field's committed value is checked against pnpm's own regeneration above. I
raise it as no finding because no release decision rests on it. A later reuse of this classifier should not treat it as covering
that field.

**Disclosed, my instruments.**
- The first launch of this round passed the fixer's `check-website.sh` a relative output directory. The script `cd`s into its export
  before writing, so every step failed to write and every assertion read FAIL. That was my invocation, not the change. I removed those
  empty output directories and their stdout files, and re-ran with absolute paths. The committed red and green captures are from that
  re-run.
- R4's first matcher cut directory names at the first `_`, and `string_decoder` has one in its name, so it reported one unmatched
  directory. I changed it to cut only within the version segment. The first run is kept in `website-review-run1-matcher-bug/`. Its
  R3 line is the same in both runs.

**Paracord at runtime.** The fixer recorded the read of where website uses paracord as not completed. At `3859c29`, `git grep` finds
`src/utils/discord.ts` (`Api`), `src/server/api/utils/guild.ts` (`isApiError`) and `bot/scripts/publishAppCommands.ts`. The resolved
paracord tarball is unchanged by the pin, so those paths load the same code as before. paracord sits in `devDependencies` while
runtime source imports it. That predates this chain and the pin does not touch it. It is noted here, not raised.

## TDD Compliance Check

**TDD Table Present**: No. This is a fixer route; the red/green record is the implementation document's Test § Website half.
**Concerns**: None. W1 and W3 fail at the base and pass at the fix. W2, W4 and W5 are guards for behaviour that must not regress, and
pass at both revisions. No test file changed, so test authorship and naming are not in play. Fewer than 20 production lines were added
across both halves (3), so this review ran the suite, typecheck, the frozen install and the fixer's red evidence itself (above).

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
**Rationale**: Both specifiers name full commits that GitHub serves (cold-store install). The hand-edited lock is accepted by
`pnpm install --frozen-lockfile`. A second instrument built from the installed set shows it removes exactly the 144 packages only
`prisma-kysely` held, adds only the new project-utils and moves nothing else. The suite (2358/2358, exit 0) and both typecheck
programs pass at the fix as at the base.

## Required Actions

None for round 2.

## Assumption Not Checked

This review assumes, and does not test, that the deploy host's install takes this lock exactly as `pnpm@10.28.2` does here. It
assumes the host uses the `packageManager` version and fetches the private project-utils repository over SSH, as it did for
`749606d`. If that is false, the release deployment's install step fails, either with `ERR_PNPM_OUTDATED_LOCKFILE` or with a clone
failure on `git@github.com:hooks-gg/project-utils.git`. Owner: devops. Before the website `master` push, it reads the pnpm version and
the git-dependency fetch line in the last successful production deployment's install log. Production builds currently fail for
missing settings (block 23:55), so that read is of an earlier deployment, not this push.

## Next Steps

- devops: the website `master` release of `3859c29`, on his approval, once a production build passes (block 23:58). Before the push,
  the deploy-host install read above. The spawn cue goes to `steering-hooks`.
