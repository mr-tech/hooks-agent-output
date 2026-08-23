# Fix round verification: H1 (alias resolution + ESM interop) and H2 (report persistence)

**Chain**: 012 — `valid` field on stored messages
**Built by**: implementer, 2026-08-23, fix round against code-review verdict REJECTED
(`agent-output/code-review/012-message-valid-field-code-review.md`, `24b8af1`)

## H1 — sequence of fixes and the evidence at each step

The reviewer's own probe (`../probe-alias-resolution/README.md`) stopped at the alias-resolution
failure and explicitly did not attempt to get past it. Driving the fix past that point surfaced a
second, independent blocker before reaching connectivity — recorded here in full rather than
smoothed over, per this chain's class-sweep discipline.

### Step 1 — add `tsconfig-paths`, register it on all three `ts-node` scripts

`package.json`: `tsconfig-paths` added as a devDependency; `-r tsconfig-paths/register` added to
`lang`, `push-commands`, `backfill-valid` (all three entry points, not just the one the reviewer
named — the structural fix, so any future `~/` import in any of them is unaffected by this class).

Driving the shipped command immediately after this step alone:

    DATABASE_URL=<dead> npx ts-node --transpile-only -r tsconfig-paths/register -r dotenv/config \
      src/scripts/backfillValid.ts

    -> exit 1
       Error [ERR_REQUIRE_ESM]: Must use import to load ES Module: .../src/env.mjs
       require() of ES modules is not supported.
       ...
       at Object.<anonymous> (.../src/constants/index.ts:3:1)

**Not the reviewer's H1 finding reproducing** — the alias resolved (the stack trace is now three
frames deeper, inside `src/constants/index.ts`, not at `backfillValid.ts`'s own import line). A
new, independent failure: `~/constants/index.ts` imports `~/env.mjs` (an ES module, `.mjs`) for a
side effect (`env.NEXT_PUBLIC_DISCORD_CLIENT_ID`, used only by `INVITE_URL`) unrelated to the two
literal constants (`IS_COMPONENTS_V2_FLAG`, `V2_COMPONENT_TYPE_VALUES`) the backfill actually
needs. `ts-node@10.9.1` vendors its own copy of Node's CJS loader internals
(`dist-raw/node-internal-modules-cjs-loader.js`) that rejects `require()` of an ES module
unconditionally — confirmed independent of the installed Node runtime's own capability:

    $ node -e "require('./src/env.mjs')"
    -> reaches env.mjs's OWN zod validation (❌ Invalid environment variables: DATABASE_URL
       Required, ...) — i.e. plain Node's require() DOES load the .mjs file; ts-node's vendored
       loader is what blocks it, not Node.

**Class**: any `ts-node` script that transitively imports `~/constants` hits this, present or
future — reproducible against the reviewer's own minimal probe subject
(`../probe-alias-resolution/subject.ts`, `import { IS_COMPONENTS_V2_FLAG } from '~/constants'`),
which resolves through the identical chain (`~/constants/index.ts` → `~/env.mjs`).

### Step 2 — split the env-independent constants out of `~/constants/index.ts`

New file `src/constants/messageLimits.ts` carries the eleven literal constants
`~/utils/limits.tsx` needs (character limits, `V2_COMPONENT_TYPE_VALUES`,
`IS_COMPONENTS_V2_FLAG`) — no import of `~/env.mjs` or `~/utils/getBaseUrl`. `~/constants/index.ts`
re-exports them (`export * from './messageLimits'`) so every existing barrel consumer is
unaffected; `~/utils/limits.tsx`, `~/utils/messageMode.ts` and `~/scripts/backfillValid.ts` import
directly from `~/constants/messageLimits`, so the predicate's whole transitive graph never reaches
`env.mjs`. Mirrors this chain's own established pattern (M3-a: `~/utils/limits` imported directly,
not the `~/utils` barrel, for the identical reason — node-safety under a non-Next runtime).

