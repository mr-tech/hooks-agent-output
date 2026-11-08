---
ID: 015
Origin: 015
UUID: 861e5f61
Reviewed-At: "be881c9 — repos=website; Round 2, M1 (037935d..be881c9)"
Status: In Review
Round: 2
Verdict: REJECTED
---

# Code Review: Plan 015 — Bug-evaluation fixes

**Plan Reference**: `agent-output/planning/015-bug-evaluation-fixes.md`.
- Round 1 read rev 8 at `ec45936`.
- Round 2 recorded its criteria from rev 8 at `bf10a46` and read rev 9 and rev 10 at `bceb84a` as growth (§ Round 2 scope).

**Implementation References**:
- `implementation/015-bug-evaluation-fixes-m0-implementation.md` (`6299c9b`, `Handoff-At` 037935d).
- `implementation/015-bug-evaluation-fixes-m1-implementation.md` (`7f45611`, `Handoff-At` be881c9).

**Date**: 2026-11-08
**Reviewer**: Code Reviewer (code-reviewer-hooks-015)

## Changelog

| Date (UTC) | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-08T06:03 | steering-hooks-015 → code-reviewer-hooks-015 (brief); implementer-hooks-015 handoff at website `037935d` | Round 1: review M0 | APPROVED_WITH_COMMENTS. CR-1 LOW and CR-2 INFO. TDD row 2's missing pre-change red closed by `verification/015/cr-m0-bot-typecheck-probe.sh`, run 1. |
| 2026-11-08T06:32 | implementer-hooks-015 (message) | Round 1 sub-entry: CR-1 fix confirmation at agent-output `96e123d` | CR-1 RESOLVED. `verification/015/m0-testresults-paths-037935d.txt` holds 54 paths, 0 under `bot/`. Its membership equals a second, differently shaped instrument (`git ls-tree -r --name-only 037935d`, test-shaped files): `diff` empty. |
| 2026-11-08T06:32 | implementer-hooks-015 (message) handoff at website `be881c9` | Round 2: review M1 (F-1 to F-11), `037935d..be881c9` | REJECTED. CR-3 MEDIUM: sign-out with a cached `null` skips the revoke and the `Accounts` update. CR-4 MEDIUM: the cookie parser throws on legal `%` octets. CR-5 LOW: revoke failures are silent. M1-a, b, d, e, f, g, j and k pass. M1-h reopened under D21 (plan rev 10) and is re-checked at the fix SHA. The `be881c9` "formatting only" claim holds for production code. |

## Round 1 (M0, website `037935d`) — dispositions

- CR-1 LOW Round 1 RESOLVED — the 54-path base list is stored at agent-output `96e123d`. Check that fails if it returns: `diff` against `git ls-tree` at `037935d`, recorded in the changelog row above.
- CR-2 INFO Round 1 ROUTED — the typecheck gate reads git-ignored `.next` output. Routed to QA Phase 2 by message (`1109c72d`). No implementer action owed.
- Round 1 verdict: APPROVED_WITH_COMMENTS for M0. Its argument is in the commit that carried it (`0c3e7f9`).

## Round 2 scope and identity

- **Tree.** website `be881c9`, the M1 `Handoff-At`. Files were read with `git show be881c9:<path>`.
- **Moved branch.** At the end of the round the chain branch was at `69b17af` (`fix(auth): handle a recent-messages rejection …`). That commit is M1-h's D21 change, outside this tree. It gets its own sub-entry when handed off.
- **Criteria recorded at round open** (plan § M1, rev 8 at `bf10a46`): M1-a to M1-k as written there.
- **Growth: rev 9 and rev 10 (`bceb84a`), committed during the round.** I read these, but did not verdict them against `be881c9`.
  - **M1-c, rev 9:** "no account found" becomes `NoResultError` or a falsy return, with a lookup-error residue. AF-17 (steering `904ec0d`) then sends M1-c to a rev 11 that is not yet written.
  - **M1-f, rev 9:** the premise is corrected, and RK-7 is added.
  - **M1-h, rev 10:** restated to D21's property ("every promise `hydratedAuthCallback` starts has a rejection handler attached before the function next awaits anything else") and reopened for one change.
  - Routing: M1-h's limb-scoped re-verdict is owed at the D21 fix's SHA. M1-c's is owed at the SHA that carries rev 11.
- **Evidence process.**
  - **Production limbs:** the diff read at `be881c9`, plus my own probes, executed in git-archive exports with website's `node_modules` linked read-only. The probes exercise the real modules under the suite's own stub shapes, so their output observes the code. They are not a model of it.
  - **Mutation and red/green rows:** the implementer's captures only. The mutation sweep is QA's.

