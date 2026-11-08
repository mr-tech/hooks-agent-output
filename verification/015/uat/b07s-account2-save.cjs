// B-7 save leg: account 2 (own profile) on live hooks.gg saves one test message to "My Account", reloads the list
// to confirm it persists with no error, then deletes it. Posts nothing to Discord. Never touches mcp-chrome-313b550.
// Usage: DISPLAY=:0 node b07s-account2-save.cjs <profileDir> <phase: explore|save|delete> <outJson> [name]
const { chromium } = require('/home/dev/.npm/_npx/314abffa6aaf2cd1/node_modules/playwright');
const fs = require('fs');
const [profileDir, phase, outJson, name = 'uat-015 save-leg test'] = process.argv.slice(2);
const B = 'https://hooks.gg';
const out = { phase, name, steps: [], trpc: [] };
const log = (s) => { out.steps.push(new Date().toISOString().slice(11, 19) + ' ' + s); fs.writeFileSync(outJson, JSON.stringify(out, null, 1)); };
const visibleButtons = (p) => p.evaluate(() => Array.from(document.querySelectorAll('button, [role=menuitem]')).filter(b => b.getClientRects().length).map(b => (b.getAttribute('aria-label') || b.innerText || '').trim().replace(/\s+/g, ' ')).filter(Boolean));
const errs = (p) => p.evaluate(() => Array.from(document.querySelectorAll('[data-sonner-toast], .text-error, [role=alert]')).map(e => e.textContent.trim()).filter(Boolean));
(async () => {
  const ctx = await chromium.launchPersistentContext(profileDir, { channel: 'chrome', headless: false, viewport: { width: 1280, height: 900 } });
  const p = ctx.pages()[0] || await ctx.newPage();
  p.on('response', r => { if (/\/api\/trpc\//.test(r.url())) out.trpc.push(new Date().toISOString().slice(11, 19) + ' ' + r.request().method() + ' ' + r.url().split('/api/trpc/')[1].split('?')[0] + ' ' + r.status()); });
  try {
    if (phase === 'explore') {
      await p.goto(B + '/message/f/0'); await p.waitForTimeout(6000);
      out.listButtons = await visibleButtons(p);
      await p.goto(B + '/message/m/new'); await p.waitForTimeout(6000);
      out.editorButtons = await visibleButtons(p);
      const file = p.getByRole('button', { name: 'File', exact: true });
      if (await file.count()) { await file.click(); await p.waitForTimeout(600); out.fileMenu = await visibleButtons(p); }
      await p.screenshot({ path: outJson.replace(/\.json$/, '.png') });
    }
    if (phase === 'explore2') {
      await p.goto(B + '/message/f/0'); await p.waitForTimeout(6000);
      await p.getByRole('button', { name: 'new message' }).click(); await p.waitForTimeout(1500);
      out.afterNew = { url: p.url(), buttons: await visibleButtons(p), dialog: (await p.evaluate(() => document.querySelector('[role=dialog]')?.innerText || '')).slice(0, 400),
        inputs: await p.evaluate(() => Array.from(document.querySelectorAll('input, textarea')).filter(i => i.getClientRects().length).map(i => (i.getAttribute('aria-label') || i.placeholder || i.name || i.type))) };
      await p.getByRole('menuitem', { name: 'New Message' }).or(p.getByRole('button', { name: 'New Message', exact: true })).first().click(); await p.waitForTimeout(3000);
      out.afterNewMessage = { url: p.url(), buttons: await visibleButtons(p), dialog: (await p.evaluate(() => document.querySelector('[role=dialog]')?.innerText || '')).slice(0, 400),
        inputs: await p.evaluate(() => Array.from(document.querySelectorAll('input, textarea')).filter(i => i.getClientRects().length).map(i => (i.getAttribute('aria-label') || i.placeholder || i.name || i.type))) };
      const sb = p.getByRole('button', { name: 'Save', exact: true });
      out.saveButtonCount = await sb.count();
      await p.screenshot({ path: outJson.replace(/\.json$/, '.png') });
    }
    if (phase === 'verify') {
      await p.goto(B + '/message/f/0'); await p.waitForTimeout(5000); await p.reload(); await p.waitForTimeout(6000);
      out.listText = (await p.evaluate(() => document.body.innerText)).slice(0, 500); out.listErrors = await errs(p);
      out.listLinks = await p.evaluate(() => Array.from(document.querySelectorAll('a[href*="/message/m/"]')).map(a => a.getAttribute('href')));
      out.listButtons = await visibleButtons(p);
      await p.screenshot({ path: outJson.replace(/\.json$/, '-list.png') });
      await p.goto(B + '/message/m/' + process.argv[6] + '/edit'); await p.waitForTimeout(6000);
      out.editUrl = p.url(); out.editErrors = await errs(p);
      out.messageName = await p.evaluate(() => document.querySelector('input[aria-label="Message Name"], input[placeholder="Message Name"]')?.value);
      await p.getByRole('button', { name: 'File', exact: true }).click(); await p.waitForTimeout(600);
      out.fileMenu = await visibleButtons(p);
      await p.keyboard.press('Escape');
    }
    if (phase === 'save') {
      await p.goto(B + '/message/m/new'); await p.waitForTimeout(6000);
      await p.getByRole('button', { name: 'File', exact: true }).click(); await p.waitForTimeout(500);
      await p.getByRole('button', { name: /^Save( as\.\.\.)?$/ }).first().click(); await p.waitForTimeout(1500);
      out.dialogText = (await p.evaluate(() => document.querySelector('[role=dialog]')?.innerText || '')).slice(0, 400);
      const nameBox = p.locator('[role=dialog] input[type=text], [role=dialog] input:not([type])').first();
      if (await nameBox.count()) { await nameBox.fill(name); log('name filled'); }
      out.saveTo = (await p.evaluate(() => document.querySelector('[role=dialog]')?.innerText || '')).match(/My Account/) ? 'My Account shown' : 'My Account not shown';
      await p.locator('[role=dialog] button:visible', { hasText: /^Save$/ }).last().click(); await p.waitForTimeout(5000);
      out.afterSaveUrl = p.url(); out.afterSaveErrors = await errs(p); log('saved');
      await p.goto(B + '/message/f/0'); await p.waitForTimeout(6000);
      await p.reload(); await p.waitForTimeout(6000);
      out.listText = (await p.evaluate(() => document.body.innerText)).slice(0, 600);
      out.persisted = out.listText.includes(name); out.listErrors = await errs(p); log('list reloaded');
      await p.screenshot({ path: outJson.replace(/\.json$/, '.png') });
    }
    if (phase === 'delete') {
      const id = process.argv[6];
      await p.goto(B + '/message/m/' + id + '/edit'); await p.waitForTimeout(6000);
      await p.getByRole('button', { name: 'File', exact: true }).click(); await p.waitForTimeout(600);
      await p.getByRole('button', { name: 'Save', exact: true }).click(); await p.waitForTimeout(4000);
      out.explicitSaveErrors = await errs(p); log('explicit File > Save done');
      await p.goto(B + '/message/f/0'); await p.waitForTimeout(6000);
      await p.getByRole('button', { name: 'message actions' }).first().click(); await p.waitForTimeout(800);
      out.actionsMenu = await visibleButtons(p);
      const del = p.getByRole('menuitem', { name: /Delete/ }).or(p.getByRole('button', { name: /^Delete/ })).first();
      await del.click(); await p.waitForTimeout(1200);
      out.confirmDialog = (await p.evaluate(() => document.querySelector('[role=dialog], [role=alertdialog]')?.innerText || '')).slice(0, 300);
      const confirm = p.locator('[role=dialog] button:visible, [role=alertdialog] button:visible', { hasText: /^(Delete|Confirm|Yes)/ }).last();
      if (await confirm.count()) { await confirm.click(); await p.waitForTimeout(3000); log('confirm clicked'); }
      await p.reload(); await p.waitForTimeout(6000);
      out.afterText = (await p.evaluate(() => document.body.innerText)).slice(0, 400);
      out.afterLinks = await p.evaluate(() => Array.from(document.querySelectorAll('a[href*="/message/m/"]')).map(a => a.getAttribute('href')));
      out.afterErrors = await errs(p);
      await p.screenshot({ path: outJson.replace(/\.json$/, '.png') });
    }
    log('done');
  } catch (e) { out.error = String(e).slice(0, 300); log('error'); try { await p.screenshot({ path: outJson.replace(/\.json$/, '-error.png') }); } catch {} }
  finally { await ctx.close(); fs.writeFileSync(outJson, JSON.stringify(out, null, 1)); }
})();
