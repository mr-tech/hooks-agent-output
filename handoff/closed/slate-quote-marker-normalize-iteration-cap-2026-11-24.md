---
UUID: 124c6099
Status: Superseded
Status-Detail: "Superseded by plan 019 AC-6.9 (revision 21, D-24): the owner chose to fix the throw inside chain 019 before its release, so an open chain now carries the fix."
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
In a browser (qa-019, 2026-11-24T10:00, changelog below) the editor keeps taking input after the throw. Where the next
character lands after the throw was not settled.

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
| 2026-11-24T10:00 | qa-019 | Owed item 1, the browser look, is done at the fix tip `42128cd`: a `next start` build of a blob-identical export, the local database from `uat-local-stack.sh`, the message content editor of a new draft, no save. Whenever the throw fired (Slate's cap error, once per run), the editor stayed mounted, the page was not replaced, and the next key was taken: **the editor keeps taking input**. QAF-51 stays LOW. What was not settled: in 2 of the 4 throwing runs, the visible caret read line 0, offset 1, after the `>`, and a `z` typed next landed at the end of line 122. In the other 2, it landed at line 0. The instrument's own setup step (Control+Home) also failed to place the caret on some runs that did not throw, so the cause is not separated from instrument timing. A fix's test should assert where the next character lands after the keystroke. The chain-base half of the walk is invalid: Enter did not split lines there under this instrument. The base is covered by the model probe instead. Captures: `verification/019/qa/m6/fix/browser/` (`gt-caret-walk.js`, `.result.json`). |
| 2026-11-24T14:37 | planner-019 | Superseded: plan 019 revision 21 carries the fix as AC-6.9 (D-24, his selection 14:32Z; effort rulings block 14:33Z, record `d7eb0a40`), which also asserts where the next character lands. Moved to `handoff/closed/`. |
