---
ID: 014
Origin: 014
UUID: 4671e28c
Status: Committed
Verified-At: "website f2c85f5c7e3ad03879845ae1116518dc71cf2077 (chain/014-test-suite-cleanup) — re-derived from the tree at the start of this pass, not inherited from QA: `git rev-parse HEAD` + `git status --porcelain` empty. Committed tree, SHA identity; no manifest fallback owed. Any change to a covered blob expires this verdict and every predecessor verdict it rests on."
---

# UAT Report: Plan 014 — Hooks test-suite cleanup (pilot)

**Plan Reference**: `agent-output/planning/014-test-suite-cleanup.md`, **read at revision 17**
**Date**: 2026-08-27
**UAT Agent**: Product Owner (UAT) — `uat-hooks-014`

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-08-27T04:46 | steering-test-cleanup → uat-hooks-014 | Execute BC-9 against a running build; carry BC-7/BC-8 as closure conditions; deliver the release decision | **UAT Complete — APPROVED FOR RELEASE, conditional on the post-deploy-observable rows.** Value delivered: standard live at the workspace root, 51/51 files conforming, banned classes gone (re-derived here). **BC-9 NOT EXECUTED** — no browser tooling in this session; degraded explicitly and handed to the owner as a walkthrough row. Register defect found: two distinct rows both numbered **BC-7** (UAT-1). |
| 2026-08-27T04:56 | uat-hooks-014 → devops-hooks-014 | Stage 1 closure | **`Status` set to `Committed` (was `Active`) and this document moved to `uat/closed/`** by devops Stage 1 step 8. The release decision — **APPROVED FOR RELEASE, conditional on the post-deploy-observable rows** — is unchanged and is the authority relied on. All four open rows (**BC-7/AC8, BC-7/row-19, BC-8, BC-9**) are carried into `deployment/014-test-suite-cleanup-readiness.md` §3 **by name as well as number**, per this document's own instruction. UAT-2 discharged at closure; UAT-1 routed to qa. |
| 2026-08-27T05:36 | steering → uat-hooks-014-2 | Execute BC-9 with browser tooling now available | **BC-9 → EXECUTED, both limbs PASS.** Limb 1: my drive (`?code=bc9probe` → `getFromCode` 401) + owner's direct observation of the rendered toast ("I saw a 'User is not authenticated'"). Limb 2: primary blocked at auth guard (`isApiMessage`); owner attestation "Already saw it" at this build closes it. Full record in the dated **BC-9 Execution Record** addendum at the end of this document; one-line discharge note added to deployment §7. |
| 2026-08-27T06:16 | steering (owner ruling) → uat-hooks-014-2 | Execute BC-7/row-19 — brief correction: it is uat-owned and was never executed | **BC-7/row-19 → EXECUTED: NOT REACHABLE (expected).** Driven authenticated in the rendered UI: row-E JSON intercepted by the ingress resolver (choice at ingress, not at Save); settled draft wrote directly, no persist-gate prompt; fetch-ingress limb stands on the handoff mount evidence (no row-E artifact exists — BC-17). Full record in the dated **BC-7/row-19 Execution Record** addendum. |

## Plan revision read, against the brief

The brief named plan **rev 16**; the plan is at **rev 17** and rev 17 is what I read. Delta assessed
rather than assumed: rev 17 records AC2's identity instrument as non-independent (a criterion defect,
recorded not repaired), updates three Risks prediction rows, and routes the QA-3 cell to the
implementer. It moves no acceptance criterion, milestone boundary or release condition. It **does**
sharpen AC2, which is material to the value assessment below, so reading rev 17 rather than rev 16
strengthens this verdict rather than expiring it.

## Value Statement Under Test

> As a future implementer or planner working in the Hooks workspace, I want the website test suite
> audited against a written Test Conventions standard — junk classes dispositioned with per-deletion
> proof that no coverage was lost, and the standard living in `/usr/local/bin/hooks/CLAUDE.md` — so
> that the next chain copies a clean suite and cites the standard instead of the
> memorial/source-text/ID-named patterns the suite currently teaches.

Owner-approved verbatim 2026-08-26 (D12).

## Flow Execution

