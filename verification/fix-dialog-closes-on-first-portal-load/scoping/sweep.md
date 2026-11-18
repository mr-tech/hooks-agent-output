# Scoping sweep: dialog closes or never appears on a lazy component's first load

Read-only. No source file in any repository was changed. The only file written is this one, plus the raw evidence files copied into this directory.

PROPERTY (as stated by the requester): an open dialog or modal closes itself, or never appears, when something rendered inside it loads code for the first time in the page lifetime (a lazily loaded component that suspends).

## 1. Remote refs read

| Repo | Ref | SHA (`git -C <repo> rev-parse`) |
|---|---|---|
| website | origin/master | 395510e97f82a5177d5edbb38b5d44858f745f3d |
| project-utils | origin/master | 749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f |
| preview-image-generator | origin/prod | 8de2b5337179623f7fbd82904221078c2930214a |

`git -C <repo> fetch origin` ran first for all three repos.

Remote-ref trees were read in two ways: `git -C <repo> grep -n -E <pattern> <ref> -- ':!.github' ':!*.env*'` (all predicates), and `git -C website archive origin/master -- src tsconfig.json package.json | tar -x -C <scratch>/web` (for the import graph). Scratch is `/tmp/claude-1000/-usr-local-bin-hooks/c585f1cc-46f7-4c7e-9544-cfd7f3c5726c/scratchpad`.

## 2. Hook refusals (disclosed in the round they occurred)

The `secret-file-gate-hook` refused four Bash calls. Each refusal named `/usr/local/bin/hooks/preview-image-generator/.github/workflows/prod.yml`. None of the four calls was aimed at that file.

1. `git -C preview-image-generator archive origin/prod | tar -x ...` was refused as a chained call with the website and project-utils archives. The preview archive was not retried. Preview coverage relies on `git grep` (with the pathspec exclusions) and on `git ls-tree`, which listed no UI or framework source.
2. A grep over the extracted website `src` tree that printed lines (`grep -rnE ... $(cat ...)` with a `grep -v` stage) was refused. Not retried in that form.
3. A batch of `grep -rc ... | grep -v ':0$' | sed` and `grep -rl` counts over the extracted tree was refused. Not retried.
4. A final batch of `grep -c` and `grep -rl` counts was refused. Not retried.

Consequences: the count of `import(` outside tests was not split (see section 7). Every other count in this file came from a command that ran before the refusals, and the command is shown next to it.

## 3. Predicates and counts

Every count is a line count of the output of the command shown (`wc -l` or `grep -c ''` on the saved file), or a file count from `grep -l`.

| Predicate | Command | website origin/master | project-utils origin/master | preview-image-generator origin/prod |
|---|---|---|---|---|
| Lazy: `dynamic(`, `React.lazy`, `lazy(` | `git -C <repo> grep -n -E "dynamic\(\|React\.lazy\|\blazy\(" <ref> -- ':!.github' ':!*.env*'` then `wc -l` | 14 lines (saved as `raw-lazy-website.txt`) | 0 | 0 |
| Lazy calls that are real (not comments) | read from the 14-line output: 11 real calls, 3 comment lines in `__tests__` | 11 | 0 | 0 |
| Suspense | `git grep -n -E "Suspense"` then `wc -l` | 9 lines (`raw-suspense-website.txt`) | 0 | 0 |
| `loading.tsx` files | `git -C <repo> ls-tree -r --name-only <ref> \| grep -E '(^\|/)loading\.(tsx\|ts\|jsx\|js)$'` | 1: `src/app/message/loading.tsx` | 0 | 0 |
| Dialog / modal / portal words | `git grep -n -E "(Dialog\|Modal\|Drawer\|headlessui\|react-modal\|radix-ui/react-dialog\|showModal\|createPortal\|FloatingPortal\|FloatingOverlay\|Portal)"` then `wc -l` | 246 lines (`raw-dialog-website.txt`) | 0 | 0 |
| Dynamic-import sites `import(` (all, tests included) | `git grep -n -E "import\("` then `wc -l` | 116 lines (`raw-dynimport-website.txt`) | 0 | 0 |
| Lazy-consumer list | `git grep -n -E "components/dynamics/\|from '\.\./dynamics\|from '\./dynamics\|dynamics/"` then `wc -l` | 27 lines (`raw-dynamics-consumers-website.txt`; includes 3 test-file mocks) | n/a | n/a |

