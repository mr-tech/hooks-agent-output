---
ID: n/a
Origin: fix-personal-message-access
UUID: 1b613853
Status: Active
Status-Detail: "Fix committed on website chain/fix-personal-message-access at d597734 (round 2, amended scope of rulings block 22:59Z); code review owed, then QA Phase 2 (107 production lines added), then security, then devops for website master on the owner's word."
Handoff-At: d597734859bb58e184cd7f218708382e46aa1589 — repos=website; round 1 2e50cd9
Origin-Chain: none
---

# Fix — a signed-in user reads, saves and lists only the personal messages they own

## Scope statement

The owner's selection, recorded in `steering/fix-personal-message-access-rulings.md`, block "2026-11-19T22:35Z — scope: fix all three,
with query hardening (his selection)". Route: fixer, under the scoping determination in block "2026-11-19T20:30Z — scoping
determination". The bounded scope statement, quoted:

> "In scope: S2 with S18, S6b, S11, an owner term in the S6a and S7 write queries, and a canonical id at the S7, S8 and S9 inputs. All of
> it is in website alone. Out: S5, S16 and S17 (no record; X-21 carries S17). S14, S15 and S1b get one handoff each."

The property, in his words (block 20:30Z): a signed-in user can get, change or delete only the personal messages (no guild) they own. A
message number sent by the browser never lets a user read, create, claim, overwrite or delete a row that is not theirs.

