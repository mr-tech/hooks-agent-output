'use strict';

const assert = require('node:assert');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { describe, it, before, after } = require('node:test');
const { execFileSync, spawnSync } = require('node:child_process');

const SOURCE_RECORD = path.resolve(__dirname, '..');
const ENGINE_DIR = process.env.RECORD_ENGINE_DIR || path.join(os.homedir(), '.claude', 'tools');
const TOOLS = ['check-repo.js', 'build-index.js'];
const COPIED = [...TOOLS, 'check-repo-baseline.json'];
const GIT_ENV = {
  ...process.env,
  GIT_AUTHOR_NAME: 'fixture',
  GIT_AUTHOR_EMAIL: 'fixture@example.invalid',
  GIT_COMMITTER_NAME: 'fixture',
  GIT_COMMITTER_EMAIL: 'fixture@example.invalid',
};

describe('record entrypoints load the shared engine', () => {
  const dirs = [];
  const scratch = (prefix) => {
    const d = fs.mkdtempSync(path.join(os.tmpdir(), prefix));
    dirs.push(d);
    return d;
  };
  after(() => { for (const d of dirs) fs.rmSync(d, { recursive: true, force: true }); });

  let work;
  let bareEngine;
  let sentinelEngine;
  const git = (...args) => execFileSync('git', args, { cwd: work, encoding: 'utf8', env: GIT_ENV });
  const run = (tool, args, env) => {
    const r = spawnSync('node', [path.join(work, 'tools', tool), ...args], { cwd: work, encoding: 'utf8', env: { ...process.env, ...env } });
    return { status: r.status, stdout: r.stdout, stderr: r.stderr };
  };

  before(() => {
    work = scratch('record-entrypoints-');
    execFileSync('git', ['clone', '--quiet', '--no-hardlinks', SOURCE_RECORD, work], { env: GIT_ENV });
    for (const file of COPIED) {
      if (fs.existsSync(path.join(__dirname, file))) fs.copyFileSync(path.join(__dirname, file), path.join(work, 'tools', file));
    }
    git('add', '-A');
    git('commit', '--quiet', '--allow-empty', '-m', 'entrypoints under test');
    bareEngine = scratch('engine-bare-');
    for (const f of ['record-engine.js', 'seam.js']) fs.copyFileSync(path.join(ENGINE_DIR, f), path.join(bareEngine, f));
    sentinelEngine = scratch('engine-sentinel-');
    fs.writeFileSync(path.join(sentinelEngine, 'record-engine.js'), [
      "exports.runCheck = (settings) => console.log('SENTINEL check ' + settings.selfName);",
      "exports.runIndex = (settings) => console.log('SENTINEL index ' + (settings.root ? 'root' : 'none'));",
      '',
    ].join('\n'));
  });

  for (const tool of TOOLS) {
    it(`${tool} exits non-zero naming the engine path and the box binding when the engine is absent`, () => {
      const missing = path.join(scratch('engine-absent-'), 'nowhere');
      const r = run(tool, ['--status'], { RECORD_ENGINE_DIR: missing });
      assert.strictEqual(r.status, 2);
      assert.ok(r.stderr.includes(path.join(missing, 'record-engine.js')));
      assert.match(r.stderr, /bound to this box/);
      assert.strictEqual(r.stdout, '');
    });

    it(`${tool} exits 2 naming the engine-side install command when js-yaml cannot load`, () => {
      const seamAlone = spawnSync('node', [path.join(bareEngine, 'seam.js'), '--vocabulary'], { encoding: 'utf8', env: { ...process.env, NODE_PATH: '' } });
      assert.strictEqual(seamAlone.status, 0);
      const r = run(tool, ['--status'], { RECORD_ENGINE_DIR: bareEngine, NODE_PATH: '' });
      assert.strictEqual(r.status, 2);
      assert.match(r.stderr, /cd ~\/\.claude\/tools && npm ci/);
      assert.doesNotMatch(r.stderr, /agent-output\/tools/);
      assert.doesNotMatch(r.stderr, /Module\._resolveFilename/);
    });

    it(`${tool} loads the engine the override names, and the live engine without it`, () => {
      const overridden = run(tool, [], { RECORD_ENGINE_DIR: sentinelEngine });
      assert.match(overridden.stdout, /^SENTINEL (check|index) [a-z]+\n$/);
      const live = run(tool, ['--help'], {});
      assert.strictEqual(live.status, 0, live.stderr);
      assert.doesNotMatch(live.stdout, /SENTINEL/);
      assert.match(live.stdout, tool === 'check-repo.js'
        ? /^usage: node tools\/check-repo\.js \[--status \| --full\]\n/
        : /^usage: node tools\/build-index\.js \[--tracked\] \[--check\]\n/);
    });

    it(`requiring ${tool} writes nothing, prints nothing and exits 0`, () => {
      const statusBefore = git('status', '--porcelain');
      const blobBefore = git('hash-object', 'INDEX.md');
      const r = spawnSync('node', ['-e', `const m = require(${JSON.stringify(path.join(work, 'tools', tool))}); if (!m.SETTINGS) process.exit(3);`], { cwd: work, encoding: 'utf8' });
      assert.strictEqual(r.status, 0);
      assert.strictEqual(`${r.stdout}${r.stderr}`, '');
      assert.strictEqual(git('status', '--porcelain'), statusBefore);
      assert.strictEqual(git('hash-object', 'INDEX.md'), blobBefore);
    });
  }

  it('check-repo.js carries a gate instant and a vocabulary instant that are UTC instants no later than now', () => {
    const r = spawnSync('node', ['-e', `const { SETTINGS } = require(${JSON.stringify(path.join(work, 'tools', 'check-repo.js'))}); process.stdout.write(JSON.stringify([SETTINGS.gateInstant, SETTINGS.vocabularyInstant]));`], { cwd: work, encoding: 'utf8' });
    assert.strictEqual(r.status, 0, r.stderr);
    for (const instant of JSON.parse(r.stdout)) {
      assert.match(instant, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/);
      assert.ok(Date.parse(instant) <= Date.now());
    }
  });

  it('check-repo.js raises no basename failure for the root and probe .gitignore files or the verification probe folders', () => {
    const r = run('check-repo.js', ['--full'], {});
    const out = `${r.stdout}${r.stderr}`;
    assert.doesNotMatch(out, /'\.gitignore' appears/);
    const basenames = out.split('\n\n').find((block) => /^ {2}BASENAMES — /m.test(block)) || '';
    assert.doesNotMatch(basenames, /verification\//);
  });

  it('check-repo.js passes the committed record with its baseline and no stale baseline entry', () => {
    const r = run('check-repo.js', [], {});
    assert.strictEqual(r.status, 0, r.stdout);
    assert.match(r.stdout, /PASS — no new failures \(\d+ baselined\)\./);
    assert.doesNotMatch(r.stdout, /BASELINE — /);
  });

  it('every baseline entry names only documents of chains before 012 or one of the four closed documents without a stage suffix', () => {
    const unsuffixed = new Set([
      'code-review/closed/012-carry-forward-to-post-refresh-pass.md',
      'deployment/closed/012-message-valid-field-readiness.md',
      'deployment/closed/013-components-v2-editing-surfaces-readiness.md',
      'deployment/closed/014-test-suite-cleanup-readiness.md',
    ]);
    const beforeChain12 = (p) => /^(?:00\d|01[01])-/.test(path.posix.basename(p)) || /-plan-(?:00\d|01[01])\.md$/.test(p);
    const entries = JSON.parse(fs.readFileSync(path.join(work, 'tools', 'check-repo-baseline.json'), 'utf8'));
    assert.ok(entries.length > 0);
    const outside = [];
    for (const entry of entries) {
      const documents = entry.check === 'basenames'
        ? entry.detail.split('\n').slice(1).map((l) => l.trim())
        : [(entry.detail.match(/^(\S+?\.md)(?::\d+)?(?=[\s:]|$)/) || [])[1]];
      assert.ok(documents.length > 0 && documents.every(Boolean), `no document in: ${entry.detail}`);
      const covered = entry.check === 'scope' && documents.every((d) => unsuffixed.has(d));
      if (!covered && !documents.every(beforeChain12)) outside.push(`${entry.check}: ${entry.detail.split('\n')[0]}`);
    }
    assert.deepStrictEqual(outside, []);
  });

  it('check-repo.js reaches the engine in status mode with this record\'s settings', () => {
    const r = run('check-repo.js', ['--status'], {});
    assert.strictEqual(r.status, 0);
    assert.match(r.stdout, /open handoffs:/);
  });

  it('build-index.js --tracked --check reads the committed tree through the engine', () => {
    const r = run('build-index.js', ['--tracked', '--check'], {});
    assert.match(r.stdout, /INDEX\.md is (current|STALE) \(--tracked\)/);
    assert.ok(r.status === 0 || r.status === 1);
  });
});
