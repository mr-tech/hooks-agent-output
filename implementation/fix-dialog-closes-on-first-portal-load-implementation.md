---
ID: n/a
Origin: fix-dialog-closes-on-first-portal-load
UUID: 3887600d
Status: Active
Status-Detail: "Handed off to code review at website 1ad625e. No QA Phase 2: 6 production lines added (git diff --numstat 395510e 1ad625e, Child.tsx), so the reviewer also runs the suite and the red test. Then devops for website master (production; the owner's word)."
Handoff-At: 1ad625e — repos=website
Origin-Chain: none
---

# fix-dialog-closes-on-first-portal-load — implementation

## Scope statement

From the scoping determination, `steering/fix-dialog-closes-on-first-portal-load-rulings.md`, block
"2026-11-18T21:59Z — scoping determination". It was relayed by `steering-roadmap` in
`steering/backlog-2026-11-18-briefs/fixer-fix-dialog-closes-on-first-portal-load.md` and the common
part `steering/fix-dialog-closes-on-first-portal-load-brief-common.md`. Route: the owner's commission,
`steering/backlog-2026-11-18-rulings.md`, block "2026-11-18T21:53Z — commission (his words)", item 1:
*"Do all 5 in whatever order and group however you determine best."*

> **Property**: an open dialog closes itself, or never appears, when something rendered inside it
> loads code for the first time in the page's life.
>
> One defect, repository `website` only.
> - In: `src/components/AnchoredPopover/Child.tsx`. The remedy goes there once, for every portal
>   consumer, never into one consumer. Its tests go under `src/components/AnchoredPopover/__tests__/`:
>   a test that is red on a first portal load inside an open dialog.
> - In, the class catch: "no lazily loaded component suspends past its own boundary". A check that
>   fails when a `next/dynamic` call carries neither `loading` nor `ssr: false` (a lint rule; never a
>   test that reads production source text).
> - In, as verification only: the four portal consumers (`NewMessageModal`, `SaveAsMenu`,
>   `Navigation`, `ColorPicker`). The reviewer or QA decides the instrument. No consumer-specific
>   change.
> - Out: the other ten lazy calls; `loading.tsx` and every layout boundary; the JSON dialog's close
>   mechanism (F-19); the Enter-key class; `project-utils`, `preview-image-generator`.

Discharges `handoff/upload-message-dialog-closes-on-first-portal-load-2026-11-08.md` at release. Its
closure (`Addressed`) belongs to the discharging stage or steering once the fix is live, and is not
done here.

## Entry Conditions

| # | Condition | Evidence |
|---|---|---|
| 1 | Scoping determination | `steering/fix-dialog-closes-on-first-portal-load-rulings.md`, block 2026-11-18T21:59Z, names the `fixer` agent; relayed in the brief above |
| 2 | Bounded scope statement | Quoted above from the same block |
| 3 | Fix branch | `git -C website branch --show-current` → `fix/dialog-closes-on-first-portal-load` at session start, HEAD `395510e97f82a5177d5edbb38b5d44858f745f3d` (rulings block 22:00Z: cut from `origin/master`, no upstream). Never switched by me. |
| 4 | Record on the mechanism | `analysis/closed/015-bug-evaluation-fixes-upload-dialog-analysis.md` V-1 to V-6 (read whole) and `verification/015/upload-dialog/`; the carrier handoff above; the sweep `verification/fix-dialog-closes-on-first-portal-load/scoping/sweep.md`. `architecture/system-architecture.md` and `architecture/website.md` carry no Problem Area for it (brief common part). The chain 004 records assert that `next/dynamic` has no Suspense boundary; re-derived below, the installed source contradicts them for this call shape. |

## Diagnosis

**Cause.** `Child.tsx:22` at `395510e`:
`dynamic(() => import('@floating-ui/react').then((mod) => mod.FloatingPortal), { ssr: true })`.
- In the App-router build, `next/dynamic` is `next/dist/api/app-dynamic`: Next 16.1.6
  `dist/build/create-compiler-aliases.js:227`, read from the working tree's `node_modules`.
- That module calls `lazy-dynamic/loadable.js`. Its line 49 is
  `hasSuspenseBoundary = !opts.ssr || !!opts.loading`, so this call renders `Fragment` around a
  `React.lazy`, with no Suspense of its own. This re-derives hazard 3: the helper's read holds, and
  the chain 004 claim does not hold for `ssr: true` without `loading`.
