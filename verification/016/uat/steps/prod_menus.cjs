// Read-only: open the File and Edit menus of draft 5996 and snapshot each.
module.exports = async (page, ctx, h) => {
  await page.goto('https://hooks.gg/message/m/5996/edit', { waitUntil: 'load' });
  await page.waitForTimeout(6000); await h.guard();
  const out = {};
  for (const m of ['File', 'Edit', 'View']) {
    await page.getByRole('button', { name: m, exact: true }).click(); await page.waitForTimeout(1000);
    out[m] = ((await page.locator('body').ariaSnapshot()).match(/menu[\s\S]{0,900}/)?.[0] || '').slice(0, 900);
    await page.keyboard.press('Escape'); await page.waitForTimeout(500);
  }
  return out;
};
