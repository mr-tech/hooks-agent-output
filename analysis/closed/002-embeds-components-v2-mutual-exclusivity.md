---
ID: 2
Origin: 1
UUID: b7e4a1f3
Status: Planned
---

# Analysis 002 — Embeds & Components V2 Mutual Exclusivity

## Changelog

| Date       | Summary                                                                                   |
| ---------- | ----------------------------------------------------------------------------------------- |
| 2026-04-02 | Initial investigation. All findings verified against Discord API docs and codebase trace. |
| 2026-04-03 | Status → Planned. All open questions resolved. Findings incorporated into Plan 001 Rev 4 (Milestones 7–11). |

## Value Statement and Business Objective

Messages sent with the `IS_COMPONENTS_V2` flag cannot contain traditional embeds or content — Discord silently drops them. The current implementation sets this flag when V2 components are present but does **not** enforce mutual exclusivity anywhere: not in the editor UI, not in validation, not in the Zod schema, and not in the `stripKeys()` transformation. A user can freely build a message with both embeds and V2 components, save it, and send it — at which point Discord will silently discard the embeds and content, causing data loss with no warning.

---

## Objective

Determine how the `IS_COMPONENTS_V2` flag interacts with embeds/content in the Discord API, trace all codepaths where enforcement should exist, and document all gaps for the Implementer.

---

## Methodology

1. Consulted Discord API documentation at `docs.discord.com/developers/components/overview`
2. Read `discord-api-types/payloads/v10/message.ts` for `MessageFlags.IsComponentsV2` definition
3. Traced the full message lifecycle: editor → state → save → send
4. Inspected `stripKeys()`, `sendWebhook()`, Zod schemas, `validateMessage()`, and the editor UI

---

## Findings

### Verified: Discord API Constraint

