---
ID: 012
Origin: 012
UUID: 12a4fe3c
Parent: message-valid-field-for-statbot-2026-08-23.md
Status: Processed
Status-Detail: >-
  Rev 2. Processed by pi batch 7 on 2026-08-26T01:40 — R1..R9 dispositioned in the batch analysis at /usr/local/bin/statbot/agent-output/process-improvement/closed/ (mirror ledger in this repository's process-improvement/closed/); R10 kept as written; §6.1's measurement underwrote the retrospective-trigger reversal. Chain 012 stays closed.
Rev: 2
---

# Retrospective 012 — `valid` field on stored messages

**Plan Reference**: `agent-output/planning/closed/012-message-valid-field.md`
**Date**: 2026-08-26
**Retrospective Facilitator**: retrospective (chain 012)

## Changelog

| Date | Rev | Author | Change |
|---|---|---|---|
| 2026-08-26 | 1 | retrospective | Created. Corpus declared. Findings derived from the eight chain-012 stage documents, the parent handoff, the Agents-domain inbox, the repo TODO, the steering thread's docket and hazard notes, and the git history of `agent-output` and `website`. Steering's conduct is in scope by its own lodgement and is treated as evidence, not as accusation. Nothing closed; no other stage's document edited. Two duties in this stage's definition were overridden by owner ruling (trigger condition; the closure agent) and are recorded at §0 rather than followed. |
| 2026-08-26T01:40 | 2 | pi (`pi-statbot-023-hooks-012-013`) | Processed in pi batch 7. R1/R2 → lifecycle skill "The receiving party re-derives" (B7-27/28); R3 → qa/uat predicate sweep (B7-29); R4 → steering OWNER-QUEUE authoring form (B7-11); R5 → planner Registration Passes + steering (B7-9); R6 → mechanical Status-Detail check routed to tools/ (B7-40); R7 → lifecycle skill routing disposition (B7-6); R8 → retrospective trigger encoded with lodge-in-the-round (B7-1/B7-3); R9 → code-reviewer companion-note rule (B7-4); R10 no change. Analysis and ledger: statbot process-improvement/closed/ (batch 7); mirror ledger here. Moved to closed/ on the owner's selection. |

---

## 0. Two overrides this document runs under

Recorded first because they change what this document is and when it exists.

1. **The trigger.** `retrospective.md:22`, `steering.md:117` and `uat.md:268` all say the
   retrospective fires at QA Complete plus UAT Complete and does not wait on release. The owner
   reversed that on 2026-08-25: it *"fires only after release is complete and everything is
   closing/closed out."* That reversal is filed, unencoded, in `~/.claude/agents/INBOX.md`
   (`steering-hooks-012-2`, 2026-08-25, with all six conflicting sites enumerated). This document
   runs under the ruling. **§6.1 measures what the old trigger would have cost on this chain**, and
   the measurement supports the reversal.
2. **The closure agent.** This document's own definition names a downstream agent as its closer.
   The owner ruled 2026-08-25 that agent is not a chain stage. This retrospective is therefore
   written to stand alone, names no successor for itself, and asks nothing of one.

No other clause of this stage's definition was set aside.

---

## Summary

### Corpus — what this retrospective can read, and what it cannot

**Read 2026-08-26.** Everything below is a snapshot of a shared tree.

**Inside the corpus — read directly at the file:**

- The eight chain-012 stage documents in `closed/`: planning (49 revisions), critique (2 cycles,
  4 passes), QA (16 content revisions across 2 phases plus a 2026-08-25 re-specification pass),
  code review (7 rounds) and its companion working note, implementation, UAT (5 addenda),
  deployment (release record plus Addendum A).
- The parent handoff `handoff/closed/message-valid-field-for-statbot-2026-08-23.md`.
- `agent-output/TODO.md`, `agent-output/INBOX.md`, and `agent-output/INDEX.md` (chain-012 rows).
- `~/.claude/agents/INBOX.md` — all five 2026-08-25 entries by `steering-hooks-012-2`, plus the
  chain-013 entries that bear on the same classes.
- The steering thread's `docket.md` in full and `hazards.md` in part (entry list, plus the two
  entries that name chain-012 events).
- Git history of the `agent-output` documents and the `website` commit chain `bc5ee2b`→`c85945f`.

**Outside the corpus, and reported as unverifiable-by-construction rather than as absent:**

- **Anything that happened and was not lodged.** I hold no instrument that could see an unlodged
  event, so **this document makes no negative existence claim about conduct.** Where a stage's own
  lodgement is the only witness, I say so.
- **Session transcripts.** I consulted no live session and asked no session to answer from its
  record. The chain's self-reported errors are contemporaneous, self-incriminating, and quote the
  owner verbatim, which makes them strong — but each is **single-sourced to the party that erred**.
- **Two cross-session messages cut at the recipient's inbox** (code-review carry-forward note,
  §"Two boundaries"). Their content survives only where it was re-written down afterwards. I report
  the re-written version and cannot compare it to the original.
- **Rulings given in conversation and never registered.** Register row D4 records this explicitly:
  *"No verbatim wording available — direction relayed, not quoted."*
- **Errors withdrawn in-channel within minutes** (plan revs 26, 40b). I see the lodged summary,
  never the original wrong statement.
- **The production database, the deployed application, and the statbot workspace.** Everything this
  document says about chain 023 comes from plan rev 48's route record, which itself states it is
  *"recorded as received and NOT verified here."*
- **`check-repo.js --status`' FAILING flag on this chain** is a known false positive, measured
  0-for-5 by UAT and filed in `TODO.md`. Not treated as a finding here, and not silenced.
- **The row-5842 shape question** is dropped entirely by owner ruling D24 — not carried, tracked,
  re-raised, or audited against, including as an observation about the decision to drop it.

### Verdict

