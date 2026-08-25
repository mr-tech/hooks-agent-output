# probe-cr28 — is the CR24-6 oracle ARMED, and does its stated non-vacuity claim hold?

**Tree:** `b56570d`. **Criteria:** plan rev 49. **Verifies M10-b by execution, from first
principles — my own mutants, not QA's report accepted.**

## Isolation — the shared tree was NEVER mutated

All four runs used a throwaway rig: `git archive b56570d | tar -x -C /tmp/cr-rig-b56570d`, with
`node_modules` symlinked. Rig blob identity asserted against `git rev-parse b56570d:<path>` before
each run, and `src/utils/index.ts` restored from `git show` between mutants. The working tree in
`/usr/local/bin/hooks/website` was verified clean and at `b56570d` afterwards. **Mutating production
code in a shared tree is what this arrangement exists to avoid.**

    cd /tmp/cr-rig-b56570d && npx vitest run <the two spec files>

**This is adversarial probing of a guard, which is review evidence — not a run of the project's
test suite, which is QA's step.** Only the two spec files were executed.

## The four runs

| Run | Mutation (rig only) | CR24-6 oracle | M9-b's spec (`fqa31`) |
|---|---|---|---|
| Control | none | **22/22 pass** | pass |
| Row D | `resolveContentLoss` row D `mode: 'classic'` → `flagBit ? 'v2' : 'classic'` | **4 fail** | **4 FAIL** |
| Row C | `resolveContentLoss` row C `mode: flagBit ? 'v2' : 'classic'` → `'classic'` | **3 fail** | **pass** |
| M4 | `settledMode` collapsed to the spec's pre-M10-c encoding | **4 fail** | **pass** |

## Findings

1. **M10-b IS SATISFIED.** The oracle is armed. QA's M4 reproduced independently — oracle **4
   failed**, M9-b's spec green — matching QA's and the implementer's reported differential exactly.
2. **The oracle has genuine marginal value**, demonstrated by the **row C** run: it catches a seam
   defect that M9-b's spec cannot see at all.
3. **The oracle's own header cites the WRONG mutant for its non-vacuity claim.** It states:
   *"Mutating `resolveContentLoss`'s row-D branch turns this spec red while M9-b's own spec stays
   green, which is the whole claim."* **Measured: under a row-D mutation BOTH specs go red** —
   `fqa31` catches it through its literal `expect(modeAfterLoad(incoming)).toBe('classic')`
   assertions. The claim is TRUE; the evidence cited for it does not establish it. Row C and M4 do.

## What this probe CANNOT establish

Whether the oracle's eight `expected` literals are correctly transcribed from D17. Every expectation
is a literal, so **no mutation of the code can contradict them** — that is the design's strength and
the exact thing this instrument cannot check. See round 25's finding on cell attribution.
