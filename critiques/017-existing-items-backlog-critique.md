---
ID: 017
Origin: 017
UUID: 5c3e9a71
Status: Open
Status-Detail: "Cycle 4 pass 1 on plan revision 10 (M2-d, the Pusher disconnect, and M2-c's exact string equality): APPROVED. F-29 MEDIUM is OPEN, with the planner for its fold of revision 10's gate verdicts: M2-d's walk step does not say how the second editor is opened, which decides whether it can fail. F-1 to F-28 RESOLVED. No open question is marked. SL-5 gained a third member (RK-3's record cell). The critique closes when F-29 lands."
Artifact-Revision: 10 — the delta bcc23c6..fad6cd4 read whole; last whole read is revision 1 at d84b192
Reviewed-At: "fad6cd4 — repos=agent-output; website code read at 42d15de (chain/017-existing-items-backlog) and 1ad625e"
Verdict: APPROVED
---

# Critique — Plan 017, the existing-items backlog

**Artifact**: `planning/017-existing-items-backlog.md`, revision 10 (`fad6cd4`), read as the delta
from revision 9 (`bcc23c6`), with M2 read whole beside it. **Read at cycle 4 pass 1**:
`steering/017-rulings.md` blocks 11:10Z, 17:49Z and 17:51Z, and the 2026-11-19 ledger's 17:49Z
block. Revision 9 was read as the delta from revision 8 (`5e36106`); revision 8 was read as the delta from revision 7 (`6ade256`). **Read at
cycle 3 pass 2**: `steering/017-rulings.md` block 04:14Z, the 2026-11-19 ledger's 08:41Z block, and
the QA document's QAF-25 lines. Revision 7 was read as the delta from revision 6 (`21e61eb`), and
revision 6 as the delta from revision 4 (`a97628d`). **Read at cycle 3 pass 1**:
`steering/017-rulings.md` block 08:32Z and its block headings; the QA register's B-6 row; the M6
implementation document's Deviations lines on setup failures; the security audit's header. **Read at
cycle 2 pass 2**: the deployment record at `8f26f37` (limb 3's rows). **Read at cycle 2 pass 1**:
`steering/017-rulings.md` blocks 04:50Z, 05:01Z (two) and 05:06Z, and
`steering/selection-ledger/2026-11-19.md` blocks 04:50Z to 05:06Z. **Analysis**: `analysis/017-existing-items-backlog-analysis.md` (AN-1 to AN-4), read
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
| 2026-11-19T05:11 | steering-roadmap (message naming revision 6 at `21e61eb`) | cycle 2 pass 1: plan revisions 5 and 6, delta-bounded | Reopened from `closed/` (Status `Open`), resumed after a `/clear` from this critique's Resumption State at `77dfec4`; nothing from cycle 1 was carried without its commit. Depth: delta-bounded. The delta `a97628d..21e61eb` (264 added, 45 removed, `git diff --numstat`, 22 commits) adds M8 and M5-0 limb 3 whole inside the diff and reshapes no approved milestone; it was read whole, with M5-0's limbs 1 and 2 read beside limb 3. Boundary: `21e61eb..c8e7ccd` (6 added, 9 removed) is R-25 and R-26, registrations that resolve OQ-15 by D-30 and record the architect's read; no criterion text moved. Artifact changes: M8 (D-26), value statement 5 (D-29), M5-0 limb 3 (D-30), D-22 to D-30, X-7 retired, X-20, RK-11, RK-2's falsifier, M5-f's first real member, R-6 to R-26. Findings addressed: none were open. New findings: F-26 to F-28 LOW, OPEN. Stop authority fired on one shape (SL-1's: a limb and a mechanism sentence disagree); closed as stated limit SL-4, three members, no revision asked. Verdict APPROVED. Pricing: sized to the ask as he re-set it (D-26, D-30). Trim: the Resumption State section is removed; it carried the plan for this pass, now run. Cycle 1's verdict and its open-questions record stay, under their own labels. |
| 2026-11-19T05:17 | planner-hooks-017 (message naming revision 7 at `6ade256`) | cycle 2 pass 2: plan revision 7, delta-bounded | Depth: delta-bounded; the delta `21e61eb..6ade256` (112 added, 64 removed, `git diff --numstat`; R-25, R-26 and revision 7) adds or removes no milestone and was read whole. Artifact changes: M8-a's third listing, M8-b's table and M8-c's lists with focus positions, the walk's focus step, M8's form (AF-23), M5-0 limb 3's read rule, outcome rule and result (lasts), D-30, two labels. Findings addressed: F-26 to F-28 RESOLVED and collapsed; SL-4's three members fixed in the text. New findings: none. Stop authority did not fire. Verdict APPROVED. Pricing: sized to the ask. Trim: pass 1's Verdict text, F-26 to F-28's bodies and SL-4's member list are replaced; they carried the argument for the three findings and the three members, which is in `6d55bfc`. |
| 2026-11-19T05:17 | critic-hooks-017 | Document closed | Status: Resolved. Every finding F-1 to F-28 is RESOLVED, each verified in the plan's text at `6ade256`. SL-1 to SL-4 stand with their detection-cost bearers named. |
| 2026-11-19T08:36 | steering-roadmap-hooks (brief `steering/backlog-2026-11-18-briefs/critic-hooks-017-resume.md`) | cycle 3 pass 1: plan revision 8, delta-bounded | A fresh session, resumed from this critique's Resumption State at `7744a42`; nothing was carried without its commit. Premise re-read at the mechanism: the plan header reads `Revision: 8` at `5e36106` (the Resumption State said 7, which was true at its write); the website chain branch is at `4b8db9c`, as it said; the plan is unchanged from `5e36106` to the record's tip `6c236f8` (`git diff --numstat` prints nothing). Depth: delta-bounded, because the delta `6ade256..5e36106` (75 added, 35 removed, `git diff --numstat`, 20 commits) is fully readable in the diff and adds, removes or reshapes no milestone; it was read whole from a file (177 lines). Eighteen of the 20 commits are other stages' rows R-27 to R-44 and one is the planner's checkpoint; none moves a criterion. Artifact changes: M3's matrix fetch cell, M4-a's second interception, six rows of M4-d's table, M6-c's class set closed at four, X-21 to X-23, the Planner batch dispositions. This is criterion text, so a findings pass was owed and not a boundary line. Findings addressed: none were open. New findings: none. Stop authority fired on two shapes, both closed as stated limits with no revision asked: SL-5 (F-28's shape, two members) and a third member of SL-3 (X-22's carrier label), sent to steering because X-22 is being put to him. State change: none; Verdict APPROVED, Status stays Resolved, and the file was edited in `closed/` without a move, since the pass opens and closes in one commit. Pricing: sized to the ask. Reconcile: pass 2's SL-2 member list was wrong in three places, the error this critique's (§ Stated limits, SL-2). One premise read was not completed. Trim: the Resumption State section is replaced by one closing line; it carried the plan for this pass, now run, and is in `7744a42`. |
| 2026-11-19T09:17 | planner-hooks-017 (message naming revision 9 at `bcc23c6`) | cycle 3 pass 2: plan revision 9, delta-bounded | Depth: delta-bounded; the delta from this critique's last read, `5e36106..bcc23c6` (27 added, 11 removed, `git diff --numstat`, four commits: R-45 and R-46, R-47, R-48, revision 9), adds, removes or reshapes no milestone and was read whole (101 lines). The planner named `d74bf23..bcc23c6`; the three commits before it were read too. The plan is unchanged from `bcc23c6` to the record's tip. It is the same cycle: no criterion text, milestone scope or instrument form moves, and the pass is taken for the register effect (X-24, D-31, D-32). Artifact changes: X-24 with its Planner batch row; D-31 and D-32 registered and written into X-22 and X-21; QA's Status write to QA Complete (R-47); RK-8's record cell, the owed re-verdicts order and X-22's carrier corrected. Findings addressed: none were open; SL-3's third member and SL-5's two are fixed in the text. New findings: none. Stop authority did not fire. Verdict APPROVED; Status stays Resolved, edited in `closed/` as at pass 1. Pricing: sized to the ask. Record wording: three lines of this critique were shortened to say only that a read was not completed, under the owner's standing rule of 2026-11-19; each carried a process fact of its pass and no finding, and the earlier wording is in `56a602a`. |
| 2026-11-19T17:55 | planner-hooks-017 (message naming revision 10 at `fad6cd4`) | cycle 4 pass 1: plan revision 10, delta-bounded | Reopened from `closed/` (Status `Open`): revision 10 changes criterion text on an open milestone, so a new cycle opens. Depth: delta-bounded, because the delta from this critique's last read, `bcc23c6..fad6cd4` (38 added, 10 removed, `git diff --numstat`, three commits: R-49, R-50 and R-51, revision 10), is fully readable in the diff and adds or removes no milestone; it was read whole (108 lines), with M2 read whole beside it. The planner named `61ce793..fad6cd4`; the two commits before it were read too. The plan is unchanged from `fad6cd4` to the record's tip. Artifact changes: M2-d (D-34), M2-c's equality sentence (D-33), M2's surfaces line, M2-d's walk step, D-33 to D-35, Status back to In Progress (R-51). Findings addressed: none were open. New findings: F-29 MEDIUM, OPEN. Stop authority: F-29 is a second instance of SL-4's shape, so no revision is asked on it; SL-5 gained a third member. Verdict APPROVED. Pricing: sized to the ask as he re-set it (D-34). |

