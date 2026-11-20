// Usage: node audit-entry-delta.js <base pnpm-audit.json> <tip pnpm-audit.json>
// Compares two `pnpm audit --json` outputs by advisory entry, keyed `module|GHSA id|advisory id`
// (one GHSA id can hold several entries, one per vulnerable range, each with its own advisory id).
// Prints the counts, every entry only in the tip (new), the per-module count of entries only in the
// base (gone), and every entry in both whose installed-version list differs.
const fs = require('fs');

function entries(file) {
  const j = JSON.parse(fs.readFileSync(file, 'utf8'));
  const map = new Map();
  for (const [id, a] of Object.entries(j.advisories)) {
    const versions = [...new Set(a.findings.map((f) => f.version))].sort().join(',');
    map.set(`${a.module_name}|${a.github_advisory_id}|${id}`, { versions, severity: a.severity, title: a.title });
  }
  if (map.size !== Object.keys(j.advisories).length) throw new Error(`key collision in ${file}`);
  return map;
}

const [, , basePath, tipPath] = process.argv;
const base = entries(basePath);
const tip = entries(tipPath);
const added = [...tip.keys()].filter((k) => !base.has(k)).sort();
const gone = [...base.keys()].filter((k) => !tip.has(k)).sort();
const moved = [...tip.keys()].filter((k) => base.has(k) && base.get(k).versions !== tip.get(k).versions).sort();

console.log(`base entries: ${base.size}`);
console.log(`tip entries: ${tip.size}`);
console.log(`only in tip (new): ${added.length}`);
for (const k of added) console.log(`  + ${k}\t${tip.get(k).severity}\t${tip.get(k).versions}\t${tip.get(k).title}`);
console.log(`only in base (gone): ${gone.length}`);
const byModule = new Map();
for (const k of gone) {
  const m = k.split('|')[0];
  byModule.set(m, (byModule.get(m) || 0) + 1);
}
for (const [m, n] of [...byModule].sort()) console.log(`  - ${m}\t${n}`);
console.log(`in both, installed versions differ: ${moved.length}`);
for (const k of moved) console.log(`  ~ ${k}\t${base.get(k).versions} -> ${tip.get(k).versions}`);
