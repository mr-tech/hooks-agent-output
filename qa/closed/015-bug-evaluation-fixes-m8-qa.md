---
ID: 015
Origin: 015
UUID: 861e5f61
Verified-At: "8de2b53 — repos=preview-image-generator; M8-a to M8-e (milestone-scoped); git-archive exports under unshare -rn on node v24.14.0; M8-b to M8-e re-anchored from 6c613a5 on the differential qa-rig-run-{6c613a5,8de2b53}.txt"
Status: Committed
Status-Detail: "Committed with chain 015 (website b96e364 and preview-image-generator 8de2b53); the verdict recorded in the body stands at its own Verified-At. Earlier detail is in the body and changelog."
Phase: 2
---

# QA Report: Plan 015 — M8 (preview-image-generator), M8-a to M8-e

**Plan Reference**: `agent-output/planning/015-bug-evaluation-fixes.md`, revision 27 (agent-output `18d361c`), § M8, read in full. The plan's later commits to `c3960b3` add batch rows, changelog rows and Status-Detail only (code review Round 18 sub-entry read the delta to `73435b3`; QA read `git log` to `c3960b3`, other stages' rows), so no M8 criterion moved.
**Implementation**: `implementation/015-bug-evaluation-fixes-m8-implementation.md`, `Handoff-At` `8de2b53` (agent-output `9f431e7`). The fix round `6c613a5..8de2b53` is two commits: `src/server.ts` 4/2 and `src/getPool.ts` 18/4.
**Code review**: `code-review/015-bug-evaluation-fixes-code-review.md`, the Round 18 sub-entry at `8de2b53`, M8 APPROVED_WITH_COMMENTS (committed `3540028`, re-derived from the committed section). This is the stage start.
**Phase 1 and the chain's register**: `qa/015-bug-evaluation-fixes-qa.md` § M8 (rev 27 reconcile) and the Irreversible Side-Effect Register (I-1). No row is appended.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-08T09:52 | code-reviewer-hooks-015 → qa-hooks-015 (`2fa6d8b`); steering-hooks-015 (brief at rev 27) | QA Phase 2 for M8-b to M8-e at `6c613a5` | Created. PASS, milestone-scoped; the plan Status is left alone. The verdict is expired at creation by `8de2b53`, so the refresh is owed with M8-a. |
| 2026-11-08T10:27 | code-reviewer-hooks-015 (Round 18 sub-entry, `3540028`); steering-hooks-015 (brief after the usage gate) | QA Phase 2 for the M8 round at `8de2b53`: M8-a, M8-d (d), the scoped refresh of M8-b to M8-e | Phase 2 at `8de2b53`: M8-a to M8-e PASS. M8-a's cells for P1 idempotency, P3 idle and P4 by signal are built here (`probe-m8a-qa.cjs`), because the rig's cells do not fail under their guards' mutants. QAF-36 LOW. Re-anchored from `6c613a5`. |
| 2026-11-08T10:59 | planner-hooks-015 (rev 28, `2a4533b`) | Finding resolution | QAF-36 RESOLVED by rev 28's stated-limit branch. The verdict is unmoved, and so is `Verified-At`. |
| 2026-11-08T21:31 | devops-hooks-015 | Document closed | Status: Committed (was QA Complete). Stage 1 closure: chain 015 committed on chain/015-bug-evaluation-fixes at website b96e364 and preview-image-generator 8de2b53, not pushed or merged. Moved to closed/. |

## Scope and criteria assessed

