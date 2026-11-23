# Code review instruments — fix-normalize-fence-loop, Round 1 (website `d3b98cf`, base `0411d3b`)

Owner: `code-reviewer-fix-normalize-fence-loop`. Cited by `code-review/fix-normalize-fence-loop-code-review.md`.

## How these ran

- The trees: `git archive d3b98cf` and `git archive 0411d3b`, each extracted to a scratch directory with `node_modules` symlinked
  from the shared tree and `../vitest.mutation.config.ts` copied in. Nothing ran in the shared tree.
- In both exports, `withNormalizeNode.ts` carries one added line counting `handleEditor` update passes (`globalThis.__upd`):
  `counter.patch.txt`. This line is instrumentation only.
- Command, per export: `PROBE_OUT=<out>.json systemd-run --user --scope -q -p MemoryMax=8G npx vitest run --config
  vitest.mutation.config.ts <probe file>`. Every run exited 0.

## Instruments

| File | What it is |
|---|---|
| `probe.differential.test.tsx.txt` | Differential over a seeded corpus of 1,200 inputs made of 20 line atoms: every pair of atoms, plus random 1–5-line joins. For each input it records the load round trip (full and single-line), a forced normalise (throw, update passes, text unchanged, whether the normaliser's fixed point matches the loader's node shape), and four edits on every line (type `x` at the end and at the start, Enter at the end, Backspace at the start through the real `onKeyDown`). After each edit it records throw, settledness, and whether a reload of the saved text matches the shape and the text |
| `differential-out-0411d3b.json`, `differential-out-d3b98cf.json` | Raw output |
| `summarise-differential.py`, `differential-summary.txt` | Counter summary (`python3 summarise-differential.py <dir holding out-base.json/out-fix.json>`; the summary was produced before renaming) |
| `probe.fence-lang.test.tsx.txt` | Ten fence forms: per input, the loader's per-line `lang`, the normaliser's after a forced normalise, update passes on the first and second normalise, and any throw |
| `fence-lang-out-0411d3b.json`, `fence-lang-out-d3b98cf.json` | Its output at base and at the fix |
| `guard-removed-mutant.patch.txt`, `fence-lang-out-d3b98cf-guard-removed.json` | The same probe at the fix with the quote guard removed (existing quote lines rewritten each update pass, the M2 shape). Probe of CR-1 only |
| `convention-check-d3b98cf.txt` | `node ~/.claude/tools/convention-check.js /usr/local/bin/hooks/website --since=0411d3b`, exit 0 |

## Positive control

The differential's throw detector fires at base: 159 of 1,200 inputs throw on a forced normalise, and 2,755 edits throw. At the fix, 0 of
both throw. The fence-language probe's loop detector fires at base on `> a\n```c++\nfoo\n```` (378 iterations) and at the fix with the
guard removed (the same).

## Bounds

The corpus is 20 line atoms. It holds no emoji in quote lines beyond one `🙂 b` atom, whose round-trip differences are outside this fix:
they already appear on a `🙂 b` line alone, with no quote or fence in the input. The review's figures leave out
inputs that hold that atom. Not driven: a mounted `SlateEditor`, a
real `beforeinput` event, paste, drag and undo.
