# Sweep: cut with a collapsed caret in the rich-text message editor (H-3)

Scope of this sweep: facts read from source at one pinned SHA, plus record hits. Nothing was run,
no tree was changed, nothing was committed or installed.

## Hypothesis under sweep (never run)

Ctrl+X (cut) with nothing selected (caret collapsed) deletes a character instead of doing nothing.

Source: `/usr/local/bin/hooks/agent-output/research/codebase-bug-evaluation-2026-11-08.md:170`
(row H-3, confidence Med, ease/severity 10 / 2). Row text: "Ctrl+X with a collapsed selection deletes
the next character — `onCopy`'s cut branch calls `Transforms.delete(editor, { at: editor.selection })`
with no `Range.isExpanded` guard. Disconfirming test: Place the caret, press Ctrl+X." Row H-3 is the
only record entry on this hypothesis (see section 5). The row is listed under "Hypotheses from the
editor sweep", which the research file says "each needs a running editor to settle"; none is
counted as a finding.

## SHA read

- `git -C /usr/local/bin/hooks/website ls-remote origin master` →
  `132a7ab6f49d8a85ead507e2221ab3c3a531fd00	refs/heads/master`
- All website reads: `git show 132a7ab6f49d8a85ead507e2221ab3c3a531fd00:<path>` and
  `git grep ... 132a7ab6f49d8a85ead507e2221ab3c3a531fd00 -- <paths>`. The working tree was not read
  for source.
- Installed packages (read-only, for the Slate delete implementation): the website
  `node_modules` symlinks under `/usr/local/bin/hooks/website/node_modules/` (`slate`, `slate-react`,
  `slate-dom`), resolving into `.pnpm/*@0.123.0`. Only the version was compared against the lockfile;
  package integrity was not checked.

## 1. Clipboard, cut, paste and key handlers in the editor code

Every handler found at the SHA by
`git grep -n -E 'onCopy|onCut|onPaste|setFragmentData|insertData|Ctrl\+X|isExpanded|isCollapsed|onKeyDown|Transforms\.delete' <sha> -- 'src/**'`,
restricted to editor files:

| Location | What it is | Cut relevance |
|---|---|---|
| `src/components/SlateEditor/index.tsx:124` | `onCopy={useCallback(onCopy(editor), [])}` | copy only |
| `src/components/SlateEditor/index.tsx:125` | `onCut={useCallback(onCopy(editor, true), [])}` | **the cut handler** |
| `src/components/SlateEditor/index.tsx:126-135` | `onPaste`: reads `text/plain`; for `partialMarkdown` with a newline, or length > 6000, calls `toast.error` and `preventDefault`; no delete | not cut |
| `src/components/SlateEditor/index.tsx:136` | `onKeyDown=onKeyDown(editor, partialMarkdown, propsOnKeyDown)` | see below |
| `src/components/SlateEditor/utils/onKeyDown.ts:11-14` | handles `Backspace` (`normalizeBackspace`) and `Enter` (when `partialMarkdown`); **no x/c/v key handler** | not cut |
| `src/components/SlateEditor/utils/onKeyDown.ts:31-34` | Backspace normalisation: `if (editor.selection && !collapsed) { … Transforms.delete(editor, { at: editor.selection }) }` | guarded by `!collapsed` (Backspace path) |
| `src/components/SlateEditor/utils/withNormalizeNode.ts:121` | `Transforms.delete` inside normalisation | not a user cut |
| `src/components/SlateEditor/utils/index.tsx:15-30` | `withEmojis`: only `isInline`/`isVoid` overrides are live; every `wrapEditorFunction(editor, 'delete…' / 'insert…')` line is commented out | no `insertData`/`delete` override |

