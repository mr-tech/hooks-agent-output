# Rulings — fix-dialog-closes-on-first-portal-load

Fixer chain steered by `steering-roadmap` (cwd `/usr/local/bin/hooks`, no alias). Effort-wide file:
`steering/backlog-2026-11-18-rulings.md` (his commission, the grouping). His word opening this chain
is that file's block "2026-11-18T21:53Z — commission (his words)": *"Do all 5 in whatever order and
group however you determine best."* — item 1 of the five.

## 2026-11-18T21:59Z — scoping determination

He vetoes from this record. No stage has started.

**Shape.** Defect, live on production hooks.gg. No dated outside event. Cause proven by execution:
`analysis/closed/015-bug-evaluation-fixes-upload-dialog-analysis.md` V-1 to V-6 (cited, not
re-read this turn); the production fresh-load failure is UAT's 2026-11-08 walk
(`verification/015/uat/hooksgg-upload-fresh-load.js`, cited). Still present at website
`origin/master` `395510e`: `src/components/AnchoredPopover/Child.tsx:22` builds `FloatingPortal` with
`dynamic(…, { ssr: true })` and no `loading` (this thread's read, 21:3xZ).

**Property** (the defect as behaviour): an open dialog closes itself, or never appears, when
something rendered inside it loads code for the first time in the page's life.

**Sweep** (`verification/fix-dialog-closes-on-first-portal-load/scoping/sweep.md`, a helper's, raw
files beside it; refs website `395510e`, project-utils `749606d`, generator `8de2b53`). The
helper's own read of installed Next 16.1.6 `loadable.js:49`, `hasSuspenseBoundary = !opts.ssr ||
!!opts.loading`, puts its own Suspense boundary on every `next/dynamic` call except one with
`ssr: true` and no `loading`. Of the website's 11 lazy calls, `FloatingPortal` in `Child.tsx:22` is
the only one with neither. Its portal consumers, by the text predicate `portal`: `NewMessageModal`,
`SaveAsMenu`, `Navigation`, `ColorPicker`; the other 17 `AnchoredPopover` importers pass no
`portal`. project-utils and preview-image-generator hold no lazy calls (0 hits each).

**Pipeline: the `fixer` agent.** One defect, one shared file, mechanism and a remedying mutation
already proven. Stage set: **fixer, then code review at its `Handoff-At`; QA Phase 2 if the fix adds
20 or more production lines, otherwise the reviewer also runs the suite and the red test; then
devops for website `master`.** No plan, critic, Phase 1 or UAT. A push of website `master` reaches
production (Vercel; `release-move.js … --dry-run` 21:52Z "workflows none"), so the push **needs his
word**, asked by a devops session. Security: none — the website runs on Vercel, not as root.

**Bounded scope statement.** One defect, repository `website` only.
- In: `src/components/AnchoredPopover/Child.tsx` — the remedy goes there once, for every portal
  consumer, never into one consumer (the handoff, line 37, cites "the owner's standing rule"; that
  rule is not re-read at its source by this thread). Its tests under
  `src/components/AnchoredPopover/__tests__/`. A test that is red on a first portal load inside an
  open dialog, the shape the defect takes in production.
- In, the class catch: the class rule is "no lazily loaded component suspends past its own
  boundary". This chain holds it at its one member; what catches a later breach is in scope — a
  check that fails when a `next/dynamic` call carries neither `loading` nor `ssr: false` (a lint
  rule is the expected form; never a test that reads production source text, Test Conventions).
- In, as verification only: the four portal consumers above — each shown to open on a first load
  (the reviewer or QA decides the instrument); no consumer-specific change.
- Out: the other ten lazy calls (each carries its own boundary by the rule above); `loading.tsx`
  and every layout boundary; the JSON dialog's separate close mechanism (bug evaluation F-19,
  closed by chain 015); the Enter-key class (015 D30 / X-18); `project-utils`,
  `preview-image-generator`.
- Where the handoff and this fence disagree, this fence governs.

**Record the sweep found.** `planning/closed/004-lazy-loading-preload-overhaul.md`,
`analysis/closed/004-lazy-loading-technical-analysis.md` and
`architecture/closed/004-lazy-loading-architecture-findings.md` assert `next/dynamic` has no Suspense
boundary; the installed Next source, as the helper read it, contradicts them. Chain 004 is the
released chain that last shaped these dynamics; chain 015 found this defect (UAT-4). Open carriers on
this route: the handoff above (this chain discharges it). Analysis 014 notes these dynamics were
never mounted in tests.

**End.** Then devops for website `master` (production; his word). The fix is user-visible: the
fixer's **User-visible flows** list is quoted to him with the release. A production look after the
push is an agent's (the test Discord account, `discord-test-browser` skill), named in devops's brief.

**Not covered by the sweep.** The behaviour of `loading.tsx` boundaries; `next/dynamic` read from the
working tree's `node_modules`, not a ref; JSX render sites (the import graph over-approximates;
`Navigation`'s dialog host not visible); aliased `dynamic` imports, React 19 `use()`,
`startTransition` loads; the record's open `planning/`, `verification/`, `steering/`; the production
evidence not re-run. Four helper commands were refused by the secret-file gate (named
`preview-image-generator/.github/workflows/prod.yml`) and not retried.

**Branch.** `fix/dialog-closes-on-first-portal-load`, cut by this thread from website
`origin/master` `395510e` with no upstream, recorded below once cut.

## 2026-11-18T22:00Z — branch cut

`git -C website switch --no-track -c fix/dialog-closes-on-first-portal-load origin/master` after
`git fetch origin`: before `master` at `395510e97f82a5177d5edbb38b5d44858f745f3d` (= `origin/master`),
after `fix/dialog-closes-on-first-portal-load` at the same commit, no upstream
(`rev-parse --abbrev-ref @{u}` → "no upstream configured"). `git status --porcelain` captured before
and after: `cmp` identical; tracked changes 0 (`grep -c -v '^??'`), untracked entries left alone.
Same commit, so no lockfile difference across the switch.

## 2026-11-18T22:22Z — fixer handoff received; code reviewer started

- Fixer message: handed off at website `1ad625e`; document
  `implementation/fix-dialog-closes-on-first-portal-load-implementation.md` (record `4360a16`, header
  read: `Status: Active`, `Handoff-At: 1ad625e — repos=website`). Branch HEAD `1ad625e`, 0 tracked
  changes (`git status --porcelain`, `grep -c -v '^??'`).
- `git diff --numstat 395510e 1ad625e`: `Child.tsx` 6/4, `.eslintrc.json` 7/1, one new test 73/0.
  Production lines (GLOSSARY): 6, `Child.tsx` only; lint configuration is none. Route: code review
  alone, the reviewer running the suite and the red test. No QA Phase 2.
- Earlier the same round (22:1xZ), the fixer answered this thread's lint pointer: the lint command
  starts in the shared tree's install (`verification/fix-dialog-closes-on-first-portal-load/lint-script-argv-dryrun.*`),
  so its class catch has an instrument; independently confirmed by chain 017's refutation helper
  (`steering/017-rulings.md`, block 22:18Z). This thread sent no reply.
- `code-reviewer-fix-dialog-closes-on-first-portal-load` started with `tmux-agent spawn` (category
  `fix-dialog-closes-on-first-portal-load`, cwd website, effort medium as printed); brief
  `steering/backlog-2026-11-18-briefs/code-reviewer-fix-dialog-closes-on-first-portal-load.md` at
  `7ec4f6c`, carrying the fixer's mock hazard (the red test maps `next/dynamic` to
  `next/dist/api/app-dynamic`).
- The fixer lodged an `INBOX.md` entry (suite-wide `next/dynamic` under vitest), uncommitted per the
  inbox rule; this record's owning session processes it.

## 2026-11-18T22:29Z — code review APPROVED_WITH_COMMENTS at `1ad625e`; devops started

- Reviewer message (spawn cue). Review `code-review/fix-dialog-closes-on-first-portal-load-code-review.md`
  at agent-output `6016a46`, header read: `Reviewed-At: "1ad625e — repos=website"`, `Status: In
  Review`, `Round: 1`, `Verdict: APPROVED_WITH_COMMENTS`. Its Assumption Not Checked (Round 1): a real
  browser keeps the dialog open on its first portaled popover; owner: devops's production look after
  the deploy, on a fresh page load.
- Non-gating finding CR-1 MEDIUM (the red test discriminates only as its file's first case) has a
  destination: `handoff/anchored-popover-first-load-test-is-order-dependent-2026-11-18.md`
  (tracked at `HEAD`, `git cat-file -e`).
- `release-move.js /usr/local/bin/hooks/website master 1ad625e… --dry-run`, 22:29Z: exit 0,
  "ff-from-remote ok; sibling serving refs (none)", "workflows none".
- `devops-fix-dialog-closes-on-first-portal-load` started with `tmux-agent spawn` (category
  `fix-dialog-closes-on-first-portal-load`, cwd website, effort high as printed); brief at `789d7ae`.
  The production push is its Phase 2B ask to him in its own session; this thread puts no release
  prompt while it is live.

## 2026-11-18T22:43Z — released on his selection; production look started

- **His answer** (devops's Phase 2B selection prompt, in its session): "Agent: push master to 1ad625e
  (Recommended)" — selection-ledger day file `steering/selection-ledger/2026-11-18.md`, block
  "2026-11-18T22:41Z — devops-fix-dialog-closes-on-first-portal-load", `answer:` line 29; the question
  quoted the fixer's User-visible flows (lines 12-16).
- **Release read by this thread, 22:4xZ:** `git ls-remote origin master` → `1ad625e2161b…`; website
  tree on `master` at `1ad625e`, 0 tracked changes; no `fix/dialog*` branch left. Deployment record
  `deployment/closed/fix-dialog-closes-on-first-portal-load-deployment.md` `Status: Released`
  (agent-output `31f5e75`). Implementation `Released`, code review `Committed`, both under `closed/`
  (devops's statement; the review's `Committed` read at 22:34Z).
- **Production look not done by devops:** that session holds no `mcp__playwright__*` tools. It
  re-routed the handoff's `Owning-Stage` to a session holding the test-account browser. This thread
  started `uat-fix-dialog-closes-on-first-portal-load` (`tmux-agent spawn`, category
  `fix-dialog-closes-on-first-portal-load`, cwd website, effort medium as printed; brief at `9e6606e`,
  duties negated: the UAT document). Its rows go in the handoff's changelog; this thread closes the
  handoff Addressed on a pass. Precedent: the 2026-11-11 post-deploy check of
  `fix-website-save-gate-embeds` (`steering/queue-hooks-rulings.md`). Grant file for the browser
  exists (`ls -d ~/.claude/state/discord-test-browser.granted`).
- **CR-3 INFO** (the lint rule fires only where ESLint is run): routed to `planner-hooks-017` by
  message for plan 017's lint item (OQ-6); destination recorded in the review (line 145) and the
  deployment record (line 130).
- **Retrospective cue** (devops): counted toward this thread's fixer batch, not acted on alone. The
  effort is not closed out while the handoff's post-deploy row is open. Chain sessions stay up until
  the look's result (a FAIL brings the fixer back).
- The website tree is free of chain A; chain 017's branch is cut at its implementation start.
