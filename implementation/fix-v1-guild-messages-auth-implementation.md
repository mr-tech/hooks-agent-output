---
ID: n/a
Origin: fix-v1-guild-messages-auth
UUID: 9c90dfa0
Status: Committed
Status-Detail: "Fix committed on fix/v1-guild-messages-auth; awaiting code review at Handoff-At, then QA Phase 2. No deploy or push until the owner's key check (OWNER-QUEUE) returns 'match' (rulings, fix-route block)."
Handoff-At: 1acffee3e53b9580bfedd2dfb9e7094670bba1cb
---

# Fix — v1 guild-messages endpoints require the Statbot key

## Scope statement

The owner's selection, recorded in `agent-output/steering/v1-guild-messages-auth-rulings.md`, block
"2026-10-10 — fix route: Fixer (by selection)". Route: Fixer, chosen by selection. Scope: one defect,
the unauthenticated v1 guild-messages endpoints. Files: `src/middleware.ts`,
`src/pages/api/v1/guilds/[guildId]/messages.ts`, `.../messages/[id].ts`, plus their tests. `website`
only, no other repo. No deploy or push until the owner's key check (OWNER-QUEUE) returns "match".

Guidance from the brief (steering's, not my definition's): fail closed when `STATBOT_API_KEY` is unset
or empty; the accepted form stays exactly `Authorization: Bearer <key>`; no server or DB-touching path
may reach a real database; do not read `website/.env.local`.

## Entry Conditions

| Condition | State | Evidence |
|---|---|---|
| Scoping determination | Present | Rulings file block "2026-10-10 — fix route: Fixer (by selection)", read in full at session start |
| Bounded scope statement | Present | Same block (quoted above) |
| Fix branch | `fix/v1-guild-messages-auth` at `f2c85f5`, checked out by steering | `git -C website branch --show-current`, `git rev-parse HEAD` = `f2c85f5c7e…`, `git status --short` empty at start |

## Diagnosis

**Cause.** Two independent defects, each masking the other (re-derived from the handoff
`handoff/v1-guild-messages-endpoints-unauthenticated-2026-08-24.md`, 8818bd89):

1. `src/middleware.ts` `config.matcher` is `['/message/(.*)', '/api/guilds/(.*)', '/preview']`, which
   does not cover `/api/v1/…`.
2. The middleware predicate is `url.pathname.startsWith('/api/v1/*')`, a literal asterisk that no
   real path carries.

Neither handler has any check of its own (both read at `f2c85f5`).

**Instruments and output.**
- A read of the code path at `f2c85f5`: `src/middleware.ts`, and both handlers' `handler` functions.
- Unit, red run below: at `f2c85f5`, requests with no credential get `200` from the handler with
  rows (list and single), and an unauthenticated POST gets `405` from the handler's method check.
- HTTP control, executed: `next dev` on `f2c85f5`'s handlers and middleware (isolated worktree, dead
  `DATABASE_URL`). No header, a wrong bearer and an empty bearer all returned `500`: the handler ran
  and failed on the dead database. POST returned `405`. Capture:
  `verification/fix-v1-guild-messages-auth/http-f2c85f5.txt`.

