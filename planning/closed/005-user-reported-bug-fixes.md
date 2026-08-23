---
ID: 5
Origin: 5
UUID: b7e3a1f9
Status: Committed
Target Release: N/A (no versioning configured; bug-fix release)
Epic Alignment: User-reported bug fixes (pre-Components Update)
---

# Plan 005 — User-Reported Bug Fixes

## Changelog

| Date       | Change                                                                      |
| ---------- | --------------------------------------------------------------------------- |
| 2026-04-07 | Initial plan created from Analysis 005. All 5 bugs in scope.                |
| 2026-04-07 | Revised per Critique 005: Findings 1–7 addressed. See critique for details. |
| 2026-04-07 | QA Complete — 209/209 tests pass. 1 blocking issue (nav dropdown clipping). |
| 2026-04-07 | UAT Failed — nav dropdown clipping + undocumented ActionsMenu change.       |
| 2026-04-07 | UAT remediation — portal prop fix for dropdowns, ActionsMenu documented.    |
| 2026-04-07 | UAT Approved — APPROVED FOR RELEASE. All value delivered, issues resolved.  |

## Value Statement and Business Objective

**As a** Hooks.gg user, **I want** authentication, message saving, embed editing, and mobile input to work reliably, **so that** I can create, save, and send Discord messages without encountering broken avatars, save failures, loading hangs, login loops, or paste issues on mobile.

## Success Criteria

- Clearing an embed thumbnail, image, author icon, or footer icon allows saving without error
- User avatar in the nav menu reflects the current Discord avatar after each login
- Users with migrated Discord usernames (discriminator `0`) see the correct default avatar
- Logging in after a session expires does not produce an infinite redirect loop
- Creating, saving, and sending a second message does not require a full page reload
- Text can be pasted into Slate editor fields on mobile devices (iOS Safari, Android Chrome)

---

## Assumptions

1. The `signIn` event in NextAuth has access to the Discord `profile` data via `account` and `profile` parameters (NextAuth passes these to events).
2. Discord's new default avatar formula `(BigInt(id) >> 22n) % 6n` is the correct replacement for migrated users with discriminator `0`.
3. The `signIn` event does NOT receive `sessionToken` (it belongs to the old session). Redis cache invalidation must target specific keys directly (`user-access-token:{userId}` and `user-guilds:{discordId}`) rather than calling `redis.clearUser`, which requires all 3 parameters.
4. The `useParsePathname` memo instability is a contributing factor to unnecessary re-renders but not the primary cause of the multi-message send hang. The primary cause is `staleTime: Infinity` on guild queries.
5. The `handleFocus` `e.preventDefault()` in SlateEditor is the primary (but possibly not sole) contributor to mobile paste failure. The fix may need iterative testing on real devices.

## Open Questions

All open questions from the analysis are addressed below:

- `OPEN QUESTION [CLOSED]`: **Bug 2 — Does Next.js App Router cache the `[id]` layout?** — The `MessageProvider` and `WebhookProvider` are per-`[id]` layout. Even if the layout remounts, the `GuildProvider` persists at the `/message` level with `staleTime: Infinity`, which is the primary issue. Fix targets `GuildProvider` directly.
- `OPEN QUESTION [CLOSED]`: **Bug 4 — Session expiry frequency?** — Irrelevant to the fix. The root cause (missing Redis cache invalidation on signIn) should be fixed regardless of frequency.
- `OPEN QUESTION [CLOSED]`: **Bug 1 — Discriminator migration vs stale avatar?** — Both are addressed: avatar URL updated on every signIn, and `constructImageUrl` updated for migrated users.
- `OPEN QUESTION [CLOSED]`: **Bug 5 — Browser-specific?** — The `e.preventDefault()` on touch events is a universal mobile pattern. Fix removes the blanket prevention; browser-specific issues (if any) are deferred to QA.

---

## Plan

### Milestone 1: Fix Embed Field Clearing → Save Error (Bug 3)

**Objective**: Clearing optional URL fields (thumbnail, image, author icon_url, footer icon_url, author url) should remove the field from the data structure, not set it to an empty string.

**Why first**: This is the only fully verified bug with a deterministic root cause. Quick win, highest confidence.

**Tasks**:

1. **In `src/components/DiscordMessageEditor/components/EmbedEditor/index.tsx`**: Modify `setThumbnail` callback — when `val` is empty/falsy, set `thumbnail: undefined` instead of `thumbnail: { url: val }`.
2. **Same file**: Apply the identical pattern to `setImage` callback.
3. **In `src/components/DiscordMessageEditor/components/EmbedEditor/EmbedAuthor.tsx`**: Where `useStateSetter` is used for `url` and `icon_url` — wrap the returned setters at the **call site** with an empty-to-undefined guard (e.g., `const safeSetter = (val) => setter(val || undefined)`). Do NOT modify `useStateSetter` itself — it has 12 usages across the codebase including `username`, `content`, `embeds`, and `components`, none of which should convert empty strings to `undefined`.
4. **In `src/components/DiscordMessageEditor/components/EmbedEditor/EmbedFooter.tsx`**: Same call-site wrapper treatment for `icon_url`. Same constraint: do not modify `useStateSetter` generically.
5. **Verify**: The Zod schema in `src/server/api/utils/shapes.ts` already marks these fields as `.optional()` — no schema changes needed. The fix is entirely in the client-side setters.

