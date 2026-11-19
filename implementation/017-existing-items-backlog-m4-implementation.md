---
ID: 017
Origin: 017
UUID: 5c3e9a71
Status: Active
Handoff-At: de06d95 — repos=website; M4 first delivery
---

# Implementation 017 — M4: a link away from an editor with unsaved changes asks first (item 4, D-12)

## Plan Reference

`agent-output/planning/017-existing-items-backlog.md`, revision 4, milestone M4 (M4-a to M4-d, X-14). Website chain branch
`chain/017-existing-items-backlog`; base for this milestone is M3's fix tip `1ab3b96` (`implementation/017-existing-items-backlog-m3-implementation.md`,
code review APPROVED at `1ab3b96`, QA Phase 2 for M3 still running at this write).

## Date

2026-11-19.

## Changelog

| Date | Agent | Change |
|---|---|---|
| 2026-11-19T02:39 | implementer-hooks-017 | Resumed chain 017 from the M3 Resumption State on `steering-roadmap`'s message; M4 opened. Cache-warm wake armed. |
| 2026-11-19T02:46 | implementer-hooks-017 | The class re-derivation found two same-tab external links Next's `onNavigate` never reaches (NavMenu "Invite Bot", the `/send` bot-invite `InfoPanel` link); asked `steering-roadmap`, answered by `steering/017-rulings.md` block 2026-11-19T02:43Z (`ed584ba`): not put to the owner, the mechanism is mine, record the departure from M4-a as a deviation. |
| 2026-11-19T03:05 | implementer-hooks-017 | M4 built and committed at website `aa33701`; full suite 1679 of 1679, exit 0; typecheck exit 0. |
| 2026-11-19T03:13 | implementer-hooks-017 | Self-check sweep over `1ab3b96..aa33701` (39 of 40 killed), QA's named mutants NM-8, NM-9, NM-24, NM-25 run (4 of 4 killed), convention-check CANDIDATEs (four fixed waits) removed at `de06d95`, tests only. Full suite 1690 of 1690, exit 0; typecheck exit 0. Handed to code review at `de06d95`. |

## Implementation Summary

Next 16.1.6's `<Link onNavigate>` is the interception for an in-app link: it runs before the navigation and `preventDefault()` stops
it; it is not called for a modified click, a new-tab target, a download, or a non-local address. `src/providers/NavigationGuardProvider.tsx`
(new) is mounted in `src/app/message/layout.tsx` inside `Providers`; it holds a registered guard (a function from a destination to
"ask first") and mounts its own `ConfirmationProvider` and `ConfirmationDialog`, capturing `showConfirmation` from that instance. `MessageProvider`
registers `hasChanged && !isSameMessage(destination, routeId)` while mounted. `StyledLink` calls the guard from `onNavigate`, and,
for a plain click on a link to another site (which `onNavigate` never sees), from `onClick`; on confirm it navigates by `router.push` /
`router.replace`, or, for another site, by `window.location.assign` inside `leaveWithoutAlert` so the browser's own prompt does not
follow the confirmation. `useUnloadAlert` loses its `next/router` handler (M4-c). The editor's own `ConfirmationProvider` in
`m/[id]/layout.tsx` and its dialog in `edit/page.tsx` are unchanged, so a link prompt and the update prompt are separate instances.

## Milestones Completed

M4-a to M4-d in one slice, commit `aa33701` (production: `NavigationGuardProvider.tsx`, `StyledLink.tsx`, `MessageProvider/index.tsx`,
`message/layout.tsx`, `useUnloadAlert.ts`; tests below). `de06d95` follows it, tests only: the four fixed 400 ms waits the
convention check flagged (wall-clock CANDIDATEs) became condition-based waits (`vi.waitFor`).

## Entry Conditions