| | |
|---|---|
| **Value Statement** | *"As the owner of hooks.gg and Statbot, I want stored hooks.gg messages to carry a machine-readable `valid` field — computed from the composer's own send checks, recomputed on every save, and backfilled across all existing records — so that Statbot can refuse messages hooks.gg already knows cannot be sent."* |
| **Value Delivered** | **YES** |
| **Implementation Duration** | Plan rev 1 → release: **16h50m**. Plan rev 1 → chain closed: **2d 18h33m**, of which **~46.5h was owner hold D20**. Working time excluding the hold: **~20h**. |
| **Overall Assessment** | The field is live in production (D29, owner verbatim), 4825 of 4825 rows classified, register terminal at 20 of 20 with zero rows withdrawn or dropped, UAT unconditional. The chain's process record is unusually good *and* it produced one defect class seven-plus times in three days without ever stopping it. Those two facts have the same cause, and §7 states it. |

---

## Timeline Analysis

Times are `agent-output` commit times. The chain has no planned durations to compare against — no
roadmap document exists in this workspace (recorded in the plan's own Target Release row as an
absence, not an oversight), so **variance is measured against nothing and none is claimed.**

| Phase | Window (2026-08-23 unless noted) | Elapsed | Notes |
|---|---|---|---|
| Planning (to critique-ready) | 05:10 → 05:44 | 34m | Rev 1 drafted blocked on OQ-1; rev 2 on ruling D5; rev 3 re-scoped under D8. Three revisions before any reviewer saw it. |
| Critique cycle 1 | 05:55 → 06:01 | **6m** | 1 HIGH, 2 MEDIUM, 1 LOW → REQUEST REVISION → all four verified resolved. |
| QA Phase 1 | 06:25 → 07:32 | 1h07m | Strategy written **before** implementation; 5 revisions in the window, 3 of them corrections of QA's own claims. |
| Critique cycle 2 | 06:52 → 07:16 | 24m | Re-opened from `closed/` for the D11–D14 delta. APPROVED FOR IMPLEMENTATION 07:07. |
| Implementation + code review | 07:27 → 12:34 | **5h07m** | 7 review rounds, 2 rejections, 5 fix rounds, 1 pin refresh, 1 build fix. Detail below. |
| QA Phase 2 | 12:20 → 12:34 | 14m | PASS at `17cada0`, re-anchored to `c85945f` at rev 7. |
| UAT (first pass) | 12:43 | — | UAT Complete, **APPROVED FOR RELEASE, CONDITIONAL**. |
| Release | 22:00 | — | `website master` `72dc7de`→`c85945f`; `project-utils` already at `749606d`. Held ~9h behind UAT on the owner-executed DDL, by the plan's own ordering. |
| Post-release, day 1 | 22:16 → 23:03 | 47m | UAT addenda 1–4; D19 (two rows left open), **D20 hold**. |
| **Owner hold (D20)** | 08-23 23:01 → 08-25 21:35 | **~46.5h** | Chain 012 stopped where it stood. Statbot 023 held with it by D12. |
| Resumption → closure | 08-25 21:35 → 23:43 | **2h08m** | D22–D29; QA re-specification onto SCR-1; ten register rows executed by the owner; UAT terminalised 20/20 unconditional; devops Addendum A, **CHAIN CLOSED**. |
| Document closeout | 08-25 23:48 → 08-26 | — | Four sibling docs to `closed/`; code review to `Released`; parent handoff to `Addressed`. |

**The code-review sub-timeline, because a bare "7 rounds" reads as thrash and it was not:**

| Round | Time | Tree | Verdict | Why the round existed |
|---|---|---|---|---|
| 1 | 08:09 | `bc5ee2b` | **REJECTED** | Two HIGH in M6's execution shell. |
| 2 | 08:47 | `681c353` | **REJECTED** | H3 only — persist/print loss asymmetry. |
| 3 | 09:13 | `eb28ae6` | APPROVED_WITH_COMMENTS | H3 closed; reviewer's own inversion hypothesis raised and **refuted** by a differential. Found M4: `npm run backfill-valid` defaults to the production database unguarded. |
| 4 | 10:08 | `ff753a6` | APPROVED_WITH_COMMENTS | Exists because of **owner ruling D17** — guard before the pin refresh. Guard attacked adversarially: 11 inputs, oracle fixed in advance. Found CR-M6. |
| 5 | 11:03 | `f983508` | APPROVED_WITH_COMMENTS | CR-M6's ruled Minimum tested for **completeness** over the class, not merely for stopping the demo attack: 0 redirects the guard does not see. |
| 6 | 11:44 | `17cada0` | APPROVED_WITH_COMMENTS | Mandatory: the pin refresh is a production-code change, expiring round 5 by the reviewer's own Reviewed-At rule. Found **CR-M7**. |
| 7 | 12:30 | `c85945f` | APPROVED_WITH_COMMENTS | Delta round. Found 59 lines of content **no review had ever read**. |

**Every round has a cause, and rounds 6 and 7 each found something a shorter chain would have
shipped.** Round 4 exists because a MEDIUM found in round 3 would have armed against the production
database at the pin refresh. Round 7 exists because a test file authored 31 minutes after round 6
entered the release. A retrospective that counted rounds and called seven excessive would be wrong.

---

## What Went Well — the keepers

These are stated as practices to repeat, not as compliments.

### K1 — "Assumption Not Checked" as a first-class object with a named owner

Every stage that could not close a question **booked it** with four parts: the statement, a
**falsity signature** (what the world looks like if it is false), a **named owner**, and the
**instrument that would settle it**. Traced examples:

| Booked by | Assumption | Routed to | Outcome |
|---|---|---|---|
| critique cycle 2 pass 2 | JSON-modal Load behaves as its static composition reads | qa Phase 2 | Closed by execution (QA's EXT-3) |
| code review round 4 | `pg` dials the host its `Client` reports | code-reviewer, post-refresh | **Discharged by the reviewer's own execution** at round 6 |
| code review round 5 | CR-M6 completeness survives the refreshed install | code-reviewer, post-refresh | Discharged at round 6 |
| code review round 6 | 28 swept package upgrades are behaviourally inert | qa Phase 2 | Closed by full-suite execution |
| code review round 7 | the two added specs' runtime result is unchanged | qa | Closed at QA rev 7 (22 files / 411 tests) |
| QA rev 9 | the deployed composer serves `a74b9e2` | devops | **Discharged by observation** at QA-R4 |

The critical property is not that they closed. It is that **not one was closed by the booking stage
accepting another party's word.** Where the booking stage could not re-derive, it named who could,
and the row stayed open until that party executed. This is the strongest single quality practice in
the chain.

### K2 — "Corroboration is not substitution", with a stated tie-break

The code-reviewer wrote it down before it was needed: *"An assumption this stage registers is
discharged by this stage re-deriving it. Another stage's run of the same instrument is input; where
the two disagree, the disagreement is itself the finding."* At round 6 it applied the rule to its own
advantage-of-convenience: the implementer had run the same instrument and reported it, and the
reviewer re-derived anyway and recorded the implementer's run as corroboration. The implementer's own
conduct is the other half — it ran the reviewer's instrument and reported the result either way,
**having been told it would not substitute.** Both halves are cheap and both are transferable.

### K3 — Re-derivation at the artifact by the *receiving* party

**This is the only control that caught anything on this chain, and it caught everything.** Every
instance in §P1 was found by the party receiving a claim going to the artifact instead of the
summary. Enumerated, with who caught whom:

| Claim | Caught by | Instrument |
|---|---|---|
| Implementer's "0 unrelated" pin-refresh scope, relayed by steering to the owner as measured fact | **code-reviewer** (CR-M7) | `git show 49f2bf1 -- pnpm-lock.yaml` — 436 unrelated, 28 packages |
| Steering's "013's import check refuses an unchanged Load", carried into a commissioning brief and the owner queue as fact | **planner** (rev 38) | Read `JsonModalBody` at the released tree |
| Steering's relay that both new spec files were present throughout rounds 5–6 | **code-reviewer** (round 7) | Blob sha256 + mtime — right about one file, wrong about the other |
| Steering's "ten rows outstanding at D20" | **uat** (Addendum 5) | Read the *other* ledger; recorded a dated reconcile note |
| Steering's brief naming three items unfinished | **uat** (Addendum 5) | All three terminal in the register; resolved in the register's favour |
| QA's "a third file neither review named" | **QA itself** (rev 5c) | Opened the critic's committed record — it was one `grep` away |
| The reviewer's own "my write had already been committed" | **steering** | `git status`, immediately before routing |
| Steering's "both repos on master and clean" | **planner** | `project-utils` was on a chain branch |
| Steering's peer message asserting another session held records 5712/5842 | **owner** | *"You derived 5712 and 5842. It had 0 knowledge of those."* |

**Hit rate: 9 for 9 where applied. No instance was ever caught by the asserting party re-reading its
own claim** — which is the same asymmetry `RTK.md` already states about filtered instruments: a wrong
claim reproduces stably and therefore reads as confirmation.

### K4 — Closing a class on a predicate, not on the instances found by accident

QA rev 10 is the model. Two overtaken register rows had been found — one by QA reporting an
observation, one by steering rebuilding a queue file. QA refused to treat two accidents as a closed
class: *"two instances found by accident are a coordinate list, not a closed class."* It then wrote a
predicate, **checked that both known instances fall inside it** (a known instance outside would have
falsified the predicate, not the instance), and swept all 20 rows to a reconciled count:
6 not-Open + 4 re-specified + 10 checked and cleared. Two rows (R5, R6) were checked and
**deliberately not re-specified**, with the distinction stated: underspecified, not overtaken —
a lesser and different defect. This is how a class gets closed.

### K5 — One register, minted by QA, appended to by later gates, terminalised by UAT

Twenty rows, one ledger, from QA Phase 1 through closure. UAT's terminalisation records **observed
beside predicted, never over it**, and preserves both executions of QA-R2 against its two different
specifications rather than overwriting the first. `NOT EXECUTED` was explicitly held to be
**not a terminal state**, so no row could be quietly parked. Two obligations found travelling outside
the register (U-3) were folded in rather than run as a parallel ledger. Final reconciliation:
20 = 16 EXECUTED + 4 SUPERSEDED + 0 WITHDRAWN + 0 NOT EXECUTED, with none omitted and none recorded
"satisfied incidentally."

### K6 — Replacing a collapsed independence split with observable measures

The owner collapsed QA's two-phase, two-session split into one session (*"change, qa-1 will handle
both"*). QA did not simply assert it would stay honest. It named **four measures a third party can
check**: expectations frozen and committed **before the code existed** (git history is the evidence,
not QA's word); every sentinel expectation **sourced outside the codebase** (record 5712's expected
`false` from the owner's live Discord `400`/`50035`; the bare-Text-Display shape's expected `true`
from his live `200`); each mutant named together with the single cell that must kill it; counts
travelling with their enumeration predicate. It then committed in advance to declaring, per criterion,
whether the expectation had moved. **When a structural independence guarantee is removed, replace it
with measures, not with an assurance.**

### K7 — The coordinator lodging its own errors, verbatim, into a chain document

Steering writes no stage document. It therefore lodged its errors as changelog rows in the plan —
revs 25, 26, 33, 40, 42, 47, 48, plus three instrument defects at 45–46 — each quoting the owner's
correction verbatim and each stating the class rather than the incident. **This retrospective has a
subject because of that practice and would have almost nothing to say without it.** The rev-33
lodgement gives the reason in its own words: *"lodged because the owner ruled the retrospective is
held … this material would otherwise die in a session's context."*

Two features worth copying: the lodgements name the **class**, not just the event (rev 48: *"the class
this chain has now lodged five times"*), and they explicitly decline to soften on outcome (rev 48:
*"the outcome does not exonerate it … true by coincidence, not by derivation"*).

### K8 — Blocks reported, not retried; gate-satisfactions disclosed in the round

Two classifier blocks landed on devops. Both were reported and neither was reworded, split, or routed
to another session — the deployment record names the alternative and rejects it as *"the laundering
the rule exists to stop."* The post-push `git ls-remote` after-check stands recorded **NOT VERIFIED**
in the release record and in the deployment-history JSON rather than being substituted from a peer.
Separately, two read-only shell forms were denied and the same reads were taken with the plain forms
the denial notice itself sanctions — **disclosed in the round, because an undisclosed satisfaction is
indistinguishable in the record from a workaround.** Both blocks were later sanctioned by the owner
and performed by the steering thread, which is the rule working exactly as designed.

### K9 — Declines recorded with their reason and their reopening path

Three examples, all cheap and all preventing re-litigation. Plan rev 18: the planner proposed a
release-time guard-existence check; steering declined it with the reason stated (*"four gates already
assert it"*) **and named the reopening path** (a release-condition change, through steering to the
owner). D26: the pre-send precondition waived with its consequence recorded in the words the option
carried — *"the first person to actually run this path is an affected guild owner"* — plus a
reopening class (*a guild owner reporting lost data*). Round 7: a comment-density observation
considered and dismissed **with the reason** (no comment gate exists here; both files sit inside the
local norm; raising it would invent a standard the repo does not hold).

### K10 — The hold was not pure cost

D20 stopped the chain for ~46.5 hours and held statbot 023 with it. It also let chain 013 ship a
JSON-importer fix that **falsified a plan-012 conclusion in the chain's favour**: the B3 record class
had been held to have no lossless repair path, which is why the repair guidance was going to be a
per-shape branch. After 013, both routes are lossless, and the guidance collapsed to **one
instruction** (D25). The falsification reached 012 because a chain-013 session wrote it into
`agent-output/TODO.md` **specifically because 012 was held with no live session to receive it** — and
the planner then re-derived it at the released tree rather than acting on the note. That is a working
cross-chain routing pattern for held work, and it should be kept.

---

## What Didn't Go Well — the findings

### P1 — Derived-not-established: a claim about another party's state asserted from the record instead of the artifact

**The chain's dominant defect class, by a wide margin.** Steering's own docket counts *"seven errors,
ONE class: a claim restated from the record instead of re-derived at the artifact."* That count is
steering's own and is conservative for the chain as a whole, because **the class is not steering's.**
It has at least one instance from every stage that made a claim about something it had not opened:

| # | Instance | Stage | Consequence |
|---|---|---|---|
| 1 | Pin-refresh scope computed from the **working tree** instead of the commit | implementer | False figure repeated at four sites in the record devops and UAT read; became CR-M7 |
| 2 | That figure relayed to the owner **as measured fact, unmeasured** | steering (rev 25) | The owner was given a number nobody had taken |
| 3 | Session registry misread as a process death | steering (rev 26) | Planner briefed as a successor and told to distrust its own context; QA told to rename, which would have broken its routing address |
| 4 | Owner-gated items written to the wrong file while `OWNER-QUEUE.md` read *"Blocking — nothing"* | steering (rev 33) | The owner found it, **twice** |
| 5 | D21's descriptive clause carried into a commissioning brief **and** the owner queue as established fact | steering (rev 40a) | Would have handed the owner a three-step repair procedure, for onward sending to guild owners, for a defect that takes one click |
| 6 | "Both repos on master and clean" without opening `project-utils` | steering (rev 40b) | Withdrawn in-channel |
| 7 | `OWNER-QUEUE.md` rebuilt from **one** register, omitting QA-R2 | steering (rev 42) | R2 had inverted; carried forward unexamined it would have produced a **false failure on the field the whole chain exists to deliver** |
| 8 | "Ten rows outstanding at D20" — today's states, asserted about a date three days earlier, from one of two ledgers | steering (rev 47) | Wrong set; found by UAT, not by steering |
| 9 | This chain's record identifiers asserted into a peer session's state | steering (rev 48) | Introduced 5712/5842 into another domain on an inference; the owner corrected it |
| 10 | "My registration write had already been committed" — inference from own non-action | code-reviewer | Caught by steering's `git status` |
| 11 | A commit attributed to "another stage" from its subject and stat | code-reviewer | Provenance was **structurally unavailable**: every `agent-output` commit has one author, and the one commit misattributed carried no session trailer |
| 12 | "A third file neither prior review named" | QA / planner | False as to the critic, whose committed record named the file; corrected at QA rev 5c and plan rev 12 |
| 13 | A brief naming three register items as unfinished | steering | All three terminal; resolved in the register's favour by UAT |

**It recurred after every lodgement.** Revs 25, 26 and 33 were written up as lessons before revs 40,
42, 47 and 48 happened; rev 42's own text says so — *"recording it a third time has not prevented it,
which is itself the finding."* The code-reviewer's note is sharper still: it committed the identical
error **one message after** writing the first one up, and named the interval.

**So the actionable content is not "be careful."** Writing the rule down failed, four times, in three
places (a definition, a docket, a chain changelog). The chain-013 inbox entry reached the same
conclusion independently: *"Writing a rule down — in a definition, in a docket, in a retrospective —
did not prevent its recurrence in any of the three cases."* What **did** work is K3, and it worked
9 for 9. §7 says why, and it is a structural difference, not a difference in care.

**Falsifier for this finding**: an instance of the class caught by the asserting party re-reading its
own claim, or a lodgement after which the class did not recur. I found neither.

### P2 — Overtaken specification: rows that were correct when written and invert when their premise moves

A **different** class from P1, needing a different remedy, and confusing the two is how a chain gets
the wrong fix. P1 is an assertion that was never checked. P2 is a statement that **was** checked, was
true, and became a trap.

- **QA-R2.** Specified against record 5712, genuinely stranded; observed PASS 2026-08-23. The owner
  then repaired 5712 by direct SQL. R2's failure clause now reads a `true` — the *correct* reading —
  as the field failing. It sat on the closure-blocking list in that state.
- **QA-R19.** Stated the repair guidance is shape-dependent over three shapes and that any one-line
  guidance is *"wrong for at least one shape whichever line it is."* D25 then shipped exactly one
  instruction. Left as written, the register would carry a standing warning that the guidance we sent
  loses people's data, with nothing explaining why it was sent anyway.
- **UAT's own `Status-Detail`** (U-12). It reported *"0 NOT EXECUTED"*; `check-repo.js`'s matcher has
  no notion of negation, so **the clause announcing that no row is blocked was itself read as a
  blocked row.**
- **Plan 012's `Status-Detail`** — narrates *"round 1 REJECTED"* from a round closed the same
  morning, and renders `⚠ FAILING/BLOCKING` on a released plan.
- **`49f2bf1`'s commit message**, deliberately left carrying the superseded "0 unrelated" claim in a
  shared tree, with devops explicitly instructed **not to inherit it**.

UAT named the mechanism and it is right: *text that was correct as written, which inverts when its
next reader is not the one it was written for.* R2's next reader was a queue-runner; the
`Status-Detail`'s was a regex; the commit message's was devops.

**Both register instances were found by accident** — one by QA reporting an unrelated observation,
one by steering rebuilding a queue file. **K4 is the remedy** and it exists because QA refused to
stop at the two accidents. The lesson to encode is the trigger: **when a ruling or an event moves a
premise, sweep the whole register against a predicate**, do not fix the instance you tripped over.

**Falsifier**: a P2 instance found by re-derivation at the artifact. There is none — each row was
individually accurate at its own tree, which is exactly why K3 cannot catch this class.

### P3 — Register cells transcribed into a file whose job is to state an action

Three defects in the owner's queue file in two turns, **all three raised by him**, all lodged at plan
revs 45–46 in his words:

- *"what 'class'? This item does not explain what I'm looking for"* (QA-R20's entry named no class).
- *"Idk why I'm being asked to confirm something that was provided directly from the script's output.
  That's self-evident"* (QA-R9, a judgement gate framed as confirming script output — and naming no
  particular report, though four backfill reports existed).
- *"QA-R20 doesn't make any sense... What am I supposed to do?"* (the entry handed him a
  record-keeping constraint that belonged to devops, leaving no action in it at all).

Steering diagnosed the common cause itself, correctly: *"transcribing register cells, which are
written for stages and carry actor and recorder columns, into a file whose whole purpose is to state
an action and a pass condition for the owner."* A fourth instance of the same interface failure is
rev 40c: a blocking selection prompt put in stage vocabulary (*row-D record*, *release condition*,
*per-shape branch*) returned *"idk what any of this means"*, and was answered immediately when
re-put in plain terms — **on a decision gating a user-facing send.**

This is P2's mechanism at the human interface, and the remedy is different from both P1's and P2's:
the owner-facing file needs an **authoring form** — the action, the pass condition, and what he is
looking for — not a transcription with the stage-facing columns dropped.

Worth recording beside it: the queue was also left holding **finished** items. That is documented as
a chain-013 instance in the Agents inbox and is not restated here.

### P4 — Two write disciplines in one document, no tie-break, and the field lost

The plan's `| Revision |` field **reads 39**. Its changelog carries **49 rows**, the last numbered 49,
and the closing commit names rev 49. The field went stale at the last planner pass and every write
after it (revs 40–49) was a steering registration or lodgement declaring *"nothing but this line is
touched."*

Neither party is careless here. **Two rules in force at once contradict each other**, and the
contradiction resolves silently in favour of whichever was applied last:

1. The **minimal write-set discipline** for registration passes — a guest stage touches the row it is
   registering and nothing else. Applied faithfully, ten times running.
2. The **Revision/`Status-Detail` pairing rule** — adopted by the planner at rev 20 after the
   code-reviewer caught the drift, broken **five times** before this (three by guest stages), and
   repaired each time.

The pairing rule is documented **only in the changelog of the document it governs** — steering's own
rev-33 observation: *"a rule legible only to a reader who has already read the rows that record
breaking it."* Steering then broke it ten more times. I checked whether the rule exists outside plan
012: `planner.md:31` states the principle for the *planner* and says nothing about the `Revision`
table field and nothing about guest stages. **So it is an undocumented rule, not a documented rule
ignored.** The plan shipped into `closed/` with the field ten rows behind.

**The sibling defect, same field family, with a measurable cost.** `planner.md:31` explicitly states
*"`Status-Detail` is a status field under a budget — it states the current state in a few lines;
revision narrative belongs in the Changelog."* Plan 012's `Status-Detail` runs to roughly three
thousand words of round-by-round narrative, is mirrored verbatim into the generated `INDEX.md`, and
**is why the plan renders `⚠ FAILING/BLOCKING`** — the narrative contains the word `REJECTED` from
rounds closed the same morning. UAT then had to spend a finding (U-12) explaining to future readers
that the flag is a false positive with a known cause. The budget rule exists, was breached, and the
breach has an observable downstream cost. Chain 013's retrospective reached the same conclusion about
its own frontmatter independently.

### P5 — D18 created a routing destination that nothing was obliged to create, and two items landed nowhere

Owner ruling D18 closed scope: *"Everything else gets folded into handoffs."* Every stage complied and
routed correctly. **No handoff document was ever created for chain 012's D18 material.**

Five residuals were rescued — devops lifted them into deployment Addendum A *"so they do not live only
in a discharged ledger"*: plan Risk R7's unevaluated per-embed limits, QA-R19's open bound, QA-R20's
empty-but-unguarded whitespace class, D24's accepted fourth-shape risk, and the JSON-Load fallback.
That rescue was devops' own initiative and is exactly right.

**Two items missed it.** `CR-L11` (unix-socket `DATABASE_URL` forms where the guard's host string does
not name the host `pg` dials) and `MS-4` (the backfill UPDATE's NULL guard, a mutation survivor
unkillable without a database) were both explicitly routed *"to handoffs under D18."* Searched
repo-wide: both strings appear **only** in the six chain-012 documents — all now in `closed/` — and in
the generated `INDEX.md`, which mirrors those documents' own frontmatter. No handoff document, no
`TODO.md` entry, no `OPEN_QUESTIONS.md` entry, no open register row.

The mechanism is worth more than the two items: **"route it to X" is not a routing act when nothing
obliges X to exist.** Compare the items that survived — they survived because a stage with a live
document *pulled* them in, not because the routing instruction *pushed* them anywhere.

**Falsifier**: a document outside `closed/` naming `CR-L11` or `MS-4`. I looked and found none.

### P6 — The chain's process findings live in documents the chain then closes, and one of them is invisible to the lifecycle entirely

Every process finding this chain produced is inside a chain document: plan changelog rows, QA
changelog rows, UAT finding bodies, a code-review companion note. All are now in `closed/`. That is
correct — but it means the retrospective is the only mechanism that lifts them out, and it fired only
because the owner reversed its trigger and told it to run.

The sharpest case is `code-review/closed/012-carry-forward-to-post-refresh-pass.md`. It carries no
frontmatter, is **outside the document-lifecycle contract entirely** (devops said so, and correctly
left it alone), and holds three genuine process findings nothing routes anywhere:

- The provenance rule (§4b): *"in this repo a commit is attributable to a stage only where it carries
  a session trailer. Absent one, provenance is reported as unknown"* — established after checking that
  every `agent-output` commit has a single author and that the one commit misattributed had no body.
- The SHA hazard (§5), where **both** prior models were wrong: the working directory *does* persist
  across calls, so a bare `git` does not fail loudly — it silently reports whichever repository the
  shell last landed in. The control is `git -C <repo>` on every invocation. The note's own closing
  observation is the most useful sentence in it: *"steering's remedy was right and its mechanism was
  wrong, and I was about to accept the mechanism because the remedy worked … A control adopted for a
  wrong reason survives only until someone reasons from it."*
- The reason the note exists at all: two cross-session messages were dropped at the recipient's inbox,
  and the context was compacted twice. *"The round-5 verdict survived its drop because it had been
  committed before it was sent; the dispositions in the same exchange existed nowhere but the relay
  and did not survive."*

**This document was read only because the commissioning brief pointed at it.** A retrospective working
from the lifecycle contract alone would not have found it, because nothing in the contract knows it
exists.

Related and already filed, so cited rather than restated: the lifecycle table offers **no terminal
status for a completed code review and none for a discharged handoff**, and two steering sessions
independently reached for `Addressed`, which is not in the table — so an off-vocabulary status is now
in production records by convergence rather than by definition.

### P7 — Underspecified rows that a pass clears anyway

QA-R5 and QA-R6 both predict *"modal shown"* unconditionally, while the code gates the modal on
departing data — and has done since before the rows were written. The owner cleared both and his
report is terminal. UAT recorded U-8 *"solely so a later reader does not take the clearance as
evidence the rows were well-formed."* That disclosure is the right handling, and the finding here is
narrow: **a row can pass without ever having been able to fail**, and only a stage deliberately
looking for that will notice. QA's rev-10 sweep caught these two by checking them against the
predicate and finding they fell **outside** it — which is a second reason the predicate sweep is
worth its cost.

---

## Agent Output Analysis

### Handoff chain

```
owner → handoff (written by steering-023, another workspace)
      → planner → critic ⇄ planner (cycle 1)
      → qa (Phase 1) → planner (D11-D14) → critic ⇄ planner (cycle 2)
      → implementer ⇄ code-reviewer  ×7 rounds / 5 fix rounds
      → qa (Phase 2) → code-reviewer (round 7, delta)
      → uat → devops (RELEASE)
      → [owner ruling D19, D20 — HOLD ~46.5h]
      → [chain 013 ships; falsification routed via TODO.md]
      → planner (D22 resumption) → qa (re-specification onto SCR-1)
      → owner (10 register rows executed) → uat (terminalise 20/20) → devops (CLOSE)
```

**Every stage-to-stage transition in the record went through the steering thread**, by standing
correction — the code-reviewer's own handoff line states it (*"routed through steering, per the
standing correction that stage-to-stage handoffs go through that thread"*), and every stage
document's changelog names `steering-hooks-012` or `steering-hooks-012-2` in its Handoff column. I
have no instrument that would show a stage spawning another without recording it, so this is a
statement about the record, not about conduct. Register row **D3** is the related owner ruling: if
the plan needs an analyst it asks the owner for a durable session rather than spawning a subagent —
and no analyst ran.

### Handoff quality

**Were handoffs clear and complete?** Mostly yes, and the exceptions are informative rather than
routine. The briefs that carried defects were the ones asserting the *state of a document* rather
than the *task*: three items named unfinished that the register showed finished; a premise about
another chain's shipped behaviour; a claim about two repos' branches. **Task content was reliable;
state claims were not.** That is P1 again, and it is the argument for briefs pointing at artifacts
rather than restating them.

**Was context preserved?** Two failure modes were observed and one was engineered around. Two
cross-session messages were dropped at a recipient's inbox and one session's context was compacted
twice — and the code-reviewer responded by writing dispositions **to a path before citing them**,
which is the correct structural answer. Registration passes are the other preservation mechanism and
they worked: guest stages wrote their verdicts into the plan's changelog with a declared write set,
so a verdict survives its author's session.

**Excessive back-and-forth?** No. See the code-review sub-timeline: seven rounds, seven causes, and
findings in the last two. The 49 plan changelog rows decompose exactly, by declared author: **26
planner passes, 15 registration writes by guest stages** (steering 9, code-reviewer 4, qa 1, uat 1)
**and 8 steering lodgements.** Across all authors, **8 rows explicitly correct or re-status a claim
the document had already made** (revs 11, 12, 18, 20, 28, 31, 38, 47) — a correction rate of ~16%,
which is high, and is exactly what §7 predicts. Revs 10→11→12 are three consecutive passes each
correcting the one before it.

### Issues and blockers

| Issue | Where | Resolution | Escalated? | Notes |
|---|---|---|---|---|
| OQ-1 — does the predicate read the stored V2 flag? | plan | Resolved by **D5**, neither enumerated option | **Yes, correctly** | The owner relocated the defect to the composer; scope grew by one milestone as a result |
| OQ-2 — where the recompute hook attaches | plan | Resolved by **enumeration**, not judgement | No | The criterion was stated over the enumerated writer *class*, so a future writer joins it |
| OQ-3 — is the backfill spot-checked? | plan | Resolved and **strengthened** into an owner-reviewed gate | No | Became M6-b, the gate D12 orders the live declaration behind |
| F-QA1 — the promised recovery did not exist | qa | **D11** | Yes | The plan and the handoff both promised a repair route the code did not have |
| F-QA7 — cross-workspace deploy ordering | qa | **D12** | Yes | The sole planning-register record of the constraint on either side |
| CR round 3 M4 — backfill defaults to production, unguarded | code review | **D17** — guard before the pin refresh | Yes | The single highest-severity latent hazard in the chain |
| CR-M7 — a false scope figure in the release record | code review | Closed at `1db8186`, both halves | No | Corrected at all four sites, each with its own correction note |
| U-5 — two rows name a subject nobody can produce | uat | **D19** (leave open) → **D23** (re-specify) | Yes, twice | D19 accepted indefinite closure blockage; D23 superseded it two days later and took UAT's original recommendation |
| Two classifier blocks | deployment | Reported, **not retried**; later owner-sanctioned | Yes | See K8 |

**Escalation was appropriate throughout, and in one respect exemplary**: no stage self-authorised a
scope change. The rev-16 case is the model — the planner judged a plan correction was required,
recognised the enactment rewrote a milestone clause, and **interrupted rather than enacting**,
reporting the proposed wording to steering. It landed as D16 the next pass.

**Did early issues predict later problems?** Yes, once, and precisely. QA's Phase 1 named the trap
*"Vitest does not typecheck … the suite will be green while `tsc` is red, and the two facts look
alike in a report that says only 'tests pass'"* — and required the implementer to record the typecheck
state as a separate line every round. That is exactly the shape of the defect the pin refresh's
rebuild later surfaced (`npm run build` failing on a class no gate in the chain had exercised). The
prediction did not prevent it, but it is why the failure was legible when it arrived.

### Change frequency

| Document | Content revisions | Corrections of the author's own prior claim |
|---|---|---|
| planning | 49 | 8 (revs 10→11→12, 18, 20, 31, 38, 47) |
| qa | 16 | 4 (revs 5b, 5c, 6a, 9's self-correction of rev 8) |
| uat | 9 | 2 (Addendum-5 reconcile note; U-12, self-inflicted and self-fixed) |
| code review | 8 | 2 (carry-forward §4, §4b) |
| implementation | 8 | 1 (CR-M7's four sites) |
| critique | 5 | 0 |
| deployment | 2 | 0 (Addendum A supersedes by event, not by correction, and says so) |

**The correction column is a health signal, not a defect count.** Every one of those corrections was
recorded *beside* what it corrected rather than over it, and several were volunteered by the erring
party. Plan rev 11's is the cleanest example: the row had **overstated a gap in the safe direction**,
and the planner fixed it anyway, because a control that exists and fires is a different fact from one
that does not.

---

## 7. The synthesis — why the disciplines held in one place and failed in another

The chain ran two kinds of writing, under the same sessions, the same rules and the same care, with
opposite outcomes.

**Structured rows held.** Twenty register rows, seven risk rows carrying a prediction record on
*every* pass, ten-plus booked assumptions each with a falsity signature and a named owner. Not one
was silently dropped. Both of QA-R2's contradictory executions are preserved. Where a row's real
state lived in another stage's document, both stages left the other's cells alone and said which
document was authoritative.

**Prose failed, repeatedly.** Every single instance in P1 lives in prose — a brief, a relay, a queue
entry, a changelog sentence, a commit message. **Not one occurred inside a register row or a risk
row's prediction record.** P2's instances are the mirror image: they *are* structured rows, and they
failed in a different way — not unverified, but overtaken.

That is a mechanical difference, not a difference in diligence, and it explains why writing the rule
down failed four times. A register row has ceremony: a predicted value, an observed value, an
authority column, a recorder. Filling one in *forces* the question "against what?" A sentence in a
brief has no such slot, so the check is optional, and under load an optional check is the one that
goes. The steering thread's hazard notes state the general law and it is the most useful thing either
chain has produced:

> **Defences degrade under load in the order they are cheapest to skip. Re-derivation is skipped last
> because it is visible; a completeness claim is skipped first, because nothing downstream
> contradicts it.**

The three defect classes and their remedies do not substitute for each other:

| Class | Where it lives | What catches it | What does **not** |
|---|---|---|---|
| **P1** unverified assertion | prose | The receiving party re-deriving at the artifact (K3 — 9 for 9) | The asserting party re-reading; writing the rule down |
| **P2** overtaken specification | structured rows | A predicate sweep of the whole register when a premise moves (K4) | Re-derivation — each row was accurate at its own tree |
| **P3** wrong-audience record | owner-facing files | An authoring form: action, pass condition, what to look for | Transcription with the stage columns removed |

**And the one instrument that has never lied here is a second instrument that could have contradicted
the first.** Every instrument defect this chain found was caught that way; none was caught by
re-running the first, which reproduces stably and therefore reads as confirmation. CR-M7 is the worked
example — the reviewer's hypothesis about *why* the figure was wrong was itself refuted and recorded,
leaving "the reported 0 is unreproducible" as the finding, which is stronger than a diagnosis.

---

## 8. Value delivery and cost

**Delivered.** The `valid` field is live in production — the owner's words, registered as D29:
*"valid is live. It's been live since 012 deployed to prod."* The backfill classified 4825 of 4825
rows (4750 valid / 75 invalid across seven refusal reasons, `evaluationFailures` **0**). Both
Statbot-facing v1 endpoints expose it at top level. The recompute hook is attached at the single
enumerated writer of message `data`. Statbot chain 023 is released from its D12 hold.

**Delivered beyond the ask, and the growth was ratified as a whole rather than accreted.** The
original handoff asked for a field. The chain also shipped a composer send-gate fix (M2) and a
one-line flag-clear (D11) — because QA's Phase 1 found that the recovery route the plan *and the
handoff* both promised **did not exist in the code**. The scope grew across revs 5–7 by separate
owner rulings, and the planner then reported that he had approved each ruling individually but had
**never seen the assembled delta**. It was put once, as a whole, and ratified (**D15**). That is the
correct handling of accreted scope and it was raised by the critic as a clerical item, not by the
stage that benefited.

**Cost.** ~20 hours of working time across three calendar days, plus a ~46.5-hour owner hold that
paid for itself (K10). Seven code-review rounds and two rejections, each with a cause and the last two
each finding something. 49 plan revisions with a ~16% correction rate. Ten register rows executed by
the owner personally, three of which required a rewritten queue entry before he could act on them.

**What was accepted, not closed** — restated here only as pointers, since the authority is deployment
Addendum A and the register: plan Risk R7's per-embed limits remain a silent class **with no
instrument by construction**, and *a clean M6-b report is not evidence against it*; QA-R20's
whitespace class is empty for this corpus **and unguarded**; QA-R19's bound (a top-level component
neither type 1 nor V2-typed is silently dropped by the repair route) is recorded, not closed. All
three were accepted by the owner on the record.

---

## 9. Recommendations

Process only. Each names the evidence and who rules on it. **None of these is enacted by this
document**; agent definitions and shared skills are outside this stage's write set.

| # | Recommendation | Evidence | Ruled by |
|---|---|---|---|
| **R1** | **Hold prose to the standard a register row is held to.** Every number carries the command that produced it; every quote is the owner's actual words; every claim about another document's state names the read that established it. This is the one change that addresses P1's root cause rather than its instances. | 13 instances in P1, all in prose, none in a structured row. §7. | Owner / Agents domain |
| **R2** | **Encode "re-derive at the artifact" as the receiving party's duty, not the asserting party's virtue.** A brief that restates another document's state is checked by its recipient against that document before it is acted on. K3 has a 9-for-9 record; every alternative has a 0-for-4 record. | K3; P1's recurrence after three lodgements. | Agents domain |
| **R3** | **When a ruling or event moves a premise, sweep the register on a predicate — do not fix the instance.** State the predicate, check that the known instances fall inside it, reconcile the count, and record what was checked and cleared as well as what was changed. | QA rev 10 (K4); both P2 register instances were found by accident. | Agents domain |
| **R4** | **Give the owner-facing queue an authoring form**: the action, the pass condition, and what he is looking for — never a transcribed register cell, and never stage vocabulary he has not used himself. | P3: four instances in two turns, all raised by him. | Owner |
| **R5** | **Resolve the registration write-set / revision-pairing conflict, and state the pairing rule somewhere a guest stage reads.** Today the rule exists only in the changelog of the document it governs, and the plan shipped closed with its `Revision` field ten rows behind. | P4; `planner.md:31` covers the principle for the planner only. | Agents domain |
| **R6** | **Enforce the existing `Status-Detail` budget.** It is already written into `planner.md`; breaching it produced a false `FAILING` flag on a released plan and cost UAT a finding to explain. | P4; U-12; chain 013's independent finding. | Agents domain |
| **R7** | **A "route it to handoffs" instruction should name or create the destination.** Two D18-routed items exist nowhere outside closed documents. Five others survived only because devops pulled them into its own record on its own initiative. | P5, verified repo-wide. | Owner / Agents domain |
| **R8** | **The retrospective's later trigger and in-round lodgement must be encoded together.** §6.1 below shows the later trigger was right *on this chain*; it was safe only because findings were written into documents at the moment they occurred. A chain that holds process material in session context and is then closed loses it. | §6.1; plan rev 33's stated reason for lodging. | Owner / Agents domain |
| **R9** | **Give the code-reviewer's working note a home, or accept that it is invisible.** It carries three transferable findings, has no frontmatter, is outside the lifecycle contract by its author's own declaration, and was read here only because a brief pointed at it. | P6. | Agents domain |
| **R10** | **Keep K1, K2, K5, K6, K8 and K9 exactly as they are.** They are the reason this chain shipped a correct field through seven review rounds and a 46-hour hold with nothing silently dropped. | §K. | — |

### 6.1 The trigger reversal, measured

Filed as a decision question in the Agents inbox and answered here with this chain's numbers.

**Under the pre-existing text, this retrospective would have fired at UAT Complete — 2026-08-23,
12:43.** What it would have missed:

| Material | Total | Written after UAT Complete | Missed |
|---|---|---|---|
| Plan changelog rows | 49 | revs 30–49 | **20 of 49 (41%)** |
| Owner rulings (Decisions Register) | 29 | D19–D29 | **11 of 29 (38%)** |
| Steering error / observation records | 10 | revs 33, 40, 42, 44–48 | **8 of 10 (80%)** |
| UAT findings | 12 | U-4 … U-12 | **9 of 12 (75%)** |
| Register rows in a terminal state | 20 | UAT's own conditional approval recorded **6 terminal, 14 outstanding** at 12:43 | **14 of 20 (70%)** |

It would also have missed the entire owner hold and its resolution, the SCR-1 re-specification, both
P2 register instances, all four P3 instances, the release itself, and the live declaration. **It would
have judged value delivery on a conditional approval and spent its authority predicting the rest** —
the exact failure `retrospective.md:22` names as its own rationale.

**The counter-risk did not materialise here, and the reason is the recommendation.** The concern
raised against a later trigger is that sessions holding the evidence may be gone by the time it
fires. On this chain they largely were — and it cost nothing, because the evidence was **lodged in
documents at the moment it occurred**, explicitly for that reason (plan rev 33: *"this material would
otherwise die in a session's context"*). The two mechanisms are one mechanism. Encoding the later
trigger without the lodgement duty would move the retrospective past the evidence rather than past
the noise.

---

## 10. Status

| | |
|---|---|
| **Retrospective** | Complete |
| **Chain 012** | Closed 2026-08-25; all documents terminal and in `closed/` |
| **Documents edited by this stage** | This one only |
| **Documents closed by this stage** | None |
| **Findings routed** | None — every item above is either already filed in the Agents-domain inbox (cited, not restated) or is a recommendation for the owner to rule on |