## Verdict

**APPROVED — cycle 4, pass 1.**

Pricing: sized to the ask as he re-set it. M2-d is work beyond item 3, and he added it by
selection (D-34). Steering's option text left out the revision and the three gate reads it costs;
steering recorded that as its own error and told him, with the choice to switch to the exclusion
(`steering/017-rulings.md` block 17:51Z). M2-c's new sentence adds nothing to what M2 promises: it
says which equality the criterion always meant.

One finding is open, F-29 MEDIUM. It concerns the wording of UAT's walk step, not the code, so it
does not hold the disconnect. After implementation approval a revision is asked only on a HIGH or
CRITICAL finding; F-29 goes to the planner for the revision that folds QA's re-key and the
architect's delta read on revision 10.

No open question is marked (15 of 15 `[RESOLVED]`). The plan still has eight milestones and none
is marked `PREMISE-STALE`. `Target-Release` is untouched.

**The stop authority fired, on one shape.** F-29 is the second instance of SL-4's shape: a walk
step that leaves out the condition deciding its outcome. Property: every human-observable step
states the condition outside which its observation cannot fail. Domain: the plan's five
human-observable forms (M2, M3, M4, M5, M8). M2's M2-b step, M4's and M8's state theirs; M3's was
read and has none to state; M5's was not re-read this pass. UAT bears the detection cost: a step
it cannot make fail on the unfixed tree is a member, and it says so in its document. The hard stop
did not fire (pass 1 of 15). Routed to the owner: nothing.

