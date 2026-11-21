---
UUID: 8e9ccc47
Status: Open
Status-Detail: "Known limit, on the owner's ruling: a Message Link import loads a message only if it mentions Hooks.gg or Hooks.gg authored it. Any other message imports as an empty draft with Save off. Waits on the Hooks.gg app being granted the Message Content intent after his application to Discord."
Owning-Stage: steering-hooks (to start a qa-role read when the trigger fires)
Review-Trigger: "when the Hooks.gg app (1034527356381044828) is granted the Message Content intent, after the owner's application to Discord"
---

# Message Link import loads only messages that mention Hooks.gg or that it authored

## What is seeded

**The limit, as it stands in production.** In the new-message dialog, the Message Link tab calls `message.getFromUrl` (website
`src/server/api/routers/message.ts`). That route reads the message from Discord with the Hooks.gg app's bot token (app and bot user
`1034527356381044828`). The app holds neither `GATEWAY_MESSAGE_CONTENT` nor `GATEWAY_MESSAGE_CONTENT_LIMITED`, so Discord's API returns
`content: ""`, `embeds: []` and `components: []` for any message the app did not author and that does not mention it. The import loads in
full only:

- messages that @mention Hooks.gg, and
- messages Hooks.gg itself authored.

For any other message, webhook messages included, the dialog shows an empty draft ("Message must have content, embeds, or components.",
JSON tab `{}`) with Save off. Nothing is written. No code change was made for this; the owner ruled it a known limit for now. Separately,
also on his ruling, the converter keeps dropping non-`rich` embeds (link previews such as `article`).

**The read owed when the trigger fires.** A qa-role session, read only, as the test account on hooks.gg, re-reads the plain fixture
through `message.getFromUrl`: `https://discord.com/channels/1566742402180456559/1566742403195469906/1573645137471471668`. The test bot
authored it, and it does not mention Hooks.gg. **Expected:** `content` of 80 characters ("fix-message-link-import-empty diagnosis
fixture: plain content by another author"). Still blank after the grant falsifies the intent as the sole cause and reopens diagnosis.
Content present discharges this handoff (`Addressed`).

## Evidence

- Diagnosis: `implementation/closed/fix-message-link-import-empty-implementation.md` (record `1c5541fd`). Captures are in
  `verification/fix-message-link-import-empty/diagnosis/`: `hooks-app-flags.txt` (Hooks.gg has neither intent flag, 445 guilds),
  `read-hooks.json` and `read-test.json` (the same fixtures through S1's code path at website `b663b35`: blank for Hooks.gg, full for
  the test bot, which holds the limited intent), and `read-hooks-mention-r2.json` (the mention fixture `1573645928798355507` reads full
  for Hooks.gg: 101 characters plus one rich embed).
- Production read: `qa/fix-message-link-import-empty-production-read.md` (record `96bd1c17`, 10:34:39Z). On production, the mention
  fixture loaded 101 characters and one rich embed, and the plain fixture came back blank.
- Ruling: `steering/fix-message-link-import-empty-rulings.md`, block "2026-11-21T10:38Z" (record `2cd06470`). His typed words: "unable
  to turn on intent without applying first. known limit for now". The selection on link-preview embeds: keep dropping them.

## Origin

Fixer chain `fix-message-link-import-empty`, its diagnosis and the owner's 10:38Z ruling. The chain was opened from
`handoff/message-link-import-returns-empty-message-2026-11-21.md` (UUID 6cc5f883), which steering closes.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-21T10:38 | fixer-fix-message-link-import-empty | Created on the owner's known-limit ruling (rulings block 10:38Z), with the trigger and read steering relayed. |
