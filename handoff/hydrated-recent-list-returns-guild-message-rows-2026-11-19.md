---
UUID: 98f075f4
Status: Open
Status-Detail: "After the personal-message access fix, the hydrated recent-messages list still returns server (guild) message rows for any server whose message number a user has stored in recentMessageIds. Left out of the fixer chain; no stage owns it yet."
Owning-Stage: steering thread for the website access surfaces (to route it to a stage)
Review-Trigger: when website src/server/api/utils/shared.ts getUserRecentMessages is next edited, or when the next chain touching website access control opens
---

# Hydrated recent list still returns guild message rows

## What is seeded

After the fix (website `2e50cd9`, chain branch `chain/fix-personal-message-access`), `getUserRecentMessages` (`shared.ts:108-122`)
takes the caller's id and selects rows where `fk_users_id = caller or fk_guilds_id is not null`. The `fk_guilds_id is not null` arm keeps
the guild behaviour unchanged. The hydrated session callback (`auth.ts:139`) passes the ids stored in the user's own preferences
(`recentMessageIds`, written unchecked by `user.updatePreferences`, `user.ts:27-63`). So a user who stores the message number of any
server's message gets that row's metadata (`id, createdAt, updatedAt, name, previewImageNonce, guildId`) in `session.hydration.messages`.

This is guild-message metadata, in the family of sweep row S1b (guild messages gated by `authorizeGuildAdmin`, which tests guild
membership; see `handoff/authorize-guild-admin-tests-membership-not-admin-bits-2026-11-19.md`, UUID ed49f3d2). Guild messages are outside the
owner's "personal" words that bound the fix chain, so the chain did not take this surface. This record states no remedy.

Read from code, not run: the guild arm's effect at `2e50cd9` was not exercised by a test or a database run in this record.

## Evidence

`implementation/fix-personal-message-access-implementation.md`, § Diagnosis, "Observed outside the scope, not absorbed", second bullet;
Diagnosis row "S11 hydrated session" and the Change list entry for `getUserRecentMessages`.
`verification/access-defects/scoping/sweep.md` rows S11 (the unfiltered guild rows, at `787bec5`) and S1b. Read from code, not run.

## Origin

Raised by the fixer of chain `fix-personal-message-access` in its implementation document and ruled out of the chain by steering in rulings
block "2026-11-19T22:59Z" (`steering/fix-personal-message-access-rulings.md`): guild messages are outside the owner's "personal" words.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-19T22:59 | helper for steering-roadmap-hooks | Created. |
