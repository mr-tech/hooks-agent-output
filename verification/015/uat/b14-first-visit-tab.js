// B-14 (M5-i): first visit, in a fresh tab, to a guild message's send page. After the webhook list loads,
// read which accordion panel is expanded and how many webhook entries the guild list shows. Nothing is selected or sent.
async (page) => {
  const id = 'MSGID';
  const p = await page.context().newPage();
  const tr = [];
  p.on('response', r => { if (/\/api\/trpc\//.test(r.url())) tr.push(r.url().split('/api/trpc/')[1].split('?')[0] + ' ' + r.status()); });
  await p.goto('http://127.0.0.1:3000/message/m/' + id + '/send');
  await p.waitForTimeout(9000);
  const r = await p.evaluate(() => ({
    expanded: Array.from(document.querySelectorAll('[aria-expanded]')).map(e => (e.innerText || e.getAttribute('aria-label') || '').trim().split('\n')[0].slice(0, 40) + '=' + e.getAttribute('aria-expanded')),
    text: document.body.innerText.slice(0, 600),
  }));
  await p.screenshot({ path: '/usr/local/bin/hooks/agent-output/verification/015/uat/b14-first-visit-' + id + '.png' });
  await p.close();
  return { ...r, trpc: tr };
}
