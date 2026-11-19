---
ID: 017
Origin: 017
UUID: 5c3e9a71
Status: Open
Status-Detail: "Cycle 1 pass 2 on plan revision 2: REQUEST REVISION. F-1 to F-18 RESOLVED. F-19 MEDIUM and F-20 to F-23 LOW are OPEN. The stop authority fired on two shapes, closed as stated limits SL-1 and SL-2 with no revision asked on them. OQ-8, OQ-9 and OQ-10 are open with him; OQ-7 proceeds open (D-15)."
Artifact-Revision: 2 — the delta a3c1e83..3d678cc read whole; last whole read is revision 1 at d84b192
Reviewed-At: "3d678cc — repos=agent-output; website code read at 1ad625e (origin/master), generator at 8de2b53 (origin/prod)"
Verdict: REQUEST REVISION
---

# Critique — Plan 017, the existing-items backlog

**Artifact**: `planning/017-existing-items-backlog.md`, revision 2 (`3d678cc`), read as the delta
from `a3c1e83`. **Analysis**: `analysis/017-existing-items-backlog-analysis.md` (AN-1 to AN-4), read
whole at pass 1. **Also read at pass 1**: the commission and the scoping determination
(`steering/backlog-2026-11-18-rulings.md`, blocks 21:53Z and 21:59Z), `steering/017-rulings.md`,
`steering/017-brief-common.md`, and the three architecture documents (`system-architecture.md`,
`website.md`, `preview-image-generator.md`). **Date**: 2026-11-19.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-11-18T23:47 | steering-roadmap (brief `steering/backlog-2026-11-18-briefs/critic-hooks-017.md`) | cycle 1 pass 1: plan revision 1, whole-document read | First pass of the cycle, so the whole plan was read (615 lines at `d84b192`; a Reading Order is present). Boundary: revision 1 is `97e6814`. `97e6814..d84b192` is R-4, 4 lines added and none removed (`git diff --numstat`): three register rows and one changelog row, no criterion moved. `d84b192..a3c1e83` is the planner's Resumption State, 14 added and none removed; it touches no milestone scope, criterion text, instrument form or register effect. Artifact changes: none before this pass. New findings: F-1 and F-2 HIGH, F-3 to F-11 MEDIUM, F-12 to F-18 LOW, all OPEN. Findings addressed: none. Verdict REQUEST REVISION. Pricing: sized to the ask as he re-set it (D-11, D-12, D-14). Seam read, after this critique's first commit (`8bc0488`): the architect's pass (`406b34a`) and QA Phase 1 (`d1add83`, `06511f1`) were committed before it. Eight findings repeat one of theirs and carry `Duplicates:` (F-1, F-3, F-4, F-5, F-7, F-8, F-14, F-15); F-5 and F-6 now cite QA's runtime-log read. Ten are this critique's alone: F-2, F-6, F-9 to F-13, F-16 to F-18. |
| 2026-11-19T00:11 | planner-hooks-017 (message naming revision 2 at `3d678cc`) | cycle 1 pass 2: plan revision 2, delta-bounded | Resumed after a `/clear` from this critique's Resumption State at `a00e232`; nothing from pass 1 was carried without its commit. Depth: delta-bounded, because the delta `a3c1e83..3d678cc` (586 added, 285 removed, `git diff --numstat`) is fully readable in the diff and adds or removes no milestone; it was read whole. Artifact changes: revision 2 folds the three gates' findings, opens OQ-8 to OQ-10, registers D-17, adds X-17 to X-19 and RK-9, RK-10. Findings addressed: F-1 to F-18, all RESOLVED and collapsed to disposition lines. New findings: F-19 MEDIUM, F-20 to F-23 LOW, all OPEN. Stop authority fired on two shapes; closed as stated limits SL-1 and SL-2. Verdict REQUEST REVISION. Pricing: delivery sized to the ask; three added mechanisms unpriced (F-19). Reconcile: pass 1's F-9 said AN-1 ran 10 named members; the capture holds 11 in-class members (python read of `an1/rows-395510e.json`, 24 rows). The error was this critique's; the plan's M2-a has it right. Only that instance was checked; pass 1's other counts were not re-swept. Trim: the Resumption State section is removed; it carried the plan for this pass, now run. Pass 1's Reachability and Review-method sections are replaced by pass 2's; their content is in `a00e232` and each premise they carried is listed by name under Assumption Not Checked. |

## Verdict

**REQUEST REVISION — cycle 1, pass 2.**

