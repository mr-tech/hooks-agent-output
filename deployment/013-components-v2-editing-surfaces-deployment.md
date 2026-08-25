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
  **§14 appended 2026-08-25 by `devops-hooks-013-3` (pid 3414852) — a SECOND reconcile pass, by a FRESH
  PROCESS carrying the same launch name as §12/§13's now-exited author; nothing in §§1-13 is rewritten.**
  **§13's gate is superseded**: it read UAT **rev 36** at TREE `e1d9b2b` / CRITERIA rev 48; the gate is now
  **rev 45** (`d60174d` + correction `8fd5b53`) at **TREE `b56570d` / CRITERIA plan rev 50 (`eb0e291`)** —
  it EXPIRED on the criteria axis at 19:31 and was RE-ISSUED, and **both axes were re-derived here from the
  tree, not inherited from any message**. **Seven of eight `PRE` rows are terminal; BC-4 alone stands `NOT
  EXECUTED`, so the approval is CONDITIONAL and has NOT gone unconditional.** UAT rev 46 is **in flight and
  uncommitted under a live writer** — read, recorded, and NOT relied on as authority; it points the same way.
  **The `EXPIRED IN FULL` clause above is superseded by §13.3 and again here**: a live conditional decision
  exists, covering an unmerged tree — while **`2d90e8a`, the commit actually serving, remains UNGATED**, which
  is the part of §13.3 that survives. **§13.2's second limb is DISCHARGED**: QA now stands `QA Complete`,
  `Verified-At: b56570d`, `Criteria-At: rev 50`, suite **48 files / 627 / 627**, reproduced independently here
  along with `pnpm build` **exit 0**. **§13.1 re-checked and unchanged** (BC-21 `EXECUTED`).
  **§14's FINDING, and it is not BC-4: NO RELEASE-TIP VERDICT EXISTS AT `b56570d`.** QA's own `4a7126b`
  ruling — *a coincidence of SHAs makes the subject identical, not the act* — governs, and the fact its
  plan-level pass lacks is a **production build at the tip** (`grep -c "pnpm build"` over the QA document →
  **0**). **BLOCKING under Phase 2A step 3; QA's to produce; commission it in parallel with BC-4.** This
  stage's own green build is **reproduction, not a verdict**, and does not satisfy the gate.
  **Deploy mechanism established from the repo**: Vercel git integration on push to `master`; **no
  `.github/workflows` directory exists**; `master` is the **sole** serving ref and `2d90e8a` is its ancestor,
  so a move is a fast-forward that cannot split any pair. **The merge IS the deploy — no halfway step.**
  Cross-repo references agree **four ways** at `749606d0` (no `version` field anywhere, so none was
  synthesised); no deploy-config drift; `tools/check-repo.js` **FAIL, 26 problems — non-blocking, recorded,
  not repaired**. **Nothing is marked NOT VERIFIED.** **This section is Stage 1 only: no push, no merge, no
  tag, no tree switch. `origin/master` `2d90e8a`; branch unpushed, 3 ahead; NOTHING RELEASED.**
  **§16 appended 2026-08-25 — THE RELEASE. `website` serving ref `master` moved **`2d90e8a` -> `b56570d`**,
  pushed **20:30:01 UTC** by `devops-hooks-013-3` (pid 3414852), **Mode A, agent-executed**, fast-forward.
  **PUSH MADE** — exit 0 AND the remote independently re-read afterwards, never assumed. **All three
  preconditions were verified at their own sources before the push**: (i) UAT rev 47 (`e7cdc6c`) read at the
  UAT document — **APPROVED FOR RELEASE, UNCONDITIONAL**, all eight `PRE` rows `EXECUTED`, the rev-36
  conditional clause **discharged, not waived**; (ii) **the release-tip verdict at `b56570d`** — a gate that
  **did not exist when this session started**, found missing at §14.5, commissioned, and satisfied at
  `d408477` (`Status: Release Verified`); (iii) **the owner's approval, given first-hand into this session**,
  *"You are approved to release after QA returns"* — read as *a verdict that satisfies the gate*, not merely
  any QA message, and this stage would have stopped had QA refused. **`devops now` was never read as
  approval.** **QA's routed Assumption Not Checked was discharged at the console seconds before the push** —
  `ls-remote` `2d90e8a`, ancestry exit 0, so **no assembly step existed and QA's verdict covers the merge**.
  **Deployed == verified == UAT anchor: one object, `b56570d`** — the reconciliation's clean case, which
  rules out a green suite testing code nobody runs. **The ref moved before the tree switched**, so the
  switch-back changed **zero files on disk** under two live sessions in that shared tree; porcelain 0 either
  side. **No tag** (this repo has no tag convention) and **no publish** (no registry) — neither invented to
  satisfy a checklist. **`pnpm lint` deliberately NOT run**: it is `eslint --fix .`, it modifies the tree, and
  it would have invalidated the very anchor. **BC-13 re-derived for THIS delta and does not reopen.** **The
  four `POST` rows BC-12/BC-14/BC-17/BC-20 are carried into Post-Release Status, NOT dropped because the
  merge happened** — three became decidable at the push; none owed a pre-deploy capture, checked while it was
  still checkable. **This act replaces an UNGATED serving tip with a verified one** — a reason it was safe to
  make, never a reason to hurry it. Serving state rests on the owner's attested mechanism; **no host-side
  probe was performed, requested or owed**, and **nothing is marked NOT VERIFIED**. **Chain closure PENDING**:
  the `closed/` move waits on the four `POST` rows.**
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

---

# §14 — Second reconcile pass, 2026-08-25 20:1x–20:2x UTC, by `devops-hooks-013-3` (pid 3414852)

**Nothing above is overwritten.** Each note preserves what the record previously said and why it was
defensible when written, per the document-lifecycle rule on restating and correcting. **No release act
follows from this section. Nothing was pushed, merged, tagged or switched.**

