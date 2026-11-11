# Brief — `uat-hooks-016`, post-deploy reads for chain 016 (fresh session after a machine restart)

Duties negated: none

From `steering-queue-hooks`, composed 2026-11-11T18:32Z, on devops's spawn cue. Your session name is
`uat-hooks-016`, tmux category `S016-sendcheck`, cwd `/usr/local/bin/hooks/website`. The machine
restarted at 17:27; the earlier `uat-hooks-016` session is gone and nothing of its context
survives. `/usr/local/bin/hooks` is not a repository: `git -C <repo>` always.

## Your work, and where it is written

The three post-deploy rows B-3, B-4 and B-6 of chain 016, on hooks.gg as the test account. The
carrier is the whole instruction: `agent-output/handoff/send-check-validity-post-deploy-2026-11-11.md`
(`Status: Open`, `Owning-Stage: uat`; read whole by this thread at 18:32Z at record `4eebb56`).
It gives each row's condition, instrument, prediction, recorded unfixed value and failure mode,
the whitespace falsifier, and how the rows close. Your Resumption State is your closed document,
`agent-output/uat/closed/016-send-check-validity-uat.md` (record `ceb9d93`): read it for how you
reached draft 5996 and the test-server webhook.

## State at composition (re-derive at yours)

At 18:32Z: `git -C /usr/local/bin/hooks/website ls-remote origin master` read
`395510e97f82a5177d5edbb38b5d44858f745f3d`; the tree is on `master` at that commit;
`agent-output/deployment/closed/016-send-check-validity-deployment.md` reads `Status: Released`,
pushed 18:29:46Z. Whether Vercel has finished building that commit is not read: the handoff says
to read again before calling an unfixed value a failure.

## Rules this thread adds (marked as steering's)

- **Discord sends**: the agents' test server only (global `CLAUDE.md`, "Outbound messages"); B-4's
  send goes to the test bot's webhook there and the sent message is deleted afterwards.
- **Production is read and saved only as the handoff's rows say**: B-3 no Save and no Send; B-6 one
  re-save of the test account's own message 5996. Nothing else is written on hooks.gg.
- **Asks of the owner**: check `~/.claude/state/prompt-gate-off` first (absent at 18:32Z, `ls -d`).
  Absent: a selection prompt. Present: plain text, and end the turn. His ruling of today (rulings
  file, the block after 17:33Z): an ask put as text is put again as a prompt once the flag is gone.
- Permitted writes: the handoff's changelog rows, and your captures under
  `agent-output/verification/016/` (images stay uncommitted). No source commit, no branch switch,
  no push.

## Delivery and return channel

When all three rows are read, one message to `devops-hooks-016` (live at 18:32Z; a stale offline
row shares its name, so address the live one by the `[ref]` `ListAgents` prints), as the handoff
says. Where no devops session is live at delivery, send `steering-queue-hooks` a spawn cue
instead. A falsifier, or any other owner-needing item, comes to `steering-queue-hooks` by
SendMessage at once.

## Architecture record

`agent-output/architecture/system-architecture.md`, `agent-output/architecture/website.md`.

## Not checked by this brief

Whether the test account's browser session survived the restart (the `discord-test-browser`
skill); whether production serves `395510e` yet; the UAT document's body; message 5996's present
state.
