import { act, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, it, vi } from 'vitest';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));

import Button from '~/components/Button';

function mount(ui: React.ReactNode) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => { root.render(ui); });
  return container;
}

describe('event delivery baseline', () => {
  it('plain React onClick fires from a dispatched click', () => {
    const onClick = vi.fn();
    const el = mount(<button type="button" onClick={onClick}>x</button>);
    act(() => { el.querySelector('button')!.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })); });
    expect(onClick).toHaveBeenCalled();
  });

  it('plain React state update through a dispatched click', () => {
    function C() {
      const [n, setN] = useState(0);
      return <button type="button" onClick={() => setN(n + 1)}>n={n}</button>;
    }
    const el = mount(<C />);
    act(() => { el.querySelector('button')!.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })); });
    expect(el.textContent).toBe('n=1');
  });

  it.each([
    ['detail 0 (virtual click)', 0],
    ['detail 1 (real click)', 1],
  ])('react-aria Button: click-only, %s', (_l, detail) => {
    const onPress = vi.fn();
    const el = mount(<Button onPress={onPress}>Go</Button>);
    act(() => { el.querySelector('button')!.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, detail })); });
    // eslint-disable-next-line no-console
    console.log('detail', detail, '-> onPress calls', onPress.mock.calls.length);
    expect(onPress.mock.calls.length).toBeGreaterThanOrEqual(0);
  });
});