### Per-limb result at `be881c9` (rev 8 criteria)

| Limb | Result | Basis |
|---|---|---|
| M1-a | Met | All four `in` sites return before the query on an empty list: `getUserRecentMessages`, `getPartialMessages` (own-messages limb kept), `authorizeUser` (`oldMessageCount: 0`, the same shape as no ids) and `getOldMessages`. Sweep re-run: `git grep -n "'in'," be881c9 -- src bot`, non-test → 4. The cross-check `['"](not in\|in)['"]` → 4. Same sites. |
| M1-b | Met | `cron.ts` uses `'is', null`. `git grep -nE "'(=\|!=\|<>)', null"` → 0. |
| M1-c | **Not met**: CR-3 | Token, refused-revoke, network-failure, token-absent and no-row cells are correct as built. A cached `null` drops the clear-out for an existing row. |
| M1-d | Met | `>=`, with today's text, in `upsertMessage`. |
| M1-e | Met | `/^(0\|[0-9]{17,23})$/`. |
| M1-f | Met | `prop !== 'NODE_ENV'`. Importer enumeration in § Assumption Not Checked. |
| M1-g | Met; attacked | § Adversarial execution. |
| M1-h | Rev 8 text met at base and head; **reopened** under D21 | The criterion grew during the round; no verdict here. |
| M1-i | **Not met**: CR-4 | `=` in values and segments without `=` are handled. Legal `%` octets throw. |
| M1-j | Met | `getItem` returns `{ item } \| null`; all three callers read `.item`. |
| M1-k | Met | The port precedes `/dev`. |

- **Gate satisfied this round (disclosure).** The stamp-gate hook refused the first write of this round: I had typed two changelog stamps (06:36) ahead of the clock. Both rows were re-stamped with `record-edit.js` `2026-11-08T06:33`, changing the stamps only.

## Architecture Alignment

**System Architecture Reference**: `agent-output/architecture/system-architecture.md`, latest `a34ca86`. It now carries the "session→account cache outlives the session" Problem Area (AF-17).
**Alignment Status**: MINOR_DEVIATIONS

- CR-3 is a further member of the cache class the architect registered. That entry names sign-outs that skip `clearUser`. CR-3 is the converse: `clearUser` runs, but a cache value decides that the account row does not exist. The `user-session-token` key the architect's entry turns on **is** deleted in CR-3's state, so guild-admin authorisation does not outlive the sign-out there.
- The pattern claims in the implementation's Patterns Extended are confirmed at their cited sites:
  - the capturing driver extends `shared.upsert-valid.test.ts`'s `DummyDriver` idiom;
  - the handler tests follow `messageCodes.malformed-query.test.ts`;
  - the Redis stubs follow `serverCommands.get-message.test.ts`.
- The `.catch(() => {})` precedent is real (`redis.fetchGuild(...)` in `hydratedAuthCallback`). CR-5 is raised against both members.

## TDD Compliance Check

**TDD Table Present**: Yes
**All Rows Complete**: Yes. The disclosed gap (the `getPartialMessages` early-return mutant not run) is QA's sweep, as stated.
**Concerns**:
- **The sign-out fixture cannot represent the cached state.** Its Redis stub answers every `get` with `null`, a miss (`auth.sign-out.test.ts`, `vi.mock('~/utils/redis/client')`). That is CR-3's blind spot.
- **The cookie table carries no `%` octet.** That is CR-4's.
- **Test authorship.** 14 test files were changed (13 new, plus `SectionEditor.auto-remove-dispatch.test.tsx`).
  - Basenames: all 14 match the positive form.
  - The ID-token class over basenames, titles and comment lines gave 0 hits, from a hand-run of the CLAUDE.md regex. A planted control (`it('cr-1 regression')`, `// see M1-c`) fired 2 of 2.
  - Bug-form phrasing (`no longer|regress|bug|fix|previously|used to|F-n`) over the 76 title lines gave 0 hits.
  - No `// escaped:` lines; all cases are spec-form.
  - Placement: tests of `src/pages/api` modules sit in `src/server/api/__tests__/`, by the existing precedent, because a `__tests__` under `src/pages` becomes a route.
- **Convention check.**
  - `convention-check.js` in a detached worktree at `be881c9`, `--since=037935d`, `--no-eslint`: 26 files examined, 0 FAIL, 0 CANDIDATE. One SKIP: the id-token and basename check, run by hand above.
  - eslint: the worktree has no `node_modules`, so I linted elsewhere and got 0 errors and 0 warnings in all 26 files:
    - 23 files in the shared tree, each byte-identical to `be881c9` (`git diff --quiet be881c9`, clean status);
    - 3 files that have since moved, linted as `be881c9` blobs over stdin.
