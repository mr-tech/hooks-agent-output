# Next.js upgrade scoping sweep (website next 16.1.6 to a 16.x between 16.2.5 and 16.4.6)

Read-only sweep. Recorded 2026-11-20. Refs read: website `origin/master` 7923a1d; project-utils `origin/master` 749606d; preview-image-generator `origin/master` 8512a1d. Working tree not read. Nothing built, served, installed, or committed.

Saved copies of `git show` output (scratch, not part of the record):
- `/tmp/claude-1000/-usr-local-bin-hooks/cc97952f-db3a-4985-8eb7-5761df3eecca/scratchpad/website-package.json.txt`
- `/tmp/claude-1000/-usr-local-bin-hooks/cc97952f-db3a-4985-8eb7-5761df3eecca/scratchpad/pnpm-lock.yaml.txt`
- `/tmp/claude-1000/-usr-local-bin-hooks/cc97952f-db3a-4985-8eb7-5761df3eecca/scratchpad/website-ls-tree.txt`
- `/tmp/claude-1000/-usr-local-bin-hooks/cc97952f-db3a-4985-8eb7-5761df3eecca/scratchpad/app-pages-files2.txt`

## Searches not completed

The repository-wide content search (`git grep` over the website tree at `origin/master`) was not completed.

Consequences: Sections 2, 4 and 6, and the import half of the sibling sweep, are NOT COMPLETED. They all depend on a repository-wide content search.

Also disclosed: the first `git grep -n` for `package.json` and the lockfile (Section 1) returned output that dropped lines. Example: `package.json` line 110 (`"@types/react-slider"`) was absent from the filtered result but is present in the saved copy. Section 1 below was therefore re-derived with `awk` over the saved copies. A `pattern` for tracked-path absence also first missed `src/middleware.ts` (the pattern required a bare `middleware` name); corrected in Section 3.

## 1. package.json entries and lockfile resolutions

### 1a. package.json (`origin/master`)

Command: `git -C /usr/local/bin/hooks/website show origin/master:package.json > <scratch>/website-package.json.txt`, then `awk '/"(next|eslint-config-next|react|react-dom|@next\/|@types\/react)/ {printf "%d: %s\n", NR, $0}' website-package.json.txt`, plus a full read of the file (144 lines).

Exact-name entries:

| line | section | entry |
|---|---|---|
| 31 | dependencies | `"@next/bundle-analyzer": "^16.1.6",` |
| 66 | dependencies | `"next": "^16.1.6",` |
| 72 | dependencies | `"react": "19.2.4",` |
| 76 | dependencies | `"react-dom": "19.2.4",` |
| 100 | devDependencies | `"@next/eslint-plugin-next": "^16.1.6",` |
| 108 | devDependencies | `"@types/react": "19.2.14",` |
| 109 | devDependencies | `"@types/react-dom": "19.2.3",` |
| 119 | devDependencies | `"eslint-config-next": "^15.0.0",` |

Other names carrying the prefix (listed for completeness, not React/Next packages themselves):
- next-prefixed: line 38 `"@trpc/next": "^11.10.0"` (dependencies); line 67 `"next-auth": "^4.24.5"` (dependencies); line 128 `"next-remote-watch": "^2.0.0"` (devDependencies).
- `@types/react`-prefixed: line 110 `"@types/react-slider": "^1.3.1"` (devDependencies).
- `react`-prefixed: lines 73-84 (`react-accessible-accordion`, `react-aria`, `react-device-detect`, `react-error-boundary`, `react-hotkeys-hook`, `react-images-uploading`, `react-merge-refs`, `react-slider`, `react-stately`, `react-toastify`, `react-use`); lines 36, 39 (`@tanstack/react-query`, `@trpc/react-query`).

Scripts naming Next (from full read):
- line 9 `"build": "next build",`
- line 13 `"start": "next dev",`
- line 14 `"analyze": "ANALYZE=true next build",`
- line 15 `"update-next": "npm i next@latest @next/bundle-analyzer@latest @next/eslint-plugin-next@latest eslint-config-next@latest @next-auth/prisma-adapter@latest @next/bundle-analyzer@latest @trpc/next@latest cookies-next next-auth@latest @vercel/node@latest",`