| Condition | Where satisfied | Pinned by |
|---|---|---|
| Stage start | `steering/017-rulings.md` block 2026-11-19T00:29Z (M1 to M4, D-12, D-20); resumed on `steering-roadmap`'s message after M3's fix | not owed |
| QA Phase 1 covering M4 | `qa/017-existing-items-backlog-qa.md` at `3af80aa`, § M4, QAF-8, QAF-12, AF-22, NM-8, NM-9, NM-24, NM-25, NM-29 | not owed |
| Open questions | none open that M4 depends on: OQ-10 is D-20 | not owed |
| A flow holding a decision | the external same-tab links: asked, answered by `steering/017-rulings.md` block 2026-11-19T02:43Z (`ed584ba`) as not the owner's; design is mine, deviation recorded below | `NavigationGuardProvider.link-confirmation` ("StyledLink to another site"), `layout.navigation-guard` ("the bot invitation"), `NavMenu.navigation-guard` ("Invite Bot") |
| M4-b, for every member the confirmation, Cancel keeps the edits, confirm navigates | the class table below | `layout.navigation-guard` (editor and send routes), `NavMenu.navigation-guard`, `NavigationGuardProvider.link-confirmation` |
| M4-b, same message exact, never a prefix (NM-8) | `isSameMessage` | `layout.navigation-guard` "search result to another message whose id starts with this one / is a prefix of this one", "link to %s" lookalikes |
| M4-b, keyboard activation (NM-9) | `onNavigate` and `onClick` see the click whatever its detail | provider file "asks for a link activated from the keyboard"; layout file "asks for a link activated from the keyboard" |
| M4-b, modified click (NM-24) | Next skips `onNavigate`; `onClick` skips a modified click | provider file, the ctrl/meta/shift/alt/middle/new-tab/download cases, local and other-site |
| M4-b, both prompts open together (NM-25, AF-22, NM-29) | separate instances; `StyledLink` never calls `useConfirmation` | layout file "keeps both open when raised together, each answered on its own, with a link inside the editor"; provider file "the link prompt beside the editor's own prompt" |
| M4-b, `/send` still renders no update prompt | no renderer under `m/[id]/layout.tsx` on `/send` | layout file "renders no editor prompt on the send page, and still asks for its links" |
| M4-b, no editor mounted: links navigate as at `1ad625e` | `useNavigationGuard` returns "no guard" outside the provider; the guard is withdrawn on unmount | provider file "navigates as before on a page with no guard provider"; layout file "stops asking once the editor has unmounted" |
| M4-c | `git grep -c "next/router" -- src` over production files returns no line | `useUnloadAlert.act-suppression` "raises no confirmation on a route-change event" |
| M4 downstream, M3-d's `hasChanged` signed out | M4's guard reads `hasChanged`, which holds signed out as well as signed in (M3) | `layout.navigation-guard` runs signed out (default) and signed in (the sidebar's servers and account links, the send page) |

## User-visible flows (derived from the codebase)

M4 touches user-visible surfaces (a confirmation dialog on link clicks; the link set of the editor and send pages). Every flow is stated
by D-12 and D-20 or by the 02:43Z ruling; no flow holds an undecided choice, so the only ask was the external-link one, answered.

| Flow | Surface | Trigger | What happens next | Rung of the pattern ladder |
|---|---|---|---|---|
| A link to another page, with unsaved edits | `/message/m/<id>/edit` and `/send`: the avatar link, the sidebar, the header's search results, the crumbs, the `NavMenu` items | a pointer click, or a keyboard activation | a "You have unsaved changes!" dialog; Cancel keeps the page and edits; "Leave Page" navigates | rung 1: the same surface's Reload confirmation (`Navigation.tsx`, `withConfirmation`), same dialog component and the same title |
| A link to another site, with unsaved edits | `NavMenu` "Invite Bot"; the `/send` bot-invite `InfoPanel` link | a plain click | the same dialog; "Leave Page" leaves the tab for that address with no second browser prompt | none exists for an external link: the 02:43Z ruling leaves the mechanism to me; reuses `leaveWithoutAlert` (M3) |
| A link to this message's own `/edit` or `/send` | the send item, the crumbs, the header's current-message result | a click | no dialog; navigates as before | rung 1: the editor's own page switch |
| A link that opens a new tab or downloads, or a modified click | "New" in the file menu, `NavMenu` "Support", the cookie notice's "Learn more" | a click, or ctrl/meta/shift/alt/middle | no dialog; the browser's own behaviour | rung 1: `next/link`'s own rule |
| The editor's update prompt beside a link prompt | the edit page | another tab saves, then the user clicks a link | both dialogs stay, each answered on its own | none exists; separate provider instances (AF-22, QAF-12) |
| `/send` and the update prompt | `/send` | another tab saves | nothing renders, as at `1ad625e` | unchanged |

Dialog wording is not stated by the plan. It extends the Reload confirmation's form: title "You have unsaved changes!" (the same
title), message "Are you sure you want to leave this page? Changes you made may not be saved." (the unload prompt's sentence, because
a draft stays in browser storage but an unsaved message is not saved), button "Leave Page".

