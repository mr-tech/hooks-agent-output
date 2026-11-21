import { timingSafeEqual } from 'crypto';
import {
  beforeEach, describe, expect, it, vi,
} from 'vitest';

import secretEquals from '~/server/api/utils/secretEquals';

vi.mock('crypto', async (importOriginal) => {
  const actual = await importOriginal<typeof import('crypto')>();
  return { ...actual, timingSafeEqual: vi.fn(actual.timingSafeEqual) };
});

describe('secretEquals', () => {
  it('holds for two equal strings', () => {
    expect(secretEquals('Bearer test-key', 'Bearer test-key')).toBe(true);
  });

  it('fails for two unequal strings of the same length', () => {
    expect(secretEquals('Bearer test-key', 'Bearer test-kez')).toBe(false);
  });

  it.each([
    ['the first longer', 'Bearer test-keyx', 'Bearer test-key'],
    ['the second longer', 'Bearer test-key', 'Bearer test-keyx'],
    ['one empty', '', 'Bearer test-key'],
  ])('fails, without throwing, for strings of unequal length (%s)', (_case, a, b) => {
    expect(secretEquals(a, b)).toBe(false);
  });

  it('holds for two empty strings', () => {
    expect(secretEquals('', '')).toBe(true);
  });

  it('distinguishes strings that differ only in case', () => {
    expect(secretEquals('Bearer test-key', 'bearer test-key')).toBe(false);
  });
});

describe('secretEquals decides in constant time', () => {
  beforeEach(() => {
    vi.mocked(timingSafeEqual).mockClear();
  });

  it('compares the SHA-256 digests of both strings through crypto.timingSafeEqual', () => {
    secretEquals('abc', 'abcd');

    expect(timingSafeEqual).toHaveBeenCalledTimes(1);
    const [first, second] = vi.mocked(timingSafeEqual).mock.calls[0]!;
    // SHA-256 of "abc" (FIPS 180-2 test vector) and of "abcd", taken with coreutils sha256sum.
    expect(Buffer.from(first as Uint8Array).toString('hex'))
      .toBe('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
    expect(Buffer.from(second as Uint8Array).toString('hex'))
      .toBe('88d4266fd4e6338d13b845fcf289579d209c897823b9217da3e161936f031589');
  });

  it('answers what crypto.timingSafeEqual answers', () => {
    vi.mocked(timingSafeEqual).mockReturnValueOnce(true);
    expect(secretEquals('abc', 'abcd')).toBe(true);
  });
});
