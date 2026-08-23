---
ID: 5
Origin: 5
UUID: b7e3a1f9
Status: Committed
---

# Implementation 005 — User-Reported Bug Fixes

## Plan Reference

[planning/005-user-reported-bug-fixes.md](../planning/005-user-reported-bug-fixes.md)

## Date

2026-04-07

## Changelog

| Date       | Handoff               | Request                | Summary                                                             |
| ---------- | --------------------- | ---------------------- | ------------------------------------------------------------------- |
| 2026-04-07 | Planner → Implementer | Initial implementation | All 5 milestones implemented, tests passing                         |
| 2026-04-07 | UAT → Implementer     | Address UAT findings   | Fixed nav dropdown clipping (portal), documented ActionsMenu change |

## Implementation Summary

Implemented all 5 bug fixes from Plan 005, addressing user-reported issues with embed saving, stale avatars, login loops, multi-message sending, and mobile paste. The implementation delivers the value statement by making authentication, message saving, embed editing, and mobile input work reliably.

### M1: Embed Field Clearing (Bug 3)
- Modified `setThumbnail` and `setImage` callbacks in `EmbedEditor/index.tsx` to produce `undefined` instead of `{ url: '' }` when clearing
- Wrapped `useStateSetter` return values at call sites in `EmbedAuthor.tsx` (url, icon_url) and `EmbedFooter.tsx` (icon_url) with empty-to-undefined guards
- Did NOT modify `useStateSetter` generically (12 usages across codebase)

### M2: Stale Avatar Fix (Bug 1)
- Updated `constructImageUrl` to use `(BigInt(id) >> 22n) % 6n` for migrated Discord users (discriminator 0) instead of `discriminator % 5`
- Added `Users.image` DB update in the `signIn` event handler for returning users
- Added `profile` and `user` to the signIn event destructuring

### M3: Login Loop Fix (Bug 4)
- Added direct Redis key deletion in the `signIn` event for `user-access-token:{userId}` and `user-guilds:{discordId}`
- Used `getClient().pipeline().del(...).del(...).exec()` instead of `redis.clearUser()` (which requires `sessionToken` not available in signIn events)
- Imported `getClient` from `~/utils/redis/client` and `formatKey` from `~/utils/redis/formatKey`

### M4: Multi-Message Send Fix (Bug 2)
- Replaced `staleTime: Infinity` with `5 * 60 * 1000` (5 minutes) on both `getGuild` and `getWebhooksAndChannels` queries in `GuildProvider.tsx`
- Changed `retry: false` to `retry: 1` to recover from transient failures
- Fixed `useParsePathname` memo dependency from `[Object.values(state)]` to `[folderId, messageId]` (housekeeping)

### M5: Mobile Paste Fix (Bug 5)
- Removed `e?.preventDefault()` from `handleFocus` in `SlateEditor/index.tsx`
- Retained the `focusRef.current?.focus()` call and 300ms setTimeout focus transfer — these still serve the touch-to-focus workflow

## Milestones Completed

- [x] M1: Fix Embed Field Clearing → Save Error
- [x] M2: Fix Stale User Avatar on Re-Login
- [x] M3: Fix Infinite Login Loop
- [x] M4: Fix Multi-Message Send Requiring Reload
- [x] M5: Fix Mobile Paste

## Files Modified

| Path                                                                         | Changes                                                                                                     | Lines |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----- |
| `src/utils/constructImageUrl.ts`                                             | BigInt formula for discriminator 0                                                                          | ~4    |
| `src/server/auth.ts`                                                         | signIn: avatar update, Redis invalidation, new imports                                                      | ~20   |
| `src/components/DiscordMessageEditor/components/EmbedEditor/index.tsx`       | setThumbnail/setImage → undefined on empty                                                                  | ~4    |
| `src/components/DiscordMessageEditor/components/EmbedEditor/EmbedAuthor.tsx` | Call-site wrappers for url/icon_url setters                                                                 | ~4    |
| `src/components/DiscordMessageEditor/components/EmbedEditor/EmbedFooter.tsx` | Call-site wrapper for icon_url setter                                                                       | ~2    |
| `src/providers/GuildProvider.tsx`                                            | staleTime: 5min, retry: 1                                                                                   | ~4    |
| `src/utils/hooks/index.ts`                                                   | useParsePathname memo deps fix                                                                              | ~1    |
| `src/components/SlateEditor/index.tsx`                                       | Removed e.preventDefault() from handleFocus                                                                 | ~1    |
| `src/components/TransitionHeightElement.tsx`                                 | Collapse/expand rewrite: replaced broken useUpdateEffect + useElementEventListener with useEffect([isOpen]) | ~40   |
| `src/app/message/m/[id]/_layout/Navigation.tsx`                              | overflow-hidden for mobile scrollbar fix; portal prop on AnchoredPopover.Child to prevent dropdown clipping | ~3    |
| `src/components/DiscordMessageEditor/components/ActionsMenu.tsx`             | Removed interactive color classes from gear icon (manual user change — see note below)                      | ~1    |

