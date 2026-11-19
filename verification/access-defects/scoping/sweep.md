# Access-defects scope sweep (no verdict, nothing fixed)

Disclosure: my first attempt to write this file through a shell heredoc was refused by a record-write-gate hook (it asks for the Write tool). I re-issued the same content with the Write tool, as the hook's message names. Nothing else was blocked. No read was refused.

Refs read (never the checked-out trees):
- website `origin/master` = `787bec5` (`git -C website rev-parse --short origin/master`).
- project-utils `749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f`, the pin at `website pnpm-lock.yaml:168` (`git -C website show origin/master:pnpm-lock.yaml | grep -n project-utils`). `git -C project-utils cat-file -e <sha>` succeeded: it exists locally, origin/master not needed.
- preview-image-generator `origin/prod` = `8512a1d`. Only `src/*` read, each with an explicit path; workflow files not read.
- agent-output `HEAD` = `b0d7392` (`git -C agent-output rev-parse --short HEAD`).
Raw outputs are beside this file under `raw/`. Line numbers below are the file's own lines at the ref (the `raw/*.txt` copies carry a `cat -n` prefix, then the file's own number).

## Step 1. Predicates run

Command shape: `git -C <repo> grep -c -E '<pred>' <ref> -- <paths>`; TOTAL is the sum of the per-file counts (per-file lines in `raw/step1-predicates.txt`). Website paths `src bot`, tests excluded (`':!*__tests__*'`); project-utils `src prisma`; generator `src`.

| # | Predicate | website | project-utils | generator |
|---|---|---|---|---|
| P1 | `input\.id\|input: *\{? *id\|messageId\|messageIds` | 71 | 0 | 2 |
| P2 | `z\.object\(\{ *(id\|code\|messageId)` | 2 | 0 | 0 |
| P3 | `'Messages'\|"Messages"\|Messages\.` | 80 | 1 | 0 |
| P4 | `onConflict\|on conflict` | 3 | 0 | 0 |
| P5 | `deleteMessagePreviewImages\|previewPrefix\|previewKey\|previews/` | 12 | 0 | 1 |
| P6 | `getFromCode\|messageStore\|retrieve\(` | 13 | 0 | 0 |
| P7 | `authorizeUser\|authorizeGuildUser\|authorizeGuildAdmin\|authorizeAction` | 24 | 0 | 0 |
| P8 | `protectedProcedure\|publicProcedure` | 20 | 0 | 0 |
| P9 | `getMessage\|getUserRecentMessages\|getPartialMessages\|getUserMessages\|upsertMessage\|updateRecentMessageData` | 42 | 0 | 0 |
| P10 | `fk_users_id` | 8 | 8 | 0 |
| P11 | `recentMessageIds` | 11 | 0 | 0 |
| P12 | `message-update\|genMessageChannelKey\|pusher` | 13 | 0 | 0 |

Also read in full at the ref: `routers/message.ts`, `routers/user.ts`, `routers/guild.ts`, `utils/{user,shared,guild,authorizeGuildUser,authorizeGuildAdmin,getAccount,shapes,previewImage,previewBucket,deleteMessagePreviewImages}.ts`, `trpc.ts`, `server/auth.ts` (hydrated callback region), `pages/api/{cron,messages/codes/[code],v1/guilds/[guildId]/messages,v1/guilds/[guildId]/messages/[id]}.ts`, `middleware.ts`, `vercel.json`, `app/message/**/layout.tsx`, `app/preview/page.tsx`, `utils/redis/messageStore.ts`; generator `server.ts`, `generateImage.ts`, `config.ts`, `getPool.ts`; project-utils `src/postgres.ts`, `prisma/schema.prisma` (`model Message`, lines 98-119: `id BigInt @id @default(autoincrement())`, `fk_users_id BigInt?`, `fk_guilds_id BigInt?`).

Findings from those reads that frame the table: `git -C website grep -n -i ShareableLink origin/master -- src bot` printed no line, so the schema's `ShareableLink` model has no code and there is no share-link route. `appRouter` mounts only `guild`, `user`, `message` (`root.ts:11-15`). `publicProcedure` is defined (`trpc.ts:104`) and used nowhere else.

## Step 2. Surfaces

The identifier enters at a tRPC input or URL. "Owner check" quotes what runs before the row is reached. Paths relative to `website/` at `787bec5` unless stated.