- `renderPortal` mounts `<FloatingPortal>` on the render after `useMounted` flips, a passive-effect
  update, not a transition. On the page lifetime's first such render, the lazy read suspends to the
  layout or Providers boundary (`src/app/_components/Providers.tsx:53`).
- React hides that boundary's host nodes with `display: none`, the Headless UI dialog's portal host
  included.
- In a browser, Headless UI 2.2.9 `useOnDisappear` then sees a zero rect and calls `onClose`. That
  is analysis V-2, measured in Chrome and not re-run here. jsdom has no `ResizeObserver` or
  `IntersectionObserver`, so that hook is inert in the suite: the absence is visible, not faked.

**Instrument.** The red test below, run under the App-router `next/dynamic`. It records React
writing `display: none` on `<div data-headlessui-portal>`, the host of the open dialog
(`red-run.txt`). This is V-3, reproduced in the suite.

**Environment finding (hazard 1, re-derived).** Under vitest, `next/dynamic` resolves to the
Pages-router `dist/shared/lib/dynamic.js` (`node_modules/next/dynamic.js`). That module has no
`React.lazy` and never suspends, so without an alias the test passes against the defective code:
`controls/alias-control.txt`, the old lazy `Child.tsx` with the alias removed, 2 of 2 passed, exit 0.
The test therefore mocks `next/dynamic` to `next/dist/api/app-dynamic`, the module production's
compiler substitutes. The suite-wide consequence is outside this scope and routed to `INBOX.md`
(entry 2026-11-18, this session).

**Why `@floating-ui/react` loads no new code at that point.** `Child.tsx` imports `./utils`, which
statically imports `autoUpdate`, `useFloating` and others from `@floating-ui/react`
(`utils.tsx:1-7`). The lazy wrapper therefore split nothing off. It only added a suspension: the
`import()` promise is pending on its first read even with the module already evaluated.

**Consumers of the resolved value.** `FloatingPortal` in `Child.tsx` has one reader,
`renderPortal` (`Child.tsx:31` at the fix). The guards that decide whether it is used,
`isMounted && isPortal` and `root ?`, are unchanged. The portaled `AnchoredPopover.Child` sites, by
`grep` of `portal` beside `AnchoredPopover.Child` / `Dropdown` outside `__tests__`, match the sweep:
- `NewMessageModal.tsx:419`
- `SaveAsMenu.tsx:149`
- `Navigation.tsx:371`
- `ColorPicker/index.tsx:41`

`ActionsMenu.tsx:4` imports `FloatingPortal` statically already (the sibling pattern).

**Base vs fix.**
- At base, the first portaled popover in a page lifetime suspended the whole boundary: the fallback
  (`LoadingDots`) showed and every open dialog was hidden, then closed.
- At the fix, the portal renders on that same render with no suspension.
- Server render is unchanged: `renderPortal` uses `FloatingPortal` only once `isMounted`, which is
  false on the server.
- No behaviour appears at the fix that base lacked except the absent suspension.

**Residue in production (escaped defect).** The failing path writes nothing. The dialog closes
before any field is used, so no save, no tRPC mutation and no Pusher event runs; that is analysis
V-1, "nothing is saved", read from the code path: `NewMessageModal`'s writes run only from its
Save/Continue handlers. No stored state carries over.

**Release form.** A Vercel deploy of website `master` serves the new client bundle to every page
load after it. A tab already open keeps the old bundle until it reloads. Who checks the live state:
an agent with the test Discord account, named in devops's brief (determination, "End"). No
production data or provider state is involved.

**Origin-Chain.** `git log -S"mod.FloatingPortal"` → `fae733f` (2023-02-28, "src dir refactor"),
before any chain, so `none`.

## Change

At website `1ad625e` (`git diff --numstat 395510e 1ad625e`):
- `src/components/AnchoredPopover/Child.tsx` (+6 −4):
  - `FloatingPortal` is imported statically from `@floating-ui/react`, replacing the `next/dynamic`
    wrapper and the `dynamic` import.
  - The `classNames(…)` line at old line 128 is wrapped over 5 lines. It is pre-existing, but
    `convention-check.js --since=395510e` FAILs a touched file on its `max-len`. Behaviour-neutral.
- `.eslintrc.json` (+7 −1), the class catch: `no-restricted-syntax` goes from `off` to one selector.
  It flags `dynamic(…)` when no direct `ObjectExpression` argument holds a `loading` property or
  `ssr: false`. Its message names the reason and both remedies.
