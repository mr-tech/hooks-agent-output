---
ID: 017
Origin: 017
UUID: 5c3e9a71
Status: Active
Status-Detail: "Written after chain 017's close-out (every stage document terminal and in closed/; released website master 787bec5, generator prod 8512a1d). Rests until pi runs on the owner's command."
---

# Retrospective 017: the existing-items backlog (Hooks.gg backlog items 2 to 5, plus rider M8)

**Plan Reference**: `agent-output/planning/closed/017-existing-items-backlog.md` (revision 11)
**Date**: 2026-11-19
**Retrospective Facilitator**: retrospective (`retrospective-hooks-017`, a subagent of `steering-roadmap-hooks`)

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-19T20:37 | steering-roadmap-hooks (spawn brief, rulings block 2026-11-19T20:25Z) | Retrospective of chain 017 from the record alone, weighing five candidate items steering named | Written. Value delivered YES. Seven recommendations, each naming the file it would change. Cost readout $434.74 for the 41 stage sessions and $23.27 for steering's rows, captured under `verification/017/retrospective/`. |

## Summary

**Corpus**: This retrospective reads the agent-output record at the time of writing. That includes the plan with its
Decisions Register and changelog, every closed stage document with 017 in its name, the two release-tip QA records
(`qa/closed/website-7293a35-generator-8512a1d-release-tip-qa.md` and `…-787bec5-…`), steering's
`017-rulings.md`, `017-standing.md` and `017-brief-common.md`, the effort-wide `backlog-2026-11-18-rulings.md`, the
post-deploy carrier, `architecture/system-architecture.md` (its 017 rows), and `~/.claude/agents/INBOX.md`. It also
reads the cost tool's output (`cc-usage.py`) and the git history of the three repositories. Three `general-purpose`
helpers extracted the 26 large stage documents for it. The figures below that a recommendation rests on were re-read
from the source documents, and each count was recomputed.

It cannot read session transcripts. It cannot read his words except as the rulings and ledger blocks quote them, the
16:4xZ restatement of the open questions (named only in block 17:49Z), anything a stage corrected before it lodged, or
the selection-ledger day files (not opened). By his standing rule, the record also holds no safeguard or security
block, so any such event is outside this corpus. All of these are **unverifiable by construction**, not refuted. The
roadmap directory holds only `.gitkeep`, so no roadmap is cited.

**Value Statement**: (from the plan, § Value Statement)
1. Stale, not broken, previews: when a new preview cannot be made, the message keeps showing its last image.
2. The saving tab is not told about its own save: "Message Update Detected" appears only when another tab or person saves.
3. Signed-out edits are not lost without a warning.
4. Hygiene: the known lint findings are recorded as the accepted baseline (D-9), the dead mode-rule function is
   deleted, six test files move beside their modules, and the editor's error-line text is asserted.
5. One Enter answers one dialog (M8, D-29).

**Value Delivered**: YES. All five statements shipped (website `787bec5`, generator `8512a1d`). UAT approved them on a
production build of `7293a35`, and the move to `787bec5` changed tests only. Production observation of item 2 is
still owed: rows B-6 to B-9, carried by `handoff/017-existing-items-backlog-post-deploy-2026-11-19.md`. Those rows
never gated the release.

**Implementation Duration**: 18 h 34 min, from implementation start on approved revision 4 (2026-11-19T00:29Z, rulings
block 00:29Z) to UAT approval (19:03Z, plan R-61). From the scoping determination to the last push: 22 h 15 min
(2026-11-18T21:59Z to 2026-11-19T20:14Z).

**Overall Assessment**: The chain delivered every item it was scoped for, plus a rider, in under a day. Its
expensive part came after UAT-1 reopened M2 at 10:31Z. From then to UAT approval the chain spent $77.22, about 18% of
the stage sessions' total. The time went into five more M2 fix rounds, two plan revisions and 6 h 37 min waiting on
him. Each round fixed a real gap.

