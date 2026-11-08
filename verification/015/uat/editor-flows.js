// M2 length flows, M6-b image URL dialog, M6-f picker on black: driven in the editor through the JSON dialog's Load.
async (page) => {
  const s = n => 'a'.repeat(n);
  const jsonOpen = async () => page.evaluate(() => Array.from(document.querySelectorAll('[role="dialog"]'))
    .some(x => x.innerText.trim().startsWith('Message JSON') && x.getClientRects().length > 0));
  const load = async (msg) => {
    await page.goto('http://127.0.0.1:3000/message/m/0/edit'); await page.waitForTimeout(4500);
    for (let t = 0; t < 2 && !(await jsonOpen()); t++) {
      await page.getByRole('button', { name: 'Edit', exact: true }).click(); await page.waitForTimeout(600);
      await page.getByText('JSON', { exact: true }).click(); await page.waitForTimeout(1500);
    }
    const dlg = page.getByRole('dialog').filter({ hasText: 'Message JSON' });
    await dlg.locator('[contenteditable]').first().click();
    await page.keyboard.press('ControlOrMeta+a'); await page.keyboard.press('Delete');
    await page.keyboard.insertText(JSON.stringify(msg)); await page.waitForTimeout(400);
    const loadBtn = dlg.getByRole('button', { name: 'Load' });
    if (!(await loadBtn.isEnabled())) { await page.keyboard.press('Escape'); await page.waitForTimeout(500); return false; }
    await loadBtn.click(); await page.waitForTimeout(800);
    const sure = page.getByRole('dialog').filter({ hasText: 'Are you sure?' });
    if (await sure.count()) await sure.getByRole('button', { name: 'Load' }).click();
    await page.waitForTimeout(1500);
    return true;
  };
  const errs = () => page.evaluate(() => Array.from(document.querySelectorAll('.text-error')).map(e => e.textContent.trim()).filter(Boolean));
  const out = {};
  // M2 limits through the JSON dialog: Load is enabled only for a message that conforms.
  out.loadable = {};
  for (const [k, e] of Object.entries({
    author256: { author: { name: s(256) }, description: 'x' }, author257: { author: { name: s(257) }, description: 'x' },
    title256: { title: s(256) }, title257: { title: s(257) },
    footer2048: { footer: { text: s(2048) }, description: 'x' }, footer2049: { footer: { text: s(2049) }, description: 'x' },
  })) out.loadable[k] = await load({ username: 'uat', embeds: [e] });
  out.atLimitErrors = await (async () => { await load({ username: 'uat', embeds: [{ author: { name: s(256) }, title: s(256), footer: { text: s(2048) }, description: 'x' }] }); return errs(); })();
  // M6-b: the embed image dialog
  await load({ username: 'uat', embeds: [{ description: 'x' }] });
  out.image = {};
  for (const u of ['https://example.com/a.jpeg', 'https://example.com/a.webp', 'https://example.com/A.PNG', 'https://example.com/a.png?x=1',
                   'https://example.com/a.png.html', 'https://example.com/a.avif']) {
    await page.getByRole('button', { name: 'edit embed image' }).first().click(); await page.waitForTimeout(800);
    const inp = page.locator('input[placeholder="https://example.com/image.png"]:visible').first();
    await inp.fill(u); await page.waitForTimeout(800);
    const save = page.locator('button:visible', { hasText: /^Save$/ }).first();
    const dlgText = await page.evaluate(() => Array.from(document.querySelectorAll('[role="dialog"]')).filter(d => d.getClientRects().length && d.innerText.includes('Enter Image URL')).map(d => d.innerText).join(' '));
    out.image[u] = { saveEnabled: await save.isEnabled(), err: dlgText.includes('Invalid url.') };
    await page.locator('button:visible', { hasText: /^Cancel$/ }).first().click(); await page.waitForTimeout(600);
  }
  // M6-f: picker opens on the stored colour (black, and a leading-zero colour)
  out.picker = {};
  for (const c of [0, 0x00ff00]) {
    await load({ username: 'uat', embeds: [{ description: 'x', color: c }] });
    await page.getByRole('button', { name: 'Color Picker' }).first().click(); await page.waitForTimeout(1000);
    out.picker[c] = await page.evaluate(() => Array.from(document.querySelectorAll('input')).filter(i => i.getClientRects().length).map(i => i.value).filter(v => /^#?[0-9a-f]{3,8}$/i.test(v)));
    await page.keyboard.press('Escape'); await page.waitForTimeout(500);
  }
  return out;
}
