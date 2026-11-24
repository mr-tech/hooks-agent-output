Code review, Round 6 sub-entry: CR-20's fix confirmation at website 42128cd (tree identical to 10abfa9), against 119471f.

Exports: git archive of 42128cd and of 119471f into the session scratchpad, node_modules symlinked from the website
clone; node v24.14.0; vitest 4.1.2; every run under `unshare -rn`. Probe files (*.txt here) were placed in
src/components/SlateEditor/utils/__tests__/ of an export, with their `.txt` suffix removed, and never in the shared tree.
Outputs are written to the path in CRPROBE_OUT.

- crprobe.keystroke-settle.test.tsx: 20 hand fixtures aimed at a line whose emoji decision depends on an edited line
  (multi-line inline code, fences, quotes, spoilers, unclean fences); every line, start/middle/end, 8 keys. Records the
  document and selection after the key, and whether a forced Editor.normalize leaves it unchanged (fixedPoint).
  Outputs settle-<sha>.json.gz; compare with `python3 -I compare.py settle-119471f.json.gz settle-42128cd.json.gz`.
  Fixture 0 is the implementer's repro and is the positive control (it fires).
- crprobe.keystroke-fixedpoint.test.tsx: the same oracle over 6 unclean-fence fixtures, the 272 corpus texts and 1,000
  generator texts (ALL index i >= 278 is generator input i - 278); start/end, 6 keys. Outputs fixedpoint-<sha>.json.gz.
- crprobe.normalize-cost.test.ts: Round 6's timing probe (m6-119471f/crprobe.normalize-cost-tip.test.ts.txt) with rows
  for 35 to 2,048 lines; bare createEditor, Transforms.insertText at a path. normalize-cost-<sha>.json.
- crprobe.cost-variants.test.tsx: the same insert with and without the production wrapping (withEmojis, withHistory,
  withReact) and with and without a selection. cost-variants-42128cd.json.
- crprobe.alone-both-sizes.test.tsx: the count test's own SIZED table, reporting whether each case's keystroke leaves
  other lines alone at both sizes (so no it.each case is vacuous). alone-both-sizes.txt.
- crprobe.bound-planted.bench.ts: the committed bench with FRAME_MS planted at 0.001, run with -t "plain lines, 400".
  bench-42128cd-planted-bound-plain-400.txt is the control; bench-119471f-plain-400.txt is the committed bench at the
  pre-fix tree; bench-42128cd-plain-400.txt is the committed bench at the fix. Each runs under `timeout` (exit 124 = killed).
- cr-mutants.json and mutants-out/: mutation-run.py at 42128cd against the count test file only.
- convention-check-since-119471f.txt: convention-check.js over the shared clone at 42128cd.
