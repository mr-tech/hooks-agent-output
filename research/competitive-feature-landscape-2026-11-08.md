---
UUID: 6b1b833a
Status: Active
Status-Detail: >-
  Landscape and scored feature list delivered (Findings F1–F15, Scored list S1–S33). Value now
  rests on a census of user demand: 1,098 forum posts / 10,734 forum messages and 3,438 channel
  messages across four Discord communities (ours included), checked post by post against Discord's
  own message counts. Not Answered: no Hooks.gg usage data exists (G1), and the highest-value
  items turn on owner rulings (Q1 bot identity, Q2 paid tier). Stays Active until the owner selects
  items to plan against; the planner then cites this document and it closes Answered.
---

# Research — competitive feature landscape: what competitors offer, where Hooks.gg stands, and which features belong on a roadmap

## Changelog

| When (UTC) | Who | What | Result |
|---|---|---|---|
| 2026-11-08T01:40 | researcher | Document created from five web sweeps, two reference clones and a read of the `website` tree at `7ce866b` | Status: Active |
| 2026-11-08T01:52 | researcher | Owner granted the Discord test-account browser (*"You can use the discord account harness. The account is in the embeds.gg server."*); read Embed Generator's server read-only — `#changelogs`, `#suggestions`, `#feedback` — and added F8, F9, S26–S28, rescored S4/S9, closed G4, narrowed Q4 | Status: Active |
| 2026-11-08T04:56 | researcher | (Stamp note: this row was first written with a typed, future-dated stamp, `05:30`. The record's stamp-gate hook refused it, and it was replaced with the `date -u` minute.) **Correction**: the 01:52 row's `#suggestions` read was not a sample of a virtualised list. The scroll script scrolled the member list, so only 10 of 217 posts loaded. The owner flagged this. Recaptured in full; F9 rewritten. Owner added the test account to the Hooks.gg, Discohook and Discord Webhook Builder servers, so Q4 is answered. Added F10–F14 and S29–S33, rescored S5/S8/S14/S16/S28, resolved G5, added G7/G8 | Status: Active |
| 2026-11-08T04:58 | researcher | Two corrections to the 04:56 write. (1) The Status-Detail totals had been typed, not computed: 10,512 forum messages and 3,357 channel messages. Recomputed from the capture files they are **10,734** (Embed Generator 1,503 + Hooks.gg 58 + 606 + Discohook 343 + 8,224) and **3,438** (channels 1 + 8 + 87 + 2 + 9 + 3,250, plus Embed Generator 69 + 12 from the 01:52 pass). The post total, 1,098, was right. (2) One token in Status-Detail (`F1–F14` → `F1–F15`) was changed with a shell `sed -i`, against the rule that record documents are edited only with the file-editing tools. The change itself is correct; the method is recorded here. F15 (Webhook Builder chat) was added in the same pass | Status: Active |

## Question

Which competitors occupy Hooks.gg's space (Discord message / embed / webhook builders and the embed
features of general-purpose bots), how do their features compare with ours, and which features —
scored by ease of implementation and by value — belong on a roadmap of new work?

The brief is the owner's, given directly 2026-11-08: *"design a roadmap of new features … Scour the
web for competitors and compare our site and features to theirs. Come up with a list of features
to add, scored by: ease of implementation, and value."* This document is the research under that
roadmap; the roadmap itself, and any plan, is downstream (see Handoff).

## Context

**Master Product Objective: absent.** `agent-output/roadmap/` holds only `.gitkeep` (listed
2026-11-08), so there is no MPO or epic list to align against. In its place this document takes
the product's own statement of itself: the landing page (`website/src/app/page.tsx`) — *"An
'all-frills' custom message and embed builder for Discord … These features were previously only
available to bots, but Hooks.gg gives you access to these features through webhooks"* — and the
canned intro message (`src/utils/copyIntroMessage.ts`), whose five headings are *Fully-Interactive
Message Editor, Familiar Tools, Saving to the Cloud, Shared Saves, Message Importing*. Where a
candidate feature would move the product off "webhooks, no bot required", it is flagged as an
identity question rather than scored as if the identity were settled.

**Architecture record read:** `architecture/system-architecture.md` (Status Active, 2026-08-24) and
`architecture/website.md` (W-1…W-6, A-1…A-3, P-1). Two entries bear directly on scoring: **W-5**
(*"V2 is the only one the product has an opinion about"* — any surface interpreting another
`flags` bit is a product decision needing his ruling; this binds S19 below) and **W-6** (cross-tab
divergence is flagged, not coordinated — real collaborative editing is a new product decision, not
an extension; this bounds S24).

**Standing prohibition noted, not breached.** The steering docket records that the *question of
whether this repository keeps a roadmap directory* is closed to discussion. This research does not
raise it: the owner himself opened roadmap work with this brief, and nothing here proposes a
`roadmap/` document — the planner and roadmap agents decide where his selection lands.

## Methodology

- **Our surface** was read from the tree, not from prose: App Router pages (`src/app/**/page.tsx`),
  the tRPC routers (`src/server/api/routers/{message,guild,user}.ts`), the Prisma schema
  (`project-utils/prisma/schema.prisma`), `src/pages/api/cron.ts`, `vercel.json`,
  `src/utils/sendWebhook.ts`, the editor tree (`src/components/DiscordMessageEditor/**`), the bot
  command tables (`bot/scripts/app_commands/**`, `bot/edgeCommands.ts`, `bot/serverCommands.ts`)
  and the language files (`lang/src/en-US/*.json`, `src/lang/generated/*.json`). Tree at
  `website` `7ce866b` (2026-10-25).
- **Competitors** were inventoried by five `Explore` helper sweeps (Discohook — two passes, the
  second over GitHub raw files and `r.jina.ai` renders of the guide; Embed Generator; Carl-bot /
  MEE6 / Dyno / Sapphire / Mimu; a discovery sweep of every other builder; Hooks.gg's own public
  footprint) and one `web-fetch` check of Discohook's site i18n file. Helper prose is treated as a
  summary of pages, not a read of them; every cell below carries the URL the helper cited, and
  cells the helper itself flagged unconfirmed are marked so.
- **Two reference clones** in the workspace were read as primary sources: `../embed-generator`
  (upstream `merlinfuchs/embed-generator`, last commit `8d64605` 2025-11-13 — a year stale, so its
  feature list is a floor, not a ceiling) and `../discord-api-types` (`32975ae` 2026-02-22) for
  the webhook-execute body (`RESTPostAPIWebhookWithTokenJSONBody`, `rest/v10/webhook.ts`).
- **Not done, and why:** no production database read (a read of a production host is gate-bound;
  the one `DATABASE_URL` in `.env.local` is the hosted database — `hazards.md`), so there are no
  user, guild or message counts behind the value scores; no Discord server was read (no harness
  account in any relevant server — Q4); top.gg returned 403/429 to every helper, so no server
  counts for Hooks.gg or Discohook.
