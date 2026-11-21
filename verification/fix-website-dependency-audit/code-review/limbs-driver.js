'use strict';
const fs = require('fs'); const path = require('path'); const os = require('os');
const { execFileSync, spawnSync } = require('child_process');
const [tool, root] = process.argv.slice(2);
const env = { ...process.env, GIT_AUTHOR_NAME: 'r', GIT_AUTHOR_EMAIL: 'r@r', GIT_COMMITTER_NAME: 'r', GIT_COMMITTER_EMAIL: 'r@r' };
const g = (repo, ...a) => execFileSync('git', ['-C', repo, ...a], { encoding: 'utf8', env }).trim();
const W = path.join(root, 'w'), O = path.join(root, 'o.git'), T = path.join(root, 'tmp');
fs.mkdirSync(W); fs.mkdirSync(T);
g(W, 'init', '-q', '-b', 'master');
for (const [f, c] of [['package.json', '{}\n'], ['pnpm-lock.yaml', 'x\n'], ['pnpm-workspace.yaml', 'y\n'], ['patches/p.patch', 'z\n'], ['n.txt', '0\n']]) {
  fs.mkdirSync(path.dirname(path.join(W, f)), { recursive: true }); fs.writeFileSync(path.join(W, f), c);
}
g(W, 'add', '-A'); g(W, 'commit', '-q', '-m', 'c0');
execFileSync('git', ['clone', '-q', '--bare', W, O]); g(W, 'remote', 'add', 'origin', O); g(W, 'fetch', '-q', 'origin');
const files = { disp: path.join(root, 'disp.json'), inbox: path.join(root, 'INBOX.txt'), state: path.join(root, 's', 'state.json'), fx: path.join(root, 'fx'), pnpm: path.join(root, 'pnpm') };
fs.writeFileSync(files.disp, JSON.stringify({ 'a|GHSA-aaaa-aaaa-aaaa': { how: 'read' } }));
fs.writeFileSync(files.inbox, '# Inbox\n');
fs.writeFileSync(files.pnpm, '#!/bin/sh\ncat "$FX"\nexit 1\n'); fs.chmodSync(files.pnpm, 0o755);
const adv = (m, gh) => ({ id: Math.floor(Math.random() * 1e9), module_name: m, github_advisory_id: gh, severity: 'high', title: 't', url: 'u', findings: [{ version: '1.0.0', paths: ['.>' + m] }] });
const good = (...a) => JSON.stringify({ advisories: Object.fromEntries(a.map((x) => [x.id, x])) });
const heads = () => fs.readFileSync(files.inbox, 'utf8').split('\n').filter((l) => l.startsWith('## ')).length;
const kinds = () => { const t = fs.readFileSync(files.inbox, 'utf8'); return { failure: (t.match(/dependency audit of `website` \(origin\/master\) failed/g) || []).length, stale: (t.match(/but `git ls-remote` reads/g) || []).length, advisory: (t.match(/does not disposition/g) || []).length }; };
function run(label, fx) {
  fs.writeFileSync(files.fx, fx);
  const refs = g(W, 'for-each-ref');
  const r = spawnSync(process.execPath, [tool, '--website', W, '--dispositions', files.disp, '--inbox', files.inbox, '--state', files.state, '--pnpm', files.pnpm], { encoding: 'utf8', env: { ...env, FX: files.fx, TMPDIR: T } });
  const st = fs.existsSync(files.state) ? JSON.parse(fs.readFileSync(files.state, 'utf8')) : null;
  console.log(JSON.stringify({ label, exit: r.status, headings: heads(), ...kinds(), failing: st && st.failing ? 'set' : 'unset', stalePairs: st && st.stale ? Object.keys(st.stale).length : 0, refsUnchanged: refs === g(W, 'for-each-ref'), tmpEmpty: fs.readdirSync(T).length === 0 }));
}
function moveRemote(n) { g(W, 'checkout', '-q', '-b', 'b' + n); fs.writeFileSync(path.join(W, 'n.txt'), n + '\n'); g(W, 'commit', '-q', '-am', 'c' + n); g(O, 'fetch', '-q', W, `b${n}:refs/heads/b${n}`); g(W, 'checkout', '-q', 'master'); g(O, 'update-ref', 'refs/heads/master', g(O, 'rev-parse', 'b' + n)); }
const A = adv('a', 'GHSA-aaaa-aaaa-aaaa'), B = adv('b', 'GHSA-bbbb-bbbb-bbbb');
console.log('# limb (a): streak, recovery, second streak; an advisory published during the streak');
run('fail-1 (not json)', 'not json');
run('fail-2 (error object)', '{"error":{"code":"X"}}');
run('fail-3 (not json)', 'nope');
run('success: B undispositioned, should report B and end streak', good(A, B));
run('success again: nothing new', good(A, B));
run('fail-4: new streak', 'bad');
run('fail-5', 'bad');
run('success: ends second streak, B not repeated', good(A, B));
console.log('# limb (b): differing pair, same pair, new pair, back in step');
moveRemote(1);
run('pair-1', good(A, B));
run('pair-1 repeat', good(A, B));
moveRemote(2);
run('pair-2', good(A, B));
g(W, 'fetch', '-q', 'origin');
run('in step after a fetch (driver fetch, not the tool)', good(A, B));
console.log('# combined: failure while stale gives no stale entry; recovery while stale on a known pair adds nothing for it');
moveRemote(3);
run('fail while stale', 'bad');
run('recover while stale, new pair', good(A, B));
