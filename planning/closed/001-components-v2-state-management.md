---
ID: 1
Origin: 1
UUID: a3f7c9e2
Status: Released
Target Release: TBD
Epic Alignment: Discord Components V2 Support
---

# Plan 001 — Discord Components V2 State Management

## Changelog

| Date       | Rev | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ---------- | --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2025-07-15 | 1   | Initial plan generated. Recommends continuing from prior implementation.                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 2026-04-01 | 2   | **Architecture review corrections.** Removed Milestone 3 (separate preview components — architecturally wrong). Fixed stale Discord API limits (`MAX_TOP_LEVEL_COMPONENTS`, `MAX_CONTAINER_CHILDREN`). Promoted `rekey()` bug fix from Milestone 5 to Milestone 1. Moved flags responsibility from `sendWebhook.ts` to `stripKeys()` transformation. See [architecture findings](../architecture/001-components-v2-architecture-findings.md).                                                                                 |
| 2026-04-01 | 3   | **Critique corrections.** Fixed critical send-path gap: `send/page.tsx` passes `EditableMessageData` directly to `sendWebhook()` without `stripKeys()` — flags would never apply and `_key` values leak. Added explicit send-path stripping to Milestone 2. Clarified Milestone 4 fix point (`NewMessageJsonInput.tsx`, not `fromAPIComponents()`). Promoted container nesting verification to Milestone 1. Closed target release open question. See [critique](../critiques/001-components-v2-state-management-critique.md). |
| 2026-04-03 | 4   | **Mutual exclusivity enforcement.** Added Milestones 7–10 for Classic/V2 mode switch, mode transition warnings, permanent V2 flag warning on PATCH, and defense-in-depth data stripping. Based on [Analysis 002](../analysis/002-embeds-components-v2-mutual-exclusivity.md). All three analysis open questions resolved by product owner. Updated Value Statement, Testing Strategy, Risks, Handoff Notes.                                                                                                                   |
| 2026-04-03 | 5   | **Critique resolution.** Addressed all 5 critique findings. Status set to In Progress for M7–M10 implementation. All 12 plan items (15–26) implemented. 107/107 tests pass. See [implementation doc](../implementation/001-components-v2-state-management.md).                                                                                                                                                                                                                                                                |

## Value Statement and Business Objective

**As a** Hooks.gg user, **I want to** build Discord messages that use the Components V2 layout system (Sections, Containers, Media Gallery, Separator, Text Display, Thumbnail, File, and link-button-only Action Rows), **so that** I can create modern, richly-structured Discord messages using the same WYSIWYG editor I already use for embeds.

**As a** Hooks.gg user, **I want** the editor to clearly separate Classic mode (content/embeds) from Components V2 mode with an explicit toggle and appropriate warnings, **so that** my embeds and content are never silently dropped when sending, and I understand that converting a live Discord message to V2 is irreversible.

## Objective

Add full Components V2 editing, persistence, and sending support to the Hooks.gg message builder, **including mutual exclusivity enforcement between Classic (content/embeds) and V2 (components-only) message modes**. The scope covers:
- Editable/supported type definitions for all V2 component types
- Zod validation schemas
- `_key`-based identity management (inject/strip) through `makeEditable()`/`stripKeys()`
- Component editor UI (all 10 sub-editors)
- API translation layer (`toAPIComponents`/`fromAPIComponents`)
- `IS_COMPONENTS_V2` flag management during send
- Read-only Discord-like preview rendering of V2 components (via existing dual-mode editors, not separate components)
- **Classic/V2 mode toggle** with data-clearing confirmation and irreversible-flag warnings
- **Defense-in-depth stripping** of `content`/`embeds` when `IS_COMPONENTS_V2` flag is set

**Scope restriction**: Only link buttons (`style: 5`, URL-based). No interactive `custom_id` buttons, select menus, or action sets. This dramatically simplifies state while covering the primary use case.

**Discord API constraint (verified)**: Messages sent with the `IS_COMPONENTS_V2` flag (`1<<15`) have `content` and `embeds` silently dropped by Discord. Once a message has been sent with this flag, it cannot be removed from that message. See [Analysis 002](../analysis/002-embeds-components-v2-mutual-exclusivity.md).

---

## Prior Implementation Assessment

A previous agent attempted this work from the prompt at `.github/prompts/plan-discordMessageComponents.prompt.md`. The attempt modified 20 files and created 13 new files (~2,000+ lines of new code). Below is the assessment.

### What Was Completed Successfully

