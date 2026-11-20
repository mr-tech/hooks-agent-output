# Unbounded client-input scoping sweep (M-001 property)

Read-only sweep by a `general-purpose` helper of `steering-roadmap-hooks`, 2026-11-20. The helper returned this content in its final
message, and steering wrote it here condensed (the record-search table cut to its relevant rows). Refs: website `origin/master`
7923a1d; project-utils `origin/master` 749606d; agent-output `052bb3b`. Nothing built, served, installed or run.

**Property swept:** a server-side handler validates client-sent input whose arrays (or records/maps) have no upper bound on their length
checked before each element is validated, or whose request body has no size limit below the framework default.

## 1. Server entry points

Command: `git -C website grep -n -E "publicProcedure|protectedProcedure|\.input\(|createTRPCRouter|procedure" origin/master -- src`,
then `git show origin/master:<path> | cat -n` per file. `publicProcedure = t.procedure` (`src/server/api/trpc.ts:104`);
`protectedProcedure = t.procedure.use(enforceUserIsAuthed)` (`trpc.ts:128`). Routers: guild, user, message (`root.ts:11-15`).

13 tRPC procedures, all `protectedProcedure` (11 with `.input(`, 2 without). Under `src/server/api/routers/`:

| file:line | procedure | schema |
|---|---|---|
| `guild.ts:7`, `:11`, `:19` | getGuild, getMessages, getWebhooksAndChannels | `discordIdShape` |
| `message.ts:44` | get | `userOrDiscordIdShape` |
| `message.ts:54` | getOne | `messageIdShape` |
| `message.ts:72` | getAll | none |
| `message.ts:78` | getFromUrl | inline `{ url: z.string().url().regex(...) }` |
| `message.ts:134` | getFromCode | inline `{ code: z.string() }` |
| `message.ts:195` | **upsert** (mutation) | `{ message: optionalIdMessageShape }` (`shapes.ts:358`) |
| `message.ts:208` | updateRecentMessageData (mutation) | `recentMessageDataShape` (`shapes.ts:340`) |
| `message.ts:221` | delete (mutation) | `{ id: messageIdShape }` |
| `user.ts:9` | getPreferences | none |
| `user.ts:27` | **updatePreferences** (mutation) | inline, incl. `recentMessageIds: z.array(z.string())` (`:31`), `message: partialMessageShape.nullable().optional()` (`:32`) |

Pages API (8 files): `trpc/[trpc].ts` (delegates); `auth/[...nextauth].ts`; `cron.ts` (query key, no body); `interactions-edge.ts`
(edge, `bodyParser: false` `:13`, signature checked before `JSON.parse` `:52`, no schema); `interactions-server.ts` (`x-hooks-api-token`,
reads `req.body.data.name`, no schema); `messages/codes/[code].ts` (GET, `{ code: z.string() }.strict()`); `v1/guilds/[guildId]/messages.ts`
and `.../messages/[id].ts` (GET, Bearer `STATBOT_API_KEY`, strict query shapes). `src/app/**/route.ts`: 0. `"use server"`: 0.

Cannot see: procedures composed indirectly, dynamically built `.input(` arguments, NextAuth internals.

## 2. Arrays reachable from server inputs, and their bounds

Command: `git -C website grep -n -E "z\.array\(|\.array\(\)|z\.record\(|z\.map\(|z\.set\(|z\.tuple\(|z\.lazy\(|z\.any\(|z\.unknown\(|z\.union\(|\.nonempty\(|\.length\(" origin/master -- src bot`.
Reached through `message.upsert` (`optionalIdMessageShape:358` → `messageShape:347` → `discordMessageShape:212` → base `:197`),
`user.updatePreferences` (`partialMessageShape:353`) and `user.ts:31`. Under `src/server/api/utils/`:

| file:line | array | bound at site |
|---|---|---|
| `shapes.ts:66` | action row `components` | `.max(5)` |
| `shapes.ts:83` | section `components` | `.max(3)` |
| `shapes.ts:95` | media gallery `items` | `.max(10)` |
| `shapes.ts:121` | container `components` (elements hold the bounded arrays above) | **none** |
| `shapes.ts:148-154` | embed `fields` | `.max(25)` |
| `shapes.ts:202` | allowed_mentions `parse` | **none** |
| `shapes.ts:203` | allowed_mentions `users` | **none** |
| `shapes.ts:204` | allowed_mentions `roles` | **none** |
| `shapes.ts:207` | message `embeds` | `.max(10)` |
| `shapes.ts:208` | message `components` (nests `:121`) | `.max(40)` |
| `routers/user.ts:31` | `recentMessageIds` | **none** at site; `.slice(0, 10)` at `:38` runs after parse |
| `shapes.ts:336` | import shape `components`, behind a `z.preprocess` map (`:310-315`) | `.max(40)`; client-only importers |

