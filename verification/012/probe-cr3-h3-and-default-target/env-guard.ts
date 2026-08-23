// SAFETY GATE: prove the DATABASE_URL the script will actually use is the dead one,
// AFTER dotenv/config has loaded .env.local. Prints host:port only, never credentials.
const u = process.env.DATABASE_URL || '';
try {
  const p = new URL(u);
  process.stderr.write(`RESOLVED_HOST=${p.hostname} PORT=${p.port} PROTO=${p.protocol}\n`);
} catch { process.stderr.write('RESOLVED_HOST=<unparseable/absent>\n'); }
