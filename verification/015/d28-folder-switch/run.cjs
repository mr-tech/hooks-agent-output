// Real Chrome: does the NewMessageModal instance survive a client navigation /message/f/111 -> /message/f/222?
// Sentinel: text typed into the modal's own state (its webhook URL field on the Webhook tab) while it is open.
const { chromium } = require('/home/dev/.npm/_npx/314abffa6aaf2cd1/node_modules/playwright-core');
const OUT = process.env.OUT;
const BASE = `http://127.0.0.1:${process.env.PORT}`;
(async () => {
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1400, height: 1000 } });
  const p = await ctx.newPage();
  const log = [];
  p.on('pageerror', (e) => log.push('pageerror ' + e.message.slice(0, 200)));
  await p.goto(`${BASE}/message/f/111`, { waitUntil: 'load', timeout: 180000 });
  await p.waitForTimeout(4000);
  await p.screenshot({ path: `${OUT}/folder-111-loaded.png` });
  const body = (await p.evaluate(() => document.body.innerText)).slice(0, 400).replace(/\n+/g, ' | ');
  console.log('body at /message/f/111:', body);
  const buttons = await p.locator('button').allInnerTexts();
  console.log('buttons:', JSON.stringify(buttons.slice(0, 20)));
  console.log('log', JSON.stringify(log));
  await b.close();
})();