`overrides` key (lines 141-143, full read): `"overrides": { "semver": "^7.5.3" }`. No other override, resolutions, pnpm.overrides, or catalog key in `package.json` or `pnpm-workspace.yaml` (the workspace file holds only `patchedDependencies: simple-markdown@0.7.3`, lines 1-2). No `engines` key in `package.json`.

Predicate blind spots: exact-name quoted-key match only; it cannot see dependencies declared under another name via `npm:` aliasing, nor a `next` entry in a nested `package.json` (none tracked: the only `package.json` in the tree is the root one, per `git ls-tree -r --name-only origin/master | grep -E '(^|/)package\.json$'`, which printed one path).

### 1b. pnpm-lock.yaml (`origin/master`, lockfileVersion 9.0)

Command: `git show origin/master:pnpm-lock.yaml > <scratch>/pnpm-lock.yaml.txt`, then `awk` predicates on the saved copy:
- importer keys: `awk '/^      .?(next|react|react-dom|eslint-config-next|@next\/|@types\/react)[^ ]*:$/'`
- package and snapshot keys: `awk '/^  .?(next|@next\/|eslint-config-next|react|react-dom|@types\/react)[@(]/'` and `awk '/^  .?(@next\/|@types\/react-dom)[^ ]*:$/'`

Root importer (`importers:` line 12, `  .:` line 14) resolved versions:
- `next`: lines 157-159. `specifier: ^16.1.6`, `version: 16.1.6(@babel/core@7.29.7)(react-dom@19.2.4(react@19.2.4))(react@19.2.4)(sass@1.56.2)`.
- `@next/bundle-analyzer`: lines 52-54. `specifier: ^16.1.6`, `version: 16.1.6(bufferutil@4.0.7)(utf-8-validate@5.0.10)`.
- `@next/eslint-plugin-next`: lines 254-256. `specifier: ^16.1.6`, `version: 16.1.6`.
- `react`: lines 175-177. `specifier: 19.2.4`, `version: 19.2.4`.
- `react-dom`: lines 187-189. `specifier: 19.2.4`, `version: 19.2.4(react@19.2.4)`.
- `eslint-config-next`: lines 311-313. `specifier: ^15.0.0`, `version: 15.5.14(eslint@8.57.1)(typescript@5.9.3)`.
- `@types/react`: lines 278-280. `specifier: 19.2.14`, `version: 19.2.14`.
- `@types/react-dom`: lines 281-283. `specifier: 19.2.3`, `version: 19.2.3(@types/react@19.2.14)`.

Package entries (`packages:` section, starts line 375):
- `@next/bundle-analyzer@16.1.6`: line 1122.
- `@next/env@16.1.6`: line 1125.
- `@next/eslint-plugin-next@15.5.14`: line 1128 (transitive, from `eslint-config-next@15.5.14`).
- `@next/eslint-plugin-next@16.1.6`: line 1131.
- `@next/swc-*@16.1.6` (8 platform packages): darwin-arm64 1134, darwin-x64 1140, linux-arm64-gnu 1146, linux-arm64-musl 1153, linux-x64-gnu 1160, linux-x64-musl 1167, win32-arm64-msvc 1174, win32-x64-msvc 1180.
- `next@16.1.6`: line 5068. Line 5070 `engines: {node: '>=20.9.0'}`, line 5071 `hasBin: true`.
- `react-dom@19.2.4`: line 5665. Line 5668 `react: ^19.2.4` (peer).
- `react@19.2.4`: line 5727. Line 5729 `engines: {node: '>=0.10.0'}`.
- `@types/react@19.2.14`: line 2330. `@types/react-dom@19.2.3`: line 2322.
- `eslint-config-next@15.5.14`: line 3682. Lines 3683-3690: resolution, `peerDependencies: eslint: ^7.23.0 || ^8.0.0 || ^9.0.0`, `typescript: '>=3.3.1'` (optional).

Snapshots (`snapshots:` section, starts line 6910):
- `next@16.1.6(...)`: line 12773. Line 12775 `'@next/env': 16.1.6`; lines 12784-12790 optional `@next/swc-*` 16.1.6; line 12780 `react: 19.2.4`; line 12781 `react-dom: 19.2.4(react@19.2.4)`.
- `@next/bundle-analyzer@16.1.6(...)`: line 7960. `@next/env@16.1.6`: line 7967. `@next/eslint-plugin-next@15.5.14`: line 7969. `@next/eslint-plugin-next@16.1.6`: line 7973. `@next/swc-*@16.1.6`: lines 7977-7998 (8 entries).
- `eslint-config-next@15.5.14(eslint@8.57.1)(typescript@5.9.3)`: line 11288; line 11290 `'@next/eslint-plugin-next': 15.5.14`.

