import { act } from 'react';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import { EditorView } from '@codemirror/view';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import NewMessageModal from '../NewMessageModal';

import press, { findButton } from '~/components/__tests__/helpers/press';
import { mountDom, unmountDom } from '~/components/__tests__/helpers/dom';
import discordResponseToMessage from '~/utils/discordResponseToMessage';

// Each factory inlines its own dynamic import of the mock-only `messageProviderDeps` module — see
// JsonModalBody.load-settled-notice.test.tsx for why (vi.mock's hoist analysis rejects any
// outside identifier, including a same-file const, inside the factory body).
vi.mock('~/env.mjs', async () => (await import('~/providers/MessageProvider/__tests__/helpers/messageProviderDeps')).ENV_MOCK);
vi.mock('next/navigation', async () => (await import('~/providers/MessageProvider/__tests__/helpers/messageProviderDeps')).navigationMock());
vi.mock('next-auth/react', async () => (await import('~/providers/MessageProvider/__tests__/helpers/messageProviderDeps')).AUTH_MOCK);

let capturedUpsertInput: unknown;
let linkImport: unknown;
vi.mock('~/utils/api', async () => {
  const { buildApiMock } = await import('~/providers/MessageProvider/__tests__/helpers/messageProviderDeps');
  return buildApiMock({
    queryData: { 'message.getFromUrl': () => linkImport },
    onMutation: {
      'message.upsert': (_opts, input) => { capturedUpsertInput = input; },
    },
  });
});

// Tooltip is dynamic()-loaded and reads `useIsMobile()`, which needs an `IsMobileProvider`
// ancestor NewMessageModal doesn't provide on its own — irrelevant to the write path under test,
// so replaced with a pass-through rather than adding that provider.
let previewed: MessageData | undefined;
vi.mock('~/components/MessagePreview', () => ({
  default: (props: { messageData: MessageData }) => { previewed = props.messageData; return null; },
}));

vi.mock('~/components/dynamics/Tooltip', () => ({ default: (props: { children: unknown }) => props.children }));

afterEach(unmountDom);

// `PresetDialog` (headlessui `Dialog`) renders into a portal on `document.body`, not into the
// mount container — the container's own subtree stays empty. Every query below therefore
// searches `document.body`.
function mount() {
  const queryClient = new QueryClient();
  mountDom(
    <QueryClientProvider client={queryClient}>
      <NewMessageModal open onClose={() => {}} />
    </QueryClientProvider>,
  );
  return document.body;
}

// `NewMessageJsonInput` is next/dynamic()-loaded (`ssr: false`) but is always present in the DOM —
// TransitionHeightElement renders every accordion panel's children regardless of which tab is
// selected, only animating height/visibility — so the JSON tab's editor can be driven directly
// without first clicking the accordion header. How long the dynamic import takes to resolve
// depends on how loaded the machine is (observed: 100ms suffices alone, not always when the full
// suite's node and dom projects run concurrently), so this polls for the editor rather than
// sleeping a fixed amount.
async function waitForJsonEditor(): Promise<HTMLElement> {
  const deadline = Date.now() + 5000;
  for (;;) {
    const el = document.body.querySelector('.cm-editor') as HTMLElement | null;
    if (el) return el;
    if (Date.now() > deadline) throw new Error('NewMessageJsonInput\'s CodeMirror editor never appeared');
    // eslint-disable-next-line no-await-in-loop
    await act(async () => { await new Promise((r) => { setTimeout(r, 25); }); });
  }
}

async function typeJson(json: string) {
  const editorEl = await waitForJsonEditor();
  const view = EditorView.findFromDOM(editorEl)!;
  await act(async () => {
    view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: json } });
  });
}