Three process weaknesses recur across stages:
- Mutants were called equivalent by argument. The argument was wrong all three times a run tested it.
- The mutant generator cannot delete a call or drop a JSX attribute. The plan-level pass knew this at 09:14Z and
  routed the check to Phase 3, which failed on it at 19:53Z.
- Every wire-library test faked pusher-js. That let UAT-1, a HIGH finding, pass code review, QA and steering's own
  refutation.

## Timeline Analysis

| Window (UTC) | What happened | Spend (`cc-usage.py chain 017`, TOTAL) |
|---|---|---|
| 11-18 21:59 to 11-19 00:29 | Determination; plan revisions 0 to 4; 18 questions to him over six selection prompts (the first six put first in plain text); critic, architect and QA Phase 1 approve revision 4 | $104.61 |
| 00:29 to 04:22 | M1 to M4 through code review and QA Phase 2 (M2 and M4 each QA Failed once; M3 and M4 each rejected once) | (not separated) |
| 04:46 to 05:19 | Rider M8 added (D-26); M5-0 probes pushed to a Vercel preview (limbs 2 and 3); revisions 5 to 7 through the gates | (not separated) |
| 05:19 to 09:16 | M5, M6, M8, M7; park 07:15 to 07:24; security APPROVED; revisions 8 and 9; plan-level QA Complete 09:14 | (not separated) |
| 09:16 to 10:31 | UAT pass 1: five walks; B-1 fails (UAT-1 HIGH) | (in next row) |
| 10:31 to 19:03 | M2 reopened: fix rounds 3 to 7, revisions 10 and 11, code review Rounds 9 and 10 rejected, QA Failed (QAF-27), a 6 h 37 min wait on him (11:12 to 17:49), UAT pass 2 approves | $77.22 |
| 19:13 to 20:14 | devops Stage 1; Phase 3 fails on QAF-29 and QAF-30 (19:53); test-only fix; Phase 3 Release Verified (20:10); both pushes | $10.96 (19:51 to 20:14) |

Drift set in at 10:31Z, with UAT-1. Before then, every milestone cleared its gates within about an hour of its
hand-off. After it, M2 alone took the rest of the day. The record shows one root cause, a wire-decode behaviour the
tests faked away (below). The wait on him was its largest single cost in time.

## What Went Well and What Didn't (process focus: workflow, collaboration, quality gates)

### Went well

- **Steering refuted its premises before each question.** Steering ran a `general-purpose-sonnet` refutation before
  nearly every question it put to him (blocks 22:18Z, 22:32Z, 23:24Z, 00:06Z, 00:21Z, 04:50Z, 05:01Z, 08:12Z, 08:36Z,
  19:13Z). These runs changed what he was asked:
  - OQ-6's lint premise was refuted, and the planner withdrew it (R-1).
  - OQ-8's expired-session member, OQ-12's wording, OQ-13's frequency and D-8's retention were each partly refuted.
  - O-1's "/preview answered 500" was refuted as worded.
  - The access defects were confirmed by execution before he ruled on them.
- **Steering named the right hazard at the start.** The brief's hazard 4 (`017-brief-common.md`) reads: "A fix that
  silences the saving tab by weakening the hash compare can silence the other tabs too." That is CR-20 exactly.
  Implementer fix round 3 (`42d15de`) made that weakening, and code review Round 9 caught it with a probe red at
  `42d15de` and green at `4b8db9c`.
- **The re-walk came before any code change.** On UAT-1, steering ruled that UAT re-walk B-1 with the implementer's
  capture set before code changed (block 10:31Z). Walk 6 reproduced the failure in 2 of 15 runs and refuted the
  implementer's first candidate cause. The actual cause, pusher-js parsing number-shaped strings, was then found from
  that capture.
- **The release-tip cycle was fast.** From Phase 3's failure (`4914aaa`, 19:53:25Z) to Release Verified (`c09fd41`,
  20:10:03Z) took 17 minutes, for a test-only fix that code review checked with 5 of 5 of its own mutants.
