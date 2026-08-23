---
ID: 7
Origin: 7
UUID: d4e8a1c3
Status: Planned
---

# 007 — Components V2 Displayable Text Size Limit Analysis

## Changelog

| Date       | Change                   |
| ---------- | ------------------------ |
| 2026-04-09 | Initial analysis created |

## Value Statement and Business Objective

Users sending messages with Components V2 content hit Discord's `COMPONENT_DISPLAYABLE_TEXT_SIZE_EXCEEDED` error (code 50035) when the **sum of all Text Display `content` fields** exceeds 4,000 characters. The editor currently validates each Text Display individually at 4,000 characters but does not enforce or warn about the **aggregate** limit, allowing users to compose messages that will be rejected at send time with no prior feedback.

## Objective

Determine every location where validation needs to change to account for the aggregate 4,000-character displayable text size limit across all Components V2 Text Display components in a message.

## Context

Discord's error response:
```json
{
  "code": 50035,
  "errors": {
    "components": {
      "_errors": [{
        "code": "COMPONENT_DISPLAYABLE_TEXT_SIZE_EXCEEDED",
        "message": "Components displayable text size exceeds maximum size of 4000"
      }]
    }
  }
}
```

This means:
- The **per-field** max for a single Text Display `content` is 4,000 chars.
- The **aggregate** max across all Text Display `content` fields in the entire message is **also** 4,000 chars.
- These are distinct checks — the user's message has many Text Displays each under 4,000, but the total far exceeds it.

## Methodology

Code tracing of all validation paths: Zod schema validation (server-side), `validateMessage()` (client-side gate), `DiscordContentEditor` per-field limit display, and the `DiscordMessageEditor` aggregate warning system.

## Findings

### Finding 1: Per-field validation exists but aggregate does not

