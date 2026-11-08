# QA Phase 1 re-key to plan 015 rev 28 (2a4533b): instruments

- `checks.sh` → `checks-run1.txt`: reads only captured files.
  - M5-h (3): compares the planner's enumerator run at `c5303ca` with code review's run 2 at `476c633`, cell by cell. The guard-present run is the positive control.
  - Register B-8's D36 count command, run over code review's drift captures: 3 member-absent runs and 3 controls.
- `rules.interactive-fence-probe.test.ts` and `run-interactive-fence-probe.sh <sha> <export-root> <out>`: interactive `parseContent` and `parseEmbedField` over M6-a's 13 suite bodies plus a no-fence control. Each run uses a git-archive export, under `unshare -rn`, with `node_modules` symlinked read-only. Outputs: `ifence-c5303ca.txt` (tip) and `ifence-7ce866b.txt` (base). The 2 lines that differ between them are the probe's positive control.
- The probe is not a suite file. It decides QA's coverage call on the implementer's Outstanding Item 1 and asserts nothing.
