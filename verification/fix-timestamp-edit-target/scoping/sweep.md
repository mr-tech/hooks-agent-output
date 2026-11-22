# Sweep: timestamp edit target (H-5) — steering-hooks scoping

Scope of this file: facts only, read from origin/master. Nothing was run, reproduced, installed or committed.

- SHA read: `132a7ab6f49d8a85ead507e2221ab3c3a531fd00` from `git -C /usr/local/bin/hooks/website ls-remote origin master` (refs/heads/master).
- All website reads: `git show 132a7ab6f49d8a85ead507e2221ab3c3a531fd00:<path>`, `git grep -n|-l|-c ... 132a7ab6f49d8a85ead507e2221ab3c3a531fd00 -- <paths>`. The working tree was not read.
- Brief source: `/usr/local/bin/hooks/agent-output/research/codebase-bug-evaluation-2026-11-08.md` row H-5 (line 172): "A timestamp edit in the preview can target the wrong `<t:…>` … the raw-string replace counts occurrences inside code spans too." Disconfirming test given there: two timestamps, one inside backticks; edit the second.
- preview-image-generator was not touched. No `.env*` file was read.

## 1. Index, date, and the rewrite

### 1a. Rule (parser side)
`src/utils/markdown/rules.tsx:193-212`, rule `discordTimestamp`:
- :195 `match: SimpleMarkdown.inlineRegex(/^<t:([0-9]+)(?::([tTdDfFR]))?>/)`
- :196 `parse(capture) { return { timestamp: Number(capture[1]), format: capture[2] || 'f' }; }`
- :204-209 renders `<MarkdownTimestamp key={state.key} state={state} timestamp={timestamp} format={format} />`

### 1b. Component (index and date)
`src/utils/markdown/components/MarkdownTimestamp.tsx`:
- :32 `let date = dayjs(timestamp * 1000);`, :33 `if (!state.mounted) date = date.utc();`
- :35 `const [localDate, setLocalDate] = useState<null | Date>(date.toDate());`. The date is captured once at mount; it is not resynced when the `timestamp` prop changes.
- :44-48 the index:
```
const index = useMemo(() => {
  state.indexes = state.indexes ?? { timestamp: 0 };
  state.indexes.timestamp = state.indexes.timestamp ?? 0;
  return state.indexes.timestamp++;
}, []);
```
  Only a mounting instance runs this factory (deps `[]`). The counter lives on the `state` object of one parse. Only rendered `MarkdownTimestamp` instances increment it.
- :50-66 the edit handler. It returns early when unchanged (:51-58), then:
```
const newTimestamp = Math.floor(localDate.getTime() / 1000).toString();   // :59
state.onChange(
  /<t:([0-9]+)(?::([tTdDfFR]))?>/g,
  `<t:${newTimestamp}:${localFormat}>`,
  index,
);                                                                        // :61-65
```
  It is invoked from `AnchoredPopover.Child` `afterLeave={onChange}` (:89), so the write happens when the popover closes.

### 1c. Rewrite (raw string)
`src/components/Markdown.tsx:18-27` (the `state.onChange` supplied to every parse that has an `onChange` prop):
```
onChange: onChange && ((regex, newText, index) => {
  let idx = 0;
  const tmp = value.replace(regex, (searchValue) => {
    if (idx++ === index) {
      return newText;
    }
    return searchValue;
  });
  onChange(tmp);
}),
```
- `value` is the raw prop string the parser ran on.
- `regex` is the global `/<t:([0-9]+)(?::([tTdDfFR]))?>/g` written by the component. The callback counts every match in the raw string, with no knowledge of code spans or fences, and the `index` from the component is compared against that count.

### 1d. Do timestamps inside code spans render, and are they indexed?
- Static path, `src/utils/markdown/rules.tsx:293-304`: `inlineCode` spreads `SimpleMarkdown.defaultRules.inlineCode` (match and parse) and overrides only `react`, which renders `<code className='inline'>{_node.content}</code>`. The content is the code text. It is not re-parsed, so the rule at :193 does not run on it. Result: no `MarkdownTimestamp` is rendered for a `<t:…>` inside backticks (inferred, see section 5).
- Interactive path, `src/utils/markdown/rules.tsx:514-521`: `inlineCode.parse` returns `{ content: capture[0] }`, the raw span with backticks. The interactive rules are built at :477-535, with the `state.inCodeBlock` gate at :524-534.
- Fenced blocks: `rules.tsx:86-124` (static `codeBlock`) and :490-501 (interactive). Same consequence.
- Index: a timestamp inside a code span never mounts a `MarkdownTimestamp`, so it never increments `state.indexes.timestamp`.
- Rewrite: the global regex at `MarkdownTimestamp.tsx:62` does match it, and it advances `idx` in `Markdown.tsx:21`.