Searches that found nothing in editor code: `git grep -n -E "insertData|insertFragment|wrapEditorFunction|isExpanded|isCollapsed" <sha> -- 'src/components/SlateEditor/**' 'src/components/DiscordContentEditor/**'` returned only the commented-out lines at `utils/index.tsx:20-30`; `git grep -n -E "editor\.delete\b|\.delete = " <sha> -- 'src/**'` returned no override; `git grep -n -E "e\.key|event\.key|\.key ===|ctrlKey|metaKey" <sha> -- 'src/components/SlateEditor/**' 'src/components/DiscordContentEditor/**' 'src/components/dynamics/**'` returned only `onKeyDown.ts:11` and `:13`.

The cut handler as it is at the SHA (`src/components/SlateEditor/utils/onCopy.ts`, read with `git show <sha>:<path>`):

```
18 export default (editor: Editor, cut = false) => (e: ClipboardEvent<HTMLDivElement>) => {
19   if (editor.selection) {
20     const data = getDummyDataTransfer();
21     ReactEditor.setFragmentData(editor, data);
22     const fragment = data.getData('application/x-slate-fragment');
23     if (fragment) {
24       e.preventDefault();
25       e.stopPropagation();
...
29       copy(flattenNodeText(parsed), {
30         format: 'text/plain',
31       });
32     }
34     if (cut) {
35       Transforms.delete(editor, {
36         at: editor.selection,
37       });
38     }
39   }
40 };
```

The cut branch sits inside `if (editor.selection)` (line 19) and outside `if (fragment)` (line 23).
No `Range.isExpanded`, `Range.isCollapsed` or `Range.` check appears anywhere in the file.

Wiring path, from the slate-react side (`node_modules/slate-react/dist/index.js:3861-3877`, the
`onCut` wrapper on `Editable`):

```
onCut: function (event) {
  if (!readOnly && ReactEditor.hasSelectableTarget(editor, event.target) && !isEventHandled(event, attributes.onCut) && !isDOMEventTargetInput(event)) {
    event.preventDefault();
    ReactEditor.setFragmentData(editor, event.clipboardData, 'cut');
    var selection = editor.selection;
    if (selection) {
      if (slate.Range.isExpanded(selection)) { slate.Editor.deleteFragment(editor); }
      else { var node = …; if (slate.Editor.isVoid(editor, node)) { slate.Transforms["delete"](editor); } }
    }
  }
}
```

`isEventHandled` (index.js:4274) returns the custom handler's return value when it is non-null;
`onCopy.ts`'s returned function returns nothing, so it falls through to
`event.isDefaultPrevented() || event.isPropagationStopped()`. Source order therefore is: Slate's
custom cut branch runs first (inside `isEventHandled`), then the slate-react default body runs
unless the event was prevented.

## 2. Guard verdicts on each cut path

### 2a. Path A: custom cut branch (`onCopy.ts:34-38`)

- Guard before the delete: `if (editor.selection)` at `onCopy.ts:19`. A collapsed caret is a
  non-null `editor.selection` (anchor = focus), so the guard passes.
- No expanded-selection guard. **Verdict for a collapsed caret: unguarded.** The delete is reached.

### 2b. What `Transforms.delete(editor, { at: <collapsed range> })` does (Slate 0.123.0)

Read from `node_modules/slate/dist/index.js`:

- `Transforms.delete` → `editor["delete"](options)` (index.js:2592-2594).
- `editor.delete` → `deleteText` (index.js:6227-6230).
- `deleteText` (index.js:4427-4500):
  - `if (Location.isRange(at) && Range.isCollapsed(at)) { isCollapsed = true; at = at.anchor; }` (4447-4449)
  - `if (Location.isPoint(at))` (4451): unless the point is in a void, `target = Editor.after(editor, at, { unit: 'character', distance: 1 })` (or `Editor.end` if there is none), then `at = { anchor: at, focus: target }` and `hanging = true` (4470).
  - `if (Range.isCollapsed(at)) return;` (4480-4481): the delete is a no-op only when there is no next position (end of document).
  - Otherwise the range from the caret to the next character position is removed.

So a collapsed caret followed by a character removes that next character, forward. This agrees with
H-3's description. The source was read, not executed.

