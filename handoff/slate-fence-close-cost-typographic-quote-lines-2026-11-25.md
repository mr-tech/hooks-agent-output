---
UUID: 23c1db10
Status: Open
Status-Detail: "Closing a code fence over many lines that each hold a typographic quote takes seconds, because those lines are normalised one by one. Owed: a cost that does not grow with the square of those lines. Blocks nothing in plan 019, where it is AC-6.9's residue."
Owning-Stage: implementer
Review-Trigger: when `src/components/SlateEditor/utils/withNormalizeNode.ts` `rebuildLines`, `holdsBadCodepoint` or `handleElement` is next edited after plan 019's release
---

# Closing a code fence over typographic-quote lines is slow

## What is seeded

In the website editor, on `embedDescription`, Backspace on the ```` ``` ```` of line 2 above N lines that each hold a typographic
quote (`’`) costs:
- 121 ms (`a’`) and 301 ms (`a’🙂`) at N = 200;
- 9.4 s and 21.3 s at N = 1,000.

The figures are the same at website `2b82972` and `a7ad3f2`. Plan 019's Fix Round 4 rebuilds changed lines from the load path,
but it leaves a line holding a typographic quote to the normal path (`withNormalizeNode.ts` `holdsBadCodepoint`), because
`handleElement` rewrites the quote, so a rebuilt line would not be a normaliser fixed point. Those lines are then normalised one
by one, each operation costing in proportion to Slate's pending dirty paths.

The way in is a loaded or pasted message: the editor rewrites a typed `’`, so typing cannot build such a message.

The work owed: closing or opening a fence over such lines costs work linear in the lines it changes, as AC-6.9's `a` and `a🙂`
fills do. One way to get there is to rewrite the quote in the rebuild itself, so the rebuilt line is a fixed point.

## Evidence

- `agent-output` `implementation/019-slate-formatting-discord-engine-m6-implementation.md` at record `32c4a684`, § Fix Round 4,
  "Class Sweep (Fix Round 4)", CR-25 row, member (a), and Outstanding Items (Fix Round 4) item 2.
- Probe `verification/019/impl/m6-fix4-class-cost-probe.test.tsx.txt`, outputs `m6-fix4-class-cost-probe-2b82972.jsonl` and
  `-514050d.jsonl`. The implementer reports it runs in under a minute in an export.
- Not read at the chain base `af3d95a`, where the fence close throws Slate's iteration error at 200 lines on plain lines.

## Origin

Plan 019 (`planning/019-slate-formatting-discord-engine.md`), M6 Fix Round 4, Outstanding 2. It is a member of AC-6.9's
residue, "a fill other than plain `a` and `a🙂` lines". The planner disposed of it as a stated limit under the M4 to M6 cap
(Planner batch row "Fix Round 4's Outstanding 2"; effort rulings block 2026-11-25T05:19Z routed it).

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-25T05:22 | planner-019 | Opened from M6 Fix Round 4's Outstanding 2. |
