// Lints text through the website's own ESLint config (cwd = the tree); writes no file.
const { ESLint } = require('/usr/local/bin/hooks/website/node_modules/eslint');
const fs = require('fs');
const tree = '/usr/local/bin/hooks/website';
const childPath = `${tree}/src/components/AnchoredPopover/Child.tsx`;
const cases = {
  'base Child.tsx (395510e)': fs.readFileSync(process.argv[2], 'utf8'),
  'fixed Child.tsx (working tree)': fs.readFileSync(childPath, 'utf8'),
  'A no options': "import dynamic from 'next/dynamic';\n\nexport default dynamic(() => import('./x'));\n",
  'B ssr true, no loading': "import dynamic from 'next/dynamic';\n\nexport default dynamic(() => import('./x'), { ssr: true });\n",
  'C ssr false': "import dynamic from 'next/dynamic';\n\nexport default dynamic(() => import('./x'), { ssr: false });\n",
  'D loading': "import dynamic from 'next/dynamic';\n\nexport default dynamic(() => import('./x'), { ssr: true, loading: () => null });\n",
  'E loading only inside the loader': "import dynamic from 'next/dynamic';\n\nexport default dynamic(() => import('./x').then((m) => ({ loading: m.y })), { ssr: true });\n",
};
(async () => {
  const eslint = new ESLint({ cwd: tree });
  for (const [name, text] of Object.entries(cases)) {
    const [res] = await eslint.lintText(text, { filePath: childPath });
    const hits = res.messages.filter((m) => m.ruleId === 'no-restricted-syntax').map((m) => m.line);
    const fatal = res.messages.filter((m) => m.fatal).map((m) => m.message);
    console.log(JSON.stringify({ case: name, noRestrictedSyntaxLines: hits, fatal }));
  }
})().catch((e) => { console.error(e); process.exit(2); });
