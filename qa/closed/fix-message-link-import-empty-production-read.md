---
ID: n/a
Origin: fix-message-link-import-empty
UUID: 214b1fae
Verified-At: b663b35 — repos=website; website origin/master at the read, the production read of hooks.gg at 2026-11-21T10:34:39Z; the commit production was serving was not established
Status: Committed
Status-Detail: "Closed on the owner ruling 2026-11-21T10:37Z (steering/fix-message-link-import-empty-rulings.md, commit 2cd06470): the empty link import is a known limit for now; no code, no release, no further read owed."
Phase: 2
---

Header note: `Phase: 2` only because the field admits 1, 2 or 3. This document is a single production read for the fixer's diagnosis,
not a Phase 2 pass: there was no code change. `Verified-At` names website `origin/master`, which Vercel deploys. It does not establish
what production was serving at the read.

# Production read — fix-message-link-import-empty

Session `qa-fix-message-link-import-empty`, brief `steering/fix-message-link-import-empty-brief-qa-diagnosis.md`. The diagnosis under
test is in `implementation/fix-message-link-import-empty-implementation.md` (record `1c5541fd`).

## Re-derived from the diagnosis captures

From `verification/fix-message-link-import-empty/diagnosis/`:

- `summary.txt`, reader `hooks` (bot `1034527356381044828`, Hooks.gg): all eight fixtures come back `st=200` with `content_len=0`, no
  embeds and no components. That includes `rich`, `webhook`, `v2` and the first `mention` fixture, whose `mentions=[]` shows the mention
  was not registered.
- Reader `test` (Statbot TEST, the fixtures' author): the same messages come back with their content. That shows the blanks are
  reader-dependent and not empty posts.
- `read-hooks-mention-r2.json`: fixture `1573645928798355507` registers a mention of `1034527356381044828`. Read as Hooks.gg, it returns
  101 chars of content and one `rich` embed. That is Discord's mention exception.
- `hooks-app-flags.txt`: Hooks.gg has flags `27262976`. Neither `GATEWAY_MESSAGE_CONTENT` (1<<18) nor `..._LIMITED` (1<<19) is set, and
  `approximate_guild_count` is 445.

So the diagnosis holds on this box's reader: the app lacks the intent. What it could not show is which app production reads with. This
read settles that.

## The read

hooks.gg, stage browser (kept profile), signed in as the test account (session user id `1219217003659788418`). I sent one read-only
`GET /api/trpc/message.getFromUrl?input={json:{url}}` per link from the page `https://hooks.gg/message`. Nothing was saved, posted or
written.

Capture: `verification/fix-message-link-import-empty/production-read/getFromUrl-direct-read.json` (bodies verbatim).

| Fixture | Message | Status | Content | Embeds | Prediction |
|---|---|---|---|---|---|
| mention (registered, `<@1034527356381044828>`) | `1573645928798355507` | 200 | 101 chars, the fixture text verbatim | 1 rich (title, description, colour `5814783`) | content + one rich embed: **met** |
| plain | `1573645137471471668` | 200 | `""` | `[]` | blank: **met** |

**Result: the prediction holds; neither falsifier fired.** The mention message loads in production, so production reads with an app
that the mention exception covers for `1034527356381044828`, that is, Hooks.gg itself. The plain message comes back blank, so
production's app does not hold the intent. A different production app would have blanked the mention message too. An app holding the
intent would have loaded the plain one.

Disclosure: the browser profile was held by another session's playwright server from 10:29:54Z. I retried per the stage-browser
procedure, and the lock freed at 10:34:13Z. The evaluate call's own save-to-file was refused because the path is outside that server's
allowed roots. The JSON string it returned was written to the capture path with the Write tool instead. After the read I closed the
browser and emptied the profile's cache files (no holder at that point).

## Assumption Not Checked

This pass assumes that enabling the Message Content intent for Hooks.gg is something the owner can do, and does not test it. With
`approximate_guild_count` 445, Discord's terms may require an approval application rather than a portal toggle (common brief, hazard 4;
the terms are unread here). Sign that this is false: the owner finds the portal toggle locked or gated behind a review. Owner: steering
carries it to the owner with the diagnosis's item 2. After his act, a qa-role re-read of the plain fixture `1573645137471471668` through
the same `GET` closes the handoff `handoff/message-link-import-returns-empty-message-2026-11-21.md`. Predicted value then: 80 chars of
content (as the `test` reader saw it).

## Changelog

| Date | Agent | Change |
|---|---|---|
| 2026-11-21T10:36 | qa | Production read: the mention fixture loads (101 chars + 1 rich embed) and the plain fixture is blank, so the prediction holds. Capture committed beside this document. |
| 2026-11-21T10:39 | qa | Document closed. Status: Committed, on the owner ruling, block 2026-11-21T10:37Z of `steering/fix-message-link-import-empty-rulings.md` (`2cd06470`): a known limit for now, no code or release. The re-read named under Assumption Not Checked moves to the fixer's known-limit handoff, and no further read is owed by this document. Disclosure: the Status, Status-Detail and first form of this row were written with a shell heredoc, against the brief's rule that record documents are written with the Write or Edit tool. This row was then rewritten with Edit. |
