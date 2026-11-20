# Minting read for B-9 and B-10: hooks.gg `/preview` renders highlighted code blocks (production, Next 16.1.6)

2026-11-20T05:22Z, qa-hooks-018, stage browser (kept profile). This was a single look: no sign-in was used and nothing was typed or
saved. `/preview` (`src/app/preview/page.tsx` at `7923a1d`) renders `DiscordMessageEditor` from the `data` query parameter, with
`setMessage` a no-op. Its error boundary shows "Invalid message data." when rendering throws.

URL (built by `node -e`, content = three fenced blocks ` ```js const a = 1; ` / ` ```ts let b: number = 2; ` / ` ```diff + x - y `):

    https://hooks.gg/preview?data=%7B%22content%22%3A%22%60%60%60js%5Cnconst%20a%20%3D%201%3B%5Cn%60%60%60%5Cn%60%60%60ts%5Cnlet%20b%3A%20number%20%3D%202%3B%5Cn%60%60%60%5Cn%60%60%60diff%5Cn%2B%20x%5Cn-%20y%5Cn%60%60%60%22%7D

`browser_evaluate` result:

| Read | Value |
|---|---|
| elements whose class contains `hljs` | 11 |
| distinct `hljs*` classes | `hljs`, `hljs-addition`, `hljs-attr`, `hljs-built_in`, `hljs-deletion`, `hljs-keyword`, `hljs-number` |
| "Invalid message data." shown | false |
| `[data-slate-editor]` on the page | 0, so this page covers the preview (the `codeBlock` rule) only, not the decorator |
| negative control `[class*="zq-never-present"]` | 0 |
| console errors | 0 |

Under QAF-10's `paths` form, the same page would reach `(void 0).getLanguage` in the `codeBlock` rule. By construction, that should
show "Invalid message data." or 0 `hljs-*` token classes. This is inferred from the bundle and was not rendered.
