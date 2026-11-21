---
ID: n/a
Origin: fix-recent-message-ids
UUID: c304ae49
Verified-At: "6f76c6d — repos=website; Phase 2 refresh over the test-only round 8f24e65..6f76c6d"
Status: QA Complete
Status-Detail: "Phase 2 PASS at website 6f76c6d: QAF-1 to QAF-4 resolved, all 7 refresh mutants killed, suite 2283/2283 exit 0. Next: devops for website master (his word)."
Phase: 2
---

# QA Report: fix-recent-message-ids

**Plan Reference**: none (fixer chain). Scope statement: `steering/fix-recent-message-ids-rulings.md`, block "2026-11-21T05:43Z".
**Implementation Reference**: `implementation/fix-recent-message-ids-implementation.md` (`Handoff-At: 8f24e65`).
**Code Review Reference**: `code-review/fix-recent-message-ids-code-review.md` (record commit `cfce655`, `Reviewed-At: 8f24e65`, APPROVED_WITH_COMMENTS).
**Brief**: `steering/fix-recent-message-ids-brief-qa.md`, with `steering/fix-recent-message-ids-brief-common.md`.

This is a fixer chain, so there is no Phase 1, by the owner's selection. The Irreversible Side-Effect Register is not produced:
the fix touches no irreversible effect. Its one write, `user.updatePreferences` into `Users.preferences`, is overwritten by the
next save.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-21T06:25 | steering-hooks brief; code review committed at `cfce655` (`Reviewed-At` 8f24e65) | Phase 2 against the scope statement | Phase 2: QA Failed. Suite 2281/2281, exit 0. Typecheck exit 0. Sweep: 16 of 19 killed. 3 non-equivalent survivors, all in the guild filter (QAF-1, QAF-2). The guild-list trim has no test (QAF-3). CR-2 confirmed (QAF-4). |
| 2026-11-21T06:37 | code-reviewer-fix-recent-message-ids, sub-entry 1.1 committed at `b6d5634` (`Reviewed-At` 6f76c6d) | Phase 2 refresh over the test-only fix round | Phase 2 refresh: QA Complete at `6f76c6d`. 0 production lines changed. 7 of 7 refresh mutants killed. Suite 2283/2283, exit 0, on the second run (the first had one STACK_TRACE_ERROR in an untouched file, already carried in INBOX). Typecheck exit 0. QAF-1 to QAF-4 resolved. |

## Scope of this pass

