---
ID: 014
Origin: 014
UUID: 4671e28c
Status: OPEN
Status-Detail: >-
  Cycle 1, pass 3 (rung 1–5), scoped to the rev 3→5 delta. Verdict: APPROVE STANDS — rev 5
  consumes the M2 analysis correctly; M2 may be implemented. L-7–L-9 verified landed (rev 4) →
  RESOLVED. Two new Mediums (M-11 exit code does not travel; M-12 Validation instrument excludes
  tests) and two Lows, all next-touch and none blocking QA Phase 1 or M0–M4b.
---

# Critique — Plan 014, Hooks test-suite cleanup (pilot)

**Artifact**: `agent-output/planning/014-test-suite-cleanup.md`, revision 5 (agent-output `72cde0a`; `website` at `a74b9e2`, verified unchanged).
**Analysis**: `analysis/014-test-suite-cleanup-analysis.md` (`50f053a`) — read whole at pass 3; its S1–S5 and the pnpm correction are the delta's sources. Earlier sources per pass 1.
**Date**: 2026-08-27 (pass 3); pass 2 2026-08-27T00:20; pass 1 2026-08-26T23:55.
**Status**: Revision 2 — cycle 1, pass 3.
**Roadmap / architecture**: absent / nothing on tests — unchanged.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-08-26T23:55 | planner-hooks-014 → critic-hooks-014 | Critique rev 2 | Initial. Whole-document pass. 10 Medium, 6 Low. REQUEST REVISION. |
| 2026-08-27T00:20 | planner-hooks-014 → critic-hooks-014 | Critique rev 3 | Delta pass. All rev-2 findings RESOLVED. L-7–L-9 new. APPROVE. |
| 2026-08-27T01:10 | planner-hooks-014 → critic-hooks-014 | Scoped pass, rev 5 | Delta `f9bb15b..72cde0a` (rev 4, R-1, rev 5; 36/26 lines, boundary verified). L-7–L-9 RESOLVED. Analysis read; S1–S5 and pnpm correction verified against the tree. M-11, M-12, L-10, L-11 new. APPROVE stands. |

## Assumption Not Checked

This pass assumes the analysis's mirror-run figures (48/617 baseline, `test.projects` node-project digest byte-identical to baseline, exit 0 with the nine prefetch stubs) transfer to `website`'s own tree, and does not re-run them. Falsity signature: M0's in-place `numTotalTests` ≠ 617 or exit ≠ 0, or the M2 node-project digest ≠ M0's. Owner of closing: the implementer at M0 and at M2 acceptance (1) — the plan already routes both.

## Value Statement Assessment

Unchanged; rev 5 moves one file (row 45) from convert to delete-with-Outstanding-Items, which is the value statement's own "per-deletion proof" clause, not a drift.

## Overview

**Pricing against the ask**: sized to the ask as amended. No milestone added or removed. M4c's target set widened by the two components the source-text corpus already reads (S1 — a correction to the class's enumeration, not growth); row 45 moved to H1's delete branch (S4). R-1 registers D16 (QA first) — a registration within the steering grant; its effect (implementer waits on Phase 1) is sequencing, not a criterion change.

**Delta boundary**: the diff touches header, changelog, register (D16), axiom (B), H7, the positive-form illustration, helper policy, Plan ownership line, M2 (rewritten), M3 (paths, S3), M4b (row 15 wording), M4c (row 45, target set, residue), AC7, Risks, Handoff Notes. M0, M1, M4a, M5, AC1–AC6, AC8, Rollback are untouched — verified by the diff.

**Verified against the tree / the analysis**:
- pnpm: `package.json` `"packageManager": "pnpm@10.28.2"`, `pnpm-lock.yaml` present, no npm lockfile. Rev 3's `npm install --no-save`/`npm ci` paragraph was wrong as the planner now says; withdrawing it as planner error in the changelog is the right correction form. Rollback (revert incl. `pnpm-lock.yaml`) is unchanged and correct.
- S5: `tsconfig.json` excludes `**/__tests__`; `tsconfig.test.json` includes `src/**/__tests__/**/*.{ts,tsx}`. Helpers under `__tests__/helpers/` are therefore outside the production program and inside the test one — the re-siting is right. M3's acceptance grep (`--include='*.test.ts*'`) still counts 0 helper-file definitions, so no new member of the instrument-contradiction class.
- D13 reopening class: the analysis mounts all six named targets plus `NewMessageModal` and `SaveAsMenu` with zero `src/` changes — the class is not met; the plan's Risks row records it. `test.projects` is a legitimate reading of D13's "vitest environment change".
- Rev 4: `(D2)` gone from H7, `(this chain: D9)` gone from axiom (B), illustration no longer carries an ID token, row 15 corrected, AC7's QA instrument removed → L-7–L-9 RESOLVED.

## Architectural Alignment

Unchanged. The `test.projects` split keeps `window` out of the ~40 node-logic files — the analysis's argument, and the plan's Risk row ("harness changes node tests' behaviour") now has a mechanism that closes it by construction plus a measurement to confirm.

## Scope Assessment

Sized to the ask. Row 45's deletion sits inside H1's own else-branch as the plan has carried it since rev 1; D13's verbatim ("converted … instead of deleted") is the owner's expectation for the class, and S4 is new evidence within its spirit (no oracle exists, not "no mount"). See L-10 for how the register should show it.

