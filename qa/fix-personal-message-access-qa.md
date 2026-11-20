---
ID: n/a
Origin: fix-personal-message-access
UUID: 1b613853
Verified-At: "983681ca6cd7cbacd0796ed093e094057ad7f9be — repos=website; refresh pass over round 5 (75f1543..983681c, security M-001); earlier verdict at 75f1543 expired by that production change"
Status: QA Complete
Status-Detail: "Phase 2 PASS at website 983681c (refresh after round 5, M-001). Register rows B-1, B-2 unchanged, post-deploy, gate nothing. Next: security re-review (RC-1)."
Phase: 2
---

# QA Report: fix-personal-message-access

**Plan Reference**: none (fixer route). Scope: `steering/fix-personal-message-access-rulings.md`, blocks "2026-11-19T20:30Z — scoping
determination", "2026-11-19T22:35Z" (bounded scope) and "2026-11-19T22:59Z" (amended). Implementation:
`implementation/fix-personal-message-access-implementation.md` (`Handoff-At` `ed88e7c`). Code review:
`code-review/fix-personal-message-access-code-review.md` (`APPROVED_WITH_COMMENTS`, `Reviewed-At` `ed88e7c`, sub-entry 1b).
Brief: `steering/fix-personal-message-access-brief-qa.md` and its common part.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-19T23:48 | steering-roadmap-hooks (brief); code review verdict at `ed88e7c` (record `5fcb74e`) | Phase 2 on a fixer chain | Phase 2 — stage start on the committed review verdict at `ed88e7c`. Suite and typecheck re-run in exports; real-database second-user matrix over every in-scope surface (21 cases, base red on S2/S6b/S9/S11); mutation sweep of 40 over `787bec5..ed88e7c` production paths, 35 killed, 4 pre-check survivors (QAF-1) closed by QA's four cases at `75f1543` (4/4 killed), 1 equivalent. PASS at `75f1543`. Register B-1, B-2 minted |
| 2026-11-20T00:16 | code-reviewer-hooks-fix-personal-message-access (Round 2 APPROVED at `983681c`, record `9bd32a4`) | Re-verify after round 5 | Phase 2 — refresh pass at `983681c` (section "Refresh at `983681c`"): suite 1909/1909 exit 0, typecheck 0, second-user matrix 21/21, round sweep 3/3 killed. PASS at `983681c`; the `75f1543` verdict is expired |

## Phase 2 scope

- **Fixer chain.** There is no plan and no Phase 1, by the owner's selection (rulings block 20:30Z, stage set). The Irreversible
  Side-Effect Register is produced below because the fix touches irreversible effects (row deletion, preview deletion, overwrite, broadcast).
- **Stage start.** The review's committed verdict: `Reviewed-At: ed88e7c…`, `Verdict: APPROVED_WITH_COMMENTS` (record `5fcb74e`), re-read
  at the record. Steering's brief was present at start.
- **Production lines.** 117 added over `787bec5..ed88e7c` (the fixer's `git diff --numstat`; re-derived here: MessageProvider 3,
  message.ts 15, shapes.ts 10, shared.ts 88, auth.ts 1). This is at least 20, so a Phase 2 verdict is owed.
- **Criteria this pass assesses.** *Disclosure:* this list was written into the document after execution began, not before as qa.md step 3
  requires. It is the determination's own list, unchanged, and no criterion was added during the pass.
  1. Property (block 20:30Z): a signed-in user can get, change or delete only the personal messages they own; a browser-sent number
     never lets a user read, create, claim, overwrite or delete a row that is not theirs.
  2. "What would catch a breach": a router-level case per surface where a second user is refused — S2, S6b, S11, S6a, S7, S8.
  3. Scope members: owner term inside the S6a, S7 and S8 write queries; a canonical id at the S6a/S6b, S7, S8 and S9 inputs; S18 (the
     `[id]` pages over `getOne`).
  4. Behaviour kept: the owner's own reads, saves, recent data and deletes; a server admin's on server messages; the cap.

**Criteria and their classes.** No criterion names an example. Criterion 2 lists its members, and each is dispositioned below. Criterion 3's
"canonical id" judges a class (number text), and its members are enumerated in the shape probe: ten refused forms and three accepted forms
(`shapes.message-id.test.ts`), plus leading zeros at each procedure in both instruments.

## TDD Compliance (fixer chain)