### Post-Plan Fixes

**TransitionHeightElement rewrite**: `useUpdateEffect` had broken deps `[_ref.current, wrapperRef.current]` (refs don't trigger re-renders) and `useElementEventListener` used a fragile `transitionstart` listener. Replaced with standard `useEffect([isOpen])` + `isFirstRender` ref for reliable collapse/expand on mobile and desktop.

**Navigation mobile overflow**: Non-wrapping flex children exceeded narrow viewports (iPhone 13 mini). Added `overflow-hidden` on nav bar, `min-w-0` on content divs, `shrink-0` on fixed-width elements. Added `portal` prop to `AnchoredPopover.Child` so dropdown menus render via `FloatingPortal` and are not clipped by the overflow container.

**ActionsMenu gear icon** (manual user change): The `text-interactive-muted`, `text-interactive-active`, `hover:text-interactive-hover`, and `transition-colors` classes were intentionally removed by the project owner. Rationale: the muted icon color had poor contrast, and the fade transition was a net negative for the UX. Not a plan milestone — documented here for traceability.

## Files Created

| Path                                             | Purpose                                              |
| ------------------------------------------------ | ---------------------------------------------------- |
| `src/utils/__tests__/plan-005-bug-fixes.test.ts` | Unit tests for constructImageUrl discriminator 0 fix |

## Code Quality Validation

- [x] `tsc --noEmit` passes (zero TypeScript errors)
- [x] No lint/diagnostic errors in any modified file
- [x] All 181 tests pass (including 5 new)
- [x] No regressions in existing test suites

## Value Statement Validation

**Original**: As a Hooks.gg user, I want authentication, message saving, embed editing, and mobile input to work reliably, so that I can create, save, and send Discord messages without encountering broken avatars, save failures, loading hangs, login loops, or paste issues on mobile.

**Implementation delivers**: All 5 bug areas addressed. Embed clearing now produces clean data (no empty-string URLs), avatars are refreshed on every login, Redis cache is invalidated to prevent login loops, guild data cache is bounded to prevent stale data during multi-message workflows, and mobile paste is unblocked by removing the blanket preventDefault.

## TDD Compliance

| Function/Class                               | Test File                    | Test Written First? | Failure Verified? | Failure Reason                                | Pass After Impl? |
| -------------------------------------------- | ---------------------------- | ------------------- | ----------------- | --------------------------------------------- | ---------------- |
| `constructImageUrl` (discriminator 0 branch) | `plan-005-bug-fixes.test.ts` | ✅ Yes               | ✅ Yes             | AssertionError: avatars/0.png ≠ avatars/1.png | ✅ Yes            |

Note: M1 (embed clearing), M2 (DB update), M3 (Redis invalidation), M4 (staleTime), and M5 (preventDefault removal) are modifications to existing callbacks/hooks with no new functions/classes created. They are covered by TypeScript compilation, existing test suite regression, and require manual/E2E testing per the plan's Testing Strategy. The `constructImageUrl` change is the only pure-function change suitable for unit TDD.

## Test Coverage

### Unit Tests (new)
- `constructImageUrl` with discriminator 0 (number) → BigInt-based avatar index
- `constructImageUrl` with discriminator "0" (string) → BigInt-based avatar index  
- `constructImageUrl` with non-zero discriminator → original modulo 5
- `constructImageUrl` with custom avatar → standard CDN URL
- `constructImageUrl` modulo 6 verification (not modulo 5)

### Unit Tests (existing, passing)
- 176 existing tests across 7 test files — all passing, no regressions

## Test Execution Results

```
Command: npx vitest run
Results: 8 files, 181 tests, 0 failures
Duration: 774ms
Coverage: All plan-005-bug-fixes tests pass; all existing tests pass
```

## Outstanding Items

### Requires Manual/E2E Testing
- **Bug 2 (M4)**: Navigate message A → send → message B → send without reload
- **Bug 5 (M5)**: Long-press paste on iOS Safari and Android Chrome
- **Bug 1 (M2)**: Change Discord avatar → re-login → verify nav menu shows new avatar
- **Bug 4 (M3)**: Let session expire → re-login → verify no infinite redirect

### Integration Testing (M3)
- Redis cache invalidation in signIn event requires Redis instance. Recommend verifying in staging/development environment with actual Redis.

### Notes
- M5 (mobile paste) is lowest confidence. If removing `preventDefault` causes mobile UX regressions (double-tap zoom, scroll jumping), the change can be independently reverted.
- The `focusRef` invisible element and 300ms timeout in SlateEditor are retained — they may still be needed for mobile focus behavior.

## Next Steps

1. QA review and validation
2. Manual testing of M2/M3/M4/M5 scenarios
3. UAT after QA passes
