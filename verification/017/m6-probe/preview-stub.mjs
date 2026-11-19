import http from 'http';

// A stub /preview endpoint. The message the generator renders arrives as the `data` query parameter; its `mode`
// field picks the answer: ok (200 page), status-404, status-500, status-300, status-204, status-299, reset (socket destroyed), hang (no answer).
export function createPreviewStub() {
  const log = [];
  const hung = new Set();
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://stub');
    let mode = 'ok';
    try { mode = JSON.parse(url.searchParams.get('data') ?? '{}').mode ?? 'ok'; } catch (_) { /* a data parameter that is not JSON renders as ok */ }
    log.push({ path: url.pathname, mode });
    if (mode === 'reset') { req.socket.destroy(); return; }
    if (mode === 'hang') { hung.add(res); return; }
    const status = { 'status-404': 404, 'status-500': 500, 'status-300': 300, 'status-204': 204, 'status-299': 299 }[mode] ?? 200;
    res.writeHead(status, { 'Content-Type': 'text/html' });
    res.end('<!doctype html><html><body style="margin:0;background:#36393f;color:#fff"><h1>preview stub</h1></body></html>');
  });
  return {
    log,
    listen: () => new Promise((resolve) => { server.listen(0, '127.0.0.1', () => resolve(server.address().port)); }),
    close: () => new Promise((resolve) => { hung.forEach((r) => r.destroy()); server.closeAllConnections?.(); server.close(resolve); }),
  };
}
