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

## 2026-11-20T04:11Z — revision 2: OQ-5, the within-bound residue (X-19) and X-18 put to him; his answers

**Received:**
- `planning/018-next-upgrade-save-size-cap.md` revision 2 (`7a1bd46`), changelog row 2026-11-20T04:05; it carries OQ-5 and offers X-18.
- The critic's pass 2 (`409b52c`): F-1..F-15 resolved; REQUEST REVISION held on OQ-5 alone. It asked whether M1-M4 may start before
  OQ-5 is answered. That is moot: OQ-5 was answered in this prompt.
- The architect approved revision 2 with no findings (`dbddefb`). QA's re-read is pending.
**Refutations** (`general-purpose-sonnet` helpers, briefed with the conclusions alone):
- Preview (`verification/018/steering/refute-preview/`): confirmed. With the Preview names only, `next build` exits 1 in `src/env.mjs`
  ("DATABASE_URL, REDISHOST, REDISPORT, REDISUSER, REDISPASSWORD: Required"). The skip-built app, served without the skip, gives `/` 200,
  `/legal/privacy` 200 and `/api/auth/providers` 500.
- X-19 (`verification/018/steering/refute-within-bound/`): confirmed against the real `shapes.ts` (zod 3.22.4), every list within bound
  (40 containers × 40 children, inner bounds as given).
  - Worst case: 707,607 bytes gave 48,500 issues and a 13,324,552-character message (parse 216 ms, message 231 ms).
  - A 66,716-byte body gave 24,000 issues and about 6 MB.
**Selection, answered 04:11Z** (ledger `steering/selection-ledger/2026-11-20.md`, block "2026-11-20T04:11Z — steering-roadmap-hooks";
wording this thread's):
- Q "Preview": **Agent: release-check branch (Recommended)** — CHOSEN, by selection. "Devops pushes the chain tip plus one extra commit
  that only adds the build-skip setting, to a non-master branch (preview only). UAT checks public pages, redirects and images on
  Vercel's own build; sign-in is checked on a local build. The release pushes the tip without that commit." Not chosen: You: add skip
  to Preview vars; Agent: local build only; Agent: no pre-release site check.
- Q "Error cap": **Agent: also cap the error (Recommended)** — CHOSEN, by selection. "The planner adds to the save-cap milestone: the
  server stops checking after a small number of errors and returns a short reason, so no save can build a huge error. One more change
  in the same milestone, with its own tests." Not chosen: Agent: accept the residue; Agent: discuss first. X-19 leaves the Exclusions.
- Q "Save reason": **Agent: leave it (Recommended)** — CHOSEN, by selection. "Agent keeps Save's current message; it affects only
  pasted messages already over Discord's own limits, and the reason is visible in the JSON view." X-18 stands. Not chosen: Agent: show
  the reason on Save.
**Told to him, not asked** (block 03:3xZ): the D-6 package changes, in the reply that followed this prompt.
**Next:** the planner folds these into revision 3. The critic reads it as a delta; QA and the architect re-read the criteria that change.

## 2026-11-20T04:16Z — critic pass 3 on revision 3: APPROVED, stop authority fired (SL-1); refutation started

Read this turn: `critiques/018-next-upgrade-save-size-cap-critique.md` at `f209354` (verdict APPROVED, `Reviewed-At` `428090e`); plan
revision 3 at `428090e`, changelog row 2026-11-20T04:12 (scope delta: M1-i added per D-9, M5 written per D-8, R7 leaves M4's class; each
traces to his 04:11Z answers, so no delta prompt).
- **Residual:** stated limit SL-1 (F-17 MEDIUM: M1-i counts issues *created*, M1-b counts issues *in the result*; they disagree where a
  plain `z.union` fails). F-17 and F-18 (LOW) go to the Planner batch. The critic routed nothing to him.
- **This thread's reading:** steering.md (Critic) routes a residual-stated verdict's residual to him. It is put to him once QA's and the
  architect's re-reads of revision 3 are in, unless their findings bring a revision that folds F-17 first (then it is moot).
- **Refutation:** a `general-purpose-sonnet` helper, briefed with F-17's conclusion alone, runs it over the real `shapes.ts` at `7923a1d`
  (evidence `verification/018/steering/refute-union-count/`).
- Planner cleared 04:16Z after its Checkpoint (`263241f`). Standing check re-armed as `d086bd5a` (04:47Z).
- The record-write gate refused this block's first write (a shell append); re-issued with the Edit tool.

## 2026-11-20T04:32Z — SL-1 retired before it reached him; revisions 4 and 5; critic and architect approve revision 5

Read this turn: the plan's changelog rows 4, R-2, R-3, 5 (`29277d3`, `e45e8cf`); the critique header at its pass 5 (Status Resolved,
APPROVED, `Reviewed-At` `e45e8cf`); the architecture findings header (`1f78e40`, APPROVED revision 5, no open finding); QA's header (re-keyed
to revision 4, `413798f`).
- **The 04:16Z residual is moot.** The planner folded F-17 and F-18 into revision 4 (M1-i counts issues in the result; the three
  `z.union` sites, `spacing` included, from its own run `verification/018/planning/union-cap-probe/`). Critique pass 4 retired SL-1. Nothing
  goes to him on it; this thread's 04:16Z plan to put it is withdrawn.
- Revision 4's and 5's scope deltas restate M1-i, M1-a and M1-b within D-9; no criterion or milestone added. No delta prompt.
- **Waiting on:** QA's re-key of revision 5. Then the implementation start (steering.md, Implementer), with no `OPEN QUESTION` open
  (five, each RESOLVED or CLOSED, `grep -n` this turn).