- **"Formatting only" claim (`be881c9`, implementation § Test Execution Results).** Settled by execution, not by argument.
  - Instrument: `verification/015/cr-emit-compare.cjs` transpiles each changed file at `9e4955a` and at `be881c9` and compares the emitted JavaScript's syntax trees. Capture: `verification/015/cr-emit-compare-run-9e4955a-be881c9.txt`.
  - Controls: an inserted token is detected, an ASI-relevant break after `return` is detected, and layout and a trailing comma are ignored.
  - Result: `src/server/api/utils/shapes.ts` and `src/server/auth.ts` are IDENTICAL, so the production half of the claim holds for every input.
  - Eleven test files differ: the disclosed import moves and assertion edits. Their adequacy is QA's gate.
  - Two instrument drafts before this one gave void results: an esbuild path that did not exist, which emitted 0 bytes for both sides, and a scanner that cannot follow template literals. I superseded both, and neither result is cited.

## Adversarial execution (M1-c revoke, M1-f guard, M1-g signature gate)

**Module-scope branches checked:**
- `interactions-edge.ts` branches on `req.method`, then `verify(...)`, then `req.body === null`. `env.DISCORD_PUBLIC_KEY` is read per call.
- `discord-verify@1.0.3` `verify` returns `false` on a missing timestamp, signature or body before any crypto. An odd-length hex key or signature becomes an empty buffer.
- Node v24.14.0's WebCrypto lacks `NODE-ED25519` (the `PlatformAlgorithm.VercelProd` name). The probe therefore maps that name to Node's `Ed25519` in a `crypto.subtle` shim. The handler's own guard and parse order is unshimmed.
- The probe does not model Vercel's runtime beyond that mapping. Request construction uses the WHATWG `Request` and `Headers`, which normalise method case and join duplicate headers, as the edge runtime does.

**M1-g (`verification/015/cr-m1-probes/interactions-edge.attack.test.ts`; captures `cr-m1-probes-run-{7b10f4e,a2592f0,be881c9}.txt`):**
- **Input class, 20 cells:**
  - methods {GET, PUT, lowercase `post`};
  - headers {none, signature only, timestamp only, both empty, odd-length, 128 non-hex, a signature of another body, a valid signature with the timestamp altered, a duplicated signature header};
  - bodies {malformed JSON, ping, command, 1 MB junk, none with a valid empty-body signature};
  - controls: a valid ping (lowercase and uppercase hex) and a valid command.
- **Oracle:** the response status; `JSON.parse` call count (a spy); and calls into a spy `edgeCommands.probe_cmd`.
- **Result at `be881c9`:**
  - every unsigned or mis-signed cell → 401 or 405, `parses=0`, `commandCalls=0`;
  - controls → 200, and the command ran once;
  - a validly signed malformed body throws (`SyntaxError`), which only the key holder can send.

**M1-c:** probed with the real `removeUserSession` under the suite's stub shapes, with the Redis stub made able to hold a value (CR-3).

**M1-f:** the guard only throws on the client. It is not a leakage boundary, because Next does not inline non-`NEXT_PUBLIC_` variables into client bundles. Its new failure mode is RK-7 (plan rev 9).

## Findings

### Critical
None.

### High
None.

### Medium

**CR-3 MEDIUM Round 2 Correctness**: sign-out takes a cached `null` for "no account" and skips the revoke and the `Accounts` update for an existing row
- **Location**:
  - `src/server/auth.ts` `removeUserSession` at `be881c9`, read through `src/utils/redis/index.ts` `fetchUserAccount`.
  - The state arises from `getItem` (M1-j, `a2592f0`).
- **Class**: A decision about what to clear or revoke is taken from a cache value whose `null` means "no usable account" (the `skipUpdate = false` loader). That loader shares the key `user-access-token:<userId>` with the `skipUpdate = true` read that sign-out needs, so the `null` is read as "no account row".
- **Enumeration**:
  - Readers of the shared key: `git grep -n "fetchUserAccount(" be881c9 -- src bot`, non-test → 3 calls.
    - `auth.ts` `removeUserSession` (`skipUpdate = true`) is the member.
    - `authCallback` and `hydratedAuthCallback` (`skipUpdate = false`) are the `null` producers.
  - Loaders that return `null` in `fetchUserAccount`: 2, `!account.refresh_token` and a refused refresh. The probe exercises the second.
  - Blind spot: this predicate cannot see another cache key shared by two loaders with different value semantics. `fetchAccountFromSession` and `fetchUserGuilds` each have one loader per key by reading, which is not an enumeration.
