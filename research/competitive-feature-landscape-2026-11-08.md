---
UUID: 6b1b833a
Status: Active
Status-Detail: >-
  Landscape and scored feature list delivered (Findings F1–F7, Scored list S1–S24). Not Answered:
  the value axis rests on competitor prevalence, not on Hooks.gg usage data (none exists in the
  tree — Gap G1), and two of the highest-value items (S11 interactive components via the bot, S23 a
  paid tier) turn on product-identity rulings only the owner can give (Open Questions Q1, Q2). Stays
  Active until the owner selects a tier of items to plan against, at which point the planner cites
  this document and this one closes Answered.
---

# Research — competitive feature landscape: what competitors offer, where Hooks.gg stands, and which features belong on a roadmap

## Changelog

| When (UTC) | Who | What | Result |
|---|---|---|---|
| 2026-11-08T01:40 | researcher | Document created from five web sweeps, two reference clones and a read of the `website` tree at `7ce866b` | Status: Active |

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
| Templates / gallery | ✗ (one canned intro) | ? | ? (helper unconfirmed) | ✓ marketplace |
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
| S4 | **Share link (read-only / copy-to-my-account)** | Discohook, EG | `ShareableLinks` table (F2); `/preview` route renders any message; Redis-code pattern | 4 | 4 | beside | A public page rendering the single tree in preview mode plus a "Copy to my messages" action; commented-out `expires`/`restrictions` columns show the owner already sketched the scope. |
| S5 | **Webhook create / rename / delete in the UI** | Discohook, WebhookStudio | Read side exists (`/guilds/{id}/webhooks` via bot) | 3 | 3 | beside | Rename/avatar via the webhook token needs no new scope; **create/delete need the bot's `MANAGE_WEBHOOKS`** — invite scope check first (`INVITE_URL` in `src/constants`). |
| S6 | **Import Discohook / Embed Generator formats** (JSON and share links) | EG ships a Discohook migration guide | JSON import with D17 disposition exists | 4 | 3 | beside | Acquisition lever against F7's zero footprint. Discohook backup JSON wraps `messages[].data`; map once. |
| S7 | **Send to several webhooks / channels at once** | Discohook "Add Webhook" | `sendWebhook` takes one webhook | 4 | 3 | beside | Loop + per-target result; `recentWebhookId` becomes a list or stays "last". |
| S8 | **Polls** | Webhook Builder, WebhookStudio | `poll` is in the webhook body (`RESTPostAPIWebhookWithTokenJSONBody`, discord-api-types `32975ae`); nothing here | 3 | 3 | inside | Neither major competitor confirmed — a possible differentiator. Needs preview rendering and a classic-only constraint (polls cannot combine with V2). |
| S9 | **Templates / starter gallery** | WebhookStudio marketplace; EG "explore" (unconfirmed) | One canned intro (`copyIntroMessage.ts`), `PresetDialog.tsx` | 3 | 3 | beside | Curated set first (announcement, rules, welcome, patch notes); community gallery is a moderation commitment — owner call. |
| S10 | **Forum `applied_tags`** | none confirmed | `thread_name` supported; tags not | 4 | 2 | beside | Tag list comes with the forum channel the bot already lists. |
| S11 | **Interactive components with actions** (non-link buttons, select menus → role toggle, reply, DM) | Discohook (free, flows), EG (10 action types) | Bot interaction endpoints exist (`interactions-edge`/`-server`) but handle 2 commands; link buttons only in editor | 1 | 5 | inside (editor) + new (bot) | **Webhooks cannot send interactive components — only an application can**, so this requires S12 and a bot-side action store/executor. Highest-value gap and the identity question (Q1). |
| S12 | **Send as the bot into a channel** (no webhook) | Discohook, EG, Webhook Builder | Bot token present server-side; `getApi()` used for reads | 2 | 3 | beside | Prerequisite of S11; moves send server-side (today it is browser-issued — Runtime Flow 2), which also changes the error surface. Needs `SEND_MESSAGES` per channel and a permission check UI. |
| S13 | **Variables / placeholders** (`{user}`, `{server}`) | Discohook, EG | none | 3 | 2 | inside | Meaningful only with S11/S12 or welcome triggers; for webhook sends they can only resolve at send time to the sender. |
| S14 | **AI drafting assistant** | EG (few free prompts), Webhook Builder | none | 3 | 3 | beside | Recurring API cost → owner decision (Q3); output must land in the editor's own shape (`stripKeys`-safe) — the D17 import disposition already provides the landing path. |
| S15 | **Localised UI** | Discohook (~12 languages), Webhook Builder (EN/RU) | 34 labels in `lang/`; `fr.json` mirrors them; everything else hard-coded | 2 | 3 | across | String extraction across every page; the `lang/build` pipeline exists, so the cost is sweep, not infrastructure. |
| S16 | **Public guide + changelog + listing hygiene** | all three majors | none on hooks.gg (F7) | 4 | 4 | beside (site) | Not product code, but the cheapest value on the list given zero third-party presence; includes verifying the top.gg URL (Q5). |
| S17 | **Undo / redo** | EG | none (0 hits) | 3 | 3 | inside | Slate has per-editor history; a message-level history over `MessageProvider` state is the real item. |
| S18 | **Mention / channel / emoji autocomplete picker** | EG `EditorMentionPicker` | Rendering rules exist; `EmojiPicker` exists; no `@`/`#` picker found in `SlateEditor` (Hypothesis — confirm by reading `SlateEditor/index.tsx`) | 3 | 3 | inside | The bot already supplies channels and roles for the guild. |
| S19 | **Silent message / suppress-embeds toggles** (`flags` 4096, 4) | Discohook "Flags" section | pass-through only | 5 | 2 | beside | **Bound by W-5**: adding a UI opinion on another flags bit is a product decision needing his ruling, however small the code. |
| S20 | **Export to discord.js / discord.py code** | embed.dan.onl, Webhook Builder | JSON export exists | 4 | 2 | beside | Developer audience, off the community-builder positioning. |
| S21 | **Multi-message document** (several messages, sent in order) | Discohook | one message per record | 2 | 3 | across | Touches schema (`Messages.data` is one message), save path, send loop and preview images. |
| S22 | **Message organisation** (search, folders, tags) at 1 000 cap | — | sort + grid/list | 3 | 2 | beside | Low until the cap is approached; G1 would tell. |
| S23 | **Paid tier** | Discohook $6, EG $4.99, WebhookStudio $2.99 | Terms promise one; nothing in code | 2 | — | across | Not scored for value: it is a monetisation decision (Q2), and competitors gate *limits* (saves, schedules, actions), not features. |
| S24 | **Real-time collaborative editing** | none | Pusher staleness notice only | 1 | 2 | inside | W-6 rules this a new product decision; no competitor has it; listed to record that it was considered. |
| S25 | **Welcome / leave triggers, reaction roles** | Discohook, Carl-bot, MEE6, Sapphire | none | 1 | 2 (for this identity) | new (bot) | General-bot territory; only coherent after Q1 answers "yes" to becoming a bot product. |

