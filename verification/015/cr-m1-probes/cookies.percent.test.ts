import { describe, expect, it, vi } from 'vitest';

import parseServerCookies from '~/utils/parseServerCookies';

const header = vi.hoisted(() => ({ value: '' }));
vi.mock('next/headers', () => ({
  headers: async () => ({ get: () => header.value }),
}));

const SESSION = 'next-auth.session-token=abc';
const CASES: [string, string][] = [
  ['bare percent in a value', `pref=100%; ${SESSION}`],
  ['truncated escape in a value', `x=%E0%A4%A; ${SESSION}`],
  ['bare percent in a name', `a%=1; ${SESSION}`],
  ['control: escaped value', `x=a%20b; ${SESSION}`],
];

describe('parseServerCookies over cookie headers whose octets RFC 6265 admits', () => {
  it.each(CASES)('%s still yields the session cookie', async (label, value) => {
    header.value = value;
    let outcome: string;
    try {
      const map = await parseServerCookies();
      outcome = `session=${map.get('next-auth.session-token') ?? 'MISSING'}`;
    } catch (err) {
      outcome = `THREW ${(err as Error).name}: ${(err as Error).message}`;
    }
    console.log(`PROBE ${label} :: ${outcome}`);
    expect(outcome).toBe('session=abc');
  });
});
