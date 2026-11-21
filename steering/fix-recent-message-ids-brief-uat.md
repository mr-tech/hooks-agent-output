Duties negated: the UAT stage document and release decision (this chain's stage set has no UAT; you read one post-deploy row only).

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-recent-message-ids-brief-common.md` — read it whole first.

You are `uat-fix-recent-message-ids`, started for one post-deploy row: P-2 of
`/usr/local/bin/hooks/agent-output/handoff/fix-recent-message-ids-post-deploy-2026-11-21.md` (UUID c3c76c16, Owning-Stage uat). Its
trigger fired: website `master` was pushed `76da25c` → `6f76c6d` at 2026-11-21T06:45:05Z (devops's message; `git ls-remote origin
master` read back `6f76c6de…` by this thread). The row's instrument, prediction and falsifier are in the handoff; the ruling it serves
is block 2026-11-21T06:27Z of `steering/fix-recent-message-ids-rulings.md`.

- Make the read on hooks.gg as the Discord test account (the `discord-test-browser` skill), read only: no save, no send, no message
  edit or delete on production. Record the result in the handoff's P-2 row, its Status and a changelog row, and close the handoff per
  the record-closure skill where the row is terminal. Screenshots stay untracked.
- A falsified prediction, or a read you cannot make, goes to `steering-hooks` by SendMessage before anything else; it is owner-needing.
- Your completion cue (the row's result and the handoff's commit) goes to `steering-hooks` and to `devops-fix-recent-message-ids` by
  SendMessage.
