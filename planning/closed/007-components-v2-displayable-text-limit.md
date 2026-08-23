---
ID: 7
Origin: 7
UUID: d4e8a1c3
Status: Released
Target Release: N/A (no versioning configured; bug-fix release)
Epic Alignment: Components V2 validation completeness
---

# Plan 007 — Components V2 Aggregate Displayable Text Limit

## Changelog

| Date       | Change                                                      |
| ---------- | ----------------------------------------------------------- |
| 2026-04-09 | UAT Approved — APPROVED FOR RELEASE                         |
| 2026-04-09 | QA Complete — 244/244 tests pass, 16 QA tests added         |
| 2026-04-09 | Code review APPROVED_WITH_COMMENTS (1 medium, 4 low)        |
| 2026-04-09 | Implementation started                                      |
| 2026-04-09 | Revised per Critique 007: M1 (Zod placement), M2 (V2 guard) |
| 2026-04-09 | Initial plan created from Analysis 007                      |

## Value Statement and Business Objective

**As a** Hooks.gg user composing Components V2 messages, **I want** the editor to warn me when my total Text Display content exceeds Discord's 4,000-character aggregate limit, **so that** I can fix my message before sending rather than encountering an opaque API error.

## Success Criteria

- Messages whose combined Text Display `content` exceeds 4,000 characters are blocked from sending with a clear error message.
- The editor displays a visible aggregate character-count warning (mirroring the existing embed character-count warning) when editing V2 messages.
- The Zod schema rejects payloads exceeding the aggregate limit on the server (save/import path).
- All three nesting positions (top-level, inside sections, inside containers) are counted.

## Assumptions

1. Discord's "displayable text size" limit of 4,000 counts only `TextDisplay.content` fields. Thumbnail/MediaGalleryItem `description` fields are assumed **not** to count, based on the user's reproduction case. If this assumption is wrong, the counting function can be extended with no structural change.
2. The per-field limit (4,000 per individual Text Display) and the aggregate limit (4,000 across all Text Displays) are **independently enforced** by Discord. Both validations should remain.
3. The existing pattern — `validateEmbedCharacterCount()` returning an error string, consumed by both `validateMessage()` and the editor UI directly — is the correct pattern to follow for the V2 equivalent.

## Open Questions

- `OPEN QUESTION [CLOSED]`: **Do `description` fields count?** Assumed no per Assumption 1. Can be revisited if a user report contradicts this.

---

## Plan

### Milestone 1: Constants

**Objective**: Add a named constant for the aggregate displayable text limit.

**File**: `src/constants/index.ts`

**Tasks**:
1. Add `MAX_COMPONENTS_DISPLAYABLE_TEXT = 4000` as a new constant alongside the existing `MAX_TEXT_DISPLAY_CONTENT_LENGTH`. Both constants happen to share the same value but represent different constraints (per-field vs aggregate).

**Acceptance**:
- New constant is exported and available for import.
- Existing `MAX_TEXT_DISPLAY_CONTENT_LENGTH` is unchanged (per-field limit remains in place).

---

### Milestone 2: Aggregate Counting and Validation Function

**Objective**: Create a function that recursively sums all Text Display `content.length` values across the component tree and returns an error string if the aggregate exceeds the limit.

**File**: `src/utils/limits.tsx`

**Tasks**:
1. Import the new `MAX_COMPONENTS_DISPLAYABLE_TEXT` constant.
2. Create a new exported function (modeled after `validateEmbedCharacterCount`) that:
   - Accepts the components array (the same type `validateMessage` already receives).
   - Walks the component tree recursively across all three nesting levels identified in Analysis Finding 6:
     - Top-level Text Displays (`type === 10`)
     - Text Displays inside Sections (`type === 9` → `.components[]` → `type === 10`)
     - Text Displays inside Containers (`type === 17` → `.components[]` → recurse into the above two)
   - Sums `content.length` for every Text Display found.
   - Returns an error string if the sum exceeds `MAX_COMPONENTS_DISPLAYABLE_TEXT`, or empty string otherwise.
3. Wire the new function into `validateMessage()`: after the existing `validateEmbedCharacterCount` call, call the new function **unconditionally** on the `components` array. Classic ActionRows contain only buttons (no Text Displays), so the sum is always 0 — no V2 guard is needed. This matches the `validateEmbedCharacterCount` pattern, which also runs unconditionally. Return its error if non-empty.

**Acceptance**:
- `validateMessage()` returns an error string for messages whose aggregate Text Display content exceeds 4,000 characters.
- The send page (`isMessageValid` gate) now correctly blocks oversize V2 messages.

---

### Milestone 3: Editor UI Aggregate Warning

**Objective**: Display an aggregate character-count error in the editor UI for V2 messages, mirroring the embed character error.

**File**: `src/components/DiscordMessageEditor/index.tsx`

