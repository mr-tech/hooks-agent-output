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
ceiling a second time partway through M4c (2 of 15 rows landed: 45, rider 1/row 12) and checkpointed
rather than starting the DOM-mount conversions that make up the rest of M4c. Resumed again
(post-compaction, same session) and landed row 9/rider 2 (**both named riders (D19/R-5) now
landed**) and rows 38/39 (H9) — 5/15 M4c rows done, 10 remain (all wholly DOM-mount conversions).
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
| 2026-08-27 | Owner (direct) | "Continue" (post-compaction, same session) | R-5 (critic waived, `2d0d52a`) already had both riders open. Landed row 45 (H1 delete) and row 12/rider 1 (H5 repair), then hit the run-length ceiling and checkpointed (`050f3ab`). Resumed same session: landed row 9/rider 2 — established empirically that `SectionEditor` mounts under the M2 dom project (not in the analysis's own POC list), converted the "Auto-remove branch dispatch" block to a real mount, axiom-A mutation evidence captured (2/3 cases red), full suite 576/576 exit 0. **Both named riders are now landed — neither dropped, no handoff record owed.** website `4c4a357`. Continued in the same run: landed rows 38, 39 (H9) — replaced both files' hand-rolled `render()` walkers with real `createRoot`+`act` mounts, dropped row 39's second describe block as superseded by row 38's real drive of the same guard, axiom-A evidence for both (4/5 and 5/5 cases red), full suite 572/572 exit 0. website `4761453`. |

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

Not yet delivered: M4c (9 of 15 rows remain — both named riders, rows 38/39 (H9), and row 10 (H1)
are now landed) and M5 (acceptance sweep). The value statement is not yet fully met — see "Value
Statement Validation".

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
      `jsdom` added (`pnpm add -D jsdom`; lockfile diff is **+328/−7**, not purely additive — see
      the 2026-08-27 reconcile note under "Files Modified"), `vitest.setup.dom.ts`
      created and listed in `tsconfig.test.json`'s `include` (extends the existing per-file
      pattern already used there for `vitest.config.ts`). Node project pass set byte-identical to
      pre-change baseline (604/604, exact tuple match), exit 0, typecheck exit 0. Nothing under
      `src/` touched. Committed `website` `988ca15`.
