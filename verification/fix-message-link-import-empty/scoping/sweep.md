# Scope sweep: Discord message fields empty on Message Link import

Scope: read-only sweep for steering-hooks. No repository edited, nothing committed, no tests, servers or network calls. Code read at `origin/master` of each code repo (website `b663b354fb236c3ee58d8b0be01778e1908e0e10`). Record read from the working tree of `agent-output` (branch `master`), `architecture/`, `research/`, `planning/`, `handoff/`, `roadmap/` only.

Coverage status: `website` swept; `project-utils` swept (no Discord calls); `preview-image-generator` NOT COMPLETED (see Instruments I14).

## Property

A Discord message read from Discord's API through the app's bot comes back with its `content`, `embeds` or `components` empty or missing, although the original message has them. Users then get an empty draft when they import another author's message.

## Instruments

Each count carries its command. Each predicate lists what it cannot see.

- **I1** `git -C /usr/local/bin/hooks/website grep -n -E "/channels/|channels\.messages|getMessage|fetchMessage|DISCORD_BOT_TOKEN|Bot |/webhooks/|GatewayIntentBits|MessageContent|intents" origin/master -- src`. Region: website `src/`, tests included. Cannot see: paths built by concatenation or from a variable; the `Bot` header that paracord assembles internally (library is outside the repo); case variants (the pattern is case-sensitive; I2 covers case-insensitive intent terms). `getMessage` also matches local helpers (`src/providers/MessageProvider/index.tsx:36`) and the DB helper (`src/server/api/utils/shared.ts:157`).
- **I2** `git -C /usr/local/bin/hooks/website grep -c -i -E "intents?|GatewayIntent|MessageContent|MESSAGE_CONTENT|gateway" origin/master`. Region: whole website repo, tests included. Result: 4 files: `src/components/DiscordMessageEditor/index.tsx:4`, `src/constants/messageLimits.ts:1`, `src/server/api/utils/shapes.ts:2`, `src/utils/limits.tsx:2`. All are `MAX_MESSAGE_CONTENT_LENGTH` identifiers. No gateway client and no intent setting. Cannot see: the Discord developer portal's toggle, production env values, untracked files.
- **I3** `git -C /usr/local/bin/hooks/website grep -c -E "GatewayIntentBits|MessageContent|intents" origin/master`. Case-sensitive. Result: `src/components/DiscordMessageEditor/index.tsx:2` (`setMessageContent` only).
- **I4** `git -C /usr/local/bin/hooks/project-utils grep -c -i -E "intents?|GatewayIntent|MessageContent|MESSAGE_CONTENT|gateway|paracord|channels/|DISCORD_BOT_TOKEN|api/v10" origin/master`. Region: whole repo. Result: no matches (exit 1). Its `discord`/`messages` hits (`git -C /usr/local/bin/hooks/project-utils grep -n -i -E "discord|messages" origin/master`) are Prisma enum and table names and generated types only. Cannot see: any runtime use of project-utils by website.
- **I5** `git -C /usr/local/bin/hooks/website grep -c -E "/messages/\\$\{" origin/master -- src ':!*__tests__*'`. Result: `src/server/api/routers/message.ts:1`, `src/utils/constructWebhookUrl.ts:1`, `src/utils/hooks/useValidateWebhook.ts:1`. Cannot see: template strings with the segment split across variables.
- **I6** `git -C /usr/local/bin/hooks/website grep -c -E "/messages[/?\"'\`]|/channels/|/webhooks/|getMessages?\(|fetchMessages?\(" origin/master -- . ':!*__tests__*'`. Result: 11 files (NewMessageModal.tsx:3, Header.tsx:1, `f/[id]/page.tsx`:2, EditMessageMenu.tsx:1, WebhookMenu/index.tsx:1, MessageProvider/index.tsx:2, message.ts:3, shared.ts:2, constructWebhookUrl.ts:1, useValidateWebhook.ts:1, redis/index.ts:1). The non-Discord lines were checked with `git grep -n` on the Header, page, MessageProvider and shared files: they are `refetchMessages` and local `getMessage` helpers. Cannot see: the paracord library's own endpoint strings.
- **I7** `git -C /usr/local/bin/hooks/website grep -c "getApi()" origin/master -- src ':!*__tests__*'`. Result: `src/pages/api/cron.ts:1`, `src/server/api/routers/message.ts:1`, `src/utils/redis/index.ts:5` (7 bot-token call sites). Cannot see: a bot client obtained another way (only `getApi` is the constructor path in `src/utils/discord.ts`).
- **I8** `git -C /usr/local/bin/hooks/website grep -c "with_components" origin/master -- src bot`. Result: `src/utils/sendWebhook.ts:1`, the only use, on a write path.
- **I9** `git -C /usr/local/bin/hooks/website grep -n -E "discordResponseToMessage|messageStore\.(store|retrieve)|getApi\(|\.request<|\.request\(" origin/master -- src`. Converter and store callers. Cannot see: calls through an alias or a re-export.
- **I10** `git -C /usr/local/bin/hooks/website grep -n -E "getFromUrl|getFromCode|useValidateWebhook\(|messages/codes|useValidateWebhook'" origin/master -- src bot ':!*__tests__*'`. Client callers.
- **I11** `git -C /usr/local/bin/hooks/website grep -n -E "resolved|messages\[|get-message|GetMessage|messageStore" origin/master -- . ':!*__tests__*'`. Interaction-payload path.
- **I12** `git -C /usr/local/bin/hooks/website show origin/master:<path> | sed -n '<range>p'` over: `src/server/api/routers/message.ts` 1-260; `src/utils/discord.ts`; `src/utils/redis/index.ts` 320-350; `src/utils/discordResponseToMessage.ts` 1-160; `src/utils/redis/messageStore.ts`; `bot/serverCommands.ts` 1-60; `bot/edgeCommands.ts` 25-75; `src/pages/api/interactions-server.ts` 1-40; `src/utils/hooks/useValidateWebhook.ts` 1-90; `src/pages/api/cron.ts` 1-50; `src/pages/api/messages/codes/[code].ts`; `src/providers/WebhookProvider.tsx` 95-130; `src/utils/sendWebhook.ts` 55-95; `src/app/message/_components/NewMessageModal.tsx` 80-130. `src/server/api/utils/guild.ts` was checked only with `git show origin/master:src/server/api/utils/guild.ts | grep -n -E "getGuildMessages|discord|api\.|request"` (commented-out fetch at :37, definition at :48).
- **I13** Record: `git -C /usr/local/bin/hooks/agent-output grep -c -i -E "getFromUrl|getFromCode|Message Content|MESSAGE_CONTENT|\bintents?\b" -- architecture research planning handoff roadmap` (25 files, listed under Record hits). `git -C /usr/local/bin/hooks/agent-output grep -c -i -E "getFromUrl|getFromCode|Message Content|MESSAGE_CONTENT|\bintents?\b" -- roadmap` returned no match (exit 1); `roadmap/` exists. Case-sensitive: `git -C /usr/local/bin/hooks/agent-output grep -c "MESSAGE_CONTENT" -- architecture research planning handoff roadmap` returned no match (exit 1); `... grep -c "Message Content" ...` returned 2 files (handoff/message-link-import-returns-empty-message-2026-11-21.md:2, handoff/closed/fix-import-save-conflict-post-deploy-2026-11-21.md:1). `... grep -c "getFromUrl" ...` 33 lines in total, `... grep -c "getFromCode" ...` 6 lines in total (the per-file listing is in Record hits). The `-i` pass also matches prose "message content" in four documents, which are not the Discord term.
- **I14 (not completed)** A search of `/usr/local/bin/hooks/preview-image-generator` at `origin/master` for the I1 predicate was not completed. Region covered: none. Not re-issued.
- **I15** Premises: `git -C /usr/local/bin/hooks/website rev-parse origin/master`; `git -C /usr/local/bin/hooks/website log --oneline -3 origin/master -- src/server/api/routers/message.ts src/utils/discord.ts`; `git -C /usr/local/bin/hooks/website cat-file -t b829314`; `git -C /usr/local/bin/hooks/website diff --numstat b829314 origin/master -- src/server/api/routers/message.ts src/utils/discord.ts`; `git -C /usr/local/bin/hooks/website diff b829314 origin/master -- src/server/api/routers/message.ts`.

