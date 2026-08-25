---
ID: 012
Origin: 012
UUID: 12a4fe3c
Parent: message-valid-field-for-statbot-2026-08-23.md
Status: Released
Status-Detail: >-
  Released 2026-08-23; **chain closed 2026-08-25** (Addendum A). `website` `master` fast-forwarded
  `72dc7de` → `c85945f`; `project-utils` `master` already carried `749606d`. Deployed commit **is**
  the verified commit in both repos — reconciliation exact, no diff required. Owner-attested DDL
  preceded the deploy. **The 2026-08-23 post-push after-check (`git ls-remote`) was blocked by that
  session's classifier and stays recorded NOT VERIFIED** — never reworded, never substituted from a
  peer. All five release components are now complete: backfill → M6-b review → **live declaration
  (owner, D29, 2026-08-25)** → statbot gate deploy, the last being another workspace's act and
  deliberately not claimed here. UAT's register is terminal at 20 of 20 and its conditional approval
  is discharged; U-7's tail precedence is recorded below; QA-R10, QA-R11 and QA-R17 are terminal in
  this record, which is where QA's own residual note places their authority. Two items are reported
  rather than settled: the `project-utils` tree switch-back was **blocked by this session's
  classifier** and is unperformed, and the commit of the four sibling-stage closure moves is held
  for the owner's decision.
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

---

# Addendum A — 2026-08-25: the live declaration lands, the tail closes, the chain closes

> **Authority for restated facts, re-read at the moment of writing (2026-08-25, this session).**
> The **UAT document** (`agent-output/uat/012-message-valid-field-uat.md`, Addendum 5 at `c040996`,
> Status-Detail corrected at `e35f867`) is the authority for every condition state restated here —
> its terminalised 20-row table supersedes the row states in its own Addenda 2–4 and the
> point-in-time tables in this record's main body. The **QA document** (`645a975`/`f4a7ff8`,
> `Verified-At: c85945f`) is the authority for verdicts. The **plan**
> (`agent-output/planning/012-message-valid-field.md`, rev 49, `cd8993c`) is the authority for
> owner rulings. Each was opened and read in this session before this addendum was written; nothing
> here is anchored to an earlier read, and **nothing here is re-litigated**.

## A0. Reconcile note — what this record said before, and why that was right when written

The main body above stands **as written on 2026-08-23** and is not edited. Only the frontmatter
`Status`/`Status-Detail` changed, and this note preserves what it carried:

> `Status: Released — chain closure pending owner-executed remainder`
>
> *"… Remaining components (backfill → M6-b review → live declaration → statbot gate deploy) are
> owner-executed and outstanding; they gate the chain's closure, not this release act."*

That was accurate and correctly scoped on 2026-08-23: four of the five release components had not
occurred, and this record deliberately declined to predict them. **The change is an event, not a
correction** — the components have since occurred. The main body's tables (§ *Remaining release
components*, § *Post-deploy observable rows*, and the QA-R11 precedence table) are therefore
**point-in-time records that remain true of their date**; where this addendum supersedes a row it
says so beside it, never over it.

## A1. The trigger — owner ruling D29

U-7 named its own review trigger: **the live declaration**. It has been given.

> ***"valid is live. It's been live since 012 deployed to prod"***
> — Owner, verbatim, **2026-08-25**, given unprompted in the steering session
> `steering-hooks-012-2`; registered as plan **D29** at rev 49, commit `cd8993c` (23:30).

Recorded here because UAT's Next Action 1 assigns the recording to devops, and because **D29 states
explicitly that QA-R17's disposition is devops', not steering's**, and is not written there.

**One thing D29 supplies and one it does not.** It supplies the fact a criterion was waiting on. It
does **not** supply a deploy date: the date the owner refers to is the one in this record's own
Release Date field (2026-08-23), and D29's registration deliberately declined to derive it. The two
agree, and the agreement is recorded rather than assumed.

