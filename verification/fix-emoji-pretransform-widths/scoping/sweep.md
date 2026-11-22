# Scope sweep — parser pre-treatment changes source widths

Read-only sweep. Nothing edited, staged or committed. All reads are `git -C /usr/local/bin/hooks/website show origin/master:<path>` / `git grep ... origin/master`.

## Base

- `git -C /usr/local/bin/hooks/website rev-parse --short origin/master` -> `febf20e` (matches expected).

## 1. Pre-treatments of parser input

Instrument: `git show origin/master:src/utils/markdown/utils.ts`, `.../emoji.tsx`, `.../rules.tsx`, `.../index.tsx` read in full (regions: whole files); `git grep -n -E "interactiveParser|translateSurrogatesToInlineEmoji|..." origin/master -- src`.

Exactly ONE pre-treatment rewrites the input text before parsing:

| Pre-treatment | Where | What it rewrites | Width change |
|---|---|---|---|
| `translateSurrogatesToInlineEmoji(input)` | defined `src/utils/markdown/emoji.tsx:83-85` (regex `replacer` built at `emoji.tsx:73-81`, longest key first; table from `EMOJI_TO_NAME` `emoji.tsx:14-35`); called at `src/utils/markdown/utils.ts:41` (`staticParserFor`) and `utils.ts:66` (`interactiveParser`) | every known emoji surrogate (base, base+skin-tone, ZWJ sequences) -> `:name:` or `:name::skin-tone-N:` via `convertSurrogateToName` (`emoji.tsx:60-68`) | always grows. Measured with a scratch script over `src/constants/emoji.ts` at origin/master (`node w.js emoji.ts` in the scratchpad): 3650 surrogate entries, UTF-16 length histogram {1:61, 2:1225, 3:139, 4:874, 5:181, 6:19, 7:825, 8:16, 9:20, 11:12, 12:180, 14:3, 15:95}, no ASCII-only entry, none shorter than 1. So `🙂` (2 units) -> `:slight_smile:` (14), a 1-unit symbol (e.g. a BMP symbol) -> `:name:`, never a shrink. Unknown-to-table emoji are left as surrogates (width unchanged) and later matched by the `emoji` rule (`rules.tsx:253-259`, `EMOJI_RE`). |

Other things that were checked and are NOT input rewrites:

- Mentions, timestamps, custom emoji, whitespace, line endings: no pre-treatment; rules match the raw text (`rules.tsx:129-221`).
- Escapes: `escape` rule (`rules.tsx:280-283`) is a parse-time rule, but its node is `{type:'text', content: <char>}` (library default) so node `content` is 1 narrower than its source (`\*` -> `*`). This is the same property (node width != source width) from a different cause; it affects every caller below that uses `content.length` (see D-escape).
- `text` rule rewrites `match[0]` for list stops (`rules.tsx:453-455`, `\n\d+$` -> `\n`), width shrink inside lists only (static/interactive both; interactive parsers include `list` except `parseEmbedTitle`).
- `interactiveBaseRules` wrapper (`rules.tsx:533-551`) adds `source: capture[0]` to every node: `source` is in PRETREATED text, not original. `markerWidth` (`rules.tsx:505-507`) is also computed from `capture[0]` of pretreated text.
- Simple-markdown itself appends `\n\n` to the source before parsing (implied by `getInitialValue.ts:65` slicing 2 chars from the last node, and by `utils.ts:48-52` popping a trailing `'\n\n'` leaf). node_modules is not installed in the tree, so this was read only through those two call sites, not from the library.
- Every parser exported at `src/utils/markdown/index.tsx:30-52` goes through the same two wrappers, so all of them pretreat: static `parseContent`, `parseEmbedTitle`, `parseEmbedField`; interactive `parseContent`, `parseEmbedTitle`, `parseEmbedField`, `parseEmoji` (rules limited to emoji, nameEmoji, discordEmoji, text, escape; `index.tsx:43-49`).

