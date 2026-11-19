---
ID: 017
Origin: 017
UUID: 5c3e9a71
Verified-At: "5c3d03f — repos=website; M4 only, the refresh. The suite, the typecheck and the survivor's re-run ran in isolated git archive exports of 5c3d03f. The first pass ran at a5dd76f; 5c3d03f differs from it in one test file."
Status: Released
Status-Detail: "Released at release identifier website master 787bec5 and generator prod 8512a1d (pushed 2026-11-19T20:11Z and 20:14Z by devops Stage 2); closed. Anchor fields above keep the values the document was written at. Post-deploy rows B-6 to B-11 ride handoff/017-existing-items-backlog-post-deploy-2026-11-19.md."
Phase: 2
---

# QA Report: Plan 017 — M4 (a link away from an editor with unsaved changes asks first)

**Plan Reference**: `agent-output/planning/017-existing-items-backlog.md`, revision 4. The plan's diff since my M3 pass
(`7ad3477..b6d8d17`) is two changelog rows (R-18, R-19), so no criterion moved.
**Implementation Reference**: `implementation/017-existing-items-backlog-m4-implementation.md`, `Handoff-At: a5dd76f`,
first delivery `de06d95`, and its Fix Round 4.
**Stage start**: code review Round 4 sub-entry, APPROVED, `Reviewed-At: a5dd76f`
(`code-review/017-existing-items-backlog-code-review.md`, agent-output `e12881a`; plan row R-19 `b6d8d17`), re-derived at the
record. It came after Round 4 REJECTED at `de06d95` (CR-9 HIGH). The branch `chain/017-existing-items-backlog` and the shared
tree's HEAD were `a5dd76f` at this pass's start and end.
**Blocking-condition register**: `qa/017-existing-items-backlog-qa.md`. This pass appends B-12.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-19T03:49 | code-reviewer-hooks-017 (cross-session message; review `e12881a`) | QA Phase 2 for M4 at website `a5dd76f` | Phase 2, M4 only. Started. Steering's brief for M4 has not arrived, so the stage start is the committed review verdict. |
| 2026-11-19T04:10 | (this pass) | — | Suite 1693 of 1693, exit 0; typecheck exit 0. The class listings were re-derived at the tip and match. Sweep over M4's production diff: 41 generated mutants plus 14 of QA's, 52 of 55 killed. NM-29 was placed as a two-file mutant and killed (15 cases). Two survivors were probed in an isolated export. **QA Failed**: QAF-18 MEDIUM (the withdrawal case cannot fail) and QAF-19 LOW (a title prints the wrong column). B-12 appended to the register. Steering's 04:14Z cap (`a805d4d`) arrived before commit: QAF-18 keeps its round as a severity-floor finding, and QAF-19 goes to the Planner batch. |
| 2026-11-19T04:22 | code-reviewer-hooks-017 (cross-session message; review `33b90ce`, plan R-22 `8441052`) | Scoped refresh of M4 at website `5c3d03f` | Refresh. The fix round is one test-only commit over `a5dd76f`. Suite 1693 of 1693, exit 0, the same case set in every file; typecheck exit 0. `qa-unregister-unconditional` was re-run at `5c3d03f` and is killed by the repaired case, as an assertion. **QA Complete** (M4-scoped), superseding the `a5dd76f` QA Failed. QAF-18 RESOLVED. Process fact: the one-mutant re-run was not delegated to a helper. |
| 2026-11-19T19:13 | devops-hooks-017 (Stage 1) | Document closed | Document closed. Status: Committed. Plan 017 is committed on chain/017-existing-items-backlog (website 7293a35, generator 8512a1d) at devops Stage 1; the release is Stage 2. |
| 2026-11-19T20:18 | devops-hooks-017 (Stage 2) | Document closed | Document closed. Status: Released. Plan 017 released: website master 787bec5 (2026-11-19T20:11:47Z) and generator prod 8512a1d (20:14:17Z); release-tip verdict agent-output c09fd41. Deployment record deployment/closed/017-existing-items-backlog-deployment.md. |

## Criteria assessed

These are M4-a to M4-d and the known limit X-14, as revision 4 states them, plus the Phase 1 obligations: NM-8, NM-9, NM-24,
NM-25 and NM-29; QAF-8 (the human-observable form names a link the page renders); and QAF-12 (separate dialog instances).
I read them before the suite ran, from the plan's `### M4` and my Phase 1 § M4. I wrote them here after the suite ran and
before I read the mutation results.

