# probe-cr23-paste-surface-nonvacuity — code-review re-attack of F-QA28

**Stage**: code-review (round 22), plan 013. **Tree under verification**: `4a7126b`
(`chain/013-toast-vessel`). **Question it was built for**: does QA's adopted PASTE-SURFACE render
instrument genuinely reach and discriminate the real `NewMessageJsonInput.settledNotice` render path
— the site I scoped OPEN at rounds 20/21 — or is its positional `useState` injection misaligned /
vacuous?

## Why this exists

The paste surface was reported UNREACHABLE at `abcf585`; QA withdrew that and built the instrument.
Code-review discipline forbids inheriting an adopted instrument's discrimination on trust, and this
is the site my own Assumption-Not-Checked named. So I re-attacked it by my own hand.

## The novel risk, checked against real source

The instrument mocks React's `useState` and injects state **by call order**. A wrong order would
test the wrong slots. Verified against the real component: `useCopyToClipboard`/`useCodeMirror`/
`useUpdateEffect` are mocked to consume **no** `useState` slot, so the order is exactly
`[json(0), error(1), dropped(2), pending(3), dismissed(4), settled(5)]`, and the guard
`show={!error && settledNotice}` reads index 1 and index 5. Alignment confirmed.

## What it does (shared tree untouched)

Replays the adopted mocks + a throwing oracle (renders / no stale box / suppress-on-error / styled)
against the **real** `NewMessageJsonInput` (control) and two **mutant copies** of the real component:
`MutantNeverRender.tsx` (`show={false}`) and `MutantDropErrorConjunct.tsx` (`show={settledNotice}`).
Each copy differs from the real file by exactly the one guard line (`diff` verified).

## Result — my execution

```
Test Files  1 passed (1)
     Tests  3 passed (3)
```

| Case | Expectation | Result |
|---|---|---|
| CONTROL — real `NewMessageJsonInput` | oracle passes | **PASS** (injection aligned) |
| never-render (`show={false}`) | oracle throws | **KILLED** |
| drop-`!error`-conjunct (`show={settledNotice}`) | oracle throws | **KILLED** (suppress-on-error) |

## Execution note

The mutant copies live here for the record, but bare npm imports (`@heroicons/react`, …) do not
resolve from `agent-output/`. The run was performed by copying the three files into a throwaway
`website/.cr23-probe/` (both the `~` alias and `website/node_modules` resolve there), then deleting
it. The real source blob `f63b95d` was never modified — verified unchanged after the run.

## Settles / does NOT settle

**Settles**: the instrument reaches and discriminates the REAL paste-surface render path — render,
suppress-on-error (conjunct isolation), clear, style — by code-review's own execution.

**Does NOT settle** (owner-observation only, D28, for both surfaces): visibility/CSS, placement, and
the real Next.js server/client mount. Same function-call blind spots as CR22.
