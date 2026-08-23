---
ID: 012
Origin: 012
UUID: 12a4fe3c
Parent: message-valid-field-for-statbot-2026-08-23.md
Reviewed-At: "Round 5: website `f983508`, project-utils `749606d` — both on `chain/012-message-valid-field`; agent-output `3995eed`. Plus one uncommitted in-scope file (QA's R6 instrument, held untracked deliberately): `website/src/utils/__tests__/012-json-editor-repair-path.test.ts`, sha256 re-verified at review start and end. Base SHAs: project-utils `eb38a15`, website `72dc7de`. Exclusion list: no other foreign or uncommitted file was present in either tree at review start or end. Rounds 1–4 were conducted against website `bc5ee2b`, `681c353`, `eb28ae6` and `ff753a6`; no earlier verdict travels to this tree and none was inherited. Measured connector, on which this round's completeness result depends: `pg` 8.11.1 / `pg-connection-string` 2.6.1 as installed at this SHA."
Status: In Review
---

# Code Review: Plan 012 — `valid` field on stored messages

**Plan Reference**: `agent-output/planning/012-message-valid-field.md` (rev 20, `9358546`)
**Implementation Reference**: `agent-output/implementation/012-message-valid-field-implementation.md` (`3995eed`)
**Round**: 5 (re-review after the override-guard round). Rounds 1–2 REJECTED; 3–4 APPROVED_WITH_COMMENTS.
**Captured instruments**: `agent-output/verification/012/probe-cr5-override-guard/`

> **Naming.** In this document **CR-M6** is the code-review finding (the guard/connector parser
> disagreement, raised round 4). **M6** unqualified is the plan's milestone — backfill, distribution
> report, live declaration. The collision entered the record in my round-4 registration row; the
> implementer flagged it and I am adopting the prefix rather than leaving a later reader to guess.

---

## Verdict: APPROVED_WITH_COMMENTS

**CR-M6 is closed, and by a stronger result than "closed at the Minimum".** The owner ruled the
Minimum and declined the Preferred, so the question I set out to answer was not *"does it stop the
attack I demonstrated"* — it plainly does — but *"is a name-based query-parameter check complete
over the class the connector actually honours"*. Answered two independent ways: **zero redirects
the guard does not see.** For this class the ruled Minimum is not a partial fix. The owner's
ruling cost nothing in coverage.

**L10 closed**, and the implementer's decline of my Preferred is sound.

**One new LOW (L11)**: the same class reachable through a URL *form* rather than a query
parameter — a `socket:` or `%2f`-encoded unix-socket URL passes every guard, and the M4 guard's
message actively instructs the operator to confirm a string naming nothing. It cannot reach the
remote production database, which is what keeps it LOW. It routes to the post-refresh pass
alongside the Preferred and the already-booked residual.

No HIGH or CRITICAL. Nothing holds the tree.

---

## Scope and Method

Two files, +73/−1. Containment claims verified rather than accepted: `resolveTargetHost`'s body is
**byte-identical** to `ff753a6`, `project-utils` is unchanged at `749606d`, and the guard order in
`main()` is `assertNoHostOverride` → `resolveTargetHost` → `assertConfirmedTarget` → `getPostgres()`.

This is a guard fix, so it was re-attacked from first principles. Twelve inputs through the shipped
entry point against the round-4 oracle — refusal message, **no connection attempt of any kind**,
**no file written** — with one addition: the sweep now records *which* guard fired, so a case
cannot pass for the wrong reason. That mattered: it is how I confirmed cases 7–8 are stopped by the
new sentinel check rather than by the pre-existing equality check.

**On judging a Minimum.** A Minimum is normally a knowingly partial fix, and the honest reviewer
question is how partial. I answered it against the connector rather than against documentation,
because "libqp supports X" is a claim about libpq, not about the code that will run here.

---

## Confirmed Closed

### CR-M6 — guard/connector parser disagreement — **CLOSED, and the Minimum is complete**

