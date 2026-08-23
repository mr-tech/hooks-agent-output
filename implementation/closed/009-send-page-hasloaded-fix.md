---
ID: 9
Origin: 9
UUID: b7e3a1f2
Status: Committed
---

# Implementation — Plan 009: Fix Send Page Loading Dots After Folder Navigation

## Plan Reference

`agent-output/planning/009-send-page-hasloaded-fix.md`

## Date

2026-04-12

## Changelog

| Date       | Handoff      | Request            | Summary                                         |
| ---------- | ------------ | ------------------ | ----------------------------------------------- |
| 2026-04-12 | From Planner | Implement Plan 009 | M1 + M2 complete. All tests pass. Ready for QA. |

## Implementation Summary

Fixed the `hasLoaded` state machine gap in `GuildProvider` that caused permanent loading dots on the send page after visiting a folder page for the same server.

**Root cause**: `useUpdateEffect([paramGuildId])` called `unsetHasLoaded()` unconditionally when `paramGuildId` changed. When navigating to a folder page for the same server, `setGuildId()` was a no-op (already that value), no query fired, `guildStatus` didn't transition, and `hasLoaded` was permanently stuck at `false`.

**Fix**: Added a `useRef(guildId)` that tracks the current `guildId` via a `useEffect([guildId])`. The `useUpdateEffect([paramGuildId])` callback now only calls `unsetHasLoaded()` when `paramGuildId !== guildIdRef.current`. This prevents the stuck state while preserving loading behavior for genuine server changes.

**Stale closure mitigation**: Used a ref (`guildIdRef`) updated in a dedicated `useEffect([guildId])` rather than reading `guildId` directly from the closure. This ensures the guard always reads the current value, even if `MessageProvider.setGuildId()` has updated state in a previous render cycle. This addresses critique finding M1.

## Milestones Completed

- [x] M1: Fix `hasLoaded` state machine in GuildProvider
- [x] M2: Remove all diagnostic logging (5 files, 10 statements)
- [x] M3: N/A (no versioning)

## Files Modified

| Path                                      | Changes                                                                                                                     |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `src/providers/GuildProvider.tsx`         | Added `useRef` import, `guildIdRef` ref + sync effect, guard around `unsetHasLoaded()`. Removed 4 `console.log` statements. |
| `src/providers/MessageProvider/index.tsx` | Removed 2 `console.log` statements                                                                                          |
| `src/app/message/m/[id]/send/page.tsx`    | Removed 2 `console.log`/`console.warn` statements                                                                           |
| `src/utils/hooks/index.ts`                | Removed 1 `console.log` statement                                                                                           |
| `src/server/auth.ts`                      | Removed `debug: true` and entire `logger: { ... }` block. Restored `// debug: true,` comment.                               |

## Files Created

None.

## Code Quality Validation

- [x] `tsc --noEmit` — 0 errors
- [x] Linter — no new warnings introduced
- [x] Test suite — 281/281 pass (all existing tests)
- [x] No diagnostic `console.log`/`console.warn` with `[SendPage]`, `[GuildProvider]`, `[MessageProvider]`, or `[useParsePathname]` remain
- [x] NextAuth `debug` mode disabled (commented out)
- [x] NextAuth custom `logger` block fully removed

## Value Statement Validation

**Original**: "As a Hooks.gg user, I want the send page to load reliably after navigating through my server's message list, so that I can send messages without being forced to hard-refresh the page."

**Implementation delivers**: The guard prevents `hasLoaded` from being stuck at `false` when navigating between folder and send pages for the same server. The `guildStatus` recovery path is unchanged — genuine server changes still show loading state correctly.

## TDD Compliance

No new functions or classes were created. The fix modifies the behavioral logic inside an existing React effect callback (`useValue()` in `GuildProvider`). The project has no React hook testing infrastructure (vitest is configured with `environment: 'node'`, no jsdom). All 281 existing tests pass.

| Modification                   | Test Coverage                                           | Rationale                                                                                                                             |
| ------------------------------ | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `guildIdRef` + guard in effect | Existing 281 tests (no behavior change in tested paths) | No new functions/classes. Guard is a behavioral modification to existing code. Manual regression testing per plan's Testing Strategy. |

## Test Coverage

- **Unit/Integration**: 281/281 pass (vitest)
- **Manual regression**: Pending QA — 3 navigation sequences from Success Criteria

## Test Execution Results

```
$ npx vitest run
 ✓ src/utils/__tests__/message-init-route0.test.ts (8 tests) 5ms
 ✓ src/utils/__tests__/plan-004-lazy-loading.test.ts (28 tests) 8ms
 ✓ src/utils/__tests__/plan-005-bug-fixes.test.ts (7 tests) 4ms
 ✓ src/utils/__tests__/isValidUrl.test.ts (10 tests) 4ms
 ✓ src/utils/__tests__/plan-005-qa-validation.test.ts (28 tests) 10ms
 ✓ src/server/api/utils/__tests__/shapes-v2.test.ts (49 tests) 18ms
 ✓ src/utils/__tests__/sub-component-actions.test.ts (14 tests) 8ms
 ✓ src/utils/__tests__/m7-m10-coverage-gaps.test.ts (33 tests) 10ms
 ✓ src/utils/__tests__/008-qa-validation.test.ts (23 tests) 12ms
 ✓ src/utils/__tests__/components-v2-data-layer.test.ts (32 tests) 12ms
 ✓ src/utils/__tests__/mutual-exclusivity.test.ts (49 tests) 12ms

 Test Files  11 passed (11)
      Tests  281 passed (281)
   Duration  865ms
```

```
$ npx tsc --noEmit
(no output — 0 errors)
```

## Outstanding Items

- **Manual regression testing**: The 3 navigation sequences from Success Criteria need manual verification (QA responsibility)
- No deferred work, no known issues, no failures

## Next Steps

1. QA validation — manual testing of the 3 success criteria navigation sequences
2. UAT validation after QA passes