- **Issue**: Executed in an isolated export with the Redis stub able to hold a value (`verification/015/cr-m1-probes/signout.cached-null.test.ts`, driver `cr-m1-probes/run.sh`):

  | Commit | Cache key holds `"null"`, account row present with tokens |
  |---|---|
  | `7b10f4e` (M1-c, before M1-j) | `fetchCalls=1 accountsUpdates=1 dbQueries=2`, three keys cleared |
  | `a2592f0` (M1-j) | `fetchCalls=0 accountsUpdates=0 dbQueries=0`, two keys cleared |
  | `be881c9` | `fetchCalls=0 accountsUpdates=0 dbQueries=0`, two keys cleared |

  - The same probe's producer cell shows `hydratedAuthCallback` writing `"null"` to that key when Discord answers the refresh with `{ error: 'invalid_grant' }`. The session callback then returns `{}`, the client de-authenticates, and sign-out follows. So the state is on the ordinary path for exactly these users.
  - The miss control does the full clear-out at all three commits.
  - Rev 8's M1-c says the DB clear-out runs for every session in the class. Here the `Accounts` row keeps both token strings after sign-out, and the token property ("every session with one") sends no revoke.
  - Rev 9 now names "a falsy return" as "no account found". That makes the two M1-c limbs disagree in this state, so it is a plan-level gap as well as a code defect.
  - **Magnitude** (read, not measured): with the refused-refresh producer, the access token is already past `expires_at` and Discord has rejected the refresh token, so the skipped revoke targets dead tokens. The `!refresh_token` producer can carry a live `access_token` (the `redis.cached-null-hit.test.ts` fixture has exactly that row), but how often such rows exist in production is not measured.
  - The `user-session-token` key is deleted in this state (see Architecture Alignment).
  - Severity floor: M1-c relies on the clear-out with no assertion that fails when it is lost. Every sign-out cell's stub answers `get` with a miss.
- **Required Action**: sign-out's clear-out and revoke must depend on the `Accounts` row, never on a cache value written by a loader with different semantics.
  - **Preferred (structural)**: `removeUserSession` reads the row from Postgres directly, not through `getFromCache`. Or the `skipUpdate` variants get distinct keys. Either way, "no account found" becomes exactly `NoResultError`, and the falsy-return member disappears.
  - **Minimum**: on a falsy cached value, `removeUserSession` deletes the cached key and re-reads the row before deciding.
  - Fixture property for the test: the Redis stub must be able to hold a value, with `get` answering from a store, as `redis.cached-null-hit.test.ts`'s stub already does. The new cell must be red at `a2592f0` and `be881c9` and green at `7b10f4e`; that is its falsity signature.
  - **Routing**: rev 9's "falsy return" text and AF-17's rev 11 both reshape M1-c, so the **planner** folds this into rev 11 before the implementer builds it. Delivered to steering-hooks-015 as an owner-needing scope item on M1-c.

**CR-4 MEDIUM Round 2 Input robustness**: the cookie parser throws on legal `%` octets, so `/message` fails to render
- **Location**: `src/utils/parseServerCookies.ts` default export at `be881c9`. Its one caller is `src/app/_navigation/Redirects/Server.tsx`, rendered by `src/app/message/layout.tsx`.
- **Class**: A request-header parser that lets a decoding error escape for input the header's grammar admits fails the whole render for that request.
- **Enumeration**:
  - Hand-written Cookie-header parsers: `git grep -nE "get\('cookie'\)|headers\.cookie|document\.cookie" be881c9 -- src bot`, non-test → 5 lines.
    - The member: `parseServerCookies.ts`.
    - `Providers.tsx` passes the raw header to next-auth's `getSession`.
    - `CookieConsent.tsx` writes, never parses.
    - Two are comments.
  - `decodeURIComponent` call sites, non-test → 4: two in `parseServerCookies.ts`, both members. `Providers.tsx` decodes a query string and `onCopy.ts` a clipboard fragment; those are other inputs, not this class.
  - Blind spot: these predicates cannot see a parser reached through a helper that receives the header under another name.
- **Issue**:
  - RFC 6265 `cookie-octet` admits `%`. Executed (`cr-m1-probes/cookies.percent.test.ts`, run `cr-m1-probes-run-be881c9.txt`), `pref=100%`, `x=%E0%A4%A` and `a%=1`, each beside a valid session cookie, throw `URIError: URI malformed`. The control `x=a%20b` yields the session cookie.
  - The throw escapes `Redirects/Server`, so the `/message` layout fails for any request carrying such a cookie from any source on the domain. This is the consequence F-9 named, through a third input form.
  - M1-i's property, "returns a value for every well-formed segment", does not hold.
  - Next's own parser (`next/dist/compiled/@edge-runtime/cookies`) catches the decode error per segment.
  - Magnitude: unmeasured. How often such cookies occur on the production domain is a hypothesis.
