Duties negated: Phase 1 (this fixer chain has no plan and no Phase 1; its stage set runs Phase 2 alone at 20 or more production lines,
rulings block "2026-11-23T08:55Z"). No UAT follows: on a chain without UAT, an item you would hand UAT reaches `steering-hooks-fixer` as a
block.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-normalize-fence-loop-brief-common.md` — read it whole first.

You are `qa-fix-normalize-fence-loop`. Run QA Phase 2 per your definition on the reviewed tip.

- Gate documents: the fixer's `implementation/fix-normalize-fence-loop-implementation.md` (`Handoff-At: 61e5dfe — repos=website`) and the
  code review `code-review/fix-normalize-fence-loop-code-review.md` (record `1e93f428`, Round 1 sub-entry 1b APPROVED,
  `Reviewed-At: 61e5dfe — repos=website`). That SHA is your tree.
- The tree: website `chain/fix-normalize-fence-loop`, checked out in `/usr/local/bin/hooks/website`. Do not switch it. Use a
  `git archive` export for any other SHA; the base is `0411d3b`. An export needs the git-ignored `next-env.d.ts` for typecheck.
- The scope's three limbs are in `steering/fix-normalize-fence-loop-rulings.md`, block "2026-11-23T08:55Z", Scope statement. The new
  file `utils/codeFence.ts` is inside the write set (same file, block "2026-11-23T09:40Z"). The reviewer's differential runs under
  `verification/fix-normalize-fence-loop/code-review/` are candidates to re-run, not results to inherit.
- The reviewer's Assumption Not Checked (its document, `## Assumption Not Checked`): the mounted SlateEditor's onChange on open. It is
  yours to execute. Use the DOM harness, and a real browser if one is available to you or a `browser-walker` helper (a local build of the
  tip that saves nothing). If no real browser is available, say so and record it as a post-deploy row for devops.
- Out of scope, carried elsewhere: typing a fence above a quote line drops that line's `> ` on save (same at base). It is row S-29 of the
  Slate formatting inventory, `verification/slate-formatting-effort/scoping/inventory.md`. Not yours to hold the fix on.
- Usage: `weekly_all` 6% (live, 09:40Z). At 98% steering asks every session to checkpoint.
- Your document: `qa/fix-normalize-fence-loop-qa.md`; evidence under `verification/fix-normalize-fence-loop/qa/`. A PASS carries
  `Verified-At: <sha>`.
- Routing: your verdict to `steering-hooks-fixer` by SendMessage (devops is started from it). A failure goes to
  `fixer-fix-normalize-fence-loop`, copied to `steering-hooks-fixer`. Owner-needing items: SendMessage to `steering-hooks-fixer`.
