#!/usr/bin/env node
// Hand-pins website's package.json and pnpm-lock.yaml (lockfileVersion 9.0) to fixed commits of project-utils and paracord,
// without re-resolving anything: text edits on the exact lines, then deletion of the lockfile blocks that only
// project-utils' dropped runtime dependency held.
// Usage: node pin-website-lock.js <website dir> <js-yaml module dir> <project-utils sha> <paracord sha> <report.json>
// Edits <website dir>/package.json and <website dir>/pnpm-lock.yaml in place; writes a report of every removed key.
// Refuses (exit 1, writes nothing) when an anchor is absent or not unique.
const fs = require('fs');
const path = require('path');

const [dir, yamlDir, puSha, paracordSha, reportFile] = process.argv.slice(2);
const yaml = require(yamlDir);
const pkgFile = path.join(dir, 'package.json');
const lockFile = path.join(dir, 'pnpm-lock.yaml');
const pkgText = fs.readFileSync(pkgFile, 'utf8');
const lockText = fs.readFileSync(lockFile, 'utf8');
const lock = yaml.load(lockText);

const DROPPED = 'prisma-kysely';
const imp = lock.importers['.'];
const puOld = imp.dependencies['project-utils'];
const puOldSha = puOld.version.split('#')[1];
const puOldKey = `project-utils@${puOld.version}`;
const puNewVersion = puOld.version.replace(puOldSha, puSha);
const puNewKey = `project-utils@${puNewVersion}`;
const paracordEntry = imp.dependencies.paracord || imp.devDependencies.paracord;
if (!paracordEntry.version.endsWith(`/${paracordSha}`)) throw new Error(`paracord lock is ${paracordEntry.version}, not ${paracordSha}`);

function replaceOnce(text, from, to, what) {
  const n = text.split(from).length - 1;
  if (n !== 1) throw new Error(`${what}: anchor found ${n} times: ${from}`);
  return text.replace(from, to);
}

// Reachability over snapshots from the importer's roots.
function keyOf(name, version) { return `${name}@${version}`; }
function closure(snaps, roots, skip) {
  const seen = new Set();
  const stack = [...roots];
  while (stack.length) {
    const k = stack.pop();
    if (seen.has(k)) continue;
    if (!(k in snaps)) {
      if (k.includes('@link:') || k.includes('@file:')) continue;
      throw new Error(`unresolved snapshot ${k}`);
    }
    seen.add(k);
    const s = snaps[k] || {};
    for (const [n, v] of Object.entries({ ...(s.dependencies || {}), ...(s.optionalDependencies || {}) })) {
      if (skip(k, n)) continue;
      stack.push(keyOf(n, v));
    }
  }
  return seen;
}
const roots = [];
for (const sec of ['dependencies', 'devDependencies', 'optionalDependencies']) {
  for (const [n, e] of Object.entries(imp[sec] || {})) roots.push(keyOf(n, e.version));
}
const before = closure(lock.snapshots, roots, () => false);
const after = closure(lock.snapshots, roots, (k, n) => k === puOldKey && n === DROPPED);
const unreachedBefore = Object.keys(lock.snapshots).filter((k) => !before.has(k));
if (unreachedBefore.length) throw new Error(`snapshots unreachable before the edit: ${unreachedBefore.join(' ')}`);
const removedSnapshots = [...before].filter((k) => !after.has(k)).sort();
const stripPeers = (k) => { const i = k.indexOf('(', 1); return i < 0 ? k : k.slice(0, i); };
const keptPackages = new Set([...after].map(stripPeers));
const removedPackages = Object.keys(lock.packages).filter((k) => !keptPackages.has(k)).sort();
const removedPackagesOrphanBefore = removedPackages.filter((k) => ![...before].some((s) => stripPeers(s) === k));
if (removedPackagesOrphanBefore.length) throw new Error(`packages with no snapshot before the edit: ${removedPackagesOrphanBefore.join(' ')}`);