## Sites

Format: `repo:path:line`, procedure or route, credential, copy or filter.

**Discord message reads (fetch or payload)**

- **S1** `website:src/server/api/routers/message.ts:115`: `getApi().request<Message>('GET', /channels/${channelId}/messages/${messageId}, { validateStatus: null })`.
  - Serves: tRPC `message.getFromUrl` (`message.ts:89`, query, zod URL regex). Caller: `website:src/app/message/_components/NewMessageModal.tsx:89`, enabled for `loadOption === 'bot'`, a link match, no webhook, and a session.
  - Credential: bot token. `website:src/utils/discord.ts:13` `new Api(env.DISCORD_BOT_TOKEN)`; `website:src/env.mjs:24,66`.
  - Copy or filter: the response goes to `discordResponseToMessage` (`message.ts:119`).
    - `content`: copied verbatim (`website:src/utils/discordResponseToMessage.ts:126`).
    - `embeds`: kept only when `type === 'rich'` (`discordResponseToMessage.ts:127`), then rebuilt field by field (`:128-146`).
    - `components`: filtered by `SUPPORTED_TOP_LEVEL_TYPES` and the link-button rule (`:122`, filter functions `:41-115`); omitted when empty (`:155`).
  - Also gated: `redis.fetchChannel` (`message.ts:103-111`) checks the channel's guild. That is a channel read, not a message read.
