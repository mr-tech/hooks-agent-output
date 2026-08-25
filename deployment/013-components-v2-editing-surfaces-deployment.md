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

