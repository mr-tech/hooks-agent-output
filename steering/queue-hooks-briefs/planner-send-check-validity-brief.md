# Brief — planner-hooks-new (the send-check validity chain)

Duties negated: none.

From `steering-queue-hooks`, 2026-11-11T10:19Z. You are the session `planner-hooks-new`, launched in
`/usr/local/bin/hooks/website`. Repositories: `/usr/local/bin/hooks/website` (source) and
`/usr/local/bin/hooks/agent-output` (record). `/usr/local/bin/hooks` is not a repository:
`git -C <repo>` always.

## Your start

The scoping determination, in `agent-output/steering/queue-hooks-rulings.md`, block
"2026-11-11T09:17Z — scoping determination: the send-check validity fix (owed by selection 14)".
The owner's word opening the chain is the block before it, "selection 14: one send-check fix, 1024
included" (his selection, with the option text he chose). Read the whole rulings file before your
first act; several later blocks bear on this work (selection 16 on local builds; the close-out of
the chain that just released).

You mint the ID. When you have, send it to `steering-queue-hooks`: this thread then renames your
session. The tmux category you were started under, `S016-sendcheck`, anticipates the record's
`.next-id` (16 at 10:18Z) and binds nothing.

## Stage set

Quoted from the determination: "Pipeline: full chain. Planner, critic, architect conformance, QA
Phase 1, implementer with a deweeder, code review, QA Phase 2, UAT, devops, retrospective."
Security is not started, on the stated premise that the chain ships nothing root executes.

## What changed after the determination was written

- The chain `fix-website-save-gate-embeds` released at website `0e3d903` (10:13Z); remote `master`
  is `0e3d903` (`git ls-remote origin master`, 10:16Z). The determination's reads were at `6d78b19`.
  That release changed the save gate (`src/utils/index.ts`, `useApiMethods.ts`, three callers), not
  the send check; whether it moved anything the determination cites is yours to re-read. Its
  record: `agent-output/deployment/closed/fix-website-save-gate-embeds-deployment.md`.
- `release-move.js /usr/local/bin/hooks/website master 0e3d903… --dry-run`, 10:18Z: exit 0,
  "ff-from-remote ok", "workflows none".
- `agent-output/CLAUDE.md` gained a section, "Local builds of `website` — before the first save"
  (his selection 16). It binds any walk this plan designs.
- One open handoff is new and touches the save and send pages:
  `agent-output/handoff/save-gate-embeds-owner-checks-on-hooks-gg-2026-11-11.md` (his own checks).

## Inputs the determination names

- `agent-output/research/closed/components-v2-send-validity-2026-11-11.md` (the measured class).
- `agent-output/research/closed/components-v2-description-text-limit-2026-11-11.md` (the 1024 bound).
- `agent-output/handoff/components-v2-emptiness-not-caught-by-the-send-gate-2026-08-26.md` (this
  chain is the fix it waits on).
- `agent-output/handoff/newmessagemodal-persist-gate-choice-unreachable-2026-08-27.md` and
  `agent-output/handoff/backfill-valid-guard-has-no-db-backed-instrument-2026-08-26.md`: named by
  the determination as unread by this thread; their disposition against this plan is yours.
- Architecture: `agent-output/architecture/system-architecture.md`,
  `agent-output/architecture/website.md` (W-1, W-2, A-4; A-4's "consequence a change must carry"
  binds this plan).

## Standing rulings that bear on the plan (pointers)

- New feature work waits until the project's existing items are done: rulings file, selections 1
  to 4, prompt 2. The determination reads the File component's upload path and its removal from the
  add menu as such work.
- No agent reads the production database, and Discord sends happen in the agents' test server only
  (global `CLAUDE.md`, "Outbound messages").
- The roadmap is absent for this workspace by the owner's standing instruction; do not raise it.

## Delivery

Your consuming stages are the critic and the architect's conformance pass. No session for either is
live for this chain: send a spawn cue to `steering-queue-hooks` by SendMessage when revision 1 is
committed. `OPEN QUESTION` items, revision 1's Exclusions register and any scope delta go to
`steering-queue-hooks`, which puts them to the owner.

## Not checked by this brief

- The website's send page beyond the one caller line; how sibling per-field limits are shown in the
  editor today; whether the website edits already-sent messages (the research document's F-10, N-5).
- The research documents' Evidence tables.
- Whether `0e3d903` changed any line the determination cites in `src/utils/limits.tsx` (the
  release's `--numstat` lists no such file, by the deployment record; not re-run by this thread).
- `preview-image-generator`: not read; a repository-wide grep there is refused by the secret-file
  gate (its workflow file is flagged). Use a pathspec that avoids that file and disclose any refusal.