## Class re-derivation at the tip (M4-d's first step)

Run at website `1ab3b96` (production source only; outputs under `verification/017/impl/m4/`):

- Listing 1, `from 'next/link'` importers (`class-next-link-importers.out`, 2 files): `StyledLink.tsx`, and `m/[id]/_layout/Navigation.tsx`, which imports the `LinkProps` type only and renders no `next/link`.
- Listing 2, `StyledLink` importers (`class-styledlink-importers.out`, 11 files): `CookieConsent`, `LandingCTA`, `Footer`, `Header`, `Sidebar`, `f/[id]/page`, `m/[id]/_layout/Navigation`, `send/page`, `message/page`, `Dropdown`, `InfoPanel`.
- Listing 3, string `onPress` items (`class-string-onpress-items.out`): `NavMenu.tsx` 4 (`/message/m/new`, `INVITE_URL.toString()`, `/support` with `newTab`, `/message`) and `f/[id]/page.tsx` 6 (the folder page, not an editor route).
- Raw anchors: `git grep -n -E "<a\b"` over production source, editor routes: `EmbedAuthor.tsx` and `EmbedTitle.tsx` only, both `target='_blank'`.

| Link | Where it renders | Routes | In the class | Mounted case |
|---|---|---|---|---|
| `/message/f/0` and `/message/f/<guild>` (avatar) | `m/[id]/_layout/Navigation.tsx` | `/edit` | yes | `layout.navigation-guard` "asks before the avatar link leaves the editor" |
| send item (`/message/m/<id>/send`) | the same | `/edit` | no, same message | "does not ask for the link to the same message's send page" |
| "New" (`/message/m/new`, `target=_blank`) | file menu, the same | `/edit` | no, a new tab | `StyledLink` level only (the File menu's popover cannot be positioned in jsdom; see Outstanding) |
| search results to another message's `/edit` | `Header.tsx` | `/send` | yes, unless the same id | "search result to …" (4 rows) |
| `/`, `/message`, `/message/f/0`, `/message/m/0/edit`, `/legal/terms`, `/legal/privacy` | `Sidebar.tsx` | `/send` | yes (`/message/m/0/edit` no on route 0) | "asks before %s leaves the page" (6 rows), "does not ask for the sidebar's edit link on the unsaved route" |
| crumbs `/message/f/<guild>`, `/message/f/0` ×2 | `send/page.tsx` | `/send` | yes | `layout.navigation-guard` "the send page's own links" |
| crumb and review pencil to `/message/m/<id>/edit` | `send/page.tsx` | `/send` | no, same message | "does not ask for the links back to this message's editor" |
| `NavMenu` Create Message `/message/m/new`, Servers `/message` | `NavMenu`, mounted by `Navigation.tsx` and `Header.tsx` | both | yes | `NavMenu.navigation-guard` |
| `NavMenu` Invite Bot (`INVITE_URL`, another site) | the same | both | **yes — not in the plan's table; added**: Next never calls `onNavigate` for it | `NavMenu.navigation-guard`; provider file "StyledLink to another site" |
| `NavMenu` Support (`/support`, `newTab`) | the same | both | **no — the plan's table lists it as a member; it opens a new tab** | `NavMenu.navigation-guard` "does not ask for Support" |
| `InfoPanel` bot invitation (`onContinue` is a `URL`, another site) | `send/page.tsx` when the message's server lacks the bot | `/send` | **yes — the plan's table says no member at `1ad625e`; it has this one** | `layout.navigation-guard` "asks before the bot invitation … and leaves for it once confirmed" |
| `InfoPanel` with a callback (`Log in`) | both pages | both | no, not a link | M3's `page.sign-in-exit` |
| cookie notice "Learn more" (`/legal/privacy`, `target=_blank`) | `app/layout.tsx`, so on both routes | both | no, a new tab — **not in the plan's table; added** | provider file "a link that opens a new tab" |
| `LandingCTA`, `Footer` | `app/page.tsx` only | none | no, no editor route | not owed |
| raw anchors in the preview | the editor | `/edit` | no, `target='_blank'` | not owed |

The plan's own text gets these three corrections at the planner's next batch (`steering/017-rulings.md` 02:43Z names it).

## Deviations

- **M4-a, "the one interception Next 16.1.6 offers" (02:43Z ruling: record as a deviation with its reason).** `StyledLink` also
  intercepts a plain click on a link to another site from `onClick`, because `next/link` returns before `onNavigate` for a
  non-local address (`node_modules/next/dist/client/app-dir/link.js`, `linkClicked`: `if (!isLocalURL(href)) { … return; }` precedes
  the `onNavigate` call). Reason: M4-b requires the confirmation for every member of M4-d's class and two members are such links. The
  second interception applies Next's own click rule (`target`, modifier keys, a middle click, `download`) and runs after the caller's
  own `onClick`, so a caller that has handled the click is respected. The ruling also excluded the alternatives I had put:
  recording them as a limit narrows D-12, and a `/send` unload prompt is not M4-b's confirmation.
- **The instrument.** Under vitest `next/link` resolves to the pages router's `link.js`, not `app-dir/link.js` (the app-dir module
  needs `react-server-dom-webpack/client`, which is not resolvable here). Both read in full: the click rule, `isLocalURL`, and the
  `onNavigate` call have the same shape; only the navigation sink differs (`router.push(href, { scroll })` on a router context in the
  tests, `dispatchNavigateAction` in the app). `linkNavigation.tsx` gives the tests that router context. A test cannot tell the app
  router's sink from this one; the human walk (B-3 by UAT) is the check.
