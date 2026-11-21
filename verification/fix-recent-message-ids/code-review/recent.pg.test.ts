import { sql } from 'kysely';
import { getPostgres } from 'project-utils';
import {
  afterAll, beforeAll, describe, expect, it, vi,
} from 'vitest';

import { messageIdShape } from '~/server/api/utils/shapes';
import { hydratedAuthOptions } from '~/server/auth';

const mocks = vi.hoisted(() => ({
  fetchUserAccount: vi.fn(),
  fetchUserGuilds: vi.fn(),
  fetchGuild: vi.fn(async () => {}),
}));

vi.mock('~/env.mjs', () => ({
  env: new Proxy({}, { get: (_, key) => `test-${String(key)}` }),
}));
vi.mock('~/utils/redis', () => ({ default: mocks }));
vi.mock('~/utils/redis/client', () => ({ getClient: () => ({}) }));
vi.mock('~/utils/redis/messageStore', () => ({ default: {} }));

const A = { discordId: '100000000000000001', dbUserId: '900000000000001' };
const B = { discordId: '100000000000000002', dbUserId: '900000000000002' };
const GUILD_X = '300000000000000001';
const GUILD_Y = '300000000000000002';

const ID = {
  ownPersonal: '900000000000101',
  foreignPersonal: '900000000000102',
  administeredGuild: '900000000000103',
  foreignGuild: '900000000000104',
  absent: '900000000000199',
};
const NAMES = {
  ownPersonal: 'own-personal-name',
  foreignPersonal: 'foreign-personal-name',
  administeredGuild: 'administered-guild-name',
  foreignGuild: 'foreign-guild-name',
};

const db = () => getPostgres();

beforeAll(async () => {
  await sql`alter sequence "Guilds_id_seq" restart with 700000000000001`.execute(db());
  for (const user of [A, B]) {
    await sql`insert into "Users" (id) values (${user.dbUserId})`.execute(db());
    await sql`insert into "Accounts" ("userId", type, provider, "providerAccountId")
      values (${user.dbUserId}, 'oauth', 'discord', ${user.discordId})`.execute(db());
  }
  const { rows: guildRows } = await sql<{ id: string, guildId: string }>`
    insert into "Guilds" (provider, "guildId") values ('discord', ${GUILD_X}), ('discord', ${GUILD_Y})
    returning id::text, "guildId"`.execute(db());
  const rowOf = (discord: string) => guildRows.find((g) => g.guildId === discord)!.id;
  const plant = async (id: string, user: string | null, guild: string | null, name: string) => {
    await sql`insert into "Messages" (id, fk_users_id, fk_guilds_id, name, data, "updatedAt")
      values (${id}, ${user}, ${guild}, ${name}, ${JSON.stringify({ content: name })}::jsonb, now())`.execute(db());
  };
  await plant(ID.ownPersonal, A.dbUserId, null, NAMES.ownPersonal);
  await plant(ID.foreignPersonal, B.dbUserId, null, NAMES.foreignPersonal);
  await plant(ID.administeredGuild, null, rowOf(GUILD_X), NAMES.administeredGuild);
  await plant(ID.foreignGuild, null, rowOf(GUILD_Y), NAMES.foreignGuild);
});

afterAll(async () => { await db().destroy(); });

type Outcome = {
  threw: string | null,
  messageIds: string[],
  preferenceIds: unknown,
  leakedNames: string[],
};

async function hydrate(recentMessageIds: unknown[], guilds: string[] | 'no-token'): Promise<Outcome> {
  mocks.fetchUserAccount.mockResolvedValue({
    access_token: guilds === 'no-token' ? null : 'token',
    providerAccountId: A.discordId,
  });
  mocks.fetchUserGuilds.mockResolvedValue(guilds === 'no-token' ? [] : guilds.map((id) => ({
    id, name: 'G', icon: null, owner: true, permissions: '0',
  })));
  try {
    const session = await hydratedAuthOptions.callbacks!.session!({
      session: { user: {}, expires: '' },
      user: { id: A.dbUserId, preferences: { recentMessageIds } },
      token: {},
    } as never) as unknown as {
      hydration: { messages: { id: string }[] },
      user: { preferences: { recentMessageIds: unknown } },
    };
    const text = JSON.stringify(session);
    return {
      threw: null,
      messageIds: session.hydration.messages.map(({ id }) => id).sort(),
      preferenceIds: session.user.preferences.recentMessageIds,
      leakedNames: [NAMES.foreignPersonal, NAMES.foreignGuild].filter((n) => text.includes(n)),
    };
  } catch (error) {
    return {
      threw: String(error), messageIds: [], preferenceIds: null, leakedNames: [],
    };
  }
}

