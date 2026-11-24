# Revision 15 delta pass — does the pinned engine's `parseLossless` carry emoji spans?

Run 2026-11-24T04:20Z by architect-019, Node v24.14.0, in a capped scope (`systemd-run --user --scope -p RuntimeMaxSec=60
-p MemoryMax=1G -p TasksMax=64`). The engine is `@discord/markdown-wasm` 0.16.0, the website workspace's installed copy, read-only.
The package's own export `parseLossless(data, flags?, fuel?)` (`src/lib/discord_markdown_wasm.d.ts`) was called with
content's literal mask `0x3fffffff`, over QAF-40's five members. The script is `tree.mjs` in this folder.

Output (verbatim, two members printed whole):

```
"😄:smile:" {"kind":{"type":"document"},"span":{"start":0,"end":9},"children":[{"type":"node","kind":{"type":"paragraph"},"span":{"start":0,"end":9},"children":[{"type":"node","kind":{"type":"emoji","value":{"type":"unicode","value":"😄"}},"span":{"start":0,"end":2},"children":[{"type":"token","kind":{"type":"atom"},"text":"😄","span":{"start":0,"end":2}}]},{"type":"node","kind":{"type":"emoji","value":{"type":"unicode","value":"😄"}},"span":{"start":2,"end":9},"children":[{"type":"token","kind":{"type":"atom"},"text":":smile:","span":{"start":2,"end":9}}]}]}]}
"\\*a😄" {"kind":{"type":"document"},"span":{"start":0,"end":5},"children":[{"type":"node","kind":{"type":"paragraph"},"span":{"start":0,"end":5},"children":[{"type":"node","kind":{"type":"text","value":"*a"},"span":{"start":0,"end":3},"children":[{"type":"token","kind":{"type":"escape"},"text":"\\","span":{"start":0,"end":1}},{"type":"token","kind":{"type":"text"},"text":"*a","span":{"start":1,"end":3}}]},{"type":"node","kind":{"type":"emoji","value":{"type":"unicode","value":"😄"}},"span":{"start":3,"end":5},"children":[{"type":"token","kind":{"type":"atom"},"text":"😄","span":{"start":3,"end":5}}]}]}]}
```

The emoji-node counts for all five members (an earlier run of a walker that printed only emoji nodes):
`😄:smile:` 2, `:smile:😄` 2, `😄😄` 2, `\*a😄` 1, `a\_b😄` 1.

Reading: every emoji node carries its own `span`, and its `atom` token carries the source text (`:smile:` at 2–9). The escape
member's emoji sits at 3–5, after the escape token. So the engine decides these spans itself, and no join is needed to recover
them.
