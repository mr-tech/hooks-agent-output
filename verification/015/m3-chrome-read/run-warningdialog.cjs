// Real Chrome run, WarningDialog ("Delete Embed?") cells a-d. Run inside unshare -rn via server.sh.
const { chromium } = require('/home/dev/.npm/_npx/314abffa6aaf2cd1/node_modules/playwright-core');
const OUT = process.env.OUT;
const URL = 'http://127.0.0.1:3917/message/m/0/edit';
const embeds = (p) => p.locator('button[aria-label="Embed actions"]').count();
const sig = (p) => p.evaluate(() => document.body.innerText.includes('Server Rules') ? 'has-Server-Rules' : 'no-Server-Rules');
const active = (p) => p.evaluate(() => { const a = document.activeElement; return a ? `${a.tagName}:${(a.innerText||a.getAttribute('aria-label')||'').trim().slice(0,30)}` : 'null'; });
async function fresh(p) {
  // each cell runs in a brand-new browser context (clean storage) so every cell starts from the same state
  await p.goto(URL, { waitUntil: 'load', timeout: 120000 });
  await p.waitForTimeout(3000);
  const later = p.getByText("I'll do it later"); if (await later.count()) { await later.click(); await p.waitForTimeout(800); }
  // state persists across reloads in this app: restore to 2 embeds via the Add Embed button
  for (let i = 0; i < 4 && (await embeds(p)) < 2; i++) { await p.getByRole('button', { name: 'Add Embed' }).click(); await p.waitForTimeout(600); }
}
async function openDelete(p) {
  await p.locator('button[aria-label="Embed actions"]').first().click();
  await p.getByRole('menuitem', { name: 'Delete' }).click();
  await p.getByText('Delete Embed?').waitFor({ timeout: 5000 });
  await p.waitForTimeout(700);
}
async function tabTo(p, label) {
  const trail = [];
  for (let i = 0; i < 12; i++) { const a = await active(p); trail.push(a); if (a === `BUTTON:${label}`) return { ok: true, trail }; await p.keyboard.press('Tab'); await p.waitForTimeout(150); }
  trail.push(await active(p)); return { ok: false, trail };
}
(async () => {
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox'] });
  let p; const log = [];
  const cells = {
    a: async () => { const t = await tabTo(p, 'Cancel'); return { focus: t, act: async () => p.keyboard.press('Enter') }; },
    b: async () => { const t = await tabTo(p, 'Delete'); return { focus: t, act: async () => p.keyboard.press('Enter') }; },
    c: async () => { await p.evaluate(() => document.activeElement.blur()); const f = await active(p); return { focus: { ok: f === 'BODY:' || f.startsWith('BODY'), trail: [f] }, act: async () => p.keyboard.press('Enter') }; },
    d: async () => { return { focus: { ok: true, trail: ['pointer'] }, act: async () => p.getByRole('button', { name: 'Cancel' }).click() }; },
  };
  for (const c of ['a', 'b', 'c', 'd']) {
    if (p) await p.context().close(); const ctx = await b.newContext({ viewport: { width: 1400, height: 1000 } }); p = await ctx.newPage(); p.on('pageerror', (e) => log.push('pageerror ' + e.message.slice(0, 150)));
    await fresh(p); const before0 = await embeds(p);
    await openDelete(p); const before = await embeds(p); const sigB = await sig(p);
    const r = await cells[c]();
    await p.screenshot({ path: `${OUT}/cell-${c}-before-press.png` });
    await r.act(); await p.waitForTimeout(1200);
    const after = await embeds(p); const sigA = await sig(p);
    const dialogOpen = await p.getByText('Delete Embed?').count();
    await p.screenshot({ path: `${OUT}/cell-${c}-after-press.png` });
    console.log(JSON.stringify({ cell: c, embedsOnLoad: before0, embedsBefore: before, focusAsserted: r.focus.ok, focusTrail: r.focus.trail, embedsAfter: after, sigBefore: sigB, sigAfter: sigA, dialogStillInDom: dialogOpen, outcome: after < before ? 'REMOVED' : 'SURVIVED' }));
  }
  console.log(log.join('\n')); await b.close();
})();