const ALL_ROWS = [ID.ownPersonal, ID.foreignPersonal, ID.administeredGuild, ID.foreignGuild, ID.absent];
const BAD = ['abc', '', '9223372036854775808', '-1', ' 900000000000101', '+900000000000101', 12, null, { id: ID.ownPersonal }];

const CASES: [string, unknown[], string[] | 'no-token'][] = [
  ['all rows, administers X', ALL_ROWS, [GUILD_X]],
  ['all rows, administers X and Y', ALL_ROWS, [GUILD_X, GUILD_Y]],
  ['all rows, administers nothing', ALL_ROWS, []],
  ['all rows, no access token', ALL_ROWS, 'no-token'],
  ['all rows, guild list holds Guilds.id values instead of Discord ids', ALL_ROWS, ['700000000000001', '700000000000002']],
  ...BAD.map((bad): [string, unknown[], string[]] => [`bad element ${JSON.stringify(bad)} beside all rows, administers X`, [bad, ...ALL_ROWS], [GUILD_X]]),
  ['every element bad', BAD, [GUILD_X]],
  ['leading-zero form of own personal id', [`0${ID.ownPersonal}`], [GUILD_X]],
];

const outcomes: Record<string, Outcome> = {};

describe('hydration against postgres', () => {
  it.each(CASES)('%s', async (label, ids, guilds) => {
    outcomes[label] = await hydrate(ids, guilds);
    expect(true).toBe(true);
  });

  it('writes the outcome table', async () => {
    const fs = await import('node:fs');
    fs.writeFileSync(process.env.PROBE_OUT!, `${JSON.stringify(outcomes, null, 2)}\n`);
  });
});

function randomCandidate(rand: () => number): string {
  const pick = <T>(xs: T[]) => xs[Math.floor(rand() * xs.length)];
  const len = Math.floor(rand() * 22);
  let digits = '';
  for (let i = 0; i < len; i += 1) digits += String(Math.floor(rand() * 10));
  const form = pick(['plain', 'plain', 'plain', 'zeros', 'sign', 'space', 'max', 'letter']);
  if (form === 'zeros') return `000${digits}`;
  if (form === 'sign') return `${pick(['-', '+'])}${digits}`;
  if (form === 'space') return ` ${digits} `;
  if (form === 'letter') return `${digits}x`;
  if (form === 'max') return String(9223372036854775807n - BigInt(Math.floor(rand() * 3)) + BigInt(Math.floor(rand() * 3)));
  return digits;
}

describe('messageIdShape against postgres int8', () => {
  it('records, over a seeded random corpus, every value the shape accepts that postgres refuses or reads differently', async () => {
    let seed = 20261121;
    const rand = () => {
      seed = (seed * 1103515245 + 12345) % 2147483648;
      return seed / 2147483648;
    };
    const corpus = Array.from({ length: 4000 }, () => randomCandidate(rand));
    const tally = {
      size: corpus.length, shapeAccepted: 0, pgAccepted: 0, shapeAcceptedPgRefused: [] as string[], valueMismatch: [] as string[], shapeRefusedPgAccepted: 0,
    };
    for (const value of corpus) {
      const shapeOk = messageIdShape.safeParse(value).success;
      let pg: string | null = null;
      try {
        const { rows } = await sql<{ v: string }>`select (${value}::int8)::text as v`.execute(db());
        pg = rows[0].v;
      } catch { pg = null; }
      if (shapeOk) tally.shapeAccepted += 1;
      if (pg !== null) tally.pgAccepted += 1;
      if (shapeOk && pg === null) tally.shapeAcceptedPgRefused.push(value);
      if (shapeOk && pg !== null && pg !== BigInt(value).toString()) tally.valueMismatch.push(value);
      if (!shapeOk && pg !== null) tally.shapeRefusedPgAccepted += 1;
    }
    const fs = await import('node:fs');
    fs.writeFileSync(process.env.CORPUS_OUT!, `${JSON.stringify(tally, null, 2)}\n`);
    expect(tally.shapeAccepted).toBeGreaterThan(100);
  });
});
