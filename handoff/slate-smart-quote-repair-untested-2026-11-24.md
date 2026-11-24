---
UUID: c9255485
Status: Open
Status-Detail: "The Slate editor's smart-quote repair has no test, and a mutant that swaps its two replacements survives the whole suite. Owed: a test that reddens on that swap. Blocks nothing."
Owning-Stage: implementer
Review-Trigger: when `website/src/components/SlateEditor/withNormalizeNode.ts` `handleElement`'s smart-quote repair is next edited, or when a chain next opens that file's normaliser for change after plan 019 closes
---

# The Slate editor's smart-quote repair is untested

## What is seeded

`website/src/components/SlateEditor/withNormalizeNode.ts` `handleElement` repairs smart quotes: U+2018 and U+2019 become `'`,
and U+201C and U+201D become `"`. No test in the suite exercises it. Owed: a spec-form test over the class of those four code
points. Typing each one into the editor saves its ASCII replacement, with the expected values written as literals (axiom E).
The test is shown red against the swap mutant below before it is kept (axiom A).

`flattenNodeText`'s `allowEmoji` gate is called with `false` only inside this repair, so it is untested for the same reason.
The same test covers it if one of its inputs holds an emoji next to a smart quote.

## Evidence

- QA's mutant W9 (`qa-W9-smart-quote-swap`), which swaps the two replacements, **survives** the whole offline suite at website
  `119471f`. It survived at `2c1590f` (M3) too. See `qa/019-slate-formatting-discord-engine-m6-qa.md` § Findings, QAF-49, and
  the mutant table (record `4da9b76b`).
- Plan 019 does not change the repair: QA ran `git diff -U0 2e36107..119471f` over the file and none of the repair's lines
  moved. The gap is pre-existing.

## Origin

QA Phase 2 on plan 019's M6 at `119471f`, finding QAF-49 LOW (pre-existing). The planner registered it in plan 019's Planner
batch as a stated limit under the M6 cap (steering, effort rulings blocks 17:56Z and 07:21Z), with this handoff as its carrier.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-24T07:58 | planner-019 | Opened from QAF-49 (record `4da9b76b`). |
