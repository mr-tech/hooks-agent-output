# CR5 — the application half, the guard, and the cycle

**Round 5, `Reviewed-At: 0c8fad5`.** Re-attacks the EC-3 fix round (`2f49182` + `0c8fad5`) rather
than reading it: the round fixed a **guard** (`applyDisposition`'s throw) and an **instrument** (a
vacuous `.toThrow()`), both of which trigger re-attack from first principles.

Run: `npx vitest run --config vitest.cr5.config.ts` (symlink `node_modules` first).
Result at `0c8fad5`: **19/19** across three files. Captured: `run-cr5-0c8fad5.txt`.

## The three round-4 MEDIUMs, verified closed by execution

| finding | check | result |
|---|---|---|
| MEDIUM-1 dead `dropSet` | `'dropSet' in d` over all 8 cells | **false in 8/8** — the field is gone, not merely emptied |
| MEDIUM-3 `flagBit: boolean` | `flags = 4` (SUPPRESS_EMBEDS) over classic content | **row A**; `4 \| BIT` → **row D**. Closed. |
| MEDIUM-2 no applier | `applyDisposition` exists and delegates to `applyModeSwitch` | present; rows A–E enacted correctly |

CR5-A also records that a **stale caller passing the old boolean** now silently under-reads rather
than failing loudly: `true & 32768 === 0`, so `resolveContentLoss(true, …)` takes the flag-clear
branch. Vitest transpiles without typechecking, so only `tsc` catches it. No such caller exists
(nothing is wired) — recorded because it is the shape of the risk the signature change carries.

## The vacuity control — the implementer's self-catch, confirmed

They reported tightening a bare `.toThrow()` to `.toThrow(/chosenOption/)`. Verified by
**reintroducing the loose form** against a tree where `applyDisposition` does not exist
(`index.ts` reverted to `92ce026`):

- tightened form: **red**, `expected [Function] to throw error matching /chosenOption/ but got
  '…applyDisposition is not a function'`
- loose form: **green** — 7 failed instead of 8, that test flips to passing

So the vacuity was real and the fix genuinely closes it. `red-check/`.

## What the re-attack found that the fix did not close

**CR5-D — `draft` and `disposition` are independent parameters.** A disposition computed from one
draft and applied to another is accepted silently. Executed: a row-B disposition ("nothing to lose,
save as V2") applied to a draft carrying `content` and an embed yields `content: ''`, `embeds: []`
— a destroyed body with no choice presented — while `gateBeforePersist` on that same draft returns
`mustAsk: true`. This is the same class as round 4's MEDIUM-3 (a derived value accepted where the
source is available), reintroduced at the new function.

**CR5-B — the advertised drop and the enacted drop are maintained separately, and already
disagree.** The classic option advertises `dropSet: ['components']`; `applyModeSwitch('classic', …)`
delegates to `switchToClassic`, which **keeps Action Rows** (`type === 1`). Executed: components
`[container, actionRow]` → `[actionRow]`. `applyDisposition` never reads `dropSet` at all — a
deliberately bogus `dropSet: ['nothing','at','all']` changes nothing about what is dropped. So the
user-facing promise and its enactment have no check that they agree.

## The import cycle, tested rather than asserted

The fix round makes `src/utils/index.ts` import `applyModeSwitch` from `~/utils/messageMode`, while
`messageMode.ts` imports `hasV2Components` from `~/utils` — a genuine cycle through the barrel.
Probed in **both import orders** (`cycle-index-first`, `cycle-mode-first`), including the
TDZ-risky leaf-first order: both initialise and all cross-referenced functions work. `next build`
also succeeds, so Turbopack bundles it. **Benign today**; recorded as fragility, not a defect —
neither module calls the other at module-evaluation time, which is the only reason it holds.

## What this probe does NOT establish

- Nothing about wiring: no call site consumes any of the three functions at `0c8fad5`.
- Nothing about `dropSet` strings beyond the two in `ROW_E_OPTIONS`.
- The cycle result is specific to this module pair and this bundler; it is not a general claim that
  the cycle is safe under future edits.
