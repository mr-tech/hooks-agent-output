# Scope sweep: tRPC batch limit, request-header trust, dependency pins

Sweep date: 2026-11-20. Search only. No verdicts, no source edited, nothing committed.

## Refs read

| Repo | Ref read | Commit |
|---|---|---|
| website | origin/master | d1bb9b0724cded3c3c303203c2cbafe5df7bbf96 (HEAD equal: ahead 0, behind 0) |
| project-utils | origin/master | 749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f |
| preview-image-generator | origin/master, origin/prod | 8512a1d003af7fdbce56b85ef27218dd885becd1 (both refs identical) |
| agent-output | origin/master | 42089d322d7d43cdcdd9e00c145c0f71b9900ef6 (its HEAD f6f6a45 is 669 ahead and 0 behind: `git -C agent-output rev-list --count origin/master..HEAD`) |

Premises were read with `git show origin/master:<path>` and `git grep ... origin/master`. The checked-out trees were not used for premises. Exception: the record sweep also ran the `grep -rl` form the sweep spec names, to show the working-tree difference (see Record sweep).

Workflow files: every search used `-- . ':!.github/workflows'`. No line of any file under `.github/workflows/` was printed. A `grep -c 'github/workflows'` over every capture returned 0.

Counts: every count below comes from `grep -c`, `git grep -c`, or a per-file `git grep -n` listing. No count was taken by piping into `wc -l`.

Execution note (disclosed in this round): a PreToolUse record-write-gate hook refused one shell command. The command wrote a scratch-file output through a `$S` variable, and the hook's message cited record writes under `agent-output`. The command was not aimed at a record document. It was re-issued with literal scratchpad paths and no shell redirect, with the script writing its own output file. The record document itself was written with the Write tool, and the appendix below was added with `node ~/.claude/tools/record-edit.js` (`append_file`), the form the hook names.

Full raw capture of the agent-output identifier sweep (104 lines, about 11 MB, 26 lines longer than 20,000 characters): `/tmp/claude-1000/-usr-local-bin-hooks/ed88b5ea-7f01-4446-b0f0-be6310afb104/scratchpad/raw/ident-agent-output.txt`.

---

## P1. Batching: server entry points and client link configs

### Instrument

```
git -C /usr/local/bin/hooks/website grep -n -E 'createNextApiHandler|fetchRequestHandler|createHTTPHandler|createTRPCNext|httpBatchLink|httpBatchStreamLink|maxURLLength|maxItems|splitLink|allowBatching|maxBatchSize|initTRPC|@trpc/server/adapters' origin/master -- . ':!.github/workflows'
git -C /usr/local/bin/hooks/website grep -n -E 'httpLink|httpBatch|loggerLink|createTRPC|links:|maxURLLength|splitLink' origin/master -- . ':!.github/workflows'
git -C /usr/local/bin/hooks/website grep -n -E 'batch=|\?batch|input=' origin/master -- src ':!**/__tests__/**' ':!**/*.test.*'          # no output
git -C /usr/local/bin/hooks/website ls-tree -r --name-only origin/master -- src | grep -E '(route\.(ts|tsx|js|mjs)$|/pages/api/|middleware\.(ts|js|mjs)$)'
git -C /usr/local/bin/hooks/project-utils grep -c -E 'createNextApiHandler|fetchRequestHandler|createHTTPHandler|createTRPCNext|httpBatchLink|httpBatchStreamLink|maxURLLength|maxItems|splitLink|allowBatching|maxBatchSize|initTRPC|@trpc/' origin/master -- . ':!.github/workflows'            # exit 1, no match
git -C /usr/local/bin/hooks/preview-image-generator grep -c -E '(same pattern)' origin/master -- . ':!.github/workflows'                          # exit 1, no match
```

### Region

All tracked files of website, project-utils and preview-image-generator at origin/master, excluding `.github/workflows`. The route list covers `src/**/route.*`, `src/pages/api/**` and `middleware.*`. The client grep covers every `links:` and link factory in the tree.

### Server entry points that accept batched calls

Only one tRPC server entry point exists:

- `website:src/pages/api/trpc/[trpc].ts:1` `import { createNextApiHandler } from '@trpc/server/adapters/next';`
- `website:src/pages/api/trpc/[trpc].ts:8` `export default createNextApiHandler({`. The options object (lines 8 to 16) has `router`, `createContext` and `onError`. It has no `allowBatching`, no `batching`, no `maxDepth`. No batch count is set or checked.
- `website:src/server/api/trpc.ts:76` `const t = initTRPC.context<typeof createTRPCContext>().create({`. The options (lines 76 to 81) are `transformer: superjson` and `errorFormatter`. No batching option.
- `website:src/server/api/root.ts:11` `export const appRouter = createTRPCRouter({` merges `guild`, `user` and `message`. Nothing is set per router.

No `fetchRequestHandler`, `createHTTPHandler` or app-router `route.ts` exists in any repo at origin/master (instrument above returns no match for these in website; project-utils and preview-image-generator return exit 1).

Other server endpoints, checked for a loop over a client-supplied list of operations. None found:

- `website:src/pages/api/interactions-server.ts:15-17` reads one `req.body` (`data.name`) and dispatches one command. Single operation.
- `website:src/pages/api/interactions-edge.ts:48` reads `req.body` once (the Discord interaction). Single operation.
- `website:src/pages/api/v1/guilds/[guildId]/messages.ts` and `.../messages/[id].ts` are GET-only (`req.method !== 'GET'` returns 405). They read `req.query` once and perform one query. No `req.body` read.
- `website:src/pages/api/messages/codes/[code].ts` and `website:src/pages/api/cron.ts` read `req.query` only (`cron.ts:15`). The `scheduled.map` at `cron.ts:42` iterates database rows, not client input.
- `preview-image-generator:src/server.ts:49-50` accepts one POST `/generate` body with one `{ id, nonce, message }` (lines 22-32). It is one operation per request.
- `project-utils` has no server entry point (`src/index.ts`, `src/postgres.ts`, `src/prisma.ts` are libraries).

Array inputs inside tRPC procedures (`git -C website grep -n -E "z\.array\(" origin/master -- src/server src/pages/api`): the production array inputs are bounded through `boundedArray(...)` in `website:src/server/api/utils/shapes.ts` (lines 139-414) and `website:src/server/api/routers/user.ts:32` (`boundedArray(z.string(), MAX_RECENT_MESSAGE_IDS + 1)`). `website:src/server/api/routers/guild.ts:16-17` and `website:src/server/api/routers/user.ts:69-70` hold the only unbounded list-input (`batchUpdateMessages`, `z.array(idMessageShape).min(1)`), and both are commented out.

The sole endpoint that accepts multiple procedure calls in one HTTP request is `website:src/pages/api/trpc/[trpc].ts`.

### Client link configs (values verbatim)

- `website:src/utils/api.ts:26-31` (createTRPCNext `config()`): `links: [ loggerLink({ enabled: (opts) => process.env.NODE_ENV === 'development' || (opts.direction === 'down' && opts.result instanceof Error), }), httpLink({ url, transformer: superjson }), ]`
- `website:src/utils/api.ts:44-46` (createTRPCProxyClient): `links: [ httpLink({ url, transformer: superjson }), ]`
- `website:src/providers/TrpcProvider.tsx:17-21` (createTRPCReact client): `links: [ httpLink({ url, transformer: superjson }), ]`
- `url` is `${getBaseUrl()}/api/trpc` (`website:src/utils/api.ts:15`).
- `httpBatchLink`, `httpBatchStreamLink`, `maxURLLength`, `maxItems`, `splitLink`: no tRPC use in any repo at origin/master. The `maxItems` matches are UI props, not tRPC: `website:src/app/message/_components/NewMessageModal.tsx:424`, `website:src/app/message/m/[id]/_components/SaveAsMenu.tsx:154`, `website:src/components/Dropdown.tsx:122,130,165`.
- Result: the site's own client issues one tRPC operation per HTTP request (three `httpLink` sites, none batched).