**Acceptance Criteria**:
- Clearing a thumbnail via ImageUploader and saving does not produce an error
- Clearing an embed image via ImageUploader and saving does not produce an error
- Clearing author icon_url and saving does not produce an error
- Clearing footer icon_url and saving does not produce an error
- Clearing author url and saving does not produce an error
- All cleared fields are absent from the saved JSON (not present as empty strings)

---

### Milestone 2: Fix Stale User Avatar on Re-Login (Bug 1)

**Objective**: Update the stored user avatar URL on every successful sign-in, and fix default avatar calculation for migrated Discord users.

**Tasks**:

1. **In `src/server/auth.ts`**: In the `signIn` event handler, after updating account tokens, also update the `Users.image` column with a freshly-constructed avatar URL. The `profile` data is available in the `signIn` event via the `profile` parameter (NextAuth provides `{ user, account, profile, isNewUser }` to signIn events). The existing handler only destructures `{ account, isNewUser }` — add `profile` and `user` to the destructuring. Use `constructImageUrl(profile.id, profile.avatar, profile.discriminator)` to build the URL, then update via `getPostgres().updateTable('Users').set({ image: ... }).where('id', '=', user.id)`. **Note**: In this codebase, `user.id` IS the Discord provider ID (set in the `profile()` callback), so it can be used directly as the Users table PK. New users (`isNewUser: true`) already receive the correct avatar via the `profile()` callback in `createUser` — this update only needs to cover returning users (inside the existing `!isNewUser` guard).
2. **In `src/utils/constructImageUrl.ts`**: Update the default avatar logic for users with discriminator `0` (migrated users). When `avatar === null && discriminator === 0` (or when discriminator is the string `'0'`), use `(BigInt(id) >> 22n) % 6n` instead of `discriminator % 5`. Discord also expanded from 5 to 6 default avatars for migrated users.
3. **Verify**: The `NavMenu.tsx` rendering path (`sessionData.user.image`) will automatically use the updated URL from the session.

**Acceptance Criteria**:
- After changing Discord avatar and re-logging into Hooks.gg, the nav menu shows the new avatar
- Users with no custom Discord avatar and discriminator `0` see the correct default avatar (using ID-based calculation)
- The `Users.image` column is updated on every sign-in (not just first)

---

### Milestone 3: Fix Infinite Login Loop (Bug 4)

**Objective**: Prevent stale Redis cache from blocking authentication after a session expires naturally.

**Tasks**:

1. **In `src/server/auth.ts`**: In the `signIn` event handler, invalidate the relevant Redis cache keys directly. The `signIn` event does NOT receive `sessionToken` (it belongs to the old/expired session), so `redis.clearUser()` cannot be called (it requires all 3 parameters). Instead, delete the specific keys: `formatKey('user-access-token', user.id)` and `formatKey('user-guilds', account.providerAccountId)` via `getClient().del(...)`. The session-token key can be omitted — it will expire naturally via TTL and is not part of the login-loop bug.
2. **Consider**: Adding a log statement when `fetchUserAccount` returns `null` in the session callback (`authCallback` and `hydratedAuthCallback`), to provide observability for this failure mode going forward.

**Dependency**: Milestone 2 modifies the same `signIn` event handler. These changes should be made together.

**Acceptance Criteria**:
- After a session expires (without explicit logout), the next login succeeds on the first attempt
- The Redis user-account cache is invalidated during sign-in, ensuring fresh tokens are used
- No regression: explicit logout still clears the cache correctly

---

### Milestone 4: Fix Multi-Message Send Requiring Reload (Bug 2)

**Objective**: Ensure guild and webhook data stays fresh across message operations without requiring a full page reload.

**Tasks**:

1. **In `src/providers/GuildProvider.tsx`**: Replace `staleTime: Infinity` with a bounded value on both the `getGuild` and `getWebhooksAndChannels` queries. A value like `5 * 60 * 1000` (5 minutes) is reasonable — long enough to avoid redundant fetches during a single editing session, short enough to pick up changes when navigating between messages. The implementer should choose the appropriate value.
2. **Same file**: Consider whether `refetchOnMount: 'always'` (or `refetchOnMount: true` with the bounded staleTime) is more appropriate than the current default, given that the guild context persists across the entire `/message` layout and different message routes may target different guilds.
3. **Same file**: The implementer should also verify whether the guild query is returning a cached error (with `staleTime: Infinity`, an error is also cached indefinitely). Consider adding `retry: 1` (currently `retry: false`) to recover from transient failures, in addition to bounding `staleTime`.
4. **Verify**: Navigate from message A (save + send) → server page → message B (create + save + send) without reload. Both operations should succeed.

