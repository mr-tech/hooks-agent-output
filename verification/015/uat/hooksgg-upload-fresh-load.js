// Owner ruling 21:14Z: one live check on hooks.gg as the test account (already signed in on the kept profile).
// A fresh page load of the folder page, then "new message" → "Upload Message"; record whether the dialog opens and
// stays open (reads at 0.5 s, 2 s, 5 s, 8 s). Saves nothing: Escape closes it.
async (page) => {
  const isOpen = () => page.evaluate(() => document.body.innerText.includes('Create or upload a new message'));
  await page.goto('https://hooks.gg/message/f/0', { waitUntil: 'load' }); await page.waitForTimeout(6000);
  const signedIn = await page.evaluate(async () => { const j = await fetch('/api/auth/session').then(r => r.json()).catch(() => ({})); return !!(j && j.user); });
  const portalBefore = await page.evaluate(() => document.querySelectorAll('[data-floating-ui-portal]').length);
  await page.getByRole('button', { name: 'new message' }).click(); await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Upload Message' }).last().click();
  const reads = [];
  for (const t of [500, 1500, 3000, 3000]) { await page.waitForTimeout(t); reads.push(await isOpen()); }
  await page.screenshot({ path: '/usr/local/bin/hooks/agent-output/verification/015/uat/hooksgg-upload-fresh-load.png' });
  await page.keyboard.press('Escape'); await page.waitForTimeout(500);
  return { route: 'fresh load of https://hooks.gg/message/f/0 (page.goto), no prior in-app navigation in that load', signedIn, portalBefore, openAt_0_5s_2s_5s_8s: reads };
}
