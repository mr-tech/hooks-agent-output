# verification/012 — `valid` field on stored messages

Chain-bound runnable material and captured results for plan 012. Nothing here is a standing
utility; see `../README.md` for what this tree is for.

**Nothing has landed yet.** This directory was created at QA Phase 1 so the destinations below are
a real place rather than a promise. Each entry says what will occupy it and which stage owns it.

| Artifact | What it is | Owner | State |
|---|---|---|---|
| `mutation-sweep.md` | Record of the bounded mutation sweep seeded at the guards in the QA document's Irreversible Side-Effect Register — each mutant, the single fixture that must kill it, and a disposition for every survivor (equivalent mutants recorded, never dropped). | qa, at Phase 2 | Not yet written |
| `backfill-report.md` | Capture of the M6 backfill's outcome distribution — **only if an agent executes the run**. Where the owner executes it (the expected case, per plan Assumption 4), his attestation and the printed summary quoted in the deployment document are complete evidence and no capture file is owed. | whichever agent executes it | Not yet written; may never exist |

The M2 send-gate partition spec is deliberately **not** here. Vitest already reaches
`website/src/utils/limits.tsx`, so that spec belongs in the service's own suite — this tree is for
material no existing framework reaches.
