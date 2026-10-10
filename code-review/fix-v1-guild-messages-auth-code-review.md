---
ID: n/a
Origin: fix-v1-guild-messages-auth
UUID: 9c90dfa0
Reviewed-At: "c8c3d70766846b9ea635db53754ba7b1a3c7e8ac — website, range f2c85f5..c8c3d70 (rounds 1acffee and c8c3d70); SHA verified at start and end of review"
Status: In Review
Round: 1
Verdict: APPROVED_WITH_COMMENTS
---

# Code Review: fix-v1-guild-messages-auth

**Plan Reference**: none (fixer route). Scope authority: `agent-output/steering/v1-guild-messages-auth-rulings.md`, blocks "2026-10-10 — fix route: Fixer (by selection)" and "2026-10-10 — rider: 400 with no `.end()` (by selection) — SCOPE DELTA".
**Implementation Reference**: `agent-output/implementation/fix-v1-guild-messages-auth-implementation.md` (committed at agent-output `12cd890`, `Handoff-At: c8c3d70`)
**Defect record**: `agent-output/handoff/v1-guild-messages-endpoints-unauthenticated-2026-08-24.md` (UUID 8818bd89)
**Date**: 2026-10-10
**Reviewer**: Code Reviewer

## Changelog

| Date (UTC) | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-10-10T07:57 | steering (subagent spawn) | Review website `f2c85f5..c8c3d70` before QA Phase 2 | Round 1. Stage start: the implementation document as committed at agent-output `12cd890`, `Handoff-At` `c8c3d70`; it matches the SHA the brief names. Steering's brief arrived. There is no plan and so no Decisions Register; the criteria are the two rulings blocks. Adversarial execution was run against an isolated instance. Verdict APPROVED_WITH_COMMENTS: 0 CRITICAL, 0 HIGH, 1 MEDIUM, 3 LOW, 2 INFO. |

## Criteria assessed this round (recorded before reading the diff)

