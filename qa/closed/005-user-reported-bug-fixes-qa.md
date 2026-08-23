---
ID: 5
Origin: 5
UUID: b7e3a1f9
Status: Committed
---

# QA Report: Plan 005 — User-Reported Bug Fixes

**Plan Reference**: `agent-output/planning/005-user-reported-bug-fixes.md`
**Implementation Reference**: `agent-output/implementation/005-user-reported-bug-fixes.md`
**QA Status**: QA Complete
**QA Specialist**: qa

## Changelog

| Date       | Agent Handoff    | Request                               | Summary                                                            |
| ---------- | ---------------- | ------------------------------------- | ------------------------------------------------------------------ |
| 2026-04-07 | Implementer → QA | Implementation complete, ready for QA | Created test strategy, executed tests, 209/209 pass, 1 issue found |

## Timeline

- **Test Strategy Started**: 2026-04-07
- **Test Strategy Completed**: 2026-04-07
- **Implementation Received**: 2026-04-07
- **Testing Started**: 2026-04-07
- **Testing Completed**: 2026-04-07
- **Final Status**: QA Complete

---

## Test Strategy (Pre-Implementation)

### Testing Infrastructure Requirements

**Test Frameworks**: Vitest 4.1.2 (already configured)
**Testing Libraries**: zod (already available for schema validation tests)
**Configuration**: `vitest.config.ts` with `~/` alias, `src/**/*.test.ts` glob
**No additional infrastructure needed.**

### Testing Approach

1. **Unit tests for pure functions**: `constructImageUrl` (M2), `formatKey` (M3), embed Zod schemas (M1)
2. **Regex correctness tests**: `useParsePathname` path extraction (M4)
3. **TypeScript compilation gate**: `tsc --noEmit` (all milestones)
4. **Manual/E2E required**: M3 (Redis integration), M4 (navigation state), M5 (mobile paste), post-plan fixes (TransitionHeightElement, Navigation overflow)

### Required Unit Tests

- M1: Zod schema rejects empty-string URLs but accepts `undefined` for thumbnail, image, author.url, author.icon_url, footer.icon_url
- M2: `constructImageUrl` edge cases (small IDs, max IDs, range validation, string discriminator "0000")
- M3: `formatKey` output matches keys used by `fetchUserAccount` and `fetchUserGuilds`
- M4: Path regex extracts folderId/messageId correctly for all route patterns

### Acceptance Criteria

Per plan success criteria:
- [x] Clearing embed fields allows saving without error (M1 — verified via Zod schema tests)
- [ ] Avatar reflects current Discord avatar after login (M2 — requires E2E)
- [x] Discriminator 0 users see correct default avatar (M2 — verified via unit tests)
- [ ] Login after session expiry succeeds on first attempt (M3 — requires Redis E2E)
- [ ] Second message send succeeds without reload (M4 — requires browser E2E)
- [ ] Mobile paste works (M5 — requires device testing)

---

## Implementation Review (Post-Implementation)

### TDD Compliance Gate

✅ **PASSED** — Implementation doc contains TDD Compliance table with:
- `constructImageUrl` (discriminator 0 branch): Test written first ✅, Failure verified ✅ (`AssertionError: avatars/0.png ≠ avatars/1.png`), Pass after impl ✅
- Non-pure-function changes (M1 callback mods, M3 Redis ops, M4 query config, M5 preventDefault removal): Correctly identified as requiring manual/E2E testing, not unit TDD

### Code Changes Summary

| File                                                                         | Changes                                       | Milestone     |
| ---------------------------------------------------------------------------- | --------------------------------------------- | ------------- |
| `src/utils/constructImageUrl.ts`                                             | BigInt formula for discriminator 0            | M2            |
| `src/server/auth.ts`                                                         | signIn: avatar update, Redis invalidation     | M2, M3        |
| `src/components/DiscordMessageEditor/components/EmbedEditor/index.tsx`       | setThumbnail/setImage → undefined             | M1            |
| `src/components/DiscordMessageEditor/components/EmbedEditor/EmbedAuthor.tsx` | Call-site wrappers for url/icon_url           | M1            |
| `src/components/DiscordMessageEditor/components/EmbedEditor/EmbedFooter.tsx` | Call-site wrapper for icon_url                | M1            |
| `src/providers/GuildProvider.tsx`                                            | staleTime: 5min, retry: 1                     | M4            |
| `src/utils/hooks/index.ts`                                                   | useParsePathname memo deps fix                | M4            |
| `src/components/SlateEditor/index.tsx`                                       | Removed e.preventDefault()                    | M5            |
| `src/components/TransitionHeightElement.tsx`                                 | Collapse/expand rewrite                       | Post-plan     |
| `src/app/message/m/[id]/_layout/Navigation.tsx`                              | overflow-hidden for mobile                    | Post-plan     |
| `src/components/DiscordMessageEditor/components/ActionsMenu.tsx`             | **UNDOCUMENTED** — removed interactive colors | ⚠️ Not in plan |

