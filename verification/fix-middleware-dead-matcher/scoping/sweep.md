# Sweep: website middleware matcher reachability (chain fix-middleware-dead-matcher)

- Repo read: `website`, origin/master, SHA `132a7ab6f49d8a85ead507e2221ab3c3a531fd00`
  (`git -C /usr/local/bin/hooks/website ls-remote origin master`). Commit date 2026-11-21T20:30:34Z
  (`git -C /usr/local/bin/hooks/website log -1 --format='%H %cI %s' 132a7ab6f49d8a85ead507e2221ab3c3a531fd00`).
- The working tree was not read. Nothing was committed, installed, or changed in any tree.
- Scratch outputs (not in the record): `/tmp/claude-1000/-usr-local-bin-hooks/47cb8b91-b62b-4a6a-8e0b-f461ff293d27/scratchpad/` (`tree.txt`, `g-*.txt`, `mw-test.txt`, `record-hits.txt`).

## 1. `src/middleware.ts` at the SHA

Command: `git -C /usr/local/bin/hooks/website show 132a7ab6f49d8a85ead507e2221ab3c3a531fd00:src/middleware.ts`

- Line 6: `matcher: ['/message', '/message/(.*)', '/api/guilds/(.*)', '/preview']`.
- For a matched request, the function clones the request headers, sets `x-pathname` to `request.nextUrl.pathname`, and returns `NextResponse.next({ request: { headers } })`.
- It does no redirect, no rewrite, no authorization check, and no response change.
- It writes no `x-query-params` header at this SHA. Some record prose says it does (see section 4).

## 2. Matcher entries against route files

Route inventory: `git -C /usr/local/bin/hooks/website ls-tree -r --name-only 132a7ab6f49d8a85ead507e2221ab3c3a531fd00` gives 566 tracked files.

- App Router pages (`src/app/**/page.tsx`, 9 files): `src/app/page.tsx`, `src/app/legal/privacy/page.tsx`, `src/app/legal/terms/page.tsx`, `src/app/message/page.tsx`, `src/app/message/f/[id]/page.tsx`, `src/app/message/m/new/page.tsx`, `src/app/message/m/[id]/edit/page.tsx`, `src/app/message/m/[id]/send/page.tsx`, `src/app/preview/page.tsx`.
- App Router route handlers (`route.ts|tsx|js`): zero. There is no `src/app/api` directory.
- Pages Router (`src/pages/**`, 7 files, all under `api/`): `src/pages/api/auth/[...nextauth].ts`, `src/pages/api/interactions-edge.ts`, `src/pages/api/interactions-server.ts`, `src/pages/api/messages/codes/[code].ts`, `src/pages/api/trpc/[trpc].ts`, `src/pages/api/v1/guilds/[guildId]/messages.ts`, `src/pages/api/v1/guilds/[guildId]/messages/[id].ts`. There is no `src/pages/api/guilds`.
- Root wrappers `src/app/layout.tsx` and `src/app/head.tsx` wrap every App Router page. No matcher entry is needed for them to load.

Verdicts:

| Matcher entry | Verdict | Routes a matching request can reach |
|---|---|---|
| `/message` (exact) | **serves >=1 route** | `src/app/message/page.tsx` |
| `/message/(.*)` | **serves >=1 route** | `src/app/message/f/[id]/page.tsx`, `src/app/message/m/new/page.tsx`, `src/app/message/m/[id]/edit/page.tsx`, `src/app/message/m/[id]/send/page.tsx`; layouts `src/app/message/layout.tsx`, `src/app/message/f/[id]/layout.tsx`, `src/app/message/m/[id]/layout.tsx`; `src/app/message/loading.tsx`. There is no page at `/message/m/[id]`. |
| `/api/guilds/(.*)` | **serves none** | No file is under `/api/guilds/`. The nearest real API is `src/pages/api/v1/guilds/[guildId]/...`, at `/api/v1/guilds/`, which the literal prefix `/api/guilds/` does not match. `next.config.js` has redirects only (lines 19-28); no rewrites are configured. `vercel.json` is absent at this SHA. `ecosystem.config.json` contains no rewrite keys. |
| `/preview` (exact) | **serves >=1 route** | `src/app/preview/page.tsx` |

Verdict basis: each entry was read against the tree paths. The matcher rule applied is the Next.js one as I understand it: a plain string matches exactly, and `(.*)` matches any suffix. I did not run Next to confirm that.

