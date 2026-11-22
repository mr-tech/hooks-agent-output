// usage: node lock-reach.js <old-lock.json> <new-lock.json>
// Resolves each lockfile `packages` entry's dependencies by node's walk-up rule and classifies every
// changed entry by which root dependency reaches it in the new lockfile. Differs from lockdiff.js in
// shape: graph reachability, not entry-by-entry comparison.
const fs = require('fs');
const [A, B] = process.argv.slice(2);
const load = (p) => JSON.parse(fs.readFileSync(p, 'utf8')).packages;
const oldP = load(A);
const newP = load(B);

function resolve(pkgs, from, name) {
  let base = from;
  for (;;) {
    const cand = (base ? `${base}/` : '') + `node_modules/${name}`;
    if (pkgs[cand]) return cand;
    if (!base) return null;
    const i = base.lastIndexOf('/node_modules/');
    base = i < 0 ? '' : base.slice(0, i);
  }
}

function reach(pkgs, roots) {
  const seen = new Set();
  const stack = roots.map((r) => resolve(pkgs, '', r)).filter(Boolean);
  while (stack.length) {
    const p = stack.pop();
    if (seen.has(p)) continue;
    seen.add(p);
    const e = pkgs[p];
    const deps = { ...e.dependencies, ...e.optionalDependencies, ...e.peerDependencies };
    for (const d of Object.keys(deps)) {
      const r = resolve(pkgs, p, d);
      if (r) stack.push(r);
    }
  }
  return seen;
}

const root = newP[''];
const rootDeps = Object.keys({ ...root.dependencies, ...root.devDependencies });
const AE = '@microsoft/api-extractor';
const fromAE = reach(newP, [AE]);
const fromOthers = reach(newP, rootDeps.filter((d) => d !== AE));

const changed = [];
for (const k of new Set([...Object.keys(oldP), ...Object.keys(newP)])) {
  if (k === '') continue;
  if (JSON.stringify(oldP[k]) === JSON.stringify(newP[k])) continue;
  const kind = !oldP[k] ? 'added' : !newP[k] ? 'removed' : 'changed';
  const fields = kind === 'changed'
    ? Object.keys({ ...oldP[k], ...newP[k] }).filter((f) => JSON.stringify(oldP[k][f]) !== JSON.stringify(newP[k][f]))
    : [];
  const ae = fromAE.has(k);
  const oth = fromOthers.has(k);
  changed.push({ k, kind, ver: `${oldP[k]?.version ?? '-'}->${newP[k]?.version ?? '-'}`, fields, ae, oth });
}

const counts = {};
for (const c of changed) {
  const cls = `${c.kind}:${c.ae ? 'AE' : ''}${c.oth ? (c.ae ? '+' : '') + 'OTHER' : ''}${!c.ae && !c.oth ? 'UNREACHED' : ''}`;
  counts[cls] = (counts[cls] || 0) + 1;
  console.log(`${cls}\t${c.k}\t${c.ver}\t${c.fields.join(',')}`);
}
console.log('--- totals', JSON.stringify(counts), 'changed=' + changed.length);
const removedReached = [...reach(oldP, rootDeps.filter((d) => d !== AE))].filter((k) => !newP[k]);
console.log('old-reachable entries missing in new:', removedReached.length);
