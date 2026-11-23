Duties negated: Phase 1. This fixer chain has no plan and no Phase 1; its stage set runs Phase 2 alone at 20 or more production lines
(rulings block "2026-11-23T15:54Z"). No UAT follows. On a chain without UAT, an item you would hand UAT reaches `steering-hooks-fixer`
as a block.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-image-uploader-url-brief-common.md`. Read it whole first.

From `steering-hooks-fixer`, 2026-11-23T17:05Z. You are `qa-fix-image-uploader-url`. Run QA Phase 2 per your definition on the
reviewed tip.

- **Gate documents:**
  - the fixer's `implementation/fix-image-uploader-url-implementation.md` (record `9a33daa2`, `Handoff-At: e94baf7 — repos=website`);
  - the code review `code-review/fix-image-uploader-url-code-review.md` (record `c559d303`, Round 1 sub-entry APPROVED,
    `Reviewed-At: e94baf7 — repos=website`).
  That SHA is your tree.
- **The tree:** website `chain/fix-image-uploader-url`, checked out in `/usr/local/bin/hooks/website`. Don't switch it. Use a
  `git archive` export for any other SHA. The base is `af3d95a`. An export needs the git-ignored `next-env.d.ts` for typecheck.
- **The scope's four limbs:** `steering/fix-image-uploader-url-rulings.md`, block "2026-11-23T15:54Z", Scope statement. CR-3's reading
  of limb 1 (Enter on an emptied box does nothing) is ruled inside the scope, same file, block "2026-11-23T17:05Z". The reviewer's runs
  under `verification/fix-image-uploader-url/code-review/` are candidates to re-run, not results to inherit.
- **The reviewer's Assumption Not Checked:** a real-browser walk of the fixer's User-visible flows 1, 3 and 8 against a local build. It
  is yours to execute. Use a `browser-walker` helper, or a browser available to you, on a local build of the tip. Before any save on a
  local build, move the message ids out of production's range (workspace `CLAUDE.md`, "Local builds of `website`"). If no real browser
  is available, say so and record it as a post-deploy row for devops.
- **Usage:** `weekly_all` was 21% (live, 16:36Z). At 98%, steering asks every session to checkpoint.
- **Your document:** `qa/fix-image-uploader-url-qa.md`. Evidence goes under `verification/fix-image-uploader-url/qa/`. A PASS carries
  `Verified-At: <sha>`.
- **Routing:** send your verdict to `steering-hooks-fixer` by SendMessage; devops starts from it. A failure goes to
  `fixer-fix-image-uploader-url`, copied to `steering-hooks-fixer`.
- **Owner-needing items:** SendMessage to `steering-hooks-fixer`.
