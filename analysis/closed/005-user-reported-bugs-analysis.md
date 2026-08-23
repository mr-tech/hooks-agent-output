---
ID: 5
Origin: 5
UUID: b7e3a1f9
Status: Planned
---

# 005 — User-Reported Bug Analysis (Pre-Components Update)

## Changelog

| Date       | Change                              |
| ---------- | ----------------------------------- |
| 2026-04-07 | Status → Planned; Plan 005 created  |
| 2026-04-07 | Initial analysis of 5 reported bugs |

## Value Statement and Business Objective

Users reported five bugs that collectively impact core message creation, authentication, and cross-device usability. Unresolved bugs in save/send flows and login directly block the primary product value: creating and sending Discord messages.

## Objective

Determine which of the five reported bugs remain present in the current codebase, identify root causes where possible, and classify remaining uncertainties.

---

## Bug 1: User Avatars Do Not Load

**Reported**: When logged in, user avatar does not show. All browsers.

### Methodology

Traced the avatar data flow: Discord OAuth `profile()` callback → `constructImageUrl()` → DB `Users.image` column → adapter `getSessionAndUser()` → session callback → client `useSession()` → `NavMenu.tsx` rendering.

### Findings

**High-confidence inference**: The avatar URL is set _only once_ — during the initial sign-up via the `profile()` callback in `server/auth.ts:188`:

```ts
profile(profile) {
  return {
    image: constructImageUrl(profile.id, profile.avatar, profile.discriminator),
  };
}
```

The KyselyAdapter's `updateUser` is not called on subsequent logins. The `signIn` event only updates account tokens (access_token, refresh_token), NOT the user's image URL.

**Consequence**: If a user changes their Discord avatar after their first login, the stored URL points to an old avatar hash. Discord CDN returns 404 for old avatar hashes once a user updates their avatar.

**Rendering path** in `NavMenu.tsx:46`:
```tsx
src={`${sessionData.user.image}?size=32`}
```
If `sessionData.user.image` is a stale URL that 404s, the Next.js `Image` component (with `unoptimized`) renders a broken image.

**Secondary concern**: `constructImageUrl` handles discriminator-based default avatars (`discriminator % 5`). Discord's username migration sets discriminator to `0` for migrated users. Users with `null` avatars would always get `avatars/0.png`. The new Discord API uses `(BigInt(id) >> 22n) % 6n` for default avatars on migrated users. This may cause incorrect default avatar URLs for users without custom avatars.

### Confidence

- **Stale avatar URL on subsequent logins**: High-confidence inference. The code never updates `Users.image` after initial creation. Fastest disconfirming test: query the DB for a user who changed their Discord avatar and compare stored URL with their current Discord avatar hash.
- **Discriminator migration issue**: High-confidence inference. Verifiable by checking if any users have `discriminator = 0` in their stored data. Missing telemetry: no logging on avatar URL 404s from the client.

### Status: **Likely still present**

The codebase has no mechanism to update stored avatar URLs on re-authentication.

---

## Bug 2: Editing and Sending Multiple Messages Requires Reload

**Reported**: After creating, saving, and sending one message, must reload to save/send a second. Either fails to save or hangs on loading screen.

### Methodology

Traced navigation flow, provider lifecycle, and state management across the message create → save → send → navigate → create new flow.

### Findings

**Layout structure** (verified):
- `/message` layout → `GuildProvider` (persists across all `/message/*` routes)
- `/message/m/[id]` layout → `WebhookProvider` → `MessageProvider` (per-message)
- Pages: `/message/m/[id]/edit` and `/message/m/[id]/send`

**Provider lifecycle**: When navigating away from `/message/m/[id]/...` to a different route (e.g., `/message/f/{guildId}`) and back to a new message (`/message/m/0/edit`), the `[id]` layout unmounts and remounts, creating fresh `MessageProvider` and `WebhookProvider` instances.

