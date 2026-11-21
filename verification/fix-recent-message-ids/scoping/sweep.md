# Scope sweep: P1 / P2 sites for the recent-message-ids fix

Read at refs (confirmed with `git -C <repo> rev-parse --short origin/master`): website `76da25c`, project-utils `749606d`, preview-image-generator `8512a1d`. All code read via `git -C <repo> show|grep origin/master`, never the working tree. No `.env` read. Raw outputs: `raw/` beside this file.

`tools/reader-writer-sweep.sh` does not exist (`ls agent-output/tools/` lists build-index.js, check-repo.js, uat-local-stack.sh, website-audit-dispositions.json, website-dependency-audit.js and their tests only). Not used.

One Bash call (a `cat` of a raw file plus a `git grep -n ... -- src` over preview-image-generator) was not completed, and was not retried in any form. I read the raw file with the Read tool instead. The preview-image-generator grep had already run once into `raw/preview-image-generator-messages.txt`; that is the only preview-image-generator evidence here.

## Definitions quoted from code

"Authorized for a guild" (guild-message routers). `src/server/api/utils/authorizeGuildAdmin.ts:40-46`:
```
const guild = userGuilds.find(({ id }) => id === guildId);
if (!guild) { throw new TRPCError({ code: 'FORBIDDEN', message: 'User does not have permission to access to this server.',
```
where `userGuilds = redis.fetchUserGuilds(...)`, which keeps only `guild.owner || hasDiscordPermissions(guild.permissions, ['Administrator'])` (`src/utils/redis/index.ts:220-243`, the `trimmedGuilds` loop). `authorizeGuildUser.ts:36-42` calls `authorizeGuildAdmin`, then (`:26`) refuses if any named message's `Guilds.guildId !== guildId`. `getPartialMessages` gates by `session.user.guilds` (same trimmed list): `shared.ts:183` `.where('Guilds.guildId', 'in', guilds.map(({ id }) => id))`.
Note: an existing handoff (`handoff/authorize-guild-admin-tests-membership-not-admin-bits-2026-11-19.md`, cited by the S1b record) concerns this gate; I did not re-read it and the fetchUserGuilds trim is what I read.

Shapes for message ids (`src/server/api/utils/shapes.ts`):
```
:112 const MAX_MESSAGE_ID = 9223372036854775807n;
:114 export const messageIdShape = z.string()
:115   .regex(/^[0-9]{1,19}$/)
:116   .transform((id) => BigInt(id))
:117   .refine((id) => id <= MAX_MESSAGE_ID)
:118   .transform((id) => id.toString());
:119 export const userOrDiscordIdShape = z.string().regex(/^(0|[0-9]{17,23})$/);
:418 recentMessageDataShape = z.object({ id: messageIdShape, ... })
:436 optionalIdMessageShape = messageShape.extend({ id: messageIdShape.optional() })
```
Also in the same file and not safe: `:431 partialMessageShape ... id: z.string().optional()`, `:440 idMessageShape ... id: z.string()`. Cap helpers: `boundedArray`, `cappedInput` (`shapes.ts`, used at `user.ts:3,29`). Existing test of the shape: `shapes.message-id.test.ts` (refuses `1e3`, `abc`, `0x10`, `1.5`, `-1`, `+1`, ` 1`, empty, 20 digits, `9223372036854775808`; accepts max, `0042`->`42`, `0`).

## Commands and their blind spots

