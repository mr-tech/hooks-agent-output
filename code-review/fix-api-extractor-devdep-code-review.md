---
ID: n/a
Origin: fix-api-extractor-devdep
UUID: 3c9e71a4
Reviewed-At: "a47e683 — repos=project-utils; base 40ba5d3"
Status: In Review
Round: 1
Verdict: APPROVED_WITH_COMMENTS
---

# Code Review: fix-api-extractor-devdep

**Plan Reference**: no plan; this is a fixer chain. Scope is the determination in
`agent-output/steering/fix-api-extractor-devdep-rulings.md` (blocks 04:58, 07:10 and 07:11).
**Implementation Reference**: `agent-output/implementation/fix-api-extractor-devdep-implementation.md` (record `1168acc`)
**Date**: 2026-11-22
**Reviewer**: Code Reviewer (`code-reviewer-fix-api-extractor-devdep`)

## Changelog

| Date (UTC) | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-22T07:16 | steering-hooks (brief `steering/fix-api-extractor-devdep-brief-code-reviewer.md`) | Round 1 review of project-utils `a47e683` | Round 1: APPROVED_WITH_COMMENTS at `a47e683`. Red/green rebuild was reproduced in exports with the global tool off `PATH`, and `dist/` is byte-identical. The lockfile delta is the api-extractor subtree plus the two admitted bumps. CR-1 LOW goes to steering; CR-2 and CR-3 are INFO. |
| 2026-11-22T07:18 | self | Evidence capture correction (verdict unmoved) | Round 1 record `ab3c27e` left out `runs/*.log`, because the record's `.gitignore` has `*.log`. They are re-captured as `runs/*-log.txt`, and CR-3 is widened to the class. Disclosure: two text replacements in this document were made by an ad-hoc `python3` in-place script, not by Edit or `record-edit.js`, which is a breach of the record-writing rule. The diff of this commit shows exactly what it wrote. |

## Stage start and criteria

- Stage start: the implementation document at `Handoff-At: a47e683 — repos=project-utils; base 40ba5d3`, re-derived as follows.
  `git rev-parse HEAD` in project-utils returned `a47e683b1f33288ff89052c5ed7a982237b773aa` at the start of the review and again at
  the end. The branch is `chain/fix-api-extractor-devdep`, base `40ba5d3` = `origin/master`, and `git status --porcelain` was 0 bytes at
  start and end. Only `git show`/`git archive` read the shared tree, and nothing moved it.
- Criteria assessed, taken from the scope statement as it stood at round open (as amended by the 07:10 ruling):
  1. `@microsoft/api-extractor` is in `devDependencies` at a version compatible with `api-extractor.json`, and the version choice is recorded.
  2. `package-lock.json` changes only by that package's subtree plus the two admitted in-range hoisted bumps (`function-bind` 1.1.2,
     `is-core-module` 2.18.0), and top-level `typescript` stays at 5.1.6.
  3. `npm run rebuild` succeeds with the global `api-extractor` off `PATH`, and leaves `dist/` byte-identical to the committed tree.
  4. The write set is `package.json` and `package-lock.json` only.

## Evidence (all under `agent-output/verification/fix-api-extractor-devdep/code-review/`)

The fixer's red/green runs and `lockdiff.js` are the evidence for its own claims. The reviewer wrote neither, so this review re-derives
each claim with its own differently-shaped instruments:

