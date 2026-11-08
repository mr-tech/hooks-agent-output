// B-12 (M5-h): /preview with mis-shaped data. Reads error line and editor presence per URL.
async (page) => {
  const cases = [
    ['embeds-empty-string', '{"embeds":""}'],
    ['embeds-list-of-list', '{"embeds":[[]]}'],
    ['non-json', 'not json'],
    ['number', '5'],
    ['null', 'null'],
    ['fields-empty-string', '{"embeds":[{"fields":""}]}'],
  ];
  const out = [];
  for (const [name, data] of cases) {
    const errs = [];
    const h = e => errs.push(String(e).slice(0, 120));
    page.on('pageerror', h);
    await page.goto('http://127.0.0.1:3000/preview?data=' + encodeURIComponent(data));
    await page.waitForTimeout(3000);
    const r = await page.evaluate(() => ({
      invalidLine: document.body.innerText.includes('Invalid message data.'),
      editor: !!document.querySelector('time') && document.body.innerText.includes('BOT'),
      textLen: document.body.innerText.trim().length,
      nextErrorOverlay: !!document.querySelector('nextjs-portal') && document.body.innerText.includes('Unhandled'),
    }));
    page.off('pageerror', h);
    out.push({ name, data, ...r, pageErrors: errs });
  }
  return out;
}