Fixed before execution (plan § M8, rev 27; Phase 1 § M8):
- **M8-a.** P1: both triggers (the `'shutdown'` message and SIGINT) reach `shutdown()`. `shutdown()` is idempotent. It logs one line beginning `Server received` that names the trigger. On success it logs a drain-complete line with the elapsed ms. The ready line is outside the predicate. P2: `kill_timeout` 12000 and an explicit `shutdown_with_message`. P3: exit as soon as the drain completes, and an idle process launches no browser at stop. P4: the handlers are registered no later than `ready`. CR-27: a failed drain logs `Drain failed after Nms: <message>` on stdout and no drain-complete line, and it still exits. The production limbs (P1 to P3 on stop (2)) are M8-0 run 2's, not this pass's.
- **M8-b.** Unchanged in this round (`processImage` is untouched by `6c613a5..8de2b53`). The criterion is as at `6c613a5`: an unparsable body, `null`, a number, a string or a boolean gets 500 with no S3 attempt, and the process serves on. X-23 (arrays) is asserted in neither direction.
- **M8-c.** Unchanged in this round (`generateImage.ts` untouched).
- **M8-d.** (a) to (c), with the handler registration now conditional (`getPool.ts`). (d) (D36): a line naming the missing member at startup, before any request. Member: the field renamed, and also (CR-33) `dequeue` renamed with the field kept. Non-member: 3.9.0 as resolved, no line.
- **M8-e.** Unchanged in this round (`config.ts` untouched).

## TDD compliance gate

Passed. The implementation's table has Yes/Yes/Yes rows for both new surfaces of the round:
- `shutdown`'s failure branch (CR-27): red at `6c613a5`, `run-cr27-cr28-red-6c613a5.txt`.
- `checkPoolShape`, `waitingQueueDequeue` and the conditional handler (D36): red at `6c613a5` and `7e5ca5f`, `run-d36-red-*.txt`.

Each failure reason is assertion-level against the pre-change tree. QA's own differential reproduces those reds (below).

## Test Execution Results

Every run is a `git archive` export with no `.env` (`env files in export: 0`). `npm ci --omit=optional` under `PUPPETEER_SKIP_DOWNLOAD=1` runs outside the namespace and exits 0, and `tsc -b` exits 0. The probe runs in `unshare -rn` with lo up: 0 non-loopback links, 0 default routes, loopback GET 200, external lookup `EAI_AGAIN`. The engine is node v24.14.0, and no browser cache is present (E-2).

- **The rig, both trees** (`m8-local-probe/probe.cjs` blob `25218c6`, `probe-pages.cjs` `9f41863`, runner `run.sh` `14faf82`):
  - `qa-rig-run-8de2b53.txt`: 32 cells, 32 pass.
  - `qa-rig-run-6c613a5.txt`: 32 cells, 27 pass and 5 fail.
  - The 5 that fail are the round's new cells: two `P1 failed drain` cells and three D36 cells. At `6c613a5` the drain-complete line is logged after a failed drain, the startup line count is 0 for both renamed libraries, and the failing-launch cell exits with status 1. These reproduce the implementer's recorded reds.
  - Cell-name diff of the two runs: exactly those 5 rows differ. The other 27 pass on both trees, which makes this the differential for M8-b to M8-e.
