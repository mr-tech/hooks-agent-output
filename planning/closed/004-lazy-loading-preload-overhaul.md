---
ID: 4
Origin: 4
UUID: a7c3e1f9
Status: Released
Target Release: N/A (no roadmap/versioning configured)
Epic Alignment: UX — Eliminate loading flashes from lazy-loaded components
---

# Plan 004: Lazy Loading & Preload Overhaul (Revised)

## Changelog

| Date       | Change                                                                               |
| ---------- | ------------------------------------------------------------------------------------ |
| 2026-04-06 | **v4-impl**: Status → Implemented. All 4 milestones complete. Build passes.          |
|            | Lint failure is pre-existing (ESLint circular ref). Bundle analysis not available    |
|            | with Turbopack. Hover preload uses `onHoverStart` (react-aria) on mobile Button,     |
|            | `onPointerEnter`/`onTouchStart` on desktop AnchoredPopover.Trigger.                  |
| 2026-04-06 | **v4**: Revised per Critique 004; added ColorPicker/Picker + Drawer to preload list, |
|            | disambiguated "Picker" naming, expanded import-path guidance, added baseline step    |
| 2026-04-06 | v3: Simplified per Analysis 004; removed custom utility,                             |
|            | removed Suspense milestone; reduced from 7 to 4 milestones                           |
| 2026-04-06 | v2: Revised per architecture review (RC-1 through RC-6)                              |
| 2026-04-06 | v1: Initial plan created                                                             |

---

## Value Statement and Business Objective

**As a** message editor user, **I want** heavy components (emoji picker, slate editor, markdown renderer, image uploader, calendar, tooltips) to load seamlessly without visible loading flashes, **so that** the editing experience feels responsive and interactions (e.g., clicking the emoji picker) never leave me staring at a blank space or broken layout.

---

## Objective

Replace the current fragile preloading mechanism (`PreloadComponents` hidden-render hack) with idiomatic preloading using capabilities already built into `next/dynamic`, and flatten the EmojiPicker double-lazy chain.

**Key insight from Analysis 004**: `next/dynamic` in Next.js 16 already exposes a built-in `.preload()` method (accessible at `.render.preload` due to `forwardRef` wrapping). The existing `loading: () => null` pattern already prevents Suspense propagation because `next/dynamic` uses `useSyncExternalStore` internally, not `React.Suspense`. No custom utility or new Suspense boundaries are needed.

---

## Current State Analysis

### What exists today

1. **`src/components/dynamics/` barrel** — 7 files, each a one-liner `next/dynamic(...)` with `loading: () => null` (except `DiscordMessageEditor` which shows `<LoadingDots>`). Imported by ~20 consumer files.

2. **`PreloadComponents` in `edit/page.tsx`** — A `memo` component that waits 5 seconds after mount (`useMounted(5e3)`), renders dummy instances of 8 heavy components inside `<div className="hidden">`, then unmounts them 250ms later. This forces chunk downloads but is fragile: arbitrary timing, wastes work by actually mounting/unmounting component instances (invoking hooks, effects, renders), and if the user interacts before 5s they get `null` fallbacks.

3. **EmojiPicker double-lazy chain** — `EmojiPicker/index.tsx` wraps `Root` with `next/dynamic`, and `Root.tsx` wraps `Picker` with `next/dynamic`. Plus a manual `setTimeout(() => import('./Picker'), 1e3)` in `Root`. Creates a cascading waterfall of two sequential network requests.

### Problems

- **First-click loading flash**: User clicks emoji picker → `Picker` chunk hasn't loaded → renders `null` → popover opens empty → chunk arrives → Picker snaps in.
- **Wasted preload work**: `PreloadComponents` constructs and mounts/unmounts full component trees.
- **Arbitrary timing**: 5-second delay is unrelated to user behavior or network speed.
- **Double waterfall**: EmojiPicker requires two sequential chunk loads.

---

## Assumptions

1. Next.js 16.1.6, React 19.2.4. `next/dynamic` is built on `loadable.shared-runtime.js` (react-loadable derivative), uses `useSyncExternalStore`, and does NOT use `React.Suspense` internally. *(Corrected from v2 — see Analysis 004, Findings 1-3)*
2. `next/dynamic` already has `.preload()` exposed at `.render.preload` due to `forwardRef` wrapping. No custom preload utility is needed.
3. `ssr: false` is only needed for `Markdown` (uses browser-only APIs). All other components use `ssr: true`.
4. All dynamic components are used exclusively in `'use client'` subtrees.
5. The existing `loading: () => null` pattern already acts as a granular boundary — no Suspense additions needed.

---

## Plan

### Milestone 1: Route-Level Preloading via `useEffect`

**Objective**: Replace the `PreloadComponents` hidden-render hack with a `useEffect` that calls bare `import()` on all editor-critical chunks at mount time.

