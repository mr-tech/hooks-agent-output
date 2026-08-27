---
ID: 014
Origin: 014
UUID: 4671e28c
Status: Superseded by 014-test-suite-cleanup-deployment.md — release executed 2026-08-27T05:19:56Z
Status-Detail: >-
  **Stage 1 only. Nothing was merged, switched, tagged or pushed.** Committed state recorded for
  plan 014 at `website` `f2c85f5` on `chain/014-test-suite-cleanup`, tree clean; `agent-output` at
  `99ea22f` at the start of this pass, tree clean. UAT **APPROVED FOR RELEASE** (conditional on
  post-deploy-observable rows), QA **QA Complete** with `Verified-At f2c85f5`. All six
  pre-release-observable register rows (BC-1…BC-6) carry terminal **EXECUTED** states with results —
  the Stage 1 blocking-checklist gate passes. Four post-deploy-observable rows (**BC-7/AC8**,
  **BC-7/row-19**, **BC-8**, **BC-9**) stand **OPEN** and are carried forward to the deployment
  record's Post-Release Status, where they gate chain closure and not the release act. Cross-repo
  reference check **PASSES**: `project-utils` specifier and resolved commit `749606d0` byte-identical
  at `a74b9e2` and `f2c85f5`, and `749606d0` is `project-utils` `master` at the remote. No version
  artefact exists in `website` (no `version` field, no CHANGELOG) — recorded as a positive finding,
  not an omission. **Measured topology finding for Stage 2**: `a74b9e2` is an ancestor of `f2c85f5`,
  so the release merge is a **fast-forward** and the assembled release tip **is** `f2c85f5` by
  identity — the same commit QA verified. Re-derive `master` at the remote at release time before
  relying on that. Two record items carried: **UAT-1** (duplicate BC-7 numbering) routed to qa;
  **UAT-2** (code-review `Status` stale) discharged by this pass's closure write.
Verified-At: "website f2c85f5c7e3ad03879845ae1116518dc71cf2077 (chain/014-test-suite-cleanup) — re-derived from the tree in this pass: `git -C website rev-parse HEAD` and `git -C website status --porcelain` written to a file and read directly (0 lines), never a piped count. agent-output at 99ea22f (`git -C agent-output status --porcelain` → 0 lines) before this document's own commit."
---

# Deployment Readiness — Plan 014: Hooks test-suite cleanup (pilot)

**Prepared**: 2026-08-27, by `devops-hooks-014`.
**Stage**: **Stage 1 — Plan Commit.** This is *not* the deployment record. **No merge, no branch
switch, no tag, no push, no publish was performed or attempted.**
**Model**: `deployment/closed/013-…-readiness.md` and `deployment/closed/012-…-readiness.md` — a
readiness artifact produced before the release act and superseded by the deployment record afterwards.

---

## 1. Handoff acknowledged

| Field | Value |
|---|---|
| Plan ID | **014** — `planning/014-test-suite-cleanup.md`, read at **revision 17** |
| Chain | Hooks test-suite cleanup (pilot) |
| Commissioning session | `steering-test-cleanup` → `devops-hooks-014`, 2026-08-27 |
| Code repo | `/usr/local/bin/hooks/website` |
| Chain branch | `chain/014-test-suite-cleanup`, created from `master` `a74b9e2` |
| Record repo | `/usr/local/bin/hooks/agent-output` |
| Target release | `website` `master` moved to the chain-014 merge SHA; `agent-output` moves alongside. **No version identifier** — the package carries no version artefact (§4). |
| UAT decision | **APPROVED FOR RELEASE**, conditional on the post-deploy-observable rows |
| Owner ruling in force | UAT approval buys a **local integration commit only — no push.** Stage 2 runs only on the owner's separate approval of the release, carried by steering. |

---

## 2. Predecessor gates — read, not cited

Each row below was read from the named document in this pass. **The named document is the authority
for its own class of facts; nothing here is re-litigated.**

| Gate | Document | Field read | Value | Verdict |
|---|---|---|---|---|
| UAT | `uat/014-test-suite-cleanup-uat.md` (`80efc84`) | Release Decision | **APPROVED FOR RELEASE**, conditional on the human click-through of BC-9 and BC-7/row-19 | **PASS** |
| UAT | same | `Status` | UAT Complete | **PASS** |
| QA | `qa/014-test-suite-cleanup-qa.md` | `Status` | **QA Complete** | **PASS** |
| QA | same | `Verified-At` | `f2c85f5c7e3ad03879845ae1116518dc71cf2077` (website, `chain/014-test-suite-cleanup`); agent-output at `e766b8c` | **PASS — SHA present** |
| QA | same, §Verdict | Final Status | **QA Complete** at `website` `f2c85f5`, plan rev 16 | **PASS** |
| Code review | `code-review/014-test-suite-cleanup-code-review.md` | Verdict | **APPROVED_WITH_COMMENTS**, all three findings CONFIRMED CLOSED | **PASS** |
| Code review | same | `Reviewed-At` | `e6163fd` (verdict reached at `988ca15`, moved by the round-1 fix sub-entry) | recorded |
| Plan | `planning/014-test-suite-cleanup.md` | `Status` / `Revision` | **UAT Approved** / rev **17** | **PASS** |