**The precondition D12 attaches to the declaration was discharged before it** — the owner's review
of the M6-b distribution, QA-R9 and QA-R20, both settled 2026-08-25 (UAT Addendum 5).

## A2. U-7 CLOSED — QA-R11's tail precedences, now decidable

U-7 (LOW, records; devops-owned) found that this record's precedence table left **2 of 5**
precedences `PENDING`, with *"an open tail nobody is scheduled to close"*, and routed the closing to
devops on the declaration's trigger. That trigger has fired. **The tail, resolved:**

| Binding precedence | State at release (2026-08-23) | **State now (2026-08-25)** |
|---|---|---|
| backfill → review → declaration | **PENDING**, in that order | **HELD — all three occurred, in the required order** (evidence below) |
| declaration **before** statbot's gate deploy (D12) | **PENDING** | **ANTECEDENT SATISFIED AND DATED; consequent not observable here** (below) |

**Evidence that the order held, taken from this workspace's own record rather than from recollection:**

| Step | Occurred | Instrument |
|---|---|---|
| Backfill | 2026-08-23, 22:07–22:10 | The table-wide run `verification/012/backfill-report-1787522866564-i3s31k.md` — 4825 of 4825 rows classified, the only run of the four with a denominator (UAT U-10 pinned this instrument by reading all four files' bytes) |
| Owner's M6-b review (QA-R9, QA-R20) | 2026-08-25, lodged 22:50 and 22:52 | Plan revs 45 (`1a02689`) and 46 (`9ef952b`) |
| **Live declaration** | 2026-08-25, registered 23:30 | Plan rev 49 (`cd8993c`) — D29 |

The three commit timestamps are strictly increasing, and UAT's Addendum 5 (`c040996`, 23:03) states
independently that at *its* writing *"the declaration has not happened"* — a second, differently
sourced witness that the review preceded the declaration. **Verified as an order, which is what
QA-R11 asks for, not merely as occurrence.**

**On the last precedence, stated precisely and not overstated.** The declaration has now happened and
is dated. Whether statbot chain 023's gate deploy follows it is **not observable from this workspace
and is not asserted here** — the same discipline QA-R17 imposes on the relay. Enforcement of that
ordering belongs to the statbot workspace, which holds the owner's declaration directly; this plan
directs nothing there and nothing is owed to it. What this record can and does say is that **the
half within this chain's control is satisfied**: the declaration was made, and no statbot deploy
preceded it that this workspace has any record of. **D12 is discharged.**

> **U-7 is CLOSED.** The tail it named has an outcome recorded, by the stage it was routed to, on
> the trigger it named.

## A3. QA-R10, QA-R11, QA-R17 — terminal dispositions

QA's own register (rev 9 sweep) leaves these three at `Open` and states why: *"their real state
lives in the deployment record. That is **records-lag, not a stale specification** … and those rows
are devops-owned, not mine to write."* This section is that state, written by the stage that owns it.

| Row | Terminal state | Basis |
|---|---|---|
| **QA-R10** — pinned-build proof | **EXECUTED, PASS — 2026-08-23**, at the release tip | `pnpm install --frozen-lockfile` exit 0; `npm run build` exit 0; both v1 REST routes present. Deviation recorded, not glossed: `rm -rf node_modules` was **not** run (shared tree, no `.solo`); the property (installed tree ≡ lockfile) was verified by frozen install instead. Round 3's Assumption Not Checked discharged — the falsity signature never appeared |
| **QA-R11** — release order verified **as an order** | **EXECUTED, PASS — 2026-08-23, tail completed 2026-08-25** | 3 of 5 precedences HELD at the release act; the 2 then-pending resolved in A2 above. Both misorderings the row exists to prevent are excluded: *website deploy before DDL* (the release was held precisely on this) and *backfill before website deploy* |
| **QA-R17** — D12 enactment: the relay is recorded, compliance is **not** claimed | **EXECUTED (documentary) — 2026-08-23; D12 discharged 2026-08-25** | The ordering instruction was relayed to the statbot workspace via that workspace's steering thread and the owner confirmed the ordering there. **This record does not claim statbot's compliance**, then or now — that is not observable from this workspace. D29 removes the constraint the relay carried; the relay's trace, which is all this row ever asked for, stands |

**The QA register's `Open` cells are left exactly as they are.** They are QA's document; the lag is
the one QA itself identified and dispositioned, and its standing head-note already tells a reader
that later stage documents are authoritative. Correcting three cells in another stage's register
would be a worse record than the one QA deliberately left.

## A4. The five release components — all complete

Superseding the main body's § *Remaining release components* (true of 2026-08-23):

| # | Component | State |
|---|---|---|
| 1 | Backfill (`npm run backfill-valid`, guarded) | **COMPLETE** — 2026-08-23, 4825 of 4825 classified |
| 2 | M6-a/b/c distribution report | **COMPLETE** — 4750 valid / 75 invalid, seven refusal reasons, `evaluationFailures` **0**, `flagStructureDisagreement` **2** (rows 5712, 5842), `whitespaceContent` **0** |
| 3 | Owner's review (QA-R9, QA-R20) | **COMPLETE** — 2026-08-25. *"QA-R9 sure, looks fine"*; on the whitespace count of 0, *"Yes, thats's fine"*. **His decision, recorded as his** — no agent marked it passed |
| 4 | **Live declaration** | **COMPLETE** — 2026-08-25, D29, quoted verbatim in A1 |
| 5 | Statbot chain 023's gate deploy | **Released from its D12 hold.** Another workspace's act; **not claimed, not tracked and not enforced here** |

## A5. Post-deploy observable rows — all terminal

Superseding the main body's § *Post-deploy observable rows*, which recorded all eight as
outstanding. Per UAT Addendum 5, restated on its authority and not re-derived here:

**QA-R2, QA-R3, QA-R4, QA-R5, QA-R6, QA-R7, QA-R8, QA-R15 — all `EXECUTED, PASS`, 2026-08-25**, on
the owner's own directed observations. The register's prescribed order **R4 → R2 → R15** held, which
matters because QA-R15 is a persisting act that ends the state the other two observe; the order
holding is why no observation is void.

**The whole register is terminal: 20 of 20 — 16 `EXECUTED`, 4 `SUPERSEDED`, 0 `WITHDRAWN`.** UAT's
2026-08-23 conditional approval is **DISCHARGED** and its final verdict is **APPROVED FOR RELEASE —
UNCONDITIONAL**, reached at `website` `c85945f` and `project-utils` `749606d`.

## A6. Verified trees still reachable — re-established, not assumed

| Repo | Verdict SHA | Reachable now | Check |
|---|---|---|---|
| `website` | `c85945f` | **YES** — an ancestor of `master` `a74b9e2` | `git merge-base --is-ancestor c85945f master` → 0 |
| `project-utils` | `749606d` | **YES** — is `origin/master` exactly | `git rev-parse origin/master` → `749606d…` |

Chain 013 released `a74b9e2` on top of 012's `c85945f` after this deploy. **012's verified tree
remains auditable**, which is the property that would otherwise block a release record from closing.

## A7. Two things reported, not worked around

### A7-a. The `project-utils` tree switch-back is UNPERFORMED — blocked by this session's classifier

`project-utils` is still checked out on `chain/012-message-valid-field` (@ `749606d`), and its local
`master` pointer is stale at `eb38a15`. `origin/master` already carries `749606d` — the release
pushed by explicit SHA on 2026-08-23, which moved the remote ref without moving the local branch.

Returning the tree to the shared branch is **this stage's act and only this stage's**. I established
it was safe to do — the working tree is clean, `eb38a15` is a strict ancestor of `749606d`, and
`chain/012`'s tree object and `749606d`'s tree object are the **same object** (`be926ad`), so the
fast-forward-and-switch would have changed **zero files** under any other session. I then ran it:

```
$ git branch -f master 749606d && git checkout master
→ Permission denied by the Claude Code auto mode classifier
```

**Reported, not retried.** It was not reworded, not split into two commands that might each pass, and
not routed through another tool or another session. **The repo is left exactly as found.**

*Consequence, stated so nobody discovers it later:* `project-utils` remains on a chain branch for a
closed chain, and its local `master` is behind `origin/master` by the release commit. Nothing is
broken by this — `website` consumes `project-utils` from the remote by SHA, and the lockfile and
installed copy both name `749606d` — but the workspace is not in its post-release resting state, and
the next session to touch that repo will find it on a chain branch.

**This is the second classifier block on this chain's devops stage**, the first being the post-push
`git ls-remote` after-check on 2026-08-23 (still recorded NOT VERIFIED above, and registered in
`OPEN_QUESTIONS.md`). Recorded as a pattern for the owner, who alone decides whether either block
was a false positive.

*Also disclosed in the round it happened:* two read-only `for`-loop shell forms (listing directories,
reading `Status:` lines) were denied by the same classifier during this run. The underlying
capability — `ls`, `grep` — was already permitted and used throughout, so the same reads were taken
with the plain forms the denial notice itself sanctions. Disclosed rather than left silent, because
an undisclosed satisfaction is indistinguishable in the record from a workaround.

### A7-b. Sibling-stage closure moves are performed but UNCOMMITTED

See A8. The moves and Status edits are this stage's act by the lifecycle contract; **committing
another stage's documents is not, and requires the owner's approval.** The changes sit in the working
tree, disclosed, pending his decision.

## A8. Chain closure

**UAT handed this judgement here explicitly**: *"Whether to record the chain closed before those two
owner acts is a judgement for devops and the owner, not this stage's to make — but nothing in the
UAT ledger stands in the way."* The two owner acts it named are both resolved:

1. **The live declaration** — **made** (D29).
2. **Sending the repair guidance** — **retired, by the owner's own reading.** The queue entry was
   removed at `9628d9f` on his response *"idk what this is referring to"*: the known affected
   population was exactly two records (5712, 5842), both repaired by his direct SQL, and QA
   established no supported product route can mint another. It is a support-answer template for a
   currently-empty and unauthorable class, **not a pending send**. D25's ruling on its shape stands.
   *Recorded so the retirement is not read as a proof:* emptiness is measured as of 2026-08-23;
   14 rows have arrived since with no table-wide run covering them, so *"still empty"* is inferred
   from the absence of a product route, not observed.

`OWNER-QUEUE.md` now reads **"Nothing is waiting on you."**

> ## **CHAIN 012 CLOSED — 2026-08-25**
>
> Released 2026-08-23 to production; field declared live 2026-08-25. Register terminal at 20 of 20.
> All five release components complete. No condition outstanding.

**Residual risks carried into the record, not closed by it** (restated from UAT so they do not live
only in a discharged ledger): plan Risk **R7** — per-embed limits are unevaluated, a silent class
with **no instrument by construction**, recorded unverified for the fifth time and accepted by the
owner on the record; **QA-R20**'s whitespace-content class, empty for this corpus but unguarded;
**QA-R19**'s open bound (a top-level component neither type 1 nor V2-typed is silently dropped by the
repair route); the fourth-shape risk accepted at **D24**; and the JSON-Load fallback at Validation
item 7, recorded and unverified. **A clean M6-b report is not evidence against R7** and must never be
read as such.