// React's controlled `<input>` tracks writes through its own value setter — a plain
// `el.value = x` bypasses that tracker and no onChange fires, so this goes through the native
// setter the same way a real keystroke would.
function typeIntoInput(input: HTMLInputElement, value: string) {
  Reflect.set(HTMLInputElement.prototype, 'value', value, input);
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

describe('NewMessageModal — Save writes a loaded, non-conflicting draft', () => {
  it('a classic draft loaded via the JSON tab writes through Save', async () => {
    capturedUpsertInput = undefined;
    const el = mount();
    await typeJson(JSON.stringify({
      content: 'hi', flags: 0, embeds: [], components: [],
    }));

    press(findButton(el, 'Continue'));
    await act(async () => {
      typeIntoInput(document.body.querySelector('input[placeholder="New Message"]') as HTMLInputElement, 'a name');
    });
    press(findButton(el, 'Save'));

    expect(capturedUpsertInput).toBeTruthy();
    const written = capturedUpsertInput as { message: { data: MessageData, name: string } };
    expect(written.message.data.content).toBe('hi');
    expect(written.message.name).toBe('a name');
  });
});

const IS_V2 = 1 << 15;
const CONTAINER = { type: 17, components: [{ type: 10, content: 'x' }] };

function importViaMessageLink(over: Record<string, unknown>) {
  const { data, droppedComponentTypes } = discordResponseToMessage({
    author: {
      id: '1', username: 'u', avatar: null, discriminator: '0',
    },
    content: 'hi',
    embeds: [],
    components: [CONTAINER],
    flags: IS_V2,
    ...over,
  } as never);
  linkImport = { guildId: '1', message: data, droppedComponentTypes };
}

async function continueAndName(el: HTMLElement) {
  press(findButton(el, 'Continue'));
  await act(async () => {
    typeIntoInput(document.body.querySelector('input[placeholder="New Message"]') as HTMLInputElement, 'a name');
  });
}

function writtenData(): MessageData {
  expect(capturedUpsertInput).toBeTruthy();
  return (capturedUpsertInput as { message: { data: MessageData } }).message.data;
}

function previewedData(): MessageData {
  expect(previewed, 'the dialog previews no draft').toBeTruthy();
  return previewed!;
}

function hasComponentType(data: MessageData, type: number): boolean {
  return ((data.components ?? []) as { type: number }[]).some((c) => c.type === type);
}

describe('NewMessageModal — an imported draft whose content conflicts is settled or chosen, then saved', () => {
  afterEach(() => { linkImport = undefined; capturedUpsertInput = undefined; previewed = undefined; });

  it('a V2-flagged message with content and no V2 components saves as Classic with the flag cleared, under the settled notice', async () => {
    importViaMessageLink({ components: [] });
    const el = mount();

    expect(el.textContent).toContain('it has been saved as Classic and the flag cleared');
    await continueAndName(el);
    press(findButton(el, 'Save'));

    const data = writtenData();
    expect(data.content).toBe('hi');
    expect((data.flags ?? 0) & IS_V2).toBe(0);
  });

  it('a message with V2 components and no V2 flag saves with the flag set, under the settled notice', async () => {
    importViaMessageLink({ content: '', flags: 0 });
    const el = mount();

    expect(el.textContent).toContain('the Components V2 flag was not set — it has been set to match');
    await continueAndName(el);
    press(findButton(el, 'Save'));

    const data = writtenData();
    expect((data.flags ?? 0) & IS_V2).toBe(IS_V2);
    expect(hasComponentType(data, 17)).toBe(true);
  });

  it('a message with both V2 components and content asks on Save, and Save as Classic writes the content without the V2 components', async () => {
    importViaMessageLink({});
    const el = mount();

    expect(el.textContent).not.toContain('Components V2 messages cannot contain embeds or content.');
    await continueAndName(el);
    press(findButton(el, 'Save'));

    expect(capturedUpsertInput).toBeUndefined();
    press(findButton(el, 'Save as Classic'));

    const data = writtenData();
    expect(data.content).toBe('hi');
    expect(hasComponentType(data, 17)).toBe(false);
    expect((data.flags ?? 0) & IS_V2).toBe(0);
  });

  it('a message with both V2 components and content asks on Save, and Save as Components V2 writes the components without the content', async () => {
    importViaMessageLink({});
    const el = mount();

    await continueAndName(el);
    press(findButton(el, 'Save'));
    press(findButton(el, 'Save as Components V2'));

    const data = writtenData();
    expect(data.content ?? '').toBe('');
    expect(hasComponentType(data, 17)).toBe(true);
    expect((data.flags ?? 0) & IS_V2).toBe(IS_V2);
  });

  it('a V2-flagged message whose only classic content is an empty embed is refused as empty once settled, and Save writes nothing', async () => {
    importViaMessageLink({ content: '', components: [], embeds: [{ type: 'rich' }] });
    const el = mount();

    expect(el.textContent).toContain('Message must have content, embeds, or components.');
    expect(el.textContent).not.toContain('Components V2 messages cannot contain embeds or content.');
    await continueAndName(el);
    press(findButton(el, 'Save'));

    expect(capturedUpsertInput).toBeUndefined();
  });

  it('the preview shows a V2-flagged message with content and no V2 components as the Classic message Save writes', () => {
    importViaMessageLink({ components: [] });
    mount();

    const data = previewedData();
    expect(data.content).toBe('hi');
    expect((data.flags ?? 0) & IS_V2).toBe(0);
  });

  it('the preview shows a message with both V2 components and content as loaded while the choice is pending', () => {
    importViaMessageLink({});
    mount();

    const data = previewedData();
    expect(data.content).toBe('hi');
    expect(hasComponentType(data, 17)).toBe(true);
    expect((data.flags ?? 0) & IS_V2).toBe(IS_V2);
  });

  it('a JSON draft with both V2 components and content, kept as Components V2 in the JSON tab, saves those components unchanged', async () => {
    const el = mount();
    await typeJson(JSON.stringify({
      content: 'hi', flags: IS_V2, embeds: [], components: [CONTAINER],
    }));
    press(findButton(el, 'Resolve'));
    press(findButton(el, 'Save as Components V2'));

    await continueAndName(el);
    press(findButton(el, 'Save'));

    const data = writtenData();
    expect(data.content ?? '').toBe('');
    expect(hasComponentType(data, 17)).toBe(true);
  });
});

describe('probe — a draft that arrives after the dialog mounts is settled', () => {
  afterEach(() => { linkImport = undefined; capturedUpsertInput = undefined; previewed = undefined; });

  it('a V2-flagged message with content, loaded after mount, is settled as Classic under the notice and saved so', async () => {
    const el = mount();
    importViaMessageLink({ components: [] });
    await act(async () => {
      typeIntoInput(document.body.querySelector('input[placeholder="https://discord.com/channels/..."]') as HTMLInputElement, 'https://discord.com/channels/1/2/3');
    });

    expect(el.textContent).toContain('it has been saved as Classic and the flag cleared');
    await continueAndName(el);
    press(findButton(el, 'Save'));

    const data = writtenData();
    expect(data.content).toBe('hi');
    expect((data.flags ?? 0) & IS_V2).toBe(0);
  });
});