| ID | Surface (file:line) | Op | Ownership check before the row | Guild message branch | Class | Reasoning |
|---|---|---|---|---|---|---|
| S1a | `message.get`, id `'0'`: `src/server/api/routers/message.ts:41-47` -> `shared.ts:124-135` | read | SQL `where 'Messages.fk_users_id' = dbUserId`, the id coming from the session's account (`getAccount(session.user.id)`) | n/a (id `0` is the caller's own list) | ENFORCES-OWNER | no client message number; owner compare is in the query |
| S1b | `message.get`, guild id: `message.ts:48` -> `utils/guild.ts:48-73` | read | `authorizeGuildAdmin(guildId, req)`; query `exists Guilds where guildId = <input> and Messages.fk_guilds_id = Guilds.id` | this is the guild branch | GUILD-CHECKED | `authorizeGuildAdmin` (`authorizeGuildAdmin.ts:40`) requires only that the guild is in the user's guild list; no permission-bit test |
| S2 | `message.getOne`: `message.ts:51-61`; row load `shared.ts:137-154` (`executeTakeFirstOrThrow`, `where Messages.id = id`) | read | none for a personal message. `message.ts:58` `await authorizeUser(session.user.id);` carries no message id, so `utils/user.ts:13` `if (messageIds)` is skipped and only `getAccount` runs (an account must exist). The row is loaded (`:54`) before any check and returned (`:60`) | `message.ts:55-56` `authorizeGuildUser(req, message.guildId)`, no ids (guild list membership) | **NO-OWNER-CHECK** | any signed-in user reads any personal message (name, `data`, recent webhook/thread/message ids, preview nonce) by number. Input is only `^[0-9]+$` (`:52`). Callers: `providers/MessageProvider/index.tsx:211` (URL `/message/m/[id]`), `app/message/f/[id]/page.tsx:181` (copy by number). The record has steering's helper run at `1ad625e`: `steering/017-rulings.md:810` "B's `getOne('1')` returned A's personal message content". This sweep did not run it |
| S3 | `message.getAll`: `message.ts:63-67` -> `shared.ts:156-182` | read | SQL `fk_users_id = userId` OR exists guild row whose `guildId in session.user.guilds` | guild rows shown by guild membership | ENFORCES-OWNER (personal) / GUILD-CHECKED | takes no client message number |
| S4 | `message.getFromUrl`: `message.ts:69-123` | read (Discord API, not the Messages table) | `authorizeGuildAdmin(guildId, req)` and `channel.guild_id === guildId` (`:88`) | guild-only by construction | GUILD-CHECKED | the message id comes from a pasted Discord link and is fetched from Discord with the bot token; no row of ours |
| S5 | `message.getFromCode`: `message.ts:125-184`; REST twin `src/pages/api/messages/codes/[code].ts:15-27` | read (Redis, `messageStore.retrieve(code)`, `utils/redis/messageStore.ts:46-49`) | none. The tRPC variant needs a session (`protectedProcedure`); the REST variant needs none | the stored object carries `guildId`, which is not checked | NO-OWNER-CHECK (public by design) | not a Messages row. The code is the capability: minted by the bot command (`bot/serverCommands.ts:33` `messageStore.store`), key `get-message:<code>`, `expire` 1 h (`messageStore.ts:38-41`). The 1 h TTL and the mint are what mark it as by design; no document line was found saying the REST route is intentionally unauthenticated. Dev branch `message.ts:128-173` stores a fixture when `NODE_ENV === 'development'` |
| S6a | `message.upsert`, update of an existing id: `message.ts:186-197` -> `shared.ts:229-278` | update | `message.ts:194` `authorizeUser(session.user.id, message.id)` -> `user.ts:17-27`: select `fk_users_id where id in (ids)`, throws NOT_FOUND if `some(fk_users_id !== account.userId)` (a guild row has null, so it throws). It is a separate prior query; the write `buildUpsertMessageQuery` (`shared.ts:208-227`) is `onConflict(id) doUpdateSet {name,data,valid,updatedAt}` with no owner predicate, so check and write are not atomic | `message.ts:189-191` `authorizeGuildUser(req, guildId, id)` -> `authorizeGuildUser.ts:8-34`: throws unless every found row's `Guilds.guildId === guildId` (a personal row has null, so it throws) | ENFORCES-OWNER | the pre-check is sound for rows that exist at check time. The check-then-write race was read from code, not run |
| S6b | `message.upsert`, create at a client-sent id: `shared.ts:255` `if (message.id) values.id = message.id;`, insert `onConflict(id)` | create (and, on a later collision, overwrite) | the pre-check passes when no row holds the id: `user.ts:27` `.some()` over an empty set is false; `authorizeGuildUser.ts:26` likewise. `MAX_MESSAGES` is checked only when `!message.id` (`shared.ts:243`) | guild branch the same (`authorizeGuildUser.ts:26`) | **NO-OWNER-CHECK** | a user can create a row at any unused number, skipping the per-user count cap. Nothing in the code read advances `Messages_id_seq` past it, so when the sequence reaches that number another user's id-less insert takes `on conflict (id) do update` and writes that user's `name`/`data` onto the claimant's row (the update list omits `fk_users_id`). Mechanism is stated in `security/closed/017-preview-image-generator-security-audit.md:126`; the record says only the first observation was run by steering (see Step 4). Not run by this sweep |
| S7 | `message.updateRecentMessageData`: `message.ts:199-210` -> `shared.ts:280-290` | update | `getMessage(input.id)` (`:202`, read before the check, not returned), then `authorizeUser(session.user.id, message.id)` (`:208`) with the id | `authorizeGuildUser(req, message.guildId, message.id)` (`:204`) | ENFORCES-OWNER | the update `where id = message.id` is a second query after the check; input id is `z.string()` (`shapes.ts:333`) |
| S8 | `message.delete`: `message.ts:212-234` | delete (row) | select guild id for the id (`:215-220`, NOT_FOUND if none), then `authorizeAction(session.user.id, req, message.guildId, id)` (`:229`; `:25-38`) which calls `authorizeUser(providerUserId, messageIds)` for a personal row | `authorizeGuildUser(req, guildId, messageIds)` | ENFORCES-OWNER | the delete at `:231` runs after the check. Input is `z.string()`, unrestricted (`:213`) |
| S9 | `deleteMessagePreviewImages(id)`: `utils/deleteMessagePreviewImages.ts:7-21`, called `message.ts:232` | delete (bucket keys derived from the id) | none of its own; reached only after S8's check. Prefix `[dev/]previews/<id>/` (`previewBucket.ts:15`) is built from the client's text as sent | n/a | ENFORCES-OWNER (by caller) | the trailing slash stops prefix overlap with other ids. A text form that differs from the bigint (leading space or zero) leaves the owner's own previews behind (the audit's third observation, `security/closed/017-...audit.md:127`) |
| S10 | `runPreviewContinuation` / `buildCommitPreviewNonceQuery`: `utils/previewImage.ts:19-37, 101-126`; started `shared.ts:262` | update (`Messages.previewImageNonce where id`) and bucket put/delete | none of its own; the id is the DB-returned id of S6 (`shared.ts:257-262`), not the raw client text | n/a | ENFORCES-OWNER (by caller) | inherits S6, including rows S6b created |
| S11 | `getUserRecentMessages(preferences.recentMessageIds)` in the hydrated session callback: `src/server/auth.ts:138-140` -> `shared.ts:108-122`; ids written by `user.updatePreferences` `src/server/api/routers/user.ts:27-63` (`recentMessageIds: z.array(z.string())`, sliced to 10, not checked) | read | none. Query is `where Messages.id in (ids)` joined to Guilds; selects `id, createdAt, updatedAt, name, previewImageNonce, guildId` | guild rows are not filtered either | **NO-OWNER-CHECK** | a user stores any numbers in their own preferences; the next hydrated session (`/api/auth/session?hydrate=true`, `trpc.ts:63-68`; `auth.ts:172` `session.hydration = { messages }`) returns those rows' metadata, personal rows of others included. Narrower than S2 (no `data`) but gives the `previewImageNonce` that completes the public preview URL (S16) |
| S12 | `user.getPreferences` / `updatePreferences` and the `message` field (`partialMessageShape`, optional `id`): `user.ts:9-25, 27-63` | read/update of the caller's own `Users.preferences` | `where Users.id = account.userId` | n/a | ENFORCES-OWNER | draft ids live in a JSON blob; no Messages row is touched except through S11 |
| S13a | REST `GET /api/v1/guilds/[guildId]/messages`: `src/pages/api/v1/guilds/[guildId]/messages.ts:21-49` | read | `Authorization === Bearer STATBOT_API_KEY` (`:23`, plain `!==`); SQL `where Guilds.guildId = guildId` (`:32`) | the guild branch only | GUILD-CHECKED | service credential, not a user session; no personal row can match |
| S13b | REST `GET /api/v1/guilds/[guildId]/messages/[id]`: `.../messages/[id].ts:21-51` | read | same bearer check (`:23`); `if (message?.guildId !== guildId) return 404` (`:39`); `guildId` regex `^[0-9]{17,23}$`, so a personal row (null) never matches | the guild branch only | GUILD-CHECKED | one shared key; id through `z.number({ coerce: true })` |
| S14 | Cron `GET /api/cron?key=vercel`: `src/pages/api/cron.ts:12-81`; `vercel.json` schedule `0 0 * * *` | read Messages.data through ScheduledMessages; update ScheduledMessages | `req.query.key !== 'vercel'` -> 404 (`:15`): a constant in the URL, not a secret | n/a | UNCLEAR | takes no message identifier from the request, so it is not an identifier-to-row path. Anyone can trigger it; the effect is sending already-due rows to their stored webhook URL. No procedure writes `ScheduledMessages` (`research/competitive-feature-landscape-2026-11-08.md:166`) |
| S15 | Pusher publish `shared.ts:265-275`: `pusher.trigger(genMessageChannelKey(message.id), 'message-update', hashMessage(message))`, channel `message-update-<id>` (`utils/index.ts:472`); subscribe `providers/MessageProvider/usePusher.ts:57-61` | derive (channel name) | none in code: `pusher-js` is built with the public key and cluster only, no `authEndpoint`, public channel name | n/a | UNCLEAR | any client holding the public key can subscribe to any number and see save events. Payload is a 32-bit non-cryptographic hash of name+data (`utils/index.ts:489-499`). Whether the Pusher app restricts anything is not visible. The trigger runs only `if (message.id)`, i.e. for a client-sent id |
| S16 | Preview image URL and bucket keys: `utils/index.ts:521` `${cdn}/previews/${id}/${previewImageNonce}.jpeg`; written by the generator `generateImage.ts:55-61` with `ACL: 'public-read'` | read (public object) | none: public-read object; the nonce `v<16-digit clock><8 random bytes hex>` (`previewImage.ts:17`) is the only unguessable part | n/a | UNCLEAR | legitimately public by design (a preview URL; `ACL: 'public-read'` at `generateImage.ts:60`). Id plus nonce is a capability. Nonces are returned by S2 and S11 to a caller who can reach the row. Bucket list permission is not visible |
| S17 | Generator `POST /generate`: `preview-image-generator src/server.ts:47-55` -> `generateImage.ts:48-62` | create (bucket put at `previews/<id>/<nonce>.jpeg`) | `req.headers.authorization === config.API_KEY` (`server.ts:49`, plain `===`) | n/a | UNCLEAR | the only route; 404 for anything else. `id` and `nonce` come from the JSON body with no type or shape check (`server.ts:22-33`) and go into the key (`generateImage.ts:57`). The caller is the website server (S10) with the DB-returned id; no user token reaches it; trust rests on one shared bearer key |
| S18 | Pages with `[id]`: `src/app/message/m/[id]/*`, `src/app/message/f/[id]/*` | derive (client-only load through S2/S3) | none server-side. `m/[id]/layout.tsx` and `f/[id]/layout.tsx` load no data; the id param is read in the client provider and sent to S2 | n/a | NO-OWNER-CHECK (by delegation to S2) | no server-side data loading by id was found; `git grep` for `getPostgres` outside routers/utils shows only `auth.ts`, `utils/redis/index.ts`, `cron.ts`, the v1 routes and `scripts/backfillValid.ts` |
| S19 | `src/middleware.ts:5-30` | none | matcher `/message/(.*)`, `/api/guilds/(.*)`, `/preview`; only sets `x-pathname`/`x-query-params` headers | n/a | n/a | no auth, no redirect; `/api/guilds/*` matches no route file in the tree |
| S20 | `/preview?data=...`: `src/app/preview/page.tsx` | none | no id; renders caller-supplied JSON | n/a | n/a | consumed by the generator's headless browser (`generateImage.ts:31-34`) |
| S21 | Offline script `src/scripts/backfillValid.ts:195-229` | read/update `Messages` by range | none | n/a | n/a | not request-reachable; operator-run |
| S22 | Bot interactions `src/pages/api/interactions-edge.ts`, `interactions-server.ts`, `bot/serverCommands.ts:33` | create (Redis code) | Discord signature verification (`discord-verify`, `interactions-edge.ts:1`) | stores `guildId` from the interaction | n/a | no Messages table access: `git grep -c -E 'getPostgres\|Messages\|messageStore\|fk_users_id' origin/master -- bot` hits only `bot/serverCommands.ts` (2 lines, the `messageStore` lines) |
| S23 | project-utils `749606d` | none | none | n/a | n/a | `src/postgres.ts` is the Kysely/pg pool plus generated types; `prisma/schema.prisma` has no row policy or trigger. No query lives in this repo |

