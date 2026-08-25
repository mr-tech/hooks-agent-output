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
  rows went out unexecuted. **BC-13 terminalises on the clock.** The line owed on the owner's word
  about the D19 repair is **answered under D43** (plan rev 37, corrected at rev 38): the repair ran on
  2026-08-25, after this act.
  **§11 appended 2026-08-25 — a SECOND release act on this plan, and nothing in §§1-10 is rewritten.**
  `website` `master` **`a151fb4` -> `4a7126b`**, pushed **04:14:02 UTC** by `devops-hooks-013-2`,
  **Mode A, agent-executed**. **This is the first release act in this chain to run inside the Stage 2
  gate**: the summary was presented (readiness §12.4, `99f7b8c`) and the owner approved it against that
  summary with the cost restated in front of him and a real "don't do it" option declined. Fast-forward
  by identity, re-verified at the moment of push; **deployed commit and verdict SHA are the same
  object**, so the deployed-vs-verified reconciliation is exact. Cross-repo references agree four ways
  at `749606d0`; no deploy-config drift; suite 577/577 and build exit 0 reproduced independently at the
  shipped SHA. **Nothing is withdrawn**: fourteen `PRE` rows stay non-terminal and **BC-18/BC-19a/BC-19b
  shipped past unexecuted**, covering half the production surface; the owner ruled on **sequencing**,
  not withdrawal. **BC-13 does not reopen** (the delta touches no
  bot code, tested). **BC-21 is checkable for the first time**, since `abcf585` was not in `a151fb4`.
  Serving state rests on the owner's attested mechanism; **no host-side probe was performed or owed**.
  **Struck 2026-08-25 under D44** (plan rev 39, commit `13a6e66`) by `steering-hooks-013-2 [019315]`
  acting on the owner's direct ruling rather than by the devops session that owns this record: the
  material D44 strikes is removed throughout and every item that depended on it is **dropped**, not
  re-argued and not re-based. **No verdict, gate, approval or release state is changed by that edit**;
  one statement of fact is corrected under **D43** (plan rev 37/38).
  **§12 appended 2026-08-25 by `devops-hooks-013-3` — FOUR FURTHER DEPLOY ACTS recorded, and nothing
  in §§1-11 is rewritten.** Records for **`8584b1e`** (05:08:03), **`d7c4836`** (06:19:34),
  **`e343927`** (06:32:06) and **`2d90e8a`** (07:04:49), none of which appeared in any deployment-stage
  document before. **All four are deploys, not releases**, all **externally executed by the owner**,
  all under his **D35 waiver** — no QA, no code review, no UAT ran on any of them, and **no
  release-tip verdict exists at any of the four trees** (QA's latest `Verified-At` is `4a7126b`).
  **Deployed never equals verified**, so each record carries a diff of the plan's surface rather than
  an ancestry argument. **F-1**: the serving tree carries **4 of the 8** test blocks of QA's formally
  adopted render instrument (`013-qa-toast-vessel-render.test.ts`, adopted at `664e0c0` as F-QA23) —
  routed to QA and UAT, not decided here. **U-C6 DISCHARGED** (§12.5): the implementation document's
  terminal `Status` is set; the `closed/` move is deliberately NOT made while the chain is open.
  **BC-13 stays TERMINAL** — the delta touches no bot code, tested. **U-C5 SETTLED** by owner ruling
  *"record is enough"* (§12.7), which confirms D25's second route already taken at `e34df07`; the
  plan's R-5 sentence stays knowingly incomplete **by decision**, and no stage may "fix" it. §12.7 is
  also the **record area** for the unregistered *"leave it - records stay owed"* ruling and its
  reversal. Serving state is **verified on the owner's attestation** throughout; **nothing is marked
  NOT VERIFIED and no host-side probe was performed or owed**. **This section is Stage 1 only: no
  push, no merge, no tag, no tree switch. The live tree remains UNGATED and the standing release
  decision remains `EXPIRED IN FULL`.**
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
owed. Two were terminal: BC-11a and BC-16.

**They were overtaken, not met.** UAT's conditional approval stood undischarged at the moment of the
push.

### BC-11b — DROPPED under D44

**BC-11b is DROPPED under D44** (plan rev 39, commit `13a6e66`). Its subject is struck from chain 013,
so the row is not a live obligation here, and it is neither re-argued nor re-based onto anything else.
The material that stood under this heading is removed with it. **It blocked nothing before the strike
and blocks nothing after it: no verdict, gate, approval or release state moves.**

### BC-18 / BC-19

**Not reclassified — re-dated.** They remain `PRE` by decidability and are recorded **NOT MET AT THE
RELEASE ACT**. They **do not expire at deploy** and remain open and executable at any
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

**(f) The D19 repair — the ordering is now answerable, and the answer is "follows".**

**Superseded, and corrected here rather than left standing false.** This paragraph previously recorded
the owner's answer of 2026-08-25, *"Haven't done it yet."* **That statement of fact is no longer
true**, and it is corrected under **D43** (plan rev 37, commit `0df61af`, corrected at rev 38, commit
`fd4d490`). The line this record owes is therefore:

> **The owner ran the D19 repair of rows 5712 and 5842 on 2026-08-25, after this release act.** Both
> rows now read `data->>'flags'` = **0** and `valid` = **true**, on his own reading; no agent on this
> machine has read that database. The repair therefore **follows** the deploy, and R-5's ordering
> statement is satisfied in that direction.

**Consequence, restated from D43 and not re-derived here.** R8's production falsifier is *the
classifier reading `> 0` after the owner declares the repair done*. **D43 establishes that it is not
armed — it is unreadable, and nothing that exists today can read it**: every row now carries a
non-null `valid`, and the only
existing instrument (`pnpm backfill-valid`) classifies only rows where `valid is null`, so its
diagnostic counts are scoped to the rows a run classified rather than to the table. A zero reading
from it is an empty measurement, not a pass, and the two are indistinguishable in the report's own
JSON. **Reading it would take an instrument that does not exist and is not authorised.**

**That disposition is `uat`'s and QA's, and it is routed there, not decided here.** This record issues,
moves and expires nothing: no release decision is taken or altered by this correction.

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

1. **BC-11b — DROPPED under D44** (§6). Not an issue and not an obligation; recorded so the numbering
   below is stable.
2. **Twelve `PRE` rows went out unexecuted** (§6); BC-18/BC-19 knowingly not met.
3. **The D19 repair followed this act** (§7f, under D43) — the ordering is stated and no longer owed.
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

### DROPPED under D44

A subsection stood here re-examining a finding that D44 strikes with its subject (plan rev 39, commit
`13a6e66`). It is **dropped, not re-argued and not re-based**, and nothing in it is restated. The
rollback mechanism recorded immediately above is unaffected and stands as the owner gave it.

## 9. Next actions

| # | Action | Owner |
|---|---|---|
| 1 | ~~State the D19 repair ordering~~ — **DISCHARGED.** The repair ran on 2026-08-25, after this act, and the ordering is stated at §7(f) under **D43** | recorded |
| 2 | ~~Choose a rollback mechanism~~ — **answered 2026-08-25: Vercel promote.** Now: note that it leaves git and serving state divergent, so the next push re-deploys 013 — §8 | recorded |
| 2a | **DROPPED under D44** (plan rev 39, commit `13a6e66`). Not a live question; row kept so the numbering does not shift | — |
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
  "d19_repair": "performed by the owner on 2026-08-25, after this act (D43; flags 0, valid true on both rows)",
  "phase_2b_approval": false,
  "deploy_evidence": "owner attestation: \"I pushed it, and it's live\"",
  "release_tip_verdict": "a151fb47a84d7de95124b412194873f7e84edf27 (by identity; fast-forward)",
  "pre_rows_outstanding_at_release": 12,
  "bc11b": "DROPPED under D44 (plan rev 39, 13a6e66); blocks nothing, no release state changed",
  "bc13": "TERMINAL (window elapsed 01:56:37Z)",
  "r5_discharge_route": "D25 route 2 - this record states the wider class, per code review ecbbe43",
  "included_plans": ["013"]
}
```

---

# 11. Second release act — `a151fb4` → `4a7126b`, 2026-08-25 04:14:02 UTC

**Written by `devops-hooks-013-2`.** §§1–10 are preserved exactly and **nothing above this line is
rewritten.** They remain true of the release they describe; this section records a **second** release
act on the same plan, and the two are not merged into one narrative. **This is the first release act
in this chain to run inside the Stage 2 gate.**

## 11.0 Authority for restated status

**The UAT document is the authority for every blocking-condition state in this section, and the QA
document for every row definition.** Both were re-read at the time of writing — UAT at **rev 17**
(`e4c37af`), QA at **`a195dc2`** — not carried from an earlier read in this session. Where this section
states a condition's state it is **restating, not deciding.** Nothing here re-litigates either.

**A correction to §§1–10's context, dated rather than silent**: §§1–10 were written when UAT stood at
rev 16 and QA's `Verified-At-Note` still carried the F-9 range defect. **Both moved before this act.**
UAT is now rev 17 — BC-19 split into **BC-19a**/**BC-19b**, failure mode (b) *"the page throws"*
**retired on evidence**. QA's note was corrected at `1a21add`. **Nothing §§1–10 said was false when
written**; the register underneath it has since gained detail, and that is what this note records.

## 11.1 Release identifier and what shipped

| Field | Value |
|---|---|
| **Release identifier** | `website` serving ref `master`, **`a151fb4` → `4a7126b`** |
| **Included plans** | **Plan 013 only** — Components V2 across the editing surfaces |
| **Release date** | 2026-08-25, push at **04:14:02 UTC** |
| **Execution mode** | **Mode A — agent-executed** by `devops-hooks-013-2` |
| **Environment** | production, Vercel |
| **Serving ref at cutover** | `website` `master` — the only serving ref |
| **Tag** | **none.** This repo carries zero tags; the release identifier is the ref move |
| **Publish** | **none.** No registry is involved — a publish step would have been invented, and was not |

### Repositories and SHAs shipped

| Repository | Ref moved | SHA | Note |
|---|---|---|---|
| `website` | `master` | **`4a7126bf8578b653ac7ae1cfe7cabdd609cdc21f`** | the whole of this release |
| `project-utils` | **none** | — | untouched. Consumer pin unchanged and re-verified at this tip (§11.4); 013 writes no schema and no migration |

**What shipped, as a range and never as a bare count.** `a151fb4..4a7126b` — **3 commits, 7 files**:

| Commit | Content |
|---|---|
| `abcf585` `fix(013)` toast vessel — the owner's 2026-08-25 ruling | **4 production files** — `NewMessageJsonInput.tsx` (+7/−9), `CodeMessageNotice.tsx` (+18, **new file**), `m/[id]/layout.tsx` (+2), `MessageProvider/index.tsx` (+8/−3) — and 1 test file |
| `664e0c0` `test(013)` | 1 test file (F-QA23 instrument) |
| `4a7126b` `test(013)` | 1 test file (F-QA28 instrument) |

**The production change is introduced at `abcf585` and is unchanged after it** — established by blob
identity per path at both tips, not by reading the log: `f63b95df`, `75dafce9`, `d50a1992`, `955fc0ea`
are the same objects at `abcf585` and at `4a7126b`. **`abcf585..4a7126b` is test-only;
`a151fb4..4a7126b` is not.** That is F-9's distinction and it is stated here in the form that survives
restatement.

**In substance**: permanent-state notices convert from transient `toast.warn` calls to persistent
inline DOM, across the paste surface and the message layout.

## 11.2 Execution — the commands this stage ran

    04:13:50  checkout: moving from chain/013-toast-vessel to master        (HEAD reflog)
    04:13:56  merge chain/013-toast-vessel: Fast-forward            → 4a7126b
    04:14:02  update by push                                        → origin/master 4a7126b

Verbatim, in order:

    git -C /usr/local/bin/hooks/website switch master
    git -C /usr/local/bin/hooks/website merge --ff-only chain/013-toast-vessel
    git -C /usr/local/bin/hooks/website push origin master

**Unlike the first release act, this stage executed all of it.** `merge --ff-only` was used rather than
a plain merge so that anything other than a fast-forward would **fail** rather than silently create a
merge commit. It reported `Updating a151fb4..4a7126b`, `Fast-forward`, 7 files, 317 insertions,
12 deletions, exit 0.

**Nothing rewrote history and nothing moved a tree under another session.** No rebase, amend, reset or
force. The chain branch `chain/013-toast-vessel` is **retained unchanged** at `4a7126b`.

### Pre-push re-verification, taken at the moment of push and not inherited

The Phase 2A measurements were ~5 minutes old at push time and were re-run rather than trusted:

| Check | Result at 04:13:38 UTC |
|---|---|
| `git rev-parse chain/013-toast-vessel` | **`4a7126b`** — the SHA the approval was given against, unmoved |
| `git ls-remote origin master` *(the remote itself)* | **`a151fb4`** — nothing had landed ahead of us |
| `merge-base --is-ancestor a151fb4 chain/013-toast-vessel` | **true** — pure fast-forward |
| `rev-list --count chain/013-toast-vessel..a151fb4` | **0** — nothing on `master` was unmerged |
| `git status --porcelain` | **0 lines** — the switch would not run over uncommitted work |

**The tree switch is this step's own act.** Porcelain was captured before and after the switch and
`diff`ed: **byte-identical**, as a switch between refs must be.

### Post-push verification — artifact-side, everything reachable

| Check | Instrument | Result |
|---|---|---|
| The ref moved, **at the remote** | `git ls-remote origin master` | **`4a7126b`** — not read from a tracking ref |
| The push is dated | `git reflog show origin/master` | `4a7126b … update by push` at **04:14:02 UTC** |
| `master` is exactly the verified object | string compare against the 40-char verdict SHA | **exact match** |
| Serving refs still unsplit | `ls-remote --heads` + pairwise `merge-base --is-ancestor` | `backup`, `external-message-api`, `redesign`, `regex-refactor` all remain **ancestors** of `master`; none a descendant. **No pair split** |
| Working tree | `git status --porcelain` | **0** |
| Consumers resolving | §11.4 | pin unchanged and agreeing four ways |

**No artifact-side check was left unperformed, so nothing in this section is marked `NOT VERIFIED`.**

### Deploy evidence

**The mechanism is established and the serving state rests on the owner's word, which is terminal.**
Push to `master` deploys via Vercel — established from **his attestation** of the `a151fb4` release
(*"I pushed it, and it's live"*), not from repo configuration, because **no repo artifact establishes
the trigger**: `.github/` holds only `prompts/` and no `workflows/`, `vercel.json` is cron-only, and
`package.json` has no deploy script. That is readiness **F-5**, re-established at this tip and still
standing as a repo finding.

**No host-side confirmation was sought, performed, or is recorded as missing.** No git hash was read
from a production host, no workflow run inspected, no process list or port probed on this machine or
any other. **Serving state is not marked `NOT VERIFIED`** — the push to the prod ref plus the
established mechanism is the evidence, and the owner's attestation is what completes it. **No capture
file was owed and none is missing**, and no closing step is handed to him: the live-site observation
already has a home as **BC-21**, a `POST` row he owns.

## 11.3 User confirmation — **GIVEN**, and this is the first act in the chain to have one

| Field | Value |
|---|---|
| **Summary presented** | `deployment/013-components-v2-editing-surfaces-readiness.md` **§12.4**, committed `99f7b8c` before the question was put |
| **Question put** | §12.6, relayed verbatim by the steering thread |
| **Response** | **Option 1 — "Yes — I push it."** |
| **Authorizer** | the owner |
| **Timestamp of act** | push at 2026-08-25 **04:14:02 UTC** |
| **Declined alternatives, all shown** | *"Yes — you push it"*; *"Run BC-18/BC-19a/BC-19b first, then push"*; *"No — don't push it"* |

**He was shown the cost, verbatim, before answering** — the two production files with no executing
test, 5712/5842 then still unrepaired in production, and that the Vercel promote does not
move `master` so his next push re-deploys this. **The "don't do it" option was real and was declined.**
**One further cost item shown at the time is struck under D44** (plan rev 39, commit `13a6e66`) and is
not restated; the elision is marked so the record of what he was shown stays verifiable.

**The scope of the approval, recorded because it is narrow.** It covers **this push and nothing else**.
It is not standing, does not extend to a later tip, and was given against **`4a7126b`** specifically —
which is why the SHA was re-verified at the moment of push. **It withdraws nothing** (§11.5).

## 11.4 Pre-release verification

| Gate | Evidence | Result |
|---|---|---|
| **UAT** | rev 17, `e4c37af`, **UAT Complete** — *"APPROVED FOR RELEASE, conditional on the human click-through of BC-18, BC-19a and BC-19b"*, anchored at `4a7126b` | **conditional approval on record; the condition is NOT met** (§11.5) |
| **QA** | `QA Complete`, `Verified-At: 4a7126b` (plain 40-char SHA) | **met** |
| **Release-tip verdict** | **RELEASE VERIFIED at `4a7126b`** — `qa/release-4a7126b-tip-verification.md`, `78e0a13`. QA ruled the plan-level verdict at the same SHA is **not** the release-tip verdict: *a matching SHA makes the subject identical, not the act* | **met** |
| **Verdict freshness** | the assembled tip **is** `4a7126b` by identity (fast-forward, `merge-base` = `a151fb4`, 0 commits the other way), so the verified tree and the shipped tree are the **same object** | **met** |
| **Independent reproduction** | re-run in this session at `4a7126b`: `npx vitest run` → **577 passed / 40 files, exit 0**, 0 `FAIL` lines; `pnpm build` → **exit 0**, `grep -ci error` → 0, full route table emitted | **met** |
| **Release consistency (cross-repo)** | `package.json` carries **no `version` field** and there is no CHANGELOG, so per Core Responsibility 3 this is the cross-repo reference check and **no version was synthesised** | **met — four legs agreeing**: specifier `github:hooks-gg/project-utils#master`; lockfile `749606d0…`; `project-utils` local HEAD `749606d0…`; **fresh SSH `ls-remote` of the real remote** `749606d0…`. No consumer left pinned to a stale branch |
| **Packaging integrity** | build green at the shipped SHA with a clean tree; no assets, no package script, no filename to check — nothing to package | **met** |
| **Gitignore review** | `website` porcelain **0**. In `agent-output`, **15 probe `node_modules` symlinks show as `??`, which is the healthy state** — `.gitignore:12` is `node_modules/` with a trailing slash, matching directories only, so a rig that has degenerated into a real directory *disappears* from `git status`. **The entries are recorded, not tidied**; "fixing" the pattern would destroy the only passive detector | **met, recorded** |
| **Workspace cleanliness** | `website` porcelain **0** before the switch, after the switch, and after the push | **met** |
| **Deploy-config drift** | `git diff --numstat a151fb4 4a7126b` over `vercel.json`, `.gitignore`, `tsconfig.json`, `pnpm-lock.yaml`, `package.json`, `next.config.*` → **empty** | **no drift at all** |
| **Verified SHA reachable** | `git branch --contains 4a7126b` → `master`, `chain/013-toast-vessel`. No history was rewritten | **auditable** |

