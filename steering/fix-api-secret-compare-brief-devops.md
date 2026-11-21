Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-api-secret-compare-brief-common.md` — read it whole first.

From `steering-hooks`, 2026-11-21T18:23Z. You are `devops-fix-api-secret-compare`. You release fixer chain `fix-api-secret-compare`
(website) per your definition: Stage 1 now; Stage 2 only on the owner's release approval, which you ask him for in this session (the
push to website `master` deploys to Vercel production).

## Gate documents (anchors copied at compose time)

- Fixer: `implementation/fix-api-secret-compare-implementation.md`, `Handoff-At: 0c14d5b — repos=website` (record `b26ebfa9`).
- Code review: `code-review/fix-api-secret-compare-code-review.md`, `Reviewed-At: "0c14d5b — repos=website; Round 1 sub-entry (CR-2 fix
  round), test-only over 32d10f7"` (record `799172ab`, APPROVED_WITH_COMMENTS by its commit subject).
- QA Phase 2: `qa/fix-api-secret-compare-qa.md`, `Verified-At: "0c14d5b — repos=website; refresh pass, test-only over 32d10f7
  (production byte-identical)"`, Status `QA Complete` (record `fc63b90e`).
- The release tip carries its own QA verdict: the per-chain verdict covers it only where the tip's tree is `0c14d5b`'s tree.

## Trees and refs (read by steering 18:2xZ)

- Website `/usr/local/bin/hooks/website`, checked out on `chain/fix-api-secret-compare` (head `0c14d5b`, no upstream), cut from
  `origin/master` `b68f94c`; `git ls-remote origin master` read `b68f94cda114…` at 18:2xZ. Porcelain: `?? .playwright-mcp/` only (not
  this chain's). Switching the tree back at release is yours.
- `website/.github/` holds `prompts/` only: no `workflows` directory. The determination's `release-move.js … --dry-run` (13:4xZ) said
  "workflows none"; re-run it at your tip.

## Decisions and carriers for your forward-item sweep

- Rulings: `/usr/local/bin/hooks/agent-output/steering/fix-api-secret-compare-rulings.md` — blocks 13:39Z (his three selections), 13:42Z
  (determination), 15:30Z (item 4 → new handoff), 18:01Z, 18:02Z; this chain has no plan or Decisions Register.
- QA register row **B-1** (post-deploy-observable, owner devops, carried by the handoff you create at Stage 1): `qa/fix-api-secret-compare-qa.md`
  L215, and its minting limit L217. Its limit: whether the hooks bot is in the agents' Discord test server is unchecked by every stage;
  QA asks that the check be shown to work on current production at Stage 1.
- Assumption Not Checked: `code-review/fix-api-secret-compare-code-review.md` § "Assumption Not Checked" (statbot-api sends single-message
  ids as plain decimals of at most 19 digits); `qa/fix-api-secret-compare-qa.md` § "Assumption Not Checked" (Vercel's Node runtime for
  Pages API routes provides `crypto.createHash('sha256')` and `timingSafeEqual`; the refresh's differential predicate). The fixer's
  document has none under that heading.
- Carriers the scoping block names: source `handoff/website-api-handler-hardening-2026-10-10.md` (b1fdd41a; items 2, 3, 5 discharged here,
  item 1 earlier) — steering closes it after the post-deploy reads, not you; `handoff/statbot-api-key-env-schema-2026-11-21.md`
  (c07b0565; item 4, its own trigger, untouched by this release).

## Hazards (each a candidate to re-derive)

1. Empty token (common part, hazard 1): production's `HOOKS_API_TOKEN` is unread by every stage. If it is empty or unset, Get JSON fails
   for every hooks-bot user from the deploy until he sets a token in Vercel or the release is reverted. His 13:39Z selection accepted
   this; your release ask states it, and how a revert would be done.
2. Reviewer's assumption: ids above 19 digits or in non-decimal form now answer 400 on `/api/v1/guilds/*/messages/*`. A post-deploy read
   of production 400s on that route, where an instrument you hold can read them; where none can, say so and queue it for him.
3. The fixer's **User-visible flows** list (`implementation/fix-api-secret-compare-implementation.md` § "User-visible flows", L194-205)
   is quoted to him with the release — in your release ask.
4. A command operand that is the bare word `none` (or a path ending `/none`) is refused by a hook today (`Secret-Files: none` in a header
   is read as a file named `none`); avoid one. If any call is refused, stop and message `steering-hooks`; never re-issue it in another
   form; the record says only "not completed".

## Routing

- Owner-needing items you are not asking him yourself, and spawn cues: SendMessage to `steering-hooks`.
- Your Stage 1 completion and your Stage 2 / post-deploy outcome: to `steering-hooks` by SendMessage (it closes the chain's documents).
- Your document under `deployment/`; evidence under `verification/fix-api-secret-compare/devops/`.
