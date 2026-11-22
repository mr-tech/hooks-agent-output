const { chromium } = require('/home/dev/.cache/qa-083-harness/node_modules/playwright');
const fs = require('fs');
const D = __dirname;
(async () => {
  const b = await chromium.launch({ headless: true });
  const page = await b.newPage({ viewport: { width: 1200, height: 900 } });
  page.setDefaultTimeout(20000);
  const cons = [];
  page.on('console', m => { if (['error','warning'].includes(m.type())) cons.push({type:m.type(), text:m.text()}); });
  page.on('pageerror', e => cons.push({type:'pageerror', text:String(e)}));
  const out = { url: null, steps: {}, console: cons };
  let found = false;
  try { await page.goto('https://hooks.gg/message/m/new',{waitUntil:'domcontentloaded',timeout:45000});
    await page.waitForTimeout(8000);
    await page.getByText('Ok, Got it.').click().catch(()=>{});
    await page.getByText('Welcome to').first().click();
    await page.waitForSelector('[data-slate-editor="true"]',{state:'attached',timeout:45000}); out.url=page.url(); found=true;
  } catch(e){ out.fail=String(e).slice(0,200); }
  if (!found) { fs.writeFileSync(D+'/results.json', JSON.stringify(out,null,1)); await page.screenshot({path:D+'/noeditor.png'}); await b.close(); return; }
  const eds = await page.$$('[data-slate-editor="true"]');
  out.editorCount = eds.length;
  const ed = page.locator('[data-slate-editor="true"]').first();
  const read = () => page.evaluate(() => {
    const root = document.querySelector('[data-slate-editor="true"]');
    return [...root.querySelectorAll('[data-slate-string],[data-slate-zero-width]')].map(s => {
      const chain = []; let e = s.parentElement;
      while (e && e !== root) { chain.push({tag:e.tagName, cls:e.className, color:getComputedStyle(e).color, fw:getComputedStyle(e).fontWeight, fs:getComputedStyle(e).fontStyle}); e = e.parentElement; }
      return { text: s.textContent, ownColor: getComputedStyle(s).color, chain };
    });
  });
  async function line(name, parts) {
    await ed.click(); await page.keyboard.press('Control+A'); await page.keyboard.press('Delete');
    for (const p of parts) { if (p === 'NL') await page.keyboard.press('Enter'); else if (p==='SNL') await page.keyboard.press('Shift+Enter'); else await page.keyboard.type(p); }
    await page.waitForTimeout(500);
    out.steps[name] = await read();
    await ed.screenshot({ path: `${D}/${name}.png` });
  }
  try {
    await line('C0', ['**x** y']);
    await line('L1', ['***ab*** cd']);
    await line('L2', ['# **a**']);
    await line('L3', ['**a https://x.y**']);
    await line('L4', ['```js','SNL','const a = 1;','SNL','```']);
    await line('L5', ['```js','SNL','const b = `x ${a}`;']);
    await line('L4_enter', ['```js','NL','const a = 1;','NL','```']);
  } catch (e) { out.err = String(e); await page.screenshot({path:D+'/err.png'}); }
  fs.writeFileSync(D+'/results.json', JSON.stringify(out,null,1));
  await b.close();
})();
