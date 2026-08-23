---
ID: 3
Origin: 1
UUID: b7e2d4a1
Status: Released
---

# UAT Report: ActionsMenu Critique Remediation

**Plan Reference**: `agent-output/planning/003-actions-menu-critique-remediation.md`
**Date**: 2026-04-06
**UAT Agent**: Product Owner (UAT)

## Changelog

| Date       | Agent Handoff | Request                                              | Summary                                                                                                                            |
| ---------- | ------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| 2026-04-06 | QA → UAT      | QA Complete, all 9 acceptance criteria pass, 140/140 | UAT Complete — implementation delivers stated accessibility and robustness value. All predecessor docs pass. APPROVED FOR RELEASE. |

## Value Statement Under Test

> As a user of the Hooks.gg message builder, I want the ActionsMenu cog dropdown to be accessible, robust, and architecturally consistent, so that keyboard and screen-reader users can navigate actions reliably, and the dismiss behavior doesn't break when dependencies update.

## Predecessor Document Review

| Document                                                             | Status          | Notes                                                                                                                                 |
| -------------------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Implementation (`003-actions-menu-critique-remediation.md`)          | **Complete**    | All 5 milestones checked off. 10 files modified. 140/140 tests. 0 TS errors.                                                          |
| Code Review (`003-actions-menu-critique-remediation-code-review.md`) | **Approved**    | Initial APPROVED_WITH_COMMENTS (4 findings: F1–F4). Re-reviewed after remediation → **APPROVED**. All 3 actionable findings resolved. |
| QA (`003-actions-menu-critique-remediation-qa.md`)                   | **QA Complete** | Static code audit against all 9 acceptance criteria. 140/140 tests. 0 TS errors. 1 INFO finding (no component test infra).            |

All three predecessor documents show passing status. No gaps.

## UAT Scenarios

### Scenario 1: Keyboard User Navigates ActionsMenu

- **Given**: A keyboard-only user is editing a Discord message with embeds or V2 components
- **When**: The user tabs to the cog icon and activates it
- **Then**: The menu opens with `role="menu"`, focus moves into the panel via `FloatingFocusManager`, arrow keys cycle through `role="menuitem"` items via `useListNavigation(loop: true)`, and Escape closes the menu returning focus to the trigger
- **Result**: PASS
- **Evidence**: `ActionsMenu.tsx` lines 99–105: `useRole(context, { role: 'menu' })`, `useListNavigation(context, { listRef, activeIndex, onNavigate, loop: true })`. Line 129: `FloatingFocusManager context={context} modal={false}`. Line 47: `role="menuitem"`. Line 68: `role="separator"`. Trigger at line 115: `aria-label={\`${label} actions\`}` with `getReferenceProps()` injecting `aria-haspopup="menu"`.

### Scenario 2: Dismiss Behavior Doesn't Break with ColorPicker

- **Given**: A user opens the ActionsMenu on a Container component
- **When**: The user clicks the ColorPicker (rendered via `FloatingPortal`) to change the container accent color
- **Then**: The ActionsMenu remains open; the ColorPicker interaction is not treated as an outside click
- **Result**: PASS
- **Evidence**: `ActionsMenu.tsx` lines 94–98: `useDismiss(context, { outsidePress: (event) => !target.closest('[data-floating-ui-portal]') })`. ColorPicker renders via `AnchoredPopover` with `portal` prop (which uses `FloatingPortal`). ColorPicker is placed outside the ActionsMenu dropdown in the gutter (`EmbedEditor/index.tsx:100`, `ComponentEditor.tsx:122`).

### Scenario 3: Menu Adapts to Viewport Edges

- **Given**: An embed or component is positioned near the edge of the viewport
- **When**: The user opens the ActionsMenu cog
- **Then**: The menu panel repositions automatically instead of overflowing off-screen
- **Result**: PASS
- **Evidence**: `ActionsMenu.tsx` lines 89–91: `useFloating({ placement: 'left-start', middleware: [flip(), shift()] })`. `floatingStyles` applied to panel div at line 131. This replaces the previous static `absolute left-0 top-full` positioning.

### Scenario 4: No Silent Failures from Misuse

- **Given**: A developer accidentally uses `ActionsMenu.Item` outside an `ActionsMenu`
- **When**: The component renders
- **Then**: A helpful error is thrown instead of silently failing with undefined ARIA props
- **Result**: PASS
- **Evidence**: `ActionsMenu.tsx` line 37: `if (!ctx) throw new Error('ActionsMenu.Item must be used inside ActionsMenu')`. Follows the project's provider pattern (throw on null context).

### Scenario 5: Screen Reader Announces Menu Structure

