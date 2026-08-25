---
ID: 013
Origin: 013
UUID: 22d69e06
Status: Active
Status-Detail: >-
  Rev 2. Findings and evidence for chain 013, written 2026-08-25 while the chain was still open.
  Deliberately short: R45.9 is a finding of this document and a retrospective that answered it with
  an 80 KB frontmatter field would be arguing against itself. The record is the changelog and the
  numbered sections; this field says only where the document is.
Rev: 2
---

# Retrospective 013 — Components V2 support across the editing surfaces

**Plan Reference**: `agent-output/planning/013-components-v2-editing-surfaces.md`
**Date**: 2026-08-25
**Retrospective Facilitator**: retrospective (`retrospective-hooks-013`)

## Changelog

| Date | Rev | Author | Change |
|---|---|---|---|
| 2026-08-25 | 1 | retrospective (`retrospective-hooks-013`) | Created. Corpus declared. Findings derived from the nine 013 stage documents, 43 probe directories, the four cross-chain trackers, and the git history of `agent-output` and `website`. Steering's conduct is in scope by its own instruction and is treated as evidence. Nothing closed; no other stage's document edited. |
| 2026-08-25 | 2 | retrospective (`retrospective-hooks-013`) | **Three corrections, all this stage's own, and one addition.** (1) The count of post-release rulings was anchored to the wrong release act and is re-derived from commit times: **25 of 53, first row D29**, not 24 from D30 — a consequence of N-17, which established that `a151fb4` and not `4a7126b` was the first act. (2) **N-14 records two further reported locations** for the struck records, in the deployment documents, **labelled second-hand and unverified** because verification is re-derivation and D44 forbids it. (3) `P` count corrected to nineteen. **Two suggestions from a commissioned reader were declined and the reasons are recorded here rather than absorbed**: that this retrospective should carry a finding about the post-release production state — **declined, the owner has ruled that outside 013's records** — and that the retrospective's own gate may not be met — **declined, the gate is QA Complete plus UAT Complete with the release executed, all three hold, and D45's sequencing is steering's to call and was called.** No finding, verdict or routing changed. |

---

## Summary

### Corpus — what this retrospective can read, and what it cannot

**Read time**: 2026-08-25, roughly 20:45–21:15 UTC. Everything below is a snapshot. **The tree moved
under this read**: `uat` rev 48 was uncommitted when I first opened it and landed as `ea2da09` at
20:50:14; `bb0bf6c` (critique → `Resolved`, readiness → `Superseded`) landed at 20:51:29. Statements
about document state are true at the instant given and not after.

**Inside the corpus** — read directly at the file:

- The nine chain-013 stage documents: planning, critique, architecture findings, implementation,
  code review, QA (plus the two release-tip verification records), UAT, deployment readiness,
  deployment.
- All 43 directories under `verification/013/` and both instrument indexes.
- `OWNER-QUEUE.md`, `TODO.md`, `OPEN_QUESTIONS.md`, `INBOX.md`, `INDEX.md`, `agent-output/README.md`.
- The git history of `agent-output` and of `website` — commit SHAs, authors, and UTC timestamps,
  which is the only instrument in this chain that computes independently of any stage's account.
- `tools/check-repo.js`, run by this stage at write time.

**Outside the corpus — unverifiable by construction, which is not the same as absent or refuted:**

1. **The steering session's conversation.** Every owner ruling in the Decisions Register reaches this
   document as steering's quotation of it. The selection prompts, the options offered and declined,
   and the owner's unquoted words are not readable here. Where a register row records its own
   provenance defect, that record is the only instrument I have for it.
2. **The two D36 breaches.** `uat` states at its R45.3 that *"D36 is the ruling steering breached
   twice today"* and at R45.4 that the question arose *"as steering warned it would, from its own two
   breaches today"*. **The fact of two breaches is attested twice, in a stage document, on steering's
   own disclosure. The content of neither breach is anywhere in the corpus.** I record the attestation
   and make no claim about what was breached — and, under D36, do not go looking.
3. **The owner's own acts** — the SQL repair, the eight browser checks, the two commits he authored.
   These enter the record as quoted attestation with a timestamp, which `verification/013/README.md`
   rules is complete evidence. I have no second instrument for any of them and do not treat their
   absence as doubt.
4. **Defects corrected before a commit.** Several are recorded (R36.1.2, QA's P3.23 miscount, steering's
   BC-2/BC-3 prompt near-miss). Those are visible *because* they were disclosed. **I cannot enumerate
   the class of defects that were caught and not disclosed, and I state that rather than reporting a
   count I cannot take.**
5. **D44 compliance.** The ruling forbids citing, relying on, reasoning from or **re-deriving** the two
   struck records. A search for them is a re-derivation. **So the ruling's own terms forbid the audit
   that would establish whether it was fully executed.** See finding N-14 — I report only what I met
   while reading, and I do not reproduce it.
6. **Post-release events.** By the owner's ruling relayed 2026-08-25 — *"the records don't mention what
   happens after release. Release was self-contained and a snapshot at the time of release"* — anything
   after the 20:30:01 release act is outside chain 013's records. **This retrospective therefore makes
   no claim about what production currently serves**, opens no finding on it, and treats the release
   record as a snapshot correct as such.

**Not carried**: whether Discord accepts an empty component. **D36 dropped it from this chain
completely.** It presented itself repeatedly during 013 and is recorded here as *dropped* — not
tracked, not routed, not re-raised, and not handed to 012. This sentence records that it arose; it
does not carry the question. **012 is held whole and nothing here touches it.**

**Two struck record IDs** are not cited, relied on, reasoned from or re-derived anywhere in this
document (D44).

### This stage's own defects, disclosed in the round they happened

Two, both found before this document was committed, both of the classes it reports on. Recorded here
rather than in a later revision, on the standard `uat` R36.1.2 set: a retrospective that concealed a
near-miss in its own drafting would be arguing against its own findings.

1. **A dropped-row filtered stream gave me a timeline 19 minutes wrong at its origin.** Caught by
   contradiction against a counter-instrument, not by re-running. Full account at W-2, where it serves
   as first-hand corroboration of the chain's own rule.
2. **I counted "44 registration-only rows" over the wrong population** — a `grep -c` across the whole
   plan file rather than restricted to register rows, so it summed 14 register rows and 30 changelog
   rows into one figure and reported it as a property of the register. Caught by recomputing before
   committing, after writing finding N-4 about exactly this. **The corrected figures are 14 of 53
   register rows and 30 of 51 revisions.** The instance is worth more than the correction: **I wrote
   the finding, then committed the finding, in the same hour** — which is the strongest available
   evidence that P-4 and P-5 need a mechanism and not a warning.

### Objectives

**Value Statement** (plan §Value Statement, **APPROVED AS WRITTEN, D4, 2026-08-23 — not a word
amended across 51 revisions**):

> As a **guild owner editing a Components V2 message in hooks.gg**, I want **every editing surface
> around the composer … to carry my message's components and its V2 flag faithfully**, so that **no
> editing action silently discards what I built or misreports what kind of message it is, and I never
> land on an empty copy of a message that was whole a moment ago**.

**Value Delivered**: **YES, at the released tree, with one named limit that is the chain's own
finding and not this stage's.** The release was executed — `website` `master` `2d90e8a` →
`b56570d`, fast-forward, Mode A, 2026-08-25 20:30:01 UTC — against a live `uat` gate (rev 47,
`e7cdc6c`, **APPROVED FOR RELEASE — UNCONDITIONAL**), a QA verdict (`QA Complete`, `Verified-At:
b56570d`, suite 48 files / 627 tests / 627 passed, both `tsc` projects 0, build exit 0) and code
review's `Code Review Approved`. **All eight `PRE` release conditions reached `EXECUTED`** — none
withdrawn, none dropped, none recorded *satisfied incidentally* (uat R47.4, enumerated rather than
counted, and the enumeration is why I can restate it).

**The named limit, in `uat`'s words rather than mine**: the value statement's content is that the
user is not *silently* misled, and *"its failure mode leaves no trace in a test run… every green test
in this chain is compatible with it"*. Four `POST` rows — **BC-12, BC-14, BC-17, BC-20** — remain
`NOT EXECUTED`. **They gate chain closure, never the release act.** The chain is **not closed** and
closing it is devops'.

**Implementation Duration**: **45 h 10 m** — first plan commit `d0b5835` 2026-08-23 23:33 to the
release-status write `a261dba` 2026-08-25 20:43. Computed from `git log` written to a file and read
back, not from a filtered stream (see W-2).

