# Brief — qa-fix-website-save-gate-embeds

Duties negated: none.

From `steering-queue-hooks`, 2026-11-11T09:42Z. You are the session
`qa-fix-website-save-gate-embeds`, launched in `/usr/local/bin/hooks/website`, started on the code
reviewer's spawn cue.

## What you verify

QA Phase 2 of the fixer chain `fix-website-save-gate-embeds`, on the code review's approval:

- `/usr/local/bin/hooks/agent-output/code-review/fix-website-save-gate-embeds-code-review.md`,
  agent-output commit `5849cb7`. Copied at 09:41Z from its header: `Verdict: APPROVED_WITH_COMMENTS`,
  `Reviewed-At: 963a25c — repos=website`.
- `/usr/local/bin/hooks/agent-output/implementation/fix-website-save-gate-embeds-implementation.md`,
  agent-output commit `d89d629`. Copied at 09:41Z from its header: `Handoff-At: 963a25c — repos=website`.
- Branch `fix/website-save-gate-embeds`; base `6d78b19` (the remote's `master`).

## Stage set

A fixer chain: no plan, critic, Phase 1 or UAT. From the scoping determination
(`agent-output/steering/queue-hooks-rulings.md`, block "re-checks at website `6d78b19` and the
scoping determinations", paragraph "Held item 4"): "Pipeline: `fixer`, then code review; QA Phase 2
only if the fix adds 20 or more production lines." What changed it: the fix now adds 44 production
lines against `6d78b19` (`git diff --numstat 6d78b19 963a25c -- src`, tests excluded, summed by this
thread at 09:36Z), so Phase 2 is owed. This is a post-implementation audit by design of the route;
your definition says how to declare that.

## The scope the fix is judged against

Three rulings-file blocks, in order; later ones extend earlier ones. Read them at the file, not here:

- "2026-11-11T09:04Z — code review round 1 REJECTED; CR-1 decided": the revised bounded scope
  statement and its limits.
- "2026-11-11T09:23Z — selection 15": the owner's selection that the choice save joins the fix, and
  the extended scope statement.
- "2026-11-11T09:27Z — fixer BLOCKED on the editor's mode after a Classic choice": this thread's
  ruling that the editor's mode follows the stored data.

## What to read beside the code

- `agent-output/architecture/website.md` W-1, W-2 and A-4; `agent-output/architecture/system-architecture.md` D-005.
- `/usr/local/bin/hooks/CLAUDE.md`, Test Conventions.
- `agent-output/handoff/save-originating-tab-raises-its-own-update-prompt-2026-08-25.md` (its
  trigger fired on this work; its limb (d) is not this fix's to close).

## What the reviewer routed to you (pointers; re-derive each at the document)

The code-review document's section "INFO, Round 1 sub-entry 2" (two items) and its "Assumption Not
Checked" (two items, both naming QA Phase 2 as owner). Both assumptions need a browser against a
running build: the save-time choice dialog was never driven, and whether the saving client receives
its own update event was never observed.

## Hazard analysis (this thread's; candidates, none a finding until you derive it)

- **A local build can reach the real database.** A dated measurement, not re-read today:
  `agent-output/verification/013/probe-cr14-env-precedence/` (2026-08-24) found the one selectable
  `DATABASE_URL` in the website's `.env.local` to be the remote hosted database. A browser save is
  a write. Establish what your running build is connected to before the first save, and do not save
  against the production database. That file holds credentials: key names only, values never
  printed. If you lack a non-production database, the lifecycle skill's standing default applies (a
  local environment is built on this box, not asked for).
- **The update event travels through Pusher.** Whether a local build publishes to the same Pusher
  app production clients listen on is unread by this thread. Establish it before a browser save.
- The fix changes shipped behaviour on the choice-dialog path: after a choice the editor holds what
  was stored, and after "Save as Classic" it switches to Classic mode. Read from the rulings blocks
  above and the reviewer's model; not run by anyone in a browser.
- The row-D shape (V2 flag, classic content, no V2 components) is outside this fix by plan 013 D19;
  rulings file, block "fixer handoff received", item 1.
- Discord sends, if any check needs one: the agents' test server only (global `CLAUDE.md`,
  "Outbound messages").

## Carried past you, not yours

The owner's live-database read and his own check of the user-visible flows are carried to the
release step (rulings file, block "fixer handoff received", item 2).

## Delivery

Your consuming stage on a PASS is devops. If no devops session is live when you deliver, send your
spawn cue to `steering-queue-hooks` by SendMessage. A defect goes to
`fixer-fix-website-save-gate-embeds`. An owner-needing item goes to `steering-queue-hooks`.

## Not checked by this brief

- The diff at `963a25c`, the tests, the suite, and every capture under
  `agent-output/verification/fix-website-save-gate-embeds/`: none read or run by this thread, except
  `code-review-round1-subentry/save-echo-hash.txt`.
- Whether a browser walk of this build is possible on this box today.
- The `.env.local` and Pusher premises above: neither re-read today.