**Criteria assessed** (the scope statement's items, listed before execution):

1. The hydrated session returns a server row only where the caller is owner or Administrator of that server, by
   `authorizeGuildAdmin`'s rule. It still returns the caller's own personal rows.
2. `user.updatePreferences` refuses a `recentMessageIds` element that is not a valid message number, by `messageIdShape`.
3. A stored element that is not a valid message number is dropped before the query, and the session does not fail.

**Tree.** Website `8f24e65` (= `chain/fix-recent-message-ids` = HEAD at 06:18Z). `git status --porcelain -- src` was empty.
Every run used a `git archive 8f24e65` export with `node_modules` symlinked from the shared tree. The export was removed at the end
of the pass.

**Routing count, re-derived.** `git diff --numstat 76da25c 8f24e65` over `user.ts`, `shared.ts` and `auth.ts` gives 4 + 11 + 15 =
**30** added production lines. QA Phase 2 is owed.

**Example classes (step 3).**

- Item 1 names two subclasses: owner, and Administrator. Its guild-list input class is "a list of n ≥ 0 administered servers". The
  suite's fixtures express only n ∈ {0, 1}, and only `owner: true`. See QAF-1 and QAF-2.
- Item 2's class is every string `messageIdShape` refuses. Members tested: letters, empty, int8 max + 1, negative, twenty digits.
  Mutants that widen the shape's range or sign were killed.
- Item 3's class is every stored value `messageIdShape` refuses, non-strings included. The `it.each` covers five members. The
  code reviewer's real-postgres probe covers null, number, leading space and `+` (`verification/fix-recent-message-ids/code-review/out/hydration-8f24e65.json`).

## Implementation Review

**Production changes.**

- `shared.ts`: adds the `keepMessageNumbers` export. `getUserRecentMessages` binds only the elements `keepMessageNumbers` keeps,
  and issues no query when none are left. The `getPartialMessages` callback is rewritten to `eb.*` form, behaviour-neutral
  (`sql-identity/`).
- `auth.ts`, `hydratedAuthCallback`:
  - drops bad elements once;
  - gives the session `preferences` that list;
  - keeps a row with no `guildId`, or one whose `guildId` is in the `redis.fetchUserGuilds` list. That list is read before the
    development guild `'1'` is pushed.
- `user.ts`: `recentMessageIds` elements are `messageIdShape`.

**Design read.** I read `authorizeGuildAdmin` (it matches `id` against `redis.fetchUserGuilds`) and `fetchUserGuilds` in
`src/utils/redis/index.ts`. `fetchUserGuilds` trims Discord's list to `guild.owner ||
hasDiscordPermissions(guild.permissions, ['Administrator'])`. The filter is the same rule by construction. The owner/Administrator
property therefore rests wholly on that trim (QAF-3).

**TDD evidence (fixer route: the Test section, no table owed).**

- Red run, recounted from `red-run.json`: 178 cases, 164 passed, 14 failed. The 14 are exactly the added cases, apart from the case
  that passes at base by design ("lists a recent server message …").
- Session-preferences red: `red-run-session-preferences.json`.
- The fixer's 9 controls, re-read. The survivor `query-given-stored-list` is equivalent: `getUserRecentMessages` re-applies
  `keepMessageNumbers`.

**Test-convention audit of the touched files** (the 4 test files):

- 0 reads of source text (`readFileSync`, `__filename` and the like: `grep -cE` 0 in each file).
- ID-token hits: 0, 7, 0 and 3. All 10 are fixture data (`'m1'` row ids), which the convention exempts. There were 8 and 5 at base.
- Expectations are literals.
- No bug-form names, no time-based cells, no pins.
- The `auth.hydrated-session.test.ts` mock passes the real `keepMessageNumbers` through `importOriginal`.

## Test Execution Results

Both runs are in an export of `8f24e65`, under `unshare -rn` with loopback brought up (`ip link set lo up`).

- **Whole suite**, `npx vitest run --reporter=json`: 2281 tests, 2281 passed, 156 `testResults` files, **vitest exit 0**.
  Captures: `verification/fix-recent-message-ids/qa/suite-8f24e65.json`, `suite-8f24e65.exit`, `suite-8f24e65-log.txt`.
  - Disclosed: the first run had loopback down. It failed 3 cases, `trpc.site-link` and two `trpc.batch-refusal` cases, which
    start a local server (`TypeError: fetch failed`), exit 1. This came from the run's environment, not the tree. Kept as
    `suite-8f24e65-lo-down*`.
- **Typecheck**, `pnpm run typecheck` (both programs): **exit 0** (`typecheck-8f24e65-log.txt`, `.exit`).
  - Disclosed: the first attempt exited 2 on `TS2307` for a `.png` import. The export lacks the gitignored, Next-generated
    `next-env.d.ts`. I copied it from the shared tree (sha256 `4a60641b…631e`) and re-ran. The first attempt is kept as
    `typecheck-8f24e65-no-next-env*`.

**Mutation sweep.** Range `76da25c..8f24e65`, production paths only: `src/server/auth.ts`, `src/server/api/utils/shared.ts` and
`src/server/api/routers/user.ts`.

- **Mutant set:** `verification/fix-recent-message-ids/qa/sweep-mutants.json`, 19 mutants in two groups.
  - 12 from `node ~/.claude/tools/mutant-gen.js --range 76da25c..8f24e65` (`verification/fix-recent-message-ids/qa/sweep-generated.json`; the 4 test files are skipped
    by the tool).
  - 7 QA-added class and subclass mutants: `qa-*`.
- **Run:** `mutation-run.py --dep node_modules`. Each mutant ran over the 4 touched test files, 199 cases per run. The control
  passed with 199. The runner's helper script was `verification/fix-recent-message-ids/qa/run-mut-sets.sh`.
- **Kill table:** `qa/sweep/mutation-table-8f24e65…-20261121T062256Z-p964798.json`, which records each instrument's blob.
  Per-mutant titles: `qa/sweep-rows-summary.txt`.
- **Score:** 16 of 19 mutants matching "a `mutant-gen` operator candidate on an added production line in `76da25c..8f24e65`, plus
  QA's 7 hand mutants", killed.
  - Excludes `??`, `?.` and arrows (tool limit).
  - Excludes unchanged lines inside the touched functions, for example the SQL server arm `fk_guilds_id is not null`. That arm is
    covered by `shared.in-predicates.test.ts` asserting the SQL text.
  - The second instrument is the code reviewer's real-postgres differential.

| Mutant | State | Disposition |
|---|---|---|
| `auth.ts:162:walk-first` (the administered set built from the first guild only) | SURVIVED | Not equivalent: it drops administered servers 2…n. QAF-1. |
| `auth.ts:162:walk-last` (from the last guild only) | SURVIVED | Not equivalent: same. QAF-1. |
| `qa-filter-owner-only` (the set built from guilds with `owner` only) | SURVIVED | Not equivalent: it drops an Administrator who is not the owner. QAF-2. |
| the other 16 | KILLED | Titles in `sweep-rows-summary.txt`. |

**Premise probe** (outside the sweep's scope, run because the change relies on it). Mutant `premise-guild-trim-removed` sets the
trim in `fetchUserGuilds` to `if (true) {`. It ran over the whole suite (2281 cases; control 2281 passed) and **SURVIVED**
(`qa/premise/mutation-table-8f24e65…-20261121T062344Z-p974021.json`). QAF-3.

## Findings

The finding argument as raised is in this document at record commit `8646c71`.

QAF-1 MEDIUM Phase 2 RESOLVED — the case is tightened to three administered servers (first, middle, last). Seen red under
`auth.ts:162:walk-first` and `walk-last` at `6f76c6d` (refresh kill table).

QAF-2 MEDIUM Phase 2 RESOLVED — the middle entry is `owner: false` with Administrator permissions `'8'`. Seen red under
`qa-filter-owner-only` at `6f76c6d`.

QAF-3 MEDIUM Phase 2 RESOLVED — in scope by steering's ruling (`steering/fix-recent-message-ids-rulings.md`, block
"2026-11-21T06:27Z", `09602c0`). The new `src/utils/redis/__tests__/redis.fetch-user-guilds.test.ts` kills
`premise-guild-trim-removed` and each disjunct and flag mutant at `6f76c6d`.

QAF-4 LOW Phase 2 RESOLVED — the server rows carry `owner: null` at `6f76c6d`. Duplicates: CR-2 in code-review/fix-recent-message-ids-code-review.md

**Residue, not a finding.** The filter reads the guild list before the development guild `'1'` is pushed. A move below the push
cannot be observed under `NODE_ENV=test`, and it affects development only, where no production server carries the Discord id `1`.

## Blocking-condition register

This is the chain's register. It has **no rows**.

- Every criterion surface has automated coverage (QAF-1 to QAF-3 closed at `6f76c6d`).
- Steering's ruling (block "2026-11-21T06:27Z") places a post-deploy hooks.gg check by the test account in the devops brief, as
  a row of the deployment record, not here.
- The stage set has no UAT.
- The code reviewer's post-deploy Vercel log read (`ids.filter is not a function`) is devops's, carried in the code review's
  Assumption Not Checked.
- Later stage documents, the deployment record first, are authoritative on any row added here.

## Assumption Not Checked

This pass assumes that Discord's `/users/@me/guilds` returns `permissions` in the form `hasDiscordPermissions` parses, and does
not test it.

- **Signature of falsity:** an Administrator who is not the owner is trimmed from `session.user.guilds`. The server rows and
  dashboard access then vanish for that user.
- **Owner:** the QAF-3 test pins the parse against a documented Discord value. The real-wire read is steering's to route, since
  the stage set has no UAT. The handoff to steering names it.
- **Reconcile 2026-11-21T06:27:** steering routed the real-wire read to the devops brief as a post-deploy check on hooks.gg by the Discord
  test account, recorded as a post-deploy row of the deployment record (same ruling block, `09602c0`).

**Refresh pass (`6f76c6d`):** this pass assumes that NextAuth's database adapter hands `hydratedAuthCallback` `user.preferences`
as the parsed JSON column (an array of strings, or absent), and does not test it. Every case supplies `user` directly.

- **Signature of falsity:** `keepMessageNumbers` throws `ids.filter is not a function` on every session request for that user.
- **Owner:** devops, by a post-deploy read of the Vercel function logs. This is the same item as the code review's Assumption Not
  Checked, and the handoff names it.

## Phase 2 refresh at `6f76c6d`

**Stage start.** The code review's sub-entry 1.1 is committed at record `b6d5634`, with `Reviewed-At: 6f76c6d`. Website HEAD =
`chain/fix-recent-message-ids` = `6f76c6de2daa…`, and `git status --porcelain -- src` is empty.

**Delta.** `git log 8f24e65..6f76c6d`: one commit. `git diff --numstat 8f24e65 6f76c6d` touches two files, and **0 production
lines**:
- `auth.hydrated-recent-messages.test.ts`: +31 −6;
- the new `src/utils/redis/__tests__/redis.fetch-user-guilds.test.ts`: +77.

This round has no production change, so only the survivors it closes are re-run. No re-sweep runs.

**Audit of the round's tests.**

- **Hydration case.** It now holds servers A (owner), B (`owner: false`, permissions `'8'`) and C (owner), with rows for each.
  The expected ids are literals. The server rows carry `owner: null`.
- **`redis.fetchUserGuilds` test.**
  - It stubs `fetch` with Discord-shaped entries. Permission values: `'8'` Administrator; `'8200'` = 8 + 8192, Administrator and
    Manage Messages; `'8224'` = 32 + 8192, Manage Guild and Manage Messages, not Administrator; `'0'`.
  - It asserts the trimmed, name-sorted list as a literal, and the request URL and header.
  - Each disjunct carries the decision alone: Charlie is owner with `'0'`, Bravo and Alpha are Administrator and not owner.
  - Negatives: Delta (Manage Guild only) and Echo (none). A second case holds no qualifying server.
  - The redis client mock always misses (`get` → `null`), so only the fetch path runs. That is the path the trim sits on.
- **Naming.** `redis.fetch-user-guilds` follows the existing `redis.fetch-channel.test.ts` for `src/utils/redis/index.ts`. It has
  no ID tokens and no source-text reads.

**Refresh mutants.** Set: `verification/fix-recent-message-ids/qa/refresh-6f76c6d/mutants.json`. It holds the 3 earlier sweep
survivors, the premise mutant, and 3 QA mutants on the trim:
- `qa-trim-owner-only`: the Administrator disjunct dropped;
- `qa-trim-permission-only`: the owner disjunct dropped;
- `qa-trim-manage-guild`: the flag swapped to `ManageGuild`. `hasDiscordPermissions` keeps its Administrator override, so a
  Manage Guild-only server would be admitted.

The runner was `mutation-run.py` at `6f76c6d`. Kill table:
`verification/fix-recent-message-ids/qa/refresh-6f76c6d/run/mutation-table-6f76c6de…-20261121T063420Z-p1089947.json`. It records
the instrument blobs, which are committed in `6f76c6d`. Controls passed: 11 cases (hydration file), and 13 (redis file plus
hydration file).

| Mutant | State | Killed by |
|---|---|---|
| `auth.ts:162:walk-first` | KILLED | "lists the recent server messages of every server the signed-in user is owner or Administrator of" |
| `auth.ts:162:walk-last` | KILLED | the same |
| `qa-filter-owner-only` | KILLED | the same |
| `premise-guild-trim-removed` | KILLED | both `redis.fetchUserGuilds` cases |
| `qa-trim-owner-only` | KILLED | "keeps only the servers the user owns or holds Administrator in …" |
| `qa-trim-permission-only` | KILLED | the same |
| `qa-trim-manage-guild` | KILLED | both `redis.fetchUserGuilds` cases |

Score: 7 of 7 refresh mutants killed. The set is the 4 survivors this round closes plus 3 trim mutants; it excludes the 16
mutants killed at `8f24e65`, whose production lines are unchanged. The second instrument is the code reviewer's real-postgres
differential at `8f24e65`, which covers the same production lines.

**Suite**, in a `git archive 6f76c6d` export under `unshare -rn` with loopback up, with `next-env.d.ts` copied in as before:

- **Run 1:** 2283 tests, 2282 passed, vitest exit 1 (`refresh-6f76c6d/run1-suite-6f76c6d.*`). The one failure was
  `NewMessageModal.persist-gate-wiring.test.tsx` with `STACK_TRACE_ERROR`. That file is untouched by this chain. Its time-based
  wait is already carried in `INBOX.md` (the `waitForJsonEditor` entry). Re-run alone it passed, 1/1, exit 0
  (`newmessagemodal-alone-*`).
- **Run 2, the run of record:** 2283 tests, **2283 passed**, 157 `testResults` files, **vitest exit 0**
  (`refresh-6f76c6d/suite-6f76c6d.json`, `.exit`, `-log.txt`).
- **Reconciliation:** 2283 = 2281 + the 2 new redis cases. 157 = 156 + the 1 new file.

**Typecheck**: `pnpm run typecheck` exit 0 (`refresh-6f76c6d/typecheck-6f76c6d-log.txt`, `.exit`).

The export was removed after the runs.

**Disclosed:** the stamp gate refused this pass's changelog row, because I typed its minute by hand (06:40) and it was ahead of
the clock. The row's stamp was re-written from `date -u` through `record-edit.js`.

## Verdict

**PASS: QA Complete at website `6f76c6d`** (`Verified-At`). Any production change to the chain branch expires it.

- **Criterion 1** holds:
  - Servers the user owns or administers keep their rows, for several servers and for an Administrator who is not the owner.
  - Other servers' rows are dropped.
  - The owner/Administrator trim the rule rests on is now tested in both directions and per disjunct.
- **Criteria 2 and 3** hold, as at `8f24e65`. Their production lines are unchanged.
- The first pass's verdict, QA Failed at `8f24e65`, is superseded by this one.
- **Next:** devops, for website `master`, under the owner's word, through `steering-hooks`. The devops brief also carries two
  post-deploy items: the hooks.gg check by the test account (steering's ruling, 06:27Z) and the Vercel log read (Assumption Not
  Checked).