- **M8-b, QA's body-class probe** (`probe-body-class.cjs` `92d0273`, `obs-preload.cjs` `aa5f036`): `body-class-qa-run3-8de2b53.txt`, 7/7. The object control makes 3 S3 connects, which shows the observer is live. Each refused member makes 0 connects, gets 500 and serves on. The arrays make 3 connects each (INFO, X-23). This is identical to run 2 at `6c613a5`.
- **M8-a, QA's cells** (`m8-local-probe/probe-m8a-qa.cjs` blob `bd39b71`; run through `qa-m8r-sweep.py --probe probe-m8a-qa.cjs`; the control is `qa-m8r-8de2b53/qa-m8r-control-probe-m8a-qa.txt`, 5/5):
  - **P1 idempotent under a held drain.** An authorised `/generate` whose body never ends holds `server.close`. The probe sends `'shutdown'`, waits 500 ms, then sends SIGINT. Liveness: at the second trigger, 0 drain-complete lines and no exit. Result: one `Server received` line, then exit 0.
  - **P3 idle.** A preload wraps `puppeteer.launch` (the shape of code review's `drift-launch-count.cjs`). Positive control: a process that served one `/generate` shows 2 launches. An idle process sent `'shutdown'` shows 0 launches and exits 0.
  - **P4 by signal.** A SIGINT sent in the tick `ready` arrives gives `Server received SIGINT` and exit 0.
  - **Why these exist.** They supersede the rig's P1-idempotent and P3-idle cells, and add P4's signal leg. The rig's cells pass under the mutants of the guards they name (sweep below):
    - its idle drain ends in about 1 ms, so the second trigger never reaches a process that is still running;
    - it counts `Created instance` lines, which never appear without a browser;
    - its P4 cell uses the message path, which node 24's IPC channel holds until a listener is attached.
  - Under Phase 1 § M8 the probes are QA's Phase 2 instruments, so this is a repair of QA's instrument and not a finding against another stage.
- **M8-d (d), cell audit** against Phase 1 § M8-d (rev 27 reconcile), reading the rig at blob `25218c6`:
  - The member fixtures rename generic-pool's own source in a copy and map `generic-pool` to it with a resolver preload, so the guard's input is never stubbed. The rename count is asserted (`filesRenamed` 1 and 2).
  - The line is counted after `ready` plus 300 ms and before the first request is sent, so a lazy first-request check fails the cell. `qa-d36-check-moved-to-first-pool` (below) shows this.
  - The line matches `_waitingClientsQueue.dequeue`, which names the member.
  - The non-member cell runs on the tree as resolved. Seen red: the member cells at `6c613a5`, and the non-member cell under `impl-startup-check-inverted`.
  - The preload maps the library: the same tree gives line count 1 with the fixture and 0 without it.
- **Settled inline, not left as an assumption:** generic-pool 3.9.0 builds `_waitingClientsQueue` unconditionally in the `Pool` constructor (`lib/Pool.js`, `this._waitingClientsQueue = new PriorityQueue(this._config.priorityRange)`). So `checkPoolShape`'s throwaway pool (`autostart: false`, `min: 0`) has the served pool's shape, whatever the options.

**Mutation sweep.** *22 mutants in `mutators/qa-m8r-mutants.json` (blob `ea5d9b6`), each an exact-once replacement in the compiled `build/server.js` or `build/getPool.js` of the `8de2b53` export.*
- *Scope:* the production diff `6c613a5..8de2b53` (CR-27's failure branch; D36's check, its call site and helper; the conditional handler registration), plus M8-a's drain guards from `471578f..6c613a5`, which the `6c613a5` sweep deferred to this round.
- *Excluded:*
  - M8-b, M8-c and M8-e's guards: swept 9/9 at `6c613a5`, and their files or functions are untouched by the round. The differential above covers them.
  - Type-level mutants: the sweep runs on compiled JS.

The implementer's six `m8-guard-mutants.sh` mutants are restated as `impl-*` and re-run here. Driver: `m8-local-probe/qa-m8r-sweep.py`. Each mutant runs in its own copy of the export, with the probe files written from agent-output HEAD blobs, under `unshare -rn`, in its own session, killed at 300 s. A helper ran the `probe.cjs` set; QA re-read the summary and the survivors' files. Results: `m8-local-probe/qa-m8r-8de2b53/qa-m8r-summary.txt` (probe.cjs) and `qa-m8r-summary-probe-m8a-qa.txt` (probe-m8a-qa.cjs). Both controls show 0 red.

**19 killed, 3 survived, 0 stillborn.**

| Mutant | Instrument | Cells red |
|---|---|---|
| `impl-complete-after-catch` | rig | 1 (failed drain: no drain-complete line) |
| `impl-queue-optional-chain-removed` | rig | 1 (field-rename startup) |
| `impl-dequeue-optional-chain-removed` | rig | 2 (dequeue-rename startup; member absent, failing launch) |
| `impl-startup-check-removed` | rig | 2 (both rename startup cells) |
| `impl-handler-registered-unconditionally` | rig | 1 (member absent, failing launch) |
| `impl-startup-check-inverted` | rig | 3 (both rename cells; non-member) |
| `qa-d36-wrong-member-name` | rig | 3 (pool: launch error not TypeError; pool: no storm; non-member) |
| `qa-d36-call-site-removed` | rig | 2 (both rename startup cells) |
| `qa-d36-check-moved-to-first-pool` | rig | 2 (both rename startup cells: a lazy check writes no line before a request) |
| `qa-d36-handler-dequeues-without-reject` | rig | 2 (pool cells) |
| `qa-cr27-failed-line-to-stderr` | rig | 1 (one `Drain failed` line on stdout) |
| `qa-cr27-failed-line-no-cause` | rig | 1 (the same cell: the cause is named) |
| `qa-cr27-failure-skips-exit` | rig | 1 (failed drain exits before the fallback) |
| `qa-m8a-message-test-wrong` | rig | 9 (every message-triggered cell) |
| `qa-m8a-sigint-unregistered` | rig | 2 (SIGINT alone; idempotent) |
| `qa-m8a-success-exit-removed` | rig | 2 (P3 idle exit time; failed-drain exit) |
| `qa-m8a-once-guard-removed` | QA M8-a cells | 1 (held-drain idempotent). It survives the rig |
| `qa-m8a-pool-read-creates` | QA M8-a cells | 1 (P3 idle, launch-counted). It survives the rig |
| `qa-m8a-sigint-registered-late` | QA M8-a cells | 2 (P4 by signal; held-drain idempotent) |
| `qa-d36-line-to-stdout` | — | **survived** |
| `qa-m8a-handlers-registered-late` | — | **survived** (both instruments) |
| `qa-m8a-close-idle-dropped` | — | **survived** |

Every conjunct of `queue?.dequeue?.bind(queue)` carries the decision alone in one fixture: the field rename for the first `?.` and the dequeue rename for the second. The check's condition and the registration condition each have a mutant killed by a different cell.

**Survivors, dispositioned:**
- `qa-d36-line-to-stdout`: **outside the criterion.** D36 (d) asks for "a log line", and the rig counts both streams. The implementer puts it on stderr (PM2's error log, "as M8-e's refusal line does"), and code review's CR-34 asks the M9 carrier's read to name the error log. If that read names a stream, the stream becomes load-bearing and no cell holds it. That is QAF-36 LOW (below).
- `qa-m8a-handlers-registered-late` (the `'message'` listener registered 2 s late): **equivalent on node 24.** The run's P3-idle cell under this mutant exits 2008 ms after the message was sent, so the message waited in the IPC channel for the listener, then was handled. The registration time therefore cannot lose a message on this engine. The signal path, where it can, is held by `qa-m8a-sigint-registered-late` (killed). On production's Node 18 this is undecided: see the Assumption Not Checked.
- `qa-m8a-close-idle-dropped`: **equivalent on node 24.** With the explicit call removed, the failed-drain fixture still fails with `server.closeIdleConnections is not a function`, so `server.close()` calls it itself (Node 19 and later). On Node 18.17.1 `server.close()` does not, so this is not equivalent there. The prediction is that an idle keep-alive connection holds the close for up to the 5 s keep-alive timeout. That is still inside the 10 s fallback and the 12 s `kill_timeout`, but not "as soon as the drain completes". It is undecided on this box, which has no Node 18. M8-0 run 2's drain-complete elapsed figure on stop (2) decides it (Assumption Not Checked).

## Implementation Review (Post-Implementation)

The round matches the plan:
- CR-27 is a structural fix. The completion line sits on the success branch only (`git grep -n "Drain complete" 8de2b53 -- src`: 1 site, in the `try`, per code review's sweep).
- D36 is met as written. The check runs on a real library instance before `listen`, at two levels (CR-33). AF-31's log-and-serve choice is the implementer's, which D36 permits.
- No overreach.

The degraded mode with the member absent (pending acquire, launch retries at about 3,700 to 4,700/s in E-1) is RK-8's accepted residue. Code review measured it (CR-34, the planner's). It is not a QA criterion.

## Findings

QAF-36 LOW Phase 2 RESOLVED (2026-11-08T10:59: plan rev 28 `2a4533b` takes the stated-limit branch. M8-d (d) keeps "a log line", and every read of the line, in RK-8 and on M9's carrier line, covers both PM2 logs, the error log first. No cell is owed. The deploy-time read is register B-8's D36 limb, `qa/015-bug-evaluation-fixes-qa.md`) — D36's startup line has no cell that holds its stream. A mutant that moves it from stderr to stdout (`qa-d36-line-to-stdout`) passes every cell, because the rig counts both streams.
- **Why it matters:** the plan's criterion names no stream, so this is no defect in the code. But code review's CR-34 asks the M9 carrier's read (the RK-8 handoff) to name PM2's error log, and R-23's stream row concurs. Once that read names a stream, a line on the other one is invisible to it, with no cell to catch the move.
- **Required (planner, at the D37 fold with CR-34):** where the carrier's read names a stream, the criterion (d) names the same stream. QA then adds the stream to the startup cells (the probes are QA's instruments) and shows it red under `qa-d36-line-to-stdout`. If the plan keeps "a log line", the stream is a stated limit and nothing is owed.
- **What it fails to check:** that the operator-visible log the carrier reads is the one the line is written to.

## Assumption Not Checked

This pass assumes that the probe outcomes measured on node v24.14.0 hold on production's Node 18 (`prod.yml` `node-version: "18"`; the host's 18.17.1 is code review's record) and does not test it. Two survivors above are equivalent only because of node 24 behaviour: `server.close()` closing idle connections, and the IPC channel holding a message for a late listener.
- **Signature of its falsity:** at M8-0 run 2 on stop (2), the drain-complete line's elapsed figure is near 5000 ms instead of the drain's own time (an idle keep-alive connection held the close). Or a stop that reaches the new process just after start shows no `Server received` line.
- **Owner of closing:** devops, at M8-0 run 2 (M9; register B-8), whose drain-complete figure is the measurement. A Node 18 local run would settle it earlier, but there is no Node 18 binary on this box and installing one is not implied.

The `6c613a5` pass's assumption (the S3 client's first network act is a TCP connect) stands, unchanged: the body-class probe's liveness gate held at `8de2b53` (control: 3 connects).

