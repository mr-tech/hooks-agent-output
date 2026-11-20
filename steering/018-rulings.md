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

## 2026-11-20T03:25Z — plan 018 revision 0 received; OQ-1 and the Exclusions register put to him; his answers

**Received:** `planning/018-next-upgrade-save-size-cap.md` revision 0 (`4a166fd`), read this turn. Its changelog row reads "Scope delta: none
against block 02:53Z". The planner's message carried OPEN QUESTION OQ-1 (the lint package) and the cue for the critic, architect and QA
Phase 1. The planner session was renamed `planner-hooks-018` at 03:2xZ.
**Refutation (a `general-purpose-sonnet` helper, briefed with the conclusions alone; evidence `verification/018/steering/refute-lint/`):**
both confirmed.
- ESLint 8.57.1 loads `eslint-config-next` 15.5.14 (exit 0) and fails to load 16.4.6 (exit 2, "Converting circular structure to JSON",
  in config validation).
- Nothing runs lint automatically: no `.github` at `origin/master`, `core.hooksPath` unset, `.git/hooks` samples only. Next 16.1.6's
  build has no lint step (`verifyAndLint`/`runLintCheck` 0 in `dist/build/index.js`).
**Selection prompt, answered 03:25Z** (ledger `steering/selection-ledger/2026-11-20.md`, block "2026-11-20T03:25Z — steering-roadmap-hooks";
wording this thread's):
- Q "Lint pkg": options "Agent: hold it at 15.5.14 (Recommended)" / "Agent: add an ESLint 9 milestone" / "Agent: hold it, no record".
  **His answer, typed: "you can upgrade any packages to anything deemed useful"**. His words, not a listed option.
  - This thread's reading: they lift the narrowing the recommended option carried, so `eslint-config-next` moves to 16.4.6 with what it
    needs: ESLint 9, a flat config, and `@typescript-eslint` 5 → 8. That is the "ESLint 9 milestone" limb.
  - His words admit further package upgrades the chain judges useful. Each is recorded in the plan as a scope delta with its reason,
    and steering tells him of each at the next prompt; none needs a separate ask.
  - Not read as reopening X-1 (zod 4): his second answer accepted the Exclusions as written.
- Q "Exclusions": **Agent: accept as written (Recommended)** — CHOSEN, by selection. "Agent leaves all of them out; each keeps its
  stated limit or handoff record, and the plan proceeds to critique." X-1 to X-15 of revision 0 are accepted. Not chosen: "Agent: also
  fix recent-ids"; "Agent: discuss first".
**Next:** the planner registers both answers in revision 1, with the ESLint 9 milestone. The critic (first pass at xhigh), the architect
(conformance) and QA Phase 1 then start on revision 1. X-10's handoff stays open; its fired trigger is dispositioned in it when M1 lands.

## 2026-11-20T03:3xZ — revision 1 received; critic, architect and QA Phase 1 started

`planning/018-next-upgrade-save-size-cap.md` revision 1 (`c2a6b85`), changelog row 2026-11-20T03:31, read this turn.
- **Scope delta:** M3 was added (ESLint 9, a flat config, typescript-eslint 8, `eslint-config-next` 16.4.6). It is the "ESLint 9
  milestone" limb, which this thread's recorded reading of his 03:25Z words admits (block 03:25Z). It is not put again.
- **Further upgrades under D-6:** `eslint-plugin-react` 7.37.5, `eslint-plugin-import` 2.32.0, `@eslint/js` 10 → 9, and removal of the
  unreferenced `eslint-plugin-n` and `eslint-plugin-promise`. New exclusion X-16, ESLint 10: `eslint-plugin-react` peers ESLint 9 at
  most. These go to him at his next prompt (block 03:25Z).
- **Spawned**, category `website-deps-upgrade`, all launched in `/usr/local/bin/hooks/website`:
  - `critic-hooks-018` at xhigh, brief `steering/018-brief-critic.md`;
  - `architect-hooks-018`, brief `steering/018-brief-architect.md`;
  - `qa-hooks-018`, brief `steering/018-brief-qa.md` (`96612e1`).
- The critic is set to medium once its first pass is committed.

## 2026-11-20T03:59Z — critique F-1: the preview premise in his 03:08Z option was wrong; held for the planner's probe

By the critic's message, `critiques/018-next-upgrade-save-size-cap-critique.md` at `ac93b5a`, F-1 (REQUEST REVISION, with the planner).
- **This thread's error.** Block 02:53Z and the 03:08Z "Preview" option said a branch push makes a Vercel preview. The option's words
  were: "Agent pushes the chain branch (preview only, production untouched). UAT loads the public pages, images and the sign-in
  redirect on the preview."
  - The two READY previews cited were built from `probe/017-waituntil` at `aca8cb3`. That branch sets `vercel.json`
    `"buildCommand": "SKIP_ENV_VALIDATION=1 next build"` (`verification/017/m5-0/README.md`).
  - A build with the Preview names alone exits 1 in `src/env.mjs` (`verification/017/m5-0/devops/probe-build-preview-env-no-skip.txt`).
  - The check that would have caught it: reading that README before citing the previews.
- **Correction:** `steering/018-brief-common.md` hazard 7 is corrected in place (this commit).
- **Held:** the critic routed the unrun limb to the planner: a build with the Preview names, served, then two GETs. Whether the preview
  can still deliver what he chose decides whether his selection reopens (escalation.md: a corrected premise reopens it only where it
  changes the scope he chose). On the planner's result, steering puts it to him if it does, with the probe as a premise.
