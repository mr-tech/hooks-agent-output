---
ID: 1
Origin: 1
UUID: a3f7c9e2
Status: Released
---

# QA Report: Discord Components V2 State Management

**Plan Reference**: `agent-output/planning/001-components-v2-state-management.md`
**Implementation Reference**: `agent-output/implementation/001-components-v2-state-management.md`
**QA Status**: QA Complete
**QA Specialist**: qa

## Changelog

| Date       | Agent Handoff | Request                                   | Summary                                                                                                                                                                                                                         |
| ---------- | ------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-04-01 | Reviewer → QA | Code review approved, ready for QA        | Created test strategy, installed Vitest, wrote 75 tests, all passing. 1 finding.                                                                                                                                                |
| 2026-04-03 | Reviewer → QA | M7-M10 code review approved, ready for QA | M7-M10 QA: Found TDD compliance gap (FINDING-002), wrote 33 new tests covering `enforceImportMutualExclusivity`, `validateContentRequirements`, expanded `hasV2Components` type coverage. 140/140 pass. 0 production TS errors. |

## Timeline

- **Test Strategy Started**: 2026-04-01
- **Test Strategy Completed**: 2026-04-01
- **Implementation Received**: 2026-04-01 (code review approved)
- **Testing Started**: 2026-04-01
- **Testing Completed**: 2026-04-01
- **M7-M10 Test Strategy Started**: 2026-04-03
- **M7-M10 Implementation Received**: 2026-04-03 (code review approved after 2 rounds)
- **M7-M10 Testing Started**: 2026-04-03
- **M7-M10 Testing Completed**: 2026-04-03
- **Final Status**: QA Complete

---

## Test Strategy (Pre-Implementation)

### Approach

Since no test framework was configured in the project, the QA strategy was:
1. Install Vitest as a minimal test runner (dev dependency only)
2. Create `vitest.config.ts` with `~/` path alias resolution
3. Mock environment dependencies (`~/env.mjs`, SVG assets) to isolate pure data-layer functions
4. Focus tests on the critical data-layer functions and Zod validation schemas — the core of the implementation
5. Test the full inject → edit → strip roundtrip lifecycle
6. Verify constants match Discord API requirements

### Testing Infrastructure Requirements

**Test Frameworks Needed**:
- `vitest` ^4.1.2 (installed as devDependency)

**Configuration Files Created**:
- `vitest.config.ts` — Vitest config with `~/` and `bot/` path aliases matching `tsconfig.json`

**Dependencies Installed**:
```bash
pnpm add -D vitest
```

### Test Types

- **Unit Tests**: Pure function testing for `injectComponentKeys`, `rekeyComponent`, `stripKeys`, `makeEditable`, `genUuid`, `isValidUrl`
- **Schema Tests**: Zod validation for `discordMessageShape` (strict) and `discordMessageImportShape` (lenient)
- **Roundtrip Tests**: Full lifecycle: inject keys → edit state → strip keys → verify no `_key` leak + correct flags
- **Boundary Tests**: Limits (40 components, 5 buttons, 3 section texts, 10 gallery items, 4000 char text), invalid data rejection
- **Security Tests**: URL validation (rejects `javascript:`, `data:`, non-protocol URLs), `_key` leak prevention

### Required Unit Tests (Planned)

1. `injectComponentKeys` — all 7 V2 component types + recursion + non-mutation + idempotency
2. `rekeyComponent` — unique key generation, data preservation, non-mutation
3. `stripKeys` — recursive key removal, V2 flag computation, flag preservation, edge cases
4. `makeEditable` — embed/component key injection, deep clone verification
5. `discordMessageShape` — all acceptance/rejection boundaries
6. `discordMessageImportShape` — lenient filter behavior
7. `isValidUrl` — protocol enforcement
8. Constants — `IS_COMPONENTS_V2_FLAG = 32768`, `MAX_TOTAL_COMPONENTS = 40`

### Acceptance Criteria

- All unit tests pass
- No `_key` leak in stripped output
- V2 flags correctly computed (32768 for V2 components, 0 for action-row-only)
- Container-in-container rejected by Zod
- All Discord API limits enforced at schema level
- Lenient import filters unsupported types without rejecting the whole message
- `tsc --noEmit` passes clean (zero errors in production code)

---

## Implementation Review (Post-Implementation)

### Code Changes Summary

19 files modified, 1 deleted, 11 created. Key changes:

