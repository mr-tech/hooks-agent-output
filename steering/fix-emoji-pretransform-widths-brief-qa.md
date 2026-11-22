Duties negated: Phase 1 (this fixer chain has no plan and no Phase 1; its stage set runs Phase 2 alone at 20 or more production lines,
rulings block "2026-11-22T22:59"). No UAT follows: on a chain without UAT, an item you would hand UAT reaches `steering-hooks-fixer` as a
block.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-emoji-pretransform-widths-brief-common.md` — read it whole first.

You are `qa-fix-emoji-pretransform-widths`. Run QA Phase 2 per your definition on the reviewed tip.

- Gate documents: the fixer's `implementation/fix-emoji-pretransform-widths-implementation.md` (`Handoff-At: 0411d3b`) and the code review
  `code-review/fix-emoji-pretransform-widths-code-review.md` (record `83e02c84`, Round 1 sub-entry APPROVED_WITH_COMMENTS,
  `Reviewed-At: 0411d3ba146018a5a8d3e8a45398d7d04f499d18`). That SHA is your tree.
- The tree: website `chain/fix-emoji-pretransform-widths`, checked out in `/usr/local/bin/hooks/website`; do not switch it — use a
  `git archive` export for any SHA (`febf20e` is the base). An export needs the git-ignored `next-env.d.ts` for typecheck.
- The acceptance property: no character of the user's text is lost or rewritten on paste, typing or load where an emoji is involved, and no
  input does worse than at base. The reviewer's probes (`verification/fix-emoji-pretransform-widths/code-review/probe2-*`) are candidates
  to re-run, not results to inherit.
- The reviewer's open assumption, yours to execute in a real browser if one is available to you or a `browser-walker` helper (a local build
  of the tip that saves nothing, or the test page your definition allows): a real paste of `x🙂 abcdefghijklmnopq`, and a straddle line
  such as `wow :ok🙂 hi`, which should keep 🙂 as a plain character. If no real browser is available, say so and record it as a
  post-deploy row for devops.
- QA's earlier unrun case: a custom Discord emoji via the picker in a code line.
- Out of scope, carried elsewhere: CR-3 (decorator ranges past a `#` line's end) and the `_`-pairing cosmetic rows (`TODO.md`, the
  nested-styles item); CR-2 (a type declaration outside the write set), declined by the reviewer.
- **Usage:** the week is at 97%. At 98% steering asks you to checkpoint and stops your session until the reset; keep your document current
  at each commit.
- Your document: `qa/fix-emoji-pretransform-widths-qa.md`; evidence under `verification/fix-emoji-pretransform-widths/qa/`. A PASS carries
  `Verified-At: <sha>`.
- Routing: your verdict to `steering-hooks-fixer` by SendMessage (devops is started from it); a failure goes to
  `fixer-fix-emoji-pretransform-widths`, copied to `steering-hooks-fixer`. Owner-needing items: SendMessage to `steering-hooks-fixer`.
