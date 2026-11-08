---
ID: 015
Origin: 015
UUID: 861e5f61
Reviewed-At: "330348f,6001f7f — repos=agent-output,website; Round 6 is the plan gate read of 67cb5e7..330348f (rev 19, the CR-12 rider only); Round 5 is the plan gate read of 565e240..67cb5e7 (rev 17–18, M4-d); Round 4 sub-entry (CR-11 fix) at plan rev 17 94e9987; Round 4 is the plan gate read of 9cbe755..565e240 (revs 14–16), with mechanism claims checked at website 6001f7f. Rounds 2–3 were at 6001f7f against rev 13"
Status: In Review
Status-Detail: "Round 6 (plan rev 19 gate read, CR-12 rider): APPROVED, no findings. Round 5 (plan rev 17–18 gate read, M4-d): APPROVED_WITH_COMMENTS (CR-13 LOW). M4 code review is Round 7, held for the implementer's one-tree handoff. Round 4 (plan revs 14–16 gate read), after its sub-entry at rev 17 (94e9987): APPROVED_WITH_COMMENTS — CR-11 RESOLVED; CR-12 HIGH (pre-existing getFromUrl cross-guild read) escalated to steering. M2 is APPROVED_WITH_COMMENTS at 6001f7f, and QA Phase 2 may take M2. For M1, Round 2's REJECTED stands for M1-c (CR-3) and M1-h only. Both are held for the rev 13 gate round and get re-verdicts at their rebuild SHA. M1-i now passes at 6001f7f (CR-4 RESOLVED). Every other M1 limb passed at be881c9."
Round: 6
Verdict: APPROVED
---

# Code Review: Plan 015 — Bug-evaluation fixes