### Reconcile — deployed against verified, per repository

| Repository | Deployed ref | Commit at it | Verdict SHA | Reconciliation |
|---|---|---|---|---|
| `website` | `master` | **`4a7126b`** — the pushed commit, read from local git, standing as the serving commit on the established mechanism and the owner's attestation | **`4a7126b`** | **IDENTICAL — the same object, not merely an ancestor.** No surface diff is required, because there is no difference to diff |
| `project-utils` | none moved | `749606d0…` | — | pin unchanged; not a serving ref for this release |

**This is the reconciliation's clean case** and it is worth naming: the failure this check exists to
catch — a green suite testing code nobody runs — **cannot arise here**, because the verified commit and
the serving commit are one object.

## 11.5 Blocking conditions at this release act — nothing is withdrawn

**The register `NO-GO` is not withdrawn by this release, and this record does not read it as though it
were.** The owner ruled on **sequencing** — he was asked whether to run BC-18/BC-19 before the cut and
chose **"Neither — proceed to the cut"**, then chose to push with the cost restated in front of him.
**`WITHDRAWN` is his ruling alone and he made no such ruling.**

**Fourteen `PRE` rows remain non-terminal**: BC-1…BC-9, BC-10's spot-observation limb, BC-15, and
**BC-18, BC-19a, BC-19b**. They **do not expire**, and **nothing about this push discharges any of
them.** They stay open, they stay his, and they are still executable locally today.

