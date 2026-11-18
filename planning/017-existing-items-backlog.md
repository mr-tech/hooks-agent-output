---
ID: 017
Origin: 017
UUID: 5c3e9a71
Status: Active
Status-Detail: "Revision 0: user stories and scope questions, put to the owner through steering-roadmap. No milestones yet. Planning of milestones (revision 1) waits on his approval of the four user stories and on analysis 017 (REQUIRED before revision 1 for items 3 and 4, and for item 2's mechanism)."
Revision: 0
Plan-ID: 017
Target-Release: "website master (Vercel) and preview-image-generator prod (prod.yml), both production, each push his word (rulings file block 2026-11-18T21:59Z, End step). Order between the two deploys: set at revision 1."
Epic-Alignment: "Hooks.gg existing-items queue: the commission of 2026-11-18T21:53Z (items 2 to 5 of the five-item ranking), under his 2026-11-11 ruling that new feature work waits until the existing items are handled (steering/queue-hooks-rulings.md, selection 2)."
Lane: "full chain, set by the scoping determination (rulings block 2026-11-18T21:59Z, Pipeline). Not proposed small: item 2 changes the shared save path and a second service; item 3 changes the cross-tab notice every editor tab runs."
Architectural-Surface: "To be declared at revision 1, after reading the Problem Areas and component lines the chosen designs touch. Candidate surface named now: item 2 may move bucket deletion from the generator to the website, or add post-response work to the save path; either changes a cross-repo contract (the /generate request and what its answer means)."
---

# Plan 017 — the existing-items backlog: stale previews, the saving tab's own notice, signed-out guards, hygiene

## Changelog

| Date | Rev | Author | Change |
|---|---|---|---|
| 2026-11-18T22:11 | 0 | planner-hooks-new | Created from the scoping determination (rulings block 2026-11-18T21:59Z) and the commission (block 21:53Z). User stories, inherited rulings, scope questions and the analysis commission; no milestones. Scope delta: none (first revision); sized against the ask, four items, no feature. |

## Value Statement and Business Objective

One statement per item; each is delivered by this chain and none is deferred.

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

## Objective

Discharge the four open carriers the determination names — `handoff/preview-image-failure-shows-broken-not-stale-2026-08-24.md`,
`handoff/save-originating-tab-raises-its-own-update-prompt-2026-08-25.md`,
`handoff/unsaved-change-guards-disabled-for-unauthenticated-users-2026-08-24.md`, and for item 5
`handoff/website-tests-not-beside-their-module-2026-11-08.md` and
`handoff/editor-error-lines-render-text-unasserted-2026-11-11.md` plus
`architecture/system-architecture.md` Recommendations 1 and 6 — and release to production in both
repositories.

## Decisions Register

Settled decisions that bind this plan. Inherited rulings are restated here, not cited across.

| D | Decision | Date | His words, verbatim, and route | Reopening class (observable through) |
|---|---|---|---|---|
| D-1 | Items 2 to 5 are worked; order and grouping are steering's, his to veto | 2026-11-18 | *"Do all 5 in whatever order and group however you determine best."* — witnessed by steering-roadmap, rulings file block 2026-11-18T21:53Z | Owner withdrawal only. |
| D-2 | A failed generation should leave a stale preview showing; the save does not block | 2026-08-24 | *"Show a stale one is fine."* — answer to "show no preview, show a stale one, or block the save?", recorded owner-authored in `architecture/preview-image-generator.md` P-6 | Owner withdrawal only. |
| D-3 | Keep-only-latest is intended; no retention requirement exists | 2026-08-24 | *"Intended. There's no purpose for retention."* (corrected by him the same day from a typo) — `architecture/preview-image-generator.md` P-5 | Owner withdrawal only. Consequence: any object this plan keeps beyond the latest is a new requirement justified by D-2 and stated as one. |
| D-4 | The back end stores what the front end allows; no server-side gate on save | 2026-08-24 | *"…I'd say that the back-end reflects what the front-end allows. If a shape is allowed in the front-end, then it's not silently morphed in the back-end…"* (full text `architecture/website.md` W-2; D-005) | Owner withdrawal only. |
| D-5 | Cross-tab divergence is flagged, not coordinated | 2026-08-24 | *"…flag when front-end state doesn't match back-end because of a different tab saving"* — `architecture/website.md` W-6 | Owner withdrawal only. Consequence: item 3's fix keeps the cross-tab flag (BC-14 limb c) and adds no merge or lock. |
| D-6 | No new feature work in this chain | 2026-11-11 | *"…this new stuff is planned after the existing items are handled"* — `steering/queue-hooks-rulings.md`, selection 2 | Owner withdrawal only. |

