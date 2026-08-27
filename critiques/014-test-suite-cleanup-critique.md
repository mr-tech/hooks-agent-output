---
ID: 014
Origin: 014
UUID: 4671e28c
Status: OPEN
Status-Detail: >-
  Cycle 2, pass 1 (rung 1–5), scoped to the rev 6→7 delta. Verdict REQUEST REVISION on two
  partition defects the delta introduced (row 13 listed in M4a and M4b; row 15's ownership
  sentence contradicts its new M4b entry). Instrument corrections (M0 membership, AC2 pair key,
  probe pre-closure) verified and sound. Nothing before M4b is affected; the implementer may
  proceed through M0, M1, M3.
---

# Critique — Plan 014, Hooks test-suite cleanup (pilot) — cycle 2

Cycle 1 (passes 1–4, rev 2→6) is closed at `critiques/closed/014-test-suite-cleanup-critique.md` (`4b7f15e`). This document opens cycle 2 on the planner's own trigger: rev 7 changes what M0 and M4b require.

**Artifact**: `agent-output/planning/014-test-suite-cleanup.md`, revision 7 (agent-output `78616ec`; `website` at `a74b9e2`).
**Sources for this pass**: `qa/014-test-suite-cleanup-qa.md` (`bd5ddfd`) — INST-1/INST-2, the AC7 sweep table, the reporter probe; `verification/014/qa-phase1/probe-json-reporter-isValidUrl.json` (read directly); rows 13 and 15 in the tree.
**Date**: 2026-08-27.
**Status**: Initial — cycle 2, pass 1.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-08-27T02:05 | planner-hooks-014 → critic-hooks-014 | Scoped pass, rev 7 | Delta `52ff3f9..78616ec` (6/5 lines, boundary verified). Instruments verified against the probe and the tree. M-13, M-14 (partition), L-12. REQUEST REVISION. |

## Assumption Not Checked

This pass assumes QA's AC7 sweep enumeration is complete for the E1 class (production-function-as-oracle) over the 48 files and does not re-run it. Falsity signature: an M5-time case whose matcher argument calls a `~/`/`bot/` symbol in a file outside rows 13, 14, 15, 20, 22, 46. Owner of closing: the qa subagent's Phase 2 sweep (AC7 holder); named again in the handoff.

## Value Statement Assessment

Unchanged; rev 7 is instrument corrections and one enumeration. No drift.

## Overview

**Pricing against the ask**: sized to the ask. Scope delta none — two rows join an existing oracle-repair list on the AC7 holder's enumeration, which is the residue mechanism rev 3 declared.

**Verified**:
- Probe JSON (read directly): top-level `numTotalTestSuites` = 2 for a one-file run — QA's point that it counts `describe` blocks stands; `testResults[].name` is an absolute path (M0's "repo-relative" normalisation is required and the plan says so); `assertionResults[]` carries `fullName`, `title`, `status`. The reporter-shape assumption from cycle 1 is closed on one file; M0 re-confirms on the full run — correct routing.
- AC2 key = (path, `fullName`): right, since every file is renamed and `fullName` is file-local; the `old title → new title` column plus the old→new path mapping in the disposition table together make the key mappable.
- Row 13: `expect(applyModeSwitch('v2', prev)).toEqual(switchToV2(prev))` and the classic twin — present as QA says. Row 15: three `toBe(validateMessage(x) === '')` cross-checks — present. Both are E1 by QA's own predicate; their inclusion is the AC7 holder's call and the plan is right to cite rather than re-derive.

## Findings

### Medium

**M-13 — Row 13 is now listed in two M4 sub-milestones.** Status: OPEN.
Rev 7 adds row 13 (`012-message-mode`) to M4b's oracle-repair bullet; M4a's row list still carries 13 (verified at `78616ec`: "Rows 1, 2, 4, 5, 6, 8, 9, 12, 13, …"). The plan's own rule — "each test file is opened by … exactly one of M4a/M4b/M4c" — and the 48-way reconciliation (M5 step 7) both break. Rev 3 handled the same move correctly for rows 20 and 22 (dropped from M4a). Impact: the implementer either repairs and renames in M4b and then renames again in M4a, or picks one silently. Recommendation: drop 13 from M4a's list, as for 20 and 22.

**M-14 — Row 15's ownership sentence contradicts its new M4b entry.** Status: OPEN.
The same bullet that adds row 15 to M4b ends "Row 15 is M3 + M4c only." Row 15 is now M3 (helper import) + M4b (three oracle repairs) + M4c (two source-text cases). The named exception must read rows 14 **and** 15, each opened by M4b then M4c, M4b first. Impact: same as M-13 — an ownership claim the sequence will falsify. Recommendation: restate the exception over both rows.

### Low

**L-12 — H5's remedy branch "or the production import" is a no-op for E1 rows.** Status: OPEN.
Rows 13 and 15 already use the production import as the oracle; that is the defect. The disposition's two remedies (literal, or import the production function where a transcription stood in) map only the transcription rows. For E1 rows the remedy is the literal branch alone — one clause in the M4b bullet, so the implementer is not offered a branch that reproduces the violation.

## Questions

None for the owner. One for the planner, non-blocking: row 13's two cases test delegation (`applyModeSwitch` → `switchToV2`/`switchToClassic`). If delegation *is* the spec, the literal-oracle rewrite still holds; the plan need not decide, but the disposition row's `surface` cell should say which behaviour the literal encodes.

## Risk Assessment

Low; two list corrections. Standing prediction from cycle 1 (an acceptance instrument contradicting a disposition): M-13 is a member — M5 step 7's reconciliation would read 49 against a 48-row table — **recorded as a member at cycle 2 pass 1**, the first since rev 3; the planner should write it into the Risks row.

## Recommendations

REQUEST REVISION — cycle 2, pass 1 (rung 1–5). Two-line fix. M0, M1 and M3 are unaffected and the implementer may continue; M4b/M4a must not open on rev 7's lists.

## Revision History

| Pass | Artifact rev | Findings addressed | New findings | Status change |
|---|---|---|---|---|
| C2-1 (2026-08-27) | rev 7 `78616ec` (scoped delta) | — | M-13, M-14, L-12 | OPEN |
