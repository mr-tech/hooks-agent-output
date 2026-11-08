---
ID: 015
Origin: 015
UUID: 861e5f61
Verified-At: "6c613a5 — repos=preview-image-generator; M8-b to M8-e only (M8-a REJECTED by code review CR-27); git-archive exports under unshare -rn. Expired by 8de2b53 (the M8 fix round, server.ts and getPool.ts), pending the scoped refresh with M8-a"
Status: QA Complete
Status-Detail: "M8-b to M8-e (milestone-scoped) PASS at preview-image-generator 6c613a5 against plan rev 27 (18d361c), on a 9 of 9 mutation sweep. The verdict is already expired by the fix round at 8de2b53. Its refresh, scoped to 6c613a5..8de2b53, runs with M8-a and M8-d (d) after code review reviews 8de2b53."
Phase: 2
---

# QA Report: Plan 015 — M8 (preview-image-generator), M8-b to M8-e

**Plan Reference**: `agent-output/planning/015-bug-evaluation-fixes.md`, revision 27 (agent-output `18d361c`), § M8, read in full. Rev 27 narrows M8-b (D35, X-23) and adds M8-d (d) (D36) and X-24.
**Implementation**: `implementation/015-bug-evaluation-fixes-m8-implementation.md`. Delivery 1 is at `6c613a5`, which is this pass's tree. The fix round at `8de2b53` (`9f431e7`) is not covered by this pass.
**Code review**: `code-review/015-bug-evaluation-fixes-code-review.md` Rounds 16 to 18 (`2fa6d8b`), `Reviewed-At` `6c613a5` for the generator. M8-b to M8-e are met. M8-a is REJECTED (CR-27). Re-derived from the committed section; this is the stage start.
**Phase 1 and the chain's register**: `qa/015-bug-evaluation-fixes-qa.md` § M8 and the Irreversible Side-Effect Register (I-1), keyed to rev 27 at `b21c7b5`. No row is appended.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-08T09:52 | code-reviewer-hooks-015 → qa-hooks-015 (`2fa6d8b`); steering-hooks-015 (brief at rev 27) | QA Phase 2 for M8-b to M8-e at `6c613a5` | Created. PASS, milestone-scoped; the plan Status is left alone. The verdict is expired at creation by `8de2b53`, so the refresh is owed with M8-a. |

## Scope and criteria assessed

Fixed before execution (plan § M8, rev 27; Phase 1 § M8):
- **M8-b.** A body that is not parsable JSON, or that parses to `null`, a number, a string or a boolean, gets 500. The process keeps serving, and no S3 call is attempted (I-1). An array is X-23, a stated limit, asserted in neither direction.
- **M8-c.** A page is closed whether the screenshot succeeds or throws, and no rejection is unhandled.
- **M8-d (a) to (c).** Every waiting request gets 500, with no hang and no `TypeError`. The process keeps serving. No launch is attempted while no request waits. (d) is D36's startup line, which rides the fix round and is not in this tree. The per-request launch count is X-24.
- **M8-e.** An unset or empty `API_KEY` refuses start with a line naming it, and a set key starts.

## TDD compliance gate

Passed. `m8-implementation.md` has Yes/Yes/Yes rows for the request handler's parse (M8-b), `generateMessagePreviewImage`/`generateImage` (M8-c), `factory.create`/`pool.use` (M8-d) and the `config.ts` refusal (M8-e). Each failure reason is a base run of the rig.

## Test Execution Results

The generator has no test runner, so the probes are the evidence. Every run is a `git archive` of `6c613a5` with no `.env`, and `npm ci` runs outside the namespace. Each probe runs under `unshare -rn`, with lo up and the isolation counts checked.

- **The rig** (`m8-local-probe/probe.cjs`, blob `a6da6bc`; `probe-pages.cjs` `9f41863`, with a real Chromium for M8-c), driven by `qa-m8-sweep.sh`: the control run is 25/25 (`qa-m8-sweep-summary-6c613a5.txt`).
- **M8-b, QA's body-class probe** (`m8-local-probe/probe-body-class.cjs` blob `92d0273`, observer `obs-preload.cjs` `aa5f036`, runner `run-body-class-qa.sh`):
  - **Why it replaces the rig's M8-b cells:** the rig asserts status only. In the isolated rig an unrefused body also gets 500, so the number cell could not discriminate the object test (Phase 1 § M8-b, instrument note).
  - **Run 2:** 7/7. The object control makes 3 S3 connects, which shows the observer is live. Each refused member (unparsable, `null`, `5`, `"x"`, `true`, `false`) makes 0 S3 connects, gets 500, and leaves the process serving.
  - **Run 1:** the liveness gate fired on a wrong auth form, so no cell was read.
  - **Arrays:** `[]` and `[{}]` each made 3 S3 connects, printed as INFO only. This is X-23's consequence, now executed rather than read from the code.
