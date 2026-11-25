// Plan 019, QA register B-5: read the two preview link targets on production hooks.gg.
// usage: node verification/019/post-deploy/kit/b5-read.js <out.json>
// Read-only: a fresh signed-out headless context types into the route-0 editor, which keeps a local draft only.
// Nothing is saved or sent; the context is discarded on exit. One page load per run, no retry.
// Exit 0 = both anchors read (the values decide fixed or unfixed); exit 2 = unread.
'use strict';
const fs = require('fs');

// B5_URL overrides the target for a dry run against a local build; the scheduled read never sets it.
const URL_UNDER_TEST = process.env.B5_URL || 'https://hooks.gg/message/m/0/edit';
const TEXT = 'https://x.y\u{1F642} [a](https://x.y/\u{1F642})';
// Both the unfixed hosts (x.y...) and the fixed punycode host (x.xn--y-...) must be caught.
const OURS = /^https:\/\/x\.(y|xn--y-)/;
const LIBRARIES = [
  '/home/dev/.cache/qa-083-harness/node_modules/playwright-core',
  '/home/dev/.npm/_npx/314abffa6aaf2cd1/node_modules/playwright-core',
  '/home/dev/.npm/_npx/9833c18b2d85bc59/node_modules/playwright-core',
];

const out = process.argv[2];
if (!out) { console.error('usage: b5-read.js <out.json>'); process.exit(2); }
const record = { at: new Date().toISOString(), url: URL_UNDER_TEST, typed: TEXT };
const finish = (code) => { fs.writeFileSync(out, `${JSON.stringify(record, null, 1)}\n`); console.log(JSON.stringify(record, null, 1)); process.exit(code); };

(async () => {
  let chromium = null;
  for (const dir of LIBRARIES) {
    try { ({ chromium } = require(dir)); record.library = dir; break; } catch { /* next location */ }
  }
  if (!chromium) { record.unread = 'no playwright-core at any listed location'; finish(2); }
  const browser = await chromium.launch({ headless: true });
  try {
    record.browser = browser.version();
    const page = await (await browser.newContext({ locale: 'en-US' })).newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(`pageerror: ${String(e.message).slice(0, 200)}`));
    page.on('console', (m) => { if (m.type() === 'error') errors.push(`console: ${m.text().slice(0, 200)}`); });
    const response = await page.goto(URL_UNDER_TEST, { waitUntil: 'load', timeout: 60000 });
    record.status = response && response.status();
    await page.waitForTimeout(5000);
    // A signed-out visit opens a log-in prompt, and the content editor mounts only when the content is clicked.
    const later = page.getByText("I'll do it later");
    if (await later.count()) await later.first().click();
    await page.getByText('Welcome to Hooks.gg, the ultimate').first().click({ timeout: 60000 });
    const editor = page.locator('[data-slate-editor="true"]').first();
    await editor.waitFor({ state: 'visible', timeout: 60000 });
    await page.waitForTimeout(2000);
    record.editorsOnPage = await page.locator('[data-slate-editor="true"]').count();
    await editor.click();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await editor.pressSequentially(TEXT, { delay: 20 });
    record.editorText = await editor.innerText();
    await editor.evaluate((node) => node.blur());
    await page.keyboard.press('Escape');
    await page.waitForTimeout(3000);
    const all = await page.evaluate(() => [...document.querySelectorAll('main a[href]')].map((a) => [a.getAttribute('href'), a.textContent]));
    record.anchors = all.filter(([href]) => OURS.test(href));
    record.errors = errors;
    record.slightSmileInAnyTarget = record.anchors.some(([href]) => href.includes(':slight_smile'));
  } catch (e) {
    record.unread = String(e.message).slice(0, 400);
  } finally {
    await browser.close();
  }
  finish(record.unread || record.anchors.length < 2 ? 2 : 0);
})();
