---
ID: 10
Origin: 10
UUID: b7e3a41f
Status: Planned
---

# 010 — InfoPanel Overlap on Initial Load (Bot Not in Server)

## Changelog

| Date       | Change                                   |
| ---------- | ---------------------------------------- |
| 2026-04-12 | Status → Planned; Plan 010 created       |
| 2026-04-12 | Initial analysis created                 |

## Value Statement and Business Objective

Users navigating to a server where the bot is not installed see the InfoPanel (invite prompt) overlapping the message list UI. This creates a broken visual experience that undermines trust and usability on a key conversion surface (bot invite flow).

## Objective

Determine the root cause of the InfoPanel content overlapping the message UI on initial load when the bot is not in the server.

## Context

- **Affected pages**: Server message list (`f/[id]/page.tsx`) and send page (`m/[id]/send/page.tsx`)
- **Trigger**: Navigate to a server where the bot is not installed
- **Symptom**: The InfoPanel's expandable content (feature list, invite button) is visually displayed and overlaps the message list below, despite the panel being in a "collapsed" state
- **Workaround**: Clicking the InfoPanel header to "expand" it, then collapsing it, fixes the layout permanently for that session

## Methodology

Static code trace through the component render lifecycle, focusing on the interaction between `InfoPanel`, `TransitionHeightElement`, and `useMounted`.

## Findings

### Verified: Root Cause — `TransitionHeightElement` fails to properly hide content on initial mount when `isOpen=false`

The bug is caused by a sequence of three interacting issues in `TransitionHeightElement.tsx`:

#### Issue 1: `overflow-hidden` is never applied when `unmount=true` (default)

