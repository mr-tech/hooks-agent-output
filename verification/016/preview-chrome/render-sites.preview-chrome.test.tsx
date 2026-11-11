// Probe (QA Phase 2, plan 016, AC1b-1 and AC1b-2): the same fixtures and chrome collector as
// page.preview-chrome.test.tsx, rendered at four mounts: the real /preview page; the editor as
// MessagePreview mounts it (no editableState, no signal: the send page, EditMessageMenu,
// NewMessageModal); and the editor as the edit page mounts it (an editableState with every show*
// true), in classic and in v2 mode. Run in a `git archive` export of each tree, network-isolated;
// compare the two trees' results with compare_render_sites.py.
import { writeFileSync } from 'fs';

import { act } from 'react';
import {
  afterAll, afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';

import DiscordMessageEditor from '~/components/DiscordMessageEditor';
import { mountDom, unmountDom } from '~/components/__tests__/helpers/dom';
import IsMobileProvider from '~/providers/IsMobileProvider';
import MarkdownProvider from '~/providers/MarkdownProvider';
import { makeEditable } from '~/utils';

const query = vi.hoisted(() => ({ data: '' }));

vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams({ data: query.data }),
}));
vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));
vi.mock('~/components/dynamics/ImageUploader', () => ({ default: () => null }));

const ResizeObserverStub = function ResizeObserverStub() {
  return { observe() {}, unobserve() {}, disconnect() {} };
};
beforeEach(() => { vi.stubGlobal('ResizeObserver', ResizeObserverStub); });
afterEach(() => { vi.unstubAllGlobals(); unmountDom(); });

const V2 = 32768;
const s = (n: number, c = 'a') => c.repeat(n);
const td = (content: string) => ({ type: 10, content });
const ok = { username: 'Captain Hook' };

// [name, data, expectation at 0e3d903 by code read: 'member' | 'clean']
const fixtures: Array<[string, Record<string, unknown>]> = [
  ['control classic (valid)', { ...ok, content: 'Hello' }],
  ['control v2 (valid)', { ...ok, flags: V2, components: [td('Hello')] }],
  ['control embed (valid)', { ...ok, embeds: [{ title: 'T', description: 'D', fields: [{ name: 'n', value: 'v' }], footer: { text: 'f' }, author: { name: 'a' } }] }],
  ['empty message', { ...ok }],
  ['empty message, v2 flag', { ...ok, flags: V2, components: [] }],
  ['embeds over 6000', { ...ok, embeds: [{ description: s(3500) }, { description: s(3500) }] }],
  ['embed description over 4096', { ...ok, embeds: [{ description: s(4097) }] }],
  ['embed title over 256', { ...ok, embeds: [{ title: s(257) }] }],
  ['embed title url invalid', { ...ok, embeds: [{ title: 'T', url: 'not a url' }] }],
  ['embed url without title', { ...ok, embeds: [{ url: 'https://example.com', description: 'D' }] }],
  ['embed author name over 256', { ...ok, embeds: [{ author: { name: s(257) } }] }],
  ['embed author url invalid', { ...ok, embeds: [{ author: { name: 'a', url: 'not a url' } }] }],
  ['embed author url without name', { ...ok, embeds: [{ author: { url: 'https://example.com' }, description: 'D' }] }],
  ['embed field value without name', { ...ok, embeds: [{ fields: [{ name: '', value: 'v' }] }] }],
  ['embed field name without value', { ...ok, embeds: [{ fields: [{ name: 'n', value: '' }] }] }],
  ['embed field name over 256', { ...ok, embeds: [{ fields: [{ name: s(257), value: 'v' }] }] }],
  ['embed field value over 1024', { ...ok, embeds: [{ fields: [{ name: 'n', value: s(1025) }] }] }],
  ['embed footer over 2048', { ...ok, embeds: [{ footer: { text: s(2049) } }] }],
  ['v2 text over 4000', { ...ok, flags: V2, components: [td(s(2001)), td(s(2001))] }],
  ['41 components', { ...ok, flags: V2, components: Array.from({ length: 41 }, () => td('x')) }],
  ['fresh text display', { ...ok, flags: V2, components: [td('')] }],
  ['v2 link button without url or label', { ...ok, flags: V2, components: [{ type: 1, components: [{ type: 2, style: 5, label: '', url: '' }] }] }],
  ['v2 section accessory invalid url', { ...ok, flags: V2, components: [{ type: 9, components: [td('a')], accessory: { type: 2, style: 5, label: '', url: 'not a url' } }] }],
  ['v2 empty media gallery', { ...ok, flags: V2, components: [{ type: 12, items: [] }] }],
  ['v2 empty container', { ...ok, flags: V2, components: [{ type: 17, components: [] }] }],
  ['v2 file without url', { ...ok, flags: V2, components: [{ type: 13, file: { url: '' } }] }],
  ['empty username', { username: '', content: 'hi' }],
  ['username clyde', { username: 'clyde', content: 'hi' }],
  ['username everyone', { username: 'everyone', content: 'hi' }],
  ['empty username, v2', { username: '', flags: V2, components: [td('hi')] }],
  ['content over 2000', { ...ok, content: s(2001) }],
];