- **The pre-code gates converged quickly.** The critic, the architect and QA Phase 1 approved revision 4 within
  2.5 hours of the determination. QA Phase 1 found QAF-1 HIGH (an earlier save could delete a later save's image)
  before any code existed.
- **Errors were lodged in the round they happened.** Steering recorded ten of its own errors, each with "the check
  that would have caught it". Two stages wrote a "Self-diagnosis, for the retrospective" (M2 Fix Round 6, M8). This
  retrospective could read them only because they were lodged.

### Didn't go well

**1. Mutants were called equivalent by argument (candidate item 2, re-derived).** The "19" in M2 Fix Round 6's class
sweep counts hits of the word "equivalent" (`grep -c -i`: m3 8, m4 1, m5 1, m6 4, m8 5). It does not count mutants.
Read hit by hit, these are the dispositions:
- **Withdrawn after a run showed them wrong: three.**
  - The implementer's `nm44` (M2): CR-21, killed by a two-hook case at `24e9be7`.
  - The implementer's `row-warning-enabled-dropped` (M8): QAF-22. QA's probe of the 75 ms closing window showed it
    live.
  - Code review's own equivalence row for the same `enabled` drop: R-32, "My equivalence row for W's dropped
    `enabled` was wrong".
- **Standing on argument alone: seven.**
  - M3's five: survivors 6, 7, 8, 12 and 14 (`leaveWithoutAlert.ts:1:num`, `messageDrafts.ts:19:num:2` and
    `:num:3`, `withLocalStorage.ts:13:if-false`, `:19:true`). QA's effort-final sweep re-found all five. It agreed
    that four are equivalent and called `leaveWithoutAlert` residue with no criterion member.
  - M4's one: `StyledLink.tsx:34:false`. QA did **not** agree and raised it as QAF-25 LOW (unasserted). It is now
    parked as X-24.
  - M6's one: `?? 0` to `?? 1`. QA's M6 set found the same survivor and also judged it equivalent.