- **M8-d (a) and (c), code review's attack row A**, re-run by QA (`qa-m8d-attack-run-6c613a5.txt`): six concurrent failing requests all get 500 in 39 ms. The 12 launch-error lines after the burst are still 12 after 3 s idle, so no launch is attempted while nothing waits. The same file's row C fails: a failed drain still logs the drain-complete line. That is CR-27 and belongs to M8-a, not this scope.

**Mutation sweep.** Production code the milestone changed over `471578f..6c613a5`, at I-1's guards: `src/server.ts`, `src/generateImage.ts`, `src/getPool.ts` and `src/config.ts`. The sweep ran the 9 mutants in `mutators/qa-m8-supplement.py` (blob `961689a`). It excludes M8-a's drain path (CR-27; it is swept with that round's diff), D36's guard (not in this tree) and an `Array.isArray` refusal (out of scope by ruling, X-23). **9 of 9 were killed and none survived.**

| Mutant | Killed by | Cells red |
|---|---|---|
| `m8b-object-test-dropped` | body-class probe | 5 (`null` exits; the number, string, `true` and `false` bodies each reach S3) |
| `m8b-null-conjunct-dropped` | body-class probe | 1 (`null`) |
| `m8b-catch-rethrows` | body-class probe | 6 (every refused member exits the process) |
| `m8c-finally-no-close` | rig | 2 (page closed after a throw; page closed after success) |
| `m8c-sequential-delete` | rig | 2 (server-level 500s; no unhandled rejection) |
| `m8d-factory-returns-null` | rig | 4 |
| `m8d-no-create-error-handler` | rig | 2 (the launch error, not a `TypeError`; no retry storm) |
| `m8e-gate-dropped` | rig | 2 (unset; empty) |
| `m8e-empty-allowed` | rig | 1 (empty only) |

The rig mutants were run by a helper. QA re-read the summary file and confirmed the control's 25 PASS cells. Each conjunct carries the decision alone in at least one fixture: `m8e-empty-allowed` reddens the empty cell only, and `m8b-null-conjunct-dropped` reddens `null` only.

## Implementation Review (Post-Implementation)

M8-d's mechanism is the implementer's: the `factoryCreateError` handler plus a read of the private waiting queue. The plan states the property (rev 26) and the dependency risk (RK-8, D36). The plan's earlier "rejects in the pool factory" sketch was insufficient, as measured by the implementer, and code review accepts the mechanism (CR-28). There is no overreach in this tree.

## Findings

None in this scope. The gap in QA's own rig (status-only M8-b cells) is fixed in this pass, so it is not a finding against another stage.

## Assumption Not Checked

This pass assumes that the S3 client's first network act for a request is a TCP connect to `CDN_ENDPOINT`, which is what the observer counts. A client that failed before connecting, for example on signing or configuration, would show 0 connects for an unrefused body too. The positive control rules that out for this tree, since the object body makes 3 connects. It does not rule it out for another SDK version.
- **Signature of its falsity:** after an `@aws-sdk` bump, the body-class probe's object control shows 0 connects, and the liveness gate stops the run.
- **Owner of closing:** QA, at the next run of the probe. The gate is built in, so this is self-routing.

## Blocking-condition register

No row is appended. RK-8's post-closure read is the devops handoff minted at M9 (a forward expectation), which the register will cite once it is minted. This chain does not move generic-pool (Phase 1 § M8-d, rev 27 reconcile).

## Handoff

- **Verdict:** PASS for M8-b to M8-e at `6c613a5`, expired by `8de2b53`.
- **Next:** after code review reviews `8de2b53`: M8-a, M8-d (d), and the scoped refresh of M8-b to M8-e. The sweep for that round covers the diff `6c613a5..8de2b53` only, and the M8-b to M8-e verdict is re-anchored on a differential.