Helpers behind these rows (not surfaces by themselves): `authorizeUser` (`user.ts:7-38`; skipped when no id at `:13`, passes on an empty row set at `:27`), `getOldMessages` inside `authorizeGuildUser` (`authorizeGuildUser.ts:8-34`, passes on an empty set at `:26`), `getMessage` (no owner argument, `shared.ts:137`).

Class counts by surface row (S1a and S1b counted separately; S3 counted ENFORCES-OWNER):
- ENFORCES-OWNER: S1a, S3, S6a, S7, S8, S9, S10, S12 = 8
- GUILD-CHECKED: S1b, S4, S13a, S13b = 4
- NO-OWNER-CHECK: S2, S5 (public by design, not a Messages row), S6b, S11, S18 (by delegation to S2) = 5
- UNCLEAR: S14, S15, S16, S17 = 4
- n/a, no identifier-to-row path: S19, S20, S21, S22, S23 = 5

## Step 3. Identifiers a fix would likely touch

Command: `git -C <repo> grep -c -w -F <id> <ref>`; lines = summed per-file counts, files = number of files with a hit (`raw/step3-counts.txt`; website line list `raw/step3-website-lines.txt`). Website: whole tree at `origin/master`, tests, docs and config included. project-utils: whole tree at `749606d`. Generator: whole tree at `origin/prod` excluding `.github`. agent-output: whole tree at `HEAD`.

