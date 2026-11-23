// Run Discord's legacy (simple-markdown) message parser inside the publicly served, logged-out web app,
// in a throwaway headless Chromium. Research probe; nothing here is committed.
// usage: node legacy-oracle.js <playwright-core-dir> <chromium-binary> <corpus.json> <out.jsonl>
// Network policy: only https://discord.com/login (document) and https://discord.com/assets/* are allowed;
// every other request is aborted and every other host fails DNS.
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');

async function main() {
  const [pwDir, chromium, corpusFile, outFile] = process.argv.slice(2);
  const { chromium: pw } = require(pwDir);
  const corpus = JSON.parse(fs.readFileSync(corpusFile, 'utf8'));
  const browser = await pw.launch({
    executablePath: chromium,
    headless: true,
    args: ['--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE discord.com', '--disable-background-networking'],
  });
  const log = { allowed: 0, aborted: {}, consoleErrors: 0 };
  try {
    const context = await browser.newContext({ serviceWorkers: 'block' });
    const page = await context.newPage();
    await page.route('**/*', (route) => {
      const u = new URL(route.request().url());
      const ok = u.protocol === 'https:' && u.hostname === 'discord.com' && route.request().method() === 'GET'
        && (u.pathname === '/login' || u.pathname.startsWith('/assets/'));
      if (ok) { log.allowed += 1; return route.continue(); }
      const key = `${u.hostname}${u.pathname.split('/').slice(0, 4).join('/')}`;
      log.aborted[key] = (log.aborted[key] || 0) + 1;
      return route.abort();
    });
    page.on('console', (m) => { if (m.type() === 'error') log.consoleErrors += 1; });
    await page.goto('https://discord.com/login', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForFunction(() => Array.isArray(window.webpackChunkdiscord_app) && window.webpackChunkdiscord_app.length > 5, null, { timeout: 60000 });
    await page.waitForTimeout(4000);
    const result = await page.evaluate((cases) => {
      // Every runtime on the page handles the push and calls back with its own require; keep the one that has
      // instantiated the most modules (the app's main runtime).
      const reqs = [];
      window.webpackChunkdiscord_app.push([[Symbol('oracle-probe')], {}, (r) => { reqs.push(r); }]);
      const req = reqs.slice().sort((x, y) => Object.keys(y.c || {}).length - Object.keys(x.c || {}).length)[0];
      const info = { build: window.GLOBAL_ENV && window.GLOBAL_ENV.BUILD_NUMBER, versionHash: window.GLOBAL_ENV && window.GLOBAL_ENV.VERSION_HASH };
      info.runtimes = reqs.map((r) => ({ modules: Object.keys(r.m || {}).length, instantiated: Object.keys(r.c || {}).length, nmd: typeof r.nmd })); info.reqType = typeof req; info.reqKeys = req ? Object.keys(req).slice(0, 30) : []; info.moduleCount = req && req.m ? Object.keys(req.m).length : -1;
      // Locate by content, never by id: the parser facade is the module whose factory source names these entry points.
      const facadeIds = Object.keys(req.m).filter((id) => {
        const s = Function.prototype.toString.call(req.m[id]);
        return s.includes('parseEmbedTitle') && s.includes('parseTopic') && s.includes('parseInlineReply') && s.includes('parseToAST');
      });
      const rulesIds = Object.keys(req.m).filter((id) => {
        const s = Function.prototype.toString.call(req.m[id]);
        return s.includes('EMBED_TITLE_RULES') && s.includes('INLINE_REPLY_RULES') && s.includes('looseEm');
      });
      info.facadeIds = facadeIds;
      info.rulesIds = rulesIds;
      if (facadeIds.length !== 1) return { info, error: 'facade module not unique' };
      const mod = req(facadeIds[0]);
      let facade = null;
      for (const k of Object.keys(mod)) {
        const v = mod[k];
        if (v && typeof v === 'object' && typeof v.parseToAST === 'function' && typeof v.parseTopic === 'function') facade = v;
      }
      if (!facade) return { info, error: 'facade export not found', exportKeys: Object.keys(mod) };
      info.facadeMethods = Object.keys(facade).sort();
      const state = {
        channelId: '0', messageId: '0', allowLinks: true, allowDevLinks: false, allowEmojiLinks: false, allowGameMentions: true,
        allowHeading: true, allowList: true, formatInline: false, noStyleAndInteraction: false, disableAutoBlockNewlines: true,
        mentionChannels: [], soundboardSounds: [], muted: false, unknownUserMentionPlaceholder: true, previewLinkTarget: false,
        returnMentionIds: true,
      };
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
      const rows = cases.map((c) => {
        try { return { id: c.id, out: clean(facade.parseToAST(c.text, true, { ...state })) }; } catch (e) { return { id: c.id, error: String(e) }; }
      });
      return { info, rows };
    }, corpus);
    fs.writeFileSync(outFile, JSON.stringify({ log, ...result }));
    console.log(JSON.stringify({ log, info: result.info, error: result.error, exportKeys: result.exportKeys, rows: result.rows ? result.rows.length : 0 }, null, 1));
  } finally {
    await browser.close();
  }
}

main().catch((e) => { console.error(String(e && e.stack || e).slice(0, 1500)); process.exit(1); });
