# verification/012 — `valid` field on stored messages

Chain-bound runnable material and captured results for plan 012. Nothing here is a standing
utility; see `../README.md` for what this tree is for.

**Corrected 2026-08-25.** This paragraph read *"Nothing has landed yet"* — written at QA Phase 1,
when the directory held only destinations. It is now false: probe directories, the backfill
reports and the artifacts below have landed. The obligation it carried — that each entry says
what occupies it and which stage owns it — is kept in the table.

| Artifact | What it is | Owner | State |
|---|---|---|---|
| `mutation-sweep.md` | Record of the bounded mutation sweep seeded at the guards in the QA document's Irreversible Side-Effect Register — each mutant, the single fixture that must kill it, and a disposition for every survivor (equivalent mutants recorded, never dropped). | qa, at Phase 2 | Not yet written |
| `backfill-report.md` | Capture of the M6 backfill's outcome distribution — **only if an agent executes the run**. Where the owner executes it (the expected case, per plan Assumption 4), his attestation and the printed summary quoted in the deployment document are complete evidence and no capture file is owed. | whichever agent executes it | Not yet written; may never exist |
| `scratch-subject-SCR1/` | The subject that re-specified register rows **QA-R4 and QA-R15** name (D23), plus the spec that proves the SCR-1 payload is refused for the mutual-exclusivity reason **and no other** — the sole-carrier control that catches a mis-built scratch record. 8/8 green at `website` `a74b9e2`; all 8 assertions observed red under 7 mutants. | qa | **Landed 2026-08-25** |
| `guidance-class-route-a/` | The re-derivation behind **QA-R19**'s re-specification (D28): the guidance class enumerated by the **shipped classifier** rather than from prose, with D25's one instruction executed over every member. 6 members, all lossless and bit-clearing, **cell B3 included** — so R19's three-shape premise is dead at the released tree. 17/17 green at `website` `a74b9e2`; 3 mutants observed red. Also executes the row's live falsifier. | qa | **Landed 2026-08-25** |

The M2 send-gate partition spec is deliberately **not** here. Vitest already reaches
`website/src/utils/limits.tsx`, so that spec belongs in the service's own suite — this tree is for
material no existing framework reaches.
