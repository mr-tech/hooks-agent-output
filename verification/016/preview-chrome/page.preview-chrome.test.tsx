// Probe (QA Phase 1 re-key on plan 016 revision 4): the by-render enumeration of M1b's class.
// Mounts the real /preview page (src/app/preview/page.tsx) with each validator's trigger in its
// `data` query, and collects every piece of validation chrome the whole tree emits. Run inside a
// `git archive` export of the website (vitest, jsdom project), network-isolated.
import { writeFileSync } from 'fs';

import { act } from 'react';
import {
  afterAll, afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';

import { mountDom, unmountDom } from '~/components/__tests__/helpers/dom';

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
  };
}

const results: Record<string, Chrome> = {};

async function render(data: Record<string, unknown>) {
  query.data = JSON.stringify(data);
  const { default: Page } = await import('../page');
  const host = mountDom(<Page />);
  // let MarkdownProvider's dynamic import and Suspense settle
  for (let i = 0; i < 5; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await act(async () => { await new Promise((r) => { setTimeout(r, 20); }); });
  }
  return host;
}

afterAll(() => {
  writeFileSync(process.env.PROBE_OUT ?? 'preview-chrome-results.json', `${JSON.stringify(results, null, 2)}\n`);
});

describe('/preview validation chrome, by render', () => {
  it.each(fixtures)('%s', async (name, data) => {
    const host = await render(data);
    results[name] = collect(host);
    expect(results[name].mounted).toBe(true);
  });

  it('controls render no chrome', () => {
    for (const name of Object.keys(results).filter((n) => n.startsWith('control'))) {
      const r = results[name];
      expect({ name, textError: r.textError, errorBorder: r.errorBorder, painted: r.errorStateBorderPainted })
        .toEqual({ name, textError: [], errorBorder: 0, painted: 0 });
    }
  });

  it('positive control: the instrument sees the over-40 line and border at this tree', () => {
    expect(results['41 components'].textError).toContain('Message has 41 components; the limit is 40.');
    expect(results['41 components'].errorBorder).toBeGreaterThan(0);
  });
});