Zero counts in project-utils and preview-image-generator are consistent with their file lists. `git ls-tree -r --name-only` shows project-utils has 27 tracked files (12 `.ts`/`.js` source under `src/` and `dist/`, e.g. `src/index.ts`, `src/postgres.ts`, `src/env.js`) and preview-image-generator has 15 tracked files (`src/config.ts`, `src/generateImage.ts`, `src/getPool.ts`, `src/server.ts`, `package.json`). The file lists show no UI or framework source. Content was searched only with the predicates above.

## 4. Lazy components (website origin/master) by consumer

Columns: **Loading option** is the presence of `loading:` in the `dynamic(` call. **Own Suspense (Next source)** is what `next` 16.1.6 does with the option, read from the installed package (see section 5). **Own Suspense (text)** is whether any `Suspense` appears in the consumer or lazy file; none does. **Inside a dialog?** is "direct" when the consumer file renders a dialog primitive around the lazy render, and "import chain" when a dialog host file is reachable by importers (section 6), which does not prove the render.

| # | Lazy target (file:line) | ssr | Loading option | Own Suspense (Next source) | Own Suspense (text) | Consumers (file:line) | Inside a dialog? |
|---|---|---|---|---|---|---|---|
| 1 | `NewMessageJsonInput` (`app/message/_components/NewMessageModal.tsx:45`, `dynamic(() => import('./NewMessageJsonInput'), { ssr: false })`) | false | no | yes (`!ssr`) | no | `NewMessageModal.tsx:341` (tab config object, rendered inside `PresetDialog` 199-454) | direct |
| 2 | `JsonModalBody` (`app/message/m/[id]/_components/JsonMenu.tsx:10`) | true | yes (`LoadingDots`) | yes (`loading`) | no | `JsonMenu.tsx:35` (inside `PresetDialog` 28-39) | direct |
| 3 | `FloatingPortal` (`components/AnchoredPopover/Child.tsx:22`, `dynamic(() => import('@floating-ui/react').then(...), { ssr: true })`) | true | **no** | **no** (`Fragment`) | no | `Child.tsx:33` `renderPortal` (only when `isMounted && isPortal`). Portal consumers: see section 5 | see section 5 |
| 4 | `Picker` (`components/EmojiPicker/Root.tsx:17`) | true | yes (`PickerSkeleton`) | yes | no | `Root.tsx:68`; `EmojiPicker/index.tsx` imports Root | import chain: `DiscordContentEditor/{Desktop,Mobile}.tsx`, `EmbedField.tsx`, `ComponentEditor.tsx`, `EmbedEditor/index.tsx`, `edit/page.tsx` |
| 5 | `Calendar` (`components/dynamics/Calendar.tsx:3`) | true | yes (`null`) | yes | no | `EmbedFooter.tsx:13`; `utils/markdown/components/MarkdownTimestamp.tsx:9` | import chain (EmbedEditor, `edit/page.tsx`, `NewMessageModal` via MessagePreview) |
| 6 | `DiscordMessageEditor` (`dynamics/DiscordMessageEditor.tsx:5`) | true | yes (`LoadingDots`) | yes | no | `m/[id]/edit/page.tsx:20`; `MessagePreview.tsx:8` | import chain (`edit/page.tsx`, `NewMessageModal`) |
| 7 | `ImageUploader` (`dynamics/ImageUploader.tsx:3`) | true | yes (`null`) | yes | no | `Author.tsx:12`; `EmbedAuthor.tsx:14`; `EmbedFooter.tsx:14`; `EmbedImage.tsx:6`; `EmbedThumbnail.tsx:6`. Target itself renders `PresetDialog` (`components/ImageUploader.tsx:91`) | direct for the target; import chain for consumers |
| 8 | `Markdown` (`dynamics/Markdown.tsx:3`) | false | yes (`null`) | yes | no | `DiscordContentEditor/Desktop.tsx:15`; `Mobile.tsx:15`; `index.tsx:13`; `EmbedField.tsx:10`; `EmbedTitle.tsx:9` | import chain |
| 9 | `SlateEditor` (`dynamics/SlateEditor.tsx:3`) | true | yes (`null`) | yes | no | `DiscordContentEditor/Desktop.tsx:6`; `Mobile.tsx:7` | import chain |
| 10 | `ToastContainerWrapper` (`dynamics/ToastContainerWrapper.tsx:3`) | true | yes (`null`) | yes | no | `app/message/layout.tsx:8` (rendered at line 16, layout level) | no dialog host in import chain |
| 11 | `Tooltip` (`dynamics/Tooltip.tsx:7`) | true | yes (`null`) | yes | no | `Button.tsx:12`; `TextField.tsx:9`; `ContainerEditor.tsx:33`; `SectionEditor.tsx:24`; `CustomCategoryItem.tsx:6` | import chain (`Button` is imported by NewMessageModal, Sidebar, SaveAsMenu, edit page, ConfirmationDialog) |