**Reading the table as tiers** (ease × value, Inference):

- **Tier A — finish what is wired (ease ≥ 4, value ≥ 4):** S1 scheduled one-off, S3 V2 uploads,
  S4 share links, S16 guide/changelog/listing.
- **Tier B — adjacent, inside the identity (ease 3–4, value 3–4):** S2 recurring schedule, S5
  webhook management, S6 competitor-format import, S7 multi-target send, S8 polls, S9 templates,
  S14 AI drafting (cost ruling), S17 undo/redo, S18 pickers.
- **Tier C — owner rulings first:** S11 + S12 interactive components and bot sending (Q1), S23 paid
  tier (Q2), S19 flags toggles (W-5), S15 localisation (large sweep, moderate value).
- **Tier D — recorded, not recommended on this evidence:** S10, S13, S20, S21, S22, S24, S25.

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
and would turn G1 from a database query into a dashboard. **Debug (opt-in):** none needed for this
question.

## Open Questions

| # | Question | Why it is the owner's | What would close it |
|---|---|---|---|
| Q1 | Does Hooks.gg stay "webhooks, no bot required", or does it become a bot that also sends — the precondition for S11/S12/S13/S25? | Product identity; the landing page's own promise | His ruling. Options the record supports: **(a) stay webhook-only** — Tier A + B only; **(b) bot-sending for interactive components, webhook default kept** — S12 then S11, architect consulted on the interaction store (the two endpoints exist); **(c) don't decide now** — Tier A proceeds either way. |
| Q2 | Is a paid tier wanted, and if so gating what? | Monetisation; terms already promise one | His ruling. Competitor pattern (F3): limits, not features — saves (25/100), schedules, actions per component, upload size. |
| Q3 | Is a recurring third-party API cost (AI drafting, S14) acceptable? | Spend | His ruling; EG caps it at a few prompts per server per month. |
| Q4 | May the harness account read Discord servers for this research? | Outside the repo | **You:** add the harness account to (i) the Hooks.gg support server — `https://discord.gg/Yf7We6k2Nb` (`SUPPORT_LINK`, `src/constants/index.ts`), whose feedback channels are the only first-party source of user requests; (ii) Discohook's and Embed Generator's support servers — their announcement channels carry feature velocity the web sweeps could not date (I have no verified invite for either; both sites expose a `/discord` redirect that I did not follow). A follow-up researcher pass would read announcements and feature-request channels only. |
| Q5 | Does the top.gg listing point at `hook.gg`? | One click on his account; top.gg blocks the harness | **You:** open `https://top.gg/bot/1034527356381044828` and read the website field and server count. |
| Q6 | Which Vercel plan runs the website (daily vs per-minute crons)? | Hosting account | **You:** read the project's plan in Vercel; or **Agent:** infer from a deploy log if one is in the record — none found. |

