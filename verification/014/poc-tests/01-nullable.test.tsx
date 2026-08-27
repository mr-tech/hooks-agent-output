import { StrictMode } from 'react';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));

import NullableComponent from '~/components/NullableComponent';

let container: HTMLDivElement | null = null;

afterEach(() => { container?.remove(); container = null; });

function mount(ui: React.ReactNode) {
  container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => { root.render(<StrictMode>{ui}</StrictMode>); });
  return container;
}

describe('NullableComponent', () => {
  it('renders children when show is truthy', () => {
    const el = mount(<NullableComponent show><span>hi</span></NullableComponent>);
    expect(el.textContent).toBe('hi');
  });
  it('renders nothing when show is falsy', () => {
    const el = mount(<NullableComponent show={0}><span>hi</span></NullableComponent>);
    expect(el.textContent).toBe('');
  });
});
