---
ID: 3
Origin: 1
UUID: b7e2d4a1
Status: Released
---

# QA Report: ActionsMenu Critique Remediation

**Plan Reference**: `agent-output/planning/003-actions-menu-critique-remediation.md`
**Implementation Reference**: `agent-output/implementation/003-actions-menu-critique-remediation.md`
**Code Review Reference**: `agent-output/code-review/003-actions-menu-critique-remediation-code-review.md`
**QA Status**: QA Complete
**QA Specialist**: qa

## Changelog

| Date       | Agent Handoff | Request                                    | Summary                                                                                                       |
| ---------- | ------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| 2026-04-06 | Reviewer → QA | Code review approved, ready for QA testing | Static code audit against all 9 acceptance criteria. 140/140 tests pass. 0 TS errors. All criteria satisfied. |

## Timeline

- **Test Strategy Started**: 2026-04-06
- **Implementation Received**: 2026-04-06 (code review approved after 2 rounds)
- **Testing Started**: 2026-04-06
- **Testing Completed**: 2026-04-06
- **Final Status**: QA Complete

---

## Test Strategy

### Approach

Plan 003 is a **UI refactor + accessibility polish** of the existing `ActionsMenu` component. It replaces hand-rolled dismiss logic with `@floating-ui/react` library primitives and adds WAI-ARIA menu roles. The core changes are:

1. `ActionsMenu.tsx` rewritten with `@floating-ui/react` hook integration
2. Non-null assertions removed from `EmbedEditor`
3. `ContainerChildWrapper` pattern documented in copilot-instructions
4. Post-plan UX fixes (13+ iterations): FloatingPortal, ColorPicker relocation, focus tracking, character count threshold, edit-mode spacing
5. Code review remediation: `intToHex` DRY extraction, context throw guard

**Testing constraints**: No component testing infrastructure exists (`@testing-library/react` not installed). ARIA behavior, keyboard navigation, and focus management are provided by `@floating-ui/react` (a well-tested library). QA verifies correct **wiring** (hooks used with correct arguments, ARIA attributes rendered, no manual listeners) via static code audit, TypeScript compilation (hook args are strongly typed), and existing unit test regression.

### Testing Infrastructure Requirements

No new testing infrastructure needed. The existing Vitest setup (from Plan 001 QA) covers all testable code. Plan 003's changes are UI component refactoring — the testable data-layer code they interact with is already covered by 140 tests.

### Test Types

- **Static code audit**: Verify all plan acceptance criteria are met via code inspection
- **Regression tests**: Confirm 140/140 existing tests still pass
- **TypeScript compilation**: Confirm 0 production errors
- **Code review validation**: Confirm all 4 code review findings are resolved

---

## Acceptance Criteria Audit

### Milestone 1 — Replace Hand-Rolled Dismiss with `@floating-ui/react`

| Criterion                                                 | Status | Evidence                                                                                   |
| --------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------ |
| Menu opens/closes on trigger click                        | ✅ PASS | `useClick(context)` at line 93, `getReferenceProps()` spread on trigger button at line 117 |
| Menu closes on outside click and Escape                   | ✅ PASS | `useDismiss(context, { outsidePress: ... })` at lines 94–98                                |
| Menu does NOT close on FloatingPortal click (ColorPicker) | ✅ PASS | `outsidePress: (event) => !target.closest('[data-floating-ui-portal]')` at lines 95–97     |
| Menu does NOT close on item click (move arrows)           | ✅ PASS | `useDismiss` only fires on outside clicks/Escape. Items are inside the floating element.   |
| Panel repositions via `flip()`/`shift()`                  | ✅ PASS | `middleware: [flip(), shift()]` at line 91, `floatingStyles` applied to panel at line 131  |
| No manual event listeners remain                          | ✅ PASS | `grep` for `addEventListener`, `mousedown`, `keydown` returns 0 matches in ActionsMenu.tsx |

### Milestone 2 — Add ARIA Roles and Keyboard Navigation

