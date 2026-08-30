---
ID: 014
Origin: 014
UUID: 4671e28c
Status: Active
---

# Retrospective 014: Hooks test-suite cleanup (pilot)

**Plan Reference**: `agent-output/planning/closed/014-test-suite-cleanup.md` (read at revision 17)
**Date**: 2026-08-30
**Retrospective Facilitator**: retrospective

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-08-30 | retrospective | Retrospective written for chain 014 on the owner's word (the spawn was **Held** at chain closure, 2026-08-27, and re-asked only on his instruction). Corpus declared. Timeline rebuilt on commit times after finding three stages' self-recorded times record events after their own final write (§3.2). **AC2's owed row-by-row audit executed, not deferred** — ledger closes exactly at 617 − 566 = −51, failure signature did not fire (§4). Two findings made here rather than carried: the code review's false `system-architecture.md` absence, now the fourth across two chains and produced by the prescribed remedy (§7.1); and an architecture Problem Area this chain closed but left standing (§7.2). Five carried classes plus two new ones written up for pi under D7 (§9). Status `Active` — pi closes it. |

## 1. Corpus

**What this retrospective can read**, and did read whole: the plan (rev 17), the analysis, both
critique documents, the implementation record, the code review, the QA report, the UAT report, the
readiness and deployment records, the two handoffs this chain lodged, `steering/014-rulings.md`, the
disposition table, and the two vitest JSON captures (`baseline-a74b9e2.json`, `final-f2c85f5.json`).
Plus, as instruments computing outside any agent's narration: the `agent-output` and `website` commit
graphs, `git diff --numstat`, `git log --diff-filter`, and `tools/check-repo.js --status`.

**Architecture and roadmap, read before conducting this retrospective**, per this stage's first
responsibility. `architecture/system-architecture.md` exists (36.5 KB) and was read — see §7.2, which
is a finding about it. `architecture/website.md` was read and carries nothing on tests (`grep -c
test` → 0), which is what the plan recorded. `roadmap/` holds only `.gitkeep`; recorded as the state
of the record, cited nowhere below, and raising nothing.

**What this retrospective cannot read, and therefore never reports as absent**: anything that lived
only in a session — rulings given in conversation and not lodged in `steering/014-rulings.md` or a
register row; reasoning a stage did not write down; defects corrected before a document was written.
Every negative claim below is scoped to an instrument that could have seen the evidence. Where the
record's own account of an event is the only account, it is labelled as such.

**One methodological warning that governs the whole document**: several stages' self-recorded clock
times are demonstrably wrong (§3.2). Every duration below is therefore anchored to commit
timestamps, which are stamped by git and not by a narrating agent.

## 2. Summary

**Value Statement** (plan, owner-approved verbatim 2026-08-26, D12):

> As a future implementer or planner working in the Hooks workspace, I want the website test suite
> audited against a written Test Conventions standard — junk classes dispositioned with per-deletion
> proof that no coverage was lost, and the standard living in `/usr/local/bin/hooks/CLAUDE.md` — so
> that the next chain copies a clean suite and cites the standard instead of the memorial/source-text/
> ID-named patterns the suite currently teaches.

**Value Delivered**: **YES**, with one criterion (AC8) deliberately left open post-release by owner
ruling, and one (AC2) whose designated instrument was defective — audited here and **found sound on
the evidence that does exist** (§4).

**Implementation Duration**: **5 h 42 m** from plan revision 1 (`6c3afac`, 2026-08-26T23:40Z) to the
production push (2026-08-27T05:19:56Z); **6 h 53 m** to chain closure (`88a0a24`, 06:31Z). Add the
researcher's inventory (`f7666b3`, 22:48Z) and the effort spans **7 h 43 m end to end**, inside a
single unbroken night.

**Overall Assessment**. A pilot chain that did the hard thing well: it audited 48 test files against
a standard it wrote in the same chain, deleted 40 cases' worth of junk coverage without losing a
behaviour anyone can name, converted source-text assertions into real component mounts behind a new
DOM harness, and shipped with **zero production files changed** — independently re-derived here
(`git diff --numstat a74b9e2..f2c85f5 -- src bot` → 71 paths, every one under `__tests__/`).

Its distinguishing quality is not that it avoided errors. It made many. It is that **the errors were
caught by a second instrument contradicting the first, disclosed in the round they happened, and
escalated rather than quietly worked around** — the analyst's own rig defect that would have reported
the opposite of the truth; the reviewer's false "purely additive" lockfile claim; QA's own predicate
that matched none of the four violators it was written for; the implementer's naming anchor that
rejected 13 conforming files; the devops stage's swept foreign hunk. Every one is in the record, in
the stage's own words, with the cause named.

The chain's real weakness is narrower and more systemic than any of those: **it wrote acceptance
instruments before the artefacts they would have to measure existed, and no gate re-tested an
instrument against a new shape before trusting it.** Three of this chain's own recorded findings share
that single cause. That is the finding worth carrying to pi.

## 3. Timeline Analysis

### 3.1 Phases, anchored to commit time (UTC)

Estimates are absent by construction: the plan carries no per-phase duration estimates, so "Planned
Duration" is not a column this chain can fill. Recorded rather than scored.

| Phase | Started | Ended | Actual | Notes |
|---|---|---|---|---|
| Research (inventory) | 08-26 22:48 | 08-26 22:48 | — | `f7666b3`, ID-less researcher doc, 48 files classified. Chain's input, not a chain stage. |
| Planning (rev 1 → approved rev 4) | 08-26 23:40 | 08-27 00:00 | **20 m** | 4 revisions in 20 minutes, interleaved with critique. |
| Critique cycle 1 (4 passes) | 08-26 23:54 | 08-27 00:20 | **26 m** | Pass 1 whole-document; passes 2–4 scoped to the delta. |
| Analysis (M2 DOM harness) | 08-26 ~23:51 | 08-27 00:13 | **~22 m** | `50f053a`. Rig install was its only network act. |
| QA Phase 1 | 08-27 00:19 | 08-27 00:24 | **5 m** (4 commits) | Ran *before* implementation, per D16. |
| Critique cycle 2 (2 passes) | 08-27 00:22 | 08-27 00:24 | **2 m** | Opened on the planner's own trigger (rev 7 changed M0/M4b). |
| Implementation (M0 → M5) | 08-27 00:22 | 08-27 04:09 | **3 h 47 m** | 40 `website` commits; 8 milestones; 5 ceiling/compaction resumptions. |
| Code review (M2 only) | 08-27 02:32 | 08-27 02:49 | **17 m** | Ran *inside* implementation, not after it. |
| QA Phase 2 | 08-27 04:21 | 08-27 04:23 | **2 m** (2 commits) | Verdict re-derived, not cited. |
| UAT | 08-27 04:50 | 08-27 04:52 | **2 m** | Plus two later execution addenda (05:37, 06:15). |
| Devops Stage 1 (readiness) | 08-27 05:01 | 08-27 05:14 | **13 m** | Release act blocked at 05:14. |
| Release (Mode B) | 08-27 05:19:54 | 08-27 05:19:56 | **2 s** | Executed by `steering-test-cleanup`, not devops. |
| Closure sweep | 08-27 05:23 | 08-27 06:31 | **1 h 08 m** | Four post-deploy rows discharged; two documents closed. |
| **Total (plan rev 1 → closure)** | 08-26 23:40 | 08-27 06:31 | **6 h 53 m** | |