**Amended at 22:59Z** (rulings block "2026-11-19T22:59Z — fixer handoff at 2e50cd9; two members ruled in (this thread's error); code
reviewer spawned", record `2af7391`). Steering found its statement had narrowed his chosen option's words ("puts the owner check inside
the save/update/delete queries"; "cleans up oddly formatted message numbers"). Two members are added:
- an owner term in the delete query of S8 (`message.delete`), as well as in S6a and S7;
- a canonical id at the `message.upsert` input (S6a/S6b, `optionalIdMessageShape.id`), as well as at S7, S8 and S9.

Out, each to a handoff steering writes: the hydrated recent list returning server-message rows, and `getOne`'s absent-number error. The
production residue read is held by steering to the release seam.

The S-numbers are the sweep's (`verification/access-defects/scoping/sweep.md`, website `787bec5`). The three handoffs for S14, S15 and
S1b are steering's under that block. This document writes none of them.

## Entry Conditions

| Condition | State | Evidence |
|---|---|---|
| Scoping determination | Present | Rulings file block "2026-11-19T20:30Z — scoping determination", named in `steering/fix-personal-message-access-brief-fixer.md` and its common part; read whole at session start |
| Bounded scope statement | Present | Rulings block "2026-11-19T22:35Z", quoted above |
| Fix branch | `chain/fix-personal-message-access` at `787bec5`, checked out by steering | `git -C website branch --show-current` printed `chain/fix-personal-message-access`; `rev-parse HEAD` printed `787bec5627702d2881b826e596ec2b8f8853c4fa`; status showed only the untracked `.playwright-mcp/`, which is not this chain's and was left alone |
| Record on the mechanism | Read | `architecture/system-architecture.md` lines 195 and 198 ("Persisting writers share a criterion, not a path"; "`upsertMessage` counts the owner's messages on every save"); `architecture/website.md` W-2 line 46. The sweep's step 4 table, `verification/access-defects/scoping/refutation.md`, `security/closed/017-preview-image-generator-security-audit.md:121-129` as cited by the sweep. No `research/` entry states the access rule (sweep step 4, "Not in the record by these predicates") |

## Diagnosis

Each cause was read on the code path at `787bec5`. Each one was then shown by the red run (Test) through the real router, and a second
time against a real postgres:16 (Test, "Real-database run").

| Surface | Cause | Instrument and output |
|---|---|---|
| S2 `message.getOne` (and S18) | `routers/message.ts:58` calls `authorizeUser(session.user.id)` with no message id, so `utils/user.ts:13` skips the owner compare. The row loaded at `:54` is returned to any signed-in user. | Red run: "refuses another signed-in user…" got `{ value: {…} }`. Real database at `787bec5`: B's `message.getOne(A's row)` returned A's message. |
| S6b `message.upsert` with an unused number | `shared.ts:255` `if (message.id) values.id = message.id;` inserts at the browser's number. `authorizeUser` passes on an empty row set (`user.ts:27`). The cap is skipped whenever an id is sent (`shared.ts:243`). The insert's `on conflict (id) do update` (`shared.ts:215-222`) later lets an id-less save overwrite a row planted at a future sequence number. | Red run: the insert carried `900000000000500`; the cap case resolved. Real database: the row at the planted number was A's, B's id-less save wrote B's name onto it, and A's 1000-row account created a 1001st. |
| S6a, S7 writes | The owner check (`authorizeUser` / `authorizeGuildUser`) is one query; the write (`buildUpsertMessageQuery`, `updateRecentMessageData`) is another, with no owner term. | Red run: no owner value bound in either write. Real database: `upsertMessage` and `updateRecentMessageData` called past the router's check (the race's effect) changed A's row for B. |
| S11 hydrated session | `getUserRecentMessages` (`shared.ts:108-122`) selects by id only; `auth.ts:139` passes the ids stored in the user's own preferences, unchecked. | Red run: the foreign row was listed. Real database: B's hydrated list held A's row. |
| S7, S8, S9 id text | `recentMessageDataShape.id` and `delete`'s `id` are `z.string()`. Postgres compares the bigint, so `00<id>` reaches the row. But `deleteMessagePreviewImages(id)` builds the prefix `previews/00<id>/` from the raw text and leaves the owner's previews behind. | Red run: `00…` reached every query. Real database: the row was deleted, and the S3 list prefix carried the zeros. |

**Every consumer of the canonicalised id** (the fix changes how the id resolves at S7 and S8):
- `delete`: the guild lookup select, `authorizeAction` → `authorizeUser` / `authorizeGuildUser`'s `getOldMessages` (both `in` lists), the
  delete statement, and `deleteMessagePreviewImages` → `previewPrefix`.
- `updateRecentMessageData`: `getMessage`, `authorizeUser` / `authorizeGuildUser`, and the update.

- `upsert` (round 2): the router's pre-check (`authorizeUser` / `authorizeGuildUser`'s `in` lists), `buildUpdateOwnedMessageQuery`'s
  `where id`, and the Pusher channel `genMessageChannelKey(message.id)`. Before round 2, a `0<id>` save updated the right row but
  broadcast on `message-update-0<id>`.

All of them now receive the canonical digits. Each guard that compared the raw text now compares the canonical text, and none is left on
the raw text. `delete` and `updateRecentMessageData` do not return the id. `upsert` returns the database's id, which the client compares
with the number it holds (`MessageProvider`, `msg.id === message?.id`). The client holds a database-issued number, so the two agree.

**Hazards from the common part, re-derived:**
1. *Guild rows share the write path.* The save's owner term is `fk_guilds_id = <that server's row>` for a server message and
   `fk_users_id = <caller>` for a personal one (`buildUpdateOwnedMessageQuery`). The recent-data write uses `fk_guilds_id in (select id from
   Guilds where guildId = <the message's server>)`. Any admin who passes `authorizeGuildUser` still saves a server message another admin
   created; the real-database run shows this at both SHAs. S1b's membership rule is unchanged.
2. *The cap.* An unknown number now becomes a fresh row at a server-assigned number, and that path always runs the cap. The cap is skipped
   only when the owned update matched a row, which adds no row. **Base compared with fix:** at base, an unknown number was created at that
   number. The only client that sends a number is `MessageProvider`'s save (`providers/MessageProvider/index.tsx:251`), and it holds a number
   only from a `getOne` load. So the case is a message deleted in another tab and then saved here. At the fix that save creates a new row,
   and the provider's `onSuccess` already routes `msg.id !== message.id` to `router.replace('/message/m/<new id>/edit')`. The other four
   `upsert` callers (`NewMessageModal`, `SaveAsMenu`, `m/new`, `f/[id]`) send no id and are unchanged. I chose create over refuse for that
   reason: the user keeps their work. It is in scope by the property ("never lets a user … create … a row that is not theirs"), since the new
   row is the caller's own.
