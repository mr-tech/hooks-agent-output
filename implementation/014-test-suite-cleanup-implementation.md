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
rows) completed in that continuation. See "Outstanding Items" for exact resumption state for the
milestones still remaining (M4a, M2, M4c, M5).

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-08-27 | planner-hooks-014 → implementer-hooks-014 | Plan rev 6 approved, QA Phase 1 landed (D16) | Implementer spawned. Read plan, QA Phase 1, analysis, critique, inventory, coordination plan in full. |
| 2026-08-27 | planner-hooks-014 (cross-session) | Plan rev 7 | M0 file-membership reconciliation (path, not count), AC2 key = (path, `fullName`), M4b residue (rows 13, 15) — absorbed before M0. |
| 2026-08-27 | planner-hooks-014 (cross-session) | Plan rev 8 + cycle-2 critique APPROVE | Row 13 moved to M4b-only (was dual-owned, QA-1/critic M-13). M4b = 10 rows (3, 7, 11, 13, 14, 15, 20, 22, 43, 46), M4a = 27, M4c = 13. Absorbed before opening M4b/M4a. |
| 2026-08-27 | implementer-hooks-014 | Self | M0, M1, M3 complete; M4b partial (rows 43, 11, 3). Session stopped at the run-length ceiling. Status field set to In Progress. |
| 2026-08-27 | Owner (direct) | "Continue" (same session, not a fresh spawn) | Sent correction to `steering-test-cleanup` (was told to expect a fresh spawn). Opened the standalone Disposition Table (`verification/014/disposition-table.md`), seeded rows 43/11/3 per planner's instruction, then completed the remaining 7 M4b rows (7, 13, 14, 15, 20, 22, 46) — **M4b is now complete, 10/10 rows.** Full suite: 604/604 passing, exit 0 (605 baseline − 1 from row 7's D8 deletion, exactly as expected; no other count drift). |

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

Not yet delivered: all of M4a (27 renames), M2 (DOM harness), M4c (13 conversions), and M5
(acceptance sweep). The value statement is not yet fully met — see "Value Statement Validation".

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
- [ ] M4a — Not started (27 rows).
- [ ] M2 — Not started (DOM harness; analysis complete and cleared, `50f053a`).
- [ ] M4c — Not started (13 rows; depends on M2).
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

**Sequence remaining (fixed by the plan): M4a (27 rows) → M2 → M4c (13 rows) → M5.**

### M4a — 27 rows, not started

Rows 1, 2, 4, 5, 6, 8, 9, 12, 17, 18, 21, 23, 24, 25, 26, 27, 28, 29, 30, 31, 37 (H8), 40, 41, 42, 44,
47, 48. Pure renames + title strips + effort-bound comment removal, **no case change**. Rows 5, 25,
26, 27, 40, 42, 44 were already opened by M3 (import lines only) — M4a reopens them for the rename
step; do not re-touch the import lines. Row 37 is H8 (oracle-contamination guard, keep-and-rename,
not delete). Row 47 gets the `// escaped:` line added (H3/J6 candidate, shares row 46's provenance
per QA's AC7 sweep — read `qa/014-test-suite-cleanup-qa.md`'s row on `plan-005-qa-validation` before
dispositioning).

**Evidence owed per file**: per-file case count equal and zero failures on both trees (before/after
rename), `old title → new title` filled for every retitled case. This is the highest-file-count,
lowest-per-file-risk milestone — a good candidate for batching several files per commit once a
rhythm is established, but each file's rename should still be verified individually (run that one
file's tests before moving to the next) since a bad `git mv` or an import path left stale after a
directory-relative reference would silently drop the file from collection (INST-1's failure mode).

### M2 — DOM harness, not started

Analysis complete and consumed (`analysis/014-test-suite-cleanup-analysis.md`, `50f053a`): jsdom via
vitest `test.projects` (node project `.test.ts` / dom project `.test.tsx`), `pnpm add -D jsdom`
forward step, no `@testing-library/react` (`createRoot` + `act`), exit-code acceptance (the analysis
found a reproducible all-passed/exit-1 shape from the edit page's eager `void import(...)`
prefetches — stub the nine targets, per the analysis's "deterministic" finding). Read the analysis's
"(a)–(e)" findings section in full before touching `vitest.config.ts`. Code review is scoped to this
milestone's non-test diff only (`package.json`, `pnpm-lock.yaml`, `vitest.config.ts`) — spawn
code-reviewer after this milestone lands, per D17's contact rule.

### M4c — 13 rows, not started, depends on M2

Rows 10, 32, 33, 34, 36 (wholly source-text, convert), 45 (H1 delete branch — no oracle exists under
any harness, analysis S4), 14, 15, 16, 19, 35 (mixed — convert only the source-text cases), 38, 39
(H9 — replace hand-rolled `render()` with the harness). Named residue if a conversion needs it and it
fails to mount: `EmojiPicker`, the individual `dynamics/*` wrappers, `DiscordMessageEditor` — goes to
Outstanding Items, not a silent drop.

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
- Code review has not run (correctly — scoped to M2, which has not landed).

## Next Steps

1. **Resume the implementer** (a fresh spawn or continuation) at M4a row 1, per the row list above.
   Read this document, the plan (rev 8 or later — check for further cross-session revisions before
   resuming), `qa/014-test-suite-cleanup-qa.md`, and the Disposition Table in full first.
2. Continue appending the Disposition Table per M4a/M4c row as each completes (already the
   established pattern from M4b) rather than reconstructing it at M5.
3. After M2 lands: spawn the code-reviewer subagent (scoped to M2's non-test diff), per D17.
4. After M5 lands: hand to QA Phase 2, per D16/the plan's Handoff Notes.
