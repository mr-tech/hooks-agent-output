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
        async exec() { log.clearedKeys.push(...keys); return []; },
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

beforeEach(() => {
  log.cache.clear();
  log.clearedKeys.length = 0;
  database = createCapturingDatabase(() => [{
    id: 'acc-1', access_token: 'live-access-token', refresh_token: 'rejected-refresh-token', providerAccountId: 'probe-discord', expires_at: 1,
  }]);
  log.db = database.db;
  log.fetch = vi.fn(async () => ({ ok: true, status: 200 }));
  vi.stubGlobal('fetch', log.fetch);
});

const accountsUpdates = () => database.queries.filter(({ sql }) => sql.startsWith('update "Accounts"'));

describe('sign-out of an account row that exists, by state of the account cache key', () => {
  it('control: cache miss -> revoke sent with the token, Accounts update issued, three keys cleared', async () => {
    await hydratedAuthOptions.events?.signOut?.({ session: SESSION } as never);
    console.log(`PROBE control fetchCalls=${log.fetch.mock.calls.length} accountsUpdates=${accountsUpdates().length} cleared=${JSON.stringify(log.clearedKeys)}`);
    expect(log.fetch).toHaveBeenCalledTimes(1);
    expect(accountsUpdates()).toHaveLength(1);
  });

  it('cached null (what fetchUserAccount stores when the refresh token is absent or Discord refuses the refresh) -> same clear-out expected', async () => {
    log.cache.set(ACCOUNT_KEY, 'null');
    await hydratedAuthOptions.events?.signOut?.({ session: SESSION } as never);
    console.log(`PROBE cached-null fetchCalls=${log.fetch.mock.calls.length} accountsUpdates=${accountsUpdates().length} dbQueries=${database.queries.length} cleared=${JSON.stringify(log.clearedKeys)}`);
    expect(log.fetch).toHaveBeenCalledTimes(1);
    expect(accountsUpdates()).toHaveLength(1);
  });

  it('producer: the session callback caches null for an account whose Discord refresh is refused', async () => {
    log.fetch = vi.fn(async () => ({ ok: false, status: 400, json: async () => ({ error: 'invalid_grant' }) }));
    vi.stubGlobal('fetch', log.fetch);
    const result = await hydratedAuthOptions.callbacks?.session?.({
      session: { user: {}, expires: '' }, user: { id: 'probe-user', preferences: {} }, token: {},
    } as never);
    console.log(`PROBE producer sessionResult=${JSON.stringify(result)} cachedValue=${JSON.stringify(log.cache.get(ACCOUNT_KEY))}`);
    expect(log.cache.get(ACCOUNT_KEY)).toBe('null');
  });
});
