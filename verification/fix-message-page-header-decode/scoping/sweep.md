# Scope sweep: browser-sent value decoded through an outdated parsing dependency

Property: a value the browser sends (a request header, a query string or a URL segment) is decoded or parsed on
the server through an outdated parsing dependency (case: `decode-uri-component` 0.4.1 via `query-string`).
Also: remove `sanitize-html`, `sharp` (direct) and `form-data`.

Read at: website `origin/master` = `983681ca6cd7cbacd0796ed093e094057ad7f9be` (`git -C website rev-parse origin/master`);
project-utils `749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f` (`git -C project-utils rev-parse 749606d`).
Working trees not read. No `.env*` read. Nothing run (no server, build or request).

Instruments: `git -C <repo> grep -n -E <pattern> origin/master -- src` and `git show origin/master:<path>`;
the architecture and research record by `grep -rlE` (listing) and the Read tool (see "Process facts").

## 1. Parsers: hits in website `src/` at `983681c`

Pattern: `query-string|decode-uri-component|from 'qs'|require\('qs'\)|querystring|URLSearchParams|decodeURIComponent`.

| S | file:line | the value that reaches it | class |
|---|---|---|---|
| S1 | `src/app/_components/Providers.tsx:2` | `import queryString from 'query-string'` (only import of the package in `src`) | import |
| S2 | `src/app/_components/Providers.tsx:34` | `queryString.parse(decodeURIComponent(encodedQuery))`: `encodedQuery` is `hdrs.get('x-query-params') ?? ''` (line 46), a REQUEST HEADER read through `headers()` | browser-sent header, decoded + parsed through `query-string` 8.1.0 -> `decode-uri-component` 0.4.1. Only hit in the class. |
| S3 | `src/middleware.ts:18` | `new URLSearchParams(request.url.split('?')[1])`: the request URL's query string | browser-sent query string, parsed by the platform `URLSearchParams`; writes S2's header |
| S4 | `src/components/SlateEditor/utils/onCopy.ts:26` | `decodeURIComponent(window.atob(fragment))`: clipboard `application/x-slate-fragment` data, in the browser | client-side only, clipboard data; not a server decode |
| S5 | `src/server/auth.ts:64` | `new URLSearchParams()` built to form a urlencoded POST body to Discord (outbound) | server data, builder not parser |
| S6 | `src/utils/redis/index.ts:148` | `new URLSearchParams()`, same outbound builder | server data, builder not parser |
| S7 | tests: `src/app/message/__tests__/layout.navigation-guard.test.tsx:48`, `src/app/message/f/[id]/__tests__/page.message-list.test.tsx:20`, `src/app/preview/__tests__/page.invalid-data.test.tsx:11,31`, `src/providers/MessageProvider/__tests__/MessageProvider.save-new-number.test.tsx:35`, `...MessageProvider.stored-draft.test.tsx:41`, `...__tests__/helpers/messageProviderDeps.ts:17`, `src/server/__tests__/auth.sign-out.test.ts:93` | mocks and fixtures | test code |
| S8 | `src/scripts/__tests__/backfillValid.report-and-target-guards.test.ts:179` | a title string containing "query-string" (not an import) | test text |

No hit in `src/` for `qs`, `decode-uri-component` or `querystring` as an import. No `src/` source uses `useSearchParams` in a way
the pattern would show other than the test mocks above (S7); `useSearchParams` itself was not in the predicate (see blind spots).

project-utils at `749606d`: `git -C project-utils grep -c -E "query-string|decode-uri-component|querystring|URLSearchParams|decodeURIComponent" 749606d -- <abs>/project-utils/src` printed nothing, rc=1: no hit in `src/`.
`dist/` and `package-lock.json` were not searched (see not covered).

## 2. Where a request header is read in website (non-test `src`)

Pattern: `headers\(\)|\.headers|NextRequest|x-query-params|x-[a-z-]+['"]`. Hits that are reads or writes of a request header:

