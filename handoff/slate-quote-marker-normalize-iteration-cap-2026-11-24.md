---
UUID: 124c6099
Status: Open
Status-Detail: "In the Slate editor, typing '>' to turn '>> a' into '>>> a' on the first line of a message of 123 or more lines throws Slate's normalize iteration cap. The editor's model is left correct. Owed: a browser look and a fix. Blocks nothing."
Owning-Stage: implementer
Review-Trigger: when `website/src/components/SlateEditor/utils/withNormalizeNode.ts` `handleEditor`'s retyping of the lines a `>>>` marker governs is next edited, or on a user report of the editor erroring or freezing after typing `>>>` in a long message
---

# Typing `>>>` at the top of a long message throws Slate's normalize iteration cap

## What is seeded

In the website's Slate editor, on the `content` and `embedDescription` surfaces (both run with `partialMarkdown` false and
`markdown.interactive.parseEmoji`): a first line `>> a` followed by N−1 lines of `a`. Typing `>` at the start of the first
line makes it `>>> a`, which turns every following line into a quote. For N of 123 or more, Slate throws "Could not completely
normalize the editor after 126 iterations". At 122 lines it settles. The threshold is the same at the chain base and at plan
019's fix tip.

After the throw the editor's model is correct: every line is `blockQuote`, the text is intact, and the caret sits after the `>`.
No browser has been checked, so whether the user sees only a console error or the editor stops taking input is unknown.

Owed:
1. A browser look on a local build: does the editor keep taking input after the throw? That decides the severity.
2. A fix, so that one keystroke's retyping of the lines a `>>>` marker governs settles within Slate's iteration cap at the
   embed description's 2,048 lines. Its test is spec-form, covering the 122/123 boundary and 2,048 lines, and is shown red on
   the base before it is kept.

## Evidence

- `qa/019-slate-formatting-discord-engine-m6-qa.md` § Findings, QAF-51 LOW, pre-existing (record `b7a5d9c6`). Captures are under
  `verification/019/qa/m6/gt-marker-base/`: probes and runs at website `af3d95a` (the chain base, 574 of 574 blobs match) and
  `42128cd` (the fix tip, 680 of 680), in network-isolated git-archive exports with frozen offline installs. A positive control
  shows the probe sees the cap.
- First found by implementer-019: `implementation/019-slate-formatting-discord-engine-m6-implementation.md` Outstanding 2 (record
  `9c6bb958`).

## Origin

Plan 019's CR-20 fix round on M6 found it while measuring SL-22's residue keystroke (QAF-45's `>` keystroke). QA Phase 2 then
probed it at the chain base. The planner registered it as a stated limit in plan 019's Planner batch (R-93), with this handoff
as its carrier. qa-019 takes the browser look at its Phase 2 on the fix round and appends the result here.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-24T09:15 | planner-019 | Opened from QAF-51 (record `b7a5d9c6`). |