| Area                                                        | Files                            | Status                              |
| ----------------------------------------------------------- | -------------------------------- | ----------------------------------- |
| Global types (`Editable*` and `Supported*` unions)          | `global.d.ts`                    | Complete, correct                   |
| Component constants (limits)                                | `constants/index.ts`             | **Needs correction** — stale limits |
| Zod validation schemas (all V2 types)                       | `shapes.ts`                      | Complete, uses `discriminatedUnion` |
| `makeEditable()`/`stripKeys()` with recursive key injection | `utils/index.ts`                 | Complete                            |
| Factory functions + `ComponentActions` interface            | `types/components.ts`            | Complete                            |
| API translation (`toAPIComponents`/`fromAPIComponents`)     | `componentTranslation.ts`        | Complete (337 lines)                |
| Main editor wiring (state, actions, Add Component menu)     | `DiscordMessageEditor/index.tsx` | Complete                            |
| All 10 component sub-editors                                | `ComponentEditors/*.tsx`         | Complete (1,280 lines)              |
| `useEditableState` toggle for components                    | `useEditableState.ts`            | Complete                            |
| Component preview CSS                                       | `visualizer.scss`                | Complete (285 lines)                |

### What Is Missing or Incomplete

1. **`flags` field not in `MessageData`** — `sendWebhook.ts` sends `MessageData` as `payload_json` but never sets `flags: 1 << 15`. Discord requires this for V2 components. The `getComponentsFlags()` helper exists in `componentTranslation.ts` but is never called.
2. ~~**No read-only preview rendering**~~ **[RESOLVED by architecture review]** — The component editors already handle `showEdit=false` (read-only mode) via the established dual-mode pattern. `MessagePreview` renders through `DiscordMessageEditor` with a no-op `setMessage`. No separate preview components are needed. A CSS/layout verification pass is sufficient.
3. **No lenient import schema** — The prompt mentioned a two-schema pattern (strict for validation, lenient for import/restore) inspired by embed-generator. Only the strict schema exists.
4. **No i18n** — All editor labels are hardcoded English strings. The project uses `lang/src/en-US/` → generated i18n.
5. **`discordMessageShape satisfies z.ZodType<MessageData>`** — This type constraint has been **VERIFIED**: `tsc --noEmit` passes. The Zod `z.literal(2)` and TypeScript `ComponentType.Button` (= `2`) are compatible.

### Unrelated Changes Mixed In

The previous agent also modified files unrelated to Components V2, likely as fixes for build/runtime issues encountered during development:

| File                     | Change                                                 | Risk                       |
| ------------------------ | ------------------------------------------------------ | -------------------------- |
| `Providers.tsx`          | Removed `SSRProviderWrapper`                           | Medium — behavioral change |
| `SSRProviderWrapper.tsx` | Deleted                                                | Medium — coupled to above  |
| `globals.scss`           | CSS reformatting, moved `#arrow` out of `:root`        | Low                        |
| `index.scss`             | `ReactToastify.min.css` → `.css`                       | Low                        |
| `tsconfig.json`          | `jsx: preserve` → `react-jsx`, added `.next/dev/types` | Medium                     |
| `Button.tsx`             | `useMemo` for `mergeRefs`                              | Low — performance fix      |
| `SlateEditor/index.tsx`  | Try/catch around focus logic                           | Low — defensive            |
| `Markdown.tsx`           | `ssr: true` → `ssr: false`                             | Medium — behavioral        |
| `WebhookProvider.tsx`    | Cast fix `Message` → `MessageData`                     | Low — type fix             |
| `hooks/index.ts`         | Fixed `useStateSetter` dependency array                | Low — correctness fix      |
| `.gitignore`             | Added `.github`                                        | Low                        |
| `pnpm-lock.yaml`         | Minor update                                           | Low                        |

### Build Status

- **TypeScript**: `tsc --noEmit` passes cleanly
- **Next.js build**: `next build` succeeds, all routes compile
- **ESLint**: Broken (circular structure error) — **pre-existing**, same error on clean branch

---

## Recommendation: Continue From Existing Implementation

**Decision: Continue, do not `git restore .`.**

**Rationale:**
1. The core data layer (types, Zod schemas, key management, translation utilities) is solidly implemented and correct. TypeScript compilation confirms type safety.
2. All 10 component sub-editors exist and follow the established `useEmbedSetter` pattern correctly.
3. `next build` succeeds — no regressions.
4. Starting fresh would mean re-implementing ~2,000 lines of correctly-written code.
5. The remaining work is incremental: flags management, constants correction, CSS verification, import schema, and cleanup.

**Mitigation for mixed-in changes:**
The implementer should separate unrelated changes into their own commit before the Components V2 commit, so the git history is clean. This is a commit-organization task, not a code task.

---

## Assumptions

