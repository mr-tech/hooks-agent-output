const { chromium } = require('/home/dev/.cache/qa-083-harness/node_modules/playwright');
const fs = require('fs');
const D = __dirname;
(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ viewport: { width: 1200, height: 900 }, permissions: ['clipboard-read','clipboard-write'] });
  await ctx.grantPermissions(['clipboard-read','clipboard-write'], { origin: 'https://hooks.gg' });
  const page = await ctx.newPage();
  page.setDefaultTimeout(20000);
  let cons = [];
  page.on('console', m => { if (['error','warning'].includes(m.type())) cons.push({type:m.type(), text:m.text().slice(0,200)}); });
  page.on('pageerror', e => cons.push({type:'pageerror', text:String(e).slice(0,200)}));
  let found = false;
  try { await page.goto('https://hooks.gg/message/m/new',{waitUntil:'domcontentloaded',timeout:45000});
    await page.waitForTimeout(8000);
    await page.getByText('Ok, Got it.').click().catch(()=>{});
    await page.getByText('Welcome to').first().click();
    await page.waitForSelector('[data-slate-editor="true"]',{state:'attached',timeout:45000}); found=true;
  } catch(e){ fs.writeFileSync(D+'/noeditor.json', JSON.stringify({url:page.url(),title:await page.title(),fail:String(e).slice(0,200)})); await b.close(); return; }
  const ed = page.locator('[data-slate-editor="true"]').first();
  const read = () => page.evaluate(() => {
    const root = document.querySelector('[data-slate-editor="true"]');
    const lines = [...root.querySelectorAll('[data-slate-node="element"]')].filter(e=>e.parentElement===root||e.parentElement.parentElement===root||true).map(l => ({text:l.textContent, emojiCount:l.querySelectorAll('img.discord-visualizer__emoji').length, alts:[...l.querySelectorAll('img.discord-visualizer__emoji')].map(i=>i.alt)}));
    return { url: location.href, lines, innerText: root.innerText };
  });
  async function clear(){ await ed.click(); await page.keyboard.press('Control+A'); await page.keyboard.press('Delete'); }
  async function paste(name, text){
    cons = [];
    await clear();
    await page.evaluate(t => navigator.clipboard.writeText(t), text);
    await ed.click();
    await page.keyboard.press('Control+V');
    await page.waitForTimeout(600);
    const r = await read(); r.pasted=text; r.console=cons;
    fs.writeFileSync(`${D}/${name}.json`, JSON.stringify(r,null,1));
    await ed.screenshot({ path: `${D}/${name}.png` });
  }
  try {
    await paste('S1','x🙂 abcdefghijklmnopq');
    await paste('S2','wow :ok🙂 hi');
    // S3
    cons = [];
    await clear();
    await page.keyboard.type('```js'); await page.keyboard.press('Shift+Enter'); await page.keyboard.type('x = 1;');
    const btns = await page.evaluate(()=>[...document.querySelectorAll('button,[role=button]')].map(e=>(e.getAttribute('aria-label')||e.title||e.textContent||'').trim().slice(0,40)).filter(Boolean));
    fs.writeFileSync(D+'/S3-buttons.json', JSON.stringify(btns,null,1));
    await page.screenshot({path:D+'/S3-before.png'});
  } catch (e) { fs.writeFileSync(D+'/err.json', JSON.stringify({err:String(e)})); await page.screenshot({path:D+'/err.png'}); }
  await b.close();
})();