**Build**: `pnpm start` (`next dev`, Next 16.1.6 + Turbopack) in `website` at `f2c85f5`, clean tree.
Ready in 1186 ms; `/` and `/message/m/new` both served HTTP 200.

**Process fact, lodged in the round**: the first start failed — `Unable to acquire lock at
.next/dev/lock`. I verified the lock was stale before touching it (`ps` showed no node/next process;
nothing listening on :3000) and removed only that 0-byte gitignored build artefact. No source file,
and nothing another session had in flight, was touched.

**Flow derivation**: the implementation records that *no user-visible surface is touched by any
milestone* (`implementation/…-implementation.md` L278), and QA records **0 files changed under
`src/`** chain-wide. There is therefore no per-flow product enumeration to confirm or amend, and
F1–F3 are **derived from the value statement**, whose user is a future implementer or planner in this
workspace. F4–F6 are the register's own product rows, carried here because they name this stage.

| Flow | Action | Expected | Observed | Result |
|---|---|---|---|---|
| F1 — the standard auto-loads for the next chain | Read `/usr/local/bin/hooks/CLAUDE.md` as a reader entering the workspace | Test Conventions present at the workspace path, via the D15 symlink | Symlink resolves → `agent-output/CLAUDE.md` (12.7K); carries `## Test Conventions (website)`, `### Placement and naming`, `### Axioms`, `### Classes, predicates, dispositions`, `### DOM component tests` | **PASS** |
| F2 — the suite matches the placement rule the standard promises | `find src` for `*.test.ts(x)`, then for the same under `*/__tests__/*`; counted with `grep -c ''` over a written file (never a piped count) | Every test file under `src/**/__tests__/` | 51 total, 51 under `__tests__/` — no file outside the rule | **PASS** |
| F3 — the banned naming class is gone from what the next chain copies | Applied the standard's own ID-token class to all 51 basenames (`grep -icE` over a written file) | 0 | 0 | **PASS** |
| F4 — code-fetch error shows the user a transient notice (BC-9, limb 1) | Drive a code-fetch error in the running build and **look** for the toast | A visible toast | **Not executed** — no browser tooling in this session | **UNVERIFIED** |
| F5 — in-flight save shows the user a transient notice (BC-9, limb 2) | Drive an in-flight save in the running build and **look** for the toast | A visible toast | **Not executed** — same cause | **UNVERIFIED** |
| F6 — persist-gate choice path stays unreachable (BC-7/row-19) | Mount `NewMessageModal`, trip `gateBeforePersist.mustAsk`, press Save | Save disabled before the choice prompt can appear | **Not executed** — same cause | **UNVERIFIED** |

**Degrade, stated explicitly.** F4, F5 and F6 went unexecuted for one reason: this session has **no
browser tools** (the Claude-in-Chrome extension was declined mid-session), and each of the three
requires *seeing* a rendered surface. A running build was available and serving — the missing
instrument is the observer, not the build. I did **not** substitute a jsdom mount for a browser:
BC-9 exists precisely because the mounted-tree instrument cannot see `react-toastify`, which renders
outside it, so closing BC-9 with that instrument would be circular. Nor did I substitute reading the
source, which is not evidence of rendering and is outside this stage besides.

These three are handed to the owner as walkthrough rows in the ledger below. **Their primary
instrument stays stage-executable** — a browser drive needs no human — so the owner is being invoked
as the *fallback*, not reclassified as the row's owner.

## Blocking Release Condition Ledger

Consuming chain 014's **single** register, minted in `qa/014-test-suite-cleanup-qa.md` ("BLOCKING
RELEASE CONDITIONS — chain 014's register") and appended to by that document's Phase 2 pass. There is
**no second travelling list** — the Phase 2 table names the Phase 1 register and appends to it. What
I did find is an ID collision inside the one register (UAT-1 below), so every row here is carried by
**name as well as number**.

