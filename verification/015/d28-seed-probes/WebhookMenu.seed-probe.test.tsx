// Probe (no fix): does WebhookMenu's selectedCategory follow hasWebhooks after mount?
import { appendFileSync } from 'node:fs';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

import WebhookMenu from '../index';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('next-auth/react', () => ({ useSession: () => ({ status: 'authenticated', data: { user: { guilds: [] } } }) }));
vi.mock('~/providers/IsMobileProvider', () => ({ useIsMobile: () => false }));
vi.mock('next/image', () => ({ default: () => null }));
const state = vi.hoisted(() => ({
  guild: { current: {} as Record<string, unknown> },
  accordion: { selected: undefined as unknown, onChange: undefined as unknown },
}));
vi.mock('~/providers/WebhookProvider', () => ({
  useWebhook: () => ({
    url: '', threadId: '', threadName: '', isWebhookLoading: false, selectedWebhook: null,
    setUrl: () => {}, setThreadId: () => {}, setThreadName: () => {}, setSelectedWebhook: () => {}, resetWebhook: () => {},
  }),
}));
vi.mock('~/providers/GuildProvider', () => ({ useGuild: () => state.guild.current }));
vi.mock('~/providers/MessageProvider', () => ({ useMessage: () => ({ isLoading: false }) }));
vi.mock('~/components/StyledAccordion', () => ({
  default: (props: { selected: unknown, onChange: unknown }) => {
    state.accordion.selected = props.selected; state.accordion.onChange = props.onChange; return null;
  },
}));

let root: ReturnType<typeof createRoot> | null = null;
let host: HTMLDivElement | null = null;
afterEach(() => { if (root) act(() => root!.unmount()); host?.remove(); root = null; host = null; });
const out = (line: string) => appendFileSync(process.env.PROBE_OUT ?? '/dev/null', `${line}\n`);

const guildState = (withWebhooks: boolean, guildId: string | null) => ({
  guild: guildId ? { id: guildId, name: 'G' } : undefined,
  channels: [], isFetchingChannels: false, guildId,
  webhooks: withWebhooks ? [{ id: 'w1', guild_id: 'g1', channel_id: 'c1', name: 'hook', token: 'x' }] : [],
});
const render = () => act(() => { root!.render(<WebhookMenu />); });
function mount() { host = document.createElement('div'); document.body.appendChild(host); root = createRoot(host); }

describe('WebhookMenu selectedCategory seed', () => {
  it('(a) no webhooks at mount, then webhooks arrive, no input', () => {
    state.guild.current = guildState(false, 'g1'); mount(); render();
    const before = state.accordion.selected;
    state.guild.current = guildState(true, 'g1'); render();
    out(`(a) no webhooks at mount: selected=${JSON.stringify(before)}; webhooks arrive (guild g1), no input: selected=${JSON.stringify(state.accordion.selected)}`);
    expect(before).toBe('load');
  });
  it('(a2) webhooks at mount, then guild changes g1 -> g2, no input', () => {
    state.guild.current = guildState(true, 'g1'); mount(); render();
    const before = state.accordion.selected;
    state.guild.current = guildState(true, 'g2'); render();
    out(`(a2) webhooks at mount (guild g1): selected=${JSON.stringify(before)}; guild -> g2 with webhooks, no input: selected=${JSON.stringify(state.accordion.selected)}`);
    expect(before).toBe('g1');
  });
  it('(b) after a user selection, webhooks arrive', () => {
    state.guild.current = guildState(false, 'g1'); mount(); render();
    act(() => (state.accordion.onChange as (id: string) => void)('custom-pick'));
    const picked = state.accordion.selected;
    state.guild.current = guildState(true, 'g1'); render();
    out(`(b) user picked ${JSON.stringify(picked)}; webhooks arrive: selected=${JSON.stringify(state.accordion.selected)}`);
    expect(picked).toBe('custom-pick');
  });
});