## §14.0 — Provenance, and an identity collision named rather than glossed

**This is a FRESH PROCESS with no inherited context**, rebuilt entirely from files. It carries the same
launch name — `devops-hooks-013-3` — as the session that wrote **§12** (`14bc31c`) and **§13**
(`b06adb1`), and that session has **exited** (it stopped at its request ceiling). A sweep of `/proc`
across every socket in `/run/user/1000/cc-socks/` returns **exactly one live devops process, pid
3414852, this one**. **Two sections of this document are therefore signed by one name and written by two
processes**, which is the hazard already on record — *a session's registered name can differ from its
launch name, so neither alone identifies it* — arriving from the other direction. **§14 carries a pid
for this reason and §§12–13 should be read as a predecessor's.**

Steering's brief for this session names the predecessor `deveops-hooks-013-2`. **That name matches
neither the document's signature nor any live or launched process observed here.** Recorded as a
naming discrepancy, not resolved; nothing in this section depends on it.

**Authority for restated status, re-read at THIS write and not carried from earlier in this session:**
**the UAT document is the authority for every blocking-condition state below; the QA document for every
verdict and every row definition.** Nothing here re-litigates either.

## §14.1 — Both gate axes re-derived from the tree. Neither inherited from any message

Steering's brief handed both anchors and explicitly asked that they be treated as claims to check.
**They were re-derived independently, and both hold:**

| Axis | Claim in the brief | Re-derived here | Instrument |
|---|---|---|---|
| **TREE** | `b56570d` on `chain/013-rider-2` | **`b56570dfa916368e9942e671d594112750567923`** | `git -C website rev-parse HEAD`, branch `chain/013-rider-2` |
| **CRITERIA** | plan 013 rev 50, `eb0e291` | **`Rev: 50`** in the plan's frontmatter; **`eb0e291`** is the last plan-touching commit | `git log -- planning/013-…md`; hunk read of `eb0e291` — `numstat` **3/1**, `Rev: 49 → 50`, one changelog row, one D53 row |
| **Serving ref** | `origin/master` `2d90e8a` | **`2d90e8a60270740b59b4768a68cf3f67641e4345`** | `git ls-remote origin refs/heads/master` over **SSH**, computed at the remote |
| **Workspace** | branch unpushed, 3 ahead | **3 ahead / 0 behind**, porcelain **0 lines** | `rev-list --left-right --count`, `status --porcelain` |

**One caution attaches to the criteria axis and is recorded rather than smoothed:** the plan's
`Status-Detail` prose still opens *"Rev 49, planner pass 16"* while the `Rev:` field reads **50**. The
**field** is the axis; the prose is lag. Noted so a later reader does not derive rev 49 from the
narrative and conclude the gate has expired when it has not.

## §14.2 — **§13.3 is SUPERSEDED. The gate has moved twice and expired once since it was written**

**What the record says**: §13.3 states the release decision is **UAT rev 36**, anchored at **TREE
`e1d9b2b` · CRITERIA plan rev 48 (`f5b7cac`)**, conditional on **eight** `PRE` rows.

**Why that was defensible when written**: it was exactly true at UAT rev 37, which is what §13's header
names as its read point. §13 anticipated the failure mode it then suffered — *neither expiry announces
itself* — and it is the anchor that moved, not the reading.

**What is true now**, re-read at the UAT document at this write:

- **The gate is UAT rev 45** (`d60174d`, with a correction pass at `8fd5b53`). Between §13 and now it
  was **re-issued at rev 41/44** and then **EXPIRED on the criteria axis** when the D53 registration
  pass (`eb0e291`, 19:31) took the plan to rev 50 one minute after rev 44's gate committed at rev 49.
  **UAT ruled the clause bites and RE-ISSUED**, rather than carving out the trivial delta.
- **Its anchor is now this record's release tip**: **TREE `b56570d` · CRITERIA plan rev 50
  (`eb0e291`)** — the same pair §14.1 re-derived.
- **Seven of the eight `PRE` rows are terminal.** `EXECUTED`: **BC-1, BC-6, BC-9, BC-10, BC-18**
  (rev 43) and **BC-7, BC-8** (rev 44). **One stands: BC-4**, `NOT EXECUTED`.
- **The decision is `APPROVED FOR RELEASE, CONDITIONAL`.** It has **not** gone unconditional.

**A revision is IN FLIGHT and is read, not relied on.** `uat-hooks-013-6` (pid 3391354, live) has
**242 uncommitted insertions** in the UAT document constituting **rev 46**. It is legible and it says
the owner reported **`BC-4 pass`**, that the row is **`NOT EXECUTED — OWNER REPORT ON RECORD, NOT YET
DECIDABLE ON LIMB 2`**, and that the approval **is not yet unconditional**. **An uncommitted section
under a live writer is not an authority**, and this record does not treat it as one — it is recorded
because it points the same way as the committed rev 45 and therefore changes nothing this section
concludes. **When it commits, it supersedes this paragraph.**

**What of §13.3 SURVIVES, and it is the part that matters**: **`2d90e8a` — the commit actually serving
— remains UNGATED.** Every approval since has covered an unmerged tree. That sentence is as true today
as when §13.3 wrote it.

## §14.3 — **§13.2's second limb is DISCHARGED. The owed verdict has been taken**

**What the record says**: §13.2 closed F-1's second limb by ruling a verdict **owed at the post-rider
tip** — *"rescheduled rather than owed at the serving commit"* — and marked §12.9's action row 1
answered on that basis.

**Why that was defensible when written**: the post-rider tip did not yet carry a verdict.

**What is true now**: **it does.** QA stands at **`Status: QA Complete`, `Verified-At: b56570d`,
`Criteria-At: plan 013 rev 50 (§V.34)`** — anchored on **both** axes to the same pair as the gate. QA
re-derived the suite at the tip: **48 files / 627 tests / 627 passed**, and §V.15–V.18 record the M10
pass, both wrong-fix mutants caught, and all eleven freshness rows byte-identical at `b56570d`.

