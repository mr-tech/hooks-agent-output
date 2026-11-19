// QA instrument (chain 017, M5 Phase 2). Do the M5-e test and QA's oracle enumerate the same interleavings?
// Executes each file's OWN enumerator source (sliced from the file bytes, never retyped): the oracle's
// CLASSES/chain/interleave and the test's chain/interleave/tableRows/sequencesOf (TypeScript, transpiled with the
// website's typescript). Compares the sets of "c1 c2 del orphan | seq" strings by membership.
// Usage: node compare.cjs <oracle.mjs> <interleavings.test.ts> [--plant]
//   --plant: positive control; drops the test enumerator's optional-event rule, which must show a difference.
const fs = require('fs');
const ts = require('/usr/local/bin/hooks/website/node_modules/typescript');

const [oraclePath, testPath] = process.argv.slice(2);
const plant = process.argv.includes('--plant');
const between = (text, from, to) => {
  const a = text.indexOf(from); const b = text.indexOf(to, a);
  if (a < 0 || b < 0) throw new Error(`anchor missing: ${from} / ${to}`);
  return text.slice(a, b);
};

const oracleSrc = fs.readFileSync(oraclePath, 'utf8');
const oracle = new Function(`${between(oracleSrc, 'const CLASSES', 'const ORDER')}; return { CLASSES, chain, interleave };`)();
const oracleSet = new Set();
for (const c1 of oracle.CLASSES) for (const c2 of oracle.CLASSES) for (const del of [false, true]) for (const orphan of [false, true]) {
  const chains = [oracle.chain(1, c1), oracle.chain(2, c2)];
  if (del) chains.push([['X'], ['P']]);
  for (const s of oracle.interleave(chains)) oracleSet.add(`${c1} ${c2} ${del} ${orphan} | ${s.join(' ')}`);
}

const testSrc = fs.readFileSync(testPath, 'utf8');
let enumSrc = between(testSrc, 'type Cls', 'async function play')
  + between(testSrc, "const CLASSES: Cls[]", "describe('two saves");
if (plant) {
  const rule = 'if (c[0].optional && c.length === 1) rec(cs.map((x, j) => (j === k ? [] : x)), acc);';
  if (enumSrc.split(rule).length !== 2) throw new Error('plant anchor not unique');
  enumSrc = enumSrc.replace(rule, '');
}
const js = ts.transpileModule(enumSrc, { compilerOptions: { target: ts.ScriptTarget.ES2020 } }).outputText;
const test = new Function(`${js}; return { tableRows, sequencesOf };`)();
const testSet = new Set();
for (const row of test.tableRows) for (const s of test.sequencesOf(row)) testSet.add(`${row.c1} ${row.c2} ${row.del} ${row.orphan} | ${s.join(' ')}`);

const onlyOracle = [...oracleSet].filter((x) => !testSet.has(x));
const onlyTest = [...testSet].filter((x) => !oracleSet.has(x));
console.log(`plant=${plant} oracle=${oracleSet.size} test=${testSet.size} onlyOracle=${onlyOracle.length} onlyTest=${onlyTest.length}`);
console.log(onlyOracle.slice(0, 3).join('\n'));
