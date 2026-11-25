Code review, Round 8 sub-entry: M6 Fix Round 4 at website a7ad3f2, against 2b82972 and 85ece66; the chain base af3d95a for SL-29
and for the class members.

Exports: git archive of each SHA into the session scratchpad, node_modules symlinked from the website clone; node v24.14.0;
vitest 4.1.2; every run under `unshare -rn`. Probes (*.txt here, and ../m6fix3-2b82972/, ../m6fix2-85ece66/) went into an
export's src/components/SlateEditor/utils/__tests__/ with `.txt` removed, never into the shared tree. The box load is in
loads-run1.txt and loads-run2.txt; it read 1.7 to 3.1 during these runs.

- SL-29 (run-fix4.sh): ../m6fix3-2b82972/crprobe.sl29-{tip,base}, two interleaved rounds at af3d95a and a7ad3f2.
  Output: sl29-<sha>-r<n>.jsonl. sl29-table.txt judges each against block 20:58Z's line.
- Differentials against 85ece66 (85ece66's outputs are in ../m6fix3-2b82972/):
  - Pastes: paste-compare-85ece66-vs-a7ad3f2.out.txt.
  - Keystrokes: compare-*-85ece66-vs-a7ad3f2.out.txt, with raw counts.
  - classify4.py drops the selection's classNames: classify4.out.txt shows 11 substantive keystroke differences, and the settle
    probe's 132 raw differences are classNames only.
- fresh-check (crprobe.fresh-check-emoji): for the 11 keys, tests whether each tree's result equals a fresh load of its own text,
  by line type, prefix, fence state and emoji sources. It also counts the operations a forced normalise applies when the result is
  loaded into an editor. Output: fresh-check-11-emoji.jsonl.
- Suppression mutant: mutant-no-suppression.diff.txt (the getDirtyPaths override made a pass-through, read back from the export).
  The fixed-point probe on it: compare-fixedpoint-tip-vs-nosuppression-mutant.out.txt. It finds 6 differ, and 8 non-fixed-point
  keystrokes against the tip's 14, so the tip's 6 extra come from the suppression (CR-27).
- Load differential (crprobe.load-differential): getInitialValue over 3,287 texts × 2 surfaces × partialMarkdown, at 2b82972 and
  a7ad3f2. load-differential.out.txt shows 0 of 13,148 differ.
- Class members (run-fix4b.sh, crprobe.class-{tip,base}), at af3d95a, 85ece66 and a7ad3f2. Output: class-<sha>.jsonl.
  - A lone backtick typed at the end of line 0, with a backtick ending the last line, over a🙂 and a lines, at 40 to 1,000 lines
    (CR-28).
  - Backspace on line 2's ``` over lines holding a typographic quote, at 200 and 1,000 lines (CR-29).
- Counts at a7ad3f2: fence-emoji-count-a7ad3f2.json and paste-count-a7ad3f2.json (JSON lines).
- crprobe.mounted-lone-backtick: CR-28's keystroke in the mounted editor (the suite's mountEditor helper) at a7ad3f2, at 40, 100 and 200 lines. mounted-lone-backtick-a7ad3f2.jsonl records the throw and whether the last write holds the backtick. af3d95a has no mounted helper; its unmounted reading is in class-af3d95a.jsonl.
