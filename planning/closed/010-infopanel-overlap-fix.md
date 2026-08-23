---
ID: 10
Origin: 10
UUID: b7e3a41f
Status: Released
Target Release: N/A (bug-fix, no versioning configured)
Epic Alignment: InfoPanel layout reliability on initial mount
---

# Plan 010 — Fix InfoPanel Overlap on Initial Load (Bot Not in Server)

## Changelog

| Date       | Change                                                                                 |
| ---------- | -------------------------------------------------------------------------------------- |
| 2026-04-12 | Released — commit 72dc7de pushed to master                                             |
| 2026-04-12 | UAT Approved — value delivery confirmed, APPROVED FOR RELEASE                          |
| 2026-04-12 | QA Complete (v3) — 296/296 tests pass, all findings resolved, lifecycle verified       |
| 2026-04-12 | Code Review Approved (v3) — APPROVED_WITH_COMMENTS, 0 blocking findings                |
| 2026-04-12 | Revised per Analysis 011: CSS class separation approach replaces inline style approach |
| 2026-04-12 | QA Failed — animation regression (F-1); returning to implementer                       |
| 2026-04-12 | Status → In Progress; implementation started                                           |
| 2026-04-12 | Revised per Critique 010: M-1, M-2, L-1, L-2 addressed                                 |
| 2026-04-12 | Initial plan created from Analysis 010                                                 |

## Value Statement and Business Objective

**As a** Hooks.gg user navigating to a server where the bot is not installed, **I want** the InfoPanel invite prompt to render in its collapsed state without overlapping the message list, **so that** I can browse my messages and interact with the page immediately without needing to click the panel to fix the layout.

## Success Criteria

- Navigating to a server without the bot (`/message/f/[guildId]`) renders the InfoPanel collapsed with its content hidden — no visual overlap with the message list below
- Navigating to a send page without the bot (`/message/m/[id]/send`) renders the InfoPanel collapsed with its content hidden — no overlap with send page UI below
- Navigating to a send page renders the "Edit Previous" section hidden on initial load — no visual overlap with surrounding content
- Clicking the InfoPanel to expand and then collapse it still works correctly with smooth transitions
- All other `TransitionHeightElement` consumers (`StyledAccordionSection`, `NewMessageModal`, edit page editor wrapper, `WebhookMenu`) continue to function without regression
- `TransitionHeightElement` mounted with `isOpen=true` (default) continues to render content immediately with no flash
- Server-rendered HTML with `isOpen=false` hides content via CSS class (no layout shift on hydration)

## Assumptions

1. The fix belongs in `TransitionHeightElement.tsx` — this is the shared component with the state management gap. Fixing it at the source prevents the bug for all current and future consumers.
2. The `isFirstRender` guard exists to prevent an animation on the initial mount. The fix must preserve this intent — no jarring open/close animation when the page first loads.
3. The `isMounted` mechanism exists for SSR hydration safety. The fix must not break SSR behavior.
4. The `unmount=true` (default) mode is intended to remove content from the DOM when collapsed. The `unmount=false` mode is used by `NewMessageModal` for a different animation pattern and must remain unaffected.
5. **NEW (from Analysis 011)**: React's `style` prop and imperative `ref.style.*` are mutually exclusive for the same CSS properties. The React `style` prop must NOT manage `display` or `height` post-mount. Imperative code must be the exclusive owner of these properties after hydration.
6. **NEW (from Analysis 011)**: Tailwind's `hidden` class (maps to `display: none`) is already used throughout the project and is safe to use for SSR hiding via `className`.

## Open Questions

None — root cause verified through structural lifecycle trace in Analysis 011. Two implementation attempts (v1: keep style post-mount, v2: imperative styles in isFirstRender) confirmed the architectural constraint.

---

## Analysis Reference

**Analysis 011** — `transition-height-react-style-conflict-analysis.md`

Analysis 011 proved through POC tests that:
1. `useMounted()` fires as a regular `useEffect` (async), NOT `useLayoutEffect`
2. The animation `useEffect([isOpen])` does NOT depend on `isMounted` — it doesn't re-run when `isMounted` changes
3. `getTransitionWrapperStyle` returns `undefined` post-mount in ALL cases
4. **Structural proof**: React's Render 2 (triggered by `isMounted` flip) reconciles the `style` prop from `{display:'none',height:0}` to `undefined`, causing React to actively clear `display` and `height` from `element.style` — wiping any imperative values set earlier