interface Chrome {
  textError: string[];
  errorBorder: number;
  errorStateBorderPainted: number;
  errorStateBorderUnpainted: number;
  erroringState: string[];
  redText: string[];
  ariaInvalid: number;
  tooLong: number;
  mounted: boolean;
  textLength: number;
  embeds: number;
  components: number;
}

function collect(host: HTMLElement): Chrome {
  const all = Array.from(host.querySelectorAll<HTMLElement>('*'));
  const cls = (el: Element) => (typeof el.className === 'string' ? el.className.split(/\s+/) : []);
  const stateBorder = all.filter((el) => cls(el).includes('erroring:!ring-red-500'));
  return {
    textError: Array.from(host.querySelectorAll('.text-error')).map((e) => e.textContent ?? ''),
    errorBorder: all.filter((el) => cls(el).includes('!ring-red-500')).length,
    errorStateBorderPainted: stateBorder.filter((el) => el.closest('[data-erroring-state="true"]')).length,
    errorStateBorderUnpainted: stateBorder.filter((el) => !el.closest('[data-erroring-state="true"]')).length,
    erroringState: all.filter((el) => el.hasAttribute('data-erroring-state')).map((el) => el.getAttribute('data-erroring-state') ?? ''),
    redText: all.filter((el) => cls(el).some((c) => /(^|:)text-red-/.test(c))).map((el) => (el.textContent ?? '').slice(0, 40)),
    ariaInvalid: host.querySelectorAll('[aria-invalid="true"]').length,
    tooLong: all.filter((el) => el.children.length === 0 && /Too long\./.test(el.textContent ?? '')).length,
    mounted: !!host.querySelector('.discord-visualizer__accessories'),
    textLength: (host.textContent ?? '').length,
    embeds: host.querySelectorAll('.discord-visualizer__embed').length,
    components: host.querySelector('.discord-visualizer__components')?.children.length ?? 0,
  };
}

const results: Record<string, Record<string, Chrome>> = {};

type Mode = 'page' | 'message-preview' | 'edit-classic' | 'edit-v2';
const MODES: Mode[] = ['page', 'message-preview', 'edit-classic', 'edit-v2'];
const editable = (messageMode: string) => new Proxy({ messageMode }, {
  get: (o, k) => (k in o ? (o as Record<string, unknown>)[k as string]
    : (String(k).startsWith('show') ? true : () => {})),
}) as unknown as EditableState;

async function render(mode: Mode, data: Record<string, unknown>) {
  query.data = JSON.stringify(data);
  let host: HTMLElement;
  if (mode === 'page') {
    const { default: Page } = await import('../page');
    host = mountDom(<Page />);
  } else {
    const message = makeEditable({ data } as unknown as ApiMessage).data;
    // the app's layout supplies IsMobileProvider above every page; the edit branch's tooltips need it
    host = mountDom(
      <IsMobileProvider>
      <MarkdownProvider>
        <DiscordMessageEditor
          message={message}
          setMessage={() => {}}
          locale="en-US"
          editableState={mode === 'message-preview' ? undefined : editable(mode === 'edit-v2' ? 'v2' : 'classic')}
        />
      </MarkdownProvider>
      </IsMobileProvider>,
    );
  }
  for (let i = 0; i < 150 && !host.querySelector('.discord-visualizer__accessories')
    && !host.textContent?.includes('Invalid message data.'); i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await act(async () => { await new Promise((r) => { setTimeout(r, 20); }); });
  }
  for (let i = 0; i < 2; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await act(async () => { await new Promise((r) => { setTimeout(r, 20); }); });
  }
  return host;
}

afterAll(() => {
  writeFileSync(process.env.PROBE_OUT ?? 'preview-chrome-results.json', `${JSON.stringify(results, null, 2)}\n`);
});

describe.each(MODES)('validation chrome by render: %s', (mode) => {
  it.each(fixtures)('%s', async (name, data) => {
    const host = await render(mode, data);
    results[mode] = results[mode] ?? {};
    results[mode][name] = collect(host);
    expect(results[mode][name].mounted).toBe(true);
  });
});
