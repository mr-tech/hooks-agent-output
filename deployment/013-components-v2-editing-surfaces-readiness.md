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
  against the chain**.
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

### F-3 — Three release conditions are hostage to owner actions that nothing sequences against the chain

Same shape in all three: an action outside the chain that leaves every criterion's *wording* intact
and moves what it *measures*.

1. **Validation item 8 — the D19 repair.** M8-G's production-reachable observation exists **only
   while 5712 and 5842 are unrepaired.** The repair is the owner's, outside the plan; the observation
   is 013's UAT, inside it. He has minted and not repaired, so the observation is still available
   **today**. If the repair runs first, the population is empty and the central new behaviour D18
   introduces ships on suite evidence alone — permanently, and the deployment record must then say
   M8-G was not observed in production **for that reason**. What the plan forbids is the two being
   ordered by accident, which is exactly what an unscheduled repair produces.
2. **BC-11b — the seeds.** The last non-terminal pre-release row runs against records **5855 and
   5856**. Their retention is *steering's instruction, not an owner ruling*, and **D20 left their
   disposition expressly unruled.** A deletion forecloses the only blocking condition left standing.
3. **U-1 — the seeds again, on the other side.** Those records are permanent members of the category
   012's classifier counts, so after his D19 repair the classifier reads **2** where he expects
   **0**: **a working repair will look like a failed one**, at the moment he is checking whether it
   worked. One of the three candidate remedies is a line in the deployment record naming the source
   class — **that line is devops's to write and I have adopted no remedy**, because the choice is
   unresolved and plan-touching. It folds into the R-5 decision, not into this document.

None of the three is mine to resolve. All three are cheaper to sequence now than to discover at the
release act.

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
| Q4 | **Disposition of seeds 5855/5856**, which D20 expressly left unruled (F-3.2). | His records; retention today rests on a steering instruction. | Retention holds by default; a deletion would foreclose BC-11b. |
| Q5 | **Ordering of the D19 repair against M8-G's observation** (F-3.1). | The repair is his action outside the plan. | The two get ordered by accident, which plan item 8 exists to forbid. |

Silence holds each of these where it stands; nothing proceeds on an unanswered one.

## 8. What the deployment record will owe — flagged, not written

Recorded so the obligations are not rediscovered at the release act. **None of this is drafted here.**

- **R-4**, one line: 013 makes no live declaration of the `valid` field and triggers nothing in the
  statbot workspace (§6 — confirmed today).
- **R-5**, its widened form once he rules — the flows 6/8/11–14 statement, the D12 ingress source
  class, the R8 mode-change class, and the M8 no-new-members statement.
- **U-1's candidate remedy** — a line naming the source class so the classifier's expected residual
  reads as **2**, not **0**. Folds into the R-5 decision; **not adopted here**.
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

## 9. Go / no-go

**NO-GO for release.** Not on any artifact defect — every artifact-side gate reachable today passes,
and the build is green at the tip. The chain is simply not finished: M4 is in a fix round, **M6 has
not started**, QA Phase 2 is owed and claims no verdict SHA, code review is `In Review`, the UAT gate
is unstarted, and **BC-11b stands `NOT EXECUTED`**.

**Stage 1 is not open and no plan is committed for release.** When it opens, the route is: M4 → M6 →
QA Phase 2 → code review of the final tip → UAT verdict → Stage 1 → **R-5 widened by the owner** →
deployment record → his release approval → the single push in §2.

**Nothing here authorises anything.** Recorded so the release act is a decision and not a discovery.
