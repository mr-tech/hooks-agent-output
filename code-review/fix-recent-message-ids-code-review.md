---
ID: n/a
Origin: fix-recent-message-ids
UUID: c304ae49
Reviewed-At: "6f76c6d — repos=website; sub-entry 1.1, test-only delta from 8f24e65"
Status: In Review
Round: 1
Verdict: APPROVED_WITH_COMMENTS
---

# Code Review: fix-recent-message-ids

**Plan Reference**: none (fixer chain). Scope statement: `steering/fix-recent-message-ids-rulings.md`, block "2026-11-21T05:43Z".
**Implementation Reference**: `agent-output/implementation/fix-recent-message-ids-implementation.md` (record commit `73f3200`, `Handoff-At: 8f24e65`)
**Date**: 2026-11-21
**Reviewer**: code-reviewer-fix-recent-message-ids

## Changelog

| Date (UTC) | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-21T06:16 | steering-hooks brief; fixer document at `73f3200` | Round 1: review website `76da25c..8f24e65` against the scope statement | APPROVED_WITH_COMMENTS. Two LOW findings: CR-1 routed to a handoff, CR-2 to QA Phase 2. 30 added production lines, so QA Phase 2 is owed. |
| 2026-11-21T06:32 | fixer-fix-recent-message-ids, round 2 at `6f76c6d` (record `3b2f973`) | Round 1, sub-entry 1.1: confirm the test-only fix | CR-2 RESOLVED by sweep re-run. Round 1 collapsed to disposition lines. Verdict unchanged at `6f76c6d`; back to QA Phase 2. |

## Scope of this round

