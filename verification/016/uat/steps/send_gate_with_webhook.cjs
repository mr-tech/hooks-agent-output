// B-1 discriminating read: Send state with a webhook selected, on the send page of a stored message.
// Env EXPECT=refused|accepted is only a label. Creates a temporary test-server webhook, deletes it at the end.
const fs = require('fs');
const CH = '1566742403195469906', GUILD = '1566742402180456559';
module.exports = async (page, ctx, h) => {
  const tok = fs.readFileSync('/home/dev/.claude-credentials/test_bot_token', 'utf8').trim();
  const H = { Authorization: `Bot ${tok}`, 'Content-Type': 'application/json', 'User-Agent': 'DiscordBot (uat-016, 1)' };
  const ch = await (await fetch(`https://discord.com/api/v10/channels/${CH}`, { headers: H })).json();
  if (ch.guild_id !== GUILD) throw new Error('wrong guild');
  const w = await (await fetch(`https://discord.com/api/v10/channels/${CH}/webhooks`, { method: 'POST', headers: H, body: JSON.stringify({ name: 'uat-016' }) })).json();
  try {
    await page.goto('http://127.0.0.1:3000/message/m/900000000000001/send', { waitUntil: 'load' });
    await h.guard();
    await page.getByPlaceholder(/webhook url/i).or(page.getByLabel(/webhook url/i)).first().waitFor({ timeout: 60000 });
    await page.waitForTimeout(2000);
    const before = await h.err();
    await page.getByPlaceholder(/webhook url/i).or(page.getByLabel(/webhook url/i)).first().fill(`https://discord.com/api/webhooks/${w.id}/${w.token}`);
    await page.waitForTimeout(5000);
    // the URL field is cleared from view before any screenshot: read state, then blank the field's display
    const send = await page.evaluate(() => {
      const b = [...document.querySelectorAll('button')].find((x) => /^\s*(Send|Edit)\s*$/.test(x.textContent));
      return b ? { text: b.textContent.trim(), disabled: b.disabled, ariaDisabled: b.getAttribute('aria-disabled'), dataDisabled: b.getAttribute('data-disabled') } : null;
    });
    const after = await h.err();
    const webhookShown = await page.evaluate(() => document.body.innerText.includes('uat-016'));
    h.log({ label: process.env.EXPECT, errBefore: before, errAfter: after, send, webhookShown });
    await page.evaluate(() => document.querySelectorAll('input').forEach((i) => { if (/discord\.com\/api\/webhooks/.test(i.value)) i.style.visibility = 'hidden'; }));
    await h.shot(`send-gate-${process.env.EXPECT}`);
    return { label: process.env.EXPECT, errBefore: before, errAfter: after, send, webhookShown };
  } finally {
    await fetch(`https://discord.com/api/v10/webhooks/${w.id}`, { method: 'DELETE', headers: H });
    h.log('temporary webhook deleted');
  }
};
