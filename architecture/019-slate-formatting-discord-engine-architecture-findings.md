---
ID: 019
Origin: 019
UUID: 286c730a
Status: Active
Status-Detail: >-
  Conformance pass on plan 019 revision 1 (record 103687b4): APPROVED_WITH_CHANGES. One HIGH: M5 as written re-parses each
  line once per Slate text node, measured at 2.15 s per decorate pass on a 2,000-character line (CF-1). Two MEDIUM: the
  emoji lift keeps a second recogniser, which drifts from the preview (CF-2), and the two-command test form (CF-3). OQ-4 is
  answered (CF-7). Goes to planner-019. A delta pass reads the next revision.
---

# 019 — architecture conformance: Slate formatting on Discord's engine

## Changelog

| Date (UTC) | Agent | Change | Notes |
|---|---|---|---|
| 2026-11-23T15:58 | architect-019 | Conformance pass on plan 019 revision 1 (record `103687b4`) | Brief from `steering-hooks-fixer` by message; common brief `steering/slate-formatting-brief-common.md`. The plan was read whole. Website was read at `af3d95a` from a `git archive` export, with the shell in the record folder and exact paths only (his 15:29Z selection). highlight.js 11.12.0 was read from the shared tree's installed copy, read-only. `@discord/markdown-wasm` 0.16.0 was run under Node 24.14.0 in capped scopes. Captures are in `verification/019/architect-conformance/`. The pre-planning findings (`architecture/closed/slate-formatting-preview-architecture-findings.md`) were closed Resolved in this pass, because plan 019 carries every item they raised. |

## Design this plan builds on

The design is the pre-planning findings, adopted by his selection D-6 (block 15:23Z). The plan carries their items as
follows:
- AF-2's single release: M7.
- AF-3's pin, adapter and upgrade discipline: M2 with AC-2.1 to AC-2.4.
- AF-4's notice: AC-2.6.
- AF-5's build spike: AN-1.
- AF-7's generator read: P-2 and AN-2. P-2 settles my uncompleted read: the generator waits on `networkidle0` only.
- AF-8's editor specification: D-11 and AC-5.6.
- AF-9's block layer: X-9.

P-1 settles AF-2's unread premise: `parse` carries no spans.

## Conformance table (every concrete form the plan writes)

The test for each row is "why was this created, and does it make sense beside the files around it?" Where a row deviates
from the current pattern, its readers are listed.

