// hooks.gg: My Account -> editor; snapshot only. Saves nothing beyond the draft row the picker creates.
module.exports = async (page, ctx, h) => {
  await page.goto('https://hooks.gg/message/m/new', { waitUntil: 'load' });
  await page.getByRole('button', { name: 'My Account' }).click();
  await page.waitForTimeout(8000);
  await h.guard();
  await h.shot('prod-explore-editor');
  return { url: page.url(), snap: (await page.locator('body').ariaSnapshot()).slice(0, 9000) };
};
