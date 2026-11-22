# Scope sweep — middleware file convention deprecation

Read-only sweep. Repo `/usr/local/bin/hooks/website`; all repo reads via `git -C ... show/grep origin/master`.
Nothing was edited, staged, committed or run (codemod not run).
Process note: the first attempt to write this file via a shell heredoc was refused by the record-write-gate hook; this file was then written with the Write tool (the form the hook names).

## 0. Baseline
- `git rev-parse origin/master` -> `3859c29d557c920a5b611b8e3a4e7b5bf7b1222e` (matches expected 3859c29).
- Installed Next: `grep '"version"' node_modules/next/package.json` -> `"version": "16.4.6"`. package.json at origin/master line 65: `"next": "^16.4.6"`.
- `git ls-tree -r --name-only origin/master | grep -i -E 'middleware|proxy'` -> `src/__tests__/env.client-proxy.test.ts` (unrelated, tests an env Proxy object), `src/__tests__/middleware.request-headers.test.ts`, `src/middleware.ts`.
- Only `next.config.js` exists (no .mjs); `git show origin/master:next.config.js | grep -n -i -E 'runtime|edge|middleware|proxy|experimental|skip'` -> 0 hits. No vercel.json at origin/master (`git show origin/master:vercel.json` -> fatal: path does not exist).

## 1. What the installed Next requires

Instruments: `node_modules/next/dist/build/index.js`, `dist/server/lib/router-utils/setup-dev-bundler.js`, `dist/lib/constants.js`, `dist/build/analysis/get-page-static-info.js`, `dist/experimental/testing/server/middleware-testing-utils.js`, `dist/docs/01-app/**` (all under `/usr/local/bin/hooks/website/node_modules/next/`).

### Warning emitter
`dist/build/index.js:731` (dev twin at `dist/server/lib/router-utils/setup-dev-bundler.js:405`):
`_log.warnOnce(\`The "${MIDDLEWARE_FILENAME}" file convention is deprecated. Please use "${PROXY_FILENAME}" instead.\n\n  To migrate automatically, run:\n  npx @next/codemod@canary middleware-to-proxy .\n\n  Learn more: https://nextjs.org/docs/messages/middleware-to-proxy\`)`
It fires inside `if (middlewareFilePath) {` (line 724). Lines 725-729: if BOTH exist it throws `Both middleware file "./..." and proxy file "./..." are ...` (message truncated in my read), so the old file must be moved, not duplicated.

### File name and location
- `dist/lib/constants.js:287-290`:
  `const MIDDLEWARE_FILENAME = 'middleware';` / `const MIDDLEWARE_LOCATION_REGEXP = \`(?:src/)?${MIDDLEWARE_FILENAME}\`;` / `const PROXY_FILENAME = 'proxy';` / `const PROXY_LOCATION_REGEXP = \`(?:src/)?${PROXY_FILENAME}\`;`
- `dist/build/index.js:697`: `const proxyDetectionRegExp = new RegExp(\`^${_constants.PROXY_FILENAME}\\.(?:${config.pageExtensions.join('|')})$\`);` and line 717 `if (isAtConventionLevel && fileBaseName === _constants.PROXY_FILENAME) {`. So the file is `proxy.<pageExtension>` at root or `src/`. `src/middleware.ts` -> `src/proxy.ts`.
- `dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`: "Create a `proxy.ts` (or `.js`) file in the project root, or inside `src` if applicable, so that it is located at the same level as `pages` or `app`." With custom `pageExtensions`, `proxy.page.ts`.

### Export name(s)
- `proxy.md`, "Proxy function": "The file must export a single function, either as a default export or named `proxy`." Example `export default function proxy(request) {`.
- Enforced in `dist/build/analysis/get-page-static-info.js` (~line 322): `const hasValidExport = hasDefaultExport || isMiddleware && hasMiddlewareExport || isProxy && hasProxyExport;` — in a proxy file the accepted named export is `proxy` (a named `middleware` export alone is not accepted); a default export is accepted for both. Error text: `The file "${resolvedPath}" must export a function, either as a default export or as a named "${fileName}" export.`
- `dist/docs/01-app/02-guides/upgrading/version-16.md:609`: "The named export `middleware` is also deprecated. Rename your function to `proxy`." and :619 "We recommend changing the function name to `proxy`, even if you are using a default export."
- Current `src/middleware.ts` uses `export default function middleware(...)` — a default export, so valid after a bare file rename; the function rename is recommended, not required.

