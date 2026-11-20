// usage: node cause-checks.mjs <m2-export-root> <m3-export-root>   (reads installed plugin rule tables of both trees)
import { createRequire } from 'node:module';
const [m2, m3] = process.argv.slice(2);
const r2 = createRequire(`${m2}/package.json`);
const r3 = createRequire(`${m3}/package.json`);
const v5 = r2('@typescript-eslint/eslint-plugin');
const tseslint = r3('typescript-eslint');
const v8plugin = tseslint.plugin;
const out = {};
out.v5Version = r2('@typescript-eslint/eslint-plugin/package.json').version;
out.v8Version = r3('typescript-eslint/package.json').version;
out.v5RecommendedHas = (id) => id in v5.configs.recommended.rules;
const v5rec = v5.configs.recommended.rules;
const v8rec = Object.assign({}, ...tseslint.configs.recommended.map((c) => c.rules ?? {}));
const ids = ['no-non-null-assertion', 'no-var-requires', 'no-require-imports', 'member-delimiter-style', 'ban-types', 'no-empty-object-type', 'type-annotation-spacing', 'space-before-blocks', 'semi', 'no-throw-literal'];
console.log(JSON.stringify({ v5: out.v5Version, v8: out.v8Version }));
for (const id of ids) {
  const k = `@typescript-eslint/${id}`;
  console.log(id.padEnd(26), 'v5 plugin rule:', id in v5.rules, '| v5 recommended:', k in v5rec, '| v8 plugin rule:', id in v8plugin.rules, '| v8 recommended:', k in v8rec);
}
const nextConfig = r3('eslint-config-next');
const nextRules = Object.assign({}, ...nextConfig.map((c) => c.rules ?? {}));
for (const k of ['react-hooks/globals', 'react-hooks/immutability', 'react-hooks/preserve-manual-memoization', 'react-hooks/purity', 'react-hooks/refs', 'react-hooks/set-state-in-effect', 'react-hooks/use-memo', 'react/jsx-no-constructed-context-values']) console.log(k.padEnd(42), 'in eslint-config-next 16.4.6 rules:', k in nextRules);
