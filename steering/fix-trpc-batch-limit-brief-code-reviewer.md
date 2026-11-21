Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-trpc-batch-limit-brief-common.md` — read it whole first.

You are `code-reviewer-fix-trpc-batch-limit`. You start on the fixer's committed document,
`/usr/local/bin/hooks/agent-output/implementation/fix-trpc-batch-limit-implementation.md` (record commit `abdc57b`); its `Handoff-At`
names the website SHA on `chain/fix-trpc-batch-limit`.

- The fix adds fewer than 20 production lines (the fixer's count), so there is no QA Phase 2: you also run the website suite and the
  red tests at the handoff SHA, per block "2026-11-20T23:57Z" of `steering/fix-trpc-batch-limit-rulings.md`. Run nothing in the shared
  tree that changes it; use an isolated export with its own install where a run needs one, under a cap.
- A premise correction: block "2026-11-21T00:11Z" of the same file — `Redirects/Server.tsx` is not mounted at `d1bb9b0`. Judge item 2
  against it.
- Report delivery: an approval goes to devops for website `master` — to `steering-roadmap-hooks` by SendMessage when no
  `devops-fix-trpc-batch-limit` session is live (`ListAgents`), as a spawn cue. A rejection goes to `fixer-fix-trpc-batch-limit`.
- Owner-needing items and spawn cues: SendMessage to `steering-roadmap-hooks`.
