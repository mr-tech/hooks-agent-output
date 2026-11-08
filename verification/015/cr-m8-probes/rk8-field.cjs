// RK-8 falsity-signature probe. Runs inside unshare -rn from an E-1 export's root. One server, one /generate whose
// browser launch fails (no Chrome in E-1). Records status (or timeout at 15 s), whether the process exited and how, and
// the lines naming an unhandled rejection or a TypeError. Run on the unmodified export (control) and on a copy whose
// build/getPool.js reads a renamed private field (mutant; the runner records the read-back line).
const { fork } = require('child_process');
const http = require('http');
const env = { PATH: process.env.PATH, HOME: process.env.HOME, ENV: 'development', SERVER_HOST: '127.0.0.1', SERVER_PORT: '4161',
  CDN_ENDPOINT: 'http://127.0.0.1:1', CDN_KEY: 'probe', CDN_SECRET: 'probe', CDN_BUCKET: 'probe',
  PREVIEW_ENDPOINT: 'http://127.0.0.1:1/preview', API_KEY: 'probe-key' };
const child = fork('build/server.js', [], { env, silent: true });
const lines = [];
const take = (d) => String(d).split('\n').filter(Boolean).forEach((l) => lines.push(l));
child.stdout.on('data', take); child.stderr.on('data', take);
let exit = null; const t0 = Date.now();
child.on('exit', (code, sig) => { exit = { code, sig, ms: Date.now() - t0 }; });
child.on('message', (m) => {
  if (m !== 'ready') return;
  const req = http.request({ host: '127.0.0.1', port: 4161, method: 'POST', path: '/generate', headers: { authorization: 'Bearer probe-key' } },
    (res) => { res.resume(); res.on('end', () => done(`status ${res.statusCode}`)); });
  req.on('error', (e) => done(`error:${e.code}`));
  req.setTimeout(15000, () => { req.destroy(); done('timeout 15 s (pending)'); });
  req.end('{"id":"m","nonce":"n","message":{}}');
});
let finished = false;
function done(r) {
  if (finished) return; finished = true;
  setTimeout(() => {
    console.log(`RESULT request: ${r}; process: ${exit ? `exited ${JSON.stringify(exit)}` : 'alive'}`);
    lines.filter((l) => /TypeError|Unhandled|unhandled|dequeue/.test(l)).slice(0, 4).forEach((l) => console.log(`    | ${l.slice(0, 140)}`));
    if (!exit) child.kill('SIGKILL');
  }, 1000);
}
