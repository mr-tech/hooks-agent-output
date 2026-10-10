---
ID: n/a
Origin: fix-v1-guild-messages-auth
UUID: 9c90dfa0
Status: Committed
Status-Detail: "Committed for release on website fix/v1-guild-messages-auth at ddbd750 (devops Stage 1, 2026-10-10). The owner's key check returned 'match'. Release (merge to master, push) awaits the owner's approval."
Handoff-At: ddbd750c1ab4808317f3408524cf5f9b7d8d0935 — QAF-1 test-only commit; production files last changed at 7606149 (round 3); round 2 c8c3d70, round 1 1acffee
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

**Rider (round 2).** Rulings block "2026-10-10 — rider: 400 with no `.end()` (by selection) — SCOPE
DELTA": the scope now also covers the ZodError → 400 path in the same two handlers, plus its test.
Nothing else is added.

**Rider 2 (round 3).** Rulings block "2026-10-10 — rider 2: `messages/codes/[code].ts` 400 with no
`.end()` (by selection) — SCOPE DELTA" adds that one handler's ZodError → 400 path, plus its test. The
owner chose the rider option, whose text named it a fixer round. Steering records that selection as
his "continue as fixer" for this third round.

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

## Round 2 — the malformed-query 400 completes

**Diagnosis.** In both handlers the `catch` returned `res.status(400)` for a `ZodError`. That sets the
status but never sends the response.

Instruments:
- A read at `1acffee`.
- The red run below: `ended` stays false.
- HTTP, executed, keyed (the 401 guard runs first): `next dev --webpack -p 3917` ran from an isolated
  worktree at `1acffee`, with no `.env*`, `STATBOT_API_KEY=probe-key` and the dead `DATABASE_URL`. All
  five malformed requests hit curl's `--max-time 15` limit: status `000`, curl exit 28. Next logged
  `API resolved without sending a response … this may result in stalled requests`. Capture:
  `http-malformed-1acffee.txt`, driver `probe-malformed.sh <label>`.

**Change.**
- `messages.ts` and `messages/[id].ts`: `return res.status(400).end();`. One line each, and the
  response stays empty.
- `src/server/api/v1/__tests__/helpers/apiResponse.ts` (new): the `makeRes` response double. The new
  test would have been its third copy, so it is lifted under the workspace's helper policy. It now
  records `ended`, set by `end()` and by `json()`.
- `guildMessages.statbot-key-required.test.ts` and `guildMessages.valid-exposure.test.ts`: the local
  `makeRes` copies are replaced by the helper import. Their assertions are unchanged.
- `src/server/api/v1/__tests__/guildMessages.malformed-query.test.ts` (new), spec-form, keyed. Each
  case asserts status `400`, `ended === true`, and that the database was never read. There are 5 cases:
  - list: a non-snowflake guild id;
  - list: an unexpected query key;
  - single: a non-snowflake guild id;
  - single: a non-numeric message id;
  - single: an unexpected query key.

**Test.** `DATABASE_URL` on the dead port throughout. Counts come from the vitest JSON reporter.

| Run | Tree | Result | Exit | Capture |
|---|---|---|---|---|
| Red | `1acffee` handlers, round-2 tests (shared tree before the source edit) | 29 total, 24 pass, 5 fail. All 5 fail on `expected false to be true` (`ended`); the 24 round-1 cases pass on the lifted helper | 1 | `round2-red-1acffee.json` |
| Green | fix (isolated worktree) | 29 total, 29 pass, 3 files | 0 | `round2-green.json` |

The red run covers each handler's 400 path separately, since cases for both endpoints fail. That makes
a separate per-handler mutant redundant.

**HTTP after the fix.** These ran on the same server at `1acffee` after the two fixed handlers were
copied in, which the dev server hot-reloaded.

| Tree | Malformed keyed requests (5) | Capture |
|---|---|---|
| `1acffee` | all `000`, curl exit 28 at 15 s (hung) | `http-malformed-1acffee.txt` |
| fix | all `400`, curl exit 0, in 5–74 ms | `http-malformed-fix.txt` |

The round-1 auth probe, re-run on the same server after the fix, matches round 1 (`http-fix-round2.txt`):
- no header, wrong bearer, empty bearer and POST: `401`;
- the correct bearer: `500` from the dead database.

**Verification.**
- Full suite in the shared tree at the fix: 589 total, 589 pass, 53 files, exit 0
  (`round2-suite-head.json`). The extra 5 cases and 1 file over round 1 are the new test.
- `pnpm run typecheck`, both programs, in the isolated tree with no `.next`: exit 0
  (`round2-typecheck-isolated.txt`).
- ESLint with `--max-warnings=0` on both handlers, the helper and the two auth and malformed-query tests:
  no issues, exit 0.
