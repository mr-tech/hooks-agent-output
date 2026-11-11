// B-3 fixed read on hooks.gg after release (395510e): /message/m/new -> My Account (the picker makes a draft
// row, as for 5996) -> Components V2 -> add one Text Display, leave it empty; read the error lines.
// No Save, no Send. Same reads as prod_b3_unfixed.cjs, which showed no line at 0e3d903.
module.exports = async (page, ctx, h) => {
  const snap = async () => page.locator('body').ariaSnapshot();
  await page.goto('https://hooks.gg/message/m/new', { waitUntil: 'load' });
  await page.waitForTimeout(4000); await h.guard();
  await page.getByRole('button', { name: 'My Account' }).click();
  await page.waitForTimeout(8000); await h.guard();
  h.log('editor url', page.url());
  await page.getByText('Components V2', { exact: true }).click();
  await page.waitForTimeout(2000);
  const cont = page.getByRole('button', { name: /^continue$/i });
  if (await cont.count()) { await cont.first().click(); await page.waitForTimeout(2000); }
  const before = await h.err();
  await page.getByRole('button', { name: /add component/i }).first().click(); await page.waitForTimeout(1200);
  await page.getByRole('menuitem', { name: /text display/i }).or(page.getByRole('button', { name: /^text display$/i })).first().click();
  await page.waitForTimeout(2500);
  await page.keyboard.press('Escape'); await page.waitForTimeout(1500);
  const err = await h.err();
  const ring = await page.evaluate(() => [...document.querySelectorAll('*')].filter((e) => String(e.className.baseVal ?? e.className).split(/\s+/).includes('!ring-red-500')).length);
  const counter = (await page.locator('body').innerText()).match(/\b\d+\/40\b/)?.[0];
  await h.shot('prod-b3-fixed');
  h.log({ before, err, ring, counter });
  return { url: page.url(), before, err, activeRing: ring, counter, snap: (await snap()).slice(0, 3000) };
};
