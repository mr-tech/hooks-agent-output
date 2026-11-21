First write by shell heredoc refused by the record-write gate; written with the Write tool.

# Sweep: loading one stored message by number, and the not-found path

Ref: `git -C /usr/local/bin/hooks/website rev-parse --short origin/master` -> `76da25c` (matches expected). All website reads via `git show origin/master:<path>` / `git grep ... origin/master -- <path>`. Read from code; nothing run. No `.env` file opened; preview-image-generator not searched.

## Commands run and results
- `git -C website rev-parse --short origin/master` -> `76da25c`.
- `git -C website ls-tree -r --name-only origin/master -- src/app src/pages | grep -E "page|route|layout|not-found|error|\["` -> routes under `src/app/message/{f/[id],m/[id]/{edit,send},m/new}`, `src/app/preview/page.tsx`, `src/pages/api/{trpc/[trpc],messages/codes/[code],v1/guilds/[guildId]/messages[/[id]]}.ts` (no `not-found`/`error` files).
- Identifier grep (step 5): `git -C website grep -n -E "messageError|getMessage|executeTakeFirstOrThrow|NoResultError|NOT_FOUND|retry|notFound" origin/master -- src docs '*.md' '*.json' '*.ts'` -> 75 lines, re-run identical to first run; raw in `raw/step5-identifier-grep.txt`. `NoResultError` and `notFound`: zero hits in src; docs and root files: no hits.
- `git -C website ls-tree -r --name-only origin/master | grep -iE "not-found|error\.tsx|404|500|global-error"` -> only `public/assets/whitney-500*.woff2`.
- `git -C website grep -n -E "message\.getOne|getOne|getFromCode|getFromUrl|message\.get\b" origin/master -- src` (non-test) -> getOne used at `MessageProvider/index.tsx:211,297` and `f/[id]/page.tsx:181`.
- `git -C website grep -n -E "queryClient|QueryClient|setDefaultOptions" origin/master -- src` -> production construction only at `src/providers/TrpcProvider.tsx:16`; others are tests.
- `git -C website grep -n -E "selectFrom\('Messages'\)" origin/master -- src` -> shared.ts, user.ts, authorizeGuildUser.ts, guild.ts, previewImage.ts, router delete, v1 REST (two files), scripts/backfillValid.ts.
- `git -C website grep -n -i -E "not found|doesn't exist|does not exist|no longer valid|unavailable" origin/master -- src` -> wording listed in section 4.
- Test titles: `git show origin/master:<test> | grep -n -E "^\s*(describe|it|test)(\.each)?\("` on `message.personal-ownership.test.ts` and `message.get-from-url.test.ts`; `git grep -n -E "getOne|messageError|retry|NoResultError" origin/master -- 'src/**/__tests__/*'`.
- Record: `grep -rIn -E "messageError|executeTakeFirstOrThrow|NoResultError|blank editor|blank shell|getOne|Not found|not found"` over `agent-output/{handoff,handoff/closed,architecture,research,planning/closed,uat/closed}`; three handoffs read whole.

## 1. Routes that load one message by number
One route family loads a stored message by number into a page: `/message/m/[id]/*`, via `MessageProvider`. One secondary use in the folder page.

| Route | Fetch | Renders result / error |
|---|---|---|
| `/message/m/[id]/edit` (`src/app/message/m/[id]/edit/page.tsx`) | layout `m/[id]/layout.tsx:16` wraps in `MessageProvider`; `providers/MessageProvider/index.tsx:211` `api.message.getOne.useQuery(paramMessageId, { enabled: paramMessageId !== '0', staleTime: Infinity, refetchOnWindowFocus: false, refetchOnMount: 'always' })` | `edit/page.tsx:160` `{!message ? null : (<... DiscordMessageEditor ...>)}` inside the empty `min-h-[4.5em] rounded-lg bg-primary` box (line 158). Error state: not rendered anywhere. |
| `/message/m/[id]/send` (`send/page.tsx`) | same provider | `send/page.tsx:112-121` spinner while `isGuildLoading \|\| isLoadingChannels \|\| isMessageLoading`; after the error settles `isLoading` is false (`MessageProvider:329`), so the page renders with `message` null. No error text. |
| Header of both (`m/[id]/_layout/Navigation.tsx:318`) | same | `{message?.name ? message?.name : (isLoading ? ' ' : 'New Message')}` - a failed load shows "New Message" (branch under `status !== 'authenticated'`, line 315). |
| `/message/f/[id]` copy action (`src/app/message/f/[id]/page.tsx:178-199`) | `api.message.getOne.useQuery(copyMessageId, { initialData: null, enabled: !!copyMessageId, staleTime: Infinity, refetchOnWindowFocus: false })`, line 181 | `:197-199` `if (copyError) toast.error('Failed to copy message.')` - generic; appears after retries end. |