### Installed versions

`website/package.json` at origin/master:

- `website:package.json:37` `"@trpc/client": "^11.10.0",`
- `website:package.json:38` `"@trpc/next": "^11.10.0",`
- `website:package.json:39` `"@trpc/react-query": "^11.10.0",`
- `website:package.json:40` `"@trpc/server": "^11.10.0",`

Lockfile at origin/master (`pnpm-lock.yaml`, lockfileVersion '9.0'): `pnpm-lock.yaml:2200` `'@trpc/client@11.10.0'`, `:2206` `'@trpc/next@11.10.0'`, `:2232` `'@trpc/server@11.10.0'`. The `@trpc/react-query` 11.10.0 resolution appears as a peer at `pnpm-lock.yaml:9435`. Installed versions are therefore 11.10.0 for `@trpc/server` and `@trpc/client`.

### Dependency-side behaviour (published 11.10.0 tarballs, not repo premises)

Downloaded with `npm pack @trpc/server@11.10.0` and `npm pack @trpc/client@11.10.0` into scratch directories, then extracted. Instruments:

```
grep -rl "allowBatching" --exclude=*.map <scratch>/trpc-src/package/dist
grep -n -E "paths\.length|too many|maxBatch" --exclude=*.map <scratch>/trpc-src/package/dist/resolveResponse-BVDlNZwN.mjs     # no output
```

- Server `resolveResponse-BVDlNZwN.mjs:76-77`: `const isBatchCall = opts.searchParams.get("batch") === "1"; const paths = isBatchCall ? opts.path.split(",") : [opts.path];`
- Server `resolveResponse-BVDlNZwN.mjs:1856`: `allowBatching = opts.allowBatching ?? opts.batching?.enabled ?? true`. Batching is on by default. Neither option is set in the repo.
- Server `resolveResponse-BVDlNZwN.mjs:1904`: `if (info.isBatchCall && !allowBatching) throw new TRPCError(...)`.
- The batch path has no count or length check. The `length >` comparisons in that module (lines 12, 890, 892, 895, 1167, 1173) concern connection params, stream buffers and `maxDepth`. `maxBatchSize` has 0 matches in the server dist.
- Next pages adapter `adapters/next.mjs:26` spreads `opts` into `nodeHTTPRequestHandler`, so repo options would reach the core. The repo sets none.
- Client `httpLink-Dd2kmq0r.mjs:46-64`: one `universalRequester` call per `op` (one `path`, one `input`). Single operation per request.
- Client `httpBatchLink-DpOHx07Q.mjs:169-170`: `maxURLLength` and `maxItems` default to `Infinity`. The site does not use this link.

### P1 hits (repo:path:line)

- `website:src/pages/api/trpc/[trpc].ts:1` createNextApiHandler import
- `website:src/pages/api/trpc/[trpc].ts:8` `export default createNextApiHandler({`
- `website:src/server/api/trpc.ts:17` `import { initTRPC, TRPCError } from '@trpc/server';`
- `website:src/server/api/trpc.ts:18` `import { type CreateNextContextOptions } from '@trpc/server/adapters/next';`
- `website:src/server/api/trpc.ts:76` `const t = initTRPC.context<typeof createTRPCContext>().create({`
- `website:src/utils/api.ts:8` `import { createTRPCNext } from '@trpc/next';`
- `website:src/utils/api.ts:18` `export const api = createTRPCNext<AppRouter>({`
- `website:src/utils/api.ts:31` `httpLink({ url, transformer: superjson }),`
- `website:src/utils/api.ts:46` `httpLink({ url, transformer: superjson }),`
- `website:src/providers/TrpcProvider.tsx:19` `httpLink({ url, transformer: superjson }),`

### P1, what the predicate cannot see

- No live request was sent. Server behaviour was read from the published 11.10.0 dist, and the repo's installed `node_modules` was not read (working tree excluded by rule).
- No platform limit was read: Vercel or Node request-line, header or body limits, which are the only practical bound on a GET batch's URL length. The sweep reports "no count limit in tRPC or in the repo", not "no limit anywhere".
- A procedure's own cost per call was not analysed.
- Hand-built batch URLs were searched only in production `src` (`batch=`, `?batch`, `input=`), with no output.

---

## P2. Request-header reads and middleware writes

### Instrument

```
git -C /usr/local/bin/hooks/website grep -n -i -E "headers(\(\))?(\.get|\.set|\.append|\[)|\.headers\b|x-pathname|x-query-params|NextResponse\.next|NextResponse\.rewrite" origin/master -- . ':!.github/workflows'
git -C /usr/local/bin/hooks/website grep -n -E "headers\(\)|next/headers" origin/master -- . ':!.github/workflows'
git -C /usr/local/bin/hooks/website grep -n -E "['\"]x-[a-z0-9-]+['\"]" origin/master -- src ':!src/**/__tests__/**' ':!src/**/*.test.*'
git -C /usr/local/bin/hooks/website grep -n matcher origin/master -- src
git -C /usr/local/bin/hooks/website show origin/master:src/middleware.ts
git -C /usr/local/bin/hooks/project-utils grep -n -i -E "headers|x-pathname|x-query" origin/master -- . ':!.github/workflows'     # exit 1
git -C /usr/local/bin/hooks/preview-image-generator grep -n -i -E "headers|x-pathname|x-query" origin/master -- . ':!.github/workflows'
```

### Region

All tracked files of the three product repos at origin/master, excluding `.github/workflows`. Test files are listed separately because they are not server code.

### Middleware (website, only one file)

`git -C website ls-tree -r --name-only origin/master -- src | grep middleware` returns `src/middleware.ts` alone.

- `website:src/middleware.ts:6` matcher, verbatim: `  matcher: ['/message/(.*)', '/api/guilds/(.*)', '/preview'],`
- `website:src/middleware.ts:12` `const requestHeaders = new Headers(request.headers);`
- `website:src/middleware.ts:14` `requestHeaders.set('x-pathname', request.nextUrl.pathname);` (runs on every matched request; `set` replaces any client-sent value)
- `website:src/middleware.ts:20` `requestHeaders.set('x-query-params', encodeURIComponent(queryParams.toString()));` (runs only when `request.url` contains `?`; the file has no `delete` call, so an inbound `x-query-params` on a matched request without a query string passes through unchanged; read from the code, not run)
- `website:src/middleware.ts:24` `return NextResponse.next({` with `request: { headers: requestHeaders }`
- `project-utils` and `preview-image-generator` set no request headers (instrument above).
- `website/next.config.js` has no `basePath`, `trailingSlash`, `i18n` or `skipTrailingSlashRedirect` key (`git -C website grep -c -E "basePath|trailingSlash|i18n|skipTrailingSlashRedirect|skipMiddlewareUrlNormalize" origin/master -- 'next.config.*'` returns exit 1).

### Header reads in server code

