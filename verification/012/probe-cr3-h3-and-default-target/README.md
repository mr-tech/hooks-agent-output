# Code review round 3 — captured instruments

Tree under verification: website `eb28ae6`, project-utils `749606d`, agent-output `db44632`.
Backs `agent-output/code-review/012-message-valid-field-code-review.md` (round 3).

Every number the round-3 verdict cites is produced by something in this directory. Nothing here
was authored by the implementer; where a claim of theirs is confirmed, it is re-derived.

## 1. H3 — leg 1, the verification the round-2 review named for return

Round 2 said: *"drive the shipped command against a dead `DATABASE_URL` and show the report
persisted **and** printed with the connection failure named."*

**1a. Shipped `npm run backfill-valid`, verbatim** → `run-leg1-shipped-npm-script-TSError.txt`.
Result: `TSError`, 3 diagnostics (2345/2769/2345), **no module execution, no connection attempt,
no report**. This is the held stale pin, not a fix-round defect — it carries no runtime
information, and is recorded because it is also the evidence for finding M4 below.

**1b. Same module, `--transpile-only`** (the runtime the implementer used) →
`run-leg1-transpileonly-econnrefused.txt`, report at `observed-leg1-report.json`.
Command: `DATABASE_URL="postgresql://x:x@127.0.0.1:1/x" node -r ts-node/register/transpile-only -r
tsconfig-paths/register -r dotenv/config src/scripts/backfillValid.ts dotenv_config_path=.env.local`

Oracle, fixed before the run: the report must appear on **both** channels, and the connection
failure must be **named** rather than swallowed. Observed — stdout carried the report
(`tableWideRowCount: -1`, `interrupted: true`, plus `runId`/`startedAt`/`endedAt`), stderr carried
`Error: connect ECONNREFUSED 127.0.0.1:1` with `errno: -111` and the `runBackfill`/`main` frames,
exit 1. The persisted file was compared to stdout with `diff` and is **byte-identical**.

**Disclosure.** The shipped `reportPath` is a fixed `resolve()` with no override, so this drive
necessarily wrote into the owner's gate directory: `verification/012/backfill-report-1787475923901-y27oe6.md`. <!-- check-repo:ignore — names a path that is absent on purpose: the text says the file was captured elsewhere and deleted (project cleanup 2026-11-10) -->
It was captured here as `observed-leg1-report.json` and deleted; the directory listing was diffed
against a baseline taken before the run and is restored. This is the **third consecutive round** in
which an agent had to write a fake report into the gate directory to verify the script — the cost
recorded in finding L8.

## 2. H3 — the residual I hypothesised, and its refutation

Round 2's H3 named two loss members: the unguarded `await`, and the persist-before-print ordering.
The fix guards the `await` on both paths (structural — confirmed by reading: `emit` is the only
exit, `grep -c "emit(" src/scripts/backfillValid.ts` → 2 = one definition, one call site). The
ordering was **inverted**, not eliminated: stdout now precedes the disk write.

Hypothesis under test: *if the stdout channel fails, the durable channel is lost* — which would be
round 1's H2 protection running backwards.

- `q1-subject.ts` — shipped `emit()` at `eb28ae6`, 247KB payload (> the 64KB pipe buffer), oracle
  = existence and size of the report **on disk**, reported on fd 2 so the failing stdout cannot
  hide the answer.
- `q1-control-persistfirst.ts` — discriminating control: identical, durable write attempted first.

| Run | stdout | report on disk | transcript |
|---|---|---|---|
| Positive control | a file (healthy) | **yes**, 247358 B | `run-ordering-positive-control.txt` |
| **Subject** | pipe, reader exits after 1 byte | **yes**, 247358 B | `run-ordering-subject-brokenpipe.txt` |
| Persist-first control | same broken pipe | yes, 247303 B | `run-ordering-persistfirst-control.txt` |

**The hypothesis is refuted.** `process.stdout.write` to a pipe on Linux is asynchronous: EPIPE
surfaces as a later `uncaughtException`, after `persistReport` has already run. The subject
persisted the full report. The ordering inversion costs nothing, and H3 is closed on both members.

Residual observed, not a defect (recorded as INFO-1): under a broken stdout pipe a *successful*
run still exits non-zero with an EPIPE stack, because the async error arrives after
`process.exitCode = 0`. The durable report is already on disk and says `interrupted: false`, which
discriminates it from a real failure.

## 3. M1-r2 — do the provenance stamps actually reach the persisted body?

`q2-provenance.ts` → `run-provenance.txt`. Calls the shipped `emit()` with sentinel values and
reads back the **persisted file**, not stdout.

Observed keys: `…,tableWideRowCount,interrupted,runId,startedAt,endedAt`, values
`RUNID-SENTINEL / STARTED-SENTINEL / ENDED-SENTINEL`. **The claim holds at runtime.**

It holds by nothing checkable, which is finding L7: `formatReport`'s `meta` parameter is typed
`{ tableWideRowCount: number, interrupted?: boolean }` and does not declare the three stamps —
they survive only because TypeScript does not excess-property-check spread properties — and
`grep -rn "runId\|startedAt\|endedAt"` over the spec returns **0**.

## 4. The default target — safety gate, and finding M4's evidence

`env-guard.ts` prints host and port only, never credentials, **after** `dotenv/config` has loaded
`.env.local` — so it reports the URL the shipped command would actually use.

| Invocation | resolved host:port |
|---|---|
| With `DATABASE_URL` set to the dead one | `127.0.0.1:1` |
| **With no override — the shipped default** | **`viaduct.proxy.rlwy.net:12394`** |

`.env.local` points at a live remote production database, and `dotenv` does not override an
existing environment variable, which is why the override in §1b is sound. Guard enumeration on the
shipped script: `grep -n "process\.argv\|NODE_ENV\|confirm\|dry\|readline\|prompt"` → **0 hits**.

`run-typecheck-8-errors.txt` — all 8 `tsc --noEmit` errors name the `valid` column as absent from
the pinned generated types; `project-utils` at `749606d` declares `valid: boolean | null`. So the
compile failure in §1a — today the only thing stopping `npm run backfill-valid` from reaching
production unguarded — is cleared by the pin refresh. See finding M4.

## Reproduction

The three `.ts` probes import the shipped module by alias and must run from the `website` root
under `ts-node --transpile-only -r tsconfig-paths/register`. An entry point outside the project
fails to resolve `~/*` (ts-node scope), which is a property of the harness, not of the subject.
