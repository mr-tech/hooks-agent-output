---
ID: 10
Origin: 10
UUID: b7e3a41f
Status: Released
---

# UAT Report: Fix InfoPanel Overlap on Initial Load

**Plan Reference**: `agent-output/planning/010-infopanel-overlap-fix.md`
**Date**: 2026-04-12
**UAT Agent**: Product Owner (UAT)

## Changelog

| Date       | Agent Handoff | Request                                                 | Summary                                                                                                      |
| ---------- | ------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| 2026-04-12 | QA            | QA Complete, all tests pass, ready for value validation | UAT Complete — implementation delivers stated value; CSS class separation permanently eliminates overlap bug |

## Value Statement Under Test

**As a** Hooks.gg user navigating to a server where the bot is not installed, **I want** the InfoPanel invite prompt to render in its collapsed state without overlapping the message list, **so that** I can browse my messages and interact with the page immediately without needing to click the panel to fix the layout.

## UAT Scenarios

### Scenario 1: InfoPanel collapsed on initial load — no overlap

- **Given**: A user navigates to `/message/f/[guildId]` for a server where the bot is not installed
- **When**: The page loads and renders the InfoPanel in its collapsed state
- **Then**: The InfoPanel content is hidden (`display:none` via `hidden` class during SSR, then imperative `display:none` after hydration). The message list below is not overlapped by InfoPanel content.
- **Result**: PASS
- **Evidence**: [TransitionHeightElement.tsx](website/src/components/TransitionHeightElement.tsx#L80) — className includes `!isOpen && !isMounted && 'hidden'` for SSR hiding. [TransitionHeightElement.tsx](website/src/components/TransitionHeightElement.tsx#L42-L47) — `isFirstRender` branch removes `hidden`, sets imperative `display:none` + `height:0px`. No React `style` prop exists → Render 2 (`isMounted` flip) cannot wipe imperative styles. QA lifecycle Trace 1 confirms all 7 phases correct. [InfoPanel.tsx](website/src/components/InfoPanel.tsx#L72) — consumer passes `isOpen={!collapsible || isOpen}` (false when collapsible and not opened).

### Scenario 2: Send page "Edit Previous" hidden on initial load

- **Given**: A user navigates to `/message/m/[id]/send`
- **When**: The page loads with the "Edit Previous" section in its default closed state
- **Then**: The "Edit Previous" content is hidden. No visual overlap with surrounding content.
- **Result**: PASS
- **Evidence**: [send/page.tsx](website/src/app/message/m/[id]/send/page.tsx#L286-L289) — `<TransitionHeightElement isOpen={showEdit}>` with `showEdit` defaulting to false. Same lifecycle as Scenario 1 applies. QA lifecycle Trace 1 verified.

### Scenario 3: Expand/collapse cycle — smooth animation

- **Given**: The InfoPanel or Edit Previous section is in its collapsed state
- **When**: The user clicks to expand, then clicks to collapse
- **Then**: Both open and close animations are smooth CSS height transitions (not instant snap)
- **Result**: PASS
- **Evidence**: No React `style` prop → imperative `useEffect([isOpen])` has exclusive control of `display` and `height`. Opening: `display='block'`, reflow via `offsetHeight`, `height=scrollHeight` → browser transitions `height` from 0 to scrollHeight. Closing: `height='0px'` → transitions from scrollHeight to 0, `onTransitionEnd` sets `display='none'`. QA lifecycle Trace 1 steps 4-7 verified. Previous F-1 finding (animation regression from style prop competition) confirmed resolved — style prop is fully removed.

### Scenario 4: No regression to other consumers

- **Given**: Other `TransitionHeightElement` consumers exist (StyledAccordionSection, NewMessageModal, edit page, WebhookMenu)
- **When**: These consumers render with their default props
- **Then**: Accordion expand/collapse works. Modal page transitions work. Editor content is immediately visible. No regressions.
- **Result**: PASS
- **Evidence**: QA consumer verification table shows all 6 consumers verified via lifecycle trace. `isOpen=true` consumers: no `hidden` class applied (gated on `!isOpen`), no imperative styles set by `isFirstRender` (gated on `!isOpen`), content visible immediately. NewMessageModal: passes `className="relative overflow-hidden"` via consumer prop, uses default `isOpen=true` — follows Trace 2. All 296/296 tests pass including pre-existing test suites across 13 files.

### Scenario 5: SSR hydration correctness

- **Given**: Server-rendered HTML for a page with `isOpen=false`
- **When**: The page hydrates in the browser
- **Then**: Content is hidden via CSS class in server HTML (no layout shift), then control hands off to imperative code without any visible flash
- **Result**: PASS
- **Evidence**: `hidden` class is in `className` expression (line 80), gated on `!isOpen && !isMounted`. Server render: `isMounted=false` → `hidden` present → `display:none` via Tailwind CSS. Hydration effects: `isFirstRender` branch removes `hidden` class and sets imperative `display:none` before any paint. `isMounted` flip (Render 2): `hidden` not re-added (gated on `!isMounted`), no style prop → imperative values persist. No flash possible — hiding transitions from class-based to imperative within a single effect batch.

## Value Delivery Assessment

The implementation **fully delivers** the stated business value. The user-facing outcome — InfoPanel renders collapsed without overlapping the message list — is achieved through a permanent architectural fix:

1. **Root cause eliminated, not just patched**: The dual-control conflict between React's `style` prop and imperative `ref.style.*` manipulation is permanently resolved by removing the `style` prop entirely. This is not a workaround; it's a structural correction.

2. **Both primary fix targets addressed**: InfoPanel on server pages (`/message/f/[guildId]`) and "Edit Previous" on send pages (`/message/m/[id]/send`) both use `isOpen=false` on initial load and benefit from the fix.

3. **Bonus: onTransitionEnd target leak fixed**: A pre-existing bug where hovering buttons inside collapsed content could trigger `display:none` via event bubbling (F-3) was fixed as part of this work. This was not in the original value statement but improves reliability.

4. **No core value deferred**: All acceptance criteria from the plan are met. No features were cut or delayed.

5. **Risk assessment**: The fix has a clean ownership model (className pre-mount → imperative post-mount) with no timing gaps. The `overflow-hidden` clipping during animations provides defense-in-depth. The structural lifecycle trace performed by QA covers every consumer pattern and edge case. Residual risk is minimal.

## QA Integration

**QA Report Reference**: `agent-output/qa/010-infopanel-overlap-fix-qa.md`
**QA Status**: QA Complete
**QA Findings Alignment**: All 3 historical findings (F-1 animation regression, F-2 overlay persistence, F-3 onTransitionEnd target leak) were resolved in v3 and verified by QA. Code review findings (CR M-1 benign ResizeObserver behavior, CR M-2 doc test count mismatch, CR L-1 pre-existing missing deps) were assessed by QA and confirmed non-blocking. QA's lifecycle traces are thorough and independently validate the correctness claimed by the implementation doc.

## Technical Compliance

- Plan deliverables:
  - T1: Remove `getTransitionWrapperStyle` and style prop — **PASS**
  - T2: SSR hiding via `hidden` class — **PASS**
  - T3: `isFirstRender` handoff (remove `hidden`, set imperative styles) — **PASS**
  - T4: `hidden` conditional on `!isMounted` — **PASS**
  - T5: Evaluate `isMounted` necessity (kept, needed for className) — **PASS**
  - T6: `overflow-hidden` for `unmount=true` — **PASS**
  - T7: Fix `onTransitionEnd` target leak — **PASS**
- Test coverage: 296/296 tests pass (13 files). 11 source-code verification tests + 4 structural proof tests. Full existing test suite (281 tests) unaffected.
- `tsc --noEmit`: 0 errors
- Known limitations:
  - No automated browser/E2E tests for animation behavior (node-env Vitest constraint). Mitigated by structural lifecycle traces.
  - Implementation doc test count says 291 where actual is 296 (CR M-2, documentation-only).
  - ResizeObserver sets stale `display:block` (CR M-1, benign — no user impact).

## Objective Alignment Assessment

**Does code meet original plan objective?**: YES

**Evidence**:
- The plan's value statement asks for InfoPanel to render collapsed without overlapping the message list. The implementation removes the architectural root cause (React style prop → imperative style conflict) that caused the overlap. The `hidden` class hides content during SSR, the `isFirstRender` branch preserves hiding through hydration, and the absence of a React `style` prop means Render 2 (`isMounted` flip) can no longer wipe imperative styles. This directly and completely addresses the stated objective.
- All 7 success criteria from the plan are met (verified via code inspection and QA lifecycle traces).
- The fix is surgical — one component file modified, minimal blast radius, net code reduction.

**Drift Detected**: None. The implementation follows the plan's CSS class separation approach exactly as specified after the Analysis 011 revision. No scope creep, no deferred items, no features added beyond plan scope (the F-3 fix was incorporated into the plan as Task 7 before implementation began).

## UAT Status

**Status**: UAT Complete
**Rationale**: The implementation demonstrably delivers the business value stated in the plan. The InfoPanel overlap bug is eliminated through a permanent architectural fix, not a workaround. All predecessor gates passed: implementation complete (all 7 tasks), code review approved (0 blocking findings), QA complete (296/296 tests, all findings resolved, full consumer verification). No value is deferred. No objective drift.

## Release Decision

**Final Status**: APPROVED FOR RELEASE
**Rationale**: The implementation has cleared all quality gates (implementation, code review, QA, UAT) with no blocking findings. The fix is isolated to a single component (`TransitionHeightElement.tsx`) with no data model changes, no API changes, and no new dependencies. The change is a net code reduction. All 6 consumer sites verified. The three historical QA failures (F-1, F-2, F-3) are resolved. Risk is minimal given the clean ownership model and thorough lifecycle verification.
**Recommended Version**: Patch bump (bug-fix only, no new features, no breaking changes). Note: no versioning system is currently configured.
**Key Changes for Changelog**:
- Fixed InfoPanel overlapping message list on servers without the bot installed
- Fixed "Edit Previous" section overlapping content on initial load
- Fixed `onTransitionEnd` event target leak in `TransitionHeightElement` (descendant transitions no longer trigger wrapper state changes)

## Next Actions

Handing off to devops agent for release execution.