### BC-18 / BC-19a / BC-19b — the load-bearing residue, now shipped past

They went out **unexecuted, knowingly**. What they cover, restated from QA (row authority):

| Production file | Coverage at the shipped tip |
|---|---|
| `CodeMessageNotice.tsx` | **covered — executed** |
| `NewMessageJsonInput.tsx` | **covered — executed** |
| `m/[id]/layout.tsx` | **text-pinned only.** One `toContain('<CodeMessageNotice />')`. **The mount is never executed** |
| `MessageProvider/index.tsx` | **text-pinned only.** **The producer effect is never executed**, including the clear-to-`null` path **new in 013**. The one render test naming the provider `vi.mock`s it out, correctly, to isolate the vessel — so the real effect runs in **none of the 40 test files** |

**So half this release's production surface has now been deployed with no executing test behind it, and
these three rows remain its only instrument.** **BC-19a** is a real code import that drops components,
where **one successful import refutes "it never appears" by construction**; **BC-19b** is the eye
check and is decidable only **after** 19a produces something to look at; **BC-18** is the paste
surface's residue — visibility, placement, real mount.

**A note carried from the relay, recorded as a fact about executability, not as an excuse**: BC-19a/19b
need a share code nobody has yet produced. That is an input the row is owed, not a reason the row is
met.

### The failure mode that was declined — do not re-add it

*"The page throws on a null context"* is **true of the test and false in production.**
`Navigation.tsx` sits in the identical position inside `<MessageProvider>`, consumes `useMessage()`, is
blob `339ed840` at `a151fb4`, `abcf585` **and** `4a7126b`, and has been live throughout — and this
release does not touch it. **The boundary is proven in production.** QA declined the mode; UAT retired
it at rev 17 having re-derived it git-side. **An unreachable failure is not a reason.**

**Recorded but not a release finding**: `useMessage`'s null guard names the **wrong component**
(*"UnsavedWarning components must be wrapped in `<UnsavedWarning />`"*). Pre-existing, outside the
`a151fb4..4a7126b` delta, so it does not gate this release. Diagnosability, routed to the implementer.

### BC-11b — DROPPED under D44

**BC-11b is DROPPED under D44** (plan rev 39, commit `13a6e66`). Its subject is struck from chain 013,
so the row is not a live obligation, is not re-argued and is not re-based onto anything else; the
material that stood here is removed with it. **It blocked nothing at this act and blocks nothing now:
no verdict, gate, approval or release state moves.**

## 11.6 Post-release status

**Status**: **Released — chain closure pending.** Timestamp 2026-08-25 04:14:02 UTC.

| Row | Class | State after this act |
|---|---|---|
| **BC-12** · a V2 message that sent at `c85945f` still sends after deploy | `POST` | **NOT EXECUTED** — **decidable now.** One 4xx refutes by construction and is a hotfix trigger |
| **BC-13** · `bot-code-ttl-residue` | `POST`, devops-owned | **TERMINAL — unchanged; this act does not reopen it.** See below |
| **BC-14** · the user-reported defect is fixed in production | `POST` | **NOT EXECUTED** — decidable now. *The chain's own reason for existing* |
| **BC-17** · `discord-returns-row-e` | `POST` | **NOT EXECUTED** — decidable now |
| **BC-20** · `dropped-notice-guards-send` | `POST` | **NOT EXECUTED.** A silent mode — **absence of reports is not evidence for it** |
| **BC-21** · `notice-silence-detector` | `POST` | **NOT EXECUTED — and now checkable for the first time.** The code it observes shipped in `abcf585`, which was **not** in `a151fb4`. A single deliberate paste on the live site refutes "silently absent" by construction. **Does not substitute for BC-18** |

