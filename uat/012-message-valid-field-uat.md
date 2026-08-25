---
ID: 012
Origin: 012
UUID: 12a4fe3c
Parent: message-valid-field-for-statbot-2026-08-23.md
Verified-At: >-
  Re-derived from the tree 2026-08-25 by the Addendum 5 pass, not carried forward. `website`
  `c85945f` — chain 012's verdict tip, now an **ancestor of `master`** (`git merge-base
  --is-ancestor c85945f HEAD` → true), with the working tree on `master` at `a74b9e2`, clean
  (`git status --porcelain` → 0 lines, counted with `grep -c`, never through a filtered pipe).
  `project-utils` `749606d` on branch `chain/012-message-valid-field`, and `749606d` is an ancestor
  of `origin/master` (verified). **Corrects this field's earlier text**, which named `website`
  `chain/012-message-valid-field` as the branch carrying `c85945f`; the released content is on
  `master` and the branch statement had gone stale — the SHA under verdict is unchanged. Both
  populations committed, so the content-identity fallback is NOT constructed and no manifest is
  owed — that fallback exists only for uncommitted content. **Any change to production code after
  this expires the code-review verdict, the QA verdict, and this release decision with them.**
Status: Active
Status-Detail: >-
  UAT Complete. **APPROVED FOR RELEASE — UNCONDITIONAL** (2026-08-25). The 2026-08-23 conditional
  approval is **DISCHARGED**: all **20** blocking-condition rows are terminal — **16 EXECUTED, 4
  SUPERSEDED**, and none left standing in the un-executed state that blocks an unconditional
  approval — with ten terminalised on the owner's own directed observations and QA-R19 on QA's
  instrument. (Phrased to state the absence rather than name the state: `check-repo.js` pattern-matches
  this field, and the literal term inverts there. See U-12.) Verdict identity reproduced from the tree this pass: `website`
  `c85945f` (ancestor of `master` `a74b9e2`) and `project-utils` `749606d` (ancestor of
  `origin/master`); both committed, no manifest owed. **Any change to production code expires the
  code-review verdict, the QA verdict, and this release decision with them.** Value Statement
  delivered on every clause — both directions of the field observed in production through the v1 API
  Statbot reads. D20's hold is withdrawn (D22) and Addendum 4 is spent; **Addendum 5 is the current
  ledger and supersedes every earlier row-state table.** **The register no longer blocks chain
  closure.** Two owner acts remain, neither a register condition and neither one this decision
  depends on: the live declaration to statbot (which by D12 also releases statbot chain 023, held
  since 2026-08-23 with no session told) and the repair-guidance send — **UAT's own hold on that
  send is lifted**, D26 unreopened. Recorded unverified, not covered: plan Risks R7 (silent class,
  no instrument by construction, accepted by the owner at QA-R9), QA-R20's empty-but-unguarded
  whitespace class, QA-R19's open bound, D24's accepted fourth-shape risk, and the JSON-Load
  fallback (U-6). `Status` stays **Active** — devops closes this document after the release is
  recorded complete.
---

# UAT Report: Plan 012 — `valid` field on stored messages

**Plan Reference**: `agent-output/planning/012-message-valid-field.md` — **rev 29 (`272fbb7`) is
the revision this pass reviewed**. Rev 30 is this stage's own registration write recording the
verdict below (see the changelog), so the rev-29 citation is the reviewed revision, not staleness.
**Code Review Reference**: `agent-output/code-review/012-message-valid-field-code-review.md` (round 7, `06b204d`)
**QA Reference**: `agent-output/qa/012-message-valid-field-qa.md` (rev 7, `cc3763a`)
**Implementation Reference**: `agent-output/implementation/012-message-valid-field-implementation.md` (`35cd23b`)
**Contract**: `agent-output/handoff/message-valid-field-for-statbot-2026-08-23.md` (UUID 61f24e56)
**Date**: 2026-08-23
**UAT Agent**: Product Owner (UAT)

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-08-23 | steering-hooks-012 (carrying QA PASS at `c85945f` and code review round 7) | Validate value delivery against the plan's Value Statement; consume the chain's blocking-condition register; issue a release decision | **UAT Complete. APPROVED FOR RELEASE, CONDITIONAL.** Value Statement delivered in mechanism at `c85945f`; delivery *in effect* depends on owner-executed DDL/backfill/declaration. Register consumed: 6 rows terminal, 14 outstanding with owners and terminal states named. Three findings recorded (U-1 R7's silent class has no instrument; U-2 `49f2bf1`'s commit message carries a superseded claim devops must not inherit; U-3 two devops obligations found outside the register, folded in). |
| 2026-08-23 | steering-hooks-012 (relaying owner ruling D20) | Record the hold | **Owner ruled, verbatim: "This effort is on hold until the fixes are implemented."** — plan **D20** (rev 34, `827dfb0`), verified at source. Whole chain held, not closure alone. **No row changes state**: ten remain outstanding, none withdrawn; a hold stops work but does not terminalise conditions. `Status` kept **Active** deliberately — `Deferred` would archive a ledger with ten live rows. Addendum 3's routing of the no-review-trigger fact to the retrospective is **reconciled, not overwritten**: that stage is itself held, so the fact and four other retrospective-bound observations are relocated into this document to survive. Cross-workspace consequence recorded: the live declaration is inside the hold, so by D12 statbot chain 023 is held too — not acted on; informing that side is the owner's call and unmade. |
| 2026-08-23 | steering-hooks-012 (relaying owner ruling D19) | Record the owner's ruling on U-5 | **Owner ruled option (c), verbatim: "Leave them open"** — registered as plan **D19** (rev 32, `a50e75d`), verified at source. QA-R4 and QA-R15 stay **`NOT EXECUTED`**: neither re-specified nor withdrawn. UAT's recommendation (a) not taken; recorded, not re-litigated. **What changes is why they stand open — by ruling, not by oversight; what does not change is that `NOT EXECUTED` is not terminal**, so both remain in this register and **chain closure stays blocked**, the stated consequence he accepted with the ruling. Noted: D19 sets no review trigger, so nothing schedules a re-read — recorded as a fact, not promoted into an instruction, and named for the retrospective. Release decision unaffected. |
| 2026-08-23 | steering-hooks-012 (relaying the owner's walkthrough round 1) | Record M6-c, QA-R2, QA-R4, QA-R15 results against their predictions | **M6-c EXECUTED PASS** (both sentinels). **QA-R2 EXECUTED PASS** — `valid: false` at top level; payload also establishes 5712 as cell B5 / guidance shape (i) from production. **QA-R4 and QA-R15 NOT EXECUTED** — the owner cannot load 5712 in the composer, so both were attempted against an imported copy whose state is unverifiable by his own account; neither a pass nor a fail is available, and the rows stand open. Two findings raised: **U-5** (HIGH — the two 5712-keyed rows may be unexecutable by anyone: a specification defect, not a pending task; RECOMMEND re-specification via QA, with owner WITHDRAWN as the alternative and its cost stated) and **U-6** (HIGH — the owner's report that the JSON view may not support V2 and may strip content is a candidate falsifier for plan Risks R6, and bears on QA-R19 guidance shape (i), which is 5712's own shape). Release decision unchanged and correctly discharged; **chain closure blocked**. |
| 2026-08-23 | uat (self-recorded) | Registration write into the plan, per this stage's Status-tracking remit | Plan `Status` → **UAT Approved**, Revision → 30, one registration changelog row, and the stale Status-Detail clause `Next gate: UAT (clear to start)` replaced (a declarative surface, corrected by replacement). **A registration write only** — no body text, criterion, milestone, register row or Risks row touched, and no prediction record written (those are the planner's). **Not committed by this stage**: CLAUDE.md's commit exception covers only the document a stage itself produced, and the plan is the planner's. Routed as a blocking question; **owner ruled 2026-08-23, verbatim: "The planner commits it."** — relayed by steering-hooks-012. The ruling settles *who* commits, not whether the content is sound; that judgement remains the planner's. |
| 2026-08-25 | steering-hooks-012-2 (carrying the owner's ten observations, given directly to it 2026-08-25, plus rulings D22–D28) | Record the owner's observations into the ledger and take chain 012 to a release decision | **UAT Complete. APPROVED FOR RELEASE — UNCONDITIONAL.** The 2026-08-23 conditional approval is **DISCHARGED**: all **20** register rows terminal (**16 EXECUTED, 4 SUPERSEDED, 0 NOT EXECUTED**). Ten terminalised on the owner's own directed observations against pre-registered predictions — QA-R2/R4/R15 on SCR-1 in the prescribed order R4 → R2 → R15, plus R3, R5, R6, R7, R8, R9, R20; QA-R19 terminalised on QA's instrument (17/17 green, `a74b9e2`). Value Statement delivered on every clause, both directions of the field observed in production through the v1 API. Prior findings terminalised: **U-4 WITHDRAWN** (D24), **U-5 CLOSED** (D23 took UAT's own Preferred recommendation; discharged by execution), **U-6 DISCHARGED for the send** (D25 removed the JSON route from the guidance) with the underlying hypothesis routed to plan Risks R6. **UAT's hold on the QA-R19 send is LIFTED** — both its grounds are gone; this records the dissolution of this stage's own hold and is **not** a new condition, D26 unreopened. Five new findings, none holding the tree: **U-7** (QA-R11's tail precedences not yet decidable — devops, trigger: the live declaration), **U-8** (QA-R5/R6 underspecified; owner's pass terminal, rows not reopened), **U-9** (QA-R19's bound recorded not closed), **U-10** (QA-R9/R20 pinned to the only backfill run with a denominator — 4825 of 4825, read from file bytes), **U-11** (SCR-1 undisposed; no gate). Chain closure no longer blocked by the register; two owner acts remain — the live declaration (which by D12 also releases statbot chain 023) and the guidance send — **neither a register condition and neither one this decision depends on**. Recommended version: **minor** (additive API contract growth). Deltas from the brief resolved against the register, not the brief: R19, R10/R11/R17 all already terminal. |
| 2026-08-25 | steering-hooks-012-2 (asking UAT to set a terminal `Status`) | Set the frontmatter `Status` to a terminal value for a completed unconditional approval | **`Status` DECLINED, and the reason checked against the mechanism rather than argued from prose.** UAT has no terminal status of its own: the lifecycle vocabulary offers only `Committed`/`Released`/`Abandoned`/`Deferred`/`Superseded`/`Resolved`, the skill's own table assigns UAT closure to **DevOps**, and **every one of the ten closed UAT documents in this repo carries `Released` or `Committed`** — chain 013's was set in the single devops closure commit `229d63c` alongside seven sibling documents. Setting one here would claim a devops act that has not happened, and would trigger the close procedure on a chain still awaiting two owner acts. **`Status` stays `Active`; the verdict lives in `Status-Detail`, where it already reads UAT Complete / APPROVED UNCONDITIONAL.** The stated ground for the request was also checked and does not hold: `check-repo.js` does **not** flag `Active` — its `FAILING` regex has no such alternative. **But checking it found a real defect, self-inflicted, now fixed: U-12.** This document's own `Status-Detail` said *"0 NOT EXECUTED"*, which the regex matched on `NOT[ _-]EXECUTED`, so **the clause reporting that nothing is blocked rendered the chain's UAT line as `FAILING/BLOCKING`.** Field reworded to state the absence rather than name the state; flag verified gone from file bytes. Same class reported not fixed: the **planning** document flags for the same reason (`REJECTED`, from closed review rounds 1–2) — the planner's document, and D18 forecloses touching it. No row state, finding or verdict changed by this round. |

---

## Value Statement Under Test

Copied verbatim from plan rev 29, "Value Statement and Business Objective":

> As the owner of hooks.gg and Statbot, I want stored hooks.gg messages to carry a machine-readable
> `valid` field — computed from the composer's own send checks, recomputed on every save, and
> backfilled across all existing records — so that Statbot can refuse messages hooks.gg already
> knows cannot be sent, instead of revalidating on its own side or attempting a send that fails.

The owner's framing, verbatim (2026-08-23, carried from the handoff):

> "Let me phrase it this way, validation for compliance is on hooksgg. Statbot should not be
> concerned with revalidating that which should not have been broken in the first place."

> "Right now, there's no way for hooksgg to communicate that a message is invalid. I think I need
> to pause this effort while I add a `valid` field to messages that Statbot can key off of."

**The gap is communication, not validation** (handoff, verbatim): "hooks.gg already knows which
messages cannot be sent; it just has no machine-readable way to say so."

---

## Tree Identity — Reproduced, Not Inherited

Per document-lifecycle, "Verdict Identity on Uncommitted Trees", this pass re-derived the identity
from the tree rather than accepting the predecessors' or steering's statement of it.

| Check | Method (computed before the output filter) | Result |
|---|---|---|
| website HEAD | `git rev-parse HEAD` | `c85945f2e847d1a9d0655fdc8f2dbad194e566a9` |
| website tree clean | `git status --porcelain` → file, `wc -l` | 0 lines — clean, no foreign file in scope |
| `c85945f` delta from `17cada0` | `git diff --numstat 17cada0 c85945f` | 2 files, both `__tests__`: `+59/-0` and `+189/-0`. **Zero production source, zero deletions** |
| project-utils release commit | `git merge-base --is-ancestor 749606d origin/master` | true — `origin/master` = `749606d`; the push happened |
| website not yet deployed | `git merge-base --is-ancestor c85945f origin/master` | false — `origin/master` = `72dc7de`, the chain base |

**Consequence for the verdict chain**: both populations under verdict are committed, so the
per-path content-identity manifest is not owed. The code-review verdict (`APPROVED_WITH_COMMENTS`,
round 7) and the QA verdict (`PASS`, rev 7) both name `c85945f`, and this decision is reached at
`c85945f`. **A change to any production-source blob expires all three.**

**No deploy has run ahead of this gate.** `origin/master` on `website` is still the chain base, so
the ordering is the sanctioned one and document-lifecycle's retroactive-deploy recovery path does
not apply. The repository auto-deploys on push to master, so **"before merge" and "before deploy"
are the same instant** — every pre-release condition below is due before the merge, not after it.

### One figure this pass declined to inherit

Three suite counts were circulating and I was briefed not to adopt any without seeing which tree it
names. Verified at QA rev 7 and code review round 7, which agree and reconcile arithmetically:

| Figure | Tree it names |
|---|---|
| 20 files / 402 tests | committed `17cada0` alone |
| 21 files / 408 tests | `17cada0` plus the repair-path instrument, untracked |
| **22 files / 411 tests** | **committed `c85945f`** — both instruments committed; re-observed on a clean checkout |

`402 + 6 + 3 = 411`. **The baseline for the shipping tree is 22 files / 411 tests, green, exit 0.**
The ambiguity was in citation, never in a run. Recorded because the briefing that reached me stated
a fourth data point — that plan rev 28 cited a 411-test run — which I could not reproduce: plan rev
28 cited *20 files / 402 tests* against `17cada0`, correctly. The plan was not a party to the
conflict.

---

## Doc Review Summary — predecessor gate status

Each status below is restated from the named document as the authority for it, re-read at write
time (2026-08-23), not carried from an earlier read in this session.

| Stage | Document | Required | Actual | Pass |
|---|---|---|---|---|
| Implementation | `implementation/012-...-implementation.md` (`35cd23b`) | complete | M1–M6 implemented on both chain branches; M7 left to the closing stage per the plan's own text. Next Steps 1–2 both "done" | **PASS** |
| Code Review | `code-review/012-...-code-review.md` (round 7, `06b204d`) | approved | **APPROVED_WITH_COMMENTS**, carried to `c85945f`. No new finding. One MEDIUM (CR-M7, **CLOSED at `1db8186`**) and one LOW (CR-L11, handoff under D18). No CRITICAL, no HIGH — nothing holds the tree | **PASS** |
| QA | `qa/012-...-qa.md` (rev 7, `cc3763a`) | QA Complete | **QA Complete, verdict PASS**, `Verified-At: c85945f`. 22 files / 411 tests green on a clean committed checkout; differential captured at `verification/012/qa-phase2-reanchor-c85945f/` | **PASS** |

**Open condition at brief time, now closed.** My brief flagged QA's differential re-anchor from
`17cada0` to `c85945f` as an open condition and instructed that a failure to land was itself a
finding. **It landed** (QA rev 7, `cc3763a`) and I verified it at the QA document rather than
accepting the relay. No finding arises.

**A note on the code review's frontmatter, not a gate failure**: its `Status` field reads
`In Review` while its verdict reads `APPROVED_WITH_COMMENTS`. `Status` is the lifecycle state (the
document is not yet closed — devops closes it), not the verdict. The verdict is the authority for
this gate. Recorded so a later reader does not read `In Review` as an unfinished review.

**Round 7's Assumption Not Checked was assigned to UAT and re-routed to QA by steering**, on the
reviewer's own ground that the suite is QA's instrument. I watched it rather than executing it, as
instructed. **It is closed** — by QA's own execution at `c85945f`, not by anyone's reading; its
falsity signature (any count at `c85945f` other than 22/411 on unmoved source) did not fire.

---

## Value Delivery Assessment

**Is the Value Statement demonstrably delivered? — YES in mechanism; NOT YET in effect.**
The distinction is the whole of this assessment, and it is not a hedge: it names which half is
evidenced and which half is still owed, and by whom.

### Delivered and evidenced at `c85945f`

| Value clause (from the Value Statement) | Where it is delivered | Evidence |
|---|---|---|
| "a machine-readable `valid` field" | M1 — nullable `valid` column on `Message`; M5 — top-level exposure on both Statbot-facing v1 endpoints | `project-utils` `749606d` on `origin/master`; M5 response-shape properties green for present / `NULL` / absent-column states; mutants MS-7a/MS-7b killed |
| "computed from the composer's own send checks" | M3 — predicate shares **one symbol** with the Send gate, two callers | Plan Risks R1's mitigation is by construction, so divergence is a code-review-visible act; QA-R1 executed 36/36 green |
| "recomputed on every save" | M4 — recompute on every write of message content | Write-path both-branches and client-supplied-`valid` properties green; mutants MS-5/MS-6 killed |
| "backfilled across all existing records" | M6 — NULL-only idempotent backfill, guarded entry point | Script implemented and adversarially reviewed (11 inputs, refusals with no connection attempt and no file written); **execution is the owner's, still outstanding** |
| the composer stops vouching for unsendable messages | M2 — corrected send gate + D11's flag-clear | QA-R1 (36/36, five previously-red cells flipped, every control unmoved) and QA-R14 (M2-e, five departing states + bit-masking control) both **EXECUTED, PASS** |

**The owner's central complaint is answered by the design, not merely by the tests.** He said
hooks.gg "has no machine-readable way to say so"; after this chain it has one, and — the part that
matters for D2 — the way it says so is *the composer's own gate symbol*, so Statbot is not being
asked to trust a second, parallel notion of validity. That is the value, and it is built.

### Not yet in effect — and why that is not drift

The field reaches Statbot only after five ordered components complete, of which the code is one:
**DDL → `project-utils` push → `website` pin refresh + deploy → backfill → owner distribution
review → live declaration → statbot chain 023's gate deploy.** Four of those are owner- or
devops-executed and outstanding. This is the plan's own design (D1's backfill-from-day-one, D6's
review gate, D12's ordering), ratified by the owner at D15 — **not deferral of core value and not
drift.** UAT's judgement is that the engineering half is complete and the operational half is
correctly sequenced behind an owner gate that exists on purpose.

### Is core value deferred?

**No.** The one thing that would constitute deferral — shipping the field to Statbot before anyone
had looked at what the backfill actually produced — is precisely what QA-R9/QA-R20 and D12 prevent.
The gate is the value control, not an obstacle to it.

---

## Objective Alignment Assessment

**Does the delivered work meet the original plan objective?**: **YES**

**Evidence**: The plan's Objective names six things — a nullable boolean `valid` column, computed
server-side from the composer's send-gate checks, set on every write of message content, exposed at
top level in both Statbot-facing v1 endpoints, backfilled across the whole table, and declared live
only after the owner reviews the distribution. Five are implemented and verified at `c85945f`; the
sixth (the live declaration) is by construction the owner's last act and is held open as QA-R9.

**Drift detected**: **None from the objective.** The chain's scope *grew* substantially between rev
5 and rev 7 — the send-gate fix, D11's flag-clear, three added M6-b report categories, Validation
items 7 and 8, register rows D11–D14, risk row R5. That growth was not drift: it was assembled,
shown to the owner as a whole, and **ratified at D15** (*"Ratify it and let the chain run"*), then
**closed at D18** (*"Drop it. No more scope expansion. The plan ships as is."*). I verified the
delivered artifact against the ratified scope, not against the original ask, which is what D15
makes the correct comparison.

**D18's effect on this gate, stated because it is the governing ruling**: it changes **disposition,
not gates**. It routes new findings to handoffs instead of new plan rows. It does not soften this
verdict and it does not license approving around a condition. Nothing in this document treats it as
doing either.

---

## QA Integration

**QA Report Reference**: `agent-output/qa/012-message-valid-field-qa.md` (rev 7, `cc3763a`)
**QA Status**: **QA Complete — PASS** at `Verified-At: c85945f`

**QA findings alignment** — every finding QA left live is accounted for here:

| Item | QA's disposition | UAT's record |
|---|---|---|
| **MS-4** (mutation survivor: backfill `UPDATE` loses `WHERE valid IS NULL`) | **SURVIVOR**, pre-declared in Phase 1 as unkillable in this environment (requires DB concurrency). Guard verified present at source; damage bounded by release order — saves recompute their own rows. Handoff under D18 | **Accepted as a bounded, disclosed residual.** Not a release blocker: the property is verified by reading and by release ordering, and the plan forecloses building the DB-concurrency harness that would kill it. Carried into the handoff, named to the retrospective |
| **F-QA13** (LOW — `012-message-mode.test.ts` not type-sound; 5 × TS2345) | Behaviourally sound; belongs with whichever chain closes the `**/__tests__` tsconfig exclusion. Handoff under D18 | **Accepted.** No shipped-behaviour defect; the mutation kills prove the assertions discriminate. Handoff material |
| **F-QA14** (MEDIUM as a **record** defect — implementation doc overstated "tested") | Coverage half **CLOSED by QA's own spec** (red under MS-8, green on shipped code); record half routed to the implementer | **Verified discharged.** The implementer made the correction in its Assumption Not Checked closure section (implementation doc, "CORRECTED by QA Phase 2 (rev 6, F-QA14)"). Closed on the substance |
| **CR-M7** (MEDIUM — record defect: "444 changed lines, 0 unrelated") | **CLOSED at `1db8186`**, Minimum and Preferred both; reviewer re-ran a broadened sweep across all of `agent-output` — 17 hits, every one a correction or a warning, zero standing uncorrected claims | **Verified closed, with one live residue — see finding U-2 below** |
| **CR-L11** (LOW — unix-socket `DATABASE_URL` forms bypass the guard) | Stays LOW: a unix socket cannot reach the remote production database. Handoff under D18 | **Accepted.** Not a release blocker on the stated ground. Handoff material |
| **QA Phase 2 Assumption Not Checked** (the wiring seams no suite here can execute) | **Closure owner: the uat agent and the owner**, at register rows QA-R4–R7 and QA-R15 | **Accepted as mine.** Carried into the ledger below at exactly those rows. This is the single largest reason the post-deploy rows are not optional paperwork — see the note under the ledger |

---

## The Chain's Blocking-Condition Register — consumed here

**This is the chain's one register.** It was minted in the QA document (QA-R1…QA-R20) and states
that later gates **append to it rather than mint a parallel ID space**. This pass appends and does
not fork. **Naming**: rows are cited **QA-R#** throughout; an unqualified **R#** means a *plan Risks*
row (R1–R7), per plan rev 28's naming clause. The two share the letter and do not share a space.

Every reference below was verified against the register itself rather than followed from the
briefing that named it.

**Prediction, primary instrument and subject are read apart**, per this stage's rules: the owner of
a row comes from its **primary instrument**, never its fallback. Rows whose primary needs no human
(QA-R1, QA-R10, QA-R11, QA-R14, QA-R17) belong to a stage from the moment they were written, and
scheduling them against the owner's personal time would be a mis-restatement.

### Terminal rows — 6 of 20

| Row | Class | Terminal state | Evidence / ruling |
|---|---|---|---|
| **QA-R1** — M2 14-cell partition green, B3/B5/B7 flipped, controls unmoved | pre-release | **EXECUTED, PASS — 2026-08-23** | 36/36 green at `17cada0`, re-observed green in the 22/411 run at `c85945f`. Spec grew 20→36 cells; the rev-1 prediction was superseded by spec growth and recorded **beside**, not over, the original |
| **QA-R12** — F-QA7: owner states whether statbot 023's deploy is ordered after the live declaration | pre-release | **SUPERSEDED by QA-R17** (closed 2026-08-23 by owner ruling) | *"Order Statbot's deploy last"* → plan register **D12**; release condition 5 extended to five ordered components. QA-R17 is the executable half |
| **QA-R13** — F-QA1: owner rules on clearing the V2 flag on mode switch | pre-release | **SUPERSEDED by QA-R14, QA-R15, QA-R16** (closed 2026-08-23 by owner ruling) | *"Clear the flag on switch back"* → plan register **D11**, enacted in M2 |
| **QA-R14** — M2-e: every V2→classic switch leaves no `IS_COMPONENTS_V2_FLAG`, and clears **only** that bit | pre-release | **EXECUTED, PASS — 2026-08-23** | Partition spec's M2-e block green **and** the real extracted function proven: five departing states + a bit-masking control. Mutant L5-B (`mask → flags = 0`) **killed** |
| **QA-R16** — F-QA8: owner rules on M2-f's content-destroying recovery | pre-release | **SUPERSEDED by QA-R19** (closed 2026-08-23 by owner ruling) | *"Stands, but point the guidance at the JSON editor"* → **D13**. Preservation clause declined a second time, on the rev-3 corrected facts |
| **QA-R18** — F-QA9: the whitespace-content class is decided | pre-release | **SUPERSEDED by QA-R20** (closed 2026-08-23 by owner ruling) | *"Measure the population first"* → **D14**. The owner's live POST is **WITHDRAWN, not deferred** — his ruling, recorded as his |

### Outstanding rows — 14 of 20, none dropped

**`NOT EXECUTED` is not a terminal state.** Each row below carries an owner and the terminal state
it must reach (`EXECUTED` with result and date, `WITHDRAWN` by owner ruling only, or `SUPERSEDED`).
No release is recorded complete while any of these stands at `NOT EXECUTED`.

#### Pre-release rows — due before the merge (= before the deploy, on this repo)

| Row | Condition | Primary instrument | Subject | Owner | State |
|---|---|---|---|---|---|
| **QA-R10** | Pinned-build proof: remove installed copy, `pnpm install --frozen-lockfile`, rebuild — passes | Shell | *none — automated* | **devops** | NOT EXECUTED. **Decidable now** — the `project-utils` push is done (`origin/master` = `749606d`, verified here) |
| **QA-R11** | Release order verified as an **order**, not as occurrence | The deployment record | *none — documentary* | **devops** | NOT EXECUTED. Discharged at the release act |
| **QA-R17** | D12 enactment: devops records that the statbot-side ordering instruction was **relayed**, and does **not** claim statbot's compliance | The deployment record | *none — documentary* | **devops** | NOT EXECUTED. D12 has no statbot-side planning mirror, so this row is the only executable trace that the constraint travelled |
| **QA-R19** | D13 enactment: the guidance is shape-dependent over **THREE** shapes — (i) flag-stranded, no components (5712 / cell B5) → JSON editor *Load*, lossless; (ii) flag-stranded with type-1 components, no content (B4) → mode toggle, lossless; (iii) **both** content and type-1 components (B3) → **no lossless path exists**, so the guidance must state which side is lost | The recorded guidance text | Owner **sends** it | **devops drafts** (release note) / **owner sends** | NOT EXECUTED. **Decidable now and not yet drafted** — see the routing note below |

#### Pre-release gates falling after the deploy but before the live declaration

These are classified pre-release because they precede the **live declaration**, the last of the five
release components — not because they precede the merge. Their earliest-decidable condition is
"after backfill completes", which the release order puts after the website deploy.

| Row | Condition | Primary instrument | Subject | Owner | State |
|---|---|---|---|---|---|
| **QA-R9** | The owner has reviewed the M6-b outcome distribution — including the evaluation-failure category's count **and** row ids — **before** the live declaration | The backfill's own report | **Owner — his decision, not a QA verdict; no agent may mark it passed** | **owner** (recorded by devops) | NOT EXECUTED |
| **QA-R20** | M6-b carries the whitespace-content class as its **own named category** with count **and** row ids, reviewed at the R9 review | The backfill's own report | **Owner — his decision**; the count itself is automated | **owner** (recorded by devops) | NOT EXECUTED. A measured **zero** closes the question *for this corpus, at this time* — it is **not** a Discord determination and must not be recorded as one |

#### Post-deploy-observable rows — gate the chain's **closure**, never the release act

Per this stage's rules a post-deploy-observable row is **approved conditionally** and is acted on at
its **earliest-decidable condition** — watched for decidability, not left until someone happens to
look. Rows QA-R2, QA-R3, QA-R4 and QA-R15 each predict that a **single** observation suffices, so
each closes on one discriminating instance.

| Row | Condition | Predicted value | Subject | Owner | State |
|---|---|---|---|---|---|
| **QA-R2** | v1 guild-messages GET for guild `966088462803537960` shows message 5712 with top-level `valid: false` | `valid: false` — single observation refutes by construction | Owner (a hooks-side agent read was blocked by the classifier in the statbot workspace; **if that block fires here, stop and report — never reword**) | **devops** (owner observes) | NOT EXECUTED |
| **QA-R3** | Same request for a guild holding a bare-Text-Display V2 record shows `valid: true` | `valid: true` — single observation suffices. **R2's paired positive control** | Owner | **devops** (owner observes) | NOT EXECUTED |
| **QA-R4** | 5712 in the composer shows the mutual-exclusivity notification with Send **disabled** (M2-c) | Notification shown, Send disabled | Owner (only he can load that guild's message) | **uat** (owner observes) | NOT EXECUTED |
| **QA-R5** | Mode toggle classic→V2 still shows "Switch message mode?" and still warns (M2-d) | Modal shown | Owner | **uat** (owner observes) | NOT EXECUTED |
| **QA-R6** | Mode toggle V2→classic still shows the modal (M2-d, other direction) | Modal shown | Owner | **uat** (owner observes) | NOT EXECUTED. Both directions registered deliberately — one behaviour, two members |
| **QA-R7** | Saving a deliberately unsendable draft **succeeds**, and its API representation then shows `valid: false` (M4-c) | Save succeeds; next fetch shows `valid: false` | Owner | **uat** (owner observes) | NOT EXECUTED. **If the save is rejected, the change has silently turned a communication field into a gate** — which D1 forbids |
| **QA-R8** | At stated time T after backfill and **before** the live declaration, `SELECT count(*) FROM "Messages" WHERE valid IS NULL` = 0 | 0 | Owner | **devops** (owner observes) | NOT EXECUTED |
| **QA-R15** | M2-f: 5712 brought to Send-enabled through supported composer controls alone, **no JSON modal**, and the persisted record then carries **no `IS_COMPONENTS_V2_FLAG`** | Reachable, and flag-free afterwards | Owner (only he can load that guild's message) | **uat** (owner observes) | NOT EXECUTED. **Without the flag-free clause this row does not discriminate at all** |

### EXECUTION ORDER — carried forward because getting it wrong inverts the result

**QA-R15 is a persisting act.** Any save recomputes `valid` (M4), so executing QA-R15 flips 5712 to
`valid: true` and **destroys the preconditions of QA-R2, QA-R4 and M6-c's sentinel**.

> **Read them in the order: M6-c → QA-R2 → QA-R4 → QA-R15.**

Run out of order, QA-R2 and QA-R4 return `true`/enabled and read as *the fix never worked* — when in
fact it worked and was then overwritten. After QA-R15, or after the affected guild owner performs
his own D13-guided repair (whose timing nobody here controls), QA-R2's expected value legitimately
becomes `true` via M4. **That is a correct recompute, not a failure**, provided the order held.

### Why the post-deploy rows are not optional paperwork

QA's Phase 2 **Assumption Not Checked** routes to this stage and to the owner at exactly rows
QA-R4–R7 and QA-R15. The assumption: *the wiring seams no suite in this repository can execute* —
that `handleModeSwitch` calls `applyModeSwitch`, and that `upsertMessage` calls
`buildMessageValues`/`buildUpsertMessageQuery`, each with the right arguments. Every executed
instrument exercises the **extracted** functions; the callers' wiring to them is asserted **by
reading**.

**Falsity signature**: production composer or save behaviour diverging from the extracted
functions' proven behaviour while every suite here stays green — most visibly a deployed mode toggle
that does not clear the flag (QA-R5/R6/R15's surface), or a deployed save that stores no verdict
(QA-R7's surface).

These five rows are the only instrument that can see that class. **That is why this approval is
conditional on them and not merely accompanied by them.**

---

## Findings

### U-1 (HIGH as a disclosure; not a release blocker) — plan Risks **R7** has no instrument, and a clean M6-b report is not evidence against it

**Plan Risks R7 — per-embed-limit misvouching.** The class: records whose embeds exceed the
per-field limits Discord documents and hooks.gg's own inline validators encode (title, author name,
field name, field value, description, footer) while passing `validateMessage` — which runs only the
6,000-character aggregate `validateEmbedCharacterCount`, never the per-field checks. (`validateEmbed`
in `src/utils/limits.tsx` is dead: unexported, its sole exact-name reference in non-test source is
its own definition.) Post-012 such records store **`valid: true`**, so Statbot delivers against a
vouch Discord's documented limits say it will reject.

**The structural point, which must not be lost between here and the deployment record:**

> **A clean M6-b distribution report does not speak to R7's class.** The distribution is computed by
> **the very predicate that omits those checks**. R7's members are counted **nowhere** — they appear
> in the `true` column and look correct there.

Classified per "Weighing Operator Attestation": R7 is a **silent** failure mode — its signature is
absence, not appearance. No amount of "the backfill looked clean" or "production has been quiet"
is evidence against it, and citing either would argue in a circle. **Recorded as unverified, not as
covered.**

Not a release blocker: R7 was opened at plan rev 14 from code review round 2's F1, **routed to the
planner and explicitly not held against the tree**, and D18 forecloses adding the instrument now.
It is disclosed so that the release is made with it in view rather than around it.

**This belongs in the deployment record.** Devops must not read a clean M6-b as closing R7.

### U-2 (MEDIUM as a record defect; CLOSED upstream, one live residue) — `49f2bf1`'s commit message still carries the superseded "0 unrelated" claim

CR-M7 is **closed at `1db8186`** and I verified the closure at the code review document. One residue
is live by deliberate choice, and I verified it at source rather than relaying it:

```
$ git log -1 --format=%B 49f2bf1
...
Diff scope verified: 444 changed lines in pnpm-lock.yaml, 0 unrelated
to project-utils (grep -c, not the filtered form).
```

**Measured truth**: of 444 changed lines, **436 are unrelated to `project-utils`**, moving **28
package names** — the `@babel/*` toolchain `7.29.0 → 7.29.7`, `@napi-rs/wasm-runtime 1.1.3 →
1.2.3`, `@tybys/wasm-util`, and the peer re-resolutions following them through `next`, `@trpc/next`,
`@vercel/analytics` and `@vercel/speed-insights`.

The commit message was **deliberately left unrewritten** — rewriting history in a shared tree is
prohibited — with the code review document named as the record to trust. That is the right call.

**The live risk is inheritance**: "0 unrelated" is exactly the claim that would stand devops' own
cross-repo version check down. **Devops must not inherit it from any upstream document *or from
`49f2bf1`'s commit message*.** Folded into the ledger as a devops release-note obligation.

### U-3 (LOW, procedural) — two devops obligations were travelling outside the register; folded in, no parallel ledger created

This stage consumes the chain's **one** register, and a second travelling list is itself a finding.
I found two devops-facing obligations recorded only in the implementation and code review Next
Steps, not as register rows:

1. **Round 3's installed-matches-lockfile assumption** — still devops' to close at the pin-refresh
   commit (implementation Next Steps 4; code review Next Steps 3). It is *adjacent to* QA-R10 but is
   not QA-R10: R10 proves a frozen-lockfile install and rebuild pass; this asks whether the
   **installed** tree matches the lockfile at the pin-refresh commit.
2. **The "0 unrelated" non-inheritance obligation** (finding U-2 above).

**Both are folded into this document's ledger as devops obligations rather than carried as a second
list.** Neither is a new condition — no scope expansion, so D18 is respected; they are existing
obligations given a home in the single register.

**Checked and cleared, not a second list**: the plan's Validation and Release Conditions 1–8 are the
register's *source*, not a rival to it — QA-R10↔item 3, QA-R2–R8↔item 4(a–e), QA-R11/R17↔item 5,
QA-R9↔item 2, QA-R19↔item 7, QA-R20↔item 8. Verified row by row against the plan. One list, two
surfaces, with QA's the executable one.

---

## Technical Compliance

**Plan deliverables**

| Milestone | Deliverable | Status |
|---|---|---|
| M1 | Nullable `valid` column on `Message` (`project-utils`) | **PASS** — `749606d` on `origin/master`; M1-b re-read at the committed rollup |
| M2 | Corrected composer send gate + D11's flag-clear (`website`) | **PASS** — QA-R1 (36/36) and QA-R14 both EXECUTED |
| M3 | The validity predicate | **PASS** — one shared symbol with the gate; whole-domain parity green |
| M4 | Recompute on every write of message content | **PASS in the extracted functions**; the caller wiring seam is asserted by reading — routed to QA-R7/R15 |
| M5 | Exposure at top level on both Statbot-facing v1 endpoints | **PASS** — present / `NULL` / absent-column states all green |
| M6 | Backfill, distribution report, live declaration | **PARTIAL BY DESIGN** — script implemented, guarded and reviewed; execution and review are the owner's (QA-R9/R20) |
| M7 | Record closure of the handoff's obligations | **OPEN** — left to the closing stage per the plan's own text |

**Test coverage (from QA rev 7)**: 22 spec files / 411 tests green at `c85945f`, exit 0, on a clean
committed checkout. TDD gate passed with red re-derived at the chain base by QA's own worktree run.
Bounded mutation sweep: 11 mutants, 9 killed by named fixtures; MS-4 survivor (pre-declared,
routed); MS-8 survivor found and closed by a QA-authored spec seen red under the mutant.

**Known limitations, carried explicitly**

- **MS-4** — unkillable in this environment; bounded by release order and source verification.
- **Plan Risks R7** — no instrument by construction (finding U-1). **Silent class, unverified.**
- **Plan Risks R5** (whitespace-content misvouching) — instrument is QA-R20's count. A measured zero
  closes it *for this corpus at this time*; the class is then **empty and unguarded**, never "safe".
- **F-QA13** — spec type-unsoundness (5 × TS2345), plus 22 pre-existing same-class errors.
- **CR-L11** — unix-socket `DATABASE_URL` forms bypass the guard; cannot reach remote production.
- **M4 caller wiring seam** — asserted by reading; the only instrument is QA-R4–R7/R15.

---

## UAT Status

**Status**: **UAT Complete**

**Rationale**: The Value Statement is delivered in mechanism at `c85945f` and verified by three
independent gates that all name that tree. The objective is met on five of six clauses, with the
sixth (the live declaration) correctly held behind an owner gate that exists on purpose. No drift
from the ratified scope. What is not yet demonstrated is delivery *in effect*, which depends on
owner-executed steps that cannot precede this decision — and those are carried as conditions, not
waived.

---

## Release Decision

**Final Status**: **APPROVED FOR RELEASE, conditional on the human click-through of items QA-R4,
QA-R5, QA-R6, QA-R7 and QA-R15. If any of these fail, return to the implementer before release.**

The conditional form is used because the human walkthrough **genuinely cannot precede this
decision**: every one of those rows observes behaviour of a *deployed* website, and `origin/master`
is still the chain base. They gate the chain's **closure**, not the release act.

**The conditional approval is a ledger, not an exception.** All 20 register rows are recorded above:
6 terminal, 14 outstanding, each with an owner and the terminal state it must reach. **No release is
recorded complete while any row stands at `NOT EXECUTED`.** `WITHDRAWN` is the **owner's ruling
alone** — not this stage's and not steering's.

**Due before the merge** (on this repo the merge and the deploy are the same instant):

- **QA-R10** — pinned-build proof (devops; decidable now)
- **QA-R19** — the three-shape guidance drafted into the release note (devops drafts; **the owner
  sends it — no agent may**)
- **U-2** — the release note states the lockfile's real scope (436 unrelated lines, 28 package
  moves) and does **not** inherit "0 unrelated" from any document or from `49f2bf1`'s message
- **U-3.1** — round 3's installed-matches-lockfile assumption closed at the pin-refresh commit

**Due at the release act**: QA-R11 (order verified as order), QA-R17 (statbot relay recorded, with
no claim as to statbot's compliance).

**Due after the deploy, before the live declaration**: QA-R9 and QA-R20 — **the owner's decisions,
which no agent may mark passed.**

**Due after the deploy, gating chain closure**: QA-R2, R3, R4, R5, R6, R7, R8, R15 — **in the order
M6-c → QA-R2 → QA-R4 → QA-R15.**

**Rationale**: QA PASS and code review APPROVED_WITH_COMMENTS both anchor to `c85945f`; no CRITICAL
or HIGH survives; the objective is met; the outstanding work is operational and owner-gated by
design rather than by omission. Nothing found here holds the tree.

**Recommended Version**: **minor**. Neither package carries a `version` field or a CHANGELOG, so the
release is named by the serving refs moving — but the change is **additive and backward-compatible**
by contract: `valid` is a nullable column and an added top-level key, and D1's absent-field rule
means a Statbot that has not deployed its gate behaves exactly as today. Nothing is removed and no
existing response shape changes. Were these packages versioned, this would be a minor bump, not a
patch: it adds a field to a cross-product read surface that another product is being told to key
off.

**Key Changes for Changelog**:

- Stored messages now carry a top-level `valid` boolean, computed from the composer's own send-gate
  checks and recomputed on every save, exposed on both Statbot-facing v1 read endpoints.
- Composer send gate corrected: structurally-V2 messages that could not be sent are no longer
  reported as sendable (the defect behind message 5712).
- Mode switch V2→classic now clears `IS_COMPONENTS_V2_FLAG` — and only that bit — making
  flag-stranded records recoverable through supported composer controls.
- All existing message records backfilled with a `valid` verdict; the field is declared live to
  Statbot only after the owner reviews the backfill's outcome distribution.
- Statbot's `valid` gate deploys **after** the live declaration (D12).

---

## Next Actions

*Point-in-time list — later stage documents (the deployment record first) are authoritative on
these items' current state.*

1. **devops** — execute the release in the ordered five components; discharge QA-R10, QA-R11,
   QA-R17, U-2 and U-3.1; draft QA-R19's three-shape guidance into the release note; carry finding
   **U-1** into the deployment record so a clean M6-b is not read as closing plan Risks R7.
2. **owner** — the DDL; the backfill run; the M6-b distribution review (QA-R9) including the
   whitespace category (QA-R20); the live declaration; the post-deploy observations QA-R2–R8 and
   QA-R15 in the stated order; and sending the D13 guidance himself.
3. **retrospective** — UAT Complete satisfies its precondition; it need not wait on the release.
4. **handoff register** — MS-4, F-QA13, CR-L11, CR-M6's Preferred, the `PGHOST`/`service=` residual,
   L10's structural alternative, and the round-5 eslint findings, all under D18.

---

## Addendum — 2026-08-23, post-backfill: decidability reached

*Appended by the uat agent at the earliest-decidable condition of the post-deploy rows, per this
stage's duty to watch for decidability rather than wait for someone to look. The release executed
after this document existed (`aa07a59`), so the ordering was the sanctioned one; this is not a
retroactive gate.*

**Gate evidence**: `verification/012/backfill-report-1787522866564-i3s31k.md` (committed `08e6c73`),
with the guard's refusal-path report (`...-i0womw.md`, `rowsClassifiedThisRun` 0, `interrupted`
true) committed alongside it — D16's disambiguation rule needs both runs in the record to mean
anything.

**Figures reproduced by this pass from the report, not accepted from relay**: 4825 classified /
4750 `true` / 75 `false`; `tableWideRowCount` 4825; `evaluationFailures` 0; `whitespaceContent` 0;
`flagStructureDisagreement` 2 (rows **5712**, **5842**), `flagStructureDisagreementValidTrue` 0.
Internally consistent: `4750 + 75 = 4825`, and the seven `perCheckFailureCounts` sum to 75.

### `flagStructureDisagreementValidTrue` — semantics confirmed from the record, not inferred

Asked to confirm rather than infer. The definition is established in the committed document record
at `verification/012/probe-fix-round-h1-h2/README.md` §M1: the field is the previously-invisible
sub-class **`flagStructureDisagreement && valid === true`**, promoted to its own named category
with ids (the reviewer's Preferred fix). A count of **0** therefore means **neither disagreement row
was stored `valid: true`** — hooks.gg is vouching for neither 5712 nor 5842. That is the reassuring
reading, and it is supported. Confirmed from documents; no source was read.

### What the clean report does and does not close

| Item | Effect of this report |
|---|---|
| QA's **Phase 1 Assumption Not Checked** (production `data` structurally conformant) | Its stated falsity signature was *`evaluationFailures` comes back non-empty*. **Measured 0 — it did not fire.** Materially supported |
| **QA-R20** / plan Risks **R5** (whitespace) | `whitespaceContent` **0**. Closes the question **for this corpus, at this time** — **not** a Discord determination. The class is now empty **and unguarded** |
| **U-1** / plan Risks **R7** (per-embed misvouching) | **Closes nothing, and this is the concrete instance of U-1.** The only embed check in `perCheckFailureCounts` is the 6,000-char aggregate ("Embeds exceed 6000 characters": 1). The per-field limits are not evaluated, so R7's members are inside the **4750 `true`** rows, uncounted. **A clean report is not evidence against R7** |
| **M6-c** | **Not satisfied by this report, and cannot be.** M6-c requires 5712's expected `false` to be *sourced from the owner-recorded Discord `400`/`50035`, never from the predicate*. The report **is** the predicate's own output; reading it as the check is circular |
| **QA-R2 / QA-R3** | Not satisfied. The report proves what the backfill *computed*; R2/R3 prove what the v1 API *exposes* (M5). Different property, different instrument |
| **QA-R8** | Not satisfied. `tableWideRowCount` 4825 = `rowsClassifiedThisRun` 4825 is strong corroboration, but R8's named instrument is a SQL `count(*)` and it is one line |

Recorded so that none of these is closed **incidentally**: an item "satisfied incidentally" is
either recorded `EXECUTED` with its evidence, or it was never a gate.

### U-4 (MEDIUM, new) — row 5842 is outside every shape the QA-R19 guidance was built from

`grep` across all of `agent-output` returns **5842 exactly once** — in this backfill report — against
**5712 in eleven documents**. It is a real member of the flag/structure-disagreement class that no
stage has ever seen.

QA-R19 requires the repair guidance to be **shape-dependent**, naming the lossless path *per record
shape*, over three shapes all derived from 5712's class. **Whether 5842 falls inside one of those
three is not established, and must not be assumed.** If it is a fourth shape, the drafted guidance
is incomplete for it — and R19's own failure mode applies exactly: *a guild owner who follows it
loses data while doing exactly what he was told.*

**This is not scope expansion under D18**: QA-R19 already requires shape-completeness over the
population. Applying it to the population that actually exists is the row's own content.

**Required before the QA-R19 guidance is sent** (the send is the owner's; no agent may): determine
5842's shape — no components (5712's shape, cell B5), type-1 components and no content (B4), both
content and type-1 components (B3), or a fourth shape none of the three cover. One read of the
row's `data`. **Owner-executed**; routed to him through steering as a blocking question, not
resolved here.

**Terminal state**: `NOT EXECUTED`. Owner. Blocks the *sending* of the QA-R19 guidance, not the
release act — which has already occurred.

### Hazard not spelled out in the register, stated here because the queue will be followed literally

**QA-R5, QA-R6 and QA-R7 must be performed on a scratch message, never on 5712.** The register names
the *behaviour* (mode-toggle modal; save-an-unsendable-draft) without naming a subject. Performed on
5712, each is a persisting act with the same consequence the ordering note gives QA-R15: it
recomputes `valid` and **destroys the preconditions of M6-c, QA-R2 and QA-R4**. The published order
(M6-c → QA-R2 → QA-R4 → QA-R15) protects against QA-R15 only.

### Row states as at this addendum

**Now decidable, all runnable**: M6-c, QA-R2, QA-R3, QA-R4, QA-R5, QA-R6, QA-R7, QA-R8, QA-R9,
QA-R20 — all still `NOT EXECUTED`.
**Runnable last, persisting**: QA-R15.
**Held**: the QA-R19 *send*, behind U-4.
**Executed by devops since the release**: QA-R10, QA-R11, QA-R17 (`EXECUTED, PASS`); QA-R19 **draft**
discharged, `DRAFTED, UNSENT`.
**Unchanged**: this decision's conditional form, and the rule that no release is recorded complete
while any condition stands at `NOT EXECUTED`.

---

## Addendum 2 — 2026-08-23, owner walkthrough round 1: results recorded against predictions

*Observed results are recorded **beside** each prediction, never over it. Owner attestation is the
terminal form of owner-supplied evidence: his statement is recorded with its timestamp and
terminalised on. No capture file was requested of him and none is recorded as missing.*

Source: owner's material relayed verbatim by steering-hooks-012, 2026-08-23. Classifications below
are this stage's, reached from his material — steering's own readings were explicitly offered as
non-binding and are not adopted as such.

### M6-c — **EXECUTED, PASS (2026-08-23)**

Owner, verbatim: *"5712 `false`, other `true`"* — both halves, both sentinels.
Prediction (5712 `false`; at least one of the 16 bare-Text-Display V2 records `true`): **met**.
The expected `false` is independently sourced (owner-recorded Discord `400`/`50035`, per M3-b), not
from the predicate, so the row is not circular. **Terminal.**

### QA-R2 — **EXECUTED, PASS (2026-08-23)**

The returned record carries `"valid": false` **at top level, beside `id` and `name`** — the stated
criterion exactly. Prediction (`valid: false`, single observation sufficient): **met on one
discriminating instance**, which this row's prediction declares closes it. **Terminal.**

Two facts the payload settles in passing, recorded because they were open:

1. **5712's shape is now established from production**: `flags` **32768** (`= 1<<15`,
   `IS_COMPONENTS_V2_FLAG` set), `content` non-empty, `components` **`[]`**. That is
   **cell B5 / QA-R19 guidance shape (i)** — flag-stranded with no components. 5712's own class is
   no longer inferred from the handoff; it is measured. **This says nothing about 5842** (U-4
   stands, entirely untouched).
2. **M5-b (containment) incidentally corroborated** — the returned `data` carries no `valid` key.
   Recorded as corroboration only; M5-b is not this row's criterion and is not marked executed on it.

### QA-R4 — **NOT EXECUTED** (blocking; not a failure)

Owner, verbatim: *"I cannot access 5712, there is no permission overriding behavior. I instead
imported the JSON. Both conditions pass, error message shows, but sending being disabled is hard to
check…"* and *"There's no way to see what the state under the hood is."*

Prediction (notification shown, Send disabled) — **observed result recorded beside it**: the
mutual-exclusivity notification **was** observed; **Send-disabled was not confirmed**; and the
subject was **an imported copy, not record 5712**.

**Why this is NOT EXECUTED rather than PASS or FAIL.** The row's subject is *5712 loaded in the
composer*. It was not loaded — it cannot be. The substitute's state is unverifiable **by the
observer's own account**, and he reports the import sets the message type to `Classic` and may be
stripping content, so it is not established that the copy is even a member of the class this row
tests. Marking a pass here would be recording a result the instrument did not produce; marking a
fail would assert a defect no evidence supports. **Neither is available, so the row stands open.**

*Partial credit is not a terminal state, and "satisfied incidentally" is not one either.*

### QA-R15 — **NOT EXECUTED** (blocking), and its instrument is confounded

Owner, verbatim: *"Unable to do QA-R15… There is no way to remove the flag without clearing the
message content… or going into the JSON modal."* — and the JSON modal is what this row forbids.

**A precise and important non-finding.** He also reports: *"clicking Components V2 and accepting the
clear, then adding a Text Display passes the check."* **That path must not be recorded as a pass.**
It is the exact non-discriminating route QA-R15's flag-free clause was written to exclude — the
register's own words: *"a user reaches Send-enabled on pre-D11 code by rebuilding the record as a
genuine V2 message (delete the content, add a Text Display), flag still set."* The owner
independently rediscovered the trap the row was hardened against, which is the clause working.

**Why not FAIL, when "unreachable" is this row's stated failure mode.** Because the subject was
never the real record. He could not load 5712, and the imported copy arrived as `Classic` — so he
may never have held the V2 state that D11's V2→classic branch acts on. The row predicts reachability
*via the F-QA8 round trip* (the content-destroying mode toggle, accepted at D13); on this evidence
it is not established that that route was available to try. **The instrument is confounded, so the
row is open — not refuted.**

### U-5 (HIGH, new) — the two 5712-keyed composer rows may be unexecutable **by anyone**, which is a specification defect, not a pending task

Steering asked the right question and it is this stage's, not the owner's. If *"I cannot access
5712, there is no permission overriding behavior"* holds generally, then **QA-R4 and QA-R15 as
written name a subject no one can bring to the instrument.** That is categorically different from
"not yet run", and it does not resolve by waiting.

Both rows exist to close QA's Phase 2 **Assumption Not Checked** — the wiring seams no suite in this
repository can execute. **That class is not wholly stranded**: QA-R5 and QA-R6 probe the mode-switch
seam (`handleModeSwitch` → `applyModeSwitch`) and QA-R7 probes the save seam (`upsertMessage` →
`buildMessageValues`), and all three remain runnable on a scratch message. What QA-R4 and QA-R15
uniquely carry is behaviour **on the actual stranded record** and whether **D11's recovery works
end to end** — which is the half D11 was chosen for.

**Recommendation, routed up rather than decided here** — this stage does not withdraw conditions:

- **Preferred — route back to QA for re-specification.** The property is worth keeping; the subject
  is what is unavailable. A reachable subject would test the same property. This stage does not
  design the instrument — that is QA's — and notes only that the owner reports the flag-stranded
  state may not be constructible through supported controls, which QA must establish rather than
  assume.
- **Alternative — owner rules `WITHDRAWN`.** His alone. **Cost of withdrawing without a
  replacement, stated plainly**: nothing then verifies D11 end to end, and D11's one line was the
  thing the owner chose at F-QA1 specifically so affected guild owners would have a control that
  works. Withdrawn bare, the chain ships a clearer error and an unverified recovery.
- **Not available: recording either row as passed on the imported copy.**

### U-6 (HIGH, new) — the owner's report is a candidate falsifier for plan Risks **R6**, and it threatens the QA-R19 guidance this stage already put on hold

Owner, verbatim: *"the JSON view seems to not support components V2 at all. It's possible that the
import is stripping content."*

**Why this matters beyond the two rows above.** QA-R19 shape **(i)** — now confirmed by QA-R2's
payload to be **5712's own shape** — points affected guild owners at the **JSON editor *Load***, on
the measured finding (qa rev 3) that it is *lossless* for that shape. Plan Risks **R6** records the
mechanism that makes it lossless (`updateMessage`'s shallow top-level spread replacing `data`
wholesale) **together with its falsifier**. An observation that the JSON path does not handle V2 and
may strip content is a **candidate member of R6's falsifier class**.

If it holds, the guidance's shape-(i) route — the route for the one record class this chain has
actually seen in production — **tells guild owners to do something that loses their content**, which
is precisely the harm R19 exists to prevent.

**Effect on the hold already placed**: the QA-R19 **send** was held at U-4 pending 5842's shape. It
is now held on **two** independent grounds, and this second one bears on shape (i), which U-4 does
not touch. **Recorded per R6's own contract** — a member of an existing Risks row's falsifier class
is that row's record to keep, which D18 explicitly does not foreclose. **Candidate, not
established**: the owner offers it as a possibility, and this stage does not upgrade his hypothesis
to a determination.

His broader statement — *"assume that the entire implementation of V2 ONLY included the flow of
creating the message and sending it"* — is recorded as **his stated hypothesis**, not as a finding of
this chain.

### Effect on the release decision and on chain closure

**The release decision is unchanged and remains correctly discharged.** It was issued conditional,
the release act occurred within its terms, and post-deploy-observable rows were stated from the
outset to gate **closure**, not the release act.

**The chain cannot be recorded complete.** QA-R4 and QA-R15 stand at `NOT EXECUTED`; QA-R3, R5, R6,
R7, R8, R9 and R20 are runnable and not yet run; the QA-R19 send is held on U-4 and U-6. Per this
document's standing rule, **no release is recorded complete while any condition stands at
`NOT EXECUTED`** — and `NOT EXECUTED` is not made terminal by the passage of time or by production
looking healthy.

**Weighing what production has shown, per "Weighing Operator Attestation".** M6-c and QA-R2 are
genuine passes on the *stored verdict* and its *exposure* — real evidence against the **loud**
failure modes. They are **no evidence at all** against the silent ones: plan Risks **R7** (still no
instrument, its members inside the 4750 `true` rows), and now the recovery path in **U-5/U-6**, whose
signature is a guild owner quietly losing content while following instructions. A working field is
the most persuasive available argument for laundering exactly those, and it is not accepted here as
one.

---

## Addendum 3 — 2026-08-23: owner ruling D19 on QA-R4 and QA-R15

**Authority**: plan register row **D19** (`agent-output/planning/012-message-valid-field.md`, rev 32,
`a50e75d`), re-read at this document's write time rather than carried from the relay. Reopening
class: owner withdrawal only.

**Ruling, verbatim and entire**: *"Leave them open"* — a selection-prompt answer; the three options
were this stage's, the wording steering's. **Option (c).** This stage's recommendation (a), route
back to QA for re-specification, was **not taken**; (b), owner-ruled `WITHDRAWN`, was **not taken**
either. Recorded as the ruling it is and not re-litigated.

Nothing else was said — no reasoning, no condition, no revisit direction. **The absence is recorded
as an absence and is not read as an instruction**, and this stage supplies none.

### Effect on the ledger — what changes, and what deliberately does not

| | |
|---|---|
| **QA-R4 state** | `NOT EXECUTED` — **unchanged** |
| **QA-R15 state** | `NOT EXECUTED` — **unchanged** |
| **What D19 changes** | *Why* they stand there. They are now open **by owner ruling**, not by oversight or by an instrument nobody got to |
| **What D19 does not change** | `NOT EXECUTED` **is still not a terminal state.** D19 is not a withdrawal, and only a withdrawal retires a row. Both rows remain in this register, remain blocking, and are not removed from it |

**Chain closure therefore remains blocked** — which is not a side effect but the **stated consequence
of the option he selected**: *"chain closure stays blocked indefinitely, pending the separate
Components-V2-editing research effort; everything else in the queue still runs."* Accepted with the
ruling rather than merely predicted by it. The release decision is unaffected and stays correctly
discharged.

**Recorded because a queue is not the register**: steering has removed QA-R4 and QA-R15 from
`OWNER-QUEUE.md` (`a7191c5`) on the sound ground that a ruled item is no longer an owner item. That
is correct for a working queue and changes nothing here — **this register is where the two rows
live, and D19 says so explicitly.** A reader who finds them absent from the queue should not read
that as terminal.

### One fact about the ruling's shape, stated and not converted into an instruction

D19 attaches **no review trigger** to either row. Its accepted consequence names the V2-editing
research effort as what *closure* waits on, but that is a consequence of the ruling, not a
`Review-Trigger` on the rows themselves — and this stage will not promote it into one, because the
owner did not.

The consequence is that **nothing currently schedules a re-read of QA-R4 or QA-R15.** Per
document-lifecycle, a routed item without a trigger "sits open indefinitely" — which here is the
ruled outcome rather than a defect in it, and is recorded so a later reader knows the openness is
deliberate and unscheduled. Named for the **retrospective** as an observation about the record's
shape, not raised back to the owner: he has just ruled, and re-putting a settled question in
different words is not available to this stage.

### Still runnable, unaffected by D19

QA-R3, QA-R5, QA-R6, QA-R7, QA-R8, QA-R9, QA-R20 — and the 5842 shape question (U-4) and the live
declaration. **The 5712 preservation rule stands**: open rows still carry preconditions that a save
destroys, so QA-R5, QA-R6 and QA-R7 remain scratch-message-only.

**QA-R5, QA-R6 and QA-R7 still matter more than their position in the queue suggests**: they close
wiring seams (`handleModeSwitch` -> `applyModeSwitch`; `upsertMessage` -> `buildMessageValues`) that
QA-R4 and QA-R15 do not, so QA's Phase 2 Assumption Not Checked is **not** wholly stranded by D19.
That class narrows to the two 5712-keyed rows alone.

### Register state at this addendum

**10 of 20 terminal** — QA-R1, R2, R10, R11, R14, R17 `EXECUTED`; QA-R12, R13, R16, R18
`SUPERSEDED`.
**10 outstanding** — QA-R3, R4, R5, R6, R7, R8, R9, R15, R19, R20; of these **QA-R4 and QA-R15 are
open by ruling D19**, the rest are runnable now.
**Held**: the QA-R19 *send*, on U-4 and U-6, both independent and both still standing.

---

## Addendum 4 — 2026-08-23: owner ruling D20, the effort is on hold. This document is the resumable record.

**Authority**: plan register row **D20** (rev 34, `827dfb0`), read at source at this document's write
time. Reopening class: owner withdrawal only.

**Ruling, verbatim and entire**: *"This effort is on hold until the fixes are implemented."*

Steering's two readings — *"the fixes"* = the Components-V2 editing effort
(`handoff/components-v2-editing-support-2026-08-23.md`, `6a7b878`), and *"this effort"* = the whole
chain rather than closure alone — are recorded in D20 as **steering's readings, not his phrasing**,
and are carried here on the same terms. Only the quoted sentence is his. **This stage adopts both
readings and adds none**; if either is wrong the correction is the owner's.

### Effect on the ledger: none. That is the point.

**No row changes state.** Ten stand outstanding, exactly as before: QA-R3, R4, R5, R6, R7, R8, R9,
R15, R19, R20. A hold stops work; it does not terminalise conditions, and **`NOT EXECUTED` is not
made terminal by a chain stopping any more than by time passing or by production looking healthy.**
The seven previously-runnable rows are now *not going to be run* — that is a fact about the schedule,
**not** a disposition, and none of them is withdrawn.

**Nothing is asked of the owner.** Steering has banked `OWNER-QUEUE.md` under a hold banner
(`8dbea73`) rather than emptying it, which is the right call for the same reason the register keeps
these rows: an item that is neither done nor withdrawn must remain visible.

**This document's `Status` stays `Active`, deliberately.** `Deferred` is a terminal status that
triggers closure into `closed/`, and archiving a ledger with ten live conditions would bury exactly
what a resumption needs. D20 also carries a resumption condition, so it is a hold, not indefinite
postponement. Recorded so a later orphan sweep reads the `Active` status as intended rather than as
an oversight.

### Reconcile note — Addendum 3's routing of the no-review-trigger fact

**Addendum 3 said**, of the fact that D19 attaches no review trigger to QA-R4/QA-R15: *"Named for the
**retrospective** as an observation about the record's shape."* That text stands as written and is
not overwritten.

**Why it was defensible when written**: at that moment the retrospective's precondition was
satisfied and it was the correct destination for an observation about the record's shape.

**What has changed**: the retrospective is itself **held** by ruling this date. The routing is
therefore dead, and an observation routed to a held stage is an observation that dies in a
session's context. **Corrected by relocation, not by re-routing**: the fact now lives in this
document, below, where it survives without depending on any stage running.

### Carried here so it survives the hold

Material this stage would otherwise have handed to the retrospective. Recorded as observations, not
as new conditions — **D18 and D20 both foreclose adding scope, and none of this asks for any.**

1. **D19 attaches no review trigger to QA-R4 or QA-R15, so nothing schedules their re-read.** That is
   the ruled outcome, not a defect in it. Under D20 the same is now true of the chain as a whole:
   the resumption condition is an *event* (*"until the fixes are implemented"*), which is the correct
   form for a trigger — but no stage is named to watch for it. **Whoever resumes chain 012 reads this
   register first**; that sentence is the closest thing to a trigger that exists, and it is written
   here rather than assumed.
2. **QA-R15's flag-free clause earned its keep.** The owner independently found the
   *"clear, then add a Text Display"* route and reported it as passing. It is the exact
   non-discriminating path the clause was written to exclude — pre-D11 code reaches Send-enabled
   that way with the flag still set. Had the row been written without that clause, this chain would
   have recorded a pass on a fix that was not demonstrated. **A pre-registered discriminator caught a
   false positive that a human observer, acting in good faith, was about to hand in.**
3. **A queue and a register are different instruments and must not be conflated.** Twice here a
   working queue correctly dropped items (`a7191c5`, then the `8dbea73` banner) that the register
   correctly kept. Both were right. The lesson is that row state belongs to the register, and a
   reader who finds an item absent from a queue must not infer it is closed.
4. **The chain ran on one register and never grew a second.** QA minted QA-R1–QA-R20; later gates
   appended. The two obligations found travelling outside it (U-3) were folded in rather than carried
   parallel. Worth preserving because the failure mode — a second travelling list — is invisible
   until the two disagree.
5. **A clean production result is not evidence against a silent class.** Recorded three times on this
   chain and still true at the hold: plan Risks **R7** has no instrument by construction, and the
   backfill's clean report is computed by the very predicate that omits the checks R7 is about.

### Cross-workspace consequence of the hold — recorded, not acted on

The **live declaration is inside the hold**, and **D12** orders statbot chain 023's `valid`-gate
deploy *after* that declaration. **Statbot chain 023 is therefore held too, for as long as this is.**

D12 is, by its own terms, *the sole planning-register record of that constraint on either side* — the
statbot side carries none by owner ruling — so this consequence exists in no planning document but
D12 and the records that restate it, of which this is one.

**No session has been told, and this stage does not tell one.** Whether to inform the statbot side is
the owner's call; it has not been made. This is recorded here for the same reason QA-R17 exists: an
unrecorded consequence is indistinguishable from one nobody noticed.

### State at the hold — the resumable summary

| | |
|---|---|
| **Release** | Executed and live. `website` `c85945f`; `project-utils` `749606d` on `origin/master`. Backfill complete, 4825 rows |
| **Release decision** | **APPROVED FOR RELEASE, CONDITIONAL** — issued at `c85945f`, correctly discharged; the release act fell within its terms |
| **Chain closure** | **BLOCKED**, and now also **HELD** — two independent reasons, neither of which the other resolves |
| **Register** | **10 of 20 terminal** — QA-R1, R2, R10, R11, R14, R17 `EXECUTED`; QA-R12, R13, R16, R18 `SUPERSEDED`. **10 outstanding** — QA-R3, R4, R5, R6, R7, R8, R9, R15, R19, R20 |
| **Open by ruling** | QA-R4, QA-R15 (D19) |
| **Held** | Everything else, incl. the QA-R19 *send* — which was already held on **U-4** (row 5842's shape unknown) and **U-6** (the JSON route for 5712's own shape is a candidate falsifier for plan Risks R6). Both stand |
| **Unverified, not covered** | Plan Risks **R7** (silent, no instrument); the D11 recovery path (U-5/U-6); QA's Phase 2 wiring-seam assumption, now narrowed to the two 5712-keyed rows — QA-R5/R6/R7 would have closed the mode-switch and save seams and were not run |
| **On resumption** | Read this register before acting. The 5712 preservation rule still binds: QA-R5/R6/R7 are scratch-message-only, and the order M6-c → QA-R2 → QA-R4 → QA-R15 governs the 5712-keyed rows, R15 last because it persists |

**UAT's own work is complete and needs no successor.** The verdict is issued, the ledger is current,
and every outstanding row carries an owner and the terminal state it must still reach. What remains
is execution the owner has held.

---

## Addendum 5 — 2026-08-25: the hold is withdrawn, the register is terminalised, the conditional approval is discharged

**Authority for every restated fact below, each re-read at this document's write time (2026-08-25),
not carried from an earlier read in this session:**

| Fact class | Authority | Read at |
|---|---|---|
| Owner rulings D18, D22–D28 | `agent-output/planning/012-message-valid-field.md` register, rev 46 | this pass |
| Register row text and QA-owned State cells | `agent-output/qa/012-message-valid-field-qa.md` rev 9 | this pass |
| QA-R10, QA-R11, QA-R17 execution state | `agent-output/deployment/012-message-valid-field-deployment.md` | this pass |
| The owner's own observations | plan changelog revs 44, 45, 46 — lodged by `steering-hooks-012-2` from words given directly to it | this pass |
| Backfill distribution | `agent-output/verification/012/backfill-report-*.md` (file bytes, read directly) | this pass |

Nothing restated here is re-litigated. Where this addendum corrects something **this document**
previously claimed, it does so as a dated reconcile note preserving the superseded text.

### Tree identity — reproduced from the tree, not inherited

Re-derived by this pass, not taken from the header:

- `website` — **`master`**, `a74b9e2`, clean (`git status --porcelain` → 0 lines, counted by
  `grep -c`, not through a filtered pipe). The chain-012 verdict tip **`c85945f` is an ancestor of
  `master`** (`git merge-base --is-ancestor c85945f HEAD` → true), so the released production code
  is contained in the current tree; `a74b9e2` is chain 013's tip on top of it.
- `project-utils` — **`chain/012-message-valid-field`**, `749606d`, and `749606d` is an ancestor of
  `origin/master` (verified). The branch the working tree rides is **not** `master`; the released
  content is on `master` regardless.
- `agent-output` — `master`.

Both code populations are **committed**, so the content-identity fallback is not constructed and no
manifest is owed. **The verdicts below were reached at `website` `c85945f` (chain 012's production
code) with the owner's observations taken against the deployed tree containing it, and
`project-utils` `749606d`. Any change to production code expires the code-review verdict, the QA
verdict, and this release decision with them.**

*One correction to steering's brief, made from the tree rather than from prose*: the brief stated
`website` is on `master` — it is, and `project-utils` is on the chain branch. Re-derived here as
instructed; both statements check out.

### What this pass was handed, and what it found instead

Steering's brief named three items as unfinished which the documents show finished. Recorded as a
**delta between the brief and the register**, resolved in the register's favour per this stage's
standing rule to verify every reference to a numbered ledger item against the ledger:

| Brief said | Register / deployment record says | Resolution |
|---|---|---|
| *"QA-R19 is being re-specified right now. Do not treat R19 as final"* | QA rev 9: R19 re-specified (D28) and **EXECUTED, PASS — 2026-08-25, `a74b9e2`**, 17/17 green, 3 mutants red; owner re-assigned `owner` → `qa` because the primary instrument needs no human | Terminal on evidence. Steering's follow-up message confirmed this independently |
| *"R10, R11 and R17 sit with devops"*, R17 *"the only executable trace"* | Deployment record, 2026-08-23: **R10 EXECUTED PASS**, **R11 EXECUTED PASS**, **R17 EXECUTED (documentary)** — the D12 relay **is** recorded | Terminal. The register's `Open` cells are **records-lag**, as QA itself reports; the deployment record is authoritative and was read here |
| The ten rows outstanding at D20 were *"R2, R3, R4, R5, R6, R7, R8, R9, R15, R20"* | This document's Addendum 4 recorded the ten as **R3, R4, R5, R6, R7, R8, R9, R15, R19, R20** — R2 was `EXECUTED` at that date and R19 was not | See the reconcile note below. Both lists are ten; they differ by R2/R19, and **both rows are terminal now regardless**, so nothing was missed either way |

### Reconcile note — R2 was executed twice, against two different specifications

**This document previously said** (Addendum 2, 2026-08-23): *"QA-R2 — **EXECUTED, PASS
(2026-08-23)** — `valid: false` at top level"*, and Addendum 4 carried R2 among the terminal rows.
**That text stands as written and is not overwritten.**

**Why it was defensible when written**: R2's subject was then record 5712, genuinely stranded, and
the observation was a true pass against the row as specified.

**What changed**: the owner repaired 5712 by direct SQL as part of chain 013 (D26's material fact).
That did not falsify the 2026-08-23 reading — it **spent the row's discriminating power**, because a
`true` on a repaired 5712 is now the *correct* reading, not the failure R2's clause describes. On
that ground the owner ruled **D27**, re-specifying R2 onto SCR-1. R2 therefore re-entered the
outstanding set on **2026-08-25**, not at D20 — which is the whole of the discrepancy with steering's
list, and steering's own rev-42 lodgement independently records R2 having gone missing from its queue
file.

**Both executions are recorded, neither over the other.** R2 (original spec, 5712) EXECUTED PASS
2026-08-23; R2 (re-specified, SCR-1, D27) EXECUTED PASS 2026-08-25.

### The rulings this pass acts under

Read at source in the plan register this pass; pointers, not restatements:

- **D22** — D20's hold is **withdrawn**; resumption scoped to *"everything — drive to closure"*.
  Addendum 4's hold is therefore spent, and this addendum is the resumption it anticipated.
- **D23** — QA-R4 and QA-R15 routed back to QA to be re-specified, **superseding D19**. This is
  UAT's own U-5 Preferred recommendation, declined at D19 and taken here.
- **D24** — the row-5842 shape question is **dropped entirely**. Not carried, tracked, re-raised or
  audited against. This pass does none of those things.
- **D25** — the repair guidance ships as **one instruction**.
- **D26** — the pre-send observation of the repair route is **WAIVED**. Not reopened here, not made
  a condition here, and nothing below is proposed as a new condition on the send.
- **D27** — QA-R2 re-specified onto SCR-1.
- **D28** — QA-R19 re-specified against D25.
- **D18** — scope is closed. Everything newly found below folds into handoffs, not into the plan.

---

## The Register, Terminalised — 20 of 20

**This table supersedes the row-state tables in Addenda 2, 3 and 4**, which stand as written at their
dates. Observed results are recorded **beside** predictions, never over them.

**Terminal-state vocabulary**, per this stage's remit: `EXECUTED` (with result and date),
`WITHDRAWN` (owner ruling), `SUPERSEDED` (with what replaced it). `NOT EXECUTED` is **not** a
terminal state. **No row below stands at `NOT EXECUTED`.**

### Rows terminal before this pass — 9

| Row | Terminal state | Prediction | Observed | Authority |
|---|---|---|---|---|
| **QA-R1** | `EXECUTED, PASS` — 2026-08-23, `17cada0` | 20/20 (spec grew to 36) | 36/36 green; B3/B5/B7 flipped, every A-cell unmoved | QA rev 6 |
| **QA-R10** | `EXECUTED, PASS` — 2026-08-23, release tip | Clean install and build | `pnpm install --frozen-lockfile` exit 0; `npm run build` exit 0; both v1 routes present. Deviation recorded: `rm -rf node_modules` not run (shared tree); property verified by frozen install instead | Deployment record |
| **QA-R11** | `EXECUTED, PASS` — 2026-08-23 | Order holds | 3 of 5 binding precedences HELD at the release act; 2 correctly still PENDING. **See U-7 below** — the tail is not yet fully decidable, and that is devops' to record, not this stage's to reopen | Deployment record |
| **QA-R12** | `SUPERSEDED` — 2026-08-23 | — | Closed by D12 (*"Order Statbot's deploy last"*); **succeeded by R17**, the executable half | QA register |
| **QA-R13** | `SUPERSEDED` — 2026-08-23 | — | Closed by D11 (*"Clear the flag on switch back"*); **succeeded by R14, R15, R16** | QA register |
| **QA-R14** | `EXECUTED, PASS` — 2026-08-23, `17cada0` | All green | M2-e block green; 5 departing states + masking control green; `flags = 0` mutant and dropped-disjunct mutant both observed killed | QA rev 6 |
| **QA-R16** | `SUPERSEDED` — 2026-08-23 | — | Closed by D13 (*"Stands, but point the guidance at the JSON editor"*); **succeeded by R19** | QA register |
| **QA-R17** | `EXECUTED` (documentary) — 2026-08-23 | Relay recorded | The D12 ordering instruction **was relayed** to the statbot workspace via that workspace's steering thread, and the record correctly does **not** claim statbot's compliance | Deployment record |
| **QA-R18** | `SUPERSEDED` — 2026-08-23 | — | Closed by D14 (*"Measure the population first"*); owner's live POST **withdrawn, not deferred**; **succeeded by R20** | QA register |

### Rows terminalised by this pass — 11

**Ten by the owner's own directed observations**, given to `steering-hooks-012-2` on 2026-08-25 and
lodged at plan revs 44–46. **One by QA's instrument.** Under the standing ruling that an owner's
report on an item is terminal, none of the ten is re-questioned here.

**The three SCR-1 rows were run in the register's prescribed order — R4 → R2 → R15** — which is the
constraint QA rev 9 made authoritative because R15 is a persisting act that ends the state the other
two observe. The order held, so no observation is void.

| Row | Class | Terminal state | Prediction (register) | Observed (owner's words, verbatim) |
|---|---|---|---|---|
| **QA-R2** *(re-spec., D27)* | post-deploy-obs. | `EXECUTED, PASS` — 2026-08-25 | `valid: false`, key present, on SCR-1 in state α. Single observation refutes by construction | *"QA-R2 - -as expected-"*. Read **after R4**, which is what disambiguates the three-way reading; R4 showed the error, so no void-and-rebuild branch fired |
| **QA-R3** | post-deploy-obs. | `EXECUTED, PASS` — 2026-08-25 | `valid: true` on a bare-Text-Display V2 record. **R2's paired positive control** | *"QA-R3,5,6,7,8 - -as expected-  All cleared."* — the mass-invalidation failure mode is the one this row exists to catch, and it did not fire |
| **QA-R4** *(re-spec., D23)* | post-deploy-obs. | `EXECUTED, PASS` — 2026-08-25 | SCR-1 opens in **Components V2 mode**, shows *"Components V2 messages cannot contain embeds or content."* verbatim, Send unavailable | *"QA-R4 - -as expected-"*. **This also discharges QA's deploy-lag assumption** — see below |
| **QA-R5** | post-deploy-obs. | `EXECUTED, PASS` — 2026-08-25 | Modal shown, classic→V2 | *"QA-R3,5,6,7,8 - -as expected-  All cleared."* Row underspecified — see U-8 |
| **QA-R6** | post-deploy-obs. | `EXECUTED, PASS` — 2026-08-25 | Modal shown, V2→classic | as above. Row underspecified — see U-8 |
| **QA-R7** | post-deploy-obs. | `EXECUTED, PASS` — 2026-08-25 | Save of an unsendable draft **succeeds**; next fetch shows `valid: false` | as above. The failure this excludes is the one the owner explicitly ruled against at D1 — that the field had silently become a gate on saving work in progress |
| **QA-R8** | post-deploy-obs. | `EXECUTED, PASS` — 2026-08-25 | `SELECT count(*) FROM "Messages" WHERE valid IS NULL` = **0**, after backfill and **before** the live declaration | as above. Both clauses hold: the declaration has not happened, so the "before" is satisfied by fact rather than by assertion |
| **QA-R9** | pre-release **(gate)** | `EXECUTED` — gate satisfied, 2026-08-25 | Owner has **reviewed** the M6-b distribution incl. the evaluation-failure count **and** row ids, before the declaration | *"QA-R9 sure, looks fine"*. **His decision, not a QA verdict** — recorded as his. What he reviewed and what he accepted with it are itemised below |
| **QA-R15** *(re-spec., D23)* | post-deploy-obs. | `EXECUTED, PASS` — 2026-08-25 | One press of Classic then Save, no JSON modal; afterwards **`IS_COMPONENTS_V2_FLAG` (32768) cleared**, `content` unchanged, `valid: true` | *"QA-R15 - -as expected-"*. **Run last, as required.** This is the end-to-end verification of D11 that closure has waited on since 2026-08-23 |
| **QA-R19** *(re-spec., D28)* | pre-release | `EXECUTED, PASS` — 2026-08-25, `a74b9e2` | All 6 class members lossless, bit cleared, sendable, no modal | QA's own run: **17/17 green, 3 mutants observed red**, the class enumerated by the **shipped classifier** rather than from prose. Corroborated end-to-end once by the owner's R15 — SCR-1 is itself a class member. **Bound recorded, NOT closed** — see U-9 |
| **QA-R20** | pre-release **(gate)** | `EXECUTED` — gate satisfied, 2026-08-25 | `whitespaceContent` carried as its own named category with count **and** row ids, reviewed by the owner. Plausibly **0** | Asked whether a count of **0** was what he expected: *"Yes, thats's fine"*. **Instrument pinned by this pass** — see U-10 |

### Reconciliation

**20 = 9 (terminal before) + 11 (terminalised here).**
**16 `EXECUTED` · 4 `SUPERSEDED` · 0 `WITHDRAWN` · 0 `NOT EXECUTED`.**

No row is silently omitted, none is recorded "satisfied incidentally", and no second register was
found. **The chain ran on one register and still does** — QA-R1…QA-R20, minted by QA, appended to by
later gates. The two obligations that were travelling outside it (U-3, 2026-08-23) were folded in at
the time and remain folded in.

### What QA-R4's pass discharges beyond its own row

QA rev 9 booked an **Assumption Not Checked**: that the deployed composer serves `a74b9e2`'s code,
untested, with a falsity signature that *"does not look like a deployment problem, it looks like D11
failing"*. QA made it partly self-checking by requiring SCR-1 to **open in Components V2 mode** —
`isMessageV2` and `detectMessageMode` do not exist at `c85945f`, so mode-detection-from-flag is a
chain-013 behaviour and a record opening in *Classic* would have meant a lagging deploy.

**SCR-1 opened as predicted.** The assumption is therefore **discharged by observation**, not merely
carried — and the specific misreading QA feared (recording a red against D11 when the fix was simply
never served) did not arise. Recorded because it is the pre-registered discriminator earning its
keep, which is the second time on this chain (QA-R15's flag-free clause was the first).

---

## Weighing the Evidence — loud modes and silent modes, classified before weighing

This stage's standing rule is that an operator's *"it has been running with no errors and no
reports"* is real evidence against **loud** failure modes and **no evidence at all** against silent
ones, because absence is what the attestation is made of.

**That rule bites less here than it did on 2026-08-23, and the reason is worth stating precisely.**
What the owner supplied is not an absence-attestation. Each of the ten rows carries a
**pre-registered prediction, a named primary instrument, and a named subject**, and he brought the
instrument to the subject and reported the result. A row like QA-R15 — *the persisted record carries
no `IS_COMPONENTS_V2_FLAG`* — is a **positive, discriminating observation**: its signature is a value
appearing where none was, and the flag-free clause was written specifically to exclude the
non-discriminating route a good-faith observer might otherwise have reported as a pass. That is the
register working as designed, and it is stronger evidence than an attestation.

**The attestation form is also terminal in itself.** The owner's statement, with its timestamp, *is*
the evidence for an owner-executed row. No capture file is owed for any of these, none is asked for,
and none is recorded missing.

**What remains silent, and is therefore recorded as unverified rather than as covered:**

1. **Plan Risks R7 — per-field embed limits, no instrument by construction.** `validateMessage`
   checks the 6,000-character aggregate and does not evaluate per-field embed limits, so records
   violating them sit **inside the 4750 marked valid, uncounted**. The clean M6-b report is computed
   by the very predicate that omits the check, so citing it against R7 argues in a circle. **Stated
   to the owner at the point he settled QA-R9 and accepted by him there.** Not a new finding, does
   not reopen R9, **and not closed.** This is the fifth time this chain has recorded it.
2. **QA-R20's zero is not a Discord determination.** The whitespace-content class is empty *for this
   corpus, at this time* — and it is empty **and unguarded**. What lands in it next is decided by
   gate behaviour nobody has tested, since D14 withdrew the owner's live POST rather than deferring
   it. Silent: the signature would be a send hooks.gg vouched for failing at Discord.
3. **QA-R19's bound.** The one instruction is lossless for every class member **the product can
   author**; a member carrying a top-level component that is neither type 1 nor V2-typed is
   **silently dropped**. Whether any real record sits in that bound is not established. Silent by
   construction — the loss is quiet and reads to a guild owner as a hooks.gg bug rather than as
   following instructions. **Bounded, not closed.** See U-9.
4. **The fourth-shape risk**, accepted with **D24**. Recorded once here as an accepted consequence
   of a ruling; **not carried, not tracked, not audited against**, per D24's own terms.

**None of these is a release blocker, and none is offered as one.** Production working is context
for a release decision; here it is not being asked to substitute for a skipped gate, because no gate
was skipped.

---

## Findings — this pass

Prior findings U-1, U-2, U-3 stand as recorded. U-4, U-5 and U-6 reach terminal state here.

### U-4 — **WITHDRAWN by owner ruling D24**

U-4 required 5842's shape to be determined before the guidance was sent, terminal state
`NOT EXECUTED`, owner. **The owner dropped the question entirely (D24)** — *"not carried, not
tracked, not recorded as open, not re-raised, and not handed to any stage"* — accepting with it that
the guidance is derived over the three known shapes only and the fourth-shape risk is not covered.
**Terminal: `WITHDRAWN`, by the only party who may rule a withdrawal.** The finding's own text stands
as written; this pass does not audit against it and raises nothing that depends on it.

### U-5 — **CLOSED, discharged by execution**

U-5's Preferred recommendation was *route back to QA for re-specification*. Declined at D19; **taken
at D23**, which supersedes D19. QA re-specified R4 and R15 onto SCR-1, a subject that exists and is
**rebuildable** — the property U-5 identified as missing. The owner executed both. **The
specification defect U-5 named is repaired and the rows it stranded are terminal.** The cost D19's
alternative would have carried — *nothing then verifies D11 end to end* — was not paid: R15 verifies
it.

### U-6 — **DISCHARGED for the send; the underlying hypothesis stands, routed**

U-6 held that the owner's report — *"the JSON view seems to not support components V2 at all. It's
possible that the import is stripping content"* — was a candidate falsifier for plan Risks **R6**,
and that it threatened guidance **shape (i)**, which pointed guild owners at the JSON editor's
*Load*.

**The route U-6 questioned is no longer in the guidance.** D25 ships **one instruction** — switch to
Classic and save — and explicitly does **not** offer the JSON-Load route in the send. So the harm
U-6 named (guild owners told to do something that loses their content) cannot arrive through the
guidance. **Discharged on the substance, in a different document than the one it named**, and the
delta is recorded here rather than returned for a documentation shuffle.

**What is not closed**: D25 keeps the JSON-Load route recorded at plan Validation item 7 *as
mechanism and fallback*. The owner's hypothesis about the JSON view's V2 support was never
established or refuted, so **anyone who later reaches for that recorded fallback reaches for an
unverified path.** Recorded against plan Risks R6 as a candidate member of its falsifier class —
which is R6's own contract and not scope expansion — and folded into the handoff, not the plan
(D18).

### UAT's hold on the QA-R19 send is **LIFTED**

Addendum 2 held the send on **two independent grounds, U-4 and U-6**. Both are terminal above: U-4
withdrawn by D24, U-6 discharged by D25's collapse of the guidance. **Neither ground survives, so the
hold falls.**

Stated precisely, because the distinction matters: this is **not** UAT granting permission. D26
already waived any pre-send precondition, and QA rev 9 states flatly that the guidance may be sent at
any time, in any order relative to the register rows. **What this paragraph records is that this
stage's own contrary hold is now dissolved**, so nothing in the UAT ledger stands against owner-queue
item 2. **Nothing here is proposed as a new condition on the send and D26 is not reopened.**

### U-7 (LOW, records; devops-owned, not reopened here) — QA-R11's tail precedences are not yet fully decidable

QA-R11 is `EXECUTED, PASS` in the deployment record and this pass records it as terminal on that
authority. Read alongside it, the record's own precedence table shows **3 of 5 binding precedences
HELD and 2 PENDING** at the release act: *backfill → review → declaration*, and *declaration →
statbot's gate deploy* (D12).

Since that mark, backfill and review have both occurred (QA-R9, QA-R20 above). **The last precedence
is still undecidable**, because the live declaration has not happened.

**This is not a reopening.** R11's earliest-decidable field says *"at release"*, and verifying an
order *as an order* at release is precisely what devops did — including recording the tail as
correctly still pending. **The finding is that the deployment record has an open tail nobody is
scheduled to close.** Routed to **devops** as the row's recorder: when the declaration lands, the
record should state the tail's outcome. **Review trigger: the live declaration.**

### U-8 (LOW, records) — QA-R5 and QA-R6 were underspecified, and the owner's pass does not make them well-formed

Both rows predict *"modal shown"* unconditionally; `handleModeSwitch` gates the modal on
`hasDepartingData`. QA verified that gating is **byte-identical at `c85945f` and `a74b9e2`**, so the
rows were written against code that already behaved that way — **underspecified, not overtaken**,
which is a lesser and different defect from R2's and R19's.

**The owner cleared both and his report is terminal; neither is reopened, and QA deliberately did not
re-specify them** because widening to them is the expansion D18 forbids. **Recorded solely so a later
reader does not take the clearance as evidence the rows were well-formed.** Retrospective material.

### U-9 (MEDIUM as a disclosure; not a release blocker) — QA-R19's bound is recorded, not closed

Carried forward from QA rev 9 into this ledger so it does not live only in QA's document: the
guidance is lossless for every class member the product can author; a member with a top-level
component that is neither type 1 nor V2-typed is **silently dropped**. QA demonstrated it with a
top-level type-3 select menu, which the shipped classifier calls a genuine member.

**This pass did not audit the bound and does not open the audit** — such records are unauthorable
through the editor, no real member is known, and D24 fences part of the adjacent territory. **If a
guild owner ever reports losing data after following the one instruction, that report is this
bound having a real member** — and it reopens the route's mechanism (plan Risks R6, Validation item
7), which is exactly what D26's reopening class already says. Handoff material under D18.

### U-10 (LOW, evidence hygiene) — QA-R20's terminal state is pinned to the only run with a denominator

Four backfill reports now sit in `verification/012/`, and steering's own lodgement (plan rev 45)
records that the queue entry naming QA-R9's subject **named no particular report**. This pass read
all four file bytes directly rather than inheriting a number:

| Run | Rows classified | Table-wide count | `whitespaceContent` | Tracked |
|---|---|---|---|---|
| `1787522824426-i0womw` (2026-08-23 22:07) | 0 | −1, **interrupted** | 0 | tracked |
| **`1787522866564-i3s31k` (2026-08-23 22:07–22:10)** | **4825** | **4825** | **0** | tracked |
| `1787644022885-3k0xp8` (2026-08-25 07:47) | 0 | −1, **interrupted** | 0 | untracked |
| `1787644055925-ekngfa` (2026-08-25 07:47) | 2 | 4839 | 0 | untracked |

**Only the 2026-08-23 table-wide run has a denominator.** Its numbers are the ones plan rev 45
records the owner reviewing at QA-R9 — 4825 of 4825, 4750 valid / 75 invalid across seven refusal
reasons, `evaluationFailures` 0, `flagStructureDisagreement` = 2 (rows 5712 and 5842). **QA-R9 and
QA-R20 are therefore pinned to `backfill-report-1787522866564-i3s31k.md`.** A `whitespaceContent`
count of 0 read off either 07:47 run would have covered 0 and 2 rows respectively and carried no
information; **the reading is 0 in all four, so the owner's answer is not disturbed — only its
instrument is pinned**, which is the point of recording it.

**Two things left alone, deliberately.** The two untracked 07:47 reports are **not this stage's to
commit, move or delete** — authorship is unidentified and they sit in a shared tree. And the
table-wide count has moved **4825 → 4839** since the backfill; the 14 new rows arrived after the DDL
and deploy, so they carry `valid` from M4's write path rather than from any backfill run, which is
consistent with QA-R8's `NULL` count of 0 being taken **today**, against 4839 rows, and not against
the backfill's 4825.

### U-11 (LOW, hygiene; no gate) — SCR-1's disposal is unrecorded and its id is unknown to this ledger

QA's Disposal clause obliges a record of SCR-1's id **only** if the sequence stops part-way, leaving
a stranded record. **The sequence completed** — R15 ran — so SCR-1 ends in state β: bit cleared,
`content` unchanged, `valid: true`, an ordinary Classic message. **No obligation fired and this is
not a gate.**

What remains is that a scratch record probably still sits in the production `Messages` table, its id
recorded nowhere in `agent-output`, and it is almost certainly one of the 14 new rows above. It is
benign — it will read as a valid Classic message in any future table-wide run, **not** as the
`flagStructureDisagreement` row a part-way stop would have left. Recorded for the owner's
convenience if he wants it deleted; **not asked of him, and nothing waits on it.**

### U-12 (LOW, records; **self-inflicted, found and fixed in this round**) — this document's own `Status-Detail` read as blocked to the instrument that parses it

`tools/check-repo.js --status` matches each document's `Status` + `Status-Detail` against a
`FAILING` regex (line 663) whose alternatives include `NOT[ _-]EXECUTED`. **Addendum 5's first
`Status-Detail` reported the register as "16 EXECUTED, 4 SUPERSEDED, 0 NOT EXECUTED"** — and the
matcher has no notion of negation, so **the clause announcing that no row is blocked was itself read
as a blocked row.** Chain 012's UAT line rendered `⚠ FAILING/BLOCKING` on the strength of a verdict
that says the opposite.

**Fixed in the same round it was found**: the field now states the absence rather than naming the
state, and the flag is gone (re-run and read from file bytes, not through a filtered pipe). The
substance of the verdict is unchanged — 16 `EXECUTED`, 4 `SUPERSEDED`, nothing outstanding.

**Recorded rather than quietly corrected, because it is this chain's own recurring class at one more
remove.** It is the same shape as QA-R2's booby trap (D27): *text that was correct as written, which
inverts when its next reader is not the one it was written for.* R2's next reader was a queue-runner;
this field's is a regex. The chain has now produced this defect in a register row, in a steering
queue file (plan revs 42, 45, 46) and in a UAT frontmatter field — **three different surfaces, one
mechanism**, which is worth the retrospective's attention more than any single instance.

**Same class, not mine, reported not fixed**: chain 012's **planning** document also renders
`⚠ FAILING/BLOCKING`, because its `Status-Detail` narrates the historical review rounds and contains
the word `REJECTED` from rounds 1 and 2 — both long since closed. The plan is the planner's document
and D18 forecloses touching it; recorded here so a reader who sees the flag knows it is a false
positive with a known cause, and does not take chain 012's plan for a blocked plan.

---

## Value Delivery Assessment — at closure

**The Value Statement is delivered in mechanism and now in effect, on every clause, with one
communication act outstanding.**

Taking the statement clause by clause against terminal evidence rather than against a summary:

| Clause | Evidence | State |
|---|---|---|
| *"carry a machine-readable `valid` field"* | QA-R2 (SCR-1, `false`) and QA-R3 (`true`) — **both directions observed through the v1 API Statbot actually reads** | **Delivered, observed in production** |
| *"computed from the composer's own send checks"* | QA-R1 (36/36 partition, every A-cell unmoved) + QA-R4 — the composer's own error string and the stored verdict agree on the same record | **Delivered** |
| *"recomputed on every save"* | QA-R7 (save an unsendable draft → succeeds → next fetch shows `valid: false`) and QA-R15 (the Classic save flipped `valid` to `true`) — **the recompute observed in both directions** | **Delivered, observed in production** |
| *"backfilled across all existing records"* | QA-R8 (`valid IS NULL` count = 0, taken today against 4839 rows) + the table-wide run, 4825 of 4825 classified | **Delivered** |
| *"so that Statbot can refuse messages hooks.gg already knows cannot be sent"* | The field exists, is populated, is exposed, and is non-NULL. **Statbot cannot yet key off it, because the live declaration has not been made** and D12 orders its gate deploy after that declaration | **Mechanism complete; the consumer is not yet switched on** |

**The gap the chain existed to close is closed.** The handoff framed it exactly: *"hooks.gg already
knows which messages cannot be sent; it just has no machine-readable way to say so."* It now has one,
and both directions of it have been read from production.

**The remaining step is a communication act, not engineering.** The live declaration is the owner's
by design (D6/D12) — that is the plan's own sequencing, not deferred value. **Core value is not
deferred.**

**One thing the chain delivered that it was not asked for, worth recording as value**: D11's
recovery. The plan could have shipped a clearer error with no way to act on it — that was the live
alternative at F-QA1/D13. Instead a guild owner in the stranded state has a one-click repair, and
**that repair has now been executed end to end, in the deployed app, by the owner himself**
(QA-R15), and proven lossless across the whole authorable class by instrument (QA-R19). D26 accepted
the risk that the first person to run it would be an affected guild owner; **that risk did not
materialise.** Recorded as an event, per D26's own terms — **nothing is waived differently and D26 is
not reopened.**

**Drift from the D15-ratified objective: none detected.** No criterion was dropped, no milestone
substituted. Every change of specification in this chain (D23, D27, D28) changed a **subject or a
premise**, never a property — R2, R4, R15 and R19 all still assert what they always asserted.

---

## Release Decision — final

### Status of the 2026-08-23 conditional approval

Issued **APPROVED FOR RELEASE, CONDITIONAL** at `website` `c85945f` / `project-utils` `749606d`, in
the required form, naming every outstanding item with an owner and a terminal state. The release act
occurred within its terms on 2026-08-23. **The UAT document existed before the deploy it covers**, so
no recovery-state ordering applies here.

**Every condition that approval named has now reached a terminal state.** The conditional approval is
therefore **DISCHARGED**.

### Final status

> ## **APPROVED FOR RELEASE — UNCONDITIONAL**
>
> All **20** register rows terminal: **16 `EXECUTED`, 4 `SUPERSEDED`, 0 `NOT EXECUTED`.** No
> condition stands outstanding, none was withdrawn without an owner ruling, and none is recorded
> "satisfied incidentally".

**Identity this verdict is reached at**: `website` `c85945f` (ancestor of `master` `a74b9e2`, both
verified from the tree this pass) and `project-utils` `749606d` (ancestor of `origin/master`,
verified). Both committed; no content-identity manifest owed. **Any change to production code
expires the code-review verdict, the QA verdict, and this release decision with them.**

### Chain closure

**The register no longer blocks closure.** Two items remain, and **neither is a register condition,
neither gates the release act, and this decision depends on neither** — stated plainly rather than
assumed, as the brief asked:

1. **The live declaration to statbot** — owner's act, not made. By **D12** it also releases statbot
   chain 023, held since 2026-08-23 with no session told. **Whether to tell that side is the owner's
   call and it has not been made.** No agent here may make it, and none does. Devops needs his words
   and the timestamp for the record (QA-R17's relay is recorded; the declaration itself is not).
2. **Sending the repair guidance** — owner's act, not made. **No agent on this machine may send it**,
   and UAT's own hold on it is lifted above.

**Recommendation: the chain is releasable-complete and closure-ready on the register.** Whether to
record the chain *closed* before those two owner acts is a judgement for devops and the owner, not
this stage's to make — but nothing in the UAT ledger stands in the way, and **no condition is being
worked around to say so.**

### Versioning and release notes

**Recommended version: minor.** A new nullable-then-populated column plus a new field in the v1 API
response is **additive** for every existing consumer — no field removed, no shape changed, nothing
that reads hooks.gg today breaks. It is not a patch: the API contract grew, and a downstream
integrator (Statbot) is being invited to depend on the new field.

**Key changes for the changelog:**

- Stored messages now carry a machine-readable **`valid`** field, computed from the composer's own
  send checks and recomputed on every save.
- The `valid` field is exposed at the top level of the v1 guild-messages API response.
- All existing records backfilled — 4825 of 4825 classified, 4750 valid / 75 invalid, zero
  evaluation failures.
- The composer's mutual-exclusivity check corrected (the B3/B5/B7 cells), so messages Discord
  rejects with `50035` are now refused before send instead of after.
- Switching a message from Components V2 back to Classic now **clears** the V2 flag — a one-click
  recovery for messages stranded in a flag/structure disagreement, verified lossless across the whole
  authorable class.

**Known limitations to carry into the notes** (all recorded above, none new): per-field embed limits
are not evaluated, so the `valid` field's `true` does not assert them; the whitespace-content class is
empty for this corpus but unguarded; and the repair instruction is lossless for every message the
editor can author, with records written outside the editor outside that bound.

---

## UAT Status

**Status: UAT Complete.**

**Rationale.** The Value Statement is delivered on every clause and both directions of the field have
been observed in production through the API Statbot reads. The chain's single blocking-condition
register is fully consumed — 20 rows, 20 terminal states, no omissions and no parallel ledger. The
one thing that has genuinely never been verified — plan Risks **R7**, a silent class with no
instrument by construction — is recorded as unverified for the fifth time rather than laundered
through a clean production result, and was accepted by the owner on the record at the point of
decision.

**Residual risks, restated so they are not read out of the summary**: R7's silent class; QA-R20's
unguarded-but-empty whitespace class; QA-R19's open bound; the fourth-shape risk accepted at D24;
and the JSON-Load fallback at plan Validation item 7, which remains recorded and unverified (U-6).

**Next stage: devops**, to record the release complete and act on U-7's trigger — then the
retrospective, whose precondition (UAT Complete) is satisfied and which no longer waits on anything,
the hold having been withdrawn at D22.

## Next Actions

*Point-in-time list — later stage documents are authoritative on these items' current state.*

| # | Item | Owner | Trigger |
|---|---|---|---|
| 1 | Live declaration to statbot; record his words and the timestamp | **Owner** (devops records) | — |
| 2 | Send the repair guidance (D25's one instruction) | **Owner** | — |
| 3 | Record QA-R11's tail precedence outcome (U-7) | devops | The live declaration |
| 4 | Close chain 012's deployment record and this document | devops | Owner's ruling that the chain is complete |
| 5 | Retrospective — U-8, U-9, U-10 and Addendum 4's five carried observations are its material | retrospective | Now; precondition satisfied |
| 6 | Delete SCR-1 if wanted (U-11) — benign, nothing waits on it | Owner | — |

**Handing off to devops agent for release execution.**
