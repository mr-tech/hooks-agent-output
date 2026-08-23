---
ID: 11
Origin: 10
UUID: c4d1e8f3
Status: Planned
---

# 011 — TransitionHeightElement: React Style Prop vs Imperative DOM Conflict

## Changelog

| Date       | Change                                           |
| ---------- | ------------------------------------------------ |
| 2026-04-12 | Status → Planned; incorporated into Plan 010 rev |

| Date       | Change                   |
| ---------- | ------------------------ |
| 2026-04-12 | Initial analysis created |

## Value Statement and Business Objective

Plan 010 (Fix InfoPanel Overlap on Initial Load) has failed QA twice due to a fundamental conflict between React's inline `style` prop and the component's imperative DOM manipulation. The first attempt fixed the overlap but broke animations. The second attempt (QA F-1 fix) attempted to resolve animations by deferring to imperative code, but the overlay problem regressed. A permanent fix requires understanding the exact React reconciliation behavior that causes both failures.

## Objective

Determine the root cause of the overlay regression in the revised implementation (QA F-1 fix) and identify the architectural constraint that prevents mixing React `style` prop and imperative DOM styles for the same CSS properties.

## Context

- **Origin**: Analysis 010 / Plan 010 / Implementation 010
- **Bug**: InfoPanel content overlaps message list on initial load when bot is not in server
- **Attempt 1**: `getTransitionWrapperStyle` returned `{ height: 0, display: 'none' }` post-mount when `isOpen=false, unmount=true` — fixed overlap, **broke animations** (QA F-1)
- **Attempt 2**: Simplified `getTransitionWrapperStyle` to return `undefined` post-mount + set imperative styles in `isFirstRender` branch — **overlay regressed**
- **Affected component**: `TransitionHeightElement.tsx` — used by 6 consumers across the app

## Methodology

1. Static lifecycle trace through component hook execution order
2. React style prop reconciliation behavior analysis
3. POC tests proving structural root cause (no browser required)
4. Consumer impact assessment

---

## Findings

### Finding 1 (Verified): `useMounted()` triggers a re-render that wipes imperative styles

**Confidence**: Verified — proven through structural code trace + POC tests

The `useMounted()` hook calls `setMounted(true)` inside a `useEffect(fn, [])`. This queues a second render. When React commits Render 2, it reconciles the `style` prop from the Render 1 value (`{ height: 0, display: 'none' }`) to the Render 2 value (`undefined`). React's reconciliation removes previously-tracked CSS properties by setting them to empty strings, which wipes out the imperative styles set by the `isFirstRender` branch of the animation `useEffect`.

**Complete lifecycle trace** (isOpen=false, unmount=true):

```
┌─ RENDER 1 (isMounted=false, isOpen=false) ─────────────────────┐
│ getTransitionWrapperStyle → { height: 0, display: 'none' }     │
│ React sets element.style.height = '0'                          │
│ React sets element.style.display = 'none'                      │
│ React TRACKS these properties for future reconciliation        │
│ DOM: style="height: 0; display: none;" → element HIDDEN ✓     │
└────────────────────────────────────────────────────────────────┘

┌─ EFFECTS after Render 1 (fire in declaration order) ───────────┐
│ 1. useMounted's useEffect([], []):                             │
│    → setMounted(true) — QUEUES re-render                       │
│                                                                │
│ 2. useResizeObserver:                                          │
│    → registers observer (no resize while display:none)         │
│                                                                │
│ 3. useEffect([isOpen]) — animation effect:                     │
│    → isFirstRender.current = true                              │
│    → sets isFirstRender.current = false                        │
│    → !isOpen && wrapperRef.current:                            │
│      → wrapper.style.display = 'none'   ← IMPERATIVE          │
│      → wrapper.style.height = '0px'     ← IMPERATIVE          │
│    → returns early                                             │
│                                                                │
│ DOM: style="height: 0px; display: none;" → element HIDDEN ✓   │
│ (imperative values = same as React values, no visual change)   │
└────────────────────────────────────────────────────────────────┘

┌─ RENDER 2 (isMounted=true, isOpen=false) ──────────────────────┐
│ getTransitionWrapperStyle → undefined                          │
│                                                                │
│ React reconciles style: { height:0, display:'none' } → undef  │
│ React removes tracked properties:                              │
│   → element.style.height = ''    ← WIPES imperative value     │
│   → element.style.display = ''   ← WIPES imperative value     │
│                                                                │
│ DOM: style="" → element is display:block (CSS default), auto   │
│ height → CONTENT IS VISIBLE → ⚠ OVERLAP BUG REAPPEARS        │
└────────────────────────────────────────────────────────────────┘

┌─ EFFECTS after Render 2 ──────────────────────────────────────┐
│ 1. useMounted's effect: deps unchanged → NO-OP               │
│ 2. useResizeObserver: element now visible, MAY resize         │
│    → if fires: sets height='0px' (isOpen=false)               │
│    → but does NOT set display (only sets display in isOpen)   │
│    → no overflow-hidden (className has !unmount && 'overflow…')│
│    → result: height:0px, display:block, no clip → OVERFLOW   │
│ 3. useEffect([isOpen]): deps unchanged → DOES NOT FIRE       │
│                                                               │
│ DOM: style="height: 0px;" (maybe, if resize fires)           │
│ → Content overflows zero-height wrapper → OVERLAP BUG ■      │
└───────────────────────────────────────────────────────────────┘
```