- **Shown equivalent by a run: none** (the implementation extract's tally, checked by the hit-by-hit read above).

In this chain, every argued equivalence that a separating case later tested was wrong, three out of three. The seven
that stand rest on argument, and in six of them QA's agreement is a second argument, not a run. Fix Round 6 named "the
retrospective" as the owner of re-sweeping them. That is not a carrier: the retrospective reads documents and runs no
sweep (`findings.md`, "neither is 'the retrospective'"). The seven therefore have no carrier, and this document
routes them under § Handoff.

**2. The release-tip QA Phase 3 failed on QAF-29 and QAF-30 after QA Complete and UAT approval (candidate item 3).**
The plan-level pass (`1a8edce`, 09:14:50Z) recorded exactly this gap as its Assumption Not Checked:
"[`mutant-gen`] does not delete a statement or a call … and it does not drop a JSX attribute … Owner. QA Phase 3 at the
release tip, which may add a call-deletion set". Phase 3 built that set (`verification/017/qa-phase3/call-deletion-gen.mjs`,
blob `8bc0b98`) and ran it at 19:5xZ. It found two severity-floor gaps:
- QAF-29 (M3's share-code route-0 write). This code dated from M3's delivery at 02:xxZ.
- QAF-30 (M8's `contents` wrapper). This code dated from 05:36Z.

The gap was known 10 h 39 min before Phase 3 (09:14:50Z to 19:53:25Z), and the instrument took one pass to write. Had
it run in the plan-level pass, both findings would have landed before UAT. The cost was small this time ($10.96 and
17 minutes, all test-only). It came after UAT approval and devops's Stage 1, though, and expired the architect's
closing pass and devops's request. The root weakness is the tool: `~/.claude/tools/mutant-gen.js` (header lines
12–24) lists comparison, logical and walk-truncation operators and nothing that removes a call.

**3. A HIGH escaped every gate because the wire library was faked everywhere.** UAT-1 was the saving tab's own-save
notice. Its cause was pusher-js 8.3.0 `JSON.parse`-ing a number-shaped hash string (code review Round 9, R-49). M2's
QA killed 14 of 14 mutants at `dd26104`, and steering's refutation C1 (block 22:32Z) ran "with `pusher-js` faked". No
case ran a frame through pusher-js's real decode until the architect's AF-25 on revision 10 (R-52), which became QA's
EC-6. QA then showed that instrument red against `4b8db9c`'s bare trigger (3 of 4) at 18:00Z.

The record's environment-fidelity convention (`agent-output/CLAUDE.md`, DOM component tests) covers a DOM global that
is present but inert. It says nothing about a transport fake that decodes differently from the real library, which is
the same class of fake and failed the same way here.

**4. The caps (candidate item 1).** Steering capped M4 (04:14Z), M8 (06:01Z) and M2 (18:13Z), each by steering.md's
trigger, read at the time:
- M4: review and QA time passed implementation time, about 41–51 min against about 40.
- M8: the same trigger, about 21 min against about 14.
- M2: its second post-approval revision, revision 11.

What the caps changed:
- **Every MEDIUM after a cap kept its round** as a severity-floor finding: QAF-18 (M4), CR-21 and QAF-27 (M2), and
  QAF-30 (M8, at Phase 3).
- **Only two LOWs were parked**, QAF-19 (X-23) and QAF-25 (X-24).
- **Parking QAF-25 cost a plan revision and a critic pass.** Revision 9 and critique cycle 3 pass 2 (`5f892f5`) were
  spent on it. QAF-25's remedy, by QA's own reading, was a test-only case. The escalation Standing Default says "a
  test-only case QA writes to close a survivor is added in the chain".

Under gates that sweep mutations, nearly every unasserted claimed behaviour is a severity-floor finding (GLOSSARY: "at
least MEDIUM, and it blocks"). So the cap bounded almost nothing it could have bounded, and where it did act, it may
have cost more than the round it saved. Two of the three caps fired on the time trigger with review and QA taking
about 1.0 to 1.5 times implementation time. Two observations do not establish that the trigger is mis-set. They are
recorded for pi.

**5. Steering's own errors (candidate item 4, steering's process facts, re-read in the rulings).** Ten are recorded:
- Plain text instead of a prompt (23:08Z, reconciled at 23:10Z).
- An owner-wait notice sent while the gates could still move (00:11Z).
- OQ-11(b)'s option text false in its pairings (00:27Z; the critic's F-24 caught it).
- Plan lines cited before they were read (05:01Z, corrected at 05:06Z).
- An unread planner SHA echoed (05:06Z).
- A 20-minute lag on the planner's fold trigger (08:27Z).
- B-6 described as a UAT step (08:38Z; the critic caught it).
- Option text that left out the cost of revision 10's rounds (17:51Z).
- Revision 10's passes started before the milestone-delta prompt (17:54Z).
- A relay that cited block 20:21Z before it was committed at `dbbd552` (20:21:36Z).

Six of the ten concern text that went to him or to another session: an option (00:27Z, 17:51Z), a citation (05:01Z),
a SHA (05:06Z), a carrier claim (08:38Z), a relay (20:2xZ). Each one's recorded remedy is the same act: read or commit
the thing cited before sending. The critic caught two of the six (00:27Z, 08:38Z), and steering caught the rest itself.
He caught the 23:08Z error, which was about the form of the ask, not its text. Steering's existing rules already require each of these acts. The errors are
lapses of execution under a dense prompt load (18 owner questions by 00:27Z), not missing rules. § Recommendations
proposes one mechanical aid rather than a new rule.

**6. The wait on him (candidate item 5).** The questions put in plain text at 10:31Z (block-rule lookback) and 11:10Z
(the hash residue and the Pusher disconnect) were answered at 17:49Z, after `steering-coordinator` turned prompts back
on (17:45Z). Prompts had been off since 09:04Z, and the record names the coordinator as having set that. Whether he was
away is not recorded and is unverifiable. Two findings:
- **(a) D-33 needed no criterion change.** Question 1, the exact hash fix, was registered "registration only" (R-51).
  Its own option text said "M2-c's text is unchanged". By the record, it was a mechanism choice inside agreed scope,
  which the escalation Standing Default assigns to the stage. It was held because the remedy touched `shared.ts`,
  outside M2's listed surfaces (block 11:12Z). Only question 2 (the disconnect, a rider on a pre-existing defect) and
  question 3 needed him. Treating D-33 as the stage's would have let fix round 4 and its review run during the wait.
  Release would still have waited on question 2.
