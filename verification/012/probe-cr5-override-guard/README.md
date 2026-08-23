# Code review round 5 — the host-override guard, attacked

Tree under verification: website `f983508`, project-utils `749606d`, agent-output `3995eed`.
Backs `agent-output/code-review/012-message-valid-field-code-review.md` (round 5).

**Naming**: "CR-M6" throughout is the *code-review finding* — the guard/connector parser
disagreement. Milestone **M6** in the plan is the backfill/report/live-declaration milestone. They
are different things; the implementer flagged the collision and this directory adopts the prefix.

Measured connector: `pg` 8.11.1, `pg-connection-string` 2.6.1 (`measured-connector-version.txt`).

## Is the ruled Minimum COMPLETE over the class it addresses?

The owner ruled the Minimum and declined the Preferred. A Minimum is normally a partial fix, so
the question worth executing is not "does it stop my round-4 attack" but **"does it stop every
member of the class pg actually honours"**. Answered two independent ways.

### Method 1 — empirical, against the object that connects (`param-class.js` → `run-param-class.txt`)

Nine query-string forms put to both the shipped guard predicate (`hasConnectionOverrideParams`,
copied verbatim) and to a `pg` `Client`, comparing each against a no-params baseline:

| form | guard refuses | connector redirected |
|---|---|---|
| no params (control) | no | no |
| `?host=` | **yes** | yes |
| `?port=` | **yes** | no (see below) |
| `?hostaddr=` | no | **no — not honoured** |
| `?HOST=` / `?Host=` | no | **no — not honoured** |
| `?%68ost=` (percent-encoded) | **yes** | yes |
| `?host=a&host=b` (repeated) | **yes** | yes (last wins) |
| `?host=` (empty value) | **yes** | no |

**REDIRECTS THE GUARD DOES NOT SEE = 0.**

`hostaddr` — the libpq parameter that would bypass DNS — is **not implemented** by this connector,
so it was never a member of the class. Case-variant keys are likewise not honoured, so the guard's
case-sensitivity introduces no false negative. Percent-encoded keys are decoded by *both* sides,
so they are caught.

### Method 2 — reading the connector's merge logic

`pg-connection-string@2.6.1/index.js`: every query parameter is copied onto the config
(`for (const entry of result.searchParams.entries()) config[entry[0]] = entry[1]`), but then
`config.port = result.port` **unconditionally overwrites** any `?port=`, and the authority host is
applied only `if (!config.host)`. So `host` is the sole query parameter that moves the target, and
there is no `hostaddr` or `service` handling in this version at all.

Both methods agree. **The ruled Minimum is not a partial fix for this class — it is complete over
it**, and the `port` clause is a harmless over-refusal (fail-closed, and defence in depth should
the connector's precedence ever change).

## Adversarial sweep through the shipped entry point (`attack5.sh` → `run-attack-sweep.txt`)

Oracle unchanged from round 4 and fixed before running: a refusal must show a refusal message,
**no connection attempt of any kind**, and **no file written**. The sweep additionally records
*which* guard fired, so a case cannot pass for the wrong reason.

| # | case | refused | connection | files | guard that fired |
|---|---|---|---|---|---|
| 1 | `?host=`, no confirmation | yes | no | 0 | override |
| 2 | **`?host=`, confirmation matches the decoy** | yes | no | 0 | override |
| 3 | `?host=`, confirmation matches the real host | yes | no | 0 | override |
| 4 | `?port=` only | yes | no | 0 | override |
| 5 | `?%68ost=` percent-encoded | yes | no | 0 | override |
| 6 | `?host=` repeated | yes | no | 0 | override |
| 7 | unset URL + `BACKFILL_CONFIRM='(unset)'` | yes | no | 0 | sentinel |
| 8 | junk URL + `'(unparseable)'` | yes | no | 0 | sentinel |
| 9 | dead URL, no confirmation | yes | no | 0 | confirm |
| 10 | near-miss wrong port | yes | no | 0 | confirm |
| 11 | **plain URL, correct confirmation** | no | yes | 1 | — (must proceed) |
| 12 | `socket:` scheme | **no** | no | 1 | **none — see L11** |

Case 2 is round 4's exact bypass, now refused. Case 11 shows no over-blocking: it dials
`ECONNREFUSED 127.0.0.1:1` and writes its report to the override directory. Cases 7–8 close L10.

## L11 — the same class through a URL *form* rather than a query parameter (`url-forms.js`)

```
DIVERGE  socket: scheme             guard=":5432"                          dials="/var/run/postgresql:5432"
DIVERGE  %2f-encoded unix host      guard="%2Fvar%2Frun%2Fpostgresql:5432" dials="/var/run/postgresql:5432"
  agree  plain remote (control)     guard="viaduct.proxy.rlwy.net:12394"   dials="viaduct.proxy.rlwy.net:12394"
```

Sweep case 12 confirms this end-to-end: a `socket:` URL passes **every** guard and reaches `emit`.
Worse than passing silently, the M4 guard's error message *instructs* the operator to confirm
`":5432"` — a string naming nothing.

**Mitigation that keeps this LOW**: both forms dial a **local unix socket**, which cannot be the
remote production database. The confirm-one-host-mutate-another harm does not reach production by
this route. The control confirms the real production URL is unaffected.

## Containment claims, verified rather than accepted

- Files touched: exactly two (`backfillValid.ts`, its spec).
- `resolveTargetHost`'s body is **byte-identical** to `ff753a6` (`diff` of the extracted function).
- `project-utils` unchanged at `749606d`.
- Guard order in `main()`: `assertNoHostOverride` (244) → `resolveTargetHost` (245) →
  `assertConfirmedTarget` (246) → `getPostgres()` (248).
