# Probe: does `process.exit(0)` truncate the backfill's report on a pipe?

**Chain**: 012 — `valid` field on stored messages
**Built by**: code-reviewer, 2026-08-23
**Tree under test**: `website` @ `bc5ee2b`

## Claim under test

`src/scripts/backfillValid.ts`, `main()`, ends:

    process.stdout.write(`${JSON.stringify({...report, nullRemainingAtCompletion}, null, 2)}\n`);
    process.exit(0);

That report is the M6-b gate artifact — the distribution the owner reviews
before declaring the field live (D6). On POSIX, Node's `process.stdout` is
**asynchronous when it is a pipe** and synchronous to a file or TTY, so
`process.exit()` immediately after a large write can drop what is still
buffered.

## Instrument

`exit-truncation.js` reproduces the same two-line tail with a payload sized by
argv, writing the intended byte count to stderr and the payload to stdout.
Three axes: payload size x destination (pipe / file) x with-or-without
`process.exit(0)` (the causation control).

    node exit-truncation.js <bytes> | cat | wc -c      # pipe
    node exit-truncation.js <bytes> > out.json         # file

## Results — measured 2026-08-23, node as installed in this environment

| payload (intended bytes) | destination | with `process.exit(0)` | received |
|---|---|---|---|
| 10,941 | pipe | yes | 10,941 — intact |
| 109,125 | pipe | yes | **65,536 — truncated (40% lost)** |
| 1,090,941 | pipe | yes | **65,536 — truncated (94% lost)** |
| 109,125 | file | yes | 109,125 — intact |
| 1,090,941 | file | yes | 1,090,941 — intact |
| 1,090,941 | pipe | **no** (control) | 1,090,941 — intact |

## Verdict

Truncation is real, the cut is exactly the 65,536-byte Linux pipe buffer, and
the no-exit control isolates `process.exit(0)` as the cause rather than payload
size or Node's pipe handling.

**Boundary, stated precisely so the finding is not overclaimed**: a report
redirected to a file (`> report.json`) or read off a TTY is safe at any size.
Only a pipe (`| tee report.json`, `| jq`, `| less`) loses data, and only above
~64KB.

## Why the threshold matters here

The report is ~300 bytes plus its row-id arrays (`whitespaceContent.rowIds`,
`evaluationFailures.rowIds`), roughly 12-20 bytes per id under `JSON.stringify(_, null, 2)`.
A boring distribution — the expected case — stays far under 64KB and prints
fine. Passing 64KB takes several thousand row ids in those categories, which is
exactly the mass-anomaly case risk R2 exists to detect. **The failure mode is
selective for the scenario the gate was built to catch.**
