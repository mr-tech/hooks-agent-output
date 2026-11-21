Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-git-dependency-pins-brief-common.md` — read it whole first.

You are `code-reviewer-fix-git-dependency-pins`. This chain has two review rounds, one per half. **Round 1 now: the project-utils half**,
starting on the fixer's committed document `implementation/fix-git-dependency-pins-implementation.md` (record `44bb065`), `Handoff-At:
40ba5d3 — repos=project-utils; website half not started` (copied at compose time).

- The tree: project-utils `chain/fix-git-dependency-pins` in `/usr/local/bin/hooks/project-utils` (head `40ba5d3`, base `749606d`); do not
  switch it — use a `git archive` export for any other SHA. Website is not this chain's tree yet (common part).
- `git diff --numstat 749606d 40ba5d3` (steering's read): `dist/prisma.js` 0/21, `dist/prisma.js.map` 0/1, `package-lock.json` 760/194,
  `package.json` 1/1. Under 20 production lines added, so you also run the build (`npm run build` and `build:types`) and the fixer's red
  evidence (`verification/fix-git-dependency-pins/check-project-utils.sh`). Project-utils has no test suite.
- Re-derive first: hazard 1 (a clean rebuild's `dist/` equals the committed tree apart from the two deletions) and the lockfile claim
  (`prisma-kysely`'s subtree only gains `dev: true`; nothing added, removed or re-versioned).
- Steering's ruling (rulings block "2026-11-21T23:07"): deleting the gitignored `build/js/prisma.js(.map)` cache is in scope; it changes no
  commit. Check that a rebuild after it leaves no untracked `dist/prisma.js`.
- Your document: `code-review/fix-git-dependency-pins-code-review.md`; evidence under `verification/fix-git-dependency-pins/code-review/`.
- A verdict carries `Reviewed-At: <sha> — repos=project-utils`. Approval: spawn cue to `steering-hooks` by SendMessage (devops pushes
  project-utils from it). A rejection goes to `fixer-fix-git-dependency-pins`, copied to `steering-hooks`. Round 2 (the website half)
  comes by a later brief.
- Owner-needing items: SendMessage to `steering-hooks`.
