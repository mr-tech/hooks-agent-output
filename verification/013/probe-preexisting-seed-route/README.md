# Probe — can UAT mint its own M8-G seed before the deploy? (plan 013, QA Phase 1)

**Chain**: 013 · **Base**: `website` `chain/013-components-v2-editing-surfaces` @ `c85945f` (clean tree at capture)
**Author**: qa (QA Phase 1) · **Date**: 2026-08-24

## What this instrument discriminates

Plan 013 Validation item 8 states that M8-G's production-reachable human-observable form
(open 5712 → add one container → Save → the ask) exists **only while rows 5712 and 5842 are
unrepaired**, and that the owner's D19 repair is his to run at a time of his choosing. If that
is the whole picture, the repair is a **one-way door**: the moment it runs, the central new
behaviour D18 introduces can never be observed in production and ships on suite evidence alone.

This probe asks the question Validation item 8 does not: **can the shape be minted through the
product's own UI at the chain base, with no SQL and no database access?** If yes, UAT can create
and hold its own seed before the deploy, and the observation survives the repair whenever it runs.

## Result — YES

7 assertions, all green at `c85945f`. At the chain base:

- `enforceImportMutualExclusivity` passes `{content:"hi", flags:32768}` through **untouched**
  (`isV2` is false, so the V2 branch that strips is not taken and the `else` branch does nothing
  when `components` is not an array) — the flag survives, the content survives.
- The same holds for 5842's shape (`components: []`).
- Both shapes are accepted by `discordMessageImportShape` (client) **and** by
  `discordMessageShape` (the server's `message.upsert` input) — so the write boundary admits them.

Therefore the New Message → JSON paste route mints a 5712-shaped and a 5842-shaped record today.

## Why the result is not vacuous

A **discriminating control in the other direction** is included: the same reconciler over a row-E
object (`{content:"hi", flags:0, components:[{type:17}]}`) **does** strip `content`/`embeds` and
reports `v2`. If the reconciler normalised everything, the pass-through assertions would be
reporting a route that is in fact closed.

**Both directions observed failing.** Two mutants run 2026-08-24, each killed, tree restored green:

| Mutant | Assertion mutated | Result |
|---|---|---|
| 1 | `expect(data.flags).toBe(32768)` → `toBe(0)` | 2 failed / 5 passed — **killed** |
| 2 | `discordMessageShape.safeParse(SHAPE_5712).success` `true` → `false` | 1 failed / 6 passed — **killed** |

## Method notes

- Expectation independence: the flag value is asserted as the literal `32768` derived from
  `1 << 15`, not by re-reading the constant the code under test reads.
- **Module-scope hazard (F-QA9)**: importing `~/utils` reaches `src/constants/index.ts` →
  `src/env.mjs`, which validates environment variables **at module scope** and throws in this
  box's environment. The probe mocks `~/env.mjs`, as every existing spec in the repo does. This
  was found by executing, not by reading, and is recorded in the QA document.

## Files

| File | What it is |
|---|---|
| `013-qa-phase1-seed-route-probe.test.ts` | the probe, verbatim copy of the spec in the website tree |
| `run-green.txt` | the green run at `c85945f` |
| `manifest-sha256.txt` | `sha256sum` of the spec's bytes in the website tree at capture |

**Live path in the website tree**: `src/utils/__tests__/013-qa-phase1-seed-route-probe.test.ts`
(vitest's `include` already reaches it; it runs with `pnpm test`). It is **uncommitted** at
capture — QA does not hold the chain-branch source grant. Committing it is a gated act and is
reported to steering.

## What belongs here, and what does not

This directory holds QA-authored **instruments that discriminate a finding** — probes, controls,
differentials — for chain 013. Acceptance specs for plan 013's criteria belong in the service's
own suite (`src/utils/__tests__/`, `src/server/api/utils/__tests__/`), not here; this is not a
second home for the test suite.