### config / matcher
- `proxy.md`: "Optionally, a config object can be exported alongside the Proxy function. This object includes the matcher ..."; example `export const config = { matcher: '/about/:path*', }`. Same export name `config`, same `matcher` shapes (string / array / objects with source, locale, has, missing), same path-to-regexp rules; "The `matcher` values need to be constants so they can be statically analyzed at build-time."
- `dist/docs/.../middleware.md`: "All functionality remains the same — only the file and export names have changed."
- `get-page-static-info.js:97` `PARSE_PATTERN = /(?<!(_jsx|jsx-))runtime|preferredRegion|...|middleware|proxy/` covers both names.

### Runtime
- `version-16.md:600`: "The `edge` runtime is **NOT** supported in `proxy`. The `proxy` runtime is `nodejs`, and it cannot be configured. If you want to continue using the `edge` runtime, keep using `middleware`."
- `proxy.md:257`: "Proxy defaults to using the Node.js runtime. The `runtime` config option is not available in Proxy files. Setting the `runtime` config option in Proxy will throw an error."
- `get-page-static-info.js:598-601`: `if ((0, _utils.isProxyFile)(page) && resolvedRuntime) {` ... message `Route segment config is not allowed in Proxy file at "${resolvedPath}". Proxy always runs on Node.js runtime.`
- Current `src/middleware.ts` at origin/master sets no `runtime` export (only `config` with `matcher`, and the default function) and imports only `next/server`; `next.config.js` has no runtime/edge/skip* flags (0 hits above). No runtime-config conflict is visible statically.
- Other: `dist/build/index.js:2826` `if (proxyFilePath && bundler !== _bundler.Bundler.Turbopack) { await fs.promises.rename(... 'proxy.js' -> 'middleware.js') ...` (webpack output renamed back internally). Config flags containing "middleware" are renamed (`version-16.md:621`: `skipMiddlewareUrlNormalize` -> `skipProxyUrlNormalize`); none in next.config.js. Function receives `(request, event)`; a `NextProxy` type exists. `version-16.md:1297`: "Edge middleware is not blindly renamed to proxy."

### Codemod
- `@next/codemod` is NOT installed: `ls node_modules/@next` -> `bundle-analyzer`, `eslint-plugin-next` only. It runs through `npx @next/codemod@canary middleware-to-proxy .` (quoted in the warning, `middleware.md`, `proxy.md:792`). `proxy.md:795`: "The codemod will rename the file and the function name from `middleware` to `proxy`." Manual equivalent, `version-16.md:604`: `mv middleware.ts proxy.ts` plus renaming the function. Not run.

### Test util relevant to the existing test
`dist/experimental/testing/server/middleware-testing-utils.js`: `function unstable_doesMiddlewareMatch({ config, url, headers, cookies, nextConfig }) { if (!config.matcher) { return true; } const matchers = getMiddlewareMatchers(config.matcher, nextConfig ?? {}); ...`. It takes only the `config` object, independent of the file name. Its name is still "Middleware" in 16.4.6; no proxy-named variant was looked for beyond `ls dist/docs/.../04-functions | grep -i -E 'doesMid|unstable'` (only unstable_cache / unstable_noStore / unstable_rethrow — so the docs do not describe it).

## 2. `git grep -n -i middleware origin/master` placement
Instrument: `git grep -n -i middleware origin/master` over the whole tree (lockfile included); `git grep -c -i middleware origin/master -- . ':!pnpm-lock.yaml'` gave per-file counts: middleware.request-headers.test.ts 6, AnchoredPopover/Child.tsx 2, AnchoredPopover/utils.tsx 1, ActionsMenu.tsx 1, Tooltip.tsx 3, env.mjs 1, middleware.ts 1, trpc.ts 3. Config files read by name-grep (package.json, next.config.js, vitest.config.ts, eslint.config.mjs, tsconfig.json) -> no "middleware" or "proxy" hits in any of them (vitest includes: `src/**/*.test.ts`, `src/**/*.test.tsx`; no reference to the file).

(a) Convention file itself
- `src/middleware.ts:9`: `export default function middleware(request: NextRequest) {`. Lines 5-7: `export const config = { matcher: ['/message', '/message/(.*)', '/api/guilds/(.*)', '/preview'], };`. It sets `x-pathname` from `request.nextUrl.pathname` on forwarded request headers (`requestHeaders.set('x-pathname', request.nextUrl.pathname);`).

(b) Code importing it
- `src/__tests__/middleware.request-headers.test.ts`: line 1 `import { unstable_doesMiddlewareMatch as doesMiddlewareMatch } from 'next/experimental/testing/server';` (Next util; unrelated to the file name); line 5 `import middleware, { config } from '../middleware';` (the one importer); line 7 `const forwarded = 'x-middleware-request-';`; line 11 `if (!doesMiddlewareMatch({ config, url })) ...`; line 13 `const response = middleware(new NextRequest(url, { headers: sent }));`; line 14 `response.headers.get('x-middleware-override-headers')`. The `x-middleware-*` strings are Next's request-override response-header protocol names, string literals not tied to the file name.
- No other file imports the convention file (the full grep above shows no other `middleware` import).

