Code review, Round 8: M6 Fix Round 3 at website 2b82972, against 85ece66, and the chain base af3d95a for SL-29.

Exports: git archive of each SHA into the session scratchpad, node_modules symlinked from the website clone; node v24.14.0;
vitest 4.1.2; every run under `unshare -rn`. Probes (*.txt here) went into an export's
src/components/SlateEditor/utils/__tests__/ with `.txt` removed, never into the shared tree. Outputs go to the path in CRPROBE_OUT.
The box load is in loads-sl29.txt and loads-diff.txt; it read 1.4 to 3.7 during these runs.

SL-29 (effort rulings blocks 20:58Z and 22:41Z):
- crprobe.sl29-tip.test.tsx runs at 2b82972 and 85ece66, and crprobe.sl29-base.test.tsx at af3d95a. The two bodies are identical;
  only the parser/surface argument differs (embedDescription at the tip, markdown.interactive.parseEmoji at the base).
- Members: four fence keystrokes (third backtick at the end of line 2; Backspace at the end of ``` on line 2; the same pair at the
  closing delimiter in the middle), plus a paste through insertData into an empty editor. Fills are a🙂 and a, at 200 lines
  (5 reps) and 1,000 lines (3 reps), median taken. Each row also records the operation count, the error, and the lines that differ
  from a fresh load.
- Driver: run-sl29.sh, two interleaved rounds. Output: sl29-<sha>-r<n>.jsonl.
- sl29-table.txt applies the 20:58Z line: 1.25 × the larger same-session base median at that N, with the fence's open and close
  members pooled.
Differentials (run-diff.sh):
- crprobe.paste-differential.test.tsx: 887 texts × 9 bases × start/end (15,966 pastes), at both trees.
  - Limbs: line shapes against a fresh load of the final text; text equal to the base with the paste inserted; and after typing Z,
    text equal to the base with the paste and Z inserted (the caret oracle, built from the input strings alone).
  - paste-compare.py reads the two outputs: paste-compare.out.txt. paste-regression-shapes.out.txt shows the 4 regressions (CR-26).
- crprobe.keystroke-fixedpoint and crprobe.keystroke-settle: Round 7's probes (../m6fix2-85ece66/), compared with
  ../m6fix-42128cd/compare.py and ../m6fix2-85ece66/caret-line-check.py (compare-*.out.txt, caret-line-check-*.out.txt).
- crprobe.fence-emoji-count and crprobe.paste-count: Round 7's probes, output *-count-<sha>.jsonl.
Red check: red-count-limb-85ece66.log.txt is the committed count limb (withNormalizeNode.keystroke-run-unit-builds.test.tsx, its
helpers from 2b82972), run in an 85ece66 export. It fails 4 cases by assertion, and 3 pass.
convention-check-since-85ece66.txt is the convention check's output. The ID-token check, which it skips, was done by hand over the
233 added lines: 1 hit, "1,000" in a title, which is a count and not an ID token.
