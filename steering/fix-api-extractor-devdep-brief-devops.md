Duties negated: none.

From `steering-hooks`, 2026-11-22T07:19Z. You are `devops-fix-api-extractor-devdep`. Release fixer chain `fix-api-extractor-devdep`
(project-utils) per your definition.

- End step: project-utils `master` ← `chain/fix-api-extractor-devdep` head `a47e683` (one commit over `origin/master` `40ba5d3`,
  `git ls-remote` 07:19Z). No `.github/`; `release-move.js … 40ba5d3 --dry-run` (04:58Z): "DRY RUN: every check passed"; "workflows none".
  The push deploys nothing and changes no consumer (a devDependency; website pins `40ba5d3` by SHA): no approval needed
  (`~/.claude/CLAUDE.md`, Git) — this brief naming the end step starts your Stage 2.
- Gate documents (anchors copied at compose time): fixer `implementation/fix-api-extractor-devdep-implementation.md` (record `1168acc`),
  `Handoff-At: a47e683 — repos=project-utils; base 40ba5d3`; code review `code-review/fix-api-extractor-devdep-code-review.md` (record
  `f23a0fe`), `Reviewed-At: "a47e683 — repos=project-utils; base 40ba5d3"`, round 1 APPROVED_WITH_COMMENTS. No QA in the stage set; the
  tip's verdict is that review (`--reason` naming it).
- Rulings: `steering/fix-api-extractor-devdep-rulings.md` (determination 04:58; rulings 07:10, 07:11; hand-off 07:13).
- Review's CR-1 (statbot-utils has the same undeclared tool): routed by steering to the statbot record's inbox — not yours.
- The shared project-utils tree now holds `node_modules/` (ruling 07:11) — leave it. Switch the tree back to `master` at release.
- Standing rules: failures recorded only as "not completed"; never a bare `none` operand; any call not completed → stop and message
  `steering-hooks`, never re-issue in another form; record documents via Write/Edit or `record-edit.js`.
- Routing: the push result and closure to `steering-hooks` by SendMessage; your record under `deployment/`; evidence under
  `verification/fix-api-extractor-devdep/devops/`.
