// Init script for B-15: records every WebSocket the page constructs, with its host and whether it is open.
// Injected before any page script runs (Playwright addInitScript). Read with:
//   window.__qaWs.map(w => ({ host: w.host, state: w.socket.readyState }))   // 0 connecting, 1 open, 2 closing, 3 closed
(() => {
  const Native = window.WebSocket;
  window.__qaWs = [];
  function Recorded(url, protocols) {
    const socket = protocols === undefined ? new Native(url) : new Native(url, protocols);
    let host = '';
    try { host = new URL(url).host; } catch { host = String(url); }
    window.__qaWs.push({ host, socket, openedAt: Date.now() });
    return socket;
  }
  Recorded.prototype = Native.prototype;
  Object.setPrototypeOf(Recorded, Native);
  window.WebSocket = Recorded;
})();