- **Given**: A screen reader user encounters the ActionsMenu
- **When**: They activate the trigger
- **Then**: The trigger is announced as a menu button, the panel as a menu, items as menu items, and dividers as separators
- **Result**: PASS
- **Evidence**: `aria-label={\`${label} actions\`}` on trigger (line 115), `aria-haspopup="menu"` via `useRole` through `getReferenceProps()`, `role="menu"` on panel via `getFloatingProps()`, `role="menuitem"` on items (line 47), `role="separator"` on dividers (line 68).

## Value Delivery Assessment

The value statement has three claims. All are demonstrably delivered:

1. **"accessible"** — Full WAI-ARIA menu pattern implemented: `role="menu"`/`role="menuitem"`/`role="separator"`, `aria-haspopup="menu"`, `aria-expanded`, arrow-key navigation with `useListNavigation(loop: true)`, focus management via `FloatingFocusManager`. This is a complete accessibility solution, not a partial one.

2. **"robust"** — Dismiss behavior now delegated to `@floating-ui/react`'s `useDismiss` with a documented `outsidePress` guard, replacing ~30 lines of manual `mousedown`/`keydown` event listeners. The `FloatingPortal` pattern ensures z-index correctness. No manual event listeners remain (grep-verified). Position adapts via `flip()`/`shift()`.

3. **"architecturally consistent"** — Uses the same `@floating-ui/react` primitives as the project's existing `AnchoredPopover` component, with the correct `useRole(context, { role: 'menu' })` variant (not the `dialog` default). `FloatingList` + `useListItem()` for automatic index management. Public API unchanged — callers required zero modifications.

**No core value is deferred.** The plan's value statement is fully delivered by the implementation.

## QA Integration

**QA Report Reference**: `agent-output/qa/003-actions-menu-critique-remediation-qa.md`
**QA Status**: QA Complete
**QA Findings Alignment**: 1 INFO finding (no component test infrastructure). Acceptable for a refactor leveraging a well-tested library. QA correctly identified this as non-blocking. No actionable findings.

## Technical Compliance

- Plan deliverables:
  - M1: Replace hand-rolled dismiss — **PASS**
  - M2: ARIA roles + keyboard navigation — **PASS**
  - M3: Fix non-null assertions — **PASS**
  - M4: Document ContainerChildWrapper — **PASS**
  - M5: Accept container logic (no-op) — **PASS**
- Test coverage: 140/140 passing, 0 regressions
- Known limitations:
  - No component test infrastructure (INFO, not blocking)
  - Pre-existing ESLint circular config issue (unrelated)
  - `!p-1` Tailwind important modifier accepted as codebase pattern

## Objective Alignment Assessment

**Does code meet original plan objective?**: YES

**Evidence**: The plan's 9 success criteria map 1:1 to the QA audit results. Each criterion has a PASS with specific file:line evidence. The implementation doc's "How this delivers the Value Statement" section accurately maps features to value claims. Independent code verification of `ActionsMenu.tsx` confirms all `@floating-ui/react` hooks are correctly wired with the right arguments.

**Drift Detected**: The implementation scope expanded with 13+ post-plan UX iterations (FloatingPortal, ColorPicker relocation, focus tracking rework, character count threshold, edit-mode spacing). This is **additive drift** — all changes improve the user experience and none conflict with or dilute the original value statement. The implementation doc and code review captured this expanded scope accurately.

## UAT Status

**Status**: UAT Complete
**Rationale**: All three value claims (accessible, robust, architecturally consistent) are demonstrably delivered by the code. All 9 plan success criteria verified by QA with file:line evidence. All predecessor documents pass (implementation complete, code review approved, QA complete). The 13+ post-plan UX iterations are additive improvements that strengthen value delivery. No core value is deferred.

## Release Decision

**Final Status**: APPROVED FOR RELEASE
**Rationale**: Implementation fully delivers the stated business value. Code review approved with all findings resolved. QA complete with all acceptance criteria passing. 140/140 tests, 0 TypeScript errors, 0 regressions. The ActionsMenu is now accessible, robust, and architecturally consistent with the project's `@floating-ui/react` patterns.
**Recommended Version**: No version bump (plan explicitly states `Target Release: N/A — post-release polish; no version bump`)
**Key Changes for Changelog**:
- ActionsMenu rewritten with full `@floating-ui/react` integration (positioning, dismiss, ARIA roles, keyboard navigation)
- WAI-ARIA menu pattern: `role="menu"`, `role="menuitem"`, arrow-key navigation, focus management
- `FloatingPortal` for z-index escape; ColorPicker portal interaction preserved
- Non-null assertions replaced with safe optional chaining in EmbedEditor
- `intToHex` extracted to shared utility
- ContainerChildWrapper toolbar pattern documented

## Next Actions

None required. Handing off to devops agent for release execution.
