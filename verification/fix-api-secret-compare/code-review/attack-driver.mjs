// Raw-socket attack on the three credential guards and the single-message id parse of a running
// `next dev` of website 32d10f7 (dummy HOOKS_API_TOKEN / STATBOT_API_KEY; DATABASE_URL and REDIS_URL at a
// closed port). Oracle per request: status line, plus the growth of ECONNREFUSED lines in the server log
// (a database read attempted). Bot oracle: 401 refused; 400 from get_message's body check means the guard
// passed and the command ran.
// Usage: node attack-driver.mjs <port> <server log path>
import { readFileSync } from 'node:fs';
import net from 'node:net';

const [port, logPath] = [Number(process.argv[2]), process.argv[3]];
const TOKEN = 'dummy-hooks-token-0123';
const KEY = 'dummy-statbot-key-4567';
const GUILD = '123456789012345678';
const LIST = `/api/v1/guilds/${GUILD}/messages`;
const single = (id) => `/api/v1/guilds/${GUILD}/messages/${id}`;
const BOT = '/api/interactions-server';
const BODY = '{"data":{"name":"get_message"}}';

const h = (name, value) => Buffer.concat([Buffer.from(`${name}: `), Buffer.isBuffer(value) ? value : Buffer.from(value, 'latin1'), Buffer.from('\r\n')]);
const tok = (v) => h('X-Hooks-Api-Token', v);
const auth = (v) => h('Authorization', v);

const cases = [
  ['bot', 'exactly the token', 'POST', BOT, [tok(TOKEN)], 'pass'],
  ['bot', 'no token header', 'POST', BOT, [], 'refuse'],
  ['bot', 'empty token header', 'POST', BOT, [tok('')], 'refuse'],
  ['bot', 'wrong token, same length', 'POST', BOT, [tok('dummy-hooks-token-0124')], 'refuse'],
  ['bot', 'token prefix', 'POST', BOT, [tok(TOKEN.slice(0, -1))], 'refuse'],
  ['bot', 'token plus a character', 'POST', BOT, [tok(`${TOKEN}x`)], 'refuse'],
  ['bot', 'token in upper case', 'POST', BOT, [tok(TOKEN.toUpperCase())], 'refuse'],
  ['bot', 'the string undefined', 'POST', BOT, [tok('undefined')], 'refuse'],
  ['bot', 'token plus a latin-1 byte', 'POST', BOT, [tok(Buffer.concat([Buffer.from(TOKEN), Buffer.from([0xff])]))], 'refuse'],
  ['bot', 'repeated header, wrong then right', 'POST', BOT, [tok('wrong'), tok(TOKEN)], 'refuse'],
  ['bot', 'repeated header, right twice', 'POST', BOT, [tok(TOKEN), tok(TOKEN)], 'refuse'],
  ['bot', 'header name upper case, exact token', 'POST', BOT, [h('X-HOOKS-API-TOKEN', TOKEN)], 'pass'],
  ['bot', 'exact token padded with whitespace (HTTP strips OWS)', 'POST', BOT, [tok(`  ${TOKEN}  `)], 'pass'],
  ['bot', 'token under Authorization instead', 'POST', BOT, [auth(TOKEN)], 'refuse'],
  ['bot', 'GET with the token', 'GET', BOT, [tok(TOKEN)], '405'],

  ['list', 'exactly Bearer key', 'GET', LIST, [auth(`Bearer ${KEY}`)], 'pass'],
  ['list', 'no authorization', 'GET', LIST, [], 'refuse'],
  ['list', 'empty authorization', 'GET', LIST, [auth('')], 'refuse'],
  ['list', 'Bearer and nothing', 'GET', LIST, [auth('Bearer ')], 'refuse'],
  ['list', 'wrong key, same length', 'GET', LIST, [auth(`Bearer ${KEY.slice(0, -1)}8`)], 'refuse'],
  ['list', 'key without scheme', 'GET', LIST, [auth(KEY)], 'refuse'],
  ['list', 'key under Basic', 'GET', LIST, [auth(`Basic ${KEY}`)], 'refuse'],
  ['list', 'lowercase scheme', 'GET', LIST, [auth(`bearer ${KEY}`)], 'refuse'],
  ['list', 'double space after scheme', 'GET', LIST, [auth(`Bearer  ${KEY}`)], 'refuse'],
  ['list', 'key plus a character', 'GET', LIST, [auth(`Bearer ${KEY}x`)], 'refuse'],
  ['list', 'key in upper case', 'GET', LIST, [auth(`Bearer ${KEY.toUpperCase()}`)], 'refuse'],
  ['list', 'Bearer undefined', 'GET', LIST, [auth('Bearer undefined')], 'refuse'],
  ['list', 'repeated authorization, wrong first', 'GET', LIST, [auth('Bearer wrong'), auth(`Bearer ${KEY}`)], 'refuse'],
  ['list', 'repeated authorization, right first (Node keeps the first)', 'GET', LIST, [auth(`Bearer ${KEY}`), auth('Bearer wrong')], 'pass'],
  ['list', 'key under x-hooks-api-token instead', 'GET', LIST, [tok(`Bearer ${KEY}`)], 'refuse'],
  ['list', 'POST without credential', 'POST', LIST, [], 'refuse'],
  ['list', 'POST with the key', 'POST', LIST, [auth(`Bearer ${KEY}`)], '405'],

  ['single', 'exactly Bearer key, id 1', 'GET', single('1'), [auth(`Bearer ${KEY}`)], 'pass'],
  ['single', 'no authorization, id 1', 'GET', single('1'), [], 'refuse'],
  ['single', 'wrong key, same length, id 1', 'GET', single('1'), [auth(`Bearer ${KEY.slice(0, -1)}8`)], 'refuse'],
  ['single', 'no authorization, malformed id 1e3', 'GET', single('1e3'), [], 'refuse'],
  ['single', 'id 1e3', 'GET', single('1e3'), [auth(`Bearer ${KEY}`)], '400'],
  ['single', 'id 1.5', 'GET', single('1.5'), [auth(`Bearer ${KEY}`)], '400'],
  ['single', 'id -1', 'GET', single('-1'), [auth(`Bearer ${KEY}`)], '400'],
  ['single', 'id with a leading space', 'GET', single('%201'), [auth(`Bearer ${KEY}`)], '400'],
  ['single', 'id with a trailing newline', 'GET', single('1%0A'), [auth(`Bearer ${KEY}`)], '400'],
  ['single', 'id 0x10', 'GET', single('0x10'), [auth(`Bearer ${KEY}`)], '400'],
  ['single', 'id fullwidth digit one', 'GET', single('%EF%BC%91'), [auth(`Bearer ${KEY}`)], '400'],
  ['single', 'id Infinity', 'GET', single('Infinity'), [auth(`Bearer ${KEY}`)], '400'],
  ['single', 'id of 20 digits', 'GET', single('10000000000000000000'), [auth(`Bearer ${KEY}`)], '400'],
  ['single', 'id 2^63 (one above the largest)', 'GET', single('9223372036854775808'), [auth(`Bearer ${KEY}`)], '400'],
  ['single', 'id 2^63-1 (the largest)', 'GET', single('9223372036854775807'), [auth(`Bearer ${KEY}`)], 'pass'],
  ['single', 'id 007', 'GET', single('007'), [auth(`Bearer ${KEY}`)], 'pass'],
  ['single', 'id 0', 'GET', single('0'), [auth(`Bearer ${KEY}`)], 'pass'],
  ['single', 'repeated id query beside the path id', 'GET', `${single('1')}?id=2`, [auth(`Bearer ${KEY}`)], 'any'],
  ['single', 'unexpected query key', 'GET', `${single('1')}?extra=1`, [auth(`Bearer ${KEY}`)], '400'],
];

