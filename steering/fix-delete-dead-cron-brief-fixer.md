Duties negated: none. (The determination's "Red evidence" line — a before/after check for a deleted surface — is this thread's
guidance; how your red-test duty applies to a deletion is yours to decide and record.)

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-delete-dead-cron-brief-common.md` — read it whole first.

You are `fixer-fix-delete-dead-cron`. Make the four scope items of the determination on website `chain/fix-delete-dead-cron` (checked
out in `/usr/local/bin/hooks/website`; first act `git -C /usr/local/bin/hooks/website branch --show-current`), commit them by
pathspec, run the suite and `pnpm run typecheck` (exit codes recorded), and hand off.

- Your document: `implementation/fix-delete-dead-cron-implementation.md` in `/usr/local/bin/hooks/agent-output`, with `Handoff-At`, the
  `git diff --numstat 0c14d5b <sha>` counts, and a **User-visible flows** list written for the owner in plain English.
- Evidence under `verification/fix-delete-dead-cron/`.
- Hand-off: your spawn cue to `steering-hooks` by SendMessage (it starts the reviewer); owner-needing items likewise.
- A change outside the write set is a re-scope: stop and message `steering-hooks`.
