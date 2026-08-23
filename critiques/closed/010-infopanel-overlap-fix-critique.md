---
ID: 10
Origin: 10
UUID: b7e3a41f
Status: RESOLVED
---

# Critique — Plan 010: Fix InfoPanel Overlap on Initial Load (Bot Not in Server)

## Artifact

`agent-output/planning/010-infopanel-overlap-fix.md`

## Analysis

`agent-output/analysis/closed/010-infopanel-overlap-on-initial-load-analysis.md`

## Date

2026-04-12

## Revision

Initial

## Changelog

| Date       | Handoff      | Request                                  | Summary                                          |
| ---------- | ------------ | ---------------------------------------- | ------------------------------------------------ |
| 2026-04-12 | From Planner | Address critique findings in Plan 010    | All 4 findings resolved; plan revised            |
| 2026-04-12 | From User    | Confirm Edit Previous also affected      | M-1 confirmed; escalated to plan update needed   |
| 2026-04-12 | From Planner | Review Plan 010 for clarity/completeness | Initial critique created                         |

---

## Value Statement Assessment

**PASS.** The user story is well-formed with clear actor ("Hooks.gg user navigating to a server where the bot is not installed"), action ("the InfoPanel invite prompt to render in its collapsed state without overlapping"), and value ("browse my messages and interact with the page immediately"). This directly aligns with the master product objective — the InfoPanel overlap blocks the bot-invite conversion funnel.

---

## Overview

Plan 010 addresses a deterministic client-side rendering bug in `TransitionHeightElement.tsx` where content remains visually overlapping siblings when mounted with `isOpen=false`. The analysis (010) thoroughly verified the root cause via static code trace. The plan correctly scopes the fix to a single shared component, identifies all 6 consumer sites, and provides a clean rollback path.

This is a well-scoped bug fix plan. The findings below are minor refinements, not blockers.

---

## Architectural Alignment

**PASS.** The fix targets a shared UI primitive (`TransitionHeightElement`), consistent with the codebase's pattern of shared components under `src/components/`. The plan correctly avoids page-level workarounds in favor of fixing the root component. No Provider patterns, data flow, or editor architecture are affected. The fix is purely CSS/DOM lifecycle — orthogonal to all backend systems.

---

## Scope Assessment

**Appropriate.** Single file change (`TransitionHeightElement.tsx`), 6 consumer verification sites, no API/data changes. This is the minimum viable scope for the bug. The plan does not over-extend.

---

## Technical Debt Risks

**Low.** Fixing the state management gap in `TransitionHeightElement` reduces existing technical debt (the component currently has an undocumented failure mode). No new debt is introduced. The plan correctly flags that the `isFirstRender` guard may become unnecessary after the fix, allowing optional simplification.

---

## Unresolved Open Questions

None. The plan states "None — root cause is verified through static code trace in Analysis 010." This is accurate — the analysis is thorough and the lifecycle trace is deterministic.

---

## Findings

### Medium

#### M-1: Send page "Edit Previous" section is a confirmed instance of the same bug — plan underweights its risk

**Status**: RESOLVED — **User confirmed affected**. Plan revised: added Success Criterion for Edit Previous initial-load state, escalated consumer table risk to "High — confirmed affected", Task 4 now verifies initial-load overlap.

**Description**: The consumer table rates the send page edit section (`TransitionHeightElement` with `isOpen={showEdit}` starting as `false`) as "Medium — same pattern as InfoPanel." However, the plan's Milestone 2 verification tasks (Task 4) only ask to verify expand/collapse *works*, not to verify the initial-closed state doesn't overlap. This is the exact same bug path as the InfoPanel: `isOpen=false`, `unmount=true`. The analysis even notes this in its recommendations ("that one likely works because it's inside a `ContainerSection` that provides its own margin separation") — but that reasoning is speculative and untested.

**Impact**: **Confirmed.** The user has verified that the "Edit Previous" section also visually overlaps on initial load. The `ContainerSection` margin separation does not prevent the bug. The plan must add this as a second affected surface in the Success Criteria and ensure the verification task covers initial-load state.

**Recommendation**: 
1. Add a Success Criterion: "Navigating to a send page renders the 'Edit Previous' section hidden on initial load — no visual overlap with surrounding content."
2. Milestone 2, Task 4 should explicitly verify that the "Edit Previous" section does **not** show overlapping content on initial page load (before any user interaction), not just that expand/collapse works after clicking.
3. Update the consumer table risk for send page edit section from "Medium" to "High — **confirmed affected**".

---

#### M-2: Three solution approaches listed without guidance on preferred approach or trade-offs

**Status**: RESOLVED — Plan revised with preferred approach guidance.

**Description**: Milestone 1, Task 1 lists three possible fix approaches:
1. Adjusting the inline style condition to retain `{ display: 'none' }` when `!isOpen && unmount`
2. Ensuring the `useEffect` properly initializes the closed state on first render
3. Applying `overflow-hidden` unconditionally when `isOpen=false`

