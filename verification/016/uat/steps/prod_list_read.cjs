// Read-only: hooks.gg /message list; find the card named uat-016-b6b-41-components and its preview image src.
module.exports = async (page, ctx, h) => {
  await page.goto('https://hooks.gg/message', { waitUntil: 'load' }); await page.waitForTimeout(7000); await h.guard();
  const cards = await page.evaluate(() => [...document.querySelectorAll('img')].map((i) => {
    let n = i; let label = '';
    for (let k = 0; k < 6 && n; k++, n = n.parentElement) { if (n.textContent && n.textContent.trim().length > 0) { label = n.textContent.trim().slice(0, 120); if (/uat-016|New Message/.test(label)) break; } }
    return { src: i.currentSrc || i.src, alt: i.alt, label };
  }).filter((c) => /uat-016|New Message/.test(c.label)));
  await h.shot('prod-list');
  return { url: page.url(), cards };
};
