import { spawn } from 'child_process';
import { readFileSync } from 'fs';

import { createPreviewStub } from '../m6-probe/preview-stub.mjs';

const [exportDir, logFile] = process.argv.slice(2);
const sleep = (ms) => new Promise((r) => { setTimeout(r, ms); });
const preview = createPreviewStub();
const port = await preview.listen();
const rig = spawn('node', [new URL('./rig.mjs', import.meta.url).pathname, exportDir, logFile, '--preview-endpoint', `http://127.0.0.1:${port}/preview`], { stdio: ['ignore', 'inherit', 'inherit'] });
let up = false;
for (let i = 0; i < 600 && !up; i += 1) {
  // eslint-disable-next-line no-await-in-loop
  await sleep(200);
  try { up = (await fetch('http://127.0.0.1:39002/generate', { method: 'GET' })).status === 404; } catch (_) { up = false; }
}
const res = await fetch('http://127.0.0.1:39002/generate', { method: 'POST', headers: { Authorization: 'Bearer rig-api-key' }, body: JSON.stringify({ id: '42', nonce: 'vrig-01', message: { mode: 'ok' } }) });
await sleep(500);
const log = readFileSync(logFile, 'utf8').trim().split('\n').map((l) => JSON.parse(l));
const put = log.find((e) => e.kind === 'put');
const get = await fetch('http://127.0.0.1:39001/bucket/dev/previews/42/vrig-01.jpeg');
console.log(JSON.stringify({ up, status: res.status, putKey: put?.key, putType: put?.type, served: get.status, servedType: get.headers.get('content-type'), otherRequests: log.filter((e) => e.kind !== 'put' && e.kind !== 'get').length }));
rig.kill('SIGINT');
await new Promise((r) => { rig.on('exit', r); });
await preview.close();
