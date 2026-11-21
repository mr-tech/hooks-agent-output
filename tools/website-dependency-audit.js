'use strict';

const REVIEW = 'pending review at f943553';

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const USAGE = `Usage: node tools/website-dependency-audit.js [--website <repo>] [--ref <ref>] [--dispositions <file>]
  [--inbox <file>] [--state <file>] [--pnpm <path>]

Runs \`pnpm audit --prod --json\` over the package.json, pnpm-lock.yaml, pnpm-workspace.yaml and patches/
of the website's released ref (an export made with \`git archive\`, which fails if any of them is missing;
the website's own tree is never touched), and joins every advisory with the dispositions file. Each advisory with no disposition gets
one entry appended to the record's INBOX.md, once: its key is then kept in the state file, and later
runs do not repeat it. A run where every advisory is dispositioned writes only its log line. Keys in
either file that match no advisory in the audit are ignored. A failed run exits non-zero and reports no
advisory; the first failure of a streak appends one inbox entry, later failures none, and the next run
to succeed ends the streak and reports what the failed runs would have. When the local ref differs from
the remote branch's head (\`git ls-remote\`, read only: nothing is fetched and no ref moves), the run
appends one entry per differing pair of SHAs and audits the local ref.

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

const gitIn = (opts, ...args) => spawnSync('git', ['-C', opts.website, ...args], { maxBuffer: 1 << 28 });

function exportLockfile(opts, dir) {
  const sha = String(check(gitIn(opts, 'rev-parse', `${opts.ref}^{commit}`), 'git rev-parse')).trim();
  const tar = check(gitIn(opts, 'archive', '--format=tar', sha, ...EXPORTED), 'git archive');
  check(spawnSync('tar', ['-x', '-C', dir], { input: tar }), 'tar');
  return sha;
}

function remoteHead(opts) {
  const [remote, ...branch] = opts.ref.split('/');
  const head = String(check(gitIn(opts, 'ls-remote', remote, `refs/heads/${branch.join('/')}`), 'git ls-remote')).split('\t')[0].trim();
  if (!head) throw new Error(`git ls-remote: ${opts.ref} has no head on ${remote}`);
  return head;
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
  if (!fs.existsSync(file)) return { reported: {}, stale: {} };
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function writeState(file, state) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(`${file}.tmp`, `${JSON.stringify(state, null, 2)}\n`);
  fs.renameSync(`${file}.tmp`, file);
}

function appendEntries(inbox, entries) {
  const lead = fs.readFileSync(inbox, 'utf8').endsWith('\n') ? '\n' : '\n\n';
  fs.appendFileSync(inbox, `${lead}${entries.join('\n\n')}\n`);
}

function persist(opts, entries, state) {
  if (entries.length) appendEntries(opts.inbox, entries);
  writeState(opts.state, state);
}

const one = (s) => String(s).replace(/\s+/g, ' ').trim();
const heading = (now) => `## ${now.slice(0, 10)} — website-dependency-audit (crontab, \`tools/website-dependency-audit.js\`) — FYI`;

function failureEntry(opts, err, now) {
  return [
    heading(now),
    `The daily dependency audit of \`website\` (${opts.ref}) failed at ${now}Z: ${one(err.message).slice(0, 600)}`,
    'Asked: find why and make it run again; the crontab line\'s log has each failed day. Later failures add no entry until a run succeeds; the next run to succeed reports every advisory it finds undispositioned.',
    '**Done here**: reported when this streak of failures started. **Not done**: no advisory was read in the failed run.',
  ].join('\n');
}

function staleEntry(opts, local, remote, now) {
  return [
    heading(now),
    `\`website\`'s local ${opts.ref} is \`${local.slice(0, 7)}\`, but \`git ls-remote\` reads that branch's head at \`${remote.slice(0, 7)}\`: the audit read \`${local.slice(0, 7)}\`, which may not be the released tree.`,
    `Asked: fetch the website clone (\`git -C ${opts.website} fetch origin\`), an act for the session that holds that tree; until then the audit reads the older lockfile.`,
    '**Done here**: reported once for this pair of SHAs; the check is read only. **Not done**: no fetch and no ref moved.',
  ].join('\n');
}

function entryFor(u, sha, opts, now) {
  const paths = [...u.paths];
  return [
    heading(now),
    `\`website\` at \`${sha.slice(0, 7)}\` (${opts.ref}): \`pnpm audit --prod\` lists ${u.a.module_name} ${u.a.github_advisory_id} (${u.a.severity}, "${one(u.a.title)}", installed ${[...u.versions].join(', ')}), which \`tools/website-audit-dispositions.json\` does not disposition.`,
    `Asked: judge whether it reaches hooks.gg and add its disposition (procedure: \`node tools/website-dependency-audit.js --help\`). Advisory ${one(u.a.url)}; paths ${paths.slice(0, 3).map((p) => `\`${one(p)}\``).join(', ')} (${paths.length} in all).`,
    '**Done here**: reported once; later runs do not repeat it. **Not done**: no reachability judgement — that is an assessment, not this tool\'s.',
  ].join('\n');
}

function recordFailure(opts, err, now) {
  const state = readState(opts.state);
  if (state.failing) return;
  state.failing = now;
  persist(opts, [failureEntry(opts, err, now)], state);
}

function audit(opts, now) {
  const dispositions = JSON.parse(fs.readFileSync(opts.dispositions, 'utf8'));
  const state = readState(opts.state);
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'website-dependency-audit-'));
  let sha;
  let result;
  try {
    sha = exportLockfile(opts, dir);
    result = runAudit(opts, dir);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  const remote = remoteHead(opts);
  const open = undispositioned(result, dispositions);
  const fresh = open.filter((u) => !state.reported[u.key]);
  const pair = `${sha}..${remote}`;
  const newPair = sha !== remote && !state.stale[pair];
  const entries = [...(newPair ? [staleEntry(opts, sha, remote, now)] : []), ...fresh.map((u) => entryFor(u, sha, opts, now))];
  const changed = entries.length > 0 || Boolean(state.failing);
  for (const u of fresh) state.reported[u.key] = now;
  if (newPair) state.stale[pair] = now;
  delete state.failing;
  if (changed) persist(opts, entries, state);
  console.log(`${now}Z website ${sha.slice(0, 7)} (${opts.ref}; remote head ${remote.slice(0, 7)}): advisories ${Object.keys(result.advisories).length}, undispositioned ${open.length}, newly reported ${fresh.length} [${fresh.map((u) => u.key).join(', ')}]`);
}

function main(argv) {
  const opts = parseArgs(argv);
  if (!opts) { console.log(USAGE); return; }
  const now = new Date().toISOString().slice(0, 16);
  try {
    audit(opts, now);
  } catch (err) {
    console.error(`${now}Z website-dependency-audit failed: ${err.message}`);
    recordFailure(opts, err, now);
    process.exitCode = 1;
  }
}

try {
  main(process.argv.slice(2));
} catch (err) {
  console.error(`${new Date().toISOString().slice(0, 16)}Z website-dependency-audit failed: ${err.message}`);
  process.exitCode = 1;
}
