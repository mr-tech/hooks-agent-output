Duties negated: Phase 1 (this fixer chain has no plan and no Phase 1; its stage set restores Phase 2 alone at 20 or more production
lines, rulings block "2026-11-22T20:44"). No UAT follows: on a chain without UAT, an item you would hand UAT reaches
`steering-hooks-fixer` as a block.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-decorator-offsets-brief-common.md` — read it whole first. Its scope statement
is replaced by rulings blocks "2026-11-22T20:44" (the source-width class; headings fold in) and "2026-11-22T21:21" (CR-4 carried by its
own chain; CR-3 rides) in `steering/fix-decorator-offsets-rulings.md`. The blocks govern.

You are `qa-fix-decorator-offsets`. Run QA Phase 2 per your definition on the reviewed tip.

- Gate documents: the fixer's `implementation/fix-decorator-offsets-implementation.md` (§ "Round 3", `Handoff-At: 2e6127e`) and the code
  review `code-review/fix-decorator-offsets-code-review.md` — take `Reviewed-At` from its scoped-check entry; that SHA is your tree.
- The tree: website `chain/fix-decorator-offsets`, checked out in `/usr/local/bin/hooks/website`; do not switch it — use a `git archive`
  export for any SHA (`8845b7e` is the base). The shared tree's stale `.next/types` makes an in-tree typecheck exit 2; an export needs the
  git-ignored `next-env.d.ts` (fixer's report).
- The acceptance property: no input colours worse than at base, over every node kind `src/utils/markdown/rules.tsx` produces. The
  reviewer's instruments (its 36,000-row corpus and its grammar oracle, under `verification/fix-decorator-offsets/code-review/`) are
  candidates to re-run, not results to inherit.
- The reviewer's unrun assumption, yours to execute: a Unicode emoji never sits in a text leaf (the editor's `withNormalizeNode` lifts it
  out). Check with a mounted editor holding `🙂 **a**`, under the environment-fidelity convention (CLAUDE.md, DOM component tests). Its
  answer also settles the `TODO.md` item "website editor: an emoji before formatting may shift its syntax colouring": say which way.
- Out of scope, carried elsewhere: CR-4 (style inheritance across sibling runs, chain `fix-decorator-nested-styles`).
- Your document: `qa/fix-decorator-offsets-qa.md`; evidence under `verification/fix-decorator-offsets/qa/`. A PASS carries
  `Verified-At: <sha>`.
- Routing: your verdict to `steering-hooks-fixer` by SendMessage (devops is started from it); a failure goes to `fixer-fix-decorator-offsets`,
  copied to `steering-hooks-fixer`. Owner-needing items: SendMessage to `steering-hooks-fixer`.