Non-importer `next:` and `react:` keys inside `packages:` are peer entries (not dependencies of this project): lines 2491, 2493 (under `@vercel/analytics@1.6.1`), 2559, 2561 (under `@vercel/speed-insights@1.0.10`), 5696 (under `react-merge-refs@3.0.2`).

Count-based check: `grep -c -E "^  '@next/swc-[^']+@16\.1\.6':" <scratch>/pnpm-lock.yaml.txt` printed 16 (8 package entries plus 8 snapshot entries).

Predicate blind spots: prefix and key-shape match only; it cannot see transitive `next`/`react` references under other quoting or flow-style inline maps, nor any entry added after this commit.

## 2. Imports from `next` or `next/*` in `src/`, `bot/`, other source dirs

NOT COMPLETED (see the top section). Not run: no per-module grouping, no per-file `git grep -c` counts. Source directories at `origin/master` for the eventual search: `src/` (87 files under `src/app` and `src/pages`, 79 and 8 respectively, per Section 4), `bot/` (16 files), `lang/`, `patches/`, root `*.js`/`*.ts`.

Observed by reading a named file (not a search result): `src/middleware.ts` line 1 `import { NextResponse } from 'next/server';` and line 3 `import type { NextRequest } from 'next/server';`. `next.config.js` line 5 has a JSDoc type reference `import('next').NextConfig` (comment, not an import statement).

Blind spot of the intended search: the import patterns were `from|import|require(|import(|mock(|doMock(` followed by a quoted `next` or `next/...`. It would not see re-exports spelled differently, dynamic specifiers built from variables, or `next-auth` / `@trpc/next` / `next-remote-watch` (different specifiers, not `next/*`).

## 3. Next-specific keys in config files

Command for each file: `git -C /usr/local/bin/hooks/website show origin/master:<path>` read in full with line numbers. Presence check: `git ls-tree -r --name-only origin/master > <scratch>/website-ls-tree.txt`, then `grep -c` on that saved listing.

### 3a. `next.config.js` (full file, 31 lines)
- line 1-3: `const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: process.env.ANALYZE === 'true', });`
- line 5: `/** @type {import('next').NextConfig} */`
- line 6: `module.exports = withBundleAnalyzer({`
- line 7: `reactStrictMode: false,`
- lines 8-10: `turbopack: { root: __dirname, },`
- lines 11-16: `images: { remotePatterns: [ { hostname: 'cdn.discordapp.com', protocol: 'https' }, { hostname: 'cdn.jsdelivr.net', protocol: 'https' } ] }`
- lines 17-30: `redirects()` returning `{source: '/support', destination: 'https://discord.gg/Yf7We6k2Nb', permanent: true}` and `{source: '/message/m/:id(\\d{1,})', destination: '/message/m/:id/edit', permanent: false}` (line 25 carries the `:id(\\d{1,})` path pattern).

### 3b. `tsconfig.json` (full file, 58 lines)
- lines 23-27: `"plugins": [ { "name": "next" } ]`
- line 45: `"next-env.d.ts",` (in `include`)
- lines 51-52: `".next/types/**/*.ts",` and `".next/dev/types/**/*.ts",` (in `include`)

### 3c. `tsconfig.test.json` (full file, 13 lines)
- line 8: `"next-env.d.ts",` (in `include`); `extends` `./tsconfig.json` line 2.

### 3d. `.eslintrc.json` (full file, 369 lines)
- line 23: `"next"` inside `extends` (resolves to `eslint-config-next`).
- lines 162-168: `no-restricted-syntax` rule with selector `CallExpression[callee.name='dynamic']:not(...)` and message beginning "A next/dynamic call with neither `loading` nor `ssr: false` ...". The selector matches any call named `dynamic`, not only `next/dynamic`.
- lines 306-309: `"settings": { "next": { "rootDir": "." } }`
- lines 289-302: `tailwindcss/no-custom-classname` `cssFiles` lists `app/_styles/*.scss` paths (path strings, not a Next key).

