import { act } from 'react';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import { z } from 'zod';

import { mountInMessageProvider } from './helpers/mountMessageProvider';

import type { ContentLossOption } from '~/utils';

import { unmountDom } from '~/components/__tests__/helpers/dom';
import { useMessage } from '~/providers/MessageProvider';
import { optionalIdMessageShape } from '~/server/api/utils/shapes';
import { hashMessage } from '~/utils';

interface UpsertInput { message: { id?: string, name: string, data: Record<string, unknown> } }

const hoisted = vi.hoisted(() => ({
  inputs: [] as unknown[],
  mutOpts: [] as Record<string, unknown>[],
  handler: null as null | ((hash: string) => void),
  confirm: [] as unknown[],
  stored: {
    id: '42', name: 'Stored', updatedAt: 1, data: {} as Record<string, unknown>,
  },
}));

vi.mock('pusher-js', () => ({
  default: function Pusher() {
    return {
      subscribe: () => ({
        bind: (event: string, cb: (hash: string) => void) => { if (event === 'message-update') hoisted.handler = cb; },
        unbind: () => { hoisted.handler = null; },
      }),
      unsubscribe: () => undefined,
    };
  },
}));
vi.mock('~/env.mjs', async () => (await import('./helpers/messageProviderDeps')).ENV_MOCK);
vi.mock('next/navigation', async () => (await import('./helpers/messageProviderDeps')).navigationMock('/message/m/42/edit'));
vi.mock('next-auth/react', () => ({ useSession: () => ({ status: 'authenticated', data: {} }), signIn: () => {} }));
vi.mock('~/providers/GuildProvider', async () => (await import('./helpers/messageProviderDeps')).GUILD_PROVIDER_MOCK);
vi.mock('~/providers/WebhookProvider', async () => (await import('./helpers/messageProviderDeps')).WEBHOOK_PROVIDER_MOCK);
vi.mock('~/providers/ConfirmationProvider', () => ({
  useConfirmation: () => ({
    showConfirmation: (arg: unknown) => { hoisted.confirm.push(arg); },
    withConfirmation: (fn: unknown) => fn,
  }),
}));
vi.mock('~/utils/api', async () => {
  const { buildApiMock } = await import('./helpers/messageProviderDeps');
  return buildApiMock({
    queryData: { 'message.getOne': () => hoisted.stored },
    onMutation: {
      'message.upsert': (opts, input) => { hoisted.mutOpts.push(opts); hoisted.inputs.push(input); },
    },
  });
});

const upsertInput = z.object({ message: optionalIdMessageShape });

afterEach(() => {
  unmountDom();
  hoisted.inputs.length = 0;
  hoisted.mutOpts.length = 0;
  hoisted.confirm.length = 0;
  hoisted.handler = null;
  window.localStorage.clear();
});

let ctx: ReturnType<typeof useMessage> | null = null;
const Probe: FC = () => {
  ctx = useMessage();
  return null;
};
const cur = () => ctx as ReturnType<typeof useMessage>;
const data = () => (cur().message as ActiveMessage).data;

const CLASSIC = { content: 'hello', embeds: [{ title: 't' }] };
const V2 = { flags: 32768, components: [{ type: 17, components: [{ type: 10, content: 'x' }] }] };

function mountStored(stored: Record<string, unknown>) {
  window.localStorage.clear();
  hoisted.stored = { ...hoisted.stored, data: JSON.parse(JSON.stringify(stored)) };
  act(() => { mountInMessageProvider(<Probe />); });
}

const edit = (patch: Record<string, unknown>) => {
  act(() => { cur().updateMessage({ data: { ...data(), ...patch } as never }); });
};
const save = () => { act(() => { cur().saveMessage(); }); };

const serverHashOf = (input: unknown) => hashMessage(upsertInput.parse(input).message as never);
const sentHash = (index: number) => serverHashOf(hoisted.inputs[index]);
const remoteHash = (patch: Record<string, unknown>) => serverHashOf({
  message: { id: '42', name: 'Stored', data: { ...hoisted.stored.data, ...patch } },
});
const broadcast = (hash: string) => { act(() => { hoisted.handler?.(hash); }); };
const respond = (index: number) => {
  act(() => {
    (hoisted.mutOpts[index].onSuccess as (m: unknown) => void)({ ...(hoisted.inputs[index] as UpsertInput).message, id: '42' });
  });
};
const fail = (index: number) => {
  act(() => {
    (hoisted.mutOpts[index].onError as (e: unknown, v: unknown) => void)(new Error('network'), hoisted.inputs[index]);
  });
};
const noticeShown = () => hoisted.confirm.length > 0;

