# Brief — `fixer-fix-uat-local-stack-id-sequence`

Duties negated: the chain branch (your definition's): this chain's source is in the shared record
repository, so you commit on its `master` over the paths enumerated below and create no branch.

From `steering-queue-hooks`, composed 2026-11-11T19:41Z. Your session name is `fixer-fix-uat-local-stack-id-sequence`, tmux category
`fix-uat-local-stack-id-sequence`, cwd `/usr/local/bin/hooks/agent-output` (a git repository; `/usr/local/bin/hooks` is not).

## Determination and scope

The scoping determination is the block "2026-11-11T19:41Z — scoping determination: `fix-uat-local-stack-id-sequence`" in
`steering/queue-hooks-rulings.md`: read it first; it is your authority. The bounded scope
statement, from it: one defect. `tools/uat-local-stack.sh up` hands back a database whose
`"Messages_id_seq"` is restarted at 900000000000001, or fails. Background: `TODO.md`, the section
"`tools/uat-local-stack.sh` does not restart the message-id sequence"; the rule: `CLAUDE.md`,
"Local builds of `website` — before the first save".

**Permitted paths, whole:** `tools/uat-local-stack.sh`, `tools/uatLocalStack.test.js`,
`implementation/fix-uat-local-stack-id-sequence-implementation.md`. Nothing else is edited; this
fence governs over the TODO text where they differ. The repository is a shared tree: commit by
pathspec, read each file's diff before committing it, and leave every other modified or untracked
file alone (the uncommitted images under `verification/` and `steering/selection-ledger/` are
not yours).

One point is yours to settle inside scope and record as agent-authored: whether the restart also
runs after `--seed` (what the seed inserts was not read by this thread).

## Hazards (steering's, candidates for you to verify)

- A real `up` starts a Docker Postgres container. If you run one, bring it `down` and name it in
  your document; do not save through any website build.
- The suite is `node --test` on `tools/uatLocalStack.test.js` (976 lines by `grep -c ''`); the
  tool reads `ULS_*` variables (its lines 24 to 27), which the tests may use as seams.
- Cap any long run (lifecycle `SKILL.md`, Background work): the box has had out-of-memory kills
  today.

## Stage set (quoted from the determination)

> "Pipeline: `fixer`, then code review, the reviewer also running the tool's suite and the red
> test where the fix adds fewer than 20 production lines; QA Phase 2 above that. No plan, critic,
> Phase 1, UAT or devops"

## Delivery and return channel

Your report is your committed document with its `Handoff-At`; it is delivered to the code
reviewer. No reviewer session is live for this chain: send `steering-queue-hooks` a spawn cue by
SendMessage at handoff (address it by bare name; if two rows share it, use the live one's
`[ref]`). Owner-needing items and a `BLOCKED:` come to `steering-queue-hooks` the same way.
Asks of the owner: a selection prompt unless `~/.claude/state/prompt-gate-off` exists; then plain
text, put again as a prompt once the flag is gone.

## Architecture record

`architecture/system-architecture.md`; nothing in it was checked for this tool.

## Not checked by this brief

The tool's body beyond the lines named; the test file; the seed file; whether Docker and the
Postgres image are usable after today's restart; which chain added the tool.
