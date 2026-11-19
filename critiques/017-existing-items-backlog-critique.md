---
ID: 017
Origin: 017
UUID: 5c3e9a71
Status: Open
Status-Detail: "Cycle 1 pass 3 on plan revision 3: REQUEST REVISION. F-1 to F-23 RESOLVED; SL-1 and SL-2 members fixed in the text. F-24 MEDIUM (OQ-11's and OQ-12's options contradict each other in 2 of 4 answer pairs) and F-25 LOW are OPEN. OQ-11, OQ-12 and OQ-13 are open with him and not yet put; OQ-7 proceeds open (D-15)."
Artifact-Revision: 3 — the delta 3d678cc..b3d811e read whole; last whole read is revision 1 at d84b192
Reviewed-At: "b3d811e — repos=agent-output; website code read at 1ad625e (origin/master), generator at 8de2b53 (origin/prod)"
Verdict: REQUEST REVISION
---

# Critique — Plan 017, the existing-items backlog

**Artifact**: `planning/017-existing-items-backlog.md`, revision 3 (`b3d811e`), read as the delta
from `3d678cc`. **Analysis**: `analysis/017-existing-items-backlog-analysis.md` (AN-1 to AN-4), read
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

## Verdict

**REQUEST REVISION — cycle 1, pass 3.**

Pricing: sized to the ask. What each item delivers is unchanged, and the three mechanisms F-19
named now go to him with their stated-limit forms (OQ-11 to OQ-13), so the price is his to set.

The verdict rests on one finding. OQ-11's and OQ-12's options each state a consequence that the
other question's answer changes, and in 2 of the 4 answer pairs OQ-11 option (b)'s text is false
(F-24). He has not been asked yet: the rulings file's last block is 00:11Z, read at this pass. The
fix is option text, and it is owed before the questions are put. F-25 is LOW and rides the same
revision.

The stop authority did not fire at this pass. F-24's shape, an owner option whose stated consequence
depends on a second open question, has no earlier instance. The hard stop did not fire (pass 3 of
15). Routed to the owner through steering: OQ-11 and OQ-12 are not put as revision 3 words them.

No milestone is marked `PREMISE-STALE`.

## Stated limits (stop authority, pass 2)

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
- **OQ-11**, the draft store's bound. His; blocks M3 code. Subject of F-24.
- **OQ-12**, the quota error. His; blocks M3 code. Subject of F-24.
- **OQ-13**, the leftover-object sweep. His; blocks M5 code.

The question this section owes him, approve with these open or have the planner address them first,
is not put at this pass, because this verdict does not approve. It is owed at the approving pass for
each one still open then.

## Findings

F-24 MEDIUM cycle 1 pass 3 OPEN — OQ-11's and OQ-12's options state consequences that the other question's answer changes.

- **Location**: plan § Assumptions and open questions, OQ-11 option (b) and OQ-12 options (a) and
  (b); § M3 "Storage form" (Bound; Quota); M3-h.
- **Description**: OQ-11 (b) says "no draft is ever evicted" and "when storage fills, the newest
  write is dropped". With OQ-12 (a), a write refused for quota makes the draft store evict the least
  recently edited entry and retry, so a draft is evicted. With OQ-12 (b), the write throws inside
  the editor's effect; it is not dropped quietly. So option (b)'s stated consequence holds in
  neither pair. The four answer pairs are a finite combination, and the plan carries no table of
  what each pair does; M3-h says only that "each half is removed with its option".
- **Impact**: 2 of the 4 answer pairs contradict the text he would select on. He could choose "no
  bound" to avoid a silent loss and still get eviction through the quota path.
- **Recommendation**: State what each of the four pairs does on a full store and past 20 entries,
  as one small table, and word each option from it. Do this before the two questions are put.

F-25 LOW cycle 1 pass 3 OPEN — M5-g's production falsifier names a runner without its instrument, for an observation B-6 already makes.

- **Location**: plan § M5, M5-g ("devops saves the test account's message and requests that
  message's preview URL").
- **Description**: A save as the test account needs the signed-in test browser, which the
  discord-test-browser skill's listing places in QA and UAT sessions and sessions launched with
  `--browser`. A devops session has none. The observation, a saved message's preview resolving
  without `dev/`, is the one his B-6 look makes.
- **Impact**: One post-deploy step that its named runner cannot perform.
- **Recommendation**: Name B-6 as the falsifier, or a stage that holds the browser. Lands with
  revision 4.

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

- **For the planner, on M5-c form 3.** If the committed object is absent from the continuation's own
  listing (the message was deleted between the commit and the listing), the age reference has no
  value. Is "delete nothing" the intended outcome? QA's re-key will need the cell either way.
