---
ID: 015
Origin: 015
UUID: 861e5f61
Verified-At: "24ac49f — repos=website; M1 only, run in git-archive exports of 24ac49f under unshare -rn, not the shared tree (chain branch at 09c7c45 when read). The earlier pass (QA Failed) was at 3031878"
Status: QA Complete
Status-Detail: "M1 (milestone-scoped) PASS at website 24ac49f against plan rev 25 (dd9e88a; M1 unchanged since rev 13). The re-run after QAF-26's test-only fix (13be10d): both survivors are killed, i2-row-read-by-session-token 8 of 12 and i4-user-count-unscoped 6 of 10. QAF-26 RESOLVED. QAF-27 LOW stays open and does not block. Suite 1029/1029, 108 files, exit 0; typecheck exit 0. Plan Status left alone."
Phase: 2
---

# QA Report: Plan 015 — M1 (server and data path)

**Plan Reference**: `agent-output/planning/015-bug-evaluation-fixes.md`, revision 22 (agent-output `5201612`). § M1 was read at rev 13 in the Phase 1 re-keys, and no revision since has an M1 hunk: revs 14–16 and 19–22 were read in full at their re-keys, and rev 17/18 touch M4 only. M1-i's "present" text is rev 14's.
**Implementation**: `implementation/015-bug-evaluation-fixes-m1-implementation.md` (`c938573`, plus the CR-15 line), `Handoff-At: 3031878`.
**Code review**: `code-review/015-bug-evaluation-fixes-code-review.md`, Round 2 and its sub-entries (`befc32f`, then `d7708e8`, which resolves CR-15 at `3031878`). Stage start re-derived at `d7708e8`: `Reviewed-At` names `3031878` for the Round 2 sub-entry, and Round 2 (M1) is APPROVED_WITH_COMMENTS.
**Phase 1 and the chain's register**: `qa/015-bug-evaluation-fixes-qa.md` § M1 (rev 13 reconciles) and its register. This pass appends no row.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-08T08:02 | code-reviewer-hooks-015 → qa-hooks-015 (messages: `befc32f`, `d7708e8`) | QA Phase 2 for M1 at website `3031878` | Phase 2, milestone-scoped (M1). Created and first committed with Status QA Failed (M1 scope; plan Status left alone). QAF-26 MEDIUM and QAF-27 LOW go to the implementer. QAF-11 (M0 document) is RESOLVED. **Process disclosure:** QAF-11's collapse in the M0 document was a `python3` in-place edit, outside the edit tools and `record-edit.js`. |
| 2026-11-08T08:34 | code-reviewer-hooks-015, steering-hooks-015 → qa-hooks-015 (messages: `e0054f7`; resume brief) | M1 re-run after QAF-26's test-only fix (`13be10d`), at website `24ac49f` | Phase 2 re-run, scoped to the two survivors (the round has no production line). Both are killed. QAF-26 RESOLVED. Verdict PASS; Status → QA Complete (M1 scope; plan Status left alone). See § Re-run after QAF-26's fix. |

## Scope and criteria assessed

Fixed before execution: plan § M1, M1-a to M1-k, as reconciled in Phase 1 § M1 (rev 13), with E-5 to E-8. The cell list is Phase 1 § M1. Each cell was mapped to a test case and its deciding assertion, or reported absent, by a helper reading the test files at `3031878` (quoted assertions). This pass spot-checked the map against source where a gap was reported.

