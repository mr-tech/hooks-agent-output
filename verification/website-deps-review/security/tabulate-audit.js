// Usage: node tabulate-audit.js <pnpm-audit.json> <out-prefix>
// Writes <out-prefix>-advisories.tsv (one row per advisory) and
// <out-prefix>-packages.tsv (one row per module: counts by severity, installed versions, root dependencies).
const fs = require('fs');
const [,, inPath, outPrefix] = process.argv;
const j = JSON.parse(fs.readFileSync(inPath, 'utf8'));
const adv = Object.values(j.advisories);
const order = { critical: 0, high: 1, moderate: 2, low: 3, info: 4 };
adv.sort((a, b) => a.module_name.localeCompare(b.module_name) || order[a.severity] - order[b.severity] || a.github_advisory_id.localeCompare(b.github_advisory_id));
const clean = s => String(s == null ? '' : s).replace(/[\t\n\r]+/g, ' ');
const rows = [['module', 'severity', 'ghsa', 'cves', 'cvss', 'cwe', 'vulnerable_versions', 'patched_versions', 'installed_versions', 'n_paths', 'roots', 'title'].join('\t')];
const pk = new Map();
for (const a of adv) {
  const versions = [...new Set(a.findings.map(f => f.version))].sort();
  const paths = a.findings.flatMap(f => f.paths);
  const roots = [...new Set(paths.map(p => p.split('>')[1]))].sort();
  rows.push([a.module_name, a.severity, a.github_advisory_id, (a.cves || []).join(','), a.cvss && a.cvss.score, (a.cwe || []).join ? a.cwe.join(',') : a.cwe, a.vulnerable_versions, a.patched_versions, versions.join(','), paths.length, roots.join(','), a.title].map(clean).join('\t'));
  const e = pk.get(a.module_name) || { critical: 0, high: 0, moderate: 0, low: 0, info: 0, versions: new Set(), roots: new Set(), paths: new Set() };
  e[a.severity]++; versions.forEach(v => e.versions.add(v)); roots.forEach(r => e.roots.add(r)); paths.forEach(p => e.paths.add(p));
  pk.set(a.module_name, e);
}
fs.writeFileSync(outPrefix + '-advisories.tsv', rows.join('\n') + '\n');
const prow = [['module', 'critical', 'high', 'moderate', 'low', 'total', 'installed_versions', 'roots', 'distinct_paths'].join('\t')];
const tot = { critical: 0, high: 0, moderate: 0, low: 0 };
for (const [m, e] of [...pk].sort((a, b) => a[0].localeCompare(b[0]))) {
  prow.push([m, e.critical, e.high, e.moderate, e.low, e.critical + e.high + e.moderate + e.low, [...e.versions].sort().join(','), [...e.roots].sort().join(','), e.paths.size].join('\t'));
  for (const k of Object.keys(tot)) tot[k] += e[k];
}
fs.writeFileSync(outPrefix + '-packages.tsv', prow.join('\n') + '\n');
const pathsOut = [];
for (const [m, e] of [...pk].sort((a, b) => a[0].localeCompare(b[0]))) for (const p of [...e.paths].sort()) pathsOut.push(m + '\t' + p);
fs.writeFileSync(outPrefix + '-paths.tsv', pathsOut.join('\n') + '\n');
console.log(JSON.stringify({ advisories: adv.length, modules: pk.size, bySeverity: tot, metadata: j.metadata.vulnerabilities, distinctGhsa: new Set(adv.map(a => a.github_advisory_id)).size }));
