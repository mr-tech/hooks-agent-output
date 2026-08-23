---
ID: 4
Origin: 4
UUID: a7c3e1f9
Status: Released
---

# QA Report: Lazy Loading & Preload Overhaul (Plan 004)

**Plan Reference**: `agent-output/planning/004-lazy-loading-preload-overhaul.md`
**Code Review Reference**: `agent-output/code-review/004-lazy-loading-preload-code-review.md`
**QA Status**: QA Complete

## Changelog

| Date       | Agent Handoff | Request                            | Summary                                                                    |
| ---------- | ------------- | ---------------------------------- | -------------------------------------------------------------------------- |
| 2026-04-07 | Code Reviewer | Code review approved, ready for QA | Created test strategy, wrote 28 automated tests, all pass. Build verified. |

## Timeline
- **Test Strategy Started**: 2026-04-07
- **Test Strategy Completed**: 2026-04-07
- **Implementation Received**: 2026-04-07 (code review approved)
- **Testing Started**: 2026-04-07
- **Testing Completed**: 2026-04-07
- **Final Status**: QA Complete

## Test Strategy

Plan 004 is a lazy loading / preloading overhaul with **no new business logic functions**. The changes are structural: swapping preload mechanisms, flattening component chains, adding a loading skeleton, and wiring event handlers. The testing approach is:

1. **Static code pattern verification** (automated) — Read source files and assert invariants that prevent regressions (e.g., PreloadComponents removed, all preload paths present, loading fallbacks configured, old hacks absent)
2. **Build verification** (automated) — `pnpm build` succeeds
3. **Full test suite regression** (automated) — All existing 140 tests still pass
4. **Manual verification guidance** — Behavioral checks for loading flash prevention that cannot be automated without browser testing infrastructure

### Testing Infrastructure Requirements

**No new infrastructure needed.** Vitest 4.1.2 is already installed and configured with the `~` path alias. Tests use Node.js `fs.readFileSync` to read source files — no DOM environment required.

### Why Source Pattern Tests (Not Component Rendering Tests)

The project has no component testing infrastructure (`@testing-library/react`, `jsdom`, `happy-dom`). The vitest config uses `environment: 'node'`. All 140 existing tests are pure logic/data tests. Adding component rendering infrastructure for one plan would be over-engineering.

Source pattern tests catch the specific regressions that matter:
- Someone re-introduces `PreloadComponents`
- A preload import path is removed
- The loading fallback is removed (causing Suspense bubbling → editor loading flash)
- The old `setTimeout` hack returns
- The double-lazy chain is re-introduced

## Implementation Review

### Code Changes Summary

| File                                            | Changes                                                                                                                                                |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/app/message/m/[id]/edit/page.tsx`          | Removed PreloadComponents hack + dead imports; added useEffect with 9 import() preload calls (4 critical, 5 secondary via requestIdleCallback)         |
| `src/components/EmojiPicker/Root.tsx`           | Removed setTimeout hack; added `preloadPicker` callback with hover/touch handlers; changed `loading: () => null` → `loading: () => <PickerSkeleton />` |
| `src/components/EmojiPicker/index.tsx`          | Flattened from `next/dynamic` wrapper to `export { default } from './Root'`                                                                            |
| `src/components/EmojiPicker/PickerSkeleton.tsx` | NEW — Skeleton loading state matching Picker dimensions (498×466) with pulsing placeholder blocks                                                      |

### Post-Code-Review Fix (Bug Fix)

The original implementation used `loading: () => null` on the Picker dynamic import. This was identified as causing the editor to flash loading dots when the emoji picker was opened before the chunk loaded — the `null` loading meant no local Suspense boundary, so suspension bubbled up to `DiscordMessageEditor`'s `LoadingDots` fallback.

**Fix applied**: `PickerSkeleton` component created and wired as `loading: () => <PickerSkeleton />`. A secondary bug was also fixed — `animate-pulse` was initially on the outer `bg-secondary` container, causing the background to pulse to 50% opacity (revealing content underneath). It was moved to inner section elements only.

## Test Coverage Analysis

### Test File
`src/utils/__tests__/plan-004-lazy-loading.test.ts` — 28 tests across 5 describe blocks

### Coverage Map

| File                             | What's Tested                                                                                                                                                                   | Test Cases | Status  |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------- |
| `edit/page.tsx`                  | PreloadComponents removed, all 9 import paths present, requestIdleCallback+setTimeout fallback, useEffect wrapping (SSR safety)                                                 | 6          | COVERED |
| `EmojiPicker/index.tsx`          | Direct re-export (no dynamic), no next/dynamic usage                                                                                                                            | 2          | COVERED |
| `EmojiPicker/Root.tsx`           | Single dynamic boundary, loading fallback exists, PickerSkeleton used, setTimeout hack absent, hover preload callback, desktop onPointerEnter/onTouchStart, mobile onHoverStart | 8          | COVERED |
| `EmojiPicker/PickerSkeleton.tsx` | Exports component, animate-pulse present, no outer container pulse (see-through bug), bg-secondary matches Picker, memo wrapped                                                 | 5          | COVERED |
| `dynamics/*.tsx` (5 files)       | Each uses next/dynamic with loading prop, DiscordMessageEditor uses LoadingDots, others use `loading: () => null`                                                               | 7          | COVERED |

### Coverage Gaps

- **Runtime behavior** (chunk loading timing, hover→preload→click flow) — Not automatable without browser/E2E infrastructure. Covered by manual verification below.
- **Mobile touch path** — `onHoverStart` doesn't fire for touch on react-aria `Button`; mitigated by route-level idle preload. Documented in code review as L-1.

## Test Execution Results

### Automated Tests
- **Command**: `npx vitest run src/utils/__tests__/plan-004-lazy-loading.test.ts --reporter=verbose`
- **Status**: PASS
- **Result**: 28/28 tests pass
- **Duration**: 306ms

### Full Suite Regression
- **Command**: `npx vitest run --reporter=verbose`
- **Status**: PASS
- **Result**: 168/168 tests pass (28 new + 140 existing)
- **Duration**: 772ms

### Build Verification
- **Command**: `pnpm build`
- **Status**: PASS

## TDD Compliance Gate

Plan 004 does not include a standard implementation doc with a TDD compliance table (documented as code review finding P-1). The changes are structural refactors and a presentational skeleton component — no new business logic functions requiring TDD.

The `PickerSkeleton` component is purely presentational (static JSX, no logic, no props beyond `FC`). Creating a failing test first would require component rendering infrastructure that doesn't exist in the project. The source pattern tests verify its structural correctness instead.

**Assessment**: TDD exception is justified for this plan's scope.

## Manual Verification Checklist

These behavioral checks should be performed during UAT:

- [ ] **Cold load**: Navigate to edit page → editor renders without visible loading flash
- [ ] **Emoji picker (desktop)**: Hover over 😀 trigger → click → Picker renders (skeleton briefly if chunk still loading, then real picker)
- [ ] **Emoji picker (mobile)**: Tap 😀 trigger → Picker renders (skeleton briefly, then real picker)
- [ ] **Skeleton appearance**: On slow network, skeleton shows with pulsing blocks (no see-through to content behind)
- [ ] **Network tab**: On mount, verify 4 critical chunks load immediately + 5 secondary chunks load after idle
- [ ] **Throttled 3G**: Lazy components show their local fallback (skeleton or null), never root-level LoadingDots cascade
- [ ] **Shift+click emoji**: Hold shift, click emoji → picker stays open (existing behavior preserved)

---

Handing off to uat agent for value delivery validation.
