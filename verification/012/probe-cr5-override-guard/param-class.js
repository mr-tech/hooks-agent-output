// What does the CONNECTOR honour as a connection redirect, and does the guard's
// name-based predicate see all of it? Subject: the pg Client the pool builds.
const PG = '/usr/local/bin/hooks/website/node_modules/.pnpm/pg@8.11.1/node_modules/pg';
const { Client } = require(PG);

const BASE_HOST = 'authority.invalid', BASE_PORT = '5432';
const base = `postgresql://u:p@${BASE_HOST}:${BASE_PORT}/x`;

// The shipped guard predicate, verbatim.
function guardFlags(u) {
  try { const url = new URL(u); return url.searchParams.has('host') || url.searchParams.has('port'); }
  catch { return false; }
}
function connectsTo(u) {
  try { const c = new Client({ connectionString: u });
        return `${c.host}:${c.port}${c.connectionParameters && c.connectionParameters.hostaddr ? ' hostaddr=' + c.connectionParameters.hostaddr : ''}`; }
  catch (e) { return 'THREW ' + e.message; }
}

const cases = [
  ['no params (control)',   base],
  ['?host=',                `${base}?host=redirected.invalid`],
  ['?port=',                `${base}?port=9999`],
  ['?hostaddr=',            `${base}?hostaddr=10.9.9.9`],
  ['?HOST= (uppercase)',    `${base}?HOST=redirected.invalid`],
  ['?Host= (mixed)',        `${base}?Host=redirected.invalid`],
  ['?%68ost= (encoded h)',  `${base}?%68ost=redirected.invalid`],
  ['?host repeated',        `${base}?host=a.invalid&host=b.invalid`],
  ['?host= (empty value)',  `${base}?host=`],
];
const baseline = connectsTo(base);
console.log(`baseline (no params) -> ${baseline}\n`);
let missed = 0;
for (const [name, u] of cases) {
  const g = guardFlags(u), c = connectsTo(u);
  const redirected = c !== baseline;
  const bad = redirected && !g;
  if (bad) missed += 1;
  console.log(`${bad ? 'MISSED ' : '   ok  '} ${name.padEnd(22)} guardRefuses=${String(g).padEnd(5)} connects=${c}${redirected ? '   <-- REDIRECTED' : ''}`);
}
console.log(`\nREDIRECTS THE GUARD DOES NOT SEE = ${missed}`);
