// QAF-51 browser look (qa-019). Serves: 3107 = website 42128cd (fix tip), 3108 = af3d95a (chain base), both `next start`
// builds of git-archive exports, local database from uat-local-stack.sh, no save. Message content editor of a new draft.
// Each tree runs in its own new tab, closed without beforeunload.
// Per run: clear, type ">> a" + (n-1) x (Enter, "a"), Control+Home, type ">", wait, read the DOM caret, type "z",
// then read which line holds "z", how many lines are quotes, and how many page errors the ">" raised.
async (first) => {
  const results = [];
  for (const [port, tree] of [[3108, 'af3d95a'], [3107, '42128cd']]) {
    const page = await first.context().newPage();
    await page.bringToFront();
    const errs = [];
    const onErr = (e) => errs.push(e.message.slice(0, 100));
    page.on('pageerror', onErr);
    await page.goto(`http://127.0.0.1:${port}/message/m/new`);
    await page.locator('button.w-full', { hasText: 'Welcome to' }).first().click();
    const ed = page.locator('[data-slate-editor="true"][aria-label="message content"]');
    await ed.waitFor({ timeout: 15000 });
    await page.waitForTimeout(800);
    const caret = () => page.evaluate(() => {
      const s = window.getSelection();
      const kids = [...document.querySelector('[data-slate-editor="true"][aria-label="message content"]').children];
      return [kids.findIndex((k) => k.contains(s.anchorNode)), s.anchorOffset];
    });
    for (const n of [2, 5, 40, 100, 123]) {
      for (let rep = 0; rep < 2; rep += 1) {
        await ed.focus();
        await page.keyboard.press('Control+End');
        await page.keyboard.press('Control+Shift+Home');
        await page.keyboard.press('Delete');
        await page.keyboard.type('>> a');
        for (let i = 0; i < n - 1; i += 1) { await page.keyboard.press('Enter'); await page.keyboard.type('a'); }
        await page.keyboard.press('Control+Home');
        await page.waitForTimeout(300);
        const before = await caret();
        const e0 = errs.length;
        await page.keyboard.type('>');
        await page.waitForTimeout(1500);
        const after = await caret();
        await page.keyboard.type('z');
        await page.waitForTimeout(400);
        const read = await ed.evaluate((e) => {
          const kids = [...e.children];
          return {
            lines: kids.length,
            quoteLines: kids.filter((k) => k.className.toString().includes('blockQuote')).length,
            lineWithZ: kids.findIndex((k) => k.innerText.includes('z')),
          };
        });
        results.push({ tree, n, rep, caretBefore: before, caretAfterGt: after, ...read, pageErrors: errs.length - e0 });
      }
    }
    page.off('pageerror', onErr);
    await page.close({ runBeforeUnload: false });
    results.push({ tree, errorMessages: [...new Set(errs)] });
  }
  return results;
}