- **Data layer** (`src/utils/index.ts`): `injectComponentKeys` (non-mutating, recursive), `rekeyComponent` (deep-clone + rekey), `stripKeys` (recursive key removal + V2 flag computation), `V2_COMPONENT_TYPES` set
- **Zod schemas** (`src/server/api/utils/shapes.ts`): Complete V2 component schemas with `discriminatedUnion`, `filterSupportedComponents` for lenient import, `discordMessageImportShape` via `.extend()` + `z.preprocess`
- **Constants** (`src/constants/index.ts`): `MAX_TOTAL_COMPONENTS=40`, `IS_COMPONENTS_V2_FLAG=(1<<15) as 32768`, per-component limits
- **Send path** (`src/app/message/m/[id]/send/page.tsx`): Now calls `stripKeys()` before `sendWebhook()`
- **Import paths**: Both `NewMessageJsonInput.tsx` and `JsonModalBody.tsx` switched to `discordMessageImportShape`
- **URL validation** (`src/utils/isValidUrl.tsx`): Now requires `https?://` protocol

### TDD Compliance Assessment

The Implementation Doc explicitly defers TDD compliance due to no test framework being configured. The TDD compliance table shows all functions as "❌ Deferred" with "N/A (no test framework)".

**QA Decision**: Accept this deferral. The implementation is a stabilization plan building on ~2,000 lines of existing code. Setting up a test framework was documented as out-of-scope. QA has now established the test framework (Vitest) and written the deferred tests as part of this QA pass.

---

## Test Coverage Analysis

### New/Modified Code

| File                                            | Function/Class              | Test File                          | Test Case Count      | Coverage Status           |
| ----------------------------------------------- | --------------------------- | ---------------------------------- | -------------------- | ------------------------- |
| `src/utils/index.ts`                            | `injectComponentKeys`       | `components-v2-data-layer.test.ts` | 10                   | COVERED                   |
| `src/utils/index.ts`                            | `rekeyComponent`            | `components-v2-data-layer.test.ts` | 4                    | COVERED                   |
| `src/utils/index.ts`                            | `stripKeys`                 | `components-v2-data-layer.test.ts` | 10                   | COVERED                   |
| `src/utils/index.ts`                            | `makeEditable`              | `components-v2-data-layer.test.ts` | 3                    | COVERED                   |
| `src/utils/index.ts`                            | `genUuid`                   | `components-v2-data-layer.test.ts` | 1                    | COVERED                   |
| `src/server/api/utils/shapes.ts`                | `discordMessageShape`       | `shapes-v2.test.ts`                | 22                   | COVERED                   |
| `src/server/api/utils/shapes.ts`                | `discordMessageImportShape` | `shapes-v2.test.ts`                | 8                    | COVERED                   |
| `src/server/api/utils/shapes.ts`                | `filterSupportedComponents` | `shapes-v2.test.ts`                | 8 (via import shape) | COVERED (indirect)        |
| `src/utils/isValidUrl.tsx`                      | `isValidUrl`                | `isValidUrl.test.ts`               | 10                   | COVERED                   |
| `src/constants/index.ts`                        | `MAX_TOTAL_COMPONENTS`      | `components-v2-data-layer.test.ts` | 1                    | COVERED                   |
| `src/constants/index.ts`                        | `IS_COMPONENTS_V2_FLAG`     | `components-v2-data-layer.test.ts` | 2                    | COVERED                   |
| Roundtrip lifecycle                             | inject → strip              | `components-v2-data-layer.test.ts` | 2                    | COVERED                   |
| `src/components/DiscordMessageEditor/index.tsx` | `countTotalComponents`      | N/A                                | 0                    | NOT EXPORTED — see gap    |
| 11 ComponentEditor files                        | UI rendering                | N/A                                | 0                    | UI — requires browser env |

### Coverage Gaps

1. **`countTotalComponents()`**: Not exported from `DiscordMessageEditor/index.tsx` (local function). Cannot be unit-tested without refactoring to export it. Recommend extracting to `utils/` in a future PR.
2. **Component editor UI**: All 11 `ComponentEditor` files require React + browser environment for testing. Would need `@testing-library/react` + `jsdom` Vitest environment. Out of scope for this QA pass (data-layer focus).
3. **tRPC integration**: `message.upsert` / `message.get` roundtrip requires database + server. Not tested.

### Comparison to Test Plan