Volume across that window: **126 `agent-output` commits** (123 touching chain artifacts) and **40
`website` commits**. The plan alone took **31 commits** and **28 changelog rows**.

### 3.2 FINDING — stage documents' self-recorded times drift forward, and three of them record events after their own final write

This is a new finding, made by this retrospective, and it is the reason §3.1 uses commit times.

Six 014 documents timestamp their own changelog rows. Compared against the commit that *contains*
each row — an instrument that computes outside the agent — three stages drift forward monotonically:

| Document row | Self-recorded | Commit carrying it | Commit time | Drift |
|---|---|---|---|---|
| critique c1 pass 1 | 08-26T23:55 | `f15e106` | 08-26 23:54 | −1 m ✓ |
| critique c1 pass 2 | 08-27T00:20 | `265b383` | 08-26 23:59 | **+21 m** |
| critique c1 pass 3 | 08-27T01:10 | `eff80a5` | 08-27 00:17 | **+53 m** |
| critique c1 pass 4 / closed | 08-27T01:40 | `4b7f15e` | 08-27 00:20 | **+80 m** |
| critique c2 pass 1 | 08-27T02:05 | `d2bc424` | 08-27 00:22 | **+103 m** |
| critique c2 pass 2 / closed | 08-27T02:40 | `c557300` | 08-27 00:24 | **+136 m** |
| QA Phase 1 written | 08-27T02:10 | `2b2b907` | 08-27 00:19 | **+111 m** |
| QA rev-8 / QA-1 closed | 08-27T03:55 | `066ad33` | 08-27 00:24 | **+211 m** |
| code review N-2 nit | 08-27T03:30 | `8ca4181` | 08-27 02:46 | **+44 m** |
| code review round 1 | 08-27T02:29 | `d7c5fe5` | 08-27 02:32 | −3 m ✓ |
| UAT verdict R-9 | 08-27T04:46 | `0889e8d` | 08-27 04:52 | −6 m ✓ |
| devops Stage 1 | 08-27T04:56 | `db91b46` | 08-27 05:01 | −5 m ✓ |
| release push | 08-27T05:19:56Z | `b38ff34` | 08-27 05:23 | −3 m ✓ |

**A negative drift is normal** — work happens, the commit follows minutes later. **A positive drift
is impossible**: the document claims an event happened after the commit that already contains the
sentence describing it. `git log --follow` confirms the critique cycle-1 file's *last* touch of any
kind is `4b7f15e` at 00:20 while it records a pass at 01:40; cycle 2's last touch is `c557300` at
00:24 while it records a pass at 02:40; QA Phase 1's last Phase-1 touch is `066ad33` at 00:24 while
it records a rev-8 consumption at 03:55.

**Diagnosis.** The first row of each session is accurate; every subsequent row drifts further. That is
the signature of a session **narrating elapsed time from its own sense of how much work it has done**
rather than reading a clock. The stages whose timestamps hold — code review's round-1 row, UAT,
devops, the release — are exactly the ones whose events had an **external anchor** (a review request
relayed at a known moment, a push, an `ls-remote`).

**Why it matters, concretely.** It is not cosmetic. Chain 014's critique cycle 2 appears, on the
documents' own times, to have taken 35 minutes and to have followed cycle 1 by 25 minutes; on commit
times it took 2 minutes and overlapped implementation. Anyone reasoning about where this workflow
spends time — including this retrospective, and including pi — gets the wrong answer from the prose.
It is the same family as the workspace's standing hazard that **prose is where this thread's
disciplines fail while register rows hold**: a number written in prose beside a structured artifact
was never measured.

### 3.3 What the shape of the timeline says

Two structural facts stand out, and both are deliberate rather than accidental.

**The gates ran concurrently with the work they gated, not after it.** QA Phase 1 ran *before*
implementation (D16). Critique cycle 2 ran *during* M0. Code review ran *inside* M4c, scoped to M2's
five non-test files. This is not a defect — it is the correct shape for a test-only chain, where the
substantive adequacy gate is QA and code review has almost no surface. It compressed a nine-stage
pipeline into under seven hours.

**Implementation is 55% of the elapsed chain and every other stage is minutes.** The critique, QA and
UAT documents are large and dense but were each written in a handful of commits within a few minutes.
The cost centre is the implementer's 3 h 47 m across 40 commits and five run-length-ceiling
resumptions. Any future attempt to make this workflow cheaper acts on the implementer's episode
length, not on the gates.

## 4. The AC2 audit — the chain's stated Assumption Not Checked, discharged here

Plan rev 17 routed this to the retrospective in terms:

> **Rev 17 — criterion defect, recorded not repaired**: the designated identity instrument (the
> mapping column) is authored by the same hand as the transition it identifies, so a replay that
> consumes it is not independent, and no independent replay exists … with the audit — mapping column
> vs `baseline-a74b9e2.json` row by row, by a reader not using the column as identity — owed to the
> retrospective as the chain's Assumption Not Checked. **Failure signature: a baseline case silently
> dropped rather than dispositioned, invisible to every green run.**

QA said the same and named the owner: *"the row-by-row audit against
`verification/014/baseline-a74b9e2.json` is the **retrospective's** to own."* This section is that
audit. It was run, not deferred.

### 4.1 The instrument, and why it is independent

The defect in AC2 is that the disposition table's `old title → new title` column is both the map and
the territory. So this audit **does not use that column at all.** It uses two quantities neither the
implementer nor QA authored:

1. **The two vitest JSON captures** — `baseline-a74b9e2.json` (48 files, 617 cases, all passed) and
   `final-f2c85f5.json` (51 files, 566 cases, all passed), written by the reporter.
2. **The disposition table's `path` column** — which, unlike the title column, is *externally
   falsifiable*: every path it names either is or is not in a capture.

The audit is then arithmetic: reconcile 617 → 566 file by file, and require every case in the −51
delta to land on a named disposition.

### 4.2 Completeness of the record

| Check | Result |
|---|---|
| Baseline files (48) whose basename never appears in the disposition table or implementation doc | **0** |
| Final files (51) whose basename never appears in either document | **0** |
| Distinct `old → new` path mappings recoverable from the record | **41** |
| Old basenames with more than one conflicting recorded new name | **0** |
| Recorded rename targets absent from the final capture | **0** |
| Paths recorded as deleted that are nevertheless still in the final capture | **0** |

Every file at both ends of the chain is named in the record, and no rename points anywhere that does
not exist. **AC1 holds under an instrument that is not AC1's own.**

### 4.3 The 617 → 566 ledger

41 baseline files carry a clean one-to-one rename (539 → 527 cases, once the two rows that *split*
into a second file are credited). 7 baseline files carry no single-arrow rename (78 cases) and
correspond to 10 final files (34 cases). Every delta:

| Row | Baseline file | Cases | Disposition of record | Final destination(s) | Cases | Net |
|---|---|---|---|---|---|---|
| 45 | `plan-004-lazy-loading` | 28 | **Delete** — H1, no behavioural equivalent under any harness (analysis S4); surface → Outstanding Items | — | 0 | **−28** |
| 43 | `message-init-route0` | 8 | **Delete** — H7 + J1/J2 pin, per D2; handoff committed *first* | — | 0 | **−8** |
| 39 | `013-qa-toast-vessel-render` | 9 | Convert block 1; **block 2 deleted as superseded** by row 38's real-behaviour conversion, covering test named | `NullableComponent.show-guard.test.tsx` | 5 | **−4** |
| 19 | `013-fqa19-ingress-gate-reachability` | 11 | Split; **5 wiring cases not converted 1:1 — they are false of the shipped component** (axiom D), → handoff | `discordResponseToMessage.rowE-persist-gate` 6 + `NewMessageModal.persist-gate-wiring` 1 | 7 | **−4** |
| 11 | `011-style-reconciliation-poc` | 4 | **Delete** — H6, third-party source text, no covering test owed | — | 0 | **−4** |
| 36 | `013-owner-toast-vessel` | 5 | **Delete**; blocks 1 and 3 superseded by rows 38 and 34; block 2 → new mount | `MessageProvider.transient-toast` | 2 | **−3** |
| 10 | `010-transition-height-style` | 11 | Convert to real mount; **5 cases dropped with no observable equivalent under a synchronous React 19 root** → Outstanding Items | `TransitionHeightElement.height-and-visibility` | 9 | **−2** |
| 7 | `shapes-v2` | 52 | 1 case deleted by **owner ruling D8**; 6 titles stripped | `shapes.message-validation` | 51 | **−1** |
| 16 | `013-fqa15-rowd-load-gate` | 16 | Split; logic moved unchanged, 2 source-text cases → real mount | `utils.rowd-load-disposition` 14 + `JsonModalBody.load-floors-resolved-draft` 3 | 17 | **+1** |
| 35 | `013-owner-readable-mutation-errors` | 6 | Split into logic + two DOM mounts | `formatMutationError.zod-issue-formatting` 4 + 2 mounts × 2 | 8 | **+2** |
| 9 | `008-qa-validation` | 23 | H7 rider repair; inline transcription → mounted `SectionEditor` | `editableComponents.operations` 20 + `SectionEditor.auto-remove-dispatch` 3 | 23 | 0 |
| 33 | `013-owner-conflict-choice-not-default` | 5 | Split across the two real surfaces | `JsonModalBody.conflict-resting-state` 3 + `NewMessageJsonInput.conflict-resting-state` 2 | 5 | 0 |

**Sum: −28 −8 −4 −4 −4 −3 −2 −1 +1 +2 = −51.** The ledger closes exactly against the captures'
617 − 566.

### 4.4 Verdict

**AC2's failure signature did not fire.** Every case in the 51-case net loss traces to a named
disposition carrying a stated reason — an owner ruling (D8), a class deletion with the surface logged
to Outstanding Items (rows 45, 10), a supersession with the covering test named (rows 39, 36), a
deletion whose surface went to a lodged handoff (row 43), a third-party surface owed no coverage
(row 11), or a set of assertions found to be **false of the shipped product** and therefore correctly
not carried forward (row 19). There is **no residue** — not one case that vanished without a record.

**What this audit does not establish, stated plainly.** It is a file-level and count-level
reconciliation. It cannot see a case that was silently *replaced* by a different case inside a file
whose count did not change; only 200 of 617 `fullName`s survived verbatim, so title identity is
genuinely unavailable as a check. What bounds that residual risk is not this audit but the
implementer's per-row mutation evidence: each converted or repaired case was shown red under a named
mutation of the production symbol it claims to guard, then restored with `git diff` empty. A case
that binds to nothing cannot pass that test. **AC2 is therefore sound on the evidence that exists,
and the criterion is still the wrong shape.**

**The generalisable defect, for pi.** An acceptance criterion may not name, as its identity
instrument, an artefact authored by the stage the criterion measures. QA put it exactly right and it
should survive this chain verbatim: *"a defect in the criterion itself, not in this pass's diligence,
and no agent can close it by trying harder."* The fix is structural — where a transformation must
preserve a set, the criterion names a **capture taken before and after by a tool**, and the
transformation's own bookkeeping is at most corroboration.

## 5. What Went Well (process focus)

### 5.1 Workflow and communication

- **QA before implementation (D16) was the highest-leverage sequencing decision of the chain.** QA
  Phase 1 produced the Irreversible Side-Effect Register, the AC7 axiom-(E) enumeration (27 candidate
  files from a named class of 4), and closed M0's step-3 assumption **by measurement, ahead of M0**.
  QA framed it correctly: the register was *"handed to the implementer as input, not as a post-hoc
  audit."* A test-cleanup chain has no meaningful code-review surface, so putting the adequacy gate
  upstream is what gave the implementer a specification instead of a verdict.
- **Scoped-delta critique passes.** After a whole-document pass 1, all five subsequent critique
  passes were bounded to a named revision diff with the boundary itself verified (*"Delta
  `f9bb15b..72cde0a` (36/26 lines, boundary verified)"*). Six passes across two cycles cost 28
  minutes of wall clock and resolved 26 findings (M-1–M-14, L-1–L-12), all of them.
- **Direct stage-to-stage traffic (D11/D17) held.** Briefs named the consuming stage; steering
  received gate state only. The implementer routed items to the planner, the planner to QA, QA to the
  critic, code review to QA — visible throughout the changelogs. Steering's own error under this rule
  is lodged in the rulings file rather than hidden: it used "gate state" in the wide sense the
  owner's ruling narrowed.
- **Milestone-scoped code review, declared as such.** The reviewer stated its scope in the document
  (*"Nothing under `src/` was reviewed and no verdict here reaches it"*) and then defended it: when
  the plan rev moved after its verdict, it re-checked against the delta rather than letting the
  verdict silently expire or silently stand.

### 5.2 Agent collaboration patterns

- **Two instruments converging is what closed the hardest finding.** QA raised QA-1 (rev 7 put row 13
  into two milestones, breaking the plan's one-owner-per-file invariant) and the critic reached the
  same defect independently as M-13/M-14 in cycle 2. QA named the pattern in its own changelog: *"two
  instruments agreeing, which is the corroboration this workspace's hazards file says to look for
  rather than a re-run of the first."* This is the workspace's stated method being applied by a stage,
  unprompted, and it worked.
- **Peers corrected each other across session boundaries and the corrections stuck.** The
  code-reviewer corrected the implementer's debug-bump attribution (`pm2`, not
  `@pm2/pm2-version-check`); `qa-hooks-014-2` corrected the implementer's row-15 `embeds: {}` title
  and independently dissolved the implementer's "E3b two-hop instrument gap" claim; the implementer
  in turn verified and rejected `qa-hooks-014-2`'s reading of the `// escaped:` exemption — which was
  a filtered-grep artefact, not a real absence. Three cross-stage corrections, in three directions,
  all recorded.
- **The planner withdrew its own errors in the channel it made them.** The rev-3 `npm install
  --no-save` / `npm ci` paragraph was wrong for a pnpm repo; the plan's changelog records it as *"the
  planner's error and never applied"*. Likewise at rev 12: *"**Withdrawn**: the 'E3b two-hop
  instrument gap' I relayed at rev 11 … my error for carrying it unverified."* The critic's
  assessment of the first is worth keeping: *"withdrawing it as planner error in the changelog is the
  right correction form."*
- **Ownership boundaries held under pressure.** The implementer found the QA session unreachable
  (`SendMessage` confirmed), and rather than editing QA's document it routed the item back to the
  planner, citing *"no write authority over `agent-output/qa/`"*. The devops stage found a hunk in its
  own file written by UAT and neither reverted it nor claimed it. The reviewer wrote its plan
  changelog row and **held it uncommitted** rather than commit another stage's document, escalating for
  a ruling. In every case the boundary cost a round trip and was respected anyway.

### 5.3 Quality gates

- **The exit-code observable is the single best gate this chain added.** The analysis found a
  reproducible state where every case reports `passed`, the summary reads `636 passed (636)`, and the
  process exits 1. The critic escalated it (M-11) from a one-milestone fix to a **plan-wide**
  observable: *"an acceptance over a pass set is satisfied only at exit 0."* A gate that could
  certify a suite failing `pnpm test` was closed before it ever fired.
- **The validation instrument was corrected before it lied.** M-12: `tsc --noEmit` type-checks *none*
  of the 48 test files because `tsconfig.json` excludes `**/__tests__`. Replaced plan-wide with the
  repo's own `pnpm run typecheck`, which runs both programs. Caught by the critic reading the config,
  not by running the gate and believing a false pass.
- **Instruments were mutation-tested before their results were trusted.** QA's AC7 sweep predicate
  was falsified twice by its own positive controls — v1 *"matched **none** of the plan's four named
  violators … Discarded, not patched"*; v2 missed row 14 — and a third defect (generics-stripping that
  blinded the classifier to a planted `n > 10`) was caught by the planted control rather than by
  reasoning. QA's rule for this deserves to outlive the chain: **"a new instrument is mutated before
  its result is trusted."**
