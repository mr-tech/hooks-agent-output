// usage (run with cwd = an export root): node effective-rules.mjs <file>  — prints the effective config of the kept rules for that file, plus plugin versions
import { createRequire } from 'node:module';
const require = createRequire(`${process.cwd()}/package.json`);
const { ESLint } = require('eslint');
const ids = ['@typescript-eslint/unbound-method', '@typescript-eslint/no-unnecessary-type-arguments', '@typescript-eslint/prefer-nullish-coalescing', '@typescript-eslint/switch-exhaustiveness-check', '@typescript-eslint/no-floating-promises', '@typescript-eslint/no-base-to-string', '@typescript-eslint/no-unsafe-return', 'react/function-component-definition', 'react/jsx-no-constructed-context-values', '@typescript-eslint/no-non-null-assertion', '@typescript-eslint/no-var-requires', '@typescript-eslint/no-require-imports'];
const cfg = await new ESLint().calculateConfigForFile(process.argv[2]);
for (const id of ids) console.log(id.padEnd(52), JSON.stringify(cfg.rules?.[id] ?? null));
for (const p of ['eslint', 'eslint-plugin-react', 'eslint-plugin-import', 'eslint-plugin-jsx-a11y', 'eslint-config-airbnb', 'eslint-config-next', '@typescript-eslint/eslint-plugin', 'typescript-eslint', 'eslint-plugin-react-hooks']) {
  try { console.log('version', p, require(`${p}/package.json`).version); } catch { console.log('version', p, '(not resolvable at root)'); }
}