From the rulings file. There is no plan.
1. The v1 guild-messages endpoints (`messages.ts`, `messages/[id].ts`) refuse callers without the Statbot key. This must be verified by an executed unauthenticated request, never by a diff read (handoff 8818bd89, "masking").
2. The accepted form stays exactly `Authorization: Bearer <key>`, and the guard fails closed when `STATBOT_API_KEY` is unset or empty (the brief's guidance to the fixer).
3. The rider: the ZodError → 400 path in the same two handlers completes the response, and it has a test.
4. Files: `src/middleware.ts`, the two handlers, "plus their tests"; `website` only.

## Tree identity

`git -C website rev-parse HEAD` returned `c8c3d70766846b9ea635db53754ba7b1a3c7e8ac`, on branch `fix/v1-guild-messages-auth`, both at the start and at the end of the review. `git diff --numstat HEAD` was empty over the in-scope paths. The files were read with `git show c8c3d70:<path>`. Execution ran in detached worktrees at `c8c3d70` and at `f2c85f5`, both removed afterwards. The shared tree was never moved.

## Scope question (from the brief): `src/server/api/v1/__tests__/helpers/apiResponse.ts`

**In scope.** The helper is test-support code under `__tests__/helpers/`. Test Conventions § Helper policy *requires* the lift at the third duplicate. The duplicate count is measured with `git grep -cE 'function makeRes|makeRes *='`: 1 file at `f2c85f5`, 2 at `1acffee`, and round 2 would have made a third, so the policy obliged the lift. Its importers are exactly the three test files on this surface (`git grep -c helpers/apiResponse c8c3d70 -- src`: 3 files). No production module imports it. Round 2 changed it only by adding `ended`, set by `end()` and `json()`, and by moving from `this` to the closure. Neither change affects an existing assertion. Leaving three copies would itself have been a convention finding.

## Architecture Alignment

**System Architecture Reference**: `agent-output/architecture/system-architecture.md` (present, read), with `agent-output/architecture/website.md`.
**Alignment Status**: ALIGNED

`system-architecture.md` lists `v1/` among the Pages Router API endpoints and records no auth design for it. The fix follows the structural exit named in handoff 8818bd89: authenticate in the handler, not by path pattern. It removes the dead middleware branch, which only read as a guard, so no dead control is left to be counted. The repo's existing handler idiom is the same: `interactions-server.ts` `handler` checks a header against a secret and returns `401` with `.end()`. One departure from the repo's env-access idiom is recorded as CR-5.

## Adversarial Execution (security boundary)

**Evidence process.** The evidence is the output of the website's own Next dev server, running the reviewed tree. It is not the fixer's tests and not a model I wrote. Driver: `agent-output/verification/fix-v1-guild-messages-auth/code-review-raw-attack.py`. It uses raw sockets: request targets, header names, order, duplicates and bytes are sent exactly as written, with no client library.

**Module-scope branch check.**
- `src/middleware.ts` at `c8c3d70` has no module-scope env read left.
- The handlers have no module-scope branch. `getPostgres` (project-utils `dist/postgres.js`) is lazy.
- `src/env.mjs` branches at module scope on `SKIP_ENV_VALIDATION`, and the handlers import it transitively.
- The first keyed run, with a minimal env, threw `Invalid environment variables` on every request. The positive control caught it (`CONTROL-BLIND` ×4), and the run was voided and kept as `code-review-attack-keyed-void-envinvalid.txt`. Every later run set `SKIP_ENV_VALIDATION=1`.
- `DATABASE_URL` pointed at the dead port `127.0.0.1:1`. The worktree had no `.env*` files. Nothing was sent to `hooks.gg`.

**Oracle, fixed before the attack.** A breach is a request without the exact credential that gets `200`, `405`, `500` or the handler's own `400`, or that adds a DB connection error (`ECONNREFUSED` and similar) to the server log in its window. The positive control is exact `Bearer probe-key`, which must reach the DB: `500` plus a logged connection error.

**Input class enumerated.**
- 21 credential variants per endpoint: none, wrong, empty, `Bearer` with no space, lowercase and uppercase scheme, double space, tab, key prefix, key suffix, uppercased key, bare key, `Basic`, `Bearer undefined`, `Bearer null`, the key in `Proxy-Authorization`, the key in `X-Authorization`, duplicate headers (wrong then right), a comma list, an embedded NUL, and an obs-fold continuation.
- 7 methods per endpoint, unauthenticated: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS.
- 20 request targets, each sent with no credential and with a wrong bearer: trailing slash, leading `//`, inner `//`, `./`, `x/../`, percent-encoded segment letter, encoded `/`, encoded id, query override `?guildId=`, fragment, `/API/` casing, `.json` suffix, absolute-form to self, absolute-form to a foreign host, an extra query key, and malformed guild and message ids.
- Server key unset, and server key empty: 6 credential variants per endpoint, including the would-be-correct `Bearer probe-key`.

**Results.**

| Tree / mode | Cases | Breach | Control | Capture |
|---|---|---|---|---|
| `c8c3d70`, key `probe-key` | 100 | **0** | 4/4 OK | `code-review-attack-keyed.txt` |
| `c8c3d70`, key unset | 12 | **0** | n/a | `code-review-attack-nokey.txt` |
| `c8c3d70`, key empty | 12 | **0** | n/a | `code-review-attack-emptykey.txt` |
| `f2c85f5` (negative control: same driver, same mode) | 100 | **62** | 4/4 OK | `code-review-attack-control-f2c85f5.txt` |

At `c8c3d70`, every request that was not refused with `401` was answered before the handler ran: `308` normalisation redirects, `404` for no route, or a `400` from Node's parser for NUL or obs-fold. The redirected targets resolve back to the guarded route. A `401` shows `body=5`, which is the chunked terminator `0\r\n\r\n`, so the body is empty. The guard holds for HEAD and OPTIONS too. A `Bearer probe-key` header named `AUTHORIZATION` with trailing whitespace is accepted. That is correct: header names are case-insensitive and Node strips trailing OWS.

**Predicate blind spot, recorded when the driver was written and confirmed by the control run.** A handler that hangs is past the guard, but the oracle classifies it as `held` (status `none`). The control run shows this on `f2c85f5`'s malformed-id targets, which time out. At `c8c3d70` no case hung: every one returned a status. The blind spot therefore cost this verdict nothing, but it is a property of the driver. A second blind spot: the oracle does not cover side effects other than the DB, and these handlers have none.

## TDD Compliance Check

**TDD Table Present**: The fixer form has no "TDD Compliance" table (fixer.md § Document Lifecycle names the sections Test, red run and green run). The red, green and mutant tables are present for both rounds, with captures.
**All Rows Complete**: Yes. I re-read the counts from the captured vitest JSON with `node` (`numTotalTests`, `numPassedTests`, `numFailedTests`, `testResults.length`, `success`, and each failing `fullName`). Each capture matches the record:
- red `f2c85f5`: 18/2/16;
- green: 24/24;
- mutant without fail-closed: 4 failures, all fail-closed cases;
- mutant single-unguarded: 8 failures, all single;
- restored: 24/24;
- round 2 red `1acffee`: 29/24/5, all `expected false to be true`;
- round 2 green: 29/29;
- suites: 566/566 (51 files), 584/584 (52), and 589/589 (53).

I did not run the suite: running the project's tests is QA's job.

**Concerns**:
- Both new files are spec-form, so the bug-form rule does not arise.
- Expected values are literals (`401`, `400`, `200`). The credential in the test is built from the test's own `KEY` constant and never from production. No expectation depends on the code under test.
- Naming:
  - All three test basenames pass the positive-form regex, and the ID-token check finds 0 hits in basenames, titles and comments. The positive control `printf 'it("cr-3 case")\n// see 013'` scores 2.
  - The module segment `guildMessages` is not a production basename verbatim. The real basenames are `messages` and `[id]`, and `[id]` cannot pass the regex. A test cannot live beside a Pages Router route either, because Next would serve it as a route.
  - The new files extend the existing `guildMessages.valid-exposure.test.ts` precedent, which is the pattern-ladder rule. This is not a finding.
- The weakness in the refusal cases is CR-1.

## Comment gate

- `node ~/.claude/tools/comment-gate.js /usr/local/bin/hooks/website --since=f2c85f5 --gate`: clean, exit 0 (2 files, tests excluded).
- The same with `--tests`: clean, exit 0 (6 files).

The working tree equalled `c8c3d70` on these paths. Round 1 removed the review-addressed docblock on `makeRes`, which was a credit.

## Findings

### Critical
None.

### High
None.

### Medium

**CR-1 [MEDIUM] Checks That Cannot Fail**: the refusal cases assert the status but not that the response was sent
- **Location**: `src/server/api/v1/__tests__/guildMessages.statbot-key-required.test.ts`. Three cases: `it.each` "refuses %s with 401 and never reads the database", "refuses an unauthenticated non-GET with 401, before the method check", and `it.each` "fails closed when the server key is %s".
- **Class**: A test of a non-2xx response path asserts `statusCode` on the response double but not `ended`. A path that sets a status without sending a response passes it. That is exactly the defect round 2 fixed.
- **Enumeration**: `git grep -cE 'statusCode\)\.toBe\((4|5)[0-9]{2}\)' c8c3d70 -- 'src/**/__tests__/**'` returns 4 static sites in 2 files: 3 in `guildMessages.statbot-key-required.test.ts` (16 executed cases) and 1 in `guildMessages.malformed-query.test.ts`. `ended` appears in the second file and not the first, so 3 sites and 16 cases are members. Blind spots: assertions written as `res.statusCode === 401`, `toEqual` on a status, or a double without an `ended` field elsewhere in the suite (outside `src/server/api/v1` there are none of this double).
- **Issue**: A mutant `return res.status(401);`, with no `.end()`, would still have `statusCode === 401`, `body === undefined` and no DB call, so every refusal case would pass. The production code is correct: in my execution every `401` came back completed, none hung. The gap is regression protection for the rider's own class, on the surface the rider fixed. This is derived by reading and was not executed: running the suite is QA's.
- **Required Action**: Eliminate the class, meaning every non-2xx assertion on a v1 response double also asserts completion.
  - **Preferred (structural)**: a single assertion helper in `__tests__/helpers/apiResponse.ts`, for example `expectSent(res, status)`, which checks both `statusCode` and `ended`, used at every non-2xx site, so status-only cannot be written. The falsity signature is required: the 16 cases must turn red under the mutant `return res.status(401).end()` → `return res.status(401)` in each handler, and the record must show that run.
  - **Minimum**: add `expect(res.ended).toBe(true)` at the 3 enumerated sites, with the same mutant run recorded.
  - **Carrier**: QA Phase 2. Test adequacy is QA's gate; the mutant is named here for QA to execute. `no test` was captured by this review.

### Low/Info

**CR-2 [LOW] Error Handling**: a third handler sets 400 without sending, outside this fix's scope
- **Location**: `src/pages/api/messages/codes/[code].ts`, `handler`, the `catch`: `if (error instanceof z.ZodError) return res.status(400);`
- **Class**: An API handler path sets a status and returns without sending a response, so the request stalls until the client or platform gives up.
- **Enumeration**: `git grep -nE 'res\.status\([^)]*\)\s*;?\s*$' c8c3d70 -- src ':!**/__tests__/**'` returns **1** hit (`[code].ts`). At `f2c85f5` it returns **3**, the two v1 handlers plus `[code].ts`, which is the positive control. Blind spots: a chain split across lines, `res.statusCode =` assignments, a `return` with no response call at all, and App Router handlers (none exist under `src/app/api`).
- **Issue**: `queryShape` is `.strict()`, so any extra query parameter on `/api/messages/codes/<code>` takes this path, for any caller (the route is unauthenticated). The cost is a hung serverless invocation per request. That is an **unmeasured hypothesis** by analogy with the fixer's measured hang at `1acffee` (`http-malformed-1acffee.txt`); I did not run this route. The owner's rider named "the same two handlers", so this member is outside the scope, and absorbing it here would be a scope delta.
- **Required Action**: eliminate the class repo-wide. **Minimum**: `return res.status(400).end();` in `[code].ts`, with a spec-form test asserting completion. **Owner-needing**: rider, or a separate handoff. It is carried meanwhile in `agent-output/handoff/website-api-handler-hardening-2026-10-10.md`, item 1.

**CR-3 [LOW] Security**: the key comparison is not constant-time
- **Location**: both handlers, `handler`, the first two statements (`req.headers.authorization !== \`Bearer ${key}\``).
- **Class**: A secret is compared to attacker-supplied input with an early-exit string comparison.
- **Enumeration**: `git grep -nE '!==? *(`Bearer|env\.[A-Z_]*(TOKEN|KEY|SECRET))' c8c3d70 -- src` returns **3** hits, confirmed by a read of every `src/pages/api` handler: the two v1 handlers, plus `interactions-server.ts` `handler` (`req.headers['x-hooks-api-token'] !== env.HOOKS_API_TOKEN`). Blind spots: comparisons with the secret on the left, comparisons through `includes` or `startsWith`, and `cron.ts`'s `req.query.key !== 'vercel'`, which compares against a public literal and is not a secret.
- **Issue**: An attacker controls the input and can reach this, so under the input-robustness order a guard is owed whatever the practicality. The magnitude is an **unmeasured hypothesis**: recovering the key byte by byte through V8 string comparison over Vercel network jitter is generally regarded as impractical, and nothing was measured. The old middleware used the same operator. The fix makes this live where before it was dead.
- **Required Action**:
  - **Preferred (structural)**: one `secretEquals(a, b)` that runs `crypto.timingSafeEqual` over SHA-256 digests of both strings, so length cannot leak, used at all 3 sites.
  - **Minimum**: the same at the 2 v1 sites.
  - Not blocking. It must not hold a fix for a live exposure. Carried in the handoff above, item 2.

