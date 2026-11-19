---
ID: 017
Origin: 017
UUID: 5c3e9a71
Status: Active
Handoff-At: f83f2ca — repos=website; M7-b read at the website chain tip as of M5's hand-off; no source change
---

# Implementation 017 — M7: Lint baseline recorded; the chain adds no finding (item 5, D-9)

## Plan Reference

`agent-output/planning/017-existing-items-backlog.md`, revision 7, milestone M7 (M7-a to M7-c). M7 changes no source (D-9). It reads lint at the chain's website tip; the tip read here is `f83f2ca`
(M1 to M5 and M8 committed). M6 is in the generator, which has no lint criterion in M7.

## Date

2026-11-19.

## Changelog

| Date | Agent | Change |
|---|---|---|
| 2026-11-19T06:25 | implementer-hooks-017 | M7-b read at website `f83f2ca`: no rule count above the base in any of 59 changed lintable files. No source change. Handed to code review as a record-only milestone. |
| 2026-11-19T08:00 | implementer-hooks-017 (resumed) | Round 8 CR-19 (LOW, record line). The Deviations text now states the shared-tree read as a departure from M7-b's "in an export", with its reason. M7-b was re-read at the tip `4b8db9c` by code review's Round 8 (`verification/017/code-review/m7/`: 59 files, 0 rule counts above the base, a second instrument agreeing, 3 of 3 planted controls firing). I did not re-run it, so `Handoff-At` stays `f83f2ca` (my read) and the `4b8db9c` reading is the reviewer's, cited here; QA Phase 2 re-runs M7-b independently at the tip. |

## Implementation Summary

D-9 accepts today's lint result as the baseline and fixes none. M7-a's baseline is the planner's capture (`verification/017/entry/lint-1ad625e/`, 454 files); this milestone does not move it. M7-b is the
chain's own criterion: for every file the chain changed, each rule's count in the no-fix report is no higher than at `1ad625e`, and every new file has none. The two commands of the baseline
(`eslint . -f json` and `eslint . --fix-dry-run -f json`) were run at the tip and compared per file and per rule.

## Milestones Completed

M7-a (recorded by the planner, unchanged), M7-b (read, below), M7-c (recorded, X-12).

## Entry Conditions

| Condition | Where satisfied | Pinned by |
|---|---|---|
| Stage start | `steering/017-rulings.md` block 2026-11-19T05:19Z names M7 last (§ Plan) | not owed |
| Every other milestone's code committed | M1 to M4 through both gates; M5 and M8 committed (`f83f2ca`); M6 committed in the generator | not owed |
| M7-a, the baseline | `verification/017/entry/lint-1ad625e/{nofix,fixdry}.json`, `summary.txt`: 314 errors and 367 warnings in 112 files; after fixes 50 errors and 364 warnings in 71 files | not owed |
| M7-b | `impl/m7/m7b-compare.out` | the comparison below, with its control |
| M7-c, nothing enforces lint | recorded; Exclusions X-12 | not owed |

## User-visible flows (derived from the codebase)

M7 touches no user-visible surface and changes no source.

## Deviations

One departure from the plan's named instrument (CR-19, Round 8). M7-b names its instrument as "the same two commands at the tip, in an export". They ran in the shared tree instead, not in an export, and this is a deviation, not a method note: an export cannot lint, for the reason below. The baseline was taken "through the shared install" and so was this read, from the website tree at `f83f2ca` (the tree held no tracked change; `git status` showed only the held `.playwright-mcp`). An export of the tip does not lint:
ESLint refuses with "couldn't determine the plugin `react` uniquely" because two versions of `eslint-plugin-react` sit in the shared `node_modules/.pnpm`, and an export symlinks it; the shared tree resolves one.

## Files Modified

None in the website. Record files only: `implementation/017-existing-items-backlog-m7-implementation.md`, `verification/017/impl/m7/`.

## Files Created

| Path | Purpose |
|---|---|
| `verification/017/impl/m7/nofix-f83f2ca.json`, `fixdry-f83f2ca.json`, `*.exit`, `tree-head.txt` | the two reports at the tip and their exit codes (1 each: findings remain, as at the base) |
| `verification/017/impl/m7/chain-name-status.txt` | `git diff -M --name-status 1ad625e f83f2ca -- . ':!pnpm-lock.yaml'` (60 paths: 30 added, 26 modified, 1 renamed at 99%, 3 renamed at 100%) |
| `verification/017/impl/m7/compare.mjs`, `m7b-compare.out`, `rule-totals.out` | the per-file, per-rule comparison and the rule totals |

## Patterns Extended

None exists: the planner's capture is the pattern; the same commands and report form were used.

## TDD Compliance

Not owed: no source and no test is written.

## Class Sweep

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| M7-b, a changed lintable file whose count for a rule is above the base, or a new file with a finding | `node compare.mjs chain-name-status.txt <base nofix.json> <tip nofix.json> /usr/local/bin/hooks/website` | 59 changed lintable files compared; rule counts above the base: 0; new files with findings: 0; `NOT-LINTED`: 0 | none to disposition. Positive control: the same script with the two reports swapped (tip as the base) reports 25 files compared and 1 rule count above, so the comparison fires on a known difference |
| rule totals, base against tip | `rule-totals.out` | the no-fix report: 314 errors (as at the base) and 365 warnings (367 at the base); one rule differs: `@typescript-eslint/no-non-null-assertion` 53 to 51, in both reports; the fix-dry-run report: 50 errors and 362 warnings (50 and 364 at the base) | no rule rose |

