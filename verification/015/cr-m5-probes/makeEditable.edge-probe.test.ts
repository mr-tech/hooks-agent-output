import {
  describe, expect, it, vi,
} from 'vitest';

import { appendFileSync } from 'node:fs';

import { makeEditable } from '../index';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));

function outcome(data: unknown) {
  try {
    makeEditable({ data } as never);
    return 'processed';
  } catch (e) {
    return `THREW:${(e as Error).message}`;
  }
}

describe('makeEditable at the edges of the rev 22 class (3) list', () => {
  it.each([
    ['control: valid', { content: 'x', embeds: [{ fields: [{ name: 'a' }] }], components: [{ type: 1, components: [{ type: 2 }] }] }, 'processed'],
    ['control: embeds a number', { embeds: 5 }, 'THREW'],
    ['embeds empty string', { embeds: '' }, '?'],
    ['embeds false', { embeds: false }, '?'],
    ['embeds 0', { embeds: 0 }, '?'],
    ['embed element an array', { embeds: [[]] }, '?'],
    ['embed element a string', { embeds: ['a'] }, '?'],
    ['fields empty string', { embeds: [{ fields: '' }] }, '?'],
    ['field element an array', { embeds: [{ fields: [[]] }] }, '?'],
    ['components empty string', { components: '' }, '?'],
    ['top-level component a string', { components: ['ab'] }, '?'],
    ['type-17 child null', { components: [{ type: 17, components: [null] }] }, '?'],
    ['type-17 child a string', { components: [{ type: 17, components: ['x'] }] }, '?'],
    ['type-17 > type-1 child null', { components: [{ type: 17, components: [{ type: 1, components: [null] }] }] }, '?'],
    ['type-1 child an array', { components: [{ type: 1, components: [[]] }] }, '?'],
    ['type-9 accessory null', { components: [{ type: 9, components: [], accessory: null }] }, '?'],
    ['type-12 items a string', { components: [{ type: 12, items: 'x' }] }, '?'],
    ['type-12 item null', { components: [{ type: 12, items: [null] }] }, '?'],
  ])('%s', (name, data, expected) => {
    const got = outcome(data);
    appendFileSync(process.env.EDGE_OUT ?? '/dev/null', `EDGE ${name} -> ${got}\n`);
    if (expected !== '?') expect(got.startsWith(expected)).toBe(true);
  });
});