- [ ] M4c — **In progress, 6/15 rows.** Row 45 deleted (H1 delete branch, `07af608`); row 12
      (rider 1) H5-repaired (`1f89b34`); row 9 (rider 2) H7-repaired — mounted the real
      `SectionEditor` for the auto-remove branch dispatch (`4c4a357`). **Both named riders
      (D19/R-5) landed — neither dropped.** Rows 38, 39 (H9) — replaced both hand-rolled
      `render()` walkers with real mounts of `NewMessageJsonInput`/`NullableComponent`; row 39's
      second describe block dropped as superseded by row 38's real drive (`4761453`). Row 10 (H1)
      — mounted `TransitionHeightElement`; 5 of the original 11 source-text assertions had no
      observable equivalent under this synchronous harness (SSR-only `hidden`-class timing),
      dropped and recorded in Outstanding Items (`100b319`). 9 rows remain: 32, 33, 34, 36
      (wholly source-text convert), 14, 15, 16, 19, 35 (mixed — convert source-text cases only).
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
| `vitest.config.ts` | website | M2: rewritten to `test.projects` (node + dom @ jsdom), `resolve.alias` factored out shared. **2026-08-27 code-review fix** (`e6163fd`): replaced the dead top-level `resolve: { alias }` (nothing read it; a future third project could omit its own copy and hit a resolver error) with a `project(test)` factory that always attaches the alias — structurally unskippable rather than a convention to remember. | -8/+26 (`988ca15`), then +18/−19 (`e6163fd`) |
| `tsconfig.test.json` | website | M2: added `vitest.setup.dom.ts` to `include`, following the existing per-file listing pattern already used for `vitest.config.ts`. | -1/+2 |
| `package.json` | website | M2: `jsdom` added under `devDependencies`. | +1 |
| `pnpm-lock.yaml` | website | M2: jsdom's dependency tree resolved. **2026-08-27 reconcile note** (code review, `agent-output/code-review/014-test-suite-cleanup-code-review.md`): the original "purely additive, 0 removed lines" claim here was **false** — `git show 988ca15 --numstat -- pnpm-lock.yaml` gives 328/7, independently reconfirmed by the implementer against the same instrument. The 7 removed lines are vitest's peer key gaining `jsdom@30.0.1` (2 lines, expected) plus a `debug` 4.3.4→4.4.3 bump across 5 sibling snapshots descending from `pm2` (not from `@pm2/pm2-version-check`, which is one of the five siblings, not their common ancestor — correction per `code-reviewer-hooks-014`, `verification/014/code-review-m2/debug-bump-attribution.txt`), same major, unrelated to this change. Nothing under `dependencies` changed. The commit message is left as written (`988ca15`, not amended); this row is corrected in place per the record-area correction form. | 328/7 (was misrecorded as -0/+328) |

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
| `website/vitest.setup.dom.ts` | website | M2: scopes `IS_REACT_ACT_ENVIRONMENT = true` to the dom vitest project only. **2026-08-27 code-review fix** (`e6163fd`, +2/−2): reworded a comment that claimed the flag "has no effect" in the node project rather than stating the file is never loaded there. |

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
| M4c row 12 (rider 1), `switchToClassic(switchToV2(draft))` cases | Axiom (A), H5 structural repair | `switchToClassic`'s type-1 component filter narrowed from `=== 1` to `=== 2` | 3/7 cases failed | Yes — `git diff` on `messageMode.ts` empty at commit `1f89b34` |
| M4c row 9 (rider 2), `SectionEditor` auto-remove dispatch | Axiom (A), H7 structural repair (component mount, not a new production function) | `deleteTextComponent`'s branch condition narrowed from `next.length === 0` to `next.length < 0` | 2/3 new mounted cases failed | Yes — `git diff` on `SectionEditor.tsx` empty at commit `4c4a357` |
| M4c row 38, `NewMessageJsonInput` settled notice | Axiom (A), H9 hand-rolled-renderer conversion | `noticeMessageForSettled`'s `warn-v2-flag-conflict` branch changed to return `null` | 4/5 cases failed | Yes — `git diff` on `src/utils/index.ts` empty at commit `4761453` |
| M4c row 39, `NullableComponent` show guard | Axiom (A), H9 hand-rolled-renderer conversion | `show ? children : null` inverted to `!show ? children : null` | 5/5 cases failed | Yes — `git diff` on `NullableComponent.tsx` empty at commit `4761453` |
| M4c row 10, `TransitionHeightElement` height/visibility (4 mutations, distinct branches) | Axiom (A), H1 convert | first-render display branch inverted; `onTransitionEnd` target guard removed; open-path and close-path `overflow-hidden` additions each removed in turn | 2/9, 1/9, 1/9, 1/9 cases failed respectively | Yes — `git diff` on `TransitionHeightElement.tsx` empty at commit `100b319` |

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
| `pnpm add -D jsdom` | jsdom 30.0.1 added; lockfile diff recorded at the time as purely additive (`git diff pnpm-lock.yaml \| grep -c '^-[^-]'` = 0) | pre-existing unmet-peer warnings (react-accessible-accordion, react-slider, react-use) are unrelated, not introduced by this change. **2026-08-27 reconcile note**: that instrument does not reproduce — `git show 988ca15 --numstat -- pnpm-lock.yaml` gives 328/7 (7 removed lines: 2 from vitest's peer key, 5 from an unrelated `debug` patch bump in the `pm2` devDependency subtree). Per this codebase's own RTK caution, a piped-diff line-count is not a sound instrument for this; `--numstat` or a redirected-file `grep -c` is. See the corrected "Files Modified" row for `pnpm-lock.yaml`. |
| `pnpm run typecheck` (post-M2 config rewrite) | exit 0, both `tsc` programs | |
| `npx vitest run --reporter=json` (M2, post-config-change) | 46 files / 604 tests / 0 failed / **exit 0** | `/tmp/m2-post.json`; exact `(file, fullName, status)` tuple-set comparison against the pre-change baseline: **identical**, 0 only-in-pre, 0 only-in-post |
| `git diff --stat -- src/` (M2) | empty | confirms "nothing in `src/` outside tests and `__tests__/helpers/`" per the plan's M2 scope line |
| `npx vitest run` (row 45 deleted, row 12/rider 1 repaired) | 45 files / 576 tests / 0 failed / exit 0 | 604 − 28 (row 45) = 576 ✓; row 12's repair changed 0 outcomes |
| `npx vitest run` (row 9/rider 2, new mount file, first attempt) | 3/3 failed — `TypeError: Cannot read properties of undefined (reading 'dispatchEvent')` | delete button not yet found: mount checked before the `next/dynamic` Tooltip wrapper's async import resolved |
| `npx vitest run` (row 9/rider 2, after a post-mount settle) | 3/3 failed — `AssertionError: expected "vi.fn()" to be called once, but got 0 times` | button now found, but a bare pointerdown+pointerup did not fire react-aria's `onPress` |
| `npx vitest run` (row 9/rider 2, full pointerdown+pointerup+click sequence) | **3/3 passed** | matches the M2 harness's established react-aria press sequence |
| `npx vitest run` (row 9/rider 2, `deleteTextComponent` mutated `=== 0` → `< 0`) | 2/3 failed | axiom-(A) evidence |
| `npx vitest run` (row 9/rider 2, reverted) | 3/3 passed; `git diff` on `SectionEditor.tsx` empty | |
| `npx vitest run --reporter=json` (M4c: rows 45, 12, 9 landed, full suite) | **46 files / 576 tests / 0 failed / exit 0** | net 0 vs. the row-45/12 checkpoint: row 9 removed 3 inline cases, added 3 mounted cases |
| `pnpm run typecheck` (after row 9) | exit 0, both `tsc` programs | |
| `npx vitest run` (row 38, first pass) | **5/5 passed** | mounted cleanly on the first attempt — `NewMessageJsonInput` was already in the M2 analysis's POC list |
| `npx vitest run` (row 38, `noticeMessageForSettled`'s warn-v2-flag-conflict branch mutated to return `null`) | 4/5 failed | axiom-(A) evidence |
| `npx vitest run` (row 38, reverted) | 5/5 passed; `git diff` on `src/utils/index.ts` empty | |
| `npx vitest run` (row 39, first pass) | **5/5 passed** | `NullableComponent` (M2 analysis POC #1) needs no mocks |
| `npx vitest run` (row 39, `NullableComponent`'s `show` condition inverted) | 5/5 failed | axiom-(A) evidence |
| `npx vitest run` (row 39, reverted) | 5/5 passed; `git diff` on `NullableComponent.tsx` empty | |
| `npx vitest run --reporter=json` (M4c: rows 45, 12, 9, 38, 39 landed, full suite) | **46 files / 572 tests / 0 failed / exit 0** | 576 − 4 = 572; row 39's second describe block (4 cases) dropped as superseded, everything else net 0 |
| `pnpm run typecheck` (after rows 38/39) | exit 0, both `tsc` programs | |
| `npx vitest run` (row 10, first pass) | **9/9 passed** | `TransitionHeightElement` (M2 analysis POC #2) mounts with no extra mocks |
| `npx vitest run` (row 10, first-render `unmount ? 'none' : 'block'` inverted) | 2/9 failed | axiom-(A) evidence |
| `npx vitest run` (row 10, reverted; `onTransitionEnd`'s `e.target === wrapperRef.current` check removed) | 1/9 failed | axiom-(A) evidence |
| `npx vitest run` (row 10, reverted; open-path `classList.add('overflow-hidden')` removed) | 1/9 failed | axiom-(A) evidence |
| `npx vitest run` (row 10, reverted; close-path `classList.add('overflow-hidden')` removed) | 1/9 failed | axiom-(A) evidence |
| `npx vitest run` (row 10, reverted) | 9/9 passed; `git diff` on `TransitionHeightElement.tsx` empty | |
| `npx vitest run --reporter=json` (M4c: rows 45, 12, 9, 38, 39, 10 landed, full suite) | **46 files / 570 tests / 0 failed / exit 0** | 572 − 2 = 570; row 10 net −2 (11 source-text cases → 9 mounted cases, 5 dropped as unobservable + 3 combined into fewer cases) |
| `pnpm run typecheck` (after row 10) | exit 0, both `tsc` programs | |
| `npx vitest run --reporter=json` (post-code-review fixes: `vitest.config.ts` factory refactor, `vitest.setup.dom.ts` comment) | **46 files / 570 tests / 0 failed / exit 0** | unchanged — confirms the alias factory is behaviour-preserving (both projects still resolve `~`/`bot` — proven by every `~/...`-importing test in both projects still passing) |
| `pnpm run typecheck` (post-code-review fixes) | exit 0, both `tsc` programs | |
| `git show 988ca15 --numstat -- pnpm-lock.yaml` | **328 added / 7 removed** | independently reconfirms the code reviewer's finding — the implementation doc's original "purely additive" claim was false; corrected in place (see "Files Modified") |

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

**Sequence remaining: M4c (9 rows left) → M5.** M2 is complete (and its code review has landed and
been addressed). Both named riders (rows 9 and 12, D19/R-5, rev 9), rows 38/39 (H9), and row 10
(H1) have landed — see "M4c" below.

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

**Code review**: `APPROVED_WITH_COMMENTS` at `website` `988ca15` —
`agent-output/code-review/014-test-suite-cleanup-code-review.md` (`agent-output` `d7c5fe5`). Scope
was the 5 non-test M2 paths only; nothing under `src/` was assessed (QA's under V-27). The
reviewer independently re-ran the behaviour-preservation claim (604/604 tuples, 0 lost/0 added,
exit 0, different rig) and confirmed the dom project actually collects/mounts (a 0-`.test.tsx`
tree at `988ca15` meant the implementer's own "exit 0" had only ever measured the node project).
Three items, all addressed same-session (none gated M4c or QA):
- **MEDIUM** — the "pnpm-lock.yaml diff is purely additive" claim was false (328/7, not 328/0);
  corrected in place in "Files Modified"/"Test Execution Results" below with a dated reconcile
  note, per the record-area correction form. Commit message left as written.
- **MEDIUM** — `vitest.config.ts`'s top-level `resolve: { alias }` was dead (nothing reads it;
  each project already carried its own copy) and, left in place, invited a future third project to
  omit its own alias and hit a resolver error. Fixed with the reviewer's preferred structural fix:
  a `project(test)` factory that always attaches `resolve: { alias }`, so a project cannot be
  written without it — the dead top-level key is gone. Re-verified: full suite 570/570, exit 0;
  typecheck exit 0 (both programs).
- **LOW** — `vitest.setup.dom.ts`'s comment claimed the flag "has no effect in the node project's
  environment"; it does not run there at all (`setupFiles` is dom-project-only). Reworded.

Re-verification is recorded as a sub-entry of the review's own round (not a new round, per the
reviewer's instruction) — see "Test Execution Results".

### M4c — 15 rows (13 + 2 riders); 6 landed, 9 remain — exact resumption state below

**Done**: row 45 (deleted, H1 delete branch, `website` `07af608`) — see disposition table for full
evidence. Row 12/rider 1 (H5 structural repair — dropped the local `switchToV2`/`switchToClassic`
transcription, imported the shipped functions from `~/utils/messageMode`, `website` `1f89b34`).
Row 9/rider 2 (H7 structural repair — replaced the "Auto-remove branch dispatch" block's inline
`deleteTextComponent` transcription with cases mounting the real `SectionEditor`, `website`
`4c4a357`) — **both named riders (D19/R-5) are now landed; neither dropped, no handoff record
owed.** `SectionEditor` needed three context mocks (`IsMobileProvider`, `GuildProvider`,
`MarkdownProvider`, each throws outside its real provider), a one-macrotask settle for its
`next/dynamic`-loaded per-button `Tooltip`, and a full pointerdown+pointerup+click sequence to fire
`onPress` (pointerdown+pointerup alone does not). Rows 38, 39 (H9) — both hand-rolled `render()`
walkers replaced with real `createRoot`+`act` mounts (`NewMessageJsonInput`, driven through its
real CodeMirror editor; `NullableComponent`, directly). Row 39's second describe block (a
conjunct-isolated proxy for the paste-surface guard, written when no harness existed) was dropped
as superseded — row 38's real mount now drives that exact guard through genuine behaviour. `website`
`4761453`. Row 10 (H1) — mounted `TransitionHeightElement`; 5 of 11 original source-text assertions
(the SSR-only `hidden`-class window, its imperative removal, and the now-nonexistent legacy
condition it replaced) have no observable equivalent under `createRoot`+`act`: React 19's
concurrent root does not commit `root.render()` synchronously outside `act()`, and `act()` collapses
the pre-hydration render together with `useMounted`'s effect flip into one flush, so the class never
appears in a readable state. Dropped, recorded in Outstanding Items below (`website` `100b319`).
Full suite after all six: 46 files / 570 tests / 0 failed / exit 0 (604 − 28 row-45 cases = 576;
rows 12/9 changed 0/net-0; rows 38/39 net −4; row 10 net −2: 11 source-text cases → 9 mounted).

**Code review of M2's non-test diff landed mid-M4c**: `APPROVED_WITH_COMMENTS` at `website` `988ca15`
(`agent-output/code-review/014-test-suite-cleanup-code-review.md`, `agent-output` `d7c5fe5`). Three
items, all fixed same-session, none of which gated M4c: a false "purely additive" pnpm-lock.yaml
claim corrected in place with a dated reconcile note (actual: 328 added/7 removed, unrelated to
this change's substance); `vitest.config.ts`'s dead top-level `resolve: { alias }` replaced with a
`project(test)` factory (the reviewer's preferred structural fix) so a project cannot be written
without its alias; `vitest.setup.dom.ts`'s comment reworded. Re-verified: full suite 570/570 exit 0,
typecheck exit 0 both programs — see "Test Execution Results".

**Remaining, in the order a resuming implementer should probably take them** (simplest/lowest-risk
first, not a plan-mandated order):
1. **Rows 32, 33, 34, 36 (wholly source-text → convert)** — read what each currently asserts via
   `readFileSync`/`readSrc` (test-inventory doc has the target file per row) and rewrite as a mount
   + behavioural assertion using the M2 analysis's finding (a) table for each target's mock
   requirements. Target: `JsonModalBody` / `NewMessageJsonInput` / `MessageProvider` (per the
   analysis's per-component mock list — row 36 in particular touches all three).
   **Owner-ruling content warning**: rows 32/33/34/36 pin
   dated owner rulings (D29, D31, D33, and D29's reversal) as their subject — read
   `planning/closed/013-components-v2-editing-surfaces.md`'s cited revisions before converting, so
   the converted assertion still tests the ruling's substance, not just its old source-text proxy.
2. **Rows 14, 15, 16, 19, 35 (mixed)** — these already have their non-source-text cases repaired
   (14, 15 in M4b) or intact; convert only the source-text cases named in the inventory (2, 2, 3,
   3, 2 respectively) to mounted-behaviour assertions, keep the rest, no further rename needed (14,
   15 already renamed in M4b; 16, 19, 35 still need the M4a-style rename — carry it out here since
   this is the row's only remaining milestone touch).

**Named residue** (analysis-flagged, not established to mount): `EmojiPicker` (×3 files), the
individual `dynamics/*` wrappers, `DiscordMessageEditor` (mounted only transitively in the
analysis's POCs) — a converted case needing one of these that fails to mount goes to Outstanding
Items, never a silent drop.

**Uncovered surface from row 10's conversion**: `TransitionHeightElement`'s pre-hydration SSR
`hidden`-class window (the class exists in the server-rendered/first-paint DOM only until
`useMounted()`'s effect flips, at which point the JSX conditional and an imperative
`classList.remove('hidden')` both independently clear it) has no covering test after row 10. The
`createRoot`+`act` harness cannot observe it: `root.render()` outside `act()` does not commit
synchronously under React 19's concurrent root, and every `act()`-wrapped mount collapses the
pre-hydration render together with the mount-flip effect into one flush, so the class is never in
a readable state. This is the same family of gap the M2 analysis already named for `edit/page.tsx`
(async-effect/hydration timing not observable via this synchronous harness) — not new to this row.

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

1. **Resume the implementer** at M4c, rows 32/33/34/36 (wholly source-text) or wherever
   "Outstanding Items → M4c" above leaves off — read this document's M4c resumption block first,
   then the M2 analysis's finding (a) table and four mechanical facts, then the Disposition
   Table's M4c section, before writing any `.test.tsx` conversion. 9 of 15 M4c rows remain (45,
   12, 9, 38, 39, 10 are done).
2. Code review of M2's non-test diff landed and was addressed same-session —
   `APPROVED_WITH_COMMENTS` at `website` `988ca15`, three items fixed, re-verified 570/570 exit 0.
   No further action needed here.
3. Continue appending the Disposition Table per M4c row as each completes (already the
   established pattern from M4b/M4a/M2) rather than reconstructing it at M5.
4. After M5 lands: hand to QA Phase 2, per D16/the plan's Handoff Notes. The E3b two-hop
   instrument-gap finding (row 12) is now **moot** — row 12's rider repair (this session) deleted
   the local `switchToV2`/`switchToClassic` transcription the finding named, so there is nothing
   left for QA's E3b-indirect predicate to have missed at that site. Confirm this at the spawn cue
   rather than carrying the finding forward.