1. The DB `data` column (JSONB) requires no migration — `components` is a new optional key in the JSON blob. **Confirmed**: `Messages.data` is `Json` type in Prisma schema.
2. `discord-api-types` V10 already exports all needed V2 component types (`APIContainerComponent`, `APISectionComponent`, etc.). **Confirmed**: checked the workspace copy.
3. ESLint is broken project-wide (pre-existing). Lint validation is not available as a verification gate. The `copilot-instructions.md` notes `eslint.ignoreDuringBuilds: true`.
4. The Zod `satisfies z.ZodType<MessageData>` constraint correctly resolves `z.literal(2)` as compatible with `ComponentType.Button` (both equal `2` at the value level). **VERIFIED**: `tsc --noEmit` passes with the current code.
5. Discord's component limits were raised on April 29, 2025. There is no longer a per-level cap on top-level components. The total limit is 40 components per message. Container children are also uncapped (bounded only by the 40-total limit). The existing constants `MAX_TOP_LEVEL_COMPONENTS = 5` and `MAX_CONTAINER_CHILDREN = 10` are stale and must be corrected.

---

## Plan

### Milestone 1: Stabilize and Separate Existing Work

**Objective**: Isolate unrelated changes from Components V2 work for clean git history.

1. **Separate unrelated fixes into a dedicated commit.** Files: `Providers.tsx`, `SSRProviderWrapper.tsx` (deletion), `globals.scss`, `index.scss`, `tsconfig.json`, `Button.tsx`, `SlateEditor/index.tsx`, `Markdown.tsx`, `WebhookProvider.tsx`, `hooks/index.ts`, `.gitignore`, `pnpm-lock.yaml`.
   - **Acceptance**: One commit containing only non-component changes. Second commit containing only Components V2 changes plus new files.

2. **Verify `satisfies z.ZodType<MessageData>` compiles** with the new `components` field. Run `tsc --noEmit` explicitly after the separation to confirm no type mismatches.
   - **Acceptance**: `tsc --noEmit` exits 0.

3. **Fix `rekey()` to regenerate `_key` values on duplicate.** The current `duplicateComponent` in `DiscordMessageEditor/index.tsx` uses `JSON.parse(JSON.stringify())` which preserves `_key` values, causing React key collisions. After deep-cloning, call `injectComponentKeys()` (from `~/utils/index.ts`) on the clone to regenerate all keys recursively.
   - **Acceptance**: Duplicating a container with nested children results in all-new `_key` values throughout the tree. No React key warnings in console.

