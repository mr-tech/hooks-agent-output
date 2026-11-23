# Sweep at 0411d3b — normalisation loop, bare code fence with a block quote

Scope: read-only except this file. Export: `git -C /usr/local/bin/hooks/website archive 0411d3b | tar -x -C /tmp/claude-1000/-usr-local-bin-hooks/be654015-3f09-428b-a033-27bb8e062df1/scratchpad/sweep-9c`, `node_modules` symlinked to the shared one. Shared tree not touched. Scratch tests and two local mutations were made only inside the export (mutated file restored, `diff` against the original clean). Raw vitest output of the repro: `/tmp/claude-1000/-usr-local-bin-hooks/be654015-3f09-428b-a033-27bb8e062df1/scratchpad/repro2.out`. The scratch test files were deleted from the export after the run; the harness is described under (b).

Disclosure: a first attempt to write this file through a shell heredoc was refused by the record-write gate; it is written here with the Write tool instead.

Label key: **run** = executed in the export; **read** = read from code, not run.

## (a) Mechanism at 0411d3b — all limbs hold  (read, plus confirmed by run in (b))

`febf20e..0411d3b` changed both files, but only emoji-offset logic (`sourceOf`, `sourceOffsetsOf`, `splitsName`), signature reformatting and a ternary rewrite `(x && y) || ''` -> `x && y ? y : ''` (same value). Fence, quote and lang logic is unchanged (`git diff febf20e 0411d3b` on both files, read).

| Limb | Still holds | Location at 0411d3b |
|---|---|---|
| Normaliser fence regex uses `+`, so a bare fence never matches and `currentLang` stays `null` | yes | `withNormalizeNode.ts:66` `/```([A-Za-z0-9-]+)$/`; `:67` assign; `:71` `if (!inCodeBlock) currentLang = null` |
| Initial-value regex uses `*`, so a bare fence gives `''` | yes | `getInitialValue.ts:96` `/```([A-Za-z0-9-]*)$/`, `:97` `currentLang = res[1] ?? ''`; stored `lang` is `''` at `:89` |
| Compare `child.lang !== currentLang` sees `'' !== null` for every code line in a bare fence | yes | `withNormalizeNode.ts:35`; entry to the update pass at `:41` |
| Update pass writes `lang: ''`, the same value already stored, so the compare can never be satisfied | yes | `withNormalizeNode.ts:56-61` (`:58` the ternary) |
| Quote branch re-inserts the stripped line text on every update pass, for every blockQuote element | yes | `withNormalizeNode.ts:49-51` `Transforms.insertText(... childText.replace(/^ *>(>>)? /, ''), { at: [childLocation] })`; `childText` always carries `> ` because `flattenNodeText.ts:13` prefixes it |
| The insert emits real operations even when text is unchanged | yes (run) | op tally for one forced normalise, `> a` + bare fence: `{"remove_text":124,"insert_text":124}`; first ops are `remove_text "a"`, `insert_text "a"` at `[0,0]` |

Discriminator: the quote line. `setNodes` with equal values emits no operation (run: the no-quote bare fence settles with 0 ops, see (b)), so only the quote branch's `insertText` turns the always-true compare into a loop. The error text is Slate's own (not in website source).

## (b) Reproduction through the real parser and normaliser  (run)

Harness (scratch, in the export only): `getInitialValue(text, markdown.interactive.parseEmoji, false)` assigned to `editor.children` of `withNormalizeNode(withEmojis(withHistory(withReact(createEditor()))), false, parseEmoji)`; `normalizeNode` wrapped to count calls. "forced" = `Editor.normalize(editor, { force: true })`. "typed" = select end of line 0, `Transforms.insertText(editor, 'x')`. Run with `npx vitest run --project node --disableConsoleIntercept <file>`, exit 0 (the scratch file only logs). `rootCalls` = normalizeNode calls on the editor root; `allCalls` = all calls.

Error text (every throw, identical apart from N): `Could not completely normalize the editor after N iterations! This is usually due to incorrect normalization logic that leaves a node in an invalid state.`

