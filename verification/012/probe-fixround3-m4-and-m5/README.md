# M4/L8 fix verification — round 3, the pin-refresh hazard closed before it arms

Backs: code review round 3 (`8e87ddf`), M4 required action, and the owner's ruling relayed by
steering ("Guard it before the pin refresh"). Also closes L8 in the same change, as the reviewer
predicted.

## Fix

`main()` now calls `assertConfirmedTarget(resolveTargetHost(process.env.DATABASE_URL),
process.env.BACKFILL_CONFIRM)` as its first statement, **before** `getPostgres()` is even called —
so a bare invocation makes zero connection attempts, against any database, production included.
`resolveTargetHost` parses `DATABASE_URL` into `host:port` (defaulting the port to 5432, and
returning named sentinels `(unset)`/`(unparseable)` rather than throwing on a malformed URL so the
guard's own failure mode is legible). `assertConfirmedTarget` throws unless `BACKFILL_CONFIRM`
names that exact host — an operator has to type out the specific target they intend to hit, not
just flip a boolean.

The same change gives the report destination an override (`BACKFILL_REPORT_DIR`), closing L8: a
verification drive that sets it no longer writes into `agent-output/verification/012/` at all.

All four new/changed exports (`reportPath`'s new second parameter, `resolveTargetHost`,
`assertConfirmedTarget`) are TDD'd in `012-backfill-report.test.ts` — 8 new cases, all red
(`TypeError: ... is not a function` / the override arg silently ignored) before green.

## Leg 1 — bare invocation against a dead, non-production host: refuses, zero connection attempt

```
$ DATABASE_URL="postgresql://postgres:pw@127.0.0.1:1/db" \
  node -r ts-node/register/transpile-only -r tsconfig-paths/register -r dotenv/config \
  src/scripts/backfillValid.ts dotenv_config_path=.env.local
```

```
Error: Refusing to run: DATABASE_URL resolves to "127.0.0.1:1", but BACKFILL_CONFIRM was not set.
Set BACKFILL_CONFIRM="127.0.0.1:1" to confirm this is the intended target before running against it.
    at assertConfirmedTarget (.../backfillValid.ts:35:11)
    at main (.../backfillValid.ts:213:3)
```
Exit 1. No `ECONNREFUSED` anywhere in the trace — the guard fired before `getPostgres()` ran, so no
socket was opened. No stray file appeared under `agent-output/verification/012/`.

## Leg 2 — matching confirmation + report-dir override: proceeds normally, evidence lands off-gate

```
$ DATABASE_URL="postgresql://postgres:pw@127.0.0.1:1/db" \
  BACKFILL_CONFIRM="127.0.0.1:1" \
  BACKFILL_REPORT_DIR="/tmp/012-m4-report-dir" \
  node -r ts-node/register/transpile-only -r tsconfig-paths/register -r dotenv/config \
  src/scripts/backfillValid.ts dotenv_config_path=.env.local
```

Reaches the same `ECONNREFUSED 127.0.0.1:1` H3/H1 already proved reachable, with the report printed
and persisted to `/tmp/012-m4-report-dir/backfill-report-<runId>.md` — **not**
`agent-output/verification/012/`. `ls agent-output/verification/012/backfill-report-*.md` found
nothing: for the first time in four rounds, driving the shipped command left no trace in the gate
directory to clean up.

## Leg 3 — the reviewer's exact hazard: bare invocation against the real `.env.local` production URL

```
$ node -r ts-node/register/transpile-only -r tsconfig-paths/register -r dotenv/config \
  src/scripts/backfillValid.ts dotenv_config_path=.env.local
```

```
Error: Refusing to run: DATABASE_URL resolves to "viaduct.proxy.rlwy.net:12394", but
BACKFILL_CONFIRM was not set. Set BACKFILL_CONFIRM="viaduct.proxy.rlwy.net:12394" to confirm this
is the intended target before running against it.
```

This is the same host the reviewer's own `env-guard.ts` resolved to (§4 of
`probe-cr3-h3-and-default-target/README.md`) — the exact default the review named as the arming
hazard. Refuses before any connection attempt, matching Leg 1.

## Disposition

M4 closed at the Preferred (structural) action: no bare invocation, against any host, can reach a
database. L8 closed in the same change. `/tmp/012-m4-report-dir` deleted after the run; nothing
left under `agent-output/verification/012/` by any of the three legs above.
