// Real Chrome run: ConfirmationDialog (File > Clear) and ImageUploader (embed image) cells a-d. Inside unshare -rn.
const { chromium } = require('/home/dev/.npm/_npx/314abffa6aaf2cd1/node_modules/playwright-core');
const http = require('http');
const OUT = process.env.OUT;
const URL = 'http://127.0.0.1:3917/message/m/0/edit';
// 1x1 PNG served from loopback for the ImageUploader's image check
const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64');
const imgSrv = http.createServer((q, r) => { r.writeHead(200, { 'content-type': 'image/png' }); r.end(PNG); }).listen(8099, '127.0.0.1');
const IMG = 'http://127.0.0.1:8099/a.png';
const active = (p) => p.evaluate(() => { const a = document.activeElement; return a ? `${a.tagName}:${(a.innerText||a.getAttribute('aria-label')||'').trim().slice(0,30)}` : 'null'; });
async function tabTo(p, label) {
  const trail = [];
  for (let i = 0; i < 14; i++) { const a = await active(p); trail.push(a); if (a === `BUTTON:${label}`) return { ok: true, trail }; await p.keyboard.press('Tab'); await p.waitForTimeout(150); }
  trail.push(await active(p)); return { ok: false, trail };
}
const surfaces = {
  ConfirmationDialog: {
    confirm: 'Clear', cancel: 'Cancel',
    observe: (p) => p.evaluate(() => document.body.innerText.includes('Welcome to Hooks.gg, the ultimate') ? 'content-present' : 'content-cleared'),
    open: async (p) => { await p.hover('#menu-file'); await p.waitForTimeout(500); await p.click('#menu-file'); await p.waitForTimeout(700); await p.getByRole('button', { name: 'Clear', exact: true }).first().click(); await p.getByText('Clear Message').waitFor({ timeout: 5000 }); await p.waitForTimeout(700); },
    gone: (p) => p.locator('p:has-text("Are you sure you want to clear this message?"):visible').count().then((n) => n === 0),
  },
  ImageUploader: {
    confirm: 'Save', cancel: 'Cancel',
    observe: (p) => p.evaluate((u) => String(document.querySelectorAll(`img[alt="embed main"][src="${u}"]`).length) + ' embed-image(s) set', IMG),
    open: async (p) => {
      await p.getByRole('button', { name: 'edit embed image' }).first().click();
      const f = p.locator('input[inputmode="url"]:visible').first(); await f.waitFor({ timeout: 5000 }); await f.fill(IMG);
      await p.getByAltText('upload preview').waitFor({ timeout: 8000 }); await p.waitForTimeout(500);
    },
    gone: (p) => p.locator('h2:has-text("Enter Image URL"):visible').count().then((n) => n === 0),
  },
};
(async () => {
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox'] });
  for (const [name, S] of Object.entries(surfaces)) {
    for (const c of ['a', 'b', 'c', 'd']) {
      const ctx = await b.newContext({ viewport: { width: 1400, height: 1000 } }); const p = await ctx.newPage(); p.setDefaultTimeout(10000);
      const rec = { surface: name, cell: c };
      try {
        await p.goto(URL, { waitUntil: 'load', timeout: 120000 }); await p.waitForTimeout(3000);
        const later = p.getByText("I'll do it later"); if (await later.count()) { await later.click(); await p.waitForTimeout(800); }
        rec.before = await S.observe(p);
        await S.open(p); rec.beforeOpen = await S.observe(p);
        let focus, act;
        if (c === 'a') { focus = await tabTo(p, S.cancel); act = () => p.keyboard.press('Enter'); }
        if (c === 'b') { focus = await tabTo(p, S.confirm); act = () => p.keyboard.press('Enter'); }
        if (c === 'c') { await p.evaluate(() => document.activeElement.blur()); const f = await active(p); focus = { ok: f.startsWith('BODY'), trail: [f] }; act = () => p.keyboard.press('Enter'); }
        if (c === 'd') { focus = { ok: true, trail: ['pointer'] }; act = () => p.getByRole('button', { name: S.cancel, exact: true }).click(); }
        rec.focusAsserted = focus.ok; rec.focusTrail = focus.trail;
        await p.screenshot({ path: `${OUT}/${name}-cell-${c}-before-press.png` });
        await act(); await p.waitForTimeout(1500);
        rec.after = await S.observe(p); rec.dialogClosed = await S.gone(p);
        await p.screenshot({ path: `${OUT}/${name}-cell-${c}-after-press.png` });
      } catch (e) { rec.error = String(e.message).slice(0, 300); }
      console.log(JSON.stringify(rec));
      await ctx.close();
    }
  }
  await b.close(); imgSrv.close();
})();
