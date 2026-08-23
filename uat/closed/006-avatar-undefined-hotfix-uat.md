---
ID: 6
Origin: 6
UUID: c4e89d3a
Status: Committed
---

# UAT Report: Plan 006 — Fix Avatar `undefined.png` Regression

**Plan Reference**: `agent-output/planning/006-avatar-undefined-hotfix.md`
**Date**: 2026-04-07
**UAT Agent**: Product Owner (UAT)

## Changelog

| Date       | Agent Handoff | Request                                                 | Summary                                                                                    |
| ---------- | ------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| 2026-04-07 | QA            | All tests passing (211/211), ready for value validation | UAT Complete — implementation delivers stated value, `undefined.png` regression eliminated |

## Value Statement Under Test

**As a** Hooks.gg user, **I want** my Discord avatar to display correctly after signing in, **so that** the nav menu shows my actual avatar instead of a broken image caused by `undefined.png` in the URL.

## UAT Scenarios

### Scenario 1: Returning user sign-in writes correct avatar URL

- **Given**: A returning user has a custom Discord avatar and signs in via Discord OAuth
- **When**: The `signIn` event fires and updates `Users.image`
- **Then**: `Users.image` contains a valid Discord CDN avatar URL (e.g., `https://cdn.discordapp.com/avatars/{id}/{hash}.png`), not `undefined.png`
- **Result**: PASS
- **Evidence**: `src/server/auth.ts` lines 197–200 — `const freshImage = (profile as { image?: string } | undefined)?.image;` extracts the already-correct URL from `profile.image` (output of `profile()` callback). The old `constructImageUrl(discordProfile.id, discordProfile.avatar, ...)` call that produced `undefined.png` is removed entirely.

### Scenario 2: Nav menu displays correct avatar

- **Given**: A user has signed in and `Users.image` contains a valid CDN URL
- **When**: The user views the nav menu
- **Then**: The avatar image loads correctly (no broken image / `undefined.png`)
- **Result**: PASS
- **Evidence**: `src/app/_components/NavMenu.tsx` line 46 — `src={`${sessionData.user.image}?size=32`}` reads from `sessionData.user.image`, which sources from `Users.image`. Since `Users.image` is now correctly populated, the avatar displays correctly.

### Scenario 3: Default avatar for users without custom avatar (no regression)

- **Given**: A user has no custom Discord avatar (avatar hash is `null`)
- **When**: The `profile()` callback constructs the avatar URL
- **Then**: A valid default avatar URL is produced (e.g., `https://cdn.discordapp.com/embed/avatars/{n}.png`)
- **Result**: PASS
- **Evidence**: `constructImageUrl` still correctly handles `null` avatar — unchanged logic. Plan 005's discriminator-0 fix intact. 5 existing tests in `plan-005-bug-fixes.test.ts` continue to pass.

### Scenario 4: Defense-in-depth — `undefined` avatar handled

- **Given**: A future caller passes `undefined` as `avatar` to `constructImageUrl`
- **When**: `constructImageUrl` evaluates the avatar parameter
- **Then**: Returns a default avatar URL instead of `undefined.png`
- **Result**: PASS
- **Evidence**: `src/utils/constructImageUrl.ts` line 2 — `if (avatar == null)` (loose equality) catches both `null` and `undefined`. 2 new tests in `plan-005-bug-fixes.test.ts` verify this behavior.

## Value Delivery Assessment

The implementation **fully delivers** the stated value. The root cause — Plan 005's `signIn` event handler casting the transformed profile as raw Discord OAuth data, causing `discordProfile.avatar` to be `undefined` — is eliminated. The fix is direct and minimal:

1. **Primary fix** (M1): The `signIn` handler now reads `profile.image` directly, which already contains the correct CDN URL computed by the `profile()` callback. No re-computation, no type casting, no opportunity for the mismatch that caused `undefined.png`.
2. **Defense-in-depth** (M2): `constructImageUrl` now handles `undefined` avatar via loose equality, preventing any future caller from producing `undefined.png` URLs.
3. **Test coverage** (M3): 2 new regression tests specifically verify the `undefined` avatar scenario.

No core value is deferred. The user-facing symptom (`undefined.png` in avatar URL) is directly addressed at its source.

## QA Integration

**QA Report Reference**: `agent-output/qa/006-avatar-undefined-hotfix-qa.md`
**QA Status**: QA Complete — PASS
**QA Findings Alignment**: QA identified 0 issues. All 211 tests pass (9 test files). TDD compliance verified (RED→GREEN). Plan↔implementation alignment verified across all 9 acceptance criteria.

## Technical Compliance

- Plan deliverables:
  - M1: Fix `signIn` event avatar update — **PASS** (3/3 acceptance criteria met)
  - M2: Harden `constructImageUrl` — **PASS** (3/3 acceptance criteria met)
  - M3: Add test coverage — **PASS** (3/3 acceptance criteria met)
- Test coverage: 211/211 tests pass. 2 new tests specifically covering the regression scenario.
- Known limitations: None. The fix is complete and addresses all identified vectors.

## Objective Alignment Assessment

**Does code meet original plan objective?**: YES
**Evidence**:
- The Value Statement specifies "my Discord avatar to display correctly after signing in" and "nav menu shows my actual avatar instead of a broken image caused by `undefined.png`."
- The implementation eliminates the exact code path (`constructImageUrl(discordProfile.id, discordProfile.avatar, ...)` where `discordProfile.avatar` was `undefined`) that produced `undefined.png` URLs.
- The replacement code (`profile.image`) is the correct data source — verified via NextAuth v4.24.5 source inspection.
- Defense-in-depth (`== null`) prevents recurrence from any code path.

**Drift Detected**: None. Implementation precisely matches plan intent with zero scope additions.

## UAT Status

**Status**: UAT Complete
**Rationale**: All 4 UAT scenarios pass. All 9 plan acceptance criteria verified by QA. Code review approved with 0 findings. Source code spot-checked and confirmed matching documentation. The implementation directly and completely addresses the user-reported `undefined.png` avatar regression.

## Release Decision

**Final Status**: APPROVED FOR RELEASE
**Rationale**: The fix is minimal, targeted, and fully verified. It eliminates a user-visible regression (broken avatar images) introduced by Plan 005. All quality gates passed with zero findings. No risk of side effects — the change narrows the code path (fewer operations, simpler data flow).
**Recommended Version**: Patch bump (if versioning is configured). This is a regression hotfix with no new features or breaking changes.
**Key Changes for Changelog**:
- Fixed avatar `undefined.png` regression: sign-in event now correctly uses `profile.image` instead of re-computing from non-existent raw profile properties
- Hardened `constructImageUrl` to treat `undefined` avatar same as `null` (defense-in-depth)

## Housekeeping Note

`agent-output/uat/005-user-reported-bug-fixes-uat.md` has Status "Committed" (terminal) but remains outside `closed/`. Should be moved to `closed/` by DevOps.

## Next Actions

None required. Handing off to devops agent for release execution.
