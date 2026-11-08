---
UUID: 7d2e4a91
Status: Active
Status-Detail: >-
  Sweep complete over website, project-utils and preview-image-generator at the SHAs in § Context.
  50 rated findings (F-1–F-50), every one read at the code by the researcher; the two SQL-shape
  defects and the code-block regex were proven by execution. Eight editor hypotheses (H-1–H-8) need a
  running editor and are listed with their disconfirming tests, not counted. Three intent questions
  stay with the owner (§ Open Questions). Nothing here is fixed; this is a research document, and
  it stays Active until the owner's three answers land and the hypotheses are run.
---

# Codebase bug evaluation — intention vs execution, rated for ease of fix and severity

## Changelog

| Date | Agent | Change | Status |
|---|---|---|---|
| 2026-11-08T01:34 | researcher | Created; question stated; sweep begun | Active |
| 2026-11-08T01:48 | researcher | Findings 1–5 and 7, ratings, open questions and gaps written; editor-component sweep pending | Active |
| 2026-11-08T01:50 | researcher | Editor sweep folded in (F-38–F-50, H-1–H-8); typecheck result recorded; G-2 resolved, G-5 added | Active |

## Question

What bugs exist across the three source repositories of the `/usr/local/bin/hooks` workspace
(`website`, `project-utils`, `preview-image-generator`), judged as **intention vs execution** — the
code evidently means to do X and does Y — and how does each rate, 1–10, for **ease of fix** and
**severity**? This is not a security assessment (owner's instruction, 2026-11-08): exposure findings
appear only where they are also a plain intent/execution mismatch, and are rated on that basis.

## Context

- Trees read: `website` `7ce866b` (branch `master`), `project-utils` `749606d`, `preview-image-generator`
  `471578f` (branch `prod`, which the architecture record says is the deployed commit).
- Architecture records read: `architecture/system-architecture.md`, `architecture/website.md`,
  `architecture/preview-image-generator.md`. **No roadmap document exists** (`roadmap/` holds only
  `.gitkeep`); findings are aligned with the Master Product Objective as the README states it — a
  WYSIWYG Discord message builder that sends through webhooks — and nothing further is inferred.
- Eleven open handoffs under `agent-output/handoff/` already record defects. Those are **cited, not
  re-rated** (§ Findings 7); every rated finding below is new to the record unless it says otherwise.
- The owner's mid-run instruction: *"this is not a security assessment. The bugs should be evaluated
  as intention vs execution."*

### Rating scales

- **Ease of fix** — 10: a one-token or one-line change whose correct form is unambiguous; 7–9: a
  local change inside one function or component, no design choice; 4–6: touches several call sites
  or needs a small design decision; 1–3: cross-module or needs an owner ruling first.
- **Severity** — 10: data loss or outage for every user; 7–9: a core flow broken for a class of
  users; 4–6: a user-visible wrong result on a reachable path; 2–3: wrong behaviour on an edge path
  or degraded feedback; 1: latent (no live caller), cosmetic, or dev-only.

## Methodology

1. Read every server-side, data-path, bot and utility file of `website` myself (`src/pages/api`,
   `src/server`, `src/utils`, `src/kysely-adapter`, `bot/`, `src/env.mjs`, `src/middleware.ts`), and
   every source file of `project-utils` and `preview-image-generator`.
2. Delegated three read-only sweeps of the `website` UI (providers + app pages; hooks + small
   components + lang scripts; DiscordMessageEditor + SlateEditor + markdown) to `general-purpose-sonnet`
   helpers briefed to report defects with the exact code quoted. **Every helper candidate kept below
   was then read at the code by me**; candidates I could not confirm at the code are not here.
3. Instruments run from `website/` after a `pnpm install --frozen-lockfile --ignore-scripts`
   (lockfile byte-identical before and after, `cmp`): `npx vitest run --reporter=json` → **598 tests,
   598 passed, 0 failed, 54 files, process exit 0**; `tsc --noEmit` for both programs from scratch
   configs that omit the `.next/**` include globs (see § Instrumentation Gaps for why) — result
   recorded there.
4. Proofs of concept: Kysely `0.26.1` query compilation with `DummyDriver` for the two SQL-shape
   findings (output quoted in F-1 and F-2). No database, Redis or Discord endpoint was contacted.
5. Reachability of each candidate established by grepping callers (`grep -rn`/`grep -c`), never by
   assuming.

## Findings

Confidence labels follow `analysis-methodology`: **Verified** (executed or compiled, or a reading
where the code admits one meaning), **High-confidence inference** (reading plus a documented library
semantic), **Hypothesis** (stated with its disconfirming test).

### 1. Server and data path (`website`)

| # | Defect — intent vs execution | Where (path — symbol) | Confidence | Ease | Severity |
|---|---|---|---|---|---|
| F-1 | **Cron never selects any scheduled message.** Intent (the Prisma original `error: null`): rows whose `error` IS NULL. Execution: `.where('ScheduledMessages.error', '=', null)` compiles to `"error" = $1` with parameter `null`, which is never true in SQL. POC: `select "id" from "ScheduledMessages" where "ScheduledMessages"."error" = $1 [null]`; the `'is'` form compiles to `is null`. Introduced at `a974c25` ("fix join queries", 2023-08-03). **No code in `website` inserts into `ScheduledMessages`** (`grep -rln ScheduledMessages src bot` → only `cron.ts`, `shared.ts`, `guild.ts`, `global.d.ts`), so the daily Vercel cron (`vercel.json`) runs over an empty candidate set and the defect has no live producer. | `src/pages/api/cron.ts` — `handler` | Verified (compiled) | 10 | 2 |
| F-2 | **Empty-array `in` predicates compile to `in ()`, a Postgres syntax error.** Two reachable sites. (a) `getPartialMessages(userId, guilds)` builds `where "Guilds"."guildId" in ()` when `guilds` is `[]`. `fetchUserGuilds` (`src/utils/redis/index.ts`) keeps only guilds the user owns or administers, so **a signed-in user who administers no server has `session.user.guilds = []`**, and `message.getAll` (the `PartialMessagesProvider` behind header search and the message list) throws on every call for that user. (b) `getUserRecentMessages([])` is reached from `hydratedAuthCallback` whenever `preferences.recentMessageIds` is `[]` (`[]` is truthy, so the `?:` guard does not catch it); today's writers never send `[]`, so (b) is latent. POC: `select "id" from "Messages" where ("Messages"."fk_users_id" = $1 or exists (select … where "Guilds"."guildId" in () and …))`. | `src/server/api/utils/shared.ts` — `getPartialMessages`, `getUserRecentMessages` | SQL shape Verified (compiled); user-visible failure High-confidence inference (no DB here to execute against) | 9 | 5 |
| F-3 | **Sign-out's token revoke sends no token.** `removeUserSession` POSTs to `oauth2/token/revoke` with `client_id` and `client_secret` only; Discord's revoke endpoint requires `token`. Intent: revoke the user's access token at Discord. Execution: Discord answers 400 (response unchecked), the token stays valid until its own expiry; the DB and Redis clear-out still happen. | `src/server/auth.ts` — `removeUserSession` | Verified (reading; the body has no `token` field) | 9 | 3 |
| F-4 | **Message cap is off by one.** `if (!message.id && Number(messageCount) > MAX_MESSAGES)` admits the (MAX+1)th message; the error text says "limit of 1000". | `src/server/api/utils/shared.ts` — `upsertMessage` | Verified | 10 | 1 |
| F-5 | **`userOrDiscordIdShape` anchors only one alternative.** `/^(0\|[0-9]{17,23}$)/` accepts `"0abc"`; downstream `message.get` then treats it as a guild id and fails authorisation, so no wrong data flows — a schema that does not express its intent. | `src/server/api/utils/shapes.ts` — `userOrDiscordIdShape` | Verified | 10 | 1 |
| F-6 | **Client-side env guard never exempts `NODE_ENV`.** `!prop === 'NODE_ENV'` is `false === 'NODE_ENV'`, always false; the intent (T3 template) is `prop !== 'NODE_ENV'`. Latent: no client module reads `env.NODE_ENV` through the proxy (`grep -rln "env.NODE_ENV" src` → server files and `utils/api.ts`, which uses `process.env`). | `src/env.mjs` — proxy `get` | Verified | 10 | 1 |
| F-7 | **Edge interaction handler parses the body before checking the signature.** `JSON.parse(rawBody)` precedes the `isValid` test, so a malformed body returns 500, not the intended 401. | `src/pages/api/interactions-edge.ts` — `handler` | Verified | 10 | 1 |
| F-8 | **`Promise.all` with an inner `await` runs sequentially.** `await Promise.all([access_token ? await redis.fetchUserGuilds(…) : [], messagePromise])` — the guild fetch completes before the array is built. Intent: parallel. | `src/server/auth.ts` — `hydratedAuthCallback` | Verified | 10 | 1 |
| F-9 | **Cookie parser throws on a nameless cookie and truncates values containing `=`.** `const [key, value] = cookie.split('='); … value.trim()` — a cookie segment without `=` yields `value === undefined` → `TypeError` inside a server component (`Redirects/Server.tsx`) that every `/message/*` page renders. The session token it looks for is a UUID, so truncation is not hit today. | `src/utils/parseServerCookies.ts` — default export | Verified (reading) | 9 | 2 |
| F-10 | **Cache stores `null` and can never hit on it.** `getFromCache` writes `JSON.stringify(null)` and `getItem` returns `null`, which `if (cachedItem)` treats as a miss — so every call for an account without a refresh token, or a session with no account, re-queries Postgres and takes the mutex. Intent of the `expireSeconds` cache is defeated for the null case. | `src/utils/redis/index.ts` — `getFromCache`, `getItem` | Verified (reading) | 8 | 1 |
| F-11 | **`getCDNUrl` puts the `/dev` prefix before the port.** `${HOST}/dev:${PORT}` — only when `NEXT_PUBLIC_CDN_PORT` is set in development. | `src/utils/getCDNUrl.ts` | Verified | 10 | 1 |

### 2. Validation and limits (`website`)

| # | Defect — intent vs execution | Where | Confidence | Ease | Severity |
|---|---|---|---|---|---|
| F-12 | **A black embed cannot be saved.** `Picker.hexToInt('#000000')` → `0` → `setColor(0)` → `embed.color = 0`; the save schema's `color: z.number().int().positive()` rejects `0`, so `message.upsert` fails with a Zod error for any embed whose colour is black, while Discord accepts `color: 0` and `containerShape.accent_color` in the same file uses `.min(0)`. Companion slip: `discordResponseToMessage` has `if (e.color) embed.color = e.color;`, so an imported black embed loses its colour. | `src/server/api/utils/shapes.ts` — `embedShape`; `src/utils/discordResponseToMessage.ts` | Verified (reading; `positive()` excludes 0 by definition) | 10 | 4 |
| F-13 | **Embed author name is red-flagged at 81 characters.** `validateEmbedAuthorName` compares against `MAX_NAME_LENGTH` (80, the webhook *username* limit) while the author limit is `MAX_EMBED_AUTHOR_NAME_LENGTH` (256) and the save schema allows 256. `EmbedAuthor.tsx` shows the error state for a name that saves and sends fine. | `src/utils/limits.tsx` — `validateEmbedAuthorName` | Verified | 10 | 2 |
| F-14 | **Title error text says "Name is too long."** in `validateEmbedTitle`. | `src/utils/limits.tsx` — `validateEmbedTitle` | Verified | 10 | 1 |

### 3. Editor pages and providers (`website`)

| # | Defect — intent vs execution | Where | Confidence | Ease | Severity |
|---|---|---|---|---|---|
| F-15 | **Enter on a focused Cancel button runs the confirm action.** `if (document.activeElement?.tagName !== '~/components/Button') onConfirm();` — `tagName` is `'BUTTON'`, never that string (an import-path replace landed in a literal), so the Enter hotkey always confirms. Both dialogs. Consumers: `WarningDialog` guards **Delete Embed**, **Delete Field**, **Delete Component**; `ConfirmationDialog` guards the Components V2 mode switch ("will be removed. This cannot be undone") and the Pusher reload. Tab to Cancel, press Enter → the destructive action runs. | `src/components/ConfirmationDialog.tsx` — `Inner`; `src/components/WarningDialog.tsx` — `WarningDialog` | Verified | 10 | 5 |
| F-16 | **Send has no in-flight guard.** `allowSave` is `isMessageValid && selectedWebhook && !isLoading && (!showEdit \|\| oldMessage)`; nothing goes false while `sendWebhook` is pending, so a double-click posts the message twice. `sendMessage` also has no `catch`, and `sendWebhook` returns `toast.promise(...)`, which rejects on failure → an unhandled rejection on every failed send. | `src/app/message/m/[id]/send/page.tsx` — `sendMessage`, `allowSave` | Verified | 8 | 4 |
| F-17 | **Custom webhook URL error is inverted.** `errorMessage={url && !isWebhookLoading && selectedWebhook !== null ? 'Invalid URL' : undefined}` — `WebhookProvider` sets `selectedWebhook` to `null` exactly when the URL is invalid, so the message never shows for a bad URL. | `send/_components/WebhookMenu/index.tsx` — `WebhookMenu` | Verified | 10 | 3 |
| F-18 | **Thread "Clear" is gated on the wrong field.** The button sets `threadId` to `''` but is `isDisabled={isLoading \|\| !threadName}`; the dropdown writes `threadId` only (`onPress: () => setThreadId(thread.id)`), and in the list view `threadName` is always `''` (the List button resets it) — so a picked thread can never be cleared from the list view. | same — `WebhookMenu` | Verified | 10 | 3 |
| F-19 | **JSON dialog stops closing on Esc/outside-click after one successful Load.** The Load button's `withConfirmation` sets `setAllowMenuClose(false)` on trigger and `true` on cancel; `commitLoad` (the confirm path) never resets it. `JsonMenu` holds that flag in state and stays mounted, and the body's validation effect resets it only on the `requiresChoice` branch. `PresetDialog` turns `onClose` into a no-op while the flag is set. | `m/[id]/_components/JsonModalBody.tsx` — `commitLoad`; `JsonMenu.tsx` | Verified | 10 | 3 |
| F-20 | **JSON "Copy to Clipboard" throws on invalid JSON.** `copy(JSON.stringify(discordMessageImportShape.parse(JSON.parse(messageString)), null, 2))` with `isDisabled={!!copyState}` only; Pretty-print is gated on `isJSONParsable`, Copy is not, so an unparsable or non-conforming draft throws in the press handler and nothing is copied or shown. | `JsonModalBody.tsx` — Copy button | Verified | 9 | 2 |
| F-21 | **Pusher prompt reads a stale `hasChanged`.** The subscription effect depends only on the message id; the handler closes over `hasChanged` from the render that subscribed (almost always `false`), so "Any changes you have made will be lost." is omitted when it should appear. Distinct from the handoff on the originating tab prompting itself. | `src/providers/MessageProvider/usePusher.ts` — default export | Verified | 8 | 3 |
| F-22 | **Guild dropdown is computed once.** `useMemo(…, [])` over `session.user.guilds` and `setSelectedGuildId`; a session `update()` (sign-in refresh, guild change) is never reflected until remount. | `src/utils/hooks/useGuildDropdownItems.tsx` | Verified | 9 | 3 |
| F-23 | **"Today" is decided by day-of-month alone.** `messageDate.getDate() === new Date().getDate()` — a message from the same calendar day of any month or year renders as a time ("Today at …" on the folder page). Two copies. | `src/app/message/_layout/Header.tsx` — `getDateString`; `src/app/message/f/[id]/page.tsx` — `getDateString` | Verified | 10 | 2 |
| F-24 | **Save As proposes the name and server captured at mount.** `useState(message.name === 'New Message' ? … : \`${message.name} Copy\`)` and `useState(message.guildId ?? '')`; `Navigation` mounts `SaveAsMenu` once `message` is non-null and never remounts it, so a rename or reload is not reflected. | `m/[id]/_components/SaveAsMenu.tsx` — `SaveAsMenu`; `_layout/Navigation.tsx` | Verified | 7 | 2 |
| F-25 | **Delete failure toast says the refresh failed.** `render: 'Error. Failed to refresh message. Please try again.'` in the delete mutation's `onError`. | `src/app/message/f/[id]/page.tsx` — delete `onError` | Verified | 10 | 1 |
| F-26 | **Preview route parses `?data=` unguarded.** `JSON.parse(query)` in render with no boundary; a malformed link crashes the page. The generator always sends valid JSON, so this needs a hand-made link. | `src/app/preview/page.tsx` — `Page` | Verified | 9 | 2 |
| F-27 | **Webhook provider: unanchored id test, unhandled fetch rejection, no request ordering.** `/\d+/.test(messageIdOrUrl.trim())` passes any text containing a digit; both validation effects are `voided(async …)` with no `catch`, so a network failure is an unhandled rejection; neither effect cancels, so a slower earlier response can overwrite a newer one. | `src/providers/WebhookProvider.tsx` — `useValue` | Verified (reading) for the first two; High-confidence inference for the race | 7 | 2 |

### 4. Bot (`website/bot`)

| # | Defect — intent vs execution | Where | Confidence | Ease | Severity |
|---|---|---|---|---|---|
| F-28 | **`ADMIN_PERMS` ANDs two distinct bits.** `(PermissionFlagsBits.Administrator & PermissionFlagsBits.ManageGuild).toString()` = `(1n<<3n & 1n<<5n)` = `"0"`. Discord reads `default_member_permissions: "0"` as "administrators only", so the `get_message` message command is hidden from Manage Server moderators. Intent reads as `\|`. Fixing needs the `push-commands` script re-run (an owner action: it publishes to Discord). | `bot/scripts/app_commands/common.ts` — `ADMIN_PERMS` | Verified (arithmetic) | 9 | 3 |
| F-29 | **`setTimestamp` compares instead of assigning.** `this.#payload.timestamp === timestamp;`. Latent: no caller (`grep -rn "setTimestamp("` finds only a React setter in `EmbedFooter.tsx`). | `bot/utils/DiscordEmbed.ts` — `setTimestamp` | Verified | 10 | 1 |
| F-30 | **`isUserCommand` tests for `'slash'`.** Latent: no user commands are published. | `bot/scripts/app_commands/common.ts` — `isUserCommand` | Verified | 10 | 1 |

### 5. `preview-image-generator` and `project-utils`

| # | Defect — intent vs execution | Where | Confidence | Ease | Severity |
|---|---|---|---|---|---|
| F-31 | **Graceful shutdown is cut off by PM2 before its own fallback.** `shutdown()` gives `server.close()` + `pool.drain()` ten seconds (`setTimeout(exit, 10e3)`), but `ecosystem.config.js` sets `kill_timeout: 5000`, so PM2 SIGKILLs at 5 s. Intent: drain the browser pool cleanly. | `preview-image-generator/src/server.ts` — `shutdown`; `ecosystem.config.js` | High-confidence inference (PM2's documented SIGINT → kill_timeout → SIGKILL sequence) | 10 | 2 |
| F-32 | **Malformed JSON body crashes the process.** `JSON.parse(body)` inside the `'end'` handler with no try/catch → uncaught exception → PM2 restart. Intent (the surrounding code): answer 500. Reachable only by a caller holding the API key. | `src/server.ts` — `processImage` | Verified (reading) | 9 | 2 |
| F-33 | **A failed screenshot leaks the page and can leave an unhandled rejection.** `generateMessagePreviewImage` has no `try/finally`, so `page.close()` is skipped when `goto`/`screenshot` throws (bounded by `maxUses = 50`); `imagePromise` is started before `await deleteMessagePreviewImages()`, so if the delete throws the image promise's later rejection is unhandled. Distinct from handoff `preview-image-failure-shows-broken-not-stale` (which is the website's nonce rotation). | `src/generateImage.ts` | Verified (reading) | 8 | 2 |
| F-34 | **Pool factory returns `null` on launch failure.** `create` catches and `return null`; `generic-pool` then hands `null` to `acquire`, whose wrapper does `instance._id` → TypeError on the first request after a Chromium launch failure. Intent: reject so the pool retries. | `src/getPool.ts` — `factory.create` | Verified (reading) | 8 | 2 |
| F-35 | **Unset `API_KEY` yields an accepted `"Bearer "`.** `API_KEY: \`Bearer ${process.env.API_KEY ?? ''}\`` — intent: require a key; execution with the variable absent: the header `Authorization: Bearer ` passes. Rated on the intent mismatch only (not a security assessment); config-dependent. | `src/config.ts` | Verified | 10 | 2 |
| F-36 | **Stale committed artefact.** `project-utils/dist/prisma.js` (2023-07-26) has no `src/prisma.ts`; `tsc -b` does not delete stale outputs and `cp -r build/js dist` carries it along. Harmless unless imported. | `project-utils/dist/prisma.js` | Verified | 9 | 1 |
| F-37 | **`UpsertMapMap.delete(key)` without `innerKey` does nothing** (`else this.#map.get(key)`). Latent: the class has no importer outside `maps/`. | `website/src/utils/maps/UpsertMapMap.ts` | Verified | 10 | 1 |

### 6. Editor components (DiscordMessageEditor, SlateEditor, markdown)

Every row below was surfaced by the delegated sweep and then read at the code by the researcher;
F-38's regex was executed here.

| # | Defect — intent vs execution | Where | Confidence | Ease | Severity |
|---|---|---|---|---|---|
| F-38 | **Multi-line fenced code blocks never parse in the preview.** The content group `[^\n]+?` in `/^```(([a-z0-9-]+?)\n+)?\n*([^\n]+?)\n*```/i` cannot cross a newline. Executed: `"```js\nfoo\nbar\n```"` → `false`, `"```\nfoo\nbar\n```"` → `false`, `"```\nfoo\n```"` → `true`. `parseContent`, `parseEmbedField` and `parseEmbedTitle` (`src/utils/markdown/index.tsx`) are built from `staticBaseRules`, so every two-line-or-longer code block renders as raw backticks in the read-only preview and in `/preview` screenshots. Discord's own rule uses `[^\n][^]*?`. | `src/utils/markdown/rules.tsx` — `staticBaseRules.codeBlock.match` | Verified (regex executed; consumer path read) | 9 | 5 |
| F-39 | **Image uploader's Enter guard is the same dead compare as F-15.** `if (document.activeElement?.tagName !== '~/components/Button') submit?.();` — Enter on Cancel or Clear also saves the image. | `src/components/ImageUploader.tsx` — `useHotkeys` handler | Verified | 10 | 4 |
| F-40 | **Image URL validator rejects `.jpeg`/`.webp`/`.avif`/upper-case and accepts substrings.** `VALID_EXTENSIONS = ['png','jpg','tiff','webm','gif','apng']` tested with `url.includes(ext)` — a `.jpeg` avatar is "Invalid url."; `https://x/a.png.html` passes. | `ImageUploader.tsx` — `isValidImageUrl` | Verified | 9 | 4 |
| F-41 | **An empty embed is never hidden in preview.** `hasValidField = !fields?.length \|\| fields.some(…)` is `true` for "no fields", so `!hasValidField(fields)` blocks `hideEmbed` for exactly the embed it was meant to hide — a bare `{}` from "Add Embed" renders as an empty bordered box in read-only mode. | `EmbedEditor/Embed.tsx` — `hasValidField`, `hideEmbed` | Verified | 10 | 2 |
| F-42 | **Field actions are indexed after filtering.** In read-only mode `.filter(({ field: { name, value } }) => showEdit \|\| (name && value)).map((…, idx) => … actions[idx])` — once an earlier field is hidden, `idx` no longer names the field's position in `fields`, and the one write path that is live in that mode (a `<t:…>` timestamp edited through `Markdown onChange` → `setField` → `newFields[idx] = newField`) overwrites a different field. | `EmbedEditor/EmbedFields.tsx` — render `.map`, `setField` | Verified (reading) | 8 | 4 |
| F-43 | **Footer text capped at 256; Discord allows 2048.** `MAX_EMBED_FOOTER_TEXT_LENGTH = 256` drives both the UI error and `embedShape.footer.text.max(…)`, so a footer of 257–2048 characters shows an error and cannot be saved. | `src/constants/index.ts`; `shapes.ts` — `embedShape`; `EmbedFooter.tsx` | Verified (constant read; the 2048 limit is Discord's documented embed-footer bound) | 10 | 3 |
| F-44 | **Component cap is checked before adds that add several.** `canAddComponent = totalComponentCount < MAX_TOTAL_COMPONENTS` gates adding a Section (section + text + accessory = 3) or duplicating a container with N children at 39/40; nested adds (`ActionRowEditor.addButton`, `SectionEditor.addTextComponent`) never consult the total; `topLevelComponentShape` caps only the top-level array and `validateMessage` counts nothing nested — so an over-limit message passes every local gate and fails at Discord. | `DiscordMessageEditor/index.tsx` — `canAddComponent`; `ComponentEditors/*` | Verified (reading) | 6 | 3 |
| F-45 | **`Author` leaks an interval.** `setTimeout(() => { setInterval(() => setTs(new Date()), MINUTE) })` with cleanup `clearTimeout(timeout)` only — each mounted author leaves a one-minute interval running after unmount. | `components/Author.tsx` — `useMount` | Verified | 10 | 2 |
| F-46 | **Picker default colour is not zero-padded.** `` `#${initColor.toString(16)}` `` yields `#ff00` for `0x00ff00` (`intToHex` elsewhere pads to 6). | `EmbedEditor/ColorPicker/Picker.tsx` — `defaultColor` | Verified | 10 | 2 |
| F-47 | **Emoji replacer sorts with a one-argument comparator.** `.sort((surrogate) => -surrogate.length)` is not an ordering; longest-first is not guaranteed, so skin-tone and ZWJ sequences may lose to their base in the regex alternation depending on the engine's sort. | `src/utils/markdown/emoji.tsx` — `replacer` | Comparator Verified; engine effect Hypothesis (Med) — disconfirm by translating 👍🏽 in Firefox | 10 | 2 |
| F-48 | **`aria-expanded={!isVisible}`** reports expanded while hidden. | `src/utils/markdown/components/MarkdownSpoiler.tsx` | Verified | 10 | 1 |
| F-49 | **Top-level duplicate inserts before the original** (`splice(idx, 0, clone)`) while all four nested editors insert after (`idx + 1`). | `DiscordMessageEditor/index.tsx` — `duplicateEmbed`, `duplicateComponent` | Verified (inconsistency) | 10 | 1 |
| F-50 | **`footer?.text.trim()`** throws for a footer object without `text`; latent — the import schema requires `footer.text`. | `EmbedEditor/EmbedFooter.tsx` — `displayText` | Verified | 10 | 1 |

**Hypotheses from the editor sweep** — each needs a running editor to settle; none is counted as a
finding. Confidence, fastest disconfirming test, and what would prove it:

| # | Hypothesis | Conf. | Disconfirming test | Ease / Sev. if true |
|---|---|---|---|---|
| H-1 | **Opening a field rewrites escaped markdown.** simple-markdown's default `escape.parse` returns `{ content: capture[1] }` (read in `node_modules/simple-markdown`, the backslash is dropped); `getInitialValue` builds Slate text from `node.content`; `SlateEditor` runs `useEffect(() => onChange(string), [string])` on mount. **Premise checked and found false**: the `escape:` rule at `rules.tsx` lives inside `staticBaseRules` (lines 52–478, the preview set), and `baseInteractiveRules` (from line 479, the set `getInitialValue` receives) carries no `escape` rule at all (`awk 'NR>=479 && /escape/'` → only `unescapeUrl`). Kept only because the interactive `text` rule's own regex might consume a backslash. | Low | Open a field containing `\*x\*`, blur, read the saved JSON. | 7 / 4 |
| H-2 | **Normalisation loop with a blockquote and a language-less fence.** `withNormalizeNode` compares `child.lang !== currentLang` where `currentLang` stays `null` for a bare fence and the update writes `lang: ''`, so the update branch re-runs each pass; with a `> quote` line present it rewrites text each time until Slate's iteration guard throws. | Med | Type `> a` and a bare ``` fence in one field; watch for "Could not completely normalize". | 7 / 4 |
| H-3 | **Ctrl+X with a collapsed selection deletes the next character** — `onCopy`'s cut branch calls `Transforms.delete(editor, { at: editor.selection })` with no `Range.isExpanded` guard. | Med | Place the caret, press Ctrl+X. | 10 / 2 |
| H-4 | **Decorator offsets drift after nested emphasis** — `walkAst` passes `first: a === astContent.at(-1)` (the *last* child) and never sets `last`. | Med | Type `***ab***`; inspect decorations after it. | 7 / 2 |
| H-5 | **A timestamp edit in the preview can target the wrong `<t:…>`** — `MarkdownTimestamp` takes its index and `localDate` once; the raw-string replace counts occurrences inside code spans too. | Low-Med | Two timestamps, one inside backticks; edit the second. | 6 / 3 |
| H-6 | **`hasThumbnail` is inverted** (`showEdit && !showEmbedThumbnailEditable`) so the image/thumbnail grid layout is wrong in read-only mode. | Low-Med | Embed with both image and thumbnail, view in preview. | 9 / 2 |
| H-7 | **Image uploader can save a URL other than the one shown** — no stale-response guard, `localImage` not cleared on an invalid input, Cancel does not reset `imageInput`. | Med | Paste a valid URL, then an invalid one, press Save. | 7 / 3 |
| H-8 | **`>>> ` block quotes are rewritten on open** — `getInitialValue` strips `>>> ` and `flattenNodeText` re-emits `> ` per line. | Med | Field containing `>>> a\nb`; open, blur, read JSON. | 6 / 3 |

### 7. Already on the record — cited, not re-rated

| Handoff (`agent-output/handoff/`) | What this sweep observed at the code |
|---|---|
| `unsaved-change-guards-disabled-for-unauthenticated-users-2026-08-24.md` | Unchanged. The "fourth guard that never worked" is `useUnloadAlert`'s `Router.events.on('beforeHistoryChange')` — a Pages-Router bus in an App-Router page; the helper sweep re-found it independently. |
| `v1-guild-messages-endpoints-unauthenticated-2026-08-24.md` / `fix-v1-guild-messages-auth-post-deploy-2026-10-10.md` | Both v1 handlers now check `Bearer ${STATBOT_API_KEY}` before anything else (`7ce866b`). `middleware.ts`'s matcher still names `/api/guilds/(.*)`, a path with no route. B-4 remains with the owner per the post-deploy handoff. |
| `save-originating-tab-raises-its-own-update-prompt-2026-08-25.md` | Unchanged; F-21 is a different defect in the same hook. |
| `components-v2-emptiness-not-caught-by-the-send-gate-2026-08-26.md` | Unchanged; `textDisplayShape.content` still has no minimum and `sectionShape.components` no `.min(1)`. |
| `newmessagemodal-persist-gate-choice-unreachable-2026-08-27.md`, `message-init-cached-edits-lost-2026-08-27.md` | Not re-derived here. |
| `preview-image-failure-shows-broken-not-stale-2026-08-24.md` | Unchanged (`upsertMessage` still mints the nonce unconditionally; `postMessagePreviewImage` still fire-and-forget). F-33 is the generator-side sibling. |
| `website-api-handler-hardening-2026-10-10.md` | Not re-derived; F-7 is adjacent (edge handler, not under `src/pages/api/v1`). |

## Open Questions

| # | Question | Why it is the owner's | What would close it |
|---|---|---|---|
| OQ-1 | **Is a username required to send?** `validateMessage` runs `validateUsername(username = '')`, so a message with no `username` fails the send gate ("This username is too short or too long.") and is written `valid = false` for Statbot — yet `discordMessageBaseShape.username` is `.optional()` and Discord's webhook API treats it as optional (the webhook's own name is used). The two surfaces disagree; which one states the product's intent is not readable from the code. | Product rule on a user-facing gate and on the `valid` column Statbot consumes (chain 012). | One sentence from the owner; then either the shape gains `.min(1)` or `validateMessage` skips the check when `username` is absent. |
| OQ-2 | **F-28: should `get_message` be Administrator-only, or Administrator-or-Manage-Server?** `&` is a slip either way, but the fix differs (`Administrator` alone, or `Administrator \| ManageGuild`). | Who may use the bot command is a product decision; publishing the fix is an outbound act the owner performs (`pnpm run push-commands`). | Owner's choice; one script run. |
| OQ-3 | **F-4: is the cap 1000 or 1001?** | The limit's text says 1000; whether the off-by-one is the intended bound is the owner's. | One word. |

## System Weaknesses

- **Two Kysely translation hazards with no guard.** F-1 and F-2 are both shapes Kysely compiles
  without complaint and Postgres rejects or never matches (`= null`, `in ()`). Nothing in the repo —
  no lint rule, no test — catches either; the first survived three years because its table has no
  producer. Any future `in` over a list that can be empty, or `=` against a nullable, inherits the
  same silence.
- **Confirmation dialogs guard destructive actions by a string compare on `tagName`** (F-15, F-39 —
  three sites carry the identical dead literal `'~/components/Button'`, so it was one replace that
  landed in strings): a mechanism that fails open.
- **Limits live in two places and disagree with Discord or with each other** (F-12, F-13, F-43,
  F-44): `constants/index.ts`, `constants/messageLimits.ts`, `shapes.ts` and `limits.tsx` each
  carry a copy, and nothing checks them against the documented Discord bounds. A safer shape would stop propagation from the Cancel button or scope
  the hotkey to the dialog's confirm control.
- **Fire-and-forget async handlers with no `catch`** recur (F-16, F-27, F-33): `voided(async …)`
  and un-awaited `mutateAsync` turn every network failure into an unhandled rejection.
- **Mount-time captures stand in for derived state** (F-22, F-24, F-21): `useMemo(…, [])`,
  `useState(initial-from-prop)` and effect closures over props read once.

## Instrumentation Gaps

| Gap | Normal / debug | What it would show |
|---|---|---|
| `pnpm run typecheck` cannot read true in this tree: `tsconfig.json` includes `.next/dev/types/**/*.ts`, and the tree holds a torn `next dev` artefact from 2026-09-08 (`validator.ts` line 89 begins mid-token). The gate is hostage to a git-ignored generated file. Both tsc programs run from scratch configs omitting the `.next` globs (`scratchpad/tsconfig.check.json`, `tsconfig.check.test.json`): **exit 0 and 0 `error TS` lines, both programs** — the source type-checks; only the artefact fails. | normal | A green/red typecheck that reflects the source, not the last dev session. |
| No test or lint covers Kysely predicate shape (F-1, F-2). | normal | A unit test compiling the `getPartialMessages` query with `guilds = []` would have been red. |
| `sendWebhook` and the provider fetches log nothing on failure beyond a toast (F-16, F-27). | debug | A console/structured line per failed send with status and body, so a double-send or a dropped error can be seen. |
| The cron handler returns `{ success: true }` regardless of how many rows it selected (F-1). | normal | Returning or logging `scheduled.length` would have exposed a permanently empty set. |

## Recommendations (investigation only)

1. Before any plan touches F-2, confirm the user-visible failure against a database: sign in as a
   user who administers no guild and call `message.getAll`; or run the compiled SQL from the POC
   against Postgres to see the syntax error. Both are owner-side acts (live DB or live account).
2. F-28's effect is observable only in Discord: check whether a Manage-Server moderator sees the
   `Get Message` context command. Owner-side.
3. F-31 turns on PM2's kill sequence; `pm2 show <name>` on the production host would confirm the
   `kill_timeout` in force. Read-only, owner-sanctioned host access.
4. OQ-1 needs the owner's sentence before anything else is planned on the `valid` column.

## Remaining Gaps

| # | Unknown | Blocker | Required action | Owner |
|---|---|---|---|---|
| G-1 | Does F-2(a) fail in production for a no-admin-guild user, or does Redis/session state mask it? | No database or live account in this environment. | Run the compiled query against Postgres, or sign in with a test account that administers no guild. | owner |
| G-2 | ~~Whether the editor-component sweep surfaces further defects.~~ **Resolved** — § Findings 6 (F-38–F-50, H-1–H-8). | — | — | — |
| G-5 | Which of H-1…H-8 are live. | Each needs a running editor (browser or the vitest DOM project with Slate mounted); not executed in this run. | Run the disconfirming test in each row of the hypotheses table; H-1 and H-2 first (highest severity if true). | planner / qa |
| G-3 | The intent behind OQ-1/OQ-2/OQ-3. | Owner-only. | One answer each. | owner |
| G-4 | Whether F-31's cut-off actually truncates drains in production (drains may finish well inside 5 s). | Needs host observation. | `pm2 show` + a timed restart log read over `claude-ro`. | owner / devops |
