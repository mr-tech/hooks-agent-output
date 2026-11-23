// AN-4 probe (analysis 019): can Discord's legacy markdown facade run under Node (jsdom), from the
// publicly served assets, without a browser? Discord's code is read from a scratch download and never
// committed. Run inside `unshare -rn` and a capped systemd scope.
// usage: ORACLE_WASM=<served wasm> node an6-textbox.js <jsdom-dir> <build-dir with app.html, scripts.txt, js/> <corpus.json> <out.json>
'use strict';
const fs = require('fs');
const path = require('path');

const [jsdomDir, buildDir, corpusFile, outFile] = process.argv.slice(2);
const { JSDOM, VirtualConsole } = require(jsdomDir);
const t0 = Date.now();
const html = fs.readFileSync(path.join(buildDir, 'app.html'), 'utf8');
const vc = new VirtualConsole();
let consoleErrors = 0;
vc.on('error', () => { consoleErrors += 1; });
vc.on('jsdomError', () => { consoleErrors += 1; });
const dom = new JSDOM('<!doctype html><html><head></head><body><div id="app-mount"></div></body></html>', {
  url: 'https://discord.com/login', runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole: vc,
});
const w = dom.window;
// Inert browser shims the bundle's module-init code touches (not a renderer: nothing here draws).
const shimNames = [];
const shim = (k, v) => { if (w[k] === undefined) { w[k] = v; shimNames.push(k); } };
shim('matchMedia', () => ({ matches: false, media: '', addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, onchange: null }));
class InertObserver { observe() {} unobserve() {} disconnect() {} takeRecords() { return []; } }
shim('IntersectionObserver', InertObserver);
shim('ResizeObserver', InertObserver);
shim('requestIdleCallback', (f) => setTimeout(f, 0));
shim('cancelIdleCallback', (id) => clearTimeout(id));
shim('AudioContext', class { createGain() { return { connect() {}, gain: {} }; } });
shim('webkitAudioContext', w.AudioContext);
shim('Worker', class { postMessage() {} terminate() {} addEventListener() {} });
shim('BroadcastChannel', class { postMessage() {} close() {} addEventListener() {} });
const WASM_BYTES = fs.readFileSync(process.env.ORACLE_WASM);
w.fetch = (u) => (String(u).endsWith('.wasm') ? Promise.resolve(new Response(WASM_BYTES, { headers: { 'content-type': 'application/wasm' } })) : Promise.reject(new Error('oracle: network disabled')));
shim('TextEncoder', TextEncoder);
shim('TextDecoder', TextDecoder);
shim('crypto', globalThis.crypto);
shim('structuredClone', structuredClone);
shim('WebAssembly', WebAssembly);
// Inline scripts of the page (GLOBAL_ENV and friends), in order.
const inline = [...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).filter((s) => s.trim());
const inlineErrors = [];
for (const s of inline) { try { w.eval(s); } catch (e) { inlineErrors.push(String(e).slice(0, 200)); } }
// External scripts in page order.
const srcs = [...html.matchAll(/<script[^>]*src="\/assets\/([^"]+\.js)"/g)].map((m) => m[1]);
const loadErrors = [];
let patched = false;
for (const s of srcs) {
  let code = fs.readFileSync(path.join(buildDir, 'js', s), 'utf8');
  if (s.startsWith('web.')) {
    // Expose the runtime's require instead of starting the app. Fails loudly unless exactly one
    // startup call of this shape exists.
    const starts = code.match(/\(\)=>([A-Za-z_$]{1,2})\(\d+\)\);N=\1\.O\(N\)/g) || [];
    if (starts.length !== 1) { console.error(`startup predicate matched ${starts.length}`); process.exit(4); }
    code = code.replace(/\(\)=>([A-Za-z_$]{1,2})\((\d+)\)\);N=/, '()=>{globalThis.__oracleReq=$1});N=');
    patched = /__oracleReq/.test(code);
  }
  try { w.eval(code); } catch (e) { loadErrors.push(`${s}: ${String(e).slice(0, 200)}`); }
}
const tLoaded = Date.now();
// ---- AN-6: run Discord's two text-box tables (legacy 339200 cv.markdown, native 818948 p0) per case ----
(async () => {
  const req = w.__oracleReq;
  const ids = Object.keys(req.m);
  const pick1 = (needles) => {
    const hit = ids.filter((id) => { const s = Function.prototype.toString.call(req.m[id]); return needles.every((n) => s.includes(n)); });
    if (hit.length !== 1) { console.error(`predicate ${needles.join('+')} matched ${hit.length}`); process.exit(5); }
    return hit[0];
  };
  const slateId = pick1(['Slate: Unknown markdown rule']);
  const nativeId = pick1(['subtext_marker', 'codeBlockSyntax']);
  const gateId = pick1(['initNativeMarkdown', 'useSyncExternalStore']);
  const maskId = pick1(['ALL&~', 'DEV_LINKS', 'isDeveloper']);
  const exportWith = (mod, pred) => Object.values(mod).find(pred);
  const gate = req(gateId);
  await gate.initNativeMarkdown();
  const legacy = exportWith(req(slateId), (v) => v && typeof v.markdown === 'function' && typeof v.serializeMarkdownChildren === 'function');
  const native = req(nativeId);
  const p0 = Object.values(native).find((f) => typeof f === 'function' && Function.prototype.toString.call(f).includes('nativeMarkdownSyntax') && Function.prototype.toString.call(f).includes('codeBlocks'));
  const flags = req('593034');
  const SyntaxFlags = Object.values(flags).find((v) => v && typeof v.ALL === 'number');
  const mask = SyntaxFlags.ALL & ~SyntaxFlags.DEV_LINKS;

  const T = (t) => ({ text: t });
  const O = (type, src) => ({ type, emoji: { surrogate: src }, children: [{ text: '' }] });
  const probes = [
    ['bold across emoji', [T('**a '), O('emoji', ':slight_smile:'), T(' b**')]],
    ['underscore italic across a named emoji whose name has _', [T('_a'), O('emoji', ':slight_smile:'), T('b_')]],
    ['source text of the same emoji typed as text', [T('_a:slight_smile:b_')]],
    ['spoiler across a mention', [T('||x '), O('userMention', '<@1>'), T(' y||')]],
    ['code span across a timestamp', [T('`a '), O('timestamp', '<t:1:f>'), T(' b`')]],
  ];
  const outRows = probes.map(([name, children]) => {
    const line = { type: 'line', children };
    const ser = legacy.serializeMarkdownChildren(line);
    const lg = legacy.markdown(line, null, false).entries.map((e) => ({ text: e.text, start: e.start, attributes: e.attributes }));
    const doc = p0({ children: [line], nativeMarkdownSyntax: mask });
    return { name, serialized: ser.join(''), legacy: lg, native: doc.blocks[0].entries.map((e) => ({ text: e.text, start: e.start, attributes: e.attributes })) };
  });
  fs.writeFileSync(outFile, JSON.stringify(outRows, null, 1));
  console.log(JSON.stringify(outRows, null, 1));
  process.exit(0);
})().catch((e) => { console.error(String(e && e.stack || e).slice(0, 1500)); process.exit(1); });