Related config behaviour: `next.config.js` lines 25-26 redirect `/message/m/:id(\d{1,})` to `/message/m/:id/edit`. Next's documented order places config redirects before middleware. That is from the docs, not observed here. It means a request to `/message/m/<digits>` may never reach the `/message/(.*)` entry.

## 3. Identifiers, references, and tests

Reference counts. Each `git grep` output was saved unfiltered, then counted with `grep -c ''`:

- `git -C /usr/local/bin/hooks/website grep -n -F -e "'/api/guilds/(.*)'" -e '/api/guilds/(.*)' 132a7ab6f49d8a85ead507e2221ab3c3a531fd00`: 1 line, `src/middleware.ts:6`.
- `git -C /usr/local/bin/hooks/website grep -n -F -e '/api/guilds' 132a7ab6f49d8a85ead507e2221ab3c3a531fd00`: 1 line, `src/middleware.ts:6`. No other reference to `/api/guilds` exists in website at this SHA.
- `... grep -n -F -e "/message/(.*)" ...`: 1 line, `src/middleware.ts:6`.
- `... grep -n -F -e matcher ...`: 4 lines. Three are `pnpm-lock.yaml` entries for `@formatjs/intl-localematcher`. The fourth is `src/middleware.ts:6`. The only `config.matcher` in the repo is the middleware's.
- `... grep -n -F -e "'/message'" -e '"/message"' ...`: 18 lines. These are navigation and `href` strings in app code, plus `src/middleware.ts:6` and `src/__tests__/middleware.request-headers.test.ts:26-27`. None is a matcher reference other than `src/middleware.ts:6`.
- `... grep -n -F -e "'/preview'" -e '"/preview"' ...`: 2 lines. `src/middleware.ts:6` and `src/app/_components/CookieConsent.tsx:18` (`.includes('/preview')`).
- `... grep -n -i -e middleware ...`: 107 lines. Breakdown by reading the output: 89 are `pnpm-lock.yaml` package names; 6 are `src/__tests__/middleware.request-headers.test.ts`; 7 are floating-ui `middleware:` options in `src/components/AnchoredPopover/*`, `src/components/Tooltip.tsx` and `src/components/DiscordMessageEditor/components/ActionsMenu.tsx`; 1 is `src/env.mjs:55` (comment); 1 is `src/middleware.ts:9` (function name); 3 are tRPC middleware in `src/server/api/trpc.ts` (lines 4, 106, 107). No `next.config.js`, `ecosystem.config.json` or `package.json` line names the middleware.
- Readers of the `x-pathname` header: `git -C ... grep -n -F x-pathname SHA -- src` gives `src/app/_navigation/Redirects/Server.tsx:5` (reads it), the test file at lines 15 and 73, the middleware at line 14, and the middleware test. `Server.tsx` is imported only by `src/app/message/layout.tsx:4`. No `/preview` or `/api` file reads `x-pathname`.

Tests exercising the middleware or its matcher (`git grep -c -E '^\s*(it|test)(\.each)?\(' SHA -- <file>`):

- `src/__tests__/middleware.request-headers.test.ts`: 2 call sites (`it.each` at line 25 with 4 rows, `it` at line 38). That is 5 executed cases. The test imports `default` and `config` from `../middleware` and uses `unstable_doesMiddlewareMatch` from `next/experimental/testing/server`. Its paths are `/message`, `/message?guild_id=123`, `/message/m/1/edit`, `/message/f/123`, and `/message/m/1/edit?code=abc`. They exercise only the `/message` and `/message/(.*)` entries. No case exercises `/api/guilds/(.*)` or `/preview`.
- `src/app/_navigation/Redirects/__tests__/Server.session-cookie-redirect.test.ts`: 4 call sites. It does not import the middleware. It sets `x-pathname` on a synthetic request, so it tests a reader, not the matcher.
- Test files matching `git grep -l -i -E 'middleware|x-pathname'`: only the two above.

## 4. Record hits (agent-output, HEAD)

Command: `git -C /usr/local/bin/hooks/agent-output grep -n -F -e 'middleware' -e '/api/guilds' HEAD -- architecture research handoff planning TODO.md closed/`

Result: 50 lines in 12 files. Counted with `grep -c ''` on the saved output. Lines by file (`file:line`):