11 server-reachable array sites: 6 bounded at the site, 5 not. `z.lazy`, `z.record`, `z.map`, `z.set`, `z.tuple`, `.nonempty(`,
`.length(`: 0 in website `src`/`bot` and in project-utils. Container nesting is one level (`containerChildShape:110-117` excludes type
17). 39 lines hold `z.string()` in server and pages code; whether each is bounded was not computed.

Cannot see: runtime payload sizes, string lengths, the cost of the preprocess map, object key counts.

## 3. Body-size settings and raw length checks

`git -C website grep -c -E "sizeLimit|bodyParser|maxBodySize|bodySizeLimit|bodyLimit|content-length|serverActions|export const config|responseLimit" origin/master -- .`
→ `src/middleware.ts:1`, `src/pages/api/interactions-edge.ts:2`, `pnpm-lock.yaml:6` (all six `@smithy/middleware-content-length` names).
The only parser setting is `interactions-edge.ts:13` `bodyParser: false`. `next.config.js` has no `api`, `experimental` or
`serverActions` key. No `config` export on `trpc/[trpc].ts`, so the framework default body limit applies (its value is not in the repo;
not verified by the helper). No server-side length check before parse.

Cannot see: platform-level request limits on Vercel, the framework default's value, deployed environment variables.

## 4. zod versions and imports

website `package.json:94` `"zod": "^3.20.6"`; `pnpm-lock.yaml:241-243` resolves 3.22.4. Other lock resolutions: 3.25.76
(`eslint-plugin-react-hooks`), 4.6.7 (`@vercel/cli-config`). project-utils `package.json:15` `"zod": "^3.20.6"`, resolved 3.22.4 in the
website lock (`:13347`); its one import is `src/env.js:1` (environment validation). 14 website files import zod (`git grep -c`), among
them `routers/message.ts`, `routers/user.ts`, `utils/shapes.ts`, the three REST routes, `formatMutationError.ts` and `limits.tsx`.

A line-printing `git grep` of project-utils was not completed. The count form (`git -C project-utils grep -c ... origin/master`) and
`git show` of `package.json`, `src/env.js`, `src/postgres.ts` and `src/index.ts` stand in for it; the array, size and error-pattern count
over project-utils returned no matches (exit 1).

## 5. Validation error to response text

- `src/server/api/trpc.ts:78-80`: `errorFormatter({ shape }) { return shape; }`.
- `src/pages/api/trpc/[trpc].ts:11-18`: `onError` logs only in development.
- The three REST routes return a bare 400 on `ZodError` (`messages.ts:46`, `[id].ts:48`, `codes/[code].ts:23`).
- The client parses `error.message` as JSON (`src/utils/formatMutationError.ts:23`, `looksLikeZodIssues :5-10`, `formatZodIssues
  :12-14`). Catch sites: `NewMessageJsonInput.tsx:113-117`, `JsonModalBody.tsx:160-164`, `NewMessageModal.tsx:185-186, :429`,
  `MessagesProvider.tsx:44`, `MessageProvider.tsx:162`.
- `cron.ts:64-70` stores an error message in `ScheduledMessages.error`.

Cannot see: tRPC's default `message` (the repo does not override it), and what the browser renders.

## 6. Record search

`git -C agent-output grep -c -i -E "save.?size|size cap|body.?limit|sizeLimit|1 ?MB|zod" -- architecture research planning/closed roadmap`:
16 files, 68 lines (sum of `grep -c`). 0 hits for save-size, size cap, body limit or `sizeLimit`. The 9 "1 MB" lines are all the 017
client draft store (`planning/closed/017-existing-items-backlog.md:207, 255, 263, 266, 534, 538, 540, 648`;
`architecture/closed/017-…-findings.md:59`). The zod lines describe the save schema's design: plans 001 (V2 shapes, `.max(40)`), 007
(aggregate text refinement), 012 (embed caps), 013 (raw issue array shown to users, D32), 016 (URL predicate);
`architecture/website.md:141-147` (issues formatted per issue); `system-architecture.md:187, 207`.
