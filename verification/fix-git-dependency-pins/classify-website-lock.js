#!/usr/bin/env node
// Classifies every difference between two website pnpm-lock.yaml files (lockfileVersion 9.0) for the pin change.
// Usage: node classify-website-lock.js <js-yaml module dir> <base lock> <new lock> <project-utils sha> <paracord sha>
// Exit 0 only when:
//   - no top-level key other than importers/packages/snapshots differs;
//   - in importers, only project-utils (specifier and version, to <project-utils sha>) and paracord (specifier only, to
//     `github:mr-tech/paracord#<paracord sha>`, version unchanged) differ;
//   - in packages and snapshots, the only added key is project-utils at the new commit, the old project-utils key is the only
//     other key re-keyed, every other surviving entry is deep-equal to the base, and the removed keys are exactly the base
//     entries reachable from the importer only through project-utils -> prisma-kysely;
//   - the new project-utils snapshot is the base one minus prisma-kysely.
const fs = require('fs');

const [yamlDir, baseFile, nextFile, puSha, paracordSha] = process.argv.slice(2);
const yaml = require(yamlDir);
const base = yaml.load(fs.readFileSync(baseFile, 'utf8'));
const next = yaml.load(fs.readFileSync(nextFile, 'utf8'));
const problems = [];
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

for (const k of new Set([...Object.keys(base), ...Object.keys(next)])) {
  if (!['importers', 'packages', 'snapshots'].includes(k) && !eq(base[k], next[k])) problems.push(`top-level ${k} differs`);
}

const bi = base.importers['.'];
const ni = next.importers['.'];
const importerChanges = [];
for (const sec of new Set([...Object.keys(bi), ...Object.keys(ni)])) {
  for (const n of new Set([...Object.keys(bi[sec] || {}), ...Object.keys(ni[sec] || {})])) {
    if (!eq((bi[sec] || {})[n], (ni[sec] || {})[n])) importerChanges.push(`${sec}.${n}`);
  }
}
const puOld = bi.dependencies['project-utils'];
const puNewVersion = puOld.version.replace(/#[0-9a-f]{40}$/, `#${puSha}`);
const puOldKey = `project-utils@${puOld.version}`;
const puNewKey = `project-utils@${puNewVersion}`;
const paracordSec = bi.dependencies.paracord ? 'dependencies' : 'devDependencies';
const allowed = new Set([`dependencies.project-utils`, `${paracordSec}.paracord`]);
for (const c of importerChanges) if (!allowed.has(c)) problems.push(`importer ${c} differs`);
if (!eq(ni.dependencies['project-utils'], { specifier: `github:hooks-gg/project-utils#${puSha}`, version: puNewVersion })) {
  problems.push(`importer project-utils is ${JSON.stringify(ni.dependencies['project-utils'])}`);
}
if (!eq(ni[paracordSec].paracord, { specifier: `github:mr-tech/paracord#${paracordSha}`, version: bi[paracordSec].paracord.version })) {
  problems.push(`importer paracord is ${JSON.stringify(ni[paracordSec].paracord)}`);
}
if (!bi[paracordSec].paracord.version.endsWith(`/${paracordSha}`)) problems.push('base paracord is not at the pinned commit');

function closure(snaps, roots, skip) {
  const seen = new Set();
  const stack = [...roots];
  while (stack.length) {
    const k = stack.pop();
    if (seen.has(k) || !(k in snaps)) continue;
    seen.add(k);
    const s = snaps[k] || {};
    for (const [n, v] of Object.entries({ ...(s.dependencies || {}), ...(s.optionalDependencies || {}) })) {
      if (!skip(k, n)) stack.push(`${n}@${v}`);
    }
  }
  return seen;
}
const roots = [];
for (const sec of ['dependencies', 'devDependencies', 'optionalDependencies']) {
  for (const [n, e] of Object.entries(bi[sec] || {})) roots.push(`${n}@${e.version}`);
}
const reachAll = closure(base.snapshots, roots, () => false);
const reachKept = closure(base.snapshots, roots, (k, n) => k === puOldKey && n === 'prisma-kysely');
const stripPeers = (k) => { const i = k.indexOf('(', 1); return i < 0 ? k : k.slice(0, i); };
const expectRemoved = {
  snapshots: new Set([...reachAll].filter((k) => !reachKept.has(k))),
  packages: new Set(Object.keys(base.packages).filter((k) => ![...reachKept].some((s) => stripPeers(s) === k))),
};
const report = { importerChanges, sections: {} };
for (const sec of ['packages', 'snapshots']) {
  const b = base[sec];
  const n = next[sec];
  const removed = Object.keys(b).filter((k) => !(k in n) && k !== puOldKey);
  const added = Object.keys(n).filter((k) => !(k in b));
  const changed = Object.keys(b).filter((k) => k in n && !eq(b[k], n[k]));
  report.sections[sec] = { removed: removed.length, added, changed };
  if (!eq(added, [puNewKey])) problems.push(`${sec}: added ${JSON.stringify(added)}`);
  if (puOldKey in n) problems.push(`${sec}: old project-utils key survives`);
  if (changed.length) problems.push(`${sec}: changed ${changed.join(' ')}`);
  const exp = expectRemoved[sec];
  const extra = removed.filter((k) => !exp.has(k));
  const missing = [...exp].filter((k) => !removed.includes(k));
  if (extra.length) problems.push(`${sec}: removed but still reachable: ${extra.join(' ')}`);
  if (missing.length) problems.push(`${sec}: unreachable but kept: ${missing.join(' ')}`);
}
const oldPkg = base.packages[puOldKey];
const newPkg = next.packages[puNewKey] || {};
if (!eq(newPkg, { ...oldPkg, resolution: { ...oldPkg.resolution, commit: puSha } })) problems.push(`packages project-utils entry is ${JSON.stringify(newPkg)}`);
const oldSnap = base.snapshots[puOldKey];
const newSnap = next.snapshots[puNewKey] || {};
const expDeps = { ...oldSnap.dependencies };
delete expDeps['prisma-kysely'];
if (!eq(newSnap.dependencies, expDeps)) problems.push(`snapshots project-utils dependencies are ${JSON.stringify(newSnap.dependencies)}`);
report.projectUtilsSnapshot = newSnap;
report.problems = problems;
report.ok = problems.length === 0;
console.log(JSON.stringify(report, null, 2));
process.exit(report.ok ? 0 : 1);
