---
ID: 7
Origin: 7
UUID: d4e8a1c3
Status: Released
---

# Implementation 007 — Components V2 Aggregate Displayable Text Limit

## Plan Reference

[007-components-v2-displayable-text-limit](../planning/007-components-v2-displayable-text-limit.md)

## Date

2026-04-09

## Changelog

| Date       | Handoff        | Request            | Summary                                                         |
| ---------- | -------------- | ------------------ | --------------------------------------------------------------- |
| 2026-04-09 | Planner → Impl | Implement Plan 007 | Initial implementation, all 5 milestones complete, 228/228 pass |

## Implementation Summary

Added aggregate displayable text validation (4,000-character limit across all Text Display components in a single message) to three validation layers:

1. **Client-side validation** — `validateDisplayableTextCount()` in `limits.tsx`, wired into `validateMessage()`, blocks oversized messages from being sent.
2. **Editor UI** — `v2TextError` computed in `DiscordMessageEditor/index.tsx`, displays error border and error text when the aggregate limit is exceeded.
3. **Server-side Zod schema** — `refineDisplayableText()` applied via `.superRefine()` on both `discordMessageShape` and `discordMessageImportShape` in `shapes.ts`, rejects oversized payloads on save/import.

This delivers the plan's value statement: users see a clear warning in the editor when their combined Text Display content exceeds Discord's aggregate limit, preventing the opaque `COMPONENT_DISPLAYABLE_TEXT_SIZE_EXCEEDED` API error.

### Structural Deviation from Plan

The plan specified applying `.superRefine()` directly to `discordMessageShape` and relying on `.extend()` inheritance for `discordMessageImportShape`. However, `.superRefine()` converts a `ZodObject` into `ZodEffects`, which does **not** have an `.extend()` method. This would have broken `discordMessageImportShape = discordMessageShape.extend({...})`.

**Solution**: Introduced `discordMessageBaseShape` (unexported `z.object()`), then:
- `discordMessageShape = discordMessageBaseShape.superRefine(refineDisplayableText)` — exported, used by `messageShape` and downstream shapes
- `discordMessageImportShape = discordMessageBaseShape.extend({...}).superRefine(refineDisplayableText)` — extends the base, then applies the same refinement independently

This preserves all existing type contracts (`satisfies z.ZodType<IncomingMessage>`, etc.) and passes TypeScript compilation with zero errors.

## Milestones Completed

- [x] M1: Constants — `MAX_COMPONENTS_DISPLAYABLE_TEXT = 4000`
- [x] M2: Validation function — `sumDisplayableText()`, `validateDisplayableTextCount()`, wired into `validateMessage()`
- [x] M3: Editor UI — `v2TextError` computation, error border, error text display
- [x] M4: Zod schema — `sumDisplayableText()`, `refineDisplayableText()`, `.superRefine()` on both shapes
- [x] M5: Tests — 10 client-side tests + 7 Zod schema tests

## Files Modified

| Path                                               | Changes                                                                                                              | Lines |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ----- |
| `src/constants/index.ts`                           | Added `MAX_COMPONENTS_DISPLAYABLE_TEXT = 4000`                                                                       | +1    |
| `src/utils/limits.tsx`                             | Added `sumDisplayableText()`, `validateDisplayableTextCount()`, wired into `validateMessage`                         | ~20   |
| `src/components/DiscordMessageEditor/index.tsx`    | Added `v2TextError` computation, error border condition, error text rendering                                        | ~10   |
| `src/server/api/utils/shapes.ts`                   | Added `sumDisplayableText()`, `refineDisplayableText()`, `discordMessageBaseShape`, `.superRefine()` on both exports | ~35   |
| `src/utils/__tests__/mutual-exclusivity.test.ts`   | Added 10 tests (8 for `validateDisplayableTextCount`, 2 for `validateMessage` aggregate)                             | ~120  |
| `src/server/api/utils/__tests__/shapes-v2.test.ts` | Added 7 tests for aggregate displayable text limit in Zod schemas                                                    | ~100  |

## Files Created

None.

## Code Quality Validation

- [x] TypeScript compilation: `npx tsc --noEmit` — zero errors
- [x] Linter: no new warnings
- [x] All tests pass: 228/228
- [x] No regressions in existing tests

## Value Statement Validation

**Original**: "As a Hooks.gg user composing Components V2 messages, I want the editor to warn me when my total Text Display content exceeds Discord's 4,000-character aggregate limit, so that I can fix my message before sending rather than encountering an opaque API error."

