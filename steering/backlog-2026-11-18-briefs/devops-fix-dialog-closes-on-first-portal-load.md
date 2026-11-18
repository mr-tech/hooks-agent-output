# Brief — devops-fix-dialog-closes-on-first-portal-load

Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-dialog-closes-on-first-portal-load-brief-common.md`
(determination, stage set, prohibitions, hazards 1 to 5). Read it before your first act.

From `steering-roadmap`, 2026-11-18. You are the session `devops-fix-dialog-closes-on-first-portal-load`,
launched in `/usr/local/bin/hooks/website`.

## Your start

The code reviewer's committed document:
`/usr/local/bin/hooks/agent-output/code-review/fix-dialog-closes-on-first-portal-load-code-review.md`,
agent-output `6016a46`. Anchor, copied from its header at 22:29Z: `Reviewed-At: "1ad625e — repos=website"`,
`Verdict: APPROVED_WITH_COMMENTS`, Round 1. No QA Phase 2 on this route (6 production lines; the
reviewer ran the suite and the red test — its document's statement).

## The release

- End step: website `master`, production through Vercel. A push of `master` triggers no GitHub
  workflow (`release-move.js /usr/local/bin/hooks/website master 1ad625e2161b58c5f870c9db369f4056df690a03
  --dry-run`, this thread, 22:29Z: exit 0, "ff-from-remote ok; sibling serving refs (none)",
  "workflows none — … .github/workflows absent"). That Vercel deploys on a push of `master` is the
  record's statement from earlier releases (`steering/queue-hooks-rulings.md` line 142), not re-read.
- **The push needs the owner's word, asked in your own session** (your Phase 2B ask). Quote the
  fixer's **User-visible flows** list to him with it, from
  `agent-output/implementation/fix-dialog-closes-on-first-portal-load-implementation.md`, section
  "User-visible flows" — the scoping determination's End clause requires it.
- Switching the shared website tree back after release is yours (global `CLAUDE.md`, Shared working
  trees). Chain 017 takes the tree after you: tell `steering-roadmap` when the tree is back on
  `master`, clean.

## Forward items for your record's sweep

- Rulings: `agent-output/steering/fix-dialog-closes-on-first-portal-load-rulings.md` (the
  determination at 21:59Z; the branch cut; the handoff block at 22:22Z).
- Assumption Not Checked: the code review, heading "Assumption Not Checked", Round 1 — a real
  browser keeps the dialog open on its first portaled popover. Its owner is **your production look
  after the Vercel deploy**: on a fresh page load of hooks.gg, "new message" → "Upload Message" →
  open "Save To"; the dialog stays open (falsity: it vanishes, or the page flashes to the loading
  dots). An open tab keeps the old bundle, so the look is a fresh load. The look is an agent's, as
  the test account, through the `discord-test-browser` skill; Discord-visible output follows the
  common part's "Outbound messages" quote. The fixer's document has no Assumption Not Checked
  heading.
- Carriers named by the determination and its round: the handoff this chain discharges,
  `agent-output/handoff/upload-message-dialog-closes-on-first-portal-load-2026-11-08.md` (closes on
  the production look's pass); the reviewer's new non-blocking handoff,
  `agent-output/handoff/anchored-popover-first-load-test-is-order-dependent-2026-11-18.md` (CR-1
  MEDIUM, stays open).
- Hazard lines from the sweep's uncovered regions that the release exercises: which SHA Vercel serves
  after the push is unread until your look (common part, hazard 5); `Navigation`'s dialog host was
  not visible to the sweep, so the top-bar menus are part of the look where the flows list names
  them.

## Delivery

Your record's consuming reader is `steering-roadmap`; owner-needing items, a refusal of any act and
the tree's hand-back come by SendMessage. The production push is asked of the owner in your session.

## Not checked by this brief

The review's body beyond its header, Assumption Not Checked and routing lines; the reviewer's suite
run; Vercel's project settings (chain 017 has an open question on them, unrelated to this release).
