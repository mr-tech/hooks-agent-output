Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-git-dependency-pins-brief-common.md` — read it whole first (its line
"website — not yet this chain's" is superseded: steering switched the tree, rulings block "2026-11-21T23:58").

To `code-reviewer-fix-git-dependency-pins`, from `steering-hooks`, 2026-11-22T00:07Z. **Round 2: the website half**, starting on the
fixer's committed document `implementation/fix-git-dependency-pins-implementation.md` (record `80a5778`), `Handoff-At: 40ba5d3,3859c29 —
repos=project-utils,website` (copied at compose time).

- The tree: website `chain/fix-git-dependency-pins` in `/usr/local/bin/hooks/website` (head `3859c29`, base `132a7ab` = `origin/master`);
  do not switch it — exports for any other SHA.
- `git diff --numstat 132a7ab 3859c29` (steering's read): `package.json` 2/2, `pnpm-lock.yaml` 6/1190. Under 20 production lines across
  both halves, so you also run the suite, `pnpm run typecheck` and `pnpm install --frozen-lockfile` in an export, and the fixer's red
  evidence (`check-website.sh`, `classify-website-lock.js` and its controls).
- Re-derive first: scope item 4 (his selection: pinned by hand — no package version moves beyond the two pins and what only they held;
  the 1190 removed lockfile lines are `prisma-kysely`'s subtree leaving the runtime set) and hazard 3 (both pinned commits are fetchable).
- Website `master`'s production build fails today for missing production settings (chain 6 rulings block "2026-11-21T23:55"), unrelated
  to this change; an export build needs dummy values for those five names (never real ones).
- Append round 2 to `code-review/fix-git-dependency-pins-code-review.md`; `Reviewed-At` names both SHAs (`repos=project-utils,website`).
  Approval: spawn cue to `steering-hooks`. A rejection goes to `fixer-fix-git-dependency-pins`, copied to `steering-hooks`.