**POC evidence**: Test file `src/utils/__tests__/011-style-reconciliation-poc.test.ts` (4 tests, all passing) structurally proves:
1. `useMounted` uses `useEffect` (not `useLayoutEffect`) — fires as regular async effect
2. Animation effect depends on `[isOpen]` only — does not re-run when `isMounted` changes
3. `getTransitionWrapperStyle` returns `undefined` when `isMounted=true, isOpen=false` — React transitions from style object to undefined
4. Structural proof that `isMounted` is declared before the animation effect + style prop depends on `isMounted` + no `overflow-hidden` in className when `unmount=true`

### Finding 2 (Verified): React's style prop and imperative DOM styles are mutually exclusive for the same CSS properties

**Confidence**: Verified — this is documented React behavior

When React renders `style={someObject}`, it tracks which CSS properties it has set. On subsequent renders, React compares the old and new style objects and:
- Adds new properties
- Updates changed properties
- **Removes properties no longer present** by setting them to `''` (empty string)

When `style` transitions from an object to `undefined`/`null`, React treats ALL previously-tracked properties as "removed" and sets each to `''`.

**Critical implication**: If imperative code (`ref.style.xxx = 'value'`) sets the SAME CSS properties that React has tracked, React's reconciliation will overwrite them on the next render. The imperative values are indistinguishable from React's values — they share the same `element.style` object.

This means **no approach that uses both the React `style` prop AND imperative `ref.style` for `display` or `height` can work**, because:
- The React `style` prop must provide `display:none` for SSR (pre-mount)
- The imperative code must control `display` and `height` for animations (post-mount)
- When `isMounted` flips, React cleans up its tracked properties, wiping the imperative values

### Finding 3 (Verified): The original code avoided this conflict by never changing the style prop post-mount

**Confidence**: Verified — confirmed by reading the original (pre-fix) condition

The original code: `style={isMounted || isOpen ? undefined : { height: 0, display: unmount ? 'none' : 'block' }}`

After mount (`isMounted=true`), this ALWAYS returned `undefined`, regardless of `isOpen`. This meant:
- Render 1 (`isMounted=false`): `style={{ height: 0, display: 'none' }}` — React tracks properties
- Render 2 (`isMounted=true`): `style={undefined}` — React removes tracked properties → element visible

The original code had the SAME overlay bug on Render 2. The difference was that the original code had NO imperative styles in the `isFirstRender` branch — the animation effect just returned early. So after Render 2, the element was visible. This was the original bug.

**The v2 fix (isFirstRender imperative styles) fails because it tries to set imperative styles in the gap between Render 1 and Render 2, but React's Render 2 reconciliation wipes them.**

### Finding 4 (Verified): The animation effect has an incomplete dependency array

