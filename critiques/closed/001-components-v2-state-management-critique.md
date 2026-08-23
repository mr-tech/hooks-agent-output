---
ID: 1
Origin: 1
UUID: a3f7c9e2
Status: OPEN
---

# Critique — Plan 001: Discord Components V2 State Management

**Artifact**: [planning/001-components-v2-state-management.md](../planning/001-components-v2-state-management.md)
**Architecture findings**: [architecture/001-components-v2-architecture-findings.md](../architecture/001-components-v2-architecture-findings.md)
**Analysis**: [analysis/closed/002-embeds-components-v2-mutual-exclusivity.md](../analysis/closed/002-embeds-components-v2-mutual-exclusivity.md)
**Date**: 2026-04-03
**Revision**: Rev 4 of plan (Milestones 7–11 review)

## Changelog

| Date       | Handoff       | Request                                                                | Summary                                                                  |
| ---------- | ------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| 2026-04-01 | User → Critic | Review revised plan for clarity, completeness, architectural alignment | Initial critique. 1 critical, 2 medium, 2 low findings. 1 open question. |
| 2026-04-01 | Planner       | Revise plan per critique findings                                      | All 5 findings addressed in Plan Rev 3. All marked RESOLVED.             |
| 2026-04-03 | User → Critic | Review Rev 4 (Milestones 7–11) for clarity, completeness, alignment    | Rev 4 critique. 0 critical, 2 medium, 3 low findings. 0 open questions.  |
| 2026-04-03 | Planner       | Revise plan per Rev 4 critique findings                                | All 5 findings addressed in Plan Rev 5. All marked RESOLVED.             |

---

## Value Statement Assessment

**PASS.** Rev 4 adds a second user story for mutual exclusivity enforcement. Both stories follow the correct "As a... I want... so that..." format. The second story clearly articulates the *why*: preventing silent data loss and understanding V2 irreversibility. The expanded objective section enumerates the new scope items (mode toggle, defense-in-depth stripping) alongside the original deliverables. The Discord API constraint is documented with a source reference.

---

## Overview

Plan 001 Rev 4 extends the well-executed M1–M6 implementation with four new milestones (7–10) addressing the mutual exclusivity gap between Classic embeds/content and Components V2. The new milestones are derived from Analysis 002 and grounded in verified Discord API behavior. All three analysis open questions are resolved by the product owner with clear rationale.

The plan structure is sound: mode state (M7) → confirmation UX (M8) → irreversibility warning (M9) → defense-in-depth (M10). Each milestone has a clear objective, numbered items with acceptance criteria, and references to the analysis findings. The prior art in `embed-generator` (`EditorComponentsV2Toggle.tsx`) validates the overall UX approach.

Five findings identified, none critical. The plan is **implementable as written** — findings are refinements, not blockers.

---

## Architectural Alignment

**Well aligned.** The Rev 4 additions correctly respect:

- **Provider architecture**: `messageMode` is placed in `useEditableState()`, which feeds into `MessageProvider` state — consistent with the existing `showEmbedTools` / `showComponentsEditable` pattern
- **`ConfirmationProvider` pattern**: The project has an established `useConfirmation()` / `showConfirmation()` / `withConfirmation()` system in `src/providers/ConfirmationProvider.tsx`. Item 21's "use the project's existing dialog/modal pattern" is correct
- **`stripKeys()` as the serialization boundary**: M10 item 24 adds stripping logic at the same location that already handles `_key` removal and flag computation — consistent with ADR guidance
- **`DiscordMessageEditor` as the single rendering tree**: Mode gating in item 18 happens inside the existing component, not via a new component tree
- **Prior art**: `embed-generator`'s `EditorComponentsV2Toggle.tsx` implements a nearly identical toggle+confirm pattern, validating the UX design

---

## Scope Assessment

**Appropriately scoped.** Five milestones (7–11) for mutual exclusivity is proportional to the complexity. The plan avoids overreach:

- Mode is editor-only state, not persisted to DB (correct — `messageMode` is derived from data on load)
- No database migration
- No new npm dependencies
- No changes to the tRPC API layer

The Milestone 11 (Version Management) is lightweight — appropriate as a bookend.

---

## Technical Debt Risks

- **No new debt introduced.** The mode toggle is a net positive — it prevents the implicit mixed state that was a latent bug.
- **`useEditableState` growing complex**: Adding `messageMode` + `setMessageMode` to the already-large `EditableState` (14 booleans + 14 toggles) is acceptable for now. If the type grows further, it may warrant decomposition — but that's future debt, not introduced by this plan.
- **`embed-generator` divergence**: The workspace contains `embed-generator` which has its own V2 toggle implementation. The plan doesn't reference this prior art or consider shared patterns. This is not debt per se, but a missed learning opportunity.