**Identified weakness — `GuildProvider` uses `staleTime: Infinity`**:
```ts
// GuildProvider.tsx
api.guild.getGuild.useQuery(guildId, {
  staleTime: Infinity,
  refetchOnWindowFocus: false,
});
api.guild.getWebhooksAndChannels.useQuery(guildId, {
  staleTime: Infinity,
  refetchOnWindowFocus: false,
});
```
Since `GuildProvider` wraps the entire `/message` layout and persists, these queries are never refetched. If the guild or webhook data becomes stale or if an error is cached, subsequent message operations would fail silently.

**Identified weakness — `hasLoaded` gate on send page**:
```ts
// send/page.tsx
const isLoading = isGuildLoading || isLoadingChannels || isMessageLoading;
if (!hasLoaded || isLoading) return <LoadingDots />;
```
`hasLoaded` in `GuildProvider` starts as `!guildId`. It's set to `true` when `guildStatus !== 'pending'`. If the guild query enters an inconsistent state (e.g., stale error in cache) while navigating between messages, `hasLoaded` could remain `false`, causing the loading spinner hang.

**Identified weakness — toast ref not reset after redirect**:
```ts
// MessageProvider/index.tsx
onSuccess: (msg) => {
  if (toastIdRef.current !== null) {
    if (msg.id !== message?.id) {
      router.replace(`/message/m/${msg.id}/edit`);
      // toastIdRef NOT reset here
    }
  }
}
```
After a new message is created (ID changes), `toastIdRef.current` retains the old toast ID. This is likely benign since the provider remounts on navigation, but if layout caching preserves the component, subsequent saves could try to update a dismissed toast.

**Identified weakness — `useParsePathname` memo instability**:
```ts
return useMemo(() => state, [Object.values(state)]);
```
`Object.values(state)` creates a new array reference every render, so the memo dependency always changes. This causes downstream re-renders on every parent render but is a performance issue, not a correctness bug.

### Confidence

- **`staleTime: Infinity` causing stale data**: High-confidence inference. The GuildProvider's query cache is never invalidated between message operations. Fastest disconfirming test: add `console.log` to the `getGuild` query `onSuccess` and verify it fires on the second message operation.
- **Loading hang**: Medium confidence. Depends on Next.js App Router cache behavior for the `[id]` layout. Missing telemetry: no client-side logging of loading state transitions or guild query lifecycle.

### Status: **Likely still present**

The fundamental pattern of `staleTime: Infinity` with no cross-navigation invalidation strategy is unchanged.

---

## Bug 3: Clearing Thumbnail Causes Error Saving

**Reported**: Clearing a thumbnail from an embed prevents saving. The thumbnail URL field is not removed — it's set to empty string.

### Methodology

Traced the thumbnail clearing data flow: `ImageUploader` Clear → `EmbedThumbnail` → `EmbedEditor` → `setThumbnail` → message state → `stripKeys` → tRPC upsert → Zod validation.

### Findings

**Verified root cause** — `EmbedEditor/index.tsx:70-72`:
```ts
const setThumbnail = useCallback(((val: string) => setEmbed({
  ...latestEmbed.current, thumbnail: { url: val },
})), [setEmbed]);
```

When the user clears the thumbnail:
1. `ImageUploader.onClear()` resets `localImage` to `''`
2. User clicks "Save" → `onSetImage()` calls `setImage('')`
3. `setThumbnail('')` sets `thumbnail: { url: '' }`
4. On message save, the Zod schema in `shapes.ts:155` validates:
   ```ts
   thumbnail: z.object({
     url: z.string().trim().url(),
   }).optional(),
   ```
5. Empty string fails `z.string().trim().url()` → validation error → save fails

**The fix**: `setThumbnail` should set `thumbnail: undefined` when `val` is empty.

**Same pattern affects**:
- **Embed image** (`setImage` at line 73): `image: { url: val }` — same empty-string-to-url bug
- **Embed author `icon_url`**: Uses `useStateSetter` which sets `icon_url: ''` instead of `undefined`
- **Embed footer `icon_url`**: Same `useStateSetter` pattern
- **Embed author `url`**: Same pattern if cleared

