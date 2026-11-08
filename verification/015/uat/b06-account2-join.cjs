// B-6 step: account 2 accepts an invite to the new test server, in its own Chrome profile.
// Never touches mcp-chrome-313b550. Posts nothing. Usage: DISPLAY=:0 node b06-account2-join.cjs <profileDir> <inviteCode> <guildId> <outJson>
const { chromium } = require('/home/dev/.npm/_npx/314abffa6aaf2cd1/node_modules/playwright');
const fs = require('fs');
const { execFileSync } = require('child_process');
const [profileDir, code, guildId, outJson] = process.argv.slice(2);
const out = { steps: [] };
const log = (s) => { out.steps.push(new Date().toISOString().slice(11, 19) + ' ' + s); fs.writeFileSync(outJson, JSON.stringify(out, null, 1)); };
const alert = (kind, page) => { try { execFileSync('node', [process.env.HOME + '/.claude/tools/challenge-alert.js', kind, '--session', 'uat-hooks-015', '--stage', 'uat', ...(page ? ['--page', page] : [])], { stdio: 'ignore' }); return true; } catch { return false; } };
const blocked = async (p) => p.evaluate(() => !!document.querySelector('iframe[src*=hcaptcha]') || /Are you human/i.test(document.body.innerText)).catch(() => false);
(async () => {
  const ctx = await chromium.launchPersistentContext(profileDir, { channel: 'chrome', headless: false, viewport: { width: 1280, height: 900 } });
  const p = ctx.pages()[0] || await ctx.newPage();
  try {
    await p.goto('https://discord.com/invite/' + code); await p.waitForTimeout(8000);
    out.pageText = (await p.evaluate(() => document.body.innerText)).slice(0, 300);
    const btn = p.getByRole('button', { name: /Accept Invite|Join Server|Join/ }).first();
    if (await btn.isVisible().catch(() => false)) { await btn.click(); log('accept clicked'); await p.waitForTimeout(6000); }
    if (await blocked(p)) {
      log('challenge: alerting'); if (!alert('challenge', p.url().split('?')[0])) throw new Error('alert not delivered');
      const t0 = Date.now();
      while (await blocked(p)) { if (Date.now() - t0 > 30 * 60 * 1000) { alert('timeout'); throw new Error('challenge unsolved'); } await p.waitForTimeout(10000); }
      alert('resolved'); log('challenge resolved after ' + Math.round((Date.now() - t0) / 1000) + ' s');
    }
    await p.waitForURL(new RegExp('/channels/' + guildId), { timeout: 60000 }).catch(() => {});
    if (!new RegExp('/channels/' + guildId).test(p.url())) { await p.goto('https://discord.com/channels/' + guildId); await p.waitForTimeout(6000); }
    out.finalUrl = p.url(); out.title = await p.title();
    out.joined = new RegExp('/channels/' + guildId + '/').test(p.url()) && /Hooks\.gg Test 015/.test(out.title);
    await p.screenshot({ path: outJson.replace(/\.json$/, '.png') });
    log('done');
  } catch (e) { out.error = String(e).slice(0, 200); log('error'); }
  finally { await ctx.close(); fs.writeFileSync(outJson, JSON.stringify(out, null, 1)); }
})();
