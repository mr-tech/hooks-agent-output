// Does the object that ACTUALLY CONNECTS agree with the guard about the target host?
// Guard: WHATWG `new URL()` (resolveTargetHost). Connector: pg's Client, as built by
// getPostgres() -> new Pool({ connectionString }) -> Client.
const { Client } = require('/usr/local/bin/hooks/website/node_modules/.pnpm/pg@8.11.1/node_modules/pg');

function guardSees(s) {
  try { const u = new URL(s); return `${u.hostname}:${u.port || '5432'}`; }
  catch { return '(unparseable)'; }
}
function pgConnectsTo(s) {
  try { const c = new Client({ connectionString: s });
        return `${c.host}:${c.port}`; }
  catch (e) { return 'THREW ' + e.message; }
}

const cases = [
  ['plain',            'postgresql://u:p@db.example.com:5432/x'],
  ['HOST QUERY PARAM', 'postgresql://u:p@decoy.invalid:5432/x?host=viaduct.proxy.rlwy.net'],
  ['host+port params', 'postgresql://u:p@decoy.invalid:1/x?host=viaduct.proxy.rlwy.net&port=12394'],
  ['no explicit port', 'postgresql://u:p@db.example.com/x'],
  ['unencoded pw @',   'postgresql://u:p@ss@db.example.com:5432/x'],
];
let diverged = 0;
for (const [name, s] of cases) {
  const g = guardSees(s), p = pgConnectsTo(s);
  const bad = g !== p;
  if (bad) diverged += 1;
  console.log(`${bad ? 'DIVERGE' : '  agree'}  ${name.padEnd(18)} guard="${g}"  connects="${p}"`);
}
console.log(`\nDIVERGENCES=${diverged}`);
