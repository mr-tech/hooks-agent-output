import {
  describe, expect, it, vi,
} from 'vitest';

import { messageIdShape } from '~/server/api/utils/shapes';

vi.mock('~/env.mjs', () => ({
  env: new Proxy({}, { get: (_, key) => `test-${String(key)}` }),
}));

// Code-review probe of the int8 bound on messageIdShape. Expected values are literals (int8 max is 2^63 - 1).
const ACCEPT: [string, string][] = [
  ['9223372036854775807', '9223372036854775807'],
  ['9223372036854775806', '9223372036854775806'],
  ['1111111111111111111', '1111111111111111111'],
  ['0009223372036854775', '9223372036854775'],
  ['1', '1'],
  ['0', '0'],
];
const REFUSE = ['9223372036854775808', '9999999999999999999', '18446744073709551616', '09223372036854775807',
  '', ' 1', '1 ', '+1', '-1', '1e3', '１', '0x1', '12345678901234567890'];

describe('messageIdShape bound', () => {
  it.each(ACCEPT)('accepts %s as %s', (input, out) => {
    expect(messageIdShape.safeParse(input)).toEqual({ success: true, data: out });
  });
  it.each(REFUSE)('refuses %j', (input) => {
    expect(messageIdShape.safeParse(input).success).toBe(false);
  });
});

describe('messageIdShape as a tRPC input (the real input middleware)', () => {
  it.each(['1e3', '１', '9.00000000000101e14', '9223372036854775808', 'abc'])('a call with %j is refused BAD_REQUEST before the resolver', async (input) => {
    const { initTRPC } = await import('@trpc/server');
    const t = initTRPC.create();
    let ran = false;
    const router = t.router({ probe: t.procedure.input(messageIdShape).query(() => { ran = true; return 'ran'; }) });
    const outcome = await router.createCaller({}).probe(input).then(() => 'resolved', (e: { code?: string, cause?: unknown }) => `${e.code}:${(e.cause as Error)?.constructor?.name}`);
    expect(ran).toBe(false);
    expect(outcome.startsWith('BAD_REQUEST:')).toBe(true);
    console.log(`PROBE ${JSON.stringify(input)} -> ${outcome}`);
  });
});
