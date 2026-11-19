// loopback-only file sink: POST /<name> writes body to walk-6/<name> (name restricted to [A-Za-z0-9._-]).
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
const dir = '/usr/local/bin/hooks/agent-output/verification/017/uat/walk-6';
http.createServer((req,res)=>{ const n=decodeURIComponent(req.url.slice(1)); if(!/^[A-Za-z0-9._-]{1,80}$/.test(n)){res.statusCode=400;return res.end('bad');}
 const c=[]; req.on('data',d=>c.push(d)); req.on('end',()=>{ fs.writeFileSync(path.join(dir,n),Buffer.concat(c)); res.end('ok'); }); }).listen(3999,'127.0.0.1');
