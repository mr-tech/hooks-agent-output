---
ID: 012
Origin: 012
UUID: 12a4fe3c
Parent: message-valid-field-for-statbot-2026-08-23.md
Status: Awaiting Release Approval
Status-Detail: >-
  Release assembled and verified. **Nothing has been pushed.** All artifact-side gates pass at the
  assembled tip `c85945f`. Two decisions are the owner's before any ref moves: (1) whether the
  production DDL has been executed, and (2) whether pushing `website` `master` is itself the
  production deploy. Both are recorded as OPEN, and the release act is held on them.
---

# Deployment Readiness — Plan 012: `valid` field on stored messages

**Prepared**: 2026-08-23 21:30 UTC
**Prepared by**: devops
**State**: **NOT RELEASED — awaiting the owner's approval of the release itself.**

> **Authority for restated facts.** The **UAT document**
> (`agent-output/uat/012-message-valid-field-uat.md`, `522096c`) is the authority for every
> condition state restated here; the **QA document** (`cc3763a`) for verdicts; the **plan**
> (rev 29, `272fbb7`) for ordering. All were re-read at the moment of writing (2026-08-23,
> this session). Nothing here re-litigates any of them.

## 1. Included plans

| Plan | Title | UAT decision | Target release |
|---|---|---|---|
| 012 | `valid` field on stored messages | **APPROVED FOR RELEASE, CONDITIONAL** | Serving refs moving in `project-utils` + `website`; no version field or CHANGELOG in either package |

One plan in this release. No roadmap document exists in this workspace (`agent-output/roadmap/` is
empty) — **recorded absence, not an oversight**, and not a document I have cited. Epic alignment is
therefore not citable; the effort is owner-directed via handoff `61f24e56`.

## 2. The assembled release tip, and why its verdict is genuine

`website` `chain/012-message-valid-field` @ **`c85945f`**.

`origin/master` (`72dc7de`) is an **ancestor** of the chain branch
(`git merge-base --is-ancestor` → true; 9 commits ahead, verified this session). The integration is
therefore a **fast-forward**, and the assembled release tip is **byte-identical to `c85945f`** — no
merge commit, no new tree.

This matters for my release-tip verdict gate, which forbids accepting a per-plan verdict as a
substitute for a verdict on the assembled tip. **That substitution is not being made here.** The
assembled tip *is* `c85945f`, and `c85945f` is exactly what all three gates verified:

| Gate | Anchor | Result |
|---|---|---|
| QA (`cc3763a`, rev 7) | `Verified-At: c85945f` | **QA Complete** — 22 spec files / 411 tests green, re-anchored from `17cada0` |
| Code review (`06b204d`, round 7) | `Reviewed-At: c85945f` | **APPROVED_WITH_COMMENTS** — no CRITICAL, no HIGH |
| UAT (`522096c`) | `Verified-At: c85945f` | **APPROVED FOR RELEASE, CONDITIONAL** |

**Release-tip verdict gate: SATISFIED**, by identity rather than by inheritance.

The 9 commits: `a7ebe4d`, `bc5ee2b`, `681c353`, `eb28ae6`, `ff753a6`, `f983508`, `49f2bf1`,
`17cada0`, `c85945f`.

## 3. Cross-repo reference check (Core Responsibility 3)

Neither package carries a `version` field or CHANGELOG. Per my own definition I therefore **do not
synthesise a version**; the check is that every cross-repo reference names the intended target.
This is the check whose whole purpose is to catch a consumer left pinned to a stale commit.

| Reference | Value | Verdict |
|---|---|---|
| `website/package.json` → `project-utils` | `github:hooks-gg/project-utils#master` | Branch spec, unchanged by design |
| `website/pnpm-lock.yaml` resolution | `…#749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f` | **PASS — names the pushed commit, not the stale `eb38a15`** |
| Installed copy | `node_modules/.pnpm/project-utils@…749606d…` (`readlink -f`) | **PASS — resolves only to `749606d`** |
| Consumers of `project-utils` | `website` only (`preview-image-generator` does **not** consume it) | Enumerated from the workspace, not assumed |

**`project-utils` local `master` is STALE at `eb38a15`; `origin/master` carries `749606d`.**
Verified this session: `rev-parse master` → `eb38a15`, `rev-parse origin/master` → `749606d`. A
build resolving the *local* branch would get the old commit. The lockfile pins the SHA, so no
install is affected — but the distinction is recorded because it is exactly the kind of ambiguity
that produces a false "already released" reading.