**Acceptance Criteria**:
- Creating, saving, and sending message A, then navigating to create, save, and send message B succeeds without page reload
- Guild data is refetched when it becomes stale (not cached indefinitely)
- No new unnecessary network requests during a single editing session
- `useParsePathname` does not cause re-renders on every parent render (if addressed per Handoff Notes)

---

### Milestone 5: Fix Mobile Paste (Bug 5)

**Objective**: Allow text pasting in Slate editor fields on mobile devices.

**Tasks**:

1. **In `src/components/SlateEditor/index.tsx`**: In the `handleFocus` callback, remove the blanket `e?.preventDefault()` call. This call suppresses the native touch behavior including the context menu that provides Cut/Copy/Paste on mobile.
2. **Same file**: Evaluate whether the `focusRef.current?.focus()` call (which briefly shifts focus to an off-screen invisible element) is still necessary for the editor to work correctly without `preventDefault`. If the invisible focus target is only needed to work around the side effects of `preventDefault`, it may be simplifiable. The implementer should test both paths.
3. **Same file**: Review whether the 300ms `setTimeout` delay in `handleFocus` interacts poorly with mobile paste (focus shifting during the delay could dismiss a just-opened paste menu). The implementer should test and adjust if needed.

**Risk**: This is the lowest-confidence fix. Removing `e.preventDefault()` may have been originally added to solve a different mobile UX issue (e.g., preventing double-tap zoom, or unwanted scroll). The implementer should test on both iOS Safari and Android Chrome and note any regressions.

**Acceptance Criteria**:
- User can long-press, select "Paste" from native menu, and paste text into a Slate editor field on mobile
- No regression in desktop editing behavior
- No regression in mobile tap-to-focus behavior (tapping an editor field still focuses it correctly)

---

## Testing Strategy

- **Unit tests**: Bug 3 (thumbnail/image clearing) is well-suited for unit tests. Test that `setThumbnail('')` produces `thumbnail: undefined` in the embed state, and that the resulting data passes Zod validation. Test `constructImageUrl` with discriminator `0` users.
- **Integration tests**: M3, Bug 4 (login loop) — test that `fetchUserAccount` returns fresh data after a `signIn` event, not stale cached data. Note: M3 integration testing requires a Redis instance; the implementer should verify whether the existing test infrastructure provides one or if a mock/stub is needed.
- **Manual/E2E tests**: Bug 2 (multi-message send), Bug 5 (mobile paste) require manual or E2E testing due to their dependency on navigation state and device-specific behavior.
- **QA agent** will define specific test cases and coverage expectations.

---

## Risks

| Risk                                                               | Likelihood | Impact | Mitigation                                                                                    |
| ------------------------------------------------------------------ | ---------- | ------ | --------------------------------------------------------------------------------------------- |
| `e.preventDefault()` removal causes mobile UX regression           | Medium     | Medium | Test on real devices; keep change isolated so it can be reverted independently                |
| `staleTime` reduction causes excessive API calls                   | Low        | Low    | Use 5-minute staleness, not 0; monitor network tab                                            |
| Redis cache invalidation in `signIn` races with session callback   | Low        | High   | Ensure cache delete completes before session callback reads; use `await`                      |
| `constructImageUrl` BigInt calculation fails for very old user IDs | Very Low   | Low    | Discord IDs are always valid snowflakes; BigInt handles them fine                             |
| `useStateSetter` change affects non-URL optional fields            | Low        | Medium | Fix at call sites only (EmbedAuthor, EmbedFooter); do NOT modify `useStateSetter` generically |

---

## Validation

- `tsc --noEmit` passes (zero TypeScript errors in source)
- All existing tests continue to pass
- New tests for Bug 3 (embed clearing) and Bug 1 (constructImageUrl) pass
- Manual verification of Bug 2 (multi-message flow) and Bug 5 (mobile paste) documented

---

## Handoff Notes

- **Milestones 2 and 3** both modify `src/server/auth.ts` `signIn` event. Implement together to avoid merge conflicts.
- **Milestone 1** is fully independent and can be implemented first as a quick confidence win.
- **Milestone 4** touches `GuildProvider` which is a foundational provider — test thoroughly for side effects.
- **Milestone 5** should be the last milestone due to lowest confidence and need for device testing.
- **While you're here (M4)**: Fix the `useParsePathname` memo in `src/utils/hooks/index.ts` — replace `[Object.values(state)]` with a proper dependency array (e.g., `[folderId, messageId]`). This is a performance optimization (not a correctness bug), but eliminates unnecessary re-renders that cascade through `GuildProvider` and `MessageProvider`. Not a required task for M4 acceptance, but good housekeeping.
- No version bump required (no versioning system configured per prior deployment records).

---

**BEFORE HANDOFF**: No unresolved `OPEN QUESTION` items remain. All analysis open questions have been resolved and closed above. Critique 005 findings addressed in revision 2. Ready for implementation handoff.
