---
ID: n/a
Origin: fix-recent-message-ids
UUID: c304ae49
Verified-At: "8f24e65 — repos=website"
Status: QA Failed
Status-Detail: "Phase 2 at website 8f24e65: suite green, but the sweep leaves three non-equivalent survivors in the hydration's guild filter (QAF-1, QAF-2), and the owner/Administrator trim the filter relies on has no test (QAF-3, outside the write set, put to steering). Back to fixer-fix-recent-message-ids."
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

QAF-1 MEDIUM Phase 2 — the server-row filter is not shown to keep the rows of every administered server.
- **Gap:** every fixture lists at most one guild.
- **Evidence:** the mutants that build `administeredGuildIds` from only the first or only the last guild survive the 199 cases.
- **User-visible failure:** a user who administers two or more servers loses the recent rows of all but one, and no test fails.
- **Why this blocks:** this is the behaviour criterion 1 preserves ("returns a server row … where the caller is owner or
  Administrator"), and no assertion fails when it is lost (severity floor).
- **Remedy (fixer):** tighten "lists a recent server message of a server the signed-in user is owner or Administrator of" in
  `auth.hydrated-recent-messages.test.ts`, rather than adding a new case. The list should hold three administered servers with
  rows for the first, middle and last, and the case must be seen red under both `auth.ts:162:walk-*` mutants.

QAF-2 MEDIUM Phase 2 — no fixture has an Administrator who is not the owner.
- **Gap:** both server cases mock `fetchUserGuilds` with `{ owner: true }`.
- **Evidence:** a filter that admitted owners only (`qa-filter-owner-only`) survives.
- **Why this blocks:** criterion 1 names two subclasses, owner and Administrator. The positive control is owed for each
  (both-directions rule).
- **Remedy (fixer):** in the same case, one administered entry carries `owner: false` with Administrator permissions, as
  `fetchUserGuilds` passes them through. The case must be seen red under `qa-filter-owner-only`.

QAF-3 MEDIUM Phase 2 — the owner/Administrator trim the filter relies on has no test anywhere in the suite.
- **What it is:** `fetchUserGuilds` in `src/utils/redis/index.ts`, `guild.owner || hasDiscordPermissions(…, ['Administrator'])`.
- **Evidence:**
  - `git grep` over `src/**/__tests__/**` at `8f24e65`: `fetchUserGuilds` appears only as a mock (2 files);
    `hasDiscordPermissions` appears 0 times.
  - Replacing the trim with `true` survives all 2281 cases.
- **User-visible failure:** the hydration, and every `authorizeGuildAdmin` route, would hand a plain member the server rows, and the
  suite stays green.
- **Pre-existing:** the gap exists at `76da25c`, and the guild routes have always relied on it. This change adds a new reliance:
  criterion 1's property rests wholly on it.
- **Why this needs steering:** the covering test belongs in `src/utils/redis/__tests__/`, which is **outside the write set**. That
  makes it a re-scope, put to `steering-hooks` as an owner-needing item. If the test is ruled out of scope, this finding is
  re-dispositioned to a handoff on that ruling. QA does not narrow the scope itself.
- **Reconcile 2026-11-21T06:27:** steering ruled QAF-3 in this chain as a test-only addition (`steering/fix-recent-message-ids-rulings.md`,
  block "2026-11-21T06:27Z", record `09602c0`). The write set gains `src/utils/redis/__tests__/` only; `index.ts` stays
  outside. The fixer writes the test in its next round, and the refresh re-runs `premise-guild-trim-removed`.

QAF-4 LOW Phase 2 — the fixture's server rows carry `owner: OWNER_DB_ID`, a combination `buildMessageValues`/`upsertMessage` never
writes, and the fixer's document does not name it.
- **Impact today:** it masks nothing, because every server case hydrates as `VIEWER_DB_ID`.
- **Remedy:** set `owner: null` on both server rows, in the same fix round as QAF-1 and QAF-2, since that round already edits the
  file.
- Duplicates: CR-2 in code-review/fix-recent-message-ids-code-review.md

**Residue, not a finding.** The filter reads the guild list before the development guild `'1'` is pushed. A move below the push
cannot be observed under `NODE_ENV=test`, and it affects development only, where no production server carries the Discord id `1`.

## Blocking-condition register

This is the chain's register. It has **no rows**.

- Every criterion surface has automated coverage, or will once QAF-1 to QAF-3 close.
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

## Verdict

**QA Failed** at website `8f24e65`.

- Criteria 2 and 3 hold: the mutants were killed, and the reviewer's real-postgres differential agrees.
- Criterion 1 is not yet evidenced for users with several servers or with Administrator but not owner rights (QAF-1, QAF-2), and
  its property rests on an untested trim (QAF-3).
- **Next:** `fixer-fix-recent-message-ids` for QAF-1, QAF-2 and QAF-4, then code review of that round, then a QA refresh at the new
  SHA, re-running the three survivors and the round's diff. QAF-3 waits on steering's ruling.
