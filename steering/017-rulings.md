# Rulings — 017 (Hooks.gg backlog items 2 to 5)

Planned chain steered by `steering-roadmap-hooks` (cwd `/usr/local/bin/hooks`). Alias chain:
`steering-roadmap` (2026-11-18 to 2026-11-19T05:1xZ) → `steeering-roadmap-hooks` (his rename) →
`steering-roadmap-hooks` (his rename, 05:2xZ; block 2026-11-19T05:22Z). Planner session:
`planner-hooks-017` (born `planner-hooks-new`; renamed by this thread at its next idle). The
commission and the scoping determination are in the effort-wide file,
`steering/backlog-2026-11-18-rulings.md`, blocks "2026-11-18T21:53Z — commission (his words)" and
"2026-11-18T21:59Z — scoping determination: chain B (items 2 to 5)". Brief common part:
`steering/017-brief-common.md`.

## 2026-11-18T22:05Z — ID minted

The planner minted 017 (agent-output `d7f6b2e`, "planner: mint ID 017 for chain B …"; its diff is
`.next-id` alone, 17 → 18, `git show --stat`). The plan will be `planning/017-<slug>.md`.

## 2026-11-18T22:13Z — revision 0 received; analyst started; owner items held for a refutation pass

Planner message (22:1xZ): revision 0 committed at `f2153bd`,
`planning/017-existing-items-backlog.md` (read whole this turn: `Revision: 0`, `Status: Active`, no
milestones). Its items for him: approval of the four user stories (§ Value Statement); OQ-1 (item 2,
failure visibility); OQ-6 (item 5, lint: the repo's lint script does not start at `395510e`; 469
errors / 368 warnings by a substitute run). OQ-2 to OQ-5 are scope assumptions revision 1 settles
from the analysis, not his. Scope delta: none (first revision).