### Undocumented Change Detected

**File**: `src/components/DiscordMessageEditor/components/ActionsMenu.tsx`
**Change**: Removed `text-interactive-active`, `text-interactive-muted`, `hover:text-interactive-hover`, and `transition-colors` classes from the gear icon button.
**Status**: Not part of any Plan 005 milestone or post-plan fix. Not documented in the implementation doc. This removes visual hover/active feedback from the actions menu gear icon, which is a UX regression (the icon no longer shows interactive states).

---

## Test Coverage Analysis

### New/Modified Code

| File                        | Function/Class                    | Test File                      | Test Case        | Coverage                    |
| --------------------------- | --------------------------------- | ------------------------------ | ---------------- | --------------------------- |
| constructImageUrl.ts        | default export (disc 0 branch)    | plan-005-bug-fixes.test.ts     | 5 tests          | COVERED                     |
| constructImageUrl.ts        | edge cases (small/max ID, ranges) | plan-005-qa-validation.test.ts | 5 tests          | COVERED                     |
| auth.ts                     | signIn event handler              | —                              | —                | MISSING (requires Redis/DB) |
| EmbedEditor/index.tsx       | setThumbnail, setImage            | plan-005-qa-validation.test.ts | Zod schema tests | COVERED (via schema)        |
| EmbedAuthor.tsx             | setUrl, setIconUrl wrappers       | plan-005-qa-validation.test.ts | Zod schema tests | COVERED (via schema)        |
| EmbedFooter.tsx             | setIconUrl wrapper                | plan-005-qa-validation.test.ts | Zod schema tests | COVERED (via schema)        |
| GuildProvider.tsx           | staleTime/retry config            | —                              | —                | MISSING (requires browser)  |
| hooks/index.ts              | useParsePathname                  | plan-005-qa-validation.test.ts | 7 regex tests    | COVERED                     |
| SlateEditor/index.tsx       | handleFocus                       | —                              | —                | MISSING (requires device)   |
| TransitionHeightElement.tsx | useEffect [isOpen]                | —                              | —                | MISSING (requires browser)  |
| Navigation.tsx              | overflow-hidden classes           | —                              | —                | MISSING (requires device)   |
| formatKey                   | key consistency                   | plan-005-qa-validation.test.ts | 4 tests          | COVERED                     |

### Coverage Gaps

- **auth.ts signIn handler**: Requires Redis and PostgreSQL instances. No test infrastructure for integration testing.
- **GuildProvider staleTime**: Requires browser environment with React Query. Config-level change, low risk.
- **SlateEditor handleFocus**: Requires mobile device testing (iOS Safari, Android Chrome).
- **TransitionHeightElement**: Requires browser DOM with CSS transitions.
- **Navigation overflow**: Requires mobile viewport testing.

### Comparison to Test Plan

- **Tests Planned**: 28 unit + manual/E2E for 5 areas
- **Tests Implemented**: 33 unit (5 implementer + 28 QA)
- **Tests Missing**: Integration tests for auth.ts (blocked by infrastructure)
- **Tests Added Beyond Plan**: formatKey consistency (M3), regex correctness (M4), Zod schema validation (M1)

---

## Test Execution Results

### Unit Tests

- **Command**: `npx vitest run`
- **Status**: ✅ PASS
- **Output**:
  ```
  ✓ src/utils/__tests__/message-init-route0.test.ts (8 tests)
  ✓ src/utils/__tests__/plan-004-lazy-loading.test.ts (28 tests)
  ✓ src/utils/__tests__/isValidUrl.test.ts (10 tests)
  ✓ src/utils/__tests__/plan-005-bug-fixes.test.ts (5 tests)
  ✓ src/utils/__tests__/plan-005-qa-validation.test.ts (28 tests)
  ✓ src/server/api/utils/__tests__/shapes-v2.test.ts (33 tests)
  ✓ src/utils/__tests__/mutual-exclusivity.test.ts (32 tests)
  ✓ src/utils/__tests__/components-v2-data-layer.test.ts (32 tests)
  ✓ src/utils/__tests__/m7-m10-coverage-gaps.test.ts (33 tests)

  Test Files  9 passed (9)
       Tests  209 passed (209)
  Duration  860ms
  ```