## Assumptions and open questions

Rev 0 lists each scope assumption the determination's designs make and it did not state.

**OPEN QUESTION OQ-1 (his — item 2, failure visibility; named open for him in the determination).**
When a preview cannot be made, should anyone be told? Facts the options rest on, read from code at
website `395510e` and generator `8de2b53` by this planner (not run): the website's request for a
preview ignores the answer and swallows errors, so the website records nothing; the generator writes a
failed render or storage step to its own error log on its host and answers 500; a wrong key is
answered 404 with only the request line logged. Options:
- *Agent: nothing new — the stale image is the whole fix* (the generator's host error log stays the
  only record of a failed render; an unreachable generator stays unrecorded).
- *Agent: the website logs one line per failed or unreachable generation* (visible in Vercel's
  function logs; no user sees anything).
- *Agent: also tell the saving user* ("Preview image could not be updated" beside "Message saved!").
- *Agent: none of these; decide after the fix ships.*
Recommendation: the website logs one line per failure — it makes the failure countable, which today
it is not (the handoff: "not measurable from what exists"), and changes nothing a user sees.

**OPEN QUESTION OQ-2 (scope assumption — item 2's reach).** The determination's property is over
"the places that show it". The plan takes the unit as one save of one message, the reach as every
save that requests a preview (`upsertMessage`'s two request sites: an existing message and a new
one), and the layer as both repositories. A brand-new message whose first generation fails has no
last good image: it shows what? Today `getPreviewImageUrl` falls back to the default image only when
no nonce is stored. Revision 1 states the new message's outcome as a criterion; proposed: the default
image (no nonce stored until the first success).

**OPEN QUESTION OQ-3 (scope assumption — item 2's mechanism; REQUIRES ANALYSIS, below).** Every
design that shows a stale image after an unreachable generator needs the stored nonce to move only
after a confirmed success, which means work after the generator answers. Today the save never waits
for the generator. Whether work started by a save can finish after the save's response has gone, on
the website's Vercel deployment, through the tRPC route (`src/pages/api/trpc/[trpc].ts`, a Pages
Router API route), is unread. If it cannot, the remaining designs are (a) the save waits for the
generator (slower saves — D-2's question offered "block the save" and he chose stale) or (b) a
generator-only fix that covers a failed render but not an unreachable generator. Which design is the
plan's is a mechanism choice and the stage's (escalation, Standing Defaults); it becomes his question
only if every design that keeps saves unslowed is ruled out by the analysis.

**OPEN QUESTION OQ-4 (scope assumption — item 3; REQUIRES ANALYSIS).** BC-14 was executed at
production `a74b9e2`, before chain `fix-website-save-gate-embeds` changed how the editor persists its
own message (`architecture/website.md` A-6, website `963a25c`). Whether the saving tab still raises
the notice at `395510e`, and on which inputs, is unestablished. The plan assumes the defect is live
until the analysis shows otherwise; if it is not reproducible at `395510e`, item 3 becomes a
criterion and a test that pin the absence, not a fix.

**OPEN QUESTION OQ-5 (scope assumption — item 4; REQUIRES ANALYSIS).** The severity turns on what a
signed-out user can actually lose (the handoff: "UNMEASURED"). The scoping sweep (a helper's report,
not re-derived) says signed-out edits at `/message/m/0/edit` are kept in the browser's local storage,
which would mean closing or reloading the tab loses nothing; the loss paths would then be the ones
that overwrite that store or navigate away to a different message. The plan assumes every guard
whose enabling depends on sign-in is in scope (determination), and the measurement decides which
guards protect anything signed out.

**OPEN QUESTION OQ-6 (his — item 5, lint; a line red before the chain opens).** Recommendation 1
speaks of "the 34 known ESLint findings" (counted at website `6d78b19`). At `395510e` the repository's
own lint script (`eslint --fix . --max-warnings=0`) does not start: ESLint 8.57.1 exits 2 with
*"ESLint couldn't determine the plugin "react" uniquely"*, because `pnpm-lock.yaml` resolves two
`eslint-plugin-react` versions (7.33.2 through the airbnb config, 7.37.5 through `eslint-config-next`;
lockfile lines 3834 and 3840 at `395510e`). Run by a helper in an export of `395510e` against the
shared install (lockfile and lint config identical to `395510e`, `git diff --quiet`), capture
`verification/017/entry/eslint-395510e-run1-stdout-stderr.txt`; this planner re-read the capture and
the lockfile lines. A substitute run with the conflict resolved by hand — not the script's result —
reports 469 errors and 368 warnings in 152 of 452 files (`verification/017/entry/eslint-395510e-summary.txt`;
largest rules `max-len` 286 warnings, `object-curly-newline` 132 errors,
`react-hooks/preserve-manual-memoization` 72 errors). So "34 known findings" no longer describes the
tree, and limb 1 is larger than the ask assumed. Options:
- *Agent: make the lint script run again and record what it reports as accepted, fixing none*
  (a lockfile change, taken as a deliberate step per Recommendation 3; no source file changes).
- *Agent: make it run, then fix only what ESLint fixes mechanically* (whitespace and layout rules;
  touches about 150 files, including every file items 2 to 4 change, so it lands last).
- *Agent: make it run and fix every finding* (includes hook-rule findings that can change behaviour;
  each needs review as code).
- *Agent: leave lint as it is; record the count and the broken script as an Exclusions row.*
Recommendation: make it run and record the count as accepted — it restores the instrument, which
is what every later change needs, and keeps this chain's diff on its four items. Chain A is at this
moment adding a rule to the same `.eslintrc.json` (uncommitted in the shared tree at 22:10Z), so
this limb starts from chain A's release.

## Analysis commissioned

**REQUIRES ANALYSIS — REQUIRED before revision 1** (analyst, document
to be created under `analysis/` as `017-existing-items-backlog-analysis.md`). Three scopes; the analyst works only on these.

- **AN-1 (item 3).** Establish, by execution at website `395510e`, whether a save from a tab raises
  "Message Update Detected" in that same tab, over an enumerated class of saves: a save with nothing
  changed, a save after an edit, a save through the "Choose which to keep" dialog, for a Classic, a
  V2 and a not-valid draft (D-4 allows saving one). For each member: the hash the server broadcasts
  and the hash the tab computes at delivery, and the order in which the broadcast, the save's
  response and the editor's update arrive. Settle the word "still" (handoff) from the history of the
  hash and notice code since `a74b9e2`, including whether a tab running pre-release code after the
  013 deploy explains BC-14 limb (d) (plan 013 risk R4). No Pusher publish from this box: work at the
  hash and hook level, or under the local-build rule in `agent-output/CLAUDE.md`.
- **AN-2 (item 4).** Measure what a signed-out user can lose, path by path, over the guard table in
  `verification/backlog-2026-11-18/scoping/signed-out-guards-sweep.md` (re-derived, not inherited),
  including the redirect after sign-out and the sign-in button. Find how the App Router lets a page
  stop or confirm an in-app navigation at Next `16.1.6` (read at the installed version), and whether
  the website or a sibling already does it.
- **AN-3 (item 2).** Establish whether work started by a save can complete after the save's response
  on the website's Vercel deployment through the Pages Router tRPC route (source and documentation
  of the installed Next and of Vercel's Node runtime; the deployment's own settings are the owner's
  to read if no agent can). Measure the generator's render time if any record or log the record
  already holds carries it.

## Entry facts (per repository)

Read 2026-11-18 by this planner unless marked.

| Repository | Ref read | Hooks | Tracked build output | Consequence |
|---|---|---|---|---|
| website | `origin/master` `395510e` (`git ls-remote` 22:0xZ: `master` `395510e`) | `core.hooksPath` unset; no non-sample hook in `.git/hooks` | none under `dist`/`build`/`.next` (`git ls-files`, 0 entries) | Tree held by chain A (`fix/dialog-closes-on-first-portal-load`); nothing of this chain is committed in `website` before steering records this chain's branch. |
| preview-image-generator | `origin/prod` `8de2b53`, `origin/master` `87dcb41` | none | none tracked under `dist`/`build` | No tests in this repository (workspace `CLAUDE.md`); verification of its change is by probe and host read. |
| project-utils | `origin/master` `749606d` | `core.hooksPath` `.githooks`, whose `pre-commit` rebuilds and refuses a commit that leaves modified files | `dist/` tracked (13 files) | Read only; a schema change is a scope delta put to him. |
| agent-output | `master` | — | — | Gate refusal disclosed: the secret-file gate refused a helper's `grep -rn` over an export of website `src` for `enforceImportMutualExclusivity` (it named the generator's `prod.yml`); not retried; the helper used only the count and file-list forms (`verification/017/entry/disclosure-refused-grep.txt`). `tools/open-handoff-trigger-sweep.py` does not exist in this record; the handoff enumeration below was made by reading every open handoff's frontmatter. |

