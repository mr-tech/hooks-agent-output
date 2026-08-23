---
ID: 3
Origin: 1
UUID: b7e2d4a1
Status: Released
Target Release: N/A (post-release polish; no version bump)
---

# Plan 003 — ActionsMenu Critique Remediation

**Epic Alignment**: Post-release polish for Plan 001 (Components V2 State Management)
**Parent Critique**: [critiques/001-actions-menu-ux-redesign-critique.md](../critiques/001-actions-menu-ux-redesign-critique.md)
**Date**: 2026-04-06
**Revision**: 3

## Changelog

| Date       | Handoff        | Summary                                                                                                                                                     |
| ---------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-04-06 | User → Planner | Initial plan addressing 5 critique findings                                                                                                                 |
| 2026-04-06 | User → Planner | Revised per critique 003 Rev 1: added `useListNavigation`/`FloatingFocusManager`, clarified `useRole` semantics, resolved Task 7 ambiguity, fixed dates     |
| 2026-04-06 | User → Planner | Revised per critique 003 Rev 2: corrected `outsidePress` guidance, replaced manual index API with `FloatingList`+`useListItem()`, qualified focus criterion |

---

## Value Statement and Business Objective

As a user of the Hooks.gg message builder, I want the ActionsMenu cog dropdown to be accessible, robust, and architecturally consistent, so that keyboard and screen-reader users can navigate actions reliably, and the dismiss behavior doesn't break when dependencies update.

---

## Success Criteria

- ActionsMenu panel has `role="menu"` and items have `role="menuitem"`
- Arrow-key navigation (Up/Down/Home/End) works within the open menu
- Focus moves to the first item on open and returns to trigger on close
- Trigger has `aria-haspopup="menu"`
- Dismiss uses `@floating-ui/react` positioning + dismiss instead of hand-rolled listeners
- Menu panel adapts to viewport edges (no longer static `left-0 top-full`)
- ColorPicker portal interaction does not close the menu
- No non-null assertions (`!`) on optional callbacks in EmbedEditor
- ContainerChildWrapper pattern choice is documented

---

## Assumptions

1. `@floating-ui/react` `useDismiss` supports a custom `outsidePress` handler or can be augmented to ignore clicks inside `FloatingPortal` containers — this is consistent with how the library works (the `outsidePress` option accepts a function).
2. The project's existing `AnchoredPopover` pattern (in `src/components/AnchoredPopover/`) is the canonical reference for `@floating-ui/react` integration. The plan follows that same pattern where applicable.
3. Arrow-key navigation is implemented directly (not via `react-aria` `useMenu`/`useMenuItem`) to keep ActionsMenu self-contained and avoid a heavy dependency for a simple menu. The project's `Button` component uses `react-aria` `useButton`, but ActionsMenu items don't need the full press-event abstraction.
4. Container children intentionally keep the hover-icon toolbar (not the cog pattern) because they are nested/lightweight and a cog inside a cog would be confusing UX. This is documented, not changed.
5. Finding 4 (container-specific logic in ComponentEditor) is accepted as-is per the critique recommendation. No code change needed — only a comment if the implementer deems it helpful.

---

## Plan

### Milestone 1 — Replace Hand-Rolled Dismiss with `@floating-ui/react` (Finding 1)

**Objective**: Eliminate the manual `mousedown`/`keydown` event listeners and fragile `[data-floating-ui-portal]` selector. Use the same `@floating-ui/react` primitives the project already depends on.

**Where**: `src/components/DiscordMessageEditor/components/ActionsMenu.tsx`

**Tasks**:

1. Replace the `useState(open)` + manual listeners with `@floating-ui/react`'s `useFloating`, `useClick`, `useDismiss`, `useInteractions`, and `useRole` — following the same pattern as `AnchoredPopover/utils.tsx`.
2. Configure `useFloating` with `flip()` and `shift()` middleware so the panel repositions when near viewport edges (currently static `left-0 top-full`).
3. Configure `useDismiss` with a custom `outsidePress` handler to prevent the menu from closing when the user clicks inside a `FloatingPortal` (e.g., the ColorPicker). Use `outsidePress: (event) => !event.target.closest('[data-floating-ui-portal]')`. The `[data-floating-ui-portal]` attribute is set by `FloatingPortal` itself — this is the library's documented detection mechanism for this exact case, inherited from the `@floating-ui/react` docs' own `outsidePress` guard examples. It is not a fragile CSS-selector hack.
4. Remove the `useEffect` block with `document.addEventListener('mousedown', ...)` and `document.addEventListener('keydown', ...)`.
5. Apply `refs.setReference` to the trigger button and `refs.setFloating` to the panel div. Use `getReferenceProps()` and `getFloatingProps()` from `useInteractions` to wire up the trigger and panel.
6. Replace the static `className` positioning (`absolute left-0 top-full z-10 mt-1`) with floating-ui's computed `style` (`floatingStyles` from `useFloating`). Keep the visual styling classes (border, bg, shadow, etc.).
7. The menu should still stay open when items inside are clicked (move arrows). This is the default behavior — `useDismiss` only closes on outside clicks and Escape, not on clicks inside the floating element.

