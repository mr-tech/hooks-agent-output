---
ID: 015
Origin: 015
UUID: 861e5f61
Parent: codebase-bug-evaluation-2026-11-08.md
Status: Active
Status-Detail: "Answers the plan's F-31 REQUIRES ANALYSIS brief, questions 1–4. Finding: with shutdown_with_message true, PM2 sends only an IPC 'shutdown' message on stop or reload, never SIGINT, so shutdown() never runs. This holds in every version read (5.3.0, 5.4.3, 6.0.14, 7.1.2). Not yet confirmed on the host: that waits on the owner's read-only commands in § Host observation."
---

# Analysis 015 — F-31: does preview-image-generator's graceful shutdown ever run under PM2?

Commissioned by plan `015-bug-evaluation-fixes.md` (rev 2). The brief is the plan's § "Assumptions and open questions"
item **REQUIRES ANALYSIS**, read together with § M8 (M8-a). The source finding is F-31 in
`research/codebase-bug-evaluation-2026-11-08.md`.

## Changelog

| Date (UTC) | Author | Change |
|---|---|---|
| 2026-11-08 | analyst (plan 015) | Created. Answers brief items 1–4 from the PM2 source at four versions and from a local Node probe of the app's shutdown shape. F-31's premise is corrected: the drain never starts. Before this read, the open question was whether PM2's SIGKILL cuts the drain short. |

## Value Statement and Business Objective

As the implementer of plan 015 M8-a, I need to know what PM2 actually delivers to the preview-image-generator process
when it stops or reloads it. Without that, a fix that only raises `kill_timeout` could ship while the browser-pool drain
it is meant to protect still never runs. The business objective is that a deploy does not cut off in-flight preview
renders or leak Chromium processes on the production host.

## Context

- **Roadmap:** none was read because none exists. `agent-output/roadmap/` holds only `.gitkeep`, as the plan's
  Epic-Alignment header records. I did not re-read it.
- **Architecture:** `architecture/system-architecture.md` § "preview-image-generator (screenshot service)" says the
  service is "deployed under PM2 (`ecosystem.config.js`, `wait_ready`, graceful SIGINT drain)". This analysis contradicts
  the "graceful SIGINT drain" clause (see Finding V-1). That document belongs to the architect, so I route the
  correction there and do not edit it. `architecture/preview-image-generator.md` says nothing about PM2's stop path.
- **Decisions Register (plan 015, D1–D13):** no row governs PM2 stop semantics or the drain. D2's Playwright constraint
  was honoured: no browser was launched, and the probe below starts only `node`.
- **App code at `471578f`:**
  - `src/server.ts`, `server.listen` callback: sends `process.send?.('ready')` and then registers
    `process.on('SIGINT', …)`. Nothing else is registered: no `'message'` listener and no SIGTERM handler.
  - `src/server.ts` `shutdown()`: logs `Server received SIGINT. Closing server.`, arms
    `setTimeout(() => process.exit(0), 10e3)`, then awaits `server.close` and `getPool().drain()`. It never calls exit
    when the drain completes.
- **`ecosystem.config.js` at `471578f`:** `shutdown_with_message: true`, `kill_timeout: 5000`, `wait_ready: true`,
  `listen_timeout: 10000`. No `exec_mode` is set, so the app runs in fork mode. No `treekill` is set, so the schema
  default `true` applies.
- **`.github/deploy.sh`** runs `DEPLOY_NAME="$APP_NAME-$ENV" pm2 startOrReload ecosystem.config.js --update-env`, then
  `pm2 reset` and `pm2 save`. `.github/workflows/prod.yml` sets `APP_NAME: hooks-image-preview-generator` and
  `ENV: prod`, so the production process is named **`hooks-image-preview-generator-prod`**. Verified from the repo.

## Methodology

1. **PM2 source.** I ran `npm pack pm2@<ver>` with `--ignore-scripts` for four versions, each into its own empty
   directory under the session scratchpad:
   - **5.3.0**, published 2023-03-15: the 2023 release the brief asks for.
   - **5.4.3**, published 2024-11-13: the last 5.x release.
   - **6.0.14**, published 2025-11-26: the last 6.x release.
   - **7.1.2**, published 2026-11-03: the current `latest` dist-tag.

   I also packed `@pm2/io@5.0.2`, the dependency PM2 5.3.0 pulls in (`~5.0.0`), to check it for a handler that
   translates the `'shutdown'` message. All tarballs were treated as untrusted data and read with `grep`, `sed`, `awk`
   and `diff` only. **No PM2 code was executed.**

   Every claim about PM2 behaviour below therefore comes from **reading the source**. I label those claims
   *High-confidence inference*, not *Verified*.