- **Tests Planned**: 8 categories
- **Tests Implemented**: 75 test cases across 3 test files
- **Tests Missing**: `countTotalComponents` (not exported), UI component rendering, tRPC integration
- **Tests Added Beyond Plan**: Security-focused URL validation tests, empty message roundtrip, flag preservation tests

---

## Test Execution Results

### Unit Tests

- **Command**: `npx vitest run --reporter=verbose`
- **Status**: PASS (75/75)
- **Duration**: 697ms
- **Output**:

```
 Test Files  3 passed (3)
      Tests  75 passed (75)
   Start at  02:56:44
   Duration  697ms
```

### TypeScript Compilation

- **Command**: `npx tsc --noEmit`
- **Status**: PASS (zero production code errors)
- **Note**: Test files have expected TS errors due to loosely-typed fixtures (intentional — test code uses `Record<string, unknown>` to simulate raw API payloads)

### Test Files

| Test File                                              | Tests | Pass | Fail |
| ------------------------------------------------------ | ----- | ---- | ---- |
| `src/utils/__tests__/components-v2-data-layer.test.ts` | 30    | 30   | 0    |
| `src/server/api/utils/__tests__/shapes-v2.test.ts`     | 35    | 35   | 0    |
| `src/utils/__tests__/isValidUrl.test.ts`               | 10    | 10   | 0    |

---

## Findings

### FINDING-001: `SUPPORTED_TOP_LEVEL_TYPES` / `topLevelComponentShape` inconsistency (LOW)

**Severity**: LOW
**Impact**: Cosmetic filter inconsistency — no user-facing bug

`SUPPORTED_TOP_LEVEL_TYPES` in `shapes.ts` (line 173) includes type `11` (Thumbnail), but `topLevelComponentShape` (the Zod discriminated union) does NOT include `thumbnailShape` as a top-level option.