| Form (plan section) | Existing pattern at `af3d95a` | Status |
|---|---|---|
| Exact pin, `0.16.0` (M2, AC-2.2) | `package.json` `"zod": "3.22.4"`, `"@vercel/functions": "3.11.3"` | Follows. |
| Engine loaded lazily on the client (M2) | `src/providers/MarkdownProvider.tsx` `useValue` (dynamic `import('~/utils/markdown')` in an effect) | Follows. |
| Init-failure line, `console.error` (M2) | `MarkdownProvider.tsx` `useValue` `.catch(console.error)` | Follows; the fixed prefix is preferable. |
| Provider value becomes the adapter's ready state (M2) | `MarkdownProvider` `Context` holds `MarkdownParsers` (`src/@types/simple-markdown.d.ts`) | Deviation, **necessary**. Readers in CF-5. |
| Pending state renders plain text (M2, AC-2.5) | `DiscordContentEditor/index.tsx` read-only branch renders `null` until `markdown` and `staticParser` are set | Deviation, **preferable**. It is AF-7's "never an empty block". |
| Six per-surface masks as named constants (M2, AC-2.3) | `src/utils/markdown/index.tsx`: three parsers per mode (`parseContent`, `parseEmbedTitle`, `parseEmbedField`) built by `omit` over one rule set. Field names use `parseEmbedTitle` (`EmbedField.tsx`), and the embed description and V2 text display use `parseContent` (`Embed.tsx`, `TextDisplayEditor.tsx`) | Deviation, **necessary** where AN-3 finds the surfaces differ. Where two surfaces have equal masks, one constant aliased under both names follows the current pattern. |
| Node kind → renderer map (M2, M4) | `src/utils/markdown/rules.tsx` `staticBaseRules`, each rule's `react` output, one home | Follows. |
| Token kind → leaf class map (M2, M5) | `src/components/SlateEditor/utils/createLeaf.ts`, type → class, one home | Follows. |
| Decorator contract kept; the line parsed and spans mapped onto its text nodes (M5) | `SlateEditor/utils/decorator.tsx` default export is called per **text node** (`if (!Text.isText(node)) return []`) and parses `node.text` alone | Deviation, **necessary**: parsing per text node is S-01's split cause. **The form as written has no per-line cache** (CF-1). |
| Code lines through a public highlight.js surface (M5, OQ-4) | `decorator.tsx` `codeLineRanges` reads `_emitter.rootNode`, typed by the site's own `src/@types/highlight.js.d.ts` | Deviation, **necessary** (S-14). The surface is in CF-7. |
| Timestamp edit target from a span (M4, AC-4.3) | `src/components/Markdown.tsx` rewrites the n-th regex match; `State.onChange(regex, text, index)` in `simple-markdown.d.ts` | Deviation, **necessary** (D-8). Readers in CF-6. |
| MIT notice in built client assets (M2, AC-2.6) | No notices form exists in the repo (no third-party notice in `public/` or `src/app`) | Deviation, **necessary**. It is the first such form. |
| Emoji lift stays on `simple-markdown` (X-8) | `getInitialValue.ts` and `withNormalizeNode.ts` call `interactive.parseEmoji`; `rules.tsx` `baseInteractiveRules` spreads `staticBaseRules`, so today the lift and the preview recognise emoji with **one** rule | Deviation, **avoidable**: after M4 the two recognisers differ (CF-2). |
| `pnpm test` / `pnpm test:discord` (M3, D-12) | `vitest.config.ts`: two projects through the `project()` factory (`node`: `src/**/*.test.ts`; `dom`: `src/**/*.test.tsx`); `package.json` `"test": "vitest run"` | Form unstated; CF-3. |
| Frozen corpora as data (M3) | `src/utils/__tests__/helpers/discordV2SendCorpus.ts`: measured Discord observations as typed literals with `measuredOn`, read by one test | Follows, if the 272-case corpus, the 107 link inputs and frozen expected values take this form. |
| Known-differences report written under `verification/019/` (M3) | No website command writes into a sibling repository | Deviation, **avoidable** (CF-4). |
| Lifted instruments under `__tests__/`, named per Test Conventions (M3) | Workspace `CLAUDE.md` § Placement and naming; helpers under `src/**/__tests__/helpers/` | Follows. |
| Drift alarm and predicate locator in the Discord command (M3) | — (new; research § 4) | New form, inside the Discord command only. |

## Findings

### CF-1 HIGH — M5 re-parses each line once per text node; parse each element once per change

M5 parses "the line's text … not each Slate text node alone" and keeps the decorator contract
`([node, path]) → Range[]`. slate-react calls that function once per **text node**: `decorator.tsx` returns `[]`
for anything that is not a `Text`. So, as written, a line split into k text nodes by emoji elements, mentions or
timestamps is parsed k times in every decorate pass. Measured with `parseLossless` at the pin, under Node
(`verification/019/architect-conformance/split.out`):

| Line | Text nodes | Re-parse per text node | Parse once |
|---|---|---|---|
| 2,000 chars, an emoji every 5 | 401 | 2,154 ms per pass | 5.2 ms |
| 4,100 chars, an emoji every 5 | 821 | 8,921 ms per pass | 11.3 ms |
| 2,000 chars, an emoji every 50 | 51 | 30.8 ms per pass | 0.55 ms |

2,000 is `MAX_MESSAGE_CONTENT_LENGTH`. Under W-2 a stored message can be longer, and embed descriptions reach 4,096.
Parse cost alone grows about linearly with length: `parseLossless` takes 9.9 ms median on a 4,096-character
multi-line text and 50 ms at 20,000 (`time.out`).

**Required change:** the token tree is computed once per element per change, and each text node's ranges are sliced
from it. Slate replaces an element object whenever its content changes, so a `WeakMap` keyed on the ancestor
`Element` gives a cache that invalidates itself. The mechanism is the implementer's choice.

