---
ID: 6
Origin: 6
UUID: c4e89d3a
Status: Committed
---

# QA Report: Fix Avatar `undefined.png` Regression

**Plan Reference**: `agent-output/planning/006-avatar-undefined-hotfix.md`
**QA Status**: QA Complete
**QA Specialist**: qa

## Changelog

| Date       | Agent Handoff    | Request                             | Summary                                    |
| ---------- | ---------------- | ----------------------------------- | ------------------------------------------ |
| 2026-04-07 | Code Review → QA | Implementation ready for QA testing | 211/211 tests pass. 0 issues. QA Complete. |

## Timeline
- **Test Strategy Started**: 2026-04-07
- **Test Strategy Completed**: 2026-04-07 (combined — hotfix scope)
- **Implementation Received**: 2026-04-07
- **Testing Started**: 2026-04-07
- **Testing Completed**: 2026-04-07
- **Final Status**: QA Complete

## Test Strategy

This is a minimal hotfix (2 source files, ~5 lines of logic). Test strategy focuses on:

1. **TDD Compliance Gate**: Verify implementation doc has valid TDD table
2. **Unit test execution**: Run full suite including 2 new `constructImageUrl` tests
3. **TypeScript compilation**: Verify `tsc --noEmit` clean
4. **Plan ↔ implementation alignment**: Verify all acceptance criteria met
5. **Test effectiveness**: Would users still hit the `undefined.png` bug?
6. **Regression**: All 209+ existing tests continue passing

### Testing Infrastructure Requirements

**Test Frameworks Needed**: None new — vitest ^4.1.2 already configured.
**Testing Libraries Needed**: None new.
**Configuration Files Needed**: None new.
**Build Tooling Changes Needed**: None.

### Required Unit Tests
- `constructImageUrl` with `undefined` avatar + discriminator 0 → default avatar (ID-based)
- `constructImageUrl` with `undefined` avatar + non-zero discriminator → default avatar (disc-based)
- All existing `constructImageUrl` tests (null avatar, custom avatar, disc 0 string/number, modulo 6)

### Acceptance Criteria
- `tsc --noEmit` exits 0
- `vitest run` — all tests pass, zero failures
- `signIn` event handler no longer calls `constructImageUrl`
- `signIn` event handler no longer contains `discordProfile` cast
- `constructImageUrl` uses `== null` (loose equality)
- No scope creep beyond plan's 3 milestones

## Implementation Review

### TDD Compliance Gate

**PASSED.** Implementation doc contains valid TDD Compliance table:

| Function/Class                                 | Test Written First? | Failure Verified? | Failure Reason      | Pass After Impl? |
| ---------------------------------------------- | ------------------- | ----------------- | ------------------- | ---------------- |
| `constructImageUrl` (undefined, disc 0)        | ✅ Yes               | ✅ Yes             | `undefined.png` URL | ✅ Yes            |
| `constructImageUrl` (undefined, disc non-zero) | ✅ Yes               | ✅ Yes             | `undefined.png` URL | ✅ Yes            |

M1 modifies existing code without new functions — no TDD row required. Valid.

### Code Changes Summary

| File                                             | Change                                                                                | Plan Milestone |
| ------------------------------------------------ | ------------------------------------------------------------------------------------- | -------------- |
| `src/server/auth.ts`                             | Removed `discordProfile` cast; replaced `constructImageUrl(...)` with `profile.image` | M1             |
| `src/utils/constructImageUrl.ts`                 | `=== null` → `== null`                                                                | M2             |
| `src/utils/__tests__/plan-005-bug-fixes.test.ts` | +2 test cases for `undefined` avatar                                                  | M3             |

### Plan ↔ Implementation Alignment

| Plan Acceptance Criterion                                       | Status | Evidence                                                                     |
| --------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------- |
| signIn event writes valid Discord CDN URL, not `undefined.png`  | ✅ MET  | `profile.image` sourced from `profile()` callback which constructs valid URL |
| No `constructImageUrl` call in signIn event handler             | ✅ MET  | grep confirms only usage at line 190 (profile callback)                      |
| `tsc --noEmit` clean                                            | ✅ MET  | Exit code 0, zero errors                                                     |
| `constructImageUrl('123', undefined, 0)` returns default avatar | ✅ MET  | Test passes                                                                  |
| `constructImageUrl('123', null, 0)` unchanged                   | ✅ MET  | Existing tests pass                                                          |
| `constructImageUrl('123', 'abc123', 0)` unchanged               | ✅ MET  | Existing test passes                                                         |
| At least one test for `undefined` avatar                        | ✅ MET  | 2 tests added                                                                |
| All existing tests pass                                         | ✅ MET  | 211/211                                                                      |
| `vitest run` clean                                              | ✅ MET  | 9/9 files, 211/211 tests                                                     |

