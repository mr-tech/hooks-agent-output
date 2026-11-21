# Sweep A — fix-api-secret-compare scoping

Refs read: website origin/master 76da25c, project-utils origin/master 749606d (both confirmed with `git -C <repo> rev-parse --short origin/master`). Code read at the ref only (`git show origin/master:<path>`, `git grep ... origin/master`).

## A1 — non-constant-time comparison of a client-supplied credential

Method: `git -C website grep -nE "(token|secret|key|signature|password)\w*\s*(===|!==|==|!=)|(===|!==)\s*(env\.|process\.env)" origin/master -- src bot ':!*__tests__*'` (the other hits were UI key events, Redis/S3 key lookups and unrelated), plus direct reads of every file under src/pages/api and src/middleware.ts. Result:

| # | Site | Has A1? | Fail closed when expected value unset |
|---|---|---|---|
| 1 | `src/pages/api/v1/guilds/[guildId]/messages.ts:22-23` `if (!key \|\| req.headers.authorization !== \`Bearer ${key}\`) return res.status(401).end();` (`key = process.env.STATBOT_API_KEY`) | yes, `!==` on a template string | yes, `!key` catches unset and empty |
| 2 | `src/pages/api/v1/guilds/[guildId]/messages/[id].ts:22-23` identical guard | yes | yes |
| 3 | `src/pages/api/interactions-server.ts:11` `if (req.headers['x-hooks-api-token'] !== env.HOOKS_API_TOKEN) return res.status(401).end();` | yes, `!==` | cannot tell from the handler. `src/env.mjs:36` declares `HOOKS_API_TOKEN: z.string()` (not `.min(1)`), so an empty-string value is admitted by the schema, and then a request with header `x-hooks-api-token: ` (empty) may equal it; whether an unset variable fails the build or boot depends on `env.mjs` skip-validation settings, which I did not read. The handler has no `!token` check of its own. |
| 4 | `src/pages/api/cron.ts:15` `if (req.query.key !== 'vercel')` -> 404 | yes, `!==`, but the expected value is a literal in source, not a secret (see handoff 4bc9b626). Not unset-able, so fail-closed does not apply. | n/a (constant) |

Already using a constant-time or library primitive (no A1):
- `src/pages/api/interactions-edge.ts:39-46` Discord signature: `verify(...)` from `discord-verify` with `crypto.subtle`, `env.DISCORD_PUBLIC_KEY`. Result `!isValid` -> 401. Fail-closed on a bad or missing signature (the header values are cast `as string`; a missing header reaches `verify` as undefined, whose behaviour I did not trace). Note: the brief names `verifyKey` from `discord-interactions`; this repo uses `discord-verify` (`git grep -nE "timingSafeEqual|verifyKey|crypto\.subtle|discord-verify|discord-interactions" origin/master -- src package.json` returns only the edge handler, its test and `package.json:56`). Whether `discord-verify` compares in constant time is inside the dependency, not read.
- `timingSafeEqual`: 0 hits anywhere in website src or package.json.

Other files read and clear of A1: `src/middleware.ts` (adds an `x-pathname` header, no credential), `src/pages/api/messages/codes/[code].ts` (code is a Redis lookup key through `messageStore.retrieve`; not a credential compare that I could see, not read inside messageStore), `src/pages/api/auth/[...nextauth].ts` and `src/pages/api/trpc/[trpc].ts` (not read in full; grep pattern returned nothing there). `src/server/api/utils/authorizeGuildAdmin.ts:17` is `typeof sessionToken !== 'string'`, a type test, not a compare. No `route.ts` handlers exist under src/app (`git ls-tree -r --name-only origin/master | grep -E "/route\.(ts|js)$"` returns nothing).

Caller of site 3: `bot/edgeCommands.ts:55` sends `'x-hooks-api-token': env.HOOKS_API_TOKEN` in a `fetch` to `${getBaseUrl()}/api/interactions-server` (the `get_message` command).

project-utils: `git -C project-utils grep -nEi "cron|schedul|timingSafeEqual|verifyKey|API_KEY|SECRET|authorization" origin/master` returned only schema/type hits (ScheduledMessages, a `cron` column); a `===`/`!==` grep over `src` filtered for key/token/secret/auth/signature returned 0 lines. No server-side credential check in project-utils (it is a Kysely/Prisma schema and `getPostgres()` package).

preview-image-generator (counts only, src only): `git -C preview-image-generator grep -c "STATBOT_API_KEY\|api/cron\|ScheduledMessages" origin/master -- src` printed nothing (0 matching files). Credential comparisons inside that repo were not otherwise swept.

## A2 — message number coerced through a JS number

Method: `git -C website grep -nE "coerce|parseInt\(|Number\(|BigInt\(|parseFloat|\+params|params\.id" origin/master -- src ':!*__tests__*'`, filtered by eye for id/params/query.