| # | Header | Read at (origin/master) | Middleware sets it? | Paths |
|---|---|---|---|---|
| 1 | `x-pathname` | `website:src/app/_navigation/Redirects/Server.tsx:5` `const pathname = (await headers()).get('x-pathname') ?? '';` | Yes, `src/middleware.ts:14` | Matcher paths only. Mounted by `website:src/app/message/layout.tsx:4` and `:15` (the only non-test importer found), so `/message/*` |
| 2 | `cookie` | `website:src/app/_components/Providers.tsx:32-33` `const hdrs = await headers(); const session = await getSession(hdrs.get('cookie') ?? '');` | No | Not middleware-set; client-controlled. Mounted under `/message/*` via `website:src/app/message/layout.tsx:3` and `:13` |
| 3 | `user-agent` | `website:src/app/_components/IsMobileWrapper.tsx:9` `(await headers()).get('user-agent')` | No | Client-controlled. Under `/message/*` |
| 4 | `x-signature-ed25519` | `website:src/pages/api/interactions-edge.ts:35` `req.headers.get('x-signature-ed25519')` | No | `/api/interactions-edge`, not in matcher |
| 5 | `x-signature-timestamp` | `website:src/pages/api/interactions-edge.ts:36` | No | Not in matcher |
| 6 | `x-hooks-api-token` | `website:src/pages/api/interactions-server.ts:11` `if (req.headers['x-hooks-api-token'] !== env.HOOKS_API_TOKEN)` | No | `/api/interactions-server`, not in matcher |
| 7 | `authorization` | `website:src/pages/api/v1/guilds/[guildId]/messages.ts:23` and `.../messages/[id].ts:23` `req.headers.authorization !== \`Bearer ${key}\`` | No | `/api/v1/guilds/...`. The matcher `/api/guilds/(.*)` does not match `/api/v1/...` |
| 8 | `authorization` | `preview-image-generator:src/server.ts:49` `req.headers.authorization === config.API_KEY` | No middleware in that repo | `POST /generate` |

Not reads in server code:

- `x-query-params`: no server-code reader at origin/master. Its only reads are in tests: `website:src/app/_components/__tests__/Providers.request-headers.test.ts:36` and `:45` (`request.headers = { 'x-query-params': value };`). `Providers.tsx` reads `cookie` only (table row 2).
- `website:src/app/page.tsx:31` `headers().get('cookie')` is inside a comment.
- `website:src/app/_navigation/Redirects/__tests__/Server.session-cookie-redirect.test.ts:15` sets `x-pathname` on a mock request (test only).

### Record in conflict with origin/master (stated as a fact, not assessed)

The agent-output record says `Providers.tsx` reads `x-query-params` through `decodeURIComponent` in a `getMessage` function:

- `agent-output:handoff/providers-query-params-header-decode-throws-2026-11-08.md:18` ("`src/app/_components/Providers.tsx` `getMessage` is a root-level provider. It passes the `x-query-params` header ...")
- `agent-output:code-review/closed/015-bug-evaluation-fixes-code-review.md:172` (`Providers` ... "a client-sent `x-query-params` reaches `decodeURIComponent` unchanged")
- `agent-output:INDEX.md:298`

At origin/master: `git -C website grep -n -E "getMessage" origin/master -- src/app/_components` returns no match. `decodeURIComponent` in `website/src` at origin/master occurs only at `website:src/components/SlateEditor/utils/onCopy.ts:26`. `website:src/app/_components/Providers.tsx` reads `cookie` only.

### P2 hits (repo:path:line)

- `website:src/middleware.ts:6`, `:12`, `:14`, `:20`, `:24`
- `website:src/app/_navigation/Redirects/Server.tsx:5`
- `website:src/app/_components/Providers.tsx:32`, `:33`
- `website:src/app/_components/IsMobileWrapper.tsx:9`
- `website:src/pages/api/interactions-edge.ts:35`, `:36`
- `website:src/pages/api/interactions-server.ts:11`
- `website:src/pages/api/v1/guilds/[guildId]/messages.ts:23`
- `website:src/pages/api/v1/guilds/[guildId]/messages/[id].ts:23`
- `preview-image-generator:src/server.ts:49`
- Test-only references: `website:src/app/_components/__tests__/Providers.request-headers.test.ts:31`, `:36`, `:45`; `website:src/app/_navigation/Redirects/__tests__/Server.session-cookie-redirect.test.ts:15`, `:73`

### P2, what the predicate cannot see

- Matcher semantics were not run. Whether a bare `/message` (no trailing segment) matches `/message/(.*)` was not tested; `website:src/app/message/page.tsx` exists.
- Reads by libraries (next-auth, Next internals, `cookies()`, `req.cookies`) are outside the header-name predicate.
- Dynamic header names are caught only where `headers()` or `.headers` appears; a header passed through a helper with a variable name would show as a `headers()` or `.headers` line, which was checked by reading.
- Headers the Next or Vercel runtime injects (`x-forwarded-*`, `x-middleware-*`) were not searched for.

---

## P3. Dependency pins: manifests, lockfiles, and whether the manager reads them

### Package managers

- website: pnpm. `website:package.json:3` `"packageManager": "pnpm@10.28.2",`. Lockfile `website:pnpm-lock.yaml` (lockfileVersion '9.0', line 1). `website:pnpm-workspace.yaml` contains only `patchedDependencies:` (lines 1-2), no overrides key.
- preview-image-generator: npm. Lockfile `preview-image-generator:package-lock.json` (lockfileVersion 2, line 3). No pnpm or yarn lockfile at origin/master.
- project-utils: npm. Lockfile `project-utils:package-lock.json`. No override-like key in its manifest.

### Override-like keys per manifest

Instrument: `git -C <repo> grep -n -E '"(overrides|resolutions|pnpm|packageManager|lockfileVersion|engines)"' origin/master -- package.json`

- `website:package.json:138` `"overrides": {` with `:139` `"semver": "^7.5.3"`. Top-level key. There is no `resolutions` and no `pnpm.overrides` key.
- `preview-image-generator:package.json:38` `"overrides": {` with `:39` `"semver": "^7.5.3"`.
- `project-utils:package.json`: no match (exit 1).

### Is the pin applied?

- website: `git -C website grep -c '^overrides:' origin/master -- pnpm-lock.yaml` returns no match (exit 1), so the count is 0. The lockfile has no `overrides:` block. Installed `semver` entries: `pnpm-lock.yaml:5720` `semver@5.7.2:`, `:5724` `semver@6.3.0:`, `:5728` `semver@6.3.1:`, `:5732` `semver@7.5.4:`, `:5737` `semver@7.7.4:`, `:5742` `semver@7.8.6:`. The pin is not reflected in the lockfile.
- pnpm reads the override table from `manifest.resolutions` and `manifest.pnpm?.overrides` only. Published pnpm 10.28.2 bundle, `pnpm.cjs:20810`: `overrides: { ...manifest.resolutions, ...manifest.pnpm?.overrides }`. The top-level `overrides` key of `website/package.json` is not among them. So the pin is declared where pnpm does not read it.
- preview-image-generator: npm reads top-level `overrides`. The npm v2 lockfile does not record an overrides block, so applied-ness is inferred from the resolved tree. `git -C preview-image-generator grep -n -A2 -E '"node_modules/(.*/)?semver"' origin/master -- package-lock.json` shows one `semver` entry: `package-lock.json:4911` `"node_modules/semver": {`, `:4912` `"version": "7.5.4"`. That version satisfies `^7.5.3`, and no nested `semver` entry exists (`git -C ... grep -c` on the same pattern returns 2: that entry plus `node_modules/@types/semver`). Consistent with the pin being applied; not proven by the lockfile alone.
- preview-image-generator `origin/prod` is the same commit as `origin/master` (8512a1d). No difference between deploy and master for the manifest.

### P3 hits (repo:path:line)

- `website:package.json:3`, `:138`, `:139`
- `website:pnpm-workspace.yaml:1-2`
- `website:pnpm-lock.yaml:1`, `:5720`, `:5724`, `:5728`, `:5732`, `:5737`, `:5742`
- `preview-image-generator:package.json:38`, `:39`
- `preview-image-generator:package-lock.json:3`, `:4911`, `:4912`
- `project-utils:package.json`: none

### P3, what the predicate cannot see

- The pnpm reading was verified against the published 10.28.2 bundle, not by running pnpm on the repo.
- npm's handling of top-level `overrides` was not verified from npm source.
- The installed `node_modules` in each working tree was not read (by rule).
- The published pnpm bundle also reads a workspace-settings `overrides` value (`pnpm.cjs:20818-20822`, `settings.overrides`). That path was not traced to its source file; the file at origin/master (`website:pnpm-workspace.yaml`) has no `overrides` key.

---

## Identifier sweep

### Instrument

