---
ID: 017
Origin: 017
UUID: 5c3e9a71
Status: Active
Status-Detail: "Revision 1: milestones M1 to M7 written on the owner's six selections of 23:08Z; ready for critique, the architect's conformance pass and QA Phase 1. Implementation waits on those gates and on the website tree being given to this chain's branch. M5 and M6 (item 2) additionally wait on gate M5-0's remaining limb (OQ-7: the waitUntil preview probe, a push behind his approval); its render-time limb is met (AN-4)."
Revision: 1
Plan-ID: 017
Target-Release: "website master (Vercel production) first, then preview-image-generator prod (prod.yml), each push his word, run by devops. Order and reason: § Release and rollback. Neither package.json carries a version field (git show 1ad625e:package.json, 8de2b53:package.json), so no version artifact moves."
Epic-Alignment: "Hooks.gg existing-items queue: the commission of 2026-11-18T21:53Z (items 2 to 5 of the five-item ranking), under his 2026-11-11 ruling that new feature work waits until the existing items are handled (steering/queue-hooks-rulings.md, selection 2)."
Lane: "full chain, set by the scoping determination (rulings block 2026-11-18T21:59Z, Pipeline). Not proposed small: M5 changes the shared save path and a second service's contract; M2 changes the notice every editor tab runs; M3 changes the browser-stored draft every editor reads."
Architectural-Surface: "Yes; the architect's conformance pass is a named step (stage set). (1) A cross-repo contract: bucket deletion moves from the generator to the website, and the stored preview nonce commits only after the generator's answer (M5, M6). (2) Post-response work in the save path through @vercel/functions waitUntil, a new dependency (M5). (3) A stored representation: the browser's draft storage (M3). Architecture lines the chain closes or invalidates: system-architecture.md Runtime Flow 3 (who deletes), Problem Areas rows 'A failed preview generation shows a broken image', 'enforceImportMutualExclusivity is dead', 'ESLint carries known findings'; Recommendations 1, 4, 6; website.md A-6 (persist also records the tab's own save)."
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

## Reading Order

| Role | Sections, in order |
|---|---|
| implementer | Decisions Register · Milestones (the one being coded) · Testing Strategy · Exclusions · Release and rollback |
| code-reviewer | Decisions Register · Milestones · Exclusions · Risks |
| qa | Milestones · Testing Strategy · Validation · Risks · Exclusions |
| uat | Value Statement and Business Objective · Milestones (each "Human-observable" line) · Exclusions |
| devops | Release and rollback · Entry facts · Milestones M5-0 and M7 · Risks |

Owed re-verdicts:

| Limb | Decidable since | Owning gate | State |
|---|---|---|---|
| — | — | — | none at revision 1 |

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
| D-3 | Keep-only-latest is intended; no retention requirement exists | 2026-08-24 | *"Intended. There's no purpose for retention."* (corrected by him the same day from a typo). `architecture/preview-image-generator.md` P-5 | Owner withdrawal only. M5's brief coexistence of two objects is a new requirement justified by D-2 and stated as one (M5-c). |
| D-4 | The back end stores what the front end allows; no server-side gate on save | 2026-08-24 | *"…I'd say that the back-end reflects what the front-end allows. If a shape is allowed in the front-end, then it's not silently morphed in the back-end…"* (full text `architecture/website.md` W-2; D-005) | Owner withdrawal only. |
| D-5 | Cross-tab divergence is flagged, not coordinated | 2026-08-24 | *"…flag when front-end state doesn't match back-end because of a different tab saving"*. `architecture/website.md` W-6 | Owner withdrawal only. M2 keeps the cross-tab flag (BC-14 limb c) and adds no merge or lock. |
| D-6 | No new feature work in this chain | 2026-11-11 | *"…this new stuff is planned after the existing items are handled"*. `steering/queue-hooks-rulings.md`, selection 2 | Owner withdrawal only. |
| D-7 | The four user stories are approved as worded | 2026-11-18 | Selected: "Agent: proceed on all four (Recommended)". Shown: "The planner writes milestones for all four stories as worded, in revision 1." | Owner withdrawal only. |
| D-8 | The website logs one line per failed or unreachable preview; nothing user-facing | 2026-11-18 | Selected: "Agent: website logs failures (Recommended)". Shown: "The website writes one line per failed or unreachable preview to Vercel's logs. No user sees anything; failures become countable." | Owner withdrawal only. Consequence: the website must learn each generation's outcome, including a render failure answered seconds after the save has replied. This fixes M5's mechanism as post-response work (OQ-3 below). Criteria: M5-f. |
| D-9 | Lint: record the base result as accepted, fix none | 2026-11-18 | Selected: "Agent: accept, fix none (Recommended)". Shown: "Record today's result as the known baseline; no source files change, so the chain's diff stays on its four items." | Owner withdrawal only. Criteria: M7-a, M7-b; Exclusions X-11, X-12. |
| D-10 | The Vercel project settings are read read-only under the hooks-gg team | 2026-11-18 | Selected: "Agent: read under hooks-gg (Recommended)". Shown: "The analyst runs 'vercel project inspect hooks-gg-website --scope hooks-gg', read-only, and records both values." | Executed by the analyst (analysis 017 `1534ec4`, G-1): no Fluid compute, 60 s function timeout. Reopens on a change to the project's function settings (the same read). |
| D-11 | Item 4: fix the stored-draft losses at their source and turn the existing warnings on signed out | 2026-11-18 | Selected: "Agent: fix at source + warnings (Recommended)". Shown: "Fix the shared-draft losses at their source, so a draft survives sign-in, another tab and the expired-session sign-out, and turn the existing warnings on for signed-out users too. More work than the handoff; revision 1 prices it." | Owner withdrawal only. Criteria: M3. Price: M3's scope (§ Milestones). |
| D-12 | Warn on a link click away from an editor with unsaved changes, for everyone; record what cannot be stopped | 2026-11-18 | Selected: "Agent: warn on link clicks (Recommended)". Shown: "Warn when someone clicks a link away from an editor with unsaved changes, for everyone (a new prompt signed-in users will see), and record the navigations that can't be stopped as a known limit." | Owner withdrawal only. Criteria: M4; limit: X-14. |
| D-13 | AN-4's host read is made without asking him | 2026-11-18 | Agent-authored, by steering-roadmap: a read through the read-only alias `ssh hooks-pig` is made under the lifecycle Standing Default (`steering/017-rulings.md` block 23:15Z). Not his words. | Withdrawal by him or by steering. |

