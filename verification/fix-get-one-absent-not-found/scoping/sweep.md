# Scope sweep: getOne absent number, not-found header

Ref: website `origin/master` = b82931402f416e850a785468f9443fa3eadfae44 (`git -C website rev-parse origin/master`). All website reads are `git show` / `git grep` at that ref.

## P1: `instanceof` against a package class on a query error

Command: `git -C website grep -n instanceof origin/master -- src`, test paths removed. 21 non-test hits.

| Site | Class (from) | Raiser | HAS P1? |
|---|---|---|---|
| src/server/api/routers/message.ts:36-41 (`asNotFound`, line 40 `error instanceof refusal`; call at :74 `asNotFound(NoResultError)`) | `NoResultError` (`import { NoResultError } from 'kysely'`, :4) | `getMessage` (src/server/api/utils/shared.ts:151) runs on `getPostgres()` from project-utils (`import` at shared.ts:4) | **YES.** Established by the record, not re-read by me: kysely 0.26.1 sends `import` to dist/esm and `require` to dist/cjs, and project-utils `dist/postgres.js` `require`s it. `kysely-dual-class-check.out` (read here) gives `sameClass:false`, `cjsErrorInstanceofEsmClass:false`, positive control true. Production confirmed (500 "no result"). |
| message.ts:39 `error instanceof TRPCError && code===refusal` | `TRPCError` (@trpc/server) | thrown by website code (`authorizeGuildUser`, `authorizeUser`) in the same bundle | no. Same import on both sides. |
| src/server/api/utils/guild.ts:17, :80 `instanceof TRPCError` | `TRPCError` | website code | no. Same reason. |
| src/pages/api/messages/codes/[code].ts:23, pages/api/v1/guilds/[guildId]/messages.ts:46, .../messages/[id].ts:48, NewMessageJsonInput.tsx:113, JsonModalBody.tsx:160 `instanceof z.ZodError` | `ZodError` (zod) | website's own `.parse` of its schemas | no. Raiser is the website's zod import. Cannot tell if project-utils throws ZodError into these paths; I did not read it. |
| src/kysely-adapter/index.ts:208 `adapter instanceof SqliteAdapter` | `SqliteAdapter` (kysely, ESM import) | not an error; a dialect-type test | no for "error". Side note: if `adapter` comes from CJS kysely (auth.ts uses `getPostgres`), the test is always false, which is harmless for postgres. |
| the rest (Node, HTMLElement, URL, Function, Error, Deferred, StopChecking, ExtendedMap) | built-ins or website-local | n/a | no |

So the single site with P1 is message.ts `asNotFound(NoResultError)` at :36-41 and :74. `asNotFound` is used with string codes at :76 and :78, which are `TRPCError` checks and are unaffected.

Other non-`instanceof` error checks on `getMessage`: message.ts:223 `await getMessage(input.id)` and shared.ts:290 `getMessage(id)` call it with no catch mapping (not P1, but those callers still see the raw NoResultError, which matters if a fix changes `getMessage`).

## P2: header controls on a page with no message

Property HAS: **yes on /edit, no on /send.**

- Layout renders the header unconditionally: `src/app/message/m/[id]/layout.tsx` has `<MessageProvider><Navigation key="navigation" />{children}</MessageProvider>`.
- That default export is `Header` in `src/app/message/m/[id]/_layout/Navigation.tsx:418-429`:
  ```
  const Header = memo(() => {
    const path = usePathname() ?? '';
    if (/^\/message\/m\/[a-z0-9-]+\/edit$/.test(path)) { return <Navigation />; }
    return null;
  });
  ```
  The decision is by pathname only. `isNotFound` is not read anywhere in this file (`git grep -n isNotFound` against it gives no hit).
- `Navigation` (:77) reads `useMessage()` with no not-found branch. Name `TextField` aria-label 'Message Name', placeholder 'New Message', `value={message?.name ?? ' '}` at :274-283. Send link `href=/message/m/${message?.id ?? 0}/send` at :174 and :208. The File/Edit/View/Help menu is in the same component. So at `/message/m/<id>/edit`, `MessageNotFound` (edit/page.tsx:132 `if (isNotFound) return <MessageNotFound />`) sits below a header that has no message.
- `/send`: path does not match `/edit$`, so the header is `null`. send/page.tsx:114 also renders `MessageNotFound`. No header there.
- `MessageNotFound`: src/app/message/m/[id]/_components/MessageNotFound.tsx:7-18, `Container` + text + "Back to your messages" link to `/message`.
- The outer `/message` layout (src/app/message/layout.tsx, `_layout/Navigation.tsx`) also renders, which is the site-wide bar and is separate from the editor header. I did not read what it shows.