### Open handoffs whose trigger this chain fires

Enumerated from all 22 open handoffs' `Review-Trigger` (a python read of each frontmatter, this
planner). Disposition at revision 0; revision 1 makes the out-of-scope ones Exclusions rows.

| Handoff | Disposition |
|---|---|
| preview-image-failure-shows-broken-not-stale-2026-08-24 | In scope: item 2. |
| save-originating-tab-raises-its-own-update-prompt-2026-08-25 | In scope: item 3. |
| unsaved-change-guards-disabled-for-unauthenticated-users-2026-08-24 | In scope: item 4. |
| website-tests-not-beside-their-module-2026-11-08 | In scope: item 5. |
| editor-error-lines-render-text-unasserted-2026-11-11 | In scope: item 5. |
| local-walk-save-can-write-a-client-sent-low-message-id-2026-11-11 | Adjacent; fires at the first local walk this chain briefs; carried into that walk's brief. |
| preview-image-generator-drain-under-load-unobserved-2026-11-08 | Adjacent; fires at the generator's production deploy; devops carries its read. |
| bug-evaluation-fixes-unclosed-assumptions-2026-11-08 | Trigger fired ("the next website or preview-image-generator effort is scoped"). Items 3 (only the website calls `/generate`) and 7 (every stored message renders) bear on item 2; dispositioned at revision 1. |
| message-init-cached-edits-lost-2026-08-27 | Bears on item 4 (route-0 initialisation and local storage); its trigger fires if this chain writes a test for that initialisation. Dispositioned at revision 1 from AN-2. |
| qa-014-bc7-closing-observation-and-test-inventory-2026-11-10 | Trigger fired for QA ("when QA next runs"); QA's at Phase 1. |
| upload-message-dialog-closes-on-first-portal-load-2026-11-08 | Chain A's. |
| preview-image-generator-api-key-in-workflow-files, -host-security-posture, -generic-pool-private-field | Not fired unless the plan edits a workflow file, `deploy.sh`, or the lockfile's puppeteer/generic-pool; revision 1 states whether it does. |
| the other nine | Triggers name surfaces this chain does not touch (re-checked at revision 1 against the milestones). |

## Plan

Milestones are written at revision 1, after his approval of the user stories and the analysis.

## Exclusions

Written at revision 1. The determination's "Out" lists bind already: retention; messages already
pointing at a missing image; the generator host's security posture; `/generate` body validation
unless the request contract changes; project-utils schema changes unless the design needs one; the
Pusher app per environment; the Enter-key compare; the signed-in Log out; the delete, Clear, Load
and mode-switch confirmations; Recommendations 2, 3 (binding any re-pin), 5; `TODO.md` items.

## Planner batch

| Item | Source row | Disposition |
|---|---|---|
| — | — | — |
