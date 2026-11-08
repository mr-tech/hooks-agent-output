// B-9 (M4-d, D26): in the New Message dialog's bot load (Message Link), a discordapp.com message link is accepted
// and makes one message.getFromUrl request, as the discord.com control does; the loaded message equals the control's.
// Route (D39 limb 3): /message/m/1/edit loaded, then the app's own link to /message/f/0 (no reload), then
// "new message" → "Upload Message". Nothing is saved (Continue is never pressed).
async (page) => {
  const G = '1566742402180456559', C = '1566742403195469906', M = '1569090193250717909';
  const openDialog = async () => {
    await page.goto('http://127.0.0.1:3000/message/m/1/edit'); await page.waitForTimeout(6000);
    await page.locator('a[href="/message/f/0"]').first().click();
    await page.waitForURL(/\/message\/f\/0/, { timeout: 20000 }); await page.waitForTimeout(4000);
    await page.getByRole('button', { name: 'new message' }).click(); await page.waitForTimeout(1500);
    await page.getByRole('button', { name: 'Upload Message' }).last().click(); await page.waitForTimeout(3000);
    return page.evaluate(() => document.body.innerText.includes('Create or upload a new message'));
  };
  const tryLink = async (url) => {
    const opened = await openDialog();
    const reqs = [];
    const h = r => { if (/\/api\/trpc\/message\.getFromUrl/.test(r.url())) reqs.push(r); };
    page.on('response', h);
    const inp = page.locator('input[placeholder^="https://discord.com/channels"]:visible').first();
    await inp.click(); await inp.fill(url); await page.waitForTimeout(6000);
    page.off('response', h);
    const bodies = [];
    for (const r of reqs) { let b = ''; try { b = await r.text(); } catch {} bodies.push({ status: r.status(), hasContent: /"content"|"embeds"|"components"/.test(b), len: b.length }); }
    const dlg = await page.evaluate(() => { const d = Array.from(document.querySelectorAll('[role="dialog"]')).find(x => x.innerText.includes('Create or upload a new message')); return d ? d.innerText.slice(0, 400) : null; });
    const cont = await page.locator('button:visible', { hasText: /^Continue$/ }).first().isEnabled().catch(() => null);
    await page.keyboard.press('Escape'); await page.waitForTimeout(800);
    return { route: 'via /message/m/1/edit → in-app link → f/0, no reload', opened, url, requests: bodies, continueEnabled: cont, dialogText: dlg };
  };
  return {
    control: await tryLink(`https://discord.com/channels/${G}/${C}/${M}`),
    discordapp: await tryLink(`https://discordapp.com/channels/${G}/${C}/${M}`),
    discordappPtb: await tryLink(`https://ptb.discordapp.com/channels/${G}/${C}/${M}`),
  };
}
