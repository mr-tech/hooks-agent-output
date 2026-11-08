// M8-b body-class probe. Runs inside unshare -rn from an E-1 export's root (built by m8-local-probe/run.sh), one fresh
// server per body. Per body: status, whether the process exited, and the server's own lines after the request.
// Oracle for "refused before generateImage": no generateImage-side line (launch, page, S3) follows the request, and
// the process is alive. Controls: the object body reaches generateImage; the unparsable body is refused.
const { fork } = require('child_process');
const http = require('http');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let port = 4060;
function start() {
  port += 1;
  const env = { PATH: process.env.PATH, HOME: process.env.HOME, ENV: 'development', SERVER_HOST: '127.0.0.1', SERVER_PORT: String(port),
    CDN_ENDPOINT: 'http://127.0.0.1:1', CDN_KEY: 'probe', CDN_SECRET: 'probe', CDN_BUCKET: 'probe',
    PREVIEW_ENDPOINT: 'http://127.0.0.1:1/preview', API_KEY: 'probe-key' };
  const child = fork('build/server.js', [], { env, silent: true });
  const lines = [];
  const take = (d) => String(d).split('\n').filter(Boolean).forEach((l) => lines.push(l));
  child.stdout.on('data', take); child.stderr.on('data', take);
  const o = { child, lines, port, exit: null };
  o.ready = new Promise((res) => { child.on('message', (m) => { if (m === 'ready') res(true); }); setTimeout(() => res(false), 8000); });
  o.exited = new Promise((res) => child.on('exit', (code, sig) => { o.exit = { code, sig }; res(); }));
  return o;
}
function request(p, body, method = 'POST', path = '/generate', auth = 'Bearer probe-key') {
  return new Promise((resolve) => {
    const req = http.request({ host: '127.0.0.1', port: p, method, path, headers: auth ? { authorization: auth } : {} },
      (res) => { res.resume(); res.on('end', () => resolve(res.statusCode)); });
    req.on('error', (e) => resolve(`error:${e.code}`));
    req.setTimeout(30000, () => { req.destroy(); resolve('timeout'); });
    req.end(body);
  });
}
(async () => {
  const bodies = [['control: unparsable', '{not json'], ['null', 'null'], ['number', '5'], ['string', '"x"'], ['boolean', 'true'],
    ['empty array', '[]'], ['array of numbers', '[1,2]'], ['array of an object', '[{"id":"m","nonce":"n","message":{}}]'],
    ['control: object', '{"id":"m","nonce":"n","message":{}}']];
  for (const [name, body] of bodies) {
    const o = start();
    const ready = await o.ready;
    const before = o.lines.length;
    const st = ready ? await request(o.port, body) : 'not-ready';
    await sleep(500);
    const after = o.exit ? 'n/a' : await request(o.port, '', 'GET', '/x', null);
    const tail = o.lines.slice(before).filter((l) => !/ (POST|GET) \//.test(l)).map((l) => l.slice(0, 110));
    console.log(`BODY ${name} ${JSON.stringify(body)} -> status ${st}; process ${o.exit ? `exited ${JSON.stringify(o.exit)}` : `alive (GET /x ${after})`}`);
    tail.slice(0, 4).forEach((l) => console.log(`    | ${l}`));
    if (!o.exit) { o.child.kill('SIGKILL'); await o.exited; }
  }
})();