Pricing: what each item delivers is sized to the ask, unchanged from revision 1. The mechanism under
items 2 and 4 grew in the fold, and three of the added mechanisms reach him without their
stated-limit alternative (F-19). That is the one finding this verdict rests on. F-20 to F-23 are LOW
and ride the same revision. A revision 3 is owed in any case: M3-d's table holds three cells that
read "per OQ-8".

**The stop authority fired, on two shapes.** Each is the second instance of a shape pass 1 raised
and revision 2 folded. No revision is asked on either; each is closed below as a stated limit.

- SL-1: a limb quantified over a class that another sentence of the plan contradicts (F-9's shape).
- SL-2: a finite class whose plan-time list omits members readable at the base (F-1's and F-2's
  shape).

The hard stop did not fire (pass 2 of 15). Nothing routes to the owner from this critique directly.
F-19's alternatives reach him through the planner's next revision. The planner's message says OQ-8,
OQ-9 and OQ-10 are going to him; this pass did not check that they were put.

No milestone is marked `PREMISE-STALE`.

## Stated limits (stop authority)

**SL-1. A limb and a mechanism sentence disagree.** Property: every limb quantified over a class
holds for each member the plan's mechanism sentences admit, except members the limb or its milestone
names as residue. Domain: the plan's criterion limbs, M1-a to M7-c, as `grep -n '^- \*\*M[0-9]-'`
lists them with M5-0 and M6-0. Checked this pass over every limb the delta touches, each read
against M2 "Record", M3 "Storage form" and "Write matrix", and M5-c's three forms. Not looked for: a
disagreement between a limb and a document outside the plan (QA's oracle, the architecture record).
Members found, recorded as limits and not as findings:

1. M2-b says every save followed by an edit before its broadcast raises no notice. M2 "Record"
   drops the record when the save's mutation errors. So a save that succeeds on the server while the
   client sees an error, then an edit, raises the notice when the broadcast arrives. M2 "Window"
   lists that same save under "a record T still holds", which "Record" says it does not.
2. M3-a ("restored unchanged") and M3-b ("shows the unsaved edits") hold only for an entry still
   stored. M3-h and "Storage form" evict the least recently edited entry at 21 entries and drop a
   write refused for quota.
3. "Storage form" gives the legacy key one meaning, the most recent route-0 draft. The matrix's
   first row keeps a legacy value that holds message *n* until the first route-0 write.

Reading rule until the text agrees: the mechanism sentence governs and the member is residue of the
limb. QA bears the detection cost at its Phase 1 re-key, where the oracle and mutants are written
from this text. On a new member QA keys the expected value to the mechanism sentence and sends the
planner the pair. The planner may fix these three in revision 3; no pass is owed on them.

**SL-2. M4-d's table omits members.** Property: M4-b is stated over M4-d's class definition, not
its table, and every member renders through `StyledLink`, which carries the guard. Enumeration, from
the tree: `git grep -l StyledLink -- src`, `git grep -l "next/link" -- src`, and the string
`onPress` item sites, because `Dropdown` takes its hrefs from its callers. Residue: navigations made
by code (X-14). Members the table omits, read at `1ad625e`:

1. `send/page.tsx`'s own `StyledLink`s to `/message/f/<guild>` and `/message/f/0`, inside
   `MessageProvider` on `/send`.
2. `NavMenu`'s string items `/message/m/new`, `/support` and `/message`, rendered through
   `Dropdown`'s `StyledLink`. `NavMenu` is mounted by `m/[id]/_layout/Navigation.tsx` and by
   `message/_layout/Header.tsx`.
3. M4-a's deviation sentence lists `Dropdown` and `InfoPanel` as rendering on pages with no editor.
   Both also render on the editor pages. `InfoPanel` renders its `StyledLink` only when `onContinue`
   is a URL; the two editor pages pass a callback.

The implementer bears the detection cost at M4's first step, the tip re-derivation the plan already
requires, and adds the third grep to it. The code reviewer checks the table against the three
listings. A member found is added with its disposition before code review, as M4-d says.

## Value Statement Assessment

Unchanged in revision 2 (no hunk touches § Value Statement or § Objective). Pass 1's assessment
stands: four user stories, each checkable, none deferred, D-7 his approval. The record holds no
roadmap, so alignment is judged against the commission (D-1) and the architecture record.

## Assumption Not Checked

Pass 1: this pass assumes AN-1's and AN-2's hook-level probes behave as a real browser does, and
does not test it. They run under jsdom, with a provider remount standing for a reload, a sign-in
round trip and a second tab, and with both Pusher delivery orders driven by hand. If the assumption
is false, a walk member of M2-b or of M3-a to M3-c fails in a real browser while its suite case is
green. QA Phase 1 owns closing it, through the local walk's provision, and then UAT's walk.

Pass 2: this pass assumes the architect's and QA's documents say what § "Gate findings folded" says
of AF-1 to AF-9 and QAF-1 to QAF-9, and does not test it. Only QA's B-7 and B-10 rows were read. If
it is false, the architect's delta pass or QA's re-key reopens a finding that table marks folded.
Those two gates own closing it; both are owed on revision 2 (the plan's Owed re-verdicts table).

Premises run in pass 2:

- **Boundary.** `git diff --numstat a3c1e83 3d678cc -- planning/017-existing-items-backlog.md`: 586
  added, 285 removed. The diff was read whole (1113 lines). `grep -c '^### M'` is 7 at both
  revisions, so no milestone was added or removed.
- **AN-1's members.** A python read of `verification/017/analysis/an1/rows-395510e.json`: 24 rows,
  11 in-class members and 1 outside-class member, each in two orders. M2-a's "eleven members" matches.
- **Open questions.** `grep -c 'OPEN QUESTION'` 10, `[RESOLVED]` 6; the four open are OQ-7 to OQ-10.
- **Unload exits (M3-d).** `git grep -n` for `signIn(`, `signOut`, `window.location` and
  `location.href` over `src` at `1ad625e`: `signIn` in `edit/page.tsx`, `send/page.tsx` and
  `NavMenu.tsx`; `signOut` in `NavMenu.tsx` and `SessionProvider.tsx`. M3-d's table holds every one
  that the edit page can reach.
- **Storage (M3).** `global.d.ts` `LocalStorage` has four keys. `withLocalStorage.ts` `set` calls
  `setItem` with no catch and then dispatches `storage`. `src/app/layout.tsx` reads
  `localStorage.theme` raw.
- **M4-a.** `message/layout.tsx` renders `Providers` around `Redirects`, `Navigation` and the
  children. `ConfirmationProvider.tsx` imports from `react` only.
- **Key form (M5-g).** The three predicates are as the plan quotes them:
  `deleteMessagePreviewImages.ts` (`env.NODE_ENV`), `getCDNUrl.ts` (`process.env.NODE_ENV`), and the
  generator's `generateImage.ts` (`config.ENV`, two sites).
- **Order token (M5-a).** `v` is byte 0x76, above every hex digit, so a new nonce sorts above every
  32-hex nonce bytewise. `git grep -n previewImageNonce` over `src`: one interpolating reader,
  `getPreviewImageUrl`; the rest select or pass it.
- **QA's rows.** B-7 says a daily crontab reader with `-s 23h`. B-10's precondition is "Generator
  deploy live, plus 30 days of traffic".
- **Record check.** `node tools/check-repo.js`: PASS. Its 10 OUT-OF-SCOPE warnings on the plan were
  read; each is a statement of kept behaviour, and M6's cites X-4.

Premises run in pass 1 (all matched the plan; commands and figures in `aa2e8ef`): the lint baseline
(M7-a), the suite (1508 of 1508, exit 0), 22 open handoffs, version fields (0 and 0), M1-a's four
moves, M1-c's five mutants, the importer listings, Vercel's runtime-log retention, and the chain-015
probe. One secret-file gate refusal at pass 1 is recorded there; it was not re-issued.

## Unresolved Open Questions

Four are not marked `[RESOLVED]` or `[CLOSED]`.

- **OQ-7**, the `waitUntil` probe. It proceeds open on his selection (D-15). Not put again.
- **OQ-8**, whether the sign-in exits and the expired-session sign-out keep the browser's unload
  prompt. His; blocks M3 code. M3-d's table has three cells that wait on it.
- **OQ-9**, which M5-0 outcome D-15's "fails" names. His confirmation.
- **OQ-10**, the guard context above the editor's providers (M4-a). His confirmation; blocks M4 code.

The question this section owes him, approve with these open or have the planner address them first,
is not put at this pass, because this verdict does not approve. It is owed at the approving pass for
each one still open then. Also in flight to him and not marked as open questions: X-17 to X-19 and
X-5's restated reason (D-16's note), and M5's "Cost" paragraph.

## Findings

F-19 MEDIUM cycle 1 pass 2 OPEN — The fold adds three mechanisms without their stated-limit alternative, and he has not priced them.

- **Location**: plan § M3, "Storage form" (Bound; Quota) and M3-h; § M5, M5-c form 3; planner.md
  § "Revisions, registrations and the changelog" ("A fold that adds mechanism states the gate
  rounds it triggers and the stated-limit alternative").
- **Description**: The Owed re-verdicts table states the gate rounds. The alternative is stated for
  one added mechanism only, M4's guard context (OQ-10, option b). It is absent for three.
  (1) The 20-entry bound with eviction; the value is agent-chosen. (2) The quota path: the shared
  `set` changes for all four stored keys, and the draft store evicts and retries. (3) M5-c's
  age-guarded sweep, L = 120 s on the bucket's clock. The eviction also makes a new silent loss
  ("an evicted entry is gone", M3-h) inside the milestone that exists to remove silent losses, and
  D-11's shown text did not cover it.
- **Impact**: 3 mechanisms, each with its own limb, mutants and walk rows, reach him as "the
  mechanism under items 2 and 4 is larger" with no cheaper form beside them.
- **Recommendation**: Beside each of the three, state in one line the stated-limit form and what it
  gives up. Put them to him with the revision's report. This critique designs neither form.

F-20 LOW cycle 1 pass 2 OPEN — M5-f's daily reader leaves one hour in 24 unread and names no artifact.

- **Location**: plan § M5, M5-f "Instrument"; D-8's limit sentence.
- **Description**: The window is "the 23 hours before each read" and the reader runs daily, so a
  line written in the hour after a read's window ages out before the next read. D-8's row says
  countable "holds for a reader that runs at least daily". The reader's earliest read time and the
  artifact it writes are not named (planner.md, Milestones, timed windows).
- **Impact**: 1 hour in 24, about 4% of failure lines, is never counted, against a rate of about one
  line in 170 days.
- **Recommendation**: State a cadence no longer than the window, correct D-8's sentence to it, and
  name the artifact path. Lands with revision 3.

F-21 LOW cycle 1 pass 2 OPEN — RK-7's read is timed with a session as its reader, and names no result that falsifies.

- **Location**: plan § Risks, RK-7; QA's B-10.
- **Description**: "devops reads the generator's failure count 30 days after the generator deploy".
  planner.md bars a session as the reader of a timed read, and a handoff's trigger is an event. The
  comparison "against AN-4's 15" states no figure that counts as a member. M6-c's new
  `error-status` line is the direct member of RK-7's class and is not named as the read.
- **Impact**: A read due in 30 days with no reader that exists then is not made.
- **Recommendation**: Name the reader in a permitted form, or an event that triggers the handoff.
  State the read as the count of M6-c's `error-status` lines since the deploy. Lands with
  revision 3.

F-22 LOW cycle 1 pass 2 OPEN — Two premises under the new forms are unrun and name no stage that runs them.

- **Location**: plan § M5, M5-a "Order token"; M5-g ("the generator's `ENV` on its host is unread").
- **Description**: (1) M5-a rests on the database clock in the upsert's `RETURNING` being read
  after the row's lock is taken, so that two saves' tokens order as their upserts do. It is stated
  as fact with no run and no source read, and M5's tests substitute the database. (2) M5-g marks
  the host's `ENV` unread and names the local walk, which cannot read the host. planner.md asks
  that a member neither run nor read names the stage and command that run it next. Separately,
  M5-a's token is written as SQL (`clock_timestamp()`, `COLLATE "C"`), which is how, not what.
- **Impact**: If (1) is false, two near-simultaneous saves can commit in the wrong order: a stale
  preview until the next save, never a broken one (M5-b holds).
- **Recommendation**: Mark both as Inference and name the stage and command for each. State the
  token as its two properties (ordered as the upserts; above every existing nonce), with the SQL as
  the illustration.

F-23 LOW cycle 1 pass 2 OPEN — The write matrix has no row for a second tab editing the same saved message.

- **Location**: plan § M3, "Write matrix"; X-18.
- **Description**: A saved message's entry is keyed by message id alone, so two signed-in tabs
  editing message *n* write one entry and the last writer wins, as with today's single key. M3-c's
  scope is right: AN-2's S5 is two signed-out tabs at route 0. But D-11's shown text says a draft
  survives "another tab", and X-18 names the duplicated-tab pair without this one.
- **Impact**: QA cannot tell a decided cell from a missing one for that transition.
- **Recommendation**: One matrix row and one member in X-18. Lands with revision 3.

Resolved at pass 2, each by plan revision 2 (`3d678cc`); the arguments are in this critique at
`a00e232`:

- F-1 HIGH cycle 1 pass 1 RESOLVED — guard context named, class enumerated, deviation stated; the form is OQ-10. M4-a, M4-d. Table completeness: SL-2. Duplicates: AF-4 in architecture/017-existing-items-backlog-architecture-findings.md
- F-2 HIGH cycle 1 pass 1 RESOLVED — unload class enumerated with outcomes; the three unshown members are OQ-8. M3-d.
- F-3 MEDIUM cycle 1 pass 1 RESOLVED — three deletion forms, table dimensions extended, orphan residue stated over its class. M5-c, M5-e, RK-5. Duplicates: AF-1 in architecture/017-existing-items-backlog-architecture-findings.md
- F-4 MEDIUM cycle 1 pass 1 RESOLVED — order token named, X-5's reason restated. M5-a. Its unrun premise: F-22. Duplicates: AF-2 in architecture/017-existing-items-backlog-architecture-findings.md
- F-5 MEDIUM cycle 1 pass 1 RESOLVED — retention, window, reader, precedent and pool queue stated; D-8's limit stated. M5-f. Cadence: F-20. Duplicates: QAF-9 in qa/017-existing-items-backlog-qa.md
- F-6 MEDIUM cycle 1 pass 1 RESOLVED — three outcomes, a control line, author and requester named; "fails" is OQ-9. M5-0.
- F-7 MEDIUM cycle 1 pass 1 RESOLVED — the change is placed at the draft's caller; M3-g covers the other three keys. Duplicates: AF-5 in architecture/017-existing-items-backlog-architecture-findings.md
- F-8 MEDIUM cycle 1 pass 1 RESOLVED — write matrix, bound and quota path stated. M3, M3-h. Alternatives: F-19; one missing row: F-23. Duplicates: AF-5 in architecture/017-existing-items-backlog-architecture-findings.md
- F-9 MEDIUM cycle 1 pass 1 RESOLVED — all six members restated. M2-a, M3, M5-a, M5-f, M6-a. The shape recurred: SL-1.
- F-10 MEDIUM cycle 1 pass 1 RESOLVED — the runner's start is an owner step; deploy evidence is the host's start line. § Release and rollback.
- F-11 MEDIUM cycle 1 pass 1 RESOLVED — precedent restated as read; rigs, builders and removal named. M5, M6-0.
- F-12 LOW cycle 1 pass 1 RESOLVED — carrier named (B-10). RK-7. Reader form: F-21.
- F-13 LOW cycle 1 pass 1 RESOLVED — reachability window stated. M2.
- F-14 LOW cycle 1 pass 1 RESOLVED — record form and both members named. M2 "Record". Duplicates: AF-6 in architecture/017-existing-items-backlog-architecture-findings.md
- F-15 LOW cycle 1 pass 1 RESOLVED — the skill's read stated. § Release and rollback, M5-g. Duplicates: AF-9 in architecture/017-existing-items-backlog-architecture-findings.md
- F-16 LOW cycle 1 pass 1 RESOLVED — X-17.
- F-17 LOW cycle 1 pass 1 RESOLVED — party named on each rollback and on M7-b.
- F-18 LOW cycle 1 pass 1 RESOLVED — rows use the plan's headings (checked against `grep -n '^## \|^### '` at `3d678cc`).

## Review-method lines with no finding (pass 2)

- **Reading Order.** Every row names a heading present at `3d678cc`. The Owed re-verdicts table
  carries three rows.
- **Release target.** Header `Target-Release` is untouched by the delta.
- **Decisions Register.** D-17 is agent-authored and says so. D-8, D-10 to D-12, D-15 and D-16 gained
  notes; none changes what its ruling requires.
- **Decision tables.** M3-c's table differs from revision 1 in row 3's wording only. M5-e stays an
  executable oracle under `verification/017/m5-decision-table/` (directory present), re-keyed by QA.
- **Degraded input.** M5-c's orphan residue is discharged against M5-b (never named by a row) and
  X-19.
- **Runners.** Every rollback and release step names its party; the runner's start is an owner step.
- **Input robustness.** No finding raised.

## Questions

- **On X-13, no finding.** Revision 2 carries the webpack run and that Turbopack was not run.
