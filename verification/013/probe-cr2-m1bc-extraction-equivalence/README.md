# `probe-cr2-m1bc-extraction-equivalence/` — settles MEDIUM-1's fix by execution

**Settles**: whether M1 fix round 1's extraction of `SaveAsMenu.onSubmit`'s payload expression and
`JsonModalBody`'s seed expression into `saveAsPayload` / `jsonModalSeed` (`src/utils/index.ts`) is
actually behaviour-preserving — the round's own claim, and a claim an argument cannot settle.

Authored by `code-reviewer-hooks-013` for the M1 fix-round re-review at `495463a`. Like CR1 it is
**not** an acceptance spec and does not belong in `website`'s suite: it holds two forms of the same
expression side by side and asserts a property about the *pair*.

## What process produces the evidence

The product's own functions. `old` is the literal expression as it stood at `a4eb00d`, rebuilt from
the tree's own `stripKeys` — the only ingredient it had. `new` is the tree's exported
`saveAsPayload` / `jsonModalSeed`. Nothing is reimplemented; the comparison is `JSON.stringify`
byte-identity plus `toStrictEqual`, over a 12-row corpus (plus `null` / `undefined` / no-`data` rows
for the seed).

**Positive control**: a deliberately wrong extraction (`mutantSaveAsPayload`, which drops
`components`) must **diverge**. Without it a green matrix cannot be distinguished from a comparison
of two references to the same function.

## Running

```bash
cd /usr/local/bin/hooks/website
PROBE_SRC=/tmp/013-495463a/src PROBE_LABEL=495463a \
  PROBE_OUT=<this dir>/run-cr2-495463a.txt \
  npx vitest run --config <this dir>/vitest.cr2.config.ts
```

`PROBE_SRC` selects the tree, materialised without touching the shared repo:
`git -C website archive <sha> | tar -x -C /tmp/013-<sha>`, then symlink `website/node_modules` in.

## Captured runs

| File | Tree | Result |
|---|---|---|
| `run-cr2-495463a.txt` | `495463a` (fix round 1) | 27/27 — all 26 corpus rows **identical**, control diverges as required |
| `run-cr2-mutant.txt` | `495463a` with `saveAsPayload` mutated to drop `components` | 7 failed / 20 passed — the instrument kills the mutant on 6 corpus rows |

## Findings the runs establish

1. The extraction is **byte-equivalent** to the expressions it replaced, on every corpus row.
2. It is equivalent **including the degenerate rows**: `E9` (no `data` key), `E13` (`null`) and
   `E14` (`undefined`) all produce, on both sides, the *value* `undefined` from a function whose
   declared return type is `string`. That is review finding **LOW-3**, and the extraction neither
   worsened nor closed it — `JSON.stringify`'s lib signature returns `string` unconditionally, so
   the inline form carried the same unsound type. Owned by M2, which reopens `JsonModalBody`.
3. The comparison can fail: the mutant is detected on 6 of 12 `SAVE-AS` rows.

## What the probe does NOT cover

- **The component wiring.** That `SaveAsMenu` and `JsonModalBody` *call* these functions is
  established by reading the diff, not by execution — the repo has no browser harness (plan
  assumption 5). The probe proves the functions are equivalent to what was inlined; it cannot prove
  the components now call them.
- **`stripKeys` itself.** Both sides route through it, so a defect inside `stripKeys` is invisible
  here by construction. That is deliberate: the claim under test is *equivalence*, not correctness.
