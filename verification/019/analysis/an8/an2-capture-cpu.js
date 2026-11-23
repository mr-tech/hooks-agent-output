// AN-2 generator-capture probe (analysis 019). Mirrors preview-image-generator@8512a1d
// src/getPool.ts (headless 'new', minimal_args) and src/generateImage.ts:generateMessagePreviewImage
// (viewport, goto networkidle0, jpeg q90), with puppeteer 21.1.0 and its bundled Chrome 116.
// AN-8 limb 5 copy (analysis 019): as an2/an2-capture.js, plus CDP Emulation.setCPUThrottlingRate on each page before goto.
// usage: node an2-capture-cpu.js <puppeteer-dir> <base-url> <per-message> <mode warm|cold> <out-dir> <cpu rate>
'use strict';
const fs = require('fs');
const path = require('path');

const [pptrDir, base, perArg, mode, outDir, rateArg] = process.argv.slice(2);
const rate = Number(rateArg);
const puppeteer = require(pptrDir);
const per = Number(perArg);

const minimal_args = [
  '--autoplay-policy=user-gesture-required', '--disable-background-networking', '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows', '--disable-breakpad', '--disable-client-side-phishing-detection',
  '--disable-component-update', '--disable-default-apps', '--disable-dev-shm-usage', '--disable-domain-reliability',
  '--disable-extensions', '--disable-features=AudioServiceOutOfProcess', '--disable-hang-monitor',
  '--disable-ipc-flooding-protection', '--disable-notifications', '--disable-offer-store-unmasked-wallet-cards',
  '--disable-popup-blocking', '--disable-print-preview', '--disable-prompt-on-repost', '--disable-renderer-backgrounding',
  '--disable-setuid-sandbox', '--disable-speech-api', '--disable-sync', '--hide-scrollbars', '--ignore-gpu-blacklist',
  '--metrics-recording-only', '--mute-audio', '--no-default-browser-check', '--no-first-run', '--no-pings', '--no-sandbox',
  '--no-zygote', '--password-store=basic', '--use-gl=swiftshader', '--use-mock-keychain',
];

const messages = [
  { content: '**bold** [masked](https://example.com) ||spoiler||' },
  { content: 'Intro line\n**release notes** for [the site](https://hooks.gg/docs) — ||hidden detail|| and more text after it' },
  { content: '# Heading\n- **item one**\n- see [link](https://example.org/a?b=c)\n> quoted ||secret||\n```js\nconst x = 1;\n```' },
];

const observer = `(() => {
  window.__firstFormatted = null;
  const check = () => {
    if (window.__firstFormatted === null) {
      const root = document.querySelector('[data-md-engine]');
      if (root && root.querySelector('strong') && root.querySelector('a') && root.querySelector('[data-md-spoiler]')) {
        window.__firstFormatted = performance.now();
      }
    }
  };
  new MutationObserver(check).observe(document, { childList: true, subtree: true });
})();`;

async function capture(browser, data, file) {
  const page = await browser.newPage();
  try {
    const cdp = await page.target().createCDPSession();
    await cdp.send('Emulation.setCPUThrottlingRate', { rate });
    await page.evaluateOnNewDocument(observer);
    await page.setViewport({ width: 720, height: 840, deviceScaleFactor: 1 / 3.75 });
    const url = new URL(`${base}/preview`);
    url.searchParams.append('data', JSON.stringify(data));
    const response = await page.goto(url.toString(), { waitUntil: 'networkidle0' });
    const status = response ? response.status() : 0;
    const gotoResolvedAt = await page.evaluate(() => performance.now());
    const img = await page.screenshot({ type: 'jpeg', quality: 90 });
    const html = await page.content();
    const t = await page.evaluate(() => ({ firstFormatted: window.__firstFormatted, now: performance.now() }));
    fs.writeFileSync(file, img);
    const formattedInDom = /data-md-engine="wasm"/.test(html) && /<strong>/.test(html) && /<a href=/.test(html) && /data-md-spoiler/.test(html);
    return { status, formattedInDom, firstFormatted: t.firstFormatted, gotoResolvedAt, marginMs: t.firstFormatted === null ? null : gotoResolvedAt - t.firstFormatted, jpegBytes: img.length };
  } finally {
    await page.close();
  }
}

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const launch = () => puppeteer.launch({ headless: 'new', args: minimal_args });
  let browser = await launch();
  const rows = [];
  try {
    for (let m = 0; m < messages.length; m += 1) {
      for (let i = 0; i < per; i += 1) {
        if (mode === 'cold') { await browser.close(); browser = await launch(); }
        const file = path.join(outDir, `m${m}-${String(i).padStart(2, '0')}.jpeg`);
        let r;
        try { r = await capture(browser, messages[m], file); } catch (e) { r = { error: String(e).slice(0, 300) }; }
        rows.push({ message: m, i, ...r });
      }
    }
  } finally {
    await browser.close();
  }
  const ok = rows.filter((r) => r.formattedInDom).length;
  const margins = rows.map((r) => r.marginMs).filter((x) => typeof x === 'number').sort((a, b) => a - b);
  const summary = { mode, cpuThrottlingRate: rate, captures: rows.length, formattedInDom: ok, errors: rows.filter((r) => r.error).length, chrome: await (async () => { const b = await launch(); const v = await b.version(); await b.close(); return v; })(), marginMs: margins.length ? { min: margins[0], median: margins[Math.floor(margins.length / 2)], max: margins[margins.length - 1] } : null };
  fs.writeFileSync(path.join(outDir, 'rows.json'), JSON.stringify({ summary, rows }, null, 1));
  console.log(JSON.stringify(summary, null, 1));
})().catch((e) => { console.error(e); process.exit(1); });