2. **App-side probe (executed).** I wrote two scripts in a separate scratchpad directory, `probe/`:
   - `child.js` mirrors `server.ts`'s listen callback and `shutdown()` exactly: a SIGINT-only listener, a 10 s
     `setTimeout` fallback, and an instantly resolving "drain".
   - `parent.js` and `parent2.js` spawn `child.js` the way PM2's `ForkMode.js` does: `detached: true`, stdio
     `['pipe','pipe','pipe','ipc']`. They then send the stimulus.

   The probes ran under `unshare -rn` on Node v24.14.0. No PM2, Chromium or production code was involved.

## Findings

### V-1 — With `shutdown_with_message: true`, PM2 sends only the IPC message `'shutdown'`, never SIGINT, then SIGKILL after `kill_timeout`

*High-confidence inference.* This comes from reading the source at all four versions. The kill function is
byte-identical across 5.3.0, 5.4.3 and 6.0.14.

**The kill function.** `lib/God/Methods.js`, `God.killProcess(pid, pm2_env, cb)` does the following:

- When `typeof pm2_env.pm_id === 'number'` and either `cst.KILL_USE_MESSAGE` or `pm2_env.shutdown_with_message == true`
  holds, it looks up `proc = God.clusters_db[pm2_env.pm_id]`.
- If `proc && proc.send` exists, it calls `proc.send('shutdown')` and **returns** `God.processIsDead(pid, pm2_env, cb)`.
- The `process.kill(pid, cst.KILL_SIGNAL)` call (SIGINT by default) sits **after** that `return`. It is reached only
  when `proc.send` is missing, which logs `[AppKill] <pid> pid cannot be notified with send()`.

**The child does have `proc.send`.** `lib/God/ForkMode.js` spawns fork-mode children with
`stdio: ['pipe','pipe','pipe','ipc']` and stores the child in `God.clusters_db[env.pm_id]`. The child is therefore a
`ChildProcess` with an IPC channel, and the app's own `process.send?.('ready')` depends on that same channel.

**The SIGKILL timer.** `lib/God/Methods.js` `God.processIsDead` polls `God.checkProcess(pid)` every `kill_retry_time`.
After `kill_timeout` ms, when the process is still alive, it sends SIGKILL:

- 5.3.0–6.0.14 log `Process with pid %d still alive after %sms, sending it SIGKILL now...`.
- 7.1.2 logs `Process with pid %d still alive after %sms, sending SIGKILL to %d remaining pids...`.

`kill_timeout` is `pm2_env.kill_timeout`, which falls back to `cst.KILL_TIMEOUT` (1600, or `PM2_KILL_TIMEOUT`).

**Defaults.** `constants.js` sets `KILL_SIGNAL: process.env.PM2_KILL_SIGNAL || 'SIGINT'` and
`KILL_USE_MESSAGE: process.env.PM2_KILL_USE_MESSAGE || false` in every version read.

**Nothing in the child translates the message into a signal.**
- `lib/ProcessContainerFork.js` registers no `'message'` handler and no signal handler in 5.3.0 or 7.1.2.
- In the `@pm2/io@5.0.2` tarball, the string `shutdown` appears in no file.
- In 7.1.2's bundled `modules/pm2-io-bpm`, the only SIGINT handler is in `pmx.js` `onExit`, which runs only if the app
  itself calls `onExit`. This app does not.

**Every stop path goes through this function.** The only call to `killProcess` is `God.stopProcessId`
(`lib/God/ActionMethods.js`). The other `process.kill` calls in `ActionMethods.js` belong to
`sendSignalToProcessId`, which is `pm2 sendSignal` and not a stop.