`assertNoHostOverride` is `main`'s first statement, ahead of the M4 guard, and throws
**unconditionally** — no confirmation value gets past it. Verified: sweep cases 1, 2 and 3 refuse
identically whether the confirmation is absent, matches the decoy authority (round 4's exact
bypass), or matches the genuinely-dialled host.

The interesting result is the completeness check:

**Method 1 — empirical, against the object that connects.** Nine query-string forms put to both the
shipped predicate and a `pg` `Client`, each compared to a no-params baseline. **Redirects the guard
does not see: 0.** Notably `?hostaddr=` — the libpq parameter that bypasses DNS, and the first
thing I went looking for — is **not implemented by this connector at all**, so it was never a
member of the class. Case-variant keys (`?HOST=`) are likewise not honoured, so the guard's
case-sensitivity introduces no false negative. Percent-encoded keys (`?%68ost=`) are decoded by
both sides, so they are caught.

**Method 2 — reading the connector's merge logic.** In `pg-connection-string@2.6.1`, every query
parameter is copied onto the config, but `config.port = result.port` then *unconditionally*
overwrites any `?port=`, and the authority host applies only `if (!config.host)`. So `host` is the
sole query parameter that moves the target, and there is no `hostaddr` or `service` handling in
this version.

Both methods agree, which is why I am willing to state completeness rather than absence of
counter-examples. The `port` clause is a harmless **over-refusal** — defensible as defence in depth
if the connector's precedence ever changes.

### L10 — sentinels are no longer confirmable — **CLOSED; the decline is sound**

`assertConfirmedTarget` rejects any confirmation beginning with `(` before comparing. Sweep cases 7
and 8 refuse, and the sweep confirms the **sentinel** guard fired rather than the equality check.
No false positives are possible: a hostname cannot begin with `(`.

**Judging the decline, as asked.** Declining a distinct unconfirmable type for a LOW with a
closed two-member sentinel set is proportionate, and the on-next-touch note is the right place for
it. I accept it.

One observation, offered rather than raised as a finding: the Preferred/Minimum choice here was a
false dichotomy. Guarding on **`host.startsWith('(')`** instead of `confirmed.startsWith('(')`
would have been the same size — one word — while expressing the actual invariant (*the target could
not be determined*) rather than its symptom (*what the operator typed*). Both are functionally
complete today, since a sentinel host refuses through the equality check for any other confirmation.
But the host-side form is robust to the sentinel *format* changing, which is exactly the
on-next-touch risk the implementer identified. Worth a word next time that file is open.

### Suite, lint, typecheck

- **408/408 across 21 files**, up from 399 — the +9 I enumerated from the diff
  (`hasConnectionOverrideParams` ×4, `assertNoHostOverride` ×4, sentinel rejection ×1).
- **TDD table complete** for all nine. The sentinel row records *"Sentinel confirmation did not
  throw"* rather than a "not a function" — the correct signature for a behaviour change on an
  existing function, and the mark of a genuine red-first.
- **`npx eslint src/scripts/backfillValid.ts` → clean.**
- **Typecheck RED, 8 errors**, identical distribution to rounds 3 and 4 — same stale-pin class.

---

## Findings

### L11 — LOW — the same class through a URL form rather than a query parameter

**Location**: `website/src/scripts/backfillValid.ts`, symbols `resolveTargetHost` and
`assertNoHostOverride`.

**Class**: `DATABASE_URL` forms for which the guard's host string does not name the host the
connector dials — of which the `host` query parameter, now closed, was one member.

**Enumeration**: three URL forms put to both the guard's derivation and a `pg` `Client`
(`url-forms.js`) — **2 of 3 diverge**, both unix-socket forms:

| form | guard demands confirmation of | connector dials |
|---|---|---|
| `socket:/var/run/postgresql` | `":5432"` | `/var/run/postgresql` |
| `postgresql://%2Fvar%2Frun%2Fpostgresql/db` | `"%2Fvar%2Frun%2Fpostgresql:5432"` | `/var/run/postgresql` |
| plain remote (control) | `viaduct.proxy.rlwy.net:12394` | same — **agrees** |

