'use strict';

const assert = require('node:assert');
const fs = require('node:fs');
const net = require('node:net');
const os = require('node:os');
const path = require('node:path');
const { describe, it, before, after, afterEach } = require('node:test');
const { execFileSync, spawn, spawnSync } = require('node:child_process');

const SCRIPT = path.join(__dirname, 'uat-local-stack.sh');
const PASSWORD = 'pw-Zq7!xK9#planted-distinct';
const PASSWORD_ENCODED = 'pw-Zq7%21xK9%23planted-distinct';
const LABEL = 'hooks.uat-local-stack=1';
const NAME = 'hooks-postgres-local';

const DOCKER_STUB = `#!/usr/bin/env bash
S="$STUB_STATE"
printf '%s\\n' "$*" >> "$S/docker.argv"
env | grep -c '^POSTGRES_PASSWORD=' >> "$S/docker.pwenv"
cmd="$1"; shift
has() { [ -e "$S/$1" ]; }
case "$cmd" in
  inspect)
    has exists || { echo "Error: No such object: $*" >&2; exit 1; }
    lbl=$(cat "$S/label" 2>/dev/null); key=\${lbl%%=*}; val=\${lbl#*=}
    [ "$key" = "hooks.uat-local-stack" ] || val=""
    printf '%s %s\\n' "$(cat "$S/state")" "$val"
    ;;
  port)
    has exists || exit 1
    [ -s "$S/published" ] && cat "$S/published"
    exit 0
    ;;
  run)
    [ -n "\${STUB_RUN_FAILS:-}" ] && { echo "docker: run refused" >&2; exit 125; }
    [ -n "\${STUB_RUN_CLASH:-}" ] && {
      : > "$S/exists"; echo running > "$S/state"; printf 'hooks.uat-local-stack=1' > "$S/label"; printf 'hooks.uat-local-stack=1\\n' > "$S/labels"; : > "$S/published"
      [ -n "\${STUB_RUN_JUNK_STDOUT:-}" ] && echo 'WARNING: the requested image platform does not match the host'
      echo 'docker: Error response from daemon: Conflict. The container name "/hooks-postgres-local" is already in use' >&2; exit 125; }
    : > "$S/exists"; echo running > "$S/state"
    lbl=""; pub=""; prev=""; : > "$S/labels"
    for a in "$@"; do
      [ "$prev" = "--label" ] && { printf '%s\\n' "$a" >> "$S/labels"; case "$a" in hooks.uat-local-stack=*) lbl="$a" ;; esac; }
      [ "$prev" = "-p" ] && pub="$a"
      prev="$a"
    done
    printf '%s' "$lbl" > "$S/label"
    printf '%s\\n' "\${pub%:*}" | sed 's/$//' > "$S/published"
    if [ -n "\${STUB_RUN_HOLDS:-}" ]; then
      : > "$S/run.created"
      for _ in $(seq 1 400); do [ -e "$S/run.go" ] && break; sleep 0.05; done
    fi
    [ -n "\${STUB_RUN_PRINTS_NOTHING:-}" ] && exit 0
    [ -n "\${STUB_RELABEL_AFTER_RUN:-}" ] && { printf 'someone-else=1' > "$S/label"; printf 'someone-else=1\\n' > "$S/labels"; }
    [ -n "\${STUB_RUN_CREATES_THEN_FAILS:-}" ] && { echo "stubcontainerid"; echo "docker: start failed" >&2; exit 125; }
    echo "stubcontainerid"
    ;;
  start)
    has exists || exit 1
    [ -n "\${STUB_START_FAILS:-}" ] && { echo "docker: start refused" >&2; exit 1; }
    if [ -n "\${STUB_RELABEL_AFTER_START:-}" ]; then printf 'someone-else=1' > "$S/label"; fi
    echo running > "$S/state"
    if [ -n "\${STUB_START_HOLDS:-}" ]; then
      : > "$S/start.began"
      for _ in $(seq 1 400); do [ -e "$S/start.go" ] && break; sleep 0.05; done
    fi
    echo "$NAME_ARG"
    ;;
  ps)
    has exists || exit 0
    want=""; prev=""
    for a in "$@"; do [ "$prev" = "--filter" ] && want="\${a#label=}"; prev="$a"; done
    [ -n "\${STUB_PS_JUNK:-}" ] && { echo 'WARNING:'; echo '--volumes'; echo '../x'; }
    [ -n "$want" ] && grep -Fxq -- "$want" "$S/labels" 2>/dev/null && echo stubcontainerid
    exit 0
    ;;
  stop)
    has exists || exit 1
    echo exited > "$S/state"
    ;;
  rm)
    has exists || exit 1
    [ -n "\${STUB_RM_FAILS:-}" ] && { echo "docker: rm refused" >&2; exit 1; }
    rm -f "$S/exists" "$S/state" "$S/label" "$S/labels" "$S/published"
    ;;
  exec)
    has exists || exit 1
    all="$*"
    case "$all" in
      *pg_isready*)
        [ -n "\${STUB_NOT_READY:-}" ] && exit 2
        echo "127.0.0.1:5432 - accepting connections"; exit 0 ;;
      *psql*)
        if [ -n "\${STUB_SEED_FAILS:-}" ] && [[ "$all" == *ON_ERROR_STOP* ]]; then cat > /dev/null; exit 3; fi
        if [[ "$all" == *ON_ERROR_STOP* ]]; then cat > "$S/seed.stdin"; exit 0; fi
        [ -n "\${STUB_TABLES_EMPTY:-}" ] && exit 0
        echo "\${STUB_TABLES:-7}"; exit 0 ;;
    esac
    ;;
  *) echo "docker stub: unexpected $cmd" >&2; exit 64 ;;
esac
`;

const PRISMA_STUB = `#!/usr/bin/env bash
S="$STUB_STATE"
printf '%s\\n' "$*" >> "$S/prisma.argv"
printf 'DATABASE_URL set: %s\\n' "$([ -n "\${DATABASE_URL:-}" ] && echo yes || echo no)" >> "$S/prisma.env"
echo "Datasource db at $DATABASE_URL"
exit "\${STUB_PRISMA_EXIT:-0}"
`;

const POISON = `#!/bin/sh
printf '%s %s\\n' "$0" "$*" >> "$POISON_MARK"
exit 97
`;

