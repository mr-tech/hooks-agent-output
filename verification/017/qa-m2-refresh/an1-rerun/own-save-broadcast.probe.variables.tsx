// Copy of verification/017/analysis/an1/own-save-broadcast.probe.tsx; one change: onSuccess receives the mutation's
// variables as its second argument, as react-query calls it (needed from website d9ebe97..dd26104, whose onSuccess reads them).
// Analysis probe (not a suite file): does a save raise "Message Update Detected" in the tab that saved?
// Server side: the hash upsertMessage broadcasts is hashMessage(<tRPC-parsed input>.message); the
// parse is the upsert route's own input schema, z.object({ message: optionalIdMessageShape }).
// Client side: the real MessageProvider + usePusher, with pusher-js replaced by a capture of the
// bound 'message-update' handler, and showConfirmation by a spy.
import { act } from 'react';
import {
  describe, expect, it, vi, afterEach,
} from 'vitest';
import { z } from 'zod';
import { writeFileSync } from 'node:fs';

import { normalizeForHash } from '../usePusher';

import { mountInMessageProvider } from './helpers/mountMessageProvider';

import type { ContentLossOption } from '~/utils';

import { unmountDom } from '~/components/__tests__/helpers/dom';
import { useMessage } from '~/providers/MessageProvider';
import { optionalIdMessageShape } from '~/server/api/utils/shapes';
import { isMessageValid } from '~/server/api/utils/messageValidity';
import { hashMessage } from '~/utils';

const hoisted = vi.hoisted(() => ({
  inputs: [] as unknown[],
  mutOpts: [] as Record<string, unknown>[],
  handler: null as null | ((hash: string) => void),
  subscribed: [] as string[],
  confirm: [] as unknown[],
  stored: {
    id: '42', name: 'Stored', updatedAt: 1, data: {} as Record<string, unknown>,
  },
}));

vi.mock('pusher-js', () => ({
  default: class {
    subscribe(name: string) {
      hoisted.subscribed.push(name);
      return {
        bind: (event: string, cb: (hash: string) => void) => { if (event === 'message-update') hoisted.handler = cb; },
        unbind: () => { hoisted.handler = null; },
      };
    }

    unsubscribe() { /* none */ }
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
const rows: Record<string, unknown>[] = [];

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

type Step = { edit?: Record<string, unknown>, choose?: MessageMode, editInFlight?: Record<string, unknown> };
type Order = 'broadcast-then-response' | 'response-then-broadcast';

function run(member: string, stored: Record<string, unknown>, step: Step, order: Order) {
  window.localStorage.clear();
  hoisted.stored = { ...hoisted.stored, data: JSON.parse(JSON.stringify(stored)) };
  act(() => { mountInMessageProvider(<Probe />); });
  const row: Record<string, unknown> = {
    member, order, subscribed: hoisted.subscribed.at(-1), heldAtMount: JSON.stringify((cur().message as ActiveMessage).data),
  };
  if (step.edit) {
    act(() => { cur().updateMessage({ data: { ...(cur().message as ActiveMessage).data, ...step.edit } as never }); });
  }
  act(() => { cur().saveMessage(); });
  if (step.choose) {
    row.dialogShown = !!cur().pendingSaveChoice;
    const option = cur().pendingSaveChoice?.options.find((o) => o.mode === step.choose);
    act(() => { cur().commitSaveChoice(option as ContentLossOption); });
  }
  row.requests = hoisted.inputs.length;
  row.pendingDialog = !!cur().pendingSaveChoice;
  row.sent = JSON.stringify((hoisted.inputs[0] as { message?: { data?: unknown } } | undefined)?.message?.data);
  const input = hoisted.inputs[0] as { message: Record<string, unknown> };
  const parsed = upsertInput.safeParse(input);
  row.serverParse = parsed.success ? 'ok' : `rejected (${parsed.error.issues.map((i) => i.path.join('.')).join(',')})`;
  if (!parsed.success) {
    row.broadcast = 'none (route rejects input before upsertMessage; no pusher.trigger)';
    row.notice = hoisted.confirm.length > 0;
    rows.push(row);
    return row;
  }
  row.storedValid = isMessageValid(parsed.data.message.data);
  const serverHash = hashMessage(parsed.data.message as never);
  row.serverHash = serverHash;
  if (step.editInFlight) {
    act(() => { cur().updateMessage({ data: { ...(cur().message as ActiveMessage).data, ...step.editInFlight } as never }); });
  }
  const deliverResponse = () => act(() => {
    (hoisted.mutOpts[0].onSuccess as (m: unknown, v: unknown) => void)({ ...parsed.data.message, id: '42' }, input);
  });
  const deliverBroadcast = () => {
    row.clientHashAtDelivery = hashMessage(normalizeForHash(cur().message as ActiveMessage));
    act(() => { hoisted.handler?.(serverHash); });
  };
  if (order === 'broadcast-then-response') { deliverBroadcast(); deliverResponse(); } else { deliverResponse(); deliverBroadcast(); }
  row.handlerBound = true;
  row.notice = hoisted.confirm.length > 0;
  rows.push(row);
  return row;
}

const CLASSIC = { content: 'hello', embeds: [{ title: 't' }] };
const V2 = { flags: 32768, components: [{ type: 17, components: [{ type: 10, content: 'x' }] }] };
const V2_WITH_CONTENT = { ...V2, content: 'hi', embeds: [] };
const NOT_VALID = { content: '' };
const NOT_VALID_SHAPE = { content: 'hi', avatar_url: 'not-a-url' };

const MEMBERS: [string, Record<string, unknown>, Step][] = [
  ['classic / nothing changed', CLASSIC, {}],
  ['classic / after an edit', CLASSIC, { edit: { content: 'hello again' } }],
  ['classic / after an edit leaving trailing whitespace', CLASSIC, { edit: { content: 'hello again  ' } }],
  ['v2 / nothing changed', V2, {}],
  ['v2 / after an edit', V2, { edit: { components: [{ type: 17, components: [{ type: 10, content: 'y' }] }] } }],
  ['v2 / beside an empty embed (gate drops it, no dialog)', { ...V2, embeds: [{}] }, {}],
  ['dialog / v2 with content, choose Classic', V2_WITH_CONTENT, { choose: 'classic' }],
  ['dialog / v2 with content, choose V2', V2_WITH_CONTENT, { choose: 'v2' }],
  ['not-valid (passes shape, valid=false) / nothing changed', NOT_VALID, {}],
  ['not-valid (passes shape, valid=false) / after an edit', NOT_VALID, { edit: { content: '   ' } }],
  ['not-valid (fails shape) / nothing changed', NOT_VALID_SHAPE, {}],
  ['OUTSIDE CLASS: classic / edit typed after Save, before delivery', CLASSIC, { editInFlight: { content: 'typed later' } }],
];

describe('own-tab broadcast', () => {
  for (const order of ['broadcast-then-response', 'response-then-broadcast'] as const) {
    for (const [name, stored, step] of MEMBERS) {
      it(`${name} [${order}]`, () => {
        const row = run(name, stored, step, order);
        expect(row.requests).toBe(1);
      });
    }
  }
  it('writes the table', () => {
    writeFileSync(process.env.AN1_OUT ?? '/dev/null', JSON.stringify(rows, null, 1));
  });
});
