---
ID: 015
Origin: 015
UUID: 861e5f61
Reviewed-At: "037935d — repos=website; M0 only"
Status: In Review
Round: 1
Verdict: APPROVED_WITH_COMMENTS
---

# Code Review: Plan 015 — Bug-evaluation fixes

**Plan Reference**: `agent-output/planning/015-bug-evaluation-fixes.md`. Read at agent-output `ec45936`, which is plan rev 8 (`1f7715b`) plus registrations R-3 and R-4.
**Implementation Reference**: `agent-output/implementation/015-bug-evaluation-fixes-m0-implementation.md` at agent-output `6299c9b`, `Handoff-At` 037935d.
**Date**: 2026-11-08
**Reviewer**: Code Reviewer (code-reviewer-hooks-015)

## Changelog

| Date (UTC) | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-08T06:03 | steering-hooks-015 → code-reviewer-hooks-015 (brief); implementer-hooks-015 handoff at website `037935d` | Round 1: review M0 | APPROVED_WITH_COMMENTS. CR-1 LOW: the base `testResults` path list is claimed but not stored. CR-2 INFO: the typecheck gate reads git-ignored `.next` output. TDD row 2's disclosed missing pre-change red is now closed by the probe `verification/015/cr-m0-bot-typecheck-probe.sh`, run 1. |

## Scope and identity

- **Tree.** website `037935d` (`chain/015-bug-evaluation-fixes`). Files were read with `git show 037935d:<path>`.
- **Moved branch.** At the end of the review the branch tip had moved to `61056e7` (M1 commits `44c1f44` and `61056e7`). `037935d` is an ancestor of that tip. `git diff --numstat 037935d 61056e7 -- vitest.config.ts tsconfig.test.json tsconfig.json` is empty. No M1 handoff exists, so this verdict covers M0 at `037935d` only.
- **Criteria assessed.** Recorded at round open from plan § M0 at `ec45936`:
  - (a) Record the base vitest counters and exit beside 598/598/0/54/exit 0.
  - (b) Delete `.next/dev/types` after `pgrep` shows no `next dev`; `pnpm run typecheck` then exits 0 at the base; the deletion is the only act on `.next`.
  - (c) `node_modules` is not reinstalled.
  - (d) QA § Testing Infrastructure item 1, the bot collection change, bound to M0 by QA § M0.
  - No criterion grew during the round.
- **Evidence process.** For (a) to (c), the implementer's runs, captured at `verification/015/m0-captures-037935d.txt`. For (d)'s type-check limb, my own probe, run in git-archive exports of both SHAs. That probe's output is a direct observation of `tsc` behaviour, not a model of it. For (d)'s collection limb, the implementer's capture only: I did not run vitest (QA's).

## Architecture Alignment

**System Architecture Reference**: `agent-output/architecture/system-architecture.md`. It exists: `ls -d` from `/usr/local/bin/hooks/agent-output` shows it, and `git -C /usr/local/bin/hooks/agent-output ls-files architecture` lists it.
**Alignment Status**: ALIGNED

- The record states that Vitest is present (`system-architecture.md` § Tests). No architecture line governs test collection scope.
- The plan's "Architecture lines this chain touches" names only preview-image-generator lines, and M0 reaches neither.

**Pattern claim, verified against the whole write surface.**
- Both changed files gain one `include` entry in place. Only those two files appear in `git diff --numstat 7ce866b 037935d`.
- `vitest.config.ts`'s `project()` factory and its `alias`, which already carries `bot`, are untouched.
- The new entries mirror the `src` siblings shape for shape:
  - `src/**/*.test.ts` ↔ `bot/**/*.test.ts`;
  - `src/**/__tests__/**/*.ts` ↔ `bot/**/__tests__/**/*.ts`.
- Leaving out a `.tsx` sibling for `bot` is correct: `git ls-tree -r --name-only 037935d -- bot | grep -c '\.tsx$'` → 0.

## TDD Compliance Check

**TDD Table Present**: Yes
**All Rows Complete**: Yes, with row 2's gap disclosed by the implementer and now closed here.
**Concerns**:
- **Row 2, type-check limb.** The implementer recorded no pre-change red. I ran it.
  - Probe: `verification/015/cr-m0-bot-typecheck-probe.sh`. It takes the repo, scratch directory and both SHAs as arguments. It runs `tsc -p tsconfig.test.json` in git-archive exports with a planted `TS2322`.
  - Run: `verification/015/cr-m0-bot-typecheck-probe-run1.txt`.
  - Results:
    - base `7ce866b`, plant under `bot/utils/__tests__`: exit 0, 0 hits. The plant is unseen.
    - `037935d`, the same plant: exit 2, 1 hit.
    - Control, plant under `src/utils/__tests__`: exit 2, 1 hit at both SHAs.
  - The limb discriminates, and the control shows the instrument fires on both trees.
- **Row 1, collection limb.** I did not re-execute it: running vitest is QA's. Captures §4 and §5 show 54 → 55 files and exit 0 → 1. This is the round's Assumption Not Checked.
- **Test files.** No test file was added or changed, so there are no test-authorship, naming or provenance checks to make.

