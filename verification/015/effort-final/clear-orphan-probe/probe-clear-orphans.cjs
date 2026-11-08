// QA effort-final probe (preview-image-generator): Chromium left behind after a stop.
// Run from an E-1 export root containing build/ (control or mutated). Usage: node probe-clear-orphans.cjs <mode>
// mode = shutdown (the M8-a stop path) | sigkill (positive control: no exit handlers run, so Chrome must remain).
// Prints the count of new chrome processes (by name, against a baseline taken at start), after one browser
// launch, and 3 s after the server exits; then kills any left so runs do not leak.
const { fork, execSync } = require('child_process');
const http = require('http');
const mode = process.argv[2];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// Chrome is identified by exact process name (pgrep -x), never by command-line text, and only PIDs that appear after
// the run's own baseline are counted or killed, so no other session's browser is touched.
const pids = () => execSync('pgrep -x chrome || true').toString().split('\n').filter(Boolean);
let base = [];
const chrome = () => pids().filter((x) => !base.includes(x)).length;
const env = { PATH: process.env.PATH, HOME: process.env.HOME, PUPPETEER_EXECUTABLE_PATH: '/usr/bin/google-chrome', ENV: 'development', SERVER_HOST: '127.0.0.1', SERVER_PORT: '4199',
  CDN_ENDPOINT: 'http://127.0.0.1:1', CDN_KEY: 'probe', CDN_SECRET: 'probe', CDN_BUCKET: 'probe',
  PREVIEW_ENDPOINT: 'http://127.0.0.1:1/preview', API_KEY: 'probe-key' };
(async () => {
  base = pids();
  console.log(`MODE ${mode} baseline=${base.length}`);
  const child = fork('build/server.js', [], { env, silent: true });
  const lines = []; const take = (d) => String(d).split('\n').filter(Boolean).forEach((l) => lines.push(l));
  child.stdout.on('data', take); child.stderr.on('data', take);
  const exited = new Promise((r) => child.on('exit', (code, sig) => r({ code, sig })));
  await new Promise((r) => child.on('message', (m) => { if (m === 'ready') r(); }));
  const st = await new Promise((resolve) => {
    const req = http.request({ host: '127.0.0.1', port: 4199, method: 'POST', path: '/generate', headers: { authorization: 'Bearer probe-key' } },
      (res) => { res.resume(); res.on('end', () => resolve(res.statusCode)); });
    req.on('error', (e) => resolve(`error:${e.code}`)); req.end(JSON.stringify({ id: 'p', nonce: 'n', message: { content: 'hi' } }));
  });
  for (let i = 0; i < 150 && !lines.some((l) => l.startsWith('Created instance')); i += 1) await sleep(100);
  await sleep(500);
  const created = lines.filter((l) => l.startsWith('Created instance')).length;
  console.log(`REQUEST status=${st} createdLines=${created} afterLaunch=${chrome()}`);
  if (mode === 'sigkill') child.kill('SIGKILL'); else child.send('shutdown');
  const ex = await exited; await sleep(3000);
  const left = chrome();
  console.log(`EXIT ${JSON.stringify(ex)} after3s=${left}`);
  console.log(lines.filter((l) => /Drain|Server received/.test(l)).join('\n'));
  for (const x of pids().filter((y) => !base.includes(y))) { try { process.kill(Number(x), 'SIGKILL'); } catch {} }
  await sleep(300);
  console.log(`CLEANUP remaining=${chrome()}`);
})();
