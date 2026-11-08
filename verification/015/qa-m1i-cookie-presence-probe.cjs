// QA Phase 1 instrument (chain 015, M1-i restated over next/headers cookies()).
// Question: for Cookie headers the request grammar admits, what does Next's own parser
// (the one cookies() wraps) report as present for the two session-cookie names?
// Run from website/ so require resolves the installed next: node <this file>
// No network path. Reads the parser by path; prints its SHA-256 so the result is tied to the file run.
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const p = require.resolve('next/dist/compiled/@edge-runtime/cookies/index.js', { paths: [process.cwd()] });
console.log('parser', path.relative(process.cwd(), p), crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex'));
console.log('next', require(require.resolve('next/package.json', { paths: [process.cwd()] })).version);
const { RequestCookies } = require(p);
const NAMES = ['__Secure-next-auth.session-token', 'next-auth.session-token'];
const cases = [
  ['positive control: plain token', 'next-auth.session-token=abc'],
  ['secure name', '__Secure-next-auth.session-token=abc'],
  ['no cookie header value', ''],
  ['segment with no =', 'junk; next-auth.session-token=abc'],
  ['= inside value', 'a=x=y; next-auth.session-token=abc'],
  ['legal % octet', 'a=%41; next-auth.session-token=abc'],
  ['bare session name, no =', 'next-auth.session-token'],
  ['session value with undecodable % (%zz)', 'next-auth.session-token=%zz'],
  ['session value with truncated UTF-8 (%E0%A4%A)', 'next-auth.session-token=%E0%A4%A'],
  ['negative control: other cookie only', 'other=1'],
];
for (const [label, header] of cases) {
  let out;
  try {
    const rc = new RequestCookies(new Headers(header ? { cookie: header } : {}));
    const hit = NAMES.map((n) => rc.get(n)).find(Boolean);
    out = hit ? `present value=${JSON.stringify(hit.value)}` : 'absent';
  } catch (e) { out = `THROWS ${e.name}`; }
  console.log(`${label.padEnd(48)} | ${JSON.stringify(header).padEnd(50)} | ${out}`);
}