`messageError` (`MessageProvider/index.tsx:67,210,330`) is read by no component. Other `messageError` hits are `upsert` mutation errors (`NewMessageModal.tsx:76,428`, `SaveAsMenu.tsx:44,158`) and webhook validation (`useValidateWebhook.ts`), not loads. So no error state is rendered for the editor/send loads.

Not loads of one message by number: `/message/m/new/page.tsx` (upsert only), `/message/m/0` (route-zero draft / `getFromCode`), `/preview?data=` (`src/app/preview/page.tsx`: JSON in the URL, no fetch; `Invalid message data.` at :22), `/message`, `/message/f/[id]` list (`message.get`). Share links by number: none found. The only share-like path is `?code=` -> `getFromCode` (a Redis code, not a number): `MessageProvider:143`, error -> `toast.error(codeMessageError.message)` at :161-163 (shows "This message is no longer valid."). No separate guild message page; guild messages open at the same `/message/m/[id]/edit`. No server-side (SSR) message load exists.

## 2. Server procedures / routes returning one message

### `message.getOne` (`src/server/api/routers/message.ts:54-70`), `protectedProcedure` (`trpc.ts:128`; UNAUTHORIZED at `trpc.ts:109` when signed out)
- (a) absent number: `message.ts:57` `getMessage(messageId)` -> `shared.ts:160` `.executeTakeFirstOrThrow()` throws Kysely `NoResultError`, not a TRPCError, so tRPC answers `INTERNAL_SERVER_ERROR` (500). The record says a deleted number was observed answering 500 "no result" (`handoff/editor-shows-blank-shell-...:27-28`). `trpc.ts:76-81` errorFormatter returns shape unchanged. No catch around it.
- (b) another user's personal message: `message.ts:61` `authorizeUser(session.user.id, message.id)` -> `utils/user.ts:27-31` throws `NOT_FOUND` "One of the provided messages does not exist." (404; observed in the post-deploy walk). Also `message.ts:62-67`: `!oldMessageCount` -> `NOT_FOUND` "This message does not exist."
- (c) server message he may not see: `message.ts:59` `authorizeGuildUser(req, message.guildId)` with no ids -> `authorizeGuildAdmin.ts:41-46` `FORBIDDEN` "User does not have permission to access to this server." (403); session problems `UNAUTHORIZED` at `:10-38`.
- So absent (500), not yours (404) and server not his (403) are distinguishable. Input shape `shapes.ts:114-118` `messageIdShape` (1-19 digits, <= int8 max), else `BAD_REQUEST`.
- `updateRecentMessageData` (`message.ts:211`) also calls `getMessage` first: an absent number gives the same 500 there (mutation, not a load).

### Others
- `message.delete` (`message.ts:224-236`): `executeTakeFirst` then `NOT_FOUND` "This message does not exist." (absent), then `authorizeAction` -> `user.ts:27` / `authorizeGuildUser.ts:26` NOT_FOUND (not yours). Mutation.
- `message.getFromUrl` (`:78-132`) and `getFromCode` (`:134-193`): Discord link / Redis code, not a stored number.
- REST `src/pages/api/v1/guilds/[guildId]/messages/[id].ts`: Bearer `STATBOT_API_KEY` (:23), not a user; `:39` `if (message?.guildId !== guildId) return res.status(404).end()` - absent and other-guild answer identically.
- REST `src/pages/api/messages/codes/[code].ts`: by code; absent code answers `200` with `null` (`:20-21`).

