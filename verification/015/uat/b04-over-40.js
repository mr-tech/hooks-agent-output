// B-4 (M6-l; D32, D33): at N text displays, add a Section in the editor; read the counter, the error line,
// the red border, Add Component's presence; then the Send page (Send never pressed) and /preview with the
// message's own JSON. Run with N=39 (a Section adds its own children: the total is read, not assumed) and N=37 (control at or under 40).
async (page) => {
  const base = 'http://127.0.0.1:3000/message/m/0/edit';
  const jsonOpen = async () => page.evaluate(() => Array.from(document.querySelectorAll('[role="dialog"]'))
    .some(x => x.innerText.trim().startsWith('Message JSON') && x.getClientRects().length > 0));
  const openJson = async () => {
    for (let t = 0; t < 2; t++) {
      await page.getByRole('button', { name: 'Edit', exact: true }).click();
      await page.waitForTimeout(600);
      await page.getByText('JSON', { exact: true }).click();
      for (let i = 0; i < 10; i++) { await page.waitForTimeout(300); if (await jsonOpen()) return true; }
      await page.keyboard.press('Escape'); await page.waitForTimeout(500);
    }
    return false;
  };
  const read = () => page.evaluate(() => {
    const t = document.body.innerText;
    const line = (t.match(/Message has \d+ components; the limit is 40\./) || [null])[0];
    let red = null;
    if (line) {
      const el = Array.from(document.querySelectorAll('*')).find(e => e.childElementCount === 0 && e.textContent.trim() === line);
      const c = el ? getComputedStyle(el).color : null;
      // nearest ancestor with a visible border
      let a = el, border = null;
      for (let i = 0; a && i < 8; i++, a = a.parentElement) {
        const s = getComputedStyle(a);
        if (parseFloat(s.borderTopWidth) > 0 && s.borderTopStyle !== 'none') { border = s.borderTopColor; break; }
      }
      red = { textColor: c, borderColor: border };
    }
    const redBorders = Array.from(document.querySelectorAll('*')).filter(e => {
      const st = getComputedStyle(e);
      return e.getClientRects().length && ['Top','Right','Bottom','Left'].every(k => parseFloat(st['border' + k + 'Width']) > 0 && st['border' + k + 'Style'] !== 'none')
        && /rgb\((2[0-9]{2}), (\d{1,2}|1[0-3]\d), (\d{1,2}|1[0-3]\d)\)/.test(st.borderTopColor) && (() => { const m = st.borderTopColor.match(/\d+/g).map(Number); return m[0] > 180 && m[1] < 140 && m[2] < 140; })();
    }).length;
    return {
      redBorders,
      counter: (t.match(/\b\d+\s*\/\s*40\b/g) || []),
      line, red,
      addComponentVisible: Array.from(document.querySelectorAll('button')).some(b => b.innerText.trim() === 'Add Component' && b.getClientRects().length),
    };
  });
  const out = {};
  for (const N of [39, 37]) {
    const r = {};
    const msg = { flags: 32768, components: Array.from({ length: N }, (_, i) => ({ type: 10, content: 'uat line ' + (i + 1) })) };
    await page.goto(base); await page.waitForTimeout(5000);
    await openJson();
    const dlg = page.getByRole('dialog').filter({ hasText: 'Message JSON' });
    await dlg.locator('[contenteditable]').first().click();
    await page.keyboard.press('ControlOrMeta+a'); await page.keyboard.press('Delete');
    await page.keyboard.insertText(JSON.stringify(msg)); await page.waitForTimeout(400);
    await dlg.getByRole('button', { name: 'Load' }).click(); await page.waitForTimeout(800);
    await page.getByRole('dialog').filter({ hasText: 'Are you sure?' }).getByRole('button', { name: 'Load' }).click();
    await page.waitForTimeout(1500);
    r.before = await read();
    await page.getByRole('button', { name: 'Add Component' }).click(); await page.waitForTimeout(600);
    await page.getByText('Section', { exact: true }).click(); await page.waitForTimeout(1500);
    r.editor = await read();
    // Copy to Clipboard's state (M5: a draft that does not conform disables Copy)
    await openJson();
    r.copyDisabled = await page.getByRole('dialog').filter({ hasText: 'Message JSON' }).getByRole('button', { name: 'Copy to Clipboard' }).isDisabled();
    await page.keyboard.press('Escape'); await page.waitForTimeout(800);
    // Send page leg (client-side navigation keeps the in-memory message)
    await page.getByRole('link', { name: 'Send' }).first().click(); await page.waitForTimeout(5000);
    r.sendUrl = page.url();
    r.send = await read();
    r.sendButtons = await page.evaluate(() => Array.from(document.querySelectorAll('button')).filter(b => b.innerText.trim() === 'Send')
      .map(b => ({ disabled: b.disabled || b.getAttribute('aria-disabled') === 'true' || b.hasAttribute('data-disabled') })));
    // /preview leg: hand-built data, N text displays plus one Section (text display + thumbnail accessory)
    const pdata = { flags: 32768, components: [...msg.components, { type: 9, components: [{ type: 10, content: 'uat section' }], accessory: { type: 11, media: { url: 'https://example.com/image.png' } } }] };
    await page.goto('http://127.0.0.1:3000/preview?data=' + encodeURIComponent(JSON.stringify(pdata)));
    await page.waitForTimeout(4000);
    r.preview = await read();
    out['N' + N] = r;
  }
  return out;
}