**Reload in fork mode is a restart, which is a stop.** `lib/God/Reload.js` `God.reloadProcessId` takes the
`hardReload` path only when `exec_mode == 'cluster_mode'`. In fork mode it logs
`Process %s in a stopped status, starting it` (the wording is misleading) and calls `God.restartProcessId`. That calls
`God.stopProcessId`, then `God.startProcessId`. This holds in 5.3.0 through 7.1.2. 7.1.2 adds only a guard that refuses
a reload while another reload is in progress.

**Consequence: `shutdown()` never runs on a PM2 stop, restart or deploy reload.** The app listens only for SIGINT and
PM2 never sends it. The `'shutdown'` message reaches a process with no `'message'` listener and is dropped. The process
keeps serving until PM2 SIGKILLs it at `kill_timeout`, which is currently 5000 ms. There is no `server.close()`, no
`pool.drain()` and no log line.

**Probe confirmation of the app side (Verified, executed).** `parent.js message` sent `'shutdown'` over IPC to the
mirrored child:
- The child printed nothing and kept running.
- The parent's 5000 ms timer fired: `child exited code=null signal=SIGKILL after 5013ms`.

The probe confirms only the app side: given the message, the app ignores it. That PM2 sends the message is the
source-read inference above.

**F-31's premise is wrong in a way that matters.** F-31 says PM2 sends SIGINT and SIGKILLs at 5 s, before the app's
10 s fallback. In fact the drain is not cut short at 5 s: it never starts. **Raising `kill_timeout` alone would only
make every deploy hold a process that ignores its stop for longer, and drain nothing.** This is exactly the risk the
plan's REQUIRES ANALYSIS paragraph anticipated.

### V-2 — Version differences: none that affect the delivery; 7.x changes what the final SIGKILL hits

*High-confidence inference, source reading.*

**Delivery is unchanged.** I diffed the `God.killProcess` and `God.processIsDead` function bodies:
- 5.3.0 → 5.4.3: identical.
- 5.3.0 → 6.0.14: identical.
- 7.1.2: the message-first branch is unchanged.

Three more files show no changed lines between 5.3.0, 5.4.3 and 6.0.14: `lib/God/Reload.js`,
`lib/God/ActionMethods.js` and `lib/Utility.js`. In 7.1.2, `God.restartProcessId`, `God.stopProcessId`,
`Utility.extendExtraConfig` and `Utility.extendMix` are each identical to 5.3.0 at function level.

**Which pids the SIGKILL hits differs.** In the message branch, `treekill` is never called before the timeout.
- **5.3.0–6.0.14:** when the timeout fires, `processIsDead` sends SIGKILL with `treekill(pid, 'SIGKILL')` because
  `treekill` defaults to true. That kills the node process **and its descendants**, including Chromium.
- **7.1.2:** `processIsDead` SIGKILLs `pm2_env._tree_pids || [pid]`. `_tree_pids` is set only by the signal branch's
  `treekill` callback, so in the message branch the list is `[pid]`. Only the node process is SIGKILLed. The source's
  own comment names this branch: "a later kill that skips treekill (shutdown_with_message)".

So on 7.x hosts, Chromium processes the pool launched (`src/getPool.ts`, `puppeteer.launch`, puppeteer `^21.1.0`) are
not killed by PM2 on a deploy. Whether they then die on their own is H-1.

### V-3 — `startOrReload … --update-env` applies a changed `kill_timeout` and `shutdown_with_message` to the running app, before the stop it triggers; removing a key does not reset it

*High-confidence inference, source reading. 5.3.0 and 7.1.2 are identical on this path, apart from the `filter_env`
additions in 7.1.2, which concern environment variables only.*

**How the file's values reach the running app.**
1. `lib/API.js` `_startJson`, when the app name is already running, builds
   `env = Common.mergeEnvironmentVariables(app, opts.env, deployConf)`.
2. In `lib/Common.js`, `mergeEnvironmentVariables` copies **every top-level key of the app block** into
   `res.current_conf`. That includes `kill_timeout` and `shutdown_with_message`.
