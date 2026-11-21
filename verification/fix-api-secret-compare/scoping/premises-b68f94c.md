# Premise re-read: fix-api-secret-compare, website origin/master b68f94c (sweep was at 76da25c)

Setup: `git -C /usr/local/bin/hooks/website fetch origin` (ok), `git -C /usr/local/bin/hooks/website rev-parse --short origin/master` -> **b68f94c**. All code read with `git show origin/master:<path>` / `git grep ... origin/master`. No .env read; preview-image-generator not searched.

## 1. Diff 76da25c..b68f94c over the sweep's paths
Command: `git -C website diff --numstat 76da25c origin/master -- src/pages/api src/env.mjs bot/ src/server/api/utils/shapes.ts src/server/api/v1/__tests__ src/middleware.ts`
Result: empty (no changed file in any of those paths). So no cited line moved or changed.
Whole-range context (`git diff --numstat 76da25c origin/master`): 25 files changed, none under those paths; they are in src/app/message, src/components, src/providers, src/server/{auth.ts,routers,utils/shared.ts,__tests__}, src/utils/redis. `git log --oneline 76da25c..origin/master` shows 13 commits (editor typing, new-message dialog, not-found message, hydrated session filters).

## 2. Sweep sites at b68f94c (line numbers from `git show origin/master:<path> | cat -n`)
v1 `src/pages/api/v1/guilds/[guildId]/messages.ts`:
- 22: `  const key = process.env.STATBOT_API_KEY;`
- 23: `  if (!key || req.headers.authorization !== \`Bearer ${key}\`) return res.status(401).end();`
- 24: `  if (req.method !== 'GET') return res.status(405).end();`
- 19: `const queryShape = z.object({ guildId: discordIdShape }).strict();`
- 40: `      id: Number(m.id),`

v1 `src/pages/api/v1/guilds/[guildId]/messages/[id].ts`:
- 19: `const queryShape = z.object({ guildId: discordIdShape, id: z.number({ coerce: true }) }).strict();`
- 22-23: same two lines as above (identical guard)
- 24: `  if (req.method !== 'GET') return res.status(405).end();`
- 26: `    const { guildId, id } = queryShape.parse(req.query);`
- 32: `      .where('Messages.id', '=', id.toString())`
- 39: `    if (message?.guildId !== guildId) return res.status(404).end();`
- 42: `      id: Number(message.id),`

`src/pages/api/interactions-server.ts`:
- 7-9: `if (req.method !== 'POST') { return res.status(405).end(); }`
- 11: `  if (req.headers['x-hooks-api-token'] !== env.HOOKS_API_TOKEN) {`
- 12: `    return res.status(401).end();`
- 4: `import { env } from '~/env.mjs';`

`src/pages/api/cron.ts`:
- 15: `  if (req.query.key !== 'vercel') {`
- 16-17: `    res.status(404).end(); return;`
(Note: `getApi()` is called at line 13, before the key check.)

All match the sweep's citations exactly.