```
git -C <repo> grep -c -E 'allowBatching|maxBatchSize|x-pathname|x-query-params|overrides|httpBatchLink' origin/master -- . ':!.github/workflows'
git -C <repo> grep -n -E 'allowBatching|maxBatchSize|x-pathname|x-query-params|overrides|httpBatchLink' origin/master -- . ':!.github/workflows'
```

Run for website, project-utils, preview-image-generator and agent-output. Region: all tracked files at origin/master, docs and config included, workflows excluded.

### website (19 lines in 11 files, grep -n at origin/master)

- `website:eslint.config.mjs:140` `'app/_styles/globals.scss', 'app/_styles/markdown.scss', 'app/_styles/overrides.scss',` (file name only)
- `website:package.json:138` `"overrides": {`
- `website:src/app/_components/__tests__/Providers.request-headers.test.ts:31` `describe('the message-page providers given a client-sent x-query-params header', () => {`
- `website:src/app/_components/__tests__/Providers.request-headers.test.ts:36` `request.headers = { 'x-query-params': value };`
- `website:src/app/_components/__tests__/Providers.request-headers.test.ts:45` `request.headers = { 'x-query-params': value };`
- `website:src/app/_navigation/Redirects/Server.tsx:5` `const pathname = (await headers()).get('x-pathname') ?? '';`
- `website:src/app/_navigation/Redirects/__tests__/Server.session-cookie-redirect.test.ts:15` `if (request.pathname) incoming.set('x-pathname', request.pathname);`
- `website:src/app/_navigation/Redirects/__tests__/Server.session-cookie-redirect.test.ts:73` `it('sends a request carrying no x-pathname header to the new-message editor, once', async () => {`
- `website:src/app/_styles/index.scss:7` `@import "./overrides.scss";` (file name only)
- `website:src/app/message/m/[id]/send/_components/WebhookMenu/__tests__/WebhookMenu.url-and-thread-controls.test.tsx:39` `function setWebhookState(overrides: Record<string, unknown>) {`
- `website:src/app/message/m/[id]/send/_components/WebhookMenu/__tests__/WebhookMenu.url-and-thread-controls.test.tsx:51` `...overrides,`
- `website:src/middleware.ts:14` `requestHeaders.set('x-pathname', request.nextUrl.pathname);`
- `website:src/middleware.ts:20` `requestHeaders.set('x-query-params', encodeURIComponent(queryParams.toString()));`
- `website:src/server/api/utils/__tests__/shared.upsert-valid.test.ts:23` `function values(overrides: Record<string, unknown> = {}) {`
- `website:src/server/api/utils/__tests__/shared.upsert-valid.test.ts:33` `...overrides,`
- `website:src/utils/__tests__/helpers/components.ts:1` `export function makeLinkButton(overrides: Record<string, unknown> = {}) {`
- `website:src/utils/__tests__/helpers/components.ts:3` `type: 2, style: 5, url: 'https://example.com', label: 'Click', ...overrides,`
- `website:src/utils/__tests__/helpers/discord.ts:1` `export function author(overrides: Record<string, unknown> = {}) {`
- `website:src/utils/__tests__/helpers/discord.ts:3` `id: '1', username: 'Test', avatar: null, discriminator: '0000', global_name: null, public_flags: 0, bot: true, ...overrides,`

Zero hits for `allowBatching`, `maxBatchSize`, `httpBatchLink` in website.

### project-utils (1 line)

- `project-utils:.eslintrc.json:20` `  "overrides": [`

### preview-image-generator (2 lines)

- `preview-image-generator:.eslintrc.json:17` `  "overrides": [`
- `preview-image-generator:package.json:38` `  "overrides": {`

### agent-output (104 lines, 71 files)

Full table in Appendix A below. Summary by term: every hit is one of `overrides` (prose, eslint, test-inventory helper names), `x-query-params`, `x-pathname`, `allowBatching`/`maxBatchSize`/`httpBatchLink` (none found).

---

## Record sweep

### Instrument

```
git -C /usr/local/bin/hooks/agent-output grep -l -i -F -e allowBatching -e x-pathname -e x-query-params -e overrides -e '[trpc].ts' -e batch origin/master -- architecture research planning/closed security
cd /usr/local/bin/hooks/agent-output && grep -rl -i -F -e allowBatching -e x-pathname -e x-query-params -e overrides -e '[trpc].ts' -e batch architecture research planning/closed security
git -C /usr/local/bin/hooks/agent-output grep -n -i -F -e allowBatching -e x-pathname -e x-query-params -e overrides -e '[trpc].ts' -e batch origin/master -- architecture
```

Region: `architecture/` (9 files at origin/master), `research/` incl. `research/closed/` (8 entries), `planning/closed/` (14 files), `security/` incl. `security/closed/` (`security/closed/015-preview-image-generator-security-audit.md` and `security/closed/.gitkeep`; no file sits directly under `security/`). 33 entries in total at origin/master (`git -C agent-output ls-tree -r --name-only origin/master -- architecture research planning/closed security`). Matching was case-insensitive, fixed-string.

### Hits at origin/master (6 files)

- `agent-output:architecture/closed/015-bug-evaluation-fixes-architecture-findings.md:72`. Quoted line (the match is "Planner batch"): `**Recommended to the planner** (carrier: planner-hooks-015, Planner batch; it can fold at the M9 carrier text or travel to devops as a note on the handoff it mints, with no review round of its own): in the M9 carrier line and RK-8's Instrument, replace "against the deployed engine" with "locally, on an export of the deployed commit under the deployed Node version, never on the generator host". Also mark the drift probe as a magnitude read, not a falsifier.`
- `agent-output:planning/closed/007-components-v2-displayable-text-limit.md`
- `agent-output:planning/closed/013-components-v2-editing-surfaces.md`
- `agent-output:planning/closed/015-bug-evaluation-fixes.md`
- `agent-output:planning/closed/016-send-check-validity.md`
- `agent-output:research/competitive-feature-landscape-2026-11-08.md`

No `security/`, `research/closed/` or `architecture/system-architecture.md` file matches at origin/master.

### Working-tree-only hits (not at origin/master)

`git -C agent-output status --short -- architecture research planning security` is empty, so the working tree equals the local HEAD (f6f6a45) for these paths. The local HEAD is 669 commits ahead of origin/master, so these files exist at HEAD and not at origin/master.

- `agent-output:architecture/system-architecture.md:213` names `src/pages/api/trpc/[trpc].ts` and "batch". Quote, excerpt: "`src/pages/api/trpc/[trpc].ts` logs tRPC errors only when `NODE_ENV` is `development`".
- `agent-output:architecture/system-architecture.md:234`. Quote, excerpt: "`src/middleware.ts` (matcher `/message/(.*)`, `/api/guilds/(.*)`, `/preview`) sets `x-pathname`, and writes an `x-query-params` header nothing reads".
- `agent-output:architecture/closed/017-existing-items-backlog-architecture-findings.md:21`. Quote, excerpt: "...the Planner batch fold..."
- `agent-output:architecture/closed/018-next-upgrade-save-size-cap-architecture-findings.md:22`, `:23`. Quote, excerpt: "...the Planner batch fold..."
- `agent-output:architecture/closed/018-next-upgrade-save-size-cap-architecture-findings.md:64`. Quote, excerpt: "The H-001 leftover `x-query-params` write (X-7) sits in the same file,"
- `agent-output:planning/closed/017-existing-items-backlog.md`
- `agent-output:planning/closed/018-next-upgrade-save-size-cap.md`
- `agent-output:security/closed/018-next-upgrade-save-size-cap-security-audit.md`
- `agent-output:security/closed/fix-personal-message-access-security-audit.md`
- `agent-output:security/closed/website-deps-review-security-audit.md`
- `agent-output:security/closed/fix-message-page-header-decode-security-audit.md`

### Record sweep, what the predicate cannot see

