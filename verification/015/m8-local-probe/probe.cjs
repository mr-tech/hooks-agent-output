// Local probe for M8 (preview-image-generator). Runs inside unshare -rn, from the export's root, after tsc -b.
const { fork, spawnSync } = require('child_process');
const http = require('http');
const dns = require('dns');

let port = 3960;
const cells = [];
const cell = (name, ok, detail) => { cells.push([name, ok]); console.log(`CELL ${ok ? 'PASS' : 'FAIL'} ${name}${detail ? ` -- ${detail}` : ''}`); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const BASE_ENV = (p) => ({
  PATH: process.env.PATH, HOME: process.env.HOME, ENV: 'development', SERVER_HOST: '127.0.0.1', SERVER_PORT: String(p),
  CDN_ENDPOINT: 'http://127.0.0.1:1', CDN_KEY: 'probe', CDN_SECRET: 'probe', CDN_BUCKET: 'probe',
  PREVIEW_ENDPOINT: 'http://127.0.0.1:1/preview', API_KEY: 'probe-key',
});

function start(overrides = {}) {
  port += 1;
  const env = { ...BASE_ENV(port), ...overrides };
  for (const k of Object.keys(env)) if (env[k] === undefined) delete env[k];
  const child = fork('build/server.js', [], { env, silent: true });
  const lines = [];
  const take = (d) => String(d).split('\n').filter(Boolean).forEach((l) => lines.push(l));
  child.stdout.on('data', take); child.stderr.on('data', take);
  const o = { child, lines, port, readyAt: null, exit: null };
  o.ready = new Promise((resolve) => child.on('message', (m) => { if (m === 'ready') { o.readyAt = Date.now(); resolve(true); } }));
  o.exited = new Promise((resolve) => child.on('exit', (code, sig) => { o.exit = { code, sig, at: Date.now() }; resolve(o.exit); }));
  return o;
}
const waitExit = (o, ms) => Promise.race([o.exited, sleep(ms).then(() => null)]);
const stop = async (o) => { if (o.exit === null) { o.child.kill('SIGKILL'); await o.exited; } };

function request(p, { method = 'POST', path = '/generate', auth = 'Bearer probe-key', body = '' } = {}) {
  return new Promise((resolve) => {
    const headers = auth ? { authorization: auth } : {};
    const req = http.request({ host: '127.0.0.1', port: p, method, path, headers }, (res) => { res.resume(); res.on('end', () => resolve(res.statusCode)); });
    req.on('error', (e) => resolve(`error:${e.code}`));
    req.setTimeout(30000, () => { req.destroy(); resolve('timeout'); });
    req.end(body);
  });
}
const count = (o, re) => o.lines.filter((l) => re.test(l)).length;
const SERVER_RECEIVED = /Z Server received /;
const DRAINED = /Z Drain complete in \d+ms/;

(async () => {
  // Self-check before any cell is read (E-1).
  const lo = await new Promise((resolve) => {
    const srv = http.createServer((q, r) => r.end('ok')).listen(3959, '127.0.0.1', () => {
      http.get('http://127.0.0.1:3959/', (r) => { r.resume(); r.on('end', () => { srv.close(); resolve(r.statusCode); }); }).on('error', (e) => { srv.close(); resolve(e.code); });
    });
  });
  const ext = await new Promise((resolve) => dns.lookup('example.com', (e) => resolve(e ? e.code : 'RESOLVED')));
  console.log(`self-check: loopback GET ${lo}; external lookup ${ext}`);
  if (lo !== 200 || ext === 'RESOLVED') { console.log('SELF-CHECK FAILED, no cell read'); process.exit(9); }

  // M8-e
  for (const [name, v] of [['unset', undefined], ['empty', '']]) {
    const o = start({ API_KEY: v });
    const ex = await waitExit(o, 8000);
    cell(`M8-e API_KEY ${name}: refuses to start, exit code 2, a line names API_KEY`, !!ex && ex.code === 2 && o.lines.some((l) => /API_KEY/.test(l)), JSON.stringify({ exit: ex && ex.code, lines: o.lines.slice(0, 2) }));
    await stop(o);
  }
  {
    const o = start(); const ready = await Promise.race([o.ready, sleep(15000).then(() => false)]);
    cell('M8-e control: API_KEY set starts and sends ready', ready === true);
    cell('control: a request without the key gets 404', (await request(o.port, { auth: null })) === 404);
    cell('control: a request with an empty Bearer gets 404 (the key is set)', (await request(o.port, { auth: 'Bearer ' })) === 404);

    // M8-b
    for (const [name, body] of [['unparsable', '{not json'], ['the JSON null', 'null'], ['a JSON number', '5']]) {
      const st = await request(o.port, { body });
      const after = await request(o.port, { method: 'GET', path: '/x', auth: null });
      cell(`M8-b body ${name}: 500, process keeps serving`, st === 500 && after === 404 && o.exit === null, JSON.stringify({ st, after, exited: o.exit }));
    }
    // M8-d at server level, twice, and no unhandled rejection / TypeError crash (S3 is refused too)
    const t0 = Date.now();
    const a = await request(o.port, { body: JSON.stringify({ id: 'm1', nonce: 'n1', message: {} }) });
    const b = await request(o.port, { body: JSON.stringify({ id: 'm2', nonce: 'n2', message: {} }) });
    cell('M8-d/M8-c server level: two failing generate requests get 500, process alive', a === 500 && b === 500 && o.exit === null, JSON.stringify({ a, b, ms: Date.now() - t0, exited: o.exit }));
    cell('M8-d: no "Cannot read properties" in the log after those requests', count(o, /Cannot read properties of (null|undefined)/) === 0, `${count(o, /Cannot read properties/)} lines`);
    cell('M8-c: no unhandled-rejection line in the log', count(o, /unhandled|Unhandled/) === 0);
    await stop(o);
  }

  // P1 (idle process: no pool, no browser), P2, P3, P4
  {
    const o = start(); await o.ready;
    o.child.send('shutdown'); const sent = Date.now();
    const ex = await waitExit(o, 12000);
    cell('P1 shutdown message: exit code 0', !!ex && ex.code === 0, JSON.stringify(ex));
    cell('P1: exactly one "Server received" line, naming the trigger', count(o, SERVER_RECEIVED) === 1 && o.lines.some((l) => /Server received shutdown message/.test(l)), o.lines.filter((l) => /Server received/.test(l)).join(' | '));
    cell('P1: exactly one drain-complete line with an elapsed figure', count(o, DRAINED) === 1, o.lines.filter((l) => /Drain complete/.test(l)).join(' | '));
    cell('P1 predicate: the ready line "Server running at" is not a member', count(o, /Server running at/) === 1 && count(o, SERVER_RECEIVED) === 1);
    cell('P3 idle: exits well before the 10 s fallback and launches no browser', !!ex && ex.at - sent < 3000 && count(o, /Created instance/) === 0, `${ex ? ex.at - sent : 'n/a'} ms; Created instance lines ${count(o, /Created instance/)}`);
    await stop(o);
  }
  {
    const o = start(); await o.ready;
    o.child.send('shutdown'); o.child.kill('SIGINT');
    const ex = await waitExit(o, 12000);
    cell('P1 idempotent: shutdown message then SIGINT gives one "Server received" line and exit 0', count(o, SERVER_RECEIVED) === 1 && !!ex && ex.code === 0, o.lines.filter((l) => /Server received/.test(l)).join(' | '));
    await stop(o);
  }
  {
    const o = start(); await o.ready;
    o.child.kill('SIGINT');
    const ex = await waitExit(o, 12000);
    cell('P1 SIGINT alone: one "Server received" line naming SIGINT, exit 0', count(o, SERVER_RECEIVED) === 1 && o.lines.some((l) => /Server received SIGINT/.test(l)) && !!ex && ex.code === 0);
    await stop(o);
  }
  {
    const o = start();
    o.child.on('message', (m) => { if (m === 'ready') o.child.send('shutdown'); });
    const ex = await waitExit(o, 15000);
    cell('P4: a shutdown message sent in the tick the ready message arrives is handled', !!ex && ex.code === 0 && count(o, SERVER_RECEIVED) === 1, JSON.stringify({ ex, received: count(o, SERVER_RECEIVED) }));
    await stop(o);
  }
  {
    process.env.DEPLOY_NAME = 'probe';
    const cfg = require('./ecosystem.config.js').apps[0];
    cell('P2: ecosystem states kill_timeout 12000 and shutdown_with_message true', cfg.kill_timeout === 12000 && cfg.shutdown_with_message === true, JSON.stringify({ kill_timeout: cfg.kill_timeout, shutdown_with_message: cfg.shutdown_with_message }));
  }

  // M8-d at pool level: no Chromium is installed, so a launch fails.
  {
    const r = spawnSync('node', ['-e', `
      const p = require('./build/getPool').default();
      let creates = 0; p.on('factoryCreateError', () => { creates += 1; });
      const t0 = Date.now();
      p.use(async () => 'used').then((v) => console.log('RESULT resolved ' + JSON.stringify(v)), (e) => console.log('RESULT rejected ' + e.constructor.name + ': ' + String(e.message).split('\\n')[0].slice(0, 90)))
        .then(() => new Promise((r) => setTimeout(r, 2000))).then(() => { console.log('SUMMARY creates=' + creates + ' pending=' + p.pending + ' ms=' + (Date.now() - t0)); process.exit(0); });
    `], { env: { PATH: process.env.PATH, HOME: process.env.HOME }, encoding: 'utf8', timeout: 60000 });
    const out = r.stdout || '';
    const result = (out.match(/RESULT .*/) || [''])[0];
    const summary = (out.match(/SUMMARY .*/) || [''])[0];
    const creates = Number((summary.match(/creates=(\d+)/) || [0, 1e9])[1]);
    cell('M8-d pool: a launch failure rejects the request with the launch error, not a TypeError', /rejected/.test(result) && !/Cannot read properties|TypeError/.test(result), result);
    cell('M8-d pool: no creation retry storm and nothing left pending', creates <= 5 && /pending=0/.test(summary), summary);
  }

  // M8-c with a real browser: separate process, pages counted.
  const pg = spawnSync('node', ['probe-pages.cjs'], { env: { PATH: process.env.PATH, HOME: process.env.HOME, PUPPETEER_EXECUTABLE_PATH: process.env.PROBE_BROWSER || '/usr/bin/google-chrome', ...BASE_ENV(3990) }, encoding: 'utf8', timeout: 120000 });
  process.stdout.write((pg.stdout || '').split('\n').filter((l) => l.startsWith('CELL ') || l.startsWith('INFO ')).join('\n') + '\n');
  for (const l of (pg.stdout || '').split('\n')) { const m = /^CELL (PASS|FAIL) (.*)$/.exec(l); if (m) cells.push([m[2], m[1] === 'PASS']); }

  const failed = cells.filter(([, ok]) => !ok).length;
  console.log(`SUMMARY cells=${cells.length} failed=${failed}`);
  process.exit(0);
})();