- **Criteria assessed** (the scope statement's items, as written at round open):
  1. Server rows are returned only for a server the caller is owner or Administrator of, by `authorizeGuildAdmin`'s rule. Own
     personal rows are kept.
  2. `updatePreferences` refuses an element that is not a valid message number, by `messageIdShape`'s contract.
  3. Hydration does not fail on a stored bad element: the element is dropped before the query.
- **Tree**: website `8f24e65` (= `chain/fix-recent-message-ids`), read via `git show`. Re-verified at the start and the end
  (`rev-parse`, 06:10Z and 06:16Z). `git status --porcelain -- src` was empty (`verification/fix-recent-message-ids/code-review/status-src.txt`).
- **Files reviewed**: every row of the fixer's Change section. Production: `shared.ts`, `auth.ts`, `user.ts`. Tests:
  `auth.hydrated-recent-messages.test.ts`, `auth.hydrated-session.test.ts`, `user.save-limits.test.ts`,
  `shared.in-predicates.test.ts`.
- **Routing count**: `git diff --numstat 76da25c 8f24e65` over the three production paths gives 4 + 11 + 15 = **30** added lines
  (≥ 20). QA Phase 2 is in the set, and the suite and red-test runs are QA's, not this review's.

## Architecture Alignment

**System Architecture Reference**: `/usr/local/bin/hooks/agent-output/architecture/system-architecture.md` (tracked; `git ls-files --error-unmatch`)
**Alignment Status**: MINOR_DEVIATIONS (in the record, not the code)

- Line 136 says the hydrated recent list "returns the user's own rows and guild rows". This change makes that untrue, by design.
- The fixer's FYI entry to the architect is in `agent-output/INBOX.md` (`grep -c` "fixer-fix-recent-message-ids" = 1). It is
  uncommitted, because that file carries other sessions' hunks. The architect owns the update.
- The same line says `messageIdShape` passes values on "in canonical digits". `keepMessageNumbers` uses the shape's verdict only,
  not its output (CR-1).

Re-derivation of the brief's hazards:

1. **Where the filter sits.** `hydratedAuthCallback` filters after `Promise.all`, against the `redis.fetchUserGuilds` list, before
   the development-only guild `'1'` is pushed. `fetchUserGuilds` always yields an array, so `guilds.map` cannot meet a null list:
   its fetch callback throws on a non-array, and `getFromCache` returns the cached item only when it is truthy
   (`src/utils/redis/index.ts`, `fetchUserGuilds`, `getFromCache`, `getItem`). With no access token the list is `[]`, and the
   filter keeps personal rows only (fail-closed; probe case "no access token").
2. **Which column joins.** `getUserRecentMessages` selects `Guilds.guildId as guildId` (the Discord id) through
   `leftJoin('Guilds', 'Messages.fk_guilds_id', 'Guilds.id')`. Checked against real rows whose `Guilds.id` sequence (7000…) differs
   from the Discord ids (3000…): a guild list holding the `Guilds.id` values authorises nothing, and one holding the Discord id
   authorises exactly that server.
3. **`messagePromise.catch` does not stop the rejection.** It still does not, but bad elements no longer reach postgres. At base the
   probe's hydration threw `invalid input syntax for type bigint` (and "out of range") on `'abc'`, `''`, `'9223372036854775808'` and
   an object element. At the fix none of the 16 cases threw. Any other query failure still fails the session, unchanged from base
   and outside the scope.
4. **`shared.in-predicates.test.ts`.** Its in-list case was re-stated with message numbers, keeping the same assertions. The case
   asserting the guild arm's SQL form still asserts it, and is correct, because the arm is unchanged and the filter lives in
   `auth.ts`.
5. **The fake driver cannot show postgres's int8 refusal.** Settled against real postgres here, in a throwaway `postgres:16` per
   tree:
   - Corpus: 4000 seeded values. `messageIdShape` accepted 2003; postgres refused 0 of those and read 0 to a different value; 832
     values postgres accepts are refused by the shape and dropped. So the drop is never wider than the column's domain requires.
   - The fake's `refuseNonInt8` agrees with postgres on every case the suite uses.

Personal versus server rows: `buildMessageValues` sets `fk_users_id` only for a user select, and `upsertMessage` sets
`fk_guilds_id` only for a guild select (`shared.ts`). So "`guildId` absent" is exactly "personal row", and the query's
`fk_users_id = dbUserId` arm already restricts personal rows to the caller. The hydration and the sibling `getPartialMessages` admit
the same set over every row shape that writer produces. The `bot/` tree has 0 references to `preferences` (`git grep -c`). It was
not read for `Messages` writes.

**Adversarial execution** (the change modifies an authorisation filter):

- **Instrument:** `verification/fix-recent-message-ids/code-review/recent.pg.test.ts`, run by `run-probe.sh` at `8f24e65` and
  `76da25c` in `git archive` exports. Each run used a throwaway `postgres:16` with the project-utils `749606d` schema, inside a
  `systemd-run --user --scope` cap. Redis is mocked; postgres, kysely, `getUserRecentMessages` and `hydratedAuthCallback` are real.
  Containers were removed on exit (`docker ps -a` showed 0 `frmi` names afterwards), and the exports were deleted by the script's
  trap.
- **Process whose output is the evidence:** the production callback over postgres. I authored only the seeding and the oracle.
- **Input class:**
  - Row kinds: own personal, another user's personal, administered server, foreign server, absent id.
  - Guild lists: `[X]`, `[X, Y]`, `[]`, no access token, `Guilds.id` values in place of Discord ids.
  - Stored-element kinds: `'abc'`, `''`, int8 max + 1, `'-1'`, leading space, leading `+`, number `12`, `null`, an object, all-bad,
    a leading-zero form.
- **Oracle:** for each case, (a) whether the callback threw; (b) the session's `hydration.messages` ids; (c) whether the serialised
  session contains another user's personal name or an unadministered server's name; (d) `session.user.preferences.recentMessageIds`.
- **Result at `8f24e65`:**
  - No case threw.
  - Another user's personal row never appears.
  - The foreign server row appears only in `[X, Y]`, where Y is administered.
  - Bad elements are absent from both the bound list and the session's preferences.
- **Result at `76da25c`:** the foreign server row leaks in every non-throwing case, and 5 cases throw. The probe tells the two trees
  apart.
- **Captures:** `verification/fix-recent-message-ids/code-review/out/hydration-8f24e65.json`, `hydration-76da25c.json`, `corpus-*.json`, `vitest-*.json`;
  `vitest-*.exit` read `vitest exit 0` at both trees.

## TDD Compliance Check

**TDD Table Present**: N/A for a fixer route. `fixer.md` requires a Test section with the red run and controls instead, and it is
present.
**All Rows Complete**: Yes, with one gap (CR-2).
**Concerns**:

- **Red run.** Recounted from `red-run.json`'s per-assertion statuses: 178 cases, 164 passed, 14 failed. Each failure is a case this
  fix adds, matching the fixer's list.
- **Suite captures.** `suite-fix.json`: 2281 of 2281 passed over 156 files. `suite-base.json`: 2264 of 2265, the one failure being
  the batch-refusal load flake the fixer disclosed. These are the fixer's captures, recounted rather than re-run. Execution is QA's.
- **Controls.** 9 listed, 1 survived. The survivor, `query-given-stored-list`, is equivalent: `getUserRecentMessages` re-applies
  `keepMessageNumbers`, and I confirmed that by reading.
- **Expectation independence.** Expected ids are literals, never computed from `messageIdShape` or `keepMessageNumbers`. The
  `auth.hydrated-session.test.ts` mock passes the real `keepMessageNumbers` through `importOriginal`, not a transcription.
- **Bug-form tests.** None. Every test is spec-form; no escaped artefact applies.
- **Time-based tests.** None.
- **Invented values.** `refuseNonInt8` and the server-arm match are named, with their falsity signatures. The fixture's server rows
  carrying an owner are not named (CR-2).

**Conventions.**

- `node ~/.claude/tools/convention-check.js website --since=76da25c` exited 0: 7 files examined, 0 FAIL, 0 CANDIDATE, 18 SKIP
  (`code-review/convention-check-8f24e65.txt`).
  - 17 SKIPs are untracked `.playwright-mcp/*.png` files.
  - The ID-token/basename SKIP is unchecked by the tool, so I ran that check by hand.
- **By hand:**
  - All 4 test basenames match the positive form (`grep -cE` = 4).
  - The ID-token class matches 0 in the basenames and 0 in the 156 added lines (`added-lines.txt`). A planted control file scored
    3 of 3.
  - Added comment lines: 0.
- **Placement:** every test sits beside its module under `__tests__/`.

## Findings

### Critical
None.

### High
None.

### Medium
None.

### Low/Info

CR-1 LOW Round 1 ROUTED — `keepMessageNumbers` keeps the raw element rather than `messageIdShape`'s canonical output; pre-existing and outside the scope. Carried by `handoff/hydrated-recent-ids-not-canonicalised-2026-11-21.md`. Captured check: `verification/fix-recent-message-ids/code-review/recent.pg.test.ts`, case "leading-zero form of own personal id". Argument in record `cfce655`.

CR-2 LOW Round 1 RESOLVED — the fixture's server rows carried an owner the writer never sets. They carry `owner: null` at website `6f76c6d` (QA's QAF-4). The sweep re-run, two predicates, gives 0 hits (sub-entry 1.1 below). `no test`. Duplicates: QAF-4 in `qa/fix-recent-message-ids-qa.md`. Argument in record `cfce655`.

