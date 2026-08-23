---
ID: 8
Origin: 8
UUID: b7e3f19a
Status: Planned
---

# Analysis — 008: Missing Delete/Duplicate/Move for Text Displays Inside Sections

## Changelog

| Date       | Change                                                                   |
| ---------- | ------------------------------------------------------------------------ |
| 2026-04-09 | Initial analysis filed                                                   |
| 2026-04-09 | Scope expanded: add duplicate + move, auto-remove Section on last delete |
| 2026-04-09 | Status → Planned; Plan 008 created                                       |

## Value Statement and Business Objective

Users cannot delete, duplicate, or reorder individual Text Display components inside Sections. They can only delete the entire Section, forcing a rebuild of the remaining Text Displays from scratch. This friction directly impacts editor usability for Components V2 messages.

## Objective

Determine the root cause and full scope of missing CRUD actions for Text Display children within Section components. Expanded to include duplicate and move actions across sub-component editors.

## Context

The website's Discord Message Editor uses a Components V2 architecture where Sections contain up to 3 Text Display sub-components plus an accessory (Thumbnail or Button). Users report they can delete entire Sections (and other top-level components) but cannot delete individual Text Displays nested inside a Section.

## Methodology

1. Traced the component hierarchy from `ComponentEditor` → `SectionEditor` → `TextDisplayEditor`
2. Compared the `SectionEditor` child-rendering pattern against `ContainerEditor`'s `ContainerChildWrapper` pattern
3. Inspected Zustand state actions and prop threading for both root-level and container-level Sections

## Findings

### Verified: `SectionEditor` has no delete callback or UI for child Text Displays

**File**: `src/components/DiscordMessageEditor/components/ComponentEditors/SectionEditor.tsx`

The `SectionEditor` component defines two callbacks for its child Text Displays:
- `setTextComponent(idx)` — updates a text display at a given index
- `addTextComponent()` — appends a new text display (gated by `MAX_SECTION_TEXT_COMPONENTS`)

**Missing**: There is no `deleteTextComponent` callback. No UI element (button/icon) exists to trigger deletion of an individual Text Display within a Section.

Each child is rendered as a bare `TextDisplayEditor`:
```tsx
{section.components.map((td, idx) => (
  <TextDisplayEditor
    key={td._key}
    component={td}
    showEdit={showEdit}
    set={setTextComponent(idx)}
  />
))}
```

The `TextDisplayEditor` component (`TextDisplayEditor.tsx`) accepts only `component`, `showEdit`, and `set` props — it has no `onDelete` prop.

### Verified: `ContainerEditor` demonstrates the expected pattern

**File**: `src/components/DiscordMessageEditor/components/ComponentEditors/ContainerEditor.tsx`

The `ContainerEditor` wraps each child (including Text Displays and Sections) in a `ContainerChildWrapper` that provides:
- **Delete**: `onDelete` callback + `TrashIcon` button
- **Move Up/Down**: `onMoveUp`/`onMoveDown` callbacks + chevron buttons
- Hover-to-reveal floating action bar

This pattern does **not** propagate into Section children. When a Section is inside a Container, the Container provides delete/move for the Section itself, but the Section's internal Text Displays still lack individual delete controls.

### Verified: Additionally missing — Move Up / Move Down for Section Text Displays

The `SectionEditor` also lacks `moveUp`/`moveDown` functionality for reordering Text Displays within a Section. While the user did not report this, it is part of the same gap.

### Verified: No duplicate action in any sub-component editor