**Reproduced independently in this session at `b56570d`, not adopted:** `npx vitest run` → **48 files /
627 tests / 627 passed**, and `pnpm build` → **exit 0**, `grep -ci error` over the output → **0**, full
route table emitted (10 app routes, 8 pages API routes, middleware). **The numbers agree exactly.**

**So §12.9's action row 1 is now closed on the fact rather than on the reschedule.**

## §14.4 — **§13.1 stands unchanged.** BC-21 remains `EXECUTED`

Re-read at the UAT register at this write: **BC-21 is `EXECUTED`** and is a member of the terminal set
at R36.4, carried unchanged through revs 37–45. **No note is owed.** Recorded because a reconcile pass
that reports only what moved leaves a reader unable to tell *checked and unchanged* from *not checked*.

## §14.5 — **A BLOCKING GATE IS UNMET, AND IT IS NOT BC-4: there is no release-tip verdict at `b56570d`**

This is this section's finding, and it is surfaced now — while the release is held for other reasons —
precisely so it is not discovered after the owner has approved.

**The rule, and it is QA's own, not this stage's.** At the `4a7126b` release, devops asked whether a
plan-level verdict whose `Verified-At` already equalled the release tip *was* the release-tip verdict.
**QA ruled NO** (`qa/release-4a7126b-tip-verification.md`, `78e0a13`): *"A coincidence of SHAs makes
the **subject** identical; it does not make the **act** identical."* It named three facts a plan-level
pass does not contain: the **full** suite at the tip, a **production build** at the tip, and
**combination risk across bundled work**. That document exists, and it is what §11.4 cites.

**Applied to `b56570d`:**

| Distinguishing fact | Present in QA's plan-level `b56570d` verdict? |
|---|---|
| **Full suite at the tip** | **YES** — §V.16, all **48** files, 627/627, exit 0. Not a scoped run |
| **Production build at the tip** | **NO.** `grep -c "pnpm build"` over the QA document → **0**. QA has run **no** build at this tree |
| **Combination risk across bundled work** | **Not addressed — and it is near-empty here.** `origin/master..chain/013-rider-2` is **3 commits, all plan 013 rider 2**. This release bundles **one** plan |

**Verdict on the gate: NOT MET.** No release-tip verification document exists for `b56570d`, and by
QA's own ruling the plan-level verdict does not become one by sharing a SHA. **Under this stage's
Phase 2A step 3 that is BLOCKING and the instruction is to STOP and request one.**

**What this stage's own build run does and does not do.** §14.3's `pnpm build` → exit 0 at `b56570d`
is **devops-side reproduction, not a QA verdict**, and it **does not satisfy this gate** — the whole
point of the `4a7126b` ruling is that the act, not the number, is what is missing. **What it does do
is retire the risk**: the one fact QA's plan-level pass lacks has been measured green here, so the
Phase 3 pass is expected to be short and is very unlikely to fail. **It should be commissioned in
parallel with BC-4, not after it.**

**A caution against the shortcut that will be tempting.** The combination-risk column is nearly empty
and the suite column is already met, which makes *"it is basically already done"* an available
argument. **It was available last time too, and QA's ruling exists because devops refused it then.**
Had the two been treated as equivalent at `4a7126b`, the release would have shipped with no build
behind it — which is exactly the fact missing again now.

## §14.6 — Pre-release verification, taken at this write. **Nothing is inherited from §11.4**

| Gate | Evidence | Result |
|---|---|---|
| **UAT** | rev 45, `d60174d` (+ correction `8fd5b53`), **UAT Complete**, anchored `b56570d` / plan rev 50 | **CONDITIONAL approval on record; the condition is NOT met** — BC-4 `NOT EXECUTED` |
| **Blocking checklist gate** (Stage 1 step 2b) | one register, UAT's; `PRE` set = BC-1, BC-4, BC-6, BC-7, BC-8, BC-9, BC-10, BC-18 | **BLOCKED — 7 of 8 terminal, BC-4 unterminated** |
| **`POST` rows** | BC-12, BC-14, BC-17, BC-20 — post-deploy-observable | **NOT blocking the release act.** They gate **chain closure** and carry into Post-Release Status |
| **QA (plan-level)** | `QA Complete`, `Verified-At: b56570d`, `Criteria-At: rev 50` — both axes matching the gate | **met** |
| **Release-tip verdict** | **NONE EXISTS at `b56570d`** — see §14.5 | **NOT MET — BLOCKING** |
| **Verdict freshness** | `merge-base` `2d90e8a` is an ancestor of `b56570d`; **0 commits the other way**, so the assembled tip **is** `b56570d` by identity — the verified tree and the shippable tree are the **same object** | **met** |
| **Independent reproduction** | at `b56570d`: `npx vitest run` → **48 files / 627 / 627, exit 0**; `pnpm build` → **exit 0**, 0 error lines, full route table | **met** |
| **Release consistency (cross-repo)** | `package.json` carries **no `version` field**, no CHANGELOG — so per Core Responsibility 3 this is the **cross-repo reference check** and **no version was synthesised** | **met — four legs agreeing at `749606d0…`**: specifier `github:hooks-gg/project-utils#master`; `pnpm-lock.yaml` (3 sites); `project-utils` local HEAD; **fresh SSH `ls-remote` of the real remote** → `749606d0…` on `refs/heads/master`. **No consumer left pinned to a stale branch** |
| **Deploy-config drift** | `git diff --numstat 2d90e8a..b56570d` over `vercel.json`, `pnpm-lock.yaml`, `tsconfig.json`, `next.config.*`, `.gitignore` → **empty**. `package.json` moves **1/1** and it is the `typecheck` script gaining `-p tsconfig.test.json` — **no dependency, no engine, no build command** | **no drift** |
| **Packaging integrity** | build green at the tip on a clean tree; **no assets, no package script, no filename to check — nothing to package** | **met** |
| **Gitignore review** | `website` porcelain **0**. In `agent-output`, **19 probe `node_modules` symlinks show as `??`, which is the HEALTHY state** — `.gitignore:12` is `node_modules/` with a trailing slash, matching directories only, so a rig that has degenerated into a real directory *disappears* from `git status`. **Recorded, not tidied**; "fixing" the pattern would destroy the only passive detector | **met, recorded** |
| **Workspace cleanliness** | `website` porcelain **0** before and after the build. In `agent-output`, **three paths are NOT this stage's and were left untouched**: `verification/013/probe-cr12-load-confirmation/dialog-table.txt` (modified, an exited code-reviewer's) and two untracked `verification/012/backfill-report-*.md` | **met, with foreign paths named** |
| **Verified SHA reachable** | `git branch --contains b56570d` → `chain/013-rider-2`. **No history was rewritten** between verification and now | **auditable** |
| **Serving-ref ordering** | `website` remote heads: `master`, `backup`, `external-message-api`, `redesign`, `regex-refactor`. **Enumerated from the repo, not from a gate's count.** **`master` is the sole serving ref** (Vercel git integration; `vercel.json` carries only a cron entry and there is **no `.github/workflows` directory at all**). `master` `2d90e8a` is an **ancestor** of `b56570d` → a move is a fast-forward and **cannot split any pair** | **met** |
| **`tools/check-repo.js`** | **FAIL — 26 problems**, re-run here at this write: 012 link failures, vendored `node_modules` basename collisions under `verification/013/`, 3 frontmatter failures (the code-review doc's `ID: 11`), 3 scope-suffix failures (**two of which are this domain's own readiness docs**) | **NON-BLOCKING for release; recorded so it is not a surprise at closure. Not repaired — out of scope tonight by steering's instruction** |

