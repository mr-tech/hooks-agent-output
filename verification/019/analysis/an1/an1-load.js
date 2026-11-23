// AN-1 load probe (analysis 019). Runs inside a network namespace (unshare -rn) beside `next start`.
// usage: node an1-load.js <puppeteer-dir> <chrome-binary> <base-url> <loads> <out.json>
'use strict';
const fs = require('fs');

const [pptrDir, chrome, base, loadsArg, outFile] = process.argv.slice(2);
const puppeteer = require(pptrDir);
const loads = Number(loadsArg);

const message = { content: '**bold** [masked](https://example.com) ||spoiler||', embeds: [] };
const previewUrl = `${base}/preview?data=${encodeURIComponent(JSON.stringify(message))}`;
const editorUrl = `${base}/message/m/new`;

// Installed before any page script: records when the engine's formatted output first appears.
const observer = `(() => {
  window.__firstFormatted = null;
  const check = () => {
    if (window.__firstFormatted === null && document.querySelector('[data-md-engine] strong')) {
      window.__firstFormatted = performance.now();
    }
  };
  new MutationObserver(check).observe(document, { childList: true, subtree: true });
})();`;

async function one(browser, url, wantFormatted) {
  const page = await browser.newPage();
  const responses = [];
  page.on('response', async (r) => {
    const u = r.url();
    if (u.endsWith('.wasm') || u.includes('/_next/static/chunks/')) {
      const h = r.headers();
      let bytes = null;
      try { bytes = (await r.buffer()).length; } catch { /* body unavailable */ }
      responses.push({ url: u.replace(base, ''), status: r.status(), ce: h['content-encoding'] || null, cl: h['content-length'] || null, ct: h['content-type'] || null, bytes });
    }
  });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 300)); });
  page.on('pageerror', (e) => errors.push(`pageerror ${String(e).slice(0, 300)}`));
  await page.evaluateOnNewDocument(observer);
  const t0 = Date.now();
  const resp = await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  let formatted = null;
  if (wantFormatted) {
    await page.waitForFunction(() => window.__firstFormatted !== null, { timeout: 30000 }).catch(() => {});
  } else {
    await page.waitForFunction(() => typeof window.__mdEngineInitMs === 'number', { timeout: 30000 }).catch(() => {});
  }
  const r = await page.evaluate(() => ({
    firstFormatted: window.__firstFormatted,
    initMs: typeof window.__mdEngineInitMs === 'number' ? window.__mdEngineInitMs : null,
    engineReadyMark: (performance.getEntriesByName('md-engine-ready')[0] || {}).startTime ?? null,
    engineNodes: document.querySelectorAll('[data-md-engine]').length,
    html: (document.querySelector('[data-md-engine]') || {}).outerHTML?.slice(0, 400) ?? null,
    jsTransfer: performance.getEntriesByType('resource').filter((e) => e.name.includes('/_next/static/chunks/')).reduce((a, e) => a + e.transferSize, 0),
    jsDecoded: performance.getEntriesByType('resource').filter((e) => e.name.includes('/_next/static/chunks/')).reduce((a, e) => a + e.decodedBodySize, 0),
    wasmEntry: performance.getEntriesByType('resource').filter((e) => e.name.endsWith('.wasm')).map((e) => ({ transfer: e.transferSize, encoded: e.encodedBodySize, decoded: e.decodedBodySize, start: e.startTime, end: e.responseEnd })),
  }));
  formatted = r.firstFormatted;
  await page.close();
  return { status: resp && resp.status(), wallMs: Date.now() - t0, ...r, formatted, responses: responses.filter((x) => x.url.endsWith('.wasm')), chunkResponses: responses.length, errors: errors.slice(0, 5) };
}

function stats(xs) {
  const v = xs.filter((x) => typeof x === 'number').sort((a, b) => a - b);
  if (!v.length) return null;
  const q = (p) => v[Math.min(v.length - 1, Math.ceil(p * v.length) - 1)];
  return { n: v.length, median: q(0.5), p95: q(0.95), min: v[0], max: v[v.length - 1] };
}

(async () => {
  const browser = await puppeteer.launch({ executablePath: chrome, headless: 'new', args: ['--no-sandbox', '--disable-background-networking'] });
  const out = { previewUrl, editorUrl, preview: [], editor: [] };
  try {
    for (let i = 0; i < loads; i += 1) {
      // Fresh context per load so no HTTP or compiled-wasm cache carries over.
      const ctx = await browser.createIncognitoBrowserContext();
      out.preview.push(await one(ctx, previewUrl, true));
      await ctx.close();
      const ctx2 = await browser.createIncognitoBrowserContext();
      out.editor.push(await one(ctx2, editorUrl, false));
      await ctx2.close();
    }
  } finally {
    await browser.close();
  }
  out.summary = {
    previewFirstFormattedMs: stats(out.preview.map((x) => x.firstFormatted)),
    previewInitMs: stats(out.preview.map((x) => x.initMs)),
    editorEngineReadyMs: stats(out.editor.map((x) => x.engineReadyMark)),
    editorInitMs: stats(out.editor.map((x) => x.initMs)),
    previewFormattedCount: out.preview.filter((x) => x.firstFormatted !== null).length,
    editorInitCount: out.editor.filter((x) => x.initMs !== null).length,
    previewJsTransfer: stats(out.preview.map((x) => x.jsTransfer)),
    editorJsTransfer: stats(out.editor.map((x) => x.jsTransfer)),
  };
  fs.writeFileSync(outFile, JSON.stringify(out, null, 1));
  console.log(JSON.stringify({ summary: out.summary, samplePreview: { ...out.preview[0], html: out.preview[0].html }, sampleEditor: out.editor[0] }, null, 1));
})().catch((e) => { console.error(e); process.exit(1); });
