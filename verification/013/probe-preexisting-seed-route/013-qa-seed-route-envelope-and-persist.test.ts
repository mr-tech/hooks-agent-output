/**
 * QA probe extension (plan 013) — NOT an acceptance spec.
 *
 * Origin: `uat-hooks-013` (`agent-output/uat/013-...-uat.md`, `b6e9662`) reported, AT READ LEVEL,
 * two gaps in QA's `probe-preexisting-seed-route`:
 *   (i)  the probe asserts the boundary as `discordMessageShape`, but `message.upsert`'s real
 *        input is `z.object({ message: optionalIdMessageShape })` — one layer out. `name` and
 *        `guildId` were unexercised.
 *   (ii) the probe stops before the PERSIST leg. `buildMessageValues` writes `data: message.data`
 *        verbatim and computes `valid` alongside. That leg is what makes a minted record a
 *        MEMBER OF M8-G's CLASS AT REST, rather than merely a request the boundary accepted.
 *
 * This file EXECUTES both. It is the re-derivation of UAT's read; UAT's own document remains
 * labelled corroboration.
 *
 * Anchor: website @ c85945f (chain base == production), detached worktree /tmp/qa013-c85945f.
 * Captured at: agent-output/verification/013/probe-preexisting-seed-route/
 *
 * MODULE-SCOPE HAZARD ENUMERATION (QA definition: enumerate before executing a real entry point):
 *   - `~/env.mjs` validates env vars at module scope and throws in this box — mocked (F-QA9).
 *   - `~/server/api/utils/shared` imports `getPostgres` (project-utils) and `Pusher` at module
 *     scope but CALLS neither there; every call site is inside a function body (grep: lines
 *     106/120/133/155/177/238/277/292 at c85945f, all inside functions). The repo's own
 *     `012-upsert-valid.test.ts` imports this module with only `~/env.mjs` mocked — precedent
 *     read from the tree, not assumed.
 *   - No query is executed here: the only Kysely instance uses DummyDriver, and the run sets
 *     DATABASE_URL explicitly at a dead port so an accidental connection cannot reach the
 *     hosted database.
 */
import { describe, expect, it, vi } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

import {
  Kysely, DummyDriver, PostgresAdapter, PostgresIntrospector, PostgresQueryCompiler,
} from 'kysely';

import { z } from 'zod';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

import type { DatabaseSchema } from 'project-utils';

import { optionalIdMessageShape, discordMessageShape } from '~/server/api/utils/shapes';
import { buildMessageValues, buildUpsertMessageQuery } from '~/server/api/utils/shared';
import { hasClassicContent, hasV2Components } from '~/utils';

// Expectation independence: 1 << 15 stated here, never re-read from the constant the code reads.
const V2_FLAG = 1 << 15; // 32768

// The two shapes rows 5712 / 5842 carry (012 backfill report, 2026-08-23).
const DATA_5712 = { content: 'hi', flags: V2_FLAG };
const DATA_5842 = { content: 'hi', flags: V2_FLAG, components: [] as { type: number }[] };

// The envelope `NewMessageModal` actually sends: { message: { data, name, guildId } }.
const envelope = (data: unknown, over: Record<string, unknown> = {}) => ({
  message: { data, name: 'qa-seed', guildId: null, ...over },
});

// Reconstructed from the router's own text, which is asserted below — not assumed.
const upsertInput = z.object({ message: optionalIdMessageShape });

const database = new Kysely<DatabaseSchema>({
  dialect: {
    createAdapter: () => new PostgresAdapter(),
    createDriver: () => new DummyDriver(),
    createIntrospector: (db) => new PostgresIntrospector(db),
    createQueryCompiler: () => new PostgresQueryCompiler(),
  },
});