Checked this pass:

- **M2-c's wire form.** The server library passes a string through unencoded (`pusher` 5.1.3,
  `lib/events.js` `ensureJSON`), and the client parses string data (`pusher-js` 8.3.0,
  `decodeMessage`). So a JSON-encoded hash arrives as the hash string, as the sentence says. One
  trigger site and one subscriber exist (`git grep` at `42d15de`).
- **The deploy window.** A tab opened before the deploy runs the base's handler, which compares
  the delivered value to a string hash. With the new server it receives the exact string, so it
  behaves as the plan wants. After a rollback, a tab still running the new handler sees raw hashes
  again: a number-shaped hash arrives as a number and the saving tab raises its own notice, which
  is what the base does today. Neither order breaks a tab.
- **M2-d's class.** The effect's dependency takes three kinds of value (an id, false, null). The
  three members are every way a run that created an instance can end. A run with no saved message
  creates none. `new Pusher` sits inside the effect at `1ad625e` and `42d15de`, and no other client
  instance exists, so the disconnect reaches nothing else. The cleanup at both commits calls
  `unbind` and `unsubscribe` only: red as stated.
- **D-33 to D-35.** Each row's label and shown text match the ledger's 17:49Z block. M2-d names
  D-34. The changelog row says why M2-d reaches no value statement.
- **The code in M2-c.** The sentence quotes one expression. It states the wire form two programs
  must agree on, which is the criterion; no finding.

## Cycle 3 verdict, pass 2 (`5f892f5`)

**APPROVED — cycle 3, pass 2.**

Pricing: sized to the ask. Revision 9 adds one Exclusions row and moves no code, test or verifier.

No finding is open and this pass raised none. No open question is marked (15 of 15 `[RESOLVED]`);
the plan still has eight milestones and none is marked `PREMISE-STALE`. `Target-Release` is
untouched. He accepted X-22 and X-21 by selection (D-31, D-32), so pass 1's reservation on his
answer is closed. The stop authority did not fire, nor did the hard stop (pass 2 of 15). Routed to
the owner: nothing.

Checked this pass:

- **X-24.** It has a reason and a carrier that exists (`qa/017-existing-items-backlog-qa.md`,
  QAF-25). The default is the base's: `StyledLink.tsx` at `1ad625e` already merges
  `prefetch: false`, and the line at `4b8db9c` keeps it. M4-a claims only that the props are
  unchanged. Steering's 04:14Z cap sends each further M4 gap below HIGH to the Planner batch as a
  stated limit with no fix round, which is the form X-24 takes.
