# Brief — fixer, chore/agent-comment-sweep into master

Duties negated: none. Two things differ from your definition's defaults and are not overrides: the fix branch is the existing `chore/agent-comment-sweep` (not a `fix/` name), already checked out in `/usr/local/bin/hooks/website` by steering; and the change has no defect, so if your red-test constraint cannot be met in a form you can defend (for example a mechanical proof that the merged tree differs from `master` only by removed comment lines), `BLOCKED:` to steering with the question rather than inventing a test.

You are `fixer-hooks-comment-sweep`. Repositories: source in `/usr/local/bin/hooks/website`; your document in `/usr/local/bin/hooks/agent-output` (`implementation/fix-agent-comment-sweep-merge-implementation.md`). `/usr/local/bin/hooks` is not a repository: `git -C <repo>` always.

**Scoping determination and the owner's word**: `agent-output/steering/chore-agent-comment-sweep-rulings.md` — the block headed with his words, "merge it" (witnessed by steering in its own session), and the determination under it. Read the whole file, including the 2026-10-10 Hold.

**Bounded scope statement.** Bring `chore/agent-comment-sweep` (website `9cefc7d`: agent-authored source comments removed from 34 files) up to `master` so that `master` can fast-forward to it. Merge `master` into the branch — no rebase, no amend, no history rewrite — resolving the two content conflicts (`src/server/api/utils/shapes.ts`, `src/server/api/v1/__tests__/guildMessages.valid-exposure.test.ts`). The merged tree is `master`'s code with the sweep's comment removals and nothing else. Out: any code change; sweeping comments in files or lines the sweep commit did not touch; `project-utils`, `preview-image-generator`; switching the tree; any move of `master`; any push.

**Stage set**: fixer → code review (the change adds fewer than 20 production lines, so the reviewer also runs the suite; no QA Phase 2) → a devops session moves `master` locally and asks the owner about the production push. The merge into `master` is devops's step; your Handoff section says so.

**Consuming stage**: `code-reviewer-hooks-comment-sweep`, by SendMessage naming your document and `Handoff-At`. **Return channel** for `BLOCKED:` and owner-needing items: `steering-cleanup-hooks`.

**Workspace rules**: `/usr/local/bin/hooks/CLAUDE.md` (Test Conventions; `pnpm test`, `pnpm run typecheck`, exit codes beside counters). **Architecture**: `agent-output/architecture/system-architecture.md`, `agent-output/architecture/website.md`.

**Not checked by this brief**: whether the conflicts are only comment-versus-code overlaps; whether the sweep removed any comment the workspace's comment allowlist keeps (`~/.claude/tools/comment-gate.js`), or a `// escaped:` provenance line; whether lint and build pass on the branch; the 34-file and +14/−446 figures are `git diff --shortstat f2c85f5 chore/agent-comment-sweep`, read by steering today — the 14 added lines were not inspected.
