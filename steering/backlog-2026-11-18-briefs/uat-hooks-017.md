# Brief — uat-hooks-017

Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/017-brief-common.md`. Read it whole before your first
act. Its 2026-11-19T07:24Z update replaces its branch sentences, and it quotes the local-build rule (move message ids
to `900000000000001` before the first save) and "Outbound messages".

From `steering-roadmap-hooks`, 2026-11-19T09:0xZ. You are the session `uat-hooks-017`, tmux category
`S017-backlog`, launched in `/usr/local/bin/hooks` (not a repository: use `git -C <repo>` always).

Stage set, quoted from the determination (`steering/backlog-2026-11-18-rulings.md` block 21:59Z):
"Planner, critic, architect conformance, QA Phase 1, implementer, code review, QA Phase 2, UAT,
devops, retrospective. **Security** on the preview-image-generator delta before release … Analyst:
only where the plan commissions one." Rider M8 was added in block 04:50Z of `steering/017-rulings.md`.

## Stage start

QA's plan-level verdict is in `qa/017-existing-items-backlog-qa.md`, at agent-output `1a8edce`, with Status `QA Complete` and
`Verified-At: "4b8db9c,8512a1d — repos=website,preview-image-generator; …"` (copied from that field at
composition). The plan is `planning/017-existing-items-backlog.md`, Revision 8, with QA's R-47 at `4c49b11`. The shared trees read at
composition (`git -C <repo> rev-parse --short HEAD`, `branch --show-current`): website `4b8db9c` and
generator `8512a1d`, both on `chain/017-existing-items-backlog`. Re-derive these before you rely on them.

## Your work

Your work is UAT per your definition, on plan 017 at those two SHAs. The pre-release rows for you are those in QA's blocking-condition
register (`qa/017-existing-items-backlog-qa.md`, the B-rows table): **B-1, B-2, B-3, B-4** (its rig is
`verification/017/m5-rig/`), **B-12** and **B-13**. B-6 is a post-deploy row and the owner looks at it himself, so it is not yours to run.

QA's notes for you, from its document (re-read them there):
- M6's Assumption Not Checked, the fallback "Invalid message data." page, is the owner's accepted exclusion X-22 (plan D-31).
  Only his B-6 look checks it.
- M8's Assumption Not Checked is that in a real browser, focus stays inside a closing panel through its 75 ms leave. B-13 covers it.

Rules this thread adds (marked as steering's):
- Run the local stack from an isolated export or worktree of the two SHAs, with its own install. Do not switch,
  install into, or build in the shared trees `/usr/local/bin/hooks/website` or `/usr/local/bin/hooks/preview-image-generator`.
- Make no writes on production `hooks.gg`. Every walk runs on the local stack.
- The personal-message access bugs (`steering/017-rulings.md` block 09:01Z) are outside 017. They go to a fix chain after
  017's release and are not a UAT finding.

What this brief did not check: whether the rig under `verification/017/m5-rig/` still runs, and the state of the local database.

## Delivery

Your report goes to devops: to `devops-hooks-017` when that session is live, otherwise to `steering-roadmap-hooks`.
Send owner-needing items, blocks and spawn cues to `steering-roadmap-hooks` by SendMessage.
