'use strict';

const assert = require('node:assert');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { describe, it, beforeEach, afterEach } = require('node:test');
const { execFileSync, spawnSync } = require('node:child_process');

const TOOL = path.join(__dirname, 'website-dependency-audit.js');

const WS_DOS = {
  id: 1118728,
  module_name: 'ws',
  github_advisory_id: 'GHSA-3h5v-q93c-6h6q',
  severity: 'high',
  title: 'ws affected by a DoS when handling a request with many HTTP headers',
  url: 'https://github.com/advisories/GHSA-3h5v-q93c-6h6q',
  cves: ['CVE-2024-37890'],
  findings: [{ version: '8.13.0', paths: ['.>@vercel/functions>ws'] }],
};
const NANOID_PREDICTABLE = {
  id: 1109563,
  module_name: 'nanoid',
  github_advisory_id: 'GHSA-mwcw-c2x4-8c55',
  severity: 'moderate',
  title: 'Predictable results in nanoid generation when given non-integer values',
  url: 'https://github.com/advisories/GHSA-mwcw-c2x4-8c55',
  cves: ['CVE-2024-55565'],
  findings: [{ version: '3.3.6', paths: ['.>@headlessui/tailwindcss>tailwindcss>postcss>nanoid'] }],
};
const NANOID_PREDICTABLE_V4 = {
  ...NANOID_PREDICTABLE,
  id: 1109564,
  findings: [{ version: '4.0.2', paths: ['.>nanoid'] }],
};
const ASSESSED = { disp: 'ABSENT', ships: 'server', how: 'Read in the review.' };
const INBOX_HEAD = '# Inbox\n\n## 2026-11-12 — someone — FYI\nAn earlier entry.\n';

function auditOf(...advisories) {
  return {
    actions: [],
    advisories: Object.fromEntries(advisories.map((a) => [String(a.id), a])),
    muted: [],
    metadata: { vulnerabilities: { info: 0, low: 0, moderate: 0, high: advisories.length, critical: 0 } },
  };
}

let dir;
let website;
let origin;
let tmp;
let files;

function gitIn(repo, ...args) {
  return execFileSync('git', ['-C', repo, ...args], {
    encoding: 'utf8',
    env: { ...process.env, GIT_AUTHOR_NAME: 't', GIT_AUTHOR_EMAIL: 't@t', GIT_COMMITTER_NAME: 't', GIT_COMMITTER_EMAIL: 't@t' },
  }).trim();
}

const git = (...args) => gitIn(website, ...args);

function writeDispositions(entries) {
  fs.writeFileSync(files.dispositions, JSON.stringify({ _about: 'test', ...entries }));
}

function run(audit, { exitCode = 1, raw, ref = 'origin/master', extra = [] } = {}) {
  fs.writeFileSync(files.fixture, raw === undefined ? JSON.stringify(audit) : raw);
  return spawnSync(process.execPath, [TOOL,
    '--website', website, '--ref', ref,
    '--dispositions', files.dispositions, '--inbox', files.inbox, '--state', files.state,
    '--pnpm', files.pnpm, ...extra,
  ], { encoding: 'utf8', env: { ...process.env, TMPDIR: tmp, FIXTURE: files.fixture, FIXTURE_EXIT: String(exitCode) }, timeout: 60000 });
}

function moveOriginMaster(name) {
  git('checkout', '-q', '-b', name);
  fs.writeFileSync(path.join(website, 'README.md'), `${name}\n`);
  git('commit', '-q', '-am', name);
  gitIn(origin, 'fetch', '-q', website, `${name}:refs/heads/${name}`);
  git('checkout', '-q', 'master');
  const sha = gitIn(origin, 'rev-parse', name);
  gitIn(origin, 'update-ref', 'refs/heads/master', sha);
  return sha;
}

const headings = (text) => text.split('\n').filter((l) => l.startsWith('## '));
const inbox = () => fs.readFileSync(files.inbox, 'utf8');

beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'website-audit-test-'));
  website = path.join(dir, 'website');
  origin = path.join(dir, 'origin.git');
  tmp = path.join(dir, 'tmp');
  fs.mkdirSync(website);
  fs.mkdirSync(tmp);
  files = {
    dispositions: path.join(dir, 'dispositions.json'),
    inbox: path.join(dir, 'INBOX.md'),
    state: path.join(dir, 'state', 'reported.json'),
    fixture: path.join(dir, 'audit.json'),
    pnpm: path.join(dir, 'pnpm-stub.js'),
  };
  git('init', '-q', '-b', 'master');
  fs.writeFileSync(path.join(website, 'package.json'), '{"name":"site"}\n');
  fs.writeFileSync(path.join(website, 'pnpm-lock.yaml'), "lockfileVersion: '9.0'\n");
  fs.writeFileSync(path.join(website, 'pnpm-workspace.yaml'), 'patchedDependencies: {}\n');
  fs.mkdirSync(path.join(website, 'patches'));
  fs.writeFileSync(path.join(website, 'patches', 'pkg.patch'), 'patch\n');
  fs.writeFileSync(path.join(website, 'README.md'), 'not exported\n');
  git('add', 'package.json', 'pnpm-lock.yaml', 'pnpm-workspace.yaml', 'patches', 'README.md');
  git('commit', '-q', '-m', 'released tree');
  execFileSync('git', ['clone', '-q', '--bare', website, origin]);
  git('remote', 'add', 'origin', origin);
  git('fetch', '-q', 'origin');
  fs.writeFileSync(files.pnpm, [
    '#!/usr/bin/env node',
    "const fs = require('fs');",
    "if (process.argv.slice(2).join(' ') !== 'audit --prod --json') process.exit(9);",
    "const want = ['package.json', 'pnpm-lock.yaml', 'pnpm-workspace.yaml', 'patches/pkg.patch'];",
    'if (!want.every((f) => fs.existsSync(f))) process.exit(8);',
    'process.stdout.write(fs.readFileSync(process.env.FIXTURE));',
    'process.exit(Number(process.env.FIXTURE_EXIT));',
  ].join('\n'));
  fs.chmodSync(files.pnpm, 0o755);
  fs.writeFileSync(files.inbox, INBOX_HEAD);
});

afterEach(() => {
  fs.rmSync(dir, { recursive: true, force: true });
});

