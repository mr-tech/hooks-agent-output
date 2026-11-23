import { act } from 'react';
import { afterEach, describe, expect, it } from 'vitest';

import useDialogEnter from '~/utils/hooks/useDialogEnter';

import enter from './helpers/enter';
import { mountDom, unmountDom } from './helpers/dom';

const calls: string[] = [];

const Harness = ({ name, tags }: { name: string, tags?: boolean }) => {
  const ref = tags
    ? (useDialogEnter as (...a: unknown[]) => React.RefObject<HTMLDivElement>)(() => { calls.push(name); }, true, ['input'])
    : useDialogEnter(() => { calls.push(name); }, true);
  return (
    <div role="dialog" tabIndex={-1}>
      <div ref={ref}>
        <input data-field />
        <button type="button" data-btn>b</button>
      </div>
    </div>
  );
};

function focusAndEnter(selector: string) {
  act(() => { (document.body.querySelector(selector) as HTMLElement).focus(); });
  enter();
}

afterEach(() => { unmountDom(); calls.length = 0; });

describe('review probe: useDialogEnter callers without the third argument', () => {
  it('Q1 two-argument caller: Enter in an input does not answer', async () => {
    mountDom(<Harness name="two-arg" />);
    await act(async () => {});
    focusAndEnter('[data-field]');
    expect(calls).toEqual([]);
  });
  it('Q2 two-argument caller: Enter on a button inside the dialog answers', async () => {
    mountDom(<Harness name="two-arg" />);
    await act(async () => {});
    focusAndEnter('[data-btn]');
    expect(calls).toEqual(['two-arg']);
  });
  it('Q3 input-tag caller: Enter in an input answers', async () => {
    mountDom(<Harness name="tags" tags />);
    await act(async () => {});
    focusAndEnter('[data-field]');
    expect(calls).toEqual(['tags']);
  });
});