| # | Command (run from /usr/local/bin/hooks) | Raw | Cannot see |
|---|---|---|---|
| C1 | `git -C website grep -n -E "selectFrom\('Messages'\)\|\"Messages\"\|fk_guilds_id\|fk_messages_id\|'Messages'" origin/master -- src bot` | raw/p1-messages-table.txt | queries built through a variable table name, a generic helper, or raw SQL strings not naming `Messages`; the `bot/` tree hit nothing |
| C2 | `git -C website grep -n -E "messageId\|messageIds\|messageIdShape\|idMessageShape\|optionalIdMessageShape\|partialMessageShape\|recentMessageDataShape\|z\.number\(\{ coerce" origin/master -- src bot ':!*__tests__*'` | raw/p2-message-id-inputs.txt | inputs named `id` with no shape name (found by reading the routers and the v1 routes instead) |
| C3 | `git -C website grep -n -E 'recentMessageIds\|getUserRecentMessages\|updatePreferences\|messageIdShape\|hydratedAuthCallback' origin/master` (whole tree: src, docs, config) | raw/identifiers-website.txt | other spellings; the tree has no .md/.json/.yml hit for these symbols (a separate `-- '*.md' '*.json' '*.mjs' '*.yml' '*.yaml' '*.sql'` grep returned nothing) |
| C4 | `git -C website grep -n -E "hydratedAuthOptions\|getHydratedServerAuthSession\|authOptions\|hydrate" origin/master -- src ':!*__tests__*'` | raw/session-callback-wiring.txt | runtime config |
| C5 | project-utils and preview-image-generator: `git -C <repo> grep -n -i -E 'Messages\|fk_guilds_id\|messageId\|recentMessage' origin/master -- . ':!*lock*' ':!*.md'` | raw/project-utils-messages.txt, raw/preview-image-generator-messages.txt | project-utils is the schema/types package (prisma `Messages.id BigInt`, `fk_guilds_id BigInt?`); generated types give `string`. No query code. preview-image-generator: only the S3 key `previews/${messageId}/${nonce}.jpeg` in `src/generateImage.ts:49,57`; no database access found by C5 |
| C6 | record: `grep -rn -I -E "getUserRecentMessages\|recentMessageIds\|updatePreferences\|messageIdShape\|hydratedAuthCallback" agent-output/{architecture,research,planning/closed,handoff} verification/access-defects/scoping/sweep.md implementation/closed/*personal-message-access* code-review/closed/*personal-message-access*` | raw/record-grep.txt | other closed dirs, QA and security documents (not searched except as named in the brief) |

I also read in full at origin/master: `routers/message.ts`, `routers/user.ts`, `utils/{shared,guild,user,authorizeGuildUser,authorizeGuildAdmin,previewImage,shapes(95-140,410-445)}.ts`, `auth.ts:100-306`, `trpc.ts:55-80`, `pages/api/auth/[...nextauth].ts`, both `pages/api/v1/guilds/[guildId]/messages*.ts`, `pages/api/messages/codes/[code].ts`, `app/message/page.tsx`, `usePreferences.ts`.

No reference query against a real database was run (none available at origin/master; see Test infrastructure).

## P1 sites (signed-in user receives data of a message of a guild the user does not administer)

