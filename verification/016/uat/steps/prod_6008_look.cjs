// Read-only look at draft 6008's editor: snapshot and screenshot. Clicks nothing.
module.exports = async (page, ctx, h) => {
  await page.goto('https://hooks.gg/message/m/6008/edit', { waitUntil: 'load' });
  await page.waitForTimeout(8000); await h.guard();
  await h.shot('prod-6008-look');
  return { url: page.url(), err: await h.err(), snap: (await page.locator('body').ariaSnapshot()).slice(0, 2500) };
};
