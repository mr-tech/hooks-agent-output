---
ID: 017
Origin: 017
UUID: 5c3e9a71
Status: Open
Status-Detail: "Cycle 1 pass 1 on plan revision 1: REQUEST REVISION. F-1 and F-2 HIGH, F-3 to F-11 MEDIUM, F-12 to F-18 LOW, all OPEN. OQ-7 is open and proceeds open on his selection (D-15)."
Artifact-Revision: 1 — read whole at d84b192; the delta to a3c1e83 is the planner's Resumption State alone
Reviewed-At: "a3c1e83 — repos=agent-output; website code read at 1ad625e (origin/master), generator at 8de2b53 (origin/prod), project-utils schema at 749606d"
Verdict: REQUEST REVISION
---

# Critique — Plan 017, the existing-items backlog

**Artifact**: `planning/017-existing-items-backlog.md`, revision 1 (`97e6814`, with R-4 at
`d84b192`), read whole. **Analysis**: `analysis/017-existing-items-backlog-analysis.md` (AN-1 to
AN-4), read whole. **Also read**: the commission and the scoping determination
(`steering/backlog-2026-11-18-rulings.md`, blocks 21:53Z and 21:59Z), `steering/017-rulings.md`,
`steering/017-brief-common.md`, and the three architecture documents (`system-architecture.md`,
`website.md`, `preview-image-generator.md`). **Date**: 2026-11-18.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-11-18T23:47 | steering-roadmap (brief `steering/backlog-2026-11-18-briefs/critic-hooks-017.md`) | cycle 1 pass 1: plan revision 1, whole-document read | First pass of the cycle, so the whole plan was read (615 lines at `d84b192`; a Reading Order is present). Boundary: revision 1 is `97e6814`. `97e6814..d84b192` is R-4, 4 lines added and none removed (`git diff --numstat`): three register rows and one changelog row, no criterion moved. `d84b192..a3c1e83` is the planner's Resumption State, 14 added and none removed; it touches no milestone scope, criterion text, instrument form or register effect. Artifact changes: none before this pass. New findings: F-1 and F-2 HIGH, F-3 to F-11 MEDIUM, F-12 to F-18 LOW, all OPEN. Findings addressed: none. Verdict REQUEST REVISION. Pricing: sized to the ask as he re-set it (D-11, D-12, D-14). |

## Verdict

**REQUEST REVISION — cycle 1, pass 1.**

Pricing: sized to the ask as he re-set it. The ask is items 2 to 5 (D-1). Item 4 is larger than its
handoff by his own selections (D-11, D-12), and he confirmed M1 to M7 (D-14). M7-b is the one
criterion nobody asked for; the plan marks it agent-authored, and it sits inside the scope he
confirmed. F-1 may add a surface to M4. If it does, that is a scope delta for him, not something
this critique designs.

The stop authority did not fire: no gate's finding is folded into the plan yet, so no defect shape
has a second instance. The hard stop did not fire. Nothing routes to the owner from this critique
directly. Two findings are likely to reach him through the planner's revision: F-2 (a warning on
the sign-in button, which D-11's text did not show him) and F-1 (where it adds a surface to M4).

No milestone is marked `PREMISE-STALE`. The token appears once, in the gate's own sentence in
§ Plan.

## Value Statement Assessment

Four statements, each in user-story form with an outcome that can be checked, none deferred. D-7
records his approval of the wording.

- **Story 2 (item 3).** At `395510e` no enumerated save raises the notice in the saving tab (AN-1).
  What M2 changes is one path, an edit typed while the save is in flight, plus a pinned absence.
  He was told this at 22:32Z, before he approved the stories.
- **Story 3 (item 4).** Once M3 fixes the three losses at their source, the warnings that M3-d and
  M4 turn on warn a signed-out user about navigations that lose nothing (AN-2 S1; M3-a). That is
  D-11 and D-12 as he selected them, with "reload/close loses nothing signed out" told to him at
  22:32Z. It is not re-raised. F-2 is the one member of that consequence he was not shown.

The record holds no roadmap, so no Master Product Objective document was read. Alignment was judged
against the commission (D-1) and the architecture record (P-6, W-6, D-005). No drift was found.

## Assumption Not Checked

