---
ID: 017
Origin: 017
UUID: 5c3e9a71
Status: Active
Status-Detail: "Revision 2: the critic's pass 1 (F-1 to F-18), the architect's conformance pass (AF-1 to AF-9) and QA Phase 1 (QAF-1 to QAF-9) folded. Ready for critique pass 2, the architect's delta pass and QA's Phase 1 re-key. OQ-8 to OQ-10 and X-17 to X-19 answered by him (D-18 to D-21, R-5). Blocks before code: OQ-7 (the waitUntil probe, before M5 and M6 code). M1, M2 and M7 wait only on the gates and the chain branch."
Revision: 2
Plan-ID: 017
Target-Release: "website master (Vercel production) first, then preview-image-generator prod (prod.yml), each push his word, run by devops. Order and reason: § Release and rollback. Neither package.json carries a version field (git show 1ad625e:package.json, 8de2b53:package.json), so no version artifact moves."
Epic-Alignment: "Hooks.gg existing-items queue: the commission of 2026-11-18T21:53Z (items 2 to 5 of the five-item ranking), under his 2026-11-11 ruling that new feature work waits until the existing items are handled (steering/queue-hooks-rulings.md, selection 2)."
Lane: "full chain, set by the scoping determination (rulings block 2026-11-18T21:59Z, Pipeline). Not proposed small: M5 changes the shared save path and a second service's contract; M2 changes the notice every editor tab runs; M3 changes the browser-stored draft every editor reads; M4 adds a context above every /message page."
Architectural-Surface: "Yes; the architect's conformance pass is a named step (stage set). (1) A cross-repo contract: bucket deletion moves from the generator to the website, the stored preview nonce commits only after the generator's answer, and the key form [dev/]previews/<id>/<nonce>.jpeg is decided on each side by a named variable (M5, M6). (2) Post-response work in the save path through @vercel/functions waitUntil, a new dependency (M5). (3) A stored representation: the browser's draft storage, a new typed key and a per-tab id (M3). (4) A navigation-guard context mounted at src/app/message/layout.tsx, with ConfirmationProvider moved there (M4). Architecture lines the chain closes or invalidates: system-architecture.md Runtime Flow 3 (who deletes; the key form), Problem Areas rows 'A failed preview generation shows a broken image', 'enforceImportMutualExclusivity is dead', 'ESLint carries known findings'; Recommendations 1, 4, 6; website.md A-6 (persist also records the tab's own save), A-7 (the draft key and its one reader), A-8 (the providers below the message layout's header and sidebar)."
---

# Plan 017 — the existing-items backlog: stale previews, the saving tab's own notice, signed-out edits, hygiene

## Changelog

| Date | Rev | Author | Change |
|---|---|---|---|
| 2026-11-18T22:11 | 0 | planner-hooks-new | Created from the scoping determination (rulings block 2026-11-18T21:59Z) and the commission (block 21:53Z). User stories, inherited rulings, scope questions and the analysis commission; no milestones. Scope delta: none (first revision); sized against the ask, four items, no feature. |
| 2026-11-18T22:24 | R-1 | planner-hooks-017 | OQ-6 restated by replacement: its premise, that the lint script exits 2 at the base, was refuted by steering-roadmap (`verification/017/steering-refute/`). The error was this planner's: a helper's run in an export was taken as the tree's. The base count was re-taken at `verification/017/entry/lint-base/`; the `eslint-395510e-*` captures beside it are the refuted export runs. Gate disclosed: the record-write gate refused a shell heredoc for `lint-base/README.md`, which was written with the Write tool. Scope delta: none. |
| 2026-11-18T22:44 | R-2 | planner-hooks-017 | Registered for revision 1 (Planner batch): chain A's CR-3 INFO (`code-review/closed/fix-dialog-closes-on-first-portal-load-code-review.md`, CR-3) and the base moving to website `1ad625e` (chain A released 22:41Z), both relayed by steering-roadmap. |
| 2026-11-18T23:17 | R-3 | planner-hooks-017 | Commissioned AN-4 (§ "Analysis commissioned"): the generator's production render times, read under steering's ruling `steering/017-rulings.md` block 2026-11-18T23:15Z. |
| 2026-11-18T23:18 | 1 | planner-hooks-017 | Milestones M1 to M7, Decisions D-7 to D-13, Exclusions, Risks and Release written from his six selections of 23:08Z (`steering/017-rulings.md` block 23:08Z) and analysis 017 (`1534ec4`: AN-1 to AN-3, G-1; `b7b4d08`: AN-4). OQ-1 to OQ-6 resolved in place; OQ-7 opened (gate M5-0); all three Planner batch rows discharged. Scope delta: M1 to M7 added (rev 0 had none). Against the ask: item 4 is larger than its handoff (D-11 adds the three stored-draft losses), and item 5's lint limb is smaller (D-9, record only); items 2 and 3 are as asked, with item 3 reduced to one live path plus a pinned absence (AN-1). |
| 2026-11-18T23:27 | R-4 | planner-hooks-017 | Registered D-14 to D-16, his three selections on revision 1; words in `steering/017-rulings.md` block 2026-11-18T23:26Z (`dda0356`) and the 23:26Z ledger block. Scope delta: none (registration only). |
| 2026-11-18T23:57 | 2 | planner-hooks-017 | Folds the three gate verdicts on revision 1: critique cycle 1 pass 1 (`aa2e8ef`, F-1 to F-18), the architect's conformance pass (`406b34a`, AF-1 to AF-9) and QA Phase 1 (`d1add83`, `06511f1`, QAF-1 to QAF-9 with the QAF-9 reconcile); disposition of every finding in § "Gate findings folded". OQ-8 to OQ-10 opened for him; D-17 registered (steering's 23:41Z Standing Default). Scope delta: no milestone added or removed; M3 gains a named storage form, a write matrix, a preservation limb for the other stored keys and an unload-exit table; M4 gains a navigation-guard context and moves `ConfirmationProvider` up a layout (OQ-10); M5 gains an ordered nonce, a deletion form, the cross-repo key contract and a fixed log prefix; M5-0 gains three outcomes and a control line; M6 gains a provision step and per-class failure lines. Against the original ask: what each item delivers is unchanged; the mechanism under items 2 and 4 is larger. |
| 2026-11-19T00:12 | R-5 | planner-hooks-017 | Registered D-18 to D-21, his four selections on revision 2 (OQ-8, OQ-9, OQ-10, X-17 to X-19); words in `steering/selection-ledger/2026-11-19.md` block "2026-11-19T00:10Z — steering-roadmap" and `steering/017-rulings.md` block 2026-11-19T00:11Z (`7c14195`). Scope delta: none — registration only. |

## Reading Order

| Role | Sections, in order |
|---|---|
| implementer | Decisions Register · Plan (the `### M…` heading being coded) · Testing Strategy · Exclusions · Release and rollback |
| code-reviewer | Decisions Register · Plan · Exclusions · Risks |
| qa | Plan · Testing Strategy · Validation · Risks · Gate findings folded |
| uat | Value Statement and Business Objective · Plan (each "Human-observable form" line) · Exclusions |
| devops | Release and rollback · Entry facts (per repository) · `### M5 — …` (M5-0) · `### M7 — …` · Risks |

Owed re-verdicts:

| Limb | Decidable since | Owning gate | State |
|---|---|---|---|
| Revision 2 whole (every milestone) | revision 2 commit | critic, cycle 1 pass 2 | owed |
| AF-1 to AF-5 answers (M3, M4, M5, M6 key contract) | revision 2 commit | architect, delta pass | owed |
| M5-e oracle re-keyed to M5-a and M5-c as restated; M3-g and M3-h populations; M5-g | revision 2 commit | QA Phase 1 re-key | owed |

## Value Statement and Business Objective

One statement per item. Each is delivered by this chain and none is deferred. He approved all four
as worded (D-7).

1. **Stale, not broken, previews (item 2).** As a Hooks user who has saved a message, I want the
   message's preview image to keep showing the last image that was made when a new one cannot be
   made, so that a generator outage or a failed render never leaves a broken image where my message
   used to be. His words: *"Show a stale one is fine."* (`architecture/preview-image-generator.md`
   P-6).
2. **The saving tab is not told about its own save (item 3).** As a Hooks user editing a message, I
   want "Message Update Detected" to appear only when a *different* tab or person has saved the
   message, so that the warning keeps meaning something and I do not learn to dismiss it. His
   report, verbatim (BC-14, 2026-08-25): *"Everything is fine except "Message Update Detected" still
   occurs on save in the tab the save executed."*
3. **Signed-out edits are not lost without a warning (item 4).** As a user who is not signed in and
   has edited a message, I want to be warned before an action throws those edits away, so that I do
   not lose work silently. Stated so he sees it (determination, item 4 "In"): the in-app navigation
   guard has never worked for anyone; making it work makes it work for signed-in users too.
4. **Hygiene (item 5).** As the owner, I want the website's known lint findings cleared or accepted,
   the dead mode-rule function removed or rerouted, six test files moved beside their modules and the
   editor's error-line text asserted, so that the next change to these files starts from a clean,
   checked base. No behaviour changes.

The defect statements, quoted from their reports: item 2, the handoff: *"So the failure mode is a
**broken image**, not a stale one."* Item 3: his BC-14 sentence above. Item 4, the handoff: *"every
unsaved-changes guard in the message editor is gated on the user being authenticated, so for an
unauthenticated user they are inert"*. Reframing, marked as one: analysis AN-2 found that reload or
close loses nothing for a signed-out user, so item 4's delivered value is the three stored-draft
losses (D-11), with the guards turned on to match signed-in behaviour.

## Objective

Deliver the four statements, discharge the carriers the determination names (the four item
handoffs, `handoff/website-tests-not-beside-their-module-2026-11-08.md`,
`handoff/editor-error-lines-render-text-unasserted-2026-11-11.md`, and
`architecture/system-architecture.md` Recommendations 1, 4 and 6), and release both repositories to
production.

## Decisions Register

Settled decisions that bind this plan. Where his answer was a selection, the verbatim column holds
the option he selected, which is agent-authored text (author named). Route for D-7 to D-12: a
selection-prompt answer, 2026-11-18T23:08Z, ledger `steering/selection-ledger/2026-11-18.md` block
"2026-11-18T23:08Z — steering-roadmap" (questions 1 to 4 from line 32, 5 and 6 from line 65), put by
steering-roadmap from option text this planner drafted.