## §14.7 — Deploy mechanism, established from the repo rather than assumed

**`website` deploys on push to `master` via Vercel's git integration.** Established from the repo's own
configuration: `vercel.json` exists (crons only), **`.github/workflows` does not exist** (`ls -d` →
*No such file or directory*; the `.github` directory holds only `prompts/`), and no deploy script,
Dockerfile or `netlify.toml` is present. **There is no CI step between the push and the deploy.**

**Consequence, and it is UAT's R46.9 point restated from this side: for this repo the merge IS the
deploy.** *Before merge* and *before deploy* are the **same instant**. **There is no halfway step that
is only a merge**, and no window in which a missed check can be caught.

## §14.8 — Release position at the close of this pass

**TWO independent gates are unmet, and each blocks on its own grounds:**

1. **BC-4** — `NOT EXECUTED`. UAT's, and **not this stage's to close, judge or wait out**. Terminal
   states are `EXECUTED` or `WITHDRAWN` (his ruling alone). **`NOT EXECUTED` is not a terminal state,
   and no release is recorded complete while it stands at one.**
2. **The release-tip verdict at `b56570d`** — **does not exist** (§14.5). QA's to produce.

**And a third thing that is not a gate but is required before any command runs: the owner's explicit
approval of the release act itself.** `devops now` is a direction to the pipeline. **It is not release
approval**, and this stage does not treat it as one.

**Nothing is marked NOT VERIFIED in this section.** Every artifact-side check above was performed.

**State: `origin/master` `2d90e8a`, `chain/013-rider-2` `b56570d` unpushed and 3 ahead, `website`
porcelain 0. NOTHING RELEASED. No push, no merge, no tag, no tree switch.**

---

# §15 — Pre-push derivations, 2026-08-25 20:3x UTC, by `devops-hooks-013-3` (pid 3414852)

**Still Stage 1. Nothing pushed, merged, tagged or switched.** This section records four derivations
taken **before** any release act, because two of them stop being takeable once the push happens and one
of them decides an ordering question that would otherwise be discovered at commit time.

## §15.1 — **BC-13 does not reopen at this delta.** Re-derived, not inherited

**Why this needs re-deriving every time**: `BC-13 · bot-code-ttl-residue` is **devops-owned** and its
earliest-decidable condition is *one hour after the deploy SHA is live*. It stands **`TERMINAL — WINDOW
ELAPSED`** (R36.4) and is **not** among the four live `POST` rows — but it is a row about **bot code
reaching production**, so **every new deploy is a fresh opportunity for it to reopen.** §11 and §12 each
had to argue it does not. **That argument is per-delta and is not inheritable.**

**Derivation for `2d90e8a..b56570d`:**

| Step | Instrument | Result |
|---|---|---|
| Does the delta touch bot code? | `git diff --numstat 2d90e8a..b56570d -- bot/` | **empty — 0 rows** |
| Is that "no changes" or "no such path"? | `git ls-tree --name-only b56570d` | **`bot/` EXISTS at the tip** — so the empty numstat means *unchanged*, not *absent* |

**`numstat` computes inside git, before any output filter**, so this is a sound counter under the
workspace's own rule. **BC-13 does not reopen. It stays `TERMINAL — WINDOW ELAPSED`.**

## §15.2 — **The bot ships INSIDE the Next app. There is no second service and no stale-consumer gap**

A reader looking at this delta has a reasonable fear: `src/utils/index.ts` moves **23/4**,
`src/utils/formatMutationError.ts` **10/1** and `src/server/api/utils/shapes.ts` **8/1**, and `bot/`
consumes `src/`. **If the bot were a separately-rolled service, a push to `master` would leave it
running stale code against changed shared utilities** — the exact defect Core Responsibility 3 exists to
catch, one level in from a cross-repo pin.

**It is not.** Derived from the repo:

- **`bot/` has no `package.json` and no `tsconfig.json`** (`ls -d` → *No such file or directory* for
  both) — it is not a separately built or separately deployed unit.