- **S2** `website:src/utils/redis/index.ts:336`: `GET /channels/${channelId}`, bot token, channel object only. Reached from S1's guild gate. Carries no message fields.
- **S3** `website:src/utils/redis/index.ts:264,297,298,371` and `website:src/pages/api/cron.ts:13`: other bot-token reads (guild, guild channels, active threads, guild webhooks). Not message reads.
- **S4** `website:src/utils/hooks/useValidateWebhook.ts:56`: client `fetch(${url}/messages/${messageId})` on the user's webhook URL `/webhooks/{id}/{token}/messages/{id}`. Credential: webhook token; no bot token. Copy or filter: `discordResponseToMessage(msg)` at `:62`, same filters as S1. Caller: `NewMessageModal.tsx:84`. No server route, no tRPC.
- **S5** `website:src/providers/WebhookProvider.tsx:107`: client `fetch(constructWebhookUrl(selectedWebhook, messageId, threadId))`. URL from `website:src/utils/constructWebhookUrl.ts:1` (`/webhooks/{id}/{token}/messages/{oldMessageId}?wait=true[&thread_id]`); no method is given, so it is a GET. Credential: webhook token. Copy or filter: none. `res.json()` (`:108`), then `{ ...data, username: data.author.username }` into `makeEditable` (`:108-113`). This is the only read that passes the Discord response through with no filter. Consumer: the provider's `oldMessage` state; consumers beyond the provider were not traced.
- **S6** `website:bot/serverCommands.ts:28`: `data.resolved.messages[data.target_id]`, the `get_message` message command. Not a REST read; the message comes from the interaction payload, so no bot-token read happens here. Route: `website:src/pages/api/interactions-edge.ts:65-66` → `website:bot/edgeCommands.ts` `get_message` (POST of `JSON.stringify(interaction)` with `x-hooks-api-token`) → `website:src/pages/api/interactions-server.ts:16-17` → `serverCommands.get_message` (`:28`) → `messageStore.store` (`:33`). Copy or filter: `website:src/utils/redis/messageStore.ts:15` runs `discordResponseToMessage`, so the same filters as S1 apply. The declared type `ResolvedMessage` (`website:src/@types/global.d.ts:515`) picks `id, channel_id, embeds, content, author` and omits `components`; the runtime payload was not verified. The interactions-edge signature check was not read.

