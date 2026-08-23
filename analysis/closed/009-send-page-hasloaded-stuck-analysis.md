---
ID: 9
Origin: 9
UUID: b7e3a1f2
Status: Planned
---

# Analysis 009: Send Page Loading Dots — `hasLoaded` Stuck at `false`

## Changelog

| Date       | Author  | Change                                                    |
| ---------- | ------- | --------------------------------------------------------- |
| 2026-04-12 | Planner | Status → Planned; Plan 009 created                        |
| 2026-04-12 | Analyst | Initial analysis — root cause verified via diagnostic log |

## Value Statement and Business Objective

The send page (`/message/m/[id]/send`) becomes permanently stuck on loading dots after the user visits a folder page (`/message/f/[id]`) for the same server, until the page is hard-refreshed. This blocks the core "send message" workflow for returning users who navigate through their server's message list.

## Objective

Determine the root cause of the send page loading dots regression reported after Plan 005 deployment.

## Context

- **Reported behavior**: Navigating to a send page, then to the folder page, then back to send page (same or different message, same server) produces permanent loading dots.
- **Reported as**: Regression or continuation of Plan 005 (commit `a5004b7`).
- **Plan 005 changes to affected files**: `staleTime: Infinity` → `5 * 60 * 1000` in GuildProvider; `useParsePathname` memo deps fix from `[Object.values(state)]` to `[folderId, messageId]`.

## Methodology

1. Added diagnostic `console.log` to `useParsePathname`, `GuildProvider`, `MessageProvider`, and the send page loading guard.
2. User reproduced the bug with steps: `/message/m/110/edit` → `/message/m/110/send` → `/message/f/503782944117227531` → `/message/m/110/edit` → `/message/m/110/send` (stuck).
3. Analyzed the console log to trace state transitions.

## Findings

### Root Cause — Verified

**`GuildProvider.useUpdateEffect([paramGuildId])` calls `unsetHasLoaded()` unconditionally, but `setHasLoaded()` is only called by `useEffect([guildStatus])`, which may never re-fire.**

The complete sequence:

#### Step 1: Initial load at `/message/m/110/edit`
- `useParsePathname` → `paramGuildId: ''` (message route has no `folderId`)
- GuildProvider initializes: `guildId: ''`, `hasLoaded: true` (via `useToggleState(!guildId)` where `!'' = true`)
- MessageProvider fetches message 110, finds `guildId: '503782944117227531'`, calls `setGuildId('503782944117227531')`
- Guild query fires, resolves, `guildStatus` transitions to `'success'`, `setHasLoaded()` called
- **State**: `guildId: '503782944117227531'`, `hasLoaded: true`, `guildStatus: 'success'` ✓

#### Step 2: Navigate to `/message/m/110/send`
- `paramGuildId` still `''`, no `useUpdateEffect` trigger
- Guild data cached, `hasLoaded: true`
- **Send page renders normally** ✓

#### Step 3: Navigate to `/message/f/503782944117227531`
- `useParsePathname` → `paramGuildId: '503782944117227531'`
- **`useUpdateEffect([paramGuildId])` fires** because `paramGuildId` changed from `''` to `'503782944117227531'`
- Calls `unsetHasLoaded()` → **`hasLoaded` = `false`**
- Calls `setGuildId('503782944117227531')` → **no-op** (already that value, React skips re-render)
- Guild query key unchanged → no refetch → `guildStatus` stays `'success'`
- `useEffect([guildStatus])` does **not** fire (dependency unchanged)
- **`hasLoaded` is stuck at `false`** — no code path will set it back to `true`

#### Step 4: Navigate to `/message/m/110/edit`
- `paramGuildId` changes to `''`
- `useUpdateEffect` fires but `if (paramGuildId)` guard fails (empty string is falsy)
- `hasLoaded` remains `false`
- Edit page still renders because it doesn't gate on `hasLoaded`

#### Step 5: Navigate to `/message/m/110/send`
- `hasLoaded: false`, `isGuildLoading: false`, `isLoadingChannels: false`, `isMessageLoading: false`
- Send page guard: `if (!hasLoaded || isLoading)` → `!false` = `true` → **BLOCKED forever**
- Log confirms: `[SendPage] BLOCKED — showing LoadingDots {hasLoaded: false, isGuildLoading: false, isLoadingChannels: false, isMessageLoading: false}`

