import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, it, vi } from 'vitest';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));

import TransitionHeightElement from '~/components/TransitionHeightElement';

describe('TransitionHeightElement', () => {
  it('reports whether ResizeObserver exists in this environment', () => {
    // eslint-disable-next-line no-console
    console.log('POC_ENV=', process.env.POC_ENV, 'ResizeObserver=', typeof (globalThis as any).ResizeObserver);
    expect(true).toBe(true);
  });
  it('mounts closed: wrapper is display:none and height 0', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => { root.render(<TransitionHeightElement isOpen={false}><p>body</p></TransitionHeightElement>); });
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.style.display).toBe('none');
    expect(wrapper.style.height).toBe('0px');
    expect(wrapper.className).not.toContain('hidden');
  });
  it('mounts open: children are present and no inline display is forced', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => { root.render(<TransitionHeightElement isOpen><p>body</p></TransitionHeightElement>); });
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.textContent).toBe('body');
    expect(wrapper.style.display).toBe('');
  });
});
