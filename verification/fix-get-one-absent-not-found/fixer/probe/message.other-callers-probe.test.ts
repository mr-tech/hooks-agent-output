import { createRequire } from 'node:module';
import {
  beforeEach, describe, expect, it, vi,
} from 'vitest';

import createCapturingDatabase from '../../utils/__tests__/helpers/capturingDatabase';
import messageRouter from '../message';

import type * as KyselyBuild from 'kysely';

const mocks = vi.hoisted(() => ({
  db: undefined as unknown,
  account: null as null | { userId: string, access_token: string, providerAccountId: string },
  userGuilds: [] as { id: string }[],
  userGuildsFailure: null as null | Error,
  ownerCheckFails: false,
}));

vi.mock('~/env.mjs', () => ({
  env: new Proxy({}, { get: (_, key) => `test-${String(key)}` }),
}));
vi.mock('~/server/auth', () => ({
  getServerAuthSession: vi.fn(),
  getHydratedServerAuthSession: vi.fn(),
}));
vi.mock('project-utils', () => ({ getPostgres: () => mocks.db }));
vi.mock('pusher', () => ({ default: class { trigger = vi.fn(); } }));
vi.mock('@vercel/functions', () => ({ waitUntil: () => undefined }));
vi.mock('~/utils/redis', () => ({
  default: {
    fetchAccountFromSession: async () => mocks.account,
    fetchUserGuilds: async () => {
      if (mocks.userGuildsFailure) throw mocks.userGuildsFailure;
      return mocks.userGuilds;
    },
  },
}));
vi.mock('~/utils/redis/messageStore', () => ({ default: {} }));

const OWNER = { discordId: '100000000000000001', dbUserId: '900000000000001' };
const OTHER = { discordId: '100000000000000002', dbUserId: '900000000000002' };
const GUILD = { discordId: '300000000000000001', rowId: '700000000000001' };

const PERSONAL_ID = '900000000000101';
const GUILD_MESSAGE_ID = '900000000000201';
const ABSENT_ID = '900000000000500';

const SECRET = 'owner-only-content';
const NOT_FOUND_TEXT = 'This message doesn\'t exist, or you don\'t have access to it.';

const rows: Record<string, { fk_users_id: string | null, guildId: string | null }> = {
  [PERSONAL_ID]: { fk_users_id: OWNER.dbUserId, guildId: null },
  [GUILD_MESSAGE_ID]: { fk_users_id: null, guildId: GUILD.discordId },
};

function respond({ sql, parameters }: KyselyBuild.CompiledQuery): unknown[] {
  if (sql.startsWith('select "userId" from "Accounts"')) {
    const account = [OWNER, OTHER].find(({ discordId }) => parameters.includes(discordId));
    return account ? [{ userId: account.dbUserId }] : [];
  }
  if (sql.includes('left join "ScheduledMessages"')) {
    const id = String(parameters[0]);
    const row = rows[id];
    return row ? [{
      id,
      createdAt: new Date(0),
      updatedAt: new Date(0),
      name: 'owner-name',
      data: { content: SECRET },
      previewImageNonce: null,
      recentWebhookId: null,
      recentThreadId: null,
      recentMessageId: null,
      guildId: row.guildId,
      scheduledMessageId: null,
      scheduledMessageCron: null,
      scheduledMessageError: null,
      scheduledMessageSendAt: null,
      scheduledMessageSent: null,
    }] : [];
  }
  if (sql.startsWith('select "fk_users_id" from "Messages"')) {
    if (mocks.ownerCheckFails) throw new Error('Connection terminated unexpectedly');
    return parameters.flatMap((value) => {
      const row = rows[String(value)];
      return row ? [{ fk_users_id: row.fk_users_id }] : [];
    });
  }
  return [];
}

function callerAs(user: { discordId: string }) {
  return messageRouter.createCaller({
    session: { user: { id: user.discordId, guilds: [] }, expires: 'never' },
    req: { headers: { cookie: '__Secure-next-auth.session-token=session-token' } },
  } as never);
}

const outcomeOf = (promise: Promise<unknown>) => promise.then(
  (value) => ({ value }),
  (error: { code?: unknown, message?: unknown }) => ({ error: { code: error.code, message: error.message } }),
);

beforeEach(() => {
  mocks.account = { userId: OTHER.dbUserId, access_token: 'access-token', providerAccountId: OTHER.discordId };
  mocks.userGuilds = [];
  mocks.userGuildsFailure = null;
  mocks.ownerCheckFails = false;
  mocks.db = createCapturingDatabase(respond).db;
});

const RECENT = {
  id: ABSENT_ID, recentWebhookId: '400000000000000001', recentThreadId: null, recentMessageId: '500000000000000001',
};

describe('message.updateRecentMessageData for a number no message holds', () => {
  it('answers a server error with the text no result, over the ESM kysely build', async () => {
    const outcome = await outcomeOf(callerAs(OTHER).updateRecentMessageData(RECENT));

    expect(outcome).toEqual({ error: { code: 'INTERNAL_SERVER_ERROR', message: 'no result' } });
  });

  it('answers a server error with the text no result, over the CommonJS kysely build', async () => {
    const commonJsKysely = createRequire(import.meta.url)('kysely') as typeof KyselyBuild;
    mocks.db = createCapturingDatabase(respond, commonJsKysely).db;

    const outcome = await outcomeOf(callerAs(OTHER).updateRecentMessageData(RECENT));

    expect(outcome).toEqual({ error: { code: 'INTERNAL_SERVER_ERROR', message: 'no result' } });
  });
});