**Criterion to add to M5:** over the generator's lines and a 2,000-character line split into 401 text nodes, one
decorate pass calls the engine at most once per element. That is counted by an instrumented call counter, not timed,
and shown red against the uncached form (axiom A).

Option pair: *follow the current pattern* (parse per text node) is not viable, because it is the S-01 split cause;
*accept the deviation* with the cache.

### CF-2 MEDIUM — Keeping the emoji lift on `simple-markdown` makes the editor and the preview recognise different emoji

Today one rule decides which characters are emoji, both in the preview and in the editor's lift:
`baseInteractiveRules` spreads `staticBaseRules`, and `interactive.parseEmoji` uses that rule. After M4 the preview
asks the engine, while the editor's lift (X-8) still asks `simple-markdown`. Where they disagree, the editor shows an
emoji image and the preview shows text, or the other way round. Research Appendix B row 230 is a measured member:
`© ™` is `e(u:©) " ™"` in the site's rules and plain text in both Discord parsers. So after M4 the editor would draw
© as an emoji and the preview would not. That is drift between edit and preview, which W-3 exists to prevent, and this
plan introduces it.

Two ways to close it:
- **(a) Follow the plan (X-8).** Keep the lift, and add an M6 criterion: over the generator, the corpus and the
  1,662-line probe, the set of character ranges the lift turns into emoji elements equals the set of `emoji` nodes the
  engine returns for the same text under the content mask. Fix `emoji.tsx` until it holds. Two recognisers stay, held
  equal by a test.
- **(b) Recommended.** Take the lift's ranges from the adapter's `parseLossless` `emoji` nodes in M6. The spans index
  the typed text, so the lift's pre-transform goes too. `simple-markdown`, its `patches/` entry and
  `src/@types/simple-markdown.d.ts` then leave the product altogether (the Components line in the plan's header changes
  with them).

  Readers of the current form: the Slate emoji element stores a `simple-markdown` node as `element.ast`, so this
  changes a shape other code reads. The readers are:
  - `renderElementFactory.tsx` `emojiToImage` (reads `ast.jumboable`, `ast.name`, `ast.emojiId`, `ast.animated`);
  - `flattenNodeText.ts` and `onCopy.ts` (serialise the element);
  - `getInitialValue.ts` and `withNormalizeNode.ts` (build it);
  - the custom types in `src/@types/slate.d.ts`.

  Each one must read the new element shape. D-10 already changes what `flattenNodeText` emits for this element, so M6
  touches these files in any case.

(b) is within D-6's intent ("one engine"). Whether it is within its reach is the planner's to state. If the planner
reads it as outside, it goes to steering as a scope delta, and (a) is the floor.

### CF-3 MEDIUM — State the two-command form as vitest projects; it changes a convention other stages read

Under the current `include` globs, a Discord-oracle file named `*.test.ts` or `*.test.tsx` would be collected by
`node` or `dom`, and `pnpm test` would fail offline, which breaks D-12.

The form that follows the pattern is a third project, `discord`, built by the same `project()` factory, with its own
include (a distinct suffix or a directory). The existing projects' includes exclude it.

The one reader that changes is the `test` script. It becomes `vitest run --project node --project dom`, and
`test:discord` becomes `vitest run --project discord`. The workspace `CLAUDE.md` Test Conventions say "`pnpm test`
runs the whole suite". That sentence, and QA's commands that cite it, become false for the Discord project, so the
plan names the convention-file update and who lands it.

The Discord project also needs both `node` and `dom` environments if AC-3.1 compares rendered DOM. vitest allows a
per-project environment, so that may mean two Discord projects. That is the implementer's choice, stated in the plan.

Option pair: *follow the current pattern* (two projects, everything in `pnpm test`) contradicts D-12; *accept the
deviation* as above.

### CF-4 LOW — The known-differences report should not be written into the record from a website command

A test command in `website` that writes into `agent-output/verification/019/` couples the product's suite to the
record repository's location on this box. No website command does that today.

Avoidable form: the command writes the report to a website-local path that `.gitignore` excludes, or to a path an
environment variable names. The stage that runs it (QA, devops) copies it into `verification/019/`.

Option pair: *follow the current pattern* (the suite writes only inside its own repository); *accept the deviation*.
Recommended: follow.