- **D-31 and D-32.** Each row's selected label and shown text match questions 3 and 4 of the
  ledger's 08:41Z block. Both are registrations; neither changes what a criterion requires.
- **The three limit members from pass 1.** RK-8's cell records the second firing, the revision 8
  row sits after revision 7's rows, and X-22's carrier names his post-deploy look and says no
  stage looks before release.
- **R-47.** QA's own Status write; the row says revision 8 moved no verified criterion.

## Cycle 3 verdict, pass 1 (`56a602a`)

**APPROVED — cycle 3, pass 1.**

Pricing: sized to the ask. Revision 8 adds no mechanism and moves no code, test or verifier: each
corrected line describes code already reviewed and QA-passed, read here at website `4b8db9c` and in
the generator's `src/server.ts`. M6-c's new sentence declines a fifth failure class. The planner's
"Scope delta: none" holds for milestones and delivered behaviour.

No finding is open and this pass raised none. No open question is marked (15 of 15 `[RESOLVED]`).
No milestone is marked `PREMISE-STALE` (the two occurrences of the token are prose). The header's
`Target-Release` is untouched by the delta.

**What this approval does not cover.** X-21 and X-22 are exclusions the owner has not seen, and
steering is putting both to him (`steering/017-rulings.md` block 08:32Z). The approval is of the
fold's text. If he declines X-22, telling a fallback render apart is new code in both repositories:
a milestone-level scope delta and a new cycle.

**The stop authority fired, on two shapes.** No revision is asked on either; they are SL-5 and
SL-3's third member below. The hard stop did not fire (pass 1 of 15). Routed to the owner through
steering: SL-3's third member, because it words a carrier in a question he is about to be asked.

## Cycle 2 verdict (pass 2, `2ed550b`)

**APPROVED — cycle 2, pass 2.**

Pricing: sized to the ask as he re-set it (D-26, D-30). Revision 7 adds no mechanism: it says where
focus sits in M8's criteria, states how limb 3's logs are read, and records limb 3's result.

No finding is open. F-26 to F-28 are resolved by revision 7, and SL-4's three members are fixed in
the text. No open question remains (15 of 15 marked `[RESOLVED]`). No milestone is marked
`PREMISE-STALE`. M5-0 is met: limb 3 lasted to 55 s (deployment record `8f26f37`).

The stop authority did not fire: no new member of SL-1's shape was found in the delta. The hard
stop did not fire (pass 2 of 15). Routed to the owner: nothing.

## Cycle 1 verdict (pass 4, `77dfec4`)

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

**SL-5 (cycle 3 pass 1). A line outside the sections a revision rewrote still says what the plan
said before.** F-28 was the first instance (two revision labels, folded at revision 7). Property:
every line of the plan that refers to a section revision 8 rewrote agrees with that section as it
now reads. Domain, at `5e36106`: the lines that name M4-a, M4-d, M6-c, SL-2 or RK-8 (`grep -n`, 20
lines from § Decisions Register on), and the owed re-verdicts table. Checked this pass: the nine
rows in § Decisions Register and § "Gate findings folded" are records of their own revision and
stay true as such; RK-7, the Testing Strategy line on `pig-host-read.sh` and the four Planner batch
rows agree. Members, recorded as limits:

1. RK-8's "Record per review pass" cell still reads "three members found missing from revision 2's
   table, added at revision 3". Revision 8's table adds two members (Invite Bot, the bot
   invitation) and corrects two rows that were wrong (Support, `InfoPanel`), all found by the
   implementer's re-derivation at `1ab3b96`. So the falsifier RK-8 names did fire once more, and
   the cell does not say so.
2. In the owed re-verdicts table, the revision 8 row sits between revision 7's critic row and the
   two rows that open "The same delta" and "AF-23's fold". Read in order, "the same delta" now
   points at revision 8. Their "decidable since" cells still say revision 7, so the rows are
   recoverable.

Neither changes what a criterion requires. The planner bears the detection cost at its next write
to the plan, which is the registration of his X-21 and X-22 answers, and may bring both lines into
line then; no pass is owed on that alone. Until then a reader of RK-8 takes the table, not the
cell, as the member count.

Cycle 4 pass 1, a third member: RK-3's "Record per review pass" cell is still "—". Code review's
CR-20 (R-49) says it found a member of RK-3 beyond residue (1): distinct hashes that deliver equal
suppressed another tab's notice at `42d15de`. D-33's fix removes it, and the cell records neither.
The planner bears it at the fold of revision 10's gate verdicts; no pass is owed on it alone.