- **Its sources are imported by the app**: 5 files under `bot/` import from `~/utils` / `~/server`
  (`edgeCommands.ts`, `serverCommands.ts`, `scripts/app_commands/{common,messageCommands,slash/index}.ts`).
- **The build emits them as app routes**: `pnpm build` at `b56570d` produced **`/api/interactions-edge`**
  and **`/api/interactions-server`** in the route table.

**So the changed utilities reach the bot handlers through the same artifact and the same deploy. No
separate rollout is owed, and none is proposed.** This is also what keeps the release **Mode A** — one
artifact, one ref, no multi-service sequencing.

## §15.3 — **`ecosystem.config.json` — recorded, not established, not probed**

The repo carries `ecosystem.config.json`, which defines **one** PM2 app: `hooks.gg-website`, running
`node_modules/next/dist/bin/next start`. **That is an alternative serving path for the same
application, not a second service** — there is no bot entry in it.

**Whether any PM2 instance is live is NOT established from the repo, and this stage did not probe for
it.** Serving state is the owner's to attest and is never inferred from the working machine. **It is
also not an open question**: the mechanism is already established by his attestation across the four
deploy acts recorded at §12, all of which are pushes to `master`. **Recorded so a later reader does not
mistake this file for an unexamined second deploy path, and does not go looking host-side for one.**

## §15.4 — **In-flight gate scan: NO pre-deploy capture is owed by any `POST` row**

**Why this was run.** This stage's Phase 2C rule is that where a gate document names checks interleaved
with the release's own steps, **every capture step must precede, in the same runbook, the row that
consumes its number** — and *"a row consuming a number no earlier row captures is unexecutable, not
strict."* **For this repo the merge IS the deploy, so there is no window after the push in which a
missed capture can be taken.** A baseline not captured before the push is lost permanently.

**The four live `POST` rows, each read at its definition for a consumed baseline:**

| Row | What it consumes | Capture owed before the push? |
|---|---|---|
| **BC-12 · a V2 message that sent at `c85945f` still sends after deploy** | a message **already known to have sent** at `c85945f` — a historical fact about existing data | **NO.** The subject predates this release and is unaffected by it. One 4xx refutes by construction; it is not a rate needing a before-figure |
| **BC-14 · `user-defect-fixed-in-prod`** | four post-deploy observations | **NO.** All four are taken after the deploy is live; there is no before-figure in the row |
| **BC-17 · `discord-returns-row-e`** | an import attempted against **a message known to predate V2 enforcement** | **NO.** Also historical data, still identifiable after the deploy |
| **BC-20 · `dropped-notice-guards-send`** | *no report of a message sent missing components the importer dropped* | **NO** — and the row itself says why: **it is a silent mode, and absence of reports is not evidence for it.** There is no number to capture on either side |

**Result: the runbook needs no capture step before the push, and §7's sequence is complete as
proposed.** **Recorded because "no baseline owed" is only worth anything if someone actually looked** —
an unrun check and a clean check read identically in a document that does not say which it was.

## §15.5 — **The plan's `Status` field: the closing act does NOT need it changed first, and changing it first would be harmful**

**The question, put by steering**: `uat`'s definition tells it to set the plan's `Status` to `UAT
Approved`; the plan reads `Status: Active`. `uat` refused both evasions and routed a rev 51
registration pass to the planner. **Does this stage's closing act need that field to read something
other than `Active` before the push?**

**NO — and the planner must not be commissioned before the push.** Two independent reasons:

1. **This stage writes that field itself, and writes it later.** Phase 2D step 1 sets every included
   plan's `Status` to **`Released`**, and Stage 1 step 8 moves the plan, implementation, QA and UAT
   documents to `closed/`. **Whatever `Status` reads at the moment of the push is overwritten by this
   stage's own closure**, so a rev 51 pass to set an intermediate value buys nothing that survives.
2. **A plan write before the push would expire the gate in the act of preparing to satisfy it.** The
   plan file **is** the criteria axis. Rev 47's decision is anchored at **CRITERIA plan 013 rev 50
   (`eb0e291`)** and **expires when either axis moves.** A rev 51 registration pass moves it. **This
   already happened once tonight** — `eb0e291` at 19:31 expired rev 44's gate one minute after it
   committed, and `uat` ruled the clause bites and re-issued rather than carve out a trivial delta.
   **Doing it again, knowingly, immediately before a push, would be strictly worse than the accident**:
   it would expire rev 47, expire QA's verdict on the same axis, and expire the release-tip verdict
   commissioned against that pair — three verdicts, to set a field this stage is about to overwrite.

**So the ordering is: push first, then close.** `uat`'s own note reaches the same place — *if the
owner's release lands first, devops closes these documents on commit and the point is moot.* **This
section confirms it from the closing stage's side rather than leaving it as `uat`'s guess about what
devops needs.**

**What this stage does NOT claim**: that `uat`'s obligation is discharged, or that the planner's rev 51
is unnecessary in general. **It is a sequencing statement only** — the pass must not land *between the
gate and the push*. Where it lands afterwards is the planner's and steering's call, not this stage's.

## §15.6 — Standing at the close of this section

**Precondition (i) — UAT unconditional**: reported met at **rev 47** (`e7cdc6c`) by steering. **Not yet
re-read at the document by this stage**; it will be, at the moment of push, along with both axes.
**(ii) release-tip verdict at `b56570d`**: **OUTSTANDING** — commissioned to QA, not returned.
**(iii) the owner's explicit approval of the release act**: **NOT GIVEN.** `devops now` is a direction
to the pipeline and this stage does not read it as release approval.

**The four `POST` rows are carried forward verbatim as `uat` worded them**: *they gate the chain's
CLOSURE, never the release act; they must not be presented as blocking the merge, and they must not be
quietly dropped once the merge happens; each is acted on at its earliest-decidable condition rather
than when someone happens to look.* **No release is recorded complete while any stands at `NOT
EXECUTED`.** They land in this record's Post-Release Status, not in its release gate.

