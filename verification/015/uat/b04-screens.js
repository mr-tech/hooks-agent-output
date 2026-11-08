// B-4 evidence: at 39 text displays add a Section; screenshot the editor and Send page around the error line.
async (page) => {
  const tag = 'TAG';
  const msg = { flags: 32768, components: Array.from({ length: 39 }, (_, i) => ({ type: 10, content: 'uat line ' + (i + 1) })) };
  await page.goto('http://127.0.0.1:3000/message/m/0/edit'); await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Edit', exact: true }).click(); await page.waitForTimeout(600);
  await page.getByText('JSON', { exact: true }).click(); await page.waitForTimeout(1500);
  const dlg = page.getByRole('dialog').filter({ hasText: 'Message JSON' });
  await dlg.locator('[contenteditable]').first().click();
  await page.keyboard.press('ControlOrMeta+a'); await page.keyboard.press('Delete');
  await page.keyboard.insertText(JSON.stringify(msg)); await page.waitForTimeout(400);
  await dlg.getByRole('button', { name: 'Load' }).click(); await page.waitForTimeout(800);
  await page.getByRole('dialog').filter({ hasText: 'Are you sure?' }).getByRole('button', { name: 'Load' }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Add Component' }).click(); await page.waitForTimeout(600);
  await page.getByText('Section', { exact: true }).click(); await page.waitForTimeout(1500);
  const dir = '/usr/local/bin/hooks/agent-output/verification/015/uat/';
  const line = page.locator('text=/Message has \\d+ components/').first();
  const r = { editorLine: await line.count() ? await line.innerText() : null };
  if (r.editorLine) await line.scrollIntoViewIfNeeded();
  await page.screenshot({ path: dir + 'b04-editor-' + tag + '.png' });
  await page.getByRole('link', { name: 'Send' }).first().click(); await page.waitForTimeout(5000);
  const l2 = page.locator('text=/Message has \\d+ components/').first();
  r.sendLine = await l2.count() ? await l2.innerText() : null;
  if (r.sendLine) await l2.scrollIntoViewIfNeeded();
  await page.screenshot({ path: dir + 'b04-send-' + tag + '.png' });
  return r;
}
