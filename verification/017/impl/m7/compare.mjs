import { readFileSync } from 'fs';

// M7-b: for every file the chain changed (git diff -M --name-status base..tip), each rule's count in a no-fix report at the tip is
// no higher than at the base (a renamed file is compared with its old path); a new file has none.
// Usage: node compare.mjs <name-status file> <base report> <tip report> <repo root prefix>
const [nsFile, baseFile, tipFile, root] = process.argv.slice(2);
const load = (f) => {
  const m = new Map();
  JSON.parse(readFileSync(f, 'utf8')).forEach((r) => {
    const counts = {};
    r.messages.forEach((x) => { counts[x.ruleId ?? 'parse'] = (counts[x.ruleId ?? 'parse'] ?? 0) + 1; });
    m.set(r.filePath.replace(`${root}/`, ''), counts);
  });
  return m;
};
const base = load(baseFile); const tip = load(tipFile);
const rows = readFileSync(nsFile, 'utf8').trim().split('\n').map((l) => l.split('\t'));
const out = []; let worse = 0; let members = 0;
rows.forEach((cols) => {
  const status = cols[0][0];
  if (status === 'D') return;
  const oldPath = status === 'R' ? cols[1] : cols[1];
  const newPath = cols[cols.length - 1];
  if (!/\.(ts|tsx|js|jsx|mjs|cjs)$/.test(newPath)) return;
  const was = status === 'A' ? {} : (base.get(oldPath) ?? {});
  const now = tip.get(newPath);
  if (now === undefined) { out.push(`NOT-LINTED ${newPath}`); return; }
  members += 1;
  Object.entries(now).forEach(([rule, n]) => {
    const before = was[rule] ?? 0;
    if (n > before) { worse += 1; out.push(`WORSE ${newPath} ${rule} ${before} -> ${n}`); }
  });
  const total = Object.values(now).reduce((a, b) => a + b, 0);
  if (status === 'A' && total) out.push(`NEW-FILE-WITH-FINDINGS ${newPath} ${JSON.stringify(now)}`);
});
console.log(`changed lintable files compared: ${members}; rule counts above the base: ${worse}`);
console.log(out.join('\n'));
