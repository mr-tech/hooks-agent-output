'use strict';

const fs = require('node:fs');
const path = require('node:path');

const RECORD = path.resolve(__dirname, '..', '..');
const AUDIT = path.join(RECORD, 'verification/018/security/out/pnpm-audit-prod-d1bb9b0.json');
const REVIEWED = path.join(RECORD, 'verification/website-deps-review/security/dispositions.json');
const OUT = path.join(RECORD, 'tools/website-audit-dispositions.json');

const audit = JSON.parse(fs.readFileSync(AUDIT, 'utf8'));
const disp = JSON.parse(fs.readFileSync(REVIEWED, 'utf8'));

function lookup(a) {
  const byGhsa = `${a.module_name}|${a.github_advisory_id}`;
  if (disp[byGhsa]) return a.findings.map(() => disp[byGhsa]);
  return a.findings.map((f) => {
    const byVersion = Object.keys(disp).find((k) => k.startsWith(`${a.module_name}@`) && f.version.startsWith(k.split('@').pop()));
    const key = byVersion || a.module_name;
    if (!disp[key] || !disp[key].how) throw new Error(`no disposition for ${byGhsa} (${f.version})`);
    return disp[key];
  });
}

const perVersion = {};
for (const a of Object.values(audit.advisories)) {
  const key = `${a.module_name}|${a.github_advisory_id}`;
  perVersion[key] = perVersion[key] || {};
  lookup(a).forEach((d, i) => { perVersion[key][a.findings[i].version] = d; });
}
const seeded = {};
const split = [];
for (const [key, versions] of Object.entries(perVersion)) {
  const distinct = [...new Set(Object.values(versions).map((d) => JSON.stringify(d)))];
  if (distinct.length === 1) {
    seeded[key] = JSON.parse(distinct[0]);
  } else {
    split.push(key);
    const sorted = Object.keys(versions).sort();
    seeded[key] = {
      disp: sorted.map((v) => `${versions[v].disp} ${v}`).join('; '),
      ships: sorted.map((v) => `${versions[v].ships} ${v}`).join('; '),
      how: sorted.map((v) => `${v}: ${versions[v].how}`).join(' | '),
    };
  }
}

const keys = Object.keys(seeded).sort();
const out = {
  _about: 'Reachability dispositions for website advisories, read by tools/website-dependency-audit.js. One key per advisory, "<module>|<GHSA id>"; only such a key dispositions an advisory. Seeded from verification/website-deps-review/security/dispositions.json (the security review of website 983681c) over pnpm audit --prod at website d1bb9b0 (verification/018/security/out/pnpm-audit-prod-d1bb9b0.json), by verification/fix-website-dependency-audit/seed-dispositions.js. disp: REACHED | CONDITIONAL | ABSENT | HOST | BUILD | UNLOADED | DEV. ships: server | browser | both | build | none. Where an advisory\'s installed versions take different dispositions, disp, ships and how name each version. To add one: node tools/website-dependency-audit.js --help.',
  _review: 'pending review at f943553',
  ...Object.fromEntries(keys.map((k) => [k, seeded[k]])),
};
fs.writeFileSync(OUT, `${JSON.stringify(out, null, 2)}\n`);
console.log(`advisory entries ${Object.keys(audit.advisories).length}, keys written ${keys.length}, split by version ${split.length}: ${split.join(', ')}`);