| Identifier | website (lines / files) | project-utils | generator | agent-output (lines / files) |
|---|---|---|---|---|
| authorizeUser | 15 / 4 | 0 | 0 | 101 / 92 |
| authorizeGuildUser | 11 / 2 | 0 | 0 | 173 / 153 |
| authorizeGuildAdmin | 15 / 5 | 0 | 0 | 95 / 55 |
| authorizeAction | 2 / 1 | 0 | 0 | 4 / 3 |
| getOldMessages | 2 / 1 | 0 | 0 | 10 / 6 |
| getMessage | 9 / 4 | 0 | 0 | 65 / 35 |
| getUserRecentMessages | 8 / 4 | 0 | 0 | 128 / 109 |
| upsertMessage | 39 / 12 | 0 | 0 | 312 / 122 |
| buildUpsertMessageQuery | 9 / 3 | 0 | 0 | 75 / 49 |
| buildMessageValues | 9 / 3 | 0 | 0 | 229 / 176 |
| optionalIdMessageShape | 5 / 3 | 0 | 0 | 78 / 29 |
| getOne | 9 / 8 | 0 | 0 | 194 / 56 |
| upsert | 32 / 26 | 0 | 0 | 1277 / 508 |
| updateRecentMessageData | 11 / 5 | 0 | 0 | 19 / 13 |
| deleteMessagePreviewImages | 2 / 1 | 0 | 0 | 119 / 79 |
| recentMessageIds | 12 / 6 | 0 | 0 | 61 / 49 |
| fk_users_id | 15 / 6 | 10 | 0 | 188 / 96 |

