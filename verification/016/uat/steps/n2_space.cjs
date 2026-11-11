// N-2 on the local tip: message 900000000000001's Text Display (stored ""), type one space, blur, save.
// The UAT stage reads the stored row afterwards.
module.exports = async (page, ctx, h) => {
  await page.goto('http://127.0.0.1:3000/message/m/900000000000001/edit', { waitUntil: 'load' });
  await page.waitForTimeout(8000); await h.guard();
  await page.getByRole('button', { name: 'Text content...' }).first().click(); await page.waitForTimeout(800);
  await page.keyboard.type(' '); await page.waitForTimeout(500);
  const focused = await page.evaluate(() => { const a = document.activeElement; return { tag: a.tagName, value: a.value ?? a.textContent }; });
  await page.keyboard.press('Escape'); await page.waitForTimeout(500);
  await page.locator('header, body').first().click({ position: { x: 700, y: 10 } }).catch(() => {});
  await page.waitForTimeout(1200);
  const err = await h.err();
  const save = page.getByRole('button', { name: 'save message', exact: true });
  const canSave = (await save.count()) ? await save.isEnabled() : false;
  if (canSave) { await save.click(); await page.waitForTimeout(3000); }
  await h.shot('n2-space');
  h.log({ focused, err, canSave });
  return { focused, err, saved: canSave };
};
