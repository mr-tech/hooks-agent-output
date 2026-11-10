'use strict';
const fs = require('fs'); const path = require('path');
const b = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const NAMED = ['code-review/closed/012-carry-forward-to-post-refresh-pass.md', 'deployment/closed/012-message-valid-field-readiness.md', 'deployment/closed/013-components-v2-editing-surfaces-readiness.md', 'deployment/closed/014-test-suite-cleanup-readiness.md'];
const LEGACY = /^(0(0\d|1[01])-|\d{4}-\d{2}-\d{2}-plan-0*(\d|1[01])\.md$)/;
const files = new Set(); const outside = [];
for (const e of b) {
  const ps = e.check === 'basenames' ? e.detail.split('\n').slice(1).map((s) => s.trim()) : [e.detail.match(/^(\S+?\.md)/)[1]];
  for (const p of ps) { files.add(p); if (!LEGACY.test(path.basename(p)) && !(e.check === 'scope' && NAMED.includes(p))) outside.push(`${e.check} ${p}`); }
}
console.log(`entries ${b.length}; distinct files ${files.size}; outside both classes ${outside.length}`);
for (const o of outside) console.log(`  ${o}`);
console.log(`missing on disk ${[...files].filter((f) => !fs.existsSync(f)).length}`);