| Site | file:line | Quote | P1? | Reason |
|---|---|---|---|---|
| getUserRecentMessages | `src/server/api/utils/shared.ts:122-126` | `.where('Messages.id', 'in', messageIds)` / `eb('Messages.fk_users_id', '=', dbUserId),` / `eb('Messages.fk_guilds_id', 'is not', null),` | **YES** | ids come from the caller's own `Users.preferences.recentMessageIds` (written unchecked by `user.updatePreferences`, `user.ts:32,56`). The `or` admits any row with a non-null guild; no comparison to `session.user.guilds`. Returned fields (`:118-121`, `mapPartialApiMessage`): `id, createdAt, updatedAt, name, previewImageNonce, guildId` (Discord guild id). Not `data`. |
| hydratedAuthCallback | `src/server/auth.ts:138-140,172` | `getUserRecentMessages(preferences.recentMessageIds, user.id)` ... `session.hydration = { messages };` | **YES** (the delivery path of the row above) | Reached by `/api/auth/session` (`[...nextauth].ts:11` uses `hydratedAuthOptions`) and by any tRPC call with `?hydrate=true` (`trpc.ts:65-68`); only the NextAuth session endpoint returns `hydration` to the browser. The callback already holds `guilds` (`:153-156`) when it receives the rows, but never filters by them. Client consumers: `app/_components/Providers.tsx:41`, `app/message/page.tsx:70-76` (matches stored ids to hydrated rows). |
| user.updatePreferences (write feeding it) | `src/server/api/routers/user.ts:32,56` | `recentMessageIds: boundedArray(z.string(), MAX_RECENT_MESSAGE_IDS + 1).optional()` | not a read; it is the user-controlled source for the two rows above | |
| message.getOne | `routers/message.ts:57-59` | `const message = await getMessage(messageId); if (message.guildId) { await authorizeGuildUser(req, message.guildId);` | no | guild message is returned only after `authorizeGuildAdmin` (trimmed guild list). Personal: `authorizeUser(session.user.id, message.id)` owner compare (`user.ts:27`). `getMessage` throws before auth for absent ids (existence difference, no data). |
| message.get | `routers/message.ts:46-51` | `return getGuildMessages(id, req);` | no | `guild.ts:49` `authorizeGuildAdmin` first; `where Guilds.guildId = guildId` (`:64-69`). |
| message.getAll / getPartialMessages | `shared.ts:164-187` | `or([ eb('Messages.fk_users_id','=',userId), exists(... 'Guilds.guildId','in', guilds.map(...)) ])` | no | session guild list is the admin-trimmed one. |
| message.upsert, updateRecentMessageData, delete | `message.ts:195-244` | `authorizeGuildUser(req, message.guildId, message.id)` / `authorizeAction(...)` | no | guild paths authorize and check each named message's guild (`authorizeGuildUser.ts:26`); writes carry owner terms (`shared.ts:229-251,305-341`). Return value of upsert is `getMessage(id)` of the row just written. |
| getUserMessages | `shared.ts:132-143` | `.where('Messages.fk_users_id', '=', dbUserId)` | no | personal only. |
| v1 guild routes | `pages/api/v1/guilds/[guildId]/messages.ts:23`, `messages/[id].ts:23,39` | `req.headers.authorization !== \`Bearer ${key}\`` / `if (message?.guildId !== guildId) return res.status(404)` | no | server-to-server key (STATBOT_API_KEY), not a signed-in user session. They return `data`. |
| cron, previewImage, backfillValid, authorizeUser/GuildUser lookups | `pages/api/cron.ts:21-26`, `previewImage.ts:25-37`, `scripts/backfillValid.ts:195-221`, `user.ts:17-21`, `authorizeGuildUser.ts:15-19` | | no | not user-reachable reads, or return only an ownership column / counts to the caller's own authorization. |
| `messages/codes/[code]`, `message.getFromCode`, `getFromUrl` | `codes/[code].ts:20`, `message.ts:78-110` | | no | redis message store / Discord API; no Messages table. |
| Client preference reads | `usePreferences.ts:13`, `app/message/page.tsx:74` | | no (client) | only feed ids back to the server via updatePreferences and filter hydrated rows. |

P1 verdict: the single entry point with the property is `getUserRecentMessages` as delivered by `hydratedAuthCallback`. The record already states this (see Record, below).

## P2 sites (client-supplied or stored value later used as a message id against the database; contract admits non-int8)