**Consumers of stored messages (no Discord read)**

- **S7** `website:src/server/api/routers/message.ts:145-160` `message.getFromCode`, reads the Redis store via `messageStore.retrieve` (`:195`), written by S6. Also a dev-only fixture write at `:149`. Returns stored data verbatim. Callers: `NewMessageModal.tsx:98`, `website:src/providers/MessageProvider/index.tsx:149`.
- **S8** `website:src/pages/api/messages/codes/[code].ts:20`: GET returns `messageStore.retrieve(code)` verbatim.

**Writes, not reads (listed for the bot-token and webhook caller sets)**

- **S9** `website:src/pages/api/cron.ts:46`: bot-token `api.request('post', webhookUrl, { data })` to stored webhook URLs.
- **S10** `website:src/utils/sendWebhook.ts` (lines 55-95): webhook POST or PATCH; `with_components=true` is set at `:72` when the V2 flag is on; the response is read only for `id` and `channel_id`.
- **S11** `website:bot/scripts/publishAppCommands.ts:14,19`: bot token for command publishing.

**DB readers (name matches, no Discord request)**

- `website:src/server/api/utils/shared.ts:157` `getMessage`; `website:src/server/api/utils/guild.ts:48` `getGuildMessages` (partial check, see I12).

**Gateway and intents**

- None in `website` or `project-utils` (I2, I3, I4). There is no gateway client. The bot is HTTP interactions (S6) plus REST through `paracord`, a GitHub-pinned dependency (`website:package.json:126`, `"paracord": "github:mr-tech/paracord"`). The Message Content intent therefore cannot be configured in this code; any setting lives in Discord's developer portal, which is outside the repo.

**Filter summary (for the property)**

- Only `website:src/utils/discordResponseToMessage.ts` transforms the message between Discord and the editor (S1, S4, S6). `content` is never changed. `embeds` drop every non-`rich` type. `components` drop unsupported types and non-link buttons.
- So a code-side filter can explain missing `embeds` or `components`, but no code path empties `content`. An empty `content` in an import means the response (or the read) carried `""`. The handoff's direct production read showed that.

## Record hits

Scope: `architecture/`, `research/` (open and `closed/`), `planning/` (incl. `closed/`), `handoff/` and `roadmap/`, `verification/` and `steering/` excluded. Command: `git -C /usr/local/bin/hooks/agent-output grep -c -i -E "getFromUrl|getFromCode|Message Content|MESSAGE_CONTENT|\bintents?\b" -- architecture research planning handoff roadmap`. 25 files. `roadmap/` has none.

**Mechanism: Discord-side blanking or the Message Content intent**

- `handoff/message-link-import-returns-empty-message-2026-11-21.md` (6 hits; Status Open; lines 4, 6, 17, 18, 24, 26). PD-1 record: production `getFromUrl` returned `content ""`, no embeds, no components for two fixture messages. Cause not established; the Message Content intent is "an inference"; whether the production bot has the intent is "unread". If it holds, every import of another author's message is empty. Review-trigger names chain `fix-message-link-import-empty` and edits to `getFromUrl` or `src/utils/discord.ts`. Cites `message.ts:116` and `discord.ts:12-17` at `b829314`; at `origin/master` those lines are `message.ts:115` and `discord.ts:13`.
- `handoff/closed/fix-import-save-conflict-post-deploy-2026-11-21.md` (5 hits; lines 18, 76, 77, 79, 104). PD-1 falsified the Message Link limb: production `getFromUrl` answered 200 with `content ""`, `embeds []` and no components for both fixtures; the V2 one kept `flags: 32768`. Line 79: "fits Discord blanking content for an app without the Message Content intent, but this is an inference, unverified". Sent to steering-hooks as owner-needing.
- `research/competitive-feature-landscape-2026-11-08.md` (3 hits; lines 151, 166, 447). Line 151 lists the bot-based message-link import (`getFromUrl`) as an import feature. Line 447 is a competitor waiting on Discord's privileged-intent approval; not this app's configuration.

