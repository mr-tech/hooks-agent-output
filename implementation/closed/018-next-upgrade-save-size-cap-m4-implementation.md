---
ID: 018
Origin: 018
UUID: 6273a762
Status: Released
Status-Detail: "Released: website master moved 7923a1d to d1bb9b0 at 2026-11-20T08:07:52Z on the owner's release approval (deployment/closed/018-next-upgrade-save-size-cap-deployment.md). M4 (the record's Next 16.1.6 ties re-verified at 16.4.6): instruments run at 969d92a, no code; UAT's walks B-3 executed, R3 and R6 carried to the architect."
Handoff-At: 969d92a — repos=website; M4 reads and tests only, no commit in website
---

# Implementation 018 — M4: behaviour the record ties to Next 16.1.6, re-verified at 16.4.6

## Plan Reference

`agent-output/planning/018-next-upgrade-save-size-cap.md` revision 7, milestone M4 (M4-a to M4-c; "No code is expected"). QA Phase 1 names the tests and the walks (`qa/018-next-upgrade-save-size-cap-qa.md`, "Acceptance Criteria", M4; walk B-3).
Chain branch `chain/018-next-upgrade-save-size-cap` in website at `969d92a` (M3 tip).

## Date

2026-11-20 (UTC). Session `implementer-hooks-018`.

## Changelog

| Date | Handoff | Request | Summary |
|------|---------|---------|---------|
| 2026-11-20T05:49 | steering-roadmap-hooks (brief `steering/018-brief-implementer.md`) | M4 on revision 7 | The tests that cover R1 and R2 run at the M3 tip; R6 read in the installed 16.4.6 and 16.1.6 sources and in the built output; R5's wrappers counted; R3 and the walks are UAT's. |
| 2026-11-20T07:12 | devops-hooks-018 (Stage 1, brief steering/018-brief-devops.md) | Close at Committed | Status: Committed. Closed to closed/ at Stage 1 of release website master d1bb9b0 (deployment/018-next-upgrade-save-size-cap-deployment.md); the document's anchor is unchanged. |
| 2026-11-20T13:40 | devops-hooks-018 (Phase 2D, brief steering/018-brief-devops.md) | Release | Status: Released. Website master moved 7923a1d to d1bb9b0 at 2026-11-20T08:07:52Z (deployment/closed/018-next-upgrade-save-size-cap-deployment.md); the document's anchor is unchanged. |

## Implementation Summary

No website file changes: M4 is a re-verification. The two limbs the implementer owns are the existing tests (R1, R2) and the source read (R6); the walks (R1, R2, R3, R5 on a local build, signed in) are UAT's and are not run here. Where a behaviour no longer held the plan sends a
fix to M4-b; none was found by these instruments.

## Milestones Completed

M4's implementer limbs (R1 and R2's tests, R6's read, R5's wrapper count). Open: UAT's walks B-3 (R1 Cancel and confirm, R2, R3 recorded either way, R5 under throttling).

## Entry Conditions

| Condition | Where satisfied | Pinned by |
|---|---|---|
| Stage start for M4 | `steering/018-rulings.md` block "2026-11-20T05:26Z" and steering's resume message | not owed |
| Tests at the M3 tip | the shared tree at `969d92a`, `node_modules` on Next 16.4.6 (ruling B install after the M3 commit, exit 0) | `m4/969d92a/r1-r2-tests.out.txt` |

## Files Modified

None. Files Created: none in website; captures under `verification/018/implementation/m4/969d92a/`.

## Patterns Extended

Not owed (no code). User-visible surfaces: none touched.

## TDD Compliance

No new function or class; no code. Not owed.

## M4 rows

| # | Behaviour | Instrument | Result at the M3 tip (`969d92a`, Next 16.4.6) |
|---|---|---|---|
| R1 | leave-page guard (`<Link onNavigate>` `preventDefault`; Cancel keeps edits, confirm navigates) | `src/app/message/__tests__/layout.navigation-guard.test.tsx` (33 cases), `src/providers/__tests__/NavigationGuardProvider.link-confirmation.test.tsx` (35); both through the helper `src/components/__tests__/helpers/linkNavigation.tsx`, unchanged | 33 of 33 and 35 of 35 pass; the run over those two files, `src/components/__tests__` and `src/components/AnchoredPopover` is 127 of 127, exit 0 (`r1-r2-tests.json`); the whole suite at the tip is 2261 of 2261 (M3 document). The walk (both Cancel and confirm, on the local build) is UAT's: B-3. |
| R2 | `StyledLink`'s plain-click interception of a link to another site, from `onClick` | the link-confirmation file above | same run; walk is UAT's: B-3 |
| R3 | stated limit X-14: `router.push`/`replace`, `redirect()` and back/forward cannot be stopped | UAT walk: the editor with unsaved edits, the browser's back; record whether a confirmation appears | **not run here; UAT's.** No test is expected. To be written into the UAT document and carried to the architect (M4-c). |
| R5 | `loading: () => null` on the six `next/dynamic` wrappers stops Suspense propagation | UAT walk under throttling (jsdom is not admitted as the instrument) | the wrappers are in place: `git grep -c -E "loading: \(\) => null" -- src/components/dynamics` gives 6 files with 1 each (`r5-dynamics-loading.txt`: `Calendar`, `ImageUploader`, `Markdown`, `SlateEditor`, `ToastContainerWrapper`, `Tooltip`); the `no-restricted-syntax` lint rule on `next/dynamic` calls is carried by M3's ledger. The walk is UAT's. |
| R6 | a client navigation `/message/f/A` → `/message/f/B` mounts B's page and modal fresh (`layout-router.js`) | the implementer's read of 16.4.6's `layout-router.js` and its key functions, recorded here; a UAT walk "if the read differs" | **read below: no difference in behaviour from 16.1.6.** |

