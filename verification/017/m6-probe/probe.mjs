import { spawn } from 'child_process';
import { rmSync, writeFileSync } from 'fs';
import { createRequire } from 'module';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { createPreviewStub } from './preview-stub.mjs';
import { createS3Stub } from './s3-stub.mjs';

// M6-0: the probe rig for plan 017 M6. Usage (inside `unshare -rn` with lo up):
//   node probe.mjs <generator export dir> <out dir> [--quick]
// Starts the S3 stub and the preview stub on loopback, starts the generator from the export against them, posts one
// request per case, and prints each case's observed status, S3 requests, generator log lines and verdict against the
// expectations written below (M6-a, M6-b, M6-c). --quick skips the 30 s hang case.
const here = dirname(fileURLToPath(import.meta.url));
const [exportDir, outDir] = process.argv.slice(2);
const quick = process.argv.includes('--quick');
const sleep = (ms) => new Promise((r) => { setTimeout(r, ms); });
const requireFromExport = createRequire(`${exportDir}/package.json`);
void requireFromExport;

const KEY = 'probe-api-key';
const MARKER = 'PLANTED-MESSAGE-CONTENT';
const s3 = createS3Stub({ failPut: (key) => key.includes('nfail') });
const preview = createPreviewStub();
const s3Port = await s3.listen();
const previewPort = await preview.listen();
const GEN_PORT = 38000 + Math.floor(Math.random() * 1000);

