import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import nextConfig from 'eslint-config-next';
import tseslint from 'typescript-eslint';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: dirname, recommendedConfig: js.configs.recommended });

const useMountMessage = 'react-use useMount discards the function its callback returns, so the cleanup never runs. Use useEffect(() => cleanup, []) instead.';

// FORCED CHANGE 1: compat loads its own plugin instances; flat config refuses two different objects under one name.
const nextPlugins = Object.assign({}, ...nextConfig.map((c) => c.plugins ?? {}));
function sharePlugins(c) {
  if (!c.plugins) return c;
  return { ...c, plugins: Object.fromEntries(Object.entries(c.plugins).map(([k, v]) => [k, nextPlugins[k] ?? v])) };
}

export default [
  {
    ignores: [
      'dist', 'build', 'archive', 'dev', 'lang', 'postCustom', '.commands', '.next',
    ].flatMap((p) => [p, `${p}/**`, `**/${p}/**`]),
  },
  ...compat.extends('airbnb', 'airbnb-base', 'plugin:react/recommended', 'plugin:tailwindcss/recommended').map(sharePlugins),
  ...nextConfig,
  {
    languageOptions: {
      globals: { ...(await import('globals')).default.browser, ...(await import('globals')).default.es2021 },
      parser: tseslint.parser,
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
    settings: {
      next: { rootDir: '.' },
      'import/core-modules': ['axios'],
      'import/resolver': { node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] } },
      tailwindcss: {
        callees: ['classNames'],
        cssFiles: ['**/*.css', '**/*.scss', '!**/node_modules', '!**/.*', '!**/dist', '!**/build'],
        whitelist: [
          'discord-visualizer.*', 'hljs', 'markup', 'strip', 'no-scroll', 'no-drag', 'codeBlock',
          'blockQuoteContainer', 'blockQuoteDivider', 'rainbow', 'legal', 'translate-z-0', 'landing',
          'focus-visible', 'focus-visible-alt', 'disabled', 'hasThumbnail', 'scrollbar', 'spoiler',
          'spoiler-hidden', 'spoiler-content', 'syntax', 'inline-element', 'inline-void',
          'inline-element__embed', 'toggle', 'z-2', '!display-inherit', 'picker-shadow', 'tilt',
        ],
      },
    },
    rules: {
      'no-continue': 'off',
      'default-case-last': 'off',
      'space-before-blocks': 'off',
      semi: 'off',
      'import/order': ['error', {
        groups: [['builtin', 'external'], ['parent'], ['sibling', 'index'], 'type'],
        pathGroupsExcludedImportTypes: ['type'],
        'newlines-between': 'always',
      }],
      'no-console': ['warn', { allow: ['debug', 'warn', 'error'] }],
      'no-throw-literal': 'off',
      'no-unused-vars': 'off',
      'no-void': ['error', { allowAsStatement: true }],
      'no-multi-str': 'off',
      'no-underscore-dangle': 'off',
      'no-bitwise': 'off',
      'no-plusplus': 'off',
      'no-restricted-syntax': ['error', {
        selector: "CallExpression[callee.name='dynamic']:not(:has(> ObjectExpression:has(> Property[key.name='loading']))):not(:has(> ObjectExpression:has(> Property[key.name='ssr'][value.value=false])))",
        message: 'A next/dynamic call with neither `loading` nor `ssr: false` has no Suspense boundary of its own: its first render suspends to the nearest outer boundary and hides everything under it, an open dialog included. Pass `loading`, or import the component statically.',
      }],
      'no-restricted-imports': ['error', {
        paths: [
          { name: 'react-use', importNames: ['useMount'], message: useMountMessage },
          { name: 'react-use/lib', importNames: ['useMount'], message: useMountMessage },
          { name: 'react-use/esm', importNames: ['useMount'], message: useMountMessage },
        ],
        patterns: [{ group: ['react-use/*/useMount'], message: useMountMessage }],
      }],
      'no-unused-expressions': 'off',
      'no-param-reassign': 'off',
      'no-shadow': 'off',
      'global-require': 'off',
      'no-use-before-define': 'off',
      strict: [2, 'global'],
      'max-len': ['warn', 100, 2, {
        ignoreUrls: true, ignoreComments: true, ignoreRegExpLiterals: true,
        ignoreStrings: true, ignoreTemplateLiterals: true, ignorePattern: '^.*?=>.*?[,;]$',
      }],
      camelcase: 'off',
      'prefer-const': ['error', { destructuring: 'all' }],
      'no-await-in-loop': 'off',
      'import/extensions': ['error', 'ignorePackages', { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' }],
      'import/no-extraneous-dependencies': ['error', { optionalDependencies: true }],
      'jsx-a11y/label-has-associated-control': [2, {
        labelComponents: ['CustomInputLabel'], labelAttributes: ['label'],
        controlComponents: ['CustomInput'], depth: 3,
      }],
      'jsx-a11y/label-has-for': 'off',
      'jsx-a11y/no-noninteractive-tabindex': 'warn',
      'react/prop-types': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/no-direct-mutation-state': 'off',
      'react/jsx-no-bind': 'off',
      'react/static-property-placement': 'off',
      'react/state-in-constructor': 'off',
      'react/no-array-index-key': 'off',
      'react/require-default-props': 'off',
      'react/no-unused-prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
      'react/function-component-definition': [2, { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' }],
      'react-hooks/exhaustive-deps': 'off',
      'import/no-anonymous-default-export': 'off',
      'tailwindcss/no-custom-classname': ['warn', {
        cssFiles: [
          'app/_styles/cropper.scss', 'app/_styles/custom.scss', 'app/_styles/fonts.scss',
          'app/_styles/globals.scss', 'app/_styles/markdown.scss', 'app/_styles/overrides.scss',
          'app/_styles/reset.scss', 'app/_styles/tailwind.scss', 'app/_styles/visualizer.scss',
        ],
      }],
    },
  },
  ...[
    tseslint.configs.eslintRecommended,
    ...tseslint.configs.recommended,
    ...compat.extends('plugin:import/typescript').map(sharePlugins),
    {
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/restrict-template-expressions': 'error',
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-base-to-string': 'error',
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-misused-promises': 'error',
        '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-for-in-array': 'error',
        '@typescript-eslint/no-implied-eval': 'error',
        '@typescript-eslint/no-inferrable-types': 'error',
        '@typescript-eslint/no-invalid-this': 'error',
        '@typescript-eslint/no-unnecessary-type-arguments': 'warn',
        '@typescript-eslint/no-unnecessary-type-constraint': 'error',
        '@typescript-eslint/no-unsafe-argument': 'error',
        '@typescript-eslint/no-unsafe-call': 'error',
        '@typescript-eslint/no-unsafe-return': 'error',
        '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: false }],
        '@typescript-eslint/prefer-as-const': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': 'warn',
        '@typescript-eslint/prefer-optional-chain': 'warn',
        '@typescript-eslint/prefer-reduce-type-parameter': 'warn',
        '@typescript-eslint/prefer-ts-expect-error': 'warn',
        '@typescript-eslint/switch-exhaustiveness-check': 'warn',
        '@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }],
      },
      languageOptions: {
        parserOptions: { ecmaVersion: 2022, project: ['./tsconfig.json', './tsconfig.test.json'] },
      },
    },
  ].map((c) => ({ ...c, files: ['**/*.ts', '**/*.tsx'] })),
];
