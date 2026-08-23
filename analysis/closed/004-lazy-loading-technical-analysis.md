---
ID: 4
Origin: 4
UUID: b8d2f4a3
Status: Planned
---

# Analysis 004: Lazy Loading Technical Investigation

## Changelog

| Date       | Change                                  |
| ---------- | --------------------------------------- |
| 2026-04-06 | Status → Planned; incorporated into Plan 004 v3 |
| 2026-04-06 | Initial analysis                        |

---

## Value Statement and Business Objective

Determine whether Plan 004's approach (custom `lazyWithPreload` utility) is the right solution, or whether the existing stack already provides everything needed without custom code.

---

## Context

Plan 004 proposes building a custom `lazyWithPreload` utility as its foundational Milestone 1. The architecture review (RC-1) then mandated this be built on `next/dynamic` rather than `React.lazy`, adding further complexity. The user flagged this as potentially over-engineered.

---

## Methodology

- Source code inspection of `next/dynamic` and `loadable.shared-runtime.js` in the installed `next@16.1.6`
- POC tests of `React.lazy` with `renderToPipeableStream` (React 19.2.4)
- Review of Next.js official lazy loading documentation
- Analysis of existing codebase usage patterns

---

## Findings

### Finding 1: `next/dynamic` Already Has a Built-in `.preload()` Method

**Confidence: VERIFIED** (source code + runtime POC)

The `loadable.shared-runtime.js` in Next.js 16.1.6 (line ~107 of the loadable source) explicitly sets:
```js
LoadableComponent.preload = () => init();
```

Due to `React.forwardRef` wrapping, this is accessible as `Component.render.preload` on the object returned by `next/dynamic`. The `init()` function creates a singleton `LoadableSubscription` that caches the loader promise — calling it multiple times is a no-op after the first call.

**Implication**: There is no need to build a custom preload utility. The capability exists. It's just not on the top-level object because of `forwardRef`.

### Finding 2: RC-1 Was Wrong — `React.lazy` DOES Work With SSR in React 19

**Confidence: VERIFIED** (runtime POC)

React 19's `renderToPipeableStream` (which Next.js App Router uses) fully supports `React.lazy`. The server waits for the lazy component's promise to resolve and streams the content. This was tested both with synchronous and async factory functions.

```
React.lazy SSR via renderToPipeableStream → renders component content, NOT fallback
```

The old claim "React.lazy throws on the server" was true for `renderToString` (React 18 and prior) but is false for React 19 streaming SSR. The architecture review's RC-1 was based on outdated information.

However: `next/dynamic` still adds value for its `ssr: false` option, `loading` prop with rich state (`pastDelay`, `timedOut`, `retry`), and webpack module tracking for chunk preloading during SSR.

### Finding 3: `next/dynamic` Does NOT Use `React.Suspense` Internally

**Confidence: VERIFIED** (source code)

`next/dynamic`'s loadable runtime uses `useSyncExternalStore` with its own `LoadableSubscription` state machine. Components rendered via `next/dynamic` will **never throw a Suspense promise** — they render the `loading` component while chunks load, then swap to the real component.

**Implication**: The current `loading: () => null` pattern already prevents parent Suspense boundary cascades. The plan's Milestone 3 (adding Suspense boundaries around every `next/dynamic` component) is **unnecessary** if we stay on `next/dynamic`. Suspense boundaries are only needed if switching to `React.lazy`.

### Finding 4: The Simplest Idiomatic Approach Uses Only What Already Exists

**Confidence: HIGH-CONFIDENCE INFERENCE**

The Next.js docs list two official approaches:
1. `next/dynamic` — "a composite of React.lazy() and Suspense"
2. `React.lazy()` with `Suspense`

For this project, the path of least resistance is to **stay on `next/dynamic`** (already used everywhere) and just use its built-in `.preload()` correctly. No custom utility, no migration to `React.lazy`, no new Suspense boundaries.

What actually needs to happen:
1. **Expose `.preload()`** — Create a thin wrapper or helper that extracts `.render.preload` from `next/dynamic` components (one line of code, not a utility file)
2. **Call `.preload()` in `useEffect` at route entry** — Replace the `PreloadComponents` hidden-render hack
3. **Call `.preload()` on hover/focus for interaction-triggered components** — Standard pattern: `onPointerEnter={() => Component.preload()}`
4. **Flatten the EmojiPicker double-lazy chain** — Remove one of the two `next/dynamic` layers
5. **Remove the `PreloadComponents` hack** — Dead code after preload calls are in place

