---
UUID: f4c70da4
Status: Open
Status-Detail: "tools/uat-local-stack.sh `up` exits 0 when it reuses its own container while \"Messages\" already holds an id below 900000000000001. Only `--seed` (fresh containers only) checks for low ids. Raised as CR-1 LOW in code-review/fix-uat-local-stack-id-sequence-code-review.md and routed here."
Owning-Stage: fixer (the next chain that edits tools/uat-local-stack.sh), or steering-queue-hooks, which can open it as a further round of fix-uat-local-stack-id-sequence
Review-Trigger: "when tools/uat-local-stack.sh is next edited; or before a walk reuses a hooks-postgres-local container that a tool older than 71b61b9 created, or one that a session wrote to with explicit low ids"
---

# Handoff — `up` reuses a database that holds low message ids

**Raised:** 2026-11-11 by `code-reviewer-fix-uat-local-stack-id-sequence`, at code review of
`fix-uat-local-stack-id-sequence`, Reviewed-At `71b61b9` (CR-1 LOW).

## The gap

The rule (workspace `CLAUDE.md`, "Local builds of `website` — before the first save") says: "A
local database that already holds low-numbered messages is recreated, not reused." At `71b61b9`,
`cmd_up` runs its low-id count (`select count(*) from "Messages" where id < 900000000000001`) only
inside the `if [ "$SEED" = 1 ]` branch. `--seed` is refused on a reused container, so a reused
container never has its low ids counted. On reuse, `up` moves `"Messages_id_seq"` to
`greatest(900000000000000, max(id))`, prints `message ids: next 900000000000001` and exits 0. An
existing message at id 1 stays, and a save that edits it would publish `message-update-1`.

Probe: `verification/fix-uat-local-stack-id-sequence/code-review-round1/reuse-low-id-probe.sh`.
Its run, `reuse-low-id-probe.txt` in the same directory, shows a second `up` with rc 0 and the
low-id count still 1 afterwards.

**Exposure, as measured:** on this box `docker ps -a` listed no `hooks-postgres-local` container
at review time. From `71b61b9` on, the tool cannot hand back a database with a low sequence, and
it checks the seed, so only two things create a low id: an explicit-id insert made by hand, or a
container kept from an earlier tool. Other boxes were not measured.

## Why it was not fixed in the chain

Steering's re-scope (`steering/queue-hooks-rulings.md`, block "2026-11-11T19:48Z", `05582c6`)
scoped the failure to "After a seed". The fixer implemented that scope exactly. Widening it is
steering's decision, not a defect in the fixer's round.

## What would discharge it

- **Preferred (structural):** run the low-id count once, unconditionally, after the push and any
  seed and before the sequence move, so that every `up` path fails on a stored id below the
  floor. The existing failure message already fits. This moves four lines out of the `--seed`
  branch.
- **Test:** the "reusing the tool's running container" and "starting the tool's stopped
  container" order cases expect `push, low-ids, sequence`. A new case runs reuse with
  `STUB_LOW_IDS=1` and expects exit 1 with the container left as found (running reuse) or stopped
  again (started reuse). Falsity signature: the new case passes against the `71b61b9` tool (it
  must fail there).
- Re-run the probe above against the fixed tool. The second `up` must exit 1.
- **Carried with it (CR-2 LOW, same review):** the `PGPASSWORD=$DB_PASS "$DOCKER" exec -e PGPASSWORD
  "$NAME" psql -U "$DB_USER" -d "$DB_NAME" -tAc … 2>/dev/null | tr -d '[:space:]'` invocation is
  written out three times: `table_count`, the low-id count and the sequence move. A single
  `psql_value "<sql>"` function, which `table_count` would become, makes a fourth copy unnecessary.
  Enumeration: `grep -cF 'psql -U "$DB_USER" -d "$DB_NAME" -tAc' tools/uat-local-stack.sh` → 3 (and `grep -cF psql` → 4) at
  `71b61b9`. This predicate does not see a copy that is wrapped or reordered differently. The
  seed's `-i -v ON_ERROR_STOP=1` form is a different call and stays as it is.
