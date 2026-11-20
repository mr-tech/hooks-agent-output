# Does the production bundle bind `highlight.js` under plan rev 6 M2 form B? (QA Phase 1 re-key, QAF-10)

Run 2026-11-20T05:10Z–05:15Z by qa-hooks-018 (times corrected at the revision 7 re-key; first written ahead of the clock). `probe.sh` (this folder) ran under `systemd-run --user --scope`, in two isolated
exports of website `7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe` (`git archive | tar -x`, each with its own
`pnpm install --frozen-lockfile`, exit 0) in the session scratchpad. Nothing ran in `/usr/local/bin/hooks/website`. No `.env`;
`SKIP_ENV_VALIDATION=1`. The builds had network, because `src/app/layout.tsx` uses `next/font`, which fetches at build time.

- **base:** the tree at `7923a1d`, Next 16.1.6, `next build` exit 0.
- **B:** `pnpm add next@16.4.6 @next/bundle-analyzer@16.4.6` (exit 0), then plan rev 6's three `tsconfig.json` keys applied by
  `probe.sh` (`B-tsconfig.diff`: `moduleResolution` `bundler`, `paths."highlight.js"` → `./node_modules/highlight.js/types/index.d.ts`,
  `ts-node.compilerOptions.moduleResolution` `node`). highlight.js 11.7.0, next 16.4.6 (`B-hljs-version.txt`). `next build`
  exit 0; no "mandatory" line (`grep -c` = 0).

## Instruments and results (`summary.txt`)

| Instrument (over `.next/**/*.js`) | base | B |
|---|---|---|
| files carrying `Falling back to no-highlight mode` (in highlight.js 11.7.0 `lib/core.js`, `grep -c` = 1) | 2 | **0** |
| files carrying `registerLanguage` (second, differently shaped marker) | 2 | **0** |
| files named `*highlight*` | 2 | **0** |
| `(void 0).getLanguage(` / `(void 0).highlight(` call sites (`*-void-hljs-calls.txt`) | 0 | **10** |
| never-present string `zq-never-present-marker-7731` (negative control) | 0 | 0 |

`B-getLanguage-context.txt` shows the markdown `codeBlock` rule as bundled under B:
`if(a.lang&&void 0!==(void 0).getLanguage(a.lang)){let b=(void 0).highlight(a.content,…)`. Turbopack honours `tsconfig.json`
`paths`, so the bare `import hljs from 'highlight.js'` in `src/utils/markdown/rules.tsx` and
`src/components/SlateEditor/utils/decorator.tsx` resolves to the declaration file, and the default import is `undefined`. On this
reading of the bundle, any code block with a language tag, rendered or decorated, throws a TypeError. The page was not rendered here.

Build, typecheck and suite cannot see this: the build exits 0, and vitest resolves through its own `alias` (`vitest.config.ts`
`~`, `bot`), never tsconfig `paths`. So `src/utils/markdown/__tests__/rules.multi-line-code-block.test.ts`, the one test at
`7923a1d` that imports either module (`git grep`, relative and `~` forms), gets the real library under vitest and stays green.

Exports were deleted after the copy.