`getOne` and `upsert` are common words, so their counts include unrelated hits (comments, Prisma, test names). `delete` was not counted: too generic for a text count; the procedure is `message.ts:212`. Website files for `authorizeUser`: `routers/message.ts`, `routers/user.ts`, `utils/user.ts`, `utils/__tests__/user.in-predicate.test.ts` (`git -C website grep -l -w -F authorizeUser origin/master`). Cross-check: `git -C agent-output grep -l -w -F authorizeUser HEAD | grep -c .` printed 92, equal to the files figure above.

## Step 4. Record on the mechanism

Commands: `git -C agent-output grep -n -i -E 'authorizeUser|getOne|personal message|message id|client-sent|ownership' HEAD -- architecture research planning handoff security` (40 lines, `raw/step4-record-grep.txt`; per-file counts `raw/step4-record-files.txt`); `... 'Messages_id_seq|autoincrement|id sequence|access defect|access-defects'` (5 lines, `raw/step4-record-grep-2.txt`); the same terms over `steering/017-rulings.md` (`raw/step4-steering-rulings.txt`). Paths are relative to agent-output. `sequence`, `client-sent id` and `access` as bare words were not searched on their own: bare `sequence` and `access` match milestone ordering and unrelated prose throughout the record.

| Path:line | What it states |
|---|---|
| `security/closed/017-preview-image-generator-security-audit.md:121-129` (§ "Outside the reviewed delta") | Three website observations read from code, not run: (1) `getOne` calls `authorizeUser(session.user.id)` with no id for a personal message, so any signed-in user reads it by number; (2) `upsert` takes a client `id`, the pre-checks pass when no row has it, `MAX_MESSAGES` is skipped, `on conflict (id) do update` omits the owner columns, so a later sequence number lands another user's save on the claimant's row; (3) `delete` passes the client's `id` text to `deleteMessagePreviewImages` unnormalised. Its 08:05Z search found no ruling or handoff treating either of the first two as an access question |
| `security/closed/017-preview-image-generator-security-audit.md:138` | Testing recommendation: a real-Postgres test, two users, a save with an unknown `id` refused or ignored, `getOne` on another user's personal message refused |
| `security/closed/017-preview-image-generator-security-audit.md:164` | Points to `steering/017-rulings.md` blocks 08:12Z, 09:01Z, 20:21Z; the first two observations were confirmed by steering's helper run at website `1ad625e` and `4b8db9c`; the third is read from code only |
| `security/closed/017-preview-image-generator-security-audit.md:6` | Status-Detail: the observations outside the reviewed delta are carried by `steering/017-rulings.md` for the access-defects fixer chain |
| `handoff/closed/local-walk-save-can-write-a-client-sent-low-message-id-2026-11-11.md:13-20` | `tools/uat-local-stack.sh up` moves `"Messages_id_seq"` to 900000000000001 and bounds only a save that sends no id; a save carrying an id inserts that id, so it could create a row in production's range and publish on `message-update-<id>` |
| `handoff/closed/local-walk-save-can-write-a-client-sent-low-message-id-2026-11-11.md:33-36` | Evidence by code reads, not run: `upsertMessage` sets `values.id = message.id`; `buildUpsertMessageQuery` inserts `onConflict('id')`; `model Message` has `id BigInt @id @default(autoincrement())` |
| `handoff/closed/local-walk-save-can-write-a-client-sent-low-message-id-2026-11-11.md:4` | Status Addressed 2026-11-19: uat-017's local walk saved ids 900000000000001 and 900000000000002; count below 900000000000001 was 0. That discharges the local-walk hazard only, not the access question |
| `handoff/closed/uat-local-stack-up-reuses-low-message-ids-2026-11-11.md:9,20-21` | `up` on a reused database sets the sequence from `greatest(900000000000000, max(id))`; a local-stack hazard, not an access control |
| `steering/017-rulings.md:795-816` | The owner-needing item stated; the helper run ("C1: user B's `getOne('1')` returned user A's personal message content", `:810`); callers of `getOne` read at `1ad625e` (`:816`) |
| `steering/017-rulings.md:908,931-932` | Restates that `getOne`'s personal branch calls `authorizeUser(session.user.id)` with no message id while `upsert` and `delete` pass `message.id`; call chain `enforceUserIsAuthed` -> `message.ts:51-61` -> `utils/user.ts` |
| `steering/017-rulings.md:954,963-964,968,988,1188` | Category `access-defects`; browser-check evidence goes to `verification/access-defects/browser-check/`; wait key `website-access-defects` opened, cleared at `:988`; `:1188` says the audit's three observations are carried by the access-defects fixer determination |
| `architecture/closed/015-bug-evaluation-fixes-architecture-findings.md:511` | `message.ts` calls `authorizeUser` and `authorizeGuildUser` directly, with `message.id` (a scalar) or with nothing; no caller passes an array |
| `architecture/closed/015-bug-evaluation-fixes-architecture-findings.md:562` | `authorizeUser` uses `if (messageIds)`, which admits `[]` |
| `planning/closed/015-bug-evaluation-fixes.md:322,330` | The empty-list latent sites in `authorizeUser` and `getOldMessages`; an empty list is treated as naming no messages |
| `planning/closed/017-existing-items-backlog.md:485,1350` | Names the local-walk handoff in the M2, M3 and M5 walk briefs |
| `planning/closed/016-send-check-validity.md:102` | D-7: on a local website build, message ids are moved above production's range before the first save |
| `architecture/preview-image-generator.md:145` | Preview object key is `[dev/]previews/<message id>/<nonce>.jpeg`; the website builds the same key to delete and sweep |
| `planning/closed/017-existing-items-backlog.md:949,1020` | M5-g key contract; failure line carries the message id, class and milliseconds |
| `research/competitive-feature-landscape-2026-11-08.md:166` | `ScheduledMessages` has an executor (`cron.ts`) and no writer procedure |
| Unrelated to the access mechanism | `architecture/system-architecture.md:122`, `architecture/website.md:288` (drafts keyed by message id); `research/closed/components-v2-editing-flows-2026-08-23.md:144`; `research/codebase-bug-evaluation-2026-11-08.md:114` (Pusher prompt reads a stale `hasChanged`); `planning/closed/014-test-suite-cleanup.md` (file ownership); `planning/closed/015-bug-evaluation-fixes.md:542-543` (Discord-link id fetched); `security/closed/015-preview-image-generator-security-audit.md:68`; `handoff/closed/bug-evaluation-fixes-post-deploy-2026-11-08.md:36`; `handoff/preview-image-generator-host-security-posture-2026-11-08.md:25` |