All of these have corresponding Zod schemas with `z.string().trim().url()` that reject empty strings.

### Confidence

- **Root cause verified**: The code path is deterministic. `setThumbnail('')` produces `{ url: '' }`, and `z.string().url()` rejects it. No ambiguity.

### Status: **Verified, still present**

The `setThumbnail` and `setImage` callbacks in `EmbedEditor/index.tsx` do not handle empty string → undefined conversion. `useStateSetter` similarly sets empty strings rather than removing optional URL fields.

---

## Bug 4: Infinite Login Loop

**Reported**: A user experienced an infinite login loop. Not consistently reproducible.

### Methodology

Traced the authentication flow: Discord OAuth → `signIn` event → session callback → Redis cache → client session check → redirect logic.

### Findings

**High-confidence inference — Redis cache stale after session expiry**:

1. `fetchUserAccount` (redis/index.ts) caches account data with `expireSeconds: 600` (10 min)
2. When a session expires naturally (not explicit logout), the `signOut` event does NOT fire
3. Only explicit `signOut` calls `removeUserSession` → `redis.clearUser`, which deletes the cache
4. On the next login attempt:
   - discord OAuth succeeds
   - `signIn` event fires → writes fresh tokens to DB (but does NOT invalidate Redis cache)
   - Session callback runs → `fetchUserAccount` → reads STALE cached data from Redis
   - If stale cache has expired `access_token`, the code tries `refreshUserAccessToken` with the old `refresh_token`
   - Discord has already invalidated the old refresh token → refresh fails → returns `null`
   - Session callback returns `{}` → client sees unauthenticated
   - Client redirect fires: `redirect('/message/m/0/edit')`
   - User tries to log in again → loop

**Key code path** — `server/auth.ts:92-100`:
```ts
async function authCallback({ session, user }) {
  if (session.user) {
    const account = await redis.fetchUserAccount(user.id);
    if (!account) {
      return {}; // ← This triggers the loop
    }
    ...
  }
  return session;
}
```

**Why not consistently reproducible**: The Redis cache TTL is 600 seconds. If the user tries to log in after the cache expires, the fresh DB data (with new tokens from signIn event) is fetched directly, and login succeeds. The login loop only occurs within the 10-minute window where stale cache data persists AND the old refresh token has been revoked by Discord.

### Confidence

- **Stale Redis cache after session expiry**: High-confidence inference. The code has no cache invalidation in the `signIn` event. Fastest disconfirming test: add a `redis.clearUser` call in the `signIn` event handler and verify the loop no longer occurs.
- Missing telemetry: no logging when `fetchUserAccount` returns null in the session callback. No metrics on session callback failures.

### Status: **Likely still present**

The `signIn` event handler does not invalidate the Redis cache.

---

## Bug 5: Unable to Paste on Mobile

**Reported**: Cannot paste information on mobile devices.

### Methodology

Reviewed the `SlateEditor` component's event handling, focus management, and mobile-specific code paths.

### Findings

**High-confidence inference — `e.preventDefault()` on touch events suppresses mobile paste menu**:

`SlateEditor/index.tsx`:
```tsx
onTouchEnd={useCallback<TouchEventHandler<HTMLDivElement>>((e) => {
  if (!moveRef.current) {
    setShowPicker(false);
    handleFocus(e);  // ← calls e.preventDefault()
  }
}, [])}
```

And `handleFocus`:
```ts
const handleFocus = useCallback((e?: TouchEvent<HTMLDivElement>) => {
  e?.preventDefault();  // ← Blocks native context menu
  focusRef.current?.focus();
  // ... refocus logic with 300ms timeout
}, []);
```

On mobile, tapping an editable field triggers the touch events. `e.preventDefault()` on `touchend` prevents the browser's default behavior, which includes showing the context menu (Cut/Copy/Paste) on long-press or selection.

