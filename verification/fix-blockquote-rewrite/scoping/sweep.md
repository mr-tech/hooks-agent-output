# Sweep — `>>> ` block-quote rewrite on open (H-8)

Scope: read-only sweep of `website` at origin/master. SHA read: `132a7ab6f49d8a85ead507e2221ab3c3a531fd00`, from `git -C /usr/local/bin/hooks/website ls-remote origin master`. Every `website` fact below was read with `git show <sha>:<path>` or `git grep ... <sha>`. No tree changed, nothing committed or installed, `preview-image-generator` not touched. Static reading only: no editor, browser, Slate runtime or vitest run was executed. Predicted outputs are traces, not observations.

Property source: `/usr/local/bin/hooks/agent-output/research/codebase-bug-evaluation-2026-11-08.md:175` (row H-8).

## 1. Load and save code

Load: `src/components/SlateEditor/utils/getInitialValue.ts`

- L26 `const multilineStart: boolean = !inMultilineBlockQuote && /^ *>>> /.test(text);` (not gated by `partialMarkdown`)
- L27 `if (multilineStart) text = text.replace(/^ *>>> /, '');` (the marker is discarded here)
- L28 `inMultilineBlockQuote = inMultilineBlockQuote || multilineStart;` (sticky for the rest of the input)
- L29 `const isBlockQuote = !partialMarkdown && !isCodeBlock && (inMultilineBlockQuote || /^ *> /.test(text));`
- L38–40 a commented-out branch that would have re-emitted `> ` on the first line. Dead code.
- L41–42 `text = text.replace(/^ *> /, ''); type = 'blockQuote';` (one element per source line)

Save: `src/components/SlateEditor/utils/flattenNodeText.ts`

- L7 `(Array.isArray(node) ? node : [node]).map((n) => flattenText(n, allowEmoji)).join('\n')` (elements joined by newline)
- L13 `if (node.type === 'blockQuote') return \`> ${text}\`;` (every blockQuote element emits its own `> ` prefix)

Predicted round-trip for `>>> a\nb`, from reading:

- Line 1 `>>> a`: L26–27 strip the marker, leaving `a`; L28–29 make it a `blockQuote` element.
- Line 2 `b`: L28 keeps `inMultilineBlockQuote` true, so L29 makes it a `blockQuote` element with text `b`.
- Save: flatten gives `> a` + `\n` + `> b`, so the stored string is `> a\n> b`.
- A second load-then-save of `> a\n> b` gives `> a\n> b` (L26 does not match; L29 matches `/^ *> /`; L41 strips and L13 re-adds). So the rewrite happens once and then reaches a fixed point.

Other predicted shapes (same code path):

- `>>> a` alone gives `> a`.
- `x\n>>> a\nb` gives `x\n> a\n> b` (the `x` line is a `div` and is untouched).
- `>>> a\n\nb` gives `> a\n> \n> b`. The empty quoted line is emitted as `> ` with a trailing space by L13.
- Length: the `limit` counter reads `_value.length` (`src/components/DiscordContentEditor/Desktop.tsx:60`). For an m-line quote the length changes by 2(m−2): the marker `>>> ` (4 chars) becomes `> ` (2 chars) on line one, and each following line gains `> ` (2 chars). `>>> a\nb` (7 chars) becomes `> a\n> b` (7 chars, delta 0). A single-line `>>> a` (5 chars) becomes `> a` (3 chars, delta −2).

Partial surfaces (`partialMarkdown` set): L29 switches quote typing off, so the element is a `div`. L26–27 are not gated, so the first marker is still deleted. Predicted: `>>> a` saved as `a`, and `>>> a\nb` saved as `a\nb`. The marker is lost and no `> ` is emitted. Single-line fields can receive this only as `>>> a`, because `SlateEditor/index.tsx:128–130` rejects multi-line paste on partial fields. The two-line case is reachable only from already-stored text.

Normaliser: `src/components/SlateEditor/utils/withNormalizeNode.ts`

- L27 `inMultilineBlockQuote = inMultilineBlockQuote || /^ *>>> /.test(childText);`
- L45–49 the update branch: `type = 'blockQuote'; if (/^ *>>> /.test(childText) || /^ *> /.test(childText)) { Transforms.insertText(editor, \`${childText.replace(/^ *>(>>)? /, '')}\`, { at: [childLocation] }); }`
- For a stored blockQuote, `childText` already begins `> ` (flatten, L13), so the write-back equals the stored leaf. No text change in the traced shape.
- For a `div` element whose literal text begins `>>> ` (a line the user types in the live editor), the same branch strips the marker and converts the element to `blockQuote` (L45–46, L54–59). This runs after an operation, not on open. Predicted, not run: typing `>>> ` at the start of a line stores `> ` from the moment the space is typed.
- The normaliser loop itself (H-2) is covered by the sibling sweep, `/usr/local/bin/hooks/agent-output/verification/fix-normalize-fence-loop/scoping/sweep.md` §1. Not repeated here.