| Criterion                                                           | Status | Evidence                                                                                                                                                                              |
| ------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Trigger has `aria-haspopup="menu"`                                  | ✅ PASS | `useRole(context, { role: 'menu' })` at line 99, injected via `getReferenceProps()`                                                                                                   |
| Panel has `role="menu"`                                             | ✅ PASS | Injected by `useRole` via `getFloatingProps()` spread on panel div at line 139                                                                                                        |
| Items have `role="menuitem"`                                        | ✅ PASS | Explicit `role="menuitem"` on each `ActionsMenuItem` button at line 47                                                                                                                |
| Dividers have `role="separator"`                                    | ✅ PASS | Explicit `role="separator"` on `ActionsMenuDivider` at line 68                                                                                                                        |
| Arrow keys navigate items; disabled items skipped                   | ✅ PASS | `useListNavigation(context, { listRef, activeIndex, onNavigate, loop: true })` at lines 100–105                                                                                       |
| `getItemProps()` via context; auto-registration via `useListItem()` | ✅ PASS | `ActionsMenuContext` passes `getItemProps`+`activeIndex` (lines 141–143). `useListItem()` at line 39. `FloatingList elementsRef={listRef}` at line 142. No index props on public API. |
| Focus managed on open/close                                         | ✅ PASS | `FloatingFocusManager context={context} modal={false}` at line 129                                                                                                                    |
| Screen reader announces menu structure                              | ✅ PASS | `aria-label` on trigger (`${label} actions` at line 115), `role="menu"` on panel, `role="menuitem"` on items, `role="separator"` on dividers                                          |

### Milestone 3 — Fix Non-Null Assertions in EmbedEditor

| Criterion                                      | Status | Evidence                                                                                                                 |
| ---------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------ |
| Zero non-null assertions on optional callbacks | ✅ PASS | `grep` for `onMoveUp!`, `onMoveDown!`, `onDuplicate!` returns 0 matches. Lines 107/112/121 use `() => onMoveUp?.()` etc. |
| Behavior unchanged                             | ✅ PASS | Items still guarded by `NullableComponent show={onMoveUp}` etc.                                                          |

### Milestone 4 — Document ContainerChildWrapper Pattern

| Criterion                                             | Status | Evidence                                                                                                                                                                                                                                                                                            |
| ----------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Copilot instructions document the pattern distinction | ✅ PASS | `.github/copilot-instructions.md` line 49: "Note: `ContainerChildWrapper` intentionally uses a hover-icon toolbar (not `ActionsMenu`) because container children are nested — a cog-within-a-cog would be confusing UX. The top-level cog pattern is for `ComponentEditor` and `EmbedEditor` only." |

### Milestone 5 — Accept Container Logic

| Criterion        | Status | Evidence                                                                                                                                     |
| ---------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| No action needed | ✅ PASS | Finding acknowledged, no code change. Container-specific logic retained in ComponentEditor (lines 62–68: `setAccentColor`, `toggleSpoiler`). |

---

## Code Review Finding Resolution

| Finding                        | Status     | Evidence                                                                                                                                                                            |
| ------------------------------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| F1 — `intToHex` duplicated     | ✅ RESOLVED | Single definition at `src/utils/index.ts:266`. `ContainerEditor.tsx:30` and `EmbedEditor/index.tsx:18` both import from `~/utils`. `grep 'function intToHex'` returns 1 match only. |
| F2 — Context optional chaining | ✅ RESOLVED | `ActionsMenu.tsx:37`: `if (!ctx) throw new Error(...)`. All subsequent access non-optional: `ctx.activeIndex`, `ctx.getItemProps(...)`.                                             |
| F3 — `!p-1` important modifier | ✅ ACCEPTED | Recognized codebase pattern per code review.                                                                                                                                        |
| F4 — Stale implementation doc  | ✅ RESOLVED | 10-file table, 3 changelog entries, expanded summary.                                                                                                                               |

---

## Post-Plan UX Changes Audit

The implementation included 13+ UX iterations beyond the original 5 milestones. Verified:

| Change                                         | Status | Evidence                                                                                                               |
| ---------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------- |
| `FloatingPortal` for z-index escape            | ✅      | `ActionsMenu.tsx:128`: `<FloatingPortal>` wraps floating content                                                       |
| ColorPicker outside menu (not inside dropdown) | ✅      | `EmbedEditor/index.tsx:100`: `<ColorPicker>` after `</ActionsMenu>` in gutter. `ComponentEditor.tsx:122`: same pattern |
| Gutter layout consistent                       | ✅      | Both use `absolute left-0 translate-x-[calc(-100%-4px)] flex flex-col items-center gap-2 px-2`                         |
| Character count ≤200 threshold                 | ✅      | `Desktop.tsx:109`: `remaining <= 200`. `Mobile.tsx:110`: `remaining <= 200`                                            |
| ContainerChildWrapper focus tracking           | ✅      | `ContainerEditor.tsx:179–193`: `contentRef` + `onFocus`/`onBlur` with `contains()` check, conditional toolbar DOM      |
| Edit-mode spacing                              | ✅      | `ContainerEditor.tsx:106`: `showEdit && 'gap-2'`                                                                       |

---

## Test Execution Results

### Unit Tests

- **Command**: `npx vitest run`
- **Status**: PASS
- **Output**: 5 files, 140 tests, 140 passed, 0 failed, 756ms
- **Coverage**: Not configured (data-layer only; no component tests)

### TypeScript Compilation

- **Status**: PASS
- **Output**: 0 errors across all production files (verified via `get_errors`)

### Regression Assessment

- **Before**: 140/140 tests passing (Plan 001 QA baseline)
- **After**: 140/140 tests passing (no regressions)
- **New tests**: None required — Plan 003 is a UI refactor of existing components with no new data-layer functions

---

## TDD Compliance

Plan 003 is a **refactor** — the `ActionsMenu` public API is unchanged, the same callers use the same `ActionsMenu.Item` / `ActionsMenu.Divider` components, and the internal implementation now delegates to `@floating-ui/react` hooks. No new functions or classes were created.

The implementation doc's TDD table correctly identifies this:

| Function/Class                       | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
| ------------------------------------ | --------- | ------------------- | ----------------- | -------------- | ---------------- |
| N/A — refactor of existing component | N/A       | N/A (refactor)      | N/A               | N/A            | N/A              |

**Assessment**: TDD compliance requirement is satisfied via the refactor exemption. Existing test coverage confirms no regressions.

---

## Risk Assessment

| Risk                                                   | Mitigation                                                        | Outcome                               |
| ------------------------------------------------------ | ----------------------------------------------------------------- | ------------------------------------- |
| `useDismiss` outsidePress API change                   | Using stable documented API; `@floating-ui/react ^0.27.18` pinned | No issues                             |
| `useRole` copied from AnchoredPopover (dialog default) | Plan explicitly specified `{ role: 'menu' }`                      | Correctly implemented at line 99      |
| Arrow-key conflicts with SlateEditor                   | `FloatingFocusManager` captures keyboard events when menu is open | No conflicts (menu renders in portal) |

---

## Findings

### FINDING-001 (INFO): No Component Test Infrastructure

The project lacks `@testing-library/react` or equivalent. ARIA attributes, keyboard navigation, and focus management delivered by `@floating-ui/react` are verified only via static code audit (correct hook wiring + TypeScript type checking), not via automated interaction tests. This is acceptable for a refactor leveraging a well-tested library, but future feature additions to `ActionsMenu` should consider adding component test infrastructure.

**Severity**: INFO — not blocking. The library's own test suite covers the behavior; we audit correct wiring.

---

## Version Artifacts

Not applicable — Plan 003 has no version bump (`Target Release: N/A`).

---

## Summary

**All 9 acceptance criteria across 5 milestones are satisfied.** The ActionsMenu rewrite correctly integrates `@floating-ui/react` hooks for positioning, dismiss, ARIA roles, and keyboard navigation. All 4 code review findings are resolved. 140/140 tests pass with 0 regressions. 0 TypeScript errors.

Handing off to uat agent for value delivery validation.