- **UAT refused two available substitutes rather than close a row cheaply.** With no browser tooling,
  it declined to close BC-9 with a jsdom mount (*"BC-9 exists precisely because the mounted-tree
  instrument cannot see `react-toastify` … closing BC-9 with that instrument would be circular"*) and
  declined to substitute reading the source. It then reasoned asymmetrically about what the absence of
  complaints could and could not evidence. That is a gate declining to manufacture its own evidence.
- **The classifier block was reported, not routed around.** Devops's release attempt was denied; the
  document states *"This was not retried, rephrased, split into smaller commands, or routed through
  another tool or another session. A control retried until it passes is not a control,"* and names the
  equivalent command it deliberately did **not** try. Steering's own subsequent attempt was blocked
  too and also reported. The release ran once, unchanged, on the owner's explicit sanction.

### 5.4 Record discipline

- **The plan's `Revision` field and its changelog agree.** 17 numeric revision rows against a
  `Revision: 17` field, with 11 `R-n` registration rows counted separately — measured here. Chain
  012's equivalent read 39 against 49 and is still an open question against the planner. Whatever the
  pairing rule is, chain 014 applied it consistently; the rule remains undocumented (§7.4).
- **Corrections are dated and appended, never overwritten.** The deployment record's serving-state
  section preserves what it said before the owner's attestation arrived and says why the earlier text
  was *"superseded by his attestation, not corrected by it."* The QA document's UAT-1 note
  disambiguates two `BC-7` rows without renumbering either, on the stated principle that *"a record is
  corrected by its author with a dated reconcile note, not overwritten by a consumer."*
- **Handoffs were lodged before the deletes they justify.** Row 43's handoff (`c5e1d59`, 00:34:55)
  precedes its delete commit (`62b61bd`, 00:37:31) by 156 seconds — the plan's risk row *"Deleting a
  pin loses the only record of a real bug"* had its falsifier checked, and it did not fire.

## 6. What Didn't Go Well (process focus)

### 6.1 The chain's dominant defect: acceptance instruments written before the artefacts they measure

This is one cause with **three recorded members**, and the plan's own risk table tracked it:

| Member | Instrument | What it got wrong | When it surfaced |
|---|---|---|---|
| rev 14 | AC4 positive-form module anchor `^[a-z]` | Rejected **13 conforming** PascalCase component modules — contradicting axiom (C)'s own definition of `<module>` | M5 step 2, at the *first* `.test.tsx` files ever to exist |
| rev 15 | M5 step 5 alias-only production-import grep | Rejected **3 conforming** files whose only production import is relative | M5 step 5, on M4c's new colocated convention |
| rev 17 | AC2 identity instrument | Names as identity a column authored by the hand it measures — unfalsifiable by replay | QA Phase 2, at the only moment it could be attempted |

The plan states the shared cause itself: *"rev 3's instruments were written before any `.test.tsx`
existed and never exercised against the shape M4c introduces."* The implementer states the
consequence: these defects passed *"unnoticed through critique, code review, and Phase 1."*

**The process gap is not that the instruments were wrong — it is that nothing in the workflow tests an
instrument against an example of the shape it will have to judge.** Every gate reviewed the
instruments as *prose*. Three gates read `^[a-z]` and none of them ran it against a PascalCase
filename, because at review time no such filename existed anywhere in the repo. QA's own discipline —
mutate a new instrument before trusting its result — is exactly the missing step, and QA applied it
to its *own* sweep predicate while nobody applied it to the plan's acceptance predicates.

### 6.2 Workflow bottlenecks

- **Five run-length-ceiling interruptions inside one implementation stage.** M4b hit the ceiling at
  `62b61bd` (3/10 rows); M4c was resumed four times. Each resumption required an owner "Continue".
  The chain handled this well — same session, compacted and continued, and the implementer even
  corrected steering's mistaken expectation of a fresh spawn — but it is the single largest source of
  owner interruptions in the chain.
- **Owner-spawns-everything (D10) plus a nine-stage pipeline is a lot of owner turns.** The rulings
  file records the owner spawning or approving at least twelve distinct points: QA, analyst,
  implementer continuation, critic waiver, code-reviewer, UAT, devops, release approval, release
  retry, row-19 routing, AC8 disposition, the UAT-1 note author. The chain also added rules
  mid-flight to reduce this (spawn cues become blocking selection prompts; the `seam-notify` script),
  which is the right direction — but the rules arrived *during* the chain rather than before it.
- **The rider reversal cost four hops for two test files.** Rows 9 and 12 were found by the
  implementer outside every repair list → planner registered D18 (*"we can just drop the rider"*) →
  owner reversed to D19 on learning the planner was still live (*"We can include it then if the
  critic miss isn't a problem"*) → planner read that as conditional and asked → owner waived
  (*"Yes, skip the critic"*) → riders opened. Both riders then landed cleanly. The round trip came
  from a genuine ambiguity in a conditional phrasing, and the planner was right to ask rather than
  assume — but the ledger cost is four owner turns and three plan revisions for two files.

### 6.3 Quality gate gaps

- **The M2 code review could not have detected a broken harness, and said so.** At `988ca15` **zero
  `.test.tsx` files existed**, so the dom project collected nothing and the milestone's own "exit 0"
  evidence covered the node half only. The reviewer logged this as I-1 and discharged it by building
  an independent probe with five negative controls — good — but the structural point stands: **a
  milestone that installs a capability was accepted before anything used the capability.** The plan
  carried it forward honestly ("the harness's own behaviour is exercised in M4c and stays open there")
  and M4c did close it, with 15 rows mounted under jsdom.
- **QA-3: a row promoted across sections inherited the section's schema silently.** Row 47 was
  promoted from rename to oracle-repair but sits in M4a's 4-column block, which has **no
  seen-to-fail evidence column at all** — and AC6's designated instrument *is* that column. So AC6
  had no evidence for a row inside its own class. QA closed it by supplying the mutation itself
  (`% 6n` → `% 7n`, two cases red, restored, `git diff` empty). QA's generalisation is the finding:
  *"The generalisable defect is the section format, not the row … Any future row promoted from
  rename to repair inherits the same silent gap."*
- **UAT-1 was not theoretical — a duplicate register ID caused a real near-miss.** The register
  carried two distinct rows both numbered **BC-7**. The deployment record states the consequence
  plainly: *"`uat-hooks-014-2` concluded BC-9 was the last uat-owned row and nearly left
  **BC-7/row-19** unexecuted, exactly the failure the original UAT pass predicted when it found the
  collision."* Cause, in UAT's words: the Phase 2 pass *"minted from the last ID visible in its own
  table rather than from the register's enumerated maximum."* Fixed by disambiguation, not
  renumbering — correct — but the near-miss is the argument that this needs a rule.
- **The interchangeable-siblings class produced three members and no gate is looking for it.** The
  `hashMessage` L67 caveat (Phase 1), row 15's `embeds: {}` case that *"doesn't actually throw,
  contradicting its own title"*, and row 47's split-line self-oracle, green under the mutant that
  reddens its siblings. All three are cases that read as covered and assert nothing discriminating.
  Two were found by probing, one by mutation; none by any standing check.

### 6.4 Misalignment and shared-tree hazards

- **`git commit --only` swept another session's uncommitted hunk, and the disclosure is exemplary.**
  Commit `dd71313` pulled in a BC-9 line that `uat-hooks-014-2` had deliberately left uncommitted in a
  devops-owned file. The devops record names its own cause without hedging: it read `git diff
  --numstat` (`37 18`) but *"did not read the hunk list of its own file — and `git commit --only`
  isolates *files*, not *hunks*."* It did not revert the foreign hunk (correct — not its to revert
  any more than to commit) and repaired the record of authorship instead. The **fix pattern that
  followed is the reusable part**: for the next discharge, UAT delivered the line *as text* for
  devops to place, *"so nothing was left uncommitted in a file it does not own."*
- **The classifier blocking a devops subagent is now at four instances across two chains.** Logged in
  the readiness record as a table: `devops-hooks-013` (2026-08-23), `devops-hooks-013-2`
  (2026-08-25), `devops-hooks-014` (2026-08-27), plus steering's own blocked first attempt. Every
  block was correctly reported rather than worked around; the cost each time is a handoff and round
  trips. The record's own proposed remedy — *"a sanctioned block is performed by the steering thread
  and never handed back to the blocked agent"* — is a process change, not a control weakening, and is
  the owner's to accept or decline.
- **The lockfile "purely additive" claim** (code review M-1) was produced by a piped `grep -c` over a
  diff and read 0 removed lines against a true 328/7 — re-derived independently here as **328 added,
  7 removed**. This is the workspace's standing rtk hazard landing again, in a stage that knew the
  rule. Plan rev 10 responded by widening the plan's instrument note from one shape (`| wc -l`) to
  the whole class — *"no count, match or existence predicate over piped output"* — which the reviewer
  itself called *"a stronger disposition than this finding asked for."* Right response.

## 7. Findings this retrospective made

These are not carried from a chain document. They were found by reading the record against
instruments the chain did not run.

### 7.1 The chain's code review declared `system-architecture.md` absent — the fourth such false absence, and the prescribed remedy is what failed

The code review's Architecture Alignment section reads:

> **System Architecture Reference**: `agent-output/architecture/system-architecture.md` — **does not
> exist.** … `$ ls -d /usr/local/bin/hooks/agent-output/architecture/system-architecture.md` /
> `ls: cannot access '...': No such file or directory` … **Alignment Status**: **NOT ASSESSABLE
> against a system architecture document** — there is none. … This absence was **re-derived here**,
> not carried from the plan's own recorded absence.

**The claim is false.** Proved three ways, at this write: `git log --diff-filter=A` puts the file in
the init commit `fb99edd` (2026-08-23); `git log --diff-filter=D` on the path is **empty** — it was
never deleted; `git cat-file -e HEAD:architecture/system-architecture.md` succeeds. The file is
36.5 KB and present now.

**What makes this worse than a one-off.** The workspace's `hazards.md` already records that *"Code
review rounds 6, 7 and 8 each declared `agent-output/architecture/system-architecture.md` absent and
scoped their verdicts as architecturally ungrounded"*, and prescribes the remedy: *"For existence,
use `ls -d <path>`, `git cat-file -e`, or `git log --diff-filter` — never a filtered `ls` piped into
a matcher."* Chain 014's reviewer **used `ls -d`, the prescribed remedy, from the workspace root, and
recorded a false absence anyway.** Re-running that exact command from that exact cwd now returns the
file with exit 0.

**What I can and cannot say.** The claim is refuted. *Why* the reviewer's terminal produced that
output is **unverifiable by construction** — the session's actual output is not in the corpus, and a
filter fault, a transient condition and a transcription error are indistinguishable from here. What
*is* verifiable is the structural gap: **no gate cross-checks a negative existence claim against a
second instrument.** Four times now, a reviewer has under-claimed its own grounding and no downstream
stage caught it. A negative existence claim about a tracked path is the cheapest thing in this
workspace to double-check, and it is the one nobody double-checks.

### 7.2 The chain resolved an open Medium item on the architecture document's own Problem Areas list, and nothing updated it

`architecture/system-architecture.md` line 156 still carries, as a live Problem Area:

> | No CLAUDE.md / workspace self-description | Medium | Nothing in the tree states what the
> workspace is or which members are active; only `hooks.code-workspace` encodes it implicitly. |

**M1 of this chain closed exactly that.** `agent-output/CLAUDE.md` now carries the four-repo map and
the workspace self-description, symlinked at `/usr/local/bin/hooks/CLAUDE.md` (D15), and UAT verified
it auto-loads (flow F1, PASS).

The same document's line 144 is also now stale: it names the suite's coverage by two files —
`components-v2-data-layer.test.ts` and `mutual-exclusivity.test.ts` — **both renamed by this chain**
(to `componentsV2.data-layer.test.ts` and `utils.mutual-exclusivity.test.ts`).

**The process finding is not the staleness — it is that no stage owns it.** The plan correctly
recorded that `architecture/website.md` carries nothing on tests, and it does not; but it never
consulted `system-architecture.md`, which carries both a Tests line and the Problem Area this chain
closed. The plan's `Architectural surface: none` field then made it reasonable for every later stage
to skip architecture entirely, and the code review's false absence (§7.1) removed the last
opportunity. **A chain can close a Medium item on the architecture record and leave it standing,
because nothing in the workflow reconciles the architecture document at chain close.** This is the
substantive reason to route this retrospective to the architect.

### 7.3 A namespace collision between finding IDs and session names in the plan's own changelog

The plan's changelog refers eight times to **"QA-2"** — meaning the session `qa-hooks-014-2`. The QA
document's finding IDs are **QA-1, QA-3, QA-4**; there is no finding QA-2 (`grep -c "QA-2"` on the QA
document → **0**). So plan rev 16's sentence *"QA-2's two findings on the M5 sweep … withdrawn by
QA-2 after independent `grep -rc`"* reads, to anyone holding the QA document, as a finding ID that
does not exist.

