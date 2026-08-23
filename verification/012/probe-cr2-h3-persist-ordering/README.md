# CR round 2 — H3: unguarded loss points on the backfill's success path

**Built by**: code-reviewer, 2026-08-23, re-review of website `681c353`.

H2 (round 1) named the class: *the M6-b report is single-shot, unregeneratable gate evidence with
loss paths*. The fix round closed three of them (truncation via `process.exit`, no persistence,
mislabelled accumulated count). This records the members that survive, and separates what was
**executed** from what was **read**.

## Static disposition of every throw site in `main()` (`src/scripts/backfillValid.ts`)

Established by reading the control flow — which is what reading soundly establishes. Symbols, not
bare lines; line numbers are as at `681c353`.

| site | in a path that persists the report? | consequence if it throws |
|---|---|---|
| `getPostgres()` (166) | outside `try` | rejection via `void main()`; nothing accumulated yet — benign |
| `await runBackfill(…)` (170) | inside `try` | caught; partial report persisted with `interrupted: true` — **guarded** |
| `await tableWideRowCount(database).catch(() => -1)` (173) | inside `catch`, guarded | falls back to `-1` — **guarded** |
| `persistReport(content, REPORT_PATH)` (176) | inside `catch` | throws out of `catch`; masks the original error; no stdout write follows — **loss** |
| `await database.destroy()` (180) | inside `catch`, after persist | report already on disk — benign |
| **`await tableWideRowCount(database)` (184)** | **unguarded, before any persistence** | **the whole run's classification is discarded — loss** |
| **`persistReport(content, REPORT_PATH)` (185)** | **precedes the stdout write at 186** | **both evidence channels lost at once — loss** |

The asymmetry is the finding: the identical `tableWideRowCount` call is `.catch(() => -1)`-guarded
on the error path (173) and unguarded on the success path (184). `void main()` (192) still carries
no `.catch()`, so either loss surfaces as an unhandled rejection rather than as a handled failure.

After site 184 or 185 fires, the evidence is not merely lost but **unregeneratable by anything that
exists**: the rows are already written non-NULL, so a re-run's `WHERE valid IS NULL` selects
nothing and reports `rowsClassifiedThisRun: 0`.

## Executed premise — `persistReport` does throw (`persist-throws.ts`)

The table's rows for sites 176 and 185 rest on `persistReport` being able to throw. That premise is
**executed**, against the shipped export (`import { persistReport } from '~/scripts/backfillValid'`
— shipped code, not a copy), with a positive control:

    CONTROL: wrote -> {"control":true}                    (writable target — helper works)
    SUBJECT: persistReport THREW -> EACCES: permission denied, open '.../locked/report.md'

Run from inside `website/src/scripts/` under `ts-node --transpile-only -r tsconfig-paths/register`,
against a temp directory the probe creates and removes. Nothing in the repo was chmod'd.

## Not executed, and why

Sites 184/185 firing *on the success path* needs `runBackfill` to complete and the subsequent
`COUNT(*)` to fail. No database is reachable in this environment and the backfill is owner-executed,
so that sequence could not be driven. Building a stand-in `main()` would produce a model of the
control flow, not a probe of it, and is not offered as one. **The ordering finding is established by
reading; only its premise is executed.**