The three remaining `dynamic(` lines are in `__tests__` comments (`NewMessageModal.persist-gate-wiring.test.tsx:41,63`, `NewMessageModal.readable-mutation-error.test.tsx:41`) and are not calls.

Eleven real lazy calls: four inline in components (rows 1-4) and seven in `dynamics/` barrel files (rows 5-11).

Self-markers in the lazy targets (`grep -c` for dialog or portal JSX): `components/ImageUploader.tsx` 1, `components/Tooltip.tsx` 1, `components/ToastContainerWrapper.tsx` 1, `components/EmojiPicker/Picker/index.tsx` 1 (`BottomPortal`), `components/DiscordMessageEditor/index.tsx` 0, `components/SlateEditor/index.tsx` 0, `components/Calendar/index.tsx` 0, `components/Markdown.tsx` 0, `app/message/m/[id]/_components/JsonModalBody.tsx` 0.

Suspense boundaries in the app tree (`raw-suspense-website.txt`): `src/app/layout.tsx:62` wraps `{children}` and `CookieConsent`; `src/app/_components/Providers.tsx:53` wraps `GuildProvider` and its children; `src/app/preview/page.tsx:36` wraps a preview subtree. `src/app/message/loading.tsx` exists and no other `loading.tsx` file is in the app tree. No lazy consumer contains its own `Suspense` in text.

## 5. The FloatingPortal path

`src/components/AnchoredPopover/Child.tsx` lines 26-33 (read from `origin/master`):

```
function renderPortal(...) { ... if (isMounted && isPortal) { ... return root ? <FloatingPortal>{children}</FloatingPortal> : children; } ... }
```

So `FloatingPortal` only renders when a `portal` value is passed to `AnchoredPopover.Child`.

`components/Dropdown.tsx` passes `portal` through from its own prop (`portal?: boolean`, default `undefined`, line 121 and 164).

Files that import `AnchoredPopover` or `Dropdown` (`grep -rl` over the extracted tree, 23 files, saved as `anchored-importers-l.txt`), with a `portal` term count (`grep -rc -E "portal"`, saved as `portal-count.txt`):

| File | `portal` term count | Dialog host in the importing chain (`graph-portal-out.txt`) |
|---|---|---|
| `app/message/_components/NewMessageModal.tsx` | 1 | direct: `PresetDialog` (lines 199-454) |
| `app/message/m/[id]/_components/SaveAsMenu.tsx` | 1 | direct: `PresetDialog` (lines 87-115, 120-181) |
| `app/message/m/[id]/_layout/Navigation.tsx` | 1 | none by import chain; layout-level, pages render as children, which an import graph cannot see |
| `components/DiscordMessageEditor/components/EmbedEditor/ColorPicker/index.tsx` | 1 | import chain: `WarningDialog` in `ComponentEditor.tsx` and `EmbedEditor/index.tsx` |
| `components/Dropdown.tsx` (defines the prop) | 3 | n/a |
| `components/AnchoredPopover/Child.tsx` (defines the dynamic) | 3 | n/a |