## 2. Callers (instrument: `git grep -n -E "interactiveParser|translateSurrogatesToInlineEmoji|parseEmoji|parseContent|parseEmbed|contentParser|emojiParser|staticParser|\.interactive\b|getInitialValue" origin/master -- src`, region: all of `src/`; hits outside the tables below are type declarations `src/@types/simple-markdown.d.ts:4,88` and comments)

### Class (a): uses node `content.length` / offsets / widths against the ORIGINAL text

| file:line | what it does |
|---|---|
| `src/components/SlateEditor/utils/withNormalizeNode.ts:172` (`parseEmoji(childText)`), `:176-198` | `offset += cur.content.length` (`:197`) and `focus.offset = offset + cur.content.length` (`:190`) used as a Slate range into the ORIGINAL leaf text, then `Transforms.insertNodes` at that range (replaces the range). `cur.content` for a pretreated emoji is `:name:` (`rules.tsx:383`), wider than the surrogate -> range over-reaches and deletes following characters. Escapes before the emoji shrink `offset` (content 1 vs source 2). No guard for code-block lines (no check of `node.type`/`node.lang`). Entry: `handleElement` `:89`, called from `:213`. |
| `src/components/SlateEditor/utils/decorator.tsx:222` (`parserContent(node.text, ...)`) | whole decorator is width arithmetic over the pretreated AST applied to ORIGINAL `node.text`: `sourceOf` (`:24-26`, `source` = pretreated `capture[0]`), `contentWidth` (`:36-38`), `openingWidth`/`closingWidth` (`:44-53`, uses `markerWidth`), `growMaskedLinkClosing` (`:73-81`, `indexOf` of `targetSource` in pretreated `source`), `walkAst` (`:83-118`, `leaf.jump(sourceOf(ast).length)` at `:93`,`:107`), `normalizeAst` source concat (`:152`); cursor in `createLeaf.ts:9-18,54-79`. Ranges are emitted as Slate offsets into the original text. Code lines (`ancestor.lang`) bypass the parser (`:220`, `codeLineRanges` `:200-208`, hljs on raw text) and are unaffected by the pretreatment. |
| `src/components/SlateEditor/utils/getInitialValue.ts:49` | takes `node.content` text from the parsed result (a) and `slice(0, len-2)` of the last node (`:65`, assumes the parser's appended `\n\n`); also class (b), see below. |

### Class (b): rebuilds stored/displayed text from the parsed tree

| file:line | what it does |
|---|---|
| `src/components/SlateEditor/utils/getInitialValue.ts:49-69` | builds the initial Slate document from `parseEmoji(text)`: non-emoji nodes contribute `node.content` (`:64-65`) -> text of an `escape` node loses its backslash and an escaped emoji (`\🙂` -> `\:slight_smile:` -> escape `:` + text `slight_smile` + `:`) comes back as `:slight_smile:`; emoji nodes become `{type:'emoji', ast: node}` (`:55-62`) whose `ast.content` is `:name:` (never the surrogate). Only applied to non-code lines (`isCodeBlock` branch `:33-35` uses raw `text`). |
| `src/components/SlateEditor/index.tsx:53,58-59` | `getInitialValue(initialValue, emojiParser, ...)` seeds state; `string = flattenNodeText(descendants)` then `useEffect(() => onChange(string))` writes it back to the message. `flattenNodeText.ts:11` returns `node.ast.content` for emoji elements, i.e. the `:name:` form. So any emoji element (loaded, typed, or picked via `editor.insertText(emoji)` at `index.tsx:94-98` then normalized at `withNormalizeNode.ts:172`) is persisted as `:name:` (rewritten, wider than what the user typed), and an escaped emoji is persisted rewritten and unescaped. |
| `src/components/SlateEditor/utils/onCopy.ts:29` | clipboard text = `flattenNodeText(fragment)` -> emoji copied as `:name:` (same mechanism; consequence, no parser call of its own). |
| `src/components/SlateEditor/utils/withNormalizeNode.ts:176-198` | also (b): the replacement element carries `ast: cur` (`:183`) so the stored text for that range becomes `cur.content` = `:name:`. |

### Class (c): only renders the tree (unaffected)

- `src/utils/markdown/utils.ts:36-60` `staticParserFor` wrapper: pretreats then `renderer(ast, state)`.
- Static users, all render-only: `src/components/Markdown.tsx:15`; `DiscordContentEditor/index.tsx:53-59`, `Desktop.tsx:79-84`, `Mobile.tsx:81-86`; `DiscordMessageEditor/components/ContentBody.tsx:25`, `ComponentEditors/TextDisplayEditor.tsx:32`, `EmbedEditor/Embed.tsx:88`, `EmbedEditor/EmbedField.tsx:58,59,81,98`, `EmbedEditor/EmbedTitle.tsx:59,71,100`.
- Note on `Markdown.tsx:18-27` (`onChange` for the timestamp picker): rebuilds text from the ORIGINAL `value` by regex + match index (`MarkdownTimestamp.tsx:44-66`, regex `<t:...>`), not from the tree and not from widths; pretreatment cannot create or remove `<t:..>` matches, so it is not affected by emoji widths (it does rely on node-render order = regex match order, which is independent of this property).
- Interactive wiring that only passes the function through (no use of the result): `DiscordContentEditor/Desktop.tsx:105-106`, `Mobile.tsx:106-107`, `SlateEditor/index.tsx:43-49,123`, `ContentBody.tsx:26`, `TextDisplayEditor.tsx:33`, `Embed.tsx:89`, `EmbedField.tsx:82,99`, `EmbedTitle.tsx:101`. The real consumers are the three class (a)/(b) files above.
- `renderElementFactory.tsx:58-76` reads `element.ast.*` for display only.
- `onChange.ts`, `onKeyDown.ts`, `createLeaf.ts` (apart from the cursor above), `common.ts`, `index.tsx` `withEmojis` do not call a parser.

## 3. Existing tests touching these callers

Instrument: `git ls-tree -r --name-only origin/master src | grep __tests__ | grep -E "Slate|markdown|Markdown|ContentEditor|MessageEditor"` and `git grep -n -E "parseEmoji|markdown|getInitialValue|handleElement|normalize" origin/master -- <test dirs>`.

- `src/components/SlateEditor/utils/__tests__/decorator.emphasis-syntax-ranges.test.ts` — drives `decorator` with `markdown.interactive.parseContent/parseEmbedTitle/parseEmbedField` (`:10-17`). Its only emoji content: `x = "\🙂" + 1` inside a CODE line (`:427-428`, bypasses the parser) and a code line split by an emoji element (`:438-468`, uses `parseEmoji(':smile:')` only to build the element). No case has an emoji surrogate in a non-code line, so decorator-vs-pretreatment is untested.
- `src/components/SlateEditor/utils/__tests__/onCopy.cut.test.tsx` — `withEmojis` + `onCopy`; hand-built emoji element with `ast.content: '🙂'` (`:20-24`), i.e. a fixture the real parser would not produce (it yields `:slight_smile:`); no parser call.
- `src/utils/markdown/__tests__/emoji.longest-sequence-first.test.ts` — `translateSurrogatesToInlineEmoji` on 5 sequences; asserts the rewrite itself (the width change is the spec there).
- `src/utils/markdown/__tests__/rules.multi-line-code-block.test.ts` — static and interactive `parseContent`/`parseEmbedTitle` node types for fenced blocks; no emoji.
- `src/utils/markdown/components/__tests__/MarkdownSpoiler.aria-expanded.test.tsx` — spoiler component only.
- `src/components/DiscordContentEditor/__tests__/DiscordContentEditor.desktop-typed-text-reaches-message.test.tsx` — mocks `interactiveParser={() => []}` (`:60`) and `useMarkdown` with `parseEmoji: () => []` (`:32`); does not exercise the real parser.
- Instrument for the other direction: `git grep -l -E "getInitialValue|withNormalizeNode|handleElement" origin/master -- 'src/**/__tests__/*'` -> no hit. **No test exercises `getInitialValue.ts` or `withNormalizeNode.ts`.**
- Test-instrument note: `git grep -c -E "[🙂😀]|emoji" origin/master -- 'src/**/__tests__/*'` lists, among others, `decorator.emphasis-syntax-ranges.test.ts:5`, `onCopy.cut.test.tsx:6`, `emoji.longest-sequence-first.test.ts:5`; the remaining hits (`limits.v2-send-validity.test.ts`, `discordV2SendCorpus.ts`, etc.) are payload corpus, not editor callers.

## 4. Known defects mapped to callers

| Defect (as reported by others, not re-measured here) | Caller(s) | Mechanism from source |
|---|---|---|
| Pasted line `x🙂 abcdefghijklmnopq` loses characters | `withNormalizeNode.ts` `handleElement` `:172-198` (class a) | parsed result: text `x`, nameEmoji `:slight_smile:` (14). Range = offset 1 .. 1+14=15 over the ORIGINAL `x🙂 abcdefghijklmnopq` (2-unit emoji), so the replaced range covers the emoji (2) plus 12 following characters. |
| Emoji in a fenced code line deletes the text after it on normalize | same `handleElement` `:172-198` — no `codeBlock`/`lang` guard, runs for every non-emoji Element | same over-reach; code-line path in `decorator.tsx:220` is not the cause (hljs, no parser). Also `getInitialValue.ts:33-35` deliberately uses raw text for code lines, so only the normalizer converts them. |
| Stored `\🙂 **a**` loads as `:slight_smile: **a**` | `getInitialValue.ts:49-69` (class b: `escape` node -> `content` without backslash, `:64-65`) then persisted through `SlateEditor/index.tsx:58-59` (`flattenNodeText`), `onChange` | `\🙂` pretreated to `\:slight_smile:`; the escape consumes `:` and the rest is text. |
| Escaped emoji before formatting skews colouring | `decorator.tsx:222-226` + widths `:24-118` (class a) | `sourceOf` of the nodes after `\🙂` is in pretreated text (`\:slight_smile:` = 15 vs 3 original), so every range after it is shifted by 12 units. Same shift applies to an unescaped emoji that is still a surrogate in a text leaf before normalization has converted it into an element. |
| (extra, same mechanism, not emoji) `\*` before an emoji | `withNormalizeNode.ts:190,197` | escape node width 1 vs source 2 skews `offset`. Reported for completeness; not in the brief's four. |
| (extra) every emoji element persists as `:name:` | `flattenNodeText.ts:11` via `index.tsx:58-59`, `onCopy.ts:29` | expected consequence of the pre-treatment; whether this is intended product behaviour is not decided by this sweep. |

## 5. What this sweep could not see

- Runtime and browser behaviour: Slate selection/normalization order (a `normalizeNode` pass can run `handleElement` repeatedly and in other orders than traced here), IME input, real paste events, `contentEditable` DOM mapping, `fixSelection` effects. No code was executed in the editor; only the emoji table was scanned with a node script.
- Simple-markdown internals: `node_modules` is not installed in the tree (`ls node_modules/simple-markdown/dist` -> no such file), so the appended `\n\n`, the `escape` default parse, and `parseInline` behaviour are inferred from call sites, not read from the library. Rule orders and exact node shapes for nested emphasis were not traced.
- Nodes of unknown emoji (matched by `EMOJI_RE` `emoji.tsx:10`, not in the table): width equals source, so assumed unaffected; not enumerated.
- Whether `NAME_TO_EMOJI`/`EMOJI_TO_NAME` include names that collide with ordinary `:text:` (so typing `:smile:` literally is already consumed by `nameEmoji` regardless of pretreatment) — not examined.
- Dynamic loading: `useMarkdown` / `MarkdownProvider` (`~/providers/MarkdownProvider`) and `~/components/dynamics/Markdown` were not read; if they wrap or substitute the parser functions, callers via them were found only by the `markdown?.interactive/static` references above.
- Server-side or other-repo consumers (send path, API routers, `project-utils`, `preview-image-generator`) were not searched; the grep covered `src/` of `website` only. `git grep` over `src/` found no other use of `translateSurrogatesToInlineEmoji`, `getInitialValue`, or the three interactive parser factories outside the files named above.
- Behaviour on origin/master vs the working tree: only `origin/master` was read; uncommitted working-tree changes by other sessions were not examined.
- The four known defects were not re-measured; mappings are by static reading.
