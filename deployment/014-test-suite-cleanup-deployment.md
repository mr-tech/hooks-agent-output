---
ID: 014
Origin: 014
UUID: 4671e28c
Status: Released
Status-Detail: >-
  **RELEASED 2026-08-27T05:19:56Z.** `website` serving ref `master` moved
  **`a74b9e2` → `f2c85f5`**, pushed by `steering-test-cleanup` (**Mode B — externally executed**;
  this stage ran no merge, checkout, tag or push: its own attempt was denied by a permission control
  and was **not** retried, rephrased, split or routed elsewhere). Fast-forward; the deployed commit
  **is** the QA-verified commit, so deployed and verified reconcile **by identity** and no diff is
  owed. No tag (the repo has never carried one); nothing published (no registry); `agent-output` not
  pushed (623 ahead of an origin still at the init commit — standing arrangement). All artifact-side
  gates were re-measured by this stage at the shipped commit before the act: suite 566/566 exit 0,
  typecheck exit 0 both programs, `next build` exit 0, cross-repo references identical four ways.
  **Serving state is UNSTATED — the owner has not yet said the site is serving it, and this stage did
  not and will not probe for it.** Four post-deploy-observable rows (**BC-7/AC8, BC-7/row-19, BC-8,
  BC-9**) remain **OPEN** and gate **chain closure**, not this release act.
Verified-At: "website f2c85f5c7e3ad03879845ae1116518dc71cf2077 — the QA-verified commit, the assembled release tip, and the commit now at `refs/heads/master`, all one and the same. agent-output at 8b2c1d3e95b2516e099ba78de4b98d5078157810 at the moment of writing (this record's own commit is its successor). **Reconcile note, 2026-08-27, same pass:** this field first read `agent-output at 5e9dfe4` — that SHA was never measured and was wrong; it is corrected here to the value re-derived with `git rev-parse HEAD^` against this record's own commit. Nothing depended on it, and no verdict, gate or release fact changes."
---

# Deployment Record — Plan 014: Hooks test-suite cleanup (pilot)

> **Authority for restated facts.** `uat/closed/014-test-suite-cleanup-uat.md` is the authority for
> **every blocking-condition state** in this document and `qa/closed/014-test-suite-cleanup-qa.md`
> for the QA verdict; **nothing here is re-litigated**, and both were **re-read at the moment of
> writing this record**, not carried from an earlier read in this session. The operator's completion
> report is the authority for what was executed.

## 1. Release metadata

| Field | Value |
|---|---|
| **Plan Reference** | `planning/closed/014-test-suite-cleanup.md` (read at rev 17) |
| **Release Identifier** | `website` serving ref `master`, **`a74b9e2` → `f2c85f5`**. There is no tag and no version string — §6. Plan 014 is the only plan in this release, so the identifier is not shared with another plan's record. |
| **Release Date** | **2026-08-27**, push completed **05:19:56 UTC** |
| **Execution Mode** | **Mode B — externally executed.** Operator: **`steering-test-cleanup`** |
| **Release type / environment** | Branch move to the sole serving ref; **production** |
| **Epic** | None registered — the plan records the owner-approved coordination plan as the source of the effort's outcome, and `agent-output/roadmap/` holds only `.gitkeep` (§8) |
| **Serving Ref at cutover** | `website` `master` — the **sole** serving ref (§4) |
| **Authorizer** | The **owner**, 2026-08-27, by selection prompt |

### Repositories and SHAs shipped

| Repo | Moved? | Ref | Before | After |
|---|---|---|---|---|
| **`website`** | **YES — this is the release** | `refs/heads/master` | `a74b9e268399663adfccf14816376de1b8eb41ac` | **`f2c85f5c7e3ad03879845ae1116518dc71cf2077`** |
| `agent-output` | no — **deliberately not pushed** | `refs/heads/master` | `fb99edd` at origin | unchanged at origin (local 623 ahead) |
| `project-utils` | no | — | pin unchanged at `749606d0` | unchanged |
| `preview-image-generator` | no — serves from its own `prod` ref, not in this release | — | — | — |

**This plan shipped in exactly one repository.** It is recorded explicitly rather than left implied.

