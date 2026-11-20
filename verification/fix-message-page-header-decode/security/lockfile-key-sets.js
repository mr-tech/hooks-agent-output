// Usage: node lockfile-key-sets.js <base pnpm-lock.yaml> <fix pnpm-lock.yaml>
// Compares two pnpm v9-format lockfiles by key set: the root importer's direct dependencies with
// their resolved versions, the `packages:` keys and the `snapshots:` keys. Prints what was removed
// and what was added in each. A version change shows as one removal and one addition.
const fs = require('fs');

function keys(file) {
  const out = { importers: new Set(), packages: new Set(), snapshots: new Set() };
  let section = null;
  let dependency = null;
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const top = /^([a-zA-Z]+):\s*$/.exec(line);
    if (top) { section = top[1]; continue; }
    if (section === 'packages' || section === 'snapshots') {
      // A key line is indented two spaces and ends `:` or `: {}`.
      const key = /^ {2}(\S.*?):(?: \{\})?\s*$/.exec(line);
      if (key) out[section].add(key[1].replace(/^'|'$/g, ''));
    }
    if (section === 'importers') {
      const dep = /^ {6}(\S+):\s*$/.exec(line);
      if (dep) dependency = dep[1].replace(/^'|'$/g, '');
      const version = /^ {8}version: (.+)$/.exec(line);
      if (version && dependency) { out.importers.add(`${dependency} => ${version[1]}`); dependency = null; }
    }
  }
  return out;
}

const [, , baseFile, fixFile] = process.argv;
const base = keys(baseFile);
const fix = keys(fixFile);
for (const section of ['importers', 'packages', 'snapshots']) {
  const removed = [...base[section]].filter((k) => !fix[section].has(k));
  const added = [...fix[section]].filter((k) => !base[section].has(k));
  console.log(`## ${section}: base ${base[section].size}, fix ${fix[section].size}, removed ${removed.length}, added ${added.length}`);
  for (const k of removed) console.log(`  - ${k}`);
  for (const k of added) console.log(`  + ${k}`);
}