- **`hrefToString`** reads a string, a `URL` and a path object (`pathname`, `search`, `hash`); `InfoPanel` passes a `URL`, which my
  first version read as its path only (a red case, below). A path object with `host` or `protocol` is not read (no call site passes one).
- **External confirm leaves through `leaveWithoutAlert`.** After the user has answered our dialog, the browser's unload prompt would
  ask a second time on `/edit`; M3's act-keyed suppression (D-18's form) lowers it for this act only.

## Files Modified

| Path | Changes | Lines |
|---|---|---|
| `src/components/StyledLink.tsx` | `onNavigate` and an other-site `onClick` call the guard; href to string; Next's click rule for the other-site case | +34 −2 |
| `src/providers/MessageProvider/index.tsx` | registers the guard while mounted; `isSameMessage` (exact id, same origin) | +13 |
| `src/app/message/layout.tsx` | mounts `NavigationGuardProvider` inside `Providers` | +7 −4 |
| `src/utils/hooks/useUnloadAlert.ts` | the dead `next/router` handler removed; only `useBeforeUnload` remains | −17 |
| `src/utils/hooks/__tests__/useUnloadAlert.act-suppression.test.tsx` | the `next/router` mock removed; one case added (route-change event raises no confirmation) | +13 −2 |
| `src/app/message/m/[id]/edit/__tests__/page.sign-in-exit.test.tsx` | the `next/router` mock removed | −1 |

## Files Created

| Path | Purpose |
|---|---|
| `src/providers/NavigationGuardProvider.tsx` | the guard context, its own confirmation instance and dialog, `useNavigationGuard` |
| `src/components/__tests__/helpers/linkNavigation.tsx` | a router context for the real `next/link`, and a recording router |
| `src/providers/__tests__/NavigationGuardProvider.link-confirmation.test.tsx` | the guard and `StyledLink` (34 cases) |
| `src/app/message/__tests__/layout.navigation-guard.test.tsx` | the real two-level layout tree: the editor and send routes (31 cases) |
| `src/app/_components/__tests__/NavMenu.navigation-guard.test.tsx` | `NavMenu` through the real `Dropdown` (4 cases) |

## Patterns Extended