describe('MessageProvider, the saving tab and its own save', () => {
  const orders = [
    ['the broadcast arrives before the response', (i: number) => { broadcast(sentHash(i)); respond(i); }],
    ['the broadcast arrives after the response', (i: number) => { respond(i); broadcast(sentHash(i)); }],
  ] as const;

  describe.each(orders)('%s', (_order, deliver) => {
    it.each([
      ['a classic message, nothing changed', CLASSIC, {}],
      ['a classic message after an edit', CLASSIC, { content: 'hello again' }],
      ['a classic message after an edit leaving trailing whitespace', CLASSIC, { content: 'hello again  ' }],
      ['a V2 message, nothing changed', V2, {}],
      ['a V2 message after an edit', V2, { components: [{ type: 17, components: [{ type: 10, content: 'y' }] }] }],
      ['a V2 message beside an empty embed', { ...V2, embeds: [{}] }, {}],
      ['a message not valid for sending, nothing changed', { content: '' }, {}],
      ['a message not valid for sending, after an edit', { content: '' }, { content: '   ' }],
    ])('raises no notice in the saving tab: %s', (_title, stored, patch) => {
      mountStored(stored);
      if (Object.keys(patch).length) edit(patch);
      save();
      expect(hoisted.inputs).toHaveLength(1);

      deliver(0);

      expect(noticeShown()).toBe(false);
    });

    it.each([['Classic', 'classic'], ['V2', 'v2']] as const)(
      'raises no notice after the content-loss dialog chose %s',
      (_label, mode) => {
        mountStored({ ...V2, content: 'hi', embeds: [] });
        save();
        act(() => {
          cur().commitSaveChoice(cur().pendingSaveChoice?.options.find((o) => o.mode === mode) as ContentLossOption);
        });
        expect(hoisted.inputs).toHaveLength(1);

        deliver(0);

        expect(noticeShown()).toBe(false);
      },
    );

    it('raises no notice when an edit is typed after Save and before the broadcast arrives', () => {
      mountStored(CLASSIC);
      save();
      edit({ content: 'typed later' });

      deliver(0);

      expect(noticeShown()).toBe(false);
    });

    it('raises no notice for a save that carries a field the server drops, when an edit follows Save', () => {
      mountStored({ ...CLASSIC, unknown_field: 'x' });
      save();
      edit({ content: 'typed later' });

      deliver(0);

      expect(noticeShown()).toBe(false);
    });

    it('raises no notice for either of two saves in flight when edits follow the second', () => {
      mountStored(CLASSIC);
      edit({ content: 'first' });
      save();
      edit({ content: 'second' });
      save();
      edit({ content: 'third' });

      deliver(0);
      deliver(1);

      expect(noticeShown()).toBe(false);
    });
  });

  it('raises no notice for two identical saves, their broadcasts, and an edit after the second', () => {
    mountStored(CLASSIC);
    save();
    save();
    edit({ content: 'typed later' });

    broadcast(sentHash(0));
    broadcast(sentHash(1));

    expect(noticeShown()).toBe(false);
  });

  it('raises the notice when another tab saves content this tab never sent', () => {
    mountStored(CLASSIC);

    broadcast(remoteHash({ content: 'from another tab' }));

    expect(hoisted.confirm).toHaveLength(1);
  });

  it('raises the notice when another tab saves while this tab has unsaved edits, naming the loss', () => {
    mountStored(CLASSIC);
    edit({ content: 'unsaved' });

    broadcast(remoteHash({ content: 'from another tab' }));

    expect((hoisted.confirm[0] as { message: string }).message).toContain('Any changes you have made will be lost.');
  });

  it('raises the notice when another tab saves a component-only edit', () => {
    mountStored(CLASSIC);

    const button = {
      type: 2, style: 5, label: 'l', url: 'https://example.com',
    };
    broadcast(remoteHash({ components: [{ type: 1, components: [button] }] }));

    expect(hoisted.confirm).toHaveLength(1);
  });

  it('raises the notice when another tab saves while this tab\'s own save is in flight', () => {
    mountStored(CLASSIC);
    edit({ content: 'mine' });
    save();

    broadcast(remoteHash({ content: 'from another tab' }));

    expect(hoisted.confirm).toHaveLength(1);
  });

  it('raises the notice when another tab saves content this tab sent earlier and has already seen broadcast', () => {
    mountStored(CLASSIC);
    edit({ content: 'P' });
    save();
    broadcast(sentHash(0));
    respond(0);
    edit({ content: 'Q' });

    broadcast(sentHash(0));

    expect(hoisted.confirm).toHaveLength(1);
  });

  it('raises no notice when another tab saves what this tab already shows', () => {
    mountStored(CLASSIC);
    edit({ content: 'same' });

    broadcast(remoteHash({ content: 'same' }));

    expect(noticeShown()).toBe(false);
  });

  it('raises the notice for a later save of the content of a save that failed', () => {
    mountStored(CLASSIC);
    edit({ content: 'P' });
    save();
    fail(0);
    edit({ content: 'Q' });

    broadcast(sentHash(0));

    expect(hoisted.confirm).toHaveLength(1);
  });

  it('raises no notice for the broadcast of an identical save still in flight when one of two failed', () => {
    mountStored(CLASSIC);
    save();
    save();
    edit({ content: 'typed later' });
    fail(0);

    broadcast(sentHash(1));

    expect(noticeShown()).toBe(false);
  });

  it('raises only the other tab\'s notice when its save arrives between this tab\'s save and that save\'s broadcast, and an edit follows', () => {
    mountStored(CLASSIC);
    edit({ content: 'mine' });
    save();
    broadcast(remoteHash({ content: 'from another tab' }));
    edit({ content: 'typed later' });

    broadcast(sentHash(0));

    expect(hoisted.confirm).toHaveLength(1);
  });
});
