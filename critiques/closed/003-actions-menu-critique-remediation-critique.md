---
ID: 3
Origin: 1
UUID: b7e2d4a1
Status: OPEN
---

# Critique — Plan 003: ActionsMenu Critique Remediation

**Artifact**: [planning/003-actions-menu-critique-remediation.md](../planning/003-actions-menu-critique-remediation.md)
**Parent Critique**: [critiques/001-actions-menu-ux-redesign-critique.md](./001-actions-menu-ux-redesign-critique.md)
**Date**: 2026-04-06
**Revision**: 3

## Changelog

| Date       | Handoff        | Request                                                                  | Summary                                                                                      |
| ---------- | -------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| 2026-04-06 | User → Critic  | Review plan for clarity, completeness, and architectural alignment       | Initial critique. 0 critical, 2 medium, 2 low findings. 0 open questions.                    |
| 2026-04-06 | User → Planner | Revise plan based on critique findings                                   | All 4 findings resolved. Plan 003 updated (Revision 2).                                      |
| 2026-04-06 | User → Critic  | Review Revision 2 for clarity, completeness, and architectural alignment | Revision 2 critique. 0 critical, 2 medium, 1 low new findings on revised content.            |
| 2026-04-06 | User → Planner | Revise plan based on Revision 2 critique findings                        | All 3 findings resolved. Plan 003 updated (Revision 3).                                      |
| 2026-04-06 | User → Critic  | Review Revision 3 for clarity, completeness, and architectural alignment | Revision 3 critique. 0 critical, 0 medium, 2 low findings. Plan approved for implementation. |

---

## Value Statement Assessment

**PASS.** The user story is clear and appropriately scoped:

> "As a user of the Hooks.gg message builder, I want the ActionsMenu cog dropdown to be accessible, robust, and architecturally consistent, so that keyboard and screen-reader users can navigate actions reliably, and the dismiss behavior doesn't break when dependencies update."

The statement maps directly to the two medium findings from the parent critique (fragile dismiss, missing ARIA/keyboard nav), and the three low findings are addressed as explicit plan items (two as minor code changes, one as documentation). The "no version bump" release strategy is appropriate — these are UI-only changes with no data model impact.

---

## Overview

The plan cleanly decomposes the five critique findings into five milestones, with clear ownership of each finding. Milestone 1 (dismiss) and 2 (ARIA/nav) are correctly identified as interdependent. Milestones 3 (non-null assertions) and 4 (documentation) are independent and low-effort. Milestone 5 correctly records acceptance of Finding 4 with no code change.

The overall structure is sound and implementation-ready **with two exceptions**: Milestone 2 describes the outcome of keyboard navigation without naming the `@floating-ui/react` primitives that should implement it, and `FloatingFocusManager` — which the project already uses in `AnchoredPopover/Child.tsx` and is designed expressly for focus management in floating elements — is absent from the plan entirely.

---

## Architectural Alignment

**Mostly aligned, with one meaningful gap.** The plan correctly routes through `@floating-ui/react` as the established dismiss/positioning library (Milestones 1+2), references `AnchoredPopover/utils.tsx` as the canonical pattern, and avoids introducing new dependencies. However:

1. The project's `AnchoredPopover/utils.tsx` calls `useRole(context)` with **no `role` argument**, which defaults to `role="dialog"`. If the implementer copies that pattern verbatim, the menu gets `role="dialog"` instead of `role="menu"`. The plan touches on this only obliquely in the Handoff Notes ("may handle `role="menu"` automatically — verify before adding manual attributes"). This risk should be stated explicitly in the Milestone 2 specification.

2. `@floating-ui/react`'s `useListNavigation` exists precisely for the arrow-key navigation the plan requires, and `FloatingFocusManager` exists for the focus-management behavior (focus first item on open, return focus to trigger on close). Both are used in the docs' own menu examples and are part of the library already imported by the project. The plan's Milestone 2 describes the desired keyboard behavior in detail but does not name either primitive — leaving the implementer to discover them independently or hand-roll their own logic, which would be the third dismiss/interaction pattern (after `@headlessui/react` and `@floating-ui/react`) instead of the second.

