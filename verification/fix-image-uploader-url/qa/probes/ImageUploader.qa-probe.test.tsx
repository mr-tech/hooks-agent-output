// QA probe (not a suite file): the dialog under consumers whose callbacks are stable, as all five are,
// and a saved image that changes while the dialog is closed.
import { act, useCallback, useState } from 'react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import ImageUploader from '../ImageUploader';

import click from './helpers/click';
import { mountDom, unmountDom } from './helpers/dom';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));

const A = 'https://example.com/a.png';
const B = 'https://example.com/b.png';
const X = 'https://example.com/x.png';
const Z = 'https://example.com/z.png';
const pending: FakeImage[] = [];
class FakeImage {
  width = 0; url = ''; onload: (() => void) | null = null; onerror: (() => void) | null = null;
  set src(u: string) { this.url = u; pending.push(this); }
}
async function settle(url: string, loads: boolean) {
  const m = pending.filter((i) => i.url === url);
  expect(m.length, `no pending ${url}`).toBeGreaterThan(0);
  m.forEach((i) => pending.splice(pending.indexOf(i), 1));
  await act(async () => { m.forEach((i) => { if (loads) { Reflect.set(i, 'width', 1); i.onload?.(); } else i.onerror?.(); }); });
  await act(async () => {});
}
const saved: string[] = [];
let external: (u: string) => void = () => undefined;
const StableHost = ({ initial }: { initial?: string }) => {
  const [isOpen, setOpen] = useState(true);
  const [image, setImageState] = useState(initial);
  external = setImageState;
  const onClose = useCallback(() => setOpen(false), []);
  const setImage = useCallback((u: string) => { saved.push(u); setImageState(u); }, []);
  return (
    <>
      <button type="button" data-reopen onClick={() => setOpen(true)}>reopen</button>
      <ImageUploader isOpen={isOpen} image={image} onClose={onClose} setImage={setImage} />
    </>
  );
};
const dialog = () => Array.from(document.body.querySelectorAll<HTMLElement>('[role="dialog"]')).find((d) => d.textContent?.includes('Enter Image URL') && !d.hidden) as HTMLElement;
const button = (t: string) => Array.from(dialog().querySelectorAll<HTMLButtonElement>('button')).find((b) => b.textContent?.includes(t)) as HTMLButtonElement;
const box = () => dialog().querySelector('input') as HTMLInputElement;
async function type(v: string) {
  act(() => { Reflect.set(HTMLInputElement.prototype, 'value', v, box()); box().dispatchEvent(new Event('input', { bubbles: true })); });
  await act(async () => {});
}
async function reopen() { click(document.body.querySelector('[data-reopen]') as HTMLElement); await act(async () => {}); }

beforeEach(() => { pending.length = 0; saved.length = 0; vi.stubGlobal('Image', FakeImage); });
afterEach(() => { unmountDom(); vi.unstubAllGlobals(); });

it('P1 stable callbacks: Save commits the address typed last', async () => {
  mountDom(<StableHost />); await act(async () => {});
  await type(A); await settle(A, true);
  await type(B); await settle(B, true);
  click(button('Save'), { detail: 0 });
  expect(saved).toEqual([B]);
});

it('P2 stable callbacks: Cancel after a Save puts the box back to the address saved last', async () => {
  mountDom(<StableHost initial={X} />); await act(async () => {});
  await settle(X, true);
  await type(A); await settle(A, true);
  click(button('Save'), { detail: 0 });
  await reopen();
  await type(B); await settle(B, true);
  click(button('Cancel'), { detail: 0 });
  await reopen();
  expect(box().value).toBe(A);
});

it('P3 saved image changed elsewhere while closed: reopening shows it', async () => {
  mountDom(<StableHost initial={X} />); await act(async () => {});
  await settle(X, true);
  click(button('Cancel'), { detail: 0 });
  act(() => { external(Z); });
  await reopen();
  expect(box().value).toBe(Z);
});
