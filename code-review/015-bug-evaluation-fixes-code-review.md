---
ID: 015
Origin: 015
UUID: 861e5f61
Reviewed-At: "da24eb7 — repos=website; Round 10 (M5) and the Round 7 sub-entry (M4 D29, QAF-25) at da24eb7; the Round 2 sub-entry (CR-15) at 3031878; plan rev 21 (3d193f9), rulings read to agent-output c1be05e"
Status: In Review
Status-Detail: "Round 10 (M5 at da24eb7): REJECTED for M5-h only — CR-18 MEDIUM, JSON objects of the wrong shape still crash /preview; M5-a to M5-g met, CR-19 LOW. M4's D29 change and QAF-25 cells (Round 7 sub-entry at da24eb7): CR-14 RESOLVED, CR-17 LOW; M4 stays APPROVED_WITH_COMMENTS. CR-15 RESOLVED at 3031878."
Round: 10
Verdict: REJECTED
---

# Code Review: Plan 015 — Bug-evaluation fixes

**Plan Reference**: `agent-output/planning/015-bug-evaluation-fixes.md`.
- Round 1 read rev 8 at `ec45936`.
- Round 2 recorded its criteria from rev 8 at `bf10a46` and read rev 9 and rev 10 at `bceb84a` as growth.
- The Round 2 sub-entry and Round 3 review against rev 13 (`9cbe755`), whose delta `14fe94f..9cbe755` I also read as one of its gates (steering's brief, 2026-11-08).
- Round 4 reads the delta `9cbe755..565e240` (revs 14–16) as one of its gates (steering's brief, 2026-11-08, after `/clear`).

**Implementation References**:
- `implementation/015-bug-evaluation-fixes-m0-implementation.md` (`6299c9b`, `Handoff-At` 037935d).
- `implementation/015-bug-evaluation-fixes-m1-implementation.md` (`7f45611`, `Handoff-At` be881c9; § Fix Round 1 at `3ba52f3`, `Handoff-At` 6001f7f; § Fix Round 2 at `c938573`, `Handoff-At` 579e8b2).
- `implementation/015-bug-evaluation-fixes-m2-implementation.md` (`3ba52f3`, `Handoff-At` 6001f7f).
- `implementation/015-bug-evaluation-fixes-m4-implementation.md` (`d30916f`, `Handoff-At` 1e12837); reopened at `40ece24`, `Handoff-At` 6c42032, for D29 and QAF-25).
- `implementation/015-bug-evaluation-fixes-m5-implementation.md` (`40ece24`, `Handoff-At` da24eb7).
- The M1 document again at `40ece24` (§ CR-15, `Handoff-At` 3031878).

**Date**: 2026-11-08
**Reviewer**: Code Reviewer (code-reviewer-hooks-015)

## Changelog

| Date (UTC) | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-08T06:03 | steering-hooks-015 → code-reviewer-hooks-015 (brief); implementer-hooks-015 handoff at website `037935d` | Round 1: review M0 | APPROVED_WITH_COMMENTS. CR-1 LOW and CR-2 INFO. TDD row 2's missing pre-change red closed by `verification/015/cr-m0-bot-typecheck-probe.sh`, run 1. |
| 2026-11-08T06:32 | implementer-hooks-015 (message) | Round 1 sub-entry: CR-1 fix confirmation at agent-output `96e123d` | CR-1 RESOLVED. `verification/015/m0-testresults-paths-037935d.txt` holds 54 paths, 0 under `bot/`. Its membership equals a second, differently shaped instrument (`git ls-tree -r --name-only 037935d`, test-shaped files): `diff` empty. |
| 2026-11-08T06:32 | implementer-hooks-015 (message) handoff at website `be881c9` | Round 2: review M1 (F-1 to F-11), `037935d..be881c9` | REJECTED. CR-3 MEDIUM: sign-out with a cached `null` skips the revoke and the `Accounts` update. CR-4 MEDIUM: the cookie parser throws on legal `%` octets. CR-5 LOW: revoke failures are silent. M1-a, b, d, e, f, g, j and k pass. M1-h reopened under D21 (plan rev 10) and is re-checked at the fix SHA. The `be881c9` "formatting only" claim holds for production code. |
| 2026-11-08T06:44 | implementer-hooks-015 (message) handoff at website `6001f7f`; steering-hooks-015 (message, review against plan rev 13 `9cbe755`) | Round 2 sub-entry: M1 fix round 1 (`be881c9..6001f7f`) | CR-4 RESOLVED (structural; re-attacked, `cr-m1-cookie-reattack-run1.txt`). M1-i is met under rev 13. CR-5 DECLINED by the implementer. CR-3 stays open: folded at rev 12, code held. M1-h is held for the rev 13 round, and the rebuild owes one cell per decision-table row. New: CR-6 LOW (the CR-4 sweep's `Providers.tsx` disposition) and CR-7 LOW (rev 13 M1-i's "present"). Round 2's REJECTED stands for M1-c and M1-h only. |
| 2026-11-08T06:44 | implementer-hooks-015 (message) handoff at website `6001f7f` | Round 3: review M2 (F-12, F-13, F-14, F-43; QAF-1) against plan rev 13 | APPROVED_WITH_COMMENTS. M2-a to M2-d and QAF-1 are met. CR-8 LOW: the colour sweep misses `Picker.tsx`. CR-9 LOW: a lint suppression keeps the dead `validateEmbed`. CR-10 LOW: the touched supplemental test file keeps a transcription and tautologies. |
| 2026-11-08T06:57 | steering-hooks-015 (message, after `/clear`) | Round 4: plan gate read, `9cbe755..565e240` (revs 14–16): M1-i (CR-7), M2-a/M6-f (CR-8), M4-d (D24–D26) | REJECTED for M4-d only. CR-6, CR-7 and CR-8 are dispositioned by the folds. CR-11 MEDIUM: M4-d's `getFromUrl` property names the channel and message groups but not the guild group, which is the only input to the authorization gate. CR-12 HIGH, pre-existing on `master`, escalated: `getFromUrl` authorizes the link's guild and fetches the link's channel with the bot token, and nothing ties the two together. Instrument: `verification/015/cr-m4d-link-class-sweep.sh`. |
| 2026-11-08T06:59 | planner-hooks-015 (message), plan rev 17 at `94e9987` | Round 4 sub-entry: CR-11 fix confirmation | CR-11 RESOLVED. M4-d's `getFromUrl` limb is now restated by destination: the link's own guild id goes to `authorizeGuildAdmin`, and its channel and message ids go to the request. Round 4 is now APPROVED_WITH_COMMENTS. CR-12 is with the owner. The rest of rev 17 (the two-site enumeration, M-C4-1) is outside this sub-entry. |
| 2026-11-08T07:04 | steering-hooks-015 (message) | Round 5: plan gate read, `565e240..67cb5e7` (rev 17–18), M4-d only: M-C4-1's two sites and the D27 rider for CR-12 | APPROVED_WITH_COMMENTS. The two-site sweep reproduces (2 sites). The CR-12 rider's property and cell are discriminating. CR-13 LOW: `redis.fetchChannel`, which the rider reuses, types Discord's channel as `Guild`, so `guild_id` is not on its type. The M4 code review becomes Round 6. |
| 2026-11-08T07:06 | steering-hooks-015 (message) | Round 6: plan gate read, `67cb5e7..330348f` (rev 19), CR-12 rider only | APPROVED, no findings. Belonging as `guild_id` equality refuses an absent `guild_id`. The three refusal texts match `fetchChannel` at `6001f7f` word for word. The unmapped failures (no response; cache-lock wait timeout) throw before any content, so the safety property covers them. The M4 code review becomes Round 7. |
| 2026-11-08T07:08 | qa-hooks-015 (message; Assumption Not Checked routed from `qa/015-bug-evaluation-fixes-qa.md` `a47f5e9`) | Round 6 sub-entry: `authorizeGuildAdmin`'s refusal path, read as the rider's premise | No finding. A signed-in non-owner, non-Administrator of server A is refused with FORBIDDEN before any message fetch. The admin-bit test was run on the real module, 6 of 6 as expected (`verification/015/cr-m4d-admin-bit-probe-run1-6001f7f.txt`). Stated residue: the 600 s `user-guilds` cache. |
| 2026-11-08T07:21 | implementer-hooks-015 (message) handoff at website `1e12837`; steering-hooks-015 (Round 7 held for one tree, option (a)) | Round 7: review M4 (F-16, F-17, F-18, F-27 at both sites, D27 rider, CR-11, CR-13) against plan rev 19 | APPROVED_WITH_COMMENTS. Every limb is met. The rider was attacked on the real `getFromUrl` with only Redis, Postgres and Discord faked: 26 cases at `1e12837` all refused or were controls as expected, and the attack leaks at `6001f7f` (`cr-m4-getfromurl-attack-run2/3`). CR-14 LOW: the two F-27 sites answer a failed *webhook* fetch differently. CR-11 and CR-13 RESOLVED. |
| 2026-11-08T07:25 | implementer-hooks-015 (message) handoff at website `579e8b2` (§ Fix Round 2, `c938573`) | Round 2 sub-entry: the M1-c and M1-h rebuild (`1e12837..579e8b2`), plus CR-9 and CR-6 | Round 2 is now APPROVED_WITH_COMMENTS for M1. CR-3 RESOLVED, structurally: sign-out decides from the `Accounts` row, and `skipUpdate` is gone. My probes give 9 of 9 rows as expected at `579e8b2`, and they go red at `6001f7f` on cached `null` and on the lookup error. M1-h: every one of the eight rows has a cell. CR-15 LOW: row 2's "M rejects after the function returned" member has no cell, and by reasoning it is covered by the during-A cells. CR-9 and CR-6 RESOLVED. |
| 2026-11-08T07:26 | steering-hooks-015 (message) | Round 8: plan gate read, `330348f..e118cc3` (rev 20, D29 for CR-14) | REJECTED for the webhook-load limb only. CR-16 MEDIUM: the limb places "Invalid URL" "at the webhook URL field" and "under the field" at both sites, but at `1e12837` the New Message dialog has no field-level error. Its webhook errors render in one shared line below the load options. The rest of the delta (the old-message clause now scoped to the message fetch, D29's registration) is approved. |
| 2026-11-08T07:29 | steering-hooks-015 (message); planner-hooks-015 (message) | Round 9: plan gate read, `e118cc3..3d193f9` (rev 21: the CR-16 fold, D30) | APPROVED, no findings. CR-16 RESOLVED, option (a): the dialog's "Invalid URL" goes on its shared error line, and the send page keeps its field error. D30 removes M3, which carried no code-review limb. Its evidence (`m3-chrome-read/README.md`, `8996505`) exists and states what the plan cites. No M3 code is on the chain branch. |
| 2026-11-08T07:55 | implementer-hooks-015 (message) handoff at website `6c42032` (M4 reopen) and `3031878` (M1); steering-hooks-015 (brief, after `/clear`) | Round 2 sub-entry: CR-15 at `3031878` | CR-15 RESOLVED. The row-2 after-return cell is red under `m1h-message-handler-dropped` (its title is among the 6 failures; control 30 of 30). |
| 2026-11-08T07:55 | same handoff | Round 7 sub-entry: M4's D29 change and the QAF-25 cells (`579e8b2..46a9cab`, plus `6c42032`), bound to `da24eb7` | M4 stays APPROVED_WITH_COMMENTS. CR-14 RESOLVED: the dialog shows "Invalid URL" on its shared error line, no field error was added, and each site's cell asserts the literal exactly once, in place. CR-17 LOW: the two sites write the literal by hand, while D24's sibling text is a shared constant. The rider's files are unchanged, so the attack was not re-run. |
| 2026-11-08T07:55 | implementer-hooks-015 (message) handoff at website `da24eb7`; steering-hooks-015 (brief) | Round 10: review M5 (F-19 to F-26) against plan rev 21, with the rulings `a49da66` and `c1be05e` recorded as growth | REJECTED for M5-h only. CR-18 MEDIUM: a `/preview` JSON object of the wrong shape still crashes the page. 4 of 5 probed members throw in `makeEditable`, with both controls as expected (`verification/015/cr-m5-probes/run1-da24eb7.txt`). Steering's 07:30Z call puts that class in M5-h. M5-a to M5-g are met. CR-19 LOW: a hand-rolled latest-value ref where `useLatest` is the repo's idiom. |

## Round 1 (M0, website `037935d`) — dispositions

- CR-1 LOW Round 1 RESOLVED — the 54-path base list is stored at agent-output `96e123d`. Check that fails if it returns: `diff` against `git ls-tree` at `037935d`, recorded in the changelog row above.
- CR-2 INFO Round 1 ROUTED — the typecheck gate reads git-ignored `.next` output. Routed to QA Phase 2 by message (`1109c72d`). No implementer action owed.
- Round 1 verdict: APPROVED_WITH_COMMENTS for M0. Its argument is in the commit that carried it (`0c3e7f9`).

## Round 2 (M1, website `be881c9`)

### Scope and identity

- **Tree.** website `be881c9`, the M1 `Handoff-At`. Files were read with `git show be881c9:<path>`.
- **Criteria recorded at round open:** plan § M1, rev 8 at `bf10a46`. Rev 9 and rev 10 (`bceb84a`) landed during the round, and I recorded them as growth: M1-c's no-account class, M1-f's premise, and M1-h restated to D21.
- **Evidence process.**
  - **Production limbs:** the diff read at `be881c9`, plus my own probes, executed in git-archive exports with website's `node_modules` linked read-only. The probes exercise the real modules under the suite's own stub shapes.
  - **Mutation and red/green rows:** the implementer's captures. The mutation sweep is QA's.

### Per-limb result at `be881c9` (rev 8 criteria)

| Limb | Result | Basis |
|---|---|---|
| M1-a | Met | All four `in` sites return before the query on an empty list. Sweep re-run: `git grep -n "'in'," be881c9 -- src bot`, non-test → 4. The cross-check `['"](not in\|in)['"]` → 4. Same sites. |
| M1-b | Met | `cron.ts` uses `'is', null`. `git grep -nE "'(=\|!=\|<>)', null"` → 0. |
| M1-c | **Not met**: CR-3 | A cached `null` drops the clear-out for an existing row. |
| M1-d | Met | `>=`, with today's text, in `upsertMessage`. |
| M1-e | Met | `/^(0\|[0-9]{17,23})$/`. |
| M1-f | Met | `prop !== 'NODE_ENV'`. |
| M1-g | Met; attacked | § Adversarial execution. |
| M1-h | Reopened under D21 | The criterion grew during the round. |
| M1-i | Not met at `be881c9` (CR-4); **met at `6001f7f`** | § Round 2 sub-entry. |
| M1-j | Met | `getItem` returns `{ item } \| null`; all three callers read `.item`. |
| M1-k | Met | The port precedes `/dev`. |

- **Formatting-only claim (`be881c9`).** Settled by execution, comparing syntax trees: `verification/015/cr-emit-compare.cjs`, run `cr-emit-compare-run-9e4955a-be881c9.txt`.
  - Controls: an extra token and an ASI-relevant break are detected; layout and a trailing comma are ignored.
  - `shapes.ts` and `auth.ts` are IDENTICAL.
  - Two void drafts of the instrument were superseded and are not cited.
- **Gate satisfied (disclosure).** The stamp-gate hook refused this round's first write, because I had typed two changelog stamps ahead of the clock. Both rows were re-stamped through `record-edit.js`'s now-token, changing the stamps only.

### Adversarial execution (M1-c revoke, M1-f guard, M1-g signature gate)

- **M1-g** (`verification/015/cr-m1-probes/interactions-edge.attack.test.ts`; captures `cr-m1-probes-run-{7b10f4e,a2592f0,be881c9}.txt`).
  - Input class, 20 cells: methods {GET, PUT, lowercase `post`}; nine header shapes, from none and partial through odd-length, non-hex, another body's signature, an altered timestamp and a duplicated signature header; bodies {malformed JSON, ping, command, 1 MB junk, none}.
  - Controls: a valid ping (lowercase and uppercase hex) and a valid command.
  - Oracle: status, a `JSON.parse` spy and a command spy.
  - Result: every unsigned or mis-signed cell → 401 or 405, with `parses=0` and `commandCalls=0`. Controls → 200.
  - Disclosed shim: Node lacks the `NODE-ED25519` name that `PlatformAlgorithm.VercelProd` uses, so the probe maps it to `Ed25519`. The handler's guard and parse order runs unshimmed.
- **M1-c:** probed with the real `removeUserSession`, using a Redis stub able to hold a value (CR-3).
- **M1-f:** the guard only throws on the client. It is not a leakage boundary; its failure mode is RK-7.

### Round 2 findings

**CR-3 MEDIUM Round 2 Correctness**: sign-out takes a cached `null` for "no account" and skips the revoke and the `Accounts` update for an existing row
- **Location**: `src/server/auth.ts` `removeUserSession` at `be881c9`, read through `src/utils/redis/index.ts` `fetchUserAccount`. The state arises from `getItem` (M1-j, `a2592f0`).
- **Class**: A decision about what to clear or revoke is taken from a cache value whose `null` means "no usable account" (the `skipUpdate = false` loader). That loader shares the key `user-access-token:<userId>` with the `skipUpdate = true` read that sign-out needs.
- **Enumeration**:
  - `git grep -n "fetchUserAccount(" be881c9 -- src bot`, non-test → 3 calls: `removeUserSession` (the member), `authCallback` and `hydratedAuthCallback` (the `null` producers).
  - 2 `null`-returning loader branches: `!refresh_token` and a refused refresh.
  - Blind spot: another key shared by loaders with different semantics; by reading, `fetchAccountFromSession` and `fetchUserGuilds` each have one loader.
- **Issue**: Executed (`verification/015/cr-m1-probes/signout.cached-null.test.ts`):

  | Commit | Cache key holds `"null"`, account row present with tokens |
  |---|---|
  | `7b10f4e` (M1-c, before M1-j) | `fetchCalls=1 accountsUpdates=1 dbQueries=2`, three keys cleared |
  | `a2592f0` (M1-j) | `fetchCalls=0 accountsUpdates=0 dbQueries=0`, two keys cleared |
  | `be881c9` | `fetchCalls=0 accountsUpdates=0 dbQueries=0`, two keys cleared |

  - The producer cell shows a refused refresh caching `"null"`. The `user-session-token` key is still deleted.
  - Magnitude, read rather than measured: dead tokens on the refused-refresh path. A possibly live token on the `!refresh_token` path, a row population that is unmeasured.
- **Required Action**: sign-out decides on the `Accounts` row, never on a cache value written by a loader with different semantics.
  - **Preferred (structural)**: a direct Postgres read.
  - The test's Redis stub must hold a value. The new cell must be red at `a2592f0` and `be881c9` and green at `7b10f4e`.
- **State at `6001f7f`:** the plan folded it at rev 12, and rev 13 keeps it: "the account decision rests on the row … never read from a value cached under `user-access-token:<userDbId>`", and the "falsy return" member is withdrawn. The rev 13 text matches this finding's class and Preferred action. The code is held until the rev 13 gates pass, so CR-3 stays open and is re-verified at the rebuild SHA.

CR-4 MEDIUM Round 2 RESOLVED — the project cookie parser is deleted. `Redirects/Server.tsx` reads the session cookie through `next/headers` `cookies()` (`6001f7f`).
- Class residual: `git grep -n parseServerCookies 6001f7f -- src` → 0.
- Re-attacked from first principles against the parser `cookies()` wraps (`verification/015/cr-m1-probes/cookie-parser-reattack.cjs`, run `cr-m1-cookie-reattack-run1.txt`, next 16.1.6). 14 headers, including the three that threw, a lone-surrogate escape and 10,000 malformed segments: 0 throws, and the session cookie was found in every well-formed case.
- Check that fails if it returns: `Server.session-cookie-redirect.test.ts`'s three malformed-`%` cells (red at the pre-change `Server.tsx` on `URIError`, implementation § Fix Round 1).

CR-5 LOW Round 2 DECLINED — by the implementer (§ Fix Round 1): the plan sets no logging requirement on the revoke, and the implementer offers to add one on request. The operator-visible gap (a refused revoke leaves no log line) stays for UAT to observe.

**CR-6 LOW Round 2 (sub-entry) Class sweep**: the CR-4 sweep's "always well-formed" disposition for `Providers.tsx` does not hold
- **Location**: `src/app/_components/Providers.tsx` `getMessage` and `src/middleware.ts` default export at `6001f7f`. The disposition is in M1 implementation § Fix Round 1, Class Sweep (CR-4).
- **Class**: A decode of an internal request header whose only writer is middleware, where the middleware neither always runs nor always overwrites the header. Client input therefore reaches a throwing decode.
- **Enumeration**: `git grep -nE "decodeURI(Component)?\(" 6001f7f -- src bot`, non-test → 2.
  - `Providers.tsx` `getMessage` is the member.
  - `onCopy.ts` decodes a fragment the editor itself just wrote through `setFragmentData`, so the implementer's disposition holds there.
  - Blind spot: this predicate cannot see a header-derived value decoded by a library (`queryString.parse`) rather than by `decodeURI*`.
- **Issue**, by reading at `6001f7f`:
  - `middleware.ts` clones the request's headers and sets `x-query-params` only when there is a query string. Its matcher covers only `/message/(.*)`, `/api/guilds/(.*)` and `/preview`.
  - `Providers` is a root-level provider. On any other path, and on a matched path with no query string, a client-sent `x-query-params` reaches `decodeURIComponent` unchanged. `x-query-params: %` would throw.
  - Magnitude: the client can only fail its own request, so this is not a cross-user exposure. It was not executed (no running server); this is a reading, stated as one.
  - It sits outside F-1–F-50 (D6) as a defect; the finding is the disposition's factual error.
- **Required Action**:
  - **Minimum**: correct the disposition line in the M1 document to name the pass-through.
  - **Preferred (structural)**: middleware always deletes an inbound `x-query-params` before setting it. That is a source change outside the pool, so it is the planner's call whether it rides this chain or goes to a handoff.
  - Non-blocking.

**CR-7 LOW Round 2 (sub-entry) Plan text, M1-i rev 13**: "present" is wider than what `cookies()` reports
- **Location**: plan § M1-i, rev 13 (`9cbe755`), its Property sentence.
- **Class**: A property quantified over every header the grammar admits, whose observable ("present") is computed by a parser that drops some admitted pairs.
- **Enumeration**: re-attack run `cr-m1-cookie-reattack-run1.txt`. Of 14 headers, 1 grammar-admitted session pair is dropped: `next-auth.session-token=ab%` → `null`, because Next skips a pair whose value fails to decode. Blind spot: only the inputs listed in the probe.
- **Issue**: For that header the component would redirect a request that carries a session cookie, which contradicts "redirects exactly when neither … is present". next-auth's own tokens never contain `%`, so the contract bars it in practice and no code change is owed. The property as written is still falsifiable by a hand-made header.
- **Required Action (planner)**: bound "present" to "as `next/headers` `cookies()` reads it", or state the residue. Non-blocking; route with the rev 13 gate round.

## Round 2 sub-entry (M1-c and M1-h rebuild, website `579e8b2`, plan rev 19)

- **Scope.** The fix diff `1e12837..579e8b2` (`12ac7ed`, `579e8b2`) is in scope: `src/server/auth.ts` `removeUserSession`, `src/utils/redis/index.ts` `fetchUserAccount` (`skipUpdate` removed), `src/utils/limits.tsx` (CR-9), and the two `auth.*` test files. It stays within CR-3, M1-h and CR-9, so it is a sub-entry. M1-c's and M1-h's criteria are unchanged since rev 13. I read them at rev 19 (`330348f`).
- **CR-3 MEDIUM Round 2 RESOLVED (structural).** `removeUserSession` reads `access_token` and `providerAccountId` from `Accounts` with `executeTakeFirst()` and never reads `user-access-token`. The class "a cache state decides the account" can no longer be represented: no reader of that key remains on the sign-out path. `fetchUserAccount` has 2 callers left (`git grep -n fetchUserAccount 579e8b2`, non-test: `authCallback` and `hydratedAuthCallback`), and neither is sign-out.
  - **Executed** (`verification/015/cr-m1-probes/signout.row-decision.test.ts`, driver `run.sh`; real `hydratedAuthOptions.events.signOut`, Kysely through the capturing driver, Redis in memory). At `579e8b2` (`cr-m1-probes-run-579e8b2.txt`), all as expected:
    - a row with a token, cache miss, cached `null`, or cached stale account: the revoke carries the row's token, there is one update with parameters `[null, null, "discord", <id>]`, and three keys are cleared;
    - a row with no token, while the cache holds a token: no revoke, one update;
    - an absent row while the cache holds an account: no revoke, no update, two keys;
    - revoke rejected or answering 500: the clear-out still runs and sign-out resolves;
    - a lookup error: two keys are cleared, then the lookup's error reaches the caller;
    - a lookup error with Redis down: the lookup's error reaches the caller, with 0 `unhandledRejection` events.
  - **Discrimination.** At `6001f7f` (`cr-m1-probes-run-6001f7f.txt`), cached `null` gives no revoke and no update, and a lookup error clears nothing: 3 red. The "cached stale account" cell passes on both trees. My plain-JSON cache value does not match the cache's `compress-json` format, so the loader treats it as a miss. That cell does not discriminate, and I make no claim from it. The implementer's cached-other-token cell is the discriminating one (red at `6001f7f`, per its record).
  - The run exits 1 for one reason only: my Round 2 probe `cookies.percent.test.ts` imports `~/utils/parseServerCookies`, which CR-4's fix deleted. That is the instrument going stale, not the tree.
- **M1-h: met.** `hydratedAuthCallback` is unchanged since `69b17af`: there are 0 lines in `1e12837..579e8b2` that touch it, and `messagePromise.catch(() => {})` is attached at creation, before the first await. Cells in `auth.hydrated-session.test.ts`, with `unhandledRejection` counted over each run:
  - row 1: M resolves, M rejects before A, M rejects after the function has left;
  - row 2: M resolves, M rejected earlier (twice);
  - row 3; row 4 at once and later; row 5;
  - row 6 during A, during G, and after G settled;
  - row 7; row 8, both orders.
  - All eight rows have a cell, which is what Round 2 asked for. The implementer's mutants are not re-run here (QA's).

**CR-15 LOW Round 2 (sub-entry) Test coverage**: row 2's "M rejects after the function has returned" member has no cell
- **Location**: `src/server/__tests__/auth.hydrated-session.test.ts` at `579e8b2`, the describe "by how the account lookup, the recent messages and the guild fetch end".
- **Class**: A member the plan names as discriminating, with no cell of its own. Rev 13's table: "Rows 1 and 2 with M rejecting after A are the paths where the function leaves without awaiting M."
- **Enumeration**: by reading the 17 cells against the 8 rows. Row 1's after-return member has a cell: "rejects with the lookup's error when the recent messages reject after the function has left". Row 2's has none: its cells are "M resolves" and "rejected earlier". That is 1 member. Blind spot: my row mapping is by title and body reading.
- **Issue**: By reasoning, not by a run, every regression I could construct for this member is already caught.
  - A handler can't be removed once it is attached. So a missing handler during A fails the "during A" cells, and a derived `.then` without a catch on the `return {}` path fails "rejected earlier".
  - So the gap is the plan's stated cell, not a known escape: LOW.
- **Required Action (implementer, non-blocking)**: add the row-2 cell. A resolves `null`, the function returns `{}`, then M rejects; assert `{}` and `unhandled` equal to `[]` after settle. Falsity signature: it fails under a mutant that leaves M with no handler on the `return {}` path, so it must be shown red on such a mutant.
- **CR-9 LOW Round 3 RESOLVED.** `validateEmbed` and its suppression are deleted: `git grep -c -w validateEmbed 579e8b2 -- src bot` returns no file, and `limits.tsx` has no `eslint-disable`.
- **CR-6 LOW Round 2 RESOLVED (Minimum).** The CR-4 sweep line is corrected in the M1 document (`3ba52f3..c938573`: 3 changed lines on `x-query-params`). The Preferred action is X-17.
- **Conventions.** eslint gives exit 0 on the 4 changed files, which are byte-identical to `579e8b2` in the shared tree. `convention-check --since=1e12837 --no-eslint` in a detached worktree gives 0 FAIL and 0 CANDIDATE (`cr-m1-convention-check-579e8b2.txt`). The ID-token check by hand gives 0 hits in both test files.
- **Verdict.** Round 2 (M1) moves from REJECTED to APPROVED_WITH_COMMENTS at `579e8b2`. CR-15 is LOW, and CR-5 is DECLINED. QA Phase 2 may take M1-c and M1-h at `579e8b2`.

## Round 2 sub-entry (CR-15, website `3031878`)

- **Scope.** `579e8b2..3031878`: one test file, `auth.hydrated-session.test.ts`, +16 lines. The diff is test-only, so this is a scoped check (M1 document § CR-15, `Handoff-At` 3031878).
- **CR-15 LOW Round 2 RESOLVED.**
  - The new cell matches the Required Action's shape. A resolves `null`, the function returns `{}`, and then M rejects. The cell asserts `{ value: {} }`, and that `unhandled` equals `[]` after the settle.
  - Its red: `mutation-m1r-m1h-message-handler-dropped-3031878.txt` lists it among the 6 failures. `grep -c` of its full title with the `×` mark gives 1. The control passes 30 of 30 (`mutation-m1r-control-3031878.txt`).
  - The title is in spec form. The ID-token check (Round 10) finds nothing outside fixture ids.
  - Check that fails if it returns: that cell.

## Round 2 sub-entry (M1 fix round 1, website `6001f7f`, plan rev 13)

- **Scope.** The fix diff `be881c9..6001f7f` for M1: `Redirects/Server.tsx`, `parseServerCookies.ts` (deleted), `auth.ts` (`69b17af`) and their tests. No touch outside the findings' and the plan's reopened limbs, so it is a sub-entry, not a round.
- **M1-i (rev 13 restatement): met.** The component renders without throwing for every probed header, and redirects only when neither session name is present. The `next/navigation` and `next/headers` mocks in `Server.session-cookie-redirect.test.ts` build the cookie store from `NextRequest(...).cookies`, the same `RequestCookies` class `cookies()` wraps, so the test's parser is the production parser. The one plan-text gap is CR-7.
- **M1-h: held, not verdicted.** Steering's 2026-11-08 message holds M1-h's code until the rev 13 round passes. Recorded for the rebuild:
  - By reading, `69b17af` attaches `messagePromise.catch(() => {})` at creation, before the first await. That satisfies all eight rows of rev 13's decision table.
  - The test cells cover rows 2 and 6 (during A, during G) only. Rows 1, 3, 4, 5, 7 and 8, and row 6 "after G has settled", carry no cell. The rebuild owes a cell per row.
  - The implementer's surviving mutant (`m1h-guild-fetch-awaited-inside-array`) is equivalent once the handler exists. Accepted.
- **M1-c: held**; CR-3 open, as above.
- **Rev 13 delta, read as a gate.**
  - M1-c's rev 12 and 13 text: no finding. It carries CR-3's class, including the cache-state members that must give the miss's outcome.
  - M1-i: CR-7.
  - M2-a's class: see CR-8 under Round 3.
  - D23 and the M8 run-2 text are outside code review's limbs.

## Round 3 (M2, website `6001f7f`, plan rev 13)

### Scope and identity

- **Tree.** website `6001f7f`, `Handoff-At` of the M2 document. M2's commit is `7befedb`; the tip also carries M1's fix round.
- **Criteria recorded at round open:** plan § M2, rev 13 (`9cbe755`): M2-a (with its rev 13 colour class and QAF-1 property), M2-b, M2-c and M2-d.
- **Evidence process.** The diff read at `6001f7f`, my own re-runs of the sweeps, and the implementer's mutant captures (`verification/015/mutation-m2-*-7befedb.txt`). I ran no mutants: QA's.

### Per-limb result at `6001f7f`

| Limb | Result | Basis |
|---|---|---|
| M2-a | Met | `embedShape` colour `.int().min(0).max(0xffffff)`; ingress `e.color !== undefined`; `EmbedEditor` border `color != null`. The picker yields 0 for black: `Picker.tsx` `hexToInt('#000000')`. Discord's documented `color` is optional and not nullable, so the `!== undefined` test is within contract. |
| M2-a, QAF-1 | Met | `embedShape` is exported and the 12 moved cases import it. `git grep -l "z.object" 6001f7f -- 'src/**/*.test.ts*'` → 0. |
| M2-b | Met | `validateEmbedAuthorName` uses `MAX_EMBED_AUTHOR_NAME_LENGTH` (256), the schema's bound. |
| M2-c | Met | "Title is too long." |
| M2-d | Met | `MAX_EMBED_FOOTER_TEXT_LENGTH` = 2048 in `messageLimits.ts`, imported by both `EmbedFooter.tsx` and `shapes.ts`. The editor's error renders as the shared `errorStateBorder` through `data-erroring-state`, the idiom of `EmbedAuthor` and `EmbedField`. The commented-out error text is pre-existing. |

### Architecture Alignment

**Alignment Status**: ALIGNED for M2.
- The constants move into `messageLimits.ts`, which `constants/index.ts` re-exports, so callers of `~/constants` are unaffected (`export *`).
- The border mirrors `ContainerEditor`'s `accent_color != null`.

### TDD Compliance Check

**TDD Table Present**: Yes. **All Rows Complete**: Yes. The footer DOM test's red is a named mutant, as disclosed.

- **Test authorship (8 changed test files, `be881c9..6001f7f`).**
  - All basenames match the positive form.
  - The ID-token check over basenames, titles and comment lines gave 0 hits. This is the same hand-run as Round 2, whose planted control fired.
- **Convention check.** In a detached worktree at `6001f7f`, `--since=be881c9 --no-eslint`: 15 files examined, 0 FAIL, 0 CANDIDATE. SKIPs: the two deleted files, `constants/index.ts` (no added lines) and the id-token check (run by hand).
- **eslint.** 0 errors and 0 warnings in all 16 changed files, each byte-identical in the shared tree to `6001f7f`.

### Round 3 findings

**CR-8 LOW Round 3 Class sweep**: the F-12 colour sweep misses `Picker.tsx`
- **Location**: `src/components/DiscordMessageEditor/components/EmbedEditor/ColorPicker/Picker.tsx` `Picker`, `defaultColor` at `6001f7f`.
- **Class**: As rev 13 states it, every site that tests an integer colour for truthiness, so that 0 reads as "no colour".
- **Enumeration**:
  - `git grep -nEi "(colou?r|accent)[A-Za-z_]*\)? *(\?[^.?]|&&|\|\|)|!(\w+\.)*[a-z_]*colou?r[a-z_]*\b|if \(!?(\w+\.)*[a-z_]*colou?r[a-z_]*\)" 6001f7f -- src bot`, non-test, CSS-class lines excluded → 3. Two are the `accent_color?:` declarations, and one is the member: `initColor ? … : '#000000'`.
  - E15's `\bcolor` cannot match `initColor`; that is the predicate's blind spot.
  - Blind spot of this predicate: a truthiness test on a colour held under a name containing neither "colo(u)r" nor "accent".
- **Issue**: For 0, `initColor` falsy gives `'#000000'`, black either way, so this member's outcome is neutral today. It is outside the plan's stated enumeration ("two members at `7ce866b`"). M6-f (the picker's six-digit default) rewrites this line.
- **Required Action**: the plan's M2-a enumeration names the member. M6-f's rewrite tests `initColor != null` and formats with `intToHex`, the six-digit helper. Non-blocking; planner and implementer at M6-f.

**CR-9 LOW Round 3 Gate satisfaction**: a lint suppression keeps dead code alive
- **Location**: `src/utils/limits.tsx` `validateEmbed` at `6001f7f`.
- **Class**: A lint finding met by suppressing the rule rather than by changing the code the rule flags.
- **Enumeration**:
  - `git diff be881c9 6001f7f | grep -c "^+.*eslint-disable"` → 1, this site.
  - `git grep -nw validateEmbed 6001f7f -- src bot` → 1, the definition only.
  - Blind spot: suppressions added through `.eslintrc` overrides or file-level `/* eslint-disable */`.
- **Issue**: The function has no reference, and the suppression exists only to keep it. The implementer disclosed it.
- **Required Action**: delete `validateEmbed` and the suppression. Deleting unreferenced code the milestone's gate flags satisfies the gate; it is not scope growth. Non-blocking.

**CR-10 LOW Round 3 Test conventions**: the touched `bugFixCoverage.supplemental.test.ts` still breaks the conventions
- **Location**: `src/utils/__tests__/bugFixCoverage.supplemental.test.ts` at `6001f7f`, touched by M2 (`7befedb`).
- **Class**: A test file touched in the chain that still carries convention departures: a local transcription of production logic (Axiom E), tautological cases, and a basename that names no production module.
- **Enumeration**, by reading the whole file (3 describes, 16 cases):
  - `useParsePathname Regex Correctness` (7 cases) declares its own `folderRegex` and `messageRegex` and imports nothing from `useParsePathname`: the zero-production-import transcription class.
  - `formatKey matches clearUser key pattern …` (2 cases) compares `formatKey(k, x)` with `formatKey(k, x)`, so it cannot fail.
  - The basename's module segment `bugFixCoverage` is no module. The shape regex passes it, so this is the regex's blind spot.
- **Issue**: The suite counts 9 cases that cannot discriminate. QA's QAF-1 owes the rename once the file is touched, and the implementer has asked QA how to split it (M2 implementation, Outstanding Item 1).
- **Required Action**: split the file by module.
  - The `constructImageUrl` cases go to a `constructImageUrl.*` file, keeping their `// escaped:` line.
  - The two literal `formatKey` cases go to a `formatKey.*` file; the tautologies are deleted.
  - The `useParsePathname` describe is converted to exercise the real hook, or deleted with the surface listed as outstanding.
  - QA decides the timing (now or with a later touch). Non-blocking for M2.

## Round 10 (M5, website `da24eb7`, plan rev 21)

### Scope and identity

- **Tree.** website `da24eb7`, the M5 `Handoff-At`, re-derived from `implementation/015-bug-evaluation-fixes-m5-implementation.md` at `40ece24`. The chain tip was `da24eb7` at the start and the end of the review, and the shared tree was clean (`git status --porcelain`: 0 lines). Files were read with `git show da24eb7:<path>`, and the diffs of `23a621e` and `da24eb7` were written to files and read in full.
- **Criteria recorded at round open:** plan § M5 at rev 21 (`3d193f9`; the plan's last commit, `daa9012`, is a Planner batch row and changes no criterion): M5-a to M5-h.
- **Growth, recorded, not absorbed.** Two rulings blocks are not in the plan yet; the planner registers them:
  - 07:30Z "M5 flow questions" (`a49da66`): M5-h's error line; M5-f's reset on open; and steering's call that valid JSON of the wrong shape rides M5-h under D28 if a probe shows it crashes.
  - 07:52Z (`c1be05e`, which landed during this round): every non-object value shows the error line, as built.
- **Evidence process.**
  - Production limbs: the diff, the sites re-read at `da24eb7`, and my probe of `/preview` (below).
  - TDD: the implementer's first-run reds and mutant summaries (`m5-sweep-summary-6c42032.txt`, `m5-sweep-summary-da24eb7.txt`), read but not re-run (QA's sweep).
  - Conventions: `convention-check --since=7ce866b` in the shared tree at `da24eb7` (`cr-m4r-m5-convention-check-da24eb7.txt`), plus the ID-token check by hand.

### Per-limb result at `da24eb7`

| Limb | Result | Basis |
|---|---|---|
| M5-a | Met | `commitLoad` calls `setAllowMenuClose(true)` before `onClose()`, as `onCancel` and `cancelChoice` already did. Its two earlier returns (`!validatedDraft`; `requiresChoice`) cannot be reached from the confirm: Load is disabled without a validated draft, and the validation effect never sets a draft that requires a choice. The cells assert the flag (Outstanding item 2). The Esc keypress is Round 10's Assumption Not Checked. |
| M5-b | Met | Copy is `isDisabled` when `toCopyText` returns `null` (a parse failure or an import-shape failure), and `onPress` copies the precomputed text. Cells cover a not-JSON draft and a non-conforming one, each pressed with no throw. |
| M5-c | Met; CR-19 | The prompt reads `hasChangedRef.current` when the event arrives. The subscription's dependencies are unchanged. |
| M5-d | Met | The `useMemo` dependencies are `[session, setSelectedGuildId]`, which is every value the memo reads. |
| M5-e | Met | One shared `formatMessageDate` compares year, month and day, and both copies call it. `getDate()` outside it: 0 hits. The duplicate is removed rather than fixed twice, as the mirror rule asks. |
| M5-f | Met (the owner's "reset on open") | An effect on `isOpen` refills the name and server when the dialog opens. The survivor `m5f-save-as-refills-on-close-too` differs only during the leave transition, which jsdom does not render. Keeping the guard is right: no finding. |
| M5-g | Met | The toast text. `Failed to refresh` has 1 hit left, in `useApiMethods.ts`, which is the real reload failure. |
| M5-h | **Not met for the ruled class (CR-18)** | Unparsable JSON and every non-object value show "Invalid message data." (as ruled at 07:52Z). A JSON object of the wrong shape still crashes the page: see the probe below. |

### Probe: `/preview` with JSON objects of the wrong shape

- **Whose output is the evidence:** the real `Page` and the real `makeEditable` at `da24eb7`, run under vitest's DOM project in an export (`git archive`, `unshare -rn`). Only `DiscordMessageEditor` and `MarkdownProvider` are stubbed. The crash happens in `makeEditable`, before the editor. I did not test how the real editor handles an object that passes `makeEditable`.
- **Instrument:** `verification/015/cr-m5-probes/page.wrong-shape-probe.test.tsx`, driver `run.sh <website> <scratch> <sha> <out>`. Run 1 is `run1-da24eb7.txt`. The export's blob of `page.tsx` equals the tree's (`0e3fc49`).
- **Controls:** `{"content":"hello"}` renders the editor with `hello`, and `null` shows the error line. Both pass.
- **Result: 4 of 5 crash.**
  - `{"embeds":5}` throws "number 5 is not iterable".
  - `{"embeds":[null]}` throws "Cannot read properties of null (reading '_key')".
  - `{"embeds":[{"fields":5}]}` throws.
  - `{"components":"x"}` throws "casted.data.components.map is not a function".
  - `{"components":[null]}` passes `makeEditable` and reaches the editor stub. What the real editor does with it is unknown.
- **Why the implementer's probe missed it:** `m5h-preview-data-probe-6c42032.txt` samples the object class with `{}` only. Its positive control also prints `rendered: ` with no text, so its "rendered" lines don't show that the editor ran.

### Architecture Alignment

ALIGNED. One date formatter replaces two copies (the one-definition pattern, A-3). No new dependency. One departure from the repo's idiom: CR-19.

### TDD Compliance Check

**TDD Table Present**: Yes. **All Rows Complete**: Yes.
- **Ordering is disclosed.** The two date-wiring rows were written after the rewiring, and their reds are named stand-in mutants. Every limb from M5-a to M5-h has a first red against the unchanged code (`m5<letter>-red-first-run.txt`).
- **Expectations are independent.** They are literal texts ("Error. Failed to delete message. Please try again.", "Invalid message data.", "Any changes you have made will be lost.", `'{\n  "content": "hi"\n}'`), fixed instants under fake timers, and guild keys written as literals. None is derived from the code under test.
- **Mutants.** 25 runs at `6c42032`, 23 killed. Both survivors are dispositioned:
  - One guard was removed in `da24eb7`. That removal preserves behaviour: `typeof null === 'object'`, so `null` still returns `null`, and the null cell stays.
  - The other is equivalent under jsdom (M5-f, above).
  - The 5 preview mutants are killed again at `da24eb7`.
- **No bug-form test.** Every title states a behaviour.
- **Conventions.**
  - convention-check: 0 FAIL, 0 CANDIDATE. Its SKIPs are the id-token basename check (no `TEST-CONVENTIONS.md`, so I ran it by hand) and two non-source paths.
  - ID-token check by hand over the 16 test files changed since `1e12837`: 8 hits, all the fixture id `'m1'` in `auth.hydrated-session.test.ts`, which the named data exemption covers. Basenames, titles and comments: 0. A planted `it("cr-12 rider")` fired.
- **Sweep reconciliation (no finding).**
  - The implementer's `JSON.parse` sweep says "10 hits" but lists 9. `git grep -c` at `da24eb7` gives 9 (3 + 4 + 1 + 1).
  - The close-flag sweep says "6 files". `git grep -c` gives 17 lines in 5 files.
  - Every hit I counted is dispositioned in its row.

### Round 10 findings

**CR-18 MEDIUM Round 10 Unhandled input class, M5-h**: a `/preview` link whose `data` is a JSON object of the wrong shape still crashes the page
- **Location**: `src/app/preview/page.tsx` `parseMessageData` and `Page` (`makeEditable({ data } as ApiMessage)`), and `src/utils/index.ts` `makeEditable`, at `da24eb7`.
- **Class**: Data from a URL reaches code that dereferences its fields, and only its JSON type is checked, not the shape of the fields that code reads.
- **Enumeration**:
  - The fields `makeEditable` dereferences: `data.embeds` (iterated), each embed (`_key`), `embed.fields` (iterated), each field (`_key`), `data.components` (`.map`), and each component (spread, then `.type`). My probe shows 4 crashing members (above).
  - Callers of `makeEditable` (`git grep -n "makeEditable(" da24eb7 -- src ':!*__tests__*'`): 8. Only `preview/page.tsx` takes its argument from a URL. The other 7 take stored data, schema-validated data or Discord API data.
  - Blind spots: the predicate cannot see a second URL-to-render path that does not call `makeEditable`. It also does not test what the real editor does with an object that passes `makeEditable`.
- **Issue**:
  - Steering ruled at 07:30Z (`a49da66`) that valid JSON of the wrong shape is the same defect on the same page, and that it rides M5-h under D28 if a probe shows a crash. The implementer's probe found only `null` because it tried a single object, `{}`.
  - The owner's 07:52Z ruling (`c1be05e`) settles non-object values, and it rests on that probe. It does not cover objects, so this finding does not conflict with it.
  - The crash is a blank page for a hand-made link, so user impact is low. But the ruled class is not met, and the behaviour M5-h claims ("an error state, not a crash") has no cell for any object member: MEDIUM.
- **Required Action (implementer)**:
  - **Minimum:** `parseMessageData` refuses an object unless every field `makeEditable` reads has the shape it reads: `embeds` absent or an array of objects; each embed's `fields` absent or an array of objects; `components` absent or an array of objects.
  - **Preferred (structural):** validate `data` against a schema before `makeEditable`. If the full save schema (`discordMessageShape`) is chosen, first check that the links the generator (M8) builds from stored messages still pass it, because data saved under an older schema may not. A guard narrower than the full schema is acceptable if it covers exactly `makeEditable`'s read set.
  - **Cells:** one per field `makeEditable` reads. In each cell the bad member sits beside valid fields, not as the only key. Each cell fails if the page throws or renders the editor. Falsity signature: a guard that checks only `embeds` fails the `components` and `fields` cells.
- **Planner:** register the wrong-shape class and the 07:52Z non-object ruling in § M5-h. The plan text says only "not parsable JSON".
- **QA and UAT:** whether `{"components":[null]}` breaks the real editor is untested here.

**CR-19 LOW Round 10 Pattern departure**: `usePusher` hand-rolls a latest-value ref where the repo's idiom is `react-use`'s `useLatest`
- **Location**: `src/providers/MessageProvider/usePusher.ts` `hasChangedRef` (`useRef(hasChanged)`, plus `hasChangedRef.current = hasChanged` in render), at `da24eb7`.
- **Class**: A ref kept equal to the latest prop or state by hand, where `useLatest` already does that.
- **Enumeration**:
  - `git grep -n useLatest da24eb7 -- src ':!*__tests__*'` gives 17 production sites. One is `MessageProvider/index.tsx`'s `messageRef = useLatest(message)`, the ref passed to this same hook.
  - Hand-written ref syncs in render (`git grep -nE "Ref\.current = [a-zA-Z]+;"`, read by hand): 3. They are `usePusher.ts` (new), `DiscordMessageEditor/index.tsx` `messageRef` and `GuildProvider.tsx` `guildIdRef`. The last two are pre-existing and not part of this change.
  - Blind spots: the predicate cannot see a sync written in another expression form, or one inside an effect.
- **Issue**: The implementer's flows table names no pattern for the ref. A hand-written sync is the same mechanism spelled differently, so the repo now has a second idiom for it. Behaviour is the same either way.
- **Required Action (implementer, non-blocking)**: `const hasChangedRef = useLatest(hasChanged);`. The two pre-existing sites are outside this change and not owed here. The existing cells stay the check: `m5c-pusher-ref-never-updated` is killed by them.

### Round 10 verdict

REJECTED for M5-h only (CR-18 MEDIUM). M5-a to M5-g are met. CR-19 is LOW and non-blocking. QA Phase 2 may take M5-a to M5-g at `da24eb7`. M5-h waits for its fix, which will be a sub-entry of this round.

## Round 9 (plan gate read, rev 21, agent-output `3d193f9`; mechanisms at website `1e12837`)

- **Scope.** The delta `e118cc3..3d193f9`, written to a file and read in full, with the ruling `f005cef`. It covers M4-d's webhook-load limb (the CR-16 fold) and D30 (M3 removed, X-18).
- **CR-16 MEDIUM Round 8 RESOLVED.** Option (a): each site's existing place. The send page uses `WebhookMenu`'s custom-URL `errorMessage`, under M4-b. The dialog uses `NewMessageModal` `messageErrorString`, the one error line below the load options, with its precedence unchanged and no field error added. The walk is reworded to match. Each cell asserts the literal at its stated place, and fails if the text appears elsewhere or nowhere. The places were re-read at `1e12837` in Round 8. The checks that fail if it returns are the implementer's two cells, confirmed at the D29 code change (a Round 7 sub-entry).
- **D30: no finding.** M3 carried no code-review limb, and none is lost. Checked:
  - The cited evidence exists: `verification/015/m3-chrome-read/README.md` at `8996505` (website `6001f7f`, Chrome 156.0.8078.47, three dialogs, cells a–d, a fresh context per cell).
  - No M3 file is on the chain branch: `git ls-tree -r` of the tip, `enter-key` → 0.
  - The dead `tagName` compare stays in the code by the owner's choice. X-18 names the residue: the uploader's Clear, a production build, and other browsers.

## Round 8 (plan gate read, rev 20, agent-output `e118cc3`) — dispositions

- CR-16 MEDIUM Round 8 RESOLVED: at rev 21 (Round 9), and met in code at `da24eb7` (Round 7 sub-entry). The checks that fail if it returns are the two `*.failed-webhook-load` cells.
- Round 8 verdict: REJECTED for the webhook-load limb, cleared by Round 9. Its argument is in the commit that carried it (`e524a96`).

## Round 7 (M4, website `1e12837`, plan rev 19)

### Scope and identity

- **Tree.** website `1e12837`, the `Handoff-At` of the M4 document (`d30916f`). Files were read with `git show 1e12837:<path>`, and the diff `6001f7f..1e12837` (15 files) was written to a file and read in full. By the end of the review the chain tip had moved to `579e8b2` (`12ac7ed`, `579e8b2`: M1-c/M1-h rebuild work, not yet handed off). That delta's `redis/index.ts` hunk touches only `fetchUserAccount`, so no M4 surface is affected. This verdict binds to `1e12837`.
- **Criteria recorded at round open:** plan § M4 at rev 19 (`330348f`): M4-a, M4-b, M4-c, and M4-d with its two sites (D28), trim, refused-input display, network text (D24), ordering, the shared constant over eight hosts (D26), `getFromUrl` by destination (CR-11), the id taken from the constant's group (AF-19), and the D27 rider (rev 19 form).
- **Evidence process.** For production limbs: the diff, plus my own attack on the real procedure (below). For TDD: the implementer's red/green captures and named mutants, which I did not re-run (QA's sweep). My instruments: `verification/015/cr-m4-probes/` (driver `run.sh <repo> <scratch> <sha> <out>`), and the convention check `cr-m4-convention-check-1e12837.txt`.

### Per-limb result at `1e12837`

| Limb | Result | Basis |
|---|---|---|
| M4-a | Met | `page.tsx` `sendMessage` wraps `sendWebhook` in `useLoading`'s `withSending`, and `isSending` is a conjunct of the Send gate. The `.catch(() => null)` cannot hide the failure: `sendWebhook` returns `toast.promise(...)`, whose error toast shows it. |
| M4-b | Met | `WebhookMenu` `errorMessage` is `url && !isWebhookLoading && selectedWebhook === null`. Sweep: `selectedWebhook !== null` gives 0 hits. |
| M4-c | Met | Clear `isDisabled={isLoading \|\| !threadId}`; no button added. |
| M4-d, two sites | Met | `WebhookProvider` `useValue` and `useValidateWebhook` both take the id from `parseMessageId`: trimmed, then `^\d+$`, or the constant's `messageId` group. The plan's predicate `\d\+/\.test` gives 0 hits at `1e12837`. Each effect has a stale flag in cleanup and a catch. Message-fetch failure shows the D24 literal at both sites. Refused input clears the message and error (QAF-22 (2)). |
| M4-d, constant | Met | `(?:(?:www\|canary\|ptb)\.)?discord(?:app)?\.com` with named groups `guildId`, `channelId` and `messageId`. No `g` flag, anchored. |
| M4-d, CR-11 | Met (CR-11 RESOLVED) | `getFromUrl` destructures `match.groups`. The test's literals: guild `111` reaches `authorizeGuildAdmin`, and `/channels/222/messages/333` reaches the request, for all eight hosts. |
| M4-d, AF-19 | Met | One parser (`parseMessageId`); no `split('/').pop()` remains in either site. |
| M4-d, D27 rider | Met; attacked | After the awaited gate, `redis.fetchChannel(channelId)`, then a refusal unless `'guild_id' in channel && channel.guild_id === guildId`, all before the message request. See below. |
| CR-13 | RESOLVED | `fetchChannel` is typed `request<Channel>`. |

### Adversarial execution (D27 rider, `getFromUrl`)

- **What runs real:** `getFromUrl`, `authorizeGuildAdmin`, `getFromCache`, `fetchChannel`, `fetchGuild`, `fetchUserGuilds`, `fetchAccountFromSession` and `hasDiscordPermissions`.
- **What is faked:** Redis (an in-memory map with `NX`), the Postgres account row, Discord's bot API (a channel table plus message bodies `SECRET-<channel>`), and `/users/@me/guilds`. The user is Administrator of A and holds Manage Messages only in B.
- **Oracle:** the outcome; whether `SECRET` appears anywhere in it; and whether the fake Discord ever received a `/messages/` request.
- **Input class and results, run 2 at `1e12837`: 26 of 26 as expected.**
  - Controls: a channel of A and a thread of A return content (positive).
  - Refused with no content and zero message requests:
    - links naming A, for a channel or thread of B;
    - a DM and a group DM;
    - `guild_id: null`;
    - `guild_id` as a number;
    - a lookup refused (403 → its FORBIDDEN text) or missing (404 → "Channel does not exist.").
  - Refused by the gate before any channel lookup: a Manage-Server-only user of A; a link naming B; no session cookie.
  - Refused by the pattern: trailing `\n`, trailing `/`, `?x=1`, `#x`, `discord.com.evil.example`, `discord.com@evil.example`, an embedded link on another host, upper-case host, `media.discordapp.com`, a full-width digit.
  - A leading-zero guild id is refused (NOT_FOUND from `fetchGuild`).
  - A held channel-cache lock times out to INTERNAL_SERVER_ERROR, with no content.
- **Discrimination.** The same probe at `6001f7f` (run 3) fails 2 cases: the discord.com cross-guild link and the held-lock case both return `SECRET-302`. So the probe sees CR-12, and the rider removes it. Run 1 is kept as an invalid run: my channel ids were not digits, and the positive control caught it.
- **Observed, no finding (pre-existing):**
  - `fetchGuild` runs alongside the gate, so an unauthorized caller can tell "bot is not in this server" from FORBIDDEN.
  - The cache layer's string rejection reaches the client verbatim (`fetch timed out. key: channel-302`), because `errorFormatter` returns `shape`.
  - Neither is content. Both belong to the cache layer and the router shape, outside M4.
- **Unexecuted:** Discord itself (CR-12's Assumption Not Checked, Round 4).

### Architecture Alignment

ALIGNED. One link definition (D26, A-3), now with named groups, as Round 4 preferred. One id parser shared by both F-27 sites. The rider reuses the cache layer's `fetchChannel`, with no new request path. The class sweep for caller-supplied channel ids in `src/server` and `src/pages/api` (`git grep -c -E "channel(_id|Id)"`) finds 1 file, `message.ts`, which is the rider's own site and the dev-only fixture. Blind spot: ids under other names, and `bot/`.

### TDD Compliance Check

**TDD Table Present**: Yes. **All Rows Complete**: Yes. Ordering is disclosed: the router test and the link refusals were written after the code, and their reds are named mutants. "No" rows are named controls.
- **Expectations are independent.** The D24 text, the refusal texts and the ids are literals in the tests. No expected value is derived from `MESSAGE_LOAD_FAILED_ERROR` or the constant.
- **Mocking.** The router test mocks `authorizeGuildAdmin` to pass, so the gate is not under test there. That gap is covered by Round 6's sub-entry and this round's attack, not by the suite. Recorded, not a finding: the gate is pre-existing and was read and run here.
- **Conventions.**
  - All 7 new basenames are in the positive form, and each module segment names its module.
  - The ID-token check by hand over basenames, titles and comments gives 0 hits. A planted `cr-12 rider` title fired.
  - `convention-check --since=6001f7f` in a detached worktree: 0 FAIL, 0 CANDIDATE. SKIPs: id-token (run by hand) and eslint (run in the shared tree on the 15 files, byte-identical to `1e12837`: exit 0).
- **`page.tsx`'s two class-order hunks** are lint-required: eslint flags both at `6001f7f`. They were disclosed as gate satisfaction. No finding.

### Round 7 findings

**CR-14 LOW Round 7 Sibling divergence**: the two F-27 sites answer a failed *webhook* fetch differently
- **Location**:
  - `src/providers/WebhookProvider.tsx` `useValue`, the webhook effect: `.catch(() => null)`, which leads to "Invalid URL" through M4-b.
  - `src/utils/hooks/useValidateWebhook.ts`, the webhook effect: `catch { setWebhookError(MESSAGE_LOAD_FAILED_ERROR) }`, which leads to "Could not load the message. …" under the webhook field.
  - Both at `1e12837`.
- **Class**: One failure, a network failure of the webhook-URL fetch, answered with different user-facing texts at the two sites the plan requires to mirror each other. At one site, the text names the wrong object.
- **Enumeration**: the catch blocks of the webhook-URL fetch effects. `git grep -n "fetch(url)" 1e12837 -- src` hits 2 sites (`WebhookProvider.tsx` and `useValidateWebhook.ts`), and I read each catch. The predicate cannot see a webhook fetch through another variable name.
- **Issue**: D24 settles the text for "an old-message fetch". Rev 19's "a fetch that fails with no response shows exactly …" at both sites does not say whether the webhook fetch is included. Where the contract cannot settle it, the contract is the defect. The implementer disclosed this as Outstanding item 3. The tests pin both behaviours: `WebhookProvider…` "settles with no webhook" and `useValidateWebhook…` "shows the connection error when the webhook fetch rejects".
- **Required Action**:
  - **Planner:** state which text a webhook-URL fetch failure shows, as one answer for both sites.
  - **Implementer:** align both sites and their cells to that answer. Falsity signature: one cell per site, with the same rejected webhook fetch, asserting the same literal text; a site that diverges fails.
  - Non-blocking. Both are user-visible, so UAT checks the result on the dialog and on the send page.

### Round 7 verdict

APPROVED_WITH_COMMENTS for M4 at `1e12837`. CR-14 is LOW and changes no safety outcome. QA Phase 2 may take M4 at `1e12837`.

### Round 7 sub-entry (D29 change and QAF-25 cells, website `da24eb7`; M4 content `46a9cab` and `6c42032`)

- **Scope.** The fix diff `579e8b2..46a9cab` plus `6c42032`, written to files and read in full. (`3031878` in that range is M1's, recorded under Round 2.)
  - Production: 1 line, the webhook catch in `useValidateWebhook.ts`. Tests: two new files and three tightened.
  - It stays within D29 and QAF-25, so it is a sub-entry.
  - `Reviewed-At` moves to `da24eb7`. The M4 files are identical at `6c42032` and `da24eb7`: `git diff --name-only 6c42032 da24eb7` lists only `src/app/preview/page.tsx`.
- **D29 is met at both sites.**
  - **Dialog.** The webhook effect's catch sets `'Invalid URL'`. That text reaches the user only through `messageErrorString`, which `NewMessageModal` renders below the load options as `<div className="mt-2 text-sm text-error">`. `errorMessage=` in the file is still 0, so no field error was added (CR-16 option (a)). A Discord refusal still sets Discord's `message`.
  - **Send page.** Unchanged: `WebhookMenu`'s `errorMessage`, under M4-b.
  - **CR-14 LOW Round 7 RESOLVED:** one answer at both sites. The checks that fail if it returns are `NewMessageModal.failed-webhook-load` and `WebhookMenu.failed-webhook-load`.
- **The cells meet CR-16's falsity signature.**
  - Each asserts exactly one leaf node with the literal `Invalid URL` in the whole mounted tree, so the text appearing elsewhere fails, and so does the text appearing nowhere.
  - The dialog cell places the text on a `text-error` element whose parent holds more than one input. That is the shared line under the accordion, not a single field's container. The menu cell places it in the URL input's container.
  - Mutant runs (`m4-d29-sweep-summary-46a9cab.txt`): each of these reddens the dialog cell: the pre-change text, the dropped catch, the refusal mapped to `Invalid URL`, and the error line dropping `webhookError`.
  - The expected values are literals.
- **QAF-25 cells.** The five refusal texts, the refused input's `''` and `guild_id: null` are all literals. QA's named mutants redden each one (same summary).
- **Conventions.** `6c42032` replaces non-null assertions with optional chaining in the two new files, to satisfy the lint gate (disclosed). convention-check over the tree: 0 FAIL (Round 10's run).
- **The rider is untouched.** `message.ts` is unchanged since `1e12837` (`git diff --quiet`: 0), and the `redis/index.ts` hunks touch only `fetchUserAccount` (M1). So I did not re-run the `getFromUrl` attack (`cr-m4-probes/`).

**CR-17 LOW Round 7 (sub-entry) Duplicated literal at two mirrored sites**: the two webhook sites each write `'Invalid URL'` by hand
- **Location**: the webhook-effect catch in `src/utils/hooks/useValidateWebhook.ts`, and `errorMessage` in `src/app/message/m/[id]/send/_components/WebhookMenu/index.tsx`, at `da24eb7`.
- **Class**: A user-facing text that the plan requires to be the same at two sites, written as two independent literals. The same change's sibling text (`MESSAGE_LOAD_FAILED_ERROR`, D24) is one shared constant.
- **Enumeration**: `git grep -c "'Invalid URL'" da24eb7 -- src ':!*__tests__*'` gives 4 files.
  - Two are the webhook sites.
  - Two are the embed editors (`EmbedAuthor.tsx`, `EmbedTitle.tsx`). There the text refers to an embed's link field, which is a different message, so they are outside this class.
  - Blind spots: the predicate cannot see the text built from parts or written in double quotes.
- **Issue**: Only the two cells hold D29's "one answer for both sites"; the code does not. The impact is low because the cells catch a divergence.
- **Required Action (implementer, non-blocking)**: Preferred: one constant beside `MESSAGE_LOAD_FAILED_ERROR` in `src/constants`, used at both webhook sites. The cells keep their literals (Axiom E). The embed editors stay as they are.
- **Sub-entry verdict.** Round 7 stays APPROVED_WITH_COMMENTS for M4, now at `da24eb7`. QA Phase 2 may re-run M4 there.

## Round 6 (plan gate read, rev 19, agent-output `330348f`; mechanisms at website `6001f7f`)

### Round 6 sub-entry: `authorizeGuildAdmin`'s refusal path (QA's routed assumption, `a47f5e9`)

- **The question.** The rider binds the channel to whichever guild passed `authorizeGuildAdmin`, so it is only as strong as that gate. Does a signed-in non-manager of server A get content for a server-A link?
- **Read at `6001f7f`.** `authorizeGuildAdmin` refuses in four cases: no session cookie, or one that is not a string (UNAUTHORIZED); no account or `access_token` (UNAUTHORIZED); no guild list (UNAUTHORIZED); and the link's guild missing from the list (FORBIDDEN). The list comes from `redis.fetchUserGuilds`, which keeps only guilds where `guild.owner` is set or `hasDiscordPermissions(guild.permissions, ['Administrator'])` holds. A non-owner, non-Administrator of A (Manage Server alone included) has no A entry, so is refused FORBIDDEN. In `getFromUrl`, the gate's rejection rejects `Promise.all([authorizeGuildAdmin, fetchGuild])`, which is awaited before the `/channels/…/messages/…` request, so no content is fetched.
- **Executed.** `hasDiscordPermissions` is the real module at `6001f7f`, run under node v24.14.0 with six cases whose expectations are literal Discord bits: Administrator only; Manage Server only; none; two non-admin bits; all bits above 2^53; one high non-admin bit. Result: 6 of 6 as expected (`verification/015/cr-m4d-admin-bit-probe.mts`, run 1). `fetchUserGuilds`'s trim and `authorizeGuildAdmin`'s `find` were read, not run: Redis and Discord stand behind them.
- **Stated residue (no finding).** `user-guilds` is cached for 600 s, keyed by the user's Discord id. A user who loses Administrator keeps passing the gate until the entry expires or sign-out clears it (M1-c, D22). This is pre-existing and bounded, and it is not the falsity QA named.
- **For Round 7.** The rider's channel lookup has to sit behind the gate as well: after the awaited `Promise.all`, or inside it with the message fetch still after. A lookup that runs before the gate is not a leak of content, but it is a channel probe by an unauthorized caller.
- **Assumption Not Checked.** This review assumes that Discord's `/users/@me/guilds` reports a user's `owner` and `permissions` truthfully for the token's own user, and does not test it. Falsity signature: a test account that is not an Administrator of a server loads that server's message link and gets content. Owner: UAT, on M4-d's walk with the test account (discord-test-browser), never against a user's server.

- **Scope.** The CR-12 rider's Property and "The lookup fails" in § M4-d, from the delta `67cb5e7..330348f` written to a file and read. Nothing else in M4-d changed.
- **Equality over the domain.** "`guild_id` equals the authorized guild id" refuses a different id and an absent field (DM or group DM). The rev 18 cells stay discriminating, and the absent-field member needs its own cell, which QA owns. No finding.
- **Refusal texts.** Re-read at `6001f7f` in `fetchChannel`: 401 and 403 both read "Missing permissions. Make sure the bot has access to this channel in Discord.", 404 reads "Channel does not exist.", and the default reads "An unknown error occurred. Please try again later or contact support." All match the plan.
- **Unmapped failures.** Two failures have no mapped text: a request with no response, which throws from the client before any status, and the cache lock-miss path, where `wait` rejects with `fetch timed out. key: …` after `timeoutSeconds`. Both throw before the message fetch, so the property's "no message content" holds for them. The plan scopes its text list to *mapped* refusals, so this is no finding. For Round 7: neither must be caught and turned into a pass.

## Round 5 (plan gate read, rev 17–18, agent-output `67cb5e7`; mechanisms at website `6001f7f`)

- **Scope.** § M4-d and D27 at `67cb5e7`, from the delta `565e240..67cb5e7` written to a file and read. Rev 17's restatement of CR-11 was confirmed in Round 4's sub-entry. The M4 code (`588d11a` and later) is not reviewed here: it is Round 6, on the implementer's one-tree handoff (steering, option (a)).
- **M-C4-1, two sites.** I re-ran the plan's predicate: `git grep -c -E '\\d\+/\.test' 6001f7f -- src bot` → 2 (`WebhookProvider.tsx`, `useValidateWebhook.ts`). This matches the plan. Every limb (accepted classes, network text, ordering, the id fetched) is now stated "at both sites". No finding.
- **D27 rider (CR-12).** The property is stated over three input classes: same guild → returned; other guild → refused, with no content; lookup refused or failed → refused. The check comes before the message fetch, or its result is discarded. Its cell (link guild ≠ channel `guild_id`, fails on any content returned) has the falsity signature Round 4 asked for. Combined with the same-guild cell, a comparison against the wrong field fails one of the two cells either way. "Holds whatever Discord returns" correctly takes the unexecuted Discord leg out of the fix's premises.
  - The sibling claim reproduces: `git grep -l guild_id 6001f7f -- src/server` → 0 files. `fetchChannel` (`src/utils/redis/index.ts`) is exported and has no caller (`git grep -n fetchChannel`: definition and export only).
  - `fetchChannel` caches for 10 s through `getFromCache`, which stores `compress-json` output and restores it with `decompress`. That is lossless, so `guild_id` survives the cache. Its refusals throw `TRPCError` with channel-specific texts for 401/403/404, which are "that refusal's existing text".
  - The drop disposition is priced in advance (a security handoff, plus an Exclusions row, before chain 015 releases).

**CR-13 LOW Round 5 Mechanism claim, D27 rider**: the reused `fetchChannel` types Discord's channel object as `Guild`
- **Location**: `src/utils/redis/index.ts` `fetchChannel`, `getApi().request<Guild>('GET', `/channels/${channelId}`, …)` at `6001f7f`.
- **Class**: A response type that names a different Discord object than the endpoint returns, so fields the caller needs are missing from the type, and fields with the same name mean something else.
- **Enumeration**: `git grep -n "request<" 6001f7f -- src bot` gives 8 lines. One is a comment and one is prose, which leaves 6 live typed requests (5 in `redis/index.ts`, 1 in `message.ts`). I read each against its endpoint path by hand. 1 mismatches: this site. Capture: `verification/015/cr-m4d-request-type-sites-6001f7f.txt`. The predicate cannot see untyped `request(` calls or requests through any other client, and no mechanical check connects a type name to an endpoint, so the per-site judgement is a reading.
- **Issue**: a rider written against this return type finds no `guild_id`. The type invites `channel.id === guildId`, which compiles because `Guild.id` exists, or a cast. The `.id` form fails closed, refusing every link, and the rider's same-guild cell catches it. So this changes no outcome the plan's cells would let through: LOW.
- **Required Action (implementer, at M4)**: type `fetchChannel`'s request as Discord's channel type (the `Channel` type `fetchChannels` already uses), and compare `guild_id`. No plan change is needed.

## Round 4 (plan gate read, revs 14–16, agent-output `565e240`; mechanisms at website `6001f7f`)

### Scope and identity

- **Tree.** The plan at `565e240` (rev 16). Delta `9cbe755..565e240`, written to a file and read in full. Mechanism claims were checked at website `6001f7f` with `git show` and `git grep`; the working tree was not used. The website chain tip has moved to `b25f561`, which carries M4 work not yet handed off. That work is not reviewed here: M4 is Round 5, opened when its own handoff arrives.
- **Limbs, as briefed:** M1-i (CR-7), M2-a and M6-f (CR-8), and M4-d (D24–D26), plus X-17 (CR-6).
- **Evidence process.** The plan text, my own re-runs at `6001f7f`, and `verification/015/cr-m4d-link-class-sweep.sh`, which I wrote for this read. Its binding predicate fired on a planted control (2 of 2), recorded in its run file. It is a model of the code, not a probe of Discord: what Discord returns for a cross-guild channel is not tested (Assumption Not Checked, Round 4).

### Dispositions

- CR-6 LOW Round 2 ROUTED: X-17, `handoff/providers-query-params-header-decode-throws-2026-11-08.md`. The CR-6 Minimum (correcting the implementer's disposition line) is still the implementer's.
- CR-7 LOW Round 2 RESOLVED: rev 14's M1-i defines "present" as what `cookies()` returns, with two residue classes. Both are shown in QA's `qa-m1i-cookie-presence-probe-run1.txt` (`next-auth.session-token`, no `=` → present `"true"`; `%zz` and a truncated escape → absent), and the `ab%` member is shown in my `cr-m1-cookie-reattack-run1.txt`. My re-attack also shows whitespace around `=` reading as absent. RFC 6265's `cookie-pair` has no whitespace around `=`, so that case is outside the grammar the residue is bounded by: no finding. Check that fails if it returns: QA's probe, run 1.
- CR-8 LOW Round 3 RESOLVED: M2-a names `Picker.tsx` `Picker` as the third member, and M6-f's criterion now says "0 included" and covers that line. Re-read at `6001f7f`: `defaultColor={initColor ? `#${initColor.toString(16)}` : '#000000'}`. Check: `verification/015/qa-m2a-colour-truthiness-sweep.sh`, run 1.

### M4-d (rev 16) against website `6001f7f`

- **The shared constant.** `DISCORD_MESSAGE_LINK_REGEX` in `src/constants/index.ts` is `^https://(?:www\.|canary\.|ptb\.)?discord\.com/channels/(\d+)/(\d+)/(\d+)$`. It has no `g` flag, so `.test` keeps no `lastIndex` state across the two consumers. It is anchored, so the plan's statement that it is "still refused" holds for every refused class it names at `6001f7f`.
- **Consumers.** `git grep -c` gives 2 in `NewMessageModal.tsx` (import, plus the `enabled` test of `getFromUrl.useQuery`), 3 in `message.ts` (import, the zod `.regex`, and `.match`), and 1 definition. This matches the plan and the architect's `565e240` pass.
- **Hand copies.** Every non-test line naming a `discord(app).com` host is listed in `cr-m4d-link-class-sweep-6001f7f.txt`. Apart from the constant, the only `/channels` text is placeholder strings: `NewMessageModal.tsx` and `EditMessageMenu.tsx`. No second link parser exists, so D26's "widened once" can be met. The predicate cannot see a host assembled from parts, or a link test written without the host text.
- **Placeholders.** The two `https://discord.com/channels/...` placeholders stay correct after the widening, because discord.com remains admitted. No finding.

### Round 4 findings

**CR-11 MEDIUM Round 4 Plan text, M4-d (rev 16)**: the `getFromUrl` property omits the capture group the authorization gate reads — Duplicates: QAF-21 in `qa/015-bug-evaluation-fixes-qa.md` (QA rates it LOW. I hold MEDIUM under the severity floor: the authorization gate relies on the guild group, and no assertion is stated for it) and critic L-C4-1 in `critiques/015-bug-evaluation-fixes-cycle4-critique.md`
- **Location**: plan § M4-d, "Consumers of the widened constant": "`getFromUrl`'s match groups still yield channel id and message id for every admitted form". Code: `src/server/api/routers/message.ts` `getFromUrl`, `const [, guildId, channelId, messageId] = match` and `authorizeGuildAdmin(guildId, req)` at `6001f7f`.
- **Class**: A criterion that widens an input to an authorization-gated procedure, and states what the widened parse must still yield without naming every value the gate consumes.
- **Enumeration**: the consumers of the widened constant whose captured values reach a gate. `git grep -c DISCORD_MESSAGE_LINK_REGEX 6001f7f -- src bot` gives the two consumer files. Only `getFromUrl` destructures the groups, and the guild group is the only argument to `authorizeGuildAdmin` there (sweep run file, "getFromUrl body": 1 authorization call). That is 1 member. The predicate is limited to this constant: other gates parsing other link classes are not enumerated.
- **Issue**: D26 widens the host part. Adding a capturing host group, which is the natural way to write `discord(app)?`, shifts every index. The plan's stated property catches a shift of the channel and message ids. It does not state that the first value is still the link's guild id, so a widening that reads channel and message by index from the end, or by named groups, while leaving `guildId` at index 1, passes the criterion as written and authorizes against the wrong value. By reading, the likely outcome is fail-closed: a host string is in no user's guild list, so the gate returns FORBIDDEN. That is a broken load for every link, not a bypass. The bypass shape is CR-12, which already exists. Either way, the code relies on this behaviour and no assertion fails when it is lost: severity floor MEDIUM.
- **Required Action (planner)**: restate the limb as "for every admitted form, `getFromUrl` passes the link's own guild id to the authorization gate, and the link's channel and message ids to the request". State the falsity signature the cell must show: a test whose link's guild id differs from both its channel and message ids, using distinct literals with the guild group neither first nor last among the values asserted. The cell fails when the gate receives anything but the link's guild literal. The cell's expected values are literals written in the test, never re-derived by matching against the constant (Axiom E). Preferred (structural): named groups in the constant (`(?<guildId>\d+)` and so on), read by name at `getFromUrl`, so that a host group cannot shift what the gate reads. Minimum: the restated property and its cell.

**CR-12 HIGH Round 4 Security, pre-existing (on `master`)**: `getFromUrl` authorizes the link's guild but fetches the link's channel, which can belong to any guild the bot can read
- **Location**: `src/server/api/routers/message.ts` `getFromUrl` at `6001f7f` and at `master` (`cr-m4d-link-class-sweep-master.txt`): `authorizeGuildAdmin(guildId, req)`, then `getApi().request('GET', `/channels/${channelId}/messages/${messageId}`)` with the bot token (`src/utils/discord.ts` `getApi`, `new Api(env.DISCORD_BOT_TOKEN)`).
- **Class**: An authorization decision made on one identifier of a request, while the protected action is addressed by another identifier of the same request that the code never binds to the first.
- **Enumeration**: in `getFromUrl`, lines comparing `guild_id`, looking up a channel, or comparing `guildId`: **0** at `6001f7f` and at `master`. The predicate fired 2 of 2 on a planted control. It cannot see a binding done inside a helper under another name. Population beyond this procedure (other routers that authorize a guild and then act on a caller-supplied channel or message id): **not measured**. Security's to sweep.
- **Issue**: a user who manages guild A, with the bot in A, submits `https://discord.com/channels/<A>/<channel in B>/<message in B>`. `authorizeGuildAdmin(A)` passes, `redis.fetchGuild(A)` passes, and the bot-token request returns the message from guild B whenever the bot can read that channel. The message content is returned to the caller. So it is a cross-guild read of any message the bot can see. It predates chain 015 and is outside F-1 to F-50 (D6). It matters to this round because D26 widens the inputs this procedure accepts, and the M4-d walk drives this procedure.
- **Magnitude**: established by reading the code at both SHAs only. That Discord serves `GET /channels/{c}/messages/{m}` for a channel outside the URL's guild, given the bot has access, is the unexecuted premise (Assumption Not Checked, Round 4). An unmeasured hypothesis on the Discord leg.
- **Required Action**: the owner decides whether this rides chain 015 as a scope delta or goes to a handoff and the security agent; this review does not decide it. The fix, wherever it lands: Preferred (structural): fetch the message's channel (or use the message's `guild_id` where Discord supplies it) and refuse unless its `guild_id` equals the authorized guild, so the gate and the action are addressed by one identifier. Minimum: the same comparison, inline in `getFromUrl`. The cell's falsity signature: with a stubbed channel whose `guild_id` is a literal other than the link's guild, the procedure must refuse, and the test fails if the message is returned.
- **Escalated** to steering-hooks-015 immediately, for the owner (security vulnerability).
- CR-12 HIGH Round 4 ROUTED: the owner chose to fix it in chain 015 as an M4-d rider (rulings 07:01Z, `3d7af67`). The planner folds it at the next revision. Code review checks it at the gate read steering briefs over `565e240..<that tip>`, and the class sweep and re-attack run at Round 5. The check that fails if it returns is the implementer's cell with Round 4's falsity signature.

### Round 4 record note (2026-11-08T06:58)

- **A commit of mine carried another session's hunks.** My plan changelog-row commit `19dbf64` also carried the planner's uncommitted rev 17 text for M4-d: the two-site enumeration (critic M-C4-1), the guild-group property (QAF-21, L-C4-1), the id-fetched limb (AF-19), and the QAF-22 refusal text. `git diff -- planning/…` written to a file just before my edit was 0 bytes. The planner wrote between that check and `git commit --only`. I did not re-run the diff on the edited file, and that was my error. History is not rewritten: no amend and no reset. Reported to the planner and steering. As a result, the committed plan carries part of rev 17 under `Revision: 16`, until the planner commits rev 17.
- **CR-11** is folded in substance by that rev 17 text ("the guild id, the channel id and the message id, in that order; the guild id is `authorizeGuildAdmin`'s input"). I verdict it at the rev 17 gate read, and the cell's falsity signature (above) still applies to the implementer's test.

### Round 4 sub-entry (CR-11 fix, plan rev 17 at `94e9987`)

- **Scope.** The CR-11 limb only: § M4-d, "Consumers of the widened constant", read with `git show 94e9987:planning/…`.
- CR-11 MEDIUM Round 4 RESOLVED. The text: "For every admitted form, `getFromUrl` passes the link's own guild id to the authorization gate (`authorizeGuildAdmin`), and the link's own channel id and message id to the request." It names every value the gate and the action consume, by where each goes rather than by group position. So a host group that shifts the indices cannot satisfy it. The class has one member (the Round 4 enumeration), and the sweep (`cr-m4d-link-class-sweep.sh`) has no other consumer that destructures the groups. The check that fails if it returns is `no test` at plan level. The implementer's M4 cell carries it, with the Round 4 falsity signature (distinct literals, and the cell fails if the gate receives any other value), and Round 5 checks it. The named-groups preference stays a build recommendation, which the planner rightly keeps out of the plan text.
- **Not covered here.** Rev 17's two-site enumeration (critic M-C4-1, a scope delta with steering) and its other M4-d text are a criterion change. They are read at the next gate read steering briefs, or at Round 5's criteria record.

### Round 4 verdict

M1-i, M2-a and M6-f (the folds of CR-7 and CR-8), M4-c and X-17: approved. M4-d: REJECTED on CR-11 until it is folded. CR-12 does not hold rev 16; it holds whatever the owner decides about it. No limb of mine is reached by the M3 premise hold.

## Verdict

**Round 10 (M5, website `da24eb7`, plan rev 21)**: REJECTED for M5-h only (CR-18 MEDIUM). M5-a to M5-g are met; CR-19 is LOW.

**Round 7 sub-entry (M4's D29 change and QAF-25 cells, `da24eb7`)**: Round 7 stays APPROVED_WITH_COMMENTS. CR-14 is RESOLVED; CR-17 is LOW.

**Round 2 sub-entry (CR-15, `3031878`)**: CR-15 is RESOLVED. Round 2 stays APPROVED_WITH_COMMENTS.

**Round 9 (plan gate read, rev 21)**: APPROVED. CR-16 is RESOLVED, and D30 has no finding. Round 8's REJECTED is cleared by it.

**Round 8 (plan gate read, rev 20)**: REJECTED for M4-d's webhook-load limb only (CR-16 MEDIUM, planner).

**Round 7 (M4, website `1e12837`, plan rev 19)**: APPROVED_WITH_COMMENTS (CR-14 LOW). CR-11 and CR-13 are RESOLVED in code.

**Round 6 (plan gate read, rev 19, CR-12 rider)**: APPROVED.

**Round 5 (plan gate read, rev 17–18, M4-d)**: APPROVED_WITH_COMMENTS (CR-13 LOW, for the implementer at M4).

**Round 4 (plan gate read, revs 14–16), after its sub-entry at rev 17**: APPROVED_WITH_COMMENTS. CR-11 is RESOLVED at `94e9987`. CR-12 HIGH is pre-existing and escalated to the owner through steering. Every other briefed limb is approved.

**Round 3 (M2) — Status**: APPROVED_WITH_COMMENTS
**Rationale**: M2-a to M2-d and QAF-1 meet their rev 13 properties at `6001f7f`. CR-8, CR-9 and CR-10 are LOW and change no M2 outcome.

**Round 2 (M1), after its sub-entry at `579e8b2`**: APPROVED_WITH_COMMENTS (CR-15 LOW). CR-3 RESOLVED; M1-h met. It was REJECTED at `be881c9` and at the `6001f7f` sub-entry, for M1-c and M1-h only. M1-i is met (CR-4 RESOLVED). CR-6 and CR-7 are LOW.

## Required Actions

1. **Implementer, blocking M5-h:** CR-18. Its fix is reviewed as a Round 10 sub-entry.
2. **Implementer, non-blocking:** CR-17 (one shared constant for the webhook-load text), CR-19 (`useLatest`), and CR-10 as QA times it.
3. **Planner:** register in § M5-h the 07:52Z non-object ruling (`c1be05e`) and the wrong-shape class from the 07:30Z ruling (`a49da66`) (CR-18).

## Assumption Not Checked

- **Round 10:** This review assumes that `PresetDialog` (Headless UI) closes on Esc and on an outside click whenever `allowMenuClose` is true, so that the flag M5-a's cells assert is what the user's keypress reaches. It does not test this in a browser.
  - Falsity signature: after a confirmed Load, the user reopens the JSON dialog, presses Esc, and the dialog stays open.
  - Owner: UAT, on M5-a's walk against the served chain tip. A browser run goes through steering, under the 07:42Z Playwright ruling.
- **Round 1:** This review assumes vitest's node project collects and executes a case under `bot/**/__tests__` at `037935d`, and does not test it.
  - Owner: QA Phase 2. Closed there by `qa-m0-bot-collection-probe` (`bf10a46`).
- **Round 2:** This review assumes no client bundle reads a non-`NEXT_PUBLIC_` key, other than `NODE_ENV`, through `env.mjs` at `be881c9`, and does not test it.
  - Falsity signature: a page that throws the guard's refusal on load (RK-7).
  - Owner: UAT's editor walks B-2 to B-5.
- **Round 3:** This review assumes that a black embed saved through the real tRPC save path reloads as `color: 0`, that is, no layer between `embedShape` and the stored JSON drops or rewrites a 0. It does not test this.
  - I read the schema, ingress and border only, and did not drive a save.
  - Falsity signature: the B-2 walk's reload shows the default border, or the stored message lacks `color`.
  - Owner: UAT (M2-a's human-observable limb, walked on the served chain tip).

- **Round 7:** This review assumes that the vitest DOM fake of `fetch` (a rejected promise) stands in for a browser's no-response failure in both validation effects, and does not test it in a browser.
  - Falsity signature: in a real browser, with the network cut, the send page or the dialog shows nothing, or leaves the loading state stuck, where the D24 text should appear.
  - Owner: UAT, on M4-d's walk with the network offline in devtools, without sending.
- **Round 4:** This review assumes that Discord's `GET /channels/{channel}/messages/{message}` with the bot token returns a message from a channel in a guild other than the link's, whenever the bot can read that channel. It does not test this.
  - I read `getFromUrl` and `authorizeGuildAdmin` only, and did not drive a request.
  - Falsity signature: the request returns 403 or 404 for a channel outside the link's guild while the bot has access to it. CR-12 would then fall to LOW.
  - Owner: security (CR-12's routing), driven with a test guild pair, never against a live user's guild.

## Next Steps

- **Implementer** (implementer-hooks-015): CR-18, which blocks M5-h. Then a Round 10 sub-entry at the fix SHA. CR-17 and CR-19 are non-blocking.
- **Planner** (planner-hooks-015): register M5-h's two rulings (CR-18, Required Action 3).
- **QA Phase 2** (qa-hooks-015):
  - M4 at website `da24eb7`: Round 7 plus its sub-entry, APPROVED_WITH_COMMENTS.
  - M5-a to M5-g at `da24eb7`: Round 10.
  - M1 at `3031878`: CR-15 RESOLVED.
  - Instrument for M5-h's later re-check: `verification/015/cr-m5-probes/`.
- **UAT:** Round 10's Assumption Not Checked, and those of the earlier rounds.

## Resumption State (code-reviewer-hooks-015, 2026-11-08T07:55)

- **Done.**
  - M0: Round 1.
  - M1: Round 2, APPROVED_WITH_COMMENTS; CR-15 RESOLVED at `3031878`.
  - M2: Round 3.
  - M4: Round 7 plus its sub-entry, APPROVED_WITH_COMMENTS at `da24eb7`; CR-17 LOW open.
  - Plan gate reads: Rounds 4, 5, 6, 8 and 9.
- **Open.** Round 10 (M5 at `da24eb7`): REJECTED for M5-h (CR-18 MEDIUM); CR-19 LOW.
- **Next.**
  - CR-18's fix, as a Round 10 sub-entry. Re-run `cr-m5-probes/run.sh <website> <scratch> <fix-sha> <out>`; every wrong-shape member must show the error line.
  - Re-attack from first principles, because the fix is a guard. Include members phrased outside my five: nested wrong shapes, `fields` holding `null`, and a container's child components.
  - M6 when it is handed off: a new round.
- **Tree.** website `chain/015-bug-evaluation-fixes` at `da24eb7`, clean. No export or worktree of mine remains to clean up in the shared tree. My export sits under the scratchpad.
- **Instruments.** `cr-m5-probes/`, `cr-m4-probes/`, `cr-m1-probes/signout.row-decision.test.ts`, `cr-m4d-link-class-sweep.sh`, `cr-m4d-admin-bit-probe.mts`, `cr-emit-compare.cjs`.
- **Hazards.**
  - Stamps come from `record-edit.js` `2026-11-08T07:55`.
  - Re-diff the plan right before `commit --only`.
  - The rtk filter breaks piped counts.
  - convention-check's id-token check SKIPs, so run it by hand.
- **Questions out.** None.