From [Discord Components Overview](https://docs.discord.com/developers/components/overview):

> To use components, messages must be sent with the `IS_COMPONENTS_V2` flag (`1<<15`). Note that **using this flag disables traditional content and embeds** — all content must be sent as components instead.

**Determination**: When `flags` includes `IS_COMPONENTS_V2` (32768), Discord ignores `content` and `embeds` fields entirely. They are silently dropped — no error is returned. The message is sent successfully but only the components render.

### Verified: Current Flag Behavior

`stripKeys()` in `src/utils/index.ts` (lines 390-410) correctly sets the flag:

```typescript
const hasV2 = (casted.data.components as { type: number }[]).some(
  (c) => V2_COMPONENT_TYPES.has(c.type),
);
if (hasV2) {
  casted.data.flags = ((casted.data.flags as number) || 0) | IS_COMPONENTS_V2_FLAG;
}
```

This runs on both the save path (`useApiMethods.ts` → `stripKeys()`) and the send path (`send/page.tsx` → `stripKeys()`). The flag is set correctly when V2 components exist. **But no embeds/content stripping accompanies the flag.**

### Gap 1: `stripKeys()` Does Not Strip Embeds/Content When Flag Is Set

When `hasV2` is true, `stripKeys()` sets the flag but leaves `embeds` and `content` intact in the message payload. The message is then serialized with both V2 components AND embeds/content. Discord silently discards the latter.

**Impact**: Data loss. Embeds and content that the user sees in the editor are silently dropped when sent. No error is shown.

**Affected codepaths**:
- `send/page.tsx` line 90: `stripKeys({ data: message.data }).data` → passed to `sendWebhook()`
- `useApiMethods.ts` line 64: `stripKeys({ ...messageRef.current, ...overrideMessage })` → passed to `upsertMessage()`
- `SaveAsMenu.tsx` line 39: `stripKeys(message).data` → saved as new message
- `JsonModalBody.tsx` line 40: `stripKeys(message ?? {}).data` → shown in JSON modal

### Gap 2: Editor UI Allows Both Embeds and Components Simultaneously

In `DiscordMessageEditor/index.tsx`:

- "Add Embed" button (line 255): shown when `showEmbedButton && editableState?.showEmbedTools` — no check for components
- "Add Component" button (line 265): shown when `showComponentButton` — no check for embeds
- Both `showEmbedTools` and `showComponentsEditable` are independent toggles in `useEditableState.ts`, both default to `true`

A user can add embeds and V2 components in the same message with no warning. The editor renders both sections side by side in `discord-visualizer__accessories`.

### Gap 3: No Validation Prevents Mixed Messages

- `validateMessage()` in `src/utils/limits.tsx` (line 91): checks that content or embeds exist, does not check components or mutual exclusivity
- `noContentError` in `DiscordMessageEditor/index.tsx` (line 181): checks `content || embeds.length || components.length` — validates at least one exists, not that they're exclusive
- `discordMessageShape` Zod schema (line 158 in `shapes.ts`): allows both `embeds` and `components` as optional arrays with no cross-field refinement

### Gap 4: Save Path Persists Invalid Combinations

The tRPC `message.upsert` mutation accepts the Zod-validated message and persists it. Since the schema allows both embeds and components, a user can save a "mixed" message to the database. This creates a persistent state that will always silently lose embeds on send.

### Gap 5: JSON Import Accepts Mixed Messages

`discordMessageImportShape` (line 198 in `shapes.ts`) extends `discordMessageShape` — it also allows both embeds and components without cross-field validation. A user can paste JSON containing both and the app will accept it.

---

## System Weaknesses

| Category       | Weakness                                                       | Risk Mechanism                                                                                |
| -------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Data Integrity | No mutual exclusivity enforcement at any layer                 | User creates mixed message → embeds silently dropped on send → user believes embeds were sent |
| UX             | Editor allows adding both embeds and components freely         | Nothing prevents or warns the user about the incompatibility                                  |
| Validation     | `validateMessage()` only checks content/embeds, not components | Bypasses the constraint entirely                                                              |
| Persistence    | Database stores invalid combinations                           | Saved messages with both embeds and V2 components are permanently in a broken state for send  |
| Import         | JSON import/paste accepts mixed messages                       | External JSON with both embeds and V2 components imports cleanly but will lose embeds on send |

---

## Analysis Recommendations

### Recommended Investigation Steps

1. **Determine desired UX behavior**: Should the UI enforce mutual exclusivity (hide "Add Embed" when components exist and vice versa)? Or should it show a warning and let the user choose? Or should `stripKeys()` silently strip one side? This is a product decision that affects the approach.

2. **Determine the `content` field behavior**: Discord says content is "disabled" with the flag, but `TextDisplay` components serve the same purpose. Should the editor strip `content` when V2 components are present, or allow it (since it's stored but not sent)? Need to verify: does Discord error on `content` + `IS_COMPONENTS_V2`, or silently ignore it?

3. **Check existing saved messages**: If any users have already created messages with both embeds and V2 components, those messages are in a broken state. The Implementer should consider whether to handle this at load time (warn/migrate) or only at send time.

4. **Verify `content` behavior with POC**: Send a webhook request with `IS_COMPONENTS_V2` flag, V2 components, and `content: "test"` to determine if Discord returns an error or silently drops the content. This affects whether `content` needs to be stripped or just embeds.

---

## Open Questions

1. **Product decision**: When a user has embeds in their message and adds a V2 component (or vice versa), what should happen? Options:
   - (A) Prevent: disable the other "Add" button with an explanation
   - (B) Warn: show an error/warning in the UI, block send
   - (C) Auto-strip: `stripKeys()` removes embeds/content when V2 flag is set (silent data loss in serialization but not in editor state)
   - (D) Mode switch: dedicated toggle that switches the message between "classic" (content/embeds) and "components v2" modes, clearing the other

2. **Content field**: Is `content` also dropped, or only `embeds`? The Discord docs say "disables traditional content and embeds" which implies both. Needs POC verification.

3. **Legacy action rows**: The V1/legacy `ActionRow` (type 1) with interactive buttons does NOT require the `IS_COMPONENTS_V2` flag and CAN coexist with embeds. The current code includes type 1 in `SUPPORTED_TOP_LEVEL_TYPES` but NOT in `V2_COMPONENT_TYPES`. Is this correct? (It appears correct — only types 9-14, 17 trigger the flag.)
