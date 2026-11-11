---
ID: n/a
Origin: fix-uat-local-stack-id-sequence
UUID: 860d4569
Status: Active
Status-Detail: "Fix committed at 1fee252 on master; awaiting code review (the reviewer also runs the suite and the red test: 7 production lines added, under 20, so no QA Phase 2). One finding outside scope routed to steering: the seed file's Message id 1."
Handoff-At: 1fee252 — repos=agent-output
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
Steering is told in the handoff message.

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

## Finding outside scope (routed, not absorbed)

`verification/015/upload-dialog/seed.sql` (out of scope by name) inserts `"Messages"` row **id
1**, along with `Users` id 1 and a session (its line 8, read at `68d737f`). So after `up --seed`
the local database holds a message at a production-range id, with or without this fix: the
sequence moves, but the row stays. A save of that message on a local build would publish
`message-update-1`. `CLAUDE.md` says a local database that already holds low-numbered messages is
"recreated, not reused". The fix cannot change the seed and does not refuse `--seed` on that
ground: either would widen the statement. Routed to `steering-queue-hooks` for re-scoping in the
handoff message.

## User-visible flows

None: a record tool. The one visible change is a new `up` output line, `message ids: next <n>`.

## Handoff

- **SHA:** `1fee252` (agent-output, `master`).
- **Reviews:** code review at `1fee252`. The reviewer also runs `node --test
  tools/uatLocalStack.test.js` and the red test (the `68d737f` tool with this test file). No QA
  Phase 2: 7 production lines added, under 20.
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
