---
ID: 9
Origin: 9
UUID: b7e3a1f2
Status: Released
Target Release: N/A (bug-fix, no versioning configured)
Epic Alignment: Send page navigation reliability
---

# Plan 009 — Fix Send Page Loading Dots After Folder Navigation

## Changelog

| Date       | Change                                                               |
| ---------- | -------------------------------------------------------------------- |
| 2026-04-12 | Committed locally for release (d9a6335)                              |
| 2026-04-12 | UAT Approved — all scenarios pass, approved for release              |
| 2026-04-12 | QA Complete — 281/281 tests pass, all acceptance criteria met        |
| 2026-04-12 | Code Review Approved — 0 critical, 0 medium, ready for QA            |
| 2026-04-12 | Initial plan created from Analysis 009. Root cause verified via log. |

## Value Statement and Business Objective

**As a** Hooks.gg user, **I want** the send page to load reliably after navigating through my server's message list, **so that** I can send messages without being forced to hard-refresh the page.

## Success Criteria

- Navigating `/message/m/[id]/send` → `/message/f/[guildId]` → `/message/m/[id]/send` (same message, same server) renders the send page without loading dots
- Navigating `/message/m/[id]/send` → `/message/f/[guildId]` → `/message/m/[other-id]/send` (different message, same server) renders the send page without loading dots
- Navigating `/message/m/[id]/send` → `/message/f/[guildIdA]` → `/message/m/[id-in-guildB]/send` (different server) renders the send page without loading dots
- Existing guild loading behavior is preserved: navigating to a folder page for a new/different server still triggers guild data fetch and shows loading state while fetching
- No regressions in the edit page, folder page, or initial page load

## Assumptions

1. The `useUpdateEffect([paramGuildId])` in GuildProvider exists to handle the case where the user navigates to a new folder/server and guild data needs to be (re)fetched. The `unsetHasLoaded()` call was intended to show a loading state while the new guild loads.
2. The `guildStatus` effect is the sole mechanism for restoring `hasLoaded` to `true`, and it depends on a `guildStatus` transition (which requires a query key change or refetch).
3. The fix should preserve the loading behavior for actual guild changes (navigating between servers), while avoiding the stuck state for same-server navigations.

## Open Questions

None — root cause is verified via diagnostic logging.

---

## Plan

### Milestone 1: Fix `hasLoaded` State Machine in GuildProvider

**Objective**: Prevent `unsetHasLoaded()` from being called when `guildId` is already set to the target value, since no query transition will occur to restore it.

**Affected file**: `src/providers/GuildProvider.tsx`

**Tasks**:

1. **Guard `unsetHasLoaded()` in the `useUpdateEffect([paramGuildId])` callback**: Only call `unsetHasLoaded()` when `paramGuildId` differs from the current `guildId`. When they are the same value, `setGuildId()` is a no-op and no query will fire, so `hasLoaded` must not be set to `false`. The implementer should compare `paramGuildId` against the current `guildId` value (accessed via a ref or the state setter's callback form) to decide whether to call `unsetHasLoaded()`.

2. **Verify `guildStatus` recovery path is unchanged**: The `useEffect([guildStatus])` that calls `setHasLoaded()` when status is not `'pending'` must remain intact and unchanged. The fix should only prevent the unnecessary `unsetHasLoaded()` call.

**Acceptance Criteria**:
- When `paramGuildId` changes to a value that is already the current `guildId`, `hasLoaded` is NOT set to `false`
- When `paramGuildId` changes to a genuinely new guild ID, `unsetHasLoaded()` IS called and loading state shows until the new guild loads
- The `guildStatus` effect continues to set `hasLoaded` to `true` on query completion

### Milestone 2: Remove Diagnostic Logging

**Objective**: Remove all `console.log`/`console.warn` instrumentation added during the investigation. These were never intended for production.

**Affected files** (4 files, all in `website/src/`):

1. `providers/GuildProvider.tsx` — Remove 4 `console.log` statements:
   - `[GuildProvider] render` (L71-73)
   - `[GuildProvider] useUpdateEffect paramGuildId changed` (L76-78)
   - `[GuildProvider] guildStatus effect` (L97)
   - `[GuildProvider] state computed` (L126-133)

2. `providers/MessageProvider/index.tsx` — Remove 2 `console.log` statements:
   - `[MessageProvider] setGuildId effect` (L155-158)
   - `[MessageProvider] state computed` (L283-290)

3. `app/message/m/[id]/send/page.tsx` — Remove 2 statements:
   - `[SendPage] loading check` (L111-114)
   - `[SendPage] BLOCKED` (L116-118)

4. `utils/hooks/index.ts` — Remove 1 `console.log`:
   - `[useParsePathname]` (L186)

5. `server/auth.ts` — Remove `debug: true` and the entire `logger: { ... }` block (lines 169-190). Restore the `// debug: true,` comment that was there originally.

**Acceptance Criteria**:
- Zero `console.log`/`console.warn` statements containing `[SendPage]`, `[GuildProvider]`, `[MessageProvider]`, or `[useParsePathname]` remain in the codebase
- NextAuth `debug` mode is disabled (commented out as it was before investigation)
- NextAuth custom file-based `logger` block is fully removed

### Milestone 3: Version Management

N/A — No versioning system configured. No CHANGELOG, no package.json version field, no git tags.

---

## Testing Strategy

- **Unit/integration**: Existing tests (209/209) must continue to pass
- **Manual regression**: The exact navigation sequences from the user's bug report should be tested — these are the acceptance criteria from the Success Criteria section above
- **Critical scenario**: The key scenario is same-server folder→send navigation. The fix must NOT break different-server transitions (where `hasLoaded` legitimately needs to reset)

## Risks

| Risk                                                          | Likelihood | Impact                                 | Mitigation                                                                                                              |
| ------------------------------------------------------------- | ---------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Fix introduces stale `hasLoaded: true` when switching servers | Low        | Medium — loading flash or missing data | The guard specifically checks if `guildId` is changing; different-server transitions will still call `unsetHasLoaded()` |
| Removing logging removes future debuggability                 | Low        | Low                                    | The root cause is now understood and documented in Analysis 009. Logging can be re-added if needed                      |

## Validation

- Run `tsc --noEmit` — 0 errors
- Run full test suite — 209/209 pass
- Manual test the 3 navigation sequences from Success Criteria

## Rollback

Single commit, clean revert with `git revert`.

## Handoff Notes

- This is a 1-file functional fix (GuildProvider.tsx) + 5-file cleanup (logging removal)
- The fix is in the `useUpdateEffect` callback, approximately lines 76-84 of GuildProvider.tsx
- The implementer should use a ref or setter callback to access the current `guildId` for comparison, since the closure may capture a stale value
- Analysis 009 documents the full state machine and the exact log trace
