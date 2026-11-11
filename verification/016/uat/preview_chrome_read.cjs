// B-5 instrument: open each /preview URL in a fresh headless Chrome page and read the validation
// chrome the route renders, with real CSS. Usage:
//   node preview_chrome_read.cjs <preview-urls.json> <tip|base> <out.json> [playwright module dir]
// Each read waits for the editor tree (`.discord-visualizer` or the message text) and then 1.5 s more,
// so a page still compiling under `next dev` is retried rather than read empty.
const fs = require('fs');
const path = require('path');
const [, , urlsFile, side, outFile, pwDir] = process.argv;
const { chromium } = require(pwDir || 'playwright');

(async () => {
  const urls = JSON.parse(fs.readFileSync(urlsFile, 'utf8'));
  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true });
  const out = { side, read_at: new Date().toISOString(), results: {} };
  for (const [key, v] of Object.entries(urls)) {
    const page = await browser.newPage({ viewport: { width: 1350, height: 900 } });
    let rendered = false;
    for (let attempt = 0; attempt < 3 && !rendered; attempt++) {
      await page.goto(v[side], { waitUntil: 'load', timeout: 120000 });
      rendered = await page.waitForFunction(
        () => document.body.innerText.includes('Captain Hook') || document.body.innerText.includes('hi'),
        null, { timeout: 30000 },
      ).then(() => true, () => false);
    }
    await page.waitForTimeout(1500);
    const r = await page.evaluate(() => {
      const cls = (e) => (typeof e.className === 'string' ? e.className : e.className.baseVal || '');
      const tokens = (e) => cls(e).split(/\s+/);
      return {
        href_tail: location.pathname + ' (data len ' + (new URLSearchParams(location.search).get('data') || '').length + ')',
        bodyTextHead: document.body.innerText.slice(0, 60),
        ERR: [...document.querySelectorAll('.text-error')].map((e) => e.textContent.trim()),
        activeRing: [...document.querySelectorAll('*')].filter((e) => tokens(e).includes('!ring-red-500')).length,
        erroringPrefixedRing: [...document.querySelectorAll('*')].filter((e) => tokens(e).includes('erroring:!ring-red-500')).length,
        ERRSTATE: document.querySelectorAll('[data-erroring-state="true"]').length,
        TOOLONG: document.body.innerText.includes('Too long.'),
        textRed: [...document.querySelectorAll('*')].filter((e) => tokens(e).some((t) => /^text-red-/.test(t))).length,
      };
    });
    r.rendered = rendered;
    out.results[key] = r;
    await page.screenshot({ path: path.join(path.dirname(outFile), `c-${key}-${side}.png`) });
    await page.close();
  }
  await browser.close();
  fs.writeFileSync(outFile, JSON.stringify(out, null, 1));
  for (const [k, r] of Object.entries(out.results)) console.log(side, k, JSON.stringify({ rendered: r.rendered, ERR: r.ERR, activeRing: r.activeRing, ERRSTATE: r.ERRSTATE, TOOLONG: r.TOOLONG, textRed: r.textRed }));
})().catch((e) => { console.error(e); process.exit(1); });
