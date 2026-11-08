// B-6 read (Apps → Hooks.gg submenu, the per-app grouping): in account 2's own Chrome profile, right-click an existing message in a guild → Apps, list the app commands.
// Never touches mcp-chrome-313b550. Posts nothing, types nothing. Usage: DISPLAY=:0 node b06-account2-apps-check.cjs <profileDir> <guildId> <outJson>
const { chromium } = require('/home/dev/.npm/_npx/314abffa6aaf2cd1/node_modules/playwright');
const fs = require('fs');
const [profileDir, guildId, outJson] = process.argv.slice(2);
const out = { steps: [] };
const log = (s) => { out.steps.push(new Date().toISOString().slice(11, 19) + ' ' + s); fs.writeFileSync(outJson, JSON.stringify(out, null, 1)); };
(async () => {
  const ctx = await chromium.launchPersistentContext(profileDir, { channel: 'chrome', headless: false, viewport: { width: 1280, height: 900 } });
  const p = ctx.pages()[0] || await ctx.newPage();
  try {
    await p.goto('https://discord.com/channels/' + guildId); await p.waitForTimeout(10000);
    out.url = p.url(); out.title = await p.title();
    if (await p.evaluate(() => !!document.querySelector('iframe[src*=hcaptcha]') || /\/login/.test(location.pathname))) throw new Error('challenge or login shown; stopped');
    const msgs = p.locator('li[id^="chat-messages-"]');
    out.messageCount = await msgs.count(); log('messages visible: ' + out.messageCount);
    const target = msgs.last();
    out.targetId = await target.getAttribute('id');
    out.targetAuthor = await target.locator('[id^="message-username-"]').first().innerText().catch(() => '(continuation)');
    await target.click({ button: 'right' }); await p.waitForTimeout(1500);
    out.menuItems = await p.locator('[role=menu] [role=menuitem]').allInnerTexts();
    const apps = p.locator('[role=menu] [role=menuitem]', { hasText: /^Apps$/ }).first();
    if (await apps.count()) {
      await apps.hover(); await p.waitForTimeout(2500);
      const menus = p.locator('[role=menu]');
      out.menuCount = await menus.count();
      out.appsSubmenu = (await menus.last().locator('[role=menuitem]').allInnerTexts()).map(t => t.replace(/\s+/g, ' ').trim());
      log('apps submenu read');
      const hg = menus.last().locator('[role=menuitem]', { hasText: /^Hooks\.gg$/ }).first();
      if (await hg.count()) { await hg.hover(); await p.waitForTimeout(2500); out.hooksMenu = (await p.locator('[role=menu]').last().locator('[role=menuitem]').allInnerTexts()).map(t => t.replace(/\s+/g, ' ').trim()); log('hooks.gg submenu read'); }
    } else log('no Apps item in the context menu');
    out.getMessageListed = (out.hooksMenu || out.appsSubmenu || []).some(t => /^Get Message\b/.test(t));
    out.readAt = new Date().toISOString();
    await p.screenshot({ path: outJson.replace(/\.json$/, '.png') });
    await p.keyboard.press('Escape'); await p.keyboard.press('Escape');
    log('done');
  } catch (e) { out.error = String(e).slice(0, 200); log('error'); }
  finally { await ctx.close(); fs.writeFileSync(outJson, JSON.stringify(out, null, 1)); }
})();
