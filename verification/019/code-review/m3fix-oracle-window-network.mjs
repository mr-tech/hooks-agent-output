// Re-attack of the oracle window's network paths at website 1698c80 (CR-6 fix confirmation), from first principles.
// Usage (offline, under unshare -rn, so loopback is the only reachable address):
//   node --experimental-strip-types m3fix-oracle-window-network.mjs <export of 1698c80 with node_modules>
// The window is built through loadBuild exactly (its JSDOM options and installOracleShims), on an empty build whose one
// runtime script captures the require. From inside the window each path below is tried against a loopback listener this
// script owns. Oracles: (1) the listener's log, a path is live when the listener sees it; (2) oracle.attempts, a path is
// recorded when its address appears there. A path that throws before it records leaves the live control's
// "attempts is empty" assertion unable to see it.
// Blind spot: paths reached through host-realm objects the shims hand in (crypto, WebAssembly), and any API a jsdom upgrade adds.
import http from 'node:http';
import { pathToFileURL } from 'node:url';

const root = process.argv[2];
const helper = await import(pathToFileURL(`${root}/src/utils/markdown/__tests__/helpers/discordBuild.ts`).href);

const seen = [];
const server = http.createServer((req, res) => { seen.push(`${req.method} ${req.url}`); res.end('ok'); });
server.on('upgrade', (req, socket) => { seen.push(`UPGRADE ${req.url}`); socket.destroy(); });
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const port = server.address().port;
const base = `http://127.0.0.1:${port}`;

const runtime = '(self.webpackChunk=self.webpackChunk||[]);var N;var r=function(){};r.m={};r.O=function(a,b,c){if(typeof c==="function")c();return a};'
  + 'N=r.O(0,[],()=>r(1));N=r.O(N);';
const build = { html: '<script src="/assets/web.a.js"></script>', scripts: { 'web.a.js': runtime } };
const oracle = helper.loadBuild(build);
const w = oracle.window;

const paths = {
  'fetch(url)': `window.fetch('${base}/fetch-url').catch(function(){})`,
  'fetch(Request-like)': `window.fetch({ url: '${base}/fetch-req', toString: function(){ return this.url; } }).catch(function(){})`,
  'fetch(x.wasm), no wasm given': `window.fetch('${base}/x.wasm').catch(function(){})`,
  'xhr open+send': `var x = new XMLHttpRequest(); x.open('POST', '${base}/xhr'); x.send('p')`,
  'xhr addEventListener before open': `var x = new XMLHttpRequest(); x.addEventListener('load', function(){}); x.open('GET', '${base}/xhr-ael'); x.send()`,
  'xhr withCredentials before open': `var x = new XMLHttpRequest(); x.withCredentials = true; x.open('GET', '${base}/xhr-wc'); x.send()`,
  'xhr via self': `var x = new self.XMLHttpRequest(); x.open('GET', '${base}/xhr-self'); x.send()`,
  'WebSocket': `new WebSocket('ws://127.0.0.1:${port}/ws')`,
  'WebSocket via globalThis': `new globalThis.WebSocket('ws://127.0.0.1:${port}/ws-gt')`,
  'EventSource': `new EventSource('${base}/es')`,
  'sendBeacon': `navigator.sendBeacon('${base}/beacon', 'x')`,
  'img src': `var i = new Image(); i.src = '${base}/img'; document.body.appendChild(i)`,
  'script src': `var s = document.createElement('script'); s.src = '${base}/script.js'; document.head.appendChild(s)`,
  'link stylesheet': `var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = '${base}/style.css'; document.head.appendChild(l)`,
  'iframe src': `var f = document.createElement('iframe'); f.src = '${base}/iframe'; document.body.appendChild(f)`,
  'form submit': `var f = document.createElement('form'); f.action = '${base}/form'; f.method = 'post'; document.body.appendChild(f); f.submit()`,
  'window.open': `window.open('${base}/open')`,
  'location.assign': `location.assign('${base}/nav')`,
};

// Positive control: a request from the host realm reaches the listener, so an empty log means refused, not unreachable.
await (await fetch(`${base}/control`)).text();
const results = {};
for (const [name, code] of Object.entries(paths)) {
  const before = oracle.attempts.length;
  let thrown = null;
  try { w.eval(code); } catch (e) { thrown = String(e && e.message ? e.message : e).slice(0, 120); }
  results[name] = { thrown, recorded: oracle.attempts.slice(before) };
}
await new Promise((r) => setTimeout(r, 2000));
for (const [name, r] of Object.entries(results)) {
  const slug = (paths[name].match(/127\.0\.0\.1:\d+(\/[\w.-]+)/) || [])[1];
  r.listenerSaw = seen.filter((s) => slug && s.split(' ')[1] === slug);
}
console.log(JSON.stringify({ types: {
  fetch: typeof w.fetch, XMLHttpRequest: typeof w.XMLHttpRequest, WebSocket: typeof w.WebSocket,
  EventSource: typeof w.EventSource, sendBeacon: typeof w.navigator.sendBeacon,
}, positiveControl: seen.filter((x) => x === 'GET /control'), results, listenerTotal: seen, attemptsTotal: oracle.attempts }, null, 1));
server.close();
process.exit(0);