| Surface | Pattern extended | Rung |
|---|---|---|
| the link prompt's dialog | `ConfirmationProvider` / `ConfirmationDialog` as `Navigation.tsx`'s Reload uses them | in-file (same surface) |
| `StyledLink` | its `mergeProps` with the caller's props and `useFocusRing` | in-file |
| other-site exit | `leaveWithoutAlert` (M3) | in-repo |
| guard registration | `useMessage`-style context, but returning "no guard" outside its provider (the plan's stated deviation) | in-repo |
| tests | `mountDom`, `press`, the `messageProviderDeps` mocks, `MessageProvider.stored-draft`'s stable-data rule for the `message.getOne` mock | in-repo |

Sibling sweep: predicate 1, text: `git grep -n -E "useConfirmation\(" -- src ':!**/__tests__/**'` for any link-rendering component that
reaches the nearest provider (the class AF-22 names); predicate 2, reference query: Serena's `find_referencing_symbols` is not available in this
session, so not run. Results are in the Class Sweep.

## TDD Compliance

Red captures are under `verification/017/impl/m4/`. The first row of the new module is the compile-time red; every other row has an
assertion-level red against the pre-change code: the module present with `StyledLink` unwired (12 of 27 failing), the layout tree
without the mount (15 of 22 failing), and the `URL` href (1 failing each in two files).

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|---|---|---|---|---|---|
| `NavigationGuardProvider`, `useNavigationGuard` (first row of a new module) | `NavigationGuardProvider.link-confirmation.test.tsx` | Yes | Yes, `red-guard-provider.out` | Failed to resolve import `../NavigationGuardProvider` | Yes |
| `StyledLink` holds a link the guard names and asks; Cancel; confirm by `push` or `replace`; keyboard; modified; new tab; no provider; withdrawal; exact destination handed to the guard | same | Yes | Yes, `red-guard-provider-assertions.json` (module present, `StyledLink` unwired: 12 of 27 failing) | AssertionError (dialog absent, `push` not called, guard not called) | Yes |
| a link to another site is held, confirmed through `location.assign` with the suppression raised, cancelled, left alone when unmodified and not held | same | Yes | same file | AssertionError | Yes |
| a `URL` href is read as its address | same | Yes | `red2-NavigationGuardProvider.link-confirmation.json` (1 failing) | AssertionError (no "Leave Page" button: the address read as its path, so it was taken for a link on this site) | Yes |
| `MessageProvider` registers the guard; exact-id same-message rule; layout mount; the editor's and send route's members | `layout.navigation-guard.test.tsx` | Yes | `red-layout-guard.json` (15 of 22 failing) | AssertionError (`expected false to be true`: no dialog) | Yes |
| the send page's crumbs and its bot-invite link | same | Yes | `red2-layout.navigation-guard.json` (1 failing at the invite) | AssertionError (the `URL` href case above) | Yes |
| `useUnloadAlert` raises no confirmation on a route-change event | `useUnloadAlert.act-suppression.test.tsx` | Yes | `red-router-hook.json` (1 failing) | AssertionError (`Error: Navigation aborted.` thrown by the handler) | Yes |
| `NavMenu` items through the real `Dropdown` | `NavMenu.navigation-guard.test.tsx` | No (written after the wiring) | closed by mutants in the sweep below | AssertionError | Yes |
| boundary rows added before the sweep: `target='_self'`, `download`, a middle click, an already handled click, a withdrawn older registration, same-message lookalikes (`/edit/`, `?tab=1`, an absolute same-origin address, another site with the same path, `/edit/extra`, `/m/new`) | both files | No (added after the first green, from the guard list) | closed by the mutants in the sweep below | AssertionError | Yes |

`tdd-check.py` refuses JavaScript and TypeScript, so the rows above are read, not tool-checked.

## Class Sweep

First delivery: the gaps the red runs and the sweep exposed, each class stated by its effect.

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| Class A, a link rendered on an editor route that a guard cannot reach because it never passes through `StyledLink`'s `onNavigate` (the `URL` href read as its path; the other-site links) | the three class listings and the raw-anchor grep above (`m4/class-*.out`; `git grep -n -E "<a\b"` over production source) | listing 1: 2 files; listing 2: 11 files; listing 3: 10 items (4 `NavMenu`, 6 on the folder page); raw anchors on editor routes: 2 (`EmbedAuthor`, `EmbedTitle`) | every rendered member has a row in the class table and a mounted case, except the file menu's "New" (Outstanding). Residual: 1 unmounted, asserted at `StyledLink` level |
| Class B, a click rule `StyledLink` applies that Next also applies, asserted on one input where a wrong rule gives the same answer (`target`, each modifier key, a middle click, `download`, an already handled click) | `git diff -U0 1ab3b96 aa33701 -- src/components/StyledLink.tsx` guard list: `opensInThisTab` (4 conjuncts), `e.defaultPrevented`, `isOnThisSite` | mutants `StyledLink.tsx:23` and `:24` (11) all killed in the sweep, `:24` including `||:2`, `||:3`, `||:4` and `num` | each conjunct has a case in which it alone decides (ctrl, meta, shift, alt, `_blank`/`_self`, `download`, middle, handled) and its removal mutant killed. Residual: 0 |
| Class C, a test-harness mock returning a fresh object each call, which loops a provider that has the object in an effect's dependencies | `git grep -n "message.getOne" -- 'src/**/__tests__/*'` | 2 files: `MessageProvider.stored-draft` (one stable object) and `layout.navigation-guard` (a `Map` of stable objects, after the hang) | both stable. Residual: 0 |
| Class D, a fixed wall-clock wait in the standing suite | `convention-check.js website --since=1ab3b96` `wall-clock` | 4 CANDIDATEs at `aa33701` (two files, two lines each) | replaced by `vi.waitFor` at `de06d95`; re-run: 0 CANDIDATE |

## Test Execution Results

Environment: website `chain/017-existing-items-backlog`, vitest 4.1.2; network-isolated (`unshare -rn`) for every mutation run, in
`mutation-run.py` and `git archive` exports of `aa33701` with `node_modules` shared read-only; the shared tree never mutated; both exports removed.

| Command | Result |
|---|---|
| `npx vitest run --reporter=json` at `de06d95` (`m4/vitest-m4-de06d95.{json,out,exit}`) | 1690 of 1690 passed, 136 test files, 0 failed; process exit code 0; count method: the reporter's `numTotalTests`/`numPassedTests`/`numFailedTests`, file count from `testResults` length. M3's 1620 plus 34 + 31 + 4 + 1 new cases |
| `pnpm run typecheck` (both programs) at `de06d95` (`m4/typecheck-de06d95.{out,exit}`) | exit 0 |
| `npx eslint` over every file M4 changed or created | 0 findings |
| `node ~/.claude/tools/convention-check.js website --since=1ab3b96` at `de06d95` (`m4/convention-check-tip.out`) | 0 FAIL, 0 CANDIDATE, 20 SKIP: `.playwright-mcp/*.png` (held, not examined), two files with no added lines, and the checker's note that it does not implement the ID-token class verbatim, so basename and title ID tokens were not checked by it; my new names carry none by reading (`NavigationGuardProvider.link-confirmation`, `layout.navigation-guard`, `NavMenu.navigation-guard`) |
| Self-check sweep over `1ab3b96..aa33701` (`mutant-gen.js`, `m4/aa33701-mutants-gen.json`, `m4/aa33701-sweep.out`, `m4/aa33701-sweep/`) | 39 of 40 killed; 1 survivor, dispositioned below |
| Named mutants from QA's Phase 1 (`m4/aa33701-named-mutants-edits.json`, `m4/mutate-edits.py`, `m4/aa33701-named-sweep.out`) | NM-8, NM-9, NM-24, NM-25: 4 of 4 killed |

Survivor of the sweep:

| # | Mutant | Disposition |
|---|---|---|
| 1 | `StyledLink.tsx:34:false` (`prefetch: false` to `true`) | equivalent under the suite and unchanged behaviour: the line is the base default carried into the range by the edit beside it; Next prefetches only in a production build and the recording router's `prefetch` is never reached under test. Not an M4 guard. Survives |

Named mutants (QA's Phase 1 `Named mutants`), each made by hand as one change set in the `aa33701` export:

| Named mutant | Made as | Result |
|---|---|---|
| NM-8, "same message" by a path prefix | `isSameMessage` returns `url.pathname.startsWith('/message/m/' + id)` | killed by `layout.navigation-guard` (2 cases: "search result to another message whose id starts with this one", and the `/edit/extra` lookalike) |
| NM-9, the guard runs on pointer clicks only | `StyledLink` records `e.detail` in `onClick` and `onNavigate` intercepts only when it was above 0 (two edits and a module variable) | killed by "asks for a link activated from the keyboard" in both files |
| NM-24, a modified click opens a new tab and is prompted | `opensInThisTab` removed from the other-site `onClick`; for a local link Next returns before `onNavigate` for a modified click, so there is no local form of this mutant in `StyledLink` | killed by the 7 modifier, `download` and new-tab cases for another site |
| NM-25, the update prompt and the link prompt share one slot | the editor's own `ConfirmationProvider` removed from `m/[id]/layout.tsx`, so its prompts use the layout instance | killed by "keeps both open when raised together" in the layout file (2 cases) |
| NM-29, `StyledLink` resolves the confirmation through `useConfirmation` | not made: no one-change form gives it a place. By construction `StyledLink` imports nothing from `ConfirmationProvider` (`git grep -c "ConfirmationProvider" src/components/StyledLink.tsx` is 0) and the guard captures `showConfirmation` at the layout; NM-25's mutant reproduces its failure (one slot for two prompts) and is killed by the same case, which has a link inside the editor's providers | unplaced as a separate mutant, with that reason |

Test classes walked on the built tip, member by member (the criterion enumerates states and links): the class table's rows each have a
mounted case or are stated unmounted; the M4-b clauses (confirmation first; Cancel keeps the edits; confirm navigates; no prompt when
`hasChanged` is false; same message exact; both prompts open; `/send` renders no update prompt; no editor mounted) each have a named
case in the Entry Conditions table.

No timeout or time-based test was added to the standing suite; the closing transition of a dialog is awaited by condition.

## Outstanding Items

- **Unmounted:** the File menu's "New" link (`target=_blank`): its popover (`AnchoredPopover`, `portal`) cannot be positioned under jsdom
  (`previousElementSibling` of an unlaid-out node), so the layout file has no case for it; the same property is asserted at `StyledLink`
  level ("a link that opens a new tab").
- **Instrument limit:** see Deviations, the pages-router `next/link` under vitest.
- **Self-diagnosis, for the retrospective:** the first version of `hrefToString` read a `URL` as its path, and the plan's table had said
  `InfoPanel` had no member; I took the table's rows as the class and found the `InfoPanel` link only when I mounted the real send
  page instead of reading the table. I tested the plan's rows rather than the property that the guard must see every link that leaves
  the tab; the class re-derivation (listing 2 and a read of each importer) is what found it.
- **Process facts:** the comment gate refused a prose comment in the first draft of `linkNavigation.tsx` (removed; satisfied, not worked
  around); the record-write gates raised nothing this round. A first test-harness mock returned a fresh object each call and hung the
  real `MessageProvider` (class C above); a first request for a unit instrument by the app router's `next/link` failed on an unresolvable
  module and was replaced by the pages module (Deviations). The record-write gate refused one `sed -i` on this document (a doubled
  heading from my own scripted write); re-issued with the Edit tool, satisfied and not worked around. The record check also reports
  one failure in a document that is not mine (`qa/017-existing-items-backlog-qa.md:643`, heading placeholder stamp `T03:1x`), left to
  the QA stage.
- **Downstream:** M4 changes product behaviour observable outside the service's source: signed-in and signed-out users are now asked
  before a link click leaves an editor or send page with unsaved edits, and `/send` links (header, sidebar, crumbs) are guarded.
  M5 to M7 do not read this surface; UAT's B-3 walk and his B-9 look are the milestones whose premise it sets.
- **For the planner:** the three M4-d table corrections (the `/support` row, the `InfoPanel` row, the cookie notice and the two external members), and M4-a's "the one interception" wording.

## Next Steps

Code review (`code-reviewer-hooks-017`) at website `aa33701` (M4 range `1ab3b96..aa33701`), then QA Phase 2 for M4. After M4, tell
`steering-roadmap` that M1 to M4 are through (the devops probe push for OQ-7). M5 and M6 wait on OQ-7 and gate M5-0; M7 last.