**Plan Reference**: `agent-output/planning/015-bug-evaluation-fixes.md`.
- Round 1 read rev 8 at `ec45936`.
- Round 2 recorded its criteria from rev 8 at `bf10a46` and read rev 9 and rev 10 at `bceb84a` as growth.
- The Round 2 sub-entry and Round 3 review against rev 13 (`9cbe755`), whose delta `14fe94f..9cbe755` I also read as one of its gates (steering's brief, 2026-11-08).
- Round 4 reads the delta `9cbe755..565e240` (revs 14–16) as one of its gates (steering's brief, 2026-11-08, after `/clear`).

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
| 2026-11-08T06:57 | steering-hooks-015 (message, after `/clear`) | Round 4: plan gate read, `9cbe755..565e240` (revs 14–16): M1-i (CR-7), M2-a/M6-f (CR-8), M4-d (D24–D26) | REJECTED for M4-d only. CR-6, CR-7 and CR-8 are dispositioned by the folds. CR-11 MEDIUM: M4-d's `getFromUrl` property names the channel and message groups but not the guild group, which is the only input to the authorization gate. CR-12 HIGH, pre-existing on `master`, escalated: `getFromUrl` authorizes the link's guild and fetches the link's channel with the bot token, and nothing ties the two together. Instrument: `verification/015/cr-m4d-link-class-sweep.sh`. |
| 2026-11-08T06:59 | planner-hooks-015 (message), plan rev 17 at `94e9987` | Round 4 sub-entry: CR-11 fix confirmation | CR-11 RESOLVED. M4-d's `getFromUrl` limb is now restated by destination: the link's own guild id goes to `authorizeGuildAdmin`, and its channel and message ids go to the request. Round 4 is now APPROVED_WITH_COMMENTS. CR-12 is with the owner. The rest of rev 17 (the two-site enumeration, M-C4-1) is outside this sub-entry. |
| 2026-11-08T07:04 | steering-hooks-015 (message) | Round 5: plan gate read, `565e240..67cb5e7` (rev 17–18), M4-d only: M-C4-1's two sites and the D27 rider for CR-12 | APPROVED_WITH_COMMENTS. The two-site sweep reproduces (2 sites). The CR-12 rider's property and cell are discriminating. CR-13 LOW: `redis.fetchChannel`, which the rider reuses, types Discord's channel as `Guild`, so `guild_id` is not on its type. The M4 code review becomes Round 6. |
| 2026-11-08T07:06 | steering-hooks-015 (message) | Round 6: plan gate read, `67cb5e7..330348f` (rev 19), CR-12 rider only | APPROVED, no findings. Belonging as `guild_id` equality refuses an absent `guild_id`. The three refusal texts match `fetchChannel` at `6001f7f` word for word. The unmapped failures (no response; cache-lock wait timeout) throw before any content, so the safety property covers them. The M4 code review becomes Round 7. |

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

## Round 6 (plan gate read, rev 19, agent-output `330348f`; mechanisms at website `6001f7f`)

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

**Round 6 (plan gate read, rev 19, CR-12 rider)**: APPROVED.

**Round 5 (plan gate read, rev 17–18, M4-d)**: APPROVED_WITH_COMMENTS (CR-13 LOW, for the implementer at M4).

**Round 4 (plan gate read, revs 14–16), after its sub-entry at rev 17**: APPROVED_WITH_COMMENTS. CR-11 is RESOLVED at `94e9987`. CR-12 HIGH is pre-existing and escalated to the owner through steering. Every other briefed limb is approved.

**Round 3 (M2) — Status**: APPROVED_WITH_COMMENTS
**Rationale**: M2-a to M2-d and QAF-1 meet their rev 13 properties at `6001f7f`. CR-8, CR-9 and CR-10 are LOW and change no M2 outcome.

**Round 2 (M1), after its sub-entry at `6001f7f`**: REJECTED stands, now only for M1-c (CR-3) and M1-h, both held under the rev 13 round. M1-i is met (CR-4 RESOLVED). CR-6 and CR-7 are LOW.

## Required Actions

1. **Implementer**, non-blocking: CR-9 (delete `validateEmbed`), CR-6 Minimum (correct the disposition line), and CR-10 as QA times it.
2. **Planner**: none outstanding. CR-11 was folded at rev 17, and CR-6 to CR-8 at rev 14.
3. **M1-c and M1-h rebuild**, after the rev 13 round: one sub-entry each at its SHA. CR-3's cache-state cells, and one cell per M1-h decision-table row.
4. **CR-12**: ruled by the owner to ride chain 015 as an M4-d rider (`3d7af67`). The planner folds it, then the implementer builds it.

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

- **Round 4:** This review assumes that Discord's `GET /channels/{channel}/messages/{message}` with the bot token returns a message from a channel in a guild other than the link's, whenever the bot can read that channel. It does not test this.
  - I read `getFromUrl` and `authorizeGuildAdmin` only, and did not drive a request.
  - Falsity signature: the request returns 403 or 404 for a channel outside the link's guild while the bot has access to it. CR-12 would then fall to LOW.
  - Owner: security (CR-12's routing), driven with a test guild pair, never against a live user's guild.

## Next Steps

- **QA Phase 2** (qa-hooks-015): M2 at `6001f7f`, and M1-i at `6001f7f`. CR-10's timing is QA's call. M1-c and M1-h wait for their rebuild.
- **Implementer** (implementer-hooks-015): CR-9 and CR-6 Minimum. Then M1-c and M1-h once steering releases them.
- **Implementer, at M4**: CR-11's guild-group cell, with the Round 4 falsity signature.
- **Steering, for the owner**: CR-12 (escalated by message).
- **UAT**: the Round 2 and Round 3 Assumptions Not Checked; CR-5's declined log line.

## Resumption State (checkpoint, code-reviewer-hooks-015, 2026-11-08T06:57)

- **Stamp correction (2026-11-08T07:02).** The Round 4 stamps (07:10, 07:12, 07:15, 07:20) were typed by hand, ahead of the clock. Each is corrected to the minute of the commit that carried it (`32efd0b` 06:57, `6125c42` 06:58, `49a25a0` 06:59), and the matching plan rows likewise (`19dbf64` 06:57, `5d4d532` 06:59). The error was mine. From now on stamps are taken by record-edit.js at write time, never typed.

- **Done.**
  - Rounds 1–3 and the Round 2 sub-entry, as in the changelog (M0 and M2 APPROVED_WITH_COMMENTS; M1 REJECTED for M1-c and M1-h only).
  - Round 4: plan gate read of `9cbe755..565e240`. After its sub-entry at rev 17 `94e9987`, it is APPROVED_WITH_COMMENTS, with CR-11 RESOLVED. CR-12 HIGH escalated to steering. CR-6 routed (X-17); CR-7 and CR-8 RESOLVED.
- **Open, mine to re-verify:**
  - M1-c (CR-3) and M1-h, each as a sub-entry at its rebuild SHA. The cells needed are listed under Round 2. Probe for M1-c: `verification/015/cr-m1-probes/signout.cached-null.test.ts`, driver `cr-m1-probes/run.sh`.
  - M4: Round 7 (renumbered again; Rounds 5 and 6 were the rev 18 and rev 19 gate reads), on the implementer's one-tree handoff (both F-27 sites and the D27 rider), when the implementer hands off. The tip `b25f561` already carries M4 commits, which are not reviewed until the handoff. Check CR-11's guild-group cell there, and that the widened constant has no capturing host group (or uses named groups).
- **Instruments.** `cr-m4d-link-class-sweep.sh <repo> <sha>`; `cr-emit-compare.cjs`; `cr-m1-probes/cookie-parser-reattack.cjs`.
- **Hazards.** As before: the rtk filter breaks counts taken from piped output; eslint needs `node_modules`.
- **Questions out.** None. CR-12 was ruled into chain 015 (`3d7af67`). Steering ruled Round 5 option (a): hold until the implementer delivers M4 with both F-27 sites and the CR-12 rider against the coming revision, then review one tree. The next gate read is over `565e240..<next plan tip>`, and covers the M-C4-1 text and the CR-12 fold.
