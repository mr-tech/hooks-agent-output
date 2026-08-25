# probe-cr22-render-instrument-nonvacuity — code-review re-attack of F-QA23

**Stage**: code-review (round 21), plan 013. **Tree under verification**: `664e0c0`
(`chain/013-toast-vessel`). **Question it was built for**: does QA's adopted render instrument
(`src/utils/__tests__/013-qa-toast-vessel-render.test.ts`) genuinely **discriminate** — i.e. does its
render-by-function-call technique KILL the two mutants QA named — or is it vacuous?

## Why this instrument exists

Steering flagged a **provenance** gap: the behavioural gate for `CodeMessageNotice` rests on QA's
mutant execution, and the implementer only *read* QA's logs — it did not re-execute the mutants.
Code-review discipline forbids inheriting an adopted instrument's discrimination on trust; an adopted
guard/instrument is re-attacked from first principles. This probe is that re-attack, run by
code-review's own hand.

## What it does (no production source touched)

- Imports the **real** `CodeMessageNotice` and `NullableComponent`.
- Replays a **byte-copy** of the adopted instrument's `render()`/`text()` helpers (the technique under
  test).
- Applies a three-part oracle — renders something / text equals the NOTICE / carries `text-warning`
  — to the real component (**control**) and to three inline mutants of the same shape.

## Result — my execution

```
DATABASE_URL='postgresql://cr:cr@127.0.0.1:1/deadport' \
  npx vitest run --config <dir>/vitest.config.ts --root <dir>     # from website/
Test Files  1 passed (1)
     Tests  4 passed (4)
```

| Case | Expectation | Result |
|---|---|---|
| CONTROL — real `CodeMessageNotice` | oracle passes | **PASS** |
| never-render mutant (`show:null` → returns null) | oracle throws | **KILLED** |
| empty-box mutant (renders div, empty children) | oracle throws | **KILLED** |
| unstyled mutant (drops `text-warning`) | oracle throws | **KILLED** |

The `vitest/config` UNRESOLVED_IMPORT warning is the known harmless /tmp-resolution noise; the run
completed and all assertions executed.

## What this settles, and what it does NOT

**Settles**: the adopted instrument is non-vacuous for `CodeMessageNotice` — its technique kills the
never-render and empty-box mutants (and a styling mutant) by code-review's own execution, so the
"Assumption Not Checked" is a **partial measurement**, not a suspicion, for that surface.

**Does NOT settle** (identical residue to the adopted instrument's own foot, owner-observation only
under D28): the PASTE SURFACE (`NewMessageJsonInput.settledNotice`), visibility/CSS, placement, and
the real Next.js server/client mount. This probe uses the same function-call technique and inherits
the same blind spots by construction.
