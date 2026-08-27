# `verification/014/qa-phase1/` — QA Phase 1 instruments, plan 014

Written by `qa-hooks-14`. Everything here is **QA's own instrument material** for plan 014's
Phase 1. It is separate from the sibling `poc/`, `mirror/` and `runs/` directories, which belong to
`analyst-hooks-14`'s M2 DOM-harness analysis and are **not touched by this stage**.

## What belongs here

Instruments QA built to *discriminate a finding or compute a number a verdict rests on*, captured so
the next reader can re-run them rather than inherit the claim. What belongs in `website`'s own suite
instead: anything asserting on production behaviour. Nothing here is a test of the product.

## Contents

| Path | What it is |
|---|---|
| `ac7-sweep.js` | The AC7 / axiom-(E) candidate enumerator. Run **from the `website` repo root**: `node ../agent-output/verification/014/qa-phase1/ac7-sweep.js`. Its header states the enumeration predicate and every exclusion; quote them together with any count taken from it. |
| `ac7-sweep-a74b9e2.txt` | That script's output at `website` `a74b9e2`. |
| `ac7-sweep-34140d3.txt` | The same script's output at `website` `34140d3` (M0-M4c complete, M5 not started). Re-run by `qa-hooks-014-2`. Domain 48 -> 53 files; flagged 27 -> 20; **E2 12 -> 0**, **E3a 3 -> 0**, E1 4 -> 5, E3b 10 -> 5, E3b-indirect 17 -> 12. Candidate counts, not violations - the standing cautions below apply unchanged. Not a Phase 2 verdict: no `Verified-At` is claimed from it. |
| `probe-json-reporter-isValidUrl.json` | The vitest 4.1.2 JSON reporter's output for a single file, capturing the reporter's actual shape. Closes plan 014's M0 step-3 assumption ahead of M0. |

## Standing cautions for anyone re-running `ac7-sweep.js`

- **It is a candidate enumerator, not a violation counter.** Every candidate is adjudicated by
  reading; the QA document carries the adjudications. A raw count from this script is not a finding.
- **It has a positive control and the control has caught it twice.** Both catches are recorded in
  the script's header comments rather than quietly fixed: the first predicate ("local name collides
  with a production export") matched **none** of the plan's four named violators, and a later
  revision that stripped `<`/`>` to suppress a TS-generics false positive went blind to a planted
  `n > 10` transcription. Re-run the control in a scratch tree before trusting a changed predicate.
- **Line-based matching.** E1 and E3b read one physical line; E3b-indirect follows exactly one
  intermediate variable. A two-hop chain, or an expectation split across lines, is outside the
  predicate and is named residue — not absence.
- **"Two-hop chain" means variable depth, NOT argument nesting.** Read 2026-08-27 by
  `qa-hooks-014-2` after two peers reported row 12's `const step2 = switchToClassic(switchToV2(draft))`
  as having escaped E3b-indirect. It did not: the limb keys on `const <alias> = <local-compute>(`
  and is indifferent to what sits inside the parens, so the site was flagged at the correct limb
  (`ac7-sweep-a74b9e2.txt` line 52ff, six candidate lines). The residue is `a=f(x); b=g(a);
  expect(b)` — a chain through **two variables** — and nothing else. Recorded because a false
  report of a gap costs the same as a real one: it would have put Phase 1's 27-of-48 under a
  qualification it never earned, and invited a widening of the predicate for no reason.