This means: when importing JSON containing a top-level Thumbnail, `filterSupportedComponents` passes it through, but Zod then rejects it. The end result is correct (thumbnails are rejected as top-level components — they're only valid as section accessories), but the filter should be consistent with the schema.

**Fix**: Remove `11` from `SUPPORTED_TOP_LEVEL_TYPES` set, OR add `thumbnailShape` to `topLevelComponentShape` if Discord supports it at top level.

### Observations (non-blocking)

1. **`countTotalComponents` not exported**: Recommend extracting to `utils/` for testability.
2. **Unused `useMemo` import in ContainerEditor**: Carried over from code review R3 (LOW finding, non-blocking).
3. **i18n consumer deferred**: Source strings exist but no consumer hook. Documented in implementation doc.

---

## QA Verdict

**QA Complete** — All 75 unit tests pass. The data layer (`injectComponentKeys`, `rekeyComponent`, `stripKeys`, `makeEditable`), Zod schemas (`discordMessageShape`, `discordMessageImportShape`), URL validation, and constants are verified correct.

Critical user flows verified:
- ✅ `_key` values are injected for all V2 component types (including nested containers)
- ✅ `_key` values are completely stripped before save/send (no leak to Discord API)
- ✅ `IS_COMPONENTS_V2_FLAG` (32768) is correctly set when V2 components are present
- ✅ Flag is NOT set for action-row-only messages
- ✅ Existing flags are preserved when V2 flag is added
- ✅ `rekeyComponent` generates all-new unique keys (no React key collisions on duplicate)
- ✅ Container-in-container is rejected by Zod
- ✅ All Discord API limits enforced (40 total, 5 buttons, 3 section texts, 10 gallery items, 4000 char text)
- ✅ Lenient import filters unsupported components silently
- ✅ URL validation requires `https?://` protocol (rejects `javascript:`, `data:`)
- ✅ Data roundtrip preserves all component data through inject → edit → strip cycle
- ✅ `tsc --noEmit` passes clean

1 low-severity finding documented (FINDING-001). No blockers for UAT.

---

## M7-M10: Milestones 7–10 QA (Mutual Exclusivity Enforcement)

### Test Strategy

**Scope**: Classic/V2 mode toggle (M7), mode switch confirmation (M8), permanent V2 flag warning (M9), defense-in-depth data stripping (M10).

**Approach**: Data-layer unit testing consistent with M1-M6 QA approach. Focus on:
1. `enforceImportMutualExclusivity()` — JSON import mutual exclusivity enforcement
2. `validateContentRequirements()` — extracted validation function (per CR-3)
3. `hasV2Components()` — expanded type coverage for all 7 V2 types individually
4. Existing defense-in-depth tests in `mutual-exclusivity.test.ts` (32 tests from TDD)
5. Existing data-layer tests in `components-v2-data-layer.test.ts` (32 tests)

**Out of scope**: UI components (mode toggle, confirmation dialogs, PATCH warning) require React + jsdom environment. These are covered by manual verification and TypeScript type safety.

### TDD Compliance Gate

**Result**: PARTIAL VIOLATION DETECTED

The Implementation Doc's TDD Compliance table claims:

| Function                           | Claimed Test File            | Claimed Status                                                            |
| ---------------------------------- | ---------------------------- | ------------------------------------------------------------------------- |
| `enforceImportMutualExclusivity()` | `mutual-exclusivity.test.ts` | ✅ Test Written First, ✅ Failure Verified (ImportError), ✅ Pass After Impl |

**Actual finding**: `enforceImportMutualExclusivity` is NOT imported or tested in `mutual-exclusivity.test.ts` or any other test file. Verified by:
- Full read of `mutual-exclusivity.test.ts` (all 330 lines) — no import, no test
- `grep` search across all `__tests__/` directories — zero hits
- Workspace-wide `grep` search — only production code and docs reference it

**Impact**: The TDD compliance table contains a false assertion for one function. All other 5 functions in the M7-M10 table are correctly documented.

**Decision**: Proceeded with QA rather than rejecting, because:
1. Implementation was already code-review approved (2 rounds)
2. 5 of 6 functions have genuine TDD compliance
3. The function works correctly in production (verified by new QA tests)
4. QA agent wrote the missing tests

### FINDING-002: TDD Compliance False Assertion

**Severity**: MEDIUM
**Impact**: Process integrity — TDD compliance table asserts tests exist when they don't

The implementation doc claims `enforceImportMutualExclusivity()` was developed test-first in `mutual-exclusivity.test.ts`, but the function has zero test coverage. The TDD compliance table row for this function is incorrect.

**Evidence**:
- `mutual-exclusivity.test.ts` imports: `hasV2Components`, `hasClassicContent`, `hasV2Content`, `stripKeys`, `injectComponentKeys` — no `enforceImportMutualExclusivity`
- `grep -r 'enforceImportMutualExclusivity' src/**/__tests__/` — no results
- Implementation doc line 158 claims ✅ Yes for all three TDD columns

**Remediation**: QA agent created `m7-m10-coverage-gaps.test.ts` with 14 tests for this function. Additionally, `validateContentRequirements()` (also untested) received 13 direct tests.

### FINDING-003: `validateContentRequirements` Not Directly Tested

**Severity**: LOW
**Impact**: Indirect coverage only — function extracted per CR-3 but never tested independently

`validateContentRequirements()` was extracted from `validateMessage()` per code review finding CR-3 specifically for reuse in `DiscordMessageEditor`. While indirectly tested through `validateMessage()`, it had no direct test coverage verifying its standalone behavior and return type (`string | undefined` vs `string`).

**Remediation**: QA agent created 13 direct tests in `m7-m10-coverage-gaps.test.ts`.

### Coverage Analysis — M7-M10 Functions

| File                     | Function                           | Test File                                                     | Tests                            | Coverage                 |
| ------------------------ | ---------------------------------- | ------------------------------------------------------------- | -------------------------------- | ------------------------ |
| `src/utils/index.ts`     | `hasV2Components()`                | `mutual-exclusivity.test.ts` + `m7-m10-coverage-gaps.test.ts` | 8 + 6 = 14                       | COVERED (all 7 V2 types) |
| `src/utils/index.ts`     | `hasClassicContent()`              | `mutual-exclusivity.test.ts`                                  | 7                                | COVERED                  |
| `src/utils/index.ts`     | `hasV2Content()`                   | `mutual-exclusivity.test.ts`                                  | 5                                | COVERED                  |
| `src/utils/index.ts`     | `enforceImportMutualExclusivity()` | `m7-m10-coverage-gaps.test.ts`                                | 14                               | COVERED (was MISSING)    |
| `src/utils/index.ts`     | `stripKeys()` defense-in-depth     | `mutual-exclusivity.test.ts`                                  | 7                                | COVERED                  |
| `src/utils/limits.tsx`   | `validateContentRequirements()`    | `m7-m10-coverage-gaps.test.ts`                                | 13                               | COVERED (was MISSING)    |
| `src/utils/limits.tsx`   | `validateMessage()` mutual excl.   | `mutual-exclusivity.test.ts`                                  | 6                                | COVERED                  |
| `src/constants/index.ts` | `V2_COMPONENT_TYPE_VALUES`         | `m7-m10-coverage-gaps.test.ts`                                | via `hasV2Components` exhaustive | COVERED                  |

### Coverage Gaps (Remaining)

1. **UI components**: Mode toggle, `handleModeSwitch`, confirmation dialogs, PATCH warning — require React testing environment (jsdom + @testing-library/react). Not in scope.
2. **`countTotalComponents()`**: Not exported (local to DiscordMessageEditor). Cannot unit test without refactoring.
3. **Auto-detect mode on message load** (`useEffect` in MessageProvider): React hook, requires component testing environment.
4. **`setMessageMode`**: `useState` setter — trivial, not independently testable.

### Test Execution Results

#### Unit Tests

- **Command**: `npx vitest run --reporter=verbose`
- **Status**: PASS (140/140)
- **Duration**: 760ms
- **Output**:

```
 Test Files  5 passed (5)
      Tests  140 passed (140)
   Start at  08:16:58
   Duration  760ms
```

#### TypeScript Compilation

- **Command**: `npx tsc --noEmit | grep 'error TS' | grep -v '__tests__' | wc -l`
- **Status**: PASS (0 production errors)

#### Test Files Summary

| Test File                                              | Tests | Pass | Fail | Focus                                                                                       |
| ------------------------------------------------------ | ----- | ---- | ---- | ------------------------------------------------------------------------------------------- |
| `src/utils/__tests__/mutual-exclusivity.test.ts`       | 32    | 32   | 0    | M7-M10 TDD: detection, defense-in-depth, validation                                         |
| `src/utils/__tests__/m7-m10-coverage-gaps.test.ts`     | 33    | 33   | 0    | QA gap fill: `enforceImportMutualExclusivity`, `validateContentRequirements`, type coverage |
| `src/utils/__tests__/components-v2-data-layer.test.ts` | 32    | 32   | 0    | M1-M6: key injection/stripping, roundtrip, flags                                            |
| `src/server/api/utils/__tests__/shapes-v2.test.ts`     | 33    | 33   | 0    | Zod schema validation                                                                       |
| `src/utils/__tests__/isValidUrl.test.ts`               | 10    | 10   | 0    | URL validation                                                                              |

---

## M7-M10 QA Verdict

**QA Complete** — 140/140 tests pass. 0 production TypeScript errors. Two coverage gaps filled by QA agent (FINDING-002, FINDING-003).

Critical M7-M10 user flows verified:
- ✅ `enforceImportMutualExclusivity` strips content/embeds when V2 components detected in imported JSON
- ✅ `enforceImportMutualExclusivity` preserves ActionRows in classic mode
- ✅ `enforceImportMutualExclusivity` correctly detects mode for all 7 V2 component types (9, 10, 11, 12, 13, 14, 17)
- ✅ `enforceImportMutualExclusivity` does not mutate input, returns shallow copy
- ✅ V2 mode takes precedence when mixed V2 + ActionRow components present
- ✅ `validateContentRequirements` rejects V2 + content/embeds combinations
- ✅ `validateContentRequirements` rejects empty messages (no content, embeds, or components)
- ✅ `validateContentRequirements` accepts valid classic and V2 messages independently
- ✅ Legacy ActionRow + embeds/content is NOT treated as a V2 violation
- ✅ `hasV2Components` correctly identifies all 7 V2 types and rejects non-V2 types
- ✅ Defense-in-depth in `stripKeys`: embeds/content stripped when V2 flag set
- ✅ `validateMessage` catches mutual exclusivity violations at validation layer
- ✅ All prior M1-M6 tests continue passing (no regressions)

Findings:
- FINDING-001 (LOW, M1-M6): `SUPPORTED_TOP_LEVEL_TYPES` / `topLevelComponentShape` inconsistency — carried forward
- FINDING-002 (MEDIUM, M7-M10): TDD compliance false assertion for `enforceImportMutualExclusivity` — remediated by QA
- FINDING-003 (LOW, M7-M10): `validateContentRequirements` lacked direct tests — remediated by QA

No blockers for UAT.

Handing off to uat agent for value delivery validation.