- **Required Action**: no decode error in a cookie segment may escape the parser.
  - **Preferred (structural)**: read the session cookie with `(await cookies()).get(name)` from `next/headers`, whose parser tolerates malformed escapes, and delete `parseServerCookies`. A second implementation of cookie parsing then cannot drift.
  - **Minimum**: decode each segment inside `try`/`catch`, keeping the raw text on failure, at both call sites.
  - The test table gains a malformed-escape segment beside the session cookie. Falsity signature: it must be red at `be881c9`, `URIError`.

### Low/Info

**CR-5 LOW Round 2 Observability**: a failed or refused token revoke leaves no trace
- **Location**: `src/server/auth.ts` `revokeAccessToken` at `be881c9`.
- **Class**: A best-effort call whose failure is swallowed without a log line makes a security-relevant act unverifiable after the fact.
- **Enumeration**:
  - `git grep -c "catch(() => {})" be881c9 -- src`, non-test → `auth.ts` 2: the revoke, and `redis.fetchGuild(...)`'s cache warm.
  - A non-2xx revoke is unchecked as well (`fetch` resolves on 4xx and 5xx).
  - Blind spot: this predicate cannot see `.catch(() => undefined)`, `.catch(noop)` or an empty `try`/`catch`.
- **Issue**: A refused revoke (400) or a network failure is indistinguishable in the logs from a success. The plan's "a failed revoke never prevents sign-out" is met; nothing records it.
- **Required Action**:
  - **Minimum**: log a revoke that rejects or answers non-2xx, without the token, using the in-file `console.error` idiom (`redis/index.ts` `getItem`, `refreshUserAccessToken`). The cache-warm member may stay silent.
  - Non-blocking. It is an operator-visible signal, so UAT should confirm the line appears on a refused revoke.

## Verdict

**Status**: REJECTED
**Rationale**:
- M1-c and M1-i do not meet their rev 8 properties at `be881c9` (CR-3, CR-4). Each was shown by execution with a passing control.
- Each is a behaviour the milestone claims with no assertion able to fail when it is lost: the sign-out fixture cannot hold a cache value, and the cookie table has no `%` octet. Per the severity floor, each blocks hand-off to QA.
- The other nine limbs are met as recorded, or reopened by the plan itself (M1-h).

## Required Actions

1. **CR-3 (planner first, then implementer).** The planner folds the cached-`null` member into rev 11's M1-c, alongside AF-17. The implementer then builds sign-out on the row, not the cache value, with a cell that holds a cached value.
2. **CR-4 (implementer).** No decode error escapes the cookie parser. Preferably, use `next/headers` `cookies()`.
3. **CR-5 (implementer, optional this round).** Log a refused or failed revoke.
4. **Re-review.** One sub-entry covers M1-c (CR-3 and AF-17 at rev 11), M1-h (D21, `69b17af` or later) and M1-i (CR-4), each at its fix SHA.

## Assumption Not Checked

- **Round 1:** This review assumes vitest's node project collects and executes a case under `bot/**/__tests__` at `037935d`, and does not test it.
  - Falsity signature: a `bot/**/__tests__` file absent from `testResults` while the counts hold.
  - Owner: QA Phase 2. Closed there by `qa-m0-bot-collection-probe` (QA, `bf10a46`).
- **Round 2:** This review assumes no client bundle reads a non-`NEXT_PUBLIC_` key, other than `NODE_ENV`, through `env.mjs` at `be881c9`, and does not test it.
  - I enumerated importers by `git grep -l "env.mjs"` and saw no server-key read in `constants/index.ts` or `usePusher.ts`. I ran no bundle analysis and no `next build`.
  - Falsity signature: a page that throws "Attempted to access a server-side environment variable on the client" on load (RK-7).
  - Owner: UAT's editor walks B-2 to B-5.

## Next Steps

- **Implementer** (implementer-hooks-015): CR-4, and CR-5 optionally. CR-3 waits for the planner's rev 11.
- **Planner** (via steering-hooks-015, owner-needing scope on M1-c): fold CR-3 into rev 11 with AF-17.
- **QA Phase 2 for M1** waits for the re-review sub-entry.
- **UAT:** the Round 2 Assumption Not Checked (RK-7 falsifier), and CR-5's log line once added.
