---
ID: 015
Origin: 015
UUID: 861e5f61
Status: Active
Status-Detail: "M8-a to M8-e delivered on preview-image-generator's chain branch at 6c613a5 (not pushed). The repo has no runner, so the evidence is a network-isolated probe: 25 of 25 cells pass at the tip and 18 of 25 fail at the base. M8-d needed more than the plan's one-line mechanism (generic-pool hangs and retries on a rejecting factory); the property is met and the extra is reported. P1 to P3 on production wait for the push and the host reads."
Handoff-At: "6c613a5 — repos=preview-image-generator"
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

## Implementation Summary

Every change is in `preview-image-generator` (chain branch `chain/015-bug-evaluation-fixes`, `471578f..6c613a5`, six files). Nothing was pushed and nothing touched production.

- **M8-a (F-31), P1 to P4.**
  - `server.ts` has one `shutdown(trigger)` behind a once-only guard. It logs `Server received <trigger>.` (`shutdown message` or `SIGINT`), closes the server and idle connections, drains and clears the pool only if one exists, logs `Drain complete in <n>ms.`, and exits 0 as soon as that is done. The 10 s fallback timer stays as an upper bound.
  - Both triggers are registered before `server.listen`, so before the `ready` message: `process.on('message')` for the PM2 `'shutdown'` message and `process.on('SIGINT')`.
  - `getPool.ts` gains a second export, `getExistingPool()`, which reads the singleton and never creates a pool (architect AF-14). `server.ts` imports that alone.
  - `ecosystem.config.js`: `kill_timeout` 12000 (P2). `shutdown_with_message: true` was already stated explicitly and is unchanged.
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
| `src/server.ts` | `shutdown(trigger)`, triggers, parse guard | +43 −21 |
| `src/getPool.ts` | rethrow; `getExistingPool`; `pool.use`; creation-error handler | +14 −16 |
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
| Creation-error handling | `generic-pool`'s own README remedy for `factoryCreateError` (`pool._waitingClientsQueue.dequeue().reject(err)`); no other pool in the codebase (rung 3: none exists in this repo) |
| Environment | The one reader of the environment, `config.ts` (rung 1, architect AF-4) |

## TDD Compliance

The repo has no test runner, so the plan's verification is operator-visible. The probe stands in for the tests: the same 25 cells ran against the unchanged code first, then at the tip.

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|---|---|---|---|---|---|
| `shutdown`, triggers, idle drain (M8-a, P1 to P4) | `m8-local-probe/probe.cjs` | Yes | Yes | Base `471578f` (`run-base-471578f.txt`): a `'shutdown'` message ends nowhere (`exit null`, no `Server received` line); P4's cell `{"ex":null,"received":0}`; no drain-complete line. SIGINT alone already worked at the base (control). | Yes (tip: all P1 to P4 cells) |
| `ecosystem.config.js` `kill_timeout` (P2) | same | Yes | Yes | `{"kill_timeout":5000,…}` at the base | Yes |
| Request handler parse (M8-b) | same | Yes | Yes | Base: `ECONNRESET` for the unparsable body, then the process gone (`exited code 1`) for `null` and `5` | Yes |
| `generateMessagePreviewImage`, `generateImage` (M8-c) | `probe-pages.cjs` (a real Chrome) | Yes | Yes | Base: `opened=1 closed=0` after a navigation failure; `unhandled=1` when the image and the S3 delete both fail; `opened=2 closed=1` after a success | Yes (`opened=closed`, `unhandled=0`) |
| `factory.create`, `pool.use` (M8-d) | `probe.cjs` pool cell | Yes | Yes | Base: the pool cell's request did not reject with the launch error (the factory returned `null`); at an intermediate state (rethrow only) the probe showed the hang and 11,654 creation attempts in 3 s, which is why the handler was added | Yes (`creates=2 pending=0`) |
| `config.ts` refusal (M8-e) | same | Yes | Yes | Base: `exit null` and the log shows `Server running at …` for an unset and for an empty key | Yes (exit 2, a line naming `API_KEY`) |

