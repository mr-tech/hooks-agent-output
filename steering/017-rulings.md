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
