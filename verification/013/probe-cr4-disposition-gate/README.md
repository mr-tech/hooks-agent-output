# CR4 — the five-row disposition and the persist gate, enumerated

**Round 4, `Reviewed-At: 92ce026`.** Settles by execution what the diff cannot show: whether
`resolveContentLoss` and `gateBeforePersist` implement D17's table over the whole input partition,
and what their contracts let a caller do wrong.

Run: `npx vitest run --config vitest.cr4.config.ts` (symlink `node_modules` to the website's first).
Result at `92ce026`: **19/19**. Captured: `run-cr4-92ce026.txt`.

## The declared model

Expected values are literals transcribed from **the plan's own eight-cell table** (rev 17, M8, "The
class and its enumeration"), never computed by calling the code under test. The probe adds two
Action-Rows-only cells the plan's table covers by its "(Action Rows only, or none)" note.

## What it establishes

| section | question | result |
|---|---|---|
| CR4-A | do all ten cells land on the plan's row, mode, notice and choice? | **yes, 10/10** — the implementation is faithful to the table |
| CR4-B | does `dropSet` ever vary? | **no** — `[]` in every cell, **row E included** |
| CR4-C | can a caller compute `flagBit` wrongly? | **yes** — `!!flags` with `flags: 4` yields row **D** where `!!(flags & BIT)` yields row **A** |
| CR4-D | does `gateBeforePersist` ask on exactly row E? | **yes** — true on the two E cells, false on the other eight; safe on `flags: 4`; `{}` does not ask |
| CR4-E | is the emptiness boundary D13 reading (i)? | **yes** — whitespace content and `[{}]` embeds are not content; `[{title}]` is |

## Positive controls — four mutants, all killed

| mutant | probe |
|---|---|
| row E `requiresChoice: true → false` | 5 failed |
| row B notice `warn-v2-flag-added → none` | 1 failed |
| row D `row: flagBit ? 'D' : 'A' → 'A'` | 2 failed |
| row C empty-cell `mode: flagBit ? 'v2' : 'classic' → 'classic'` | 2 failed |

A fifth attempt (`rowD-mode-v2`, file suffixed `--NOT-APPLIED-not-evidence`) is recorded as **not run**: the shell passed a literal `\n` so the
target never matched, the tree was unmutated, and its 19/19 is not evidence of anything. It is named
here rather than dropped, because an unapplied mutation that reports green is exactly what a
mutation table must not silently contain.

## The implementer's own spec, mutation-checked

`013-m8-ec3-resolver-gate.test.ts` is **genuine**: 19/19 unmutated, and it dies on every mutant —
row E 4 failed, row B 1 failed, row D 2 failed. Captured in `spec-mutation-check/`. Its expected
values are literals off the row table, so EC-5 independence holds.

## What this probe does NOT establish

- Nothing about **wiring**. No call site consumes either function at `92ce026` (`git grep -c`:
  definitions and the spec only), so no claim is made about the surfaces.
- Nothing about **applying** a disposition. The probe reads decisions; it cannot test an application
  path that does not exist (MEDIUM-2).
- Nothing about `embeds` shapes beyond the three in CR4-E, and nothing about `content` non-strings —
  the contract types `content` as `string | undefined`.
