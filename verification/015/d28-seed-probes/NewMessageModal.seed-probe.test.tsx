// Probe (no fix): does NewMessageModal's selectedGuildId follow its guildId prop after mount?
// Prints the outcome of each cell to PROBE_OUT. Controls are asserted.
import { appendFileSync } from 'node:fs';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { EditorView } from '@codemirror/view';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import press, { findButton } from '~/components/__tests__/helpers/press';

vi.mock('~/env.mjs', async () => (await import('~/providers/MessageProvider/__tests__/helpers/messageProviderDeps')).ENV_MOCK);
vi.mock('next/navigation', async () => (await import('~/providers/MessageProvider/__tests__/helpers/messageProviderDeps')).navigationMock());
vi.mock('next-auth/react', () => ({
  useSession: () => ({ status: 'authenticated', data: { user: { guilds: [
    { id: '111', name: 'Alpha', icon: null }, { id: '222', name: 'Beta', icon: null },
  ] } } }),
}));
vi.mock('~/utils/api', async () => {
  const { buildApiMock } = await import('~/providers/MessageProvider/__tests__/helpers/messageProviderDeps');
  return buildApiMock({});
});
vi.mock('~/components/dynamics/Tooltip', () => ({ default: (props: { children: unknown }) => props.children }));
const hoisted = vi.hoisted(() => ({ setter: undefined as undefined | ((id: string) => void) }));
vi.mock('~/utils/hooks/useGuildDropdownItems', () => ({
  default: ({ setSelectedGuildId }: { setSelectedGuildId: (id: string) => void }) => {
    hoisted.setter = setSelectedGuildId;
    return [
      { label: 'My Account', value: '', key: 'user', onPress: () => setSelectedGuildId('') },
      { label: 'Alpha', value: '111', key: '111', onPress: () => setSelectedGuildId('111') },
      { label: 'Beta', value: '222', key: '222', onPress: () => setSelectedGuildId('222') },
    ];
  },
}));

import NewMessageModal from '../NewMessageModal';

let root: ReturnType<typeof createRoot> | null = null;
let host: HTMLDivElement | null = null;
afterEach(() => { if (root) act(() => root!.unmount()); host?.remove(); root = null; host = null; });

const out = (line: string) => appendFileSync(process.env.PROBE_OUT ?? '/dev/null', `${line}\n`);
const qc = new QueryClient();
const render = (guildId?: string) => act(() => {
  root!.render(<QueryClientProvider client={qc}><NewMessageModal open onClose={() => {}} guildId={guildId} /></QueryClientProvider>);
});
async function waitEditor() {
  const end = Date.now() + 5000;
  for (;;) {
    const el = document.body.querySelector('.cm-editor') as HTMLElement | null;
    if (el) return el;
    if (Date.now() > end) throw new Error('no editor');
    await act(async () => { await new Promise((r) => { setTimeout(r, 25); }); });
  }
}
const label = () => {
  const lab = Array.from(document.body.querySelectorAll('label')).find((l) => l.textContent?.startsWith('Save To'));
  const id = lab?.getAttribute('id');
  const trigger = id ? document.body.querySelector(`[aria-labelledby~="${id}"]`) : null;
  return trigger?.textContent ?? '(label not found)';
};

async function reachSavePage(initial?: string) {
  host = document.createElement('div'); document.body.appendChild(host); root = createRoot(host);
  render(initial);
  const view = EditorView.findFromDOM(await waitEditor())!;
  await act(async () => { view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: JSON.stringify({ content: 'hi', flags: 0, embeds: [], components: [] }) } }); });
  press(findButton(document.body, 'Continue'));
  await act(async () => {});
}

describe('NewMessageModal selectedGuildId seed', () => {
  it('(a) prop 111 -> 222, no user input', async () => {
    await reachSavePage('111');
    const before = label();
    render('222'); await act(async () => {});
    const after = label();
    out(`(a) guildId 111 at mount: Save To shows ${JSON.stringify(before)}; guildId prop -> 222, no input: shows ${JSON.stringify(after)}`);
    expect(before).toContain('Alpha');
  });
  it('(b) prop 111 -> 222 after the user picked Beta... and picked My Account', async () => {
    await reachSavePage('111');
    act(() => hoisted.setter!('222')); await act(async () => {});
    const picked = label();
    render('333'); await act(async () => {});
    const afterProp = label();
    out(`(b) user picked 222 (shows ${JSON.stringify(picked)}); then guildId prop -> 333: shows ${JSON.stringify(afterProp)}`);
    expect(picked).toContain('Beta');
  });
  it('(a0) no guildId prop at mount, then prop arrives as 111', async () => {
    await reachSavePage(undefined);
    const before = label();
    render('111'); await act(async () => {});
    out(`(a0) no guildId at mount: shows ${JSON.stringify(before)}; guildId prop -> 111, no input: shows ${JSON.stringify(label())}`);
  });
});
