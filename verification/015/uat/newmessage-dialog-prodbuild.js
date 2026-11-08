// Route (a) for B-9 / B-11 dialog leg: under `next build && next start` (b96e364 export), does "new message" →
// "Upload Message" open NewMessageModal ("Create or upload a new message")? Three forms: Playwright click in the
// current tab, Playwright click in a fresh tab, and a DOM element.click() after dismissing the cookie banner.
async (page) => {
  const read = (p) => p.evaluate(() => ({ dialogs: Array.from(document.querySelectorAll('[role="dialog"]')).map(d => d.innerText.slice(0, 60)),
    title: document.body.innerText.includes('Create or upload a new message') }));
  const out = {};
  await page.goto('http://127.0.0.1:3000/message/f/0'); await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'new message' }).click(); await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Upload Message' }).last().click(); await page.waitForTimeout(3000);
  out.click = await read(page);
  const p = await page.context().newPage();
  await p.goto('http://127.0.0.1:3000/message/f/0'); await p.waitForTimeout(6000);
  await p.getByRole('button', { name: 'new message' }).click(); await p.waitForTimeout(1500);
  await p.getByRole('button', { name: 'Upload Message' }).last().click(); await p.waitForTimeout(3500);
  out.freshTab = await read(p); await p.close();
  await page.goto('http://127.0.0.1:3000/message/f/0'); await page.waitForTimeout(5000);
  const ok = page.getByRole('button', { name: 'Ok, Got it.' }); if (await ok.count()) { await ok.click(); await page.waitForTimeout(500); }
  await page.getByRole('button', { name: 'new message' }).click(); await page.waitForTimeout(1500);
  await page.evaluate(() => { const b = Array.from(document.querySelectorAll('button')).find(x => x.innerText.trim() === 'Upload Message'); if (b) b.click(); });
  await page.waitForTimeout(3000);
  out.domClick = await read(page);
  return out;
}