This is not hypothetical: it misled a reader during this retrospective, who searched the QA document
for finding QA-2, found nothing, and correctly reported the absence rather than inventing content.
It is the **same class as UAT-1** — an identifier minted in one document colliding with a namespace
owned by another — and it strengthens the case that this class needs a rule rather than care.

### 7.4 Two small record-state observations

- **`verification/014/` reads as the chain's one open item.** `tools/check-repo.js --status` prints
  `chain 014 — 1 open, 10 closed`, the open entry being `verification` at `Status: Complete`. Its
  status is terminal; it simply has no `closed/` convention the tool recognises. Not a defect in the
  chain's work; recorded because a future reader will see "1 open" on a closed chain and wonder.
- **The `⚠ FAILING/BLOCKING` flag on the plan row is the known false positive**, 0-for-5 and already
  filed to `TODO.md`. Recorded so this retrospective is not read as a sixth sighting, and explicitly
  **not** to be "fixed" by rewording an accurate `Status-Detail`.
- **The `Revision`/changelog pairing rule is still undocumented.** Chain 014 applied it correctly
  (17 numeric rows, `Revision: 17`, 11 `R-n` rows counted apart) where chain 012 did not (39 vs 49,
  still open against the planner). Two chains of practice and no written rule is a rule waiting to be
  broken a third time.