- `TODO.md`: 198, 200, 202. Lines 198-202 record the dead entry `/api/guilds/(.*)` and say it guards nothing.
- `architecture/system-architecture.md`: 12, 18, 234.
- `architecture/closed/018-next-upgrade-save-size-cap-architecture-findings.md`: 31, 32, 60, 62, 114.
- `handoff/closed/fix-personal-message-access-post-deploy-2026-11-20.md`: 49.
- `handoff/closed/providers-query-params-header-decode-throws-2026-11-08.md`: 4, 6, 16, 17, 24.
- `handoff/closed/v1-guild-messages-endpoints-unauthenticated-2026-08-24.md`: 4, 11, 12, 33, 35, 36, 57, 76, 77, 86, 99, 100, 101, 119, 128.
- `handoff/website-trpc-batch-size-and-deps-review-leftovers-2026-11-20.md`: 4, 6, 28, 30.
- `planning/closed/003-actions-menu-critique-remediation.md`: 67 (floating-ui `middleware`, unrelated).
- `planning/closed/012-message-valid-field.md`: 473.
- `planning/closed/018-next-upgrade-save-size-cap.md`: 395, 583, 584.
- `research/closed/v1-guild-messages-auth-exposure-2026-10-10.md`: 44, 45, 54, 75, 79, 106, 111.
- `research/codebase-bug-evaluation-2026-11-08.md`: 58, 182.

Record statements that disagree with the SHA's file (the record is not changed here):

- Matcher text. `handoff/closed/v1-guild-messages-endpoints-unauthenticated-2026-08-24.md:36` and `research/closed/v1-guild-messages-auth-exposure-2026-10-10.md:54` quote `matcher: ['/message/(.*)', '/api/guilds/(.*)', '/preview']`, with no `/message` entry. At 132a7ab the matcher has four entries, including `/message`. The record quotes an earlier SHA.
- `x-query-params`. `TODO.md`/`architecture/system-architecture.md:234` and `handoff/closed/providers-query-params-header-decode-throws-2026-11-08.md:16` say the middleware writes `x-query-params`. At 132a7ab it does not. `handoff/website-trpc-batch-size-and-deps-review-leftovers-2026-11-20.md:4` records that this write was removed at `76da25c`.
- Last change. `handoff/closed/v1-guild-messages-endpoints-unauthenticated-2026-08-24.md:77` says the last change was 2023-08-22. `git -C /usr/local/bin/hooks/website log -2 --format='%h %cI' 132a7ab6f49d8a85ead507e2221ab3c3a531fd00 -- src/middleware.ts` gives `3d2ceec 2026-11-21T00:07:48Z` and `1acffee 2026-10-10T07:36:32Z`.
- Rewrite target. `research/closed/v1-guild-messages-auth-exposure-2026-10-10.md:45` and `:54` name a rewrite to `https://hooks.gg/404`. No rewrite exists in the current file.
- Dead entry. `handoff/closed/v1-guild-messages-endpoints-unauthenticated-2026-08-24.md:128` (steering's audit at `b96e364`: only `/api/guilds/(.*)` is dead) and `research/codebase-bug-evaluation-2026-11-08.md:182` (`/api/guilds/(.*)` is "a path with no route") agree with this sweep's verdict. `research/closed/v1-guild-messages-auth-exposure-2026-10-10.md:106` does not settle the question; it says the other patterns are "unexamined here".

## 5. What no instrument here sees

- Production requests. No access logs, request logs, or analytics export is in either repo, so it is unknown whether any request has ever reached `/api/guilds/*` or `/message/*`.
- Which build serves production. `ecosystem.config.json` runs Next under pm2 in cluster mode (`script: node_modules/next/dist/bin/next`). The records say Vercel fronts DNS. The deployed revision was not checked against 132a7ab.
- Next's matcher and redirect semantics. Nothing was executed. `unstable_doesMiddlewareMatch` in the test file was not run, and no install was made. The verdicts are read from the strings alone.
- Edge and host configuration outside the repo: Vercel dashboard rewrites, redirects, firewall rules, CDN rules, any proxy in front of pm2.
- Callers outside this workspace. Statbot's calls are in the statbot repositories, not here.
- Files not tracked at origin/master. `git ls-tree` lists tracked files only. Gitignored or build-generated route files would not appear.
- The working tree, which is on another chain's branch. It was not read.
