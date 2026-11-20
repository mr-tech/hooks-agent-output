# ESLint 8.57.1 + legacy .eslintrc.json extends next: eslint-config-next 16.4.6 vs 15.5.14 (planner, 2026-11-20T03:16Z)

Supersedes the inconclusive first probe (eslint8-config-next16-probe.md: npm refused the peer without --legacy-peer-deps; control lacked next).

Dir: scratchpad eslint-probe2. package.json {name:p}; .eslintrc.json {root:true, extends:[next], parserOptions:{ecmaVersion:2022, sourceType:module}}; src/a.js 'export const a = 1;'

## 16.4.6
npm install --no-audit --no-fund --legacy-peer-deps eslint@8.57.1 eslint-config-next@16.4.6 typescript@5.9.3 next@16.4.6 react@19.2.4 react-dom@19.2.4 → exit 0
`./node_modules/.bin/eslint src/a.js`:
```

Oops! Something went wrong! :(

ESLint: 8.57.1

TypeError: Converting circular structure to JSON
    --> starting at object with constructor 'Object'
    |     property 'configs' -> object with constructor 'Object'
    |     property 'flat' -> object with constructor 'Object'
    |     ...
    |     property 'plugins' -> object with constructor 'Object'
    --- property 'react' closes the circle
Referenced from: /tmp/claude-1000/-usr-local-bin-hooks-website/033d965f-863f-45aa-a9ac-5f08cc899176/scratchpad/eslint-probe2/.eslintrc.json
    at JSON.stringify (<anonymous>)
    at /tmp/claude-1000/-usr-local-bin-hooks-website/033d965f-863f-45aa-a9ac-5f08cc899176/scratchpad/eslint-probe2/node_modules/@eslint/eslintrc/dist/eslintrc.cjs:2156:45
    at Array.map (<anonymous>)
    at ConfigValidator.formatErrors (/tmp/claude-1000/-usr-local-bin-hooks-website/033d965f-863f-45aa-a9ac-5f08cc899176/scratchpad/eslint-probe2/node_modules/@eslint/eslintrc/dist/eslintrc.cjs:2147:23)
    at ConfigValidator.validateConfigSchema (/tmp/claude-1000/-usr-local-bin-hooks-website/033d965f-863f-45aa-a9ac-5f08cc899176/scratchpad/eslint-probe2/node_modules/@eslint/eslintrc/dist/eslintrc.cjs:2177:84)
    at ConfigArrayFactory._normalizeConfigData (/tmp/claude-1000/-usr-local-bin-hooks-website/033d965f-863f-45aa-a9ac-5f08cc899176/scratchpad/eslint-probe2/node_modules/@eslint/eslintrc/dist/eslintrc.cjs:3019:19)
    at ConfigArrayFactory._loadConfigData (/tmp/claude-1000/-usr-local-bin-hooks-website/033d965f-863f-45aa-a9ac-5f08cc899176/scratchpad/eslint-probe2/node_modules/@eslint/eslintrc/dist/eslintrc.cjs:2984:21)
    at ConfigArrayFactory._loadExtendedShareableConfig (/tmp/claude-1000/-usr-local-bin-hooks-website/033d965f-863f-45aa-a9ac-5f08cc899176/scratchpad/eslint-probe2/node_modules/@eslint/eslintrc/dist/eslintrc.cjs:3285:21)
    at ConfigArrayFactory._loadExtends (/tmp/claude-1000/-usr-local-bin-hooks-website/033d965f-863f-45aa-a9ac-5f08cc899176/scratchpad/eslint-probe2/node_modules/@eslint/eslintrc/dist/eslintrc.cjs:3156:25)
    at ConfigArrayFactory._normalizeObjectConfigDataBody (/tmp/claude-1000/-usr-local-bin-hooks-website/033d965f-863f-45aa-a9ac-5f08cc899176/scratchpad/eslint-probe2/node_modules/@eslint/eslintrc/dist/eslintrc.cjs:3095:25)
eslint exit 2
```
## 15.5.14 (control, same dir, config package replaced)
npm install --no-audit --no-fund --legacy-peer-deps eslint-config-next@15.5.14 → exit 0
```
Pages directory cannot be found at /tmp/claude-1000/-usr-local-bin-hooks-website/033d965f-863f-45aa-a9ac-5f08cc899176/scratchpad/eslint-probe2/pages or /tmp/claude-1000/-usr-local-bin-hooks-website/033d965f-863f-45aa-a9ac-5f08cc899176/scratchpad/eslint-probe2/src/pages. If using a custom path, please configure with the `no-html-link-for-pages` rule in your eslint config file.
eslint exit 0
```
