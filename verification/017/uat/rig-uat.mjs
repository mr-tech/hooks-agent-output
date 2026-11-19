import { spawn } from 'child_process';
import { appendFileSync, writeFileSync } from 'fs';

import { createS3Stub } from '../m6-probe/s3-stub.mjs';

// UAT copy of verification/017/m5-rig/rig.mjs (the original is not edited). Same stub, ports and generator environment.
// Added: SIGUSR1 stops the generator only (the stub keeps serving stored objects, so the old preview stays reachable);
// SIGUSR2 starts it again. Every start/stop is logged to <log file> beside the stub's request lines.
//   node rig-uat.mjs <generator export dir> <log file>
const [exportDir, logFile] = process.argv.slice(2);
const S3_PORT = 39001;
const GEN_PORT = 39002;
const API_KEY = 'rig-api-key';
const note = (event) => appendFileSync(logFile, `${JSON.stringify({ at: new Date().toISOString(), rig: event })}\n`);

const stub = createS3Stub();
const origPush = stub.log.push.bind(stub.log);
stub.log.push = (...entries) => { entries.forEach((e) => appendFileSync(logFile, `${JSON.stringify({ at: new Date().toISOString(), ...e })}\n`)); return origPush(...entries); };
writeFileSync(logFile, '');
const server = await stub.listen(S3_PORT);

let child = null;
const startGen = () => {
  if (child) return;
  child = spawn(`${exportDir}/node_modules/.bin/ts-node`, ['src/server.ts'], {
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
      PREVIEW_ENDPOINT: 'http://localhost:3000/preview',
    },
    stdio: ['ignore', 'inherit', 'inherit'],
  });
  note(`generator started pid ${child.pid}`);
  const c = child;
  c.on('exit', (code, sig) => { note(`generator exited pid ${c.pid} code ${code} signal ${sig}`); if (child === c) child = null; });
};
const stopGen = async () => {
  const c = child;
  if (!c) return;
  c.kill('SIGINT');
  await Promise.race([new Promise((r) => { c.on('exit', r); }), new Promise((r) => { setTimeout(r, 15000); })]);
  if (c.exitCode === null && c.signalCode === null) c.kill('SIGKILL');
};

startGen();
console.log(`rig pid ${process.pid}; stub ${server}; generator ${GEN_PORT}; SIGUSR1 stops the generator, SIGUSR2 starts it`);
process.on('SIGUSR1', () => { void stopGen(); });
process.on('SIGUSR2', () => { startGen(); });
const stop = async () => { await stopGen(); await stub.close(); process.exit(0); };
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