Mutants: not run. The rig is a probe against the real service and the plan assigns the mutation of the probes to QA Phase 2 ("each is mutated before it is trusted, E-6"). The base run is the red run. The guards a mutant sweep would take, from `git diff -U0 471578f 6c613a5`: the once-only guard (`if (shutdownStarted) return`, P1 idempotence), the `message === 'shutdown'` test, the registration order, the pool-exists branch, the `try`/`catch` and the object test in the handler, the `finally`, the `Promise.all`, the creation-error handler and `!process.env.API_KEY`. QA's sweep owns them; the base run proves the cells discriminate the behaviours, not each guard.

## Class Sweep

Not a fix round for a reviewer finding. Each plan finding's class was enumerated once (`verification/015/m5hi-m6fix-m7-m8-enumerations-a1456c9.txt`).

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| F-32 (a parse of request input with no guard) | `git grep -n 'JSON.parse' 6c613a5 -- src` | 1: `server.ts:24` | Guarded. Residual 0 |
| F-33 (a page opened and not closed on every path) | `git grep -n 'newPage\|page.close' 6c613a5 -- src` | 2: `generateImage.ts:20`, `:35` | One open, one close in a `finally`. Residual 0 |
| F-33 (a promise started before an await that can throw) | `git grep -n 'Promise\|await' 6c613a5 -- src/generateImage.ts` | 10 | The two started together under `Promise.all`; the rest are sequential awaits. Residual 0 |
| F-34 (a factory catch that returns a value for an error) | `git grep -n -B2 'return null\|return undefined' 6c613a5 -- src` | 0 | None left. Residual 0 |
| F-35 (`process.env` read) | `git grep -n 'process.env' 6c613a5 -- src` | 10: all in `config.ts` | The other values are cast unvalidated and stay outside F-35 (architect AF-9b). Not applicable, reason stated |

## Test Execution Results

| Command | Results | Notes |
|---|---|---|
| `m8-local-probe/run.sh <repo> <scratch> 6c613a5 run2-6c613a5.txt` | 25 cells, 25 pass, 0 failed; `tsc -b` exit 0; `npm ci` exit 0; self-check passed; 0 non-loopback links | Run of record |
| `m8-local-probe/run.sh <repo> <scratch> 471578f run-base-471578f.txt` | 25 cells, 18 fail, 7 pass (the controls, `SIGINT alone`, `shutdown then SIGINT`, and two log-silence cells that pass because the process died first) | The red run |
| `npx eslint src --max-warnings=0` in the install export | exit 0 after one member-delimiter fix in `server.ts` | Run in the export that holds the installed dependencies; the shared tree has none (`convention-check` SKIP) |
| `node ~/.claude/tools/convention-check.js preview-image-generator --since=471578f` | 5 files, 0 FAIL, 0 CANDIDATE, 2 SKIP | The SKIPs are the id-token check (no conventions file above this repo) and eslint, which the tool could not run without installed dependencies; the eslint line above is the substitute |
| Lockfile | `package-lock.json` unchanged: `git diff 471578f 6c613a5 -- package-lock.json package.json` is empty; `npm ci` does not rewrite it | |

**Gate satisfaction, disclosed.** `eslint` was run with `--max-warnings=0` in the export, not `npm run lint`, which passes `--fix`. One lint error in my own `server.ts` line was fixed by hand. No source comment was added.

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

## Next Steps

Code review of `471578f..6c613a5` in preview-image-generator, with the website deliveries. Then QA Phase 2 (its own mutation of the probes), then M9 (devops, owner-approved pushes; the `prod.yml` re-run; M8-0 run 2).

## Resumption State (checkpoint 2026-11-08T09:08, implementer-hooks-015)