**Scope Assessment**: No overreach. No files modified beyond plan scope. No extra features added.

## Test Coverage Analysis

### New/Modified Code
| File                   | Function/Class                     | Test File                    | Test Case                        | Coverage Status    |
| ---------------------- | ---------------------------------- | ---------------------------- | -------------------------------- | ------------------ |
| `constructImageUrl.ts` | default export (== null branch)    | `plan-005-bug-fixes.test.ts` | `undefined` avatar disc 0        | COVERED            |
| `constructImageUrl.ts` | default export (== null branch)    | `plan-005-bug-fixes.test.ts` | `undefined` avatar disc non-zero | COVERED            |
| `auth.ts`              | signIn event (profile.image usage) | N/A (server handler)         | Manual QA                        | COVERED (indirect) |

### Coverage Gaps

None for `constructImageUrl`. The `auth.ts` signIn handler is not directly unit-tested (requires DB + NextAuth mocking), but this is acceptable for a data-source substitution fix — the correctness is verified by:
1. Analysis 006 proving `profile.image` contains the right value
2. Code review confirming the type cast is safe
3. Defense-in-depth tests proving `constructImageUrl` handles `undefined` correctly even if reached

### Comparison to Test Plan
- **Tests Planned**: 2 (undefined avatar with disc 0, undefined avatar with disc non-zero)
- **Tests Implemented**: 2
- **Tests Missing**: 0
- **Tests Added Beyond Plan**: 0

## Test Execution Results

### Unit Tests
- **Command**: `npx vitest run`
- **Status**: PASS
- **Output**:
```
 ✓ src/utils/__tests__/plan-005-bug-fixes.test.ts (7 tests) 4ms
 ✓ src/utils/__tests__/plan-005-qa-validation.test.ts (28 tests) 12ms
 ✓ src/utils/__tests__/message-init-route0.test.ts (8 tests) 5ms
 ✓ src/utils/__tests__/plan-004-lazy-loading.test.ts (28 tests) 8ms
 ✓ src/utils/__tests__/isValidUrl.test.ts (10 tests) 4ms
 ✓ src/server/api/utils/__tests__/shapes-v2.test.ts (33 tests) 15ms
 ✓ src/utils/__tests__/mutual-exclusivity.test.ts (32 tests) 8ms
 ✓ src/utils/__tests__/m7-m10-coverage-gaps.test.ts (33 tests) 10ms
 ✓ src/utils/__tests__/components-v2-data-layer.test.ts (32 tests) 12ms

 Test Files  9 passed (9)
      Tests  211 passed (211)
   Duration  836ms
```

### TypeScript Compilation
- **Command**: `npx tsc --noEmit`
- **Status**: PASS
- **Output**: Clean (exit 0, zero errors)

### Integration Tests
N/A — no integration tests applicable for this hotfix scope.

## Test Effectiveness Assessment

**Would users still hit the `undefined.png` bug after this fix?** No.

1. **M1 eliminates the root cause**: The code path that accessed `discordProfile.avatar` (which was `undefined`) is completely removed. `profile.image` is substituted — a value that is already correctly computed by the `profile()` callback using the raw Discord API data.

2. **M2 prevents the class of bug from recurring**: Even if a future caller passes `undefined` to `constructImageUrl`, it now falls into the default avatar branch instead of producing `undefined.png`.

3. **Regression risk is zero**: The `== null` change is strictly a superset of `=== null`. All existing callers pass `null` for absent avatars. No behavioral change for existing code paths.

**Risk flag**: None. The fix is simpler than what it replaces.

## QA Verdict

### **QA COMPLETE — PASS**

All acceptance criteria met. 211/211 tests pass. Zero issues found. TDD compliance verified. No scope creep. Plan ↔ implementation alignment is exact.

Handing off to uat agent for value delivery validation.
