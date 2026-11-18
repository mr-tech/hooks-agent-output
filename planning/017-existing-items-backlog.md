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
| 2026-11-18T22:24 | R-1 | planner-hooks-017 | OQ-6 restated by replacement: its premise, that the lint script exits 2 at the base, was refuted by steering-roadmap (`verification/017/steering-refute/`). The error was this planner's: a helper's run in an export was taken as the tree's. The base count was re-taken at `verification/017/entry/lint-base/`; the `eslint-395510e-*` captures beside it are the refuted export runs. Gate disclosed: the record-write gate refused a shell heredoc for `lint-base/README.md`, which was written with the Write tool. Scope delta: none. |
| 2026-11-18T22:44 | R-2 | planner-hooks-017 | Registered for revision 1 (Planner batch): chain A's CR-3 INFO (`code-review/closed/fix-dialog-closes-on-first-portal-load-code-review.md`, CR-3) and the base moving to website `1ad625e` (chain A released 22:41Z), both relayed by steering-roadmap. |
| 2026-11-18T23:17 | R-3 | planner-hooks-017 | Commissioned AN-4 (§ "Analysis commissioned"): the generator's production render times, read under steering's ruling `steering/017-rulings.md` block 2026-11-18T23:15Z. |

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
speaks of "the 34 known ESLint findings". That count was taken at website `6d78b19` over two files, not
the repository (`steering/queue-hooks-rulings.md` block 2026-11-11T08:46Z and `TODO.md`, as cited by
steering-roadmap). Measured at `395510e` through the shared tree's own install by this planner
(`verification/017/entry/lint-base/`, method in its README: the tree emulates `395510e` by turning off
chain A's one added rule, ignoring chain A's two files, and linting `395510e`'s copy of the changed
one from git): before any fix, 314 errors and 368 warnings in 113 of 453 files. ESLint itself can fix
255 of those errors and 5 of the warnings, in 70 files (69 under `src/`). After its fixes, 50 errors
and 365 warnings remain in 72 files. That is what the repository's lint script
(`eslint --fix . --max-warnings=0`) leaves, so the script fails at the base. Largest remaining:
`max-len` 288 warnings, `@typescript-eslint/no-non-null-assertion` 53 warnings,
`@typescript-eslint/no-unused-vars` 18 errors, `@typescript-eslint/no-explicit-any` 13 warnings,
`@typescript-eslint/no-unsafe-argument` 10 errors. ESLint's own fixes include moving imports
(`import/first` 67, `import/order` 24), which is not layout-only in every file. Options:
- *Agent: record what the lint script reports at the base as accepted, fixing none* (an Exclusions
  row carrying the per-rule counts; the script stays red; no source file changes).
- *Agent: commit ESLint's own fixes (70 files), each reviewed as code, as the chain's last milestone,
  and record the 415 remaining findings as accepted* (overlaps every file items 2 to 4 change).
- *Agent: as above, and also fix the 50 remaining errors* (leaves the 365 warnings, mostly line
  length, recorded as accepted).
- *Agent: fix everything, so the lint script passes* (adds 288 long lines and 53 non-null
  assertions to the work).
Recommendation: record the count as accepted. It keeps this chain's diff on its four items, and
Recommendation 1 names recording as a way to close it. Chain A's commit `1ad625e` changes the same
`.eslintrc.json` (one added rule), so whatever this limb does starts from chain A's release.

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
- **AN-4 (item 2, gap G-3; REQUIRED before item 2's website milestone is approved for code).** The
  distribution of the production generator's render-and-store time, read from its own out log on its
  host: n, min, median, p95, p99 and max of the `<N>` in `Generated image for message … in <N>ms`
  (logged on each success, `src/server.ts` at `8de2b53`); the span the log covers; and a count of
  failure stacks over the same span where a count-only form gives one. Do the same for the `-preview`
  instance if it has lines. Route: the read-only alias `ssh hooks-pig` as `claude-ro`, the way
  `verification/015/pig-host-read.sh` reads (steering ruling `steering/017-rulings.md` block
  2026-11-18T23:15Z). Use fixed-shape greps that print only durations or bucket counts: no ids, no
  nonces, no whole lines, no pm2 command, no write on the host. A refused read is recorded and not
  re-issued. Purpose: it sets the save continuation's timeout against the 60 s function limit (G-1).

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
| Item 2 candidate, not run: generator `src/generateImage.ts` `page.goto` (8de2b53) does not reject on an HTTP error status, so an error page could be screenshotted and stored as the preview | steering-roadmap's message, notes in `verification/017/steering-refute/` (c2) | To revision 1: re-derived at the installed puppeteer source and dispositioned in item 2's criteria or Exclusions. |
| Nothing enforces lint: no workflow or hook runs ESLint and `next build` does not lint, so chain A's `no-restricted-syntax` rule fires only where someone runs ESLint; the rule has two phrasings it cannot see (0 members today) | chain A CR-3 INFO, `code-review/closed/fix-dialog-closes-on-first-portal-load-code-review.md` (CR-3); relayed by steering-roadmap | To revision 1, with OQ-6: the item-5 lint limb states whether anything enforces lint, and the rule's blind phrasings are in scope or an Exclusions row. |
| Base moved: chain A released, website `master` `1ad625e` (`git ls-remote`, this planner); it differs from `395510e` in `.eslintrc.json`, `AnchoredPopover/Child.tsx` and one new test file (`git diff --name-only`) | steering-roadmap's message | To revision 1: every cited line is re-read at `1ad625e`, and the lint count is re-taken there with chain A's rule on. The `lint-base/` capture stays as the `395510e` count. |