- **Branches and HEAD.** website `chain/015-bug-evaluation-fixes` at `476c633`, clean. preview-image-generator `chain/015-bug-evaluation-fixes` at `6c613a5`, clean (not pushed). agent-output at the Checkpoint commit; its only uncommitted file is `INBOX.md`, which is another session's. Nothing of mine is uncommitted or locally mutated.
- **Done.** M0, M1, M2, M4 (delivery 4: non-JSON cells `1968281`), M5 a to g, M5-h and M5-i (`09c7c45`, `ad54eb3`), M6 plus the Round 14 and QA fix round (`9cc06d8`, `4aa9d3a`, `b608555`), M7 (`a4b4434`), M8 (generator `4b68b57`, `6c613a5`). M3 is removed (D30). The Playwright folder-switch read is closed and not decided (`d28-folder-switch/README.md`); the planner settled it from Next's source.
- **Handed.** To code-reviewer-hooks-015: website `476c633` and generator `6c613a5`, documents at agent-output `3926486` (message sent 2026-11-08; QA knows). Gate of record at `476c633`: 1118 of 1118, 114 files, exit 0, typecheck exit 0 (`verification/015/m7-m5hi-final-*-476c633`). The run at `a1456c9` exited 1 (a preview cell raced the render) and is kept as evidence.
- **Next, in order.** (1) QAF-27 LOW (qa/…-m1-qa.md): M1-c ioredis `[[err, null], …]` deletion-failure shape, a second `setImmediate` turn, zero `Sessions` statements; M1-i the `%41` octet and the two residue members (a bare `next-auth.session-token`, a value `ab%` or `%zz`). (2) QAF-20: the `useParsePathname` describe and the two `formatKey` self-comparison cases in `bugFixCoverage.supplemental.test.ts`, the "0000" discriminator, the split into behaviour-named files. Both before the effort-final QA pass; tighten existing files first, each cell red under a named mutant, one handoff. (3) Any code-review return on `476c633` / `6c613a5` (CR-22/CR-24 sub-entry of Round 14; M5-h, M5-i, M7, M8 reviews).
- **Open questions sent.** To planner-hooks-015: M5-h's `fields: null` member no longer crashes at the tip (cell moved to "rendering"); M8-d's mechanism (generic-pool hangs on a rejecting factory; `factoryCreateError` remedy reaching `_waitingClientsQueue`; three small additions). To nobody else; none open to the owner.
- **Evidence run but not recorded.** None outstanding. M5-h's mutants were last swept at `a1456c9`; `476c633` changed only the positive control's wait.
- **Lessons to keep.** Run `bash -n` on a generated driver and read a summary's line count before waiting. `vi.waitFor` with `act` inside the callback, never `act` around `waitFor`. A mocked provider re-renders through `useSyncExternalStore` in the mock hook. A library's error path is run against a failing factory before the change is written. `mutate-run.sh` needs a committed SHA; `EXPORT_ROOT` under this session's scratchpad (`/tmp/claude-1000/-usr-local-bin-hooks/d2d8901d-0945-41a4-95f6-d7103dcebe2b/scratchpad`). The M8 rig is `verification/015/m8-local-probe/run.sh <repo> <scratch> <sha> <out>` (installs inside the export). `pkill -f` on a pattern in my own command kills my shell.
- **Code-review return received after the Checkpoint (2026-11-08T09:18; code review's record `2fa6d8b`, plan row `09db885`).** Approved: M5-h, M5-i, M6 fixes (CR-22, CR-24, CR-25), M7, M4-d cells, M8-b to M8-e. Owed by me, in this order before the next handoff: (a) **CR-27 MEDIUM, blocks M8-a:** in `preview-image-generator/src/server.ts` `shutdown()`, the `catch` falls through to "Drain complete in Nms." and exit 0. Log drain-complete only on success; on failure log a distinct stdout line ("Drain failed after Nms: …") and add a rig cell in `m8-local-probe/probe.cjs` that is red at `6c613a5`; `closeIdleConnections?.()` alone is not the fix. Re-check with `verification/015/cr-m8-probes/run-attack.sh` after `m8-local-probe/run.sh` (row C must PASS). (b) **CR-28 LOW:** at `createPool` check `_waitingClientsQueue?.dequeue` exists so a generic-pool bump fails at deploy; and correct the M8 doc's Patterns row: the 3.9.0 README (§ pool.on) shows only a logging handler, so "generic-pool's own README remedy" is wrong. (c) **CR-26 LOW, non-blocking:** the `no-restricted-syntax` guard flags 3 of 8 planted `useMount` members (`cr-m6-probes/usemount-lint-planted.tsx`); preferred remedy `no-restricted-imports` of `useMount` from `react-use` (3 callers left, none returns). (d) CR-29 (`fields: null`) is with the planner. Then QAF-27 and QAF-20.