**Acceptance Criteria**:
- Menu opens/closes on trigger click
- Menu closes on outside click and Escape
- Menu does NOT close when clicking inside a `FloatingPortal` (e.g., ColorPicker)
- Menu does NOT close when clicking menu items (move arrows)
- Panel repositions via `flip()`/`shift()` when near viewport edges
- No manual event listeners remain

---

### Milestone 2 — Add ARIA Roles and Keyboard Navigation (Finding 2)

**Objective**: Make `ActionsMenu` accessible to keyboard-only and screen-reader users by implementing WAI-ARIA menu pattern.

**Where**: `src/components/DiscordMessageEditor/components/ActionsMenu.tsx`

**Tasks**:

1. Use `useRole(context, { role: 'menu' })` — this automatically injects `role="menu"` on the panel via `getFloatingProps()` and `aria-haspopup="menu"` on the trigger via `getReferenceProps()`. **Do not** use `useRole(context)` without arguments — that is the `AnchoredPopover` default and resolves to `role="dialog"`, which is wrong here. Add `useRole` to the `useInteractions([...])` array alongside `useClick` and `useDismiss`.
2. Manually add `role="menuitem"` to each `ActionsMenuItem` button and `role="separator"` to `ActionsMenuDivider`. Item roles are **not** provided by `useRole` for native roles — they must be explicitly set on the elements.
3. Use `useListNavigation(context, { listRef, activeIndex, onNavigate: setActiveIndex, loop: true })` for arrow-key navigation (Up/Down/Home/End; items with `disabled` or `aria-disabled` are skipped automatically). Add `useListNavigation` to the `useInteractions([...])` array. Use the `FloatingList` + `useListItem()` pattern to manage item registration automatically across conditional renders:
   - Maintain `activeIndex: number | null` / `setActiveIndex` state in `ActionsMenu`.
   - Create `listRef = useRef<(HTMLElement | null)[]>([])` and pass it to `useListNavigation`.
   - Wrap the panel content (inside `FloatingFocusManager`) in `<FloatingList elementsRef={listRef}>`.
   - `ActionsMenuItem` calls `const { ref, index } = useListItem()` internally to self-register into `listRef` and receive its computed index. This removes the need for any `index` prop on the public `ActionsMenu.Item` API — callers (`ComponentEditor`, `EmbedEditor`) do not supply indices.
   - `ActionsMenuDivider` does **not** call `useListItem()` and is not registered in `listRef`.
   - `getItemProps()` from `useInteractions` must be spread on each `ActionsMenuItem`. Pass it through the `FloatingList` context or as an internal prop — do not expose it on the public API.
4. Wrap the open floating panel in `<FloatingFocusManager context={context}>` instead of a plain `<div>`. This handles focus-on-open (moves to first tabbable item) and focus-return-on-close (returns focus to the trigger). See `AnchoredPopover/Child.tsx` for the in-project reference usage.

**Acceptance Criteria**:
- Trigger has `aria-haspopup="menu"` (via `useRole`) and `aria-expanded`
- Panel has `role="menu"` (via `useRole`), items have `role="menuitem"`, dividers have `role="separator"`
- Arrow keys (Up/Down/Home/End) navigate between items; disabled items are skipped
- `getItemProps()` is spread on each `ActionsMenuItem` via `FloatingList` context; item nodes are registered automatically via `useListItem()` (no caller-supplied index props)
- Focus moves to the first item on open when triggered via keyboard; when triggered via pointer, focus lands on the menu container and arrow keys navigate from there
- Screen reader announces menu structure correctly

---

### Milestone 3 — Fix Non-Null Assertions in EmbedEditor (Finding 5)

**Objective**: Replace non-null assertions (`!`) with safe optional chaining to eliminate the type-safety bypass.

**Where**: `src/components/DiscordMessageEditor/components/EmbedEditor/index.tsx`