4. **Correct stale Discord API limits in `constants/index.ts`.** Per the [April 29, 2025 Discord changelog](https://docs.discord.com/developers/change-log#april-29-2025):
   - Remove `MAX_TOP_LEVEL_COMPONENTS = 5` (Discord removed the per-level cap)
   - Remove `MAX_CONTAINER_CHILDREN = 10` (Discord removed the container children cap)
   - Add `MAX_TOTAL_COMPONENTS = 40` (Discord's total components per message limit)
   - Update `DiscordMessageEditor` UI guard to use `MAX_TOTAL_COMPONENTS` instead of `MAX_TOP_LEVEL_COMPONENTS`. Ideally count total components recursively (top-level + all nested children) against 40.
   - Update Zod schema: `.max(MAX_TOP_LEVEL_COMPONENTS)` → `.max(MAX_TOTAL_COMPONENTS)` on the top-level components array
   - Change pre-allocated action array from `new Array(MAX_TOP_LEVEL_COMPONENTS).fill(...)` to `components.map((_, idx) => ...)` to avoid creating 40 unused objects per render
   - **Acceptance**: Users can add more than 5 top-level components. Containers accept more than 10 children. Total component count enforcement matches Discord's 40-component limit.

5. **Verify nested container prevention (quick check).** Architecture review confirmed both UI and Zod already prevent container-in-container. Verify the `ContainerEditor` does not offer "Container" in its add-component dropdown and the Zod `containerChildShape` discriminated union excludes `containerShape`. This is verification only — no code changes expected.
   - **Acceptance**: Zod rejects `{ type: 17, components: [{ type: 17, ... }] }`. UI does not offer Container as an option inside ContainerEditor.

### Milestone 2: Complete the Send Flow (Flags Management)

**Objective**: Messages with V2 components are sent with the correct `IS_COMPONENTS_V2` flag so Discord renders them properly.

6. **Add optional `flags` field to `MessageData`** in `global.d.ts`. This mirrors Discord's webhook execute payload which accepts `flags`.
   - **Acceptance**: `MessageData` type includes `flags?: number`.

7. **Add `flags` to the Zod `discordMessageShape`** in `shapes.ts` — optional number field.
   - **Acceptance**: `discordMessageShape.parse()` accepts messages with or without `flags`.

8. **Set `flags` during the `stripKeys()` transformation**, not in `sendWebhook.ts`. The flags should be computed and attached to the `MessageData` object before it reaches the send layer. In `stripKeys()` (in `utils/index.ts`), after stripping `_key` values, call `getComponentsFlags(message.components)` and set `message.flags |= result`. `sendWebhook.ts` should simply serialize whatever `MessageData` it receives, including `flags` if present.
   - **Acceptance**: Saving a message with V2 components persists `"flags": 32768` in the data. `sendWebhook.ts` is not modified for flag logic.

9. **Fix the send path to go through `stripKeys()`.** Currently, `send/page.tsx` passes `message.data` (`EditableMessageData`, which contains `_key` values) directly to `sendWebhook()` without stripping. This means (a) `_key` properties leak to the Discord API, and (b) flags computed in `stripKeys()` are never applied to sent messages. The send path must call `stripKeys()` (or an equivalent transformation) before calling `sendWebhook()` so that the message is clean `MessageData` with correct flags.
   - **Acceptance**: `sendWebhook()` receives `MessageData` (no `_key` properties). Messages with V2 components are sent with `"flags": 32768`. The `_key` leak (pre-existing bug) is resolved.

### Milestone 3: Verify Preview Rendering Quality

**Objective**: Confirm that each component editor renders acceptably in read-only mode (`showEdit=false`), fixing any visual issues.

**Architectural context**: The Hooks.gg codebase uses a **single component tree** for both editing and preview. `DiscordMessageEditor` serves as both editor (`showEdit=true`) and preview (`showEdit=false`). `MessagePreview` renders through `DiscordMessageEditor` with `setMessage={() => {}}` (no-op). All component editors already accept and respect the `showEdit` prop — no separate preview components are needed. See [ADR-001 in architecture findings](../architecture/001-components-v2-architecture-findings.md#adr-001-single-component-tree-for-edit--preview).

10. **Visual QA pass on each component editor in read-only mode.** For each of the 10 component types, verify rendering with `showEdit=false`:
   - `TextDisplayEditor` — static Markdown renders correctly (already delegates to `DiscordContentEditor` → `Markdown`)
   - `ActionRowEditor` — link buttons display as styled elements with external link icon
   - `SectionEditor` — text content + thumbnail accessory render side by side
   - `MediaGalleryEditor` — images display in grid layout, spoiler blur works
   - `FileEditor` — file display with icon renders correctly
   - `SeparatorEditor` — divider line renders with correct spacing
   - `ContainerEditor` — bordered wrapper with accent color renders, children render recursively
   - `ThumbnailEditor` — image display renders at correct size
   - `ComponentEditor` — toolbar (duplicate/delete/move) is hidden

   Fix any CSS issues found (padding, hidden content, broken layouts). Reference the CSS already in `visualizer.scss` (285 lines).

   - **Acceptance**: Each V2 component type renders a recognizable Discord-like preview when `showEdit=false`. No editing controls visible. `MessagePreview` correctly renders messages with mixed embeds + V2 components.

### Milestone 4: Import/Restore Support (Lenient Schema)

**Objective**: Users can paste Discord API JSON containing V2 components, and the app gracefully parses supported types while dropping unsupported ones.

**Context**: `fromAPIComponents()` in `componentTranslation.ts` already drops unsupported component types (its `switch` returns `null` for unknown types, filtered out by `.filter()`). The actual problem is upstream: `NewMessageJsonInput.tsx` calls `discordMessageShape.parse()` (the strict Zod schema) **before** the data ever reaches `fromAPIComponents()`. The strict schema rejects unknown component types at the Zod level, so the existing lenient translation code is never reached.

11. **Create a lenient validation schema** in `shapes.ts` (or a separate file) for use in the JSON import/paste flow. This schema:
    - Accepts the overall message structure but does not reject the whole message if an unsupported component type appears in the `components` array
    - Uses `z.preprocess` or `z.transform` to filter out unsupported component types (interactive buttons, select menus) rather than failing validation
    - Replaces `discordMessageShape.parse()` in `NewMessageJsonInput.tsx` (and any similar import entry points) so that pasted JSON passes Zod validation and reaches `fromAPIComponents()`, which already handles the per-component filtering

    Inspired by embed-generator's `schema.ts` / `restoreSchema.ts` split.

    - **Acceptance**: Pasting a Discord message JSON with select menus + link buttons + V2 components results in only the supported types being loaded. Unsupported types are silently dropped. `fromAPIComponents()` is NOT modified — it already handles this correctly.

### Milestone 5: Edge Cases and Robustness

**Objective**: The component system handles boundary conditions correctly.

12. **Validation error display in editors.** Add inline validation feedback:
    - Empty URL fields on link buttons highlight as errors
    - Character count display for text display content (max 4000)
    - Action row button count (max 5)
    - Total component count approaching 40
    - Media gallery items count (max 10)
    - Section text components count (max 3)

    Follow the existing pattern from embed editor validation.

    - **Acceptance**: Users see clear feedback when approaching or exceeding limits. Add buttons/children are disabled at max count.

*(Container nesting prevention was verified during architecture review and promoted to Milestone 1 — see item 5.)*

### Milestone 6: Cleanup and Polish

13. **i18n integration.** Add component-related strings to `lang/src/en-US/` and rebuild with `pnpm lang`. Replace hardcoded strings in component editors (labels like "Action Row", "Text Display", "Label", "URL", "Disabled", "Spoiler", "Divider", "Spacing", etc.).
    - **Acceptance**: All user-visible strings in component editors come from the i18n system.

14. **Verify the full roundtrip.** (renumbered) Create a message with every V2 component type → save via `api.message.upsert` → reload page → verify components survive the `makeEditable()` → UI → `stripKeys()` → DB → `makeEditable()` cycle.
    - **Acceptance**: Components persist without data loss. `_key` values are regenerated on load (not persisted to DB).

### Milestone 7: Classic/V2 Mode State & UI Toggle

**Objective**: Introduce an explicit message-level mode (`'classic'` or `'v2'`) that determines which editing sections are visible. The toggle replaces the current behavior where embeds and V2 components coexist freely.

**Context**: Currently `showEmbedTools` and `showComponentsEditable` are independent booleans in `useEditableState.ts`. The editor renders both "Add Embed" and "Add Component" buttons simultaneously. See [Analysis 002, Gap 2](../analysis/002-embeds-components-v2-mutual-exclusivity.md).

**Design decision**: Option D (mode switch) with a warning — approved by product owner. No warning shown when switching modes on a default/empty message.

15. **Add `messageMode` state to `useEditableState.ts`.** New state value: `'classic' | 'v2'`, defaulting to `'classic'`. Add a setter `setMessageMode`. This replaces the independent toggles for determining which editor sections are visible. The existing `showEmbedTools` and `showComponentsEditable` toggles remain for their original purpose (collapsing/expanding sections) but are now gated by mode.
    - **Acceptance**: `EditableState` exposes `messageMode`, `setMessageMode`. `useEditableState` returns the new state.

16. **Add `messageMode` to the `EditableState` global type** in `global.d.ts`. Add the `MessageMode` type alias (`'classic' | 'v2'`).
    - **Acceptance**: `EditableState` includes `messageMode: MessageMode` and `setMessageMode: (mode: MessageMode) => void`. `tsc --noEmit` passes.

17. **Auto-detect mode from message data on load.** When a message is loaded, determine the initial mode. The detection logic should live in `MessageProvider/index.tsx` as a `useEffect` that watches the loaded message's `components` array and calls `editableState.setMessageMode()`. This keeps `useEditableState` simple (zero-argument hook) and puts the detection where both message data and editable state converge.
    - If the message has V2 components (any type in `V2_COMPONENT_TYPES`): set mode to `'v2'`
    - Otherwise: set mode to `'classic'`
    - Legacy ActionRow (type 1) does NOT trigger V2 mode — it is valid in both modes
    - **Acceptance**: Loading a saved message with V2 components opens the editor in V2 mode. Loading a message with only embeds/content (± legacy action rows) opens in Classic mode. `useEditableState` remains a zero-argument hook.

18. **Gate editor sections by mode in `DiscordMessageEditor/index.tsx`.** When mode is `'classic'`:
    - Show content editor, embeds, "Add Embed" button, legacy ActionRow support
    - Hide V2 component editors and "Add Component" button
    When mode is `'v2'`:
    - Show V2 component editors and "Add Component" button, legacy ActionRow support
    - Hide content editor, embeds, "Add Embed" button
    - **Acceptance**: Only one mode's editing controls are visible at a time. Legacy ActionRow is available in both modes. Switching mode immediately changes visible sections.

19. **Add a mode toggle widget to the editor UI.** Add a toggle/switcher control near the top of the editor (above the content area) that allows the user to switch between Classic and V2. The toggle should clearly label both modes (e.g., "Classic" / "Components V2"). Follow existing UI patterns (e.g., `react-aria` toggle or project-specific `Button` component with selected state). **Prior art**: `embed-generator`'s [`EditorComponentsV2Toggle.tsx`](../../embed-generator/embedg-app/src/components/EditorComponentsV2Toggle.tsx) implements this exact pattern — a two-segment toggle button with confirmation modals in each direction. The Hooks.gg implementation should use `react-aria` and the project's `ConfirmationProvider` (`useConfirmation()` / `showConfirmation()`) instead of `embed-generator`'s bare `ConfirmModal`, but the visual pattern is directly applicable.
    - **Acceptance**: A visible toggle appears in the editor. Clicking it changes `messageMode`. The toggle reflects the current mode state.

### Milestone 8: Mode Switch Confirmation & Data Clearing

**Objective**: When a user switches modes and would lose data, show a confirmation warning before clearing. No warning on empty/default messages.

20. **Detect whether the message has data in the departing mode.** Before allowing a mode switch:
    - Classic → V2: check if `content` is non-empty OR `embeds` array has entries
    - V2 → Classic: check if `components` array has V2-type entries (types in `V2_COMPONENT_TYPES`)
    - If the departing mode has no user data, switch silently (no warning)
    - Legacy ActionRows (type 1) do NOT count as "V2 data" — they are preserved across mode switches
    - **Acceptance**: Switching modes on a blank/default message shows no warning. Switching modes when data exists triggers the confirmation in item 21.

21. **Show a confirmation dialog when switching with existing data.** Use the project's `ConfirmationProvider` (`useConfirmation()` / `showConfirmation()`). The warning should explain:
    - What data will be cleared (e.g., "Your embeds and content will be removed" or "Your V2 components will be removed")
    - A "Continue" / "Cancel" action pair
    - Do NOT claim the action is reversible — switching clears data from editor state immediately with no undo buffer. The user can only recover by reloading the page to restore the last saved state.
    - **Acceptance**: Confirmation dialog appears when switching modes with existing data. "Cancel" aborts the switch. "Continue" clears the departing mode's data fields and applies the new mode.

22. **Clear data for the departing mode on confirmation.** When the user confirms mode switch:
    - Classic → V2: set `content` to `''`, set `embeds` to `[]`. Preserve `username`, `avatar_url`, `allowed_mentions`, `thread_name`, and legacy ActionRow components (type 1)
    - V2 → Classic: remove all V2-type components from `components` array (types in `V2_COMPONENT_TYPES`). Preserve legacy ActionRow components (type 1)
    - **Acceptance**: After mode switch, only data for the new mode is present. Legacy ActionRows survive both directions. `username`/`avatar_url` and other metadata are never cleared.

### Milestone 9: Permanent V2 Flag Warning on PATCH

**Objective**: Warn the user before editing/patching an existing live Discord message into V2 mode, because the `IS_COMPONENTS_V2` flag is permanent — once set, it cannot be removed from that Discord message.

**Context**: Discord docs state: "Once a message has been sent with this flag, it can't be removed from that message." The send page uses `PATCH` (edit) when `oldMessage` is set. A Classic message can be overwritten to become V2, but not vice versa.

23. **Show a warning before sending a V2 message via PATCH (Edit).** On the send page (`send/page.tsx`), when:
    - The stripped message data contains V2 components (derive from the actual message data using the same `V2_COMPONENT_TYPES` check that `stripKeys()` uses — do NOT rely on `editableState.messageMode`, which could desync) AND
    - An `oldMessage` exists (this is an edit/PATCH, not a new POST)
    Display a prominent warning explaining:
    - "Editing this message with Components V2 is permanent. The V2 flag cannot be removed from this Discord message. The message will no longer support traditional embeds or content, even if you edit it again later."
    - This warning should be persistent (visible in the send UI), not just a confirmation dialog, so the user sees it before clicking Send
    - **Acceptance**: The warning is visible on the send page when editing in V2 mode. The warning does not appear for new messages (POST). The user can still proceed — it is informational, not blocking.

### Milestone 10: Defense-in-Depth Data Stripping

**Objective**: Ensure that even if the UI mode enforcement is bypassed (JSON import, API manipulation, race conditions), the system never sends embeds/content alongside the `IS_COMPONENTS_V2` flag.

**Context**: See [Analysis 002, Gaps 1, 3, 4, 5](../analysis/002-embeds-components-v2-mutual-exclusivity.md).

24. **Strip `embeds` and `content` in `stripKeys()` when `IS_COMPONENTS_V2` flag is set.** After the existing flag-setting logic in `stripKeys()` (`src/utils/index.ts`), when `hasV2` is true: delete `casted.data.embeds` and delete `casted.data.content`. This is a safety net — the UI should prevent this state, but the serialization layer guarantees it.
    - **Acceptance**: `stripKeys()` on a message with both V2 components and embeds/content produces a payload with only components and flags. No embeds, no content. Existing Classic messages (no V2 components) are unaffected.

25. **Auto-detect mode on JSON import.** In the JSON import path (`NewMessageJsonInput.tsx`, `JsonModalBody.tsx`), after Zod parsing, detect whether the imported message contains V2 components. Mode detection must examine the parsed data **before** `filterSupportedComponents()` runs (from the M4 lenient schema), because filtering could strip V2 component types and cause incorrect mode assignment. If V2 components are present, set `messageMode` to `'v2'` and strip `content`/`embeds` from the imported data. If not, set `messageMode` to `'classic'` and strip V2 components. Legacy ActionRows are preserved in both cases.
    - **Acceptance**: Importing JSON with V2 components opens the editor in V2 mode with embeds/content stripped. Importing JSON with embeds opens in Classic mode with V2 components stripped. Mixed JSON does not result in a mixed editor state.

26. **Add mutual exclusivity validation to `validateMessage()`.** In `src/utils/limits.tsx`, add a check: if the message has V2 components AND embeds or content, return an error string. This provides a user-facing validation error if the internal state somehow becomes mixed (defense-in-depth).
    - **Acceptance**: `validateMessage()` returns an error for mixed messages. The error is displayed in the editor UI via the existing `noContentError` pattern.

### Milestone 11: Version Management

27. **Update version artifacts and CHANGELOG.** Update `package.json` version, add CHANGELOG entry covering all mutual exclusivity work (Milestones 7–10). Reference Analysis 002.
    - **Acceptance**: Version artifacts reflect the target release. CHANGELOG documents the mutual exclusivity feature.

---

## Assumptions (Milestones 7–11)

1. **V2 not yet released to users.** No existing user messages contain V2 components. No migration or backward-compatibility handling is needed for stored messages.
2. **`content` is also dropped by Discord.** When `IS_COMPONENTS_V2` flag is set, Discord silently drops both `content` and `embeds`. Confirmed by product owner.
3. **Legacy ActionRow (type 1) works in both modes.** ActionRow does not require the `IS_COMPONENTS_V2` flag and can coexist with embeds. Only types in `V2_COMPONENT_TYPES` ({9, 10, 11, 12, 13, 14, 17}) trigger V2 mode. Confirmed by product owner.
4. **V2 flag is permanent per Discord message.** Once a Discord message is sent with `IS_COMPONENTS_V2`, the flag cannot be removed via subsequent PATCH calls. A Classic message can be converted to V2, but not vice versa.
5. **No new npm dependencies.** The mode toggle, confirmation dialog, and warning can be implemented with existing UI primitives (`react-aria`, `Button`, existing modal/dialog patterns).

---

## Testing Strategy

- **Type safety**: `tsc --noEmit` must pass. The `satisfies z.ZodType<MessageData>` constraint catches type/schema mismatches.
- **Unit-level**: Roundtrip tests for `injectComponentKeys` → `stripComponentKeys`, `toAPIComponents` → `fromAPIComponents`, and factory functions. (No test framework currently configured — these could be manual verification or a lightweight test setup.)
- **Integration**: Full save/load cycle via tRPC `message.upsert` and `message.get`.
- **Edge cases**: Empty action rows (should error), container with many children (should allow up to 40 total), 6th button in a row (should prevent), container-in-container (Zod rejects), `IS_COMPONENTS_V2` flag presence/absence, total component count exceeding 40.
- **Send path**: Verify `sendWebhook()` receives clean `MessageData` (no `_key` properties) with correct flags.
- **Mode toggle**: Switching Classic→V2 clears content/embeds; switching V2→Classic clears V2 components; legacy ActionRows survive both directions.
- **Defense-in-depth**: `stripKeys()` strips embeds/content when V2 flag is set, even if UI state is inconsistent.
- **PATCH warning**: V2 flag warning appears on edit/PATCH, not on new POST.
- **JSON import mode detection**: Importing mixed JSON auto-selects correct mode and strips conflicting data.

**Note**: Specific test cases and QA processes are the QA agent's responsibility.

---

## Risks

| Risk                                                                           | Likelihood             | Impact             | Mitigation                                                                                                                                                         |
| ------------------------------------------------------------------------------ | ---------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `satisfies z.ZodType<MessageData>` fails with enum literals vs number literals | ~~Low~~ **Eliminated** | ~~High~~           | **VERIFIED**: `tsc --noEmit` passes. No longer a risk.                                                                                                             |
| Discord API rejects components payload due to incorrect flag handling          | Medium                 | High (broken send) | Test against Discord webhook API early. `getComponentsFlags()` already implemented. Flags set during `stripKeys()`. Send path fixed to use `stripKeys()` (item 8). |
| `_key` properties leak to Discord API on send                                  | **Eliminated**         | ~~Medium~~         | Fixed in Milestone 2, item 8. Send path now goes through `stripKeys()`.                                                                                            |
| V2 component CSS doesn't match Discord rendering                               | Medium                 | Low (cosmetic)     | Iterative CSS refinement; reference Discord client DevTools. Milestone 3 is now a CSS pass, not component creation.                                                |
| ESLint remains broken, no lint gate                                            | High (confirmed)       | Low                | ESLint issue is pre-existing, orthogonal to this work.                                                                                                             |
| Preview images (OG) don't render V2 components                                 | Low                    | Low                | `preview-image-generator` is a separate service; out of scope for this plan.                                                                                       |
| Stale constants cause Discord API rejection                                    | **Eliminated**         | ~~High~~           | Fixed in Milestone 1, item 4. Constants now track April 29, 2025 API changelog.                                                                                    |
| React key collisions from `rekey()` bug                                        | **Eliminated**         | ~~Medium~~         | Fixed in Milestone 1, item 3. `injectComponentKeys()` called on clones.                                                                                            |
| User accidentally converts live Discord message to V2 (irreversible)           | Medium                 | High (data loss)   | Milestone 9: persistent warning on PATCH sends in V2 mode. Warning is informational, not blocking — user maintains control.                                        |
| Mode toggle clears user data unexpectedly                                      | Low                    | Medium             | Milestone 8: confirmation dialog on mode switch when data exists. No dialog on empty/default messages. Metadata (username, avatar) never cleared.                  |
| `stripKeys()` defense-in-depth strips data the user intended to keep           | Low                    | Low                | Only fires when V2 flag is set. UI prevents the mixed state in the first place. Defense-in-depth is a safety net, not primary enforcement.                         |
| JSON import with mixed content produces unexpected mode                        | Low                    | Low                | Milestone 10 item 25: auto-detect mode from imported data. V2 components win if present. Legacy ActionRows preserved in both modes.                                |

---

## Dependencies

- `discord-api-types` V10 must export `ComponentType.Container`, `ComponentType.Section`, `ComponentType.TextDisplay`, etc. **Confirmed** in workspace.
- No database migration required — `data` column is JSONB, `components` is a new optional key.
- No new npm dependencies required for core functionality.

---

## OPEN QUESTION [RESOLVED]: Continue vs Fresh Start

**Resolution**: Continue from existing implementation. The core data layer and component editors are correctly implemented. The remaining work (flags, preview, import, polish) is incremental. Unrelated changes should be separated into their own commit.

## OPEN QUESTION [RESOLVED]: Target Release Version

**Resolution**: No roadmap document exists in the workspace. Target release version remains TBD in the plan header. Does not block implementation.

## OPEN QUESTION [RESOLVED]: Mutual Exclusivity UX Behavior (from Analysis 002)

**Resolution**: Option D — mode switch with a warning. The editor presents an explicit Classic/V2 toggle. Switching modes clears the departing mode's data after confirmation. No warning on empty/default messages. See Milestones 7–8.

## OPEN QUESTION [RESOLVED]: Content Field Behavior (from Analysis 002)

**Resolution**: `content` is also dropped by Discord when `IS_COMPONENTS_V2` is set. Both `content` and `embeds` must be stripped. Confirmed by product owner.

## OPEN QUESTION [RESOLVED]: Legacy ActionRow Handling (from Analysis 002)

**Resolution**: Legacy ActionRow (type 1) does NOT require the V2 flag and can coexist with embeds. It is valid in both Classic and V2 modes. The existing `V2_COMPONENT_TYPES` set correctly excludes type 1. No changes needed for ActionRow handling. Confirmed by product owner.

## OPEN QUESTION [RESOLVED]: Existing User Messages with Mixed Data (from Analysis 002)

**Resolution**: V2 component support has not yet been released to users. No existing user messages contain V2 components. No migration or backward-compatibility handling is needed.

---

## Handoff Notes

- **For Implementer**: Milestones 1–6 are complete and UAT-approved (see [Implementation 001](../implementation/001-components-v2-state-management.md)). **Start with Milestone 7** (mode state and UI toggle). Milestones 7–10 are new and address the mutual exclusivity gaps identified in [Analysis 002](../analysis/002-embeds-components-v2-mutual-exclusivity.md). Key files to modify:
  - `useEditableState.ts` — add `messageMode` state (M7)
  - `global.d.ts` — add `MessageMode` type and extend `EditableState` (M7)
  - `MessageProvider/index.tsx` — add `useEffect` for auto-detecting mode from message data on load (M7 item 17)
  - `DiscordMessageEditor/index.tsx` — gate sections by mode, add toggle widget, confirm on switch (M7–M8). Reference `embed-generator`'s `EditorComponentsV2Toggle.tsx` for the toggle UX pattern
  - `send/page.tsx` — add permanent V2 flag warning for PATCH (M9). Derive V2 state from message data (`V2_COMPONENT_TYPES` check), not `editableState.messageMode`
  - `utils/index.ts` — strip embeds/content in `stripKeys()` when V2 (M10)
  - `limits.tsx` — add mutual exclusivity validation (M10)
  - `NewMessageJsonInput.tsx`, `JsonModalBody.tsx` — auto-detect mode on import **before** `filterSupportedComponents()` runs (M10)
  - Legacy ActionRow (type 1) must work in both modes — do NOT gate it behind V2 mode.
  - Use the project's `ConfirmationProvider` (`useConfirmation()` / `showConfirmation()`) for the M8 confirmation dialog — do NOT promise undo/reversibility in the dialog copy.
- **For Critic**: Focus on mode transition logic (M8 data clearing), `stripKeys()` defense-in-depth (M10 item 24 — must not strip Classic messages), PATCH warning accuracy (M9 — permanent flag claim), and JSON import mode detection (M10 item 25 — V2 components should win for mode detection).
- **For QA**: Mode toggle roundtrip, data clearing completeness, legacy ActionRow preservation across mode switches, PATCH warning appearance/absence, `stripKeys()` defense-in-depth behavior, and JSON import mode detection are the highest-priority test areas for Milestones 7–10.

### Architecture Review Reference

This plan was revised based on findings in [001-components-v2-architecture-findings.md](../architecture/001-components-v2-architecture-findings.md). Key decisions:
- **ADR-001**: Single component tree for edit + preview (no separate visualizer)
- **ADR-002**: Component limits track current Discord API (40 total, no per-level cap)
