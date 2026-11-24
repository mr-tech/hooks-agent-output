# Paste probe captures (steering's refutation helper)

Copied verbatim by planner-019 on 2026-11-24 from steering-hooks-fixer's scratch directory
(`/tmp/claude-1000/-usr-local-bin-hooks/16578806-8133-49f3-acce-186117c5217c/scratchpad/paste-refute/`), at QA's ask (QAF-53 (c),
re-key on revision 23, record `d46f68ff`), as `fence-refute/` was for F-55. They hold the paste figures the effort rulings block
2026-11-24T20:07Z (Premises) cites for D-26. The helper was a `general-purpose-sonnet` run by steering-hooks-fixer. planner-019 did
not re-run the probe; each copy was checked byte-identical to its source with `cmp`.

- `out-<sha>.jsonl`: one line per timed paste. `fill` is the line text (`a` or `a🙂`), `n` the lines pasted through `insertData`
  into an empty editor, `ms` the time, `rep` the repetition, and `error` any throw. Unmounted, in node/jsdom; no browser and no
  mounted editor.
- `log-<sha>.txt`: the vitest output of each run.
- `loads.txt`: `/proc/loadavg` before and after each run, with its exit code.
- `run.sh.txt`: the driver, renamed from `.sh`. Each run was a `git archive` export of website at the SHA, under `systemd-run` caps.
- `probe-base.tsx.txt` and `probe-new.tsx.txt`: the probe, renamed from `.tsx` so it is not collected as a test. `probe-base` ran
  at `af3d95a`, `probe-new` at `42128cd` and `85ece66` (sha256 of each export's `pasteprobe.test.tsx` matched, 2026-11-24T20:14Z).