Pass 1: this pass assumes AN-1's and AN-2's hook-level probes behave as a real browser does, and
does not test it. They run under jsdom, with a provider remount standing for a reload, a sign-in
round trip and a second tab, and with both Pusher delivery orders driven by hand. If the assumption
is false, a walk member of M2-b or of M3-a to M3-c fails in a real browser while its suite case is
green. QA Phase 1 owns closing it, through the local walk's provision, and then UAT's walk.

Premises run in this pass:

- **Lint baseline (M7-a).** A python read of `verification/017/entry/lint-1ad625e/nofix.json` and
  `fixdry.json`, summing `errorCount` and `warningCount`: 454 files each; no-fix 314 errors and 367
  warnings in 112 files; after ESLint's fixes 50 errors and 364 warnings in 71 files, with 70 files
  rewritten. `tree-head.txt` reads `1ad625e`. These match the plan.
- **Suite (§ Validation).** `base-1ad625e/vitest.json`: `numTotalTests` 1508, passed 1508, 123
  `testResults` entries; `vitest.exit` 0. Matches.
- **Open handoffs.** A python read of every `handoff/*.md` frontmatter: 22 files, 22 with `Status`
  `Open`. Matches "all 22".
- **Open questions.** `grep -c 'OPEN QUESTION'` 7, of which `[RESOLVED]` 6; the seventh is OQ-7.
- **Version fields.** `grep -c '"version"'` over `package.json` at website `1ad625e` and generator
  `8de2b53`: 0 and 0.
- **M1-a's moves.** The four files exist at `1ad625e` (`git cat-file -e`), and each imports through
  the `~/` alias only (`git show`), so a move changes no blob. `vitest.config.ts` includes
  `src/**/*.test.ts`, which covers the new directories.
- **M1-c's mutants.** The kill table holds 135 mutants; the handoff's five are its ids
  `index.tsx:298:>`, `347:>`, `348:>`, `348:>:2` and `349:>`.
- **Listings, read directly and not recounted** (see the gate refusal below): `git grep -n
  "next/link" 1ad625e` names `StyledLink.tsx` and the editor's `Navigation.tsx` (a type import);
  `git grep -l StyledLink 1ad625e -- src` names the 11 files F-1 lists from; `git grep -n
  "next/router" 1ad625e` names `useUnloadAlert.ts`; `git grep -n enforceImportMutualExclusivity
  1ad625e` names `src/utils/index.ts` and one test file.
- **Vercel's runtime-log retention.** Vercel's Runtime Logs documentation
  (`https://vercel.com/docs/logs/runtime`, read 2026-11-18): 1 hour on Hobby, 1 day on Pro, 3 days
  on Enterprise, 30 days with Observability Plus. The project's plan tier is unread.
- **The chain-015 probe.** F-11 carries the read.