### 2c. Path B: slate-react default cut body (`slate-react/dist/index.js:3861-3877`)

- Runs only when the custom handler did not prevent the event (see the `isEventHandled` note above).
  For a collapsed caret it is not prevented (2d below), so the body runs.
- It calls `event.preventDefault()`, so the browser's native cut is suppressed.
- Its delete is guarded: `Range.isExpanded` → `Editor.deleteFragment`; otherwise only a void node
  gets `Transforms.delete(editor)`. **Verdict: does not delete a non-void collapsed caret.**

### 2d. What `setFragmentData` does for a collapsed caret (`slate-dom/dist/index.js:1874`, collapse check at 1889)

```
e.setFragmentData = function (data) {          // 1874
  var selection = e.selection;
  if (!selection) { return; }
  …
  if (slate.Range.isCollapsed(selection) && !startVoid) { return; }   // 1889
```

For a collapsed, non-void caret it writes no fragment. Consequently `onCopy.ts:23-32`
(`preventDefault`, `stopPropagation`, the `copy-to-clipboard` call) is skipped on a collapsed cut.
Nothing is written to the clipboard by the Slate handler.

### 2e. Path C: `beforeinput` with `inputType` `deleteByCut` (`slate-react/dist/index.js:573-576`, `3375-3377`)

- Dispatches to `Editor.deleteFragment` (`slate/dist/index.js:3217-3226`).
- `Editor.deleteFragment` is guarded: `if (selection && Range.isExpanded(selection))`.
  **Verdict: guarded; a no-op on a collapsed caret.** It is also only reached if the native cut
  is not prevented, and path B prevents it.

### 2f. Other delete calls near the cut surface (not cut paths)

- `onKeyDown.ts:31-34` (Backspace): `if (editor.selection && !collapsed)`. Guarded, and not a cut.
- `withNormalizeNode.ts:121`: normalisation delete. Not user-triggered.

### 2g. Net reading (source only, not run)

For a collapsed caret, the sequence is: Path A runs `Transforms.delete` (one forward character
removed); the slate-react default (Path B) then calls `preventDefault` and does no delete. Path C is
suppressed by that `preventDefault`. So Slate's own default cut does **not** add a second deletion
(by source reading), and the single deletion is the one from Path A. This is a source reading and
the ordering was not traced at runtime.

## 3. Every editor surface that mounts the handler

`SlateEditor` (the component that wires `onCut`) is the only mount point for the cut handler.

Within the SlateEditor build, the source for the lazy wrapper is
`src/components/dynamics/SlateEditor.tsx:3` (`dynamic(() => import('~/components/SlateEditor'))`).

| Surface | File:line | Mount condition |
|---|---|---|
| Content editor, desktop | `src/components/DiscordContentEditor/Desktop.tsx:92` (`<SlateEditor …>`) | rendered only when `_focused` (Desktop.tsx:89); `partialMarkdown` at :107, `isEmbed` at :104; `onKeyDown={onBlurKey}` at :108 |
| Content editor, mobile | `src/components/DiscordContentEditor/Mobile.tsx:96` (`<SlateEditor …>`) | rendered inside `BottomPortal open` (Mobile.tsx:91-92); `partialMarkdown` at :108; no `onKeyDown` prop passed |
| Dispatch | `src/components/DiscordContentEditor/index.tsx:49-72` | `!showEdit` → static `Markdown` (no SlateEditor); otherwise `ErrorBoundary` → `Mobile` (`isMobile`) or `Desktop` |

Callers of `DiscordContentEditor` (the wrapper that mounts `SlateEditor` when editing), found by
`git grep -n -E "<DiscordContentEditor|DiscordContentEditor'" <sha> -- 'src/**'` (non-test):

