import { act, use } from 'react';
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

import MessageProvider, { useMessage } from '~/providers/MessageProvider';

let seen: ReturnType<typeof useMessage> | null = null;
function Probe() {
  seen = useMessage();
  return <span>probe:{seen.message ? 'has-message' : 'no-message'}</span>;
}

describe('MessageProvider', () => {
  it('mounts and supplies a context to a consumer', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => { root.render(<MessageProvider><Probe /></MessageProvider>); });
    // eslint-disable-next-line no-console
    console.log('text:', container.textContent, '| keys:', seen ? Object.keys(seen).length : 'none');
    expect(container.textContent).toContain('probe:');
    expect(seen).toBeTruthy();
    expect(typeof seen!.saveMessage).toBe('function');
    expect(seen!.isLoading).toBe(false);
  });
});