Process fact of this run, lodged in the round: the secret-file gate refused one Bash call, a
recount of the importer file sets above written to scratch files. The call ran `git grep -l` and
`git grep -c` with the website repository's path in a shell variable, two of them with no
pathspec. The gate named `preview-image-generator/.github/workflows/prod.yml`; the call was never
aimed at that file. It was not re-issued in any form (brief common part, "never re-issue a refused
read in another form"), so those file sets are cited from the direct listings and no count rests on
the refused call.

## Reachability, checked in the code (website `1ad625e`, generator `8de2b53`)

- **M4: the guard's input does not reach the `/message` Header and Sidebar.** F-1.
- **M3-d: "a signed-out tab never subscribes" holds, by the route and not by the session.**
  `usePusher.ts` subscribes only when `isApiMessage(messageRef.current)`, and `Redirects/Client.tsx`
  holds an unauthenticated tab at route 0, which is never a saved message.
- **M2: `persist` is the one place the editor's own save is sent.** `useApiMethods.ts` `persist` is
  the only caller of the upsert mutation there, and all four `saveMessage()` call sites pass no
  override. `SaveAsMenu.tsx` upserts without an id, so `upsertMessage` broadcasts nothing for it.
  This agrees with `website.md` A-6.
- **M5: the continuation has one call path.** `upsertMessage` has two server callers, both in
  `routers/message.ts` `upsert`, served by the Pages Router tRPC route. M5-d's read side holds:
  `Message.previewImageNonce` is `String?` (project-utils `749606d`) and `getPreviewImageUrl`
  returns the default image for a falsy nonce.
- **M6: the generator is as the plan describes.** `generateImage.ts` runs the render and
  `deleteMessagePreviewImages` in one `Promise.all` and puts afterwards; `server.ts` `processImage`
  answers 204 on resolve and 500 on reject. The pool is `max: 1` (`getPool.ts`), so renders are
  serial. F-3 and F-5 use that.

## Unresolved Open Questions

One: **OQ-7**, the `waitUntil` probe (M5-0 limb 2), which blocks M5 and M6 code only. The question
this section owes him, whether to approve with it open or have the planner address it first, was
put to him and answered at 23:26Z: "Agent: proceed with it open (Recommended)" (D-15;
`steering/017-rulings.md`, block 23:26Z). It is not put again. F-6 concerns how the probe's result
is read, not whether to proceed.

## Findings

F-1 HIGH cycle 1 pass 1 OPEN — M4-a: the guard's condition and its dialog do not reach the `/message` Header and Sidebar, which the class includes.

- **Location**: plan § M4, M4-a ("the surrounding `/message` layout's Header and Sidebar included";
  "the shared `StyledLink` wrapper carries the guard once"). Code at `1ad625e`:
  `src/app/message/layout.tsx` `Layout`; `src/app/message/_layout/Navigation.tsx` `Navigation`;
  `src/app/message/m/[id]/layout.tsx` `Layout`; `src/providers/MessageProvider/index.tsx`
  `useMessage`.
- **Description**: `hasChanged` is `MessageProvider` state. `MessageProvider` and
  `ConfirmationProvider` are mounted in `m/[id]/layout.tsx`. Header and Sidebar are mounted one
  layout above, in `message/layout.tsx`, by a `Navigation` that renders them on
  `/message/m/<id>/send` and renders nothing on `/edit`. So on `/send`, every link that leaves the
  editor is a Header or Sidebar link: Sidebar's `/`, `/message`, `/message/f/<guild>`,
  `/message/f/0`, `/message/m/0/edit` and the two legal pages, and Header's search results to
  another message's `/edit`. None of them can read `hasChanged` or open the dialog as the tree
  stands. `useMessage` throws outside its provider. Of the 11 files that use `StyledLink`,
  `Header.tsx`, `Sidebar.tsx`, `message/page.tsx` and `message/f/[id]/page.tsx` render outside it,
  as do `Footer.tsx`, `LandingCTA.tsx` and `CookieConsent.tsx` by their paths (mount sites not
  read). The plan states the deviation for the dialog only, not for the condition. The
  Human-observable form, 'click "Messages" in the header', names no route, and on `/edit` that
  Header is not rendered.
- **Impact**: 2 of the 11 `StyledLink` files hold every `/send` member of the class and have no
  path to the guard's input, so M4-a cannot be met on `/send` without state above
  `m/[id]/layout.tsx`. M4 names no such surface and the header's Architectural-Surface line lists
  none. A guard written into `StyledLink` with the provider's own hook throws on every page outside
  the editor.
- **Recommendation**: Write M4's enumerator table for the `/send` and `/edit` members now, each
  with where it renders against the two providers. For the members outside them, either name the
  surface that carries the condition and the dialog to them, and add it to the
  Architectural-Surface line for the architect, or exclude them with an Exclusions row and its
  reason. State the form `StyledLink` takes outside the provider and mark it as a deviation from
  the provider pattern's throwing hook. Name the route and the control in the Human-observable
  form. If the first option reshapes M4, it is a scope delta for him.

F-2 HIGH cycle 1 pass 1 OPEN — M3-d: the unload class is collapsed to two members, and the sign-in button is a third, on the path M3-a makes safe.

- **Location**: plan § M3, M3-d ("What this changes, stated for him"); D-11. Code at `1ad625e`:
  `src/app/message/m/[id]/edit/page.tsx` (`useUnloadAlert(hasChanged)`; the `InfoPanel`'s
  `onContinue`, which calls `signIn('discord', …)`); `src/utils/hooks/useUnloadAlert.ts`. Installed
  libraries: react-use 17.4.0 `useBeforeUnload`; next-auth 4.24.5 `signIn`.
- **Description**: `useBeforeUnload` registers a `beforeunload` handler whenever its flag is true
  and prevents every unload while it is. next-auth's `signIn` leaves the page by setting
  `window.location.href`. So once `hasChanged` is true signed out, the edit page's own "Log in"
  button raises the browser's "Changes you made may not be saved." At route 0 the saved copy is the
  draft as loaded (`useValue`, the `paramMessageId` effect), so the first edit makes `hasChanged`
  true. M3-d states two members, close and reload. D-11's shown text and the 22:32Z block do not
  mention sign-in.
- **Impact**: every sign-in from the edit page after an edit, 100% of that path, shows a leave-site
  dialog about a loss M3-a guarantees cannot happen. The panel that holds the button is open by
  default for a signed-out user. Shipped unseen, it reads as a regression on sign-in.
- **Recommendation**: State M3-d's effect over the class "every document unload from the edit page
  while `hasChanged` is true". List its members from the page's exits (the `signIn(` and
  `signOut(` sites, plain anchors, close, reload, a typed URL) and give each member's outcome. The
  sign-in member's outcome is his, because D-11's text did not show it: an `OPEN QUESTION` before
  M3 code, its options carrying the read above. This does not reopen D-11; the finding is on the
  criterion's enumeration.