**Why the previous approach was invalidated**: Both v1 (keep style post-mount) and v2 (imperative styles in isFirstRender) failed because they attempted to use BOTH React's `style` prop AND imperative `ref.style.*` for the same CSS properties (`display`, `height`). These are mutually exclusive control mechanisms — they share the same `element.style` DOM object, and React's reconciliation will always override imperative values when the `style` prop changes.

**Selected approach**: CSS class separation — move SSR hiding from React `style` prop to `className` (Tailwind `hidden`). This eliminates the dual-control conflict permanently because React's `style` prop reconciliation does NOT touch CSS classes.

---

## Plan

### Milestone 1: Eliminate React `style` Prop / Imperative DOM Conflict

**Objective**: Remove all React `style` prop management of `display` and `height` from `TransitionHeightElement`. Move SSR hiding to `className`. Ensure imperative code is the exclusive owner of `display` and `height` post-mount.

**Affected file**: `src/components/TransitionHeightElement.tsx`

**Tasks**:

1. **Remove `getTransitionWrapperStyle` and the `style` prop entirely**: The helper function and its usage on the wrapper `<div>` must be removed. React's `style` prop must not manage `display` or `height` at any point in the component lifecycle. This is the core change that eliminates the dual-control conflict.

2. **Move SSR hiding to `className` using Tailwind `hidden`**: When `isOpen=false` and the component has not yet mounted (`!isMounted`), the wrapper should include the `hidden` class in its `className`. This ensures server-rendered HTML hides closed content without using the React `style` prop. The `hidden` class maps to `display: none` in Tailwind and is already used throughout the project.

3. **Update `isFirstRender` branch to remove `hidden` class and set imperative styles**: When the component first mounts with `isOpen=false`, the `isFirstRender` branch in `useEffect([isOpen])` must: (a) remove the `hidden` class from the wrapper element, and (b) set imperative `display: none` and `height: 0` via `ref.style.*`. Since React's `style` prop no longer manages these properties, imperative values will persist across re-renders. The `isFirstRender` guard already returns early — this is the right place for the class-to-imperative handoff.

4. **Ensure subsequent renders don't re-add `hidden` class**: The `className` expression must be conditional on `!isMounted` so that after the `useMounted()` flip, the `hidden` class is never re-applied by React renders. Imperative code is the exclusive owner of visibility post-mount.

5. **Evaluate if `isMounted` state is still needed**: With the `style` prop removed, `isMounted` may only be needed for the `className` conditional (Task 4). If so, it should be kept. If the implementer finds a way to achieve the same without it (e.g., using a ref), they have discretion, but must not break SSR.

6. **Add `overflow-hidden` for `unmount=true` mode (primary requirement)**: Currently, `overflow-hidden` is only applied when `!unmount`. For `unmount=true` mode, there is no overflow clipping — the component relies solely on `display: none`. QA evidence (F-2) proves that `height: 0px` without `overflow-hidden` allows content to overflow and remain visible. The implementer MUST add overflow clipping for `unmount=true` — this is a primary requirement, not defense-in-depth. Without it, any gap in `display: none` management results in visible content overlap.

7. **Fix `onTransitionEnd` event target leak**: The `onTransitionEnd` handler sets `display: none` when `unmount && !isOpen` (line 86-87) but does NOT check `e.target === wrapperRef.current`. The adjacent `overflow-hidden` removal DOES check the target. This inconsistency causes `transitionend` events from descendant elements (e.g., button hover color transitions) to trigger `display: none` on the wrapper. Guard the `display: none` assignment with the same `e.target === wrapperRef.current` check. See QA finding F-3 for the recommended code pattern.

**Acceptance Criteria**:
- `TransitionHeightElement` with `isOpen=false` and `unmount=true` renders with content hidden (not visible, not overlapping siblings) on initial mount and after `useMounted()` fires
- React's `style` prop does NOT manage `display` or `height` at any point — no `style={{ }}` on the wrapper div
- SSR HTML with `isOpen=false` includes the `hidden` class (or equivalent CSS class hiding)
- `TransitionHeightElement` with `isOpen=true` (default) renders content immediately — no regression
- Expand/collapse transitions continue to animate smoothly after the initial mount (no instant snap)
- `TransitionHeightElement` with `unmount=false` (e.g., `NewMessageModal`) continues to work — content hidden via overflow, not display
- The `onTransitionEnd` handler and animation `useEffect([isOpen])` continue to function correctly
- The `onTransitionEnd` handler only triggers `display: none` when the transition event originated from the wrapper element itself (not from descendant transitions)
- `overflow-hidden` is applied to the wrapper for BOTH `unmount=true` and `unmount=false` modes when content is collapsed

### Milestone 2: Verify All `TransitionHeightElement` Consumers

