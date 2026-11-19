async (page) => {
  const A = page; const t0 = new Date().toISOString(); const logStart = A.__log.length;
  await A.bringToFront();
  const res = await A.evaluate(() => {
    const fire = (el) => el.click();
    const out = {};
    const file = [...document.querySelectorAll('button')].find(b => b.innerText.trim() === 'File');
    out.fileFound = !!file; if (file) fire(file);
    const dlg = [...document.querySelectorAll('[role=dialog]')].find(d => /Save as\.\.\./.test(d.innerText));
    out.dialogPresentSync = !!dlg;
    const save = dlg && [...dlg.querySelectorAll('button')].find(b => b.innerText.trim() === 'Save');
    out.saveFound = !!save; out.saveDisabled = save ? save.disabled : null; if (save) fire(save);
    return out;
  }).catch(e => ({ evalError: String(e).slice(0, 200) }));
  await A.waitForTimeout(3000);
  const crash = await A.evaluate(() => /Application error/i.test(document.body.innerText)).catch(e => 'evalfail:' + String(e).slice(0, 100));
  const cap = await A.evaluate(() => JSON.parse(JSON.stringify(window.__cap))).catch(e => 'capfail:' + String(e).slice(0, 100));
  await A.request.post('http://127.0.0.1:3999/X-synth2-A-cap.json', { data: JSON.stringify({ t0, res, crash, cap, log: A.__log }, null, 1) });
  return { t0, res, crash, log: A.__log.slice(logStart), upserts: cap.upserts ? cap.upserts.filter(u => u[0] >= t0) : cap, bodyHead: await A.evaluate(() => document.body.innerText.slice(0, 200)).catch(() => null) };
}
