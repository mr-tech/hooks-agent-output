# Brief — `devops-hooks-016`, respawned after a machine restart (release of chain 016)

Duties negated: none

From `steering-queue-hooks`, composed 2026-11-11T17:33Z. The machine restarted (boot 2026-11-11
17:27); the earlier `devops-hooks-016` session is gone and you are a fresh session under the same
name, tmux category `S016-sendcheck`, cwd `/usr/local/bin/hooks/website`. Nothing of the earlier
session's context survives: rebuild from the record. `/usr/local/bin/hooks` is not a repository:
`git -C <repo>` always.

## Where the record stands (your Resumption State)

Your deployment record carries no Resumption State section; its own body is the state:
`agent-output/deployment/016-send-check-validity-deployment.md`, `Status: Active`, last commit
`86d16b8` (read whole at 17:32Z). Stage 1 is committed (record `436a30a`), Phase 2A readiness and
the Phase 2C block are written, runbook steps 1 and 2 were run before the ask, and steps 3 to 7
read "pending". Its "User Confirmation" section reads "Pending". Whether the owner answered the
ask the earlier session put in its pane is not on record; treat it as unanswered.

Read first, in this order: the first brief, `agent-output/steering/queue-hooks-briefs/devops-016-brief.md`
(it still governs, with the changes below); `agent-output/steering/queue-hooks-rulings.md` whole;
your deployment record whole.

## Your next act

Re-derive runbook steps 1 and 2 at the mechanism, then put the Phase 2B release ask to the owner
in this session. **Nothing he has said names a merge or a push of this chain**; nothing in this
brief or from steering stands in for his answer.

**Blocking prompts are off** while `~/.claude/state/prompt-gate-off` exists (`ls -d`, present at
17:31Z). Check the flag before the ask; while it exists, ask in plain text (the question, the
options with who acts, your recommendation) and end the turn.

## What differs from the first brief

- No other session of chain 016 is live (`ListAgents`, 17:31Z: every `*-hooks-016` row offline).
  The first brief's "`qa-hooks-016` is live" and "`uat-hooks-016` is live" no longer hold. Runbook
  step 7's cue to UAT goes to `steering-queue-hooks` as a spawn cue; this thread starts
  `uat-hooks-016` fresh on it. The same route for QA if you need a release-tip verdict again.
- Item 4 of the first brief (the architect's reconciliation) is discharged by your record's own
  changelog row of 14:25Z (record `ab14544`).

## Reads at composition (re-derive at yours)

At 17:32Z: website on `chain/016-send-check-validity` at
`395510e97f82a5177d5edbb38b5d44858f745f3d` (`git rev-parse HEAD`); `git status --porcelain` shows
only `.playwright-mcp/`; `git ls-remote origin master` read
`0e3d903ce98e108c7ca848b992ad89ac538f4b44`; `release-move.js /usr/local/bin/hooks/website master
395510e97f82a5177d5edbb38b5d44858f745f3d --dry-run` exit 0, "ff-from-remote ok; sibling serving
refs (none)", "workflows none — /usr/local/bin/hooks/website/.github/workflows absent".

## Delivery and return channel

Your document is the record. An owner-needing item other than your own release ask, or a spawn
cue, goes to `steering-queue-hooks` by SendMessage. A stale registry row shares each chain
session's name; address this thread by its bare name.

## Architecture record

`agent-output/architecture/system-architecture.md`, `agent-output/architecture/website.md`.

## Not checked by this brief

Whether the local build at the tip still passes after the restart; whether any process of the
earlier session left state in the website tree beyond `git status`; the release-tip QA document's
body; the post-deploy handoff's body; whether Vercel's integration is connected.