### CF-5 LOW — The provider value changes shape: the readers

The readers of `useMarkdown()`'s value are:
- **Nine production consumers:** `DiscordContentEditor/index.tsx`, `Desktop.tsx` and `Mobile.tsx` (`interactive.parseEmoji`);
  `SlateEditor/index.tsx`; `DiscordMessageEditor/index.tsx`; `ContentBody.tsx`, `TextDisplayEditor.tsx` and `Embed.tsx`
  (`static.parseContent` and `interactive.parseContent`); `EmbedTitle.tsx` and `EmbedField.tsx` (the title and field
  parsers).
- **The re-provision:** `Mobile.tsx` re-provides the context with `passthrough={markdown}`.
- **Eight test files:** they read `~/utils/markdown`'s map directly, as listed by `grep` over
  `markdown?.(static|interactive).*` at `af3d95a`.

The new value carries whatever M6 keeps for the lift: `parseEmoji` under CF-2(a), or nothing extra under (b).
`passthrough` keeps working. `EmbedTitle.tsx` and `EmbedField.tsx` read `markdown.static` without `?.` at some sites, so
the pending state of AC-2.5 has to reach them through a guard, not a crash. AC-2.5's "every markdown-rendering surface"
covers this, and these two are named so the implementer finds them.

### CF-6 LOW — The timestamp edit callback changes signature

`State.onChange(regex, text, index)` (`src/@types/simple-markdown.d.ts`) is produced by `Markdown.tsx` and consumed by
`MarkdownTimestamp.tsx`. AC-4.3 replaces it with a span-addressed edit. The `onChange` prop that the
`DiscordContentEditor` read-only branch passes to `Markdown` is the outer reader, and it keeps its `(value: string)`
form. Necessary; no option pair.

### CF-7 LOW — OQ-4 answered: the public surface is `HighlightResult.value`

At highlight.js 11.12.0 (`types/index.d.ts`, installed copy):
- `HighlightResult._emitter` is under the `// private` comment.
- The `__emitter` option is double-underscored.
- The `Emitter` interface is "technically private, but exported for convenience", and it declares no `rootNode`. The
  site supplies `rootNode` itself in `src/@types/highlight.js.d.ts`, which is the cast the Problem Areas row names.

The one public token output is `HighlightResult.value`, the highlighted HTML. Its grammar is closed:
- `<span class="…">` opens a scope (`lib/core.js` `HTMLRenderer`, `this.buffer += \`<span class="${className}">\``);
- `</span>` closes it;
- text is escaped by `escapeHTML` with exactly five entities (`&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#x27;`; `lib/core.js`).

**Answer:** the decorator derives code-line scopes by scanning `value`: a stack over open and close tags, and text
lengths after un-escaping those five entities. That needs no DOM, so it runs the same in the Node project and in the
browser. `_emitter`, `__emitter` and the site's `rootNode` declaration are removed, and the Problem Areas row "The
editor reads highlight.js's private emitter tree" closes on landing. S-14 is therefore a fix, not a stated limit.

AC-5.4's expected value (highlight.js's HTML parsed independently) shares its source with this form. So AC-5.4 tests
the scanner and the range mapping, not highlight.js. The independent parse must be a DOM parse (jsdom `DOMParser`),
never the scanner itself (axiom E).

## Problem Areas and record entries from this pass

- **Lodged:** "The Slate emoji element stores a `simple-markdown` node" (Low). This holds only if CF-2(a) is taken. The
  document model then holds a parser library's node type, so every reader of `element.ast` is coupled to
  `simple-markdown`. It goes into `system-architecture.md` Problem Areas when the plan revision states (a); under (b)
  it does not arise.
- **Landed in `website.md`** as A-9 (agent-designed): markdown parsing reaches every component through one lazily
  loaded provider, and measured Discord observations are frozen as typed literal helpers. These are confirmed pattern
  statements from the table above.

## Verdict

**APPROVED_WITH_CHANGES.** CF-1 is required before implementation approval. CF-2 needs the plan to state (a) or (b),
with (b) recommended. CF-3 and CF-4 need the plan to state the form. CF-5 to CF-7 are carried as written. Nothing here
needs the owner.