## Identifiers a fix would touch (origin/master)

- `asNotFound`: message.ts:36 (def), :74, :76, :78.
- `NoResultError`: message.ts:4 (import), :36 (type), :74. Nothing else in src.
- `getMessage`: shared.ts:151 (def), :290; message.ts:15 (import), :74, :223; MessageProvider/index.tsx:36 is an unrelated local `getMessage`.
- `MessageNotFound`: _components/MessageNotFound.tsx; edit/page.tsx:11,132; send/page.tsx:12,114.
- Header: m/[id]/_layout/Navigation.tsx (Header :418-429; Navigation :77); mounted at m/[id]/layout.tsx.

## Record read

- Both handoffs read whole. Seeded fix constraint in get-one-absent-number-still-500: do not depend on class identity; options are `name === 'NoResultError'` or `executeTakeFirst` in getOne's own path; the red test must throw from CJS kysely (`require('kysely')`). Escaped defect, so a bug-form test with `// escaped:` naming that handoff is earned. Lower weight: the header on the not-found page is product copy needing the owner's word.
- Probe: `verification/fix-recent-message-ids/code-review/run-probe.sh <sha> <port> <work-dir> <out-dir>` exports one website commit with `git archive`, symlinks website node_modules, copies `recent.pg.test.ts` into `src/server/__tests__/`, starts `postgres:16` in docker, applies `verification/fix-personal-message-access/pg/schema-749606d.sql`, and runs `npx vitest run --project node`. `recent.pg.test.ts` does `import { getPostgres } from 'project-utils'` (line 2) with `const db = () => getPostgres()` (line 42) and does NOT mock project-utils, so it uses the real getPostgres, hence the CJS-loaded kysely. It uses `DATABASE_URL`, plants rows with ids `9000000000001xx`, and an absent id `900000000000199`. Reusable for a red test: copy the harness, swap the test body for `messageRouter.createCaller(...).getOne(<absent id>)` with the auth mocks from message.get-one-not-found.test.ts (mocks for `~/server/auth`, redis, pusher, env). Not run by me. Caveat: that test file mocks `~/utils/redis` for the account/guilds, which the new test would also need.

## Covering tests (origin/master)

- getOne absent number: `src/server/api/routers/__tests__/message.get-one-not-found.test.ts` uses `ABSENT_ID` (:`900000000000500`) and `vi.mock('project-utils', () => ({ getPostgres: () => mocks.db }))` at :28 with `createCapturingDatabase` (ESM kysely), so the thrown error and the checked class are one class. This is the gap, and it is why the test stays green on the defect. Same mock pattern in `message.personal-ownership.test.ts` and `MessageNotFound.edit-and-send-pages.test.tsx:36` (uses a real HTTP server plus the same mock).
- Not-found page: `src/app/message/m/[id]/_components/__tests__/MessageNotFound.edit-and-send-pages.test.tsx` mounts EditPage and SendPage (not the layout or Header). Nothing found that mounts the editor `Header`/`Navigation` with a not-found message. `git grep` for tests of the m/[id] `_layout/Navigation` found none (the Header test found is for the outer `/message/_layout/Header`).

## Not covered / not completed

- One command was not completed: the read of the installed packages' `exports` map and `project-utils`' postgres file (the kysely and project-utils package.json and dist files). So the ESM/CJS claim in P1 rests on the existing handoff and `kysely-dual-class-check.out`, not on my own read of those files. I did not re-run `kysely-dual-class-check.mjs`.
- Whether project-utils can throw ZodError or TRPCError into the website sites above.
- Bodies of the outer `/message` Header and Navigation; the send page's own title/controls (`SendMenuTitle`, `EditMessageMenu`); how `isNotFound` is set in MessageProvider; `retryUnlessRefused`.
- I did not run any tests or the probe.