**Nothing is marked NOT VERIFIED in this section.** **`origin/master` `2d90e8a`; `chain/013-rider-2`
`b56570d` unpushed, 3 ahead; `website` porcelain 0. NOTHING RELEASED.**

---

# §16 — **THE RELEASE. `master` `2d90e8a` → `b56570d`, pushed 2026-08-25 20:30:01 UTC**

**Deployment record for plan 013.** One plan is included in this release, so this is the only record it
produces. **Nothing in §§1–15 is rewritten.**

## §16.0 — Authority for restated status

**The UAT document is the authority for every blocking-condition state in this section; the QA
documents for every verdict.** Nothing here re-litigates either. **Both were re-read at their own
documents immediately before the push** — not carried from earlier in this session, and not adopted
from steering's relay of them.

## §16.1 — Plan reference and release identifier

| | |
|---|---|
| **Plan** | 013 — Components V2 across the editing surfaces |
| **Release identifier** | **`website` serving ref `master` moving `2d90e8a` → `b56570d`** |
| **Release date** | **2026-08-25, push at 20:30:01 UTC** |
| **Execution mode** | **Mode A — agent-executed** by `devops-hooks-013-3` (pid 3414852) |
| **Environment** | production |
| **Epic** | Components V2 editing support |
| **Recommended version** | **MINOR** (UAT R47.5) — *recommendation only*. **No tag was created: this repo has no tag convention** (`git tag` and `ls-remote --tags` both empty, local and remote). **No publish step: there is no registry.** Neither was invented to satisfy a checklist |

## §16.2 — Repositories and SHAs shipped

| Repository | Ref moved | From | To |
|---|---|---|---|
| **`website`** | **`master`** — the sole serving ref | `2d90e8a60270740b59b4768a68cf3f67641e4345` | **`b56570dfa916368e9942e671d594112750567923`** |
| `project-utils` | **none moved** | — | pin unchanged at `749606d0…`; not a serving ref for this release |

**Serving ref at cutover: `website` `master`.** The three commits shipped are `368f932`, `e1d9b2b`,
`b56570d` — all plan 013 rider 2.

## §16.3 — Pre-release verification, taken at the moment of push and inherited from nothing

**Every expectation was stated in advance in §7 and checked against that statement.** The instruction I
held myself to was *stop and report on any mismatch, do not adapt.* **There were none.**

| Check | Expected | Observed | Result |
|---|---|---|---|
| branch | `chain/013-rider-2` | `chain/013-rider-2` | ✅ |
| `rev-parse HEAD` | `b56570d…` | `b56570dfa916368e9942e671d594112750567923` | ✅ |
| `status --porcelain` | 0 | **0 bytes** | ✅ |
| `ls-remote origin refs/heads/master` | `2d90e8a…` | `2d90e8a60270740b59b4768a68cf3f67641e4345` | ✅ |
| `merge-base --is-ancestor master HEAD` | exit 0 | **exit 0** | ✅ |
| plan `Rev:` **field** | 50 | `Rev: 50` | ✅ |
| last plan-touching commit | `eb0e291` | `eb0e291` | ✅ |

### The three preconditions, each verified at its own source

| # | Precondition | Verified how |
|---|---|---|
| **(i)** | **UAT unconditional** | **Read at the UAT document, not accepted from relay.** Rev 47, commit **`e7cdc6c`**, no uncommitted delta. R47.5: **"APPROVED FOR RELEASE — UNCONDITIONAL"**, all eight `PRE` rows `EXECUTED`, the rev-36 conditional clause **discharged, not waived**. Anchor **TREE `b56570d` · CRITERIA plan rev 50 (`eb0e291`)** — the same pair independently re-derived here |
| **(ii)** | **Release-tip verdict at `b56570d`** | **Read at its own document.** `qa/release-b56570d-tip-verification.md`, commit **`d408477`** — `Status: Release Verified`, `Verified-At: b56570d`, `Criteria-At: plan 013 rev 50, eb0e291`. **This gate did not exist when this session started; §14.5 found it missing and it was commissioned and satisfied before the push** |
| **(iii)** | **The owner's explicit approval of the release act** | **Given first-hand, in his own words, into this session: "You are approved to release after QA returns."** Not relayed, not inferred from *"devops now"*, which this stage consistently refused to read as approval |

### QA's routed Assumption Not Checked — **discharged at the console, which is the only place it could be**

QA's *"no assembly step"* finding rested on `origin/master` still being `2d90e8a` **when the merge
actually happened**, which QA could only establish as of its own write time. Its falsity signature:
*`merge-base --is-ancestor` non-zero, or `ls-remote` other than `2d90e8a`* — **at which point an
assembly step exists that its verdict never examined.**

**Both were run in the pre-flight above, seconds before the push: `ls-remote` → `2d90e8a`, ancestry →
exit 0. No assembly step existed. The push was a pure fast-forward and QA's verdict covers it.**

### Other gates

| Gate | Result |
|---|---|
| **Verdict freshness** | **The assembled tip IS `b56570d` by identity** — `2d90e8a` an ancestor, 0 commits the other way. **No scratch merge was needed and no ref was moved to establish it** |
| **Release consistency (cross-repo)** | **No `version` field in `package.json`, no CHANGELOG — so per Core Responsibility 3 this is the cross-repo reference check and no version was synthesised.** Re-checked **after** the push: specifier `github:hooks-gg/project-utils#master`; lockfile pins `749606d0…` at **4 sites**; **fresh SSH `ls-remote`** of the real remote → `749606d0…`. **No consumer left pinned to a stale branch** |
| **Packaging integrity** | build green at the shipped SHA on a clean tree; **nothing to package** — no assets, no package script, no filename |
| **Gitignore review** | `website` porcelain 0. In `agent-output`, 19 probe `node_modules` symlinks show as `??`, **the healthy state** — recorded, not tidied |
| **Workspace cleanliness** | `website` porcelain **0 before the push, 0 after the switch** |
| **Verified SHA reachable** | `git branch --contains b56570d` → **`chain/013-rider-2`, `master`.** No history rewritten; the verified tree remains auditable |
| **Serving-ref ordering** | `master` is the **sole** serving ref; the move was a fast-forward and **could not split any pair** |
| **`pnpm lint`** | **DELIBERATELY NOT RUN.** It is `eslint --fix .` and **modifies the tree** — destructive at a verified tip on a shared tree, and it would have invalidated the very anchor. **D51 accepts the residue anyway, so it decides nothing.** Recorded as a prohibition honoured, not an omission |