## 2. What writes the editor's text back without a user edit

T1, mount (no blur needed). `src/components/SlateEditor/index.tsx:58` `const string = flattenNodeText(descendants);` and `:59` `useEffect(() => { onChange(string); }, [string]);`. The effect runs once on mount and passes the already-rewritten string to `onChange`.

- Desktop: the editor is rendered only while focused. `src/components/DiscordContentEditor/Desktop.tsx:89` (`{!_focused || !interactiveParser || !markdown ? null : (`). So "mount" means first focus of the field. The write goes through `Desktop.tsx:95–98`: `onChange={(str: string) => { setLocalValue(str); onChange(str); }}`.
- Mobile: `src/components/DiscordContentEditor/Mobile.tsx:96–99` renders `<SlateEditor … initialValue={value ?? ''} onChange={onChange} …/>` inside `BottomPortal` (`Mobile.tsx:91`). Whether children mount while the sheet is closed is decided by `BottomPortal`, which was not read.

T2, blur. `src/components/DiscordContentEditor/Desktop.tsx:45–48` `const _onClose = () => { onClose?.(); onChange(_value); };` and `:49–52` `useFocusWithin({ onFocusWithinChange, onBlurWithin: _onClose })`. `_value` is the local copy from `Desktop.tsx:32` (`usePassedProp(value ?? '')`; the hook body at `src/utils/hooks/index.ts:43` was not read). T1 has already set it to the rewritten string. So blur writes the rewritten string a second time.

T3, each content operation. `src/components/SlateEditor/utils/onChange.ts:8` returns when there are no operations, and `:33–34` `else { setDescendants(descendants); }` runs for every non-selection operation. This feeds `index.tsx:58–59` again. It is the editing path, not an open or blur trigger.

Parent state (where the string lands):

- Content: `src/components/DiscordMessageEditor/index.tsx:93` `const [content = '', setMessageContent] = useStateSetter(message, 'content', _setMessage);`, and `:276` `onChange={setMessageContent}`.
- Embed description: `src/components/DiscordMessageEditor/components/EmbedEditor/Embed.tsx:84` `onChange={setDescription}`.
- Embed field name and value: `src/components/DiscordMessageEditor/components/EmbedEditor/EmbedField.tsx:77` `onChange={setName}` and `:94` `onChange={setValue}`.
- Text display: `src/components/DiscordMessageEditor/components/ComponentEditors/TextDisplayEditor.tsx:21` `set({ ...latest.current, content: val })`, wired at `:30`.

Not traced: whether writing this state persists it to the server or marks the message as changed. That is the save path in `MessageProvider` and `DiscordMessageEditor`. So "changes the saved message text" is established here only as "changes the emitted string and the parent component state".

`src/components/Markdown.tsx:18–26` wraps `onChange` for the static parser. It fires only when a parser rule calls it (which rule was not traced; H-5 concerns the timestamp rules). It is not a mount path from reading.

H-8 wording: the research row says "open, blur, read JSON". Reading says the write happens at T1 (focus, before any blur) and again at T2 (blur). The disconfirming test should also read the stored value after open alone.

## 3. Surfaces that use this editor

Each row is a caller of `DiscordContentEditor`, which renders `Desktop` or `Mobile` and therefore `SlateEditor`. `partialMarkdown` and the quote-parse column are the sibling's columns, extended here with the predicted `>>> a\nb` result.

| Surface | file:line | partialMarkdown | Quote parse on load | Predicted saved text for `>>> a\nb` |
|---|---|---|---|---|
| Message content | `src/components/DiscordMessageEditor/components/ContentBody.tsx:21` (parent `DiscordMessageEditor/index.tsx:268`, `:276`) | not set | yes | `> a\n> b` |
| Embed description | `src/components/DiscordMessageEditor/components/EmbedEditor/Embed.tsx:82–92` | not set | yes | `> a\n> b` |
| Embed field value | `src/components/DiscordMessageEditor/components/EmbedEditor/EmbedField.tsx:92–104` | not set | yes | `> a\n> b` |
| Embed field name | `src/components/DiscordMessageEditor/components/EmbedEditor/EmbedField.tsx:75–88` (`partialMarkdown` at `:86`) | set | no (marker deleted) | `a\nb` (multi-line only from stored text) |
| Embed title | `src/components/DiscordMessageEditor/components/EmbedEditor/EmbedTitle.tsx:93` (`partialMarkdown` at `:105`, per sibling) | set | no (marker deleted) | `a\nb` (multi-line only from stored text) |
| Text display | `src/components/DiscordMessageEditor/components/ComponentEditors/TextDisplayEditor.tsx:26–36` | not set | yes | `> a\n> b` |