const dbAttempts = () => (readFileSync(logPath, 'latin1').match(/ECONNREFUSED/g) ?? []).length;
const sleep = (ms) => new Promise((r) => { setTimeout(r, ms); });

function send(method, path, headers) {
  const body = method === 'POST' ? Buffer.from(BODY) : Buffer.alloc(0);
  return new Promise((resolve) => {
    const socket = net.connect(port, '127.0.0.1', () => {
      socket.write(Buffer.concat([
        Buffer.from(`${method} ${path} HTTP/1.1\r\nHost: 127.0.0.1\r\nConnection: close\r\n`),
        ...(method === 'POST' ? [Buffer.from(`Content-Type: application/json\r\nContent-Length: ${body.length}\r\n`)] : []),
        ...headers,
        Buffer.from('\r\n'),
        body,
      ]));
    });
    let reply = '';
    socket.setTimeout(120000, () => socket.destroy());
    socket.on('data', (chunk) => { reply += chunk.toString('latin1'); });
    socket.on('close', () => resolve(reply.split('\r\n')[0] || '(no reply)'));
    socket.on('error', (e) => resolve(`(socket error ${e.code})`));
  });
}

function verdict(kind, expect, status, db) {
  const code = Number(status.split(' ')[1]);
  if (expect === 'any') return 'RECORDED';
  if (expect === 'refuse') return code === 401 && db === 0 ? 'OK' : 'UNEXPECTED';
  if (expect === '405' || expect === '400') return code === Number(expect) && db === 0 ? 'OK' : 'UNEXPECTED';
  if (kind === 'bot') return code === 400 ? 'OK' : 'UNEXPECTED';
  return code === 500 && db > 0 ? 'OK' : 'UNEXPECTED';
}

let unexpected = 0;
for (const [kind, label, method, path, headers, expect] of cases) {
  const before = dbAttempts();
  const status = await send(method, path, headers);
  await sleep(400);
  const db = dbAttempts() - before;
  const v = verdict(kind, expect, status, db);
  if (v === 'UNEXPECTED') unexpected += 1;
  console.log(`${v}\t${kind}\t${label}\texpect=${expect}\t${status}\tdb-attempts=${db}`);
}
console.log(`cases ${cases.length}, unexpected ${unexpected}`);
process.exitCode = unexpected === 0 ? 0 : 1;