## 2. Deployed vs verified — reconciliation, per repository

| Repo | Deployed ref | Commit at it | Verdict SHA | Same commit? | Diff owed? |
|---|---|---|---|---|---|
| `website` | `master` | `f2c85f5c7e3ad03879845ae1116518dc71cf2077` | `f2c85f5c7e3ad03879845ae1116518dc71cf2077` (`qa/closed/…-qa.md`, **QA Complete**) | **YES — identical** | **No.** They are the same commit, so there is no surface to diff and no window in which a green suite tested code nobody runs. |

**How the deployed commit was established, stated precisely.** The push was a **fast-forward**
(`a74b9e2` is an ancestor of `f2c85f5`, proven before the act), so the commit reaching `master` is the
chain tip unchanged. The evidence is the operator's verbatim push output —
`To github.com:hooks-gg/website.git  a74b9e2..f2c85f5  master -> master` — and the operator's
post-push `git ls-remote origin refs/heads/master` → `f2c85f5…`.

**One independent corroboration, and its provenance matters.** `git worktree list`, run by this stage
while removing its own build rig, printed `/usr/local/bin/hooks/website f2c85f5 [master]` — the main
tree on `master` at `f2c85f5`. That arrived as a **side effect of cleanup**, not from re-running the
read this session had blocked; **this stage did not re-probe `website`'s git state after the denial**,
and did not retry that read in another form.

**What this stage could NOT perform, marked as owed rather than as passed:**

| Check | State |
|---|---|
| This stage's own `rev-parse` / `ls-remote` re-derivation of the post-push refs | **NOT VERIFIED** — the confirming read was denied by the permission control (§5) and was **not retried in another form**. The reconciliation above therefore rests on the operator's verbatim report plus the incidental `worktree list` line, not on this stage's own re-measurement. |

## 3. Pre-Release Verification

All re-measured **by this stage at the shipped commit** before the act — none carried from the
predecessor documents that assert them. Full working at `deployment/014-…-readiness.md` §12.2–§12.4c.

