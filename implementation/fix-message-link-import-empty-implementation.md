---
ID: n/a
Origin: fix-message-link-import-empty
UUID: 214b1fae
Status: Blocked
Status-Detail: "Diagnosis complete: the cause is not code. Discord blanks content, embeds and components for the Hooks.gg app (1034527356381044828), which holds neither Message Content intent flag. Per the determination the chain stops here: no code written; the finding goes to the owner as a prompt (portal or intent application), then a qa-role production read. One production read requested (which app production reads with)."
Origin-Chain: none
---

# Fixer: Message Link import returns an empty message

## Scope statement

Steering's determination, `steering/fix-message-link-import-empty-rulings.md`, block "2026-11-21T10:20Z" (route: the owner's selection
"Agent: diagnose-first chain (Recommended)", `steering/fix-import-save-conflict-rulings.md` block 09:02Z). Quoted, items 1 and 2:

> 1. **Diagnose** why S1 returns an empty message for a message with content, on the Claude test server (guild `1566742402180456559`):
> the fixer posts fixtures there (test bot or a test webhook, allowed) that discriminate the candidate causes — at least a message by
> another author with plain content, one that mentions the bot, one the bot itself authored, a Components V2 message and one with a
> non-`rich` embed — and reads them through S1's own code path. The record names the cause with the read that established it.
> 2. **Fix, for a code cause only**: a Message Link import of a message with content, embeds or components loads them into the draft.

And: "Where the diagnosis names a portal setting, the chain stops there: the finding goes to him as a prompt, no code is written for it,
and after his act a qa-role session reads production."

## Entry Conditions

| # | Condition | Value |
|---|---|---|
| 1 | Scoping determination | `steering/fix-message-link-import-empty-rulings.md` block "2026-11-21T10:20Z", relayed in `steering/fix-message-link-import-empty-brief-fixer.md` and `-brief-common.md` |
| 2 | Bounded scope statement | Quoted above; write set: website `message.ts` (`getFromUrl`), `discordResponseToMessage.ts`, `NewMessageModal.tsx` (Message Link limb), their `__tests__/`; record: this document and `verification/fix-message-link-import-empty/` |
| 3 | Fix branch | website `chain/fix-message-link-import-empty` at `b663b35` (`git -C website branch --show-current` read 10:21Z); tree `?? .playwright-mcp/` only |
| 4 | Record on the mechanism | `architecture/website.md` and `architecture/system-architecture.md` (named in the common brief); the scope sweep `verification/fix-message-link-import-empty/scoping/sweep.md` found no gateway client or intent configuration in `website` or `project-utils` |

## Diagnosis

**Cause.** The Discord API, not website code, returns the message blank. The Hooks.gg app (`1034527356381044828`) holds neither
`GATEWAY_MESSAGE_CONTENT` (1<<18) nor `GATEWAY_MESSAGE_CONTENT_LIMITED` (1<<19). Discord therefore sends `content: ""`, `embeds: []` and
`components: []` for every message the app did not author and that does not mention it. `getFromUrl` copies what it receives.

**Instrument.** Fixtures posted in the Claude test server's `#general` (`1566742403195469906`), each read through S1's own path at
`b663b35`: paracord `Api.request('GET', /channels/{c}/messages/{m}, { validateStatus: null })` (as `message.ts:116`), then the real
`discordResponseToMessage` transpiled from `git show b663b35:src/utils/discordResponseToMessage.ts`
(`verification/fix-message-link-import-empty/diagnosis/read-s1.mjs`). Two readers ran over the same messages: the token
`website/.env.local` names (bot user read as **Hooks.gg**, `1034527356381044828`, 445 guilds) and the test bot (**Statbot TEST**, app
"Claud Tester" `1558266761101447248`, which holds the LIMITED intent). No token was printed. Flag reads: `diagnosis/hooks-app-flags.txt`,
`diagnosis/test-bot-app-flags.txt` (`GET /applications/@me`).

**Predictions written before the reads.** Hooks reader: everything blank except a message that mentions it. Test reader: everything
present. Converter: a non-`rich` embed is dropped.

**Output** (`diagnosis/summary.txt`; raw captures `read-hooks.json`, `read-test.json`, `read-*-mention-r2.json`; posts
`posted-fixtures.json`, `posted-mention-r2.json`):