## 3. src/env.mjs (read whole at b68f94c, 136 lines)
- `HOOKS_API_TOKEN: z.string(),` at line 36 (in `server` schema); read from `process.env.HOOKS_API_TOKEN` at line 78. No `.min(1)`, no `.optional()`. Plain `z.string()` rejects undefined (unset) but accepts "" (empty).
- `STATBOT_API_KEY`: not declared in env.mjs at all (0 hits: `git grep -n STATBOT_API_KEY origin/master` shows only the two v1 handlers reading `process.env` directly and the tests).
- Skip flag: line 101 `if (!!process.env.SKIP_ENV_VALIDATION === false) {` -- validation runs unless SKIP_ENV_VALIDATION is a non-empty string (any non-empty value, including "0" or "false", skips). When skipped, `env` is the raw `process.env` cast (line 99), so an unset HOOKS_API_TOKEN is `undefined` and an empty one is "". There is no `skipValidation` option name; the only setting is this env var. Other SKIP_ENV_VALIDATION uses: only `src/__tests__/env.client-proxy.test.ts:10` (stubs it to '').
- When validation runs (server): unset HOOKS_API_TOKEN -> `safeParse` fails -> `throw new Error('Invalid environment variables')` at module load (line 115), i.e. at import of `~/env.mjs` (boot / build page-data collection, wherever the module is imported), not reaching the handler. Empty "" passes the schema and reaches the handler, where header `x-hooks-api-token: ` (empty) could equal it. (Node's header parsing of an empty header value: `req.headers['x-hooks-api-token']` would be "" for an empty header; not tested here.)
- When SKIP_ENV_VALIDATION is set: unset reaches the handler as `undefined`; a request with no `x-hooks-api-token` header gives `undefined !== undefined` = false, so the check passes (accepts). Whether production/Vercel build or runtime sets SKIP_ENV_VALIDATION: **could not be settled** (no host config readable; `git grep` shows no package.json/config/Dockerfile/workflow setting it, only the two hits above).
- Also could not settle: whether the build imports env.mjs in a way that trips the throw, and whether the deployed env has the variable set non-empty.

## 4. Readers/writers
`git -C website grep -n HOOKS_API_TOKEN origin/master` (whole tree, incl. config/docs) -> 4 hits total:
- `bot/edgeCommands.ts:55`: `'x-hooks-api-token': env.HOOKS_API_TOKEN,` (sender; fetch to `${getBaseUrl()}/api/interactions-server` at :50)
- `src/env.mjs:36` (declaration), `src/env.mjs:78` (process.env read)
- `src/pages/api/interactions-server.ts:11` (compare)
No writer, no .env.example, no docs, no workflow or test reference.
`git -C website grep -n -i x-hooks-api-token origin/master` -> 2 hits: `bot/edgeCommands.ts:55` and `src/pages/api/interactions-server.ts:11`.
(For completeness, `git grep -n STATBOT_API_KEY origin/master`: handlers `messages.ts:22`, `messages/[id].ts:22`; tests `guildMessages.malformed-query.test.ts:33`, `guildMessages.statbot-key-required.test.ts:49,88`, `guildMessages.valid-exposure.test.ts:31`.)

## 5. Constant-time helper
`git -C website grep -n -E "timingSafeEqual|constant-time|constantTime|secretEquals|safeEqual" origin/master` -> no output, exit 1 (0 hits). None exists.

## 6. guildMessages.malformed-query.test.ts (origin/master)
Title: `describe('/api/v1 guild messages answer a malformed query with a completed 400', ...)` (line 30), one `it.each` (line 39) with `'%s'` titles. Five cases:
- 40: `['list, non-snowflake guild id', LIST, { guildId: 'abc' }],`
- 41: `['list, unexpected query key', LIST, { guildId: GUILD, extra: '1' }],`
- 42: `['single, non-snowflake guild id', SINGLE, { guildId: 'abc', id: '1' }],`
- 43: `['single, non-numeric message id', SINGLE, { guildId: GUILD, id: 'x' }],`
- 44: `['single, unexpected query key', SINGLE, { guildId: GUILD, id: '1', extra: '1' }],`
Every case expects 400, `res.ended` true, `getPostgres` not called (lines 46-49). Ids used: '1' and 'x'. **No case sends an id above 2^53, an exponent such as `1e3`, or a fraction.** The test sends a Bearer header with the matching key (line 14), mocks `~/env.mjs` and `project-utils` (lines 7, 11). Sibling files (not read this round): statbot-key-required, valid-exposure; `git grep` shows they stub STATBOT_API_KEY but I did not read their ids.

## 7. Tests touching interactions-server
- `git -C website grep -n -l "interactions-server" origin/master` -> only `bot/edgeCommands.ts` (single hit at :50, `git grep -c` 1).
- `git ls-tree -r --name-only origin/master | grep -E "__tests__.*(interactions-server|interactionsServer)"` -> no output, exit 1.
- Related but not the handler: `src/utils/__tests__/serverCommands.get-message.test.ts` imports `bot/serverCommands` (the command table the handler dispatches to), not the handler or its token check.
So no test of the `x-hooks-api-token` check or the interactions-server handler.

## Contradictions with the sweep
None. Every cited line, the env.mjs declaration (`z.string()` at :36) and the test coverage claims hold at b68f94c. The sweep's open question (env.mjs skip settings) is now answered in item 3: the only switch is a non-empty `SKIP_ENV_VALIDATION`.

## Not covered
- Whether the deployed environment sets SKIP_ENV_VALIDATION or HOOKS_API_TOKEN (host/Vercel config not readable); so whether unset/empty HOOKS_API_TOKEN occurs in production is unsettled.
- Node's runtime behaviour for an empty or repeated `x-hooks-api-token` header (not run).
- Bodies of guildMessages.statbot-key-required and valid-exposure tests (ids and unset-key cases not re-read).
- nextauth, trpc, tRPC context, messageStore, discord-verify internals, project-utils, preview-image-generator (not searched).
- Any file outside the diff paths in item 1 beyond the grep sets quoted.
