# ESLint 9 flat-config feasibility probe

Export of website at 7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe (git archive) into a scratch dir; the real tree untouched. No commit.

## Commands and exit codes
1. `git archive 7923a1d... | tar x` then `pnpm install --frozen-lockfile` (systemd-run scope): exit 0.
2. `pnpm add -D eslint@^9.39.5 @eslint/js@^9.39.5 @eslint/eslintrc@^3 eslint-config-next@16.4.6 @next/eslint-plugin-next@16.4.6 typescript-eslint@^8.58.0 eslint-plugin-react@^7.37.5 eslint-plugin-import@^2.32.0 eslint-plugin-jsx-a11y@^6.10.2`: exit 0 (v5 `@typescript-eslint/*` did not block; not removed). Note the archived package.json already pinned eslint ~9.39.5 / typescript-eslint ^8.58.0 / eslint-config-next ^16.4.6; the add changed `@eslint/js` 10.0.1 to ^9.39.5 and added `@eslint/eslintrc`.
3. `pnpm exec eslint . --max-warnings=0 > lint9.txt` (no --fix): iteration 1 exit 2, iteration 2 exit 2, iteration 3 exit 1 (loads and runs).
4. `pnpm exec eslint . -f json -o lint9.json`, tallied with `python3 -I` (ruleId to count; null ruleId shown as `(null)`).

Verdict: it loads (3 iterations of 8).

## Peer-dependency warnings (verbatim from add-log.txt)
```
 WARN  Issues with peer dependencies found
.
├─┬ @typescript-eslint/parser 5.62.0
│ └── ✕ unmet peer eslint@"^6.0.0 || ^7.0.0 || ^8.0.0": found 9.39.5
├─┬ @typescript-eslint/eslint-plugin 5.62.0
│ ├── ✕ unmet peer eslint@"^6.0.0 || ^7.0.0 || ^8.0.0": found 9.39.5
│ └─┬ @typescript-eslint/type-utils 5.62.0
│   └─┬ @typescript-eslint/utils 5.62.0
│     └── ✕ unmet peer eslint@"^6.0.0 || ^7.0.0 || ^8.0.0": found 9.39.5
├─┬ eslint-config-airbnb 19.0.4
│ ├── ✕ unmet peer eslint@"^7.32.0 || ^8.2.0": found 9.39.5
│ ├── ✕ unmet peer eslint-plugin-react-hooks@^4.3.0: found 7.1.1
│ └─┬ eslint-config-airbnb-base 15.0.0
│   └── ✕ unmet peer eslint@"^7.32.0 || ^8.2.0": found 9.39.5
├─┬ eslint-plugin-promise 6.1.1
│ └── ✕ unmet peer eslint@"^7.0.0 || ^8.0.0": found 9.39.5
├─┬ vite 8.0.3
│ └── ✕ unmet peer sass@^1.70.0: found 1.56.2
├─┬ next-auth 4.24.5
│ ├── ✕ unmet peer next@"^12.2.5 || ^13 || ^14": found 16.1.6
│ ├── ✕ unmet peer react@"^17.0.2 || ^18": found 19.2.4
│ └── ✕ unmet peer react-dom@"^17.0.2 || ^18": found 19.2.4
├─┬ react-accessible-accordion 5.0.1
│ ├── ✕ unmet peer react@"^16.3.2 || ^17.0.0 || ^18.0.0": found 19.2.4
│ └── ✕ unmet peer react-dom@"^16.3.3 || ^17.0.0 || ^18.0.0": found 19.2.4
├─┬ react-slider 2.0.4
│ └── ✕ unmet peer react@"^16 || ^17 || ^18": found 19.2.4
└─┬ react-use 17.4.0
  ├── ✕ unmet peer react@"^16.8.0  || ^17.0.0 || ^18.0.0": found 19.2.4
  └── ✕ unmet peer react-dom@"^16.8.0  || ^17.0.0 || ^18.0.0": found 19.2.4
```

