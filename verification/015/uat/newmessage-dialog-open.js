// The New Message dialog (NewMessageModal) behind "new message" → "Upload Message" on the account folder page,
// and the Save As → AAAA… server save. Reads whether the dialog opens (its load fields visible) by click, by a raw
// pointer press, and by Enter; then whether a Save As to the AAAA… server is accepted.
async (page) => {
  const opened = () => page.evaluate(() => Array.from(document.querySelectorAll('[role="dialog"]'))
    .filter(d => d.getClientRects().length).map(d => d.innerText).join(' | ').slice(0, 400));
  const openMenu = async () => {
    await page.goto('http://127.0.0.1:3000/message/f/0'); await page.waitForTimeout(5000);
    await page.getByRole('button', { name: 'new message' }).click(); await page.waitForTimeout(1200);
    return page.getByRole('button', { name: 'Upload Message' });
  };
  const out = {};
  let b = await openMenu(); await b.click(); await page.waitForTimeout(3000); out.click = await opened();
  b = await openMenu(); const box = await b.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await page.mouse.down(); await page.waitForTimeout(80); await page.mouse.up();
  await page.waitForTimeout(3000); out.pointer = await opened();
  b = await openMenu(); await b.focus(); await page.keyboard.press('Enter'); await page.waitForTimeout(3000); out.enter = await opened();
  // Save As to the AAAA… server
  await page.goto('http://127.0.0.1:3000/message/m/1/edit'); await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'File', exact: true }).click(); await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'Save as...' }).click(); await page.waitForTimeout(1200);
  await page.locator('button:visible', { hasText: 'My Account' }).first().click(); await page.waitForTimeout(1000);
  await page.locator('[role="dialog"] li button:visible').filter({ hasText: 'AAAA' }).first().click(); await page.waitForTimeout(800);
  const tr = [];
  page.on('response', r => { if (/\/api\/trpc\//.test(r.url())) tr.push(r.url().split('/api/trpc/')[1].split('?')[0] + ' ' + r.status()); });
  await page.locator('button:visible', { hasText: /^Save$/ }).last().click(); await page.waitForTimeout(5000);
  out.saveAaaa = { url: page.url(), trpc: tr, toasts: await page.evaluate(() => Array.from(document.querySelectorAll('[data-sonner-toast], .text-error')).map(e => e.textContent.trim()).filter(Boolean)) };
  return out;
}
