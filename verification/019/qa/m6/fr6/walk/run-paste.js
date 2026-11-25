async (page) => {
// QA M6 Fix Round 6: a real clipboard paste of 1,000 'a🙂' lines into the cleared first embed description, timed in the page,
// with every editor.apply logged (code review Round 9 sub-entry: name any top-level move_node). Run 3 times per build.
const ORIGIN = (typeof process !== 'undefined' && process.env.WALK_ORIGIN) || 'http://127.0.0.1:3107';
const errs = []; page.on('pageerror', (e) => errs.push('pageerror: ' + String(e.message || e).slice(0, 300)));
page.on('console', (m) => { if (m.type() === 'error') errs.push('console.error: ' + m.text().slice(0, 300)); });
const out = { case: 'paste-1000', origin: ORIGIN, runs: [] };
const ed = () => page.locator('[data-slate-editor="true"]').first();
if (!(await page.locator('[data-slate-editor="true"]').count())) {
  const art = page.locator('article.discord-visualizer__embed-wrapper').first();
  const t = await art.locator('button').evaluateAll((bs) => bs.map((b) => b.innerText.length));
  await art.locator('button').nth(t.indexOf(Math.max(...t))).click(); await page.waitForTimeout(1000);
}
await page.context().grantPermissions(['clipboard-read', 'clipboard-write'], { origin: ORIGIN });
const text = Array(1000).fill('a🙂').join('\n');
for (let r = 1; r <= 3; r += 1) {
  await ed().click(); await page.waitForTimeout(300);
  await page.keyboard.press('Control+a'); await page.keyboard.press('Delete'); await page.waitForTimeout(1500);
  const hooked = await ed().evaluate((el) => {
    const key = Object.keys(el).find((k) => k.startsWith('__reactFiber$')); let f = key ? el[key] : null; let editor = null;
    while (f && !editor) { const p = f.memoizedProps; if (p && p.editor && typeof p.editor.apply === 'function') editor = p.editor; f = f.return; }
    if (!editor) return false;
    if (!editor.__qaApply) { editor.__qaApply = editor.apply; editor.apply = (op) => { (window.__qaOps ||= []).push({ type: op.type, path: op.path }); editor.__qaApply(op); }; }
    window.__qaOps = []; return true;
  });
  await page.evaluate((t) => navigator.clipboard.writeText(t), text);
  const t0 = await page.evaluate(() => performance.now());
  await page.keyboard.press('Control+v');
  // settled: 1,000 lines rendered and two animation frames with no new operation
  await page.waitForFunction(() => document.querySelector('[data-slate-editor="true"]').children.length >= 1000, null, { timeout: 120000 });
  const t1 = await page.evaluate(() => new Promise((res) => { let n = (window.__qaOps || []).length; const tick = () => requestAnimationFrame(() => requestAnimationFrame(() => { const m = (window.__qaOps || []).length; if (m === n) res(performance.now()); else { n = m; tick(); } })); tick(); }));
  await page.waitForTimeout(1500);
  const ops = await page.evaluate(() => window.__qaOps || []);
  out.runs.push({
    run: r, hooked, pasteToSettledMs: Math.round(t1 - t0), lines: await ed().evaluate((e) => e.children.length),
    images: await ed().evaluate((e) => e.querySelectorAll('img').length),
    opTypes: ops.reduce((a, o) => { a[o.type] = (a[o.type] || 0) + 1; return a; }, {}),
    topLevelMoveNodes: ops.filter((o) => o.type === 'move_node' && o.path && o.path.length === 1).length,
    errors: errs.splice(0),
  });
}
return out;
}
