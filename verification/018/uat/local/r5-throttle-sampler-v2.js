// R5 sampler v2 (v1, r5-throttle-sampler.js, read selectors this site lacks; kept as run). Run by browser_run_code_unsafe.
// Loads /message unthrottled, throttles through CDP, clicks the first link to a message editor (/message/m/<id>/edit), and samples
// every 100 ms for 30 s. A pending lazy child that propagates suspends to the root layout's <Suspense> (src/app/layout.tsx),
// whose fallback is a lone LoadingDots: the page's text collapses. Signals per sample: body text length, the editor's "File"
// menu button (Navigation.tsx), and the Slate editor. Verdict fields: collapsed = a sample after navigation whose body text is
// under 40 characters; fileLostAfterShown = the File button disappearing once shown.
async (page) => {
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
  await page.goto('http://127.0.0.1:3000/message', { waitUntil: 'networkidle' });
  const before = await page.evaluate(() => document.body.innerText.length);
  const jsDone = [];
  page.on('requestfinished', (r) => { if (/\/_next\/static\/.*\.js/.test(r.url())) jsDone.push(Date.now()); });
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 600, downloadThroughput: 40 * 1024, uploadThroughput: 40 * 1024 });
  const t0 = Date.now();
  const how = await page.evaluate(() => {
    const a = [...document.querySelectorAll('a[href]')].find((x) => /^\/message\/m\/[0-9]+\/edit$/.test(x.getAttribute('href')));
    if (!a) return 'none';
    a.click();
    return 'link ' + a.getAttribute('href');
  });
  const samples = [];
  while (Date.now() - t0 < 30000) {
    const s = await page.evaluate(() => ({
      path: location.pathname,
      textLen: document.body.innerText.length,
      file: [...document.querySelectorAll('button')].some((b) => b.textContent.trim() === 'File'),
      slate: document.querySelectorAll('[data-slate-editor]').length,
    })).catch(() => ({ err: true }));
    s.ms = Date.now() - t0;
    samples.push(s);
    await page.waitForTimeout(100);
  }
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
  const ok = samples.filter((s) => !s.err);
  const firstFile = ok.find((s) => s.file);
  const firstFileMs = firstFile ? firstFile.ms : -1;
  const jsAfterFile = firstFile ? jsDone.filter((t) => t - t0 > firstFileMs).length : 0;
  return {
    how, textBefore: before, n: samples.length, errors: samples.length - ok.length,
    minTextLen: Math.min(...ok.map((s) => s.textLen)),
    collapsed: ok.some((s) => s.textLen < 40),
    firstFileMs, fileLostAfterShown: firstFile ? ok.filter((s) => s.ms > firstFileMs).some((s) => !s.file) : null,
    jsFinishedAfterFileShown: jsAfterFile, jsFinishedTotal: jsDone.length,
    // runs of identical (path,file,slate,textLen bucket) samples, to keep the output small
    runs: ok.reduce((acc, s) => { const k = `${s.path}|${s.file}|${s.slate}|${Math.round(s.textLen / 50) * 50}`; const l = acc[acc.length - 1]; if (l && l.k === k) { l.to = s.ms; } else acc.push({ k, from: s.ms, to: s.ms }); return acc; }, []),
  };
}
