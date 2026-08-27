---
ID: 014
Origin: 014
UUID: 4671e28c
Status: Active
---

# Plan 014 — Disposition Table (AC1's instrument)

Per plan 014 AC1 and planner-hooks-014's checkpoint reply (2026-08-27): this is the standalone
artifact covering all 48 rows of `agent-output/analysis/test-inventory-2026-08-26.md`, one row per
file, appended as each row is dispositioned rather than reconstructed at M5. Row numbers match the
inventory's own numbering. `covering test` is `path::title` where a disposition owes one; `seen-to-
fail evidence` is filled only where the plan's rubric owes axiom-(A) mutation evidence (H4/H5
repairs) — a plain rename or plain deletion of an out-of-rubric case records "not owed" instead of
being left blank, so an empty cell is never ambiguous between "not owed" and "not yet done".

## Columns

`# | path | class | disposition | surface | covering test | old title → new title | seen-to-fail evidence | milestone | commit`

## Rows

| # | path | class | disposition | surface | covering test | old title → new title | seen-to-fail evidence | milestone | commit |
|---|---|---|---|---|---|---|---|---|---|
| 43 | `src/utils/__tests__/message-init-route0.test.ts` | H7 (zero-production-import transcription) + J1/J2 (pin of known-unfixed bug, 1 case) | Deleted. Handoff committed first per IS-2. | `src/providers/MessageProvider/index.tsx` route-0 mount-effect init — **no surviving covering test**; recorded as an Outstanding Item, not silently dropped. | none — surface uncovered, logged in the handoff | n/a (file deleted) | not owed (deletion, not a repair) | M4b | agent-output `c5e1d59` (handoff, prior); website `62b61bd` (delete) |
| 11 | `src/utils/__tests__/011-style-reconciliation-poc.test.ts` | H6 (third-party source assertion) | Deleted, no covering test owed (surface is `node_modules/react-dom` + `react-use` source text, not this project's own surface). | n/a — third-party source, not a product surface | none owed | n/a (file deleted) | not owed (deletion, not a repair) | M4b | website `62b61bd` |
| 3 | `src/scripts/__tests__/012-backfill-report.test.ts` → `src/scripts/__tests__/backfillValid.report-and-target-guards.test.ts` | H4 (never-red guard), also review-round-named (title ID tokens) | Kept, renamed (C form), retitled (8 titles stripped of ID tokens: M1, M1-r2 ×2, L8, M4, M4-Preferred, L10, M6, M6-Minimum). | `src/scripts/backfillValid.ts` — `formatReport`'s provenance-stamp behaviour | `backfillValid.report-and-target-guards.test.ts::"stamps report content with run provenance metadata"` (renamed case; guards `formatReport`'s `{...report, ...meta}` spread) | `'stamps report content with run provenance (M6)'` → `'stamps report content with run provenance metadata'` (plus 7 other titles stripped; full list in implementation doc "Key Decisions") | Local mutation: `formatReport`'s spread narrowed to two named fields only (dropped `...meta`'s remaining keys) → case failed with `AssertionError`; reverted; `git diff` on `backfillValid.ts` confirmed empty; 30/30 green at head. | M4b | website `62b61bd` |

## Not yet started (45 rows)

Rows 1, 2, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 44, 45, 46, 47, 48 — see
`agent-output/analysis/test-inventory-2026-08-26.md` for class and
`agent-output/implementation/014-test-suite-cleanup-implementation.md` "Outstanding Items" for the
per-row disposition plan (M4b rows 7/13/14/15/20/22/46 detailed individually; M4a's 27 rows and
M4c's 13 rows listed by number pending their milestone's opening).
