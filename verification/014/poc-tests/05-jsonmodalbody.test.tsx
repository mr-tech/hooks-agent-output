import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, it, vi } from 'vitest';

vi.mock('~/env.mjs', () => ({
  env: {
    NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test',
    NEXT_PUBLIC_PUSHER_KEY: 'test-key',
    NEXT_PUBLIC_PUSHER_CLUSTER: 'test-cluster',
  },
}));

const push = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push, replace: vi.fn(), refresh: vi.fn(), back: vi.fn() }),
  usePathname: () => '/message/m/0',
  useSearchParams: () => new URLSearchParams(''),
}));

vi.mock('next-auth/react', () => ({
  useSession: () => ({ status: 'unauthenticated', data: null }),
  signIn: vi.fn(),
}));

// Auto-vivifying tRPC stub: any api.<router>.<proc>.useQuery/useMutation resolves.
vi.mock('~/utils/api', () => {
  const noQuery = {
    isFetching: false, isLoading: false, isPending: false, data: undefined,
    error: null, refetch: () => Promise.resolve(), fetchStatus: 'idle',
  };
  const noMutation = {
    mutate: () => {}, mutateAsync: () => Promise.resolve(undefined),
    isPending: false, isLoading: false, reset: () => {},
  };
  const leaf: Record<string, unknown> = {
    useQuery: () => noQuery,
    useMutation: () => noMutation,
    useInfiniteQuery: () => noQuery,
    useUtils: () => new Proxy({}, { get: () => () => Promise.resolve(undefined) }),
  };
  const node: unknown = new Proxy({}, {
    get(_t, prop: string) {
      if (prop in leaf) return leaf[prop];
      if (prop === 'then' || prop === Symbol.toStringTag) return undefined;
      return node;
    },
  });
  return { api: node };
});

vi.mock('~/providers/GuildProvider', () => ({
  useGuild: () => ({ webhooks: [], setGuildId: vi.fn() }),
}));
vi.mock('~/providers/WebhookProvider', () => ({
  useWebhook: () => ({ setThreadId: vi.fn(), setSelectedWebhook: vi.fn() }),
}));
vi.mock('~/providers/ConfirmationProvider', () => ({
  useConfirmation: () => ({ showConfirmation: vi.fn(), withConfirmation: (fn: unknown) => fn }),
}));

import MessageProvider from '~/providers/MessageProvider';
import JsonModalBody from '~/app/message/m/[id]/_components/JsonModalBody';

describe('JsonModalBody', () => {
  it('mounts inside a real MessageProvider and seeds the editor', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    const onClose = vi.fn();
    const setAllowMenuClose = vi.fn();
    act(() => {
      root.render(
        <MessageProvider>
          <JsonModalBody onClose={onClose} setAllowMenuClose={setAllowMenuClose} />
        </MessageProvider>,
      );
    });
    // eslint-disable-next-line no-console
    console.log('cm:', container.querySelectorAll('.cm-editor').length, '| text:', JSON.stringify(container.textContent).slice(0, 300));
    expect(container.querySelectorAll('.cm-editor').length).toBe(1);
    expect(container.textContent).toContain('Load');
  });
});
