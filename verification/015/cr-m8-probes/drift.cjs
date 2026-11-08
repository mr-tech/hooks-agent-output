// D36 drift probe. Runs inside unshare -rn from an E-1 export's root (m8-local-probe/run.sh), where puppeteer has no
// browser, so every launch fails fast. One server, one /generate. Two independent launch-attempt counts:
// (1) the preload drift-launch-count.cjs wraps puppeteer.launch and reports its call count over IPC every 250 ms;
// (2) stderr lines starting "Error: Could not find Chrome", which factory.create's console.error writes once per failure.
// Records: the stream carrying the guard line and whether it precedes "ready"; the request outcome (status, or pending at
// the 15 s cut; the status is decided by the S3 delete leg of generateImage's Promise.all, which fails fast on the dead
// CDN port, so it does not show whether the acquire is still waiting: the pool's pending count, from the preload, does); attempts in the 3 s after the request; the process state at the end. Control: the unmodified export.
// Mutant: a copy whose node_modules/generic-pool/lib/Pool.js has _waitingClientsQueue renamed (the runner reads it back).
const { fork } = require('child_process');
const http = require('http');
const env = { PATH: process.env.PATH, HOME: process.env.HOME, ENV: 'development', SERVER_HOST: '127.0.0.1', SERVER_PORT: '4162',
  CDN_ENDPOINT: 'http://127.0.0.1:1', CDN_KEY: 'probe', CDN_SECRET: 'probe', CDN_BUCKET: 'probe',
  PREVIEW_ENDPOINT: 'http://127.0.0.1:1/preview', API_KEY: 'probe-key' };
const child = fork('build/server.js', [], { env, silent: true, execArgv: ['-r', './cr-drift-launch-count.cjs'] });
const out = []; const err = []; let ready = false; let launches = 0; let snap = { pending: null, size: null, t: 0 }; let errBuf = '';
const GUARD = /generic-pool no longer exposes/;
child.stdout.on('data', (d) => String(d).split('\n').filter(Boolean).forEach((l) => out.push({ l, ready })));
child.stderr.on('data', (d) => { errBuf += String(d); const parts = errBuf.split('\n'); errBuf = parts.pop(); parts.filter(Boolean).forEach((l) => err.push({ l, ready })); });
let exit = null; const t0 = Date.now();
child.on('exit', (code, sig) => { exit = { code, sig, ms: Date.now() - t0 }; });
const chromeErrs = () => err.filter((e) => /^Error: Could not find Chrome/.test(e.l)).length;
let reqAt = 0; let atReq = null; let at3s = null; let result = null;
child.on('message', (m) => {
  if (m && typeof m === 'object' && 'launches' in m) { launches = m.launches; snap = m; return; }
  if (m !== 'ready') return;
  ready = true;
  reqAt = Date.now(); atReq = { launches, chrome: chromeErrs() };
  setTimeout(() => { at3s = { launches, chrome: chromeErrs(), pending: snap.pending, size: snap.size, age: Date.now() - snap.t }; }, 3000);
  const req = http.request({ host: '127.0.0.1', port: 4162, method: 'POST', path: '/generate', headers: { authorization: 'Bearer probe-key' } },
    (res) => { res.resume(); res.on('end', () => { result = `status ${res.statusCode} after ${Date.now() - reqAt} ms`; }); });
  req.on('error', (e) => { result = `error:${e.code} after ${Date.now() - reqAt} ms`; });
  req.setTimeout(15000, () => { req.destroy(); result = result || 'pending at the 15 s cut'; });
  req.end('{"id":"m","nonce":"n","message":{}}');
  setTimeout(report, 16000);
});
setTimeout(() => { if (!ready) report(); }, 30000);
function report() {
  const guardOut = out.filter((e) => GUARD.test(e.l)); const guardErr = err.filter((e) => GUARD.test(e.l));
  console.log(`GUARD stdout=${guardOut.length} stderr=${guardErr.length} beforeReady=${[...guardOut, ...guardErr].every((e) => !e.ready)}`);
  console.log(`REQUEST ${result || 'no result recorded'}`);
  console.log(`LAUNCH preload: atRequest=${atReq && atReq.launches} at3s=${at3s && at3s.launches} atEnd=${launches}`);
  console.log(`LAUNCH stderr-chrome: atRequest=${atReq && atReq.chrome} at3s=${at3s && at3s.chrome} atEnd=${chromeErrs()}`);
  console.log(`DELTA3S preload=${at3s && atReq ? at3s.launches - atReq.launches : 'n/a'} stderr-chrome=${at3s && atReq ? at3s.chrome - atReq.chrome : 'n/a'}`);
  console.log(`POOL at3s pending=${at3s && at3s.pending} size=${at3s && at3s.size} (snapshot age ${at3s && at3s.age} ms); atEnd pending=${snap.pending} size=${snap.size} (age ${Date.now() - snap.t} ms)`);
  console.log(`PROCESS ${exit ? `exited ${JSON.stringify(exit)}` : 'alive at end'}`);
  console.log(`LINES stdout=${out.length} stderr=${err.length}`);
  [...guardErr, ...guardOut].slice(0, 1).forEach((e) => console.log(`    | ${e.l.slice(0, 160)}`));
  err.filter((e) => /TypeError|Unhandled/.test(e.l)).slice(0, 2).forEach((e) => console.log(`    | ${e.l.slice(0, 160)}`));
  err.filter((e) => /^Error: Could not find Chrome/.test(e.l)).length < 10 && err.filter((e) => /^Error: Could not find Chrome/.test(e.l)).forEach((e) => console.log(`    chrome-line ready=${e.ready} | ${e.l.slice(0, 100)}`));
  if (!exit) child.kill('SIGKILL');
  setTimeout(() => process.exit(0), 200);
}