The other 17 AnchoredPopover importers have no `portal` term in their file, so they do not pass a truthy `portal` and do not reach `FloatingPortal` by the `renderPortal` path: `app/_components/NavMenu.tsx`, `app/message/_layout/Header.tsx`, `app/message/page.tsx`, `app/message/f/[id]/page.tsx`, `app/message/m/[id]/send/_components/WebhookMenu/index.tsx`, `components/AnchoredPopover/{index,Root,Trigger,utils}.tsx`, `components/DiscordMessageEditor/components/EmbedEditor/{EmbedAuthor,EmbedField,EmbedFooter,EmbedTitle}.tsx`, `components/EmojiPicker/Root.tsx`, `components/EmojiPicker/Picker/components/Header/ToneSelector.tsx`, `utils/hooks/useGuildDropdownItems.tsx`, `utils/markdown/components/MarkdownTimestamp.tsx`. The `portal` term is a text proxy, not proof of the prop value: the term count does not show the value passed.

The handoff names SaveAsMenu and ColorPicker as "likely members". The text counts agree that both contain a `portal` term.

## 6. Next.js `next/dynamic` source (installed package, not the remote ref)

`/usr/local/bin/hooks/website/node_modules/next/package.json` reports version `16.1.6`, matching `"next": "^16.1.6"` at `origin/master` `package.json`. The lockfile version was not read.

`/usr/local/bin/hooks/website/node_modules/next/dist/shared/lib/lazy-dynamic/loadable.js` lines 49-51:

```
const hasSuspenseBoundary = !opts.ssr || !!opts.loading;
const Wrap = hasSuspenseBoundary ? _react.Suspense : _react.Fragment;
```

Consequence: a `next/dynamic` call with `ssr: false` or with a `loading` option wraps its render in its own `Suspense`. `FloatingPortal` (`ssr: true`, no `loading`) is the only lazy target in the sweep with neither, so it is the only one whose first lazy read can suspend up to an outer boundary.

This contradicts `planning/closed/004-lazy-loading-preload-overhaul.md` (Milestone 3 removed on the premise "`next/dynamic` doesn't use Suspense internally") and `analysis/closed/004-lazy-loading-technical-analysis.md` Finding 3. The 015 analysis (`analysis/closed/015-bug-evaluation-fixes-upload-dialog-analysis.md` V-4) states the same `hasSuspenseBoundary` line and reaches the opposite conclusion.

## 7. Record hits

Searched: `agent-output/architecture`, `research` (with `closed/`), `analysis` (with `closed/`), `planning/closed`, `handoff` (with `closed/`). Pattern and output: `grep -rnE --include='*.md' --exclude='*.env*' "<PAT>" <dir>` written to `scoping/record-hits.txt`. Total: 379 lines (`wc -l < record-hits.txt`).

Hits per file (from `cut -d: -f1 record-hits.txt | sort | uniq -c`):

