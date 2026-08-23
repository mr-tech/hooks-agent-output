---
ID: 1
Origin: 1
UUID: a3f7c9e2
Status: Released
---

# Implementation 001 — Discord Components V2 State Management

## Plan Reference

[001-components-v2-state-management.md](../planning/001-components-v2-state-management.md) Rev 5 (Milestones 7–10)

## Date

2026-04-01

## Changelog

| Date       | Handoff       | Request                        | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------- | ------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 2026-04-01 | Planner→Impl  | Initial implementation         | All 6 milestones implemented. 13 of 14 items complete.                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 2026-04-01 | Reviewer→Impl | Code review remediation        | Fixed 3 HIGH, 6 MEDIUM, 1 LOW findings. Deleted dead `componentTranslation.ts`, extracted shared embed schema, hoisted V2_TYPES, fixed empty container edge case, threaded canAddChild to ContainerEditor, added IS_COMPONENTS_V2_FLAG literal type, made injectComponentKeys non-mutating, removed items overcounting, fixed isValidUrl to require protocol, cached JSON.parse in NewMessageJsonInput.                                                                                                                  |
| 2026-04-01 | Reviewer→Impl | Second code review remediation | Fixed 3 MEDIUM + 1 LOW: removed dead `deleteChild` in ContainerEditor, DRY-ified `discordMessageImportShape` via `.extend()`, fixed accessory mutation in `injectComponentKeys`, added Section accessory counting in `countTotalComponents`. Corrected implementation doc file references.                                                                                                                                                                                                                               |
| 2026-04-02 | QA→Impl       | QA UI bug fix                  | Fixed 2 visual bugs: invalid Tailwind class names across 9 files, min-height overlap on ComponentEditor. Added 3 missing color tokens to tailwind.config.js.                                                                                                                                                                                                                                                                                                                                                             |
| 2026-04-03 | Planner→Impl  | M7–M10 mutual exclusivity      | Implemented Classic/V2 mode toggle, confirmation dialogs, PATCH warning, defense-in-depth stripping, JSON import mode detection, mutual exclusivity validation. 12 plan items (15–26). 32 new TDD tests + 107 total passing. 0 production TS errors.                                                                                                                                                                                                                                                                     |
| 2026-04-03 | Reviewer→Impl | M7–M10 code review remediation | Fixed 6 findings (1 HIGH, 3 MEDIUM, 2 LOW). CR-1: replaced `useConfirmation()` with `use(ConfirmationContext)` null-safe pattern to prevent crash in preview/modal contexts. CR-3: extracted `validateContentRequirements()` to eliminate IIFE duplication. CR-4: centralized V2 type values in `~/constants` (single source of truth). CR-6: used `messageRef.current` in `handleModeSwitch` to eliminate stale closure. CR-2: removed redundant `useCallback` wrapper. CR-5: added intent comment to `useEffect` deps. |
| 2026-04-03 | Reviewer→Impl | Post-remediation code review   | Fixed 3 LOW findings: CR-R1: removed unused `genUuid` import from DiscordMessageEditor. CR-R2: added `_setMessage` to `handleModeSwitch` `useCallback` deps for exhaustive-deps correctness. CR-R4: added clarifying comment to `NewMessageJsonInput` explaining why `detectedMode` is intentionally unused. CR-R3 (INFO) required no code change.                                                                                                                                                                       |

## Implementation Summary

### Milestones 1–6 (Rev 3)

Stabilized the Discord Components V2 state management system by fixing critical bugs (rekey, send path, constants), adding the `IS_COMPONENTS_V2_FLAG` to the send/save pipeline, creating a lenient import schema, adding validation feedback, and establishing i18n source strings.

**How this delivers value**: Users can reliably create, edit, save, send, and import/paste messages containing Discord Components V2 (Section, TextDisplay, Thumbnail, MediaGallery, File, Separator, Container, ActionRow). The send path correctly strips internal `_key` values and sets the required `flags: 32768` for Discord API compliance. Import flows gracefully handle unsupported component types instead of rejecting the entire message.

### Milestones 7–10 (Rev 5)

Implemented mutual exclusivity enforcement between Classic (content/embeds) and Components V2 (components-only) message modes. Added an explicit `messageMode` state to the editor, a segmented toggle UI for switching modes, confirmation dialogs when switching modes with existing data, a permanent V2 flag warning on PATCH edits, defense-in-depth stripping of embeds/content in `stripKeys()`, auto-detection of mode from JSON imports, and mutual exclusivity validation in `validateMessage()`.

