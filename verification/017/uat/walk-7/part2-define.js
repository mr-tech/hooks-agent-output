async (page) => {
  const iso = () => new Date().toISOString();
  const A = page;
  if (!A.__B) {
    const B = await A.context().newPage();
    B.__log = { name: 'B', ws: [], errs: [] };
    B.on('websocket', ws => { const r = { url: ws.url().replace(/\?.*/, ''), created: iso(), closed: null }; B.__log.ws.push(r); ws.on('close', () => { r.closed = iso(); }); });
    B.on('pageerror', e => B.__log.errs.push([iso(), String(e).slice(0, 300)]));
    A.__B = B;
    await B.goto('http://127.0.0.1:3000/message/m/900000000000001/edit');
    await B.waitForTimeout(3000);
  }
  const B = A.__B;
  const noticeIn = (p) => p.evaluate(() => { const d = [...document.querySelectorAll('[role=dialog]')].filter(x => x.getBoundingClientRect().width > 0 && /Message Update Detected/.test(x.innerText)); return d.map(x => x.innerText.slice(0, 200)); });
  const dump = (p, base) => p.evaluate((b) => { const c = window.__cap; return { frames: c.frames.slice(b.frames), decoded: c.decoded.slice(b.decoded), upserts: c.upserts.slice(b.upserts).map(u => u.slice(0, 4)), errors: c.errors.slice(b.errors), ui: c.ui.slice(b.ui), sockets: c.sockets.map(s => [s[0], s[2], s[3], s[4]]) }; }, base);
  const lens = (p) => p.evaluate(() => { const c = window.__cap; return { frames: c.frames.length, decoded: c.decoded.length, upserts: c.upserts.length, errors: c.errors.length, ui: c.ui.length }; });
  const clickSave = async () => { await A.getByRole('button', { name: 'File', exact: true }).click(); await A.getByRole('button', { name: 'Save', exact: true }).click(); };
  A.__noticeIn = noticeIn; A.__dump = dump; A.__lens = lens;
  A.__cancel = async () => { const out = []; for (const p of [A, B]) { const n = await noticeIn(p); if (n.length) { await p.bringToFront(); const d = p.getByRole('dialog').filter({ hasText: 'Message Update Detected' }); out.push([p.__log.name, iso(), await d.innerText(), await d.getByRole('button').allInnerTexts()]); await d.getByRole('button', { name: 'Cancel' }).click({ timeout: 5000 }); await p.waitForTimeout(500); } } return out; };
  A.__run = async (label, plain) => {
    const res = { label, plain: !!plain, startedAt: iso() };
    const bA = await lens(A), bB = await lens(B);
    await A.bringToFront();
    const word = 'w' + Math.random().toString(36).slice(2, 8);
    await A.waitForTimeout(800);
    await A.locator('button').filter({ hasText: 'Welcome to Hooks.gg' }).first().click({ position: { x: 5, y: 5 } });
    const ed = A.locator('[contenteditable=true][role=textbox]').first();
    await ed.waitFor({ timeout: 5000 }); await A.waitForTimeout(400);
    await A.keyboard.press('Control+End');
    await A.keyboard.type(' ' + word);
    res.word = word; res.typedVerified = (await ed.innerText()).includes(word);
    await A.getByRole('button', { name: 'File', exact: true }).click();
    res.afterFileClickEditorOpen = await A.locator('[contenteditable=true][role=textbox]').count();
    await A.getByRole('button', { name: 'Save', exact: true }).click();
    res.saveClickReturnedAt = iso();
    if (!plain) {
      await A.waitForTimeout(30);
      res.editAt = await A.evaluate(() => { const i = document.querySelector('input[aria-label="Message Name"]'); const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set; set.call(i, i.value + 'x'); i.dispatchEvent(new Event('input', { bubbles: true })); window.__editAt = new Date().toISOString(); return [window.__editAt, i.value]; });
    }
    await A.waitForTimeout(10000);
    res.A = await dump(A, bA); res.B = await dump(B, bB);
    res.noticeA = await noticeIn(A); res.noticeB = await noticeIn(B);
    res.pageerrorsA = A.__log.errs; res.pageerrorsB = B.__log.errs;
    return res;
  };
  A.__resync = async (label) => {
    const r = { label, t0: iso() };
    r.cancel1 = await A.__cancel();
    const bA = await lens(A), bB = await lens(B);
    await A.bringToFront();
    const nm = await A.evaluate(() => document.querySelector('input[aria-label="Message Name"]').value);
    r.nameBeforeSave = nm;
    await clickSave(); r.saveAt = iso();
    await A.waitForTimeout(6000);
    r.A = await dump(A, bA); r.B = await dump(B, bB);
    r.noticeA = await noticeIn(A); r.noticeB = await noticeIn(B);
    r.cancel2 = await A.__cancel();
    r.Bdump_before_reload = await dump(B, { frames: 0, decoded: 0, upserts: 0, errors: 0, ui: 0 });
    await B.reload(); await B.waitForTimeout(4000);
    r.Bsockets_after_reload = await B.evaluate(() => window.__cap.sockets.map(s => [s[0], s[2], s[3], s[4]]));
    return r;
  };
  return 'defined';
}
