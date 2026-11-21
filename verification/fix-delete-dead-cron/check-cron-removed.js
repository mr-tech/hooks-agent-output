#!/usr/bin/env node
'use strict';

// Usage: node check-cron-removed.js <website-repo> <sha>
// Reads the tree at <sha> through git (never the working tree) and checks that the daily cron is gone:
// each limb prints PASS or FAIL; the process exits 0 only when every limb passes.

const { execFileSync } = require('node:child_process');

const [repo, sha] = process.argv.slice(2);
if (!repo || !sha) {
  console.error('usage: node check-cron-removed.js <website-repo> <sha>');
  process.exit(2);
}

const git = (...args) => execFileSync('git', ['-C', repo, ...args], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const show = (path) => {
  try {
    return git('show', `${sha}:${path}`);
  } catch {
    return null;
  }
};

const files = git('ls-tree', '-r', '--name-only', sha).split('\n').filter(Boolean);
const results = [];
const limb = (name, pass, detail) => results.push({ name, pass, detail });

const routePattern = /^src\/pages\/api\/cron(\.(ts|tsx|js|mjs)|\/index\.(ts|tsx|js|mjs))$|^src\/app\/api\/cron\/route\.(ts|js)$|^src\/pages\/api\/\[\[?\.\.\./;
const routeFiles = files.filter((f) => routePattern.test(f));
limb('route module resolving /api/cron', routeFiles.length === 0, routeFiles.join(', ') || 'no file');

const vercelText = show('vercel.json');
let vercelDetail = 'vercel.json absent';
let vercelPass = true;
if (vercelText !== null) {
  const parsed = JSON.parse(vercelText);
  vercelPass = !Object.prototype.hasOwnProperty.call(parsed, 'crons');
  vercelDetail = `vercel.json keys: ${Object.keys(parsed).join(', ') || '(none)'}`;
}
limb('vercel.json crons key', vercelPass, vercelDetail);

const pkg = JSON.parse(show('package.json'));
const declared = ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies']
  .filter((k) => pkg[k] && Object.prototype.hasOwnProperty.call(pkg[k], 'cron-parser'));
limb('cron-parser declared in package.json', declared.length === 0, declared.join(', ') || 'not declared');

const lock = show('pnpm-lock.yaml') || '';
const lockHits = lock.split('\n').filter((l) => l.includes('cron-parser')).length;
limb('cron-parser lines in pnpm-lock.yaml', lockHits === 0, `${lockHits} line(s)`);

const testPath = 'src/server/api/__tests__/cron.scheduled-selection.test.ts';
const testPresent = files.includes(testPath);
limb('cron route test file', !testPresent, testPresent ? 'present' : 'absent');

let importers;
try {
  importers = git('grep', '-l', '-E', "pages/api/cron|from 'cron-parser'", sha, '--', 'src').split('\n').filter(Boolean);
} catch (err) {
  if (err.status !== 1) throw err;
  importers = [];
}
limb('source importing the route or cron-parser', importers.length === 0, importers.join(', ') || 'none found');

for (const r of results) console.log(`${r.pass ? 'PASS' : 'FAIL'}  ${r.name}  — ${r.detail}`);
const failed = results.filter((r) => !r.pass).length;
console.log(`sha=${sha} limbs=${results.length} failed=${failed}`);
process.exit(failed === 0 ? 0 : 1);