There is no table on a `fix-` chain. The evidence is the fixer document's Test section. Each round has a recorded red run before its
green run:
- red at `787bec5`: 14 cases, 12 failed;
- red at `2e50cd9`: 18 cases, 5 failed;
- red at `5d9678d`: 30 cases, 6 failed;
- red at `12bcd75`: 13 cases, 3 failed, with the CR-6 signature;
- the CR-1 cases, which passed at red, are each shown killed by named negative controls.

Present and complete. Test form: spec-form throughout. S2's escape would have earned a bug-form test under axiom (B), and none was written.

## Implementation Review

The production diff `787bec5..ed88e7c` was read whole, with these symbols:
- `routers/message.ts`: `getOne`, `upsert`, `updateRecentMessageData`, `delete` and `authorizeAction`;
- `utils/shapes.ts`: `messageIdShape`, `optionalIdMessageShape` and `recentMessageDataShape`;
- `utils/shared.ts`: `getUserRecentMessages`, `buildInsertMessageQuery`, `buildUpdateOwnedMessageQuery`, `upsertMessage`,
  `updateRecentMessageData` and `deleteOwnedMessage`;
- `auth.ts`: `hydratedAuthCallback`;
- `providers/MessageProvider/index.tsx`: `upsert`'s `onSuccess`.

The fix stays inside the bounded scope. There is no overreach: S1b, S5, S14–S17 are untouched.

**Hazards re-derived (common part 1–7):**
1. *Guild rows.* `buildMessageValues` writes `fk_users_id: null` for a server row. So the personal owner term (`fk_users_id = caller`) cannot
   match a server row written by current code, and a server save keys on `fk_guilds_id`. The instrument's control (B as server admin saves
   and records on, and deletes, the server message) passes at `ed88e7c`. Rows written before `98ecb0b` (2023-07-26) are unread: see the
   Assumption Not Checked.
2. *Cap.* Measured. The S6b cap case is red at base and green at the tip on a real database. The mutant `cap-counts-guild-only` and the
   generated `>=` and `if-false` mutants on the cap line are all KILLED.
3. *Stored foreign ids.* The filter is at the read (`getUserRecentMessages(ids, user.id)`). The S11 cases are red at base and green at
   the tip, and both list-arm mutants are KILLED.
4. *S18.* `git grep` over `src` at `ed88e7c` finds two `getOne` callers, `MessageProvider` and `app/message/f/[id]/page.tsx`. Both go
   through the procedure the S2 cases drive, and the share-code path (`getFromCode`) does not use it.
5. *Canonical ids.* One shape (`messageIdShape`) at all four procedures. Leading-zero cases at every procedure pass in both instruments,
   and `delete-input-raw` is KILLED in both.
6. *Check-then-write.* Every write path carries the owner term in the write itself:
   - `upsertMessage` writes through `buildUpdateOwnedMessageQuery` and inserts only at a server-assigned id;
   - `updateRecentMessageData` and `deleteOwnedMessage` carry the term.
   The `Messages` writers reachable from a request (`git grep` for `deleteFrom('Messages')` and `updateTable('Messages')` at `ed88e7c`)
   are these three plus `previewImage.ts`'s nonce commit, which is keyed on the server's own saved id. `scripts/backfillValid.ts` is
   offline. No request path checks in one query and writes in another without the term.
7. *Production on push.* No push was made. Release consequence: the common part states "Vercel deploys it to production, with no beta;
   `website/.github/workflows` is absent". This pass did not read the Vercel configuration: devops's to establish.

## Test Coverage Analysis

