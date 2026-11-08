// QA probe for M8-b (chain 015, plan rev 27 D35). Runs inside unshare -rn, from the export's root, after tsc -b,
// beside obs-preload.cjs. One fresh server per body. Each refused member must get 500, keep the process serving, and
// attempt no S3 call: zero `OBS connect *:1` lines between the request and its response. The rig cannot tell refusal
// from failure by status alone, because an unrefused body also gets 500 here (no browser, S3 unreachable). The object
// control must show at least one S3 connect, or no refused cell is read. Arrays are X-23, a stated limit: they are
// printed as INFO and never asserted in either direction.
const { fork } = require('child_process');
const http = require('http');
const path = require('path');

let port = 4060;
const cells = [];
const cell = (name, ok, detail) => { cells.push([name, ok]); console.log(`CELL ${ok ? 'PASS' : 'FAIL'} ${name}${detail ? ` -- ${detail}` : ''}`); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ENV = (p) => ({
  PATH: process.env.PATH, HOME: process.env.HOME, ENV: 'development', SERVER_HOST: '127.0.0.1', SERVER_PORT: String(p),
  CDN_ENDPOINT: 'http://127.0.0.1:1', CDN_KEY: 'probe', CDN_SECRET: 'probe', CDN_BUCKET: 'probe',
  PREVIEW_ENDPOINT: 'http://127.0.0.1:1/preview', API_KEY: 'probe-key',
});

function start() {
  port += 1;
  const child = fork('build/server.js', [], { env: ENV(port), silent: true, execArgv: ['-r', path.resolve('obs-preload.cjs')] });
  const lines = [];
  const take = (d) => String(d).split('\n').filter(Boolean).forEach((l) => lines.push(l));
  child.stdout.on('data', take); child.stderr.on('data', take);
  const o = { child, lines, port, exit: null };
  o.ready = new Promise((resolve) => child.on('message', (m) => { if (m === 'ready') resolve(true); }));
  o.exited = new Promise((resolve) => child.on('exit', (code, sig) => { o.exit = { code, sig }; resolve(o.exit); }));
  return o;
}
function request(p, { method = 'POST', path: u = '/generate', auth = 'Bearer probe-key', body = '' } = {}) {
  return new Promise((resolve) => {
    const req = http.request({ host: '127.0.0.1', port: p, method, path: u, headers: auth ? { authorization: auth } : {} }, (res) => { res.resume(); res.on('end', () => resolve(res.statusCode)); });
    req.on('error', (e) => resolve(`error:${e.code}`));
    req.setTimeout(30000, () => { req.destroy(); resolve('timeout'); });
    req.end(body);
  });
}
const s3 = (lines) => lines.filter((l) => /^OBS connect [^ ]*:1$/.test(l)).length;

async function run(body) {
  const o = start();
  const ready = await Promise.race([o.ready, sleep(15000).then(() => false)]);
  if (!ready) { o.child.kill('SIGKILL'); return { ready: false }; }
  const mark = o.lines.length;
  const st = await request(o.port, { body });
  await sleep(1500); // let a delete started alongside a failed launch reach its connect
  const conns = s3(o.lines.slice(mark));
  const after = o.exit === null ? await request(o.port, { method: 'GET', path: '/x' }) : 'exited';
  const exited = o.exit;
  if (o.exit === null) { o.child.kill('SIGKILL'); await o.exited; }
  return { ready: true, st, conns, after, exited };
}

(async () => {
  // Observer liveness: the preload must see a connect the probe itself causes in a child. Checked by the control below.
  const control = await run(JSON.stringify({ id: 'qa-ctl', nonce: 'n', message: {} }));
  const live = control.ready && control.conns >= 1;
  cell('control: an object body with an id attempts S3 (observer live)', live, JSON.stringify(control));
  if (!live) { console.log('OBSERVER NOT LIVE, no refused cell read'); console.log(`SUMMARY ${cells.filter((c) => c[1]).length}/${cells.length} pass`); process.exit(3); }
  for (const [name, body] of [['unparsable', '{not json'], ['null', 'null'], ['a number', '5'], ['a string', '"x"'], ['a boolean', 'true'], ['a boolean false', 'false']]) {
    const r = await run(body);
    cell(`M8-b ${name}: 500, no S3 call, process keeps serving`, r.ready && r.st === 500 && r.conns === 0 && r.after === 404 && r.exited === null, JSON.stringify(r));
  }
  for (const [name, body] of [['[]', '[]'], ['[{}]', '[{}]']]) {
    const r = await run(body);
    console.log(`INFO X-23 array ${name} (stated limit, not asserted): ${JSON.stringify(r)}`);
  }
  console.log(`SUMMARY ${cells.filter((c) => c[1]).length}/${cells.length} pass`);
  process.exit(cells.every((c) => c[1]) ? 0 : 1);
})();
