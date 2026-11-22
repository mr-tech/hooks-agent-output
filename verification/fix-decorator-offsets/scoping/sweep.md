# Sweep: decorator offsets after nested emphasis (H-4)

Scope of this sweep: facts only, read from website `origin/master`. No tree changed, nothing run, nothing installed.

SHA read: `132a7ab6f49d8a85ead507e2221ab3c3a531fd00` (`git -C /usr/local/bin/hooks/website ls-remote origin master`). All website reads below use `git show` / `git grep` / `git blame` against this SHA.

Source row: `/usr/local/bin/hooks/agent-output/research/codebase-bug-evaluation-2026-11-08.md` line 171, H-4: "Decorator offsets drift after nested emphasis — `walkAst` passes `first: a === astContent.at(-1)` (the *last* child) and never sets `last`." Confidence Med, disconfirming test "Type `***ab***`; inspect decorations after it."

## 1. Decoration code (origin/master)

File: `/usr/local/bin/hooks/website` @ `132a7ab6`, path `src/components/SlateEditor/utils/decorator.tsx` (cmd: `git show 132a7ab6…:src/components/SlateEditor/utils/decorator.tsx`).

- `OFFSETS` map, lines 11-18: `em` 1, `strong` 2, `u` 2, `s` 2, `spoiler` 2, `link` 1.
- `reduceAdjacentSyntax(acc, ast, reverse?)`, lines 20-32. Walks into `content[0]` (or `content.at(-1)` when `reverse`) while the child has an OFFSETS entry, summing the delimiter widths.
- `walkAst(leaf, ast, edgeChild = {})`, lines 34-67. Key lines, quoted:
  - L41: `const offset = OFFSETS.get(ast.type);`
  - L42: `if (offset && !edgeChild.first) leaf.grow(offset + reduceAdjacentSyntax(0, ast), 'syntax');` (opening delimiter)
  - L44: `const branch = leaf.branch(ast);`
  - L47: `if (Array.isArray(astContent)) astContent.forEach((a) => walkAst(leaf, a, { first: a === astContent.at(-1) }));`
  - L48: `else if (typeof astContent === 'string') leaf.jump(astContent.length);`
  - L49: `branch?.final();`
  - L51: `if (offset && !edgeChild.last) leaf.grow(offset + reduceAdjacentSyntax(0, ast, true), 'syntax');` (closing delimiter)
  - L52-56: link target handling (`syntax`, `linkText`, `syntax`).
- Exported `decorator`, lines 148-159: `normalized` from `normalizeAst(rootNode.content)` (L154), `createLeaf(path, ancestor.lang)` (L155), `for (const a of normalized) walkAst(leaf, a);` (L156), `return normalizeRanges(leaf.ranges);` (L158).
- `src/components/SlateEditor/utils/createLeaf.ts`: `branch` (L45-52) grows a zero-width range at the cursor and returns a `final()` that sets `range.focus.offset` to the cursor after the children (L25-27); `grow` (L54-79) moves the cursor by `length` and pushes a range; `jump` = `cursor.moveBy` (L53).
- Git history of the file on this SHA (`git log -n 5 --format='%h %ad %s' --date=short 132a7ab6… -- src/components/SlateEditor/utils/decorator.tsx`): last commit `bf1abed` 2023-04-15 "fix link highlighting". `git blame -L 42,51` shows L42 and L51 from `a8bc58a` (2022-11-28); L47 from `2c7b1e3` (2023-01-19).

### What the flags do

- `edgeChild.first` is read only at L42. When true, the node's own opening delimiter is NOT grown, so the cursor does not advance over it. The code assumes the parent already counted it through the forward `reduceAdjacentSyntax` (L24 without `reverse`).
- `edgeChild.last` is read only at L51. When true, the node's own closing delimiter is NOT grown. The code assumes the parent already counted it through the reverse `reduceAdjacentSyntax` (L24 with `reverse`).
- L47 sets `first` to `a === astContent.at(-1)`, i.e. true for the LAST child, not the first. `last` is never passed anywhere (grep: `git grep -n 'last:' 132a7ab6… -- src/components/SlateEditor/utils/decorator.tsx` returns only the L51 read).
- Consequence: a skipped grow does not move the cursor, so skipping a delimiter that no ancestor counted shifts all later ranges left; counting a delimiter that an ancestor also counted shifts later ranges right (overflow past the text end).

### Parse path feeding walkAst

- Decorate receives `parserContent` = `contentParser` (see section 2). The parser is `interactiveParser(...)` from `src/utils/markdown/utils.ts` L62-76: `SimpleMarkdown.parserFor(rules)`, then `flattenAst` (L16-34). `flattenAst` replaces a child node with its own content when the child has the same type as its parent (L29-31).
- Rules for emphasis in `src/utils/markdown/rules.tsx`: L223 `em: SimpleMarkdown.defaultRules.em,` (the custom em rule is commented out, L224-); L443 `strong: SimpleMarkdown.defaultRules.strong,` (custom rule commented out, L444-).
- Interactive base rules set: `src/utils/markdown/index.tsx` L36-44; `parseContent: interactiveParser(interactiveBaseRules)` at L40.
- The simple-markdown patch `patches/simple-markdown@0.7.3.patch` (21 lines, `git show 132a7ab6…:patches/simple-markdown@0.7.3.patch`) changes only a React element symbol (`react.element` to `react.transitional.element`); it does not touch em or strong. simple-markdown is pinned `0.7.3` (`package.json`, pnpm-lock.yaml L8).