Not in the record by these predicates: no architecture, research, planning or handoff text states the access rule for personal messages, and none says that reading by number in `getOne` is intended (the audit says "not stated anywhere I searched"; these greps agree). `architecture/website.md` has one hit only (drafts). Open vs closed: the two mechanism documents (audit, local-walk handoff) are both under `closed/`; `handoff/` (open) has one hit, the generator host posture note, unrelated.

## Step 5. What this sweep could not see

- **Database side.** Row-level security, triggers, constraints other than the primary key, the live `Messages_id_seq` value and settings, and whether production already holds rows at numbers the sequence has not reached. `schema.prisma` at `749606d` shows no RLS; the live schema may differ (the 015 handoff speaks of a live-schema residual).
- **Race behaviour.** S6a's check-then-write gap and S6b's collision were read from code; nothing was run.
- **Vercel and hosting.** `vercel.json` shows only the cron entry; project env (`STATBOT_API_KEY`, `PREVIEW_IMAGE_API_KEY`, the generator's `API_KEY`), deployment protection, firewall or rate limits, and whether Vercel adds a header to cron calls are not text in the repos. All that is known is that `key=vercel` is the only guard in code.
- **Pusher app settings.** Whether the Pusher app restricts public-channel subscription, and which app (production's or not) a given environment uses (the workspace `CLAUDE.md` says that is not established).
- **Bucket settings.** Bucket policy, list permission and CDN config for `previews/` (the generator writes `ACL: 'public-read'`; whether anonymous listing is on is not visible). The generator host's proxy and PM2 env (`ecosystem.config.js` not read; the workflow file was deliberately not read).
- **Auth internals.** `getServerSideSessionCookie`, `redis.fetchAccountFromSession`, `redis.fetchUserGuilds`, the NextAuth adapter and the non-hydrated session callback were not audited. `getAccount` maps the Discord provider id to the DB user; account linking is out of scope.
- **Dynamic and generated routing.** Next.js routes were taken from `git ls-tree` file names; rewrites in `next.config.*` and routes added at build time were not read.
- **Client code paths.** Only call sites of `getOne`, `upsert` and `delete` were located. Client state (drafts in `localStorage`, `messageDrafts`) can carry an id from another environment into S6b, as the local-walk handoff says; not traced.
- **Tests.** The website's existing tests were not read for coverage of these surfaces (`utils/__tests__/user.in-predicate.test.ts` exists; not opened).
- **Beyond the four repos.** The `bot/` tree beyond the matches above, and any other consumer of the v1 routes (the stat bot that holds `STATBOT_API_KEY`).
- **Instrument caveat.** Counts are `git grep -c` summed with `awk`; file counts are `git grep -c ... | wc -l` over the one-line-per-file `-c` output. One cross-check against `git grep -l` agreed (agent-output `authorizeUser`: 92 files; website: 4 files). Under `rtk`, piped output could be regrouped, so the per-file raw files are the record.
