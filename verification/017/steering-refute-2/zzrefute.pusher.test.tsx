import { act } from 'react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

import { mountInMessageProvider } from './helpers/mountMessageProvider';

import type { ContentLossOption } from '~/utils';

import { unmountDom } from '~/components/__tests__/helpers/dom';
import { useMessage } from '~/providers/MessageProvider';
import { optionalIdMessageShape } from '~/server/api/utils/shapes';
import { hashMessage } from '~/utils';

const h = vi.hoisted(() => ({
  stored: { id: '42', name: 'Stored', updatedAt: 1, data: {} as Record<string, unknown> },
  inputs: [] as any[],
  handlers: [] as ((hash: string) => void)[],
  confirm: vi.fn(),
}));

vi.mock('~/env.mjs', async () => (await import('./helpers/messageProviderDeps')).ENV_MOCK);
vi.mock('next/navigation', async () => (await import('./helpers/messageProviderDeps')).navigationMock('/message/m/42/edit'));
vi.mock('next-auth/react', () => ({ useSession: () => ({ status: 'authenticated', data: null }), signIn: vi.fn() }));
vi.mock('~/providers/GuildProvider', async () => (await import('./helpers/messageProviderDeps')).GUILD_PROVIDER_MOCK);
vi.mock('~/providers/WebhookProvider', async () => (await import('./helpers/messageProviderDeps')).WEBHOOK_PROVIDER_MOCK);
vi.mock('~/providers/ConfirmationProvider', () => ({
  useConfirmation: () => ({ showConfirmation: h.confirm, withConfirmation: (f: unknown) => f }),
}));
vi.mock('pusher-js', () => ({
  default: class {
    subscribe() { return { bind: (_e: string, cb: (x: string) => void) => { h.handlers.push(cb); }, unbind() {} }; }
    unsubscribe() {}
  },
}));
vi.mock('~/utils/api', async () => {
  const { buildApiMock } = await import('./helpers/messageProviderDeps');
  return buildApiMock({
    queryData: { 'message.getOne': () => h.stored },
    onMutation: { 'message.upsert': (_o, input) => { h.inputs.push(input); } },
  });
});

let ctx: ReturnType<typeof useMessage> | null = null;
const Probe: FC = () => { ctx = useMessage(); return null; };
const cur = () => ctx as ReturnType<typeof useMessage>;

beforeEach(() => { localStorage.clear(); h.inputs.length = 0; h.handlers.length = 0; h.confirm.mockClear(); });
afterEach(() => { unmountDom(); });

// What the server broadcasts: trpc JSON transport -> zod input parse -> hashMessage(message)
function serverHash(input: any) {
  const wire = JSON.parse(JSON.stringify(input));
  const parsed = optionalIdMessageShape.parse(wire.message);
  return hashMessage(parsed);
}
function fireOwnBroadcast() {
  expect(h.inputs).toHaveLength(1);
  const hash = serverHash(h.inputs[0]);
  expect(h.handlers.length).toBeGreaterThan(0);
  act(() => { h.handlers.forEach((cb) => cb(hash)); });
}

const CLASSIC = { content: 'hello' };
const V2 = { flags: 32768, components: [{ type: 17, components: [{ type: 10, content: 'x' }] }] };
const NOT_VALID = { content: '   ' }; // passes shape, fails content requirement (blank)
const MIXED = { flags: 32768, content: 'hi', embeds: [], components: [{ type: 17, components: [{ type: 10, content: 'x' }] }] };
const EDIT_CLASSIC = { content: 'hello edited ' };
const EDIT_V2 = { flags: 32768, components: [{ type: 17, components: [{ type: 10, content: 'y ' }] }] };

function mount(data: Record<string, unknown>) {
  h.stored.data = data;
  act(() => { mountInMessageProvider(<Probe />); });
}

const cases: [string, Record<string, unknown>, Record<string, unknown> | null][] = [
  ['classic', CLASSIC, EDIT_CLASSIC],
  ['v2', V2, EDIT_V2],
  ['not-valid(blank)', NOT_VALID, { content: '  ' }],
];