**Residual, stated rather than silently closed**: this fixes the class for the two constants this
chain's code needs. A hypothetical future `ts-node` script needing an env-*dependent* export of
`~/constants` (e.g. `INVITE_URL`) would still hit this ts-node/ESM limitation — that is a
pre-existing tooling gap (ts-node 10.x predates Node's `require(esm)` stabilization), not
introduced or fully closed by this chain, and is out of this milestone's scope to resolve generally.

### Step 3 — drive the shipped command again, simulating the post-pin-refresh state

    DATABASE_URL=postgresql://nobody:nobody@127.0.0.1:1/nonexistent \
      npx ts-node --transpile-only -r tsconfig-paths/register -r dotenv/config \
      src/scripts/backfillValid.ts dotenv_config_path=.env.local

    -> exit 1
       Error: connect ECONNREFUSED 127.0.0.1:1
           at .../pg-pool/index.js:45:11
           at async PostgresDriver.acquireConnection (.../kysely/.../postgres-driver.js:21:24)
           ...
           at async runBackfill (src/scripts/backfillValid.ts:132:19)
           at async main (src/scripts/backfillValid.ts:170:5)
         errno: -111, code: 'ECONNREFUSED', address: '127.0.0.1', port: 1

**H1 closed.** Module resolution and the env/ESM load are both clear; the failure is now purely
database connectivity, exactly the state the reviewer's required verification names. `--transpile-only`
continues to simulate the post-pin-refresh state (the expected-RED typecheck is a separate, already-
disclosed condition — see Step 4).

### Step 4 — the un-simulated command still shows the expected-RED typecheck (not a new finding)

    DATABASE_URL=postgresql://nobody:nobody@127.0.0.1:1/nonexistent npm run backfill-valid
    -> exit 1, TSError: 4 x TS2345/TS2769 "'valid' does not exist" (stale project-utils pin)

Identical in shape to the reviewer's own Run 3 first attempt — confirms the expected-RED state is
unchanged by this fix round and remains pin-gated, not touched here.

## H2 — persistence and partial-run behaviour, demonstrated by the same drive

Step 3's run (interrupted by the dead-DB connection failure, mid-`runBackfill`) exercised the new
error path end to end:

- stdout printed the accumulated (empty, since no batch was read) report **and** a `console.error`
  of the underlying `ECONNREFUSED` error;
- the report was **persisted to disk** at
  `agent-output/verification/012/backfill-report.md` — verified present immediately after the run,
  then deleted (it is a dead-DB test artifact, not real backfill evidence, and leaving it in place
  would misrepresent a fake, all-zero, `interrupted: true` report as if a real run had produced it);
- the persisted/printed content carried `"interrupted": true` and `"tableWideRowCount": -1` (the
  second query, a table-wide count taken for the coverage label, also failed against the dead DB —
  handled with its own `.catch(() => -1)` rather than losing the interrupted report entirely);
- `process.exitCode = 1` (not `process.exit(1)`) — the process still drained its output naturally,
  and the buffer-truncation mechanism the reviewer measured in `../probe-report-truncation/` (only
  triggered by `process.exit()` on a piped stream) cannot fire here because `process.exit()` is no
  longer called anywhere in `main`.

Pure-unit coverage for the parts that do not need a database — `formatReport`'s coverage labelling
(`rowsClassifiedThisRun` vs `tableWideRowCount`, `interrupted` flag) and `persistReport`'s directory
creation and write — is in `website/src/scripts/__tests__/012-backfill-report.test.ts`.

## M1 — the flag/structure-disagreement category, closed structurally

Every breakout category (`flagStructureDisagreement`, `flagStructureDisagreementValidTrue`,
`whitespaceContent`, `evaluationFailures`) is now the same shape, `{ count, rowIds }` — the type
itself makes an id-less category unrepresentable (the reviewer's Preferred fix, not the Minimum).
The previously-invisible sub-class (`flagStructureDisagreement && valid === true`) is now its own
named category with ids, tested in `012-backfill-report.test.ts`.
