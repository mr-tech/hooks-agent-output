---
ID: 013
Origin: 013
UUID: 22d69e06
Parent: components-v2-editing-support-2026-08-23.md
Status: Released — chain closure pending
Status-Detail: >-
  Deployment record for the release that ran on 2026-08-25 at 00:56:37 UTC: `website` serving ref
  `master` moved `c85945f` → `a151fb4`. **Externally executed by the owner, outside this stage's
  Stage 2 gate** — no release summary was presented and no Phase 2B approval was given or recorded.
  Recorded as a recovery state, not a sanctioned ordering. Serving state is **attested by the owner**
  and is not marked NOT VERIFIED. Discharges **U-C7**, and discharges **D25 item (iii)** by its second
  route — this record states the wider class M7 changes, which R-5 as written does not. Twelve `PRE`
  rows went out unexecuted; **BC-11b is now permanently unexecutable** (readiness F-7 realised).
  **BC-13 terminalises on the clock.** One line remains owed on the owner's word: whether the D19
  repair preceded or follows the deploy.
---

# Deployment Record — Plan 013: Components V2 across the editing surfaces

## Authority for restated status

**The UAT document is the authority for every blocking-condition state in this record, and the QA
document for every row definition.** Nothing here re-litigates either. Both were re-read at the time of
writing, not carried from an earlier read in this session. Where this record states a condition's state
it is restating, not deciding.

## 1. Plan reference and release identifier

| Field | Value |
|---|---|
| Plan | `agent-output/planning/013-components-v2-editing-surfaces.md` |
| Release identifier | `website` serving ref `master` moving `c85945f` → **`a151fb4`** |
| Release date | **2026-08-25, 00:56:37 UTC** (push) |
| Environment | production |
| Epic | Components V2 editing support |
| Execution mode | **Externally executed.** Operator: **the owner** |

**There is no version and none was synthesised.** `website/package.json` carries no `version` field
(`grep -c '"version"'` → 0) and the repo has no CHANGELOG. Per the plan's Release Artifacts, the release
*is* the serving ref moving. Per Core Responsibility 3 the version check is therefore replaced by the
cross-repo dependency reference check, recorded at §4.

## 2. Repositories and SHAs shipped

| Repository | Ref moved | SHA | Note |
|---|---|---|---|
| `website` | `master` | **`a151fb4`** | the whole of this release |
| `project-utils` | none | — | untouched; consumer pin unchanged (§4). 013 writes no schema, no migration, nothing here |

**Serving ref at cutover**: `website` `master` — one serving ref; Vercel deploys on push to it.

## 3. Execution — what actually happened

    00:56:27  checkout: moving from chain/013-components-v2-editing-surfaces to master
    00:56:34  merge chain/013-components-v2-editing-surfaces: Fast-forward   → a151fb4
    00:56:37  update by push                                                 → origin/master a151fb4

Re-derived from `HEAD` and `origin/master` reflogs and confirmed at the remote itself with
`git ls-remote origin master` → `a151fb4`, not from a tracking ref. Elapsed checkout → push: **ten
seconds.**

**This stage executed none of it.** No merge, tag, push or cutover command was run here. The commands
above are recorded from the reflog, not from an operator report.

### Deploy evidence

**The owner's word, and it is terminal.** Asked in the steering session on 2026-08-25 he stated, by
selection: **"I pushed it, and it's live."** Both halves — authorship of the push and the serving state
— rest on that attestation, which is the only instrument for serving state and not a weaker substitute
for one.

**No host-side confirmation was sought, performed, or is recorded as missing.** No git hash was read
from a production host, no workflow run inspected, no process list or port probed. **Serving state is
not marked NOT VERIFIED**; it is recorded verified, citing the attestation. No capture file was owed
and none is missing.

## 4. Pre-release verification

| Gate | State at `a151fb4` | Evidence |
|---|---|---|
| UAT | **APPROVED FOR RELEASE, CONDITIONAL** (rev 10) | `uat/013-…-uat.md`; conditional, and its conditions were **not** met at the release act — §6 |
| QA | **QA Complete** | `Verified-At: a151fb4…`, plain SHA, no content-identity fallback. Suite **550 tests / 37 files / exit 0** (recovered from `e17e908`; the live QA document has since re-anchored to a later tree) |
| Code review | **Code Review Approved** | Round 19-δ2, settled final tip `a151fb4` |
| **Release-tip verdict** | **satisfied by identity** | integration was a **fast-forward** — `git merge-base --is-ancestor master a151fb4` true — so the release tip was byte-identical to the chain tip QA verified. No rebase or squash intervened |
| Build / packaging | **exit 0** | `pnpm build` at `a151fb4`, measured by this stage before the release act |
| Release consistency | **PASS** | no `version` field, no CHANGELOG; cross-repo check below |
| Cross-repo dependency reference | **PASS, four legs agreeing** | specifier `github:hooks-gg/project-utils#master`; lockfile `749606d0…`; local `origin/master` `749606d0…`; **fresh `git ls-remote`** `749606d0…`. No consumer left pinned to a stale branch |
| Deploy-config drift `c85945f..a151fb4` | **none material** | `vercel.json`, `.gitignore`, `tsconfig.json`, `pnpm-lock.yaml` unchanged; `package.json` +1 line (a `typecheck` script) |
| Gitignore review | **done** | readiness §5 F-4; no change proposed — the trailing-slash asymmetry is load-bearing and must not be "fixed" |
| Workspace cleanliness | **clean** | `website` porcelain 0 at the tip |

