---
ID: 1
Origin: 1
UUID: a3f7c9e2
Status: Findings Documented
---

# UI Bug Investigation: Components V2 Formatting Issues

**Plan Reference**: `agent-output/planning/001-components-v2-state-management.md`
**QA Report Reference**: `agent-output/qa/001-components-v2-state-management-qa.md`
**Date**: 2026-04-01
**Investigator**: QA Agent

---

## Summary

Two user-reported UI formatting bugs were investigated. Root causes have been identified for both, along with **a systemic issue affecting every new component editor file**: invalid Tailwind CSS class names throughout all new code.

---

## Bug 1: Action Button Overlap on Short Components

### Symptom
When a component row has little or no content (e.g., an empty Action Row with no buttons), the left-side action icons (duplicate, delete, move up, move down) overlap into adjacent components.

### Root Cause
`ComponentEditor.tsx` (line 63) wraps each component in:
```jsx
<div className="relative">
```
The action buttons are absolutely positioned to the left:
```jsx
<div className={classNames(
  styles.flex({ col: true, gap: 3 }),
  'absolute left-0 translate-x-[calc(-100%-4px)] px-2',
)}>
```
When a component body is shorter than the stacked action buttons (~4 icons at ~28px each ≈ 112px+), the buttons overflow below the component.

### Why Embeds Don't Have This Problem
`EmbedEditor/index.tsx` uses:
```jsx
<article className="markup discord-visualizer__embed-wrapper discord-visualizer__embed--full">
```
The `.discord-visualizer__embed--full` class provides `background`, `border-left`, and grid layout. The embed always renders sub-components (author, title, description, etc.) that give it natural height well above the action buttons.

### Affected Components
Any component whose body collapses to a small height:
- **Empty Action Row** (most visible — zero buttons = only the small "Add Button" dashed box at 32px height)
- **Separator** (only 8-24px depending on spacing mode)
- **Text Display** when empty (single line height)

### Recommended Fix
Add a `min-h-[...]` to the wrapper in `ComponentEditor.tsx`, or apply a CSS class that ensures the wrapper is at least as tall as the action button column. Example:
```jsx
<div className="relative min-h-[7rem]">
```
Alternatively, calculate dynamically based on visible button count, but a static min-height matching the maximum button stack (4 buttons) is simpler and sufficient.

---

## Bug 2: Dropdowns & Popovers Lacking Background/Formatting

### Symptom
When clicking "Link" (button editor popover), "Add Component" menu, and all other inline dropdowns/popovers in the new component editors, they appear with no visible background, no borders, and no proper formatting.

### Root Cause: Invalid Tailwind Class Names

**This is the primary bug.** Every new component editor uses Tailwind color classes that **do not exist** in the project's `tailwind.config.js`.

The project's Tailwind config (`tailwind.config.js` lines 36-52) defines colors as shorthand tokens:
```js
colors: {
  primary: 'var(--background-primary)',
  secondary: 'var(--background-secondary)',
  tertiary: 'var(--background-tertiary)',
  'text-mute': 'var(--text-muted)',
  'header-secondary': 'var(--header-secondary)',
  'modifier-accent': 'var(--background-modifier-accent)',
  // ...
}
```

The correct Tailwind usage is `bg-secondary`, `border-tertiary`, etc. But the new code uses the **full CSS variable name** embedded in the class name, which doesn't match any Tailwind token:

| Invalid Class (used in new code)     | Correct Tailwind Class | Occurrences            |
| ------------------------------------ | ---------------------- | ---------------------- |
| `bg-background-secondary`            | `bg-secondary`         | 8 files                |
| `bg-background-primary`              | `bg-primary`           | 7+ input elements      |
| `border-background-tertiary`         | `border-tertiary`      | 20+ occurrences        |
| `bg-background-secondary/95`         | `bg-secondary/95`      | 1 (MediaGalleryEditor) |
| `text-text-muted`                    | `text-text-mute`       | 7+ occurrences         |
| `text-header-primary`                | **⚠️ NOT IN CONFIG**    | 10+ occurrences        |
| `hover:bg-background-modifier-hover` | **⚠️ NOT IN CONFIG**    | 2 (menu items)         |
| `border-error` / `text-error`        | **⚠️ NOT IN CONFIG**    | 2 (LinkButtonEditor)   |

### Missing Colors (not in `tailwind.config.js`)

These three color tokens are used in the new code but **do not exist** in the Tailwind config at all. They need to be either added to the config or replaced with existing alternatives:

1. **`header-primary`** — Used as `text-header-primary` on inputs and menu items. The config has `header-secondary` but not `header-primary`. Must add `'header-primary': 'var(--header-primary)'` to the colors config, or use an existing text color.

2. **`background-modifier-hover`** — Used as `hover:bg-background-modifier-hover` on menu item hover states. The config has `modifier-accent` → `var(--background-modifier-accent)` but no hover variant. Must add `'modifier-hover': 'var(--background-modifier-hover)'` or use `hover:bg-modifier-accent`.

3. **`error`** — Used as `border-error` and `text-error` for URL validation in `LinkButtonEditor`. No error color exists. Must add `error: 'var(--text-danger)'` (or appropriate CSS var) or use Tailwind's built-in `red-400`/`red-500`.

### Affected Files — Complete List

Every file below has invalid Tailwind class names that produce no styling:

| File                                      | Invalid Classes Used                                                                                                                    |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `ComponentEditors/ActionRowEditor.tsx`    | `border-background-tertiary`, `bg-background-secondary`, `text-text-muted`                                                              |
| `ComponentEditors/LinkButtonEditor.tsx`   | `border-background-tertiary`, `bg-background-primary`, `text-header-primary`, `text-text-muted`, `border-error`, `text-error`           |
| `ComponentEditors/SectionEditor.tsx`      | `border-background-tertiary`, `bg-background-secondary`, `text-text-muted`                                                              |
| `ComponentEditors/ThumbnailEditor.tsx`    | `border-background-tertiary`, `bg-background-secondary`, `bg-background-primary`, `text-header-primary`, `text-text-muted`              |
| `ComponentEditors/FileEditor.tsx`         | `border-background-tertiary`, `bg-background-secondary`, `bg-background-primary`, `text-header-primary`, `text-text-muted`              |
| `ComponentEditors/SeparatorEditor.tsx`    | `border-background-tertiary`, `bg-background-secondary`, `bg-background-primary`, `text-header-primary`, `text-text-muted`              |
| `ComponentEditors/MediaGalleryEditor.tsx` | `border-background-tertiary`, `bg-background-secondary/95`, `bg-background-primary`, `text-header-primary`, `text-text-muted`           |
| `ComponentEditors/ContainerEditor.tsx`    | `border-background-tertiary`, `bg-background-secondary`, `text-header-primary`, `hover:bg-background-modifier-hover`                    |
| `DiscordMessageEditor/index.tsx`          | `border-background-tertiary`, `bg-background-secondary`, `text-header-primary`, `hover:bg-background-modifier-hover`, `text-text-muted` |

---

## Secondary Issue: Pattern Deviation (HeadlessUI Menu vs Established Dropdown)

### Observation
The new code introduces `@headlessui/react` `Menu`/`MenuButton`/`MenuItem`/`MenuItems` for dropdown menus. The codebase's established pattern uses the project's own `Dropdown` component (`~/components/Dropdown.tsx`) backed by `AnchoredPopover` + `@floating-ui/react`.

**Three types of popover patterns in the new code:**

1. **HeadlessUI Menu** (2 instances): `DiscordMessageEditor/index.tsx` "Add Component" menu, `ContainerEditor.tsx` "Add Child" menu
2. **Raw absolute-positioned `<div>`** (7 instances): All inline popovers in ActionRowEditor, SectionEditor, ThumbnailEditor, FileEditor, SeparatorEditor, MediaGalleryEditor, LinkButtonEditor (rendered inside ButtonVisual/AccessoryButton)
3. **Established `Dropdown`/`AnchoredPopover`** (0 instances in new code)

### Implications
- Once the Tailwind classes are fixed, the raw `<div>` popovers will visually work but lack:
  - **Animated transitions** (the established `Dropdown` uses `styles.transition()`)
  - **Portal rendering** (popovers can be clipped by overflow:hidden parents)
  - **Proper min-width matching** the trigger element
  - **Consistent close behavior** across the app
- The HeadlessUI `Menu` approach is a separate dependency from the existing `AnchoredPopover`/`Dropdown` system, creating two parallel dropdown implementations.
- **This is a lower-priority concern** — the immediate fix is the Tailwind classes. The pattern alignment can be addressed in a follow-up.

---

## Action Items for Implementer

### Priority 1 (Critical — Fixes visible bugs):

1. **Fix all invalid Tailwind class names** in the 9 affected files. Global find-and-replace:
   - `bg-background-secondary` → `bg-secondary`
   - `bg-background-primary` → `bg-primary`
   - `border-background-tertiary` → `border-tertiary`
   - `bg-background-secondary/95` → `bg-secondary/95`
   - `text-text-muted` → `text-text-mute`

2. **Add missing color tokens** to `tailwind.config.js` colors:
   ```js
   'header-primary': 'var(--header-primary)',
   'modifier-hover': 'var(--background-modifier-hover)',
   error: 'var(--text-danger)',  // verify correct CSS variable
   ```
   Then fix the class names:
   - `text-header-primary` → OK after adding token (or rename if different var desired)
   - `hover:bg-background-modifier-hover` → `hover:bg-modifier-hover` (after adding token)
   - `border-error` / `text-error` → OK after adding token

3. **Add `min-h-[7rem]`** (or similar) to the wrapper `<div>` in `ComponentEditor.tsx` line 63 to prevent action button overlap on short components.

### Priority 2 (Follow-up — Pattern consistency):

4. Consider migrating the HeadlessUI `Menu`  dropdowns to the project's `Dropdown` component for consistency.
5. Consider using `AnchoredPopover` for the inline popovers (button editor, thumbnail editor, etc.) to gain transitions, portal support, and consistent close behavior.

---

## Verification

After fixes are applied, verify:
- [ ] "Add Component" dropdown renders with visible background, border, and shadow
- [ ] "Add Child" dropdown in Container Editor renders properly
- [ ] Link button editor popover has visible background when clicking a link button
- [ ] All input fields in popovers have visible backgrounds and borders
- [ ] Placeholder text is visible (uses `text-text-mute` color)
- [ ] Error states on URL field show red border and text
- [ ] Hover states on menu items show highlight
- [ ] Empty Action Row action buttons don't overlap with components above/below
- [ ] Separator component action buttons don't overlap
