// Read-only: open Edit > JSON on draft 5996 and snapshot the modal.
module.exports = async (page, ctx, h) => {
  await page.goto('https://hooks.gg/message/m/5996/edit', { waitUntil: 'load' });
  await page.waitForTimeout(6000); await h.guard();
  await page.getByRole('button', { name: 'Edit', exact: true }).click(); await page.waitForTimeout(800);
  await page.getByRole('button', { name: 'JSON', exact: true }).click(); await page.waitForTimeout(2000);
  await h.shot('prod-json-modal');
  const s = await page.locator('body').ariaSnapshot();
  return { modal: s.slice(s.lastIndexOf('dialog') - 50) .slice(0, 2500), textareas: await page.locator('textarea').count(), cm: await page.locator('.cm-content, .monaco-editor').count() };
};
