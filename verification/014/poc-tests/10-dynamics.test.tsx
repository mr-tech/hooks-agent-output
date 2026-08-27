// @vitest-environment jsdom
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, it, vi } from 'vitest';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));

vi.mock('~/providers/IsMobileProvider', () => ({
  useIsMobile: () => false,
  default: ({ children }: { children: React.ReactNode }) => children,
}));

import DynamicTooltip from '~/components/dynamics/Tooltip';

describe('next/dynamic wrappers (plan-004 lazy-loading surface)', () => {
  it('mounts without error but renders no host output - the lazy-loading OPTIONS are not observable', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => { root.render(<DynamicTooltip content='hi'><span>anchor</span></DynamicTooltip>); });
    const first = container.innerHTML;
    // eslint-disable-next-line no-console
    console.log('immediately after mount:', JSON.stringify(first).slice(0, 160));
    await act(async () => { await new Promise((r) => { setTimeout(r, 100); }); });
    // eslint-disable-next-line no-console
    console.log('after settle:', JSON.stringify(container.innerHTML).slice(0, 160));
    // DETERMINATION: `dynamics/Tooltip` is declared `dynamic(..., { ssr: true, loading: () => null })`
    // (src/components/dynamics/Tooltip.tsx). Under the harness the wrapper mounts without error but
    // renders NOTHING at any point: the loading fallback IS null, and the real `../Tooltip` renders
    // no host output until an anchor is hovered. So the wrapper is *reachable* under the harness,
    // but the property `plan-004-lazy-loading.test.ts` asserts - the `ssr:`/`loading:` OPTIONS passed
    // to next/dynamic - is not observable from a mount. That file has no behavioural equivalent here.
    expect(container.textContent).toBe('');
    act(() => { root.unmount(); });
    await act(async () => { await new Promise((r) => { setTimeout(r, 50); }); });
  });
});