**Tasks**:
1. Import the new validation function from `~/utils`.
2. Compute the V2 displayable text error from the `components` array (analogous to line 197's `embedCharacterError`).
3. Apply the error border to the components section when `v2TextError` is truthy. The existing `embedCharacterError` controls the border on the `.discord-visualizer__accessories` div — the V2 error should use the same pattern on the same wrapper (both are mutually exclusive due to mode switching, so they can coexist on the same element).
4. Render the V2 error text below the components area (analogous to the `embedCharacterError` text rendered via `NullableComponent`).

**Acceptance**:
- When editing a V2 message, if aggregate Text Display content exceeds 4,000, a red error message appears below the component list.
- The error border wraps the components area.
- No UI change occurs in classic mode.

---

### Milestone 4: Zod Schema Aggregate Refinement

**Objective**: Add server-side aggregate validation to the Zod schema so that save/import paths also reject oversize payloads.

**File**: `src/server/api/utils/shapes.ts`

**Tasks**:
1. Import `MAX_COMPONENTS_DISPLAYABLE_TEXT` from constants.
2. Add a **top-level** `.superRefine()` on the `discordMessageShape` **object** (not on the individual `components` field). The refinement should:
   - Read the parsed `components` array from the data argument.
   - Walk the component tree using the same recursive logic as the client-side function (the implementer may extract shared logic or duplicate the walk — their choice).
   - Sum all Text Display `content.length` values.
   - Add a Zod issue at the `components` path if the sum exceeds `MAX_COMPONENTS_DISPLAYABLE_TEXT`.

   **Why top-level**: `discordMessageImportShape` uses `.extend()` to **replace** the `components` field entirely with a `z.preprocess()` wrapper. In Zod, `.extend()` overrides per-field definitions, so any refinement attached to the `components` field would be lost on the import shape. A top-level `.superRefine()` on the object survives `.extend()` and is inherited by all derived shapes (`discordMessageImportShape`, `messageShape`, `optionalIdMessageShape`, etc.).

3. Verify that `discordMessageImportShape.safeParse()` inherits the refinement and correctly rejects oversize payloads. This should work automatically given the top-level placement.

**Acceptance**:
- `discordMessageShape.safeParse()` rejects a payload with aggregate Text Display content > 4,000.
- `discordMessageImportShape.safeParse()` also rejects (inherits the top-level refinement).
- Payloads at exactly 4,000 aggregate characters pass.
- The `satisfies z.ZodType<MessageData>` constraint still compiles (`.superRefine()` does not change the output type).

---

### Milestone 5: Tests

**Objective**: Add test coverage for the aggregate limit across all validation layers.

**File**: `src/server/api/utils/__tests__/shapes-v2.test.ts` (Zod tests), `src/utils/__tests__/` (client validation tests — new or existing file)

**Tasks**:
1. **Zod schema tests** (in `shapes-v2.test.ts`):
   - Test: Multiple Text Displays whose individual content is under 4,000 but whose sum exceeds 4,000 → rejected.
   - Test: Multiple Text Displays whose sum is exactly 4,000 → accepted.
   - Test: Text Displays nested inside Sections → summed correctly.
   - Test: Text Displays nested inside Containers (including Sections within Containers) → summed correctly.
   - Test: Single Text Display at 4,001 → still rejected by per-field limit (existing test, verify not broken).
   - Test: `discordMessageImportShape` also rejects aggregate > 4,000 (verifies top-level `.superRefine()` inheritance through `.extend()`).

2. **Client validation tests** (new file or added to `mutual-exclusivity.test.ts`):
   - Test: The new aggregate validation function returns an error when total exceeds 4,000.
   - Test: `validateMessage()` returns an error for a V2 message with aggregate > 4,000.
   - Test: `validateMessage()` returns empty string for a V2 message with aggregate ≤ 4,000.

**Acceptance**:
- All new tests pass.
- All existing tests continue to pass (no regressions).

---

## Testing Strategy

- **Unit tests**: The aggregate counting function, `validateMessage()`, and Zod schema each get targeted tests covering boundary values (exactly 4,000 vs 4,001) and all nesting positions.
- **Integration**: The existing `validateMessage()` integration through the send page's `isMessageValid` gate ensures end-to-end blocking. No additional E2E test is needed for this change.
- **Manual verification**: Reproduce the exact payload from the user report in the editor; confirm the aggregate error appears and the Send button is disabled.

## Risks

| Risk                                                        | Mitigation                                                                                                                                            |
| ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `description` fields actually count toward displayable text | Counting function is structured to be easily extended to include descriptions. If a user reports this, a follow-up one-line change adds those fields. |
| Recursive walk misses a nesting level                       | Tests explicitly cover all three nesting positions (top-level, section, container-with-section).                                                      |
| `discordMessageImportShape` doesn't inherit the refinement  | Addressed: refinement is placed as a top-level `.superRefine()` on the object, which survives `.extend()`. Milestone 4 includes a verification step.  |

## Validation & Handoff

- Run `pnpm test` (Vitest) — all tests pass.
- Run `pnpm build` — build succeeds with no type errors.
- Manually test the user's exact payload in the editor — aggregate error appears, Send is blocked.
- Commit message: `fix: add aggregate displayable text limit for Components V2 messages`