- `guildMessages.valid-exposure.test.ts`: 5 lint problems, down from 10 in round 1. All 5 are on lines
  this change did not touch (`round2-eslint-valid-exposure.txt`).
- Comment gate `--since=f2c85f5`: clean.
- ID-token check on the two new files: 0.
- The worktree was removed, and the server was stopped by its listening PID.

**Process fact.** The round-2 additions to this record were first written with an in-place Python
script. The lifecycle skill says that under auto mode a record document is written with the
file-editing tools only, so that was a breach of form. I checked the content: every round-2 anchor is
present (`grep -c c8c3d70` returns 4), and `check-repo.js` reports no failure for this file. This
note was added with the Edit tool.

**User-visible flow.** A caller with the key who sends a malformed guild or message id now gets an
immediate `400` with an empty body, where the request used to stall until the client gave up.

## Round 3 — the message-code 400 completes

**What this round discharges.** Code review CR-2 (`code-review/fix-v1-guild-messages-auth-code-review.md`,
verdict APPROVED_WITH_COMMENTS at `c8c3d70`). That is the same defect as item 1 of
`handoff/website-api-handler-hardening-2026-10-10.md` (b1fdd41a). That handoff belongs to another stage
and this round does not edit it. CR-1 is routed to QA and is not acted on here.

**Diagnosis.** In `src/pages/api/messages/codes/[code].ts` (`handler`, the `catch`), a `ZodError`
returned `res.status(400)` without sending the response. `queryShape` is `.strict()`, so any extra
query key takes this path. The route has no authentication, so any caller can reach it.

Instruments:
- A read at `c8c3d70`.
- The red run below: `ended` stays false.
- HTTP, executed: `next dev --webpack -p 3917` ran from an isolated worktree at `c8c3d70`, with no
  `.env*`, the dead `DATABASE_URL`, and Redis fenced to `REDISHOST=127.0.0.1 REDISPORT=1`. The Redis
  client is created lazily, by `getClient()` inside `messageStore` (`src/utils/redis/client.ts`, read).
  Both malformed requests timed out at 15 s: status `000`, curl exit 28. Next logged `API resolved
  without sending a response … stalled requests`. Capture: `http-codes-malformed-c8c3d70.txt`, driver
  `probe-codes-malformed.sh <label>`.

**Change.**
- `src/pages/api/messages/codes/[code].ts`: `return res.status(400).end();`. One line, and the response
  stays empty.
- `src/server/api/messages/__tests__/messageCodes.malformed-query.test.ts` (new), spec-form. It mocks
  `~/utils/redis/messageStore` and reuses the round-2 helper from `../../v1/__tests__/helpers/`. Each
  case asserts status `400`, `ended === true`, and that `retrieve` was never called. The cases are an
  unexpected query key, a repeated `code` parameter, and no `code`.
- No test existed for this handler before. A `__tests__` folder under `src/pages/api` would itself be
  served as a route, so the test lives under `src/server/api/messages/`, following the v1 tests'
  existing placement.

**Test.** `DATABASE_URL` and Redis on dead ports throughout. Counts come from the vitest JSON reporter.

| Run | Tree | Result | Exit | Capture |
|---|---|---|---|---|
| Red | `c8c3d70` handler, new test (shared tree before the source edit) | 3 total, 0 pass, 3 fail. All fail on `expected false to be true` (`ended`) | 1 | `round3-red-c8c3d70.json` |
| Green | fix (isolated worktree), all of `src/server/api/` | 102 total, 102 pass, 8 files | 0 | `round3-green.json` |

**HTTP after the fix.** Same server; the fixed handler was copied in and hot-reloaded.

| Tree | `?extra=1` | `?extra=1&more=2` | Well-formed `abc123` | Capture |
|---|---|---|---|---|
| `c8c3d70` | `000`, curl exit 28 at 15 s (hung) | `000`, curl exit 28 at 15 s (hung) | not run | `http-codes-malformed-c8c3d70.txt` |
| fix | `400` in 25 ms, curl exit 0 | `400` in 5 ms, curl exit 0 | `500` after 10.6 s: past the parse, then the fenced Redis | `http-codes-malformed-fix.txt` |

**Verification.**
- Full suite in the shared tree at the fix: 592 total, 592 pass, 54 files, exit 0
  (`round3-suite-head.json`). The extra 3 cases and 1 file over round 2 are the new test.
- `pnpm run typecheck`, both programs, in the isolated tree with no `.next`: exit 0
  (`round3-typecheck-isolated.txt`).
- ESLint with `--max-warnings=0` on the handler and the new test: no issues, exit 0.
- Comment gate `--since=f2c85f5`: clean, 3 tracked files, exit 0.
- ID-token check on the new test: 0.
- The worktree was removed, and the server was stopped by its listening PID.