---

## Findings

### Finding 1 — MEDIUM: Item 21 Reversibility Claim Is Misleading

**Status**: RESOLVED (Plan Rev 5, item 21)

**Issue**: Item 21 states the confirmation dialog should explain: *"That this action is reversible within the editor (undo by switching back before saving)"*. This is only partially true.

When switching Classic → V2, item 22 clears `content` to `''` and `embeds` to `[]`. If the user switches back to Classic before saving, the content and embeds are **gone** from editor state — there's no undo buffer. The user would need to reload the page to recover from the last saved state.

**Impact**: The dialog tells users the action is "reversible" but the data clearing is immediate and irreversible within the editor session. Users who assumed "undo" would restore their embeds will be frustrated.

**Recommendation**: Either:
- (A) Remove the reversibility claim from the dialog copy — just say "Your embeds and content will be removed"
- (B) Actually implement reversibility: stash the departing mode's data in a ref/state so switching back restores it (only within the current session, cleared on save). This adds complexity and may not be worth it for Rev 4
- (C) Reword to: "You can reload the page to recover unsaved changes" — accurate but less reassuring

Option (A) is simplest and most honest. The implementer should not promise undo behavior that doesn't exist.

---

### Finding 2 — MEDIUM: Item 17 Auto-Detect Placement Is Ambiguous

**Status**: RESOLVED (Plan Rev 5, item 17)

**Issue**: Item 17 says to auto-detect mode "when a message is loaded (via `makeEditable()` or the `MessageProvider`)." The `messageMode` state lives in `useEditableState()`, which is called inside `MessageProvider`. But `useEditableState()` currently has **no access to the message data** — it's a standalone hook that returns toggle states:

```ts
// useEditableState.ts — no message data available
export default () => {
  const [showEdit, { toggle: toggleShowEdit }] = useToggleState(true);
  // ... no message reference
};
```

Auto-detection requires knowing the message's `components` array. This means either:
- (A) `useEditableState` needs to accept message data as a parameter (breaking its current zero-argument signature)
- (B) The auto-detection logic lives in `MessageProvider/index.tsx` (where both message data and editableState are available) via a `useEffect` that calls `setMessageMode` when the message loads
- (C) A separate `useEffect` in `DiscordMessageEditor` detects and sets mode on mount

The plan should specify which approach to use so the implementer doesn't have to make an architectural decision.

**Impact**: Without guidance, the implementer may restructure `useEditableState` in a way that breaks the zero-argument pattern or introduces a dependency on `MessageProvider` internals.

**Recommendation**: Specify option (B): auto-detection happens via a `useEffect` in `MessageProvider/index.tsx` that watches the loaded message's `components` array and calls `editableState.setMessageMode()` accordingly. This keeps `useEditableState` simple and puts the detection logic where both message data and editable state converge.

---

### Finding 3 — LOW: Item 25 JSON Import Mode Detection Needs Coordination with M4's Lenient Schema

**Status**: RESOLVED (Plan Rev 5, item 25)

**Issue**: Item 25 (M10) says to auto-detect mode on JSON import in `NewMessageJsonInput.tsx` and `JsonModalBody.tsx`. But item 11 (M4 — already implemented) replaced the Zod schema in these same files with `discordMessageImportShape`, which uses `filterSupportedComponents()` to strip unsupported component types.

The order of operations matters: if `filterSupportedComponents()` strips V2 components that it doesn't recognize as "supported," then the mode detection in item 25 might see an empty components array and default to Classic. The implementer needs to understand that mode detection must happen **before or during** the lenient schema's filtering, not after.

**Impact**: Implementer could detect mode after filtering, causing incorrect mode assignment.

**Recommendation**: Add a note to item 25: mode detection should examine the raw imported data (before `filterSupportedComponents()` runs), or `filterSupportedComponents()` should preserve V2 component types it recognizes even if some unsupported types are stripped.

---

### Finding 4 — LOW: Milestone 9 PATCH Warning May Not Have Access to Mode

**Status**: RESOLVED (Plan Rev 5, item 23)

**Issue**: Item 23 checks "the current message mode is `'v2'` (or the message has V2 components)." The send page (`send/page.tsx`) imports `useMessage()` which returns the `MessageProvider` state (including `editableState`). This should work for accessing `messageMode`.

However, the parenthetical fallback — "or the message has V2 components" — is important. The send page should check the **actual message data** for V2 components (as `stripKeys()` already does), not rely solely on `messageMode`. This is because:
- `messageMode` is editor state that could desync
- The send path already calls `stripKeys()` which computes `hasV2` — this is the ground truth