| ID (and name) | Class | Owner | State | Result / date |
|---|---|---|---|---|
| BC-1 — pnpm layout intact across M2's install | pre-release | implementer | **EXECUTED** | IS-1 did not fire; direct deps 79 → 79, one devDependency added (`jsdom ^30.0.1`); no `package-lock.json`. QA Phase 2, 2026-08-27 |
| BC-2 — M0 baseline exists with per-case results **and** exit code | pre-release | implementer | **EXECUTED** | `verification/014/baseline-a74b9e2.json` (238.7K) present at the named path; 617 baseline cases; exit code recorded. 2026-08-27 |
| BC-3 — each M5 predicate seen firing on a planted control, control removed | pre-release | implementer | **EXECUTED** | All 7 M5 steps run with planted-then-removed controls, `git diff` empty after each; step 6 controlled in **both** directions. Recorded in the implementation doc's M5 section, not in the register that named it — closed on the substance, delta recorded here. 2026-08-27 |
| BC-4 — every evidence mutation restored | pre-release | implementer | **EXECUTED** | IS-6 did not fire, proven chain-wide by diff; tree clean at `f2c85f5`, which I re-derived myself this pass. 2026-08-27 |
| BC-5 — AC7 re-run at the end state, residue adjudicated | pre-release | qa | **EXECUTED** | Sweep at `f2c85f5`: E2 12 → 0, E3a 3 → 0; rows 13/15 dispositioned with both limbs probed; 12 new files read whole. One residue instance recorded (QA-4), non-blocking. 2026-08-27 |
| BC-6 — `pnpm run typecheck` green at the merge SHA | pre-release | implementer | **EXECUTED** | exit 0, both `tsc` programs, re-derived independently by QA Phase 2. 2026-08-27 |
| **BC-7/AC8** — the next chain's planner **cites** `agent-output/CLAUDE.md` | post-deploy-observable | roadmap / next chain's planner | **OPEN** | Not decidable in chain 014. Earliest: the first planning document opened in this workspace after 014 releases. One citation closes it — single observation is sufficient by its own prediction. |
| **BC-7/row-19** — persist-gate choice path stays unreachable through the UI | post-deploy-observable | uat (primary: browser drive, no human needed) · fallback: owner | **OPEN — NOT EXECUTED** | F6 above. Out of charter (D2), fix not attempted; handoff `handoff/newmessagemodal-persist-gate-choice-unreachable-2026-08-27.md` (verified present). |
| **BC-8** — row 43's route-0 mount-effect init surface has no covering test | post-deploy-observable | owner | **OPEN** | Handoff `handoff/message-init-cached-edits-lost-2026-08-27.md` (verified present). The pin was deleted under D2 with the handoff landing **156 s before** the delete — ordering evidenced by commit time. |
| **BC-9** — toast-bearing surfaces actually show a transient notice | post-deploy-observable | uat (primary: browser drive, no human needed) · fallback: owner | **OPEN — NOT EXECUTED** | F4/F5 above. Assigned to this stage by QA and by steering; not executable here for want of a browser. |

**NOT EXECUTED is not a terminal state.** Three rows stand at OPEN, which is why the approval below
is conditional rather than unconditional. None is silently omitted, and none is recorded "satisfied
incidentally".

**Why the three open rows cannot gate the *release act*, and do gate *chain closure*.** This is the
register's own classification, and I checked it rather than accepting it: I re-derived the chain-wide
diff myself (`git diff --numstat` over `merge-base master HEAD..f2c85f5`, written to a file and read,
never a piped count) — **76 files changed, 5 of them non-test (all M2 harness config), 0 under `src/`
outside `__tests__/`**. BC-7/row-19, BC-8 and BC-9 all ask about product behaviour that this merge
cannot move, because the merge changes no product code. BC-7/row-19's condition says so in its own
words: *"shipping this chain does not change that."* They are coverage-gap disclosures about the
suite, not risks this release introduces.

## Weighing the Evidence I Do and Don't Have

BC-9 names a **silent** failure mode by construction: its signature is a notice that *fails to
appear*. No amount of "it's been running and nobody complained" bears on it — absence is what such an
attestation is made of, so citing it here would argue in a circle. I therefore record F4/F5 as
**unverified**, not as covered, and no operator attestation has been offered or is being relied on.

BC-7/row-19 is the mirror case and cuts the other way: a disabled Save with no explanation is
**loud** to whoever hits it, but its predicted value is that the path stays unreachable — so
production quiet is weak confirmation at best, and it too stays unverified.

## Value Delivery Assessment

