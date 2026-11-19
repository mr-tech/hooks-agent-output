---
ID: n/a
Origin: fix-personal-message-access
UUID: 1b613853
Reviewed-At: d597734859bb58e184cd7f218708382e46aa1589 — repos=website
Status: In Review
Round: 1
Verdict: REJECTED
---

# Code Review: fix-personal-message-access

**Plan Reference**: none (fixer route). Scope: `steering/fix-personal-message-access-rulings.md`, blocks "2026-11-19T20:30Z — scoping
determination" (property), "2026-11-19T22:35Z" (bounded scope) and "2026-11-19T22:59Z" (amended: delete owner term, upsert canonical id;
record `2af7391`).
**Implementation Reference**: `agent-output/implementation/fix-personal-message-access-implementation.md` at record `98a103e`
(`Handoff-At: d597734…`).
**Date**: 2026-11-19
**Reviewer**: Code Reviewer (`code-reviewer-hooks-fix-personal-message-access`)

## Changelog

| Date (UTC) | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-19T23:08 | fixer (`98a103e`, website `d597734`) | Round 1 code review | Round 1: REJECTED on CR-1 (MEDIUM, severity floor: the editor's move to a server-assigned number, which the fix now relies on, has no assertion). Ownership attacks: 187 of 187 hold at `d597734`. CR-2 to CR-5 are LOW/INFO, routed in Next Steps. The steering hold at `2e50cd9` was honoured; no verdict was given at that SHA. |
| 2026-11-19T23:09 | steering (`e908744`, block 23:09Z) | Routing of CR-2 to CR-5 | CR-2 is in scope, and the fixer takes it with CR-1 (production lines). CR-3 goes to a handoff steering writes. CR-4 goes to a handoff owned by the architect, triggered at release. CR-5 is the fixer's choice, stated by the CR-1 test. The Assumption Not Checked owners are confirmed. The fix confirmation remains a sub-entry of Round 1, since CR-1 and CR-2 are both this round's findings. |

## Scope of this round

The criteria assessed are recorded before the diff was read, from the amended scope statement (block 22:59Z):

1. The S2/S18 `getOne` owner check.
2. S6b: no row at a browser-chosen number, and the cap on every create.
3. S11: the hydrated list filtered at the read.
4. An owner term inside the S6a save, the S7 recent-data write and the S8 delete.
5. A canonical id at the S6 upsert input and the S7, S8 and S9 inputs.
6. Against the property: a number sent by the browser never lets a user read, create, claim, overwrite or delete a row that is not
   theirs.

Files reviewed (`git show d597734:<path>`), being every production and test file in `git diff --numstat 787bec5 d597734`:
- production: `routers/message.ts`, `utils/shapes.ts`, `utils/shared.ts`, `server/auth.ts`;
- the two new test files, and the six edited `utils/__tests__/*` files.

The tree was read at `d597734` and re-verified at the end of the review (`git rev-parse chain/fix-personal-message-access`).

## Architecture Alignment

**System Architecture Reference**: `agent-output/architecture/system-architecture.md`. It exists: `ls -d` in `/usr/local/bin/hooks/agent-output`,
and `git -C /usr/local/bin/hooks/agent-output ls-files architecture/system-architecture.md` lists it.
**Alignment Status**: ALIGNED

- **W-2 ("the back end reflects what the front end allows").** The refusals added are ownership-only, as the common brief requires. No
  draft-validity refusal is added. The non-digit id refusal is an input-format refusal on an id the site's own editor never sends
  non-canonical.
- **Write surface for `Messages`.** I checked it against the "Persisting writers" row. Command: `git grep -n -E
  "(insertInto|updateTable|deleteFrom)\(['\"]Messages['\"]\)" d597734 -- src ':!**/__tests__/**'` gives 6 hits.
  - `shared.ts` insert, owned update, recent-data update and `deleteOwnedMessage` are this change.
  - `previewImage.ts` (the preview commit, keyed by the database id and a nonce) and `scripts/backfillValid.ts` (offline) take no
    browser number.
  - Reference cross-check: the five `message.upsert` callers named in the record all reach `upsertMessage` through the one router
    procedure (`git grep -n "upsertMessage(" d597734 -- src ':!**/__tests__/**'`).
  - No second persisting path writes `Messages` with a browser id.
- **"`upsertMessage` counts the owner's messages on every save"** (Problem Areas) is no longer true at `d597734`: the count runs only on
  the insert path. See CR-4.

## TDD Compliance Check

**TDD Table Present**: No. This is a fixer route: `fixer.md` § Document prescribes a Test section (red run · green run · negative
controls) in place of the table, and it is present.
**All Rows Complete**: n/a. In its place, the Test section was checked:
- **Red runs:** `787bec5` (14 cases, 12 failed) and `2e50cd9` (round 2: 18 cases, 5 failed).
- **Green:** 1879 cases, exit 0.
- **Negative controls:** 20 + 8, all KILLED. Every case that passed at red has a named control.
- **Invented fake-database values:** named, with the falsity signature, and backed by a real-postgres run.

`tdd-check.py` is for Python sources and does not apply.
**Concerns**:
- **Spec form chosen over the bug form the escape earns.** S2 escaped, so axiom (B) allowed a bug-form test; the fixer chose spec form.
  That is permitted.
- **Test names:** the new titles and basenames carry no ID token. Command: `git grep -c -i -E` with the CLAUDE.md class, over both new
  files: 0 hits. The checker's own ID-token check SKIPs, so this one is by hand.
- **Expected values are literals,** not derived from production constants. The cap message is a literal string.
- **The gap is CR-1:** a client behaviour the change now relies on has no assertion.

## Adversarial Execution

The change modifies an authorization gate and an irreversible action (delete), so I attacked it with an instrument I authored, not the
fixer's.

- **Instrument:** `verification/fix-personal-message-access/code-review/attack.pg.test.ts`, driven by `run-attack.sh <sha> <port> <work>
  <out>`.
  - It runs the real tRPC router (`appRouter.createCaller`), the real `authorizeUser` / `authorizeGuildUser`, kysely, pg and a
    throwaway `postgres:16`.
  - Ids are moved to ≥ 900000000000001 before any write.
  - The schema is the fixer's `pg/schema-749606d.sql` from project-utils.
  - Stubbed: env, Pusher (channels captured), S3 (inputs captured), `waitUntil`, preview generation, redis, `authorizeGuildAdmin` (admits
    caller C to any server).
- **Module-scope branches checked:** `NODE_ENV=test` (not `development`, so `getFromCode`'s dev seed and the hydrated dev guild stay
  off); env values are a stub proxy.
- **Input class** (13 text forms of the victim's number):
  - accepted forms: canonical, leading zeros, `+`, leading space, trailing space, trailing `\n`, tab-padded;
  - refused or edge forms: full-width digits, negative, exponent, beyond int8, empty, `0`.
- **Procedures and actors:**
  - `getOne` as B;
  - `upsert` personal as B, and guild path as admin C on A's number;
  - `upsert` as C into a different server on the server row;
  - `updateRecentMessageData` as B;
  - `delete` as B and as C;
  - the hydrated session list with A's numbers in B's preferences.
- **Two modes:**
  - the router's check in force;
  - the router's check bypassed, which makes the write's own owner term the only guard and stands in for the check-then-write race
    (`mocks.bypass`).
- **Oracle, defined before the run:**
  - every row present before the attack is unchanged and still present;
  - no row the attack creates is A's by owner or carries A's text;
  - no response carries A's text;
  - no Pusher channel and no S3 input names A's number.
- **Positive controls** (the oracle fires on a real change): A's own save changes the snapshot; A's leading-zero delete removes the row
  and clears `previews/<canonical>/`; A's `getOne` carries A's text.
- **Calibration** (`code-review/calibration/`):
  - `787bec5`: 187 cases, 52 failed. Every defect class in scope is red: `getOne` leak; save, recent-data and delete without a write
    owner term; browser-chosen number; the leading-zero preview prefix; the hydrated list.
  - `2e50cd9`: 4 failed, exactly the delete-past-the-check cases that the 22:59Z ruling brought into scope.
- **Result at `d597734`: 187 of 187 passed, vitest exit 0** (`code-review/run-d597734/attack-d597734.{json,exit}`). No container was left
  (`docker ps -a | grep -c fpma-cr` returned 0).
- **Not driven:**
  - The HTTP adapter and the NextAuth session that supplies `session.user.id`. The attack injects the session (Assumption Not Checked).
  - Concurrency itself. The bypass mode stands in for the race's outcome, not its timing.
- **Instrument defects of mine, disclosed:**
  - The first oracle counted a new server row created by admin C as a victim row. That gave 18 false reds at `2e50cd9`. I corrected
    it to compare only pre-existing rows plus the ownership of new rows, and re-ran both calibration SHAs.
  - My first invocation used a relative output path. The script's cleanup redirect then failed and two `fpma-cr-*` containers were
    left. I removed both by name, and the re-runs left none.

## Findings

### Critical
None.

### High
None.

### Medium

CR-1 MEDIUM Round 1

**[Test adequacy, severity floor]**: the editor's move to a server-assigned number, which the fix now relies on, has no assertion.
- **Location**:
  - `src/providers/MessageProvider/index.tsx`, `MessageProvider`, the `api.message.upsert.useMutation` `onSuccess` branch
    `if (msg.id !== message?.id) router.replace(\`/message/m/${msg.id}/edit\`)`;
  - relied on by `src/server/api/utils/shared.ts` `upsertMessage`: the owned update matches nothing, then the save falls through to
    `buildInsertMessageQuery`.
- **Class**: a client reaction that a server change newly makes reachable for an input it previously never received, with no assertion
  that fails when the reaction is lost.
- **Enumeration**:
  - Client reactions to `upsert` returning an id different from the one sent: `git grep -n "msg.id !== message?.id\|msg.id === message?.id"
    d597734 -- src` gives 2 hits, both in `MessageProvider` `onSuccess`.
  - Tests asserting that reaction: `git grep -n -E "replace" d597734 -- 'src/providers/MessageProvider/**/__tests__/*'` gives 0 hits.
    The provider's two save tests (`MessageProvider.own-save-notice`, `.save-step`) answer `onSuccess` with the same id `'42'`.
  - The other four `upsert` callers send no id (the implementation document's hazard 2, re-checked by `git grep -n "upsert.useMutation"
    d597734 -- src`), so the class has one member.
  - Blind spot: the predicate finds only reactions written as an id comparison in `onSuccess`. A reaction in a query invalidation or in
    the Pusher path is not matched. I read `usePusher` and found none keyed on the returned id.
- **Issue**:
  - Before the fix, an existing-number save always returned the number it sent.
  - At `d597734`, a save whose row is gone (deleted in another tab, the case the document names in hazard 2 and the User-visible flows)
    creates a new row at a new number. The document's user-visible claim is "moves the editor to the new number".
  - Only the untested branch above does that. If it is lost or reordered, the editor stays on the dead number, and every later Save
    falls through to a fresh insert again: one new row per click.
  - That is a duplicate-row multiplier on the user's own account, bounded by the 1000 cap. Its magnitude is an unmeasured hypothesis,
    read from code.
  - A behaviour the change relies on without an assertion is MEDIUM at least, and blocks hand-off to QA.
- **Required Action** (a test-only diff; the production code is not at fault):
  - **Minimum**: a spec-form case beside the provider's existing save tests, mounted with `mountMessageProvider`.
    - Setup: the editor holds number N; Save's `onSuccess` answers with a different number M.
    - Assertion: the router's `replace` is called with `/message/m/<M>/edit`.
    - Falsity signature: an assertion failure (`replace` not called, or called with N), never a timeout.
    - Show it red under one negative control that removes or inverts the `msg.id !== message?.id` branch. Record that in the Test
      section.
  - **Preferred**: the same case also states what happens to the draft stored under N (see CR-5), so the reaction is specified whole.

### Low/Info

CR-2 LOW Round 1

**[Input validation]**: a message number accepted as digits but beyond int8 fails as `INTERNAL_SERVER_ERROR` rather than being refused.
- **Location**: `src/server/api/utils/shapes.ts` `messageIdShape`; `src/server/api/routers/message.ts` `getOne`'s input
  `z.string().regex(/^[0-9]+$/)`.
- **Class**: a message-number input contract that admits a value the column cannot hold, so the refusal comes from postgres and not from
  the contract.
- **Enumeration**: `git grep -n -E "\[0-9\]\+\\$/" d597734 -- src/server src/app` gives 2 hits: `messageIdShape` (used by upsert, recent
  data and delete) and `getOne`'s inline regex. Blind spot: id inputs with no digit regex at all are not matched. Those are
  `partialMessageShape.id` (`user.updatePreferences`'s draft) and `user.updatePreferences`'s `recentMessageIds` (CR-3).
- **Issue**:
  - Observed: postgres raises `value "99999999999999999999" is out of range for type bigint`, through `getUserRecentMessages` in the
    observation case of my run.
  - Read from code: the same text reaches the `where id =` of each procedure above. The attack's beyond-int8 form touched no row in any
    procedure (187/187). So this is error hygiene, not an ownership breach.
- **Disposition order**:
  - The contract does not bar the value; the remedy is the contract.
  - It is not exploitable: the caller's own request fails, and nothing else is touched.
- **Required Action**:
  - **Preferred (structural)**: `messageIdShape` bounds to int8. Use `/^[0-9]{1,19}$/` plus a refine that `BigInt(id) <=
    9223372036854775807n`, and use `messageIdShape` for `getOne`'s input too, so that one shape owns the number.
  - Each caller:
    - `getOne` becomes `BAD_REQUEST`, and is canonical;
    - `upsert`, `updateRecentMessageData` and `delete` become `BAD_REQUEST` instead of 500;
    - no site-issued number changes.
  - Falsity signature for the test: `9223372036854775808` rejects with code `BAD_REQUEST`, and `9223372036854775807` passes the shape.
  - Routed to steering: is it inside "cleans up oddly formatted message numbers" (the fixer's, in a later round) or a handoff? It does
    not hold the verdict.

CR-3 INFO Round 1

**[Pre-existing, out of scope]**: a non-int8 entry in a user's own `recentMessageIds` fails that user's hydrated session.
- **Location**: `src/server/api/routers/user.ts` `updatePreferences` input `recentMessageIds: z.array(z.string()).optional()` →
  `src/server/auth.ts` `hydratedAuthCallback` → `getUserRecentMessages`.
- **Class**: the same as CR-2, at a surface outside the change.
- **Enumeration**: the CR-2 command's blind-spot list. Here it is 1 site, read by `git grep -n "recentMessageIds" d597734 -- src`.
- **Evidence**: the observation case in `attack.pg.test.ts` ("a stored number beyond int8 … fails that user's hydrated session") passes
  at every SHA, so the session callback throws. It was present at `787bec5`; this change neither adds nor fixes it.
- It is self-only: a user can only write their own preferences. It is not an ownership breach.
- **Required Action**: none in this chain. Routed to steering for a handoff carrying CR-2's class at this site.

CR-4 INFO Round 1

**[Architecture record]**: the Problem Areas row "`upsertMessage` counts the owner's messages on every save" becomes false at release.
- **Location**: `architecture/system-architecture.md`, Problem Areas; `shared.ts` `upsertMessage` (count only on the insert path).
- **Enumeration**: 1 row (`grep -n "counts the owner's messages" architecture/system-architecture.md`).
- **Required Action**: the architect updates the row at release. Routed via steering. It is not an operator-visible signal.

CR-5 INFO Round 1

**[Question for the CR-1 test]**: a draft stored under a deleted number is not removed when the save lands at a new number.
- **Location**: `MessageProvider` `onSuccess`. `removeDraft(msg.id, …)` runs only when `msg.id === message?.id`, and
  `removeRouteZeroDraft` only when `!message?.id`. A save from N that returns M runs neither.
- Read from code, not run. It is newly reachable through the same path as CR-1.
- **Required Action**: none of its own. The CR-1 test states the intended outcome. If the outcome is "the N draft is dropped", that is a
  one-line production change and belongs to the fixer's round on steering's word.

**Checked and found sound** (no finding):
- `getOne` owner compare.
- The owned update's choice of owner term: a server message is keyed by the server row the caller is authorized for, a personal one by
  `fk_users_id`.
- The cap runs on every insert.
- No broadcast without a matched update.
- `deleteOwnedMessage` clears previews only when a row was removed.
- `getUserRecentMessages` takes `user.id`. The same callback already uses `user.id` as `userDbId` for `redis.fetchUserAccount`, so it is
  the `Users` row id that `fk_users_id` references.
- Comments: the convention check reports 0 FAIL and 0 CANDIDATE (`code-review/run-d597734/convention-check.txt`). The ID-token check
  SKIPs and is unchecked by the tool.
- Removing the dead `message && hashMessage(message);` is sound.
- `updated && message.id`: the second term is needed for type narrowing and is not redundant.

## Verdict

**Status**: REJECTED
**Rationale**:
- The ownership property holds at `d597734` under adversarial execution: 187/187, every in-scope defect red at base, and the
  check-bypassed mode green.
- One relied-upon client behaviour lacks an assertion (CR-1). By the severity floor, that blocks hand-off to QA. The remedy is one test
  case and adds no production code.

## Required Actions

1. CR-1: add the spec-form provider case and its negative control, and record both in the Test section. A test-only diff is confirmed
   as a sub-entry of this round, not a new round.
2. CR-2: the int8 bound, ruled in scope (rulings block 23:09Z). CR-5 is the fixer's choice, stated by the CR-1 test.

## Assumption Not Checked

This review assumes that the NextAuth session reaching `protectedProcedure` carries the caller's own Discord id in `session.user.id`
(set by `authCallback` / `hydratedAuthCallback` from `redis.fetchUserAccount(user.id)`), and does not test it: the attack injects the
session through `createCaller`.
- Falsity signature: one signed-in account's request resolves, in `getAccount`, to another account's `userId`, so `authorizeUser` and
  every owner term admit that account's rows.
- Owner: the `security` stage on this change (rulings block 20:30Z), and the post-deploy browser check on the two test accounts.
- That check exercises the path only once the website `master` release is serving: the owner's Vercel production deploy.

## Next Steps

- **Fixer** (`fixer-hooks-fix-personal-message-access`): CR-1, then hand back the new SHA. I confirm it as a sub-entry: I re-run the
  attack instrument at the new SHA and check the new case's control.
- **Steering** (`steering-roadmap-hooks`):
  - CR-2: in scope or a handoff.
  - CR-3: a handoff.
  - CR-4: architect at release.
  - CR-5: the outcome ruling, if wanted.
  - The Assumption Not Checked goes to `security` and the post-deploy browser check.
- **QA Phase 2** (107 production lines ≥ 20) follows an approval, not this verdict.
