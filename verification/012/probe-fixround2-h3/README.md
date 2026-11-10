# H3 fix verification — round 2, gate evidence on the success path is no longer discardable

Backs: code review round 2 (`66ddcf6`), H3 required action, verification the reviewer named
explicitly for return: "drive the shipped command against a dead `DATABASE_URL` and show the
report persisted and printed with the connection failure named — and separately show that a
failure of the report writer does not swallow the connection error. Both are reachable with no
database."

## Fix

`backfillValid.ts`'s `main()` previously fetched `tableWideRowCount` unguarded on the success path
(guarded with `.catch(() => -1)` only on the error path three lines above), and called
`persistReport` before `process.stdout.write`, so a throw at either site lost the whole run's
classification evidence on both channels at once. `void main()` had no `.catch()`.

The fix introduces a single exit function, `emit(report, database, filePath, extra)`, used by
`main()` on **both** the success and interrupted paths — eliminating the asymmetry structurally
rather than patching one branch:

- fetches `tableWideRowCount` with the same `.catch(() => -1)` guard on every call, not one of two;
- writes stdout **before** attempting to persist, so a persist failure cannot also cost the
  already-printed evidence;
- wraps `persistReport` in its own try/catch so a write failure is logged and does not propagate
  out of `emit` (which would otherwise skip `database.destroy()` and surface only as an unhandled
  rejection);
- `void main().catch(...)` now exists, so any residual throw is a handled failure that names what
  was lost rather than an unhandled rejection.

## Run 1 — dead DATABASE_URL, shipped command, transpile-only (mirrors H1's closure runtime)

```
$ DATABASE_URL="postgresql://postgres:pw@127.0.0.1:1/db" \
  node -r ts-node/register/transpile-only -r tsconfig-paths/register -r dotenv/config \
  src/scripts/backfillValid.ts dotenv_config_path=.env.local
```

stdout (the classification report, printed before the disk write):

```json
{
  "rowsClassifiedThisRun": 0,
  "trueCount": 0,
  "falseCount": 0,
  "perCheckFailureCounts": {},
  "flagStructureDisagreement": { "count": 0, "rowIds": [] },
  "flagStructureDisagreementValidTrue": { "count": 0, "rowIds": [] },
  "whitespaceContent": { "count": 0, "rowIds": [] },
  "evaluationFailures": { "count": 0, "rowIds": [] },
  "tableWideRowCount": -1,
  "interrupted": true
}
```

followed by the named connection failure:

```
Error: connect ECONNREFUSED 127.0.0.1:1
    ...
    at async runBackfill (/usr/local/bin/hooks/website/src/scripts/backfillValid.ts:132:19)
    at async main (/usr/local/bin/hooks/website/src/scripts/backfillValid.ts:187:5) {
  errno: -111, code: 'ECONNREFUSED', syscall: 'connect', address: '127.0.0.1', port: 1
}
```

**Persisted**: `agent-output/verification/012/backfill-report.md` was written with the identical <!-- check-repo:ignore — names a path that is absent on purpose: the text says the file was read and then deleted (project cleanup 2026-11-10) -->
content (verified via `cat` before deletion). Copied here as
`observed-interrupted-report.json` and deleted from the gate's own path immediately — the same
disclosed-and-removed pattern the implementer's round-1 drive and the reviewer's own round-2 drive
both used (M1-r2's own evidence). Both the persisted and printed channels carried the same
`tableWideRowCount: -1, interrupted: true` evidence, satisfying the "persisted and printed" half of
the required verification.

## Run 2 — persist failure does not swallow the connection error

The shipped `REPORT_PATH` is a fixed `resolve()` call, not parameterised (that is M1-r2, not yet
addressed), so this leg calls the exported `emit()` directly with an unwritable target — the same
technique `012-backfill-report.test.ts`'s new unit tests use, run here outside the test harness for
an end-to-end demonstration matching the reviewer's own instrument shape.

```
$ node -r ts-node/register/transpile-only -r tsconfig-paths/register /tmp/012-h3-persist-fail-probe.ts
```

(script: called `emit(emptyReport(), fakeDbThatRejectsTheCount, '/tmp/012-h3-notadir/nested/backfill-report.md', { interrupted: true })`,
where `/tmp/012-h3-notadir` is a plain file, not a directory)

Output: the classification report printed to stdout first (`tableWideRowCount: -1`, guarded
against the fake DB's rejection), **then** `persistReport`'s `ENOTDIR` logged via `console.error`,
**then** `emit()` returned without throwing — confirmed by the script's own trailing log line
executing. The persist failure was caught inside `emit`, logged, and did not swallow or replace the
already-printed report.

## Disposition

Both legs the reviewer named are reachable with no database, as they said. Both pass. The probe
script (`/tmp/012-h3-persist-fail-probe.ts`) and its target directory were deleted after the run;
nothing under this path was left in `/tmp`.

## M1-r2 (strongly recommended, addressed in the same round)

`persistReport` now writes with the `wx` flag (create-exclusive), so writing to an already-existing
path throws `EEXIST` rather than silently overwriting — TDD'd in `012-backfill-report.test.ts`
("refuses to overwrite an existing report"). Because `REPORT_PATH` was a single constant filename,
that alone would have made every run after the first throw on persist. Fixed by a new exported
`reportPath(runId)` that derives `agent-output/verification/012/backfill-report-<runId>.md`, so
each run gets its own file — refusal now protects a rehearsal from clobbering a prior run's gate
evidence rather than blocking the next legitimate run. `main()` generates a `runId` and
`startedAt`/`endedAt` ISO timestamps and stamps them into the report via `emit`'s `extra` parameter
(no format change to `formatReport`; the fields just flow through the existing spread).

Re-ran the dead-DB drive above with the new code: the persisted file was named
`backfill-report-1787475350856-icto46.md` (not the old constant name), and the report body carried
`"runId": "1787475350856-icto46", "startedAt": "2026-08-23T08:55:50.856Z", "endedAt":
"2026-08-23T08:55:50.865Z"` alongside the same `tableWideRowCount: -1, interrupted: true` evidence.
Deleted after capture, same disclosed-and-removed pattern as above.

**Not done this round (Preferred, out of proportional scope for a strongly-recommended item)**:
taking the destination out of source entirely (argv/env override) and stamping database host
identity. The operator still redirects the artifact into `agent-output/verification/012/` by hand;
the path is no longer overwrite-unsafe, but it is not yet externally configurable. Left as an
on-next-touch note alongside the L6 residual.
