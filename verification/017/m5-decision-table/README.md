# verification/017/m5-decision-table — the M5-e oracle

Written by `qa-hooks-017` at QA Phase 1 (plan 017 revision 1, M5-e: "carried as an executable oracle
under `verification/017/m5-decision-table/`, written by QA at Phase 1, which the implementer's tests
read").

- `oracle.mjs` — a spec model of two saves *s1*, *s2* of one message (s1 upserted first), written
  from the plan's M5-a, M5-b, M5-c and M5-e text and never from production code. Each save is
  answered in one class: `ok` (204), `fail` (500, 404, network error: nothing stored, M6-a) or
  `late` (no answer within T; the generator may still store the object later, or never). The oracle
  enumerates **every interleaving** of the events those answers imply — the generator's write `W`,
  the website's commit `C` and its delete-others `D` — and checks three invariants: B (M5-b, the
  committed object exists at every moment), E1 (M5-e, committed nonce = latest-upserted save whose
  204 was processed) and E2 (M5-e, the prefix ends holding exactly the committed object).
  `node oracle.mjs` prints the table; `node oracle.mjs --json` prints rows with every counterexample.
- `oracle-run.txt` — its output at this commit (node v24.14.0).
- `mutation-checks.txt` — the oracle mutated three ways (commit unconditional; delete a no-op;
  delete including its own object). Each mutant changes the printed table, so each invariant can
  fire.

**What the run shows, with the plan's rules read literally** (QA Phase 1 findings QAF-1 and QAF-2 in
`qa/017-existing-items-backlog-qa.md`):

- Over 82 interleavings in 9 class pairs, E1 holds in every one: the commit rule picks the right
  nonce.
- B fails in 3 of the 20 `ok`×`ok` interleavings: s1's delete-others runs after s2's object is
  written and before s2 commits, so s2 commits a nonce whose object s1 has deleted. That is a broken
  image, the defect item 2 removes.
- E2 fails in 1 further `ok`×`ok` interleaving (s2 commits first, then s1's object lands: an orphan
  nothing deletes) and in every `late` pair where the late object lands (RK-2's residue class, which
  the plan bounds only for a continuation the platform ended).

The plan's own table (which answer arrives first × each answer's class) cannot express the
write-versus-delete ordering, and that ordering is where the violations are. A fixture for M5-e has
to be able to represent it.

The model is the plan's text, not a design. Once the planner revises M5-a/M5-c, this oracle is
re-keyed to the revised rules (the `run()` function), re-run, and re-mutated before any test reads it.