## Assumptions and open questions

OPEN QUESTION [RESOLVED]: OQ-1, failure visibility. Answered by D-8.

OPEN QUESTION [RESOLVED]: OQ-2, item 2's reach. The unit is one save of one message, and the reach
is every save that requests a preview (`upsertMessage`, both request sites). A brand-new message
whose first generation fails stores no nonce, so it shows the default image (M5-d). Agent-authored;
a mechanism choice inside the agreed scope.

OPEN QUESTION [RESOLVED]: OQ-3, item 2's mechanism. `after()` throws in the Pages Router tRPC route
(AN-3, verified locally at Next 16.1.6). D-8 needs the outcome of a render that finishes after the
save replies, so the design is post-response work through `@vercel/functions` `waitUntil`, under the
project's 60 s limit (D-10). Whether `waitUntil` works from this route, and whether renders fit the
budget, are gate M5-0 (OQ-7).

OPEN QUESTION [RESOLVED]: OQ-4, item 3. Answered by AN-1: at `395510e` no enumerated save raises the
notice in the saving tab. The one live path is an edit typed while the save is in flight (M2).

OPEN QUESTION [RESOLVED]: OQ-5, item 4. Answered by AN-2 and D-11 (M3, M4).

OPEN QUESTION [RESOLVED]: OQ-6, lint. Answered by D-9 (M7).

**OPEN QUESTION OQ-7 (blocks M5 and M6 code only; the subject of gate M5-0 limb 2).** That a promise
passed to `waitUntil` from `src/pages/api/trpc/[trpc].ts` keeps running after the response on this
project is unestablished (AN-3 G-2; Inference from Vercel's documentation, not executed). Gate M5-0
settles it before M5 or M6 code starts. If it fails, the plan stops and goes to him with the
fallback (M5-0). His word is needed for the probe deployment (a push; see M5-0). Everything else
proceeds. The render-time half of the former question is closed by AN-4 (M5-0 limb 1).

Revision 0's scope assumptions, each now stated as a criterion: unit and reach (M5-a), layer (both
repositories, M5 and M6), whether item 3 is live (M2), and severity (M3).

## Analysis commissioned

Analysis: `analysis/017-existing-items-backlog-analysis.md`. AN-1 to AN-4 are answered (`b7b4d08`).

- **AN-1 (item 3).** Answered: no enumerated save raises the notice at `395510e`; an in-flight edit
  does. Instrument: `verification/017/analysis/an1/own-save-broadcast.probe.tsx`.
- **AN-2 (item 4).** Answered: losses S2, S3 and S5, and the dead navigation guard. Next 16.1.6
  offers only `<Link onNavigate>` `preventDefault`.
- **AN-3 (item 2).** Answered: `after()` is unavailable in this route. `waitUntil` is documented but
  unexecuted (G-2). Production serves without Fluid compute, with a 60 s limit (G-1).
- **AN-4 (item 2, gap G-3).** Answered (`b7b4d08`, captures `verification/017/analysis/an4/`): 16832 production successes from 2023-08-22 to 2026-11-18, render plus store median 2197 ms, p95 2932, p99 3729, max 26275, none at 30 s or more. 15 requests did not succeed (about 0.09%; 10 of the 15 error-log stack heads are `TimeoutError`). The `-preview` instance has served 0 requests. The commission as written: the distribution of the
  production generator's render-and-store time, read from its own out log on its host: n, min,
  median, p95, p99 and max of the `<N>` in `Generated image for message … in <N>ms` (logged on each
  success, `src/server.ts` at `8de2b53`); the span the log covers; and a count of failure stacks over
  the same span where a count-only form gives one. Do the same for the `-preview` instance if it has
  lines. Route: the read-only alias `ssh hooks-pig` as `claude-ro`, the way
  `verification/015/pig-host-read.sh` reads (steering ruling `steering/017-rulings.md` block
  2026-11-18T23:15Z). Use fixed-shape greps that print only durations or bucket counts: no ids, no
  nonces, no whole lines, no pm2 command, no write on the host. A refused read is recorded and not
  re-issued. Purpose: it sets the save continuation's timeout against the 60 s function limit (G-1).

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
  file there testing `isMessageValid`; that is placement, not duplication. The four files move by
  `git mv`, so their blob ids are unchanged (`git rev-parse <rev>:<old>` against `<new>`). The one
  exception is an import path a move breaks, which the implementer lists per file.