| Surface | Production site | Suite case(s) | Real-database case(s) (QA instrument) | Status |
|---|---|---|---|---|
| S2 / S18 | `getOne` → `authorizeUser(…, message.id)` | `message.personal-ownership` "refuses another signed-in user…" | S2 ×2 refusals + owner control | COVERED |
| S6a personal | `upsert` pre-check; `buildUpdateOwnedMessageQuery` user term | owner-term case; **QA: "upsert refuses a personal save…"** | S6a ×2 refusals + owner control | COVERED (was MISSING router refusal — QAF-1) |
| S6a server-path claim | `upsert` guild pre-check; guild term | guild owner-term case; **QA: "upsert refuses a server save…"** | S6a server-save refusal + admin control | COVERED (QAF-1) |
| S6b | `upsertMessage` insert path, cap | "never writes a row at the number…", "announces no update…", cap case | S6b ×2 + control | COVERED |
| S7 | `updateRecentMessageData` pre-check and write term | owner-term cases ×2, leading zeros; **QA: "updateRecentMessageData refuses…"** | S7 ×2 refusals + owner and admin controls | COVERED (QAF-1) |
| S8 / S9 | `delete` pre-check, `deleteOwnedMessage` term, preview guard | owner-term ×2, previews ×2, leading zeros; **QA: "delete refuses…"** | S8 ×2 refusals + owner (canonical prefix) and admin controls | COVERED (QAF-1) |
| S11 | `getUserRecentMessages` arms; `auth.ts` call site | `auth.hydrated-recent-messages` ×2, `shared.in-predicates` | S11 refusal + owner control | COVERED |
| id shape | `messageIdShape` | `shapes.message-id` (13), per-procedure past-int8 and int8-max | leading zeros per surface | COVERED |
| CR-5 draft | `MessageProvider` `onSuccess` | `MessageProvider.save-new-number` ×3 | — | COVERED |

**Test audit (Test Conventions, Iron Laws):**
- **Placement and names.** All four new files pass the positive form. ID tokens: zero hits in added titles, basenames or comments. The scan
  ran over `verification/fix-personal-message-access/qa/test-diff-787bec5-ed88e7c.patch`, written by `git diff --output`, never a piped stream. Its 2 hits are `'m1'`, `'m2'` in
  `shared.in-predicates`, which is fixture data and sat in the base file. Convention check `--since=787bec5`: 15 files, 0 FAIL,
  0 CANDIDATE (`verification/fix-personal-message-access/qa/convention-check-ed88e7c.txt`).
- **Time-based cells.** None of the four new files contains `setTimeout`, `useFakeTimers`, `sleep`, `Date.now` or `waitFor` (`git grep`
  at `ed88e7c`).
- **Invented fixtures (Iron Law 5).** The `capturingDatabase` responders stand in for postgres `where` matching. The implementation
  document names this ("Invented boundary values"), and the real-database instruments, the fixer's and QA's, check it.
  `auth.hydrated-recent-messages`'s fake does not model the `fk_guilds_id is not null` arm. That arm is held by `shared.in-predicates`
  (SQL text) and by the S11 real-database case. This is not a finding: each is a named instrument for the arm.
- **Oracles.** The expectations are literals, such as the ids, `NOT_FOUND` and the channel names. None is computed by the code under
  test.
- **Discriminating pairs.** Every refusal has an owner-positive control in the same file (see the table), so a blanket refusal fails.

## Test Execution Results

### Unit and component suite (vitest)

| Tree | Command | Cases | Files | Exit | Capture |
|---|---|---|---|---|---|
| `ed88e7c` (export) | `npx vitest run --reporter=json --outputFile=…` | 1904 passed / 1904 | 148 | 0 | `verification/fix-personal-message-access/qa/suite-ed88e7c.{json,exit}` |
| `75f1543` (export) | same | 1908 passed / 1908 | 148 | 0 | `verification/fix-personal-message-access/qa/suite-75f1543.{json,exit}` |

- File membership at `ed88e7c` matches the fixer's `suite-ed88e7c.json` path for path. Paths were compared after normalising the
  absolute `bot/` prefix, which differs only in form.
- Against base `suite-base-787bec5.json` the tip adds four files and drops none:
  - `message.personal-ownership`
  - `auth.hydrated-recent-messages`
  - `MessageProvider.save-new-number`
  - `shapes.message-id`
- `75f1543` is +4 cases in an existing file.

### Typecheck

`pnpm run typecheck` runs both tsc programs. Results: `ed88e7c` exit 0, `75f1543` exit 0 (`verification/fix-personal-message-access/qa/typecheck-*.txt`).

*Instrument note:* a bare export lacks `next-env.d.ts`. That file is git-ignored and generated by Next, so the first run failed once on
`src/app/page.tsx` (`~/assets/img/product_image.png`). The tree's own `next-env.d.ts` was copied into the export (sha256 in
`verification/fix-personal-message-access/qa/typecheck-ed88e7c.next-env.sha256`) and the run repeated. This is a gate satisfied, not a control.

### Integration — real-database second-user matrix (QA instrument)