## 3. Retry configuration
- `src/providers/TrpcProvider.tsx:16` `new QueryClient()` - no `defaultOptions`; link `httpLink` (:19). `@tanstack/react-query ^5.90.21` (package.json). Its default query `retry` is 3 on the client with exponential backoff, regardless of error code. This is library behaviour; no line in this repo states it. No other production QueryClient construction.
- Neither `getOne` query sets `retry` (`MessageProvider:211-216`, `f/[id]/page.tsx:181-186`), so 404, 403 and 500 are all retried. Matches the record: four requests at 1418/3006/5594/10224 ms (`handoff/editor-shows-blank-shell-...:17`).
- Per-query `retry` elsewhere: `GuildProvider.tsx:90,104` `retry: 1`; `MessagesProvider.tsx:37`, `PartialMessagesProvider.tsx:41`, `NewMessageModal.tsx:93,102` `retry: false`. `getFromCode` in `MessageProvider:143` sets none.

## 4. Reusable not-found UI
No `not-found.tsx`, `error.tsx`, `global-error.tsx` or 404 page; `notFound()` is never called. Existing wording and components:
- Server strings: `message.ts:65`/`:234` "This message does not exist."; `user.ts:30`/`authorizeGuildUser.ts:29` "One of the provided messages does not exist."; `message.ts:188` "This message is no longer valid."; `:100,:124` "Message not found. Is the bot in this guild?".
- Client: `WebhookProvider.tsx:118` `setOldMessageError('Message not found. Hint: Webhooks can only edit their own messages.')`; `preview/page.tsx:22` `const invalidData = <p className="text-sm text-error">Invalid message data.</p>;` (with `react-error-boundary` imported at :6); `f/[id]/page.tsx:198` toast "Failed to copy message."; `MessageProvider:162` toast of the server message for code loads; `src/components/InfoPanel.tsx` is the page-level notice (used in edit and send for "You're not logged in" / "The Hooks.gg bot is not in this server", `send/page.tsx:140-158`). Error text style `text-sm text-error`.

## 5. Identifier sweep (raw: `raw/step5-identifier-grep.txt`)
- `messageError`: `MessageProvider/index.tsx:67,210,330` for loads; mutation uses in `NewMessageModal.tsx`, `SaveAsMenu.tsx`; `useValidateWebhook.ts` (webhook, unrelated).
- `getMessage`: `MessageProvider/index.tsx:36,221` is a local draft-merge helper (not the server one); server `utils/shared.ts:145`, used at `message.ts:57,211` and `shared.ts:286`.
- `executeTakeFirstOrThrow` on messages: `shared.ts:160` (getMessage), `:198`, `:274`, `:282`; others in `kysely-adapter`, `redis/index.ts:196`, `scripts/backfillValid.ts:223`.
- `NoResultError`: zero hits in website src. `notFound`: zero.
- `NOT_FOUND`: `message.ts:64,99,123,187,233`; `authorizeGuildUser.ts:28`; `getAccount.ts:23`; `guild.ts:18,86`; `user.ts:29`; `redis/index.ts:267,351`.
- `retry`: see section 3. `docs/`, README, config: no hits.

## 6. Existing tests on these paths
- `src/server/api/routers/__tests__/message.personal-ownership.test.ts`: `describe 'message.getOne on a personal message'` (:203) - `returns the message to the user who owns it`; `refuses another signed-in user, with none of the message in the outcome` (:210, `NOT_FOUND` at :216); `refuses another signed-in user when the message is deleted between its load and the ownership check` (:220, `NOT_FOUND` at :228); `getOne reads the canonical number when the browser sends leading zeros` (:446); `it.each` `%s refuses a number past the largest a message can hold, before any query` (:434) and `%s takes the largest number a message can hold to the database` (:440) include getOne. No test of getOne on an absent number.
- No test of `messageError`, of retry, or of the editor / send / folder-copy rendering on a refused load. `MessageProvider.{own-save-notice,save-new-number,save-step,stored-draft}`, `layout.navigation-guard` and `page.message-list` only stub `message.getOne` with data (`queryData: { 'message.getOne': () => hoisted.stored }` and similar). `edit/__tests__/page.sign-in-exit.test.tsx` and `send/__tests__/page.send-in-flight.test.tsx` matched the grep but were not read in full.
- Neighbour: `message.get-from-url.test.ts` (NOT_FOUND for getFromUrl, :51, :127).

