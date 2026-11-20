---
ID: n/a
Origin: fix-personal-message-access
UUID: 1b613853
Reviewed-At: 983681ca6cd7cbacd0796ed093e094057ad7f9be — repos=website; Round 2 (delta 75f1543..983681c, security M-001); Round 1 closed at 75f1543 (sub-entries 1a–1c)
Status: In Review
Round: 2
Verdict: APPROVED
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
| 2026-11-19T23:16 | fixer (`ca0e7de`, website `12bcd75`) | Round 1 sub-entry 1a: fix confirmation | CR-1, CR-2 and CR-5 are fixed; their fixes are this round's findings, so this is a sub-entry and not a new round. Attack 187/187 at `12bcd75`. The id-bound probe found CR-6 LOW: `messageIdShape.safeParse` throws on non-digits, while the router refuses `BAD_REQUEST` before the resolver either way. APPROVED_WITH_COMMENTS; handed to QA Phase 2 (116 production lines). |
| 2026-11-19T23:23 | fixer (`100c406`, website `ed88e7c`) | Round 1 sub-entry 1b: CR-6 confirmation | CR-6 is fixed; its class is gone. Probe 24/24, attack 187/187 and the convention check report 0 FAIL at `ed88e7c`. APPROVED_WITH_COMMENTS stands at `ed88e7c`; delivered to steering for QA Phase 2. |
| 2026-11-19T23:50 | steering (QA `0ed724b`, website `75f1543`) | Round 1 sub-entry 1c: test-only delta | QA's QAF-1 cases: production is byte-identical to `ed88e7c`, and the tests conform. APPROVED_WITH_COMMENTS stands at `75f1543`. Capture paths are written in full (check-repo LINKS). |
| 2026-11-20T00:12 | fixer (`6bd294c`, website `983681c`; steering block 2026-11-20T00:04Z, `fce289f`) | Round 2: delta review of the M-001 fix | It opens a new round because the fix is outside Round 1's findings. The class has 7 members, and the only one returning a pre-check read is now fixed. My instrument, extended with a load-then-delete mode, is red at `75f1543` (1, the M-001 leak) and passes 192/192 at `983681c`. APPROVED. Reconcile note on Round 1's "getOne owner compare found sound". |

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
- **Calibration** (`verification/fix-personal-message-access/code-review/calibration/`):
  - `787bec5`: 187 cases, 52 failed. Every defect class in scope is red: `getOne` leak; save, recent-data and delete without a write
    owner term; browser-chosen number; the leading-zero preview prefix; the hydrated list.
  - `2e50cd9`: 4 failed, exactly the delete-past-the-check cases that the 22:59Z ruling brought into scope.
- **Result at `d597734`: 187 of 187 passed, vitest exit 0** (`verification/fix-personal-message-access/code-review/run-d597734/attack-d597734.{json,exit}`). No container was left
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
- Comments: the convention check reports 0 FAIL and 0 CANDIDATE (`verification/fix-personal-message-access/code-review/run-d597734/convention-check.txt`). The ID-token check
  SKIPs and is unchecked by the tool.
- Removing the dead `message && hashMessage(message);` is sound.
- `updated && message.id`: the second term is needed for type narrowing and is not redundant.

## Round 1, sub-entry 1a — fix confirmation at `12bcd75`

The scope is the fix diff `d597734..12bcd75`:
- `5d9678d`: the CR-1 tests, test only;
- `12bcd75`: CR-2, the int8 bound with `getOne` on `messageIdShape`; and CR-5, the draft under the held number dropped, per steering
  block 23:09Z (`e908744`).

Nothing is touched beyond the findings' scope, so no new round opens. The tree was read at `12bcd75` and re-verified at the end
(`git rev-parse chain/fix-personal-message-access`).

**CR-1: the class is gone.** `MessageProvider.save-new-number.test.tsx` mounts the real provider.
- "moves the editor to the new number…" asserts `replace('/message/m/<M>/edit')` once.
- "keeps the editor where it is…" asserts no `replace` for the held number.
- The CR-1 control was read from the fixer's own streams, not from the document. `negative-controls-12bcd75/…mutant-1.stdout` shows
  `editor-move-dropped` failing on `AssertionError: expected "vi.fn()" to be called 1 times, but got 0 times`. That is an assertion
  failure, not a timeout.
