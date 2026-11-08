// B-11 dialog leg (M4-d, D29; CR-16): New Message dialog, Webhook load option. Network cut, then a valid-looking
// webhook URL typed: the dialog's shared error line reads "Invalid URL". Control, same run: network back, same URL:
// Discord's own refusal text. Route (D39 limb 3): /message/m/1/edit, then the in-app link to /message/f/0 (no reload),
// then "new message" → "Upload Message". Nothing is saved or sent.
async (page) => {
  const url = 'https://discord.com/api/webhooks/123456789012345678/uat-not-a-real-token';
  const openDialog = async () => {
    await page.goto('http://127.0.0.1:3000/message/m/1/edit'); await page.waitForTimeout(6000);
    await page.locator('a[href="/message/f/0"]').first().click();
    await page.waitForURL(/\/message\/f\/0/, { timeout: 20000 }); await page.waitForTimeout(4000);
    await page.getByRole('button', { name: 'new message' }).click(); await page.waitForTimeout(1500);
    await page.getByRole('button', { name: 'Upload Message' }).last().click(); await page.waitForTimeout(3000);
    const dlg = page.locator('[role="dialog"]', { hasText: 'Create or upload a new message' }).first();
    await dlg.getByText('Webhook', { exact: true }).first().click(); await page.waitForTimeout(1000);
    return dlg;
  };
  const dialogLines = () => page.evaluate(() => { const d = Array.from(document.querySelectorAll('[role="dialog"]')).find(x => x.innerText.includes('Create or upload a new message'));
    return d ? { errorLines: Array.from(d.querySelectorAll('.text-error')).map(e => e.textContent.trim()).filter(Boolean), inputs: Array.from(d.querySelectorAll('input')).filter(i => i.getClientRects().length).map(i => i.getAttribute('placeholder')) } : null; });
  const out = {};
  let dlg = await openDialog();
  out.before = await dialogLines();
  const field = () => dlg.locator('input:visible').first();
  await page.context().setOffline(true);
  try {
    await field().click(); await field().fill(url); await page.waitForTimeout(5000);
    out.offline = await dialogLines();
  } finally { await page.context().setOffline(false); }
  await page.keyboard.press('Escape'); await page.waitForTimeout(800);
  dlg = await openDialog();
  await field().click(); await field().fill(url); await page.waitForTimeout(6000);
  out.online = await dialogLines();
  await page.keyboard.press('Escape'); await page.waitForTimeout(800);
  out.route = 'via /message/m/1/edit → in-app link → f/0, no reload; Webhook option';
  return out;
}
