# Fence and `>>>` keystroke probe captures (steering's refutation helper)

Copied verbatim by planner-019 on 2026-11-24 from steering-hooks-fixer's scratch directory
(`/tmp/claude-1000/-usr-local-bin-hooks/73f0c622-8edf-4924-bc82-4f6ccb72e068/scratchpad/fence-refute/`). They hold the base
medians that AC-6.9's fence ceiling rests on (critic F-55, SL-28). The helper was a `general-purpose-sonnet` run by
steering-hooks-fixer (effort rulings block 2026-11-24T14:33Z, Premises). planner-019 did not re-run the probe.

- `<sha>.raw.txt`: the vitest output of `probe.body.tsx.txt` in an export of website at that SHA. The probe is renamed from
  `.tsx` so it is not collected as a test. Each `RESULT` line gives:
  - the keystroke: `open` is a backtick typed at the end of a `` `` `` line 2, `close` is Backspace at the end of a
    ```` ``` ```` line 2, and a plain insert is the control;
  - the size and the throw count;
  - the median and max milliseconds over 10 timed runs after 2 warm-ups, with `/proc/loadavg`.
- `mounted.raw.txt`: the mounted-editor run at `42128cd`, with the `onChange` write per keystroke.
