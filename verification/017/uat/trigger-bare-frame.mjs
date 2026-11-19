// UAT stimulus for code review's QAF-27 assumption (plan 017 M2-c): sends one `message-update` event whose data is a
// bare number-shaped string, as builds before the D-33 fix sent it (the hash text itself, not JSON text), on the channel
// of a LOCAL message id (>= 900000000000001). The Pusher credentials are read from the website export's .env.local and
// never printed. Usage: node trigger-bare-frame.mjs <website export dir> <message id> <data>
import { createRequire } from 'module';
import { readFileSync } from 'fs';

const [exportDir, id, data] = process.argv.slice(2);
if (!(BigInt(id) >= 900000000000001n)) { console.error('refused: id below 900000000000001'); process.exit(2); }
const env = {};
for (const line of readFileSync(`${exportDir}/.env.local`, 'utf8').split('\n')) {
  const m = line.match(/^\s*(?:export\s+)?([A-Z_]+)\s*=\s*(.*)\s*$/);
  if (m) env[m[1]] = m[2].replace(/^(['"])(.*)\1$/, '$2');
}
const require = createRequire(`${exportDir}/package.json`);
const Pusher = require('pusher');
const pusher = new Pusher({
  appId: env.PUSHER_APP_ID, key: env.NEXT_PUBLIC_PUSHER_KEY, secret: env.PUSHER_SECRET,
  cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER, useTLS: true,
});
await pusher.trigger(`message-update-${id}`, 'message-update', data);
console.log(`${new Date().toISOString()} sent message-update on message-update-${id} data=${data}`);
