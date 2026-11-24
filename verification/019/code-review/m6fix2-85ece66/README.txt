Code review, Round 7: M6 Fix Round 2 (AC-6.9) at website 85ece66, against 42128cd; the chain base af3d95a where named.

Exports: git archive of each SHA into the session scratchpad, node_modules symlinked from the website clone; node v24.14.0;
vitest 4.1.2; every run under `unshare -rn`. Probe files (*.txt here) were placed in an export's
src/components/SlateEditor/utils/__tests__/ (mounted ones in src/components/SlateEditor/__tests__/) with `.txt` removed,
never in the shared tree. Outputs go to the path in CRPROBE_OUT. Box load 0.9 to 4.6 during the runs.

Differential (both trees, document and selection after each key, and a forced-normalise fixed-point check):
- crprobe.keystroke-fixedpoint.test.tsx: 7 quote fixtures, 6 unclean-fence fixtures, 272 corpus and 1,000 generator texts;
  start/end; keys x ` \ > space Backspace Delete Enter. fixedpoint-<sha>.json.gz.
- crprobe.keystroke-settle.test.tsx: 28 hand fixtures, 8 of them quote lines that hold fences; three places; 10 keys.
  settle-<sha>.json.gz.
- compare (../m6fix-42128cd/compare.py), classify.py (text / types / emoji / selection) and caret-line-check.py read them.

Cost and correctness on emoji-bearing lines (outside AC-6.9's text class):
- crprobe.fence-emoji.test.tsx: open and close a fence on line 2, and make > and >>> before an emoji, over fills a, a🙂 and
  ":smile: b" at 40, 200 and 1,000 lines, both surfaces; median of 5; mismatch = lines differing from getInitialValue of the
  expected text. fence-emoji-<sha>.jsonl. crprobe.fence-emoji-base.test.tsx is the same at af3d95a (its parser API).
- crprobe.fence-emoji-count.test.tsx: pass-through vi.mock counts of unitAround (builds) and spansInLine (line settles).
- crprobe.paste-emoji-unmounted.test.tsx: a paste through slate-react's insertData on an unmounted editor (the production
  onPaste does not prevent default, so a paste reaches insertData). crprobe.paste-emoji-base.test.tsx at af3d95a;
  crprobe.paste-count.test.tsx counts builds, afterLine reads and operations.
- crprobe.paste-emoji-lines.test.tsx: a mounted paste. INVALID as a timer: mountEditor installs fake timers, which freeze
  performance.now and process.hrtime (every reading is 10 ms). Kept as the record of a withdrawn instrument.

Controls:
- crprobe.mounted-no-catch.test.tsx: the committed mounted test with its `.catch(() => undefined)` removed and window error
  events asserted empty. mounted-no-catch-85ece66.txt (42 of 42); mounted-no-catch-42128cd-control.txt (5 of 7 fail on the
  iteration error at 200 lines: the probe can see a throw).
- crprobe.ceiling-planted.bench.ts: the committed AC-6.9 bench with both ceilings at 0.001 ms. bench-ceiling-planted-85ece66.txt
  (exit 1, AssertionError, 4.7 s). bench-fence-quote-85ece66.txt is the committed bench (exit 0, 20.5 s).