| Site | file:line | Quote | P2? | Reason |
|---|---|---|---|---|
| user.updatePreferences `recentMessageIds` elements | `routers/user.ts:32` | `boundedArray(z.string(), MAX_RECENT_MESSAGE_IDS + 1)` | **YES** | element is bare `z.string()`. Stored, read back at `auth.ts:139` -> `shared.ts:122` `where Messages.id in (...)`, so postgres refuses (`out of range for type bigint` per the handoff). Effect: the user's own hydrated session throws on each `/api/auth/session` and each `?hydrate=true` tRPC call. Length cap (11, then slice 10) exists; element shape does not. |
| getUserRecentMessages parameter | `shared.ts:109-110` | `messageIds: string[]` | **YES** (the sink; no validation at read) | accepts any stored string. Also a risk for ids stored before any input fix (see Uncovered). |
| v1 `messages/[id].ts` | `pages/api/v1/guilds/[guildId]/messages/[id].ts:19,32` | `id: z.number({ coerce: true })` ... `.where('Messages.id', '=', id.toString())` | **YES** (key-gated caller, not a signed-in user) | `Number("1.5")`->`"1.5"`; `Number("1e30")`->`"1e+30"`; `Number("9223372036854775807")`=9223372036854775808 -> `"9223372036854776000"`; `Number("")`->0; `Number("-1")` ok. Non-integer or beyond-int8 strings reach postgres; only `NaN` is refused by zod. (Derived from JS number semantics; not run.) |
| `partialMessageShape.id` | `shapes.ts:432`, used `user.ts:33` | `id: z.string().optional()` | no, as a database id | stored in the `preferences.message` JSON; no server reader of `preferences.message.id` found by C2/C3 (only a commented line `app/message/page.tsx:99`). Contract is loose but nothing runs it against the column at origin/master. |
| `idMessageShape.id` | `shapes.ts:440-441` | `id: z.string()` | no | exported; users at `user.ts:69`, `guild.ts:16` are commented out. |
| `message.getOne` | `message.ts:55` | `.input(messageIdShape)` | no | shaped. |
| `message.upsert` | `message.ts:196` | `optionalIdMessageShape` | no | shaped. |
| `message.updateRecentMessageData` | `message.ts:209` | `recentMessageDataShape` (`id: messageIdShape`) | no | shaped. |
| `message.delete` | `message.ts:222` | `z.object({ id: messageIdShape })` | no | shaped. |
| authorizeUser / authorizeGuildUser `messageIds` | `user.ts:9`, `authorizeGuildUser.ts:10,39` | `messageIds: string \| string[]` | no at origin/master | their callers pass shaped ids only (upsert/update/delete/getOne). Not a shape site themselves. |
| `message.get` input | `message.ts:45` | `userOrDiscordIdShape` | no | `'0'` or a 17-23 digit guild id; compared to `Guilds.guildId` (string), not a message id. |
| `getFromUrl` messageId | `message.ts:89,104` | regex `\d+` group | no | goes to the Discord API, not the database. |
| Route-segment ids (`/message/m/[id]`, `/message/f/[id]`) | `MessageProvider/index.tsx:211`, `f/[id]/page.tsx:181` | `api.message.getOne.useQuery(...)` | no | client calls the shaped procedure. |
| cron, previewImage, preview-image-generator | | | no | ids from the database, not client input. |

## Record on the mechanism (path:line, populations/consequences)

