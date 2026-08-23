---
ID: 4
Origin: 4
UUID: a7c3e1f9
Status: RESOLVED
---

# Critique — Plan 004: Lazy Loading & Preload Overhaul (v3)

**Artifact**: [planning/004-lazy-loading-preload-overhaul.md](../planning/004-lazy-loading-preload-overhaul.md)
**Analysis**: [analysis/closed/004-lazy-loading-technical-analysis.md](../analysis/closed/004-lazy-loading-technical-analysis.md)
**Date**: 2026-04-06
**Revision**: Initial review of v3

## Changelog

| Date       | Handoff | Request                             | Summary                                     |
| ---------- | ------- | ----------------------------------- | ------------------------------------------- |
| 2026-04-06 | User    | Resolve findings, revise plan to v4 | All 4 findings resolved in Plan 004 v4      |
| 2026-04-06 | User    | Review v3 of Plan 004               | Initial critique — 2 medium, 2 low findings |

---

## Value Statement Assessment

**PASS.** The user story is clear, specific, and directly tied to a real UX problem. "So that the editing experience feels responsive and interactions never leave me staring at a blank space or broken layout" — this is testable and measurable. No drift from the master product objective.

---

## Overview

Plan 004 v3 is a significant improvement over v2. Removing the custom `lazyWithPreload` utility, the Suspense boundary milestone, and the `dynamics/` refactoring milestone was the correct call — the analysis proved these were unnecessary. The plan is now focused, idiomatic, and proportional to the problem.

The 4-milestone structure is well-ordered: route-level preloading first (highest impact, replaces the hack), then interaction-hint preloading (fixes the primary UX pain point), then flatten the chain (eliminates the waterfall), then cleanup (verification). Each milestone builds on the previous and could be shipped independently.

The core approach — bare `import()` in `useEffect` for preloading, staying on `next/dynamic` — is sound and grounded in verified analysis findings.

---

## Architectural Alignment

**ALIGNED.** The plan stays within existing architectural boundaries:
- No new utilities, packages, or abstractions
- `dynamics/` barrel exports untouched
- `next/dynamic` usage preserved (no migration to `React.lazy`)
- Provider boundaries unchanged
- No API or server-side changes

The "Superseded Architecture Review Items" table correctly documents how v3 relates to the now-partially-stale architecture findings doc. RC-3 (bundle impact) and RC-6 (`useEffect`-only preloading) are properly retained.

---

## Scope Assessment

**Appropriately scoped.** The plan targets ~3 files for meaningful changes (`edit/page.tsx`, `EmojiPicker/Root.tsx`, `EmojiPicker/index.tsx`) plus cleanup. This is proportional to a ~50-line net change. The out-of-scope list is explicit and reasonable.

---

## Technical Debt Risks

**LOW.** The plan removes technical debt (the `PreloadComponents` hack, the `setTimeout` hack, the double-lazy chain) without introducing new debt. Bare `import()` is as standard as it gets. No internal API reliance in the recommended path.

---

## Findings

### M-1: Incomplete Chunk Coverage — ColorPicker and Drawer Dropped Without Acknowledgment

**Status**: RESOLVED (Plan 004 v4)
**Severity**: Medium

The current `PreloadComponents` in `edit/page.tsx` preloads **8 distinct components**:

| Component              | Import path in PreloadComponents                                              |
| ---------------------- | ----------------------------------------------------------------------------- |
| EmbedTitle             | `~/components/DiscordMessageEditor/components/EmbedEditor/EmbedTitle`         |
| **ColorPicker/Picker** | `~/components/DiscordMessageEditor/components/EmbedEditor/ColorPicker/Picker` |
| **Drawer**             | `~/components/Drawer`                                                         |
| SlateEditor            | `~/components/SlateEditor`                                                    |
| Markdown               | `~/components/Markdown`                                                       |
| Calendar               | (rendered directly as `<Calendar ... />`)                                     |
| ImageUploader          | `~/components/ImageUploader`                                                  |
| Tooltip                | `~/components/Tooltip`                                                        |

The plan's Milestone 1 illustrative preload list covers:
- **Critical**: DiscordMessageEditor (new), SlateEditor, Markdown, Tooltip
- **Secondary**: EmojiPicker/Picker (new), Calendar, ImageUploader

