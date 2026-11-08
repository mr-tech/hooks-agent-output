---
UUID: a1ef1314
Status: Open
Status-Detail: "Chain 015's M8 drain was observed only on an idle process: 1 ms, no pool, no request. Two things are unobserved. First, how long the drain takes for a process holding a pool and in-flight renders, against the 12000 ms kill_timeout. Second, whether Chromium survives a SIGKILL'd stop that has live browsers, which rests on PM2 5.2.2's tree kill, read from source. Nothing blocks on either."
Owning-Stage: devops (the stage that reads the generator host at a production deploy)
Review-Trigger: the next production stop of hooks-image-preview-generator-prod whose process has served requests (any later prod.yml deploy or restart); and before any PM2 upgrade on the generator host past 5.x
---

# preview-image-generator: the drain under load and Chromium after a SIGKILL are unobserved

## What is seeded

**1. The drain of a working process.** This is F-31's real drain duration, research G-4 and analysis G-3.
- **What is set.** Chain 015 (M8-a) made a production stop reach `shutdown()` and set the app's `kill_timeout` to
  12000 ms.
- **The basis.** That is 2 s over the app's own 10 s fallback, a margin the planner chose rather than measured (plan
  015 P2).
- **The only drain observed.** M8-0 run 2's stop (2), at 2026-11-08T22:04:49Z, stopped a process up 2 minutes. That
  process logged 0 `Created instance` and 0 `POST /generate` lines in its span, so it had created no pool. Its drain
  read `Drain complete in 1ms.`: an **idle drain** (plan P3's idle cell).

**Owed at the trigger** (the next prod stop of a process that has served requests):
- Run `verification/015/pig-host-read.sh` (agent-output `f616d83`, code-reviewed) as `claude-ro`:
  `ssh hooks-pig 'bash -s' < verification/015/pig-host-read.sh`.
- In section [6], take the span of the stopped process: the last span printed, provided it is not RESTARTS or NO
  SPAN.
- Record:
  - `Created instance` (must be > 0 for this read to count as a drain under load);
  - `POST /generate`;
  - the `Drain complete in <N>ms.` figure, or `Drain failed after`;
  - the exit time against `Stopping app`;
  - any `still alive after 12000ms` / SIGKILL line.
- Before trusting the span, check that [2] and [3] print `+0000` mtimes. The span assumes the host runs UTC (plan
  015 D23).

**Refutation:** a `still alive` line or SIGKILL on that stop, or a drain figure approaching 12000 ms. Either means the
12 s window does not cover a real drain, which re-prices P2.

**2. Chromium after a SIGKILL'd stop with live browsers** (RK-5, analysis G-4).
- **What the claim rests on.** PM2 5.2.2, the host's version, kills the whole process tree on SIGKILL. That is a
  source read (`God.killProcess`, identical to 5.3.0). At PM2 7.x the SIGKILL takes only the Node process, so
  Chromium children would be orphaned to pid 1.
- **Why it is unexercised.** Run 2's only SIGKILL, stop (1) at 22:02:25Z, hit a process with no Chromium: 0 Chromium
  processes on the host at the read.

**Owed at the trigger:**
- At any stop that ends in SIGKILL while `Created instance` > 0 in that process's span, read section [5]: the count
  of Chromium processes (not `chrome_crashpad`) whose parent is pid 1. It is predicted 0 at 5.x.
- Before a PM2 upgrade past 5.x on the generator host, re-assess RK-5. Under 7.x a SIGKILL'd stop is predicted to
  orphan the pool's Chromiums.

## Evidence

- M8-0 run 2 capture: `verification/015/m8-0-run2-2026-11-08T2205Z.txt`, section [6] spans 2 and 3, section [5].
  Its reading is in `deployment/closed/015-bug-evaluation-fixes-deployment.md`, "Stop (2), M8-0 run 2 and B-8", and
  "What stop (2) does not show".
- The instrument and its review: `verification/015/pig-host-read.sh` at `f616d83`; fixtures in
  `verification/015/pig-span-read-fixture/`; code review `f83fb09`. Liveness of `Created instance` in a historical
  span (227): `verification/015/m8-0-span-liveness-2026-11-08T2139Z.txt`.
- PM2 source reading at 5.2.2, 5.3.0 and 7.1.2: `analysis/closed/015-bug-evaluation-fixes-analysis.md`, V-2 and G-4.

## Origin

`analysis/015-bug-evaluation-fixes-analysis.md` (F-31; analyst-hooks-015), at its closure after the chain-015
release: gaps G-3 and G-4. Their only carrier was that analysis until this handoff.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-08T22:14 | analyst-hooks-015 | Created at the closure of analysis 015 (F-31): G-3 (drain under load) and G-4 (Chromium after a SIGKILL with live browsers), unobserved by M8-0 run 2. |