So the index skips code-span timestamps and the rewrite counts them. That mismatch is the H-5 mechanism, and the source supports it.

### 1e. The hypothesis at source level (not run)
Raw text `` `<t:1700000000:f>` and <t:1800000000:f> ``:
- Render: one `MarkdownTimestamp` (for 1800000000), index 0.
- Click and change it: `Markdown.tsx:21` returns `newText` for match number 0, which is the code-span occurrence (1700000000). The code-span text is rewritten, and the clicked timestamp is left as it was.

## 2. Surfaces where a timestamp can be clicked to edit

A `MarkdownTimestamp` is clickable only when `state.onChange` is set (`MarkdownTimestamp.tsx:68-77` renders a plain `<span>` otherwise). `state.onChange` is set only where `Markdown` receives an `onChange` prop (`Markdown.tsx:18`).

Clickable (the `Markdown` element is given `onChange`):
| # | File:line | Mode | Fields fed |
|---|---|---|---|
| a | `src/components/DiscordContentEditor/index.tsx:53-62`, `onChange={onChange}` at :60 | read-only branch, `!showEdit` | `ContentBody.tsx:21-28` (message content, parser `parseContent`); `EmbedEditor/Embed.tsx:81-92` (embed description, `showEdit={showEdit && showEmbedDescriptionEditable}` so the read-only branch runs when that is false); `ComponentEditors/TextDisplayEditor.tsx:26-36` (text display content) |
| b | `src/components/DiscordMessageEditor/components/EmbedEditor/EmbedTitle.tsx:48-79` (read-only branch `if (!showEdit)` at :48), `Markdown` at :58-64 (URL variant, `onChange={setTitle}` at :62) and :70-76 (plain, :74) | read-only | embed title (parser `parseEmbedTitle`) |
| c | `src/components/DiscordMessageEditor/components/EmbedEditor/EmbedField.tsx:54-61` (`if (!showEdit)` at :54), name at :58 (`parseEmbedTitle`, `onChange={setName}`), value at :59 (`parseEmbedField`, `onChange={setValue}`) | read-only | embed field name and value |

Read-only field list for (c): `EmbedFields.tsx:126-141`. The list is built with `.map((entry, idx) => ({ ...entry, idx }))` at :130, then `.filter(... showEdit || (name && value))` at :131, then `.map(({ gridColumn, field, idx }) …)` at :132. The index survives the filter. This is the shape that research F-42 (`codebase-bug-evaluation-2026-11-08.md:153`) said was broken. Its test exists at origin/master (section 3). This sweep did not run it.

Not clickable (the `Markdown` element has no `onChange`):
- `src/components/DiscordContentEditor/Desktop.tsx:77-88` (unfocused preview, `Markdown` at :80-85).
- `src/components/DiscordContentEditor/Mobile.tsx:81-88` (preview, `Markdown` at :82-87).

Editor (Slate):
- `src/components/SlateEditor/index.tsx` takes `contentParser={interactiveParser}` (`Desktop.tsx:92-109`, `Mobile.tsx:96-109`). The interactive AST has no `react` output. `MarkdownTimestamp` is referenced only at `rules.tsx:8` and `rules.tsx:204`. No `timestamp` string appears in `src/components/SlateEditor` at this SHA (`git grep -n -i timestamp SHA -- src/components/SlateEditor` returned no lines).

Parser per field, from `src/utils/markdown/index.tsx:30-32` (static) and :40-42 (interactive):
- message content, embed description, text display: `parseContent` (`staticBaseRules`, all rules).
- embed title, field name: `parseEmbedTitle` (codeBlock, heading and list omitted; link and inlineCode kept).
- field value: `parseEmbedField` (heading omitted).

Not `<t:` surfaces: the embed footer uses `timestampToString` (`EmbedFooter.tsx:58-71`, :133). Embed author has no `Markdown` element (`git grep -n '<Markdown\b' SHA -- src` lists no `EmbedAuthor` hit).

## 3. Tests

Commands and results at SHA `132a7ab6…`:
- `git grep -l -i -E 'timestamp|MarkdownTimestamp' SHA -- 'src/**/__tests__/**'` → 6 files, none about `<t:…>`:
  - `src/components/DiscordMessageEditor/components/EmbedEditor/__tests__/EmbedFooter.length-error.test.tsx`
  - `…/EmbedEditor/__tests__/EmbedFooter.missing-text.test.tsx`
  - `…/EmbedEditor/__tests__/EmbedFooter.typed-text-reaches-embed.test.tsx`
  - `src/server/api/utils/__tests__/previewImage.commit-statement.test.ts` (matches `clock_timestamp`)
  - `src/utils/__tests__/formatMessageDate.same-day.test.ts`
  - `src/utils/__tests__/messageDrafts.bound-and-recency.test.tsx`