- `src/components/AnchoredPopover/__tests__/Child.portal-inside-open-dialog.test.tsx` (+73, new).

**Remedy choice, agent-authored.** I chose the static import over the analysis's
`loading: () => null`:
- the wrapper loaded no code that was not already in `Child.tsx`'s static graph (Diagnosis);
- the sibling `ActionsMenu.tsx` imports `FloatingPortal` statically;
- with `loading`, the first open renders a null frame in place of the popover, which the brief lists
  as unchecked.

Bundle size was not measured. The claim that this adds no chunk weight rests on the static import
in `utils.tsx`, not on a build.

**Production lines added:** 6 (`Child.tsx`; lint config and tests are not production lines). Under
20, so no QA Phase 2.

**Irreversible side effects:** none added. **Lifetimes:** none added. **Declined work:** none.

## Test

`src/components/AnchoredPopover/__tests__/Child.portal-inside-open-dialog.test.tsx`, spec-form, dom
project. The test mounts the real `PresetDialog` (Headless UI `Dialog`) holding a real
`<Dropdown portal>`, opens it with a click, and `next/dynamic` is mocked to the App-router module.
- **Case 1**, "opening the dialog never hides it while the portaled popover renders for the first
  time": a `MutationObserver` (jsdom's own) records any element containing the dialog's title whose
  style becomes `display: none`. The record must be empty, and the `aria-modal` dialog must still
  hold the title.
- **Case 2**, "renders the popover into a portal outside the dialog panel": the
  `[data-floating-ui-portal]` node is not inside the `aria-modal` dialog, and its parent is `body`.
  This guards the fix's own change of how `FloatingPortal` resolves.

**Invented values (Iron Law 5).** The outer `<Suspense>` stands in for the Providers or layout
boundary. If it were wrong (no boundary in production), React would suspend at the root instead,
and case 1 would record no hide at base. That did not happen. `~/env.mjs` is mocked as the sibling
tests mock it, and is not on the path under test.

**Module-cache state (hazard 2).** Case 1 is the file's first render of `Child.tsx`, and vitest
isolates module state per file. Case 2 needs no first load. At the fix there is no lazy state at
all.

**Wait.** `waitForFloatingPortal` flushes `act` at most 50 times, awaiting
`import('@floating-ui/react')`. There is no timer; `convention-check` reports 0 CANDIDATE.

| Run | Tree | Result | Capture (under `verification/fix-dialog-closes-on-first-portal-load/`) |
|---|---|---|---|
| Red | working tree at `395510e` + the test (pre-lint text) | case 1 failed: `["<div data-headlessui-portal style>"]` not `[]`; exit 1 | `red-run.txt` |
| Red, final test text | export of `1ad625e`, mutant `restore-lazy-floating-portal` | KILLED; only case 1 failed, same hidden host | `controls/out/*mutant-1.*`, `controls/mutants.json` |
| Green | working tree after the fix | 2 of 2 passed, exit 0 | `green-run.txt` |
| Green at commit | `1ad625e`, full suite | below, Verification | `suite-fix-1ad625e.{json,txt,exit}` |

**Negative controls** (`python3 ~/.claude/tools/mutation-run.py --sha 1ad625e --dep node_modules`,
each in its own export; control run 2 of 2 passing; table `controls/out/mutation-table-*.json`):
- `portal-into-dialog-panel` (`FloatingPortal root` = the `aria-modal` dialog): KILLED, case 2
  only, `expected <div class="relative z-10" …> to be null`. This is case 2's control; it passed at
  the red run.
- `no-portal` (`renderPortal` returns `children`): KILLED, both cases.
- Alias necessity: detached worktree of `1ad625e` with base `Child.tsx` and the `next/dynamic` mock
  line deleted gives 2 of 2 passed (`controls/alias-control.txt`). That is the value the test
  chooses, shown necessary. The worktree was removed after the run (`git worktree list` shows the
  main tree only).
- The lint rule: ESLint's Node API, `lintText` with the tree's own config, no file written
  (`controls/lint-rule-control.cjs`, `.out`):

  | Input | Flagged |
  |---|---|
  | base `Child.tsx` | line 22 |
  | fixed `Child.tsx` | none |
  | no options | yes |
  | `ssr: true` | yes |
  | `ssr: false` | no |
  | `loading` | no |
  | `loading` only inside the loader | yes |

  The two exclusion clauses (`loading`, `ssr: false`) are each shown deciding. An earlier selector,
  `:has(> A > B)`, over-fired on all ten siblings: esquery 1.7 does not match a two-level relative
  `:has`. That was caught by the full-tree lint and replaced by the nested one-level form. The
  esquery probe script was a scratchpad file and is not kept.