**Verdict freshness — carried forward, not gated here** (Stage 1 step 2a). QA's `Verified-At` is
`f2c85f5`, which is the chain branch tip *at this moment*, re-derived by this pass. A per-plan SHA is
expected to be superseded between commit and release; the binding freshness check is the
**release-tip verdict gate at Phase 2A**, and it is not run in Stage 1. §7 records what this pass
measured about that topology, as evidence for Stage 2 to re-derive — not as a Stage 2 ruling.

**UAT-2, discharged.** The code-review document's `Status` field read `In Review` against a settled
`APPROVED_WITH_COMMENTS` verdict. The verdict, not the field, was relied on here — as UAT also
recorded. The field is corrected by this pass's closure write (§9), with a dated changelog note in
that document preserving what it previously said and why relying on the verdict was defensible.

---

## 3. Blocking-condition register — Stage 1 gate (step 2b)

**One register.** Chain 014's single blocking-condition register is minted in
`qa/014-test-suite-cleanup-qa.md` ("BLOCKING RELEASE CONDITIONS — chain 014's register") and appended
to by that document's Phase 2 pass; `uat/…-uat.md` consumes it and appends its own state column.
**There is no second travelling list**, which this pass verified by reading both documents rather
than by accepting the sentence that says so.

**Every row is carried by name as well as number** — UAT-1 (§8) found two distinct rows both numbered
**BC-7**, and a downstream reader terminalising "BC-7" would close the wrong one.

### Pre-release-observable rows — these gate the commit

| Row (name and number) | Owner | State | Result |
|---|---|---|---|
| **BC-1** — pnpm layout intact across M2's install | implementer | **EXECUTED** | IS-1 did not fire; direct deps 79 → 79; one devDependency added (`jsdom ^30.0.1`); no `package-lock.json`. QA Phase 2, 2026-08-27 |
| **BC-2** — M0 baseline exists with per-case results **and** exit code | implementer | **EXECUTED** | `verification/014/baseline-a74b9e2.json` present at the named path (238.7K, confirmed by this pass); 617 baseline cases; exit code recorded. 2026-08-27 |
| **BC-3** — each M5 predicate seen firing on a planted control, control removed | implementer | **EXECUTED** | All 7 M5 steps run with planted-then-removed controls, `git diff` empty after each; step 6 controlled in both directions. Recorded in the implementation doc's M5 section; delta from the register that named it recorded by UAT. 2026-08-27 |
| **BC-4** — every evidence mutation restored | implementer | **EXECUTED** | IS-6 did not fire, proven chain-wide by diff; tree clean at `f2c85f5`, re-derived independently by this pass (§5). 2026-08-27 |
| **BC-5** — AC7 re-run at the end state, residue adjudicated | qa | **EXECUTED** | Sweep at `f2c85f5`: E2 12 → 0, E3a 3 → 0; rows 13/15 dispositioned with both limbs probed. One residue instance recorded (QA-4), non-blocking. 2026-08-27 |
| **BC-6** — `pnpm run typecheck` green at the merge SHA | implementer | **EXECUTED** | exit 0, **both** `tsc` programs, re-derived independently by QA Phase 2. 2026-08-27 |

**Gate result: PASS.** All six rows classified pre-release-observable carry a terminal **EXECUTED**
state with a result. No row is blank, NOT EXECUTED, or narrated without a state. A UAT document
exists and is APPROVED FOR RELEASE.

### Post-deploy-observable rows — these do NOT gate the release act

Carried forward verbatim to the deployment record's **Post-Release Status**, where they gate **chain
closure**. Their classification is the register's own; UAT checked it rather than accepting it, by
re-deriving the chain-wide diff (0 files changed under `src/` outside `__tests__/`), and **this pass
re-derived the same diff independently** (§4) and reaches the same result.

| Row (name and number) | Owner | State | Carried note |
|---|---|---|---|
| **BC-7/AC8** — the next chain's planner **cites** `agent-output/CLAUDE.md` | roadmap / next chain's planner | **OPEN** | Not decidable in chain 014. Earliest observation: the first planning document opened in this workspace after 014 releases. One citation closes it. |
| **BC-7/row-19** — persist-gate choice path stays unreachable through the UI | uat (primary: browser drive, no human needed) · fallback: **owner** | **OPEN — NOT EXECUTED** | No browser tooling in the UAT session. Out of charter (D2), fix not attempted. Handoff `handoff/newmessagemodal-persist-gate-choice-unreachable-2026-08-27.md` — **present, confirmed by this pass.** |
| **BC-8** — row 43's route-0 mount-effect init surface has no covering test | **owner** | **OPEN** | Handoff `handoff/message-init-cached-edits-lost-2026-08-27.md` — **present, confirmed by this pass.** Pin deleted under D2 with the handoff landing 156 s before the delete, ordering evidenced by commit time. |
| **BC-9** — toast-bearing surfaces actually show a transient notice | uat (primary: browser drive, no human needed) · fallback: **owner** | **OPEN — NOT EXECUTED** | No browser tooling in the UAT session. UAT declined to substitute a jsdom mount (circular — BC-9 exists because the mounted-tree instrument cannot see `react-toastify`) or a source read. |