**Impact**: Low — the plan already includes the fallback. This is a clarification, not a gap.

**Recommendation**: Specify that the send page should derive the V2 state from the stripped message data (same logic as `stripKeys()`'s `hasV2` check), not from `editableState.messageMode`. This is more robust and doesn't require threading editor state to the send page.

---

### Finding 5 — LOW: Missing Reference to `embed-generator` Prior Art

**Status**: RESOLVED (Plan Rev 5, M7 item 19 + handoff notes)

**Issue**: The `embed-generator` project in this workspace has [`EditorComponentsV2Toggle.tsx`](../embed-generator/embedg-app/src/components/EditorComponentsV2Toggle.tsx) — a complete implementation of a V2 toggle with confirmation modals. It uses a toggled button showing "Embeds V1" / "Components V2" labels with a confirm modal on each direction. This is exactly what Milestones 7–8 describe.

The plan doesn't reference this prior art. The implementer might spend time designing the toggle UX from scratch when a proven pattern exists in the same workspace.

**Impact**: Missed implementation efficiency. No correctness impact.

**Recommendation**: Add a note to Milestone 7 referencing `embed-generator`'s `EditorComponentsV2Toggle.tsx` as prior art for the toggle UX pattern. The Hooks.gg implementation should use `react-aria` and `ConfirmationProvider` instead of `embed-generator`'s bare `ConfirmModal`, but the visual pattern (two-segment toggle button) is directly applicable.

---

## Unresolved Open Questions

None. All open questions from Analysis 002 are marked `[RESOLVED]` with clear product owner decisions.

---

## Risk Assessment

The risks table in Rev 4 is well-maintained with 4 new rows for mutual exclusivity concerns. Observations:

1. The "User accidentally converts live Discord message to V2 (irreversible)" risk correctly identifies PATCH as the trigger and the persistent warning as mitigation. This is the highest-impact new risk and is adequately addressed.

2. The "Mode toggle clears user data unexpectedly" risk mitigation references the confirmation dialog — but per Finding 1, the dialog's reversibility claim is misleading. If the dialog says "reversible" but data is actually cleared, the mitigation is weaker than stated.

3. No missing risks identified. The defense-in-depth approach (UI enforcement + `stripKeys()` stripping + `validateMessage()` check) provides three independent layers, reducing single-point-of-failure risk.

---

## Recommendations

1. **[MEDIUM]** Remove or reword the reversibility claim in item 21's confirmation dialog (Finding 1). Recommend option (A): just say the data will be removed, don't promise undo.

2. **[MEDIUM]** Specify the auto-detection placement in item 17 (Finding 2). Recommend: `useEffect` in `MessageProvider/index.tsx` watching loaded message data, calling `setMessageMode()`.

3. **[LOW]** Add note to item 25 about mode detection ordering relative to `filterSupportedComponents()` (Finding 3).

4. **[LOW]** Clarify item 23 to derive V2 state from message data, not `messageMode` (Finding 4).

5. **[LOW]** Reference `embed-generator`'s `EditorComponentsV2Toggle.tsx` as prior art in M7 (Finding 5).

---

## Hotfix Assessment

**"How will this plan result in a hotfix after deployment?"**

The most likely hotfix scenario: the PATCH warning in Milestone 9 is bypassed or incorrect, causing a user to unknowingly convert a live Classic Discord message to V2 permanently. Mitigation is strong (persistent warning + defense-in-depth stripping), but the warning copy must be precise and visible. The irreversibility of the V2 flag is the single hardest-to-fix production issue.

Secondary scenario: mode detection on load (item 17) assigns the wrong mode for an edge case (e.g., a message with only legacy ActionRows and no V2 components gets incorrectly assigned V2 mode). This is protected by the plan's explicit "type 1 does NOT trigger V2 mode" rule, but needs test coverage.

Neither scenario is likely given the defense-in-depth layers. The plan's three-layer approach (UI → validation → serialization) means no single bug causes silent data loss.

---

## Revision History

| Date       | Rev | Summary                                                                                          |
| ---------- | --- | ------------------------------------------------------------------------------------------------ |
| 2026-04-01 | 3   | All 5 initial critique findings addressed. See plan changelog Rev 3.                             |
| 2026-04-03 | 4   | Rev 4 critique. 0 critical, 2 medium, 3 low findings. Plan is implementable. See findings above. |
| 2026-04-03 | 5   | All 5 Rev 4 critique findings addressed in Plan Rev 5. All marked RESOLVED.                      |
