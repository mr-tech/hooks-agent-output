// usage: set page.__target = '<id>' before calling via code that reads it; this file is a function template
async (page) => {
  const target = page.__target; const log = [];
  const t = () => new Date().toISOString();
  const snap = async (label) => { log.push([t(), label, page.url(), await page.evaluate(() => [window.__qaDoc, window.__cap.sockets.map(s=>[s[0],s[1].slice(0,30),s[2],s[3],s[4]])]).catch(e=>String(e))]); };
  await snap('start');
  await page.getByRole('button', { name: 'user menu' }).click();
  await page.locator('a[href="/message"]').filter({ hasText: 'Servers' }).click();
  await page.waitForURL('**/message', { timeout: 15000 }); await page.waitForTimeout(2500); await snap('at /message');
  const acct = page.locator('a[href="/message/f/0"]').first();
  log.push(['links@/message', await page.evaluate(() => [...document.querySelectorAll('a')].map(a=>a.getAttribute('href')+'|'+a.innerText.trim().slice(0,30)).filter(x=>x.includes('/message/f/')))]);
  await acct.click();
  await page.waitForURL('**/message/f/0', { timeout: 15000 }); await page.waitForTimeout(2500); await snap('at /message/f/0');
  log.push(['links@f/0', await page.evaluate(() => [...document.querySelectorAll('a')].map(a=>a.getAttribute('href')+'|'+a.innerText.trim().slice(0,30)).filter(x=>x.includes('/message/m/')))]);
  await page.locator(`a[href^="/message/m/${target}"]`).first().click();
  await page.waitForTimeout(3000); await snap('after message link');
  if (!/\/edit$/.test(page.url())) { await page.locator(`a[href="/message/m/${target}/edit"]`).first().click(); await page.waitForTimeout(3000); await snap('after Edit link'); }
  await page.waitForTimeout(2000); await snap('final');
  log.push(['pw ws', page.__log.ws.map(w=>[w.url.slice(0,30),w.created,w.closed])]);
  return log;
}
