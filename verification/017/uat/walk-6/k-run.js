async (page) => { const A = page; const B = page.context().pages()[1];
const SINK = 'http://127.0.0.1:3999/';
const put = (name, obj) => A.request.post(SINK + name, { data: JSON.stringify(obj, null, 1), headers: { 'content-type': 'text/plain' } });
const iso = () => new Date().toISOString();
const notice = (cap, since, until) => { for (const e of cap.ui) { if (e[0] >= since && (!until || e[0] < until) && e[1].some(d => /Message Update Detected/.test(d))) return { at: e[0], dialogs: e[1], toasts: e[2] }; } return null; };
const crashed = async (p) => { try { return await p.evaluate(() => /Application error/i.test(document.body.innerText)); } catch (e) { return 'evalfail:' + String(e).slice(0, 80); } };
const dismiss = async (p) => { try { await p.locator('[role=dialog]', { hasText: 'Message Update Detected' }).getByRole('button', { name: 'Cancel' }).click({ timeout: 3000 }); return 'cancelled'; } catch (e) { return 'cancel-failed:' + String(e).slice(0, 80); } };
const doSave = async (p) => {
  await p.getByRole('button', { name: 'File', exact: true }).click();
  const save = p.locator('[role=dialog]', { hasText: 'Save as...' }).getByText('Save', { exact: true });
  await save.waitFor({ timeout: 5000 });
  await save.click();
};
async function oneRun(label, opts = {}) {
  const runStart = iso(); const row = { run: label, runStart };
  const logStart = A.__log.length;
  const word = 'p' + label;
  if (!opts.noType) {
    await A.getByRole('button', { name: /^Welcome to Hooks.gg, the/ }).click();
    await A.waitForTimeout(500);
    await A.locator('[contenteditable=true][role=textbox]').first().click();
    await A.keyboard.press('Control+End');
    await A.keyboard.type(word, { delay: 20 });
    const landed = await A.evaluate(() => document.activeElement.innerText.trim().slice(-14));
    row.landed = landed;
    if (!landed.endsWith(word)) { row.aborted = 'typed text not landed'; return row; }
  }
  await doSave(A);
  const clickReturned = iso();
  if (opts.noEdit) { row.edit = 'none'; } else {
  await A.evaluate(() => { setTimeout(() => { const i = document.querySelector('input[aria-label="Message Name"]'); const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set; set.call(i, i.value + 'x'); i.dispatchEvent(new Event('input', { bubbles: true })); window.__editAt = new Date().toISOString(); }, 30); });
  }
  await A.waitForTimeout(10000);
  const t2 = iso();
  const capA = await A.evaluate(() => JSON.parse(JSON.stringify(window.__cap)));
  const capB = await B.evaluate(() => JSON.parse(JSON.stringify(window.__cap)));
  row.editAt = await A.evaluate(() => window.__editAt || null);
  row.saveClickReturned = clickReturned;
  row.upserts = capA.upserts.filter(u => u[0] >= runStart && u[0] < t2).map(u => [u[0], u[1], u[2], u[3]]);
  row.framesA = capA.frames.filter(f => f[0] >= runStart && f[0] < t2).map(f => f[0]);
  row.framesB = capB.frames.filter(f => f[0] >= runStart && f[0] < t2).map(f => f[0]);
  row.noticeA = notice(capA, runStart, t2); row.noticeB = notice(capB, runStart, t2);
  row.errorsA = capA.errors.filter(e => e[0] >= runStart); row.logA = A.__log.slice(logStart);
  row.crashA = await crashed(A);
  if (opts.afterWait) await opts.afterWait();
  // re-sync
  row.dismissA = row.noticeA ? await dismiss(A) : 'n/a';
  row.dismissB = row.noticeB ? await dismiss(B) : 'n/a';
  const resaveStart = iso();
  try { await doSave(A); await A.waitForTimeout(10000); } catch (e) { row.resaveErr = String(e).slice(0, 150); }
  const capA2 = await A.evaluate(() => JSON.parse(JSON.stringify(window.__cap)));
  row.resaveNoticeA = notice(capA2, resaveStart);
  row.resaveUpserts = capA2.upserts.filter(u => u[0] >= resaveStart).map(u => [u[0], u[1], u[2], u[3]]);
  row.nameAfter = await A.evaluate(() => document.querySelector('input[aria-label="Message Name"]')?.value);
  const capB2 = await B.evaluate(() => JSON.parse(JSON.stringify(window.__cap)));
  row.resaveNoticeB = notice(capB2, resaveStart);
  await put(label + '-A-cap.json', { run: label, tab: 'A', cap: capA2, log: A.__log });
  await put(label + '-B-cap.json', { run: label, tab: 'B', cap: capB2, log: B.__log });
  await B.reload(); await B.waitForTimeout(3000);
  row.bCapAfterReload = await B.evaluate(() => !!window.__cap);
  row.logAAll = A.__log.slice(logStart);
  A.__summary = A.__summary || []; A.__summary.push(row);
  await put('summary-' + label + '.json', row);
  return row;
}
async function batch(labels, opts) { const out = []; for (const l of labels) { const r = await oneRun(l, opts); out.push(r); if (r.aborted || r.crashA === true) break; } return out; }

await A.route('**/message.upsert**', async (route) => { const resp = await route.fetch(); await route.fulfill({ status: 500, contentType: 'application/json', body: '[{"error":{"message":"planted","code":-32603,"data":{"code":"INTERNAL_SERVER_ERROR","httpStatus":500}}}]' }); });
return await batch(['K'], { afterWait: async () => { await A.unroute('**/message.upsert**'); } });
}