| Gate | Result |
|---|---|
| **UAT approval** | **APPROVED FOR RELEASE**, conditional on the post-deploy-observable rows (`uat/closed/…-uat.md`, re-read at write time) |
| **QA approval** | **QA Complete** at `f2c85f5` (`qa/closed/…-qa.md`) |
| **Release-Tip Verdict** | `qa/closed/014-test-suite-cleanup-qa.md`, SHA **`f2c85f5c7e3ad03879845ae1116518dc71cf2077`**. **PASS by identity** — remote `master` was still `a74b9e2` at execution time, so the assembled tip *was* `f2c85f5`, the commit QA verified, not a successor produced by any rebase or squash |
| **Suite, re-run here** | **566 total / 566 passed / 0 failed**, `success: true`, **process exit 0**, 51 `testResults` entries. Exit code recorded beside the counters — a green pass set is not a green run |
| **Type check, re-run here** | `pnpm run typecheck` **exit 0**, **both** `tsc` programs |
| **Packaging integrity** | **`next build` exit 0** at `f2c85f5`, in an isolated worktree (the owner's dev server owns `.next/`). Compiled in 8.3 s; TypeScript step passed; 9/9 static pages generated. The real `.env.local` was **never read or copied** — rig-local dummy env, every host pinned to `127.0.0.1:1` |
| **Release consistency** | No `version` field and no CHANGELOG anywhere — none synthesised. Cross-repo reference check **PASSES**: `project-utils` specifier and lockfile resolved commit `749606d0` byte-identical at `a74b9e2` and `f2c85f5`, and `749606d0` is that repo's `master` at the remote |
| **Gitignore review** | No change proposed; nothing untracked in either repo. `website/.gitignore` untouched by the chain — its trailing-slash `node_modules/` entry deliberately left alone (it is the passive signal that a probe rig has degenerated) |
| **Workspace cleanliness** | `--porcelain` **0 lines** in both repos before the act; operator captured **0 before and 0 after** the ref move |
| **Blocking-condition register** | BC-1…BC-6 (pre-release-observable) all terminal **EXECUTED** with evidence and date |

## 4. Deploy mechanism and serving refs — re-derived from the repo before the first ref moved

- **Mechanism: Vercel git integration on push to `master`.** `ls -d .github/workflows` → *No such file
  or directory*; `vercel.json` contains **only a `crons` entry** (configuration, not a trigger);
  `package.json` has no deploy script. **No PM2 `ecosystem.config.*` exists in `website`** — the
  README's statement that the repo carries one **does not hold at this tree**, which strengthens
  rather than weakens its conclusion that PM2 is not the live path.
- **The merge IS the deploy.** No halfway step, no cutover between interchangeable refs, nothing to
  publish.
- **Serving refs, enumerated from the repository at the remote** (`git ls-remote --heads origin`):
  `backup`, `external-message-api`, `master`, `redesign`, `regex-refactor`. **`master` is the sole
  serving ref**, so no pair can split; and the move was a fast-forward, so `master` after contains
  `master` before.

## 5. Release Execution

**Mode B — externally executed. This stage ran no merge, checkout, branch move, tag or push.**

**Why Mode B.** This stage's own attempt at the sequence was **denied by the Claude Code auto-mode
classifier** before anything ran. It was **not** retried, rephrased, split into smaller commands, or
routed through another tool or session — including the equivalent
`git checkout master && git merge --ff-only …`, which reaches the identical end state and was
deliberately not attempted. The block was reported to the owner as a blocking selection prompt with a
real "don't release now" option; he chose **"Steering executes it."** **Third instance of this shape
in this workspace** (013's post-push `ls-remote`; 013's `git branch -f` in `project-utils`, which then
succeeded verbatim from the main session once sanctioned).

**Operator's completion report, recorded verbatim in substance.**

> Operator: `steering-test-cleanup`. Sanction acted on: **the owner's words in that session, by
> selection — *"Go ahead and try. I approve it."*** The operator states explicitly that the relayed
> ruling was **not** the authority it acted on, and that **its own first attempt at the identical
> sequence was also classifier-blocked before anything ran**; the owner then sanctioned a retry, which
> ran **once, unchanged**.

Commands run, in `/usr/local/bin/hooks/website`:

```sh
# pre-checks (separate earlier invocation)
git status --porcelain > /tmp/rel-status.txt          # 0 lines
git rev-parse HEAD                                    # f2c85f5c7e3ad03879845ae1116518dc71cf2077
git rev-parse --abbrev-ref HEAD                       # chain/014-test-suite-cleanup
git ls-remote origin refs/heads/master                # a74b9e268399663adfccf14816376de1b8eb41ac

# release (one invocation)
git status --porcelain > /tmp/rel-p1.txt && git branch -f master f2c85f5 && git checkout master \
  && git status --porcelain > /tmp/rel-p2.txt && git rev-parse HEAD master && date -u \
  && git push origin master > /tmp/rel-push.txt 2>&1; date -u; git ls-remote origin refs/heads/master
```

| Item | Value |
|---|---|
| Push started / completed | **2026-08-27T05:19:54Z** / **2026-08-27T05:19:56Z**, exit **0** |
| Push output | `To github.com:hooks-gg/website.git  a74b9e2..f2c85f5  master -> master` |
| `ls-remote` after | `f2c85f5c7e3ad03879845ae1116518dc71cf2077  refs/heads/master` |
| Porcelain before / after | **0 lines / 0 lines** (`grep -c ''`, not a piped `wc -l`) |
| Deviations from §12.5 | **None**, except capturing outputs to `/tmp` files |
| Tag | **none created** |
| `agent-output` | **not pushed** |
| Surprises | None. `checkout` reported *"ahead of 'origin/master' by 40 commits"* pre-push, consistent with the chain |

**The tree switch back onto the shared branch happened as part of this act** and over a clean tree, as
required — 0 porcelain lines both before and after.

### Independent verification by this stage

| Check | Result |
|---|---|
| Deployed commit == verdict SHA | **PASS by identity** (§2) |
| Consumers resolving | **PASS** — `project-utils` pin unchanged at `749606d0` and unmoved by this release; no consumer needed to re-resolve |
| Assets reachable | **N/A** — nothing was published; no registry, no artifact upload |
| This stage's own post-push ref re-derivation | **NOT VERIFIED** (§2) — read blocked, not retried |
| **Serving state** | **UNSTATED — see §7.** Not probed, not inferred, and **not** marked NOT VERIFIED: serving state is outside the artifact-side population |

## 6. On tagging and publishing — deliberately none

`git tag --list` in `website` returns **0 tags**; the repository has never carried one, and chain 013's
record reached the same conclusion for its own release. **The release identifier is the serving ref and
the commit it moved to.** Minting the first tag in the repo's history, at a release act, on an agent's
initiative, would introduce an identifier the owner has not used — that is his to establish. There is
likewise **no registry and nothing to publish**; a publish step was not invented to satisfy a checklist.

## 7. Post-Release Status

**Status: RELEASED** — `website` `master` at `f2c85f5` as of **2026-08-27T05:19:56Z**.

**Serving state: UNSTATED, and this is an open question for the owner — not a gap and not a defect.**
The push to the production ref is recorded above with its timestamp and output. What is not yet on
record is the owner's statement that the site is serving it. This stage **did not probe** for it — no
Vercel dashboard, no serving-ref probe, no process listing, no host-side check — and **hands the owner
no confirmation steps to run**. When he states it, that statement **is** the evidence and closes this
line; it is not a weaker substitute for anything.

### Open blocking conditions — carried by **name as well as number** (UAT-1)

**Re-read from `uat/closed/014-test-suite-cleanup-uat.md` at the moment of writing.** All four are
**post-deploy-observable**: they gate **chain closure**, and none could be moved by this release, which
changed **0 files under `src/` outside `__tests__/`**.

| Row (name and number) | Owner | State | What closes it |
|---|---|---|---|
| **BC-7/AC8** — the next chain's planner **cites** `agent-output/CLAUDE.md` | roadmap / next chain's planner | **OPEN** | Now decidable: 014 has released. The first planning document opened in this workspace after this release. **One citation closes it** |
| **BC-7/row-19** — persist-gate choice path stays unreachable through the UI | uat (primary: browser drive) · fallback: **owner** | **OPEN — NOT EXECUTED** | Trip `gateBeforePersist.mustAsk` in `NewMessageModal`, press Save; expect Save disabled before any choice prompt |
| **BC-8** — row 43's route-0 mount-effect init surface has no covering test | **owner** | **OPEN** | Handoff `handoff/message-init-cached-edits-lost-2026-08-27.md` |
| **BC-9** — toast-bearing surfaces actually show a transient notice | uat (primary: browser drive) · fallback: **owner** | **OPEN — NOT EXECUTED** | Drive a code-fetch error and an in-flight save in a running build; **look** for a visible toast in both |

**A statement of the result closes BC-9 and BC-7/row-19 — no capture file is owed**, and none is
recorded here as missing. The dev server UAT left at `localhost:3000` (at `f2c85f5`, now also
`master`) is the owner's instrument for that sitting and was **not touched** by this stage.

### Known issues

- **UAT-1 — the register carries two distinct rows both numbered BC-7.** Reproduced independently
  (`grep -c "BC-7"` → 5, two distinct conditions). **Not renumbered by this stage** — a record is
  corrected by its author. **Still owed: a dated reconcile note by qa** in `qa/closed/…-qa.md`.
- **UAT-2 — DISCHARGED** at Stage 1 closure: the code review's stale `In Review` field was replaced,
  with a dated note preserving what it said.
- **AC2's end-to-end replay does not exist**; per-transition chain of custody stands in its place.
  Routed to the retrospective as the chain's stated Assumption Not Checked.
- **Toast rendering has no automated coverage by design** (BC-9), and row 19's persist-gate path is a
  product gap out of charter (D2).
- **`agent-output` is 623 commits ahead of an origin still at the init commit.** Recorded as the
  standing arrangement, not as drift.

### Rollback plan — **ACCEPTED AS WRITTEN, and therefore a named risk**

**Mechanism: Vercel promote of a previous deployment** — the owner's own direct selection on
2026-08-25, where he was shown and declined *"revert the commit and push"*.

**It could not be run or dry-run from here**: it is a dashboard action on a service outside this
agent's reach. It is therefore **accepted as written and named as a risk**, not marked verified.

**What it does and does not do**, restated because it matters more here than it did for 013:

- It **reverts the served code**. `website` is one Vercel deployment.
- It **does not move `master`**, which stays at `f2c85f5`. Git and serving state diverge by design, and
  **the next ordinary push silently re-deploys this release. It is not sticky.**
- It **does not roll back the database** — but nothing in this release writes to one: **0 production
  files changed**.

**Practical note on this particular release**: rolling it back would restore `a74b9e2`, whose only
difference is the test suite and harness config. The user-visible product is byte-identical either way.

## 8. Roadmap

**`agent-output/roadmap/` holds only `.gitkeep`** — read directly with `ls -a`. The absence is recorded
**here, where a roadmap citation would have gone**, and this record proceeds with reduced context.
**No roadmap document is cited, because none was read.** The release target came from the plan's own
`Target Release` field.

## 9. Deployment History Entry

```json
{
  "plan_id": "014",
  "plan": "Hooks test-suite cleanup (pilot)",
  "release_identifier": "website master a74b9e2 -> f2c85f5",
  "release_date": "2026-08-27",
  "push_completed_utc": "2026-08-27T05:19:56Z",
  "execution_mode": "externally-executed",
  "operator": "steering-test-cleanup",
  "authorizer": "owner (selection prompt, 2026-08-27)",
  "environment": "production",
  "serving_ref": "refs/heads/master",
  "serving_ref_count": 1,
  "repositories": {
    "website": { "moved": true,  "ref": "refs/heads/master", "before": "a74b9e268399663adfccf14816376de1b8eb41ac", "after": "f2c85f5c7e3ad03879845ae1116518dc71cf2077", "fast_forward": true },
    "agent-output": { "moved": false, "reason": "record repo is not pushed; 623 ahead of origin at init commit" },
    "project-utils": { "moved": false, "pin": "749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f" }
  },
  "release_tip_verdict": { "document": "qa/closed/014-test-suite-cleanup-qa.md", "sha": "f2c85f5c7e3ad03879845ae1116518dc71cf2077", "basis": "identity — the assembled tip is the verified commit" },
  "deployed_equals_verified": true,
  "diff_owed": false,
  "gates": { "suite": "566/566 exit 0, 51 files", "typecheck": "exit 0, both tsc programs", "build": "next build exit 0", "cross_repo_references": "PASS", "workspace": "porcelain 0 both repos" },
  "tag": null,
  "published": null,
  "version_artifact": null,
  "serving_state": "unstated — owner has not attested; not probed by this stage",
  "not_verified": ["this stage's own post-push ref re-derivation (read blocked by a permission control; not retried in another form)"],
  "rollback_mechanism": "vercel-promote (accepted as written; does not move master; not sticky)",
  "open_conditions": ["BC-7/AC8", "BC-7/row-19", "BC-8", "BC-9"],
  "included_plans": ["014"]
}
```

## 10. Next Actions

1. **Owner** — state whether the site is serving `f2c85f5`. His statement is the evidence and closes
   §7's serving-state line. **Nothing is being asked of him host-side.**
2. **Owner** — the **BC-9** and **BC-7/row-19** walkthrough at `localhost:3000`. A statement of the
   result closes each row; no capture file is owed. These gate **chain closure**.
3. **roadmap subagent** — release complete; update the release tracker.
4. **qa** — dated reconcile note for **UAT-1** in `qa/closed/014-test-suite-cleanup-qa.md`.
5. **retrospective** — after the chain's effort files are closed out, **this record included**.
   Closing this record is the chain's last act, and the retrospective is not this agent's to invoke.
   It carries, among the items UAT routed: AC2's mapping audit; the
   instrument-contradicts-criterion class; register ID minting across multi-pass documents (UAT-1);
   AC8/BC-7 as the pilot's answer to D1; and — added here — **the classifier-blocks-devops-subagent
   class, now at three instances**, which cost this release a hand-off and a round trip.