**Example classes.** M4-b's human-observable form names two examples, the avatar link and the Sidebar's `/message`. Both
belong to M4-d's class, which the criterion enumerates as a table. The test is therefore read per member of that table (below),
not per example.

## Implementation Review (Post-Implementation)

- **TDD gate.** Both tables are present (first delivery, and Fix Round 4). Every new function or class has a row with a red:
  - `NavigationGuardProvider` and `useNavigationGuard`: compile-time first, then assertion-level, 12 of 27.
  - `StyledLink`'s `onNavigate` and `onClick` paths, including `hrefToString`'s `URL` branch: 12 of 27, then 1.
  - `MessageProvider`'s registration and `isSameMessage`: 15 of 22, then 1.
  - `useUnloadAlert`: 1.
  - CR-9's gate: 2 of 33, then 3 of 72 against the `de06d95` source.
  - CR-11's `replace`: 1 of 35.

  Two rows say "No": the `NavMenu` cases, and the boundary rows added after the first green. Neither is a new function. Each
  names the mutants that close it, and this pass's sweep re-checked those mutants independently. Gate passed.
- **Production diff.** `git diff 1ab3b96 a5dd76f` over production paths covers 6 files: `message/layout.tsx`,
  `ConfirmationDialog.tsx`, `StyledLink.tsx`, `MessageProvider/index.tsx`, the new `NavigationGuardProvider.tsx`, and
  `useUnloadAlert.ts`. It matches the plan's surfaces plus CR-9's `ConfirmationDialog`. No overreach.
- **M4-c.** `git grep -c "next/router" a5dd76f -- src ':!**/__tests__/**'` prints no line (exit 1). `useUnloadAlert` keeps
  only `useBeforeUnload`.
- **M4-d, re-derived at the tip** (`verification/017/qa-m4/class-listings-a5dd76f.out`):
  - `next/link` importers: 2, `StyledLink.tsx` and `m/[id]/_layout/Navigation.tsx`.
  - `StyledLink` importers: 11, the implementer's 11.
  - Raw `<a` anchors on editor routes: `EmbedAuthor.tsx` and `EmbedTitle.tsx` only. The other hits are on the legal pages,
    the landing page and a doc comment, none of them an editor route.
  - Production callers of `useConfirmation(`: `JsonModalBody`, `Navigation`, `ConfirmationDialog`, `usePusher` and
    `NavigationGuardProvider`. None renders a `StyledLink`, so AF-22's shadowing has no link member.

  The implementer's three corrections to the plan's table check out against these listings (Invite Bot and the `InfoPanel`
  invitation are members; Support and the cookie notice open a new tab). They are the planner's to fold.
- **M4-a's deviation** (a second interception in `onClick` for a link to another site) is recorded, with its reason, under
  the 02:43Z ruling. The code reviewer read it against Next 16.1.6's `linkClicked`. This pass did not re-read Next's source.
  The instrument limit stands: vitest resolves the pages-router `link.js`, and UAT B-3 and B-12 are the app-router check.

## Test Coverage Analysis

M4-b and M4-d, member by member, each mapped to its case in the `a5dd76f` run (`vitest-a5dd76f.json`, by `fullName`; the
case list is in `m4-case-list.txt`):