- **(b) The idle sessions cost $18.08 over 11:12Z to 17:49Z** (`verification/017/retrospective/wait-window-017.txt`).
  Of that, `security-hooks-017` took $6.39 and `critic-hooks-017` $5.62, both on Fable, at 21 and 24 requests (the
  cache-warm cadence). Security's document was committed at 08:09Z, and its only remaining act was closing that
  document at 20:2xZ. The critic's next act was revision 10, nearly seven hours later.

**7. Code review published two approvals that QA's gap then reversed.** Round 2 (M2, CR-5 duplicating QAF-17) and
Round 5 (M8, CR-13 duplicating QAF-22) were published APPROVED_WITH_COMMENTS and reconciled to REJECTED within
minutes (R-12, R-32). Both misses were severity-floor findings, and one was the argued-equivalence case in item 1. The
reconciles were honest and prompt. The pattern says the reviewer's own mutant set did not include the case QA's did.

**8. The plan's changelog has no row for the release-tip cycle.** That was steering's word at 20:0xZ (block 20:21Z,
last line). The plan therefore ends at R-64 (Released) with no trace of QAF-29 and QAF-30. A reader of the plan alone
would not learn that Phase 3 failed. The architecture record (row 20:03) and the release-tip records carry it.

## Testing by Hand (QA, and UAT where the chain ran it: what ran by hand, its cost, how it could run unattended)

| Segment | What ran by hand | Cost the record shows | How it could run unattended |
|---|---|---|---|
| QA Phase 1 (23:40Z) | G-6, M4-c's browser red check at `1ad625e`, driven step by step by a `browser-walker` helper (`g6-walk/`); a local Discord sign-in, one look in the session's own browser | `browser-walker` 26 requests, $0.28, under `qa-hooks-017 [60eb0bf1]` | G-6 is a one-shot red check at the base. Not worth a runner. The sign-in is a human-gated OAuth step. |
| QA Phase 1 (00:09Z) | Postgres probe P1 to P3 | scripted (`probe.sh`, throwaway `postgres:16`, `--network none`) | Already unattended. |
| QA Phase 2, M2 (18:30Z) | B-15 executed by QA on `60252be` and `24e9be7`: one Pusher socket per tab across an in-app switch | `browser-walker` 24 requests, $0.47, under `qa-hooks-017 [44f411da]`. Attributing that row to B-15 is this retrospective's inference from the session's window. | B-15 is a WebSocket count after a scripted navigation. A Playwright script counting `ws` open and close events reports pass or fail unattended. It belongs in the B-1 runner below. |
| QA Phase 3 | Fresh install, suite, typecheck, M7-b, the call-deletion set | scripted; $10.96 for the whole release-tip cycle | Already unattended. The call-deletion set should become a standing `mutant-gen.js` operator (Recommendation 1), not a per-chain script. |
| UAT pass 1 (09:15Z to 10:29Z) | Five browser walks on a local stack (`tools/uat-local-stack.sh up`), B-1 to B-4, B-12, B-13 | UAT session total $20.69, of which `browser-walker` 500 requests, $7.56 (whole UAT, all passes) | See below. |
| UAT walk 6 (10:31Z to 10:52Z) | B-1's M2-b window, 15 runs with the implementer's capture set (`b1-capture-init.js`) | in the row above | B-1 is a timing race that failed in 2 of 15 runs, so no single walk can decide it. A scripted two-tab runner (Recommendation 6) runs N window runs and reports per run pass or fail with the frame's decoded value and the frame-to-response gap. |
| UAT pass 2 (to 19:03Z) | Walks 7 and 8 on a production build: B-1, B-15, B-12 limb 1, B-13 limbs 1–3 | in the row above | Walk 8's per-limb results were "transcribed by hand (`walk-8/results.md`); the run_code sandbox could not write files", and walk 7 used a loopback file sink. A runner that writes its own result file removes the transcription step. `enter-recorder.js` (B-12, B-13) is that runner's second mode. |
| Walk instrument failures | Walk 1 did not capture when the notice appeared. Walks 3 and 4 typed into the open content editor without closing it, so walk 5 re-ran both. | in the UAT row | A scripted runner fixes the step order once. |
| Owner looks | B-6, B-8, B-9 after both releases: his own looks at messages he saves | pending (post-deploy carrier) | Each needs a real account's production save, so they stay his. B-7 and B-10 already run unattended (crontab readers B7R and B10R). |
| devops | The M5-0 probe pushes (limbs 2 and 3) and their bypass-secret count | his approval per push (D-27, D-30) | A push stays his to approve. The read after it is already scripted (`vercel logs`). |

