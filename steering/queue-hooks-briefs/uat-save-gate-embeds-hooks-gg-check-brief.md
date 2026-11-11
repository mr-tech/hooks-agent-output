# Brief — `uat-fix-website-save-gate-embeds`: the Save-fix checks on hooks.gg, handed to an agent by the owner

Duties negated: the UAT document. This run writes no `uat/` document and gives no release decision
(the chain released at 10:13Z without a UAT stage, by its scoping determination); its record is the
handoff's changelog rows.

From `steering-queue-hooks`, composed 2026-11-11T21:03Z. Your session name is
`uat-fix-website-save-gate-embeds`, tmux category `fix-website-save-gate-embeds`, cwd
`/usr/local/bin/hooks/website`. `/usr/local/bin/hooks` is not a repository: `git -C <repo>` always.
The owner's word for this run is in `agent-output/steering/queue-hooks-rulings.md`, block
"2026-11-11T21:03Z" (his words verbatim there).

## Your work, and where it is written

Check 1 of `agent-output/handoff/save-gate-embeds-owner-checks-on-hooks-gg-2026-11-11.md`
(`Status: Open`; read by a helper of this thread at 20:5xZ, lines 17 to 34): the Save flows on
hooks.gg, as the test account, with its pass conditions and its falsifier for QA's Assumption Not
Checked (Pusher). `OWNER-QUEUE.md` item 1 words the same check as four steps; where the two
differ, the handoff governs. Check 2 (the live-database read) is not yours: no agent reads that
database.

Record each flow as a per-flow row (EXECUTED PASS / EXECUTED FAIL / NOT EXECUTED with the reason)
in the handoff's changelog, with the message ids you wrote and the build you observed. Do not
close the handoff or change its `Status`: this thread closes it on your rows. Your report is
delivered to this thread (`steering-queue-hooks`); owner-needing items and spawn cues come to it by
SendMessage.

## State at composition (re-derive at yours)

`git -C /usr/local/bin/hooks/website ls-remote origin master` read `395510e…` at 20:5xZ (the
helper's read): hooks.gg now serves, by the later release, the Save fix (`0e3d903`, an ancestor)
plus chain 016's send check. Which deployment Vercel serves was not read by anyone.
`agent-output/uat/closed/016-send-check-validity-uat.md` records how an earlier UAT session
reached hooks.gg as the test account and its draft 5996 (kept as another row's subject: do not
save over it).

## Hazards (this thread's analysis)

- The flow "a stored V2 message that carries only empty embeds" needs such a stored row. The
  fixed editor and both JSON load paths no longer produce one (rulings file, 09:04Z block), so on
  the test account it may not be constructible. If it is not, record NOT EXECUTED with what you
  tried; do not write to the database by any other route.
- Chain 016's send check now refuses V2 shapes Discord refuses (an unfilled component, a
  whitespace-only Text Display). A Send-page refusal for that reason is not this check's falsifier:
  use messages whose components are filled.
- The falsifier is observed in the saving tab itself. Record whether a second tab was open.

## Rules this thread adds (marked as steering's)

- **Production writes**: saves only of messages the test account itself creates for this check,
  on hooks.gg, as the flows require. Nothing else is written; no message is deleted that you did
  not create.
- **Discord sends**: none are required (the pass condition is the Send page accepting, not a
  send). If you do send, the agents' test server only, and delete the sent message.
- **Asks of the owner**: check `~/.claude/state/prompt-gate-off` first (absent at 21:02Z, `ls -d`).
  Absent: a selection prompt. Present: plain text, and end the turn.
- Permitted writes: the handoff's changelog rows, and captures under
  `agent-output/verification/fix-website-save-gate-embeds/hooks-gg-check/` (images stay
  uncommitted). No source commit, no branch switch, no push, no local build.

## Not checked by this brief

The handoff's body beyond the helper's quotation; whether the test account holds any V2 message
today other than 5996; the deployed build; the UAT definition beyond its post-deploy lines.
