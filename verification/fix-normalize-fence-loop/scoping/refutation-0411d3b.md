# Refutation — fence loop (9c) and `>>>` rewrite (9f) at website 0411d3b

Run by a `general-purpose-sonnet` helper of `steering-hooks-fixer`, 2026-11-23 08:5xZ. It returned the report as text, and this thread
saved it here verbatim in substance.

Export: `/tmp/claude-1000/-usr-local-bin-hooks/be654015-3f09-428b-a033-27bb8e062df1/scratchpad/refute-9cf` (`git archive 0411d3b`,
`node_modules` symlinked; shared tree untouched). Scratch test `src/components/SlateEditor/utils/__tests__/scratch.refute.test.ts` in the
export, run with `systemd-run --user --scope -p MemoryMax=8G npx vitest run <file>`, exit 0, with results appended to `<export>/out.txt`.
The editor is built as `index.tsx:61` builds it, `withNormalizeNode(withEmojis(withHistory(withReact(createEditor()))), false,
markdown.interactive.parseEmoji)`, and its children come from `getInitialValue(text, parseEmoji, false)`.

## Claim 1 (9c): HOLDS, qualified

The input `> a\n```\nfoo\n```` loads as blockQuote, div "```", codeBlock "foo" (lang "", startCodeBlock true), div "```".

| Action | Result |
|---|---|
| Forced `Editor.normalize` | throws after 378 iterations |
| Insert "x" at the end of line 0, 2 or 3, or the start of line 0 | throws after 126 iterations |
| Insert "x" at the end of line 1 (the opening fence) | settles |
| ```` ```js ```` variant, forced and five insert positions | settles |

Controls (forced):

| Input | Result |
|---|---|
| bare fence alone | settles |
| `a` + bare fence | settles |
| `> a` + bare fence | throws after 378 |
| `> a\nb` + bare fence | throws after 462 |
| `>>> a` + bare fence | throws after 378 |

Mutation, run and then restored to byte-identity with `git show 0411d3b:`: at `withNormalizeNode.ts:35`, `child.lang !== currentLang`
became `(child.lang || null) !== currentLang`, and every case settled.

Cause, read from code and not run:
- `getInitialValue.ts:96` (`*`) gives a bare fence lang `''`.
- `withNormalizeNode.ts:66` (`+`) and the reset at `:71` leave `currentLang` null.
- So the comparison at `:35` is always true, and `handleEditor(update=true)` re-enters on every pass.
- With a quote line, the `Transforms.insertText` at `:49-50` re-dirties the editor on each pass.

## Claim 2 (9f): HOLDS

`flattenNodeText(getInitialValue(t, parseEmoji, false))`, with no edit:

| Input | Output |
|---|---|
| `>>> a\nb` | `> a\n> b` (blockQuote, blockQuote) |
| `>>> a` | `> a` |
| `> a` | unchanged |
| `a` | unchanged |

A forced normalise leaves the outputs unchanged.

Cause:
- `getInitialValue.ts:32-35` detects and strips `>>> ` and sets the multiline state.
- `:47` strips `> `.
- No marker is stored on the node.
- `flattenNodeText.ts:13` emits `> ` for each blockQuote.

## Do they meet

They share an input family but not lines of code.
- 9c depends on `withNormalizeNode.ts:35`, `:66-71` and `:49-50`. Only the `:35` mutation was run.
- 9f depends on `getInitialValue.ts:32-35,47` and `flattenNodeText.ts:13`.
- `handleEditor` reads `flattenNodeText` at `withNormalizeNode.ts:24`. Its `>>> ` test at `:29` cannot match after load (read from code).
- A 9f fix that stores the marker would change what `:24` and `:29` see. Because `:49-50` matches both `>>> ` and `> `, such a fix could
  change the 9c loop for `>>>` inputs (not run). Re-run that case after any 9f fix.
