// B-3 unfixed value on hooks.gg (production 0e3d903): test account's draft 5996 in edit mode, switched to
// Components V2, one empty Text Display added; read the error lines. No Save, no Send.
module.exports = async (page, ctx, h) => {
  const snap = async () => page.locator('body').ariaSnapshot();
  await page.goto('https://hooks.gg/message/m/5996/edit', { waitUntil: 'load' });
  await page.waitForTimeout(7000); await h.guard();
  await page.getByText('Components V2', { exact: true }).click();
  await page.waitForTimeout(2000);
  let s = await snap(); h.log('after V2 click:', s.match(/dialog[\s\S]{0,400}/g)?.slice(0, 2));
  const cont = page.getByRole('button', { name: /^continue$/i });
  if (await cont.count()) { await cont.first().click(); await page.waitForTimeout(2000); }
  s = await snap(); h.log('add component present:', /Add Component/i.test(s));
  const before = await h.err();
  await page.getByRole('button', { name: /add component/i }).first().click(); await page.waitForTimeout(1200);
  s = await snap(); h.log('menu:', s.match(/menu[\s\S]{0,600}/)?.[0]);
  await page.getByRole('menuitem', { name: /text display/i }).or(page.getByRole('button', { name: /^text display$/i })).first().click();
  await page.waitForTimeout(2500);
  await page.keyboard.press('Escape'); await page.waitForTimeout(1500);
  const err = await h.err();
  const ring = await page.evaluate(() => [...document.querySelectorAll('*')].filter((e) => String(e.className.baseVal ?? e.className).split(/\s+/).includes('!ring-red-500')).length);
  s = await snap();
  await h.shot('prod-b3-unfixed');
  h.log({ before, err, ring });
  return { url: page.url(), before, err, activeRing: ring, snap: s.slice(0, 3500) };
};