**How this delivers value**: Users are protected from accidentally sending embeds or content alongside V2 components (Discord silently drops them). The mode toggle makes the distinction explicit. Confirmation dialogs prevent accidental data loss. The PATCH warning communicates the irreversible nature of the V2 flag. Defense-in-depth in `stripKeys()` and `validateMessage()` ensures correctness even if the UI state is bypassed.

## Milestones Completed

- [x] M1: Stabilization — rekey fix, constants correction, container nesting verification, tsc baseline
- [x] M2: Send flow fix — flags in type/schema/stripKeys, send path through stripKeys
- [x] M3: Preview rendering QA — all editors verified for `showEdit=false` correctness
- [x] M4: Lenient import schema — unsupported components filtered, not rejected
- [x] M5: Validation error display — URL validation, count indicators
- [x] M6: i18n source strings added, roundtrip verified (code-level)
- [x] M7: Classic/V2 mode state & UI toggle — `messageMode` in `useEditableState`, auto-detect on load, segmented toggle, editor section gating
- [x] M8: Mode switch confirmation & data clearing — departing data detection, confirmation dialog via `ConfirmationProvider`, data clearing preserving legacy ActionRows and metadata
- [x] M9: Permanent V2 flag warning on PATCH — persistent warning derived from message data (not editableState), visible on edit page
- [x] M10: Defense-in-depth data stripping — `stripKeys()` strips embeds/content when V2, JSON import mode detection, `validateMessage()` mutual exclusivity check

## Files Modified

| Path                                                                                     | Changes                                                                                                                                                                                                           | Notes                                                                                            |
| ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `src/utils/index.ts`                                                                     | Exported `injectComponentKeys`, added `rekeyComponent()`, updated `stripKeys()` with V2 flags                                                                                                                     | `V2_COMPONENT_TYPES` hoisted to module scope; `injectComponentKeys` spreads input (non-mutating) |
| `src/components/DiscordMessageEditor/index.tsx`                                          | Replaced `rekey()` with `rekeyComponent()`, added `countTotalComponents()`, switched to `components.map()`, added component count display, passes `canAddChild`                                                   | Media gallery items no longer counted toward total                                               |
| `src/constants/index.ts`                                                                 | Replaced `MAX_TOP_LEVEL_COMPONENTS=5` and `MAX_CONTAINER_CHILDREN=10` with `MAX_TOTAL_COMPONENTS=40`                                                                                                              | `IS_COMPONENTS_V2_FLAG` typed as literal `32768`                                                 |
| `src/server/api/utils/shapes.ts`                                                         | Updated imports, removed `.max(MAX_CONTAINER_CHILDREN)`, replaced `MAX_TOP_LEVEL_COMPONENTS` with `MAX_TOTAL_COMPONENTS`, added `flags` field, added `discordMessageImportShape` with `filterSupportedComponents` | Shared `embedShape` eliminates DRY violation; `filterSupportedComponents` drops empty containers |
| `src/@types/global.d.ts`                                                                 | Added `flags?: number` to `MessageData`                                                                                                                                                                           |                                                                                                  |
| `src/app/message/m/[id]/send/page.tsx`                                                   | Added `stripKeys` import, wrapped `message.data` with `stripKeys()` before `sendWebhook()`                                                                                                                        | Critical send-path fix                                                                           |
| `src/app/message/_components/NewMessageJsonInput.tsx`                                    | Switched from `discordMessageShape` to `discordMessageImportShape`                                                                                                                                                | Cached `JSON.parse` result                                                                       |
| `src/app/message/m/[id]/_components/JsonModalBody.tsx`                                   | Switched from `discordMessageShape` to `discordMessageImportShape`                                                                                                                                                | Lenient import                                                                                   |
| `src/components/DiscordMessageEditor/components/ComponentEditors/ContainerEditor.tsx`    | Removed `MAX_CONTAINER_CHILDREN` import and guard, accepts `canAddChild` prop                                                                                                                                     | Global 40-component limit enforced                                                               |
| `src/components/DiscordMessageEditor/components/ComponentEditors/LinkButtonEditor.tsx`   | Added URL validation error display (empty + invalid)                                                                                                                                                              | Uses `isValidUrl` (now requires protocol)                                                        |
| `src/components/DiscordMessageEditor/components/ComponentEditors/ActionRowEditor.tsx`    | Added button count indicator                                                                                                                                                                                      | `{count}/{MAX_ACTION_ROW_BUTTONS}`                                                               |
| `src/components/DiscordMessageEditor/components/ComponentEditors/ComponentEditor.tsx`    | Dispatches to component sub-editors                                                                                                                                                                               | Threads `canAddChild` to ContainerEditor                                                         |
| `src/utils/isValidUrl.tsx`                                                               | URL regex now requires `https?://` protocol                                                                                                                                                                       | Aligns with Zod `z.string().url()` validation                                                    |
| `src/components/DiscordMessageEditor/components/ComponentEditors/MediaGalleryEditor.tsx` | Added item count indicator, wrapped in fragment                                                                                                                                                                   | `{count}/{MAX_MEDIA_GALLERY_ITEMS}`                                                              |
| `src/components/DiscordMessageEditor/components/ComponentEditors/SectionEditor.tsx`      | Added text component count indicator                                                                                                                                                                              | `{count}/{MAX_SECTION_TEXT_COMPONENTS}`                                                          |
| `lang/src/en-US/main.json`                                                               | Added `components` section with all editor strings                                                                                                                                                                | Source for i18n                                                                                  |
| `src/lang/generated/en-US.json`                                                          | Regenerated                                                                                                                                                                                                       | Output of `pnpm lang`                                                                            |
| `src/lang/generated/fr.json`                                                             | Regenerated                                                                                                                                                                                                       | Output of `pnpm lang`                                                                            |
| `src/lang/generated/types.ts`                                                            | Regenerated with `components` interface                                                                                                                                                                           | Output of `pnpm lang`                                                                            |

