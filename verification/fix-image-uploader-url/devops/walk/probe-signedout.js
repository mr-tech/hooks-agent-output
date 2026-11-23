const { chromium } = require('/home/dev/.npm/_npx/314abffa6aaf2cd1/node_modules/playwright-core');
const fs = require('fs');
(async () => {
  const out = process.argv[2];
  const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const res = [];
  for (const path of ['/message/m/new', '/message']) {
    await page.goto('https://hooks.gg' + path, { waitUntil: 'networkidle', timeout: 45000 }).catch(e => res.push({ path, err: String(e).slice(0, 200) }));
    await page.waitForTimeout(3000);
    const info = await page.evaluate(() => ({ url: location.href, title: document.title, text: document.body.innerText.slice(0, 600), imgs: [...document.querySelectorAll('img')].map(i => i.alt).slice(0, 10), buttons: [...document.querySelectorAll('button,a')].map(b => (b.innerText || b.ariaLabel || '').trim()).filter(Boolean).slice(0, 25) }));
    res.push({ path, ...info });
  }
  fs.writeFileSync(out, JSON.stringify(res, null, 1));
  await browser.close();
})().catch(e => { console.error(String(e).slice(0, 400)); process.exit(1); });
