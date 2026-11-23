---
ID: n/a
Origin: fix-normalize-fence-loop
UUID: a0de90fd
Verified-At: "pending — Phase 2 in progress at website 61e5dfe"
Status: Testing In Progress
Status-Detail: "Phase 2 on website 61e5dfe (code review Round 1b APPROVED). Criteria recorded; execution under way."
Phase: 2
---

# QA Report: fix-normalize-fence-loop

**Plan Reference**: none — a fixer chain (`ID: n/a`). Scope statement: `steering/fix-normalize-fence-loop-rulings.md`, block
"2026-11-23T08:55Z"; `codeFence.ts` inside the write set per block "2026-11-23T09:40Z".
**Gate documents**: `implementation/fix-normalize-fence-loop-implementation.md` (`Handoff-At: 61e5dfe — repos=website`);
`code-review/fix-normalize-fence-loop-code-review.md` (record `1e93f428`, Round 1 sub-entry 1b APPROVED, `Reviewed-At: 61e5dfe`).
**Brief**: `steering/fix-normalize-fence-loop-brief-qa.md` with `-brief-common.md`.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-23T09:42 | steering-hooks-fixer (brief `steering/fix-normalize-fence-loop-brief-qa.md`) | Phase 2 on website `61e5dfe` | Phase 2 opened. No Phase 1 on this fixer chain (owner's selection of the fixer route; brief "Duties negated"); this is Phase 2 alone. Criteria recorded before execution |

## Stage start

- Stage start: the code review's committed verdict, `Reviewed-At: 61e5dfe — repos=website`, Round 1 sub-entry 1b APPROVED (record
  `1e93f428`). Website HEAD read `61e5dfe46e36a16748ece7eae1d604df4ee86ffd` at 09:4xZ on `chain/fix-normalize-fence-loop`.
- No Phase 1: the owner's selection of the fixer route (rulings block "2026-11-23T08:55Z", stage set). The Irreversible Side-Effect
  Register is not produced: the change writes nothing irreversible (editor loader, normaliser and flattener; the save path is unchanged and
  saves nothing on its own) — read from the diff `git diff 0411d3b 61e5dfe` over production paths.
- TDD evidence on a `fix-` chain is the fixer document's Test section (red run, green run), not a table.

## Criteria assessed (recorded before execution)

| ID | Criterion (source) | Input class it exemplifies | Instrument this pass |
|---|---|---|---|
| C1 | Scope (1): a quote line + a code fence with no language settles on normalise and accepts a typed character at every position, in every full-markdown editor; the fence's language reads the same in load and normalise; the quote branch writes nothing when the text is unchanged | every caret position of every value holding a quote line and a fence (any info string) | suite; a seeded random-text differential (differently shaped from the reviewer's 20-atom corpus); mutation sweep |
| C2 | Scope (2): load + save with no edit returns the text unchanged where it holds `>>> ` (`>>> a\nb`, `>>> a`, `>>> a\n\nb`), full and partial editors; opening or leaving a box writes no changed text | every stored text, full and partial (`partialMarkdown`) | the same differential, both modes; mounted `SlateEditor` (DOM harness) for the open write; `Desktop.tsx` blur path read |
| C3 | Scope (3): `>>> a` + bare fence settles; the `>>> ` test in `handleEditor` is live | `>>>` inputs in the C1 class | suite; differential; mutation sweep |
| C4 | Code review's Assumption Not Checked: a mounted `SlateEditor`'s open calls `onChange` with `flattenNodeText(getInitialValue(text))` and nothing else | every stored text (C2's class) at the mount | new mounted-editor test (DOM harness); a real browser where available |
| C5 | Hazard 4 (brief-common): the emoji chain's two files stay green | — | suite |

Out of scope, carried elsewhere: a quote line taken into a newly opened code block loses `> ` (same at base) — row S-29 of
`verification/slate-formatting-effort/scoping/inventory.md`.
