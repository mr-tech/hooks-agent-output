# Code review Round 1 sub-entry (fix confirmation) — website `61e5dfe`

The instruments are the Round 1 probes, unchanged (`../probe.differential.test.tsx.txt`, `../probe.fence-lang.test.tsx.txt`). They ran in
a `git archive` export of `61e5dfe`, with the same update-pass counter (`counter.patch.txt`), and in a second export with the quote guard
removed (`guard-removed-mutant.patch.txt`, the M2/R1 shape). The commands are those in `../README.md`. Every run exited 0.

`summary.txt` was produced by `summarise.py` (here), run with the scratch directory holding `out-fix.json` (=
`../differential-out-d3b98cf.json`), `differential-fix2*.json` (= `differential-out-61e5dfe*.json`) and `fence-lang-fix2*.json` (=
`fence-lang-out-61e5dfe*.json`).

What it shows, over the emoji-free inputs (1,022 inputs, 13,360 edits):
- At `61e5dfe`, with or without the guard: 0 throws, 0 text changes and 0 update passes on a loaded value (`d3b98cf`: 190). The saved
  text of every edit is identical to `d3b98cf`'s.
- Fence-language probe: the loader's and the normaliser's per-line languages are equal on all 10 forms, with 0 update passes, guard or
  no guard. Positive control for the loop detector: `../fence-lang-out-d3b98cf-guard-removed.json` (378 iterations on the `c++` form).
