// QA Phase 2 browser instrument, fix-website-save-gate-embeds. Passed inline to
// mcp__playwright__browser_run_code_unsafe with the two constants below edited per run:
//   ID     the stored message id (seed-result.txt)
//   ACTION 'save' (Ctrl+S, no choice expected) | 'classic' | 'v2' (Ctrl+S, then that choice button)
//          | 'fail' (Ctrl+S with message.upsert aborted at the network)
// Reads, after the act: the Pusher frames this page received for its own channel, whether the
// "Message Update Detected" prompt and the "Are you sure?" choice dialog are shown, toasts, which
// mode tab is active, whether the unsaved-save button is shown, and the editor's held message as the
// provider mirrors it to localStorage ('message' key, written on every editor message change).
async (page) => {
  const ID = '900000000000001';
  const ACTION = 'save';
  const BASE = 'http://127.0.0.1:3000';
  const frames = [];
  const wsUrls = [];
  page.on('websocket', (ws) => {
    wsUrls.push(ws.url().split('?')[0]);
    ws.on('framereceived', (f) => {
      const p = typeof f.payload === 'string' ? f.payload : '';
      if (p.includes('message-update')) frames.push({ t: Date.now(), p: p.slice(0, 300) });
    });
  });
  if (ACTION === 'fail') {
    await page.route('**/api/trpc/**', (route) => (
      route.request().url().includes('message.upsert') ? route.abort() : route.continue()));
  }
  const read = async () => page.evaluate(() => {
    const text = document.body.innerText;
    const modeBtn = (label) => {
      // The mode switch is one button whose two span children carry the labels; the active one
      // has bg-modifier-hover (checked in the browser at 963a25c, 09:52Z).
      const b = Array.from(document.querySelectorAll('button span')).find((x) => x.textContent.trim() === label);
      return b ? b.className.includes('bg-modifier-hover') : null;
    };
    let held = null;
    for (let i = 0; i < localStorage.length; i += 1) {
      const k = localStorage.key(i);
      if (/message/i.test(k)) {
        try { const v = JSON.parse(localStorage.getItem(k)); if (v && v.data) held = { key: k, id: v.id ?? null, data: v.data }; } catch (_) { /* not JSON */ }
      }
    }
    return {
      updatePrompt: text.includes('Message Update Detected'),
      choiceDialog: text.includes('Choose which to keep'),
      saveAsClassicShown: text.includes('Save as Classic'),
      saveAsV2Shown: text.includes('Save as Components V2'),
      toastSaved: text.includes('Message saved!'),
      toastFailed: text.includes('Failed to save message'),
      unsavedButton: !!document.querySelector('[aria-label="save message"]'),
      modeClassicActive: modeBtn('Classic'),
      modeV2Active: modeBtn('Components V2'),
      // Any open dialog's text (headlessui portal), so a modal that blocks the page is named.
      portal: (document.getElementById('headlessui-portal-root')?.innerText ?? '').slice(0, 500),
      held,
    };
  });
  await page.goto(`${BASE}/message/m/${ID}/edit`, { timeout: 120000 });
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.waitForTimeout(6000);
  const out = { id: ID, action: ACTION, before: await read() };
  await page.locator('body').click({ position: { x: 5, y: 5 } }).catch(() => {});
  await page.keyboard.press('Control+s');
  await page.waitForTimeout(2500);
  out.afterCtrlS = await read();
  if (ACTION === 'classic' || ACTION === 'v2') {
    const label = ACTION === 'classic' ? 'Save as Classic' : 'Save as Components V2';
    await page.getByRole('button', { name: new RegExp(`^${label}`) }).click();
  }
  await page.waitForTimeout(8000);
  out.after = await read();
  // The Send page, reached by its in-app link (client-side, no reload): does the send check refuse
  // the held message?
  const sendLink = page.locator('a[href$="/send"]').first();
  if (out.after.portal) {
    out.send = 'not attempted: a dialog is open (after.portal)';
  } else if (await sendLink.count()) {
    await sendLink.click({ timeout: 10000 });
    await page.waitForTimeout(6000);
    out.send = await page.evaluate(() => ({
      url: location.pathname,
      refusesV2Mixed: document.body.innerText.includes('Components V2 messages cannot contain embeds or content'),
      updatePrompt: document.body.innerText.includes('Message Update Detected'),
    }));
  } else {
    out.send = 'no send link found';
  }
  out.frames = frames;
  out.wsUrls = Array.from(new Set(wsUrls));
  return out;
}
