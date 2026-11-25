// Plan 019 Stage 1 read on a Vercel Preview of the release tree: page errors on the editor pages, and Discord's copyright
// notice in the served JavaScript. Loads pages only, signed out, one fresh context per load; nothing is clicked or saved.
// usage: node preview-read.js <base-url> <chrome-binary|default> <loads> <out.json>
'use strict';
const fs = require('fs');
const { chromium } = require('/home/dev/.cache/qa-083-harness/node_modules/playwright-core');

const [base, chrome, loadsArg, outFile] = process.argv.slice(2);
const loads = Number(loadsArg);
const NOTICE = 'Copyright 2025 Discord, Inc.';
const message = { content: '**bold** [masked](https://example.com) ||spoiler||', embeds: [] };
const PAGES = [
  ['preview', `/preview?data=${encodeURIComponent(JSON.stringify(message))}`],
  ['new', '/message/m/new'],
  ['edit', '/message/m/0/edit'],
];

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: chrome === 'default' ? undefined : chrome });
  const out = { at: new Date().toISOString(), base, browser: browser.version(), loads, pages: {} };
  for (const [name, path] of PAGES) {
    const scripts = new Map();
    const result = { path: path.split('?')[0], loadsWithPageError: 0, pageErrors: [], throws: [], consoleErrors: {}, wasm: {}, strong: [] };
    for (let i = 0; i < loads; i += 1) {
      const context = await browser.newContext({ locale: 'en-US' });
      const page = await context.newPage();
      let threw = false;
      // A thrown non-Error reaches pageerror as "undefined", so the window events are read too.
      await page.addInitScript(() => {
        const note = (kind, v) => console.log(`probe-throw ${kind} type=${Object.prototype.toString.call(v)} value=${String(v).slice(0, 200)} stack=${String(v && v.stack).slice(0, 500)}`);
        window.addEventListener('error', (e) => note(`error@${e.filename}:${e.lineno}:${e.colno} msg=${String(e.message).slice(0, 200)}`, e.error));
        window.addEventListener('unhandledrejection', (e) => note('rejection', e.reason));
      });
      page.on('console', (m) => { if (m.text().startsWith('probe-throw')) result.throws.push({ load: i, text: m.text().slice(0, 900) }); });
      page.on('pageerror', (e) => { threw = true; result.pageErrors.push({ load: i, message: String(e.message).slice(0, 300), stack: String(e.stack).slice(0, 900) }); });
      page.on('console', (m) => { if (m.type() === 'error') { const k = m.text().slice(0, 200); result.consoleErrors[k] = (result.consoleErrors[k] || 0) + 1; } });
      page.on('response', async (r) => {
        const url = r.url();
        if (url.split('?')[0].endsWith('.wasm')) result.wasm[r.status()] = (result.wasm[r.status()] || 0) + 1;
        if (url.startsWith(base) && url.split('?')[0].endsWith('.js') && !scripts.has(url)) {
          try { const body = await r.text(); scripts.set(url, body.includes(NOTICE)); } catch { /* body unavailable */ }
        }
      });
      await page.goto(base + path, { waitUntil: 'load', timeout: 60000 });
      await page.waitForTimeout(3000);
      if (name === 'preview') result.strong.push(await page.locator('strong').count());
      if (threw) result.loadsWithPageError += 1;
      await context.close();
    }
    result.scriptsRead = scripts.size;
    result.scriptsWithNotice = [...scripts].filter(([, has]) => has).map(([url]) => url.slice(base.length));
    out.pages[name] = result;
    console.log(name, 'loadsWithPageError', result.loadsWithPageError, 'scripts', result.scriptsRead, 'withNotice', result.scriptsWithNotice.length, 'wasm', JSON.stringify(result.wasm), 'strong', [...new Set(result.strong)].join(','), 'consoleErrors', JSON.stringify(result.consoleErrors).slice(0, 300));
  }
  await browser.close();
  fs.writeFileSync(outFile, `${JSON.stringify(out, null, 1)}\n`);
})().catch((e) => { console.error(String(e).slice(0, 600)); process.exit(1); });
