// B-1 driver for the second test account, in its own Chrome profile (steering 20:50Z; coordinator go 20:48Z).
// Never touches mcp-chrome-313b550. Credentials are read from the owner's file and never printed or logged.
// Usage: DISPLAY=:0 node b01-account2-driver.cjs <profileDir> <label> <outJson>
//   label: a tag for the capture (e.g. b96e364 or 7ce866b); the site is whatever serves 127.0.0.1:3000.
// Steps: Discord login if needed (a challenge or new-login check is alerted and waited on, at most 30 min);
// discord guild names; site sign-in (OAuth consent → Authorize); the site's administered-server list; the message list.
const { chromium } = require('/home/dev/.npm/_npx/314abffa6aaf2cd1/node_modules/playwright');
const fs = require('fs');
const { execFileSync } = require('child_process');
const [profileDir, label, outJson] = process.argv.slice(2);
const cred = JSON.parse(fs.readFileSync('/home/dev/.claude-credentials/discord_test_user_2.json', 'utf8'));
const out = { label, steps: [] };
const log = (s) => { out.steps.push(new Date().toISOString().slice(11, 19) + ' ' + s); fs.writeFileSync(outJson, JSON.stringify(out, null, 1)); };
const alert = (kind, page) => { try { execFileSync('node', [process.env.HOME + '/.claude/tools/challenge-alert.js', kind, '--session', 'uat-hooks-015', '--stage', 'uat', ...(page ? ['--page', page] : [])], { stdio: 'ignore' }); return true; } catch { return false; } };
const blocked = async (p) => p.evaluate(() => /Are you human|captcha|new login location|Verify your|Check your email|Two-factor/i.test(document.body.innerText)).catch(() => false);
const waitClear = async (p, what) => {
  if (!(await blocked(p))) return true;
  log('challenge on ' + what + ': alerting'); if (!alert('challenge', p.url().split('?')[0])) { log('alert not delivered'); return false; }
  const t0 = Date.now();
  while (Date.now() - t0 < 30 * 60 * 1000) { await p.waitForTimeout(10000); if (!(await blocked(p))) { alert('resolved'); log('challenge resolved after ' + Math.round((Date.now() - t0) / 1000) + ' s'); return true; } }
  alert('timeout', p.url().split('?')[0]); log('challenge unsolved (30 min)'); return false;
};
(async () => {
  const ctx = await chromium.launchPersistentContext(profileDir, { channel: 'chrome', headless: false, viewport: { width: 1280, height: 900 } });
  const p = ctx.pages()[0] || await ctx.newPage();
  try {
    await p.goto('https://discord.com/channels/@me'); await p.waitForTimeout(8000);
    if (/\/login/.test(p.url())) {
      log('discord login page');
      await p.locator('input[name="email"]').fill(cred.email);
      await p.locator('input[name="password"]').fill(cred.password);
      await p.locator('button[type="submit"]').click(); await p.waitForTimeout(8000);
      if (!(await waitClear(p, 'discord login'))) throw new Error('stopped at login challenge');
      await p.waitForURL(/channels/, { timeout: 60000 }).catch(() => {});
    }
    out.discordUrl = p.url().split('?')[0];
    out.discordUserIdMatches = await p.evaluate((id) => document.documentElement.innerHTML.includes(id), String(cred.user_id)).catch(() => null);
    await p.waitForTimeout(4000);
    out.discordGuilds = await p.evaluate(() => Array.from(document.querySelectorAll('[data-list-item-id^="guildsnav___"]'))
      .map(e => (e.getAttribute('aria-label') || e.innerText || '').trim()).filter(t => t && !/Direct Messages|Add a Server|Discover|Download/i.test(t)));
    log('discord guilds read: ' + out.discordGuilds.length);
    // site sign-in
    await p.goto('http://127.0.0.1:3000/message'); await p.waitForTimeout(6000);
    const signedIn = async () => { await p.waitForLoadState('networkidle').catch(() => {}); await p.waitForTimeout(1500); return p.evaluate(async () => { const j = await fetch('/api/auth/session').then(r => r.json()).catch(() => ({})); return !!(j && j.user); }); };
    if (!(await signedIn())) {
      const login = p.getByRole('button', { name: 'Log in', exact: true }).last();
      if (!(await login.isVisible().catch(() => false))) { await p.getByRole('button', { name: 'login' }).click(); await p.waitForTimeout(600); }
      await p.getByRole('button', { name: 'Log in', exact: true }).last().click();
      await p.waitForURL(/discord\.com/, { timeout: 30000 }); await p.waitForTimeout(4000);
      if (!(await waitClear(p, 'oauth consent'))) throw new Error('stopped at consent challenge');
      await p.getByRole('button', { name: 'Authorize' }).click();
      await p.waitForURL(/127\.0\.0\.1:3000/, { timeout: 60000 }); await p.waitForTimeout(5000);
    }
    out.siteSignedIn = await signedIn(); log('site signed in: ' + out.siteSignedIn);
    // administered servers, as the site lists them
    await p.goto('http://127.0.0.1:3000/message/m/new'); await p.waitForTimeout(6000);
    out.siteServerChoices = await p.evaluate(() => Array.from(document.querySelectorAll('button')).filter(b => b.getClientRects().length)
      .map(b => b.innerText.trim()).filter(t => t && !/^(open sidebar|toggle site theme|user menu)$/i.test(t)));
    // the message list
    const tr = [];
    p.on('response', r => { if (/\/api\/trpc\//.test(r.url())) tr.push(r.url().split('/api/trpc/')[1].split('?')[0] + ' ' + r.status()); });
    await p.goto('http://127.0.0.1:3000/message/f/0'); await p.waitForTimeout(8000);
    out.listTrpc = tr;
    out.listText = (await p.evaluate(() => document.body.innerText)).slice(0, 400);
    out.listErrors = await p.evaluate(() => Array.from(document.querySelectorAll('[data-sonner-toast], .text-error')).map(e => e.textContent.trim()).filter(Boolean));
    await p.screenshot({ path: outJson.replace(/\.json$/, '.png') });
    log('done');
  } catch (e) { out.error = String(e).slice(0, 200); log('error'); }
  finally { await ctx.close(); fs.writeFileSync(outJson, JSON.stringify(out, null, 1)); }
})();
