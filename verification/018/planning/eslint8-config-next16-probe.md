# ESLint 8.57.1 + legacy `.eslintrc.json` `extends: ["next"]` probe

Question: does ESLint 8.57.1 with a legacy `.eslintrc.json` that has `"extends": ["next"]` load when the installed `eslint-config-next` is 16.4.6? Control: `eslint-config-next` 15.5.14.

Scratch dirs (deleted at end of run):
- `/tmp/claude-1000/-usr-local-bin-hooks-website/033d965f-863f-45aa-a9ac-5f08cc899176/scratchpad/eslint-probe-16.4.6`
- `/tmp/claude-1000/-usr-local-bin-hooks-website/033d965f-863f-45aa-a9ac-5f08cc899176/scratchpad/eslint-probe-15.5.14`

Files written in each dir (identical):
- `package.json`: `{"name":"p","private":true}`
- `.eslintrc.json`: `{"root":true,"extends":["next"],"parserOptions":{"ecmaVersion":2022,"sourceType":"module"}}`
- `src/a.js`: `export const a = 1;`

## Commands

Per V in {16.4.6, 15.5.14}:

```
D=/tmp/claude-1000/-usr-local-bin-hooks-website/033d965f-863f-45aa-a9ac-5f08cc899176/scratchpad/eslint-probe-$V; mkdir -p $D/src && cd $D
timeout 300 npm install --no-audit --no-fund eslint@8.57.1 eslint-config-next@$V typescript@5.9.3 > install.log 2>&1; echo "install exit $?"
npx eslint src/a.js > run.txt 2>&1; echo "eslint exit $?" >> run.txt
```

Both installs were launched in parallel (one subshell each, `wait`ed). Step 4 was run in each dir after its install, including the 16.4.6 dir where the install failed.

## 16.4.6

Install exit: `1`

Peer-dependency lines (`grep -i peer install.log`, verbatim):
```
npm error peer eslint@">=9.0.0" from eslint-config-next@16.4.6
npm error this command with --force or --legacy-peer-deps
```

Install failed with `npm error code ERESOLVE` ("unable to resolve dependency tree"); `node_modules/eslint-config-next` was not created and no `node_modules/.bin/eslint` exists in this dir.

run.txt (verbatim):
```

Oops! Something went wrong! :(

ESLint: 10.15.0

ESLint couldn't find an eslint.config.* file.

From ESLint v9.0.0, the default configuration file is now eslint.config.*.
If you are using a .eslintrc.* file, please follow the migration guide
to update your configuration file to the new format:

https://eslint.org/docs/latest/use/configure/migration-guide

If you still have problems after following the migration guide, please stop by
https://eslint.org/chat/help to chat with the team.

eslint exit 2
```

Note: this run is NOT ESLint 8.57.1. With no local eslint installed, `npx` fetched ESLint 10.15.0, which rejects legacy config. The 16.4.6 result therefore does not test the question.

## 15.5.14

Install exit: `0`

Peer-dependency lines (`grep -i peer install.log`): no matching lines (grep exit 1). The log contains only `npm warn deprecated` lines and `added 288 packages in 9s`.

Installed: `eslint` 8.57.1, `eslint-config-next` 15.5.14. `next` is NOT installed in this dir (`ls -d node_modules/next` fails), and `eslint-config-next` does not pull it in.

run.txt (verbatim):
```

Oops! Something went wrong! :(

ESLint: 8.57.1

Error: Failed to load parser './parser.js' declared in '.eslintrc.json » eslint-config-next': Cannot find module 'next/dist/compiled/babel/eslint-parser'
Require stack:
- /tmp/claude-1000/-usr-local-bin-hooks-website/033d965f-863f-45aa-a9ac-5f08cc899176/scratchpad/eslint-probe-15.5.14/node_modules/eslint-config-next/parser.js
- /tmp/claude-1000/-usr-local-bin-hooks-website/033d965f-863f-45aa-a9ac-5f08cc899176/scratchpad/eslint-probe-15.5.14/node_modules/@eslint/eslintrc/dist/eslintrc.cjs
    at Module.<anonymous> (node:internal/modules/cjs/loader:1456:15)
    at mod._resolveFilename (/tmp/claude-1000/-usr-local-bin-hooks-website/033d965f-863f-45aa-a9ac-5f08cc899176/scratchpad/eslint-probe-15.5.14/node_modules/eslint-config-next/index.js:50:26)
    at defaultResolveImpl (node:internal/modules/cjs/loader:1066:19)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1071:22)
    at Module._load (node:internal/modules/cjs/loader:1242:25)
    at wrapModuleLoad (node:internal/modules/cjs/loader:255:19)
    at Module.require (node:internal/modules/cjs/loader:1556:12)
    at require (node:internal/modules/helpers:152:16)
    at Object.<anonymous> (/tmp/claude-1000/-usr-local-bin-hooks-website/033d965f-863f-45aa-a9ac-5f08cc899176/scratchpad/eslint-probe-15.5.14/node_modules/eslint-config-next/parser.js:4:5)
    at Module._compile (node:internal/modules/cjs/loader:1812:14)
eslint exit 2
```

## Findings

- 16.4.6: npm refuses the install (ERESOLVE: `eslint-config-next@16.4.6` requires `eslint>=9`). The run that followed used ESLint 10.15.0, so it says nothing about ESLint 8.57.1 + 16.4.6 loading.
- 15.5.14 (control): ESLint 8.57.1 reads `.eslintrc.json` and the `next` config, then fails loading the parser because the `next` package is absent from the probe dir. The control therefore also does not isolate a 16.x-specific effect; the probe needs `next` installed to be a valid control.
- The probe as specified cannot answer the question. The 16.4.6 install would need `--legacy-peer-deps` (or `--force`) to get eslint 8.57.1 onto disk; that was not run here.

Not committed. Scratch dirs deleted per the spec (see the `ls -d` confirmation below).