**Confidence**: Verified — code inspection

The animation `useEffect` depends on `[isOpen]`:
```tsx
useEffect(() => { ... }, [isOpen]);
```

It accesses `unmount` (in the isFirstRender branch) and `_ref` but does NOT include them in the dependency array. This is intentional — re-running on `unmount` changes would cause unnecessary DOM manipulation. However, the critical consequence is:

**When `isMounted` flips (triggering Render 2), the animation effect does NOT re-run** because `isOpen` hasn't changed. This means there's no mechanism to re-apply the imperative styles after React's reconciliation wipes them.

### Finding 5 (Verified): overflow-hidden is absent for unmount=true consumers

**Confidence**: Verified — code inspection

The wrapper className:
```tsx
className={classNames('w-full transition-[height] ease-out', !unmount && 'overflow-hidden', className)}
```

When `unmount=true` (the default, used by InfoPanel and Edit Previous), `overflow-hidden` is NOT applied via className. The component relies entirely on `display: none` to hide content. This means that even if the height is set to `0px` (e.g., by the ResizeObserver callback), content will still overflow and be visible because there's no overflow clipping.

### Finding 6 (Verified): ResizeObserver partially masks but does not fix the issue

**Confidence**: Verified — code inspection

The `useResizeObserver` callback:
```tsx
onResize: () => {
  if (wrapperRef.current && _ref.current) {
    if (isOpen) {
      wrapperRef.current.style.display = 'block';
    }
    wrapperRef.current.style.height = isOpen ? `${_ref.current.scrollHeight}px` : '0px';
  }
}
```

When `isOpen=false`, this sets `height='0px'` but does NOT set `display`. So even if the ResizeObserver fires after Render 2 (when the element becomes visible), the element would be `display:block; height:0px` — but without `overflow-hidden`, children still overflow and are visible.

---

## Root Cause

**Verified**: The fundamental architectural conflict is that `TransitionHeightElement` uses React's `style` prop for pre-mount hiding (SSR safety) and imperative DOM manipulation for post-mount animation. These two mechanisms manage the same CSS properties (`display` and `height`) on the same DOM element. When `useMounted()` triggers a re-render, React's style reconciliation removes the properties it previously tracked, which also removes any imperative values set for those same properties.

This is not a bug in the implementation logic — it's a constraint of mixing React's declarative style management with imperative DOM manipulation for the same CSS properties.

**Why both fix attempts failed**:

| Attempt | Approach                                                                          | Outcome                          | Why                                                                                       |
| ------- | --------------------------------------------------------------------------------- | -------------------------------- | ----------------------------------------------------------------------------------------- |
| v1      | React `style` keeps `{height:0, display:'none'}` post-mount                       | Overlap fixed, animations broken | React applies close-state styles synchronously before useEffect can set up CSS transition |
| v2      | React `style` returns `undefined` post-mount + imperative styles in isFirstRender | Overlap regressed                | React's Render 2 reconciliation wipes imperative styles set between renders               |

---

## System Weaknesses

### SW-1: Dual control of inline styles (Architecture)

The component uses two independent mechanisms to control the same CSS properties:
1. React's `style` prop — for SSR/pre-mount hiding
2. Imperative `ref.style.*` — for animation lifecycle

These mechanisms are fundamentally incompatible when React re-renders cause the `style` prop to change, because React's reconciliation cannot distinguish between "my properties" and "imperatively-set properties" — they're the same DOM object.

**Risk mechanism**: Any React re-render that changes the `style` prop return value will clean up/overwrite imperative styles. The `useMounted()` re-render is the known trigger, but any ancestor re-rendering with different props could also cause issues.

**Detection**: Only observable in a browser environment. Unit tests in node env cannot detect this because they can't simulate React's style reconciliation on real DOM elements.

### SW-2: Missing overflow-hidden for unmount=true mode (Code)

When `unmount=true` (the default), the wrapper has no `overflow-hidden` in its className. The component relies entirely on `display:none` to hide content. If `display:none` is ever removed without being re-applied (as happens in this bug), content overflows the zero-height wrapper and is visible.

