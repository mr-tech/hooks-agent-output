---
ID: 6
Origin: 6
UUID: c4e89d3a
Status: Planned
---

# Analysis 006 — Avatar URL Shows `undefined.png` After Plan 005 Fix

## Changelog

| Date       | Change                                 |
| ---------- | -------------------------------------- |
| 2026-04-07 | Status → Planned. Plan 006 created.   |
| 2026-04-07 | Initial analysis. Root cause verified. |

## Value Statement and Business Objective

The Plan 005 avatar fix (Milestone 2) was intended to keep user avatars fresh on every sign-in. Instead, it is overwriting valid avatar URLs with `https://cdn.discordapp.com/avatars/{id}/undefined.png`, breaking avatar display for every returning user who signs in.

## Objective

Determine why the avatar update code in the `signIn` event produces an `undefined.png` URL when the user has a valid Discord avatar.

## Context

- **Reported symptom**: User avatar URL is `https://cdn.discordapp.com/avatars/158446181310136320/undefined.png?size=32`. The user has an avatar in Discord.
- **Introduced by**: Plan 005, Milestone 2 — commit `a5004b7`
- **Affected code**: `src/server/auth.ts`, `signIn` event handler (lines ~199–225)

## Methodology

1. Traced the avatar URL from display (`NavMenu.tsx` → `sessionData.user.image` + `?size=32`) back to the database write in the `signIn` event
2. Inspected `constructImageUrl.ts` to identify how `undefined` could appear in the URL
3. Examined NextAuth v4 source (`core/routes/callback.js` and `core/lib/oauth/callback.js`) to determine the actual shape of the `profile` parameter passed to `events.signIn`

## Findings

### Finding 1: `events.signIn` receives the TRANSFORMED profile, not the raw OAuth profile [VERIFIED]

**Evidence**: NextAuth v4.24.5, `core/routes/callback.js` lines 162–165:

```js
await ((_events$signIn = events.signIn) === null || ... : _events$signIn.call(events, {
  user,
  account,
  profile,      // ← transformed profile
  isNewUser
}));
```

Contrast with `callbacks.signIn` at lines 91–94:

```js
const isAllowed = await callbacks.signIn({
  user: userOrProfile,
  account,
  profile: OAuthProfile   // ← raw Discord response
});
```

The `profile` variable is created in `core/lib/oauth/callback.js` line 162:

```js
const profile = await provider.profile(OAuthProfile, tokens);
```

This calls the application's `profile()` callback, which transforms the raw Discord response into:

```ts
{
  id: profile.id,
  name: '',
  image: constructImageUrl(profile.id, profile.avatar, profile.discriminator),
  preferences: {},
}
```

**Conclusion**: `events.signIn`'s `profile` parameter has `{ id, name, image, preferences }`. It does **not** have `avatar`, `discriminator`, or `username`.

### Finding 2: Plan 005 code assumes raw Discord profile shape [VERIFIED]

The Plan 005 implementation in `src/server/auth.ts` (lines ~201, 218–222):

```ts
const discordProfile = profile as Pick<DiscordUser, 'id' | 'username' | 'avatar' | 'discriminator'> | undefined;

if (discordProfile) {
  const image = constructImageUrl(discordProfile.id, discordProfile.avatar, discordProfile.discriminator);
  // writes to DB...
}
```

