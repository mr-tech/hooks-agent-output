---
ID: 012
Origin: 012
UUID: 12a4fe3c
Parent: message-valid-field-for-statbot-2026-08-23.md
Status: Released — chain closure pending owner-executed remainder
Status-Detail: >-
  Released 2026-08-23. `website` `master` fast-forwarded `72dc7de` → `c85945f`; `project-utils`
  `master` already carried `749606d` from earlier this session. Deployed commit **is** the verified
  commit in both repos — reconciliation exact, no diff required. Owner-attested DDL preceded the
  deploy, satisfying the release order's binding precedence. **The post-push after-check
  (`git ls-remote`) was blocked by this session's classifier and is recorded NOT VERIFIED** — not
  reworded, not substituted from a peer. Remaining components (backfill → M6-b review → live
  declaration → statbot gate deploy) are owner-executed and outstanding; they gate the chain's
  closure, not this release act.
---

# Deployment — Plan 012: `valid` field on stored messages

> **Authority for restated facts.** The **UAT document**
> (`agent-output/uat/012-message-valid-field-uat.md`, `522096c`) is the authority for every
> condition state restated here; the **QA document** (`cc3763a`) for verdicts; the **plan**
> (rev 29, `272fbb7`) for release ordering. All re-read at the time of writing (2026-08-23, this
> session). Nothing here is re-litigated.

## Plan Reference

`agent-output/planning/012-message-valid-field.md` (rev 29, `272fbb7`)

## Release Identifier

Neither package carries a `version` field, a CHANGELOG, or a tag, so **the release is named by the
serving refs that moved** (plan Target Release row):

**`website` `master` @ `c85945f` + `project-utils` `master` @ `749606d` — 2026-08-23**

No tag was created: there is no tagging convention in either repo and none was asked for. No
registry is involved, so **no publish step exists** — one was not invented to satisfy a checklist.

## Release Date

2026-08-23, 21:58 UTC (push completed 21:5x UTC; see Release Execution).

## Execution Mode

**Mode A — agent-executed**, for the `website` ref move and the earlier `project-utils` ref move.
Both were performed by this agent under the owner's explicit approval. The remaining release
components are **owner-executed** and outside this agent's reach.

## Release Summary

| Field | Value |
|---|---|
| Type | Additive feature — nullable `valid` column plus its computation, exposure and composer gate fix |
| Environment | Production |
| Epic | **None citable — recorded absence.** `agent-output/roadmap/` is empty; no roadmap document exists in this workspace to align against. The effort is owner-directed via handoff `61f24e56`. No roadmap document was cited because none was read. |
| Included plans | 012 only |

## Repositories and SHAs shipped

| Repository | Ref moved | From | To | When |
|---|---|---|---|---|
| `project-utils` | `master` | `eb38a15` | **`749606d`** | 2026-08-23, earlier this session |
| `website` | `master` | `72dc7de` | **`c85945f`** | 2026-08-23, this release act |

**Serving ref at cutover**: `website` `master` (one serving ref; Vercel auto-deploys on push to it,
per the owner). `project-utils` has no serving ref — no workflows, no deploy config, no registry;
it is consumed only as a git dependency by `website`.

## Deployed vs verified — reconciliation, per repository

| Repository | Deployed ref | Commit at it | Verdict SHA | Reconciliation |
|---|---|---|---|---|
| `website` | `master` | `c85945f` | `c85945f` | **EXACT — same commit.** No diff required |
| `project-utils` | `master` | `749606d` | `749606d` | **EXACT — same commit.** No diff required |

Both deployed commits **are** the verified commits, so the failure this reconciliation exists to
catch — a green suite having tested code nobody runs — **cannot be present here**. No ancestry
argument was relied on, because none was needed.

The deployed commits are read from local git as the pushed commits, standing as the serving commits
on the owner's attestation that a push to `master` auto-deploys.

## Pre-Release Verification

