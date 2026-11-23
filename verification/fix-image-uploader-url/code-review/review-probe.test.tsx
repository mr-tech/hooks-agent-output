import { act, useState } from 'react';
import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';

import ImageUploader from '../ImageUploader';

import click from './helpers/click';
import enter from './helpers/enter';
import { mountDom, unmountDom } from './helpers/dom';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));

const TITLE = 'Enter Image URL';
const URL_A = 'https://example.com/a.png';
const URL_B = 'https://example.com/b.png';
const URL_X = 'https://example.com/x.png';
const URL_Y = 'https://example.com/y.png';

const pending: FakeImage[] = [];

class FakeImage {
  width = 0;

  url = '';

  onload: (() => void) | null = null;

  onerror: (() => void) | null = null;

  set src(url: string) {
    this.url = url;
    pending.push(this);
  }
}

async function settle(url: string, loads: boolean) {
  const matching = pending.filter((i) => i.url === url);
  expect(matching.length, `no pending load of ${url}`).toBeGreaterThan(0);
  matching.forEach((i) => pending.splice(pending.indexOf(i), 1));
  await act(async () => {
    matching.forEach((i) => {
      if (loads) {
        Reflect.set(i, 'width', 1);
        i.onload?.();
      } else {
        i.onerror?.();
      }
    });
  });
  await act(async () => {});
}

const saved: string[] = [];

const Host = ({ initial }: { initial?: string }) => {
  const [isOpen, setOpen] = useState(true);
  const [image, setImage] = useState(initial);
  return (
    <>
      <button type="button" data-reopen onClick={() => setOpen(true)}>reopen</button>
      <ImageUploader
        isOpen={isOpen}
        image={image}
        onClose={() => setOpen(false)}
        setImage={(url) => { saved.push(url); setImage(url); }}
      />
    </>
  );
};

function dialog() {
  const found = Array.from(document.body.querySelectorAll<HTMLElement>('[role="dialog"]'))
    .find((d) => d.textContent?.includes(TITLE) && !d.hidden);
  expect(found, 'no open image dialog').toBeTruthy();
  return found as HTMLElement;
}

function button(text: string) {
  const found = Array.from(dialog().querySelectorAll<HTMLButtonElement>('button'))
    .find((b) => b.textContent?.includes(text));
  expect(found, `no "${text}" button`).toBeTruthy();
  return found as HTMLButtonElement;
}

const box = () => dialog().querySelector('input') as HTMLInputElement;
const preview = () => dialog().querySelector<HTMLImageElement>('img[alt="upload preview"]')?.getAttribute('src') ?? null;

async function type(value: string) {
  act(() => {
    Reflect.set(HTMLInputElement.prototype, 'value', value, box());
    box().dispatchEvent(new Event('input', { bubbles: true }));
  });
  await act(async () => {});
}

const save = () => click(button('Save'), { detail: 0 });

function enterOnDialog() {
  act(() => { dialog().focus(); });
  enter();
}

async function open(initial?: string) {
  mountDom(<Host initial={initial} />);
  await act(async () => {});
}

async function reopen() {
  click(document.body.querySelector('[data-reopen]') as HTMLElement);
  await act(async () => {});
}

beforeEach(() => {
  pending.length = 0;
  saved.length = 0;
  vi.stubGlobal('Image', FakeImage);
});
afterEach(() => {
  unmountDom();
  vi.unstubAllGlobals();
});


describe('review probe', () => {
  it('P1 keeps "Image not found." for a saved address that failed, after Cancel and reopen', async () => {
    await open(URL_X);
    await settle(URL_X, false);
    expect(dialog().textContent).toContain('Image not found.');
    click(button('Cancel'), { detail: 0 });
    await reopen();
    expect(box().value).toBe(URL_X);
    expect(dialog().textContent).toContain('Image not found.');
  });

  it('P1b a saved address that failed keeps Save off after Cancel and reopen', async () => {
    await open(URL_X);
    await settle(URL_X, false);
    click(button('Cancel'), { detail: 0 });
    await reopen();
    expect(button('Save').disabled).toBe(true);
  });

  it('P2 after deleting the saved address by hand and saving, reopening shows Clear off for the empty box', async () => {
    await open(URL_X);
    await settle(URL_X, true);
    await type('');
    save();
    expect(saved).toEqual(['']);
    await reopen();
    expect(box().value).toBe('');
    expect(button('Clear').disabled).toBe(true);
  });

  it('P3 Enter on an emptied box with a saved image saves nothing while Save saves empty', async () => {
    await open(URL_X);
    await settle(URL_X, true);
    await type('');
    enterOnDialog();
    expect(saved).toEqual([]);
    expect(button('Save').disabled).toBe(false);
  });

  it('P4 with a saved address still loading, Save is enabled and saves that address', async () => {
    await open(URL_X);
    expect(button('Save').disabled).toBe(false);
    save();
    expect(saved).toEqual([URL_X]);
  });
});
