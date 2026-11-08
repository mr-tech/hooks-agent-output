---
ID: 015
Origin: 015
UUID: 861e5f61
Status: Active
Status-Detail: "M1 (F-1 to F-11) delivered and committed on website chain/015-bug-evaluation-fixes; awaiting code review. Three plan-premise differences are declared in Outstanding Items (M1-c missing account, M1-f, M1-h) for the planner's confirmation; none blocks review. M2 onward is not started."
Handoff-At: "be881c9 — repos=website"
---

# Implementation 015 — M1 (server and data path)

## Plan Reference

`agent-output/planning/015-bug-evaluation-fixes.md`, rev 8 (`1f7715b`), § M1. QA Phase 1: `qa/015-bug-evaluation-fixes-qa.md` (`c2a657a`). M0 is delivered separately (`implementation/015-bug-evaluation-fixes-m0-implementation.md`, website `037935d`, code review APPROVED_WITH_COMMENTS, QA Phase 2 PASS).

## Date

2026-11-08

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-08T06:20 | steering-hooks-015 → implementer-hooks-015 (brief) | Implement M1 | M1-a to M1-k delivered at website `be881c9`. CR-1 (M0 path list) closed at `96e123d`. QAF-11 (flaky wait in `SectionEditor.auto-remove-dispatch.test.tsx`) fixed at `9e4955a`. The M1-c no-account and ordering cells were held until steering lifted the hold (rev 8's gates passed: critic `f64ae27`, architect `ca8da09`, QA `c2a657a`); they are built to rev 8's text. |

## Implementation Summary

Eleven server and data-path defects are fixed at their sites, each with a red test first:

- **F-2** — four `in` predicates no longer compile `in ()` for an empty list. A user who administers no server can open the message list.
- **F-1** — the cron selection tests `error is null`.
- **F-3** — sign-out sends Discord a revoke request that carries the account's token. A failed revoke or a missing account no longer prevents the clear-out.
- **F-4** — the 1001st new message is refused.
- **F-5 to F-11** — the id pattern is anchored, `NODE_ENV` is exempt from the client guard while server keys are refused, the signature is checked before the body is parsed, the guild and message fetches are paired, the cookie parser keeps `=` in values, a cached `null` is a hit, and the CDN URL has the port before `/dev`.

Value delivered: what the user builds and the account they sign in with behave as the plan's Value Statement says on the server side. The UAT walks B-1 (message list, no server) and B-7 depend on F-2.

## Milestones Completed

M1-a to M1-k (all). M1-c's no-account and ordering cells included.

## Entry Conditions

| Condition | Where satisfied | Pinned by |
|---|---|---|
| Stage start for M1 | Same start as M0 (rulings block "implementation start recorded", `7efd8b0`), on plan rev 7. Plan then moved to rev 8 | Not a test |
| Hold on M1-c's no-account and ordering cells | Lifted by steering's message (all three gates passed rev 8's delta). The critic's message (`f64ae27`) arrived first; I waited for the holder's own message, as the hold was steering's. Built to rev 8's text (§ M1-c) | `auth.sign-out.test.ts` cells below |
| E-5: no test reaches the network; `fetch` and `sendWebhook` stubbed | `fetch` stubbed by `vi.stubGlobal` in `auth.sign-out.test.ts`, `shared.message-cap.test.ts`; no real Redis or Postgres in any new test | The tests themselves; the suite runs without `.env` |
| E-6: every new test red against base or a restored mutation | TDD table below | Table |
| E-7: typecheck exit 0, vitest counters and exit, path membership | Test Execution Results | `verification/015/m1-captures-be881c9.txt`, `m1-testresults-paths-be881c9.txt` |
| E-8: no lockfile pin moves | `git diff --numstat 7ce866b -- pnpm-lock.yaml package-lock.json` empty | `m1-captures-be881c9.txt` |
| QA Testing Infrastructure item 2: lift the capturing driver at M1 | `src/server/api/utils/__tests__/helpers/capturingDatabase.ts`; used by 8 test files | The tests |
| QAF-11 (QA Phase 2 of M0) | Fixed at `9e4955a` | `SectionEditor.auto-remove-dispatch.test.tsx`, 6 of 6 repeat runs green after the change |
| CR-1 (code review of M0) | `verification/015/m0-testresults-paths-037935d.txt` at `96e123d`; this milestone writes its own list named for its handoff SHA | `m1-testresults-paths-be881c9.txt` |

**User-visible surface.** None. Every M1 criterion is server, API or build-time code. No flow questions go to steering.

**Product-behaviour changes observable outside the service's own source** (declared to steering with the handoff):

- **M1-c.** Sign-out now actually revokes the user's Discord OAuth token. Before, the request carried no `token`, so Discord ignored it. A UAT walk that signs out with the test account invalidates that account's Discord token. I-2 in QA's Irreversible Side-Effect Register. Downstream stages whose walk signs out (B-1 to B-5, B-7) should expect to sign in again.
- **M1-d.** The 1001st new message is refused with today's text; a user or server at exactly 1000 messages could previously add one more.
- **M1-g.** A request with a bad signature and a malformed body now gets 401. It threw before.
- **M1-j.** A `null` cache entry now stays cached for its `expireSeconds`, for `fetchUserAccount` and `fetchAccountFromSession`. A user whose refresh token is absent is looked up once per 600 s.
- **M1-f.** The client-side guard is now live. See Outstanding Items.

## Files Modified

| Path | Changes | Lines |
|---|---|---|
| `src/server/api/utils/shared.ts` | M1-a: `getUserRecentMessages` returns before the query for an empty list; `getPartialMessages` drops the `exists` limb for no guilds. M1-d: `>=` | +10 −5 |
| `src/server/api/utils/user.ts` | M1-a: `authorizeUser` empty-list return | +1 |
| `src/server/api/utils/authorizeGuildUser.ts` | M1-a: `getOldMessages` empty-list return | +1 |
| `src/pages/api/cron.ts` | M1-b: `is null` | +1 −1 |
| `src/server/auth.ts` | M1-c: `revokeAccessToken` (new), `removeUserSession` reordered and made tolerant. M1-h: the inner `await` removed. Lint gate: one destructure wrapped | +20 −5 |
| `src/utils/redis/index.ts` | M1-c: `clearUser` takes an optional `discordId`. M1-j: `getItem` returns `{ item } \| null` and its three callers read `.item` | +14 −14 |
| `src/server/api/utils/shapes.ts` | M1-e: regex anchored. Lint gate: five signatures wrapped (no logic) | +19 −6 |
| `src/env.mjs` | M1-f: guard compares `prop !== 'NODE_ENV'` | +1 −1 |
| `src/pages/api/interactions-edge.ts` | M1-g: parse after the guard | +2 −2 |
| `src/utils/parseServerCookies.ts` | M1-i | +7 −2 |
| `src/utils/getCDNUrl.ts` | M1-k | +1 −1 |
| `.../ComponentEditors/__tests__/SectionEditor.auto-remove-dispatch.test.tsx` | QAF-11: element wait; lint gate: non-null assertions removed | see diff |

## Files Created

| Path | Purpose |
|---|---|
| `src/server/api/utils/__tests__/helpers/capturingDatabase.ts` | Kysely driver that records compiled queries and answers from a callback |
| `src/server/api/utils/__tests__/shared.in-predicates.test.ts` | M1-a: `getUserRecentMessages`, `getPartialMessages` |
| `src/server/api/utils/__tests__/user.in-predicate.test.ts` | M1-a: `authorizeUser` |
| `src/server/api/utils/__tests__/authorizeGuildUser.in-predicate.test.ts` | M1-a: `getOldMessages` through the default export |
| `src/server/api/__tests__/cron.scheduled-selection.test.ts` | M1-b |
| `src/server/__tests__/auth.sign-out.test.ts` | M1-c |
| `src/server/api/utils/__tests__/shared.message-cap.test.ts` | M1-d |
| `src/server/api/utils/__tests__/shapes.user-or-discord-id.test.ts` | M1-e |
| `src/__tests__/env.client-proxy.test.ts` | M1-f |
| `src/server/api/__tests__/interactions-edge.signature-before-parse.test.ts` | M1-g |
| `src/server/__tests__/auth.hydrated-session.test.ts` | M1-h |
| `src/utils/__tests__/parseServerCookies.cookie-header.test.ts` | M1-i |
| `src/utils/__tests__/redis.cached-null-hit.test.ts` | M1-j |
| `src/utils/__tests__/getCDNUrl.port-and-environment.test.ts` | M1-k |
| `agent-output/verification/015/mutate-run.sh`, `mutators/*.py`, `mutation-*.txt` | Isolated-export mutation driver and its captures |
| `agent-output/verification/015/m1-*.txt` | Gate captures, path list and class enumerations |

## Patterns Extended

| Surface | Pattern extended (rung) |
|---|---|
| Compiled-SQL tests | `shared.upsert-valid.test.ts` builds a Kysely with `DummyDriver` and reads `.compile()`. The capturing driver extends it to run the real function and read back what it sent. Rung: in-file / same directory |
| Handler tests | `messageCodes.malformed-query.test.ts` imports the page handler dynamically from `~/pages/api/...`, uses `makeRes` from `v1/__tests__/helpers/apiResponse`. cron and interactions-edge tests do the same. They sit in `src/server/api/__tests__/` because a `__tests__` under `src/pages` would become a Next route. Rung: same class of surface |
| Redis-backed tests | `serverCommands.get-message.test.ts` stubs the Redis client. The sign-out, hydrated-session and cached-null tests stub `~/utils/redis/client` the same way. Rung: same class of surface |
| `.catch(() => {})` for a best-effort call | `redis.fetchGuild(...).catch(() => {})` in `hydratedAuthCallback`; the revoke call uses the same form |
| Test lint gate | The convention-check eslint pass applies to every changed file. Existing tests in the repo fail it. I fixed the failures in files I touched and left others alone |

## TDD Compliance

Every row's red run was observed against the code before the fix (the fix was applied only after it), except rows naming a mutant: those cells are green at the base and earn their red under the named mutant. Mutants run in an isolated export (`git archive <sha>` with `node_modules` linked) through `verification/015/mutate-run.sh`, which writes each run to `verification/015/mutation-<label>-<sha>.txt` and kills the process group at 180 s; a control run on the unmutated export is green (`mutation-control-5b2cebe.txt`, 8 of 8). The failure reasons are assertion-level throughout; no row relies on a compile-time failure.

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|---|---|---|---|---|---|
| `getUserRecentMessages([])` | `shared.in-predicates.test.ts` | Yes | Yes | `AssertionError: expected [ { id: 'm1', … } ] to deeply equal []`: one query issued | Yes |
| `getPartialMessages(userId, [])` | `shared.in-predicates.test.ts` | Yes | Yes | `AssertionError: expected 'select … in () …' not to match /\bin \(\)/` | Yes |
| `authorizeUser(_, [])` | `user.in-predicate.test.ts` | Yes | Yes | `AssertionError: expected [ … ] to have a length of +0 but got 1` (a Messages query issued) | Yes |
| `getOldMessages` through `authorizeGuildUser(_, _, [])` | `authorizeGuildUser.in-predicate.test.ts` | Yes | Yes | same, length 0 expected, 1 received | Yes |
| cron selection | `cron.scheduled-selection.test.ts` | Yes | Yes | `AssertionError: expected 'select … ' to contain '"ScheduledMessages"."error" is null'` | Yes |
| revoke carries `token` | `auth.sign-out.test.ts` | Yes | Yes | `AssertionError: expected null to be 'fixture-access-token'` | Yes |
| revoke failing on the network does not abort sign-out | `auth.sign-out.test.ts` | Yes | Yes | `promise rejected "TypeError: fetch failed" instead of resolving` | Yes |
| no revoke for a token-less account | `auth.sign-out.test.ts` | Yes | Yes | `expected "vi.fn()" to not be called at all, but actually been called 1 times` | Yes |
| order: account read, revoke, `Accounts` update | `auth.sign-out.test.ts` | Yes | Yes | `expected [ 'revoke', 'account-read', 'accounts-update' ] to deeply equal [ 'account-read', 'revoke', 'accounts-update' ]` | Yes |
| no account: user and session keys only | `auth.sign-out.test.ts` | Yes | Yes | `Error: no result` (Kysely `NoResultError` out of the account loader) | Yes |
| no account: no revoke, no `Accounts` update | `auth.sign-out.test.ts` | Yes | Yes | same `NoResultError` | Yes |
| refused revoke (non-2xx) still clears out | `auth.sign-out.test.ts` | Yes | Yes | Green at the base. Mutant `m1c-refused-revoke-throws` (throws on `!res.ok`) reddens it and the network-failure cell. `mutation-m1c-refused-revoke-throws-5b2cebe.txt`: 2 failed, 6 passed | Yes |
| ordering, Accounts update first | `auth.sign-out.test.ts` | Yes | Yes | Mutant `m1c-accounts-update-before-revoke` reddens 5 cells, the order cell among them (`…-5b2cebe.txt`: 5 failed, 3 passed) | Yes |
| `user-guilds` key not deleted with an undefined id | `auth.sign-out.test.ts` (no-account key set) | Yes | Yes | Mutant `m1c-user-guilds-delete-kept` reddens the key-set cell only (`…-5b2cebe.txt`: 1 failed, 7 passed) | Yes |
| new message at 1000 refused (user, guild) | `shared.message-cap.test.ts` | Yes | Yes | `promise resolved "{ id: 'saved-id', … }" instead of rejecting` (both scopes) | Yes |
| cap: conjunct `!message.id` alone decides | `shared.message-cap.test.ts` (existing at 1000, both scopes) | Yes | Yes | Green at the base. Mutant `m1d-cap-ignores-new-conjunct` reddens both existing-message cells (`mutation-m1d-cap-ignores-new-conjunct-fadee3e.txt`: 2 failed) | Yes |
| cap: owner selection decides | `shared.message-cap.test.ts` (user 1000/guild 999 and the converse) | Yes | Yes | Green at the base. Mutant `m1d-cap-counts-user-for-guild` reddens 2 (`…-fadee3e.txt`) | Yes |
| cap: `>=` | `shared.message-cap.test.ts` (1000 refused, 999 saved, 1001 refused) | Yes | Yes | The 1000 cells red at the base. Mutant `m1d-cap-comparator-strict` re-creates it, 2 failed | Yes |
| `userOrDiscordIdShape` | `shapes.user-or-discord-id.test.ts` | Yes | Yes | `expected true to be false` for `0abc`, `00`, a 20-digit id with a trailing letter | Yes |
| `env` proxy, client branch | `env.client-proxy.test.ts` | Yes | Yes | `AssertionError: expected [Function] to throw an error` for a server key. Named mutant `m1f-env-guard-reverted` re-creates it on the final test text (1 failed, 2 passed) | Yes |
| `interactions-edge` handler: bad signature + malformed JSON | `interactions-edge.signature-before-parse.test.ts` | Yes | Yes | `SyntaxError: Expected property name or '}' in JSON` (handler threw instead of answering 401), and the parse spy | Yes |
| handler guard, conjunct `req.body === null` | same (verified, no body stream) | Yes | Yes | Green at the base. Mutant `m1g-drop-body-null-conjunct`: 1 failed | Yes |
| handler guard, conjunct `!isValid` | same (3 bad-signature cells) | Yes | Yes | Mutant `m1g-drop-isvalid-conjunct`: 3 failed | Yes |
| parse placed before the guard | same | Yes | Yes | Mutant `m1g-parse-before-verify`: 2 failed (the red cells above) | Yes |
| `parseServerCookies` | `parseServerCookies.cookie-header.test.ts` | Yes | Yes | `expected { a: 'x', b: 'p' } to deeply equal { a: 'x=y', b: 'p==' }`; `TypeError: Cannot read properties of undefined (reading 'trim')` for a segment without `=` and an empty segment | Yes |
| `getCDNUrl` | `getCDNUrl.port-and-environment.test.ts` | Yes | Yes | `expected 'http://cdn.local/dev:9000' to be 'http://cdn.local:9000/dev'` | Yes |
| cached `null` is a hit | `redis.cached-null-hit.test.ts` | Yes | Yes | `expected [ … ] to have a length of 1 but got 2` for the account without a refresh token and the session without an account | Yes |
| `hydratedAuthCallback` unhandled-rejection cell | `auth.hydrated-session.test.ts` | Yes | Yes | The order cell is green at the base (see Outstanding Items). The unhandled-rejection cell: `expected [ Error: recent messages failed ] to deeply equal []` at the base; mutant `m1h-guild-fetch-awaited-inside-array` (the removed `await` put back) re-creates it on the final test text: 1 failed, 2 passed | Yes |
| `createCapturingDatabase` (test helper) | none of its own | n/a | n/a | A test-only helper under `__tests__/helpers/`. It is exercised by 8 test files and carries no row of its own | n/a |

**Gaps in the TDD record, stated.** Rows without a named mutant (the `in`-list returns, cron, `userOrDiscordIdShape`, cookies, `getCDNUrl`, cached null) rest on the red run against the pre-change code. Each has a single decision, so a revert is the mutant. For `getPartialMessages` the positive cell asserts the user's own message is still returned, so a fix that returns `[]` early would fail it. I did not run that mutant; QA's sweep owns it.

## Class Sweep

Not owed as a reviewer-finding round. For the gaps my own instruments exposed at first delivery, enumerations were run at `be881c9`; full output in `verification/015/m1-enumerations-be881c9.txt`.

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| F-2 (and the guard mutants) | `grep -rn "'in'," src bot --include=*.ts --include=*.tsx`, non-test (E1); cross-checked by `grep -rnE "['\"](not in\|in)['\"]"` (E2) | 4 hits in each: `shared.ts` 115 and 172, `user.ts` 20, `authorizeGuildUser.ts` 19 | Each is guarded by an empty-list return (`getUserRecentMessages`, `getPartialMessages`, `authorizeUser`, `getOldMessages`) and has a red-first test. 0 unguarded. The plan's population is the same 4 |
| F-1 | `grep -rn "'=', null\|'!=', null\|'<>', null" src bot` (E3) | 0 hits | Residual 0 (base had 1: `cron.ts`) |
| F-6 (`!x === 'lit'` class) | `grep -rnE "![A-Za-z_.]+ (===\|!==) " src bot` (E4) | 1 hit: `env.mjs:101` `!!process.env.SKIP_ENV_VALIDATION === false` | Not applicable: a double negation compared with a boolean, correct as written |
| F-7 (parse before verify) | `grep -rn "JSON.parse" src/pages/api` (E5) | 1 hit: `interactions-edge.ts:52`, after the guard | Fixed. `interactions-server.ts` does not parse and checks a token header first |
| F-4 | `grep -rnE "> MAX_\|>= MAX_" src` (E6) | `shared.ts:253` `>=` is the cap; the other hits are length checks on names, text and paste, which are inclusive-bound checks and not the 1000 cap | Not applicable to the cap |
| F-11 | `grep -rn CDN_PORT src` (E7) | 1 production hit, `getCDNUrl.ts` | Fixed |
| F-9 | `grep -rn "split('=')" src bot` (E9) | 0 hits (base had 1: `parseServerCookies.ts`) | Residual 0 |
| F-10 | `grep -n "getItem<" src/utils/redis/index.ts` | 3 callers: `wait` (two), `getFromCache` | All three read `.item`; the plain `getItem(` grep (E8) returns 0 because every call has a type argument, so the figure is the `getItem<` form |

## Test Execution Results

Raw outputs: `agent-output/verification/015/m1-captures-be881c9.txt`. Counts come from the vitest JSON reporter (`numTotalTests`, `numPassedTests`, `numFailedTests`, `testResults.length`); path membership is a set difference over the sorted `testResults` names against `verification/015/base-7ce866b-testresults-paths.txt` (QA's list of the base).

| Command | Result | Exit |
|---|---|---|
| `npx vitest run --reporter=json` at `be881c9` | 669 tests, 669 passed, 0 failed, 67 files. Base was 598 / 54 | 0 |
| Path membership vs the base | 0 base paths missing; 13 new paths, the M1 test files | — |
| `pnpm run typecheck` at `be881c9` | 0 errors | 0 |
| `git diff --numstat 7ce866b -- pnpm-lock.yaml package-lock.json` | empty | — |
| `node ~/.claude/tools/convention-check.js website --since=037935d` | 0 FAIL, 0 CANDIDATE, 1 SKIP | 0 |
| `SectionEditor.auto-remove-dispatch.test.tsx`, 6 consecutive runs after the QAF-11 change | 3 of 3 tests each run | 0 |

- **Convention-check, before the clean pass.** Its first run reported 57 FAIL and 1 CANDIDATE: two prose comments (one I edited in the QAF-11 file, one docblock on the helper), an explicit `{ timeout: 5000 }` on the QAF-11 wait, and eslint findings in the new tests. Each was satisfied, not bypassed: both comments removed; the wait kept with the default timeout; imports moved above `vi.mock` (vitest hoists it); non-null assertions and an `import()` type removed. Five over-long signatures in `shapes.ts` and one destructure in `auth.ts` are lines I did not write; the gate failed on them because the files are touched, so I wrapped them (formatting only, 0 logic).
- **SKIP, named as unchecked, not passed.** `id-token, basename`: the tool looks for `agent-output/TEST-CONVENTIONS.md` above the repository, and the conventions live in `agent-output/CLAUDE.md`. I ran the CLAUDE.md negative form by hand over the 14 test files changed since `037935d`: basenames, `it`/`describe`/`test` title lines and comment lines, 0 hits. That regex was not given a planted control, so the 0 is a bounded result.
- **Lint scope.** Existing tests in the repository fail eslint (17 errors in the two I checked before M1). Only files this milestone touched were brought to clean.
- Coverage: new code is covered by the rows above; no coverage tool was run.

## Outstanding Items

1. **M1-c, missing account (plan premise differs from the code).** The plan (and QA's read) says that at `7ce866b` a missing account "throws `Expected to find account`". Through the real stack that line is unreachable: `fetchUserAccount(…, true)` runs `getPostgres().selectFrom('Accounts')…executeTakeFirstOrThrow()` inside its loader, so an absent row raises Kysely's `NoResultError` (cell red reason `Error: no result`). I built the no-account cell on that real state: `removeUserSession` catches `NoResultError` only, treats it as no account, deletes the `user-access-token` and `user-session-token` keys, issues no `Accounts` update and sends no revoke. Any other error still propagates. The `!account` branch stays for a falsy return. This is inside rev 8's wording ("no account found") but it is a code path the plan did not name. **Asks the planner to confirm** the reading.
2. **M1-h, the criterion's ordering clause is already true at the base.** The recent-messages fetch is started before the account lookup is awaited, and the guild fetch is started and awaited inside the array afterward, so "both started before either is awaited" holds at `7ce866b` and QA's "red against the sequential base" cell is green there (`auth.hydrated-session.test.ts` first cell, kept as a spec). What the inner `await` does change: the recent-messages promise has no handler while the guild fetch runs, so a failure in it during that window is an unhandled rejection. I fixed that (removing the inner `await`, which is what F-8 names) and made it the red cell. **Asks the planner** whether the criterion should read as the handler-attachment property. The residual: between the message fetch start and `Promise.all`, the `await fetchUserAccount` still leaves the promise unhandled for one tick; I did not change it (beyond F-8; severity 1).
3. **M1-f, the base refused nothing.** The plan says reading other server keys "still is" refused. At `7ce866b` the guard `!prop === 'NODE_ENV'` is always false, so the proxy refused no key. The fix makes the refusal live for the first time. Sweep: the only client-reachable importers of `env.mjs`, `constants/index.ts` and `usePusher.ts`, read `NEXT_PUBLIC_` keys only (`grep -rl "env.mjs" src bot` and a read of both). Risk: a future client read of a server key now throws. Validation: UAT's walks load the editor in a browser (B-2 to B-5); a throw would show there.
4. **Residue stated by the plan, not asserted:** M1-b has no producer (no observable effect in production); M1-c's `user-guilds` entry expires on its 600 s TTL; M1-d concurrency (X-16); the session row is NextAuth's (AF-16).
5. **`getPartialMessages` early-return mutant not run.** See the TDD gaps note.
6. **Self-diagnosis (method), M1-h.** I wrote the first version of the unhandled-rejection cell against `vi.fn()` mocks, which passed at the base because vitest attaches handlers to promises a mock returns. I only found that by asking why a cell that should be red was green. The check that caught it: the red run before the fix. Without that rule the cell would have shipped as a never-red guard.
7. **Self-diagnosis (method), M1-c scope.** I first read the plan's "a missing account throws `Expected to find account`" as the code's behaviour and wrote the cell against a stub; the real-stack test showed a different error. I had chosen to drive the real `redis` module with a fake client rather than stub `fetchUserAccount`, which is why the difference surfaced.

## Next Steps

Code review of `be881c9` (website), then QA Phase 2 for M1 (mutation sweep of the guards M1 changed: QA owns it). Then M2.
