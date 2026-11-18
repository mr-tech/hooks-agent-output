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
