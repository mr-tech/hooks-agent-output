// Which network channels the oracle's jsdom window keeps after loadBuild's shims, at website f4060c5.
// Usage (offline, under unshare -rn): node --experimental-strip-types m3-oracle-window-network.mjs <clone of f4060c5 with node_modules>
// It builds the window exactly as loadBuild does (same JSDOM options, then installShims through loadBuild on an empty build
// whose one runtime script captures the require), and then, from inside the window, attempts each channel against a
// loopback listener this script owns. Oracle: the listener's request log. A channel is live when the listener sees it.
import http from 'node:http';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

const root = process.argv[2];
const helper = await import(pathToFileURL(`${root}/src/utils/markdown/__tests__/helpers/discordBuild.ts`).href);

const seen = [];
const server = http.createServer((req, res) => { seen.push(`${req.method} ${req.url} upgrade=${req.headers.upgrade ?? '-'}`); res.end('ok'); });
server.on('upgrade', (req, socket) => { seen.push(`UPGRADE ${req.url}`); socket.destroy(); });
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const port = server.address().port;

const runtime = '(self.webpackChunk=self.webpackChunk||[]);var N;var r=function(){};r.m={};r.O=function(a,b,c){if(typeof c==="function")c();return a};'
  + 'N=r.O(0,[],()=>r(1));N=r.O(N);';
const build = { html: '<script src="/assets/web.a.js"></script>', scripts: { 'web.a.js': runtime } };
const oracle = helper.loadBuild(build);
const w = oracle.window;
const report = {
  types: {
    fetch: typeof w.fetch, XMLHttpRequest: typeof w.XMLHttpRequest, WebSocket: typeof w.WebSocket,
    EventSource: typeof w.EventSource, sendBeacon: typeof w.navigator?.sendBeacon,
  },
};
const base = `http://127.0.0.1:${port}`;
w.eval(`
  try { window.fetch('${base}/fetch').catch(function(){}); } catch (e) {}
  try { var x = new XMLHttpRequest(); x.open('POST', '${base}/xhr'); x.send('payload'); } catch (e) { window.__xhrErr = String(e); }
  try { var s = new WebSocket('ws://127.0.0.1:${port}/ws'); s.onerror = function(){}; } catch (e) { window.__wsErr = String(e); }
  try { if (navigator.sendBeacon) navigator.sendBeacon('${base}/beacon', 'x'); } catch (e) {}
`);
await new Promise((r) => setTimeout(r, 1500));
report.listenerSaw = seen;
report.errors = { xhr: w.__xhrErr ?? null, ws: w.__wsErr ?? null };
console.log(JSON.stringify(report, null, 1));
server.close();
process.exit(0);