**Why bare `import()` over `.render.preload()`**: Both achieve the same result (fetching chunk JS). Bare `import()` is completely standard, does not rely on `next/dynamic`'s internal `.render.preload` API (which is undocumented and could change), and the webpack/turbopack bundler resolves `import()` to the same chunk URL either way. The implementer MAY choose `.render.preload()` if they prefer using `next/dynamic`'s internal loader cache, but bare `import()` is recommended as the default approach.

**Hard constraint**: ALL preload calls MUST be inside `useEffect` — **no module-level preload calls**. In Next.js App Router, module-level code in `'use client'` files executes on the server during SSR. `useEffect` is naturally client-only.

**Files to modify**:
- `src/app/message/m/[id]/edit/page.tsx`

**Tasks**:
1. Run `pnpm analyze` **before making any changes** and save the output — this is the baseline for Milestone 4's chunk size comparison.
2. Remove the entire `PreloadComponents` memo component (lines ~43-103) and its render site (line ~223)
3. Remove the dynamic imports at the top of the file that exist solely for `PreloadComponents` (`EmbedTitle`, `ColorPicker/Picker`, `Drawer`, `SlateEditor`, `Markdown`, `ImageUploader`, `TooltipPreload`)
4. Remove `useMounted` and `useUpdateEffect` imports if no longer used elsewhere in the file
5. Add a `useEffect` that calls bare `import()` for editor-critical chunks immediately, and defers secondary chunks via `requestIdleCallback` (with `setTimeout` fallback for Safari)

**Component inventory** — the current `PreloadComponents` preloads 8 components; the new `useEffect` must cover all of them. Use the import paths in this table exactly, so webpack resolves both calls to the same chunk:

| Component            | Preload tier | Import path (match exactly)                                                                                                   |
| -------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| DiscordMessageEditor | Critical     | `~/components/DiscordMessageEditor` (from `dynamics/DiscordMessageEditor.tsx`)                                                |
| SlateEditor          | Critical     | `~/components/SlateEditor` (from `dynamics/SlateEditor.tsx`)                                                                  |
| Markdown             | Critical     | `~/components/Markdown` (from `dynamics/Markdown.tsx`)                                                                        |
| Tooltip              | Critical     | `~/components/Tooltip` (from `dynamics/Tooltip.tsx`)                                                                          |
| EmojiPicker's Picker | Secondary    | `~/components/EmojiPicker/Picker` (from inline `next/dynamic` in `EmojiPicker/Root.tsx`)                                      |
| ColorPicker's Picker | Secondary    | `~/components/DiscordMessageEditor/components/EmbedEditor/ColorPicker/Picker` (from inline `next/dynamic` in `edit/page.tsx`) |
| Calendar             | Secondary    | `~/components/Calendar` (from `dynamics/Calendar.tsx`)                                                                        |
| ImageUploader        | Secondary    | `~/components/ImageUploader` (from `dynamics/ImageUploader.tsx`)                                                              |
| Drawer               | Secondary    | `~/components/Drawer` (from inline `next/dynamic` in `edit/page.tsx`)                                                         |

*EmbedTitle (in the old `PreloadComponents`) is intentionally dropped — it was only present to force SlateEditor's chunk to load. Directly preloading SlateEditor makes it redundant.*

**ILLUSTRATIVE ONLY** — conceptual shape:
```
useEffect(() => {
  // Critical path — begin loading immediately
  import('~/components/DiscordMessageEditor');
  import('~/components/SlateEditor');
  import('~/components/Markdown');
  import('~/components/Tooltip');

  // Secondary — defer until idle
  const schedule = 'requestIdleCallback' in window
    ? (fn) => requestIdleCallback(fn, { timeout: 3000 })
    : (fn) => setTimeout(fn, 1000);
  schedule(() => {
    import('~/components/EmojiPicker/Picker');                                               // EmojiPicker's Picker
    import('~/components/DiscordMessageEditor/components/EmbedEditor/ColorPicker/Picker');   // ColorPicker's Picker
    import('~/components/Calendar');
    import('~/components/ImageUploader');
    import('~/components/Drawer');
  });
}, []);
```

**Import path guidance**: For components with a `dynamics/` barrel entry, use the same path as that file's inner `import(...)`. For the three without a `dynamics/` entry — EmojiPicker's Picker, ColorPicker's Picker, Drawer — use the matching path from the existing inline `next/dynamic` declaration (in `EmojiPicker/Root.tsx` or `edit/page.tsx`). This ensures webpack resolves preload calls to the same chunks as the dynamic imports.

