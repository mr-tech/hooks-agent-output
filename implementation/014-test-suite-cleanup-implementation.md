---
ID: 014
Origin: 014
UUID: 4671e28c
Status: Active
---

# Implementation 014 — Hooks test-suite cleanup (pilot)

**Plan Reference**: `agent-output/planning/014-test-suite-cleanup.md`, revision 8 (`47a4138`),
approved by cycle-2 critique (`critiques/014-test-suite-cleanup-cycle2-critique.md`, `c557300`,
registered `c68256b`).
**Date**: 2026-08-27
**Implementer**: `implementer-hooks-014`
**Run-Length Ceiling**: this document was first written at the ceiling on 2026-08-27; the owner
then instructed the same session to continue rather than hand off to a fresh spawn. M4b (all 10
rows), M4a (all 27 rows), and M2 were completed in that continuation. The session reached the
ceiling a second time partway through M4c (2 of 15 rows landed: 45, rider 1/row 12) and is
checkpointing here rather than starting the DOM-mount conversions that make up the rest of M4c.
See "Outstanding Items" for exact resumption state for the milestones still remaining (M4c, M5).

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-08-27 | planner-hooks-014 → implementer-hooks-014 | Plan rev 6 approved, QA Phase 1 landed (D16) | Implementer spawned. Read plan, QA Phase 1, analysis, critique, inventory, coordination plan in full. |
| 2026-08-27 | planner-hooks-014 (cross-session) | Plan rev 7 | M0 file-membership reconciliation (path, not count), AC2 key = (path, `fullName`), M4b residue (rows 13, 15) — absorbed before M0. |
| 2026-08-27 | planner-hooks-014 (cross-session) | Plan rev 8 + cycle-2 critique APPROVE | Row 13 moved to M4b-only (was dual-owned, QA-1/critic M-13). M4b = 10 rows (3, 7, 11, 13, 14, 15, 20, 22, 43, 46), M4a = 27, M4c = 13. Absorbed before opening M4b/M4a. |
| 2026-08-27 | implementer-hooks-014 | Self | M0, M1, M3 complete; M4b partial (rows 43, 11, 3). Session stopped at the run-length ceiling. Status field set to In Progress. |
| 2026-08-27 | Owner (direct) | "Continue" (same session, not a fresh spawn) | Sent correction to `steering-test-cleanup` (was told to expect a fresh spawn). Opened the standalone Disposition Table (`verification/014/disposition-table.md`), seeded rows 43/11/3 per planner's instruction, then completed the remaining 7 M4b rows (7, 13, 14, 15, 20, 22, 46) — **M4b is now complete, 10/10 rows.** Full suite: 604/604 passing, exit 0 (605 baseline − 1 from row 7's D8 deletion, exactly as expected; no other count drift). |
| 2026-08-27 | planner-hooks-014 (cross-session) | "M4a accepted at plan level... Proceed to M2" | Completed all 27 M4a rows (renames, ID-token strips, row 47's E3a repair). Two new findings (rows 9, 12) recorded, not fixed. Planner confirmed neither touches M2 and directed rows 9/12 to steering as riders on M4c. |
| 2026-08-27 | planner-hooks-014 (cross-session) | Relay-QA-directly instruction (ruling 11) | No live QA session for this chain exists (`qa-hooks-14`, ended) — `SendMessage` confirmed unreachable. Routed the E3b two-hop instrument-gap writeup back to planner instead of editing the QA doc (no write authority over `agent-output/qa/`). Planner confirmed: no QA session live, carry the item into the QA Phase 2 spawn cue after M5 instead. |
| 2026-08-27 | planner-hooks-014 (cross-session) | Owner ruling D18, verbatim: "As for now, I guess we can just drop the rider." | Rows 9 and 12 stay unrepaired in this chain; no rider opens. A single handoff record covering both, citing D18, is owed before M5 closes (see Outstanding Items). Disposition Table entries for rows 9/12 unchanged. |
| 2026-08-27 | planner-hooks-014 (cross-session) | Owner ruling D19 supersedes D18, verbatim: "We can include it then if the critic miss isn't a problem." Plan rev 9 (`105144a`). | Rows 9 and 12 now ride M4c as named riders (rider 1 = row 12, rider 2 = row 9), gated: the rider lines open only once planner relays the owner's plain critic waiver or a scoped critic APPROVE. M4c's own 13 rows are ungated. Riders yield (never spawn a round); drop disposition on either is leave-as-found + handoff record + Outstanding Items line — so the D18 handoff record is owed only if a rider ultimately drops, not unconditionally. |

## Implementation Summary

Plan 014 audits the Hooks workspace's 48-file `website` test suite against a written Test
Conventions standard, dispositions every file with per-deletion proof that no coverage was lost, and
publishes the standard at `agent-output/CLAUDE.md` (symlinked to the workspace root). Value
delivered so far: **the standard exists, is evergreen (passes its own no-chain-ID predicate), cites
every class the disposition table will use, and every fenced command in it was re-run against the
live tree** (M1); **three duplicated fixture-builder families are lifted to a shared helper layer**
with the M0 baseline pass set proven byte-identical before/after (M3); **three of the ten M4b rows
are fully dispositioned** with axiom-(A) mutation evidence captured for the one row that needed it
(M4b partial).

**M4b is now complete (10/10 rows)** — every row's oracle repaired or dispositioned with
axiom-(A) mutation evidence where owed, recorded in the standalone Disposition Table
(`verification/014/disposition-table.md`), full-suite pass set 604/604 (exit 0), no count drift
beyond the one intentional deletion (row 7).

**M4a is now also complete (27/27 rows)** — every file renamed to `module.behaviour.test.ts` form
with all ID tokens stripped from titles/comments, zero case-count drift, full-suite re-verified at
604/604 (exit 0) after every batch. A whole-suite negative-form re-sweep confirms the only files
still carrying ID tokens are exactly the 10 M4c-reserved rows, nothing missed.

**M2 is now also complete** — jsdom introduced as a second vitest project (`test.projects`: node
project unchanged over `src/**/*.test.ts`, new dom project over `src/**/*.test.tsx` @ jsdom,
`resolve.alias` factored so the two cannot drift), `jsdom` added as a devDependency, a
project-scoped setup file (`vitest.setup.dom.ts`) sets `IS_REACT_ACT_ENVIRONMENT` only for the dom
project. Node project's pass set proven byte-identical to the pre-change baseline by exact
`(file, fullName, status)` tuple comparison (604/604, 0 lost/0 added), process exits 0, `pnpm run
typecheck` clean. No `.test.tsx` files exist in the tree yet (M4c adds the first ones), so the
edit-page teardown-rejection finding from the analysis has nothing to trigger yet; the deterministic
mitigation (`vi.mock` the nine prefetch targets) is M4c's responsibility when it writes that test.

Not yet delivered: M4c (13 conversions, depends on M2 — now unblocked) and M5 (acceptance
sweep). The value statement is not yet fully met — see "Value Statement Validation".

## Milestones Completed

- [x] M0 — Baseline run captured (`verification/014/baseline-a74b9e2.json` + `.txt`), exit 0,
      617/617 passed, 48/48 files, membership-verified path-for-path, `numTotalTestSuites` = 205
      confirms QA's falsifiable prediction (48 files + 157 describes). AC2 key confirmed on the
      full run. Committed `agent-output` `5e22667`.
- [x] M1 — `agent-output/CLAUDE.md` written + `/usr/local/bin/hooks/CLAUDE.md` symlink created.
      Negative-form predicate → 0 lines (verified). All fenced commands re-run, exit 0. Committed
      `agent-output` `9fb9d15`.
- [x] M3 — Helper layer lifted (`data`, `author`, nine `make*` builders) to
      `website/src/utils/__tests__/helpers/{messageData,discord,components}.ts`. `makeSection`'s
      three drifted signatures and `makeMediaGallery`'s two drifted URL schemes reconciled to one
      canonical form each (see "Key Decisions" below). M0 pass set proven byte-identical
      (617/617, 0 lost, 0 added) by exact-key comparison, not just count. `pnpm run typecheck`
      exit 0. Committed `website` `87e4faf`.
- [x] M4b — **Complete, 10/10 rows.** Rows 43, 11, 3 (`website` `62b61bd`; handoff committed
      first, `agent-output` `c5e1d59`, per IS-2). Rows 7 (`8b6d4a8`), 13 (`9ddc457`), 14
      (`53aa251`), 15 (`71a4ab9`), 20 (`55e7a68`), 22 (`442e5c5`), 46 (`7d70bc4`). Full
      per-row disposition, class, evidence, and commit recorded in
      `verification/014/disposition-table.md`. Full suite 604/604, exit 0.
- [x] M4a — **Complete, 27/27 rows.** Full per-row list, commits, and case counts in
      `verification/014/disposition-table.md`. Two new findings recorded, not fixed (out of
      pure-rename scope): row 9's hand-rolled dispatch-logic block, row 12's 2-hop local
      mode-switch transcription (falls outside QA's E3b-indirect predicate scope). Full suite
      46 files / 604 tests / 0 failed / exit 0, unchanged from post-M4b (zero case drift).
- [x] M2 — **Complete.** `vitest.config.ts` rewritten to `test.projects` (node + dom @ jsdom),
      `jsdom` added (`pnpm add -D jsdom`, lockfile diff purely additive), `vitest.setup.dom.ts`
      created and listed in `tsconfig.test.json`'s `include` (extends the existing per-file
      pattern already used there for `vitest.config.ts`). Node project pass set byte-identical to
      pre-change baseline (604/604, exact tuple match), exit 0, typecheck exit 0. Nothing under
      `src/` touched. Committed `website` `988ca15`.
- [ ] M4c — **In progress, 2/15 rows.** Row 45 deleted (H1 delete branch, `07af608`); row 12
      (rider 1) H5-repaired (`1f89b34`). Rider 2 (row 9) gate cleared at R-5 — open, not yet
      started. 13 rows remain: 10, 32, 33, 34, 36 (wholly source-text convert), 14, 15, 16, 19,
      35 (mixed — convert source-text cases only), 38, 39 (H9 — replace `render()` with the
      harness), 9 (rider 2, H7 — mount `SectionEditor`).
- [ ] M5 — Not started (acceptance sweep).

## Entry Conditions

None apply. No critique residual or owner ruling attached entry conditions to this implementer's
work; the plan carries no unresolved `OPEN QUESTION`, and D16's sequencing gate (QA Phase 1 before
implementation) was satisfied before this session began (confirmed against
`qa/014-test-suite-cleanup-qa.md`, Status "Awaiting Implementation" → implementer unblocked).

