# Plan 018 rev 6, M2's `paths` entry for highlight.js — what the build does with it

Run 2026-11-20T05:0xZ to 05:1xZ by `architect-hooks-018`, in an isolated export under the session scratchpad. Nothing ran in
`/usr/local/bin/hooks/website`. The export was deleted after these captures were copied.

## Steps

1. Export website `7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe` (`git archive | tar x`).
2. Apply the plan's `verification/018/planning/m2-tsconfig/B/tsconfig.diff` with `patch`. The result is
   `tsconfig.committed.json`: `moduleResolution` `bundler`, plus `paths` `"highlight.js": ["./node_modules/highlight.js/types/index.d.ts"]`,
   plus `ts-node` `moduleResolution` `node`.
3. Install: `pnpm install --frozen-lockfile`, then `pnpm add next@16.4.6 @next/bundle-analyzer@16.4.6`. Exit 0 (`add-log.txt`). The
   result pins `highlight.js` at 11.7.0 (`package-pins.txt`).
4. Build: `SKIP_ENV_VALIDATION=1 pnpm exec next build` (Turbopack). Exit 0 (`build.log`), and `tsconfig.json` was left as committed.

Every command ran under `systemd-run --user --scope`.

## Results

`counts.txt` shows, for each build, the number of files carrying each string. It was computed by `grep -rl` into a file, then `wc -l`.

| Build | Files with `highlightAuto` / `registerLanguage` (highlight.js runtime) | Files with `node_modules/highlight.js` |
|---|---|---|
| The plan's form at Next 16.4.6 | 0 static, 0 server | 0 |
| Control: the shared tree's existing base build at Next 16.1.6 (`.next`, `BUILD_ID` 02:07, read only) | 1 static, 2 server | 1 server |

`callsite.txt` is the SSR chunk holding `src/utils/markdown/rules.tsx`'s `codeBlock` rule. It reads
`if(a.lang&&void 0!==(void 0).getLanguage(a.lang)){let b=(void 0).highlight(...)`.

So the bundler resolves the `highlight.js` import through the tsconfig `paths` entry, to the `.d.ts` file. That file has no runtime
value, so `hljs` compiles to `undefined`. A code block with a language tag then throws a `TypeError` at render: `rules.tsx` and
`SlateEditor/utils/decorator.tsx` both call `hljs`.

`tsc`, the build and vitest do not see this. TypeScript reads the `.d.ts` as types, and the build exits 0. The probe did not run the
suite; the plan's run of the same form had it pass.

## Not run

The rendered page (no server was started) and the decorator chunk (the same import, not read separately).