- Case-insensitive `batch` matches "Planner batch" (a planning term), so most hits are not about tRPC batching.
- The sweep stops at the listed directories. Outside them, agent-output has further hits, not swept here: `handoff/providers-query-params-header-decode-throws-2026-11-08.md` (5 lines), `INDEX.md:298`, `code-review/closed/015-bug-evaluation-fixes-code-review.md` (6 lines), `analysis/`, `qa/`, `verification/`.
- Working-tree-only documents were listed from HEAD; their content may change before they reach origin/master.

---

## What the sweep could not cover (whole sweep)

- Only `origin/master` was read for premises, plus published npm tarballs for dependency behaviour. Deployed runtime config (Vercel, Next runtime, environment variables) was not read.
- `.github/workflows` was excluded everywhere. Any trigger or deploy effect in those files was not read, so no push-gate statement is made here.
- Matching is literal. Identifier hits include prose and unrelated `overrides` names (eslint keys, test helpers, `overrides.scss`).
- project-utils and preview-image-generator working trees, and their HEAD-versus-origin relation, were not checked. Only website and agent-output HEAD relations were checked.
- No test was run, and no mutation was tried.

---

## Appendix A. agent-output identifier hits (origin/master, all 104 lines)

Excerpts are 100 characters around the first matched term where the line is longer than 120 characters (26 lines are minified JSON of up to about 558,000 characters). The full raw capture is at `/tmp/claude-1000/-usr-local-bin-hooks/ed88b5ea-7f01-4446-b0f0-be6310afb104/scratchpad/raw/ident-agent-output.txt`.

**agent-output:INDEX.md**
- agent-output:INDEX.md:298 (terms: x-query-params) `...roviders.tsx decodes a client-reachable x-query-params header with decodeURIComponent; a malformed v... [line is 280 chars; excerpt around match]`

**agent-output:analysis/closed/015-bug-evaluation-fixes-analysis.md**
- agent-output:analysis/closed/015-bug-evaluation-fixes-analysis.md:255 (terms: overrides) `  - The process environment overrides were not read: the root daemon's `environ` is off-limits. They are moot,`
- agent-output:analysis/closed/015-bug-evaluation-fixes-analysis.md:463 (terms: overrides) `4. **Daemon environment overrides.** These would change V-1's branch.`

**agent-output:analysis/test-inventory-2026-08-26.md**
- agent-output:analysis/test-inventory-2026-08-26.md:71 (terms: overrides) `...geQuery` | H2 | none | `function values(overrides)` | [line is 192 chars; excerpt around match]`
- agent-output:analysis/test-inventory-2026-08-26.md:92 (terms: overrides) `...ommands` | H2 | none | `function author(overrides: Record<string, unknown> = {})` | [line is 161 chars; excerpt around match]`
- agent-output:analysis/test-inventory-2026-08-26.md:93 (terms: overrides) `...geStore` | H2 | none | `function author(overrides: Record<string, unknown> = {})` | [line is 163 chars; excerpt around match]`
- agent-output:analysis/test-inventory-2026-08-26.md:94 (terms: overrides) `...Message` | H2 | none | `function author(overrides: Record<string, unknown> = {})` | [line is 176 chars; excerpt around match]`
- agent-output:analysis/test-inventory-2026-08-26.md:209 (terms: overrides) `| `function author(overrides: Record<string, unknown> = {})` | 3 | `013-m3-bot-... [line is 167 chars; excerpt around match]`

**agent-output:code-review/closed/012-message-valid-field-code-review.md**
- agent-output:code-review/closed/012-message-valid-field-code-review.md:63 (terms: overrides) `    subject: ?host= overrides authority reportedHost=127.0.0.1             socket=true   expected=true`

**agent-output:code-review/closed/015-bug-evaluation-fixes-code-review.md**
- agent-output:code-review/closed/015-bug-evaluation-fixes-code-review.md:171 (terms: x-query-params) `... clones the request's headers and sets `x-query-params` only when there is a query string. Its match... [line is 185 chars; excerpt around match]`
- agent-output:code-review/closed/015-bug-evaluation-fixes-code-review.md:172 (terms: x-query-params) `...th with no query string, a client-sent `x-query-params` reaches `decodeURIComponent` unchanged. `x-q... [line is 208 chars; excerpt around match]`
- agent-output:code-review/closed/015-bug-evaluation-fixes-code-review.md:177 (terms: x-query-params) `...: middleware always deletes an inbound `x-query-params` before setting it. That is a source change o... [line is 224 chars; excerpt around match]`
- agent-output:code-review/closed/015-bug-evaluation-fixes-code-review.md:217 (terms: x-query-params) `...`3ba52f3..c938573`: 3 changed lines on `x-query-params`). The Preferred action is X-17. [line is 183 chars; excerpt around match]`
- agent-output:code-review/closed/015-bug-evaluation-fixes-code-review.md:297 (terms: overrides) `  - Blind spot: suppressions added through `.eslintrc` overrides or file-level `/* eslint-disable */`.`
- agent-output:code-review/closed/015-bug-evaluation-fixes-code-review.md:335 (terms: overrides) `... and `req.method, req.url`. `server.ts` overrides `console.debug` to prefix `new Date()`. So no figu... [line is 416 chars; excerpt around match]`

**agent-output:critiques/closed/007-components-v2-displayable-text-limit-critique.md**
- agent-output:critiques/closed/007-components-v2-displayable-text-limit-critique.md:72 (terms: overrides) `...rocess()` wrapper). In Zod, `.extend()` overrides the field definition, meaning any `.refine()` or `... [line is 419 chars; excerpt around match]`

**agent-output:deployment/closed/012-message-valid-field-deployment.md**
- agent-output:deployment/closed/012-message-valid-field-deployment.md:239 (terms: overrides) `   `BACKFILL_REPORT_DIR` overrides the report destination.`

**agent-output:handoff/providers-query-params-header-decode-throws-2026-11-08.md**
- agent-output:handoff/providers-query-params-header-decode-throws-2026-11-08.md:4 (terms: x-query-params) `...roviders.tsx decodes a client-reachable x-query-params header with decodeURIComponent; a malformed v... [line is 191 chars; excerpt around match]`
- agent-output:handoff/providers-query-params-header-decode-throws-2026-11-08.md:16 (terms: x-query-params) `- `src/middleware.ts` (default export) clones the request headers. It sets `x-query-params` only when the request`
- agent-output:handoff/providers-query-params-header-decode-throws-2026-11-08.md:18 (terms: x-query-params) `- `src/app/_components/Providers.tsx` `getMessage` is a root-level provider. It passes the `x-query-params` header`
- agent-output:handoff/providers-query-params-header-decode-throws-2026-11-08.md:21 (terms: x-query-params) `  the decode unchanged. `x-query-params: %` throws there, and that render fails.`
- agent-output:handoff/providers-query-params-header-decode-throws-2026-11-08.md:23 (terms: x-query-params) `The work: the property to hold is "for every value of `x-query-params` a client can send, on every path,`

**agent-output:implementation/closed/012-message-valid-field-implementation.md**
- agent-output:implementation/closed/012-message-valid-field-implementation.md:375 (terms: overrides) `...anged is that `BACKFILL_REPORT_DIR` now overrides it. | Closed in the same M4 change, as the reviewe... [line is 715 chars; excerpt around match]`

**agent-output:implementation/closed/013-components-v2-editing-surfaces-implementation.md**
- agent-output:implementation/closed/013-components-v2-editing-surfaces-implementation.md:398 (terms: overrides) `..., and `vitest.config.ts`; `exclude: []` overrides the base config's `**/__tests__` exclusion. | [line is 497 chars; excerpt around match]`

**agent-output:implementation/closed/015-bug-evaluation-fixes-m1-implementation.md**
- agent-output:implementation/closed/015-bug-evaluation-fixes-m1-implementation.md:40 (terms: x-query-params) `... in Fix Round 1 said `Providers.tsx`'s `x-query-params` "is always well-formed". That was wrong: `mi... [line is 461 chars; excerpt around match]`
- agent-output:implementation/closed/015-bug-evaluation-fixes-m1-implementation.md:99 (terms: x-query-params) `...py.ts:26` | `Providers.tsx:34` decodes `x-query-params`. **Corrected (code review CR-6):** the heade... [line is 587 chars; excerpt around match]`