**Helper placement.** The helper is now used from two sibling test directories, `v1` and `messages`.
Under the helper policy's "nearest to its callers", its natural home would be
`src/server/api/__tests__/helpers/`. Moving it would touch the round-1 and round-2 tests, which rider 2
did not cover, so I left it in place for code review to weigh.

**User-visible flow.** A request to `/api/messages/codes/<code>` with stray query parameters now gets
an immediate `400`, where it used to stall. I did not establish which product flow calls this route.

**Fix rounds: 3.** This is the third round on this fix (round 1 the defect; round 2 rider 1; round 3
rider 2). Per the rulings block, the owner's rider selection is recorded as his "continue as fixer".

## QAF-1 landed (QA's test-only patch)

**Source.** QAF-1 in `qa/fix-v1-guild-messages-auth-qa.md`. The patch is
`verification/fix-v1-guild-messages-auth/qa-cr1-ended-assertion.patch`, written against `7606149`. Steering
relayed it as within the existing scope (tests of the two v1 handlers). QA's discharge condition: the
committed file's blob equals the patched file's, and the commit touches nothing else.

**The expected blob.** The QA document names no hash for the patched file; it states the equality in prose
only. So I derived the expected blob independently:
- `git show 7606149:<file>` written to an isolated scratch directory;
- `patch -p1` applied there (the dry run was clean);
- `git hash-object` of the result = `7dcbfa69ca1e49c5b690dbe43de9549438630548`.

Before applying, the shared tree's file equalled the `7606149` blob (`a53ce18…`), so no foreign edit
was present.

**Applied and committed.**
- `git apply --check`, then `git apply`, in the shared tree. The diff was 6 insertions, 0 deletions.
- Committed with `git commit --only` on that one path: website `ddbd750`.

**Checks.**

| Check | Result |
|---|---|
| `git rev-parse ddbd750:src/server/api/v1/__tests__/guildMessages.statbot-key-required.test.ts` | `7dcbfa69ca1e49c5b690dbe43de9549438630548`, equal to the expected blob |
| `git diff-tree --name-only -r ddbd750` | exactly that one path |
| The patched file, vitest JSON (`qaf1-landed-green.json`) | 24 total, 24 pass, exit 0. This matches QA's own 24/24 at `7606149` |

No production file changed, so by the QA document's own terms the QA verdict at `7606149` does not
expire.

## Found on the way, not absorbed

- **The 400 with no `.end()`.** Reported in round 1, then taken into scope by the owner's rider and
  fixed in round 2 (below).
- **Middleware matcher, not audited** (the brief said note, don't fix): whether `/message/(.*)`,
  `/api/guilds/(.*)` and `/preview` still match real routes, and whether any route relies on the
  matcher for authorization. Removing the `/api/v1/*` branch changes nothing for those routes.
- Next 16 warns at dev start that the `middleware` file convention is deprecated in favour of `proxy`.
- The guard compares with `!==`, the same as the old middleware, not a constant-time comparison.
  Left to code review.
- The `makeRes` double existed in two test files after round 1. Round 2 needed a third copy, so it
  was lifted into the helper (round 2).

## Handoff

- **SHA:** `website` `7606149` on `fix/v1-guild-messages-auth`. Round 1 is `1acffee`, round 2 is
  `c8c3d70`, and round 3 is `7606149`.
- **Reviews:** code-reviewer re-runs at `7606149` (the round-3 delta is `c8c3d70..7606149`; the whole
  fix is `f2c85f5..7606149`), then QA Phase 2. Both use `--chain fix-v1-guild-messages-auth`.
- **Merges:** devops at release, under the owner's approval. The release is held until the owner's
  key check (OWNER-QUEUE "Check that Statbot's hooks.gg key matches the website's") returns "match".
  Nothing has been pushed.

## Changelog

| Date | Agent | Change | Status |
|---|---|---|---|
| 2026-10-10T07:36 | fixer | Fix committed at website `1acffee` (commit time 07:36:32Z); document created; handed to code review | Committed |
| 2026-10-10T07:45 | fixer | Round 2 (owner rider, 400 with no `.end()`) committed at website `c8c3d70`; Handoff-At re-anchored | Committed |
| 2026-10-10T08:05 | fixer | Round 3 (owner rider 2, CR-2 / hardening handoff item 1) committed at website `7606149`; Handoff-At re-anchored | Committed |
| 2026-10-10T08:23 | fixer | QAF-1 patch landed at website `ddbd750` (commit time 08:23:31Z); blob `7dcbfa69` matches the expected blob; Handoff-At re-anchored | Committed |
| 2026-10-10T15:47 | devops (Stage 1) | Document closed. Status-Detail brought into agreement with the Stage 1 commit (`deployment/fix-v1-guild-messages-auth-deployment.md`) | Committed |
