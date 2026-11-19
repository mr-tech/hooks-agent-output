import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';

import type { NextApiRequest, NextApiResponse } from 'next';

import handler from '~/pages/api/waituntil-probe';

const hoisted = vi.hoisted(() => ({ waitUntil: vi.fn() }));
vi.mock('@vercel/functions', () => ({ waitUntil: hoisted.waitUntil }));

function respond() {
  const res = { status: vi.fn(), json: vi.fn() };
  res.status.mockReturnValue(res);
  return res;
}
const call = (query: Record<string, string>) => {
  const res = respond();
  handler({ query } as unknown as NextApiRequest, res as unknown as NextApiResponse);
  return res;
};

let lines: string[];
beforeEach(() => {
  vi.useFakeTimers();
  hoisted.waitUntil.mockReset();
  lines = [];
  vi.spyOn(console, 'error').mockImplementation((line: string) => { lines.push(line); });
});
afterEach(() => { vi.useRealTimers(); vi.restoreAllMocks(); });

describe('waituntil-probe', () => {
  it('writes the control line before it responds, with the failure prefix', () => {
    const order: string[] = [];
    vi.spyOn(console, 'error').mockImplementation(() => { order.push('line'); });
    const res = respond();
    res.json.mockImplementation(() => { order.push('response'); });
    handler({ query: { id: 'abc' } } as unknown as NextApiRequest, res as unknown as NextApiResponse);
    expect(order[0]).toBe('line');
    expect(order[1]).toBe('response');
  });

  it('with waitUntil: hands the post-response promise to waitUntil, which settles after the delay with a second line', async () => {
    call({ id: 'abc' });
    expect(lines).toEqual(['preview-image-failure probe-control mode=with id=abc']);
    expect(hoisted.waitUntil).toHaveBeenCalledTimes(1);
    const promise = hoisted.waitUntil.mock.calls[0][0] as Promise<void>;
    await vi.advanceTimersByTimeAsync(5000);
    await promise;
    expect(lines).toEqual([
      'preview-image-failure probe-control mode=with id=abc',
      'preview-image-failure probe-post-response mode=with id=abc elapsedMs=5000',
    ]);
  });

  it('without waitUntil: still starts the post-response work but never hands it to waitUntil', async () => {
    call({ id: 'abc', mode: 'without' });
    expect(hoisted.waitUntil).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(5000);
    expect(lines).toEqual([
      'preview-image-failure probe-control mode=without id=abc',
      'preview-image-failure probe-post-response mode=without id=abc elapsedMs=5000',
    ]);
  });

  it('writes an id with other characters as its alphanumeric and dash characters only', () => {
    call({ id: 'a b\nc/../d-1' });
    expect(lines[0]).toBe('preview-image-failure probe-control mode=with id=abcd-1');
  });
});
