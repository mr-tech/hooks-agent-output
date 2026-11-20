// Usage: node dump-overviews.js <pnpm-audit.json> <out-dir>
// Writes one text file per module: each distinct GHSA once, with severity, ranges and the advisory's overview text.
const fs = require('fs');
const [,, inPath, outDir] = process.argv;
const j = JSON.parse(fs.readFileSync(inPath, 'utf8'));
fs.mkdirSync(outDir, { recursive: true });
const byMod = new Map();
for (const a of Object.values(j.advisories)) {
  if (!byMod.has(a.module_name)) byMod.set(a.module_name, new Map());
  const m = byMod.get(a.module_name);
  const e = m.get(a.github_advisory_id) || { a, ranges: [] };
  e.ranges.push(a.vulnerable_versions + ' (installed ' + a.findings.map(f => f.version).join(',') + ')');
  m.set(a.github_advisory_id, e);
}
const sizes = [];
for (const [mod, m] of byMod) {
  let out = '';
  for (const [ghsa, { a, ranges }] of [...m].sort((x, y) => x[0].localeCompare(y[0]))) {
    out += `===== ${ghsa} | ${a.severity} | cvss ${a.cvss && a.cvss.score} ${a.cvss && a.cvss.vectorString || ''} | ${(a.cves || []).join(',')}\n` +
      `TITLE: ${a.title}\nRANGES: ${ranges.join(' ; ')}\nPATCHED: ${a.patched_versions}\n\n${a.overview}\n\n`;
  }
  const f = outDir + '/' + mod.replace(/[@/]/g, '_') + '.txt';
  fs.writeFileSync(f, out);
  sizes.push(mod + '\t' + m.size + '\t' + out.length);
}
console.log(sizes.sort().join('\n'));
