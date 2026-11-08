// UAT-4 probe: on the account folder page, "new message" -> "Upload Message", does NewMessageModal mount?
// Drives an already-running Chrome over CDP (no Playwright). Real pointer events via Input.dispatchMouseEvent.
// Usage: node upload-dialog-cdp.mjs <cdpPort> <baseUrl> [folderPath=/message/f/0]
// Prints one JSON object: console lines, page exceptions, dialog state before/after, menu buttons seen.
const [cdpPort, baseUrl, folderPath = '/message/f/0', sessionToken = '', viaPath = ''] = process.argv.slice(2);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const targets = await (await fetch(`http://127.0.0.1:${cdpPort}/json/list`)).json();
const page = targets.find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r, { once: true }));
let seq = 0; const pending = new Map(); const out = { console: [], exceptions: [], steps: [] };
ws.addEventListener('message', (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); return; }
  if (m.method === 'Runtime.consoleAPICalled') out.console.push(`${m.params.type}: ${m.params.args.map((a) => a.value ?? a.description ?? '').join(' ').slice(0, 3000)}`);
  if (m.method === 'Runtime.exceptionThrown') out.exceptions.push((m.params.exceptionDetails.exception?.description ?? m.params.exceptionDetails.text).slice(0, 500));
});
const send = (method, params = {}) => new Promise((r) => { const id = ++seq; pending.set(id, r); ws.send(JSON.stringify({ id, method, params })); });
const evaluate = async (expr) => (await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true })).result?.result?.value;
const state = () => evaluate(`({
  dialogText: document.body.innerText.includes('Create or upload a new message'),
  dialogs: Array.from(document.querySelectorAll('[role="dialog"]')).map(d => (d.innerText||'').slice(0,80)),
  menu: Array.from(document.querySelectorAll('button')).filter(b => b.getClientRects().length).map(b => (b.getAttribute('aria-label') || b.innerText).trim().slice(0,24)),
})`);
const centre = (sel) => evaluate(`(() => { const b = ${sel}; if (!b) return null; const r = b.getBoundingClientRect(); return { x: r.x + r.width/2, y: r.y + r.height/2, disabled: b.disabled || b.getAttribute('aria-disabled') }; })()`);
const press = async (pt) => {
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: pt.x, y: pt.y });
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: pt.x, y: pt.y, button: 'left', clickCount: 1 });
  await sleep(80);
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: pt.x, y: pt.y, button: 'left', clickCount: 1 });
};

await send('Runtime.enable'); await send('Page.enable'); await send('Network.enable');
if (process.env.PROBE_LATENCY_MS) out.latency = (await send('Network.emulateNetworkConditions', { offline: false, latency: Number(process.env.PROBE_LATENCY_MS), downloadThroughput: -1, uploadThroughput: -1 })).result;
if (sessionToken) out.cookieSet = (await send('Network.setCookie', { name: 'next-auth.session-token', value: sessionToken, url: baseUrl, httpOnly: true, sameSite: 'Lax' })).result;

await send('Page.addScriptToEvaluateOnNewDocument', { source: `
  window.__probeRects = [];
  const seen = new WeakSet(); new MutationObserver(() => { for (const d of document.querySelectorAll('[role=dialog]')) {
    if (seen.has(d)) continue; seen.add(d);
    const chain = [(d.innerText || '').slice(0, 40)]; let e = d;
    while (e && e !== document.documentElement) { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e);
      chain.push((e.id || e.tagName) + ' cls=' + (e.className || '').toString().slice(0, 40) + ' ' + JSON.stringify([r.x, r.y, r.width, r.height]) + ' display=' + cs.display + ' pos=' + cs.position); e = e.parentElement; }
    window.__probeRects.push(chain); if ((d.innerText||'').includes('Create or upload')) { const pr = document.getElementById('headlessui-portal-root');
      const hidden = []; let h = d.parentElement; while (h && h !== document.documentElement) { if (getComputedStyle(h).display === 'none') {
        const rules = []; for (const ss of document.styleSheets) { let rs; try { rs = ss.cssRules; } catch { continue; }
          const walk = (list, media) => { for (const r of list) { if (r.cssRules && !r.selectorText) { walk(r.cssRules, (r.conditionText||r.media?.mediaText||'')); continue; }
            if (r.selectorText && r.style && r.style.display === 'none') { try { if (h.matches(r.selectorText)) rules.push((media?'@'+media+' ':'') + r.selectorText.slice(0,120) + ' <' + (ss.href||'inline').split('/').pop()); } catch {} } } };
          walk(rs, ''); }
        hidden.push({ tag: h.outerHTML.slice(0, h.outerHTML.indexOf('>') + 1), inlineStyle: h.getAttribute('style'), hiddenAttr: h.hasAttribute('hidden'), rules }); } h = h.parentElement; }
      window.__probeHidden = { hidden, portalRootChildren: pr ? Array.from(pr.children).map(c => c.outerHTML.slice(0, 160)) : null, portalRootParent: pr && pr.parentElement.tagName }; }
    
  } }).observe(document, { childList: true, subtree: true });
` });
await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
if (viaPath) {
  // Arrive at the folder page by in-app (client-side) navigation from viaPath instead of a full load.
  await send('Page.navigate', { url: baseUrl + viaPath }); await sleep(8000);
  out.via = { url: await evaluate('location.href'), links: await evaluate(`Array.from(document.querySelectorAll('a[href]')).map(a => a.getAttribute('href')).filter(h => h.startsWith('/message')).slice(0, 20)`) };
  const ln = await centre(`Array.from(document.querySelectorAll('a[href]')).filter(a => a.getClientRects().length).find(a => a.getAttribute('href') === '${folderPath}' || a.getAttribute('href') === '/message')`);
  out.via.link = ln;
  if (ln) { await press(ln); await sleep(6000); }
  if (!(await evaluate('location.pathname')).startsWith('${folderPath}')) {
    const ln2 = await centre(`Array.from(document.querySelectorAll('a[href]')).filter(a => a.getClientRects().length).find(a => a.getAttribute('href') === '${folderPath}')`);
    out.via.link2 = ln2; if (ln2) { await press(ln2); await sleep(6000); }
  }
  out.via.loadedFresh = await evaluate('performance.getEntriesByType("navigation").length && performance.getEntriesByType("navigation")[0].name');
} else { await send('Page.navigate', { url: baseUrl + folderPath }); await sleep(8000); }
out.url = await evaluate('location.href');
out.steps.push({ step: 'loaded', ...(await state()) });
const trig = await centre(`document.querySelector('button[aria-label="new message"]')`);
out.steps.push({ step: 'trigger', trig });
if (trig) {
  await press(trig); await sleep(1500);
  out.steps.push({ step: 'menu-open', ...(await state()) });
  const up = await centre(`Array.from(document.querySelectorAll('button')).filter(b => b.getClientRects().length).find(b => b.innerText.trim() === 'Upload Message')`);
  out.steps.push({ step: 'upload-button', up });
  if (up) { await press(up); await sleep(3500); out.steps.push({ step: 'after-upload', ...(await state()) }); }
}
out.rects = await evaluate('window.__probeRects'); out.hidden = await evaluate('window.__probeHidden');
console.log(JSON.stringify(out, null, 1));
ws.close();
