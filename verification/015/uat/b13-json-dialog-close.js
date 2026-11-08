// B-13 (M5-a): after a confirmed Load, the Message JSON dialog closes on Esc and on outside click.
// Control: after a cancelled Load, Esc closes it. Fresh editor page; nothing is saved or sent.
async (page) => {
  const base = 'http://127.0.0.1:3000/message/m/0/edit';
  const msg = { flags: 32768, components: Array.from({ length: 39 }, (_, i) => ({ type: 10, content: 'uat line ' + (i + 1) })) };
  const jsonOpen = async () => page.evaluate(() => Array.from(document.querySelectorAll('[role="dialog"]'))
    .some(x => x.innerText.trim().startsWith('Message JSON') && x.getClientRects().length > 0));
  const openJson = async () => {
    if (await jsonOpen()) return 'already-open';
    for (let t = 0; t < 2; t++) {
      await page.getByRole('button', { name: 'Edit', exact: true }).click();
      await page.waitForTimeout(600);
      await page.getByText('JSON', { exact: true }).click();
      for (let i = 0; i < 10; i++) { await page.waitForTimeout(300); if (await jsonOpen()) return true; }
      await page.keyboard.press('Escape'); await page.waitForTimeout(500);
    }
    return false;
  };
  const loadDraft = async (confirm) => {
    const dlg = page.getByRole('dialog').filter({ hasText: 'Message JSON' });
    await dlg.locator('[contenteditable]').first().click();
    await page.keyboard.press('ControlOrMeta+a');
    await page.keyboard.press('Delete');
    await page.keyboard.insertText(JSON.stringify(msg));
    await page.waitForTimeout(400);
    await dlg.getByRole('button', { name: 'Load' }).click();
    await page.waitForTimeout(800);
    const sure = page.getByRole('dialog').filter({ hasText: 'Are you sure?' });
    await sure.getByRole('button', { name: confirm ? 'Load' : 'Cancel' }).click();
    await page.waitForTimeout(1200);
  };
  const out = {};
  // control: cancelled Load
  await page.goto(base); await page.waitForTimeout(5000);
  out.controlOpened = await openJson(); await loadDraft(false);
  out.controlOpenAfterCancel = await jsonOpen();
  await page.keyboard.press('Escape'); await page.waitForTimeout(1000);
  out.controlOpenAfterEsc = await jsonOpen();
  // confirmed Load
  await page.goto(base); await page.waitForTimeout(5000);
  out.opened = await openJson(); await loadDraft(true);
  out.openAfterConfirmedLoad = await jsonOpen();
  out.editorTextDisplays = await page.evaluate(() => (document.body.innerText.match(/uat line \d+/g) || []).length);
  if (out.openAfterConfirmedLoad) { await page.keyboard.press('Escape'); await page.waitForTimeout(800); }
  out.reopened = await openJson();
  await page.keyboard.press('Escape'); await page.waitForTimeout(1000);
  out.openAfterEsc = await jsonOpen();
  out.reopened2 = await openJson();
  await page.mouse.click(5, 300); await page.waitForTimeout(1000);
  out.openAfterOutsideClick = await jsonOpen();
  return out;
}
