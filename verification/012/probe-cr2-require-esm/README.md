# CR round 2 — independent verification of H1's closure (alias + ts-node/ESM)

**Built by**: code-reviewer, 2026-08-23, re-review of website `681c353` (project-utils `749606d`).
**Claim under test** (implementer, `agent-output/verification/012/probe-fix-round-h1-h2/README.md`):
`npm run backfill-valid` now executes as far as database connectivity, and a *second* blocker —
ts-node's vendored CJS loader rejecting `require()` of `~/env.mjs` — was found and closed by
extracting env-independent constants into `src/constants/messageLimits.ts`.

**Process whose output is the evidence**: the shipped `backfill-valid` script itself, driven by the
shipped npm script. Nothing here is a re-implementation of it. Round 1's instrument
(`../probe-alias-resolution/`) is *not* reused: the question changed (from "does the alias resolve"
to "is the transitive graph loadable"), and an instrument's validity is indexed to the claim it was
built for.

## Run A — shipped command verbatim (`run-shipped-command-typecheck.txt`)

    DATABASE_URL=postgresql://nobody:nobody@127.0.0.1:1/nonexistent npm run backfill-valid
    -> exit 1, TSError: 3 x TS2345/TS2769 "'valid' does not exist"

The declared, pin-gated expected-RED state, unchanged by this round. This run reaches ts-node's
type-check and stops there, so it carries **no** information about runtime module resolution —
recorded so the next reader does not mistake it for one.

## Run B — `--transpile-only`, simulating the post-pin-refresh state
(`run-transpile-only-reaches-econnrefused.txt`)

    -> exit 1
       {  "rowsClassifiedThisRun": 0, ... "tableWideRowCount": -1, "interrupted": true }
       Error: connect ECONNREFUSED 127.0.0.1:1
           at async runBackfill (src/scripts/backfillValid.ts:132:19)
           at async main (src/scripts/backfillValid.ts:170:5)

**H1 closed, independently.** Execution reaches `pg-pool`'s connect. `getPostgres()` builds its
pool lazily (`project-utils/src/postgres.ts`), and the failing import in round 1 preceded it, so
this is a real advance past both blockers, not a masked one. The same run also exercised H2's new
error path end to end (persistence, `interrupted: true`, `tableWideRowCount: -1`, `exitCode` 1).

## Run C — the second blocker, reproduced from first principles, with two controls

Two throwaway files under `website/src/scripts/` (run, then removed; never committed):

| leg | module imported | result |
|---|---|---|
| SUBJECT | `~/constants` (the barrel) | `Error [ERR_REQUIRE_ESM]: Must use import to load ES Module: .../src/env.mjs`, thrown from ts-node's `dist-raw/node-internal-errors.js`, `at Object.<anonymous> (.../src/constants/index.ts:3:1)` |
| CONTROL 1 | `~/constants/messageLimits` (the extracted leaf) | `CONTROL_OK leaf loaded, MAX_NAME_LENGTH=80` |
| CONTROL 2 | plain `node -e "require('.../src/env.mjs')"` | loads; reaches env.mjs's **own** zod validation |

Control 1 discriminates: the failure is specific to the env-bearing barrel, not to alias
resolution generally. Control 2 discriminates: the installed Node (v24.14.0) *does* support
`require(esm)`; ts-node 10.9.1's **vendored** loader is what refuses. The implementer's diagnosis
is correct in both directions, and the constants split is a justified fix rather than churn.

## Run D — the widened fix does not regress the other two entry points

`-r tsconfig-paths/register` was added to all three ts-node scripts, not only `backfill-valid`.
A throwaway probe under `website/lang/` importing only relative and node_modules specifiers ran
clean under the register (`LANG_PROBE_OK relative-resolve fine`). **Not run**: `push-commands`
(`bot/scripts/publishAppCommands.ts`) — it PUTs application commands to Discord, an outbound
side effect no agent here may cause. That entry point's behaviour under the register is
**unverified by execution**; it uses no `~/` alias (`grep -c "from '~/"` = 0) and no env.mjs, so
the register is expected to be inert for it, but that expectation is stated, not measured, and it
is the owner's to close if he wants it closed.

## Enumerations re-run this round (hit counts, and what each predicate cannot see)

| # | predicate | hits | blind to |
|---|---|---|---|
| E1 | `grep -rc "env\.mjs"` over `*.ts,*.tsx,*.js,*.mjs` | 27 files | an extensionless `~/env` re-export, or a dynamic `import()` built from a variable |
| E1b | `grep -rc "~/env"` (broader) | 27 files | same count — no extensionless form exists |
| E2 | `grep -rn "IS_COMPONENTS_V2_FLAG"` in non-test source | 11 lines / 6 files | a flag written as a numeric literal `32768` or `1 << 15` without the symbol |
| E3 | `grep -rn "setMessageMode"` | 6 (3 call sites, 1 decl, 1 hook, 1 type) | a destructured alias (`const { setMessageMode: f } = …`) or bracket access |
| E5 | `git show 681c353:src/constants/index.ts \| grep -c '^export'` | 30 lines | re-exports added via `export *` from a third module |
| E-alias | `grep -c "from '~/"` per ts-node entry | lang 0, push-commands 0, backfillValid 3 | alias use inside a transitively imported module (checked separately via E1) |

E2 confirms round 1's result unchanged: exactly one *setter* of the flag in non-test source
(`src/utils/index.ts`, `stripKeys`, guarded on structural V2) and one *clearer*
(`src/utils/messageMode.ts`, `switchToClassic`). E3 confirms round 1's assumption-2 closure.