The instrument and its driver:
- `verification/fix-personal-message-access/qa/second-user.pg.test.ts`, driven by `verification/fix-personal-message-access/qa/run-second-user.sh` (copied from
  `verification/fix-personal-message-access/pg/run-pg.sh`, not edited in place);
- an export of the SHA, a throwaway `postgres:16` with schema `verification/fix-personal-message-access/pg/schema-749606d.sql`, and message ids from 900000000000001.

What is real and what is stubbed:
- Real: the routers via `appRouter.createCaller`, `authorizeUser`, `authorizeGuildUser`, the shared queries, kysely and pg.
- Stubbed: env, Pusher (channels recorded), `waitUntil`, preview generation, the S3 client (inputs recorded), redis and
  `authorizeGuildAdmin` (B is the server's admin; S1b is out of scope).
- Global `fetch` is stubbed to throw, so the database is the only socket opened.
- *Not network-isolated:* `unshare -rn` would cut the loopback port to the container. The outbound clients are stubbed instead.

Each refusal asserts the error code and the whole `Messages` table unchanged.

| Tree | Cases | Failed | Exit | Failing cases | Capture |
|---|---|---|---|---|---|
| `ed88e7c` | 21 | 0 | 0 | — | `verification/fix-personal-message-access/qa/pg-out/pg-ed88e7c.*` |
| `787bec5` (base) | 21 | 6 | 1 | S2 ×2 (B reads A's row), S6b ×2 (row created at the sent number; cap bypassed), S8 owner control (preview prefix `previews/00…`, S9), S11 (A's row in B's list) | `verification/fix-personal-message-access/qa/pg-out/pg-787bec5.*` |

At base, the S6a, S7 and S8 second-user refusals already pass: the router pre-checks predate the chain. Those cases are shown to
discriminate by the mutant runs below, not by base.

**The instrument under mutants at `ed88e7c`:** 12 runs from `verification/fix-personal-message-access/qa/mutants-qa.json` via `run-second-user.sh <sha> … <ids>`, list in
`verification/fix-personal-message-access/qa/pg-mutants.txt`. 12 of 12 exited 1, and each reddened its own surface's cases (`verification/fix-personal-message-access/qa/pg-mutant-out/`):

| Mutant(s) | Cases reddened |
|---|---|
| `getone-precheck-no-id` | S2 ×2 |
| `upsert-precheck-no-id` | S6a personal ×2 |
| `upsert-guild-precheck-no-id` | S6a server-save |
| `recent-precheck-no-id` | S7 ×2 |
| `delete-precheck-no-id` | S8 ×2 |
| `upsert-precheck-no-id`+`update-user-term-dropped` (check and write term both gone) | S6a personal ×2 |
| `recent-precheck-no-id`+`recent-write-user-term-dropped` | S7 ×2 |
| `delete-precheck-no-id`+`delete-write-user-term-dropped` | S8 ×2 |
| `insert-at-client-id` | S6b "becomes B's own row…" |
| `recent-list-owner-arm-any` | S11 refusal |
| `hydrated-owner-discord-id` | S11 refusal and S11 owner control |
| `delete-input-raw` | S8 owner control (canonical prefix) |

`docker ps -a --filter name=fpma-qa` was empty after every run (`verification/fix-personal-message-access/qa/pg-mutant-out/docker-ps-after.txt`).

*Limit:* the paired check-and-term mutants redden the same cases as check-only. The instrument asserts the refusal first, so it cannot
tell "refused late" from "written". The write term's own effect behind a missing check is the fixer's "past the router's check" cases
(`verification/fix-personal-message-access/pg/out-round2/`), together with the term mutants killed in the suite below.

### Mutation sweep (suite as kill instrument)

**Set:**
- 11 generated mutants: the `mutant-gen.js` operators over lines added in `787bec5..ed88e7c` in production paths, read at `ed88e7c`
  (`verification/fix-personal-message-access/qa/mutants-gen.json`, stdout `verification/fix-personal-message-access/qa/mutants-gen.stdout.txt`). The generator excludes the ten test files the range touches.
- 29 written by QA (`verification/fix-personal-message-access/qa/build-qa-mutants.py` → `verification/fix-personal-message-access/qa/mutants-qa.json`; each `old` checked exactly once at the SHA). They cover the decision
  sites operators cannot express: router pre-checks, call-site owners, owner terms in each write, the term choice, the list arms, the
  shape's digits, bound and canonical output, the input shapes, and the CR-5 draft key.
- Coupling mutants included:
  - `delete-owner-always-user` and `-always-guild`;
  - `update-term-choice-inverted`;
  - `recent-list-guild-arm-any`.
- Cross-file coupling (pre-check plus write term) cannot be expressed as one replacement. It is run on the real-database instrument
  above.

**Runner:**
- `mutation-run.py --sha <sha> --dep node_modules --timeout 300 -- npx vitest run`, without bail, run by a helper.
- Runner blob `b26916e7c0bf74ee49a69bb99eff2a627f6d9947`; `mutants-all.json` blob `466531e867eede728305ebef81b960ab4da5a57e`.

| Tree | Set | Control | KILLED | SURVIVED | Other | Table |
|---|---|---|---|---|---|---|
| `ed88e7c` | 40 | passed, 1904 | 35 (all count `checked`) | 5 | 0 stillborn, 0 aborted | `verification/fix-personal-message-access/qa/sweep-ed88e7c/mutation-table-…-20261119T232924Z-p940771.json` |
| `75f1543` | the 4 non-equivalent survivors | passed, 1908 | 4 (`checked`) | 0 | 0 | `verification/fix-personal-message-access/qa/sweep-75f1543/mutation-table-…-20261119T234338Z-p1121243.json` (mutants blob `86291c0f603c574016c1fe6e0312e7eb3b2fa417`) |

Counts were re-derived by `python3 -I -c` with `collections.Counter` over each table's `mutants[].outcome`.

**Survivors at `ed88e7c`, dispositioned:**
- `upsert-precheck-no-id`, `upsert-guild-precheck-no-id`, `recent-precheck-no-id` and `delete-precheck-no-id`: QAF-1. Closed at
  `75f1543`; each was KILLED there by exactly the new case for its surface.
- `shape-raw-text-out` (`.padStart(1, '0')` appended to the canonical output): **equivalent**. `BigInt(x).toString()` is never shorter
  than one character, so `padStart(1, …)` is the identity on every value the transform receives.

**Seen-red record per case:**
- In `message.personal-ownership`, every case except two was reddened by at least one mutant of its own surface; the two are below.
- "takes the largest number a message can hold to the database" ×4 was reddened by the generated `<=` mutant.
- "refuses a number that is not digits" (upsert) was reddened by `upsert-id-raw`.
- `getOne`'s past-int8 case was reddened by `getone-input-raw` and `shape-max-plus-one`.
- Not reddened by any mutant in this set: "returns the message to the user who owns it", and "refuses a number that is not digits"
  (delete) was reddened only by `delete-input-raw`. The first is an owner-positive control. Its discriminating mutant is the fixer's
  `getOne-caller-identity` (KILLED, `verification/fix-personal-message-access/negative-controls-2e50cd9/`), and it was not re-run here.

## Findings

QAF-1 MEDIUM Phase 2 RESOLVED — the standing suite had no router-level case where a second user names the owner's personal number on `upsert` (personal or server path), `updateRecentMessageData` or `delete`; four pre-check mutants SURVIVED at `ed88e7c`. Closed by QA's four cases in `message.personal-ownership.test.ts` ("another signed-in user naming the owner's personal message number"), website `75f1543`, each KILLED by its own mutant there. A test-only commit; production tree unchanged.

**Severity, for the record:** this behaviour is relied upon and was preserved without an assertion. The determination names it as the
breach catch, and the implementation's flows say the behaviour works "as before". That meets the severity floor (MEDIUM). It was resolved
in the pass, because QA may write test cases and no production change was needed.

No other finding.

## Irreversible Side-Effect Register

| # | Effect | Performed by | Must be true first | Enforced identically on every route? |
|---|---|---|---|---|
| E1 | `DELETE` of a `Messages` row | `deleteOwnedMessage` (`shared.ts`), sole caller `message.delete` | Caller owns the row (personal: `fk_users_id = caller`; server: row's guild is the authorized guild), id canonical | Yes. One route (`git grep "deleteFrom('Messages')"` over `src` at `ed88e7c`: `shared.ts` only). Pre-check `authorizeAction` and owner term in the delete; both mutated and KILLED |
| E2 | Bucket delete of `previews/<id>/` | `deleteMessagePreviewImages`, sole caller `message.delete` | E1 removed a row; prefix from canonical id | Yes. One caller; guard `if (deleted)` and `> 0` mutants KILLED; canonical prefix asserted in both instruments |
| E3 | Overwrite of a row's name/data/valid | `buildUpdateOwnedMessageQuery` via `upsertMessage` (callers: `message.upsert` personal and server branches) | Caller owns the row by the same owner rule | Yes: both branches carry the term (`update-*-term-*` mutants KILLED); pre-checks KILLED after QAF-1 |
| E4 | Overwrite of recent webhook data | `updateRecentMessageData`, sole caller the procedure of that name | Same owner rule | Yes; term and pre-check mutants KILLED |
| E5 | Insert of a new row | `buildInsertMessageQuery` via `upsertMessage` | Under the cap; id server-assigned | Yes: the insert path always runs the cap; `insert-at-client-id` KILLED in both instruments |
| E6 | Pusher publish on `message-update-<id>` | `upsertMessage` | An owned update matched; channel from canonical id | Yes: `updated && message.id` (`&&`, `if-false` KILLED); canonical channel asserted |
| E7 | Preview generation and `previewImageNonce` commit | `runPreviewContinuation` / `previewImage.ts` | Row was saved by this call (id from the database's returning row) | Unchanged by this chain; keyed on the saved id |

## Blocking-condition register (this chain's; first QA document)

*Standing note:* this register is point-in-time. Later stage documents are authoritative on each row's execution state: the post-deploy
carrier `handoff/<name>.md` that devops creates at Stage 1, then the deployment record. This chain has no UAT stage, so the rows reach
`steering-roadmap-hooks` as a block (brief).

**Class.** Both rows read production, which only the release act changes, so neither can reach a terminal state before that act. They are
post-deploy-observable rows under the stage set's "Post-deploy: the browser check" (block 20:30Z). They never gate the release act.

| ID | Class | Condition | Primary instrument | Subject / fallback | Earliest-decidable condition | Predicted value | Failure mode | Owner | Discharging document | State |
|---|---|---|---|---|---|---|---|---|---|---|
| B-2 | post-deploy-observable (running-code precondition) | Production serves the fixed `messageIdShape` (settles: the fix is the running code before B-1 is read) | Signed in to hooks.gg as a test account: `GET /api/trpc/message.getOne?input={"json":"99999999999999999999"}`, then read the HTTP status and the error code | uat-role session on the test accounts / owner | A Vercel production deploy of website `master` whose tree contains `75f1543`'s production files | Fixed: 400, `BAD_REQUEST` (the shape refuses before any query; suite case "getOne refuses a number past the largest…"). Unfixed: 500 (`787bec5`'s `/^[0-9]+$/` admits it and postgres raises out of range; fixer Diagnosis, CR-2). One observation decides. | If it still answers 500, the deploy is not serving the fix and B-1 says nothing | uat-role session (stage set) | `handoff/<name>.md` (devops, Stage 1) | Open. Minting read 2026-11-19T23:45:54Z, signed out: 401 `UNAUTHORIZED`, because the auth middleware answers before the input (`verification/fix-personal-message-access/qa/prod-look-getone-past-int8.json`). The signed-in unfixed value was **not read**: sign-in crosses a Discord OAuth redirect, which is not a single look. The unfixed prediction rests on code |
| B-1 | post-deploy-observable (distinguishes fixed from unfixed; S2 escaped) | Criterion 1, read limb: test account 1 cannot open test account 2's personal message on production | The walk in `verification/access-defects/browser-check/README.md`: account 2 creates and saves a personal message; account 1 opens `/message/m/<n>/edit`; account 2 deletes it | uat-role session on the two test accounts / owner | B-2 passed | Fixed: the editor's load error, with none of account 2's content on the page. Unfixed: shown on production 2026-11-19T08:58Z (message 6020 opened in full by account 1). One observation decides. | If account 1 still sees account 2's content, any signed-in user can still read any personal message by its number | uat-role session (stage set) | `handoff/<name>.md` (devops, Stage 1) | Open |

**Related, not rows:** the owner's residue check on production data (implementation Diagnosis, "Residue already in production") is held
by steering to the release seam (block 22:59Z). This pass asks steering to add one count to it; see Assumption Not Checked.

## Assumption Not Checked

This pass assumes that no production `Messages` row carries both `fk_users_id` and `fk_guilds_id`, and does not test it.
- Basis: code since `98ecb0b` (2023-07-26) writes `fk_users_id: null` for a server row (`buildMessageValues`). The schema has no
  constraint against both columns being set (`verification/fix-personal-message-access/pg/schema-749606d.sql`). The writer before `98ecb0b` (the Prisma era from `c0b59c3`) is
  unread.
- Falsity signature: `select count(*) from "Messages" where fk_users_id is not null and fk_guilds_id is not null` is above 0 on
  production. For such a row, the row's creator passes `authorizeUser` on a personal-path `upsert` (no `guildId` sent), and the personal
  owner term matches. So a creator who is no longer the server's admin can overwrite that server message. This was equally true at base,
  so it is not introduced here.
- Owner: steering's held residue check (the owner's production read at the release seam). Routed by message in this pass.

## Refresh at `983681c` (round 5, security M-001)

**What expired the earlier verdict:**
- Stage start: code review Round 2 `APPROVED` at `983681c` (`Reviewed-At`, record `9bd32a4`), re-read at the record.
- Delta `75f1543..983681c` (`git diff --numstat`): `routers/message.ts` +7/−1 and `message.personal-ownership.test.ts` +15/−1.
- The production change: `getOne`'s personal branch now throws `NOT_FOUND` when `authorizeUser`'s `oldMessageCount` is 0. That
  closes the window where the owner's delete lands between the load and the ownership check.
- 124 production lines added over `787bec5..983681c` (the fixer's figure; this delta adds 7).

**TDD evidence (fixer, round 5):**
- red at `75f1543`: 32 cases, 1 failed, with M-001's signature (the row returned);
- green at `983681c`;
- 2 of 2 negative controls KILLED;
- security's read-race instrument at `983681c`: 300 trials, 0 leaks (implementation, Test "Round 5").

Present. The new case's invented fixture (`world.goneAtCheck`) is named in that section, with its falsity signature. The title carries no
ID token.

| Run (this pass) | Result | Capture |
|---|---|---|
| Suite, export of `983681c` | 1909 passed / 1909, 148 files, exit 0; file membership equal to `75f1543`'s | `verification/fix-personal-message-access/qa/suite-983681c.{json,exit}` |
| `pnpm run typecheck` (export, `next-env.d.ts` copied as before) | exit 0 | `verification/fix-personal-message-access/qa/typecheck-983681c.txt` |
| Second-user real-database matrix | 21 of 21, exit 0; no container left | `verification/fix-personal-message-access/qa/pg-out/pg-983681c.*` |
| Round sweep: `mutant-gen --range 75f1543..983681c` (2 mutants on `getOne`'s new guard) plus 1 QA mutant (`getone-check-without-id`: the check without the id) | control passed (1909); **3 of 3 KILLED**, count `checked` | `verification/fix-personal-message-access/qa/sweep-983681c/mutation-table-983681c…-20261120T001441Z-p1455313.json`; set `verification/fix-personal-message-access/qa/mutants-983681c.json` |

**Seen-red record:**
- `if-false` was killed by the new race case.
- `not` was killed by the owner case, the race case and the canonical read.
- `getone-check-without-id` was killed by the owner case and the canonical read. It fails closed: the owner is refused.

The sweep covers this round's diff only. The `ed88e7c` sweep stands for the earlier rounds.

**Scope limits:**
- Real concurrency timing is security's read-race evidence. It is not re-run here.
- The guild branch of `getOne` returns its pre-check read unchanged. That is out of scope (S1b family), and the reviewer's class sweep
  over the seven check call sites found no other site.
- Register rows B-1 and B-2 are unchanged: the past-int8 refusal and the second-user refusal sit on the same paths at `983681c`.

## Handoff

- Verdict **PASS** at website `983681c` (refresh). The earlier verdict at `75f1543` is expired by round 5. Next: `security` on the change (brief `steering/fix-personal-message-access-brief-security.md`),
  started by steering on this verdict.
- Register rows B-1 and B-2 and the Assumption Not Checked go to `steering-roadmap-hooks` by SendMessage.
- Infrastructure this pass set up and removed:
  - throwaway `postgres:16` containers `fpma-qa-*`, none left (`docker ps -a --filter name=fpma-qa` empty);
  - the exports under the session scratchpad;
  - the stage browser, closed, with the profile holder read `no holder` and the cache directories emptied. One look was made on
    production, signed out.
