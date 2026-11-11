# Brief — `uat-hooks-016` (UAT for chain 016, send-check validity)

Duties negated: none

From `steering-queue-hooks`, composed 2026-11-11T13:50Z. Your session name is `uat-hooks-016`,
tmux category `S016-sendcheck`, cwd `/usr/local/bin/hooks/website`. Your stage starts on QA's
committed document; this brief adds only what that record lacks.

## Start

- Predecessor: `agent-output/qa/016-send-check-validity-qa.md`, `Status: QA Complete`,
  `Verified-At: "395510e — repos=website; Phase 2 verdict PASS at chain/016-send-check-validity,
  plan revision 7"` (copied 13:49Z from that document's header at record `2af91e5`).
- Plan: `agent-output/planning/016-send-check-validity.md`, `Revision: 7`, `Status: QA Complete`
  (record `b10b0f2`). Milestones M1, M1b, M2, M3. Read its Decisions Register and
  `agent-output/steering/queue-hooks-rulings.md` (the owner's selections 14 and 17 to 23) before
  your first act.
- The website tree is on `chain/016-send-check-validity` at `395510e` (`git rev-parse`, 13:49Z);
  one untracked path, `.playwright-mcp/`, is another session's and stays.

## Stage set (quoted from the scoping determination, rulings block "2026-11-11T09:17Z")

> "Pipeline: full chain. Planner, critic, architect conformance, QA Phase 1, implementer with a
> deweeder, code review, QA Phase 2, UAT, devops, retrospective."

No register row has changed it. Milestone M1 is capped (rulings blocks 12:59Z and 13:00Z; plan
R-11, R-12): a gap below HIGH on M1 goes to the plan's Planner batch as a stated limit, with no
revision and no round.

## Blocking release conditions that travel to you by name

QA's register, rows B-1 to B-6, in the QA document (lines 353 to 358 at record `2af91e5`):
- **B-1, B-2, B-5**: observable pre-release, on a local build of the chain tip. Yours to execute
  and record in this pass.
- **B-3, B-4, B-6**: post-deploy, on hooks.gg, after devops's release. They stay open through this
  pass; their rows name the UAT stage with the owner as fallback.

## Rules this thread adds (marked as steering's)

- **Local build, before the first save**: `agent-output/CLAUDE.md`, section "Local builds of
  `website` — before the first save". Restart `"Messages_id_seq"` at 900000000000001 after the
  schema is pushed and before any save, and record the id range your walk wrote. `TODO.md` records
  that `tools/uat-local-stack.sh` does not do this for you. `.env.local` holds credentials: key
  names, hosts and ports only.
- **Discord sends**: the agents' test server only (global `CLAUDE.md`, "Outbound messages").
- **Blocking prompts are off** while `~/.claude/state/prompt-gate-off` exists (`ls -d`, present at
  13:49Z). Check the flag before any ask of the owner; while it exists, ask him in plain text
  (the question, the options with who acts, your recommendation) and end the turn.
- Permitted writes: your UAT document under `agent-output/uat/`, your captures under
  `agent-output/verification/016/`, and your row in the plan through `plan-row-commit.js`. No
  source commit, no branch switch, no push.

## Delivery and return channel

- Your report is delivered to devops, the consuming stage, by SendMessage. Where no devops session
  for this chain is live at delivery (`ListAgents`), send this thread a spawn cue instead.
- Owner-needing items and spawn cues come to `steering-queue-hooks` by SendMessage. A status
  report belongs in your document, not in a message.

## Architecture record

`agent-output/architecture/system-architecture.md` (the Problem Area "Validation errors render
into generated preview images") and `agent-output/architecture/website.md` (W-1, W-2, A-4); the
chain's findings are `agent-output/architecture/016-send-check-validity-architecture-findings.md`.

## Hazard-bearing analysis (steering's, candidates for you to verify)

- QA's routed assumption: production runtimes judge whitespace as Node 24 does. B-1 in a real
  browser covers the browser half; the deployed Node major is devops's read.
- B-1's `/preview` render is a record, not a pass condition (its row).
- Preview images generated before release keep their error lines until the message is saved again
  (plan RK-5, a stated limit).

## Not checked by this brief

The QA document's Phase 2 results body beyond its header, register rows and line 443; whether a
local stack is already running; the state of `tools/uat-local-stack.sh` today; the plan's
criteria text for M1b, M2 and M3 at revision 7.
