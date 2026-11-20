// Usage: node apply-dispositions.js <pnpm-audit.json> <dispositions.json> <out-prefix>
// Joins every advisory of the audit with its reachability disposition and writes
//   <out-prefix>-dispositions.tsv   one row per advisory entry
//   <out-prefix>-disposition-summary.txt   counts by disposition and severity
// It fails, writing nothing, if an advisory has no disposition or a disposition key matches nothing.
const fs = require('fs');

const [, , auditPath, dispPath, outPrefix] = process.argv;
const audit = JSON.parse(fs.readFileSync(auditPath, 'utf8'));
const disp = JSON.parse(fs.readFileSync(dispPath, 'utf8'));
delete disp._about;
const used = new Set();
const sevOrder = ['critical', 'high', 'moderate', 'low'];
const dispOrder = ['REACHED', 'CONDITIONAL', 'HOST', 'ABSENT', 'DEV', 'BUILD', 'UNLOADED'];

function lookup(a) {
  const byGhsa = `${a.module_name}|${a.github_advisory_id}`;
  if (disp[byGhsa]) { used.add(byGhsa); return [disp[byGhsa]]; }
  // One advisory entry covers one version line; a `module@prefix` key overrides the default for it.
  return a.findings.map((f) => {
    const byVersion = Object.keys(disp).find((k) => k.startsWith(`${a.module_name}@`) && f.version.startsWith(k.split('@').pop()));
    const key = byVersion || a.module_name;
    if (!disp[key] || !disp[key].how) throw new Error(`no disposition for ${byGhsa} (${f.version})`);
    used.add(key);
    return disp[key];
  });
}

const rows = [];
for (const a of Object.values(audit.advisories)) {
  const found = lookup(a);
  const versions = a.findings.map((f) => f.version);
  const paths = a.findings.flatMap((f) => f.paths);
  const distinct = [...new Set(found.map((d) => JSON.stringify(d)))].map((s) => JSON.parse(s));
  if (distinct.length !== 1) {
    // An advisory whose installed versions take different dispositions is split into one row per version.
    a.findings.forEach((f, i) => rows.push({ a, d: found[i], versions: [f.version], paths: f.paths, units: 1 }));
  } else {
    rows.push({ a, d: distinct[0], versions, paths, units: versions.length });
  }
}
const unusedKeys = Object.keys(disp).filter((k) => !used.has(k) && disp[k].how);
if (unusedKeys.length) throw new Error(`disposition keys matching no advisory: ${unusedKeys.join(', ')}`);

rows.sort((x, y) => dispOrder.indexOf(x.d.disp) - dispOrder.indexOf(y.d.disp)
  || sevOrder.indexOf(x.a.severity) - sevOrder.indexOf(y.a.severity)
  || x.a.module_name.localeCompare(y.a.module_name)
  || x.a.github_advisory_id.localeCompare(y.a.github_advisory_id));
const clean = (s) => String(s == null ? '' : s).replace(/[\t\n\r]+/g, ' ');
const out = [['disposition', 'severity', 'module', 'installed', 'ghsa', 'cve', 'ships', 'paths', 'title', 'how'].join('\t')];
for (const r of rows) {
  out.push([r.d.disp, r.a.severity, r.a.module_name, r.versions.join(','), r.a.github_advisory_id, (r.a.cves || []).join(','),
    r.d.ships, r.paths.join(' ; '), r.a.title, r.d.how].map(clean).join('\t'));
}
fs.writeFileSync(`${outPrefix}-dispositions.tsv`, `${out.join('\n')}\n`);

// Three countings: rows of the table, advisory entries of the audit, and the audit's own metadata unit
// (one per advisory entry and installed version it matches).
const table = (unit) => {
  const t = {};
  for (const r of rows) {
    t[r.d.disp] = t[r.d.disp] || { critical: 0, high: 0, moderate: 0, low: 0 };
    t[r.d.disp][r.a.severity] += unit(r);
  }
  const lines = [['disposition', ...sevOrder, 'total'].join('\t')];
  const tot = { critical: 0, high: 0, moderate: 0, low: 0 };
  for (const d of dispOrder) {
    if (!t[d]) continue;
    const c = t[d];
    sevOrder.forEach((s) => { tot[s] += c[s]; });
    lines.push([d, ...sevOrder.map((s) => c[s]), sevOrder.reduce((n, s) => n + c[s], 0)].join('\t'));
  }
  lines.push(['all', ...sevOrder.map((s) => tot[s]), sevOrder.reduce((n, s) => n + tot[s], 0)].join('\t'));
  return lines.join('\n');
};
const entryIds = new Set();
const summary = [
  `advisory entries in the audit: ${Object.keys(audit.advisories).length}`,
  `distinct GHSA ids: ${new Set(Object.values(audit.advisories).map((a) => a.github_advisory_id)).size}`,
  `audit metadata.vulnerabilities: ${JSON.stringify(audit.metadata.vulnerabilities)}`,
  `rows in the dispositions table: ${rows.length}`,
  '',
  'By advisory entry (an entry split across dispositions counts once per disposition it takes):',
  table((r) => { const k = `${r.a.id}|${r.d.disp}`; if (entryIds.has(k)) return 0; entryIds.add(k); return 1; }),
  '',
  "By the audit's own unit (advisory entry x installed version), which is what metadata.vulnerabilities counts:",
  table((r) => r.units),
  '',
  'Distinct GHSA ids per disposition:',
  ...dispOrder.filter((d) => rows.some((r) => r.d.disp === d))
    .map((d) => `${d}\t${new Set(rows.filter((r) => r.d.disp === d).map((r) => r.a.github_advisory_id)).size}`),
].join('\n');
fs.writeFileSync(`${outPrefix}-disposition-summary.txt`, `${summary}\n`);
console.log(summary);