The standing suite already covers the unit side of each walked row: M2's own-save cases, M4's link guard, M8's
dialog Enter. Nothing here proposes a new suite case for those surfaces.

## Lessons Learned

1. **A surviving mutant's equivalence is shown by a case on the separating input, or it is not shown.** Three of three
   argued equivalences tested in this chain were wrong. The arguments read structure (effect ordering, mount state)
   and missed state that the structure did not show: a module variable shared by two instances, and a 75 ms leave
   transition.
2. **An Assumption Not Checked that names a missing operator class, which the stage can build in the same pass, is
   work for that pass.** Routing it to Phase 3 moves the finding after UAT and Stage 1, where it expires more gates.
3. **A fake of a wire library must decode like the real one on the payload class the code sends.** One real-decode
   case (EC-6) would have caught UAT-1 at M2's first QA pass.
4. **A milestone's surface list is not its scope.** A remedy that changes no criterion and no delivered behaviour is
   a mechanism choice even when it touches a file the milestone did not list.
5. **A cap whose exception covers every severity-floor finding bounds only LOWs.** And parking a LOW through a plan
   revision can cost more than a test-only round.

## Recommendations (each naming the file it would change)

Each reaches its stage through pi, on the owner's scheduling. "Sighted" names where in chain 017 the record shows it.

1. **`~/.claude/tools/mutant-gen.js` (and `mutant-gen.test.js`)**: add the three operators QA built for Phase 3,
   ported from `verification/017/qa-phase3/call-deletion-gen.mjs` (blob `8bc0b98`):
   - `stmt`: a call statement replaced by `;`.
   - `attr`: a JSX attribute or spread removed.
   - `wrap`: a named wrapper call unwrapped.

   **`~/.claude/agents/qa.md`** (effort-final pass): an Assumption Not Checked naming an operator class the pass can
   generate is run in that pass. It is routed to Phase 3 only when the instrument cannot be built in the pass, with
   the reason stated. Sighted: plan-level QA `1a8edce` (09:14Z) to Phase 3 `4914aaa` (19:53Z), QAF-29 and QAF-30.
2. **`~/.claude/agents/implementer.md`, `~/.claude/agents/code-reviewer.md`, `~/.claude/agents/qa.md`** (survivor
   dispositions): "equivalent" requires a case driving the input that would separate the two forms. One example is two
   live instances where the mutant reads shared state. Another is a transition state where the mutant reads mount
   state. Without such a case the row reads "survivor, unseparated", is stated as residue, and carries its argument.
   Also cite `findings.md`'s rule that "the retrospective" is never a carrier. Sighted: M2 `nm44` (CR-21), M8
   `row-warning-enabled-dropped` (QAF-22), and code review R-32. Fix Round 6 routed the remaining sweep to the
   retrospective.
3. **`agent-output/CLAUDE.md`** § "DOM component tests", environment-fidelity convention, **and
   `~/.claude/agents/qa.md`** (Phase 1 strategy): extend the convention to transport fakes. Where a test fakes a wire
   library on a value's path, at least one case runs a frame through the real library's decode for each payload shape
   the producer can send. Sighted: UAT-1 HIGH (pusher-js number-shaped strings), and AF-25/EC-6 added on revision 10.