(c) Unrelated uses (and why)
- `pnpm-lock.yaml` (lines 437-8682): `@aws-sdk/middleware-*`, `@smithy/middleware-*`, `@smithy/util-middleware` — AWS SDK dependency package names.
- `src/components/AnchoredPopover/Child.tsx:78,158`, `AnchoredPopover/utils.tsx:70`, `DiscordMessageEditor/components/ActionsMenu.tsx:85`, `Tooltip.tsx:70,75,153`: floating-ui `middleware: [flip(), shift(), ...]` option and `middlewareData` — UI-library API.
- `src/env.mjs:55`: comment "... middlewares) or client-side so we need to destruct manually." — generic prose.
- `src/server/api/trpc.ts:4,106,107`: `t.middleware(({ ctx, next }) => {` (`enforceUserIsAuthed`) — tRPC procedure middleware.
- "proxy" word hits (`git grep -n -i proxy origin/master -- . ':!pnpm-lock.yaml'`): JS `Proxy` objects in tests/`env.mjs`, `createTRPCProxyClient` in `src/utils/api.ts`, `LinkProxy` in `StyledLink.tsx`, `*.proxy.rlwy.net` hosts. None is a Next proxy file; no existing `src/proxy.*` (ls-tree above), so no "Both middleware and proxy" collision.
- Consumers of the header (not middleware-word hits): `src/app/_navigation/Redirects/Server.tsx:5` `const pathname = (await headers()).get('x-pathname') ?? '';`; its test `Server.session-cookie-redirect.test.ts:15` sets `x-pathname` directly and does not import the middleware file.

## 3. Existing test and the effect of a rename
`src/__tests__/middleware.request-headers.test.ts` (vitest node project, `.test.ts`). Imports: `unstable_doesMiddlewareMatch` from `next/experimental/testing/server`, `NextRequest` from `next/server`, `{ describe, expect, it }` from `vitest`, and default `middleware` plus `config` from `'../middleware'`. Behaviour: builds a URL, returns the sent headers unchanged if the matcher does not match, otherwise calls the default export synchronously, rebuilds forwarded headers from `x-middleware-override-headers` / `x-middleware-request-<name>`, asserts `x-pathname` for `/message`, `/message?guild_id=123`, `/message/m/1/edit`, `/message/f/123` (it.each, 4 cases), and no `x-query-params` for `/message/m/1/edit?code=abc` (1 case).
Effect of renaming `src/middleware.ts` -> `src/proxy.ts`:
- Line 5 `'../middleware'` stops resolving; must become `'../proxy'`. The default binding name is free, so it works with or without renaming the function; if the function becomes a named-only `export function proxy`, the import must become `{ proxy, config }`.
- Per CLAUDE.md placement/naming (`<module>.<behaviour>.test.ts`, module = production module basename), the test would be renamed `proxy.request-headers.test.ts`; case count and pass set to be compared before/after.
- `x-middleware-*` literals and `unstable_doesMiddlewareMatch` are not affected by the file name (util source read; I did not trace in dist where the header names are emitted).
- The test calls the exported function directly in vitest (Node), so Edge-vs-Node runtime behaviour is not exercised by it.
- Coverage note for the "dead matcher" property: the matcher is `['/message', '/message/(.*)', '/api/guilds/(.*)', '/preview']`; the test's cases only touch `/message*` paths. Not analysed further.

## 4. Not seen by this sweep
- Vercel platform behaviour: how Vercel deploys a `proxy` (Node.js runtime, limits, regions, logging, pricing), and whether the build env uses the same Next version; no vercel.json at origin/master and no Vercel access.
- Runtime difference for this file moving from Edge to Node: only a static read of a 20-line file; no `next build`/`next dev` run and no request through a real server, so header forwarding via `NextResponse.next({ request: { headers } })` on the Node runtime was not exercised end to end.
- Whether the Vercel build uses Turbopack or webpack (build script flags not read beyond a package.json grep) — affects only the internal output rename at `build/index.js:2826`.
- The `@next/codemod@canary` real diff (not installed, not fetched, not run); docs-stated behaviour only.
- The docs claim "All functionality remains the same"; not verified by execution. Docs are those shipped with installed 16.4.6; Vercel may resolve a different Next within `^16.4.6` unless the lockfile pins it (lockfile Next version not read).
- Uncommitted changes in the shared working tree (only origin/master was read; the installed `node_modules` is the working tree's).
- Dashboard settings, env vars, and external consumers that may reference the file path or the `x-pathname` header.
