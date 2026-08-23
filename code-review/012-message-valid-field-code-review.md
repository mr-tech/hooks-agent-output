---
ID: 012
Origin: 012
UUID: 12a4fe3c
Parent: message-valid-field-for-statbot-2026-08-23.md
Reviewed-At: "Round 4: website `ff753a6`, project-utils `749606d` — both on `chain/012-message-valid-field`; agent-output `0fc444f`. Plus one uncommitted in-scope file (QA's R6 instrument, held untracked deliberately): `website/src/utils/__tests__/012-json-editor-repair-path.test.ts`, sha256 re-verified at review start and end. Base SHAs: project-utils `eb38a15`, website `72dc7de`. Exclusion list: no other foreign or uncommitted file was present in either tree at review start or end. Rounds 1–3 were conducted against website `bc5ee2b`, `681c353` and `eb28ae6`; no earlier verdict travels to this tree and none was inherited — every enumeration below was re-run here, including the two predicates the implementer reports having re-run."
Status: In Review
---

# Code Review: Plan 012 — `valid` field on stored messages

**Plan Reference**: `agent-output/planning/012-message-valid-field.md` (rev 18, `299271d`) — D16 (L9 enacted), D17 (owner's guard-first ruling)
**Implementation Reference**: `agent-output/implementation/012-message-valid-field-implementation.md` (`65574ca`)
**Round**: 4 (re-review after the guard round). Rounds 1–2 REJECTED; round 3 APPROVED_WITH_COMMENTS.
**Captured instruments**: `agent-output/verification/012/probe-cr4-guard-attack/`

---

## Verdict: APPROVED_WITH_COMMENTS

**The M4 guard satisfies D17 as the owner ruled it.** A bare invocation cannot reach the production
database: I drove eleven inputs through the shipped entry point with the oracle fixed in advance,
and every refusal case refused on all three surfaces — refusal message present, **no connection
attempt of any kind**, **no file written**. The guard also does not over-block. L8 is closed and I
verified it by using it: this is the first of four rounds in which my drives left nothing to clean
up in the owner's gate directory.

**One new MEDIUM, latent rather than live.** The guard decides the target with WHATWG `new URL()`;
the connection is made by `pg`'s own parser. Those two disagree on a supported connection-string
form, and I demonstrated the disagreement end-to-end through the shipped entry point (M6). It does
**not** affect the current production URL, which carries no query string — so it does not undermine
D17's guarantee today, and it routes naturally to the post-refresh review pass you have already
scheduled.

No HIGH or CRITICAL. Nothing here holds the tree.

---

## Scope and Method

Two files, +91/−8: `src/scripts/backfillValid.ts` and its spec. Everything else untouched,
confirmed by `git diff --stat eb28ae6 ff753a6`.

This round's subject is a **guard on an irreversible action**, which triggers two obligations in my
definition: adversarial execution against the running entry point, and re-attack from first
principles rather than reading the fix and agreeing with it. Both were met. I named the process
whose output would be my evidence before choosing instruments: the shipped `main()` under a real
Node process, and — for the parser question — the `pg` `Client` object that actually connects,
resolved through the same path the script uses, not a library consulted in isolation.

**Two of my own instrument errors, caught and corrected mid-round**, recorded because a sweep whose
harness was broken is worthless and the corrections are what make the counts trustworthy:

1. My first sweep ran without `NODE_ENV`, so six cases died in `project-utils`' zod validation
   *downstream* of the guard and reported "no connection" for the wrong reason. Caught because
   case 8 — which *must* proceed — showed no connection either. A contradiction against a case
   whose expected outcome I had fixed in advance is what exposed it, not re-reading the output.
2. `git diff | grep "^\+"` returned nothing for the spec's new tests. That is the known
   filtered-diff hazard; I re-took it by writing the diff to a file and reading that.

**I declined one test and will say why rather than let it read as coverage.** Driving `main()`
against live production credentials to prove the guard refuses is a test whose failure mode *is*
the harm it tests for — a broken guard would run the backfill against production and consume the
owner's single-shot M6-b gate. I decomposed it instead: the predicate exercised directly against
the real resolved host, and the ordering established by the dead-URL cases where a broken guard
costs nothing. The implementer did run the live leg; my decomposition is not weaker, and I did not
inherit their result.

---

## Confirmed Closed

### M4 — the production-default guard — **CLOSED at the Preferred action**

`main()`'s first two statements are `resolveTargetHost` and `assertConfirmedTarget`; `getPostgres()`
is the third. Re-read at this SHA. `assertConfirmedTarget` uses **strict inequality** against the
resolved host — no substring, prefix or truthiness matching, which is where guards of this shape
usually fail — and is fail-closed by default, since `undefined !== host`.

Eleven inputs driven through the shipped entry point (`probe-cr4-guard-attack/README.md`):

- **Refuses, with zero connection attempts and zero files written**: no confirmation; empty-string
  confirmation; near-miss on port; near-miss on host; whitespace-padded confirmation; trailing-dot
  host.
- **Proceeds on exact confirmation** — the guard does not over-block.
- **Against the real production URL**: resolves `viaduct.proxy.rlwy.net:12394`; a bare invocation
  and a wrong-host confirmation are both refused; exact confirmation is allowed.

One case I initially mis-designed and am recording as such: host case variation (`LocalHost`)
*matched* rather than refused. That is correct — `postgresql:` is a non-special scheme, so WHATWG
`URL` preserves host case instead of lowercasing it, and the confirmation genuinely named what was
resolved. My expectation was wrong, not the guard. The residue is that the guard is case-sensitive
where DNS is not, which is fail-closed and not a defect.

### L8 — the report destination override — **CLOSED, verified by use**

`BACKFILL_REPORT_DIR` is honoured (`resolveReportDir`, with an empty string correctly falling
through to the default). Every drive this round used it, and the three cases that got past the
guard wrote their reports there. The gate directory was listed afterwards: **no stray report**.
Rounds 1, 2 and 3 each required a capture-and-delete; this round required none.

### M5 — the record correction — **CLOSED**, re-run with my own predicates

I did not accept that my predicates had been re-run; I re-ran them. Both, across
`agent-output/*.md`. The `messageMode.ts` row now reads *"its extraction is behaviour-preserving …
but the `handleModeSwitch` wiring seam to it remains accepted at Minimum, not closed"* — accurate,
and it distinguishes the claim my round-2 differential actually established from the one it did
not. The `backfillValid.ts` row is corrected too. Surviving hits are exactly the exclusions I
stated: frozen changelog rows, Outstanding Item 9's correction text, the fix round's own record of
making the fix, my own review document, my probe README (a negation), and closed plan-001 docs.

Two other rows in that table — *"`handleModeSwitch` delegates to `switchToV2`/`switchToClassic`"*
and *"wired into `DiscordMessageEditor`'s `handleModeSwitch`"* — are factual statements about what
the code does, not claims about test coverage. Correctly left alone.

### L7 — provenance typing — **ADDRESSED at half the Preferred action, accurately declared**

`ReportMeta` is a named interface declaring all five fields, shared with `emit`'s `extra` via
`Omit<ReportMeta, 'tableWideRowCount'>` — so the two cannot drift apart. The fields remain
optional, so a future omission is still not a type error; the implementer says exactly this rather
than claiming the finding closed, and defers the remaining half. That is the right way to report a
partial fix, and I am not re-raising it.

The Minimum regression guard is present and **labelled in the test's own name** as a regression
guard rather than a red/green case, since the behaviour already existed. Declaring a non-TDD test
as non-TDD in the TDD table is what the table is for.

### Suite, lint, typecheck

- **399/399 across 21 files**, up from 390 — the +9 the implementer reported, matching nine new
  cases I enumerated from the diff (provenance guard; report-dir override; `resolveTargetHost` ×4;
  `assertConfirmedTarget` ×3).
- **`npx eslint src/scripts/backfillValid.ts` → clean.**
- **Typecheck RED, 8 errors**, identical distribution to round 3
  (TS2820 ×2, TS2345 ×2, TS2769 ×1, TS2353 ×2, TS2339 ×1) — the same stale-pin class, untouched.

---

## Findings

### M6 — MEDIUM — the guard and the connector use different parsers, and they disagree

**Location**: `website/src/scripts/backfillValid.ts`, symbol `resolveTargetHost` (WHATWG `new URL`)
versus the connection path `getPostgres()` → `new Pool({ connectionString })` → `pg` `Client`.

**Class**: Any `DATABASE_URL` for which the parser that *authorises* the run and the parser that
*makes the connection* resolve different hosts — so the operator confirms one target and the script
mutates another.

**Enumeration**: five connection-string forms put to both parsers, asking the `pg` `Client` object
that actually connects (`parser-differential.js`) — **2 of 5 diverge**, both via the `host` query
parameter, a supported libpq/`pg` form used for PgBouncer, Unix sockets and proxied hosts. Driven
end-to-end through the shipped entry point as sweep case 11, with the override pointed at
`127.0.0.1` so nothing production was touched: `BACKFILL_CONFIRM="decoy.invalid:1"` satisfied the
guard, and the process then connected to `127.0.0.1:1`. What the enumeration does **not** cover:
`pg`'s environment-variable fallbacks (`PGHOST` and friends) when the connection string omits a
host, and `service=` file lookups — both are further members of the same class and I did not test
them.

**Why it is not HIGH, and not a challenge to D17**: the real `.env.local` URL carries no query
string — established by printing `u.search.length` and the parameter-name list only, never
credentials — so the guard names the correct host for the target that actually exists today. The
input is operator-controlled rather than externally reachable, and the guard's threat model is
accidental invocation, not a deliberate operator. But the guard's entire value is *naming the host
you are about to mutate*, and a guard that names the wrong host while passing manufactures
confidence rather than providing it.

**Required Action** — *eliminate the class*:
- **Preferred (structural)**: derive the guarded host from the same parser that connects, so the
  two cannot disagree by construction. `pg` is `project-utils`' dependency, not the website's, so
  the clean shape is `project-utils` exposing the resolved target alongside `getPostgres` — which
  also puts the guard's fact next to the connection it guards.
- **Minimum**: refuse outright when the URL carries a `host` or `port` query parameter — two lines,
  no new dependency, fail-closed on the demonstrated member.

**Routing**: to the post-refresh review pass, which is already scheduled and where a guard change
would be reviewed anyway. Not blocking this verdict.

### L10 — LOW — a sentinel meaning "target undetermined" is accepted as a confirmation

**Location**: `website/src/scripts/backfillValid.ts`, symbols `resolveTargetHost` /
`assertConfirmedTarget`.

**Class**: Confirmation values that satisfy the guard without naming a real target.

**Enumeration**: the sentinel set is closed and has exactly **2 members** — `(unset)` and
`(unparseable)`. Both are confirmable: sweep cases 9 and 10 passed the guard with
`BACKFILL_CONFIRM='(unset)'` and `'(unparseable)'` respectively.

Neither reaches a database today, but not because the guard stopped it — `project-utils`' zod env
validation rejects both downstream. The guard itself does not fail closed here, and the protection
is therefore incidental to a validator in another package that this script does not control.

**Required Action** — **Preferred (structural)**: make the sentinels unrepresentable as
confirmations by returning a distinct type for "undetermined" that `assertConfirmedTarget` rejects
unconditionally, rather than a string it compares. **Minimum**: reject any `confirmed` value
beginning with `(`. Recorded as **`no test`** — a framework already reaches this code, so the
instrument is the implementer's to author; the case shapes are in `run-attack-sweep.txt`.

### Carried, unchanged, correctly not actioned

**L2** (two `as boolean` casts), **L3** (`a7ebe4d`'s count mismatch, reconciled rather than
rewritten), **L5** (the older `applyModeSwitch` assertions still compute their expected value by
calling the delegate they name, so they cannot fail under a defect in that delegation), **L6
residual** (26 env-independent exports still trapped behind the barrel), **L7's remaining half**
(optional fields), **F1/R7** (per-embed-limit misvouching, no instrument by construction).

---

## Correction to my own round-3 record

My rev-15 Status-Detail called M4 *"not a re-review trigger"*. That was written before the owner's
ruling and before steering's gating decision, and it is now wrong: the pin refresh is a
production-code change after a verdict, so it expires this verdict and triggers a further review
pass before QA Phase 2. Plan rev 18 records the corrected order. Steering has taken responsibility
for the correction; I am restating it here so that this document — which is what a later reader
consults — does not carry the superseded claim.

---

## Assumption Not Checked

**This review assumes `pg` resolves `DATABASE_URL` at connection time exactly as the `Client`
constructor reports it at construction time, and does not test the connection itself.** M6's
divergence was measured from `new Client({ connectionString }).host` — the object the pool builds —
not from an observed TCP connection to the overridden host, because directing a real connection at
a production hostname is precisely what this chain must not do.

**Falsity signature**: a run in which `Client.host` and the host actually dialled differ — visible
as a connection error, or a `pg_stat_activity` entry, naming a host other than the one the
constructor reported. If that ever appears, M6's severity moves rather than disappears: it would
mean the guard is wrong about the target in a *further* way, not that it is right.

**Owner**: the **post-refresh review pass**, where M6's fix is reviewed and where a
`BACKFILL_CONFIRM`-gated run against a non-production host can dial a real connection safely and
compare the two. Named again in Next Steps.

My round-3 Assumption Not Checked (the eight typecheck errors exhaustively the stale-pin class)
remains devops' at the pin-refresh commit, per steering's routing, and is not re-owned here.

---

## Next Steps

1. **steering / devops — the pin refresh**, on your signal. D17 is satisfied: the guard is in place
   and verified adversarially, so the ordering the owner ruled has been met.
2. **post-refresh review pass** — M6 (Preferred: derive the guarded host from the connecting
   parser), L10, and this round's Assumption Not Checked. That pass is the natural home for all
   three; none needs a round before the refresh.
3. **implementer** — M6 and L10 when that pass calls for them; L7's remaining half is already
   recorded as on-next-touch.
4. **qa (Phase 2)** — after the post-refresh pass, per the corrected sequencing.

**Handing off to the qa subagent for test execution** — routed through steering, per the standing
correction that stage-to-stage handoffs go through that thread.
