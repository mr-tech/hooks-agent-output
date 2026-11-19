import { spawn } from 'child_process';
import http from 'http';

import { createS3Stub } from '../../../m6-probe/s3-stub.mjs';

// Code review Round 7 (chain 017, M6): adversarial cases beyond the implementer's rig, against the real generator in an export.
// Usage (inside `unshare -rn` with lo up; run.sh does this): node attack.mjs <generator export dir>
// Oracle, fixed before the first run:
//   jpeg-body        204; exactly one put at previews/42/<nonce>.jpeg whose stored body is non-empty and starts FF D8 (JPEG).
//   redirect-404     /preview answers 302 to a page answering 404: 500, 0 puts, exactly one line class=error-status.
//   redirect-200     /preview answers 302 to a page answering 200: 204, 1 put.
//   prior-object     an object seeded at previews/42/seeded.jpeg survives a successful render of a new nonce.
//   concurrent       two requests for id 42 with different nonces at once: both 204, both objects present, 0 list/delete.
//   client-abort     the caller drops the connection after 1 s while /preview takes 3 s: the generator stays up and the
//                    next request answers 204 (what it stores for the dropped one is recorded, not judged: M5's sweep owns it).
//   every case       no list, delete or other bucket request.
const [exportDir] = process.argv.slice(2);
const sleep = (ms) => new Promise((r) => { setTimeout(r, ms); });
const KEY = 'attack-key';

const s3 = createS3Stub();
const page = '<!doctype html><html><body style="margin:0;background:#36393f;color:#fff"><h1>attack stub</h1></body></html>';
const preview = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://stub');
  if (url.pathname === '/gone') { res.writeHead(404, { 'Content-Type': 'text/html' }); res.end(page); return; }
  if (url.pathname === '/fine') { res.writeHead(200, { 'Content-Type': 'text/html' }); res.end(page); return; }
  let mode = 'ok';
  try { mode = JSON.parse(url.searchParams.get('data') ?? '{}').mode ?? 'ok'; } catch (_) { /* not JSON: ok */ }
  if (mode === 'redirect-404') { res.writeHead(302, { Location: '/gone' }); res.end(); return; }
  if (mode === 'redirect-200') { res.writeHead(302, { Location: '/fine' }); res.end(); return; }
  if (mode === 'slow') { setTimeout(() => { res.writeHead(200, { 'Content-Type': 'text/html' }); res.end(page); }, 3000); return; }
  res.writeHead(200, { 'Content-Type': 'text/html' }); res.end(page);
});
const s3Port = await s3.listen();
const previewPort = await new Promise((r) => { preview.listen(0, '127.0.0.1', () => r(preview.address().port)); });
const GEN_PORT = 39000 + Math.floor(Math.random() * 900);

const lines = [];
const child = spawn(`${exportDir}/node_modules/.bin/ts-node`, ['src/server.ts'], {
  cwd: exportDir,
  env: {
    PATH: process.env.PATH,
    HOME: process.env.HOME,
    TS_NODE_TRANSPILE_ONLY: 'true',
    PUPPETEER_EXECUTABLE_PATH: '/usr/bin/google-chrome',
    API_KEY: KEY,
    ENV: 'production',
    SERVER_PORT: String(GEN_PORT),
    SERVER_HOST: '127.0.0.1',
    CDN_ENDPOINT: `http://127.0.0.1:${s3Port}`,
    CDN_KEY: 'k',
    CDN_SECRET: 's',
    CDN_BUCKET: 'bucket',
    PREVIEW_ENDPOINT: `http://127.0.0.1:${previewPort}/preview`,
  },
});
let buf = '';
const onData = (c) => { buf += c.toString(); const p = buf.split('\n'); buf = p.pop(); lines.push(...p); };
child.stdout.on('data', onData);
child.stderr.on('data', onData);
let exited = null;
child.on('exit', (code, sig) => { exited = { code, sig }; });

const post = async (nonce, mode, signal) => {
  const res = await fetch(`http://127.0.0.1:${GEN_PORT}/generate`, {
    method: 'POST', signal, headers: { Authorization: `Bearer ${KEY}` }, body: JSON.stringify({ id: '42', nonce, message: { mode } }),
  });
  await res.arrayBuffer();
  return res.status;
};

for (let i = 0; i < 1200 && !lines.some((l) => l.includes('Server running at')); i += 1) await sleep(100);
const results = [];
const check = (name, fn) => results.push({ name, reasons: fn() });
const window = async (fn) => { const a = s3.log.length; const b = lines.length; const r = await fn(); await sleep(400); return { r, s3: s3.log.slice(a), lines: lines.slice(b) }; };
const others = (w) => w.s3.filter((e) => e.kind !== 'put' && e.kind !== 'get');
const fails = (w) => w.lines.filter((l) => l.startsWith('preview-image-failure'));

