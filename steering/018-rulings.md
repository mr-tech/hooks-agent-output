# Rulings — chain 018 (Next.js 16.4.6 upgrade and save-size cap; H-002 and M-001)

Steered by `steering-roadmap-hooks` (cwd `/usr/local/bin/hooks`). Coordinator: `steering-coordinator`. Plan:
`planning/018-next-upgrade-save-size-cap.md` (planner `planner-hooks-website-deps-upgrade`). Common brief: `steering/018-brief-common.md`.
tmux category: `website-deps-upgrade`, kept for the whole chain.

Earlier blocks are in `steering/website-deps-review-rulings.md`, read there:
- "2026-11-20T01:59Z": his word opening the chain.
- "2026-11-20T02:53Z": the scoping determination and the A-1 read.
- "2026-11-20T02:54Z": the three questions, put in plain text.
- "2026-11-20T03:08Z": his three answers by selection, and his word on prompts.

## 2026-11-20T03:11Z — ID 018 minted; chain files renamed

By the planner's message: ID 018 minted at agent-output `2b7b2de` (`.next-id` now 19, read by `git show --stat 2b7b2de`). The plan will be
`planning/018-next-upgrade-save-size-cap.md`.
- Renamed `steering/website-deps-upgrade-brief-{common,planner}.md` to `steering/018-brief-{common,planner}.md`, and opened this file.
- The tmux category stays `website-deps-upgrade`. `tmux-agent` has no command that moves a live session to another category, and one
  category per chain still holds.
- The planner's session is renamed `planner-hooks-018` at its first idle (`tmux-agent rename` refuses a busy session).
