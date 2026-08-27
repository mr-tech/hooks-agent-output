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


vi.mock('~/providers/IsMobileProvider', () => ({
  useIsMobile: () => false,
  default: ({ children }: { children: React.ReactNode }) => children,
}));
// The page's mount effect eagerly prefetches nine heavy modules with `void import(...)`.
// Those promises resolve AFTER the test's environment is torn down, surfacing as
// EnvironmentTeardownError unhandled rejections that make the RUN exit non-zero even
// though every test passes. Stubbing the prefetch targets makes them resolve instantly.
// NOTE: vi.mock factories are HOISTED above every const in the file - each one must be
// self-contained; a shared `const stub` here throws "Cannot access 'stub' before initialization".
vi.mock('~/components/DiscordMessageEditor', () => ({ default: () => null }));
vi.mock('~/components/SlateEditor', () => ({ default: () => null }));
vi.mock('~/components/Markdown', () => ({ default: () => null }));
vi.mock('~/components/Tooltip', () => ({ default: () => null }));
vi.mock('~/components/EmojiPicker/Picker', () => ({ default: () => null }));
vi.mock('~/components/DiscordMessageEditor/components/EmbedEditor/ColorPicker/Picker', () => ({ default: () => null }));
vi.mock('~/components/Calendar', () => ({ default: () => null }));
vi.mock('~/components/ImageUploader', () => ({ default: () => null }));
vi.mock('~/components/Drawer', () => ({ default: () => null }));

import MessageProvider from '~/providers/MessageProvider';
import EditPage from '~/app/message/m/[id]/edit/page';

describe('message edit page', () => {
  it('mounts inside a real MessageProvider', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => {
      root.render(<MessageProvider><EditPage /></MessageProvider>);
    });
    // eslint-disable-next-line no-console
    console.log('html length:', container.innerHTML.length, '| text head:', JSON.stringify(container.textContent).slice(0, 200));
    expect(container.querySelector('#app-container')).toBeTruthy();
    // eslint-disable-next-line no-console
    console.log('aria-labels:', JSON.stringify([...container.querySelectorAll('[aria-label]')].map((n) => n.getAttribute('aria-label'))));
    // eslint-disable-next-line no-console
    console.log('buttons:', container.querySelectorAll('button').length, '| kbd:', container.querySelectorAll('kbd').length);
    expect(container.querySelectorAll('button').length).toBeGreaterThan(0);
    // Let the page's `void import(...)` prefetches settle BEFORE the environment tears
    // down; otherwise they reject as EnvironmentTeardownError and the RUN exits non-zero
    // even though every test passed.
    await act(async () => { await new Promise((r) => { setTimeout(r, 50); }); });
    act(() => { root.unmount(); });
    await act(async () => { await new Promise((r) => { setTimeout(r, 50); }); });
  });
});