### BC-13 does not reopen — derived, not assumed

BC-13's instrument is elapsed time against the store's **1h TTL**, and its subject is **bot code stored
under pre-deploy behaviour**. It was terminalised against the `a151fb4` window (00:56:37 → 01:56:37).
**A second deploy would reopen it only if this delta changed bot behaviour.** Tested rather than
assumed: `git diff --name-only a151fb4 4a7126b -- bot/` returns **empty**, while `bot/` **is** present
in the tree at `4a7126b` — so the path is real and the emptiness is a genuine negative, not a typo
returning nothing. All four production files are message-surface UI under `src/app/` and
`src/providers/`. **BC-13 stays terminal.**

### Known issues

1. **BC-11b — DROPPED under D44** (§11.5). Not an issue and not an obligation; listed so the numbering
   below is stable.
2. **BC-18, BC-19a and BC-19b shipped past unexecuted**, covering half the production surface. Still
   open, still meetable, still his. **BC-19a/19b additionally need a share code nobody has produced.**
3. **Fourteen `PRE` rows non-terminal** at this act; the register `NO-GO` is not withdrawn.
4. **5712/5842 are still in the bad shape under live code** — the D19 repair is **not done**, on the
   owner's own answer (*"Haven't done it yet."*). This release neither performs it nor depends on it.
5. **`a151fb4`'s release ran outside this gate** (§§1–10) — recorded, not erased.
6. **F-5 stands**: no repo artifact establishes the deploy trigger; only the owner's attestation does.

### Rollback plan

**Unchanged from §8 and re-stated because its trap now applies to this commit**: **Vercel dashboard —
promote a previous deployment**, the owner's own selection. It reverts the served code. **It does not
move `master`, which now stays at `4a7126b`** — so git and serving state diverge by design, and **the
next ordinary push silently re-deploys 013.** It does not roll back the database. **It is not sticky**,
and anyone using it must know that.

## 11.7 Deployment history entry

    {
      "plan": "013",
      "plan_name": "components-v2-editing-surfaces",
      "release_identifier": "website master a151fb4 -> 4a7126b",
      "release_date": "2026-08-25T04:14:02Z",
      "execution_mode": "agent-executed",
      "executor": "devops-hooks-013-2",
      "authorizer": "owner",
      "approval": "Phase 2B given against readiness §12.4/§12.6, option 1",
      "environment": "production",
      "serving_ref": "master",
      "repositories": [
        { "repo": "website", "ref": "master", "sha": "4a7126bf8578b653ac7ae1cfe7cabdd609cdc21f", "previous": "a151fb47a84d7de95124b412194873f7e84edf27" },
        { "repo": "project-utils", "ref": null, "sha": "749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f", "note": "untouched; consumer pin unchanged" }
      ],
      "tag": null,
      "publish": null,
      "release_tip_verdict": { "sha": "4a7126bf8578b653ac7ae1cfe7cabdd609cdc21f", "doc": "qa/release-4a7126b-tip-verification.md", "commit": "78e0a13" },
      "deployed_equals_verified": true,
      "serving_state": "verified on the owner's attested mechanism; no host-side probe performed or owed",
      "blocking_register": "NOT withdrawn - 14 PRE rows non-terminal; BC-18/BC-19a/BC-19b shipped past unexecuted",
      "bc11b": "DROPPED under D44 (plan rev 39, 13a6e66); blocks nothing, no release state changed",
      "rollback": "Vercel promote; does not move master; not sticky"
    }

## 11.8 Next actions

| # | Action | Owner |
|---|---|---|
| 1 | **BC-21** — one deliberate paste on the live site. **Checkable for the first time**, since `abcf585` was not in `a151fb4` | **the owner** |
| 2 | **BC-18, BC-19a, BC-19b** — still open, still meetable, and now the only evidence half the shipped surface will ever have. **BC-19a/19b need a share code that does not yet exist** | **the owner** |
| 3 | **BC-12, BC-14, BC-17, BC-20** — all decidable now the tip is serving | uat / implementer |
| 4 | ~~The D19 repair~~ — **DONE 2026-08-25** (D43): both rows read flags 0 and valid true. R8's production falsifier is **not armed — it is unreadable** by the only existing instrument; that disposition is **`uat`'s and QA's**, routed there and not decided here | uat / qa |
| 5 | **BC-2/BC-3** — withdrawal recommended by UAT, **not withdrawn**; three options sit in `OWNER-QUEUE.md`, unanswered | **the owner** |
| 6 | **U-C5 / R-5's widening** — the owner chose a planner pass over D25's alternative | **the owner** |
| 7 | **U-C6** — terminal `Status` on the implementation document (still `Active`). Devops's, at chain closure, **not now**: closing and moving live documents before the chain closes would strand them | devops |
| 8 | **Roadmap tracker** — release complete; update | roadmap subagent |
| 9 | **Retrospective** — runs after the release, by the owner's ordering. Its trigger (QA Complete + UAT Complete) was already satisfied | retrospective subagent |

**`agent-output` is not pushed** — measured `git rev-list --count origin/master..master` = **321** at
the time of writing, becoming 322 once this record is committed. **The approval covered the `website`
push and nothing else.**

> **Disclosed in the round it happened**: this line first read *"322"*, which I reached by arithmetic
> from an earlier reading rather than by running the counter. It is the chain's own **range-restatement**
> class (§10.11 of the readiness document) in its cheapest form — a real number, restated against a
> state it was not measured in. Caught by running `rev-list --count` before the commit rather than
> after reasoning about it. **Recorded rather than silently fixed**, because a number corrected without
> a note is indistinguishable from a number that was always right.


---

# §12 — Four further deploy acts, recorded 2026-08-25 by `devops-hooks-013-3`

**Written by `devops-hooks-013-3`. §§1–11 are preserved exactly and nothing above this line is
rewritten.** This section adds **four deployment records**, one per deploy act, for
`8584b1e`, `d7c4836`, `e343927` and `2d90e8a`. None of the four appeared anywhere in this document or
in the readiness document before this section; each is written from the repository, not from a relay.

**Authority for restated status, re-read at this write.** The UAT document
(`uat/013-…-uat.md`, read at rev 25 at the time of writing) is the authority for every
blocking-condition state restated here; the QA document is the authority for every row definition.
Nothing here re-litigates either, and no register state is set by this document.

## §12.0 — What is true of all four, stated once

**These are deploys, not releases, and this record does not make them releases.** Each moved the
serving ref; none closed a plan chain with its gates recorded. They are recorded here rather than
omitted because they carry plan-013 code, which is this plan's record to hold.

| Fact | Value | Basis |
|---|---|---|
| Repository | `website` — **one repo, one ref, one commit per act** | `git` |
| Serving ref | `master` (Vercel serves from it) | §1, §11, unchanged |
| Execution mode | **Externally executed.** This stage ran **no** merge, tag, push or cutover command for any of the four | reflog + this session performed none |
| Operator | **the owner** (`2d90e8a` is his own commit; the three merges were run under his selection approvals) | implementation doc; §12.6 F-3 |
| Phase 2B approval by this stage | **NONE for any of the four.** No release summary was presented and no Stage 2 gate ran | this stage presented none |
| Release-tip verdict | **NONE at any of the four trees.** QA's latest `Verified-At` is **`4a7126b`** | `qa/013-…-qa.md` L2008, re-read |
| Code review verdict | **NONE at any of the four trees** — the D39 review debt | `code-review/013-…`; D35 waiver |
| UAT release decision | **NONE.** The standing decision is **`EXPIRED IN FULL`** and expiry is not suspension | UAT rev 19, rev 24, rev 25 |
| Gate authority | **the owner's D35 waiver** — no QA, no code review and no UAT ran on any of this round | plan D35; OWNER-QUEUE |
| History | **One linear line.** All four are ancestors of `2d90e8a`; `master` is the only serving ref | `git merge-base --is-ancestor`, all four YES |
| Stranded work | **None.** All three chain branches are merged into `master` | `merge-base --is-ancestor`, all three YES |

