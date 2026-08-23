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
  UAT Complete. Release decision: **APPROVED FOR RELEASE, CONDITIONAL** on the outstanding-condition
  ledger below — 6 of the chain's 20 register rows are terminal, 14 stand open, and none may be
  silently dropped. No unconditional approval is available while any pre-release row is NOT
  EXECUTED. Value Statement judged **delivered in mechanism, not yet in effect**: the field is
  built, tested and exposed, but it reaches Statbot only when the owner-executed DDL, backfill and
  live declaration complete. Two silent failure classes recorded as unverified rather than covered
  (plan Risks R7 — no instrument by construction; plan Risks R5 — instrument is QA-R20's count).
---

# UAT Report: Plan 012 — `valid` field on stored messages

**Plan Reference**: `agent-output/planning/012-message-valid-field.md` (rev 29, `272fbb7`)
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
