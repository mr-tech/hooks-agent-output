import {
  beforeEach, describe, expect, it, vi,
} from 'vitest';

// Attack harness: the real getFromUrl, authorizeGuildAdmin, redis cache layer (fetchChannel, fetchGuild,
// fetchUserGuilds, fetchAccountFromSession, getFromCache) and hasDiscordPermissions. Faked only at the
// network edges: Redis (an in-memory map), Postgres (the account row), Discord's bot API and the user's
// /users/@me/guilds. Oracle per case: the outcome, whether any message content is in it, and whether the
// fake Discord ever received a message request.
const h = vi.hoisted(() => ({
  store: new Map<string, string>(),
  apiCalls: [] as string[],
  token: 'sess-admin' as string | undefined,
}));

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'x', DISCORD_URL: 'https://fake.discord/api/v10', DISCORD_BOT_TOKEN: 'x' } }));
vi.mock('~/server/auth', () => ({ getServerAuthSession: vi.fn(), getHydratedServerAuthSession: vi.fn() }));
vi.mock('~/utils/redis/messageStore', () => ({ default: {} }));
vi.mock('~/utils/getServerSideSessionCookie', () => ({ default: async () => h.token }));
vi.mock('project-utils', () => {
  const chain: Record<string, unknown> = {};
  const p: any = new Proxy(chain, {
    get: (_t, k) => (k === 'executeTakeFirst'
      ? async () => {
        if (h.token === 'sess-admin') return { userId: 1, access_token: 'tok-admin', providerAccountId: 'u-admin' };
        if (h.token === 'sess-member') return { userId: 2, access_token: 'tok-member', providerAccountId: 'u-member' };
        return undefined;
      }
      : () => p),
  });
  return { getPostgres: () => p };
});
vi.mock('~/utils/redis/client', () => {
  const client = {
    get: async (k: string) => h.store.get(k) ?? null,
    set: async (k: string, v: unknown, ..._rest: unknown[]) => {
      if (_rest.includes('NX') && h.store.has(k)) return null;
      h.store.set(k, String(v)); return 'OK';
    },
    del: async (k: string) => { h.store.delete(k); return 1; },
    publish: async () => 0,
    pipeline: () => ({ del() { return this; }, exec: async () => [] }),
  };
  const sub = { subscribe: async () => undefined, on: () => undefined };
  return { getClient: () => client, getSubscriber: () => sub };
});

const A = '100000000000000001';
const B = '200000000000000002';
const CHANNELS: Record<string, { status: number, data?: Record<string, unknown> }> = {
  301: { status: 200, data: { id: '301', type: 0, guild_id: A } },
  302: { status: 200, data: { id: '302', type: 0, guild_id: B } },
  303: { status: 200, data: { id: '303', type: 11, guild_id: A, parent_id: '301' } },
  304: { status: 200, data: { id: '304', type: 11, guild_id: B, parent_id: '302' } },
  305: { status: 200, data: { id: '305', type: 1 } },
  306: { status: 200, data: { id: '306', type: 3 } },
  307: { status: 200, data: { id: '307', type: 0, guild_id: null } },
  308: { status: 200, data: { id: '308', type: 0, guild_id: Number(B) } },
  309: { status: 403 },
  310: { status: 404 },
};
vi.mock('~/utils/discord', () => ({
  getApi: () => ({
    request: async (_m: string, path: string) => {
      h.apiCalls.push(path);
      const g = /^\/guilds\/(\d+)$/.exec(path);
      if (g) return (g[1] === A || g[1] === B) ? { status: 200, data: { id: g[1], name: 'g', icon: null, roles: [], emojis: [] } } : { status: 404, data: {} };
      const msg = /^\/channels\/([^/]+)\/messages\/([^/]+)$/.exec(path);
      if (msg) return { status: 200, data: { id: msg[2], channel_id: msg[1], content: `SECRET-${msg[1]}`, author: { id: '9', username: 'x' }, embeds: [], components: [], attachments: [], flags: 0, type: 0 } };
      const ch = /^\/channels\/([^/]+)$/.exec(path);
      if (ch) return CHANNELS[ch[1]] ? { status: CHANNELS[ch[1]].status, data: CHANNELS[ch[1]].data ?? {} } : { status: 404, data: {} };
      return { status: 500, data: {} };
    },
  }),
}));

const USER_GUILDS: Record<string, unknown[]> = {
  'tok-admin': [
    { id: A, name: 'A', icon: null, owner: false, permissions: '8' },
    { id: B, name: 'B', icon: null, owner: false, permissions: '1024' },
  ],
  'tok-member': [
    { id: A, name: 'A', icon: null, owner: false, permissions: '32' },
  ],
};
vi.stubGlobal('fetch', async (_url: string, init: { headers: Record<string, string> }) => {
  const tok = init.headers.Authorization.replace('Bearer ', '');
  return { json: async () => USER_GUILDS[tok] ?? [] };
});

