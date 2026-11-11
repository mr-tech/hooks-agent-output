// B-6(b) unfixed value on hooks.gg (production 0e3d903): the test account's draft 5996 loaded with 41
// components (39 Text Displays and a Container holding one) through Edit > JSON, named, saved once; then its preview image src read from /message. No Send.
const fs = require('fs'); const path = require('path');
module.exports = async (page, ctx, h) => {
  const json = JSON.stringify({ username: 'Hooks.gg Bot', flags: 32768, components: [...Array.from({ length: 39 }, () => ({ type: 10, content: 'x' })), { type: 17, components: [{ type: 10, content: 'x' }] }] });
  // 41 components in total (39 + Container 1 + its Text Display 1): the import shape caps the top-level array at 40.
  await page.goto('https://hooks.gg/message/m/5996/edit', { waitUntil: 'load' });
  await page.waitForTimeout(6000); await h.guard();
  await page.getByRole('button', { name: 'Edit', exact: true }).click(); await page.waitForTimeout(800);
  await page.getByRole('button', { name: 'JSON', exact: true }).click(); await page.waitForTimeout(1500);
  await page.locator('.cm-content').click(); await page.keyboard.press('Control+A'); await page.keyboard.press('Delete');
  await page.keyboard.insertText(json); await page.waitForTimeout(800);
  await page.getByRole('button', { name: 'Load', exact: true }).click(); await page.waitForTimeout(1500);
  for (const n of [/^confirm$/i, /^continue$/i, /^load$/i, /^yes$/i]) { const b = page.getByRole('button', { name: n }); if (await b.count()) { h.log('confirm button', String(n)); await b.first().click(); await page.waitForTimeout(1500); } }
  await page.keyboard.press('Escape'); await page.waitForTimeout(1500);
  const errEditor = await h.err();
  const counter = (await page.locator('body').innerText()).match(/\b\d+\/40\b/)?.[0];
  h.log({ errEditor, counter });
  await h.shot('prod-b6b-editor');
  const nameBox = page.getByRole('textbox', { name: 'Message Name' });
  await nameBox.fill('uat-016-b6b-41-components'); await page.waitForTimeout(500);
  const saveName = page.getByRole('button', { name: 'save message name', exact: true });
  if (await saveName.count() && await saveName.isEnabled()) { await saveName.click(); await page.waitForTimeout(1500); }
  await page.getByRole('button', { name: 'save message', exact: true }).click(); await page.waitForTimeout(4000);
  const toasts = await page.evaluate(() => [...document.querySelectorAll('[data-sonner-toast], [role="status"]')].map((t) => t.textContent.trim()).filter(Boolean));
  h.log({ savedAt: new Date().toISOString(), toasts });
  let src = null;
  for (let i = 0; i < 6 && !src; i++) {
    await page.goto('https://hooks.gg/message', { waitUntil: 'load' }); await page.waitForTimeout(6000);
    src = await page.evaluate(() => {
      const card = [...document.querySelectorAll('a, li, div')].filter((e) => e.textContent.includes('uat-016-b6b-41-components') && e.querySelector('img'));
      card.sort((a, b) => a.textContent.length - b.textContent.length);
      const img = card[0] && [...card[0].querySelectorAll('img')].find((i) => !/avatar|icon/i.test(i.alt || ''));
      return img ? img.currentSrc || img.src : null;
    });
    h.log('attempt', i, 'src found', !!src);
  }
  await h.shot('prod-b6b-list');
  return { errEditor, counter, toasts, src };
};
