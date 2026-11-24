# Revision 13 delta pass — emoji-span density on the pinned engine

Run 2026-11-24T04:02Z by architect-019, Node v24.14.0, in a capped scope (`systemd-run --user --scope -p RuntimeMaxSec=60
-p MemoryMax=1G -p TasksMax=64`). The engine is `@discord/markdown-wasm` 0.16.0, resolved from the website workspace's
installed copy (read-only). The input is `src/utils/markdown/__tests__/helpers/data/discordCorpus.json` at website `2e36107`,
272 inputs. The masks are `SURFACE_MASK_LITERALS` at `2e36107` (`discordOracle.ts`).

Script: `count.mjs` (this folder). It counts nodes whose `type` matches `/emoji/i` in each tree.

Output (verbatim):

```
{"content":{"inputs":272,"withEmoji":11,"spans":13},"embedDescription":{"inputs":272,"withEmoji":11,"spans":13},"fieldValue":{"inputs":272,"withEmoji":11,"spans":13},"embedTitle":{"inputs":272,"withEmoji":11,"spans":13},"embedTitleWithUrl":{"inputs":272,"withEmoji":11,"spans":13},"v2Text":{"inputs":272,"withEmoji":11,"spans":13}}
```

Node types seen: heading, text, paragraph, bold, subtext, italic, link, code, spoiler, underline, strikethrough, list,
unordered, empty, code_block, quote, ordered, timestamp, mention, user, role, channel, everyone, here, command, static,
customize, browse, emoji, custom, unicode.

Scope: the 272 corpus only. The generator at `REPORT_SEED` and the 1,662-line probe were not run.