## 8. Agent Output Analysis

### 8.1 Handoff chain

**Total documented handoffs**: **57** changelog rows carrying an explicit `from → to` across the
plan (28), implementation (19), QA (8), code review (6), critiques (8), analysis (3) and UAT (4).

**Handoff chain**: researcher (inventory) → steering (rulings) → planner → critic ⇄ planner ×4 →
analyst → planner → qa (Phase 1) → critic ⇄ planner ×2 (cycle 2) → implementer → code-reviewer ⇄
implementer → planner ⇄ implementer ×5 → qa (Phase 2) → uat → devops (Stage 1) → steering (release,
Mode B) → devops (record) → uat ×2 (post-deploy rows) → devops (closure) → retrospective.

| From | To | Artifact | What was requested | Issues |
|---|---|---|---|---|
| planner | critic | plan rev 2, 3, 5, 6 | cycle-1 passes | 16 findings pass 1; all resolved by rev 6 |
| planner | analyst | analysis | M2 "REQUIRES ANALYSIS" (a)–(e) | brief carried a wrong install mechanism (npm in a pnpm repo); analyst corrected it and did not execute it |
| planner | qa | QA Phase 1 | test strategy + adequacy, **before** implementation | BLOCK-1 (npm/pnpm) already resolved independently at rev 5 |
| planner | critic | plan rev 7, 8 | cycle-2 passes | reopened on the planner's own trigger; M-13/M-14/L-12 |
| planner | implementer | plan rev 6 + Phase 1 | execute M0→M5 | fixed sequence honoured; 5 ceiling resumptions |
| implementer | planner | rows 9, 12 | disposition for two self-found gaps | D18 → reversed to D19 → critic waiver; 4 hops |
| implementer | code-reviewer | M2 at `988ca15` | non-test diff review | 2 MEDIUM, 1 LOW; all fixed at `e6163fd` |
| implementer | planner | M5 steps 2, 5 | instrument defects, escalated not decided | rev 14 and rev 15 rulings |
| implementer | (qa) | E3b writeup | **session unreachable** | routed back to planner; deferred to the Phase 2 spawn cue |
| qa-2 | implementer | rows 12, 15, sweep | three unprompted cross-checks | two corrections landed, one withdrawn on the implementer's contradiction |
| qa | uat | Phase 2 verdict + BC-1…BC-9 | value validation | register carried a duplicate `BC-7` (UAT-1) |
| uat | devops | conditional approval | release decision | UAT-2: code-review `Status` stale |
| devops | steering | blocked release | owner decision | Mode B; steering also blocked; ran once on sanction |
| uat-2 | devops | BC-9, row-19 discharges | post-deploy rows | first delivered as an uncommitted hunk (swept); second as text (correct) |

**Handoff quality assessment.**

- *Clear and complete?* **Yes, with one material exception.** Briefs consistently named the consuming
  stage, the artefact, the revision and the SHA. The exception is the planner's rev-3 amendment to the
  analyst, which specified an install mechanism that does not exist in this repo — caught by the
  analyst, who declined to execute it rather than improvising, and recorded as the planner's error.
- *Context preserved?* **Yes, and re-derived rather than inherited at every gate.** QA Phase 2:
  *"Counts re-derived, not cited."* UAT: *"tree identity re-derived not inherited."* Code review:
  *"This absence was re-derived here, not carried."* — which is the right discipline even in the one
  case where the re-derivation was wrong (§7.1).
- *Unnecessary back-and-forth?* **Two chains, both defensible, one avoidable.** The rider reversal
  (4 hops) came from a genuinely conditional owner phrasing. The row-12 "E3b instrument gap" (3 hops)
  was avoidable: the planner relayed the implementer's characterisation without checking the
  mechanism, and said so — *"my error for carrying it unverified"*. **A relayed characterisation is a
  claim, and a stage that relays it owns it.**

### 8.2 Issues and blockers

**Total tracked**: **43** — 26 critique findings (M-1–M-14, L-1–L-12), 3 code-review findings + 3
INFO + 2 nits, 4 QA findings (BLOCK-1, QA-1, QA-3, QA-4), 3 QA instrument findings (INST-1–3), 2 UAT
findings, 9 blocking-condition rows (BC-1…BC-9, two of them numbered BC-7).

| Issue | Artifact | Resolution | Escalated? | Time to resolve |
|---|---|---|---|---|
| M-1–M-10, L-1–L-6 | critique c1 | Resolved at plan rev 3 | no | 5 min (`f15e106`→`f9bb15b`) |
| M-11 (exit-code observable only at M2) | critique c1 | Adopted **plan-wide** at rev 6 | no | ~2 min |
| M-12 (`tsc --noEmit` blind to tests) | critique c1 | Instrument replaced with `pnpm run typecheck` | no | ~2 min |
| M-13/M-14 (row 13 double-owned) | critique c2 | Resolved rev 8; corroborated by QA-1 | no | 2 min |
| BLOCK-1 (npm in a pnpm repo) | qa Phase 1 | Resolved at rev 5, independently | **yes** (blocking) | resolved before it fired |
| QA-1 (partition invariant broken by rev 7) | qa | Closed at rev 8 on five limbs | no | ~2 min |
| QA-3 (row 47 has no evidence column) | qa | QA supplied the mutation; cell owed to implementer | no | in-pass |
| QA-4 (non-discriminating sibling) | qa | Confirmed vacuous, non-blocking | no | in-pass |
| CR M-1 (false "purely additive") | code review | Reconcile notes; true 328/7 | no | 13 min |
| CR M-2 (dead `resolve.alias`) | code review | Structural fix, control C3 | no | 13 min |
| Rows 9/12 rider | implementation | D18 → D19 → waiver → both landed | **yes** (owner ×3) | ~10 min |
| AC4 anchor rejects 13 files | implementation | Escalated; plan rev 14 | **yes** (planner) | ~5 min |
| M5 step-5 predicate rejects 3 files | implementation | Escalated; plan rev 15 | **yes** (planner) | ~5 min |
| Release act blocked by classifier | readiness | Reported; owner chose Mode B | **yes** (owner ×2) | ~6 min |
| UAT-1 (duplicate BC-7) | uat | Reconcile note, no renumbering | **yes** (owner: who writes it) | ~59 min |
| UAT-2 (stale `Status`) | uat | Discharged at devops closure | no | ~10 min |
| BC-7/AC8 | register | **Open by owner ruling**; next chain closes it | **yes** | open |
| BC-7/row-19 | register | EXECUTED — NOT REACHABLE (expected); handoff stands | **yes** | ~86 min |
| BC-8 | register | Terminal **as** the lodged handoff | **yes** | ~53 min |
| BC-9 | register | EXECUTED — both limbs PASS | **yes** | ~17 min |