- `handoff/hydrated-recent-list-returns-guild-message-rows-2026-11-19.md` (Status Open, UUID 98f075f4): states the guild arm `fk_guilds_id is not null` returns metadata `id, createdAt, updatedAt, name, previewImageNonce, guildId` for any guild's message number stored in `recentMessageIds`; "Read from code, not run" (its "What is seeded" paragraph). Review trigger: next edit of `getUserRecentMessages`.
- `handoff/update-preferences-recent-message-ids-accepts-non-int8-2026-11-19.md` (Open, af63220f): non-int8 entry fails that user's own hydrated session; self-only; site count 1; the pg error text `value "99999999999999999999" is out of range for type bigint`; chain 018 excluded it as X-10 (changelog 2026-11-20T04:44).
- `architecture/system-architecture.md:136`: "returns the user's own rows and guild rows. The guild rows are carried by `handoff/hydrated-recent-list-...`".
- `architecture/website.md:258`: `recentMessageIds` cap `MAX_RECENT_MESSAGE_IDS + 1`, server `slice`, client cut in `usePreferences.ts`.
- `verification/access-defects/scoping/sweep.md:53` (S11): "guild rows are not filtered either"; consequence "returns those rows' metadata, personal rows of others included. ... gives the `previewImageNonce` that completes the public preview URL (S16)". `:54` (S12): `partialMessageShape` draft ids live in a JSON blob. `:89,:98`: identifier counts. `:139`: auth internals, `fetchUserGuilds` and non-hydrated callback not audited at that time.
- `planning/closed/018-next-upgrade-save-size-cap.md:205` (S11 length cap), `:586` (X-10), `:603` (handoff fires at M1).
- `planning/closed/015-bug-evaluation-fixes.md:320-329` (empty `recentMessageIds` returns no messages), `:415-441` (D21: promise handling in `hydratedAuthCallback`).
- `research/codebase-bug-evaluation-2026-11-08.md:85,91`; `architecture/closed/015-bug-evaluation-fixes-architecture-findings.md:363,560`; `architecture/closed/018-...findings.md:29`; `planning/closed/005-user-reported-bug-fixes.md:107`.
- `implementation/closed/fix-personal-message-access-implementation.md:72` (S11 diagnosis: red run, real-database run), `:101-102` ("ids already stored in production preferences are covered ... `updatePreferences` still stores whatever numbers it is sent"), `:127`, `:206-208` (guild rows out of scope), `:227` (change entry), `:310-327` (real-database run: pg instrument, `787bec5` 14 cases 6 pass 8 fail, `2e50cd9` 14/14).
- `code-review/closed/fix-personal-message-access-code-review.md:40,115,200-227` (CR-3: non-int8 in own `recentMessageIds` fails own hydrated session; "passes at every SHA", site count 1 by `git grep -n "recentMessageIds" d597734 -- src`), `:255,:453` (`user.id` use).
- Stated populations: no document counts production rows whose stored `recentMessageIds` contain non-digit or out-of-range entries or foreign guild numbers. Only "ids already stored in production preferences are covered" at the read (implementation :101) for the personal case.

## Tests at origin/master touching the two symbols

- `getUserRecentMessages`:
  - `src/server/api/utils/__tests__/shared.in-predicates.test.ts`: "getUserRecentMessages issues no query and returns no messages for an empty id list"; "...binds a non-empty id list as parameters of one in-list, beside the caller as owner". The second asserts the SQL contains `"Messages"."fk_users_id" = $3 or "Messages"."fk_guilds_id" is not null` (it asserts the guild arm; any fix that removes the arm changes this expectation). Capturing fake database, no postgres.
  - `src/server/__tests__/auth.hydrated-recent-messages.test.ts`: "the hydrated session's recent messages lists a recent personal message the signed-in user owns"; "leaves out another user's personal message stored in the preferences". Fake responder; `guildId: null` rows only, no guild-row case.
  - `src/server/__tests__/auth.hydrated-session.test.ts` mocks `getUserRecentMessages` (`:28`); 17 callback timing/rejection cases, none about content.
- `updatePreferences` `recentMessageIds`: `src/server/api/routers/__tests__/user.save-limits.test.ts`: "user.updatePreferences input: recentMessageIds" (`refuses 12 %s elements ...` valid / wrong primitive / null; "refuses 61 elements with one issue for the list"; "accepts %i elements" 11/10/0) and "user.updatePreferences stored list keeps the first ten of the eleven ids the input admits". No case on element content (non-digit / beyond int8 elements are not tested either way).
- Client: `src/providers/MessageProvider/__tests__/usePreferences.recent-list-bound.test.tsx` ("moves the open message to the front ...", "puts the open message first ...", "sends nothing for a user with no stored list ...").
- `messageIdShape`: `shapes.message-id.test.ts`, `shapes.error-cap.test.ts`.
- v1 `[id]` route: no test of the `z.number({coerce})` id found (`guildMessages.*` tests: malformed-query, statbot-key-required, valid-exposure; I did not read their bodies).