## Blocking-condition register

No row is appended. Rows inherited and not discharged: B-8 (M8-0 run 2, devops). RK-8's post-closure read is the devops handoff minted at M9 (a forward expectation). The register cites it once it is minted.

## Handoff

- **Verdict:** PASS for M8-a to M8-e at `8de2b53`, milestone-scoped. The plan Status is left alone. The plan's changelog carries the row.
- **QAF-36 LOW:** to the planner (planner-hooks-015), with the D37 fold. It is non-blocking.
- **Assumption Not Checked:** to devops through M8-0 run 2 (B-8), named again at M9.
- **Not a QA item:** CR-34's magnitude (the planner's; the owner may rule).

## Earlier pass at `6c613a5` (2026-11-08T09:52), kept as the record of how M8-b to M8-e were first verified

That pass ran M8-b to M8-e with M8-a REJECTED (CR-27). Its sweep killed 9 of 9 mutants (`mutators/qa-m8-supplement.py` blob `961689a`) over `src/server.ts`, `src/generateImage.ts`, `src/getPool.ts` and `src/config.ts`, using the body-class probe for M8-b and the rig for the rest (`qa-m8-sweep-summary-6c613a5.txt`, `body-class-qa-mut-*-6c613a5.txt`). M8-d (a) and (c) were checked by re-running code review's attack row A (`qa-m8d-attack-run-6c613a5.txt`). The implementer later found that row A's second cell is timing-flaky at `6c613a5` and `7e5ca5f` (2 of 6 runs each, `attack-a-repeat.txt`). The flake is a false red (one line arrives a tick after the read), so it cannot have produced that pass's green. M8-d (c) was discriminated by the rig's `m8d-no-create-error-handler` kill, not by row A. Its verdict is superseded by this pass's re-anchor.
