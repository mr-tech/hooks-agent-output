---
ID: 014
Origin: 014
UUID: 4671e28c
Status: OPEN
Status-Detail: >-
  Cycle 1, pass 2 (rung 1–5). Verdict APPROVE — plan rev 3 is ready for QA Phase 1 and the
  implementer (M2 implementation still gated on the analysis). M-1–M-10 and L-1–L-6 verified
  landed → RESOLVED. Three new Lows (L-7–L-9), non-gating, next-touch. No owner question open.
---

# Critique — Plan 014, Hooks test-suite cleanup (pilot)

**Artifact**: `agent-output/planning/014-test-suite-cleanup.md`, revision 3 (agent-output `f9bb15b`; `website` at `a74b9e2`, verified unchanged).
**Analysis**: analysis/014-test-suite-cleanup-analysis.md (not backticked: does not yet exist) — commissioned (M2), open with analyst-hooks-14; not read. Sources re-derived directly at pass 1: coordination plan `/home/dev/.claude/plans/we-recently-changed-the-wobbly-sparrow.md`; inventory `analysis/test-inventory-2026-08-26.md`; handoff `components-v2-emptiness-not-caught-by-the-send-gate-2026-08-26.md`; qa.md "Regression-Test Authorship"; implementer.md pattern ladder; code-reviewer.md test-only-diff clause; `website/vitest.config.ts`, `package.json`, the 48 test files.
**Date**: 2026-08-27T00:20 UTC (pass 1: 2026-08-26T23:55).
**Status**: Revision 1 — cycle 1, pass 2.
**Roadmap / architecture**: `agent-output/roadmap/` absent; `architecture/website.md` carries nothing on tests. No Master Product Objective document exists — none cited.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-08-26T23:55 | planner-hooks-014 → critic-hooks-014 | Critique rev 2 | Initial. Whole-document pass; premises verified at `website` `a74b9e2`. 10 Medium, 6 Low. REQUEST REVISION. |
| 2026-08-27T00:20 | planner-hooks-014 → critic-hooks-014 | Critique rev 3 | Delta-bounded pass (diff `0540f34..f9bb15b`, 88/85 lines, boundary verified — no untouched section claimed). Every rev-2 finding re-verified against the tree → RESOLVED. L-7–L-9 new, non-gating. APPROVE. |

## Assumption Not Checked

This pass assumes the vitest ^4.1.2 JSON reporter emits per-case `assertionResults` (name + status) — now carried in the plan as M0 step 3 — and does not test it by running the suite. Falsity signature: verification/014/baseline-a74b9e2.json (not yet written) without per-case entries. Owner of closing: the implementer at M0, recorded in the implementation doc; the planner has already routed it there.

## Value Statement Assessment

Unchanged from pass 1: present, owner-approved verbatim (D12), every milestone traces to it. No drift introduced by rev 3.

## Overview

**Pricing against the ask**: sized to the ask as amended by D13/D14; rev 3's changelog states "Scope delta: none" and the diff confirms it — no milestone added or removed; M4a grew by five rename rows (the uniform rule the planner chose for Q1), which is a correction to the criterion's own class, not growth.

**Delta boundary**: `git diff 0540f34 f9bb15b` touches the header, changelog, rubric, Plan (M0–M5), acceptance criteria, Testing Strategy, Validation, Risks, Rollback, Outstanding Items and Handoff Notes. The Value Statement, Objective, Decisions Register and Assumptions sections are untouched — verified by the diff, not accepted from the message.

**Re-verification against the tree** (each is what the finding was about):
- New M5 step 5 predicate `(from |import\()\s*'(~|bot)/`: row 8 now passes; the seven files it still flags are exactly rows 10, 11, 32, 33, 34, 36, 43 — every one deleted or converted by M4b/M4c. (Row 45 passes today only because its source-text assertions contain the string `import('~/…')`; it is M4c-converted regardless, so the end-state reads 0.)
- New M3 acceptance grep counts exactly the three lifted families (11 files, sums as the inventory says); `makeEditable*`, `makeRes` no longer match.
- New positive predicate: `shapes.m9f-dropped-types`, `shapes.d34-empty`, `backfill.report-012` rejected; `shapes.v2-message`, `isValidUrl.url-validation`, `limits.mutual-exclusivity`, `interactions-edge.routing` accepted. Stated limit, not a finding: `l10n`-style tokens (`l` + digits + letter) fall in the ID class and would be rejected; no such module exists in `website` today.
- Negative form over three domains: the 9 lines outside titles and comments that still match today are all members of the named residue (four tmpdir prefixes, one fixture timestamp, four `it.each` format strings/row labels) — the residue class is real and correctly bounded.
- File partition: M4b 8 + M4a 28 + M4c 13 = 49 with row 14 counted twice under the named exception = 48 distinct. Sequence M0→M1→M3→M4b→M4a→M2→M4c→M5 serialises every shared file.

