// Premise probe: can zod 3.22.4 refuse an over-limit array before validating its elements?
// Run: node probe.cjs <path-to-zod-package-dir>
const { z } = require(process.argv[2]);
const elem = z.string().regex(/^[0-9]{17,23}$/);
const N = 10;
const over = Array.from({ length: N + 50 }, () => 'x');      // 60 invalid elements
const within = Array.from({ length: N }, () => 'x');         // 10 invalid elements
const forms = {
  'max-only (current)': z.array(elem).max(N),
  'unknown-max-pipe': z.array(z.unknown()).max(N).pipe(z.array(elem)),
};
console.log('zod', require(process.argv[2] + '/package.json').version);
for (const [name, s] of Object.entries(forms)) {
  for (const [label, input] of [['over 60 invalid', over], ['within 10 invalid', within], ['within 10 valid', Array(N).fill('123456789012345678')]]) {
    const r = s.safeParse(input);
    const issues = r.success ? [] : r.error.issues;
    console.log(`${name} | ${label} | success ${r.success} | issues ${issues.length} | codes ${[...new Set(issues.map(i => i.code))]} | first ${JSON.stringify(issues[0] && { code: issues[0].code, maximum: issues[0].maximum, path: issues[0].path })}`);
  }
}