| Member or clause | Case (layout = `layout.navigation-guard`, provider = `NavigationGuardProvider.link-confirmation`) | Carries alone (mutant) |
|---|---|---|
| Avatar `/message/f/0`, editor route: prompt, Cancel keeps edits, confirm navigates | layout "asks before the avatar link leaves the editor, and Cancel keeps the edits"; "navigates to the avatar link when the prompt is confirmed" | `qa-guard-context-not-mounted` (22), `index.tsx:126:not` |
| A link inside the editor's own providers | layout "asks the same for a link rendered inside the editor's own providers" | NM-29 (15) |
| Keyboard activation (`detail: 0`) | layout and provider "asks for a link activated from the keyboard" | `qa-nm9-pointer-only` (2) |
| `hasChanged` false: no prompt | layout "does not ask while nothing has changed"; "does not ask for a sidebar link when nothing has changed" | `qa-register-ignores-hasChanged` (2 assertion cases) |
| Same message exact, never a prefix | layout lookalikes ×6, "search result to …" ×4, "does not ask for the link to the same message's send page" | NM-8 `qa-nm8-same-message-by-prefix` (2); `qa-same-message-end-unanchored` (1); `qa-same-message-origin-dropped` (1) |
| Header search results to another message (`/send`) | layout "search result to another message whose id …" ×2 | NM-8 |
| Sidebar `/`, `/message`, `/message/f/0`, `/message/m/0/edit`, `/legal/terms`, `/legal/privacy` | layout "asks before %s leaves the page" ×6; route 0's own edit link not asked | `qa-guard-context-not-mounted` |
| `send/page.tsx` crumbs (folder, user ×2), back-to-editor links not asked | layout "the send page's own links" ×3 | NM-29 |
| `InfoPanel` bot invitation (another site) | layout "asks before the bot invitation …"; provider "StyledLink to another site" block | `qa-url-href-read-as-path` (2), `StyledLink.tsx:13:if-false` |
| `NavMenu` Create Message, Servers, Invite Bot; Support not asked | `NavMenu.navigation-guard` ×4 | (through `Dropdown`; covered by the `StyledLink` kills) |
| "New" (`target=_blank`), cookie notice (new tab) | provider "leaves a link that opens a new tab …" (both directions) | `StyledLink.tsx:23:!==` (2) |
| Modified clicks: ctrl, meta, shift, alt, middle, `download`, `_self` | provider, one case per conjunct, for another site | `StyledLink.tsx:24:||`…`||:4`, `:24:===`, `:24:num`, `:25:not`, `:23:!==`; NM-24 `qa-nm24-modified-click-held` (7) |
| An already handled click | provider "leaves a link to another site alone when its own click handler has already handled the click" | `StyledLink.tsx:41:if-false` (1) |
| `replace` and `scroll` carried on confirm | provider "replaces the history entry on confirm …" (local and other site) | `qa-replace-not-passed-local` (1), `qa-scroll-not-passed` (1), CR-11's pair |
| Other-site confirm with no second browser prompt | provider "leaves for the address … with no second browser prompt" | `qa-external-confirm-without-suppression` (2) |
| Both prompts open, each answered on its own (pointer and Enter) | layout "keeps both open …"; "answers only the prompt that holds focus …" ×2; provider "keeps both prompts open …" | NM-25 `qa-nm25-editor-prompt-shares-layout-slot` (4); `ConfirmationDialog.tsx:17:if-false` (2) |
| `/send` renders no update prompt | layout "renders no editor prompt on the send page, and still asks for its links" | NM-29 |
| No editor mounted: links navigate as before | provider "navigates as before on a page with no guard provider"; "navigates with no prompt when no guard is registered"; layout "stops asking once the editor has unmounted" | `NavigationGuardProvider.tsx:29:false` (1), `:43:if-false` (1) |
| An older registration withdrawn keeps the newer guard | provider "keeps the newer guard when an older registration is withdrawn" | **none: QAF-18** |
| The editor's own confirmations as at `1ad625e` | the standing suite's Reload and JSON-modal cases (pointer), unchanged and green; Enter: see the survivor `qa-enter-lone-dialog-dead` below | Enter on a lone prompt: equivalent under the fixture (probe) |
| X-14 (code navigations, redirects, back and forward) | none owed: a stated limit | — |

