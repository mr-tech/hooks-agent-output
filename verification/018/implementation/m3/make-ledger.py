#!/usr/bin/env python3
"""make-ledger.py OLD_ESLINTRC OLD_ESLINTIGNORE NEW_CONFIG -- prints the M3-b requirement ledger as markdown rows.
Comment-stripping parse of the old config; a rule row is 'carried' when its id appears quoted in the new flat config, else it must
have a disposition in REMOVED (the script exits 1 naming any other)."""
import json, re, sys
old, ign, new = sys.argv[1:4]
raw = open(old).read()
d = json.loads('\n'.join(l for l in raw.split('\n') if not l.strip().startswith('//')).replace('// Allows for the use of imports','').replace(' // \'none\' or \'semi\' or \'comma\'','').replace(" // 'semi' or 'comma'",'') if False else re.sub(r'(?m)^\s*//.*$', '', re.sub(r'\s//[^"\n]*$', '', raw, flags=re.M)))
cfg = open(new).read()
REMOVED = {
 '@typescript-eslint/semi': 'dropped: removed in typescript-eslint 8 (formatting rules moved out of the package); the base core `semi` is "off" in the same file, so no semicolon rule is enforced in either config',
 '@typescript-eslint/no-throw-literal': 'dropped: removed in typescript-eslint 8 (replaced by `only-throw-error`, not adopted: it is a new rule, and the base core `no-throw-literal` is "off")',
 '@typescript-eslint/space-before-blocks': 'dropped: removed in typescript-eslint 8 (formatting); the base core `space-before-blocks` is "off"',
 '@typescript-eslint/type-annotation-spacing': 'dropped: removed in typescript-eslint 8 (formatting)',
 '@typescript-eslint/member-delimiter-style': 'dropped: removed in typescript-eslint 8 (formatting)',
}
rows, bad = [], []
def row(entry, where): rows.append(f"| {entry} | {where} |")
def carried(i): return i in cfg
for k in ('env',):
    for e, v in d['env'].items(): row(f"`env.{e}` = {v}", "carried: `languageOptions.globals` = `globals.browser` + `globals.es2021` (the `globals` package, already a devDependency)" if e in ('browser','es2021') else '?')
row("`plugins` `react`", "carried: `eslint-plugin-react` is loaded by `compat.extends('plugin:react/recommended')` and by `eslint-config-next`; the two instances are made one by `sharePlugins`")
row("`plugins` `@typescript-eslint`", "carried: `typescript-eslint` 8's plugin through `tseslint.configs.recommended`")
row("`parser` `@typescript-eslint/parser`", "carried: `languageOptions.parser` = `tseslint.parser` (typescript-eslint 8)")
row("`parserOptions.ecmaFeatures.jsx`", "carried: `languageOptions.parserOptions.ecmaFeatures.jsx`")
row("`parserOptions.ecmaVersion` 2022", "carried: `languageOptions.ecmaVersion` and `parserOptions.ecmaVersion`")
row("`parserOptions.sourceType` module", "carried: `languageOptions.sourceType` and `parserOptions.sourceType`")
for e in d['extends']:
    m = {'airbnb':"carried: `compat.extends('airbnb')`", 'airbnb-base':"carried: `compat.extends('airbnb-base')`", 'plugin:react/recommended':"carried: `compat.extends('plugin:react/recommended')`", 'plugin:tailwindcss/recommended':"carried: `compat.extends('plugin:tailwindcss/recommended')`", 'next':"carried: `...nextConfig` (`eslint-config-next` 16.4.6's flat preset, which replaces the legacy `next` extend; its own plugin set is listed in the differential, cause (1))"}
    row(f"`extends` `{e}`", m[e])
for k, v in d['settings'].items():
    row(f"`settings.{k}`", f"carried: `settings.{k}` in the flat config's second object")
ov = d['overrides'][0]
row("override `files` `*.ts`, `*.tsx`", "carried: `files: ['**/*.ts', '**/*.tsx']` on every object of the TypeScript group")
for e in ov['extends']:
    m = {'plugin:@typescript-eslint/eslint-recommended':"carried: `tseslint.configs.eslintRecommended`", 'plugin:@typescript-eslint/recommended':"carried: `...tseslint.configs.recommended` (the v8 preset; the differential's cause (1) rows are its changes)", 'plugin:import/typescript':"carried: `compat.extends('plugin:import/typescript')`"}
    row(f"override `extends` `{e}`", m[e])
row("override `parserOptions.ecmaVersion` 2022", "carried: the TypeScript group's `languageOptions.parserOptions.ecmaVersion`")
row("override `parserOptions.project` `./tsconfig.json`, `./tsconfig.test.json` (makes the type-aware rules run)", "carried: the TypeScript group's `languageOptions.parserOptions.project`, both files")
def rules(r, label):
    for k, v in r.items():
        if carried(f"'{k}'") or carried(f"{k}:") or carried(f'"{k}"'):
            row(f"{label} rule `{k}`", "carried: in `eslint.config.mjs`" + (" with `caughtErrors: 'none'` added (M3-d, the base's v5 default kept)" if k == '@typescript-eslint/no-unused-vars' else ""))
        elif k in REMOVED: row(f"{label} rule `{k}`", REMOVED[k])
        else: bad.append(k)
rules(d['rules'], 'top-level'); rules(ov['rules'], 'override')
for i, line in enumerate([l for l in open(ign).read().split('\n') if l.strip()], 1):
    row(f"`.eslintignore` line {i}: `{line}`", "carried: `ignores` entry (`" + line + "`, `" + line + "/**`, `**/" + line + "/**`)" + (" — the entry has no file or directory at the repository root at the base; kept for parity" if line == '.vscode' else ""))
print("| Entry of the base configuration | Disposition in `eslint.config.mjs` |\n|---|---|")
print('\n'.join(rows))
print(f"\nrows: {len(rows)}; top-level rules: {len(d['rules'])}; override rules: {len(ov['rules'])}", file=sys.stderr)
if bad: print('UNDISPOSITIONED:', bad, file=sys.stderr); sys.exit(1)