### Round 1, sub-entry 1.1 — fix confirmation at website `6f76c6d`

- **Scope:** the diff `8f24e65..6f76c6d` only. It is a test-only diff (`git diff --numstat`: `auth.hydrated-recent-messages.test.ts` +31 −6, new `src/utils/redis/__tests__/redis.fetch-user-guilds.test.ts` +77), so it is a scoped check, never a new round. Production lines over `76da25c..6f76c6d` are still 4 + 11 + 15 = 30, with `src/utils/redis/index.ts` unchanged. Tree: `6f76c6d` = `chain/fix-recent-message-ids` = HEAD; `git status --porcelain -- src` is empty.
- **CR-2 sweep, re-run over all test files at `6f76c6d`:**
  - Round 1's predicate (a `guildId:` literal beside a non-null `owner:`): 0 hits.
  - A predicate in a second shape (`fk_users_id` and `fk_guilds_id` both set in one fixture row): 0 hits.
  - All four server rows in the `rows` fixture read `owner: null`.
- **The tightened hydration case:**
  - Three administered servers; the middle one is `owner: false` with `permissions: '8'`.
  - Rows exist for the first, middle and last server, so the answer is not only the first or the last element.
  - The expectation is a literal id list.
- **The new `fetchUserGuilds` test:**
  - Permission literals checked against Discord's flag values: Administrator `0x8` = `'8'`; plus Manage Messages `0x2000` = `'8200'`; Manage Guild `0x20` plus Manage Messages = `'8224'`, which has no Administrator bit.
  - The expected list is a literal in name order, not computed by the trim (axiom E).
  - `fetch` is stubbed with the wire form, and the redis client is stubbed to miss the cache.
  - The name `redis.fetch-user-guilds` follows the precedent for a directory's `index.ts`: `redis.fetch-channel.test.ts` sits beside it, and `constants.*` and `utils.*` do the same.