**Convention audit** over the five test files M4 touched and its two helpers (`qa-m4/audit-predicates-m4.sh`, a copy of
`qa-m1/audit-predicates.sh` with M4's file list; output in `audit-predicates.out`):
- 0 ID-token hits in titles, comments and basenames. The positive control matched 2 of 2.
- Every test basename has the positive form.
- 0 source-text reads.
- The `mountTree`, `mountGuarded` and `mountBoth` hits are wrappers over `mountDom`, not hand-rolled renderers.
- The time predicate's hits are `vi.useFakeTimers` and `advanceTimersByTime` in `useUnloadAlert.act-suppression` (2) and
  `page.sign-in-exit` (1). Both counts are the same at `1ab3b96`, so M4 added none.

Fixtures name what they invent. The `location` stub carries `href`, `origin` and the two navigation calls, and the
implementation document names it. The pages-router context in `helpers/linkNavigation.tsx` is the recorded instrument limit.
The `message.getOne` map holds stable objects (class C).

## Test Execution Results

Every capture is under `verification/017/qa-m4/`.

| Command | Result |
|---|---|
| `unshare -rn npx vitest run --reporter=json` in an export of `a5dd76f` (`vitest-a5dd76f.{json,out,exit}`) | 1693 of 1693 passed, 0 failed, 136 `testResults`, `success` true, process exit 0. Count method: the reporter's `numTotalTests`, `numPassedTests` and `numFailedTests`. The implementer's working-tree figure (1693) is now the tree's own figure. |
| `unshare -rn pnpm run typecheck` (both programs; `next-env.d.ts` and `.next/types/` copied in) (`typecheck-a5dd76f.{out,exit}`) | exit 0 |
| `qa-m1/suite-compare.mjs` against my M3 run `qa-m3/vitest-1ab3b96.json` (`compare-qa1ab3b96-vs-qaa5dd76f.out`) | 0 files only in M3's run. 3 files only in M4's: the three new M4 files, 72 cases between them. `useUnloadAlert.act-suppression` gains 1 case and loses none. Every other file has the same case and status set. 1620 + 72 + 1 = 1693. |
| Coupling mutants of `StyledLink`'s `onClick` rule, `mutation-run.py`, scoped to the provider and `NavMenu` files (`m4-mutants-coupling.json`, `sweep-coupling/`, `sweep-coupling-run.{out,err,exit}`) | Control 39 of 39 passed. 2 of 2 killed, 16 and 9 cases. |
| Mutation sweep, `mutation-run.py --sha a5dd76f --dep node_modules -- unshare -rn npx vitest run`, the whole suite per mutant, driven by a `general-purpose` helper (`sweep/mutation-table-a5dd76f…-p1405162.json`, `sweep-run.{out,err,exit}`) | Control 1693 of 1693 passed, exit 0. 55 mutants: 41 from `node ~/.claude/tools/mutant-gen.js --range 1ab3b96..a5dd76f`, the production files of M4's diff only (`m4-mutants-gen.json`; it skips test files), plus QA's 14 (`build-qa-mutants.py` → `m4-mutants-qa-hand.json`). **52 of 55 killed**, all applied, with 0 stillborn, 0 aborted and 0 timeouts. 3 survived (below). |
| NM-29, two files, with `verification/017/impl/m4/mutate-edits.py` (agent-output blob `97ca6b6`, committed at `e5d520a`) in my export (`nm29-edits.json`, `nm29-run/`, `nm29-run.{out,exit}`) | **Killed.** Suite exit 1; 15 of 1693 failing, every first failure line an `AssertionError`, and no module or compile error. The failing cases are every link inside `m/[id]` on both routes, the two-prompt cases and the send page's "no editor prompt". The export's two mutated files were `cmp`-identical to `a5dd76f` afterwards. |
| Survivor probes, `probes/run-probes.py` in a second export (`probes/out/`, `probes/run-probes.out`) | `stable-withdraw`: green at the tip (exit 0), **red** under `qa-unregister-unconditional` (exit 1). `lone-enter`: green at the tip and green under `qa-enter-lone-dialog-dead`, 2 of 2 both times. |

**The range swept**: `git diff 1ab3b96..a5dd76f`, production paths: `src/components/StyledLink.tsx` (25 generated mutants),
`src/providers/NavigationGuardProvider.tsx` (9), `src/providers/MessageProvider/index.tsx` (6) and
`src/components/ConfirmationDialog.tsx` (1). QA's mutants also cover `src/app/message/layout.tsx` and
`src/app/message/m/[id]/layout.tsx`. The generator wrote none for `useUnloadAlert.ts`, which has only deleted lines; M4-c is
checked by `git grep`, above.

**Suite instruments** (blobs at `a5dd76f`): `NavigationGuardProvider.link-confirmation.test.tsx` `4895931`,
`layout.navigation-guard.test.tsx` `a45d68f`, `NavMenu.navigation-guard.test.tsx` `7d8b703`, `helpers/click.ts` `f17b3e6`,
`helpers/linkNavigation.tsx` `a6c883d`. Every kill is by committed instruments.

**This milestone's sweep is not owed by the Irreversible Side-Effect Register.** M4 changes none of E-1 to E-9. It is run
because the named mutants are Phase 1's. The effort-final sweep is still owed.

**Survivors, each dispositioned:**

| Mutant | Disposition |
|---|---|
| `StyledLink.tsx:34:false` (`prefetch: false` to `true`) | Equivalent under test. It is the base default carried into the range by the edit beside it, and the recording router never prefetches. Not an M4 guard. Agrees with the implementer's disposition. |
| `qa-enter-lone-dialog-dead` (`ConfirmationDialog`'s Enter gated on two dialogs being open) | Equivalent at every focus the fixture reaches. The probe shows that with one prompt open, Enter answers it through the autofocused confirm button (react-aria's own key press), with or without the hotkey: 2 of 2 green under the mutant. The hotkey's lone-prompt path decides only when focus lies inside the dialog but off its buttons. The realistic loss of the gate, for every dialog, is killed by `ConfirmationDialog.tsx:17:if-false` and CR-9's four mutants. Residue: no jsdom case puts focus off the buttons. The real-browser form is B-12's lone-prompt limb. |
| `qa-unregister-unconditional` (the withdrawal clears any guard, not only its own) | **Not equivalent: QAF-18.** The probe with one function per guard is red under it and green at the tip. |

**Seen-red record for the M4 test files** (`seen-red-coverage.out`). The predicate: every case in the three new files and in
`useUnloadAlert.act-suppression` (79 cases), matched by `fullName` against the union of the sweep's `failing_titles` and
NM-29's failed list. 66 were reddened, 13 never were:
- **6 local-link cases**: ctrl, meta, shift, alt, a new tab, and `NavMenu`'s Support. Next skips `onNavigate` for these, so no
  single-token mutant of `StyledLink` reaches them. I ran two coupling mutants of `StyledLink`'s `onClick` rule myself, over
  the provider and `NavMenu` files (`m4-mutants-coupling.json`, `sweep-coupling/`; control 39 of 39 passed):
  - `qa-onclick-holds-every-link` killed 16 cases;
  - `qa-onclick-holds-local-links-ignoring-modifiers` killed 9.

  Each of the 6 is among them, so they discriminate. Process fact: this two-mutant run was not delegated to a helper.
- **6 `useUnloadAlert` "exits that lose nothing" cases**: M3's, seen red at M3's pass. M4 only deleted lines in that file, so
  this sweep has no mutant there.
- **M4-c's "raises no confirmation on a route-change event"**: it specifies an absence, of the deleted handler. The
  implementer's red against the pre-change hook is its seen-red (`impl/m4/red-router-hook.json`, 1 failing). No mutant of
  the tip can re-add the handler.
- **The provider's "keeps the newer guard when an older registration is withdrawn"**: no mutant reddens it, and
  `qa-unregister-unconditional` survives it. It is non-discriminating: QAF-18.

An earlier draft of this paragraph said "every M4 case except one". It was written before this count was run, and the count
falsified it. This paragraph replaces that draft before commit.

**Residue outside M4.** `messageValidity.predicate.test.ts` "imports the gate directly, not via the `~/utils` barrel …" timed
out at vitest's 5000 ms default in 1 of 56 sweep runs (mutant-53's stderr). It is a load-induced timeout in a pre-existing
case. Mutant-53 is still killed by its 2 assertion failures. Routed to `INBOX.md`.

