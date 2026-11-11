// B-4 on hooks.gg after release: the test account's draft 6008 (made by B-3's picker), Components V2, set
// exactly through Edit > JSON (the editor keeps its state client-side). No Save.
// Control: one Text Display "" -> send page, temporary test-server webhook selected -> Send state.
// Then one Text Display "hello" -> Send state -> Send; check Discord; delete the message and the webhook.
// Sends only to the agents' test server (guild 1566742402180456559, #general).
const fs = require('fs');
const CH = '1566742403195469906', GUILD = '1566742402180456559';
module.exports = async (page, ctx, h) => {
  const tok = fs.readFileSync('/home/dev/.claude-credentials/test_bot_token', 'utf8').trim();
  const H = { Authorization: `Bot ${tok}`, 'Content-Type': 'application/json', 'User-Agent': 'DiscordBot (uat-016, 1)' };
  const ch = await (await fetch(`https://discord.com/api/v10/channels/${CH}`, { headers: H })).json();
  if (ch.guild_id !== GUILD) throw new Error('wrong guild');
  const w = await (await fetch(`https://discord.com/api/v10/channels/${CH}/webhooks`, { method: 'POST', headers: H, body: JSON.stringify({ name: 'uat-016' }) })).json();
  const out = {};
  const sendState = () => page.evaluate(() => {
    const b = [...document.querySelectorAll('button')].find((x) => /^\s*(Send|Edit)\s*$/.test(x.textContent));
    return b ? { text: b.textContent.trim(), disabled: b.disabled } : null;
  });
  const loadJson = async (content) => {
    await page.goto('https://hooks.gg/message/m/6008/edit', { waitUntil: 'load' });
    await page.waitForTimeout(7000); await h.guard();
    await page.getByRole('button', { name: 'Edit', exact: true }).click(); await page.waitForTimeout(800);
    await page.getByRole('button', { name: 'JSON', exact: true }).click(); await page.waitForTimeout(1500);
    await page.locator('.cm-content').click(); await page.keyboard.press('Control+A'); await page.keyboard.press('Delete');
    await page.keyboard.insertText(JSON.stringify({ username: 'Hooks.gg Bot', flags: 32768, components: [{ type: 10, content }] })); await page.waitForTimeout(800);
    await page.getByRole('button', { name: 'Load', exact: true }).click(); await page.waitForTimeout(1500);
    for (const n of [/^confirm$/i, /^continue$/i, /^load$/i, /^yes$/i]) { const b = page.getByRole('button', { name: n }); if (await b.count()) { await b.first().click(); await page.waitForTimeout(1500); } }
    await page.keyboard.press('Escape'); await page.waitForTimeout(1500);
    const txt = await page.locator('body').innerText();
    return { err: await h.err(), counter: txt.match(/\b\d+\/40\b/)?.[0], tdButtons: await page.getByRole('button', { name: 'Text Display actions' }).count() };
  };
  const toSend = async () => {
    await page.getByRole('link', { name: 'Send', exact: true }).first().click();
    const box = page.getByPlaceholder(/webhook url/i).or(page.getByLabel(/webhook url/i)).first();
    await box.or(page.getByText('uat-016', { exact: true })).first().waitFor({ timeout: 60000 }); await page.waitForTimeout(2000);
    if (await box.count() && !(await box.inputValue())) { await box.fill(`https://discord.com/api/webhooks/${w.id}/${w.token}`); }
    await page.waitForTimeout(5000);
    await page.evaluate(() => document.querySelectorAll('input').forEach((i) => { if (/discord\.com\/api\/webhooks/.test(i.value)) i.style.visibility = 'hidden'; }));
    return { err: await h.err(), send: await sendState(), webhookShown: await page.evaluate(() => document.body.innerText.includes('uat-016')) };
  };
  try {
    out.editorEmpty = await loadJson('');
    out.refused = await toSend(); await h.shot('prod-b4-refused'); h.log('refused', out.editorEmpty, out.refused);
    out.editorFilled = await loadJson('hello');
    out.accepted = await toSend(); await h.shot('prod-b4-accepted'); h.log('accepted', out.editorFilled, out.accepted);
    if (out.accepted.send && !out.accepted.send.disabled && out.accepted.send.text === 'Send') {
      const resp = page.waitForResponse((r) => r.url().startsWith(`https://discord.com/api/webhooks/${w.id}`), { timeout: 20000 }).catch(() => null);
      await page.evaluate(() => [...document.querySelectorAll('button')].find((x) => /^\s*Send\s*$/.test(x.textContent)).click());
      const r = await resp; out.sendHttp = r ? { status: r.status() } : null;
      await page.waitForTimeout(3000);
      out.toasts = await page.evaluate(() => [...document.querySelectorAll('[data-sonner-toast], [role="status"]')].map((t) => t.textContent.trim()).filter(Boolean));
      out.sentAt = new Date().toISOString();
      await h.shot('prod-b4-sent');
      const msgs = await (await fetch(`https://discord.com/api/v10/channels/${CH}/messages?limit=5`, { headers: H })).json();
      const m = msgs.find((x) => x.webhook_id === w.id);
      out.discord = m ? { id: m.id, timestamp: m.timestamp, author: m.author.username, flags: m.flags, components: (m.components || []).map((c) => [c.type, c.content]) } : null;
      if (m) { const d = await fetch(`https://discord.com/api/v10/channels/${CH}/messages/${m.id}`, { method: 'DELETE', headers: H }); out.deleteStatus = d.status; }
    }
    h.log(out);
    return out;
  } finally {
    const d = await fetch(`https://discord.com/api/v10/webhooks/${w.id}`, { method: 'DELETE', headers: H });
    const hooks = await (await fetch(`https://discord.com/api/v10/channels/${CH}/webhooks`, { headers: H })).json();
    h.log('webhook delete', d.status, 'webhooks now', hooks.map((x) => x.name));
  }
};