## Files Modified

| Path | Repo | Changes | Lines |
|---|---|---|---|
| `src/scripts/__tests__/012-backfill-classify.test.ts` | website | M3: `data()` → shared import | -4/+1 |
| `src/server/api/utils/__tests__/013-m4-shapes-parity.test.ts` | website | M3: 5 builders → shared import | -19/+3 |
| `src/server/api/utils/__tests__/shapes-v2.test.ts` | website | M3: 9 builders → shared import | -44/+4 |
| `src/utils/__tests__/012-send-gate-partition.test.ts` | website | M3: `data()` → shared import | -5/+1 |
| `src/utils/__tests__/012-validity-predicate.test.ts` | website | M3: `data()` → shared import | -4/+1 |
| `src/utils/__tests__/013-m3-bot-get-message.test.ts` | website | M3: `author()` → shared import | -5/+1 |
| `src/utils/__tests__/013-m3-code-path.test.ts` | website | M3: `author()` → shared import | -5/+1 |
| `src/utils/__tests__/013-m3-discord-ingress.test.ts` | website | M3: `author()` → shared import | -5/+1 |
| `src/utils/__tests__/components-v2-data-layer.test.ts` | website | M3: 9 builders → shared import | -48/+4 |
| `src/utils/__tests__/m7-m10-coverage-gaps.test.ts` | website | M3: 9 builders → shared import | -44/+4 |
| `src/utils/__tests__/mutual-exclusivity.test.ts` | website | M3: 7 builders → shared import | -33/+4 |
| `src/scripts/backfillValid.ts` | website | M4b row 3: mutated (`formatReport` spread → allowlist) then reverted, for axiom-(A) evidence; tree clean at the commit | 0 net |
| `agent-output/planning/014-test-suite-cleanup.md` | agent-output | Status field: Approved → In Progress | -2/+2 |
| `src/server/api/utils/__tests__/shapes-v2.test.ts` → `shapes.message-validation.test.ts` | website | M4b row 7: 1 case deleted (D8), 6 titles stripped, renamed. See disposition table for full detail. | -13/+6 |
| `src/utils/__tests__/012-message-mode.test.ts` → `messageMode.switch.test.ts` | website | M4b row 13: header/comment rewrite, 4 titles stripped, renamed. | -19/+8 |
| `src/utils/__tests__/012-send-gate-partition.test.ts` → `limits.send-gate-partition.test.ts` | website | M4b row 14: E3b-indirect structural fix (deleted local switchToV2/switchToClassic, imported production), ~29 ID-token lines stripped/rewritten, renamed. | -83/+57 |
| `src/utils/messageMode.ts` | website | M4b row 14: mutated (`switchToClassic`'s flag mask) then reverted, for axiom-(A) evidence; tree clean at the commit | 0 net |
| `src/utils/__tests__/012-validity-predicate.test.ts` → `messageValidity.predicate.test.ts` | website | M4b row 15: E1 fix (3 cross-checks → literals, independently derived), header + 6 titles stripped, renamed. | -25/+23 |
| `src/server/api/utils/messageValidity.ts` | website | M4b row 15: mutated (`isMessageValid`'s delegation) then reverted, for axiom-(A) evidence; tree clean at the commit | 0 net |
| `src/utils/__tests__/013-fqa31-load-confirmation-names-actual-mode.test.ts` → `loadDiff.mode-naming.test.ts` | website | M4b row 20: E3b structural fix (deleted local modeAfterLoad/confirmationFor, discovered + used production computeLoadDiff), renamed. | -112/+79 |
| `src/utils/index.ts` | website | M4b row 20: mutated (`settledMode`'s disposition branch) then reverted, for axiom-(A) evidence; tree clean at the commit | 0 net |
| `src/utils/__tests__/013-m1-fix-round-1-hash-parity.test.ts` → `usePusher.hash-parity.test.ts` | website | M4b row 22: E3a/E3b fix (deleted producerHash/consumerHash wrappers, inlined real calls at 4 sites), renamed. | -39/+23 |
| `src/providers/MessageProvider/usePusher.ts` | website | M4b row 22: mutated (`normalizeForHash`'s shape-normalisation branch) then reverted, for axiom-(A) evidence; tree clean at the commit | 0 net |
| `src/utils/__tests__/plan-005-bug-fixes.test.ts` → `constructImageUrl.default-avatar.test.ts` | website | M4b row 46: H5 fix (3 self-referential formulas → literals) + self-found-gap fix (non-discriminating fixture replaced) + escaped-provenance line, renamed. | -21/+14 |
| `src/utils/constructImageUrl.ts` | website | M4b row 46: mutated (`% 6n` → `% 5n`) then reverted, for axiom-(A) evidence; tree clean at the commit | 0 net |
| `vitest.config.ts` | website | M2: rewritten to `test.projects` (node + dom @ jsdom), `resolve.alias` factored out shared. | -8/+26 |
| `tsconfig.test.json` | website | M2: added `vitest.setup.dom.ts` to `include`, following the existing per-file listing pattern already used for `vitest.config.ts`. | -1/+2 |
| `package.json` | website | M2: `jsdom` added under `devDependencies`. | +1 |
| `pnpm-lock.yaml` | website | M2: jsdom's dependency tree resolved; purely additive (0 removed lines). | -0/+328 |

## Files Created

| Path | Repo | Purpose |
|---|---|---|
| `website/src/utils/__tests__/helpers/messageData.ts` | website | Lifted `data()` builder (M3) |
| `website/src/utils/__tests__/helpers/discord.ts` | website | Lifted `author()` builder (M3) |
| `website/src/utils/__tests__/helpers/components.ts` | website | Lifted nine Components V2 builders (M3) |
| `agent-output/CLAUDE.md` | agent-output | Test Conventions standard (M1); symlinked at `/usr/local/bin/hooks/CLAUDE.md` |
| `agent-output/verification/014/baseline-a74b9e2.json` / `.txt` | agent-output | M0 baseline capture |
| `agent-output/verification/014/m0-baseline.md` | agent-output | M0 record: reconciliation, exit code, AC2 key confirmation |
| `agent-output/handoff/message-init-cached-edits-lost-2026-08-27.md` | agent-output | D2 handoff for row 43's deleted pin |
| `website/vitest.setup.dom.ts` | website | M2: scopes `IS_REACT_ACT_ENVIRONMENT = true` to the dom vitest project only |

Renamed (M4b row 3, this row owns its own rename per the plan):
`website/src/scripts/__tests__/012-backfill-report.test.ts` →
`website/src/scripts/__tests__/backfillValid.report-and-target-guards.test.ts`

Deleted (M4b): `website/src/utils/__tests__/message-init-route0.test.ts` (row 43),
`website/src/utils/__tests__/011-style-reconciliation-poc.test.ts` (row 11).

## Patterns Extended

| Surface | Pattern extended |
|---|---|
| `agent-output/CLAUDE.md` | New file; no prior pattern in this workspace (recorded absence, `find` confirmed no CLAUDE.md anywhere under `/usr/local/bin/hooks` before this chain). Content shape (four-repo map + Test Conventions, evergreen wording, no chain IDs) is D6/D15's own design, not an extension of an existing doc. |
| `src/utils/__tests__/helpers/*.ts` | New directory; extends the coordination plan's ruling-4 helper-lift pattern (already used across five other repos in the wider effort) into Hooks for the first time, sited per the analysis's S5 finding (`__tests__/helpers/`, not a top-level `test-helpers/`, to stay outside the production tsc program). |
| Test file renames (row 3) | Extends axiom (C)'s naming form, itself inherited verbatim from the coordination plan's rubric — first application in this chain. |
| `tsconfig.test.json`'s `include` list | M2's `vitest.setup.dom.ts` is added as its own line, extending the exact pattern already in the file for `vitest.config.ts` (a root-level, non-`src/` test-infra file listed individually) rather than widening `exclude` or adding a glob. |
| `vitest.config.ts`'s `test.projects` shape | New to this repo (D13's declared scope delta); not an extension of an in-repo pattern — the shape itself is the analysis's own recommendation (`analysis/014-test-suite-cleanup-analysis.md`, finding (b)), chosen over the two alternatives it measured (global environment, per-file directive) because environment-follows-extension needs no per-file convention to remember. |

No user-visible surface is touched by any milestone completed or remaining in this chain (confirmed
against the plan's Testing Strategy: "No product-behaviour change exists in this chain"), so the
"User-Visible Work" per-flow derivation does not apply.

## Code Quality Validation

- [x] `pnpm run typecheck` (both `tsc` programs) — exit 0, checked after M0, M1, M3, and again after
      M4b's partial state. No type errors introduced.
- [x] Linter: not run standalone this session (the plan's Validation section names only
      `pnpm run typecheck`; `pnpm run lint` is not a named acceptance instrument for this chain).
      Flagged here rather than silently skipped — if a later gate expects it, it is a plan
      omission, not an implementer skip.
- [x] Tests: `npx vitest run` — 46/46 files, 605/605 passing, exit 0 at the current tree state (two
      files deleted since M0's 48/617 baseline; see AC2 evidence below).
- [x] Compatibility: no production code shipped in a mutated state — the one mutation made (row 3's
      `formatReport`) was local and fully reverted; `git diff` on `backfillValid.ts` is empty at the
      commit that includes it.

## Value Statement Validation

**Original**: "the next chain copies a clean suite and cites the standard instead of the
memorial/source-text/ID-named patterns the suite currently teaches."

**Delivered so far**: the standard exists and is citable (M1) and three ID-named/memorial files are
gone or repaired (M4b partial: rows 43, 11, 3). **Not yet delivered**: 45 of 48 files still carry
their pre-chain names/classes; the suite as a whole does not yet "teach" the standard. Value
delivery is **partial and in progress**, consistent with a mid-chain handoff — not a claim of
completion.

## TDD Compliance

This chain is not new-feature code; per QA's Phase 1 document (`qa/014-test-suite-cleanup-qa.md`,
"Acceptance criteria for QA's own Phase 2 pass", item 2), the standard TDD Compliance table's rows
apply to conversions and oracle repairs (each owes a red-under-mutation showing), not to pure
renames or deletions. No new function/class was authored this session — the three lifted helper
files are extractions of existing test code, not new behaviour, and their extraction is proven
behaviour-preserving by exact pass-set-identity comparison (below), which is the evidence this
chain's own axiom (A) and QA's Phase 2 criteria substitute for a red/green cycle on a pure
extraction.

| Row / Surface | Evidence type | Mutation | Result | Restored? |
|---|---|---|---|---|
| M4b row 3, `formatReport`'s provenance-stamp case | Axiom (A), H4 never-red guard | `formatReport` — spread `...meta` replaced with an explicit `{tableWideRowCount, interrupted}` allowlist, dropping `runId`/`startedAt`/`endedAt` | Case failed: `AssertionError: expected undefined to be 'run-1'` | Yes — `git diff` on `backfillValid.ts` empty at commit `62b61bd` |
| M3 helper extraction (`makeSection`, `makeMediaGallery`) | Behaviour-preservation, not TDD red/green (pure extraction claim) | N/A — extraction, not a new function | Full-suite pass-set identity check: 617/617 keys `(path, fullName, status)` identical before/after, 0 lost/0 added | N/A |
| M2 (`vitest.config.ts` → `test.projects`) | Behaviour-preservation, not TDD red/green — config-only change, no new production function or class authored | N/A — no function/class introduced; `vitest.setup.dom.ts` sets one existing global flag, no logic | Full-suite pass-set identity check: 604/604 keys `(file, fullName, status)` identical before/after, exit 0 both runs | N/A |

## Class Sweep Table

Not applicable this round. This is the chain's first implementation delivery, not a fix round
responding to reviewer findings — no code-review or QA findings exist yet to sweep against (code
review has not run; QA Phase 2 has not started). The one self-found gap this session encountered
(row 3's H4 mutation) was a single named row the plan itself enumerated, not a class discovered by a
negative control that generalizes beyond it — no class sweep is owed from it.

## Test Coverage

Unit-level only, per the plan's Testing Strategy (no e2e, no product-behaviour change). Coverage
this session: the M3 helper lift and M4b's three rows are covered by the existing suite continuing
to pass (46/46 files, 605/605 tests) plus the one axiom-(A) mutation captured above. No new test
cases were added this session (M4b/M4a/M4c are disposition work on existing cases, not new-feature
TDD).

## Test Execution Results

| Command | Result | Notes |
|---|---|---|
| `npx vitest run --reporter=json --reporter=verbose` (M0, at `a74b9e2`) | 48 files / 617 tests / 0 failed / **exit 0** | `agent-output/verification/014/baseline-a74b9e2.json` |
| `pnpm test` (post-M3) | 48/617, exit 0 | ad hoc check |
| `npx vitest run --reporter=json` (post-M3) | 617/617, exit 0; pass-set identity vs. M0 confirmed (0 lost, 0 added) | `/tmp/m3-run.json` (not committed — ad hoc verification, not a plan-named capture point) |
| `pnpm run typecheck` (post-M3, post-M4b-partial) | exit 0, both `tsc` programs | |
| `npx vitest run src/scripts/__tests__/012-backfill-report.test.ts` (row 3, mutated) | 29 passed, **1 failed** (the H4 case) | axiom-(A) evidence |
| `npx vitest run src/scripts/__tests__/012-backfill-report.test.ts` (row 3, reverted) | 30/30 | |
| `npx vitest run` (post-M4b-partial: rows 43, 11, 3) | **46 files / 605 tests / 0 failed / exit 0** | 617 − 8 (row 43) − 4 (row 11) = 605 ✓ |
| Per-row: 7 mutate/verify/revert/re-verify cycles (rows 7, 14, 15, 20, 22, 46 — row 13's cases needed no repair) | each mutation produced 1+ failures, each revert restored 0-diff green | full detail + exact failure counts in `verification/014/disposition-table.md` |
| `pnpm run typecheck` (after each of the 7 M4b rows) | exit 0, both `tsc` programs, every time | |
| `npx vitest run --reporter=json` (M4b complete, full suite) | **46 files / 604 tests / 0 failed / exit 0** | 605 − 1 (row 7's D8 case deletion) = 604 ✓; no other count drift — confirms rows 13/14/15/20/22/46's repairs changed 0 pass/fail outcomes, only oracles/names |
| `npx vitest run --reporter=json` (M4a complete, full suite) | **46 files / 604 tests / 0 failed / exit 0** | Unchanged from post-M4b — zero case drift across all 27 renames |
| `npx vitest run --reporter=json` (M2, pre-config-change baseline) | 46 files / 604 tests / 0 failed / exit 0 | `/tmp/m2-pre-baseline.json` |
| `pnpm add -D jsdom` | jsdom 30.0.1 added; lockfile diff purely additive (`git diff pnpm-lock.yaml \| grep -c '^-[^-]'` = 0) | pre-existing unmet-peer warnings (react-accessible-accordion, react-slider, react-use) are unrelated, not introduced by this change |
| `pnpm run typecheck` (post-M2 config rewrite) | exit 0, both `tsc` programs | |
| `npx vitest run --reporter=json` (M2, post-config-change) | 46 files / 604 tests / 0 failed / **exit 0** | `/tmp/m2-post.json`; exact `(file, fullName, status)` tuple-set comparison against the pre-change baseline: **identical**, 0 only-in-pre, 0 only-in-post |
| `git diff --stat -- src/` (M2) | empty | confirms "nothing in `src/` outside tests and `__tests__/helpers/`" per the plan's M2 scope line |

## Key Decisions (M3 — record for the disposition table / retrospective)

`makeSection` had three behaviourally-drifted signatures across five files (accessory-object
first-arg in one file; no-arg in a second; `(textCount, accessoryType)` in three). Reconciled to one
polymorphic function: a numeric first argument selects `(textCount, accessoryType)` behaviour, a
non-numeric first argument is used directly as the accessory object. This changes the *default*
(bare-call) fixture value in two of the five files (from a fixed `{content:'Hello'}` accessory
object to `{content:'Text 0'}` with a thumbnail accessory) — verified, by reading every bare-call
site in both files, that no assertion inspects that literal content value (all check
`result.success`, `.toHaveLength`, or structural equality on a *different*, explicitly-named text
display). Confirmed empirically, not just by inspection: exact pass-set identity before/after.

`makeMediaGallery` had two variants (fixed URL per item vs. an indexed URL per item). Reconciled to
the indexed form; verified no caller asserts on the literal URL (both callers that use `itemCount >
1` only check `result.success`).

Both decisions are recorded here because they are judgement calls a reviewer or QA should be able to
re-derive and re-verify, not because either changed the pass set (it did not).

## Outstanding Items — exact resumption state

**M4b is complete (10/10 rows).** Full per-row disposition — class, repair, surface, covering
test, evidence, commit — is recorded in the standalone Disposition Table,
`agent-output/verification/014/disposition-table.md` (opened per planner's checkpoint-reply
instruction, seeded from rows 43/11/3, appended per row through row 46). That table, not this
document, is now the authoritative per-row record; this document is not duplicating it further.

One finding worth flagging for a reader of the table: **row 46's "uses modulo 6 (not 5)" case was
a self-found gap** — its original shared fixture ID gave identical results under both moduli, so
it did not actually discriminate the regression its name claimed to guard against, despite passing
every prior run. Fixed in the same round (a new, genuinely divergent fixture ID) per the
mutation-exposed self-found-gap duty, with before/after mutation evidence recorded in the table.

**Sequence remaining: M4c (13 rows, ungated) → M5.** M2 is complete. Rows 9 and 12 ride M4c as
named riders (D19, rev 9) but are **gated** — see "M4c" below — and do not block the 13 ungated
rows.

### M4a — complete, 27/27 rows

All 27 rows renamed to `module.behaviour.test.ts` form with ID tokens stripped from titles and
comments. Full per-row list (old → new path, case count, commit) in
`verification/014/disposition-table.md`. Row 37 (H8, oracle-contamination guard) kept and renamed,
not deleted, per its class disposition. Row 47's E3a candidate (shares row 46's provenance) was
read and adjudicated: fixed the same self-referential avatarIndex formula, added the `// escaped:`
line matching row 46. Rows 5, 25, 26, 27, 40, 42, 44's M3-landed import lines were not re-touched.

Two new findings surfaced during the read-through, recorded but **not fixed** (out of pure-rename
scope, and in row 9's case blocked on the DOM harness not yet existing):
- **Row 9** (`editableComponents.operations.test.ts`): the "Auto-remove branch dispatch" describe
  block hand-rolls `SectionEditor.deleteTextComponent`'s branch logic inline instead of calling the
  real component — no production import anywhere in that block. Needs the DOM harness (M2) to fix
  properly.
- **Row 12** (`useApiMethods.json-editor-repair.test.ts`): a local `switchToV2`/`switchToClassic`
  transcription pair, structurally identical to what M4b row 14 fixed, used via a 2-hop expression
  (`switchToClassic(switchToV2(draft))`) that falls outside QA's E3b-indirect predicate (explicitly
  scoped to exactly one intermediate variable) — a documented instrument gap, not a false negative.
  The file's own header already discloses this as a deliberate stand-in.

Both are candidates for a future M4b-style repair row, not expanded into unilaterally here.

**Update**: D18 (drop the rider) was superseded same-day by D19 (owner, verbatim: "We can include
it then if the critic miss isn't a problem.") — rows 9 and 12 now ride M4c as two named riders
(rider 1 = row 12, H5 repair; rider 2 = row 9, H7 repair via the M2 harness), each with drop
disposition "leave as found + handoff record + Outstanding Items" if red-then-green cannot be
shown inside M4c. The rider gate (owner's critic waiver or a scoped critic APPROVE) **cleared same
day** — R-5, owner verbatim "Yes, skip the critic" (agent-output `2d0d52a`) — so both riders open
now, inside M4c, alongside its 13 ungated rows.

**Evidence obtained per file**: per-file case count verified equal and zero failures on both trees
(before/after rename) for all 27 rows; full suite re-run after the complete batch: 46 files / 604
tests / 0 failed / exit 0 — identical to the post-M4b count, confirming zero case drift across
every rename. Typecheck (`pnpm run typecheck`) exit 0 after every batch.

### M2 — DOM harness, complete

`vitest.config.ts` rewritten to `test.projects`: node project unchanged (`src/**/*.test.ts`,
`environment: 'node'`), new dom project (`src/**/*.test.tsx`, `environment: 'jsdom'`,
`setupFiles: ['./vitest.setup.dom.ts']`), `resolve.alias` factored to a shared `const` so the two
projects cannot drift apart. `jsdom` 30.0.1 added as a devDependency; lockfile diff purely
additive. `tsconfig.test.json`'s `include` gained the new setup file (extends the existing
per-file-listing pattern already used there for `vitest.config.ts`). Nothing under `src/` changed.
Verified: node project's pass set byte-identical to the pre-change baseline by exact
`(file, fullName, status)` tuple comparison (604/604, 0 lost/0 added), process exits 0, `pnpm run
typecheck` exit 0 (both programs). Committed `website` `988ca15`.

No `.test.tsx` files exist yet, so the analysis's edit-page teardown-rejection finding
(all-passed/exit-1 from nine eager `void import(...)` prefetches) has nothing to trigger. The
deterministic mitigation it names (`vi.mock` the nine prefetch targets) is M4c's responsibility,
owed by whichever M4c case first mounts `edit/page.tsx`.

**Code review**: scoped to this milestone's non-test diff (`package.json`, `pnpm-lock.yaml`,
`vitest.config.ts`) per D17/the plan. Not yet spawned — see Next Steps.

### M4c — 15 rows (13 + 2 riders); 2 landed, 13 remain — exact resumption state below

**Done**: row 45 (deleted, H1 delete branch, `website` `07af608`) — see disposition table for full
evidence. Row 12/rider 1 (H5 structural repair — dropped the local `switchToV2`/`switchToClassic`
transcription, imported the shipped functions from `~/utils/messageMode`, `website` `1f89b34`).
Full suite after both: 45 files / 576 tests / 0 failed / exit 0 (604 − 28 row-45 cases = 576; row
12's repair changed 0 outcomes).

**Remaining, in the order a resuming implementer should probably take them** (simplest/lowest-risk
first, not a plan-mandated order):
1. **Row 9 (rider 2, H7)** — `editableComponents.operations.test.ts`, "Auto-remove branch dispatch"
   block: replace the inline `deleteTextComponent` transcription with cases that mount
   `SectionEditor` (via `createRoot`+`act`, per the M2 analysis's POC pattern — no
   `@testing-library/react`) and observe the dispatched operation. Red on a mutation of the
   dispatch, green at head, per D19's rider text. Read the analysis's finding (a) table first for
   what `SectionEditor` needs mocked (it is not in the analysis's own POC list — new mount
   surface, verify it actually mounts before committing to the conversion; if it does not, D19's
   drop disposition applies: leave as found, handoff record, Outstanding Items).
2. **Rows 38, 39 (H9)** — `013-qa-paste-surface-render.test.ts`, `013-qa-toast-vessel-render.test.ts`
   (still ID-token-named; rename is part of this row per M4a's uniform rule extended here). Both
   already mount something via a hand-rolled `render()` — replace that with the real harness
   (`createRoot`+`act`) mounting the actual target (`NewMessageJsonInput`, `NullableComponent`
   respectively, per the inventory). Likely the smallest lift of what remains: the behavioural
   assertions probably survive, only the mount mechanism changes.
3. **Rows 10, 32, 33, 34, 36 (wholly source-text → convert)** — read what each currently asserts via
   `readFileSync`/`readSrc` (test-inventory doc has the target file per row) and rewrite as a mount
   + behavioural assertion using the M2 analysis's finding (a) table for each target's mock
   requirements. Row 10 → `TransitionHeightElement`; rows 32/33/34/36 → `JsonModalBody` /
   `NewMessageJsonInput` / `MessageProvider` (per the analysis's per-component mock list — row
   36 in particular touches all three). **Owner-ruling content warning**: rows 32/33/34/36 pin
   dated owner rulings (D29, D31, D33, and D29's reversal) as their subject — read
   `planning/closed/013-components-v2-editing-surfaces.md`'s cited revisions before converting, so
   the converted assertion still tests the ruling's substance, not just its old source-text proxy.
4. **Rows 14, 15, 16, 19, 35 (mixed)** — these already have their non-source-text cases repaired
   (14, 15 in M4b) or intact; convert only the source-text cases named in the inventory (2, 2, 3,
   3, 2 respectively) to mounted-behaviour assertions, keep the rest, no further rename needed (14,
   15 already renamed in M4b; 16, 19, 35 still need the M4a-style rename — carry it out here since
   this is the row's only remaining milestone touch).

**Named residue** (analysis-flagged, not established to mount): `EmojiPicker` (×3 files), the
individual `dynamics/*` wrappers, `DiscordMessageEditor` (mounted only transitively in the
analysis's POCs) — a converted case needing one of these that fails to mount goes to Outstanding
Items, never a silent drop.

**Process reminder for every row above**: TDD Gate procedure applies to any new mount helper
function; axiom-A mutation evidence (mutate the production behaviour locally, show the new
assertion red, revert, confirm `git diff` empty) is owed for every conversion, same discipline as
M4b/M4c rows 45 and 12 above. Re-verify full-suite count and exit code after each row, append the
disposition table per row (established pattern), commit `website` per row and `agent-output`'s
disposition-table/implementation-doc updates in batches rather than per-row to limit churn.

### M5 — not started

Acceptance sweep per the plan's seven numbered steps, including the six **positive controls** QA's
Phase 1 document requires (plant-run-remove, both directions) before trusting any "→ 0" result —
read `qa/014-test-suite-cleanup-qa.md`'s "Class tests need a discriminating control in both
directions" section before running this milestone. BC-3's control for M5 step 5 must be planted
*after* row 43 is gone (it already is) since row 43 was the only pre-existing member of that
predicate's positive class.

### Not yet done, any milestone

- IS-6 (mutation restoration) verification across the whole chain — this session's one mutation
  (row 3) is verified restored; every future mutation needs the same `git diff`-empty check recorded
  per row, not just narrated.
- QA Phase 2 has not started (correctly — it starts on this document landing, per D16/QA's own
  Phase 2 criteria).
- Code review has not run yet — M2 landed this session; scoped review is still owed (Next Steps).
- Rows 9/12 (M4c riders): gate cleared (R-5, `2d0d52a`) — open now inside M4c. If either cannot be
  shown red-then-green inside M4c, it drops to D19's disposition: leave as found, a handoff record,
  an Outstanding Items line.

## Next Steps

1. **Resume the implementer** at M4c, row 9 (rider 2) or wherever "Outstanding Items → M4c" above
   leaves off — read this document's M4c resumption block first, then the M2 analysis's finding
   (a) table and four mechanical facts, then the Disposition Table's M4c section, before writing
   any `.test.tsx` conversion. 13 of 15 M4c rows remain (45 and 12 are done).
2. Code-reviewer for M2's non-test diff (`package.json`, `pnpm-lock.yaml`, `vitest.config.ts`,
   `tsconfig.test.json`, `vitest.setup.dom.ts`) was requested from `steering-test-cleanup` this
   session (D17) — check whether it has landed; if not, it is still owed and does not block M4c
   (M4c is test-only, goes to QA under V-27).
3. Continue appending the Disposition Table per M4c row as each completes (already the
   established pattern from M4b/M4a/M2) rather than reconstructing it at M5.
4. After M5 lands: hand to QA Phase 2, per D16/the plan's Handoff Notes — carry the E3b two-hop
   instrument-gap finding (row 12) into that spawn cue, per planner's instruction, unless row 12's
   rider repair inside M4c removes the transcription it names (confirm at M5 time).
