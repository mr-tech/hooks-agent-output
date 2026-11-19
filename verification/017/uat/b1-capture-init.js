// UAT capture for B-1 / UAT-1 (plan 017 M2-b), installed with page.context().addInitScript({ path }) so it runs at
// page start, before the app's Pusher socket opens. Everything goes into window.__cap (read it before any reload):
//   frames  -- every inbound WebSocket frame whose data contains "message-update": [iso, data]
//   upserts -- every fetch whose URL contains "message.upsert": [isoStart, isoResponse, status, ok, bodyTextFirst300]
//   errors  -- window 'error' and 'unhandledrejection': [iso, kind, message]
//   ui      -- each change of (open dialog titles, react-toastify toasts with their type class): [iso, dialogs, toasts]
// The set of the implementer's capture (UAT-1 diagnosis, 2026-11-19), plus the dialog log.
(() => {
  if (window.__cap) return;
  const cap = { frames: [], upserts: [], errors: [], ui: [] };
  window.__cap = cap;
  const now = () => new Date().toISOString();

  const NativeWS = window.WebSocket;
  window.WebSocket = function (...args) {
    const ws = new NativeWS(...args);
    ws.addEventListener('message', (e) => {
      const d = typeof e.data === 'string' ? e.data : '';
      if (d.includes('message-update')) cap.frames.push([now(), d.slice(0, 300)]);
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
