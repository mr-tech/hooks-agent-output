import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';

import type { NextApiRequest, NextApiResponse } from 'next';

import handler from '~/pages/api/waituntil-span-probe';

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

const POST = (mode: string, atS: number) => `preview-image-failure probe-post-response mode=${mode} id=abc atS=${atS} elapsedMs=${atS * 1000}`;

let lines: string[];
beforeEach(() => {
  vi.useFakeTimers();
  hoisted.waitUntil.mockReset();
  lines = [];
  vi.spyOn(console, 'error').mockImplementation((line: string) => { lines.push(line); });
});
afterEach(() => { vi.useRealTimers(); vi.restoreAllMocks(); });

describe('waituntil-span-probe', () => {
  it('writes the control line before it responds, with the failure prefix', () => {
    const order: string[] = [];
    vi.spyOn(console, 'error').mockImplementation(() => { order.push('line'); });
    const res = respond();
    res.json.mockImplementation(() => { order.push('response'); });
    handler({ query: { id: 'abc' } } as unknown as NextApiRequest, res as unknown as NextApiResponse);
    expect(order).toEqual(['line', 'response']);
  });

  it('with waitUntil: one promise, a line at 5, 15, 30, 45 and 55 s after the request starts, settling at 55 s', async () => {
    call({ id: 'abc' });
    expect(hoisted.waitUntil).toHaveBeenCalledTimes(1);
    let settled = false;
    void (hoisted.waitUntil.mock.calls[0][0] as Promise<void>).then(() => { settled = true; });

    await vi.advanceTimersByTimeAsync(4999);
    expect(lines).toEqual(['preview-image-failure probe-control mode=with id=abc']);
    await vi.advanceTimersByTimeAsync(1);
    expect(lines.slice(1)).toEqual([POST('with', 5)]);
    await vi.advanceTimersByTimeAsync(9999);
    expect(lines.slice(1)).toEqual([POST('with', 5)]);
    await vi.advanceTimersByTimeAsync(1);
    expect(lines.slice(1)).toEqual([POST('with', 5), POST('with', 15)]);
    await vi.advanceTimersByTimeAsync(39999);
    expect(lines.slice(1)).toEqual([5, 15, 30, 45].map((s) => POST('with', s)));
    expect(settled).toBe(false);
    await vi.advanceTimersByTimeAsync(1);
    expect(lines.slice(1)).toEqual([5, 15, 30, 45, 55].map((s) => POST('with', s)));
    expect(settled).toBe(true);
  });

  it('without waitUntil: writes the same five lines and never hands the promise to waitUntil', async () => {
    call({ id: 'abc', mode: 'without' });
    expect(hoisted.waitUntil).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(55000);
    expect(lines.slice(1)).toEqual([5, 15, 30, 45, 55].map((s) => POST('without', s)));
  });

  it('writes an id with other characters as its alphanumeric and dash characters only', () => {
    call({ id: 'a b\nc/../d-1' });
    expect(lines[0]).toBe('preview-image-failure probe-control mode=with id=abcd-1');
  });
});