| Input (lines) | Forced normalise | One inserted char (end of line 0) |
|---|---|---|
| `> a` / bare fence / `foo` / fence (the defect) | THROW after 378 iterations; rootCalls 124, allCalls 379 | THROW after 126 iterations; rootCalls 42, allCalls 127; text afterwards `> ax` / fence / `foo` / fence (the char is in the model, the exception escapes the operation) |
| `> a` / ```` ```js ```` / `foo` / fence (control) | settled, ops 0, rootCalls 1, allCalls 9 | settled, ops 1, rootCalls 1, allCalls 3 |
| `a` / bare fence / `foo` / fence (no quote line) | settled, ops 0, rootCalls 1, allCalls 9 | settled, ops 1, rootCalls 1, allCalls 3 |
| bare fence / `foo` / fence (fence alone) | settled, ops 0, rootCalls 1, allCalls 7 | settled, ops 2, rootCalls 2, allCalls 5 (char lands on the fence line) |
| bare fence / fence, no content line | settled, ops 0, allCalls 5 | settled, ops 1, allCalls 3 |
| `> a` / bare fence / `foo` (unclosed) | THROW after 294 iterations; rootCalls 97, allCalls 295 | THROW after 126 iterations; rootCalls 42, allCalls 127 |
| `>>> a` / bare fence / `foo` / fence | THROW after 378 iterations; rootCalls 53, allCalls 379 | THROW after 126 iterations; rootCalls 18, allCalls 127 |

Initial model for the defect input (run): `[blockQuote,'',false,"> a"] [div,'',false,"```"] [codeBlock,'',true,"foo"] [div,'',true,"```"]`.

Local mutations (export copy, restored):
- M1: `withNormalizeNode.ts:66` `+` -> `*`. The defect input, the unclosed variant and the `>>>` variant all settle: forced ops 0, rootCalls 1; typed ops 1, rootCalls 1. The `+`/`*` disagreement is sufficient cause.
- M2: guard `:49` additionally on `stripped !== flattenNodeText(child.children)`. The same four inputs settle with the same counts. The unconditional re-insert is also sufficient cause; fixing either limb alone ends the loop on these inputs.

Not run: a real browser or React mount, the `onChange` -> `setDescendants` path, and whether the throw reaches `ErrorBoundary` (`DiscordContentEditor/index.tsx`). The earlier sweep's "typing never reaches onChange" was not run end to end; the run shows only that the throw escapes `insertText` with the typed char already in the model.

## (c) Region sweep

Language derived from a fence, compared or stored:

| Hit | What | Same defect? |
|---|---|---|
| `withNormalizeNode.ts:20`, `:66-71` | derives lang with `+`, resets to `null` | **Yes** — the origin (read; confirmed by M1 run) |
| `withNormalizeNode.ts:35` `child.lang !== currentLang` | the only compare of stored lang with derived lang | **Yes** — `''` vs `null` (run) |
| `withNormalizeNode.ts:58` `lang: isFullCodeBlock && currentLang ? currentLang : ''` | store: coerces `null` to `''` | No on its own: it stores `''`, matching `getInitialValue`; the mismatch is in the compare (read) |
| `withNormalizeNode.ts:68` `else if (res?.[0] && inCodeBlock && currentLang) currentLang = ''` | closing fence with a lang sets `''`; `:70-71` then resets to `null` | No (read): overwritten at `:71` when the closing fence toggles. No counterpart in `getInitialValue` |
| `getInitialValue.ts:26`, `:96-99`, `:89` | derives lang with `*`, stores `isCodeBlock && currentLang ? currentLang : ''` | No — it is the reference value (read) |
| `getInitialValue.ts:97` and `withNormalizeNode.ts:67` `res[1] ?? ''` | `?? ''` is unreachable (group 1 is always a string when the regex matches) | Dead code in both, no defect (read) |
| `decorator.tsx:199`, `:216-217` `ancestor.lang` / `line.lang` | consumes stored lang by truthiness; `''` and `null` both falsy; model type is `string` (`@types/slate.d.ts:10`) | No (read) |
| `createLeaf.ts:38,44` | lang passthrough | No (read) |
| `utils/markdown/rules.tsx:19`, `:92`, `:493-499` | static preview parser; normalises to `''` with `\|\|` | No — never compared against editor state (read) |
| `withNormalizeNode.ts:190`, `getInitialValue.ts:67` | emoji elements `lang: ''` constants | No (read) |

Side check (read): both sides toggle `inCodeBlock` on an odd count of three-backtick runs (`getInitialValue.ts:98` `blocks.length % 2 === 0`; `withNormalizeNode.ts:70` `isOdd`); the results agree.

Normaliser branches that re-insert text on each pass:

| Branch | Behaviour | Same defect? |
|---|---|---|
| `withNormalizeNode.ts:49-51` blockQuote `insertText` | unconditional on every update pass, no equality guard; emits remove+insert even for equal text | **Yes** — the amplifier (run) |
| `withNormalizeNode.ts:56-61` `setNodes` | runs on every update pass; no operation when values are equal | No (run: no-quote bare fence settles with 0 ops). It does cost one full update pass per root normalise whenever a bare fence exists (wasted work, not a loop) |
| `withNormalizeNode.ts:167-173` smart-quote replace | rewrites the offending codepoint; converges | No (read) |
| `withNormalizeNode.ts:106`, `:117`, `:139` span inserts | each guarded by a condition its own insert removes | No (read) |
| `withNormalizeNode.ts:128` trailing empty span delete | deletes its trigger | No (read) |
| `withNormalizeNode.ts:101` `setNodes({...node, empty: true})` | guarded by `!node.empty` | No (read) |
| `withNormalizeNode.ts:187-202` emoji `insertNodes` | replaces the text range with an emoji element; element skipped next pass (`:221`) | No (read; the existing emoji test covers the line-text case) |
| `index.tsx:91` `editor.children = descendants` | direct assignment, emits no operation | No (read) |

Related shape (read, not otherwise run): `>>>` multi-line quote. `flattenNodeText.ts:13` emits `> ` for every blockQuote element, so `withNormalizeNode.ts:29` (`/^ *>>> /` on `childText`) can match only text typed into a quote line, while `getInitialValue.ts:32-35` strips `>>> ` once. The `>>>` input in (b) loops only through the same `:49-51` + `:35` pair, and settles under M1.

## (d) Callers, surfaces and existing tests

Mount chain (read): `withNormalizeNode` is applied at one place, `components/SlateEditor/index.tsx:61`. `SlateEditor` is loaded by `components/dynamics/SlateEditor.tsx` and rendered from `DiscordContentEditor/Desktop.tsx:107` and `Mobile.tsx:108` (both pass `partialMarkdown`). `DiscordContentEditor` is rendered by (call sites by `grep -rn "<DiscordContentEditor"`; the partialMarkdown column from `grep -rn partialMarkdown` plus the earlier sweep for the unflagged ones):

| Surface | file:line | partialMarkdown | Full normaliser (`handleEditor`) |
|---|---|---|---|
| Message content | `DiscordMessageEditor/components/ContentBody.tsx:21` | not passed | yes |
| Embed description | `EmbedEditor/Embed.tsx:82` | not set | yes |
| Embed field value | `EmbedEditor/EmbedField.tsx:92` | not set | yes |
| Embed field name | `EmbedEditor/EmbedField.tsx:75` (flag `:86`) | set | no |
| Embed title | `EmbedEditor/EmbedTitle.tsx:93` (flag `:105`) | set | no |
| Text display component | `ComponentEditors/TextDisplayEditor.tsx` | not set (earlier sweep; not re-read here) | yes |

`partialMarkdown` surfaces cannot form the shape: `getInitialValue.ts:30,35` switch off code-block and quote detection, and `withNormalizeNode.ts:220` skips `handleEditor`.

Existing tests touching the files (run: `grep -rln -E "SlateEditor|withNormalizeNode|getInitialValue|flattenNodeText"` over every `__tests__` dir in the export):
- `src/components/SlateEditor/utils/__tests__/withNormalizeNode.emoji-keeps-line-text.test.tsx` — real `withNormalizeNode`; assigns `editor.children`, then `Transforms.insertText`; 5 `it`/`it.each` call sites (lines 35, 40, 45, 50, 57; the one at 50 is an `it.each` of 2 rows). The fenced case at `:57-65` uses a ```` ```js ```` fence with no quote line. No bare fence and no quote line anywhere in the file.
- `src/components/SlateEditor/utils/__tests__/getInitialValue.stored-text-loads-unchanged.test.ts` — `getInitialValue` + `flattenNodeText` round trip, emoji and escape inputs only; no fence, no quote.
- Mocks only, no normaliser: `DiscordContentEditor/__tests__/DiscordContentEditor.desktop-typed-text-reaches-message.test.tsx`, `app/message/m/[id]/edit/__tests__/page.sign-in-exit.test.tsx`, `app/message/m/[id]/_components/__tests__/MessageNotFound.edit-and-send-pages.test.tsx`.
- Other SlateEditor tests in the same dir, not on these two files: `decorator.emphasis-syntax-ranges.test.ts`, `onCopy.cut.test.tsx`.
- Runner: `vitest.config.ts` projects `node` (`src/**/*.test.ts`) and `dom` (`src/**/*.test.tsx`, jsdom). The scratch repro ran under `node` with `withReact(createEditor())` without a DOM.
- Coverage gap (read): no test covers a quote line with a fence, a bare fence, or `handleEditor`'s compare and update passes. The suite was not re-run.

## Not established

- Browser and React behaviour of the throw (error boundary, whether `onChange` fires).
- Whether the shipped build is `0411d3b`.
- Slate source was not read; the op and iteration counts are empirical from the Slate install in the shared `node_modules`.