describe('own-save broadcast vs client hash', () => {
  for (const [name, data, edit] of cases) {
    it(`${name}: nothing changed -> no notice`, () => {
      mount(data);
      act(() => { cur().saveMessage(); });
      fireOwnBroadcast();
      expect(h.confirm).not.toHaveBeenCalled();
    });
    it(`${name}: after edit -> no notice`, () => {
      mount(data);
      act(() => { cur().updateMessage({ data: { ...cur().message!.data, ...edit } }); });
      act(() => { cur().saveMessage(); });
      fireOwnBroadcast();
      expect(h.confirm).not.toHaveBeenCalled();
    });
    it(`${name}: edit typed during in-flight save -> notice`, () => {
      mount(data);
      act(() => { cur().saveMessage(); });
      act(() => { cur().updateMessage({ data: { ...cur().message!.data, content: 'typed meanwhile' } }); });
      fireOwnBroadcast();
      expect(h.confirm).toHaveBeenCalledTimes(1);
    });
  }

  for (const mode of ['classic', 'v2'] as const) {
    it(`choice dialog (mixed draft) -> ${mode}: no notice`, () => {
      mount(MIXED);
      act(() => { cur().saveMessage(); });
      const opt = cur().pendingSaveChoice?.options.find((o) => o.mode === mode) as ContentLossOption;
      expect(opt).toBeDefined();
      act(() => { cur().commitSaveChoice(opt); });
      fireOwnBroadcast();
      expect(h.confirm).not.toHaveBeenCalled();
    });
    it(`choice dialog after an edit -> ${mode}: no notice`, () => {
      mount(MIXED);
      act(() => { cur().updateMessage({ data: { ...cur().message!.data, content: 'hi there ' } }); });
      act(() => { cur().saveMessage(); });
      const opt = cur().pendingSaveChoice?.options.find((o) => o.mode === mode) as ContentLossOption;
      act(() => { cur().commitSaveChoice(opt); });
      fireOwnBroadcast();
      expect(h.confirm).not.toHaveBeenCalled();
    });
  }

  it('control: a foreign hash does raise the notice', () => {
    mount(CLASSIC);
    act(() => { h.handlers.forEach((cb) => cb('deadbeef')); });
    expect(h.confirm).toHaveBeenCalledTimes(1);
  });

  it('not-valid (fails shape): server input parse rejects, so no broadcast', () => {
    mount({ content: 'hi', avatar_url: 'not-a-url' });
    act(() => { cur().saveMessage(); });
    expect(h.inputs).toHaveLength(1);
    expect(optionalIdMessageShape.safeParse(JSON.parse(JSON.stringify(h.inputs[0])).message).success).toBe(false);
  });
});

const RICH: Record<string, Record<string, unknown>> = {
  embeds: { content: ' padded ', username: 'Bot ', embeds: [{ title: 'T ', description: 'd', color: 123, fields: [{ name: 'a ', value: 'b ', inline: true }], footer: { text: 'f ' }, timestamp: '2024-01-01T00:00:00.000Z' }], allowed_mentions: { parse: [] } },
  emptyEmbed: { content: 'x', embeds: [{}] },
  v2rich: { flags: 32768, components: [{ type: 17, accent_color: 5, components: [{ type: 10, content: 'hi ' }, { type: 14, divider: true, spacing: 1 }, { type: 9, components: [{ type: 10, content: 'sec' }], accessory: { type: 2, style: 5, label: 'Go ', url: 'https://example.com' } }, { type: 12, items: [{ media: { url: ' https://example.com/a.png' } }] }] }, { type: 1, components: [{ type: 2, style: 5, label: 'B ', url: 'https://example.com/b' }] }] },
  v2noflag: { components: [{ type: 17, components: [{ type: 10, content: 'hi' }] }] },
};
describe('richer drafts', () => {
  for (const [name, data] of Object.entries(RICH)) {
    it(`${name}: nothing changed`, () => {
      mount(data);
      act(() => { cur().saveMessage(); });
      if (cur().pendingSaveChoice) { console.log('RICH', name, 'asks'); return; }
      fireOwnBroadcast();
      expect(h.confirm).not.toHaveBeenCalled();
    });
    it(`${name}: after harmless edit`, () => {
      mount(data);
      act(() => { cur().updateMessage({ data: { ...cur().message!.data, username: 'Zed ' } }); });
      act(() => { cur().saveMessage(); });
      if (cur().pendingSaveChoice) { console.log('RICH', name, 'asks'); return; }
      fireOwnBroadcast();
      expect(h.confirm).not.toHaveBeenCalled();
    });
  }
});
