Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-desktop-draft-as-typed-brief-common.md` — read it whole first.

You are `code-reviewer-fix-desktop-draft-as-typed`. You start on the fixer's committed document
(`implementation/fix-desktop-draft-as-typed-implementation.md` in `/usr/local/bin/hooks/agent-output`) and its `Handoff-At` SHA, per your
definition.

- Review the website change on `chain/fix-desktop-draft-as-typed` against the scope statement in
  `steering/fix-desktop-draft-as-typed-rulings.md`, block "2026-11-21T10:43Z", and the hazard-bearing analysis in the common part, each
  hazard a candidate to re-derive (2, the trim while typing, and 5, what the DOM substitute can truly drive, above all).
- Where the fix adds fewer than 20 production lines (count it yourself), you also run the full suite (exit code beside the counters)
  and the red tests at `b663b35` and at the handoff SHA; QA Phase 2 is then not in the set. At 20 or more, your verdict goes to
  `qa-fix-desktop-draft-as-typed` by SendMessage — to `steering-hooks` as a spawn cue when no QA session is live.
- The fixer's document discloses that `pnpm run lint` (`eslint --fix .`) rewrote tracked files and that it restored the ones not its own
  from HEAD (its Verification section). Establish from git, not from that account, that the tree you review holds only the chain's
  commits and that no lint rewrite rides in them.
- The fixer's **User-visible flows** list is what he will read with the release; a flow your review finds wrong is a finding.
- An approval with no QA owed is delivered to `steering-hooks` by SendMessage; a rejection goes to `fixer-fix-desktop-draft-as-typed`.
- Owner-needing items and spawn cues: SendMessage to `steering-hooks`.