**Pattern analysis.**

- **Most common issue type: an instrument that does not measure the criterion it is attached to.**
  Counting across documents: M-11, M-12, INST-1, INST-2, INST-3, AC4's anchor, M5 step 5's grep,
  AC2's identity column, CR M-1's piped grep, QA's three sweep-predicate failures, the code
  reviewer's own comparator reporting 100% drift on identical trees, and the false architecture
  absence. **Thirteen instrument defects, versus roughly a dozen substantive findings about the work
  itself.** In this chain, the instruments were harder than the work.
- **Escalation was appropriate and, if anything, slightly over-used.** Every escalation reached
  someone who could decide; none was a stage asking permission for something already ruled. The two
  M5 instrument escalations were textbook — the implementer had a fix in hand, proposed it, and
  waited rather than editing the plan's acceptance criteria itself.
- **Did early issues predict later ones? Yes, and the record says so.** The critique's cycle-1 class
  *"an acceptance instrument contradicts the criterion it measures"* (16 members at rev 2) predicted
  rev 14, rev 15 and rev 17 exactly. The prediction rows in the plan's Risks table were *used* — each
  new member was recorded against the standing row rather than filed as a fresh surprise. **That
  mechanism worked and should be kept.**

### 8.3 Artifact update frequency

| Document | Commits | Changelog rows | Lines | Reading |
|---|---|---|---|---|
| plan | 31 | 28 | 262 | 17 revisions + 11 registrations; the chain's spine |
| implementation | 14 | 19 | 813 | per-milestone appends, batched to limit churn |
| disposition table | 20 | — | 201 | appended per row as dispositioned, never reconstructed at M5 |
| steering rulings | 28 | — | 139 | one commit per owner ruling |
| qa | 8 | 8 | 924 | two phases, four re-anchors on plan revisions |
| critique c1 + c2 | 5 + 8 | 5 + 3 | 196 | one commit per pass |
| code review | 6 | 6 | 469 | one round + fix sub-entry + two consumption rows |
| uat | 4 | 4 | 440 | verdict + two post-release execution addenda |
| deployment + readiness | 6 + 4 | — | 974 | two-stage split |
| analysis | 3 | 3 | 445 | write, consume, close |

**Additions vs corrections.** Of the plan's 17 numeric revisions, **8 are corrections to the plan's
own instruments or dispositions** (rev 3's install withdrawal, 12's E3b withdrawal, 13's carve-out
proviso, 14's anchor, 15's predicate, 16's prediction records, 17's AC2 defect, plus rev 8's
partition repair) and 9 are forward scope work. **Roughly half the planning effort after approval was
spent repairing the plan's own measuring apparatus** — which is the quantitative form of §6.1.

**Planning-gap indicators.** The revisions cluster in two bursts: rev 2–8 before implementation
(critique- and QA-driven, healthy) and rev 10–17 *during* M4c/M5 (instrument-driven, the gap). The
second cluster is the one a future chain should try to eliminate, and §9.1 is how.

## 9. Recurring classes carried to this retrospective

The chain routed five classes here by name. Each is stated below with its members and its disposition
as a candidate process rule. Under **D7**, the "audit existing tests" rule and the instrument lessons
reach agent definitions through pi, not through in-chain definition edits.

### 9.1 Acceptance instruments unexercised against the shape they must judge — 3 members

Members: AC4's `^[a-z]` anchor (rev 14), M5 step 5's alias-only import grep (rev 15), AC2's
self-authored identity column (rev 17). Cause stated by the plan and by the implementer: written
before any `.test.tsx` existed; passed unnoticed through critique, code review and QA Phase 1.

**Candidate rule.** *A chain that introduces a genuinely new artefact shape budgets a step, before
the acceptance sweep, that runs each written acceptance predicate against one real example of the new
shape and one real counter-example.* The implementer proposed this in its own words; QA already
practises it on its own instruments (*"a new instrument is mutated before its result is trusted"*).
The gap is that nobody applies it to the **plan's** predicates. Owner of the step: the implementer at
the first milestone that produces the new shape; the planner writes the step into the milestone.

### 9.2 Interchangeable siblings that are not — 3 members

Members: the `hashMessage` L67 caveat (Phase 1); row 15's `embeds: {}` case whose title claims a
throw that does not happen; row 47's split-line self-oracle, green under the mutation that reddens its
siblings. All three read as covered and discriminate nothing.

**Candidate rule.** *Where a test file's cases are siblings over one surface, the seen-red evidence
names which cases the mutation reddened and which stayed green — and a sibling that stays green under
every mutation of its own surface is reported, not assumed redundant.* This is a strengthening of
axiom (A) at the file level rather than the case level, and it costs nothing: the mutation runs are
already being done, only the per-case outcome is being discarded.

### 9.3 Register ID minting across multi-pass documents — 2 members

Members: UAT-1's two `BC-7` rows, which caused a real near-miss (*"nearly left BC-7/row-19
unexecuted"*); and §7.3's `QA-2`/finding-ID collision in the plan's changelog.

**Candidate rule.** *An ID minted into a register is minted from the register's enumerated maximum,
not from the last ID visible in the minting pass's own table; and a session name is never written in
a form that matches a finding-ID pattern.* UAT's diagnosis is already precise enough to encode. Note
the corollary the chain got right and should keep: **a collision is repaired by a dated
disambiguation, never by renumbering rows other documents already cite.**

### 9.4 A row promoted across sections inherits the section's schema silently — 1 member

Member: QA-3, row 47 promoted from rename to oracle-repair into a 4-column block with no evidence
column, so AC6 had no instrument for a row inside its class.