**The owner's walkthrough is the fallback instrument for BC-9 and BC-7/row-19, not their owner.** A
dev server at `f2c85f5` is running at `localhost:3000`, left by UAT for that sitting. **It is the
owner's and was not touched by this pass.** Per UAT's own Next Actions, *a statement of the result
closes each row — no capture file is owed*, and none is recorded here as missing.

---

## 4. Release consistency (Core Responsibility 3)

**`website` carries no version artefact, so there is no version to check** — and none was synthesised.
Measured in this pass:

| Check | Command | Result |
|---|---|---|
| `version` field in `website/package.json` | `grep -n '"version"' website/package.json` | **no match** (exit 1) |
| CHANGELOG | `ls -d website/CHANGELOG.md` | **does not exist** |

This is recorded as a **positive finding, not an omission** — the plan records it as the reason it
defined no release-artifact milestone, and UAT reaches the same conclusion independently. The check
that applies instead is the **cross-repo dependency reference check**.

### Cross-repo dependency reference check — **PASS**

The defect this check exists to catch is a consumer left pinned to a stale branch. `website` consumes
`project-utils` as a git dependency (`github:hooks-gg/project-utils#master`, build output committed),
and the hazard of record in this workspace is that *the git-dep pin trails `#master` silently — the
lockfile SHA decides what a fresh install builds*.

| Reference | At `a74b9e2` (master) | At `f2c85f5` (chain tip) | Intended target | Verdict |
|---|---|---|---|---|
| `package.json` specifier | `github:hooks-gg/project-utils#master` (line 68) | `github:hooks-gg/project-utils#master` (line 68) | unchanged by this chain | **identical — PASS** |
| `pnpm-lock.yaml` importer version | `git+…#749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f` | same | unchanged by this chain | **identical — PASS** |
| `pnpm-lock.yaml` resolution commit | `{commit: 749606d0…, repo: git@github.com:hooks-gg/project-utils.git, type: git}` | same | unchanged by this chain | **identical — PASS** |
| `project-utils` `master` at the remote | — | — | `git -C project-utils ls-remote origin refs/heads/master` → **`749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f`** | **the pin names the branch tip — PASS** |
| `paracord` specifier | `github:mr-tech/paracord` | `github:mr-tech/paracord` | unchanged by this chain | **identical — PASS** |

The pin was read **at both SHAs from git object content** (`git show <sha>:package.json`,
`git show <sha>:pnpm-lock.yaml`), never from the working tree, and the remote was read with
`git ls-remote`, which computes at the remote and survives a stale tracking ref.

### What the chain changed, re-derived in this pass

`git -C website diff --numstat a74b9e2..f2c85f5`, written to a file and read directly:

- **76 files changed.**
- **5 are non-test**, all M2 harness configuration: `package.json` (+1/-0), `pnpm-lock.yaml`
  (+328/-7), `tsconfig.test.json` (+2/-1), `vitest.config.ts` (+25/-8), `vitest.setup.dom.ts` (+3/-0).
- **0 production files.** `git diff --numstat a74b9e2..f2c85f5 -- src bot` yields **nothing outside
  `__tests__/`**.
- The **only** `package.json` change is the addition of `"jsdom": "^30.0.1"` to `devDependencies`.
  The `project-utils` and `paracord` lines are untouched.

This independently reproduces UAT's and QA's finding, and it is the ground on which the four
post-deploy-observable rows are correctly classified as not movable by this merge.

---

## 5. Workspace and `.gitignore` review (Stage 1 step 5)

**Both trees are clean.** `git status --porcelain` was written to a file and counted with
`grep -c ''` — never a piped `wc -l`, which is unsound over filtered output in this workspace.