**Implementation delivers**: The editor now computes and displays the aggregate Text Display character count error. `validateMessage()` blocks sending. The Zod schema rejects on save/import. All three nesting positions (top-level, section, container) are counted recursively.

## TDD Compliance

| Function/Class                 | Test File                    | Test Written First? | Failure Verified? | Failure Reason    | Pass After Impl? |
| ------------------------------ | ---------------------------- | ------------------- | ----------------- | ----------------- | ---------------- |
| `validateDisplayableTextCount` | `mutual-exclusivity.test.ts` | ✅ Yes               | ✅ Yes             | not a function    | ✅ Yes            |
| `sumDisplayableText` (client)  | `mutual-exclusivity.test.ts` | ✅ Yes               | ✅ Yes             | (via above)       | ✅ Yes            |
| `validateMessage` aggregate    | `mutual-exclusivity.test.ts` | ✅ Yes               | ✅ Yes             | AssertionError    | ✅ Yes            |
| `refineDisplayableText` (Zod)  | `shapes-v2.test.ts`          | ✅ Yes               | ✅ Yes             | ZodError expected | ✅ Yes            |
| `sumDisplayableText` (Zod)     | `shapes-v2.test.ts`          | ✅ Yes               | ✅ Yes             | (via above)       | ✅ Yes            |

## Test Coverage

### Unit Tests — Client Validation (`mutual-exclusivity.test.ts`)

| Test                                              | Status |
| ------------------------------------------------- | ------ |
| returns empty when total within limit             | ✅      |
| returns empty when total exactly 4000             | ✅      |
| returns error when total exceeds 4000             | ✅      |
| counts text displays inside sections              | ✅      |
| counts text displays inside containers            | ✅      |
| counts sections inside containers                 | ✅      |
| ignores ActionRow components                      | ✅      |
| returns empty for empty components array          | ✅      |
| validateMessage returns error for aggregate >4000 | ✅      |
| validateMessage returns empty for aggregate ≤4000 | ✅      |

### Unit Tests — Zod Schema (`shapes-v2.test.ts`)

| Test                                                    | Status |
| ------------------------------------------------------- | ------ |
| rejects when aggregate text exceeds 4000                | ✅      |
| accepts when aggregate text is exactly 4000             | ✅      |
| counts text displays in sections                        | ✅      |
| counts text displays in containers                      | ✅      |
| counts sections inside containers                       | ✅      |
| per-field limit still applies independently             | ✅      |
| import shape also rejects aggregate text exceeding 4000 | ✅      |

## Test Execution Results

```
$ npx vitest run
 ✓ src/utils/__tests__/message-init-route0.test.ts (8 tests)
 ✓ src/utils/__tests__/plan-004-lazy-loading.test.ts (28 tests)
 ✓ src/utils/__tests__/isValidUrl.test.ts (10 tests)
 ✓ src/utils/__tests__/plan-005-bug-fixes.test.ts (7 tests)
 ✓ src/utils/__tests__/plan-005-qa-validation.test.ts (28 tests)
 ✓ src/server/api/utils/__tests__/shapes-v2.test.ts (40 tests)
 ✓ src/utils/__tests__/m7-m10-coverage-gaps.test.ts (33 tests)
 ✓ src/utils/__tests__/mutual-exclusivity.test.ts (42 tests)
 ✓ src/utils/__tests__/components-v2-data-layer.test.ts (32 tests)

 Test Files  9 passed (9)
      Tests  228 passed (228)
```

TypeScript: `npx tsc --noEmit` — zero errors.

## Outstanding Items

None. All milestones complete, all tests pass, no type errors.

## Assumptions Documented

1. **`description` fields do not count** — per Analysis 007, Assumption 1. The recursive walk only counts `TextDisplay.content`. If Discord changes this, `sumDisplayableText` can be extended with a one-line addition.
2. **Zod `ZodEffects` type cast** — `discordMessageShape` is typed as `z.ZodEffects<typeof discordMessageBaseShape, MessageData>` to satisfy downstream `z.ZodType<MessageData>` constraints. This is accurate since `.superRefine()` preserves the output type.

## Next Steps

1. **QA validation** — QA agent should validate against QA criteria.
2. **UAT validation** — Manual reproduction of the user's original payload to confirm the error appears.
3. **Commit** — `fix: add aggregate displayable text limit for Components V2 messages`