**CR-4 [LOW] Architecture**: the guard is opt-in per route
- **Location**: the class covers `src/pages/api/v1/**`. Today its sites are the two `handler` functions.
- **Class**: Authorization on `/api/v1` comes from each route file remembering a two-line guard. A new v1 route that omits it is served unauthenticated and nothing reports it. This is the same fail-open class handoff 8818bd89 named for the path matcher, narrowed but not removed.
- **Enumeration**: `git ls-tree -r --name-only c8c3d70 -- src/pages/api/v1` lists 2 routes, and `git show c8c3d70:<route> | grep -c STATBOT_API_KEY` is 1 in each, so 2 of 2 are guarded. Blind spots: a v1 handler re-exported from another module, and v1 routes under `src/app/api/` (none exist).
- **Issue**: Today it is correct for both routes. The fixer explained the inline form (the scope file list had no shared module, and there are only 2 copies), and I accept that reasoning for this round. The exposure returns only when someone adds a route.
- **Required Action**:
  - **Preferred (structural)**: a spec test that enumerates every route file under `src/pages/api/v1/` from the filesystem, imports each default handler, and asserts `401` with no DB read for a request without the credential. Falsity signature: adding an unguarded stub route turns it red. It executes handlers, so it is not a source-text assertion. Lift the guard into a shared `requireStatbotKey` when a third route arrives.
  - **Minimum**: none owed now (2 of 2).
  - Carried in the handoff above, item 3.