**Deploy evidence, and it is terminal.** For each act the push to `origin/master` is recorded from the
remote-tracking reflog, and the owner has stated the result live — `OWNER-QUEUE.md`'s chain-013
section, rebuilt 2026-08-25, reads *"`origin/master` = **`2d90e8a`**, your own commit, live."*
**Serving state is recorded VERIFIED on that attestation. It is not marked NOT VERIFIED, no
host-side confirmation was performed, none was requested, and no capture file was owed** — so nothing
is waived. `origin/master` was re-derived at this write: `git ls-remote origin refs/heads/master` →
`2d90e8a60270740b59b4768a68cf3f67641e4345`.

**Deployed vs verified — why every one of the four needs a diff.** The verified tree for this chain is
`4a7126b`. **None of the four deployed commits is that commit**, so ancestry is not sufficient and
§§12.1–12.4 each carry a diff of the plan's surface rather than an ancestry argument. This is the
check that catches a green suite testing code nobody runs; here it catches the inverse as well
(§12.6 F-1).

**Release identifier.** These acts carry **no tag**. The identifier for each is the serving ref move,
stated as `website master <from> -> <to>`. Nothing was published to a registry; there is no registry
in this project, and no publish step is invented to satisfy a checklist.

**BC-13 does not reopen at any of the four.** Its test is whether the delta touches bot code:
`git diff --name-only 4a7126b 2d90e8a -- bot/` is **empty** (0 bytes, redirected to a file and read,
not counted through an output filter) while `bot/` still exists at `2d90e8a` (`git cat-file -e`, exit
0). **BC-13 stays TERMINAL** on the window already closed at §11; this section does not reopen it and
claims no new window.

---

## §12.1 — Deployment record: `8584b1e`

| Field | Value |
|---|---|
| **Plan reference** | `agent-output/planning/013-components-v2-editing-surfaces.md` |
| **Release identifier** | `website` `master` **`4a7126b` → `8584b1e`** (no tag) |
| **Deploy date** | **2026-08-25, 05:08:03 UTC** (push to `origin/master`) |
| **Local ref moved** | 04:57:00 UTC, `merge chain/013-load-notice-vessel: Fast-forward` |
| **Environment** | production |
| **Serving ref at cutover** | `master` |
| **Execution mode** | **Externally executed.** Operator: **the owner**. This stage executed nothing |
| **Authorizer** | the owner, by selection (recorded in the implementation document) |
| **Subject** | owner ruling 2026-08-25 (reversal) — the Load site is no longer a toast |

**Repositories and SHAs shipped**: `website` only, at `8584b1e`. `project-utils` did not move.

**Deployed vs verified reconciliation** — verdict SHA `4a7126b`, deployed `8584b1e`: **NOT THE SAME
COMMIT.** Diffed, per repository:

| Path | +/− | Class |
|---|---|---|
| `src/app/message/m/[id]/_components/JsonModalBody.tsx` | 6 / 3 | **production** |
| `src/utils/__tests__/013-owner-load-notice-reversal-2026-08-25.test.ts` | 38 / 0 | test (new) |
| `src/utils/__tests__/013-owner-toast-vessel-2026-08-25.test.ts` | 10 / 3 | test |

**Result: one production file changed beyond the verified tree, carrying a new test with it. The
deployed tree is NOT the verified tree, and the difference is real, not notational.** No QA verdict
covers `8584b1e`.

**Post-release status**: deployed and live on the owner's attestation. Gates: none ran.

---

## §12.2 — Deployment record: `d7c4836`

| Field | Value |
|---|---|
| **Plan reference** | `agent-output/planning/013-components-v2-editing-surfaces.md` |
| **Release identifier** | `website` `master` **`8584b1e` → `d7c4836`** (no tag) |
| **Deploy date** | **2026-08-25, 06:19:34 UTC** (push to `origin/master`) |
| **Local ref moved** | **never held this commit** — see below |
| **Environment** | production |
| **Serving ref at cutover** | `master` |
| **Execution mode** | **Externally executed.** Operator: **the owner**. This stage executed nothing |
| **Authorizer** | the owner, by selection (recorded in the implementation document) |
| **Subject** | owner ruling 2026-08-25 (D31/D32/D33) — conflict UI default state, readable mutation errors, choice rewrites |

**This commit was pushed from outside this working tree, and the record says so rather than implying
otherwise.** `master`'s local reflog goes `8584b1e` (04:57:00) → `e343927` (07:04:39,
`pull: Fast-forward`). **`d7c4836` is never a local `master` position here.** It reached this tree only
as part of that pull. The push is evidenced at the remote-tracking ref
(`origin/master@{06:19:34}: update by push`), not from this tree's own action.

**Repositories and SHAs shipped**: `website` only, at `d7c4836`. `project-utils` did not move.

**Deployed vs verified reconciliation** — verdict SHA `4a7126b`, deployed `d7c4836`: **NOT THE SAME
COMMIT.** Diffed (cumulative against the verified tree):

| Path | +/− | Class |
|---|---|---|
| `src/app/message/_components/NewMessageJsonInput.tsx` | 1 / 1 | **production** |
| `src/app/message/_components/NewMessageModal.tsx` | 3 / 3 | **production** |
| `src/app/message/m/[id]/_components/JsonModalBody.tsx` | 15 / 13 | **production** |
| `src/app/message/m/[id]/_components/SaveAsMenu.tsx` | 2 / 2 | **production** |
| `src/utils/formatMutationError.ts` | 28 / 0 | **production (new file)** |
| `src/utils/index.ts` | 1 / 0 | **production** |
| five `013-owner-*` test files | 216 / 3 | test |

**Result: six production files, including a new one, changed beyond the verified tree.** No QA verdict
covers `d7c4836`.

**Post-release status**: deployed and live on the owner's attestation. Gates: none ran.

---

## §12.3 — Deployment record: `e343927`

| Field | Value |
|---|---|
| **Plan reference** | `agent-output/planning/013-components-v2-editing-surfaces.md` |
| **Release identifier** | `website` `master` **`d7c4836` → `e343927`** (no tag) |
| **Deploy date** | **2026-08-25, 06:32:06 UTC** (push to `origin/master`) |
| **Local ref moved** | 07:04:39 UTC, `pull: Fast-forward` (after the push, not before it) |
| **Environment** | production |
| **Serving ref at cutover** | `master` |
| **Execution mode** | **Externally executed.** Operator: **the owner**. This stage executed nothing |
| **Authorizer** | the owner, by selection; the remote was verified independently by the implementer session via `git ls-remote` |
| **Subject** | owner ruling 2026-08-25 (D34) — relax five emptiness floors in `shapes.ts` |

**Repositories and SHAs shipped**: `website` only, at `e343927`. `project-utils` did not move.

**Deployed vs verified reconciliation** — verdict SHA `4a7126b`, deployed `e343927`: **NOT THE SAME
COMMIT.** Its own increment over `d7c4836` is:

| Path | +/− | Class |
|---|---|---|
| `src/server/api/utils/shapes.ts` | 5 / 5 | **production — server-side validation floors** |
| `src/server/api/utils/__tests__/shapes-v2.test.ts` | 40 / 6 | test |

Cumulatively against the verified tree it carries §12.2's six production files **plus** `shapes.ts`.

**This one deserves naming.** `shapes.ts` is server-side shape validation, and D34 **relaxes five
emptiness floors** in it. That is a change to what the server will accept at rest, shipped with **no
QA verdict, no code review and no UAT** at its tree. The relaxation is the owner's ruling and is not
questioned here; **its unreviewed status is recorded, not softened.**

**Post-release status**: deployed and live on the owner's attestation. Gates: none ran.

---

## §12.4 — Deployment record: `2d90e8a` — the currently serving commit