| Caller | File:line | Flags passed |
|---|---|---|
| Message content body | `src/components/DiscordMessageEditor/components/ContentBody.tsx:21` | — |
| Component text display | `src/components/DiscordMessageEditor/components/ComponentEditors/TextDisplayEditor.tsx:26` | — |
| Embed body | `src/components/DiscordMessageEditor/components/EmbedEditor/Embed.tsx:82` | `isEmbed` (:91) |
| Embed field value | `src/components/DiscordMessageEditor/components/EmbedEditor/EmbedField.tsx:75` | `partialMarkdown` (:86), `isEmbed` (:87) |
| Embed field name | `src/components/DiscordMessageEditor/components/EmbedEditor/EmbedField.tsx:92` | `isEmbed` (:102) |
| Embed title | `src/components/DiscordMessageEditor/components/EmbedEditor/EmbedTitle.tsx:93` | `partialMarkdown` (:105), `isEmbed` (:106) |

Not found to mount `DiscordContentEditor` or `SlateEditor`: `EmbedAuthor.tsx` and `EmbedFooter.tsx`
(both use `onKeyDown={onBlurKey}` on other controls, at `EmbedAuthor.tsx:142` and
`EmbedFooter.tsx:122`). `src/app/message/m/[id]/edit/page.tsx:108` is a `void import(...)`
prefetch, not a mount. `Markdown.tsx` is the read-only renderer and does not mount SlateEditor.

Note: the `partialMarkdown` flag only changes `onPaste` and `Enter` handling. The cut handler does
not depend on it, so it is the same on every mount above.

## 4. Existing tests touching copy/cut/paste in the editor

Commands run (outputs written to `/tmp/claude-1000/-usr-local-bin-hooks/47cb8b91-b62b-4a6a-8e0b-f461ff293d27/scratchpad/` and counted from those files):

- `git grep -l -i -E 'oncopy|oncut|clipboard|cut' 132a7ab6f49d8a85ead507e2221ab3c3a531fd00 -- 'src/**/__tests__/**'`
  → **11 files**, exit 0 (`tests-l.txt`).
- `git grep -c -i -E 'oncopy|oncut|clipboard|cut' 132a7ab6f49d8a85ead507e2221ab3c3a531fd00 -- 'src/**/__tests__/**'`
  → **24 matching lines** in those 11 files, summed (`tests-c.txt`). Files with matches:
  `src/app/message/m/[id]/_components/__tests__/JsonModalBody.copy-needs-valid-draft.test.tsx` (8),
  `src/server/api/v1/__tests__/guildMessages.valid-exposure.test.ts` (2),
  `src/server/api/v1/__tests__/guildMessages.statbot-key-required.test.ts` (2),
  `src/server/api/v1/__tests__/v1Routes.statbot-key-required.test.ts` (2),
  `src/server/api/utils/__tests__/secretEquals.credential-sites.test.ts` (2),
  `src/utils/__tests__/limits.send-gate-partition.test.ts` (3), and five further files with 1 line each.
  Most of these are substring matches on `cut` in unrelated names; they are not editor cut tests.
- Editor-specific symbols in tests:
  `git grep -n -i -E 'SlateEditor|onCopy|onCut|setFragmentData|DiscordContentEditor|ClipboardEvent|clipboardData|\bcut\b' <sha> -- 'src/**/__tests__/**'`
  → no test calls `onCopy`, `onCut`, `setFragmentData` or dispatches a clipboard event. The
  `SlateEditor` hits are `vi.mock` stubs: `src/app/message/m/[id]/_components/__tests__/MessageNotFound.edit-and-send-pages.test.tsx:99`,
  `src/app/message/m/[id]/edit/__tests__/page.sign-in-exit.test.tsx:53`,
  `src/components/DiscordContentEditor/__tests__/DiscordContentEditor.desktop-typed-text-reaches-message.test.tsx:17`
  (the last replaces SlateEditor with a stub, so the real handler is not exercised).
- `src/components/SlateEditor/` has no `__tests__` directory at the SHA
  (`git ls-tree -r --name-only <sha> src/components/SlateEditor` lists 13 files, none a test).
