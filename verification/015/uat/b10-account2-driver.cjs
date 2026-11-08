// B-10 (M4-d CR-12 rider, D27): account 2, a plain member (no Manage Server / Administrator) of "Claude", which has the
// Hooks.gg bot, loads a link to a message in Claude through the New Message dialog's bot load. Expected: refused, no
// message content in the getFromUrl response. Runs only in account 2's own profile. Route (D39 limb 3): an editor page
// first, then the in-app link to /message/f/0 (no reload), then "new message" → "Upload Message". Saves nothing.
// Usage: DISPLAY=:0 node b10-account2-driver.cjs <profileDir> <outJson>
const { chromium } = require('/home/dev/.npm/_npx/314abffa6aaf2cd1/node_modules/playwright');
const fs = require('fs');
const [profileDir, outJson] = process.argv.slice(2);
const G = '1566742402180456559', C = '1566742403195469906', M = '1569090193250717909';
const out = {};
(async () => {
  const ctx = await chromium.launchPersistentContext(profileDir, { channel: 'chrome', headless: false, viewport: { width: 1280, height: 900 } });
  const p = ctx.pages()[0] || await ctx.newPage();
  try {
    await p.goto('http://127.0.0.1:3000/message/m/0/edit'); await p.waitForLoadState('networkidle').catch(() => {}); await p.waitForTimeout(6000);
    out.signedIn = await p.evaluate(async () => { const j = await fetch('/api/auth/session').then(r => r.json()).catch(() => ({})); return !!(j && j.user); });
    await p.locator('a[href="/message/f/0"]').first().click();
    await p.waitForURL(/\/message\/f\/0/, { timeout: 30000 }); await p.waitForTimeout(5000);
    out.saveToChoices = null;
    await p.getByRole('button', { name: 'new message' }).click(); await p.waitForTimeout(1500);
    await p.getByRole('button', { name: 'Upload Message' }).last().click(); await p.waitForTimeout(3000);
    out.opened = await p.evaluate(() => document.body.innerText.includes('Create or upload a new message'));
    out.route = 'via /message/m/0/edit → in-app link → f/0, no reload';
    if (out.opened) {
      const reqs = [];
      p.on('response', r => { if (/\/api\/trpc\/message\.getFromUrl/.test(r.url())) reqs.push(r); });
      const inp = p.locator('input[placeholder^="https://discord.com/channels"]:visible').first();
      await inp.click(); await inp.fill(`https://discord.com/channels/${G}/${C}/${M}`); await p.waitForTimeout(7000);
      out.requests = [];
      for (const r of reqs) { let b = ''; try { b = await r.text(); } catch {} out.requests.push({ status: r.status(), hasMessageContent: /"content"\s*:|"embeds"\s*:|"author"\s*:/.test(b), errorMessage: (b.match(/"message":"([^"]{0,120})"/) || [])[1] || null }); }
      out.dialogText = await p.evaluate(() => { const d = Array.from(document.querySelectorAll('[role="dialog"]')).find(x => x.innerText.includes('Create or upload a new message')); return d ? d.innerText.slice(0, 400) : null; });
      out.continueEnabled = await p.locator('button:visible', { hasText: /^Continue$/ }).first().isEnabled().catch(() => null);
      await p.screenshot({ path: outJson.replace(/\.json$/, '.png') });
      await p.keyboard.press('Escape');
    }
  } catch (e) { out.error = String(e).slice(0, 200); }
  finally { await ctx.close(); fs.writeFileSync(outJson, JSON.stringify(out, null, 1)); }
})();
