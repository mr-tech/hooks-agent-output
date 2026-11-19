import { readFileSync } from 'node:fs';

import { act } from 'react';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';

import { mountInMessageProvider } from './helpers/mountMessageProvider';

import { unmountDom } from '~/components/__tests__/helpers/dom';
import { useMessage } from '~/providers/MessageProvider';

vi.mock('~/env.mjs', async () => (await import('./helpers/messageProviderDeps')).ENV_MOCK);
vi.mock('next/navigation', async () => (await import('./helpers/messageProviderDeps')).navigationMock('/message/m/0/edit'));
vi.mock('next-auth/react', async () => (await import('./helpers/messageProviderDeps')).AUTH_MOCK);
vi.mock('~/providers/GuildProvider', async () => (await import('./helpers/messageProviderDeps')).GUILD_PROVIDER_MOCK);
vi.mock('~/providers/WebhookProvider', async () => (await import('./helpers/messageProviderDeps')).WEBHOOK_PROVIDER_MOCK);
vi.mock('~/providers/ConfirmationProvider', async () => (await import('./helpers/messageProviderDeps')).CONFIRMATION_PROVIDER_MOCK);
vi.mock('~/utils/api', async () => (await import('./helpers/messageProviderDeps')).buildApiMock({}));

afterEach(() => {
  unmountDom();
  window.localStorage.clear();
});

let ctx: ReturnType<typeof useMessage> | null = null;
const Probe: FC = () => {
  ctx = useMessage();
  return null;
};

describe('the 1ad625e provider at route 0, reading the legacy key a tip run wrote', () => {
  it('shows the draft', () => {
    const written = readFileSync(process.env.LEGACY_IN as string, 'utf8');
    window.localStorage.setItem('message', written);

    act(() => { mountInMessageProvider(<Probe />); });

    const seeded = JSON.parse(written) as { name: string, data: { content: string, embeds: unknown[] } };
    expect({ name: ctx?.message?.name, content: (ctx?.message?.data as { content: string }).content })
      .toEqual({ name: seeded.name, content: seeded.data.content });
    expect((ctx?.message?.data as { embeds: unknown[] }).embeds).toHaveLength(1);
  });
});
