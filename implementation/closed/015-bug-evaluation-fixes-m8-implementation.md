---
ID: 015
Origin: 015
UUID: 861e5f61
Status: Committed
Status-Detail: "Committed with chain 015 (website b96e364 and preview-image-generator 8de2b53). Earlier detail is in the body and changelog."
Handoff-At: "8de2b53 — repos=preview-image-generator"
---

# Implementation 015 — M8 (preview-image-generator)

## Plan Reference

`agent-output/planning/015-bug-evaluation-fixes.md` § M8 at rev 25 (`dd9e88a`), with D16 (straight to prod), D17/D18/D19 (host reads, the verifying stop) and D23 (UTC assumption) read. QA Phase 1: `qa/015-bug-evaluation-fixes-qa.md` § M8 (probes P1 to P3, entry conditions E-1 to E-4). Analysis: `analysis/015-bug-evaluation-fixes-analysis.md` (F-31's premise). Rev 25 changed M6-a only; M8 is as at rev 24.

## Date

2026-11-08

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-08T09:05 | steering-hooks-015 → implementer-hooks-015 (message "Resume chain 015 … then M8") | Implement M8 | M8-a to M8-e in `4b68b57`; the pool fix in `6c613a5`. Probe rig `verification/015/m8-local-probe/`. |
| 2026-11-08T09:47 | steering-hooks-015 → implementer-hooks-015 (Round 18 return; owner ruling RK-8, rulings `f5ab120`; CR-33, AF-31; QA's message on the startup property) | Fix CR-27; CR-28; D36 startup check | `7e5ca5f`: `shutdown()` logs the drain-complete line only on success and `Drain failed after Nms: <message>` on stdout otherwise; a first guard at pool creation. `8de2b53`: the guard replaced by the D36 startup check (`checkPoolShape`, below), because rev 27 (d) asks for the line at startup and the pool is created on the first request. Rig now 32 cells, fixtures are a source rename of generic-pool in a copy; `m8-guard-mutants.sh`. QAF-33 dropped by the owner (rulings `c8c7649`): no array refusal. |
| 2026-11-08T11:23 | qa-hooks-015 → implementer-hooks-015 (QAF-37 MEDIUM, effort-final Phase 2) | A rig cell for a drain that never settles | Rig-only, no generator source change: generator stays at `8de2b53`. Cell added to `m8-local-probe/probe.cjs` (agent-output `8fb1eee`). See § QAF-37. |
| 2026-11-08T21:31 | devops-hooks-015 | Document closed | Status: Committed (was Active). Stage 1 closure: chain 015 committed on chain/015-bug-evaluation-fixes at website b96e364 and preview-image-generator 8de2b53, not pushed or merged. Moved to closed/. |

## Implementation Summary

Every change is in `preview-image-generator` (chain branch `chain/015-bug-evaluation-fixes`, `471578f..6c613a5`, six files). Nothing was pushed and nothing touched production.

- **M8-a (F-31), P1 to P4; CR-27 fix at `7e5ca5f`.**
  - `server.ts` has one `shutdown(trigger)` behind a once-only guard. It logs `Server received <trigger>.` (`shutdown message` or `SIGINT`), closes the server and idle connections, drains and clears the pool only if one exists, logs `Drain complete in <n>ms.` only when the drain succeeded (on failure it logs `Drain failed after <n>ms: <message>` on stdout, the error to stderr as before), and exits 0 as soon as that is done in either case. The 10 s fallback timer stays as an upper bound.
  - Both triggers are registered before `server.listen`, so before the `ready` message: `process.on('message')` for the PM2 `'shutdown'` message and `process.on('SIGINT')`.
  - `getPool.ts` gains a second export, `getExistingPool()`, which reads the singleton and never creates a pool (architect AF-14). `server.ts` imports that alone.
  - `ecosystem.config.js`: `kill_timeout` 12000 (P2). `shutdown_with_message: true` was already stated explicitly and is unchanged.
- **D36 startup check (CR-28, CR-33, AF-30, AF-31; `8de2b53`).** `getPool.ts` exports `checkPoolShape()`, which `server.ts` calls once before `server.listen`. It builds a throwaway pool with the real library (`autostart: false`, `min: 0`, so no browser is launched and no timer started) and checks that its `_waitingClientsQueue.dequeue` is callable. If not, it writes one `console.error` line: `generic-pool no longer exposes _waitingClientsQueue.dequeue, which the browser-launch failure handler needs. A failed browser launch will not reject the waiting request.` The server then starts and serves (AF-31). `createPool` registers the `factoryCreateError` handler only when the member is present, through the same `waitingQueueDequeue` helper. The check inspects a real library pool instance (CR-33), so it does not depend on the lazy first-request pool. The line goes to stderr (PM2's error log), as M8-e's refusal line does. The exact pin was declined by the owner.
- **M8-b (F-32).** The request handler parses inside a `try`. An unparsable body, and also a body that parses to a non-object (`null`, a number), gets 500 and a logged error. The second case is the same crash by another door: `const { id } = null` throws in the `'end'` handler.
- **M8-c (F-33).** `generateMessagePreviewImage` closes its page in a `finally`; a failing `close()` is logged, so it cannot replace the real error. `generateImage` awaits the image and the S3 delete together with `Promise.all`, so neither rejection can be left unhandled.
- **M8-d (F-34).** `factory.create` logs and rethrows. That alone is not enough, see Outstanding Item 1: the pool also needs a handler that rejects the waiting request, and `pool.use` needed a fix. Both are in `getPool.ts`.
- **M8-e (F-35).** `config.ts` logs `API_KEY is not set. Refusing to start.` and exits with code 2 when `API_KEY` is unset or empty. Exit code 2 is the code `ecosystem.config.js` lists in `stop_exit_codes`, so PM2 does not restart-loop a misconfigured process. `prod.yml` sets `API_KEY`, so the deploy is unaffected (plan).

## Milestones Completed

M8-a, M8-b, M8-c, M8-d, M8-e (code and local evidence). **Not done, by design:** the production reads (M8-0 run 2, P1 to P3 on stop (2)), which need the push and the `prod.yml` re-run (M9, devops, the owner's approval).

## Entry Conditions

| Condition | Where satisfied | Pinned by |
|---|---|---|
| Stage start | Steering's message "Resume chain 015 … then M7, then M8" (cross-session, 2026-11-08, no stamp); the plan revisions carrying M8 had passed every pre-code gate | Not a test |
| QA Phase 1 covers M8 | `qa/015-bug-evaluation-fixes-qa.md` § M8: probes P1 to P3 and the local cells | `m8-local-probe/probe.cjs` |
| E-1 (no real credentials, no network) | Export without `.env` (`env files in export: 0`); dependencies installed inside the export before the namespace; the probe runs in `unshare -rn` with `ip link set lo up` first; self-check before any cell: loopback GET 200, external lookup `EAI_AGAIN`, 0 non-loopback links, 0 default routes; every `CDN_*`, `PREVIEW_ENDPOINT` and `API_KEY` set to a probe value. No CDN object was read, written or deleted | `run1-6c613a5.txt`, `run2-6c613a5.txt` header lines |
| E-2 (forcing condition) | `~/.cache/puppeteer` absent after the install (`puppeteer browser cache present: no`); `npm ci --omit=optional` under `PUPPETEER_SKIP_DOWNLOAD=1` exit 0 | The M8-d pool cell |
| Browser compatibility (plan, M8-c) | One launch and one screenshot per candidate binary under E-1, puppeteer 21.1.0: `/usr/bin/google-chrome` 156.0.8078.47 launched and produced a 1211-byte JPEG; `/snap/bin/chromium` did not launch under `unshare -rn` (`cannot create snap home dir: mkdir /root/snap: permission denied`). The probe uses Chrome | `m8-local-probe/probe-pages.cjs` cells |
| "No pool before parsing" (plan, unread inference) | Confirmed: the bad-body cells get 500 and the log has no `Created instance` line | The M8-b cells and P3's idle cell |
| User-visible surface | None. The service has no UI | Not a test |
| E-9 (nothing sent) | No request left the namespace | Self-check |

## Files Modified

| Path | Changes | Lines |
|---|---|---|
| `src/server.ts` | `shutdown(trigger)`, triggers, parse guard; drain-complete only on success, `Drain failed` line otherwise (CR-27); `checkPoolShape()` before `listen` (D36) | +45 −21 (`471578f..8de2b53`) |
| `src/getPool.ts` | rethrow; `getExistingPool`; `pool.use`; creation-error handler registered only when the private queue's `dequeue` is callable; `checkPoolShape` (D36) | +28 −16 (`471578f..8de2b53`) |
| `src/generateImage.ts` | page closed in `finally`; `Promise.all` | +17 −15 |
| `src/config.ts` | refusal when `API_KEY` is unset or empty | +6 −1 |
| `ecosystem.config.js` | `kill_timeout` 12000 | +1 −1 |

## Files Created

| Path | Purpose |
|---|---|
| `agent-output/verification/015/m8-local-probe/{run.sh,probe.cjs,probe-pages.cjs}` | The probe rig (entry conditions E-1 built in) |
| `agent-output/verification/015/m8-local-probe/{run1-6c613a5.txt,run2-6c613a5.txt,run-base-471578f.txt}` | Captures: first tip run (the two page cells were mis-instrumented), the tip run of record, and the base run |

## Patterns Extended

| Surface | Pattern extended (rung) |
|---|---|
| Existing tests named before adding | None: the repo has no runner and the plan declines to add one |
| Shutdown | The file's own `shutdown()` and its 10 s timer, extended in place (rung 1) |
| Pool read | A second export beside the singleton, as the architect specified (rung 1) |
| Creation-error handling | The public `factoryCreateError` event plus a read of the private `_waitingClientsQueue`, because no public generic-pool API rejects a waiting acquire (architect AF-30). Corrected at `7e5ca5f` (CR-28): the 3.9.0 README (§ pool.on) shows only a logging handler, so the earlier "generic-pool's own README remedy" was wrong. No other pool in the codebase (rung 3: none exists in this repo) |
| Environment | The one reader of the environment, `config.ts` (rung 1, architect AF-4) |
| Startup check (D36) | M8-e's startup refusal in `config.ts` for the log-line form (`console.error` of a named line); AF-31 for the continue-serving form (rung 1 for the line, a departure from M8-e's exit by the architect's recommendation) |

## TDD Compliance

The repo has no test runner, so the plan's verification is operator-visible. The probe stands in for the tests: the same 25 cells ran against the unchanged code first, then at the tip.

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|---|---|---|---|---|---|
| `shutdown`, triggers, idle drain (M8-a, P1 to P4) | `m8-local-probe/probe.cjs` | Yes | Yes | Base `471578f` (`run-base-471578f.txt`): a `'shutdown'` message ends nowhere (`exit null`, no `Server received` line); P4's cell `{"ex":null,"received":0}`; no drain-complete line. SIGINT alone already worked at the base (control). | Yes (tip: all P1 to P4 cells) |
| `ecosystem.config.js` `kill_timeout` (P2) | same | Yes | Yes | `{"kill_timeout":5000,…}` at the base | Yes |
| Request handler parse (M8-b) | same | Yes | Yes | Base: `ECONNRESET` for the unparsable body, then the process gone (`exited code 1`) for `null` and `5` | Yes |
| `generateMessagePreviewImage`, `generateImage` (M8-c) | `probe-pages.cjs` (a real Chrome) | Yes | Yes | Base: `opened=1 closed=0` after a navigation failure; `unhandled=1` when the image and the S3 delete both fail; `opened=2 closed=1` after a success | Yes (`opened=closed`, `unhandled=0`) |
| `factory.create`, `pool.use` (M8-d) | `probe.cjs` pool cell | Yes | Yes | Base: the pool cell's request did not reject with the launch error (the factory returned `null`); at an intermediate state (rethrow only) the probe showed the hang and 11,654 creation attempts in 3 s, which is why the handler was added | Yes (`creates=2 pending=0`) |
| `shutdown` failure branch (CR-27) | `m8-local-probe/probe.cjs` (3 cells: no drain-complete line; one `Drain failed after Nms:` stdout line naming the cause; exit 0 before the fallback) | Yes | Yes | Assertion-level, against the pre-change code `6c613a5` (`run-cr27-cr28-red-6c613a5.txt`): `Drain complete in 1ms.` is logged and no failure line exists. The third cell passes at the base (the exit was already right) and is the control | Yes (`run-7e5ca5f.txt`) |
| `checkPoolShape`, `waitingQueueDequeue` and the conditional handler (D36, CR-28, CR-33, AF-30, AF-31) | `m8-local-probe/probe.cjs` (5 cells: the server started against a copy of generic-pool with `_waitingClientsQueue` renamed, and against one with `dequeue` renamed and the field kept, each: one named line before any request, then a 404 on a GET; the resolved tree writes no such line and reaches ready; with the member absent a failing browser launch does not crash the process) | Yes | Yes | Assertion-level against the pre-change code, `6c613a5` (`run-d36-red-6c613a5.txt`) and `7e5ca5f` (`run-d36-red-7e5ca5f.txt`): `lines: 0` for both rename fixtures, and the failing-launch cell exits 1 (`status:1`, CR-33's shape). The non-member cell passes at both (control) | Yes (`run-8de2b53.txt`) |
| `config.ts` refusal (M8-e) | same | Yes | Yes | Base: `exit null` and the log shows `Server running at …` for an unset and for an empty key | Yes (exit 2, a line naming `API_KEY`) |

Mutants for the `7e5ca5f` and `8de2b53` guards (`m8-local-probe/m8-guard-mutants.sh`, isolated copies of the export's `build/`, `unshare -rn`, killed at 300 s as a process group, outputs in `m8-local-probe/mutants/mut-*-8de2b53.txt`, each applied against the export by `cmp`): `complete-after-catch` (the drain-complete line back after the catch) kills the no-drain-complete cell only; `queue-optional-chain-removed` kills the field-rename startup cell only; `dequeue-optional-chain-removed` kills the dequeue-rename startup cell and the failing-launch cell; `startup-check-removed` kills both startup cells; `startup-check-inverted` kills both startup cells and the non-member cell; `handler-registered-unconditionally` kills the failing-launch cell only. Each conjunct of `queue?.dequeue?.bind(queue)` and the check's condition is decided by a cell. The earlier guards (`4b68b57`, `6c613a5`): not run. The rig is a probe against the real service and the plan assigns the mutation of the probes to QA Phase 2 ("each is mutated before it is trusted, E-6"). The base run is the red run. The guards a mutant sweep would take, from `git diff -U0 471578f 6c613a5`: the once-only guard (`if (shutdownStarted) return`, P1 idempotence), the `message === 'shutdown'` test, the registration order, the pool-exists branch, the `try`/`catch` and the object test in the handler, the `finally`, the `Promise.all`, the creation-error handler and `!process.env.API_KEY`. QA's sweep owns them; the base run proves the cells discriminate the behaviours, not each guard.

## Class Sweep

Not a fix round for a reviewer finding. Each plan finding's class was enumerated once (`verification/015/m5hi-m6fix-m7-m8-enumerations-a1456c9.txt`).

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| F-32 (a parse of request input with no guard) | `git grep -n 'JSON.parse' 6c613a5 -- src` | 1: `server.ts:24` | Guarded. Residual 0 |
| F-33 (a page opened and not closed on every path) | `git grep -n 'newPage\|page.close' 6c613a5 -- src` | 2: `generateImage.ts:20`, `:35` | One open, one close in a `finally`. Residual 0 |
| F-33 (a promise started before an await that can throw) | `git grep -n 'Promise\|await' 6c613a5 -- src/generateImage.ts` | 10 | The two started together under `Promise.all`; the rest are sequential awaits. Residual 0 |
| F-34 (a factory catch that returns a value for an error) | `git grep -n -B2 'return null\|return undefined' 6c613a5 -- src` | 0 | None left. Residual 0 |
| CR-27 (a completion line written whether or not the work completed; reviewer's enumeration) | `git grep -n "Drain complete\|Drain failed\|process.exit" 7e5ca5f -- src` | 5: `server.ts:62` (the fallback timer), `:75` (complete, in the `try`), `:77` (failed, in the `catch`), `:80` (exit); `config.ts:3` (exit 2 for the refusal) | The one completion line is now on the success branch only; the timer and the exit are not completion signals; `config.ts:3` is a refusal. Residual 0 (the original hit was the line after the `catch`) |
| CR-28 (a dependency's private field read without a presence check; reviewer's enumeration) | `git grep -n "\._[a-zA-Z]" 8de2b53 -- src` | 9, all in `getPool.ts`: 8 are `_useCount` and `_id` (the generator's own fields on its `Browser` type) and 1 is `_waitingClientsQueue` (`:21`, inside `waitingQueueDequeue`) | The one private dependency field is read in one place, behind the presence check, and both the startup check and the handler registration use that helper. A field reached by bracket notation would not be matched. Residual 0 |
| F-35 (`process.env` read) | `git grep -n 'process.env' 6c613a5 -- src` | 10: all in `config.ts` | The other values are cast unvalidated and stay outside F-35 (architect AF-9b). Not applicable, reason stated |

## Test Execution Results

| Command | Results | Notes |
|---|---|---|
| `m8-local-probe/run.sh <repo> <scratch> 6c613a5 run2-6c613a5.txt` | 25 cells, 25 pass, 0 failed; `tsc -b` exit 0; `npm ci` exit 0; self-check passed; 0 non-loopback links | Run of record |
| `m8-local-probe/run.sh <repo> <scratch> 471578f run-base-471578f.txt` | 25 cells, 18 fail, 7 pass (the controls, `SIGINT alone`, `shutdown then SIGINT`, and two log-silence cells that pass because the process died first) | The red run |
| `npx eslint src --max-warnings=0` in the install export | exit 0 after one member-delimiter fix in `server.ts` | Run in the export that holds the installed dependencies; the shared tree has none (`convention-check` SKIP) |
| `node ~/.claude/tools/convention-check.js preview-image-generator --since=471578f` | 5 files, 0 FAIL, 0 CANDIDATE, 2 SKIP | The SKIPs are the id-token check (no conventions file above this repo) and eslint, which the tool could not run without installed dependencies; the eslint line above is the substitute |
| `m8-local-probe/run.sh <repo> <scratch> 8de2b53 run-8de2b53.txt` | 32 cells, 32 pass, 0 failed; `tsc -b` exit 0; `npm ci` exit 0; self-check passed; 0 non-loopback links, 0 default routes | Run of record for the fix round |
| same at `6c613a5` (`run-cr27-cr28-red-6c613a5.txt` for the CR-27 cells; `run-d36-red-6c613a5.txt` for the whole rig) and at `7e5ca5f` (`run-d36-red-7e5ca5f.txt`) | 5 fail at `6c613a5` (the first two `P1 failed drain` cells, both rename startup cells, the failing-launch cell); 3 fail at `7e5ca5f` (the same three D36 cells) | The red runs. The third `P1 failed drain` cell (exit 0 before the fallback) and the non-member cell pass at the base and are controls |
| `m8-guard-mutants.sh <scratch> 8de2b53 mutants/` | 6 mutants, each applied and each killed by its own cell, as above | |
| `cr-m8-probes/run-attack.sh <scratch> 8de2b53 attack-run2-8de2b53.txt` and six repeats per SHA (`attack-a-repeat.txt`) | Row C PASS at `8de2b53` (no drain-complete line, `TypeError` logged, exit in 14 ms); row A passed in that run. Row A's second cell is timing-flaky at `6c613a5` and `7e5ca5f` (six runs each): after-burst 11 or 12 against 12 after idle, 2 of 6 runs at `6c613a5` and 2 of 6 at `7e5ca5f` | The flake is in the cell's read taken at the last response, not a launch after the burst; reported to code review |
| `node_modules/.bin/eslint src --max-warnings=0` in the `8de2b53` export | exit 0 | Output empty |
| Lockfile | `package-lock.json` unchanged: `git diff --quiet 471578f 8de2b53 -- package-lock.json package.json` exits 0; `npm ci` does not rewrite it | |

**Gate satisfaction, disclosed.** `eslint` was run with `--max-warnings=0` in the export, not `npm run lint`, which passes `--fix`. One lint error in my own `server.ts` line was fixed by hand. No source comment was added.

## QAF-37 — the 10 s shutdown fallback (rig cell, no source change)

`qa/015-bug-evaluation-fixes-effort-final-qa.md` § Findings QAF-37 (MEDIUM): removing `setTimeout(() => { process.exit(0); }, 10e3);` from `shutdown` (mutant `qa-ef-fallback-timer-removed`) passed every rig cell, so M8-a's "exit before 12000 ms, no SIGKILL" (B-8) had no assertion when the drain never settles.

- **The cell** (`verification/015/m8-local-probe/probe.cjs`, three assertions in one block, after the P1 failed-drain block): the server is started; a raw TCP client sends a half-written `POST /generate` (request line, `Host`, `Content-Length: 10`, no blank line) and keeps the socket open; `shutdown` is sent. `server.closeIdleConnections()` leaves a connection with a request in progress open, so `server.close` never calls back, the drain never settles, and only the fallback ends the process. It asserts: (1) exit code 0; (2) the exit comes at least 9500 ms and under 12000 ms after the message (the lower bound shows the exit is the fallback, not an early exit); (3) neither a drain-complete nor a drain-failed line. It uses no browser.
- **Green at `8de2b53`:** `m8-local-probe/qaf37-rig-control-8de2b53.txt` (`run.sh`, E-1 export, network-isolated): 35 cells, 0 failed (32 before, 3 added); the new cell's exit at 10019 ms.
- **Red under the mutant:** `qa-m8r-sweep.py` over `effort-final/gen-gap-mutants-8de2b53.json`, names `control` and `qa-ef-fallback-timer-removed`, probe blobs read from agent-output `8fb1eee`, outputs `verification/015/qaf37/` (`qa-m8r-summary.txt`): control 0 red; the mutant KILLED, 2 red (the exit-code cell and the timing cell). The third cell, no drain lines, holds under the mutant, as expected since nothing prints.
- **Not a standing-suite test.** The cell takes about 10 s of wall clock. The generator has no standing suite; the cell lives in the verification rig, run on demand by QA and the implementer.
- **Assumption not checked:** the rig runs Node 24; production runs Node 18.17.1. That `closeIdleConnections` leaves a half-sent request open on 18.17 was not run. The fallback's own timer does not depend on it, but the cell's way of holding the drain open might differ there.

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| QAF-37 (a preserved timer or fallback exit in the generator source with no cell that fails when it is removed) | `git -C preview-image-generator grep -n "setTimeout\|setInterval" 8de2b53 -- src` | 1 hit: `src/server.ts:62`, `setTimeout(() => { process.exit(0); }, 10e3);` | The fallback itself: covered now, killed by the mutant above. Residual after the fix: 0 uncovered hits |

## Outstanding Items

1. **Plan mechanism for M8-d is insufficient; the property is met.** The plan says the launch failure "rejects in the pool factory; the next request gets 500, not a TypeError". Measured with `generic-pool` 3.9.0 (`pool-exp`, in the scratch export): with a factory that only rethrows, the waiting `acquire` never settles (the request would hang) and the pool retries creation in a loop (11,654 attempts in 3 s). Also `pool.use`'s error path released a resource it never acquired, which is the `TypeError`. I added the README-documented `factoryCreateError` handler (reject the oldest waiting request) and rewrote `pool.use` to release only what it acquired. The handler reaches a private field (`_waitingClientsQueue`) of a pinned dependency (`generic-pool@^3.9.0`); the README names it, but a dependency upgrade can break it. For the planner and the code-reviewer: confirm this is acceptable, or state a different remedy (an `acquireTimeoutMillis` alone would leave the retry loop running until it fires).
2. **Additions beyond the plan's text**, each small, none changing a planned behaviour:
   - M8-b also answers 500 for a body that parses to a non-object.
   - The drain calls `pool.clear()` after `pool.drain()` (generic-pool's documented drain protocol) and `server.closeIdleConnections()`, so the exit is not held by an idle keep-alive connection (P3).
   - M8-e exits with code 2 (see above).
3. **Follow-up, not changed (reading only, not probed).** A body that is a JSON object without an `id` reaches `deleteMessagePreviewImages(undefined)`, whose prefix becomes `previews/undefined/`. Reachable only with the API key; severity LOW. Not in F-31 to F-35.
4. **Production reads not done.** P1 to P3 on stop (2) and M8-0 run 2 wait for the push and the `prod.yml` re-run (M9). The first stop after the push is expected to show no `Server received` line and `still alive after 12000ms` (stop (1), the old process; plan "expected, not a refutation").
5. **Residue: the real Chromium under PM2.** The local probe launched a real Chrome for M8-c only and never drained a pool that held a live browser. `pool.drain()` then `pool.clear()` with live browsers is covered by the library's protocol, not by a cell. QA's P3 non-idle cell or the run-2 read is the instrument.
6. **Self-diagnosis (method).**
   - (a) I took the plan's one-line mechanism for M8-d as the design and wrote the rethrow first; the probe against the real pool showed it was wrong. The check I should apply sooner: for a library's error path, run the library against a failing factory before writing the change.
   - (b) My first M8-c cells counted pages through a patch on the wrong object (`puppeteer.launch` versus `puppeteer.default.launch`) and read `opened=0 closed=0` as a fail of the product; the instrument had measured nothing. I added a positive control (`opened > 0`) to the cell.

7. **Fix round (`7e5ca5f`, `8de2b53`).**
   - **The first guard was wrong for rev 27 and was replaced.** At `7e5ca5f` I put the check in `createPool` and threw. `getPool()` is lazy, so the line appeared at the first `/generate`, not at startup (rev 27 (d), QA's message), and a throw made every `/generate` fail after a bad bump (AF-31: log and serve). `8de2b53` checks a throwaway real pool at startup and logs. Self-diagnosis (method): I read CR-28's "fails at deploy" as the criterion and wrote to it, before reading the plan's D36 criterion, which I should have fetched first; and my first stub for the cell deleted the field the library itself uses, so it measured nothing about the guard. Checks to apply sooner: read the criterion text a ruling points at before choosing where the code goes; a stub of a dependency's changed shape must leave the dependency working (a source rename in a copy does).
   - **With the member absent the generator degrades.** The handler is not registered, so a browser-launch failure leaves the waiting request pending and generic-pool retries creation in a loop (the 11,654 attempts in 3 s measured in Item 1), only on the Chromium-outage path. The line at startup is the signal; the loop is the cost AF-31 accepted. The cell asserts the process stays alive, not that it answers.
   - **Not checked.** The check tests presence and callability of `dequeue`, not what it returns (an object with `reject`). A change to the queue's element shape is not detected. The line goes to stderr; if the host read of M9 counts the out log only, it will not see it (QA/devops to confirm which log run 2 reads).
   - **Failed-drain exit code.** A failed drain still exits 0 (the reviewer: "keep the exit"). The signal is the `Drain failed` stdout line and the error on stderr.
   - **Code review's attack row A** (`no launch attempts while idle after the burst`) is timing-flaky at `6c613a5` and `7e5ca5f` (`attack-a-repeat.txt`, two of six each): the cell reads the count at the last response, and the 12th line arrives a tick later.
   - **CR-26 (LOW, website `useMount` lint reach) is still owed**, after QAF-27 and QAF-20.
   - QAF-33 (array bodies) is dropped by the owner (rulings `c8c7649`): lists pass as built, no code.

## Next Steps

Code review of the QAF-37 rig cell (agent-output `8fb1eee`; no generator source changed, generator stays at `8de2b53`); the Round 18 review of `6c613a5..8de2b53` is recorded APPROVED_WITH_COMMENTS. Then QA Phase 2 (its own mutation of the probes), then M9 (devops, owner-approved pushes; the `prod.yml` re-run; M8-0 run 2).

## Resumption State (2026-11-08T09:58, implementer-hooks-015)

*Superseded 2026-11-08T11:25: the current Resumption State is in `015-bug-evaluation-fixes-qaf34-qaf35-cr26-implementation.md`. Everything below was written at 09:58; QAF-34, QAF-35, CR-26 and QAF-37 are since done.*

Superseded by the Resumption State in `015-bug-evaluation-fixes-m1-m2-qa-findings-implementation.md` (the checkpoint of record). M8 is complete at generator `8de2b53`, handed to code review; the open items are in Outstanding Item 7 above.
