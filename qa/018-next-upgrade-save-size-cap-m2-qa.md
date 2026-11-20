---
ID: 018
Origin: 018
UUID: 6273a762
Verified-At: "b0b01587b9ee6afca8147d974f8ea2e336572720 — repos=website; M2 only; pending — no verdict yet"
Status: Testing In Progress
Status-Detail: "Phase 2 on M2 at website b0b0158 (code review Round 2 APPROVED_WITH_COMMENTS, agent-output 34ed471). Criteria recorded before execution."
Phase: 2
---

# QA Report: Plan 018 — M2, Next.js 16.4.6 (H-002)

**Plan Reference**: `agent-output/planning/018-next-upgrade-save-size-cap.md`, revision 7 (`af8a9d6`), § M2. Phase 1 and the
chain's blocking-condition register are in `qa/018-next-upgrade-save-size-cap-qa.md`. This document appends no register row; M2-e
is B-9 and B-10 there.
**Stage start:** the code review's committed verdict, `code-review/018-next-upgrade-save-size-cap-code-review.md` Round 2,
APPROVED_WITH_COMMENTS, `Reviewed-At` `b0b0158` (agent-output `34ed471`), re-read at the record. `b0b0158`'s only parent is
`f9e66c2` (the M1 tip, which code review REJECTED at Round 1, CR-1). This verdict covers M2's diff at `b0b0158` and nothing of M1.
**Steering:** M2 is capped (`steering/018-rulings.md` block 2026-11-20T05:26Z, `44efb1f`). A gap below HIGH goes to the Planner
batch as a stated limit, except a severity-floor finding.
**Architecture / roadmap:** as in the Phase 1 document (`architecture/website.md` A-4 for the `ts-node` check; no roadmap).

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|

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