**SL-3, third member (cycle 3 pass 1).** X-22's carrier cell reads "UAT B-6, whose look fails
visibly on a fallback image". B-6 is a row of QA's register, not a UAT step: its runner is the
owner and its precondition is "Both deploys live" (`qa/017-existing-items-backlog-qa.md`, row B-6,
read this pass; the record holds no open UAT document). It is his look at one message he saves
himself. So no stage looks for a fallback image before release, and the look covers one message,
not the class the exclusion leaves unmeasured. The plan's other uses of the row say "his look
(QA's B-6)". Steering bears the detection cost, as SL-3 says: it words the question it puts and
was sent this member at this pass. X-22's second carrier, the `/preview` input guard line in
`architecture/system-architecture.md`, exists.

**SL-2, reconcile (cycle 3 pass 1).** Pass 2's member list was wrong in three places, and the
error was this critique's. Member 2 listed `/support` as a member; at `1ad625e` that item carries
`newTab: true`, so it never was one. Member 2 omitted `INVITE_URL.toString()`, a string `onPress`
item in the same file. Member 3 said the two editor pages pass `InfoPanel` a callback; at
`1ad625e` `send/page.tsx` also passes `botInviteUrl` (`git grep -n` at `1ad625e`, this pass). The
plan carried all three until revision 8. The bearer SL-2 named, the implementer at M4's first
step, found them. Pass 2's member 1 was not re-read here: the implementer's re-derivation
supersedes pass 2's list, and that re-derivation is what code review and QA read.

**SL-4 (cycle 2 pass 1). M8's limbs name the dialog that holds focus and not the position inside
it, which is what decides the outcome.** Property: every M8 limb that states an outcome by where
focus is states it for both positions the plan's own run distinguishes, on a control (a react-aria
`Button` or a form field) and inside the dialog off every control. Domain, at `21e61eb`: value
statement 5's direction sentences, M8's three direction bullets, the ten rows of M8-b's table, M8-c's
two position lists and the three steps of M8's human-observable form. Residue the plan already
names as a bounded class: which element a real browser focuses when the update prompt opens
(RK-11).