| Field | Value |
|---|---|
| **Plan reference** | `agent-output/planning/013-components-v2-editing-surfaces.md` |
| **Release identifier** | `website` `master` **`e343927` → `2d90e8a`** (no tag) |
| **Deploy date** | **2026-08-25, 07:04:49 UTC** (push to `origin/master`) |
| **Commit created** | 07:04:47 UTC, **directly on `master` in this working tree** |
| **Environment** | production |
| **Serving ref at cutover** | `master` — **still serving at this write** |
| **Execution mode** | **Externally executed.** Operator: **the owner**. This stage executed nothing |
| **Authorizer** | the owner — it is his own commit |
| **Subject** | *"remove useless message"* — removal of the code-path notice |

**Repositories and SHAs shipped**: `website` only, at `2d90e8a`. `project-utils` did not move.

**Governance note, recorded because the record is where it belongs and not as a criticism of the
owner**: this commit was authored **directly onto the checked-out serving branch in the main working
tree**, two seconds before the push. This stage's own constraint forbids *it* from doing that; the
owner is not bound by this stage's constraints, and D35 covers the round. Recorded so the history is
legible to a later reader who finds a commit on `master` with no chain branch behind it.

**Deployed vs verified reconciliation** — verdict SHA `4a7126b`, deployed `2d90e8a`: **NOT THE SAME
COMMIT.** Its own increment over `e343927`:

| Path | +/− | Class |
|---|---|---|
| `src/app/message/m/[id]/_layout/CodeMessageNotice.tsx` | 0 / 18 | **production — file DELETED** (`git cat-file -e` at `2d90e8a`: absent) |
| `src/providers/MessageProvider/index.tsx` | 0 / 11 | **production** |
| `src/app/message/m/[id]/layout.tsx` | 0 / 2 | **production** |
| `src/app/message/_components/NewMessageJsonInput.tsx` | 1 / 1 | **production** |
| `src/app/message/_components/NewMessageModal.tsx` | 1 / 1 | **production** |
| `src/app/message/m/[id]/_components/JsonModalBody.tsx` | 1 / 1 | **production** |
| `src/utils/__tests__/013-owner-toast-vessel-2026-08-25.test.ts` | 0 / 27 | **test — assertions removed** |
| `src/utils/__tests__/013-qa-toast-vessel-render.test.ts` | 0 / 51 | **test — QA's adopted instrument, assertions removed** |

**Cumulative production surface against the verified tree**: ten production files, one of them deleted.

**Post-release status**: deployed and live on the owner's attestation; **`origin/master` re-derived at
this write and still `2d90e8a`.** Gates: none ran. **The tree is ungated — neither approved nor
refused.** See §12.6 F-1, which is the finding this reconciliation exists to produce.

---

## §12.5 — U-C6 discharged

**U-C6 is `EXECUTED` as of this section.** The implementation document
(`implementation/013-components-v2-editing-surfaces-implementation.md`) carried `Status: Active`; it
now carries **`Status: Released — chain closure pending`**, set by this session, with a
`Status-Detail` stating the basis. The document was re-read immediately before the edit and was
unmodified in the working tree at that moment; **only the frontmatter changed — the body was verified
byte-identical after the write** (`diff` over the body, exit 0).

**What was deliberately NOT done, and why it is not a gap.** The document was **not** moved to
`closed/`. U-C6's text asks for the terminal `Status` at the document's closure step; it does not ask
for the move. `devops-hooks-013-2` deferred this whole item on the grounds that moving live documents
before the chain closes would strand them (§11.8 row 7), and **that reasoning still holds**: 16
conditions are non-terminal at UAT rev 25, and `qa` and `code-reviewer` sessions are live in this
chain right now. **Setting the status is not stranding; moving the file would be.** The move remains
devops's at chain closure.

**This does not assert that the chain has closed, and the status wording says so on its face.**

## §12.6 — Findings from the reconciliation

### F-1 — The deployed tree carries HALF of QA's adopted render instrument, and no verdict covers it

**This is the finding the deployed-vs-verified diff exists to produce, and it is the inverse of the
usual one.** The usual hazard is an older deployed tree — a green suite testing code nobody runs.
Here the deployed tree is *newer* than the verified one, and **assertions that covered the shipped
behaviour were removed along the way.**

`src/utils/__tests__/013-qa-toast-vessel-render.test.ts` is **QA's own instrument, formally adopted**
— introduced at `664e0c0`, *"test(013): adopt QA's toast-vessel render instrument (F-QA23)"*
(`git log --diff-filter=A`, single result). Measured with a counter that computes inside `grep`, never
through an output filter:

| Tree | `it(` / `test(` blocks | Bytes |
|---|---|---|
| `664e0c0` (adoption) | **8** | — |
| `4a7126b` (**the verified tree**) | **8** | 7100 |
| `2d90e8a` (**the deployed tree**) | **4** | 4175 |