### R6: the read (M4-c; carried to the architect)

Sources: `node_modules/.pnpm/next@16.1.6_*/node_modules/next` and `next@16.4.6_*` (both are still in the shared tree's store after the frozen install); `m4/969d92a/r6-*.txt` hold the lines.

- **Both versions key the layout router's state the same way and both keep the previous page hidden.** At 16.1.6 `layout-router.js` computes `activeStateKey = createRouterCacheKey(activeSegment, true)` and calls `useRouterBFCache(activeTree, activeStateKey)`; at 16.4.6 it computes `createSegmentKey(activeSegment)` and calls
  `useRouterBFCache(activeTree, activeRenderTree, activeStateKey)`. In both, the previous entry stays mounted in a hidden `<Activity>` (`mode: stateKey === activeStateKey ? 'visible' : 'hidden'`) and `MAX_BF_CACHE_ENTRIES` is `process.env.__NEXT_CACHE_COMPONENTS ? 3 : 1`; the site's `next.config.js` has no `cacheComponents`, so 1 in both
  (`r6-bfcache-compare.txt`). So A's tree lingering hidden after `/message/f/A` → `/message/f/B` is the behaviour at 16.1.6 as well; my earlier note in the M1 document's Resumption State that it was new at 16.4.6 is withdrawn (I had compared the function names, not the code under them).
- **The key a dynamic segment gets in the browser is the same.** `createRouterCacheKey` at 16.1.6 returns `name|value|type` for a dynamic segment (an array). At 16.4.6 `createSegmentKey` for an array returns `name|type` (no value) in the server variant, but the file's own comment states that the browser uses the concrete keys, its bundle using
  `create-segment-key.browser`, which returns `createRouterCacheKey` (`name|value|type`); `dist/build/browser-variant-modules.js` lists the module (`r6-keys-source.txt`). The built tip agrees: of the client chunks one holds the `name|value|type` key and none holds the value-less form, and one server chunk holds the value-less form (`r6-built-key-forms.txt`, `grep -rlE` over `.next/static` and `.next/server`).
  A change of `[id]` therefore gives B a new state key at both versions: B mounts fresh.
- **Not read:** the reason React embeds no key in the HTML (the file's comment says "React keys are not embedded in the HTML"); the `__NEXT_CACHE_COMPONENTS` limb, because the site does not enable it.
- Result for the plan's "UAT walk if the read differs": the read does not differ in effect. A walk for R6 is not owed by this instrument; it stays UAT's call (the plan's B-3 does not list it).

## Test Execution Results

| Command | Result | Exit |
|---|---|---|
| `npx vitest run <the two files> src/components/__tests__ src/components/AnchoredPopover` (network-isolated) at `969d92a` | 127 of 127; the two named files 33 and 35 of their cases | 0 |
| `git grep -c -E "loading: \(\) => null" -- src/components/dynamics` | 6 files, 1 each | 0 |
| the reads above | `m4/969d92a/r6-*.txt`, `r5-dynamics-loading.txt` | not owed |

## Outstanding Items

- UAT's walks B-3 (R1, R2, R3, R5) on a local build at the M3 tip, with the local-build rule (move the message id sequence before the first save); R3's result is recorded either way.
- Carry R3's (after the walk) and R6's results to the architect (M4-c); R6's is above.
- Self-diagnosis: in the M1 document's Resumption State I wrote that 16.4.6's `layout-router.js` "no longer uses createRouterCacheKey" and A's tree "now lingers hidden". Both halves were a read of identifiers rather than of behaviour; reading the 16.1.6 file beside it showed the same Activity mechanism. I compared the new file to the plan's description of the old one, not to the old file.

## Next Steps

Code review of M3 (`969d92a`) is with `code-reviewer-hooks-018`. After review and QA, UAT runs B-3 and M2-e's local-build walk; devops's Stage 1 and the release-check branch are M5.
