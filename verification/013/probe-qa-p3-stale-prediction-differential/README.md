# `probe-qa-p3-stale-prediction-differential/` — settling the STALE markings by execution

**Built by**: `qa-hooks-013-3`, 2026-08-25, Phase 3 (register maintenance).
**Trees executed**: `2d90e8a` (live tip), `d7c4836` (immediately before the two commits the
staleness marking cited), `4a7126b` (the tree QA's own verdict is anchored to).

## What this settles

`uat` rev 18 marked eight register rows **PREDICTION STALE** because the surfaces beneath them were
touched at `e343927` and `2d90e8a`. That marking was derived from those commits' **file lists**, not
from executing the rows' predicates. Row definitions are QA's, so the re-derivation is QA's.

This directory holds the differential that settles it. The rule it applies is qa.md's, "Verdict
Freshness": *the differential scopes the refresh, it never replaces it — settle it by executing both
trees over the verified surface, never by reading the diff's file list.* Applied here to register
rows rather than to a verdict.

## The instrument

`013-qa-p3-stale-prediction-differential.test.ts` **dumps, it does not judge.** For every register
row that predicts a user-visible string or a disposition it computes that value from the real
product functions and the real surface source, and writes a deterministic report. The same spec is
run unchanged at three trees and the reports are diffed.

- identical line → the row's prediction did not move; the staleness marking is over-broad there.
- changed line → the prediction moved; QA re-derives it to the new value.

| Section | Covers | Computed from |
|---|---|---|
| A | BC-7, BC-8, BC-9, BC-10, BC-18, BC-21 | `resolveContentLoss` / `noticeMessageForSettled` / `applyDisposition` / `validateContentRequirements` over **all eight** cells of `(bit, hasV2Components, hasClassicContent)` |
| B | BC-6, and the code-path notice | `describeUnsupportedComponentTypes`, plus the rendered template extracted from each of the three surfaces |
| C | BC-1 | `describeLoadDiff(computeLoadDiff(...))`, and — added after the first run — whether the confirmation **agrees with what `commitLoad` actually does** |
| D | BC-9, BC-18 | the row-E resting state at both JSON surfaces (D31) |
| E / E2 | the five floors relaxed at `e343927` (D34); the silent-drop class | import-shape acceptance and disposition for each now-legal empty child; whether every removed component is named |
| F | BC-18's two limbs | the paste surface's effect, transcribed as a reducer and executed over edit sequences |
| Z | the instrument itself | non-vacuity: every stale row id appears, exactly eight cells are dumped, the report exceeds a length floor |

**The reducer in section F does not hardcode which state the row-E branch writes** — it reads that
from the surface source, so one transcription models the baseline tree and the tip tree correctly and
cannot silently mis-model whichever tree it was not written against.

## Result

**`d7c4836` → `2d90e8a`** — the two commits the marking cited — moves **28 report lines**, all of
them in two places:

1. the dropped-types notice **wording** at all three surfaces (`Not carried: X. Discord does not
   support these on hooks.gg.` → `Not supported on Hooks.gg: X`);
2. the code-path notice **removed from the product** (`CodeMessageNotice.tsx` deleted,
   `codeMessageDroppedNotice` gone from `MessageProvider` and `layout.tsx`);
3. three empty-child payloads moving from **rejected** to **accepted as row B with the
   flag-added warning** (the D34 relaxation).

**Sections A, C, D and F are byte-identical across those two commits.** The dispositions, the
settled-notice strings, the Load confirmation and the row-E resting state did not move at all.

**`4a7126b` → `2d90e8a`** moves 48 lines: the above, plus the row-E **resting state** at both JSON
surfaces (`pendingChoice` → `dismissedChoice`, D31 at `d7c4836`). That commit is **not** one of the
two the marking cited, and it is the one that actually reaches a register row.

Per-row dispositions are in the QA document's Phase 3 section; this directory holds the evidence.

## Two findings the differential turned up, neither of them a movement

Both are **pre-existing and identical at all three trees** — they are not regressions from the
post-release round. They were found because re-deriving a prediction means computing what the
surface actually does, which nobody had done for these two paths.

- **F-QA29** — the Load confirmation is computed over the **raw** validated draft while `commitLoad`
  applies `applyDisposition`. For disposition row D they disagree. See section C's
  `CONFIRMATION vs WHAT LOAD ACTUALLY DOES` block, and the pre-registered spec.
- **F-QA30** — `filterTopLevelComponent` drops a Container left with no surviving children (and an
  Action Row left with no buttons) **without recording a label**, so nothing is shown to the user.
  See section E2, whose table carries its own positive controls.

## Files

| File | What it is |
|---|---|
| `013-qa-p3-stale-prediction-differential.test.ts` | the instrument |
| `report-2d90e8a.txt`, `report-d7c4836.txt`, `report-4a7126b.txt` | its output at each tree |
| `diff-d7c4836-to-2d90e8a.txt` | **the differential the staleness marking is settled on** |
| `diff-4a7126b-to-2d90e8a.txt` | the wider differential since QA's own anchor |
| `run-*.txt` | the vitest runs that produced them |
| `013-fqa29-load-confirmation-names-actual-mode.test.ts` | pre-registered failing spec for F-QA29 |
| `013-fqa30-emptied-container-drop-is-named.test.ts` | pre-registered failing spec for F-QA30 |
| `run-red-fqa29-at-2d90e8a.txt` | 3 failed / 5 passed — the three defect assertions red, all controls green |
| `run-red-fqa30-at-2d90e8a.txt` | 3 failed / 4 passed — same shape |

## Reproduce

```sh
cd /usr/local/bin/hooks/website
for REV in 2d90e8a d7c4836 4a7126b; do
  rm -rf /tmp/qa013-p3-$REV && mkdir -p /tmp/qa013-p3-$REV
  git archive $REV | tar -x -C /tmp/qa013-p3-$REV
  ln -sfn /usr/local/bin/hooks/website/node_modules /tmp/qa013-p3-$REV/node_modules
  mkdir -p /tmp/qa013-p3-$REV/src/utils/__tests__
  cp <this dir>/013-qa-p3-*.test.ts /tmp/qa013-p3-$REV/src/utils/__tests__/
  ( cd /tmp/qa013-p3-$REV && DATABASE_URL='postgresql://qa:qa@127.0.0.1:1/deadport' \
      QA_P3_REPORT=/tmp/report-$REV.txt \
      npx vitest run src/utils/__tests__/013-qa-p3-stale-prediction-differential.test.ts )
done
diff -u /tmp/report-d7c4836.txt /tmp/report-2d90e8a.txt
```

The `vi.mock('~/env.mjs', …)` at the head of each spec is required — `~/utils` pulls `~/constants`
which pulls `env.mjs`, and env validation throws in a bare test process.

**Extraction, not the shared tree.** These run against `git archive` extractions under `/tmp`, never
by writing a spec into `/usr/local/bin/hooks/website`. A foreign spec in that tree inflated three
review rounds' suite totals by +7/+7/+0 (`INBOX.md`, `code-reviewer-hooks-013` INFO-4); the pattern
is not repeated here.

## Instrument note, paid for during this pass

`diff … | sed -n '/## E —/,$p'` returned an **empty region** for a diff that did in fact contain
hunks there, and read as "no movement" — a positional predicate over filtered output, the class
`RTK.md` names. The differentials above were taken by writing each diff to a file and reading the
whole file. **Do not scope a diff with a piped anchored range here.**