| Hits | File |
|---|---|
| 61 | planning/closed/004-lazy-loading-preload-overhaul.md |
| 35 | planning/closed/013-components-v2-editing-surfaces.md |
| 29 | analysis/closed/015-bug-evaluation-fixes-upload-dialog-analysis.md |
| 25 | planning/closed/015-bug-evaluation-fixes.md |
| 25 | architecture/closed/004-lazy-loading-architecture-findings.md |
| 24 | analysis/closed/004-lazy-loading-technical-analysis.md |
| 22 | analysis/closed/014-test-suite-cleanup-analysis.md |
| 21 | handoff/newmessagemodal-persist-gate-choice-unreachable-2026-08-27.md |
| 13 | handoff/upload-message-dialog-closes-on-first-portal-load-2026-11-08.md |
| 12 | research/closed/components-v2-editing-flows-2026-08-23.md |
| 12 | planning/closed/003-actions-menu-critique-remediation.md |
| 11 | research/codebase-bug-evaluation-2026-11-08.md |
| 10 | architecture/closed/015-bug-evaluation-fixes-architecture-findings.md |
| 9 | research/competitive-feature-landscape-2026-11-08.md |
| 9 | architecture/website.md |
| 8 | planning/closed/001-components-v2-state-management.md |
| 7 | analysis/test-inventory-2026-08-26.md |
| 7 | analysis/closed/005-user-reported-bugs-analysis.md |
| 6 | research/closed/json-editor-flag-mint-2026-08-23.md |
| 6 | planning/closed/014-test-suite-cleanup.md |
| 6 | planning/closed/010-infopanel-overlap-fix.md |
| 5 | planning/closed/012-message-valid-field.md |
| 5 | architecture/system-architecture.md |
| 4 | planning/closed/005-user-reported-bug-fixes.md |
| 2 | planning/closed/016-send-check-validity.md |
| 2 | architecture/closed/013-components-v2-editing-surfaces-architecture-findings.md |
| 2 | analysis/closed/002-embeds-components-v2-mutual-exclusivity.md |
| 1 | handoff/closed/json-editor-bad-configurations-2026-08-23.md |

Key hits, with what each says about population or consequence:

- `handoff/upload-message-dialog-closes-on-first-portal-load-2026-11-08.md` (Status: Open, 13 hits). Names the defect and the mechanism: a first `FloatingPortal` load suspends to the layout boundary, hides the open Headless UI `Dialog`, and `useOnDisappear` closes it. Its owed remedy is "every consumer of the `FloatingPortal` dynamic, enumerated from its importers". Section 5 of this file is that enumeration. It names SaveAsMenu and ColorPicker as likely members. It also records that production fresh-load shows 0 `[data-floating-ui-portal]` nodes before the press.
- `analysis/closed/015-bug-evaluation-fixes-upload-dialog-analysis.md` (29). V-4 names `FloatingPortal` as the suspending read with no `loading` and no own Suspense. Line 210 says "any first `FloatingPortal` load ... self-closes". Line 212 says SaveAsMenu and ColorPicker "also pass `portal`; I did not probe whether they show the same effect". V-6 dates the dynamic to `fae733f` (2023-02-28).
- `planning/closed/004-lazy-loading-preload-overhaul.md` (61). Milestone 3 (Suspense boundaries) was removed on the premise that `next/dynamic` does not use Suspense (line 64, 263). Lines 230-235 place `AnchoredPopover/Child.tsx` `FloatingPortal` out of scope as "low-impact", and `JsonMenu.tsx` and `NewMessageModal.tsx` as having "appropriate local fallbacks". The installed source (section 6) contradicts the premise and the 015 analysis contradicts the scope note.
- `analysis/closed/004-lazy-loading-technical-analysis.md` (24). Finding 3 (line 69-75): `next/dynamic` never throws a Suspense promise. Same premise as above.
- `architecture/closed/004-lazy-loading-architecture-findings.md` (25). Line 183 requires "every lazy component render site has a local `<Suspense>` boundary". Superseded by the Finding 3 removal (see `planning/closed/004` changelog). Line 8 carries the RC-1 retraction ("React.lazy works with React 19 SSR").
- `analysis/closed/014-test-suite-cleanup-analysis.md` (22). Lines 309-319 and 400-404: `EmojiPicker/*` and five `dynamics/*` files were not mounted in tests. Only `dynamics/Tooltip` was mounted, and it renders nothing (S4).
- `handoff/newmessagemodal-persist-gate-choice-unreachable-2026-08-27.md` (21). Filename names NewMessageModal as the dialog. Its lines were not read in this sweep.
- `architecture/website.md:144-145` and `:196` list `NewMessageJsonInput.tsx` and `JsonModalBody.tsx` as the JSON load surfaces (population of JSON dialog consumers).
- `research/codebase-bug-evaluation-2026-11-08.md` F-19 (line 112). Different mechanism: "JSON dialog stops closing on Esc/outside-click after one successful Load" (`setAllowMenuClose` in `JsonModalBody`/`JsonMenu`). Same dialog as lazy row 2, not the lazy-load mechanism.
- `architecture/system-architecture.md:197` (row "Enter-to-confirm in dialogs rests on an unidentified mechanism"): dead `tagName` compare in `WarningDialog`, `ConfirmationDialog`, `ImageUploader`. A different dialog defect, not the lazy mechanism.
- `architecture/closed/015-bug-evaluation-fixes-architecture-findings.md:144` (X-22): NewMessageModal remounts on folder switch via `createRouterCacheKey`. Not a lazy-load mechanism and not a defect per that record.
- `analysis/test-inventory-2026-08-26.md` (7) lines 86-105: test files that read `NewMessageModal`/`JsonModalBody`/`NewMessageJsonInput` as source text. Population of tests, not production.