- Captured check: that test file, with the controls `editor-move-dropped` and `editor-move-inverted` in
  `negative-controls-round3.mutants.json`.

**CR-5: the class is gone.** The draft branch now keys on the number the editor holds (`removeDraft(message.id, …)`).
- The "drops the draft held under the old number…" case is killed by `old-number-draft-kept`:
  `AssertionError: expected [ '900000000000101' ] to not include '900000000000101'` (mutant-3).
- The old branches are unchanged for `msg.id === message.id` and for route 0.
- Captured check: the same file.

**CR-2: the class is gone at the router.** Sweep re-run at `12bcd75`:
- `git grep -n -E "\[0-9\]\+\\$/|\[0-9\]\{1,19\}" 12bcd75 -- src/server src/app ':!**/__tests__/**'` gives 1 hit, `messageIdShape`.
- `git grep -n "messageIdShape" 12bcd75 -- src ':!**/__tests__/**'` shows that `getOne`, `delete`, `recentMessageDataShape` and
  `optionalIdMessageShape` all use it. The inline `getOne` regex is gone.
- Blind spot: `git grep -n -E "id: z\.string\(\)"` gives 3 hits that are not message-number inputs of these procedures:
  - `emojiShape.id`;
  - `partialMessageShape.id` (`user.updatePreferences`'s draft, with CR-3's handoff);
  - `idMessageShape.id` (commented-out use only).

My probe (`verification/fix-personal-message-access/code-review/id-bound.probe.test.ts`, driven by `run-probe.sh`; captures in `verification/fix-personal-message-access/code-review/run-12bcd75/`) has literal expected
values, with int8 max at 2^63−1.
- `d597734`: 19 cases, 5 failed. Every beyond-int8 form was accepted. This is the positive control.
- `12bcd75`, at the shape: `9223372036854775807` and `…806` are accepted; every beyond-int8 form and every 20-character form is
  refused.
- `12bcd75`, through tRPC 11.10's real input middleware: 5 of 5 cases are refused `BAD_REQUEST` with the resolver never run. The
  inputs are `1e3`, `１`, `9.00000000000101e14`, `9223372036854775808` and `abc`.
- At the shape, `1e3` and `１` failed. That is CR-6.

Attack instrument at `12bcd75`: **187 of 187, vitest exit 0** (`verification/fix-personal-message-access/code-review/run-12bcd75/attack-12bcd75.{json,exit}`). No `fpma-cr`
container was left. Convention check `--since=787bec5`: 0 FAIL, 0 CANDIDATE (`verification/fix-personal-message-access/code-review/run-12bcd75/convention-check.txt`).

CR-6 LOW Round 1

**[Input validation]**: `messageIdShape.safeParse` throws on text its own regex refused.
- **Location**: `src/server/api/utils/shapes.ts` `messageIdShape`.
- **Class**: a zod refinement or transform that assumes an earlier non-fatal check passed. In zod 3.22, a failed `.regex` leaves the
  parse dirty and still runs `.refine`. So `BigInt(id)` throws `SyntaxError` out of `safeParse`, which is meant never to throw.
- **Enumeration**: `git grep -n -E "\.regex\([^)]*\)\s*$" 12bcd75 -- src ':!**/__tests__/**'`, followed by a `.refine`/`.transform`
  that parses: 1 site, `messageIdShape`.
  - The other `BigInt(` calls in `src/server` that could reach input were read by `git grep -n "BigInt(" 12bcd75 -- src/server`. None
    is behind a zod check.
  - Blind spot: a chain split across lines differently, or a refine that throws for a reason other than parsing.
- **Evidence**: the probe at `12bcd75`. `safeParse('1e3')` and `safeParse('１')` throw `SyntaxError: Cannot convert … to a BigInt`
  (`shapes.ts`, the refine).