## Verification

- **Existing tests**: `npx vitest run --reporter=json`.

  | Tree | Files | Passed | Total | Exit | Capture |
  |---|---|---|---|---|---|
  | `395510e` | 122 | 1506 | 1506 | 0 | `suite-base-395510e.{json,txt,exit}` |
  | `1ad625e` | 123 | 1508 | 1508 | 0 | `suite-fix-1ad625e.{json,txt,exit}` |

  By path membership, the only file added is the new test, and none is missing.
- **Build verification**: the workspace `CLAUDE.md` names no pinned-build script for `website`. Its
  named check is `pnpm run typecheck` (both tsc programs): exit 0 at `1ad625e`
  (`typecheck-1ad625e.txt`). `next build` was not run. No package-manager operation ran;
  `pnpm-lock.yaml` is untouched.
- **Lint**: the repo's `lint` script is `eslint --fix . --max-warnings=0`, and `--fix` would rewrite
  the shared tree. So:
  - `npx eslint . -f json` at `1ad625e`: 454 files, 314 errors, 367 warnings, all pre-existing
    classes. 0 `no-restricted-syntax` findings tree-wide (hazard 4: no finding beyond the fixed
    site), 0 findings in `Child.tsx` or the new test (`lint-fix-1ad625e.{json,exit}`).
  - The script's own argv with `--fix-dry-run`: ESLint 8.57.1 starts and exits 1 on findings, with
    no plugin-uniqueness error; tree status identical before and after (`lint-script-argv-dryrun.{json,exit}`, `status-{before,after}-lintprobe.txt`).
  - This bears on plan 017 OQ-6. Its exit-2 capture was taken in an export, not the shared tree;
    answered to `steering-roadmap` by SendMessage this session, and not mine to settle.
  - `Trigger.tsx:66` `max-len` is a file this fix does not touch.
- **Convention check**: `node ~/.claude/tools/convention-check.js website --since=395510e` gave
  0 FAIL, 0 CANDIDATE.
  - The first run had 1 FAIL (`Child.tsx` `max-len`, fixed by the wrap above) and 1 CANDIDATE (a
    `setTimeout` poll, replaced) (`convention-check.txt`, the first run; the clean rerun was read in the session and not captured).
  - **SKIP, unchecked by the tool**: the ID-token check ("states an ID-token class this checker does
    not implement verbatim"). Read by hand: the basename `Child.portal-inside-open-dialog.test.tsx`,
    the describe and it titles, and the file has no comment lines. None carries an ID token.
  - `.eslintrc.json` is SKIPped as `.json`; it is covered by the lint control above.
- **Comment gate**: my first write of the test carried one prose comment, and the PostToolUse
  comment gate refused it. I removed the comment and moved its content to "Invented values" above;
  that is satisfying a gate, disclosed here.

## User-visible flows

- **Message folder → "new message" → "Upload Message"** on a fresh page load: the "Create or upload
  a new message" dialog opens and stays open, and its "Save To" server dropdown opens.
- **Message editor → "Save As" dialog** (`SaveAsMenu`), as the first popover of a page load: the
  dialog stays open and its "Save To" dropdown opens.
- **Message editor top bar menus** (File and the other `Navigation` menus): the menu opens on its
  first use in a page load without the page flashing to the loading dots.
- **Embed editor → colour picker**: opens on its first use in a page load without the page flashing
  to the loading dots.

## Handoff

- **SHA**: website `1ad625e` on `fix/dialog-closes-on-first-portal-load` (no upstream).
- **Reviews**: `code-reviewer-fix-dialog-closes-on-first-portal-load`. With 6 production lines there
  is no QA Phase 2, so the reviewer also runs the suite and the red test (determination). The red
  test needs its `next/dynamic` mock: without it, it passes on the defect (Test).
- **The four consumers, verification only**: instrument per the determination, the reviewer's or
  QA's. I did not walk them in a browser.
- **Merges**: devops, website `fix/dialog-closes-on-first-portal-load` into `master` at release. The
  push reaches production (Vercel) and takes the owner's release approval, asked by a devops
  session. A production look after the push establishes the fix live (hazard 5).

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-18T22:21 | fixer (fixer-fix-dialog-closes-on-first-portal-load) | Created. Diagnosis, red/green, controls and verification at website `1ad625e`; handed off to code review. |