**Risk mechanism**: Any scenario where `display` is cleared but `height` remains at 0 will show overlapping content.

**Detection**: Visual inspection only — no automated tests cover overflow behavior in a DOM environment.

### SW-3: Animation effect dependency array excludes isMounted (Code)

The `useEffect([isOpen])` does not depend on `isMounted`. This is intentional for animation lifecycle, but it means the effect cannot respond to the `useMounted()` re-render. When React's Render 2 wipes imperative styles, there's no effect to re-apply them.

**Risk mechanism**: State changes that happen between the initial render and the first `isOpen` toggle have no imperative code path to handle their DOM side effects.

### SW-4: No automated browser-level testing (Process)

The test suite runs in a `node` environment without DOM or React rendering. The 10 unit tests validate the pure function's return values correctly, but cannot test:
- React's style prop reconciliation behavior
- The interaction between effects and re-renders
- CSS overflow/display behavior
- CSS height transitions

**Detection**: Only manual testing catches these regressions.

---

## Instrumentation Gaps

### IG-1: No browser-level component tests (Normal — recommended)

**What**: Integration tests using `jsdom` or `happy-dom` that render `TransitionHeightElement` with React and verify DOM state after mount, after `useMounted` flip, and after `isOpen` toggle.

**Why**: The current node-env tests cannot detect the style reconciliation conflict. A rendering test would catch the regression by asserting `element.style.display === 'none'` after the full mount lifecycle.

**Type**: Normal (should be permanent infrastructure). Would require adding `jsdom` or `happy-dom` as a test environment option in vitest config.

**Note**: Even jsdom-based tests may not fully replicate `useResizeObserver` or CSS transitions, but they can verify React's style reconciliation behavior.

### IG-2: Source code structural assertions for style prop transitions (Normal — exists, needs extension)

**What**: The existing source-code assertions verify pattern presence/absence. They should also verify that the style prop cannot transition from object to undefined across renders — or alternatively, verify that the chosen fix approach's structural invariants hold.

**Type**: Normal (extend existing test file).

---

## Analysis Recommendations

1. **Test the separation approach**: The permanent fix must separate the concerns — React `style` prop should NOT manage `display` or `height` post-mount, OR the component should not use imperative DOM manipulation for those properties. The cleanest separation would be:
   - Use a CSS class (e.g., Tailwind's `hidden`) for SSR hiding via `className` (not `style` prop)
   - Remove `getTransitionWrapperStyle` entirely (or make it always return `undefined`)
   - Let imperative code exclusively control `display` and `height` post-mount
   - Verify that inline styles set imperatively are NOT affected by className changes (they have higher specificity)

2. **Test the useLayoutEffect approach**: As an alternative, verify whether adding a `useLayoutEffect([isMounted])` that re-applies `display:none; height:0px` after Render 2 would fix the regression without causing a flash. `useLayoutEffect` fires synchronously after DOM mutations but before the browser paints, so it could re-apply styles before the user sees the flash.

3. **Evaluate overflow-hidden as a defense-in-depth**: Adding `overflow-hidden` to the className for `unmount=true` when `isOpen=false` would prevent content overflow even if `display:none` is temporarily removed. This would not fix the zero-height→auto-height flash, but would prevent visible content overlap.

4. **Investigate adding jsdom/happy-dom test environment**: This would enable rendering-level tests that can catch style reconciliation issues automatically.

---

## Open Questions

1. **useLayoutEffect timing guarantee**: Does `useLayoutEffect` fire between React's DOM commit (which wipes imperative styles) and the browser paint? If yes, it could re-apply `display:none` before the user sees any flash. This needs verification in the actual app or a browser-based test.

2. **React 19.2 style reconciliation specifics**: The style cleanup behavior is well-documented for React 18. Verify that React 19.2 (used by this project) has the same reconciliation semantics. The behavior is unlikely to have changed, but should be confirmed.

3. **StrictMode implications**: In development StrictMode, effects run twice. Does this affect the `isFirstRender` ref behavior? The production build is unaffected, but developer experience during testing could be confusing.
