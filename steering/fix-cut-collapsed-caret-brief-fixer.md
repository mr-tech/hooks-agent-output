Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-cut-collapsed-caret-brief-common.md` — read it whole first.

You are `fixer-fix-cut-collapsed-caret`. Make the determination's scope on website `chain/fix-cut-collapsed-caret` (checked out in
`/usr/local/bin/hooks/website`; first act `git -C /usr/local/bin/hooks/website branch --show-current`): red test first, then the fix;
commit by pathspec, run the suite and `pnpm run typecheck` in a clean export (exit codes recorded; the shared tree's stale `.next/types`
makes an in-tree typecheck exit 2), and hand off.

- Your document: `implementation/fix-cut-collapsed-caret-implementation.md` in `/usr/local/bin/hooks/agent-output`, with `Handoff-At`, the
  `git diff --numstat 453de76 <sha>` counts, the production-line count, and a **User-visible flows** list written for the owner in plain
  English.
- Evidence under `verification/fix-cut-collapsed-caret/`.
- Hand-off: your spawn cue to `steering-hooks-fixer` by SendMessage (it starts the reviewer); owner-needing items likewise.
- A change outside the write set is a re-scope: stop and message `steering-hooks-fixer`.