describe('website dependency audit', () => {
  it('adds exactly one inbox entry for an advisory with no disposition, naming every installed version', () => {
    writeDispositions({ 'ws|GHSA-3h5v-q93c-6h6q': ASSESSED });
    const r = run(auditOf(WS_DOS, NANOID_PREDICTABLE, NANOID_PREDICTABLE_V4));
    assert.strictEqual(r.status, 0, r.stderr);
    const text = inbox();
    assert.ok(text.startsWith(`${INBOX_HEAD}\n## `));
    const added = headings(text.slice(INBOX_HEAD.length));
    assert.strictEqual(added.length, 1);
    const entry = text.slice(INBOX_HEAD.length);
    assert.match(entry, /GHSA-mwcw-c2x4-8c55/);
    assert.match(entry, /nanoid/);
    assert.match(entry, /3\.3\.6/);
    assert.match(entry, /4\.0\.2/);
    assert.match(entry, new RegExp(git('rev-parse', '--short', 'origin/master')));
    assert.doesNotMatch(entry, /GHSA-3h5v-q93c-6h6q/);
  });

  it('adds no entry on a second run while the advisory stays undispositioned', () => {
    writeDispositions({ 'ws|GHSA-3h5v-q93c-6h6q': ASSESSED });
    assert.strictEqual(run(auditOf(WS_DOS, NANOID_PREDICTABLE)).status, 0);
    const afterFirst = inbox();
    const r = run(auditOf(WS_DOS, NANOID_PREDICTABLE));
    assert.strictEqual(r.status, 0, r.stderr);
    assert.strictEqual(inbox(), afterFirst);
  });

  it('leaves the inbox unchanged when every advisory is dispositioned', () => {
    writeDispositions({ 'ws|GHSA-3h5v-q93c-6h6q': ASSESSED, 'nanoid|GHSA-mwcw-c2x4-8c55': ASSESSED });
    const r = run(auditOf(WS_DOS, NANOID_PREDICTABLE));
    assert.strictEqual(r.status, 0, r.stderr);
    assert.strictEqual(inbox(), INBOX_HEAD);
    assert.match(r.stdout, /advisories 2, undispositioned 0, newly reported 0/);
  });

  it('does not fail when a dispositioned or reported advisory has left the audit', () => {
    writeDispositions({ 'ws|GHSA-3h5v-q93c-6h6q': ASSESSED, 'next|GHSA-4342-x723-ch2f': ASSESSED });
    fs.mkdirSync(path.dirname(files.state), { recursive: true });
    fs.writeFileSync(files.state, JSON.stringify({ reported: { 'sharp|GHSA-54xq-cgqr-rpm3': '2026-11-20T00:00Z' } }));
    const r = run(auditOf(WS_DOS));
    assert.strictEqual(r.status, 0, r.stderr);
    assert.strictEqual(inbox(), INBOX_HEAD);
  });

  it('treats a bare module key or a version-line key as no disposition of an advisory', () => {
    writeDispositions({ nanoid: ASSESSED, 'nanoid@3': ASSESSED, 'ws|GHSA-3h5v-q93c-6h6q': ASSESSED });
    const r = run(auditOf(WS_DOS, NANOID_PREDICTABLE));
    assert.strictEqual(r.status, 0, r.stderr);
    const added = inbox().slice(INBOX_HEAD.length);
    assert.strictEqual(headings(added).length, 1);
    assert.match(added, /GHSA-mwcw-c2x4-8c55/);
  });

  it('treats a disposition with an empty assessment as no disposition', () => {
    writeDispositions({ 'ws|GHSA-3h5v-q93c-6h6q': ASSESSED, 'nanoid|GHSA-mwcw-c2x4-8c55': { disp: 'ABSENT', ships: 'server', how: '' } });
    const r = run(auditOf(WS_DOS, NANOID_PREDICTABLE));
    assert.strictEqual(r.status, 0, r.stderr);
    assert.strictEqual(headings(inbox().slice(INBOX_HEAD.length)).length, 1);
  });

  it('writes nothing on an unreadable audit and reports the advisory on the next readable run', () => {
    writeDispositions({ 'ws|GHSA-3h5v-q93c-6h6q': ASSESSED });
    const failed = run(null, { raw: '{"error":{"code":"ERR_PNPM_AUDIT_BAD_RESPONSE"}}' });
    assert.notStrictEqual(failed.status, 0);
    assert.match(failed.stderr, /pnpm audit gave no advisories/);
    const afterFailure = inbox();
    assert.doesNotMatch(afterFailure, /GHSA-mwcw-c2x4-8c55/);
    const next = run(auditOf(WS_DOS, NANOID_PREDICTABLE));
    assert.strictEqual(next.status, 0, next.stderr);
    const added = inbox().slice(afterFailure.length);
    assert.strictEqual(headings(added).length, 1);
    assert.match(added, /GHSA-mwcw-c2x4-8c55/);
  });

  it('separates the entry by a blank line from an inbox that lacks a final newline', () => {
    writeDispositions({});
    fs.writeFileSync(files.inbox, '# Inbox');
    assert.strictEqual(run(auditOf(WS_DOS)).status, 0);
    assert.ok(inbox().startsWith('# Inbox\n\n## '));
  });

  it('fails naming git when the released ref does not exist, and reports no advisory', () => {
    writeDispositions({});
    const r = run(auditOf(WS_DOS), { ref: 'origin/no-such-branch' });
    assert.notStrictEqual(r.status, 0);
    assert.match(r.stderr, /git rev-parse/);
    assert.doesNotMatch(inbox(), /GHSA-3h5v-q93c-6h6q/);
  });

  it('adds one inbox entry when a streak of failed runs starts, and none for the rest of the streak', () => {
    writeDispositions({});
    assert.notStrictEqual(run(null, { raw: 'not json' }).status, 0);
    const first = inbox().slice(INBOX_HEAD.length);
    assert.strictEqual(headings(first).length, 1);
    assert.match(first, /failed/);
    assert.match(first, /pnpm audit gave no advisories/);
    assert.notStrictEqual(run(null, { raw: 'not json' }).status, 0);
    assert.notStrictEqual(run(auditOf(WS_DOS), { ref: 'origin/no-such-branch' }).status, 0);
    assert.strictEqual(inbox().slice(INBOX_HEAD.length), first);
  });

  it('starts no streak when the failure entry cannot be written, and adds it on the next failure', () => {
    writeDispositions({});
    const usable = files.inbox;
    files.inbox = path.join(dir, 'inbox-is-a-directory');
    fs.mkdirSync(files.inbox);
    assert.notStrictEqual(run(null, { raw: 'not json' }).status, 0);
    assert.ok(!fs.existsSync(files.state) || !JSON.parse(fs.readFileSync(files.state, 'utf8')).failing);
    files.inbox = usable;
    assert.notStrictEqual(run(null, { raw: 'not json' }).status, 0);
    const added = inbox().slice(INBOX_HEAD.length);
    assert.strictEqual(headings(added).length, 1);
    assert.match(added, /failed/);
  });

  it('adds a new failure entry for a streak that starts after a run succeeded', () => {
    writeDispositions({ 'ws|GHSA-3h5v-q93c-6h6q': ASSESSED });
    assert.notStrictEqual(run(null, { raw: 'not json' }).status, 0);
    assert.strictEqual(run(auditOf(WS_DOS)).status, 0);
    assert.strictEqual(headings(inbox().slice(INBOX_HEAD.length)).length, 1);
    assert.notStrictEqual(run(null, { raw: 'not json' }).status, 0);
    assert.strictEqual(headings(inbox().slice(INBOX_HEAD.length)).length, 2);
  });

  it('adds one entry per pair when the local released ref differs from the remote head, moving no ref', () => {
    writeDispositions({ 'ws|GHSA-3h5v-q93c-6h6q': ASSESSED });
    const local = git('rev-parse', 'origin/master');
    const refsBefore = git('for-each-ref');
    const remote = moveOriginMaster('second');
    assert.strictEqual(run(auditOf(WS_DOS)).status, 0);
    const first = inbox().slice(INBOX_HEAD.length);
    assert.strictEqual(headings(first).length, 1);
    assert.match(first, new RegExp(local.slice(0, 7)));
    assert.match(first, new RegExp(remote.slice(0, 7)));
    assert.strictEqual(run(auditOf(WS_DOS)).status, 0);
    assert.strictEqual(inbox().slice(INBOX_HEAD.length), first);
    const refsAfterSecond = git('for-each-ref');
    const third = moveOriginMaster('third');
    assert.strictEqual(run(auditOf(WS_DOS)).status, 0);
    const added = inbox().slice(INBOX_HEAD.length + first.length);
    assert.strictEqual(headings(added).length, 1);
    assert.match(added, new RegExp(third.slice(0, 7)));
    assert.strictEqual(git('rev-parse', 'origin/master'), local);
    assert.strictEqual(refsAfterSecond.split('\n').filter((l) => l.includes('refs/remotes/')).join('\n'),
      refsBefore.split('\n').filter((l) => l.includes('refs/remotes/')).join('\n'));
  });

  it('fails, reporting no advisory, when the remote has no head for the released branch', () => {
    writeDispositions({});
    gitIn(origin, 'update-ref', '-d', 'refs/heads/master');
    const r = run(auditOf(WS_DOS));
    assert.notStrictEqual(r.status, 0);
    assert.match(r.stderr, /has no head/);
    assert.doesNotMatch(inbox(), /GHSA-3h5v-q93c-6h6q/);
  });

  it('prints the procedure for adding a disposition on --help, and writes nothing', () => {
    writeDispositions({});
    const r = run(auditOf(WS_DOS), { extra: ['--help'] });
    assert.strictEqual(r.status, 0, r.stderr);
    assert.match(r.stdout, /"<module>\|<GHSA id>"/);
    assert.strictEqual(inbox(), INBOX_HEAD);
  });

  it('fails on an argument it does not know, and writes nothing', () => {
    writeDispositions({});
    const r = run(auditOf(WS_DOS), { extra: ['--inboxx', files.inbox] });
    assert.notStrictEqual(r.status, 0);
    assert.match(r.stderr, /bad argument: --inboxx/);
    assert.strictEqual(inbox(), INBOX_HEAD);
  });

  it('keeps no reported key when the inbox cannot be written, and reports the advisory on the next run', () => {
    writeDispositions({ 'ws|GHSA-3h5v-q93c-6h6q': ASSESSED });
    const usable = files.inbox;
    files.inbox = path.join(dir, 'inbox-is-a-directory');
    fs.mkdirSync(files.inbox);
    const failed = run(auditOf(WS_DOS, NANOID_PREDICTABLE));
    assert.notStrictEqual(failed.status, 0);
    assert.ok(!fs.existsSync(files.state) || !JSON.parse(fs.readFileSync(files.state, 'utf8')).reported['nanoid|GHSA-mwcw-c2x4-8c55']);
    files.inbox = usable;
    const next = run(auditOf(WS_DOS, NANOID_PREDICTABLE));
    assert.strictEqual(next.status, 0, next.stderr);
    assert.strictEqual(headings(inbox().slice(INBOX_HEAD.length)).length, 1);
  });

  it('removes the lockfile export after a readable and after an unreadable run', () => {
    writeDispositions({ 'ws|GHSA-3h5v-q93c-6h6q': ASSESSED });
    assert.strictEqual(run(auditOf(WS_DOS)).status, 0);
    assert.deepStrictEqual(fs.readdirSync(tmp), []);
    assert.notStrictEqual(run(null, { raw: 'not json' }).status, 0);
    assert.deepStrictEqual(fs.readdirSync(tmp), []);
  });
});
