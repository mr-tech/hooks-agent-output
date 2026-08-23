# M6/L10 fix verification — round 4, closing the hole before the pin refresh

Backs: code review round 4 (`02125eb`), M6 finding, and the owner's ruling relayed by steering,
2026-08-23: **"Close the hole first"** — implement the reviewer's **Minimum** action only, not the
Preferred (the Preferred was on the ballot and the owner declined it, since it changes
`project-utils` itself and tangles with the pin refresh). L10 addressed alongside since the file
was already open and the reviewer left it to this stage's judgement.

## M6 — the guard's parser and pg's connecting parser can disagree

The reviewer demonstrated, end-to-end through the shipped entry point, that a `DATABASE_URL` with a
`host=` (or `port=`) query parameter is parsed one way by the guard's WHATWG `new URL()` (which
sees only the authority) and a different way by `pg`'s own connection-string parser (which honours
`host=`/`port=` as libpq-style overrides) — so `BACKFILL_CONFIRM` can name a decoy authority host
while the process actually dials the query-string host.

**Fix (Minimum, as ruled)**: `hasConnectionOverrideParams(databaseUrl)` checks for a `host` or
`port` search parameter; `assertNoHostOverride(databaseUrl)` throws unconditionally when either is
present — before `resolveTargetHost`/`assertConfirmedTarget` even run, so no confirmation value,
correct or not, can get past it. Wired as `main`'s first statement (ahead of the M4 guard, which is
now second).

TDD: 8 new cases (`hasConnectionOverrideParams` ×4, `assertNoHostOverride` ×4), all red
(`hasConnectionOverrideParams`/`assertNoHostOverride is not a function`) before green.

### Live reproduction of the reviewer's exact attack

```
$ DATABASE_URL="postgresql://postgres:pw@decoy.invalid:1/db?host=127.0.0.1" \
  BACKFILL_CONFIRM="decoy.invalid:1" \
  node -r ts-node/register/transpile-only -r tsconfig-paths/register -r dotenv/config \
  src/scripts/backfillValid.ts dotenv_config_path=.env.local
```

```
Error: Refusing to run: DATABASE_URL carries a "host" or "port" query parameter. pg's connector
honours that override; the guard's URL parser does not see it — the confirmed target could differ
from the host actually dialled. Remove the query override before running.
    at assertNoHostOverride (.../backfillValid.ts:62:11)
    at main (.../backfillValid.ts:244:3)
```

Exit 1, zero connection attempts (no `ECONNREFUSED` — the throw happens before `getPostgres()`).
This is the same decoy-authority-plus-loopback-override shape the reviewer's sweep case 11 used;
`BACKFILL_CONFIRM` naming the decoy authority does not matter, because the new check runs first and
does not consult the confirmation at all.

### No regression: a plain `DATABASE_URL` with no query string still proceeds normally

```
$ DATABASE_URL="postgresql://postgres:pw@127.0.0.1:1/db" BACKFILL_CONFIRM="127.0.0.1:1" \
  BACKFILL_REPORT_DIR="/tmp/012-m6-report" \
  node -r ts-node/register/transpile-only -r tsconfig-paths/register -r dotenv/config \
  src/scripts/backfillValid.ts dotenv_config_path=.env.local
```

Reaches the same `ECONNREFUSED 127.0.0.1:1` every prior round's dead-DB drive reached — the new
check does not over-block a URL that carries no override.

## L10 — a sentinel meaning "target undetermined" was itself confirmable

`resolveTargetHost` returns `(unset)`/`(unparseable)` when `DATABASE_URL` is missing or malformed.
Before this fix, `BACKFILL_CONFIRM='(unset)'` satisfied `assertConfirmedTarget` when the host also
resolved to `(unset)` — the guard's own inability to determine a target was itself confirmable,
protected only incidentally by `project-utils`' downstream zod validation, not by the guard.

**Fix (Minimum, per the reviewer's own offered action)**: `assertConfirmedTarget` now rejects any
`confirmed` value starting with `"("` unconditionally, before comparing it to the resolved host.
TDD'd (`012-backfill-report.test.ts`, "refuses a sentinel value as a confirmation").

### Live reproduction

```
$ BACKFILL_CONFIRM="(unset)" \
  node -r ts-node/register/transpile-only -r tsconfig-paths/register -r dotenv/config \
  src/scripts/backfillValid.ts dotenv_config_path=/dev/null
```

```
Error: Refusing to run: BACKFILL_CONFIRM="(unset)" looks like a guard sentinel
("(unset)"/"(unparseable)"), not a real target name — it cannot confirm a target that could not be
determined.
```

## Disposition

Both closed at the reviewer's stated Minimum action, per the owner's explicit ruling not to upgrade
M6 to the Preferred. Not done (by ruling, not oversight): deriving the guarded host from `pg`'s own
parser via `project-utils` — routed to the post-refresh review pass as steering specified. `pg`'s
environment-variable fallbacks (`PGHOST` and friends) and `service=` file lookups remain untested,
as the reviewer's own enumeration already disclosed; this Minimum fix does not close that residual
either (it only rejects `host=`/`port=` query parameters, the two forms the reviewer demonstrated
diverging) — named here so it is not mistaken for closed. `/tmp/012-m6-report` deleted after the
run.
