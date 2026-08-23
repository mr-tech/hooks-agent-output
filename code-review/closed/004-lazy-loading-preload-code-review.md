---
ID: 4
Origin: 4
UUID: a7c3e1f9
Status: Released
---

## Verdict: APPROVED_WITH_COMMENTS

The implementation is clean, correct, and delivers Plan 004's value statement. All four milestones are complete. Two low-severity observations and one process note below — none block QA.

---

## Review Scope

| File                  | Purpose                                                 |
| --------------------- | ------------------------------------------------------- |
| edit/page.tsx         | Remove PreloadComponents hack; add useEffect preloading |
| EmojiPicker/Root.tsx  | Remove setTimeout hack; add hover/touch preloading      |
| EmojiPicker/index.tsx | Flatten double-lazy chain to direct re-export           |

Note: The git diff contains many other changes from unrelated plans (Components V2, ActionsMenu, etc.). This review covers **only** Plan 004 changes.

---

## Correctness

**edit/page.tsx** — All 9 components from the plan's inventory are present with correct import paths. Critical path (4 components) fires immediately; secondary path (5) defers via `requestIdleCallback` with `setTimeout` fallback. `void import()` correctly suppresses floating-promise warnings. All dead imports from `PreloadComponents` removal are cleaned up (`dynamic`, `memo`, `useState`, `useUpdateEffect`, `useMounted`, `Calendar`, 3 inline dynamic declarations).

**Root.tsx** — `preloadPicker` uses `useCallback([], [])` — correct since the callback body has no dependencies. Mobile `Button` uses `onHoverStart` (from react-aria `HoverProps`), desktop `AnchoredPopover.Trigger` uses native `onPointerEnter`/`onTouchStart` (via `HTMLProps<HTMLElement>`). Both are type-safe (zero TS errors confirmed).

**index.tsx** — `export { default } from './Root'` is the minimal correct flatten. Single lazy boundary preserved inside Root.tsx (`const Picker = dynamic(...)`).

## SSR Safety

All preload `import()` calls are inside `useEffect` (client-only). The `requestIdleCallback` check (`'requestIdleCallback' in window`) is safe inside `useEffect`. **Plan hard constraint satisfied.**

## Architecture Alignment

- `dynamics/` barrel exports untouched ✅
- No custom utility created ✅
- No Suspense boundaries added ✅
- Matches milestones M1–M4 exactly ✅

---

## Findings

### L-1: Mobile touch preload gap (LOW)

**File**: Root.tsx

The mobile `Button` uses `onHoverStart` which, by react-aria design, does **not** fire for touch interactions. The emoji picker trigger on touch-only mobile devices will not trigger `preloadPicker` via direct interaction. 

**Mitigated by**: route-level `requestIdleCallback` in `edit/page.tsx` preloads `EmojiPicker/Picker` within ~3s of mount. Acceptable behavior.

**Recommendation**: Optional — add a brief comment explaining why `onHoverStart` is used instead of `onTouchStart`:
```tsx
// react-aria Button doesn't accept native onTouchStart;
// mobile touch covered by route-level idle preload in edit/page.tsx
onHoverStart={preloadPicker}
```

### L-2: ColorPicker preload may be redundant (LOW)

**File**: edit/page.tsx

`ColorPicker/index.tsx` was changed in a separate plan to statically import `Picker` (no longer `next/dynamic`). The bare `import()` in the preload useEffect will resolve instantly from the module cache — effectively a no-op.

**Impact**: Zero harm. Module deduplication handles this transparently.

**Recommendation**: No action needed now. Remove the line if this preload list is revisited.

### P-1: Missing implementation doc (PROCESS)

No implementation document exists in `agent-output/implementation/` for Plan 004. This is a process gap per the Implementer workflow. It does not affect code quality — all changes were reviewable via the plan and git diff.

---

## Acceptance Criteria

| Criteria                                     | Status                                                         |
| -------------------------------------------- | -------------------------------------------------------------- |
| `PreloadComponents` fully removed            | ✅                                                              |
| All 9 chunks covered by new `import()` calls | ✅                                                              |
| No hidden DOM elements for preloading        | ✅                                                              |
| No module-level preload calls                | ✅                                                              |
| Critical chunks load immediately on mount    | ✅                                                              |
| Hover triggers Picker preload                | ✅ Desktop; Mobile via route fallback                           |
| setTimeout hack removed                      | ✅                                                              |
| Single lazy boundary in EmojiPicker          | ✅                                                              |
| `pnpm build` succeeds                        | ✅ (7.7s)                                                       |
| `pnpm lint` passes                           | ⚠️ Pre-existing ESLint circular ref (not caused by this change) |

---

## Good Patterns

- **Minimal footprint** — 3 files changed for significant UX improvement
- **Correct API adaptation** — `onHoverStart` for react-aria `Button` vs native events for `AnchoredPopover.Trigger`
- **Idiomatic preloading** — bare `import()` inside `useEffect` with `requestIdleCallback`, no custom utilities
- **Clean barrel simplification** — `export { default } from './Root'` is maximally minimal

---

Handing off to qa agent for test execution.

**QA focus areas:**
1. Cold load: edit page loads without visible loading flashes
2. Emoji picker: hover → click → Picker renders instantly (no empty popover)
3. Network tab: confirm chunk preloads fire on mount + idle callback
4. Mobile: emoji picker works on touch (preload via route-level idle)
5. Throttled 3G: lazy components render `null` until ready, no cascading fallback