// Import-graph reachability over the extracted website src tree (read-only).
// Usage: node graph.js <srcRoot>
const fs = require('fs');
const path = require('path');

const SRC = process.argv[2];
const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(ts|tsx)$/.test(e.name)) files.push(p);
  }
})(SRC);

const isTest = (f) => f.includes(`${path.sep}__tests__${path.sep}`);
const prod = files.filter((f) => !isTest(f));

function resolve(fromFile, spec) {
  let base;
  if (spec.startsWith('~/')) base = path.join(SRC, spec.slice(2));
  else if (spec.startsWith('.')) base = path.resolve(path.dirname(fromFile), spec);
  else return null; // bare package
  const cands = [base, base + '.ts', base + '.tsx', path.join(base, 'index.ts'), path.join(base, 'index.tsx')];
  return cands.find((c) => fs.existsSync(c) && fs.statSync(c).isFile()) || null;
}

const importRe = /(?:from\s+|import\s*\(\s*|require\(\s*)['"]([^'"]+)['"]/g;
const fwd = new Map(); // file -> Set(resolved local targets)
const rev = new Map(); // target -> Set(importers)
for (const f of prod) {
  const txt = fs.readFileSync(f, 'utf8');
  const out = new Set();
  let m;
  importRe.lastIndex = 0;
  while ((m = importRe.exec(txt))) {
    const r = resolve(f, m[1]);
    if (r) out.add(r);
  }
  fwd.set(f, out);
  for (const t of out) {
    if (!rev.has(t)) rev.set(t, new Set());
    rev.get(t).add(f);
  }
}

// Dialog-host markers: a component usage (JSX tag or call) of a dialog/modal/portal primitive.
const hostRe = /<(PresetDialog|Dialog|Drawer|BottomPortal|WarningDialog|ConfirmationDialog|SaveChoiceModal|FloatingPortal|Portal|FloatingOverlay)\b|createPortal\(/g;
const hostMarks = new Map();
for (const f of prod) {
  const txt = fs.readFileSync(f, 'utf8');
  const hits = [...txt.matchAll(hostRe)].map((x) => x[1] || 'createPortal');
  if (hits.length) hostMarks.set(f, [...new Set(hits)]);
}

const rel = (f) => path.relative(path.dirname(SRC), f);

// Targets: the files that the lazy wrappers load (or the wrapper file itself where dynamic() is inline).
const targets = JSON.parse(process.argv[3]);

for (const t of targets) {
  const start = path.join(SRC, t.consumer);
  console.log(`\n### ${t.name}  consumer=${t.consumer}`);
  // BFS upward over importers, recording first dialog-host reached per branch.
  const seen = new Set([start]);
  let frontier = [[start, [start]]];
  let found = [];
  for (let depth = 0; depth < 7 && frontier.length; depth++) {
    const next = [];
    for (const [f, chain] of frontier) {
      if (hostMarks.has(f) && !isTest(f)) {
        found.push({ host: f, marks: hostMarks.get(f), chain });
        continue;
      }
      for (const imp of rev.get(f) || []) {
        if (seen.has(imp)) continue;
        seen.add(imp);
        next.push([imp, [...chain, imp]]);
      }
    }
    frontier = next;
  }
  if (!found.length) console.log('  no dialog host reachable by import chain (depth<=7)');
  for (const h of found.slice(0, 6)) {
    console.log(`  host ${rel(h.host)} [${h.marks.join(',')}]`);
    console.log(`    chain: ${h.chain.map(rel).join(' <- ')}`);
  }
  if (found.length > 6) console.log(`  (+${found.length - 6} more host branches)`);
}

// Direct: does the consumer file itself carry a dialog-host marker?
console.log('\n### self-markers of wrapper consumers');
for (const t of targets) {
  const f = path.join(SRC, t.consumer);
  console.log(`  ${t.consumer}: ${hostMarks.has(f) ? hostMarks.get(f).join(',') : '(none)'}`);
}
console.log(`\nprod files=${prod.length} test files=${files.length - prod.length}`);
