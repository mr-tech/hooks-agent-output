'use strict';
const fs = require('fs'); const path = require('path');
const text = fs.readFileSync(process.argv[2], 'utf8').split('\n');
function chainOf(rel) {
  const base = path.basename(rel);
  const m = base.match(/^(\d{1,3})-/) || base.match(/-plan-(\d{1,3})(?:\D|$)/) || rel.match(/(?:^|\/)(\d{3})\//);
  return m ? Number(m[1]) : null;
}
let check = null; const items = [];
for (const l of text) {
  let m = l.match(/^  ([A-Z-]+) — \d+ failure/); if (m) { check = m[1]; continue; }
  if (/^  [A-Z-]+ — \d+ warning/.test(l)) { check = null; continue; }
  if (!check) continue;
  if (/^    \S/.test(l)) items.push({ check, head: l.trim(), more: [] });
  else if (/^        \S/.test(l) && items.length) items[items.length - 1].more.push(l.trim());
}
const tally = {};
for (const it of items) {
  let files;
  if (it.check === 'BASENAMES') files = it.more;
  else { const f = it.head.match(/^(\S+?\.md)/); files = f ? [f[1]] : []; }
  const legacy = files.length && files.every((f) => { const n = chainOf(f); return n !== null && n < 12; });
  const sub = it.check === 'FRONTMATTER' ? it.head.replace(/^\S+: /, '').replace(/'[^']*'/g, "'X'").replace(/\d+/g, 'N').slice(0, 60)
    : it.check === 'LINKS' ? (it.head.match(/\(([a-z-]+)/) || [])[1]
    : it.check === 'SCOPE' ? it.head.replace(/^\S+: /, '').slice(0, 40) : '';
  const k = `${it.check}\t${legacy ? 'legacy' : 'CHECKED'}\t${sub}`;
  (tally[k] = tally[k] || []).push(it.head.slice(0, 160) + (it.more.length ? ' [' + it.more.join(', ') + ']' : ''));
}
for (const [k, v] of Object.entries(tally).sort()) {
  console.log(`${v.length}\t${k}`);
  if (process.env.SHOW && k.includes('CHECKED')) for (const x of v) console.log('      ' + x);
}
console.log('total', items.length);
