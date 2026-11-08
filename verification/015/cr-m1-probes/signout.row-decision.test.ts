import {
  beforeEach, describe, expect, it, vi,
} from 'vitest';

import createCapturingDatabase from '../server/api/utils/__tests__/helpers/capturingDatabase';

import type { Mock } from 'vitest';

import { hydratedAuthOptions } from '~/server/auth';

const log = vi.hoisted(() => ({
  db: undefined as unknown,
  cache: new Map<string, string>(),
  clearedKeys: [] as string[],
  fetch: undefined as unknown as Mock,
  redisDown: false,
}));

vi.mock('~/env.mjs', () => ({
  env: new Proxy({}, { get: (_, key) => `test-${String(key)}` }),
}));
vi.mock('project-utils', async () => {
  const { default: create } = await import('../server/api/utils/__tests__/helpers/capturingDatabase');
  log.db = create().db;
  return { getPostgres: () => log.db };
});
vi.mock('~/utils/redis/client', () => {
  const client = {
    get: async (key: string) => log.cache.get(key) ?? null,
    set: async (key: string, value: string) => { log.cache.set(key, value); return 'OK'; },
    del: async () => 1,
    publish: async () => 0,
    pipeline: () => {
      const keys: string[] = [];
      const pipeline = {
        del(key: string) { keys.push(key); return pipeline; },
        async exec() { if (log.redisDown) throw new Error('redis down'); log.clearedKeys.push(...keys); return []; },
      };
      return pipeline;
    },
  };
  return {
    getClient: () => client,
    getSubscriber: () => ({ subscribe: async () => {}, on: () => {} }),
  };
});

let database: ReturnType<typeof createCapturingDatabase>;
const SESSION = { sessionToken: 'probe-session', userId: 'probe-user' };
const ACCOUNT_KEY = 'user-access-token-probe-user';
type Row = Record<string, unknown> | 'absent' | 'error';
let row: Row;
const unhandled: unknown[] = [];
process.on('unhandledRejection', (e) => { unhandled.push(e); });

function useRow(r: Row) {
  row = r;
  database = createCapturingDatabase((q) => {
    if (q.sql.startsWith('select') && q.sql.includes('"Accounts"')) {
      if (row === 'error') throw new Error('postgres unreachable');
      if (row === 'absent') return [];
      return [row];
    }
    return [];
  });
  log.db = database.db;
}

beforeEach(() => {
  log.cache.clear();
  log.clearedKeys.length = 0;
  log.redisDown = false;
  unhandled.length = 0;
  useRow({ access_token: 'row-token', providerAccountId: 'probe-discord' });
  log.fetch = vi.fn(async () => ({ ok: true, status: 200 }));
  vi.stubGlobal('fetch', log.fetch);
});

const accountsUpdates = () => database.queries.filter(({ sql }) => sql.startsWith('update "Accounts"'));
const revokeTokens = () => log.fetch.mock.calls.map((c) => String((c[1] as { body: URLSearchParams }).body.get('token')));
async function signOut() {
  return Promise.resolve(hydratedAuthOptions.events?.signOut?.({ session: SESSION } as never)).then(() => 'resolved', (e: Error) => `rejected:${e.message}`);
}
function report(name: string, outcome: string) {
  console.log(`PROBE ${name} outcome=${outcome} revokeTokens=${JSON.stringify(revokeTokens())} accountsUpdates=${accountsUpdates().length} updateParams=${JSON.stringify(accountsUpdates().map((q) => q.parameters))} cleared=${JSON.stringify(log.clearedKeys)} unhandled=${unhandled.length}`);
}

describe('sign-out decides from the Accounts row, whatever the account cache key holds', () => {
  it.each([
    ['miss', undefined],
    ['cached null', 'null'],
    ['cached stale account', JSON.stringify({ access_token: 'stale-cached-token', providerAccountId: 'other-discord' })],
  ])('row with token, cache %s: revoke carries the row token, one update, three keys', async (name, cached) => {
    if (cached !== undefined) log.cache.set(ACCOUNT_KEY, cached);
    const outcome = await signOut();
    report(`row-token/${name}`, outcome);
    expect(outcome).toBe('resolved');
    expect(revokeTokens()).toEqual(['row-token']);
    expect(accountsUpdates()).toHaveLength(1);
    expect(log.clearedKeys).toEqual(['user-access-token-probe-user', 'user-session-token-probe-session', 'user-guilds-probe-discord']);
  });

  it('row with no token, cache holds a token: no revoke, one update, three keys', async () => {
    useRow({ access_token: null, providerAccountId: 'probe-discord' });
    log.cache.set(ACCOUNT_KEY, JSON.stringify({ access_token: 'stale-cached-token', providerAccountId: 'probe-discord' }));
    const outcome = await signOut();
    report('row-no-token', outcome);
    expect(revokeTokens()).toEqual([]);
    expect(accountsUpdates()).toHaveLength(1);
  });

  it('row absent, cache holds an account: no revoke, no update, two keys', async () => {
    useRow('absent');
    log.cache.set(ACCOUNT_KEY, JSON.stringify({ access_token: 'stale-cached-token', providerAccountId: 'probe-discord' }));
    const outcome = await signOut();
    report('row-absent', outcome);
    expect(revokeTokens()).toEqual([]);
    expect(accountsUpdates()).toHaveLength(0);
    expect(log.clearedKeys).toEqual(['user-access-token-probe-user', 'user-session-token-probe-session']);
  });

  it.each([['revoke rejects', 'reject'], ['revoke 500', '500']])('%s: clear-out still runs', async (name, mode) => {
    log.fetch = vi.fn(async () => { if (mode === 'reject') throw new Error('network'); return { ok: false, status: 500 }; });
    vi.stubGlobal('fetch', log.fetch);
    const outcome = await signOut();
    report(`revoke/${name}`, outcome);
    expect(outcome).toBe('resolved');
    expect(accountsUpdates()).toHaveLength(1);
    expect(log.clearedKeys).toHaveLength(3);
  });

  it('lookup error: two keys cleared, then the lookup error reaches the caller', async () => {
    useRow('error');
    const outcome = await signOut();
    report('lookup-error', outcome);
    expect(outcome).toBe('rejected:postgres unreachable');
    expect(log.clearedKeys).toEqual(['user-access-token-probe-user', 'user-session-token-probe-session']);
    expect(accountsUpdates()).toHaveLength(0);
  });

  it('lookup error and redis down: the lookup error, not redis, and nothing unhandled', async () => {
    useRow('error');
    log.redisDown = true;
    const outcome = await signOut();
    await new Promise((r) => { setTimeout(r, 20); });
    report('lookup-error+redis-down', outcome);
    expect(outcome).toBe('rejected:postgres unreachable');
    expect(unhandled).toHaveLength(0);
  });
});
