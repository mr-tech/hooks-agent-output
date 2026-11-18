// Usage: node lint-selector-probe.cjs <website-repo> <base-child-file>
// Lints in-memory inputs with the repo's own ESLint config; writes nothing to the repo.
const path = require('path');
const fs = require('fs');

const repo = path.resolve(process.argv[2]);
const { ESLint } = require(require.resolve('eslint', { paths: [repo] }));

const head = "import dynamic from 'next/dynamic';\nimport dyn from 'next/dynamic';\n";
const cases = {
  'base Child.tsx (395510e)': fs.readFileSync(process.argv[3], 'utf8'),
  'fixed Child.tsx (1ad625e)': fs.readFileSync(path.join(repo, 'src/components/AnchoredPopover/Child.tsx'), 'utf8'),
  'no options': `${head}export const A = dynamic(() => import('react'));\n`,
  'ssr: true': `${head}export const A = dynamic(() => import('react'), { ssr: true });\n`,
  'ssr: false': `${head}export const A = dynamic(() => import('react'), { ssr: false });\n`,
  'loading': `${head}export const A = dynamic(() => import('react'), { loading: () => null });\n`,
  'blind: renamed default import': `${head}export const A = dyn(() => import('react'), { ssr: true });\n`,
  'blind: options in a variable, no loading': `${head}const o = { ssr: true };\nexport const A = dynamic(() => import('react'), o);\n`,
  'false positive: options in a variable WITH loading': `${head}const o = { loading: () => null };\nexport const A = dynamic(() => import('react'), o);\n`,
  'false positive: string-literal key loading': `${head}export const A = dynamic(() => import('react'), { 'loading': () => null });\n`,
  'blind: React.lazy without Suspense': "import { lazy } from 'react';\nexport const A = lazy(() => import('react'));\n",
};

(async () => {
  const eslint = new ESLint({ cwd: repo });
  const filePath = path.join(repo, 'src/components/AnchoredPopover/Child.tsx');
  for (const [name, text] of Object.entries(cases)) {
    const [res] = await eslint.lintText(text, { filePath });
    const fatal = res.messages.find((m) => m.fatal);
    if (fatal) throw new Error(`${name}: ${fatal.message}`);
    const hits = res.messages.filter((m) => m.ruleId === 'no-restricted-syntax').map((m) => m.line);
    console.log(`${name}\tno-restricted-syntax lines: ${hits.length ? hits.join(',') : 'none'}`);
  }
})().catch((e) => { console.error(e); process.exit(2); });