## 4. Pre-release condition rows owned by devops

### QA-R10 — Pinned-build proof — **EXECUTED, PASS, 2026-08-23** (at the release tip)

Run by me this session at `c85945f`, against a clean tree:

```
$ pnpm install --frozen-lockfile
Lockfile is up to date, resolution step is skipped
Already up to date                                    → exit 0

$ npm run build
✓ Compiled successfully in 8.5s
  Running TypeScript ...
✓ Generating static pages (9/9)
Route (pages): … ƒ /api/v1/guilds/[guildId]/messages
               ƒ /api/v1/guilds/[guildId]/messages/[id]   → exit 0
```

Both v1 REST routes are present as dynamic handlers; **no test file appears in the route list** —
the defect class fixed at `17cada0` (a spec file inside the `next build`-scanned tree) has not
recurred at the tip. The tip's only delta from `17cada0` is two test files, in
`src/scripts/__tests__/` and `src/utils/__tests__/`, both outside that tree.

**Round-3 Assumption Not Checked — DISCHARGED.** The assumption was that installed `node_modules`
matches `pnpm-lock.yaml`. `--frozen-lockfile` reported the lockfile up to date with nothing to
change. The named falsity signature — `Cannot find module '~/server/api/utils/messageValidity'` —
**did not appear**; the module is present at `src/server/api/utils/messageValidity.ts`.

**Deviation, recorded rather than glossed.** QA-R10's literal form begins "remove installed copy".
**I did not `rm -rf node_modules`.** That step moves files beneath other sessions in this shared
tree — the class the workspace rules say to propose and wait on, never to run on my own
initiative — and this repo carries **no `.solo` marker**, so I must assume other sessions. The
implementer *did* perform the full remove-and-reinstall at round 5 (`17cada0`), recorded in the
implementation document. I verified the property that step exists to establish — installed tree
identical to the lockfile — by frozen install instead. **If the owner wants the cold-install form
repeated at the tip, say so and I will run it**; it is a one-command difference and needs only his
word that no other session is mid-work.

### QA-R19 — D13 three-shape guidance — **DRAFTED** (this section is the artifact)

Drafting is mine. **Sending is the owner's, and no agent on this machine sends any outbound
message to any person or channel — there is no approval path for that.** I draft and stop.

> **Draft for the release note — guidance to affected guild owners**
>
> Some saved messages carry an internal "Components V2" marker that no longer matches their actual
> contents. The composer now correctly refuses to send these, and the repair depends on **what the
> message contains**. Please follow the line for your message's shape — the other routes will
> discard part of it.
>
> 1. **Message has text, but no components** (this is the common case, and the shape of the
>    known affected record). Open the message, use the **JSON editor** and press **Load**. This
>    clears the stale marker and **keeps your message text**. Do *not* use the mode toggle for this
>    shape — it destroys the text.
> 2. **Message has components, but no text.** Use the **mode toggle** (switch V2 → classic). This
>    clears the marker and **keeps your components**. Do *not* use the JSON editor for this
>    shape — it destroys the components.
> 3. **Message has both text and components.** **There is no route that preserves both.** You must
>    choose: the **JSON editor / Load** keeps the **text** and loses the components; the **mode
>    toggle** keeps the **components** and loses the text. Copy whichever side you need elsewhere
>    before you start, then rebuild it after.
>
> After the repair, save the message; it should become sendable again.

Cell mapping, per QA-R19: (i) = B5 / record 5712, (ii) = B4, (iii) = B3.

### QA-R11 — Release order verified as an **order** — discharged at the release act
### QA-R17 — D12 relay recorded — discharged at the release act

For QA-R17 the record will state that the ordering instruction was **relayed** to the statbot
workspace via that workspace's own thread, and will **not** claim statbot's compliance — which this
workspace cannot observe and must not assert.

## 5. Two open questions that gate the release act — the owner's, not mine

### OPEN-1 — Has the production DDL been executed?

The release order's **first** component is the owner-executed DDL. **No register row records it as
executed**, and I have no evidence either way; I will not infer it.

The misordering this guards against is named in the plan as failure (i): *website deploy before
DDL* → the upsert names a column the production table lacks, and **every message save fails**, from
deploy until the DDL lands. This is the single highest-consequence ordering fact in the release.