**Convention check** (`node ~/.claude/tools/convention-check.js <worktree> --since=7ce866b`, in a detached worktree at `037935d`, since removed):
- 0 FAIL, 0 CANDIDATE, 4 SKIP. The SKIPs and how each was handled:
  - `tsconfig.test.json` (JSON, not examined): checked by parse instead; it parses.
  - `node_modules`: the symlink I added for the run.
  - The id-token and basename check: it is unchecked, because it looks for `TEST-CONVENTIONS.md`. M0 adds no test file, so it has nothing to check here.
  - eslint: it crashed under the symlinked `node_modules`. I re-ran `npx eslint vitest.config.ts` in the shared tree, whose file is byte-identical to `037935d` (`git diff --quiet 037935d -- vitest.config.ts` exit 0): 0 errors, 0 warnings.
- The same tool over the shared working tree reports 12 FAIL. All of them are in the implementer's uncommitted and later M1 files, which are not under this review.

## Findings

### Critical
None.

### High
None.

### Medium
None.

### Low/Info

**CR-1 LOW Round 1 Record**: the base path membership is claimed but not stored
- **Location**: `verification/015/m0-captures-037935d.txt` § 7 (agent-output `6299c9b`).
- **Class**: A gate comparand that later gates must compare against is asserted, and its contents are not captured. A later reader can only regenerate it, not compare against it.
- **Enumeration**:
  - `grep -c 'membership' verification/015/m0-captures-037935d.txt` → 1 claim (§ 7: "diff of sorted lists empty").
  - `grep -c 'src/.*__tests__' verification/015/m0-captures-037935d.txt` → 0 stored paths.
  - Blind spot: this predicate cannot see a membership claim phrased without the word "membership", such as "same files" or "file set unchanged". By reading, the captures file has no such phrasing.
- **Issue**: QA E-7 makes each milestone's gate "path membership equal to the previous milestone's set plus the new files", and QA § M0 names the post-change 54 paths as that comparand. With no list stored, the first comparison at M1 has to rebuild the base set rather than read it, so the M0 claim is prose.
  - Magnitude, read rather than measured: one list of 54 paths. `git ls-tree -r --name-only 037935d | grep -E '\.test\.tsx?$' | grep -c '^src/'` → 54, matching the claimed count.
- **Required Action**: every milestone's gate capture stores the sorted `testResults` path list it compared.
  - **Preferred (structural)**: the capture step writes `testResults[].name`, sorted and repo-relative, to a file named for the handoff SHA under `verification/015/`, and each comparison cites the predecessor's file.
  - **Minimum**: add the 54-path list at `037935d` before M1's handoff.
  - Falsity signature the stored list must exhibit: one line per file, 54 lines, none under `bot/`. Planting a file under `bot/**/__tests__` must make a diff against it non-empty.
  - Non-blocking for QA Phase 2, which re-derives membership itself.

**CR-2 INFO Round 1 Gate validity**: the typecheck gate reads git-ignored generated output
- **Location**: `tsconfig.json` `include` at `037935d`, which is untouched by M0.
- **Class**: A gate program whose input set includes untracked build output can go red or green from tree state that no commit records.
- **Enumeration**:
  - `git show 037935d:tsconfig.json | grep -c '"\.next/'` → 2 entries: `.next/types/**/*.ts` and `.next/dev/types/**/*.ts`.
  - At 06:01Z, `.next/types/` exists in the shared tree and `.next/dev/types` does not. `pgrep -af '[n]ext dev|[n]ext-server|[n]ext/dist'` exited 1, so no `next` process was running.
  - Blind spot: this predicate cannot see a generated input reached through a `.d.ts` reference or a `typeRoots` entry instead of `include`.
- **Issue**: The implementation summary says "a later red there is a milestone's own". That holds only while nothing regenerates `.next/dev/types` and `.next/types` stays type-clean. The implementer already lists the regeneration risk under Outstanding Items. D7's own reopen condition covers a red at the base.
- **Required Action**: none of the implementer. QA Phase 2 should record `ls -d website/.next/dev/types` with each typecheck run, so a red can be attributed. Changing `tsconfig.json`'s `.next` includes is outside M0 and outside D7. I leave it unrecommended, because `next` rewrites those entries itself.

## Verdict

**Status**: APPROVED_WITH_COMMENTS
**Rationale**: M0's criteria (a) to (d) are met at `037935d`, and the configuration change is the minimal mirror of the existing `src` pattern. The type-check limb was shown to discriminate by an independent probe with a positive control. CR-1 is a record gap with no effect on code, and CR-2 is an observation for QA.

## Required Actions

- **CR-1 (implementer, before M1's handoff):** store the 54-path list at `037935d` beside the captures.
- **CR-2 (QA):** record the state of `.next/dev/types` with each typecheck gate run.

## Assumption Not Checked

- Round 1: This review assumes vitest's node project collects and executes a case under `bot/**/__tests__` at `037935d`, as captures §4 and §5 report, and does not test it. If that is false, a `bot/**/__tests__` test file added at M7 will be absent from the JSON report's `testResults` while the case counts stay unchanged. QA Phase 2 owns closing it.

## Next Steps

- Handoff to QA Phase 2 (qa-hooks-015) for M0 at website `037935d`, including the Assumption Not Checked above.
- CR-1 goes to the implementer (implementer-hooks-015).
