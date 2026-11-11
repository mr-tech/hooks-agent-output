// Read-only: hooks.gg draft 5996 edit page state.
module.exports = async (page, ctx, h) => {
  await page.goto('https://hooks.gg/message/m/5996/edit', { waitUntil: 'load' });
  await page.waitForTimeout(7000); await h.guard();
  await h.shot('prod-state');
  return { err: await h.err(), snap: (await page.locator('body').ariaSnapshot()).slice(0, 4000) };
};
