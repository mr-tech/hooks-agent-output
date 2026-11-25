// UAT 019 B-1, Firefox limb: /preview with the wasm blocked, then unblocked. usage: node b1-firefox.js <out.json>
'use strict';
const fs = require('fs');
const { firefox } = require('/home/dev/.cache/qa-083-harness/node_modules/playwright-core');
const base = 'http://127.0.0.1:3000';
const message = { content: '**a** plain *i* ||s||', embeds: [] };
const url = `${base}/preview?data=${encodeURIComponent(JSON.stringify(message))}`;
async function run(browser, block) {
  const ctx = await browser.newContext(); const page = await ctx.newPage();
  const con = []; page.on('console', (m) => con.push(`${m.type()}: ${m.text().slice(0, 200)}`));
  const wasm = [];
  await page.route('**/*.wasm', (r) => { wasm.push(r.request().url()); return block ? r.abort() : r.continue(); });
  await page.goto(url, { waitUntil: 'load' }); await page.waitForTimeout(5000);
  const r = await page.evaluate(() => ({ text: document.body.innerText.slice(0, 400), strong: document.querySelectorAll('strong').length,
    em: document.querySelectorAll('em').length, hasA: document.body.innerText.includes('**a**') }));
  await ctx.close();
  return { block, wasm, ...r, initFailureLines: con.filter((c) => c.includes('markdown-engine-init-failure')), console: con };
}
(async () => {
  const browser = await firefox.launch({ headless: true });
  const out = { browser: `firefox ${browser.version()}`, url, blocked: await run(browser, true), unblocked: await run(browser, false) };
  await browser.close();
  fs.writeFileSync(process.argv[2], JSON.stringify(out, null, 1));
  console.log(JSON.stringify({ b: [out.blocked.strong, out.blocked.hasA, out.blocked.initFailureLines.length, out.blocked.wasm.length], u: [out.unblocked.strong, out.unblocked.hasA, out.unblocked.initFailureLines.length] }));
})().catch((e) => { console.error(e); process.exit(1); });