describe('EXT-A — the real write boundary is the envelope, not `discordMessageShape`', () => {
  const routerSrc = readFileSync(
    resolve(__dirname, '../../routers/message.ts'),
    'utf8',
  );
  const upsertBlock = routerSrc.slice(routerSrc.indexOf('  upsert: protectedProcedure'));
  const upsertInputLine = upsertBlock.split('\n')[1] ?? '';

  it('WIRING, read from the tree: `upsert`\'s .input names `optionalIdMessageShape`', () => {
    expect(upsertInputLine).toContain('.input(');
    expect(upsertInputLine).toContain('optionalIdMessageShape');
  });

  it('WIRING CONTROL: it does NOT name `discordMessageShape` directly — QA\'s earlier assertion was one layer in', () => {
    expect(upsertInputLine).not.toContain('discordMessageShape');
  });

  it('WIRING CONTROL: the procedure is `protectedProcedure` — there is no anonymous mint route', () => {
    expect(upsertBlock.split('\n')[0]).toContain('protectedProcedure');
  });

  it('5712 envelope is ACCEPTED at the real boundary', () => {
    expect(upsertInput.safeParse(envelope(DATA_5712)).success).toBe(true);
  });

  it('5842 envelope is ACCEPTED at the real boundary', () => {
    expect(upsertInput.safeParse(envelope(DATA_5842)).success).toBe(true);
  });

  it('the accepted envelope carries the flag and content through the boundary unchanged', () => {
    const parsed = upsertInput.parse(envelope(DATA_5712));
    expect(parsed.message.data.flags).toBe(32768);
    expect(parsed.message.data.content).toBe('hi');
    expect(parsed.message.name).toBe('qa-seed');
  });

  // CONJUNCT ISOLATION: each envelope field is the SOLE carrier of the refusal in one fixture.
  it('CONTROL (name absent): every other field valid — refused on `name` alone', () => {
    const { message } = envelope(DATA_5712);
    const { name, ...noName } = message;
    expect(upsertInput.safeParse({ message: noName }).success).toBe(false);
  });

  it('CONTROL (name empty): refused on `name` alone — min(1) is load-bearing', () => {
    expect(upsertInput.safeParse(envelope(DATA_5712, { name: '' })).success).toBe(false);
  });

  it('CONTROL (guildId malformed): refused on `guildId` alone — it is not a free string', () => {
    expect(upsertInput.safeParse(envelope(DATA_5712, { guildId: 'not-a-snowflake' })).success).toBe(false);
  });

  // THE LIVE DEFAULT. `NewMessageModal` opens with `useState(guildId ?? '0')` and `/message`
  // passes no `guildId`; `disableSave` does NOT include a guild check, so Save is ENABLED while
  // the dropdown still reads 'Select a Guild'. `'0' || null` is `'0'`, and `discordIdShape` is
  // /^[0-9]{17,23}$/. An operator who presses Save without touching "Save To" gets a boundary
  // refusal and would reasonably report the mint route as CLOSED. It is not.
  it('CONTROL (guildId is the live default \'0\'): REFUSED at the boundary', () => {
    expect(upsertInput.safeParse(envelope(DATA_5712, { guildId: '0' })).success).toBe(false);
  });

  it('POSITIVE PAIR — the "My Account" item sets guildId to \'\', which reaches the boundary as null and is ACCEPTED', () => {
    const selectedGuildId = ''; // useGuildDropdownItems: the 'user' item's value
    expect(upsertInput.safeParse(envelope(DATA_5712, { guildId: selectedGuildId || null })).success).toBe(true);
  });

  it('CONTROL (guildId omitted entirely): ACCEPTED — the field is optional, so its refusal above is about form, not presence', () => {
    const { message } = envelope(DATA_5712);
    const { guildId, ...noGuild } = message;
    expect(upsertInput.safeParse({ message: noGuild }).success).toBe(true);
  });

  it('CONTROL (data malformed): refused on `data` alone', () => {
    expect(upsertInput.safeParse(envelope({ content: 42 })).success).toBe(false);
  });

  it('CONTROL (id present): an update envelope is accepted too — the seed is re-savable', () => {
    expect(upsertInput.safeParse(envelope(DATA_5712, { id: 'abc123' })).success).toBe(true);
  });

  it('the inner data schema still admits both shapes (QA\'s original assertion, retained as the subset it is)', () => {
    expect(discordMessageShape.safeParse(DATA_5712).success).toBe(true);
    expect(discordMessageShape.safeParse(DATA_5842).success).toBe(true);
  });
});