3. *Stored foreign ids.* The filter is at the read (`getUserRecentMessages(ids, user.id)`), so ids already stored in production preferences
   are covered. `updatePreferences` still stores whatever numbers it is sent, and they are now filtered when read.
4. *`/message/f/[id]` copy.* `getOne`'s callers are `MessageProvider` (`/message/m/[id]`, line 211) and `f/[id]/page.tsx:181` (copy). For
   another user's personal message both now get `NOT_FOUND`: the editor shows its load error, and the copy shows "Failed to copy message."
   The owner's own copy and guild messages are unchanged (guild branch untouched). The share code (S5, `getFromCode`) does not use `getOne`.
5. *Canonical ids.* `messageIdShape` (`/^[0-9]+$/`, then `BigInt(id).toString()`) is applied once at the S7 and S8 inputs, and from
   round 2 at `upsert`'s optional `id`. Text that is not digits (`' 900…'`, `'+900…'`) is refused with `BAD_REQUEST` before any query.
   `optionalIdMessageShape` has no caller besides `message.upsert` (`git grep` over `src`: only `routers/message.ts`). Its other sibling,
   `idMessageShape`, is used only in commented-out code.
6. *Check-then-write.* S6a, S7 and, from round 2, S8 carry the owner term inside the write. `deleteOwnedMessage` deletes `where id = …
   and` the same owner term as the recent-data write, and `returning id`. The preview images are cleared only when it removed a row, so a
   delete that matched nothing leaves the owner's previews in place. No path now checks in one query and writes in another without the
   owner term in the write. `getOne` checks then returns, which is a read with no write.
7. *Production on push.* This is noted for devops and steering. The fix is on the chain branch only, with no upstream and no push.

**Residue already in production** (read from the code path; S2 and S6b escaped):
- *Rows planted at a browser-sent number (S6b).* They stay in the table. A planted row whose number the sequence has not reached yet
  will, at the fix, make the id-less save that draws that number fail with a unique violation (the user sees "Failed to save message"; the
  retry draws the next number). Before the fix it overwrote the planted row. A planted row the sequence has already passed may already hold
  another user's name and data, written onto it by a collision. That cannot be told apart from the code.
- *Foreign ids in `Users.preferences.recentMessageIds` (S11).* These are covered at the read by the fix.
- *Data already read through S2 or S11.* No release can recall it.
- *Release form.* A Vercel deploy of `master` serves every request from the new build at once. No migration is involved, and every write
  path above goes through the fixed code.
- *Who checks the live state:* the owner, since this is production data. For example, rows at or above the sequence's next number are
  planted: `select id, fk_users_id, "createdAt" from "Messages" where id >= (select last_value from "Messages_id_seq")`. This is an owner
  step. I have not run it, and nothing here reads production.

**Origin-Chain: none.** `git blame` at `787bec5` dates every faulty line to before the pipeline:
- `message.ts:58` and `shared.ts:118`: `4fe53b6` (2023-08-22).
- `delete`'s `z.string()`: `fc74fba` (2023-04-01).
- `recentMessageDataShape.id`: `42a404b` (2023-09-02).
- `values.id = message.id`: first added at `98ecb0b`. `72a1755` (chain 017) touched that line but did not introduce it.
- The cap's `!message.id &&`: present since `c0b59c3` / `4fe53b6`. `fadee3e` (chain 015) changed only the operator.

**Observed outside the scope, not absorbed** (reported to steering at round 1; none is an ownership breach of a personal message). At
22:59Z steering ruled the upsert canonical id and the delete owner term in scope, and they are fixed in round 2. The two items below
stay out of scope, and steering writes a handoff for each:
- The hydrated recent list still returns server-message rows for any server whose message number is stored (the `fk_guilds_id is not
  null` arm keeps the guild behaviour unchanged). This is guild-message metadata, in S1b's family.
