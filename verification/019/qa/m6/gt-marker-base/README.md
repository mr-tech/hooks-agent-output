# `>` typed to make `>>> a` at the start of a long message: chain base and fix tip

Asked by planner-019 (CR-20 fix round hand-off, implementation Outstanding 2). Written by qa-019, 2026-11-24.

- Trees: `git archive` exports of website `af3d95a` (the chain base, 574 of 574 blobs match) and `42128cd` (the fix tip, 680 of
  680 blobs match), each with its own `pnpm install --frozen-lockfile --offline`. Both run network-isolated:
  `unshare -rn npx vitest run src/components/SlateEditor/utils/__tests__/withNormalizeNode.gt-probe.test.tsx`, exit 0 on both.
- The base probe builds the editor the way the base's `SlateEditor/index.tsx` does: `withNormalizeNode(withEmojis(withHistory(
  withReact(createEditor()))), false, markdown.interactive.parseEmoji)`. At the base, content and embed description both pass
  `partialMarkdown=false` with that parser, so one construction covers both. The tip probe uses `editorHolding(text, surface)`
  on `content` and on `embedDescription`.
- The keystroke: the caret goes at the start of line 0 of `>> a` followed by N-1 lines of `a`, then `editor.insertText('>')`.
- The positive control (base run): a normaliser that never settles throws Slate's cap error on the same run.

Result: both trees settle up to N = 122 and throw "Could not completely normalize the editor after 126 iterations" from N = 123.
The throwing sizes tested are 123, 124, 125, 126, 127, 200, 1000 and 2048. After the throw, the document is in its intended end
state on both trees: every line is `blockQuote`, the text is `>` followed by the input, and the caret is at `[0,0]` offset 1.

Files: `probe-af3d95a.test.tsx.txt` and `probe-42128cd.test.tsx.txt` (the probes as run), and `run-af3d95a.out.txt` and
`run-42128cd.out.txt` (their vitest output).