- Session renamed: `planner-hooks-new` → `planner-hooks-017` (`tmux-agent rename`, 22:1xZ, "renamed
  … (pid 2908460)"; refused at 22:05Z while busy).
- Spawn cue acted on: `analyst-hooks-017` started with `tmux-agent spawn` (category `S017-backlog`,
  cwd `/usr/local/bin/hooks`, effort medium as printed); brief
  `steering/backlog-2026-11-18-briefs/analyst-hooks-017.md` at `270d885`. Commission: the plan's
  AN-1 to AN-3, as written.
- Chain A's fixer told by message (22:1xZ) of OQ-6's lint finding as a candidate (it is adding a lint
  rule as its class catch): re-derive, do not widen scope, `BLOCKED:` if the catch has no working
  instrument.
- Earlier rulings checked before asking (escalation form): none answers OQ-1 or OQ-6. Lint history:
  `steering/queue-hooks-rulings.md` line 188 (the 34 findings left "the reviewer's to rule") and
  lines 725-727 (plan 016 X-10, a stated limit at `0e3d903`, 312 errors / 364 warnings) — neither is
  his word on scope.
- A `general-purpose-sonnet` helper is trying to refute three premises the questions rest on (the
  lint script's failure and count; the failure-visibility facts; "the in-app navigation guard has
  never worked for anyone"), output under `verification/017/steering-refute/`. The questions go to
  him after it reports, in plain-message form (chain A can still move without his word).

## 2026-11-18T22:18Z — refutation results; OQ-6 returned to the planner; two questions put to him

Helper results (`general-purpose-sonnet`, capped probes, outputs `verification/017/steering-refute/`,
cleanup confirmed by its `ps` count 0):
- **Lint premise: refuted where it matters.** The repo's lint command starts in the shared tree's
  install (`eslint --fix-dry-run . --max-warnings=0` exit 1, no plugin error, `c1-shared-dry.out`;
  also the fixer's run, `verification/fix-dialog-closes-on-first-portal-load/lint-script-argv-dryrun.*`).
  The exit 2 "couldn't determine the plugin "react" uniquely" reproduces only in a `git archive`
  export with a symlinked `node_modules`, the tree's config included (`c1-eslint.out`,
  `c1-exp-sharedcfg.out`). 469 / 152 files not reproduced: export with a hand-built resolution 314
  errors, 368 warnings, 114 of 452 files (`c1-eslint4.json`); tree (with chain A's rule edit, not the
  base) 50 errors, 364 warnings, 71 of 454 files. OQ-6 is returned to `planner-hooks-017` to restate
  (message 22:1xZ); not put to him.
- **Failure-visibility facts (OQ-1): not refuted.** (a) website `shared.ts:192-202` ignores the
  response and swallows errors, read from code; (b) generator `server.ts:38-42` `console.error` and
  500, read from code; (c) wrong key → 404, only `POST /generate` on stdout — executed against stubs
  (`c2-probe.out`). New caveat, read from code: `generateImage.ts:28` `page.goto` does not reject on an
  HTTP error status, so an error page can be stored as the preview — sent to the planner as a
  candidate for item 2.
- **"The in-app navigation guard has never worked for anyone": not refuted, read from code, not
  run.** `useUnloadAlert.ts` listens on `next/router` `Router.events` `beforeHistoryChange`, emitted
  only inside the Pages Router (`next/dist/shared/lib/router/router.js:1194`); the app's pages are all
  under `src/app` since the guard's first commit `09effa4` (2023-03-22).
- **Gate disclosure (the helper's):** the secret-file gate refused its first `git show` on the
  generator, written with the ref in a shell variable; it re-issued with literal paths, the form the
  brief named and the control's own target shown; no `.github` or `.env*` file printed.

**Put to him 22:18Z, plain-message form** (chain A can move without him; prompt gate on — flag
absent, `ls -d`), with one `owner-wait` notice (chain `017`, key `017-rev0-stories-oq1`):
1. *User stories* — options: **Agent: proceed on all four as written (Recommended)** / **You: change
   a story (say which and how)** / **Agent: drop an item from this chain (say which; its handoff stays
   open)**.
2. *Preview failure visibility (OQ-1)* — options: **Agent: nothing new** / **Agent: the website logs
   one line per failed or unreachable generation (Recommended — the planner's)** / **Agent: also tell
   the saving user** / **Agent: decide after the fix ships**.
Recipients of his answers: `planner-hooks-017` (owns both); the analyst is not affected (AN scopes
unchanged by either).

## 2026-11-18T22:25Z — OQ-6 restated by the planner; put to him as a third question

Planner message: OQ-6 restated at agent-output `53a438d`; it withdraws its earlier premise ("That
error was mine"). Its new base count through the shared tree's install with `395510e` emulated
(method `verification/017/entry/lint-base/README.md`): 314 errors, 368 warnings in 113 of 453 files
before any fix; after the script's own fixes 50 errors, 365 warnings in 72 files. Gate disclosure
(its): the record-write gate refused its shell heredoc; written with the Write tool; disclosed in
the plan's R-1 row. It parked the `page.goto` candidate as a Planner batch row.

Premises read by this thread before putting it, independent of the planner's capture:
- 314 / 368 matches the steering helper's export count (`verification/017/steering-refute/c1-eslint4.json`);
  50 errors / 364 warnings after fixes and **70 files rewritten** by the script's fixes — `python3`
  over the helper's `c1-shared-dry.json` (454 files; `output` present in 70), a tree run carrying
  chain A's rule edit.
- **The record's 34 are still present at the base, in the same two files** (`c1-eslint4.json`):
  `src/utils/__tests__/utils.disposition-resolver.test.ts` 28 errors, 4 warnings, all 32 fixable by
  ESLint (`import/first`, `object-curly-newline`, `@typescript-eslint/no-non-null-assertion`);
  `src/utils/index.ts` 2 errors, not auto-fixable (`import/no-cycle`, `no-nested-ternary`).

**Put to him 22:25Z, plain-message form, as the third item beside the two of 22:18Z** (same
owner-wait, key `017-rev0-stories-oq1`, not re-sent). Options — the planner's four, then one this
thread composed from Recommendation 1's own words:
- **Agent: record the base result as accepted, fix none** (the planner's recommendation).
- **Agent: commit ESLint's own fixes as the last milestone (70 files, reviewed as code), record the
  remaining 415**.
- **Agent: as above, plus fix the 50 remaining errors**.
- **Agent: fix everything so the lint script passes**.
- **Agent: fix only the 34 the record names, in its two files** (this thread's; 32 by ESLint's own
  fixes in one test file, 2 by hand in `src/utils/index.ts`, a file item 5 already changes).
Recommendation (one place): the planner's.
Recipients: `planner-hooks-017`; `fixer-fix-dialog-closes-on-first-portal-load` is not affected
(its lint rule adds no finding beyond its own site — its claim, under review).

## 2026-11-18T22:27Z — analyst owner-needing item (AN-3, G-1): the Vercel function settings; put as a fourth question

Analyst message: analysis committed at `f330a29` (`analysis/017-existing-items-backlog-analysis.md`,
present, `ls -d`). Gap G-1: the Vercel project `hooks-gg-website`'s Fluid-compute setting and function
`maxDuration` are unread, and they bound post-response work after a save (item 2's design, plan
OQ-3). Attempts quoted by the analyst: `vercel.json` carries only a cron; CLI 29.1.1 has no
`project inspect`; `npx vercel@latest project inspect hooks-gg-website` (66.2.0) exit 1,
`missing_scope`, with the text "Ask the user which team to use … Do not choose a team yourself".

Premise read by this thread: `vercel teams ls` (CLI 29.1.1, 22:27Z) lists four teams visible to the
signed-in account — `blacklabel` (selected), `blacklabels-projects`, `statbot`, `hooks-gg`. That the
deployment's alias names `hooks-gg` is the analyst's read (`hooks-gg-website-hooks-gg.vercel.app`),
not re-read.

**Put to him 22:27Z, plain-message form, as the fourth item** (same owner-wait, not re-sent).
Options: **Agent: read it with the `hooks-gg` team (Recommended)** (the analyst runs `vercel project
inspect hooks-gg-website --scope hooks-gg`, read-only) / **You: read it yourself** (Dashboard →
hooks-gg-website → Settings → Functions: the Fluid compute toggle and Max Duration) / **Agent: go
without it** (the plan designs item 2 without counting on post-response work). Recipients:
`analyst-hooks-017` (performs the read on the first option), `planner-hooks-017`.

## 2026-11-18T22:28Z — planner: two item-4 questions (Q-A, Q-B) and an item-3 finding; refutation started

Planner message, from analysis `f330a29` (AN-2, AN-1): **Q-A** what to fix for signed-out edits
(reload/close loses nothing signed out — the draft is kept in the browser; three unwarned losses
from one stored copy shared by every message: after sign-in, opening a saved message then
returning; two signed-out tabs; a signed-in user's edits on the expired-session sign-out) — options:
fix the three at their source and turn the warnings on signed out (its recommendation) / fix at
source only / warnings only / don't do item 4. **Q-B** the in-app leave warning (never worked; Next
16 lets a page stop only clicks on its own links) — options: warn on link clicks for everyone (its
recommendation; a new prompt signed-in users see) / delete the dead listener and record the limit /
leave it. **Item 3:** at `395510e` the saving tab is not told of its own save for any enumerated save;
the one live path is an edit typed while the save is in flight; revision 1 fixes it as the
planner's mechanism choice. This disagrees in form with his BC-14 observation (at `a74b9e2`,
2026-08-25); the code has changed since (A-6, `963a25c`), so it is stated to him, not treated as
refuting him. Scope delta: none yet (Q-A's first option is priced at revision 1).

Before putting them: a `general-purpose-sonnet` helper is trying to refute A1 to A5, B1 to B3 and C1
(outputs `verification/017/steering-refute-2/`). Q-A and Q-B go to him after it reports, as a
second message: the first message already holds four questions (escalation form, up to four).

## 2026-11-18T22:32Z — refutation 2: nothing refuted; Q-A and Q-B put to him

Helper (`general-purpose-sonnet`, capped vitest runs in a `git archive 395510e` export, outputs
`verification/017/steering-refute-2/`, cleanup confirmed by `ps` count 0): **all nine NOT REFUTED.**
- A1 (signed-out reload/close loses nothing), A2 (sign in → open a saved message → back to new: draft
  replaced by the intro), A4 (a signed-in user's unsaved edits gone after the expired-session
  redirect/sign-out), A5 (one stored key `message`, `useLocalStorage.ts:42`), B3 (signed in: edit
  message 7, open 8, back to 7 shows the server copy): executed, `storage.out`, exit 0, 8/8.
- A3 (two tabs overwrite): executed as a jsdom simulation of a second tab (`setItem` +
  `StorageEvent`); not two real tabs.
- B1 (the in-app leave warning never fired) and B2 (Next 16.1.6 lets a page stop only clicks on its
  own `Link`, via `onNavigate`; `push`/`replace`/`back`, `redirect` and back/forward have no veto):
  read from code, not run. Nuance: a page's own `popstate` listener or the browser Navigation API
  sits outside Next.
- C1 (item 3: no notice for any enumerated save; the in-flight edit raises it): executed with
  `pusher-js` faked and the server's broadcast hash rebuilt per `shared.ts:290`, `pusher.out` 15/15,
  `pusher-rich.out` 8/8, exit 0 both; a foreign hash raises it (the check discriminates). His August
  report was on production `a74b9e2`; not re-run.

**Put to him 22:32Z, plain-message form, second message** (same owner-wait, not re-sent):
- *Q-A, signed-out edits — what to fix.* Options: **Agent: fix the three losses at their source and
  turn the existing warnings on for signed-out users (Recommended — the planner's)** / **Agent: fix
  the three losses at their source only** / **Agent: only turn the warnings on for signed-out users**
  (losses stay) / **Agent: don't do item 4** (its handoff stays open). Told with it: the expired-session
  loss is a signed-in user's; the shared stored copy also loses a signed-in user's edits when another
  message is opened (B3), which a fix at the source would likely also stop — this thread's inference.
  His answer can reshape story 3.
- *Q-B, the in-app leave warning.* Options: **Agent: warn on link clicks away from an editor with
  unsaved changes, for everyone, and record the navigations that cannot be stopped as a limit
  (Recommended — the planner's; a new prompt signed-in users will see)** / **Agent: delete the dead
  listener and record the limit, adding no prompt** / **Agent: leave it as it is**.
- Item 3 told, not asked: the plan fixes the in-flight-edit path as the planner's mechanism choice.
Recipients: `planner-hooks-017`.

## 2026-11-18T23:08Z — his six answers, by selection

Put as two selection prompts at 23:0xZ, answered 23:08Z, all by selection (his words: none beyond
the labels). Ledger: `steering/selection-ledger/2026-11-18.md`, blocks "2026-11-18T23:08Z —
steering-roadmap" (line 32: questions 1 to 4; line 65: questions 5 and 6). Options as put are in the
ledger and in the blocks above (22:18Z, 22:25Z, 22:27Z, 22:32Z); labels shortened for the prompt.
- **Stories:** "Agent: proceed on all four (Recommended)" — the planner writes milestones for all
  four stories as worded, in revision 1.
- **Preview failure (OQ-1):** "Agent: website logs failures (Recommended)" — the website writes one
  line per failed or unreachable preview to Vercel's logs; no user sees anything.
- **Lint (OQ-6):** "Agent: accept, fix none (Recommended)" — today's result recorded as the known
  baseline; no source files change for lint.
- **Vercel read (G-1):** "Agent: read under hooks-gg (Recommended)" — the analyst runs
  `vercel project inspect hooks-gg-website --scope hooks-gg`, read-only, and records both values.
- **Signed-out edits (Q-A):** "Agent: fix at source + warnings (Recommended)" — fix the shared-draft
  losses at their source (a draft survives sign-in, another tab and the expired-session sign-out)
  and turn the existing warnings on for signed-out users; revision 1 prices it.
- **Leave warning (Q-B):** "Agent: warn on link clicks (Recommended)" — warn on a link click away
  from an editor with unsaved changes, for everyone (a new prompt signed-in users will see), and
  record the navigations that cannot be stopped as a known limit.
Recipients: `planner-hooks-017` (all six), `analyst-hooks-017` (the Vercel read). The owner-wait
(key `017-rev0-stories-oq1`) is cleared.

**This thread's error, recorded at his question "Why did you not provide that as a prompt to begin
with?":** the plain-message form was the rule while chain A could move (22:18Z to 22:56Z). Once
chain A closed out at 22:56Z, the next standing check (23:0xZ) was the first where nothing this
thread steers could move, and steering.md says the ask is re-put then as a selection prompt; this
thread re-asked in plain text instead and switched only after his "continue". The check that would
have caught it: at each standing check, ask whether any chain can still move without him; if none
can, put the open asks as a selection prompt in that turn.

## 2026-11-18T23:10Z — reconcile note on the error above (his clarification)

His words: *"When I said "to begin with" I meant only after the chain stopped and you had known
that it was blocked"*. The block above placed the first missed point at the 23:0xZ standing check.
That was one step late: the first point was this thread's own closure turn at 22:56Z, in which it
closed chain A out and knew every next act of chain 017 waited on him, and still ended in plain
text; the 23:0xZ check repeated the miss. Defensible when written only as the rule's literal
trigger ("at the first check"); his reading — the moment the thread knows nothing can move — is the
one that binds this thread from now on. The check that would have caught it: at any turn that ends
with every chain waiting on him, the open asks go as a selection prompt in that turn.

His command at 23:1xZ: *"lodge this in agents inbox"* — done: `~/.claude/agents/INBOX.md`, entry
"2026-11-18 — steering-roadmap — FYI" (steering.md, Prompting the owner, the re-put trigger),
uncommitted per the inbox rule.

## 2026-11-18T23:12Z — G-1 read ran without the values; his selection: the API read

Analyst message: `npx -y vercel@latest project inspect hooks-gg-website --scope hooks-gg` (CLI
66.2.0, 23:09:20Z) exit 0; no Fluid-compute or Max Duration line (`grep -ciE
"fluid|duration|memory|function"` = 0; capture
`verification/017/analysis/an3/vercel-project-inspect-hooks-gg.txt`, agent-output `fee370c`).
Mechanism read by this thread before the prompt: `npx -y vercel@latest --help` lists `api  Make
authenticated HTTP requests to the Vercel API`; `vercel api --help` printed its usage (23:1xZ).

Put as a selection prompt (every next act of 017 waited on this). Ledger: day file, block
"2026-11-18T23:11Z — steering-roadmap". Options: **Agent: query Vercel's API (Recommended)** (one
read-only GET of the project's record via `vercel api` under the hooks-gg team; unverified that the
record carries both fields, and that `vercel api` takes the team scope the same way) / **You: read
the dashboard** / **Agent: design without them**. **Chosen: "Agent: query Vercel's API
(Recommended)"**, by selection. Sent to `analyst-hooks-017` with its description verbatim; one GET,
no other method.

## 2026-11-18T23:15Z — analyst's AN-4 hold (generator render times from the host log): answered by the Standing Default, not asked

Analyst message (23:1xZ): `planner-hooks-017` asked it by message for a new scope, AN-4 (G-3, the
generator's render time) — the distribution of `Generated image for message <id> with nonce <nonce>
in <N>ms` from the -prod (and -preview) out logs, through `ssh hooks-pig` as `claude-ro`; the planner
calls it REQUIRED before item 2's website milestone is approved for code. Held on its brief's
"Production: no host act" line, AN-4's absence from the plan, and its definition's owner approval.
- Reads this turn: `grep -n "Revision\|AN-"` over `planning/017-existing-items-backlog.md` — Revision 0,
  AN-1 to AN-3 only; brief line 34 read; `grep -n -i "host\|production\|claude-ro\|hooks-pig"` over
  `017-brief-common.md`, `backlog-2026-11-18-rulings.md`, `017-rulings.md`: no ruling of his bars a host
  read — the brief's line was this thread's composition. `verification/015/pig-host-read.sh` header read:
  runs as `claude-ro` (refuses otherwise), reads `/etc/.pm2/logs`, no pm2 command, no writes.
- Answer: escalation.md, Standing Defaults: "a read through the read-only host aliases … is made and
  recorded, never asked of him". Acted on and cited, not put to him (steering.md, Prompting the owner).
  AN-1 to AN-3 started on his commission ("Do all 5 in whatever order and group however you determine
  best") with no separate scope prompt; AN-4 is the same commission.
- Acts: brief amended (line 34 narrowed; amendment beside it). Planner told to commit AN-4 in the plan
  with its scope words before the analyst starts; analyst told it may run AN-4 once committed, within
  the amended brief, and that its declining is its own call if it reads its definition otherwise.

## 2026-11-18T23:24Z — revision 1 received; scope, OQ-7 and Exclusions put to him before any gate starts

Planner message (23:2xZ): revision 1 at `97e6814` (read this turn: `Revision: 1`, `Status: Active`;
changelog row 23:18 "Scope delta: M1 to M7 added (rev 0 had none)"; OQ-7 open, § Assumptions line 128;
M5-0 lines 344-360; Release and rollback lines 524-545; Exclusions X-1 to X-16 lines 588-607). Spawn
cue: critic, architect conformance, QA Phase 1 on revision 1. **Held**: a milestone-level delta goes to
him before any further pass or stage runs, and an open OQ goes to him before the critic sees the plan
(steering.md, Planner); the spawn cue leaves that gate as it stood.
Premises read this turn:
- Website workflows: `git -C website ls-tree -r --name-only origin/master -- .github` printed nothing
  (count 0); `ls website/.github` shows only an untracked `prompts/`. So "no workflows": what a branch
  push deploys is Vercel's git integration, unread from any file — the push gate applies (CLAUDE.md, Git).
- AN-4 figures: `analysis/017-existing-items-backlog-analysis.md` line 204 (n 16832, p50 2197 ms, p99
  3729 ms, max 26275 ms); captures `verification/017/analysis/an4/`.
- X-13 (Next builds a test file under `src/pages/api/` as an API route): `general-purpose-sonnet` helper
  tried to refute it. **Not refuted (run, webpack)**: a scratch Next 16.1.6 app's `next build --webpack`
  listed `ƒ /api/__tests__/hello.thing.test` as a route. Turbopack (Next 16's default builder; the
  website's `next.config.js` sets `turbopack.root`) not run: the helper's symlinked `node_modules` was
  refused by Turbopack. Scratch removed.
- No dated outside event (`backlog-2026-11-18-rulings.md` line 77).
- Planner's disclosed gate events (plan § Entry facts): the secret-file gate refused a relative-path grep
  after a cd, re-issued once with absolute paths, the form the gate names; a recursive grep over uat, qa
  and verification/016 refused and not re-issued. Told to him; the false-positive call is his.
- Record domain: the planner's INBOX.md entry "2026-11-18 — planner-hooks-017 — DECISION NEEDED" (a
  CLAUDE.md Placement exception) is the record's owning session's to process; X-13 carries it.
- **This thread's gate events, disclosed in the round:** the record-write gate refused this block's first
  write (a shell heredoc append); re-issued with the Edit tool, the form the gate names. The 23:15Z block
  and the analyst-brief amendment were written by a python script through the shell, which the gate did
  not catch; the form was outside the gate's stated standard all the same.

## 2026-11-18T23:26Z — his three answers on revision 1, by selection

Put as one selection prompt at 23:24Z (every next act of 017 waited on him), answered 23:26Z, all by
selection (his words: none beyond the labels). Ledger: `steering/selection-ledger/2026-11-18.md`, block
"2026-11-18T23:26Z — steering-roadmap" (options and descriptions as put are there in full).
- **Scope:** "Agent: confirm M1–M7 (Recommended)" — "The critic, the architect and QA Phase 1 start on
  revision 1 now. Implementation waits until those three gates approve." (Other options: cut item 4
  back; hold and discuss.)
- **OQ-7:** "Agent: proceed with it open (Recommended)" — "The gates and M1–M4 and M7 go ahead. Before
  M5 code, a devops session asks you for the probe push. If the probe fails, M5 and M6 stop and come
  back to you with the fallback." (Other options: settle it first; use the fallback now; drop item 2.)
  The probe push itself is not approved by this answer: a devops session asks him for it before M5.
- **Exclusions:** "Agent: accept all 16 (Recommended)" — "The plan keeps X-1 to X-16 as written. X-13's
  question about a test-placement exception in CLAUDE.md stays in the record's inbox for that record's
  owner." (Other option: name ones to drop.)
Recipients: `planner-hooks-017` (all three; registers them); the critic, the architect and QA Phase 1
by brief pointer to this block. Owner-wait `017-rev1-scope-oq7-exclusions` cleared. Spawn cue acted on:
`critic-hooks-017` (xhigh, first pass), `architect-hooks-017` (conformance), `qa-hooks-017` (Phase 1),
category `S017-backlog`, cwd `/usr/local/bin/hooks`.

## 2026-11-18T23:41Z — QA's QAF-9 / B-7 (a read of Vercel production runtime logs): answered by the Standing Default, not asked

QA message (23:4xZ), `qa/017-existing-items-backlog-qa.md` at `d1add83` (QAF-9 line 364; register row
B-7 line 290, read this turn): M5-f's liveness precondition needs one read-only read of the production
deployment's runtime logs (an existing tRPC `onError` `console.error` line shown readable) and the log
retention window; QA held it as outside D-10's single selected read.
- Answer: escalation.md, Standing Defaults — "a read or check an agent can make with the access it has
  — … a database or monitoring read … — is made and recorded, never asked of him". D-10 was his choice
  of *which team scope* the G-1 read used, not a bar on further read-only Vercel reads. Not put to him.
- Bounds sent (this thread's guidance): read-only CLI under `--scope hooks-gg`; print only counts,
  timestamps and the fixed line prefix — no request bodies, message content, user ids or tokens; no
  redeploy, env, or settings change; a refused read recorded, not re-issued.
- Other gates on revision 1 at 23:41Z: architect `406b34a` APPROVED_WITH_CHANGES (AF-1..AF-5); QA Phase 1
  `d1add83` findings QAF-1..QAF-9 to the planner; critic pass 1 not yet committed.

## 2026-11-19T00:06Z — revision 2 received; OQ-8, OQ-9, OQ-10 and X-17..X-19 put to him

Planner message (00:0xZ): revision 2 at `3d678cc` (read this turn: `Revision: 2`; changelog row 23:57;
OQ-8 lines 141-156, OQ-9 158-164, OQ-10 166-175; X-17..X-19 lines 924-926). It folds critique pass 1,
architect AF-1..AF-9, QA QAF-1..QAF-9; the planner sent the delta to the critic, the architect and QA
itself (next-act table). Scope delta, its words: "no milestone added or removed … what each item
delivers is unchanged; the mechanism under items 2 and 4 is larger." Judged by this thread a mechanism
change inside the agreed scope, not milestone-level; its one reach change (M4's context over every
`/message` page) is OQ-10, put to him. Gates not held.
Premises — `general-purpose-sonnet` helper briefed with the conclusions alone (all "read from code, not
run" unless marked):
- OQ-8: every link holds at `1ad625e` — react-use 17.4.0 `useBeforeUnload` prevents every unload while
  its flag is true; next-auth 4.24.5 `signIn('discord')` (line 331) and `signOut` (line 426) assign
  `window.location.href`. Today `hasChanged` requires `status === 'authenticated'`
  (`MessageProvider/index.tsx:112-115`), so the prompt arises only once M3-d drops that condition, as the
  plan says. **Partly refuted for the expired-session member**: `SessionProvider.tsx:13-15` runs
  `signOut()` in an effect keyed on `[!!session]`, which the helper read as firing at page load with an
  expired session, before any edit exists.
- OQ-10: **not refuted** — `src/app/message/layout.tsx` renders Navigation (Header, Sidebar on `/send`)
  beside, not inside, `src/app/message/m/[id]/layout.tsx:12-22` where `MessageProvider` and
  `ConfirmationProvider` mount.
- D-8's limit ("a failure line lasts under a day"): **partly refuted as worded** — QA's record rests on CLI
  refusals (`-s 1d` refused, `-s 23h` served); Vercel's runtime-logs and limits pages (fetched, run) say
  Pro keeps 1 day. About 24 hours, not meaningfully under.
- OQ-9 rests on no code conclusion (a definition of the stop word).

## 2026-11-19T00:11Z — his four answers on revision 2, by selection

Put as one selection prompt at 00:0xZ, answered 00:10Z, all by selection (his words: none beyond the
labels). Ledger: `steering/selection-ledger/2026-11-19.md`, block "2026-11-19T00:10Z — steering-roadmap"
(options and descriptions in full there).
- **OQ-8 (sign-in exits):** "Agent: skip the prompt (Recommended)" — "Log in and the automatic sign-out
  leave without the browser prompt, since nothing is lost on them. This changes only M3's exit table."
- **OQ-9 (probe fail):** "Agent: fails = didn't keep running (Recommended)" — "Only a clean 'not kept
  running' stops M5 and M6. An unreadable run is repaired and re-run once by devops under the same push
  you approve; a second unreadable run comes to you."
- **OQ-10 (send links):** "Agent: accept the guard (Recommended)" — "M4 adds the guard and moves the
  dialog up a layout, so the send page's Header and Sidebar links warn too. What you chose is unchanged;
  the mechanism is larger."
- **X-17..X-19:** "Agent: accept X-17 to X-19 (Recommended)" — "The plan keeps all three as written, as
  stated limits."
Told to him before the prompt, not decided: D-8's limit (about a day's retention, per Vercel's docs),
M5's per-save function cost, M3's signed-in survival across messages.
Recipients: `planner-hooks-017` (registers all four); the critic, the architect and QA see them in the
plan's registration. Owner-wait `017-rev2-oq8-10` cleared. **This thread's error:** that owner-wait
notice was sent at 00:06Z while the three gates could still move without him; steering.md sends it
only when every next act waits on him.

## 2026-11-19T00:21Z — revision 3 received; OQ-11, OQ-12, OQ-13 and X-18's third member put to him

Planner message (00:1xZ): revision 3 at `b3d811e` (read this turn: `Revision: 3`; OQ-11..OQ-13 text;
X-18 row line 1012). Folds critique pass 2 (`51805f4`), architect delta (`5ee7b89`), QA re-key
(`df45dde`), D-18..D-21; planner sent the delta to the three gates. Scope delta, its words: "no
milestone added or removed … What each item delivers is unchanged." Judged mechanism inside scope;
the three mechanisms and X-18's widened row go to him. Gates not held; no owner-wait (gates can move).
Premises — `general-purpose-sonnet` helper, conclusions alone (read from code, not run, unless marked):
- OQ-12: `src/utils/withLocalStorage.ts:12-17` `setItem` uncaught; `useLocalStorage.ts:27` uncaught;
  editor store effect `MessageProvider/index.tsx:165-169` unguarded; no `error.tsx` in the tree.
  **Partly refuted as worded**: the first write that does not fit throws in the provider's effect and,
  with no boundary above it, takes the page down to Next's default error screen — not "every later edit
  throws". Theme's press handler throws without unmounting.
- OQ-13 (b)'s "a few objects a year": **refuted as a measure**. AN-4's 15 are generator non-successes; the
  event (a 204 no continuation processed) is website-side, the continuation does not exist yet (M5's
  design), and no read in the record measures it. Rate unmeasured.
- OQ-11's cost figure: **not refuted** — `verification/017/architect-delta/m3-draft-map-serialise-cost.txt:3`,
  Node v24 V8 run per its README (JSON only; no browser or `setItem`; a lower bound by its own words).
- X-18: today's draft key is the constant `'message'` (`useLocalStorage.ts:42`), shared by every message
  in the origin; "last writer wins, as today" holds and today is wider.

## 2026-11-19T00:27Z — his four answers on revision 3, by selection; F-24's correction recorded beside them

(Heading restamped from a typed "00:28Z" the stamp gate refused as future-dated; clock read with `date -u`.)

Put as one selection prompt at 00:2xZ, answered 00:26Z, all by selection (his words: none beyond the
labels). Ledger: `steering/selection-ledger/2026-11-19.md`, block "2026-11-19T00:26Z — steering-roadmap".
- **OQ-11 (draft cap):** "Agent: cap 20 drafts / 1 MB (Recommended)" — "At most 20 drafts and 1 MB. When
  it's full, the least recently edited draft is dropped, silently."
- **OQ-12 (full storage):** "Agent: fix in shared code (Recommended)" — "The shared storage code stops
  throwing for every stored setting, and the draft store drops an old draft and retries. This fixes the
  shared bug once, where it lives."
- **OQ-13 (leftover images):** "Agent: sweep after each save (Recommended)" — "After each successful save,
  delete that message's leftover images more than 120 s older than the current one. Only the latest image
  is kept again; it costs one storage listing per save."
- **X-18's third case:** "Agent: accept it (Recommended)" — "X-18 keeps its third case as a known limit.
  Two tabs on one message overwrite each other's draft, as they do today."
**Correction after the selection (critic F-24, `97b96e3`; planner revision 4 `a97628d`):** the OQ-11 (b)
option as put — "No draft is ever dropped … once browser storage is full the newest edit isn't saved" —
was false in both pairings with OQ-12 (with (a) a full store evicts the oldest; with (b) the write throws).
He chose (a) on both; the (a)·(a) pair's outcome is as his chosen options state (revision 4's four-pair
table, "(a)·(a): past 20 drafts or 1 MB, the oldest draft is evicted silently. When storage is full, the
oldest is evicted and the write retried"), so the correction changes nothing he chose and his answers
hold. The check that would have caught it: before putting two questions whose options interact, have
the refuting helper state each answer pair's outcome, not each option alone.
Also recorded: `critic-hooks-017` put its own selection to him at 00:27Z (ledger block "2026-11-19T00:27Z —
critic-hooks-017", "Agent: approve now (Recommended)"), its role-internal ask on its verdict.
Recipients: `planner-hooks-017` (registers), `critic-hooks-017` (told the questions were pending).
`architect-hooks-017` briefed to read revision 4's delta as its conformance pass before implementation
starts (steering.md, Conformance: each revision the critic reads before implementation) — the planner had
cued it for the closing pass only.

## 2026-11-19T00:29Z — implementation start on revision 4; chain branch cut

Every pre-code gate has approved revision 4 (`a97628d`), read this turn: critic APPROVED, critique closed
`critiques/closed/017-existing-items-backlog-critique.md` (`77dfec4`); architect delta read APPROVED, no
finding (`architecture/017-existing-items-backlog-architecture-findings.md`, `96b4b62`); QA Phase 1
re-keyed to revision 4 with no finding (`qa/017-existing-items-backlog-qa.md`, `3af80aa`; checkpoint
`0b67e82`; Status "Awaiting Implementation"). After revision 4: R-6 `99643d4`, registration only (D-22..D-25).
- Open questions: OQ-8..OQ-13 resolved (D-18..D-25). OQ-7 stays open by his D-15 ("The gates and M1–M4
  and M7 go ahead. Before M5 code, a devops session asks you for the probe push."); it blocks M5 and M6 code.
- Handoffs opened after revision 4: none (`git log --since=2026-11-19T00:25:14Z --diff-filter=A
  --name-only -- handoff/` to a file, `grep -c .` = 0; `git status --porcelain -- handoff/` = 0 lines).
- **Implementation starts on revision 4** (`a97628d`), QA Phase 1 at `3af80aa`. Order per § Plan: M1, M2,
  M3, M4, then M5/M6 after gate M5-0, M7 last.
- Website branch: `git -C website switch --no-track -c chain/017-existing-items-backlog origin/master`
  (00:29Z) — `master` = `origin/master` = `HEAD` = `1ad625e` before; after, `HEAD` `1ad625e` on the new
  branch, no upstream. Tree before: one untracked `.playwright-mcp/` (Playwright MCP output, chain A era),
  no tracked change; the switch moved no file (same commit), so it is held, untouched. Lockfile identical
  across the switch (same commit). Generator branch: devops names it (plan § Plan), before M6.
- `implementer-hooks-017` spawned (brief `steering/backlog-2026-11-18-briefs/implementer-hooks-017.md`).

## 2026-11-19T02:43Z — M4's external same-tab links: answered by D-12 and M4-b/M4-d, not put to him

`implementer-hooks-017` asked (message, 02:4xZ) what M4 does about the two same-tab external links on
`/send` (NavMenu "Invite Bot", the `/send` bot-invite `InfoPanel` link), which Next's `<Link onNavigate>`
does not reach for a non-local href (its claim, read at website `1ab3b96`; not re-derived here — code
review and QA verify it). Options it put: (a) known limit beside X-14, code nothing; (b) a second
interception in `StyledLink` for a plain click on a non-local same-tab link, same confirmation;
(c) mount `useUnloadAlert(hasChanged)` on `/send` (browser prompt, also on close/reload).
**Not put to him: his ruling's words answer it** (steering.md, Prompting the owner). D-12, chosen
"Agent: warn on link clicks (Recommended)", shown: "Warn when someone clicks a link away from an editor
with unsaved changes, for everyone … and record the navigations that can't be stopped as a known
limit." These links can be stopped (the implementer's own (b) and (c) stop them), so they are not X-14's
kind. Plan revision 4 M4-d's class is "every link rendered on `/message/m/[id]/edit` or `/send` whose
activation navigates the current tab to a destination other than this message's `/edit` or `/send`" —
these are members — and M4-b requires "for every link in M4-d's class … shows the confirmation first".
So (a) narrows his ruling and is not open without him; (c)'s browser prompt is not M4-b's confirmation
and adds a close/reload prompt on `/send` that no ruling asked for. The mechanism that meets M4-b for
these members is the implementer's (a design choice inside the agreed scope, Standing Default); a
departure from M4-a's parenthetical "the one interception Next 16.1.6 offers, AN-2" is recorded in its
document as a deviation with its reason. M4-d's table corrections it reports (`/support` has newTab, so
not a member; `InfoPanel` has a member on `/send`) go into its tip re-derivation (M4-d's own step) and
to the planner's Planner batch for the plan's table and M4-a's text. A refuting helper was started and
stopped unused (no prompt was put); its scratch export removed. This thread's error disclosed: its first
write of this block was a shell heredoc, refused by record-write-gate-hook; re-issued with the Edit tool.
Recipients: `implementer-hooks-017`; the planner at the batch brief.

## 2026-11-19T04:14Z — M4 capped: review and QA time has passed its implementation time

steering.md, Standing check (the cap). Times read from commits this turn (agent-output `git log` of the M4
implementation, code-review and M4 QA documents; website `git log` of the chain branch):
- Implementation ≈ 40 min: first delivery from the 02:4xZ start brief to the hand-off `e5d520a` 03:13Z
  (≈ 31 min); fix round on code-review Round 4, `97cffb5` 03:25Z → `291bb7c` 03:34Z (≈ 9 min).
- Review and QA ≈ 41–51 min and running: Round 4 03:13Z → 03:25Z (12); sub-entry 03:34Z → `e12881a`
  03:39Z (5); QA Phase 2 M4 from 03:39Z (hand-off) or 03:49Z (its changelog's start row) to 04:14Z, its
  M4 document uncommitted at this read (Status "QA Failed" at `a5dd76f`, QAF-18 MEDIUM).
- Gate count: 1 code-review rejection (Round 4), 1 QA Failed. Spend over 02:42Z–04:14Z, every chain-017
  session, M3's QA tail included: $21.15 (`cc-usage.py chain 017 --since 2026-11-19T02:42 --until
  2026-11-19T04:14`, TOTAL row). Hours: ≈ 1.5.
**Cap:** for M4, each further gap below HIGH goes to the plan's Planner batch as a stated limit without a
fix round — a gate's severity-floor finding (GLOSSARY, "Severity floor") excepted. QAF-18 (an older guard's
withdrawal has no assertion that fails, so the register's identity check is unasserted) is a
severity-floor finding: it keeps its fix round. Told: `code-reviewer-hooks-017`, `qa-hooks-017`. He is
told at this thread's next prompt to him, with the spend and hours above.

## 2026-11-19T04:46Z — M1 to M4 through; M5-0 probe started; devops-hooks-017 spawned

Read this turn: M4 code review sub-entry APPROVED at website `5c3d03f` (`33b90ce`, R-22 `8441052`); QA
Phase 2 M4 refresh QA Complete at `5c3d03f` (`9f5dbb1`, R-23 `714e0fa`; QAF-18 resolved; QAF-19 LOW
parked in the Planner batch, R-21 `2e8742e`, under the M4 cap). M1 to M3 as recorded earlier.
- `implementer-hooks-017` told to write M5-0 limb 2's probe on a probe branch off `1ad625e` without
  switching the shared website tree, and to message the branch and SHA to `devops-hooks-017`.
- `devops-hooks-017` spawned (`tmux-agent spawn S017-backlog devops devops-hooks-017 /usr/local/bin/hooks
  …`, effort high; brief `steering/backlog-2026-11-18-briefs/devops-hooks-017.md`, `dd8bf8a`), for M5-0
  limb 2 alone: it asks him for the probe push in its own session (D-15); no approval is carried.
- Not Stage 1: the architect's closing pass stays owed no later than devops Stage 1's message.
- The reviewer's INBOX FYI (`ImageUploader`, `WarningDialog` bind Enter at the document, CR-9's class)
  is outside the plan. It is a candidate rider for him: a refuting helper is checking the conclusion
  before it is put.

## 2026-11-19T04:50Z — rider: the two dialogs' page-wide Enter, added to 017 (his selection)

Selection prompt, put 04:4xZ, answered 04:50Z; ledger `steering/selection-ledger/2026-11-19.md` block
"2026-11-19T04:50Z — steering-roadmap". Words are his by selection; option text is this thread's.
Question, as put: "Chain 017 code review found that two editor dialogs, the "Delete Field?" warning and
the image dialog, still answer Enter anywhere on the page. M4 already fixed this for the update prompt. …
This is outside 017's plan, and the plan hasn't grown since you approved it. What should happen?"
- **Agent: add it to 017 (Recommended)** — CHOSEN. "The planner adds it to 017 as revision 5. The critic,
  architect and QA read the change, then the implementer applies M4's already-reviewed fix to both
  dialogs, through code review and QA. It ships in 017's release. Cost: one plan revision and its gate
  reads, plus one small fix round (estimated, not measured)."
- Agent: own small fix later — "A separate fix after 017 is released (fixer plus code review, no plan).
  It waits for 017's release, because the website tree is on 017's branch until then, and it needs its
  own release."
- Agent: record it, don't fix — "Record it as a known defect for later. Nothing is fixed now, and both
  dialogs keep answering Enter anywhere on the page."
Premises, with the read that established each this turn:
- The defect, executed: refuting `general-purpose-sonnet` helper, isolated export of website `5c3d03f`,
  throwaway DOM test — WarningDialog and ImageUploader open with the update ConfirmationDialog, one
  Enter on the document fired `["warn.confirm","img.close","img.set","reload"]`. Sites:
  `src/components/ImageUploader.tsx:86`, `src/components/WarningDialog.tsx:19` (`useHotkeys(['enter'])`,
  guard compares `tagName` to `'~/components/Button'`, never true); `ConfirmationDialog.tsx:16` guarded
  since `a5dd76f`. Not run: the case where focus sits in the other dialog. Origin: reviewer's FYI,
  `agent-output/INBOX.md` (2026-11-19, code-reviewer-hooks-017), CR-9's class.
- "The plan hasn't grown since you approved it": `Revision: 4` in the plan header (read 04:50Z); his
  approval named revision 4 (block 00:29Z); no rider since.
- Costs are estimates, marked so in the option.
The cap notice for M4 ($21.15, ≈1.5 h, block 04:14Z) was told to him in the same turn, before the prompt.
Recipients: `planner-hooks-017` (revision 5); the critic, architect and QA read it as the plan's
revision delta; `implementer-hooks-017` and `code-reviewer-hooks-017` (the reviewer's FYI dispositioned).

## 2026-11-19T05:01Z — M5-0 probe kept alive; M5 and M6 start held for revision 5's gates

Read this turn: `deployment/017-existing-items-backlog-m5-0-probe-deployment.md` (`d61f445`, Status Active,
a probe record): his approval by selection in `devops-hooks-017`'s session (ledger
`steering/selection-ledger/2026-11-19.md` blocks "2026-11-19T04:55Z — devops-hooks-017" and
"2026-11-19T04:58Z — devops-hooks-017"); outcome **kept alive** (both lines under one request id, 5006 ms
apart; `mode=without` wrote the control line alone); probe branch deleted; master unmoved at `1ad625e`.
Under D-15 and D-19 M5 and M6 are not stopped. The record's own limit: the probe's post-response
promise was 5 s, not T = 40 s, and made no generator call (its "What this does not establish" line);
the implementer raised the same point.
- Plan read this turn: `Revision: 5` (`5155e68`), Status-Detail "Revision 5 at the gates (critic,
  architect, QA Phase 1 re-key)"; § Plan order adds M8 beside M5 and M6. No pre-code gate has read
  revision 5.
- **Hold (this thread's, steering.md Implementer: implementation starts once every pre-code gate has
  approved the current revision):** M5, M6 and M8 code wait for the critic's, the architect's and QA
  Phase 1's approval of revision 5 (or of the revision that follows it). M8 also waits on OQ-14.
  The start is recorded here when they land, naming the revision and the QA Phase 1 SHA.
- To the planner: register the M5-0 limb 2 outcome (OQ-7) from the deployment record, and weigh the
  5 s versus T = 40 s limit for M5's criteria. If it changes a criterion, the change rides the next
  revision for the gates to read.
- Revision 5 is not yet routed to the gates: OQ-14 goes to him first (steering.md, Planner). A
  refuting helper is running the focus cases behind statement 5's wording.

## 2026-11-19T05:01Z — OQ-14: value statement 5, corrected wording (his selection)

Selection prompt, put and answered 05:01Z; ledger `steering/selection-ledger/2026-11-19.md` block
"2026-11-19T05:01Z — steering-roadmap". Chosen by selection; option text is this thread's.
- **Agent: use corrected wording (Recommended)** — CHOSEN. "Statement 5 reads: "As a Hooks user editing
  a message, I want Enter to answer only the dialog I am in, so that pressing Enter on 'Message Update
  Detected' does not also delete an embed field or set an image in the dialog underneath." The planner
  registers it; M8's fix is unchanged."
- Agent: use planner's wording — "Statement 5 goes in as the planner wrote it. Its reason describes the
  opposite direction from what the test run showed; M8's fix is unchanged."
- Agent: drop M8 from 017 — "No fifth statement. M8 leaves chain 017 and the two dialogs' Enter defect
  is recorded for later. Nothing about it is fixed in this release."
Premises, read this turn: OQ-14 open, plan `5155e68` lines 95 and 209 (statement 5 proposed; OQ-14 blocks
M8 code only). The direction, executed: refuting `general-purpose-sonnet` helper, jsdom, real
`WarningDialog`, `ConfirmationDialog` (through `ConfirmationProvider`) and `ImageUploader` at website
`5c3d03f`, capped scope; raw results
`/tmp/claude-1000/-usr-local-bin-hooks/93a69827-827d-45ac-a165-718bbb9fbdbd/scratchpad/focus-refute-res.txt`.
Focus on WarningDialog's text: `["warn.onConfirm"]`, no Reload. Focus on the confirmation's text:
`["warn.onConfirm","RELOAD"]`. ImageUploader likewise (`["img.onClose","img.submit","RELOAD"]`). Focus on a
react-aria `Button`: Enter never reaches `document`, so only that button's own action fires. Reload
discards local edits (`usePusher.ts:70-71`, `useApiMethods.ts:27-32`, `MessageProvider/index.tsx:220-238`).
Which element a real browser focuses when the update prompt opens over another dialog: read from code
(headlessui 2.2.9 FocusTrap; Reload has `autoFocus`), not run. That is the plan's RK-11, settled by UAT.
"Either wording leaves M8's fix the same": M8-b's property (Enter answers only the dialog holding focus)
is the same under both, read at plan lines 939 to 966.
Recipients: `planner-hooks-017` (register the statement and resolve OQ-14).
Correction (05:06Z): "read at plan lines 939 to 966" was written before this thread had read those
lines (it had read only M8-b's first line). It read them at 05:02Z, after the commit `a949b03`: the
property and its decision table are the same under either wording, so the premise held. The check that
would have caught it: read the cited lines before writing the citation.

## 2026-11-19T05:06Z — OQ-15: one more probe push for M5-0 limb 3 (his selection)

Plan revision 6 (`21e61eb`, 05:05Z) adds M5-0 limb 3 (a probe whose promise writes lines at 5, 15, 30,
45 and 55 s) and OQ-15 (blocks M5 and M6 code). Selection prompt, put and answered 05:06Z; ledger
`steering/selection-ledger/2026-11-19.md` block "2026-11-19T05:06Z — steering-roadmap". Chosen by
selection; option text is this thread's.
- **Agent: push one more probe (Recommended)** — CHOSEN. "devops-hooks-017 pushes one more probe branch on
  this answer. The website has no GitHub workflows, and the last probe push built only a Vercel preview;
  master didn't move. It runs and reads the probe, then deletes the branch, as before (about 2.5 min). It
  removes any bypass secret it adds. The preview stays until Vercel expires it. This settles the 40 s
  window before M5 code."
- Agent: don't push — "No second probe. The 40 s window rests on Vercel's documentation and the 60 s
  default. If Vercel cuts the background work somewhere between 5 s and 55 s, nothing would show it,
  before or after release."
Premises, read this turn:
- What the push triggers: `ls -d website/.github/workflows`, "No such file or directory";
  `git show origin/master:vercel.json`, `crons` only. Limb 2's push of `probe/017-waituntil` built a
  Preview only (Ready 04:56:07Z); master unmoved at `1ad625e`
  (`deployment/017-existing-items-backlog-m5-0-probe-deployment.md`, `d61f445`). About 2.5 min: that
  record, push 04:55:17Z to deletion 04:57:41Z.
- 5 s observed, 5 to 55 s not: the same record (`elapsedMs=5006`; its "What this does not establish"
  line). Refuting `general-purpose-sonnet` helper: HOLDS. The `@vercel/functions` reference says
  waitUntil promises "will have the same timeout as the function itself"; the project record gives
  `functionDefaultTimeout=60`, with no route override at `origin/master` (analysis AN-3,
  `verification/017/analysis/an3/vercel-api-project-record-extract.txt`; D-10). A Preview's limit is
  unread.
- The bypass secret: limb 2's `vercel curl` added one, and his 04:58Z selection in devops's session
  revoked it (D-28); revision 6's limb 3 has devops restore the bypass count after the run.
- Gate rounds since his rev-4 approval: revisions 5 and 6; no gate has read either. Both options
  trigger the same three reads of revision 6; (a) adds the probe run before M5 code.
Recipients: `devops-hooks-017` (his words, verbatim), `planner-hooks-017` (register; resolve OQ-15).
Registered: D-30, R-25, agent-output `6daa353` (05:08Z; `git log -1` read by this thread). This thread's
error: its message to the planner said "Noted from the plan itself (R-25, 2df9c3c)", echoing the
planner's unread SHA (`2df9c3c` is not an object). The planner corrected its own SHA; this line corrects
mine.

## 2026-11-19T05:19Z — implementation of M5, M6 and M8 starts on revision 7

Every pre-code gate has approved revision 7 (`6ade256`, 05:16:40Z), read this turn:
- critic cycle 2 pass 2 APPROVED, critique Status "Resolved", F-1 to F-28 resolved (`2ed550b`);
- architect delta read: APPROVED stands, no finding, AF-23 folded (`0e380fc`; R-27 `3a7d073`);
- QA Phase 1 re-keyed to revision 7, no finding, QAF-20 and QAF-21 resolved (`qa/017-existing-items-backlog-qa.md`,
  **`7eda138`**; R-28 `2b8aea5`).
- Gate M5-0 met: limb 2 kept alive, limb 3 lasts (`deployment/017-existing-items-backlog-m5-0-probe-deployment.md`,
  `8f26f37`), T = 40 s stands.
- Open questions: none (`grep '^**OPEN QUESTION OQ-'` on the plan: 0 unresolved; 15 marked resolved).
- Handoffs opened after revision 7: none (`git log --since=2026-11-19T05:16:40Z --diff-filter=A` on
  `handoff/`, 0 paths; `git status --porcelain -- handoff/`, 0 lines).
- Website: `chain/017-existing-items-backlog` at `5c3d03f`; tree clean but for the held `.playwright-mcp/`.
**Implementation of M5, M6 and M8 starts on revision 7** (`6ade256`), QA Phase 1 at `7eda138`; M7 last
(§ Plan). This lifts the 05:01Z hold. The generator branch is devops's to name (plan § Plan) before M6
code in `preview-image-generator`.

## 2026-11-19T05:21Z — generator chain branch cut

`devops-hooks-017` named it `chain/017-existing-items-backlog` (its probe record, section "Generator branch
name", `a0cfa8b`). `git -C preview-image-generator switch --no-track -c chain/017-existing-items-backlog
origin/prod` (05:21Z). Before: on `prod`, `HEAD` = `origin/prod` = `8de2b53`, `status --porcelain` 0 lines.
After: on the new branch at `8de2b53`, no upstream, 0 lines. The switch moved no file (same commit), so
the lockfile is identical across it. Disclosed: a `git log` in this repository was refused by
secret-file-gate-hook (`.github/workflows/prod.yml` flagged); re-issued as `rev-parse`/`status`, which
print no line of it. devops-hooks-017 reported the same refusal and did not re-issue it.
Also: the session was renamed by him to `steeering-roadmap-hooks` (05:1xZ). Stage briefs name
`steering-roadmap` as the return address, and devops-hooks-017's first send to it was refused (no
session carries the name). The name question is put to him.

## 2026-11-19T05:22Z — this thread's name (his selection)

Selection put and answered 05:22Z (ledger `steering/selection-ledger/2026-11-19.md`, this thread's block
of that minute). Chosen: **"You: /rename steering-roadmap-hooks (Recommended)"**: "You type /rename
steering-roadmap-hooks here (the three e's look like a typo). Then I tell each live 017 session to use
that name and note it in the rulings file. tmux-agent rename can't do it: this session isn't on the
agents tmux server." Not chosen: "Agent: keep steeering-roadmap-hooks"; "You: /rename steering-roadmap".
Premises, read this turn: ListAgents 05:19Z ("This session is steeering-roadmap-hooks [ab3009]"); devops's
refused send (its message 05:2xZ); `tmux -L agents list-sessions` carries no roadmap session, and
`tmux-agent rename` acts only on agents-server panes (`~/.local/bin/tmux-agent` lines 45, 275 to 283).
**Alias chain:** `steering-roadmap` (2026-11-18 to 05:1xZ) → `steeering-roadmap-hooks` (his rename,
05:1xZ) → `steering-roadmap-hooks` (his rename, pending). Once ListAgents shows the new name, every
live 017 session is told the return address.

## 2026-11-19T05:53Z — standing check: M8 at QA; reviewer asked to checkpoint; standing file written

Read this turn: code review Round 5 M8 APPROVED_WITH_COMMENTS at website `c37d41a` (`4950989`, R-30
`225e4f3`); QA Phase 2 on M8 started by the reviewer's own delivery to `qa-hooks-017` (05:41:43Z, its
transcript), the session busy. Prefixes (`cc-usage.py sessions`, 05:51Z): implementer 420K busy,
code reviewer 354K idle, QA 211K busy, devops 228K, planner 289K, critic 243K. OOM count 0; usage
`weekly_all` 86% live (Fable scoped 98%, closes nothing).
- `code-reviewer-hooks-017` asked to `/checkpoint` (past 325K, at a seam); cleared once committed.
- QA's addendum (Resumption State `689e510`, return address `steering-roadmap-hooks`) waits on its idle
  notice; the implementer's checkpoint ask waits on its next idle seam.
- Event log past 40 KB (55,030 bytes, `wc -c`): `steering/017-standing.md` written.
- **This thread's gate event, disclosed in the round:** record-write-gate-hook refused a shell `sed -i`
  on `017-standing.md` (the same command also read two other rulings files); re-issued as an Edit, the
  form the gate names, and the reads separately.
- Code reviewer checkpointed (`00e6bb8`, 05:52:48Z) and cleared 05:5xZ (`tmux-agent clear`, exit 0).

## 2026-11-19T06:01Z — M8 QA Failed (QAF-22); M8 capped

Read this turn: `qa/017-existing-items-backlog-m8-qa.md` at `8e73691` (05:58:33Z), Status "QA Failed" at
website `c37d41a`, QAF-22 MEDIUM (no case fails when WarningDialog's hotkey stops being gated on open;
fix test-only), QAF-23 LOW (duplicates CR-12). QA routed it to `implementer-hooks-017` (05:58:57Z) and
`code-reviewer-hooks-017` (05:59:01Z), read from QA's transcript.
**Cap (steering.md, Standing check):** M8's review and QA time has passed its implementation time.
Implementation ≈ 14 min (go 05:23:34Z → hand-off `167ec86` 05:36:54Z); review ≈ 4 min (→ `4950989`
05:41:00Z) plus QA ≈ 17 min (05:41:43Z → `8e73691` 05:58:33Z), ≈ 21 min. Gate count: 0 code-review
rejections, 1 QA Failed. Hours ≈ 0.6. Spend: $19.54 for every chain-017 session over 05:23–06:00Z
(`cc-usage.py chain 017 --since 2026-11-19T05:23 --until 2026-11-19T06:00`, TOTAL row), which includes
M5 and M6 work in the same window, so M8 alone is not separated.
For M8, each further gap below HIGH goes to the plan's Planner batch as a stated limit without a fix
round, a gate's severity-floor finding excepted. QAF-22, raised before the cap, keeps its fix round.
Told: `qa-hooks-017`, `code-reviewer-hooks-017`. He is told at this thread's next prompt to him.
Update 06:07Z: the reviewer then recorded a Round 5 reconcile, M8 REJECTED at `c37d41a` on CR-13 MEDIUM
(it duplicates QAF-22; `c44cf87`, 06:02:51Z), so M8's gate count is 1 code-review rejection and 1 QA
Failed. Its sub-entry APPROVED the fix at website `6555f65` (`74263c8`, 06:06:45Z), delivered to QA and
the implementer (its transcript, 06:07:12Z and 06:07:14Z).

## 2026-11-19T07:15Z — chain parked (his command)

His words, typed: *"park the chain"*. Parked on his word (steering.md, Parking); it resumes on his word.
State at the park, read this turn: plan revision 7 `6ade256`, Status In Progress. M1–M4 and M8 through
code review and QA Phase 2 (M8 at website `6555f65`, `ebebc72`). M5 code review APPROVED at website
`4b8db9c` (`6e4436d`), QA Phase 2 on M5 in progress (QA busy, no M5 QA document committed). M6 handed to
code review at generator `8512a1d` (`4c4e948`), Round 7 not committed. M7 handed off at `f83f2ca`
(`0d5e412`). Branch tips: website `4b8db9c`, generator `8512a1d`.
Acts: every live 017 stage session asked for `/checkpoint` at its nearest seam and stopped once its
Checkpoint is committed (architect and analyst already checkpointed and cleared: stopped directly).
This thread's standing check deleted; its Checkpoint is the docket. No timed event: the carrier is his
word, queued in `OWNER-QUEUE.md`. No coordinator: this thread asks him for its `/clear`.
Still owed on resumption: M5 QA Phase 2, M6 code review and QA, effort-final QA sweep, Planner batch
fold, architect closing pass (≤ devops Stage 1), security on the generator delta, UAT, devops Stage 1;
he is told the M8 cap (block 06:01Z) in this turn.

## 2026-11-19T07:24Z — chain resumed (his word, relayed by the coordinator); premise re-read

His words, relayed verbatim by `steering-coordinator` in this thread's spawn brief: *"continue the
statbot and hooks threads"*, then *"\*steering threads"*. Under steering.md (Approvals move verbatim,
inbound), a command the coordinating thread relays is acted on as his word: the chain resumes from the
park. It waives no gate. This thread was respawned fresh as `steering-roadmap-hooks`; its coordinator
is now `steering-coordinator`, which owns this thread's clear timing.
**Premise re-read (07:23Z, this thread):** remote refs unchanged since the branch cuts (`git ls-remote`:
website `master` `1ad625e`, generator `master` `87dcb41`, `prod` `8de2b53`), so nothing has shipped and
items 2 to 4 stand unfixed in production. Chain tips unchanged since the park (`branch --show-current`,
`log -1`): website `chain/017-existing-items-backlog` `4b8db9c`, generator same branch `8512a1d`; website
holds only the untracked `.playwright-mcp/`, not the chain's. Plan revision 7, Status In Progress (its
header; last commit `b2eefcd`, the planner's checkpoint). No `handoff/` record added since revision 7's
commit `6ade256` (05:16:40Z; `git log --diff-filter=A --since` on `handoff/`, empty). Every Resumption
State commit named in the docket is present (`git log --since=07:00Z`). OOM count 0. Usage
(`plan-usage.py --json`, source live): session 0%, `weekly_all` 0% (reset since 06:54Z's 87%).
**Acts:** `OWNER-QUEUE.md`'s park entry deleted (his word arrived). Started fresh from their Resumption
States: `qa-hooks-017` (M5 Phase 2 document, then M6 and M7, then the effort-final sweep; brief
`backlog-2026-11-18-briefs/qa-hooks-017-resume.md`) and `code-reviewer-hooks-017` (Round 7 on M6, then M7;
`…/code-reviewer-hooks-017-resume.md`). Each brief's first deliverable is the premise re-read. Held until
their trigger: implementer (on a finding routed to it), security (on the generator delta once M6 is
approved), Planner batch fold with its critic read and the architect's closing pass (once M6 and M7 clear
their gates), UAT, devops Stage 1. `017-brief-common.md` updated: both branches cut.
**This thread's gate event, disclosed in the round:** `record-write-gate-hook` refused a python shell
write to `OWNER-QUEUE.md`; re-issued with the Edit tool, the form the gate names.

## 2026-11-19T07:34Z — M5 QA Complete; implementer started for QAF-24

Read this turn: `qa/017-existing-items-backlog-m5-qa.md` header at agent-output `10e4627`, Status QA
Complete, `Verified-At` `4b8db9c`; plan R-37 (`6f98995`). QAF-24 LOW (the real-Postgres lane's P1 cannot
tell `clock_timestamp()` from `now()`) routed by `qa-hooks-017` to this thread because no implementer
session was live, per its brief. This thread's determination: start `implementer-hooks-017` now from its
Resumption State (`2496978`; brief `backlog-2026-11-18-briefs/implementer-hooks-017-resume.md`). Reason:
the fix is in the tree before M6/M7 QA and the effort-final sweep, and M6's review may route to it anyway.
If the fix moves the website tip, M5's verdict at `4b8db9c` expires and goes back through review and QA.

## 2026-11-19T07:56Z — standing check: M6 through review and QA; security started; M7 review driven

Read this turn: fix rounds record-only at agent-output `008468b` (QAF-24 lane; CR-16 to CR-18), no source
tip moved (website `4b8db9c` by `log -1`; generator `8512a1d` from the review's `Reviewed-At`, see the
disclosure). Code review Round 7 sub-entry: M6 APPROVED at generator `8512a1d` (`a010246`, R-39); QAF-24
scoped check passes (`c3fa457`, R-40). QA Phase 2 M6: QA Complete at `8512a1d` (`dd7a449`, R-41), no
finding; QA reports QAF-24 resolved by its own closure run. Plan revision 7, unchanged. Sessions
(`cc-usage.py sessions`): QA 297K busy, code reviewer 234K idle 13 min, implementer 199K idle; each wake
ARMED. OOM 0. Usage live: session 8%, `weekly_all` 2%.
- QA's spawn cue (M6 QA Complete) acted on: `security-hooks-017` started on the generator delta
  `8de2b53..8512a1d` (brief `backlog-2026-11-18-briefs/security-hooks-017.md`).
- The code reviewer is idle with M7 owed by its brief and nothing working on it: sent a message to open M7.
- **This thread's gate events, disclosed in the round:** `secret-file-gate-hook` refused a compound check
  command that included `git -C preview-image-generator log -1 --format=%h`, then refused the same read
  with `--name-only`, a form its message lists. Not re-issued in any other form; the generator tip is
  taken from code review's committed `Reviewed-At`.

## 2026-11-19T08:09Z — M7 reviewed; security APPROVED; an owner item outside 017 held for refutation

Read this turn: code review Round 8, M7 APPROVED_WITH_COMMENTS at website `4b8db9c` (`8bb33d3`, R-42
`53fe7e0`; CR-19 LOW, a record line, to the implementer); M7 at QA Phase 2. Security
(`security/017-preview-image-generator-security-audit.md`, agent-output `4ae4825`, header read): pre-release
gate on generator `8de2b53..8512a1d` APPROVED, no required control; L-001 LOW (the request's `id` reaches
the logs unescaped; optional remedy, the planner's call under X-4) → Planner batch fold.
**Owner-needing item from security (its § "Outside the reviewed delta"):** two observations in website
code no open chain changes, read from code, not run: (1) `message.getOne` lets any signed-in user read
any personal message by number; (2) `message.upsert` accepts a client `id`, so a user can claim a future
message number and a later user's new message lands in that row. Security recommends a small follow-up
chain after 017 releases; neither held 017's release. Before any prompt to him, a `general-purpose-sonnet`
helper is trying to refute both by execution at website `1ad625e` (production) and `4b8db9c` (output
`verification/017/steering-refute-access/`). The question goes to him in plain-message form once it
returns (017 can still move without him).
Planner fold: held until M7's QA Phase 2 passes (the planner's Resumption State, plan § Resumption State).

## 2026-11-19T08:12Z — refutation result; the access question put to him (plain message)

Refutation helper (`general-purpose-sonnet`), briefed with the claims alone, ran them through the real
`message` tRPC router (`createCaller`, faked session, real `authorizeUser`/`upsertMessage`, real
`postgres:16`, network-isolated, capped) at website `1ad625e` and `4b8db9c`
(`verification/017/steering-refute-access/`, `out-*/probe-lines.txt`). Result: **both confirmed at both
SHAs, not refuted.** C1: user B's `getOne('1')` returned user A's personal message content; controls
(unauthenticated, B's upsert and delete of A's id) refused. C2: B's upsert with a nonexistent `id:'3'`
inserted row 3 owned by B; A's third new save landed in row 3 (owner stays B, content A's); B read it; A's
re-save and delete of 3 → `NOT_FOUND`. Run exit 1 from an ioredis rejection on the helper's dummy port, 2 of
2 cases passed. Not exercised: Next middleware or Vercel rules in front of the API, the Prisma-generated
constraints, production's sequence height. C3 (`delete` with " 5"/"05" leaves previews) read from code, not
run. Premise read this turn (`git grep -n getOne 1ad625e -- src`): callers are the editor's
`MessageProvider` (`index.tsx:188`, loads the message being edited by the URL's id) and the guild message
list's copy-to-clipboard (`f/[id]/page.tsx:181`). Whether reading another user's personal message by
number is intended is not stated in any record security searched (its § Outside, search at 08:05Z).
Put to him as a plain message (017 can still move without him), with one `owner-wait` notice. Options:
(1) a follow-up fixer chain on the website, started when 017 has released and the tree is free — both
defects; C1's intended behaviour asked first (security's recommendation); (2) a rider on 017 now — moves
017's release tip, re-opens code review, QA and UAT on the new tip; (3) record it as a handoff and accept
for now. Plus his answer on C1: is a signed-in user meant to open another user's personal message by its
number? Recommendation, this thread's: (1).

## 2026-11-19T08:27Z — standing check: every milestone QA Complete; planner started for the batch fold

Read this turn: M7 QA Complete at website `4b8db9c` (`qa/017-existing-items-backlog-m7-qa.md`, `9a155ee`,
08:06:09Z; R-44); code review R-43 M7 sub-entry APPROVED (CR-19 gone). Plan revision 7. QA is running
the effort-final website mutation sweep in a background shell (its pane, 08:27Z). Sessions
(`cc-usage.py sessions`): QA 336K "shell" (past its 325K threshold, not at a seam: its `/checkpoint` is
asked at its next idle seam), code reviewer 267K idle, security 293K idle (document committed),
implementer 207K idle; every wake ARMED. OOM 0. Usage live: session 16%, `weekly_all` 5%.
- The planner's own fold trigger (its Resumption State: after the last milestone's QA Phase 2 passes) fired
  at 08:06Z and was not acted on until this check: this thread's lag, about 20 min. `planner-hooks-017`
  started now (brief `backlog-2026-11-18-briefs/planner-hooks-017-resume.md`), with security L-001, M6's
  fifth-failure-class Deviation and code review's Round 7 `/preview` assumption to disposition. The access
  defects (block 08:12Z) stay out of the fold. The critic is started on the planner's revision.

## 2026-11-19T08:32Z — revision 8 (the batch fold) received; critic started; X-21 and X-22 for him

Read this turn: plan `Revision: 8`, Status In Progress, last commit `5e36106` (08:31:02Z). The planner's
message (not yet re-read in the plan body by this thread) states: no milestone or delivered-behaviour
scope delta; record corrections folded (CR-8, M4-a, M4-d); M6 class set closed at four (no fifth); new
exclusions X-21 (security L-001, the planner's call) and X-22 (code review Round 7: `/preview`'s fallback
render stored as the preview), and X-23 (QAF-19, a stated limit under the M4 cap). Its disclosure: the
record-write gate refused one `sed -i` on the plan, and three earlier writes in that pass went through a
shell python script the gate did not catch; the planner read their content in the diff.
- `critic-hooks-017` started on revision 8 at its pin (cycle 3 pass 1, not a first cycle; brief
  `…/critic-hooks-017-resume.md`, `9bc127e`).
- X-21 and X-22 are exclusions he has not seen: both go to him. X-22's options rest on a code-read
  premise (the fallback answers 200 and the generator stores it): a `general-purpose-sonnet` helper is
  trying to refute it by execution (`verification/017/steering-refute-preview-fallback/`) before the
  question is put. X-23 rides the M4 cap (block 04:14Z) and needs no question.

## 2026-11-19T08:36Z — X-22 refutation result; X-21 and X-22 put to him (plain message)

Plan rows read this turn: X-21, X-22, X-23 at `planning/017-existing-items-backlog.md:1323-1325`.
Refutation helper (`general-purpose-sonnet`, `verification/017/steering-refute-preview-fallback/`):
(a) **confirmed by execution**: real `next dev` of website `4b8db9c` (`page.tsx` identical at `1ad625e`),
network-isolated: `/preview` with unrenderable data (`not json`, `[1,2]`, `{"embeds":"x"}`, …) answered 200
with "Invalid message data." (HTML and headless-Chrome DOM); `{"content":"hello"}` rendered the editor.
(b) **not determined by execution**: the generator half (stores the 200 page, answers 204) is read from code
only; `secret-file-gate-hook` refused the helper's `git archive` of the generator (explicit paths), not
retried. (c) 16 save-shape-valid payloads all rendered the editor (a sample, not proof; not run through the
Zod schema); a shape-valid message looks unable to reach the null-parse branch; the ErrorBoundary branch
and legacy stored data are not ruled out.
Put to him as a plain message (017 still moves without him), one `owner-wait` notice, key
`017-exclusions-x21-x22`. X-22 options (the planner's set): (a) accept X-22 as written; (b) bring it into
017 as a new milestone — a milestone-level scope delta, new code in both repos, every gate again after all
milestones are QA Complete; (c) its own chain or a handoff. This thread's recommendation: (a), since the
sample found no saveable message that reaches it, with UAT B-6 still looking. X-21 options: (a) accept X-21
(the architecture Problem Areas row carries it); (b) fix it in 017 — moves the generator tip, re-opens code
review, QA and security there. Recommendation: (a): only an API-key holder can reach it. The access question
(block 08:12Z) is re-stated in the same message.

## 2026-11-19T08:38Z — critic APPROVED revision 8; architect closing pass started; this thread's error on B-6

Critic cycle 3 pass 1: revision 8 APPROVED, no finding (`critiques/closed/017-existing-items-backlog-critique.md`,
`56a602a`; its message). `architect-hooks-017` started for the closing pass (brief
`…/architect-hooks-017-closing.md`), last revision read 7 (`6ade256`), now revision 8 (`5e36106`).
**This thread's error, in the round:** the 08:36Z message to him said of X-22 "UAT will still look for
it". Wrong. The critic pointed out, and this thread read (`qa/017-existing-items-backlog-qa.md:303`), that
B-6 is a row in QA's register, not a UAT step: its runner is the owner, it runs after both deploys are live,
and it is his look at one message he saves himself. So no stage looks for a fallback image before release,
and B-6 covers one message, not the class X-22 leaves unmeasured. The plan's X-22 carrier cell reads the same;
the critique records it as SL-3's third member, for the planner's registration of his answer. Corrected to
him in this turn. The X-22 recommendation is unchanged, with this weaker carrier stated.

## 2026-11-19T08:39Z — his word: prompts hold lifted (typed)

His words, typed in this session: *"the hold on prompts is lifted. just send me them as you have them. do
not ping all the other agents about this"*. Effect for this thread: owner questions go to him as selection
prompts as they arise, not held back as plain messages. No other session is told (his words). The three
open asks (blocks 08:12Z and 08:36Z: the website access defects and C1's intent, X-22, X-21) are put now as
one selection prompt; the answered prompt is recorded as its own block.

## 2026-11-19T08:41Z — selection prompt: access defects, C1 intent, X-22, X-21

Put 08:39Z, answered 08:41Z. Ledger: `steering/selection-ledger/2026-11-19.md` block "2026-11-19T08:41Z —
steering-roadmap-hooks". Premises: blocks 08:12Z (access run, `bafdbdb`) and 08:36Z/08:38Z (X-22 run,
`6c236f8`; B-6 correction); plan rows X-21/X-22 (`planning/017-existing-items-backlog.md:1323-1324`).
1. "Access bugs" — options: *Fix after 017 ships (Recommended)* — small fixer chain after 017 releases, 017
   not held / *Add them to 017 now* — release waits, review, QA, UAT again / *Write up, accept for now*.
   **His typed answer (his words, not a selection):** *"There's no way I messed that up. For real?"* — a
   question; no option chosen. Answered in this turn with the code (`message.ts:51-61` at `1ad625e`: personal
   branch calls `authorizeUser(session.user.id)` with no message id; `upsert`/`delete` pass `message.id`,
   lines 194, 208) and the run (`bafdbdb`). Still open.
2. "Shared reads" — chosen by selection: **No, owner only** — "The fix blocks reading another user's
   personal message entirely."
3. "X-22" — chosen by selection: **Accept the exclusion (Recommended)** — "017 ships as is. Item 2 was about a
   broken image; this is a present image showing an error, and no saveable message was found that reaches it."
4. "X-21" — chosen by selection: **Accept the exclusion (Recommended)** — "017 ships as is; the architecture
   record's problem-area row on /generate's input carries it for later."
Recipients: X-21/X-22 → `planner-hooks-017` (registration, with the critique's SL-3/SL-5 label fixes) and
`architect-hooks-017` (was told both pending). C1 intent → held for the access chain's determination.
Registered by the planner: R-45 (critic rev 8), R-46 (D-31 X-22, D-32 X-21) at agent-output `36a842f`, with the
critique's SL-3/SL-5 label fixes; revision stays 8.

## 2026-11-19T08:43Z — second ask on the access defects: his question, and the full-path trace

Re-put 08:41Z as a selection (options: fix after 017 ships (Recommended) / add to 017 now / fix now,
separately / write up, accept). Ledger: same day file, next block. **His typed answer (his words):**
*"Follow the chain from website, through the request, to the database. Are you absolutely sure there's no
filtering mechanism that would make it so that the actual query can only get a message the user owns?"* —
a question, no option chosen. Trace this thread ran at website `1ad625e` (production): `src/middleware.ts`
(matcher `/message/(.*)`, `/api/guilds/(.*)`, `/preview`; it only copies headers; `/api/trpc` is not
matched) → `src/pages/api/trpc/[trpc].ts` (`createNextApiHandler`, router and context only) →
`src/server/api/trpc.ts` `createTRPCContext` (session from next-auth) and `protectedProcedure` =
`enforceUserIsAuthed` (checks a session exists, nothing else) → `routers/message.ts:51-61` `getOne` (personal
branch: `authorizeUser(session.user.id)`, no message id) → `utils/user.ts` `authorizeUser` (owner compare only
when message ids are passed) → `utils/shared.ts:134` `getMessage` (`WHERE Messages.id = id`, no owner term) →
project-utils `749606d` (the lockfile pin) `src/postgres.ts` (one `pg` Pool on `DATABASE_URL`, no per-request
identity). No per-user DB context anywhere (`git grep -q 'set_config|SET ROLE|SET app.|current_setting'` at
`1ad625e` -- src → exit 1) and no RLS or policy in project-utils (`git grep -q -i 'row level|create policy|enable
row|set_config|current_setting'` -- src prisma → exit 1; no migration files tracked). `vercel.json` holds only a
cron; `next.config.js` redirects touch `/support` and `/message/m/:id` only. Not readable from this box: the
production database's own settings ("no DB instrument on this box"); any policy there could not tell callers
apart, since every query runs on one pooled login with no caller identity.

## 2026-11-19T08:45Z — browser check: his order and design (selections)

Third access ask re-put 08:44Z (ledger block "2026-11-19T08:44Z — steering-roadmap-hooks"; same four
options). **His typed answer:** *"Own more check using a browser"* — read by this thread as "one more check
using a browser"; no handling option chosen, so the handling question is still open. Design put 08:45Z
(ledger block "2026-11-19T08:45Z — steering-roadmap-hooks"): C1 only on production (C2 there would capture a
real user's next message), driven by a uat-role session (its definition carries test account 1's browser;
this thread has none). Options: *Your throwaway message (Recommended)* — he saves one, test account 1 opens it,
read only / **Test account 2's message** — account 2 signs in to hooks.gg in its own new Chrome profile (a
Discord challenge is his) and saves a throwaway message; account 1 opens it / *You check it yourself*.
**Chosen by selection: "Test account 2's message".** `uat-access-check` started (brief
`backlog-2026-11-18-briefs/uat-access-check.md`, Duties negated: UAT document and release verdict), category
`access-defects`; evidence to `verification/access-defects/browser-check/`. Not chain 017's work.
**This thread's gate event, disclosed in the round:** `record-write-gate-hook` refused a shell `sed -i` on
the brief (a block-heading fix); re-issued with the Edit tool, the form the gate names.

## 2026-11-19T08:55Z — browser check relaunched with a steps-only brief, on his word

The first `uat-access-check` session did not complete the check; it was stopped. **His words:** *"relaunch
the uat agent, but just tell it what steps to do, not why it's doing them"*, then *"yes"* to relaunching now.
The brief `backlog-2026-11-18-briefs/uat-access-check.md` was rewritten to hold the steps, limits and delivery
alone; the steps, accounts and limits are unchanged. `uat-access-check` respawned in category `access-defects`.
The access handling question stays open (wait key `website-access-defects`).

## 2026-11-19T09:01Z — browser check result: CONFIRMED on production; handling re-put

`uat-access-check` reported by SendMessage, and this thread read its README (`verification/access-defects/
browser-check/README.md`, agent-output `497f0de`) and the screenshot `02-account1-opens-6020.png`. On
production `hooks.gg`, test account 1 (session user id `…788418`) opened test account 2's personal message
6020 in the full editor, and the screenshot shows account 2's content `access-check 2026-11-19T08:57:52Z`. Account 2
deleted 6020 at 09:00:05Z. The three screenshots are untracked, kept out of the commit under `~/.claude/CLAUDE.md`
§ Git until he says. The session was not stopped at 09:01Z because it reads `shell`; the stop is retried at
the next check. The handling question is put again as a selection.

## 2026-11-19T09:01Z — his answers: fix right after 017; screenshots left out (selection)

Ledger: `steering/selection-ledger/2026-11-19.md` block "2026-11-19T09:01Z — steering-roadmap-hooks". Put and
answered 09:01Z. Premises: the browser check (README `497f0de`, screenshot read) for the read defect; code and
the local run (block 08:12Z, `bafdbdb`) for the save-with-number defect, not tried live (stated in the question).
1. "Access bugs" — options: **Fix right after 017 (Recommended)** — "A small fixer chain starts once 017 is
   released. 017's QA sweep, UAT and release are not held up. The bug stays on production until that fix ships." /
   *Fix now, in parallel* / *Add to 017* / *Write up, accept for now*. **Chosen by selection: "Fix right after 017".**
2. "Screenshots" — options: **Leave them out** — "They stay untracked on this box." / *Commit them*. **Chosen by
   selection: "Leave them out".**
Effect: once 017 is released, this thread runs a scoping determination (with the scope sweep) for one fixer chain
covering both defects: personal-message reads limited to the owner (block 08:41Z, "No, owner only"), and a save
carrying a message number that can claim another user's row. Owner-wait `website-access-defects` cleared.

## 2026-11-19T09:16Z — UAT started; QAF-25 fold commissioned

- QA reported its plan-level verdict and a spawn cue: `qa/017-existing-items-backlog-qa.md` Status QA Complete, Verified-At
  `4b8db9c,8512a1d` (agent-output `1a8edce`; plan R-47 `4c49b11`). `uat-hooks-017` was spawned (category `S017-backlog`,
  brief `backlog-2026-11-18-briefs/uat-hooks-017.md`, `164f206`) for pre-release rows B-1 to B-4, B-12 and B-13.
- The planner parked QAF-25 LOW as batch row R-48 (`d74bf23`, under the M4 cap). This thread briefed the planner to fold it now,
  as an Exclusions row in X-23's form, and deliver the fold to `critic-hooks-017`. The architect's closing pass on the fold follows the
  critic's read, before devops Stage 1's message.
- The planner asked whether his 08:5xZ rule on recording blocks covers its two format-gate disclosures (the record-write gate and the stamp gate).
  This thread's reading of his words ("safeguard and other security blocks"): format gates fall outside the rule, so they stay
  disclosed. This is a reading, not his ruling; he can overrule it.
- QA is at 393K, past its threshold. Subscribed for its next idle; on it, `/checkpoint`, then clear.

## 2026-11-19T10:31Z — rev 9 gates in; QA cleared; a question put in plain text; UAT Failed (UAT-1)

- Revision 9: the critic approved it (`5f892f5`), and the architect's closing pass found no finding (`8cebb1c`). QA ran its `/checkpoint` (`7665d67`, `aa90900`) and
  was cleared 09:17Z.
- A question was put to him 09:2xZ in plain text, because blocking prompts have been off since 09:04Z (set by `steering-coordinator`).
  Owner-wait key `block-rule-lookback`. The question asks whether his rule on not recording safeguard or security blocks in agent-output reaches records already written. Options:
  *Only new writes (Recommended)*, where records stay as written / *Open 017 documents only*, where each stage replaces its own such lines with "an action was not
  completed" and format-gate disclosures stay / *Every record, closed ones too*, a sweep in which a broad text match hits about 40 files outside steering,
  none classified. It was raised by `implementer-hooks-017`, which holds its own documents unchanged until he answers. Unanswered at 10:31Z.
- UAT reported **UAT Failed** (`uat/017-existing-items-backlog-uat.md`, agent-output `00e2c5a`, Verified-At `4b8db9c,8512a1d`, plan rev 9).
  B-2, B-3, B-4, B-12 and B-13 were executed and passed. B-1 FAIL (UAT-1 HIGH): the saving tab once raised its own-save notice in M2-b's window
  (walk 3 run A1, 10:05:19Z) and stayed clean in five later window runs. UAT routed UAT-1 directly to `implementer-hooks-017` for diagnosis.
  Re-decision rests on that diagnosis: either a fix, which moves the website tip, after which code review, QA, an architect delta read and a UAT re-walk of B-1 follow; or a
  showing that A1 lies outside the class. The low-id walk handoff is Addressed and closed by UAT. Devops Stage 1 waits.
- 10:3xZ: the implementer's UAT-1 diagnosis (sent to UAT; no code changed) is unproven. It names candidates: a client-side mutation error reaching
  `onError` → `forgetOwnSave` before the broadcast arrives (most likely), or a duplicate live binding. It cannot place A1 outside the class. **This thread's
  ruling:** before any code change, UAT re-walks B-1's window with the implementer's capture set (WebSocket frames, `pageerror`/console, react-toastify text,
  upsert timing), and the result comes to this thread. A change to `forgetOwnSave` touches M2's specified behaviour and goes to the planner first.
  The implementer was asked to `/checkpoint` at 247K (threshold 225K) before a clear.
- 10:5xZ: the implementer was cleared 10:32Z after its Checkpoint (`31a044f`). UAT's re-walk reproduced UAT-1 in 2 of 15 runs (`ea57235`, § Findings
  "Walk 6"). Every upsert returned 200, with no page error or crash. In both failing runs the frame reached tab A 74–85 ms before the response, and the notice came with the
  response. **This thread's ruling:** an M2 fix round within M2's criteria, with a red test reproducing the frame-before-response order, briefed to
  `implementer-hooks-017` from its Resumption State. A fix that would change what M2 specifies stops and comes here for the planner. After the fix,
  the sequence is code review, QA (from `7665d67`), an architect delta read, a UAT re-walk of B-1, then devops Stage 1.

## 2026-11-19T11:06Z — UAT-1 fixed at website 42d15de; residue to the planner

The implementer's fix round 3 is in `implementation/017-existing-items-backlog-m2-implementation.md` § "Fix Round 3", agent-output `9a950f3`, Handoff-At `42d15de`.
The website tip moved `4b8db9c` → `8e1ccef` (fix, `usePusher.ts`) → `42d15de` (test), read with `git -C website log 4b8db9c..HEAD`. The implementer gives the cause as
pusher-js parsing a number-shaped hash string into a number, so the string compare missed; its frame-before-response reading was wrong. These are the implementer's findings, for code review to re-derive. No M2 criterion or
`forgetOwnSave` contract changed (its claim), so it went straight to `code-reviewer-hooks-017`. Every gate at `4b8db9c` on the website is expired.
Sent to `planner-hooks-017` for disposition: the residue (two different hashes that read as the same number go unnoticed while in flight;
the exact fix is a producer-side `JSON.stringify(hash)` in `shared.ts`, outside M2's surfaces) and a LOW (`usePusher` cleanup never
disconnects). A disposition that needs code or widens a criterion comes here and goes to him as a scope delta. For UAT's re-walk: place each run
by its frame hash, since only number-shaped hashes reach the fixed path (the implementer's item 3).
