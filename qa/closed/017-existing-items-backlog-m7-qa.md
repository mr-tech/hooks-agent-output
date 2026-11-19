---
ID: 017
Origin: 017
UUID: 5c3e9a71
Verified-At: "4b8db9c — repos=website; M7 only. The tip lint ran in the shared tree while it was exactly 4b8db9c (HEAD read before and after, no tracked change), read-only, network-isolated. The base re-lint ran in a git archive export of 1ad625e with its own offline install."
Status: Committed
Status-Detail: "Committed at release identifier chain/017-existing-items-backlog (website 7293a35, generator 8512a1d) by devops Stage 1 at 2026-11-19T19:13Z; closed. Anchor fields above keep the values the document was written at. Post-deploy rows B-6 to B-11 ride handoff/017-existing-items-backlog-post-deploy-2026-11-19.md."
Phase: 2
---

# QA Report: Plan 017 — M7 (lint baseline recorded; release readiness)

**Plan Reference**: `agent-output/planning/017-existing-items-backlog.md`, revision 7. Since my M6 pass, the plan has
gained only rows R-42 and R-43. No criterion moved.
**Implementation Reference**: `implementation/017-existing-items-backlog-m7-implementation.md` (record-only;
`Handoff-At: f83f2ca`; CR-19's record line at agent-output `97e13e0`).
**Stage start**: code review Round 8, APPROVED_WITH_COMMENTS at `Reviewed-At: 4b8db9c` (agent-output `8bb33d3`, plan
R-42 `53fe7e0`). The Round 8 sub-entry is APPROVED (`6092c9e`, R-43 `3b088c0`), re-derived at the record.
`code-reviewer-hooks-017`'s messages were the hand-off.
**Blocking-condition register**: `qa/017-existing-items-backlog-qa.md`. This pass appends no row.
**Captures**: `verification/017/qa-m7/`.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-19T08:05 | code-reviewer-hooks-017 (cross-session messages; `8bb33d3`, `6092c9e`) | QA Phase 2 for M7 at website `4b8db9c` | Phase 2, M7 only. The tip lint is in the shared tree at exactly `4b8db9c`. `compare.mjs` and QA's own `m7b-check.py` agree: 59 files, 0 above the base, plants 3 of 3. The base re-lint of `1ad625e` reproduces the planner's capture exactly, which discharges code review's Round 8 assumption. **QA Complete**, milestone-scoped. No finding. |
| 2026-11-19T19:13 | devops-hooks-017 (Stage 1) | Document closed | Document closed. Status: Committed. Plan 017 is committed on chain/017-existing-items-backlog (website 7293a35, generator 8512a1d) at devops Stage 1; the release is Stage 2. |

## Criteria assessed

I recorded these before running anything:
- **M7-a.** The baseline exists and was re-summed by the critic. Its acceptance is the architect's closing pass, not
  this gate's. This pass adds a reproduction (below).
- **M7-b.** For every file the chain changed, each rule's count in the no-fix report is no higher than at `1ad625e`,
  and every new file has none.
- **M7-c.** Recorded under X-12, so there is nothing to execute.
- **Code review's Round 8 assumption.** The planner's base report matches what today's install gives for `1ad625e`.

**Example classes.** M7-b's class is "every changed lintable file", and both instruments enumerate it from
`git diff --name-status -M 1ad625e 4b8db9c` (`chain-name-status-4b8db9c.txt`): 59 files, of which 25 are modified, 30
added and 4 renamed. Path membership was checked rather than assumed (`m7b-membership.out`):
- all 59 tip paths are in the tip report;
- every modified or renamed file's base path is in the base report.

So no file reads zero for lack of being linted. Code review's Round 8 text speaks of "30 modified or renamed files". By
this enumeration there are 29 (25 M and 4 R). The slip moves nothing, because the base re-lint below covers all 454 base
files.

## Implementation Review (Post-Implementation)

- **TDD gate: not applicable.** M7 changes no source and adds no function or class. Its implementation document carries
  the M7-b read, not a table.
- **Method premise corrected.** The implementation document and code review both record that "an export of the tip does
  not lint" (two `eslint-plugin-react` versions under a symlinked `node_modules`). That holds for an export that links the
  shared install. An export with **its own** install lints: `pnpm install --frozen-lockfile --offline --ignore-scripts`
  completed in 2.7 s from the store (`base-export-install.out`), and the lint below ran. QAF-15's instrument note
  (`verification/017/README.md`) already says so. This is lodged in `INBOX.md` for both records' owners. It moves no
  verdict.

## Test Execution Results

| Command | Result |
|---|---|
| `npx eslint . -f json -o qa-m7/nofix-4b8db9c.json` under `unshare -rn`, shared tree, read-only. HEAD `4b8db9c` before and after (`tree-head-{before,after}.txt`); 0 tracked changes. | exit 1 (findings remain, as at the base). 484 files, 112 with messages, 314 errors, 365 warnings (`tip-vs-f83f2ca.out`). |
| `npx eslint . --fix-dry-run -f json` (`fixdry-4b8db9c.{json,exit}`) | exit 1. Captured for the record; M7-b reads the no-fix report. |
| The tip report against the implementer's `impl/m7/nofix-f83f2ca.json`, per file and per (rule, severity) | 484 and 484 files, the same membership, 0 files differing |
| `impl/m7/compare.mjs` (blob `437b1aa`) over the name-status, the base `entry/lint-1ad625e/nofix.json` (blob `a3ce67f`) and the tip report (`m7b-compare-4b8db9c.out`) | 59 changed lintable files compared; 0 rule counts above the base |
| QA's second instrument, `qa-m7/m7b-check.py` (blob `2608d4e`). Written independently: Python, renames mapped by status letter, an extension predicate, fatal messages counted as their own rule. (`m7b-check.out`) | 59 (M 25, A 30, R 4); 0 violations |
| The same with `--plant`: +1 on a modified file, a finding on an added file, +1 on a renamed file's new path (`m7b-check-plant.out`) | 3 violations, "plants found 3 of 3" |
| The base re-lint: `npx eslint . -f json` in a `git archive 1ad625e` export with its own offline install, `next-env.d.ts` and `.next/types` copied from the shared tree, under `unshare -rn` (`nofix-1ad625e-export.{json,out,exit}`) | exit 1, no error text |
| The re-lint against the planner's capture, per file and per rule (`base-reproduction.out`) | 454 and 454 files, the same membership, **0 files differing**, 681 and 681 messages. Of the 29 modified or renamed base paths, 0 differ. |

**The base reproduction** discharges code review's Round 8 assumption by its own falsifier: no per-file or per-rule
difference on any file, the 29 included. The install's other inputs were also read:
- the lint configuration and `tsconfig.json` are unchanged over `1ad625e..4b8db9c` (`git diff --numstat` prints nothing);
- the lockfile only gains lines (+80 −0);
- the shared install was redone at 05:38Z (`.modules.yaml`).

The re-lint shows that redo did not move a count.

## Findings

None.

## Verdict

**QA Complete** for M7 at website `4b8db9c`, milestone-scoped.
- M7-b holds: 59 changed lintable files, no rule above `1ad625e`, no added file with a finding.
- Two differently shaped instruments agree, and each fires on planted members.
- The base it compares against reproduces exactly under today's install.

M7-b is a read at a tip. Any later website commit expires it, and the Phase 3 release-tip pass re-reads it at the merged
tip. The plan's Status is unmoved. The effort-final sweep is owed.

## Assumption Not Checked

This pass assumes that the `.next/types` copied from the shared tree, generated for the current routes, gives the
`1ad625e` export the same type information the planner's capture had, and does not test it.
- **Signature if false.** Typed-rule counts (`no-unsafe-*`) on `src/app/**` files differ between the re-lint and the
  capture.
- **What it does not hide.** The comparison found 0 differing files. A difference from this source would have shown as
  a failed reproduction, so the assumption can only have produced a false mismatch, never hidden a real one.
- **Owner.** None further: this gate closes it by the result. Recorded because the export was not byte-identical to the
  planner's environment.

## Handoff

- **To steering**: nothing owner-needing.
- **Next for QA**: the effort-final mutation sweep over the chain's production diff (website `1ad625e..4b8db9c`, generator
  `8de2b53..8512a1d`), then the plan-level `QA Complete`, then UAT.
