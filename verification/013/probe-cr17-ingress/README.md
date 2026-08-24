# probe-cr17 — M3 Discord ingress at `12f4ce6`

**Reviewed-At**: `12f4ce672edc914be3e7998f8488a39dc3204393` (chain branch). Every function under test
is the **real** one (imported), so this reads the tree and expires if the converter or the shapes
change.

```bash
cd /usr/local/bin/hooks/agent-output/verification/013/probe-cr17-ingress
npx vitest run --config vitest.cr17.config.ts     # 15/15 at 12f4ce6
```

## What it establishes

| block | claim | result |
|---|---|---|
| CR17-A | the whole `flags` field is carried, incl. non-V2 bits | **RULED-ACCEPTABLE, not a finding** — architecture `system-architecture.md:91` owner ruling: non-V2 bits are "user data that passes through every surface unexamined and unchanged" |
| CR17-B | M3-b core: the converter's kept-set EXACTLY matches the strict persist shape's discriminants `{1,9,10,12,13,14,17}`; unsupported top-level types and non-link ActionRow buttons are dropped and LABELLED | **clean** |
| CR17-C | GAP: a Section **accessory** is never filtered; a non-link (interactive) button accessory is carried unnamed and then FAILS `discordMessageShape` at persist — the D9-avoided opaque failure. A Thumbnail accessory persists fine | **MEDIUM-5** |
| CR17-D | M3-c's `disableSave |= !!contentFloorError`: the mechanics would block a row-E message, BUT `loadedMessage` can never be row E, so it blocks nothing reachable | **finding RETRACTED by reachability**; reveals M8-G's NewMessageModal choice branch is dead code (INFO-2) |
| CR17-E | the Section-accessory gap is M3-specific: the PASTE path rejects it loudly at paste (`discordMessageImportShape`), the INGRESS path defers to an opaque save-fail | **confirms MEDIUM-5 is ingress-specific** |

## MEDIUM-5 — the Section-accessory gap (CR17-C, CR17-E)

The converter filters top-level types, container-child types, and non-link buttons **inside Action
Rows** — but a **Section's accessory** is neither a top-level nor a container-child type, so
`filterTopLevelComponent`/`filterContainerChild` never inspect it; a Section is returned whole. The
strict `sectionShape.accessory` is `z.union([thumbnailShape, linkButtonShape])`, so a Section whose
accessory is a **non-link (interactive) button** — a valid Discord shape from another bot — is:

1. carried by the converter with **no** entry in `droppedComponentTypes` (silent), and
2. rejected only at **persist** (`message.upsert` → `discordMessageShape`) with an **opaque Zod
   error** the user cannot diagnose.

That is exactly the failure mode **D9** exists to eliminate ("unsupported components on Discord
ingress are dropped and the import visibly names what was dropped"). It is **outside M3-b's formally
declared class** (that class is enumerated over top-level and container-child types only), so the
milestone's stated criterion is still met — but the D9 intent is missed for this shape. **Narrow**
(needs another bot's V2 Section with an interactive-button accessory, imported) and **fail-safe** (the
save fails; nothing corrupt is stored). The PASTE path handles the same shape better — it rejects at
paste time, loud — so this is an **ingress-specific** gap.

**Fix (structural)**: filter Section accessories in the converter the same way ActionRow buttons are
filtered — drop a non-link-button accessory and name it in `droppedComponentTypes` (and, ideally, the
same on the paste path's `filterSupportedComponents` so the two agree).

## INFO-2 — M8-G's NewMessageModal choice branch is unreachable (CR17-D)

`loadedMessage = discordMessage ?? webhookMessage ?? commandMessage ?? jsonMessage`. The first three
are Discord ingress, which never carries V2 + content (Discord enforces the exclusivity). `jsonMessage`
is set only by `NewMessageJsonInput`, which resolves row E in its **own** choice UI and emits
`applyDisposition(...)` — a resolved message. `applyDisposition` with no mode **throws** on row E, and
the code guards it (the `requiresChoice` branch is handled first), so no arm emits row E. Therefore
`gateBeforePersist(loadedMessage).mustAsk` is always false in `NewMessageModal`, and the
`pendingChoice`/`gateBeforePersist` branch M8-G added there is **dead code** given the current sources
plus Discord's exclusivity invariant. Harmless defensive depth; recorded because **round 14 approved
M8-G without noticing this** (my miss), and so a future reviewer does not assume the branch is
exercised. If a future `loadedMessage` source can produce row E, the branch becomes live — so it is
not wrong to keep, only currently unreached.

## What this probe does NOT establish

- **Discord's own invariant** (a fetched message never carries `IS_COMPONENTS_V2` together with
  content/embeds) is assumed from the Discord API, not executed. INFO-2 and "ingress never row E"
  rest on it. Falsity signature: a fetched message with both would make the NewMessageModal choice
  branch live and reachable.
- **The opaque persist failure's UX** — that a non-link Section accessory surfaces to the user as an
  unexplained error rather than a named drop — is argued from `discordMessageShape.safeParse` failing,
  not from standing the app up and importing such a message. Owner: QA, one import of another bot's
  V2 Section-with-interactive-accessory, asserting what the user sees on save.
