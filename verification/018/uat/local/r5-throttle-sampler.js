// R5 sampler, run by browser_run_code_unsafe (Playwright `page`). Throttles the network through CDP, starts on /message, then client-navigates to the
// editor path, and samples every 100 ms for 20 s: is the page shell present, is a Slate editor present.
// Expected (004 Assumptions 1, 5): once the shell has painted it never disappears while the lazy editor is pending.
async (page) => {
  const target = '/message/m/0/edit';
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 600, downloadThroughput: 40 * 1024, uploadThroughput: 40 * 1024 });
  // Start inside the same layout, fully loaded and unthrottled-in-effect for its own chunks, then navigate client-side so a
  // pending lazy child could only suspend into an existing tree (a full load paints the server HTML regardless).
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
  await page.goto('http://127.0.0.1:3000/message', { waitUntil: 'networkidle' });
  const shellBefore = await page.evaluate(() => !!document.querySelector('header, nav, aside'));
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 600, downloadThroughput: 40 * 1024, uploadThroughput: 40 * 1024 });
  const how = await page.evaluate((t) => {
    const a = [...document.querySelectorAll('a[href]')].find((x) => x.getAttribute('href') === t || x.getAttribute('href').endsWith('/edit'));
    if (a) { a.click(); return 'link ' + a.getAttribute('href'); }
    if (window.next && window.next.router) { window.next.router.push(t); return 'router.push'; }
    return 'none';
  }, target);
  const samples = [];
  const t0 = Date.now();
  while (Date.now() - t0 < 20000) {
    samples.push(await page.evaluate(() => ({
      t: Math.round(performance.now()),
      shell: !!document.querySelector('header, nav, aside'),
      bodyTextLen: document.body ? document.body.innerText.length : 0,
      slate: document.querySelectorAll('[data-slate-editor]').length,
    })).catch(() => ({ t: -1, err: true })));
    await page.waitForTimeout(100);
  }
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
  const firstShell = samples.findIndex((s) => s.shell);
  const firstSlate = samples.findIndex((s) => s.slate > 0);
  const shellLostAfterPaint = firstShell >= 0 && samples.slice(firstShell).some((s) => !s.err && !s.shell);
  const pendingWithShell = samples.filter((s) => s.shell && s.slate === 0).length;
  return { shellBefore, how, n: samples.length, firstShell, firstSlate, pendingWithShell, shellLostAfterPaint, samples };
}