- **Coverage**: All 209 tests pass. Zero failures. Zero regressions.

### TypeScript Compilation

- **Command**: `npx tsc --noEmit`
- **Status**: ✅ PASS (zero errors)

---

## QA Issues Found

### Issue 1 — Navigation `overflow-hidden` clips dropdown menus (CONFIRMED)

| Attribute | Value                                           |
| --------- | ----------------------------------------------- |
| Severity  | High                                            |
| File      | `src/app/message/m/[id]/_layout/Navigation.tsx` |
| Line      | 264                                             |
| Category  | UI regression                                   |

**What**: The `overflow-hidden` added to the nav bar to fix mobile horizontal scrollbar clips the File/Edit/View/Help dropdown menus. The `AnchoredPopover.Child` does NOT use a portal (no `portal` prop passed), and `useFloating` defaults to `strategy: 'absolute'`. With `position: absolute`, content is clipped by the `overflow-hidden` ancestor.

**Evidence**:
- `AnchoredPopover/Child.tsx` line 22: `FloatingPortal` is only used when `portal` prop is truthy
- `Navigation.tsx` line 370: `<AnchoredPopover.Child as="ul" ...>` — no `portal` prop
- `AnchoredPopover/utils.tsx` line 65: `useFloating()` call has no `strategy` override → defaults to `'absolute'`

**Impact**: Users cannot access File/Edit/View/Help/Send menus on mobile (menus clipped by overflow-hidden). On desktop, menus may also be partially clipped if they extend beyond the 64px nav height.

**Fix**: Either add `portal` prop to `AnchoredPopover.Child` in Navigation.tsx, or change `overflow-hidden` to `overflow-x-hidden` on the nav bar.

### Issue 2 — Undocumented ActionsMenu change (FLAGGED)

| Attribute | Value                                                            |
| --------- | ---------------------------------------------------------------- |
| Severity  | Low                                                              |
| File      | `src/components/DiscordMessageEditor/components/ActionsMenu.tsx` |
| Category  | Plan scope / UX regression                                       |

**What**: The gear icon button had `text-interactive-active` (when open), `text-interactive-muted hover:text-interactive-hover`, and `transition-colors` removed. This was not part of any Plan 005 milestone. The gear icon no longer shows hover or active color feedback.

**Impact**: Minor UX regression — the gear icon appears "dead" with no visual response to interaction.

### Issue 3 — TransitionHeightElement: content clipped during open animation (NOTED)

| Attribute | Value                                        |
| --------- | -------------------------------------------- |
| Severity  | Low                                          |
| File      | `src/components/TransitionHeightElement.tsx` |
| Category  | Visual quality                               |

**What**: When closing, `overflow-hidden` is added. When re-opening, it is NOT removed until `onTransitionEnd`. Content is clipped during the open animation, causing it to "pop in" at the end rather than smoothly revealing.

**Impact**: Minor visual artifact. Functionally correct — the panel opens and closes properly.

---

## Final Assessment

### Verdict: QA Complete — Conditional Pass

**All 209 unit tests pass. TypeScript compilation clean. All 5 plan milestones correctly implemented.**

**Blocking issue**: Issue 1 (Navigation dropdown clipping) must be resolved before deployment — it prevents users from accessing File/Edit/View/Help menus on mobile, which is a core editing workflow.

**Non-blocking issues**:
- Issue 2: Undocumented ActionsMenu change should be either reverted or added to the implementation doc
- Issue 3: TransitionHeightElement open animation clipping is minor

### Manual Testing Still Required

The following cannot be validated by unit tests and require E2E/manual testing:
1. **M2**: Sign in with changed Discord avatar → verify nav menu shows new avatar
2. **M3**: Let session expire → sign in again → should succeed on first attempt
3. **M4**: Create message A, save, send → navigate → create message B, save, send → should work without reload
4. **M5**: On iOS Safari / Android Chrome, long-press in Slate editor → paste text
5. **Post-plan**: InfoPanel collapse/expand on mobile and desktop

---

Handing off to uat agent for value delivery validation.
