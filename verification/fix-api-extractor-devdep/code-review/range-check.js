// usage: node range-check.js <new-lock.json> <semver-module-path> <pkg>...
// For each named hoisted package, lists every lockfile entry whose dependencies resolve to it and
// whether the hoisted version satisfies that entry's declared range.
const fs = require('fs');
const [lock, semverPath, ...names] = process.argv.slice(2);
const semver = require(semverPath);
const pkgs = JSON.parse(fs.readFileSync(lock, 'utf8')).packages;
for (const n of names) {
  const hoisted = pkgs[`node_modules/${n}`];
  console.log(`${n}@${hoisted.version} engines=${JSON.stringify(hoisted.engines || null)}`);
  for (const [p, e] of Object.entries(pkgs)) {
    const r = { ...e.dependencies, ...e.devDependencies, ...e.optionalDependencies, ...e.peerDependencies }[n];
    if (r === undefined) continue;
    const nested = pkgs[`${p ? `${p}/` : ''}node_modules/${n}`];
    const used = nested ? nested.version : hoisted.version;
    console.log(`  ${p || '(root)'} wants ${r} -> uses ${used}${nested ? ' (nested)' : ''} ok=${semver.satisfies(used, r)}`);
  }
}
