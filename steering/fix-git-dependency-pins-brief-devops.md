Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-git-dependency-pins-brief-common.md` — read it whole first.

From `steering-hooks`, 2026-11-21T23:11Z. You are `devops-fix-git-dependency-pins`. This chain has two releases; this brief is the first.

## Release 1 now — project-utils `master` (mid-chain; deploys nothing)

- End step: project-utils `master` ← `chain/fix-git-dependency-pins` head `40ba5d3` (fast-forward of one commit over `origin/master`
  `749606d`, `git ls-remote` 23:11Z). No `.github/` in project-utils (`git ls-tree` at `749606d`); `release-move.js … 749606d --dry-run`
  (22:58Z): "DRY RUN: every check passed; nothing moved"; "workflows none". A push that deploys nothing needs no approval
  (`~/.claude/CLAUDE.md`, Git): this brief naming the end step starts your Stage 2 for it. Establish yourself whether anything else
  watches the branch.
- Gate documents (anchors copied at compose time): fixer `implementation/fix-git-dependency-pins-implementation.md` (record `44bb065`),
  `Handoff-At: 40ba5d3 — repos=project-utils; website half not started`; code review `code-review/fix-git-dependency-pins-code-review.md`
  (record `fd88ffc`), `Reviewed-At: 40ba5d3a5b54… — repos=project-utils; round 1 covers the project-utils half only`, APPROVED, no findings.
  No QA in this stage set; the tip's verdict is that review (`release-move.js` `--reason` naming it).
- The chain's documents stay open after this push: the website half follows. Do not close the fixer's or the reviewer's document.
- When pushed: message `steering-hooks` the pushed project-utils commit (full SHA) and `git ls-remote origin master`'s reading. Steering
  then switches the website tree and briefs the fixer.

## Release 2 later — website `master` (his word)

Comes by a later brief after the website half's review. Do not start it from this brief.

## Carriers and hazards

- Rulings: `steering/fix-git-dependency-pins-rulings.md` blocks 22:28 (his selections), 22:58 (determination), 23:07.
- Code review's Assumption Not Checked: consumers outside the workspace that load `prisma-kysely` through project-utils' runtime install
  would break at their next re-pin. Steering's read (23:11Z): no `package.json` under `/usr/local/bin/statbot` or `/usr/local/bin/paracord`
  names `project-utils` (`grep -l --include=package.json -r`, `node_modules` excluded); consumers elsewhere unread.
- Avoid a bare `none` operand; a call not completed → stop and message `steering-hooks`, never re-issue in another form; the record says
  only "not completed".

## Routing

Owner-needing items you are not asking him yourself, spawn cues and the push result: SendMessage to `steering-hooks`. Your document under
`deployment/`; evidence under `verification/fix-git-dependency-pins/devops/`.
