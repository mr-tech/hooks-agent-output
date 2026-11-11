// Draft 6008: click "Components V2" and snapshot what follows. No Save.
module.exports = async (page, ctx, h) => {
  await page.goto('https://hooks.gg/message/m/6008/edit', { waitUntil: 'load' });
  await page.waitForTimeout(8000); await h.guard();
  await page.getByText('Components V2', { exact: true }).click(); await page.waitForTimeout(2500);
  await h.shot('prod-6008-v2look');
  return { snap: (await page.locator('body').ariaSnapshot()).slice(0, 3000) };
};