**Duplicate exists** at the top-level (`ComponentEditor` has a `canDuplicate` prop and `actions.duplicate` wired from [index.tsx](website/src/components/DiscordMessageEditor/index.tsx#L160) via `rekeyComponent`).

**Duplicate is missing** from all sub-component contexts:

| Parent Editor                               | Child Type      | Has Delete | Has Move | Has Duplicate |
| ------------------------------------------- | --------------- | ---------- | -------- | ------------- |
| `SectionEditor`                             | Text Displays   | **NO**     | **NO**   | **NO**        |
| `ContainerEditor` (`ContainerChildWrapper`) | All child types | YES        | YES      | **NO**        |
| `ActionRowEditor` (`ButtonVisual`)          | Link Buttons    | YES        | NO       | **NO**        |
| `MediaGalleryEditor` (`GalleryItemVisual`)  | Gallery Items   | YES        | NO       | **NO**        |

The user scopes duplicate to be gated **only by component count limits**, not character limits. Meaning: duplicate should be allowed as long as the parent hasn't reached its child count cap (e.g., 3 Text Displays in a Section, 10 children in a Container, 5 buttons in an Action Row, 10 items in a Media Gallery). Character-limit warnings/errors may display afterward, which is acceptable.

### Verified: Auto-remove Section behavior for last Text Display deletion

Per user decision: when deleting the last Text Display in a Section, the entire Section should be auto-removed. This means the `SectionEditor` needs to communicate upward to the parent that the Section should be deleted.

**Implications by context:**

1. **Root-level Sections**: `SectionEditor` receives `setSection` from `ComponentEditor`, which gets `actions.set` from `componentActions`. But `actions.delete` (the Section-level delete) is not passed down. The `SectionEditor` needs access to the parent's delete callback to auto-remove.

2. **Container-hosted Sections**: The `ContainerChildWrapper` provides `onDelete` for the Section itself, but `SectionEditor` doesn't receive it. Same issue — needs a prop to trigger parent-level deletion.

**Design pattern**: Add an `onAutoRemove` (or reuse the parent `onDelete` / `delete` callback) prop to `SectionEditor` that fires when the last Text Display is deleted. Alternatively, `deleteTextComponent` can check the count and call the parent's delete when `components.length === 1`.

## Root Cause

**Verified**: The `SectionEditor` component was implemented with `add` and `set` callbacks for its child Text Displays but omitted `delete`, `duplicate`, and `move` callbacks. The `TextDisplayEditor` component has no action prop interface beyond content editing. This is a straightforward feature omission — the wiring was never built.

This affects Sections in **all contexts** (root-level and inside Containers) because both rendering paths use the same `SectionEditor` component.

Additionally, the `ContainerChildWrapper` and other sub-component wrappers (`ButtonVisual`, `GalleryItemVisual`) lack duplicate functionality, which is a consistent gap across all nested editors.

## Scope (User-Decided)

| Decision                          | Answer                                                               |
| --------------------------------- | -------------------------------------------------------------------- |
| Delete last Text Display behavior | **Auto-remove** the parent Section                                   |
| Include move up/down              | **Yes**                                                              |
| Include duplicate                 | **Yes**, gated by component count limits only (not character limits) |

## Affected Files

The following files need changes:

| File                                            | Change Needed                                                                                                                                                                                                                                              |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SectionEditor.tsx`                             | Add `deleteTextComponent`, `duplicateTextComponent`, `moveTextComponentUp`, `moveTextComponentDown` callbacks; add `onAutoRemove` prop for parent-level Section deletion; wrap each `TextDisplayEditor` in an action wrapper with hover-to-reveal controls |
| `SectionEditor.tsx`                             | Wire `onAutoRemove` — when last text display deleted, call this to remove the Section                                                                                                                                                                      |
| `ComponentEditor.tsx`                           | Pass `actions.delete` through to `SectionEditor` as `onAutoRemove`                                                                                                                                                                                         |
| `ContainerEditor.tsx`                           | Pass container-child delete through to `SectionEditor` as `onAutoRemove`; add `onDuplicate` to `ContainerChildWrapper` for all child types                                                                                                                 |
| `ContainerEditor.tsx` / `ContainerChildWrapper` | Add duplicate callback + `DocumentDuplicateIcon` button, gated by `canAddChild`                                                                                                                                                                            |
| `ActionRowEditor.tsx` / `ButtonVisual`          | Add duplicate callback for buttons, gated by `MAX_ACTION_ROW_BUTTONS`                                                                                                                                                                                      |
| `MediaGalleryEditor.tsx` / `GalleryItemVisual`  | Add duplicate callback for gallery items, gated by `MAX_MEDIA_GALLERY_ITEMS`                                                                                                                                                                               |

### Key Constants

| Constant                      | Value | Used By                                                              |
| ----------------------------- | ----- | -------------------------------------------------------------------- |
| `MAX_SECTION_TEXT_COMPONENTS` | 3     | `SectionEditor` — gates add/duplicate                                |
| `MAX_ACTION_ROW_BUTTONS`      | 5     | `ActionRowEditor` — gates add/duplicate                              |
| `MAX_MEDIA_GALLERY_ITEMS`     | 10    | `MediaGalleryEditor` — gates add/duplicate                           |
| `MAX_TOTAL_COMPONENTS`        | 40    | `ContainerEditor`/top-level — gates duplicate for container children |

### Utility Functions Available

- `genUuid()` — generates unique `_key` values for new components
- `rekeyComponent()` — deep-clones a component and regenerates all `_key` values recursively (currently only used for top-level duplicate, operates on `EditableTopLevelComponent`)
- `createTextDisplay()` — factory for new Text Displays

### `rekeyComponent` Limitation

`rekeyComponent` is typed to accept `EditableTopLevelComponent`. For duplicating sub-components (Text Displays, buttons, gallery items), the implementation can use a simpler approach since these are shallow types — a spread with a new `_key` via `genUuid()` is sufficient. For Section children inside Containers, `rekeyComponent` would work since Sections are included in `EditableTopLevelComponent`, but is overkill for Text Displays which have no nested keys.

## System Weaknesses

| Weakness                                                | Risk Mechanism                                                                       |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| No CRUD completeness check for nested component editors | Child components can be added without corresponding delete/reorder/duplicate support |
| `TextDisplayEditor` has a minimal prop interface        | No extensibility for action callbacks beyond content editing                         |
| Duplicate only exists at top-level                      | Sub-component editors across the board lack duplicate, creating inconsistent UX      |

## Instrumentation Gaps

None — this is a UI feature omission, not a runtime behavior requiring telemetry.

## Analysis Recommendations

1. **Implement delete + move + duplicate for Section text displays** — primary fix, addresses the user's report
2. **Add duplicate to `ContainerChildWrapper`** — gated by `canAddChild` (the global 40-component `MAX_TOTAL_COMPONENTS` limit, passed as a prop)
3. **Add duplicate to `ActionRowEditor` buttons** — gated by `MAX_ACTION_ROW_BUTTONS` (5)
4. **Add duplicate to `MediaGalleryEditor` items** — gated by `MAX_MEDIA_GALLERY_ITEMS` (10)
5. **Wire auto-remove for Sections** — when last Text Display is deleted, propagate deletion to the parent Section
6. **Test the `countTotalComponents` interaction** — verify that duplicating a child inside a Container correctly increments the global component count and that `canAddChild` reflects the new count

## Open Questions

All previously open questions have been resolved by user decision. No remaining unknowns.
