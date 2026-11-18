# Rulings — 017 (Hooks.gg backlog items 2 to 5)

Planned chain steered by `steering-roadmap` (cwd `/usr/local/bin/hooks`, no alias). Planner session:
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
