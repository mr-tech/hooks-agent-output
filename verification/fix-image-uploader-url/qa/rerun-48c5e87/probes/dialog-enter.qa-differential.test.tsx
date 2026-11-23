// QA differential probe (not a suite file). Records, per scenario, how many times each dialog's Enter answered;
// the same file runs at both trees and the two JSON outputs are compared. Scenario `image-box` is the positive control.
import { writeFileSync } from 'fs';
import { act, useCallback, useState } from 'react';
import { afterEach, beforeEach, it, vi } from 'vitest';

import ConfirmationDialog from '../ConfirmationDialog';
import ImageUploader from '../ImageUploader';
import WarningDialog from '../WarningDialog';

import enter from './helpers/enter';
import { mountDom, unmountDom } from './helpers/dom';

import ConfirmationProvider, { useConfirmation } from '~/providers/ConfirmationProvider';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));

const out: Record<string, Record<string, number>> = {};
const n = { confirm: 0, close: 0, setImage: 0 };
const reset = () => { n.confirm = 0; n.close = 0; n.setImage = 0; };
const rec = (k: string) => { out[k] = { ...n }; };

class FakeImage {
  width = 1; onload: (() => void) | null = null; onerror: (() => void) | null = null;
  set src(_u: string) { queueMicrotask(() => this.onload?.()); }
}

function dialogOf(title: string) {
  return Array.from(document.body.querySelectorAll<HTMLElement>('[role="dialog"]')).find((d) => d.textContent?.includes(title)) as HTMLElement;
}
function injectInput(title: string) {
  const input = document.createElement('input');
  textIn(title).parentElement?.appendChild(input);
  focusOn(input, `input in ${title}`);
  return input;
}
function focusOn(el: HTMLElement | undefined, label: string) {
  if (!el) throw new Error(`no element: ${label}`);
  act(() => { el.focus(); });
  if (document.activeElement !== el) throw new Error(`focus did not land: ${label}`);
}
function textIn(title: string) {
  const d = dialogOf(title);
  if (!d) throw new Error(`no dialog: ${title}`);
  const p = d.querySelector<HTMLElement>('p') as HTMLElement;
  p.tabIndex = -1;
  return p;
}
function buttonIn(title: string, text: string) {
  return Array.from(dialogOf(title).querySelectorAll<HTMLElement>('button')).find((b) => b.textContent?.includes(text)) as HTMLElement;
}

const Warn = () => (
  <WarningDialog title="Delete Field?" message="m" open confirmText="Delete"
    onClose={() => { n.close += 1; }} onConfirm={() => { n.confirm += 1; }} />
);
let raise: () => void = () => undefined;
const Capture = () => {
  const { showConfirmation } = useConfirmation();
  raise = () => showConfirmation({ enabled: true, title: 'Update', message: 'm', confirmText: 'Reload', onConfirm: () => { n.confirm += 1; }, onCancel: () => { n.close += 1; } } as never);
  return null;
};
const Uploader = () => {
  const [open] = useState(true);
  const close = useCallback(() => { n.close += 1; }, []);
  const set = useCallback(() => { n.setImage += 1; }, []);
  return <ImageUploader isOpen={open} image="https://example.com/a.png" onClose={close} setImage={set} />;
};

beforeEach(() => { reset(); vi.stubGlobal('Image', FakeImage); });
afterEach(() => { unmountDom(); vi.unstubAllGlobals(); });

it('records', async () => {
  mountDom(<Warn />); await act(async () => {});
  focusOn(textIn('Delete Field?'), 'warning text'); enter(); rec('warning-dialog-element');
  reset(); injectInput('Delete Field?'); enter(); rec('warning-input-in-dialog');
  reset(); focusOn(buttonIn('Delete Field?', 'Cancel'), 'warning cancel'); enter(); rec('warning-cancel-button');
  unmountDom();

  reset();
  mountDom(<ConfirmationProvider><Capture /><ConfirmationDialog /></ConfirmationProvider>); await act(async () => {});
  act(() => { raise(); }); await act(async () => {});
  focusOn(textIn('Update'), 'confirmation text'); enter(); rec('confirmation-dialog-element');
  unmountDom();
  reset();
  mountDom(<ConfirmationProvider><Capture /><ConfirmationDialog /></ConfirmationProvider>); await act(async () => {});
  act(() => { raise(); }); await act(async () => {});
  injectInput('Update'); enter(); rec('confirmation-input-in-dialog');
  unmountDom();

  reset();
  mountDom(<Uploader />); await act(async () => {}); await act(async () => {});
  const box = dialogOf('Enter Image URL').querySelector('input') as HTMLInputElement;
  focusOn(box, 'image box'); enter(); rec('image-box');
  writeFileSync(process.env.PROBE_OUT as string, `${JSON.stringify(out, null, 1)}\n`);
});
