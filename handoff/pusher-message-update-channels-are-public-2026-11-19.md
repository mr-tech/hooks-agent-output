---
UUID: 1db173d3
Status: Open
Status-Detail: "Pusher channels message-update-<id> are public and carry a save hash only. Left out of the access-defects fixer chain; no stage owns it yet."
Owning-Stage: steering thread for the website access surfaces (to route it to a stage)
Review-Trigger: when website src/server/api/routers/shared.ts or src/providers/MessageProvider/usePusher.ts is next edited, or when the next chain touching website access control opens
---

# Pusher message-update channels are public

## What is seeded

On save, website `src/server/api/routers/shared.ts:265-275` runs
`pusher.trigger(genMessageChannelKey(message.id), 'message-update', hashMessage(message))`. The channel is `message-update-<id>`
(`src/utils/index.ts:472`); the subscriber is `src/providers/MessageProvider/usePusher.ts:57-61`.

Established by the sweep (read from code, not run): no authorization sits in the code. `pusher-js` is built with the public key and
cluster only, with no `authEndpoint`, and the channel name is public. Any client holding the public key can subscribe to any message
number and see save events for it. The payload is a 32-bit non-cryptographic hash of name and data (`src/utils/index.ts:489-499`), not
the message content. The trigger runs only `if (message.id)`, that is, for a client-sent id.

Not established: whether the Pusher app restricts anything (Pusher settings were not covered by the sweep and are not visible from the
code). `website/.env.local` was not read. Which Pusher app a local build publishes to is, per the workspace CLAUDE.md, not established
on this box. Sweep class: UNCLEAR.

The owner left this surface out of the fix chain; the chain's scope statement lists it as "public, and they carry a save hash only."
This record states no remedy.

## Evidence

`verification/access-defects/scoping/sweep.md` row S15, website `787bec5`. Read from code, not run.

## Origin

Raised by the scoping determination of the chain `fix-personal-message-access` (rulings block "2026-11-19T20:30Z", Exclusions) and kept out of the chain by the owner's selection recorded in block "2026-11-19T22:35Z". The sweep is `verification/access-defects/scoping/sweep.md`, run at website `787bec5`.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-19T22:36 | helper for steering-roadmap-hooks | Created. |
