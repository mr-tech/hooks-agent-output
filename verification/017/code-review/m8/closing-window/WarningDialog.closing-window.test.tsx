// QA probe (chain 017, M8 Phase 2), not part of the website suite. Copied into an export's
// src/components/__tests__/ to run. Question: while a dialog is closing (open just set false, the
// leave transition still running), does focus stay inside its panel, and does Enter then run the
// dialog's answer? At the tip `enabled` should stop it; under the mutant that drops `enabled` it
// would run, if and only if the panel is still mounted with focus in it.
import { appendFileSync } from 'node:fs';
import { act, useState } from 'react';
import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';

import ConfirmationDialog from '../ConfirmationDialog';
import ImageUploader from '../ImageUploader';
import WarningDialog from '../WarningDialog';

import enter from './helpers/enter';
import { mountDom, unmountDom } from './helpers/dom';

import ConfirmationProvider, { useConfirmation } from '~/providers/ConfirmationProvider';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));

const WARNING = 'Delete Field?';
const IMAGE_TITLE = 'Enter Image URL';
const UPDATE = 'Message Update Detected';
const URL_A = 'https://example.com/a.png';

class FakeImage {
  width = 1;

  onload: (() => void) | null = null;

  onerror: (() => void) | null = null;

  set src(_url: string) {
    queueMicrotask(() => this.onload?.());
  }
}

const record = (tag: string, json: string) => { appendFileSync(process.env.PROBE_OUT as string, `${tag} ${json}\n`); };

const calls = {
  warnConfirm: vi.fn(), warnClose: vi.fn(), close: vi.fn(), setImage: vi.fn(), updateConfirm: vi.fn(),
};
let setOpen: (v: boolean) => void = () => undefined;
let raise: () => void = () => undefined;

const Capture = () => {
  const { showConfirmation } = useConfirmation();
  raise = () => showConfirmation({
    enabled: true, title: UPDATE, message: 'This message was saved in another tab.', confirmText: 'Reload', onConfirm: calls.updateConfirm,
  });
  return null;
};

const Warning = ({ initial }: { initial: boolean }) => {
  const [open, set] = useState(initial);
  setOpen = set;
  return (
    <WarningDialog
      title={WARNING}
      message="This will delete the field."
      open={open}
      confirmText="Delete"
      onClose={() => { calls.warnClose(); set(false); }}
      onConfirm={calls.warnConfirm}
    />
  );
};

const Uploader = () => {
  const [open, set] = useState(true);
  setOpen = set;
  return <ImageUploader isOpen={open} image={URL_A} onClose={() => { calls.close(); set(false); }} setImage={calls.setImage} />;
};

function dialogOf(title: string) {
  return Array.from(document.body.querySelectorAll<HTMLElement>('[role="dialog"]'))
    .find((d) => d.textContent?.includes(title)) ?? null;
}

const state = (title: string) => {
  const d = dialogOf(title);
  return {
    mounted: Boolean(d),
    hidden: d ? d.hidden || d.getAttribute('hidden') !== null : null,
    focusInside: d ? d.contains(document.activeElement) : false,
  };
};

beforeEach(() => {
  vi.stubGlobal('Image', FakeImage);
  Object.values(calls).forEach((c) => c.mockClear());
});
afterEach(() => {
  unmountDom();
  vi.unstubAllGlobals();
});

describe('probe: the closing window', () => {
  it('WarningDialog closed by its open prop, Enter at once', async () => {
    mountDom(<Warning initial />);
    await act(async () => {});
    const d = dialogOf(WARNING)!;
    act(() => { d.focus(); });
    const before = document.activeElement === d;
    act(() => { setOpen(false); });
    const during = state(WARNING);
    enter();
    record('PROBE warning-prop', JSON.stringify({ before, during, warnConfirm: calls.warnConfirm.mock.calls.length }));
    expect(before).toBe(true);
  });

  it('WarningDialog closed by Escape, Enter at once', async () => {
    mountDom(<Warning initial />);
    await act(async () => {});
    const d = dialogOf(WARNING)!;
    act(() => { d.focus(); });
    act(() => { d.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', bubbles: true, cancelable: true })); });
    act(() => { d.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape', code: 'Escape', bubbles: true, cancelable: true })); });
    const during = state(WARNING);
    enter();
    record('PROBE warning-escape', JSON.stringify({ warnClose: calls.warnClose.mock.calls.length, during, warnConfirm: calls.warnConfirm.mock.calls.length }));
    expect(calls.warnClose).toHaveBeenCalled();
  });

  it('ImageUploader closed by its prop, Enter at once', async () => {
    mountDom(<Uploader />);
    await act(async () => {});
    await act(async () => {});
    const d = dialogOf(IMAGE_TITLE)!;
    act(() => { d.focus(); });
    act(() => { setOpen(false); });
    const during = state(IMAGE_TITLE);
    enter();
    record('PROBE image-prop', JSON.stringify({ during, setImage: calls.setImage.mock.calls.length }));
    expect(true).toBe(true);
  });

  it('opening order reversed: update prompt raised first, then the warning opens', async () => {
    mountDom(
      <ConfirmationProvider>
        <Capture />
        <Warning initial={false} />
        <ConfirmationDialog />
      </ConfirmationProvider>,
    );
    await act(async () => {});
    act(() => { raise(); });
    await act(async () => {});
    act(() => { setOpen(true); });
    await act(async () => {});
    const u = dialogOf(UPDATE)!;
    act(() => { u.focus(); });
    const focusU = document.activeElement === u;
    enter();
    const afterU = { warnConfirm: calls.warnConfirm.mock.calls.length, updateConfirm: calls.updateConfirm.mock.calls.length };
    record('PROBE order-reversed', JSON.stringify({ warningMounted: Boolean(dialogOf(WARNING)), focusU, afterU }));
    expect(focusU).toBe(true);
    expect(afterU).toEqual({ warnConfirm: 0, updateConfirm: 1 });
  });
});
