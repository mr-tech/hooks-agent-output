// QA Phase 2 cells for M8-a (preview-image-generator), chain 015. Runs inside unshare -rn with lo up, from the root of an
// E-1 export (build/ compiled, node_modules installed, no .env), like probe.cjs. Three properties whose probe.cjs cells
// cannot fail under a mutant of the guard they name (QA's sweep qa-m8r-8de2b53):
//  P1 idempotent: the second trigger arrives while the drain is HELD (an in-flight /generate whose body never ends keeps
//     server.close waiting), so a missing once-only guard shows as a second "Server received" line. Liveness: no
//     drain-complete line has appeared when the second trigger is sent.
//  P3 idle: launches are counted by a preload wrapping puppeteer's launch (the shape of code review's
//     cr-m8-probes/drift-launch-count.cjs), not by "Created instance" lines, which never appear without a browser.
//     Positive control: the same preload counts > 0 launches for a process that served one /generate.
//  P4 SIGINT: a SIGINT sent in the tick the ready message arrives is handled (the message path is buffered by Node's IPC
//     channel until a listener exists, so only the signal path can show a late registration).
const { fork } = require('child_process');
const http = require('http');
const net = require('net');
const fs = require('fs');
const path = require('path');

let port = 4060;
const cells = [];
const cell = (name, ok, detail) => { cells.push([name, ok]); console.log(`CELL ${ok ? 'PASS' : 'FAIL'} ${name}${detail ? ` -- ${detail}` : ''}`); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const PRELOAD = path.resolve('probe-m8a-launch-count.cjs');
fs.writeFileSync(PRELOAD, `const Module = require('module'); const origLoad = Module._load; let wrapped = false;
Module._load = function load(request, ...rest) {
  const m = origLoad.call(this, request, ...rest);
  if (request === 'puppeteer' && !wrapped) {
    wrapped = true;
    const target = m.default && m.default.launch ? m.default : m;
    const orig = target.launch.bind(target);
    target.launch = (...a) => { process.stderr.write('PROBE-LAUNCH\\n'); return orig(...a); };
    if (m.launch && m !== target) m.launch = target.launch;
  }
  return m;
};
`);

function start(execArgv = []) {
  port += 1;
  const env = {
    PATH: process.env.PATH, HOME: process.env.HOME, ENV: 'development', SERVER_HOST: '127.0.0.1', SERVER_PORT: String(port),
    CDN_ENDPOINT: 'http://127.0.0.1:1', CDN_KEY: 'probe', CDN_SECRET: 'probe', CDN_BUCKET: 'probe',
    PREVIEW_ENDPOINT: 'http://127.0.0.1:1/preview', API_KEY: 'probe-key',
  };
  const child = fork('build/server.js', [], { env, silent: true, execArgv });
  const lines = [];
  const take = (d) => String(d).split('\n').filter(Boolean).forEach((l) => lines.push(l));
  child.stdout.on('data', take); child.stderr.on('data', take);
  const o = { child, lines, port, exit: null };
  o.ready = new Promise((resolve) => child.on('message', (m) => { if (m === 'ready') resolve(true); }));
  o.exited = new Promise((resolve) => child.on('exit', (code, sig) => { o.exit = { code, sig }; resolve(o.exit); }));
  return o;
}
const waitExit = (o, ms) => Promise.race([o.exited, sleep(ms).then(() => null)]);
const stop = async (o) => { if (o.exit === null) { o.child.kill('SIGKILL'); await o.exited; } };
const count = (o, re) => o.lines.filter((l) => re.test(l)).length;
const RECEIVED = /Z Server received /;
const DRAINED = /Z Drain complete in \d+ms/;
const LAUNCH = /^PROBE-LAUNCH$/;

(async () => {
  const ext = await new Promise((resolve) => require('dns').lookup('example.com', (e) => resolve(e ? e.code : 'RESOLVED')));
  console.log(`self-check: external lookup ${ext}`);
  if (ext === 'RESOLVED') { console.log('SELF-CHECK FAILED, no cell read'); process.exit(9); }

  // P1 idempotent under a held drain.
  {
    const o = start(); await o.ready;
    const sock = net.connect(o.port, '127.0.0.1');
    await new Promise((r) => sock.on('connect', r));
    sock.write('POST /generate HTTP/1.1\r\nHost: 127.0.0.1\r\nAuthorization: Bearer probe-key\r\nContent-Length: 1000\r\n\r\n{');
    await sleep(300);
    o.child.send('shutdown');
    await sleep(500);
    const atSecond = { drained: count(o, DRAINED), exited: o.exit };
    const heldAtSecond = atSecond.drained === 0 && atSecond.exited === null;
    o.child.kill('SIGINT');
    await sleep(500);
    const received = count(o, RECEIVED);
    sock.destroy();
    const ex = await waitExit(o, 12000);
    cell('P1 idempotent (held drain) liveness: the drain is still held when the second trigger is sent', heldAtSecond, JSON.stringify(atSecond));
    cell('P1 idempotent (held drain): a shutdown message then SIGINT give one "Server received" line, then exit 0', heldAtSecond && received === 1 && !!ex && ex.code === 0, JSON.stringify({ received, ex, lines: o.lines.filter((l) => /Server received/.test(l)).length }));
    await stop(o);
  }

  // P3 idle: no launch at stop; positive control first.
  {
    const o = start(['-r', PRELOAD]); await o.ready;
    const st = await new Promise((resolve) => {
      const req = http.request({ host: '127.0.0.1', port: o.port, method: 'POST', path: '/generate', headers: { authorization: 'Bearer probe-key' } },
        (res) => { res.resume(); res.on('end', () => resolve(res.statusCode)); });
      req.on('error', (e) => resolve(`error:${e.code}`)); req.end(JSON.stringify({ id: 'c1', nonce: 'n', message: {} }));
    });
    await sleep(500);
    cell('P3 launch counter control: a process that served one /generate shows launches', count(o, LAUNCH) > 0, JSON.stringify({ st, launches: count(o, LAUNCH) }));
    await stop(o);
  }
  {
    const o = start(['-r', PRELOAD]); await o.ready;
    o.child.send('shutdown');
    const ex = await waitExit(o, 12000);
    cell('P3 idle: a process that served no request launches no browser at stop', !!ex && ex.code === 0 && count(o, LAUNCH) === 0, JSON.stringify({ ex, launches: count(o, LAUNCH) }));
    await stop(o);
  }

  // P4: SIGINT in the tick the ready message arrives.
  {
    const o = start();
    o.child.on('message', (m) => { if (m === 'ready') o.child.kill('SIGINT'); });
    const ex = await waitExit(o, 15000);
    cell('P4: a SIGINT sent in the tick the ready message arrives is handled (one "Server received SIGINT" line, exit 0)', !!ex && ex.code === 0 && o.lines.some((l) => /Server received SIGINT/.test(l)), JSON.stringify({ ex, received: count(o, RECEIVED) }));
    await stop(o);
  }

  console.log(`SUMMARY cells=${cells.length} failed=${cells.filter(([, ok]) => !ok).length}`);
  process.exit(0);
})();