- `getOne` on a number no row holds still fails with `executeTakeFirstOrThrow`'s error, not `NOT_FOUND`, so "absent" and "not yours" can
  be told apart. Numbers are sequential, so this reveals little.

## Change

Production files. Round 1 is `git diff --numstat 787bec5 2e50cd9`, added/removed, with 83 production lines added. Round 2 and the
totals follow in this list:
- `src/server/api/routers/message.ts` (8/6): `getOne` passes the message id to `authorizeUser`; `updateRecentMessageData` passes the owner
  (`{ dbUserId }` or `{ guildId }`) into the write; `delete` and the recent-data input take `messageIdShape`.
- `src/server/api/utils/shapes.ts` (3/1): `messageIdShape`; `recentMessageDataShape.id` uses it.
- `src/server/api/utils/shared.ts` (71/37):
  - `buildUpdateOwnedMessageQuery`: update of name/data/valid/updatedAt `where id = … and` the owner term.
  - `buildInsertMessageQuery`: renamed from `buildUpsertMessageQuery`, with its `on conflict` clause removed.
  - `upsertMessage`: an owned update when a number is sent; otherwise, or when the update matched nothing, a fresh insert under the cap.
    It broadcasts only when the update matched. `upsertGuild` now runs once rather than twice, and the no-op `message && hashMessage(message);`
    line is gone.
  - `updateRecentMessageData`: carries the owner term.
  - `getUserRecentMessages`: takes the caller's id; `fk_users_id = caller or fk_guilds_id is not null`.
- Round 2 (`git diff --numstat 2e50cd9 d597734`):
  - `routers/message.ts` (6/4): `delete` calls `deleteOwnedMessage` with `{ guildId }` or `{ dbUserId }`, and clears previews only when
    it removed a row.
  - `shapes.ts` (1/1): `optionalIdMessageShape.id` is `messageIdShape.optional()`.
  - `shared.ts` (18/1): the `MessageOwner` type; `deleteOwnedMessage(id, owner)` with the owner term, `returning id`.
- **Totals over `787bec5..d597734`: 107 production lines added** (message.ts 14, shapes.ts 4, shared.ts 88, auth.ts 1).
- `src/server/auth.ts` (1/1): the hydrated callback passes `user.id` (the `Users` row id, from the adapter's `getSessionAndUser`,
  `kysely-adapter/index.ts:329-354`).

Test files:
- `routers/__tests__/message.personal-ownership.test.ts` and `src/server/__tests__/auth.hydrated-recent-messages.test.ts`: new.
- `shared.upsert-valid`, `previewImage.commit-statement`, `shared.message-cap`, `shared.upsert-broadcast`,
  `shared.upsert-preview-continuation` and `shared.in-predicates`: each fake database now answers the `update` statement. The `valid` and
  nonce assertions on the old conflict branch now apply to the update statement. The existing-message cap case now expects an update and
  no insert. The in-predicate case binds the owner. `shared.upsert-valid.test.ts` also took eslint's autofix for its 12 pre-existing errors
  (import order, brace newlines), because the convention check FAILs a touched file on them.

## Test

**Spec-form.** S2 escaped (`verification/access-defects/browser-check/README.md`), so a bug-form test would be allowed under axiom (B).
I wrote the tests in spec form instead, because they state the behaviour.

