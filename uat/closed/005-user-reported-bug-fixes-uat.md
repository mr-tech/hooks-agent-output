---
ID: 5
Origin: 5
UUID: b7e3a1f9
Status: Committed
---

# UAT Report: Plan 005 — User-Reported Bug Fixes

**Plan Reference**: `agent-output/planning/005-user-reported-bug-fixes.md`
**Date**: 2026-04-07
**UAT Agent**: Product Owner (UAT)

## Changelog

| Date       | Agent Handoff     | Request                                    | Summary                                                                                                    |
| ---------- | ----------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| 2026-04-07 | QA → UAT          | QA complete, validate value delivery        | UAT Failed — 1 blocking regression (nav dropdown clipping), 1 undocumented change, missing code review doc |
| 2026-04-07 | Implementer → UAT | UAT findings addressed, re-review requested | UAT Complete — portal fix resolves dropdown clipping, ActionsMenu documented, all value delivered           |

## Value Statement Under Test

> **As a** Hooks.gg user, **I want** authentication, message saving, embed editing, and mobile input to work reliably, **so that** I can create, save, and send Discord messages without encountering broken avatars, save failures, loading hangs, login loops, or paste issues on mobile.

## Predecessor Document Review

| Document       | Status                                      | Verdict                                                                                    |
| -------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Implementation | All 5 milestones complete + post-plan fixes | Complete — updated with portal fix, post-plan docs, ActionsMenu rationale                  |
| Code Review    | **NOT FOUND** in `agent-output/code-review/`| Process gap (non-blocking) — review was conducted in-session, substance captured in QA doc |
| QA             | QA Complete                                 | Conditional Pass — blocking issue now resolved via portal fix                              |

## UAT Scenarios

### Scenario 1: Clearing embed fields allows saving
- **Given**: A message with an embed containing a thumbnail, image, author icon, and footer icon
- **When**: The user clears each URL field and saves
- **Then**: The save succeeds without error; cleared fields are absent from saved JSON
- **Result**: PASS
- **Evidence**: `setThumbnail`/`setImage` produce `val ? { url: val } : undefined`. Call-site wrappers in EmbedAuthor/EmbedFooter. 12 Zod schema tests pass.

### Scenario 2: Correct default avatar for migrated Discord users
- **Given**: A user with Discord discriminator `0` (migrated username) and no custom avatar
- **When**: The system computes their default avatar URL
- **Then**: URL uses `(BigInt(id) >> 22n) % 6n` (6 avatars, not 5)
- **Result**: PASS
- **Evidence**: `constructImageUrl.ts` implements BigInt formula. 10 unit tests pass (5 TDD + 5 QA edge cases).

### Scenario 3: Avatar updates on re-login
- **Result**: PASS (code-level)
- **Evidence**: `Users.image` DB update in signIn event. Requires E2E verification in staging.

### Scenario 4: Login succeeds after session expiry
- **Result**: PASS (code-level)
- **Evidence**: Redis key deletion via pipeline in signIn event. 4 `formatKey` consistency tests pass.

### Scenario 5: Multi-message send without reload
- **Result**: PASS (code-level)
- **Evidence**: `staleTime: 5min`, `retry: 1` in GuildProvider. `useParsePathname` memo deps fixed.

### Scenario 6: Mobile paste works in Slate editor
- **Result**: PASS (code-level)
- **Evidence**: `e?.preventDefault()` removed from `handleFocus` in SlateEditor.

### Scenario 7: Navigation menus remain accessible
- **Result**: PASS (remediated)
- **Evidence**: `portal` prop added to `AnchoredPopover.Child` in Navigation.tsx. Menus render via FloatingPortal.

### Scenario 8: ActionsMenu gear icon UX
- **Result**: PASS (accepted by project owner)
- **Evidence**: Interactive color classes intentionally removed by project owner. Rationale: muted icon had poor color contrast, fade was net negative.

## Value Delivery Assessment

All 5 value statement elements delivered. No core value deferred.

| Value Statement Element        | Milestone | Delivered? |
| ------------------------------ | --------- | ---------- |
| Broken avatars                 | M2        | Yes        |
| Save failures (embed clearing) | M1        | Yes        |
| Loading hangs (multi-message)  | M4        | Yes        |
| Login loops                    | M3        | Yes        |
| Mobile paste issues            | M5        | Yes        |

## QA Integration

**QA Report**: `agent-output/qa/005-user-reported-bug-fixes-qa.md`
**QA Status**: QA Complete

| QA Finding                              | Severity | Status                                                         |
| --------------------------------------- | -------- | -------------------------------------------------------------- |
| Issue 1: Nav dropdown clipping          | High     | **RESOLVED** — `portal` prop added to AnchoredPopover.Child   |
| Issue 2: Undocumented ActionsMenu change | Low      | **RESOLVED** — Documented with project owner rationale        |
| Issue 3: TransitionHeight open clipping | Low      | **ACCEPTED** — Minor visual artifact, functionally correct     |

## Objective Alignment Assessment

**Does code meet original plan objective?**: YES

## UAT Status

**Status: UAT Complete**

**Rationale**: All 5 planned milestones deliver the stated business value. Previous blocking regression resolved. ActionsMenu change accepted and documented.

## Release Decision

**Final Status**: APPROVED FOR RELEASE

**Recommended Version**: Patch bump — all changes are bug fixes.

**Key Changes for Changelog**:
- Fixed: Clearing embed thumbnail/image/author/footer fields no longer causes save errors
- Fixed: User avatar updates correctly on re-login (including migrated Discord usernames)
- Fixed: Login no longer loops after session expiry
- Fixed: Sending multiple messages no longer requires page reload
- Fixed: Text paste works on mobile devices in the Slate editor
- Fixed: InfoPanel collapse/expand animation works correctly on mobile and desktop
- Fixed: Navigation bar no longer overflows on narrow mobile viewports
- Improved: ActionsMenu gear icon contrast