// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest';

describe('happy-dom ResizeObserver: exists, but does it ever fire?', () => {
  it('never delivers a callback for an element that changes size', async () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    let fired = 0;
    const RO = (globalThis as unknown as { ResizeObserver: typeof ResizeObserver }).ResizeObserver;
    const ro = new RO(() => { fired += 1; });
    ro.observe(el);
    el.style.height = '400px';
    el.style.width = '400px';
    await new Promise((r) => { setTimeout(r, 100); });
    // eslint-disable-next-line no-console
    console.log('ResizeObserver callbacks fired:', fired, '| offsetHeight:', el.offsetHeight, '| scrollHeight:', el.scrollHeight);
    ro.disconnect();
    expect(typeof RO).toBe('function');
  });
});
