---
ID: 8
Origin: 8
UUID: b7e3f19a
Status: Released
Target Release: N/A (no versioning configured; UX enhancement)
Epic Alignment: Components V2 editor completeness
---

# Plan 008 — Sub-Component CRUD Actions (Delete/Duplicate/Move)

## Changelog

| Date       | Change                                                                                                         |
| ---------- | -------------------------------------------------------------------------------------------------------------- |
| 2026-04-09 | Initial plan created from Analysis 008                                                                         |
| 2026-04-09 | Revised per Critique 008: C1 (auto-remove UX), M1 (type cast), M2 (edge case test), L1 (button move rationale) |
| 2026-04-09 | Code Review: APPROVED_WITH_COMMENTS — 1 medium (F7: auto-remove test gap), 3 low, 4 positive findings          |
| 2026-04-09 | QA Complete: 281/281 tests pass (23 new QA tests), all 5 coverage gaps addressed, F7 resolved                  |
| 2026-04-09 | UAT Approved: All 7 scenarios pass, all 9 acceptance criteria met, approved for release                        |

## Value Statement and Business Objective

**As a** Hooks.gg user editing Components V2 messages, **I want** to delete, duplicate, and reorder Text Displays within Sections (and duplicate sub-components across all editors), **so that** I can efficiently iterate on my message layout without having to rebuild entire Sections from scratch.

## Success Criteria

- Individual Text Displays inside Sections can be deleted, duplicated, and reordered via hover-to-reveal action buttons.
- Deleting the last Text Display in a Section auto-removes the entire parent Section (at both root level and inside Containers).
- Container children can be duplicated via a new action button in the hover bar.
- Action Row buttons can be duplicated via the existing edit popover.
- Media Gallery items can be duplicated via the existing edit popover.
- All duplicate actions are gated by their respective component count limits (3 / 10 / 5 / 10). Character limit violations are permitted — existing warnings/errors display as before.
- No regressions: existing add, delete, move, and edit functionality remains intact.

## Assumptions

1. The `SectionEditor` component is shared between root-level and Container-hosted rendering paths. A single change to `SectionEditor` covers both contexts.
2. `genUuid()` is sufficient for re-keying shallow sub-components (Text Displays, buttons, gallery items). `rekeyComponent()` is only needed for Container children that may have nested sub-components.
3. The `countTotalComponents()` function in `index.tsx` already counts Section Text Displays and Container children, so duplicating a sub-component will naturally be reflected in the `canAddComponent` / `canAddChild` gate on the next render cycle.
4. The hover-to-reveal floating action bar pattern used in `ContainerChildWrapper` is the appropriate UX pattern for Section Text Display actions.

## Open Questions

None. All decisions resolved in Analysis 008.

---

## Plan

### Milestone 1: Section Text Display Actions (Primary Fix)

**Objective**: Add delete, duplicate, move up, and move down for Text Displays inside Sections. Deleting the last Text Display auto-removes the parent Section.

**Files**:
- `src/components/DiscordMessageEditor/components/ComponentEditors/SectionEditor.tsx`
- `src/components/DiscordMessageEditor/components/ComponentEditors/ComponentEditor.tsx`
- `src/components/DiscordMessageEditor/components/ComponentEditors/ContainerEditor.tsx`

**Tasks**:

1. **Add `onAutoRemove` prop to `SectionEditor`**: Add a new required prop (e.g., `onAutoRemove: VoidFunction`) that the parent calls to delete the entire Section. This callback is invoked when the last Text Display is deleted. **UX decision**: Auto-remove is silent (no confirmation dialog). This is consistent with Container child deletes, which also skip confirmation. The user's intent when deleting a Text Display is clear — if it happens to be the last one, the Section has no remaining content and auto-removal is the natural outcome.

2. **Add action callbacks in `SectionEditor`**: Implement four new `useCallback` hooks inside `SectionEditor`:
   - `deleteTextComponent(idx)` — filters the Text Display at `idx` from the components array. If the resulting array is empty, call `onAutoRemove()` instead of calling `setSection`.
   - `duplicateTextComponent(idx)` — clones the Text Display at `idx` with a new `_key` via `genUuid()` and splices it after the original. Gated by `MAX_SECTION_TEXT_COMPONENTS`.
   - `moveTextComponentUp(idx)` — swaps the Text Display at `idx` with the one at `idx - 1`.
   - `moveTextComponentDown(idx)` — swaps the Text Display at `idx` with the one at `idx + 1`.

