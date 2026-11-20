---
ID: 018
Origin: 018
UUID: 6273a762
Verified-At: "b0b01587b9ee6afca8147d974f8ea2e336572720 — repos=website; M2 only; isolated export with its own install, tsconfig.json blob c21db55 verified equal"
Status: Released
Status-Detail: "Released: website master moved 7923a1d to d1bb9b0 at 2026-11-20T08:07:52Z on the owner's release approval (deployment/closed/018-next-upgrade-save-size-cap-deployment.md). M2 PASS at website b0b0158 (suite 2259/2259 exit 0), re-anchored at a558f2d and carried to d1bb9b0 by the effort-final verdict. M2-e is B-9 (executed) and B-10 (post-deploy handoff)."
Phase: 2
---

# QA Report: Plan 018 — M2, Next.js 16.4.6 (H-002)

**Plan Reference**: `agent-output/planning/018-next-upgrade-save-size-cap.md`, revision 7 (`af8a9d6`), § M2. Phase 1 and the
chain's blocking-condition register are in `qa/018-next-upgrade-save-size-cap-qa.md`. This document appends no register row; M2-e
is B-9 and B-10 there.
**Stage start:** the code review's committed verdict, `code-review/018-next-upgrade-save-size-cap-code-review.md` Round 2,
APPROVED_WITH_COMMENTS, `Reviewed-At` `b0b0158` (agent-output `34ed471`), re-read at the record. `b0b0158`'s only parent is
`f9e66c2` (the M1 tip, which code review REJECTED at Round 1, CR-1). This verdict covers M2's diff at `b0b0158` and nothing of M1.
**Reconcile 2026-11-20T05:58:** this verdict expired when M1's fix round (`c357095..a558f2d`) changed `shapes.ts` over `b0b0158`. The same surface was re-run at `a558f2d` and re-anchored there as PASS (`qa/018-next-upgrade-save-size-cap-m1-qa.md`, § The M2 refresh).
**Steering:** M2 is capped (`steering/018-rulings.md` block 2026-11-20T05:26Z, `44efb1f`). A gap below HIGH goes to the Planner
batch as a stated limit, except a severity-floor finding.
**Architecture / roadmap:** as in the Phase 1 document (`architecture/website.md` A-4 for the `ts-node` check; no roadmap).

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-20T05:44 | code-reviewer-hooks-018 (Round 2, `34ed471`) | QA Phase 2 on M2 at `b0b0158` | Phase 2 on M2. The criteria were committed before execution (`5fcdf7d`). M2-a to M2-d were re-derived on QA's own exports. Lockfile movers by a third instrument: 46 package names, 12 snapshot-key texts, the same membership as code review's, every one dispositioned. Suite 2259/2259, exit 0, at `b0b0158` and `f9e66c2`, with identical per-file counts. Build exit 0, `tsconfig.json` unchanged, typecheck 0, `ts-node` 0/0. Bundle markers present, 0 `(void 0)` receivers. A `ts-node` key mutant goes red (TS5095). This closes code review Round 2's Assumption Not Checked. **PASS (M2 only).** No finding. |
| 2026-11-20T07:12 | devops-hooks-018 (Stage 1, brief steering/018-brief-devops.md) | Close at Committed | Status: Committed. Closed to closed/ at Stage 1 of release website master d1bb9b0 (deployment/018-next-upgrade-save-size-cap-deployment.md); the document's anchor is unchanged. |
| 2026-11-20T13:40 | devops-hooks-018 (Phase 2D, brief steering/018-brief-devops.md) | Release | Status: Released. Website master moved 7923a1d to d1bb9b0 at 2026-11-20T08:07:52Z (deployment/closed/018-next-upgrade-save-size-cap-deployment.md); the document's anchor is unchanged. |

## Criteria this pass assesses (recorded before execution)

- **M2-a:** the `^  next@` lines of the lockfile at `b0b0158` all name 16.4.6, and the importer's `next:` resolves 16.4.6.
  Security's `pnpm audit` limb is security's and is not assessed here.
- **M2-b:** the lockfile's moved versions, re-derived by a third instrument (Python over the `packages:` and `snapshots:` keys),
  against the implementer's disposition table and code review's 46 + 12. `package.json` touches three specifiers. `tsconfig.json`
  touches the two keys, with the end-of-file newline kept.
