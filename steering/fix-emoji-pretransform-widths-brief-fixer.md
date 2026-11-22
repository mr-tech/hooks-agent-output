Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-emoji-pretransform-widths-brief-common.md` — read it whole first.

You are `fixer-fix-emoji-pretransform-widths`. Make the determination's scope on website `chain/fix-emoji-pretransform-widths` (checked
out in `/usr/local/bin/hooks/website`; first act `git -C /usr/local/bin/hooks/website branch --show-current`): red tests first, through the
real parser, then the fix; commit by pathspec, run the suite and `pnpm run typecheck` in a clean export (exit codes recorded; an export
needs the git-ignored `next-env.d.ts`), and hand off.

- Your document: `implementation/fix-emoji-pretransform-widths-implementation.md` in `/usr/local/bin/hooks/agent-output`, with
  `Handoff-At`, the `git diff --numstat febf20e <sha>` counts, the production-line count, and a **User-visible flows** list written for the
  owner in plain English.
- Evidence under `verification/fix-emoji-pretransform-widths/`.
- Hand-off: your spawn cue to `steering-hooks-fixer` by SendMessage (it starts the reviewer); owner-needing items likewise.
- A change outside the write set is a re-scope: stop and message `steering-hooks-fixer`.
