import { writeFileSync } from 'node:fs';

import { it, vi } from 'vitest';

import createCapturingDatabase from './helpers/capturingDatabase';

import { getPartialMessages, getUserRecentMessages } from '~/server/api/utils/shared';

const holder = vi.hoisted(() => ({ db: undefined as unknown }));
vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('project-utils', () => ({ getPostgres: () => holder.db }));

it('dumps the compiled queries', async () => {
  const captured = createCapturingDatabase(() => []);
  holder.db = captured.db;
  await getUserRecentMessages(['900000000000001', '900000000000002'], 'u1');
  await getPartialMessages('u1', [{ id: 'g1' } as UserGuild, { id: 'g2' } as UserGuild]);
  await getPartialMessages('u1', []);
  writeFileSync(process.env.SQL_DUMP_OUT as string, JSON.stringify(captured.queries.map(({ sql, parameters }) => ({ sql, parameters })), null, 1));
});