Sweep case 12 confirms it end-to-end: a `socket:` URL passes **every** guard and reaches `emit`.
What the enumeration does **not** cover: `pg`'s `PGHOST`-family environment fallbacks and `service=`
file lookups — my own previously-disclosed residual, already booked to the post-refresh pass.

**Why LOW, stated plainly rather than inflated**: both divergent forms dial a **local unix
socket**, which cannot be the remote production database. The confirm-one-host-mutate-another harm
does not reach production by this route, and the current production URL is unaffected (the
control). What is genuinely wrong is smaller but real: the M4 guard's error message *instructs* the
operator to set `BACKFILL_CONFIRM=":5432"` — a string naming nothing — so the guard would walk an
operator through confirming a target it never identified.

**Required Action** — *eliminate the class*:
- **Preferred (structural)**: the already-routed Preferred for CR-M6 — derive the guarded host from
  the connecting parser — closes this member too, because it removes the second derivation
  entirely. This is one more reason that fix is the right end state, and one more thing for the
  post-refresh pass to check when it lands.
- **Minimum**: refuse when the derived host is empty or `%2f`-prefixed, i.e. when
  `resolveTargetHost` cannot produce a hostname — the same fail-closed shape as the sentinel check.

Recorded as **`no test`**: a framework already reaches this code, so the instrument is the
implementer's to author; the case shapes are in `run-url-forms.txt` and sweep case 12.

### Carried, unchanged, correctly not actioned

**L2**, **L3**, **L5**, **L6 residual** (26 trapped exports), **L7's remaining half** (optional
provenance fields), **F1/R7** (per-embed-limit misvouching, no instrument by construction), and
CR-M6's **Preferred** plus the `PGHOST`/`service=` residual — the last two owner-deferred and
steering-routed to the post-refresh pass, not omissions.

---

## Assumption Not Checked

**This review assumes the completeness result above transfers to the connector that will be
installed after the pin refresh, and does not test that.** Every measurement here was taken against
`pg` 8.11.1 / `pg-connection-string` 2.6.1 as installed at this SHA. The pin refresh changes
`project-utils`, which is the package that owns the `pg` dependency — so the refresh is precisely
the event that could move the connector underneath a guard whose completeness I just certified
against it. If a newer `pg-connection-string` honours `hostaddr`, or changes the
`config.port = result.port` precedence, then `host`/`port` stops being exhaustive and CR-M6 partly
reopens.

**Falsity signature**: after the refresh, `pg-connection-string`'s installed version differs from
2.6.1, **or** re-running `probe-cr5-override-guard/param-class.js` reports a non-zero *"redirects
the guard does not see"*.

**Owner**: the **post-refresh review pass**, already scheduled. This is cheap to discharge there —
the instrument is captured and re-runnable as-is, and `measured-connector-version.txt` records the
baseline to compare against. Named again in Next Steps.

Round 4's assumption (that `pg` dials the host its `Client` constructor reports) and the
`PGHOST`/`service=` residual are already booked to that same pass. Round 3's remains devops'.

---

## Next Steps

1. **steering / devops — the pin refresh**, on your signal. The owner's "close the hole first" is
   discharged: the hole is closed, and closed completely for the class it names.
2. **post-refresh review pass** — now carrying four items, all cheap and all with captured
   instruments: this round's Assumption Not Checked (re-run `param-class.js`, compare the connector
   version); round 4's assumption (a confirmation-gated dial against a non-production host);
   the `PGHOST`/`service=` residual; and CR-M6's Preferred, which closes **L11** as a side effect.
3. **implementer** — L11 when that pass calls for it; the `host.startsWith('(')` refinement next
   time the file is open. Neither needs a round of its own.
4. **qa (Phase 2)** — after the post-refresh pass, per the corrected sequencing.

**Handing off to the qa subagent for test execution** — routed through steering, per the standing
correction that stage-to-stage handoffs go through that thread.
