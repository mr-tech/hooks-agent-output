// B-11 (M4-d, D29) send-page leg: a valid-looking webhook URL typed with the network cut shows "Invalid URL";
// with the network back, the same URL gives the page's existing refusal (control). Nothing is sent.
async (page) => {
  const url = 'https://discord.com/api/webhooks/123456789012345678/uat-not-a-real-token';
  const read = () => page.evaluate(() => Array.from(document.querySelectorAll('.text-error, [role="alert"]'))
    .map(e => e.textContent.trim()).filter(Boolean));
  const field = async () => {
    const byLabel = page.getByLabel('Webhook URL');
    if (await byLabel.count()) return byLabel.first();
    return page.getByPlaceholder(/webhook/i).first();
  };
  const out = {};
  await page.goto('http://127.0.0.1:3000/message/m/0/send'); await page.waitForTimeout(5000);
  const tab = page.getByText('Custom Webhook', { exact: true });
  if (await tab.count() && await tab.first().isEnabled()) { await tab.first().click(); await page.waitForTimeout(800); }
  out.before = await read();
  await page.context().setOffline(true);
  try {
  let f = await field();
  await f.click(); await f.fill(''); await f.type(url, { delay: 5 });
  await page.waitForTimeout(4000);
  out.offline = await read();
  await page.context().setOffline(false);
  await page.waitForTimeout(500);
  await f.fill(''); await page.waitForTimeout(800);
  await f.type(url, { delay: 5 });
  await page.waitForTimeout(5000);
  out.online = await read();
  } finally { await page.context().setOffline(false); }
  return out;
}
