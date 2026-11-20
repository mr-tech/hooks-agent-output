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

## 2026-11-20T04:33Z — implementation start on revision 5; chain branch cut

Every pre-code gate approved revision 5 (`e45e8cf`), each read at its header this turn: critique APPROVED, Resolved and closed
(`b61164b`); architecture APPROVED, no open finding (`1f78e40`); QA Phase 1 re-keyed to revision 5 with no open finding (`0160d45`).
No `OPEN QUESTION` open. No handoff added under `handoff/` since 04:31Z (`git log --since=2026-11-20T04:31:00Z --diff-filter=A -- handoff/`:
none).
- **Implementation starts** on revision 5, QA Phase 1 at `0160d45` (steering.md, Implementer; planner.md, Process step 6).
- **Chain branch:** website `chain/018-next-upgrade-save-size-cap`, `git switch --no-track -c … origin/master` at `7923a1d` (equal to
  `git ls-remote origin master`, read 04:3xZ), no upstream. Tracked tree clean; `git status --porcelain` before and after identical, one
  untracked `.playwright-mcp/` (not the chain's). Same commit, so the lockfile does not change across the switch.
- Implementer brief `steering/018-brief-implementer.md`; `implementer-hooks-018` spawned in category `website-deps-upgrade`.

## 2026-11-20T04:51Z — the shared website `node_modules` moves to the chain's lockfile (steering ruling, option B)

Asked by `implementer-hooks-018` before M2: (A) all M2/M3 installs in isolated exports, the shared `node_modules` left at `7923a1d`'s
state; or (B) the shared tree's `node_modules` moves to the chain's lockfile as the intended steady state.
**Who placed the state** (steering.md, Route by ownership: held shared-tree state): `node_modules/.modules.yaml` mtime 02:09:59Z, 17 s
after website `7923a1d` (02:09:42Z), the commit of fixer chain `fix-message-page-header-decode`, which this thread steered and closed. Its
document records `pnpm install --frozen-lockfile`, exit 0 (`implementation/closed/fix-message-page-header-decode-implementation.md`
line 93). No fixer session is live (`ListAgents` this turn). The state is the frozen install of `7923a1d`, reproducible from that
commit's lockfile. The website tree is in no coordinator register (`statbot/agent-output/steering/coordinator-shared-surfaces.md`,
`grep -n -i hooks`: no hooks website row).
**Ruling (this thread's, as the owner of the chain that placed it): B.** The shared tree rides the chain branch, so its installed state
follows the chain's lockfile: the implementer runs `pnpm install --frozen-lockfile` in `/usr/local/bin/hooks/website` after the M2 commit
and again after M3, records each run's exit code in its document, and in-tree runs by code review, QA and UAT then exercise 16.4.6.
Isolated exports stay available for base comparisons. At release devops returns the tree to `master`, which then carries the same
lockfile. Not put to him: no product, scope or release act turns on it.

## 2026-11-20T05:26Z — revision 7 approved by every gate; M2 capped; M1 to code review

Read this turn: plan changelog rows 6, 7, R-5, R-6 (`57a4bef`, `af8a9d6`, `f7e0585`, `9855bef`); critique header (cycle 2 pass 2,
APPROVED, `Reviewed-At` `af8a9d6`, stated limit SL-2); architecture header (APPROVED revision 7, `60d0a11`); QA's re-key of revision 7
(`a7394c6`, by its message: no finding, B-9 and B-10 minted). No handoff added since 05:20Z (`git log --diff-filter=A -- handoff/`).
- **M2 proceeds on revision 7.** Every pre-code gate approved it, no `OPEN QUESTION` open. The implementer read revision 7 and starts M2
  on it (its message 05:2xZ).
- **M2 capped** (steering.md, Standing check): revision 7 is M2's second revision since implementation started on revision 5 (6 and 7
  each rewrote M2's steps and criteria). From now, each further gap on M2 below HIGH goes to the plan's Planner batch as a stated limit
  without a revision round; a gate's severity-floor finding is excepted. Told to the critic, the architect, QA and the code reviewer.
  Spend: 018's sessions since the M2 report at 04:55Z, `cc-usage.py chain hooks-018 --since 2026-11-20T04:55`: $25.57 (all of 018's
  work in that window, M1's review-side and the implementer's M1 work included); M2 wall time 04:55Z to 05:26Z. Told to him in this
  thread's next message.
- **SL-2** (critique F-23 MEDIUM, M2-e's after-deploy look names no runner): QA's B-10 now names it as a devops Stage-1 handoff row,
  and F-23 is in the Planner batch, folded before devops Stage 1. Routed to him as information in the same message; nothing for him to
  choose.
- **D-6 move told to him** (block 03:25Z): `highlight.js` 11.7.0 → 11.12.0, in the same message.
- **M1 to code review:** `implementation/018-next-upgrade-save-size-cap-m1-implementation.md` at `003515a`, `Handoff-At` `f9e66c2`.
  `code-reviewer-hooks-018` spawned with `steering/018-brief-code-reviewer.md`. The shared tree moves under M2 meanwhile, so the review
  runs in an isolated export of `f9e66c2`.

## 2026-11-20T05:42Z — CR-2 (zod unpinned under the cap's counting): Planner batch, pinned after the fold (option A)

Asked by `implementer-hooks-018` by message: CR-2 LOW (`code-review/018-next-upgrade-save-size-cap-code-review.md`, `55fe778`) prefers
pinning `zod` to exactly 3.22.4 in `package.json`, since M1-i's count relies on the error map seeing every issue and `^3.20.6` admits
3.25.76 (its report: 1,600 issues for a 40×40 invalid-accessory save there). The pin widens M2's `package.json` diff past M2-b's
"specifiers named in the steps". Options it put: (A) Planner batch, folded at the next revision, then the pin in a follow-up commit;
(B) pin now under D-6 with M2-b amended; (C) record the premise only.
**Ruling (this thread's, under the M2 cap of block 05:26Z): A.** CR-2 is below HIGH, so it goes to the Planner batch as a stated limit
with no round of its own; the planner folds it in the batch fold before devops Stage 1, which names the pin in M2's steps; the
implementer then pins `zod` exactly and runs a frozen install, and that commit is reviewed and verified as usual. (B) would be a revision
round the cap removes; (C) leaves the premise unguarded. Not put to him: no product behaviour turns on it.
Told to the implementer, the planner and the code reviewer.
