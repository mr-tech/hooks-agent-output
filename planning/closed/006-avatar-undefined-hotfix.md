---
ID: 6
Origin: 6
UUID: c4e89d3a
Status: Released
Target Release: N/A (hotfix for Plan 005 regression; no version bump)
Epic Alignment: Plan 005 avatar regression fix
---

# Plan 006 — Fix Avatar `undefined.png` Regression

## Changelog

| Date       | Change                                                                      |
| ---------- | --------------------------------------------------------------------------- |
| 2026-04-07 | Released — pushed a5004b7..8007100 to origin/master. Deployment complete.   |
| 2026-04-07 | UAT Approved — APPROVED FOR RELEASE. All value delivered, 0 findings.       |
| 2026-04-07 | QA Complete — 211/211 tests pass. 0 issues. Handing off to UAT.             |
| 2026-04-07 | Code Review Approved — 0 findings. Handing off to QA.                       |
| 2026-04-07 | Revised per Critique 006: Findings 1–2 addressed. See critique for details. |
| 2026-04-07 | Initial plan created from Analysis 006. Approved by user.                   |

## Value Statement and Business Objective

**As a** Hooks.gg user, **I want** my Discord avatar to display correctly after signing in, **so that** the nav menu shows my actual avatar instead of a broken image caused by `undefined.png` in the URL.

## Success Criteria