- **Magnitude**: measured. Through the tRPC input middleware, the outcome is `BAD_REQUEST` with no query, the same code as a zod
  refusal. The decision a caller reads does not change; only the error's `cause` differs (a `SyntaxError`, not a `ZodError`).
  `messageIdShape` has no caller outside tRPC inputs (the sweep above).
- **Required Action**:
  - **Preferred (structural)**: order the shape so that the parse runs only on text the regex accepted. In zod 3, `transform` does not
    run on a dirty parse. So use `z.string().regex(/^[0-9]{1,19}$/).transform((id) => BigInt(id)).refine((n) => n <=
    MAX_MESSAGE_ID).transform(String)`, or guard inside the refine with the same regex.
  - Falsity signature: `messageIdShape.safeParse('1e3')` returns `{ success: false }` and does not throw.
  - **Routing**: this changes no decision (the probe above), so under "Rounds stop" it does not hold the tree. It is at the scope's own
    site, so it goes to steering: either the fixer folds it in before QA starts (it is one shape), or a handoff carries it.

**Disposition of Round 1's findings:**

| ID | Disposition | Captured check |
|---|---|---|
| CR-1 | Fixed: the class is gone | `MessageProvider.save-new-number.test.tsx`; controls `editor-move-dropped`, `editor-move-inverted` |
| CR-2 | Fixed at the router: the class is gone | `message.personal-ownership.test.ts` "the message number each procedure takes"; `verification/fix-personal-message-access/code-review/id-bound.probe.test.ts` |
| CR-3 | Routed: handoff written by steering (block 23:09Z) | no test |
| CR-4 | Routed: handoff, owned by the architect, at release (block 23:09Z) | no test |
| CR-5 | Fixed: the fixer chose to drop the draft | `MessageProvider.save-new-number.test.tsx`; control `old-number-draft-kept` |
| CR-6 | Fixed at sub-entry 1b (`ed88e7c`): the class is gone | `shapes.message-id.test.ts`; `verification/fix-personal-message-access/code-review/id-bound.probe.test.ts` |

**Verdict (sub-entry 1a): APPROVED_WITH_COMMENTS at `12bcd75`.** The ownership property holds under adversarial execution, and every
round-1 finding that held the tree is fixed with a control seen failing.

## Round 1, sub-entry 1b — CR-6 confirmation at `ed88e7c`

The scope is the fix diff `12bcd75..ed88e7c`:
- `16bf24d`: `messageIdShape` reordered to `regex` → `transform(BigInt)` → `refine(<= MAX)` → `transform(String)`, plus the new
  `__tests__/shapes.message-id.test.ts`;
- `ed88e7c`: test only.

Steering ruled CR-6 in at block 23:17Z (`44d13e7`). The tree was read at `ed88e7c` and re-verified at the end.

**CR-6: the class is gone.**
- Sweep re-run: `git grep -n -E "\.regex\([^)]*\)\s*$" ed88e7c -- src ':!**/__tests__/**'` gives 1 hit, `messageIdShape`. Its parse is
  now a `transform`, which zod 3 does not run on a dirty parse.
- My probe (`verification/fix-personal-message-access/code-review/run-ed88e7c/probe-ed88e7c.json`): **24 of 24** pass. At `12bcd75` the same probe failed 2, on `1e3` and `１`.
  - `safeParse` no longer throws on any refused form.
  - int8 max is accepted and every beyond-int8 form is refused.
  - Through tRPC's input middleware, all five forms are refused `BAD_REQUEST` with no resolver run.
- The fixer's red at `12bcd75` fails 3 of 13 with `SyntaxError: Cannot convert … to a BigInt`, and its five controls are KILLED (record
  `100c406`, Test "Round 4").
- Captured check: `src/server/api/utils/__tests__/shapes.message-id.test.ts`, and `verification/fix-personal-message-access/code-review/id-bound.probe.test.ts`.

**Also checked:**
- Test placement and name: `shapes.message-id` passes the positive form, with no ID token.
- Attack instrument: **187 of 187, exit 0** (`verification/fix-personal-message-access/code-review/run-ed88e7c/attack-ed88e7c.{json,exit}`). No `fpma-cr` container was left.
- Convention check `--since=787bec5`: 0 FAIL, 0 CANDIDATE (`verification/fix-personal-message-access/code-review/run-ed88e7c/convention-check.txt`).

