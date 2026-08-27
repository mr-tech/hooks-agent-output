import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, it, vi } from 'vitest';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));

import Button from '~/components/Button';

describe('react-aria Button press without @testing-library', () => {
  it('reports which event constructors exist', () => {
    // eslint-disable-next-line no-console
    console.log('PointerEvent:', typeof (globalThis as any).PointerEvent, '| MouseEvent:', typeof MouseEvent, '| KeyboardEvent:', typeof KeyboardEvent);
    expect(true).toBe(true);
  });

  it('fires onPress from a native pointer/mouse sequence', () => {
    const onPress = vi.fn();
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => { root.render(<Button onPress={onPress}>Go</Button>); });
    const btn = container.querySelector('button')!;
    const PE = (globalThis as any).PointerEvent;
    act(() => {
      if (PE) {
        btn.dispatchEvent(new PE('pointerdown', { bubbles: true, cancelable: true, pointerId: 1, pointerType: 'mouse', button: 0 }));
        btn.dispatchEvent(new PE('pointerup', { bubbles: true, cancelable: true, pointerId: 1, pointerType: 'mouse', button: 0 }));
      } else {
        btn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, button: 0, detail: 1 }));
        btn.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, button: 0, detail: 1 }));
      }
      btn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, button: 0, detail: 1 }));
    });
    // eslint-disable-next-line no-console
    console.log('onPress calls:', onPress.mock.calls.length);
    expect(onPress).toHaveBeenCalled();
  });

  it('raw Enter keydown/keyup does NOT activate a react-aria Button', () => {
    const onPress = vi.fn();
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => { root.render(<Button onPress={onPress}>Go</Button>); });
    const btn = container.querySelector('button')!;
    act(() => {
      btn.focus();
      btn.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, cancelable: true, key: 'Enter', code: 'Enter' }));
      btn.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, cancelable: true, key: 'Enter', code: 'Enter' }));
      // Real browsers synthesise a click from Enter on a native <button>; neither DOM env does.
      btn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, detail: 0 }));
    });
    // eslint-disable-next-line no-console
    console.log('keyboard+synthesised-click onPress calls:', onPress.mock.calls.length);
    // DETERMINATION: a raw Enter keydown/keyup does NOT activate a react-aria Button in
    // either DOM env, and a click dispatched afterwards is swallowed by usePress. Keyboard
    // activation must be expressed as a detail:0 ("virtual") click with no preceding key
    // events - see 08-click.test.tsx - or driven by @testing-library/user-event.
    expect(onPress).not.toHaveBeenCalled();
  });
});