### 3e. `vercel.json` (full file, 8 lines)
- line 2: `"crons": [...]` with `"path": "/api/cron?key=vercel"` (Vercel platform key; no Next-specific key).

### 3f. Entry and middleware files
- `src/middleware.ts` (full read, 30 lines): line 1 `import { NextResponse } from 'next/server';`; line 3 `import type { NextRequest } from 'next/server';`; lines 5-7 `export const config = { matcher: ['/message/(.*)', '/api/guilds/(.*)', '/preview'], };`; line 9 `export default function middleware(request: NextRequest)`; line 24 `NextResponse.next({ request: { headers: requestHeaders } })`.
- Absence (saved listing, `grep -c`): `(^|/)(middleware|instrumentation)[^/]*$` matched 1 (`src/middleware.ts`, listing line 337); `(^|/)middleware\.[jt]sx?$` matched 1; `(^|/)instrumentation(-client)?\.[jt]sx?$` matched 0. `(^|/)\.env[^/]*$` matched 0. `(^|/)next-env\.d\.ts$` matched 0 (referenced by tsconfig but not tracked).
- Config-file set (`grep -c -E '(^|/)(next\.config\.[a-z]+|vercel\.json|tsconfig[^/]*\.json|\.eslintrc[^/]*|eslint\.config[^/]*)$'`): 5.

### 3g. `package.json` scripts naming Next: see Section 1a (lines 9, 13, 14, 15).

Predicate blind spots: only the files named above were read. Not read: `ecosystem.config.json`, `postcss.config.js`, `tailwind.config.js`, `vitest.config.ts`, `vitest.setup.dom.ts`, `.eslintignore`, `.gitignore`, `lang/`, `bot/`. A Next key inside any unread file is not seen.

## 4. Next.js runtime conventions in `src/app/` and `src/pages/`

NOT COMPLETED. The content search for `export const runtime|dynamic|revalidate|fetchCache|preferredRegion|maxDuration`, `generateMetadata`, `generateStaticParams`, `headers()`, `cookies()`, `draftMode`, `unstable_*`, `after(`, `connection(`, `NextRequest`, `NextResponse`, and `config = { api:` was not completed. No hits, no file:line entries, and no zero-hit claims are made.

Inventory only (listing, no content predicate): `git ls-tree -r --name-only origin/master -- src/app > <scratch>/app-only.txt` gives 79 files (`grep -c ''`); `-- src/pages` gives 8 files (`grep -c ''`); `-- bot` gives 16 files (`grep -c ''`). Convention-named files under `src/app` (by filename, not content): `src/app/layout.tsx`, `src/app/head.tsx`, `src/app/page.tsx`, `src/app/legal/layout.tsx`, `src/app/legal/privacy/page.tsx`, `src/app/legal/terms/page.tsx`, `src/app/message/layout.tsx`, `src/app/message/loading.tsx`, `src/app/message/page.tsx`, `src/app/message/f/[id]/layout.tsx`, `src/app/message/f/[id]/page.tsx`, `src/app/message/m/[id]/layout.tsx`, `src/app/message/m/[id]/edit/page.tsx`, `src/app/message/m/[id]/send/page.tsx`, `src/app/message/m/new/page.tsx`, `src/app/preview/page.tsx`. No `route.ts`, `template`, `default`, `not-found`, `error`, or `global-error` file is tracked under `src/app`. `src/pages/` contains only `api/` files: `api/auth/[...nextauth].ts`, `api/cron.ts`, `api/interactions-edge.ts`, `api/interactions-server.ts`, `api/messages/codes/[code].ts`, `api/trpc/[trpc].ts`, `api/v1/guilds/[guildId]/messages.ts`, `api/v1/guilds/[guildId]/messages/[id].ts`.

Blind spot: filename-based inventory cannot see any export, route segment config, or import.

## 5. npm view (registry reads)

Commands run from `/home/dev`:
- `npm view next@16.2.5 peerDependencies engines --json`
- `npm view next@16.4.6 peerDependencies engines --json`
- `npm view eslint-config-next@16.2.5 peerDependencies --json`
- `npm view eslint-config-next@16.4.6 peerDependencies --json`

Output, verbatim:

next@16.2.5 (exit 0):
```
{
  "peerDependencies": {
    "sass": "^1.3.0",
    "react": "^18.2.0 || 19.0.0-rc-de68d2f4-20241204 || ^19.0.0",
    "react-dom": "^18.2.0 || 19.0.0-rc-de68d2f4-20241204 || ^19.0.0",
    "@playwright/test": "^1.51.1",
    "@opentelemetry/api": "^1.1.0",
    "babel-plugin-react-compiler": "*"
  },
  "engines": {
    "node": ">=20.9.0"
  }
}
```

next@16.4.6 (exit 0): identical to the 16.2.5 output above.

eslint-config-next@16.2.5 (exit 0):
```
{
  "eslint": ">=9.0.0",
  "typescript": ">=3.3.1"
}
```

eslint-config-next@16.4.6 (exit 0): identical to the eslint-config-next@16.2.5 output above.

Same-table facts for comparison, from Section 1 (no interpretation): website `eslint` devDependency is `"eslint": "~8.57.0"` (package.json line 116); lockfile resolves `eslint@8.57.1` (importer lines 309-310 context). Website `sass` is `"^1.56.2"` (line 85). Website `react`/`react-dom` are `19.2.4` (lines 72, 76). `package.json` has no `engines` key.

Blind spot: `peerDependencies` and `engines` only. Not checked: `dependencies` of these versions, the optional peer `@playwright/test` and `babel-plugin-react-compiler` absence in the website lock, and any Node version the deployment uses.

## 6. Prior record statements about this mechanism

NOT COMPLETED. The command `git -C /usr/local/bin/hooks/agent-output grep -n -i -E "next(\.js)? ?(16|upgrade)|eslint-config-next|bundle-analyzer" -- architecture research planning roadmap` was not completed. No hits are listed.

## Sibling repositories

### project-utils (`origin/master` 749606d)
- Command: `git -C /usr/local/bin/hooks/project-utils ls-tree -r --name-only origin/master | grep -E '(^|/)package\.json$'` gives one path, `package.json`. Then `git -C /usr/local/bin/hooks/project-utils show origin/master:package.json` (full read, 29 lines).
- No `next`, `@next/*`, `eslint-config-next`, `react`, `react-dom`, or `@types/react*` entry in `dependencies` (lines 11-16) or `devDependencies` (lines 17-28). No `overrides`.
- Import sweep for `next`: NOT COMPLETED.

### preview-image-generator (`origin/master` 8512a1d)
- Command: `git -C /usr/local/bin/hooks/preview-image-generator ls-tree -r --name-only origin/master | grep -E '(^|/)package\.json$'` gives one path. Then `git -C /usr/local/bin/hooks/preview-image-generator show origin/master:package.json` (full read, 41 lines).
- Line 24 (devDependencies): `"@next/eslint-plugin-next": "^13.4.12",`. No `next`, `eslint-config-next`, `react`, or `react-dom` entry. Lines 38-40: `"overrides": { "semver": "^7.5.3" }`.
- Import sweep for `next`: NOT COMPLETED.

## Summary of counts (what each count is and where it comes from)

