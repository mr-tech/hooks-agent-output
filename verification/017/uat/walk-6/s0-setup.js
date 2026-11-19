async (page) => {
  const ctx = page.context();
  await ctx.addInitScript({ path: '/usr/local/bin/hooks/agent-output/verification/017/uat/b1-capture-init.js' });
  await page.goto('http://127.0.0.1:3000/robots.txt');
  const r = await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); return [location.origin, localStorage.length, sessionStorage.length]; });
  return r;
}