## Test infrastructure for a real postgres

- At origin/master: no `*.pg.test.ts` (`git -C website ls-tree -r --name-only origin/master | grep -c -E '\.pg\.test\.'` = 0), no pglite/pg-mem/testcontainers dependency (package.json grep for `pg|postgres|pglite|testcontainers` found only `project-utils` and `prisma`), no compose/docker file or workflow in website. `package.json` scripts: `"test": "vitest run"`, `"typecheck": "tsc --noEmit && tsc --noEmit -p tsconfig.test.json"`, `"lint"`. `vitest.config.ts`: projects `node` (`src/**/*.test.ts`, `bot/**/*.test.ts`) and `dom` (`src/**/*.test.tsx`, jsdom). Every DB test fakes `project-utils` with `vi.mock('project-utils', () => ({ getPostgres: () => holder.db }))` using `__tests__/helpers/capturingDatabase.ts` (kysely with a capturing driver that returns canned rows; the SQL is compiled by kysely but never executed).
- Outside the repo, the record holds a pg harness: `agent-output/verification/fix-personal-message-access/pg/run-pg.sh <sha> <port> <work> <out>` and `.../security/run-security.sh <sha> <port> <work> <out> <test-file> [<replacements.json> <id>]` (header: `git archive` export of one website commit, test copied to `src/server/__tests__/<base>.pg.test.ts`, throwaway `postgres:16` container, schema from project-utils `749606d` `prisma/schema.prisma` via `prisma migrate diff` (`pg/schema-749606d.sql`, 9 tables), message ids moved to >= 900000000000001, vitest under `timeout`, container removed on exit). Existing tests there: `pg/ownership.pg.test.ts`, security `attack.pg.test.ts` and `read-race.pg.test.ts`, per the implementation document (`:310-327`) and `run-security.sh` header. I read only the `run-security.sh` header (30 lines) and the implementation text, and did not execute either script. `agent-output/tools/uat-local-stack.sh` runs a labelled `postgres:16` container `hooks-postgres-local` against website/.env.local's host/port (local-only guard, id sequence moved past 900000000000001); I read its header only.

## Not covered by this sweep

- Production data: no count of stored `recentMessageIds` that are non-digit, beyond int8, or point at guild messages. Any input-contract fix leaves already-stored bad values in `Users.preferences`; the read path (`hydratedAuthCallback` -> `getUserRecentMessages`) still receives them. Not queried (no production-host read).
- The `Users.preferences` column is JSON: other writers of preferences (the NextAuth adapter at `src/kysely-adapter`, bot, scripts, direct DB) were not enumerated; C3 shows only `user.updatePreferences` in `src`.
- `getPreferences` (`user.ts:10-26`) returns stored preferences, including any bad ids, to the owner (self-only); not classified.
- Runtime behaviour: nothing was executed; v1 coercion results and the P1 guild-row return are read from code (the handoff also says "read from code, not run").
- The `bot/` tree: grep for `Messages|fk_guilds_id` returned no hit; no read beyond that. `interactions-edge.ts` / `interactions-server.ts`: no Messages hits (count grep only).
- Auth internals (`getServerSideSessionCookie`, `redis.fetchAccountFromSession`, the NextAuth adapter) not audited; the admin trim in `fetchUserGuilds` is cached 600 s (`getFromCache ... expireSeconds: 600`), so a demoted admin's list is stale for up to that long (read, not tested).
- `authorizeGuildAdmin` handoff (ed49f3d2) on membership vs admin bits not re-read.
- preview-image-generator: one grep only (a second one was not completed and not retried); project-utils: schema and generated types only, with no look at `src` code beyond the grep hits.
- Test bodies of `guildMessages.*` v1 tests, QA and security documents, and `steering/` rulings were not read.
- The comparison of the DOM/`Providers` client path of `session.hydration` was limited to the two grep hits.
