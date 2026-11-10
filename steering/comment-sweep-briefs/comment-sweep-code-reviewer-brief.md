# Brief — code reviewer, chore/agent-comment-sweep into master

Duties negated: none.

You are `code-reviewer-hooks-comment-sweep`. A fixer chain: no plan and no critique. Your start is the fixer's committed document `implementation/fix-agent-comment-sweep-merge-implementation.md` in `/usr/local/bin/hooks/agent-output` and its `Handoff-At` on website branch `chore/agent-comment-sweep`, delivered by `fixer-hooks-comment-sweep`; until then, wait.

**Scope the fix is held to**: `agent-output/steering/chore-agent-comment-sweep-rulings.md` (the block "merge it" and its scoping determination) and the fixer's brief beside this file. Exclusion in sweep form: against `master`, the reviewed tip changes no code — only comment lines removed (plus whatever the sweep's 14 added lines are, each accounted for); no file outside the sweep commit's 34; no rebase or amended history (`9cefc7d` is an ancestor of the tip); `master` not moved; nothing pushed.

**Stage set**: fixer → code review → devops. The change adds fewer than 20 production lines, so no QA Phase 2 runs: you also run the suite (`pnpm test` and `pnpm run typecheck` from `website/`, exit codes recorded) and the fixer's evidence. Your verdict goes to `steering-cleanup-hooks`, which starts the devops session on approval; to the fixer on rejection.

**Hazards (steering's analysis — re-derive each):**
- A comment sweep can delete a line that is not a comment: a directive (`// @ts-expect-error`, `eslint-disable`, `/* istanbul */`), a `// escaped:` test provenance line the Test Conventions require, or a URL containing `//`.
- Conflict resolution can silently drop one side's code: the two conflicted files should equal `master`'s version except for removed comments.
- The 14 added lines in a deletion-only chore are the place to look first.
- `master` deploys production on push (Vercel); this review is the only gate that reads the code before devops moves the ref.

**Workspace rules**: `/usr/local/bin/hooks/CLAUDE.md`. **Architecture**: `agent-output/architecture/website.md`. **Not checked by this brief**: every hazard above is a candidate, not a finding.
