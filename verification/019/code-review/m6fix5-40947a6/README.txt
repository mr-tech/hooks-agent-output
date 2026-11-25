Code review, Round 9: M6 Fix Round 5 at website 40947a6, against a7ad3f2; the chain base af3d95a for SL-29 and the off-selection probe.

Exports: git archive of 40947a6, a7ad3f2 and af3d95a into the session scratchpad, node_modules symlinked from the website clone, plus
40947a6 with its getDirtyPaths override made a pass-through (mutant-no-suppression-40947a6.diff.txt, read back from the export; the
round's own suppression, CF-35's pass-through tree). node v24.14.0, vitest 4.1.2. run9.sh runs each probe in its own 5G no-swap
systemd scope, one worker, under `unshare -rn`. Box load is in loads.txt (0.5 to 2.4). The kern.log OOM count was 8 after the run, as
at the hand-off.

Probes reused unchanged (copied from their .txt): ../m6fix2-85ece66/crprobe.keystroke-fixedpoint and crprobe.keystroke-settle;
../m6fix3-2b82972/crprobe.paste-differential and crprobe.sl29-{tip,base}; ../m6fix4-a7ad3f2/crprobe.class-{tip,base} and
crprobe.mounted-lone-backtick.

- New: crprobe.offselection-inline (and its -base form for af3d95a's parser API). A backtick is inserted at the end of line 0, or
  removed from it, through Transforms at that point, over N a🙂 lines whose last line ends in a backtick, at N 5/100/200/1,000
  on embedDescription. The selection is none, at the end of a separate run unit after a code block ("other-unit"), or at the edit
  ("at-edit", the control). Rows: error, operations, lines unlike a fresh load of the hand-built expected text, and the operations
  of a forced normalise. Outputs: offsel-<sha>.jsonl.
- CF-35's equality: cf35-equality-40947a6.out.txt, from the implementer's verification/019/impl/m6-fix5-differentials-ded68fc/
  cf35-equality.py.txt (read), with a second instrument, ../m6fix4-a7ad3f2/classify4.py.txt, giving no line
  (classify4-tip-vs-passthrough.out.txt). The tip's and the pass-through's fixed-point outputs are byte-identical (cmp) to the
  implementer's verification/019/impl/m6-fix5-tip-40947a6/keystroke-fixedpoint-40947a6{,-nosupp}.json.gz, which are not
  copied again.
- Against a7ad3f2: classify4-a7ad3f2-vs-40947a6.out.txt (fixed point), classify4-settle-a7ad3f2-vs-40947a6.out.txt (settle),
  caret-line-a7ad3f2-vs-40947a6.out.txt (../m6fix2-85ece66/caret-line-check.py), paste-compare-a7ad3f2-vs-40947a6.out.txt
  (../m6fix3-2b82972/paste-compare.py.txt; its labels say 85ece66, read a7ad3f2).
- SL-29: two interleaved rounds at af3d95a and 40947a6, sl29-<sha>-r<n>.jsonl, judged by sl29-table9.py.txt (block 20:58Z's
  line) in sl29-table.txt.
- class-40947a6.jsonl and mounted-lone-backtick-40947a6.jsonl: CR-28's measured member and CR-29's fills at the tip.