**getFromUrl, converter or population description**

- `research/closed/components-v2-editing-flows-2026-08-23.md` (1 hit, line 143). Row 11: a V2 Discord message imports as `{"username":"Hook","content":"","embeds":[]}` through `getFromUrl` → `discordResponseToMessage`, with the converter "reads content/embeds only". Does not match origin/master, which copies `components` (`discordResponseToMessage.ts:155`). The V2 case is one where empty `content` is the record's own expectation (flag 32768); whether Discord permits `content` on a V2 message was not verified here.
- `planning/closed/013-components-v2-editing-surfaces.md` (4 hits; lines 200, 236, 292, 293). Line 200 states the premise: "The Discord API returns `components` and `flags` on a fetched message without a request parameter (`getFromUrl` uses `GET /channels/{c}/messages/{m}`)". Line 236 lists `getFromUrl` and `getFromCode` as touched. Lines 292-293 define M3-a (preserve supported components) and M3-b (report residue of unsupported types) over Discord API messages.
- `planning/closed/015-bug-evaluation-fixes.md` (16 hits). D26 widens `DISCORD_MESSAGE_LINK_REGEX` so `getFromUrl` accepts discordapp.com links. D27 / CR-12 is the cross-server read rider on `getFromUrl` (guild binding of the fetched message, lines 578-602). No statement of field blanking.
- `architecture/website.md` (10 hits). A-5 (lines 274, 282): bot-token reads are bound to the authorised guild; `message.getFromUrl` was the one unbound instance (CR-12). Other hits (lines 12, 14, 241, 286, 299, 300, 326, 360) are owner-intent or agent-design grades.
- `architecture/system-architecture.md` (8 hits). Line 135 restates the guild binding for bot-token reads and names `message.getFromUrl`. Other hits (lines 45, 47, 167, 211, 222, 302, 319) are design-intent or preview-generator prose.
- `architecture/closed/015-bug-evaluation-fixes-architecture-findings.md` (4 hits). Line 308: the architect read every bot-token call at `6001f7f` with `git grep -n "getApi()"` over `src` and classed each as guild-scoped; `getFromUrl` included. Lines 330 and 338: consumers of the D26 regex.

**Prose or design-intent only (matched by the term set; no mechanism)**

- `architecture/preview-image-generator.md` (7 hits; lines 95-143): preview-failure intent and grades.
- `architecture/closed/016-send-check-validity-architecture-findings.md` (2 hits; lines 305, 505).
- `planning/closed/012-message-valid-field.md` (5 hits; lines 184, 213, 384, 402, 449).
- `planning/closed/017-existing-items-backlog.md` (1 hit; line 925): log line with no message content.
- `planning/closed/010-infopanel-overlap-fix.md` (1 hit; line 43).
- `planning/closed/008-sub-component-crud-actions.md` (1 hit; line 62).
- `research/codebase-bug-evaluation-2026-11-08.md` (22 hits): "intent vs execution" defect table. No row names `getFromUrl`, `getFromCode`, Message Content or the Discord intent; the word is design intent.
- `handoff/bug-evaluation-fixes-unclosed-assumptions-2026-11-08.md` (1 hit; line 6): review-trigger lists `getFromUrl` among surfaces.
- `handoff/closed/newmessagemodal-persist-gate-choice-unreachable-2026-08-27.md` (1 hit; line 34): a test drives `loadedMessage` through `getFromCode` query data.
- `handoff/closed/architecture-record-reconciliation-owed-2026-11-10.md` (1 hit; line 38): "intent" for project-utils.
- `handoff/closed/components-v2-editing-support-2026-08-23.md` (1 hit; line 23): prose "message content".
- `handoff/pusher-message-update-channels-are-public-2026-11-19.md` (1 hit; line 20): prose.
- `handoff/open-content-editor-text-not-drafted-until-close-2026-11-20.md` (1 hit; line 19): "user-facing intent".
- `handoff/closed/unsaved-change-guards-disabled-for-unauthenticated-users-2026-08-24.md` (1 hit; line 109): design intent.
- `handoff/closed/preview-image-failure-shows-broken-not-stale-2026-08-24.md` (1 hit; line 55): design intent.
- `handoff/closed/message-valid-field-for-statbot-2026-08-23.md` (1 hit; line 102): prose "message content".