## Forced changes (beyond a literal transcription)
Transcription notes: `.eslintignore` is not read by ESLint 9 (it warns); its 8 entries are carried as `ignores`. `env` became `globals` (the `globals` package, browser + es2021). Top-level `plugins` entries `react`/`@typescript-eslint` are not declared by hand (provided by next's flat config and typescript-eslint v8). The v5 parser is replaced by `tseslint.parser`.

1. Error: `ConfigError: Config "next": Key "plugins": Cannot redefine plugin "jsx-a11y".` FlatCompat loads its own plugin instances, which differ from those in eslint-config-next's flat array. Fix: `sharePlugins()` re-points each compat config's `plugins` entries at the objects from `nextConfig`; also applied to `plugin:import/typescript`.
2. Error (iterations 2 and 3, rule enumeration done once against `typescript-eslint` v8 `plugin.rules`): `Could not find "semi" in plugin "@typescript-eslint"`. Rules absent from v8 and therefore removed from the override: `@typescript-eslint/semi`, `no-throw-literal`, `space-before-blocks`, `type-annotation-spacing`, `member-delimiter-style`. The override now carries 27 of its 32 rules.

Residual, not changed: `@typescript-eslint/ban-types` is referenced by an inline `eslint-disable` comment in source and reports "Definition for rule ... was not found" (1 finding).

## Final summary line
`✖ 833 problems (455 errors, 378 warnings)` (exit 1; `240 errors and 60 warnings potentially fixable with the --fix option`). Base: `✖ 665 problems (300 errors, 365 warnings)`.

## Per-rule tallies, base (lint.txt, last token of each problem line matching `^\s+L:C (error|warning)`) vs flat (lint9.json)
Caveats: base multi-line react-hooks messages are counted by their last token, hence the stray base row `` `this`. ``; flat `(null)` are all "Unused eslint-disable directive" reports (ESLint 9 default `reportUnusedDisableDirectives`), 39 of them.

base total 665 flat total 833
| rule | base | flat | diff |
|---|---|---|---|
| react-hooks/refs | 0 | 56 | +56 |
| @typescript-eslint/no-non-null-assertion | 51 | 0 | -51 |
| (null) | 0 | 39 | +39 |
| @typescript-eslint/no-unnecessary-type-arguments | 0 | 16 | +16 |
| react-hooks/use-memo | 0 | 16 | +16 |
| react-hooks/set-state-in-effect | 0 | 15 | +15 |
| @typescript-eslint/prefer-nullish-coalescing | 4 | 19 | +15 |
| react-hooks/globals | 0 | 14 | +14 |
| @typescript-eslint/unbound-method | 0 | 14 | +14 |
| react-hooks/immutability | 0 | 12 | +12 |
| @typescript-eslint/member-delimiter-style | 11 | 0 | -11 |
| @typescript-eslint/no-unused-vars | 18 | 28 | +10 |
| @typescript-eslint/switch-exhaustiveness-check | 0 | 6 | +6 |
| object-property-newline | 2 | 8 | +6 |
| react-hooks/preserve-manual-memoization | 0 | 2 | +2 |
| object-curly-newline | 124 | 126 | +2 |
| max-len | 285 | 286 | +1 |
| @typescript-eslint/no-empty-object-type | 0 | 1 | +1 |
| @typescript-eslint/no-floating-promises | 0 | 1 | +1 |
| react/jsx-no-constructed-context-values | 0 | 1 | +1 |
| `this`. | 1 | 0 | -1 |
| @typescript-eslint/no-base-to-string | 1 | 2 | +1 |
| react-hooks/purity | 0 | 1 | +1 |
| @typescript-eslint/no-require-imports | 0 | 1 | +1 |
| react/function-component-definition | 6 | 7 | +1 |
| @typescript-eslint/ban-types | 0 | 1 | +1 |
| @typescript-eslint/no-var-requires | 1 | 0 | -1 |
| jsx-a11y/no-noninteractive-tabindex | 6 | 6 | +0 |
| tailwindcss/no-custom-classname | 1 | 1 | +0 |
| no-self-compare | 1 | 1 | +0 |
| no-nested-ternary | 1 | 1 | +0 |
| import/first | 64 | 64 | +0 |
| @typescript-eslint/no-unsafe-return | 3 | 3 | +0 |
| no-multi-spaces | 1 | 1 | +0 |
| no-script-url | 1 | 1 | +0 |
| @typescript-eslint/consistent-type-imports | 18 | 18 | +0 |
| import/no-cycle | 2 | 2 | +0 |
| jsx-a11y/control-has-associated-label | 1 | 1 | +0 |
| @typescript-eslint/no-unsafe-argument | 10 | 10 | +0 |
| @typescript-eslint/no-unsafe-call | 5 | 5 | +0 |
| react-hooks/rules-of-hooks | 1 | 1 | +0 |
| function-paren-newline | 2 | 2 | +0 |
| import/prefer-default-export | 3 | 3 | +0 |
| import/order | 23 | 23 | +0 |
| @typescript-eslint/no-explicit-any | 13 | 13 | +0 |
| tailwindcss/classnames-order | 5 | 5 | +0 |
only base: ['@typescript-eslint/member-delimiter-style', '@typescript-eslint/no-non-null-assertion', '@typescript-eslint/no-var-requires', '`this`.']
only flat: ['(null)', '@typescript-eslint/ban-types', '@typescript-eslint/no-empty-object-type', '@typescript-eslint/no-floating-promises', '@typescript-eslint/no-require-imports', '@typescript-eslint/no-unnecessary-type-arguments', '@typescript-eslint/switch-exhaustiveness-check', '@typescript-eslint/unbound-method', 'react-hooks/globals', 'react-hooks/immutability', 'react-hooks/preserve-manual-memoization', 'react-hooks/purity', 'react-hooks/refs', 'react-hooks/set-state-in-effect', 'react-hooks/use-memo', 'react/jsx-no-constructed-context-values']

Notes on the largest differences: `@typescript-eslint/no-non-null-assertion` (51 to 0) and `no-var-requires` are in v5 `recommended` but not v8 `recommended`; `react-hooks/*` compiler rules (refs, use-memo, set-state-in-effect, globals, immutability, ...) come from eslint-config-next 16 / react-hooks 7 and are absent at base; `unbound-method`, `switch-exhaustiveness-check`, `no-unnecessary-type-arguments` appear because v8 resolves type information where the base run did not report them; `member-delimiter-style` is gone with the removed rule.