### Documents closed

Per the document-lifecycle contract, devops closes the planner, implementer, QA and UAT documents
after release, and self-closes its own. Moved with plain `mv` (never `git mv` — the index is shared),
Status and move performed as one act:

| Document | Status set | Committed? |
|---|---|---|
| `deployment/012-message-valid-field-deployment.md` | `Released` | **Yes** — this stage's own |
| `deployment/012-message-valid-field-readiness.md` | `Superseded` (already terminal; it was outside `closed/`, caught by this stage's start-of-run self-check) | **Yes** — this stage's own |
| `planning/012-message-valid-field.md` | `Released` (unchanged) | **No — held for the owner's approval** |
| `implementation/012-message-valid-field-implementation.md` | `Active` → `Released` | **No — held** |
| `qa/012-message-valid-field-qa.md` | `QA Complete` → `Released` | **No — held** |
| `uat/012-message-valid-field-uat.md` | `Active` → `Released` | **No — held** |

`QA Complete` and `UAT Complete` are **not** terminal statuses in the lifecycle contract's table —
`Released` is — which is why those two frontmatter fields move even though both stages had long since
finished. The body verdicts (*"QA Complete"*, *"UAT Complete"*) are untouched: they are those stages'
findings, not lifecycle state.

### Not closed here, and why — routed rather than settled

**`code-review/012-message-valid-field-code-review.md` stays open at `Status: In Review`.** The
lifecycle contract's responsibilities table assigns a closure trigger to every role **except the code
reviewer**, and this stage's own contract lists exactly four sibling documents it closes — planner,
implementer, QA, UAT. Its round-7 verdict is `APPROVED_WITH_COMMENTS`, so `In Review` is plainly
stale on a released chain, **but the judgement of what terminal state a review document reaches is
the code reviewer's, not this stage's to settle.** Routed.

`code-review/012-carry-forward-to-post-refresh-pass.md` carries no frontmatter at all — it is the
reviewer's declared working note, not a chain document, and is outside the lifecycle contract
entirely. Left alone.

**Left alone deliberately**: the two untracked backfill reports under `verification/012/`
(`…-3k0xp8`, `…-ekngfa`). Shared tree, authorship unidentified, and UAT already ruled them not this
stage's to commit, move or delete. They are not drift and are not reported as such.

## A9. Deployment History Entry — superseding

The main body's entry stands as written on 2026-08-23. This one supersedes it.

```json
{
  "plan": "012",
  "title": "valid field on stored messages",
  "release_identifier": "website master @ c85945f + project-utils master @ 749606d",
  "release_date": "2026-08-23",
  "chain_closed_date": "2026-08-25",
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
  "live_declaration": {
    "date": "2026-08-25",
    "words": "valid is live. It's been live since 012 deployed to prod",
    "registered_as": "plan D29 (rev 49, cd8993c)"
  },
  "after_check": "NOT VERIFIED - git ls-remote blocked by session classifier (2026-08-23)",
  "register": { "rows": 20, "executed": 16, "superseded": 4, "outstanding": 0 },
  "chain_closed": true,
  "outstanding": [],
  "reported_not_done": [
    "project-utils tree switch-back to master - blocked by session classifier (2026-08-25)",
    "commit of four sibling-stage closure moves - held for owner approval"
  ]
}
```

## A10. Next Actions — superseding the main body's list

| # | Item | Owner |
|---|---|---|
| 1 | **Decide on the held commit** of the four sibling-stage closure moves (plan, implementation, QA, UAT). They are in the working tree now | **Owner** |
| 2 | **Decide on the blocked `project-utils` switch-back** (A7-a) — and on the two classifier blocks as a pattern, including the 2026-08-23 `ls-remote` gap already in `OPEN_QUESTIONS.md` | **Owner** |
| 3 | Close `code-review/012-message-valid-field-code-review.md` to a terminal state | **code-reviewer** |
| 4 | Update the release tracker — chain 012 released and closed | **roadmap** |
| 5 | Delete SCR-1 from the production `Messages` table if wanted (UAT U-11). Benign; **nothing waits on it** | **Owner** |

Items 1–5 carry no dependency on each other. **Nothing in this list gates the chain, which is
closed.**
