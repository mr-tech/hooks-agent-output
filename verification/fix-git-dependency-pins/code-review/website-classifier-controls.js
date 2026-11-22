#!/usr/bin/env node
// Reviewer's controls for ../classify-website-lock.js: each control mutates the committed fix lock in one way and records
// whether the classifier refuses it. Usage: node website-classifier-controls.js <js-yaml dir> <base lock> <fix lock> <out dir>
//   C0 the committed lock itself (expect exit 0)
//   C1 a still-reachable snapshot (kysely@0.26.1) deleted (expect exit 1: removed but still reachable)
//   C2 one removed snapshot and its package entry put back (expect exit 1: unreachable but kept)
//   C3 a surviving package's version re-keyed (zod@3.22.4 -> zod@3.22.5 in packages and snapshots) (expect exit 1)
//   C4 the project-utils snapshot's transitivePeerDependencies changed to [encoding, pg-native, supports-color] (the base
//      value) - probes whether the classifier constrains that field at all
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const [yamlDir, baseFile, fixFile, out] = process.argv.slice(2);
const yaml = require(yamlDir);
const base = yaml.load(fs.readFileSync(baseFile, 'utf8'));
const fix = () => yaml.load(fs.readFileSync(fixFile, 'utf8'));
const PU = '40ba5d3a5b54447abb0dd44a9fcc7b43a35f8165';
const PARACORD = '3f203086ae38699f26dbee90dadbb395a96be227';
const puKey = `project-utils@git+https://git@github.com:hooks-gg/project-utils.git#${PU}`;
fs.mkdirSync(out, { recursive: true });

const controls = {
  C0: (l) => l,
  C1: (l) => { delete l.snapshots['kysely@0.26.1']; return l; },
  C2: (l) => {
    const k = Object.keys(base.snapshots).find((x) => x.startsWith('prisma-kysely@'));
    l.snapshots[k] = base.snapshots[k];
    l.packages[k.replace(/\(.*$/, '')] = base.packages[k.replace(/\(.*$/, '')];
    return l;
  },
  C3: (l) => {
    for (const s of ['packages', 'snapshots']) { l[s]['zod@3.22.5'] = l[s]['zod@3.22.4']; delete l[s]['zod@3.22.4']; }
    return l;
  },
  C4: (l) => { l.snapshots[puKey].transitivePeerDependencies = ['encoding', 'pg-native', 'supports-color']; return l; },
};
const summary = {};
for (const [name, mutate] of Object.entries(controls)) {
  const f = path.join(out, `${name}.yaml`);
  fs.writeFileSync(f, yaml.dump(mutate(fix()), { lineWidth: -1 }));
  let code = 0; let stdout = '';
  try {
    stdout = execFileSync('node', [path.join(__dirname, '..', 'classify-website-lock.js'), yamlDir, baseFile, f, PU, PARACORD], { encoding: 'utf8' });
  } catch (e) { code = e.status; stdout = e.stdout; }
  fs.writeFileSync(path.join(out, `${name}.json`), stdout);
  fs.unlinkSync(f);
  summary[name] = { exit: code, problems: JSON.parse(stdout).problems };
}
fs.writeFileSync(path.join(out, 'summary.json'), JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