[TransitionHeightElement.tsx](../../../website/src/components/TransitionHeightElement.tsx#L69):
```jsx
className={classNames('w-full transition-[height] ease-out', !unmount && 'overflow-hidden', className)}
```

When `unmount=true` (default), `!unmount` evaluates to `false`, so `overflow-hidden` is **never included** in the className. This means even when the wrapper height is set to `0px`, the content overflows and remains visually visible.

#### Issue 2: `useEffect` skips the initial render, never setting up the closed state

[TransitionHeightElement.tsx](../../../website/src/components/TransitionHeightElement.tsx#L40-L56):
```jsx
useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // ← Skips on first render
    }
    // ... the code that adds overflow-hidden and sets height:0 is never reached
}, [isOpen]);
```

The `useEffect` fires once after the initial render, hits the `isFirstRender` guard, and returns. Since `isOpen` doesn't change (stays `false`), the effect never re-runs. The code path that adds `overflow-hidden` via `wrapper.classList.add('overflow-hidden')` is only in the `else` (close) branch, which is unreachable on first mount.

#### Issue 3: Inline style removal after mount with no fallback

[TransitionHeightElement.tsx](../../../website/src/components/TransitionHeightElement.tsx#L62):
```jsx
style={isMounted || isOpen ? undefined : { height: 0, display: unmount ? 'none' : 'block' }}
```

**Render lifecycle trace:**

| Step                          | `isMounted` | `isOpen` | Inline style                     | Effective state                        |
| ----------------------------- | ----------- | -------- | -------------------------------- | -------------------------------------- |
| 1. First render               | `false`     | `false`  | `{ height: 0, display: 'none' }` | Hidden ✓                               |
| 2. After `useMounted()` fires | `true`      | `false`  | `undefined` (removed)            | **Exposed** ✗                          |
| 3. ResizeObserver fires       | `true`      | `false`  | `height: 0px` (via DOM)          | Height 0, but **no overflow-hidden** ✗ |

After step 2, the wrapper div has:
- `display: block` (default, no inline override)
- `height: 0px` (eventually, from ResizeObserver)
- **No `overflow-hidden`** (never applied)
- **No `display: none`** (removed in step 2, never re-applied)

The `onTransitionEnd` handler that would set `display: none` never fires because CSS cannot animate a transition from `auto` (no inline height) to `0px` — it changes instantly, producing no transition event.

#### Why clicking "expand" fixes it

When the user clicks the InfoPanel header, `isOpen` toggles to `true`. The `useEffect` fires (no longer first render), properly sets `height = scrollHeight`, and transitions the wrapper open. When subsequently collapsed, the `useEffect`'s `else` branch fires, adding `overflow-hidden` and setting `height: 0`. This time, the transition from `scrollHeight → 0` is animatable, so `onTransitionEnd` fires and sets `display: none`. The component is now properly managed.

### Verified: Both server pages are affected

**Server message list** (`f/[id]/page.tsx`, line 241):
```jsx
<InfoPanel
    text='Invite the bot to access more features'
    subText="Here's what you'll be able to do!"
    items={GUILD_FEATURES}
    ...
/>
```

**Send page** (`m/[id]/send/page.tsx`, line 144):
```jsx
<InfoPanel
    text='The Hooks.gg bot is not in this server'
    subText='Invite the bot to access more features'
    items={GUILD_FEATURES}
    ...
/>
```

Both use `InfoPanel` with default `collapsible=true` and `defaultOpen=false`, triggering the same bug path.

### Verified: Layout is block-flow, exacerbating overflow

`Container` uses `relative w-full` and `ContainerSection` uses margin-based spacing. In block layout, elements with `height: 0` take no space, so subsequent siblings are positioned as if the InfoPanel content doesn't exist — while the overflowing content visually covers them.

## Root Cause

**Verified.** `TransitionHeightElement` has a state management gap when initially mounted with `isOpen=false` and `unmount=true` (both defaults). The inline style that hides the element is removed after mount, but no fallback mechanism (overflow-hidden, display:none, or the useEffect close-path) takes over to keep the content hidden. The content renders at full size within a 0-height wrapper with no overflow clipping, overlapping subsequent sibling elements.

## System Weaknesses

| Weakness                                               | Risk Mechanism                                                                                                                                                                                                   |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `overflow-hidden` gated behind `!unmount` in className | When `unmount=true`, overflow is never clipped via CSS class. The component relies entirely on `display:none` from `onTransitionEnd`, but that callback has a gap on initial mount.                              |
| `isFirstRender` guard in useEffect                     | Creates a dead zone where the close-path logic (adding overflow-hidden, setting height:0) is unreachable on initial mount. The intent was to skip the initial animation, but it also skips critical state setup. |
| `isMounted` removing inline style unconditionally      | The inline style provides the only reliable hiding mechanism before JS takes over. Removing it based solely on `isMounted` (regardless of `isOpen`) creates a window where content is uncontrolled.              |
| No integration test for initial-closed state           | The TransitionHeightElement is never tested for the scenario where it mounts already closed.                                                                                                                     |

## Instrumentation Gaps

None applicable — this is a deterministic client-side rendering bug, not a runtime/backend issue. No telemetry needed.

## Analysis Recommendations

1. **Test the initial-mount-closed scenario** in TransitionHeightElement by rendering it with `isOpen=false` and verifying that the wrapper has either `display:none` or `overflow:hidden` after mount.
2. **Trace the `useResizeObserver` callback** from `@react-aria/utils` to confirm whether it uses a stable ref for the latest callback (affects whether the closure captures the correct `isOpen` value). This is secondary to the main issue but worth verifying.
3. **Audit other `TransitionHeightElement` usages** that start with `isOpen=false` to identify if other pages have the same overlap bug (e.g., the edit message section in the send page also uses `TransitionHeightElement` with `isOpen={showEdit}` starting as `false`, but that one likely works because it's inside a `ContainerSection` that provides its own margin separation).

## Open Questions

None — root cause is verified through static code trace. The lifecycle sequence is deterministic and reproducible on every page load when the bot is not in the server.