| D | Decision | Date | His words, verbatim, and route | Reopening class (observable through) |
|---|---|---|---|---|
| D-1 | Items 2 to 5 are worked; order and grouping are steering's, his to veto | 2026-11-18 | *"Do all 5 in whatever order and group however you determine best."* Witnessed by steering-roadmap, rulings block 2026-11-18T21:53Z | Owner withdrawal only. |
| D-2 | A failed generation should leave a stale preview showing; the save does not block | 2026-08-24 | *"Show a stale one is fine."* His answer to "show no preview, show a stale one, or block the save?", recorded owner-authored in `architecture/preview-image-generator.md` P-6 | Owner withdrawal only. |
| D-3 | Keep-only-latest is intended; no retention requirement exists | 2026-08-24 | *"Intended. There's no purpose for retention."* (corrected by him the same day from a typo). `architecture/preview-image-generator.md` P-5 | Owner withdrawal only. M5's brief coexistence of objects is a new requirement justified by D-2 and stated as one (M5-c). |
| D-4 | The back end stores what the front end allows; no server-side gate on save | 2026-08-24 | *"…I'd say that the back-end reflects what the front-end allows. If a shape is allowed in the front-end, then it's not silently morphed in the back-end…"* (full text `architecture/website.md` W-2; D-005) | Owner withdrawal only. |
| D-5 | Cross-tab divergence is flagged, not coordinated | 2026-08-24 | *"…flag when front-end state doesn't match back-end because of a different tab saving"*. `architecture/website.md` W-6 | Owner withdrawal only. M2 keeps the cross-tab flag (BC-14 limb c) and adds no merge or lock. |
| D-6 | No new feature work in this chain | 2026-11-11 | *"…this new stuff is planned after the existing items are handled"*. `steering/queue-hooks-rulings.md`, selection 2 | Owner withdrawal only. |
| D-7 | The four user stories are approved as worded | 2026-11-18 | Selected: "Agent: proceed on all four (Recommended)". Shown: "The planner writes milestones for all four stories as worded, in revision 1." | Owner withdrawal only. |
| D-8 | The website logs one line per failed or unreachable preview; nothing user-facing | 2026-11-18 | Selected: "Agent: website logs failures (Recommended)". Shown: "The website writes one line per failed or unreachable preview to Vercel's logs. No user sees anything; failures become countable." | Owner withdrawal only. Consequence: the website learns each generation's outcome after the save replies, so M5's mechanism is post-response work (OQ-3). Limit of the selection, stated to him at revision 2 and not a reopening: a line lasts under a day in Vercel's logs (D-17's read), so "countable" holds for a reader that runs at least daily (M5-f). Criteria: M5-f. |
| D-9 | Lint: record the base result as accepted, fix none | 2026-11-18 | Selected: "Agent: accept, fix none (Recommended)". Shown: "Record today's result as the known baseline; no source files change, so the chain's diff stays on its four items." | Owner withdrawal only. Criteria: M7-a, M7-b; Exclusions X-11, X-12. |
| D-10 | The Vercel project settings are read read-only under the hooks-gg team | 2026-11-18 | Selected: "Agent: read under hooks-gg (Recommended)". Shown: "The analyst runs 'vercel project inspect hooks-gg-website --scope hooks-gg', read-only, and records both values." | Executed by the analyst (analysis 017 `1534ec4`, G-1): a 60 s function timeout (Observed); no Fluid compute (Inference: AN-3 grades "the default is the effective setting" so; no criterion rests on it). Reopens on a change to the project's function settings (the same read). |
| D-11 | Item 4: fix the stored-draft losses at their source and turn the existing warnings on signed out | 2026-11-18 | Selected: "Agent: fix at source + warnings (Recommended)". Shown: "Fix the shared-draft losses at their source, so a draft survives sign-in, another tab and the expired-session sign-out, and turn the existing warnings on for signed-out users too. More work than the handoff; revision 1 prices it." | Owner withdrawal only. Criteria: M3. Price: M3's scope (§ Plan). The sign-in exit's warning, which the shown text did not cover, is OQ-8; it does not reopen this row. |
| D-12 | Warn on a link click away from an editor with unsaved changes, for everyone; record what cannot be stopped | 2026-11-18 | Selected: "Agent: warn on link clicks (Recommended)". Shown: "Warn when someone clicks a link away from an editor with unsaved changes, for everyone (a new prompt signed-in users will see), and record the navigations that can't be stopped as a known limit." | Owner withdrawal only. Criteria: M4; limit: X-14. The form M4 needs (a context above the editor's providers) is OQ-10. |
| D-13 | AN-4's host read is made without asking him | 2026-11-18 | Agent-authored, by steering-roadmap: a read through the read-only alias `ssh hooks-pig` is made under the lifecycle Standing Default (`steering/017-rulings.md` block 23:15Z). Not his words. | Withdrawal by him or by steering. |
| D-14 | Scope M1 to M7 confirmed; implementation waits for the critic, the architect and QA Phase 1 to approve | 2026-11-18 | Selected: "Agent: confirm M1–M7 (Recommended)". Shown: "The critic, the architect and QA Phase 1 start on revision 1 now. Implementation waits until those three gates approve." Selection-prompt answer, 2026-11-18T23:26Z; ledger `steering/selection-ledger/2026-11-18.md` block "2026-11-18T23:26Z — steering-roadmap"; option text agent-authored (steering-roadmap, from this plan). | Owner withdrawal only. |
| D-15 | OQ-7 proceeds open; the probe push is not approved by this answer | 2026-11-18 | Selected: "Agent: proceed with it open (Recommended)". Shown: "The gates and M1–M4 and M7 go ahead. Before M5 code, a devops session asks you for the probe push. If the probe fails, M5 and M6 stop and come back to you with the fallback." Selection-prompt answer, 2026-11-18T23:26Z; ledger `steering/selection-ledger/2026-11-18.md` block "2026-11-18T23:26Z — steering-roadmap"; option text agent-authored (steering-roadmap, from this plan). | Owner withdrawal only. The chosen option's stop condition, verbatim: "If the probe fails, M5 and M6 stop and come back to you with the fallback." Which probe outcome "fails" names is OQ-9. |
| D-16 | Exclusions X-1 to X-16 accepted as written; X-13's placement question stays in the record's inbox | 2026-11-18 | Selected: "Agent: accept all 16 (Recommended)". Shown: "The plan keeps X-1 to X-16 as written. X-13's question about a test-placement exception in CLAUDE.md stays in the record's inbox for that record's owner." Selection-prompt answer, 2026-11-18T23:26Z; ledger `steering/selection-ledger/2026-11-18.md` block "2026-11-18T23:26Z — steering-roadmap"; option text agent-authored (steering-roadmap, from this plan). | Owner withdrawal only. Revision 2 restates X-5's reason (AF-2) and adds X-17 to X-19; those are not covered by this row and go to him in the revision-2 report. |
| D-17 | QA's read of Vercel production runtime logs is made without asking him | 2026-11-18 | Agent-authored, by steering-roadmap: the read is made under the lifecycle Standing Default (`steering/017-rulings.md` block 2026-11-18T23:41Z). Not his words. Result: `verification/017/qa-phase1/vercel-runtime-logs/` (record `06511f1`). | Withdrawal by him or by steering. |
| D-18 | OQ-8: the edit page's sign-in exits and the expired-session sign-out leave without the browser prompt | 2026-11-19 | Selected: "Agent: skip the prompt (Recommended)". Shown: "Log in and the automatic sign-out leave without the browser prompt, since nothing is lost on them. This changes only M3's exit table." Selection-prompt answer, 2026-11-19T00:10Z; ledger `steering/selection-ledger/2026-11-19.md` block "2026-11-19T00:10Z — steering-roadmap" (question 1); rulings block `steering/017-rulings.md` 2026-11-19T00:11Z; option text agent-authored (steering-roadmap, from this plan). | Owner withdrawal only. Criteria: M3-d's exit table. |
| D-19 | OQ-9: D-15's "fails" means not kept alive; a not-readable run is repaired and re-run once by devops under the same push, and a second not-readable run goes to him | 2026-11-19 | Selected: "Agent: fails = didn't keep running (Recommended)". Shown: "Only a clean 'not kept running' stops M5 and M6. An unreadable run is repaired and re-run once by devops under the same push you approve; a second unreadable run comes to you." Same ledger block (question 2) and rulings block; option text agent-authored (steering-roadmap, from this plan). | Owner withdrawal only. Stop condition, verbatim: "a second unreadable run comes to you." Criteria: M5-0 limb 2. |
| D-20 | OQ-10: M4 adds the navigation-guard context and moves the confirmation dialog up to the /message layout | 2026-11-19 | Selected: "Agent: accept the guard (Recommended)". Shown: "M4 adds the guard and moves the dialog up a layout, so the send page's Header and Sidebar links warn too. What you chose is unchanged; the mechanism is larger." Same ledger block (question 3) and rulings block; option text agent-authored (steering-roadmap, from this plan). | Owner withdrawal only. Criteria: M4-a, M4-d. |
| D-21 | Exclusions X-17 to X-19 accepted as written | 2026-11-19 | Selected: "Agent: accept X-17 to X-19 (Recommended)". Shown: "The plan keeps all three as written, as stated limits." Same ledger block (question 4) and rulings block; option text agent-authored (steering-roadmap, from this plan). | Owner withdrawal only. |

## Assumptions and open questions

OPEN QUESTION [RESOLVED]: OQ-1, failure visibility. Answered by D-8.

OPEN QUESTION [RESOLVED]: OQ-2, item 2's reach. The unit is one save of one message, and the reach
is every save that requests a preview (`upsertMessage`, both request sites). A brand-new message
whose first generation fails stores no nonce, so it shows the default image (M5-d). Agent-authored;
a mechanism choice inside the agreed scope.

OPEN QUESTION [RESOLVED]: OQ-3, item 2's mechanism. `after()` throws in the Pages Router tRPC route
(AN-3, verified locally at Next 16.1.6). D-8 needs the outcome of a render that finishes after the
save replies, so the design is post-response work through `@vercel/functions` `waitUntil`, under the
project's 60 s limit (D-10). Whether `waitUntil` works from this route is gate M5-0 (OQ-7).

OPEN QUESTION [RESOLVED]: OQ-4, item 3. Answered by AN-1: at `395510e` no enumerated save raises the
notice in the saving tab. The one live path is an edit typed while the save is in flight (M2).

OPEN QUESTION [RESOLVED]: OQ-5, item 4. Answered by AN-2 and D-11 (M3, M4).

OPEN QUESTION [RESOLVED]: OQ-6, lint. Answered by D-9 (M7).

**OPEN QUESTION OQ-7 (blocks M5 and M6 code only; the subject of gate M5-0 limb 2).** That a promise
passed to `waitUntil` from `src/pages/api/trpc/[trpc].ts` keeps running after the response on this
project is unestablished (AN-3 G-2; Inference from Vercel's documentation, not executed). Gate M5-0
settles it before M5 or M6 code starts. His word is needed for the probe deployment (a push; see
M5-0). Everything else proceeds. The render-time half is closed by AN-4 (M5-0 limb 1).

**OPEN QUESTION OQ-8 (his; blocks M3 code).** Once M3-d drops the session condition from
`hasChanged`, the edit page's own sign-in controls raise the browser's "Changes you made may not be
saved." on a signed-out user's first sign-in after an edit, and the expired-session sign-out raises it
for a signed-in user with unsaved edits. Read at website `1ad625e`: `src/app/message/m/[id]/edit/page.tsx`
mounts `useUnloadAlert(hasChanged)`; its `InfoPanel` `onContinue` calls `signIn('discord', …)`;
`src/app/message/m/[id]/_layout/Navigation.tsx` mounts `NavMenu`, whose button calls `signIn` signed
out and `signOut` signed in (`src/app/_components/NavMenu.tsx`); `src/providers/SessionProvider.tsx`
calls `signOut()` when a session cookie outlives its session. react-use 17.4.0 `useBeforeUnload`
blocks every unload while its flag is true, and next-auth 4.24.5 `signIn` and `signOut` leave the page
by assigning `window.location.href` (read by this planner in the shared install, the versions named
here: `next-auth/react/index.js` `signIn` and `signOut`; `react-use/lib/useBeforeUnload.js`, which
calls `preventDefault` and sets `returnValue`). M3-a and M3-b
guarantee these exits lose nothing. Options: (a) **these three exits leave without the browser
prompt** (Recommended: the prompt warns of a loss that M3 removes); (b) they keep the prompt, as
"turn the existing warnings on" reads literally. Log out keeps today's prompt either way (it prompts
signed in at `1ad625e`; X-8). The table is M3-d.

**OPEN QUESTION OQ-9 (his confirmation; blocks acting on gate M5-0's result).** D-15's stop
condition reads "If the probe fails, M5 and M6 stop and come back to you with the fallback." M5-0
now has three outcomes: kept alive, not kept alive, and not readable (a control line before the
response is also missing, so the instrument or the deployment failed, not `waitUntil`). Proposed
(Recommended): "fails" means **not kept alive**; a not-readable run is repaired and re-run by devops
under the same approved push, and goes to him only if a second run is also not readable. The
alternative is that any run without the post-response line stops M5 and M6.

**OPEN QUESTION OQ-10 (his confirmation; blocks M4 code).** The architect (AF-4) and the critic (F-1)
found that the Header and Sidebar on the send page render above `MessageProvider` and
`ConfirmationProvider`, so `StyledLink` there cannot see unsaved edits or open the dialog. Delivering
D-12 on the send page needs a small navigation-guard context at `src/app/message/layout.tsx` and
`ConfirmationProvider` moved up to that layout (M4-a). What he selected is unchanged; the mechanism
under it is larger, and it reaches every `/message` page (with no guard registered outside an
editor, those pages behave as today). Options: (a) **accept the form** (Recommended); (b) exclude
the send page's Header and Sidebar links from M4, an Exclusions row, leaving every `/send` link that
leaves the editor unguarded.

Revision 0's scope assumptions, each now stated as a criterion: unit and reach (M5-a), layer (both
repositories, M5 and M6), whether item 3 is live (M2), and severity (M3).

## Analysis commissioned

Analysis: `analysis/017-existing-items-backlog-analysis.md`. AN-1 to AN-4 are answered (`b7b4d08`).

- **AN-1 (item 3).** Answered: no enumerated save raises the notice at `395510e`; an in-flight edit
  does. Instrument: `verification/017/analysis/an1/own-save-broadcast.probe.tsx`. QA re-ran it at
  `1ad625e` with identical rows (QA Phase 1, Premises).
- **AN-2 (item 4).** Answered: losses S2, S3 and S5, and the dead navigation guard. Next 16.1.6
  offers only `<Link onNavigate>` `preventDefault`.
- **AN-3 (item 2).** Answered: `after()` is unavailable in this route. `waitUntil` is documented but
  unexecuted (G-2). Production serves with a 60 s limit (G-1).
- **AN-4 (item 2, gap G-3).** Answered (`b7b4d08`, captures `verification/017/analysis/an4/`): 16832
  production successes from 2023-08-22 to 2026-11-18, render plus store median 2197 ms, p95 2932,
  p99 3729, max 26275, none at 30 s or more. 15 requests did not succeed (about 0.09%; 10 of the 15
  error-log stack heads are `TimeoutError`). The `-preview` instance has served 0 requests. Each
  `<N>` is timed from the request's body end, so it includes the wait for the pooled browser under
  production load (AF-7, read at `8de2b53` `src/server.ts` `processImage`).

## Gate findings folded

Every finding on revision 1, its disposition, and where the plan now carries it. Severity is the
raising gate's.

| Finding | Disposition | Where |
|---|---|---|
| F-1 HIGH, AF-4 HIGH | Form named: a guard context at `message/layout.tsx`, `ConfirmationProvider` moved there; the class enumerated with where each member renders | M4-a, M4-d; OQ-10 |
| F-2 HIGH | The unload class enumerated; the sign-in and forced sign-out members put to him | M3-d; OQ-8 |
| F-3 MEDIUM, AF-1 HIGH, QAF-1 HIGH, QAF-2 MEDIUM, QAF-5 MEDIUM | Deletion form named (replaced nonce, refused commit's own object, an age-guarded sweep); the table's dimensions are each save's write, answer, commit and deletes, plus a message delete; the orphan residue stated over its class | M5-c, M5-e; RK-2, RK-5 |
| F-4 MEDIUM, AF-2 HIGH, QAF-3 MEDIUM | Order token named: an ordered nonce minted from the database clock in the upsert's own statement; conditional update; X-5's reason restated | M5-a; X-5; RK-9 |
| F-5 MEDIUM, QAF-9 INFO (reconcile) | Retention, reader, window, fixed prefix, non-zero precedent and the pool queue stated; D-8's limit stated to him | M5-f; D-8; D-17 |
| F-6 MEDIUM | Three outcomes and a pre-response control line; author, requester and branch contents named | M5-0; OQ-9 |
| F-7 MEDIUM, AF-5 MEDIUM, QAF-6 MEDIUM | The draft gets its own typed key; shared code changes only on the quota path; the other stored keys keep their form and cross-tab sync | M3 "Storage form", M3-g |
| F-8 MEDIUM, AF-5 MEDIUM | Write matrix, bound and quota handling | M3 "Write matrix", M3-h |
| F-9 MEDIUM | All six members restated | M2-a, M3 (red source per limb), M5-a, M5-f, M6-a |
| F-10 MEDIUM | The runner's start is an owner step; deploy evidence is the host's start line; the website's revert waits on it | § Release and rollback |
| F-11 MEDIUM | The chain-015 precedent's content stated as read; provision steps named with their builders and removal | M5 "Human-observable form", M6-0 |
| F-12 LOW | RK-7's carrier is QA's B-10 | RK-7 |
| F-13 LOW | Reachability window stated | M2 "Human-observable form" |
| F-14 LOW, AF-6 LOW | Record form named; a failed save's record is dropped; a creating save adds none | M2 "Record" |
| F-15 LOW, AF-9 INFO, QAF-4 MEDIUM | The skill's read stated; the contract's home and the key criterion | § Release and rollback; M5-g |
| F-16 LOW | Exclusions row | X-17 |
| F-17 LOW | Party named on every rollback and on M7-b | M3 to M5, M7-b |
| F-18 LOW | Reading Order rows use the headings as written | § Reading Order |
| AF-3 MEDIUM | Key form and the deciding variable on each side | M5-g |
| AF-7 LOW | Generator per-class failure lines; the cost sentence | M6-c; M5 "Cost" |
| AF-8 INFO | Recorded beside the fallback | M5-0 |
| QAF-7 LOW | NM-1 cited beside the kill table | M1-c |
| QAF-8 LOW | Raw anchors dispositioned; the human-observable names a link the page renders | M4-d, M4 "Human-observable form" |
| QA, Premises: local sign-in provisioned; G-6 verified | The production fallback removed; M4-c's red recorded as Verified | M3, M4-c |
| Critic's question on the Fluid-compute label | Relabelled as Inference | D-10; § Validation |

## Plan

Milestones run in the order below. M1 moves files that M2 edits, so it lands first. M7 records lint
at the chain tip, so it lands last. One branch per repository: website `chain/017-existing-items-backlog`
(steering cuts it at implementation start) and preview-image-generator `chain/017-…` off `prod`
(devops names it). The re-derivation gate: the owner's implementation approval is expected to
cover M1 to M7 together, which leaves the gate's population empty. Any milestone added after
approval is marked `PREMISE-STALE` when an earlier milestone's product behaviour ships, until a
plan revision re-argues it.

### M1 — Hygiene in the test tree, and the dead mode-rule function (item 5)

No production behaviour changes. Surfaces read at website `1ad625e`.

- **M1-a — four test files move beside their modules.** Each file moves to the `__tests__/`
  directly under its production module's directory, basename unchanged. The rule is
  `agent-output/CLAUDE.md`, Placement. The module is the one each file's imports name (read by this
  planner, `git show 1ad625e:<path>`):

  | File (now) | Module it imports | Moves to |
  |---|---|---|
  | `src/utils/__tests__/messageStore.dropped-set-report.test.ts` | `~/utils/redis/messageStore` | `src/utils/redis/__tests__/` |
  | `src/utils/__tests__/messageValidity.predicate.test.ts` | `~/server/api/utils/messageValidity` | `src/server/api/utils/__tests__/` |
  | `src/utils/__tests__/useApiMethods.json-editor-repair.test.ts` | `~/providers/MessageProvider/useApiMethods` | `src/providers/MessageProvider/__tests__/` |
  | `src/utils/__tests__/usePusher.hash-parity.test.ts` | `~/providers/MessageProvider/usePusher` | `src/providers/MessageProvider/__tests__/` |

  The other two handoff members (`cron.scheduled-selection`, `interactions-edge.signature-before-parse`)
  stay, under Exclusions X-13. Property: for each moved file, the per-file case count and pass set
  are identical before and after, read from vitest's JSON `testResults` by path. The suite's file set
  differs from the base only by these renames, by path membership. The evidence form is Test
  Conventions' rename row. Moving `messageValidity.predicate` beside its module makes it a second
  file there testing `isMessageValid`; that is placement, not duplication. The four files import
  through the `~/` alias only (the critic's read), so a `git mv` leaves their blob ids unchanged
  (`git rev-parse <rev>:<old>` against `<new>`).
- **M1-b — `enforceImportMutualExclusivity` is deleted** (Recommendation 6, "Delete … or route it
  through `isMessageV2`"). Delete is chosen because it has no production caller: at `1ad625e`,
  `git grep -n enforceImportMutualExclusivity 1ad625e -- src` finds its definition in
  `src/utils/index.ts` and the rest in `src/utils/__tests__/limits.import-validation.test.ts`. The
  test file's `describe('enforceImportMutualExclusivity', …)` block (14 of the file's 33 cases, QA's
  read of the base JSON) is deleted with it. Its other 19 cases stay, by title, all passing.
  Property: at the milestone tip, `git grep -c enforceImportMutualExclusivity -- src` returns no
  line. Typecheck exits 0 (`pnpm run typecheck`). Sibling: Test Conventions "Superseded
  implementation" (delete; the current implementation is covered by `messageMode.detection.test.ts`,
  which the implementer mutation-checks once, per that row).
- **M1-c — the editor's error lines assert their exact text** (`handoff/editor-error-lines-render-text-unasserted-2026-11-11.md`).
  The class is every error line `src/components/DiscordMessageEditor/index.tsx` renders, five at
  `1ad625e`: `noContentError`, `embedCharacterError`, `v2TextError`, `componentCountError`,
  `v2ComponentError` (file unchanged from `395510e`, `git diff --quiet`, so the kill table's line ids
  still apply). Property: for each member, with its error set and the others empty, the line's
  rendered text equals its reason string exactly. The accessories container and the region after
  each line carry no text node of their own. Each expected value is a literal, never computed from
  `limits.tsx` (axiom E). Red (axiom A): the five mutants in
  `verification/016/qa-sweep-395510e/kill-table-395510e.json` cover the accessories container and
  `v2ComponentError`; QA's NM-1 supplies a mutant for each of the other four members. Green with
  `hideValidation` set, where no error line renders. Tighten first: `DiscordMessageEditor.component-limit`
  and `.duplicate-placement` (`DiscordMessageEditor/__tests__/`).
- Rollback: `git -C website revert <M1 commit>`, by the implementer on the chain branch before
  release, by devops on `master` after it (the same party rule for every website milestone below).
  Handoff notes: `usePusher.hash-parity` lands at its new path before M2 edits it, which fires that
  handoff's trigger and discharges it.

### M2 — The saving tab recognises its own save (item 3)

Surfaces: `src/providers/MessageProvider/usePusher.ts`, `useApiMethods.ts` `persist`,
`MessageProvider/index.tsx` (wiring), read at `1ad625e`. Sibling, mirrored: `website.md` A-6. The
editor persists its own message through one step, `persist`, and the tab's record of what it sent
is taken there and nowhere else. A new persisting path inherits it by going through `persist`.

- **Record.** A record is `hashMessage(normalizeForHash(payload))`, the form the broadcast compare
  already computes (`usePusher.ts`), so producer and consumer hash one form (Runtime Flow 1b). One
  ref, created in `MessageProvider` and passed to `useApiMethods` and `usePusher` the way
  `messageRef` is (sibling: `messageRef`). A record is added by `persist` only for a message that
  has an id, since `upsertMessage` broadcasts only then (`shared.ts`, `if (message.id)` before
  `pusher.trigger`). A record is removed when an equal broadcast arrives, or when that save's
  mutation errors.
- **M2-a — absence over AN-1's members** (carried and re-derived at the chain tip). For each of AN-1's
  eleven members, in both delivery orders (the broadcast before the save's response, and after it),
  the saving tab raises no "Message Update Detected": Classic nothing changed; Classic after an edit;
  Classic after an edit leaving trailing whitespace; V2 nothing changed; V2 after an edit; V2 beside
  an empty embed; the dialog's V2-with-content choosing Classic; the same choosing V2; not-valid
  passing the shape, nothing changed; the same after an edit; not-valid failing the shape, nothing
  changed (`an1/rows-395510e.json`, 22 rows plus the two outside-class rows). A pinned absence:
  green at `1ad625e` for every member. The red that makes it evidence is AN-1's run at `a74b9e2`,
  where the dialog members raise it (`an1/rows-a74b9e2.json`). Residue: combinations AN-1 did not
  run (for example V2 with trailing whitespace) are not claimed.
- **M2-b — an edit typed while the save is in flight.** For every save from tab T, followed by one
  or more edits in T before T receives that save's broadcast, in both orders relative to the save's
  response, T raises no notice for that broadcast. Red at `1ad625e`: AN-1's outside-class member,
  in both orders.
- **M2-c — the cross-tab notice is kept** (D-5; BC-14 limb c; hazard 4). For every broadcast whose
  hash equals neither T's current content nor any record T holds, T raises the notice. Members:
  another tab's save of a component-only edit, a field edit and a name change; T with and without
  unsaved edits; another tab's save arriving while T's own save is in flight; and another tab saving
  content T sent earlier and has already seen broadcast, after T has moved on. The loss sentence
  keeps its current condition (`hasChangedRef`).
- **Window: how long T keeps a record.** It must outlast the save's round trip and Pusher's
  delivery, and it must not suppress a different tab's save. So a record lives from the send until
  an equal broadcast or the mutation's error, and no clock ends it. Residue, a bounded class (RK-3):
  a remote save whose content equals a record T still holds. Its members: a save whose broadcast
  Pusher never delivers, and a save that succeeds on the server while the client sees an error.
  Equal content is no divergence to flag; the record suppresses only a later remote save of exactly
  that content. QA's Assumption Not Checked (Pusher delivers a save's broadcast back to its sender)
  is UAT's at B-1.
- **Human-observable form.** Two tabs on one message. In tab 1, start typing, press Save while still
  typing, and keep typing until the saved toast shows. Tab 1 shows no "Message Update Detected"; tab 2
  shows it. Reachability: tab 1's observation can fail only when an edit lands between the send and
  the broadcast's arrival, so a walk that stops typing at Save does not exercise M2-b. Walked before
  release on a local build by UAT (QA's B-1), under `agent-output/CLAUDE.md` "Local builds of
  `website`" (ids moved past 900000000000001 before the first save); that walk fires
  `handoff/local-walk-save-can-write-a-client-sent-low-message-id-2026-11-11.md`, and its brief names
  it. In production after the deploy, his look (QA's B-8). The production look confirms tab 2's
  notice (M2-c) and confirms M2-b only when the window is hit.
- Negative-criterion instrument: the carried AN-1 probe and `MessageProvider/__tests__/usePusher.update-prompt.test.tsx`
  (4 cases at base, none on own-save recognition), tightened first. Rollback: as M1.

### M3 — A stored draft survives sign-in, another tab and an expired-session sign-out (item 4, D-11)

Surfaces at `1ad625e`: `src/utils/withLocalStorage.ts` `set`; `src/utils/hooks/useLocalStorage.ts`
`useLocalMessageStore`; `src/@types/global.d.ts` `LocalStorage`; `MessageProvider/index.tsx` `useValue`:
the route-0 effect (`local.id ? copyIntroMessage() : local`), the `codeMessage` effect, the `message`
effect that writes the store, the fetch effect and its `localMessageStore.set`, `getMessage`'s
newer-local preference, and the upsert's `onSuccess`. Then `src/app/_navigation/Redirects/Client.tsx`
and `src/providers/SessionProvider.tsx`.

**Sibling reading.** `withLocalStorage` / `useLocalStorage` are a generic store serving four typed
keys (`theme`, `frequentlyUsedEmojis`, `message`, `client_preferences`; `global.d.ts` `LocalStorage`).
Their cross-tab re-read on every `storage` event is the sync `theme` and `client_preferences` rely
on, so it is not a bug in the shared pattern. The losses come from one caller choosing one key for
every draft. So the fix is made where the key is chosen, in the draft's caller, and the shared code
changes only where it is wrong for every key: `set` does not catch `setItem`'s quota error.

**Storage form.**

- A new typed member of `LocalStorage`, `messageDrafts`: a map from an entry key to an entry
  `{ data, name, editedAt }` (`editedAt`: the client time of the entry's last write). Entry keys:
  `0:<tab id>` for a route-0 draft, and `<message id>` for a saved message's unsaved edits. It is read
  and written through `useLocalStorage`, and every write reads the stored map immediately before it
  writes, never an in-memory copy.
- The tab id lives in `sessionStorage` under `messageDraftTab`: a random id made on first need. It
  survives a reload and an OAuth round trip in the same tab, and a new tab has none. Deviation, with
  its reason: no sibling uses `sessionStorage`; per-tab identity that survives a reload has no
  sibling.
- The legacy key `message` is kept, with one meaning: the most recently written route-0 draft. It is
  written beside every route-0 entry write and nowhere else (M3-f).
- Most-recent rule: a tab at route 0 that has no entry of its own copies the route-0 entry with the
  greatest `editedAt` under its own key and shows it. With none, it shows the intro message and writes
  nothing until an edit.
- Bound: at most 20 entries. A write that would make 21 first evicts the least recently edited
  entry other than the one being written. The value is agent-chosen; it is decided by keeping many
  times the drafts a user works on at once while the store stays far below an origin's quota of
  about 5 MB. No live population exists (a new key), so the count is read on the walk (B-2) rather
  than measured beforehand. The quota path below bounds size, which the count does not, because a
  not-valid draft can be of any size the JSON editor admits.
- Quota: shared `withLocalStorage.set` stops throwing when `setItem` throws and reports that the
  write did not land, dispatching no `storage` event for it. The draft store then evicts the least
  recently edited entry other than the one being written and retries, until the write lands or no
  other entry remains. Then the write is dropped: the edits stay on the page, and no error reaches
  the editor.

**Write matrix.** Rows are transitions; each cell names the stored class it writes and the writing
path at the tip (today's path at `1ad625e` in brackets, the precedent). R0: this tab's route-0 entry.
Sn: message *n*'s entry. L: the legacy `message` key.

| Transition | R0 | Sn | L |
|---|---|---|---|
| First load after deploy, `messageDrafts` absent | an id-less L becomes R0, `editedAt` from its stored timestamp (migration, in the draft hook) | an L with id *n* becomes Sn | kept |
| An edit at route 0 (typed, Clear, Load, mode switch) | written (`message` effect) [`message` effect writes `message`] | — | written |
| A share code opened at route 0 | written (`codeMessage` effect) [same effect] | — | written |
| Route 0 opened, R0 present | read and shown [route-0 effect] | — | — |
| Route 0 opened, no R0 | the most recent route-0 entry copied in; none, intro shown, nothing written [route-0 effect: `local.id ? intro : local`] | — | — |
| A creating save succeeds (route 0 becomes `/m/<new>/edit`) | removed (upsert `onSuccess`) [the store then holds the new id, so route 0 shows the intro] | — | removed if it holds that draft |
| Message *n* opened (fetch) | — | read; shown when newer than the fetched copy (`getMessage`, rule unchanged); nothing written [fetch effect writes `message`] | — |
| An edit on *n* | — | written while `data` differs from the saved copy; removed when equal (`message` effect) | — |
| This tab saves *n* | — | removed if its `data` equals what was saved (upsert `onSuccess`) | — |
| Another tab saves *n* | — | that tab removes Sn only if Sn's `data` equals what it saved; a diverged Sn stays | — |
| Message *m* opened while Sn exists | — | Sn untouched | — |
| Message *n* deleted | — | unread from then on; leaves by eviction (residue, X-18) | — |
| Sign-out of any kind; the redirect to route 0 | nothing written by the sign-out; route 0 per the rows above | untouched | — |
| Reload; close and reopen | same tab id after a reload; a new tab per "no R0" | untouched | — |
| A 21st entry, or a write refused for quota | eviction per Storage form | eviction per Storage form | a refused L write is dropped |
| A browser duplicates the tab (copies `sessionStorage`) | both tabs share R0: today's last-writer-wins for that pair (residue, X-18) | — | — |
| The website is reverted to the pre-chain code | not read | not read | read by the old code (M3-f) |

Consequence, stated for him: a signed-in user's unsaved edits on one message now survive opening
another message (the row "Message *m* opened"), where today the fetch overwrites the one key.
Steering told him at 22:32Z that a source fix would likely do this; it does.

The loss class is AN-2's rows (`verification/017/analysis/an2/rows-395510e.json`, re-run at
`1ad625e` by QA with identical rows). Where each limb's red comes from is stated on the limb.

- **M3-a (S2). Red at `1ad625e`.** A signed-out draft at route 0 is restored unchanged (deep-equal
  `data` and `name`) after each of: sign in, then open any saved message, then return to route 0;
  sign in, then route 0; reload; close and reopen.
- **M3-b (S3). Red at `1ad625e`.** A signed-in user with unsaved edits on message *n* loses the
  session without using Log out. Members: the session cookie outlives its session, so
  `SessionProvider` calls `signOut()`; and the status turns `unauthenticated`, so `Redirects/Client`
  redirects to route 0. After signing in again and opening *n*, the editor shows the unsaved edits,
  as a reload does today (AN-2 S4). Route 0 meanwhile shows its own draft, not *n*'s edits.
- **M3-c (S5). Red at `1ad625e` (rows 1 to 3).** Decision table over two tabs at route 0:

  | Act | Outcome |
  |---|---|
  | Tab A edits, then tab B edits, then A reloads | A shows A's last draft |
  | A edits, B edits, then B reloads | B shows B's last draft |
  | A edits, B edits, then a new tab opens route 0 | It shows B's draft, the one edited most recently |
  | A edits, then closes; a new tab opens route 0 | It shows A's draft |

- **M3-d — warnings on signed out. Red at `1ad625e`.** `hasChanged` no longer depends on the
  session. For every session status (`authenticated`, `unauthenticated`, `loading`), `hasChanged` is
  true exactly when the editor's data differs from the saved copy's (`typedDeepEqual`). The unload
  class is every document unload from the edit page while `hasChanged` is true; its members at
  `1ad625e` and their outcomes at the tip:

  | Exit | Session | Outcome at the tip |
  |---|---|---|
  | Close, reload, typed URL or bookmark | signed out | the browser's "Changes you made may not be saved." (new; shown to him in D-11) |
  | Same | signed in | the same prompt (unchanged) |
  | `InfoPanel` "Log in" (`signIn`) | signed out | per OQ-8 |
  | `NavMenu` sign-in (`signIn`) | signed out | per OQ-8 |
  | `SessionProvider` `signOut()` on an expired session | was signed in | per OQ-8 (today no prompt, because the status has turned) |
  | `NavMenu` Log out (`signOut`) | signed in | the prompt (unchanged; X-8) |
  | Raw anchors in the embed preview (`EmbedAuthor`, `EmbedTitle`) | either | none: `target='_blank'`, so the page does not unload |

  The Reload confirmation stays unreachable signed out, because route 0 is never a saved message
  (AN-2). The update prompt's loss sentence stays unreachable signed out, because `usePusher.ts`
  subscribes only when `isApiMessage(messageRef.current)` and `Redirects/Client` holds a signed-out tab
  at route 0 (the critic's read).
- **M3-e — the existing store is carried. Green at `1ad625e` by construction; red from a mutation at
  the tip** (the migration dropped). A browser holding `message` as `1ad625e` writes it loses nothing
  it would have restored at `1ad625e`. Members: a route-0 draft with no `id`; a copy of message *n*
  newer than its saved copy; the intro message. Fixtures are literal stored strings, never generated
  by the new code.
- **M3-f — revert-safe. Evaluated at the tip against the old code's reader; red from a mutation**
  (the L write dropped). After a revert of the website to the pre-chain code, the most recently
  written route-0 draft is restored by the old code. Residue: other tabs' route-0 drafts, and every
  saved message's unsaved edits (the old code keeps one key, today's S3 class).
- **M3-g — the other stored keys keep their form. Green at `1ad625e`; red from QA's NM-6.** For
  `theme` (also read raw, with no JSON parse, by `src/app/layout.tsx`), `frequentlyUsedEmojis` and
  `client_preferences` (whose fields include the list-view preferences read in `message/page.tsx` and
  `message/f/[id]/page.tsx`): a value stored as `1ad625e` writes it is read unchanged; every write
  stores the string `1ad625e` stores for the same value; and a write in one tab updates the other
  tabs as today. Fixtures are literal stored strings per key. The one change on these keys, stated:
  a write refused for quota no longer throws.
- **M3-h — the bound holds. Red from a mutation** (eviction removed). For every sequence of writes,
  the map holds at most 20 entries; an eviction never removes the entry being written; and a write
  refused for quota leaves the editor working with the edits on the page. Declined work's fate, in
  operator terms: an evicted entry is gone. The group most exposed is a browser with more than 20
  route-0 drafts or unsaved messages, which loses the least recently edited first.
- **Human-observable form.** Signed out at `/message/m/0/edit`: type a draft, sign in with the test
  account, open a saved message, return to the new-message page. The draft is there. Walked before
  release by UAT on the local stack (`tools/uat-local-stack.sh`), where QA Phase 1 showed Discord
  sign-in to loopback works (QA's B-2). In production after the deploy, his look (QA's B-9). Also
  handed on: `handoff/message-init-cached-edits-lost-2026-08-27.md` (route-0 initialisation), whose
  trigger M3's tests fire. M3-a covers its claim, so M3 discharges it.
- Price (D-11): one new typed key and the tab id; the quota path in the shared `set`; five effects in
  `MessageProvider`; and the two sign-out paths. This is the chain's largest website milestone.
  Rollback: `git -C website revert <M3 commit>`, party as M1, with M3-f's residue.

### M4 — Warn on a link away from an editor with unsaved changes (item 4, D-12)

Surfaces at `1ad625e`: `src/components/StyledLink.tsx`; `src/app/message/layout.tsx`;
`src/app/message/m/[id]/layout.tsx`; `src/providers/ConfirmationProvider.tsx`;
`src/providers/MessageProvider/index.tsx`; `src/utils/hooks/useUnloadAlert.ts`.

- **M4-a — the form** (AF-4; subject to OQ-10). A navigation-guard context is mounted in
  `src/app/message/layout.tsx`, inside `Providers`, around `Navigation` and the children. Its value
  outside any registration is "no guard". `MessageProvider`, which owns `hasChanged` and spans both
  `/edit` and `/send`, registers its guard while mounted and removes it on unmount. `StyledLink` calls
  the registered guard from `<Link onNavigate>` (the one interception Next 16.1.6 offers, AN-2). The
  confirmation is the site's `ConfirmationProvider` dialog, moved from `m/[id]/layout.tsx` up to
  `message/layout.tsx` (its imports at `1ad625e` are React only, AF-4), so the Header, the Sidebar and
  the editor's Reload all use the one provider. Sibling, mirrored: `Navigation.tsx` Reload's use of
  that dialog. Deviation, with its reason: the guard hook returns "no guard" outside its provider
  instead of throwing, as the provider pattern's hooks do (`useMessage`), because `StyledLink` renders
  on pages with no editor (`CookieConsent`, `LandingCTA`, `_layout/Footer`, `Dropdown`, `InfoPanel`).
  `StyledLink`'s props are unchanged.
- **M4-b — the property.** For every link in M4-d's class, when `hasChanged` is true, activating it by
  pointer click or by keyboard (a click with `detail: 0`) shows the confirmation first; Cancel leaves
  the user on the page with the edits intact; confirm navigates. When `hasChanged` is false, no
  confirmation is shown. A link to the same message's `/edit` or `/send` never prompts, the id
  compared exactly, never as a prefix. On every page with no editor mounted, every `StyledLink`
  navigates as at `1ad625e`.
- **M4-c — the dead guard is removed.** At the milestone tip, `git grep -c "next/router" -- src`
  (production files) returns no line, and `useUnloadAlert` keeps only `useBeforeUnload`. Red:
  **Verified** at `1ad625e` by QA's G-6 walk, signed in: with unsaved edits, a click on the link to
  `/message/f/0` showed no dialog and navigated, twice, with a planted `confirm()` seen by the same
  tool as the control (`verification/017/qa-phase1/g6-walk/`).
- **M4-d — the class and its enumerator.** The class: every link rendered on `/message/m/[id]/edit`
  or `/send` whose activation navigates the current tab to a destination other than this message's
  `/edit` or `/send`. Members at `1ad625e` (this planner's read of `m/[id]/_layout/Navigation.tsx`;
  the critic's F-1 and QA's § M4 read of the Header and Sidebar):

  | Link | Where it renders | Routes | In the class |
  |---|---|---|---|
  | `/message/f/0` (user icon) and `/message/f/<guild>` (guild icon), `StyledLink` | `m/[id]/_layout/Navigation.tsx`, inside `MessageProvider` | `/edit`, `/send` | yes |
  | `/message/m/<id>/send`, `StyledLink` (send item) | the same | `/edit` | no: same message |
  | "New", `href: '/message/m/new'`, `target: '_blank'` | the same | `/edit`, `/send` | no: opens a new tab |
  | Header search results to another message's `/edit`, `StyledLink` | `message/_layout/Header.tsx`, above the editor's providers | `/send` | yes |
  | Header link to the current message | the same | `/send` | no: same message |
  | Sidebar `/`, `/message`, `/message/f/<guild>`, `/message/f/0`, `/message/m/0/edit`, `/legal/*`, `StyledLink` | `message/_layout/Sidebar.tsx`, above the editor's providers | `/send` | yes |
  | Raw anchors `href={url}` in `EmbedAuthor.tsx`, `EmbedTitle.tsx` | the editor | `/edit` | no: `target='_blank'` |

  M4's first step re-derives this table at the chain tip from the `next/link` importers and every
  `StyledLink` importer (`git grep -l`), path and symbol, and writes it to the implementation
  document. A member found at the tip that is not in this table is added to the table with its
  disposition before code review.
- **Known limit (X-14).** A navigation made by code (`router.push`/`replace`), a `redirect()`, or
  back/forward cannot be stopped at Next 16.1.6 (AN-2). The ones that leave an editor at `1ad625e`
  are `NewMessageModal`, `SaveAsMenu`, `m/new/page.tsx`, `f/[id]/page.tsx` after a create, and
  `Redirects/Client`. M3 makes the last one lose nothing.
- **Human-observable form.** On `/message/m/<id>/edit` with unsaved edits, signed in, click the user
  icon (the link to `/message/f/0`, the one G-6 clicked): a confirmation appears, Cancel keeps the
  edits, confirm navigates. On `/send`, click the Sidebar's link to `/message`: the same. Walked on
  the local stack by UAT (QA's B-3), and in production by him (QA's B-9).
- Rollback: `git -C website revert <M4 commit>`, party as M1.

### M5 — The stored preview moves only on a confirmed new image; failures are logged (item 2, website)

**M5-0 — gate before M5 or M6 code** (OQ-7). Recorded under `verification/017/m5-0/`.

1. AN-4's render-time distribution. **Met**: p99 3729 ms, max 26275 ms, against the 60 s limit
   (AN-4, `b7b4d08`). T is set from it (M5-f): **T = 40 s**.
2. A `waitUntil` probe. The implementer writes it on a probe branch off the chain branch's base: one
   Pages API route under `src/pages/api/`, plus `package.json` and `pnpm-lock.yaml` for
   `@vercel/functions` (not installed at `1ad625e`, AN-3). The route writes a control line before it
   responds, then passes `waitUntil` a promise that settles after the response and writes a second
   line. Both lines open with the M5-f prefix. A second request to the same route without
   `waitUntil` is recorded beside it (H-2). devops pushes the branch (his approval, D-15; the website's
   workflow files do not show what a branch push deploys, so the push gate applies), confirms the
   preview deployment built, requests the route, and reads the deployment's runtime logs with the
   instrument QA showed returns runtime records (`npx vercel@66.2.0 logs … --json`,
   `verification/017/qa-phase1/vercel-runtime-logs/`; `vercel logs` on CLI 29.1.1 returns build-log
   lines only), within the retention window (under a day, D-17). Before the push, devops establishes
   what the preview deployment's environment connects to (QA's E-6). The probe branch is never merged
   and is deleted after the read, by devops.

   Outcomes: **kept alive** (both lines present); **not kept alive** (the control line present, the
   post-response line absent); **not readable** (the control line absent, or no deployment). Which
   outcome D-15's "fails" names is OQ-9.

If the probe fails in OQ-9's sense, M5 and M6 stop and the plan goes to him with the fallback: the
save awaits only the generator's acknowledgement, the generator copies the last good image under the
new nonce when a render fails, and render failures are logged on the generator host instead of in
Vercel. That fallback departs from D-8's words, so it is his call. A second candidate goes beside it
(AF-8, recorded, not designed here): the generator writes one stable key per message only on
success, and the website adds its rotating nonce as a cache-busting query. It needs no continuation,
no deletion transfer and no new dependency, and it rests on two unread facts: that the CDN keys its
cache on the query string, and how rows naming a legacy key migrate. It also moves D-8's line to the
generator host.

Surfaces at `1ad625e`: `src/server/api/utils/shared.ts` `upsertMessage`, `postMessagePreviewImage`,
`buildMessageValues`, `buildUpsertMessageQuery`, `getMessage`; `src/server/api/utils/deleteMessagePreviewImages.ts`
(the website's bucket helper, sibling, mirrored for the deletion; the delete route keeps calling it
unchanged); `src/server/api/routers/message.ts` `upsert`, `delete`. Dependency added:
`@vercel/functions`, as a deliberate lockfile step (Recommendation 3). Lockfile disposition:
`git diff pnpm-lock.yaml` read; every moved pin is named and dispositioned in the implementation
document; no pin other than the new package and its own dependencies moves.

The outcome classes for one save's request (each limb below is over all of them): 204; 500 (render
or storage failure); 404 (wrong key, path or method); any other status; a network error (refused,
unreachable, reset); no answer within T; the continuation ended by the platform's limit.

- **M5-a — the stored nonce moves only on success, in save order.**
  - *Order token.* The order of two saves of one message is the order of their upserts on its row.
    Each upsert's statement returns the database's clock as read under the row's lock
    (`clock_timestamp()` in the upsert's `RETURNING`), and the save's nonce is minted from it after
    the upsert: `v`, then that time in microseconds zero-padded to a fixed width, then 16 random hex
    characters. Every existing nonce is 32 hex characters (`genUuid().replace(/-/g, '')`), so every
    new nonce sorts above every old one under `COLLATE "C"`. Ties are broken by the random part. No
    reader of the nonce parses it (AF-2's `git grep previewImageNonce` at `1ad625e`: `getPreviewImageUrl`
    and the generator's key interpolate it; the shapes and selects pass it through).
  - *The upsert no longer writes `previewImageNonce`* (`buildMessageValues`, `buildUpsertMessageQuery`
    `doUpdateSet`). A new message's row starts with none.
  - *Commit.* After a 204, the continuation runs one conditional update: set the nonce to *s*'s where
    the row is *m* and its nonce is null or sorts below *s*'s under `COLLATE "C"`, learning in the same
    statement the nonce it replaced. It never inserts.
  - *Property.* For every set of saves of *m*, after their continuations, the row's nonce is the
    greatest-ordered nonce among the saves whose 204 was processed while the row existed; with none,
    it is the nonce the row held before them. The row's other columns are written as today. The
    save's response is unchanged except its `previewImageNonce`, which is the committed nonce (the
    previous one, or null) instead of the nonce of an image not yet made. The response does not wait
    for the generator (QA's NM-17; hazard 3).
- **M5-b — the named image exists.** For every message whose row names a nonce, the object at that
  nonce's key (M5-g) exists at every moment, as the website and generator write and delete it.
  Residue: rows already pointing at a missing object before the release (X-2), and bucket acts
  outside these two programs.
- **M5-c — deletion.** Objects are deleted by the website only, in three forms:
  1. a commit deletes the object of the nonce it replaced, when that nonce is not null;
  2. a continuation whose commit is refused (a later save has committed, or the row is gone) deletes
     its own object;
  3. after its commit, a continuation lists the message's prefix and deletes every object other than
     the one it committed whose age is at least **L = 120 s**, the age measured on the bucket's clock
     (the listing response's `Date` against each object's `LastModified`), never the function's.
     L must outlast the whole life of any continuation (60 s, D-10), inside which its object is
     written and committed, so an in-flight save's object is never collected; the other 60 s cover
     the `Date` header's one-second resolution with room to spare.

  Property: after every completed commit's deletes, the prefix holds the committed object plus only
  objects younger than L at its listing. Keep-only-latest (D-3) is restored at the message's first
  completed commit at least L after an extra object was written. The brief coexistence is a new
  requirement justified by D-2, against D-3. Residue, a bounded class (RK-2): every object whose 204
  no continuation processed (the continuation ended by the platform, or "no answer within T" with
  the render finishing later). Each is removed at the message's next completed commit at least L
  later, and stays for good if the message is never saved again or has been deleted.
- **M5-d — a new message.** A message whose generation has never succeeded stores no nonce, so
  `getPreviewImageUrl` returns the default image until its first success.
- **M5-e — saves and deletes of one message, interleaved.** The table's dimensions are, for saves
  *s1* and *s2* of *m* (upsert order), the position of each save's object write, its answer's
  arrival and class (204 or a failure class), its commit (accepted or refused) and its deletes;
  plus a delete of the message (row delete, then the delete route's purge) at any position. The
  outcomes are M5-a's property, M5-b, M5-c's property and residue, and: after a message delete, no
  continuation recreates the row, and every object a continuation wrote after processing its 204 is
  deleted by that continuation. QA's executable oracle (`verification/017/m5-decision-table/`,
  82 interleavings over 9 class pairs at Phase 1) is re-keyed by QA to this text before the
  implementer's tests read it. An expected value is never computed from production code.
- **M5-f — one log line per failure** (D-8). For every save whose outcome class is 500, 404, another
  status, a network error or no answer within T, exactly one line is written to the function's log.
  It opens with the fixed prefix `preview-image-failure` (`git grep -c` is 0 in both repositories at
  `1ad625e` and `8de2b53`), then names the message id, the outcome class and the elapsed
  milliseconds. It carries no message content, no nonce and no key. On 204, no line is written. A
  continuation the platform ends writes nothing; T exists so that "no answer within T" is logged
  before the platform's cut. T is decided by two values. It must outlast every recorded generator
  success, queueing included: the max is 26275 ms (AN-4), each `<N>` includes the wait for the
  pool's one browser (`max: 1`), and puppeteer's 30 s default navigation timeout ends a hung render
  with a 500 inside it. It must also end at least 5 s before the platform's 60 s cut. So
  **T = 40 s**, which holds for a save whose own work before the continuation takes up to 15 s. The
  save's own duration is unmeasured; a longer one can lose its line (RK-2).
  - *Instrument.* Vercel's runtime logs for the production deployment. Reset semantics: retention
    is under a day on this project (`-s 1d` refused, `-s 23h` served; D-17's read). Feeds: one line
    per failing save. Window: the 23 hours before each read. Non-zero precedent: function stderr is
    readable today, 246 production records in 23 h, 14 on `/api/trpc/message.get` (D-17's read). The
    query selects on the prefix, never on `level:error`, which already counts about 240 unrelated
    lines a day. The read is QA's B-7: a daily crontab reader installed by devops at Stage 1, with
    the `/api/auth/session` cold-start lines as its non-member control and M5-0's probe lines as its
    first real member.
  - *What a count can say.* At AN-4's rate (15 non-successes in 16847 requests; 196 generations in
    30 days) a daily count is expected to read zero whether the line works or not. B-7 is a health
    check; the fixed-versus-unfixed distinction for item 2 is B-4, before release.
- **M5-g — the key contract** (AF-3, QAF-4). Every object key is `[dev/]previews/<message id>/<nonce>.jpeg`.
  The `dev/` prefix is decided on the website by `env.NODE_ENV === 'development'` (the deleter,
  `deleteMessagePreviewImages.ts`, and every new deletion) and `process.env.NODE_ENV` (the reader,
  `src/utils/getCDNUrl.ts`, `/dev`), and on the generator by `config.ENV === 'development'`
  (`src/generateImage.ts`; `src/config.ts` reads `process.env.ENV`). Property: on every environment
  where both run, the website's deletion prefix equals the generator's write prefix. Production: the
  website's `NODE_ENV` is `production`; the generator's `ENV` on its host is unread, and production
  previews resolve under `previews/` without `dev/` (Inference from the working production images,
  chain 016's post-deploy looks). The local walk records both variables' names and values. Every
  listing keeps the trailing `/` after the id (QA's NM-13). Tests use literal keys.
- **Cost** (AF-7). Each save now holds a function instance for the generator's round trip (AN-4
  median 2197 ms, bound T = 40 s) on a project without Fluid compute (D-10, Inference), where today
  it holds none. His valuation that costs are immaterial (`preview-image-generator.md` P-1) rests on
  facts holding, so the cost is put in front of him in the revision-2 report.
- **Human-observable form.** On a local build with the generator stopped, save an edit to a message
  that has a preview. The message list keeps showing the old preview. Start the generator and save
  again: the new preview shows. Walked by UAT on the local stack (QA's B-4). The rig, built by the
  implementer as M5's last step and handed to UAT: a loopback S3 stub that serves the objects it
  stores over HTTP; `CDN_ENDPOINT` and `NEXT_PUBLIC_CDN_HOST` pointed at it in the process
  environment and checked on the stub's request log, because `.env.local`'s `CDN_ENDPOINT` is a real
  DigitalOcean Spaces host and the website now deletes there (QA's E-9); the generator from the chain
  tip pointed at the same stub. `verification/015/m8-local-probe/`, read by the critic (F-11), forks
  the built server with dead endpoints and has no S3 stub or answering `/preview`, so it is not a
  precedent for this rig. Every process the rig starts is stopped, and its files removed, by the
  stage that started it on every exit path. In production, his look after the deploy: a normal save
  updates the preview (QA's B-6).
- Rollback: `git -C website revert <M5 commit>`, party as M1; the revert carries the lockfile back.
  The order against the generator is in § Release and rollback.

### M6 — The generator writes only a confirmed image and deletes nothing (item 2, generator)

Surfaces at `8de2b53`: `src/generateImage.ts` (default export, `generateMessagePreviewImage`,
`deleteMessagePreviewImages`), `src/server.ts` `processImage`, `src/config.ts`. The repository has no
tests (workspace `CLAUDE.md`). Verification is by probe under `verification/017/m6-probe/`.

- **M6-0 — the probe rig, built first, by the implementer.** In an export of the generator's chain
  tip, with its own `npm ci` from `package-lock.json` and puppeteer's Chrome: a loopback S3 stub that
  records every put and every delete; a stub `/preview` that answers 200, 404, 500, a hang past
  puppeteer's 30 s timeout, a reset and a 300. It runs network-isolated (`unshare -rn` with loopback
  raised). No precedent exists for it (F-11's read of `verification/015/m8-local-probe/`). The
  implementer stops it and removes the export on every exit path, and records both in the
  implementation document.
- **M6-a — 204 means the object for this nonce was written.** A request that passes the body and key
  checks is answered 204 exactly when its object (M5-g) was stored, and 500 otherwise, with nothing
  written. The render-path members answered 500:
  - `page.goto` rejects;
  - `page.goto` resolves with `null`, or with a main-resource status outside 200 to 299. At
    puppeteer-core 21.1.0 (`package-lock.json` at `8de2b53`), `goto` "will not throw an error when
    any valid HTTP status code is returned by the remote server, including 404 "Not Found" and 500
    "Internal Server Error"" (`lib/types.d.ts` of the published 21.1.0 tarball, sha256 `1e317926…`,
    read by this planner);
  - the screenshot rejects;
  - the put rejects.

  Unchanged: a bad body answered 500 and a wrong key, path or method answered 404, both before
  render. Residue: a request whose pool acquire never resolves is not answered at all
  (`system-architecture.md`, the generic-pool Problem Area); the website logs it as "no answer
  within T".
- **M6-b — the generator deletes nothing.** No request to this service deletes an object. Deletion
  is the website's (M5-c).
- **M6-c — its log lines keep their interface** (`preview-image-generator.md` A-1). `Server running
  at`, `Server received`, `Created instance`, `POST /generate` and the drain-complete line keep their
  text and emission count. `Generated image for message … in <N>ms` keeps its text, because AN-4 and
  later reads use it. New (AF-7): one always-on line per render-path failure, opening with the
  `preview-image-failure` prefix and naming its class (`goto-rejected`, `error-status`, `screenshot`,
  `put`), the message id and the elapsed milliseconds, with no content, nonce or key. Its shape is
  added to `verification/015/pig-host-read.sh` in the same change.
- The request contract is unchanged: `id`, `nonce` and `message` in, a status out. So Exclusions X-4
  (body validation) holds.
- **Security review** of the delta before release (stage set).
- Rollback: `git -C preview-image-generator revert <M6 commit>` on `prod`, pushed by devops on his
  word, deployed as § Release and rollback states.

### M7 — Lint baseline recorded; release readiness (item 5, D-9)

- **M7-a — baseline recorded as accepted.** At website `1ad625e`, through the shared install, by this
  planner (`verification/017/entry/lint-1ad625e/`, 454 files):
  - before fixes: 314 errors and 367 warnings in 112 files;
  - what the lint script (`eslint --fix . --max-warnings=0`) leaves after ESLint's fixes: 50 errors
    and 364 warnings in 71 files. Per rule: `summary.txt`.
  The critic re-summed both captures and matched them (critique pass 1, Premises). The architect's
  closing pass restates the Problem Areas row "ESLint carries known findings" from this capture, with
  its count and instrument, as accepted.
- **M7-b — the chain adds no finding.** At the chain's website tip, for every file the chain changed,
  each rule's count in the no-fix report is no higher than at `1ad625e`, and every new file has none.
  Instrument: the same two commands at the tip, in an export, compared per file and per rule. Run by
  the implementer before code review and by QA at Phase 2. Agent-authored criterion; it keeps D-9's
  baseline true at the release.
- **M7-c — nothing enforces lint** (chain A CR-3). Recorded, not fixed, under D-9: Exclusions X-12.
- Release readiness: § Release and rollback. QA Phase 3 runs at the merged tip in each repository.

## Testing Strategy

- **Website.** The standard is `agent-output/CLAUDE.md` § Test Conventions: vitest, placement and
  naming, axioms A to E, DOM tests for `.tsx` mounted with `createRoot` and `act`. Expected types:
  - M1: renames, a deletion, and new exact-text assertions (DOM);
  - M2 and M3: DOM tests mounting the real `MessageProvider`, with AN-1's and AN-2's probes as the
    carried instruments; M3-g and M3-e with literal stored strings;
  - M4: DOM tests of the link class, mounting the message layout's guard context;
  - M5: Node tests of `upsertMessage`'s continuation, with fetch, the bucket, the database and
    `waitUntil` substituted (the substitute records the promise and the test settles it),
    mirroring `src/server/api/utils/__tests__/shared.upsert-valid.test.ts` and its
    `helpers/capturingDatabase`; the M5-e oracle read by them once QA has re-keyed it.
  A run counts only with process exit 0 beside the counters, and `pnpm run typecheck` covers both
  programs. Critical scenarios: every limb red where the limb names its red, and the M5-e table.
  QA's named mutants NM-1 to NM-21 bind the implementer (QA Phase 1, § Named mutants).
- **Generator.** No suite. The M6 probe (M6-0's rig) runs on this box.
- **Hosts and instruments per milestone.**
  - This box: vitest, the probes, lint, the local walks.
  - The generator host: AN-4's read and B-10, through the read-only alias `ssh hooks-pig`.
  - Vercel: M5-0's preview deployment and B-7, read with `npx vercel@66.2.0 logs … --json` (exists
    on this box: QA ran it, D-17).
  - Production, after the deploy: his looks (B-6, B-8, B-9).
- **Pre-landing probe against post-landing gate.** M5-0 runs every cell that does not need the
  landed tree: the `waitUntil` cell (and its control), and the render times, which are met. M5-a to
  M5-g are the post-landing gate.
- **A changed tool used as a gate's instrument.** `verification/015/pig-host-read.sh` gains M6-c's
  shape in this chain and is B-10's instrument; B-10 runs the changed script beside AN-4's unchanged
  count script, whose output is recorded with it.

## Validation

Run once at the named trees by this planner on 2026-11-18, captures under `verification/017/entry/`:

- Website `1ad625e`, suite: 1508 of 1508 passed, 123 files, exit 0 (`base-1ad625e/vitest.json`,
  `vitest.exit`). QA reproduced it in its own export (QA Phase 1, Premises).
- `pnpm run typecheck`: exit 0.
- Lint baseline: M7-a.
- Serving refs (`release/`):
  - website: one serving ref (`master`), no pair;
  - preview-image-generator: `master` `87dcb41` is contained in `prod` `8de2b53`
    (`merge-base --is-ancestor`: master in prod 0, prod in master 1);
  - project-utils: one serving ref.
- Environment premises carried, each dated: Vercel production has a 60 s function timeout
  (Observed) and no Fluid compute (Inference) (analyst, 2026-11-18T23:12Z,
  `an3/vercel-api-project-record-extract.txt`). Production served `395510e` at 2026-11-18
  (`an3/vercel-inspect.txt`); chain A's release then moved `master` to `1ad625e` (`git ls-remote`,
  22:4xZ). Runtime-log retention under a day (QA, 2026-11-18T23:43Z, D-17).

## Risks

| RK | Risk | Falsifier (carrier) | Record per review pass |
|---|---|---|---|
| RK-1 | `waitUntil` does not keep post-response work alive in this route, so previews stop updating | M5-0 limb 2; after release, his look at a saved message's preview (QA's B-6) | — |
| RK-2 | A continuation ends before it processes its answer (the platform's cut, a save longer than 15 s, a render past T): a stale preview (safe), an orphan object (M5-c's residue), and a "no answer" line or none | AN-4: max 26275 ms over 16832 successes; after release, B-7's daily count of `preview-image-failure` lines with class "no answer within T" | — |
| RK-3 | Own-save recognition suppresses a real remote update (hazard 4) | M2-c's members; residue as stated in M2 | — |
| RK-4 | The storage change loses a draft already in a user's browser at first load | M3-e's fixtures | — |
| RK-5 | Two saves of one message, or a save and a delete, commit the wrong nonce, delete the committed object or resurrect a row | M5-e's oracle, re-keyed to revision 2 | — |
| RK-6 | The generator deploy stops a process mid-render | `handoff/preview-image-generator-drain-under-load-unobserved-2026-11-08.md`, devops's read | — |
| RK-7 | Stored messages whose `/preview` render answers an error status stop being re-imaged and keep their stale image (unclosed-assumptions item 7) | QA's B-10: devops reads the generator's failure count 30 days after the generator deploy, against AN-4's 15, through the carrier handoff devops mints at Stage 1 | — |
| RK-8 | M4 misses a link | M4-d's table re-derived at the tip against `git grep -l` of the `next/link` and `StyledLink` importers | — |
| RK-9 | The database clock steps backwards between two saves of one message, so a later save's nonce sorts below an earlier one's and is refused: the earlier save's preview shows until the next save | none measured; a stale preview, never a broken one (M5-b holds either way) | — |
| RK-10 | The website's and generator's `dev/` predicates disagree on an environment, so deletions miss (a leak) | M5-g; the local walk's recorded values | — |

## Release and rollback

- **Order: website first, then the generator.** In the window with the new website and the old
  generator, behaviour is today's: the old generator still deletes before it renders, so a failure
  shows a broken image. In the reverse window (old website, new generator), nothing deletes the old
  objects (a leak), and the website still rotates the nonce unconditionally. So the generator waits
  until the website release is verified live. Rollback runs the reverse way: the generator is
  reverted first (deletion restored) and confirmed deployed, then the website.
- **Website:** `master` fast-forward to the chain tip, pushed by devops on his word; Vercel deploys.
  Dry run and report: `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master <tip> --dry-run`.
  Deploy evidence: QA's B-11 (`vercel inspect` commit contained in the release).
- **Generator:** `prod` fast-forward, pushed by devops on his word; `prod.yml` runs on a self-hosted
  runner on the host. Per `preview-image-generator.md` P-3, a push while the runner is down queues
  the job and deploys nothing; at chain 015's release the generator deployed 24 minutes after the
  push because he had to start the runner. So: **owner step**, written as a file under
  `verification/017/` by devops and printed for him (`owner-steps` skill) — start the runner when
  devops reports the job queued and no host start line after the push. Deploy evidence: the host's
  generator start line after the push, read through `ssh hooks-pig` (B-11), never the push alone.
  The same holds for the rollback push, and the website's revert waits on that evidence. `master`
  follows so that `prod` keeps containing it. The host has a `-preview` instance
  (`verification/015/pig-host-read.sh` header), but no `preview` branch exists at the remote. Whether
  to use it is devops's call, and it is a hazard line.
- **Cross-repo contract.** The cross-repo-contract skill
  (`~/.claude/agent-skills/cross-repo-contract/SKILL.md`, read by the critic and the architect) asks
  for no contract file; it governs shared types and pinned dependencies, and the two repositories
  share neither. The contract is HTTP plus the bucket's keys: what 204 means (M6-a), who deletes
  (M5-c, M6-b) and the key form (M5-g). QA reads the skill's Shared Types rule as applying because
  each side re-implements the prefix; with no type to share across these repositories, M5-g's
  criterion is how the plan carries it. Its home is `system-architecture.md` Runtime Flow 3 and
  `preview-image-generator.md`, reconciled from the implemented tree by the architect's closing pass,
  no later than devops Stage 1 (AF-9).
- Handoffs this release fires: the drain handoff (generator stop); none of the generic-pool,
  host-posture or API-key handoffs, because no lockfile pin of puppeteer or generic-pool moves and no
  workflow or `deploy.sh` file is edited.
- Launch directory for spanning stages: `/usr/local/bin/hooks` (two product repositories and the
  record).
- QA sequencing: QA Phase 1 runs before implementation (stage set); its re-key to revision 2 is owed.

## Entry facts (per repository)

Read 2026-11-18 by this planner unless marked.

| Repository | Ref read | Hooks | Tracked build output | Consequence |
|---|---|---|---|---|
| website | `origin/master` `1ad625e` (chain A released 22:41Z; `git ls-remote`); the tree on `master` at `1ad625e` at 23:5xZ | `core.hooksPath` unset; no non-sample hook in `.git/hooks` | none under `dist`/`build`/`.next` | This chain's branch is cut at implementation start by steering. |
| preview-image-generator | `origin/prod` `8de2b53`, `origin/master` `87dcb41` | none | none tracked under `dist`/`build` | No tests and no installed `node_modules` on this box; M6-0 installs in an export. |
| project-utils | `origin/master` `749606d` | `.githooks/pre-commit` rebuilds and refuses a commit that leaves modified files | `dist/` tracked (13 files) | Read only; no change planned (X-5). |
| agent-output | `master` | — | — | `tools/open-handoff-trigger-sweep.py` does not exist; the handoff enumeration was made by reading every open handoff's frontmatter. |

Gate refusals in this planner's run, each disclosed and not retried in another form:

1. A helper's `grep -rn` over an export of website `src` (named the generator's `prod.yml`;
   `verification/017/entry/disclosure-refused-grep.txt`).
2. This planner's `grep` with relative paths after a `cd` into the generator. It was re-issued once
   with absolute paths, which show the gate its true target, the form the gate's message names. It
   found no `node_modules`.
3. This planner's recursive `grep` over `uat qa verification/016` for a preview URL. Not re-issued.
   The CDN question it served was dropped from the design.

### Open handoffs whose trigger this chain fires

Enumerated from all 22 open handoffs' `Review-Trigger` (a python read of each frontmatter, this
planner, 2026-11-18T23:5xZ, re-run at revision 2 because § Release and rollback changed). Since
revision 1, `upload-message-dialog-closes-on-first-portal-load-2026-11-08` is closed and
`anchored-popover-first-load-test-is-order-dependent-2026-11-18` is open.

| Handoff | Disposition |
|---|---|
| preview-image-failure-shows-broken-not-stale-2026-08-24 | Discharged by M5 and M6. |
| save-originating-tab-raises-its-own-update-prompt-2026-08-25 | Discharged by M2. |
| unsaved-change-guards-disabled-for-unauthenticated-users-2026-08-24 | Discharged by M3 and M4. Items 1 to 3 by M3-d; item 4 by M4. |
| website-tests-not-beside-their-module-2026-11-08 | Discharged by M1-a and X-13. |
| editor-error-lines-render-text-unasserted-2026-11-11 | Discharged by M1-c. |
| message-init-cached-edits-lost-2026-08-27 | Discharged by M3-a. |
| local-walk-save-can-write-a-client-sent-low-message-id-2026-11-11 | Named in the briefs of the M2, M3 and M5 walks; UAT reads it. |
| preview-image-generator-drain-under-load-unobserved-2026-11-08 | Fires at the M6 deploy; devops. |
| bug-evaluation-fixes-unclosed-assumptions-2026-11-08 | Item 3 (only the website calls `/generate`): M6-b means another caller's objects would accumulate, not vanish; it stays QA's. Item 7: RK-7, B-10. |
| qa-014-bc7-closing-observation-and-test-inventory-2026-11-10 | QA's, at Phase 1. |
| preview-image-generator-api-key-in-workflow-files, -host-security-posture, -generic-pool-private-field | Not fired (no workflow, `deploy.sh` or puppeteer/generic-pool pin change). |
| anchored-popover-first-load-test-is-order-dependent-2026-11-18 | Not fired: its test file is not edited by this chain. |
| the other nine | Not fired (re-checked against M1 to M7 at revision 2). |

## Exclusions

| X | Exclusion | Reason | Carrier |
|---|---|---|---|
| X-1 | Retention beyond M5-c's transient coexistence | D-3 | Stated limit |
| X-2 | Rows already pointing at a missing preview object | Determination Out; no DB instrument on this box. After release, a resave repairs a row. | Stated limit |
| X-3 | The generator host's security posture | Accepted by him | `handoff/preview-image-generator-host-security-posture-2026-11-08.md` |
| X-4 | `/generate` body validation | The request contract is unchanged (M6), so the determination's rider condition does not fire | `architecture/system-architecture.md` Problem Areas row |
| X-5 | project-utils schema change | The order two saves need rides in the nonce itself, minted from the database clock (M5-a, AF-2's option a); every reader of the nonce only interpolates or passes it | Stated limit |
| X-6 | The Pusher app per environment | Determination Out | Stated limit |
| X-7 | The Enter-key compare in the dialogs | Determination Out (015 D30, X-18) | Architecture Problem Areas row |
| X-8 | A prompt on the signed-in Log out beyond today's | Determination Out. M3's source fix also keeps the edits through Log out; the browser's unload prompt there is unchanged (M3-d). | Stated limit |
| X-9 | Delete, Clear, Load and mode-switch confirmations | Determination Out; they work for both | Stated limit |
| X-10 | Recommendations 2, 3 and 5; `TODO.md` items | Determination Out. Recommendation 3 binds M5's lockfile step. | Stated limit |
| X-11 | The 50 errors and 364 warnings the lint script leaves | D-9 | Architecture Problem Areas row, restated in the architect's closing pass (M7-a) |
| X-12 | Nothing enforces lint: no workflow or hook runs ESLint, and `next build` does not lint. Chain A's `no-restricted-syntax` rule has two phrasings it cannot see (0 members) | D-9 ("no source files change") | Architecture Problem Areas row (M7-c); chain A CR-3 |
| X-13 | `cron.scheduled-selection` and `interactions-edge.signature-before-parse` stay in `src/server/api/__tests__/` | Their modules live under `src/pages/api/`. Next 16.1.6's default `pageExtensions` are `tsx, ts, jsx, js` (`next/dist/server/config-shared.js`), `next.config.js` sets none, and `next/dist/build/entries.js` has no `__tests__` exclusion (`grep -c` 0). So a test file there would be built as an API route. Read, not run; steering's helper ran it under webpack (`steering/017-rulings.md` block 23:24Z), Turbopack not run. | `agent-output/INBOX.md` entry "2026-11-18 — planner-hooks-017 — DECISION NEEDED" (a Placement exception in `CLAUDE.md`), left uncommitted for the record's owning session |
| X-14 | Navigations that cannot be stopped: `router.push`/`replace`, `redirect()`, back/forward | D-12; Next 16.1.6 (AN-2) | Stated limit; UAT row |
| X-15 | `beforeunload` on the send page | `useUnloadAlert` is mounted on the edit page only. Edits survive in storage (M3), so closing the send page loses nothing. | Stated limit |
| X-16 | Pre-013 history of the own-tab notice (G-5) | No criterion rests on it | Stated limit |
| X-17 | A fallback at the preview read sites (`getPreviewImageUrl` and its callers) | The determination puts them in scope only if the design adds a fallback there; M5-b makes every committed nonce name an existing object, so none is added | Stated limit |
| X-18 | Draft-store residue: an entry for a deleted message until eviction; two tabs sharing one id after the browser duplicates a tab | Neither loses work today's store keeps; both are bounded by M3-h's 20 entries | Stated limit |
| X-19 | Orphan preview objects whose 204 no continuation processed, under a message never saved again or deleted | M5-c's residue; removing them needs a sweep outside a save, which no design here has | Stated limit; RK-2 |

## Planner batch

| Item | Source row | Disposition |
|---|---|---|
| Generator `page.goto` does not reject on an HTTP error status | steering-roadmap, `verification/017/steering-refute/` (c2) | Discharged at revision 1: M6-a, re-derived at puppeteer-core 21.1.0's published source. |
| Nothing enforces lint (chain A CR-3) | `code-review/closed/fix-dialog-closes-on-first-portal-load-code-review.md` CR-3 | Discharged at revision 1: M7-c, X-12. |
| Base moved to website `1ad625e` | steering-roadmap | Discharged at revision 1: every cited line re-read at `1ad625e`, or shown unchanged from `395510e` by `git diff --quiet`; suite and lint re-taken there. |
