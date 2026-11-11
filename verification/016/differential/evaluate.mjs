// Evaluate one website tree's validateMessage and validateContentRequirements over AC1-9's inputs
// (plan 016). Run once per tree, network-isolated, over a `git archive` export:
//   SKIP_ENV_VALIDATION=1 WEBSITE_ROOT=<export> unshare -rn node --experimental-transform-types \
//     --import ../corpus/ts-register.mjs evaluate.mjs <inputs.json> <out.json>
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const [inPath, outPath] = process.argv.slice(2);
const { validateMessage, validateContentRequirements } = await import(
  pathToFileURL(path.join(process.env.WEBSITE_ROOT, 'src/utils/limits.tsx')).href);
const inputs = JSON.parse(readFileSync(inPath, 'utf8'));
const run = (m) => {
  const res = {};
  for (const [k, fn] of [['vm', validateMessage], ['vcr', validateContentRequirements]]) {
    try { res[k] = fn(structuredClone(m)) ?? null; } catch (e) { res[k] = `THROW ${e?.constructor?.name}: ${e?.message}`; }
  }
  return res;
};
const out = {
  root: process.env.WEBSITE_ROOT,
  a: inputs.a.map(run),
  b: inputs.b.map((r) => run(r.input)),
  c: inputs.c.map((r) => run(r.input)),
};
writeFileSync(outPath, JSON.stringify(out));
console.log(`a=${out.a.length} b=${out.b.length} c=${out.c.length}`);
