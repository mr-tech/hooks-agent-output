---
UUID: 6cc5f883
Status: Addressed
Status-Detail: "Diagnosed by fixer chain fix-message-link-import-empty: the Hooks.gg app (1034527356381044828) lacks the Message Content intent, so Discord returns other authors' messages blank; confirmed on production (qa read 10:34Z). Not code. On his ruling (block 10:38Z) it is a known limit for now, carried by handoff 8e9ccc47 (message-link-import-loads-only-mentioning-messages-2026-11-21.md). Closed Addressed by steering-hooks."
Owning-Stage: steering-hooks (to run chain fix-message-link-import-empty)
Review-Trigger: "when chain fix-message-link-import-empty opens (after chain fix-get-one-absent-not-found releases), or when website src/server/api/routers/message.ts getFromUrl or src/utils/discord.ts is next edited"
---

# Message Link import returns an empty message

## What is seeded

PD-1 of fixer chain `fix-import-save-conflict` (`handoff/fix-import-save-conflict-post-deploy-2026-11-21.md`, record `0818ae7c`):
`qa-fix-import-save-conflict` loaded, on hooks.gg as the Discord test account, both fixture messages devops posted in the Claude test
server's #general (one classic with content, one Components V2) through the Message Link tab. The draft was empty ("Message must have
content, embeds, or components.", JSON tab `{}`, Save off; nothing saved). A direct read of production's `GET
/api/trpc/message.getFromUrl` for both links answered 200 with `content: ""`, `embeds: []` and no components; the V2 one kept
`flags: 32768` (`verification/fix-import-save-conflict/qa/pd1/evidence/getFromUrl-direct-read.json`).

Read from code at `b829314` by a refutation helper (`steering/fix-import-save-conflict-rulings.md` block 09:02Z): the fetch is `GET
/channels/{channel}/messages/{message}` with `DISCORD_BOT_TOKEN` (`message.ts:116`, `discord.ts:12-17`); `content` is copied verbatim;
`droppedComponentTypes: []`; `src/server` and `src/utils` unchanged `f4baebb..b829314`.

Not established: the cause. Discord blanks `content`, embeds and components for an app without the Message Content privileged intent
when the message is not the app's own and does not mention it — an inference, unverified; whether the production Hooks bot has the
intent is unread. If it holds, every user importing another author's message gets an empty draft.

## Disposition

His selection (block 09:02Z): "Agent: diagnose-first chain (Recommended)" — the chain establishes the cause on the test server first; a
fix that is his toggle in Discord's developer portal comes to him; a code fix is the chain's.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-21T09:03 | steering-hooks | Created from PD-1's falsified Message Link limb, on his 09:02Z selection. |
| 2026-11-21T10:39 | steering-hooks | Document closed | Status: Addressed. Cause established (implementation/closed/fix-message-link-import-empty-implementation.md, qa/closed/fix-message-link-import-empty-production-read.md); his ruling (steering/fix-message-link-import-empty-rulings.md, block 10:38Z): known limit for now, carried by handoff 8e9ccc47. |
