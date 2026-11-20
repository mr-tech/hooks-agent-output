# Next 16.4.6 rewrites `moduleResolution`; two fixes for highlight.js's types; the ts-node scripts (planning run for M2)

Run 2026-11-20T04:5xZ–05:1xZ by planner-hooks-018, on steering's relay of the implementer's M2 report
(`verification/018/implementation/m2/`, the implementer's logs). Isolated exports of website
`7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe` (`git archive | tar x`, `pnpm install --frozen-lockfile` exit 0,
`pnpm add next@16.4.6 @next/bundle-analyzer@16.4.6` exit 0), each command under `systemd-run --user --scope`. Nothing ran in
`/usr/local/bin/hooks/website`. Exports and tarballs deleted after the copy.

## Next's rule (source, not run)

`npm pack next@16.4.6 next@16.1.6`; `dist/lib/typescript/writeConfigurationDefaults.js` (excerpts here):
- 16.4.6: `preferBundlerResolution = semver.gte(typescriptVersion, '5.0.0') && configuredModule !== CommonJS && configuredModule !==
  AMD`; when armed, the accepted `moduleResolution` values are `node16`, `nodenext`, `bundler`, and anything else is rewritten to
  `bundler` as a mandatory change. The site: TypeScript `^5.9.3`, `module` `esnext`, `moduleResolution` `node` — armed.
- 16.1.6: accepted values included `node10` / `nodejs` (`node`), so the base build leaves it.

## Runs

| Form | `tsconfig.json` | highlight.js | `next build` | typecheck | suite | `ts-node` check |
|---|---|---|---|---|---|---|
| A | `moduleResolution` `bundler` (written by the build) | 11.12.0 (`pnpm update highlight.js`; 11.8.0 is the first with a `types` export condition, `npm view highlight.js@<v> exports`) | 0, no TS error (`A/build.txt`) | 0 | 1913 of 1913, 149 files, exit 0 | **1**, TS5095 (`A/tsnode.txt`) |
| B | `bundler` + `paths` `"highlight.js": ["./node_modules/highlight.js/types/index.d.ts"]` | 11.7.0 (exact, `B/lock-pins.txt`) | 0 (`B/build.txt`) | 0 | 1913 of 1913, 149 files, exit 0 | **1**, TS5095 (`B/tsnode.txt`) |
| A, B + `ts-node.compilerOptions.moduleResolution` `node` | as above plus that key (`B/tsconfig.diff`) | as above | 0, and the build no longer changes `tsconfig.json` (`*/build2.txt`) | 0 (`*/typecheck2.txt`) | — (the `ts-node` block does not reach vitest) | **0**, transpile-only and typed (`*/tsnode-fixed*.txt`, empty output) |

The `ts-node` check is the architecture record's (`architecture/website.md`, "`limits.tsx`'s import closure is env-free"):
`npx ts-node -r tsconfig-paths/register -T -e "require('~/utils/limits')"`, exit 0 at the base tsconfig (`A/tsnode-base-tsconfig.txt`).
TS5095: "Option 'bundler' can only be used when 'module' is set to 'preserve' or to 'es2015' or later" — the `ts-node` block sets
`module` `commonjs`. The scripts it governs: `lang`, `push-commands`, `backfill-valid` (`package.json`). Only the check above was run;
`push-commands` publishes to Discord and `backfill-valid` writes a database, so neither was executed.

## Form B is withdrawn (plan revision 7)

Form B's `paths` entry is read by Turbopack as well as by TypeScript: the build binds `import hljs from 'highlight.js'` to the
declaration file, so highlight.js's runtime is absent from `.next` and both call sites compile to calls on `undefined`
(architect AF-10, `../../architect-conformance/hljs-paths/`; critic F-21; QA QAF-10, `../../qa/m2-hljs-resolution/`). This run's
form-B rows above show build, typecheck and suite passing, and none of them can see it.

## Form A, final (`A-final/`, run 2026-11-20T05:1xZ–05:2xZ)

Export of `7923a1d`; `tsconfig.json` with two keys (`moduleResolution` `bundler`; `ts-node` `moduleResolution` `node`), no `paths`
entry, end-of-file newline kept (`A-final/tsconfig.diff`); `pnpm add next@16.4.6 @next/bundle-analyzer@16.4.6`; `pnpm update
highlight.js` → 11.12.0, specifier `^11.12.0` (`lock-pins.txt`, `package-specifiers.txt`). Every step under `systemd-run --user
--scope`; each file ends with its exit code.

- `next build` exit 0, no "mandatory changes" line, `tsconfig.json` byte-identical before and after (`diff -q`).
- `pnpm run typecheck` exit 0; suite 1913 of 1913, 149 files, exit 0.
- `ts-node` check of `limits.tsx`: `-T` exit 0, typed exit 0 (`tsnode-T.txt`, `tsnode-typed.txt`).
- highlight.js runtime in the build (`counts.txt`, `grep -rl` into a file, then `wc -l`): `highlightAuto` 1 static, 4 server;
  `registerLanguage` 1 static, 4 server; `node_modules/highlight.js` 0 static, 2 server. Architect's readings for comparison: base
  16.1.6 build 1 static, 2 server; form B 0, 0.

## highlight.js 11.7.0 → 11.12.0 (`hl-compare/`, `node compare.cjs <11.7.0> <11.12.0>`, exit 0)

The surfaces website uses: `getLanguage`, `highlight().value` (the preview's `rules.tsx`), `_emitter.rootNode` with `scope` and
`children` (the editor's `decorator.tsx`, through an `unknown` cast that typecheck cannot see past).
- Languages 192 → 193 (added `freedesktop`, none removed); 364 → 378 names and aliases, none that 11.7.0 resolved fails in 11.12.0.
- 18 samples in 18 languages: `rootNode.children` present in all; HTML differs in 4 (typescript, css, java, diff) and the tree in 5
  (those plus html), each a finer or extra token class (e.g. TypeScript object keys as `hljs-attr`, Java `void` as `hljs-type`, a
  diff hunk header as `hljs-meta`). No sample lost a class.

## Not established

How the finer classes look in the site's highlighting theme, and the rendered page itself: no server was started. Plan M2-c's walked
check covers it.