Read-only display (no editor, so no write-back on mount): `src/components/DiscordContentEditor/index.tsx:49–65` → `src/components/Markdown.tsx` → the preview rule at `src/utils/markdown/rules.tsx:60–68` (the `blockQuote` rule that accepts `>>> `).

## 4. Tests

Commands, all at the SHA:

- `git -C /usr/local/bin/hooks/website grep -l -E '>>>|blockQuote|flattenNodeText|getInitialValue' 132a7ab6f49d8a85ead507e2221ab3c3a531fd00 -- 'src/**/__tests__/**'` gives one file: `src/server/api/utils/__tests__/previewImage.interleavings.test.ts`. The match is `deferred<void>>>` at L55, which is generic closing brackets and not a block quote.
- The same pattern with `grep -c` gives `…/previewImage.interleavings.test.ts:1`. `grep -c` counts matching lines, not executed cases.
- `git -C /usr/local/bin/hooks/website grep -c -i -E 'quote' 132a7ab6f49d8a85ead507e2221ab3c3a531fd00 -- 'src/**/__tests__/**'` gives no output, so no test file mentions "quote".
- `git -C /usr/local/bin/hooks/website grep -n -F '>>> ' 132a7ab6f49d8a85ead507e2221ab3c3a531fd00 -- 'src/**/__tests__/**'` gives no output, so no test round-trips the `>>> ` marker.
- Editor-naming tests (from the sibling sweep §3, not re-run here): three files that only `vi.mock` the editor (`src/app/message/m/[id]/_components/__tests__/MessageNotFound.edit-and-send-pages.test.tsx:99`, `src/app/message/m/[id]/edit/__tests__/page.sign-in-exit.test.tsx:53`, `src/components/DiscordContentEditor/__tests__/DiscordContentEditor.desktop-typed-text-reaches-message.test.tsx:17`). The sibling also records that `src/components/SlateEditor` has no `__tests__` directory.
- The nearest parser test, `src/utils/markdown/__tests__/rules.multi-line-code-block.test.ts` (2 `it`/`test` lines, L60 and L66, per the sibling), is about fences in the preview parser. The `quote` grep above finds nothing in it.

Result: zero executed test cases exercise `>>>`, `blockQuote`, `flattenNodeText` or `getInitialValue`. No vitest run was made, so there is no exit code to record.

## 5. Record hits

Command, as specified:

`git -C /usr/local/bin/hooks/agent-output grep -n -i -e '>>>' -e flattenNodeText HEAD -- architecture research handoff planning`

Full output was written to `/tmp/claude-1000/-usr-local-bin-hooks/47cb8b91-b62b-4a6a-8e0b-f461ff293d27/scratchpad/sweep-record-hits.txt`. It has one hit:

- `research/codebase-bug-evaluation-2026-11-08.md:175` (the H-8 row, the property source).

Count instrument, same arguments with `grep -c`, written to `/tmp/claude-1000/-usr-local-bin-hooks/47cb8b91-b62b-4a6a-8e0b-f461ff293d27/scratchpad/sweep-record-counts.txt`: `HEAD:research/codebase-bug-evaluation-2026-11-08.md:1`.

Related record line from the sibling sweep, not matched by this pattern: `handoff/typed-back-edit-leaves-saved-message-draft-2026-11-21.md:40`. It says Slate normalisation or another field the editor rewrites "on open or close" is a candidate, and that the cause was not read.

## 6. What no instrument here sees

- Nothing was executed. The predicted outputs are static traces of `getInitialValue.ts`, `flattenNodeText.ts`, `withNormalizeNode.ts` and `index.tsx`. None of them is an observation.
- Slate internals: whether `<Slate initialValue>` (`index.tsx:110–112`) runs normalisation on mount, and whether `insertText` or `setNodes` emit operations when values are unchanged (sibling §5). Both were assumed, not read.
- Mount ordering: the `EmojiPicker` wrapper around `SlateEditor` (`Desktop.tsx:89–90`, `Mobile.tsx:94`), `BottomPortal`'s child-mount behaviour, and the body of `usePassedProp` (`src/utils/hooks/index.ts:43`) were not read.
- `src/components/SlateEditor/utils/onKeyDown.ts:25–27` has blockQuote-specific handling (Enter, Backspace). It was not read, and it could change the typed-`>>> ` path in §1.
- Whether the parent state change persists to the server or marks the message changed (the `MessageProvider` and `DiscordMessageEditor` save path) was not read.
- Discord's own rendering of `>>> a\nb` against `> a\n> b` was not checked. The claim that the saved text changes comes from the code. Any claim that the rendered message changes does not.
- Deployed build: whether production runs the SHA `132a7ab6…` was not checked. The working tree was not read, by rule.
- Production data: whether stored messages hold `>>>` text was not queried.
- Tests: no test was run, and no mutation check was possible in this sweep.
