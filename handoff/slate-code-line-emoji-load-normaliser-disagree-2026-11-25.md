---
UUID: b8d8f875
Status: Open
Status-Detail: "The editor's fence count (`codeFence.ts` `afterLine`) treats a triple backtick that Discord's formatter does not read as a fence as a fence, so the load and the normaliser disagree on the next line. Owed: a fence count that agrees with the engine. Blocks nothing in plan 019, where it is AC-6.9's residue."
Owning-Stage: implementer
Review-Trigger: when `src/components/SlateEditor/utils/codeFence.ts` `afterLine`, `getInitialValue.ts` `buildLines` or `withNormalizeNode.ts` `resolveLine` is next edited after plan 019's release
---

# The editor counts a non-fence triple backtick as a fence, so its load and normaliser disagree

## What is seeded

In the website editor, `codeFence.ts` `afterLine` counts a triple backtick as a fence delimiter in two cases where Discord's
formatter (`@discord/markdown-wasm`, as the site pins it) does not read one: when the triple backtick is escaped, and when it
sits inside inline code that crosses a line. Two things follow:
- **the load** (`getInitialValue.ts` `buildLines`, then `emojiLift.ts` `liftLoaded`) types the next line as a code line and
  leaves its emoji as text;
- **the normaliser** (`withNormalizeNode.ts` `resolveLine`) then lifts that emoji into an emoji element.

So for such a text a fresh load is not a normaliser fixed point: a forced `Editor.normalize` changes it, by 3 to 9 operations.
The engine reads those lines as plain text holding an emoji, with no code block over them. The normaliser's lifted state is
therefore the one Discord's formatter supports, and the load's code-line typing is the wrong side.

The work owed: the editor's fence state agrees with the engine's code-block parse on an escaped triple backtick and on one
inside line-crossing inline code. Then every load is a fixed point, and a fresh load equals Discord's reading.

The architect's recommended form (CF-36): `afterLine` and the engine are two recognisers of "this line is code", the same
class as CF-2. Take fence state from the engine's `code_block` spans, with CF-32's convergence stop to bound the cost, rather
than teach `afterLine` escapes and inline code.

Members, from AN-9 B1: 12 distinct texts, every one a final text of a keystroke in code review's 36,560-keystroke fixed-point
corpus. None of the corpus's 1,244 loaded texts, its 20 fixtures, AC-6.9's 82 texts or AN-9's 776 cell texts is among them.
At website `85ece66` (before the suppression) 8 corpus keystrokes end in one of these texts.

Plan 019's Revision 24 handles the other 6, which its fix round's dirty-path suppression causes: AC-6.9's no-throw limb,
sub-limb "A suppressed line is a fixed point". This handoff carries the load's own disagreement, which predates that
suppression.

## Evidence

- `agent-output` `analysis/019-slate-formatting-discord-engine-analysis.md` § "AN-9 B1 — load outputs that are not a
  forced-normalise fixed point" and § "AN-9 B2 — which state Discord's formatter supports" (record `00c91e3`). Captures:
  `verification/019/analysis/an9/load-fixedpoint-a7ad3f2.jsonl`, `b1-texts.json`, `engine-b2.jsonl`, `cr27-key-map.out.txt`.
- The mechanism through `afterLine` is AN-9's code read, not run.
- Code review's mutant comparison: `verification/019/code-review/m6fix4-a7ad3f2/compare-fixedpoint-tip-vs-nosuppression-mutant.out.txt`
  (14 at `a7ad3f2`, 8 with the override a pass-through).
- Not read at production `5ec0621`.

## Origin

Plan 019 (`planning/019-slate-formatting-discord-engine.md`), M6 Fix Round 4, Outstanding 1, and code review's CR-27
(Round 8 sub-entry, record `9cb3a3da`). Revision 24 places the load's part in AC-6.9's residue, citing this handoff.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-25T05:22 | planner-019 | Opened from M6 Fix Round 4's Outstanding 1. |
| 2026-11-25T06:00 | planner-019 | Re-aimed at plan 019 Revision 24, from AN-9 (record `00c91e3`): the cause is `afterLine`'s count of a non-fence triple backtick, and the normaliser's state is the engine's. The 6 suppression-caused keystrokes move to Revision 24's AC-6.9. R-114's claim that the skip did not cause them was the planner's error (R-118). |
| 2026-11-25T06:07 | planner-019 | Folded the architect's CF-36 form (record `6a5aa33`): fence state from the engine's `code_block` spans. |