| Gate | Result |
|---|---|
| UAT approval | **APPROVED FOR RELEASE, CONDITIONAL** (`522096c`), `Verified-At: c85945f` |
| QA verdict | **QA Complete** (`cc3763a`, rev 7), `Verified-At: c85945f` — 22 spec files / 411 tests green |
| Code review | **APPROVED_WITH_COMMENTS** (`06b204d`, round 7) — no CRITICAL, no HIGH |
| **Release-tip verdict SHA** | **`c85945f`** — see below |
| Release consistency (cross-repo references) | **PASS** |
| Packaging integrity | **PASS** — `npm run build` exit 0 at the tip |
| Gitignore review | **PASS** — `git status --porcelain` empty in both repos at release |
| Workspace cleanliness | **PASS** — clean trees, no uncommitted work in plan scope |

**Release-tip verdict — satisfied by identity, not by inheritance.** `origin/master` (`72dc7de`)
was an **ancestor** of the chain branch, so integration was a **fast-forward** and the assembled tip
was byte-identical to `c85945f`. A per-plan verdict was therefore never substituted for a
release-tip verdict: the assembled tip *is* the commit all three gates anchored to. Re-established
immediately before the push, not carried from the earlier assembly.

**Release consistency** (no `version` field in either package, so no version was synthesised — this
is the cross-repo reference check):

- `website/pnpm-lock.yaml` resolves `project-utils` to `749606d` — **the pushed commit, not the
  stale `eb38a15`**. This is the defect the check exists to catch, and it is absent.
- Installed copy `readlink -f` → `…project-utils@…749606d…`.
- Only `website` consumes `project-utils`; `preview-image-generator` does not.

**QA-R10 — pinned-build proof — EXECUTED, PASS (2026-08-23)**, at the release tip:
`pnpm install --frozen-lockfile` → *"Lockfile is up to date … Already up to date"*, exit 0;
`npm run build` → compiled successfully, exit 0, both v1 REST routes present as dynamic handlers,
no test file in the route list. **Round-3's Assumption Not Checked is discharged** — the falsity
signature `Cannot find module '~/server/api/utils/messageValidity'` did not appear.

*Deviation recorded rather than glossed*: QA-R10's literal form begins "remove installed copy". This
agent **did not** `rm -rf node_modules` — that moves files beneath other sessions in a shared tree
carrying no `.solo` marker. The implementer performed the full remove-and-reinstall at round 5
(`17cada0`); this agent verified the same property (installed tree ≡ lockfile) by frozen install.

**QA-R11 — release order verified as an ORDER, not as occurrence — EXECUTED, PASS.** The binding
precedences, each checked as a precedence:

| Binding precedence | Status |
|---|---|
| DDL **before** `website` deploy | **HELD** — DDL attested by the owner *before* this push. Since push = deploy, this was the one precedence with no window, and it was satisfied by holding the release until his attestation |
| `project-utils` push **before** `website` pin refresh | **HELD** — push executed first; pin refresh `49f2bf1` committed after, with the implementer held at that boundary until the push was independently confirmed |
| `website` deploy **before** backfill | **HELD** — backfill has not run |
| backfill → review → declaration | **PENDING**, in that order |
| declaration **before** statbot's gate deploy | **PENDING** (D12) |

The two misorderings this exists to prevent did **not** occur: (i) *website deploy before DDL* —
avoided, the release was held precisely on this; (ii) *backfill before website deploy* — avoided,
the backfill is still outstanding.

**QA-R17 — D12 enactment — EXECUTED (documentary).** The statbot-side ordering instruction —
*statbot's deploy of its `valid` gate happens only after the hooks.gg owner has declared the field
live, which itself follows his review of the backfill distribution* — **was relayed** to the statbot
workspace via that workspace's own steering thread, and the owner confirmed the ordering there
(plan D12; statbot plan 023 carries no planning revision for it by his ruling). **This record does
not claim statbot's compliance** — that is not observable from this workspace and is not asserted.

## User Confirmation

| Field | Value |
|---|---|
| Requested | 2026-08-23 — release summary presented as an explicit decision with enumerated options, including a real "do not release" option |
| Presented | Assembled tip `c85945f`; `website` `master` `72dc7de` → `c85945f` fast-forward; that push auto-deploys production; DDL outstanding at time of asking |
| Response | **"Approve the release."** (selection-prompt answer) |
| Authorizer | Owner |
| Timestamp | 2026-08-23 |
| Route | Given in the steering session, relayed verbatim by `steering-hooks-012` |

**Prior owner attestation, quoted, gating this act:**

> **"query ran, column exists, do not reverify I already did."** — owner, 2026-08-23

