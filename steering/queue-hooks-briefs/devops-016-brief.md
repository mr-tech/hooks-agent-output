# Brief — `devops-hooks-016` (release of chain 016, send-check validity)

Duties negated: none

From `steering-queue-hooks`, composed 2026-11-11T14:16Z, on UAT's spawn cue. Your session name is
`devops-hooks-016`, tmux category `S016-sendcheck`, cwd `/usr/local/bin/hooks/website`.
Repositories: `/usr/local/bin/hooks/website` (source) and `/usr/local/bin/hooks/agent-output`
(record). `/usr/local/bin/hooks` is not a repository: `git -C <repo>` always.

## The owner's word, and what it does not cover

His selections opened and shaped this chain: `agent-output/steering/queue-hooks-rulings.md`
(read it whole), chiefly selections 14, 17 to 20, 21, 22 and 23, and the plan's Decisions
Register. **Nothing he has said names a merge or a push of this chain.** UAT's approval buys your
Stage 1 local commit only. The production push is your own Phase 2B ask to him, in your session;
nothing in this brief or from steering stands in for his answer.

**Blocking prompts are off** while `~/.claude/state/prompt-gate-off` exists (`ls -d`, present at
14:14Z). Check the flag before any ask of him; while it exists, ask in plain text (the question,
the options with who acts, your recommendation) and end the turn.

## Stage set (quoted from the scoping determination, rulings block "2026-11-11T09:17Z")

> "Pipeline: full chain. Planner, critic, architect conformance, QA Phase 1, implementer with a
> deweeder, code review, QA Phase 2, UAT, devops, retrospective."

No register row has changed it. Security was not started: "the chain ships nothing root executes"
(same block). Milestone M1 is capped (blocks 12:59Z and 13:00Z; plan R-11, R-12).

## Start

- Predecessor: `agent-output/uat/016-send-check-validity-uat.md`, `Status: UAT Complete`,
  `Release-Decision: APPROVED FOR RELEASE`, `Verified-At: "395510e — repos=website; plan revision
  7; flows run on a next dev build of a git archive export of 395510e, base control 0e3d903"`
  (copied 14:15Z from its header at record `ceb9d93`).
- QA: `agent-output/qa/016-send-check-validity-qa.md`, `Verified-At: "395510e — repos=website;
  Phase 2 verdict PASS at chain/016-send-check-validity, plan revision 7"` (record `2af91e5`).
- Code review: `Reviewed-At: "395510e — repos=website; Round 1 at ee114ff, its fix sub-entry at
  395510e"` (`agent-output/code-review/016-send-check-validity-code-review.md`, record `892daad`).
- Plan: `agent-output/planning/016-send-check-validity.md`, `Revision: 7`, `Status: UAT Approved`
  (R-17, record `605ad1d`).

## Tree, and what a push of website `master` triggers

At 14:14Z: website on `chain/016-send-check-validity` at `395510e`; one untracked path,
`.playwright-mcp/`, another session's, left in place. `git ls-remote origin master` read
`0e3d903ce98e108c7ca848b992ad89ac538f4b44`. `release-move.js /usr/local/bin/hooks/website master
395510e97f82a5177d5edbb38b5d44858f745f3d --dry-run`: exit 0, "ff-from-remote ok; sibling serving
refs (none)", "workflows none — /usr/local/bin/hooks/website/.github/workflows absent". That a
push of `master` goes live through Vercel is the statement of earlier deployment records (most
recently `agent-output/deployment/closed/fix-website-save-gate-embeds-deployment.md`), not
re-read by this thread now. Re-derive both at your own composition.

The release-tip QA verdict is yours to judge: where the tip's tree is not `395510e`'s tree, it
needs its own. `qa-hooks-016` is live and was cleared at 13:50Z; its Resumption State is in its
document at record `500a501`, and a message to it names that state.

## Carried to you by name

1. **Post-deploy rows B-3, B-4 and B-6** (QA's register, QA document lines 353 to 358; UAT's
   register table in its document): for your Stage 1 handoff record and the scheduled reader it
   names. Executor per the rows: the UAT stage, the owner as fallback only. `uat-hooks-016` is
   live.
2. **UAT-1 LOW**: B-6(b) is judged on the red border; the "41 components" line falls outside the
   192×224 crop. Its subject is the test account's hooks.gg message 5996: re-save it after the
   deploy, then read its new image.
3. **QA's routed assumption**: production runtimes judge whitespace as Node 24 does. The deployed
   Node major is your read.
4. **Reconciliation**: the architect's AF-4 clause for `agent-output/architecture/website.md`
   lands at your reconciliation (`agent-output/architecture/016-send-check-validity-architecture-findings.md`).
5. **Handoffs**: `components-v2-emptiness-not-caught-by-the-send-gate-2026-08-26.md` closes on
   B-3's fixed read (plan M3). Opened by this chain and staying open:
   `send-check-validity-excluded-toast-and-file-upload-2026-11-11.md`,
   `editor-error-lines-render-text-unasserted-2026-11-11.md`.
6. **For his release ask, behaviour that changes** (UAT's "Key Changes for Changelog", its lines
   102 to 105), including the stored `valid` flag and the public v1 API value; plan RK-3 and RK-5
   are the stated limits for stored rows and old preview images.

## Delivery and return channel

After Stage 1 your document is the record; an owner-needing item other than your own release
ask, or a spawn cue, goes to `steering-queue-hooks` by SendMessage. After the release, close-out
and the retrospective are this thread's.

## Architecture record

`agent-output/architecture/system-architecture.md`, `agent-output/architecture/website.md`.

## Not checked by this brief

The diff `0e3d903..395510e`; the suite at the tip; whether Vercel's integration is connected;
`vercel.json`; the handoffs' bodies named in item 5; the AF-4 text; whether the plan names a
version or changelog artefact beyond UAT's "No version artefact (plan M3)".