const lines = [];
const child = spawn(`${exportDir}/node_modules/.bin/ts-node`, ['src/server.ts'], {
  cwd: exportDir,
  env: {
    PATH: process.env.PATH,
    HOME: process.env.HOME,
    TS_NODE_TRANSPILE_ONLY: 'true',
    SHIM_VIEWPORT_FAIL: `${outDir}/viewport-fail.flag`,
    NODE_OPTIONS: `--require ${resolve(here, 'shim-screenshot.cjs')}`,
    NODE_PATH: `${exportDir}/node_modules`,
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
let buffer = '';
const onData = (chunk) => {
  buffer += chunk.toString();
  const parts = buffer.split('\n');
  buffer = parts.pop();
  parts.forEach((l) => lines.push(l));
};
child.stdout.on('data', onData);
child.stderr.on('data', onData);

const stopAll = async () => {
  child.kill('SIGINT');
  await Promise.race([new Promise((r) => { child.on('exit', r); }), sleep(15000)]);
  if (child.exitCode === null) child.kill('SIGKILL');
  await s3.close();
  await preview.close();
};

const waitFor = async (predicate, ms) => {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    if (predicate()) return true;
    await sleep(100);
  }
  return false;
};

const post = async (body, { path = '/generate', method = 'POST', auth = `Bearer ${KEY}` } = {}) => {
  const started = Date.now();
  const res = await fetch(`http://127.0.0.1:${GEN_PORT}${path}`, {
    method, body: method === 'POST' ? body : undefined, headers: { Authorization: auth, 'Content-Type': 'application/json' },
  });
  await res.arrayBuffer();
  return { status: res.status, ms: Date.now() - started };
};

const cases = [
  {
    name: 'ok', mode: 'ok', nonce: 'vprobe-01', status: 204, puts: 1, other: 0, line: null,
  },
  {
    name: 'goto-404', mode: 'status-404', nonce: 'vprobe-02', status: 500, puts: 0, other: 0, line: 'error-status',
  },
  {
    name: 'goto-500', mode: 'status-500', nonce: 'vprobe-03', status: 500, puts: 0, other: 0, line: 'error-status',
  },
  {
    name: 'goto-300', mode: 'status-300', nonce: 'vprobe-04', status: 500, puts: 0, other: 0, line: 'error-status',
  },
  {
    name: 'goto-204', mode: 'status-204', nonce: 'vprobe-09', status: 500, puts: 0, other: 0, line: 'goto-rejected',
  },
  {
    name: 'goto-299', mode: 'status-299', nonce: 'vprobe-10', status: 204, puts: 1, other: 0, line: null,
  },
  {
    name: 'goto-null', mode: 'goto-null', nonce: 'vprobe-11', status: 500, puts: 0, other: 0, line: 'error-status',
  },
  {
    name: 'goto-199', mode: 'goto-199', nonce: 'vprobe-12', status: 500, puts: 0, other: 0, line: 'error-status',
  },
  {
    name: 'setup-rejects', mode: 'ok', nonce: 'vprobe-13', status: 500, puts: 0, other: 0, line: null, flag: true, errorLine: true,
  },
  {
    name: 'goto-reset', mode: 'reset', nonce: 'vprobe-05', status: 500, puts: 0, other: 0, line: 'goto-rejected',
  },
  {
    name: 'screenshot', mode: 'screenshot', nonce: 'vprobe-06', status: 500, puts: 0, other: 0, line: 'screenshot',
  },
  {
    name: 'put', mode: 'ok', nonce: 'vprobe-nfail', status: 500, putsAtLeast: 1, other: 0, line: 'put', putOk: false,
  },
  ...(quick ? [] : [{
    name: 'goto-hang', mode: 'hang', nonce: 'vprobe-08', status: 500, puts: 0, other: 0, line: 'goto-rejected', slow: true,
  }]),
];

const results = [];
const ready = await waitFor(() => lines.some((l) => l.includes('Server running at')), 120000);
if (!ready) {
  console.log('generator did not start', lines.slice(-10));
  await stopAll();
  process.exit(1);
}

for (const c of cases) {
  const s3From = s3.log.length;
  const linesFrom = lines.length;
  const body = JSON.stringify({ id: '42', nonce: c.nonce, message: { mode: c.mode, marker: MARKER } });
  if (c.flag) writeFileSync(`${outDir}/viewport-fail.flag`, '');
  const answer = await post(body);
  if (c.flag) rmSync(`${outDir}/viewport-fail.flag`, { force: true });
  await sleep(500);
  const s3Seen = s3.log.slice(s3From);
  const seen = lines.slice(linesFrom);
  const failureLines = seen.filter((l) => l.startsWith('preview-image-failure'));
  const puts = s3Seen.filter((e) => e.kind === 'put');
  const others = s3Seen.filter((e) => e.kind !== 'put');
  const reasons = [];
  if (answer.status !== c.status) reasons.push(`status ${answer.status}, want ${c.status}`);
  if (c.puts !== undefined && puts.length !== c.puts) reasons.push(`${puts.length} puts, want ${c.puts}`);
  if (c.putsAtLeast !== undefined && puts.length < c.putsAtLeast) reasons.push(`${puts.length} puts, want at least ${c.putsAtLeast}`);
  if (others.length !== c.other) reasons.push(`${others.length} list/delete/other requests, want ${c.other}`);
  if (c.line === null && failureLines.length) reasons.push(`failure line written: ${failureLines.length}`);
  if (c.errorLine && !seen.some((l) => l.includes('shim: setViewport rejected'))) reasons.push('the generator logged no error for the setup failure');
  if (c.line !== null) {
    if (failureLines.length !== 1) reasons.push(`${failureLines.length} failure lines, want 1`);
    else if (!new RegExp(`^preview-image-failure id=42 class=${c.line} elapsedMs=\\d+$`).test(failureLines[0])) reasons.push(`line ${failureLines[0]}`);
  }
  if (failureLines.some((l) => l.includes(c.nonce) || l.includes(MARKER) || l.includes('previews/'))) reasons.push('line names nonce, content or key');
  if (c.status === 204) {
    const okLine = seen.find((l) => l.includes(`Generated image for message 42 with nonce ${c.nonce} in `));
    if (!okLine || !/in \d+ms$/.test(okLine)) reasons.push('no "Generated image for message … in <N>ms" line');
    const put = puts[0];
    if (!put || put.key !== `previews/42/${c.nonce}.jpeg` || put.type !== 'image/jpeg' || put.acl !== 'public-read') reasons.push(`put shape ${JSON.stringify(put)}`);
  }
  results.push({
    case: c.name, observed: { status: answer.status, ms: answer.ms, puts: puts.length, otherS3: others.map((e) => e.kind), failureLines }, verdict: reasons.length ? 'FAIL' : 'PASS', reasons,
  });
  console.log(`${reasons.length ? 'FAIL' : 'PASS'} ${c.name} status=${answer.status} puts=${puts.length} other=${others.map((e) => e.kind).join(',') || '-'} lines=${failureLines.length}${reasons.length ? ` :: ${reasons.join('; ')}` : ''}`);
}

const unchanged = [];
const bad = await post('not json');
unchanged.push({ case: 'bad body', want: 500, got: bad.status });
const wrongKey = await post(JSON.stringify({ id: '1', nonce: 'x', message: {} }), { auth: 'Bearer wrong' });
unchanged.push({ case: 'wrong key', want: 404, got: wrongKey.status });
const wrongPath = await post('{}', { path: '/other' });
unchanged.push({ case: 'wrong path', want: 404, got: wrongPath.status });
const wrongMethod = await post('{}', { method: 'GET' });
unchanged.push({ case: 'wrong method', want: 404, got: wrongMethod.status });
unchanged.forEach((u) => console.log(`${u.want === u.got ? 'PASS' : 'FAIL'} ${u.case} status=${u.got} want=${u.want}`));

const createdInstance = lines.filter((l) => l.includes('Created instance')).length;
const posts = lines.filter((l) => l.includes('POST /generate')).length;
console.log(`unchanged lines: Server running ${lines.filter((l) => l.includes('Server running at')).length}, Created instance ${createdInstance}, POST /generate ${posts}`);

await stopAll();
const closing = lines.filter((l) => l.includes('Server received') || l.includes('Drain complete'));
console.log(`closing lines: ${closing.length}`);
writeFileSync(`${outDir}/probe-result.json`, JSON.stringify({ results, unchanged, createdInstance, posts, closing, s3Log: s3.log, generatorLines: lines }, null, 1));
const failed = results.filter((r) => r.verdict === 'FAIL').length + unchanged.filter((u) => u.want !== u.got).length;
console.log(`cases ${results.length + unchanged.length}, failed ${failed}`);
process.exit(0);