- package.json exact-name entries: 8 (Section 1a; awk on saved copy).
- package.json next-prefixed others: 3 (`@trpc/next`, `next-auth`, `next-remote-watch`); scripts naming next: 4 (lines 9, 13, 14, 15).
- overrides keys: 1 (`semver`, lines 141-143).
- lockfile importer keys matched: 8 (lines 52, 157, 175, 187, 254, 278, 281, 311; awk).
- next/* import sites: NOT COUNTED (not completed); 1 import observed by reading `src/middleware.ts` (2 import statements, lines 1 and 3).
- Next-specific config keys read: `next.config.js` 4 top-level keys; `tsconfig.json` 1 plugin; `.eslintrc.json` 3 places; `vercel.json` 0 Next-specific keys.
- src files: `src/app` 79, `src/pages` 8, `bot` 16 (listing counts with `grep -c`; no content predicates).
- runtime-convention hits: NOT COUNTED (not completed).
- npm peer ranges: next 16.2.5 and 16.4.6 identical; eslint-config-next 16.2.5 and 16.4.6 identical.
- record hits: NOT COUNTED (search not run).

## Steering addendum — Sections 2, 4 and 6 completed (steering-roadmap-hooks, 2026-11-20T02:51Z)

Run by steering at website `origin/master` 7923a1d with pathspec `src bot` (root config files are in Section 3). Blind spots: dynamic `import()` with a computed specifier; `next` reached only through a dependency; root-level `*.js`/`*.ts` outside `src` and `bot`.

### 2. Import specifiers

Command: `git grep -h -o -E` over the import pattern of the original Section 2, `origin/master -- src bot`, grouped with `sort | uniq -c` (statement counts). Per-file `git grep -c` with the same pattern lists 69 files.

```
     24 next/image
     16 next/navigation
     15 next
     10 next/dynamic
      8 next/server
      3 next/headers
      2 next/router
      2 next/link
      1 next/font/google
      1 next/dist/shared/lib/router-context.shared-runtime
      1 next/dist/api/app-dynamic
```

The two `next/dist/...` internals are test-only: `src/components/__tests__/helpers/linkNavigation.tsx:1` (`next/dist/shared/lib/router-context.shared-runtime`) and `src/components/AnchoredPopover/__tests__/Child.portal-inside-open-dialog.test.tsx:12` (`vi.mock` onto `next/dist/api/app-dynamic`).

### 4. Runtime conventions

Command: `git grep -n -E` over the Section 4 list plus `export const config|sizeLimit|bodyParser`, `origin/master -- src bot`: 29 lines.

```
bot/edgeCommands.ts:1:import { NextResponse } from 'next/server';
bot/edgeCommands.ts:7:import type { NextRequest } from 'next/server';
bot/edgeCommands.ts:25:const commands: Record<string, (request: NextRequest, interaction: RawCommand) => NextResponse | Promise<NextResponse>> = {
bot/edgeCommands.ts:46:    return NextResponse.json(payload, { status: 200 });
bot/edgeCommands.ts:64:    return NextResponse.json(response.data, { status: response.status });
src/app/_components/IsMobileWrapper.tsx:9:  const initMobile = (await headers()).get('user-agent')?.includes('Mobile') ?? false;
src/app/_components/Providers.tsx:32:  const hdrs = await headers();
src/app/_navigation/Redirects/Server.tsx:5:  const pathname = (await headers()).get('x-pathname') ?? '';
src/app/_navigation/Redirects/Server.tsx:7:  const cookieStore = await cookies();
src/app/_navigation/Redirects/__tests__/Server.session-cookie-redirect.test.ts:11:  const { NextRequest: Req } = await import('next/server');
src/app/page.tsx:31://   const cookie = headers().get('cookie');
src/middleware.ts:1:import { NextResponse } from 'next/server';
src/middleware.ts:3:import type { NextRequest } from 'next/server';
src/middleware.ts:5:export const config = {
src/middleware.ts:9:export default function middleware(request: NextRequest) {
src/middleware.ts:23:  // You can also set request headers in NextResponse.rewrite
src/middleware.ts:24:  return NextResponse.next({
src/pages/api/interactions-edge.ts:2:import { NextResponse } from 'next/server';
src/pages/api/interactions-edge.ts:4:import type { NextRequest } from 'next/server';
src/pages/api/interactions-edge.ts:11:export const config = {
src/pages/api/interactions-edge.ts:13:  api: { bodyParser: false },
src/pages/api/interactions-edge.ts:30:export default async function handler(req: NextRequest) {
src/pages/api/interactions-edge.ts:32:    return new NextResponse('invalid method', { status: 405 });
src/pages/api/interactions-edge.ts:49:    return new NextResponse('invalid request signature', { status: 401 });
src/pages/api/interactions-edge.ts:55:    return NextResponse.json({ type: INTERACTION_CALLBACKS.PONG }, { status: 200 });
src/pages/api/interactions-edge.ts:70:  return new NextResponse(null, { status: 400 });
src/server/api/__tests__/interactions-edge.signature-before-parse.test.ts:5:import type { NextRequest } from 'next/server';
src/server/api/__tests__/interactions-edge.signature-before-parse.test.ts:26:  } as unknown as NextRequest;
src/server/api/__tests__/interactions-edge.signature-before-parse.test.ts:68:    const response = await handler({ method: 'GET' } as unknown as NextRequest);
```

### 6. Record search

Command: `git -C agent-output grep -n -i -E "next(\.js)? ?16|next(\.js)? upgrade|eslint-config-next|bundle-analyzer|next/dist/" -- architecture research planning roadmap`: 20 lines (`grep -c .` over the saved output). Each line cut to 220 characters.

```
architecture/architecture-diagram.mmd:4:        subgraph website["website (hooks-gg/website, master) — Next.js 16 / React 19 — deploys on Vercel"]
architecture/closed/015-bug-evaluation-fixes-architecture-findings.md:38:| 2026-11-08T08:27 | Delta pass, plan rev 25 (`dd9e88a`, read from `018f72d`), on steering-hooks-015's request | Every limb conforms, read at the S
architecture/closed/015-bug-evaluation-fixes-architecture-findings.md:144:- **X-22, the modal seed, is not a defect.** Confirmed by my own read. `NewMessageModal` with a `guildId` is mounted only in `src/app/message/f/[i
architecture/closed/015-bug-evaluation-fixes-architecture-findings.md:199:- **Unread.** Whether Next 16's dev overlay still surfaces a caught render error. That affects the local walk's appearance, not the property.
architecture/system-architecture.md:78:                    │  website  (Next.js 16 hybrid, React 19, pnpm)  │
architecture/system-architecture.md:110:- **Next.js 16 hybrid**: App Router (`src/app/`) for UI pages (`message/`, `preview/`, `legal/`), Pages Router (`src/pages/api/`) for API endpoints: tRPC (`trpc/`), NextAuth (`auth
architecture/system-architecture.md:284:- **Context**: His intent on a failed generation is *"Show a stale one is fine"* (`preview-image-generator.md` P-6). The save must not wait on the render (plan 017 hazard 3, from h
planning/closed/004-lazy-loading-preload-overhaul.md:39:**Key insight from Analysis 004**: `next/dynamic` in Next.js 16 already exposes a built-in `.preload()` method (accessible at `.render.preload` due to `forwardRef` 
planning/closed/004-lazy-loading-preload-overhaul.md:64:1. Next.js 16.1.6, React 19.2.4. `next/dynamic` is built on `loadable.shared-runtime.js` (react-loadable derivative), uses `useSyncExternalStore`, and does NOT use 
planning/closed/014-test-suite-cleanup.md:90:| D13 | A DOM test harness is authorised as a declared scope delta: new devDependency + vitest environment change; source-text tests over `.tsx` are converted to behavioural t
planning/closed/015-bug-evaluation-fixes.md:116:| 2026-11-08T08:28 | cr | code-reviewer (code-reviewer-hooks-015) | Round 15, the gate read of `018f72d..dd9e88a` (rev 25): APPROVED, no findings, `code-review/015-bug-eval
planning/closed/015-bug-evaluation-fixes.md:1175:| X-22 | `NewMessageModal`'s `selectedGuildId` seed on a folder switch (D28 candidate) | Not a defect: a client navigation `/message/f/A` → `/message/f/B` mounts B's pag
planning/closed/015-bug-evaluation-fixes.md:1214:| M3 premise question (implementer probe `verification/015/m3-premise-probe-6001f7f.txt`, via steering). The planner read it at 06:43Z, and F-15 reproduces in the app. nex
planning/closed/015-bug-evaluation-fixes.md:1218:| `NewMessageModal` `selectedGuildId` seed (D28 candidate). The implementer's probe shows it never follows the `guildId` prop and keeps a user's pick. Whether a client nav
planning/closed/017-existing-items-backlog.md:232:(AN-3, verified locally at Next 16.1.6). D-8 needs the outcome of a render that finishes after the
planning/closed/017-existing-items-backlog.md:290:- **AN-2 (item 4).** Answered: losses S2, S3 and S5, and the dead navigation guard. Next 16.1.6
planning/closed/017-existing-items-backlog.md:749:  back/forward cannot be stopped at Next 16.1.6 (AN-2). The ones that leave an editor at `1ad625e`
planning/closed/017-existing-items-backlog.md:1374:| X-13 | `cron.scheduled-selection` and `interactions-edge.signature-before-parse` stay in `src/server/api/__tests__/` | Their modules live under `src/pages/api/`. Next 
planning/closed/017-existing-items-backlog.md:1375:| X-14 | Navigations that cannot be stopped: `router.push`/`replace`, `redirect()`, back/forward | D-12; Next 16.1.6 (AN-2) | Stated limit; UAT row |
planning/closed/017-existing-items-backlog.md:1396:| M4-a's "the one interception Next 16.1.6 offers": `StyledLink` also intercepts a plain click on a link to another site, from `onClick` | M4 document § Deviations (`c1
```
