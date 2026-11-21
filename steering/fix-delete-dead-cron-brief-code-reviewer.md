Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-delete-dead-cron-brief-common.md` — read it whole first.

You are `code-reviewer-fix-delete-dead-cron`. Review the fixer's hand-off per your definition, starting on its committed document:
`implementation/fix-delete-dead-cron-implementation.md` (record `7c99ece6`), `Handoff-At: 132a7ab6f49d8a85ead507e2221ab3c3a531fd00 —
repos=website` (copied at compose time).

- The tree: website `chain/fix-delete-dead-cron`, checked out in `/usr/local/bin/hooks/website`; do not switch it — use a `git archive`
  export for any other SHA (`0c14d5b` is the base).
- Production lines added: 0 (`git diff --numstat 0c14d5b 132a7ab`, read by steering: `package.json` 0/1, `pnpm-lock.yaml` 0/17,
  `src/pages/api/cron.ts` 0/81, the test 0/55, `vercel.json` 0/8 — the file deleted whole). Under 20, so per the stage set you also run
  the suite and `pnpm run typecheck` (exit codes recorded) and the fixer's red evidence.
- Each hazard of the common part is a candidate to re-derive, hazard 1 (`vercel.json` deleted rather than left `{}`) and 2 (lockfile
  diff confined to `cron-parser`'s subtree) first.
- Your document: `code-review/fix-delete-dead-cron-code-review.md`; evidence under `verification/fix-delete-dead-cron/code-review/`.
- A verdict carries `Reviewed-At: <sha>`. Approval: spawn cue to `steering-hooks` by SendMessage (devops is started from it). A rejection
  goes to `fixer-fix-delete-dead-cron`, copied to `steering-hooks`.
- Owner-needing items: SendMessage to `steering-hooks`.