**Verdict (sub-entry 1b): APPROVED_WITH_COMMENTS at `ed88e7c`.** No finding is open. The comments are the routed CR-3 and CR-4 handoffs
and the Assumption Not Checked.

## Round 1, sub-entry 1c — test-only delta at `75f1543`

The scope is `ed88e7c..75f1543`: QA's commit, which closes QAF-1 (`qa/fix-personal-message-access-qa.md`, record `0ed724b`). It adds 34
lines to `message.personal-ownership.test.ts` and nothing else (`git diff --numstat`).

- **Production identity:** `git diff --quiet ed88e7c 75f1543 -- src ':!**/__tests__/**'` exits 0. Every verdict quantity above (the
  attack, the probe, the controls) therefore carries to `75f1543` unchanged, and was not re-run.
- **Tests, reviewed beside the code they cover:** the four new cases are another signed-in user naming the owner's personal number to
  `upsert` (personal and server path), `updateRecentMessageData` and `delete`.
  - Each case asserts the `NOT_FOUND` refusal, and also that no `Messages` write, no Pusher channel and no S3 input occurred. The
    expected values are literals or empty lists.
  - That matches the router at `75f1543`. On the personal path, `authorizeUser` refuses a row whose `fk_users_id` differs. On the server
    path, `authorizeGuildUser`'s `getOldMessages` refuses a row whose server differs, here a personal row.
  - Titles carry no ID token, and the file is unchanged in name and place.
- **Convention check** `--since=787bec5`: 0 FAIL, 0 CANDIDATE
  (`verification/fix-personal-message-access/code-review/run-75f1543/convention-check.txt`).
- **Record fix:** check-repo's one LINKS failure was a short capture path of mine on this document (sub-entry 1b). Every capture path
  here is now written from the record root.

**Verdict (sub-entry 1c): APPROVED_WITH_COMMENTS at `75f1543`.**

## Round 2 — delta review at `983681c` (security M-001)

**Why a new round:** the fix closes the security stage's M-001 (`security/fix-personal-message-access-security-audit.md`, record
`99f7a3d`), not a finding of mine. It is outside Round 1's findings' scope, so the delta `75f1543..983681c` is reviewed as a first review.
The tree was read at `983681c` and re-verified at the end.

**Criteria, recorded before the diff:** the property (block 20:30Z), at S2: no non-owner receives a personal message, including when the
owner deletes it between `getOne`'s load and its ownership check.