**Tasks**:

1. Replace `onPress={onMoveUp!}` with `onPress={() => onMoveUp?.()}` (and same for `onMoveDown!` and `onDuplicate!`).
2. This applies to the three `ActionsMenu.Item` usages inside `NullableComponent` guards.

**Acceptance Criteria**:
- Zero non-null assertions on optional callbacks
- Behavior unchanged — items still only render when the callback is defined (NullableComponent guard)

---

### Milestone 4 — Document ContainerChildWrapper Pattern Choice (Finding 3)

**Objective**: Explicitly document that the hover-icon toolbar for container children is an intentional UX decision, not an oversight.

**Where**: `.github/copilot-instructions.md` (the `ActionsMenu` documentation section already added in the previous session)

**Tasks**:

1. Add a note to the `ActionsMenu` documentation in the WYSIWYG editor section stating that container children intentionally use the hover-icon toolbar pattern (not `ActionsMenu`) because they are nested and a cog-within-a-cog would be confusing. The top-level cog is for `ComponentEditor` and `EmbedEditor` only.

**Acceptance Criteria**:
- Copilot instructions document the deliberate pattern distinction

---

### Milestone 5 — Accept Container Logic in ComponentEditor (Finding 4)

**No code change required.** The critique recommended accepting this as-is. The `isContainer` check, `setAccentColor`, and `toggleSpoiler` in `ComponentEditor` are a pragmatic solution to the dual-gutter overlap problem. The potential future refactor path (`renderMenuExtras` prop) is noted here for reference but not planned.

**Acceptance Criteria**:
- No action needed. Finding acknowledged.

---

## Testing Strategy

- **Unit**: Verify ARIA attributes render correctly on trigger, panel, and items. Verify arrow-key navigation cycles through items and skips disabled ones. Verify focus management on open/close.
- **Integration**: Verify ColorPicker interaction inside the menu doesn't dismiss the menu. Verify move arrows don't dismiss. Verify flip/shift behavior near viewport edges.
- **Regression**: Existing 140 tests should continue to pass. No data model changes.

---

## Risks

| Risk                                                                                                       | Likelihood | Impact | Mitigation                                                                                                  |
| ---------------------------------------------------------------------------------------------------------- | ---------- | ------ | ----------------------------------------------------------------------------------------------------------- |
| `useDismiss` `outsidePress` function signature changes in future `@floating-ui/react` versions             | Low        | Low    | Using a stable, documented API. Pin major version.                                                          |
| `useRole(context)` (AnchoredPopover default) copied instead of `useRole(context, { role: 'menu' })`        | Medium     | Low    | Plan explicitly specifies the correct call and warns against the AnchoredPopover default (`role="dialog"`). |
| Arrow-key navigation conflicts with `DiscordContentEditor` or `SlateEditor` key handlers when menu is open | Low        | Medium | Menu captures keyboard events while open via focused items                                                  |

---

## Dependencies

- Milestone 2 depends on Milestone 1 (the `useFloating` context from Milestone 1 is required by `useRole`, `useListNavigation`, and `FloatingFocusManager`)
- Milestones 3 and 4 are independent of all others
- Milestone 5 requires no implementation

---

## Handoff Notes

- **To Critic**: This plan addresses all 5 findings from critique 001. Findings 1+2 are merged into a cohesive rewrite of `ActionsMenu.tsx`. Finding 4 requires no action. Finding 5 is a one-line-each change. Finding 3 is documentation only.
- **To Implementer**: The primary work is in `ActionsMenu.tsx` (Milestones 1+2). Reference `AnchoredPopover/utils.tsx` for the general `@floating-ui/react` hook setup (`useFloating`, `useClick`, `useDismiss`, `useInteractions`), but **do not copy its `useRole` call** — `AnchoredPopover` uses `useRole(context)` with no arguments, which defaults to `role="dialog"`. This plan requires `useRole(context, { role: 'menu' })`. The full interaction hook set for `ActionsMenu` is: `useClick`, `useDismiss`, `useRole` (with `role: 'menu'`), and `useListNavigation`. Use `FloatingList` + `useListItem()` inside `ActionsMenuItem` for automatic index registration — do not require callers to supply `index` props. Wrap the panel in `<FloatingFocusManager>` (see `AnchoredPopover/Child.tsx` for in-project usage). For the `outsidePress` guard, use `outsidePress: (event) => !event.target.closest('[data-floating-ui-portal]')` — this is the `@floating-ui/react` library’s own documented approach for this case.
