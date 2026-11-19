// QA's check of M6-c's unchanged log lines over one probe run (verification/017/m6-probe/probe.mjs writes probe-result.json).
// The probe prints these counts but never fails on them; this check does.
// Usage: node unchanged-lines-check.mjs <probe out dir> [--quick]
// Expected values are literals read from the base run at generator 8de2b53 (qa-m6/base-8de2b53/probe-result.json), never
// from the tree under test: Server running 1, Created instance 2, one "POST /generate" line per POST to /generate (13 cases
// plus bad body and wrong key = 15; --quick drops the hang case, 14), and one "Server received" line.
// "Drain complete" is not checked: it is absent on BOTH trees under the probe (the 10 s exit timer in shutdown() fires
// first), so no expected value can be taken from the base; asserting 0 would pin it (axiom D). Stated as an instrument limit.
import { readFileSync } from 'fs';

const [dir] = process.argv.slice(2);
const quick = process.argv.includes('--quick');
const r = JSON.parse(readFileSync(`${dir}/probe-result.json`, 'utf8'));
const count = (s) => r.generatorLines.filter((l) => l.includes(s)).length;
const want = {
  'Server running at': 1,
  'Created instance': 2,
  'POST /generate': quick ? 14 : 15,
  'Server received': 1,
};
let failed = 0;
for (const [s, n] of Object.entries(want)) {
  const got = count(s);
  const ok = got === n;
  if (!ok) failed += 1;
  console.log(`${ok ? 'PASS' : 'FAIL'} "${s}" count=${got} want=${n}`);
}
console.log(`unchanged-lines failed ${failed}`);
process.exit(failed ? 1 : 0);
