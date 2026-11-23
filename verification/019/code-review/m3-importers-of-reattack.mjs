// Plants load forms outside the CR-4 control's set and runs importersOf over them, at website f4060c5.
// Usage: node m3-importers-of-reattack.mjs <clone of f4060c5 with node_modules> <empty scratch dir>
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';
const [root, scratch] = process.argv.slice(2);
const { default: importersOf } = await import(pathToFileURL(`${root}/src/utils/markdown/__tests__/helpers/importersOf.ts`).href);
const files = {
  'create-require.ts': "import { createRequire } from 'module';\nexport const r = (n: string) => createRequire(import.meta.url)(n);\n",
  'module-require.js': 'module.exports = (n) => module.require(n);\n',
  'aliased-require.js': 'const r = require; module.exports = (n) => r(n);\n',
  'src/x/__tests__/helper.ts': "export const load = (n: string) => import('@discord/markdown-' + n);\n",
};
for (const [name, text] of Object.entries(files)) { mkdirSync(dirname(join(scratch, name)), { recursive: true }); writeFileSync(join(scratch, name), text); }
const scan = importersOf(scratch, ['@discord/markdown-wasm']);
const realTreeRule = scan.unresolvable.filter((name) => !name.split('/').includes('__tests__'));
console.log(JSON.stringify({ planted: Object.keys(files), unresolvable: scan.unresolvable, passesRealTreeRule: realTreeRule.length === 0, realTreeRuleSees: realTreeRule }, null, 1));