| S | file:line | header | who | value reaches |
|---|---|---|---|---|
| S9 | `src/middleware.ts:12` | copies ALL incoming headers: `new Headers(request.headers)` | middleware | forwarded to the route as request headers |
| S10 | `src/middleware.ts:14` | SETS `x-pathname` = `request.nextUrl.pathname` | middleware | S12 |
| S11 | `src/middleware.ts:20` | SETS `x-query-params` = `encodeURIComponent(queryParams.toString())`, only `if (queryString)`, where `queryString = request.url.split('?')[1]` (line 17) | middleware | S2 |
| S12 | `src/app/_navigation/Redirects/Server.tsx:5` | READS `x-pathname` (`?? ''`); compared to `'/message/m/0/edit'` / `'/message/m/0/send'` | server component | string compare only, no decode |
| S13 | `src/app/_components/Providers.tsx:43,46` | READS `x-query-params` (`?? ''`) and `cookie` (line 45, passed as a fetch header) | server component | S2 for the first |
| S14 | `src/app/_components/IsMobileWrapper.tsx:9` | READS `user-agent`, `.includes('Mobile')` | server component | boolean only |
| S15 | `src/pages/api/interactions-edge.ts:30,35,36` | `req.headers.get('x-signature-ed25519')`, `'x-signature-timestamp'` (NextRequest) | edge API | signature verify (discord-verify) |
| S16 | `src/pages/api/interactions-server.ts:11` | `req.headers['x-hooks-api-token']` compared to `env.HOOKS_API_TOKEN` | API | string compare |
| S17 | `src/pages/api/v1/guilds/[guildId]/messages.ts:23` and `.../messages/[id].ts:23` | `req.headers.authorization !== \`Bearer ${key}\`` | API | string compare |
| S18 | `src/app/page.tsx:31` | `headers().get('cookie')` inside a comment | comment | none |

`x-query-params` in `src` (tests included): only S11 (set) and S13 (read). No test names `x-query-params` (`git grep` over `src` including `__tests__`, only `x-pathname` appears in `Server.session-cookie-redirect.test.ts:15,73`).

### The `x-query-params` path

- Set: `src/middleware.ts:17-21`. `request.url.split('?')[1]`; when truthy, `new URLSearchParams(queryString)`, then `requestHeaders.set('x-query-params', encodeURIComponent(queryParams.toString()))`. When there is no `?`, the middleware does not set it and does not delete it. Because line 12 copies every incoming header, a header the browser itself sends as `x-query-params` passes through the middleware unchanged in that case. This is read from the source only; no request was run.
- Read: `src/app/_components/Providers.tsx:46`, `getMessage(hdrs.get('x-query-params') ?? '')`. `getMessage` (lines 32-40) does `queryString.parse(decodeURIComponent(encodedQuery))`, reads `.code`, and if present `fetch(\`${getBaseUrl()}/api/messages/codes/${params.code}\`)`. The result of that fetch is awaited in `Promise.all` but discarded (`const [session] = ...`), so the message fetched is not used by `Providers`.
- Mount: `Providers` is imported by `src/app/message/layout.tsx:3` and rendered at line 13 (only non-test importer: `git grep -E "_components/Providers|from './Providers'|<Providers"`). The middleware matcher includes `/message/(.*)`, so every `/message/...` request passes the middleware first.
- `decodeURIComponent` throws `URIError` on a malformed `%` sequence. Via the middleware path the header is `encodeURIComponent`-output (always well-formed); a client-sent header is not. This is a reading of the code, not a run.

### Middleware, quoted (`src/middleware.ts` at `983681c`)

```ts
export const config = {
  matcher: ['/message/(.*)', '/api/guilds/(.*)', '/preview'],
};
```

Note: `/message/(.*)` does not by itself match the bare `/message`; `/api/guilds/(.*)` has no route in this tree under `src/pages/api/` that was checked (not enumerated); `/preview` matches exactly. Whether Next matches `/message` bare was not tested.

## 3. Dependency tree (`origin/master:pnpm-lock.yaml`, `package.json`)

- `decode-uri-component`: package `decode-uri-component@0.4.1` (lock line 3330); snapshot line 11015 `decode-uri-component@0.4.1: {}`. Pulled in by exactly one package: `query-string@8.1.0` (snapshot lines 13700-13704: `decode-uri-component: 0.4.1`, `filter-obj: 5.1.0`, `split-on-first: 3.0.0`). A grep of the lock for `decode-uri-component` shows lines 3330, 11015, 13702 only.
- `query-string` is DIRECT: `package.json` `"query-string": "^8.1.0"`, importers entry at lock line 175, resolved `8.1.0`. `decode-uri-component` is NOT direct; it is only transitive.
- `filter-obj@5.1.0` (lock 4056, 11942) and `split-on-first@3.0.0` (lock 6246, 14406): both only under `query-string@8.1.0`.
- `qs@6.11.0` (lock 5738, 13696): referenced by `body-parser@1.20.1` (line 10630) and `express@4.18.2` (line 11869), not by `query-string`; not imported in `src/`.
- Overrides: `package.json` has a top-level `"overrides": { "semver": "^7.5.3" }` (npm-style). It has NO `pnpm` key and no `pnpm.overrides`. `pnpm-workspace.yaml` holds only `patchedDependencies: simple-markdown@0.7.3: patches/simple-markdown@0.7.3.patch`. The lockfile has no `overrides:` section (`grep -n -E "^overrides" lock.yaml` printed nothing). So there is no effective pnpm overrides block today; whether pnpm 10.28.2 honours the npm `overrides` key was not tested (the missing lockfile section suggests it does not).
- `packageManager`: `pnpm@10.28.2`. Lockfile version 9.0.