**agent-output:implementation/closed/015-bug-evaluation-fixes-m1-m2-qa-findings-implementation.md**
- agent-output:implementation/closed/015-bug-evaluation-fixes-m1-m2-qa-findings-implementation.md:32 (terms: x-pathname) `...aveBeenCalledTimes(1)`. A new case: no `x-pathname` header, one redirect. [line is 367 chars; excerpt around match]`
- agent-output:implementation/closed/015-bug-evaluation-fixes-m1-m2-qa-findings-implementation.md:87 (terms: x-pathname) `| `Server` redirect: no `x-pathname` header redirects once | same | No, red by mutant... [line is 198 chars; excerpt around match]`

**agent-output:implementation/closed/015-bug-evaluation-fixes-m4-implementation.md**
- agent-output:implementation/closed/015-bug-evaluation-fixes-m4-implementation.md:196 (terms: x-query-params) `...nd CR-6 (correct my CR-4 sweep line on `x-query-params`) are taken in the M1 rebuild round. [line is 207 chars; excerpt around match]`

**agent-output:planning/closed/007-components-v2-displayable-text-limit.md**
- agent-output:planning/closed/007-components-v2-displayable-text-limit.md:120 (terms: overrides) `...process()` wrapper. In Zod, `.extend()` overrides per-field definitions, so any refinement attached ... [line is 469 chars; excerpt around match]`