4. **`~/.claude/agents/steering.md`** § Standing check, the cap sentence:
   - **(a)** Under a cap, a gap whose remedy is a QA-written test-only case follows the escalation Standing Default
     and is added in the chain, not parked through a plan revision.
   - **(b)** Pi weighs whether the cap should bound rounds by count rather than by severity, given that the
     severity-floor exception kept every post-cap MEDIUM's round here.

   Sighted: QAF-25 to revision 9 and critique `5f892f5`; QAF-18, CR-21, QAF-27 and QAF-30 kept their rounds.
5. **`~/.claude/agents/steering.md`** § Prompting the owner, and **`~/.claude/agents/planner.md`** § Plan Scope
   Guidelines:
   - Before a question is put, steering tests each option against the Standing Default "a design or mechanism choice
     inside the agreed scope". An option whose remedy changes no criterion and no delivered behaviour is the stage's
     to decide and record, whatever files it touches.
   - Steering splits the questions so that work no answer gates proceeds during the wait.
   - The planner states, for a remedy outside a milestone's listed surfaces, whether any criterion moves. That makes
     the surface list an implementation note, not a scope line.

   Sighted: D-33 held from 11:12Z to 17:49Z, then registered "registration only" (R-51).
6. **`agent-output/tools/`** (beside `uat-local-stack.sh`, with its own `node --test` file): a scripted two-tab
   browser runner, built from `verification/017/uat/b1-capture-init-2.js`, `rig-uat.mjs` and `enter-recorder.js`.
   - It runs N saves inside M2-b's window and reports, per run, pass or fail, the decoded frame value and the
     frame-to-response gap.
   - It counts WebSocket opens and closes across an in-app switch (B-15).
   - It records Enter dispatches (B-12, B-13).
   - It writes its own result file.

   Sighted: UAT walks 1 to 8 ($20.69 for the UAT session, $7.56 of it browser-walker), walk 6's 2-of-15 race, walk
   8's hand transcription, and walks 3 and 4's step-order errors.
7. **`~/.claude/agent-skills/document-lifecycle/references/cache-warm.md` and `~/.claude/agents/steering.md`**
   § Standing check: when every next act of a chain waits on him, a stage session with no act owed until a later stage
   event is checkpointed and stopped, not kept warm. This applies to a security session whose verdict is committed,
   and to a critic between revisions. The session is respawned from its Resumption State when its event comes.
   Sighted: $18.08 over the 11:12Z to 17:49Z wait, with security $6.39 and critic $5.62.

Not proposed, because it is already in place: steering's pre-send reads (item 5 of "Didn't go well"). The rules exist
(`claims.md`, "The receiving party re-derives"; steering.md, Continuity). The recorded errors are lapses, each
corrected in the round. One mechanical aid could help: a `seam.js`-style check that every `` `<sha>` `` in an outgoing
relay or option text resolves (`git cat-file -e`) and that every rulings block it cites is in `HEAD`. It would have
caught two of the ten (05:06Z, 20:2xZ). Pi can weigh it as an addition to Recommendation 5.

## Cost

**Readout**: `python3 ~/.claude/tools/cc-usage.py chain 017 --since 2026-11-18T21:59 --until 2026-11-19T20:14`, from
the scoping ruling's time to the generator push. Output: `verification/017/retrospective/cost-readout-017.txt`.

- **Stage sessions: 41, $434.74.** All 41 were resolved from the registry cache. None is unrecoverable. Two rows show
  zero usage in the window (`analyst-hooks-017 [f784e545]`, `architect-hooks-017 [5bb9e83d]`). Whether those sessions
  ran is not shown.

  | Stage | Sessions | Spend |
  |---|---|---|
  | critic (Fable) | 4 | $93.82 |
  | qa | 7 | $92.93 |
  | code-reviewer | 5 | $58.17 |
  | implementer | 11 | $49.64 |
  | planner | 4 | $45.36 |
  | security (Fable) | 1 | $28.54 |
  | architect | 3 | $22.42 |
  | uat | 1 | $20.69 |
  | analyst | 2 | $12.07 |
  | devops | 3 | $11.10 |