## Test Execution Results

| Command | Result |
|---|---|
| `npx eslint . -f json -o impl/m7/nofix-f83f2ca.json` from the website tree | 484 files, 112 with messages, 314 errors, 365 warnings, exit 1 |
| `npx eslint . --fix-dry-run -f json -o impl/m7/fixdry-f83f2ca.json` | 484 files, 71 with messages, 50 errors, 362 warnings, exit 1; writes nothing |
| the comparison above | 0 above the base |

The 30 files beyond the base's 454 are the chain's added files; their findings are zero (above).

## Outstanding Items

- **M7-b is a read at a tip that can still move.** If code review or QA asks for a change after `f83f2ca`, or M1 to M5 and M8 gain a fix round, M7-b is re-run at the final tip (QA Phase 2 re-runs it independently). The commands and the script are in `impl/m7/`.
- The generator has no lint criterion in M7; its own lint on the two changed files was clean (M6's document).
- **Process fact:** the record-write gate refused a shell heredoc for this document; re-issued with the Write tool, satisfied and not worked around.
- **Self-diagnosis, for the retrospective:** none; the one surprise (an export cannot lint because of two `eslint-plugin-react` versions) is a fact about the install, recorded above.

## Resumption State

Written at the checkpoint (context 587K), after M5, M6, M7 and M8 were all handed off. This section supersedes the Resumption State in `implementation/017-existing-items-backlog-m4-implementation.md`.

- **Branches and heads.** Website `chain/017-existing-items-backlog` at `f83f2ca`; generator `chain/017-existing-items-backlog` at `8512a1d` (no upstream); agent-output `master` at `0d5e412` when written. Both product trees are clean apart from the held `.playwright-mcp/`. Nothing of mine is uncommitted or locally mutated; no process, container or `/dev/shm` socket directory of mine remains; the session scratchpad holds no export.
- **Where each milestone stands.**
  - M8 (`implementation/…-m8-…`): first delivery `c37d41a` (code review APPROVED_WITH_COMMENTS, QA Failed on QAF-22), fix round `6555f65` test-only; code review Round 5 sub-entry APPROVED (`74263c8`); QA's refresh is with `qa-hooks-017`. QAF-23 (FakeImage line) goes to the Planner batch; the M8 document already carries the line (left in place).
  - M5 (`…-m5-…`): website `f83f2ca` (`9909fb3` dependency, `72a1755` code, `f83f2ca` three cases), at code review (`code-reviewer-hooks-017` told), then QA Phase 2 (re-runs `verification/017/m5-pg/run.sh`). The local-walk rig for UAT is `verification/017/m5-rig/`.
  - M6 (`…-m6-…`): generator `8512a1d` (+ `verification/015/pig-host-read.sh` section [7]), at code review (told); then the security review the stage set names, then QA Phase 2.
  - M7 (`…-m7-…`): record only; M7-b read at website `f83f2ca` (59 files, 0 rule above the base). Re-run at the final tip if any later commit moves it (`impl/m7/compare.mjs`, commands in the document); lint runs from the website tree, not an export (two `eslint-plugin-react` versions).
- **Next, in order.** Answer code review and QA findings as they arrive, each fix round red-first with a Class Sweep and a captured mutation re-run; keep the fix on the same document's section. After M5 and M6 pass both gates and any fix changes the website tip, re-run M7-b. Then hand-back to steering: M1 to M8 through, the architect's closing pass and devops Stage 1 follow (not mine). Tell `steering-roadmap-hooks` (the name changed from `steering-roadmap`) when all milestones are through.
- **Facts that carry.** The M5 mutation driver `mutate-edits.py` has no control run; rebuild the export from the commit and compare blob ids before reading a rerun (a killed run leaves its mutant in the export). `mutation-run.py` has a control and `--dep node_modules`. The generator probe is `verification/017/m6-probe/run.sh <export> <out> [--quick]` and needs a generator export installed with `PUPPETEER_SKIP_DOWNLOAD=true npm ci` and the system Chrome. The real-Postgres lane's socket directory is under `/dev/shm` (108-byte path limit) and is emptied by the container before it stops. `eslint --fix` is run on named files only, never on a directory. A heredoc or `sed -i` on a record document is refused by the gate: use the Edit or Write tool. The secret-file hook refuses any call in the generator repo that could print `.github/workflows/prod.yml`: use `rev-parse`, `status`, `diff --numstat`, `grep -c` there.
- **Questions sent and open.** None to the owner. Sent: M8 fix round to `qa-hooks-017` and `code-reviewer-hooks-017` (answered by the reviewer; QA's refresh pending); M5 and M6 to `code-reviewer-hooks-017` (pending).
- **Cache-warm wake:** deleted at this checkpoint; arm again on the next briefed turn.

## Next Steps

Code review of this record-only milestone with the others; QA Phase 2 re-runs M7-b at the release tip. Then the plan's closing steps (the architect's closing pass, devops Stage 1).
