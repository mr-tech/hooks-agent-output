'use strict';

const REVIEW = 'pending review at f943553';

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const USAGE = `Usage: node tools/website-dependency-audit.js [--website <repo>] [--ref <ref>] [--dispositions <file>]
  [--inbox <file>] [--state <file>] [--pnpm <path>]

Runs \`pnpm audit --prod --json\` over the package.json, pnpm-lock.yaml, pnpm-workspace.yaml and patches/
of the website's released ref (an export made with \`git archive\`; the website's own tree is never
touched), and joins every advisory with the dispositions file. Each advisory with no disposition gets
one entry appended to the record's INBOX.md, once: its key is then kept in the state file, and later
runs do not repeat it. A run where every advisory is dispositioned writes only its log line. Keys in
either file that match no advisory in the audit are ignored. An unreadable audit exits non-zero and
writes nothing; the next readable run reports what it would have.

Adding a disposition, once an advisory has been assessed: add one key to the dispositions file,
  "<module>|<GHSA id>": { "disp": "<REACHED|CONDITIONAL|ABSENT|HOST|BUILD|UNLOADED|DEV>",
                          "ships": "<server|browser|both|build|none>", "how": "<why, from the code>" }
with a non-empty "how" (where installed versions differ, each field names each version), and commit
the file. Only a "<module>|<GHSA id>" key dispositions an advisory: a bare module key or a
"<module>@<version>" key does not, because it was written before later advisories of that module
existed. Delete the advisory's inbox entry once its disposition is committed.

Review state: ${REVIEW}`;

const DEFAULTS = {
  website: '/usr/local/bin/hooks/website',
  ref: 'origin/master',
  dispositions: path.join(__dirname, 'website-audit-dispositions.json'),
  inbox: path.join(__dirname, '..', 'INBOX.md'),
  state: path.join(os.homedir(), '.local', 'state', 'website-dependency-audit', 'reported.json'),
  pnpm: 'pnpm',
};
const EXPORTED = ['package.json', 'pnpm-lock.yaml', 'pnpm-workspace.yaml', 'patches'];

function parseArgs(argv) {
  const opts = { ...DEFAULTS };
  for (let i = 0; i < argv.length; i += 2) {
    if (argv[i] === '--help') return null;
    const name = argv[i].replace(/^--/, '');
    if (!argv[i].startsWith('--') || !(name in DEFAULTS) || argv[i + 1] === undefined) throw new Error(`bad argument: ${argv[i]}\n${USAGE}`);
    opts[name] = argv[i + 1];
  }
  return opts;
}

function check(result, what) {
  if (result.status !== 0) throw new Error(`${what}: exit ${result.status} ${String(result.stderr).trim()}`);
  return result.stdout;
}

function exportLockfile(opts, dir) {
  const git = (...args) => spawnSync('git', ['-C', opts.website, ...args], { maxBuffer: 1 << 28 });
  const sha = String(check(git('rev-parse', '--short', `${opts.ref}^{commit}`), 'git rev-parse')).trim();
  const present = String(check(git('ls-tree', '--name-only', sha), 'git ls-tree')).split('\n');
  const tar = check(git('archive', '--format=tar', sha, ...EXPORTED.filter((f) => present.includes(f))), 'git archive');
  check(spawnSync('tar', ['-x', '-C', dir], { input: tar }), 'tar');
  return sha;
}

function runAudit(opts, dir) {
  const r = spawnSync(opts.pnpm, ['audit', '--prod', '--json'], { cwd: dir, encoding: 'utf8', maxBuffer: 1 << 28, timeout: 300000 });
  let audit;
  try { audit = JSON.parse(r.stdout); } catch { audit = null; }
  if (!audit || typeof audit.advisories !== 'object' || audit.advisories === null) {
    throw new Error(`pnpm audit gave no advisories (exit ${r.status}): ${String(r.stdout).slice(0, 300)} ${String(r.stderr).slice(0, 300)}`);
  }
  return audit;
}

function undispositioned(audit, dispositions) {
  const byKey = new Map();
  for (const a of Object.values(audit.advisories)) {
    const key = `${a.module_name}|${a.github_advisory_id}`;
    const d = dispositions[key];
    if (d && d.how) continue;
    const seen = byKey.get(key) || { key, a, versions: new Set(), paths: new Set() };
    for (const f of a.findings) {
      seen.versions.add(f.version);
      for (const p of f.paths) seen.paths.add(p);
    }
    byKey.set(key, seen);
  }
  return [...byKey.values()];
}

function readState(file) {
  if (!fs.existsSync(file)) return { reported: {} };
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function entryFor(u, sha, opts, day) {
  const one = (s) => String(s).replace(/\s+/g, ' ').trim();
  const paths = [...u.paths];
  return [
    `## ${day} — website-dependency-audit (crontab, \`tools/website-dependency-audit.js\`) — FYI`,
    `\`website\` at \`${sha}\` (${opts.ref}): \`pnpm audit --prod\` lists ${u.a.module_name} ${u.a.github_advisory_id} (${u.a.severity}, "${one(u.a.title)}", installed ${[...u.versions].join(', ')}), which \`tools/website-audit-dispositions.json\` does not disposition.`,
    `Asked: judge whether it reaches hooks.gg and add its disposition (procedure: \`node tools/website-dependency-audit.js --help\`). Advisory ${one(u.a.url)}; paths ${paths.slice(0, 3).map((p) => `\`${one(p)}\``).join(', ')} (${paths.length} in all).`,
    '**Done here**: reported once; later runs do not repeat it. **Not done**: no reachability judgement — that is an assessment, not this tool\'s.',
  ].join('\n');
}

function main(argv) {
  const opts = parseArgs(argv);
  if (!opts) { console.log(USAGE); return; }
  const dispositions = JSON.parse(fs.readFileSync(opts.dispositions, 'utf8'));
  const state = readState(opts.state);
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'website-dependency-audit-'));
  let sha;
  let audit;
  try {
    sha = exportLockfile(opts, dir);
    audit = runAudit(opts, dir);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  const open = undispositioned(audit, dispositions);
  const fresh = open.filter((u) => !state.reported[u.key]);
  const now = new Date().toISOString().slice(0, 16);
  if (fresh.length) {
    const lead = fs.readFileSync(opts.inbox, 'utf8').endsWith('\n') ? '\n' : '\n\n';
    fs.appendFileSync(opts.inbox, `${lead}${fresh.map((u) => entryFor(u, sha, opts, now.slice(0, 10))).join('\n\n')}\n`);
    for (const u of fresh) state.reported[u.key] = now;
    fs.mkdirSync(path.dirname(opts.state), { recursive: true });
    fs.writeFileSync(opts.state, `${JSON.stringify(state, null, 2)}\n`);
  }
  console.log(`${now}Z website ${sha} (${opts.ref}): advisories ${Object.keys(audit.advisories).length}, undispositioned ${open.length}, newly reported ${fresh.length} [${fresh.map((u) => u.key).join(', ')}]`);
}

try {
  main(process.argv.slice(2));
} catch (err) {
  console.error(`${new Date().toISOString().slice(0, 16)}Z website-dependency-audit failed: ${err.message}`);
  process.exitCode = 1;
}
