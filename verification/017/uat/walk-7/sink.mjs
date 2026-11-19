// loopback-only file sink: POST /<name> writes body to walk-7/<name>.json
import http from 'http'; import fs from 'fs'; import path from 'path';
const dir = path.dirname(new URL(import.meta.url).pathname);
http.createServer((req, res) => { let b = ''; req.on('data', c => b += c); req.on('end', () => { const n = req.url.replace(/[^A-Za-z0-9._-]/g, ''); if (!n) { res.statusCode = 400; return res.end(); } fs.writeFileSync(path.join(dir, n), b); res.end('ok'); }); }).listen(39777, '127.0.0.1');
