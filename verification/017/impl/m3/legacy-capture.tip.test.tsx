import { writeFileSync } from 'node:fs';
import { act } from 'react';
import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';

import { mountInMessageProvider } from './helpers/mountMessageProvider';

import type { FC } from 'react';

import { unmountDom } from '~/components/__tests__/helpers/dom';
import { useMessage } from '~/providers/MessageProvider';
import { INTRO_MESSAGE } from '~/utils/copyIntroMessage';

const hoisted = vi.hoisted(() => ({
  pathname: '/message/m/0/edit',
  status: 'unauthenticated' as 'authenticated' | 'unauthenticated' | 'loading',
  mutOpts: [] as Record<string, unknown>[],
  inputs: [] as unknown[],
  stored: {
    id: '42', name: 'Stored', updatedAt: 1000, data: { content: 'saved copy' } as Record<string, unknown>,
  },
}));

vi.mock('pusher-js', () => ({
  default: function Pusher() {
    return {
      subscribe: () => ({ bind: () => undefined, unbind: () => undefined }),
      unsubscribe: () => undefined,
    };
  },
}));
vi.mock('~/env.mjs', async () => (await import('./helpers/messageProviderDeps')).ENV_MOCK);
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: () => undefined, replace: () => undefined, refresh: () => undefined, back: () => undefined,
  }),
  usePathname: () => hoisted.pathname,
  useSearchParams: () => new URLSearchParams(''),
}));
vi.mock('next-auth/react', () => ({
  useSession: () => ({ status: hoisted.status, data: hoisted.status === 'authenticated' ? {} : null }),
  signIn: () => undefined,
}));
vi.mock('~/providers/GuildProvider', async () => (await import('./helpers/messageProviderDeps')).GUILD_PROVIDER_MOCK);
vi.mock('~/providers/WebhookProvider', async () => (await import('./helpers/messageProviderDeps')).WEBHOOK_PROVIDER_MOCK);
vi.mock('~/providers/ConfirmationProvider', () => ({
  useConfirmation: () => ({ showConfirmation: () => undefined, withConfirmation: (fn: unknown) => fn }),
}));
vi.mock('~/utils/api', async () => {
  const { buildApiMock } = await import('./helpers/messageProviderDeps');
  return buildApiMock({
    queryData: { 'message.getOne': () => (hoisted.pathname.includes('/m/0/') ? undefined : hoisted.stored) },
    onMutation: {
      'message.upsert': (opts, input) => { hoisted.mutOpts.push(opts); hoisted.inputs.push(input); },
    },
  });
});

let ctx: ReturnType<typeof useMessage> | null = null;
const Probe: FC = () => {
  ctx = useMessage();
  return null;
};
const cur = () => ctx as ReturnType<typeof useMessage>;
const content = () => (cur().message?.data as { content?: string }).content;

const TAB_KEY = 'messageDraftTab';
const openTab = (id: string) => { window.sessionStorage.setItem(TAB_KEY, id); };
const mount = () => { act(() => { mountInMessageProvider(<Probe />); }); };
const visit = (pathname: string, status = hoisted.status) => {
  hoisted.pathname = pathname;
  hoisted.status = status;
  act(() => { cur().toggleHelp(); });
};
const DRAFT_NAME = 'Name the user gave the draft';
const DRAFT_EMBED = { title: 'An embed title', description: 'An embed body' };
const draftData = (text: string) => ({ content: text, embeds: [DRAFT_EMBED] });
const restoredData = (text: string) => ({
  content: text, embeds: [{ ...DRAFT_EMBED, _key: expect.any(String) as unknown }],
});
const shown = () => ({ data: cur().message?.data, name: cur().message?.name });
const typeFullDraft = (text: string) => {
  act(() => { cur().updateMessage({ data: draftData(text) as never }); });
};
const typeDraft = (text: string) => {
  act(() => { cur().updateMessage({ data: { ...cur().message?.data, content: text } as never }); });
};

beforeEach(() => {
  hoisted.pathname = '/message/m/0/edit';
  hoisted.status = 'unauthenticated';
  hoisted.stored = {
    id: '42', name: 'Stored', updatedAt: 1000, data: { content: 'saved copy' },
  };
  openTab('A');
});

afterEach(() => {
  unmountDom();
  hoisted.mutOpts.length = 0;
  hoisted.inputs.length = 0;
  window.localStorage.clear();
  window.sessionStorage.clear();
});

describe('capture of the legacy key a tip run writes', () => {
  it('writes the string', () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(1_700_000_000_000);
    mount();
    typeFullDraft('revert-safe');
    vi.useRealTimers();
    writeFileSync(process.env.LEGACY_OUT as string, window.localStorage.getItem('message') as string);
    expect(window.localStorage.getItem('message')).not.toBeNull();
  });
});