**Additional contributing factors**:
1. `focusRef` is an invisible off-screen `contentEditable` div. `focusRef.current?.focus()` briefly shifts focus away from the Slate editor on every tap, which can dismiss the mobile paste menu.
2. The 300ms `setTimeout` in `handleFocus` introduces a delay before refocusing the Slate editor, creating a window where focus is on the invisible element.
3. `inputMode={showPicker ? 'none' : 'text'}` — if the emoji picker is shown, `inputMode='none'` suppresses the virtual keyboard and potentially the paste interface.
4. `usePasteImage` is commented out (`ImageUploader.tsx:87`), suggesting paste functionality was previously attempted but disabled.

### Confidence

- **`e.preventDefault()` blocking paste menu**: High-confidence inference. This is a well-known mobile browser behavior. Fastest disconfirming test: remove `e?.preventDefault()` from `handleFocus` and test paste on mobile.
- Missing telemetry: no client-side error logging for mobile-specific input events.

### Status: **Likely still present**

The `handleFocus` function still calls `e.preventDefault()` on touch events.

---

## System Weaknesses

| Area          | Weakness                                                    | Risk Mechanism                                                  |
| ------------- | ----------------------------------------------------------- | --------------------------------------------------------------- |
| Auth/Cache    | `signIn` event does not invalidate Redis user-account cache | Stale tokens cause session callback to return `{}` → login loop |
| Auth/Profile  | User `image` URL never updated after initial sign-up        | Stale Discord CDN URLs → broken avatars                         |
| Data/State    | `staleTime: Infinity` on guild queries with no invalidation | Stale query cache across message operations → loading hangs     |
| Data/Validate | URL fields set to `''` instead of `undefined` when cleared  | Zod `.url()` rejects empty strings → save failures              |
| Mobile/UX     | `e.preventDefault()` on touchEnd in Slate editor            | Native paste menu suppressed on mobile                          |
| General       | `useParsePathname` memo with `Object.values()` dependency   | Unnecessary re-renders on every parent render (perf, not bug)   |

## Instrumentation Gaps

| Gap                                      | Level  | Purpose                                               |
| ---------------------------------------- | ------ | ----------------------------------------------------- |
| Client avatar 404 errors                 | Debug  | Detect stale avatar URLs in production                |
| Session callback null-account events     | Normal | Alert on auth failures; detect login loop occurrences |
| Guild query lifecycle (cache hit/miss)   | Debug  | Diagnose stale query state between navigations        |
| Client loading-state transitions on send | Debug  | Identify which loading flag causes hang               |
| Mobile input event failures              | Debug  | Detect paste/focus issues on mobile browsers          |

## Analysis Recommendations

1. **Thumbnail/image clearing**: Trace the `setThumbnail('')` and `setImage('')` paths in `EmbedEditor/index.tsx` to confirm empty strings reach the Zod validator. Write a unit test: `stripKeys(message with thumbnail.url='')` → verify the output, then `discordMessageShape.safeParse(result)` → verify it fails.
2. **Login loop**: Inspect Redis cache contents after a session expires naturally (not via signOut). Verify that `fetchUserAccount` returns stale data. Test adding `redis.clearUser` to the `signIn` event.
3. **Avatar freshness**: Query the `Users` table for users whose `image` URL returns 404 from Discord CDN. Compare with current avatar from Discord API.
4. **Multi-message send hang**: Add debug logging to `GuildProvider` and `MessageProvider` loading states. Navigate between two messages and trace which `isLoading` flag stays true.
5. **Mobile paste**: Test paste on iOS Safari and Android Chrome with `e.preventDefault()` removed from `handleFocus`.

## Open Questions

1. **Bug 2**: Does Next.js App Router cache the `[id]` layout across navigations, or does it remount? This determines whether provider state persists. Needs testing with React DevTools component tree inspection.
2. **Bug 4**: What percentage of users have sessions that expire naturally (vs. explicit logout)? This determines the frequency of the login loop scenario.
3. **Bug 1**: Are there users with `null` Discord avatars who are affected by the discriminator migration, or is this purely about stale custom avatar hashes?
4. **Bug 5**: Is the mobile paste issue specific to certain browsers (iOS Safari vs. Chrome on Android)?