// Block removal: a block is a top-level key line at two-space indent inside a section, up to the next blank line.
function removeBlocks(text, section, keys) {
  const lines = text.split('\n');
  const secStart = lines.indexOf(`${section}:`);
  if (secStart < 0) throw new Error(`no ${section} section`);
  let secEnd = lines.findIndex((l, i) => i > secStart && /^[a-z]/.test(l));
  if (secEnd < 0) secEnd = lines.length;
  const want = new Set(keys);
  const found = new Set();
  const out = [];
  for (let i = 0; i < lines.length; i += 1) {
    const l = lines[i];
    if (i > secStart && i < secEnd && /^ {2}\S/.test(l)) {
      const m = /^ {2}('?)(.+?)\1:(?: \{\})?$/.exec(l);
      if (!m) throw new Error(`${section}: unparsed key line ${i + 1}: ${l}`);
      const key = m[2];
      if (want.has(key)) {
        found.add(key);
        let j = i + 1;
        while (j < secEnd && lines[j] !== '') j += 1;
        i = j;
        continue;
      }
    }
    out.push(l);
  }
  const missing = keys.filter((k) => !found.has(k));
  if (missing.length) throw new Error(`${section}: block not found for ${missing.join(' ')}`);
  return out.join('\n');
}

let pkg = pkgText;
pkg = replaceOnce(pkg, '"project-utils": "github:hooks-gg/project-utils#master",',
  `"project-utils": "github:hooks-gg/project-utils#${puSha}",`, 'package.json project-utils');
pkg = replaceOnce(pkg, '"paracord": "github:mr-tech/paracord",',
  `"paracord": "github:mr-tech/paracord#${paracordSha}",`, 'package.json paracord');

let out = lockText;
out = replaceOnce(out, `      project-utils:\n        specifier: github:hooks-gg/project-utils#master\n        version: ${puOld.version}\n`,
  `      project-utils:\n        specifier: github:hooks-gg/project-utils#${puSha}\n        version: ${puNewVersion}\n`, 'importer project-utils');
out = replaceOnce(out, '      paracord:\n        specifier: github:mr-tech/paracord\n',
  `      paracord:\n        specifier: github:mr-tech/paracord#${paracordSha}\n`, 'importer paracord');
const toRemoveSnapshots = removedSnapshots;
out = removeBlocks(out, 'snapshots', toRemoveSnapshots);
out = removeBlocks(out, 'packages', removedPackages);
out = replaceOnce(out, `  ${puOldKey}:\n    resolution: {commit: ${puOldSha}, `,
  `  ${puNewKey}:\n    resolution: {commit: ${puSha}, `, 'packages project-utils');
const puSnap = lock.snapshots[puOldKey];
const newDeps = Object.entries(puSnap.dependencies).filter(([n]) => n !== DROPPED);
const puBelow = [...closure(lock.snapshots, [puOldKey], (kk, n) => kk === puOldKey && n === DROPPED)].filter((k) => k !== puOldKey);
const newPeers = (puSnap.transitivePeerDependencies || []).filter((p) => puBelow.some((k) => {
  const s = lock.snapshots[k] || {};
  const pk = lock.packages[stripPeers(k)] || {};
  return (s.transitivePeerDependencies || []).includes(p) || Object.keys(pk.peerDependencies || {}).includes(p);
}));
const oldBlock = [`  ${puOldKey}:`, '    dependencies:',
  ...Object.entries(puSnap.dependencies).map(([n, v]) => `      ${n}: ${v}`),
  '    transitivePeerDependencies:', ...(puSnap.transitivePeerDependencies || []).map((p) => `      - ${p}`)].join('\n');
const newBlock = [`  ${puNewKey}:`, '    dependencies:', ...newDeps.map(([n, v]) => `      ${n}: ${v}`),
  ...(newPeers.length ? ['    transitivePeerDependencies:', ...newPeers.map((p) => `      - ${p}`)] : [])].join('\n');
out = replaceOnce(out, `${oldBlock}\n`, `${newBlock}\n`, 'snapshots project-utils');

const check = yaml.load(out);
if (!check.snapshots[puNewKey] || check.snapshots[puOldKey]) throw new Error('project-utils snapshot not re-keyed');

fs.writeFileSync(pkgFile, pkg);
fs.writeFileSync(lockFile, out);
fs.writeFileSync(reportFile, `${JSON.stringify({
  projectUtils: { from: puOldKey, to: puNewKey, dependencies: Object.fromEntries(newDeps), transitivePeerDependencies: newPeers },
  paracord: paracordEntry.version,
  removedSnapshots: toRemoveSnapshots,
  removedPackages,
}, null, 2)}\n`);
console.log(`removed snapshots ${toRemoveSnapshots.length}, packages ${removedPackages.length}; project-utils peers ${JSON.stringify(newPeers)}`);
