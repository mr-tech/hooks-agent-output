---
ID: 015
Origin: 015
UUID: 861e5f61
Verified-At: "037935d — repos=website; M0 only, run in a git-archive export of 037935d (blob identity verified), not the shared tree, which is at 61056e7"
Status: QA Complete
Status-Detail: "M0 (milestone-scoped) PASS at website 037935d. The bot collection and type-check change discriminates in both directions, and code review's Assumption Not Checked is closed. One new finding, QAF-11 MEDIUM, goes to the implementer: a wall-clock wait in SectionEditor.auto-remove-dispatch flaked 1 of 4 full runs, so a red E-7 gate is not attributable until it is fixed. It is not caused by M0 and does not move the M0 verdict. The chain's register is in qa/015-bug-evaluation-fixes-qa.md and was not appended to."
Phase: 2
---

# QA Report: Plan 015 — M0 (baseline and gate instrument)

**Plan Reference**: `agent-output/planning/015-bug-evaluation-fixes.md`, revision 8 (agent-output `1f7715b`); § M0 is unchanged since rev 4.
**Implementation**: `implementation/015-bug-evaluation-fixes-m0-implementation.md` (`6299c9b`), `Handoff-At: 037935d`.
**Code review**: `code-review/015-bug-evaluation-fixes-code-review.md` Round 1 (`0c3e7f9`), `Reviewed-At: 037935d`, APPROVED_WITH_COMMENTS.
**Phase 1 and the chain's register**: `qa/015-bug-evaluation-fixes-qa.md` (`c2a657a`).

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-08T06:08 | code-reviewer-hooks-015 → qa-hooks-015 (message) | QA Phase 2 for M0 at website `037935d` | Phase 2, milestone-scoped (M0). Stage start re-derived: the review's header reads `Reviewed-At: 037935d`, `Verdict: APPROVED_WITH_COMMENTS`, committed at `0c3e7f9`, with the plan row at `a8dd1fa`. Steering's brief had not arrived; I read the review's Assumption Not Checked, CR-1 and CR-2, and the plan's Decisions Register (D7). Verdict PASS. QAF-11 MEDIUM goes to the implementer. Status → QA Complete (M0 scope; plan Status left alone). |

## Scope and criteria assessed

The criteria were fixed before execution (plan § M0, rev 8):
- **C1.** A baseline is recorded at the chain base, with vitest counters and process exit.
- **C2.** After deleting `website/.next/dev/types` (D7), `pnpm run typecheck` exits 0 at the base before any source change, and the deletion is the only act on `.next`.
- **C3.** `website/node_modules` is not reinstalled or wiped.
- **C4.** The bot collection change (QA Phase 1, § Testing Infrastructure item 1): a test under `bot/**/__tests__` is collected and type-checked, and the post-change suite's `testResults` path membership equals the base's 54.
- **Entry conditions in scope at M0:** E-6, E-7, E-8.

There are no criteria with named examples beyond C4's planted case, and no oracles. The diff `7ce866b..037935d` touches two config files: `vitest.config.ts` +1 −1 and `tsconfig.test.json` +1 (`git diff --numstat`). It has no production code, so no mutation sweep is owed. The Irreversible Side-Effect Register guard M0 touches is I-11, the deletion, which is an act, not a code guard.

## TDD compliance gate

M0 adds no function or class, and the implementation document's table carries two rows for the config behaviour.
- **Row 1 (collection).** Red is shown as non-collection pre-change and an assertion failure post-change.
- **Row 2 (type-check).** The implementer disclosed that it has no pre-change red.
- **Closing row 2's gap.** The code-reviewer's probe (`verification/015/cr-m0-bot-typecheck-probe.sh`, run 1) supplies it: a planted `TS2322` under `bot/utils/__tests__` is unseen at `7ce866b` (test-program exit 0, 0 hits) and seen at `037935d` (exit 2, 1 hit). The `src/utils/__tests__` control is seen at both SHAs. I read the run file and did not re-run the probe: it is committed, and its result is two-directional with a control.

Gate: **passed**.

## Test Execution Results

All counts are re-derived by this pass. Captures:
- `verification/015/qa-m0-suite-runs-037935d.txt`
- `verification/015/qa-m0-bot-collection-probe.sh` with run `qa-m0-bot-collection-probe-run1.txt`
- `verification/015/base-7ce866b-testresults-paths.txt`