const { default: messageRouter } = await import('~/server/api/routers/message');
const caller = () => messageRouter.createCaller({ session: { user: { id: 'u', guilds: [] }, expires: 'never' }, req: {} as never, database: {} } as never);
async function attempt(url: string) {
  return caller().getFromUrl({ url }).then((value) => ({ value }), (error: any) => ({ error: { code: error?.code, message: error?.message } }));
}
const messageCalls = () => h.apiCalls.filter((p) => p.includes('/messages/'));

beforeEach(() => { h.store.clear(); h.apiCalls.length = 0; h.token = 'sess-admin'; });

describe('positive control', () => {
  it.each(['301', '303'])('admin of A reads a message in %s (a channel of A)', async (c) => {
    const r = await attempt(`https://discord.com/channels/${A}/${c}/5`);
    console.log('PROBE', c, JSON.stringify(r).slice(0, 120), 'messageCalls', messageCalls().length);
    expect(JSON.stringify(r)).toContain(`SECRET-${c}`);
  });
});

describe('attack: cross-guild and guildless channels via a link naming A', () => {
  it.each(['302', '304', '305', '306', '307', '308', '309', '310'])('channel %s', async (c) => {
    const r = await attempt(`https://discordapp.com/channels/${A}/${c}/5`);
    console.log('PROBE', c, JSON.stringify(r), 'messageCalls', messageCalls().length);
    expect(JSON.stringify(r)).not.toContain('SECRET');
    expect(messageCalls()).toHaveLength(0);
  });
});

describe('attack: the gate', () => {
  it('non-admin (Manage Server only) of A is refused before any channel lookup', async () => {
    h.token = 'sess-member';
    const r = await attempt(`https://discord.com/channels/${A}/301/5`);
    console.log('PROBE member', JSON.stringify(r), 'apiCalls', JSON.stringify(h.apiCalls));
    expect(JSON.stringify(r)).not.toContain('SECRET');
    expect(h.apiCalls.filter((p) => p.startsWith('/channels/'))).toHaveLength(0);
  });
  it('a link naming B (user is not admin of B) is refused', async () => {
    const r = await attempt(`https://discord.com/channels/${B}/302/5`);
    console.log('PROBE B-link', JSON.stringify(r), 'apiCalls', JSON.stringify(h.apiCalls));
    expect(JSON.stringify(r)).not.toContain('SECRET');
    expect(h.apiCalls.filter((p) => p.startsWith('/channels/'))).toHaveLength(0);
  });
  it('no session cookie is refused', async () => {
    h.token = undefined;
    const r = await attempt(`https://discord.com/channels/${A}/301/5`);
    console.log('PROBE no-cookie', JSON.stringify(r));
    expect(JSON.stringify(r)).not.toContain('SECRET');
  });
});

describe('attack: link shapes', () => {
  it.each([
    `https://discord.com/channels/${A}/302/5`,
    `https://discord.com/channels/${A}/301/5\n`,
    `https://discord.com/channels/${A}/301/5/`,
    `https://discord.com.evil.example/channels/${A}/301/5`,
    `https://discord.com@evil.example/channels/${A}/301/5`,
    `https://evil.example/https://discord.com/channels/${A}/301/5`,
    `https://DISCORD.com/channels/${A}/301/5`,
    `https://discord.com/channels/${A}/１/5`,
    `https://discord.com/channels/0${A}/301/5`,
    `https://discord.com/channels/${A}/301/5?x=1`,
    `https://discord.com/channels/${A}/301/5#x`,
    `https://media.discordapp.com/channels/${A}/301/5`,
  ])('%j', async (url) => {
    const r = await attempt(url);
    console.log('PROBE', JSON.stringify(url), JSON.stringify(r).slice(0, 140), 'messageCalls', messageCalls().length);
    expect(JSON.stringify(r)).not.toContain('SECRET');
  });
});

describe('attack: cache lock held for the channel key', () => {
  it('a held channel mutex times out to a refusal, never content', async () => {
    h.store.set('channel:302-mutex', '0');
    h.store.set('channel-302-mutex', '0');
    const keysBefore = [...h.store.keys()];
    const r = await attempt(`https://discord.com/channels/${A}/302/5`);
    console.log('PROBE mutex', JSON.stringify(r), 'keysBefore', JSON.stringify(keysBefore), 'messageCalls', messageCalls().length);
    expect(JSON.stringify(r)).not.toContain('SECRET');
    expect(messageCalls()).toHaveLength(0);
  }, 30000);
});
