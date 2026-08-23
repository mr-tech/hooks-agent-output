---
ID: 6
Origin: 6
UUID: c4e89d3a
Status: Resolved
---

# Critique 006 — Fix Avatar `undefined.png` Regression

**Artifact**: `agent-output/planning/006-avatar-undefined-hotfix.md`
**Analysis**: `agent-output/analysis/closed/006-avatar-undefined-regression.md`
**Date**: 2026-04-07
**Status**: Revision 1 — All findings resolved. Approved for implementation.

## Changelog

| Date       | Handoff          | Request                | Summary                                          |
| ---------- | ---------------- | ---------------------- | ------------------------------------------------ |
| 2026-04-07 | Planner → Critic | Re-review revised plan | Both findings resolved. Approved for implementer |
| 2026-04-07 | Planner → Critic | Initial critique       | 1 Medium, 1 Low finding                          |

## Value Statement Assessment

**PASS**. Clear user story with a concrete "so that" clause. Directly addresses a production regression. Maps cleanly to the analysis root cause.

## Overview

This is a well-scoped hotfix plan for a verified regression from Plan 005. The root cause analysis is thorough, all assumptions are marked VERIFIED with source-level evidence, and the fix strategy (use `profile.image` instead of re-calling `constructImageUrl` with wrong arguments) is the simplest correct approach. The defense-in-depth `== null` hardening in M2 is appropriate and low-risk.

## Architectural Alignment

**PASS**. The plan touches the NextAuth `signIn` event handler and a utility function — both within the auth/data layer of the system architecture. No provider patterns, editor architecture, or data flow patterns are affected. The fix simplifies the code path (removes a redundant `constructImageUrl` call), which is directionally correct.

## Scope Assessment

**PASS**. Intentionally narrow: 2 source files, ~5 lines of logic, 1 test file extension. No schema, config, or dependency changes. Appropriate for a hotfix. No scope creep risk.

## Technical Debt Risks

None introduced. The plan removes a type cast (`as Pick<DiscordUser, ...>`) that was hiding a bug — this is a net reduction in technical debt.

## Unresolved Open Questions

None. The plan states all questions are resolved, and this is consistent with the analysis.

## Findings

### Finding 1 — M1 Task 2 incorrectly suggests `user` as alternative to `profile` [Medium]

**Status**: RESOLVED
**Issue**: M1 Task 2 says: *"cast as `{ image?: string }` or use the `user` parameter which also carries `image`"*. The `user` parameter in `events.signIn` is the **database user** returned by the adapter's `callbackHandler` — for returning users, `user.image` contains the OLD avatar URL from the database, not the freshly-computed one.

**Impact**: If the implementer uses `user.image` instead of `profile.image`, the fix will silently do nothing — it will write the stale DB value back to the DB. The avatar will never update. This would reproduce the original Plan 005 Bug 1 (stale avatar) rather than the `undefined.png` regression, making it harder to detect.

**Evidence**: NextAuth v4.24.5 `core/routes/callback.js` lines 115–120: `user` comes from `_callbackHandler.default({ sessionToken, profile, account, options })`, which for existing users returns the DB record. Lines 162–165 pass this same `user` to `events.signIn`.

**Recommendation**: Remove the `user` alternative from M1 Task 2. The instruction should unambiguously direct the implementer to use `profile.image` only, with a note that `user.image` is stale for returning users.

### Finding 2 — M3 test placement guidance is ambiguous [Low]

**Status**: RESOLVED
**Issue**: M3 Task 1 says *"In existing test file (`src/utils/__tests__/plan-005-bug-fixes.test.ts` or `src/utils/__tests__/plan-005-qa-validation.test.ts`)"* — the implementer must choose one of two files, but no guidance is given on which is correct. The `plan-005-bug-fixes.test.ts` file is the unit test file (created by implementation), while `plan-005-qa-validation.test.ts` is the QA validation suite (broader scope). Placing an `undefined` avatar guard test alongside discriminator-0 tests in the unit test file is the more natural fit.

**Impact**: Minor. The implementer will make a reasonable choice either way, and both files already test `constructImageUrl`. No functional risk.

**Recommendation**: Specify `plan-005-bug-fixes.test.ts` as the target, since the new test extends the existing discriminator-0 `constructImageUrl` test group in that file.

## Risk Assessment

**Overall Risk**: Low. The plan is minimal, well-evidenced, and the fix is simpler than what it replaces. The one substantive concern (Finding 1) is easily addressed with a wording change.

## Recommendations

1. Address Finding 1 before implementer handoff — the `user.image` suggestion is actively misleading.
2. Finding 2 is optional polish but would reduce implementer decision overhead.

## Questions

None.

## Revision History

### Revision 1 (2026-04-07)

**Artifact changes**: Plan revised per critique findings.

**Findings addressed**:
- Finding 1 (Medium): `user.image` alternative removed from M1 Task 2. Explicit warning added that `user.image` is stale for returning users. Same warning added to Handoff Notes.
- Finding 2 (Low): M3 Task 1 now specifies `plan-005-bug-fixes.test.ts` with rationale.

**New findings**: None.

**Status changes**: Finding 1 OPEN → RESOLVED. Finding 2 OPEN → RESOLVED. Critique OPEN → Resolved.
