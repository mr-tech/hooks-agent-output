// Code review's M8 attack. Runs inside unshare -rn from an E-1 export's root (after tsc -b), beside the
// implementer's probe. Rows: OBS (observed values) and CELL (a fixed expectation). Oracle: plan M8-a P1/P3, M8-d.
const { fork } = require('child_process');
const http = require('http');
const path = require('path');

let port = 4060;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const BASE_ENV = (p) => ({
  PATH: process.env.PATH, HOME: process.env.HOME, ENV: 'development', SERVER_HOST: '127.0.0.1', SERVER_PORT: String(p),
  CDN_ENDPOINT: 'http://127.0.0.1:1', CDN_KEY: 'probe', CDN_SECRET: 'probe', CDN_BUCKET: 'probe',
  PREVIEW_ENDPOINT: 'http://127.0.0.1:1/preview', API_KEY: 'probe-key',
});
function start(execArgv = []) {
  port += 1;
  const child = fork('build/server.js', [], { env: BASE_ENV(port), silent: true, execArgv });
  const lines = [];
  const take = (d) => String(d).split('\n').filter(Boolean).forEach((l) => lines.push(l));
  child.stdout.on('data', take); child.stderr.on('data', take);
  const o = { child, lines, port, exit: null };
  o.ready = new Promise((resolve) => child.on('message', (m) => { if (m === 'ready') resolve(true); }));
  o.exited = new Promise((resolve) => child.on('exit', (code, sig) => { o.exit = { code, sig, at: Date.now() }; resolve(o.exit); }));
  return o;
}
const count = (o, re) => o.lines.filter((l) => re.test(l)).length;
const kill = async (o) => { if (o.exit === null) { o.child.kill('SIGKILL'); await o.exited; } };
function request(p, body) {
  return new Promise((resolve) => {
    const req = http.request({ host: '127.0.0.1', port: p, method: 'POST', path: '/generate', headers: { authorization: 'Bearer probe-key' } },
      (res) => { res.resume(); res.on('end', () => resolve(res.statusCode)); });
    req.on('error', (e) => resolve(`error:${e.code}`));
    req.setTimeout(30000, () => { req.destroy(); resolve('timeout'); });
    req.end(body);
  });
}
// A request whose body never ends: an in-flight request the drain must wait for.
function openRequest(p) {
  const req = http.request({ host: '127.0.0.1', port: p, method: 'POST', path: '/generate', headers: { authorization: 'Bearer probe-key' } });
  const o = { status: null };
  o.done = new Promise((resolve) => {
    req.on('response', (res) => { o.status = res.statusCode; res.resume(); res.on('end', resolve); });
    req.on('error', (e) => { o.status = `error:${e.code}`; resolve(); });
  });
  req.write('{"id":"x",');
  return o;
}
const BODY = JSON.stringify({ id: 'm1', nonce: 'n1', message: { content: 'hi' } });

(async () => {
  // A. Concurrency under launch failure, then idle: no storm.
  {
    const o = start(); await o.ready;
    const t = Date.now();
    const statuses = await Promise.all(Array.from({ length: 6 }, () => request(o.port, BODY)));
    const ms = Date.now() - t;
    const afterBurst = count(o, /Could not find Chrome|Failed to launch/);
    await sleep(3000);
    const afterIdle = count(o, /Could not find Chrome|Failed to launch/);
    console.log(`OBS A six concurrent failing requests: statuses=${JSON.stringify(statuses)} ms=${ms} launch-error lines after burst=${afterBurst} after 3 s idle=${afterIdle}`);
    console.log(`CELL ${statuses.every((s) => s === 500) ? 'PASS' : 'FAIL'} A every concurrent request gets 500`);
    console.log(`CELL ${afterIdle === afterBurst ? 'PASS' : 'FAIL'} A no launch attempts while idle after the burst`);
    await kill(o);
  }
  // B. Stop with an in-flight request, current runtime: the drain waits (bounded by the 10 s fallback).
  {
    const o = start(); await o.ready;
    const r = openRequest(o.port); await new Promise((res) => setTimeout(res, 200));
    const t = Date.now(); o.child.send('shutdown');
    await Promise.race([o.exited, new Promise((res) => setTimeout(res, 15000))]);
    const ms = o.exit ? o.exit.at - t : null;
    console.log(`OBS B in-flight request at stop: exit after ${ms} ms; Server received=${count(o, /Z Server received /)} Drain complete=${count(o, /Z Drain complete in \d+ms/)}; error lines=${count(o, /Error/)}`);
    await kill(o);
  }
  // C. Stop with an in-flight request, closeIdleConnections absent (a Node < 18.2 runtime).
  {
    const o = start(['-r', path.resolve('cr-no-close-idle.cjs')]); await o.ready;
    const r = openRequest(o.port); await new Promise((res) => setTimeout(res, 200));
    const t = Date.now(); o.child.send('shutdown');
    await Promise.race([o.exited, new Promise((res) => setTimeout(res, 15000))]);
    const ms = o.exit ? o.exit.at - t : null;
    const drained = o.lines.filter((l) => /Z Drain complete in \d+ms/.test(l));
    const errors = o.lines.filter((l) => /TypeError/.test(l));
    console.log(`OBS C without closeIdleConnections: exit after ${ms} ms; Drain complete lines=${JSON.stringify(drained)}; TypeError lines=${JSON.stringify(errors.slice(0, 1))}`);
    console.log(`CELL ${drained.length === 1 && errors.length > 0 ? 'FAIL' : 'PASS'} C a failed drain does not log the drain-complete line`);
    await kill(o);
  }
})().catch((e) => { console.log(`ATTACK ERROR ${e && e.stack}`); process.exitCode = 1; });
