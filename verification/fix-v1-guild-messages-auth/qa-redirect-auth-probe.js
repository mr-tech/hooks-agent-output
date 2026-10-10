// QA instrument (fix-v1-guild-messages-auth, Phase 2): does Statbot's hooks.gg client still send its
// Authorization header after the http -> https redirect that plain-HTTP requests to a Vercel domain get?
//
// Statbot builds the hooks.gg client in statbot-utils `ApiUtils.createInstance` as
// `http://${HOOKS_HOST}:${port}` (port 80 outside development) with
// `Authorization: Bearer ${apiKey}`. If the redirect hop drops the header, the v1 guard answers 401
// even when the keys match.
//
// Usage: node qa-redirect-auth-probe.js <consumer-repo-dir>
// It loads THAT consumer's installed axios (and so its follow-redirects). No socket leaves this box:
// both agents' createConnection go to a local server, and `lookup` pins any name to 127.0.0.1.
//
// Cases (each prints whether the Authorization header reached the final hop):
//   SUBJECT   http://hooks.gg:80/...  -> 308 https://hooks.gg/...       (production shape)
//   CONTROL+  https://hooks.gg/...    -> 308 https://hooks.gg/other     (same origin: must keep)
//   CONTROL-  http://hooks.gg:80/...  -> 308 https://evil.example/...   (other host: must drop)
//   VARIANT-www http://www.hooks.gg:80/... -> 308 https://hooks.gg/...  (if HOOKS_HOST were the www name)
const http = require('http');
const https = require('https');
const net = require('net');
const path = require('path');

const repo = path.resolve(process.argv[2]);
const axiosPath = require.resolve('axios', { paths: [repo] });
const axios = require(axiosPath);
const frPath = require.resolve('follow-redirects/package.json', { paths: [path.dirname(axiosPath)] });

const seen = [];
const server = http.createServer((req, res) => {
  const hop = { url: req.url, host: req.headers.host, auth: req.headers.authorization === 'Bearer probe-key' ? 'present' : (req.headers.authorization === undefined ? 'absent' : 'other') };
  seen.push(hop);
  if (req.url.startsWith('/first')) {
    res.writeHead(308, { location: process.env.QA_LOCATION });
    return res.end();
  }
  res.writeHead(200, { 'content-type': 'application/json' });
  res.end('[]');
});

async function run(name, startUrl, location) {
  seen.length = 0;
  process.env.QA_LOCATION = location;
  const port = server.address().port;
  const targets = [];
  const mk = (Base) => {
    const a = new Base();
    a.createConnection = (opts, cb) => { targets.push(`${opts.host}:${opts.port}`); const s = net.connect(port, '127.0.0.1'); if (cb) s.once('connect', () => cb(null, s)); return s; };
    return a;
  };
  const inst = axios.create({
    baseURL: startUrl,
    headers: { Authorization: 'Bearer probe-key' },
    httpAgent: mk(http.Agent),
    httpsAgent: mk(https.Agent), // createConnection returns a plain socket: the local server reads the https hop as http
    lookup: (h, o, cb) => (typeof o === 'function' ? o : cb)(null, '127.0.0.1', 4),
    proxy: false,
  });
  let status;
  try { status = (await inst.get('/first')).status; } catch (e) { status = `ERR ${e.code || e.message}`; }
  const last = seen[seen.length - 1];
  console.log(JSON.stringify({ case: name, start: `${startUrl}/first`, redirectTo: location, finalStatus: status, connectTargets: targets, hops: seen.map((h) => ({ url: h.url, host: h.host, auth: h.auth })), authOnFinalHop: last && last.auth }));
}

server.listen(0, '127.0.0.1', async () => {
  console.log(JSON.stringify({ consumer: repo, axios: require(require.resolve('axios/package.json', { paths: [repo] })).version, followRedirects: require(frPath).version, node: process.version }));
  await run('SUBJECT', 'http://hooks.gg:80', 'https://hooks.gg/api/v1/guilds/123456789012345678/messages');
  await run('CONTROL+', 'https://hooks.gg', 'https://hooks.gg/api/v1/guilds/123456789012345678/messages');
  await run('CONTROL-', 'http://hooks.gg:80', 'https://evil.example/api/v1/guilds/123456789012345678/messages');
  await run('VARIANT-www', 'http://www.hooks.gg:80', 'https://hooks.gg/api/v1/guilds/123456789012345678/messages');
  server.close();
});