| Site | Has A2? |
|---|---|
| `src/pages/api/v1/guilds/[guildId]/messages/[id].ts:19` `const queryShape = z.object({ guildId: discordIdShape, id: z.number({ coerce: true }) }).strict();` then `:32` `.where('Messages.id', '=', id.toString())` | **yes.** `req.query.id` is a string, coerced by `Number()`; `id.toString()` of a number beyond 2^53 loses digits (and `1e21` becomes "1e+21", fractions "1.5" reach postgres as text for a bigint column). Not a path-only issue: `id` comes from the Next dynamic path segment. |
| `.../messages.ts:40` and `.../messages/[id].ts:42` `id: Number(m.id)` / `Number(message.id)` | no for A2 (response serialization of a DB value, not a request id); but it is a precision loss on output for ids above 2^53, adjacent, not in the property. |
| `src/server/api/routers/message.ts:55,222` use `messageIdShape` | no (string regex, BigInt range check). |
| `src/server/api/utils/shared.ts:275` `Number(messageCount)` | no (a count). |
| `src/utils/constructImageUrl.ts:5`, `src/scripts/backfillValid.ts:224` | no (unrelated). |
| `src/app/message/m/[id]/**` pages | none found by the grep; page-level id handling (e.g. `params.id` passed to tRPC) was not read file by file. |

`messageIdShape`, `src/server/api/utils/shapes.ts:112-118`:
```
const MAX_MESSAGE_ID = 9223372036854775807n;

export const messageIdShape = z.string()
  .regex(/^[0-9]{1,19}$/)
  .transform((id) => BigInt(id))
  .refine((id) => id <= MAX_MESSAGE_ID)
  .transform((id) => id.toString());
```
It is also used at `shapes.ts:419` (`recentMessageDataShape.id`) and `:437` (`optionalIdMessageShape.id`). Its test: `src/server/api/utils/__tests__/shapes.message-id.test.ts` (`describe('messageIdShape')`, two `it.each`).

## Handoff read whole: `handoff/website-api-handler-hardening-2026-10-10.md` (UUID b1fdd41a, Open)
Item 2 names exactly the 3 sites above (v1 x2, interactions-server) and owes one `secretEquals(a,b)` using `timingSafeEqual` over SHA-256 digests; v1 must keep failing closed on unset/empty `STATBOT_API_KEY` and accept exactly `Authorization: Bearer <key>`. It does not name `cron.ts` (a fixed constant) nor the A2 `z.number({coerce:true})` site. Item 3 owes an enumerating guard test over `src/pages/api/v1/`; item 4 says keep the request-time `!key` check if `STATBOT_API_KEY` enters `env.mjs`; item 5 is a helper move (`makeRes` in `src/server/api/v1/__tests__/helpers/apiResponse.ts`, 4 importers). Item 1 discharged. Timing exploitability over the network "has not been measured".

## Covering tests at origin/master 76da25c
Method: `git ls-tree -r --name-only origin/master | grep __tests__ | grep -iE "v1|interactions|cron|shapes|apiResponse|messageCodes"`, then `grep -nE "^\s*(describe|it|test)(\.each)?\("` on each.
- `src/server/api/v1/__tests__/guildMessages.statbot-key-required.test.ts`: `describe.each(endpoints)('/api/v1 guild messages (%s) requires the Statbot key')`; cases at :55 (it.each), :72 `refuses an unauthenticated non-GET with 401, before the method check`, :78 `serves the rows for exactly \`Bearer <key>\``, :84 (it.each). Covers the v1 guard incl. unset key (case bodies not read).
- `src/server/api/v1/__tests__/guildMessages.malformed-query.test.ts`: `/api/v1 guild messages answer a malformed query with a completed 400` (it.each :39). Whether it covers an id of 2^53+1 or `1e3` was not read; this is the test to inspect for A2.
- `src/server/api/v1/__tests__/guildMessages.valid-exposure.test.ts`: `/api/v1/guilds/[guildId]/messages (list)` and `.../messages/[id] (single)`.
- interactions-server: **no test file found** (`git grep -ln "interactions-server" origin/master -- src bot` returns only `bot/edgeCommands.ts`, `src/kysely-adapter/database.ts`, `src/kysely-adapter/index.ts`; none is a test of the handler). Coverage of the `x-hooks-api-token` check: none.
- `src/server/api/__tests__/interactions-edge.signature-before-parse.test.ts` covers the edge signature path (not the token path).
- `src/server/api/__tests__/cron.scheduled-selection.test.ts` includes `runs no query for a request without the cron key`.

## External callers named in the record
`grep -rnE "v1/guilds|STATBOT_API_KEY" agent-output/{architecture,handoff,planning/closed}`: the caller is Statbot (statbot-api -> hooks.gg v1) per `handoff/closed/fix-v1-guild-messages-auth-post-deploy-2026-10-10.md:16,23-24` (Statbot dashboard statrole editor populating the hooks.gg message list; fallback: count 401s from Statbot's egress in Vercel logs) and `handoff/closed/v1-guild-messages-endpoints-unauthenticated-2026-08-24.md:13,104` (key issuance/rotation outside this repo; whether the key is compromised was unanswerable). Other hits (`architecture/closed/015-...:538`, `architecture/system-architecture.md:126`, `planning/closed/012:398`, `planning/closed/016:124`) concern the `valid` field being served, not callers. The key's issuance and rotation are not in the record.

## Not covered
- `src/pages/api/auth/[...nextauth].ts`, `src/pages/api/trpc/[trpc].ts`, tRPC context (`src/server/api/trpc.ts`) not read in full; only the pattern grep ran over them.
- `bot/` handlers beyond the grep, `src/env.mjs` skip-validation flags, `messageStore.retrieve` internals, `discord-verify` internals.
- Test case bodies (not read), so no claim that any test would be red against a non-constant-time compare or an `id` above 2^53.
- preview-image-generator (counts only, as instructed); no .env file read.
- Vercel/host configuration and whether timing is exploitable in practice (unmeasured).