3. `_startJson` sets `env.updateEnv = true` itself ("When we are processing JSON, allow to keep the new env by
   default"), whether or not `--update-env` is passed. It then calls `_operate('reloadProcessId', …)`, which passes
   `current_conf` through in `opts.env`.
4. `lib/God/ActionMethods.js` `God.restartProcessId` calls `Utility.extendExtraConfig(proc, opts)`, which runs
   `Utility.extendMix(proc.pm2_env, current_conf)`. **It does this before calling `God.stopProcessId`.**
   `stopProcessId` then calls `God.killProcess(proc.process.pid, proc.pm2_env, …)` with the updated `pm2_env`.

**Consequence: a deploy that changes these values uses the new values for that same deploy's stop.** No second deploy
is needed. `deploy.sh`'s `pm2 save` then writes them to the dump.

**Caveat: removing a key keeps the old value.** `Utility.extendMix` overwrites only the keys present in the source,
and deletes a key only when its value is the string `'null'`. `lib/tools/Config.js` applies schema defaults only for
keys that declare `default`. `shutdown_with_message` and `kill_timeout` declare only `docDefault`, so a missing key gets
no default.

**Deleting `shutdown_with_message` from the ecosystem file therefore leaves the running process at `true`.** It stays
`true` until the app is deleted and started fresh. To change the value on an existing process, the file must set it
explicitly, for example to `false`. The same applies to `kill_timeout`.

### V-4 — The app's shutdown always takes 10 s, even when the drain finishes at once

*Verified, executed.* `parent2.js` sent SIGINT to the mirrored child (500 ms after `ready`):

```
child: Server received SIGINT. Closing server.   (t)
child: Server closed.                            (t+1ms)
child: drain resolved                            (t+1ms)
parent[signal, no kill]: exited code=0 sig=null after 10525ms   (includes the 500 ms pre-delay)
```

`shutdown()` never calls exit when the drain completes. The non-`unref`'d 10 s timer keeps the event loop alive, so
the process exits only when that timer fires, about 10.0 s after SIGINT. **The 10 s value is the minimum stop time,
not just an upper limit.**

Because a fork-mode reload is stop-then-start (V-1), every deploy would have at least 10 s with no listener on the
port. M8-a's clause "must not delay a reload past what the drain needs" is unmet on the app side, whatever
`kill_timeout` is set to.

### V-5 — The stop handler is registered after readiness is signalled

*Verified, executed in the probe model.*

**The race.** In `server.ts`, `process.send?.('ready')` comes before `process.on('SIGINT', …)`. In the first
`parent.js signal` run, SIGINT was sent the moment `ready` arrived. The child died by the signal's default action
(`signal=SIGINT after 7ms`) and never logged the shutdown line. The same run with a 500 ms delay behaved normally (V-4).

**For a message**, the equivalent is that a `'shutdown'` message arriving before a `'message'` listener exists is lost.

**Practical effect.** On the host the window is microseconds and needs a stop to arrive just as the app becomes ready.
It is a property to state, not a likely failure.

### Hypotheses

**H-1 — on PM2 7.x, Chromium children survive a deploy as orphans.**
- Confidence: low to moderate.
- Basis: V-2 shows 7.1.2 SIGKILLs only the node pid on this path. Whether Chromium exits when its parent dies is
  unread: I did not read puppeteer 21's launcher, and I recall but have not verified that it launches the browser
  `detached` and has no parent-death signal.
- Fastest disconfirming test: on the host, after a deploy, look for Chromium processes whose parent is pid 1 (§ Host
  observation, command 6). Zero survivors disconfirms H-1.
- Missing telemetry: process counts across a deploy.
- This matters only if the host runs PM2 ≥ 7.

**H-2 — the production process has never run `shutdown()` under PM2.**
- Confidence: high, given that `shutdown_with_message: true` has been in the file since the stored configuration was
  created.
- The stored value could differ (V-3: stored values persist), or the daemon could have `PM2_KILL_USE_MESSAGE` or
  `PM2_KILL_SIGNAL` set.
- Fastest test: § Host observation, commands 3–5.

## Root Cause

Root cause, from the source reading in V-1 and V-3 and the probe in V-1 (app side): **the app's only stop handler
listens for SIGINT, and the PM2 option set in the same repo (`shutdown_with_message: true`) makes PM2 deliver an IPC
`'shutdown'` message instead.** The 5000 ms `kill_timeout` is a secondary defect: it would cut a 10 s fallback short
*if* the drain ever started.

It is not yet observed on the host. That observation is what the owner's commands below would supply.

## Determination for M8-a — the properties that must hold

These are stated as properties, not code. Plan design stays with the planner.

**P1 — the stop reaches `shutdown()`.**
- Whatever PM2 delivers under the ecosystem file's configured setting must invoke `shutdown()`:
  - with `shutdown_with_message: true`, an IPC message equal to `'shutdown'`;
  - with it explicitly `false`, `SIGINT` (`cst.KILL_SIGNAL`, unless the daemon sets `PM2_KILL_SIGNAL`).
- A robust form handles **both**, because PM2 falls back to SIGINT when `proc.send` is missing
  (`[AppKill] … cannot be notified with send()`).
- `shutdown()` must then be safe to invoke more than once.
- If the configuration is the thing that changes, the file must set the new value explicitly. Removing the key
  changes nothing on the running process (V-3).

**P2 — PM2's `kill_timeout` is greater than the app's own fallback.**
- With the fallback at 10 000 ms, `kill_timeout` must be **greater than 10 000 ms** with margin. That margin covers
  PM2's poll interval (`kill_retry_time`, 100 ms by default in 7.1.2) and the exit latency after `process.exit`.
- Ordering is what matters, not an exact value: fallback < `kill_timeout`, so the process exits by its own path before
  PM2's SIGKILL.
- The new value takes effect on the same deploy that carries it (V-3).

**P3 — the process exits when the drain completes, not when the fallback timer fires.**
- Today the timer sets a 10 s minimum on every stop (V-4).
- Without P3, P2 makes every deploy cost about 10 s of downtime in fork mode, which breaks M8-a's "must not delay a
  reload past what the drain needs".
- The fallback should be the upper bound only.

**P4 — the stop handler is registered no later than readiness is signalled (V-5).** This is low priority, but it is
cheap to state.

**Measurement M8-a still lacks.** The real drain duration under load sets how much the fallback could safely shrink. It
is G-4 in the research document and is still open. The host's restart log, once read, gives the first data point.

## Host observation — read-only commands for the owner

The `ps`, `grep`, `ls` and `tail` commands below write nothing. Commands 2–4 are `pm2` CLI commands, which connect to
the daemon. Run them **as the user that owns the PM2 daemon** (found in command 1), with that user's `PM2_HOME`. Run
as another user, a `pm2` command finds no daemon, **starts a new empty one**, and reports nothing.

1. **Daemon version, user and PM2_HOME, without connecting.** The daemon's process title is
   `PM2 v<version>: God Daemon (<PM2_HOME>)`, set in `lib/Daemon.js` in every version read. The version that matters is
   this one, the in-memory daemon's, not the CLI's.
   ```sh
   ps -eo user,pid,lstart,args | grep '[G]od Daemon'
   ```
2. **CLI version.** If this differs from (1), PM2 prints `>>>> In-memory PM2 is out-of-date` on any connecting command.
   ```sh
   pm2 -v
   ```
3. **Stored stop configuration of the live process.** `pm2 show` does **not** print `kill_timeout`,
   `shutdown_with_message` or `treekill` (`lib/API/UX/pm2-describe.js`), so read them from `jlist`, filtered so that no
   environment secrets are printed. If (2) differs from (1), drop the banner lines first.
   ```sh
   pm2 show hooks-image-preview-generator-prod
   pm2 jlist | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{for(const p of JSON.parse(s.slice(s.indexOf("[")))){if(p.name!=="hooks-image-preview-generator-prod")continue;const e=p.pm2_env;console.log(JSON.stringify({pid:p.pid,exec_mode:e.exec_mode,kill_timeout:e.kill_timeout,shutdown_with_message:e.shutdown_with_message,treekill:e.treekill,wait_ready:e.wait_ready,out_log:e.pm_out_log_path,err_log:e.pm_err_log_path,uptime:new Date(e.pm_uptime).toISOString()},null,1))}})'
   ```
   The same two keys also appear in the saved dump, which can be read without connecting:
   ```sh
   grep -o '"kill_timeout":[0-9]*\|"shutdown_with_message":[a-z]*\|"treekill":[a-z]*' <PM2_HOME>/dump.pm2
   ```
4. **Daemon environment overrides.** These would change V-1's branch.
   ```sh
   tr '\0' '\n' < /proc/<daemon pid from (1)>/environ | grep -E '^PM2_KILL_(SIGNAL|USE_MESSAGE|TIMEOUT)='
   ```
5. **What happened at the last stop.** The app's line is written to stdout, so it lands in the out log from (3).
   ```sh
   grep -c 'Server received SIGINT' <out_log>
   grep -n 'Server received SIGINT\|Server closed' <out_log> | tail -5
   grep -n 'Stopping app:hooks-image-preview-generator-prod\|still alive after\|msg=process killed\|process tree killed\|\[AppKill\]' <PM2_HOME>/pm2.log | tail -20
   ```
   **Expected result, if V-1 holds:**
   - The out log contains **no** `Server received SIGINT`: the count is 0, or there is no line near any stop.
   - `pm2.log` shows each `Stopping app:hooks-image-preview-generator-prod id:N` followed about 5 s later by
     `Process with pid … still alive after 5000ms, sending …SIGKILL`.

   **What would refute it:**
   - A `Server received SIGINT` line timed at a stop.
   - A stop followed by `msg=process killed` with no `still alive` line.
6. **H-1 only (PM2 ≥ 7 in step 1).** Count Chromium processes orphaned to pid 1:
   ```sh
   ps -eo pid,ppid,lstart,args | grep '[c]hrom' | awk '$2==1' | head
   ```

Two caveats on the logs. Log rotation (for example `pm2-logrotate`) may have removed the last stop's lines. Note also
that `deploy.sh`'s `pm2 reset` resets counters, not logs. Either way, the configuration reads in (3) and (4) settle the
mechanism without the logs.

## Open Questions and remaining gaps

**G-1 — the host's PM2 version.**
- Why it is open: the version is unknown, and only the owner can read the host.
- Why it matters less: the delivery behaviour (V-1) and the configuration-update behaviour (V-3) are the same in every
  version read, from 5.3.0 to 7.1.2. The version matters only for H-1 (7.x).
- What closes it: command 1.
- I did not read versions before 5.3.0. If the daemon predates 2023, the code paths named here should be re-read at
  that version.

**G-2 — the stored versus file values on the live process (H-2).**
- What closes it: command 3, and command 4 for the daemon overrides.

**G-3 — the real drain duration.** This is research G-4. It needs a stop that actually reaches `shutdown()`, so it
cannot be measured until P1 holds. The first timed reload after the M8 deploy measures it, from the time between the
`Server received SIGINT` and `Server closed` lines and PM2's `process killed` line.

**G-4 — Chromium's fate when its node parent is SIGKILLed (H-1).**
- What closes it: command 6 on the host. Alternatively, read puppeteer 21's `BrowserLauncher` / `launch` for
  `detached` and parent-death handling.
- I did not run it: a local Chromium test needs a browser, which D2 forbids while `researcher-competitors` is live.

**G-5 — PM2 claims are source-read, not executed.** The brief forbids running PM2. The app-side halves are executed
(V-1 probe, V-4, V-5). The PM2-side halves are inferences from reading the code. Command 5 on the host is the
observation that would make V-1 Verified.

## System Weaknesses

- **The configuration and the code disagree, and nothing checks it.** The ecosystem option selects a stop mechanism the
  code does not handle. No test or startup check links the two.
- **The architecture record says "graceful SIGINT drain".** The record describes intent, and the deployed configuration
  makes that intent unreachable. I route the correction to the architect and leave the edit to them.
- **Fork-mode "reload" is a full stop/start**, so stop duration is downtime. The `listen_timeout: 10000` /
  `wait_ready` start-up adds to it.

## Instrumentation Gaps

- **Normal operation:**
  - The app logs only on SIGINT. A stop it ignores leaves no trace in the app log. The only evidence is PM2's
    `still alive after … SIGKILL` line in `pm2.log`.
  - The app's log line names the signal (`Server received SIGINT`), so the line will be wrong once the trigger is a
    message.
- **Debug:** none is needed beyond the host reads above.

## Analysis Recommendations (next investigative steps, not plan items)

1. **Run host commands 1, 3 and 5.** They make V-1 Verified on the host, or refute it, and close G-1 and G-2.
2. **After the M8 deploy, time one reload:**
   - stop → `Server received …` → `Server closed` → `process killed`, with no `still alive` line;
   - the result is the drain-duration measurement for G-3 and the evidence for M8-a's criterion.
3. **If command 1 shows PM2 ≥ 7, run command 6 before and after a deploy (H-1).**
