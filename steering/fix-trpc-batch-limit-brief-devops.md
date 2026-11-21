Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-trpc-batch-limit-brief-common.md` — read it whole first.

You are `devops-fix-trpc-batch-limit`. You start on the code reviewer's committed verdict:
`/usr/local/bin/hooks/agent-output/code-review/fix-trpc-batch-limit-code-review.md` (record `7c91e51`, "Verdict: APPROVED" at
`f47e304`, Round 1 sub-entry 1). The fixer's document: `implementation/fix-trpc-batch-limit-implementation.md`.

- **The release:** website `master` from `d1bb9b0` to the chain tip `chain/fix-trpc-batch-limit` (`f47e304` at the review; re-read it).
  Vercel deploys `master` to production; website has no `.github/workflows` (`release-move.js --dry-run` 2026-11-20T23:5xZ, block
  23:57Z of `steering/fix-trpc-batch-limit-rulings.md`). His release approval is yours to ask in this session (Phase 2B); this thread
  puts no release prompt while you are live.
- **Gate evidence:** the fix adds 2 production lines (the fixer's count), so this fixer chain has code review alone and no QA Phase 2
  (block 23:57Z). The verdict that gates the push is the review's `Reviewed-At`; state in your record that the tip's tree is that tree.
- **Decisions:** the rulings file above is this chain's register: blocks 23:57Z (determination), 2026-11-21T00:11Z (premise
  correction: `Redirects/Server.tsx` not mounted), 00:20Z (CR-1 Minimum remedy).
- **Assumptions Not Checked:** `code-review/fix-trpc-batch-limit-code-review.md`, "## Assumption Not Checked" (line 167) and its
  restatement at line 178 — read production function logs after the deploy for 400s carrying "Batching is not enabled on the server".
  Read-only Vercel reads are standing defaults, never asked (`steering/017-rulings.md` blocks 2026-11-18T23:15Z and 23:41Z, bounds in
  23:41Z). The fixer's document has no such heading (`grep -n -i 'assumption not checked'`, 0 lines).
- **Carriers for your forward-item sweep:** `handoff/website-trpc-batch-size-and-deps-review-leftovers-2026-11-20.md` (items 1–3
  discharged by this chain; items 4–7 stay, item 6 being chain `fix-website-dependency-audit`'s);
  `handoff/website-018-standing-risks-save-toast-and-lint-stack-2026-11-20.md` (its trigger names edits to these routes; read it).
- **Hazards (the sweep did not cover them):** Vercel's request-size limits; any external caller of `/api/trpc` that batches is refused
  after release, and none is known — read from code, not run; the matcher change on bare `/message` is unexercised against production.
- After release: the chain branch is merged and deleted, the tree left on `master`, per your definition.
- Report delivery: your committed record is the receipt; owner-needing items and the release-complete cue go to `steering-roadmap-hooks`
  by SendMessage.