- `git grep -c -E '\b(it|test)(\.each)?\(' <sha> -- 'src/components/DiscordContentEditor/**'`
  → 2 `it`/`test` call-site lines, both in `DiscordContentEditor.desktop-typed-text-reaches-message.test.tsx`.
- Call-site counts are lines, not executed cases (`it.each` expands).
- No vitest run was performed, so no pass or exit-code result exists for this sweep.

## 5. Record hits in agent-output

Command (as specified), run at `HEAD`:
`git -C /usr/local/bin/hooks/agent-output grep -n -i -e 'onCopy' -e 'Ctrl+X' -e 'collapsed' HEAD -- architecture research handoff planning`

- `HEAD:research/codebase-bug-evaluation-2026-11-08.md:170` — the H-3 row (the only hit on the hypothesis).
- `HEAD:handoff/closed/providers-query-params-header-decode-throws-2026-11-08.md:34` — mentions `onCopy.ts`
  ("decodes a fragment the editor itself wrote, so it is not a member"). Not a finding on cut.
- `HEAD:handoff/closed/components-v2-emptiness-not-caught-by-the-send-gate-2026-08-26.md:64` — the word
  "collapsed" in a prose sentence about whitespace. Unrelated.
- `HEAD:planning/closed/010-infopanel-overlap-fix.md` lines 28, 32, 33, 45, 104, 123, 140, 158 — "collapsed"
  as the InfoPanel state. Unrelated.
- `HEAD:planning/closed/013-components-v2-editing-surfaces.md` lines 29, 35 — "collapsed" in planning prose. Unrelated.

Command for `closed/` (as specified):
`git -C /usr/local/bin/hooks/agent-output grep -n -i -e 'onCopy' -e 'Ctrl+X' -e 'collapsed' HEAD -- closed`
→ exit 1, no hits. `agent-output/closed` does not exist as a top-level directory; the closed records are
`handoff/closed/` and `planning/closed/`, which the first command above covers.

No record (`architecture`, `research`, `handoff`, `planning`) reports a user or production observation of
the cut behaviour. The only record of the hypothesis is the H-3 row, which is a hypothesis, not an
escaped defect.

## 6. What no instrument here sees

- Real-browser behaviour. Nothing was run. Whether Chrome, Firefox or Safari fire a `cut` event on a
  contenteditable with a collapsed caret, and whether they do so with the selection the Slate handler
  reads, is not established. The source sweep does not settle it, which the research file itself says.
- Whether the native cut is actually prevented in a browser: path B's `preventDefault` depends on
  `ReactEditor.hasSelectableTarget(editor, event.target)` and `!isDOMEventTargetInput(event)` being true at
  runtime. Those helpers were not evaluated against a DOM.
- Runtime event ordering. The claim that path A runs before path B, and that path B's `preventDefault`
  suppresses path C, is read from the `isEventHandled` and `onCut` source; it was not traced.
- Deletion at block and void boundaries. `Editor.after(…, { unit: 'character' })` may cross a block
  boundary, and `withEmojis` (`utils/index.tsx:15-18`) makes emoji elements inline and void, so the
  forward target may fall on or past a void. Neither case was traced; the H-3 description only covers the
  plain-character case.
- Slate-history: whether the cut's delete is recorded as one undo step, and how a later Ctrl+Z behaves, was
  not traced (`withHistory`, `slate-history@0.113.1`).
- Installed package integrity: versions match `pnpm-lock.yaml` (`slate@0.123.0`, `slate-react@0.123.0`,
  `slate-dom@0.123.0`, `slate-history@0.113.1`, lockfile lines 5841-5859 at the SHA); the installed tree's
  hashes were not compared.
- Test behaviour. No test runs, so no suite result exists; the 2 DiscordContentEditor `it`/`test` lines
  and the 24 matching lines above are static counts only.
- Whether the H-3 row was ever reported from production or observed on a running editor. The record
  search (section 5) finds none.