## Remaining Gaps

| # | Unknown | Blocker | Required action | Owner |
|---|---|---|---|---|
| G1 | Hooks.gg usage: users, guilds, messages, V2 share, sends/day, saves near the 1 000 cap | No telemetry; production DB read is gate-bound | **You:** run read-only counts on `Users`, `Guilds`, `Messages` (`valid`, `flags & 32768`, `updatedAt` by month) and hand the numbers back; or sanction a read-only pass | owner |
| G2 | Vercel cron cadence available | Plan unknown | Q6 | owner |
| G3 | Discohook Deluxe limits (unlabelled 10 vs 40 rows) and its server count | Site renders client-side; top.gg 429 | Q4 (announcements) or a manual read of `discohook.app/donate` | owner / researcher |
| G4 | Embed Generator premium limits beyond the homepage; its 2025–26 changes (clone is 2025-11-13) | Premium page redirected to the App Directory | `git -C ../embed-generator fetch` and diff the clone's `EditorComponent*`/`ActionType*` against upstream — a researcher pass, read-only on a reference clone | researcher |
| G5 | Whether `SlateEditor` has any mention/channel picker (S18 is a Hypothesis) | Not read this run | Read `src/components/SlateEditor/index.tsx` (5.5 K) | researcher / planner |
| G6 | Carl-bot / Dyno / Sapphire embed features | Official pages 403/empty | Low priority: they compete on bot features, not on the editor | — |

## Recommendations (investigation only)

1. **Hand to the planner** for Tier A once the owner selects it — S1 (with G2 settled), S3, S4,
   S16 are plannable now against this document and need no ruling beyond selection; the planner
   mints the ID and cites this file.
2. **Put Q1 and Q2 to the owner before anything in Tier C is planned**; a plan written against an
   unanswered Q1 would either stop at link buttons or build a bot product he has not chosen.
3. **A short researcher pass after Q4** — reading the Hooks.gg support server's feedback channels
   and the competitors' announcement channels — is the one thing that would replace the competitor
   proxy with the product's own users' voices, and would re-rank Tier B.
4. **Ask the architect only if Q1 answers (b)**: the interaction store and executor for S11 is a
   system-design question (where actions live, how the edge endpoint dispatches them, what the
   bot's token may do per guild), not an implementation one.

## Handoff

Recommend next: **planner** (Tier A, on the owner's selection); **researcher** again (G1 numbers
once provided; Discord channels once Q4 is answered; G4 upstream diff); **architect** (conditional
on Q1 → b). This document is never promoted; a plan cites it by name.