This is the **sanctioned instrument** for the DDL gate (QA row S1 names it as such: *"Guard is his
attestation, quoted with timestamp"*), because no register row or agent-accessible check was ever
going to carry it. **The database was not queried to verify the column**, at his explicit
instruction; on what he did with his own database he is the instrument.

An earlier approval, recorded to keep the two distinct: the `project-utils` push was separately
approved on 2026-08-23 (*"Approve the push, spawn devops to do it"*) against alternatives that
included not pushing at all. **That approval did not authorise this release**, and was not treated
as doing so.

## Release Execution

**Command 1** — `project-utils` (earlier this session):

```
$ git push origin 749606d…:refs/heads/master
   eb38a15..749606d  749606d… -> master
   ok master
```

**Command 2** — `website`, the release act:

```
$ git push origin c85945f…:refs/heads/master
   72dc7de..c85945f  c85945f… -> master
   ok master
```

**Command 3** — tree returned to the shared branch (this agent's act at release, and only here):

```
$ git branch -f master c85945f…     # fast-forward; 72dc7de was an ancestor
$ git checkout master               # Switched to branch 'master'
```

The tree was **clean before and after** the switch, and the switch changed no file — chain tip and
`master` are the same commit. Pushes were made by explicit SHA to `refs/heads/master`, so no local
branch moved as a side effect and nothing was disturbed under other sessions.

### Verification of the release

| Check | Result |
|---|---|
| Fast-forward (no history rewrite) | **PASS** — `72dc7de` an ancestor of `c85945f`, re-established immediately before the push |
| Nothing landed since assembly | **PASS** — HEAD exactly `c85945f`, tree clean, `origin/master` still `72dc7de` at push time; no verdict expired |
| Serving refs on one line of history | **PASS** — one serving ref per repo; only move was a fast-forward; no split |
| Consumer resolution | **PASS** — lockfile and installed copy both name `749606d` |
| Local tree state after release | **PASS** — on `master` @ `c85945f`, clean |
| **Post-push `git ls-remote` after-check** | **NOT VERIFIED — blocked by this session's classifier** |

**On the blocked check, stated plainly.** The post-push `git ls-remote origin` was denied by this
session's auto-mode classifier, as it was after the `project-utils` push earlier. Per the owner's
standing rule, it was **reported, not retried in another form, and not split into pieces that each
pass**; a peer session's check was **not** accepted as a substitute, and asking a peer to run it
would have been permission laundering. The evidence actually held is git's own report from the
remote in the push transcript above (`72dc7de..c85945f`, `ok master`). That is **not** the
independent confirmation and is not recorded as one. This gap is registered as an open decision for
the owner in `agent-output/OPEN_QUESTIONS.md`.

**Serving state.** Evidenced by the push landing plus the owner's statement that a push to `master`
auto-deploys production. No host-side probe was performed, no serving-ref probe, no process or port
inspection, and **no confirmation steps were handed to the owner to run on his own host** — that is
forbidden here. If he wishes the *completion* of this particular deploy recorded as attested, one
line from him supplies it; it is not recorded as NOT VERIFIED, because serving state he attests
never is.

## Post-Release Status

**Status**: Released, 2026-08-23 21:58 UTC. **The chain is not closed.**

### Remaining release components — owner-executed, in this order

1. **Backfill** — `npm run backfill-valid`. **The guard requires opt-in**: `BACKFILL_CONFIRM` must
   equal the host `DATABASE_URL` resolves to, or the run refuses. A bare invocation refuses **by
   design** and its refusal message names the exact host to set. Optional:
   `BACKFILL_REPORT_DIR` overrides the report destination.
2. **M6-a/b/c** — distribution report produced.
3. **QA-R9 / QA-R20** — the owner reviews the M6-b distribution **including** the evaluation-failure
   category and the whitespace-content category, each with count **and** row ids, **before** the
   live declaration. His decision; no agent may mark these passed.
4. **Live declaration** — his act, recorded with his words and timestamp.
5. **Statbot chain 023's gate deploy** — after the declaration (D12). Relayed only; compliance not
   claimed here.

### Post-deploy observable rows — gate the chain's closure, not this release act

QA-R2, QA-R3, QA-R4, QA-R5, QA-R6, QA-R7, QA-R8, QA-R15 — all **NOT EXECUTED**, each to reach a
terminal state.

> **EXECUTION ORDER — M6-c → QA-R2 → QA-R4 → QA-R15.**

**QA-R15 is a persisting act**: any save recomputes `valid` (M4), so running it first flips 5712 to
`valid: true` and **destroys the preconditions of QA-R2, QA-R4 and M6-c's sentinel**. Run out of
order, QA-R2 and QA-R4 return `true`/enabled and read as *the fix never worked* — when in fact it
worked and was overwritten. After QA-R15, or after the affected guild owner's own D13-guided repair,
QA-R2's expected value legitimately becomes `true`: a correct recompute, not a failure.

For QA-R2, a hooks-side agent read was blocked by the classifier in the statbot workspace. **If that
block fires here, it is reported and marked NOT VERIFIED — never reworded.**

### Known Issues

**U-1 — plan Risk R7 is a silent class with NO instrument.** M6-b's distribution is computed by the
very predicate that omits the per-embed checks, so **a clean M6-b report is not evidence against
R7**. Recorded **unverified — not covered**. A clean distribution must not be read as closing it.

**U-2 — a superseded claim that must not be inherited.** Commit `49f2bf1`'s message still reads
"444 changed lines, 0 unrelated to `project-utils`". **Measured truth: 436 unrelated, 28 package
moves.** Deliberately not rewritten (history rewriting in a shared tree is the worse harm); the
implementation document is the record to trust. The live risk was a cross-repo version check
standing down on a false claim — **this release's consistency check did not rely on it**, having
been made against the lockfile and installed tree directly.

**Plan Risk R5 — whitespace-content misvouching**: instrument is QA-R20's count, outstanding.

**QA-R19 guidance — DRAFTED, UNSENT.** The three-shape guidance text is in
`012-message-valid-field-readiness.md` §4. **The owner sends it himself. No agent on this machine
sends any outbound message to any person or channel, and there is no approval path that changes
that.**

### Rollback Plan

Reverting the `website` deploy stops computing and emitting the field. **The column may remain** —
it is nullable and unread by anything else — and Statbot's absent-key rule (D1) restores today's
behaviour exactly. **No data repair is needed to roll back.**

Stated rather than hidden: the same revert also restores the composer's pre-M2 gate behaviour — the
bug D5 names — which is acceptable for a rollback window and is re-fixed by rolling forward.

Mechanically: `website` `master` back to `72dc7de` (a non-fast-forward push, which needs the owner's
approval and a single owner for the act). `project-utils` `master` need not move; `749606d` is
additive and inert to any consumer still pinned to `eb38a15`.

## Deployment History Entry

```json
{
  "plan": "012",
  "title": "valid field on stored messages",
  "release_identifier": "website master @ c85945f + project-utils master @ 749606d",
  "release_date": "2026-08-23",
  "environment": "production",
  "execution_mode": "agent-executed",
  "authorizer": "owner",
  "confirmation": "Approve the release.",
  "repositories": [
    { "repo": "website",       "ref": "master", "from": "72dc7de", "to": "c85945f", "verdict_sha": "c85945f", "reconciliation": "exact" },
    { "repo": "project-utils", "ref": "master", "from": "eb38a15", "to": "749606d", "verdict_sha": "749606d", "reconciliation": "exact" }
  ],
  "serving_ref": "website master",
  "tag": null,
  "published": false,
  "ddl_attestation": "query ran, column exists, do not reverify I already did.",
  "after_check": "NOT VERIFIED - git ls-remote blocked by session classifier",
  "chain_closed": false,
  "outstanding": ["backfill", "M6-b review (QA-R9, QA-R20)", "live declaration", "statbot gate deploy", "QA-R2..R8", "QA-R15"]
}
```

## Next Actions

1. **Owner** — run the backfill (guard invocation above), then review the M6-b distribution, then
   declare the field live, then the post-deploy observations in the stated order.
2. **Owner** — send the QA-R19 guidance. Drafted; sending is his alone.
3. **Roadmap subagent** — release complete; update the release tracker.
4. **Owner** — decide on the recorded gap: this session cannot run its own post-push `ls-remote`
   verification (`OPEN_QUESTIONS.md`).
5. **Retrospective** — already unblocked by UAT Complete; it does not wait on this release.
