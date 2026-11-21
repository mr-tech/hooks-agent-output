Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-website-dependency-audit-brief-common.md` — read it whole first.

You are `code-reviewer-fix-website-dependency-audit`. You start on the fixer's committed document,
`/usr/local/bin/hooks/agent-output/implementation/fix-website-dependency-audit-implementation.md` (its `Handoff-At` field names the
record SHA to review; commit `f073fd6`). The chain builds in the shared record repository on `master`, over the paths block
"2026-11-20T23:59Z" of `steering/fix-website-dependency-audit-rulings.md` enumerates; review those paths at that SHA.

- Rulings bearing on the design: blocks "2026-11-20T23:58Z" (his selection: record entry only) and "2026-11-21T00:01Z" (seed per
  advisory) of that rulings file. The fixer states that it also made the tool honour only a `module|GHSA` key with a non-empty `how`;
  that is the fixer's design, for your review against those two blocks.
- Report delivery: your verdict goes to `qa-fix-website-dependency-audit` by SendMessage (the fixer's document states 123 production
  lines, so QA Phase 2 follows) — to `steering-roadmap-hooks` when no QA session is live (`ListAgents`), as a spawn cue. A rejection
  goes to `fixer-fix-website-dependency-audit`.
- Owner-needing items and spawn cues: SendMessage to `steering-roadmap-hooks`.
