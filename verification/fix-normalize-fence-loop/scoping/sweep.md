# Sweep — normalisation loop, bare code fence with a block quote (H-2)

Scope: read-only sweep of `website` at `origin/master`. No tree changed, nothing committed or installed, `preview-image-generator` not touched. Every `website` fact below was read with `git show` or `git grep` against the SHA.

## Read

- Origin SHA: `git -C /usr/local/bin/hooks/website ls-remote origin master` → `132a7ab6f49d8a85ead507e2221ab3c3a531fd00	refs/heads/master`. All `website` reads use this SHA.
- Property source: `/usr/local/bin/hooks/agent-output/research/codebase-bug-evaluation-2026-11-08.md`, read whole. Row H-2 is at line 169; the row says the disconfirming test is "Type `> a` and a bare ``` fence in one field; watch for 'Could not completely normalize'" and grades it Med / 7 / 4. The row is a hypothesis, not a finding.
- Note: `website/CLAUDE.md`-level conventions and the agent-output `CLAUDE.md` were in context; no test conventions changed what is reported here.

## 1. Normalisation code

File: `src/components/SlateEditor/utils/withNormalizeNode.ts` (220 lines at the SHA). Read with `git show 132a7ab6…:src/components/SlateEditor/utils/withNormalizeNode.ts | cat -n`.

Entry point, L204–220. `editor.normalizeNode` is wrapped. For the editor root, `if (!partialMarkdown) return handleEditor(editor, false);` (L210–211). For a non-emoji element, `return handleElement(...)` (L212–213). `handleElement` (L89–202) does not touch fences or quotes. It handles empty flags, emoji spacing, and the Unicode-quote replacement.

`handleEditor(editor, update)`, L15–74. Relevant lines:

- L18 `let currentLang: null | string = null;`
- L24 `const codeBlockEndCount = childText.split('```').length - 1;`
- L25 `const isFullCodeBlock = inCodeBlock && codeBlockEndCount === 0;`
- L27–28 `inMultilineBlockQuote = inMultilineBlockQuote || /^ *>>> /.test(childText);` and `const isBlockQuote = !isFullCodeBlock && (inMultilineBlockQuote || /^ *> /.test(childText));`
- Compare phase, `if (!update)`, L30–40. The mismatch test is:
  ```
  (isFullCodeBlock && child.type !== 'codeBlock')
  || (isFullCodeBlock && child.lang !== currentLang)     // L33
  || (!isFullCodeBlock && child.type === 'codeBlock')
  || (child.startCodeBlock !== inCodeBlock)
  || (isBlockQuote && child.type !== 'blockQuote')       // L36
  ```
  On any match, L39 `return handleEditor(editor, true);`. The update pass re-scans every top-level child, not only the one that mismatched.
- Update phase, `else`, L41–62:
  - L45–49 for a block-quote line: `Transforms.insertText(editor, \`${childText.replace(/^ *>(>>)? /, '')}\`, { at: [childLocation] });`, guarded by `if (/^ *>>> /.test(childText) || /^ *> /.test(childText))`. This is an unconditional write for every blockQuote element on every update pass, because of the flattenNodeText behaviour below.
  - L54–59 `Transforms.setNodes(editor, { type, lang: (isFullCodeBlock && currentLang) || '', startCodeBlock: inCodeBlock, children: child.children }, { at: [childLocation] });`. L56 is the lang write.
- Fence-language tracking, L64–69:
  - L64 `const res = /```([A-Za-z0-9-]+)$/.exec(childText);` The `+` quantifier means a bare fence (no characters after the backticks) never matches.
  - L65 `if (res && !inCodeBlock) currentLang = res[1] ?? '';`
  - L66 `else if (res?.[0] && inCodeBlock && currentLang) currentLang = '';`
  - L68 `if (isOdd(codeBlockEndCount)) inCodeBlock = !inCodeBlock;`
  - L69 `if (!inCodeBlock) currentLang = null;`

Flattening, `src/components/SlateEditor/utils/flattenNodeText.ts` L9–14: `if (node.type === 'blockQuote') return \`> ${text}\`;` (L13). The `childText` used by the normaliser is therefore prefixed with `> ` for every blockQuote element, whatever the stored leaf text is.

Initial value, `src/components/SlateEditor/utils/getInitialValue.ts` (read with `git show`):