- **Conventions:**
  - `convention-check.js --since=76da25c` at `6f76c6d`: exit 0, 8 files examined, 0 FAIL, 0 CANDIDATE, 18 SKIP (the same 17 `.playwright-mcp` files plus the id-token SKIP).
  - By hand over the 108 added lines: 0 ID-token matches, 0 comment lines. The basename matches the positive form.
- **Test adequacy and the 7 controls** (`controls-round2/`) are QA Phase 2's gate. They were not re-run here.
- **Captures:** `verification/fix-recent-message-ids/code-review/round1-sub1/` (`round2.diff`, `added-lines.txt`, `convention-check-6f76c6d.txt`, `status-src.txt`).
- **Verdict:** unchanged, APPROVED_WITH_COMMENTS, now at `6f76c6d`.

## Verdict

**Status**: APPROVED_WITH_COMMENTS
**Rationale**:

- All three scope items hold at `8f24e65`, shown by the real-postgres differential and the review's re-derivation of the five
  hazards.
- The design (post-query filter) is sound for every row shape the writer produces, and fails closed with no token or no guilds.
- The two LOW findings change no decision: one is pre-existing and routed to a carrier, the other is test fidelity routed to QA.

## Required Actions

None blocking. CR-2 is resolved at `6f76c6d`. CR-1 is carried by the handoff.

## Assumption Not Checked

- **Round 1:** this review assumes every production `Users.preferences.recentMessageIds` value is an array or absent, and does not
  test it.
  - Only `user.updatePreferences` (an array-typed merge) and NextAuth's `profile` (`{}`) write `preferences` in website or
    project-utils (`git grep`). Manual or legacy writes are unread.
  - **Falsity signature:** `keepMessageNumbers` would throw `ids.filter is not a function` inside `hydratedAuthCallback`, and that
    user's `/api/auth/session` request would fail on every load. At base the query failed instead.
  - **Owner:** devops, by reading the production Vercel function logs for that error after Vercel deploys website `master` (the
    release form under which a signed-in page load exercises the path).

## Next Steps

- **QA Phase 2** (`qa-fix-recent-message-ids`): 30 added production lines. CR-2 is its input. The probe and its captures are under
  `verification/fix-recent-message-ids/code-review/`.
- **Devops**, after QA: the Assumption Not Checked above, a post-deploy read of the Vercel logs for `ids.filter is not a function`.
- **Architect**: the `system-architecture.md:136` statement, through the fixer's INBOX entry.
