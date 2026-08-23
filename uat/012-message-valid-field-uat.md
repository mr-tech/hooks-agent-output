---
ID: 012
Origin: 012
UUID: 12a4fe3c
Parent: message-valid-field-for-statbot-2026-08-23.md
Verified-At: >-
  website `chain/012-message-valid-field` @ `c85945f` (clean tree, reproduced from the tree by this
  pass: `git status --porcelain` empty, `git diff --numstat HEAD` empty). project-utils
  `749606d`, verified on `origin/master` (`git merge-base --is-ancestor 749606d origin/master`
  → true). Both populations committed, so the content-identity fallback is NOT constructed and no
  manifest is owed — the fallback exists only for uncommitted content. **Any change to production
  code after this expires the code-review verdict, the QA verdict, and this release decision with
  them.**
Status: Active
Status-Detail: >-
  UAT Complete. Release decision **APPROVED FOR RELEASE, CONDITIONAL** — issued 2026-08-23 at
  `c85945f`, and correctly discharged: the release act occurred within its terms (`aa07a59`).
  **The chain is NOT closed.** Post-deploy-observable rows gate closure, not the release act, and
  10 of the 20 register rows are terminal (QA-R1, R2, R10, R11, R14, R17 EXECUTED; R12, R13, R16,
  R18 SUPERSEDED by owner rulings) with **10 outstanding** — QA-R3, R4, R5, R6, R7, R8, R9, R15,
  R19, R20. Walkthrough round 1: M6-c and QA-R2 PASS; **QA-R4 and QA-R15 NOT EXECUTED** — their
  subject, record 5712 in the composer, is unreachable by the owner, so the instrument could not
  be brought to bear (U-5). **Owner ruled D19, verbatim "Leave them open"** (plan rev 32): neither
  re-specified nor withdrawn, so both stay `NOT EXECUTED` — open by ruling, still not terminal, and
  chain closure stays blocked as the consequence he accepted. The QA-R19 **send** is held on two independent grounds: U-4 (row 5842's shape unknown)
  and U-6 (the JSON-editor route for 5712's own shape is a candidate falsifier for plan Risks R6).
  Value Statement delivered **in mechanism and now in the stored verdict and its exposure** —
  M6-c and QA-R2 confirm both against production. Silent classes still unverified, not covered:
  plan Risks R7 (no instrument by construction) and the recovery path (U-5/U-6).
  **THE EFFORT IS ON HOLD** — owner ruling **D20** (plan rev 34), verbatim *"This effort is on hold
  until the fixes are implemented."* Whole chain, not closure alone. No row changed state and none
  is withdrawn; the seven runnable rows will not be run. `Status` is kept **Active** on purpose —
  `Deferred` is terminal and would archive a ledger carrying ten live conditions. **UAT's own work
  is complete and needs no successor**; Addendum 4 is the resumable record, and by D12 the held
  live declaration also holds statbot chain 023.
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
