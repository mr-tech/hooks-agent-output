Duties negated: none.

From `steering-hooks`, 2026-11-22T07:13Z. You are `code-reviewer-fix-api-extractor-devdep`. Review per your definition, starting on the
fixer's committed document `implementation/fix-api-extractor-devdep-implementation.md` (record `1168acc`), `Handoff-At: a47e683 —
repos=project-utils; base 40ba5d3` (copied at compose time).

- Determination, scope and the two later rulings (07:10 admitted two in-range hoisted bumps; 07:11 admitted `npm ci` and the hook's
  rebuild in the shared tree): `/usr/local/bin/hooks/agent-output/steering/fix-api-extractor-devdep-rulings.md`. They govern.
- Tree: `/usr/local/bin/hooks/project-utils` on `chain/fix-api-extractor-devdep` (head `a47e683`, base `40ba5d3` = `origin/master`); do not
  switch it — exports for any other SHA. `/usr/local/bin/hooks` is not a repository: `git -C <repo>`.
- `git diff --numstat 40ba5d3 a47e683` (steering's read): `package.json` 1/0, `package-lock.json` 745/15. No production lines; you run
  `npm run rebuild` in an export with the global `api-extractor` off `PATH`, red at `40ba5d3` and green at `a47e683`, and show `dist/`
  byte-identical to the committed tree.
- Re-derive: the lockfile diff is `@microsoft/api-extractor`'s subtree plus exactly the two admitted bumps (`function-bind` 1.1.2,
  `is-core-module` 2.18.0), top-level `typescript` still 5.1.6; lint passes with them.
- Standing rules: a failure in the record is "not completed", no reason
  (`/home/dev/.claude/projects/-usr-local-bin-hooks/memory/no-security-blocks-in-record.md`); never a bare `none` operand; any call not
  completed → stop and message `steering-hooks`, never re-issue in another form; record documents via Write/Edit or `record-edit.js`; runs
  memory-capped (`systemd-run --user --scope -p MemoryMax=8G …`). Do not touch website or preview-image-generator.
- Your document: `code-review/fix-api-extractor-devdep-code-review.md`; evidence under `verification/fix-api-extractor-devdep/code-review/`.
  A verdict carries `Reviewed-At: <sha> — repos=project-utils`. Approval: spawn cue to `steering-hooks`; a rejection to
  `fixer-fix-api-extractor-devdep`, copied to `steering-hooks`.