**Half of the adopted instrument's cases are absent from the commit that is serving.** A further 27
lines were removed from `013-owner-toast-vessel-2026-08-25.test.ts` in the same commit. **QA's `QA
Complete` was reached at `4a7126b` and covers the 8-block instrument; nothing covers the 4-block one.**

**What this finding is not.** It is not an assertion that the removals were wrong — `2d90e8a` deletes
`CodeMessageNotice.tsx` outright, and tests of a deleted component are correctly deleted with it. **It
is an assertion that nobody has checked**, and that the difference is invisible to any reader who
reasons from ancestry. **Routed to QA and to UAT; not decided here.** Row definitions are QA's.

> **Instrument disclosure, in the round it happened.** I first read this file as *deleted* at
> `2d90e8a`, from `git ls-tree` output and a `0 51` numstat line. **That was wrong**, and it was the
> workspace's documented unsound-predicate class: an existence check read off filtered output.
> `git cat-file -e` (exit code, computed before any filter) and `git cat-file -s` (blob size) both say
> the file **exists** at `2d90e8a` at 4175 bytes. **A false "QA's instrument was deleted" finding was
> two minutes from being written into this record.** Caught by a contradiction between two
> instruments, not by re-running the first one — which reproduces stably and looks like confirmation.

### F-2 — `d7c4836` was pushed from outside this working tree

`master`'s local reflog never holds `d7c4836`; it goes `8584b1e` → `e343927` by
`pull: Fast-forward`. The push is evidenced only at the remote-tracking ref. **Recorded because a
later reader reconstructing this sequence from the local reflog alone would conclude `d7c4836` was
never deployed, and it was.** No `.solo` marker exists in either repository, so shared-tree
attribution rules apply and this is not read as anomalous.

### F-3 — Execution mode and operator rest on documents, not on this stage's observation

This stage executed **none** of the four acts and observed none of them happen. Operator and approval
for `8584b1e`, `d7c4836` and `e343927` are taken from the implementation document's own account
(*"owner-approved by selection, verified at the remote"*); `2d90e8a` is the owner's own commit and
needs no attribution. **Stated as second-hand where it is second-hand.**

### F-4 — This document's sibling still fails `tools/check-repo.js`, and is still not renamed

`deployment/013-…-readiness.md` fails the checker's stage-suffix rule: `deployment/` registers only
the suffix `deployment`, so `-readiness` reads as a coined scope word (CHECK 4, `tools/check-repo.js`
L517–547). **`devops-hooks-013` and `devops-hooks-013-2` both declined to coin a name and this session
declines too.** `-deployment` is the deployment record's own name and must not be taken by an artifact
that is not it; `deployment/012-message-valid-field-readiness.md` carries the identical failure and
stands. **This is a gap in the tooling's model — it has no readiness artifact — not a naming defect.**
Disclosed here rather than worked around.

## §12.7 — R-5's widening: the owner has ruled, and the ruling is recorded here

**Status: SETTLED 2026-08-25 by owner ruling. This section is the record area for both the original
ruling and its reversal, neither of which has a Decisions Register row yet.**

**Why the record area is here.** The register row is owed and is `steering`'s to write; it could not
be written at the time because `code-reviewer` and `qa` sessions were live readers of the plan
document and this repository runs one writer or many readers. **Both rulings are recorded here so
neither depends on a docket surviving** — a predecessor docket carrying a ruling invisibly is
precisely how the earlier one went unregistered.

**Ruling one — "Leave it — records stay owed" (superseded).** An owner ruling that the four
deployment records should not be written. **It was never registered anywhere.** A search of the plan's
Decisions Register returns eight `Leave it` / `stay owed` matches, every one a different row (D8, D16,
D21, D29, D34, D38, D42, I-D10) — **none of them this**. It lived only in a predecessor steering
session's docket, invisible by construction to any document-based reader.

**Ruling two — reversal: "Write all of them."** Given 2026-08-25 in the steering session, with ruling
one stated back to him. Described as: *"Devops writes the four records and its two documentary
conditions. Reverses 'leave it'. This is what closure needs if the chain is to close clean."* Two
alternatives stood and were not taken: *"Records stay owed"* (the unchanged earlier ruling) and
*"Conditions only"*. **Provenance, disclosed and weighed rather than adopted: a selection prompt,
options agent-authored by `steering-hooks-013-3`, no verbatim sentence.** §12 exists because of this
ruling.

**Ruling three — R-5's widening: "Record is enough."** Given 2026-08-25, on a statement of the
decision this session wrote at steering's request and which reached him unedited. Described to him as:
*"Nothing more happens. The plan keeps a sentence describing half the change; anyone reading the plan
later rather than the deployment record gets the narrow version and could act on it."* **Not taken**:
*"Fix the plan"*, and *"Leave it open"* — the latter explicitly described to him as blocking chain
closure, and declined. Same provenance class: selection prompt, agent-authored options, no verbatim.
Removed from `OWNER-QUEUE.md` at `ab728ff`, where resolution is deletion.

**Consequences, stated plainly:**

1. **U-C5's substance was already discharged before the ruling** — by *this record*, at `e34df07`,
   taking D25's second route (§§L154–161 above). The owner's ruling confirms that route as sufficient
   rather than creating it.
2. **The plan's R-5 sentence stays knowingly incomplete, by decision.** It describes only the flag
   half of what the mode change did. **No stage may "fix" it** to satisfy a reader; that would
   overturn a ruling. It is the same shape as D40.
3. **U-1 folds in nothing** — it was struck under D44 (UAT rev 21). The half of U-C5 that referenced
   it is void, not outstanding.
4. **Register state is UAT's.** This document restates; it does not terminalise U-C5.

**The wider class, restated here so these four records carry it too.** Beyond the flag half R-5
states: before the mode change, a message with **no `components` key at all** was skipped regardless
of its marking and the editor left whatever mode was already on screen; it is now **actively set to
Classic**. A user composing in the new mode who loads an ordinary classic message is therefore
switched, where previously they were not. The authoritative statement of what changed is code review
`ecbbe43` (an `agent-output` commit, *"Plan 013 M7 code review round 3: APPROVED_WITH_COMMENTS at
18407d8"*), reviewing `website` tree `18407d8` — **both resolved at this write, not inherited.**

**Validation items 4 and 7, carried onto these records** (item 5 is above):

- **R-4 (I-D12, not relaxed)**: none of these four acts makes any live declaration of the `valid`
  field, and none triggers anything in the statbot workspace. The sequence *backfill review → live
  declaration → statbot gate deploy* is chain 012's, is held under D20, and resumes only on the owner
  lifting that hold.
- **Rollback (item 7)**: unchanged and as §11 states it — a Vercel promote of a prior deployment. It
  **does not move `master`**, is not sticky, and rolls back no database state. There is no schema
  change and no data migration in any of the four; `project-utils` is untouched throughout.

## §12.8 — Deployment history entries

**Four entries, one per act.** `release_tip_verdict` is `null` in all four and that is the finding,
not an omission: no QA verification exists against any of these trees.

```json
[
  {
    "plan_id": "013",
    "release_identifier": "website master 4a7126b -> 8584b1e",
    "tag": null,
    "release_date": "2026-08-25T05:08:03Z",
    "environment": "production",
    "serving_ref": "master",
    "repositories": [{"repo": "website", "sha": "8584b1ef0331fd7bffa703d41932b178d306f768"}],
    "execution_mode": "externally-executed",
    "operator": "owner",
    "executor": null,
    "authorizer": "owner (by selection; recorded in the implementation document)",
    "phase_2b_approval": false,
    "release_tip_verdict": null,
    "verified_tree": "4a7126bf8578b653ac7ae1cfe7cabdd609cdc21f",
    "deployed_equals_verified": false,
    "reconciliation": "diffed: 1 production file (JsonModalBody.tsx 6/3), 2 test files",
    "serving_state": "verified on owner attestation; no host-side probe performed or owed",
    "gates_run": "none (owner D35 waiver)",
    "record_written_by": "devops-hooks-013-3",
    "record_written_at": "2026-08-25"
  },
  {
    "plan_id": "013",
    "release_identifier": "website master 8584b1e -> d7c4836",
    "tag": null,
    "release_date": "2026-08-25T06:19:34Z",
    "environment": "production",
    "serving_ref": "master",
    "repositories": [{"repo": "website", "sha": "d7c483608f6247602e3682c3945cc00d7ee15fd2"}],
    "execution_mode": "externally-executed",
    "operator": "owner",
    "executor": null,
    "authorizer": "owner (by selection; recorded in the implementation document)",
    "phase_2b_approval": false,
    "release_tip_verdict": null,
    "verified_tree": "4a7126bf8578b653ac7ae1cfe7cabdd609cdc21f",
    "deployed_equals_verified": false,
    "reconciliation": "diffed: 6 production files incl. new formatMutationError.ts, 5 test files",
    "serving_state": "verified on owner attestation; no host-side probe performed or owed",
    "gates_run": "none (owner D35 waiver)",
    "note": "never a local master position in this tree; pushed from elsewhere, arrived by pull (F-2)",
    "record_written_by": "devops-hooks-013-3",
    "record_written_at": "2026-08-25"
  },
  {
    "plan_id": "013",
    "release_identifier": "website master d7c4836 -> e343927",
    "tag": null,
    "release_date": "2026-08-25T06:32:06Z",
    "environment": "production",
    "serving_ref": "master",
    "repositories": [{"repo": "website", "sha": "e343927e9fdd4eae321bc16e7dbf7104a264c613"}],
    "execution_mode": "externally-executed",
    "operator": "owner",
    "executor": null,
    "authorizer": "owner (by selection; remote independently verified by the implementer session)",
    "phase_2b_approval": false,
    "release_tip_verdict": null,
    "verified_tree": "4a7126bf8578b653ac7ae1cfe7cabdd609cdc21f",
    "deployed_equals_verified": false,
    "reconciliation": "diffed: adds server-side shapes.ts (5/5) relaxing five emptiness floors, unreviewed",
    "serving_state": "verified on owner attestation; no host-side probe performed or owed",
    "gates_run": "none (owner D35 waiver)",
    "record_written_by": "devops-hooks-013-3",
    "record_written_at": "2026-08-25"
  },
  {
    "plan_id": "013",
    "release_identifier": "website master e343927 -> 2d90e8a",
    "tag": null,
    "release_date": "2026-08-25T07:04:49Z",
    "environment": "production",
    "serving_ref": "master",
    "repositories": [{"repo": "website", "sha": "2d90e8a60270740b59b4768a68cf3f67641e4345"}],
    "execution_mode": "externally-executed",
    "operator": "owner",
    "executor": null,
    "authorizer": "owner (his own commit)",
    "phase_2b_approval": false,
    "release_tip_verdict": null,
    "verified_tree": "4a7126bf8578b653ac7ae1cfe7cabdd609cdc21f",
    "deployed_equals_verified": false,
    "reconciliation": "diffed: 10 production files cumulative, CodeMessageNotice.tsx deleted; QA's adopted instrument reduced 8 -> 4 test blocks (F-1)",
    "serving_state": "verified on owner attestation; still serving at this write; no host-side probe performed or owed",
    "gates_run": "none (owner D35 waiver); tree is UNGATED - neither approved nor refused",
    "record_written_by": "devops-hooks-013-3",
    "record_written_at": "2026-08-25"
  }
]
```

## §12.9 — Post-release status and next actions

**Release state of this section: NOT A RELEASE ACT.** No push, no merge, no tag, no tree switch was
performed by this session. **Stage 1 only.** The serving ref stood at `2d90e8a` before this section
was written and stands at `2d90e8a` after it.

**There is no release decision for the live tree.** The standing decision is **`EXPIRED IN FULL`**;
expiry is not suspension and there is nothing to revive. `UAT Complete` is a status reached at
`4a7126b`, not a gate on `2d90e8a`. **Code review approved + QA Complete + UAT Complete ≠ approved for
release**, and writing these records does not change that by one step.

| # | Action | Owner |
|---|---|---|
| 1 | **F-1** — half of QA's adopted render instrument is absent from the serving tree, and nothing covers the remainder. Decide whether the removals are correct and whether a verdict is owed at `2d90e8a` | **qa**, then **uat** |
| 2 | **BC-18** — prediction re-derivation, the live item at UAT rev 25 | **qa** |
| 3 | **Register rows** for the three rulings recorded at §12.7, including the unregistered *"leave it"* and its reversal | **steering** |
| 4 | **A release decision for `2d90e8a`, or an explicit decision not to make one** — the tree is ungated and has been serving since 07:04:49 UTC | **the owner** |
| 5 | **U-C5** — terminalise on the owner's *"record is enough"* ruling (§12.7). Register state is UAT's; this document only restates | **uat** |
| 6 | **U-C6** — **DISCHARGED** at §12.5. The `closed/` move remains owed at chain closure | devops (done) |
| 7 | **Roadmap tracker** — four further deploy acts recorded; update | roadmap subagent |
| 8 | **Retrospective** — fires last, when no other work is in flight (D45) | retrospective subagent |

**Known issues carried**: the serving tree is ungated (§12.0); `shapes.ts`'s relaxed validation floors
shipped unreviewed (§12.3); F-1's instrument gap (§12.6).

**Rollback plan**: unchanged — Vercel promote of a prior deployment; does not move `master`, not
sticky, no database state involved. The nearest tree with a QA verdict is **`4a7126b`**.

**`agent-output` is not pushed.** Measured at this write, not carried from arithmetic:
`git rev-list --count origin/master..master` — the value is recorded in the commit for this section.
**No push approval has been given or requested for these documents.**

---

# §13 — Reconcile pass, 2026-08-25 19:2x UTC, by `devops-hooks-013-3`

**Three dated reconcile notes. Nothing above is overwritten** — each note preserves what the record
previously said and why it was defensible when written, per the document-lifecycle rule on restating
and correcting. **Every condition state below was re-read from the UAT document at this write**, which
now stands at **rev 37** (it was at rev 25 when §12 was written).

## §13.1 — BC-21: `NOT EXECUTED` → `EXECUTED`

**What the record says**: §11's second-act table (L552) carries **BC-21** as `NOT EXECUTED`.

**Why that was defensible when written**: it was true at the time. §11 predates UAT rev 25.

**What is true now**: **BC-21 is `EXECUTED`** (UAT rev 25, 2026-08-25). The owner answered the one word
rev 23 asked for, selecting *"Deliberate paste"* — which adopts the sentence *"and the warning
appeared"* — and QA's sufficiency for that row closes it **on one observation by construction**,
because its predicate is presence and its failure signature is absence. Provenance was disclosed as a
selection prompt with agent-authored options and no verbatim sentence.

**This is not a conflict**, and UAT says so explicitly: register state is UAT's document's, and this
record simply predates the move. **L552 is not edited; this note supersedes it.**

**Why UAT raised something this small, carried because it is the durable part**: it is the BC-11b
divergence one level down. **Neither document named the other as its authority for these rows**, which
is how a superseded state sat in four committed places with nothing anywhere contradicting it. **Two
records can be internally consistent and mutually stale, and nothing in either says which to believe.**
§12 states its authority explicitly for exactly this reason; §11 did not, and this note is the cost.

## §13.2 — F-1: the magnitude is wrong. **4 of 13, not 4 of 8**

**What the record says**: §12.6 F-1 states QA's adopted render instrument went from **8** `it(`/`test(`
blocks at `4a7126b` to **4** at `2d90e8a`, and calls that "half".

**Why that was defensible when written**: the count was taken with `grep -c`, which computes inside
`grep` before any output filter — the workspace's own prescribed instrument for counting. **The counter
was sound and returned the right answer to the question it was asked.**

**What is true now**: **the predicate was wrong, not the instrument.** QA ruled F-1 at `93ecaf0`,
measuring by **running the file at both trees** rather than counting its source
(`verification/013/probe-qa-p3-render-instrument-reduction/`):

| Tree | `it(` matches | **tests actually run** |
|---|---|---|
| `4a7126b` | 8 | **13 passed** |
| `2d90e8a` | 4 | **9 passed** |

**The `NullableComponent` block is an `it.each` with five rows, which a predicate matching `it(`
cannot see.** The instrument lost **4 of 13 — about 31%**, not half. **QA's rule, which is the reusable
part: run the file; do not count its source.** QA records this as the third instance of that shape in
one pass, and it is the same class as the false *"instrument deleted"* reading disclosed inside F-1
itself.

**Both limbs of F-1 are ruled, and the finding stands:**

1. **Are the removals correct? YES.** All four removed cases were the whole of the `CodeMessageNotice`
   describe block, and `2d90e8a` deletes that component outright along with its provider state and
   layout mount. **Tests of a deleted component are correctly deleted with it**, and nothing surviving
   lost coverage. §12.6's own caveat — that F-1 was never an assertion the removals were wrong —
   stands as written.
2. **Is a verdict owed? YES, and NOT at `2d90e8a`.** Nothing is uncovered; what is true is that the
   **surviving** instrument has never run under a QA verdict, because QA Complete was reached at
   `4a7126b`. **It is owed at the post-rider tip**, which is where QA will take it. §12.9's action row
   1 is therefore answered and closed, with the verdict rescheduled rather than owed at the serving
   commit.

## §13.3 — A release decision now exists, and it does **not** cover the serving tree

**What the record says**: §12.0, §12.9 and the frontmatter state that the live tree is **ungated** and
that the standing release decision is **`EXPIRED IN FULL`**.

**Why that was defensible when written**: it was exactly true at UAT rev 25.

**What is true now** — re-derived at this write, not relayed:

- **A NEW release decision exists.** UAT **rev 36** is the release gate:
  **`APPROVED FOR RELEASE, conditional on the human click-through of eight `PRE` rows`**. Because merge
  to `master` **is** the deploy here, that click-through happens **before** the merge, not after.
- **Its anchor is two-axis and is not this record's tree.** **TREE `e1d9b2b7090b46709861a9c4b2a57f340617777b`
  on `chain/013-rider-2`**; **CRITERIA plan 013 rev 48 (`f5b7cac`)**. The decision **expires when either
  moves**, and UAT notes that neither expiry announces itself.
- **`e1d9b2b` is NOT merged.** `git merge-base --is-ancestor e1d9b2b master` → **NO**.
  `git ls-remote origin refs/heads/master` → **`2d90e8a`**, unchanged, re-derived at this write.

**So the correction is narrower than it first looks, and the original statement survives where it
matters**: **`2d90e8a` — the commit that is actually serving — remains ungated.** The new approval
covers a *different, unmerged* tree. What is stale is only the clause *"the standing release decision
remains `EXPIRED IN FULL`"*: that decision is superseded by rev 36's new one rather than still
standing. **Nothing in §12's four records changes**, because all four record deploy acts that are
historical facts.

**No release act follows from this note.** The eight `PRE` rows are the owner's human click-through and
are not this stage's to execute or to waive; the merge that would deploy `e1d9b2b` is Stage 2 work
requiring his approval of the release, which has not been given to this session. **This session remains
Stage 1 only: no push, no merge, no tag, no tree switch.**
