import { readFileSync } from 'node:fs';
const rows = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const bad = { outOfBounds: [], emptyOrReversed: [], syntaxOverlap: [], throws: [] };
for (const r of rows) {
  if (typeof r.ranges === 'string') { bad.throws.push(r.text); continue; }
  const syn = [];
  for (const [a, z, s] of r.ranges) {
    if (a < 0 || z > r.text.length) bad.outOfBounds.push(r.text);
    if (z <= a) bad.emptyOrReversed.push(r.text);
    if (s) syn.push([a, z]);
  }
  syn.sort((x, y) => x[0] - y[0]);
  for (let i = 1; i < syn.length; i++) if (syn[i][0] < syn[i - 1][1]) { bad.syntaxOverlap.push(r.text); break; }
}
for (const [k, v] of Object.entries(bad)) console.log(k, v.length, JSON.stringify([...new Set(v)].slice(0, 6)));