**Red run** (the committed test files at `2e50cd9`, copied into a `git archive 787bec5` export, with `node_modules` linked):
`npx vitest run --reporter=json src/server/api/routers/__tests__/message.personal-ownership.test.ts
src/server/__tests__/auth.hydrated-recent-messages.test.ts`. Result: **14 cases, 12 failed, 2 passed, exit 1**. Captures:
`verification/fix-personal-message-access/red-787bec5.{json,log}`. Each failure carries the defect's signature (Diagnosis column 3). The
two that pass at red are the owner-positive cases ("returns the message to the user who owns it"; "lists a recent personal message the
signed-in user owns"). Both are killed by the negative controls below.

*Disclosure, an instrument defect of mine.* The first red run (`red-787bec5-harness-defect.{json,log}`) failed three cases on "no result"
from the fake database, not on the defect. The fake compared ids as text, not as bigints, and had no insert-returning row. I fixed the fake
and re-ran. The S11 file also failed to load once (`getPostgres` was undefined at import), and I fixed that too. The run above is the
corrected one.

**Green run** (whole suite at `2e50cd9`): `npx vitest run --reporter=json`. **1873 cases, 1873 passed, exit 0, 146 files**. The base was
1857 cases, 144 files, exit 0, by the same command (`suite-base-787bec5.json`). By path membership, the file lists differ only by the two new
files. The +16 cases are the 14 new ones plus 2 from `previewImage.commit-statement`'s `describe.each` over the insert and update
statements. Capture: `suite-2e50cd9.{json,log}`.

**Negative controls** (`python3 ~/.claude/tools/mutation-run.py --sha 2e50cd9 --dep node_modules -- npx vitest run`, with the mutants in
`negative-controls.mutants.json`). **20 of 20 KILLED**, every control passed, count `checked`. Table and streams:
`negative-controls-2e50cd9/`. Each guard and each chosen value the diff adds, with the case that went red:

| Control | Killed by |
|---|---|
| `getOne-caller-identity` (owner-positive control) | returns the message to the user who owns it |
| `getOne-message-id-dropped` | refuses another signed-in user… |
| `create-cap-boundary` (`>=` → `>`) | refuses at the per-user cap, and creates no row |
| `create-at-client-id` | never writes a row at the number the browser sent |
| `broadcast-guard-updated` | announces no update on the number the browser sent |
| `update-skipped` | writes a personal / server message only where… (both) |
| `save-owner-term-user`, `-guild`, `-choice` | the upsert owner-term cases |
| `recent-data-owner-term-user`, `-guild` | the recent-data owner-term cases |
| `recent-data-call-site-user` (Discord id for db id), `-guild` | the recent-data owner-term cases |
| `recent-list-owner-term` | leaves out another user's personal message…; the in-predicate case |
| `recent-list-server-rows` (`is not` → `is`) | the in-predicate case |
| `recent-list-call-site-user` (owner-positive control) | lists a recent personal message the signed-in user owns |
| `id-shape-digits-only` | refuses a number that is not digits before any query |
| `id-shape-canonical`, `delete-input-shape`, `recent-data-input-shape` | the leading-zero cases |

`recent-list-server-rows` is caught only by an SQL-text assertion (`shared.in-predicates`). The behavioural check that server rows stay
listed is the real-database run's hydrated case.

**Invented boundary values** (testing-patterns, Iron Law 5). The standing-suite tests use the existing `capturingDatabase` fake. Its rows
(`fk_users_id`, `guildId`, `savedAtMicros`, the account lookup) are invented. Its update responder matches a row only when the bound owner
equals the row's owner, which stands in for Postgres's `where`. *If that is false*, a real update would match where the fake does not (or
the reverse), so a case would pass while a real row is written. That is exactly the signature the real-database run below would show, and
does not.

**Real-database run** (the real reader). The instrument is `verification/fix-personal-message-access/pg/ownership.pg.test.ts`, driven by
`pg/run-pg.sh <sha> <port> <work> <out>`:
- an export of the SHA, with the test copied in;
- a throwaway `postgres:16`, with the schema from project-utils `749606d` `prisma/schema.prisma` via `prisma migrate diff`
  (`pg/schema-749606d.sql`, 9 tables);
- message ids moved to ≥ 900000000000001 before any write;
- vitest under `timeout -k 10 240 setsid`;
- the container removed on every exit.

The routers, `authorizeUser`, `authorizeGuildUser`, the shared queries, kysely and pg are real. Stubbed: env, Pusher, `waitUntil`, preview
generation, the S3 client, redis and `authorizeGuildAdmin`. Results:
- **`787bec5`: 14 cases, 6 passed, 8 failed, exit 1.** The failures are refusal of another user's `getOne`, the hydrated list, the unused
  number, the cap, the planted-row collision, the save write past the check, the recent-data write past the check, and the leading-zero
  preview prefix.
- **`2e50cd9`: 14 of 14 passed, exit 0.** The six that pass at both SHAs are the behaviours kept: the owner reads, saves and records; a
  server admin saves and records a message another admin created; another user's delete is refused.

Captures: `pg/out/`. `docker ps -a` showed no `fpma-pg` container afterwards.

*Disclosure, an instrument defect of mine.* The first pair of runs (`pg/out-defective-caller-path/`) called `appRouter.createCaller(…).getOne`
instead of `….message.getOne`. Every router case threw "No procedure found", so three refusal cases passed vacuously at both SHAs. I fixed
the path, tightened those three to assert the specific refusal code or message, and re-ran both SHAs. The results above are from that
re-run.

**Round 2** (amended scope, block 22:59Z). Six cases were added to `message.personal-ownership.test.ts`:
- upsert: the leading-zero number is checked, written and broadcast canonically;
- upsert: a number that is not digits is refused before any query;
- delete: a personal message is deleted only where the caller owns it;
- delete: a server message is deleted only where it belongs to that server;
- delete: previews are left alone when the delete removed no row;
- delete: the previews of the removed row are cleared.

The fake database's delete responder matches like its update responder. `world.deleteMisses` invents a delete that matches nothing,
which stands in for a row lost to the race. *If that is false*, the guard would never be exercised in production, and the case would
still pass.

- **Red run at `2e50cd9`** (the tree, with the new test file before the source change): `npx vitest run --reporter=json
  src/server/api/routers/__tests__/message.personal-ownership.test.ts`. **18 cases, 5 failed, 13 passed, exit 1.** The 5 are the new
  cases bar the "clears the previews" one. Captures: `red-2e50cd9.{json,log}`.
- **Green, whole suite at `d597734`:** **1879 cases, 1879 passed, exit 0, 146 files.** Path membership against base: +2 files (the two
  new ones), −0. Capture: `suite-d597734.{json,log}`.
- **Negative controls** (`negative-controls-round2.mutants.json`, on `d597734`): **8 of 8 KILLED**, count `checked`
  (`negative-controls-d597734/`). Each control and the case that went red:
  - `delete-owner-term-user` and `-guild`: the two owner-term cases.
  - `delete-call-site-user` (Discord id for db id) and `-guild`: the same two cases.
  - `delete-previews-guard-dropped` and `delete-result-count` (`> 0` → `>= 0`): "leaves the previews alone…".
  - `delete-previews-guard-inverted`: "clears the previews of the row it removed". This is the control for the case that passed at red.
  - `upsert-input-shape`: both upsert number cases.
- **Real-database run, round 2** (three cases added: the leading-zero save, the delete write past the router's check, and a server admin
  deleting another admin's server message). Captures: `pg/out-round2/`; no container was left.
  - `787bec5`: 17 cases, 10 failed, exit 1.
  - `2e50cd9`: 17 cases, 2 failed (the leading-zero save broadcast on `message-update-00…`; the delete-write case), exit 1.
  - `d597734`: 17 of 17 passed, exit 0.
  - *Limit, disclosed:* at both earlier SHAs the delete-write case fails structurally, because `deleteOwnedMessage` does not exist there
    ("expected 'undefined' to be 'function'"). Its behavioural red is the router test's owner-term case at `2e50cd9`, together with the
    `delete-owner-term-*` controls. The real database shows the write refusing only at `d597734`.

No time-based test enters the suite. The real-database driver's readiness loop is in the instrument, not the suite.

## Verification

- **Existing tests:** step 2's command `npx vitest run --reporter=json --outputFile=…`. Base `787bec5`: 1857 cases, 144 files, exit 0.
  Fix `2e50cd9`: 1873 cases, 146 files, exit 0.
- **Build:** `pnpm run typecheck` (both tsc programs), exit 0. Capture: `typecheck-2e50cd9.txt`. No package-manager operation ran, and the
  lockfile is unchanged.
- **Lint:** `npx eslint --max-warnings=0` over every file changed `787bec5..2e50cd9`, exit 0 (`eslint-changed-files-2e50cd9.txt`). I did
  not use the repo's `lint` script, because it runs `--fix` over the whole tree.
- **Conventions:** `node ~/.claude/tools/convention-check.js website --since=787bec5`: **0 FAIL, 0 CANDIDATE**
  (`convention-check-2e50cd9.txt`).
  - The `.playwright-mcp/*.png` SKIPs are untracked screenshots, not this chain's.
  - The ID-token SKIP is unchecked: the checker says it does not implement the CLAUDE.md class verbatim. By hand: the new basenames
    (`message.personal-ownership`, `auth.hydrated-recent-messages`) and every new title name the surface and the behaviour, with no chain,
    round, ticket or date token.
  - The first pass FAILed 12 times on `shared.upsert-valid.test.ts`'s pre-existing lint (26 errors at base on that file; 12 left after my
    edit). I fixed them with eslint's autofix on that one file. This is a gate satisfied, not a control.
- **Source comments:** the diff adds none.
- **Round 2, at `d597734`:**
  - suite: 1879 cases, exit 0;
  - `pnpm run typecheck`: exit 0 (`typecheck-d597734.txt`);
  - `npx eslint --max-warnings=0` over every file changed `787bec5..d597734`: exit 0 (`eslint-changed-files-d597734.txt`). The first
    pass warned on two lines over 100 characters, both mine; I wrapped them.
  - convention check `--since=787bec5`: 0 FAIL, 0 CANDIDATE (`convention-check-d597734.txt`); the same SKIPs as round 1.

## User-visible flows

For the owner's own check on production after release; no UAT stage runs:
- Opening `/message/m/<another user's personal message number>/edit` no longer shows that message; the editor shows its load error.
- Copying another user's personal message through `/message/f/<id>` (hazard 4) no longer works: "Failed to copy message."
- Your own personal messages, and server messages for servers you administer, still open, save, copy, send (recent webhook data) and delete
  as before.
- Saving a message that was deleted in another tab now saves it as a new message and moves the editor to the new number. Before, it was
  recreated at the old number.
- After signing in, the recent-messages list shows only your own personal messages and server messages, even if your preferences hold
  other numbers.
- Deleting a message also clears its preview images when the number was sent with leading zeros. (The site's own UI always sends the
  canonical number, so this is not visible through it.)
- At the per-user limit of 1000 messages, a save naming a number no row holds is refused with the limit message.
- Deleting your own message, or a server message as that server's admin, works as before.
- A save whose message number is not plain digits is refused. The site's own editor always sends the database's number, so this is not
  visible through it.

## Handoff

- **Handoff SHA:** website `d597734859bb58e184cd7f218708382e46aa1589` on `chain/fix-personal-message-access` (no upstream; not pushed).
  Round 1 was `2e50cd9`.
- **Reviews:** code review (`code-reviewer-hooks-fix-personal-message-access`), then QA Phase 2 (107 production lines ≥ 20), then security
  on the change (rulings block 20:30Z).
- **Merges:** devops, for website `master`, under the owner's release approval. The push deploys to production through Vercel (no beta),
  so it needs his word.
- **Owner step at release:** the residue check on production data (Diagnosis, "Residue already in production"). Steering holds it to
  the release seam (block 22:59Z).

## Changelog

| Date (UTC) | Agent | Change |
|---|---|---|
| 2026-11-19T22:51 | fixer | Fix committed on website `chain/fix-personal-message-access` at `2e50cd9` (commit time). Red run, green run, 20 negative controls and the real-database run recorded under `verification/fix-personal-message-access/` |
| 2026-11-19T22:56 | fixer | Document created; `Handoff-At` `2e50cd9`; handed to code review |
| 2026-11-19T23:01 | fixer | Round 2 committed at `d597734` (commit time), on the amended scope of rulings block 22:59Z (record `2af7391`): delete owner term, upsert canonical id. Red at `2e50cd9`, 8 controls, real-database run over three SHAs recorded |
| 2026-11-19T23:04 | fixer | Scope statement, Diagnosis, Change, Test, Verification, flows and Handoff updated; `Handoff-At` moved to `d597734`; handed to code review |