**The stated value is delivered, and it is delivered to the party the statement names.** The value
statement's user is not an end user of the product — it is the next implementer or planner in this
workspace — so the flows that matter are F1–F3, and all three pass on instruments I ran myself:

- **The standard lives where the statement says it must.** `/usr/local/bin/hooks/CLAUDE.md` resolves
  through the D15 symlink to the canonical, version-controlled `agent-output/CLAUDE.md`, and carries
  the Test Conventions, the axioms, the class/disposition table and the DOM-component conventions.
  It auto-loads for any session opened in this workspace — which is the whole delivery mechanism.
- **The suite the next chain copies is clean.** 51/51 test files sit under `src/**/__tests__/`; 0 of
  51 basenames carry an ID token. The two classes the chain set out to eliminate are measured gone by
  QA's independent instruments (source-text E2 12 → 0, hand-rolled E3a 3 → 0).
- **Per-deletion proof was actually produced.** Three deletions, each naming a covering test or an
  Outstanding Items line; the one deletion that destroyed a defect record (row 43) had its handoff
  landed 156 seconds before the delete, evidenced by commit timestamps rather than asserted.

**Core value is not deferred.** The one criterion carrying an acknowledged weakness is **AC2**, and it
is worth stating precisely rather than waving at: AC2 is *met on the plan's own instrument*, but that
instrument — the disposition table's `old title → new title` column — was authored by the same hand as
the transitions it identifies, so no replay consuming it is independent, and QA's two attempted
independent replays measured something else and were reported as failures rather than dressed up as
evidence. What stands in its place is a per-transition chain of custody, each step captured at the
time, with M2 independently re-executed on both trees by code review (604/604 identical tuples).

As Product Owner I read that as **acceptable but not closed**: the residual risk is a baseline case
silently dropped rather than deliberately dispositioned, which would surface as a surface with no
covering test and no Outstanding Items line — invisible to every green run. The audit that would
close it is already routed to the retrospective as the chain's stated Assumption Not Checked. I note
it as a residual risk, not as a value failure, because the failure signature is a *gap in proof*, not
a demonstrated loss — and the chain's own reporting of it, rather than concealment of it, is the
behaviour the standard being shipped is meant to produce.

## QA Integration

**QA Report Reference**: `agent-output/qa/014-test-suite-cleanup-qa.md`
**QA Status**: **QA Complete** at `website` `f2c85f5`, per that document's Verdict section, re-read at
the time of writing this line (not carried from an earlier read this session). QA is the authority for
this status; nothing in it is re-litigated here.
**QA Findings Alignment**: QA-3 (row 47 sits in a 4-column section with no evidence cell) is a record
gap whose *substance* QA supplied by its own mutation (`% 6n` → `% 7n`, two cases red, restored, diff
empty) — so no re-verification is owed and the cell is owed by the implementer. QA-4 is a recorded
residue instance, non-blocking by the precedent Phase 1 set for its class. Neither is a functional
defect; both are routed onward. I confirm both remain non-blocking from a value standpoint.

## Technical Compliance

Plan deliverables:

- M0 baseline captured at `a74b9e2` — **PASS** (`verification/014/baseline-a74b9e2.json`)
- M1 conventions doc, canonical + symlinked (D6 as amended by D15) — **PASS** (F1)
- M2 DOM harness — **PASS**; code review `APPROVED_WITH_COMMENTS`, all three findings CONFIRMED CLOSED
- M3 helper layer (D4) — **PASS**
- M4a/M4b/M4c dispositions, 48 rows — **PASS** (AC1 met by row-number membership; both D19 riders landed)
- M5 acceptance sweep and capture at the merge SHA — **PASS** (7 steps, each with a fired-then-removed control)

Test coverage (from QA, re-derived by QA rather than cited): 566/566 passed, 0 failed, **exit 0**,
51 files; `pnpm run typecheck` exit 0 on **both** `tsc` programs. I did not re-run the suite — that is
QA's instrument, not this stage's.

Known limitations:

- Toast **rendering** has no automated coverage by design (BC-9) and is unverified here.
- Row 19's persist-gate choice path is unreachable through the UI — a product gap, out of charter (D2).
- Row 43's route-0 init surface has no covering test after its pin was deleted (BC-8).
- AC2's end-to-end replay does not exist; per-transition custody stands in its place.

