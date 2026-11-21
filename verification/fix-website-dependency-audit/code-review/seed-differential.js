'use strict';
const fs = require('fs');
const [auditP, reviewP, seededP] = process.argv.slice(2);
const audit = JSON.parse(fs.readFileSync(auditP, 'utf8'));
const disp = JSON.parse(fs.readFileSync(reviewP, 'utf8'));
const seeded = JSON.parse(fs.readFileSync(seededP, 'utf8'));
const forms = { ghsa: 0, version: 0, bare: 0 };
let units = 0, same = 0, split = 0; const bad = [];
const bareModules = new Set();
for (const a of Object.values(audit.advisories)) {
  const key = `${a.module_name}|${a.github_advisory_id}`;
  const s = seeded[key];
  let form;
  for (const f of a.findings) {
    let d;
    if (disp[key]) { d = disp[key]; form = 'ghsa'; }
    else {
      const bv = Object.keys(disp).find((k) => k.startsWith(`${a.module_name}@`) && f.version.startsWith(k.split('@').pop()));
      d = disp[bv || a.module_name]; form = form === 'version' ? 'version' : (bv ? 'version' : 'bare');
      if (!bv) bareModules.add(a.module_name);
    }
    units++;
    if (!s || !s.how) { bad.push(`${key} ${f.version}: no seeded how`); continue; }
    if (s.disp === d.disp && s.ships === d.ships && s.how === d.how) same++;
    else if (s.disp.includes(`${d.disp} ${f.version}`) && s.ships.includes(`${d.ships} ${f.version}`) && s.how.includes(`${f.version}: ${d.how}`)) split++;
    else bad.push(`${key} ${f.version}: differs`);
  }
  forms[form]++;
}
const keys = Object.keys(seeded).filter((k) => !k.startsWith('_'));
const auditKeys = new Set(Object.values(audit.advisories).map((a) => `${a.module_name}|${a.github_advisory_id}`));
console.log(JSON.stringify({ entries: Object.keys(audit.advisories).length, forms, bareModules: bareModules.size, units, same, splitMatch: split, bad,
  seededKeys: keys.length, keysNotInAudit: keys.filter((k) => !auditKeys.has(k)), auditKeysNotSeeded: [...auditKeys].filter((k) => !seeded[k]),
  nonGhsaForm: keys.filter((k) => !/^[^|]+\|GHSA-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}$/.test(k)), emptyHow: keys.filter((k) => !seeded[k].how) }, null, 1));
