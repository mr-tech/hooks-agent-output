---
ID: 4
Origin: 4
UUID: a7c3e1f9
Status: Active
---

> **NOTE**: This document is partially superseded by Plan 004 v3+ and Analysis 004. RC-1 ("React.lazy does NOT support SSR") has been **retracted** — React.lazy works with React 19 SSR via `renderToPipeableStream` (verified via POC). RC-2 and RC-4 are moot as `dynamics/` files are no longer being modified. See the plan's "Superseded Architecture Review Items" table for the full reconciliation.

# Architecture Findings — Plan 004: Lazy Loading & Preload Overhaul

## Changelog

| Date       | Context                         | Outcome               |
| ---------- | ------------------------------- | --------------------- |
| 2026-04-06 | Plan revised per all 6 RCs      | Changes incorporated  |
| 2026-04-06 | Pre-planning review of Plan 004 | APPROVED_WITH_CHANGES |

---

## Verdict: APPROVED_WITH_CHANGES

The plan is architecturally sound. It correctly identifies all four root causes of the loading jank. The `lazyWithPreload` pattern, granular Suspense boundaries, and flattening the EmojiPicker waterfall are the right solutions. The milestone sequencing is correct (utility first, wrappers, boundaries, preload sites).

**Six changes are required** before implementation. None is a fundamental redesign — they are precision corrections to avoid introducing new architectural problems.

---

## Required Changes

### RC-1: `React.lazy` Does NOT Support SSR in Next.js — Keep `next/dynamic` for All Components

**Severity**: BLOCKING

The plan's Assumption #1 states: "`React.lazy` is fully supported in client components and works with SSR via Next.js's built-in handling." **This is wrong.** `React.lazy` throws on the server in Next.js. `next/dynamic` exists specifically because it wraps `React.lazy` with SSR suspension/fallback handling.

From the existing code, 6 of 7 dynamic components use `ssr: true`. Moving them to raw `React.lazy` will crash SSR page renders.

**Required change**: The `lazyWithPreload` utility MUST be built on top of `next/dynamic`, NOT `React.lazy`. The approach should be:
1. Cache the import factory promise (for preloading)
2. Create the `next/dynamic` component using that same factory
3. Expose the cached `.preload()` method as a static property or named export

Alternatively, a two-export pattern works:
```ts
// lazyWithPreload.ts
export function lazyWithPreload<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  opts?: { ssr?: boolean },
) {
  let promise: Promise<{ default: T }> | null = null;
  const load = () => { promise ??= factory(); return promise; };

  const Component = dynamic(load, { ssr: opts?.ssr ?? true, loading: () => null });
  (Component as any).preload = load;

  return Component as typeof Component & { preload: typeof load };
}
```

This preserves SSR compatibility while enabling the preload pattern.

### RC-2: `Tooltip` Wrapper Contains Hook Logic — Cannot Be Pure `lazyWithPreload`

**Severity**: Medium

The current `dynamics/Tooltip.tsx` is NOT a simple lazy wrapper. It contains `useIsMobile()` and conditional rendering logic (mobile → render children directly, desktop → render lazy Tooltip). This makes it a runtime component, not just a lazy-loading shell.

The plan (Milestone 2) says "Retains its `TooltipWrapper` logic (mobile guard) but uses `lazyWithPreload` internally" — this is acknowledged but needs explicit design:
- The `TooltipWrapper` component itself MUST remain eagerly imported (it uses a hook)
- Only the inner `Tooltip` component import should use `lazyWithPreload`
- The `.preload()` export should be surfaced through the wrapper file but should preload the inner `Tooltip`, not the wrapper

**Required change**: The plan's Milestone 2 file list must clarify this as a structural exception. The wrapper stays, the inner lazy import changes.

### RC-3: Flattening EmojiPicker Lazy Chain May Bundle Root Into DiscordContentEditor Chunk

**Severity**: Medium

Currently:
- `EmojiPicker/index.tsx` dynamically imports `Root` → Root is in a separate chunk
- `DiscordContentEditor/Desktop.tsx` and `Mobile.tsx` statically import `EmojiPicker` (the `index.tsx`)

If Milestone 6 changes `EmojiPicker/index.tsx` to a direct re-export (`export { default } from './Root'`), then `Root` and ALL its static dependencies (classnames, react-aria, AnchoredPopover, Button, NullableComponent, IsMobileProvider) get bundled into the `DiscordContentEditor` chunk. Only `Picker` stays lazy.

This is probably fine — `Root.tsx` is lightweight compared to `Picker` — but the plan should explicitly acknowledge the bundle size impact and verify it with `pnpm analyze` as part of Milestone 6 acceptance criteria.

**Required change**: Add to Milestone 6 acceptance criteria: "Bundle analysis (`pnpm analyze`) confirms that the chunk containing DiscordContentEditor does not grow by more than ~5KB gzipped from absorbing EmojiPicker Root."

