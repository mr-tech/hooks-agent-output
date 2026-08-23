# Code review round 4 — adversarial execution against the M4 guard

Tree under verification: website `ff753a6`, project-utils `749606d`, agent-output `0fc444f`.
Backs `agent-output/code-review/012-message-valid-field-code-review.md` (round 4).

The subject is a **guard on an irreversible production action**, so it is re-attacked from first
principles rather than read and agreed with. Nothing here is inherited from the implementer's
transcript; where a leg of theirs is confirmed, it is re-derived.

## Oracle, fixed before any run

For every case that MUST refuse, all three must hold — the negative is asserted on **every**
side-effect surface, not just the exit status:

1. the refusal message is present;
2. **no connection attempt of any kind** appears in the trace
   (`ECONNREFUSED|ENOTFOUND|ETIMEDOUT|EAI_AGAIN|getaddrinfo`);
3. **no file is created** on the report surface.

For the case that MUST proceed, the guard must not over-block: execution reaches the connection.

## Input class enumerated (`attack.sh` → `run-attack-sweep.txt`)

Driven through the shipped entry point, not through the exported predicate.

| # | Case | exit | refused | connection attempt | report files |
|---|---|---|---|---|---|
| 1 | dead URL, no confirmation | 1 | yes | **no** | 0 |
| 2 | `BACKFILL_CONFIRM=` (empty string) | 1 | yes | **no** | 0 |
| 3 | near-miss — right host, wrong port | 1 | yes | **no** | 0 |
| 4 | near-miss — wrong host, right port | 1 | yes | **no** | 0 |
| 5 | whitespace-padded confirmation | 1 | yes | **no** | 0 |
| 6 | host case variation (`LocalHost`) | 1 | no — **matched** | yes | 1 |
| 7 | trailing-dot host | 1 | yes | **no** | 0 |
| 8 | **correct confirmation** (must proceed) | 1 | no | yes | 1 |
| 9 | unset URL + `BACKFILL_CONFIRM='(unset)'` | 1 | no — **sentinel accepted** | no | 0 |
| 10 | junk URL + `BACKFILL_CONFIRM='(unparseable)'` | 1 | no — **sentinel accepted** | no | 0 |
| 11 | **`?host=` override** | 1 | no | yes — **to a host never confirmed** | 1 |

Cases 1–5 and 7 satisfy the oracle on all three surfaces. Case 8 shows the guard does not
over-block. **Case 6 is not a bypass**: `postgresql:` is a non-special scheme, so WHATWG `URL`
preserves host case rather than lowercasing it, and the confirmation genuinely matched what was
resolved. My original case design assumed lowercasing; the assumption was wrong, and the guard is
merely case-sensitive where DNS is not — which is fail-closed, not a defect.

Cases 9 and 10 are finding **L10**: a sentinel meaning *"I could not determine the target"* is
accepted as a confirmation. No connection follows today only because `project-utils`' zod env
validation rejects both downstream — the guard itself does not fail closed here.

Case 11 is finding **M6**, below.

## The parser differential (`parser-differential.js` → `run-parser-differential.txt`)

The guard decides the target with WHATWG `new URL()`. The connection is made by `pg`'s own
parser, via `getPostgres()` → `new Pool({ connectionString })` → `Client`. Two different parsers
answering the same question. The probe asks the object that **actually connects** what host it
would use, resolving `pg` through the same path the script does:

```
  agree  plain              guard="db.example.com:5432"  connects="db.example.com:5432"
DIVERGE  HOST QUERY PARAM   guard="decoy.invalid:5432"   connects="viaduct.proxy.rlwy.net:5432"
DIVERGE  host+port params   guard="decoy.invalid:1"      connects="viaduct.proxy.rlwy.net:1"
  agree  no explicit port   guard="db.example.com:5432"  connects="db.example.com:5432"
  agree  unencoded pw @     guard="db.example.com:5432"  connects="db.example.com:5432"
```

`?host=` is a supported libpq/`pg` connection-string form. It overrides the authority hostname for
the connector and is invisible to the guard. Sweep case 11 drives this end-to-end through the
shipped entry point with the override pointed at `127.0.0.1` so nothing production is touched: the
guard is satisfied by `BACKFILL_CONFIRM="decoy.invalid:1"` and the process then connects to
`127.0.0.1:1`. **The operator confirms one host and the script mutates another.**

**Latent, not live**: the real `.env.local` URL carries no query string — checked by printing
`u.search.length` and the parameter-name list only, never credentials.

## Leg 3 — the production-host refusal, decomposed (`leg3-safe.ts`)

Driving `main()` against live production credentials to prove a guard works is a test whose
failure mode **is** the harm it tests for: if the guard were broken, the backfill would run against
production and consume the owner's single-shot M6-b gate. So the predicate is exercised directly
with the real resolved host string, and the **ordering** — that the guard precedes any connection —
is established separately by sweep cases 1–5 and 7, where a broken guard costs nothing. Together
these are not weaker than the live drive.

```
resolved real target = viaduct.proxy.rlwy.net:12394
  no confirmation (a bare invocation): REFUSED
  confirmation for a different host:   REFUSED
  exact confirmation:                  ALLOWED (guard must not over-block)
```

Ordering re-read at the reviewed SHA: `resolveTargetHost` and `assertConfirmedTarget` are
statements 1 and 2 of `main()`; `getPostgres()` is statement 3.

## L8 — verified by use, not by reading

Every drive above set `BACKFILL_REPORT_DIR`, and cases 6, 8 and 11 wrote their reports there.
The gate directory was listed afterwards and contains **no** stray report. This is the first of
four rounds in which a reviewer's drives left nothing to clean up at the owner's gate path.
