---
ID: 1
Origin: 1
UUID: a3f7c9e2
Status: Active
---

# Architecture Findings — Plan 001: Discord Components V2

## Changelog

| Date       | Event               | Summary                                                                                                                                       |
| ---------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 2025-07-15 | Pre-Planning Review | Initial architectural review of Plan 001. Five critical findings, one APPROVED_WITH_CHANGES.                                                  |
| 2026-04-01 | Plan Revised        | All five findings incorporated into Plan 001 Rev 2. Milestone 3 removed, constants fixed, rekey bug promoted, flags responsibility corrected. |
| 2026-04-01 | Critique Resolved   | Plan Rev 3: Critical send-path gap fixed (item 9), Milestone 4 clarified, container nesting promoted to M1, open question closed.             |

---

## Verdict: APPROVED_WITH_CHANGES

The plan is solid in its core direction (continue from existing implementation, flags management, roundtrip integrity). However, it contains **one critical architectural misalignment** (Milestone 3), **two incorrect constants** from stale Discord API limits, **one state identity bug**, and **one missing total-component limit**. These MUST be corrected before implementation proceeds.

---

## Finding 1 — CRITICAL: Milestone 3 Is Architecturally Wrong

### What the plan says

> *"Create preview components in a new directory `src/components/DiscordMessageVisualizer/`"* — proposes ~8 new React components for read-only rendering of V2 components.

### What the codebase actually does

The Hooks.gg architecture uses a **single component tree for both editing and preview**. There is no separate visualizer directory. The mechanism:

1. `DiscordMessageEditor` accepts a `showEdit` boolean via `editableState?.showEdit`. When `false`, edit controls (toolbars, add buttons, input fields) are hidden.
2. `MessagePreview` ([src/components/MessagePreview.tsx](src/components/MessagePreview.tsx)) renders `DiscordMessageEditor` with `setMessage={() => {}}` (no-op setter). No `editableState` is passed, so `showEdit` is always falsy.
3. `DiscordContentEditor` ([src/components/DiscordContentEditor/index.tsx](src/components/DiscordContentEditor/index.tsx)) demonstrates this pattern directly: when `showEdit` is false, it returns a static `<Markdown>` renderer; when true, it returns the Slate editor.
4. All existing component editors already accept and respect the `showEdit` prop:
   - `ComponentEditor.tsx` — hides toolbar (duplicate/delete/move buttons) when `showEdit` is false
   - `TextDisplayEditor.tsx` — passes `showEdit` to `DiscordContentEditor`, which renders static Markdown
   - All other editors follow the same pattern

### Required change

**Remove Milestone 3 entirely.** Replace it with:

> **Milestone 3 (revised): Verify Preview Rendering Quality**
>
> Verify that each component editor renders acceptably when `showEdit=false`. Fix any visual issues (missing padding, hidden content, broken layouts). This is a **CSS/layout review** task, not a component-creation task. No new React components should be created.

This also means the CSS in `visualizer.scss` (285 lines) is already correctly positioned — it applies to the component editors in read-only mode. No separate component tree references it.

### Impact

Eliminates ~8 unnecessary React files and an entire incorrect component hierarchy. Prevents architectural divergence (two rendering paths that would inevitably drift out of sync).

---

## Finding 2 — WRONG: `MAX_TOP_LEVEL_COMPONENTS = 5`

### What the plan/code says

[src/constants/index.ts](src/constants/index.ts) line 55: `MAX_TOP_LEVEL_COMPONENTS = 5`

### What Discord API says

