// B-14 retry: Save As a copy of message 4 (the intro copy; message 1 is black, which base refuses) to the Claude server (a message id never visited), then open its send page
// in a fresh tab and read the expanded panel once the webhook list has loaded. Also reads the user's stored preferences row count.
async (page) => {
  await page.goto('http://127.0.0.1:3000/message/m/4/edit'); await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'File', exact: true }).click(); await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'Save as...' }).click(); await page.waitForTimeout(1200);
  await page.locator('button:visible', { hasText: 'My Account' }).first().click(); await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Claude Claude' }).click(); await page.waitForTimeout(600);
  await page.locator('button:visible', { hasText: /^Save$/ }).last().click(); await page.waitForTimeout(5000);
  const id = (page.url().match(/\/m\/(\d+)\//) || [])[1];
  await page.goto('about:blank');
  const p = await page.context().newPage();
  const tr = [];
  p.on('response', r => { if (/\/api\/trpc\//.test(r.url())) tr.push(r.url().split('/api/trpc/')[1].split('?')[0] + ' ' + r.status()); });
  await p.goto('http://127.0.0.1:3000/message/m/' + id + '/send');
  const samples = [];
  for (let i = 0; i < 6; i++) {
    await p.waitForTimeout(1500);
    samples.push(await p.evaluate(() => Array.from(document.querySelectorAll('[aria-expanded]')).filter(e => /Claude|Custom Webhook/.test(e.innerText || ''))
      .map(e => (e.innerText || '').trim().split('\n')[0].slice(0, 20) + '=' + e.getAttribute('aria-expanded')).join(',')));
  }
  await p.close();
  return { id, samples, trpc: tr };
}
