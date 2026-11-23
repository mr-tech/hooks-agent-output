// AN-8 G-3 probe, early-close variant of pageerror-prod.js (analysis 019): load a page N times, each in a fresh browser context (no cookies, no storage),
// and record every pageerror with its name, message and stack, plus console errors. Reads only; drives nothing.
// usage: node pageerror-prod.js <playwright-core dir> <url> <loads> <out.json> <chrome binary> <settle ms after load>
'use strict';
const fs = require('fs');
const [pwDir, url, loadsArg, outFile, chromeBin, settleMs] = process.argv.slice(2);
const { chromium } = require(pwDir);
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: chromeBin });
  const out = { url, browser: browser.version(), startedAt: new Date().toISOString(), loads: [] };
  for (let i = 0; i < Number(loadsArg); i++) {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    const pageerrors = []; const consoleErrors = [];
    page.on('pageerror', (e) => pageerrors.push({ name: e.name, message: e.message, stack: String(e.stack || '').slice(0, 3000) }));
    page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push({ text: m.text().slice(0, 500), loc: m.location() }); });
    const t0 = Date.now(); let status = null; let navError = null;
    try { const r = await page.goto(url, { waitUntil: 'load', timeout: 45000 }); status = r && r.status(); } catch (e) { navError = String(e).slice(0, 300); }
    await page.waitForTimeout(Number(settleMs)); // close soon after load, as devops's AN-1 driver did on the editor page
    out.loads.push({ i, status, navError, finalUrl: page.url(), ms: Date.now() - t0, pageerrors, consoleErrors });
    await page.close(); await ctx.close();
  }
  await browser.close();
  out.withPageerror = out.loads.filter((l) => l.pageerrors.length).length;
  fs.writeFileSync(outFile, JSON.stringify(out, null, 1));
  console.log(JSON.stringify({ loads: out.loads.length, withPageerror: out.withPageerror, statuses: out.loads.map((l) => l.status) }));
})().catch((e) => { console.error(e); process.exit(1); });