Per the [April 29, 2025 changelog](https://docs.discord.com/developers/change-log#april-29-2025) ("Raised Component Limits"):

> *"Top-level components: There is no longer a limit on top level components in a message (previously it was 10)."*
>
> *"Total components: The limit for total components in a message has been increased to 40."*

The value `5` appears to have been taken from the **legacy** Action Row limit (legacy messages allow up to 5 action rows). For Components V2, there is no per-level cap — only a total of 40 components per message.

### Required change

1. Remove `MAX_TOP_LEVEL_COMPONENTS = 5` or rename to `MAX_LEGACY_ACTION_ROWS = 5` (for legacy message support, if ever needed).
2. Add `MAX_TOTAL_COMPONENTS = 40`.
3. The UI guard in `DiscordMessageEditor` (`components.length < MAX_TOP_LEVEL_COMPONENTS`) should use `MAX_TOTAL_COMPONENTS` instead, or better yet, count total components recursively (top-level + all nested children) against 40.
4. Update the Zod schema: `z.array(topLevelComponentShape).max(MAX_TOP_LEVEL_COMPONENTS)` → `.max(MAX_TOTAL_COMPONENTS)` (with a note that this is a simplification — Discord counts all nested components toward 40, not just top-level).
5. The `componentActions.length` pre-allocated array (`new Array(MAX_TOP_LEVEL_COMPONENTS).fill(...)`) must also be updated. Note: this is a performance concern — pre-allocating 40 action objects is wasteful. Consider generating actions lazily or for `components.length + 1` only.

### Impact

Users are currently limited to 5 top-level components. Discord allows up to 40 total. This artificially restricts the editor's capabilities.

---

## Finding 3 — WRONG: `MAX_CONTAINER_CHILDREN = 10`

### What the plan/code says

[src/constants/index.ts](src/constants/index.ts) line 58: `MAX_CONTAINER_CHILDREN = 10`

### What Discord API says

Per the same April 29, 2025 changelog:

> *"Container Component: There is no longer a limit on the number of components in a Container Component (previously it was 10)."*

### Required change

Remove `MAX_CONTAINER_CHILDREN` or set it to a reasonable UX cap (e.g., 40, matching total components). Container children are now bounded only by the total-components-per-message limit (40).

### Impact

Users cannot add more than 10 children to a container, which is an artificial restriction that doesn't match the Discord API.

---

## Finding 4 — BUG: `rekey()` Does Not Regenerate `_key` Values

### What the code does

In [src/components/DiscordMessageEditor/index.tsx](src/components/DiscordMessageEditor/index.tsx#L127-L128):

```ts
const rekey = (c: EditableTopLevelComponent): EditableTopLevelComponent =>
  JSON.parse(JSON.stringify(c)) as EditableTopLevelComponent;
```

This deep-clones the component but **preserves all existing `_key` values**. When a component is duplicated, both the original and the clone share the same `_key` values, which violates React's key uniqueness requirement.

### Required change

The `rekey` function should call `injectComponentKeys()` (from `~/utils/index.ts`) on the cloned component to regenerate all `_key` values recursively. That utility already exists and handles walking the component tree.

The plan correctly identifies this in item 10, but it is listed as an "edge case" in Milestone 5. This is a **correctness bug** that should be fixed in Milestone 1 (stabilization), not deferred.

### Impact

React key collision causes incorrect reconciliation — duplicated components may not render independently, and updates to one may bleed into the other.

---

## Finding 5 — MISSING: `flags` Not Wired Into Send Flow

### What the plan says

Milestone 2, items 3-4 correctly identify this gap.

### Verification

Confirmed in [src/utils/sendWebhook.ts](src/utils/sendWebhook.ts): The function deep-clones `MessageData`, processes embed image URLs, serializes as `payload_json` via `JSON.stringify(message)`, and sends via `fetch`. At no point is `flags` set on the message object.

The helper `getComponentsFlags()` exists in `componentTranslation.ts` but is never called.

### Architectural note

The `sendWebhook.ts` function should not be responsible for determining flags — that crosses a responsibility boundary. The flags should be set **before** the message reaches `sendWebhook`. Specifically, `stripKeys()` (in `useApiMethods.ts`) or the caller that prepares the message payload should set `flags` based on `getComponentsFlags(message.components)`. `sendWebhook.ts` should just serialize whatever `MessageData` it receives, including `flags` if present.

This aligns with the existing pattern where `stripKeys()` transforms `EditableMessageData` → `MessageData` before persistence/sending.

### Impact

Messages with V2 components will be rejected or incorrectly rendered by Discord without the `IS_COMPONENTS_V2` flag (`1 << 15` = `32768`).

---

## Additional Observations

### Correct elements in the plan

- **Recommendation to continue** rather than `git restore .` is architecturally sound. The data layer (types, Zod, key management, translation) is well-built.
- **Scope restriction to link buttons only** is a good simplification that avoids `custom_id` complexity.
- **`satisfies z.ZodType<MessageData>` constraint** — verified: `tsc --noEmit` passes. The Zod `z.literal(2)` and TypeScript `ComponentType.Button` (= `2`) are compatible at the type level.
- **Container nesting prevention** — verified: both the UI (`CONTAINER_CHILD_ITEMS` excludes Container) and Zod (`containerChildShape` discriminated union excludes type 17) correctly prevent nested containers.
- **Data flow roundtrip** — verified: `makeEditable()` calls `injectComponentKeys()` on load; `stripKeys()` calls `stripComponentKeys()` before save/send. The JSONB column stores stripped data.
- **`IS_COMPONENTS_V2_FLAG = 1 << 15`** — verified correct per Discord API docs.

### Pre-allocated action arrays are a scaling concern

The current pattern pre-allocates `new Array(MAX_TOP_LEVEL_COMPONENTS).fill('').map(...)` to create action objects. With `MAX_TOP_LEVEL_COMPONENTS = 5`, this creates 5 action objects regardless of actual component count. If the limit changes to 40, this creates 40 objects on every render. Recommend changing to `components.map((_, idx) => ...)` with appropriate memoization.

### `showComponentsEditable` toggle in `EditableState`

The `editableState?.showComponentsEditable` acts as a panel toggle (like existing `showEmbedTools`, `showContentEditable`). The UI correctly gates the "Add Component" button behind both `showEdit` and `showComponentsEditable`. This is architecturally consistent with how embeds toggle their editing surface.

---

## Plan Corrections Summary

| Item                        | Current                                         | Required Change                                            | Priority |
| --------------------------- | ----------------------------------------------- | ---------------------------------------------------------- | -------- |
| Milestone 3                 | Create ~8 preview components                    | Remove. Replace with CSS/layout verification pass          | CRITICAL |
| `MAX_TOP_LEVEL_COMPONENTS`  | `5`                                             | Remove; add `MAX_TOTAL_COMPONENTS = 40`                    | HIGH     |
| `MAX_CONTAINER_CHILDREN`    | `10`                                            | Remove or set to `40`                                      | HIGH     |
| `rekey()` bug               | Listed as Milestone 5 edge case                 | Move to Milestone 1 (correctness bug)                      | HIGH     |
| `flags` responsibility      | "Wire into `sendWebhook.ts`"                    | Set flags during `stripKeys()` transformation, not in send | MEDIUM   |
| Action array pre-allocation | Pre-allocate `MAX_TOP_LEVEL_COMPONENTS` entries | Use `components.map()` or `components.length + 1`          | LOW      |

---

## Decisions

### ADR-001: Single Component Tree for Edit + Preview

**Context**: Discord message rendering in Hooks.gg uses `DiscordMessageEditor` for both editing (with `showEdit=true`) and preview (with `showEdit=false`, no-op `setMessage`). This is the established pattern for content, embeds, and now components.

**Decision**: V2 component rendering MUST follow this same pattern. No separate visualizer/preview component tree.

**Alternatives considered**: Separate `DiscordMessageVisualizer/` directory (as proposed in original plan). Rejected because it creates two rendering paths that must be kept in sync, violates DRY, and diverges from the established embed/content pattern.

**Consequences**: Component editors must be designed to work in both modes from the start. CSS must handle both edit and read-only states. This is already the case for all 10 implemented editors.

### ADR-002: Component Limits Track Discord API (Not Legacy)

**Context**: Discord raised component limits on April 29, 2025. The original implementation used stale values.

**Decision**: Constants MUST reflect current Discord API limits. Use `MAX_TOTAL_COMPONENTS = 40`. Do not enforce a per-level cap that Discord no longer enforces.

**Consequences**: UI must count total components recursively for enforcement. Zod schema should validate `.max(40)` on the top-level array (simplified — Discord counts nested too, but exact recursive validation in Zod adds complexity for marginal benefit since Discord will reject overlimit payloads at send time).
