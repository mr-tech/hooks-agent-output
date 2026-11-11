---
ID: n/a
Origin: fix-uat-local-stack-id-sequence
UUID: 860d4569
Status: Committed
Status-Detail: "Committed on the record repository's master at 7d59233; code review APPROVED at that tree (record 1f5b0c3). No QA Phase 2 (the tool is +15/-5 by git diff --numstat 68d737f). No deploy: the tool is a record tool. Closed by steering-queue-hooks."
Handoff-At: 7d59233 — repos=agent-output; round 2 reviewed at 71b61b9 (APPROVED_WITH_COMMENTS), round 1 at 1fee252 not reviewed
Origin-Chain: PI006
---

# fix-uat-local-stack-id-sequence — implementation

## Scope statement

From the scoping determination, `steering/queue-hooks-rulings.md`, block "2026-11-11T19:41Z —
scoping determination: `fix-uat-local-stack-id-sequence` (the `fixer` agent)" (committed at
`68d737f`), relayed in `steering/queue-hooks-briefs/fixer-uat-local-stack-brief.md`. Route:
steering's determination under lifecycle `references/escalation.md` Standing Defaults (a
test-estate change, told to the owner, not asked).

> one defect. `up` hands back a database whose `"Messages_id_seq"` is restarted at
> 900000000000001, or fails. Chain paths, whole, in the shared record repository on `master`
> (no chain branch): `tools/uat-local-stack.sh`, `tools/uatLocalStack.test.js`, and the fixer's
> document `implementation/fix-uat-local-stack-id-sequence-implementation.md`. Out: every other
> file under `tools/`, `CLAUDE.md`, the seed file, `website`, `project-utils`,
> `preview-image-generator`.

The point left to me, settled here and **agent-authored**: the sequence move runs **once, after
the seed** when `--seed` is given (after the push otherwise), as the last write before the table
count. Reason: the move reads the stored ids, so placing it after every insert makes it see them
all; today's seed inserts with explicit ids (read below), which do not draw on the sequence, so the
order does not change today's value.

**Fence disclosure.** The fixer definition requires the red runs to be captured and committed
under `verification/fix-<slug>/`; the brief's fence names only three paths. I committed five new
capture files under `verification/fix-uat-local-stack-id-sequence/` in `1fee252` without first
asking. They are new files, edit nothing existing, and are named in Test and Verification below.
Steering is told in the handoff message. Steering's answer: the omission was its brief's error, and
the capture directory is in the chain's set (re-scope block below).

**Re-scope, round 2.** `steering/queue-hooks-rulings.md`, block "2026-11-11T19:48Z —
`fix-uat-local-stack-id-sequence` re-scoped by this thread: the seed's message id joins the fix"
(record `05582c6`), relayed by SendMessage. Route: steering's decision under Standing Defaults,
told to the owner, his to veto. Its limbs, quoted:

> - The seed's "Messages" id moves to 900000000000001 or above, with any row that refers to it.
> - After a seed, `up` fails where a stored "Messages" id is below 900000000000001 (the scope
>   statement's "or fails").
> - Path added to the chain's set: `verification/015/upload-dialog/seed.sql`. Not edited: any other
>   file under `verification/015/`; a script there that expects message 1 is named in the fixer's
>   document, not changed.

Scripts that expect message 1: none in `verification/015/upload-dialog/`. `run-local-probe.sh`
and `upload-dialog-cdp.mjs` use the session token and the folder path `/message/f/0`, not a
message id (read at `05582c6`). One comment elsewhere names a message 1:
`verification/015/uat/b14-fresh-message.js` line 1 ("message 1 is black, which base refuses"). It
does not read this seed (`grep -rln seed.sql verification/ tools/` names only this chain's tool,
test and captures), so it is named here and not changed.

## Entry Conditions

| Condition | Value |
|---|---|
| Scoping determination | `steering/queue-hooks-rulings.md`, block "2026-11-11T19:41Z — scoping determination: `fix-uat-local-stack-id-sequence`", read at `68d737f` |
| Bounded scope statement | Quoted above |
| Branch | The brief negates the fix branch: this chain's source is in the record repository, committed on `master` over the enumerated paths. Base `68d737f` |
| Lifecycle, `CLAUDE.md`, architecture | Lifecycle `SKILL.md` read at session start; workspace `CLAUDE.md` "Local builds of `website` — before the first save" read; `architecture/system-architecture.md` not read for this tool (the brief records nothing in it for the tool) |

## Diagnosis

- **Cause:** `cmd_up` pushes the schema (line 218 at `68d737f`), optionally seeds (223–227) and
  counts tables; nothing touches `"Messages_id_seq"`, so a fresh database numbers messages from 1,
  inside production's range, which the `CLAUDE.md` rule forbids before the first save.
- **Instrument 1, read:** `grep -c -E 'RESTART|Messages_id_seq' tools/uat-local-stack.sh` → 0 at
  `68d737f` (steering's count, re-read by my read of the whole file at `68d737f`).
- **Instrument 2, real Postgres:** the `68d737f` tool (`git show` into scratch), run `up --seed`
  against a throwaway `postgres:16` container on a free loopback port and a scratch env file
  (never `website/.env.local`): `"Messages_id_seq"` read `1|f` (last_value 1, not called), and a
  default-id insert failed with `duplicate key ... Key (id)=(1) already exists` against the seed's
  row. Capture: `verification/fix-uat-local-stack-id-sequence/real-postgres-base-run.txt`.
- **Origin-Chain:** `PI006`. The faulty lines are from `c45c69b` ("PI006 M9:
  tools/uat-local-stack.sh up|down|status …", 2026-11-09; `git blame -L 217,222 68d737f`). The rule
  the tool fails entered `CLAUDE.md` later, at `cbf0119` (2026-11-11 10:13Z, `git log -S
  Messages_id_seq -- CLAUDE.md`), so PI006 met the rules of its day; the gap opened when the rule
  was written.
- **Residue in production:** this tool writes only to its own local container, so it leaves none.
  The hazard is a later website save on a low local id, which can publish to a real user's Pusher
  channel. Whether any walk on a database this tool built saved before the rule existed was not
  read. Steering's record shows chain 016 made the restart a precondition (its QA register row
  B-1). Any check of the live Pusher side is the owner's, since it is a provider.

## Change

- `tools/uat-local-stack.sh` — `cmd_up`, after the push and any seed: one `psql` call sets
  `"Messages_id_seq"` to `greatest(900000000000000, max(id) of "Messages")`, so the next id is
  900000000000001 on a fresh database and past every stored id on a reused one (an exact
  `RESTART WITH 900000000000001` over a reused database whose ids already passed it would make the
  next save collide). It reads the value back: empty or not a number → `fail` "message-id sequence
  move failed"; below the floor → `fail`. Otherwise it prints `message ids: next <n>`, which the
  record's walks can cite as the id range's start. The usage header names the step. 7 production
  lines added, plus 2 header lines changed (`git diff --numstat`: 10 added, 2 removed).
- `tools/uatLocalStack.test.js` — the docker stub answers a `psql` carrying `Messages_id_seq`
  (`STUB_SEQ_VALUE`, `STUB_SEQ_FAILS`); the docker and prisma stubs log call order to
  `state/order`; 10 new cases (below).

Side effect added (one line): `setval` on the local container's `"Messages_id_seq"` · route `up`
after the push and any seed · enforcing precondition: a `DATABASE_URL` host that is not loopback is
refused before any act (line 103), and only the tool's labelled container is used.

Work declined: when the move fails or reads back inside the range, `up` does not hand back the
database. It exits 1, and the existing `undo` removes the container this call created or stops the
one it started; a reused container is left as found. The declined hand-back goes to the caller,
who reads the message and runs `up` again, or `down` then `up`. No queue holds it. The tests follow
both undo paths.

No lifetime added (no lock, entry, listener or timer); no exit enumeration owed.

## Test

Spec-form cases, all in `tools/uatLocalStack.test.js`:

- `up on a container it creates` / `up --seed` / `up reusing the tool's running container` /
  `up starting the tool's stopped container`: each "moves the message-id sequence out of
  production's range after the push and any seed, and prints the next id". Asserts a `docker exec`
  carrying `setval('"Messages_id_seq"'` and `900000000000000`, the order `push[, seed], sequence`,
  and `message ids: next 900000000000001` before `tables:`.
- `a reused database whose ids are already past the floor keeps counting from its own next id`
  (read-back 900000000000041 → `next 900000000000042`).
- `a sequence move that fails` / `a sequence read back inside production's range` /
  `a sequence read back that is not a number`: each "fails the call before any table count, and the
  container it created is removed" (exit 1, `mutating()` = `run, rm`).
- `a sequence move that fails on a container the call started stops it again` (`start, stop`).
- One row in the credential-paths table: `a sequence move that fails` prints no password or URL.

**Red run** at `68d737f` tool with the new test file: `node --test tools/uatLocalStack.test.js`
(capped: `timeout 300` + `systemd-run --user --scope -p RuntimeMaxSec=300 -p MemoryMax=1G`) →
exit 1; tests 106, pass 96, fail 10. All 10 new cases fail; every existing case passes. Capture:
`verification/fix-uat-local-stack-id-sequence/red-run.txt`.

**Green run** at `1fee252`: same command → exit 0; tests 106, pass 106, fail 0. Capture:
`verification/fix-uat-local-stack-id-sequence/green-run.txt`.

**Real Postgres, fixed tool** (the stub only proves the tool sends the statement; this proves the
statement): `up --seed` → `message ids: next 900000000000001`, sequence `900000000000000|t`, a
default-id insert got 900000000000001. Then an explicit insert at 900000000000041, and `up` again
(reuse) → `message ids: next 900000000000042`; the next default insert got 900000000000042. Capture:
`verification/fix-uat-local-stack-id-sequence/real-postgres-run.txt`.

Infrastructure set up and removed: two `hooks-postgres-local` containers (`postgres:16`, loopback
ports 55085 and 35721, scratch env file with a synthetic password), one per real-Postgres run, each
removed by the tool's own `down` (`down: removed hooks-postgres-local`). After both, `docker ps -a
--filter name=hooks-postgres-local` lists 0 containers. No website build was run and nothing was
saved through one.

## Verification

- **Existing tests:** the 96 existing cases pass in both runs above; the whole suite exits 0 at
  `1fee252`.
- **Build:** none. The workspace's build verification is for `website`; this is a bash tool,
  checked with `bash -n tools/uat-local-stack.sh` → ok. `shellcheck` is not installed (`command -v
  shellcheck` → none), so it is **unchecked**.
- **Lint / convention check:** `node ~/.claude/tools/convention-check.js
  /usr/local/bin/hooks/agent-output --since=68d737f` → exit 0, no FAIL, no CANDIDATE. It **SKIPs**
  `tools/uat-local-stack.sh` (".sh is outside the examined set"), so the comment allowlist is
  **unchecked** for my header change (2 lines of the existing usage header, kept accurate). It
  exempts `tools/uatLocalStack.test.js` ("under a record repository — exempt from every check").
  The record repository has no eslint config or `package.json`, so it has no linter to run.
  Capture: `verification/fix-uat-local-stack-id-sequence/convention-check.txt`.
- No package-manager operation; no lockfile.

## Finding outside scope (routed, not absorbed; taken into scope by the re-scope, fixed in round 2)

`verification/015/upload-dialog/seed.sql` (out of scope by name) inserts `"Messages"` row **id
1**, along with `Users` id 1 and a session (its line 8, read at `68d737f`). So after `up --seed`
the local database holds a message at a production-range id, with or without this fix: the
sequence moves, but the row stays. A save of that message on a local build would publish
`message-update-1`. `CLAUDE.md` says a local database that already holds low-numbered messages is
"recreated, not reused". The fix cannot change the seed and does not refuse `--seed` on that
ground: either would widen the statement. Routed to `steering-queue-hooks` for re-scoping in the
handoff message.

## Round 2 — the seed's message id

**Change.**
- `verification/015/upload-dialog/seed.sql` line 8: the "Messages" row's `id` 1 →
  900000000000001. No other seed row refers to a message id. `fk_users_id` 1 is the user's id, and
  `Users`, `Accounts` and `Sessions` stay as they were: the rule is about message ids.
- `tools/uat-local-stack.sh`, inside the `--seed` branch after `seed: applied`: one `psql` count
  of `"Messages"` rows with `id < 900000000000001`. Anything other than `0` (a count, an empty or
  unreadable answer) → `fail "the seed leaves stored message ids below 900000000000001 (count:
  …)"`, before the sequence move, so the existing undo removes the container this call created.
  `--seed` only ever runs on a container this call created (existing guard). 4 code lines, plus 2
  header lines. Since `68d737f` the tool is 15 lines added and 2 removed (`git diff --numstat`): 11
  code lines (one of them blank) and 4 usage-header lines (the header was rewrapped), under 20.
- `tools/uatLocalStack.test.js`: the stub answers the count (`STUB_LOW_IDS`) and logs
  `low-ids` in the call order. The `up --seed` order case now expects `push, seed, low-ids,
  sequence`. New cases: `a seed that leaves a message below the floor` and `a seed whose low-id
  count is not a number`, each "fails up --seed before the sequence move, and the container it
  created is removed". Plus one credential-paths row.

Work declined: a seed that leaves a low id gets no database. `up` exits 1 and the container is
removed. The caller fixes the seed and runs `up --seed` again; nothing queues it.

**Red run** with the `1fee252` tool and the new test file → exit 1; tests 109, pass 105, fail 4.
The failures are the 3 new cases and the changed `up --seed` order case. Capture:
`verification/fix-uat-local-stack-id-sequence/red-run-2.txt`.

**Green run** at `71b61b9` → exit 0; tests 109, pass 109, fail 0. Capture: `green-run-2.txt`
(same directory).

**Real Postgres** (`real-postgres-run-2.txt`, same scratch-env method as round 1):
- `up --seed` with the record's seed → `message ids: next 900000000000002`; the stored ids are
  `900000000000001`; a default insert got 900000000000002; then `down`.
- `up --seed` with the `05582c6` seed (message id 1, through `ULS_SEED`) → `the seed leaves stored
  message ids below 900000000000001 (count: 1)`, `removed the container this call created`, rc 1.

Afterwards `docker ps -a --filter name=hooks-postgres-local` lists 0 containers. That makes three
throwaway containers in round 2's runs, two of them created by `up --seed`, all removed.

**Convention check** (`convention-check-2.txt`): exit 0, no FAIL or CANDIDATE. It SKIPs `.sh` and
`.sql`, so the header comment and the seed are **unchecked** by it, and it exempts the test file as
before.

## Round 3 — every `up` checks for low ids; one `psql_value`

**Authority.** `steering/queue-hooks-rulings.md`, block "2026-11-11T19:57Z" (record `7cb07bc`),
relayed by SendMessage. The specification is "What would discharge it" in
`handoff/uat-local-stack-up-reuses-low-message-ids-2026-11-11.md` (record `0f75a2c`), which carries
CR-1 and CR-2 from `code-review/fix-uat-local-stack-id-sequence-code-review.md`, Reviewed-At
`71b61b9`. No paths were added, so this round does not edit the handoff document. Its closure is
steering's or the reviewer's, at re-review.

**Change.**
- CR-1: the low-id count moved out of the `--seed` branch. It now runs once on every `up` path,
  after the push and any seed and before the sequence move. Its failure message now names both
  cases: "the database holds stored message ids below 900000000000001 (count: …); recreate it, do
  not reuse it". On a reused running container, the existing undo leaves it as found; on one this
  call started, undo stops it again; on one this call created, undo removes it.
- CR-2: `psql_value "<sql>"` is the single `-tAc` invocation. `table_count` is now a one-line call
  of it, and the low-id count and the sequence move call it. The seed's `-i -v ON_ERROR_STOP=1`
  call stays as it was, per the handoff. Enumeration at `7d59233`: `grep -cF 'psql -U "$DB_USER"
  -d "$DB_NAME" -tAc' tools/uat-local-stack.sh` → 1 (it was 3 at `71b61b9`); `grep -cF psql` → 6
  (the function's name accounts for 4 of those matches: its definition and three calls).
- Usage header: the id check is named for every `up`.
- **Tool's added-line count from `68d737f`, by `git diff --numstat 68d737f 7d59233 --
  tools/uat-local-stack.sh`:** 15 added, 5 removed. That is under 20, so no QA Phase 2.
- Test: the three non-seed order cases now expect `push, low-ids, sequence`. A new pair, "up
  reusing the tool's running container / starting the tool's stopped container that holds a
  message below the floor fails before the sequence move and leaves the container as found",
  runs with `STUB_LOW_IDS=1`. It expects exit 1, the order `push, low-ids`, no `tables:` or
  `message ids:` line, and the mutations `[]` (running) or `start, stop` (started), with the state
  as found.

Work declined: a reused database holding a low id is not handed back. `up` exits 1 and the
container is left as found, or stopped again. The caller runs `down` and then `up`, as the message
says.

**Red run** with the `71b61b9` tool and the new test file → exit 1; tests 111, pass 106, fail 5.
The failures are the 3 order cases and the 2 new cases, which meets the handoff's falsity signature
(the new case must fail at `71b61b9`). Capture: `red-run-3.txt`.

**Green run** at `7d59233` → exit 0; tests 111, pass 111, fail 0. Capture: `green-run-3.txt`.

**Reviewer's probe** (`code-review-round1/reuse-low-id-probe.sh`, run unedited against the fixed
tool): the first `up` gives rc 0 and `next 900000000000001`. After explicit inserts at id 1, the
second `up` (reuse, running) prints "the database holds stored message ids below 900000000000001
(count: 1); recreate it, do not reuse it" with **rc 1**, as the handoff requires. `down` rc 0, 0
containers left. The probe's own exit code is 1 because its last line is `grep -c .` over an empty
listing. Capture: `reuse-low-id-probe-round3.txt`.

**Real Postgres, `up --seed`** with the record's seed → rc 0, `next 900000000000002`; `down` rc 0;
0 containers left. Capture: `real-postgres-run-3.txt`. This round created two throwaway
`hooks-postgres-local` containers, one in the probe and one here, and both were removed.

**Convention check** (`convention-check-3.txt`): exit 0, 0 FAIL or CANDIDATE lines. `.sh` is
skipped, so it remains **unchecked**, as before.

All captures named in this section are under `verification/fix-uat-local-stack-id-sequence/`.

## User-visible flows

None: a record tool. The one visible change is a new `up` output line, `message ids: next <n>`.

## Handoff

- **SHA:** `7d59233` (agent-output, `master`). Earlier rounds: `1fee252`, not reviewed; `71b61b9`,
  APPROVED_WITH_COMMENTS with CR-1 and CR-2, which round 3 discharges.
- **Reviews:** re-review at `7d59233` by `code-reviewer-fix-uat-local-stack-id-sequence`. No QA
  Phase 2: the tool is +15/-5 by `git diff --numstat 68d737f 7d59233`, under 20 added.
- **Delivery, round 3:** handoff sent to `code-reviewer-fix-uat-local-stack-id-sequence` by
  SendMessage, as the ruling directs.
- **Merges:** nothing to merge. The commit is on the record repository's `master`, whose push
  deploys nothing (`ls -d .github` fails, per the determination). No push was made.
- **Delivery:** no reviewer session is live, so a spawn cue goes to `steering-queue-hooks` by
  SendMessage, with the seed finding and the fence disclosure.
- **Gate disclosure:** the record's stamp gate refused my first write of the changelog row because
  I had typed its minute. The row's stamp was then taken by `record-edit.js` `{now}`, which is the
  remedy the gate names.

## Changelog

| Date (UTC) | Rev | Change |
|---|---|---|
| 2026-11-11T19:47 | 1 | Fix and tests committed at `1fee252`; red, green and real-Postgres runs captured; handoff to code review via a spawn cue to steering; seed finding routed |
| 2026-11-11T19:50 | 2 | Re-scope (steering, 2026-11-11T19:48Z, `05582c6`): seed's message id → 900000000000001; `up --seed` fails on a stored message id below it; committed at `71b61b9`; red, green and real-Postgres runs captured; Handoff-At moved to `71b61b9`; spawn cue to steering |
| 2026-11-11T20:00 | 3 | Ruling 2026-11-11T19:57Z (`7cb07bc`): CR-1, every `up` checks for low ids; CR-2, one `psql_value`; committed at `7d59233`; red 5/111 at `71b61b9`, green 111/111; reviewer's probe second `up` rc 1; Handoff-At moved to `7d59233`; handed to the code reviewer |
| 2026-11-11T20:09 | 4 | Code review APPROVED at `7d59233` (`code-review/fix-uat-local-stack-id-sequence-code-review.md`, record `1f5b0c3`), read from the record; nothing further owed by the fixer |
| 2026-11-11T20:09 | 5 | Document closed by `steering-queue-hooks`. Status: Committed. The fix stands on `master` at `7d59233`, reviewed APPROVED there; the chain has no QA, UAT or devops stage by its scoping determination (`steering/queue-hooks-rulings.md`, 2026-11-11T19:41Z). |
