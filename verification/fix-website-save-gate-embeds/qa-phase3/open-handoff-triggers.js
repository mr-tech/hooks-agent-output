// Phase 3 step 1b instrument: for every handoff/*.md (not closed/) whose frontmatter Status is Open,
// print the file and its whole Review-Trigger value (folded continuation lines joined).
// Usage: node open-handoff-triggers.js <agent-output root>
const fs = require('fs');
const path = require('path');

const dir = path.join(process.argv[2], 'handoff');
const rows = [];
for (const name of fs.readdirSync(dir).sort()) {
  if (!name.endsWith('.md') || name === 'README.md') continue;
  const text = fs.readFileSync(path.join(dir, name), 'utf8');
  const fm = text.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) { rows.push([name, 'NO-FRONTMATTER', '']); continue; }
  const lines = fm[1].split('\n');
  const status = (lines.find((l) => /^Status:/.test(l)) || '').replace(/^Status:\s*/, '').trim();
  if (status !== 'Open') continue;
  let trigger = null;
  for (let i = 0; i < lines.length; i += 1) {
    if (/^Review-Trigger:/.test(lines[i])) {
      trigger = lines[i].replace(/^Review-Trigger:\s*/, '');
      for (let j = i + 1; j < lines.length && /^\s+\S/.test(lines[j]); j += 1) trigger += ` ${lines[j].trim()}`;
    }
  }
  rows.push([name, status, trigger === null ? 'NO-TRIGGER' : trigger]);
}
for (const r of rows) console.log(r.join('\t'));
console.error(`open handoffs: ${rows.length}`);
