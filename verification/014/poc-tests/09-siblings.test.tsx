import { act } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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

vi.mock('~/providers/IsMobileProvider', () => ({
  useIsMobile: () => false,
  default: ({ children }: { children: React.ReactNode }) => children,
}));
vi.mock('~/utils/hooks/useGuildDropdownItems', () => ({ default: () => [] }));

import NewMessageModal from '~/app/message/_components/NewMessageModal';
import SaveAsMenu from '~/app/message/m/[id]/_components/SaveAsMenu';

function mount(ui: React.ReactNode) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  act(() => { root.render(<QueryClientProvider client={qc}>{ui}</QueryClientProvider>); });
  return container;
}

describe('sibling components named by the source-text corpus', () => {
  it('NewMessageModal mounts open', () => {
    const el = mount(<NewMessageModal open onClose={() => {}} />);
    // eslint-disable-next-line no-console
    console.log('NewMessageModal html:', el.innerHTML.length, '| body html:', document.body.innerHTML.length);
    expect(document.body.innerHTML.length).toBeGreaterThan(0);
  });

  it('SaveAsMenu mounts open', () => {
    const message = { name: 'x', data: { content: 'hi' }, updatedAt: 1, guildId: null } as never;
    const el = mount(<SaveAsMenu isOpen message={message} onClose={() => {}} />);
    // eslint-disable-next-line no-console
    console.log('SaveAsMenu html:', el.innerHTML.length, '| body html:', document.body.innerHTML.length);
    expect(document.body.innerHTML.length).toBeGreaterThan(0);
  });
});