**CR-5 [LOW] Pattern**: the secret is read from `process.env`, not through the `~/env.mjs` schema
- **Location**: both handlers, `handler`: `const key = process.env.STATBOT_API_KEY;`
- **Class**: A server secret is read outside the validated env schema the repo uses for every other server secret.
- **Enumeration**: `git grep -c 'process\.env\.' c8c3d70 -- 'src/pages/api'` returns **2** files, the two v1 handlers. `git grep -c "from '~/env.mjs'"` over the same path returns 3 files (`interactions-edge`, `interactions-server`, `trpc/[trpc]`). `interactions-server.ts` reads `env.HOOKS_API_TOKEN`. `STATBOT_API_KEY` is absent from `src/env.mjs`, and no non-source surface (`README.md`, `vercel.json`; there is no `.env.example`) mentions it. Blind spot: reads via destructuring `process.env`.
- **Issue**: The implementation record makes no pattern claim for its env access, so the departure is undocumented. Moving it into the schema is **not** simply tidier:
  - the schema's `z.string()` admits `''`, so the request-time `!key` fail-closed would still be needed;
  - a required entry turns a missing var into a failed build instead of a `401`, a release-behaviour change the owner has not ruled on;
  - `src/env.mjs` is outside the scope file list.
- **Required Action**: record the departure and leave the code as it is for this fix. If `env.mjs` ever enters a scope, add `STATBOT_API_KEY: z.string().min(1)` and keep the request-time check. Carried in the handoff above, item 4.