| Claim | Instrument (this review's) | Result |
|---|---|---|
| Diff is in write set | `git diff --numstat 40ba5d3 a47e683` | `package.json` 1/0, `package-lock.json` 745/15; one commit in `40ba5d3..a47e683` |
| package.json delta | `git diff 40ba5d3 a47e683 -- package.json` | one added line, `"@microsoft/api-extractor": "^7.49.2"` in `devDependencies` |
| Committed = fixer's green candidate | `cmp` of `git show a47e683:package-lock.json` / `package.json` against the fixer's `candidate-*` | both exit 0 |
| Lockfile delta shape | `lock-reach.js` (node walk-up resolution, reachability from each root dependency; output `lock-reach.txt`). The fixer's `lockdiff.js` compares entries one by one; this instrument classifies by graph instead | 35 non-root entries differ. 31 are added and reachable **only** from api-extractor. `hasown` 2.0.4 is added and reachable from both (api-extractor, and the bumped `is-core-module`). `function-bind` 1.1.1→1.1.2 and `is-core-module` 2.11.0→2.18.0 changed, reachable from both. Top-level `typescript` 5.1.6→5.1.6 differs only in a `license` field. No entry was removed, and no old-reachable entry is missing from the new lock (0). This agrees with the fixer's `changed=36`, which counts the root `""` entry |
| Bumps in range | `range-check.js` (npm's own `semver.satisfies` over every dependent's declared range; `range-check.txt`) | all `ok=true`. `function-bind` 1.1.2 is used by call-bind, es-abstract, get-intrinsic and has (`^1.1.1`) and by hasown (`^1.1.2`). `is-core-module` 2.18.0 is used by resolve (`^2.9.0`), eslint-plugin-import and eslint-import-resolver-node (`^2.11.0`), and nested resolve (`^2.18.0`); engines `node >= 0.4`. Root `typescript` `^5.1.6` resolves to 5.1.6, and api-extractor's exact `5.7.2` pin is nested |
| Red/green with the global off PATH | `rebuild-pair.sh` (per-SHA `git archive` export, `npm ci`, `npm run rebuild` under `PATH=<shim: node,npm,npx>:/usr/bin:/bin`, `systemd-run --scope MemoryMax=8G TasksMax=512`, 600 s KILL; logs committed as `runs/*-log.txt`) | `command -v api-extractor` found nothing under that PATH for either SHA. **Red at `40ba5d3`**: `sh: 1: api-extractor: not found`, `exit=127`, and `node_modules/.bin/api-extractor` is absent. **Green at `a47e683`**: `npm ci` added 481 packages (449 at red), the rebuild reached "API Extractor completed successfully" with `exit=0`, and `.bin/api-extractor → ../@microsoft/api-extractor/bin/api-extractor` |
| dist/ byte-identical | `diff -r` of committed `dist/` (git archive) vs rebuilt `dist/`, plus per-file sha256 manifests | green: `diff` exit 0, and the rebuilt manifest is byte-equal to the committed one (`cmp` 0, 11 files = `git ls-files dist` count 11). The committed manifests at both SHAs are equal. Red: `Only in …committed/dist: index.d.ts`, so the negative control fires |
| Lint passes, no src rewrite | green rebuild ran `eslint --fix . --max-warnings=0`, then `diff -r` of `a47e683:src` vs export `src` | rebuild exit 0, src diff exit 0 |
| Version compatibility | green run against `api-extractor.json` at `a47e683` | passes; logs "Analysis will use the bundled TypeScript version 5.7.2". 7.49.2 is the version of the box's global, which produced the committed `index.d.ts`, and output is identical |
| Toolchain | `node -v` / `npm -v` | v24.14.0 / 11.9.0; lockfileVersion 2 at both SHAs |

The pre-commit hook (`.githooks/pre-commit`, `git show` read) runs `npm run rebuild` and then refuses on `git ls-files -m`. The fixer's
hooked commit in the shared tree passed it, and the shared tree is clean at `a47e683`, which this review reconfirmed.

## Architecture Alignment

**System Architecture Reference**: `agent-output/architecture/system-architecture.md`
**Alignment Status**: ALIGNED

The architecture record describes project-utils as a git dependency with committed `dist/` and an API Extractor `.d.ts` rollup produced by
`npm run rebuild` under the `.githooks/` pre-commit hook ("project-utils owns `schema.prisma` …" decision; owner rationale "api-extractor").
The change makes that build self-contained and leaves the mechanism untouched. `npm run` puts `node_modules/.bin` first on `PATH`, so the
declared 7.49.2 now wins over the global 7.49.2, and the version is the same. Consumers are unaffected, since a devDependency is not
installed by consumers. Website still pins `project-utils#40ba5d3…` (`git -C website show HEAD:package.json`). The record's "13 … files"
`dist/` count in that decision's Verification line is a point-in-time figure, now 11 after the earlier chain's `40ba5d3`. This change does
not touch it, so it is not a finding here.

## TDD Compliance Check

**TDD Table Present**: No. The fixer definition asks for a recorded red/green, not a table, and project-utils carries no test suite (workspace `CLAUDE.md`).
**All Rows Complete**: n/a
**Concerns**: The red/green pair the determination named is recorded. This review reproduced it independently: red at `40ba5d3`
(exit 127), green at `a47e683` (exit 0). No production source lines changed (`convention-check.js --since=40ba5d3`: 0 files examined,
0 FAIL, 0 CANDIDATE, 3 SKIP, this review's run saved at `verification/fix-api-extractor-devdep/code-review/convention-check.txt`, matching the fixer's). The SKIPs are both `.json` files,
which are outside the checker's set, and the ID-token/basename checks, which did not run. Those three are unchecked by the gate. The diff
carries no source, comment or test file to which they would apply.

## Findings

### Critical
None.

### High
None.

### Medium
None.

### Low/Info

**CR-1 LOW Round 1 Build Hygiene**: The sibling `statbot-utils` invokes `api-extractor` without declaring it
- **Location**: `/usr/local/bin/statbot/statbot-utils` `package.json` `scripts["build:types"]` at `12d3b71` (branch `prod`). This is outside this workspace.
- **Class**: A package script invokes a binary that is in no manifest's `dependencies`/`devDependencies`, so the script resolves only through a global install.
- **Enumeration**: `runs/script-binaries.txt` resolves every first word of every `&&`/`;`/`|` segment of project-utils' scripts in the
  `a47e683` export. It found 9 rows and 0 UNRESOLVED: eslint, tsc ×2, rimraf and api-extractor are local, cp is `/usr/bin/cp`, and npm ×3.
  The class is gone in project-utils. The architecture record names `statbot-utils` as carrying the identical `build:types`. A
  `package.json` read there found `api-extractor` in neither dependency block (1 member). The predicate cannot see a binary reached
  through `npx`, a shell script or `node -e`, nor any other statbot repository. Those were not read.
- **Issue**: The same defect sits in the sibling the architecture record cites as the pattern's origin. The scope statement's "Not
  covered" excludes it, and it does not bear on this tree.
- **Required Action**: Steering decides whether to re-scope. The site is outside the region the scope statement covered, and the statbot
  workspace is not this chain's.
  - **Minimum**: The same one-line devDependency in `statbot-utils`, on its own chain, if steering opens one.

**CR-2 INFO Round 1 Record Accuracy**: The implementation document's lockfile paragraph still reads as blocked
- **Location**: `implementation/fix-api-extractor-devdep-implementation.md` § Change, "Lockfile disposition", closing sentence ("That is outside the statement, and the work stops here for steering's ruling.").
- **Class**: A stage document's body states a state that a later ruling superseded, without a reconcile note.
- **Enumeration**: `grep -n -c "stops here\|Blocked on" implementation/fix-api-extractor-devdep-implementation.md` gives 3 hits. Two are
  in the changelog (the 07:09 and 07:11 rows) and are correct as history. The third is in the body, and it is the member. The predicate does not match other
  phrasings of a stale state.
- **Required Action**: The fixer adds one dated reconcile note in that paragraph citing the 07:10 ruling (`832632c`). It does not hold the tree.

**CR-3 INFO Round 1 Instrument Capture**: Fixer evidence the record cites is not reproducible from git
- **Location**: `verification/fix-api-extractor-devdep/run.sh`, the `S=` assignment, which reads the fixer session's scratchpad `shim/`. The
  fixer's `red-rebuild.log`, `green-rebuild.log` and `base-which.log` are matched by the record's `.gitignore` `*.log` rule
  (`git check-ignore -v`), so they are absent from `git ls-files`.
- **Class**: Evidence a stage document cites lives only on disk, either at a scratch path or under an ignored name. The record therefore
  does not carry it.
- **Enumeration**: `grep -c scratchpad verification/fix-api-extractor-devdep/run.sh` gives 1. `ls verification/fix-api-extractor-devdep/*.log`
  lists 3 files, all ignored. This review's own `runs/*.log` were caught by the same rule at its first commit. They are now committed as
  `runs/*-log.txt` (8 files), and the citations below and above read those. The predicates do not see other kinds of uncaptured
  dependency, such as a network registry.
- **Required Action**: No fixer action is needed for the verdict.
  `verification/fix-api-extractor-devdep/code-review/rebuild-pair.sh` builds its shim from `command -v node/npm/npx` at run time and
  reproduces both runs from the record. Its committed `runs/*-log.txt` cover what the fixer's ignored logs showed. The `*.log` rule
  catching verification evidence is the record tools' domain. An entry for the record's `INBOX.md` was appended to the working tree but **not committed**. `INBOX.md` carries 318 uncommitted lines that are not this review's (`git diff --numstat INBOX.md` gives 322/0, of which this entry is 4), and `--only` would commit them too. The entry is left in the tree, and steering has been told.

## Verdict

**Status**: APPROVED_WITH_COMMENTS
**Rationale**: All four criteria were re-derived at `a47e683` with this review's own instruments, as listed above. The diff is one
`devDependencies` line plus a lockfile delta whose every changed entry is api-extractor's subtree or the two admitted, in-range hoisted
bumps. Top-level `typescript` stays at 5.1.6. The build passes with no global tool, and `dist/` is byte-identical. The findings are a
sibling-repo re-scope question for steering and two record notes, and none holds the tree. No production lines were added, so QA is
skipped per the stage set. The suite run against the pre-fix tree is not applicable because the repository has no suite. The fixer's red
check (the rebuild at `40ba5d3`) was re-run red here.

## Required Actions

- Optional: CR-2 is a reconcile note by the fixer.
- CR-1 is steering's re-scope decision.

## Assumption Not Checked

- Round 1: This review assumes that an npm/node pair other than npm 11.9.0 / node v24.14.0 installs the same tree from this
  lockfileVersion-2 lock and rebuilds the same `dist/`. It does not test that assumption. If it were false, `npm ci` on another
  developer's toolchain would rewrite `package-lock.json`, or the pre-commit hook would refuse with "Uncomitted files detected". Owner:
  devops at release, which records the toolchain under which the release's hooked rebuild ran. This release deploys nothing (rulings
  04:58, "workflows none"), so no production observation closes it.

## Next Steps

- devops: push project-utils `master` from `chain/fix-api-extractor-devdep` at `a47e683` (stage set; no QA, because no production lines
  were added). It also owns the Assumption Not Checked above. The spawn cue goes to `steering-hooks`.
- steering-hooks: CR-1 re-scope decision (statbot-utils).
- fixer: CR-2 reconcile note (optional, not tree-holding).
