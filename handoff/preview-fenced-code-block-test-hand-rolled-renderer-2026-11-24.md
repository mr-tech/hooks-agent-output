---
UUID: c4ab4b44
Status: Open
Status-Detail: "A preview test renders through its own renderToStaticMarkup helper instead of the project's DOM harness, which the Test Conventions call a hand-rolled renderer. Owed: convert it, with a red mutation recorded. Blocks nothing."
Owning-Stage: implementer
Review-Trigger: when `website/src/utils/markdown/__tests__/preview.fenced-code-block-draw.test.ts` is next edited, or when a chain next changes the preview's fenced-code-block drawing after plan 019 closes
---

# A preview test uses a hand-rolled renderer

## What is seeded

`website/src/utils/markdown/__tests__/preview.fenced-code-block-draw.test.ts` defines its own `render()` with
`renderToStaticMarkup`. It does not use the project's DOM harness (`createRoot` from `react-dom/client` and `act` from `react`,
in a `.test.tsx` file under the DOM project). The workspace Test Conventions name this the "Hand-rolled renderer" class. Its
disposition is to convert the test to the DOM harness. The evidence owed is the converted test shown red on a mutation of the
rendered behaviour and green at head.

## Evidence

- Plan 019's M6 renamed the file at website `4897f1c` from `rules.multi-line-code-block.test.ts`, which already rendered this
  way. QA's test audit over the 37 test files that `2e36107..119471f` adds or changes found this one hand-rolled renderer. See
  `qa/019-slate-formatting-discord-engine-m6-qa.md` § Findings, QAF-47, and `test-audit-119471f.txt` (record `4da9b76b`).

## Origin

QA Phase 2 on plan 019's M6 at `119471f`, finding QAF-47 LOW. The planner registered it in plan 019's Planner batch as a stated
limit under the M6 cap (steering, effort rulings blocks 17:56Z and 07:21Z), with this handoff as its carrier.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-24T07:58 | planner-019 | Opened from QAF-47 (record `4da9b76b`). |