| Repo | Branch | HEAD | `--porcelain` lines |
|---|---|---|---|
| `website` | `chain/014-test-suite-cleanup` | `f2c85f5` | **0** |
| `agent-output` | `master` | `99ea22f` (before this document's commit) | **0** |

**No `.gitignore` change is proposed.** There is nothing untracked to classify in either repo.

Two notes recorded rather than acted on:

1. **`website/.gitignore` is untouched by this chain** — it is not among the five non-test files in
   the diff. Its `node_modules/` entry carries a **trailing slash**, so it matches directories only
   and leaves probe-rig `node_modules` **symlinks** visible as `??`. That visibility is the healthy
   state and the only passive signal that a rig has degenerated into a real directory; it is
   deliberately **not** "fixed" here.
2. **Chain 014's rigs carry no `node_modules` at all.** Checked directly with `ls -ld` across all
   seven directories under `verification/014/` — every one returns *No such file or directory*. The
   silence here is therefore **not** the degeneration signature the note above guards against: there
   is no symlink to have degenerated. `verification/014/.gitignore` scopes `analyst-rig/` to that
   analyst's own directory precisely so it cannot hide another session's work; it is already
   committed and needs no change.

---

## 6. Committed state recorded (Stage 1 step 6) — **no commit was needed in `website`**

The chain ran on its chain branch, which is the standard arrangement: the work was already committed
there by the implementer. This pass verified that **nothing in the plan's scope is uncommitted**
(§5, both trees at 0 porcelain lines) and records the branch and tip rather than creating a commit.

| Field | Value |
|---|---|
| Chain branch | `chain/014-test-suite-cleanup` |
| Tip SHA | **`f2c85f5c7e3ad03879845ae1116518dc71cf2077`** |
| Tip commit | `M5 finding, fixed: retitle the non-throwing embeds:{} case (row 15)`, committed 2026-08-27T03:54:58Z |
| Base | `master` `a74b9e268399663adfccf14816376de1b8eb41ac` |
| Record repo tip | `agent-output` `master` `99ea22f` at the start of this pass |

**No `git commit` was run in `website` by this pass. Nothing was pushed. Nothing was merged. The
tree was not switched.** The merge onto `master` and the switch back are **Stage 2's step, at release
only** — and the switch never runs over a dirty tree; a dirty tree at that point stops and routes to
steering/the owner.

### Workspace attribution

`.solo` is **absent in all four repositories** (`website`, `project-utils`,
`preview-image-generator`, `agent-output`), read at the start of this pass. Absence means **shared**:
an unplaceable branch or commit may be another chain's work, and any push described as shipping this
plan's work must be verified **by commits, never by a branch's name**. Nothing in this pass turned on
attributing an unplaceable ref — both trees were clean and every SHA cited was reproduced from git
object content. The marker relaxes no gate and was neither written nor altered.

---

## 7. Measured input for Stage 2 — recorded, not ruled

**These are measurements, not Phase 2A verdicts.** Phase 2A is not run in Stage 1, and every fact
below has a shelf life of minutes and **must be re-derived at release time**.

1. **The release merge is a fast-forward, and the assembled release tip is `f2c85f5` by identity.**
   `git -C website merge-base --is-ancestor a74b9e2 f2c85f5` → **true**;
   `git merge-base a74b9e2 f2c85f5` → **`a74b9e2`**. Measured 2026-08-27T04:5x UTC.
   `git -C website ls-remote origin refs/heads/master` → **`a74b9e268399663adfccf14816376de1b8eb41ac`**,
   read at the remote, not from a tracking ref.
   **Consequence, stated precisely and left for Phase 2A to rule on**: *if* `master` is still
   `a74b9e2` at release time, then the tip assembled by merging `chain/014-test-suite-cleanup` onto it
   is the **same commit** QA verified — not a successor of it — so the release-tip verdict gate would
   be satisfied **by identity** rather than by a fresh verification of a newly assembled tree. **This
   pass does not rule that gate satisfied.** The brief this pass received states that per-plan
   verdicts anchored to `f2c85f5` do not satisfy the release-tip gate; the topology measured here is
   offered as the mechanism to check that statement against, per the standing rule that where prose
   and an executable artifact disagree, the artifact is checked before the prose is doubted. **If
   `master` has moved when Stage 2 runs, the merge is no longer a fast-forward, the assembled tip is a
   new commit, and a release-scoped verification is owed** — captured under `agent-output/verification/`,
   since no CI runs tests in this workspace.
2. **Execution mode.** To be fixed at Phase 2A and stated in the Phase 2B summary. The mechanism is
   **not established by this pass** and must be re-derived per repository before the first ref moves:
   `agent-output/README.md` records that **the website serves from Vercel** (owner, 2026-08-23) and
   that the repo also carries a PM2 ecosystem config which is *not* the live path — so whether a push
   to `master` auto-deploys, and by what workflow, is a mechanism question for Phase 2C's
   re-derivation block, not something to infer from another repo or from a relayed remark.
3. **Serving refs.** Must be enumerated **from the repository itself** at release time, and read **at
   the remote** with `git ls-remote origin <ref>`, before any ref moves. This release touches
   `website` and `agent-output` only; `preview-image-generator` serves from its own `prod` ref and is
   not in this release.
4. **Suite state at the shipped tree.** QA measured 566/566 passed, 0 failed, **exit 0**, 51 files,
   and `pnpm run typecheck` exit 0 on **both** `tsc` programs, at `f2c85f5`. This pass did **not**
   re-run the suite — that is QA's instrument — and records the numbers as QA's, at QA's identity.
5. **Rollback.** Not established here. Phase 2C requires the rollback procedure to be run or
   dry-run and marked re-derived before the first ref moves; a rollback stated in prose and accepted
   as written is a **named risk**, not a default.

---

## 8. Outstanding record items

| Item | What | Owner | State after this pass |
|---|---|---|---|
| **UAT-1** | The single register carries **two distinct rows both numbered BC-7** — `BC-7/AC8` (Phase 1 register, `qa/…-qa.md` line 577) and `BC-7/row-19` (Phase 2 appended table, line 901). Independently reproduced by this pass: `grep -c "BC-7"` over the QA document → **5**, across two distinct conditions. | **qa** | **OPEN.** A record is corrected by its author with a dated reconcile note, never overwritten by a consumer — so this pass did **not** renumber QA's register. Every row in §3 and in the deployment record is carried **by name as well as number**, which neutralises the collision downstream. The QA document is moved to `qa/closed/` by §9; **a closed document is still corrected in place by its author**, and the move is not a bar to the reconcile note. |
| **UAT-2** | `code-review/…-code-review.md` `Status` read `In Review` against a settled `APPROVED_WITH_COMMENTS` verdict. | code-reviewer *or* devops at closure | **DISCHARGED** by §9's closure write, with a dated changelog note in that document recording what the field previously said. |
| **Roadmap** | Core Responsibility 1 requires the roadmap be read before deployment. **`agent-output/roadmap/` contains only `.gitkeep`** — read directly with `ls -a` in this pass. **The absence is recorded here, where the roadmap would have been cited, and this pass proceeds with reduced context.** No roadmap document is cited, because none was read. The release target is taken from the plan's own `Target Release` field instead. |

---

## 9. Document closure (Stage 1 step 8)

Executed after the committed state above was recorded. `Status` set to **Committed** and the document
moved to its stage's `closed/` folder:

| Document | New `Status` | Destination |
|---|---|---|
| `planning/014-test-suite-cleanup.md` | Committed for Release — website `master` → `f2c85f5` | `planning/closed/` |
| `implementation/014-test-suite-cleanup-implementation.md` | Committed | `implementation/closed/` |
| `code-review/014-test-suite-cleanup-code-review.md` | Committed | `code-review/closed/` |
| `qa/014-test-suite-cleanup-qa.md` | Committed | `qa/closed/` |
| `uat/014-test-suite-cleanup-uat.md` | Committed | `uat/closed/` |

**This document stays open** — it is superseded by the deployment record at Stage 2, and is kept
available for rollback reference until the release is stable.

---

## 10. Stage 1 verdict

**COMMITTED — Stage 1 complete. 1 of 1 plans committed for this release.**

Plan 014 is the only plan targeting this release. Every Stage 1 gate passes: UAT approved, QA
Complete with a SHA, all six pre-release-observable blocking rows terminal, release consistency
verified by the cross-repo reference check (no version artefact exists), both trees clean, committed
state recorded at `website` `f2c85f5`.

**Stage 2 is NOT authorised by anything in this document.** It runs only on the owner's separate
approval of the release, carried by steering.

## 11. Next actions

1. **steering / owner** — the owner's walkthrough of **BC-9** (both limbs) and **BC-7/row-19** against
   the dev server already running at `localhost:3000` at `f2c85f5`. A statement of the result closes
   each row; no capture file is owed. These gate **chain closure**, not the release act.
2. **owner** — release approval, if and when he wants it. Stage 2 then re-derives §7 from scratch.
3. **qa** — dated reconcile note for the duplicate **BC-7** (UAT-1), in `qa/closed/014-…-qa.md`.
4. **roadmap subagent** — plan 014 committed locally; the release tracker needs updating.
5. **retrospective** — not now. It fires after the chain's effort files are closed out, this record
   included, and it is not this agent's to invoke.

---

# §12 — Phase 2A / 2B / 2C, appended 2026-08-27 by `devops-hooks-014`

**Nothing above this line is rewritten.** Appended after the owner's release approval, relayed by
`steering-test-cleanup`. Every fact below was **re-derived in this pass at execution time**; nothing
is carried from §1–§11, which were written before the approval existed.

## 12.1 Authorisation

| Field | Value |
|---|---|
| Ruling | **"Approve the release now"** — the owner, 2026-08-27, by selection prompt |
| Scope as relayed | Approval of **the release itself (Stage 2)**, not merely of its plans: merge/fast-forward to `master`, push, deploy per the mechanism established here, rollback run or dry-run before the first ref moves |
| Carried by | `steering-test-cleanup` → `devops-hooks-014`, recorded in `agent-output/steering/014-rulings.md` |
| Received | 2026-08-27, this session |
| Standing constraints restated in the ruling | §7.1's identity finding is a **fact to re-check at execution time, not a ruling**; **preserve every `NOT VERIFIED` mark**; BC-9 / BC-7-row-19 walkthrough stays a **closure** condition queued to the owner; the dev server at `:3000` is **his**. |

This is the Phase 2B confirmation. It is recorded, not assumed, and it is the **only** authority under
which any ref moves in §12.5.

## 12.2 Phase 2A — release readiness, re-derived at execution time

| # | Check | Instrument | Result |
|---|---|---|---|
| 1 | All plans for the release Committed | `deployment/014-…-readiness.md` §10; plan `Status` | **1 of 1 — PASS.** Plan 014 is the only plan targeting this release |
| 2 | No plans pending | — | **none** |
| 3 | Remote `master`, read **at the remote** | `git -C website ls-remote origin` | `refs/heads/master` = **`a74b9e268399663adfccf14816376de1b8eb41ac`** — **unmoved** since §7.1 |
| 4 | Chain tip and tree | `git rev-parse HEAD`, `git status --porcelain` → file → `grep -c ''` | `f2c85f5c7e3ad03879845ae1116518dc71cf2077`, branch `chain/014-test-suite-cleanup`, **0 porcelain lines** |
| 5 | Assembled release tip (Phase 2A step 2a) | `git merge-base --is-ancestor a74b9e2 f2c85f5` → **true** | The merge is a **fast-forward**. The assembled tip is **`f2c85f5` itself** — not a new commit. **No scratch branch was needed and the shared branch was not moved to construct it.** |
| 6 | **Release-tip verdict gate (BLOCKING)** | see §12.3 | **PASS by identity** |
| 7 | Release consistency across all committed changes | §4, re-run this pass | **PASS** — specifier and lockfile commit `749606d0` byte-identical at `a74b9e2` and `f2c85f5`; `749606d0` is `project-utils` `master` at the remote; no version artefact anywhere, none synthesised |
| 8 | Packaging integrity | §12.4 | **PASS — `next build` exit 0 at the shipped commit** |
| 9 | Workspace clean, all plan commits present | `git status --porcelain` both repos | `website` **0**, `agent-output` **0** |
| 10 | Verified tree still reachable (step 7) | `git cat-file -e f2c85f5^{commit}`; `git branch --contains f2c85f5` | **exists**, contained by `chain/014-test-suite-cleanup`. No history was rewritten between verification and release |
| 11 | Serving refs on one line of history (step 10) | §12.4 | **PASS** |
| 12 | Execution mode | §12.4 | **Mode A — agent-executed** |

### 12.3 Release-tip verdict gate — **PASS, by identity, and the reasoning is given in full**

The brief this session received stated that per-plan verdicts anchored to `f2c85f5` do not satisfy the
release-tip gate. **The mechanism was checked rather than the prose**, and it says something different:

- `git merge-base --is-ancestor a74b9e2 f2c85f5` → **true**; `git merge-base a74b9e2 f2c85f5` → **`a74b9e2`**.
- `git ls-remote origin refs/heads/master` → **`a74b9e2`**, read at the remote at execution time.

Therefore the tip produced by merging `chain/014-test-suite-cleanup` onto `master` **is the commit
`f2c85f5`** — the very commit QA verified — and not a successor of it. The gate exists because
per-plan verdicts *predate the rebases and squashes that produced the tip*; here **no rebase or squash
produced the tip**, because the tip was not produced at all. A verdict against commit `X` is a verdict
against commit `X`.

**Release-tip verdict of record**: `qa/closed/014-test-suite-cleanup-qa.md`, **QA Complete**,
`Verified-At f2c85f5c7e3ad03879845ae1116518dc71cf2077`.

**And it was not left to rest on that argument alone.** Every gate the verdict asserts was
independently re-run **by this session, at the shipped tree**, before any ref moved:

| Gate | Command | Result | QA's figure |
|---|---|---|---|
| Suite | `npx vitest run --reporter=json --outputFile=…` | **566 total, 566 passed, 0 failed, `success: true`, process exit `0`, 51 `testResults` entries** | 566/566, exit 0, 51 files — **matches** |
| Type check | `pnpm run typecheck` (**both** `tsc` programs) | **exit `0`** | exit 0 both programs — **matches** |

Per the workspace convention, the **process exit code is recorded beside the counters** — a green pass
set is not a green run. `numTotalTestSuites` is **193** and is deliberately *not* compared against the
file count; the comparable quantity is `testResults` entries, which is **51**.

### 12.4 Phase 2C mechanism re-derivation — **run before the first ref moved**

Each line is marked **re-derived** with its instrument, or **accepted as written** — and a line
accepted as written is a **named risk**, not a default.

| Line | Status | Instrument / basis |
|---|---|---|
| **`website` deploy mechanism** | **RE-DERIVED** | **Vercel git integration on push to `master`.** From the repo itself: `ls -d .github/workflows` → *No such file or directory* (there is a `.github/` holding only `prompts/`), so **no workflow file deploys anything**; `vercel.json` exists and contains **only a `crons` entry**, i.e. configuration, not a trigger; `package.json` has **no deploy script** (`build` is `next build`). No PM2 `ecosystem.config.*` exists in `website` — **`agent-output/README.md`'s statement that the repo carries a PM2 ecosystem config does not hold at this tree**, which strengthens rather than weakens its conclusion that PM2 is not the live path. Owner's statement of record (README, 2026-08-23): *the website serves from Vercel*. |
| **The merge IS the deploy** | **RE-DERIVED** | There is no halfway step and nothing to publish: no registry, no artifact upload, no cutover between interchangeable refs. Moving `master` is the release act. |
| **`website` serving refs** | **RE-DERIVED** | Enumerated **from the repository at the remote**, not from any gate's count: `git ls-remote --heads origin` → `backup`, `external-message-api`, `master`, `redesign`, `regex-refactor`. Of these **`master` is the sole serving ref** (Vercel serves production from it). **With one serving ref no pair can split**, and the ordering check is satisfied trivially rather than vacuously ignored: the move is a fast-forward, so `master` after the move still contains `master` before it. |
| **`agent-output` is NOT pushed** | **RE-DERIVED** | `git rev-list --count origin/master..master` → **623**; `git reflog show origin/master` → a single entry, `fb99edd … update by push`, i.e. the init commit and nothing since. This matches the standing arrangement recorded in `deployment/closed/013-…-deployment.md` (measured 321 there). "`agent-output` moves alongside" means **its commits land locally**; the record repository is not pushed, and **pushing 623 commits of a private record repo is not part of this release and was not done.** |
| **Ordering constraints** | **RE-DERIVED** | One repo moves. `project-utils` is unchanged and its pin is unchanged, so there is **no cross-repo ordering constraint to honour**; `preview-image-generator` serves from its own `prod` ref and is not in this release. |
| **Rollback** | **ACCEPTED AS WRITTEN — NAMED RISK** | The mechanism is **Vercel promote of a previous deployment**, selected by the owner directly on 2026-08-25 (recorded in `deployment/closed/013-…-deployment.md` §8, where he was shown and declined *"revert the commit and push"*). **It could not be run or dry-run from here** — it is a dashboard action on a service outside this agent's reach, and this session may not act on the owner's behalf there. **The risk this names, restated because it matters more for 014 than it did for 013**: a promote **does not move `master`**, so git and serving state diverge by design and **the next ordinary push silently re-deploys this release**. It is not sticky. |
| **In-flight gates** | **NONE OWED** | No document in this chain names a check interleaved with the release's own steps — no baseline to capture mid-sequence, no probe between steps, no stop-point with an abort criterion. The four open register rows are **post-deploy-observable** and belong to Post-Release Status, not to the runbook. There is therefore no ordered runbook of gate rows to assemble beyond the command sequence in §12.5. |

### 12.4b Packaging integrity — verified, and the method is disclosed

**`next build` at the exact shipped commit: exit `0`.** Compiled successfully in 8.3 s; TypeScript
step passed; 9/9 static pages generated; page optimization finalized.

**How, and why not in the working tree.** The owner's dev server is **live on `:3000`** (`next-server`,
pid 4109180) and is his instrument for the BC-9 / row-19 walkthrough. A production `next build` writes
into the same `.next/` directory that server owns. Rather than risk his instrument, the build ran in an
**isolated `git worktree` detached at `f2c85f5`** — which is strictly better evidence than building the
working tree, because it builds *the commit being shipped* rather than a tree that could have moved.