## 4. Identifiers to remove (website, all of `src`, `bot`, `lang`, config and `package.json`, `vercel.json`, `next.config.js`, `README.md`, `ecosystem.config.json`, `.eslintrc.json`, `tsconfig.json`, `pnpm-workspace.yaml`, `vitest.config.ts`)

Pattern: `sanitize-html|sanitizeHtml|sharp|form-data|FormData`.

| S | file:line | hit | class |
|---|---|---|---|
| S19 | `package.json:60` | `"form-data": "^4.0.0"` | declaration |
| S20 | `package.json:86` | `"sanitize-html": "^2.10.0"` | declaration |
| S21 | `package.json:88` | `"sharp": "^0.32.1"` | declaration |
| S22 | `package.json:114` | `"@types/sanitize-html": "^2.8.0"` (devDependency; a companion not named in the selection) | declaration |
| S23 | `src/app/message/m/[id]/_components/JsonModalBody.tsx:216` | `sanitizeHtml(` inside a JSX comment block `{/* <code ... */}`; the file has no `sanitize-html` import | NOT a live use (commented-out code) |
| S24 | `bot/utils/DiscordMessage.ts:1` | `import FormData from 'form-data';` plus `new FormData()` at line 144 and the type at lines 23-24 | LIVE import of `form-data` |
| S25 | `src/utils/sendWebhook.ts:24,41` | `FormData` as the global (no import in that file) | global, not the package |

- `sanitize-html`: no import or require anywhere (only S23, a comment, and the declarations). Safe to remove from the code's view; `@types/sanitize-html` (S22) is its companion.
- `sharp`: no import or `require` in `src`, `bot`, `lang`, scripts or config. `next.config.js` names images only as `images: { remotePatterns: [{ hostname: 'cdn.discordapp.com', protocol: 'https' }, { hostname: 'cdn.jsdelivr.net', protocol: 'https' }] }`; it names `sharp` nowhere and sets no `images.unoptimized`. `vercel.json` holds only `crons`. Next 16.1.6 declares its own `sharp: 0.34.5` (lock line 13024, inside the `next@16.1.6(...)` snapshot); the direct dependency resolves to `sharp@0.32.6` (lock 6099, 14206) and a second copy `0.34.5` (lock 6103, 14217) exists for Next. `next/image` is used (`NavMenu.tsx:9`, `Header.tsx:8`, `Sidebar.tsx:9`, `message/f/[id]/page.tsx:15`, and others) and some call sites carry `unoptimized` (`NavMenu.tsx:53`, `Header.tsx:137,175`, `Sidebar.tsx:100`, `f/[id]/page.tsx:256,486`), others not seen to. Which copy Next resolves at runtime under pnpm's isolated layout, and whether the optimiser runs on Vercel, were not tested.
- `form-data`: NOT unused in code. `bot/utils/DiscordMessage.ts:1` imports it as a value (`new FormData()` at line 144), and `DiscordMessage` is imported by `bot/edgeCommands.ts:5` and `bot/serverCommands.ts:5`, which `src/pages/api/interactions-edge.ts:7` and `src/pages/api/interactions-server.ts:3` load. Removing the direct dependency would leave `form-data` reachable only through transitive copies (`form-data@4.0.0` via `axios@1.6.2` lock line 10579 and `paracord` lock line 13306; `form-data@3.0.1` via `@types/node-fetch@2.6.3` line 9879), which pnpm does not expose to `bot/` imports. The `createForm` path in `DiscordMessage.ts` (line 139-169) is reached only if a caller calls it; `git grep createForm` shows no caller outside that file. So the import is live at module load, even if `createForm` is never called. Verdict for the steering thread to take: the brief's "declared-but-unused" premise does not hold for `form-data`.

## 5. The record: `architecture/` and `research/`

Pattern `x-query-params|query-string|Providers\.tsx|getMessage`, `grep -rlE` listing over both directories, then read in full with the Read tool:

| S | file:line | hit | relevance |
|---|---|---|---|
| S26 | `architecture/closed/017-existing-items-backlog-architecture-findings.md:34` | lists `src/app/_components/Providers.tsx` among files read at the conformance pass | names the file only; no statement about `x-query-params` or the decode |
| S27 | `architecture/closed/017-existing-items-backlog-architecture-findings.md:227` | "the CDN's query-string cache key" | unrelated (CDN cache key) |
| S28 | `architecture/system-architecture.md` (one matching line, count 1 by `grep -c`) | the line was not located: the Read of lines 1-306 shows no `x-query-params`, no `query-string` and no `Providers.tsx` text; the matching text is probably `getMessage` as a substring (e.g. `getMessages`/`getMessage*`), line not pinned | not the mechanism |

- `research/` (open and `closed/`): no hit (`grep -rlE` listed no file under it).
- The record states nothing about `x-query-params`, the middleware's header copy, or `decodeURIComponent` on a header. The mechanism is unrecorded in `architecture/` and `research/`. `system-architecture.md` lists `query-string` nowhere in its Dependencies line.

## Predicates' blind spots

- The text pattern misses: a dynamic `import('query-string')`; a re-export; `useSearchParams()` / `searchParams` props from Next (which parse internally, not through the named packages); `req.query` in Pages Router API handlers (Next's own parse); `new URL(...)` / `.searchParams`; `JSON.parse` of a query value (`/preview` reads a `data` query, `src/app/preview/page.tsx`, not shown by the pattern because it uses Next's `useSearchParams`); `params` of dynamic App Router segments (`[id]`, which Next decodes before the page sees them); `atob`/`decodeURI`; `unescape`.
- The header pattern misses a header read through a wrapper (`new Headers(...)`, a spread, `req.getHeader`, `req.rawHeaders`), `cookies()` (read separately in `Redirects/Server.tsx`), `getServerSession` internals, next-auth's own header reads, and the tRPC context's `req.headers` (not searched beyond the pattern; `src/server/api/trpc.ts` was not opened).
- Pattern `x-[a-z-]+['"]` matches also CSS class names such as `max-w-xl`; those rows were dropped by hand and not listed.
- `git grep` over `origin/master` cannot see files untracked at that ref, generated files or `node_modules` (e.g. what Next/next-auth do with a header or segment inside their own code).
- The lock reading is of the lockfile text; no `pnpm why` was run, so "pulled in by" is the lock's dependency edges, not a resolved tree.
- "Unused" for `sharp`/`sanitize-html` rests on the absence of a text import; a `require.resolve`, a string-built module name, or Next's implicit lookup of `sharp` is not visible to it.

## Not covered

- project-utils `dist/` and its `package-lock.json` (not searched; `src/` only, by count).
- website: `.github/`, `patches/`, `public/` and any dot-directory (the first `ls-tree` listing, filtered to non-`src/`/`public/` and cut at 80 entries, showed none; a `.github` directory was not looked for specifically).
- Other website repos in the workspace (`preview-image-generator`, `agent-output`) were not swept for parsers; `preview-image-generator` is not in the brief's repo list. A `git grep` into it was refused (see below).
- Runtime behaviour: whether a browser-sent `x-query-params` survives the middleware to `Providers`, whether `decodeURIComponent` throws on it, whether `/message` (bare) is matched, whether `sharp` 0.32.6 vs 0.34.5 serves Next's optimiser, and whether `pnpm` honours the npm-style `overrides` key. All stated from code or lockfile text only, none run.
- Next.js and next-auth internals that decode headers, cookies, URL segments or query strings before app code sees them.
- Vercel project configuration (not in the repo; `vercel.json` has crons only).
- The matching line in `system-architecture.md` (S28) was not located.

## Process facts (disclosure)

- The secret-file gate refused four Bash calls in this sweep: a multi-pattern `git grep -n` over `src/` plus a `git grep -c` over the whole website tree, a `git grep -c` into project-utils run after `cd`, a `grep -n` over lock/website paths run after `cd`, and `grep -rn` over `architecture/` and `research/`. The gate named a workflow file in `preview-image-generator`, which none of those calls targeted. Each was re-issued narrower: website `src/` with lines via `git -C <abs>`, project-utils with `git -C <abs> grep -c`, the record by `grep -rlE` (listing only) and the Read tool. The `-rn` line-numbered record search was therefore not run; line numbers for S26 and S27 come from the Read tool. The project-utils search is a count only, with no lines.
- No file was committed; this file is not committed.