- `discordProfile.avatar` → `undefined` (property doesn't exist on the transformed profile)
- `discordProfile.discriminator` → `undefined` (same reason)
- The `as Pick<DiscordUser, ...>` type cast masks the type mismatch at compile time

### Finding 3: `constructImageUrl` strict null check allows `undefined` through [VERIFIED]

```ts
export default (id: string, avatar: null | string, discriminator: number | string) => {
  if (avatar === null) {   // strict equality — `undefined !== null`
    // default avatar branch
  }
  return `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`;
  //                                                ^^^^^^^^^ "undefined"
};
```

When `avatar` is `undefined`:
- `undefined === null` → `false`
- Falls through to the URL template
- JS string interpolation: `${undefined}` → `"undefined"`
- Result: `https://cdn.discordapp.com/avatars/158446181310136320/undefined.png`

### Finding 4: The correct avatar URL already exists on `profile.image` [VERIFIED]

The `profile()` callback (line ~187 of auth.ts) already calls `constructImageUrl(profile.id, profile.avatar, profile.discriminator)` with the **raw** Discord data. The result is stored as `profile.image`. This means `events.signIn`'s `profile.image` already contains the freshly-computed, correct avatar URL for the current sign-in.

### Finding 5: Plan 005 Assumption 1 was partially incorrect [VERIFIED]

Plan 005 stated:
> **Assumption 1**: The `signIn` event in NextAuth has access to the Discord `profile` data via `account` and `profile` parameters (NextAuth passes these to events).

This is technically true — `profile` IS passed. But the assumption implied the raw Discord profile structure (`avatar`, `discriminator`), when NextAuth actually passes the provider-transformed profile (`image`, `name`). The `callbacks.signIn` receives the raw profile; the `events.signIn` does not.

## Root Cause

**VERIFIED**: The Plan 005 `signIn` event handler casts `profile` to `Pick<DiscordUser, 'id' | 'username' | 'avatar' | 'discriminator'>`, but NextAuth v4 passes the **transformed** profile (output of `provider.profile()`) to `events.signIn`, not the raw OAuth response. The transformed profile has no `avatar` property, so `discordProfile.avatar` evaluates to `undefined`. The `constructImageUrl` function's `avatar === null` strict check does not catch `undefined`, producing the URL `https://cdn.discordapp.com/avatars/{id}/undefined.png`.

## System Weaknesses

### Architecture / Code

| Weakness                                                                    | Risk Mechanism                                                      | Detection                                                                |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Unsafe type cast (`profile as Pick<DiscordUser, ...>`) masks shape mismatch | Compile-time types don't prevent runtime `undefined` access         | Would be caught by runtime assertion or by avoiding the cast             |
| `constructImageUrl` uses strict null check (`=== null`) for `avatar`        | `undefined` avatar values pass through to URL template              | Would be caught by loose check (`== null`) or explicit `undefined` guard |
| No runtime validation of `profile` shape in `signIn` event                  | Any assumption about profile structure is untested until production | Would be caught by runtime property check before use                     |

### Process

| Weakness                                                                                                                 | Risk Mechanism                                                                                                                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Plan 005 Analysis relied on NextAuth docs/types rather than verifying the actual runtime value passed to `events.signIn` | The NextAuth docs describe `profile` as "the OAuth profile returned by your provider," which is ambiguous — it could mean the raw or transformed profile. The NextAuth TypeScript types for `events.signIn` use the generic `Profile` type, which doesn't distinguish between raw and transformed. |
| No integration test covered the `signIn` event flow with an actual OAuth profile                                         | Unit tests verified `constructImageUrl` in isolation but didn't exercise the `signIn` event handler with a realistic `profile` object                                                                                                                                                              |

## Instrumentation Gaps

| What                                                                   | Type       | Purpose                                                                              |
| ---------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------ |
| Log the `profile` object shape in `signIn` event (keys only, no PII)   | **Debug**  | Would immediately reveal the actual profile structure in non-production environments |
| Assert `typeof profile.avatar === 'string'` before use in signIn event | **Normal** | Runtime guard that prevents silent data corruption; log warning if assertion fails   |

## Analysis Recommendations

1. **Verify `profile.image` correctness**: Confirm that `(profile as {image?: string}).image` in the `signIn` event contains the expected avatar URL by adding a temporary debug log or by tracing through the `profile()` callback with a known user's data. (High confidence this is correct based on code reading, but a POC would make it certain.)
2. **Test coverage for signIn event**: Create a test that invokes the signIn event handler with a realistic transformed profile object (matching `provider.profile()` output shape) and verifies the resulting `Users.image` value is a valid avatar URL, not one containing "undefined".
3. **Evaluate `constructImageUrl` defensive check**: Determine whether `avatar === null` should be changed to `avatar == null` (catches both `null` and `undefined`) as a secondary defense, considering this function is called from 2 locations and may receive unexpected input.

## Open Questions

None — root cause is verified through NextAuth v4.24.5 source inspection. All questions are resolved.