That's it. No `lazyWithPreload` utility. No Suspense boundary additions. No migration from `next/dynamic` to `React.lazy`.

### Finding 5: The `loading: () => null` Pattern IS the Granular Boundary

**Confidence: VERIFIED** (source code)

Every `dynamics/` file already uses `loading: () => null`. This means while the chunk loads, the component renders `null` — no visible fallback, and critically, **no Suspense propagation**. The component simply doesn't appear until ready.

For `DiscordMessageEditor`, the loading fallback is `<LoadingDots>`, which is already scoped to its render site.

The only place where the UX is broken is the EmojiPicker, where:
- The popover opens immediately (because the trigger is eager)
- But the `Picker` content renders `null` briefly (because it's a separate `next/dynamic`)
- Then snaps in when loaded

This is fixed by **preloading `Picker` on hover** — not by adding Suspense boundaries.

---

## Root Cause of Plan Over-Engineering

The plan went wrong at Assumption #1. Whoever wrote it believed `React.lazy` doesn't work with SSR and that `next/dynamic` is just a compatibility wrapper. This led to:

1. Proposing a custom `lazyWithPreload` utility (Milestone 1) — unnecessary because `next/dynamic` already has `.preload()`
2. The architecture review doubling down on wrapping `next/dynamic` — adding another layer of abstraction on top of an abstraction
3. Proposing Suspense boundaries everywhere (Milestone 3) — unnecessary because `next/dynamic` doesn't use Suspense
4. 7 milestones for what is fundamentally a ~50-line change across a few files

---

## What the Plan Should Actually Be

The entire plan can be reduced to:

**Step 1**: Create a one-line helper to extract `.preload()` from `next/dynamic` forwardRef:
```ts
// Access .preload() which is on .render due to forwardRef wrapping
export const getPreload = (comp: any) => comp?.render?.preload as (() => Promise<void>) | undefined;
```
Or just access `.render.preload` directly at call sites.

**Step 2**: In `edit/page.tsx`, replace `PreloadComponents` with `useEffect` calling `.render.preload()` on the dynamic imports that are already imported in that file.

**Step 3**: In `EmojiPicker/Root.tsx`, add `onPointerEnter`/`onTouchStart` on the trigger button to call the Picker's preload. Remove the `setTimeout(() => import('./Picker'), 1e3)` hack.

**Step 4**: Flatten EmojiPicker: remove the `next/dynamic` wrapper in `EmojiPicker/index.tsx` so `Root` is directly imported (it's lightweight). Keep only the inner `Picker` as dynamic.

**Step 5**: Remove `PreloadComponents` and its associated dead imports.

**No new packages. No new utilities. No Suspense boundaries. No migration.**

---

## Remaining Gaps

1. **Untested in full Next.js build**: The `.render.preload` access pattern was verified in Node.js runtime but not through a full `pnpm build` + production runtime. The implementer should verify that `.render.preload` is stable across dev/prod modes.
2. **Touch device preloading**: `onPointerEnter` doesn't fire reliably on touch devices. The route-level `useEffect` preloading covers this as a fallback, but implementer should also add `onTouchStart` to interaction triggers.
3. **`.render.preload` is an implementation detail**: This is not a documented public API of `next/dynamic`. It could change in future Next.js versions. Acceptable risk — it's a thin access pattern, easy to update if Next.js changes it. Alternatively, the implementer could just call `import()` directly for preloading (bypasses the loadable entirely).

---

## Analysis Recommendations

1. **Simplify the plan to ~5 implementation steps** as described above. The 7-milestone structure with a custom utility is unnecessary.
2. **The implementer should decide** between `.render.preload()` (uses next/dynamic's existing cache) versus bare `import()` calls (simpler, no reliance on internal API). Both achieve the same result — fetching the chunk JS. Bare `import()` is arguably better since it's completely standard.
3. **Remove Milestone 1 (lazyWithPreload utility)** and **Milestone 3 (Suspense boundaries)** entirely.
4. **Retract RC-1 from the architecture findings** — it was based on incorrect information about React 19 SSR support.