### OPEN-2 — Does pushing `website` `master` itself deploy production?

Established from the repo's own configuration: `website` carries `vercel.json` (crons only) and
`.vercel/project.json` (project + org id). **That establishes Vercel as the platform. It does not
establish whether a push to `master` auto-deploys production**, and my rules forbid treating a
mechanism inferred from other repos, or from a relayed remark, as established.

This is not academic. If push = deploy, then **"before merge" and "before deploy" are the same
instant**, and OPEN-1's DDL must be complete *before* the push — there is no window between them in
which to check.

**Conservative posture pending his answer:** treat the push as deploying, and therefore require the
DDL first.

## 6. Serving refs — one line of history

Enumerated from each repo's own inventory, not from a count of refs moving:

| Repo | Serving ref | Current | Would become | Ordering |
|---|---|---|---|---|
| `project-utils` | `master` | `749606d` | unchanged (already pushed) | — |
| `website` | `master` | `72dc7de` | `c85945f` | **fast-forward**, strictly ahead |

`website`'s other remote branches — `backup`, `external-message-api`, `redesign`, `regex-refactor` —
are not serving refs. One serving ref per repo, so the pairwise containment condition is vacuous,
and the only move is a fast-forward. **No split-history hazard.**

## 7. Workspace cleanliness

- `website` working tree: **clean** (`git status --porcelain` empty).
- `project-utils` working tree: clean; local `master` stale as recorded in §3.
- Neither repo carries a `.solo` marker → **shared tree assumed throughout.** I staged nothing,
  committed no source, and switched no branch.

## 8. U-1 — carried into the release record as required

**Plan Risk R7 is a silent class with no instrument.** M6-b's distribution is computed by the very
predicate that omits the per-embed checks, so **a clean M6-b report is not evidence against R7**.
Recorded here, and to be carried into the deployment document, as **unverified — not covered**. A
clean distribution must not be read as closing R7.

## 9. U-2 — the claim I must not inherit

Commit `49f2bf1`'s message still reads "444 changed lines, 0 unrelated to `project-utils`".
**Measured truth: 444 changed lines, of which 436 are unrelated, moving 28 package names**
(`@babel/*` `7.29.0`→`7.29.7` and peer re-resolutions through `next`, `@trpc/next`,
`@vercel/analytics`, `@vercel/speed-insights`). The message was deliberately left unrewritten —
rewriting history in a shared tree is the worse harm — and **the implementation document is the
record to trust.**

I record this explicitly because the live risk is precisely mine: **a cross-repo version check
standing down on a false "0 unrelated" claim.** My §3 check did not rely on that claim; it was made
against the lockfile and the installed tree directly.

## 10. Execution mode

**Mode A — agent-executed**, for the `website` ref move, *if* the owner approves and answers §5.
The remaining five components (DDL, backfill, distribution review, live declaration, statbot gate
deploy) are **owner-executed** and outside this agent's reach.

## 11. Go / no-go

**Artifact side: GO.** Every gate I own passes at `c85945f` — release-tip verdict, cross-repo
references, pinned-build proof, packaging, workspace cleanliness, serving-ref ordering.

**Release act: HELD.** Not on any artifact defect, but on:
1. The owner's approval **of the release** (he approved waking this session; that is not approval
   to push), and
2. OPEN-1 (DDL executed?) and OPEN-2 (does the push deploy?).

## 12. Post-release status (to be completed after execution)

Post-deploy-observable rows gate the chain's **closure**, not the release act, and each must reach a
terminal state: QA-R2, QA-R3, QA-R4, QA-R5, QA-R6, QA-R7, QA-R8, QA-R15; plus QA-R9 and QA-R20
before the live declaration.

**Execution order — carried forward, because getting it wrong inverts the result:**

> **M6-c → QA-R2 → QA-R4 → QA-R15.**

QA-R15 is a **persisting act**: any save recomputes `valid`, so running it first flips 5712 to
`valid: true` and destroys the preconditions of QA-R2, QA-R4 and M6-c's sentinel. Run out of order,
QA-R2 and QA-R4 read as *the fix never worked* when in fact it worked and was overwritten.

Note for QA-R2: a hooks-side agent read was **blocked by the classifier** in the statbot workspace.
**If that block fires here, I stop and report — never reword.**