**Acceptance Criteria**:
- `PreloadComponents` is fully removed (component, render site, dead imports)
- All chunks previously preloaded by `PreloadComponents` are now preloaded via `import()` in `useEffect`
- No hidden DOM elements are rendered for preloading
- No module-level preload calls
- Editor-critical chunks begin loading immediately on client mount
- `pnpm build` succeeds, `pnpm lint` passes

---

### Milestone 2: Interaction-Hint Preloading

**Objective**: For the EmojiPicker (the primary UX pain point), start chunk loading on hover/touch of the trigger element — before the click.

**Files to modify**:
- `src/components/EmojiPicker/Root.tsx`

**Tasks**:
1. Add `onPointerEnter` and `onTouchStart` handlers on the emoji picker trigger button that call `import('./Picker')` (bare import to fetch the chunk)
2. Remove the `useMount(() => setTimeout(() => import('./Picker'), 1e3))` hack — it's replaced by the above hover preload plus Milestone 1's route-level idle preload

**The implementer may also apply hover preloading to other interaction-triggered components** at their discretion. Prioritized candidates beyond EmojiPicker:
- **ColorPicker trigger** (the color swatch on embeds in `EmbedEditor`) — same pattern as EmojiPicker: user clicks a swatch, a popover renders the ColorPicker's Picker. Add `onPointerEnter`/`onTouchStart` on the swatch button to call `import('~/components/DiscordMessageEditor/components/EmbedEditor/ColorPicker/Picker')`.
- **ImageUploader triggers** — various "upload image" buttons in embed editors.
- **Calendar triggers** — timestamp-related UI.

**Acceptance Criteria**:
- Hovering over the emoji picker trigger begins loading the Picker chunk
- The `setTimeout` preload hack is removed from `Root.tsx`
- By the time the user clicks, the chunk is usually already loaded
- If the chunk is NOT yet loaded on click, the popover opens with `null` content (existing `loading: () => null` behavior from the inner `next/dynamic`) and the Picker renders when available — no parent disruption
- Touch devices get preload via `onTouchStart` (fires before `onClick`)

---

### Milestone 3: Flatten EmojiPicker Lazy Chain

**Objective**: Eliminate the cascading waterfall of two sequential `next/dynamic` imports in the EmojiPicker.

**Current chain**: Consumer → `EmojiPicker/index.tsx` (dynamic Root) → `Root.tsx` (dynamic Picker) → `Picker/index.tsx`

**Target chain**: Consumer → `EmojiPicker/index.tsx` (direct re-export of Root) → `Root.tsx` (dynamic Picker) → `Picker/index.tsx`

**Files to modify**:
- `src/components/EmojiPicker/index.tsx` — Remove the `next/dynamic` wrapper around `Root`. Change to a direct import and re-export. `Root` is lightweight (popover logic, trigger button) — it does not need to be lazy-loaded.
- Consumers of `EmojiPicker` (`DiscordContentEditor/Desktop.tsx`, `Mobile.tsx`, etc.) — no changes needed; the default export shape is unchanged.

**Acceptance Criteria**:
- Only one lazy boundary exists in the EmojiPicker chain (the inner `Picker` via `next/dynamic` in `Root.tsx`)
- No cascading waterfall of sequential chunk loads
- Opening the emoji picker after hover-preload renders instantly
- `pnpm analyze` confirms the chunk containing consuming components (e.g., `DiscordContentEditor`) does not grow significantly from absorbing Root (~lightweight component)

---

### Milestone 4: Cleanup and Verification

**Objective**: Remove dead code, verify build, and validate behavior against the pre-change baseline.

**Tasks**:
1. Search codebase for any remaining references to `PreloadComponents`, `useMounted(5e3)`, or the hidden-div preload pattern — remove if found
2. Verify `pnpm build` succeeds
3. Verify `pnpm lint` passes
4. Run `pnpm analyze` and compare against the baseline captured in Milestone 1 Task 1 — confirm no heavy deps are accidentally bundled into the main chunk

**Acceptance Criteria**:
- Build succeeds
- Lint passes
- No dead imports or unused components remain
- No `PreloadComponents` or hidden preload divs in the codebase
- Chunk sizes are comparable to pre-change baseline

---

## Testing Strategy

- **Build verification**: `pnpm build` must succeed — validates all imports resolve and no SSR issues exist
- **Lint verification**: `pnpm lint` must pass
- **Bundle analysis**: `pnpm analyze` — verify chunk split boundaries are preserved
- **Manual/QA verification**: Focus on interaction timing:
  - Cold load of edit page → editor renders without flash
  - Emoji picker click → opens smoothly (no empty popover flash)
  - Image uploader click → opens smoothly
  - 3G throttled network → lazy components render `null` locally until ready, never root-level fallback cascade

---

## Risks