## Architectural Alignment

Unchanged: architectural surface none; M2 remains the only blast-radius item and carries its Risk row.

## Scope Assessment

Sized to the ask (above). The evergreen/chain-application split (M-4) is now explicit in the rubric heading and M1's content line.

## Technical Debt Risks

- The symlink recreation line now lives in the doc's four-repo map (L-1 landed).
- The residue class of the negative form is named; the next writer who adds a fixture timestamp will not be tempted to allow-list the gate.

## Findings

### Medium — all RESOLVED at rev 3

M-1  RESOLVED — all five renamed under a uniform rule (M4a, Q1 settled). Plan rev 3 `f9bb15b`.
M-2  RESOLVED — positive form carries a case-insensitive ID-token class over both segments; verified against six candidate names. Plan rev 3.
M-3  RESOLVED — negative form restricted to basenames/titles/comment lines; string-literal residue named and verified (9 members today, all in class). Plan rev 3.
M-4  RESOLVED — rubric heading and M1 content line separate the evergreen standard from chain-application rows; residual token noted as L-7. Plan rev 3.
M-5  RESOLVED — fixed sequence; M3's eleven files named, import-lines-only; the one dual-ownership exception named (with a slip, L-8). Plan rev 3.
M-6  RESOLVED — M3 acceptance names the lifted families' symbols; "leave — no family" rows added. Verified against tree. Plan rev 3.
M-7  RESOLVED — step 5 admits dynamic import; verified row 8 passes. Plan rev 3.
M-8  RESOLVED — disposition table gains `old title → new title`; AC2 keys on it. Plan rev 3.
M-9  RESOLVED — AC7 holder = QA; code review scoped to M2's non-test diff, stated with route (critic Q2). Plan rev 3.
M-10 RESOLVED — rows 14, 20, 22 → H5 partial in M4b; (E) declared universal with a named residue. Plan rev 3.

### Low — L-1–L-6 RESOLVED at rev 3

L-1 RESOLVED — `test -e && readlink -f`; recreation line in the doc's map. L-2 RESOLVED — `npm install --no-save` / `npm ci`, timestamped in the analysis doc. L-3 RESOLVED — hyphens admitted. L-4 RESOLVED — Risks column written rev 1–3, prediction row added. L-5 RESOLVED — H4 stated limit in the class row. L-6 RESOLVED — `*.spec.ts` in the find.

### Low — new at pass 2, non-gating, next-touch (rev 4 or the implementer's M1 write, whichever first)

**L-7 — Three ID tokens remain in text the plan routes into the evergreen doc.** Status: OPEN.
H7's disposition cell reads "A pin inside → handoff (D2)"; axiom (B) reads "(this chain: D9)"; the positive-form paragraph's illustration `shapes.m9f-dropped-types.test.ts` is itself an ID-class hit. M1 accepts only if the negative form over the doc → 0, so the implementer must drop all three when writing the doc — the plan should say so or strip them, so the doc's content is derivable from the plan without judgement. Landing: rev 4, or recorded as an omission in the implementation doc at M1.

**L-8 — M4b's ownership exception names row 15, which M4b does not open.** Status: OPEN.
M4b's H5-partial list is rows 14, 20, 22; row 15 (`012-validity-predicate`) is opened by M3 (import lines) and M4c only. The exception should name row 14 alone. Landing: rev 4.

**L-9 — AC7's residue enumeration names QA's instrument.** Status: OPEN.
"which QA's sweep enumerates by `grep -rn 'function ' …`" is a HOW in the qa subagent's domain; the class ("any transcription the inventory did not tag") is enough. One line; QA may keep or replace the instrument. Landing: rev 4, or QA notes it in Phase 1.

## Questions

None open. Q1–Q3 from pass 1 are settled in rev 3 (rename all five; CR scoped to M2; `--no-save` install site).

## Risk Assessment

Low. The rev-3 prediction row ("acceptance instruments contradict the dispositions they verify") is the right register entry for pass 1's class; this pass reports against it: **no new member** — every M5 command was re-run in its rev-3 form against the tree and reads as the plan predicts on every file it leaves as-is.

## Recommendations

APPROVE, cycle 1 pass 2 (rung 1–5). Next: the qa subagent for Phase 1 (runs before implementation per the plan's sequencing line), then the implementer from M0; M2 implementation waits on analyst-hooks-14's document. L-7–L-9 ride the next planner touch; none blocks.

## Revision History

| Pass | Artifact rev | Findings addressed | New findings | Status change |
|---|---|---|---|---|
| 1 (2026-08-26) | rev 2 `0540f34` | — | M-1–M-10, L-1–L-6 | OPEN |
| 2 (2026-08-27) | rev 3 `f9bb15b` | M-1–M-10, L-1–L-6 → RESOLVED | L-7–L-9 (Low) | OPEN (Lows only); verdict APPROVE |
