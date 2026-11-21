// id-oracle: drives the real single-message v1 handler over an enumerated and a seeded-random input space for the
// path id, and records, per input, the handler's status and the id it passed to the database lookup, beside an
// oracle derived from the domain, not from the handler: a message id is a non-negative integer written in ASCII
// decimal digits whose value fits a Postgres bigint (<= 9223372036854775807); the lookup key is that value in
// canonical decimal. Writes every row to $ORACLE_OUT (JSON). Copied into a `git archive` export at
// src/server/api/v1/__tests__/ to run; never committed to the website tree.
import { writeFileSync } from 'node:fs';
import {
  describe, expect, it, vi,
} from 'vitest';

import { makeRes } from '../../__tests__/helpers/apiResponse';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
const { getPostgres } = vi.hoisted(() => ({ getPostgres: vi.fn() }));
vi.mock('project-utils', () => ({ getPostgres }));

type Handler = (req: never, res: never) => Promise<unknown>;
const KEY = 'oracle-key';
const GUILD = '123456789012345678';
const BIGINT_MAX = 9223372036854775807n;

function oracle(id: string): { accept: boolean, lookup?: string } {
  if (id.length === 0) return { accept: false };
  for (const ch of id) if (ch < '0' || ch > '9') return { accept: false };
  const value = BigInt(id);
  return value <= BIGINT_MAX ? { accept: true, lookup: value.toString() } : { accept: false };
}

function inputs(): string[] {
  const set = new Set<string>([
    '', '0', '1', '7', '007', '123', '0000000000000000000', '00000000000000000001', '000000000000000000001',
    '9223372036854775806', '9223372036854775807', '9223372036854775808', '9999999999999999999', '10000000000000000000',
    '09223372036854775807', '18446744073709551615', '9007199254740993',
    '1e3', '1E3', '1.5', '1.', '.5', '-1', '-0', '+1', ' 1', '1 ', '\t1', '1\n', '\n1', '0x10', '0b1', '0o7', '1n',
    '1_000', '1,000', 'Infinity', '-Infinity', 'NaN', 'null', 'undefined', 'true', '[]', '١٢٣', '１２３', '1 ',
    '​1',
  ]);
  for (const ch of [' ', '\n', '\t', '+', '-', '.', 'e', 'x', '_', ',', ' ', '٣', '３', 'a', '/', '%']) {
    set.add(`${ch}123`); set.add(`1${ch}23`); set.add(`123${ch}`);
  }
  for (let len = 1; len <= 21; len += 1) { set.add('9'.repeat(len)); set.add(`1${'0'.repeat(len - 1)}`); }
  let seed = 20261121;
  const rand = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
  const alphabet = '0123456789 +-.eEx\n';
  for (let n = 0; n < 1500; n += 1) {
    const len = Math.floor(rand() * 23);
    let s = '';
    for (let i = 0; i < len; i += 1) s += alphabet[Math.floor(rand() * alphabet.length)];
    set.add(s);
  }
  for (let n = 0; n < 500; n += 1) {
    const len = 1 + Math.floor(rand() * 20);
    let s = '';
    for (let i = 0; i < len; i += 1) s += '0123456789'[Math.floor(rand() * 10)];
    set.add(s);
  }
  return [...set];
}

describe('single-message id oracle', () => {
  it('records the handler beside the domain oracle for every input', async () => {
    vi.stubEnv('STATBOT_API_KEY', KEY);
    const { default: handler } = await import('~/pages/api/v1/guilds/[guildId]/messages/[id]') as { default: Handler };
    const rows = [];
    for (const id of inputs()) {
      const where = vi.fn();
      const query = {
        selectFrom: () => query,
        leftJoin: () => query,
        select: () => query,
        where: (...args: unknown[]) => { where(...args); return query; },
        executeTakeFirst: async () => undefined,
      };
      getPostgres.mockReset();
      getPostgres.mockReturnValue(query);
      const res = makeRes();
      await handler({
        method: 'GET', query: { guildId: GUILD, id }, headers: { authorization: `Bearer ${KEY}` },
      } as never, res as never);
      const call = where.mock.calls.find((c) => c[0] === 'Messages.id');
      const want = oracle(id);
      const looked = call === undefined ? undefined : String(call[2]);
      const agree = want.accept
        ? res.statusCode === 404 && looked === want.lookup
        : res.statusCode === 400 && getPostgres.mock.calls.length === 0;
      rows.push({
        id, status: res.statusCode, dbRead: getPostgres.mock.calls.length > 0, looked, oracle: want, agree,
      });
    }
    vi.unstubAllEnvs();
    writeFileSync(process.env.ORACLE_OUT ?? 'oracle-out.json', JSON.stringify(rows, null, 1));
    expect(rows.length).toBeGreaterThan(0);
  });
});