3. **Wrap each `TextDisplayEditor` in an action wrapper**: Create a local wrapper component (similar in structure to `ContainerChildWrapper`) that renders the `TextDisplayEditor` and overlays a hover-to-reveal floating action bar with move up/down chevrons, a duplicate icon, and a delete trash icon. The wrapper should:
   - Show move up only when `idx > 0`.
   - Show move down only when `idx < components.length - 1`.
   - Show duplicate only when `components.length < MAX_SECTION_TEXT_COMPONENTS`.
   - Always show delete (including when there's only 1 Text Display — this triggers auto-remove).
   - Hide the action bar when the `TextDisplayEditor` content area is focused (matching `ContainerChildWrapper` behavior with `focusedWithin` state).

4. **Wire `onAutoRemove` from `ComponentEditor`**: In `ComponentBody` (inside `ComponentEditor.tsx`), the `SectionEditor` case currently receives only `section`, `showEdit`, and `setSection`. Add the parent-level delete so it can be passed through. This requires `ComponentBody` to also receive the `actions` prop (or just the `delete` callback). Pass `actions.delete` as `onAutoRemove` to `SectionEditor`.

5. **Wire `onAutoRemove` from `ContainerEditor`**: In `ContainerChildBody` (inside `ContainerEditor.tsx`), the Section case also needs access to the parent's delete callback. `ContainerChildBody` currently receives `child`, `showEdit`, and `set`. Either extend `ContainerChildBody` to accept an `onAutoRemove` prop, or have `ContainerChildWrapper` pass it through. Pass the existing `onDelete` as `onAutoRemove` to `SectionEditor` for Section-type children.

**Acceptance**:
- Text Displays inside Sections show hover actions (move, duplicate, delete) when `showEdit` is true.
- Deleting a Text Display from a multi-text Section removes only that Text Display.
- Deleting the sole Text Display in a Section removes the entire Section from the component list.
- Duplicate creates a copy with the same content and a new `_key`, placed immediately after the original.
- Move up/down reorders Text Displays within the Section.
- All actions work identically for root-level Sections and Sections inside Containers.

---

### Milestone 2: Container Child Duplicate

**Objective**: Add duplicate action to the `ContainerChildWrapper` floating action bar for all Container child types.

**Files**:
- `src/components/DiscordMessageEditor/components/ComponentEditors/ContainerEditor.tsx`

**Tasks**:

1. **Add `duplicateChild` callback in `ContainerEditor`**: Implement a new `useCallback` that clones a child at a given index using `rekeyComponent()` (since container children can be complex types like Sections with nested components) and splices the clone after the original. Use a type assertion: `rekeyComponent(child as EditableTopLevelComponent) as EditableContainerChild`. This is safe because `EditableContainerChild` is a strict subset of `EditableTopLevelComponent` (same union minus `EditableContainer`). Do not modify `rekeyComponent`'s type signature — that is out of scope.

2. **Extend `ContainerChildWrapper` props**: Add `onDuplicate: VoidFunction | undefined` to the `ChildWrapperProps` interface.

3. **Add duplicate button to the floating action bar**: Add a `DocumentDuplicateIcon` button between the move-down and delete buttons in the hover bar, conditionally shown when `onDuplicate` is defined (using the existing `NullableComponent` pattern).

4. **Wire from `ContainerEditor`**: Pass `onDuplicate` as `duplicateChild(idx)` when `canAddChild` is true, otherwise `undefined`. This uses the same `canAddChild` prop (backed by `MAX_TOTAL_COMPONENTS`) already threaded through from the parent.

**Acceptance**:
- Container children show a duplicate icon in the hover action bar when the global component limit has not been reached.
- Duplicating a child inserts a deep-cloned copy (with fresh `_key` values) immediately after the original.
- The duplicate button is hidden when the global component limit is reached.

---

### Milestone 3: Action Row Button Duplicate

**Objective**: Add duplicate action for Link Buttons inside Action Rows. Move up/down is intentionally omitted — buttons render horizontally in a row where visual ordering is less intuitive than for vertically-stacked Text Displays. This matches the existing pattern where buttons have delete but no move.

**Files**:
- `src/components/DiscordMessageEditor/components/ComponentEditors/ActionRowEditor.tsx`

**Tasks**:

1. **Add `duplicateButton` callback in `ActionRowEditor`**: Implement a `useCallback` that clones the button at a given index with a new `_key` via `genUuid()` and splices it after the original.

2. **Add duplicate UI to `ButtonVisual`**: In the edit popover (the `NullableComponent` that appears on focus), add a "Duplicate Button" action alongside the existing "Delete Button" action. Gate visibility by `MAX_ACTION_ROW_BUTTONS`. The implementer should follow the same styling pattern as the existing "Delete Button" text link.

3. **Wire from `ActionRowEditor`**: Pass `onDuplicate` to `ButtonVisual` as `duplicateButton(idx)` when `row.components.length < MAX_ACTION_ROW_BUTTONS`, otherwise `undefined`.

**Acceptance**:
- Focusing a button in an Action Row shows both "Duplicate Button" and "Delete Button" in the edit popover.
- "Duplicate Button" is hidden when there are already 5 buttons.
- Duplicating a button inserts a copy with the same content and a new `_key`.

---

### Milestone 4: Media Gallery Item Duplicate

**Objective**: Add duplicate action for items inside Media Galleries.

**Files**:
- `src/components/DiscordMessageEditor/components/ComponentEditors/MediaGalleryEditor.tsx`

**Tasks**:

1. **Add `duplicateItem` callback in `MediaGalleryEditor`**: Implement a `useCallback` that clones the gallery item at a given index with a new `_key` via `genUuid()` and splices it after the original.

2. **Add duplicate UI to `GalleryItemVisual`**: In the edit popover (the focus-triggered overlay at the bottom), add a "Duplicate" action next to the existing "Delete" text button. Gate visibility by `MAX_MEDIA_GALLERY_ITEMS`. Follow the same text-link styling as "Delete".

3. **Wire from `MediaGalleryEditor`**: Pass `onDuplicate` to `GalleryItemVisual` as `duplicateItem(idx)` when `count < MAX_MEDIA_GALLERY_ITEMS`, otherwise `undefined`.

**Acceptance**:
- Focusing a gallery item shows both "Duplicate" and "Delete" in the edit popover.
- "Duplicate" is hidden when there are already 10 items.
- Duplicating an item inserts a copy with the same URL, description, and spoiler state, and a new `_key`.

---

## Testing Strategy

- **Unit tests**: Callback logic for delete-last-auto-remove (Section with 1 Text Display → Section removed), duplicate re-keying (cloned component has distinct `_key`), move ordering correctness.
- **Integration tests**: Full component tree exercising Section Text Display actions in both root and Container contexts.
- **Edge cases**: Delete only text display triggers auto-remove; duplicate at max count is not offered; move at boundary (first/last) buttons are hidden; duplicating a Section child inside a Container with nested Text Displays produces correct deep-cloned keys; rapid duplicate clicks don't exceed component count limits (verify React re-render updates `canAddChild` before a second click can fire).

---

## Risks

| Risk                                                                                    | Likelihood | Impact | Mitigation                                                                                             |
| --------------------------------------------------------------------------------------- | ---------- | ------ | ------------------------------------------------------------------------------------------------------ |
| `rekeyComponent` type mismatch for `EditableContainerChild`                             | Low        | Medium | All container child types are subtypes of `EditableTopLevelComponent`; verify with `tsc --noEmit`      |
| `countTotalComponents` doesn't count duplicated sub-components correctly                | Low        | Medium | Existing function already walks sub-components; verify with manual test after duplicate                |
| Focus management disruption from new hover bar in `SectionEditor`                       | Medium     | Low    | Match `ContainerChildWrapper`'s `focusedWithin` pattern exactly to prevent conflicts with Slate editor |
| Prop drilling depth for `onAutoRemove` through `ComponentBody` and `ContainerChildBody` | Low        | Low    | Only 1 extra prop per intermediate component; acceptable given existing patterns                       |

---

## Validation & Handoff

1. `tsc --noEmit` must pass with zero errors.
2. All existing tests must pass (`vitest run`).
3. Manual verification: create a Section with 3 Text Displays → delete middle → verify order; delete all 3 one by one → verify Section auto-removes; duplicate at limit → verify button hidden.
4. Verify in both root-level and Container-hosted Section contexts.

---

## Dependencies

- Analysis 008 (completed, all questions resolved).
- No external API changes. This is purely a client-side UI enhancement.
- No database or server-side changes required.