**Overall Assessment**: **A chain that delivered its objective and that caught, at some stage, nearly
every defect it produced — but almost never at the stage that produced it.** The serial pipeline
worked as a *net*. **`uat` recorded three separate times that a defect in its own gate text was caught
by an outside read rather than by its method** — *"luck in the timing, not diligence in the method"*;
*"twice is a pattern about where the checking is actually happening, not a run of luck"*; *"three
revisions, three catches, and not one of them by memory or care."* **QA and code review each recorded
the same class about their own artifacts**, and a fourth instance was caught by devops. **That claim
is the most important thing in this record and it survives testing (finding N-1).** The chain's compensating strength is
genuinely strong: an instrument corpus of 43 probes, of which **15 refuted the hypothesis that
prompted them**, and a norm — *contradiction against a second instrument, never re-running the
first* — that this stage confirmed first-hand by tripping over it during this very retrospective.

---

## Timeline

**There is no `Planned Duration` column in this table and its absence is a finding, not an
omission.** No estimate exists to measure against: `agent-output/roadmap/` has never held a document
(N-9), the plan carries no phase durations, and no stage recorded one. **Variance against plan is
unmeasurable for chain 013 by construction.** What follows is measured against the clock instead.

Counts are commit counts against each document in `agent-output`, derived by writing `git log` to a
file and reading it (W-2). Spans are UTC.

| Phase / document | Commits | First | Last | Elapsed |
|---|---|---|---|---|
| Planning | 52 | 08-23 23:33 | 08-25 20:43 | 45 h 10 m (spans the whole chain) |
| Critique | 6 | 08-24 00:04 | 08-25 20:51 | 5 gating passes inside 08-24 00:04–01:46 |
| Architecture | 2 | 08-24 01:29 | 08-24 01:35 | 6 m — and never revisited (N-7) |
| Implementation | 49 | 08-24 02:24 | 08-25 17:25 | 39 h 01 m |
| Code review | 41 | 08-24 02:46 | 08-25 17:41 | 38 h 55 m, **25 rounds** |
| QA | 39 | 08-24 02:09 | 08-25 20:11 | 42 h 02 m, **13 verdict events** |
| UAT | 51 | 08-24 12:00 | 08-25 20:54 | 32 h 54 m, **49 revisions** |
| Deployment readiness | 10 | 08-24 15:33 | 08-25 20:51 | — |
| Deployment | 8 | 08-25 03:58 | 08-25 20:34 | **three ref moves carrying 013 work** |
| **Retrospective** | this document | 08-25 ~20:45 | — | precondition met at uat rev 47 |

**013 work reached `master` on at least three separate occasions, and the first was outside the gate.**
`master` moved from the base `c85945f` to the final `b56570d` across **36 commits** (`git rev-list
--count`, linear). The three occasions the record names:

| # | Ref | Reached `master` | Gate state at the time |
|---|---|---|---|
| 1 | `a151fb4` | **2026-08-25 00:56:37**, pushed by the owner | **outside the gate** — `uat` rev 10's twelve-row conditional approval was live and undischarged (N-17) |
| 2 | `4a7126b` | **04:14:02**, devops-executed, plan rev 23 | inside the Stage 2 gate — *"the first release act in this chain to run inside"* it |
| 3 | `b56570d` | **20:30:01**, devops-executed, devops §16 (`c19235e`) | inside a live `uat` rev 47 gate |

Between #2 and #3, four further commits reached `master` — the D30–D34 post-release fix round — **none
carrying a release-tip verdict**, which QA records at `release-b56570d` §6: *"`2d90e8a`, the commit
actually serving, is ungated. **Merging `b56570d` replaces an ungated serving tip with a verified
one.** That is a reason the release is safe to make; it is **not** a reason to hurry it."*

**Phases did not run in sequence — they ran concurrently for most of the chain.** Implementation,
code review and QA all opened within 37 minutes of each other on 08-24 and all three were still
committing on 08-25 evening. That is the D22/D26/D27 topology working as ruled, and it is why a
phase-variance table would be misleading even if estimates existed.

**The 73 seconds that cost a full re-issue round.** `uat` rev 44 committed at **19:30:20**
(`ff0c82c`), anchored at CRITERIA plan rev 49. Steering's D53 registration pass committed at
**19:31:33** (`eb0e291`), taking the plan to rev 50. Both timestamps derived from `git show -s`.
See N-2.

---

## What Went Well — process, with the evidence

### W-1 · The instrument corpus paid for itself, and the payoff has a measurable shape

**43 probe directories under `verification/013/`** (counted by `ls -d | wc -l`), against 16 for chain
012 — a 2.7× increase with no retrospective between them to ask for it.

**15 of the 43 had refutation as their primary result, and 28 of 43 carried at least one refutation,
retraction or correction.** The shape of the payoff is the finding: **most refutations were of a
document, not of the code.** Nine of the fifteen contradicted a plan clause, a handoff, a register
marking, a finding's magnitude or a prior review round — not the product. Representative:

- `probe-cr1` refuted plan M1-d's clause that producer and consumer *"compute the same function"*.
- `probe-cr27` refuted **code review's own CR24-2** in QA's favour: *"QA is right; code review round 24
  was wrong on reachability."* Its mechanism note is the transferable part: *"I checked the guard on
  one argument and generalised to both. The predicate answered a narrower question than the claim it
  was supporting."*
- `probe-qa-p3-delimiter-class-sweep` refuted a peer's scoping: *"The class has three members, not
  one."*
- `probe-qa-paste-surface-render` **withdrew QA's own earlier conclusion by execution**: *"'throws at
  hook 2' was treated as 'unreachable'."*
- Two **negative results were recorded as findings in their own right** — `probe-cr7`'s 42 raw-socket
  cases with 0 bypasses (*"A negative result, and worth having"*) and `probe-cr16`'s auth attack.

**Seven probes were instruments pointed at instruments** — `cr22`, `cr23`, `cr24`, `cr27`, `cr28`,
`probe-qa-p3-render-instrument-reduction`, `probe-qa-p3-stale-prediction-differential`. This is a
practice worth naming as a standing capability, not a one-off: **the chain treated "is this test
capable of failing?" as a first-class question with its own executable answer.**

### W-2 · "Contradiction against a second instrument, never re-running the first" — and this stage tripped over it live

QA states the rule and its basis (qa §V.20): *"**All six were caught by contradiction against a second
instrument, never by re-running the first** — each reproduces stably, so repetition reads as
confirmation. That is the transferable finding and it is the one the retrospective should carry."*

**Carried, and corroborated first-hand.** Writing this retrospective's timeline I ran
`git log … -- planning/…md | tail -3` and got the plan's three oldest commits as revs 5, 4, 3.
Re-running it would have reproduced that. Writing the same command's output to a file and reading the
file returned revs 4, 3, 2 **and 1** — `d0b5835`, 2026-08-23 23:33, the chain's actual first commit.
**The filtered stream dropped two trailing rows and my first timeline was 19 minutes wrong at its
origin.** It was caught by a contradicting counter-instrument, exactly as QA's rule says, and by
nothing else. Every duration in this document is derived from a file, not a pipe.

That the retrospective stage independently reproduced the chain's own instrument hazard, on its first
attempt, is the strongest available evidence that the rule is real and that it generalises past the
sessions that wrote it.

### W-3 · Non-vacuity treated as a property to be proved, not assumed

QA measured a **shipped** spec vacuous for its own subject (F-QA23): *"Mutants R1/R4 break the
user-visible behaviour entirely and leave it 9/9 green."* It refused to hand the tree on: *"a UAT pass
over a suite measured vacuous for its own subject would inherit the vacuity."* F-QA21's mutant Q1
**survived the pre-fix spec 15/15 green** — *"a test that has never been seen to fail is not evidence
that the thing it guards is guarded."*

The most instructive one is **F-QA19's mutant N1**, which survived QA's own first draft: *"This is the
single most load-bearing assertion in the file and it was vacuous until it was mutated."* **A stage
mutating its own new instrument before trusting it is the practice; it caught a defect in the same
pass that created it.**

### W-4 · Expire-and-re-issue held twice under pressure, at a cost both stages paid rather than renegotiated

The criteria axis moved under a published verdict **twice in one hour**. Both stages ruled against
their own convenience:

- `uat` R45.1: *"I ran the check. It reads FALSE. The gate expired at `eb0e291`."* … *"**This is the
  second arrival of the same cost, and the first one where the expiring change is trivial** — which is
  precisely when a carve-out ('registration-only deltas don't count') is most attractive and most
  corrosive. **The rule is not amended. A rule renegotiated the second time it is inconvenient was
  never a rule.**"*
- QA §V.34: *"**The clause bites, and I will not argue my way out of a clause I wrote.**"*

QA's re-anchor was executed **with controls** — `verification/013/probe-qa-criteria-rev49-rev50/`
carries controls that fire on rev 47→48 and rev 48→49, so its "no criterion moved" answer is
demonstrably not the only answer the instrument can give. **A stage building a falsifier for its own
convenient conclusion is the behaviour to keep.**

### W-5 · Cross-stage catching worked in every direction, not only downstream

This is the counterweight to N-1 and it is real:

| Catcher | Caught | What |
|---|---|---|
| devops | QA | **F-9** — `Verified-At-Note` read *"every commit since live master is test-only"*, **false** for the release delta (4 production files). QA: *"Inheriting the claim would have skipped the one commit most relevant to every outstanding row."* |
| QA | code review | round 23's MEDIUM-1 named one site; **the class has three** |
| QA | devops | F-1's magnitude: **4 of 13, not 4 of 8** — *"Run the file; do not count its source."* |
| QA | uat | rev 18's eight `PREDICTION STALE` rows derived from commit **file lists**; four whole sections byte-identical, and the commit that did move a row was not cited |
| code review | itself, in QA's favour | `probe-cr27` refuting CR24-2 |
| uat | QA | **BC-7** — refused the relay's framing and verified at QA's document, *"and would have blocked a row QA had already fixed"* |
| uat | steering | three factual defects in register rows in one night, none caught by steering |
| code review | three stages at once | the probe-copy divergence — *"`grep -c "D13"`: shipped 0, probe 5"* |

**Nine catches across seven directed pairs.** The serial pipeline is doing real work; N-1 is about
*where* in that pipeline the work is happening, not whether it happens.

### W-6 · Rules that fired as designed, without anyone having to remember them

- **R11's disposition rule.** M9-d's gate surfaced errors outside 013's files; the implementer *"judged
  the ESLint remainder not type-only under D50's definition, stopped and reported"*, and the owner
  ruled D51. The plan's own prediction record says it: *"a member appeared and the rule fired as
  written."* **A pre-written stop condition beat a judgement call under time pressure.**
- **Enumeration over counting.** uat R47.4 enumerated all eight `PRE` rows *"because 'eleven of twelve'
  is this register's own worst measurement error and a count is what travels when nobody looks."* The
  lesson from N-4 was applied inside the same chain, four revisions later, by the stage that learned it.
- **Owner attestation ruled sufficient without a capture path** (`verification/013/README.md`), which
  kept eight browser checks from becoming an evidence-manufacturing exercise.

### W-7 · Disclosure discipline was near-total, and it is the reason this retrospective can be written at all

Almost every defect in this record was disclosed by the party that made it, in the round it happened,
in the document that party was writing at the time — including defects that made the discloser look
bad and that nothing would have surfaced. `uat` records ~12 corrections of its own prior text across
49 revisions; steering registered its own errors as register rows (D40/D41 corrections, D43's
correction *"within the hour"*, D44's reconcile note); QA withdrew F-QA26 by its own execution and
corrected its own miscounts before committing them; code review's `probe-cr24` refuted its own
round-22 reasoning.

**This is the single most valuable process asset the chain has, and it should be stated as such
rather than assumed to be free.** N-1's finding — that checking happens downstream of where it should
— is only *knowable* because the parties involved wrote it down.

---

## What Didn't Go Well — process, with the evidence

### N-1 · **The checking is systematically happening one step downstream of where the process says it is** — TESTED, and it holds

This is the claim steering asked be tested rather than repeated. **It survives testing, in a sharper
form than either stage stated it.**

Two stages recorded it independently and unprompted:

- `uat` **R36.1.2**: the release gate's own draft asserted a negative about a plan delta *without
  running the diff*. *"It was caught **because steering sent an unsolicited warning before this
  document was committed** — **luck in the timing, not diligence in the method.**"*
- `uat` **R45.3's correction note**: a certification sentence asserted the opposite of the ruling it
  certified. *"Found by `steering-hooks-013-3`, reading this document at the file, not by this
  register… it is the **second time today** that steering's read caught a defect in this gate's own
  text before it hardened, and **twice is a pattern about where the checking is actually happening,
  not a run of luck.**"*
- `uat` **R38.2** makes it three: *"**Three revisions, three catches, and not one of them by memory or
  care.**"*

**The pattern is not confined to `uat`, which is what makes it a process finding rather than a stage's
bad night.** Same shape, five more times:

| The stage's own method | What it missed | Who caught it |
|---|---|---|
| QA's register-cell authoring | BC-6's failure-mode cell over-reaching its own condition cell — *"a defect in the row as I authored it"* | QA, but only when a *different* finding (F-QA32) forced a re-read |
| QA's covering prose | BC-7's limb described as having *"nothing to show it"* where its own L647 named the instrument | `uat`, by verifying at QA's document |
| QA's `Verified-At-Note` | *"every commit since live master is test-only"* — false for the release delta | **devops** |
| every safeguard in `verification/013/probe-qa-verify-rider2/` | the probe copy ran **ahead** of the shipped file; two review findings fixed in the copy only | `code-reviewer-013-4`, **by measuring the tree** |
| the audit of the `PRE` ledger | the errors that produce **missing** members | `uat` R31/QA §V.29 — *"auditing the set you were handed finds only the errors that produce false members; the errors that produce missing members are invisible to that audit, and those are the ones that leave rows certified safe"* |

**The generalisation the evidence actually supports** — sharper than "stages miss their own defects":

> **A stage's method is built to verify the artifact it is producing, and is structurally blind to the
> prose that vouches for that artifact.** `uat` names the mechanism exactly: *"this register read the
> **block** it was certifying and did not read the **sentence** doing the certifying. Certification
> prose is not covered by verifying the thing certified."* QA reaches the same place from the other
> side: *"the disciplines hold in register rows and fail in prose"* (D42's class, of which this record
> holds **at least six members** across four stages).

**And the second-order finding, which is the one worth acting on:** every one of these was caught by
someone reading the artifact **for a different purpose** — steering surveying documents, devops
assembling a release, a reviewer measuring a tree, a peer stage weighing a relay. **None was caught by
a review step the process schedules.** The pipeline has no stage whose job is to read a completed
stage document against its own claims. It has been getting that service for free, from readers who
happened to be passing, and the two stages that noticed said so in the same words.

**Cost to date: zero shipped defects, and it should not be read as vindication.** `uat` states the
correct reading: *"That the system worked at the last step is not evidence the earlier steps are
sound — it is the reason the last step exists."*

### N-2 · The coordinator seat has no reviewer over it, and it holds the most uncaught defects

Steering asked that its conduct be read as evidence. Read as evidence, **the seat — not the session —
is the finding.** Six instances in roughly thirty hours, of which **five were caught by someone else
and one by steering itself**:

| # | Defect | Caught by | Where recorded |
|---|---|---|---|
| 1 | **The criteria axis moved 73 seconds after a gate committed.** `ff0c82c` 19:30:20 → `eb0e291` 19:31:33 (both from `git show -s`). Expired `uat`'s gate and QA's verdict; both re-issued | steering itself, disclosed to the gate | uat R45.1; plan rev 50/51 |
| 2 | **A stage's prose relayed as a finding where its own document said otherwise** — BC-7. *"A ruling made on the summary would have blocked a row that QA had already fixed, and would have been defensible on every word it was given"* | `uat`, by verifying at QA's document | uat R31.3, R32.3 |
| 3 | **A count carried past the event that invalidated it, then inherited downstream as a measurement** — *"eleven of twelve executable"* | `uat` refusing to reconcile eleven against twelve by assumption | qa §V.25/§V.26 |
| 4 | **Three factual defects in register rows in one night** — D40 (`git diff --numstat`'s leading `0` read as a deletion count), D41 (a paraphrase substituted for the owner's words), D44 (a decision stated as an undated standing property of the record) | **`uat-hooks-013-4`, all three; steering caught none** | plan revs 35, 41 — *"the third factual defect in a register row in one night, and the third caught downstream"* |
| 5 | **A contradiction asserted from a vocabulary that had not been checked** — `Status: Active` read as contradicting a `UAT Complete` verdict. Disclosed to this stage by steering after briefing it | `uat` R48.5 | uat rev 48 |
| 6 | **D36 breached twice in one day while the ruling stood in steering's own working notes** | attested by `uat` R45.3/R45.4 on steering's disclosure | see Corpus §2 — **content outside the corpus** |

**Two corrections to the coordinator's own account of itself**, made because a retrospective that
accepted a self-accusation without checking it would be committing N-1's error:

- **On #2, "twice" is not established by the corpus as two steering relays.** The record attests **one**
  instance where steering passed a stage's prose about its own artifact as a finding (BC-7) and a
  second, distinct instance where a claim steering relayed — that assumption 7's falsifier was armed —
  was **steering's own prose**, corrected by steering within the hour (plan rev 38) after `uat` had
  already marked a finding REALISED on it and had to withdraw (uat R21.4). There is a **third**
  member of the class in which steering is not the relay at all: `uat` R14.3 found QA's prose saying
  `4a7126b` was released while **QA's own register row in the same document** said it was not —
  *"QA's row is right and its prose is wrong, **and it is the prose that travels in relays**."* **The
  class is real and has at least three members; the attribution of all of them to the coordinator is
  not.** This matters because the fix differs: two of the three are *authors overstating their own
  artifacts*, which no amount of coordinator discipline reaches.
- **On the pattern as a whole**: five of six were caught, every one by a stage document, and steering
  disclosed rather than absorbed in each case — including #1, where it *"brought the fact to the gate
  rather than letting the gate find it, and declined to rule on its own act"* (uat R45.1, crediting
  it). **Disclosure is the mitigation that is working. It is not review, and it cannot become review,
  because the discloser chooses what to disclose** (Corpus §4).

**The structural fact underneath all six**: steering authored **33 of the plan's 51 revisions** (65%,
counted by `grep -o` on the changelog's author column) and **53 Decisions Register rows**, of which
**14 are marked `REGISTRATION ONLY`** while **30 of the 51 revisions declare a "registration write set
only" clause**. It is the highest-volume writing seat in the chain and the only one with no stage
downstream of it.

### N-3 · The gate design penalises the behaviour the chain most wants — QA's words, and it is a design defect, not a discipline failure

QA states it at §V.13: *"**it names a real cost the dual anchor creates: a stage that raises a finding
against the criteria will, if the finding is accepted, expire its own verdict.** Left there, the
anchor quietly penalises the behaviour this chain most wants."*

**Both criteria moves in one hour were a stage's own accepted finding being registered** — the
reviewer's, then QA's (qa §V.13). The instance at 19:31 was steering's registration pass, but the
*class* is not steering's: **any write to the plan expires every verdict anchored to it, and the plan
is where accepted findings must be registered.**

`uat` R47.7 completes the picture by finding the same conflict **inside a stage definition**:

> *"This stage's definition says: 'When UAT passes, update the plan's Status field to UAT Approved'…
> Enacted literally, **that instruction expires this gate at the moment it issues it.** The plan file
> **is** this gate's criteria axis… **This is a real bootstrap conflict in the definition, not a
> pretext for skipping the step.**"*
>
> **The generalisation, verbatim, as `uat` asked it be stated beyond its instance:** *"**a stage
> instruction that writes to the document a stage's own verdict is anchored to will expire that
> verdict every time it is obeyed.**"*

**It bit twice in one evening** — plan rev 48→49 (uat rev 38: *"the gate expired by its own clause, on
the axis nobody was watching, while the axis everybody was watching stood still"*) and plan rev 49→50
(uat rev 45; QA §V.34). **R47.7 is the third, prospective instance, and the only one where the
instruction to write is the stage's own definition.**

**This is the most actionable finding in the record**, because it is fixable in the definitions rather
than in anyone's care: the criteria anchor could name the plan's *criteria-bearing sections* rather
than the file, or registration-only writes could land somewhere the anchor does not cover. **Neither
is this stage's to decide** — recorded with its evidence, routed to `pi`.

### N-4 · Counts travel; the thing they count does not tell them it changed

The chain produced **at least seven** count defects, and they share one mechanism:

| Count | Truth | Mechanism |
|---|---|---|
| *"eleven of twelve executable"* | eight by execution, remainder by construction | `uat`'s rev-31 figure, **true when written**, falsified by QA's own later act, carried by steering, inherited by QA. *"**A count is invalidated by the thing it counts changing, and nobody re-checks a count when their own work is what changed it.**"* |
| D44's *"23 affected lines"* in `uat` | **30** | steering's scan predated two of `uat`'s revisions — *"a count taken at one instant travelled as a property of a live document"* |
| devops F-1's *"4 of 8"* | **4 of 13** | the counter was sound; the **predicate** was wrong — an `it.each` with five rows is invisible to a `grep` for `it(`. *"Run the file; do not count its source."* |
| plan + critique red-test domain, 4 or 6 | **7** | F-QA6, *"third recurrence of the L-7/M-10 shape in one chain"* |
| QA's *"21 … 19 of those"* | **26 and 23** | *"I had counted rows by eye off a printed listing rather than computing the partition"* — self-caught pre-commit |
| QA's first non-test count, **13** | **10** | a pathspec exclude that did not match |
| my own first timeline origin | 19 minutes early | filtered stream dropped two rows (W-2) |

**Two distinct classes, and conflating them costs the fix**: (a) a count computed by the wrong
predicate — cured by computing before the filter and by running rather than reading; (b) **a count
that was right and then died quietly** — cured only by *never restating a count without recomputing
it*, because nothing announces its death. `uat` R47.4's enumerate-don't-count is the practical form
and it was adopted inside the chain.

### N-5 · A record kept on a declarative surface — measured, and the growth after the finding is the finding

`uat`'s **R45.9** (routed here) states it: *"`Status-Detail` is **69,578 characters**… **this one cannot
be read to decide anything.** It has become a rev stack — a **record** kept on a **declarative**
surface, which the skill names as exactly the mixture that does not work."*

**Measured by this stage at 20:57 UTC, at uat rev 49** (`sed` over the frontmatter, `wc -c`):

| Document | `Status-Detail` | Whole file | Share |
|---|---|---|---|
| **uat** | **798 lines / 84,580 B**, 40 `Rev N` markers | 725 KB | **11.6 %** |
| deployment | 96 lines / 9,660 B | 129 KB | 7.5 % |
| qa | 40 lines / 3,792 B (plus a separate 29-line `Verified-At-Detail`, three anchors stale) | 379 KB | 1.0 % |
| planning | 11 lines / 893 B | 280 KB | 0.3 % |
| implementation | 10 lines / 909 B | 500 KB | 0.2 % |
| code-review | 9 lines / 875 B | 567 KB | 0.2 % |

**Three things the measurement adds to R45.9:**

1. **It is not chain-wide.** Four of six stages keep the field under 1 KB on documents of 280–567 KB.
   **It is a stage-local convention — two stages append where four replace** — so the remedy is a
   definition change for those stages, not a general exhortation.
2. **The obvious cause is wrong, and I checked it.** Session churn does not explain it: `uat` ran 6
   sessions and QA ran 4, and QA's field is 4.5 % the size of `uat`'s. **Churn is not the driver;
   convention is.**
3. **The field grew 15,002 bytes — 21.6 % — across the four revisions *after* the defect was
   identified** (69,578 chars at rev 45 → 84,580 B at rev 49). Not through negligence: R45.9 correctly
   declined to run a rule-bound trim while a gate was live, and **the only mechanism available for
   recording that decision was to append to the field.** **A defect whose remedy is blocked by the
   same rules that govern it will grow while it is being documented**, and that is the durable form of
   this finding.

### N-6 · ID discipline failed four times, and once inside the warning against it

- **BC-13 and BC-14 each named two distinct rows**, because QA's Phase 2 appended to a register that
  already ran to BC-14. Resolved by renumbering to BC-17.
- **QA's Phase-3 IDs collided with closed rows** and were renumbered (plan rev 46).
- **`F-QA33` was minted twice in the same document** — `disclosure-pointer-dangles`, then the un-gated
  `Continue` finding — and QA's own warning three sections earlier reads: *"**This is the BC-13/BC-14
  defect, committed by me, in the same document whose register carries the ID-collision note warning
  against it.** I numbered from the last finding I could see rather than from the document's true
  high-water mark… **no disambiguator would have caught it.**"* The second collision is not
  acknowledged in the document.
- **`F-QA20` was never issued** — a hole in the ID space.
- **The code-review document carries `ID: 11` and `Origin: 11`** against `UUID: 22d69e06` (013's).
  Verified at the file. The UUID inherited correctly; the ID did not. **It survived 25 review rounds
  and 41 commits.**

**One mechanism explains all of them**: an ID space written by more than one stage, where each writer
numbers from the highest ID *it can see* rather than from the register's true high-water mark. **A
warning in prose did not prevent the very next instance, in the document that carried the warning** —
which is D42's class again, and the cheapest possible demonstration that this class needs a mechanism
rather than a reminder.

### N-7 · The mechanical gate exists, is run by four stages, and is owned by nobody

`node tools/check-repo.js` was run at least six times during the chain. Its failure count over time,
from the documents: **9** (code review round 1) → **14** (uat) → **16** (uat) → **26** (devops, and
**26** when I re-ran it at write time, exit 1).

Every stage recorded it and every stage classified it the same way — devops §16: *"`tools/check-repo.js`
**FAIL, 26 problems — non-blocking, recorded**"*.

**Inside those 26 sits one defect that is unambiguously 013's and unambiguously a lifecycle
violation** — the code-review document's `ID: 11` (N-6). **devops named it explicitly**, in the same
sentence as the vendored-`node_modules` basename collisions, and it is still there.

**The finding is not that people ignored a gate. It is that the gate's signal-to-noise degraded as the
corpus grew, and its readers correctly learned to dismiss it.** Most of the 26 are `verification/013/`
probe artifacts sharing sensible filenames (`run-green.txt` × 7) and pre-existing 012 link failures.
**A gate whose false-positive rate grows with the work trains its readers to dismiss its true
positives, and it did.** No stage owns clearing it, and none of the stage definitions names it.

### N-8 · Chain-level record surfaces were never maintained, and nothing in the pipeline owns them

- **`INDEX.md` contains zero occurrences of "013"** (`grep -c`, which computes inside grep). It reads
  *"82 documents · 12 numbered chains"* and was last regenerated at **`e2454ae`, 2026-08-23 11:19 —
  12 hours before chain 013's first commit.** It was regenerated **three times on 08-23 during chain
  012** and **not once during 013**. `build-index` is mentioned **0 times** in any 013 document.
  **The habit existed one chain earlier and was silently dropped.** (`OPEN_QUESTIONS.md:13-19` records
  that `--check` can never pass on the committed form — a known blocker, still open, and a reason the
  regeneration needs an owner rather than a reminder.)
- **`architecture/system-architecture.md`** was last committed **2026-08-24 01:56** and its Roadmap
  Readiness still reads *"plan 013 … **is open and in critique**"* against a plan that is `Released`.
  The 013 architecture findings document itself records the debt: *"`system-architecture.md`
  reconciliation is owed **after** implementation, not now."* **Implementation completed 19 hours
  before the release and the reconciliation has not run.** The architecture document is `Status:
  Active` with **2 commits, six minutes apart, on 08-24**, and the architect never re-engaged.
- **`OWNER-QUEUE.md`** at 20:53 UTC still read *"`origin/master` = `2d90e8a`… **unpushed — nothing has
  been released**"*, 23 minutes after the release. It is steering's file; reported, not edited.

### N-9 · There is no roadmap, there has never been one, and the roadmap stage has never run

Established with four independent instruments (`find`, `ls -a`, `git ls-files`, and
`git log --all --diff-filter=A -- roadmap/`): **`agent-output/roadmap/` has only ever contained
`.gitkeep`**, added by the commit that created the directory structure.

`agent-output/README.md` places `roadmap` as the **first stage of the pipeline** and describes
`roadmap/` as holding *"the Master Product Objective, priority-ordered epics, and the release
tracker."* The plan's own header records the absence honestly (*"roadmap absent … read 2026-08-23;
the effort is owner-directed through handoff `8f3fa8c3`"*).

**Consequence for this retrospective, stated rather than worked around**: my definition requires me to
measure delivery against objectives. **There is no objective document to measure against**, so
"value delivered" is measured against the plan's own Value Statement and nothing above it, and the
Timeline table has no `Planned` column. **Cost/benefit against a portfolio cannot be assessed for
chain 013 by anyone, at any time.**

### N-10 · The retrospective loop has never closed — twelve chains, zero retrospectives, zero `pi` runs

`retrospectives/` and `process-improvement/` contain **only `.gitkeep`**, and the **only commit in the
repository's history touching either directory is `13b3866`**, which created them
(`git log -- retrospectives/ process-improvement/` → 1 commit). `git ls-files` confirms.

**Twelve numbered chains have run here. This is the first retrospective.** `agent-output/README.md`
states the trigger — *"hangs off UAT, not off release. It needs QA and UAT complete and nothing
more"* — **a trigger that has now been met twelve times without firing.**

**This subsumes several findings above.** Every lesson chain 013 recorded — D42's prose-versus-artifact
class, the second-instrument rule, expire-and-re-issue, enumerate-don't-count, non-vacuity by mutation
— **was learned inside the chain, at chain cost, with no prior corpus to inherit from.** The
instrument corpus tripled between 012 and 013 (W-1) with no mechanism carrying that improvement; it
was reinvented. **The highest-leverage process change available to this repository is not any single
item below — it is that this document, and the `pi` pass after it, actually happen and keep
happening.**

### N-11 · Scope kept growing after the chain first shipped

- **Three occasions on which 013 work reached `master`**, spanning 19 h 33 m (see Timeline), of which
  the first ran outside the gate entirely (N-17).
- **25 of 53 Decisions Register rows (47 %) were registered after the first release act.** `a151fb4`
  reached `master` at 00:56:37; plan rev 22 (**D29**) committed at 03:39 is the first row after it, and
  D53 the last. (Re-derived from commit times after N-17 corrected which act was first — the earlier
  draft of this line anchored to `4a7126b` and read 24 of 53.)
- **Two milestones were added after the first release**: **M9** (Rider 2, D47, plan rev 44) and **M10**
  (D52, plan rev 49).
- **A review debt was created after the fact**: D35 waived review for the D30–D34 post-release round;
  D39 then ruled that the same shipped round *"owes both `code-reviewer` and `qa`"*, explicitly *"not
  retrospectively wrong"* about D35. Discharged only when D45 released the pipeline to run.

**None of this was uncontrolled** — each step was an owner ruling, registered, with its reach bounded.
**The process observation is that the chain had no defined end**, and the mechanism that eventually
gave it one was a ruling (D45: *"the pipeline is released to run and the retrospective is sequenced
last"*), not a criterion. **A plan whose scope is extended by ruling has no completion predicate, and
the four `POST` rows now holding it open are the residue of that.**

### N-12 · The four rows that hold the chain open are tracked in no surface anyone reads

**BC-12, BC-14, BC-17 and BC-20** appear **only** inside the chain documents (uat, qa, planning, the
two deployment records). Counted with `grep -c`:

| Surface | `BC-` rows | The four |
|---|---|---|
| `OWNER-QUEUE.md` | 8 (all `PRE`, all now discharged) | **none** |
| `TODO.md` | 1 (BC-4) | **none** |
| `OPEN_QUESTIONS.md` / `INBOX.md` / `INDEX.md` | 0 | **none** |

They are **decidable now** (devops: *"BC-12, BC-14 and BC-20 are decidable NOW"*), owner-observable,
and gate chain closure — and they live only inside a 725 KB register. **`OWNER-QUEUE.md`'s own rule
that a done item is deleted works correctly for items that close; it has no counterpart that carries a
*live* item out of a stage document into a surface someone reads.**

### N-13 · An instrument corpus that can outrun the tree it measures

Recorded in `TODO.md` as a proposal deliberately not enacted, and it is the sharpest single incident
in the chain:

> QA's independent oracle was adopted into `website/src/utils/__tests__/` **and a copy remained** under
> `verification/013/probe-qa-verify-rider2/`. Two review findings were then corrected **in the copy
> only**. **Three stages — QA, `uat`, and steering — reported or relied on a fix that had not
> shipped**; `code-reviewer-013-4` caught it by measuring the tree (`grep -c "D13"`: shipped **0**,
> probe **5**). *"No behaviour was affected… **the whole cost was to the record.**"*

**Why every safeguard missed it**, which is the part to keep: *"**every instrument in that directory
hashes or compares the copy against itself.** None asserts anything about the shipped file, so all of
them are tuned to detect a copy falling **behind**."* And `uat`'s formulation, which QA says it could
not have written: ***"a copy that lags looks wrong on inspection; a copy that leads looks like
progress."***

**Related, and unresolved**: `rider2-gate-baseline/` is **the one probe of 43 with no README** — four
raw `.txt` captures, no stage, no question, no verdict. **Plan Validation item 10 names it as a
release condition's evidence**, and its provenance is unrecoverable from the directory. **10 of the 43
probes are indexed in neither instrument index** (`probe-cr21`–`probe-cr28`, `probe-qa-verify-rider2`,
`rider2-gate-baseline`).

### N-14 · D44's execution is incomplete, and the ruling forbids the audit that would prove it either way

**Reported, not investigated.** While reading, this stage met the struck record identifiers in **two
013 agent-output documents**: the **plan's own body** (its Objective, its Counts and its Validation
sections — planner-authored text, not steering's D43 rows) and the **architecture findings document**.
Neither appears in steering's D44 enumeration of affected surfaces (`uat`, `qa`, `devops`,
`code-review`, `implementation`, two probes, `OWNER-QUEUE.md`, the plan's D43 rows) — the architecture
document is not named there at all, and the planner made six further passes after D44 without striking
its own body text.

**A reader commissioned by this stage additionally reported occurrences in the two deployment
documents** (`deployment/…-deployment.md` and `…-readiness.md`). **That report is second-hand and this
stage did not verify it**, for the same reason it did not verify its own: verification is
re-derivation.

**I did not search for any of them and I do not reproduce them.** D44 forbids re-derivation, and a
`grep` is a re-derivation. **This is a structural property worth recording in its own right: a strike ruling that
forbids re-derivation also forbids the compliance audit, so completeness can only ever be established
by whoever holds the tokens.** `uat` reached the same wall from the other side (R22.1: *"the strike was
digit-complete and **dependent-incomplete** — an instrument that searches for the token searches for
the token"*).

**Routed to the owner and steering as a question of fact, not reopened as a decision.** D44 is not a
question and nothing here treats it as one.

### N-15 · Seven of the owner's eight checks were never traced to a milestone criterion

QA's §V.38, in `TODO.md`: *"`Criteria-At` names one artifact; the owner executed **eight** checks…
**QA traced item 8 by hand.** **Items 1–7 it did not trace.**"* Falsity signature: *"the owner executes
an item, it fails, and no plan criterion and no QA assertion corresponds to what he ran — the failure
has nowhere to land."*

All seven passed, so the signature can no longer fire for these; what remains is **record integrity —
the chain claims criteria were validated by checks whose binding to them was never established.**
Parked, with a reason that is itself a finding: *"**commissioning a planner pass would expire both
freshly re-issued verdicts**"* (N-3's cost, again, this time deterring a correction). QA's own
instruction: *"**Do it before the next chain's click-through, not after.** Tracing is cheap in advance
and unsettleable in arrears."*

### N-17 · The first release ran outside the gate, and three Validation items had no surface to be written on

**This is the largest single process event in the chain and it is not in the brief's premise.**

`a151fb4` reached `master` at **2026-08-25 00:56:37**, pushed by the owner, while `uat` rev 10's
release decision — `APPROVED FOR RELEASE, CONDITIONAL` on a **twelve-row `PRE` walkthrough** — was
live and undischarged. `uat` rev 13's finding, verbatim:

> **The release act consumed the condition without discharging it.** The approval was *overtaken*, not
> met. Two consequences follow, and **neither is recoverable by re-running anything**:
>
> **A release ran with no deployment record.** `agent-output/deployment/` holds a *readiness
> assessment* and **no deployment record**. **Plan Validation items 4, 5 and 7 are each discharged *at*
> the deployment record; with no record they are not merely owed, they have no surface to be written
> on.**

**Two things this stage records about it, and they pull in opposite directions.**

**Nothing unreviewed shipped, and that was established by measurement rather than assumed.** `uat`
derived it at the tree: `821330d` is an ancestor of `a151fb4`; the **non-test delta is empty**; the
full delta is *"exactly three files, all under `src/utils/__tests__/`"* — precisely the three paths rev
10's own frontmatter had named as uncommitted and hashed. Rev 10 had written *"committing QA's three
test paths is the one move this decision survives"*, and **that is the only move that happened.**

**And the recovery was handled in the one way that does not corrupt the record.** `uat`'s framing is
the most reusable sentence the chain produced:

> a **recovery state, not a sanctioned ordering** … it does not pretend the ordering was normal, and
> it does not treat a shipped system as if it were still a proposal.

**The process finding is not "the owner released early" — that is his to do.** It is that **the
pipeline had no state for *shipped, but conditions outstanding***, so a legitimate owner act left
three Validation items pointing at a document that did not exist, and the chain spent revisions
constructing a state to hold what had happened. **A gate that can only be *met* or *pending* will be
overtaken eventually, and the record has to have somewhere to put that.**

### N-18 · A release condition named an act nobody in the pipeline may perform

Plan **Validation item 7** states rollback as *"the serving ref moves back to `c85945f`"*. Devops
established, and `uat` carried rather than resolved:

> the rollback **as the plan states it** is a **force-push**, **which is nobody's to run on their own
> initiative**.

**The rollback plan was never invoked** — seven ref moves, every one a fast-forward, ancestry verified
at each. **So the defect cost nothing, and that is exactly why it is worth recording**: a release
condition that is unexecutable by every party bound by it was carried from plan approval through
critique, QA, UAT and two release acts without being caught, and was found only when devops read it
as an instruction it would have to obey. **A criterion is not validated by being agreed to; it is
validated by someone asking who would run it.**

### N-19 · The verdict the release rests on is linked from nowhere

`qa/release-b56570d-tip-verification.md` carries `Status: Release Verified`, `Stage: QA Phase 3`,
`Commissioned-by: devops-hooks-013-3, relayed by steering-hooks-013-3`, and **no ID** — correctly, by
its own stated rule that *"a release-tip record is a join across plans and is named by release
identifier, not by plan ID."*

**But the plan-level QA document does not reference it** (zero occurrences of the release SHA's record
name), and it names **no authoring session**. The commit (`d408477`, *"qa Phase 3: RELEASE VERIFIED at
b56570d"*) establishes the stage; nothing in the corpus establishes which QA session wrote it. Its
predecessor, `release-4a7126b-tip-verification.md`, **is** claimed in the QA document.

**Not a defect in the verification** — which is thorough, runs a new gate (`typecheck` across both
`tsc` projects, *"a release fact because the script itself is part of the delta"*), settles a
012-adjacent question *"by execution rather than by argument"*, and **declares one deliberate
omission with its reason** (`pnpm lint` not run, because `eslint --fix .` *"would modify the working
tree"* at a verified tip — an exemplary disclosure). **The defect is that an ID-less document
carrying a release verdict has no inbound link from the stage that owns it**, so it is discoverable
only by knowing it exists.

### N-20 · "Wired is not installed" — the same coverage gap stood open at both release tips

Both tip verifications reach the same finding in the same words. At `4a7126b`: *"**(a) The mount is
never executed** … **(b) The producer is never executed** … This is precisely **'wired is not
installed'**."* At `b56570d`: *"No shipped spec pins any of the seven call sites."*

This is the gap D28 folded into an owner browser sitting, that QA's render instrument (F-QA23,
`probe-cr22`, `probe-cr23`) was built to *narrow* rather than close, and that `uat` names as the
reason its value assessment read PARTIAL. **It was correctly disclosed at every gate and never
misrepresented.** It is recorded here because it is the chain's one substantive *technical* residue
that no amount of process improvement would have closed — `website/vitest.config.ts` is
`environment: 'node'` with no jsdom, happy-dom or testing-library in `package.json`, so **a harness
would have been an addition, not a configuration** (steering established this at D28 before framing
the choice, which is the right way round).

### N-16 · Two documents carry terminal statuses outside `closed/`, and one stage document never reached a terminal state

At 20:57 UTC: `critiques/…critique.md` is `Resolved` and
`deployment/…readiness.md` is `Superseded`, both still in their open directories — **correct**, since
the `closed/` move is devops' at chain closure and the chain is open. Recorded so nobody reads it as
drift.

**The exception is the architecture findings document**, `Status: Active` since 2026-08-24 01:35 with
an explicitly owed reconciliation (N-8). **It is Active because work is owed, and nothing in the
pipeline will ask for it** — the architect was invoked twice, on one day, and no stage's completion
depends on its return.

---

## Agent Output Analysis

### Sessions, not agents — the unit that actually carried the work

**26 distinct stage sessions across 10 roles in 45 hours**, enumerated by `grep -o` over every 013
document for the `<role>-hooks-013[-n]` pattern:

| Role | Sessions | Role | Sessions |
|---|---|---|---|
| **uat** | **6** (`uat-hooks-013` … `-6`) | devops | 3 |
| qa | 4 | planner | 2 |
| steering | 3 | critic | 1 |
| implementer | 3 | architect | 1 |
| code-reviewer | 3 | *(no analyst, no researcher in-chain)* | — |

**Continuity was carried entirely by documents, not by sessions.** `uat` rev 45's changelog row names
its own successor as *"a **FRESH session with no brief and no inherited context** (not a resumption of
`uat-hooks-013-5`)"*. That is the design working — and it is the direct cause of document size, of
`Status-Detail` growth in the two stages that append (N-5), and of the value of every self-correction
being written down rather than remembered.

**It also sets a hard limit on what any retrospective here can ask.** A stage's recollection is not
available: the sessions are gone. **Everything in this document is derived from artifacts and from
git, which is the correct constraint and worth stating as one.**

### Volume

| Artifact | Revisions / rounds | Commits | Size |
|---|---|---|---|
| Plan | **51 revisions**, **53 Decisions Register rows** | 52 | 280 KB |
| Code review | **25 rounds** | 41 | 567 KB |
| UAT | **49 revisions + 1 unnumbered correction pass** | 51 | 725 KB |
| QA | **13 verdict events**, ~20 distinct passes | 39 | 379 KB |
| Implementation | — | 49 | 500 KB |
| Deployment | **2 release acts** | 8 | 129 KB |
| Verification | **43 probes**, 38 with READMEs | — | — |

**Authorship of the plan's 51 revisions** (counted by `grep -o` on the changelog's author column):
**steering 33 (65 %), planner 16 (31 %), uat 1, devops 1.** **The plan document became, in volume, a
ruling ledger rather than a plan** — **30 of the 51 revisions (59 %) declare a *"registration write set
only"* clause**, changing no criterion, milestone or release condition, and **14 of the 53 register
rows are marked *REGISTRATION ONLY***.

**This is a defensible design** (a ruling has to land somewhere findable, and D53 exists precisely
because a ruling that *didn't* land was unfindable). **It is also the direct cause of N-3**: every one
of those 33 registration passes is a criteria-axis move that expires every verdict anchored to the
plan. **The two facts are the same fact seen from two ends.**

### Handoff quality

**Clear and complete, with one recurring failure mode.** The handoffs whose content is recorded are
notably disciplined: steering relayed the owner's *"BC-4 pass"* **unpadded and explicitly declined to
expand it into three limbs** — `uat` credits this as *"the correct handling"*, because expanding it
would have authored an observation the owner did not make. Stage-to-stage direct contact under D22/D26/D27
worked: the implementer and reviewer ran fix rounds directly for 25 rounds with steering copied on
verdicts only.

**The failure mode is uniform and is N-1's mechanism in transit**: *what travels between stages is
prose, and prose overstates the artifact it summarises.* Three recorded instances, one per direction:
QA's prose over QA's register cell (BC-7); QA's prose over QA's own BC-21 row (`4a7126b` "shipped");
steering's prose over the instrument it described (the falsifier "armed"). **In all three the
underlying artifact was correct.** `uat`'s rule is the transferable remedy and it earned its keep:
*"**a stage's prose about its own artifact is not evidence of what the artifact says**"* — and it
caught two of the three by applying it.

**Excessive back-and-forth: no.** 25 code-review rounds sounds high and was not waste — the round
count tracks a genuinely large surface (18 files across create, edit and import paths) and each round
carries its own probe. **The expensive loops were not between stages; they were the verdict re-issues
forced by the criteria axis (N-3) and the corrections of prose (N-1).**

### Issues and blockers — where they were tracked, and where they were not

| Register | Rows | Terminal at write time |
|---|---|---|
| Blocking release conditions (`uat`) | ~21 minted across the chain | **8 `PRE` all `EXECUTED`; 4 `POST` `NOT EXECUTED`**; several withdrawn/dropped by ruling |
| QA findings | **F-QA1 … F-QA33** (F-QA20 never issued; F-QA33 issued twice) | most closed; F-QA22, F-QA33(b) open |
| Decisions Register | **D1 … D53** | 14 marked `REGISTRATION ONLY`; 30 of 51 plan revisions were registration passes |
| Owner queue | 8 live items | all discharged by the release; **file not updated at read time** (N-8) |
| `TODO.md` | 8 items, **6 chain-013-derived** | **all open** |
| `OPEN_QUESTIONS.md` | 5 items | **all chain-012; no 013 entries** |
| `INBOX.md` | 0 | empty, correctly drained |

**Escalation was appropriate and, if anything, conservative.** D22/D26 set the rule — stages report to
steering only for what prevents them continuing — and the record shows stages declining to escalate
what they could derive (`uat`: *"a question answerable by derivation is not escalated"*). The owner
was asked for rulings 53 times in 45 hours, which is high, but **every ruling in the register is
attached to a decision a stage could not lawfully take** (scope, product behaviour, waivers,
observations only he can make).

**The tracking gap is not in the registers; it is between them and the surfaces a person reads**
(N-12). Six of `TODO.md`'s eight items were raised by chain 013 and every one is open, including two
that name conventions binding **every future chain** (the `verification/` copy rule, the `check-repo`
scope-suffix convention). **Nothing in the pipeline collects those.** That is what `pi` is for, and
`pi` has never run (N-10).

### Did early issues predict later problems?

**Yes, twice, and both were visible before implementation began.**

- **The critic's cycle-1 finding M-4** caused steering to correct its own D11 register row at plan
  rev 4 — *"I lifted planner rationale into a register title, where it became terminal and consumed at
  the title."* **That is D42's prose-versus-structure class, identified on day one, by the critic,
  before a line was implemented.** It recurred at least six more times across four stages.
- **The architect's F-1** (08-24 01:35) found that M8-G's population argument *"contradicts the
  mechanism M8-G confirms"* and warned: *"Left as written, the plan tells UAT to record 'no member to
  observe' for the single most important new behaviour D18 introduces."* **The population question
  went on to consume a substantial part of the chain's second day.**

**The predictive signal existed and was acted on in both cases.** What did not exist was any mechanism
to carry the *class* forward — which is N-10.

---

## Value delivery, and what it cost

**Delivered.** The Value Statement was approved as written on day one (D4) and **was never amended
across 51 revisions** — unusual, and worth recording as a positive: the objective held while
everything around it moved. The release was made against a live gate with all eight owner-executed
`PRE` conditions `EXECUTED`, a full suite (48 files / 627 tests / 627 passed), both `tsc` projects at
zero, and a clean build.

**The honest limit, from the stage that owns the question.** `uat`'s own value assessment reads:
*"**VALUE DELIVERY: PARTIAL — and the shortfall is not a defect anyone found; it is a step nobody has
taken**… this value statement's entire content is that the user is not *silently* misled, so its
failure mode leaves no trace in a test run… **every green test in this chain is compatible with it.**
**A suite cannot close this; silence is what instruments are worst at and a person at the surface is
best at.**"* That was written at rev 36 and superseded by the unconditional gate at rev 47 once the
eight human checks were executed — **which is exactly the right resolution, and it is why the four
`POST` rows still matter.**

**Cost, measured where it can be measured:**

| Cost | Measure |
|---|---|
| Elapsed | 45 h 10 m, two calendar days, 26 sessions |
| Rework loops attributable to the criteria axis (N-3) | **3 verdict re-issues** across two stages, plus one prospective (R47.7) |
| Rework loops attributable to prose-over-artifact (N-1/N-2) | **at least 6** corrections/withdrawals, one within an hour of its own creation |
| Owner time | 53 rulings, 8 browser checks, 1 SQL repair, 2 direct commits |
| Documentation | **2.6 MB** across nine stage documents |

**The largest single avoidable cost in the record is not any of the defects — it is that none of the
lessons had anywhere to go** until this document. Twelve chains of the same learning, unretained
(N-10).

---

## Findings I consider durable enough to reach `pi`

Ordered by leverage. Each is stated so it is true beyond its instance, with the instance named as
evidence rather than as the finding. **None of these is a work item for a later session — they are
findings with their evidence, and the acting on them is `pi`'s remit, not something deferred out of
this document.**

| # | Finding | Evidence |
|---|---|---|
| **P-1** | **The retrospective/`pi` loop must actually run.** A trigger met twelve times without firing is not a process. Everything else here is a lesson this repository has already paid for at least once. | N-10 — one commit ever touching either directory |
| **P-2** | **A stage instruction that writes to the document a stage's own verdict is anchored to will expire that verdict every time it is obeyed.** Fix in the definitions — anchor to criteria-bearing sections, or route registration-only writes off the criteria axis — not in anyone's care. | N-3; `uat` R47.7, verbatim and routed here by its author; bit twice in one evening |
| **P-3** | **A stage's method verifies the artifact and is structurally blind to the prose that vouches for it.** *"Certification prose is not covered by verifying the thing certified."* Needs a mechanism, because it has already survived being written down as a warning. | N-1; six members across four stages; R36.1.2 and R45.3 both caught by outside reads |
| **P-4** | **A count is invalidated by the thing it counts changing, and nobody re-checks a count when their own work is what changed it.** Never restate a count without recomputing it; enumerate rather than count where the set is small. | N-4; seven instances including this stage's own |
| **P-5** | **Compute before the filter, and verify a claim in the form the claim is made** — content needs a read, change needs a diff, quantity needs a computation, absence needs an enumeration. Re-reading is not a universal solvent. | W-2, N-4; `uat` R36.1.2's refinement; reproduced first-hand by this stage |
| **P-6** | **Every instrument defect in this cwd has been caught by contradiction against a second instrument, never by re-running the first** — a stably-reproducing wrong answer reads as confirmation. | W-2; QA's six-member instrument-lie class; this stage's own timeline error |
| **P-7** | **Non-vacuity is a property to be proved, not assumed.** Mutate a new instrument before trusting it; give an equality check a positive control on the same run. | W-3; F-QA23 (a shipped spec vacuous, 9/9 green), F-QA19's N1, seven meta-probes |
| **P-8** | **An ID space written by more than one stage collides**, because each writer numbers from the highest ID it can see. Prose warnings do not prevent it — the next instance occurred inside the document carrying the warning. | N-6; four instances including `ID: 11` on the code-review doc |
| **P-9** | **A probe directory must not hold an editable second copy of a file the tree executes** — keep a pointer and a SHA. *"A copy that lags looks wrong on inspection; a copy that leads looks like progress."* | N-13; three stages reported a fix that had not shipped |
| **P-10** | **A gate whose false-positive rate grows with the corpus trains its readers to dismiss its true positives.** Either the gate gets an owner and a clean baseline, or it stops being run. | N-7; 9 → 26 failures, four stages, one real defect left standing inside the noise |
| **P-11** | **Live obligations must exit the stage document into a surface someone reads.** A closed item is deleted; a live one currently has nowhere to go. | N-12; BC-12/14/17/20 tracked nowhere outside a 725 KB register |
| **P-12** | **`Status-Detail` is a declarative field and cannot hold a record.** Two of six stages append where four replace; the field grew 21.6 % *after* the defect was found, because appending was the only way to record the finding. | N-5, routed here by `uat` R45.9; measured across all six documents |
| **P-13** | **The coordinator seat has no reviewer, and disclosure is not review.** Whatever the fix, it cannot be "be more careful" — five of six defects were caught by other stages, and the sixth by self-disclosure. | N-2; six instances in thirty hours |
| **P-14** | **A chain extended by ruling has no completion predicate.** 45 % of decisions and two milestones arrived after the first release act. | N-11 |
| **P-15** | **Trace the owner's checks to milestone criteria before he runs them, not after** — *"cheap in advance and unsettleable in arrears."* | N-15; seven of eight untraced |
| **P-16** | **A strike ruling that forbids re-derivation also forbids the compliance audit.** Whoever issues one must expect completeness to be unverifiable by any stage bound by it. | N-14; also `uat` R22.1's *"digit-complete and dependent-incomplete"* |
| **P-17** | **A criterion is validated by someone asking who would run it, not by being agreed to.** An unexecutable release condition passed plan approval, critique, QA, UAT and two release acts unchallenged. | N-18; rollback stated as an act *"nobody's to run on their own initiative"* |
| **P-18** | **The pipeline needs a state for *shipped, but conditions outstanding*.** A gate that can only be met or pending will be overtaken, and the record must have somewhere to put that. | N-17; `uat`'s *"a recovery state, not a sanctioned ordering"* |
| **P-19** | **An ID-less document carrying a verdict needs an inbound link from the stage that owns it**, or it is discoverable only by knowing it exists. | N-19; the release-tip record the release rests on |

**Two findings I decline to promote, and why** — a retrospective that promoted everything would be
useless to `pi`:

- **"25 code-review rounds is too many."** Not supported. The round count tracks surface size and each
  round carries its own instrument; the record shows no round that was pure churn.
- **"Session churn caused the document bloat."** **Tested and refuted** — `uat` ran 6 sessions and QA
  ran 4, and QA's `Status-Detail` is 4.5 % of `uat`'s size (N-5). The driver is stage-local convention.

---

## What I could not establish

Stated as unverifiable-by-construction, not as absent or refuted. A negative existence claim needs an
instrument that could have seen the evidence, and for each of these I did not have one.

1. **The content of the two D36 breaches.** Attested twice in `uat`; nowhere in the corpus (Corpus §2).
2. **Whether D44's strike is complete.** Met in two documents while reading; the audit is forbidden by
   the ruling (N-14).
3. **Whether a QA session took its plan rulings from commit messages and diffs without opening the
   plan.** The claim is in **steering's D46 registration row**. A dedicated search of the QA document
   and both tip records found **no QA-authored statement of it** — including the string *"commit
   message"*, which does not occur in the QA document at all. **The instrument existed and returned a
   negative**, so what I can report is precise: *a claim about a stage's conduct recorded by the
   coordinator and not attested in that stage's own record.* Whether it happened is outside the
   corpus.
4. **The class of defects caught and not disclosed.** Structurally invisible (Corpus §4). This bounds
   every "caught by X" count in this document from below, never from above.
5. **Any assessment of cost against a portfolio objective.** No roadmap has ever existed (N-9).
6. **Rev 47's own commit SHA as stated inside the UAT document** — the document names commits for
   earlier gates but not that one; I have it from `git log` (`e7cdc6c`, 20:20:13) rather than from the
   document, and note the difference.
7. **Anything after the release act.** Outside chain 013's records by owner ruling (Corpus §6). This
   retrospective makes no claim about current production state, and opens no finding on it.

---

## Rulings this document is bound by, restated so no reader infers otherwise

- **D36.** Whether Discord accepts an empty component is **dropped from chain 013 completely.** It
  arose repeatedly during the chain, including adjacent to work this document reviews. **It is not
  tracked, not routed, not re-raised, and not handed to 012.** This document records that it arose and
  was dropped; it does not carry the question, and takes no position on what Discord does.
- **D44.** The two struck records are not cited, relied on, reasoned from or re-derived anywhere in
  this document. N-14 reports encountering them without reproducing them.
- **Chain 012 is held whole.** Nothing here touches it, and the 012 material in `OWNER-QUEUE.md`'s held
  section and `TODO.md` is left exactly as found.
- **The chain is NOT closed.** BC-12, BC-14, BC-17 and BC-20 stand outstanding. **This document closes
  nothing and moves nothing to `closed/`** — that is devops' step, and the four rows are `uat`'s.
- **This retrospective's own precondition** (QA Complete + UAT Complete, and a release **executed**) was
  met at `uat` rev 47 / devops §16. The outstanding-items ledger exists, is owned, and its four rows
  are named with their owners above — so running now records a live ledger rather than orphaning it.

---

## Next actions

*Point-in-time. Later documents are authoritative on any item's current state.*

1. **`pi`** — the nineteen P-findings. **This is the first `pi` input this repository has ever had**;
   P-1 is the one that makes the other eighteen worth extracting.
2. **`architect`** — three things this retrospective found and cannot fix: `system-architecture.md`
   still describes 013 as *"open and in critique"*; the post-implementation reconciliation the 013
   architecture findings document declares owed has not run; and that document is the one 013 stage
   document with no completion path (N-8, N-16). Its O-1/O-3 observations are worth promoting on their
   merits.
3. **`planner`** — P-2's fix is a definition change, not a plan change, and is `pi`'s; what is the
   planner's is N-15's traceability pass, which QA states *"does not require a plan write; only binding
   the result does."*
4. **`roadmap`** — N-9. The stage has never run in this repository.
5. **Steering / the owner** — three reports, no action taken by this stage: the code-review document's
   `ID: 11` (N-6); `OWNER-QUEUE.md`'s live section describing an unreleased chain (N-8); and the D44
   completeness question (N-14).
6. **Nobody** — reads this document as closing anything, as a verdict on any stage's competence, or as
   carrying the question D36 dropped.