## 7. Record
Three handoffs read whole (all Open):
- `handoff/get-one-absent-number-fails-without-not-found-2026-11-19.md:13-16` an absent number gives executeTakeFirstOrThrow's error, not NOT_FOUND; "absent" and "not yours" can be told apart; :18 fixer: "Numbers are sequential, so this reveals little"; :21 read from code, not run.
- `handoff/editor-shows-blank-shell-when-personal-message-load-is-refused-2026-11-20.md:13-22` production, `/message/m/6021/edit`, another signed-in account: blank editor shell, 404 x4 retries, no load-error text at 8 s; whether text appears after retries is unchecked; :24 "a user refused a message sees an empty editor with no wording"; :27 deleted number answers 500 "no result".
- `handoff/deleted-message-url-serves-blank-editor-2026-11-20.md:14-18` deleted ids 6022-6024 on live: URLs answer 200 with a blank editor; never-existed id and save-from-blank-editor behaviour not established; intended behaviour needs the owner's word (:17).

Other documents stating population or consequence:
- `architecture/system-architecture.md:136` getOne answers NOT_FOUND for another's personal message; `:213` refusals leave no always-on signal (tRPC `onError` logs only in development, `src/pages/api/trpc/[trpc].ts:12-19`).
- `handoff/closed/fix-personal-message-access-post-deploy-2026-11-20.md:41-65` B-1 row: 404 NOT_FOUND observed, no load-error wording at 8 s.
- `uat/closed/013-components-v2-editing-surfaces-uat.md:1143` all 8 `message` procedures are `protectedProcedure`.
- `verification/access-defects/scoping/sweep.md` row S2 is cited by the first handoff; not reread here.
- The grep over the other record directories otherwise hits only unrelated 015 / 018 documents (NewMessageModal error line; `NoResultError` on the account lookup, `planning/closed/015-bug-evaluation-fixes.md:355-380`).

## Property Q1 judgement (from code)
| Item | Has property | Reason |
|---|---|---|
| `/message/m/[id]/edit`, signed in; absent / deleted / other's / server not his | yes | no error rendered (`edit/page.tsx:160` null); server answers 500 / 500 / 404 / 403 (distinguishable); default retry 3 |
| `/message/m/[id]/send`, same cases | yes | spinner, then page with null message, no text; same answers and retries |
| same routes, signed out | yes on render and retry | server answer is UNAUTHORIZED for every number (`trpc.ts:108-110`), so not distinguishable; retry on UNAUTHORIZED follows from the default and was not observed |
| `/message/f/[id]` copy action | yes | generic toast `Failed to copy message.` (:198), distinguishable server answers, default retry |
| `getOne` procedure | yes (distinguishable) | 500 vs 404 vs 403 |
| `/message/m/0?code=` (`getFromCode`) | no (not a number) | toast shows server text; retried by default |
| REST v1 `messages/[id]` | no | API-key caller; absent = other guild = 404 |
| `/preview` | no | no stored load |

Cannot tell from code: whether a proxy or CDN alters status codes; whether Next serves a 200 shell or a 404 for a bad id (the record reports 200 for a deleted id, consistent with the client-only load).

## 8. Not covered
- Working tree (read at the ref only); anything after `76da25c`.
- Runtime behaviour: nothing executed; retry timings and the 500 mapping of NoResultError come from the record and library defaults.
- `useApiMethods` / `usePusher` (refetch or reload after a failed load) beyond grep; `refetch` after a refusal not traced.
- `WebhookProvider` message loads (Discord ids), `src/pages/api/interactions-*.ts`, `cron.ts`, `previewImage.ts` callers.
- `verification/access-defects/scoping/sweep.md` not reread; project-utils (`getPostgres`) not read; test files other than grep and title listings not read whole.
- The `raw/` file holds the grep lines cut to 220 characters (the display cut used when writing it with the Write tool).
