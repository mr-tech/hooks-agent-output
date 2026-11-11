# Brief — `code-reviewer-fix-uat-local-stack-id-sequence`

Duties negated: none

From `steering-queue-hooks`, composed 2026-11-11T19:51Z, on the fixer's spawn cue. Your session name is
`code-reviewer-fix-uat-local-stack-id-sequence`, tmux category `fix-uat-local-stack-id-sequence`, cwd `/usr/local/bin/hooks/agent-output` (a git
repository; `/usr/local/bin/hooks` is not). The chain's source is in this shared record
repository on `master`: there is no chain branch, and the tree carries other sessions' files.

## Start

Predecessor: `implementation/fix-uat-local-stack-id-sequence-implementation.md`, Status: Active, Handoff-At: 71b61b9 — repos=agent-output; round 1 at 1fee252, not reviewed (copied 2026-11-11T19:51Z from its header; the file is clean against `HEAD`).
Base: `68d737f`. The fixer's first handoff, `1fee252`, was not reviewed; you review one tree.

## Stage set and scope

The scoping determination and its re-scope are two blocks of `steering/queue-hooks-rulings.md`:
"scoping determination: `fix-uat-local-stack-id-sequence`" and "`fix-uat-local-stack-id-sequence` re-scoped by this thread" (19:48Z). Read both; they
are the scope. Quoted from the first:

> "Pipeline: `fixer`, then code review, the reviewer also running the tool's suite and the red
> test where the fix adds fewer than 20 production lines; QA Phase 2 above that. No plan, critic,
> Phase 1, UAT or devops"

The fixer counts 11 code lines and 4 header lines added to the tool since `68d737f` (its claim;
`git diff --numstat 68d737f 71b61b9 -- tools/uat-local-stack.sh` is the instrument). Under 20,
you also run `node --test tools/uatLocalStack.test.js` and the red runs the fixer names (the
`68d737f` tool and the `1fee252` tool, each against the test file at `71b61b9`); at 20 or more,
say so in your verdict and QA Phase 2 follows.

**Chain paths (the permitted set):** `tools/uat-local-stack.sh`, `tools/uatLocalStack.test.js`,
`verification/015/upload-dialog/seed.sql`, `verification/fix-uat-local-stack-id-sequence/`, and the fixer's document. A
change outside them in `68d737f..71b61b9` by the fixer is a finding; other sessions' commits in
that range (steering's, chain 016's retrospective) are not the fixer's.

## Hazards (steering's, candidates for you to verify)

- The rule the fix serves: `CLAUDE.md`, "Local builds of `website` — before the first save". The
  property to hold: after `up`, with or without `--seed`, no stored "Messages" id is below
  900000000000001 and the sequence is restarted there, or `up` fails.
- Whether the guard after the seed can pass vacuously (an empty table, a query that errors into
  success), and whether the restart runs on a re-used container as well as a new one.
- The fixer left `verification/015/uat/b14-fresh-message.js` unchanged (a comment names message
  1; by its read the script does not use this seed).
- A real `up` starts a Docker Postgres container: bring it `down`, cap long runs (lifecycle
  `SKILL.md`, Background work), and save through no website build.

## Delivery and return channel

Your verdict, with `Reviewed-At`, in your committed document. On a rejection it is delivered to
`fixer-fix-uat-local-stack-id-sequence` (live). On approval, or for any owner-needing item, send `steering-queue-hooks` one
message by SendMessage (bare name; the live row's `[ref]` if two share it): this thread closes
the chain, and starts QA only at 20 lines or more.

## Architecture record

`architecture/system-architecture.md`; nothing in it was checked for this tool.

## Not checked by this brief

The diff's content; the suite; the fixer's captures; the seed's other rows; Docker's state.