What the plan records (M8's direction bullets, from steering's 05:01Z run at `5c3d03f`): two
dialogs answer only with focus in "Message Update Detected" off its buttons, and with focus on a
react-aria `Button` Enter never reaches the document. Read at `5c3d03f` this pass: the confirm
button has `autoFocus` in both `ConfirmationDialog.tsx` `Inner` and `WarningDialog.tsx`; every
control in the three dialogs is a `Button` (`PresetDialog.tsx`'s close button and each footer) or
the image dialog's `TextField`. Statement 5 and the direction bullets held the property at
revision 6. Three members did not: the human-observable form, M8-b's two-dialog rows and M8-c's
position lists.

Pass 2: all three are fixed in the text at revision 7 (`6ade256`). M8-b's table names the position
in every row and marks which rows fail at `5c3d03f`; M8-c lists the off-button position with its
`1ad625e` answer; the walk's third step puts focus in the prompt off its buttons and says a
button-focused walk does not count. QA raised the same subject as QAF-20. The property stands. The
implementer bears the detection cost at M8's first red run (a case that cannot go red at `5c3d03f`
is a member), and UAT at the walk (QA's B-13).

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

Cycle 4 pass 1: this pass assumes that, on the unfixed tree, moving inside the app from one
message's editor to another leaves the first Pusher WebSocket open in a real browser, and does not
test it. The record holds code reads only (`steering/017-rulings.md` block 11:10Z: "cleanup
unsubscribes only"). If it is false, the network panel shows one socket before the fix as well as
after, and M2-d's walk step shows nothing; the suite case still shows `disconnect` called. UAT
owns closing it, by one look at `42d15de` before the fix lands, or at the base.

Premises run in cycle 4 pass 1:

- **Boundary.** `git diff --numstat bcc23c6 fad6cd4 -- planning/017-existing-items-backlog.md`: 38
  added, 10 removed, three commits. At `fad6cd4`: `grep -c '^### M'` 8; `OPEN QUESTION` 15,
  `[RESOLVED]` 15.
- **Tip.** The website chain branch is at `42d15de`. `git diff --numstat 1ad625e 42d15de` over
  `usePusher.ts` and `shared.ts`: 34 added and 2 removed, 13 added and 29 removed.
- **Libraries.** `pusher` 5.1.3 and `pusher-js` 8.3.0 are the installed versions
  (`node_modules/*/package.json`).

Cycle 3 pass 2: this pass assumes that QA's kill table shows the `prefetch: true` mutant surviving
at `4b8db9c`, as X-24 says, and does not test it; the QAF-25 row was read, the sweep's capture was
not. If it is false, a case already asserts the default and X-24 excludes nothing. QA owns it, in
its own document. Pass 1's assumption below is discharged by QA's effort-final pass (R-47), read
here as its row and not re-derived.

Cycle 3 pass 1: this pass assumes that the M4 code review and QA Phase 2 records cover each of the
four rows revision 8 adds or corrects in M4-d's table, as the plan's sentence under the table
says, and does not test it. Read this pass: the M4 document holds the section the plan cites, and
`StyledLink.tsx` at `4b8db9c` has the `onClick` path; the review and QA documents were not opened.
If it is false, a click on Invite Bot or on the bot invitation with unsaved edits leaves the page
with no prompt. QA owns closing it, at the effort-final sweep its rows say is owed.

Premises run in cycle 3 pass 1 (website `4b8db9c` unless named):

- **Boundary.** `git diff --numstat 6ade256 5e36106 -- planning/017-existing-items-backlog.md`: 75
  added, 35 removed, 20 commits. At `5e36106`: `grep -c '^### M'` 8; `OPEN QUESTION` 15,
  `[RESOLVED]` 15.
- **M3's fetch cell.** `MessageProvider/index.tsx` calls `removeDraft(fetchedMessage.id)` in the
  fetch effect, as the cell says.
- **M4-a.** `StyledLink.tsx` intercepts from `onNavigate` and from `onClick`; the `onClick` path
  returns early on a prevented event, a non-self `target`, a modifier key, a middle click,
  `download`, or a same-origin href. Steering's 02:43Z block exists.
- **M4-d's rows.** `NavMenu.tsx` holds four string items: `/message/m/new`, `INVITE_URL`,
  `/support` with `newTab`, `/message`. `send/page.tsx` passes `InfoPanel` both a callback and
  `botInviteUrl`; `edit/page.tsx` passes a callback. `CookieConsent.tsx`'s "Learn more" has
  `target="_blank"`.
- **M6-c.** In the generator's `src/server.ts`, a rejection that is not a `PreviewFailure` answers
  500 and reaches `console.error(err)` with no class line. The website's `previewImage.ts` has a
  `status-500` class. QA's tip probe prints `PASS setup-rejects status=500 puts=0 … lines=0`.
- **X-22.** `git diff --quiet 1ad625e 4b8db9c -- src/app/preview/page.tsx` exits 0; `invalidData`
  is the fallback for null data and for the `ErrorBoundary`.
- **Carriers.** `architecture/system-architecture.md` holds the `/generate` body row (X-21) and the
  `/preview` input guard line (X-22). The M4 QA document names QAF-19 (X-23). Steering's 04:14Z
  block exists. The security audit's header says APPROVED with L-001 optional.
- **Status-Detail against the rows.** R-34 (M8), R-37 (M5), R-41 (M6) and R-44 (M7) say QA
  Complete at the SHAs the field names. It names X-22 alone as put to him; steering's 08:32Z block
  puts X-21 too.

One premise read of this pass was not completed: `git log -1` on the generator repository. The
generator's tip was taken from `git diff --numstat 8512a1d -- src/server.ts src/generateImage.ts`,
which printed nothing, and `src/server.ts` was read by name.

Cycle 2 pass 2: this pass assumes that a click on the update prompt's text in a real browser leaves
focus inside that prompt's dialog element, and does not test it. The walk's third step rests on it.
Read this pass: headlessui 2.2.9's installed `dialog.js` gives the dialog element `tabIndex:-1`, so
it can take focus; no browser was run. If it is false, focus falls to the page body and the walk
after M8 shows no dialog answering, where the plan expects Reload. UAT owns closing it, at QA's
B-13.

Premises run in cycle 2 pass 2:

- **Boundary.** `git diff --numstat 21e61eb 6ade256 -- planning/017-existing-items-backlog.md`: 112
  added, 64 removed, three commits. The diff (310 lines) was read whole from a file. At `6ade256`:
  `grep -c '^### M'` 8; `OPEN QUESTION` 15, `[RESOLVED]` 15.
- **F-26's listing.** `git grep -c "useDocumentEventListener('keydown'"` at website `5c3d03f`: one
  file, `EmojiPicker/Root.tsx`, as the plan says.
- **Limb 3's result.** The deployment record at `8f26f37` gives the request at 05:11:02.387Z, the
  read at 05:12:31Z, 6 records, and the 55 s line with `elapsedMs` 55015, as the plan says.
- **Limb 3's outcome rule.** It names no outcome for the control line with none of the five lines.
  The limb is closed as met with all five present, so no finding.

Cycle 2 pass 1: this pass assumes that Enter on a focused react-aria `Button` never reaches the
document in a real browser, as steering's jsdom run showed and M8's third direction bullet says,
and does not test it. SL-4's members 1 and 2 rest on it. If it is false, the unfixed tree at
`5c3d03f` shows two dialogs answering one Enter with focus on Reload, and the walk as written does
discriminate. UAT owns closing it, at RK-11's real-browser walk.

Premises run in cycle 2 pass 1 (website `5c3d03f` unless named; each count by `git grep -c` or a
listing read whole):

- **Boundary.** `git diff --numstat a97628d 21e61eb -- planning/017-existing-items-backlog.md`: 264
  added, 45 removed. The diff (481 lines) was read whole from a file. `21e61eb..c8e7ccd`: 6 added, 9
  removed, read whole. At `21e61eb`: `grep -c '^### M'` 8; `OPEN QUESTION` 15, `[RESOLVED]` 14.
- **M8-a's members, by an instrument the planner did not write.** `git grep -n "useHotkeys("` over
  production source: 6 sites. Three bind `['enter']` (`ConfirmationDialog.tsx`, `ImageUploader.tsx`,
  `WarningDialog.tsx`), two bind `esc`, one is `edit/page.tsx`'s registrar. A case-insensitive
  key-event listing (`keydown`, `keyup`, `keypress`, `'Enter'`) was read whole: no other
  document-level Enter answer. The plan's member list stands. One site the plan's second grep
  cannot see: F-26.
- **M8-d's counts.** `git grep -c "tagName !== '~/components/Button'"`: 3 files at `1ad625e`, 2 at
  `5c3d03f`, as the plan says.
- **M8's surfaces.** `git diff --numstat 1ad625e 5c3d03f` over the two files prints nothing. The
  renderers the plan lists match `git grep -l`. `ImageUploader.tsx` passes `unmount={false}` and
  enables its hotkey on `isOpen`. `react-hotkeys-hook` is 5.2.4 in the lockfile and installed, and
  its handler tests `enableOnFormTags`.
- **Registrations.** D-26 and D-29 match the ledger's 04:50Z and 05:01Z steering blocks word for
  word; D-27, D-28 and D-30 match the 04:55Z, 04:58Z and 05:06Z blocks. Statement 5 is D-29's text.
  R-7 to R-23 are other stages' verdict rows; each says no criterion moves, and none does.
- **Carried reads.** The deployment record at `d61f445` says 3 records and `elapsedMs=5006`, as
  M5-f and limb 2's result say. `architecture/system-architecture.md` holds the Problem Areas row
  X-20 names as its carrier.
- **Target release.** The header's `Target-Release` is untouched by the delta.

Cycle 1's lines follow.

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
listings, Vercel's retention, and the chain-015 probe. One read at pass 1 was not completed
and was not re-issued.

## Unresolved Open Questions

Cycle 4 pass 1: none marked. At `fad6cd4` all fifteen are `[RESOLVED]`; no approval question was
owed or put.

Cycle 3 pass 1: none marked. At `5e36106` all fifteen are `[RESOLVED]`, so no approval question was
owed or put. X-21 and X-22 are not written as open questions; they are exclusions awaiting his
answer through steering (§ Verdict).

Cycle 2 pass 1: none. At `c8e7ccd` all fifteen are marked `[RESOLVED]`; OQ-7 by limb 2's result
(D-27), OQ-14 by D-29, OQ-15 by D-30. No approval question was owed or put at this pass.

Cycle 1's record, at pass 4: four were not marked `[RESOLVED]` or `[CLOSED]`.

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

One finding is open.

F-29 MEDIUM cycle 4 pass 1

- **Title**: M2-d's walk step does not say how the second editor is opened.
- **State**: OPEN.
- **Location**: plan § M2, "Human-observable form", the sentences opening "M2-d:".
- **Description**: The step reads "open a message's editor, then open a second message's editor
  in the same tab; the browser's network panel shows one open Pusher WebSocket, not two". A full
  page load (a typed address, a reload) destroys the first page and its socket whatever the cleanup
  does, so the panel shows one socket on the unfixed tree too. Only a move inside the app, with no
  page load, keeps the page alive and reaches the cleanup: for example the user icon to the
  message list, then another message. The same paragraph states this kind of condition for M2-b
  ("a walk that stops typing at Save does not exercise M2-b"). The step also does not say what the
  unfixed tree shows; two sockets there is a code read, never observed (Assumption Not Checked).
- **Impact**: The suite's mock shows `disconnect` called, not a socket closing. This step is the
  only place the plan looks at a real connection, and as written UAT can pass it on code that
  never disconnects.
- **Recommendation**: State that the second editor is reached by links inside the app with no
  page load, and name what the unfixed tree shows, marked as read or as observed. Landing: the
  planner's revision folding QA's re-key and the architect's delta read on revision 10; QA's
  register row for the step takes the same wording.

Cycle 3 raised none.

Resolved at cycle 2 pass 2, each by plan revision 7 (`6ade256`); the arguments are in this critique
at `6d55bfc`:

- F-26 LOW cycle 2 pass 1 RESOLVED — a third listing for the repository's own wrapper, with its real non-member. M8-a.
- F-27 LOW cycle 2 pass 1 RESOLVED — the read is taken after 60 s from the request's start, its time recorded; the run read at 89 s. M5-0 limb 3.
- F-28 LOW cycle 2 pass 1 RESOLVED — the QA sequencing line and M8's Order line name revision 7; the Resumption State is rewritten.

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

## Review-method lines with no finding (cycle 2 pass 1)

- **M8's ask.** D-26's option says the implementer "applies M4's already-reviewed fix to both
  dialogs". M8-a to M8-d are that fix's class, its property, the lone-dialog behaviour it must keep
  and the dead compare M4 removed from the third dialog. Nothing beyond the option.
- **M8's sibling.** The form cites website `a5dd76f` `ConfirmationDialog.tsx` `Inner`, read this
  pass; the quoted check is the sibling's own line, a citation and not prescribed code.
- **M8-b's unreachable rows.** `showConfirmation` has three callers at `5c3d03f`: `usePusher.ts`,
  `NavigationGuardProvider.tsx` and the mode switch in `DiscordMessageEditor/index.tsx`. The last
  two need a user act the open modal blocks, as the table says.
- **Limb 3.** Each step names its runner (the implementer writes, devops pushes on D-30 and reads),
  its capture path and its three outcomes; the drop disposition is priced. The plan marks a Preview
  deployment's limit unread, and the transfer of a Preview result to production is the same
  inference limb 2 carried.
- **Exclusions.** X-7 is retired by D-26 with M8-d as its discharge; X-20 has a reason and a
  carrier that exists.
- **Reading Order.** The uat row routes to every "Human-observable form" line, M8's included; the
  owed re-verdicts table carries this pass's row.
- **Steering-attributed rows.** None in the delta; every registration is the planner's or a
  stage's verdict row.

## Review-method lines with no finding (cycle 3 pass 1)

- **M6-c's closed class set.** The four classes are M6-a's four render-path members, listed. The
  negative limb (a setup failure writes no class line) names what would catch a line being written:
  the probe's `setup-rejects` case, which QA's tip run shows passing. RK-7's read counts
  `error-status` only, so it does not move.
- **M4-a's second interception.** It serves members of M4-d's own class (a link to another site
  that navigates this tab), which M4-b already quantifies over. It is recorded as a deviation with
  its ruling, and names the rule it mirrors (Next's own click rule).
- **X-21 to X-23.** Each has a reason and a carrier that exists. X-21's and X-22's architecture
  carriers are restated by the architect's closing pass, the form X-20 took. X-22's first carrier
  is worded wrongly: SL-3's third member.
- **X-22 against the other preview milestones.** The fallback render is an input to M5 as well as
  M6. X-22 states M5's outcome itself (the image is committed over the stale one). M5-b holds,
  since the named object exists. RK-7 does not see it: the fallback answers 200, and RK-7 counts
  error statuses. Before the chain the generator stored the same render, so nothing regresses.
- **Planner batch.** Seven rows are marked discharged at revision 8, each naming where it landed;
  the four older rows were discharged at revision 1.
- **Reading Order.** The role rows are untouched; the owed re-verdicts table carries this pass's
  row. Its row order: SL-5 member 2.
- **Steering-attributed rows.** None in the delta.

Reopened at cycle 4 pass 1; F-29 is open. The cycle 2 assumption (a click on the update prompt's text leaves focus
inside its dialog in a real browser) stays UAT's, at QA's B-13. No message is owed or unanswered.