| Fixture (id) | Author | Hooks.gg reader: raw → converted | Test bot reader (intent): raw → converted |
|---|---|---|---|
| plain `1573645137471471668` | test bot | content 0, no embeds → empty draft | content 80 → content 80 |
| rich `1573645148011888681` | test bot | content 0, embeds [] → empty | content 74, `rich` → content 74, 1 embed |
| v2 `1573645156178206741` | test bot | components [], flags 32768 → empty | components [17] → 1 component |
| linkembed `1573645157654466580` | test bot | content 0, embeds [] → empty | content 43, embed `article` → content 43, **0 embeds** |
| webhook `1573645160976224267` (webhook owned by the test bot's app) | webhook | content 0, embeds [] → empty | content 82, `rich` → content 82, 1 embed |
| mention-r2 `1573645928798355507` (mention registered: `mentions` = [Hooks.gg]) | test bot | **content 101, `rich` → content 101, 1 embed** | content 101, `rich` → content 101, 1 embed |
| PD-1 classic `1573621671380910101` | test bot | content 0 → empty | content 74 → content 74 |
| PD-1 v2 `1573621673230602251` | test bot | components [] → empty | components [17] → 1 component |

Every fixture reads in full for the reader that has the intent and blank for Hooks.gg. The one Hooks.gg read that came back in full is
the message that mentions it, which is Discord's documented exception. The same code ran for both readers, so code is not the cause. The
first `mention` fixture (`1573645140306956310`) was posted with `allowed_mentions: {parse: []}`, so Discord registered no mention
(`mentions: []`). It does not discriminate and was replaced by mention-r2.

**Not run: a message Hooks.gg itself authored.** Posting one needs the Hooks.gg app's token as the poster. The scope statement allows the
test bot or a test webhook only, so I did not post it. The mention-r2 read already shows the intent's exception mechanism at work for this
app. The bot-authored limb would only add Discord's other exception, so it does not change the cause.

**Which app production reads with: not established here.** This box's `.env.local` names Hooks.gg `1034527356381044828`. Production's
`DISCORD_BOT_TOKEN` is not on this box. Production's PD-1 read fits the same app (blank for the test bot's messages,
`verification/fix-import-save-conflict/qa/pd1/evidence/getFromUrl-direct-read.json`). I have asked steering for the production read
(below).

**Converter observation (hazard 3, a product question, not decided).** `discordResponseToMessage` keeps only `type === 'rich'` embeds,
so a link-unfurl embed (`article`) is dropped even when Discord sends it (linkembed, test reader). This does not cause the empty draft,
which is blank with or without the filter. Whether dropping non-`rich` embeds is wanted is the owner's call, carried by steering. No code
written for it.

**Discord's terms on the intent (hazard 4).** Read from a web-search summary of Discord's pages. The full pages were not read:
`https://docs.discord.com/developers/gateway/getting-started-with-privileged-intent-review`,
`https://support-dev.discord.com/hc/articles/40281523410967`, `https://docs.discord.com/developers/resources/message`. What they say:
without the intent, `content`, `embeds`, `attachments` and `components` come back empty in REST responses too, except for the app's own
messages, DMs to the app, and messages that mention it. Since a change dated 2026-06-10, an app needs to apply for the intent once more
than 10,000 unique users can see it across its servers. The older rule was 100 servers. Whether Hooks.gg (445 guilds) is past that
threshold is unread, so the portal toggle may not be available without an application to Discord.

**Residue in production.** None. `getFromUrl` is a read and writes nothing. A user who imported got an empty draft and Save stayed off
(PD-1).

**Origin-Chain: none.** No website change introduced it. `content` is copied verbatim, and the API sends it blank.

## Change

None. The cause is not a code cause, so item 2 does not run (brief: "Item 2 only where the diagnosis names a code cause").

## Test

None. No code change. The diagnosis instrument and its positive control (the test bot reader) are above.

## Verification

None owed: no source change. The website tree is unchanged at `b663b35`.

## Requests and owner items (sent to `steering-hooks`)

1. **Production read** (qa-role, read only, test account). Read: on hooks.gg as the test account, import mention-r2
   `https://discord.com/channels/1566742402180456559/1566742403195469906/1573645928798355507` and plain
   `…/1573645137471471668` through the Message Link tab, or GET `message.getFromUrl` for both. Prediction: mention-r2 loads its content
   (101 chars) and one rich embed, and plain comes back blank. Falsifier: mention-r2 also comes back blank (production reads with a
   different app, or something else blanks it). Or plain loads its content (production's app already has the intent, so the cause lies
   elsewhere).
2. **Owner decision** (portal cause). Options: (a) enable Message Content in the Hooks.gg app's developer portal, or apply for it if
   Discord's threshold requires it, then a qa-role production read; (b) do not take the intent and accept that a Message Link import
   loads only messages that mention the app or that it authored, which may need a different import design (a re-scope); (c) stop here.
3. **Product question (hazard 3).** Should a Message Link import keep non-`rich` embeds (link unfurls such as `article`), which the
   converter drops today?

## Test-server state left

Seven fixture messages and one webhook (`diag-fixture-webhook`, `1573645159911129158`, owned by the test bot's app) in the Claude test
server `#general`, kept for the production read. The scratch transpile directory under the session scratchpad is removed at run end.

## Handoff

No code handoff: no SHA, no reviewer, no merge. Next acts: steering carries items 1 to 3. After the owner acts, a qa-role session reads
production.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-21T10:28 | fixer-fix-message-link-import-empty | Created (the stamp gate refused a typed stamp on the first write; the row was re-stamped from the clock). Diagnosis: Hooks.gg holds no Message Content intent, so Discord blanks the message (fixtures read through S1 with two readers). No code. Production read and owner decision sent to steering. |