const free = () => new Promise((resolve) => {
  const s = net.createServer();
  s.listen(0, '127.0.0.1', () => { const { port } = s.address(); s.close(() => resolve(port)); });
});

describe('uat-local-stack.sh', () => {
  let root;
  let bin;
  let port;
  let outputs;
  let poison;
  const marker = () => path.join(root, 'poison.marker');
  const sh = (p, body) => { fs.writeFileSync(p, body, { mode: 0o755 }); };
  const url = (host = '127.0.0.1', p = port, pw = PASSWORD_ENCODED) => `postgresql://hooksuser:${pw}@${host}:${p}/railway?schema=public`;
  const envFile = (databaseUrl) => path.join(root, 'website', '.env.local') && (() => {
    fs.writeFileSync(path.join(root, 'website', '.env.local'), [
      'NODE_ENV=development', '# development', '# DATABASE_URL=postgresql://other:nope@127.0.0.1:1/other',
      '# production', `DATABASE_URL="${databaseUrl}"`, `REDISHOST=127.0.0.1`, `REDISPORT=${port + 1}`, ''].join('\n'));
    return path.join(root, 'website', '.env.local');
  })();
  const stateOf = (name) => { try { return fs.readFileSync(path.join(root, 'state', name), 'utf8'); } catch { return ''; } };
  const docker = () => stateOf('docker.argv').split('\n').filter(Boolean);
  const prisma = () => stateOf('prisma.argv').split('\n').filter(Boolean);
  const container = (state, label = LABEL, published = `127.0.0.1:${port}`) => {
    const s = path.join(root, 'state');
    fs.writeFileSync(path.join(s, 'exists'), '');
    fs.writeFileSync(path.join(s, 'state'), state);
    fs.writeFileSync(path.join(s, 'label'), label);
    fs.writeFileSync(path.join(s, 'published'), `${published}\n`);
  };
  const envFor = (extraEnv = {}) => ({
    PATH: `${poison}:/usr/bin:/bin`,
    POISON_MARK: marker(),
    ULS_DOCKER: path.join(bin, 'docker'),
    HOME: root,
    TMPDIR: path.join(root, 'tmp'),
    STUB_STATE: path.join(root, 'state'),
    ULS_ENV_FILE: path.join(root, 'website', '.env.local'),
    ULS_SCHEMA: path.join(root, 'project-utils', 'prisma', 'schema.prisma'),
    ULS_PRISMA: path.join(bin, 'prisma'),
    ULS_SEED: path.join(root, 'seed.sql'),
    ULS_READY_TRIES: '2',
    ULS_READY_PAUSE: '0',
    ...extraEnv,
  });
  const appeared = async (name, ms = 10000) => {
    const end = Date.now() + ms;
    while (!fs.existsSync(path.join(root, 'state', name))) {
      if (Date.now() > end) throw new Error(`${name} never appeared`);
      await new Promise((resolve) => setTimeout(resolve, 20));
    }
  };
  // Signals the script once the stub has made the change (its marker file appears) and before the stub's docker call
  // returns; the stub returns when the go file appears. The signal lands inside the call, never at its start or end.
  const interrupted = async (args, extraEnv, signal, ready, go) => {
    const child = spawn('bash', [SCRIPT, ...args], { cwd: path.join(root, 'website'), env: envFor(extraEnv), stdio: ['ignore', 'pipe', 'pipe'] });
    let out = '';
    child.stdout.on('data', (d) => { out += d; });
    child.stderr.on('data', (d) => { out += d; });
    const closed = new Promise((resolve) => child.on('close', (status) => resolve(status)));
    await appeared(ready);
    child.kill(signal);
    fs.writeFileSync(path.join(root, 'state', go), '');
    const status = await closed;
    outputs.push(out);
    return { status, out };
  };
  const run = (args, extraEnv = {}) => {
    const r = spawnSync('bash', [SCRIPT, ...args], {
      cwd: path.join(root, 'website'),
      encoding: 'utf8',
      env: envFor(extraEnv),
      timeout: 30000,
    });
    const out = `${r.stdout}${r.stderr}`;
    outputs.push(out);
    return { status: r.status, out, stdout: r.stdout, stderr: r.stderr };
  };
  const repoState = () => ['website', 'project-utils', 'record'].map((d) => execFileSync('git', ['status', '--porcelain', '--ignored'], { cwd: path.join(root, d), encoding: 'utf8' })).join('|')
    + fs.readdirSync(path.join(root, 'tmp')).join(',');
  const hold = async (p) => {
    const server = net.createServer((c) => c.end());
    await new Promise((resolve) => server.listen(p, '127.0.0.1', resolve));
    return server;
  };
  const pongServer = (p, mode = 'open') => new Promise((resolve, reject) => {
    const code = `
      const mode = ${JSON.stringify(mode)};
      require('net').createServer((c) => { let authed = mode !== 'auth'; c.on('data', (d) => {
        const t = d.toString();
        if (mode === 'error') return c.write('-NOAUTH Authentication required.\\r\\n');
        if (/^AUTH secret-redis/i.test(t)) { authed = true; c.write('+OK\\r\\n'); return; }
        if (/PING/i.test(t)) c.write(authed ? '+PONG\\r\\n' : '-NOAUTH Authentication required.\\r\\n');
      }); }).listen(${p}, '127.0.0.1', () => console.log('up'));`;
    const child = spawn(process.execPath, ['-e', code], { stdio: ['ignore', 'pipe', 'inherit'] });
    child.stdout.once('data', () => resolve(child));
    child.once('error', reject);
  });
  const dockerVerbs = () => docker().map((l) => l.split(' ')[0]);
  const mutating = () => dockerVerbs().filter((v) => ['run', 'start', 'stop', 'rm'].includes(v));

  const setup = (parent) => {
    const made = fs.mkdtempSync(path.join(parent, 'uls-'));
    for (const d of ['bin', 'state', 'tmp', 'website', path.join('project-utils', 'prisma'), 'record']) fs.mkdirSync(path.join(made, d), { recursive: true });
    for (const d of ['website', 'project-utils', 'record']) {
      execFileSync('git', ['init', '-q'], { cwd: path.join(made, d) });
      fs.writeFileSync(path.join(made, d, 'README'), 'fixture\n');
      execFileSync('git', ['-c', 'user.name=f', '-c', 'user.email=f@example.invalid', 'add', '-A'], { cwd: path.join(made, d) });
      execFileSync('git', ['-c', 'user.name=f', '-c', 'user.email=f@example.invalid', 'commit', '-q', '-m', 'fixture'], { cwd: path.join(made, d) });
    }
    fs.writeFileSync(path.join(made, 'project-utils', 'prisma', 'schema.prisma'), 'datasource db { provider = "postgresql" url = env("DATABASE_URL") }\n');
    fs.writeFileSync(path.join(made, 'seed.sql'), "insert into \"Users\" values ('synthetic');\n");
    sh(path.join(made, 'bin', 'docker'), DOCKER_STUB.replace('echo "$NAME_ARG"', `echo ${NAME}`));
    sh(path.join(made, 'bin', 'prisma'), PRISMA_STUB);
    return made;
  };

  before(async () => {
    root = setup(os.tmpdir());
    bin = path.join(root, 'bin');
    poison = fs.mkdtempSync('/tmp/uls-poison-');
    sh(path.join(poison, 'docker'), POISON);
    sh(path.join(poison, 'prisma'), POISON);
    outputs = [];
  });

  afterEach(() => {
    assert.strictEqual(fs.existsSync(marker()), false, 'a bare docker or prisma was run: the host binary would have been reached');
  });

  after(() => { fs.rmSync(root, { recursive: true, force: true }); fs.rmSync(poison, { recursive: true, force: true }); });

  const fresh = async (databaseUrl) => {
    port = await free();
    for (const f of fs.readdirSync(path.join(root, 'state'))) fs.rmSync(path.join(root, 'state', f));
    envFile(databaseUrl === undefined ? url('127.0.0.1', port) : databaseUrl);
  };
  const freshAt = async (host) => { port = await free(); for (const f of fs.readdirSync(path.join(root, 'state'))) fs.rmSync(path.join(root, 'state', f)); envFile(url(host, port)); };

  describe('arguments', () => {
    for (const args of [[], ['bogus'], ['up', '--bogus'], ['down', '--seed'], ['status', 'extra'], ['up', 'up'], ['up', '--seed', '--seed']]) {
      it(`exits 2 for ${JSON.stringify(args)}, names the usage and touches nothing`, async () => {
        await fresh();
        const before = repoState();
        const r = run(args);
        assert.strictEqual(r.status, 2);
        assert.match(r.stderr, /uat-local-stack\.sh up \[--seed\] \| down \| status/);
        assert.deepStrictEqual(docker(), []);
        assert.strictEqual(repoState(), before);
      });
    }

    for (const flag of ['-h', '--help']) {
      it(`${flag} prints the usage, exits 0 and touches nothing`, async () => {
        await fresh();
        const before = repoState();
        const r = run([flag]);
        assert.strictEqual(r.status, 0);
        assert.match(r.stdout, /uat-local-stack\.sh up \[--seed\] \| down \| status/);
        assert.deepStrictEqual(docker(), []);
        assert.strictEqual(repoState(), before);
      });
    }
  });

  describe('AC-9.2 local only', () => {
    for (const host of ['0.0.0.0', '192.168.1.5', 'db.internal', '10.0.0.7', 'railway.app']) {
      it(`refuses ${host} with exit 2 before any docker, prisma or network act, and says "local only"`, async () => {
        await freshAt(host);
        for (const verb of [['up'], ['up', '--seed'], ['down'], ['status']]) {
          const r = run(verb);
          assert.strictEqual(r.status, 2, verb.join(' '));
          assert.match(r.stderr, /local only/);
          assert.strictEqual(r.out.includes(host), false, 'the host is not echoed');
        }
        assert.deepStrictEqual(docker(), []);
        assert.deepStrictEqual(prisma(), []);
      });
    }

    for (const host of ['localhost', '[::1]', '127.0.0.2', '127.0.0.1']) {
      it(`takes ${host} as local: the verb proceeds to the docker act`, async () => {
        await freshAt(host);
        const r = run(['status']);
        assert.strictEqual(r.status, 0, r.out);
        assert.ok(docker().length > 0);
      });
    }

    for (const [host, bind] of [['localhost', '127.0.0.1'], ['[::1]', '[::1]'], ['127.0.0.2', '127.0.0.2']]) {
      it(`takes ${host} as local through up: the container is published on ${bind}, and status then finds it there`, async () => {
        await freshAt(host);
        const r = run(['up']);
        assert.strictEqual(r.status, 0, r.out);
        assert.ok(docker().find((l) => l.startsWith('run ')).includes(`-p ${bind}:${port}:5432`), docker().join('\n'));
        assert.match(r.stdout, new RegExp(`container: ${NAME} ready at ${bind.replace(/[[\]]/g, '\\$&')}:${port}`));
        assert.match(run(['status']).stdout, /container: running \(the tool's\)/);
      });
    }

    it('a URL with no port takes 5432', async () => {
      await fresh(`postgresql://hooksuser:${PASSWORD_ENCODED}@127.0.0.1/railway`);
      const r = run(['status']);
      assert.strictEqual(r.status, 0, r.out);
      assert.match(r.stdout, /^listener: 127\.0\.0\.1:5432 /m);
    });

    it('refuses a DATABASE_URL that cannot be parsed without echoing any part of it', async () => {
      await fresh('not a url at all %%junk-fragment-4417');
      const r = run(['up']);
      assert.strictEqual(r.status, 2);
      assert.strictEqual((r.out.match(/junk-fragment-4417/g) || []).length, 0);
      assert.deepStrictEqual(docker(), []);
    });

    it('refuses a URL that is not a postgres URL, or has no user, password or database', async () => {
      for (const bad of [`mysql://hooksuser:${PASSWORD_ENCODED}@127.0.0.1:3306/railway`, 'postgresql://hooksuser@127.0.0.1:1/railway', 'postgresql://:pw@127.0.0.1:1/railway', 'postgresql://hooksuser:pw@127.0.0.1:1/']) {
        await fresh(bad);
        const r = run(['status']);
        assert.strictEqual(r.status, 2, bad.replace(/:[^:@/]*@/, ':…@'));
        assert.deepStrictEqual(docker(), []);
      }
    });

    it('takes the last DATABASE_URL line, with an export prefix and single quotes read off', async () => {
      await fresh();
      fs.writeFileSync(path.join(root, 'website', '.env.local'), [
        `DATABASE_URL=${url('prod.db.example')}`, `export DATABASE_URL='${url('127.0.0.1', port)}'`, ''].join('\n'));
      const r = run(['up']);
      assert.strictEqual(r.status, 0, r.out);
      assert.ok(docker().find((l) => l.startsWith('run ')).includes(`-p 127.0.0.1:${port}:5432`));
    });

    it('refuses a file with no DATABASE_URL line', async () => {
      await fresh();
      fs.writeFileSync(path.join(root, 'website', '.env.local'), '# production\n# DATABASE_URL=postgresql://a:b@127.0.0.1:1/c\n');
      const r = run(['status']);
      assert.strictEqual(r.status, 2);
      assert.match(r.stderr, /DATABASE_URL/);
      assert.deepStrictEqual(docker(), []);
    });

    it('reads the "# production"-labelled line of the real file shape: a loopback host there is taken, a remote host there is refused', async () => {
      await freshAt('127.0.0.1');
      assert.match(fs.readFileSync(path.join(root, 'website', '.env.local'), 'utf8'), /# production\nDATABASE_URL=/);
      assert.strictEqual(run(['status']).status, 0);
      await freshAt('prod.db.example');
      assert.match(fs.readFileSync(path.join(root, 'website', '.env.local'), 'utf8'), /# production\nDATABASE_URL=/);
      assert.strictEqual(run(['status']).status, 2);
    });
  });

  describe('AC-9.1a up, by the state it finds', () => {
    it('no container, port free: creates it labelled, publishes the URL host and port, passes the password by name, waits ready, pushes with --skip-generate and prints the count', async () => {
      await fresh();
      const r = run(['up']);
      assert.strictEqual(r.status, 0, r.out);
      const runLine = docker().find((l) => l.startsWith('run '));
      assert.ok(runLine, docker().join('\n'));
      assert.match(runLine, new RegExp(`--name ${NAME}\\b`));
      assert.ok(runLine.includes(`--label ${LABEL}`));
      assert.ok(runLine.includes(`-p 127.0.0.1:${port}:5432`));
      assert.match(runLine, /-e POSTGRES_PASSWORD(?= |$)/);
      assert.ok(runLine.endsWith('postgres:16'), runLine);
      assert.ok(dockerVerbs().includes('exec'));
      assert.deepStrictEqual(prisma().length, 1);
      assert.strictEqual(prisma()[0], `db push --schema ${path.join(root, 'project-utils', 'prisma', 'schema.prisma')} --skip-generate`);
      assert.match(r.stdout, /tables: 7/);
      assert.strictEqual(stateOf('prisma.env').trim(), 'DATABASE_URL set: yes');
    });

    it('never passes --accept-data-loss, and carries the password in no argv', async () => {
      await fresh();
      run(['up']);
      assert.strictEqual(prisma().join('\n').includes('accept-data-loss'), false);
      for (const line of [...docker(), ...prisma()]) {
        assert.strictEqual(line.includes(PASSWORD), false);
        assert.strictEqual(line.includes(PASSWORD_ENCODED), false);
      }
      assert.ok(stateOf('docker.pwenv').split('\n').filter(Boolean).some((n) => n === '1'), 'the docker client was given the password in its environment');
    });

    it('up --seed on an empty container this call created applies seed.sql after the push', async () => {
      await fresh();
      const r = run(['up', '--seed']);
      assert.strictEqual(r.status, 0, r.out);
      assert.strictEqual(stateOf('seed.stdin'), fs.readFileSync(path.join(root, 'seed.sql'), 'utf8'));
      assert.ok(docker().findIndex((l) => l.includes('ON_ERROR_STOP')) > docker().findIndex((l) => l.startsWith('run ')));
    });

    it('the tool\'s container running: up reuses it (no run, no start), pushes and counts', async () => {
      await fresh();
      container('running');
      const r = run(['up']);
      assert.strictEqual(r.status, 0, r.out);
      assert.deepStrictEqual(mutating(), []);
      assert.strictEqual(prisma().length, 1);
      assert.match(r.stdout, /tables: 7/);
    });

    it('the tool\'s container running: up --seed exits 2 before any act (no push, no seed, no mutation)', async () => {
      await fresh();
      container('running');
      const r = run(['up', '--seed']);
      assert.strictEqual(r.status, 2);
      assert.deepStrictEqual(mutating(), []);
      assert.deepStrictEqual(prisma(), []);
      assert.strictEqual(fs.existsSync(path.join(root, 'state', 'seed.stdin')), false);
      assert.strictEqual(docker().some((l) => l.includes('ON_ERROR_STOP')), false);
    });

    it('the tool\'s container stopped: up starts it, pushes and counts', async () => {
      await fresh();
      container('exited');
      const r = run(['up']);
      assert.strictEqual(r.status, 0, r.out);
      assert.deepStrictEqual(mutating(), ['start']);
      assert.strictEqual(prisma().length, 1);
    });

    it('the tool\'s container stopped: up --seed exits 2 without starting it', async () => {
      await fresh();
      container('exited');
      const r = run(['up', '--seed']);
      assert.strictEqual(r.status, 2);
      assert.deepStrictEqual(mutating(), []);
      assert.deepStrictEqual(prisma(), []);
    });

    for (const seed of [false, true]) {
      it(`a container of that name without the tool's label: up${seed ? ' --seed' : ''} exits 2 before any act and removes nothing`, async () => {
        await fresh();
        container('running', 'someone-else=1');
        const r = run(seed ? ['up', '--seed'] : ['up']);
        assert.strictEqual(r.status, 2);
        assert.deepStrictEqual(mutating(), []);
        assert.deepStrictEqual(prisma(), []);
        assert.strictEqual(fs.existsSync(path.join(root, 'state', 'exists')), true);
      });
    }

    it('the URL\'s port held by a stub listener, no container: up exits 2 and the prisma argv log is empty', async () => {
      await fresh();
      const server = net.createServer((c) => c.end());
      await new Promise((resolve) => server.listen(port, '127.0.0.1', resolve));
      try {
        for (const args of [['up'], ['up', '--seed']]) {
          const r = run(args);
          assert.strictEqual(r.status, 2, r.out);
          assert.match(r.stderr, /another listener|not this tool's container/);
        }
        assert.deepStrictEqual(prisma(), []);
        assert.deepStrictEqual(mutating(), []);
      } finally { server.close(); }
    });

    it('the tool\'s container running but not publishing the URL\'s host and port: up exits 2 and the prisma argv log is empty', async () => {
      await fresh();
      container('running', LABEL, `127.0.0.1:${port + 7}`);
      const r = run(['up']);
      assert.strictEqual(r.status, 2, r.out);
      assert.deepStrictEqual(prisma(), []);
    });

    it('the tool\'s container stopped while a stub holds the port: up exits 2 without starting it', async () => {
      await fresh();
      container('exited');
      const server = net.createServer((c) => c.end());
      await new Promise((resolve) => server.listen(port, '127.0.0.1', resolve));
      try {
        const r = run(['up']);
        assert.strictEqual(r.status, 2, r.out);
        assert.deepStrictEqual(mutating(), []);
        assert.deepStrictEqual(prisma(), []);
      } finally { server.close(); }
    });
  });

  describe('AC-9.5 a failed up leaves nothing it started', () => {
    it('a container this call created is removed when the schema push fails, and the call reports it', async () => {
      await fresh();
      const r = run(['up'], { STUB_PRISMA_EXIT: '1' });
      assert.notStrictEqual(r.status, 0);
      assert.strictEqual(fs.existsSync(path.join(root, 'state', 'exists')), false);
      assert.deepStrictEqual(mutating(), ['run', 'rm']);
      assert.match(r.out, /removed the container this call created/);
    });

    it('a container this call created is removed when it never becomes ready', async () => {
      await fresh();
      const r = run(['up'], { STUB_NOT_READY: '1' });
      assert.notStrictEqual(r.status, 0);
      assert.deepStrictEqual(mutating(), ['run', 'rm']);
      assert.strictEqual(fs.existsSync(path.join(root, 'state', 'exists')), false);
      assert.deepStrictEqual(prisma(), []);
      assert.match(r.out, /not ready/);
    });

    it('a container this call created is removed when the seed fails', async () => {
      await fresh();
      const r = run(['up', '--seed'], { STUB_SEED_FAILS: '1' });
      assert.notStrictEqual(r.status, 0);
      assert.deepStrictEqual(mutating(), ['run', 'rm']);
      assert.strictEqual(prisma().length, 1);
      assert.strictEqual(fs.existsSync(path.join(root, 'state', 'exists')), false);
    });

    it('a refused docker run leaves no container and reports the failure', async () => {
      await fresh();
      const r = run(['up'], { STUB_RUN_FAILS: '1' });
      assert.notStrictEqual(r.status, 0);
      assert.deepStrictEqual(mutating(), ['run']);
      assert.strictEqual(fs.existsSync(path.join(root, 'state', 'exists')), false);
    });

    it('a container the call only reused is left in place when the push fails', async () => {
      await fresh();
      container('running');
      const r = run(['up'], { STUB_PRISMA_EXIT: '1' });
      assert.notStrictEqual(r.status, 0);
      assert.strictEqual(prisma().length, 1);
      assert.deepStrictEqual(mutating(), []);
      assert.strictEqual(stateOf('state').trim(), 'running');
    });

    it('a container the call started is stopped again when the push fails', async () => {
      await fresh();
      container('exited');
      const r = run(['up'], { STUB_PRISMA_EXIT: '1' });
      assert.notStrictEqual(r.status, 0);
      assert.deepStrictEqual(mutating(), ['start', 'stop']);
      assert.strictEqual(stateOf('state').trim(), 'exited');
    });

    it('cleanup removes only a container carrying this call\'s label: one relabelled after run is left, and the call says so', async () => {
      await fresh();
      const r = run(['up'], { STUB_PRISMA_EXIT: '1', STUB_RELABEL_AFTER_RUN: '1' });
      assert.notStrictEqual(r.status, 0);
      assert.deepStrictEqual(mutating(), ['run']);
      assert.strictEqual(fs.existsSync(path.join(root, 'state', 'exists')), true);
      assert.match(r.out, /not removed: it does not carry this call's label/);
    });

    it('the tool\'s stopped container that starts but does not publish the URL\'s host and port: up fails, stops it again and pushes nothing', async () => {
      await fresh();
      container('exited', LABEL, `127.0.0.1:${port + 7}`);
      const r = run(['up']);
      assert.strictEqual(r.status, 1, r.out);
      assert.match(r.out, /the started container is not publishing/);
      assert.deepStrictEqual(mutating(), ['start', 'stop']);
      assert.deepStrictEqual(prisma(), []);
      assert.strictEqual(stateOf('state').trim(), 'exited');
    });

    it('an empty table count after the push fails the call, and the container it created is removed', async () => {
      await fresh();
      const r = run(['up'], { STUB_TABLES_EMPTY: '1' });
      assert.strictEqual(r.status, 1, r.out);
      assert.match(r.out, /table count failed/);
      assert.doesNotMatch(r.stdout, /^tables:/m);
      assert.deepStrictEqual(mutating(), ['run', 'rm']);
    });

    it('a docker start that fails is named as that, exits 1, and has nothing to stop', async () => {
      await fresh();
      container('exited');
      const r = run(['up'], { STUB_START_FAILS: '1' });
      assert.strictEqual(r.status, 1, r.out);
      assert.match(r.out, /docker start failed/);
      assert.doesNotMatch(r.out, /not publishing/);
      assert.deepStrictEqual(mutating(), ['start']);
      assert.deepStrictEqual(prisma(), []);
    });

    it('cleanup stops a container it started only while it carries the label: one relabelled after start is left, and the call says so', async () => {
      await fresh();
      container('exited');
      const r = run(['up'], { STUB_PRISMA_EXIT: '1', STUB_RELABEL_AFTER_START: '1' });
      assert.notStrictEqual(r.status, 0);
      assert.deepStrictEqual(mutating(), ['start']);
      assert.strictEqual(stateOf('state').trim(), 'running');
      assert.match(r.out, /not stopped: it no longer carries the tool's label/);
    });

    it('every verb writes nothing in website, project-utils, the record or TMPDIR', async () => {
      await fresh();
      const before = repoState();
      for (const args of [['up'], ['status'], ['down'], ['up', '--seed'], ['down']]) run(args);
      run(['up'], { STUB_PRISMA_EXIT: '1' });
      run(['status']);
      assert.ok(prisma().length >= 2 && dockerVerbs().includes('run') && dockerVerbs().includes('rm'), 'the verbs ran');
      assert.strictEqual(repoState(), before);
    });
  });

  describe('AC-9.3 status', () => {
    const lines = (r) => r.stdout.split('\n').filter(Boolean);

    it('no container: five lines, each naming the missing piece, none reporting ready', async () => {
      await fresh();
      const r = run(['status']);
      assert.strictEqual(r.status, 0, r.out);
      const l = lines(r);
      assert.strictEqual(l.length, 5, r.stdout);
      assert.match(l[0], /^container: no container named hooks-postgres-local$/);
      assert.match(l[1], new RegExp(`^listener: 127\\.0\\.0\\.1:${port} free$`));
      assert.match(l[2], /^ready: no\b/);
      assert.match(l[3], /^tables: unknown\b/);
      assert.match(l[4], /^redis: /);
      assert.strictEqual(/accepting connections|ready: yes/.test(r.stdout), false);
      assert.deepStrictEqual(mutating(), []);
      assert.deepStrictEqual(prisma(), []);
    });

    it('a running, ready container with a redis that answers PING: all five lines read ready, the readiness taken by pg_isready inside the container', async () => {
      await fresh();
      container('running');
      const pg = await hold(port);
      const redis = await pongServer(port + 1);
      try {
        const r = run(['status']);
        assert.strictEqual(r.status, 0, r.out);
        const l = lines(r);
        assert.strictEqual(l.length, 5, r.stdout);
        assert.match(l[0], /^container: running \(the tool's\)$/);
        assert.match(l[1], new RegExp(`^listener: 127\\.0\\.0\\.1:${port} the tool's container$`));
        assert.match(l[2], new RegExp(`^ready: yes \\(pg_isready in the container, 127\\.0\\.0\\.1:${port}\\)$`));
        assert.match(l[3], /^tables: 7$/);
        assert.match(l[4], /^redis: 127\.0\.0\.1:\d+ answered PING$/);
        assert.ok(docker().some((x) => /^exec hooks-postgres-local pg_isready -h 127\.0\.0\.1 -p 5432 -U hooksuser -d railway$/.test(x)), docker().join('\n'));
        assert.deepStrictEqual(mutating(), []);
        assert.deepStrictEqual(prisma(), []);
      } finally { redis.kill(); pg.close(); }
    });

    it('a running container that is not accepting connections: ready names it, tables are unknown', async () => {
      await fresh();
      container('running');
      const r = run(['status'], { STUB_NOT_READY: '1' });
      const l = lines(r);
      assert.match(l[2], /^ready: no\b/);
      assert.match(l[3], /^tables: unknown\b/);
    });

    it('a stopped container is named stopped and not reported ready', async () => {
      await fresh();
      container('exited');
      const l = lines(run(['status']));
      assert.match(l[0], /^container: exited \(the tool's\)$/);
      assert.match(l[2], /^ready: no\b/);
    });

    it('a container without the tool\'s label is named as not the tool\'s', async () => {
      await fresh();
      container('running', 'x=1');
      const pg = await hold(port);
      try {
        const l = lines(run(['status']));
        assert.match(l[0], /^container: running, not the tool's \(no label\)$/);
        assert.match(l[2], /^ready: no\b/);
        assert.match(l[1], /held by another listener$/);
      } finally { pg.close(); }
    });

    it('a running container of the tool\'s that does not publish the URL\'s host and port, with a stub holding the port, reads as another listener', async () => {
      await fresh();
      container('running', LABEL, `127.0.0.1:${port + 7}`);
      const pg = await hold(port);
      try {
        const l = lines(run(['status']));
        assert.match(l[0], /^container: running \(the tool's\)$/);
        assert.match(l[1], new RegExp(`^listener: 127\\.0\\.0\\.1:${port} held by another listener$`));
      } finally { pg.close(); }
    });

    it('a stub holding the port with no container reads as another listener', async () => {
      await fresh();
      const server = net.createServer((c) => c.end());
      await new Promise((resolve) => server.listen(port, '127.0.0.1', resolve));
      try {
        const l = lines(run(['status']));
        assert.match(l[1], new RegExp(`^listener: 127\\.0\\.0\\.1:${port} held by another listener$`));
      } finally { server.close(); }
    });

    it('a redis that needs AUTH is answered with REDISPASSWORD sent, not by a bare PING', async () => {
      await fresh();
      container('running');
      fs.appendFileSync(path.join(root, 'website', '.env.local'), 'REDISPASSWORD=secret-redis\n');
      const redis = await pongServer(port + 1, 'auth');
      try {
        assert.match(lines(run(['status']))[4], /^redis: 127\.0\.0\.1:\d+ answered PING$/);
      } finally { redis.kill(); }
    });

    it('a redis that replies with an error is named as an error, not as no answer and not as ready', async () => {
      await fresh();
      const redis = await pongServer(port + 1, 'error');
      try {
        assert.match(lines(run(['status']))[4], /^redis: 127\.0\.0\.1:\d+ replied with an error to PING$/);
      } finally { redis.kill(); }
    });

    it('a REDISHOST that is not loopback is not contacted and is named', async () => {
      await fresh();
      fs.appendFileSync(path.join(root, 'website', '.env.local'), 'REDISHOST=10.9.9.9\nREDISPASSWORD=secret-redis\n');
      const r = run(['status']);
      assert.match(lines(r)[4], /^redis: 10\.9\.9\.9:\d+ not checked \(REDISHOST is not loopback\)$/);
    });

    it('missing REDISHOST or REDISPORT is named, not reported ready', async () => {
      await fresh();
      fs.writeFileSync(path.join(root, 'website', '.env.local'), `DATABASE_URL="${url('127.0.0.1', port)}"\n`);
      assert.match(lines(run(['status']))[4], /^redis: not configured/);
    });

    it('a redis that does not answer is named, not reported ready', async () => {
      await fresh();
      const l = lines(run(['status']));
      assert.match(l[4], /^redis: 127\.0\.0\.1:\d+ no answer to PING$/);
    });
  });

  describe('AC-9.4 down', () => {
    it('stops and removes the tool\'s container, keeps the image, and status then reports no container and a free port', async () => {
      await fresh();
      container('running');
      const r = run(['down']);
      assert.strictEqual(r.status, 0, r.out);
      assert.deepStrictEqual(mutating(), ['rm']);
      assert.strictEqual(docker().some((l) => /^rmi\b|image rm/.test(l)), false);
      const s = run(['status']).stdout.split('\n');
      assert.match(s[0], /^container: no container/);
      assert.match(s[1], /free$/);
    });

    it('refuses to remove a same-named container it did not label, with exit 2', async () => {
      await fresh();
      container('running', 'x=1');
      const r = run(['down']);
      assert.strictEqual(r.status, 2);
      assert.deepStrictEqual(mutating(), []);
      assert.strictEqual(fs.existsSync(path.join(root, 'state', 'exists')), true);
    });

    it('with no container, reports that and exits 0 without a removal', async () => {
      await fresh();
      const r = run(['down']);
      assert.strictEqual(r.status, 0);
      assert.match(r.stdout, /no container named hooks-postgres-local/);
      assert.deepStrictEqual(mutating(), []);
    });
  });

  describe('AC-9.5 / CR-6, CR-7', () => {
    it('a docker run that creates the container and then fails leaves none behind and says so', async () => {
      await fresh();
      const r = run(['up'], { STUB_RUN_CREATES_THEN_FAILS: '1' });
      assert.strictEqual(r.status, 1);
      assert.strictEqual(fs.existsSync(path.join(root, 'state', 'exists')), false, 'the stub still lists the container');
      assert.match(r.out, /removed the container this call created/);
    });

    it('a docker run that creates the container and then fails removes it by the label value unique to the call, never by the name', async () => {
      await fresh();
      const r = run(['up'], { STUB_RUN_CREATES_THEN_FAILS: '1' });
      assert.strictEqual(r.status, 1);
      const value = (lines) => lines.map((l) => (l.match(/hooks\.uat-local-stack\.call=(\S+)/) || [])[1]).filter(Boolean);
      const given = value(docker().filter((l) => l.startsWith('run ')));
      assert.strictEqual(given.length, 1, 'run carries one per-call label');
      const looked = value(docker().filter((l) => l.startsWith('ps ')));
      assert.ok(looked.length >= 1 && looked.every((v) => v === given[0]), 'every lookup filters on the value run was given');
      assert.deepStrictEqual(docker().filter((l) => l.startsWith('rm ')), ['rm -f stubcontainerid']);
      assert.doesNotMatch(r.out, /not created by this call/);
      await fresh();
      run(['up'], { STUB_RUN_CREATES_THEN_FAILS: '1' });
      assert.notStrictEqual(given[0], value(docker().filter((l) => l.startsWith('run ')))[0], 'two calls share a per-call value');
    });

    it('a same-named, tool-labelled container another session created in the gap is left as found, and the call fails naming it', async () => {
      await fresh();
      const r = run(['up'], { STUB_RUN_CLASH: '1' });
      assert.strictEqual(r.status, 1, r.out);
      assert.deepStrictEqual(mutating(), ['run']);
      assert.strictEqual(fs.existsSync(path.join(root, 'state', 'exists')), true, 'the other session\'s container was removed');
      assert.match(r.out, new RegExp(`${NAME}.*not created by this call`));
      assert.doesNotMatch(r.out, /removed the container/);
      assert.strictEqual(r.out.split('\n').filter((l) => l.includes(NAME)).length, 1, 'the container is named once');
    });

    it('a docker run that succeeds and prints no id is found by the call\'s label, and removed when the push fails', async () => {
      await fresh();
      const r = run(['up'], { STUB_RUN_PRINTS_NOTHING: '1', STUB_PRISMA_EXIT: '1' });
      assert.notStrictEqual(r.status, 0);
      assert.deepStrictEqual(docker().filter((l) => l.startsWith('rm ')), ['rm -f stubcontainerid']);
      assert.strictEqual(fs.existsSync(path.join(root, 'state', 'exists')), false);
    });

    it('text on the failed docker run\'s stdout that is not an id identifies nothing: another session\'s container is left as found', async () => {
      await fresh();
      const r = run(['up'], { STUB_RUN_CLASH: '1', STUB_RUN_JUNK_STDOUT: '1' });
      assert.strictEqual(r.status, 1, r.out);
      assert.deepStrictEqual(mutating(), ['run']);
      assert.strictEqual(fs.existsSync(path.join(root, 'state', 'exists')), true);
    });

    it('a removal docker refuses is not reported as done and not blamed on the label, and the container is still there', async () => {
      await fresh();
      const r = run(['up'], { STUB_RUN_CREATES_THEN_FAILS: '1', STUB_RM_FAILS: '1' });
      assert.strictEqual(r.status, 1);
      assert.doesNotMatch(r.out, /removed the container|not removed|left as found/);
      assert.strictEqual(fs.existsSync(path.join(root, 'state', 'exists')), true);
    });

    it('a lookup line that is not a container id is never handed to docker rm', async () => {
      await fresh();
      const r = run(['up'], { STUB_RUN_CREATES_THEN_FAILS: '1', STUB_PS_JUNK: '1' });
      assert.strictEqual(r.status, 1);
      assert.deepStrictEqual(docker().filter((l) => l.startsWith('rm ')), ['rm -f stubcontainerid']);
    });

    it('a docker run that fails before creating anything reports no removal and removes nothing', async () => {
      await fresh();
      const r = run(['up'], { STUB_RUN_FAILS: '1' });
      assert.strictEqual(r.status, 1);
      assert.match(r.out, /docker run failed/);
      assert.doesNotMatch(r.out, /removed the container|not removed|left as found|not created by this call/);
      assert.deepStrictEqual(mutating().filter((v) => v === 'rm'), []);
    });

    for (const [signal, code] of [['SIGTERM', 143], ['SIGINT', 130], ['SIGHUP', 129]]) {
      it(`a ${signal} while docker run is in flight removes the container that call created, and says so`, async () => {
        await fresh();
        const r = await interrupted(['up'], { STUB_RUN_HOLDS: '1' }, signal, 'run.created', 'run.go');
        assert.strictEqual(r.status, code, r.out);
        assert.strictEqual(fs.existsSync(path.join(root, 'state', 'exists')), false, 'the container the call created is left behind');
        assert.match(r.out, /removed the container this call created/);
        assert.deepStrictEqual(docker().filter((l) => l.startsWith('rm ')), ['rm -f stubcontainerid']);
      });

      it(`a ${signal} while docker start is in flight stops the container that call started, and says so`, async () => {
        await fresh();
        container('exited');
        const r = await interrupted(['up'], { STUB_START_HOLDS: '1' }, signal, 'start.began', 'start.go');
        assert.strictEqual(r.status, code, r.out);
        assert.strictEqual(stateOf('state').trim(), 'exited', 'the container the call started is left running');
        assert.match(r.out, /stopped the container this call started/);
        assert.deepStrictEqual(mutating(), ['start', 'stop']);
      });
    }

    it('the poison docker on the children\'s PATH fires when the override is ignored, so the guard is observed to work', async () => {
      await fresh();
      run(['status'], { ULS_DOCKER: '' });
      assert.strictEqual(fs.existsSync(marker()), true, 'a bare docker did not reach the poison stub');
      fs.rmSync(marker());
    });
  });

  describe('AC-9.1 prints no credential', () => {
    it('across every verb, success and failure path, no output carries the password (either form) or the URL, and the fixture file does', async () => {
      await fresh();
      const file = fs.readFileSync(path.join(root, 'website', '.env.local'), 'utf8');
      const fileHits = (file.match(new RegExp(PASSWORD_ENCODED.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
      assert.ok(fileHits >= 1, 'positive control: the fixture holds the password');
      outputs.length = 0;
      const urlWhole = url('127.0.0.1', port);
      for (const args of [['up'], ['up', '--seed'], ['status'], ['down'], ['up'], ['status'], ['down']]) run(args);
      run(['up'], { STUB_PRISMA_EXIT: '1' });
      run(['up'], { STUB_NOT_READY: '1' });
      run(['down']);
      container('running', 'x=1');
      run(['up']);
      run(['down']);
      const all = outputs.join('\n');
      const count = (needle) => all.split(needle).length - 1;
      assert.strictEqual(count(PASSWORD), 0);
      assert.strictEqual(count(PASSWORD_ENCODED), 0);
      assert.strictEqual(count(urlWhole), 0);
      assert.strictEqual(count('postgresql://'), 0);
      assert.ok(docker().some((l) => l.startsWith('run ')) && prisma().length >= 1, 'the verbs ran');
      assert.match(all, /tables: 7/);
    });
  });

  describe('AC-9.1 prints no credential: each failure path of up', () => {
    const paths = [
      ['a non-loopback host', () => url('db.example.com', 5432), ['up'], {}, 2],
      ['a LAN host', () => url('10.0.0.5', 5432), ['up'], {}, 2],
      ['an unparsable URL', () => `postgresql://hooksuser:${PASSWORD_ENCODED}@[::1:${port}/railway`, ['up'], {}, 2],
      ['a URL with no scheme', () => `hooksuser:${PASSWORD_ENCODED}@127.0.0.1:${port}/railway`, ['status'], {}, 2],
      ['a docker run that fails', () => url('127.0.0.1', port), ['up'], { STUB_RUN_FAILS: '1' }, 1],
      ['a docker run that creates and then fails', () => url('127.0.0.1', port), ['up'], { STUB_RUN_CREATES_THEN_FAILS: '1' }, 1],
      ['a docker run that meets another session\'s container', () => url('127.0.0.1', port), ['up'], { STUB_RUN_CLASH: '1' }, 1],
      ['a schema push that fails', () => url('127.0.0.1', port), ['up'], { STUB_PRISMA_EXIT: '1' }, 1],
      ['a seed that fails', () => url('127.0.0.1', port), ['up', '--seed'], { STUB_SEED_FAILS: '1' }, 1],
      ['a container that never becomes ready', () => url('127.0.0.1', port), ['up'], { STUB_NOT_READY: '1' }, 1],
      ['an empty table count', () => url('127.0.0.1', port), ['up'], { STUB_TABLES_EMPTY: '1' }, 1],
    ];
    for (const [label, makeUrl, args, extra, code] of paths) {
      it(`${label}: exit ${code} and no output carries the password (either form), the URL's userinfo or a postgresql:// URL`, async () => {
        await fresh();
        envFile(makeUrl());
        const fixture = fs.readFileSync(path.join(root, 'website', '.env.local'), 'utf8');
        assert.ok(fixture.includes(PASSWORD_ENCODED), 'positive control: the fixture holds the password');
        const r = run(args, extra);
        assert.strictEqual(r.status, code, r.out);
        for (const needle of [PASSWORD, PASSWORD_ENCODED, 'hooksuser:', 'postgresql://']) assert.strictEqual(r.out.split(needle).length - 1, 0, `output carries ${needle.slice(0, 6)}…`);
      });
    }
  });

  describe('AC-8.8 / D-16 stubs are found whatever the temp path holds', () => {
    it('with the fixture under a folder named with a colon, every docker and prisma the verbs run is the fixture stub', async () => {
      const parent = fs.mkdtempSync(path.join(os.tmpdir(), 'uls-colon-'));
      const saved = { root, bin };
      try {
        const colon = path.join(parent, 'a:b');
        fs.mkdirSync(colon);
        root = setup(colon);
        bin = path.join(root, 'bin');
        assert.ok(root.includes(':'), 'positive control: the fixture path holds a colon');
        await fresh();
        const status = run(['status']);
        const up = run(['up']);
        assert.ok(docker().length > 0, 'the stub docker was called');
        assert.strictEqual(status.status, 0, status.out);
        assert.strictEqual(up.status, 0, up.out);
        assert.ok(dockerVerbs().includes('inspect') && dockerVerbs().includes('run'), `stub docker saw ${dockerVerbs().join(',')}`);
        assert.ok(prisma().some((l) => l.startsWith('db push')), 'the stub prisma was called');
      } finally {
        ({ root, bin } = saved);
        fs.rmSync(parent, { recursive: true, force: true });
      }
    });
  });
});
