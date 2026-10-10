// QA mutation sweep (fix-v1-guild-messages-auth, Phase 2) over the shipped guard and 400 paths.
// Runs ONLY in an isolated export (`git archive <sha> | tar -x`, node_modules linked); never in the
// shared tree. Usage: node qa-mutation-sweep.js <export-dir> <out.json>
// Each mutant: exact-string replace (must match exactly once per target file, else the mutant is
// reported INVALID and not run), run vitest over src/server/api, record failing case names, restore,
// and verify the restored bytes equal the original.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawnSync } = require('child_process');

const [exp, out] = process.argv.slice(2);
const LIST = 'src/pages/api/v1/guilds/[guildId]/messages.ts';
const SINGLE = 'src/pages/api/v1/guilds/[guildId]/messages/[id].ts';
const CODES = 'src/pages/api/messages/codes/[code].ts';
const GUARD = "if (!key || req.headers.authorization !== `Bearer ${key}`) return res.status(401).end();";
const both = [LIST, SINGLE];
const each = (files, id, desc, from, to) => files.map((f) => ({ id: `${id}${files.length > 1 ? (f === LIST ? '-list' : '-single') : ''}`, desc, edits: [{ f, from, to }] }));

const mutants = [
  ...each(both, 'M01-no-fail-closed', 'drop `!key ||`', GUARD, "if (req.headers.authorization !== `Bearer ${key}`) return res.status(401).end();"),
  ...each(both, 'M02-or-to-and', '`||` -> `&&`', GUARD, "if (!key && req.headers.authorization !== `Bearer ${key}`) return res.status(401).end();"),
  ...each(both, 'M03-guard-removed', 'delete the guard line', GUARD, ''),
  ...each(both, 'M04-401-not-ended', '`res.status(401).end()` -> `res.status(401)` (CR-1)', GUARD, "if (!key || req.headers.authorization !== `Bearer ${key}`) return res.status(401);"),
  ...each(both, 'M05-401-to-403', 'status 401 -> 403', GUARD, "if (!key || req.headers.authorization !== `Bearer ${key}`) return res.status(403).end();"),
  ...each(both, 'M06-401-with-body', '401 sends a JSON body', GUARD, "if (!key || req.headers.authorization !== `Bearer ${key}`) return res.status(401).json([] as never);"),
  ...each(both, 'M07-prefix-accept', 'exact match -> startsWith (accepts `Bearer <key><suffix>`)', GUARD, "if (!key || !req.headers.authorization?.startsWith(`Bearer ${key}`)) return res.status(401).end();"),
  ...each(both, 'M08-case-insensitive', 'case-insensitive compare (accepts `bearer <KEY>`)', GUARD, "if (!key || req.headers.authorization?.toLowerCase() !== `Bearer ${key}`.toLowerCase()) return res.status(401).end();"),
  ...each(both, 'M09-trim', 'trim the header before compare', GUARD, "if (!key || req.headers.authorization?.trim() !== `Bearer ${key}`) return res.status(401).end();"),
  ...each(both, 'M10-includes-key', 'header merely contains the key', GUARD, "if (!key || !req.headers.authorization?.includes(key)) return res.status(401).end();"),
  ...each(both, 'M11-method-first', 'method check before the guard', `  ${GUARD}\n  if (req.method !== 'GET') return res.status(405).end();`, `  if (req.method !== 'GET') return res.status(405).end();\n  ${GUARD}`),
  ...each(both, 'M12-400-not-ended', '`res.status(400).end()` -> `res.status(400)`', 'return res.status(400).end();', 'return res.status(400);'),
  ...each([CODES], 'M13-codes-400-not-ended', '`res.status(400).end()` -> `res.status(400)`', 'return res.status(400).end();', 'return res.status(400);'),
];

const sha = (b) => crypto.createHash('sha256').update(b).digest('hex');
const env = { ...process.env, DATABASE_URL: 'postgres://u:p@127.0.0.1:1/none', REDISHOST: '127.0.0.1', REDISPORT: '1', REDIS_URL: 'redis://127.0.0.1:1' };
delete env.STATBOT_API_KEY;

function runSuite(tag) {
  const json = path.join(require('os').tmpdir(), `qa-mut-${process.pid}-${tag}.json`);
  const r = spawnSync('npx', ['vitest', 'run', 'src/server/api', '--reporter=json', `--outputFile=${json}`], { cwd: exp, env, encoding: 'utf8', timeout: 300000 });
  const rep = JSON.parse(fs.readFileSync(json, 'utf8'));
  fs.unlinkSync(json);
  const failed = rep.testResults.flatMap((t) => t.assertionResults.filter((a) => a.status !== 'passed').map((a) => `${path.basename(t.name)} :: ${a.fullName}`));
  return { exit: r.status, total: rep.numTotalTests, passed: rep.numPassedTests, failedCount: rep.numFailedTests, files: rep.testResults.length, failed };
}

const results = { export: exp, baseline: runSuite('baseline'), mutants: [] };
for (const m of mutants) {
  const originals = {};
  let valid = true;
  for (const e of m.edits) {
    const p = path.join(exp, e.f);
    const src = originals[e.f] ?? fs.readFileSync(p, 'utf8');
    originals[e.f] = src;
    const n = src.split(e.from).length - 1;
    if (n !== 1) { valid = false; break; }
    fs.writeFileSync(p, src.replace(e.from, e.to));
  }
  const rec = { id: m.id, desc: m.desc, file: m.edits[0].f };
  if (!valid) rec.result = 'INVALID (replacement did not match exactly once)';
  else rec.result = runSuite(m.id);
  for (const [f, src] of Object.entries(originals)) {
    fs.writeFileSync(path.join(exp, f), src);
    rec.restored = sha(fs.readFileSync(path.join(exp, f))) === sha(Buffer.from(src));
  }
  results.mutants.push(rec);
  console.log(rec.id, typeof rec.result === 'string' ? rec.result : `exit=${rec.result.exit} failed=${rec.result.failedCount}/${rec.result.total}`, 'restored=', rec.restored);
}
results.after = runSuite('after');
fs.writeFileSync(out, JSON.stringify(results, null, 2));