let w = await window(() => post('cr7-a', 'ok'));
check('jpeg-body', () => {
  const r = [];
  const o = s3.objects.get('previews/42/cr7-a.jpeg');
  if (w.r !== 204) r.push(`status ${w.r}`);
  if (w.s3.filter((e) => e.kind === 'put').length !== 1) r.push('puts != 1');
  if (!o || o.body.length === 0 || o.body[0] !== 0xff || o.body[1] !== 0xd8) r.push(`body ${o ? o.body.subarray(0, 2).toString('hex') : 'absent'} len ${o?.body.length}`);
  if (others(w).length) r.push(`other ${others(w).map((e) => e.kind)}`);
  return r;
});

w = await window(() => post('cr7-b', 'redirect-404'));
check('redirect-404', () => {
  const r = [];
  if (w.r !== 500) r.push(`status ${w.r}`);
  if (w.s3.some((e) => e.kind === 'put')) r.push('a put');
  const f = fails(w);
  if (f.length !== 1 || !/^preview-image-failure id=42 class=error-status elapsedMs=\d+$/.test(f[0])) r.push(`lines ${JSON.stringify(f)}`);
  if (others(w).length) r.push(`other ${others(w).map((e) => e.kind)}`);
  return r;
});

w = await window(() => post('cr7-c', 'redirect-200'));
check('redirect-200', () => {
  const r = [];
  if (w.r !== 204) r.push(`status ${w.r}`);
  if (w.s3.filter((e) => e.kind === 'put').length !== 1) r.push('puts != 1');
  if (others(w).length) r.push(`other ${others(w).map((e) => e.kind)}`);
  return r;
});

s3.objects.set('previews/42/seeded.jpeg', { body: Buffer.from([0xff, 0xd8]), type: 'image/jpeg', lastModified: new Date(Date.now() - 600000) });
w = await window(() => post('cr7-d', 'ok'));
check('prior-object', () => {
  const r = [];
  if (w.r !== 204) r.push(`status ${w.r}`);
  if (!s3.objects.has('previews/42/seeded.jpeg')) r.push('seeded object deleted');
  if (others(w).length) r.push(`other ${others(w).map((e) => e.kind)}`);
  return r;
});

w = await window(() => Promise.all([post('cr7-e1', 'ok'), post('cr7-e2', 'ok')]));
check('concurrent', () => {
  const r = [];
  if (w.r[0] !== 204 || w.r[1] !== 204) r.push(`statuses ${w.r}`);
  ['cr7-e1', 'cr7-e2', 'cr7-a', 'cr7-c', 'cr7-d'].forEach((n) => { if (!s3.objects.has(`previews/42/${n}.jpeg`)) r.push(`missing ${n}`); });
  if (others(w).length) r.push(`other ${others(w).map((e) => e.kind)}`);
  return r;
});

const ac = new AbortController();
const aborted = post('cr7-f', 'slow', ac.signal).catch((e) => `aborted:${e.name}`);
await sleep(1000);
ac.abort();
const abortedResult = await aborted;
await sleep(4000);
w = await window(() => post('cr7-g', 'ok'));
check('client-abort', () => {
  const r = [];
  if (!String(abortedResult).startsWith('aborted')) r.push(`dropped request answered ${abortedResult}`);
  if (exited) r.push(`generator exited ${JSON.stringify(exited)}`);
  if (w.r !== 204) r.push(`next request status ${w.r}`);
  return r;
});
const droppedStored = s3.objects.has('previews/42/cr7-f.jpeg');

child.kill('SIGINT');
for (let i = 0; i < 150 && !exited; i += 1) await sleep(100);
if (!exited) child.kill('SIGKILL');
await s3.close();
await new Promise((r) => { preview.closeAllConnections?.(); preview.close(r); });

results.forEach((x) => console.log(`${x.reasons.length ? 'FAIL' : 'PASS'} ${x.name}${x.reasons.length ? ` :: ${x.reasons.join('; ')}` : ''}`));
console.log(`recorded: dropped request's object stored=${droppedStored}`);
console.log(`s3 request kinds: ${JSON.stringify(s3.log.reduce((a, e) => ({ ...a, [e.kind]: (a[e.kind] ?? 0) + 1 }), {}))}`);
console.log(`failure lines: ${lines.filter((l) => l.startsWith('preview-image-failure')).length}`);
console.log(`cases ${results.length}, failed ${results.filter((x) => x.reasons.length).length}`);
process.exit(0);
