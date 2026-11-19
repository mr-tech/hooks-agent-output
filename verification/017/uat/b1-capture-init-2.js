// UAT capture for B-1 / UAT-1 (plan 017 M2-b), installed with page.context().addInitScript({ path }) so it runs at
// page start, before the app's Pusher socket opens. Everything goes into window.__cap (read it before any reload):
//   frames  -- every inbound WebSocket frame whose data contains "message-update": [iso, data]
//   upserts -- every fetch whose URL contains "message.upsert": [isoStart, isoResponse, status, ok, bodyTextFirst300]
//   errors  -- window 'error' and 'unhandledrejection': [iso, kind, message]
//   ui      -- each change of (open dialog titles, react-toastify toasts with their type class): [iso, dialogs, toasts]
// The set of the implementer's capture (UAT-1 diagnosis, 2026-11-19), plus the dialog log.
// Version 2 (re-walk at website 7293a35), a copy of b1-capture-init.js with two additions:
//   decoded -- for each message-update frame, what JSON.parse returns for its inner `data` string when the page's own
//              code parses it (pusher-js decodeMessage): [iso, input, typeof result, String(result)]
//   sockets -- every WebSocket the page opens: [id, url host+path, isoCreated, isoOpen, isoClose, closeCode]
(() => {
  if (window.__cap) return;
  const cap = { frames: [], upserts: [], errors: [], ui: [], decoded: [], sockets: [] };
  window.__cap = cap;
  const now = () => new Date().toISOString();
  const nativeParse = JSON.parse;
  const watch = new Set();

  JSON.parse = function (text, reviver) {
    const result = nativeParse.call(JSON, text, reviver);
    if (typeof text === 'string' && watch.has(text)) cap.decoded.push([now(), text, typeof result, String(result)]);
    return result;
  };

  const NativeWS = window.WebSocket;
  window.WebSocket = function (...args) {
    const ws = new NativeWS(...args);
    const rec = [cap.sockets.length, String(args[0]).replace(/\?.*/, ''), now(), null, null, null];
    cap.sockets.push(rec);
    ws.addEventListener('open', () => { rec[3] = now(); });
    ws.addEventListener('close', (e) => { rec[4] = now(); rec[5] = e.code; });
    ws.addEventListener('message', (e) => {
      const d = typeof e.data === 'string' ? e.data : '';
      if (!d.includes('message-update')) return;
      cap.frames.push([now(), d.slice(0, 300)]);
      try {
        const outer = nativeParse.call(JSON, d);
        if (typeof outer.data === 'string') watch.add(outer.data);
      } catch (_) { /* not JSON */ }
    });
    return ws;
  };
  window.WebSocket.prototype = NativeWS.prototype;
  Object.assign(window.WebSocket, { CONNECTING: 0, OPEN: 1, CLOSING: 2, CLOSED: 3 });

  const nativeFetch = window.fetch.bind(window);
  window.fetch = async (input, init) => {
    const url = typeof input === 'string' ? input : input?.url ?? '';
    if (!url.includes('message.upsert')) return nativeFetch(input, init);
    const start = now();
    try {
      const res = await nativeFetch(input, init);
      const text = await res.clone().text().catch(() => '');
      cap.upserts.push([start, now(), res.status, res.ok, text.slice(0, 300)]);
      return res;
    } catch (err) {
      cap.upserts.push([start, now(), 'THREW', false, String(err).slice(0, 300)]);
      throw err;
    }
  };

  window.addEventListener('error', (e) => cap.errors.push([now(), 'error', String(e.message).slice(0, 300)]));
  window.addEventListener('unhandledrejection', (e) => cap.errors.push([now(), 'rejection', String(e.reason).slice(0, 300)]));

  let last = '';
  setInterval(() => {
    const dialogs = [...document.querySelectorAll('[role="dialog"]')]
      .filter((d) => d.getBoundingClientRect().width > 0 && d.innerText.trim() && !/Save as/.test(d.innerText))
      .map((d) => d.innerText.trim().slice(0, 50));
    const toasts = [...document.querySelectorAll('.Toastify__toast')]
      .map((t) => `${(t.className.match(/Toastify__toast--\w+/) || ['?'])[0]}:${t.innerText.trim().slice(0, 60)}`);
    const s = JSON.stringify([dialogs, toasts]);
    if (s !== last) { last = s; cap.ui.push([now(), dialogs, toasts]); }
  }, 25);
})();