The full list is in `/usr/local/bin/hooks/agent-output/verification/fix-dialog-closes-on-first-portal-load/scoping/record-hits.txt`. Each line of it was not read for this table.

## 8. What the sweep did not cover

1. Next's own behaviour for `loading.tsx` (implicit Suspense boundary per route segment). Only the file's presence was checked. Next's source for this was not read.
2. The `next/dynamic` source was read from `website/node_modules` in the working tree, not from the remote ref. Its version was checked against `package.json` only.
3. Import-chain reachability is an over-approximation: `utils/index.ts` is a barrel that connects most files. It does not see JSX render sites, so "import chain" does not establish that a lazy component renders while a dialog is open.
4. Layout-to-page composition is invisible to the import graph. This affects Navigation (`m/[id]/_layout`) and `app/message/layout.tsx`, which render their children and not their imports.
5. Lazy-load forms not matched by `dynamic\(|React\.lazy|\blazy\(`: aliased `dynamic` imports (`import x from 'next/dynamic'` then `x(`), `use(promise)` from React 19, and `startTransition`-wrapped loads. The 14-line result is the complete `dynamic(` / `lazy(` set for those spellings only.
6. Non-dynamic `import(` sites: 116 raw lines including tests. The prod/test split was not counted (refusal 3 and 4, section 2).
7. Dialog predicate: it matched words, not render behaviour. `CookieConsent.tsx`, `LandingCTA.tsx`, `Sidebar.tsx` (`FocusTrap`), `EditMessageMenu.tsx` and `EmojiPicker/Picker/index.tsx` (`Transition`) were not classified as dialogs. Whether any of them is a modal was not read.
8. `components/Button.tsx` and `components/Tooltip.tsx` render conditions: whether the `Tooltip` lazy wrapper renders at all for a given `Button` was not read.
9. Record directories not searched: `agent-output/planning/` (open plans), `agent-output/verification/` (the handoff cites `verification/015/upload-dialog/`, including `instrumentation-and-mutation.diff`), and `agent-output/steering`.
10. `handoff/newmessagemodal-persist-gate-choice-unreachable-2026-08-27.md` (21 hits) and `planning/closed/013-*` (35 hits): hit lines were not read.
11. The production evidence cited by the handoff (`verification/015/uat/hooksgg-upload-fresh-load.js` and related) was not re-run or read.
12. project-utils and preview-image-generator: `git grep` zeros and `ls-tree` listings only. Preview's `.github/` (including `workflows/prod.yml`) was not read, per the safety rule and the gate refusal.
13. Test files: the sweep excluded `__tests__` from the import graph (`graph.js` `isTest`) and counted them only in raw `grep` output.
14. Mount-level behaviour: no test was run and nothing was rendered.

## 9. Files in this directory

- `sweep.md` (this file)
- `raw-lazy-website.txt`, `raw-suspense-website.txt`, `raw-loading-files-website.txt`, `raw-dialog-website.txt`, `raw-dynimport-website.txt`, `raw-dynamics-consumers-website.txt`
- `raw-*-project-utils.txt`, `raw-*-preview-image-generator.txt` (all 0 bytes; zero hits)
- `graph.js` (import-graph script), `graph-out.txt` (lazy targets), `graph-portal-out.txt` (portal consumers)
- `anchored-importers-l.txt`, `portal-count.txt`
- `record-hits.txt`