- **M2-c:** in an isolated export of `b0b0158` with its own install, no `.env` and `SKIP_ENV_VALIDATION=1`:
  - `next build` exits 0, leaves `tsconfig.json` byte-identical (`cmp`), and prints 0 "mandatory" lines;
  - typecheck exits 0;
  - the `ts-node` check of `limits.tsx`, `-T` and typed, exits 0, with the exit codes recorded;
  - the bundle limb: markers in `.next/static` and `.next/server`, and 0 `(void 0)` receivers;
  - **the suite** (code review's Assumption Not Checked): run at `b0b0158` and at `f9e66c2` under `unshare -rn`, and compared by
    `testResults` path membership and per-file (cases, passed) counts, with exit codes beside them.
  Each limb's red side is cited or re-run on a mutant of the tip's `tsconfig.json`.
- **M2-d:** the build warnings, captured.
- **M2-e:** not assessed here. It is B-9 (UAT) and B-10 (post-deploy).
- **TDD gate:** the implementation document's exemption ("not feature code": no new function or class) is established by executing
  both trees (the suite comparison above).
- **Mutation sweep:** none owed at this milestone. The M2 diff holds no JS/TS production source and changes no Irreversible
  Side-Effect Register guard. The effort-final sweep stays owed.
- **Time-based tests:** M2 deems no gated time-based cell relevant, so none runs.

## Test Execution Results

Driver: `verification/018/qa/m2-phase2/run.sh`. It ran under `systemd-run --user --scope` over two `git archive` exports in the
session scratchpad: `f9e66c2` (the parent) and `b0b0158`. Each export had its own `pnpm install --frozen-lockfile` (exit 0), no
`.env` and `SKIP_ENV_VALIDATION=1`. The suites ran under `unshare -rn`. The build had network, because `next/font` fetches at build
time. Every step had a `timeout -k`. Nothing ran in the shared tree. The exports were deleted after the copy. The exit codes are in
`exits.txt`, and every output is beside it.

| Criterion | Instrument | Result | Red side (seen) |
|---|---|---|---|
| M2-a | `grep -c -E "^  next@"` over `git show <sha>:pnpm-lock.yaml`; importer read | 2 → 2. At `b0b0158`: `next@16.4.6` and `next@16.4.6(@babel/core@7.29.7)(…)`. Importer `next:` `^16.4.6` → `16.4.6(…)` | The predicate reads 16.1.6 at `f9e66c2` (2 lines, Phase 1 control) |
| M2-b lockfile | `lock-movers.py`, a third shape: Python over the `packages:`/`snapshots:` two-space keys, a version-set difference per name. Code review used `awk`/`comm` | `packages:` 1524 → 1527 keys, **46 mover names**, identical membership to code review's `mover-names.txt` (`diff` empty). `snapshots:` **12** keys changed text with the same name@version: the 6 `next` peers the plan names, plus `vitest`, `vite`, `rolldown`, `@rolldown/binding-wasm32-wasi`, `@napi-rs/wasm-runtime` and `@vitest/mocker`. Same membership as code review's. No version moves among them. | — |
| M2-b dispositions | every name in `packages-mover-names.txt` searched in the implementation document (`disposition-check.txt`) | 15 named; 31 under the `@next/swc-*` row (each suffix named) and the `@img/*` row (27, as reconciled for CR-4); **0 missing** | — |
| M2-b `package.json` / `tsconfig.json` | read at the commit (code review's diff) | three specifiers; two keys, end-of-file newline kept. The blob `c21db55` is identical in the export (`blob-identity.txt`) | — |
| M2-c build | `next build` | exit 0. `grep -ci mandatory` = 0. `cmp` with the pre-build file and with `git show b0b0158:tsconfig.json`: both identical | The `mandatory` line is present (1) in the planner's `m2-tsconfig/A/build.txt`, where `moduleResolution` was `node` |
| M2-c typecheck | `pnpm run typecheck` (both programs, after the build) | exit 0 | — |
| M2-c `ts-node` | `npx ts-node -r tsconfig-paths/register [-T] -e "require('~/utils/limits')"` | `-T` exit 0, typed exit 0 | **Mutant at the tip** (`ts-node.compilerOptions.moduleResolution` deleted): `-T` exit 1, TS5095 (`mutant-no-tsnode-key-tsnode-T.txt`). The file was restored after |
| M2-c bundle | `grep -rlF` into files over `.next/static` and `.next/server`; `(void 0)` receiver regex over `.next` | `Falling back…`, `highlightAuto` and `registerLanguage`: each in **1** static and **2** server files. `(void 0)` receivers: **0** | Planted `.next/qa-plant/p.js` on the same run: 1. The `paths` form gave 10 (`m2-hljs-resolution/`) |
| M2-c suite | `npx vitest run --reporter=json`, both trees; `suite-compare.txt` | both trees: 2259 cases, 2259 passed, 0 failed, 154 `testResults` files, `success` true, **process exit 0**. Path membership is identical; per-file (cases, passed) differences: none | — (parity check; the parent is the comparand) |
| M2-d | build output | `middleware` deprecation; "The Edge Runtime is deprecated". Both were already routed (X-8; plan R-8 M2-I3) | — |

**Against the plan's base form:** M2-c also names the base `7923a1d` (1913 cases in 149 files). The tip's 154 files are the base's
149 plus M1's test files, and M1's verdict is its own. The parent comparison holds every M1 change fixed and isolates M2's move.

**TDD gate:** the implementation document states the exemption "not feature code": no new function or class, and the diff touches
`package.json`, `pnpm-lock.yaml` and `tsconfig.json` only. The exemption is established by execution over the affected surface,
the whole suite on both trees, which is identical. Accepted.

**Mutation sweep:** none owed at M2. The diff holds no JS/TS production source, and no Irreversible Side-Effect Register guard
(E-1 to E-7) is changed by it. The effort-final sweep stays owed, over the chain's production diff.

**Verdict: PASS (M2 only, at `b0b0158`).** No QAF finding. Code review Round 2's Assumption Not Checked (suite parity) is closed
above. This verdict does not cover M1 (code review approved its fix at `a558f2d`; QA Phase 2 on M1 follows), and it expires
when production code changes after `b0b0158`, per Verdict Freshness.

**Rows inherited and not discharged:** B-1 to B-10, all. M2-e's B-9 and B-10 are UAT's.

## Assumption Not Checked

This pass assumes, and does not test, that Vercel's build of the release tip produces the same bundle as this local export. Vercel
builds with its own Node, its own pnpm resolution of `packageManager`, and its own environment, so the `highlight.js` binding and
the `tsconfig.json` no-rewrite were seen only locally. The signature of its falsity: the preview deployment's build log shows a
"mandatory changes" line, or B-4's or B-10's `/preview` look shows no `hljs` classes or the "Invalid message data." boundary. Owner:
UAT at B-4 (the preview) and B-10, with devops reading the preview build log at B-5.
