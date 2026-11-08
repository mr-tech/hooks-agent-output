// Code-review re-attack of CR-4 (plan 015 M1-i): drives the RequestCookies parser that next/headers
// cookies() wraps (next/dist/compiled/@edge-runtime/cookies) with Cookie headers RFC 6265 admits,
// plus malformed and hostile ones. Oracle: no throw, and the session cookie is found whenever present
// and well-formed. Usage: node cookie-parser-reattack.cjs <website-repo>
const path = require('path');

const repo = process.argv[2];
const { RequestCookies } = require(path.join(repo, 'node_modules/next/dist/compiled/@edge-runtime/cookies'));
const { version } = require(path.join(repo, 'node_modules/next/package.json'));

const S = 'next-auth.session-token=abc';
const cases = [
  ['bare % in value', `pref=100%; ${S}`, 'abc'],
  ['truncated escape in value', `x=%E0%A4%A; ${S}`, 'abc'],
  ['bare % in name', `a%=1; ${S}`, 'abc'],
  ['lone surrogate escape', `x=%ED%A0%80; ${S}`, 'abc'],
  ['segment with no =', `junk; ${S}`, 'abc'],
  ['empty segments', `;;a=1;; ${S};`, 'abc'],
  ['= in session value', 'next-auth.session-token=a=b', 'a=b'],
  ['quoted value', `q="x y"; ${S}`, 'abc'],
  ['duplicate session cookie, first wins?', `${S}; next-auth.session-token=zzz`, 'abc'],
  ['whitespace around =', 'next-auth.session-token = abc', 'abc'],
  ['secure prefix only', '__Secure-next-auth.session-token=abc', null],
  ['% in the session value itself', 'next-auth.session-token=ab%', 'ab%'],
  ['10k segments', `${Array.from({ length: 10000 }, (_, i) => `k${i}=%`).join('; ')}; ${S}`, 'abc'],
  ['control: plain', S, 'abc'],
];

console.log(`# next ${version}, node ${process.version}`);
for (const [label, header, expected] of cases) {
  let outcome;
  try {
    const jar = new RequestCookies(new Headers({ cookie: header }));
    const value = jar.get('next-auth.session-token')?.value ?? null;
    outcome = `session=${JSON.stringify(value)}${value === expected ? '' : ` (expected ${JSON.stringify(expected)})`}`;
  } catch (err) {
    outcome = `THREW ${err.name}: ${err.message}`;
  }
  console.log(`PROBE ${label} :: ${outcome}`);
}
