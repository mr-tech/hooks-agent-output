// Premise probe: can a zod 3.22.4 parse stop recording issues after N, from outside the schema?
// Run: node probe.cjs <path-to-zod-package-dir>
const { z } = require(process.argv[2]);
const N = 20;
const STOP = Symbol('stop');
const schema = z.object({ a: z.array(z.string()), b: z.array(z.object({ c: z.string() })) });
const input = { a: Array(5000).fill(1), b: Array(5000).fill({ c: 2 }) };
let calls = 0;
const errorMap = (issue, ctx) => { calls += 1; if (calls > N) throw STOP; return { message: ctx.defaultError }; };
const t0 = Date.now();
let outcome;
try { const r = schema.safeParse(input, { errorMap }); outcome = r.success ? 'success' : `refused, ${r.error.issues.length} issues`; }
catch (e) { outcome = e === STOP ? `stopped by sentinel after ${calls - 1} issues` : `other throw: ${e}`; }
console.log('zod', require(process.argv[2] + '/package.json').version);
console.log('with stopping errorMap:', outcome, `| ${Date.now() - t0} ms`);
calls = 0; const t1 = Date.now();
const r2 = schema.safeParse(input);
console.log('without:', r2.success ? 'success' : `refused, ${r2.error.issues.length} issues`, `| ${Date.now() - t1} ms`, `| message ${r2.success ? 0 : r2.error.message.length} chars`);