**agent-output:planning/closed/015-bug-evaluation-fixes.md**
- agent-output:planning/closed/015-bug-evaluation-fixes.md:890 (terms: overrides) `      carries an ISO timestamp, because `server.ts` overrides `console.debug` to prefix `new Date()` (`471578f`;`
- agent-output:planning/closed/015-bug-evaluation-fixes.md:1170 (terms: x-query-params) `...iders.tsx` decoding a client-reachable `x-query-params` header (code review CR-6, `7976a9a`) | Outsi... [line is 291 chars; excerpt around match]`

**agent-output:qa/closed/010-infopanel-overlap-fix-qa.md**
- agent-output:qa/closed/010-infopanel-overlap-fix-qa.md:223 (terms: overrides) `...e-mount, so stale `display:block` never overrides it. No user-facing impact. | [line is 199 chars; excerpt around match]`

**agent-output:qa/closed/015-bug-evaluation-fixes-m1-m2-qa-findings-qa.md**
- agent-output:qa/closed/015-bug-evaluation-fixes-m1-m2-qa-findings-qa.md:33 (terms: x-pathname) `  - a missing `x-pathname` header (one redirect). This is the member a plau... [line is 127 chars; excerpt around match]`
- agent-output:qa/closed/015-bug-evaluation-fixes-m1-m2-qa-findings-qa.md:73 (terms: x-pathname) `| `qaf27-m1i-missing-pathname-defaults-to-editor` | 1: no `x-pathname`, one redirect (the QAF-27 survivor, now killed) |`
- agent-output:qa/closed/015-bug-evaluation-fixes-m1-m2-qa-findings-qa.md:91 (terms: x-pathname) `- **`run(null, '')`** leaves `x-pathname` unset (the mock sets the header only when the pa... [line is 187 chars; excerpt around match]`

**agent-output:qa/closed/015-bug-evaluation-fixes-m1-qa.md**
- agent-output:qa/closed/015-bug-evaluation-fixes-m1-qa.md:161 (terms: x-pathname) `  - a missing `x-pathname` header (one redirect). A mutant `?? '/message/m/... [line is 254 chars; excerpt around match]`

**agent-output:qa/closed/015-bug-evaluation-fixes-qa.md**
- agent-output:qa/closed/015-bug-evaluation-fixes-qa.md:158 (terms: x-pathname) `... at `6001f7f`. It reads `headers().get('x-pathname')` and `cookies()`, and it calls `redirect('/mess... [line is 431 chars; excerpt around match]`
- agent-output:qa/closed/015-bug-evaluation-fixes-qa.md:169 (terms: x-pathname) `... on a non-exempt path and on a missing `x-pathname` → one redirect to `/message/m/0/edit` with `push... [line is 123 chars; excerpt around match]`

**agent-output:retrospectives/closed/012-message-valid-field-retrospective.md**
- agent-output:retrospectives/closed/012-message-valid-field-retrospective.md:27 (terms: overrides) `## 0. Two overrides this document runs under`

**agent-output:retrospectives/fix-website-save-gate-embeds-retrospective.md**
- agent-output:retrospectives/fix-website-save-gate-embeds-retrospective.md:103 (terms: overrides) `...nded form:** the same tool with `ULS_*` overrides, plus the query and its controls kept as a record ... [line is 310 chars; excerpt around match]`

**agent-output:steering/015-rulings.md**
- agent-output:steering/015-rulings.md:224 (terms: overrides) `...ary. or ptb., as discord.com does. This overrides the planner's bare-host reading. [line is 234 chars; excerpt around match]`

**agent-output:steering/comment-sweep-briefs/comment-sweep-fixer-brief.md**
- agent-output:steering/comment-sweep-briefs/comment-sweep-fixer-brief.md:3 (terms: overrides) `... your definition's defaults and are not overrides: the fix branch is the existing `chore/agent-comme... [line is 519 chars; excerpt around match]`

**agent-output:steering/v1-guild-messages-auth-rulings.md**
- agent-output:steering/v1-guild-messages-auth-rulings.md:143 (terms: x-pathname, x-query-params) `  pathname and query string into the `x-pathname` and `x-query-params` headers, read by`

**agent-output:uat/closed/013-components-v2-editing-surfaces-uat.md**
- agent-output:uat/closed/013-components-v2-editing-surfaces-uat.md:3561 (terms: overrides) `**D44 overrides that here**: preserving the text in a note that names the subject is the one thing it`
- agent-output:uat/closed/013-components-v2-editing-surfaces-uat.md:8570 (terms: overrides) `...d and not this register's to want.** It overrides a deliberate product judgement of his | [line is 173 chars; excerpt around match]`

**agent-output:verification/012/probe-cr4-guard-attack/README.md**
- agent-output:verification/012/probe-cr4-guard-attack/README.md:67 (terms: overrides) ``?host=` is a supported libpq/`pg` connection-string form. It overrides the authority hostname for`

**agent-output:verification/012/probe-cr4-guard-attack/attack.sh**
- agent-output:verification/012/probe-cr4-guard-attack/attack.sh:37 (terms: overrides) `echo "--- PARSER DIFFERENTIAL: ?host= overrides for pg, invisible to the guard ---"`

**agent-output:verification/012/probe-cr4-guard-attack/run-attack-sweep.txt**
- agent-output:verification/012/probe-cr4-guard-attack/run-attack-sweep.txt:22 (terms: overrides) `--- PARSER DIFFERENTIAL: ?host= overrides for pg, invisible to the guard ---`

**agent-output:verification/012/probe-cr6-dial-target/README.md**
- agent-output:verification/012/probe-cr6-dial-target/README.md:34 (terms: overrides) `    subject: ?host= overrides authority reportedHost=127.0.0.1            socketObserved=true   expected=true`

**agent-output:verification/012/probe-cr6-dial-target/dial-target.js**
- agent-output:verification/012/probe-cr6-dial-target/dial-target.js:61 (terms: overrides) `...esults.push(await dial('subject: ?host= overrides authority', (p) => `postgresql://u:p@no.such.host.... [line is 143 chars; excerpt around match]`

**agent-output:verification/012/probe-cr6-dial-target/run-dial-target.txt**
- agent-output:verification/012/probe-cr6-dial-target/run-dial-target.txt:5 (terms: overrides) `   ok   subject: ?host= overrides authority reportedHost=127.0.0.1          socketOb... [line is 150 chars; excerpt around match]`

**agent-output:verification/012/probe-fixround4-m6-l10/README.md**
- agent-output:verification/012/probe-fixround4-m6-l10/README.md:14 (terms: overrides) ``host=`/`port=` as libpq-style overrides) — so `BACKFILL_CONFIRM` can name a decoy authority host`

**agent-output:verification/015/cr26-final-testresults-86f5a6c.json**
- agent-output:verification/015/cr26-final-testresults-86f5a6c.json:1 (terms: x-pathname) `...sage editor sends a request carrying no x-pathname header to the new-message editor, once","status":... [line is 418221 chars; excerpt around match]`

**agent-output:verification/015/cr37-final-testresults-2618926.json**
- agent-output:verification/015/cr37-final-testresults-2618926.json:1 (terms: x-pathname) `...sage editor sends a request carrying no x-pathname header to the new-message editor, once","status":... [line is 419393 chars; excerpt around match]`

**agent-output:verification/015/cr38-final-testresults-c5303ca.json**
- agent-output:verification/015/cr38-final-testresults-c5303ca.json:1 (terms: x-pathname) `...sage editor sends a request carrying no x-pathname header to the new-message editor, once","status":... [line is 419340 chars; excerpt around match]`

**agent-output:verification/015/cr40-final-testresults-b96e364.json**
- agent-output:verification/015/cr40-final-testresults-b96e364.json:1 (terms: x-pathname) `...sage editor sends a request carrying no x-pathname header to the new-message editor, once","status":... [line is 423385 chars; excerpt around match]`

**agent-output:verification/015/effort-final/qa-ef-suite-testresults-620b4ee.json**
- agent-output:verification/015/effort-final/qa-ef-suite-testresults-620b4ee.json:1 (terms: x-pathname) `...sage editor sends a request carrying no x-pathname header to the new-message editor, once","status":... [line is 422520 chars; excerpt around match]`

**agent-output:verification/015/effort-final/qa-ef-suite-testresults-b96e364.json**
- agent-output:verification/015/effort-final/qa-ef-suite-testresults-b96e364.json:1 (terms: x-pathname) `...sage editor sends a request carrying no x-pathname header to the new-message editor, once","status":... [line is 423600 chars; excerpt around match]`

**agent-output:verification/015/effort-final/website-mutants-all.json**
- agent-output:verification/015/effort-final/website-mutants-all.json:4439 (terms: x-pathname) `        "old": "(await headers()).get('x-pathname') ?? ''",`
- agent-output:verification/015/effort-final/website-mutants-all.json:4440 (terms: x-pathname) `        "new": "(await headers()).get('x-pathname') ?? '/message/m/0/edit'"`

**agent-output:verification/015/effort-final/website-mutants-apply.json**
- agent-output:verification/015/effort-final/website-mutants-apply.json:1355 (terms: x-pathname) `    "old": "(await headers()).get('x-pathname') ?? ''",`
- agent-output:verification/015/effort-final/website-mutants-apply.json:1356 (terms: x-pathname) `    "new": "(await headers()).get('x-pathname') ?? '/message/m/0/edit'"`

**agent-output:verification/015/effort-final/website-sweep-mutants-rerun.json**
- agent-output:verification/015/effort-final/website-sweep-mutants-rerun.json:1580 (terms: x-pathname) `  "old": "(await headers()).get('x-pathname') ?? ''",`
- agent-output:verification/015/effort-final/website-sweep-mutants-rerun.json:1581 (terms: x-pathname) `  "new": "(await headers()).get('x-pathname') ?? '/message/m/0/edit'",`

**agent-output:verification/015/effort-final/website-sweep-mutants.json**
- agent-output:verification/015/effort-final/website-sweep-mutants.json:1355 (terms: x-pathname) `  "old": "(await headers()).get('x-pathname') ?? ''",`
- agent-output:verification/015/effort-final/website-sweep-mutants.json:1356 (terms: x-pathname) `  "new": "(await headers()).get('x-pathname') ?? '/message/m/0/edit'"`

**agent-output:verification/015/m8-local-probe/probe.cjs**
- agent-output:verification/015/m8-local-probe/probe.cjs:17 (terms: overrides) `function start(overrides = {}, execArgv = []) {`
- agent-output:verification/015/m8-local-probe/probe.cjs:19 (terms: overrides) `  const env = { ...BASE_ENV(port), ...overrides };`

**agent-output:verification/015/mutation-qa-r3-m1i-missing-pathname-4f9ed85.txt**
- agent-output:verification/015/mutation-qa-r3-m1i-missing-pathname-4f9ed85.txt:8 (terms: x-pathname) `     × sends a request carrying no x-pathname header to the new-message editor, once 3ms`
- agent-output:verification/015/mutation-qa-r3-m1i-missing-pathname-4f9ed85.txt:12 (terms: x-pathname) `...ge editor > sends a request carrying no x-pathname header to the new-message editor, once [line is 225 chars; excerpt around match]`

**agent-output:verification/015/mutation-qaf27-m1i-missing-pathname-defaults-to-editor-825a7d8.txt**
- agent-output:verification/015/mutation-qaf27-m1i-missing-pathname-defaults-to-editor-825a7d8.txt:8 (terms: x-pathname) `     × sends a request carrying no x-pathname header to the new-message editor, once 4ms`
- agent-output:verification/015/mutation-qaf27-m1i-missing-pathname-defaults-to-editor-825a7d8.txt:12 (terms: x-pathname) `...ge editor > sends a request carrying no x-pathname header to the new-message editor, once [line is 225 chars; excerpt around match]`

**agent-output:verification/015/mutators/qaf27-m1i-missing-pathname-defaults-to-editor.py**
- agent-output:verification/015/mutators/qaf27-m1i-missing-pathname-defaults-to-editor.py:3 (terms: x-pathname) `old="(await headers()).get('x-pathname') ?? ''"`
- agent-output:verification/015/mutators/qaf27-m1i-missing-pathname-defaults-to-editor.py:4 (terms: x-pathname) `new="(await headers()).get('x-pathname') ?? '/message/m/0/edit'"`

**agent-output:verification/015/pig-host-read.sh**
- agent-output:verification/015/pig-host-read.sh:24 (terms: overrides) `#     PM2_KILL_* overrides therefore remain unobserved.`

**agent-output:verification/015/qa-p2-r3-testresults-4f9ed85.json**
- agent-output:verification/015/qa-p2-r3-testresults-4f9ed85.json:1 (terms: x-pathname) `...sage editor sends a request carrying no x-pathname header to the new-message editor, once","status":... [line is 417675 chars; excerpt around match]`

**agent-output:verification/015/qa-p2-r4-testresults-2618926.json**
- agent-output:verification/015/qa-p2-r4-testresults-2618926.json:1 (terms: x-pathname) `...sage editor sends a request carrying no x-pathname header to the new-message editor, once","status":... [line is 420196 chars; excerpt around match]`

**agent-output:verification/015/qa-p2-r5-testresults-c5303ca.json**
- agent-output:verification/015/qa-p2-r5-testresults-c5303ca.json:1 (terms: x-pathname) `...sage editor sends a request carrying no x-pathname header to the new-message editor, once","status":... [line is 420262 chars; excerpt around match]`

**agent-output:verification/015/qa-r3-mutants-summary-4f9ed85.txt**
- agent-output:verification/015/qa-r3-mutants-summary-4f9ed85.txt:18 (terms: x-pathname) `         × sends a request carrying no x-pathname header to the new-message editor, once 3ms`
- agent-output:verification/015/qa-r3-mutants-summary-4f9ed85.txt:19 (terms: x-pathname) `...ge editor > sends a request carrying no x-pathname header to the new-message editor, once [line is 229 chars; excerpt around match]`

**agent-output:verification/015/qaf27-qaf20-final-testresults-825a7d8.json**
- agent-output:verification/015/qaf27-qaf20-final-testresults-825a7d8.json:1 (terms: x-pathname) `...sage editor sends a request carrying no x-pathname header to the new-message editor, once","status":... [line is 416731 chars; excerpt around match]`

**agent-output:verification/015/qaf38-40-final-testresults-620b4ee.json**
- agent-output:verification/015/qaf38-40-final-testresults-620b4ee.json:1 (terms: x-pathname) `...sage editor sends a request carrying no x-pathname header to the new-message editor, once","status":... [line is 422386 chars; excerpt around match]`

**agent-output:verification/015/qaf41-42-final-testresults-9b5e47f.json**
- agent-output:verification/015/qaf41-42-final-testresults-9b5e47f.json:1 (terms: x-pathname) `...sage editor sends a request carrying no x-pathname header to the new-message editor, once","status":... [line is 423320 chars; excerpt around match]`

**agent-output:verification/016/implementer-fix-64a3d26/vitest.json**
- agent-output:verification/016/implementer-fix-64a3d26/vitest.json:1 (terms: x-pathname) `...sage editor sends a request carrying no x-pathname header to the new-message editor, once","status":... [line is 558023 chars; excerpt around match]`

**agent-output:verification/016/implementer-fix-r7/vitest.json**
- agent-output:verification/016/implementer-fix-r7/vitest.json:1 (terms: x-pathname) `...sage editor sends a request carrying no x-pathname header to the new-message editor, once","status":... [line is 558115 chars; excerpt around match]`

**agent-output:verification/fix-agent-comment-sweep-merge/code-review/suite-6d78b19.json**
- agent-output:verification/fix-agent-comment-sweep-merge/code-review/suite-6d78b19.json:1 (terms: x-pathname) `...sage editor sends a request carrying no x-pathname header to the new-message editor, once","status":... [line is 413672 chars; excerpt around match]`

**agent-output:verification/fix-agent-comment-sweep-merge/eslint-34-56c4dab.json**
- agent-output:verification/fix-agent-comment-sweep-merge/eslint-34-56c4dab.json:1 (terms: overrides) `...mpiler(),\n  },\n});\n\nfunction values(overrides: Record<string, unknown> = {}) {\n  return {\n    ... [line is 338020 chars; excerpt around match]`

**agent-output:verification/fix-agent-comment-sweep-merge/eslint-34-6d78b19.json**
- agent-output:verification/fix-agent-comment-sweep-merge/eslint-34-6d78b19.json:1 (terms: overrides) `...mpiler(),\n  },\n});\n\nfunction values(overrides: Record<string, unknown> = {}) {\n  return {\n    ... [line is 323843 chars; excerpt around match]`

**agent-output:verification/fix-agent-comment-sweep-merge/eslint-34-b96e364.json**
- agent-output:verification/fix-agent-comment-sweep-merge/eslint-34-b96e364.json:1 (terms: overrides) `...mpiler(),\n  },\n});\n\nfunction values(overrides: Record<string, unknown> = {}) {\n  return {\n    ... [line is 364771 chars; excerpt around match]`

**agent-output:verification/fix-agent-comment-sweep-merge/suite-56c4dab.json**
- agent-output:verification/fix-agent-comment-sweep-merge/suite-56c4dab.json:1 (terms: x-pathname) `...sage editor sends a request carrying no x-pathname header to the new-message editor, once","status":... [line is 413577 chars; excerpt around match]`

**agent-output:verification/fix-agent-comment-sweep-merge/suite-6d78b19.json**
- agent-output:verification/fix-agent-comment-sweep-merge/suite-6d78b19.json:1 (terms: x-pathname) `...sage editor sends a request carrying no x-pathname header to the new-message editor, once","status":... [line is 413625 chars; excerpt around match]`

**agent-output:verification/fix-hooks-record-shared-engine/code-review/index-old-vs-new-generator-on-d96b799.diff**
- agent-output:verification/fix-hooks-record-shared-engine/code-review/index-old-vs-new-generator-on-d96b799.diff:25 (terms: x-query-params) `...roviders.tsx decodes a client-reachable x-query-params header with decodeURIComponent; a malformed v... [line is 267 chars; excerpt around match]`
- agent-output:verification/fix-hooks-record-shared-engine/code-review/index-old-vs-new-generator-on-d96b799.diff:53 (terms: x-query-params) `...roviders.tsx decodes a client-reachable x-query-params header with decodeURIComponent; a malformed v... [line is 282 chars; excerpt around match]`

**agent-output:verification/fix-hooks-record-shared-engine/index-diff-old-vs-engine.txt**
- agent-output:verification/fix-hooks-record-shared-engine/index-diff-old-vs-engine.txt:25 (terms: x-query-params) `...roviders.tsx decodes a client-reachable x-query-params header with decodeURIComponent; a malformed v... [line is 267 chars; excerpt around match]`
- agent-output:verification/fix-hooks-record-shared-engine/index-diff-old-vs-engine.txt:53 (terms: x-query-params) `...roviders.tsx decodes a client-reachable x-query-params header with decodeURIComponent; a malformed v... [line is 282 chars; excerpt around match]`

**agent-output:verification/fix-hooks-record-shared-engine/qa/index-old-vs-new-generator-on-e44a867.diff**
- agent-output:verification/fix-hooks-record-shared-engine/qa/index-old-vs-new-generator-on-e44a867.diff:25 (terms: x-query-params) `...roviders.tsx decodes a client-reachable x-query-params header with decodeURIComponent; a malformed v... [line is 267 chars; excerpt around match]`
- agent-output:verification/fix-hooks-record-shared-engine/qa/index-old-vs-new-generator-on-e44a867.diff:53 (terms: x-query-params) `...roviders.tsx decodes a client-reachable x-query-params header with decodeURIComponent; a malformed v... [line is 282 chars; excerpt around match]`

**agent-output:verification/fix-website-save-gate-embeds/qa-phase2/suite-qaf1.json**
- agent-output:verification/fix-website-save-gate-embeds/qa-phase2/suite-qaf1.json:1 (terms: x-pathname) `...sage editor sends a request carrying no x-pathname header to the new-message editor, once","status":... [line is 420041 chars; excerpt around match]`

**agent-output:verification/fix-website-save-gate-embeds/qa-phase2/suite.json**
- agent-output:verification/fix-website-save-gate-embeds/qa-phase2/suite.json:1 (terms: x-pathname) `...sage editor sends a request carrying no x-pathname header to the new-message editor, once","status":... [line is 419707 chars; excerpt around match]`

**agent-output:verification/fix-website-save-gate-embeds/round1-rereview/suite.json**
- agent-output:verification/fix-website-save-gate-embeds/round1-rereview/suite.json:1 (terms: x-pathname) `...sage editor sends a request carrying no x-pathname header to the new-message editor, once","status":... [line is 418716 chars; excerpt around match]`

**agent-output:verification/fix-website-save-gate-embeds/round1-subentry2/suite.json**
- agent-output:verification/fix-website-save-gate-embeds/round1-subentry2/suite.json:1 (terms: x-pathname) `...sage editor sends a request carrying no x-pathname header to the new-message editor, once","status":... [line is 418837 chars; excerpt around match]`

**agent-output:verification/fix-website-save-gate-embeds/round1-subentry3/suite.json**
- agent-output:verification/fix-website-save-gate-embeds/round1-subentry3/suite.json:1 (terms: x-pathname) `...sage editor sends a request carrying no x-pathname header to the new-message editor, once","status":... [line is 419669 chars; excerpt around match]`

**agent-output:verification/fix-website-save-gate-embeds/suite.json**
- agent-output:verification/fix-website-save-gate-embeds/suite.json:1 (terms: x-pathname) `...sage editor sends a request carrying no x-pathname header to the new-message editor, once","status":... [line is 415971 chars; excerpt around match]`
