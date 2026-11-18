// Analysis probe (not a suite file): what an unsaved edit survives, across remounts of the real
// MessageProvider at a route and session status. Remount stands for reload/close-and-reopen and for
// the App Router mounting the editor at a new [id]. localStorage is the real jsdom store.
import { act } from 'react';
import {
  describe, expect, it, vi, afterEach,
} from 'vitest';
import { writeFileSync } from 'node:fs';

import { mountInMessageProvider } from './helpers/mountMessageProvider';

import { unmountDom } from '~/components/__tests__/helpers/dom';
import { useMessage } from '~/providers/MessageProvider';

const hoisted = vi.hoisted(() => ({
  path: '/message/m/0/edit',
  status: 'unauthenticated' as 'authenticated' | 'unauthenticated',
  stored: {
    id: '42', name: 'Stored', updatedAt: 1, createdAt: 1, previewImageNonce: null,
    recentWebhookId: null, recentThreadId: null, recentMessageId: null, guildId: null,
    data: { content: 'SAVED-42' } as Record<string, unknown>,
  },
}));

vi.mock('~/env.mjs', async () => (await import('./helpers/messageProviderDeps')).ENV_MOCK);
vi.mock('pusher-js', () => ({
  default: class {
    subscribe() { return { bind: () => {}, unbind: () => {} }; }

    unsubscribe() { /* none */ }
  },
}));
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: () => {}, replace: () => {}, refresh: () => {}, back: () => {},
  }),
  usePathname: () => hoisted.path,
  useSearchParams: () => new URLSearchParams(''),
}));
vi.mock('next-auth/react', () => ({
  useSession: () => ({ status: hoisted.status, data: hoisted.status === 'authenticated' ? {} : null }),
  signIn: () => {},
}));
vi.mock('~/providers/GuildProvider', async () => (await import('./helpers/messageProviderDeps')).GUILD_PROVIDER_MOCK);
vi.mock('~/providers/WebhookProvider', async () => (await import('./helpers/messageProviderDeps')).WEBHOOK_PROVIDER_MOCK);
vi.mock('~/providers/ConfirmationProvider', async () => (await import('./helpers/messageProviderDeps')).CONFIRMATION_PROVIDER_MOCK);
vi.mock('~/utils/api', async () => {
  const { buildApiMock } = await import('./helpers/messageProviderDeps');
  // getOne is enabled only off route 0 and (server side) only signed in; the mock honours both.
  return buildApiMock({
    queryData: {
      'message.getOne': () => (hoisted.path.includes('/m/0/') || hoisted.status !== 'authenticated'
        ? undefined : hoisted.stored),
    },
  });
});

let ctx: ReturnType<typeof useMessage> | null = null;
const Probe: FC = () => {
  ctx = useMessage();
  return null;
};
const cur = () => ctx as ReturnType<typeof useMessage>;

function at(path: string, status: typeof hoisted.status) {
  unmountDom();
  hoisted.path = path;
  hoisted.status = status;
  act(() => { mountInMessageProvider(<Probe />); });
}
function edit(content: string) {
  act(() => { cur().updateMessage({ data: { ...(cur().message as ActiveMessage).data, content } as never }); });
}
function observe(step: string) {
  const store = JSON.parse(window.localStorage.getItem('message') ?? 'null') as null | ActiveMessage;
  return {
    step,
    path: hoisted.path,
    status: hoisted.status,
    editorContent: String((cur().message as ActiveMessage | null)?.data.content ?? '').slice(0, 40),
    editorId: (cur().message as ActiveMessage & { id?: string } | null)?.id ?? null,
    storeContent: String(store?.data.content ?? '').slice(0, 40),
    storeId: (store as (ActiveMessage & { id?: string }) | null)?.id ?? null,
    hasChanged: cur().hasChanged,
  };
}

const table: Record<string, unknown>[] = [];
afterEach(() => { unmountDom(); window.localStorage.clear(); });

describe('signed-out loss paths', () => {
  it('S1 reload or close-and-reopen while signed out on route 0', () => {
    const rows = [];
    at('/message/m/0/edit', 'unauthenticated');
    rows.push(observe('first visit'));
    edit('SIGNED-OUT DRAFT');
    rows.push(observe('after edit'));
    at('/message/m/0/edit', 'unauthenticated');
    rows.push(observe('after remount (reload)'));
    table.push({ scenario: 'S1', rows });
    expect(rows.length).toBe(3);
  });

  it('S2 sign in from route 0, then open a saved message, then return to route 0', () => {
    const rows = [];
    at('/message/m/0/edit', 'unauthenticated');
    edit('SIGNED-OUT DRAFT');
    rows.push(observe('signed-out draft'));
    at('/message', 'authenticated'); // callbackUrl '/message': list page, no MessageProvider there
    unmountDom();
    at('/message/m/42/edit', 'authenticated');
    rows.push(observe('opened saved message 42'));
    at('/message/m/0/edit', 'authenticated');
    rows.push(observe('back at route 0 (new message)'));
    table.push({ scenario: 'S2', rows });
    expect(rows.length).toBe(3);
  });

  it('S2b sign in from route 0, then go straight to route 0', () => {
    const rows = [];
    at('/message/m/0/edit', 'unauthenticated');
    edit('SIGNED-OUT DRAFT');
    at('/message/m/0/edit', 'authenticated');
    rows.push(observe('route 0 after sign-in'));
    table.push({ scenario: 'S2b', rows });
    expect(rows.length).toBe(1);
  });

  it('S3 signed-in unsaved edit on 42, then signed out and redirected to route 0, then sign in and reopen 42', () => {
    const rows = [];
    at('/message/m/42/edit', 'authenticated');
    edit('UNSAVED EDIT OF 42');
    rows.push(observe('signed-in edit on 42'));
    at('/message/m/0/edit', 'unauthenticated');
    rows.push(observe('after sign-out redirect to route 0'));
    at('/message/m/42/edit', 'authenticated');
    rows.push(observe('signed in again, reopened 42'));
    table.push({ scenario: 'S3', rows });
    expect(rows.length).toBe(3);
  });

  it('S4 control: signed-in unsaved edit on 42, then reload of 42', () => {
    const rows = [];
    at('/message/m/42/edit', 'authenticated');
    edit('UNSAVED EDIT OF 42');
    at('/message/m/42/edit', 'authenticated');
    rows.push(observe('after reload of 42'));
    table.push({ scenario: 'S4', rows });
    expect(rows.length).toBe(1);
  });

  it('S5 two signed-out tabs on route 0 share one store key', () => {
    const rows = [];
    at('/message/m/0/edit', 'unauthenticated');
    edit('TAB A DRAFT');
    rows.push(observe('tab A edited'));
    // tab B's write, exactly as withLocalStorage.set writes it
    const b = JSON.parse(window.localStorage.getItem('message') as string) as ActiveMessage;
    window.localStorage.setItem('message', JSON.stringify({ ...b, data: { ...b.data, content: 'TAB B DRAFT' } }));
    window.dispatchEvent(new Event('storage'));
    rows.push(observe('tab B wrote the store; tab A not reloaded'));
    at('/message/m/0/edit', 'unauthenticated');
    rows.push(observe('tab A reloaded'));
    table.push({ scenario: 'S5', rows });
    expect(rows.length).toBe(3);
  });

  it('writes the table', () => {
    writeFileSync(process.env.AN2_OUT ?? '/dev/null', JSON.stringify(table, null, 1));
  });
});
