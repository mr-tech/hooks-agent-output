import { act } from 'react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

import { mountInMessageProvider } from './helpers/mountMessageProvider';

import { unmountDom } from '~/components/__tests__/helpers/dom';
import { useMessage } from '~/providers/MessageProvider';

const h = vi.hoisted(() => ({
  path: '/message/m/0/edit',
  status: 'unauthenticated' as string,
  server: {} as Record<string, any>,
}));

vi.mock('~/env.mjs', async () => (await import('./helpers/messageProviderDeps')).ENV_MOCK);
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), refresh: vi.fn(), back: vi.fn() }),
  usePathname: () => h.path,
  useSearchParams: () => new URLSearchParams(''),
}));
vi.mock('next-auth/react', () => ({
  useSession: () => ({ status: h.status, data: null }),
  signIn: vi.fn(),
}));
vi.mock('~/providers/GuildProvider', async () => (await import('./helpers/messageProviderDeps')).GUILD_PROVIDER_MOCK);
vi.mock('~/providers/WebhookProvider', async () => (await import('./helpers/messageProviderDeps')).WEBHOOK_PROVIDER_MOCK);
vi.mock('~/providers/ConfirmationProvider', async () => (await import('./helpers/messageProviderDeps')).CONFIRMATION_PROVIDER_MOCK);
vi.mock('pusher-js', () => ({ default: class { subscribe() { return { bind() {}, unbind() {} }; } unsubscribe() {} } }));
vi.mock('~/utils/api', async () => {
  const { buildApiMock } = await import('./helpers/messageProviderDeps');
  const id = () => h.path.split('/')[3];
  return buildApiMock({ queryData: { 'message.getOne': () => (id() !== '0' ? h.server[id()] : undefined) } });
});

let ctx: ReturnType<typeof useMessage> | null = null;
const Probe: FC = () => { ctx = useMessage(); return null; };
const cur = () => ctx as ReturnType<typeof useMessage>;
const stored = () => JSON.parse(localStorage.getItem('message') ?? 'null');
const mount = (path: string, status: string) => {
  h.path = path; h.status = status;
  act(() => { mountInMessageProvider(<Probe />); });
};

beforeEach(() => {
  localStorage.clear();
  h.server = {
    '7': { id: '7', name: 'Seven', updatedAt: 1000, data: { content: 'server seven' } },
    '8': { id: '8', name: 'Eight', updatedAt: 1000, data: { content: 'server eight' } },
  };
});
afterEach(() => { unmountDom(); });

describe('storage probes', () => {
  it('A1 signed-out draft persists synchronously and is restored after remount (reload/close)', () => {
    mount('/message/m/0/edit', 'unauthenticated');
    act(() => { cur().updateMessage({ data: { content: 'MY DRAFT' } }); });
    expect(stored().data.content).toBe('MY DRAFT');
    unmountDom();
    mount('/message/m/0/edit', 'unauthenticated');
    expect(cur().message?.data.content).toBe('MY DRAFT');
  });

  it('A2 signed-out draft wiped by opening a saved message after sign-in then returning to /0', () => {
    mount('/message/m/0/edit', 'unauthenticated');
    act(() => { cur().updateMessage({ data: { content: 'MY DRAFT' } }); });
    unmountDom();
    // sign in, open saved message 7
    mount('/message/m/7/edit', 'authenticated');
    expect(cur().message?.data.content).toBe('server seven');
    expect(stored().id).toBe('7');
    unmountDom();
    // back to new-message page
    mount('/message/m/0/edit', 'authenticated');
    console.log('A2 after return, content starts:', String(cur().message?.data.content).slice(0, 30), '| stored id:', stored().id);
    expect(cur().message?.data.content).not.toBe('MY DRAFT');
  });

  it('A2b control: sign in and go straight to /0 keeps the draft', () => {
    mount('/message/m/0/edit', 'unauthenticated');
    act(() => { cur().updateMessage({ data: { content: 'MY DRAFT' } }); });
    unmountDom();
    mount('/message/m/0/edit', 'authenticated');
    expect(cur().message?.data.content).toBe('MY DRAFT');
  });

  it('A3 second tab: storage event updates store state but not the editing tab message; last writer wins', () => {
    mount('/message/m/0/edit', 'unauthenticated');
    act(() => { cur().updateMessage({ data: { content: 'TAB A' } }); });
    // tab B writes its draft to the same key and the browser fires a storage event in tab A
    const b = { ...stored(), data: { content: 'TAB B' }, updatedAt: Date.now() + 5 };
    localStorage.setItem('message', JSON.stringify(b));
    act(() => { window.dispatchEvent(new StorageEvent('storage', { key: 'message' })); });
    console.log('A3 tab A editor shows:', cur().message?.data.content, '| stored:', stored().data.content);
    expect(cur().message?.data.content).toBe('TAB A');
    act(() => { cur().updateMessage({ data: { content: 'TAB A 2' } }); });
    expect(stored().data.content).toBe('TAB A 2'); // B's draft overwritten, no confirm/toast API involved
    unmountDom();
    mount('/message/m/0/edit', 'unauthenticated');
    expect(cur().message?.data.content).toBe('TAB A 2');
  });

  it('A4 session expiry: edits on saved msg 7 are overwritten when redirected to /0', () => {
    mount('/message/m/7/edit', 'authenticated');
    act(() => { cur().updateMessage({ data: { content: 'UNSAVED EDIT' } }); });
    expect(cur().hasChanged).toBe(true);
    expect(stored().data.content).toBe('UNSAVED EDIT');
    unmountDom();
    mount('/message/m/0/edit', 'unauthenticated'); // Redirects/Client.tsx target
    console.log('A4 stored after redirect: id=', stored()?.id, 'content starts', String(stored()?.data?.content).slice(0, 25));
    expect(JSON.stringify(stored())).not.toContain('UNSAVED EDIT');
  });

  it('A4b rerender (no remount) variant: same provider instance, path+status flip', () => {
    mount('/message/m/7/edit', 'authenticated');
    act(() => { cur().updateMessage({ data: { content: 'UNSAVED EDIT' } }); });
    h.path = '/message/m/0/edit'; h.status = 'unauthenticated';
    // force rerender of same instance via storage event (state change in provider)
    act(() => { window.dispatchEvent(new StorageEvent('storage', { key: 'message' })); });
    console.log('A4b stored id', stored()?.id, 'content starts', String(stored()?.data?.content).slice(0, 25));
    expect(JSON.stringify(stored())).not.toContain('UNSAVED EDIT');
  });

  it('B3 signed-in: edit A(7), open B(8), return to A -> edits gone', () => {
    mount('/message/m/7/edit', 'authenticated');
    act(() => { cur().updateMessage({ data: { content: 'UNSAVED EDIT' } }); });
    unmountDom();
    mount('/message/m/8/edit', 'authenticated');
    expect(stored().id).toBe('8');
    unmountDom();
    mount('/message/m/7/edit', 'authenticated');
    console.log('B3 back on 7 shows:', cur().message?.data.content);
    expect(cur().message?.data.content).toBe('server seven');
  });

  it('B3 control: edit A(7), reload A directly -> edits restored', () => {
    mount('/message/m/7/edit', 'authenticated');
    act(() => { cur().updateMessage({ data: { content: 'UNSAVED EDIT' } }); });
    unmountDom();
    mount('/message/m/7/edit', 'authenticated');
    expect(cur().message?.data.content).toBe('UNSAVED EDIT');
  });
});
