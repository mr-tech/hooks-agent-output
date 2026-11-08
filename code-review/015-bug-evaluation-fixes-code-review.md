---
ID: 015
Origin: 015
UUID: 861e5f61
Reviewed-At: "6001f7f — repos=website; Round 3 (M2) and the Round 2 sub-entry (M1 fix round 1), both against plan rev 13"
Status: In Review
Status-Detail: "M2 is APPROVED_WITH_COMMENTS at 6001f7f, and QA Phase 2 may take M2. For M1, Round 2's REJECTED stands for M1-c (CR-3) and M1-h only. Both are held for the rev 13 gate round and get re-verdicts at their rebuild SHA. M1-i now passes at 6001f7f (CR-4 RESOLVED). Every other M1 limb passed at be881c9."
Round: 3
Verdict: APPROVED_WITH_COMMENTS
---

# Code Review: Plan 015 — Bug-evaluation fixes

**Plan Reference**: `agent-output/planning/015-bug-evaluation-fixes.md`.
- Round 1 read rev 8 at `ec45936`.
- Round 2 recorded its criteria from rev 8 at `bf10a46` and read rev 9 and rev 10 at `bceb84a` as growth.
- The Round 2 sub-entry and Round 3 review against rev 13 (`9cbe755`), whose delta `14fe94f..9cbe755` I also read as one of its gates (steering's brief, 2026-11-08).

**Implementation References**:
- `implementation/015-bug-evaluation-fixes-m0-implementation.md` (`6299c9b`, `Handoff-At` 037935d).
- `implementation/015-bug-evaluation-fixes-m1-implementation.md` (`7f45611`, `Handoff-At` be881c9; § Fix Round 1 at `3ba52f3`, `Handoff-At` 6001f7f).
- `implementation/015-bug-evaluation-fixes-m2-implementation.md` (`3ba52f3`, `Handoff-At` 6001f7f).

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

## Verdict

**Round 3 (M2) — Status**: APPROVED_WITH_COMMENTS
**Rationale**: M2-a to M2-d and QAF-1 meet their rev 13 properties at `6001f7f`. CR-8, CR-9 and CR-10 are LOW and change no M2 outcome.

**Round 2 (M1), after its sub-entry at `6001f7f`**: REJECTED stands, now only for M1-c (CR-3) and M1-h, both held under the rev 13 round. M1-i is met (CR-4 RESOLVED). CR-6 and CR-7 are LOW.

## Required Actions

1. **Implementer**, non-blocking: CR-9 (delete `validateEmbed`), CR-6 Minimum (correct the disposition line), and CR-10 as QA times it.
2. **Planner**: CR-7 (bound "present"), CR-8 (name the picker member), and CR-6's Preferred action if it rides the chain.
3. **M1-c and M1-h rebuild**, after the rev 13 round: one sub-entry each at its SHA. CR-3's cache-state cells, and one cell per M1-h decision-table row.

## Assumption Not Checked

- **Round 1:** This review assumes vitest's node project collects and executes a case under `bot/**/__tests__` at `037935d`, and does not test it.
  - Owner: QA Phase 2. Closed there by `qa-m0-bot-collection-probe` (`bf10a46`).
- **Round 2:** This review assumes no client bundle reads a non-`NEXT_PUBLIC_` key, other than `NODE_ENV`, through `env.mjs` at `be881c9`, and does not test it.
  - Falsity signature: a page that throws the guard's refusal on load (RK-7).
  - Owner: UAT's editor walks B-2 to B-5.
- **Round 3:** This review assumes that a black embed saved through the real tRPC save path reloads as `color: 0`, that is, no layer between `embedShape` and the stored JSON drops or rewrites a 0. It does not test this.
  - I read the schema, ingress and border only, and did not drive a save.
  - Falsity signature: the B-2 walk's reload shows the default border, or the stored message lacks `color`.
  - Owner: UAT (M2-a's human-observable limb, walked on the served chain tip).

## Next Steps

- **QA Phase 2** (qa-hooks-015): M2 at `6001f7f`, and M1-i at `6001f7f`. CR-10's timing is QA's call. M1-c and M1-h wait for their rebuild.
- **Implementer** (implementer-hooks-015): CR-9 and CR-6 Minimum. Then M1-c and M1-h once steering releases them.
- **Planner**, via the rev 13 gate round: CR-7 and CR-8.
- **UAT**: the Round 2 and Round 3 Assumptions Not Checked; CR-5's declined log line.

## Resumption State (checkpoint, code-reviewer-hooks-015, 2026-11-08T06:46)

- **Done.**
  - Round 1: M0 `037935d` APPROVED_WITH_COMMENTS. CR-1 RESOLVED; CR-2 routed to QA.
  - Round 2: M1 `be881c9` REJECTED.
  - Round 2 sub-entry at `6001f7f`: CR-4 RESOLVED; M1-i met under rev 13; CR-5 DECLINED by the implementer; CR-6 and CR-7 LOW raised.
  - Round 3: M2 `6001f7f` APPROVED_WITH_COMMENTS (CR-8, CR-9 and CR-10 LOW).
  - All committed: this document at `7976a9a`; plan rows `a8dd1fa`, `28e9d34` and `776e668`.
  - Deliveries sent: QA (M2 and M1-i), the implementer (the LOWs and the rebuild cell lists), steering (CR-6, CR-7 and CR-8 for the planner).
- **Open, mine to re-verify, each as a sub-entry at its handoff SHA:**
  - M1-c (CR-3): plan rev 12 and 13 text. The cell needs a Redis stub that holds a value; red at `a2592f0` and `be881c9`, green at `7b10f4e`. Probe: `verification/015/cr-m1-probes/signout.cached-null.test.ts`, driver `cr-m1-probes/run.sh <repo> <scratch> <sha> <out>`.
  - M1-h: rev 13's 8-row decision table. Cells exist for rows 2 and 6 (during A, during G) only.
  - M1-c and M1-h are held by steering until the critic, the architect and QA pass rev 13.
- **Next.** The next milestone handoff (M3) is a new Round 4. Read the plan at its latest revision and record its criteria at round open. Re-derive `Handoff-At` from the implementation document.
- **Instruments, reusable.** `verification/015/cr-emit-compare.cjs <repo> <a> <b>` settles a behaviour-preserving claim by comparing syntax trees. `cr-m1-probes/cookie-parser-reattack.cjs <repo>`. `cr-m0-bot-typecheck-probe.sh`.
- **Tree.** website `chain/015-bug-evaluation-fixes`; tip `6001f7f` at checkpoint, checked out (not moved by me). Nothing of mine is uncommitted. Scratch exports and worktrees are removed. No local mutation outstanding.
- **Hazards met.**
  - The rtk filter truncates `grep` output: use `grep -c` or write to a file and Read it.
  - `record-edit.js` substitutes the now-token everywhere, including inside prose.
  - Typed stamps are refused by the stamp gate.
  - eslint needs `node_modules`: lint shared-tree files byte-identical to the SHA, or `git show <sha>:f | npx eslint --stdin`.
- **Questions out.** None pending to the owner.
