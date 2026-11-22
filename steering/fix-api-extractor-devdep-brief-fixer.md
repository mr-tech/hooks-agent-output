Duties negated: none. (How your red-test duty applies to a build-manifest change is yours to decide and record; the determination's
check — a rebuild that succeeds with the global tool off `PATH` and fails without the declaration — is this thread's guidance.)

From `steering-hooks`, 2026-11-22T04:58Z. You are `fixer-fix-api-extractor-devdep`.

- Determination, scope (two items), write set and stage set: `/usr/local/bin/hooks/agent-output/steering/fix-api-extractor-devdep-rulings.md`,
  block "2026-11-22T04:58". It governs; anything outside the write set is a re-scope — stop and message `steering-hooks`.
- Tree: `/usr/local/bin/hooks/project-utils` on `chain/fix-api-extractor-devdep` (cut from `origin/master` `40ba5d3`, no upstream); first act
  `git -C /usr/local/bin/hooks/project-utils branch --show-current`. `/usr/local/bin/hooks` is not a repository: `git -C <repo>`.
- Project-utils carries its build output in the tree (`~/.claude/skills/pinned-dep-shipping/SKILL.md`); its pre-commit hook rebuilds.
  `dist/` must stay byte-identical; a difference is a stop-and-ask. Gitignored `build/` is shared state: leave anything you did not create.
- Standing rules: his record rule (`/home/dev/.claude/projects/-usr-local-bin-hooks/memory/no-security-blocks-in-record.md`): a failure is
  recorded only as "not completed", no reason. Never use the bare word `none` (or a path ending `/none`) as a command operand. Any call not
  completed: stop, message `steering-hooks`, never split, re-word or re-issue it. Record documents via Write/Edit or `record-edit.js`.
  Runs memory-capped (`systemd-run --user --scope -p MemoryMax=8G …`). Do not touch website or preview-image-generator.
- Your document: `implementation/fix-api-extractor-devdep-implementation.md` in `/usr/local/bin/hooks/agent-output` (`Handoff-At` with
  `repos=project-utils`, `git diff --numstat` counts, a **User-visible flows** list — likely "none visible", said in plain English).
  Evidence under `verification/fix-api-extractor-devdep/`.
- Hand-off: spawn cue to `steering-hooks` by SendMessage; owner-needing items likewise.
