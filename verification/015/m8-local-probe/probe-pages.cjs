// M8-c: every page a request opens is closed, whether the request succeeds or throws; no rejection is left unhandled.
const puppeteerModule = require('puppeteer');
const puppeteer = puppeteerModule.default || puppeteerModule;
const http = require('http');
const counts = { opened: 0, closed: 0 };
const orig = puppeteer.launch.bind(puppeteer);
puppeteer.launch = async (opts) => {
  const b = await orig({ ...opts, args: [...(opts.args || []), '--disable-gpu'] });
  const np = b.newPage.bind(b);
  b.newPage = async () => {
    const page = await np(); counts.opened += 1;
    const close = page.close.bind(page);
    page.close = async (...a) => { counts.closed += 1; return close(...a); };
    return page;
  };
  return b;
};
let unhandled = 0;
process.on('unhandledRejection', () => { unhandled += 1; });
const generate = require('./build/generateImage').default;
const getPool = require('./build/getPool').default;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const settle = async (minOpened) => { for (let i = 0; i < 100 && counts.opened < minOpened; i += 1) await sleep(250); await sleep(2500); };
const say = (ok, name, detail) => console.log(`CELL ${ok ? 'PASS' : 'FAIL'} ${name}${detail ? ` -- ${detail}` : ''}`);
(async () => {
  const page = http.createServer((q, r) => { r.writeHead(200, { 'content-type': 'text/html' }); r.end('<h1>x</h1>'); }).listen(3991, '127.0.0.1');
  // goto fails (closed port): the screenshot step is never reached.
  process.env.PREVIEW_ENDPOINT = 'http://127.0.0.1:1/preview';
  const cfg = require('./build/config').default;
  cfg.PREVIEW_ENDPOINT = 'http://127.0.0.1:1/preview';
  const r1 = await generate('m1', 'n1', {}).then(() => 'resolved', (e) => `rejected ${String(e.message || e).slice(0, 60)}`);
  await settle(1);
  say(counts.opened > 0 && counts.opened === counts.closed, 'M8-c a page opened by a request whose navigation throws is closed', `opened=${counts.opened} closed=${counts.closed} (${r1})`);
  say(unhandled === 0, 'M8-c no unhandled rejection when both the image and the S3 delete fail', `unhandled=${unhandled}`);
  // navigation succeeds, S3 fails afterwards.
  cfg.PREVIEW_ENDPOINT = 'http://127.0.0.1:3991/preview';
  const o0 = counts.opened;
  await generate('m2', 'n2', {}).then(() => 'resolved', () => 'rejected');
  await settle(o0 + 1);
  say(counts.opened > o0 && counts.opened === counts.closed, 'M8-c a page whose screenshot succeeded is closed', `opened=${counts.opened} closed=${counts.closed}`);
  console.log(`INFO browser: ${process.env.PUPPETEER_EXECUTABLE_PATH}`);
  await getPool().drain().then(() => getPool().clear()); page.close(); process.exit(0);
})().catch((e) => { console.log('CELL FAIL M8-c probe crashed -- ' + String(e).slice(0, 200)); process.exit(0); });
