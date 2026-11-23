// AN-8 limb 2b, read-state variant of gm-surfaces.js (analysis 019): AN-3's per-surface legacy calls over the game-mention form. Assembled from an4/legacy-node.js lines 1-59 and an3/an3-tail.js.part, with the tail's unused module-856896 line removed.
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
// ---- AN-3: Discord's legacy parser per surface, with each surface's own call and state (build read as prose) ----
(async () => {
  const req = w.__oracleReq;
  const ids = Object.keys(req.m);
  const pick1 = (needles) => {
    const hit = ids.filter((id) => { const s = Function.prototype.toString.call(req.m[id]); return needles.every((n) => s.includes(n)); });
    if (hit.length !== 1) { console.error(`predicate ${needles.join('+')} matched ${hit.length}`); process.exit(5); }
    return hit[0];
  };
  const facadeMod = req(pick1(['parseEmbedTitle', 'parseTopic', 'parseInlineReply', 'parseToAST']));
  const F = Object.values(facadeMod).find((v) => v && typeof v.parseToAST === 'function');
  const stateMod = req(pick1(['allowEmojiLinks:i', 'mentionChannels:e.mentionChannels']));
  const Le = Object.values(stateMod).find((f) => typeof f === 'function' && Function.prototype.toString.call(f).includes('renderOptions:r}=e') && Function.prototype.toString.call(f).includes('disablePressableChannelMention:!!r'));
  if (typeof Le !== 'function') { console.error('state builder not found'); process.exit(6); }
  const r3Mod = req('862316');
  const r3 = Object.values(r3Mod).find((f) => typeof f === 'function' && f.length === 0 && (() => { try { const x = f(); return x && typeof x === 'object' && !Array.isArray(x); } catch { return false; } })());
  const combine = Object.values(req('551965')).find((f) => typeof f === 'function');
  const richAst = F.astParserFor(combine([F.defaultRules, r3()]));
  const base = (opts) => Le({ channelId: '0', messageId: '0', authorId: '0', renderOptions: opts });
  const webhook = (opts) => ({ ...base(opts), allowLinks: true, allowEmojiLinks: true });
  const contentOpts = { allowLinks: false, allowHeading: true, allowList: true, allowGameMentions: true, previewLinkTarget: true };
  const textDisplayOpts = { allowList: true, allowHeading: true, allowLinks: true, allowGameMentions: true, previewLinkTarget: true };
  // State as renderEmbedDescription passes it in build 679055 (lazy chunk 2420b0c09d1ff9a5.js), showListsAndHeaders true: no allowGameMentions key.
  const richState = (isField) => ({ channelId: '0', allowLinks: true, allowEmojiLinks: true, allowList: true, allowHeading: !isField, previewLinkTarget: true, returnMentionIds: true });
  const surfaces = {
    content_webhook: (t) => F.parseToAST(t, true, { ...webhook(contentOpts), returnMentionIds: true }),
    content_user: (t) => F.parseToAST(t, true, { ...base(contentOpts), returnMentionIds: true }),
    embed_description: (t) => richAst(t, true, richState(false)),
    embed_field_value: (t) => richAst(t, true, richState(true)),
    embed_title: (t) => F.parseEmbedTitleToAST(t, true, { channelId: '0', returnMentionIds: true }),
    embed_title_with_url: (t) => F.parseEmbedTitleWithoutLinksToAST(t, true, { channelId: '0', returnMentionIds: true }),
    field_name: (t) => F.parseEmbedTitleToAST(t, true, { channelId: '0', returnMentionIds: true }),
    field_name_embed_has_url: (t) => F.parseEmbedTitleWithoutLinksToAST(t, true, { channelId: '0', returnMentionIds: true }),
    text_display_webhook: (t) => F.parseToAST(t, true, { ...webhook(textDisplayOpts), returnMentionIds: true }),
  };
  const cases = JSON.parse(fs.readFileSync(corpusFile, 'utf8'));
  const seen = new WeakSet();
  const types = (v, acc = new Set()) => {
    if (v === null || typeof v !== 'object' || seen.has(v)) return acc;
    seen.add(v);
    if (Array.isArray(v)) { v.forEach((x) => types(x, acc)); return acc; }
    if (typeof v.type === 'string') acc.add(v.type);
    for (const k of ['content', 'items', 'mainContent']) if (v[k]) types(v[k], acc);
    return acc;
  };
  const rows = cases.map((c) => {
    const row = { bit: c.bit, text: c.text };
    for (const [name, fn] of Object.entries(surfaces)) {
      try { row[name] = [...types(fn(c.text))].filter((x) => x !== 'text' && x !== 'paragraph' && x !== 'br' && x !== 'newline').sort(); } catch (e) { row[name] = `error ${String(e).slice(0, 120)}`; }
    }
    return row;
  });
  fs.writeFileSync(outFile, JSON.stringify({ rows }, null, 1));

  for (const r of rows) console.log(r.bit.padEnd(18), Object.keys(surfaces).map((s) => `${s}=${Array.isArray(r[s]) ? (r[s].join('+') || '-') : r[s]}`).join(' '));
  process.exit(0);
})().catch((e) => { console.error(String(e && e.stack || e).slice(0, 1500)); process.exit(1); });
