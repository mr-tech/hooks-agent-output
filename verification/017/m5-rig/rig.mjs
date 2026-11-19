import { spawn } from 'child_process';
import { appendFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { createS3Stub } from '../m6-probe/s3-stub.mjs';

// M5's local-walk rig (plan 017 M5 "Human-observable form", QA's B-4 and E-9). Usage:
//   node rig.mjs <generator export dir> <log file> [--preview-endpoint URL]
// Starts the loopback S3 stub (port 39001) and the generator from the export (port 39002, ENV=development so its keys sit under
// dev/ as the local website's do), prints the environment the LOCAL WEBSITE must be started with, and logs every stub request as a
// JSON line to <log file>. The website's CDN_ENDPOINT must be read back from its process environment and the stub's log must show the
// website's list and delete requests, because .env.local's CDN_ENDPOINT is a real Spaces host. SIGINT or SIGTERM stops both and exits.
const here = dirname(fileURLToPath(import.meta.url));
const [exportDir, logFile] = process.argv.slice(2);
const previewArg = process.argv.indexOf('--preview-endpoint');
const previewEndpoint = previewArg > 0 ? process.argv[previewArg + 1] : 'http://localhost:3000/preview';
const S3_PORT = 39001;
const GEN_PORT = 39002;
const API_KEY = 'rig-api-key';

const stub = createS3Stub();
const origPush = stub.log.push.bind(stub.log);
stub.log.push = (...entries) => { entries.forEach((e) => appendFileSync(logFile, `${JSON.stringify({ at: new Date().toISOString(), ...e })}\n`)); return origPush(...entries); };
writeFileSync(logFile, '');
const server = await stub.listen(S3_PORT);
if (server !== S3_PORT) { console.log(`S3 stub is on ${server}, not ${S3_PORT}`); }

const child = spawn(`${exportDir}/node_modules/.bin/ts-node`, ['src/server.ts'], {
  cwd: exportDir,
  env: {
    PATH: process.env.PATH,
    HOME: process.env.HOME,
    TS_NODE_TRANSPILE_ONLY: 'true',
    PUPPETEER_EXECUTABLE_PATH: process.env.PUPPETEER_EXECUTABLE_PATH ?? '/usr/bin/google-chrome',
    API_KEY,
    ENV: 'development',
    SERVER_PORT: String(GEN_PORT),
    SERVER_HOST: '127.0.0.1',
    CDN_ENDPOINT: `http://127.0.0.1:${server}`,
    CDN_KEY: 'rig',
    CDN_SECRET: 'rig',
    CDN_BUCKET: 'bucket',
    PREVIEW_ENDPOINT: previewEndpoint,
  },
  stdio: ['ignore', 'inherit', 'inherit'],
});

console.log('Start the local website with these in its process environment (not .env.local):');
console.log(`  CDN_ENDPOINT=http://127.0.0.1:${server}`);
console.log('  CDN_BUCKET=bucket CDN_KEY=rig CDN_SECRET=rig');
console.log(`  NEXT_PUBLIC_CDN_HOST=http://127.0.0.1:${server}/bucket`);
console.log(`  PREVIEW_IMAGE_URL=http://127.0.0.1:${GEN_PORT}/generate PREVIEW_IMAGE_API_KEY=${API_KEY}`);
console.log(`Stub request log: ${logFile}`);

const stop = async () => {
  child.kill('SIGINT');
  await Promise.race([new Promise((r) => { child.on('exit', r); }), new Promise((r) => { setTimeout(r, 15000); })]);
  if (child.exitCode === null) child.kill('SIGKILL');
  await stub.close();
  process.exit(0);
};
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
void here; void resolve;