## Findings

QAF-18 MEDIUM Phase 2
- **What fails.** Provider "keeps the newer guard when an older registration is withdrawn" cannot fail.
- **Why.** Its `<Registers guard={() => true} />` builds a new function on every render. When the older registration is
  withdrawn, `Both` re-renders, and the newer guard re-registers under a new identity. So `if (guardRef.current === guard)` in
  `NavigationGuardProvider`'s `register` carries no decision. Its mutant `qa-unregister-unconditional` survives the whole
  suite.
- **Why it blocks.** The case's title claims this behaviour, and so does the implementation document's TDD row ("a withdrawn
  older registration"). Under the severity floor, a claimed behaviour with no failing assertion is at least MEDIUM.
- **The fix.** Test-only. Give each of the case's two guards one function for the case's life, a module constant or a ref.
- **Evidence.** The probe form (`probes/run-probes.py`, `STABLE_WITHDRAW`) is green at `a5dd76f` and red under the mutant.
  The case passes when its red run is recorded under `qa-unregister-unconditional`.

QAF-19 LOW Phase 2
- **What is wrong.** Layout `it.each` "search result to %s: asks is %s" formats the row's second column, the current id, as
  its expectation.
- **Effect.** The titles read "search result to this message: asks is 4" while the case asserts no prompt. A failing run
  would print a title that misstates what was expected.
- **The fix.** Put the expectation in the second format slot, or use `$`-named fields. Not blocking.
- **Routing.** Under steering's M4 cap (`steering/017-rulings.md` block 2026-11-19T04:14Z, `a805d4d`), a gap below HIGH that
  is not a severity-floor finding gets no fix round. QAF-19 therefore goes to the plan's Planner batch as a stated limit,
  through `planner-hooks-017`, and does not ride QAF-18's round. The cap arrived while this pass was still uncommitted. An
  earlier draft of this line let it ride.

## Verdict

**QA Failed** for M4 at website `a5dd76f`, on QAF-18. Every other criterion member has a case that a mutant of its surface
reddens. NM-8, NM-9, NM-24, NM-25 and NM-29 are each killed by QA's own mutant. M4-c and M4-d's listings hold at the tip.

**The refresh.** The fix is test-only. It reaches code review's scoped check first. The refresh then re-runs the suite in an
export of the new tip and re-runs only `qa-unregister-unconditional` against the new case, since the round has no production
change. A production change in the round would widen the re-run to that round's diff.

Milestone-scoped: the plan's Status is unmoved. Rows inherited and not discharged: B-3 (UAT), B-9 (owner, production) and
the new B-12 (UAT).

## Refresh at website `5c3d03f` (scoped to M4)

**Stage start**: code review's Round 4 sub-entry, APPROVED at `Reviewed-At: 5c3d03f` (agent-output `33b90ce`; plan R-22
`8441052`), re-derived at the record. The branch `chain/017-existing-items-backlog` and the shared tree's HEAD were `5c3d03f`.

