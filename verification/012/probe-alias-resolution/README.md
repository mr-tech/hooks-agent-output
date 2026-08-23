# Probe: does `ts-node` resolve the `~/*` tsconfig path alias?

**Chain**: 012 — `valid` field on stored messages
**Built by**: code-reviewer, 2026-08-23
**Tree under test**: `website` @ `bc5ee2b` (chain/012-message-valid-field)

## Claim under test

`package.json` gains a script:

    "backfill-valid": "ts-node -r dotenv/config src/scripts/backfillValid.ts dotenv_config_path=.env.local"

`src/scripts/backfillValid.ts` imports three modules through the `~/*` alias
(`~/server/api/utils/messageValidity`, `~/constants`, `~/utils/limits`).
`tsconfig.json` maps `~/* -> ./src/*`, but that mapping is a **compile-time**
mapping; `ts-node` does not apply `paths` at runtime without
`tsconfig-paths/register`, which this repo neither loads nor installs.

## Why a probe and not a read

`backfillValid.ts` cannot be executed here: `.env.local` is present and
`main()` runs on import (`require.main === module`), so running it would
attempt the production backfill — prohibited by this chain's brief and by
plan Assumption 4 (owner-executed). The probe reproduces **only** the module
resolution step, against the same runner, with no database import on the path.

## Files

- `control.ts` — imports a sibling by **relative** path. Positive control:
  proves the runner works and the failure below is not "ts-node is broken".
- `subject.ts` — imports `~/constants`, the same alias form `backfillValid.ts`
  uses. This is the class under test.
- `sibling.ts` — trivial module the control imports.

## Run

From the `website` repo root:

    npx ts-node -r dotenv/config <path>/control.ts    # expect: exit 0
    npx ts-node -r dotenv/config <path>/subject.ts    # expect: ?

## Oracle

The control exiting 0 while the subject exits non-zero with a module-not-found
naming `~/constants` establishes that the alias, not the runner, is the defect.

---

## Results — recorded 2026-08-23, `website` @ `bc5ee2b`

### Run 1 — probe from outside the project root (CONFOUNDED, recorded for honesty)

    control.ts  -> exit 0, "CONTROL: sibling-import-resolved"
    subject.ts  -> exit 1, TS2307 "Cannot find module '~/constants'"

**Not decisive.** `agent-output/` sits outside `website/`'s tsconfig `include`,
so TS2307 is consistent with "tsconfig not applied to this file" as well as
with the claim. The confound was eliminated by Run 2, not argued away.

### Run 2 — same probe body, placed in `website/src/scripts/` (the exact directory `backfillValid.ts` occupies)

    npx ts-node -r dotenv/config src/scripts/__probe-cr-alias.ts
    -> exit 1, RUNTIME error (not TS2307):
       Error: Cannot find module '~/constants'
       Require stack: /usr/local/bin/hooks/website/src/scripts/__probe-cr-alias.ts

Temporary file; removed immediately after the run, never committed. The shift
from TS2307 (compile) to `Cannot find module` (Node CJS loader) is the
discriminating observation: ts-node **type-checks** the alias correctly from
tsconfig `paths`, and Node then fails to **resolve** it at runtime.

### Run 3 — the shipped command itself, `DATABASE_URL` forced to a dead port

Safety: `postgresql://nobody:nobody@127.0.0.1:1/nonexistent`; dotenv does not
override an already-set `process.env` key, so `.env.local`'s production URL was
not used. `getPostgres()` builds its pool lazily inside the function
(`project-utils/src/postgres.ts`), and the failing import precedes any call to
it, so no connection is attempted on either path.

    DATABASE_URL=<dead> npm run backfill-valid
    -> exit 1, TSError: 4 x TS2345/TS2769 "'valid' does not exist"

That is the **expected-RED** stale-pin typecheck, and it masks the real defect.
Simulating the post-pin-refresh state:

    DATABASE_URL=<dead> npx ts-node --transpile-only -r dotenv/config \
      src/scripts/backfillValid.ts dotenv_config_path=.env.local
    -> exit 1
       Error: Cannot find module '~/server/api/utils/messageValidity'
       at Object.<anonymous> (.../src/scripts/backfillValid.ts:3:1)

## Verdict

The two failures are **independent**. Clearing the expected-RED typecheck by
pushing `project-utils` and refreshing the pin does **not** clear this one.
`npm run backfill-valid` cannot start a backfill; it dies on its own line 3.

## Class, and why the repo never saw it

`package.json` has three `ts-node` entry points. `lang` and `push-commands`
import only relatively and by package name — 0 `~/` imports each — which is why
this repo has never needed `tsconfig-paths` and does not depend on it.
`backfillValid.ts` is the first, with 3 direct alias imports, and its transitive
graph reaches more (`messageValidity` -> `~/utils/limits` -> `~/constants`), so
relative-ising only the entry file moves the failure one hop down rather than
fixing it.