| Risk                                                                              | Likelihood | Impact | Mitigation                                                                                                              |
| --------------------------------------------------------------------------------- | ---------- | ------ | ----------------------------------------------------------------------------------------------------------------------- |
| Bare `import()` resolves to different chunk than `next/dynamic`'s loader          | Low        | Medium | Implementer must verify import paths match. Webpack deduplicates identical `import()` specifiers to the same chunk.     |
| Removed PreloadComponents drops a chunk that was being preloaded                  | Low        | Medium | Cross-reference all components in PreloadComponents with new `import()` calls in the useEffect.                         |
| Hover preload doesn't fire on touch devices                                       | Medium     | Low    | `onTouchStart` covers touch. Route-level `requestIdleCallback` preload serves as fallback.                              |
| EmojiPicker Root absorption increases consumer chunk size                         | Medium     | Low    | Root is lightweight (popover logic). Verify via `pnpm analyze`. If unexpectedly large, revert to dynamic wrapper.       |
| `.render.preload` API changes in future Next.js versions (if implementer uses it) | Low        | Low    | Plan recommends bare `import()` as default. If implementer chooses `.render.preload`, it's a one-line fix if it breaks. |

---

## Out of Scope

- Refactoring `AnchoredPopover/Child.tsx` FloatingPortal dynamic import (low-impact)
- `JsonMenu.tsx` and `NewMessageModal.tsx` dynamic imports (already have appropriate local fallbacks)
- Server Component code splitting
- Performance benchmarking or Lighthouse scoring
- Creating a custom `lazyWithPreload` utility (unnecessary — see Analysis 004)
- Adding Suspense boundaries (`next/dynamic` doesn't use Suspense internally — see Analysis 004)
- Modifying the `dynamics/` barrel exports (they work correctly as-is)

---

## Handoff Notes

- **Implementer**: This is a small, focused change. The core work is in `edit/page.tsx` (replace `PreloadComponents` with `useEffect` + `import()`) and `EmojiPicker/` (flatten chain + hover preload). No new files need to be created. No new packages.
- **Implementer**: When writing `import()` calls for preloading, use the exact module path from the component inventory table in Milestone 1. For components in `dynamics/`, that's the `dynamics/` file's inner `import(...)` path. For the three without a `dynamics/` entry (EmojiPicker's Picker, ColorPicker's Picker, Drawer), use the matching inline `next/dynamic` path from its source file. The component inventory table has all paths.
- **Implementer**: You may choose between bare `import()` (recommended, standard) and `.render.preload()` (uses next/dynamic's internal cache). Both work. If using `.render.preload()`, note it's accessed at `Component.render.preload` due to `forwardRef` wrapping — this is an undocumented internal API.
- **Implementer**: All preload calls must be inside `useEffect` — no module-level calls.
- **Critic**: Verify that the import path deduplication assumption holds (bare `import()` resolves to same chunk as `next/dynamic`'s loader).
- **No open questions remain.**

---

## Analysis Traceability

This revision incorporates findings from [004-lazy-loading-technical-analysis.md](../analysis/004-lazy-loading-technical-analysis.md):

| Finding                                            | Impact on Plan                                                            |
| -------------------------------------------------- | ------------------------------------------------------------------------- |
| F1: `next/dynamic` has built-in `.preload()`       | Removed Milestone 1 (custom `lazyWithPreload` utility)                    |
| F2: `React.lazy` works with React 19 SSR           | Retracted Assumption #1 from v2; no longer constrains approach            |
| F3: `next/dynamic` doesn't use Suspense            | Removed Milestone 3 (Suspense boundaries); `loading: () => null` suffices |
| F4: Simplest approach uses existing capabilities   | Reduced plan from 7 milestones to 4                                       |
| F5: `loading: () => null` IS the granular boundary | No Suspense additions needed                                              |

### Superseded Architecture Review Items

The v2 plan addressed RC-1 through RC-6 from [004-lazy-loading-architecture-findings.md](../architecture/004-lazy-loading-architecture-findings.md). This v3 revision supersedes several of those items based on Analysis 004's verified findings:

| Original Finding                           | v3 Status                                                                                                            |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| RC-1: Use `next/dynamic` not `React.lazy`  | **Retracted** — React.lazy works with React 19 SSR. Moot: plan stays on `next/dynamic` anyway.                       |
| RC-2: Tooltip wrapper structural exception | **Moot** — `dynamics/` files are no longer being modified.                                                           |
| RC-3: EmojiPicker Root bundle impact       | **Retained** — Milestone 3 acceptance criteria includes bundle check.                                                |
| RC-4: No self-preload in dynamics/         | **Moot** — `dynamics/` files are no longer being modified.                                                           |
| RC-5: Preload failure observability        | **Simplified** — bare `import()` failures surface naturally (unhandled promise rejection). No custom logging needed. |
| RC-6: useEffect-only preloading            | **Retained** — Milestone 1 hard constraint.                                                                          |