- **M1-b — `enforceImportMutualExclusivity` is deleted** (Recommendation 6, "Delete … or route it
  through `isMessageV2`"). Delete is chosen because it has no production caller: at `1ad625e`,
  `git grep -n enforceImportMutualExclusivity 1ad625e -- src` finds its definition in
  `src/utils/index.ts` and the rest in `src/utils/__tests__/limits.import-validation.test.ts`. The
  test file's `describe('enforceImportMutualExclusivity', …)` block is deleted with it. Its
  `validateContentRequirements` and `hasV2Components` blocks stay, with an identical case count and
  pass set. Property: at the milestone tip, `git grep -c enforceImportMutualExclusivity -- src`
  returns no line. The suite's cases change only by the deleted block's members, enumerated by title
  from the base run's JSON. Typecheck exits 0 (`pnpm run typecheck`). Sibling: Test Conventions
  "Superseded implementation" (delete; the current implementation is covered by
  `messageMode.detection.test.ts`, which the implementer mutation-checks once, per that row).
- **M1-c — the editor's error lines assert their exact text** (`handoff/editor-error-lines-render-text-unasserted-2026-11-11.md`).
  The class is every error line `src/components/DiscordMessageEditor/index.tsx` renders, five at
  `1ad625e`: `noContentError`, `embedCharacterError`, `v2TextError`, `componentCountError`,
  `v2ComponentError` (file unchanged from `395510e`, `git diff --quiet`). Property: for each member,
  with its error set and the others empty, the line's rendered text equals its reason string exactly.
  The accessories container and the region after each line carry no text node of their own. Each
  expected value is a literal, never computed from `limits.tsx` (axiom E). The test is shown red
  against each of the five mutants in `verification/016/qa-sweep-395510e/kill-table-395510e.json`
  (axiom A), and green with `hideValidation` set, where no error line renders. Before adding a test,
  name and tighten the existing editor test that covers the surface: `DiscordMessageEditor/__tests__/`
  holds `component-limit` and `duplicate-placement` at `1ad625e`.
- Rollback: `git -C website revert <M1 commit>`, by the implementer on the chain branch before
  release, by devops on `master` after it. Handoff notes: `usePusher.hash-parity` lands at its new
  path before M2 edits it, which fires that handoff's trigger and discharges it.

### M2 — The saving tab recognises its own save (item 3)

Surfaces: `src/providers/MessageProvider/usePusher.ts`, `useApiMethods.ts` `persist`,
`MessageProvider/index.tsx` (wiring), read at `1ad625e`. Sibling, mirrored: `website.md` A-6. The
editor persists its own message through one step, `persist`, and the tab's record of what it sent
is taken there and nowhere else. A new persisting path inherits it by going through `persist`.

- **M2-a — absence over the enumerated class** (AN-1's class, carried and re-derived at the chain
  tip). For every member of {Classic, V2, not-valid draft that passes the shape} × {nothing changed,
  after an edit, an edit leaving trailing whitespace, "Choose which to keep" → each option, V2 beside
  an empty embed}, in both delivery orders (the broadcast before the save's response, and after it),
  the saving tab raises no "Message Update Detected". This is a pinned absence: green at `1ad625e` for
  every member. The red that makes it evidence is AN-1's run at `a74b9e2`: the "Choose which to keep"
  members raise it (`an1/rows-a74b9e2.json`). QA re-runs that red against the carried instrument.
- **M2-b — an edit typed while the save is in flight.** For every save from tab T, followed by one
  or more edits in T before T receives that save's broadcast, in both orders relative to the save's
  response, T raises no notice for that broadcast. Red at `1ad625e`: AN-1's outside-class member,
  where the hashes differ and the notice is raised.
- **M2-c — the cross-tab notice is kept** (D-5; BC-14 limb c; hazard 4). For every broadcast whose
  hash equals neither T's current content nor any payload T has sent and not yet seen broadcast, T
  raises the notice. Members: another tab's save of a component-only edit, a field edit and a name
  change; T with and without unsaved edits; and another tab's save arriving while T's own save is in
  flight. The loss sentence keeps its current condition (`hasChangedRef`).
- **Window: how long T remembers a payload it sent.** It must outlast the save's round trip and
  Pusher's delivery, and it must not suppress a different tab's save. So a record lives from the
  send until T receives a broadcast equal to it, and no clock ends it. Residue, named as a bounded
  class (RK-3): a remote save whose content equals a payload T sent and has not yet seen broadcast.
  Equal content is no divergence to flag. A broadcast Pusher never delivers leaves its record
  standing, and that record then suppresses a later remote save of exactly that content.
- **Human-observable form.** Two tabs on one message. In tab 1, save and keep typing at once. Tab 1
  shows no "Message Update Detected"; tab 2 shows it. Walked before release on a local build by UAT,
  under `agent-output/CLAUDE.md` "Local builds of `website`": ids are moved past 900000000000001
  before the first save. That walk fires
  `handoff/local-walk-save-can-write-a-client-sent-low-message-id-2026-11-11.md`, and the walk's
  brief names it. In production after the deploy, observed by him.
- Negative-criterion instrument: the carried AN-1 probe and `MessageProvider/__tests__/usePusher.update-prompt.test.tsx`,
  which is tightened first (Before adding a test). Rollback: `git -C website revert <M2 commit>`; the
  party is the same as M1's.

### M3 — A stored draft survives sign-in, another tab and an expired-session sign-out (item 4, D-11)

Surfaces at `1ad625e`: `src/utils/withLocalStorage.ts` and `src/utils/hooks/useLocalStorage.ts`
`useLocalMessageStore`; one key, `message`, shared by every message. Also `MessageProvider/index.tsx`:
the route-0 effect (`local.id ? copyIntroMessage() : local`), the fetch effect and its
`localMessageStore.set`, and `getMessage`'s newer-local preference. Then
`src/app/_navigation/Redirects/Client.tsx` and `src/providers/SessionProvider.tsx`. Sibling,
mirrored: the shared `withLocalStorage` / `useLocalStorage` pattern. A change to how the draft is
stored is made once in that shared code, never in one caller.

The loss class is enumerated from AN-2's rows (`verification/017/analysis/an2/rows-395510e.json`).
Every limb below is red at `1ad625e` and green at the milestone tip:

- **M3-a (S2).** A signed-out draft at route 0 is restored unchanged (deep-equal `data` and `name`)
  after each of: sign in, then open any saved message, then return to route 0; sign in, then route 0;
  reload; close and reopen.
- **M3-b (S3).** A signed-in user with unsaved edits on message *n* (`data` differs from the saved
  copy) loses the session without using Log out. Members: the session cookie outlives its session,
  so `SessionProvider` calls `signOut()`; and the status turns `unauthenticated`, so `Redirects/Client`
  redirects to route 0. After signing in again and opening *n*, the editor shows the unsaved edits,
  as a reload does today (AN-2 S4). Route 0 meanwhile shows its own draft, not *n*'s edits.
- **M3-c (S5).** Decision table over two tabs at route 0:

  | Act | Outcome |
  |---|---|
  | Tab A edits, then tab B edits, then A reloads | A shows A's last draft |
  | A edits, B edits, then B reloads | B shows B's last draft |
  | A edits, B edits, then a new tab opens route 0 | It shows the draft edited most recently |
  | A edits, then closes; a new tab opens route 0 | It shows A's draft |

- **M3-d — warnings on signed out.** `hasChanged` no longer depends on the session. For every
  session status (`authenticated`, `unauthenticated`, `loading`), `hasChanged` is true exactly when
  the editor's data differs from the saved copy's (`typedDeepEqual`). What this changes, stated for
  him: signed out, closing or reloading the tab after an edit now shows the browser's "Changes you
  made may not be saved." The Reload confirmation stays unreachable signed out, because route 0 is
  never a saved message (AN-2). The update prompt's loss sentence stays unreachable signed out,
  because a signed-out tab never subscribes (`usePusher.ts`).
- **M3-e — the existing store is carried.** A browser holding the store as `1ad625e` writes it loses
  nothing it would have restored at `1ad625e`. Members: a route-0 draft with no `id`; a cached copy
  of message *n* newer than its saved copy; the intro message. Fixtures are literal stored strings,
  never generated by the new code.
- **M3-f — revert-safe.** After a revert of the website to the pre-chain code, every route-0 draft
  the new code wrote is restored by the old code. A cached copy of a saved message is not: the old
  code keeps one key, which is today's S3 class, stated residue.
- **Human-observable form.** Signed out at `/message/m/0/edit`: type a draft, sign in with the test
  account, open a saved message, return to the new-message page. The draft is there. Walked before
  release by UAT on the local stack (`tools/uat-local-stack.sh`) where sign-in works there. If
  local sign-in cannot be provisioned, the walk records the attempt, and M3-a and M3-b are walked on
  production after the deploy with the test account (discord-test-browser skill). The provision is
  attempted at QA Phase 1. Also handed on: `handoff/message-init-cached-edits-lost-2026-08-27.md`
  (route-0 initialisation), whose trigger M3's tests fire. M3-a covers its claim, so M3 discharges
  it.
- Price (D-11): one shared storage change, plus four effects in `MessageProvider` and the two
  sign-out paths. Every limb is red at the base. This is the chain's largest website milestone.
  Rollback: `git -C website revert <M3 commit>`, with M3-f's residue.

### M4 — Warn on a link away from an editor with unsaved changes (item 4, D-12)

- **M4-a.** The class is every in-app link rendered on the editor routes (`/message/m/[id]/edit` and
  `/send`), the surrounding `/message` layout's Header and Sidebar included, whose destination leaves
  the current message's editor. "Leaves" means any destination other than that message's `/edit` or
  `/send`. When `hasChanged` is true, activating such a link by pointer click or by keyboard (a click
  with `detail: 0`) shows a confirmation first. Cancel leaves the user on the page with the edits
  intact; confirm navigates. When `hasChanged` is false, no confirmation is shown. Enumerator: M4's
  first step writes the table of these links, path and symbol, at the chain tip, from the
  `next/link` importers. At `1ad625e` there are two: `src/components/StyledLink.tsx`, used by 11
  files, and `src/app/message/m/[id]/_layout/Navigation.tsx` (`git grep -l "from 'next/link'"`).
  Sibling, mirrored: the shared `StyledLink` wrapper carries the guard once, so every link that uses
  it inherits it. The confirmation is the site's `ConfirmationProvider` dialog (sibling:
  `Navigation.tsx` Reload). Where a link renders outside that provider, the deviation and its reason
  are stated in the implementation document.
- **M4-b.** A link to the same message's `/edit` or `/send` never prompts.
- **M4-c — the dead guard is removed.** At the milestone tip, `git grep -c "next/router" -- src`
  (production files) returns no line, and `useUnloadAlert` keeps only `useBeforeUnload`. Red check:
  AN-2's source reads at Next 16.1.6 say the listener can never fire. G-6's browser walk (a link
  clicked with `hasChanged` true at `1ad625e` shows no `confirm()`) is QA Phase 1's to schedule.
- **Known limit (X-14).** A navigation made by code (`router.push`/`replace`), a `redirect()`, or
  back/forward cannot be stopped at Next 16.1.6 (AN-2). The ones that leave an editor at `1ad625e`
  are `NewMessageModal`, `SaveAsMenu`, `m/new/page.tsx`, `f/[id]/page.tsx` after a create, and
  `Redirects/Client`. M3 makes the last one lose nothing.
- **Human-observable form.** With unsaved edits, click "Messages" in the header. A confirmation
  appears; Cancel keeps the edits. Walked on the local stack by UAT, and in production by him.
- Rollback: `git -C website revert <M4 commit>`.

### M5 — The stored preview moves only on a confirmed new image; failures are logged (item 2, website)

**M5-0 — gate before M5 or M6 code** (OQ-7). Both limbs are recorded under `verification/017/m5-0/`.

1. AN-4's render-time distribution. **Met**: p99 3729 ms, max 26275 ms, against the 60 s limit
   (AN-4, `b7b4d08`). T is set from it (M5-f): **T = 40 s**.
2. A `waitUntil` probe. A branch carrying only a Pages API route under `src/pages/api/` that passes a
   promise to `waitUntil`, settles after the response, and logs one line, deployed as a Vercel
   preview deployment (never production). The line must appear in that deployment's runtime logs.
   A run without `waitUntil` is recorded beside it (H-2). The push that creates the preview is
   devops's act, behind his approval: the website's workflow files do not show what a branch push
   deploys, so the push gate applies. The probe file is never merged.

If either limb fails, M5 and M6 stop. The plan goes to him with the fallback: the save awaits only
the generator's acknowledgement, the generator copies the last good image under the new nonce when a
render fails, and render failures are logged on the generator host instead of in Vercel. That
fallback is a deviation from D-8's words, so it is his call.

Surfaces at `1ad625e`: `src/server/api/utils/shared.ts` `upsertMessage`, `postMessagePreviewImage`,
`buildMessageValues`, `buildUpsertMessageQuery`; `src/server/api/utils/deleteMessagePreviewImages.ts`
(the website's bucket helper, sibling, mirrored for the deletion); `src/utils/index.ts`
`getPreviewImageUrl` (unchanged). Dependency added: `@vercel/functions`, as a deliberate lockfile
step (Recommendation 3). Lockfile disposition: `git diff pnpm-lock.yaml` read; every moved pin is
named and dispositioned in the implementation document; no pin other than the new package and its
own dependencies moves.

The generator's outcome classes for one save's request (each limb below is over all of them): 204;
500 (render or storage failure); 404 (wrong key, path or method); a network error (refused,
unreachable, reset); no answer within T; the continuation ended by the platform's limit.

- **M5-a — the stored nonce moves only on success.** For every save *s* of message *m*, the row's
  `previewImageNonce` after *s*'s continuation equals *s*'s nonce exactly when the generator answered
  204 to *s* and no save of *m* upserted after *s* has committed its own. Otherwise it equals the
  value it held before *s*. The row's other columns are written as today, and the save's response is
  unchanged.
- **M5-b — the named image exists.** For every message whose row names a nonce, the object
  `previews/<m>/<nonce>.jpeg` exists at every moment, as the website and generator write it. Residue:
  rows already pointing at a missing object before the release (X-2), and bucket acts outside these
  two programs.
- **M5-c — deletion after commit, keep-only-latest restored.** Objects under `previews/<m>/` other
  than the committed nonce's are deleted only after that commit, by the website. After every
  completed commit, the prefix holds exactly the committed object. The new object coexists with the
  old one only between the generator's write and the website's delete; that is a new requirement
  justified by D-2, against D-3. An object left by a continuation the platform ended is removed at
  *m*'s next completed commit (bounded residue, RK-2).
- **M5-d — a new message.** A message whose generation has never succeeded stores no nonce, so
  `getPreviewImageUrl` returns the default image. A new message's first save therefore shows the
  default image until its first success.
- **M5-e — two saves of one message.** A decision table, for saves *s1* then *s2* of *m* (upsert
  order), over which generator answer arrives first and each answer's class (204 or a failure).
  Every row's outcome is: the committed nonce is that of the latest-upserted save whose 204 was
  processed, and the prefix ends holding exactly that object. Where neither succeeds, the previous
  nonce and object stay. The table is carried as an executable oracle under
  `verification/017/m5-decision-table/`, written by QA at Phase 1, which the implementer's tests
  read. An expected value is never computed from production code.
- **M5-f — one log line per failure** (D-8). For every save whose outcome class is not 204, exactly
  one line is written to the function's log. It names the message id, the outcome class from the
  list above, and the elapsed milliseconds. It carries no message content, no nonce and no key.
  On 204, no line is written. A continuation the platform ends cannot log, so T is set to log
  "no answer within T" before the platform's cut. T is decided by two values. It must outlast every
  recorded generator success: the max is 26275 ms (AN-4), and puppeteer's 30 s default navigation
  timeout ends a hung render with a 500 inside it. It must also end at least 5 s before the
  platform's 60 s cut. So **T = 40 s**, which holds for a save whose own work before the
  continuation takes up to 15 s. The save's own duration is unmeasured. A save longer than 15 s can
  lose its "no answer" line, and that is RK-2's residue. Instrument: Vercel's runtime logs for the production deployment. A
  post-deploy read of the line class needs one real member; until a failure occurs, its
  reachability is a failure, and the residual risk's loud signature is a broken image together with
  a logged line (RK-1). QA Phase 1 names an existing server log line that is readable today, as the
  read's non-zero precedent, or states that none exists.
- **Human-observable form.** On a local build with the generator stopped, save an edit to a message
  that has a preview. The message list keeps showing the old preview. Start the generator and save
  again: the new preview shows. Walked by UAT on the local stack, with the generator and S3 as in
  `verification/015/m8-local-probe/`, which is the precedent named here, not re-read. In production,
  his look after the deploy: a normal save updates the preview.
- Rollback: `git -C website revert <M5 commit>`; the revert carries the lockfile back. The order
  against the generator is in § Release and rollback.

### M6 — The generator writes only a confirmed image and deletes nothing (item 2, generator)

Surfaces at `8de2b53`: `src/generateImage.ts` (default export, `generateMessagePreviewImage`,
`deleteMessagePreviewImages`) and `src/server.ts` `processImage`. The repository has no tests
(workspace `CLAUDE.md`). Verification is by probe under `verification/017/m6-probe/`, against a
loopback S3 stub. The precedent named is `verification/015/m8-local-probe/`, not re-read.

- **M6-a — 204 means the object for this nonce was written.** A request is answered 204 exactly when
  `previews/<id>/<nonce>.jpeg` was stored. Every other request is answered 500, with nothing written.
  The failure members:
  - `page.goto` rejects;
  - `page.goto` resolves with a main-resource status outside 200 to 299. At puppeteer-core 21.1.0
    (`package-lock.json` at `8de2b53`), `goto` "will not throw an error when any valid HTTP status
    code is returned by the remote server, including 404 "Not Found" and 500 "Internal Server
    Error"". This planner read it in `lib/types.d.ts` of the published 21.1.0 tarball (sha256
    `1e317926…`). It discharges steering's candidate (Planner batch row 1);
  - the screenshot rejects;
  - the put rejects.
  A request rejected before render (bad body, 500; wrong key, 404) is unchanged.
- **M6-b — the generator deletes nothing.** No request to this service deletes an object. Deletion
  is the website's (M5-c).
- **M6-c — its log lines keep their interface** (`preview-image-generator.md` A-1). The four lines
  `Server running at`, `Server received`, `Created instance`, `POST /generate` and the drain-complete
  line keep their text and emission count. `Generated image for message … in <N>ms` keeps its text,
  because AN-4 and later reads use it. A new failure line, if any, is added to
  `verification/015/pig-host-read.sh`'s shapes in the same change.
- The request contract is unchanged: `id`, `nonce` and `message` in, a status out. So Exclusions X-4
  (body validation) holds.
- **Security review** of the delta before release (stage set).
- Rollback: `git -C preview-image-generator revert <M6 commit>` on `prod`, pushed by devops on his
  word (prod.yml redeploys).

### M7 — Lint baseline recorded; release readiness (item 5, D-9)

- **M7-a — baseline recorded as accepted.** At website `1ad625e`, through the shared install, by this
  planner (`verification/017/entry/lint-1ad625e/`, 454 files):
  - before fixes: 314 errors and 367 warnings in 112 files;
  - what the lint script (`eslint --fix . --max-warnings=0`) leaves after ESLint's fixes: 50 errors
    and 364 warnings in 71 files. Per rule: `summary.txt`.
  The architect's closing pass restates the Problem Areas row "ESLint carries known findings" from
  this capture, with its count and instrument, as accepted.
- **M7-b — the chain adds no finding.** At the chain's website tip, for every file the chain changed,
  each rule's count in the no-fix report is no higher than at `1ad625e`, and every new file has none.
  Instrument: the same two commands at the tip, compared per file and per rule. Agent-authored
  criterion; it keeps D-9's baseline true at the release.
- **M7-c — nothing enforces lint** (Planner batch row 2; chain A CR-3). It is recorded, not fixed,
  under D-9: Exclusions X-12.
- Release readiness: § Release and rollback. QA Phase 3 runs at the merged tip in each repository.

## Testing Strategy

- **Website.** The standard is `agent-output/CLAUDE.md` § Test Conventions: vitest, placement and
  naming, axioms A to E, DOM tests for `.tsx` mounted with `createRoot` and `act`. Expected types:
  - M1: renames, a deletion, and new exact-text assertions (DOM);
  - M2 and M3: DOM tests mounting the real `MessageProvider`, with AN-1's and AN-2's probes as the
    carried instruments;
  - M4: DOM tests of the link class;
  - M5: Node tests of `upsertMessage`'s continuation, with fetch, the bucket and the database
    substituted, mirroring `src/server/api/utils/__tests__/shared.upsert-valid.test.ts` and its
    `helpers/capturingDatabase`.
  A run counts only with process exit 0 beside the counters, and `pnpm run typecheck` covers both
  programs. Critical scenarios: every limb red at the base where the limb says so, and the M5-e
  table.
- **Generator.** No suite. The M6 probe runs on this box (node, loopback S3 stub, a stub `/preview`
  that answers each status class).
- **Hosts and instruments per milestone.**
  - This box: vitest, the probes, lint.
  - The generator host: AN-4's read only, through the read-only alias.
  - Vercel: M5-0's preview deployment, read through `vercel logs` or the dashboard by devops; that
    instrument exists on this box (CLI 29.1.1, signed in, per AN-3).
  - Production, after the deploy: his look, and Vercel runtime logs.
- **Pre-landing probe against post-landing gate.** M5-0 runs every cell that does not need the
  landed tree: the `waitUntil` cell, and the render times, which are already met. M5-a to M5-f are the post-landing gate.

## Validation

Run once at the named trees by this planner on 2026-11-18, captures under `verification/017/entry/`:

- Website `1ad625e`, suite: 1508 of 1508 passed, 123 files, exit 0 (`base-1ad625e/vitest.json`,
  `vitest.exit`).
- `pnpm run typecheck`: exit 0.
- Lint baseline: M7-a.
- Serving refs (`release/`):
  - website: one serving ref (`master`), no pair;
  - preview-image-generator: `master` `87dcb41` is contained in `prod` `8de2b53`
    (`merge-base --is-ancestor`: master in prod 0, prod in master 1);
  - project-utils: one serving ref.
- Environment premises carried, each dated: Vercel production has no Fluid compute and a 60 s
  function timeout (analyst, 2026-11-18T23:12Z, `an3/vercel-api-project-record-extract.txt`).
  Production serves `395510e` at 2026-11-18 (`an3/vercel-inspect.txt`). Chain A's release has since
  moved `master` to `1ad625e` (`git ls-remote`, 22:4xZ).

## Risks

| RK | Risk | Falsifier (carrier) | Record per review pass |
|---|---|---|---|
| RK-1 | `waitUntil` does not keep post-response work alive in this route, so previews stop updating | M5-0 limb 2; after release, his look at a saved message's preview (UAT post-deploy row) | — |
| RK-2 | Render-and-store time exceeds T (40 s), or a save's own work runs past 15 s, so a continuation ends: a stale preview (safe), an orphan object, and a "no answer" line or none | AN-4: max 26275 ms over 16832 successes; after release, the count of "no answer within T" lines (QA post-deploy row) | — |
| RK-3 | Own-save recognition suppresses a real remote update (hazard 4) | M2-c's members; residue as stated in M2 | — |
| RK-4 | The storage change loses a draft already in a user's browser at first load | M3-e's fixtures | — |
| RK-5 | Two saves of one message commit the wrong nonce or delete the committed object | M5-e's table | — |
| RK-6 | The generator deploy stops a process mid-render | `handoff/preview-image-generator-drain-under-load-unobserved-2026-11-08.md`, devops's read | — |
| RK-7 | Stored messages whose `/preview` render answers an error status stop being re-imaged and keep their stale image (unclosed-assumptions item 7) | the generator host's failure-stack count after release against AN-4's count | — |
| RK-8 | M4 misses a link | M4's enumerator table against `git grep -l "from 'next/link'"` at the tip | — |

## Release and rollback

- **Order: website first, then the generator.** In the window with the new website and the old
  generator, behaviour is today's: the old generator still deletes before it renders, so a failure
  shows a broken image. In the reverse window (old website, new generator), nothing deletes the old
  objects (a leak), and the website still rotates the nonce unconditionally. So the generator waits
  until the website release is verified live. Rollback runs the reverse way: the generator is
  reverted first (deletion restored), then the website.
- **Website:** `master` fast-forward to the chain tip, pushed by devops on his word; Vercel deploys.
  Dry run and report: `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master <tip> --dry-run`.
- **Generator:** `prod` fast-forward, pushed by devops on his word; `prod.yml` deploys. `master`
  follows so that `prod` keeps containing it. The host has a `-preview` instance
  (`verification/015/pig-host-read.sh` header), but no `preview` branch exists at the remote. Whether
  to use it is devops's call, and it is a hazard line.
- Handoffs this release fires: the drain handoff (generator stop); none of the generic-pool,
  host-posture or API-key handoffs, because no lockfile pin of puppeteer or generic-pool moves and no
  workflow or `deploy.sh` file is edited. The cross-repo contract file the cross-repo-contract skill
  asks for: not read this revision; QA Phase 1 or the architect names whether it applies.
- Launch directory for spanning stages: `/usr/local/bin/hooks` (two product repositories and the
  record).
- QA sequencing: QA Phase 1 runs before implementation (stage set).

## Entry facts (per repository)

Read 2026-11-18 by this planner unless marked.

| Repository | Ref read | Hooks | Tracked build output | Consequence |
|---|---|---|---|---|
| website | `origin/master` `1ad625e` (chain A released 22:41Z; `git ls-remote`) | `core.hooksPath` unset; no non-sample hook in `.git/hooks` | none under `dist`/`build`/`.next` | The tree is back on `master` and clean, apart from untracked `.playwright-mcp/`, which is foreign. This chain's branch is cut at implementation start by steering. |
| preview-image-generator | `origin/prod` `8de2b53`, `origin/master` `87dcb41` | none | none tracked under `dist`/`build` | No tests and no installed `node_modules` on this box. |
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
planner, 2026-11-18). Re-run at revision 1: unchanged.

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
| bug-evaluation-fixes-unclosed-assumptions-2026-11-08 | Item 3 (only the website calls `/generate`): M6-b means another caller's objects would accumulate, not vanish; it stays QA's. Item 7: RK-7. |
| qa-014-bc7-closing-observation-and-test-inventory-2026-11-10 | QA's, at Phase 1. |
| preview-image-generator-api-key-in-workflow-files, -host-security-posture, -generic-pool-private-field | Not fired (no workflow, `deploy.sh` or puppeteer/generic-pool pin change). |
| upload-message-dialog-closes-on-first-portal-load-2026-11-08 | Chain A's. |
| the other nine | Not fired (re-checked against M1 to M7). |

## Exclusions

| X | Exclusion | Reason | Carrier |
|---|---|---|---|
| X-1 | Retention beyond M5-c's transient coexistence | D-3 | Stated limit |
| X-2 | Rows already pointing at a missing preview object | Determination Out; no DB instrument on this box. After release, a resave repairs a row. | Stated limit |
| X-3 | The generator host's security posture | Accepted by him | `handoff/preview-image-generator-host-security-posture-2026-11-08.md` |
| X-4 | `/generate` body validation | The request contract is unchanged (M6), so the determination's rider condition does not fire | `architecture/system-architecture.md` Problem Areas row |
| X-5 | project-utils schema change | No design needs one | Stated limit |
| X-6 | The Pusher app per environment | Determination Out | Stated limit |
| X-7 | The Enter-key compare in the dialogs | Determination Out (015 D30, X-18) | Architecture Problem Areas row |
| X-8 | A prompt on the signed-in Log out | Determination Out. M3-b's source fix also keeps the edits through Log out; only the prompt is excluded. | Stated limit |
| X-9 | Delete, Clear, Load and mode-switch confirmations | Determination Out; they work for both | Stated limit |
| X-10 | Recommendations 2, 3 and 5; `TODO.md` items | Determination Out. Recommendation 3 binds M5's lockfile step. | Stated limit |
| X-11 | The 50 errors and 364 warnings the lint script leaves | D-9 | Architecture Problem Areas row, restated in the architect's closing pass (M7-a) |
| X-12 | Nothing enforces lint: no workflow or hook runs ESLint, and `next build` does not lint. Chain A's `no-restricted-syntax` rule has two phrasings it cannot see (0 members) | D-9 ("no source files change") | Architecture Problem Areas row (M7-c); chain A CR-3 |
| X-13 | `cron.scheduled-selection` and `interactions-edge.signature-before-parse` stay in `src/server/api/__tests__/` | Their modules live under `src/pages/api/`. Next 16.1.6's default `pageExtensions` are `tsx, ts, jsx, js` (`next/dist/server/config-shared.js`), `next.config.js` sets none, and `next/dist/build/entries.js` has no `__tests__` exclusion (`grep -c` 0). So a test file there would be built as an API route. Read, not run. | `agent-output/INBOX.md` entry "2026-11-18 — planner-hooks-017 — DECISION NEEDED" (a Placement exception in `CLAUDE.md`), left uncommitted for the record's owning session |
| X-14 | Navigations that cannot be stopped: `router.push`/`replace`, `redirect()`, back/forward | D-12; Next 16.1.6 (AN-2) | Stated limit; UAT row |
| X-15 | `beforeunload` on the send page | `useUnloadAlert` is mounted on the edit page only. Edits survive in storage (M3), so closing the send page loses nothing. | Stated limit |
| X-16 | Pre-013 history of the own-tab notice (G-5) | No criterion rests on it | Stated limit |

## Planner batch

| Item | Source row | Disposition |
|---|---|---|
| Generator `page.goto` does not reject on an HTTP error status | steering-roadmap, `verification/017/steering-refute/` (c2) | Discharged at revision 1: M6-a, re-derived at puppeteer-core 21.1.0's published source. |
| Nothing enforces lint (chain A CR-3) | `code-review/closed/fix-dialog-closes-on-first-portal-load-code-review.md` CR-3 | Discharged at revision 1: M7-c, X-12. |
| Base moved to website `1ad625e` | steering-roadmap | Discharged at revision 1: every cited line re-read at `1ad625e`, or shown unchanged from `395510e` by `git diff --quiet`; suite and lint re-taken there. |