The plan defers the choice to the implementer ("the implementer should determine the cleanest approach") without discussing trade-offs between them. While respecting the WHAT/WHY boundary, the plan should provide enough context for the implementer to make an informed choice efficiently.

**Impact**: The implementer may spend time evaluating approaches that the analysis already has enough information to narrow. Approach (2) interacts with the `isFirstRender` guard and may introduce animation on mount. Approach (3) changes behavior for `unmount=true` sites that currently rely on `display:none`. Approach (1) is the most surgical — it targets the exact gap identified in the analysis (Issue 3) without affecting any other code path.

**Recommendation**: Add a brief note that approach (1) — adjusting the inline style condition — is the most targeted fix because it addresses the exact lifecycle gap (the `isMounted` flip removing the inline style without regard for `isOpen`), while approaches (2) and (3) have wider blast radius. The implementer still has discretion, but starts with the analysis team's informed perspective.

---

### Low

#### L-1: `NewMessageModal` consumer characterization is slightly imprecise

**Status**: RESOLVED — Consumer table updated to "default (`true`)" and "starts open, unaffected by bug".

**Description**: The consumer table says NewMessageModal uses `unmount: "Not specified"`. Looking at the code, `NewMessageModal` does not pass `unmount` as a prop to `TransitionHeightElement`, so it gets the default `unmount=true`. The "Not specified" phrasing could mislead the implementer into thinking it uses a non-default value. Additionally, the modal's `TransitionHeightElement` starts with `isOpen=true` (default), which means it's **not affected by this bug** regardless — the bug only manifests when `isOpen=false` on mount.

**Impact**: Minor — cosmetic clarity issue in the consumer table. No functional risk since the modal starts open.

**Recommendation**: Change `unmount` column for NewMessageModal from "Not specified" to "default (`true`)" and add a note that its `isOpen` defaults to `true` so it is unaffected by this bug path.

---

#### L-2: Missing acceptance criterion for SSR/hydration behavior

**Status**: RESOLVED — SSR acceptance criterion added to both Success Criteria and Milestone 1 Acceptance Criteria.

**Description**: Assumption 3 states "The `isMounted` mechanism exists for SSR hydration safety. The fix must not break SSR behavior." However, the Success Criteria and Acceptance Criteria sections don't include any SSR-related verification. The inline style condition (`isMounted || isOpen ? undefined : { height: 0, display: 'none' }`) is specifically designed for SSR — it ensures content is hidden in the server-rendered HTML before JS hydrates.

**Impact**: Low — the current pages using InfoPanel are `'use client'` components, so SSR is minimal. But `TransitionHeightElement` is a shared component that could be used in SSR contexts.

**Recommendation**: Add an acceptance criterion: "Server-rendered HTML with `isOpen=false` still includes `display: none` inline style (no regression in the pre-hydration hidden state)."

---

## Questions

1. ~~Has the send page "Edit Previous" overlap been visually confirmed as not-a-problem, or is the "margin separation" reasoning from the analysis purely speculative?~~ **ANSWERED** (2026-04-12): User confirmed the Edit Previous section is also affected. The margin separation reasoning from Analysis 010 was incorrect.

---

## Risk Assessment

**Overall**: **Low risk.** This is a well-scoped, single-file bug fix with clear root cause analysis and minimal blast radius. The findings are refinements to improve implementer clarity, not structural concerns.

| Risk Area                | Level    | Notes                                                    |
| ------------------------ | -------- | -------------------------------------------------------- |
| Scope creep              | None     | Single file, no feature additions                        |
| Architectural drift      | None     | Fixes existing component, consistent with patterns       |
| Technical debt           | Positive | Reduces existing undocumented failure mode               |
| Regression               | Low      | 6 consumer sites identified and verification planned     |
| Implementation ambiguity | Medium   | Three approaches listed without trade-off guidance (M-2) |

---

## Recommendations

1. **Address M-2**: Add brief trade-off guidance for the three fix approaches — the analysis already has the information to inform this.
2. **Address M-1**: Strengthen the "Edit Previous" verification task to check initial-load state, not just expand/collapse.
3. **Consider L-2**: Add SSR acceptance criterion for completeness, especially since the component is shared.
4. **Consider L-1**: Correct the NewMessageModal row in the consumer table for precision.

---

## Revision History

| Date       | Revision | Findings                                | Status   |
| ---------- | -------- | --------------------------------------- | -------- |
| 2026-04-12 | Final    | All 4 findings resolved in plan update  | RESOLVED |
| 2026-04-12 | Update 1 | M-1 confirmed by user; escalated        | OPEN     |
| 2026-04-12 | Initial  | 2 Medium (M-1, M-2), 2 Low (L-1, L-2)  | OPEN     |
