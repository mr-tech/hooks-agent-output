Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-normalize-fence-loop-brief-common.md` — read it whole first.

You are `code-reviewer-fix-normalize-fence-loop`. Review the fixer's hand-off per your definition, starting on its committed document:
`implementation/fix-normalize-fence-loop-implementation.md` (record `1762830e`), `Handoff-At: d3b98cf — repos=website`.

- The tree: website `chain/fix-normalize-fence-loop`, checked out in `/usr/local/bin/hooks/website`. Do not switch it. Use a `git archive`
  export for any other SHA; the base is `0411d3b`.
- Production lines, from `git diff --numstat 0411d3b d3b98cf` (read by steering): `src/@types/slate.d.ts` 4/1, `flattenNodeText.ts` 1/1,
  `getInitialValue.ts` 3/1, `withNormalizeNode.ts` 24/6. Two test files: 15 and 122 added. The fixer counts 32; re-derive it. At 20 or
  more, QA Phase 2 follows your approval, and you do not run QA's suite duties.
- The scope has three limbs (rulings block "2026-11-23T08:55Z"): the loop settles; `>>>` round-trips in full and partial editors; and the
  two together, including the dead `>>> ` test at `withNormalizeNode.ts:29`. Each hazard in the common part is a candidate to re-derive
  through the real parser. Hazard 3 (the interaction) goes first.
- The fixer's re-scope item (typing a fence above a quote line drops that line's `> ` on save; same at base) is outside this fix. Steering
  carried it to the Slate/formatting effort's inventory, row S-29. It is not yours to hold the fix on.
- Usage: `weekly_all` was low at 08:49Z (live). At 98% steering asks every session to checkpoint.
- Your document: `code-review/fix-normalize-fence-loop-code-review.md`. Evidence goes under `verification/fix-normalize-fence-loop/code-review/`.
- A verdict carries `Reviewed-At: <sha>`. On approval, send the spawn cue to `steering-hooks-fixer` by SendMessage; QA is started from it.
  A rejection goes to `fixer-fix-normalize-fence-loop`, copied to `steering-hooks-fixer`.
- Owner-needing items: SendMessage to `steering-hooks-fixer`.
