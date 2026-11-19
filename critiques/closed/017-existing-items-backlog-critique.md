---
ID: 017
Origin: 017
UUID: 5c3e9a71
Status: Resolved
Status-Detail: "Cycle 1 pass 4 on plan revision 4: APPROVED, on his selection to approve with OQ-7 and OQ-11 to OQ-13 unresolved. F-1 to F-25 RESOLVED. Three stated limits stand (SL-1 to SL-3). A fold of his answers to OQ-11 to OQ-13 that changes criterion text opens cycle 2."
Artifact-Revision: 4 — the delta b3d811e..a97628d read whole; last whole read is revision 1 at d84b192
Reviewed-At: "a97628d — repos=agent-output; website code read at 1ad625e (origin/master), generator at 8de2b53 (origin/prod)"
Verdict: APPROVED
---

# Critique — Plan 017, the existing-items backlog

**Artifact**: `planning/017-existing-items-backlog.md`, revision 4 (`a97628d`), read as the delta
from `b3d811e`. **Analysis**: `analysis/017-existing-items-backlog-analysis.md` (AN-1 to AN-4), read
whole at pass 1. **Also read at pass 1**: the commission and the scoping determination
(`steering/backlog-2026-11-18-rulings.md`, blocks 21:53Z and 21:59Z), `steering/017-rulings.md`,
`steering/017-brief-common.md`, and the three architecture documents (`system-architecture.md`,
`website.md`, `preview-image-generator.md`). **Read at pass 3**: `steering/017-rulings.md` blocks
00:06Z and 00:11Z. **Date**: 2026-11-19.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-11-18T23:47 | steering-roadmap (brief `steering/backlog-2026-11-18-briefs/critic-hooks-017.md`) | cycle 1 pass 1: plan revision 1, whole-document read | First pass of the cycle, so the whole plan was read (615 lines at `d84b192`; a Reading Order is present). Boundary: revision 1 is `97e6814`. `97e6814..d84b192` is R-4, 4 lines added and none removed (`git diff --numstat`): three register rows and one changelog row, no criterion moved. `d84b192..a3c1e83` is the planner's Resumption State, 14 added and none removed; it touches no milestone scope, criterion text, instrument form or register effect. Artifact changes: none before this pass. New findings: F-1 and F-2 HIGH, F-3 to F-11 MEDIUM, F-12 to F-18 LOW, all OPEN. Findings addressed: none. Verdict REQUEST REVISION. Pricing: sized to the ask as he re-set it (D-11, D-12, D-14). Seam read, after this critique's first commit (`8bc0488`): the architect's pass (`406b34a`) and QA Phase 1 (`d1add83`, `06511f1`) were committed before it. Eight findings repeat one of theirs and carry `Duplicates:` (F-1, F-3, F-4, F-5, F-7, F-8, F-14, F-15); F-5 and F-6 now cite QA's runtime-log read. Ten are this critique's alone: F-2, F-6, F-9 to F-13, F-16 to F-18. |
| 2026-11-19T00:11 | planner-hooks-017 (message naming revision 2 at `3d678cc`) | cycle 1 pass 2: plan revision 2, delta-bounded | Resumed after a `/clear` from this critique's Resumption State at `a00e232`; nothing from pass 1 was carried without its commit. Depth: delta-bounded, because the delta `a3c1e83..3d678cc` (586 added, 285 removed, `git diff --numstat`) is fully readable in the diff and adds or removes no milestone; it was read whole. Artifact changes: revision 2 folds the three gates' findings, opens OQ-8 to OQ-10, registers D-17, adds X-17 to X-19 and RK-9, RK-10. Findings addressed: F-1 to F-18, all RESOLVED and collapsed to disposition lines. New findings: F-19 MEDIUM, F-20 to F-23 LOW, all OPEN. Stop authority fired on two shapes; closed as stated limits SL-1 and SL-2. Verdict REQUEST REVISION. Pricing: delivery sized to the ask; three added mechanisms unpriced (F-19). Reconcile: pass 1's F-9 said AN-1 ran 10 named members; the capture holds 11 in-class members (python read of `an1/rows-395510e.json`, 24 rows). The error was this critique's; the plan's M2-a has it right. Only that instance was checked; pass 1's other counts were not re-swept. Trim: the Resumption State section is removed; it carried the plan for this pass, now run. Pass 1's Reachability and Review-method sections are replaced by pass 2's; their content is in `a00e232` and each premise they carried is listed by name under Assumption Not Checked. |
| 2026-11-19T00:22 | planner-hooks-017 (message naming revision 3 at `b3d811e`) | cycle 1 pass 3: plan revision 3, delta-bounded | Depth: delta-bounded; the delta `3d678cc..b3d811e` (220 added, 133 removed, `git diff --numstat`; R-5 and revision 3) adds or removes no milestone and was read whole. Artifact changes: D-18 to D-21 registered and folded (OQ-8 to OQ-10 resolved), OQ-11 to OQ-13 opened, M4-a's dialog form changed inside D-20, M5-a's token restated as properties, M5-c form 3's age reference changed, B-7 and B-10 readers named. Findings addressed: F-19 to F-23 RESOLVED and collapsed; SL-1 and SL-2 members fixed in the text. New findings: F-24 MEDIUM, F-25 LOW, OPEN. Stop authority did not fire. Verdict REQUEST REVISION. Pricing: sized to the ask. Process fact: one record-write gate refusal, disclosed under Assumption Not Checked. Trim: pass 2's Stated-limits member lists and its Review-method section are replaced by pass 3's lines; they carried the argument for SL-1 and SL-2, which is in `51805f4`. |
| 2026-11-19T00:28 | planner-hooks-017 (message naming revision 4 at `a97628d`) | cycle 1 pass 4: plan revision 4, delta-bounded | Depth: delta-bounded; the delta `b3d811e..a97628d` (48 added, 17 removed, `git diff --numstat`, one commit) adds or removes no milestone and was read whole. Artifact changes: a four-pair table under OQ-12 with OQ-11 (b) and M3-h reading from it, M4-a's dialog reach, M5-c form 3's missing-reference rule, M5-g's falsifier, RK-7's liveness precondition. Findings addressed: F-24 and F-25 RESOLVED and collapsed. New findings: none. Stop authority fired on one shape (an option's stated consequence is not what the code does); closed as stated limit SL-3, two members, no revision asked. State change: Verdict APPROVED, on his selection at this pass to approve with OQ-7 and OQ-11 to OQ-13 unresolved (selection prompt from this session; his label and the shown text are under Unresolved Open Questions). Pricing: sized to the ask. Trim: pass 3's Verdict text and F-24's and F-25's bodies are replaced; they carried the argument for both findings, which is in `97b96e3`. |
| 2026-11-19T00:28 | critic-hooks-017 | Document closed | Status: Resolved. Every finding F-1 to F-25 is RESOLVED at the approving pass; SL-1 to SL-3 stand as stated limits with their detection-cost bearers named. A later revision that changes criterion text, milestone scope or an instrument's form opens cycle 2. |

## Verdict

**APPROVED — cycle 1, pass 4.**

Pricing: sized to the ask. What each item delivers is unchanged since revision 1. The mechanisms
added under items 2 and 4 are priced by him: D-20 for M4's guard, and OQ-11 to OQ-13 for the draft
bound, the quota path and the sweep, each beside its stated-limit form.

No finding is open. F-24 and F-25 are resolved by revision 4. The plan is approved with four open
questions unresolved, on his selection at this pass (§ Unresolved Open Questions). By the plan's
Status-Detail at `a97628d`, OQ-11 and OQ-12 block M3 code, OQ-13 blocks M5 code, and OQ-7 blocks M5
and M6 code; M1, M2, M4 and M7 wait on no question.

**The stop authority fired, on one shape.** An owner option whose stated consequence is not what
the code does: F-24 was the first instance, folded at revision 4, and this pass found two more
members in the same questions. No revision is asked on them; they are SL-3 below. The hard stop did
not fire (pass 4 of 15). Routed to the owner through steering: nothing new. Steering's own 00:21Z
block already holds both SL-3 members.

No milestone is marked `PREMISE-STALE`.

## Stated limits (stop authority)

**SL-3 (pass 4). An option's stated consequence is not what the code does.** Property: every
option of an open question states, for what the code does, only what a read at source shows, and
names the read. Domain: the six options of OQ-11 to OQ-13 and the eight cells of the table under
OQ-12, at `a97628d`. Checked this pass: OQ-11 (a) and (b), OQ-12 (a), OQ-13 (a) and the table's
(a)·(a) and (b)·(a) rows agree with M3 "Storage form" and M5-c. Not read: the option text steering
actually put to him (the 00:21Z ledger block was not in the record at this pass's reads). Members,
recorded as limits and not as findings:

1. OQ-12 (b), and the table's (a)·(b) and (b)·(b) rows, say the write "throws inside the editor's
   store effect, on every later edit". Read at website `1ad625e`: `MessageProvider/index.tsx` calls
   `localMessageStore.set` inside a `useEffect`; `git ls-tree -r` over `src` holds no `error.tsx`
   (`grep -c` 0). So the first refused write takes the page to Next's error screen, and there is no
   later edit. Steering's helper read the same (`steering/017-rulings.md`, block 00:21Z).
2. OQ-13 (b) says "a few objects a year". AN-4's 15 are the generator's non-successes. The event the
   option counts, a 204 that no continuation processed, has no measure in the record (same block).

Steering bears the detection cost: it words the options it puts and runs its refutation before each
prompt, and it found both members before he was asked. On a member it words the option from its
read and, where he has already answered, records the correction beside his selection
(`escalation.md`, Escalation Form). The planner may bring the plan's text into line when it folds
his answers; no pass is owed on that alone.

Stated limits from pass 2:

Pass 3: every member listed at pass 2 was fixed in the text at revision 3 (`b3d811e`), and no new
member of either shape was found in the delta. The two properties and who bears their detection
cost stand as written at pass 2 (`51805f4`).

- **SL-1**, a limb and a mechanism sentence disagree. Members 1 to 3 fixed: M2 "Window" names the
  errored-but-stored save as M2-b's residue; M3-a and M3-b hold for an entry still stored; the
  legacy key's sentence matches the matrix. QA bears the detection cost at its re-key.
- **SL-2**, M4-d's table omits members. Members 1 to 3 fixed: three rows added, the third listing
  added to the tip re-derivation, the deviation sentence corrected. RK-8 records it. The implementer
  bears the detection cost at M4's first step, and the code reviewer checks the table against the
  three listings.

## Value Statement Assessment

Unchanged in revisions 2 and 3 (no hunk touches § Value Statement or § Objective). Pass 1's
assessment stands: four user stories, each checkable, none deferred, D-7 his approval. The record
holds no roadmap, so alignment is judged against the commission (D-1) and the architecture record.

## Assumption Not Checked

Pass 1: this pass assumes AN-1's and AN-2's hook-level probes behave as a real browser does, and
does not test it. They run under jsdom, with a provider remount standing for a reload, a sign-in
round trip and a second tab, and with both Pusher delivery orders driven by hand. If the assumption
is false, a walk member of M2-b or of M3-a to M3-c fails in a real browser while its suite case is
green. QA Phase 1 owns closing it, through the local walk's provision, and then UAT's walk.

Pass 2: this pass assumes the architect's and QA's documents say what § "Gate findings folded" says
of AF-1 to AF-9 and QAF-1 to QAF-9, and does not test it. Only QA's B-7 and B-10 rows were read. If
it is false, the architect's delta pass or QA's re-key reopens a finding that table marks folded.
Those two gates own closing it.

Pass 3: this pass assumes QA's Postgres probe and the architect's timing capture show what the plan
says of them (P1 to P3 Observed on Postgres 16.16; 17.2 ms and 5.1 ms for a 7.4 MB map), and does
not test it. The two directories exist (`ls -d`); their contents were not read. If it is false, the
real-Postgres lane goes red on the shipped statements at M5. The implementer owns closing it at M5,
then QA at Phase 2.

Pass 4: this pass assumes the option text steering put to him at 00:21Z carries steering's own two
refutations (SL-3's members), and does not test it; that text is in a ledger block this pass could
not read. If it is false, he selects OQ-12 (b) or OQ-13 (b) on a consequence the code does not
have. Steering owns closing it, beside his selection.

Premises run in pass 4:

- **Boundary.** `git diff --numstat b3d811e a97628d -- planning/017-existing-items-backlog.md`: 48
  added, 17 removed, one commit. The diff was read whole. `git grep -c '^### M'` at `a97628d` is 7.
- **Open questions.** `git grep -c` at `a97628d`: `OPEN QUESTION` 13, `[RESOLVED]` 9. The rulings
  file's last block is 00:21Z, so OQ-11 to OQ-13 were unanswered at this pass.
- **SL-3 member 1.** The two reads are quoted in SL-3.
- **Prompts.** `ls -d ~/.claude/state/prompt-gate-off`: absent, so the approval question went as a
  selection prompt.

Premises run in pass 3:

- **Boundary.** `git diff --numstat 3d678cc b3d811e -- planning/017-existing-items-backlog.md`: 220
  added, 133 removed, over two commits (`5c9e785` R-5, `b3d811e` revision 3). The diff was read whole
  (582 lines). `git show b3d811e:… | grep -c '^### M'` is 7.
- **Open questions.** `git grep -c` at `b3d811e`: `OPEN QUESTION` 13, `[RESOLVED]` 9. The four open
  are OQ-7 and OQ-11 to OQ-13.
- **D-18 to D-21.** Each row's selected label and shown text match `steering/017-rulings.md` block
  00:11Z, read beside the rows.
- **M4-a's dialog reasons.** `git grep -n` at website `1ad625e`: `<ConfirmationDialog` is rendered
  by `edit/page.tsx` alone, and `<ConfirmationProvider` by `m/[id]/layout.tsx` alone.
  `ConfirmationProvider.tsx` holds one `props` state that `showConfirmation` sets.
- **Not yet put.** `grep -n '^## ' steering/017-rulings.md`: the last block is 00:11Z, and the
  2026-11-19 ledger holds the 00:10Z block only. So OQ-11 to OQ-13 were not put when this was read.
  Reconcile, same pass: a re-read after this critique's first pass-3 commit (`d3e4085`) found block
  00:21Z, which puts OQ-11 to OQ-13 to him. The first commit's "not yet put" was true at its read
  and stale at its commit. The 00:21Z block also records steering's own partial refutations of
  OQ-12 (b)'s and OQ-13 (b)'s wording; it does not raise the cross-dependency F-24 names.

Process fact of this run, lodged in the round: the record-write gate refused one Bash call at this
pass. The call redirected `git show b3d811e:planning/…` to a file in this session's scratchpad,
named through a shell variable, and the gate read the target as a path under `agent-output`. The
call was never aimed at a record document. It was re-issued with no file write at all
(`git grep -c … b3d811e -- planning/…`), which is the form that shows the gate its true target.

Premises run in pass 2 (`51805f4`): the pass-2 boundary, AN-1's 24 rows, the unload exits, the
storage helpers, `message/layout.tsx`, the three key-prefix predicates, the order token's byte
order, QA's B-7 and B-10 rows, and the record check. Premises run in pass 1 (`aa2e8ef`): the lint
baseline, the suite, 22 open handoffs, version fields, M1-a's moves, M1-c's mutants, the importer
listings, Vercel's retention, and the chain-015 probe. One secret-file gate refusal at pass 1 is
recorded there; it was not re-issued.

## Unresolved Open Questions

Four are not marked `[RESOLVED]` or `[CLOSED]`.

- **OQ-7**, the `waitUntil` probe. It proceeds open on his selection (D-15). Not put again.
- **OQ-11**, the draft store's bound. His; blocks M3 code. Put to him by steering at 00:21Z.
- **OQ-12**, the quota error. His; blocks M3 code. Put at 00:21Z.
- **OQ-13**, the leftover-object sweep. His; blocks M5 code. Put at 00:21Z.

The question this section owes him was put at pass 4, as a selection prompt from this session:
approve the plan for implementation with these unresolved, or have the planner address them first.
He selected **"Agent: approve now (Recommended)"**. Shown: "Agent: the critic approves revision 4
now. By the plan's own status line (read at a97628d), the draft bound and full-storage questions
block only the stored-draft milestone's code, and the sweep question and the probe block only the
preview milestones' code. The test-hygiene, own-save notice, link-warning and lint milestones can
start once QA also approves. The planner folds your three answers when you give them, and the
critic reads that fold." The other option was "Agent: hold approval". The option text is
agent-authored, by this critic. The selection is sent to steering for the rulings file.

## Findings

No finding is open.

Resolved at pass 4, each by plan revision 4 (`a97628d`); the arguments are in this critique at
`97b96e3`:

- F-24 MEDIUM cycle 1 pass 3 RESOLVED — a four-pair table under OQ-12; OQ-11 (b) defers to it; M3-h reads from it. Two cells' wording: SL-3.
- F-25 LOW cycle 1 pass 3 RESOLVED — M5-g's production falsifier is his B-6 look.

Resolved at pass 3, each by plan revision 3 (`b3d811e`); the arguments are in this critique at
`51805f4`:

- F-19 MEDIUM cycle 1 pass 2 RESOLVED — each mechanism put to him beside its stated-limit form. OQ-11 to OQ-13. The options' wording: F-24.
- F-20 LOW cycle 1 pass 2 RESOLVED — a 12-hour reader over 23-hour windows, records counted once by id; earliest read and artifact named; D-8's sentence corrected. M5-f.
- F-21 LOW cycle 1 pass 2 RESOLVED — a crontab reader with an earliest time and an artifact; the read is M6-c's `error-status` count. RK-7.
- F-22 LOW cycle 1 pass 2 RESOLVED — the token stated as two properties with the SQL illustrative, Observed by QA's probe; production's version and the host's `ENV` carried with falsifiers. M5-a, M5-g. The `ENV` falsifier's runner: F-25.
- F-23 LOW cycle 1 pass 2 RESOLVED — matrix row and X-18 member added. M3 "Write matrix".

Resolved at pass 2, each by plan revision 2 (`3d678cc`); the arguments are in this critique at
`a00e232`:

- F-1 HIGH cycle 1 pass 1 RESOLVED — guard context named, class enumerated, deviation stated; the form is D-20. M4-a, M4-d. Duplicates: AF-4 in architecture/017-existing-items-backlog-architecture-findings.md
- F-2 HIGH cycle 1 pass 1 RESOLVED — unload class enumerated with outcomes; the three unshown members are D-18. M3-d.
- F-3 MEDIUM cycle 1 pass 1 RESOLVED — three deletion forms, table dimensions extended, orphan residue stated over its class. M5-c, M5-e, RK-5. Duplicates: AF-1 in architecture/017-existing-items-backlog-architecture-findings.md
- F-4 MEDIUM cycle 1 pass 1 RESOLVED — order token named, X-5's reason restated. M5-a. Duplicates: AF-2 in architecture/017-existing-items-backlog-architecture-findings.md
- F-5 MEDIUM cycle 1 pass 1 RESOLVED — retention, window, reader, precedent and pool queue stated; D-8's limit stated. M5-f. Duplicates: QAF-9 in qa/017-existing-items-backlog-qa.md
- F-6 MEDIUM cycle 1 pass 1 RESOLVED — three outcomes, a control line, author and requester named; "fails" is D-19. M5-0.
- F-7 MEDIUM cycle 1 pass 1 RESOLVED — the change is placed at the draft's caller; M3-g covers the other three keys. Duplicates: AF-5 in architecture/017-existing-items-backlog-architecture-findings.md
- F-8 MEDIUM cycle 1 pass 1 RESOLVED — write matrix, bound and quota path stated. M3, M3-h. Duplicates: AF-5 in architecture/017-existing-items-backlog-architecture-findings.md
- F-9 MEDIUM cycle 1 pass 1 RESOLVED — all six members restated. M2-a, M3, M5-a, M5-f, M6-a. The shape recurred: SL-1.
- F-10 MEDIUM cycle 1 pass 1 RESOLVED — the runner's start is an owner step; deploy evidence is the host's start line. § Release and rollback.
- F-11 MEDIUM cycle 1 pass 1 RESOLVED — precedent restated as read; rigs, builders and removal named. M5, M6-0.
- F-12 LOW cycle 1 pass 1 RESOLVED — carrier named (B-10). RK-7.
- F-13 LOW cycle 1 pass 1 RESOLVED — reachability window stated. M2.
- F-14 LOW cycle 1 pass 1 RESOLVED — record form and both members named. M2 "Record". Duplicates: AF-6 in architecture/017-existing-items-backlog-architecture-findings.md
- F-15 LOW cycle 1 pass 1 RESOLVED — the skill's read stated. § Release and rollback, M5-g. Duplicates: AF-9 in architecture/017-existing-items-backlog-architecture-findings.md
- F-16 LOW cycle 1 pass 1 RESOLVED — X-17.
- F-17 LOW cycle 1 pass 1 RESOLVED — party named on each rollback and on M7-b.
- F-18 LOW cycle 1 pass 1 RESOLVED — rows use the plan's headings.

## Review-method lines with no finding (pass 3)

- **M4-a's dialog form rides D-20.** D-20's shown text says the dialog moves up a layout. Revision 3
  instead mounts a second provider instance and dialog at the layout and leaves the editor's in
  place. What he selected, the send page's Header and Sidebar links warning, is delivered either
  way, and the new form avoids a change to `/send` that his option did not show (the update prompt
  appearing there). The changelog row names the change. No finding.
- **M5-c form 3's new age reference.** Checked against M5-b for the cases this pass could construct:
  a later save in flight (its object is at most 60 s older than the committed one, inside L), an
  earlier save in flight (its commit is refused), and RK-9's clock step. None deletes an object a
  row names. QA's oracle re-key to this form is owed and listed.
- **The real-Postgres lane.** It names its runner, its removal and that it is outside the standing
  suite.
- **Timed reads.** B-7 and B-10 each name a crontab reader, an earliest read and an artifact.
- **Reading Order and owed re-verdicts.** Three rows, each for revision 3.
- **Decisions Register.** D-18 to D-21 are registrations by selection (R-5); none changes what a
  criterion requires beyond its own question.
- **Release target.** Header `Target-Release` is untouched by the delta.

## Questions

None open. Pass 3's question on M5-c form 3 (the committed object absent from its own listing) is
answered by revision 4: such a listing deletes nothing (QAF-13).

## Review-method lines with no finding (pass 4)

- **M4-a's dialog reach (AF-22).** The guard takes `showConfirmation` from its own instance and
  `StyledLink` reaches it only through the guard. This states which dialog a link opens; no finding.
- **M5-c form 3.** The missing-reference rule and the `LastModified` argument name their residue (a
  clock disagreement over 60 s inside the bucket) and decline a write to the real bucket.
- **RK-7.** The liveness precondition names its runner, its capture path and what makes a zero
  readable.
- **Owed re-verdicts.** Three rows for revision 4; the architect's is its closing pass.

## Resumption State

Written at steering's `/checkpoint` request after closure (critic-hooks-017). Done: cycle 1 closed at pass 4, plan revision 4 (`a97628d`) APPROVED, this critique Resolved at `77dfec4`; his answers to OQ-11 to OQ-13 are all option (a) (`steering/017-rulings.md` block 00:27Z, per steering's message, not re-read here). Next: if a planner revision folding those answers changes criterion text, milestone scope or an instrument's form, open cycle 2 pass 1 as a delta-bounded read of `git diff a97628d <rev> -- planning/017-existing-items-backlog.md`, moving this file back out of `closed/` with Status `Open`; a fold that only marks the three questions resolved and drops the option-(b) text is a boundary line. Code was read at website `1ad625e` and generator `8de2b53`; no chain branch existed at those reads. Nothing uncommitted, no process started, scratch files removed. Messages sent and unanswered: none owed. No question is open with the owner.
