// Read-only look at hooks.gg's new-message entry: aria snapshot and screenshot. Clicks nothing.
module.exports = async (page, ctx, h) => {
  await page.goto('https://hooks.gg/message/m/new', { waitUntil: 'load' });
  await page.waitForTimeout(6000);
  await h.guard();
  await h.shot('prod-explore-new');
  return { url: page.url(), snap: (await page.locator('body').ariaSnapshot()).slice(0, 6000) };
};
