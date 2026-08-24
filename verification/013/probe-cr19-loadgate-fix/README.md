# probe-cr19 — HIGH-1 fix (round 17, `ad9f331`) AND MED-6 fix (round 18, `4e9da96`)

**Reviewed-At (round 18, current)**: `4e9da96043a471d8eafc59c43f92d85d9a279a09` (chain branch
`chain/013-components-v2-editing-surfaces`). Verified at pass start and end; the tree did not move.
**Round 17**: `ad9f331` (HIGH-1). This probe now spans both: `loadDisabled_old` is the round-17
gate (the MED-6 defect), `loadDisabled_new` is the round-18 fix.

```bash
cd /usr/local/bin/hooks/agent-output/verification/013/probe-cr19-loadgate-fix
npx vitest run --config vitest.cr19.config.ts     # 17/17 at 4e9da96 (16/16 at ad9f331)
```

## What it establishes

| block | claim | result |
|---|---|---|
| CR19-A | **HIGH-1 CLOSED, structurally.** The fix moved `resolveContentLoss` into the parsing `useEffect`; on `requiresChoice` it sets `pendingChoice` + `setValidatedDraft(null)` and returns, and the render short-circuits `if (pendingChoice) return <choice/>` before the Load button. Three genuine row-E drafts (V2+content, V2+content-no-flag, V2+embed) all reach the choice. **CONTROL**: the removed `e61e602` wiring (validatedDraft always set, choice behind the Load button) leaves the choice unreachable — `choiceViewReached=false` AND `loadDisabled=true`. So the closure is a measured difference, not a vacuous pass. | 8/8 |
| CR19-B | **MED-6: defect (round 17) → fix (round 18), measured.** In the dismissed-choice residual state (`validatedDraft` null, `pendingChoice` null, `dismissedChoice` set): the round-17 gate (`loadDisabled_old`) computes **false** — Load ENABLED — because it omitted the `!validatedDraft` term the sibling carries (`disableSave = !loadedMessage`, NewMessageModal:191); the round-18 fix (`loadDisabled_new = !validatedDraft || !!floor`) computes **true** — Load DISABLED — **at parity with the sibling**. Old gate is retained as the control, so the flip is a measured before/after, not an assertion. The `commitLoad` no-op invariant holds under both (defence in depth). | 4/4 |
| CR19-C | **MEDIUM-4 unchanged.** flag-only-V2 + content → `requiresChoice` false → no choice, floor error fires, Load disabled. The fix correctly leaves the pre-existing (steering: minimum-fix-only) divergence untouched. | 1/1 |
| CR19-D | The `applyDisposition`-resolved object always passes `validateContentRequirements` in either mode — confirming the floor gate belongs on the resolved object, which the effect now produces. | 3/3 |
| CR19-E | Non-members load (row B, row A → Load enabled, `commitLoad` loads). Empty floor is blocked **at the button** (`isDisabled`), which is where the empty-floor guard lives — `commitLoad` itself has no floor guard, sound because the button is disabled. | 1/1 |

## What is a MODEL vs the tree

`resolveContentLoss`, `validateContentRequirements`, `applyDisposition`, `discordMessageImportShape`
are the **real** functions (imported → reads the tree). The **effect + render wiring** is transcribed
verbatim from `ad9f331:JsonModalBody.tsx` (effect 122-155, render gate 165, Load `isDisabled` 276,
`commitLoad` 63-78) and the sibling gate from `NewMessageModal.tsx:191`. A transcription does not
expire when the tree moves (round-13 hazard), so:

- **cr18 is now stale for the wiring** — its `loadDisabled_M4c` models the REMOVED gate (reads the raw
  draft). At `ad9f331` it still passes because the predicate SUPERSET is unchanged, but it no longer
  describes the live control flow. **cr19 supersedes cr18 for the wiring**; cr18 remains valid only as
  the predicate-superset record.
- **The discriminating check for the wiring itself is a MOUNTED render** of JsonModalBody (paste row E
  → assert choice view; Cancel → assert Load state). Routed to **QA Phase 2**. cr19 is the strongest
  evidence obtainable without standing up CodeMirror + the provider tree, and its CONTROL makes it a
  measurement.

## What the model does NOT cover
- CodeMirror `onChange` debounce / `usePassedProp` seed timing — the effect is modeled as if it runs
  synchronously on each `messageString`. A mount would exercise the real effect scheduling.
- The confirmation-dialog copy ("This will overwrite the current message.") shown when Load is clicked
  in the dismissed state — a rendered-string check, not modeled here; part of the CR19-B MEDIUM.