**Classes behind the examples.**
- M1-a: the four `in`-list sites (Phase 1's enumeration), each in {empty, non-empty}.
- M1-c: the cache state of `user-access-token` × the `Accounts` row, and the revoke outcomes {2xx, non-2xx, network reject}.
- M1-d: owner scope {user, guild} × {new, existing} × {999, 1000, 1001}.
- M1-e: the id pattern's members (Phase 1 list, all present).
- M1-h: the eight-row decision table, run row by row (18 cases).
- M1-i: the grammar's input classes plus the redirect predicate's conjuncts.

**Out of scope.** M1's human-observable limb (B-1, B-7) is UAT's, and so is the sign-out note on B-1 to B-5. RK-7's re-scan is owed at the effort-final pass.

## TDD compliance gate

The table in the implementation document has 28 rows over the delivery and two fix rounds, plus CR-15's line. Each new function or behaviour has Yes, Yes, Yes with an assertion-level failure reason:
- `revokeAccessToken`;
- `removeUserSession`'s row read, lookup error and no-account branches;
- the four `in`-list returns, cron, the cap, `userOrDiscordIdShape` and the `env` guard;
- the handler's parse order, `getItem` and `getCDNUrl`.

The rows marked "No" are disclosed controls on code that already met its cell when the cell was written: M1-h's table rows (code at `69b17af`) and the lookup-error-with-failing-deletion swallow. Each carries a named mutant. The `parseServerCookies` row is superseded: the module and its test were deleted at `6001f7f`, and `Server.session-cookie-redirect.test.ts` carries M1-i with pre-change reds.

Gate: **passed**.

## Test Execution Results

Every count here is re-derived by this pass. Captures under `verification/015/`:

| Capture | What |
|---|---|
| `qa-m4-suite-run.sh` | Suite and typecheck driver: export, `unshare -rn`, `lo` up, isolation counts |
| `qa-p2-run-3031878.txt`, `qa-p2-testresults-3031878.json`, `qa-p2-testresults-paths-3031878.txt` | Its run |
| `qa-sweep.sh`, `mutators/qa-m1-supplement.py` | Generic sweep driver and M1 mutants |
| `qa-m1-sweep-summary-3031878.txt`, `mutation-qa-m1-*-3031878.txt` | Their runs (4 controls, 11 mutants) |

| Check | Result | Exit |
|---|---|---|
| Full suite at `3031878` (export; isolation 0 non-lo links, 0 default routes; export blob of `message.ts` = tree blob) | 842 total, 842 passed, 0 failed; `testResults` 78; stderr 0 lines | 0 |
| Path membership vs `qa-m4-testresults-paths-1e12837.txt` | 0 added, 0 removed. M1's rebuild adds cases to existing files only (825 → 842) | — |
| `pnpm run typecheck` (both programs) | clean | 0 |
| E-8 lockfiles | `git diff --quiet 7ce866b 3031878 -- pnpm-lock.yaml package-lock.json` | 0 |
| QAF-11 | `git grep -c setTimeout 3031878 -- <SectionEditor.auto-remove-dispatch.test.tsx>`: no hit (exit 1). The flake signature was absent in all four full runs this session | — |

### Mutation kill table

**Scope.** These are the Irreversible Side-Effect Register guards M1 changed:
- I-2, the OAuth revoke, seeded at the account decision and the token source (Phase 1 I-2 reconcile);
- I-4, the message insert, seeded at the cap's constant and owner scopes.

Two named leftovers are added: M1-a's "return `[]` early" fix shape, which the implementer left to QA's sweep, and M1-h's rejection handler. **Excluded:** the implementer's 40-odd M1 mutants (`mutators/m1-*.py`, committed captures). This pass did not re-run them. M1's whole production diff falls to the effort-final sweep (Phase 1 "Owed").

**Driver.** `qa-sweep.sh 3031878 qa-m1 mutators/qa-m1-supplement.py …` → `mutate-run.sh`, a fresh export per run inside `unshare -rn`.

**Suite instrument blobs at `3031878`:** `1b781d1` `auth.sign-out.test.ts`; `d535d74` `auth.hydrated-session.test.ts`; `383eccf` `shared.message-cap.test.ts`; `f72e837` `shared.in-predicates.test.ts`. All are committed.

**Controls:** sign-out 12 of 12; cap 10 of 10; in-predicates 4 of 4; hydrated session 18 of 18; all exit 0.

| Mutant | Target | Result | Cases reddened / disposition |
|---|---|---|---|
| `i2-token-is-provider-id` | revoke sends `providerAccountId` | **killed** (3) | "sends one revoke request carrying the account's access token", and the two cache-state cells |
| `i2-token-test-inverted` | `if (!account.access_token)` | **killed** (5) | including "sends no revoke for an account without an access token" and the order cell |
| `i2-tokenless-is-no-account` | a token-less account takes the no-account branch | **killed** (1) | "sends no revoke for an account without an access token, and clears out" |
| `i2-row-read-by-session-token` | `.where('userId', '=', sessionToken)` | **survived** (12 passed) | QAF-26 (1) |
| `i2-lookup-error-swallowed` | `throw err` → `return` | **killed** (2) | the lookup-error cells, by identity |
| `i2-update-unscoped` | the `Accounts` update loses `providerAccountId` | **killed** (3) | the parameter literal `[null, null, 'discord', 'fixture-discord']` |
| `i4-cap-constant-1001` | `MAX_MESSAGES = 1001` | **killed** (3) | user at 1000 and 1001, server at 1000 |
| `i4-user-count-unscoped` | user count loses `fk_users_id` | **survived** (10 passed) | QAF-26 (2) |
| `i4-guild-count-unscoped` | guild count loses `fk_guilds_id` | **killed** (2) | "refuses … server holds 1000", "counts the server's messages, not the user's" |
| `m1a-partial-empty-returns-early` | `getPartialMessages` returns `[]` with no guilds | **killed** (1) | "selects only the user's own messages when the user administers no server" |
| `m1h-message-handler-dropped` | `messagePromise.catch(() => {})` removed | **killed** (6) | the rows where M rejects during or after the account lookup (four "rejects with the lookup's error …"/"returns an empty session …" cells and the two account-lookup-window cells). The run also logs `PromiseRejectionHandledWarning` |

Score: 11 mutants at sites matching "I-2's branch, token-source and update-filter lines in `removeUserSession`; I-4's cap constant and owner `where` clauses in `upsertMessage`; `getPartialMessages`'s empty branch; `hydratedAuthCallback`'s handler line" at `3031878`. That covers 6 + 3 + 1 + 1 sites and excludes every other production line. Killed: 9 of 11.

**On Phase 1's M1-h "catch-and-rethrow around A" mutation.** It was written against `be881c9`'s shape. At `3031878` the message promise carries its own handler, so a catch-and-rethrow around the account lookup is behaviourally equivalent: nothing it wraps can become unhandled. The discriminating mutant for this fix shape is the handler's removal (above), which reddens the rows where M rejects during or after the lookup. It leaves the guild-fetch-only and resolve rows green. The rows-reddened record is the table row above.

## Re-run after QAF-26's fix (website `24ac49f`)

**Stage start.** Code review Round 14 (`e0054f7`) names `13be10d` as test-only and QA's gate; test-only diffs take no review round. Steering's resume brief arrived.

**Scope.**
- The round's diff is `13be10d`: two test files, with 6 lines added and 3 removed. It contains no production line.
- So, per the sweep rule, this re-run covers only the two survivors QAF-26 named.
- M1's production files moved between `3031878` and `24ac49f`, in 5 files: `limits.tsx` and `messageLimits.ts` (M6-l), `constants/index.ts`, `useValidateWebhook.ts` and `WebhookMenu/index.tsx` (CR-17). None of these is an M1 site. The verified surface was executed at `24ac49f`: every M1 test file is in the green suite.

**Adequacy of the tightening (test-only diff, read in full).**
- `auth.sign-out.test.ts`: the stub answers the `Accounts` select only when its SQL carries `"userId" = $1` and `parameters[0]` is `'fixture-user'`. Otherwise it answers `[]`.
- `shared.message-cap.test.ts`: the count stub answers the user count only for `"fk_users_id" = $1` with `'u1'`, and the guild count only for `"fk_guilds_id" = $1` with `'guild-row'`. Otherwise it answers `[]`.
- Both now key positively on the owner filter, as QAF-26 required.

| Run (`qa-m1r-sweep-summary-24ac49f.txt`) | Result |
|---|---|
| control `auth.sign-out` / `shared.message-cap` | 12/12, 10/10, exit 0 |
| `i2-row-read-by-session-token` | **killed** (8 of 12): every revoke-outcome, order and cache-state cell |
| `i4-user-count-unscoped` | **killed** (6 of 10): the user-cap cells, "counts the user's messages, not the server's", and the existing-message cell |

The full suite at `24ac49f` is 1029/1029 with 108 files, exit 0, and typecheck exit 0 (`qa-p2-m6-run-24ac49f.txt`, shared with M6's pass). **Verdict: PASS**, milestone-scoped. QAF-27 LOW stays open and does not block. Its M1-i members are owed before the effort-final pass.

## Implementation Review (Post-Implementation)

**Cells present** (quoted in the helper's map):
- M1-a: all four sites, both directions, with positive user-scoped results.
- M1-b, M1-e (every listed member), M1-f (three cells), M1-j and M1-k.
- M1-c: the five revoke-outcome cells, the row-over-cache token cell, the ordering cell and the lookup-error identity cell.
- M1-d's fixtures (a) and (b) in both directions.
- M1-h's 18 cases. A module-level `unhandledRejection` listener in `beforeEach`, and `setImmediate` yields only, with no wall clock.

**Dispositioned without a finding:**
- **M1-c, the four cache states.** `removeUserSession` never reads the cache at `3031878`. That is structural: `git grep -n "fetchUserAccount(" 3031878 -- src` has no hit in it. So every cache state is one path, and the two cached-`null` producers write the identical value `'null'`, so one fixture covers both. The cached-state cells assert the update by `toContain('fixture-discord')` only. The miss cell's parameter literal covers the update's shape, and `i2-update-unscoped` is killed there.
- **M1-c, "cache holds an account, row absent".** No cell populates the cache in the row-absent case. A fix that consults the cache first is already reddened by the row-over-cache token cell, because it would revoke the stale cached token.
- **M1-g.** The valid-signature control asserts the pong, which requires the parse, so reaching the parse is asserted through its effect.

**Gaps:** QAF-26 (blocking) and QAF-27.

## Findings

QAF-26 MEDIUM Phase 2 RESOLVED (2026-11-08T08:34: website `13be10d`; both mutants killed at `24ac49f`, § Re-run after QAF-26's fix) — Two owner filters that decide the target of an irreversible effect have no assertion, and each is shown by a mutant that survives every suite case at `3031878`.
- **(1) I-2, the sign-out `Accounts` read** (`removeUserSession`, new at `12ac7ed`). It selects the account to revoke by `.where('userId', '=', userDbId)`. Mutant `i2-row-read-by-session-token` reads by the session token and passes all 12 cases. The capturing driver answers the account select whatever its parameters are. M1-c's property is "the token revoked is the `Accounts` row's" (I-2 reconcile, CR-3): the row of the signing-out user. A regression in this filter revokes, and nulls, another account's token.
- **(2) I-4, the user-scoped message count** (`upsertMessage`). Mutant `i4-user-count-unscoped` drops `.where('fk_users_id', '=', select.dbUserId)` and passes all 10 cases. The count stub answers the guild count when the SQL contains `"fk_guilds_id"`, and the user count otherwise. So an unscoped count still receives the user's number. M1-d's property counts the owner's messages (Phase 1 fixture (b), "isolates the owner selection"). A regression here counts the whole table and refuses every user's new message once the table holds 1000.
- **What it fails to check:** that each read or count is bound to the owner it is about.
- **Required (implementer):** tighten the existing cells, not new files.
  - (1) In `auth.sign-out.test.ts`, assert the `Accounts` select's SQL and parameters for one cell, at minimum `"userId" = $1` with `['fixture-user']`, or make the stub answer only for that parameter.
  - (2) In `shared.message-cap.test.ts`, make the count stub key positively on `"fk_users_id" = $n` with the select's `dbUserId` (and on `fk_guilds_id` with the guild's id), answering nothing otherwise. Or assert both count queries' SQL and parameters.
  - Each must be seen red under the named mutant (`mutators/qa-m1-supplement.py`, driver `qa-sweep.sh`) and green at the fix tip.

QAF-27 LOW Phase 2 — Phase 1 § M1 cells not built. None is reachable by a mutant that survives here, so none blocks.
- **M1-c:**
  - the ioredis `[[err, null], …]` deletion-failure shape: `clearUser` returns `pipeline.exec()`, which resolves in that shape, so the outcome holds by construction;
  - the deletion-failure cell yields one `setImmediate` turn where Phase 1 named two;
  - zero `Sessions` statements: no cell asserts it.
- **M1-i:**
  - the legal `%41` octet;
  - the plan's stated residue members, a bare `next-auth.session-token` (no redirect) and a session value `ab%` or `%zz` (one redirect). These pin the Next parser contract the plan adopts, so a Next upgrade that changes it would go unseen;
  - a missing `x-pathname` header (one redirect). A mutant `?? '/message/m/0/edit'` in `Server.tsx` would pass the suite. This is the one member of this list a plausible edit reaches; it is LOW because the code is two lines and unchanged since `6001f7f`.
- **Required (implementer), optional before the effort-final pass:** add the M1-i members to the existing `it.each`, and the missing-header cell. The others are recorded, not owed.

## Assumption Not Checked

This pass assumes the live `Accounts` table has at most one row per `userId` with `provider = 'discord'`, and does not test it. `removeUserSession` reads `executeTakeFirst()` by `userId` alone, with no provider filter, so with two providers or two Discord links the row revoked is whichever Postgres returns first.
- **Signature of its falsity:** a user signing out keeps a valid Discord token while another account row's token is nulled. Or the B-1 to B-5 walkers' re-sign-in does not behave as recorded.
- **What was checked:** the read copies the session callbacks' own pattern. `fetchUserAccount` (`src/utils/redis/index.ts`) also selects by `userId` alone with `executeTakeFirstOrThrow()`, so the premise predates M1. The schema's constraints are not in this repository: `git grep -i accounts` over `*.sql` and `*.prisma` at `3031878` returns no file, and they were not read here.
- **Owner of closing:** the architect, who holds the schema record. Routed in the handoff.
- *Reconcile 2026-11-08T08:08: answered by the architect, AF-26 (agent-output `1e80a16`). **The premise is not guaranteed.*** The pinned schema (project-utils `schema.prisma` at `749606d`) has only `@@unique([provider, providerAccountId])` on `Account`, nothing on `userId`. next-auth 4.24.5 links an unlinked Discord account to a signed-in user, and `auth.ts` sets no `signIn` callback refusing it. So a second Discord row per user can exist, and `removeUserSession` can revoke and null an arbitrary one of them. The class is pre-existing (`fetchUserAccount` reads the same way), and the live population is unread. This verdict does not move: QAF-26 is about the filter's presence, not the row count. Whether the class is a stated limit or a change to M1-c is the planner's, with steering for the owner question (the architect's routing). QA owes a cell only once the plan states the property.
- *Reconcile 2026-11-08T08:12: closed by plan rev 24 (`018f72d`).* D34 makes it a known limit, X-20, with `handoff/one-hooks-user-several-discord-accounts-2026-11-08.md` as its carrier. No cell is owed.

## Blocking-condition register

No row is appended. Rows inherited by M1 and not discharged: B-1 and B-7 (M1-a, limb 1), plus the sign-out note on B-1 to B-5. All are UAT's and open.

## Handoff

- **Implementer (implementer-hooks-015):** QAF-26 MEDIUM, blocking M1's verdict; QAF-27 LOW. M1's Phase 2 re-run follows code review of the fix tip. That re-run covers the round's diff and re-runs the two survivors.
- **Architect:** this pass's Assumption Not Checked (`Accounts` rows per user).
- **Verdict:** QA Failed for M1 at `3031878`, on suite coverage. No production defect was found, and every executed check of production behaviour passed.
- **Verdict (24ac49f, re-run):** PASS, milestone-scoped. M1 is not the last milestone, so no stage is messaged for it on its own. QAF-27 LOW stays with the implementer, owed before the effort-final pass.
