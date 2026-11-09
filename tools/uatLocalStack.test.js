'use strict';

const assert = require('node:assert');
const fs = require('node:fs');
const net = require('node:net');
const os = require('node:os');
const path = require('node:path');
const { describe, it, before, after } = require('node:test');
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
    : > "$S/exists"; echo running > "$S/state"
    lbl=""; pub=""; prev=""
    for a in "$@"; do
      [ "$prev" = "--label" ] && lbl="$a"
      [ "$prev" = "-p" ] && pub="$a"
      prev="$a"
    done
    printf '%s' "$lbl" > "$S/label"
    printf '%s\\n' "\${pub%:*}" | sed 's/$//' > "$S/published"
    [ -n "\${STUB_RELABEL_AFTER_RUN:-}" ] && printf 'someone-else=1' > "$S/label"
    echo "stubcontainerid"
    ;;
  start)
    has exists || exit 1
    echo running > "$S/state"; echo "$NAME_ARG"
    ;;
  stop)
    has exists || exit 1
    echo exited > "$S/state"
    ;;
  rm)
    has exists || exit 1
    rm -f "$S/exists" "$S/state" "$S/label" "$S/published"
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

const free = () => new Promise((resolve) => {
  const s = net.createServer();
  s.listen(0, '127.0.0.1', () => { const { port } = s.address(); s.close(() => resolve(port)); });
});

describe('uat-local-stack.sh', () => {
  let root;
  let bin;
  let port;
  let outputs;
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
  const run = (args, extraEnv = {}) => {
    const r = spawnSync('bash', [SCRIPT, ...args], {
      cwd: path.join(root, 'website'),
      encoding: 'utf8',
      env: {
        PATH: `${bin}:/usr/bin:/bin`,
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
      },
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
  const pongServer = (p) => new Promise((resolve, reject) => {
    const code = `require('net').createServer((c) => c.on('data', (d) => { if (/PING/i.test(d.toString())) c.write('+PONG\\r\\n'); })).listen(${p}, '127.0.0.1', () => console.log('up'));`;
    const child = spawn(process.execPath, ['-e', code], { stdio: ['ignore', 'pipe', 'inherit'] });
    child.stdout.once('data', () => resolve(child));
    child.once('error', reject);
  });
  const dockerVerbs = () => docker().map((l) => l.split(' ')[0]);
  const mutating = () => dockerVerbs().filter((v) => ['run', 'start', 'stop', 'rm'].includes(v));

  before(async () => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'uls-'));
    bin = path.join(root, 'bin');
    for (const d of ['bin', 'state', 'tmp', 'website', path.join('project-utils', 'prisma'), 'record']) fs.mkdirSync(path.join(root, d), { recursive: true });
    for (const d of ['website', 'project-utils', 'record']) {
      execFileSync('git', ['init', '-q'], { cwd: path.join(root, d) });
      fs.writeFileSync(path.join(root, d, 'README'), 'fixture\n');
      execFileSync('git', ['-c', 'user.name=f', '-c', 'user.email=f@example.invalid', 'add', '-A'], { cwd: path.join(root, d) });
      execFileSync('git', ['-c', 'user.name=f', '-c', 'user.email=f@example.invalid', 'commit', '-q', '-m', 'fixture'], { cwd: path.join(root, d) });
    }
    fs.writeFileSync(path.join(root, 'project-utils', 'prisma', 'schema.prisma'), 'datasource db { provider = "postgresql" url = env("DATABASE_URL") }\n');
    fs.writeFileSync(path.join(root, 'seed.sql'), "insert into \"Users\" values ('synthetic');\n");
    sh(path.join(bin, 'docker'), DOCKER_STUB.replace('echo "$NAME_ARG"', `echo ${NAME}`));
    sh(path.join(bin, 'prisma'), PRISMA_STUB);
    outputs = [];
  });

  after(() => { fs.rmSync(root, { recursive: true, force: true }); });

  const fresh = async (databaseUrl) => {
    port = await free();
    for (const f of fs.readdirSync(path.join(root, 'state'))) fs.rmSync(path.join(root, 'state', f));
    envFile(databaseUrl === undefined ? url('127.0.0.1', port) : databaseUrl);
  };
  const freshAt = async (host) => { port = await free(); for (const f of fs.readdirSync(path.join(root, 'state'))) fs.rmSync(path.join(root, 'state', f)); envFile(url(host, port)); };

  describe('arguments', () => {
    for (const args of [[], ['bogus'], ['up', '--bogus'], ['down', '--seed'], ['status', 'extra'], ['up', 'up']]) {
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

    it('refuses a DATABASE_URL that cannot be parsed without echoing any part of it', async () => {
      await fresh('not a url at all %%junk-fragment-4417');
      const r = run(['up']);
      assert.strictEqual(r.status, 2);
      assert.strictEqual((r.out.match(/junk-fragment-4417/g) || []).length, 0);
      assert.deepStrictEqual(docker(), []);
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

    it('cleanup removes only a container still carrying the label: one relabelled after run is left, and the call says so', async () => {
      await fresh();
      const r = run(['up'], { STUB_PRISMA_EXIT: '1', STUB_RELABEL_AFTER_RUN: '1' });
      assert.notStrictEqual(r.status, 0);
      assert.deepStrictEqual(mutating(), ['run']);
      assert.strictEqual(fs.existsSync(path.join(root, 'state', 'exists')), true);
      assert.match(r.out, /not removed: it no longer carries the tool's label/);
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
        assert.ok(docker().some((x) => /^exec .*pg_isready/.test(x)));
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

    it('a stub holding the port with no container reads as another listener', async () => {
      await fresh();
      const server = net.createServer((c) => c.end());
      await new Promise((resolve) => server.listen(port, '127.0.0.1', resolve));
      try {
        const l = lines(run(['status']));
        assert.match(l[1], new RegExp(`^listener: 127\\.0\\.0\\.1:${port} held by another listener$`));
      } finally { server.close(); }
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
});