**Where the runs happened.** The shared website tree is at `61056e7` (M1 commits `44c1f44`, `61056e7` on top of `037935d`), so every run here used a `git archive 037935d` export. `website/node_modules` was symlinked read-only, so C3 holds for this pass. Blob identity was verified for `vitest.config.ts`, `tsconfig.test.json` and `tsconfig.json`.

| Check | Result | Exit |
|---|---|---|
| Base `7ce866b` full suite (Phase 1 run, 05:35Z) | 598 / 598 / 0 failed, 54 files | 0 |
| `037935d` full suite, 4 runs | runs 2–4: 598 / 598, 54 files. Run 1: 597 passed, 1 failed (`SectionEditor.auto-remove-dispatch`, see QAF-11) | 1, 0, 0, 0 |
| Path membership, `037935d` vs base | identical: 54 paths, `diff` empty, compared by path not size. Also equal to the implementer's `m0-testresults-paths-037935d.txt` (`96e123d`) | — |
| **C4 collection probe**, planted failing case | base, plant in `bot/`: **not collected** (54 files, 0 failed, exit 0). Base, plant in `src/` (control): collected, failed, exit 1. `037935d`, plant in `bot/`: **collected, failed**, 55 files, exit 1. `037935d`, plant in `src/`: collected, failed, exit 1 | as stated |
| `pnpm run typecheck` at `037935d` | exit 0, 0 `error TS`. The first run in the export was exit 2, one `TS2307` on a `.png` import: an export artefact, because `next-env.d.ts` is git-ignored and absent from the archive. After copying the shared tree's `next-env.d.ts` in, exit 0. CR-2: `ls -d .next/dev/types` was absent both in the export (no `.next`) and in `website/` at 06:05Z | 0 |
| E-8 lockfile | the M0 diff touches neither `pnpm-lock.yaml` nor `package-lock.json` (numstat above) | — |

**C2's history is not re-derivable.** The base typecheck's red (2 errors in `.next/dev/types/validator.ts`) and the deletion's file count (3348 → 3345) are the implementer's captures (`m0-captures-037935d.txt` §2–3) and the planner's earlier read. That state no longer exists. This pass confirms the current state only: the directory is absent, and typecheck is green at `037935d`.

**Code review's Assumption Not Checked** ("vitest's node project collects and executes a case under `bot/**/__tests__` at `037935d`") is **closed** by the collection probe. The probe discriminates in both directions and carries a positive control.

## Findings

QAF-11 MEDIUM Phase 2 RESOLVED — the wall-clock wait in `SectionEditor.auto-remove-dispatch.test.tsx` was replaced by an element wait at website `9e4955a`; `git grep -c setTimeout` over the file is 0 at `3031878` (M1 Phase 2, 2026-11-08T08:02), and the flake signature did not occur in the full-suite runs at `6001f7f`, `1e12837`, `3031878` or `da24eb7`. Argument retired from this revision; it is in `bf10a46`.

## Register

No row is appended. Rows inherited and not discharged: B-1, B-2, B-3, B-4, B-5, B-6, B-7, B-8. None is in M0's scope.

## Process notes

- **A possible overwrite in `verification/015/`.** `verification/015/base-7ce866b-testresults-paths.txt` was written by this pass from the Phase 1 base report, by a shell redirect to that path. The file was untracked and is named by no document (`grep -rn`). Its content equals the implementer's committed `m0-testresults-paths-037935d.txt`. Had another session left an uncommitted file at that path, this pass's redirect would have overwritten it. I found no evidence that one existed, and record the possibility rather than assume it away.
- The other untracked `verification/015/mutation-*`, `mutate-run.sh` and `mutators/` files belong to another session's work in progress (M1). They were not touched.

## Assumption Not Checked

This pass assumes the export (`git archive 037935d` plus a symlink to the shared tree's `node_modules` plus the shared tree's git-ignored `next-env.d.ts`) behaves as the shared tree at `037935d` would, and does not test that.
- **Why it matters.** The shared tree had moved to `61056e7`, and `node_modules` is shared state another session could alter mid-run.
- **Signature of its falsity:** the implementer's own shared-tree runs at a later milestone disagree with this pass's counts or membership on M0's surface (54 files, collection of `bot/**`).
- **Owner of closing:** QA Phase 2 at M1, which runs at a later tree and re-derives membership.

## Handoff

- **Implementer:** QAF-11, through steering.
- **Next QA pass:** M1, on the code-reviewer's handoff.
