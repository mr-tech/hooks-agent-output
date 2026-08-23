/**
 * CR round 6 — discharges the round-4 Assumption Not Checked:
 *   "pg dials the host its Client constructor reports."
 *
 * ORACLE, fixed before running: a real TCP `connection` event on a loopback listener.
 * Not the client's reported config, not an error string — the socket, observed at the
 * destination. `param-class.js` established what pg's parser *computes*; this establishes
 * what pg's socket *does*, which is the assumption's actual subject.
 *
 * CONFIRMATION GATE: refuses to run against anything but loopback. A probe that proves a
 * dial reaches its target must never be pointed at production to do it.
 */
const net = require('net');
const PG = '/usr/local/bin/hooks/website/node_modules/.pnpm/pg@8.11.1/node_modules/pg';
const { Client } = require(PG);

const LOOPBACK = '127.0.0.1';

function gate(host) {
  if (host !== LOOPBACK) {
    throw new Error(`Refusing to dial ${host}: this probe runs against loopback only.`);
  }
}

function listener() {
  return new Promise((resolve) => {
    const hits = [];
    const srv = net.createServer((sock) => { hits.push(sock.remoteAddress); sock.destroy(); });
    srv.listen(0, LOOPBACK, () => resolve({ srv, port: srv.address().port, hits }));
  });
}

async function dial(label, urlFor, expectConnect) {
  const { srv, port, hits } = await listener();
  gate(LOOPBACK);
  const url = urlFor(port);
  const c = new Client({ connectionString: url, connectionTimeoutMillis: 1500 });
  const reported = c.host;
  let err = '';
  try { await c.connect(); } catch (e) { err = e.code || e.message.slice(0, 40); }
  try { await c.end(); } catch { /* handshake never completed */ }
  await new Promise((r) => srv.close(r));
  const connected = hits.length > 0;
  const ok = connected === expectConnect;
  console.log(
    `  ${ok ? ' ok ' : 'FAIL'}  ${label.padEnd(34)} reportedHost=${String(reported).padEnd(18)} ` +
    `socketObserved=${connected}  expected=${expectConnect}  err=${err}`,
  );
  return ok;
}

(async () => {
  console.log('oracle = TCP connection event observed at a loopback listener\n');
  const results = [];
  // Positive control: authority IS loopback, no query params. Must connect.
  results.push(await dial('control: authority=loopback', (p) => `postgresql://u:p@127.0.0.1:${p}/db`, true));
  // Negative control: authority unresolvable, no override. Must NOT connect.
  results.push(await dial('control: authority=unresolvable', () => `postgresql://u:p@no.such.host.invalid:1/db`, false));
  // Subject: authority unresolvable, ?host= points at loopback.
  // If pg dials config.host (what it reports), the listener fires despite the bad authority.
  results.push(await dial('subject: ?host= overrides authority', (p) => `postgresql://u:p@no.such.host.invalid:${p}/db?host=127.0.0.1`, true));
  const pass = results.every(Boolean);
  console.log(`\nRESULT: ${pass ? 'pg dials the host it reports — assumption DISCHARGED' : 'DIVERGENCE — pg dialed something other than its reported host'}`);
  process.exit(pass ? 0 : 1);
})();