## Objective Alignment Assessment

**Does the delivered work meet the original plan objective?**: **YES**

**Evidence**: The objective was to audit the suite against a written standard, disposition the junk
classes with per-deletion proof, and put the standard where the next chain will read it. All three are
observable in the tree at `f2c85f5`: the standard auto-loads at the workspace root (F1), the suite
conforms to it in both directions across all 51 files (F2/F3, plus QA's 6/6 bidirectional controls),
and the deletions carry their proof. The pilot question D1 posed — should Statbot follow — now has an
answerable basis.

**Drift Detected**: **None material.** Two scope movements, both declared and both ruled, not drift:
the DOM harness (D13, a declared scope delta, the only non-test code in the chain and the only part
code review assessed) and the two M4c riders (D19 superseding D18, with the critic pass waived by the
owner in his own words). One thing worth naming plainly for the record: the chain repeatedly found its
*own acceptance instruments* contradicting the criteria they measured — three members recorded in the
Risks table, including AC2's. Each was caught, escalated and ruled rather than quietly worked around,
which is the behaviour I want; the recurrence itself is a process finding for the retrospective, not a
value failure here.

## Findings

**UAT-1 — the register contains two distinct rows both numbered BC-7** (record defect, non-blocking).
`qa/014-test-suite-cleanup-qa.md` carries **BC-7 = AC8, the next chain's planner cites the conventions
doc** (Phase 1 register) and, in the Phase 2 appended table, **BC-7 = row 19's persist-gate path stays
unreachable**. The Phase 2 table correctly declares "No parallel ID space" and correctly appends to the
single register — but it minted from the last ID *visible in its own table* rather than from the
register's enumerated maximum, which is exactly the collision the document-lifecycle skill warns of for
a register written by more than one pass. Verified by enumeration, not by reading the sentence:
`grep -o "BC-[0-9]\+" … | sort | uniq -c` → **BC-7 appears 5×** across two distinct conditions.

*Why it matters, concretely*: a downstream reader terminalising "BC-7" closes the wrong row, and both
BC-7s are open. The steering brief that commissioned this pass already inherited the ambiguity — it
named "BC-7 and BC-8" while describing rows 19 and 43, which resolves to the Phase 2 pair only because
it also named the rows. That is the numbering slip being self-detecting on read, working as designed.

*Disposition*: I have **not** renumbered QA's register — a record is corrected by its author with a
dated reconcile note, not overwritten by a consumer. This ledger carries every row by **name as well
as number** (`BC-7/AC8`, `BC-7/row-19`), and **the deployment record must do the same**. Routed to qa
for a reconcile note in `agent-output/qa/014-test-suite-cleanup-qa.md`, and to the retrospective as a
class (register ID minting across multi-pass documents).

**UAT-2 — the code review's `Status` field reads `In Review` while its verdict is settled**
(record accuracy, non-blocking). `code-review/014-test-suite-cleanup-code-review.md` carries
`Status: In Review`; its Verdict section reads **APPROVED_WITH_COMMENTS** with all three findings
CONFIRMED CLOSED at `e6163fd`. The verdict, not the stale field, is what I relied on. Flagged so devops
does not read the field as an unfinished gate at closure time. `Status` is a declarative surface,
corrected by replacement by its owning stage.

## Predecessor Verdict Identity

Every predecessor verdict this decision rests on, with the identity it was reached at — reproduced
from the tree by me this pass, not inherited from the documents that assert it:

| Verdict | Identity as claimed | Reproduced here |
|---|---|---|
| QA Complete | website `f2c85f5` | `git rev-parse HEAD` → `f2c85f5c7e3a…`; `git status --porcelain` empty. **Matches.** |
| Code review APPROVED_WITH_COMMENTS (M2 scope only) | website `e6163fd` | `git diff --numstat e6163fd..f2c85f5` over M2's five non-test paths → **empty**. The reviewed content is byte-identical at HEAD, so the verdict survives to `f2c85f5` rather than merely being asserted to. |
| Implementation complete | website `f2c85f5`, `93c6ccf` | HEAD matches; M5 recorded complete, all seven steps. |

**This UAT verdict is reached at website `f2c85f5c7e3ad03879845ae1116518dc71cf2077`, clean tree, on
`chain/014-test-suite-cleanup`.** Any change to production code expires the QA, code review and
implementation verdicts above — **and expires this one with them**. Do not rely on another agent
noticing.

## UAT Status

**Status**: **UAT Complete**

**Rationale**: The value statement is delivered to the party it names, on flows I executed myself
against a running build and the live workspace (F1–F3), and every pre-release blocking condition
(BC-1…BC-6) carries a terminal `EXECUTED` state with its evidence and date. The chain's objective —
a written standard, a conforming suite, per-deletion proof — is met. Three post-deploy-observable rows
stand OPEN, one of them (BC-9) assigned to this stage and unexecuted for want of browser tooling; that
is recorded as unverified and is why the approval below is conditional, but none of the three can be
moved by this merge, which changes no product code.

## Release Decision

**Final Status**: **APPROVED FOR RELEASE, conditional on the human click-through of BC-9 (toast
rendering, both limbs) and BC-7/row-19 (persist-gate path). If any of these fail, return to the
implementer before release.**

Two honest qualifications on that prescribed form, because it does not fit this chain exactly and
saying so is better than parroting it:

1. **These rows gate the chain's closure, not the release act** — the register's own classification,
   which I verified rather than accepted (0 files changed under `src/`; the merge cannot move product
   behaviour). Release may proceed ahead of the walkthrough. Chain closure may not.
2. **A BC-9 or BC-7/row-19 failure does not route to the implementer**, despite the standard wording.
   Both are product-code matters and this chain is barred from product fixes by **D2**; a failure
   becomes a handoff record and an item for the roadmap/owner, exactly as rows 19 and 43 already are.

**Rationale**: QA is Complete at a tree identity I reproduced myself; code review's verdict is
byte-verified as surviving to HEAD; every pre-release condition is EXECUTED with evidence; the value
statement's own flows pass. The open rows disclose pre-existing coverage gaps that this merge neither
creates nor changes.

**Recommended Version**: **No version bump — none is possible or owed.** `website/package.json`
carries no `version` field and no CHANGELOG exists, which the plan records as the reason it defined no
release-artifact milestone. The release is: `website` `master` moved to the chain-014 merge SHA, with
`agent-output` moving alongside. Recorded as a positive finding, not an omission.

**Key Changes for Changelog**:

- Test Conventions standard established for the Hooks workspace, canonical at `agent-output/CLAUDE.md`
  and auto-loading at `/usr/local/bin/hooks/CLAUDE.md` via symlink (D6/D15).
- Website test suite audited against it across all 48 inventory rows: 3 deletions, 14 conversions,
  6 oracle repairs, 25 renames — source-text tests 12 → 0, hand-rolled renderers 3 → 0, ID-named
  files 51 → 0.
- DOM test harness added (jsdom as a second vitest project) so component surfaces are tested by
  mounting rather than by reading their source text — the chain's only non-test change (D13).
- Suite at merge: 566/566 passing, exit 0, 51 files; `pnpm run typecheck` exit 0 on both programs.
- **No production code changed** (0 files under `src/` outside `__tests__/`).
- Two product gaps found while mounting components for real and recorded as handoffs rather than
  fixed in-chain (D2): `newmessagemodal-persist-gate-choice-unreachable`, `message-init-cached-edits-lost`.

## Next Actions

*Point-in-time list — later stage documents, and then the deployment record, are authoritative on
these items' current state.*

1. **Owner** — walkthrough of **BC-9** (drive a code-fetch error and an in-flight save in a running
   build; look for a visible toast in both cases) and, in the same sitting, **BC-7/row-19** (trip
   `gateBeforePersist.mustAsk` in `NewMessageModal`, press Save; expect Save disabled before any
   choice prompt). A running dev server at `f2c85f5` serves both. Record the observed result *beside*
   each prediction, never over it. A statement of the result closes the row — no capture file is owed.
2. **devops** — release may proceed. Carry BC-7/AC8, BC-7/row-19, BC-8 and BC-9 into the deployment
   record **by name as well as number** (UAT-1), and record `agent-output` and `website` merge SHAs
   back into the verdict headers per the lifecycle skill.
3. **qa** — dated reconcile note in the QA document for the duplicate BC-7 (UAT-1). A record is
   corrected in place, preserving the superseded text.
4. **code-reviewer** (or devops at closure) — bring the code review's `Status` field current (UAT-2).
5. **retrospective** — after the chain's effort files are closed out, not now. Carries: AC2's
   end-to-end mapping audit (the chain's stated Assumption Not Checked); the recurring
   instrument-contradicts-criterion class; the interchangeable-siblings class; register ID minting
   across multi-pass documents (UAT-1); and AC8/BC-7 as the pilot's answer to D1.

---

## BC-9 Execution Record — 2026-08-27 (dated addendum; results recorded beside the F4/F5 predictions above, never over them)

**Executed by**: Product Owner (UAT), session `uat-hooks-014-2`, picking up the one row this
document left assigned to this stage. Browser tooling (Claude-in-Chrome) was available this
session — the primary instrument, not the fallback.

**Identity re-derived at execution**: `website` HEAD `f2c85f5c7e3ad03879845ae1116518dc71cf2077`,
`git status --porcelain` empty, branch `master` (the release SHA — release act recorded in
`deployment/014-test-suite-cleanup-deployment.md` §7). Same identity this document's verdicts were
reached at; nothing expired. Build: the owner's dev server at `localhost:3000`, serving HTTP 200.

**Limb 1 — F4, code-fetch error toast: PASS.**
Drive (mine): navigated `http://localhost:3000/message/m/0/edit?code=bc9probe` (the code fetch is
keyed on the `?code=` search param). Network log: `GET /api/trpc/message.getFromCode?…code=bc9probe`
→ **401**, ×4 including react-query retries. Observation: the owner, watching the same screen,
reported in the round: **"I saw a 'User is not authenticated'"** (2026-08-27 ~05:31 local) — the
`toast.error(codeMessageError.message)` render of that 401. Recorded verbatim; closes the limb.
*Instrument note, lodged in the round*: my screenshots at ~3 s/7 s/12 s after settle all missed the
toast — a transient with autoclose is not reliably captured by round-trip screenshots, and the
periodic screenshot is the instrument that failed here, not the toast. The drive and the 401 are
mine; the render evidence is the owner's direct observation.

**Limb 2 — F5, in-flight save toast: PASS on owner attestation.**
Primary drive blocked, stated rather than worked around: every UI save path guards on a persisted
message (File → Save is disabled unless `isApiMessage(message)`; the save hotkey carries the same
guard), and reaching a persisted message requires the owner's authenticated Discord session —
his credential, which this stage may not enter. My unauthenticated Save click was a silent no-op
(no mutation fired; network log empty of `message.upsert`). Fallback per this document's own
classification: the owner. Asked in-session, he answered **"Already saw it"** — he has already
observed the `Saving message...` toast during normal use of a saved message at this build
(2026-08-27, in-session selection, recorded verbatim). Per Weighing Operator Attestation this is a
**loud-mode-shaped direct observation of the rendered toast, not a no-complaints inference** — it
closes the limb; no capture file is owed.

**Terminal state: BC-9 → EXECUTED, 2026-08-27.** Prediction ("a visible toast in both cases") met;
single discriminating instance per limb suffices per the row's own prediction. Result recorded here,
the discharging document; one dated discharge line added to the open-conditions listing in
`deployment/014-test-suite-cleanup-deployment.md` §7 per the lifecycle skill (left uncommitted
there — that document is devops's to commit).

**Process facts, lodged in the round**:
- Two dead-end probes before the flow was found: a malformed message id 404s server-side, and
  `/message/f/<code>` redirects to `/message/m/0/edit` without a client fetch — neither reaches
  `codeMessageError`.
- **Disclosed degrade from pure product execution**: to locate the flow's entry points and the
  limb-2 guard I read narrow slices of `MessageProvider/index.tsx`, `useApiMethods.ts` and
  `Navigation.tsx` — as flow derivation (finding where the surface is driven), not as evidence.
  The evidence for both limbs remains the running product and the owner's observation.
- This record claims **BC-9 only**. At write time the deployment record still lists BC-7/AC8,
  BC-7/row-19 and BC-8 **OPEN**; the brief for this pass said only BC-9 remained. No document
  terminalising the other three was found by this pass — if they were closed in another sitting,
  that recording is owed by whoever closed them, and this line is the dated flag.

---

## BC-7/row-19 Execution Record — 2026-08-27 (dated addendum; result recorded beside the F6 prediction above, never over it)

**Executed by**: Product Owner (UAT), session `uat-hooks-014-2`, on the owner's ruling relayed by
steering ("Not done — UAT-2 does it now"), correcting this session's own earlier claim that BC-9 was
the last uat-owned row — a miscount by *number* that the register's duplicate BC-7 id (UAT-1) made
available, exactly as this document predicted when it found the collision.

**Build**: dev server at `127.0.0.1:3000`, **authenticated** — the owner logged in himself
(Discord OAuth is his credential; this stage never touched it). Backing services were localised
first at the owner's direction, recorded as process facts below.

**Drive (mine, in the rendered product — the row's primary instrument):**
1. `NewMessageModal` reached: `/message` → New Message menu → "Upload Message". Four ingresses
   render: Message Link (requires bot), Webhook, Message Context Command, JSON.
2. Row-E draft — structural V2 + classic content,
   `{"content":"hi","flags":32768,"embeds":[],"components":[{"type":17,"components":[{"type":10,"content":"x"}]}]}`
   — pasted at the JSON ingress. **Intercepted at ingress**: *"This message has both Components V2
   and classic content — nothing was created. Choose which to keep, or edit the JSON. Resolve"*;
   Continue stayed disabled.
3. The ingress's own resolver choice UI rendered ("Save as Classic — This will drop your Components
   V2 components." / "Save as Components V2 — …" / Cancel) — **a choice offered at ingress, which is
   the JSON tab's internal resolver, not the persist-gate `SaveChoiceModal`**.
4. Chose Save as Classic → draft settled (preview rendered classic "hi") → Continue → named
   "row19 uat drive" → **Save wrote directly**: modal closed, message id 1 created, editor opened at
   `/message/m/1/edit`. **No persist-gate choice prompt appeared between Save and the write.**

**The fetch ingresses (Message Link / Webhook / Context Command)**: not drivable to a row-E draft —
no Discord artifact of that shape exists to fetch (BC-17, `qa/closed/013-…-qa.md`, never
discharged). For a row-E draft arriving there, the handoff's real-mount evidence stands: Save's DOM
`disabled` is `true` via `contentFloorError`, no choice UI, no write
(`handoff/newmessagemodal-persist-gate-choice-unreachable-2026-08-27.md`).

**Terminal state: BC-7/row-19 → EXECUTED, 2026-08-27. Result: NOT REACHABLE — the expected answer.**
Every UI route to Save either resolves the conflict upstream of `loadedMessage` (JSON ingress,
driven live) or disables Save before `onSubmit` can run (row-E via fetch ingresses, mount-evidenced).
The `pendingChoice`/`commitChoice` branch never rendered. Product fix stays out of charter (D2); the
handoff record stands as the routing for the product decision. Scope note: this row names
`NewMessageModal`'s gate; the editor's own `SaveChoiceModal` surface is not this row's and was not
probed.

**Process facts, lodged in the round:**
- At the owner's direction the backing services were localised before the drive: local Postgres
  (docker `hooks-postgres-local`, `127.0.0.1:5432`, schema pushed from
  `project-utils/prisma/schema.prisma` via `prisma db push` — the owner's recollection that Prisma
  created the DB located the schema after a workspace-wide DDL search found none) and the existing
  local Redis at `127.0.0.1:6379`; `website/.env.local` repointed (backup
  `.env.local.bak-2026-08-27`), dev server restarted, tree re-verified `f2c85f5` clean.
- A first attempt to clone the remote DB (`pg_dump` of Railway inside the container) was **blocked
  by the permission classifier**; reported to the owner in the round, not retried in different
  words. The Prisma path replaced it — no remote access was used.
- The drive leaves one artifact: message id 1, "row19 uat drive" (classic, content "hi") in the
  owner's **local** DB — evidence of the direct write, harmless, left in place.
- Flow derivation for this row came from the handoff and chain documents; screenshots of each step
  were taken live in this session.
