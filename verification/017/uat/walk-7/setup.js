async (page) => {
  await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
  const ctx = page.context();
  await ctx.addInitScript({ path: '/usr/local/bin/hooks/agent-output/verification/017/uat/b1-capture-init-2.js' });
  const attach = (p, name) => {
    p.__log = { name, ws: [], errs: [] };
    p.on('websocket', ws => { const r = { url: ws.url().replace(/\?.*/, ''), created: new Date().toISOString(), closed: null }; p.__log.ws.push(r); ws.on('close', () => { r.closed = new Date().toISOString(); }); });
    p.on('pageerror', e => p.__log.errs.push([new Date().toISOString(), String(e).slice(0, 300)]));
  };
  attach(page, 'T');
  await page.reload();
  await page.waitForTimeout(2000);
  return await page.evaluate(() => [location.href, !!window.__cap, Object.keys(window.__cap||{}), localStorage.length]);
}