### RC-4: MessagePreview Route Gets DiscordMessageEditor Preload For Free — But Shouldn't Trigger Eager Preloads

**Severity**: Low

`MessagePreview` (used on `/message`, `/message/m/[id]/send`) imports `dynamics/DiscordMessageEditor`. The plan's Milestone 4 places `.preload()` calls at module level in `edit/page.tsx`. Good — this means the send/list routes won't trigger preloads for SlateEditor, Calendar, etc.

However, if the implementer accidentally moves preload calls into the `dynamics/` files themselves (e.g., auto-preload on import), it would bloat the send page. **The plan should add a constraint**: `.preload()` must NEVER be called inside `dynamics/` files. Preload calls belong exclusively at route-level or interaction-hint sites.

**Required change**: Add an explicit constraint to Milestone 2: "dynamics/ files MUST NOT call .preload() themselves. They only export the preload handle."

### RC-5: Missing Observability — No Way to Diagnose Loading Issues in Production

**Severity**: Medium

The plan removes the visible `PreloadComponents` mechanism and replaces it with invisible `.preload()` calls. If preloading silently fails (network error, chunk hash mismatch after deployment), the user sees a degraded experience with no diagnostic signal.

**Required change**: The `lazyWithPreload` utility should catch rejected preload promises and log a structured warning:
```ts
const load = () => {
  promise ??= factory().catch((err) => {
    console.warn('[lazyWithPreload] Chunk preload failed:', err);
    promise = null; // Allow retry
    throw err;
  });
  return promise;
};
```
This is the **minimum viable incident telemetry** for this system: a catchable, retryable signal that preloading degraded. The `promise = null` on failure allows retry on next render (React.lazy/next/dynamic will re-attempt).

### RC-6: Module-Level Preload Calls Execute During SSR (Risk Underweighted)

**Severity**: Medium

The plan's risk table lists "Preload calls on module level execute during SSR" as Medium/Low with mitigation "Guard with `typeof window !== 'undefined'`." This is correct in principle but must be promoted to a hard constraint in Milestone 4, not just a risk mitigation.

In Next.js App Router with `'use client'` directives, module-level code DOES execute on the server during SSR. A bare `DiscordMessageEditor.preload()` at module level in `edit/page.tsx` would attempt a dynamic import on the server, which could fail or cause chunk-loading errors.

**Required change**: Milestone 4 must mandate that ALL module-level preload calls are guarded:
```ts
if (typeof window !== 'undefined') {
  DiscordMessageEditor.preload();
  SlateEditor.preload();
  // ...
}
```
Or, preferably, use `useEffect` exclusively for preload calls (simpler, no guard needed, naturally client-only). The plan should pick one approach and mandate it — not leave it as "module level OR useEffect."

---

## Architectural Observations (Non-Blocking)

### AO-1: Consider `requestIdleCallback` Over `setTimeout` for Deferred Preloads

Milestone 4 mentions "requestIdleCallback/setTimeout" for deferred preloads. The plan should prefer `requestIdleCallback` with a `setTimeout` fallback (Safari support). This is a minor detail but worth standardizing:
```ts
const idlePreload = (fn: VoidFunction) => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(fn, { timeout: 3000 });
  } else {
    setTimeout(fn, 1000);
  }
};
```

### AO-2: Vitest IS Configured — Testing Opportunity Exists

The architecture doc says "No test framework configured" but `vitest.config.ts` exists with 5 test files. The `lazyWithPreload` utility is pure enough to unit test (mock dynamic imports, verify caching, verify `.preload()` idempotency). This isn't required but would be the first truly infrastructure-level utility test.

### AO-3: Future Consideration — Prefetch Hints via `<link rel="prefetch">`

The current plan uses JavaScript-level preloading (calling the import factory). For even earlier preloading, Next.js supports `<link rel="prefetch">` for chunks. This could be explored in a follow-up to preload critical editor chunks during the HTML response, before any JS executes. Out of scope for this plan, but worth tracking.

---

## Integration Requirements

- **No new dependencies required.** The plan uses only `next/dynamic`, `React.Suspense`, and standard import() — all already available.
- **No API changes.** This is purely a client-side rendering architecture change.
- **No provider changes.** Provider boundaries remain unchanged.
- **Bundle boundary preservation.** The dynamics/ barrel pattern is preserved (same import paths for consumers). The change is internal to the barrel files.

---

## Updated Architecture Notes

This plan, once implemented, establishes the following architectural pattern for the project:

**Lazy Loading Convention:**
1. Heavy client components are wrapped via `lazyWithPreload()` in `src/components/dynamics/`
2. `dynamics/` files export the lazy component (default) and a `.preload()` handle
3. `dynamics/` files NEVER call `.preload()` themselves
4. Route pages call `.preload()` in `useEffect` for route-critical components
5. Interaction triggers call `.preload()` on `onPointerEnter`/`onFocus`/`onTouchStart`
6. Every lazy component render site has a local `<Suspense>` boundary

This should be documented in `system-architecture.md` after implementation is verified.
