---
ID: 7
Origin: 7
UUID: d4e8a1c3
Status: Released
---

# Critique — Plan 007: Components V2 Aggregate Displayable Text Limit

**Artifact**: `agent-output/planning/007-components-v2-displayable-text-limit.md`
**Analysis**: `agent-output/analysis/closed/007-components-v2-displayable-text-limit-analysis.md`
**Date**: 2026-04-09
**Status**: Revised Review

## Changelog

| Date       | Handoff        | Request         | Summary                                      |
| ---------- | -------------- | --------------- | -------------------------------------------- |
| 2026-04-09 | Planner→Critic | Revision review | M1, M2 addressed. Plan approved for handoff. |
| 2026-04-09 | Planner→Critic | Initial review  | Initial critique created                     |

---

## Value Statement Assessment

Clear and well-formed. The user story follows "As a / I want / so that" structure with a specific, measurable outcome. The pain point (opaque API error) is directly tied to the solution (editor warning + send blocking). No drift from the analysis or master product objective (making the editor faithfully enforce Discord's constraints).

**Verdict**: PASS

---

## Overview

This is a small, focused bug-fix plan that adds aggregate character-count validation for Components V2 Text Displays across three layers: client validation function, editor UI, and Zod schema. The plan is well-scoped, follows established patterns (mirrors `validateEmbedCharacterCount`), and directly resolves the user-reported issue. Five milestones are sequenced correctly with clear acceptance criteria per milestone.

---

## Architectural Alignment

The plan aligns well with the documented architecture:

- **Data Flow**: Validation occurs at the correct points in the data flow (editor UI for live feedback, `validateMessage()` for the send gate, Zod schema for save/import). This matches the architecture's `Load → UI state → stripKeys → API` flow.
- **Editor Pattern**: Milestone 3 correctly follows the dual-mode editor pattern — the error only appears during V2 editing mode, matching the `showEdit` / `editableState.messageMode` guard logic.
- **Zod `satisfies` Constraint**: The plan's approach is structurally compatible. Adding `.refine()` on the `components` field doesn't break the `satisfies z.ZodType<MessageData>` constraint since the output type is unchanged.

One item to verify is noted as a finding below.

---

## Scope Assessment

Appropriately scoped. Seven files touched across five milestones, all targeting the same validation gap from different angles. No scope creep — the plan doesn't attempt to change per-field validation, modify the editor's `DiscordContentEditor` per-field remaining indicator, or tackle the `description` field question.

---

## Technical Debt Risks

No new debt introduced. The plan reduces an existing validation gap (a form of correctness debt). The dual-constant approach (`MAX_TEXT_DISPLAY_CONTENT_LENGTH` + `MAX_COMPONENTS_DISPLAYABLE_TEXT`) at the same value is slightly redundant but explicitly justified and future-proofs against Discord changing either limit independently.

---

## Findings

### Critical

*None.*

### Medium

#### M1 — Zod refinement placement may break `discordMessageImportShape` inheritance
**Status**: RESOLVED
**Description**: Milestone 4 says to add `.superRefine()` to the `components` field of `discordMessageShape`. However, `discordMessageImportShape` uses `.extend()` to **replace** the `components` field entirely (with a `z.preprocess()` wrapper). In Zod, `.extend()` overrides the field definition, meaning any `.refine()` or `.superRefine()` attached to the original `components` field will be lost on the import shape.

The plan acknowledges this as a risk ("verify") but doesn't specify the corrective action. More importantly, if the refinement is placed on the individual `components` field (e.g., `components: z.array(...).max(...).refine(...)`), it will definitely be overridden by the import shape's `.extend()`. If placed as a top-level `.superRefine()` on the entire `discordMessageShape` object, it would survive `.extend()` — but this changes where the refinement lives.

**Impact**: The import path could silently accept oversize payloads, creating an inconsistency between save and import validation.
**Recommendation**: Specify that the refinement should be a **top-level** `.superRefine()` on the `discordMessageShape` object (not on the `components` field), so it is inherited by all shapes that use `.extend()`. Alternatively, explicitly state that the import shape needs its own refinement applied after the `.extend()`. The implementer should not be left to discover this at implementation time.

#### M2 — `validateMessage()` V2 guard is unspecified
**Status**: RESOLVED
**Description**: Milestone 2, Task 3 says "call the new function when V2 components are present." The current `validateMessage()` does not determine whether components are V2 — it has no V2 detection logic. The `validateContentRequirements()` function does check `hasV2` using `V2_TYPES`, but `validateMessage()` only receives the result as an error string.

The plan should specify: does the new aggregate check run unconditionally on `components` (safe — classic ActionRows have no Text Displays, so the sum would be 0), or does it need a V2 guard? Running unconditionally is simpler and correct, but the plan's wording implies a conditional check, leaving the implementer to figure out the guard.

**Impact**: Minor ambiguity. If the implementer adds a V2 guard, they'll need to duplicate the `V2_TYPES` check inside `validateMessage()`.
**Recommendation**: Specify that the aggregate check should run **unconditionally** on the components array. Classic ActionRows contain only buttons (no Text Displays), so the sum is always 0, making a V2 guard unnecessary. This is simpler and matches the `validateEmbedCharacterCount` pattern, which also runs unconditionally.

### Low

#### L1 — Architecture doc's "No test framework" entry is stale
**Status**: OPEN
**Description**: The system architecture document's Problem Areas table says "No test framework" (Medium severity). Vitest was adopted during Plan 005 — the codebase already has test files and `vitest.config.ts`. Milestone 5 of this plan correctly uses Vitest. The architecture doc is simply stale.

**Impact**: No impact on this plan. Informational only.
**Recommendation**: The architecture doc should be updated to reflect that Vitest is now in use. This is not a blocker for Plan 007, but worth noting for the next architecture review.

---

## Unresolved Open Questions

No unresolved open questions. The plan lists one open question, which is marked `[CLOSED]`.

---

## Risk Assessment

The plan's risk table covers the three correct risks. The Zod inheritance risk (Finding M1) is listed but under-specified — see recommendation above. Overall risk is **Low** given the small scope and the pattern being directly modeled on `validateEmbedCharacterCount`.

---

## Recommendations

1. ~~**Address M1**~~: RESOLVED — Plan now specifies top-level `.superRefine()` on the object with rationale.
2. ~~**Address M2**~~: RESOLVED — Plan now specifies unconditional execution with justification.
3. All findings addressed. **Plan 007 is approved for implementation handoff.**

---

## Revision History

| Revision | Date       | Findings Addressed | Outcome  |
| -------- | ---------- | ------------------ | -------- |
| R1       | 2026-04-09 | M1, M2             | Approved |