describe('EXT-B — the persist leg writes `data` verbatim, so the seed is a row-D member AT REST', () => {
  it('`buildMessageValues` passes `data` through by REFERENCE — no clone, no normalisation', () => {
    const values = buildMessageValues({ name: 'qa-seed', data: DATA_5712 }, { dbUserId: 'u1' }, 'nonce');
    expect(values.data).toBe(DATA_5712);
  });

  it('the persisted `data` still carries the V2 flag and the classic body', () => {
    const values = buildMessageValues({ name: 'qa-seed', data: DATA_5712 }, { dbUserId: 'u1' }, 'nonce');
    const d = values.data as { content?: string; flags?: number };
    expect(d.flags).toBe(32768);
    expect(d.content).toBe('hi');
  });

  it('AT REST the 5712 seed is a row-D member: flag set, classic content, no V2 components', () => {
    const values = buildMessageValues({ name: 'qa-seed', data: DATA_5712 }, { dbUserId: 'u1' }, 'nonce');
    const d = values.data as { flags: number; components?: { type: number }[] };
    expect((d.flags & 32768) !== 0).toBe(true);
    expect(hasClassicContent(d)).toBe(true);
    expect(hasV2Components(d.components)).toBe(false);
  });

  it('AT REST the 5842 seed is likewise a row-D/E member with `components: []` preserved', () => {
    const values = buildMessageValues({ name: 'qa-seed', data: DATA_5842 }, { dbUserId: 'u1' }, 'nonce');
    const d = values.data as { flags: number; components?: { type: number }[] };
    expect((d.flags & 32768) !== 0).toBe(true);
    expect(d.components).toEqual([]);
    expect(hasV2Components(d.components)).toBe(false);
  });

  // CONTROL, the other direction: a NON-member must come out a non-member, or the membership
  // assertions above are reporting a predicate that says yes to everything.
  it('CONTROL — an unflagged classic message is NOT a row-D member at rest', () => {
    const plain = { content: 'hi', flags: 0 };
    const values = buildMessageValues({ name: 'qa-seed', data: plain }, { dbUserId: 'u1' }, 'nonce');
    const d = values.data as { flags: number };
    expect((d.flags & 32768) !== 0).toBe(false);
  });

  // CONTROL, the other direction: a V2 record IS distinguishable at rest, so `hasV2Components`
  // is carrying the decision above rather than always returning false.
  it('CONTROL — a record with a real container reports V2 components at rest', () => {
    const v2 = { flags: V2_FLAG, components: [{ type: 17 }] };
    const values = buildMessageValues({ name: 'qa-seed', data: v2 }, { dbUserId: 'u1' }, 'nonce');
    const d = values.data as { components?: { type: number }[] };
    expect(hasV2Components(d.components)).toBe(true);
  });

  it('`valid` is computed ALONGSIDE and does not rewrite `data` — no `valid` key is added to the stored object', () => {
    const input = { ...DATA_5712 };
    const values = buildMessageValues({ name: 'qa-seed', data: input }, { dbUserId: 'u1' }, 'nonce');
    expect(Object.prototype.hasOwnProperty.call(values, 'valid')).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(values.data as object, 'valid')).toBe(false);
    expect(Object.keys(input).sort()).toEqual(['content', 'flags']);
  });

  it('THE UPDATE LEG — BC-11 Half B is a SAVE ON AN EXISTING RECORD, so `data` must appear in the conflict-update set too', () => {
    const compiled = buildUpsertMessageQuery(database, {
      updatedAt: new Date('2026-08-24T00:00:00Z'),
      name: 'qa-seed',
      data: DATA_5712,
      valid: true,
      fk_users_id: 'u1',
      fk_guilds_id: null,
      previewImageNonce: 'n',
    } as never).compile();
    const conflict = compiled.sql.slice(compiled.sql.indexOf('on conflict'));
    expect(conflict).toMatch(/"data"/);
  });

  it('CONTROL — the conflict clause is a real slice, not the whole statement (so the match above is about the UPDATE set)', () => {
    const compiled = buildUpsertMessageQuery(database, {
      updatedAt: new Date('2026-08-24T00:00:00Z'),
      name: 'qa-seed',
      data: DATA_5712,
      valid: true,
      fk_users_id: 'u1',
      fk_guilds_id: null,
      previewImageNonce: 'n',
    } as never).compile();
    expect(compiled.sql.indexOf('on conflict')).toBeGreaterThan(0);
    expect(compiled.sql.slice(compiled.sql.indexOf('on conflict'))).not.toContain('insert into');
  });
});