### Hand trace of `***ab***` (not run; see caveat)

The trace assumes simple-markdown 0.7.3 default regexes and rule order as recalled, not read from the library source. This sweep did not read the library (the only copy is in the working tree's node_modules, outside the origin/master scope). Both candidate nestings give the same qualitative result.

- Candidate A, em outside strong (em rule tried first): paragraph > em > strong > text "ab".
  - em opening: grow(1 + 2) = 3 syntax (0-3). Correct.
  - strong opening: skipped (`first` true, the only child). Correct, because em's forward reduce counted it.
  - text: jump 2 (cursor 3 to 5). strong final: strongText 3-5. Correct.
  - strong closing: grow(2 + 0) = 2 (5-7). Not skipped, because `last` is never set.
  - em final: emText 3-7. em closing: grow(1 + 2) = 3 (7-10). The reverse reduce counts strong's closing 2 chars a second time. Expected end of text is 8. Overflow of 2.
- Candidate B, strong outside em: paragraph > strong > em > text "ab".
  - strong opening: grow(2 + 1) = 3 (0-3). Correct.
  - em opening: skipped (`first` true, the only child). Correct.
  - em closing: grow(1) (5-6). strong closing: grow(2 + 1) = 3 (6-9). Expected end 8. Overflow of 1.

Either way: openings come out right for `***ab***`; closings are over-counted because `last` is never set and the reverse reduce re-counts a child's closing. Multi-child parents add a different failure: L47 marks the last child, so the FIRST child can be the one whose delimiter is counted by the parent but whose own opening is not skipped (double count), or the last child's opening can be skipped while no ancestor counted it (cursor left-shift). Not traced further.

## 2. Surfaces using the decorate function

- Only call site: `src/components/SlateEditor/index.tsx` L123: `decorate={useCallback(decorator(editor, useMounted(), isEmbed, contentParser), [])}`. Import at L16 (`from './utils'`), re-export `src/components/SlateEditor/utils/index.tsx` L5.
- SlateEditor is mounted from `src/components/dynamics/SlateEditor.tsx` L3 (`dynamic(() => import('~/components/SlateEditor'), { ssr: true, loading: () => null })`), imported by:
  - `src/components/DiscordContentEditor/Desktop.tsx` L6 import, L92 `<SlateEditor`, L106 `contentParser={interactiveParser}`, L107 `partialMarkdown={partialMarkdown}`, L104 `isEmbed={isEmbed}` (line numbers from `git grep -n`, origin/master).
  - `src/components/DiscordContentEditor/Mobile.tsx` L7 import, L96 `<SlateEditor`, L107 `contentParser={interactiveParser}`, L108 `partialMarkdown`.
- Preload: `src/app/message/m/[id]/edit/page.tsx` L108 `void import('~/components/SlateEditor');` (no decorate call).
- Variants (the parser passed as `interactiveParser`, which becomes `contentParser`, and the flags passed by the caller):
  - `src/components/DiscordMessageEditor/components/ContentBody.tsx` L26 `interactiveParser={markdown?.interactive.parseContent}`
  - `src/components/DiscordMessageEditor/components/EmbedEditor/Embed.tsx` L89 `interactiveParser={markdown?.interactive.parseContent}` (with `isEmbed`, L91)
  - `src/components/DiscordMessageEditor/components/EmbedEditor/EmbedField.tsx` L82 `interactiveParser={markdown?.interactive.parseEmbedTitle}`; L86 `partialMarkdown`; L87 `isEmbed`; L99 `interactiveParser={markdown?.interactive.parseEmbedField}`; L102 `isEmbed`.
  - `src/components/DiscordMessageEditor/components/EmbedEditor/EmbedTitle.tsx` L101 `interactiveParser={markdown?.interactive.parseEmbedTitle}`; L105 `partialMarkdown`; L106 `isEmbed`.
  - `src/components/DiscordMessageEditor/components/ComponentEditors/TextDisplayEditor.tsx` L33 `interactiveParser={markdown?.interactive.parseContent}`.
- Parser variants (`src/utils/markdown/index.tsx` L40-44): `parseContent` = `interactiveBaseRules`; `parseEmbedTitle` = that set minus `codeBlock`, `heading`, `list`, and links; `parseEmbedField` = that set minus `heading`; `parseEmoji` separate. Emphasis rules are in all of these except as stated (not checked per variant beyond the omit lists).
- Flags reaching walkAst are the same code for every variant; only `isEmbed` and the parser differ. `partialMarkdown` does not change the decorator (it changes `withNormalizeNode` and the `editor.children` sync at `SlateEditor/index.tsx` L91).

## 3. Existing tests

- `git grep -l -i -E 'walkAst|decorat' 132a7ab6… -- 'src/**/__tests__/**'`: no hits (exit 1).
- `git grep -l -E 'SlateEditor|Slate|emText|strongText|syntax|decorations|ranges' 132a7ab6… -- 'src/**/__tests__/**'`: hits are only mocks or stubs of the editor (no test imports `decorator` or `SlateEditor` for real):
  - `src/app/message/m/[id]/_components/__tests__/MessageNotFound.edit-and-send-pages.test.tsx:99` `vi.mock('~/components/SlateEditor', () => ({ default: () => null }));`
  - `src/app/message/m/[id]/edit/__tests__/page.sign-in-exit.test.tsx:53` same mock.
  - `src/components/DiscordContentEditor/__tests__/DiscordContentEditor.desktop-typed-text-reaches-message.test.tsx:17` `vi.mock('~/components/dynamics/SlateEditor', ...)` stub that renders a readOnly textarea.
- Test files in the whole suite: `git ls-tree -r --name-only 132a7ab6… -- src | grep -c '/__tests__/'` = 179.
- Markdown and editor-adjacent test files, static call-site count `git grep -c -E '^\s*(it|test|it\.each|test\.each|it\.only|test\.only)\b|\b(it|test)\.each\('` per file:
  - `src/utils/markdown/__tests__/rules.multi-line-code-block.test.ts`: 3 (one `it.each` at L45 over `BODIES`, `it` at L60 and L66; two `describe.each`). Covers code-block fences (`BODIES` L25-39 of the file at `git show 132a7ab6…:src/utils/markdown/__tests__/rules.multi-line-code-block.test.ts`); no input contains emphasis markers.
  - `src/utils/markdown/__tests__/emoji.longest-sequence-first.test.ts`: 1 (`it.each` L12). Emoji translation only.
  - `src/utils/markdown/components/__tests__/MarkdownSpoiler.aria-expanded.test.tsx`: 1. Not decorator.
  - `src/components/DiscordContentEditor/__tests__/DiscordContentEditor.desktop-typed-text-reaches-message.test.tsx`: 2 (L78, L85). Editor is mocked; no decoration.
  - `src/app/message/m/[id]/_components/__tests__/JsonModalBody.choice-rewrites-editor.test.tsx`: 3. Matched by filename only; contents not read.
  - `src/providers/MessageProvider/__tests__/useApiMethods.json-editor-repair.test.ts`: 7. Matched by filename only; contents not read.
- Nested-emphasis inputs: `git grep -n -E '\*\*\*|\*\*[^*]*\*[^*]|\*[a-zA-Z]+\*' 132a7ab6… -- 'src/utils/markdown/__tests__/**' 'src/components/DiscordContentEditor/__tests__/**'` returned no lines. This pattern is a heuristic over those two directories only.
- Count of executed cases: not run. The static counts above are call sites; `it.each` expansion is not computed.
- No test in the suite drives `decorator` or asserts a Slate `Range` offset.

## 4. Record hits

Command: `git -C /usr/local/bin/hooks/agent-output grep -n -i -e walkAst -e decorat HEAD -- architecture research handoff planning` (exit 0). Hits:

- `architecture/closed/018-next-upgrade-save-size-cap-architecture-findings.md:92` and `:95` (decorator reads highlight.js `_emitter`).
- `architecture/system-architecture.md:16` (2026-11-20 row: "The editor reads highlight.js's private emitter tree"), and `:238` (Problem Areas row on `SlateEditor/utils/decorator.tsx` walking `highlightedBlock._emitter.rootNode.children`; registered by plan 018 AF-12).
- `planning/closed/018-next-upgrade-save-size-cap.md:348` (decorator.tsx and markdown/rules.tsx fail with TS7016 on an older highlight.js) and `:402` (the decorator and the codeBlock rule walked by UAT).
- `research/codebase-bug-evaluation-2026-11-08.md:171` (H-4, the source row). No hit for walkAst or decorat in `handoff/` on HEAD.

These hits concern the highlight.js path (decorator.tsx L72) and not the emphasis offset question, except the H-4 row itself.

## 5. What no instrument here sees

- No run. The parser output, the decorations produced by `decorator`, and the Slate rendering were not executed; the section-1 trace is by hand.
- The simple-markdown 0.7.3 source (em and strong regexes, and whether em or strong sorts first in `defaultRules`) was not read. It lives in the working tree's node_modules, which is outside the origin/master scope. The candidate-A and candidate-B traces are both given because the result does not depend on which one holds.
- No test exercises `decorator` at all (section 3), so vitest on this SHA cannot show the offset result either way. The vitest exit code was not recorded because no run was made.
- Browser behaviour for range offsets past the text length (clamping, throw, or silent misplacement inside Slate) was not observed.
- Working-tree state of website and agent-output was not read; any local edit to decorator.tsx is not reflected here.
- Whether the H-4 confidence (Med) holds is not settled by this sweep.