### Files Modified (Milestones 7–10)

| Path                                                   | Changes                                                                                                                                                                                                                                                                                                                        | Notes                                                                |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| `src/@types/global.d.ts`                               | Added `type MessageMode = 'classic' \| 'v2'`. Extended `EditableState` with `messageMode: MessageMode` and `setMessageMode: (mode: MessageMode) => void`                                                                                                                                                                       | M7 items 15–16                                                       |
| `src/providers/MessageProvider/useEditableState.ts`    | Added `useState<MessageMode>('classic')` for `setMessageMode`. Added both to `useMemo` return and dep array. **CR-2**: Removed redundant `useCallback` wrapper — `useState` setter is already stable                                                                                                                           | M7 item 15. Remains a zero-argument hook                             |
| `src/providers/MessageProvider/index.tsx`              | Extracted `editableState` from inline state object. Added `useEffect` watching `message?.id` to auto-detect mode. **CR-5**: Added intent comment explaining `[message?.id]` dep choice                                                                                                                                         | M7 item 17. Auto-detect mode on message load                         |
| `src/components/DiscordMessageEditor/index.tsx`        | Mode gating, segmented toggle, `handleModeSwitch`, `visibleComponents` filter. **CR-1**: Replaced `useConfirmation()` with `use(ConfirmationContext)` null-safe pattern. **CR-3**: Replaced IIFE with `validateContentRequirements(message)`. **CR-6**: Used `messageRef.current` in `handleModeSwitch` to avoid stale closure | M7–M8 items 18–22. Heaviest change                                   |
| `src/app/message/m/[id]/send/page.tsx`                 | Added `hasV2Components` import, `messageHasV2` derived from data, `showV2PatchWarning` flag, persistent warning `<ContainerSection>`. Inverted `validateMessage` check (`!validateMessage()`)                                                                                                                                  | M9 item 23, M10 item 26 caller update                                |
| `src/utils/index.ts`                                   | Exported `V2_COMPONENT_TYPES` (now constructed from `~/constants` import). Added `hasV2Components()`, `hasClassicContent()`, `hasV2Content()`, `enforceImportMutualExclusivity<T>()`. Defense-in-depth in `stripKeys()`                                                                                                        | M10 items 24–25. **CR-4**: Single source of truth for V2 type values |
| `src/utils/limits.tsx`                                 | Rewrote `validateMessage()`: return type `boolean` → `string`. **CR-3**: Extracted `validateContentRequirements()` for reuse. **CR-4**: `V2_TYPES` constructed from `~/constants` import                                                                                                                                       | M10 item 26                                                          |
| `src/constants/index.ts`                               | **CR-4**: Added `V2_COMPONENT_TYPE_VALUES` array as single source of truth for V2 component type IDs `[9, 10, 11, 12, 13, 14, 17]`                                                                                                                                                                                             | Consumed by `utils/index.ts` and `utils/limits.tsx`                  |
| `src/app/message/_components/NewMessageJsonInput.tsx`  | Added `enforceImportMutualExclusivity` import. Calls it on raw parsed JSON before Zod parse                                                                                                                                                                                                                                    | M10 item 25                                                          |
| `src/app/message/m/[id]/_components/JsonModalBody.tsx` | Added `enforceImportMutualExclusivity` import, destructured `editableState` from `useMessage()`. Calls enforcement + `setMessageMode(detectedMode)` on Load                                                                                                                                                                    | M10 item 25                                                          |
| `src/utils/__tests__/components-v2-data-layer.test.ts` | Updated roundtrip test: expects `content` and `embeds` to be `undefined` after `stripKeys()` when V2 components present                                                                                                                                                                                                        | Aligned with M10 item 24 defense-in-depth behavior                   |