**Candidate rule.** *A table whose sections carry different schemas states, per section, which
criteria that schema can evidence; a row moved between sections is re-checked against the destination
schema.* Cheaper alternative worth considering: one schema for the whole table with "not owed"
written where a cell does not apply — which is exactly the convention this chain's disposition table
already adopted for its main section (*"an empty cell is never ambiguous between 'not owed' and 'not
yet done'"*) and failed to extend to the M4a block.

### 9.5 Count, match and existence predicates over filtered output — 2 members this chain, many before

Members: the lockfile `grep -c '^-'` false zero (CR M-1, true 328/7 — re-derived here); the M5 sweep
read through a `grep -n` pattern that did not contain the word it was looking for, turning *"absent
from the filtered view"* into *"absent from the file"* and publishing two false findings, both
withdrawn on contradiction.

Plan rev 10 already widened the rule from one shape to the class. **What this retrospective adds is
§7.1**: a false *existence* claim survived four times across two chains, produced on the fourth
occasion by `ls -d` — one of the three instruments the hazards file prescribes as the remedy. The
class rule is therefore necessary but not sufficient.

**Candidate rule.** *A negative existence claim about a tracked path is not publishable on one
instrument. It carries a second, and at least one of the two computes in git (`git cat-file -e`,
`git log --diff-filter`).* This is the cheapest rule in this document to follow and has the longest
record of being needed.

### 9.6 Two more, added by this retrospective

- **Self-recorded clock times drift forward and must not be trusted (§3.2).** *Candidate rule: a
  changelog row's timestamp is anchored to an external event — the commit that carries it, a push, a
  probe — or it is omitted. A stage does not narrate elapsed time.* Three of six timestamping stages
  recorded events after their own final write, by up to 3 h 31 m.
- **Nothing reconciles the architecture document at chain close (§7.2).** *Candidate rule: a chain
  whose work closes or invalidates a line in `architecture/` says so in its deployment record, and the
  architect is the named consumer.* Chain 014 closed a Medium Problem Area and stale a coverage line,
  and both still stand three days later.

## 10. Value delivery

**Objective achievement, against the value statement's own clauses:**

| Clause | Delivered | Evidence |
|---|---|---|
| suite audited against a written standard | **YES** | 48/48 inventory rows dispositioned; every baseline and final file named in the record (§4.2) |
| junk classes dispositioned | **YES** | H1/H4/H5/H6/H7/H9/E1/E3a/E3b classes cleared; 40 cases of source-text and third-party-text assertion deleted |
| per-deletion proof that no coverage was lost | **YES**, and now independently audited | §4.3's ledger closes exactly at −51; every deletion names a covering test, a supersession, or an Outstanding Item |
| the standard living in `/usr/local/bin/hooks/CLAUDE.md` | **YES** | canonical at `agent-output/CLAUDE.md`, symlinked (D15); UAT flow F1 PASS |
| the next chain cites the standard | **OPEN by owner ruling** | AC8/BC-7 — *"Why would I wait (1) instead of firing it now (2)?"*; closed by the next planner's first citation |

**Cost.** 6 h 53 m wall clock; 126 `agent-output` commits and 40 `website` commits; nine stage
sessions plus two continuations; roughly twelve owner turns. **Zero production files changed** —
independently re-derived here — so the release's blast radius was never larger than the test suite,
which is why the four post-deploy rows could gate closure without gating the release.

**Was it worth it?** The chain's own product is not the 51 deleted cases; it is the standard plus a
worked example of applying it. The standard is now the workspace's auto-loading `CLAUDE.md`, and the
suite it governs went from 48 files teaching memorial/ID-named/source-text patterns to 51 files that
mount real components. The pilot also produced the thing pilots are for: **a list of the workflow's
own defects, each with a member count** — which is what §9 hands to pi. On that reading the answer is
yes, and the second chain (Statbot, D1/D5) should be materially cheaper because §9.1–§9.6 are now
written down.

## 11. Recommended process improvements

Ordered by expected value. All are candidates for pi under **D7**; none is applied here, because this
document edits nothing outside `retrospectives/`.

1. **Exercise acceptance predicates against a real example of any new artefact shape before the
   acceptance sweep** (§9.1, 3 members). Highest value: it is the single cause behind half of this
   chain's post-approval plan revisions.
2. **Require a second instrument for any negative existence claim, one of them computing in git**
   (§9.5, §7.1, 4 instances across two chains). Cheapest to adopt; longest record of being needed.
3. **Anchor changelog timestamps to an external event or omit them** (§9.6, §3.2, 3 of 6 stages
   affected). Without this, every future retrospective's timeline analysis is unsound.
4. **Mint register IDs from the register's enumerated maximum; never write a session name in a
   finding-ID shape** (§9.3, 2 members, one real near-miss).
5. **Name the architect as the consumer of any chain that closes or invalidates an `architecture/`
   line, and say so in the deployment record** (§9.6, §7.2).
6. **Record per-case mutation outcomes, not just per-file** (§9.2, 3 members) — the runs already
   happen; only the discriminating detail is discarded.
7. **State per-section schema capability in multi-schema tables, or use one schema with "not owed"**
   (§9.4, 1 member) — the chain already invented the right convention and under-applied it.
8. **Consider: a sanctioned classifier block is executed by the steering thread and never handed back
   to the blocked agent** (§6.4, 4 instances). This is the owner's call, not a stage's — it changes
   who performs a gated act, and is offered as a proposal, not a recommendation to adopt unread.
9. **Document the `Revision` / changelog-row pairing rule** (§7.4). Two chains of practice, one
   past divergence, no written rule.

**Deliberately not recommended.** Nothing about spawn policy (D10), stage-to-stage contact (D11/D17),
or the seam-notify mechanism: all three were set by owner ruling *during* this chain and are working
as ruled. Nothing about the roadmap. Nothing about `check-repo.js`'s `FAILING` flag, which is a known
false positive already filed and must not be "fixed" by rewording an accurate `Status-Detail`.

## 12. Status and next

**Chain 014 is closed.** Every numbered stage document is at a terminal status in `closed/`; all four
post-deploy-observable register rows are terminal; the two handoffs this chain lodged
(`message-init-cached-edits-lost-2026-08-27.md`, `newmessagemodal-persist-gate-choice-unreachable-2026-08-27.md`)
stand `Open` **by design** — BC-8's terminal state *is* its handoff, and row 19's product fix is out of
charter under D2. Neither is an unclosed chain item.

**This document's Status is `Active`**, which is its resting state. The **pi** subagent closes it
after extracting the process improvements in §9 and §11; pi runs on the owner's command only.

**Owed to the owner, and only to the owner** (owner-only fields and product direction, not stage
decisions):

- **§9.5 / §7.1** — the prescribed existence-check remedy failed on its fourth outing. Whether
  `hazards.md` gains the two-instrument rule is a change to a file the owner owns.
- **§6.4** — whether a sanctioned classifier block is performed by steering rather than handed back.
- **Row 19's product gap** (`NewMessageModal`'s persist-gate choice UI unreachable through Save) —
  a product-direction question the chain correctly refused to answer under D2.
- **§7.2** — whether the architecture document is reconciled now or at the next architecture pass.

**Recommended next subagents**, in order:

1. **architect** — §7.2 is a live architectural-record defect this chain caused and did not close:
   one Problem Area resolved but still listed, one coverage line naming two files that no longer
   exist. It is the only finding here with a concrete, already-identified edit.
2. **pi** — to extract §9 and §11 into agent definitions under D7, and to close this document.
3. **planner** — §9.1's rule belongs in the planning stage: the milestone that introduces a new
   artefact shape carries the step that tests the acceptance predicates against it.
4. **roadmap** — once this retrospective is closed, and noting that AC8/BC-7 stays open until the
   next chain's planner cites `agent-output/CLAUDE.md`; one citation closes it.