## §16.4 — User confirmation — **GIVEN, first-hand**

| | |
|---|---|
| **Response** | **"You are approved to release after QA returns."** — verbatim and complete |
| **Given by** | **the repository owner**, directly into this session |
| **Timestamp** | 2026-08-25, before the push at 20:30:01 UTC |
| **Condition** | **satisfied before the push** — QA returned `Release Verified` at `d408477`, read at its own document |
| **How the condition was read** | *"after QA returns"* was read as **after QA returns a verdict that satisfies the tip gate**, not merely after QA sends any message. **Had QA refused or been unable to verify, this stage would have stopped and returned the waiver decision to him as a separate question.** The reading was stated to steering in advance of the push, not constructed afterwards |
| **A gap in the approval's provenance, recorded rather than smoothed** | Steering disclosed that the summary he first approved against **did not contain the four literal commands**, and said it would rather this stage refuse than stretch it. **That scruple was correct and is recorded.** It was resolved not by argument but by his approving **directly into this session**, where the command sequence was then put in front of him in full. **This record does not claim he pre-read the commands in the earlier summary; it claims he approved first-hand and had them.** |

## §16.5 — Release execution — the commands this stage ran

```
1.  git -C website branch -f master chain/013-rider-2      exit 0
      local master -> b56570d ; tree untouched, still on chain/013-rider-2 ; porcelain 0
2.  git -C website push origin master                      exit 0     ← THE DEPLOY, 20:30:01 UTC
      To github.com:hooks-gg/website.git
         2d90e8a..b56570d  master -> master
3.  git -C website ls-remote origin refs/heads/master      -> b56570d
    git -C website rev-parse master                        -> b56570d
4.  git -C website switch master                           exit 0
      porcelain 0 before AND after ; HEAD b56570d ; ZERO files changed on disk
```

**PUSH: MADE.** Reported as made because it returned exit 0 **and** the remote was independently
re-read afterwards — never assumed. No `index.lock` contention occurred.

**Why the ref moved before the switch, since a later reader will find this unconventional.** The
conventional order — `switch master` → `merge --ff-only` → `push` — would have checked out `master` at
`2d90e8a` and **rewritten ~20 files under two sessions live in that shared tree** (`qa-hooks-013-4`,
`uat-hooks-013-6`). Moving the ref first made the switch-back **content-neutral: zero files changed on
disk**, which the porcelain readings either side confirm. **Approved by steering on that reasoning.**

### Deploy evidence

**`website` deploys on push to `master` via Vercel's git integration** — established from the repo's
own configuration (`vercel.json` present; **`.github/workflows` does not exist**; no deploy script,
Dockerfile or `netlify.toml`), and by the owner's attestation across the four deploy acts at §12, every
one a push to `master`. **There is no CI step between the push and the deploy: the merge IS the
deploy.**

**The pushed commit `b56570d`, read from local git and confirmed at the remote, stands as the serving
commit on the owner's attestation of that mechanism together with his approval of this act.** **This is
sufficient and terminal evidence of serving state — it is not a weaker substitute for a host-side
check.** **No host-side probe was performed, requested, or is owed**, and **no confirmation step was
handed to the owner to run on his own host.** Nothing about serving state is marked `NOT VERIFIED`.

## §16.6 — Reconcile: deployed against verified, per repository

| Repository | Deployed ref | Commit at it | Verdict SHA | Reconciliation |
|---|---|---|---|---|
| **`website`** | **`master`** | **`b56570d`** — the pushed commit, read from local git and re-read at the remote, standing as the serving commit on the owner's attestation | **`b56570d`** (QA release-tip `d408477`; QA plan-level; UAT rev 47 anchor — **all three the same object**) | **IDENTICAL — the same object, not merely an ancestor. No surface diff is owed, because there is no difference to diff** |
| `project-utils` | none moved | `749606d0…` | — | pin unchanged; not a serving ref for this release |

**This is the reconciliation's clean case, and it is worth naming what it rules out:** the failure this
check exists to catch — **a green suite testing code nobody runs** — **cannot arise here**, because the
verified commit and the serving commit are one object.

**And what the release changed about the chain's standing risk**: the previously serving `2d90e8a` was
**ungated** — four commits reached `master` after the last release verdict and none carried one (§12,
and QA repeated it independently). **This act replaces an ungated serving tip with a verified one.**
**That is a reason the release was safe to make; it was never a reason to hurry it**, and it did not
shorten a single gate.

## §16.7 — Post-release status

**Status: RELEASED. Chain closure PENDING.**

### The four `POST` rows — carried, not discharged, and not dropped because the merge happened

**Carried verbatim as `uat` worded it:**

> **BC-12, BC-14, BC-17 and BC-20 are post-deploy-observable: they gate the chain's CLOSURE, never the
> release act.** They must not be presented as blocking the merge — **and they must not be quietly
> dropped once the merge happens.** Each reaches its own terminal state, **acted on at its
> earliest-decidable condition rather than when someone happens to look.** No release is recorded
> complete while any of them stands at `NOT EXECUTED`.

