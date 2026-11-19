---
UUID: ed49f3d2
Status: Open
Status-Detail: "authorizeGuildAdmin tests guild membership, not admin permission bits; whether session.user.guilds holds only managed guilds is unread. Left out of the access-defects fixer chain; no stage owns it yet."
Owning-Stage: steering thread for the website access surfaces (to route it to a stage)
Review-Trigger: when website src/server/api/routers/utils/authorizeGuildAdmin.ts or src/server/api/routers/utils/guild.ts is next edited, or when the next chain touching website access control opens
---

# authorizeGuildAdmin tests guild membership, not admin bits

## What is seeded

`message.get` with a guild id (website `src/server/api/routers/message.ts:48` -> `utils/guild.ts:48-73`) calls
`authorizeGuildAdmin(guildId, req)`, then queries for a Messages row whose guild matches the input guild id.

Established by the sweep (read from code, not run): `authorizeGuildAdmin` (`authorizeGuildAdmin.ts:40`) requires only that the guild is
in the user's guild list. It contains no permission-bit test, so the name says "admin" but the check is membership in
`session.user.guilds`. Sweep class: GUILD-CHECKED.

Not established (unread): whether `session.user.guilds` holds only the guilds the user manages, or every guild the user is in. If it
holds only managed guilds, the membership test is equivalent to an admin test; the sweep did not read how that list is built.

Guild messages are outside the owner's "personal" words that bound the fix chain, so the chain did not take this surface. This record
states no remedy.

## Evidence

`verification/access-defects/scoping/sweep.md` row S1b, website `787bec5`. Read from code, not run.

## Origin

Raised by the scoping determination of the chain `fix-personal-message-access` (rulings block "2026-11-19T20:30Z", Exclusions) and kept out of the chain by the owner's selection recorded in block "2026-11-19T22:35Z". The sweep is `verification/access-defects/scoping/sweep.md`, run at website `787bec5`.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-19T22:36 | helper for steering-roadmap-hooks | Created. |
