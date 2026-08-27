import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, it, vi } from 'vitest';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));

import NewMessageJsonInput from '~/app/message/_components/NewMessageJsonInput';

function mount(ui: React.ReactNode) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => { root.render(ui); });
  return container;
}

describe('NewMessageJsonInput', () => {
  it('mounts at rest with a CodeMirror editor and no error notice', () => {
    const setMessage = vi.fn();
    const el = mount(<NewMessageJsonInput setMessage={setMessage} />);
    // eslint-disable-next-line no-console
    console.log('CM nodes:', el.querySelectorAll('.cm-editor').length, '| text:', JSON.stringify(el.textContent));
    expect(el.textContent).toContain('Pretty print');
    expect(el.querySelectorAll('.cm-editor').length).toBe(1);
    expect(el.textContent).not.toContain('nothing was created');
  });
});

import { EditorView } from '@codemirror/view';

describe('NewMessageJsonInput — driven', () => {
  it('shows the V2/classic conflict notice when the JSON has both', async () => {
    const setMessage = vi.fn();
    const el = mount(<NewMessageJsonInput setMessage={setMessage} />);
    const view = EditorView.findFromDOM(el.querySelector('.cm-editor') as HTMLElement);
    expect(view).toBeTruthy();
    const json = JSON.stringify({ content: 'hello', flags: 32768, components: [{ type: 10, content: 'x' }] });
    await act(async () => {
      view!.dispatch({ changes: { from: 0, to: view!.state.doc.length, insert: json } });
    });
    // eslint-disable-next-line no-console
    console.log('after dispatch text:', JSON.stringify(el.textContent));
    expect(el.textContent).toContain('nothing was created');
  });
});