**Change** (`routers/message.ts`, +7/−1): `getOne`'s personal branch reads `oldMessageCount` from `authorizeUser`. When it is 0, it throws
`NOT_FOUND` ("This message does not exist.", the same text as `delete`'s). `authorizeUser` is unchanged.

**Class and sweep.**
- **Class:** a procedure that returns a value read before an ownership check which passes on an empty row set.
- **Enumeration:** `git grep -n -E "authorizeUser\(|authorizeGuildUser\(|authorizeAction\(" 983681c -- src ':!**/__tests__/**'` gives 7
  call sites (the definition and the `authorizeAction` body excluded).
- **Disposition of each:**
  - `getOne` personal: fixed by this delta.
  - `getOne` server (no ids): membership only. Server messages are outside the personal property (S1b, a handoff).
  - `upsert` server and personal: an empty set means a create of the caller's own row, and the write is owner-scoped. Returns the
    read-back of that write.
  - `updateRecentMessageData` server and personal: returns nothing, and the write carries the owner.
  - `delete` via `authorizeAction`: the write carries the owner, and previews are cleared only for a removed row.
  - `user.ts` `get` and `updatePreferences`: no ids.
- Blind spot: an ownership check written inline, without these helpers. It is not swept by this predicate. QA and security read the
  procedures whole.
- **Why not change `authorizeUser` itself:** making it refuse an empty set would make `upsert`'s unknown-number create fail. That
  changes the round-1 design (hazard 2). Fixing the one caller that returns a pre-check read is the narrower remedy, and it is sound.

**Execution (my instrument, not the fixer's or security's).** `attack.pg.test.ts` gains a race stand-in mode: the `authorizeUser` hook
deletes A's row after the procedure's load and before the real check. It covers `getOne`, `upsert`, `updateRecentMessageData` and
`delete`, plus an owner control.
- `75f1543`: **192 cases, 1 failed**. "getOne: user B receives none of A's message" fails: M-001 is reproduced on real postgres.
- `983681c`: **192 of 192, exit 0** (`verification/fix-personal-message-access/code-review/run-983681c/attack-983681c.json`; the red
  capture is `verification/fix-personal-message-access/code-review/run-75f1543/attack-75f1543.json`).
- No `fpma-cr` container was left.

**Tests:**
- The suite case "refuses another signed-in user when the message is deleted between its load and the ownership check" uses
  `world.goneAtCheck`, which empties the check's row set: the race's effect at the check.
- It asserts `NOT_FOUND` and no secret in the outcome. The expected values are literals.
- The fixer's red at `75f1543` (1 failed) and its 2 controls are KILLED (record `6bd294c`).
- Name and titles carry no ID token.
- Convention check `--since=787bec5`: 0 FAIL, 0 CANDIDATE
  (`verification/fix-personal-message-access/code-review/run-983681c/convention-check.txt`).

**Findings:** none.

**Reconcile note** (2026-11-20T00:12, on Round 1's "Checked and found sound" list, item "`getOne` owner compare").
- **What it said:** the compare was sound.
- **Why that was defensible when written:** with the router check in force, my attack held for every id form. The race-bypass mode
  deliberately excluded `getOne`, because I treated a read with no write as having no check-then-act gap. That matched the fixer's
  hazard-6 framing, which I accepted unexecuted.
- **What was wrong:** a read that returns its pre-check value is check-then-act. Security executed the leak (300 of 300), and my
  instrument reproduces it at `75f1543`.
- **Class swept** over that list (every "found sound" item):
  - the owned update's owner term, the cap, the broadcast guard and `deleteOwnedMessage`'s preview guard: each executed in the
    check-bypassed mode at `d597734` or later;
  - `getUserRecentMessages`'s `user.id`: read, then executed on the real session path by security;
  - `getOne`: the only wrong item, now executed (above).
- **The missed instrument shape:** a race stand-in on reads. My attack instrument now carries it for all four procedures.

**Verdict (Round 2): APPROVED at `983681c`.**

## Verdict

**Status**: APPROVED at `983681c` (Round 2). Before that: APPROVED_WITH_COMMENTS at `75f1543` (sub-entry 1c; production identical to `ed88e7c`, sub-entry 1b). It was APPROVED_WITH_COMMENTS at `12bcd75` (1a) and REJECTED at `d597734`.
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

- **At Round 2:** delivered to steering at `983681c`. Next, QA re-verification, then the security re-review (RC-1).

- **At sub-entry 1c:** delivered to steering at `75f1543`.

- **At sub-entry 1b:** delivered to steering, which spawns QA Phase 2 at `ed88e7c` (block 23:17Z). CR-6 is closed.

- **At sub-entry 1a:**
  - Handed to QA Phase 2 (`qa-hooks-fix-personal-message-access`) at `12bcd75`, for 116 production lines.
  - CR-6 goes to steering: fold it in before QA, or a handoff.
  - The Assumption Not Checked is unchanged, and owned by security and the post-deploy browser check.
- **At Round 1 (superseded by 1a):**

- **Fixer** (`fixer-hooks-fix-personal-message-access`): CR-1, then hand back the new SHA. I confirm it as a sub-entry: I re-run the
  attack instrument at the new SHA and check the new case's control.
- **Steering** (`steering-roadmap-hooks`):
  - CR-2: in scope or a handoff.
  - CR-3: a handoff.
  - CR-4: architect at release.
  - CR-5: the outcome ruling, if wanted.
  - The Assumption Not Checked goes to `security` and the post-deploy browser check.
- **QA Phase 2** (107 production lines ≥ 20) follows an approval, not this verdict.
