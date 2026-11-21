#!/usr/bin/env node
// Classifies every difference between two npm package-lock.json files (lockfileVersion 2).
// Usage: node classify-lock-diff.js <base lock> <new lock>
// Prints a JSON report: entries added/removed per section, and per changed entry the set of changed fields.
// Exit 0 when the only differences are (a) prisma-kysely moving between the root's dependencies and
// devDependencies and (b) a `dev: true` flag gained by entries, with no version, resolved, integrity or
// dependency-list change anywhere, and (c) the entries that gained `dev: true` are exactly the base lock's
// runtime entries reachable from prisma-kysely and from no other runtime root dependency; exit 1 otherwise.
const fs = require('fs');

const [baseFile, nextFile] = process.argv.slice(2);
const base = JSON.parse(fs.readFileSync(baseFile, 'utf8'));
const next = JSON.parse(fs.readFileSync(nextFile, 'utf8'));

const sorted = (o) => JSON.stringify(Object.keys(o || {}).sort().map((k) => [k, o[k]]));

const report = { topLevel: [], sections: {} };
for (const k of new Set([...Object.keys(base), ...Object.keys(next)])) {
  if (k === 'packages' || k === 'dependencies') continue;
  if (JSON.stringify(base[k]) !== JSON.stringify(next[k])) report.topLevel.push(k);
}

function walkLegacy(obj, prefix, out) {
  for (const [name, entry] of Object.entries(obj || {})) {
    const key = prefix ? `${prefix} > ${name}` : name;
    const { dependencies, ...rest } = entry;
    out[key] = rest;
    walkLegacy(dependencies, key, out);
  }
  return out;
}

const sections = {
  packages: [base.packages, next.packages],
  dependencies: [walkLegacy(base.dependencies, '', {}), walkLegacy(next.dependencies, '', {})],
};

let ok = report.topLevel.length === 0;
const devGained = [];
for (const [section, [a, b]] of Object.entries(sections)) {
  const s = { added: [], removed: [], changed: {}, devGained: 0 };
  for (const k of Object.keys(a)) if (!(k in b)) s.removed.push(k);
  for (const k of Object.keys(b)) if (!(k in a)) s.added.push(k);
  for (const k of Object.keys(a)) {
    if (!(k in b)) continue;
    const fields = new Set([...Object.keys(a[k]), ...Object.keys(b[k])]);
    const changed = [...fields].filter((f) => JSON.stringify(a[k][f]) !== JSON.stringify(b[k][f]));
    if (!changed.length) continue;
    if (changed.length === 1 && changed[0] === 'dev' && b[k].dev === true && a[k].dev === undefined) {
      s.devGained += 1;
      if (section === 'packages') devGained.push(k);
      continue;
    }
    s.changed[k] = changed;
  }
  if (s.added.length || s.removed.length) ok = false;
  for (const [k, changed] of Object.entries(s.changed)) {
    const rootMove = section === 'packages' && k === ''
      && changed.every((f) => f === 'dependencies' || f === 'devDependencies')
      && sorted(a[''].dependencies) === sorted({ ...b[''].dependencies, 'prisma-kysely': a[''].dependencies['prisma-kysely'] })
      && sorted(b[''].devDependencies) === sorted({ ...a[''].devDependencies, 'prisma-kysely': a[''].dependencies['prisma-kysely'] });
    if (!rootMove) ok = false;
  }
  report.sections[section] = s;
}
report.devGainedPackages = devGained;

// Reachability over the base lock's packages graph, by node's lookup rule (nearest node_modules upward).
function resolve(pkgs, from, name) {
  let dir = from;
  for (;;) {
    const cand = dir ? `${dir}/node_modules/${name}` : `node_modules/${name}`;
    if (cand in pkgs) return cand;
    if (!dir) return null;
    const i = dir.lastIndexOf('/node_modules/');
    dir = i < 0 ? '' : dir.slice(0, i);
  }
}
function closure(pkgs, starts) {
  const seen = new Set();
  const stack = [...starts];
  while (stack.length) {
    const p = stack.pop();
    if (!p || seen.has(p)) continue;
    seen.add(p);
    const e = pkgs[p];
    for (const n of Object.keys({ ...(e.dependencies || {}), ...(e.optionalDependencies || {}), ...(e.peerDependencies || {}) })) {
      const r = resolve(pkgs, p, n);
      if (r) stack.push(r);
    }
  }
  return seen;
}
const bp = base.packages;
const rootRuntime = Object.keys(bp[''].dependencies || {});
const others = closure(bp, rootRuntime.filter((n) => n !== 'prisma-kysely').map((n) => resolve(bp, '', n)));
const viaPk = closure(bp, [resolve(bp, '', 'prisma-kysely')]);
const onlyPk = [...viaPk].filter((p) => !others.has(p) && bp[p].dev !== true);
const gained = new Set(devGained);
report.reachability = {
  baseRuntimeOnlyViaPrismaKysely: onlyPk.length,
  devGainedNotOnlyViaPrismaKysely: devGained.filter((p) => !onlyPk.includes(p)),
  onlyViaPrismaKyselyNotDevGained: onlyPk.filter((p) => !gained.has(p)),
};
if (report.reachability.devGainedNotOnlyViaPrismaKysely.length
  || report.reachability.onlyViaPrismaKyselyNotDevGained.length) ok = false;
report.ok = ok;
console.log(JSON.stringify(report, null, 2));
process.exit(ok ? 0 : 1);
