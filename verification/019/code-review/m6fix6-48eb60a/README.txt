Code review, Round 9 sub-entry: M6 Fix Round 6 at website 48eb60a, against 40947a6 (Round 9's tree) and the chain base af3d95a.

Exports and runs as ../m6fix5-40947a6/README.txt (git archive, node_modules symlinked, each probe in its own 5G no-swap scope, one
worker, unshare -rn; run9b.sh). The 40947a6 and af3d95a exports are Round 9's. The pass-through tree is 48eb60a with its own
getDirtyPaths override made a pass-through (mutant-no-suppression-48eb60a.diff.txt, read back). Load in loads.txt. OOM count 8.

- New: crprobe.offselection-forms (and -base for af3d95a's parser API). Seven forms of an edit away from the selection (a backtick
  or a backslash inserted, a fragment, a line inserted, a line removed, a line moved, a line split), selection null or at the end
  of a run unit after a code block, N 5/100/200/1,000. Rows: error, lines unlike a fresh load of the literal expected text
  ("unlike"), and the operations of a forced normalise. Outputs: offforms-<sha>.jsonl.
- crprobe.move-shapes: the moveNodes form at 5 lines, printing each line's children at the tip and in a fresh load
  (move-shapes-48eb60a.json).
- Reused unchanged: ../m6fix5-40947a6/crprobe.offselection-inline (offsel-48eb60a.jsonl); the class, mounted, fixed-point,
  settle, paste and SL-29 probes named there.
- CF-35: cf35-equality-48eb60a.out.txt (the implementer's comparator, read). Against 40947a6, the fixed-point, pass-through,
  settle and paste outputs are byte-identical (cmp) to ../m6fix5-40947a6's runs, so they are not copied again.
- SL-29: sl29-table.txt (sl29-table9b.py.txt, block 20:58Z's line).