Production exposure was established separately, by `research/closed/v1-guild-messages-auth-exposure-2026-10-10.md`
(one unauthenticated GET to hooks.gg returned the handler's 200). It is not re-derived here.

## Change

The fix authenticates in the handlers, the shape the handoff states. Path-pattern authorization
fails open on any route left out of the matcher, which is how this defect arose.

- `src/pages/api/v1/guilds/[guildId]/messages.ts`: first statement reads `process.env.STATBOT_API_KEY`
  at request time and returns `401` with an empty body unless the key is non-empty and
  `req.headers.authorization === \`Bearer ${key}\``. This runs before the method check.
- `src/pages/api/v1/guilds/[guildId]/messages/[id].ts`: the same two lines.
- `src/middleware.ts`: removed the unreachable `/api/v1/*` branch and its module-scope
  `STATBOT_API_KEY`. No runtime effect: the matcher never admitted `/api/v1`, and the predicate needed
  a literal `*`. It is removed because a dead branch that reads as a guard is exactly the masking
  hazard 8818bd89 names. The matcher and the header-forwarding logic are unchanged.
- `src/server/api/v1/__tests__/guildMessages.statbot-key-required.test.ts` (new): the spec-form test.
  The existing test on this surface is `guildMessages.valid-exposure.test.ts`, which specifies the
  `valid` field's serialization. That is a different behaviour, so the auth cases have their own
  file, named for their own behaviour. The existing file was tightened only as far as the next line.
- `src/server/api/v1/__tests__/guildMessages.valid-exposure.test.ts`: now stubs `STATBOT_API_KEY` and
  sends `Bearer <key>`. Its cases call the handler, which now requires the key; the assertions are
  unchanged.

**Why the guard is two inline lines and not a shared `requireStatbotAuth`.** A shared helper needs a
new module (for example `src/server/api/utils/`), which is outside the scope statement's file list.
Two copies of a two-line check are below the workspace's third-duplicate lift rule. A third v1 route
should lift it.

**Status code.** `401` with an empty body. Statbot's client is axios
(`statbot-utils/src/api/ApiUtils.ts`, read: the hooks.gg instance is built with
`Authorization: Bearer ${apiKey}`). Axios rejects on any non-2xx status, so the code choice does not
change client behaviour. The middleware's former intent was a rewrite to `https://hooks.gg/404`.

**Declined work.** A refused request is answered `401` to its caller and nothing is queued; a retry
is the caller's. The change adds no lifetime (no lock, slot, listener or timer), so it needs no exit
enumeration.

## Test

`DATABASE_URL=postgres://u:p@127.0.0.1:1/none` for every run. Captures are under
`agent-output/verification/fix-v1-guild-messages-auth/`. Counts come from the vitest JSON reporter
(`numTotalTests`, `numPassedTests`, `numFailedTests`, `testResults.length`), read with `node`.

The new test file has 18 executed cases, 9 per endpoint via `describe.each`:
- five refusals, each `401`, no body, and `getPostgres` never called: no header; a wrong bearer;
  `Bearer ` (empty); the bare key with no scheme; and `Basic <key>`;
- an unauthenticated POST gets `401`, before the method check;
- exactly `Bearer <key>` gets `200`, and the database is read;
- fail closed: server key unset with `Bearer undefined`, and server key empty with `Bearer `, both `401`.

| Run | Tree | Command | Result | Exit | Capture |
|---|---|---|---|---|---|
| Red | `f2c85f5` handlers and middleware, final test file (isolated worktree) | `npx vitest run <new test> --reporter=json` | 18 total, 2 pass, 16 fail | 1 | `red-f2c85f5.json` |
| Green | fix (isolated worktree) | `npx vitest run src/server/api/v1/__tests__/` | 24 total, 24 pass | 0 | `green-target.json` |

In the red run, the 16 failures are `expected 200 to be 401` and `expected 405 to be 401`. The 2 that
pass are the accepted-form cases, which pass both before and after the fix by design.

Mutants, each run in the isolated worktree and then restored:

| Mutant | Cases killed | Exit | Capture |
|---|---|---|---|
| Fail-closed removed (`!key \|\|` deleted from both handlers) | 4: unset and empty, for both endpoints | 1 | `mutant-no-fail-closed.json` |
| Guard removed from the single handler only | 8: every refusal case for single | 1 | `mutant-single-unguarded.json` |
| Restored | none, 24/24 pass | 0 | `restored-isolated.json` |

**Executed HTTP check**, as 8818bd89 requires. `next dev --webpack -p 3917` ran from an isolated
worktree with no `.env*` file, `STATBOT_API_KEY=probe-key`, and the dead `DATABASE_URL`. The driver
is `probe-http.sh <label>`, using curl.

| Tree | No header | Wrong | Empty | POST | `Bearer probe-key` | Capture |
|---|---|---|---|---|---|---|
| fix | 401 | 401 | 401 | 401 | 500 (guard passed; dead DB) | `http-fix.txt` |
| `f2c85f5` (control) | 500 | 500 | 500 | 405 | 500 | `http-f2c85f5.txt` |

Both endpoints gave the same results.

With the server key unset (server restarted with no `STATBOT_API_KEY`), `Bearer undefined`,
`Bearer ` and `Bearer probe-key` all returned `401` on both endpoints (`http-fix-key-unset.txt`).

## Verification

| Check | Tree | Result | Exit | Capture |
|---|---|---|---|---|
| Full suite, baseline | `f2c85f5` (isolated) | 566 total, 566 pass, 51 files | 0 | `suite-f2c85f5.json` |
| Full suite, fix | shared tree at the fix (committed as `1acffee`) | 584 total, 584 pass, 52 files | 0 | `suite-head.json` |
| `pnpm run typecheck` (both tsc programs), baseline | `f2c85f5` (isolated, no `.next`) | clean | 0 | `typecheck-f2c85f5-isolated.txt` |
| `pnpm run typecheck`, fix | fix (isolated, no `.next`) | clean | 0 | `typecheck-fix-isolated.txt` |
| `pnpm run typecheck` in the shared tree | at the fix | 2 errors, both in gitignored `.next/dev/types/validator.ts` (truncated generated file) | 2 | `typecheck-head.txt` |
| ESLint, `--max-warnings=0` on the 3 source files and the new test | at the fix | no issues | 0 | (console) |
| ESLint on `guildMessages.valid-exposure.test.ts` | baseline / fix | 12 problems / 10 problems, all on lines this change did not touch | 1 | `eslint-valid-exposure-f2c85f5.txt`, `eslint-head.txt` |
| Comment gate (`--since=f2c85f5 --gate`) | `1acffee` | clean | 0 | (console) |
| ID-token check on the new test (`grep -ciE` over the CLAUDE.md class) | `1acffee` | 0 | 0 | (console) |

The +18 cases and +1 file between the two suite runs are the new test file.

No package-manager operation ran, so no lockfile moved. The workspace `CLAUDE.md` names no
pinned-build verification for `website`.

**Process facts, recorded this round.**
- The ESLint gate fired on the first draft of the new test (member delimiters, object-curly-newline,
  an `any` from a dynamic import). I satisfied it by changing the test's own shape: an interface for
  the response double and a typed import. I did not use `--fix` on any shared file.
- Turbopack refused the worktree's `node_modules` symlink ("points out of the filesystem root"), so
  the HTTP check ran under `next dev --webpack`. The guard is handler code and does not depend on the
  bundler.
- `pkill -f 'next dev --webpack -p 3917'` matched its own shell and exited 144. The server was
  stopped (port free); the later stop used the listening PID from `ss -ltnp`.
- The shared tree's `.next/dev/types/validator.ts` is corrupt. It is gitignored, probably another
  session's dev server output, and I left it as it is. That is why typecheck ran in isolated trees.

## User-visible flows

- Statbot fetching a guild's hooks.gg messages (list, and one message by id) with its key: unchanged
  when Statbot's key equals the website's `STATBOT_API_KEY`. It fails with 401 if the keys differ, or
  if the deployed environment has no `STATBOT_API_KEY`. That is why the owner's key check gates the
  deploy.
- Anyone else calling `/api/v1/guilds/<id>/messages[/<id>]`: now gets `401` and no rows.

## Found on the way, not absorbed

- **Second defect, out of scope.** Both handlers' `ZodError` branch is `return res.status(400)`, with
  no `.end()` or `.json()`, so a malformed `guildId` or `id` never completes the response (read at
  `f2c85f5`; also noted in the exposure research, F2). A re-scope is steering's call.
- **Middleware matcher, not audited** (the brief said note, don't fix): whether `/message/(.*)`,
  `/api/guilds/(.*)` and `/preview` still match real routes, and whether any route relies on the
  matcher for authorization. Removing the `/api/v1/*` branch changes nothing for those routes.
- Next 16 warns at dev start that the `middleware` file convention is deprecated in favour of `proxy`.
- The guard compares with `!==`, the same as the old middleware, not a constant-time comparison.
  Left to code review.
- The `makeRes` double now exists in two test files. A third copy should lift it into
  `src/server/api/v1/__tests__/helpers/`.

## Handoff

- **SHA:** `website` `1acffee` on `fix/v1-guild-messages-auth`.
- **Reviews:** code-reviewer, verdict at `1acffee`, then QA Phase 2. Both use `--chain fix-v1-guild-messages-auth`.
- **Merges:** devops at release, under the owner's approval. The release is held until the owner's
  key check (OWNER-QUEUE "Check that Statbot's hooks.gg key matches the website's") returns "match".
  Nothing has been pushed.

## Changelog

| Date | Agent | Change | Status |
|---|---|---|---|
| 2026-10-10T07:36 | fixer | Fix committed at website `1acffee` (commit time 07:36:32Z); document created; handed to code review | Committed |