Not a hit: `handoff/preview-image-generator-host-security-posture-2026-11-08.md` contains the word "privileged" in another sense and matches none of the terms.

## Premises

- `origin/master` of website is `b663b354fb236c3ee58d8b0be01778e1908e0e10` (`git -C /usr/local/bin/hooks/website rev-parse origin/master`).
- Last three commits touching `message.ts` or `discord.ts` (`git -C /usr/local/bin/hooks/website log --oneline -3 origin/master -- src/server/api/routers/message.ts src/utils/discord.ts`):
  - `b663b35` fix(website): an absent message number answers not found whichever kysely build raised, and the not-found edi...
  - `6b539e5` fix(website): a message the signed-in user cannot load answers one not found, and its edit and send pages sho...
  - `532c0ee` feat(website): every save list refuses an over-limit length with one issue before validating its elements, an...
- The handoff's commit `b829314` exists. `git diff --numstat b829314 origin/master -- src/server/api/routers/message.ts src/utils/discord.ts` lists `message.ts` only (3 insertions, 4 deletions). The diff touches only the not-found mapping (`NoResultError` → `MessageNotFoundError`). The `getFromUrl` fetch is unchanged, and `discord.ts` is unchanged in that range.
- Handoff premise "content is copied verbatim": confirmed (`discordResponseToMessage.ts:126`).
- Handoff premise "GET /channels/{c}/messages/{m} with DISCORD_BOT_TOKEN": confirmed (`message.ts:115`, `discord.ts:13`). Line numbers differ from the handoff's citation (`message.ts:116`, `discord.ts:12-17`), which was read at `b829314`.
- Handoff premise "Message Content intent": unverifiable from code. There is no intent or gateway configuration in the repos, so the setting, if any, is in Discord's developer portal. The record calls it an inference; nothing in the code contradicts or confirms it.
- Inference from the code: no transform in the repo changes `content`, so a blank production `content` is a property of the API response or the read, not the converter. The handoff's direct production read (`verification/fix-import-save-conflict/qa/pd1/evidence/getFromUrl-direct-read.json`, cited in the handoff) is in `verification/`, which I did not open.

## What the sweep did not cover

- `preview-image-generator`: the whole repo (I14, not completed).
- Discord's developer portal intent setting for the production bot, and any live read on the test server. Not run (no network, per brief).
- `paracord` source (`github:mr-tech/paracord`, outside the repo tree). Not read; its handling of `validateStatus: null` and of the response body is unverified.
- `verification/` and `steering/` in the record: excluded per the brief. One count line from `verification/` appeared in an exclusion check I ran (`git -C /usr/local/bin/hooks/agent-output grep -c -i -E "getFromUrl|getFromCode|Message Content|MESSAGE_CONTENT|\bintents?\b" -- verification steering`); it is not reported as a record hit and was not read.
- Record documents were read by matched line via `git grep -n`, not in full, except `handoff/message-link-import-returns-empty-message-2026-11-21.md` (read at HEAD). Planning 013 and 015 and the fix-import handoff were not read in full.
- Consumers of `WebhookProvider`'s `oldMessage` state (S5) beyond the provider were not traced. The `NewMessageModal` settle and `resolveContentLoss` path was not traced, nor the draft-building path after `loadedMessage`.
- The interactions-edge signature verification and the runtime shape of `resolved.messages` (S6) were not read.
- Predicate blind spots (I1, I5, I6, I7): paths built by concatenation or variables; paracord-internal routes; case variants outside I2/I3; name collisions (`getMessage`, `refetchMessages`).
- No tests were run, no servers started, no network calls made.