- After signing in, the `Users.image` column contains a valid Discord CDN avatar URL (not one containing `undefined.png`)
- The nav menu displays the user's current Discord avatar after every sign-in
- Users with no custom avatar still see the correct default avatar (no regression to Plan 005's discriminator-0 fix)
- `constructImageUrl` returns a default avatar URL when `avatar` is `undefined` (not just `null`)

---

## Assumptions

1. `events.signIn`'s `profile` parameter contains `{ id, name, image, preferences }` — the output of the `profile()` callback, not the raw Discord OAuth response. **VERIFIED** via NextAuth v4.24.5 source inspection (Analysis 006, Finding 1).
2. `profile.image` in the `signIn` event already contains the correct, freshly-computed avatar URL for the current sign-in, since the `profile()` callback calls `constructImageUrl` with the raw Discord data. **VERIFIED** (Analysis 006, Finding 4).
3. Changing `=== null` to `== null` in `constructImageUrl` does not affect existing callers (`auth.ts` `profile()` callback, `discordResponseToMessage.ts`), because both pass explicit `null` when avatar is absent — the loose check is strictly a superset. **VERIFIED** via grep: 3 call sites, all pass `null` for absent avatars.

## Open Questions

None. Root cause and fix are fully verified.

---

## Plan

### Milestone 1: Fix `signIn` Event Avatar Update

**Objective**: Use the already-correct `profile.image` value instead of re-calling `constructImageUrl` with non-existent properties from the transformed profile.

**Why first**: This is the primary fix — it directly eliminates the `undefined.png` URL being written to the database.

**Tasks**:

1. **In `src/server/auth.ts`**: Remove the `discordProfile` type cast line (`const discordProfile = profile as Pick<DiscordUser, ...>`).
2. **Same file**: Replace the `if (discordProfile) { ... constructImageUrl(...) ... }` block with a direct use of `profile.image`. Cast `profile` as `{ image?: string }` and write `profile.image` to `Users.image` if it is a non-empty string. Do NOT use `user.image` — for returning users, `user` is the database record and `user.image` contains the OLD/stale avatar URL, not the freshly-computed one. Only `profile.image` has the fresh avatar URL from the current sign-in. The `constructImageUrl` import can remain — it is still used by the `profile()` callback above.
3. **Same file**: Remove the now-unused `DiscordUser` type reference from the `signIn` event handler scope (the import may still be needed elsewhere in the file — only remove the local usage).

**Acceptance Criteria**:
- The `signIn` event writes a valid Discord CDN URL to `Users.image`, not one containing `undefined`
- No `constructImageUrl` call in the `signIn` event handler (it is unnecessary — `profile.image` already has the result)
- TypeScript compiles cleanly (`tsc --noEmit`)

---

### Milestone 2: Harden `constructImageUrl` (Defense-in-Depth)

**Objective**: Prevent any future caller from producing `undefined.png` URLs by treating `undefined` the same as `null` for the `avatar` parameter.

**Tasks**:

1. **In `src/utils/constructImageUrl.ts`**: Change `if (avatar === null)` to `if (avatar == null)` (loose equality catches both `null` and `undefined`).
2. This is a secondary defense. The primary fix (Milestone 1) prevents `undefined` from reaching this function in the signIn path, but other future callers could still pass `undefined`.

**Acceptance Criteria**:
- `constructImageUrl('123', undefined as any, 0)` returns a default avatar URL, not `undefined.png`
- `constructImageUrl('123', null, 0)` behavior is unchanged (still returns default avatar)
- `constructImageUrl('123', 'abc123hash', 0)` behavior is unchanged (still returns custom avatar URL)

---

### Milestone 3: Update Test Coverage

**Objective**: Add test coverage for the `undefined` avatar edge case to prevent future regressions.

**Tasks**:

1. **In `src/utils/__tests__/plan-005-bug-fixes.test.ts`**: Add a test case verifying `constructImageUrl` handles `undefined` avatar correctly (returns default avatar URL using ID-based calculation for discriminator 0, and discriminator-based for non-zero). This file already contains the discriminator-0 `constructImageUrl` test group — the new test extends it naturally.
2. **Optionally extend** existing discriminator-0 tests to also verify the `undefined` path, if the test structure allows it without excessive duplication.

**Acceptance Criteria**:
- At least one test verifies `constructImageUrl(id, undefined, discriminator)` produces a valid default avatar URL
- All existing tests continue to pass
- `vitest run` clean

---

## Testing Strategy

- **Unit tests**: Extend existing `constructImageUrl` test suite with `undefined` avatar cases (Milestone 3)
- **No new test files**: All new tests fit naturally in existing test modules
- **Integration**: No integration test needed — the fix simplifies the code path (using an already-computed value rather than recomputing from wrong inputs). The existing signIn flow exercised by manual QA is sufficient.
- **Regression**: Existing Plan 005 tests for discriminator-0 default avatars, embed clearing, and other bug fixes must continue to pass

## Risks

| Risk                                                                                  | Likelihood | Impact                                                 | Mitigation                                                                  |
| ------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------ | --------------------------------------------------------------------------- |
| `profile.image` is `undefined` for some edge case (e.g., NextAuth version difference) | Low        | Medium — avatar would not update, but wouldn't corrupt | Guard with `if (profile.image)` before writing                              |
| Loose equality `== null` changes behavior for `0`, `''`, or `false`                   | None       | N/A                                                    | `== null` only matches `null` and `undefined` in JS — no other falsy values |
| `DiscordUser` import removal breaks other usages in auth.ts                           | Low        | Low — compile error caught by `tsc`                    | Only remove the local type cast usage, not the import if used elsewhere     |

## Validation

- [ ] `tsc --noEmit` passes
- [ ] `vitest run` — all tests pass (including new `undefined` avatar test)
- [ ] Manual verification: sign in with a Discord account that has a custom avatar → nav menu shows correct avatar (not broken image)

## Handoff Notes

- **For Critic**: This is a minimal hotfix. The scope is intentionally narrow — 2 source files, ~5 lines of logic changes. The primary fix (M1) is straightforward: stop re-calling `constructImageUrl` with wrong inputs and use the already-correct `profile.image` value instead.
- **For Implementer**: The `profile` parameter in `events.signIn` is typed as `Profile | undefined` by NextAuth. Cast it to `{ image?: string }` or access via optional chaining. Do NOT cast it to `DiscordUser` or any Discord API type — that was the original bug. Do NOT use `user.image` — it contains the stale DB value for returning users; only `profile.image` has the fresh avatar.
- **Rollback**: Revert the 2 source file changes. No schema, config, or dependency changes to worry about.
