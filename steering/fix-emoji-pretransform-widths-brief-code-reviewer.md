Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-emoji-pretransform-widths-brief-common.md` — read it whole first.

You are `code-reviewer-fix-emoji-pretransform-widths`. Review the fixer's hand-off per your definition, starting on its committed document:
`implementation/fix-emoji-pretransform-widths-implementation.md` (record `eaecd18d`), `Handoff-At: c2fee5c — repos=website` (full SHA
`c2fee5ca8a40e41ab86386d84625e684d4cf8b16`, read by steering with `git rev-parse`).

- The tree: website `chain/fix-emoji-pretransform-widths`, checked out in `/usr/local/bin/hooks/website`; do not switch it — use a
  `git archive` export for any other SHA (`febf20e` is the base).
- Production lines: `git diff --numstat febf20e c2fee5c`, read by steering: `common.ts` 6/0, `decorator.tsx` 9/5, `getInitialValue.ts` 14/5,
  `withNormalizeNode.ts` 15/6, `src/utils/markdown/emoji.tsx` 21/0, `src/utils/markdown/utils.ts` 5/3; three test files 19 + 35 + 59 added.
  The fixer counts 70: re-derive it. At 20 or more, QA Phase 2 follows your approval; you do not run QA's suite duties.
- The fixer's design note (its document): the offset map rides on the interactive parse result as a non-enumerable property, not a static
  import, to keep the emoji table out of the editor bundle (`~/utils/markdown` is loaded by `import()`). Its commit also fixes four
  pre-existing lint warnings in the two touched files, with no change of value — confirm they are value-neutral.
- Each hazard of the common part is a candidate to re-derive, 1 (E-1, text kept) and 2 (E-2, a stored message unchanged on load) first,
  through the real parser.
- **Usage:** the week is at 96%. At 98% steering asks every session to checkpoint and stops it; keep your document current at each commit.
- Your document: `code-review/fix-emoji-pretransform-widths-code-review.md`; evidence under `verification/fix-emoji-pretransform-widths/code-review/`.
- A verdict carries `Reviewed-At: <sha>`. Approval: spawn cue to `steering-hooks-fixer` by SendMessage (QA is started from it). A rejection
  goes to `fixer-fix-emoji-pretransform-widths`, copied to `steering-hooks-fixer`.
- Owner-needing items: SendMessage to `steering-hooks-fixer`.