**Verified** — The constant `MAX_TEXT_DISPLAY_CONTENT_LENGTH = 4000` ([src/constants/index.ts](src/constants/index.ts#L63)) is used in two places for **per-field** validation:

1. **Zod schema** ([src/server/api/utils/shapes.ts](src/server/api/utils/shapes.ts#L62)): `z.string().min(1).max(MAX_TEXT_DISPLAY_CONTENT_LENGTH)` — validates individual Text Display content during API save/load.
2. **Editor UI** ([src/components/DiscordMessageEditor/components/ComponentEditors/TextDisplayEditor.tsx](src/components/DiscordMessageEditor/components/ComponentEditors/TextDisplayEditor.tsx#L31)): `limit={MAX_TEXT_DISPLAY_CONTENT_LENGTH}` — shows a remaining-character countdown per Text Display field.

Neither location computes or checks the **sum** across all Text Displays.

### Finding 2: Classic embeds have an aggregate check; V2 components do not

**Verified** — For classic embeds, `validateEmbedCharacterCount()` in [src/utils/limits.tsx](src/utils/limits.tsx#L27-L39) sums title + description + fields + footer + author across all embeds, and rejects totals exceeding `MAX_EMBED_CHARACTERS` (6,000). This is the direct analog of what's needed for V2.

For Components V2, `validateMessage()` ([src/utils/limits.tsx](src/utils/limits.tsx#L109-L122)) calls `validateEmbedCharacterCount()` for embeds but has **no equivalent** for components. The function returns without checking aggregate text across V2 components.

### Finding 3: The editor shows per-field remaining chars but no aggregate warning

**Verified** — `DiscordContentEditor` Desktop ([src/components/DiscordContentEditor/Desktop.tsx](src/components/DiscordContentEditor/Desktop.tsx#L60)) and Mobile variants compute `remaining = limit - value.length` for a single field value. When remaining ≤ 200, a countdown is displayed.

The main `DiscordMessageEditor` ([src/components/DiscordMessageEditor/index.tsx](src/components/DiscordMessageEditor/index.tsx#L197)) calls `validateEmbedCharacterCount(embeds)` and renders the error on lines 324/364-365 with a red border and text. There is **no analogous call** for V2 component text aggregate.

### Finding 4: The send page gates on validateMessage() — which misses this

**Verified** — [src/app/message/m/[id]/send/page.tsx](src/app/message/m/[id]/send/page.tsx#L158) computes `isMessageValid = message && !validateMessage(message.data)`, which controls the Send button's `allowSave` state. Since `validateMessage()` has no V2 aggregate text check, oversize V2 messages pass local validation and fail only at Discord's API.

### Finding 5: Zod schema validates per-field only

**Verified** — `discordMessageShape` in [src/server/api/utils/shapes.ts](src/server/api/utils/shapes.ts#L62) enforces `max(4000)` on each `textDisplayShape.content` individually. Zod's `.max()` on each field does not compose to an aggregate constraint. A Zod `.superRefine()` or `.refine()` on the top-level `components` array would be needed for aggregate validation.

### Finding 6: Text Displays appear in multiple structural positions

**Verified** — Text Displays can appear at:
1. **Top-level**: `components[n]` where `type === 10`
2. **Inside Sections**: `components[n].components[m]` where parent `type === 9`, child `type === 10`
3. **Inside Containers**: `components[n].components[m]` where parent `type === 17`, and the child is either a top-level TextDisplay or nested inside a Section within the Container.

Any aggregate counting function must recursively walk: top-level → containers → sections to collect all Text Display content.

### Finding 7: The per-field limit constant may be confusingly dual-purpose

**Verified** — `MAX_TEXT_DISPLAY_CONTENT_LENGTH = 4000` currently represents the per-field max. The aggregate limit is coincidentally the same value (4,000). A new constant (e.g., `MAX_COMPONENTS_DISPLAYABLE_TEXT`) would reduce ambiguity and allow independent tuning if Discord changes either limit.

## Affected Locations Summary

| #   | File                                                                                                                                                                               | What                          | Current State                                                                |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ---------------------------------------------------------------------------- |
| 1   | [src/constants/index.ts](src/constants/index.ts#L63)                                                                                                                               | Constants                     | Has per-field constant only; needs aggregate constant                        |
| 2   | [src/utils/limits.tsx](src/utils/limits.tsx#L27-L39)                                                                                                                               | `validateEmbedCharacterCount` | Embed-only; needs a V2 equivalent function                                   |
| 3   | [src/utils/limits.tsx](src/utils/limits.tsx#L109-L122)                                                                                                                             | `validateMessage`             | Calls embed check but not V2 text check                                      |
| 4   | [src/components/DiscordMessageEditor/index.tsx](src/components/DiscordMessageEditor/index.tsx#L197)                                                                                | Editor UI aggregate warning   | Shows `embedCharacterError`; needs analogous `v2TextError`                   |
| 5   | [src/server/api/utils/shapes.ts](src/server/api/utils/shapes.ts#L62)                                                                                                               | Zod schema                    | Per-field only; no aggregate `.refine()`                                     |
| 6   | [src/server/api/utils/__tests__/shapes-v2.test.ts](src/server/api/utils/__tests__/shapes-v2.test.ts#L195)                                                                          | Tests                         | Has per-field 4000 test; needs aggregate test                                |
| 7   | [src/components/DiscordMessageEditor/components/ComponentEditors/TextDisplayEditor.tsx](src/components/DiscordMessageEditor/components/ComponentEditors/TextDisplayEditor.tsx#L31) | Per-field limit display       | Currently shows per-field remaining; may optionally show aggregate remaining |

## Analysis Recommendations

1. **Trace aggregate counting logic**: Implement a recursive `countDisplayableText(components)` function that walks all component nesting (top-level → container → section → text display) and sums `content.length`. Verify it covers all three structural positions identified in Finding 6.
2. **Test with the user's exact payload**: The provided JSON has ~6,200+ characters of Text Display content across many components. Confirm the new function correctly rejects it while accepting messages at exactly 4,000 characters.
3. **Verify whether `description` fields on thumbnails/media gallery items count**: The Discord error says "displayable text size" — it's unclear whether `description` on `Thumbnail` or `MediaGalleryItem` contributes. The user's payload doesn't use descriptions, so this remains an open question. A POC test could be run against the Discord API with descriptions to confirm.

## Open Questions

1. **Do Thumbnail/MediaGallery `description` fields contribute to the "displayable text size"?** The Discord error is vague. Only `TextDisplay.content` is confirmed by the user's reproduction case. Testing against the Discord API with `description` fields populated would close this.
2. **Does the per-field limit remain 4,000 independently, or is it subsumed by the aggregate?** Currently both are 4,000, which means the per-field limit is redundant if aggregate is enforced. If Discord later changes the per-field limit, having both constants would matter.
3. **Should the per-field remaining-character indicator account for aggregate remaining?** E.g., if 3,800 chars are already consumed by other Text Displays, a new field should show 200 remaining rather than 4,000. This is a UX decision, not a validation gap.
