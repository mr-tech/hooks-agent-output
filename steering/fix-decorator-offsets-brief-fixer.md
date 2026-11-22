Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-decorator-offsets-brief-common.md` — read it whole first.

You are `fixer-fix-decorator-offsets`. Make the determination's scope on website `chain/fix-decorator-offsets` (checked out in
`/usr/local/bin/hooks/website`; first act `git -C /usr/local/bin/hooks/website branch --show-current`): red test first, then the fix;
commit by pathspec, run the suite and `pnpm run typecheck` in a clean export (exit codes recorded; the shared tree's stale `.next/types`
makes an in-tree typecheck exit 2), and hand off.

- Your document: `implementation/fix-decorator-offsets-implementation.md` in `/usr/local/bin/hooks/agent-output`, with `Handoff-At`, the
  `git diff --numstat 8845b7e <sha>` counts, the production-line count, and a **User-visible flows** list written for the owner in plain
  English.
- Evidence under `verification/fix-decorator-offsets/`.
- Hand-off: your spawn cue to `steering-hooks-fixer` by SendMessage (it starts the reviewer); owner-needing items likewise.
- A change outside the write set is a re-scope: stop and message `steering-hooks-fixer`.