- **Subagent usage is filed under its parent rows**: QA's `browser-walker` and `general-purpose` helpers, UAT's
  `browser-walker` (500 requests, $7.56), the planner's helpers ($0.17) and devops's `general-purpose-sonnet` ($0.12).
- **Steering's rows**, read separately over the same window (`verification/017/retrospective/steering-rows.txt`): $23.27.

  | Session | Spend |
  |---|---|
  | `steering-roadmap [93a69827]` | $11.46 |
  | `steering-roadmap [d26a0751]` | $0.87 |
  | `steering-roadmap-hooks [42803e0b]` | $8.95 |
  | `steering-roadmap-hooks [da93f9fd]` | $1.99 |

  The tool also lists `steeering-roadmap-hooks` (his 05:1xZ rename) with the same usage figures as `[93a69827]`, so
  it is the same session, counted once. Steering's rows also carry work outside 017: chain A's fixer steering (21:59Z
  to 22:56Z) and the access-defects work (08:09Z to 09:01Z, including the refutation helper). These are not separated.
- **Named, not counted**:
  - `steering-coordinator` ($0.17 in the window). It serves several threads.
  - `planner-hooks-new`, which the readout carries as `planner-hooks-017 [0d9f0050]` (seen 22:12:14Z, the rename
    time). This placement is an inference from the stamp.
  - `uat-access-check` and chain A's fixer sessions, which belong to other chains.
  - This retrospective, which runs after the window.
- **Chain total: $458.01** (stage $434.74 plus steering $23.27).
- **Phase windows** (`verification/017/retrospective/windows-017.txt`):

  | Window | Spend |
  |---|---|
  | Planning to approval of revision 4 | $104.61 |
  | UAT-1 reopen to UAT approval | $77.22 |
  | The wait on him (inside the previous row) | $18.08 |
  | Release-tip cycle | $10.96 |

**$ per added production line**: 601 production lines added over the shipped range.
- Website: `git -C website diff --numstat 1ad625e 787bec5` gives 62 files. 25 are production files with +582 −192.
  This excludes 36 test files (+4414 −188) and `pnpm-lock.yaml` (+80), and includes `package.json` +1 and
  `global.d.ts` +4.
- Generator: `git -C preview-image-generator diff --numstat 8de2b53 8512a1d` gives 2 files, +19 −29.
- Captures: `verification/017/retrospective/*-numstat-*.txt`.

That gives **$0.76 per added production line** for the chain total, or $0.72 for stage sessions alone. Test lines
added outnumber production lines by 7.3 to 1.

## Process record

- The record-write gate refused one shell edit of this document, a python replace of four count corrections. They were
  re-issued with the Edit tool, the form the gate names.
- The cost windows were read with `cc-usage.py`. Their outputs and the numstat captures are under
  `verification/017/retrospective/`.
- The three extraction helpers wrote only to this session's scratchpad.

## Handoff

- **For steering (owner of the next act): the seven standing equivalence dispositions have no carrier** (§ Didn't
  go well, item 1). They are M3's five, M4's `StyledLink.tsx:34:false` (QA calls it a LOW gap, X-24) and M6's
  `?? 0`. Fix Round 6 routed them to the retrospective, which runs no sweep. Steering decides whether they take a
  handoff (for example, `Owning-Stage` qa, with `Review-Trigger` "the next chain whose diff touches
  `messageDrafts.ts`, `withLocalStorage.ts`, `leaveWithoutAlert.ts`, `StyledLink.tsx` or the generator's
  `generateImage.ts`") or lapse as residue. This retrospective does not write outside `retrospectives/`.
- **Next stage: pi**, on the owner's command, takes Recommendations 1 to 7. This document stays `Active` until pi
  extracts them and closes it as `Processed`.
- **Architect: nothing owed.** No new architectural pattern emerged that the closing pass (`0fbb246`) and its delta
  read at `787bec5` (`eb46ec9`) do not already record.