F-3 MEDIUM cycle 1 pass 1 OPEN — M5-e's table omits the interleaving of one save's delete with the other save's write and commit.

- **Location**: plan § M5, M5-b, M5-c, M5-e; RK-5. Generator `src/getPool.ts` (`max: 1`),
  `src/generateImage.ts`.
- **Description**: The table's dimensions are which answer arrives first and each answer's class.
  M5-c's rule is that after a commit the website deletes every object under `previews/<m>/` other
  than the committed nonce's. Take saves s1 then s2, both answered 204. If s1's listing runs after
  the generator has written s2's object and before s2's continuation commits, s1 deletes the object
  s2 is about to name. The row then names a missing object, with two 204s and no log line. M5-b
  fails and so does the table's own outcome. No row of the table as dimensioned holds this case, so
  RK-5's falsifier ("M5-e's table") cannot see RK-5's second member ("delete the committed
  object"). In the mirror case s1's object is written after s2's delete and is left behind; M5-c's
  residue sentence covers an orphan only for "a continuation the platform ended".
- **Impact**: the window opens only when s1's gap between its commit and its listing exceeds s2's
  render, at least 1245 ms on AN-4's minimum because the pool renders one at a time. The rate is
  low and unmeasured. The consequence is the defect item 2 exists to remove, lasting until the next
  successful save. QA is writing the oracle from these dimensions at Phase 1.
- **Recommendation**: Add the position of each save's delete, relative to the other save's write
  and commit, as a table dimension. State M5-c's deletion scope as a property that holds across it
  (which objects a continuation may remove), or record the case in RK-5 as bounded residue with
  its signature. State the orphan residue over its class: every object whose 204 was never
  processed.

F-4 MEDIUM cycle 1 pass 1 OPEN — M5-a and M5-e are stated over "upsert order", and nothing stored carries it.

- **Location**: plan § M5, M5-a, M5-e; X-5. Code at `1ad625e`:
  `src/server/api/utils/shared.ts` `upsertMessage` (`genUuid().replace(/-/g, '')`),
  `buildMessageValues`, `buildUpsertMessageQuery`.
- **Description**: The outcome rule is "the committed nonce is that of the latest-upserted save
  whose 204 was processed". A continuation deciding whether to commit has to know whether the nonce
  now in the row belongs to an earlier or a later save. The nonce is a random UUID. The row holds
  one `updatedAt`, which every upsert overwrites whether or not its image succeeds. So the stored
  row cannot tell a committed earlier save from a committed later one. X-5 says no design needs a
  schema change, without naming the stored value that orders two saves.
- **Impact**: QA's oracle and the implementer's code each have to supply the order's definition,
  with its ties and the clock skew between invocations, and they can differ. If the definition
  needs a column, X-5 falls, and the determination sends that to him as a scope delta.