| Row | Owner | Earliest decidable | State |
|---|---|---|---|
| **BC-12 · a V2 message that sent at `c85945f` still sends after deploy** | implementer (decision) / **uat** (observation) | **the deploy is live — i.e. NOW** | **`NOT EXECUTED`.** One 4xx refutes **by construction** — not a rate to accumulate; one failure is a hotfix trigger |
| **BC-14 · `user-defect-fixed-in-prod`** | **uat** | **the deploy is live — i.e. NOW** | **`NOT EXECUTED`.** All four observations owed. **This is the row a by-number reference drops (U-2), and it is the chain's own reason for existing** |
| **BC-17 · `discord-returns-row-e`** | **uat** | tip deployed **and** an import attempted against a message predating V2 enforcement | **`NOT EXECUTED`** |
| **BC-20 · `dropped-notice-guards-send`** | **uat** | chain tip deployed | **`NOT EXECUTED`.** **A silent mode — absence of reports is not evidence for it** |

**Three of the four became decidable at 20:30:01 UTC.** Per §15.4, **none of them owed a pre-deploy
capture**, so nothing was lost by the merge being the deploy — that was checked before the push, when
it was still checkable.

### BC-13 — does not reopen, re-derived for this delta

**`TERMINAL — WINDOW ELAPSED`, and it stays there.** BC-13 is devops-owned and its condition is *one
hour after the deploy SHA is live*, so **every deploy is a fresh chance for it to reopen**. Derived for
**this** delta rather than inherited: `git diff --numstat 2d90e8a..b56570d -- bot/` → **empty**, and
`bot/` **exists** at the tip, so the empty result means *unchanged*, not *absent*. **No new window
opens.**

### Known issues — carried openly, none a release blocker

- **F-QA33 — OPEN.** Declined as a 013 rider, routed as a new-plan candidate. **Releasing does not
  close it** (UAT R47.5).
- **CR25-1 / CR25-2 — OPEN residual** against the shipped oracle, on the owner's *"record it, leave
  it"*.
- **D51 — the ESLint residue is accepted as-is**; `pnpm lint` not exiting 0 is **not** a defect.
- **D52 — the CR24-2 guard is armed, not fixed**; both disagreeing encodings remain.
- **Delta coverage (QA, this release)**: three extracted definitions are behaviourally covered but **no
  spec pins any of the seven call sites** — the *"wired is not installed"* shape, **weaker here** than
  at the prior release. **Reported by QA, not fixed, and not a blocker on QA's own reading.**
- **`368f932` edits a 012 test file while 012 is held whole.** QA **executed both blobs side by side**
  rather than reading the diff and calling it safe: 6 green either side, identical test names, no
  assertion moved. **Not a breach, not a blocker.** QA flagged a documentation tension in D51's
  unqualified first half and deliberately did not escalate it.
- **`tools/check-repo.js` FAILs — 26 problems** (012 link failures, vendored `node_modules` basename
  collisions, 3 frontmatter, 3 scope-suffix — two of the last being this domain's own readiness docs).
  **Non-blocking for release; recorded so it is not a surprise at closure; not repaired.**
- **`ecosystem.config.json`** defines one PM2 app — the website itself under `next start`, **not a
  second service.** Whether any instance is live is **the owner's to attest** and was **not probed**.

### Rollback plan

**A revert is a ref move back**: `git -C website push origin b56570d~3:master` restores `2d90e8a`, or
`git revert` for a forward-only fix. **Vercel also retains the prior deployment** and can be rolled
back from its own dashboard — **the owner's instrument, not this stage's**, and named here rather than
exercised. **The prior serving tree `2d90e8a` was itself ungated**, so a rollback trades a verified tip
for an unverified one; a forward fix is preferable unless BC-12 refutes.

## §16.8 — Deployment history entry

```json
{
  "release_identifier": "website master 2d90e8a -> b56570d",
  "plan_ids": ["013"],
  "date": "2026-08-25",
  "push_utc": "2026-08-25T20:30:01Z",
  "execution_mode": "Mode A - agent-executed",
  "executed_by": "devops-hooks-013-3 (pid 3414852)",
  "authorized_by": "the repository owner, first-hand, in this session",
  "environment": "production",
  "repositories": [
    { "repo": "website", "serving_ref": "master", "from": "2d90e8a60270740b59b4768a68cf3f67641e4345", "to": "b56570dfa916368e9942e671d594112750567923" },
    { "repo": "project-utils", "serving_ref": null, "pin": "749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f", "moved": false }
  ],
  "gates": {
    "uat": "rev 47 (e7cdc6c) - APPROVED FOR RELEASE, UNCONDITIONAL",
    "qa_plan_level": "QA Complete, Verified-At b56570d, Criteria-At plan rev 50",
    "qa_release_tip": "Release Verified (d408477)",
    "code_review": "Code Review Approved"
  },
  "deployed_equals_verified": true,
  "tag": null,
  "publish": null,
  "post_rows_open": ["BC-12", "BC-14", "BC-17", "BC-20"],
  "not_verified": []
}
```

## §16.9 — Next actions

1. **`uat` — BC-12, BC-14 and BC-20 are decidable NOW**; BC-17 when an import is attempted against a
   pre-enforcement message. **Acted on at earliest decidability, not when someone happens to look.**
2. **The roadmap subagent** — release complete; the release tracker needs updating.
3. **This stage — the `closed/` move**, after the four `POST` rows terminalise. **Deliberately not made
   now**, per §12.5 and because the chain is not closed.
4. **The plan's `Status` field** — this stage's Phase 2D sets it to `Released`. **The edit is this
   stage's to make by its own definition; committing another stage's document is not covered by its
   standing grant, so it is put to the owner rather than taken.** §15.5's ordering held: the write
   comes **after** the push, where it can no longer expire a gate.
5. **The retrospective fires last** — the owner's standing rule (D45). **This stage does not spawn or
   route to it** and reports done instead.

**Nothing in this section is marked `NOT VERIFIED`.** Every artifact-side check was performed, and
serving state rests on the owner's attested mechanism, which is its terminal evidence.