**Objective**: Confirm no regressions across the 6 known consumer sites.

**Consumers to verify** (all in `website/src/`):

| Consumer                 | File                                                        | Initial `isOpen`       | `unmount`        | Risk                                 |
| ------------------------ | ----------------------------------------------------------- | ---------------------- | ---------------- | ------------------------------------ |
| `InfoPanel` (bot invite) | `components/InfoPanel.tsx`                                  | `false`                | default (`true`) | **Primary fix target**               |
| `StyledAccordionSection` | `components/StyledAccordion/StyledAccordionSection.tsx`     | Dynamic (`isSelected`) | default (`true`) | Low — accordion items toggle rapidly |
| Send page edit section   | `app/message/m/[id]/send/page.tsx`                          | `false` (`showEdit`)   | default (`true`) | **High — confirmed affected**        |
| Edit page editor wrapper | `app/message/m/[id]/edit/page.tsx`                          | default (`true`)       | default (`true`) | Low — starts open                    |
| `WebhookMenu`            | `app/message/m/[id]/send/_components/WebhookMenu/index.tsx` | default (`true`)       | default (`true`) | Low — starts open                    |
| `NewMessageModal`        | `app/message/_components/NewMessageModal.tsx`               | default (`true`)       | default (`true`) | Low — starts open, unaffected by bug |

**Tasks**:

1. **Manual test the InfoPanel on both affected pages**: Navigate to `/message/f/[guildId]` for a server without the bot. Verify the InfoPanel is collapsed and the message list is visible and properly positioned below it. Repeat for `/message/m/[id]/send`.

2. **Manual test expand/collapse cycle**: Click the InfoPanel to expand, then collapse. Verify smooth animation both directions. Verify content is properly hidden after collapse.

3. **Manual test accordion sections**: Open the edit page, verify accordion sections (component types, embed sections) expand and collapse correctly.

4. **Manual test send page "Edit Previous" section**: On the send page, verify the "Edit Previous" section does **not** show overlapping content on initial page load (before any user interaction). Then click "Edit Previous" to expand, then collapse. Verify animation works and content is properly hidden after collapse.

### Milestone 3: Version Management

N/A — No versioning system configured.

---

## Testing Strategy

- **Unit/integration**: Existing test suite must continue to pass with 0 regressions. Existing `010-transition-height-style.test.ts` tests that reference `getTransitionWrapperStyle` will need updating since that function is being removed. Source-code regression assertions should be updated to verify the new `className`-based approach (no `style` prop on wrapper div, `hidden` class present in className expression).
- **Manual regression**: The primary acceptance scenario is loading `/message/f/[guildId]` for a server without the bot — the InfoPanel must be collapsed with no overlap
- **Critical scenarios**: (1) Initial load with closed InfoPanel — no overlap, (2) expand/collapse cycle — smooth animation not instant snap, (3) accordion behavior in the editor, (4) `NewMessageModal` page transitions, (5) SSR HTML includes `hidden` class for closed state

## Risks

| Risk                                                                         | Likelihood | Impact                                | Mitigation                                                                                                                     |
| ---------------------------------------------------------------------------- | ---------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `hidden` class specificity conflict with imperative `ref.style.display`      | Low        | Medium — element stays hidden         | Imperative `element.style.display = ''` (inline) always wins over class-based `display: none`. Test expand cycle.              |
| Fix introduces a visual flash on mount (content briefly visible then hidden) | Low        | Medium — jarring UX                   | `hidden` class is in server HTML; `isFirstRender` branch runs before any animation. No gap exists.                             |
| Fix breaks `unmount=false` behavior in `NewMessageModal`                     | Low        | Medium — modal page transitions break | The modal starts with `isOpen=true`, so `hidden` class is never applied. Code paths diverge early.                             |
| `useMounted()` re-render re-adds `hidden` class                              | Low        | High — overlay regression recurs      | The `className` expression must be conditional on `!isMounted` so the class is dropped after mount. Verify in `isFirstRender`. |

## Validation

- Run `tsc --noEmit` — 0 errors
- Run full test suite — all pass, 0 regressions
- Verify: No React `style` prop on the wrapper div in `TransitionHeightElement.tsx`
- Verify: SSR HTML for `isOpen=false` includes `hidden` class
- Manual test: Load server page without bot → InfoPanel collapsed, no overlap
- Manual test: Expand/collapse InfoPanel → smooth animation (not instant snap)
- Manual test: Accordion sections, send page edit section, modal — all function correctly

## Rollback

Revert the single file change to `TransitionHeightElement.tsx`. The fix is isolated to one component with no data model or API changes.