- L24 `const isCodeBlock = !partialMarkdown && inCodeBlock && !containsBlockEnd;`
- L29 `const isBlockQuote = !partialMarkdown && !isCodeBlock && (...)`. Quote detection is off for partialMarkdown.
- L41 `text = text.replace(/^ *> /, '');` and L42 `type = 'blockQuote';`
- L80 `lang: (isCodeBlock && currentLang) || '',`
- L87 `const res = /```([A-Za-z0-9-]*)$/.exec(text);` The `*` quantifier, unlike L64. For a bare fence, `res[1]` is `''`.
- L88 `if (res && !inCodeBlock) currentLang = res[1] ?? '';` so a bare fence sets `currentLang = ''` at init.

Mounting and the editor object, `src/components/SlateEditor/index.tsx`: L53 `getInitialValue(initialValue, emojiParser, partialMarkdown)`; L61 `const editor = useMemo(() => withNormalizeNode(withEmojis(withHistory(withReact(createEditor()))), partialMarkdown, emojiParser), []);`; L91 `useEffect(() => { if (!partialMarkdown) editor.children = descendants; }, [string.split('`').length]);`. L91 assigns `editor.children` directly, which emits no operation and so does not trigger normalisation.

### The condition under which it writes, and whether a write changes the next compare

Trace from the SHA code (static reading, not executed). Input text:

```
> a
```
(bare fence)
```
foo
```

Init (`getInitialValue`): element 0 `blockQuote`, leaf `a`; element 1 `div` `` ``` ``; element 2 `codeBlock` `foo` with `lang: ''`; element 3 `div` `` ``` `` with `startCodeBlock: true`. `currentLang` ends at `null`.

Normalisation run after the first content-changing operation (Slate runs normalise for dirty paths; the editor root is dirty for content ops):

1. Compare pass, element 2: `isFullCodeBlock` is true, and `child.lang` (`''`) `!== currentLang` (`null`, because L64 never matches a bare fence so L65 never assigns it). Mismatch at L33, so `handleEditor(editor, true)`.
2. Update pass, element 0: `childText` is `'> a'` (flattenNodeText L13). L46 `isBlockQuote` true. L47 regex matches. L48 `insertText(...)` writes `'a'` over the range of path `[0]`. An expanded-range insert runs a delete and then an insert, so this emits operations even though the text is unchanged.
3. Update pass, element 2: L56 writes `lang: ''`. Same value as stored, so `setNodes` should emit no operation (default compare; see section 5).
4. The operations from step 2 dirty the editor root, so normalise runs again. Step 1 repeats because `''` still differs from `null`. Step 2 repeats because `childText` is still `'> a'`. Each pass emits new `insertText` operations, so the dirty state never clears.

So the lang write never reaches a fixed point: L56 writes `''`, and the compare at L33 expects `null` for a bare fence, because the write side (L56, `|| ''`) and the read side (L64–L69, `+` quantifier and `null` reset) disagree on the value for a bare fence. Writing does not change the next compare outcome. The compare keeps mismatching because the written value is `''` and the stored comparison value is `null`.

Cross-check against the no-quote case: with no blockQuote element, the update pass still runs every time (L33 mismatch), but the only write is L54–59 `setNodes` with values equal to the stored ones. No `insertText` is involved, so the loop is driven only by whether `setNodes` with equal values emits an operation (section 5, unverified).

The loop is therefore not a text-changing loop in the traced case. The inserted text equals the stored leaf text, and the churn is in operations. The "lost text" alternative in the property was not reproduced by this trace. A quote whose stripped text differs from the stored leaf (for example a nested `> > a` shape) was not traced to completion.

Other mismatch triggers that reach the same update branch (each one a reason to enter update, so each one is enough to make a blockQuote element churn): L35 `startCodeBlock`, and L36 a block-quote-looking line whose element type is not `blockQuote`.

## 2. Surfaces that apply this normalisation

- `withNormalizeNode` has one call site: `src/components/SlateEditor/index.tsx:61`.
- `SlateEditor` is reached through `src/components/dynamics/SlateEditor.tsx:3` (`dynamic(() => import('~/components/SlateEditor'), { ssr: true, loading: () => null })`). The edit page prefetches it at `src/app/message/m/[id]/edit/page.tsx:108` (import only).
- Consumers of `~/components/dynamics/SlateEditor`: `src/components/DiscordContentEditor/Desktop.tsx:6` (import) and `:92` (render, `partialMarkdown={partialMarkdown}` at `:107`); `src/components/DiscordContentEditor/Mobile.tsx:7` (import), `:96` (render), `partialMarkdown` at `:108`.
- `DiscordContentEditor` renders Desktop or Mobile only when `showEdit` is true (`src/components/DiscordContentEditor/index.tsx:20–41`). The read-only path (L20–37) renders the static `Markdown` parser and has no normaliser.

Callers of `DiscordContentEditor` and whether `partialMarkdown` is set (with `handleEditor` active when it is not):

| Surface | file:line | partialMarkdown | Full normaliser (handleEditor) |
|---|---|---|---|
| Message content | `src/components/DiscordMessageEditor/components/ContentBody.tsx:21` (rendered from `src/components/DiscordMessageEditor/index.tsx:268`) | not set in the call shown | yes |
| Embed description | `src/components/DiscordMessageEditor/components/EmbedEditor/Embed.tsx:82` | not set | yes |
| Embed field name | `src/components/DiscordMessageEditor/components/EmbedEditor/EmbedField.tsx:75` | set at `:86` | no |
| Embed field value | `src/components/DiscordMessageEditor/components/EmbedEditor/EmbedField.tsx:92` | not set (lines 92–104 read) | yes |
| Embed title | `src/components/DiscordMessageEditor/components/EmbedEditor/EmbedTitle.tsx:93` | set at `:105` | no |
| Component text display | `src/components/DiscordMessageEditor/components/ComponentEditors/TextDisplayEditor.tsx:26` | not set (lines 26–36 read) | yes |

For `partialMarkdown` surfaces, `withNormalizeNode` still runs `handleElement` (per element), but not `handleEditor`. Quote and fence detection in `getInitialValue` are also off (`getInitialValue.ts:24`, `:29`), so the H-2 shape cannot form there.

Desktop and Mobile run the same `withNormalizeNode` code. There is no separate editor variant with a different normaliser.

## 3. Existing tests

Requested grep, at the SHA:

```
git -C /usr/local/bin/hooks/website grep -l -i -E 'normalize|withNormalizeNode|fence|blockquote' 132a7ab6f49d8a85ead507e2221ab3c3a531fd00 -- 'src/**/__tests__/**'
```

Result, three files, none of which exercises the Slate normaliser:

- `src/providers/MessageProvider/__tests__/MessageProvider.save-step.test.tsx` (hits `normalizeForHash`, the save-hash normaliser)
- `src/providers/MessageProvider/__tests__/usePusher.hash-parity.test.ts` (hits `normalizeForHash`)
- `src/utils/markdown/__tests__/rules.multi-line-code-block.test.ts` (hits `fence`; tests the markdown rule for the preview parser, not the editor normaliser)

Tests that name the editor or its utilities, at the SHA:

```
git -C /usr/local/bin/hooks/website grep -l -E 'SlateEditor|withNormalizeNode|getInitialValue|flattenNodeText' 132a7ab6f49d8a85ead507e2221ab3c3a531fd00 -- 'src/**/__tests__/**'
```

Result: three files, all `vi.mock` of `SlateEditor`, none exercising it:

- `src/app/message/m/[id]/_components/__tests__/MessageNotFound.edit-and-send-pages.test.tsx:99`
- `src/app/message/m/[id]/edit/__tests__/page.sign-in-exit.test.tsx:53`
- `src/components/DiscordContentEditor/__tests__/DiscordContentEditor.desktop-typed-text-reaches-message.test.tsx:17`

No test directory exists under `src/components/SlateEditor` at the SHA (`git ls-tree -r --name-only` lists only production files).

Case counts (line counts from `git grep -c`, which counts matching lines, not executed cases):

```
git -C /usr/local/bin/hooks/website grep -c -E "\bit\(|\btest\(" 132a7ab6f49d8a85ead507e2221ab3c3a531fd00 -- <file>
```

- `src/utils/markdown/__tests__/rules.multi-line-code-block.test.ts`: 2 lines (titles at L60 and L66). `grep -c -E "it\.each|test\.each"` on the same file: 1 line.
- `src/components/DiscordContentEditor/__tests__/DiscordContentEditor.desktop-typed-text-reaches-message.test.tsx`: 2 lines (mocked, no normaliser).
- `src/providers/MessageProvider/__tests__/MessageProvider.save-step.test.tsx`: 3 lines (not editor).
- `src/providers/MessageProvider/__tests__/usePusher.hash-parity.test.ts`: 6 lines (not editor).

Coverage of the inputs: no test in the suite covers a block quote and a code fence together, a bare fence alone, or the normaliser. The H-2 shape (a `> ` line with a bare fence in one field) is uncovered by any test at the SHA.

Whole-suite counts (598 tests, 54 files) come from the research document's methodology (`agent-output/research/codebase-bug-evaluation-2026-11-08.md`, § Methodology item 3) at an earlier SHA (`7ce866b`). They were not re-run here.

## 4. Record hits

Command (as specified):

```
git -C /usr/local/bin/hooks/agent-output grep -n -i -e withNormalizeNode -e 'normaliz' HEAD -- architecture research handoff planning
```

Hits that concern the editor normaliser:

- `research/codebase-bug-evaluation-2026-11-08.md:169` (H-2 row, the property source).

Hits that match `normaliz` but concern the save-hash `normalizeForHash`, or save-path flag normalisation (not the editor normaliser):

- `architecture/closed/017-existing-items-backlog-architecture-findings.md:52`
- `architecture/system-architecture.md:167`
- `architecture/website.md:288`
- `planning/closed/017-existing-items-backlog.md:430`
- `planning/closed/018-next-upgrade-save-size-cap.md:210`, `:252`

Because the requested pattern does not match the British spelling, a second read-only grep was run:

```
git -C /usr/local/bin/hooks/agent-output grep -n -i -e 'normalis' HEAD -- architecture research handoff planning
```

Hits that concern the editor (not the save-path flag):

- `handoff/typed-back-edit-leaves-saved-message-draft-2026-11-21.md:40`: "Content normalisation by Slate, or another field the editor rewrites on open or close, are candidates and nothing more." Context: a content-only type-back, not this loop. The handoff explicitly says the cause was not read.

The remaining `normalis` hits are save-path flag normalisation (`handoff/closed/json-editor-bad-configurations-2026-08-23.md`, `research/closed/json-editor-flag-mint-2026-08-23.md`, `planning/closed/012-*`, `planning/closed/013-*`, `planning/closed/014-*`, `research/closed/components-v2-editing-flows-2026-08-23.md`), not the Slate normaliser.

No `handoff/` or `planning/` file records a fix or a reproduction for H-2.

## 5. What no instrument here sees

- **Slate runtime behaviour.** Slate is pinned at `0.123.0` (`pnpm-lock.yaml:5859`, `slate-react@0.123.0` at `:5851`; `package.json:86–89` ranges `^0.123.0`). Two links in the loop depend on Slate's source, which was not read (it lives in `node_modules`, and reading that would mean the working tree, which the rules forbid):
  1. whether `Transforms.insertText` over an expanded path range emits operations when the inserted text equals the stored text (the loop needs this to be yes; standard Slate `delete` semantics suggest it does);
  2. whether `Transforms.setNodes` with equal property values emits a `set_node` operation (the no-quote case stops only if it does not; this is the reason the quote is the discriminator in the trace, and it is unverified).
- **The guard's threshold and error type.** The string "Could not completely normalize" does not appear in `website` source (`git grep -n -F 'Could not completely normalize' 132a7ab…` → exit 1, no match). It is Slate's message. The iteration limit and whether it throws, and from where, were not read.
- **Whether a normaliser throw crashes the page.** `DiscordContentEditor` wraps Desktop and Mobile in `ErrorBoundary` (`src/components/DiscordContentEditor/index.tsx:40`, `:69–71`). React error boundaries catch render and lifecycle errors. Normalisation here runs during an operation (an input or paste handler), so it may not reach the boundary. Inference, not run.
- **The trigger.** The trace assumes the first content-changing operation starts normalisation. Selection-only operations dirty no path (inference from Slate's model, not read). Whether typing `> a` and then the fence starts the loop, or whether the initial mount does, is not established.
- **Lost text.** Not reproduced in the traced shape. Not traced for other quote shapes.
- **Runtime.** No editor, browser, DOM test, or vitest run was executed. The research document's "Type `> a` and a bare fence" test is still the only disconfirming test, and it is not run.
- **Working tree.** Not read by design. Any uncommitted change to the normaliser in another session is outside this sweep. Whether the deployed build is at `132a7ab6…` was not checked.
- **Other editor state paths.** `onChange` (`src/components/SlateEditor/utils/onChange.ts`) calls `setDescendants` on every non-selection change, and the `editor.children = descendants` assignment at `index.tsx:91` bypasses operations. Their interaction with the loop (for example, extra re-renders while it churns) was not traced.
- **Test-suite tests for the Slate normaliser.** None exist at the SHA (section 3), so no instrument in the suite can show the loop red or green.