**Scope, from executing both trees, not from the file list.** `git log a5dd76f..5c3d03f` holds one commit.
`git diff --numstat a5dd76f 5c3d03f` shows one path,
`src/providers/__tests__/NavigationGuardProvider.link-confirmation.test.tsx`, +5 −2, now blob `4cd2db0`. The production
source is unchanged, so the round re-runs only the survivor it closes.

Every capture is under `verification/017/qa-m4-refresh/`.

| Command | Result |
|---|---|
| `unshare -rn npx vitest run --reporter=json` in an export of `5c3d03f` (`vitest-5c3d03f.{json,out,exit}`) | 1693 of 1693 passed, 136 `testResults`, `success` true, process exit 0 |
| `unshare -rn pnpm run typecheck` (`typecheck-5c3d03f.{out,exit}`) | exit 0 |
| `qa-m1/suite-compare.mjs` against `qa-m4/vitest-a5dd76f.json` (`compare-qaa5dd76f-vs-qa5c3d03f.out`) | No path only in either run. Every file has the same case and status set. The two runs differ in no case, which agrees with the one-file diff. |
| `mutation-run.py --sha 5c3d03f`, the whole suite, `qa-unregister-unconditional` alone (`survivor.json`, `sweep/`, `sweep-run.{out,err,exit}`) | Control 1693 of 1693 passed, exit 0. **KILLED**, with 1 failing case: provider "keeps the newer guard when an older registration is withdrawn", `AssertionError: expected 'go home' to contain 'You have unsaved changes!'`. The same mutant survived at `a5dd76f`. |

The repaired case's instrument is blob `4cd2db0`, which is committed, so the kill is scored.

QAF-18 MEDIUM Phase 2 RESOLVED. The case now uses one function per guard for its whole life (module constants
`OLDER_LETS_THROUGH` and `NEWER_HOLDS`). It is red under `qa-unregister-unconditional` and green at `5c3d03f`. The identity
check in `NavigationGuardProvider`'s `register` now has an assertion that fails when the check is lost.

QAF-19 LOW stays parked, as a stated limit in the plan's Planner batch (R-21, agent-output `2e8742e`).

**Refresh verdict: QA Complete** for M4 at website `5c3d03f`. It supersedes the `a5dd76f` QA Failed. Milestone-scoped, so
the plan's Status is unmoved. The effort-final sweep is still owed. Rows inherited and not discharged: B-3 and B-12 (UAT), and
B-9 (owner, production).

## Assumption Not Checked

This pass assumes the following and does not test it: in a real browser, with one confirmation open, focus sits on its
autofocused confirm button, so Enter answers that prompt through the button or the gated hotkey.
- **If it is false**, in B-12's lone-prompt limb Enter leaves the link prompt open. A user who answers by keyboard is then
  stuck until he clicks.
- **Owner**: UAT, at B-12. It is named again in the handoff.

## Handoff

- **QA Failed** (first pass): went to `implementer-hooks-017` for QAF-18 alone. It is discharged by the refresh above: QA
  Complete at `5c3d03f`.
- **Implementer**: M4 is cleared at `5c3d03f`. Nothing more is owed for M4.
- **QAF-19**: to `planner-hooks-017`, for the Planner batch as a stated limit (the 04:14Z cap).
- **To UAT**, when the chain reaches it: B-3 and B-12.
