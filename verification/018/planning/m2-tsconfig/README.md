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

## Not established

Under form A, what highlight.js 11.7.0 → 11.12.0 changes in the editor's and the preview's highlighting (not compared).