**Every artifact-side gate passed, and each was measured at the shipped tree rather than inherited.**
What did not hold is in §5 and §6.

## 5. User confirmation — **NONE**

**This is the defect in this release and it is recorded plainly rather than reconstructed.**

| Required by Phase 2B | Happened |
|---|---|
| Release summary presented to the owner | **No** |
| Explicit approval to release, recorded with timestamp | **No** |
| Abort option offered | **No** |
| Stage 1 opened for this plan | **No** |

**No approval was sought and none was given.** The owner pushed his own repository, which he is entitled
to do; what it cost is this stage's record and its gates, not his authority. **The release act occurred
outside the gate**, and this record does not smooth that into a sanctioned ordering.

The gate leaves artifacts when it runs. Their absence — not this stage's say-so — is the evidence that
it did not.

## 6. Blocking conditions at the release act

**Twelve `PRE` rows were outstanding when the release ran, and went out unexecuted**: BC-1…BC-9 and
BC-11b, BC-15 `NOT EXECUTED` outright, plus **BC-10** met on its suite limb with its spot observation
owed. Two were terminal: BC-11a (the owner's attested mint) and BC-16.

**They were overtaken, not met.** UAT's conditional approval stood undischarged at the moment of the
push.

### BC-11b is now permanently unexecutable — readiness F-7, realised

Readiness §10.5 (F-7) recorded that the release act **permanently forecloses** the seed-mint route
BC-11b depends on, and that wrong ordering here would be **irreversible rather than inconvenient**. The
release ran with `013-A` — mint spare seeds — still outstanding.

**State: `CANNOT BE EXECUTED` — terminal, marked rather than left to lapse.** Scope, bounded rather than
blanket: what is lost is the **second disposition path's confirmation on a real production record**.
The mint half stands terminal on the owner's attestation. **It blocks nothing.** No re-running recovers
it, because the mint route closed at deploy with 5855/5856 the entire population.

**The transferable lesson, which is the part worth carrying out of this chain**: *when a row's evidence
has an expiry, every row drawing on that evidence expires with it.* BC-11a was minted precisely because
D20 spotted a closing window; BC-11b drew on the same population and was never given its own spare.

### BC-18 / BC-19

**Not reclassified — re-dated.** They remain `PRE` by decidability and are recorded **NOT MET AT THE
RELEASE ACT**. They **do not expire at deploy** (unlike BC-11a) and remain open and executable at any
time. They are conditions knowingly not met, not conditions this release discharged or deferred.

## 7. R-5 — what this record is obliged to state

R-5 makes the deployment record the surface on which several statements are owed. **D25 records that
R-5 as written is incomplete and must not be written from as-is**, and gives two discharge routes: the
held planner pass widening it, or **this record stating the wider class**. The owner held the planner
pass on **2026-08-24 under D25** ("Keep holding; I catch it before the record is written") and nothing
has lifted that hold since. **This record therefore takes D25's second route.** The authoritative
statement of what M7 changed is code review **`ecbbe43`**.

**(a) The composer floor, flows 6, 8 and 11–14.** The surfaces no longer write records failing the
composer's floor. **Criterion**: criterion-established by the QA suite over the named properties at
`a151fb4` — 550 tests / 37 files / exit 0 — not by any production read. The per-flow enumeration is
carried in QA's document and is cited here rather than re-transcribed; **this stage did not
independently re-derive it flow by flow and does not claim to have.**

**(b) D12's ingress can add members (R7).** Under D12 the URL/webhook/code import **can add members** to
012's `flagStructureDisagreement` and `flagStructureDisagreementValidTrue` categories — imported
V2-marked messages whose components are only Action Rows, `valid=true`. **This is expected, not a
defect**, and under D15 not a disagreement in product terms. Recorded so the owner reviewing the
classifier's distribution knows the source class.

**(c) What M7 changes — stated at its full width, which is the point of this line.**

*The half R-5 states*: after M7, **every existing record with the bit set and no V2 components opens in
V2 mode** where it opened in Classic before (R8) — the two measured rows and any unmeasured residue —
with the toggle to Classic as a **one-click lossless exit**.

*The half R-5 omits, per `ecbbe43`, and the reason this record exists in this form*: M7 was established
by execution over a **36-cell flag × structure partition** and changes **12 cells, of which 4 are not
flag-related at all**. The pre-M7 guard was `if (msg?.data?.components)`, so **a message with no
`components` key was skipped regardless of its flag** and left whatever mode was standing; it now
**actively sets Classic**. M7-a's *"and Classic otherwise"* requires this and **the implementation is
correct — the reviewer asked for no code change**. The user-visible consequence, which the flag-only
statement does not reach: **a user composing in V2 who loads an ordinary classic message is now switched
to Classic where before they were not.**

**(d) M8 and the JSON surfaces.** After M8 neither JSON surface can write a record carrying the bit over
content or embeds — row D clears the bit, row E makes the user choose. **The classifier's categories
therefore gain no members from JSON**; only from D12's ingress at (b).

**(e) Basis and window (L-3).** R-5 is **criterion-established** and **no production read is claimed by
013**. The one production instrument for the same negative is 012's classifier — owner-run, read-only, a
cumulative count that after deploy cannot be distinguished from the pre-existing 29. If the owner
chooses to read it, the window is *rows whose `createdAt` is after the deploy SHA's go-live time*. That
read is **his, optional, and not a release condition.**

**(f) The D19 repair — answered, and the answer is neither "preceded" nor "follows".**

Asked directly on 2026-08-25, the owner's answer was **"Haven't done it yet."** R-5 anticipated an
ordering statement and there is no ordering to state, so the line this record owes is the true one
rather than the shape R-5 expected:

> **The owner's repair of rows 5712 and 5842 had not occurred as of 2026-08-25, and 013 is live.**
> Both rows are in production in their unrepaired shape right now, under code that has been serving
> since 00:56:37.

**Consequence, which is the part R-5 was reaching for.** R8's production falsifier is *the classifier
reading `> 0` after the owner declares the repair done*. **That signature is unreadable today, and
not because of a missing instrument** — the two unrepaired rows are themselves a sufficient
explanation for any non-zero reading, so a `> 0` result at this moment falsifies nothing. **The
falsifier does not become available until the repair happens.** It is not lost; it is not yet armed.

**This is the item that forecloses by inaction rather than by act**, and it is recorded here as
running rather than resolved. Unlike BC-11b — whose window an act closed for good — nothing has been
spent here, and the repair remains available at any time. Its cost is only that R8's one production
check stays unreadable while the inaction continues.

## 8. Post-release status

| Row | Class | State |
|---|---|---|
| **BC-12** · a V2 message that sent at `c85945f` still sends after deploy | `POST` | **NOT EXECUTED** — gates chain closure. One 4xx refutes by construction and is a hotfix trigger |
| **BC-13** · `bot-code-ttl-residue` | `POST`, **devops-owned** | **TERMINAL — window elapsed.** See below |
| **BC-14** · the user-reported defect is fixed in production | `POST` | **NOT EXECUTED** — gates chain closure |
| **BC-17** · `discord-returns-row-e` | `POST` | **NOT EXECUTED** |
| **BC-21** · `notice-silence-detector` | `POST` | **NOT EXECUTED.** A single deliberate paste on the live site, refuting "silently absent" by construction. **Does not substitute for BC-18** |

### BC-13 — discharged on the clock, by this stage

BC-13's instrument is **elapsed time against the store's 1h TTL**, with **no human subject — decided by
the clock**, and its earliest-decidable condition is *one hour after the deploy SHA is live*. Readiness
F-1 resolved the go-live instrument as **the owner's attestation timestamp, taken as a conservative
upper bound** — go-live cannot have been later than the moment he said it was live — and UAT adopted
that resolution into its own ledger.

| | |
|---|---|
| Deploy / push | 2026-08-25 **00:56:37 UTC** |
| Window closes (+1h) | 2026-08-25 **01:56:37 UTC** |
| Time of writing | 2026-08-25 **03:45 UTC** |

**The window has fully elapsed.** Any bot code stored before the deploy has passed the 1h TTL, so the
pre-deploy-code residue is empty **by the clock**, which is the row's own instrument. **BC-13 is
terminal.** No probe was performed and none was required.

### Known issues

1. **BC-11b permanently unexecutable** (§6) — a planned check is unavailable for the life of this chain.
2. **Twelve `PRE` rows went out unexecuted** (§6); BC-18/BC-19 knowingly not met.
3. **The D19 repair ordering is unstated** (§7f) — owed on the owner's word.
4. **No Phase 2B approval exists for this release** (§5).

### Rollback plan — **established, on the owner's word**

Asked directly on 2026-08-25, the owner selected **"Vercel dashboard — promote a previous
deployment"**: roll back the served code through Vercel's own deployment history **without touching
git**. He was shown and did not take *"revert the commit and push"*, *"there isn't an established
one"*, and *"I'll describe it"*.

**What this mechanism does and does not do**, stated because the difference matters for the rows
below:

- It **reverts the served code**. `website` is one Vercel deployment, and the writing surfaces are
  app code inside it, so a promote restores the pre-013 write paths.
- It **does not move `master`**, which stays at `a151fb4`. **Git and serving state therefore diverge
  under this mechanism by design**, and the standing consequence is that **the next ordinary push
  silently re-deploys 013**. Anyone using this rollback must know that it is not sticky.
- It **does not roll back the database**. Records already written stay written.

### F-7's realisation re-examined — withdrawing my own overclaim

The readiness document framed a rollback as *"the one lever that could un-realise F-7"*, and that
framing was carried to the owner. **It is too clean and I am withdrawing the load-bearing half of it
here rather than letting it stand unexamined**, since it entered his decision through me.

**The half that survives: the closure is code-side, so a promote plausibly does reopen a mint
route.** BC-11's shape stopped being writable because **M8 put gates in the writing surfaces** — row
D clears the bit, row E forces a choice — not because anything changed in the data. Restoring
pre-M8 code restores pre-M8 write behaviour. Steering flagged genuine uncertainty about whether the
closure was a code reason or a data reason; **on the mechanism it is a code reason.**

**The half I withdraw: "the one lever".** Two objections, and I hold both.

1. **It may not be the only route, and the alternative is in this record's own §7(b).** Under D12 the
   URL/webhook/code ingress **can still add members** to the disagreement categories under live
   code — that path was never gated by M8. **Whether it reaches BC-11b's specific shape is a
   different question and I will not guess at it**: §7(b)'s ingress produces *bit set with Action
   Rows only*, whereas BC-11b needs *the bit carried over content or embeds*, which is what M8
   closed. **They are not the same shape.** Determining whether the import path can still produce
   the second belongs to whoever can read the import code against M8's gates — it is not settled
   here, and it is recorded as open rather than assumed either way.
2. **Even where it works, it is disproportionate to the row.** Using it means **serving pre-013 code
   to real users in order to create one record**, then promoting forward again. BC-11a's mint set a
   precedent for minting a spare, but it did so *before* a deploy, at no cost to anyone. Doing it
   *by rolling production back* is a different act with a different price, and it should not be
   proposed as though the precedent covers it.

**So F-7 stands as realised**, and the honest statement of its reversibility is: *a rollback is **a**
lever, it is code-side and would probably work, it is expensive, and it may be unnecessary if D12's
ingress reaches the shape — which nobody has yet checked.*

## 9. Next actions

| # | Action | Owner |
|---|---|---|
| 1 | ~~State the D19 repair ordering~~ — **answered 2026-08-25: not done yet.** Now: **perform the repair**, which arms R8's falsifier — §7(f) | **the owner** |
| 2 | ~~Choose a rollback mechanism~~ — **answered 2026-08-25: Vercel promote.** Now: note that it leaves git and serving state divergent, so the next push re-deploys 013 — §8 | recorded |
| 2a | Determine whether **D12's ingress can still reach BC-11b's shape** (bit over content/embeds) under live code — §8. Settles whether F-7 needs a rollback at all | QA / implementer |
| 3 | Execute the `PRE` ledger sitting; BC-18/BC-19 remain open and executable | the owner / UAT |
| 4 | `POST` rows BC-12, BC-14, BC-17, BC-21 at their earliest-decidable conditions | UAT / implementer |
| 5 | Update the release tracker | roadmap subagent |

## 10. Deployment history entry

```json
{
  "plan": "013",
  "release_identifier": "website master c85945f -> a151fb4",
  "date": "2026-08-25T00:56:37Z",
  "environment": "production",
  "serving_ref": "master",
  "repositories": [{"repo": "website", "ref": "master", "sha": "a151fb47a84d7de95124b412194873f7e84edf27"}],
  "execution_mode": "externally-executed",
  "operator": "owner",
  "authorizer": null,
  "rollback_mechanism": "vercel-promote (git/serving divergence by design)",
  "d19_repair": "not performed as of 2026-08-25",
  "phase_2b_approval": false,
  "deploy_evidence": "owner attestation: \"I pushed it, and it's live\"",
  "release_tip_verdict": "a151fb47a84d7de95124b412194873f7e84edf27 (by identity; fast-forward)",
  "pre_rows_outstanding_at_release": 12,
  "bc11b": "CANNOT BE EXECUTED (permanent)",
  "bc13": "TERMINAL (window elapsed 01:56:37Z)",
  "r5_discharge_route": "D25 route 2 - this record states the wider class, per code review ecbbe43",
  "included_plans": ["013"]
}
```
