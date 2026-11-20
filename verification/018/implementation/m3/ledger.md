| Entry of the base configuration | Disposition in `eslint.config.mjs` |
|---|---|
| `env.browser` = True | carried: `languageOptions.globals` = `globals.browser` + `globals.es2021` (the `globals` package, already a devDependency) |
| `env.es2021` = True | carried: `languageOptions.globals` = `globals.browser` + `globals.es2021` (the `globals` package, already a devDependency) |
| `plugins` `react` | carried: `eslint-plugin-react` is loaded by `compat.extends('plugin:react/recommended')` and by `eslint-config-next`; the two instances are made one by `sharePlugins` |
| `plugins` `@typescript-eslint` | carried: `typescript-eslint` 8's plugin through `tseslint.configs.recommended` |
| `parser` `@typescript-eslint/parser` | carried: `languageOptions.parser` = `tseslint.parser` (typescript-eslint 8) |
| `parserOptions.ecmaFeatures.jsx` | carried: `languageOptions.parserOptions.ecmaFeatures.jsx` |
| `parserOptions.ecmaVersion` 2022 | carried: `languageOptions.ecmaVersion` and `parserOptions.ecmaVersion` |
| `parserOptions.sourceType` module | carried: `languageOptions.sourceType` and `parserOptions.sourceType` |
| `extends` `airbnb` | carried: `compat.extends('airbnb')` |
| `extends` `airbnb-base` | carried: `compat.extends('airbnb-base')` |
| `extends` `plugin:react/recommended` | carried: `compat.extends('plugin:react/recommended')` |
| `extends` `plugin:tailwindcss/recommended` | carried: `compat.extends('plugin:tailwindcss/recommended')` |
| `extends` `next` | carried: `...nextConfig` (`eslint-config-next` 16.4.6's flat preset, which replaces the legacy `next` extend; its own plugin set is listed in the differential, cause (1)) |
| `settings.next` | carried: `settings.next` in the flat config's second object |
| `settings.import/core-modules` | carried: `settings.import/core-modules` in the flat config's second object |
| `settings.import/resolver` | carried: `settings.import/resolver` in the flat config's second object |
| `settings.tailwindcss` | carried: `settings.tailwindcss` in the flat config's second object |
| override `files` `*.ts`, `*.tsx` | carried: `files: ['**/*.ts', '**/*.tsx']` on every object of the TypeScript group |
| override `extends` `plugin:@typescript-eslint/eslint-recommended` | carried: `tseslint.configs.eslintRecommended` |
| override `extends` `plugin:@typescript-eslint/recommended` | carried: `...tseslint.configs.recommended` (the v8 preset; the differential's cause (1) rows are its changes) |
| override `extends` `plugin:import/typescript` | carried: `compat.extends('plugin:import/typescript')` |
| override `parserOptions.ecmaVersion` 2022 | carried: the TypeScript group's `languageOptions.parserOptions.ecmaVersion` |
| override `parserOptions.project` `./tsconfig.json`, `./tsconfig.test.json` (makes the type-aware rules run) | carried: the TypeScript group's `languageOptions.parserOptions.project`, both files |
| top-level rule `no-continue` | carried: in `eslint.config.mjs` |
| top-level rule `default-case-last` | carried: in `eslint.config.mjs` |
| top-level rule `space-before-blocks` | carried: in `eslint.config.mjs` |
| top-level rule `semi` | carried: in `eslint.config.mjs` |
| top-level rule `import/order` | carried: in `eslint.config.mjs` |
| top-level rule `no-console` | carried: in `eslint.config.mjs` |
| top-level rule `no-throw-literal` | carried: in `eslint.config.mjs` |
| top-level rule `no-unused-vars` | carried: in `eslint.config.mjs` |
| top-level rule `no-void` | carried: in `eslint.config.mjs` |
| top-level rule `no-multi-str` | carried: in `eslint.config.mjs` |
| top-level rule `no-underscore-dangle` | carried: in `eslint.config.mjs` |
| top-level rule `no-bitwise` | carried: in `eslint.config.mjs` |
| top-level rule `no-plusplus` | carried: in `eslint.config.mjs` |
| top-level rule `no-restricted-syntax` | carried: in `eslint.config.mjs` |
| top-level rule `no-restricted-imports` | carried: in `eslint.config.mjs` |
| top-level rule `no-unused-expressions` | carried: in `eslint.config.mjs` |
| top-level rule `no-param-reassign` | carried: in `eslint.config.mjs` |
| top-level rule `no-shadow` | carried: in `eslint.config.mjs` |
| top-level rule `global-require` | carried: in `eslint.config.mjs` |
| top-level rule `no-use-before-define` | carried: in `eslint.config.mjs` |
| top-level rule `strict` | carried: in `eslint.config.mjs` |
| top-level rule `max-len` | carried: in `eslint.config.mjs` |
| top-level rule `camelcase` | carried: in `eslint.config.mjs` |
| top-level rule `prefer-const` | carried: in `eslint.config.mjs` |
| top-level rule `no-await-in-loop` | carried: in `eslint.config.mjs` |
| top-level rule `import/extensions` | carried: in `eslint.config.mjs` |
| top-level rule `import/no-extraneous-dependencies` | carried: in `eslint.config.mjs` |
| top-level rule `jsx-a11y/label-has-associated-control` | carried: in `eslint.config.mjs` |
| top-level rule `jsx-a11y/label-has-for` | carried: in `eslint.config.mjs` |
| top-level rule `jsx-a11y/no-noninteractive-tabindex` | carried: in `eslint.config.mjs` |
| top-level rule `react/prop-types` | carried: in `eslint.config.mjs` |
| top-level rule `react/jsx-props-no-spreading` | carried: in `eslint.config.mjs` |
| top-level rule `react/no-direct-mutation-state` | carried: in `eslint.config.mjs` |
| top-level rule `react/jsx-no-bind` | carried: in `eslint.config.mjs` |
| top-level rule `react/static-property-placement` | carried: in `eslint.config.mjs` |
| top-level rule `react/state-in-constructor` | carried: in `eslint.config.mjs` |
| top-level rule `react/no-array-index-key` | carried: in `eslint.config.mjs` |
| top-level rule `react/require-default-props` | carried: in `eslint.config.mjs` |
| top-level rule `react/no-unused-prop-types` | carried: in `eslint.config.mjs` |
| top-level rule `react/react-in-jsx-scope` | carried: in `eslint.config.mjs` |
| top-level rule `react/jsx-filename-extension` | carried: in `eslint.config.mjs` |
| top-level rule `react/function-component-definition` | carried: in `eslint.config.mjs` |
| top-level rule `react-hooks/exhaustive-deps` | carried: in `eslint.config.mjs` |
| top-level rule `import/no-anonymous-default-export` | carried: in `eslint.config.mjs` |
| top-level rule `tailwindcss/no-custom-classname` | carried: in `eslint.config.mjs` |
| override rule `@typescript-eslint/explicit-module-boundary-types` | carried: in `eslint.config.mjs` |
| override rule `@typescript-eslint/no-empty-function` | carried: in `eslint.config.mjs` |
| override rule `@typescript-eslint/no-shadow` | carried: in `eslint.config.mjs` |
| override rule `@typescript-eslint/semi` | dropped: removed in typescript-eslint 8 (formatting rules moved out of the package); the base core `semi` is "off" in the same file, so no semicolon rule is enforced in either config |
| override rule `@typescript-eslint/restrict-template-expressions` | carried: in `eslint.config.mjs` |
| override rule `@typescript-eslint/await-thenable` | carried: in `eslint.config.mjs` |
| override rule `@typescript-eslint/consistent-type-imports` | carried: in `eslint.config.mjs` |
| override rule `@typescript-eslint/no-base-to-string` | carried: in `eslint.config.mjs` |
| override rule `@typescript-eslint/no-floating-promises` | carried: in `eslint.config.mjs` |
| override rule `@typescript-eslint/no-misused-promises` | carried: in `eslint.config.mjs` |
| override rule `@typescript-eslint/no-unused-vars` | carried: in `eslint.config.mjs` with `caughtErrors: 'none'` added (M3-d, the base's v5 default kept) |
| override rule `@typescript-eslint/no-for-in-array` | carried: in `eslint.config.mjs` |
| override rule `@typescript-eslint/no-implied-eval` | carried: in `eslint.config.mjs` |
| override rule `@typescript-eslint/no-inferrable-types` | carried: in `eslint.config.mjs` |
| override rule `@typescript-eslint/no-invalid-this` | carried: in `eslint.config.mjs` |
| override rule `@typescript-eslint/no-throw-literal` | dropped: removed in typescript-eslint 8 (replaced by `only-throw-error`, not adopted: it is a new rule, and the base core `no-throw-literal` is "off") |
| override rule `@typescript-eslint/no-unnecessary-type-arguments` | carried: in `eslint.config.mjs` |
| override rule `@typescript-eslint/no-unnecessary-type-constraint` | carried: in `eslint.config.mjs` |
| override rule `@typescript-eslint/no-unsafe-argument` | carried: in `eslint.config.mjs` |
| override rule `@typescript-eslint/no-unsafe-call` | carried: in `eslint.config.mjs` |
| override rule `@typescript-eslint/no-unsafe-return` | carried: in `eslint.config.mjs` |
| override rule `@typescript-eslint/no-use-before-define` | carried: in `eslint.config.mjs` |
| override rule `@typescript-eslint/prefer-as-const` | carried: in `eslint.config.mjs` |
| override rule `@typescript-eslint/prefer-nullish-coalescing` | carried: in `eslint.config.mjs` |
| override rule `@typescript-eslint/prefer-optional-chain` | carried: in `eslint.config.mjs` |
| override rule `@typescript-eslint/prefer-reduce-type-parameter` | carried: in `eslint.config.mjs` |
| override rule `@typescript-eslint/prefer-ts-expect-error` | carried: in `eslint.config.mjs` |
| override rule `@typescript-eslint/space-before-blocks` | dropped: removed in typescript-eslint 8 (formatting); the base core `space-before-blocks` is "off" |
| override rule `@typescript-eslint/switch-exhaustiveness-check` | carried: in `eslint.config.mjs` |
| override rule `@typescript-eslint/type-annotation-spacing` | dropped: removed in typescript-eslint 8 (formatting) |
| override rule `@typescript-eslint/unbound-method` | carried: in `eslint.config.mjs` |
| override rule `@typescript-eslint/member-delimiter-style` | dropped: removed in typescript-eslint 8 (formatting) |
| `.eslintignore` line 1: `dist` | carried: `ignores` entry (`dist`, `dist/**`, `**/dist/**`) |
| `.eslintignore` line 2: `build` | carried: `ignores` entry (`build`, `build/**`, `**/build/**`) |
| `.eslintignore` line 3: `archive` | carried: `ignores` entry (`archive`, `archive/**`, `**/archive/**`) |
| `.eslintignore` line 4: `dev` | carried: `ignores` entry (`dev`, `dev/**`, `**/dev/**`) |
| `.eslintignore` line 5: `lang` | carried: `ignores` entry (`lang`, `lang/**`, `**/lang/**`) |
| `.eslintignore` line 6: `postCustom` | carried: `ignores` entry (`postCustom`, `postCustom/**`, `**/postCustom/**`) |
| `.eslintignore` line 7: `.commands` | carried: `ignores` entry (`.commands`, `.commands/**`, `**/.commands/**`) |
| `.eslintignore` line 8: `.next` | carried: `ignores` entry (`.next`, `.next/**`, `**/.next/**`) |
| `.eslintignore` line 9: `.vscode` | carried: `ignores` entry (`.vscode`, `.vscode/**`, `**/.vscode/**`) — the entry has no file or directory at the repository root at the base; kept for parity |
