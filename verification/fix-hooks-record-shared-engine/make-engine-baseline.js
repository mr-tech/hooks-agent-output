'use strict';
const fs = require('fs'); const path = require('path');
const lines = fs.readFileSync(process.argv[2], 'utf8').split('\n');
const chainOf = (rel) => { const b = path.basename(rel); const m = b.match(/^(\d{1,3})-/) || b.match(/-plan-(\d{1,3})(?:\D|$)/) || rel.match(/(?:^|\/)(\d{3})\//); return m ? Number(m[1]) : null; };
const NAMED = new Set(['code-review/closed/012-carry-forward-to-post-refresh-pass.md', 'deployment/closed/012-message-valid-field-readiness.md', 'deployment/closed/013-components-v2-editing-surfaces-readiness.md', 'deployment/closed/014-test-suite-cleanup-readiness.md']);
const RULING = 'steering/record-tools-shared-engine-rulings.md, block 2026-11-10T08:53Z';
let check = null; const items = [];
for (const l of lines) {
  const m = l.match(/^  ([A-Z-]+) — \d+ failure/); if (m) { check = m[1].toLowerCase(); continue; }
  if (/^  [A-Z-]+ — \d+ warning/.test(l) || /^  FAIL/.test(l)) { check = null; continue; }
  if (!check) continue;
  if (/^    \S/.test(l)) items.push({ check, detail: l.slice(4), paths: [] });
  else if (/^        \S/.test(l) && items.length) { const it = items[items.length - 1]; it.detail += `\n${l}`; it.paths.push(l.trim()); }
}
const out = []; const refused = [];
for (const it of items) {
  const files = it.check === 'basenames' ? it.paths : [(it.detail.match(/^(\S+?\.md)/) || [])[1]].filter(Boolean);
  const legacy = files.length && files.every((f) => { const n = chainOf(f); return n !== null && n < 12; });
  let why;
  if (legacy) {
    const n = String(Math.min(...files.map(chainOf))).padStart(3, '0');
    why = `Chain ${n} predates chain 012: a predecessor-workflow document the record's own checker omitted (FIRST_CHECKED_CHAIN = 12, owner ruling 2026-08-24). The engine has no such omission, so it is baselined at the move to the engine (${RULING}). Closed history, not to be repaired.`;
  } else if (it.check === 'scope' && NAMED.has(files[0])) {
    why = `A closed chain document with no stage suffix the engine's table accepts for its directory. No correction short of a rename can clear it, and a rename breaks its citations. Baselined at the move to the engine (${RULING}). A new suffix would be an engine change (the Agents domain).`;
  } else { refused.push(it.detail.split('\n')[0]); continue; }
  out.push({ check: it.check, detail: it.detail, _why: why });
}
if (refused.length) { console.error('REFUSED (not in a covered class):\n' + refused.join('\n')); process.exit(1); }
fs.writeFileSync(process.argv[3], JSON.stringify(out, null, 2) + '\n');
const tally = {}; for (const e of out) { const k = `${e.check} ${e._why.startsWith('Chain') ? 'legacy' : 'named-scope'}`; tally[k] = (tally[k] || 0) + 1; }
console.log(out.length, JSON.stringify(tally));