**Missing from both lists**: ColorPicker/Picker and Drawer. EmbedTitle is acceptably dropped (it was only present to force SlateEditor's chunk; direct `import()` on SlateEditor makes it redundant).

Meanwhile, Milestone 1's acceptance criteria states: *"All chunks previously preloaded by `PreloadComponents` are now preloaded via `import()` in `useEffect`"*

This is a contradiction — the acceptance criteria promises full coverage, but the illustrative code drops two components.

**Impact**: ColorPicker is triggered when a user clicks the color swatch on an embed — it's interaction-driven and could flash `null` on first click, the exact UX the plan aims to fix. Drawer is mobile-only and possibly lightweight, but was explicitly preloaded before.

**Recommendation**: Either:
1. Add `ColorPicker/Picker` and `Drawer` to the secondary preload list, OR
2. Explicitly note they are intentionally dropped (with reasoning) and revise the acceptance criteria to say "All **critical** chunks previously preloaded..." or list the specific exclusions.

For ColorPicker specifically, Milestone 2's note about "other interaction-triggered components" should explicitly mention it — it's the same pattern as EmojiPicker (user clicks a trigger, heavy component appears in a popover).

---

### M-2: "Picker" Ambiguity — ColorPicker/Picker vs. EmojiPicker/Picker

**Status**: RESOLVED (Plan 004 v4)
**Severity**: Medium

The existing `edit/page.tsx` has this import at line 36:
```ts
const Picker = dynamic(() => import('~/components/DiscordMessageEditor/components/EmbedEditor/ColorPicker/Picker'), ...);
```

This is the **ColorPicker** — used in `PreloadComponents` as `<Picker initColor={0} setColor={() => {}} />`.

The plan's illustrative code in Milestone 1 lists:
```ts
import('~/components/EmojiPicker/Picker');
```

This is the **EmojiPicker** — a completely different component.

The plan never mentions the ColorPicker/Picker by its full name. An implementer reading the plan and cross-referencing against `edit/page.tsx` would see the existing `Picker` import (ColorPicker) and the plan's `Picker` reference (EmojiPicker) and could easily confuse them or assume the plan covers the ColorPicker when it doesn't.

**Impact**: Implementer may drop ColorPicker preloading without realizing it, or may preload the wrong Picker.

**Recommendation**: Use fully qualified names in the plan when referring to these components. E.g., "EmojiPicker's `Picker`" vs. "ColorPicker's `Picker`" — or use the full import paths in the illustrative code comments.

---

### L-1: Import Path Guidance Only References `dynamics/` — Not All Preloaded Components Have Barrel Entries

**Status**: RESOLVED (Plan 004 v4)
**Severity**: Low

Milestone 1's note says: *"The exact import paths must match the same module specifiers used inside the existing `next/dynamic(() => import(...))` calls in `dynamics/` files, so that webpack resolves them to the same chunk."*

But several components preloaded by `PreloadComponents` (EmojiPicker/Picker, ColorPicker/Picker, Drawer, EmbedTitle) do NOT have entries in `dynamics/`. Their `next/dynamic` declarations are inline in `edit/page.tsx` or `EmojiPicker/Root.tsx`.

**Impact**: Low — the implementer can figure this out. But the guidance as written could lead to confusion ("there's no `dynamics/` file for Picker — which path do I use?").

**Recommendation**: Expand the note to say: "For components in `dynamics/`, match the `dynamics/` file's import path. For components with inline `next/dynamic` declarations (e.g., `EmojiPicker/Root.tsx`'s Picker, `edit/page.tsx`'s ColorPicker), use the same module specifier from that inline declaration."

---

### L-2: Architecture Findings Doc (004) Is Stale — RC-1 Still Listed as BLOCKING

**Status**: RESOLVED (stale notice added to arch doc)

The architecture findings doc at [architecture/004-lazy-loading-architecture-findings.md](../architecture/004-lazy-loading-architecture-findings.md) still has Status: Active, verdict "APPROVED_WITH_CHANGES," and RC-1 marked as BLOCKING ("React.lazy does NOT support SSR"). The analysis verified this was incorrect for React 19.

The plan handles this well via the "Superseded Architecture Review Items" table — so an implementer reading the plan won't be misled. But the architecture doc itself is now misleading if read in isolation.

**Impact**: Low — anyone reading the plan gets the correct picture. The stale arch doc is a housekeeping issue.

**Recommendation**: Update or close the architecture findings doc. At minimum, add a note to the top: "Superseded by Plan 004 v3 and Analysis 004. RC-1 retracted."

---

## Unresolved Open Questions

**None.** All 4 findings (M-1, M-2, L-1, L-2) resolved in Plan 004 v4.

---

## Risk Assessment

The risk table is accurate and well-calibrated. The top risk (bare `import()` resolving to a different chunk) is correctly flagged as Low likelihood — webpack's module identity is based on the resolved file path, and `~/components/X` resolves to the same file regardless of where the `import()` call appears.

*The pre-change baseline note from the original critique has been addressed: Milestone 1 Task 1 now captures the `pnpm analyze` baseline before any changes begin.*

---

## Recommendations

All findings resolved in v4. Plan is ready for implementation handoff.

---

## Revision History

| Date       | Revision | Summary                                                                              |
| ---------- | -------- | ------------------------------------------------------------------------------------ |
| 2026-04-06 | v2       | All 4 findings resolved in Plan 004 v4. Critique closed.                             |
| 2026-04-06 | Initial  | First review of v3. 2 medium, 2 low findings. No critical issues. No open questions. |