## Technical Debt Risks

- The exit-code finding is the analysis's most consequential result and is now an M2 criterion — but only there (M-11).
- The analysis's offered convention ("presence of an API in the environment is never evidence the path ran") is not in M1's content list. Planner's call; recorded as a question, not a finding.

## Findings

### Resolved (disposition lines)

M-1–M-10 RESOLVED — plan rev 3 `f9bb15b` (critique pass 2).
L-1–L-6 RESOLVED — plan rev 3 `f9bb15b` (pass 2).
L-7 RESOLVED — ID tokens stripped from doc-bound text. Plan rev 4 `58e1eb1`, verified at pass 3.
L-8 RESOLVED — exception names row 14 only; row 15 stated as M3 + M4c. Plan rev 4, verified.
L-9 RESOLVED — AC7 residue names the class, not QA's instrument. Plan rev 4, verified.

### Medium — new at pass 3

**M-11 — The process-exit-code observable is declared at M2 only; every other suite-run criterion still reads counters that the analysis proved can be green at exit 1.** Status: OPEN.
M2 acceptance (2) now reads the exit code because the analysis found `57 passed / 636 passed / exit 1` reproducibly. But M0 (baseline capture), M3 ("M0 per-case pass set unchanged"), M4a ("zero failures on both trees"), M4c and M5 step 1 (`numFailedTests = 0`) are unchanged and read the JSON counters only. The input that degrades the instrument — a post-teardown rejection — is a property of any run that mounts the edit page, and M4c writes such tests after M2; M5 is the run that ships. This is the "degraded input does not travel" shape: the residue was accepted at one milestone and the same input feeds four others. Impact: M5 can certify a suite that fails `pnpm test`. Recommendation: state once, at the Plan level, that every captured suite run records the exit code beside the counters and that an acceptance over a pass set is satisfied only at exit 0 — the analysis's own instrumentation row says the same; the plan then need not repeat it per milestone.

**M-12 — Validation's static gate does not see test files.** Status: OPEN.
Validation: "`npx tsc --noEmit` in `website` at the merge SHA". `tsconfig.json` excludes `**/__tests__` (verified), so that command type-checks none of the 48 files this chain edits, renames or converts; the project's own `typecheck` script runs both programs (`tsc --noEmit && tsc --noEmit -p tsconfig.test.json`, verified). Impact: a type error in a converted `.test.tsx` or a lifted helper passes the plan's only static gate; vitest transpiles without type-checking, so nothing else catches it before merge. Recommendation: name the project's own script (or both programs) as the instrument; the M1 doc's command list has the same gap if it inherits the line.

### Low — new at pass 3, next-touch

**L-10 — D13's row does not show the S4 exception.** Status: OPEN. A reader of the register alone sees "converted instead of deleted"; the one-file exception lives only in M4c. A registration-grade consequence line on D13 ("row 45: no observable oracle under any harness — H1 delete branch, analysis S4") keeps the register consumable at the row. Landing: next registration or planning pass.

**L-11 — M4c's named residue omits the analysis's open question 3.** Status: OPEN. `DiscordMessageEditor` mounted only transitively and only with the edit-page prefetches stubbed; whether it mounts at exit 0 in a test of its own is undetermined. It is reached by the same edit-page conversions as the named residue (`EmojiPicker`, dynamics wrappers) and should be listed beside them so a failed mount lands in Outstanding Items rather than as a surprise. Landing: rev 6 or the implementer's M4c disposition row.

## Questions

1. (M-11) Does the planner want the exit-code rule as a Plan-level line or per milestone? Either satisfies; one line is cheaper for every downstream reader.
2. Does the analysis's offered environment-fidelity convention go into M1's doc? Planner's call; if yes, it is evergreen text and must pass the doc's own negative-form check.

## Risk Assessment

Low. Prediction row (instrument contradiction): **no new member at pass 3** — the re-sited helpers and the widened target set leave every M3/M5 instrument reading as the plan predicts. M-11 is a different shape (an instrument that cannot see a failure class, found by the analysis, not a contradiction with a disposition) and is recorded as its own finding rather than as a member.

## Recommendations

APPROVE stands (cycle 1, pass 3, rung 1–5). M2 is cleared for implementation on the analysis. M-11 and M-12 are one-line criterion corrections; they should land before M5 is run, and nothing before M5 depends on them — QA Phase 1 and M0–M4b proceed. Next: QA Phase 1 (in progress per Status-Detail), then the implementer per D16.

## Revision History

| Pass | Artifact rev | Findings addressed | New findings | Status change |
|---|---|---|---|---|
| 1 (2026-08-26) | rev 2 `0540f34` | — | M-1–M-10, L-1–L-6 | OPEN |
| 2 (2026-08-27) | rev 3 `f9bb15b` | M-1–M-10, L-1–L-6 → RESOLVED | L-7–L-9 (Low) | OPEN; verdict APPROVE |
| 3 (2026-08-27) | rev 5 `72cde0a` (scoped delta incl. rev 4, R-1) | L-7–L-9 → RESOLVED | M-11, M-12, L-10, L-11 | OPEN; APPROVE stands |
