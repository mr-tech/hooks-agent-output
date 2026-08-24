# probe-cr18 — round-16 M4-c: JsonModalBody Load gate vs the row-E choice, at `e61e602`

**Reviewed-At**: `e61e6025918a63bb435e2aeff1c2e6eb920de1bf` (chain branch). Every function under test
is the **real** one (imported), so this reads the tree and expires if the gate or the disposition
predicates change.

```bash
cd /usr/local/bin/hooks/agent-output/verification/013/probe-cr18-loadgate-choice
npx vitest run --config vitest.cr18.config.ts     # 22/22 at e61e602
```

## What it establishes

| block | file | claim | result |
|---|---|---|---|
| CR18-A/B/C/D/E | `gate-choice.cr18.test.ts` | **HIGH-1 (round 16)**: M4-c added `\|\| !!contentFloorError` to JsonModalBody's Load `isDisabled`. `contentFloorError = validateContentRequirements(validatedDraft)` where `validatedDraft` is the UN-resolved `discordMessageImportShape.parse(raw)`. The gate predicate (`(structuralV2\|\|flagV2) && (content\|\|embeds)`) is a **superset** of `resolveContentLoss`'s `requiresChoice` predicate (`hasV2Components(structural) && hasClassicContent`), so **every** draft that would trigger the inline row-E choice (`commitSettled`→`pendingChoice`) is disabled at the Load button first → the choice flow is unreachable dead code. CONTROL: the parent gate (`!!error\|\|!isValid`) left row E ENABLED. CR18-D: the RESOLVED object (post-`applyDisposition`) always passes `validateContentRequirements` — the gate should apply there, not to the raw draft. Collateral: row D (flag+content) is settled by `resolveContentLoss` but also blocked. | **13/13** |
| CR18b | `discriminate.cr18b.test.ts` | **M4-b is non-vacuous**: `topLevelComponentShape.options[].shape.type.value` returns the concrete set `{1,9,10,12,13,14,17}` (7 real numbers), container-child `{1,9,10,12,13,14}` (6); a simulated divergence (stray 11, the M3-era bug) WOULD break `toEqual`. The parity test discriminates. | **4/4** |
| CR18c | `medium5.cr18c.test.ts` | **MEDIUM-5 (round 15) CLOSED** on both surfaces: a Section with a non-link (interactive) button accessory is DROPPED and NAMED ('Button') by `filterSupportedComponents`/`discordMessageImportShape` (paste) and by `discordResponseToMessage` (ingress); a Thumbnail accessory is KEPT (control — fix not over-broad). | **5/5** |

## The fix that satisfies HIGH-1 AND preserves MEDIUM-4

`resolveContentLoss` already distinguishes the two cases the gate conflates. Gate on
`!requiresChoice && contentFloorError`:

- **row E** (V2 + real content) → `requiresChoice=true` → NOT blocked → the choice runs. (fixes HIGH-1)
- **V2 + empty embed** (round-14 MEDIUM-4) → `requiresChoice=false`, `contentFloorError=true` → blocked. (preserves the incidental MEDIUM-4 mitigation M4-c provides on this surface)
- **empty floor** (nothing) → `requiresChoice=false`, `contentFloorError=true` → blocked. (correct)

Preferred (structural): route row E to the choice in the effect, exactly as the sibling
`NewMessageJsonInput.tsx` already does (lines 94–113), instead of deferring it to the Load button.

## What the predicate does NOT match

- The **NewMessageModal** surface is NOT a member: its `loadedMessage` is `applyDisposition`-resolved
  upstream by `NewMessageJsonInput` before it arrives (round-15 CR17-D, re-verified at e61e602), so its
  own `contentFloorError` only ever catches the empty floor. Its `gateBeforePersist` choice branch was
  already dead (round-15 INFO-2), independent of this finding.
- The **composer** (`DiscordMessageEditor/index.tsx:198`) uses `validateContentRequirements` correctly
  per D15 — the error rule governs the composer; this finding is only about JSON submission surfaces.
