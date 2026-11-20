// usage (cwd = an export root): node v9-defaults.mjs <file>...  — resolved config of the rules ESLint's v9 migration guide names as changed
import { createRequire } from 'node:module';
const require = createRequire(`${process.cwd()}/package.json`);
const { ESLint } = require('eslint');
const ids = ['require-jsdoc', 'valid-jsdoc', 'no-constant-binary-expression', 'no-empty-static-block', 'no-new-native-nonconstructor', 'no-unused-private-class-members', 'no-extra-semi', 'no-inner-declarations', 'no-mixed-spaces-and-tabs', 'no-new-symbol', 'curly', 'semi', 'no-constructor-return', 'no-sequences', 'no-implicit-coercion', 'no-invalid-regexp', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'no-restricted-imports', 'no-useless-computed-key', 'camelcase'];
const e = new ESLint();
for (const f of process.argv.slice(2)) {
  const cfg = await e.calculateConfigForFile(f);
  console.log('== ' + f, 'reportUnusedDisableDirectives:', JSON.stringify(cfg.linterOptions?.reportUnusedDisableDirectives ?? null));
  for (const id of ids) console.log(id.padEnd(40), JSON.stringify(cfg.rules?.[id] ?? null).slice(0, 160));
}