---

## Scope Assessment

**Appropriate.** Five milestones map one-to-one to five critique findings. No scope creep. Milestone 5 correctly records the "no-action" decision for Finding 4 as an explicit plan item rather than silently dropping it.

---

## Technical Debt Risks

- **Hand-rolled navigation risk**: If the implementer writes a custom `onKeyDown` for arrow keys rather than using `useListNavigation`, the codebase gains a third interaction-handling pattern in the same component family. This is the exact debt the plan is trying to retire. Not naming `useListNavigation` creates the conditions for this outcome.
- **AnchoredPopover copy-paste risk**: The reference to `AnchoredPopover/utils.tsx` without noting the `role` difference between `dialog` (AnchoredPopover's default) and `menu` (required here) creates a high-probability copy-paste bug.

---

## Findings

### Finding 1 — MEDIUM: Milestone 2 Is Missing `useListNavigation` and `FloatingFocusManager`

**Status**: RESOLVED

**Issue**: Milestone 2 describes the arrow-key navigation behavior with precision (Tasks 4–5: Up/Down/Home/End, focus first item on open, return to trigger on close, skip disabled items) but does not identify the `@floating-ui/react` primitives that implement exactly these behaviors:

- **`useListNavigation`**: The library's dedicated hook for arrow-key list navigation. Accepts `listRef` (array of item DOM refs), `activeIndex`/`onNavigate` (state for the highlighted item), `loop`, and `disabledIndices` (auto-skips `disabled`/`aria-disabled` items). Items use a **roving tabindex** pattern: `tabIndex={activeIndex === i ? 0 : -1}`. Each item's DOM ref must be assigned to `listRef.current[i]`. The returned `getItemProps()` is spread onto each item element.
- **`FloatingFocusManager`**: A wrapper component (already used in the project at `AnchoredPopover/Child.tsx`) that moves focus to the first tabbable item on open and returns focus to the reference element on close. Used in `@floating-ui/react`'s own menu examples in conjunction with `useListNavigation`.

Without these references, the plan correctly describes the accessibility goal but leaves the implementation approach undefined. An implementer following the plan is equally likely to write a custom `onKeyDown` handler — recreating the very hand-rolled pattern Milestone 1 is eliminating — as they are to discover `useListNavigation` independently.

The `getItemProps()` getter from `useListNavigation` must also be passed to each `ActionsMenuItem` (alongside `getFloatingProps()` on the panel and `getReferenceProps()` on the trigger), which changes the component API of `ActionsMenuItem` to accept a `ref` forward and spread `itemProps`. This is a non-trivial structural change that the plan should call out.

**Impact**: If not addressed, there is a high probability that Milestone 2 is implemented with a custom `onKeyDown` handler rather than the project's established `@floating-ui/react` approach. This would satisfy the functional acceptance criteria but perpetuate the "mixed interaction patterns" debt identified in the parent critique.

**Recommendation**: Add to Milestone 2 tasks:
- Use `useListNavigation(context, { listRef, activeIndex, onNavigate, loop: true })` for arrow-key navigation; add it to the `useInteractions([...])` array alongside `useClick`, `useDismiss`, and `useRole`.
- Maintain `activeIndex` / `setActiveIndex` state in `ActionsMenu`.
- Pass `getItemProps()` to each `ActionsMenuItem` and assign item DOM nodes to `listRef.current[i]`.
- Wrap the open panel in `<FloatingFocusManager context={context}>` instead of a plain `<div>` to handle focus-on-open and focus-return-on-close.

---

### Finding 2 — MEDIUM: AnchoredPopover Copy-Paste Risk Is Understated

**Status**: RESOLVED

**Issue**: The Handoff Notes say: "Reference `AnchoredPopover/utils.tsx` for the established `@floating-ui/react` pattern. The `useRole(context, { role: 'menu' })` hook may handle `role="menu"` and `aria-haspopup` automatically — verify before adding manual attributes."

This phrasing does not clearly warn against copying the `AnchoredPopover` pattern directly. The existing `AnchoredPopover/utils.tsx` calls `useRole(context)` with no arguments — which defaults to `role="dialog"` — not `useRole(context, { role: 'menu' })`. This is a direct divergence from what the plan requires. Per the `@floating-ui/react` docs, `useRole(context, { role: 'menu' })` (native menu role) adds:
  - `role="menu"` to `getFloatingProps()` (the panel)
  - `aria-haspopup="menu"` to `getReferenceProps()` (the trigger)
  
Item roles (`role="menuitem"`, `role="separator"`) must still be manually assigned; `useRole` does **not** provide them for native roles.

The plan states "Add `role="menu"` to the dropdown panel element" (Milestone 2 Task 2) and "Add `role="menuitem"` to each `ActionsMenuItem`" (Task 3) as if they are manual additions. But the first is already handled by `getFloatingProps()` when `useRole(context, { role: 'menu' })` is used. These should be reconciled to avoid double-setting the attribute.

**Impact**: If the implementer copies `useRole(context)` from `AnchoredPopover`, the menu gets `role="dialog"` — which makes the floating element announce as a dialog, not a menu, to screen readers. The keyboard navigation and ARIA goals of Milestone 2 would be partially undermined despite a passing visual implementation.

**Recommendation**: In Milestone 2 Task 2, replace "Add `role="menu"` to the dropdown panel element" with: "Use `useRole(context, { role: 'menu' })` — this automatically provides `role="menu"` on the panel via `getFloatingProps()` and `aria-haspopup="menu"` on the trigger via `getReferenceProps()`. Do NOT use `useRole(context)` without arguments (that is the AnchoredPopover pattern, which defaults to `role="dialog"`). Item roles (`role="menuitem"`, `role="separator"`) must still be manually applied."

---

### Finding 3 — LOW: Changelog Date Is 2025, Session Date Is 2026

**Status**: RESOLVED

**Issue**: The plan's changelog entry is dated `2025-07-24`. The current session date is 2026-04-06 (as established by context). This is an administrative error introduced at plan creation time.

**Impact**: Audit trail integrity. No functional effect.

**Recommendation**: Correct the changelog date to `2026-04-06` to match the session date.

---

### Finding 4 — LOW: Milestone 2 Task 7 Presents Two Options Without Recommending One

**Status**: RESOLVED

**Issue**: Task 7 states: "Ensure `ActionsMenuItem` buttons are tabbable (`tabIndex={-1}` when not focused, managed via `roving tabindex` or `aria-activedescendant` — implementer decides the approach)."

If the plan is updated to name `useListNavigation` (per Finding 1), this becomes moot: `useListNavigation` uses real DOM focus (roving tabindex) by default. Virtual focus (`aria-activedescendant`) is the alternative when focus must stay on the reference element (e.g., a combobox input) — which is not the case here. Leaving the choice open when the correct option is deterministic adds unnecessary ambiguity for the implementer.

**Impact**: Minor. Implementer might choose virtual focus, which requires additional setup (`virtual: true`, `id` on each item) and is the wrong pattern for a standalone menu.

**Recommendation**: Resolve after accepting Finding 1. Remove Task 7 or replace with: "Item focusability is managed automatically by `useListNavigation` via roving tabindex: `tabIndex={activeIndex === i ? 0 : -1}`. Virtual focus is not appropriate here."

---

## Unresolved Open Questions

None. The plan has no `OPEN QUESTION` items.

---

## Risk Assessment

**Low overall.** Both medium findings are fixable with targeted additions to Milestone 2 task descriptions — no structural rework of the plan is required. The plan's milestone decomposition, dependency ordering, and testing strategy are all correct. The arithmetic risk (wrong component roles in the implementation) is real but straightforward to prevent with clearer task language.

---

## Recommendations (Priority Order)

1. **[MEDIUM — Finding 1]** Add `useListNavigation`, `FloatingFocusManager`, `listRef`, and `activeIndex` state to Milestone 2's task list. Add `getItemProps()` propagation requirement for `ActionsMenuItem` to the acceptance criteria.
2. **[MEDIUM — Finding 2]** Clarify in Milestone 2 Task 2 that `useRole(context, { role: 'menu' })` (not the AnchoredPopover default `dialog` role) provides `role="menu"` via `getFloatingProps()`. Remove the duplicate manual `role="menu"` assignment from task wording.
3. **[LOW — Finding 3]** Fix changelog date from `2025-07-24` to `2026-04-06`.
4. **[LOW — Finding 4]** Remove or resolve Task 7 after incorporating Finding 1 (roving tabindex is determined by `useListNavigation`, not the implementer).

---

## Revision 2 Review

### Value Statement Assessment

**PASS.** Unchanged from initial critique. User story is clear and scoped.

---

### Overview

Revision 2 resolves all four initial findings cleanly. The additions to Milestone 2 (naming `useListNavigation`, `FloatingFocusManager`, `useRole` semantics) substantially improve implementer guidance and close the primary architectural ambiguity. Two new issues emerge from the revised task wording.

---

### Revision 2 Findings

#### Finding 5 — MEDIUM: Milestone 1 Task 3 Contradicts the Library’s Own Documentation

**Status**: RESOLVED

**Issue**: Task 3 states: “Configure `useDismiss` with a custom `outsidePress` handler [...] Use `@floating-ui/react`’s own `FloatingPortal` detection **rather than a CSS selector**.”

This instruction is directly contradicted by the `@floating-ui/react` `useDismiss` documentation, which demonstrates exactly this pattern for guarding against elements outside the React tree:

```js
ousidePress: (event) => !event.target.closest('.toast')
```

`event.target.closest()` with a CSS selector IS the documented mechanism. There is no alternative, non-selector `FloatingPortal` detection API in the library. The `FloatingPortal` component sets `data-floating-ui-portal` on its root container precisely so it can be detected this way. Telling the implementer to avoid a CSS selector will cause them to search for a non-existent API, delay implementation, or silently fall back to the current hand-rolled `mousedown` approach.

The correct instruction is the opposite: `outsidePress: (event) => !event.target.closest('[data-floating-ui-portal]')` is the right implementation — the attribute is set by the library, making this check library-owned, not fragile.

**Impact**: Implementer confusion; potential for duplicated research or retention of the hand-rolled `mousedown` listener that Milestone 1 is meant to eliminate.

**Recommendation**: Replace Task 3’s “rather than a CSS selector” qualifier with: “Use `outsidePress: (event) => !event.target.closest('[data-floating-ui-portal]')`. The `[data-floating-ui-portal]` attribute is set by `FloatingPortal` itself — this is the library’s documented detection mechanism for this pattern, not a fragile implementation detail.” Remove the internal contradiction.

---

#### Finding 6 — MEDIUM: Milestone 2 Task 3 Prescribes Caller-Supplied `index` Props; Library Provides `FloatingList` for Composable Children APIs

**Status**: RESOLVED

**Issue**: Task 3 states: “Each `ActionsMenuItem` must accept an `index` prop, register its DOM node at `listRef.current[index]`.” This is the manual indexing approach for `useListNavigation`. It requires callers (`ComponentEditor`, `EmbedEditor`) to supply sequential integer indices to each `ActionsMenu.Item`, with the correct value depending on which items are conditionally rendered.

In `ComponentEditor` alone, the rendered items vary based on `isContainer`, `isFirst`, `isLast`, and `canDuplicate`. The required index for “Move Up” is 1 when `isContainer` is true (Spoiler is index 0) and 0 when `isContainer` is false. The `listRef` slot for each item must remain stable across renders and be sequential with no gaps for non-null entries.

The `@floating-ui/react` `useListNavigation` docs explicitly address this for composable children APIs:

> “See `FloatingList` for creating composable children API components.”

`FloatingList` + `useListItem()` (from `@floating-ui/react`) auto-assigns indices to items in render order. Items call `useListItem()` internally to register their ref and receive their index — no caller-supplied `index` prop needed. This pattern keeps `ActionsMenu` callers clean and eliminates index drift from conditional rendering. The `listRef` is managed by `FloatingList`’s context, not manually by the parent.

**Impact**: If the manual `index` prop approach is implemented, every existing and future caller of `ActionsMenu.Item` must correctly maintain sequential indices accounting for conditional renders. This will introduce bugs. `EmbedEditor` similarly conditionally renders Move Up/Down/Duplicate items. The `FloatingList` pattern avoids this entirely.

**Recommendation**: Replace the manual `index` / `listRef` management in Task 3 with the `FloatingList` + `useListItem()` pattern:
- Wrap the floating panel content in `<FloatingList elementsRef={listRef}>`.
- `ActionsMenuItem` calls `const { ref, index } = useListItem()` internally — removing the `index` prop from its public API.
- `getItemProps()` must still be spread on each item; pass it via context (follow `FloatingList` examples) or as a prop.
- `ActionsMenuDivider` does not call `useListItem()` and is not registered in `listRef`.

---

#### Finding 7 — LOW: Acceptance Criterion “Focus Moves to the First Item on Open” Is Unconditionally Stated

**Status**: RESOLVED

**Issue**: Milestone 2 Acceptance Criterion 5 states: “Focus moves to the first item on open and returns to trigger on close via `FloatingFocusManager`.”

With `useListNavigation`’s default `focusItemOnOpen: 'auto'`, focus only moves inside the menu immediately when the menu is opened via keyboard (ArrowDown/ArrowUp on trigger). When opened via pointer (click), `FloatingFocusManager` moves focus to the floating container itself (not the first item), and the user must press ArrowDown to activate the first item. This is correct WAI-ARIA behaviour for menus and fully intentional — it shouldn’t be changed, but the criterion as written implies focus always lands on the first item, which a test verifying pointer-click open behaviour would fail.

**Impact**: A test author following the acceptance criteria literally would write a test that click-opens the menu and asserts `document.activeElement === firstItem`, which would fail with `focusItemOnOpen: 'auto'`.

**Recommendation**: Qualify the criterion: “Focus moves to the first item when the menu is opened via keyboard; when opened via pointer, focus lands on the menu container and arrow keys navigate to the first item.”

---

### Unresolved Open Questions

None.

---

### Revision 2 Risk Assessment

**Low overall.** Finding 5 is a plan text correction (no design change required). Finding 6 is a design substitution (`FloatingList` for manual indices) that makes the implementation significantly simpler and more correct. Finding 7 is a test-authoring clarification only. No structural rework of the plan is needed.
| Rev 2    | 2026-04-06 | Revision 2 critique. 2 medium, 1 low new findings on revised Milestone 1 Task 3 and Milestone 2 Task 3. |
| Rev 3    | 2026-04-06 | All 3 Revision 2 findings resolved. Plan updated to Revision 3. |
| Rev 4    | 2026-04-06 | Revision 3 critique. 0 critical, 0 medium, 2 low. Plan approved for implementation. |

---

## Revision 3 Review

### Value Statement Assessment

**PASS.** Unchanged. User story is clear and scoped.

---

### Overview

Revision 3 resolves all three Revision 2 findings. The plan is now implementation-ready.

- **Milestone 1 Task 3** (`outsidePress`) now correctly describes the `[data-floating-ui-portal]` selector as the library's own documented mechanism. The internal contradiction is eliminated.
- **Milestone 2 Task 3** now uses `FloatingList` + `useListItem()` for automatic index registration. The `index` prop is removed from `ActionsMenuItem`'s public API. Callers (`ComponentEditor`, `EmbedEditor`) supply no indices.
- **Milestone 2 AC 5** correctly distinguishes keyboard-triggered focus (first item) from pointer-triggered focus (menu container).

The plan's five milestones, dependency ordering, testing strategy, risk table, and handoff notes are all consistent and correct. Two minor residual inconsistencies remain from earlier revisions, noted below as LOW findings.

---

### Architectural Alignment

**Fully aligned.** All four `@floating-ui/react` primitives are named (`useClick`, `useDismiss`, `useRole`, `useListNavigation`), both wrapper components are named (`FloatingFocusManager`, `FloatingList`), and the plan warns against the specific `AnchoredPopover` copy-paste pitfall (`useRole` default). The `outsidePress` guard uses the library's documented `closest()` pattern. No hand-rolled interaction patterns remain in the design.

---

### Revision 3 Findings

#### Finding 8 — LOW: Success Criteria "Focus" Bullet Not Qualified for Pointer vs Keyboard

**Status**: OPEN

**Issue**: The top-level Success Criteria section states:

> "Focus moves to the first item on open and returns to trigger on close"

Milestone 2's acceptance criteria correctly qualified this in Revision 3:

> "Focus moves to the first item on open when triggered via keyboard; when triggered via pointer, focus lands on the menu container and arrow keys navigate from there"

The Success Criteria bullet was not updated to match, creating a minor inconsistency between the summary and the milestone detail.

**Impact**: An implementer or reviewer checking only the Success Criteria section would have the unqualified expectation. No functional impact — the milestone AC takes precedence.

**Recommendation**: Update the Success Criteria bullet to: "Focus moves to the first item on keyboard-triggered open; pointer-triggered open focuses the menu container. Focus returns to trigger on close."

---

#### Finding 9 — LOW: Milestone 2 Task 3 Says "Pass `getItemProps()` Through the `FloatingList` Context" — `FloatingList` Does Not Carry `getItemProps()`

**Status**: OPEN

**Issue**: Task 3's last sub-bullet states:

> "`getItemProps()` from `useInteractions` must be spread on each `ActionsMenuItem`. Pass it through the `FloatingList` context or as an internal prop — do not expose it on the public API."

The phrase "through the `FloatingList` context" is inaccurate. `FloatingList` provides only `elementsRef` registration and `useListItem()` (which returns `ref` and `index`). It does not carry `getItemProps()` or `activeIndex`. The `@floating-ui/react` docs' own composable-children examples (e.g., the Select example) use a **custom context** created by the parent component (e.g., `useSelectContext()`) to pass `getItemProps` and `activeIndex` to items.

`ActionsMenu` will need its own internal context (e.g., `ActionsMenuContext`) to provide `getItemProps` and `activeIndex` to `ActionsMenuItem`. This is a standard React pattern and not complex, but the plan should not attribute it to `FloatingList`.

**Impact**: Minor implementer confusion. The implementer will discover the correct approach quickly by referencing the `FloatingList` composable-children example.

**Recommendation**: Replace "through the `FloatingList` context" with "through a custom `ActionsMenu` context (see `FloatingList`'s composable-children example for the pattern)." This is a documentation correction, not a design change.

---

### Unresolved Open Questions

None.

---

### Revision 3 Risk Assessment

**Negligible.** Both findings are documentation corrections — no design or architectural changes needed. The plan is approved for implementation.

---

### Approval

**APPROVED FOR IMPLEMENTATION.** Plan 003 Revision 3 addresses all 5 findings from the parent critique (001) with clear, architecturally-aligned implementation guidance. The two remaining LOW findings (Success Criteria phrasing, `getItemProps` context attribution) are cosmetic and can be corrected during implementation without a further plan revision cycle.
