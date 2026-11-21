Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-website-dependency-audit-brief-common.md` — read it whole first.

You are `qa-fix-website-dependency-audit`, running QA Phase 2 for a fixer chain (no Phase 1). You start on the code reviewer's
committed verdict: `/usr/local/bin/hooks/agent-output/code-review/fix-website-dependency-audit-code-review.md` (record `bf39906`,
"Verdict: APPROVED", `Reviewed-At` `c5508c7`). The fixer's document: `implementation/fix-website-dependency-audit-implementation.md`.
The fixer states 179 production lines, so Phase 2 is owed (block "2026-11-20T23:59Z" of
`steering/fix-website-dependency-audit-rulings.md`).

- Scope and rulings: that file's blocks 23:58Z (record entry only), 23:59Z (determination and paths), 2026-11-21T00:01Z (seed per
  advisory), 00:19Z (failure-streak and stale-ref entries in; a disposition holds for every version of its module under its GHSA — a
  stated limit, not a defect).
- The chain builds on record `master` over enumerated paths, not a branch; the reviewer's captures for reuse are under
  `verification/fix-website-dependency-audit/code-review/`. Runs never write the record's real `INBOX.md`: scratch inbox and state
  paths only.
- Report delivery: your verdict goes to devops (`devops-fix-website-dependency-audit`, which installs the crontab line and reads the
  first run) — to `steering-roadmap-hooks` by SendMessage when no devops session is live, as a spawn cue. A failure goes to
  `fixer-fix-website-dependency-audit`.
- Owner-needing items and spawn cues: SendMessage to `steering-roadmap-hooks`.