- `git grep -n -E '<t:' SHA -- 'src/**/__tests__/**'` → no lines (exit 1). `git grep -c -E '<t:' SHA -- 'src/**/__tests__/**'` → no lines (exit 1). So no test has a Discord timestamp, inside backticks or not.
- `git grep -n -E 'MarkdownTimestamp|discordTimestamp' SHA -- 'src/**/__tests__/**'` → no lines. No test mounts `MarkdownTimestamp`.
- `git grep -n -E 'backtick|inlineCode|inline code' SHA -- 'src/**/__tests__/**'` → no lines. No test covers inline code.
- Markdown-related tests:
  - `src/utils/markdown/__tests__/rules.multi-line-code-block.test.ts`: `git grep -c -E '^\s*(it|test)(\.each)?\(' …` → 3 call sites. Its `BODIES` table has 17 rows (`git grep -c -E "^  \['" …`). Covers fenced blocks only.
  - `src/utils/markdown/components/__tests__/MarkdownSpoiler.aria-expanded.test.tsx`: 1 call site.
- Related but not timestamp: `src/components/DiscordMessageEditor/components/EmbedEditor/__tests__/EmbedFields.read-only-field-index.test.tsx`: 4 call sites (`it.each` at :54, :60, :69, :77), covering read-only field indexing (F-42 area).
- Call-site total across `src/**/__tests__/**`: 1175 call-site lines in 162 files, from `git grep -c -E '^\s*(it|test)(\.each)?\(|^\s*(it|test)\.(each|only|skip)' SHA -- 'src/**/__tests__/**'` summed with awk. This is not a vitest case count (`it.each` expands). The vitest run was not performed.
- Runner config: `git grep -n -E 'vitest|include' SHA -- vitest.config.*` → `vitest.config.ts:21` `include: ['src/**/*.test.ts', 'bot/**/*.test.ts']`, `:26` `include: ['src/**/*.test.tsx']`, `:28` `setupFiles: ['./vitest.setup.dom.ts']`.

Axiom check (by reading the test list only): no existing test pins the H-5 behaviour in bug form or in spec form. Nothing in the suite would fail on the H-5 mechanism.

## 4. Record hits

Command: `git -C /usr/local/bin/hooks/agent-output grep -n -i -e MarkdownTimestamp -e '<t:' HEAD -- architecture research handoff planning` (exit 0):
- `HEAD:research/codebase-bug-evaluation-2026-11-08.md:153` (F-42): read-only field index after filter; a `<t:…>` edit through `Markdown onChange` → `setField` → `newFields[idx]` overwrites a different field. Rated "Verified (reading)", 8 / 4.
- `HEAD:research/codebase-bug-evaluation-2026-11-08.md:172` (H-5): the row this sweep scopes. Conf. Low-Med, 6 / 3.
- `HEAD:research/competitive-feature-landscape-2026-11-08.md:534` (S33): "The markdown renderer already renders `discordTimestamp`". Not a defect.
- No hits in `architecture/`, `handoff/` or `planning/` at HEAD.

## 5. What no instrument here sees

- No test was run and no vitest, tsc or browser run was done. H-5 is supported by reading source only.
- simple-markdown 0.7.3 source is not in git (`package.json:85` `"simple-markdown": "^0.7.3"`; `pnpm-lock.yaml:8` and :10, with patch `patches/simple-markdown@0.7.3.patch`). The inline-code match regex, the rule ordering, and the `state.key` assignment that `rules.tsx:205` relies on all live there. The conclusion that code spans are consumed positionally rests on that unread code. The patch file (21 lines, read with `git show SHA:patches/simple-markdown@0.7.3.patch`) changes only `TYPE_SYMBOL` and `ref`, not rule order or inline code.
- Only origin/master was read. The deployed build, the working tree, and unpushed commits are not covered.
- The popover's `afterLeave` timing and the value of `localDate` at that point were not exercised.
- Frequency: no data on how often real messages place a timestamp inside a code span.
- The record was checked at its HEAD only. The F-42 status is inferred from `EmbedFields.tsx:130-132` and the existence of its test, not from a run.

## 6. Second candidate, not in the H-5 row (reasoning only, unverified)

The index is fixed at mount, but `state` is rebuilt on each parse, so the counter restarts per parse:
- `Markdown.tsx:15-18` passes a new state object on every render.
- `MarkdownTimestamp.tsx:44-48` runs its factory only on mount.

Consequences, if React reuses instances by `key={state.key}` (`rules.tsx:205`):
- An instance that was already mounted keeps the index it got at its first mount, even if a timestamp is inserted before it.
- A timestamp that mounts in a later parse takes a counter value from that parse's mount order, not from its document position. It can collide with a kept index.
- `localDate` (`MarkdownTimestamp.tsx:35`) is never resynced, so a reused instance may keep displaying the old date (`:38`, `:41`).

Whether any of this happens depends on how simple-markdown assigns `state.key`, which was not read (section 5).