- **Recommendation**: Name in M5-e the observable that orders two saves of one message, and its tie
  rule, from what the row and the nonce can carry. Or restate the table's outcome as one the
  existing columns decide, and say what that gives up. Re-aim X-5's reason at that read.

F-5 MEDIUM cycle 1 pass 1 OPEN — M5-f and RK-2: the log instrument has no retention, window or non-zero read, and at the measured rate its count reads zero either way.

- **Location**: plan § M5, M5-f ("Instrument: Vercel's runtime logs for the production
  deployment"); RK-1, RK-2; D-8.
- **Description**: Three things an observable criterion declares are absent. (1) Reset semantics:
  Vercel keeps runtime logs for 1 hour to 30 days depending on the plan (Premises), and the
  project's tier is unread. (2) The window RK-2's "count of 'no answer within T' lines" is read
  over, and its reader. (3) The non-zero precedent: the plan hands it to QA Phase 1 ("or states
  that none exists"), where planner.md has the criterion cite the read. Separately, T's model names
  two terms and omits a queue on the measured path: the generator's pool is `max: 1`, so the k-th
  concurrent request waits for k−1 renders.
- **Impact**: AN-4 records 15 non-successes in 16847 requests and 196 generations in the last 30
  days, about one failure in 170 days. Against a retention of 30 days at most, a count read on any
  day is expected to be zero whether the line works or not. D-8's "failures become countable", the
  words he was shown, holds only for a reader inside the retention window.
- **Recommendation**: State the retention beside M5-f (a read of the project's plan, like G-1's, or
  his word). State the window RK-2's count is read over and its reader, as a carrier. Cite the
  non-zero read in the criterion once QA has it. If the retention is shorter than the expected gap
  between failures, state that to him as a limit of D-8 as selected; it is not a reopening. Add the
  pool to T's model.

F-6 MEDIUM cycle 1 pass 1 OPEN — M5-0 limb 2: "fails" has no control and no third outcome.

- **Location**: plan § M5, M5-0 limb 2 and "If either limb fails"; D-15; OQ-7.
- **Description**: The gate passes if one line from a `waitUntil` promise appears in the preview
  deployment's runtime logs. A missing line has four causes the criterion cannot tell apart:
  `waitUntil` does not hold the work; the instrument does not show runtime output (`vercel logs` on
  CLI 29.1.1 is named and has not been read for this project); the preview never built or could
  not be reached (the plan itself says that what a branch push deploys is unread); the line aged
  out (F-5). The run "without `waitUntil`" tests H-2, not the instrument. The probe also cannot be
  "only a Pages API route": `@vercel/functions` is not installed at the base (AN-3), so the branch
  carries a manifest and a lockfile change. Who writes the probe and who requests the route are
  not named.
- **Impact**: D-15's stop condition is "If the probe fails, M5 and M6 stop and come back to you
  with the fallback", so one inconclusive read sends 2 of 7 milestones to a fallback that departs
  from D-8.
- **Recommendation**: Give the gate three outcomes (kept alive, not kept alive, not readable) and
  say which one D-15's "fails" means. Have the probe route emit a line before it responds, read by
  the same instrument, so that a missing post-response line means something. Name the probe's
  author, the party that requests the route, and what the branch carries.

F-7 MEDIUM cycle 1 pass 1 OPEN — M3 puts the storage change in shared code that backs three other stores, and no limb covers them.

- **Location**: plan § M3, Surfaces ("A change to how the draft is stored is made once in that
  shared code, never in one caller"). Code at `1ad625e`: `src/utils/hooks/useLocalStorage.ts`
  (`useTheme`, `useFrequentEmojis`, `useClientPreferences`, `useLocalMessageStore`);
  `src/utils/withLocalStorage.ts`.
- **Description**: `withLocalStorage` and `useLocalStorage` are a generic key and value store with
  four callers. What makes the draft one shared copy is a caller, `useLocalMessageStore`, which
  asks for the single key `message`, together with `MessageProvider`'s effects. M3-e's members are
  all of the `message` key. A change made "in that shared code" also changes how the theme, the
  frequent emojis and the client preferences are stored and synced across tabs, and no criterion
  says what they keep.
- **Impact**: 3 of the 4 stores on the changed code have no criterion. A regression there, such as
  a theme that stops following the other tab or preferences reset on first load, passes every M3
  limb.
- **Recommendation**: Either add a preservation limb over the other three stores, the class read
  from `useLocalStorage.ts`'s exports, with literal stored strings as M3-e uses; or place the
  change where the single key is chosen and mark that as the sibling reading, with its reason.

F-8 MEDIUM cycle 1 pass 1 OPEN — M3 changes what the browser stores and carries no write matrix; what ends a stored copy is not stated.

- **Location**: plan § M3, M3-b, M3-c, M3-e, M3-f; planner.md, Milestones (write matrix). Code at
  `1ad625e`: `MessageProvider/index.tsx` `useValue` (the fetch effect's `localMessageStore.set`,
  the `message` effect, `getMessage`); `withLocalStorage.ts` `set`.
- **Description**: Today the store is one key, overwritten on every open, so it is bounded by
  construction. M3-b needs message *n*'s unsaved edits and route 0's draft to coexist, and M3-c
  needs one tab's draft to survive another tab's writes. A cached copy of a saved message is a row
  derived from mutable upstream state. The plan gives no matrix of stored content (which message,
  which tab, data, name, `updatedAt`) against transitions (first open, this tab's save, another
  tab's save, deletion of the message, opening another message, sign-out, reload). Three things
  are therefore open. What removes a copy. Whether a signed-in user's edits on one message survive
  opening another, the case steering told him at 22:32Z a source fix "would likely also stop",
  marked there as its inference. What bounds the store's size. `withLocalStorage`'s `set` calls
  `localStorage.setItem` with no catch, from `MessageProvider` effects.
- **Impact**: Without the matrix the implementer chooses each cell, and QA cannot tell a missing
  behaviour from a decided one. A store that keeps one copy per message opened has no bound, and a
  write that fails at the browser's quota throws inside an effect on every later edit.
- **Recommendation**: Add the matrix to M3, each cell naming the writing code path or an
  Exclusions row. State the store's bound as a property, or as a stated limit with what a failed
  write does. No new guard is asked for; the matrix is what planner.md already requires of a
  milestone that stores such rows.

F-9 MEDIUM cycle 1 pass 1 OPEN — Six universal limbs are contradicted by the plan's own text.

- **Location and description**, one line per member:
  1. § M3, "Every limb below is red at `1ad625e`" (and Price, "Every limb is red at the base").
     M3-e is a preservation property, green at the base by construction. M3-f cannot be evaluated
     at the base.
  2. M5-a, "Otherwise it equals the value it held before *s*". Where a later save has committed,
     the row holds that save's nonce (M5-e).
  3. M5-a, "the save's response is unchanged". `upsertMessage` returns `getMessage(id)`, which
     selects `previewImageNonce`. Today that is the new nonce; under M5-a it is the previous one or
     null.
  4. M5-f, "For every save whose outcome class is not 204, exactly one line". The sixth class, a
     continuation the platform ends, "cannot log", by the same limb.
  5. M6-a, "Every other request is answered 500". The same limb keeps "wrong key, 404". A request
     whose pool acquire never resolves is not answered at all (`system-architecture.md`, the
     generic-pool Problem Area; M5's "no answer within T").
  6. M2-a states its class as a product of three kinds and six conditions, 18 cells, "green at
     `1ad625e` for every member". AN-1 ran 10 named members in two orders
     (`an1/rows-395510e.json`, 24 rows with the two controls). Cells such as V2 with trailing
     whitespace were not run, and cells such as Classic with "Choose which to keep" cannot occur.
- **Impact**: QA Phase 1 is writing its strategy and the M5-e oracle from this text. Each member is
  a place where the reader picks the expected value.
- **Recommendation**: Restate each limb over the members it holds for, and name the rest as residue
  or as another limb's. For M3, say per limb where its red comes from: the base tree, or a mutation
  at the tip (M3-e, M3-f). For M2-a, list AN-1's members by name in place of the product.

F-10 MEDIUM cycle 1 pass 1 OPEN — The generator's deploy and its rollback need a runner on the host that no stage bound by the plan can start.

- **Location**: plan § Release and rollback ("pushed by devops on his word; `prod.yml` deploys");
  § M6, Rollback ("prod.yml redeploys"). `architecture/preview-image-generator.md` P-3.
- **Description**: P-3 records that a push to `prod` while the self-hosted runner is down queues
  the job and deploys nothing; that at chain 015's release the generator deployed 24 minutes after
  the push, because the owner had to start the runner on the host; and that "a release that pushes
  `prod` confirms the deployed commit on the host, not only the push". The plan writes the deploy
  and the rollback as following from the push. Starting the runner is a host act that no stage may
  perform.
- **Impact**: 24 minutes at the last release. A rollback runs generator first, then website. A
  rollback push that deploys nothing leaves the new generator serving while the website is
  reverted, which is the window the plan's order exists to avoid (old website, new generator,
  nothing deletes).
- **Recommendation**: Carry P-3 into § Release and rollback: the runner's start as an owner step,
  with the condition that calls for it; what devops takes as evidence that the generator deployed,
  under its own deploy-evidence rule; and that the website's revert waits on it.

F-11 MEDIUM cycle 1 pass 1 OPEN — Two instruments are carried from chain 015 unread, and the precedent does not hold what they cite it for.

- **Location**: plan § M5, Human-observable form; § M6, opening paragraph; § Testing Strategy,
  "Generator".
- **Description**: Both lines cite `verification/015/m8-local-probe/` and say "not re-read". Read
  in this pass: `probe.cjs` `BASE_ENV` sets `CDN_ENDPOINT` and `PREVIEW_ENDPOINT` to
  `http://127.0.0.1:1`, a dead port, and `grep -c PutObject` is 0 in each of its five probe
  sources. The precedent forks the built server with no network. It has no S3 stub and no
  `/preview` that answers. So M6's probe needs a bucket stub that records writes and the absence of
  deletes, a `/preview` stub that answers each status class, and a real browser for `page.goto`.
  M5's local walk needs a generator, a bucket and a host the local page reads the image from.
  Nobody has built these, and no step or stage is named to build them.
- **Impact**: M6 has no suite, so the probe is its only verification, and M6-a's main new member (a
  `goto` that resolves outside 200 to 299) needs the whole rig. M5's walk is item 2's only human
  look before release.
- **Recommendation**: Replace the precedent claim with what the read shows. Name the milestone step
  and the stage that build the two stubs and the M5 walk's image path, as a provision step from
  plan time, and what removes them.

F-12 LOW cycle 1 pass 1 OPEN — RK-7's falsifier names no reader and no carrier.

- **Location**: plan § Risks, RK-7.
- **Description**: The falsifier is "the generator host's failure-stack count after release against
  AN-4's count". The error log has no timestamps (AN-4), so the read is a difference against 15
  with no window. No stage, time or carrier is named; RK-1 and RK-2 each name a row.
- **Impact**: A post-release read with no reader is not made.
- **Recommendation**: Name the carrier (a QA post-deploy row, or the handoff the closing stage
  mints) and the point "after release" is read at.

F-13 LOW cycle 1 pass 1 OPEN — M2's human-observable form has an unstated reachability condition.

- **Location**: plan § M2, Human-observable form ("save and keep typing at once").
- **Description**: Tab 1's observation can fail only when an edit lands between the send and the
  broadcast's arrival. Outside that window the unfixed tree shows the same thing as the fixed one.
- **Impact**: A walk that misses the window passes M2-b without exercising it.
- **Recommendation**: State the condition. Say that his production look confirms tab 2's notice
  (M2-c) and cannot by itself confirm M2-b.

F-14 LOW cycle 1 pass 1 OPEN — M2's residue names one cause of a record that never clears, and the code has two routine ones.

- **Location**: plan § M2, "Window"; RK-3. Code at `1ad625e`: `shared.ts` `upsertMessage`
  (`if (message.id)` before `pusher.trigger`).
- **Description**: A record ends only when an equal broadcast arrives. `upsertMessage` broadcasts
  nothing when the save is rejected, or when the message has no id yet. So every failed save and
  every creating save leaves its record for the life of the page. The residue sentence names only
  a broadcast Pusher never delivers.
- **Impact**: The consequence is the one the plan states, a later remote save of exactly that
  content going unflagged, over a larger class than it names.
- **Recommendation**: Name both members in the bounded class, or say what ends a record whose save
  broadcast nothing.

F-15 LOW cycle 1 pass 1 OPEN — The cross-repo contract skill is deferred to another stage.

- **Location**: plan § Release and rollback ("not read this revision; QA Phase 1 or the architect
  names whether it applies").
- **Description**: planner.md makes that read the planner's. Read in this pass: the skill governs
  shared types and pinned dependencies. The generator imports nothing from the website or
  project-utils, and the `/generate` body is typed on each side (`server.ts` `processImage`,
  `shared.ts` `postMessagePreviewImage`), so there is no shared type to import, and M6 keeps the
  wire shape. What changes is the meaning of 204 and who deletes, which § Release and rollback
  coordinates in both orders.
- **Impact**: A reader cannot tell from the plan whether the skill bars anything.
- **Recommendation**: Replace the sentence with the read's result.

F-16 LOW cycle 1 pass 1 OPEN — "`getPreviewImageUrl` (unchanged)" carries no Exclusions row.

- **Location**: plan § M5, Surfaces.
- **Description**: The determination puts the read sites in scope "only if the design adds a
  fallback there". The plan adds none, and no row says so. `tools/check-repo.js` lists the line
  under OUT-OF-SCOPE.
- **Impact**: An exclusion with no reason and no carrier.
- **Recommendation**: One Exclusions row for the read sites, with its reason.

F-17 LOW cycle 1 pass 1 OPEN — Three rollbacks and one criterion name no runner.

- **Location**: plan § M3, § M4 and § M5, Rollback; § M7, M7-b.
- **Description**: M3, M4 and M5 give the revert command without the party; M1 and M2 name it.
  M7-b names its instrument and no stage.
- **Impact**: A step with no runner is nobody's.
- **Recommendation**: Name the party on each rollback and the stage that runs M7-b's comparison.

F-18 LOW cycle 1 pass 1 OPEN — Reading Order rows do not use the plan's headings.

- **Location**: plan § Reading Order.
- **Description**: "Milestones" is not a heading; the section is `## Plan` and the milestones are
  `### M1 …`. "Entry facts" is `## Entry facts (per repository)`. planner.md asks for exact
  headings, so that a role takes a bounded read.
- **Impact**: Every role's first search for its section misses.
- **Recommendation**: Use the headings as written. It lands with revision 2.

## Review-method lines with no finding

- **Reading Order.** Present from revision 1, as 615 lines require. F-18 is its one defect.
- **Release target.** The Target Release matches the scoping block's end step: website `master`,
  then the generator's `prod`, each push his word, run by devops. The probe's preview push is not
  a release, and D-15 covers it.
- **Decisions Register.** Each row carries its date, his words or the selected option with its
  author, the route and a reopening class. D-13 is marked agent-authored. R-4's write set is three
  rows and one changelog line.
- **Port, parity, scale.** No parity is claimed and no unit count is raised. T's queue is in F-5.
- **Siblings.** Every milestone names one. F-1 and F-7 are the two places where the named sibling
  does not carry what the plan says it does.
- **Analysis incorporated.** AN-1 to M2; AN-2 to M3 and M4; AN-3 to M5's mechanism and OQ-7; AN-4
  to T. G-4 is exercised by UAT's two-tab walk, G-5 is X-16, and G-6 is M4-c's walk.
- **Constraints.** The plan holds no code. The test files it names are existing ones to tighten.
- **Version.** Neither `package.json` has a version field, so no version milestone is owed.
- **Input robustness.** No "what if the input is X" finding was raised. M6-a's status members are
  the generator's own contract.

## Questions

- **For the planner, on a label.** D-10 and § Validation state "no Fluid compute" as read. AN-3
  grades the half "the default is the effective setting" as Inference. No criterion was found to
  rest on it; T rests on the 60 s value, which is Observed in both configurations. Is the label
  carried deliberately?
- **On X-13, no finding.** Its reason is "Read, not run". Steering's helper ran it under webpack
  (`steering/017-rulings.md`, block 23:24Z); Turbopack, which that block names as Next 16's default
  builder, was not run. The exclusion is the conservative direction either way. It is noted
  because the brief lists it as unchecked.
