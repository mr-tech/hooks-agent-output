// Compares two vitest JSON reports by path membership and per-file (fullName, status) multisets.
// Usage: node suite-compare.mjs <base.json> <tip.json> <base-root> <tip-root> [renames.json]
// renames.json maps a base-relative path to a tip-relative path. Output: one line per fact.
import { readFileSync } from 'node:fs';

const [baseFile, tipFile, baseRoot, tipRoot, renamesFile] = process.argv.slice(2);
const load = (f, root) => {
  const j = JSON.parse(readFileSync(f, 'utf8'));
  const files = new Map();
  for (const r of j.testResults) {
    const rel = r.name.startsWith(root + '/') ? r.name.slice(root.length + 1) : r.name;
    files.set(rel, r.assertionResults.map((a) => `${a.status}\t${a.fullName}`).sort());
  }
  return { j, files };
};
const base = load(baseFile, baseRoot);
const tip = load(tipFile, tipRoot);
const renames = renamesFile ? JSON.parse(readFileSync(renamesFile, 'utf8')) : {};
const inv = Object.fromEntries(Object.entries(renames).map(([a, b]) => [b, a]));

for (const [k, x] of [['base', base], ['tip', tip]]) {
  const st = {};
  for (const v of x.files.values()) for (const l of v) { const s = l.split('\t')[0]; st[s] = (st[s] || 0) + 1; }
  console.log(`${k}: numTotalTests=${x.j.numTotalTests} numPassedTests=${x.j.numPassedTests} success=${x.j.success} files=${x.files.size} statuses=${JSON.stringify(st)}`);
}
const baseOnly = [...base.files.keys()].filter((p) => !tip.files.has(p)).sort();
const tipOnly = [...tip.files.keys()].filter((p) => !base.files.has(p)).sort();
console.log(`base-only paths (${baseOnly.length}): ${baseOnly.join(' ')}`);
console.log(`tip-only paths (${tipOnly.length}): ${tipOnly.join(' ')}`);
const unexplained = [
  ...baseOnly.filter((p) => !(p in renames)),
  ...tipOnly.filter((p) => !(p in inv)),
];
console.log(`paths not explained by the rename map: ${unexplained.length}${unexplained.length ? ' ' + unexplained.join(' ') : ''}`);
const same = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);
for (const [o, n] of Object.entries(renames)) {
  const a = base.files.get(o); const b = tip.files.get(n);
  console.log(`rename ${o} -> ${n}: base ${a ? a.length : 'absent'} tip ${b ? b.length : 'absent'} ${a && b && same(a, b) ? 'SAME' : 'DIFFERENT'}`);
}
for (const p of [...base.files.keys()].filter((q) => tip.files.has(q)).sort()) {
  const a = base.files.get(p); const b = tip.files.get(p);
  if (same(a, b)) continue;
  const removed = a.filter((x) => !b.includes(x)); const added = b.filter((x) => !a.includes(x));
  console.log(`changed ${p}: base ${a.length} tip ${b.length} removed ${removed.length} added ${added.length}`);
  for (const r of removed) console.log(`  - ${r}`);
  for (const r of added) console.log(`  + ${r}`);
}