### Why This Is a Regression from Plan 005

**Verified**: Before Plan 005, `useParsePathname` had `[Object.values(state)]` as memo deps. `Object.values()` creates a new array on every render, so the memo was effectively unstable — it returned a new object every render. This caused `paramGuildId` in GuildProvider to "change" (new object identity) on every render, **but** `useUpdateEffect` compares the primitive string value, not the object, so it would still only fire on actual value changes. However, the critical difference is:

The `useParsePathname` memo fix itself is not the direct cause. The actual regression mechanism is more subtle:

**Before Plan 005**: `staleTime: Infinity` meant guild data was never stale. But the `guildStatus` behavior is the same — it stays `'success'` when cache is hit. So this bug may have existed before Plan 005 as well, but may have been masked by different navigation patterns or by the unstable memo causing extra re-renders that incidentally reset state.

**Determination**: The bug is in the `GuildProvider.useUpdateEffect` / `useEffect([guildStatus])` interaction — specifically the gap where `unsetHasLoaded()` is called but no mechanism exists to call `setHasLoaded()` when the guild data is already cached. This design defect exists independently of Plan 005, but Plan 005's `useParsePathname` memo fix may have made it more reliably reproducible by stabilizing `paramGuildId` transitions.

### System Weakness: `hasLoaded` State Machine Has No Recovery Path

The `hasLoaded` flag in GuildProvider has an asymmetric state machine:

| Transition       | Trigger                           | Condition                                        |
| ---------------- | --------------------------------- | ------------------------------------------------ |
| `true` → `false` | `useUpdateEffect([paramGuildId])` | `paramGuildId` is truthy (any folder navigation) |
| `false` → `true` | `useEffect([guildStatus])`        | `guildStatus` transitions away from `'pending'`  |
| initial value    | constructor                       | `!guildId` (true if guildId is empty)            |

The gap: when `guildId` doesn't change (same server), the query doesn't refetch, `guildStatus` doesn't transition, and `hasLoaded` cannot recover from `false`.

### Affected Components

| File                                        | Role                                      | Impact                                           |
| ------------------------------------------- | ----------------------------------------- | ------------------------------------------------ |
| `src/providers/GuildProvider.tsx` L71-97    | `useUpdateEffect` + `guildStatus` effect  | Root cause: `hasLoaded` stuck                    |
| `src/app/message/m/[id]/send/page.tsx` L111 | Loading guard `!hasLoaded \|\| isLoading` | Symptom: permanent loading dots                  |
| `src/utils/hooks/index.ts` L177-189         | `useParsePathname`                        | Supplies `paramGuildId` that triggers the effect |

### Not Affected

- The edit page (`/message/m/[id]/edit`) does not gate rendering on `hasLoaded`, so it is unaffected.
- Message loading (`isMessageLoading`) works correctly throughout.
- The folder page itself renders fine despite `hasLoaded: false` because the `guildStatus` effect eventually fires if any fetch occurs.

## Instrumentation Gaps

| Telemetry                                                                                         | Level | Purpose                                             |
| ------------------------------------------------------------------------------------------------- | ----- | --------------------------------------------------- |
| `hasLoaded` state transitions with previous value                                                 | Debug | Would immediately identify the stuck-false scenario |
| `useUpdateEffect` guard outcome (did it call `unsetHasLoaded`? was `guildId` already the target?) | Debug | Would show the no-op `setGuildId` path              |

## Analysis Recommendations

1. **Trace the `hasLoaded` state machine**: Confirm that the only two writers are `unsetHasLoaded` and `setHasLoaded` (via `useToggleState`), and that no other effect can restore it.
2. **Verify edit page independence**: Confirm the edit page has no `hasLoaded` gate that could be affected by the same bug in a different navigation pattern.
3. **Test with different servers**: Confirm the bug also occurs when navigating from folder page of server A to send page of a message belonging to server B (the log shows same-server, but the user's original report suggests cross-server behavior too).

## Open Questions

None — root cause is verified.