Two rig failures were hit and are recorded because each looked exactly like a code failure and neither
was:

1. **Worktree under `/tmp` with a `node_modules` **symlink** → `TurbopackInternalError: Symlink
   node_modules is invalid, it points out of the filesystem root`, `BUILD_EXIT=1`, **no build
   performed.** The rig broke, not the artifact. Repaired by relocating the worktree to
   `/usr/local/bin/hooks/.rel-build-014` (the workspace root is not a git repository, so the rig is
   invisible to every repo's `git status`) and hardlinking `node_modules` with `cp -al` instead of
   symlinking.
2. **No `.env.local` in the rig** → `Invalid environment variables` for 24 keys at prerender of
   `/_not-found`, `BUILD_EXIT=1` — **after `✓ Compiled successfully`**. Again the rig, not the code.
   **The real `.env.local` was NOT copied and was not read**: it holds credentials, and its single
   selectable `DATABASE_URL` is the **remote hosted production database**. Instead a rig-local
   `.env.local` was written with dummy values, every network-bearing one pinned to **`127.0.0.1:1`** —
   a dead port, so nothing could reach production even had the build tried.

**What this does and does not establish.** It establishes that the shipped tree compiles, type-checks
and prerenders under the production build. It does **not** establish anything about the production
*environment's* values, which are Vercel's and were never in scope.

Both rigs were removed after use; `website`'s `--porcelain` was **0 lines** before and after.

### 12.4c `NOT VERIFIED` — the population, stated explicitly

**Nothing in this release is marked `NOT VERIFIED`,** and none was suppressed to reach that. The
population was enumerated rather than asserted empty: every artifact-side check this stage owes —
release-tip verdict, verdict freshness, suite, type check, build, release consistency, cross-repo
references, workspace cleanliness, reachability of the verified tree, serving-ref ordering — was
**performed in this session at the shipped commit**, and each is recorded above with its instrument
and result. The one item that could not be exercised is the **rollback mechanism**, which is recorded
as **accepted as written and named as a risk** — the disposition its own class calls for, not a
`NOT VERIFIED` mark, because it is a procedure held for a future failure rather than a check on this
artifact.

**Serving state is outside that population entirely** and is evidenced per the owner's attestation,
never by probing. No host-side confirmation is requested, required, or recorded as missing.

## 12.5 Release execution — **HALTED. The ref move was blocked by a permission control.**

**Status: NOT RELEASED. No ref moved, nothing was pushed, no tag was created, the tree was not
switched.**

### What was attempted

Mode A, act 1 and act 2 as a single sequence, in `/usr/local/bin/hooks/website`, after every gate in
§12.2–§12.4c had passed and with the owner's approval recorded at §12.1:

```
git status --porcelain                 # pre-move capture
git branch -f master f2c85f5           # fast-forward master to the verified tip
git checkout master                    # switch the tree back onto the shared branch
git status --porcelain                 # post-move capture, to be diffed against the pre-move one
git ls-remote origin refs/heads/master # confirm the remote is still unpushed
```

`git branch -f` was chosen over `git checkout master && git merge --ff-only …` deliberately, and the
reason is recorded because it is the safer of the two here: the tree currently holds `f2c85f5`, so
checking `master` out **first** would revert 76 files to `a74b9e2` and restore them a moment later,
and the owner's dev server on `:3000` — his BC-9 instrument — would recompile against the reverted
tree in that window. Moving the branch pointer first means **no file on disk changes at any point**.
The ancestry making this a fast-forward rather than a force was proven before the attempt (§12.2 row 5).

### What happened

**The Claude Code auto-mode classifier denied the action.** The denial is returned *instead of*
command output, so the shell never ran and no part of the sequence took effect.

**This was not retried, rephrased, split into smaller commands, or routed through another tool or
another session.** A control retried until it passes is not a control. `git checkout master &&
git merge --ff-only chain/014-test-suite-cleanup` reaches the identical end state and was **not**
attempted for exactly that reason.

**A follow-up read-only command — `rev-parse`, `status --porcelain` and `ls-remote`, to re-measure and
prove nothing had moved — was itself denied.** So the "nothing moved" statement above rests on the
denial's own semantics (the tool returns a refusal in place of execution), **not on a re-measurement**,
and it is recorded that way rather than as a verified fact. **The last measured state, taken minutes
earlier and recorded at §12.2, is**: `website` HEAD `f2c85f5` on `chain/014-test-suite-cleanup`,
local `master` `a74b9e2`, remote `master` `a74b9e2`, `--porcelain` 0 lines.

### This is a known, recorded pattern in this workspace — and it has a known remedy

This is the **third** instance of the same shape: the auto-mode classifier blocking in a devops
subagent what the main session performs without incident.

| Date | Session | Action | Outcome |
|---|---|---|---|
| 2026-08-23 | `devops-hooks-013` | post-push `git ls-remote` after-check | blocked; still `NOT VERIFIED` in `OPEN_QUESTIONS.md` |
| 2026-08-25 | `devops-hooks-013-2` | `git branch -f master 749606d && git checkout master` in `project-utils` | blocked; **the identical command, same repo, same tree, succeeded from the main session** once sanctioned |
| **2026-08-27** | **`devops-hooks-014`** | **`git branch -f master f2c85f5 && git checkout master` in `website`** | **blocked — this record** |

The remedy already established for instance 2, and recorded in the workspace hazards, is that
**a sanctioned block is performed by the steering thread and never handed back to the blocked agent.**
That is the disposition this instance routes to. **A subagent's denial is not evidence the action is
forbidden**, and it must not be allowed to turn into a reported impossibility.

### Nothing else is owed before the ref moves

Every artifact-side gate is green and re-measured at the shipped commit (§12.2, §12.3, §12.4b), the
mechanism is re-derived (§12.4), rollback is recorded as accepted-as-written with its risk named
(§12.4), the serving-ref ordering check passes (§12.4), and the owner's approval is recorded (§12.1).
**The only thing standing between this release and `master` is the permission control.**

### The exact sequence, for whoever executes it

```sh
cd /usr/local/bin/hooks/website
git status --porcelain                      # expect 0 lines; a dirty tree stops and routes to the owner
git rev-parse HEAD                          # expect f2c85f5c7e3ad03879845ae1116518dc71cf2077
git ls-remote origin refs/heads/master      # expect a74b9e268399663adfccf14816376de1b8eb41ac
                                            # if it is NOT a74b9e2, STOP — the fast-forward finding at
                                            # §12.3 has lapsed and a release-scoped verification is owed

git branch -f master f2c85f5                # fast-forward; ancestry proven at §12.2 row 5
git checkout master                         # the switch back; no file on disk changes
git status --porcelain                      # must still be 0 lines, byte-identical to the first capture

git push origin master                      # THE DEPLOY — Vercel git integration deploys on this push
git ls-remote origin refs/heads/master      # expect f2c85f5…
```

**No tag** — see §12.6. **Do not push `agent-output`** — §12.4 (623 commits ahead; the record repo is
not pushed, by standing arrangement).

## 12.6 On tagging — deliberately none, and this is a decision, not an omission

Mode A step 2 says to tag the release. **No tag is created here, and inventing one would be the
error.** Measured: `git tag --list` in `website` returns **0 tags** — the repository has never carried
one in its entire history, and chain 013's deployment record states the same conclusion for its own
release (*"These acts carry no tag"*).

The release identifier for this project is **the serving ref and the commit it moves to**:
`website` `master` `a74b9e2` → `f2c85f5`. Minting the first tag in a repo that has never used tags
would introduce an identifier the owner has not used, on this agent's initiative, at the release act.
If the owner wants a tagging convention, that is his to establish and it is not established by a
subagent doing it once.

There is likewise **nothing to publish**: no registry, no artifact upload. The branch move is the
release.
