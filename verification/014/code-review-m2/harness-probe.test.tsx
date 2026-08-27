import { describe, expect, it } from 'vitest';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import pushSorted from '~/utils/pushSorted';

describe('CR probe: dom project wiring', () => {
  it('runs under a DOM environment', () => {
    expect(typeof document).toBe('object');
    expect(typeof window).toBe('object');
  });
  it('loaded the dom setup file', () => {
    expect((globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT).toBe(true);
  });
  it('resolves the ~ alias from the dom project', () => {
    expect(typeof pushSorted).toBe('function');
  });
  it('mounts a react component with createRoot + act', () => {
    const host = document.createElement('div');
    document.body.appendChild(host);
    const root = createRoot(host);
    act(() => { root.render(<span data-testid="cr">mounted</span>); });
    expect(host.textContent).toBe('mounted');
    act(() => { root.unmount(); });
  });
});
