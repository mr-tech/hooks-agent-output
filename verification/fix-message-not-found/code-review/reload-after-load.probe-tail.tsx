// Probe tail: appended to lines 1-132 of website 6b539e5
// src/app/message/m/[id]/_components/__tests__/MessageNotFound.edit-and-send-pages.test.tsx (its mocks, server and
// lifecycle hooks) by build-reload-probe.sh. Question: after a successful load, a reload that answers NOT_FOUND —
// what does the edit page show, and what does the provider still hold?
import { writeFileSync } from 'node:fs';

import { useMessage } from '~/providers/MessageProvider';

const OWNED_ID = '900000000000101';
const probeWorld = { rowExists: true };
const seen: { hasChanged?: boolean, messageHeld?: boolean } = {};

beforeEach(() => {
  getOneRequests.length = 0;
  probeWorld.rowExists = true;
  mocks.db = createCapturingDatabase(({ sql, parameters }) => {
    if (sql.startsWith('select "userId" from "Accounts"')) return [{ userId: '900000000000001' }];
    if (sql.includes('left join "ScheduledMessages"')) {
      return probeWorld.rowExists && String(parameters[0]) === OWNED_ID ? [{
        id: OWNED_ID, createdAt: new Date(0), updatedAt: new Date(0), name: 'mine', data: { content: 'mine' },
        previewImageNonce: null, recentWebhookId: null, recentThreadId: null, recentMessageId: null, guildId: null,
        scheduledMessageId: null, scheduledMessageCron: null, scheduledMessageError: null,
        scheduledMessageSendAt: null, scheduledMessageSent: null,
      }] : [];
    }
    if (sql.startsWith('select "fk_users_id" from "Messages"')) {
      return probeWorld.rowExists ? [{ fk_users_id: '900000000000001' }] : [];
    }
    return [];
  }).db;
  vi.stubGlobal('fetch', (input: string | URL, init?: RequestInit) => nodeFetch(new URL(input, origin), init));
});

afterEach(() => {
  unmountDom();
  vi.unstubAllGlobals();
});

const Reload = () => {
  const { reloadMessage, updateMessage, hasChanged, message } = useMessage();
  seen.hasChanged = hasChanged;
  seen.messageHeld = !!message;
  return (
    <>
      <button type='button' data-reload onClick={() => reloadMessage()}>reload</button>
      <button type='button' data-edit onClick={() => updateMessage({ data: { content: 'unsaved edit' } as never })}>edit</button>
    </>
  );
};

it('probe: reload answering NOT_FOUND after a successful load', async () => {
  mocks.pathname = `/message/m/${OWNED_ID}/edit`;
  const container = mountDom(
    <TrpcProvider>
      <MessageProvider>
        <Reload />
        <EditPage />
      </MessageProvider>
    </TrpcProvider>,
  );
  await vi.waitFor(() => { expect(container.querySelector('[data-editor]')).not.toBeNull(); });
  await act(async () => { (container.querySelector('[data-edit]') as HTMLButtonElement).click(); });
  const beforeReload = { hasChanged: seen.hasChanged, editor: !!container.querySelector('[data-editor]') };

  probeWorld.rowExists = false;
  await act(async () => { (container.querySelector('[data-reload]') as HTMLButtonElement).click(); });
  await vi.waitFor(() => { expect(getOneRequests).toContain(404); });
  await new Promise((r) => { setTimeout(r, 200); });

  const afterReload = {
    notice: container.textContent?.includes(NOT_FOUND_TEXT) ?? false,
    editor: !!container.querySelector('[data-editor]'),
    hasChanged: seen.hasChanged,
    messageHeld: seen.messageHeld,
    requests: [...getOneRequests],
  };
  writeFileSync(String(process.env.RELOAD_OUT), JSON.stringify({ beforeReload, afterReload }));
  expect(beforeReload).toEqual({ hasChanged: true, editor: true });
});