**CR-6 [INFO] Operator-visible signal / release hazard**: exact byte match, and silent refusals
- **Location**: both handlers, `handler`, guard line.
- **Class**: Not a defect. These are properties of the guard that bear on the owner's key check (OWNER-QUEUE "Check that Statbot's hooks.gg key matches the website's").
- **Enumeration**: n/a (2 sites, above).
- **Issue**:
  - (a) The comparison is byte-exact, and neither side is trimmed or normalised beyond Node's header OWS strip. A trailing newline or space stored in the Vercel `STATBOT_API_KEY` value, but not in Statbot's `HOOKS_API_KEY`, gives a `401` even when the keys look the same. The research's HMAC-digest instrument compares exact bytes and so would catch this. A visual comparison would not.
  - (b) A refusal logs nothing. After deploy, a key mismatch shows only as `401`s in Vercel's request log for `/api/v1/guilds/*/messages*` and as axios rejections in Statbot.
  - (c) The scheme is accepted only as exactly `Bearer ` (case-sensitive). Statbot sends exactly that (`statbot-utils/src/api/ApiUtils.ts`, per research F5).
  - (d) With the server key unset or empty, every request is refused (executed above).
- **Required Action**: none on the code. Route (a) and (b) to the owner as an operator-visible check. The fixer route has no UAT, so steering carries it. The key check should compare exact bytes, and the first post-deploy watch is the 401 rate on those two routes.

## Positive Observations

- The fix is structural, not a repair of the matcher or predicate typo. It authenticates where the data is served, and it deletes the dead middleware branch rather than leaving a control that reads as one.
- It fails closed when the key is unset or empty, and that is proven both by mutant (`mutant-no-fail-closed.json`) and by execution.
- The guard runs before the method check and before parsing, so no unauthenticated input reaches Zod or the DB.
- The fixer's evidence discipline is good: red runs at the defect, mutants kept per handler, HTTP before and after on an isolated instance with a dead DB, and an honest note of an in-place-script breach of record form.
- The round-2 diagnosis was established by an executed hang (curl exit 28), not inferred from reading.

## Verdict

**Status**: APPROVED_WITH_COMMENTS
**Rationale**:
- All four criteria are met at `c8c3d70`. Criterion 1 was verified by execution: 0 of 124 breaches, against 62 of 100 on `f2c85f5` with the same driver.
- No CRITICAL or HIGH findings.
- CR-1 is a regression-protection gap in the tests, not in production behaviour, and is routed to QA Phase 2.
- CR-2 to CR-5 are LOW and carried by a handoff. They must not hold a fix for an exposure that is live in production (research F4).

## Required Actions

None blocking. Optional, by carrier:
- CR-1 → QA Phase 2: the completion assertion and the named mutant.
- CR-2 (the owner selects rider or handoff), CR-3, CR-4, CR-5 → `agent-output/handoff/website-api-handler-hardening-2026-10-10.md`.
- CR-6 → the owner, via steering, with the key check.

## Assumption Not Checked

This review assumes that the Vercel production runtime reads `process.env.STATBOT_API_KEY` at request time in the Pages API function exactly as `next dev` does, and it does not test that. If it is false, the deployed endpoints would answer `401` to Statbot's correct key (env not bound) or keep serving `200` with no credential (a stale build). Closing it belongs to **devops** at release: one unauthenticated GET to the deployed list endpoint must return `401`. That is the handoff's executed-request verification, now against the deployed build and not a local one. Under the steering fences this needs the owner's sanction.

## Next Steps

- Handing off to the qa subagent for test execution (QA Phase 2, `--chain fix-v1-guild-messages-auth`), carrying CR-1.
- Devops at release: the deployed-build unauthenticated GET in Assumption Not Checked. The release stays held until the owner's key check returns "match".
- Owner, via steering: the CR-2 scope selection, and CR-6 (a) and (b) with the key check.
