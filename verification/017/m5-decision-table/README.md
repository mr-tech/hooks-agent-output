# verification/017/m5-decision-table — the M5-e oracle

Written by `qa-hooks-017` at QA Phase 1 (plan 017, M5-e: "QA's executable oracle … is re-keyed by
QA to this text before the implementer's tests read it"). An expected value is never computed from
production code: the oracle is a model of the plan's text.

## Current: revision 2 (agent-output `3d678cc`)

- `oracle.mjs` models two saves *s1*, *s2* of one message (s1 upserted first, so `n1` orders below
  `n2`).
  - Classes: `ok` (write, then commit, then deletes), `fail` (no write), `late` (the continuation
    gives up; the generator may write later, or never).
  - It adds an optional message delete (row delete `X`, then the route's purge `P`) at any position,
    and an optional old orphan `z` already in the prefix.
  - Rules modelled: M5-a's conditional commit (accepted iff the row exists and the stored nonce orders
    below; never inserts; it learns the nonce it replaced) and M5-c's three delete forms (replaced
    nonce; a refused commit's own object; a sweep of objects at least L old).
  - Invariants: B (M5-b, at every step), E1 (M5-a's property; a deleted row stays deleted), E2
    (every object of a save whose 204 was processed is gone unless committed), and E3 (M5-c's
    property after every commit's deletes).
  - Late writes left behind are counted as residue (RK-2), not as failures.
  - Timing premise the model does not check: L = 120 s outlasts any continuation (60 s), so within
    one window only `z` and `n0` are old enough to sweep (QA's NM-23 tests the age guard itself).
- `node oracle.mjs` → `oracle-run.txt`: **36 rows, 3120 interleavings, 0 violating**; 736 carry
  late-write residue.
- `node oracle.mjs --mutants` → `mutation-checks.txt`: each mutant makes it fire.

  | Mutant | Violating interleavings |
  |---|---|
  | commit unconditional | 312 |
  | commit inserts when the row is gone | 1708 |
  | form 1 dropped | 20 |
  | form 2 dropped | 336 |
  | sweep without the age guard | 60 |

- The model assumes the commit learns the nonce it **actually** replaced. On a real database one
  statement form does not: `verification/017/qa-phase1/pg-order-probe/` (QAF-10).

## Frozen: revision 1 (agent-output `97e6814`)

`oracle-rev1.mjs`, `oracle-rev1-run.txt` and `mutation-checks-rev1.txt` are the Phase 1 run that
QAF-1 and QAF-2 cite (82 interleavings over 9 class pairs). Under revision 1's literal rules, B broke
in 3 `ok`×`ok` interleavings. Kept unchanged as that finding's evidence.
