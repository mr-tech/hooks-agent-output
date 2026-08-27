---
ID: 014
Origin: 014
UUID: 4671e28c
Status: Committed for Release — website `master` → `f2c85f5` (chain-014 merge), `agent-output` alongside
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
