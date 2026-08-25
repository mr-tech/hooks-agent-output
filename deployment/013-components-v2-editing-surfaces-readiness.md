---
ID: 013
Origin: 013
UUID: 22d69e06
Parent: components-v2-editing-support-2026-08-23.md
Status: Active
Status-Detail: >-
  Readiness assessment only, prepared 2026-08-24 while the chain is still open (M4 in its MED-6 fix
  round, M6 unstarted, QA Phase 2 owed, code review `In Review`, no UAT verdict). **This is not the
  deployment record**, which R-5 governs and which is not written. **Nothing was assembled, no tree
  was switched, nothing was pushed.** Verdict: **NO-GO for release today**, on chain state, not on
  any artifact defect — every artifact-side gate reachable now passes. Six findings below; the
  three that would surprise at the release act are the **rollback mechanism** (as stated in the plan
  it is a force-push, which is nobody's to run on their own initiative), **BC-13's timestamp** (a
  devops-owned register row whose instrument is a number the release act must capture and currently
  nothing schedules), and **three release conditions hostage to owner actions nothing sequences
  against the chain**. **Reconciled 2026-08-25 at the settled tip `a151fb4` (§10, appended — nothing
  above it rewritten): every artifact-side gate now passes *measured at the shipped tree*, and the
  build was re-earned because the delta from the assessed point was **not** test-only as briefed.
  Verdict still **NO-GO**, now solely on the twelve non-terminal `PRE` rows and U-C5. One new
  finding: **F-8**, Appendix B names a superseded tip.
  **U-C6 is devops's and discharges at Stage 1 step 8.**
  **§12 appended 2026-08-25 by `devops-hooks-013-2` — nothing above it rewritten.** Phase 2A is
  **complete for a `4a7126b` cut**: every artifact-side gate re-measured in-session at that exact
  commit (577/577 exit 0, build exit 0, porcelain 0, no config drift, fast-forward by identity), and
  the **cross-repo reference check the re-run was left owing is re-run and PASSES four ways** at
  `749606d0`. Execution mode **A** on the mechanism; **B** if he pushes it. Verdict still **NO-GO on
  the register** — **fourteen `PRE` rows non-terminal**, three of which (BC-18, BC-19a, BC-19b) are the
  only instrument covering half the production surface. **U-C7 discharged** by the record at
  `e34df07`. **The Phase 2B release summary is written and presented; no approval is given, requested
  or recorded, and no push approval exists anywhere in this chain.** Nothing was moved, switched or
  pushed.
  **Struck 2026-08-25 under D44** (plan rev 39, commit `13a6e66`) by `steering-hooks-013-2 [019315]`
  acting on the owner's direct ruling rather than by the devops session that owns this document:
  the material D44 strikes is removed throughout and every item that depended on it is **dropped**,
  not re-argued and not re-based. **No verdict, gate, approval or release state is changed by that
  edit.**
---

# Deployment Readiness — Plan 013: Components V2 across the editing surfaces

**Prepared**: 2026-08-24, by `devops-hooks-013`.
**Model**: chain 012's `deployment/012-message-valid-field-readiness.md` — a readiness artifact
produced before the release act and superseded by the deployment record afterwards.

## 0. What this document is, and what it is not

| | |
|---|---|
| **Is** | A readiness assessment. What the release act for 013 actually consists of, what is verified today, and what would block or surprise when the moment comes. |
| **Is not** | The deployment record. That artifact is governed by plan condition **R-5**, which is known incomplete as rev 17 states it and which the owner has not widened. It is not written, not drafted, and not begun here. |
| **Not done** | No release tip assembled. No merge. No tree switch. No tag. No push. No Stage 1 commit — Stage 1 is not open, because there is no UAT verdict. |

**Timing.** This runs before UAT deliberately. The owner's ordering places the **release act** after
UAT; preparing for it beforehand is what makes the release moment a decision rather than a
discovery, and it is the reason chain 012 produced a readiness document (**prepared 21:30 UTC**)
half an hour ahead of its deployment record (**released 21:58 UTC**).

**Disclosed, because an undisclosed one is indistinguishable from a workaround**: this document
fails `tools/check-repo.js` — *"no recognised stage suffix for 'deployment/'"* — and I have not made
it pass. The validator accepts a basename ending in `-deployment`, and any scope after that must
name a subdivision the plan defines (`m4`, `wp2`); **`readiness` is neither, and no available name
both passes and stays honest.** `-deployment` alone is the deployment record's name and must not be
taken by an artifact that is not it. `deployment/012-message-valid-field-readiness.md` carries the
identical failure and stands in the repo, so this is a **gap in the tooling's model — it has no
readiness artifact — not a defect in this document**, and I have kept 012's name rather than coin a
convention to satisfy a validator that already exits 1 on twelve other counts. Routed to steering,
who owns `INBOX.md`. **Nothing else in the run's output fails it.**

## 1. Where the chain actually stands — why this is NO-GO

Read from each owning document at write time, not from any summary:

| Gate | Document | State today |
|---|---|---|
| Plan | `planning/013-…` | `Approved` |
| Implementation | `implementation/013-…` | `Active` — M4 in its MED-6 fix round; **M6 unstarted** |
| Code review | `code-review/013-…` | `In Review`; binding round 18 at `4e9da96` |
| QA | `qa/013-…` | **`Awaiting Implementation`** — Phase 1 issues no verdict and **claims no `Verified-At` SHA**; Phase 2 owed |
| UAT | `uat/013-…` | `Active` — **the UAT gate itself is unstarted**; no release decision exists |

**No Stage 1 gate is satisfiable today.** Stage 1 step 2 needs UAT `APPROVED FOR RELEASE` and QA
`QA Complete`; neither exists. Step 2a needs a QA `Verified-At: <sha>`; QA states one is owed at
Phase 2 and not owed now. Step 2b needs every **observable-pre-release** row in the chain's single
blocking-condition register terminal; **BC-11b (the ask) stands `NOT EXECUTED` and non-terminal**,
and BC-1…BC-10 are *Not started* because they need the chain tip.

The register is UAT's document for row **state** and QA's for row **definitions**; both were read
directly for this section.

## 2. The release act for 013, established today

**One repository, one serving ref, one step.** This is the whole of it:

```
git push origin <release-tip-sha>:refs/heads/master        # in website/
```

There is no second component. Established, each from the artifact rather than from 012's shape:

- **`project-utils` is not in this release.** 013's diff `c85945f..4e9da96` touches `website` only;
  the plan says *"nothing in `project-utils`"* and the tree agrees. No push, no pin refresh.
- **No DDL, no backfill, no data migration** (plan condition 7).
- **No registry publish** — `website/package.json` carries **no `version` field** (`grep -c '"version"'`
  → **0**, counted inside grep) and there is **no CHANGELOG**. Confirmed at the tree today; the plan
  read the same on 2026-08-23. No artifact milestone exists and none is synthesised.
- **No tag.** `git tag` → empty and `git ls-remote --tags origin` → empty: **this project has never
  tagged a release, local or remote.** The release identifier is therefore the serving ref and its
  commit — `website master @ <sha>` — exactly as the plan says devops names it. Phase 2C's tag step
  has no mechanism here and inventing one would be a new convention, not a release.

**Consequence worth stating plainly: the single fact that governed 012's entire release is benign
for 013.** *Push auto-deploys*, so merge and deploy are the same instant and there is no window
between them. For 012 that was decisive — the release order had five components and an owner-run DDL
first, so a push into that window meant every message save failing. **013's release order has one
component**, so the absence of a window costs nothing.

## 3. Verified today, at the tree — not inherited

Chain branch `chain/013-components-v2-editing-surfaces`, tip **`4e9da96`**; base and `master` both
`c85945f`.

| Check | Instrument | Result |
|---|---|---|
| **Packaging integrity** | `pnpm build` at `4e9da96` | **PASS — exit 0**, compiled in 8.6s, TypeScript pass, full route table emitted |
| **Serving-ref ordering** | `git ls-remote origin refs/heads/master` | `origin/master` = `master` = **`c85945f`** — one serving ref, so the pairwise containment condition is vacuous |
| **Integration shape** | `git merge-base --is-ancestor master HEAD` | **ancestor** → the release is a **fast-forward**; no split history |
| **Cross-repo reference** | four independent reads | **PASS, three-way agreement** (below) |
| **Lockfile drift** | `git diff --numstat c85945f HEAD -- pnpm-lock.yaml` | **empty** — untouched |
| **`package.json` delta** | `git diff c85945f HEAD -- package.json` | **+1 line, one `typecheck` script.** No dependency change, so the untouched lockfile is correct and not an omission |
| **Deploy-config drift** | `git diff --numstat c85945f HEAD -- vercel.json .gitignore tsconfig.json` | **empty** — including the `tsconfig.json` `"exclude": ["node_modules", "**/__tests__"]` entry, which is load-bearing for the Vercel build and must not be tidied |
| **Neutral to CRITICAL-1** | `git diff --numstat … -- src/middleware.ts src/pages/api/v1 src/app/api/v1` | **empty** — 013 neither introduces nor fixes the inert-guard finding; the release is neutral to it |
| **Workspace** | `git status --porcelain`, both repos | `website`: one untracked file (QA's probe). `agent-output`: fourteen `??` entries and one modified file, all other sessions' — see finding **F-4**, they are not drift |
| **Tree ownership** | `ls -d <repo>/.solo` | **absent in both** → shared tree throughout. I staged nothing, committed no source, switched no branch |

**Cross-repo reference check** (Core Responsibility 3 — no `version` field anywhere, so this is the
whole of the check, not a fallback for one):

| Source | Value |
|---|---|
| `package.json` specifier | `github:hooks-gg/project-utils#master` |
| `pnpm-lock.yaml` resolution | `749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f` |
| Installed copy (`readlink -f`) | `…project-utils@…749606d…` |
| **Remote `master`, read today over SSH** | **`749606d…`** |

The standing hazard is that a `#master` specifier trails silently and the lockfile SHA decides what a
fresh install builds. **It has no member today**: the remote has not moved since 012's release, so
the pin, the lockfile, the installed copy and the remote all name the same commit. This is the
defect the check exists to catch and it is absent.

## 4. The release-tip verdict — available by identity, and cheap to lose

`origin/master` is an ancestor of the chain tip, so integration is a **fast-forward** and the
assembled tip will be **byte-identical to the chain tip**. Whatever SHA QA Phase 2 and the final code
review anchor to therefore **is** the release tip — the gate is satisfied by identity, and no
per-plan verdict is ever substituted for a release-tip verdict.

**Two conditions preserve that, and both can be lost by accident:**

1. **Nothing lands on `master` before the release.** It is `c85945f` today and has been since 012.
2. **No commit lands on the chain branch after the verdict.** M6 has not landed, so the tip *will*
   move at least once more. **Every post-verdict commit costs a re-verification** — QA's Phase 2
   `Verified-At` and the final review round must anchor to the tip that is actually pushed, and a
   late fix round after either one silently invalidates the identity argument. This is the same
   family as the recorded hazard that a gate result from the working tree is not a result about the
   commit.

Doc-only commits in `agent-output` do not affect this; only `website` commits do.

## 5. What would block or surprise at the release act

### F-1 — BC-13 is a devops-owned register row whose instrument is a number nothing currently captures

`BC-13` (QA's register, row definition): *M3-b's pre-deploy-code residue — bot codes stored before
go-live carry no dropped set, so the notice cannot render for them.* Instrument: **elapsed time
against the store's 1h TTL**. Subject: **no human — decided by the clock.** Earliest decidable: **one
hour after the deploy SHA is live.** Terminal when the residue is empty. **Owner: devops, recording
the window in the deployment record.**

TTL re-derived at the tip rather than inherited: `src/utils/redis/messageStore.ts` sets
`HOUR_IN_SECONDS = 60 * 60` and applies it via `client.expire` on both keys. The bound is sound even
where a code is re-read, because no entry stored before go-live can outlive one hour from its own
store time.

**The problem is that BC-13 consumes a timestamp — go-live — that no step currently produces.** A
row consuming a number no earlier row captures is unexecutable, and resolving that belongs before the
cutover, not at the console. It also cannot be resolved by looking: serving state is evidenced by the
owner's word, never by probing a host, so there is no go-live clock for me to read.

**The construction that works, offered so the release act does not have to invent one:** take the
owner's deploy attestation and its timestamp as the deploy evidence, as governance requires, and use
**that timestamp as a conservative upper bound for go-live** — the deploy cannot have gone live after
he said it had. **BC-13 is then terminal one hour after his attestation timestamp**, with no probe,
no host-side step and no inference from the working machine. The runbook must therefore carry the
attestation-capture row *before* the row that closes BC-13.

### F-2 — Rollback as the plan states it is a force-push, and nobody may run one on their own initiative

Plan condition 7: *"rollback is the serving ref moving back to `c85945f`."* Because the release is a
fast-forward, `master` will be strictly ahead of `c85945f` — so **moving it back is a
non-fast-forward push.** Under the standing rule, `push --force` rewrites history under other
sessions, is never run on anyone's own initiative, and is proposed rather than performed.

Three candidate mechanisms exist and **the plan chooses none**:

| Mechanism | Git ref | Serving state | Cost |
|---|---|---|---|
| Force-push `master` back to `c85945f` | returns to `c85945f` | redeploys `c85945f` | history rewrite; single-owner; never on initiative |
| Vercel dashboard rollback to the previous production deployment | **unchanged — stays at the 013 tip** | returns to `c85945f`'s build | git and serving state **diverge**, and the next ordinary push re-deploys 013 |
| A revert commit on `master` | moves **forward** | returns to `c85945f`'s behaviour | consistent and forward-only, but "rollback to `c85945f`" is then true of behaviour, not of the SHA |

None is wrong; **choosing at the console is what is wrong**, and the second silently leaves the repo
claiming a state it is not serving. This is the class 012's release act turned on — a mechanism
question that reads as settled in the plan and is not.

The reassuring half is real and worth keeping next to it: the plan's rollback *consequences* check
out — single repo, no schema, no data migration, nothing in `project-utils`, and records written by
the fixed surfaces between deploy and rollback are ordinary valid records that survive it unharmed.

### F-3 — A release condition is hostage to an owner action that nothing sequences against the chain

The shape: an action outside the chain that leaves the criterion's *wording* intact and moves what it
*measures*.

**Validation item 8 — the D19 repair.** M8-G's production-reachable observation exists **only while
5712 and 5842 are unrepaired.** The repair is the owner's, outside the plan; the observation is 013's
UAT, inside it. He has not repaired, so the observation is still available **today**. If
the repair runs first, the population is empty and the central new behaviour D18 introduces ships on
suite evidence alone — permanently, and the deployment record must then say M8-G was not observed in
production **for that reason**. What the plan forbids is the two being ordered by accident, which is
exactly what an unscheduled repair produces.

**Two further items stood in this finding and are DROPPED under D44** (plan rev 39, commit
`13a6e66`). They are not live obligations on this chain, and they are neither re-argued nor re-based
here.

It is not mine to resolve, and it is cheaper to sequence now than to discover at the release act.

### F-4 — `agent-output`'s porcelain will not be empty at release, and that is correct

012's record could state *"`git status --porcelain` empty in both repos at release."* **013 cannot**,
and the reason is a mechanism worth writing down rather than a mess worth tidying.

Verified with `git check-ignore -v`, on both limbs:

- `agent-output/.gitignore:12` is **`node_modules/`** — with a trailing slash, so it matches
  **directories only**.
- The probe rigs' `node_modules` entries are **symlinks** into `website/node_modules`
  (`readlink` confirms). A symlink is not a directory, so **the pattern does not match**, and each
  healthy rig shows as `?? …/node_modules`. `check-ignore` exits **1** on them.
- A path *inside* a real `node_modules` directory **is** matched (`check-ignore` exits **0**, citing
  line 12), so a rig whose symlink has **degenerated into a real directory** is ignored wholesale and
  **vanishes from `git status`**.

**So the fourteen `??` lines are the healthy state, and silence is the broken one.** That inverts the
usual reading, and it means the standing hazard — a probe rig whose `node_modules` degenerated from a
symlink into a real directory, which then fails in a way indistinguishable from "the probe fails at
this tree", lapsing any judgement conditional on that probe — **currently has a free detector in
`git status`.**

**Recommendation: do not add a bare `node_modules` pattern to `agent-output/.gitignore`.** It is the
obvious tidy, it would make the release-time cleanliness check read like 012's, and it would delete
the only cheap signal distinguishing a healthy rig from a broken one. The release-time gate should
instead **record** the entries as other sessions' probe rigs, which is what they are. This is the
same shape as the recorded `tsconfig.json` hazard, where the obvious tidy breaks the deploy.

### F-5 — Deploy mechanism: not establishable from the repo, today as on 2026-08-23

Re-verified at the tree rather than inherited, per instruction:

- **No tracked content under `.github`** (`git ls-files .github` → empty; the only thing on disk is
  an empty untracked `prompts/` directory). No workflows.
- `vercel.json` carries **crons only**.
- `.vercel/project.json` carries a project id and an org id — that establishes **Vercel as the
  platform** and nothing about which branch deploys production.
- No deploy script in `package.json`.
- **None of these changed between `c85945f` and the tip.**

So the repo's own configuration cannot settle it, exactly as it could not for 012. The only
established answer is the owner's, given 2026-08-23 and recorded verbatim in 012's readiness:
**"Yes, push auto-deploys."** I record that as **a dated prior answer, not as today's fact** — it is
his to re-confirm, and he is asleep, so the question is parked below rather than assumed.

**The conservative posture is safe either way here**: treat the push as deploying. For 012 that
posture was load-bearing because something had to land first; for 013 nothing does, so being wrong
about it in the safe direction costs nothing (F-2 above is the only place the answer bites, and it
bites the same way under either answer).

### F-6 — Minor, recorded so it is not mistaken for something

- **`project-utils` is still checked out on `chain/012-message-valid-field`.** 012's release never
  switched it back to `master`. Both refs are `749606d`, so the content is identical and nothing is
  at risk — but a commit made in that repo today lands on a chain branch, not on `master`. Not 013's
  to fix; named so a future release act does not read it as drift.
- **`website` carries one untracked file**, QA's `src/utils/__tests__/013-qa-phase1-seed-route-probe.test.ts`,
  which inflates a working-tree suite run by **+7** over the clean baseline. It is QA's to
  disposition and committing it is *source*. It survives the branch switch, so unless dispositioned
  it will sit untracked on `master` after release, still inflating any suite run there.
- **Building here loads `.env.local`**, whose only selectable `DATABASE_URL` is the **remote hosted
  database**. That is a fact about running the build on this machine, unchanged from 012, not a
  finding against 013.
- **Start-of-run closure sweep, done and deliberately empty.** Seven predecessor deployment records
  (`2026-04-*`) carry terminal `Released` status outside `closed/`. **I did not move them**: this
  stage's own rule keeps deployment records open for rollback reference until a release is stable,
  `README.md` and `INDEX.md` both cite those paths and are not this stage's to edit, and the churn
  lands in a shared tree mid-chain. 012's pair stays open for the stronger reason that **012's
  deployment record says in terms that the chain is not closed.**
- The build emits a Next.js deprecation warning (*"the `middleware` file convention is deprecated"*).
  Non-blocking, and untouched by 013.

## 6. Cross-workspace: D12, re-derived rather than inherited

Read directly at `planning/012-message-valid-field.md` (D12, and release condition 5):

> statbot's deploy of its `valid` gate happens **only after the hooks.gg owner has declared the field
> live**, which itself follows his review of the backfill distribution (M6-b).

D20 puts chain 012 wholly on hold, and the live declaration sits inside that hold — **so statbot
chain 023 is held too, and no session in that workspace has been told.** Telling them is the owner's
call, not this stage's, and nothing here directs chain 023.

**What this means for 013's release act: nothing gates it.** 013 makes **no live declaration** and so
triggers nothing on the statbot side — plan condition **R-4 (I-D12, not relaxed)**, which is
confirmed, not merely restated: the declaration is 012's artifact and 013 produces none. The
deployment record owes that in **one line**.

**The connection that is easy to miss, and is the reason R-5 is not bureaucracy:** 013's deployment
record is the artifact the owner reads when he decides whether to lift D20. Lifting D20 unblocks the
live declaration, and the declaration is what releases statbot 023 under D12. **R-5's completeness is
therefore upstream of another workspace's deploy** — which is a further reason it is his decision to
widen and not a stage's to work around.

## 7. Owner questions — parked, not escalated

He is asleep. These are recorded so they are visible and re-openable, not dropped, and none is
raised as a separate interruption.

| # | Question | Why it is his | Consequence of no answer |
|---|---|---|---|
| Q1 | **R-5's widening.** The deployment record is known incomplete as rev 17 states it. | It is his decision; writing the record now spends it. | The deployment record cannot be written. **This is the blocking edge.** |
| Q2 | **Does pushing `website` `master` still auto-deploy production?** | Lives in the Vercel dashboard; no agent here can see it, and the repo cannot settle it. | Conservative posture (treat push as deploying) holds; costs nothing for 013. |
| Q3 | **Which rollback mechanism** (F-2)? | A force-push is single-owner and never on initiative; the dashboard route is his console. | Deferred to the console, which is the failure this finding exists to prevent. |
| Q4 | **DROPPED under D44** (plan rev 39, commit `13a6e66`). No longer a live question and not restated. | — | — |
| Q5 | **Ordering of the D19 repair against M8-G's observation** (F-3.1). | The repair is his action outside the plan. | The two get ordered by accident, which plan item 8 exists to forbid. |

Silence holds each of these where it stands; nothing proceeds on an unanswered one.

## 8. What the deployment record will owe — flagged, not written

Recorded so the obligations are not rediscovered at the release act. **None of this is drafted here.**

- **R-4**, one line: 013 makes no live declaration of the `valid` field and triggers nothing in the
  statbot workspace (§6 — confirmed today).
- **R-5**, its widened form once he rules — the flows 6/8/11–14 statement, the D12 ingress source
  class, the R8 mode-change class, and the M8 no-new-members statement.
- **Validation item 8**, one line: **which came first**, M8-G's observation or the D19 repair — and
  if the repair, that M8-G was not observed in production for that reason and the suite is its
  evidence.
- **BC-13's window** (F-1), with the go-live basis stated as the owner's attestation timestamp.
- **BC-12 and BC-14** carried into Post-Release Status as post-deploy-observable rows; they gate
  chain closure, never the release act.
- **Repositories and SHAs**: one repository, `website`, one ref, `master`, one commit.
- **Deployed-vs-verified reconciliation**: expected to be **EXACT** by the identity argument in §4 —
  and if it is not exact, §4's two conditions were violated and the difference must be diffed, not
  argued from ancestry.

**One item that stood in this list is DROPPED under D44** (plan rev 39, commit `13a6e66`) and is no
longer owed by the deployment record.

## 9. Go / no-go

**NO-GO for release.** Not on any artifact defect — every artifact-side gate reachable today passes,
and the build is green at the tip. The chain is simply not finished: M4 is in a fix round, **M6 has
not started**, QA Phase 2 is owed and claims no verdict SHA, code review is `In Review`, the UAT gate
is unstarted, and **BC-11b stands `NOT EXECUTED`**.

**Stage 1 is not open and no plan is committed for release.** When it opens, the route is: M4 → M6 →
QA Phase 2 → code review of the final tip → UAT verdict → Stage 1 → **R-5 widened by the owner** →
deployment record → his release approval → the single push in §2.

**Nothing here authorises anything.** Recorded so the release act is a decision and not a discovery.

---

## 10. Reconcile — re-run at the settled tip `a151fb4`, 2026-08-25

**Nothing above is overwritten.** §§0–9 were written on 2026-08-24 against tip `4e9da96`, while the
chain was still moving; they were defensible at that tip and are preserved as written. This section
records what a re-measurement at the settled tip changes and what it leaves standing. **Still not the
deployment record; still nothing assembled, no tree switched, nothing pushed.**

Re-run requested by `steering-hooks-013-2` with the explicit instruction to *say so from measurement
rather than assume*. Taken literally, and it mattered — see 10.1.

### 10.1 The premise I was given is false, and this is the reason the re-run was worth running

The brief said the delta from my assessed point was **three commits** and **test-only**. Measured:

| Claim | Measurement | Result |
|---|---|---|
| "three commits" | `git log --oneline 4e9da96..a151fb4` → **4** (`53beb37`, `164d720`, `821330d`, `a151fb4`) | **wrong by one** |
| "test-only" | `git diff --numstat 4e9da96 a151fb4 -- ':(exclude)*__tests__*'` → **2 source files** | **false** |

The two source files are `JsonModalBody.tsx` (F-QA15's fix — `validateContentRequirements(applyDisposition(validatedDraft))`)
and `discordResponseToMessage.ts` (two `const` → `export const`). **So my green build at `4e9da96` did
not cover the shipped tree**, and §3's build row could not have been carried forward. That is precisely
the failure a re-run exists to catch, and it would have been invisible had I accepted the premise.

**The reviewer's narrower claim is exact and I verify it**: `53beb37..a151fb4` is non-test **empty**.
Production-code identity has been frozen since `53beb37`; only tests moved after it. Both statements
are true of different ranges, which is how the looser one came to be believed.

### 10.2 Re-measured at `a151fb4` — every artifact-side gate

| Gate | Measurement at `a151fb4` | Result |
|---|---|---|
| Build | `pnpm build` → **exit 0** | **PASS — newly earned, not carried** |
| `master` = `origin/master` = `c85945f` | `git rev-parse` | unchanged |
| Integration is fast-forward | `git merge-base --is-ancestor master a151fb4` → true | **release tip ≡ chain tip by identity** |
| Tags | `git tag --list \| grep -c .` → **0** | none to collide |
| `website` porcelain | **0** — QA's probe file gone, the three test paths committed | **clean** |
| Deploy-config drift `c85945f..a151fb4` | `vercel.json`, `.gitignore`, `tsconfig.json`, `pnpm-lock.yaml` → **no delta**; `package.json` → **1 insertion** (the `typecheck` script) | unchanged from §3 |
| Version field | `grep -c '"version"' package.json` → **0**; no CHANGELOG | cross-repo check applies, not a version check |

**Cross-repo dependency reference — four legs, all agreeing**, which is what §3 could only assert three
ways:

| Leg | Value |
|---|---|
| `package.json` specifier | `github:hooks-gg/project-utils#master` |
| `pnpm-lock.yaml` resolved | `749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f` |
| local `origin/master` | `749606d0…` |
| **fresh `git ls-remote` of the real remote** | `749606d0…` |

No consumer is left pinned to a stale branch. **The specifier floats (`#master`) and the lockfile pins;
today they coincide, so the float is latent rather than live** — it becomes live only if a build ever
runs without a frozen lockfile. Recorded, not raised: it is not a defect at this tip.

`project-utils`' own local `master` (`eb38a15`) is **behind** `origin/master`, not split
(`merge-base --is-ancestor` → true). It is not a serving ref and 013 touches nothing in that repo.

### 10.3 Predecessor gates — re-derived from the documents, not from the relay

| Document | Status | Anchor |
|---|---|---|
| QA | `QA Complete` | `Verified-At: a151fb4…` — plain SHA, no content-identity fallback |
| Code review | `Code Review Approved` | Round 19-δ2, settled final tip `a151fb4` |
| UAT | `Active` | **`APPROVED FOR RELEASE, CONDITIONAL`** (rev 11) |
| Plan | `UAT Approved` | — |

**The release-tip verdict gate is satisfied by identity** and now on a plain SHA at the settled tip —
strictly stronger than §4's position, which rested on a content-identity fallback.

### 10.4 The blocking gate, derived from UAT §9.1 rather than from the count I was handed

**Twelve `PRE` rows stand non-terminal**: BC-1…BC-9 and BC-11b, BC-15 `NOT EXECUTED` outright (eleven),
plus **BC-10** met on its suite limb with its spot observation owed. Two are terminal — BC-11a and
BC-16 (`p2-rowd-load-gate`, discharged at `164d720`). The relay's "twelve"
is **corroborated**, now from the ledger itself.

Per Stage 1 step 2b this is decisive: **any observable-pre-release row without a terminal state blocks
the commit.** Stage 1 does not open. The four `POST` rows (BC-12, BC-13, BC-14, BC-17) correctly do not
block the release act and ride into the deployment record's Post-Release Status.

### 10.5 — DROPPED under D44

This subsection carried finding **F-7**. Its subject is struck from chain 013 under **D44** (plan rev
39, commit `13a6e66`), so F-7 and everything that rested on it are **dropped** — not re-argued, not
re-based onto anything else, and not restated. The heading number is kept so that later
cross-references do not dangle. **Nothing here changes any verdict, gate, approval or release state.**

### 10.6 F-8 — Appendix B names a tip that has since moved (UAT's to correct; reported, not edited)

Appendix B §B.1 and §B.2 direct the operator to serve **`821330d`**. The tip is now `a151fb4`.
**Materially the instruction is still correct** — production-code identity is unchanged across
`53beb37..a151fb4` (10.1), so serving either SHA puts the same application in front of the observer —
but the label is stale by one commit and the sitting should be run at `a151fb4` so its record names the
tree that ships. **UAT owns that document; I do not edit it.** Routed to steering.

### 10.7 U-C6 is mine, and it is already in my workflow

UAT rev 11 split U-C2 and assigned **U-C6 — terminal `Status` on the implementation document** to
devops, correctly citing the document-lifecycle table (`Implementer | Inherit | DevOps closes after
commit`). **This needs no new mechanism**: Stage 1 step 8 already sets `Committed` on the plan,
implementation, QA and UAT documents and moves them to `closed/`. U-C6 discharges there. It is **not** a
`PRE` row and does not gate the release act — it gates the chain's closure, and I record it as owed.

I also note UAT §9.2 has **adopted F-1's resolution into the ledger itself**: BC-13's instrument is
recorded as *"the owner's attestation timestamp, a conservative upper bound (readiness F-1)"*. F-1's
remedy therefore stands as accepted, not merely proposed, and the runbook must capture the attestation
**before** the row that closes BC-13.

### 10.8 What of §§5–9 still stands

| Finding | At `a151fb4` |
|---|---|
| **F-1** BC-13's timestamp | **stands, and is now adopted** into UAT §9.2 (10.7) |
| **F-2** rollback is a force-push | **stands unchanged** |
| **F-3** a condition hostage to an unsequenced owner action | **stands**; U-C5 (R-5's widening) is UAT's own name for the same blocking edge |
| **F-4** `agent-output` porcelain non-empty is correct | **stands**; `website` porcelain is now **0**, which §3 could not say |
| **F-5** deploy mechanism not establishable from the repo | **stands** — re-checked, no `.github/workflows`, `vercel.json` still cron-only. Q2 remains the owner's |
| **F-6** minors | **stands** |
| §2 the release act — one repo, one ref, one fast-forward | **stands, re-measured** |
| §3's build row | **superseded** — re-earned at `a151fb4` (10.1, 10.2) |
| §4 verdict by identity | **stands, strengthened** — plain SHA, no fallback (10.3) |
| §6 D12 | **stands**; unchanged, 013 touches nothing cross-repo |
| §7 owner questions Q1–Q5 | **still parked**, less Q4, dropped under D44 |

### 10.9 Verdict

**NO-GO, unchanged — but for a different reason than on 2026-08-24.** Then, the chain itself was open.
Now **every artifact-side gate passes at the settled tip and is measured, not inherited**: build green,
fast-forward, verdict by identity on a plain SHA, clean tree, no config drift, cross-repo references
agreeing four ways.

**What blocks is the `PRE` ledger — twelve non-terminal rows — and U-C5, R-5's widening, which is the
owner's.** Neither is mine to discharge and neither is an artifact defect.

**Nothing here authorises anything.**

### 10.10 Dispositions recorded 2026-08-25, after §10 was filed

Appended so a later reader is not sent to an artifact that no longer carries the operative instruction.
**Each was verified against the tree here, not adopted from the report of it.**

| Finding | Disposition | Verified |
|---|---|---|
| **F-8** (Appendix B names `821330d`) | **Actioned, but not in Appendix B.** UAT is at its run-length ceiling and was not woken; the owner's walkthrough now lives in **`agent-output/OWNER-QUEUE.md`** (`91c3cc3`, 2026-08-25 00:04 UTC), which serves the sitting at **`a151fb4`** and names the divergence explicitly, with Appendix B authoritative on everything else. A UAT successor reconciles its own document | `git show 91c3cc3`; `OWNER-QUEUE.md:30–31` carries the divergence note, `:52` the operative tip |
| **F-7** | **DROPPED under D44** (plan rev 39, commit `13a6e66`). No disposition is owed, none is recorded, and nothing is re-based | — |
| **U-C6** | Acknowledged as devops's; discharges at Stage 1 step 8. No new mechanism | UAT §9.1/rev-11 reconcile note |
| **U-C5 / R-5** | The owner chose a **planner pass** to widen R-5 alongside the eight other held items, rather than D25's alternative of this record stating the wider class. **R-5's requirement is therefore expected to change before the deployment record is written, and the record stays unwritten** | steering, 2026-08-25 |

**One correction to `OWNER-QUEUE.md`, reported not edited** (it is steering's document): line 31 states
the `821330d → a151fb4` delta is *"four test files and zero production files"*. Measured:
`git diff --numstat 821330d a151fb4` returns **three** test files — `012-json-editor-repair-path.test.ts`,
`012-message-mode.test.ts`, `013-fqa19-ingress-gate-reachability.test.ts` — over **one** commit.
**The load-bearing half is exact**: the non-test delta is empty, so behaviour at the two tips is
identical and the walkthrough's instruction to serve `a151fb4` is correct either way. The count is
cosmetic — recorded because it is the same class of off-by-one that made the brief for §10 wrong, and
this one sits in the artifact the owner will actually read.

**None of this moves the verdict.** NO-GO stands, on the twelve non-terminal `PRE` rows and U-C5.

### 10.11 A recurring defect class, recorded for the retrospective: **range restatement**

Recorded here at steering's request and on my own judgement that it belongs in a chain document.
**The retrospective reads this document and does not read the cross-session channel**, so a defect
recorded only in that channel is invisible to process improvement by construction. **This is about the
mechanism, not about any session** — I am one of the two parties exposed by it, and the instance that
nearly did damage was one I was about to act on.

**The class**: *a count or identity is measured correctly over one commit range, then restated over a
different range where it is false.* Both endpoints are real, the measurement was really run, and the
restated number looks corroborated because it came from a genuine command. **Nothing about the wrong
form looks wrong** — which is why re-running the reported form confirms it and only re-measuring at the
range you actually need catches it.

| # | Stated | True over | False over | Consequence |
|---|---|---|---|---|
| 1 | "the delta from your assessed point is test-only" | `53beb37..a151fb4` | **`4e9da96..a151fb4`** — my assessed point | **Nearly load-bearing.** Had I carried my `4e9da96` build forward, the release would have rested on a green build that never compiled the shipped `JsonModalBody.tsx` — the one file this chain turns on (§10.1) |
| 2 | "four test files" (`OWNER-QUEUE.md:31`) | `164d720..a151fb4` (**verified here**: 4 files, non-test empty) | **`821330d..a151fb4`** — 1 commit, 3 files | Cosmetic, beside a correct instruction, in the document the owner reads while checking a tip SHA. Corrected at `2ef9640`; line 31 now reads *"one commit, three test files, zero production files"* (**verified**) |

Steering reports this as the **third** occurrence of the class in two days. I record that as its count,
not as my measurement — I measured instances 1 and 2 myself and did not observe a third.

**What caught both**: re-measuring at the range actually needed, against a counter that computes before
any output filter (`git rev-list --count`, `git diff --numstat`). **What would not have caught either**:
re-running the reported form, which reproduces stably and therefore reads as confirmation. This is the
same failure shape the workspace already documents for filtered output — *a contradiction against an
independent counter is the signal, and re-running the original is not verification*.

**The cheap structural fix, offered not adopted** (process is not this stage's to change): **state both
endpoints whenever a count or an identity is asserted** — `A..B`, never a bare count and never "since
your point". A bare count cannot be falsified by its reader; `git diff --numstat X Y` can be, in one
command, by anyone. Instance 2 was caught precisely because the range was written down next to it.

**Why instance 2 was worth raising despite being cosmetic**, since the reasoning generalises: a wrong
number sitting beside a correct instruction **reads as corroboration for the instruction**. In a sitting
where the owner is checking a tip SHA against a document, a number he can trivially falsify is what
makes him distrust the numbers he cannot.

---

## 11. The release act occurred outside the gate — 2026-08-25, recorded not adjudicated

**§§0–10 are preserved exactly as written and none of them was false at write time.** They now read as
a forecast of an event that has since occurred. This section records that, from measurement, at
2026-08-25. **It is not the deployment record and does not become one.**

### 11.1 What the tree says

| Measurement | Result |
|---|---|
| `git rev-parse master origin/master` | both **`a151fb4`** |
| `git ls-remote origin master` *(the remote itself, not a tracking ref)* | **`a151fb4`** |
| `HEAD` reflog | `00:56:27` checkout `master`; `00:56:34` **merge `chain/013…`: Fast-forward** |
| `origin/master` reflog | `00:56:37` **update by push** |
| `.solo` in `website` | **absent** → shared repo; an unplaceable act may be another session's |

**The fast-forward §2 predicted has happened, and been pushed.** Elapsed from checkout to push: **ten
seconds.**

### 11.2 It was not this agent, and the evidence is structural rather than assertive

**No release step in this chain was executed by me.** My last action in `website` was a read; my last
write of any kind was `bad6e50` at **00:13:16**, in `agent-output`, **43 minutes before the push**.

The stronger evidence is that **the gate leaves a trace when it runs, and there is none**: Phase 2B
requires a release summary presented to the owner and his explicit approval recorded with a timestamp
before any ref moves. **No summary was ever presented and no approval was ever given or recorded.**
Stage 1 never opened. Had I executed this, the artifacts of the gate would exist; their absence is not
my say-so.

### 11.3 What I will not do, and why

- **No deployment record.** R-5's requirement is still moving under a planner pass (§10.10), no Phase 2B
  confirmation exists, and the twelve `PRE` rows and U-C5 were never discharged. A record written now
  would document a release this stage did not gate and cannot attest. **When one is eventually owed it
  must say plainly that the release act occurred outside the gate** — that is a fact about the chain, not
  a reconstruction to be smoothed over.
- **No probing for serving state.** Whether the deploy fired is exactly the class my definition reserves
  to the owner's word. I do not read it from a host, a process list or a port. **It is asked, not
  inferred.**
- **No unilateral remediation.** Reverting, re-pointing or re-branching a pushed serving ref is a
  non-fast-forward act and nobody's to run on their own initiative (F-2).

### 11.4 — DROPPED under D44

This subsection tracked **F-7**'s status. Its subject is struck from chain 013 under **D44** (plan rev
39, commit `13a6e66`), so nothing here remains open and nothing is restated. **No verdict, gate,
approval or release state is changed by the strike.**

### 11.5 A hazard neither party has named: uncommitted source on the checked-out serving branch

`master` is checked out and its working tree is **not** clean:

    M  src/app/message/_components/NewMessageJsonInput.tsx      (+7 −9)
    M  src/app/message/m/[id]/layout.tsx                        (+2 −0)
    M  src/providers/MessageProvider/index.tsx                  (+8 −3)
    ?? src/app/message/m/[id]/_layout/CodeMessageNotice.tsx
    ?? src/utils/__tests__/013-owner-toast-vessel-2026-08-25.test.ts

**None of it is deployed** — the push carried `a151fb4` only, and **nothing is staged** (`git diff
--cached --numstat` empty), so no unqualified commit sweeps it up. **The exposure is forward-looking**:
three *tracked production source files* now carry uncommitted edits on the branch that serves
production, so any session that commits and pushes from here puts unreviewed work live without
passing a gate. It belongs on a chain branch. **It is the implementer's to move and not mine, and the
tree must not be switched over a dirty tree in any case.**

### 11.6 The one question, and who owns it

Steering reports it did not push; the implementer reports it did not; **I did not**. The remaining party
with both the authority and the access is **the owner**, and the shape of the act — checkout,
fast-forward, push, ten seconds, no gate artifacts — reads as someone who knew exactly what he wanted
rather than as a process that went wrong. **That is a hypothesis, testable by one question, and it is
the likely reading rather than the alarming one.** It is not mine to assert on his behalf.

**Held, not escalated** — he is away, and silence is not consent. Per this stage's rule, on no answer the
direction of the last explicit ruling governs, and for a safety gate that means **hold**. Recorded here
so it stays visible and re-openable rather than quietly dropped.

---

## 10.12 Second defect class — reading a cell for the answer you came for

**The class**: *reading a document cell for the question you arrived with, and not seeing the
condition attached to it.* Distinct from range restatement (§10.11): there the measurement is right
and the range is wrong; here the reading is right and the **scope of what was read** is wrong. The
text is fully present and fully correct. Nothing is stale, nothing is filtered, no instrument lies.
The reader simply stops at the answer.

**It cashed twice in one night, on the same cell, in two different directions.** D25's route column
in the planning document reads *"Keep holding; I catch it before the record is written."*

- **The coordinator's half, recorded as it was given and not softened.** `steering-hooks-013-2` read
  the cell for *whether the planner pass was held*, got its answer, and did not see *what the hold
  was attached to* — carrying the right hold under the wrong citation (D24 rather than D25) in its
  docket. It then stated to this stage that no owner ruling to hold existed, and withdrew that
  explicitly and in the same channel once it verified the cell at source. **The withdrawal is not
  the defect and is not recorded as one**; verifying at source rather than accepting a subordinate's
  account is the behaviour that caught it.
- **This stage's half.** I read the same cell earlier in the same session for its **discharge
  routes**, found the second route, took it, and did not see the **trigger** in the adjacent clause.
  The trigger was the act I was about to perform. I began writing the deployment record without
  recognising that writing it was the named event the owner had reserved a review before.

**The option's own stated weakness named this failure mode in advance and still did not prevent
it.** The route he chose was recorded as depending on *"steering's docket surviving into whatever
session is present at release time."* That is precisely how it failed. **A risk being written down
next to the decision is not a control.** Nothing read the sentence at the moment it came true.

**What a future reader should take from it**: the two instances are worth more together than either
alone, because they rule out the obvious remedies. It was not carelessness — both readings were
purposeful and both were correct as far as they went. It was not staleness — the cell never changed.
It was not a bad instrument. **A cell that answers a question and also imposes a condition will be
read for the answer**, and the only defence that would have worked is structural: conditions belong
in a register that is read on its own terms, not as a column beside the answer they qualify.

## 10.13 F-9 — QA's `Verified-At-Note` restates a true range over a false one

**Third instance of §10.11's class tonight, in a third session — and this one is in the field a
release gate reads.**

`qa/013-components-v2-editing-surfaces-qa.md` frontmatter, `Verified-At-Note`, states: *"Every commit
since live master `a151fb4` is test-only."*

| Range | Production files changed | Verdict on the claim |
|---|---|---|
| `abcf585..4a7126b` | **0** — measured `--numstat` with `':(exclude)*__tests__*'` | **TRUE** |
| `a151fb4..4a7126b` | **4**, all in the first commit `abcf585` | **FALSE** |

`a151fb4..4a7126b` is three commits: **`abcf585` changes four production files** —
`NewMessageJsonInput.tsx`, `MessageProvider/index.tsx`, `layout.tsx`, and a new
`CodeMessageNotice.tsx` — and `664e0c0` and `4a7126b` change none. The claim is exactly true of the
range starting one commit later than the range it names.

**This does not invalidate the verdict and is not reported as though it does.** QA's *body* is
correct and knows better than its own note: §"Fix-round verdict — toast vessel" anchors at `abcf585`
with **559 tests / 38 files / exit 0** against 550/37 at `a151fb4`, and measures the later delta as
test-only *from `abcf585`*, which is the right range. **The production change was verified.** What is
wrong is the one-line summary in the field a devops gate reads first.

**Why it matters here specifically.** A gate reading `Verified-At: 4a7126b` beside *"every commit
since live master is test-only"* would conclude the release delta needs no production-side scrutiny.
The change is not cosmetic: `abcf585` converts permanent-state notices from transient `toast.warn`
calls to persistent inline DOM across the paste surface and the message layout. That is **the exact
surface BC-18, BC-19 and BC-21 examine** — BC-21 is a notice-silence detector. Inheriting "test-only"
would have skipped the delta most relevant to the outstanding rows.

**Reported to QA, not edited.** The QA document is QA's; two writers to one file is a clobber.

## 10.14 U-5 corroborated — `4a7126b` is not shipped

`uat-hooks-013-3` raises that QA's prose frames `4a7126b` as shipped. **Independently measured here at
the remote, not from a tracking ref:**

    git ls-remote --heads origin
      a151fb4…  refs/heads/master
      (backup, external-message-api, redesign, regex-refactor)

**`chain/013-toast-vessel` returns no line at all** — it exists only locally. `master` is `a151fb4`.
**A decision to ship is not a shipment.** Nothing past `a151fb4` is serving, and rev 13's condition
that BC-18/BC-19 precede the release act **remains meetable in the order it was written**, because
those rows do not expire. No summary written by this stage will inherit the shipped framing.

## 10.15 Phase 2A release-tip verdict for a `4a7126b` release — SATISFIED

`qa-hooks-013-2` returned **RELEASE VERIFIED** at `4a7126bf8578b653ac7ae1cfe7cabdd609cdc21f`, plain
40-char SHA, no content-identity fallback. Record: `qa/release-4a7126b-tip-verification.md`, committed
`78e0a13`. It takes **no plan ID** and is named by release identifier — correct, since a release-tip
verdict certifies a tree, not a plan.

| Gate evidence at the tip | Result |
|---|---|
| Suite (`npx vitest run`) | **577 tests / 40 files / exit 0** |
| Build (`pnpm build`) | **exit 0**, compiled in 8.4s, `grep -ci error` → 0 |
| Divergence / assembly | none — one production commit, `abcf585`; `664e0c0` and `4a7126b` test-only, verified per commit |

**The ruling I asked for and refused to infer, recorded because it settles a gate question for every
future chain**: *the plan-level QA verdict does **not** constitute the release-tip verdict, even at an
identical SHA.* QA's reasoning, which is better than mine was: **a matching SHA makes the *subject*
identical, not the *act*.** The plan-level pass was gate-scoped — it ran no full suite and no build —
so it could not contain the three facts above. Had I read the SHA coincidence as satisfying Phase 2A,
**the release would have gone out with no full-suite run behind it.** The deployment record cites the
release document, not the plan document.

### The coverage gap and BC-18/BC-19 are the same gap

QA reports the four production files in `abcf585` as **two covered, two text-pinned only**:

- `CodeMessageNotice.tsx` — **covered**, executed.
- `NewMessageJsonInput.tsx` — **covered**, executed.
- `m/[id]/layout.tsx` — **text-pinned**. One `toContain('<CodeMessageNotice />')`. **The mount is never
  executed.** The component renders in isolation; the layout contains the tag. Neither proves it
  appears on the page — *wired is not installed*.
- `MessageProvider/index.tsx` — **text-pinned**, three `toContain`. **The producer is never executed** —
  the effect that computes the notice string and, **new in 013, clears it to `null`**. The one render
  test naming the provider `vi.mock`s it out, correctly, to isolate the vessel, so the real effect runs
  in none of the 40 files.

**This does not fail the tip and is not recorded as though it does.** But it is the load-bearing
observation for sequencing, and it is mine to make rather than QA's: **the two uncovered behaviours are
exactly what BC-18 and BC-19 settle.** They are not ceremony left over from an earlier plan revision —
they are **the only instrument covering half the production surface of this release.** The
clear-to-null path in particular is new in 013 and user-visible if wrong: a warning that never clears
is a stale notice sitting on the page, which is the failure the toast vessel was built to prevent.

**Consequence for ordering.** Nothing has shipped (§10.14), so **rev 13's condition that BC-18/BC-19
precede the release act has not been overtaken and remains meetable in the order it was written.**
**These rows are still open, still executable, and now demonstrably load-bearing.** This stage's
recommendation is that they run **before**
the cut, not after — not to satisfy a register, but because releasing first would ship two production
files whose behaviour nothing has executed.

**QA's verdict certifies the tip. It does not discharge BC-18/BC-19 and is not cited as having done so.**

### Fourth member of the unsound-instrument class

Recorded with §10.11's family, because it is the same shape and the failure is silent:

    git rev-parse <tree>:<path>       # absent path → echoes its ARGUMENT to stdout, exits 0

So an `|| echo MISSING` fallback **never fires** and the caller reads the path string back as though it
were a blob hash. **Use `git cat-file -e <tree>:<path>` for existence.** Found by `qa-hooks-013-2`,
which also hit the family's known form directly — `git diff --name-only | grep -c .` returned **8**
against a true **7**, settled with `--shortstat`. **Two independent sessions were bitten by this class
tonight after it was written down**, which is the same lesson as §10.12: a hazard recorded beside the
decision is not a control.

---

# 12. Phase 2A complete and the Phase 2B release summary for a `4a7126b` cut

**Written 2026-08-25 04:08 UTC by `devops-hooks-013-2`.** §§0–11 are preserved exactly and nothing
above this line is rewritten. **Every figure below was re-measured in this session at `4a7126b`.**
Nothing here authorises anything, and **no push approval exists anywhere in this chain.**

## 12.0 Authority for restated status

**The UAT document is the authority for every blocking-condition state in this section, and the QA
document for every row definition.** Both were re-read at the moment of writing, not carried from an
earlier read. Where this section states a condition's state it is **restating, not deciding.**

**Two things moved under the brief I was given**, which is why re-reading rather than relaying matters:

| Brief said | Measured now | Where |
|---|---|---|
| UAT at **rev 16**, `aa1d82a` | UAT at **rev 17**, `e4c37af` — BC-19 split adopted, failure mode (b) retired on evidence, F-9 answered | `git -C agent-output log` |
| QA's `Verified-At-Note` carries F-9's false range | **Corrected** at `1a21add` — the note now states the delta `a151fb4..4a7126b` **is** production-bearing | QA frontmatter, read directly |

`agent-output` HEAD is `a195dc2` (*"qa(013): stage close — UAT Complete, instrument-class register at
six"*). The readiness file itself is byte-unchanged across `6f6f73a..a195dc2` — only the deployment,
qa and uat documents moved.

## 12.1 Phase 2A — re-derived at `4a7126b`, not inherited

### The assembled tip

| Measurement | Command | Result |
|---|---|---|
| Local chain tip | `git rev-parse HEAD` on `chain/013-toast-vessel` | **`4a7126bf8578b653ac7ae1cfe7cabdd609cdc21f`** |
| Live serving ref, **at the remote** | `git ls-remote origin master` | **`a151fb4`** |
| Chain branch at the remote | `git ls-remote origin 'refs/heads/chain/*'` | **no line — the branch does not exist there** |
| Integration is a fast-forward | `git merge-base --is-ancestor a151fb4 4a7126b` | **true**; `merge-base` = `a151fb4` |
| Nothing on `master` is unmerged | `git rev-list --count 4a7126b..a151fb4` | **0** |

**Therefore the assembled tip IS `4a7126b`, by identity.** Phase 2A step 2a's scratch-merge is
vacuous here: there is nothing to merge that a fast-forward does not already give, so the tree the
verdict ran against and the tree that would ship are the same object, not merely equivalent trees.

### The release delta, stated as a range

`a151fb4..4a7126b` — **3 commits, 7 files** (`git rev-list --count`, `git diff --numstat`):

| Commit | Files |
|---|---|
| `abcf585` `fix(013)` toast vessel | **4 production** — `NewMessageJsonInput.tsx` (+7/−9), `CodeMessageNotice.tsx` (+18, **new**), `m/[id]/layout.tsx` (+2), `MessageProvider/index.tsx` (+8/−3) — plus 1 test file |
| `664e0c0` `test(013)` | 1 test file |
| `4a7126b` `test(013)` | 1 test file |

**The production delta is introduced at `abcf585` and is unchanged since** — verified per path by blob
identity, not by reading the log: all four blobs are the same object at `abcf585` and at `4a7126b`
(`f63b95df`, `75dafce9`, `d50a1992`, `955fc0ea`). `abcf585..4a7126b` is **test-only**; `a151fb4..4a7126b`
is **not**. That distinction is F-9's, and it is the one a gate reading the frontmatter gets wrong.

### Artifact-side gates, measured in this session

| Gate | Instrument | Result |
|---|---|---|
| **Suite** | `npx vitest run` at `4a7126b`, clean tree | **577 passed / 40 files, exit 0**, 0 `FAIL` lines |
| **Build** | `pnpm build` at `4a7126b`, clean tree | **exit 0**, `grep -ci error` → **0**, full route table emitted (10 app routes, 8 pages routes, middleware) |
| **Workspace** | `git status --porcelain` in `website` | **0 lines**, before the build and after it |
| **Tags** | `git tag --list \| grep -c .` | **0** — none to collide |
| **Deploy-config drift** `a151fb4..4a7126b` | `git diff --numstat` over `vercel.json`, `.gitignore`, `tsconfig.json`, `pnpm-lock.yaml`, `package.json`, `next.config.*` | **empty — no drift at all**, stronger than §10.2 could say over `c85945f..a151fb4` |
| **Verified SHA reachable** | `git branch --contains 4a7126b` | **`chain/013-toast-vessel`** — auditable; no history was rewritten |

These reproduce QA's release-tip figures **independently**, by a second party running the commands
rather than reading the verdict. I record the agreement as corroboration, not as the verdict itself.

> **One instrument correction, disclosed in the round it happened.** I first grepped a background
> task's output file for build errors and read `0` from a file that contained only the line
> `BUILD_EXIT=0` — the build's own stdout had gone to a different path. The number was right by
> accident and the measurement was of the wrong file. Caught by checking the log's byte count against
> what a Next build actually emits. **Same family as §10.11 and §10.15's fourth member: the instrument
> measured something adjacent to the question and the answer looked fine.**

### Cross-repo dependency reference — re-run at `4a7126b`, which is the check §12 was left owing

`package.json` at `4a7126b` carries **no `version` field** (`grep -c '"version"'` → **0**) and there is
no CHANGELOG, so per Core Responsibility 3 this is the cross-repo reference check and **no version is
synthesised**. Four legs, measured at the new tip:

| Leg | Instrument | Value |
|---|---|---|
| `package.json:68` specifier | `git show 4a7126b:package.json` | `github:hooks-gg/project-utils#master` |
| `pnpm-lock.yaml:165` resolved | `git show 4a7126b:pnpm-lock.yaml` | **`749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f`** |
| `project-utils` local `HEAD` | `git -C project-utils rev-parse HEAD` | **`749606d0…`** (on `chain/012-message-valid-field`) |
| **Fresh `ls-remote` of the real remote** | `git -C project-utils ls-remote --heads origin` (SSH) | `refs/heads/master` = **`749606d0…`**, `refs/heads/chain/012-message-valid-field` = **`749606d0…`** |

**All four agree. No consumer is left pinned to a stale branch — PASS.** The latent condition §10.2
recorded is unchanged and is re-recorded rather than dropped: **the specifier floats (`#master`) and
the lockfile pins.** Today they coincide, so the float is latent, not live; it becomes live only if a
build ever runs without a frozen lockfile. **Not a defect at this tip.** 013 changes nothing
cross-repo, and D12's cross-workspace ordering (§6) is untouched by this cut.

### Serving refs stay on one line of history — Phase 2A step 10

Enumerated **from the repo**, not from a count of refs this cut moves. `git ls-remote --heads origin`
returns five: `master` (`a151fb4`), `backup` (`854bbbc`), `external-message-api` (`d21b32e`),
`redesign` (`4fe53b6`), `regex-refactor` (`d5f2dc8`). Tested pairwise against `master` with
`merge-base --is-ancestor`: **all four are ancestors of `master` and none is a descendant.** Every ref
is on one line of history and **no pair is split**. `master` is the only serving ref — evidenced by
the owner's attestation that his push of `a151fb4` to `master` made the site live, not inferred from
config. A single serving ref admits no split; the check passes and the cut would not create one.

### Deploy mechanism — F-5 stands, and the gap is narrower than it was

Re-established from the repo's own configuration at `4a7126b`, not from any relayed remark:

- **`.github/` exists but contains only `prompts/` — there is no `workflows/` directory.**
- **`vercel.json` is cron-only** — one entry, `/api/cron?key=vercel`, daily. No build or git config.
- **`package.json` `scripts` contains no deploy script** — `build` is `next build` and nothing invokes a deploy.

**So no repo artifact establishes the deploy trigger.** What establishes it is **the owner's answer,
recorded as such**: he pushed `a151fb4` to `master` at 00:56:37 and reported *"I pushed it, and it's
live"*. That is push-to-`master` → Vercel deploy, on his word, and it is sufficient and terminal
evidence of the mechanism as well as of the serving state. **F-5 stands as a repo-configuration
finding** — nothing in the tree would tell a successor this — but it is no longer an open question
about what happens if `master` moves.

### Execution mode — Phase 2C

**Mode A, agent-executed, on the mechanism**: one repo, one serving ref, one fast-forward, one push;
the deploy fires from the push and needs no orchestrator driven from here. There is no registry and
nothing to publish — **a publish step would be invented, and is not.** No tag is proposed: this repo
carries zero tags and the release identifier is the ref move itself.

**But the mode is his to change and the summary offers it**: the `a151fb4` release was pushed by him,
and if he prefers to push this one too, the record is written **Mode B, externally executed, operator
named**, on his completion report. **The gates are identical under both.** Either way the runbook is
three commands and there are no in-flight gate rows to interleave — no capture step feeds a later
row, and no stop-point with an abort criterion sits inside the sequence.

## 12.2 The gate verdict — NO-GO stands, and its reason has changed again

**Every artifact-side gate passes at `4a7126b`, measured here.** Build, suite, clean tree, fast-forward
by identity, release-tip verdict on a plain SHA, no config drift, cross-repo references agreeing four
ways, serving refs unsplit.

**What blocks is the blocking-condition register, and it is not mine to discharge.** Per Stage 1 step
2b, a row classified observable-pre-release without a terminal state blocks. Restating from UAT
(authority), at rev 17:

| Class | Rows | State |
|---|---|---|
| `PRE`, **non-terminal** | **BC-1 … BC-9** (BC-2/BC-3 carry a standing withdrawal *recommendation* the owner has not ruled on), **BC-10** (suite limb met, spot observation owed), **BC-15**, **BC-18**, **BC-19a**, **BC-19b** | **NOT EXECUTED / Not started** |
| `PRE`, terminal | **BC-11a** `EXECUTED`; **BC-16** `EXECUTED`; **BC-11** `SUPERSEDED` by 11a/11b; **BC-19** `SUPERSEDED` by 19a/19b | terminal |
| `PRE` | **BC-11b** | **DROPPED under D44** (plan rev 39, commit `13a6e66`) — not a live obligation on this chain. It blocked nothing before the strike and blocks nothing after it, so **no verdict, gate, approval or release state moves** |
| `POST` — never blocks the release act | **BC-12, BC-13, BC-14, BC-17, BC-20, BC-21** | ride into the deployment record's Post-Release Status |
| Documentary `U-C` | U-C1–U-C4 terminal; **U-C5** the owner's, open; **U-C6** mine, discharges at Stage 1 step 8; **U-C7 DISCHARGED** by the record at `e34df07`; **U-C8** `EXECUTED` — D29, plan rev 22, `d60c857` |  |

**The owner's ruling tonight did not terminate any of these rows, and I am not recording it as though
it did.** He was asked whether to run BC-18/BC-19 before the cut and chose **"Neither — proceed to the
cut."** That is a **sequencing** answer. `WITHDRAWN` is his ruling alone and he made no such ruling;
the rows stay `PRE`, open, and still meetable. **He was shown the strongest form of the case first** —
that two of the four production files have no executing test and the code-import surface has never run
in production — alongside *"do the paste check now"* (my predecessor's recommendation) and *"both, and
get me the code for BC-19"*, and **declined both with that in front of him.** That is an informed
ruling on order, and it is why this section proceeds to a summary rather than stopping.

## 12.3 — What must be in front of him, and none of it is new tonight

**(a) DROPPED under D44** (plan rev 39, commit `13a6e66`). The item that stood here is struck from
chain 013 with its subject, is not re-argued and is not re-based. The letter is kept so (b)–(g) do not
renumber. **No verdict, gate, approval or release state changes.**

**(b) The `a151fb4` release ran outside this gate, and that history is now recorded, not erased.** No
release summary was presented and **no Phase 2B approval was given or recorded**; twelve `PRE` rows
went out unexecuted. The deployment record at `e34df07`
(`deployment/013-components-v2-editing-surfaces-deployment.md`, Status **`Released — chain closure
pending`**) states it as a **recovery state, not a sanctioned ordering**, and discharges **U-C7**. It
also carries **D25 item (iii)** by its second route — stating the wider M7 class that R-5 as written
does not — which he endorsed by proceeding on it.

**(c) BC-18, BC-19a and BC-19b are knowingly not met, still meetable, and load-bearing.** This is the
part that would cost something. QA's coverage finding, restated from QA and corroborated at the tree:

| Production file | Coverage |
|---|---|
| `CodeMessageNotice.tsx` | **covered — executed** |
| `NewMessageJsonInput.tsx` | **covered — executed** |
| `m/[id]/layout.tsx` | **text-pinned only.** One `toContain('<CodeMessageNotice />')`. **The mount is never executed** — the layout is proven to *contain the tag*; nothing proves the notice appears on the page |
| `MessageProvider/index.tsx` | **text-pinned only**, three `toContain`. **The producer effect is never executed** — including the clear-to-`null` path that is **new in 013**. The one render test naming the provider `vi.mock`s it out, correctly, to isolate the vessel, so the real effect runs in **none of the 40 test files** |

**So these three rows are the only instrument covering half this release's production surface.** They
are not ceremony left from an earlier plan revision. QA split BC-19 at `aef3c2e` on UAT's
recommendation: **BC-19a** *appears-at-all* — a **real code import that drops components**, carrying
the unproven producer and mount, where **one successful import refutes "it never appears" by
construction**; **BC-19b** *legible-and-placed* — the eye check, **decidable only after 19a produces
something to look at.** **BC-18** is the paste surface, shrunk to its residue: visibility, placement,
real mount. All three are **his eyes, executable locally, now, before anything is cut.**

**(d) One proposed failure mode was declined and must not be re-added.** *"The page throws on a null
context"* is **true of the test and false in production.** `Navigation.tsx` sits in the identical
position inside `<MessageProvider>`, consumes `useMessage()`, is blob `339ed840` at `a151fb4`,
`abcf585` **and** `4a7126b`, and has been live throughout. **The boundary is proven in production.**
QA declined the mode; UAT retired it at rev 17 having re-derived it git-side. **An unreachable failure
is not a reason**, and carrying it would make a blocking row harder to settle while adding nothing an
observation could discharge.

**(e) BC-21 `notice-silence-detector` is the genuine `POST` row** — one deliberate paste on the live
site after the cut. **It does not substitute for BC-18**, and its failure signature is **absence**,
which is the weakest kind the register holds: absence generates no complaint, so it will not report
itself.

**(f) 5712/5842 are still in the bad shape under live code.** Asked directly, he answered the D19
repair *"Haven't done it yet."* R-5's line is not an ordering statement, and this cut neither performs
the repair nor depends on it. Recorded so the summary does not read as though it were done.

**(g) The rollback, and the trap inside it.** He chose **Vercel dashboard — promote a previous
deployment**. It reverts the served code; it **does not move `master`**, so **git and serving state
diverge by design and the next ordinary push silently re-deploys 013**. It does not roll back the
database. Anyone using it must know it is not sticky.

## 12.4 The release summary — Phase 2B, presented, NOT approved

| Field | Value |
|---|---|
| **Release identifier** | `website` serving ref `master`, **`a151fb4` → `4a7126b`** (no tag; this repo carries none) |
| **Included plans** | **Plan 013 only** — Components V2 across the editing surfaces |
| **Repository** | `website` — one repo, one ref |
| **Environment** | production, Vercel; deploy fires on push to `master` |
| **Act** | fast-forward `master` to `4a7126b`, push, then switch the tree back onto `master` |
| **Delta** | `a151fb4..4a7126b` — 3 commits, 4 production files + 3 test files; production change introduced at `abcf585` and unchanged since |
| **What it does** | converts permanent-state notices from transient `toast.warn` calls to persistent inline DOM, on the paste surface and the message layout |
| **Release-tip verdict** | **RELEASE VERIFIED at `4a7126b`** — `qa/release-4a7126b-tip-verification.md`, `78e0a13`; reproduced independently here |
| **Execution mode** | **Mode A** on the mechanism; **Mode B** if he pushes it himself, operator named |
| **Rollback** | Vercel promote — **not sticky**; the next push re-deploys 013 |
| **Gate verdict** | **NO-GO on the register.** Artifact-side: everything passes. **Fourteen `PRE` rows non-terminal**, three of them (BC-18, BC-19a, BC-19b) covering half the production surface, all executable locally today |

### Runbook, if the answer is to cut it

    git -C /usr/local/bin/hooks/website switch master
    git -C /usr/local/bin/hooks/website merge --ff-only chain/013-toast-vessel   # → 4a7126b
    git -C /usr/local/bin/hooks/website push origin master

**The tree is clean (`porcelain` = 0), so the switch does not run over uncommitted work** — that
precondition is re-checked immediately before the switch, not inherited from this line. **No tag, no
publish step.** The tree stays on `master` afterwards; that switch is the release act's own, and this
is the one point at which it is licensed.

## 12.5 What this section does NOT do

**Nothing above authorises anything.** No ref was moved, nothing was pushed, no tree was switched, and
the working tree is on `chain/013-toast-vessel` at `4a7126b` exactly as I found it. **No push approval
exists anywhere in this chain**: his *"Ship it, then check it live"* answered a question about **where
to observe the fix**, and **an approval predating the gate cannot be an approval of what the gate
finds.** His *"Neither — proceed to the cut"* set the **order**, not the authorisation. **Phase 2B is
unsatisfied and the question in 12.6 is the one that satisfies it.**

## 12.6 The question, and it is genuinely unasked

Put to him verbatim by steering. **It is not a re-ask**: he ruled on whether to run the checks first,
which is a different question from whether to push, and this document is the first time the release
summary has been in front of him.

> **013 is ready to cut. `master` goes `a151fb4` → `4a7126b` — three commits, four production files.
> Build and the full 577-test suite pass at that exact commit, measured twice by different sessions.**
>
> **What you are shipping with, all of it known and none of it new:**
> - **Two of the four production files have no test that runs them** — the layout's mount and the
>   provider's effect, including the new clear-to-nothing path. **BC-18, BC-19a and BC-19b are the only
>   thing that covers them, they are your eyes, and they still take ten minutes locally.** You already
>   said proceed rather than run them; this restates the cost, it does not re-ask the order.
> - *[one bullet struck under **D44**, plan rev 39, commit `13a6e66`; elision marked so the quote stays
>   verifiable]*
> - **5712/5842 are still bad in production**, since the repair is not done.
> - **Rollback is the Vercel promote you chose. It does not move `master`, so the next push you make
>   re-deploys this.**
>
> **Do you want it pushed?**
>
> 1. **Yes — I push it.** I fast-forward `master` to `4a7126b` and push; Vercel deploys; I write the
>    record and BC-21 becomes checkable on the live site.
> 2. **Yes — you push it**, as you did last time. I record it with you named as the operator.
> 3. **Run BC-18/BC-19a/BC-19b first, then push.** Reverses tonight's order. Costs about ten minutes
>    and is the only thing that would put evidence under half this release.
> 4. **No — don't push it.** `4a7126b` stays on the chain branch, `a151fb4` keeps serving, nothing
>    changes. Still available tomorrow.

**If no answer comes, nothing is pushed** — a safety gate holds on silence, and this one is held
visibly and re-openably rather than dropped.

