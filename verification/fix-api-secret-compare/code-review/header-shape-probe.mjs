// Sends raw HTTP/1.1 requests over a socket to a node:http server on 127.0.0.1 and prints the shape of
// req.headers['x-hooks-api-token'] and req.headers.authorization the handler would receive.
// Usage: node header-shape-probe.mjs
import http from 'node:http';
import net from 'node:net';

const cases = [
  ['single token', 'X-Hooks-Api-Token: tok\r\n'],
  ['repeated token', 'X-Hooks-Api-Token: other\r\nX-Hooks-Api-Token: tok\r\n'],
  ['empty token', 'X-Hooks-Api-Token:\r\n'],
  ['token with surrounding whitespace', 'X-Hooks-Api-Token:   tok   \r\n'],
  ['token header uppercase name', 'X-HOOKS-API-TOKEN: tok\r\n'],
  ['repeated authorization, wrong first', 'Authorization: Bearer wrong\r\nAuthorization: Bearer key\r\n'],
  ['repeated authorization, right first', 'Authorization: Bearer key\r\nAuthorization: Bearer wrong\r\n'],
  ['authorization with a latin-1 byte', Buffer.concat([Buffer.from('Authorization: Bearer key'), Buffer.from([0xff]), Buffer.from('\r\n')])],
  ['no credential header', ''],
];

const seen = [];
const server = http.createServer((req, res) => {
  const token = req.headers['x-hooks-api-token'];
  const { authorization } = req.headers;
  seen.push({
    token: token === undefined ? 'undefined' : `${typeof token}:${JSON.stringify(token)}`,
    authorization: authorization === undefined ? 'undefined' : `${typeof authorization}:${JSON.stringify(authorization)}`,
  });
  res.end();
});

function send(port, headerBytes) {
  return new Promise((resolve) => {
    const socket = net.connect(port, '127.0.0.1', () => {
      socket.write(Buffer.concat([
        Buffer.from('POST /api/interactions-server HTTP/1.1\r\nHost: 127.0.0.1\r\nContent-Length: 0\r\nConnection: close\r\n'),
        Buffer.isBuffer(headerBytes) ? headerBytes : Buffer.from(headerBytes, 'latin1'),
        Buffer.from('\r\n'),
      ]));
    });
    let reply = '';
    socket.on('data', (chunk) => { reply += chunk.toString('latin1'); });
    socket.on('close', () => resolve(reply.split('\r\n')[0]));
  });
}

server.listen(0, '127.0.0.1', async () => {
  const { port } = server.address();
  for (const [label, bytes] of cases) {
    const before = seen.length;
    const status = await send(port, bytes);
    const shape = seen.length > before ? seen[seen.length - 1] : { token: '(handler not reached)', authorization: '(handler not reached)' };
    console.log(`${label}\t${status}\tx-hooks-api-token=${shape.token}\tauthorization=${shape.authorization}`);
  }
  console.log(`node ${process.version}`);
  server.close();
});