- **Discord read.** The owner granted the test-account browser. He first named the Embed Generator
  server, then added the account to the Hooks.gg, Discohook and Discord Webhook Builder support
  servers (invites verified through Discord's public invite endpoint first). Reads were read-only,
  done by evaluating page text (`innerText`, `<time datetime>`); nothing was typed or sent, and no
  screenshot was taken. Message author names were never captured.

  | Server | Channel | Captured | Completeness check |
  |---|---|---|---|
  | Embed Generator | `#suggestions` (forum) | **217 posts, 1,503 messages** | 205 exact, 10 deleted-starter, 2 over-by-one |
  | Embed Generator | `#changelogs`, `#feedback` | 69 + 12 messages | channel start reached |
  | Hooks.gg | `#feature-request`, `#support` (forums) | **11 + 49 posts, 58 + 606 messages** | 59 exact, 1 deleted-starter |
  | Hooks.gg | `#changelog`, `#news-and-updates` | 1 + 8 messages | channel start reached |
  | Discohook | `#feature-requests` (forum) | **726 posts, 8,224 messages** | 681 exact, 20 deleted-starter, 19 over-by-one, 1 over-by-seven (the V2 thread, 2,071 vs 2,063), 5 short (G7) |
  | Discohook | `#github` (forum), `#announcements` | 95 posts / 343 messages; 87 messages | 91 exact + 4 over-by-one; channel start reached |
  | Webhook Builder | `#changelog`, `#news`, `#chat` | 2 + 9 + 3,250 messages | channel start reached |

  **How completeness was established.** A forum index counts as complete when its oldest post
  falls on the forum's creation date, decoded from the channel's ID. This holds for Embed Generator
  and Discohook `#feature-requests`. The other three indexes have oldest posts months after
  creation, so they are complete only up to that oldest post.

  Each thread's captured message count was compared with the count Discord prints on its forum
  card. A deleted starter post accounts for a one-message shortfall. An "over-by-one" thread shows
  one more message than the card; this is unexplained (G8) but loses nothing. Text channels count
  as complete when the reader reached Discord's "beginning of channel" marker.

  **Errors in this run, recorded as process facts.**
  1. The first `#suggestions` read scrolled the member list, not the post list, and returned
     10 posts. That read was labelled "a sample" without being diagnosed (01:52 row). It is
     corrected here.
  2. Two thread readers truncated long threads. The first read before the thread had rendered; the
     second scrolled an element that does not scroll. Both captures were discarded. They were
     caught by comparing per-thread counts with the card counts, not by re-running the reader.
  3. Three Discohook threads stopped at exactly 132 messages because Discord opens long threads
     near their end. A down-then-climb walk recovered them: 2,071 messages against the card's
     2,063, 208 against 207, and 241 against 239.
  4. Chrome exited once mid-run; the cause was not established. The batches in memory were lost,
     then re-read one job at a time.

  **Classification.** Two `general-purpose-sonnet` helpers classified all 217 Embed Generator and
  726 Discohook posts into one shared 16-theme scheme. Each run was spot-checked here: 12 random
  labels read against the source text, and every count recomputed from the helper's file. A third
  helper extracted signals from Webhook Builder's chat (F13).

  Raw captures live outside the repository, in the session's `.playwright-mcp/` directory and
  scratchpad, and are not committed because they hold third-party text. The quotes below are
  paraphrased or unattributed.
- **Confidence labels** follow `analysis-methodology`: **Verified** (read from code or a fetched
  page), **Inference** (derived from documentation or pattern), **Hypothesis** (with disconfirming
  test). Ease and value scores are inferences by construction and say so.

## Findings

### F1 — Hooks.gg's feature inventory (Verified, from the tree at `7ce866b`)

| Area | What exists | Where |
|---|---|---|
| Editor | One WYSIWYG tree for edit and preview (D-001); Slate content editor with desktop and mobile variants; Discord markdown rules incl. headings, lists, block quotes, code, spoilers, timestamps, user/channel/role/everyone mentions, custom and unicode emoji | `DiscordMessageEditor/index.tsx`, `DiscordContentEditor/{Desktop,Mobile}.tsx`, `src/utils/markdown/rules.tsx` |
| Classic messages | Up to 10 embeds with author, title, description, fields (25), image, thumbnail, footer, colour picker, timestamp; username/avatar override; image upload for embed image/thumbnail/author icon/footer icon as base64 → multipart `attachment://` on send | `EmbedEditor/*`, `ImageUploader.tsx`, `sendWebhook.ts` (`appendFile`) |
| Components V2 | Container, Section (+ Thumbnail accessory), Text Display, Media Gallery, File, Separator, Action Row of **link buttons only**; 4000-char displayable-text gate; mode toggle V2 ⇄ Classic with lossy-change confirmation | `ComponentEditors/*`, `src/constants/index.ts` (`MAX_*`), `src/utils/messageMode.ts` |
| V2 media | **URL only** — `MediaGalleryEditor`, `ThumbnailEditor`, `FileEditor` import `ImageUploader` 0 times each (`grep -c`), and `sendWebhook` converts `data:` URLs inside embeds only | same files |
| Send | Browser-side POST/PATCH to the webhook (`wait=true`, `thread_id`, `with_components`); send into existing thread or create a thread / forum post by name; **Suppress Pings** (`allowed_mentions: {parse: []}`); edit an already-sent webhook message by ID or link | `send/page.tsx`, `WebhookMenu/index.tsx`, `EditMessageMenu.tsx` |
| Webhooks | Lists the guild's webhooks and channels through the bot (`GET /guilds/{id}/webhooks`); accepts a pasted webhook URL; **no create / rename / delete** from the UI (0 writes to `/webhooks` in `src` or `bot`) | `src/utils/redis/index.ts`, `WebhookProvider.tsx` |
| Saving | Cloud save per user or per guild (shared with the guild's admins), 1 000 messages per user or guild, rename, Save-As, recent list, grid/list views, preview JPEGs via `preview-image-generator` | `message.ts` router, `SaveAsMenu.tsx`, `shared.ts` (`MAX_MESSAGES`) |
| Import | JSON paste/load (with the D17 five-row disposition); import from a Discord message link via the bot (`getFromUrl`); **Get Message** message-context command → short-lived Redis code → `/message/m/0/edit?code=` | `NewMessageModal.tsx`, `JsonModalBody.tsx`, `getFromCode`, `bot/serverCommands.ts` |
| Bot | Two application commands only: `/help` (edge) and the `Get Message` context command (server) | `bot/scripts/app_commands/slash/index.ts`, `messageCommands.ts` |
| Real-time | Pusher cross-tab staleness notice (W-6) | `usePusher.ts` |
| API | `GET /api/v1/guilds/{id}/messages[/{id}]` behind `STATBOT_API_KEY` — a Statbot integration, not a public API | `src/pages/api/v1/**` |
| Localisation | `lang/src/en-US/main.json` has **34 leaves**, all component labels; `fr.json` has the same 34; every other UI string is hard-coded English (`loadLocales.ts` loads 30 dayjs locales for dates only) | `src/lang/generated/*` |
| Monetisation | None in code: `premium|subscription|stripe|paddle|checkout` matches only the legal pages (`grep -rci`) | — |
| Analytics | `@vercel/analytics` is a dependency; **no custom events** (`track(` matches 0 files in `src`) | `package.json` |

### F2 — Dormant capability already in the tree (Verified)

Three schema models have no, or only read-side, wiring. They matter because they change the ease
score of three candidate features from "build" to "finish":

| Model | State | Evidence |
|---|---|---|
| `ScheduledMessages` (`webhookUrl`, `cron`, `sendAt`, `sent`, `error`) | **Executor exists, no writer.** `src/pages/api/cron.ts` selects due rows, POSTs, advances `sendAt` by `cron-parser` or marks `sent`; `shared.ts`/`guild.ts` join it into reads. No tRPC procedure creates or edits a row (the `message` router's procedures are `get, getOne, getAll, getFromUrl, getFromCode, upsert, updateRecentMessageData, delete`). `vercel.json` runs the cron **once a day at 00:00 UTC** (`"0 0 * * *"`), so even with a writer the finest granularity today is daily. | `cron.ts`, `vercel.json`, `message.ts` |
| `ShareableLinks` (`code` unique, commented-out `expires`/`restrictions`/`allowedUsers`) | **Table only.** `ShareableLink|shareableLink` matches 0 files in `src` and `bot`. The Redis-code path (`/api/messages/codes/[code]`, `messageStore`) is the ephemeral cousin that *is* wired. | schema; `grep -rc` |
| `GuildLogs` (`type`, `data`) | **Table only.** 0 references in `src`/`bot`. | schema; `grep -rc` |

### F3 — The competitor set

Grouped by how directly they compete. Scale signals are what pages stated; none was re-derived.

| Competitor | Type | Pricing | Scale / activity | Confidence |
|---|---|---|---|---|
| **Discohook** (discohook.app; merged "Discohook Utils" bot) | Web editor + bot; AGPL-3.0 monorepo | Free; **Deluxe $6/month** (donate page; tier rows unlabelled — one reads 10 vs 40) | GitHub 189★, pushed **2026-11-07**; server count not obtained (top.gg 429) | Verified (GitHub API, `r.jina.ai` renders of `/donate`, `/guide/getting-started/{flows,backups}`, `packages/bot/src/i18n/en.json`, `packages/site/public/i18n/en.json`) |
| **Embed Generator** (message.style) | Web editor + bot; MIT; Go server | Free (25 saved messages, 2 actions/component per `PremiumManager` defaults); **Premium $4.99/month** (100 saved messages, more recurring schedules, more AI prompts, custom bot, custom commands) | 719★; top.gg "250 000+ servers", discordbotlist ~278 000; clone's last commit 2025-11-13 | Verified for the clone and homepage; premium page did not render (helper) |
| **Discord Webhook Builder** (discord-webhook.com) | Web app, webhook or bot token | Free, no tiers (vendor claim) | Blog posts Feb–Jun 2026; no counts | Inference (vendor pages only) |
| **WebhookStudio** (webhookstudios.com) | Web app + bot add-on | Free (3 webhooks, 5 templates, 1 schedule); **Pro $2.99/mo**, Team $9.99/mo | Not shown | Inference (vendor page) |
| Smaller V2-era builders: DWEEB, liamt8d/Discord-Embed-Builder-V2, Mini Kraken (erpg.app), Miona Component Editor | Web, mostly free/OSS | Free | Low | Inference |
| Legacy embed-only tools: Glitchii embedbuilder (290★), embed.dan.onl (53★), discordutils, vibebot, Mamba, Phantom, Guildbase | Web, no login | Free | No V2 in any | Inference |
| General bots: Carl-bot, MEE6 (embeds Premium-only, 500), Dyno (3 free embeds), Sapphire (free, "1 867 100 servers"), Mimu (5 free / 300 premium) | Bot dashboards | Embeds largely paywalled or capped | Large install bases | Mixed; MEE6 and Mimu from official docs, Carl-bot and Dyno from snippets |

Helper notes carried forward: the Carl-bot, MEE6 embed page, Dyno docs and Sapphire feature pages
returned 403/404/empty bodies, so that row is the weakest in this table; the helper's own
cross-bot "3+ bots" set was *embed composer, plan-capped embed counts, editing stored embeds,
reaction/button roles, recurring messages (weak)*.

### F4 — Feature comparison matrix

✓ has it · ✗ does not · ◐ partial · ? unconfirmed. Hooks.gg column is Verified (F1); competitor
columns carry the confidence of the F3 row they come from.

| Capability | Hooks.gg | Discohook | Embed Generator | Webhook Builder / WebhookStudio |
|---|---|---|---|---|
| WYSIWYG editing *in* the preview (one tree) | ✓ | ✗ (form + side preview) | ✗ (form + side preview, `EditorMessagePreview`) | ✗ |
| Components V2 (container, section, gallery, file, separator) | ✓ | ✓ (since 2025-04; `component` keys 9–17 in site i18n) | ✓ (`EditorComponentBase*` files) | ✓ both (vendor) |
| Link buttons | ✓ | ✓ | ✓ | ✓ |
| **Interactive buttons / select menus with actions** (role toggle, reply, DM, flows) | ✗ | ✓ free — flows: checks, add/remove/toggle role, send message, create thread, set variable, delete | ✓ 10 action types (`ActionType*` in Go); 2 free / 3 free / 10 premium per component | ✓ (vendor) |
| Send as the bot (no webhook) | ✗ | ✓ | ✓ | ✓ (bot token) |
| Webhook create / rename / delete | ✗ | ✓ (`/webhook create|delete|info`) | ◐ (webhook-info tool) | ✓ saved webhooks |
| Thread / forum post by name | ✓ | ✓ | ? | ✓ |
| Forum `applied_tags` | ✗ | ? | ? | ? |
| Polls | ✗ | ? (one competitor page says absent) | ✗ (not in clone) | ✓ both |
| File attachments (device upload) | ◐ embed images only | ✓ "upload or paste buttons in a media gallery item, thumbnail, or file component" | ✓ (`EditorAttachments`) | ✓ |
| Edit an already-sent message | ✓ | ✓ | ? | ? |
| Import from a Discord message link / context menu | ✓ (bot) | ✓ Restore + Quick Edit context commands | ✓ `MessageRestoreButton` | ? |
| Cloud saves | ✓ 1 000 per owner | ✓ backups, autosave; tier limit unlabelled | ✓ 25 free / 100 premium | ✓ 5 templates free |
| Shared saves within a guild | ✓ | ? | ◐ (guild-scoped saved messages) | ✓ Team tier |
| Share link to a message | ◐ ephemeral code via bot only | ✓ | ✓ (`/editor/share/:id`) | ? |
| Scheduled send — one-off | ✗ UI (table + daily cron exist) | ✓ | ✓ free | ✓ (1 free) |
| Scheduled send — recurring | ✗ UI (cron column exists) | ✓ ≥ 2 h interval | ✓ (count premium-gated) | ✓ |
| Templates / gallery | ✗ (one canned intro) | ? | ✓ classic + V2 (2026-09-30, F8) | ✓ marketplace |
| Variables / placeholders | ✗ | ✓ (flow variables) | ✓ (`{{ .Interaction.User.Mention }}`) | ? |
| AI drafting | ✗ | ✗ | ✓ (few prompts/month free) | ✓ (Webhook Builder, EN/RU) |
| JSON import / export | ✓ | ✓ | ✓ import (Discohook format) | ✓ + discord.js/py export |
| Undo / redo | ✗ (0 hits beyond confirmation copy) | ? | ✓ `EditorUndoButtons` | ? |
| Mention / channel picker in editor | ✗ (rendering only; no picker found) | ? | ✓ `EditorMentionPicker` | ? |
| Multi-message document | ✗ | ✓ "Add Message" | ✗ | ? |
| Localised UI | ✗ (labels only) | ✓ ~12 bot languages, Weblate site | ? | ✓ EN/RU |
| Welcome / leave triggers, reaction roles | ✗ | ✓ | ✗ | ✓ (WebhookStudio bot) |
| Docs / guide / changelog | ✗ (none found on hooks.gg) | ✓ guide + news | ✓ docs | ✓ blog |
| Paid tier | ✗ (terms mention one; nothing in code; `/pricing` 404) | ✓ $6 | ✓ $4.99 | ✓ $2.99 / $9.99 |

### F5 — Where Hooks.gg leads (Verified for ours; Inference for theirs)

Three things no inventoried competitor does, and which the roadmap should protect rather than
trade away:

1. **Editing inside the rendered message** — D-001's single tree. Both major competitors edit in
   forms beside a preview. This is the product's stated identity (*"Fully-Interactive Message
   Editor"*) and its only moat; every S-item below was checked against whether it fits inside that
   tree.
2. **Guild-shared saves with admin authorisation through the bot's guild list**, plus the message
   count cap being per guild rather than per user — collaboration without a "team" tier.
3. **Thread and forum-post targeting with the bot-supplied channel/thread list** — a pasted URL
   plus a picker, where competitors ask for IDs.

### F6 — Where Hooks.gg trails on "table stakes" (Verified absence in ours)

Features present in **both** Discohook and Embed Generator and absent here: scheduled sends
(one-off and recurring), share links, interactive components with actions, send-as-bot, device
uploads into V2 media, a published guide, a paid tier. The first two have dormant backend in the
tree (F2); the third and fourth are the identity question (Q1).

### F7 — Hooks.gg's public footprint is near zero (Verified, web)

The footprint sweep found hooks.gg's landing, legal pages and a `/support` link, and nothing else:
`/pricing` 404; no docs, changelog, blog or invite on the site; `discordbotlist.com/bots/hooks-gg`
404; top.gg listing exists (`/bot/1034527356381044828`) but was unreadable (403); **no mention in
any 2024–2026 "Discohook alternative" roundup fetched** (message.style's own, alternativeto,
peakbot). One search snippet suggested the top.gg listing points at `hook.gg` rather than
`hooks.gg` — unverified (Q5), and cheap to check by hand. Terms (last updated 2023-03-26) say
*"some parts of the Service are available only with a paid Subscription"* while no subscription
exists in code — a prose/mechanism disagreement the owner may want to resolve either way.

### F8 — Embed Generator is shipping fast, and toward our lane (Verified — its own `#changelogs`)

Since 2026-09-21, dated by announcement:

| Date | Shipped | Bearing on Hooks.gg |
|---|---|---|
| 2026-09-21 | **Components V2 shown in the message preview** (previously V2 was edited blind) | Their V2 preview is seven weeks old; ours *is* the editor (F5.1). |
| 2026-09-21 | **Embed Links** with V2 — "fully customizable messages … share them with a link in any Discord server", no bot or permissions needed | Share links (S4) are now their headline feature. |
| 2026-09-23 | Formatting controls for Text Display; markdown renderer fixes; failed requests shown, not silent | — |
| 2026-09-25 | **Custom allowed mentions** (users / roles / everyone) | We have one all-or-nothing "Suppress Pings" toggle. |
| 2026-09-25 | **Timezone for scheduled messages** | S1 must carry a timezone. |
| 2026-09-29 | **AI assistant to free users: 5 prompts/month** (was Premium-only) | S14's competitor baseline is now free. |
| 2026-09-30 | **Message templates** (classic and V2) on first open | S9. |
| 2026-10-07 | **Version history for saved messages** (Premium) | New item S27. |
| 2026-10-08 | **Scheduling overhaul**: real intervals, list of dates (≤100), schedule editor previewing the next sends, **calendar tab**, cron kept under "Advanced", error check on save | Raises the bar for S1/S2 well above a cron string. |
| 2026-10-08 | Buttons can post to **another channel**; build button responses in the editor (Premium) | S11 family. |
| 2026-10-26 | **Auto-publish** scheduled messages to announcement channels | New item S26 (it was a user suggestion first — F9). |

Earlier history worth knowing: undo/redo (Premium, 2024-04-30), mention/role picker (2024-04-24),
message variables (2024-04 → 2026-09, now "almost every field"), forum posts from schedules
(2024-12-15), **Server Lifetime plan $99.99** (2024-11-28), Fluxer webhooks (2026-09-30). This closes
G4: the reference clone (`8d64605`, 2025-11-13) predates everything in the table.

### F9 — What Embed Generator's users ask for (Verified; full census of `#suggestions`)

**Volume.** 217 posts, 2023-05-10 → 2026-10-27: **168 feature requests**, 27 support questions, 12
bug reports, 10 other. Feature requests by year: 54 (2023), 76 (2024), 30 (2025), 8 (2026).
Statuses: 66 unanswered, 51 acknowledged, 38 shipped (about 15 of them answered "already exists",
which inflates the count), 13 declined.

**Themes.** The largest are interactive actions (53) and editor UX (31); the full cross-community
table is in F12.

**Asks that recur across years.**
- Emoji on buttons and select options: at least 5 posts.
- Multi-select dropdowns: 4 posts, 2023–2025.
- "Send to a different channel" from a button: about 6 posts, shipped 2026-10-08.
- Several messages in one editor: 4 posts.
- Character counters and limit warnings: 3 posts.
- Custom wording for DM and role-received replies: about 5 posts.

**About 15 requests were answered "that already exists."** This is evidence of a discoverability
gap. Discohook's forum shows the same pattern (F11), and so does our own support forum (F10).

**From `#feedback` (12 messages).** Praise: "no other bot gives the accessible saved messages
option like this one". Two requests, in April and June 2026, ask for better visibility of V2 while
editing it. Embed Generator's V2 preview only shipped on 2026-09-21. That is exactly what Hooks.gg's
single editor tree already does.

**Read against our tree.**
- **Server list refresh (S28): the gap is mostly not shared.** Read from code, not run.
  `src/server/auth.ts` rebuilds `session.user.guilds` on each session read through
  `fetchUserGuilds` (`src/utils/redis/index.ts`, Redis `expireSeconds: 600`). The cache key is
  deleted at sign-in. A newly administered server therefore appears within 10 minutes without
  signing out.
- **Save version history (S27).** There is no history behind `message.upsert`. The W-1/D-005
  rulings let a user save a message in a bad state, so a history would give them a way back from
  one.

### F10 — What Hooks.gg's own users report (Verified; full census, every thread read)

**Volume.** `#feature-request`: 11 posts, 2023-07 → 2025-07. `#support`: 49 posts, 2023-07 →
2026-10, 606 messages. Every thread matches its card count. The findings, in order of weight:

1. **Sign-in and session failures are the dominant recent issue.**
   - "Infinite login loop", 2025-08-11, posted twice. The same user wrote that the project "hasn't
     been receiving the love it deserves throughout the years".
   - Two "not syncing" threads opened 2026-10-14 and 2026-10-24. The first ran 11 days and was
     fixed 2026-10-21/25. This matches `website` `7ce866b` (2026-10-25) "fix(auth): configure
     Discord issuer…".
   - Earlier sign-in and save failures date from 2023 to 2024: Login Issue (20 messages), Failed to
     save message (25 and 19), Can't Log in.
2. **Hooks.gg is the editing surface for Statbot's paid DM feature.** A 2026-10 user arrived via
   Statbot's redirect to `hooks.gg/message/m/0/edit`. They "purchased the Statbot Premium package
   specifically to utilize this DM feature" and said the outage meant "losing the value of the
   subscription we just paid for". `statbot` appears in 20 messages in our support forum and in
   none of the competitors'. **Reliability of sign-in and send therefore protects Statbot revenue,
   not only Hooks.gg's.**
3. **Server access is limited to admins.** Read from code: `fetchUserGuilds` keeps a server only
   if `guild.owner || hasDiscordPermissions(guild.permissions, ['Administrator'])` (`redis/index.ts`).
   - Feature request 2023-08-08: allow Manage Server, Manage Webhooks or role-based access
     (8 messages, 3 reactions, the most-discussed of our 11). The developer replied *"It's
     planned."* It was asked again 2023-11-05.
   - Support thread 2025-06-27: a user with Manage Server and no Administrator was refused.
   - The request is unmet after 3 years → **S29**.
4. **A missing webhook cost a user 11 days.** "How do I change the send message channel"
   (2025-07, 50 messages) was solved only when the user was told to create a webhook in Discord's
   channel settings. The bot creates none → **S5 rescored**.
5. **Error messages carry no information.**
   - Report 2026-04-08: "no context provided in the error message".
   - The send path shows one fixed string, `Failed to … message. Please try again or contact
     support.` (`sendWebhook.ts`, `toast.promise` error).
   - The 2026-08 "Can't send" thread (38 messages) ended up being a privacy extension blocking
     Discord calls. A specific error would have shown that at once.
   - → **S30**.
6. **Users can't find how things work.** Questions recur about how to send to a server, what
   "inline" does (twice, 2024-06), "I have no idea what I'm doing" (2023-12), and how to edit a sent
   message (2023-07, answered "not very clear atm"). → **S16 rescored**.
7. **Smaller items.**
   - Paste does not work on mobile (2024-06, 16 messages).
   - Template / clone requested in 2023-09. The owner replied *"I was already planning on adding
     such a thing … One of the main motivations for getting hooks.gg stood up was for patch
     notes."* → supports S9.
   - Interactive buttons and select menus requested 2023-07 → S11.
   - Footer branding: done, 2023-10 verification.

### F11 — What Discohook's users ask for (Verified; full census of `#feature-requests`)

**Volume.** 726 posts, 2022-08-30 → 2026-11-05: **667 feature requests**, 22 bug reports, 19
support questions, 18 other. Posts per year: 52 (2022), 103, 165, 209, 138 (2026, to November).

**Statuses.** 209 unanswered, 160 duplicate, 108 acknowledged, 96 shipped, 94 declined. The
duplicates show the same asks every year: forms and modals (34 posts), dropdowns and select menus
(38), tickets (22), backup folders (10), autoresponders (9), boost messages (9).

**Most-discussed requests, by the reply count on the card.**
- Components V2 thread: 2,063 replies.
- Ticket system: 239.
- Custom bot branding: 207 (shipped).
- Send as your own bot: 130 (acknowledged; the developer's concern is storing bot tokens).
- Forms and modals in flows: 128 (acknowledged since 2022).
- Random action: 115.
- Wait timer: 108 (declined).

**Requests that map onto Hooks.gg's strengths.**
- **Render and export messages as images**: 33 replies, acknowledged, still open. We already
  render JPEGs through `preview-image-generator` → **S31**.
- **Preview expanded markdown such as headers**: 60 replies, open since 2023. Accurate preview is
  our design (D-001).
- **Copy containers, rows and galleries between messages**: 30, open → S32.
- **A "new" button so Clear All does not wipe the linked save**: 45, open.
- **Relative-timestamp variables**: 50, open → **S33**.
- **Jump straight to the error instead of cryptic text**: a sampled request. It echoes our own F10.5.

**Developer declines.**
- **Discord limits**: button colours, video, resizing images, ephemeral webhook messages.
- **Compute or spam concerns**: sticky messages, mass sends.
- **Free custom branding**: declined as "no benefit in providing free custom branding without a
  single bit of ad". That decline is a paid-tier signal, but reading it that way is interpretation.
- **AI**: "will not integrate ai whatsoever".

### F12 — Demand by theme across both large communities (Verified counts; classification is judgement, spot-checked)

Computed by one script over both classified files (`cross-theme.txt` in the session scratchpad).
"Open" means unanswered or acknowledged.

| Theme | EG all | EG 2025+ | EG open | DH all | DH 2025+ | DH open | Share of 835 |
|---|---|---|---|---|---|---|---|
| interactive actions | 53 | 10 | 33 | 178 | 89 | 68 | **27.7%** |
| editor UX | 31 | 7 | 23 | 121 | 56 | 69 | **18.2%** |
| sending targets / webhooks / bot identity | 16 | 6 | 12 | 76 | 36 | 35 | 11.0% |
| general-bot features (tickets, welcome…) | 7 | 0 | 5 | 72 | 50 | 32 | 9.5% |
| saved messages & sharing | 14 | 3 | 10 | 53 | 33 | 24 | 8.0% |
| restore / edit existing | 9 | 1 | 6 | 22 | 7 | 10 | 3.7% |
| scheduling | 9 | 1 | 7 | 22 | 8 | 15 | 3.7% |
| variables | 5 | 1 | 3 | 26 | 19 | 14 | 3.7% |
| custom commands | 5 | 2 | 4 | 14 | 8 | 7 | 2.3% |
| permissions & access | 7 | 3 | 6 | 11 | 5 | 10 | 2.2% |
| media & files | 3 | 0 | 1 | 14 | 3 | 6 | 2.0% |
| Components V2 | 0 | 0 | 0 | 15 | 15 | 2 | 1.8% |
| pricing & limits | 5 | 3 | 4 | 8 | 2 | 3 | 1.6% |
| polls & new Discord features | 3 | 1 | 3 | 3 | 0 | 1 | 0.7% |
| AI assistant | 0 | 0 | 0 | 1 | 1 | 0 | **0.1%** |

**Bias of this instrument.** A request forum measures what that product lacks, not what users
value. Features a competitor already ships well generate few requests. Scheduling's 3.7% therefore
undercounts how much users want scheduling; it does not show they don't.

Even so, interactive actions are the largest demand in both communities. AI drafting barely
registers: one request in 835, and one developer refuses to build it.

### F13 — Competitors ship continuously; Hooks.gg has published nothing since 2023 (Verified)

- **Hooks.gg.** `#changelog` holds one post (2023-09-03). `#news-and-updates` has 8 posts: the last
  feature news is 2023-10-19 ("We're verified!"), followed only by the 2026-10-21 outage notices.
  Users cannot see that any work has happened since 2023. F10.1's "hasn't been receiving the love"
  comment is the visible result → **S16 value 5**.
- **Discohook**, `#announcements`, 87 messages since 2020. Roughly monthly changelogs, each naming
  the users who asked. Since 2025:
  - Quick Edit from Discord's context menu.
  - Granular allowed mentions.
  - Per-server bot name, avatar and bio.
  - "Member has role" checks.
  - A readable error viewer for failed sends (2026-02).
  - discord.py export.
  - A searchable backups page.
  - An attachments overhaul (2026-06).
  - It opened its `#support` and `#feature-requests` channels to search engines (2026-10-29).
- **Embed Generator**: see F8.
- **Discord Webhook Builder** (`#news` and `#changelog`).
  - It passed 100 servers in March 2026 and waited months for Discord's privileged-intent approval.
  - On 2026-10-31 it launched tickets with modal pre-forms, server support analytics, and a
    "Discord-accurate preview" that fills variables with the server's real values.
  - It supports V2 through plain webhooks.
  - Its audience is mostly Russian-speaking. Chat findings are F15.

### F14 — Hooks.gg is absent from every competitor community (Verified, measured)

A case-insensitive search for `hooks.gg|hooks gg|hooksgg` over all **13,407** captured competitor
messages returned **0** matches. The single `\bhooks\b` match in Discohook's forum is the ordinary
word. The search was positive-controlled on the same data:
- `discohook|dishook` matches 7 posts in Embed Generator's forum, 603 in Discohook's, and 6 in
  Webhook Builder's chat.
- `message.style|embed generator|embedg` matches 7 in Discohook's forum and 4 in Webhook Builder's
  chat.
- `hooks.gg` matches 30 in our own support forum.

Competitors are discussed in each other's communities; Hooks.gg is never mentioned. This upgrades
F7 from "no web footprint found" to a measured absence.

### F15 — Webhook Builder's chat (Verified extraction; judgement classification, spot-checked 8/8)

**Coverage.** 3,250 messages, 2026-02-18 → 2026-11-07, of which 2,961 carry text. **Limit of
this source:** the helper skipped messages under 22 characters, which is **1,447 of 2,961**. Most
are chatter, but this is not a full read. Of the rest, 310 messages carry a signal: 118 how-to
questions, 76 bug or outage reports, 67 feature requests, 31 UX complaints and 18 praise.

**What it adds to F9–F12.**
1. **Outages and sign-in failures are a category-wide pain, and users notice them.** There are 76
   bug or outage messages, with spikes in July (24) and October (14). They stem from upstream
   providers, a rate-limit ban and an unpaid server. This mirrors our F10.1.
2. **Interactive buttons are the friction point here too.** Users asked for buttons back after
   they were removed from webhook mode. They are confused by entering their own bot's token: one
   asked whether the token is safe, and two said the site overwrote their bot's existing commands.
   This is the operational cost of the "send as your own bot" model behind Q1(b). Discohook's
   developer gives the same reason for hesitating (F11).
3. **Mobile.** Mobile layout complaints run May–October, including a publish button hidden behind
   the browser bar. That matches our 2024 mobile-paste thread (F10.7).
4. **Limits are misreported.** Oversize payloads show a misleading "network error", and users ask
   for the character counter to match real limits. Same class as S30.
5. **Comparisons.** Users call Discohook "broken" and prefer this tool; they praise it as free with
   no paywall. They also complain that other ticket bots "demand premium for small things". This is
   a pricing-sensitivity signal for Q2.

## Scored feature list

**How to read the scores.** *Ease* 5 = finish existing wiring or add one surface; 1 = a new
subsystem (bot-side interaction handling, a renderer, a payments integration). *Value* 5 = present
in both major competitors and asked for by the product's own stated identity; 1 = a convenience
nobody inventoried leads with. Both axes are **Inference** — ease from the tree as read above, value
from competitor prevalence in F4 — because the repository holds no usage data (G1). *Fit* says
whether the item lives inside the single-tree editor (D-001) or beside it.

| # | Feature | Competitors | What exists here | Ease | Value | Fit | Notes / constraints |
|---|---|---|---|---|---|---|---|
| S1 | **Scheduled send, one-off** | Discohook, EG (free), WebhookStudio | `ScheduledMessages` table, `cron.ts` executor, read-side joins (F2) | 4 | 5 | beside (send page) | Needs a tRPC writer + a send-page control. **Granularity is daily** until the Vercel cron is made more frequent — plan tier decides (G2). `webhookUrl` is stored in plaintext on the row; a plan should weigh `src/utils/encryption.ts`. |
| S2 | **Scheduled send, recurring** | Discohook (≥2 h), EG (premium count), Dyno automessage | `cron` column + `cron-parser` advance already in `cron.ts` | 3 | 4 | beside | Same cron-cadence dependency; needs a cron-expression UI (EG has `CronExpressionBuilder`) or a preset list. |
| S3 | **Device uploads in V2 media gallery / thumbnail / file** | Discohook (explicit), EG | `ImageUploader` + base64 → `attachment://` already works for embeds (`sendWebhook.appendFile`) | 4 | 4 | inside | Extend `appendFile` walk into `components`; `File` component needs non-image MIME. Discord's 25 MB webhook limit applies. |
| S4 | **Share link (read-only / copy-to-my-account)** | Discohook, EG (V2 "Embed Links", their 2026-09-21 headline — F8) | `ShareableLinks` table (F2); `/preview` route renders any message; Redis-code pattern | 4 | 5 (was 4: rescored on F8/F9) | beside | A public page rendering the single tree in preview mode plus a "Copy to my messages" action; commented-out `expires`/`restrictions` columns show the owner already sketched the scope. |
| S5 | **Webhook create / rename / delete in the UI** | Discohook, WebhookStudio | Read side exists (`/guilds/{id}/webhooks` via bot) | 3 | 4 (was 3: F10.4, a user blocked 11 days for want of a webhook) | beside | Rename/avatar via the webhook token needs no new scope; **create/delete need the bot's `MANAGE_WEBHOOKS`** — invite scope check first (`INVITE_URL` in `src/constants`). |
| S6 | **Import Discohook / Embed Generator formats** (JSON and share links) | EG ships a Discohook migration guide | JSON import with D17 disposition exists | 4 | 3 | beside | Acquisition lever against F7's zero footprint. Discohook backup JSON wraps `messages[].data`; map once. |
| S7 | **Send to several webhooks / channels at once** | Discohook "Add Webhook" | `sendWebhook` takes one webhook | 4 | 3 | beside | Loop + per-target result; `recentWebhookId` becomes a list or stays "last". |
| S8 | **Polls** | Webhook Builder, WebhookStudio | `poll` is in the webhook body (`RESTPostAPIWebhookWithTokenJSONBody`, discord-api-types `32975ae`); nothing here | 3 | 2 (was 3: 0.7% of 835 requests, F12) | inside | Neither major competitor confirmed — a possible differentiator. Needs preview rendering and a classic-only constraint (polls cannot combine with V2). |
| S9 | **Templates / starter gallery** | WebhookStudio marketplace; EG templates, classic + V2 (2026-09-30 — F8) | One canned intro (`copyIntroMessage.ts`), `PresetDialog.tsx` | 3 | 4 (was 3: rescored on F8) | beside | Curated set first (announcement, rules, welcome, patch notes); community gallery is a moderation commitment — owner call. |
| S10 | **Forum `applied_tags`** | none confirmed | `thread_name` supported; tags not | 4 | 2 | beside | Tag list comes with the forum channel the bot already lists. |
| S11 | **Interactive components with actions** (non-link buttons, select menus → role toggle, reply, DM) | Discohook (free, flows), EG (10 action types) | Bot interaction endpoints exist (`interactions-edge`/`-server`) but handle 2 commands; link buttons only in editor | 1 | 5 | inside (editor) + new (bot) | **Webhooks cannot send interactive components — only an application can**, so this requires S12 and a bot-side action store/executor. Highest-value gap and the identity question (Q1). |
| S12 | **Send as the bot into a channel** (no webhook) | Discohook, EG, Webhook Builder | Bot token present server-side; `getApi()` used for reads | 2 | 3 | beside | Prerequisite of S11; moves send server-side (today it is browser-issued — Runtime Flow 2), which also changes the error surface. Needs `SEND_MESSAGES` per channel and a permission check UI. |
| S13 | **Variables / placeholders** (`{user}`, `{server}`) | Discohook, EG | none | 3 | 2 | inside | Meaningful only with S11/S12 or welcome triggers; for webhook sends they can only resolve at send time to the sender. |
| S14 | **AI drafting assistant** | EG (few free prompts), Webhook Builder | none | 3 | 2 (was 3: 1 request in 835, F12; Discohook's developer refuses it, F11) | beside | Recurring API cost → owner decision (Q3); output must land in the editor's own shape (`stripKeys`-safe) — the D17 import disposition already provides the landing path. |
| S15 | **Localised UI** | Discohook (~12 languages), Webhook Builder (EN/RU) | 34 labels in `lang/`; `fr.json` mirrors them; everything else hard-coded | 2 | 3 | across | String extraction across every page; the `lang/build` pipeline exists, so the cost is sweep, not infrastructure. |
| S16 | **Public guide + changelog + listing hygiene** | all three majors; Discohook posts monthly changelogs crediting requesters (F13) | none on hooks.gg (F7); our changelog's last post is 2023-09 (F13) | 4 | 5 (was 4: F10.6 discoverability, F13 visible silence, F14 measured absence) | beside (site) | The cheapest high-value item. It answers our users' "how do I…" threads and the "hasn't received love" perception, and makes us visible at all. Includes verifying the top.gg URL (Q5). |
| S17 | **Undo / redo** | EG | none (0 hits) | 3 | 3 | inside | Slate has per-editor history; a message-level history over `MessageProvider` state is the real item. |
| S18 | **Mention / channel / emoji autocomplete picker** | EG `EditorMentionPicker` | Rendering rules exist; `EmojiPicker` exists; no `@`/`#` picker found in `SlateEditor` (Hypothesis — confirm by reading `SlateEditor/index.tsx`) | 3 | 3 | inside | The bot already supplies channels and roles for the guild. |
| S19 | **Silent message / suppress-embeds toggles** (`flags` 4096, 4) | Discohook "Flags" section | pass-through only | 5 | 2 | beside | **Bound by W-5**: adding a UI opinion on another flags bit is a product decision needing his ruling, however small the code. |
| S20 | **Export to discord.js / discord.py code** | embed.dan.onl, Webhook Builder | JSON export exists | 4 | 2 | beside | Developer audience, off the community-builder positioning. |
| S21 | **Multi-message document** (several messages, sent in order) | Discohook | one message per record | 2 | 3 | across | Touches schema (`Messages.data` is one message), save path, send loop and preview images. |
| S22 | **Message organisation** (search, folders, tags) at 1 000 cap | — | sort + grid/list | 3 | 2 | beside | Low until the cap is approached; G1 would tell. |
| S23 | **Paid tier** | Discohook $6, EG $4.99, WebhookStudio $2.99 | Terms promise one; nothing in code | 2 | — | across | Not scored for value: it is a monetisation decision (Q2), and competitors gate *limits* (saves, schedules, actions), not features. |
| S24 | **Real-time collaborative editing** | none | Pusher staleness notice only | 1 | 2 | inside | W-6 rules this a new product decision; no competitor has it; listed to record that it was considered. |
| S25 | **Welcome / leave triggers, reaction roles** | Discohook, Carl-bot, MEE6, Sapphire | none | 1 | 2 (for this identity) | new (bot) | General-bot territory; only coherent after Q1 answers "yes" to becoming a bot product. |
| S26 | **Auto-publish to announcement channels** after send / scheduled send | EG (2026-10-26, user-requested — F9) | none | 4 | 3 | beside | `POST /channels/{id}/messages/{id}/crosspost` needs a bot with Manage Messages in that channel; a webhook cannot publish its own message. That is a small bot dependency, not the full S12. It pairs with S1. |
| S27 | **Version history for saved messages** | EG (Premium, 2026-10-07) | none; `Messages` has one `data` column | 3 | 3 | beside | Needs a history table written on `upsert`, plus restore. The W-1/D-005 rulings allow bad-state saves, which makes undoing a save more valuable. It's an obvious paid-tier limit if Q2 says yes. |
| S28 | **Refresh the server list on demand** | EG users' complaint (F9) | Rebuilt per session read, cached 600 s (F9, read from code) | 5 | 2 (was 3: gap mostly not shared) | beside | At most 10 minutes of staleness today; a manual refresh button would remove even that. |
| S29 | **Let non-admins manage a server's messages** (Manage Server / Manage Webhooks, or chosen roles) | EG praised for server-saved messages (F9) | `fetchUserGuilds` keeps owner or Administrator only (F10.3) | 4 (permission threshold) / 2 (role-based) | 4 | beside | The most-discussed request from our own users. Asked 2023-08 and 2023-11, refused again 2025-06; the developer said *"It's planned."* in 2023. It is a security-relevant authorisation change, so a plan should take a security review. |
| S30 | **Actionable send and save errors** (Discord's error code and message; likely causes such as a blocked request or missing webhook) | EG "request failures are now always displayed" (2026-09-23); Discohook readable error viewer (2026-02) | One fixed failure string in `sendWebhook.ts` | 5 | 4 | beside | F10.5. Cheap, and it cuts support threads directly. It pairs with S16. |
| S31 | **Download a message as an image** | Discohook users ask, 33 replies, acknowledged and open (F11) | `preview-image-generator` already renders the message to JPEG on save; the URL is public on the CDN | 5 | 3 | beside | A distinct feature built from existing infrastructure. Depends on the preview-failure handoff (`preview-image-failure-shows-broken-not-stale-2026-08-24.md`) being fixed, or the download would expose a broken image. |
| S32 | **Copy / paste a component or embed between messages** | Discohook users ask, 30 replies, open (F11) | Editor has duplicate within one message (`components.duplicate`) | 4 | 3 | inside | Fits the single-tree editor; a clipboard of `_key`-stripped JSON. |
| S33 | **Timestamp picker** (insert `<t:…:R>` and other formats) | Discohook users ask for relative-timestamp variables, 50 replies, open (F11) | The markdown renderer already renders `discordTimestamp` | 5 | 3 | inside | The preview already shows the result. Only the inserting UI is missing. |

**Reading the table as tiers** (ease × value, Inference):

- **Tier 0 — trust before features (from our own users, F10).** Sign-in and save reliability is not
  an S-item: it is a defect class. It was fixed in `7ce866b`, but there is no telemetry to show
  whether it recurs (Instrumentation Gaps). Next to it sit **S30** actionable errors (ease 5,
  value 4) and **S16** guide and changelog (ease 4, value 5). Statbot's paid DM feature runs
  through this editor (F10.2), which raises the cost of any outage.
- **Tier A — high value, wired or nearly (ease ≥ 4, value ≥ 4):**
  - S1 one-off scheduling (with a timezone, F8)
  - S3 V2 uploads
  - S4 share links
  - S29 non-admin access, at the permission threshold, with a security review
  - S5 webhook management (ease 3, kept here on F10.4)
- **Positioning note (F8, F9, F12).** Editor UX is the second-largest demand in both communities
  (18.2%). Embed Generator only began previewing V2 on 2026-09-21, after its users asked twice.
  The single-tree editor is the lead to put in front of people (S16), and no item here should
  weaken it.
- **Tier B — cheap, distinct, inside the identity:** S31 message as image, S33 timestamp picker,
  S32 copy/paste components, S26 auto-publish, S27 version history, S2 recurring schedule, S9
  templates, S6 competitor-format import, S7 multi-target send, S17 undo/redo, S18 mention picker
  (G5 confirms none exists).
- **Tier C — owner rulings first:**
  - S11 + S12 interactive components and bot sending (Q1). This is the largest demand class in
    both communities, 27.7% of 835 requests (F12), so Q1 is now the most consequential open
    question in this document.
  - S23 paid tier (Q2).
  - S19 flags toggles (W-5).
  - S15 localisation.
- **Tier D — recorded, not recommended on this evidence:** S8 polls, S14 AI drafting (both
  demoted on F12), S10, S13, S20, S21, S22, S24, S25, S28.

## System Weaknesses (bearing on the roadmap, not defects of this question)

| Weakness | Mechanism | Why it matters here |
|---|---|---|
| Scheduling cadence is daily | `vercel.json` `"0 0 * * *"`; Vercel's Hobby plan permits only daily crons, Pro permits per-minute (Inference from Vercel's published limits — not re-read this run; G2) | S1/S2 are worth little at daily granularity; the plan tier is a prerequisite, not a detail. |
| Browser-issued send | `send/page.tsx` → `sendWebhook` → Discord, no server hop | S1, S7, S12 all need a server-side send path; building it once serves three items. |
| No feature telemetry | `track(` 0 files; Vercel Analytics is page-level only | Every value score here is a competitor proxy (G1). |
| Hard-coded copy | 34 externalised strings | S15 is a sweep over hundreds of literals; also why P-1's owner-edited notice could drift again. |
| Stored webhook URL | `ScheduledMessages.webhookUrl` plaintext | S1 stores a credential-bearing URL at rest; `encryption.ts` exists. |

## Instrumentation Gaps

**Normal (always-on, low-volume, structured, no PII):** one event per *send* (mode classic/V2,
target thread/forum/channel, edit vs new, upload count, result code), per *import* (json / link /
code), per *save* (user vs guild), per *mode toggle*. These are the counters the value axis needs
and would turn G1 from a database query into a dashboard. Add one event per **sign-in attempt and
outcome**, and per **save and send failure** with Discord's error code. F10.1 shows sign-in loops
recurring in 2023, 2025 and 2026, each found only when a user posted in support, often days later.
**Debug (opt-in):** none needed for this question.

## Open Questions

| # | Question | Why it is the owner's | What would close it |
|---|---|---|---|
| Q1 | Does Hooks.gg stay "webhooks, no bot required", or does it become a bot that also sends — the precondition for S11/S12/S13/S25? | Product identity; the landing page's own promise | His ruling. Options the record supports: **(a) stay webhook-only** — Tier A + B only; **(b) bot-sending for interactive components, webhook default kept** — S12 then S11, architect consulted on the interaction store (the two endpoints exist); **(c) don't decide now** — Tier A proceeds either way. |
| Q2 | Is a paid tier wanted, and if so gating what? | Monetisation; terms already promise one | His ruling. Competitor pattern (F3): limits, not features — saves (25/100), schedules, actions per component, upload size. |
| Q3 | Is a recurring third-party API cost (AI drafting, S14) acceptable? | Spend | His ruling; EG caps it at a few prompts per server per month. |
| Q4 | ~~Discord servers for this research~~ **Answered.** The owner added the test account to the Hooks.gg, Discohook and Discord Webhook Builder servers; read in F9–F14. Sapphire (`discord.gg/8P43b9xEZS`) and Kraken Cult (`discord.gg/Nm3CypkQaq`) were verified but not requested: general-bot and game-bot communities, low relevance | — | — |
| Q5 | Does the top.gg listing point at `hook.gg`? | One click on his account; top.gg blocks the harness | **You:** open `https://top.gg/bot/1034527356381044828` and read the website field and server count. |
| Q6 | Which Vercel plan runs the website (daily vs per-minute crons)? | Hosting account | **You:** read the project's plan in Vercel; or **Agent:** infer from a deploy log if one is in the record — none found. |

## Remaining Gaps

| # | Unknown | Blocker | Required action | Owner |
|---|---|---|---|---|
| G1 | Hooks.gg usage: users, guilds, messages, V2 share, sends/day, saves near the 1 000 cap | No telemetry; production DB read is gate-bound | **You:** run read-only counts on `Users`, `Guilds`, `Messages` (`valid`, `flags & 32768`, `updatedAt` by month) and hand the numbers back; or sanction a read-only pass | owner |
| G2 | Vercel cron cadence available | Plan unknown | Q6 | owner |
| G3 | Discohook Deluxe limits (unlabelled 10 vs 40 rows) and its server count | Site renders client-side; top.gg 429 | Q4 (announcements) or a manual read of `discohook.app/donate` | owner / researcher |
| G4 | ~~Embed Generator's 2025–26 changes~~ **Resolved 01:52Z → F8** (its own `#changelogs`). Its monthly Premium limits beyond the homepage remain unconfirmed; the Lifetime price ($99.99) is now known | — | — | — |
| G5 | ~~Whether `SlateEditor` has a mention picker~~ **Resolved: none.** `grep -rciE 'mention\|autocomplete\|suggestion'` over `src/components/SlateEditor` and `src/components/DiscordContentEditor` matched 0 files; no `*Picker` component in `src` names mentions, channels or roles | — | — | — |
| G6 | Carl-bot / Dyno / Sapphire embed features | Official pages 403/empty | Low priority: they compete on bot features, not on the editor | — |
| G7 | Five Discohook threads remain short of their card count by 4, 1, 3, 13 and 2 messages (23 in total: `1386327051921002596`, `1361354662347018250`, `1204850552333275197`, `1088485498332393502`, `1051054761232826410`) | All five have a deleted starter. A full down-then-climb walk read each top to bottom. **Hypothesis (Medium):** the card shows Discord's lifetime sent count, which keeps deleted messages, not the live count | Fastest disconfirming test: delete a reply in a test-server forum thread and see whether the card's number drops. If it does not, the hypothesis holds and these five are complete | researcher |
| G8 | 25 threads hold one message more than card + 1 (Embed Generator 2, Discohook `#feature-requests` 19, `#github` 4), and one holds seven more (the 2,071-message V2 thread). Recomputed 04:58 by a script over the merged capture; the 04:56 write had typed "20 + 2 + 4" | Not diagnosed; a separate walk of one thread (`1308982084739793016`) found 55 again, with no system messages | Nothing is lost, so this does not affect completeness; listed so the residue is visible | — |

## Recommendations (investigation only)

1. **Hand to the planner** for Tier 0 and Tier A once the owner selects. These need no ruling
   beyond selection:
   - S30 errors and S16 guide/changelog (the cheapest and most direct responses to F10).
   - S1 one-off scheduling, with G2 settled.
   - S3 V2 uploads.
   - S4 share links.
   - S5 webhook management.

   The planner mints the ID and cites this file. **S29** is plannable too but should carry a
   security-agent review, since it widens who may edit a server's messages.
2. **Put Q1 to the owner first, then Q2.** F12 makes Q1 the most consequential question here:
   interactive actions are the largest demand class in both competitor communities, and our own
   users asked for them in 2023. A plan written against an unanswered Q1 would either stop at link
   buttons or build a bot product he has not chosen.
3. **G1 remains the gap that matters most.** All demand in this document is other products' users,
   plus 60 threads from ours. Read-only production counts would tell whether the editor's users are
   mostly Statbot-routed (F10.2) or standalone, and that would re-weight Tier A against Tier B.
4. **Ask the architect only if Q1 answers (b).** The interaction store and executor for S11 is a
   system-design question (where actions live, how the edge endpoint dispatches them, what the
   bot's token may do per guild), not an implementation one.

## Handoff

Recommend next: **planner** (Tier A, on the owner's selection); **researcher** again (G1 numbers
once provided; Discord channels once Q4 is answered; G4 upstream diff); **architect** (conditional
on Q1 → b). This document is never promoted; a plan cites it by name.
