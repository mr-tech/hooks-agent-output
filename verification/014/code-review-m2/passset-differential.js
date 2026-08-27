// Pre/post M2 pass-set differential.
// Usage: node passset-differential.js <pre.json> <post.json>
// Reads two vitest --reporter=json outputs and compares the (file, fullName, status)
// tuple sets, with the worktree prefix stripped so the two trees' paths are comparable.
const fs = require('fs');
const load = (p) => {
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
  const s = new Set();
  for (const f of j.testResults) {
    for (const a of f.assertionResults) {
      s.add(f.name.replace(/^.*\/cr014-(pre|post)\//, '') + '::' + a.fullName + '::' + a.status);
    }
  }
  return { s, files: j.testResults.length, total: j.numTotalTests, passed: j.numPassedTests, failed: j.numFailedTests };
};
const [A, B] = [process.argv[2], process.argv[3]].map(load);
console.log('PRE :', JSON.stringify({ files: A.files, total: A.total, passed: A.passed, failed: A.failed, tuples: A.s.size }));
console.log('POST:', JSON.stringify({ files: B.files, total: B.total, passed: B.passed, failed: B.failed, tuples: B.s.size }));
const onlyA = [...A.s].filter((x) => !B.s.has(x));
const onlyB = [...B.s].filter((x) => !A.s.has(x));
console.log('only-in-pre :', onlyA.length);
onlyA.forEach((x) => console.log('  -', x));
console.log('only-in-post:', onlyB.length);
onlyB.forEach((x) => console.log('  +', x));