## Files Deleted

| Path                                | Reason                                                                                                                                                           |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/utils/componentTranslation.ts` | Dead code — 337 lines, never imported in `src/`. Component transformation handled by `injectComponentKeys`/`stripComponentKeys`/`stripKeys` in `utils/index.ts`. |

## Files Created

| Path                                                                                     | Purpose                                                       |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `src/components/DiscordMessageEditor/components/ComponentEditors/ComponentEditor.tsx`    | Top-level component dispatch editor                           |
| `src/components/DiscordMessageEditor/components/ComponentEditors/ContainerEditor.tsx`    | Container component editor                                    |
| `src/components/DiscordMessageEditor/components/ComponentEditors/FileEditor.tsx`         | File component editor                                         |
| `src/components/DiscordMessageEditor/components/ComponentEditors/LinkButtonEditor.tsx`   | Link button popover form                                      |
| `src/components/DiscordMessageEditor/components/ComponentEditors/MediaGalleryEditor.tsx` | Media gallery component editor                                |
| `src/components/DiscordMessageEditor/components/ComponentEditors/SectionEditor.tsx`      | Section component editor (includes accessory switcher inline) |
| `src/components/DiscordMessageEditor/components/ComponentEditors/SeparatorEditor.tsx`    | Separator component editor (includes spacing select inline)   |
| `src/components/DiscordMessageEditor/components/ComponentEditors/TextDisplayEditor.tsx`  | Text display component editor                                 |
| `src/components/DiscordMessageEditor/components/ComponentEditors/ThumbnailEditor.tsx`    | Thumbnail component editor                                    |
| `src/components/DiscordMessageEditor/components/ComponentEditors/ExternalLinkIcon.tsx`   | SVG icon for link buttons                                     |
| `src/components/DiscordMessageEditor/types/components.ts`                                | Component factory functions and ComponentActions type         |
| `src/utils/__tests__/mutual-exclusivity.test.ts`                                         | TDD tests for mutual exclusivity (32 tests)                   |

## Code Quality Validation

- [x] `tsc --noEmit` passes (verified 8 times throughout implementation)
- [x] No new TypeScript errors introduced
- [x] ESLint not run (pre-existing broken state, not a verification gate per plan)
- [x] No circular dependencies introduced (`V2_COMPONENT_TYPES` hoisted to module scope)
- [x] Code review findings remediated (3 HIGH, 6 MEDIUM, 1 LOW fixed)

## Value Statement Validation

**Original (Rev 5)**: "As a Hooks.gg user, I want the editor to clearly separate Classic mode (content/embeds) from Components V2 mode with an explicit toggle and appropriate warnings, so that my embeds and content are never silently dropped when sending, and I understand that converting a live Discord message to V2 is irreversible."

**Implementation delivers**: Yes. The segmented toggle clearly separates Classic and V2 editing. Confirmation dialogs warn before data-clearing mode switches. The PATCH warning explicitly communicates V2 flag permanence. Defense-in-depth in `stripKeys()` ensures embeds/content never accompany the V2 flag. `validateMessage()` catches any remaining mixed state. JSON imports auto-detect mode and strip conflicting data.

## TDD Compliance

### Milestones 1–6

No test framework was configured at the time of M1–M6 implementation. TDD was deferred.

| Function/Class                | Test File               | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
| ----------------------------- | ----------------------- | ------------------- | ----------------- | -------------- | ---------------- |
| `rekeyComponent()`            | N/A (no test framework) | ❌ Deferred          | ❌ Deferred        | N/A            | Verified via tsc |
| `countTotalComponents()`      | N/A (no test framework) | ❌ Deferred          | ❌ Deferred        | N/A            | Verified via tsc |
| `filterSupportedComponents()` | N/A (no test framework) | ❌ Deferred          | ❌ Deferred        | N/A            | Verified via tsc |
| `discordMessageImportShape`   | N/A (no test framework) | ❌ Deferred          | ❌ Deferred        | N/A            | Verified via tsc |

### Milestones 7–10

Vitest configured since QA pass. Full TDD cycle executed: 32 tests written first → 29 failed as expected (3 passed for existing `stripKeys` behavior) → implementation → all 32 green.

| Function/Class                     | Test File                    | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
| ---------------------------------- | ---------------------------- | ------------------- | ----------------- | -------------- | ---------------- |
| `hasV2Components()`                | `mutual-exclusivity.test.ts` | ✅ Yes               | ✅ Yes             | ImportError    | ✅ Yes            |
| `hasClassicContent()`              | `mutual-exclusivity.test.ts` | ✅ Yes               | ✅ Yes             | ImportError    | ✅ Yes            |
| `hasV2Content()`                   | `mutual-exclusivity.test.ts` | ✅ Yes               | ✅ Yes             | ImportError    | ✅ Yes            |
| `stripKeys()` defense-in-depth     | `mutual-exclusivity.test.ts` | ✅ Yes               | ✅ Yes             | AssertionError | ✅ Yes            |
| `validateMessage()` mutual excl.   | `mutual-exclusivity.test.ts` | ✅ Yes               | ✅ Yes             | AssertionError | ✅ Yes            |
| `enforceImportMutualExclusivity()` | `mutual-exclusivity.test.ts` | ✅ Yes               | ✅ Yes             | ImportError    | ✅ Yes            |

## Test Coverage

### Unit Tests

| Test File                                              | Tests | Focus                                                                                                       |
| ------------------------------------------------------ | ----- | ----------------------------------------------------------------------------------------------------------- |
| `src/utils/__tests__/mutual-exclusivity.test.ts`       | 32    | `hasV2Components`, `hasClassicContent`, `hasV2Content`, `stripKeys` defense, `validateMessage` mutual excl. |
| `src/utils/__tests__/components-v2-data-layer.test.ts` | 32    | Key injection/stripping, roundtrip, flag computation, `enforceImportMutualExclusivity`                      |
| `src/utils/__tests__/isValidUrl.test.ts`               | 10    | URL validation                                                                                              |
| `src/server/api/utils/__tests__/shapes-v2.test.ts`     | 33    | Zod schema validation for V2 components                                                                     |

### Integration Tests

No integration tests. tRPC save/load cycle requires database.

## Test Execution Results

| Command                                                      | Result                | Issues |
| ------------------------------------------------------------ | --------------------- | ------ |
| `npx vitest run`                                             | 107/107 pass, 4 files | None   |
| `npx tsc --noEmit \| grep 'error TS' \| grep -v '__tests__'` | 0 errors              | None   |

## Outstanding Items

### Incomplete

1. **M6 Item 13 — i18n consumer integration**: Source strings added but no consumer hook exists. Separate effort.
2. **M11 Item 27 — Version management**: `package.json` version bump and CHANGELOG entry for mutual exclusivity work. Deferred to DevOps/release.

### Deferred

3. **M1 Item 1 — Separate unrelated commits**: Git workflow step. Unrelated changes should be committed separately.

### Design Decisions

4. **V2 type values centralized in `~/constants`**: `V2_COMPONENT_TYPE_VALUES` array in `~/constants/index.ts` is the single source of truth. Both `V2_COMPONENT_TYPES` in `utils/index.ts` and `V2_TYPES` in `limits.tsx` construct their Sets from this shared array. No circular import issue since `constants/` does not import from `utils/`.
5. **PATCH warning derives from data, not editableState**: `showV2PatchWarning` on the send page uses `hasV2Components(message.data.components)` rather than `editableState.messageMode`. This prevents desync between the toggle state and the actual payload being sent.
6. **`enforceImportMutualExclusivity` runs before Zod parse**: Mode detection examines raw parsed JSON before `filterSupportedComponents()` in the Zod schema, which could strip V2 types and cause incorrect mode assignment.

## Assumptions

1. **Discord API V2 flag value**: `1 << 15` (32768). Risk: Low.
2. **V2 component types**: `{9, 10, 11, 12, 13, 14, 17}`. Risk: Low.
3. **40 total component limit**: Risk: Low.
4. **V2 flag permanence**: Once set on a Discord message, cannot be removed. Risk: Low (documented by Discord).
5. **Legacy ActionRow (type 1) valid in both modes**: Does not require V2 flag. Risk: Low (confirmed by product owner).

## Next Steps

1. → QA validation of M7–M10
2. → UAT validation
3. → Commit separation (Item 1) before merge
4. → M11 version management at release time
