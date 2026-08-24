# probe-cr21-fqa15-closure — CR round 19 (QA Phase 2 fix)

**Stage**: code-review, plan 013, round 19. **Tree under verification**: chain tip `53beb37`
(website blob `cfbec5b` for JsonModalBody.tsx, verified byte-identical to the commit at pass start
and end). **Predecessor probe**: `probe-qa-p2-rowd-load-gate` (QA, built for the DEFECT at `4e9da96`).

## Why a new instrument rather than re-running QA's

QA's probe settles the **defect's presence** — "the gate floors the UNRESOLVED draft, so row D is
refused." Its Block-B facts assert `validateContentRequirements(unresolvedRowD)` is defined; that is
a pure fact about the unresolved draft and is **unchanged by the fix**, so it proves nothing about
whether the fix works. Instrument validity is indexed to the claim it was built for. This probe is
built for a **different claim**: *"the shipped gate at `53beb37` lets every row-D member load, and
still refuses everything that must stay blocked."*

## The fix under review (F-QA15)

`JsonModalBody.tsx:159-160`:
```
const contentFloorError = validatedDraft
  ? validateContentRequirements(applyDisposition(validatedDraft)) : undefined;
```
Gate (`:273`) `isDisabled={!validatedDraft || !!contentFloorError}`. `commitLoad` (`:73`) loads
`applyDisposition(validatedDraft)` — the gate floors **exactly** what Load produces. This is the
structural fix recommended at round 16 (CR18-D): floor the RESOLVED object, not the raw draft.

## What `fqa15-closure.cr21.test.ts` executes (30 assertions, all green at `53beb37`)

| Block | Asserts |
|---|---|
| CR21-A (3) | The modelled gate IS the shipped (fixed) gate: gate text, `applyDisposition` now between parse and floor, and `commitLoad` loads what the gate floors. A revert breaks these first. |
| CR21-B (16) | **CLOSURE.** 8 row-D members each classify row D (`requiresChoice=false`, `mode=classic`) AND now LOAD (`contentFloorError===undefined`). |
| CR21-C (3) | **HOLE CHECK** (the implementer's own test lacks this): empty draft, flag-only-empty (row C via switchToV2), and whitespace-only content all stay BLOCKED through the fixed gate. The fix opened no hole. |
| CR21-D (3) | Controls: legit rows A/B/C still LOAD — the fix is not a blanket permit. |
| CR21-E (4) | The load-bearing coupling that keeps the gate from THROWING: every row-E member has `requiresChoice=true` (so the parse effect stores `validatedDraft=null` and the gate short-circuits on `!validatedDraft`), and `applyDisposition(rowE)` throws without a chosenMode. This is why the unguarded `applyDisposition` at `:160` is safe. |
| CR21-F (1) | Parity: floor `V2_TYPES` and disposition `V2_COMPONENT_TYPES` both derive from `V2_COMPONENT_TYPE_VALUES` (source single-source), so they never diverge. |

`fqa17-parity.cr21.test.ts` (CR21-G, 2 assertions): the two `SUPPORTED_*_TYPES` copies
(`utils/discordResponseToMessage.ts`, `server/api/utils/shapes.ts`) execute to equal sets —
top-level `{1,9,10,12,13,14,17}`, container-child `{1,9,10,12,13,14}` — confirming F-QA17's
export-only change leaves genuinely-agreeing sets, not merely compiling ones.

## Mutation evidence — the probe flips on revert

Modelled the OLD gate (floor the RAW draft) vs the FIXED gate (floor `applyDisposition`) on the
row-D 5712 shape `{flags:32768, content:'hi'}`:
- OLD gate → `disabled === true` (row D blocked — the defect)
- FIXED gate → `disabled === false` (row D loads — the fix)

Both asserted and passed, so CR21-B's closure assertions genuinely discriminate the fix from the
pre-fix behaviour: a revert flips CR21-B red.

## Residue this instrument does NOT settle

It executes the floor as a pure function and asserts the gate/`commitLoad` expressions as source
text. It does **not** observe React applying `isDisabled` to the rendered button — no DOM harness
exists at this tree (identical residue to QA's probe). Routed to QA's refresh pass, not absorbed.

## Reproduce

```sh
DATABASE_URL='postgresql://qa:qa@127.0.0.1:1/deadport' npx vitest run \
  --config <this-dir>/vitest.config.ts        # run from website/ so ~ and node_modules resolve
```
`vi.mock('~/env.mjs', …)` at the head of each spec is required — `~/utils` pulls `~/constants`
which pulls `env.mjs`, and env validation throws in a bare test process. `vitest.config.ts` aliases
`~` → `website/src`; the `vitest/config` load warning from outside `node_modules` is harmless.
