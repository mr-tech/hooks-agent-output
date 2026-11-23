// AN-4 probe (analysis 019): can Discord's legacy markdown facade run under Node (jsdom), from the
// publicly served assets, without a browser? Discord's code is read from a scratch download and never
// committed. Run inside `unshare -rn` and a capped systemd scope.
// usage: node legacy-node.js <jsdom-dir> <build-dir with app.html, scripts.txt, js/> <corpus.json> <out.json>
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
shim('fetch', () => Promise.reject(new Error('oracle: network disabled')));
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
const req = w.__oracleReq;
const out = { patched, scripts: srcs.length, inlineScripts: inline.length, inlineErrors, loadErrors: loadErrors.slice(0, 20), loadErrorCount: loadErrors.length, haveReq: typeof req, loadMs: tLoaded - t0 };
if (typeof req === 'function') {
  const ids = Object.keys(req.m);
  const pick = (needles) => ids.filter((id) => { const s = Function.prototype.toString.call(req.m[id]); return needles.every((n) => s.includes(n)); });
  out.moduleCount = ids.length;
  out.facadeIds = pick(['parseEmbedTitle', 'parseTopic', 'parseInlineReply', 'parseToAST']);
  out.rulesIds = pick(['EMBED_TITLE_RULES', 'INLINE_REPLY_RULES', 'looseEm']);
  out.slatemapIds = pick(['Slate: Unknown markdown rule']);
  if (out.facadeIds.length === 1) {
    try {
      const mod = req(out.facadeIds[0]);
      let facade = null;
      for (const k of Object.keys(mod)) { const v = mod[k]; if (v && typeof v === 'object' && typeof v.parseToAST === 'function') facade = v; }
      out.facadeFound = !!facade;
      if (facade) {
        const state = { channelId: '0', messageId: '0', allowLinks: true, allowDevLinks: false, allowEmojiLinks: false, allowGameMentions: true, allowHeading: true, allowList: true, formatInline: false, noStyleAndInteraction: false, disableAutoBlockNewlines: true, mentionChannels: [], soundboardSounds: [], muted: false, unknownUserMentionPlaceholder: true, previewLinkTarget: false, returnMentionIds: true };
        const seen = new WeakSet();
        const clean = (v) => {
          if (v === null || typeof v !== 'object') return typeof v === 'function' ? undefined : (typeof v === 'bigint' ? `${v}n` : v);
          if (seen.has(v)) return '[circular]';
          seen.add(v);
          if (Array.isArray(v)) return v.map(clean);
          if (v._isAMomentObject) return `moment:${v.valueOf()}`;
          const o = {};
          for (const k of Object.keys(v)) { if (k === 'originalMatch') continue; const c = clean(v[k]); if (c !== undefined) o[k] = c; }
          return o;
        };
        const corpus = JSON.parse(fs.readFileSync(corpusFile, 'utf8'));
        const t1 = Date.now();
        out.rows = corpus.map((c) => { try { return { id: c.id, out: clean(facade.parseToAST(c.text, true, { ...state })) }; } catch (e) { return { id: c.id, error: String(e).slice(0, 200) }; } });
        out.parseMs = Date.now() - t1;
        out.rowErrors = out.rows.filter((r) => r.error).length;
      }
    } catch (e) { out.facadeError = String(e && e.stack || e).slice(0, 800); }
  }
}
out.consoleErrors = consoleErrors;
out.totalMs = Date.now() - t0;
fs.writeFileSync(outFile, JSON.stringify(out));
const { rows, ...head } = out;
console.log(JSON.stringify({ ...head, rows: rows ? rows.length : 0 }, null, 1));
process.exit(0);
