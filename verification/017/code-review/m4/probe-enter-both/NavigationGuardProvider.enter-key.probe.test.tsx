import { act } from 'react';
import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';

import NavigationGuardProvider, { useNavigationGuard } from '../NavigationGuardProvider';

import ConfirmationDialog from '~/components/ConfirmationDialog';
import StyledLink from '~/components/StyledLink';
import { mountDom, unmountDom } from '~/components/__tests__/helpers/dom';
import { createLinkRouter, WithLinkRouter } from '~/components/__tests__/helpers/linkNavigation';
import ConfirmationProvider, { useConfirmation } from '~/providers/ConfirmationProvider';
import HotkeysProviderWrapper from '~/providers/HotkeysProviderWrapper';
import { useEffect } from 'react';

const hoisted = vi.hoisted(() => ({ push: vi.fn(), replace: vi.fn() }));

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: hoisted.push, replace: hoisted.replace }),
}));

const LINK_TITLE = 'You have unsaved changes!';
const UPDATE_TITLE = 'Message Update Detected';
const updateConfirmed = vi.fn();
let linkRouter: ReturnType<typeof createLinkRouter>;

const Registers: FC = () => {
  const { register } = useNavigationGuard();
  useEffect(() => register(() => true), [register]);
  return null;
};

let raiseDirect: VoidFunction = () => {};

const EditorPrompt: FC = () => {
  const { showConfirmation } = useConfirmation();
  raiseDirect = () => showConfirmation({
    enabled: true, title: UPDATE_TITLE, message: 'm', confirmText: 'Reload', onConfirm: updateConfirmed,
  });
  return (
    <button
      type="button"
      onClick={() => showConfirmation({
        enabled: true, title: UPDATE_TITLE, message: 'm', confirmText: 'Reload', onConfirm: updateConfirmed,
      })}
    >
      raise editor prompt
    </button>
  );
};

function mountTree() {
  mountDom(
    <WithLinkRouter router={linkRouter}>
      <NavigationGuardProvider>
        <Registers />
        <HotkeysProviderWrapper>
          <ConfirmationProvider>
            <ConfirmationDialog />
            <EditorPrompt />
            <StyledLink href="/message/f/0">go home</StyledLink>
          </ConfirmationProvider>
        </HotkeysProviderWrapper>
      </NavigationGuardProvider>
    </WithLinkRouter>,
  );
}

function clickLink() {
  const a = Array.from(document.body.querySelectorAll('a')).find((x) => x.textContent === 'go home') as HTMLAnchorElement;
  act(() => {
    a.dispatchEvent(new MouseEvent('click', {
      bubbles: true, cancelable: true, button: 0, detail: 1,
    }));
  });
}

function raiseUpdate() {
  act(() => { raiseDirect(); });
}

function openDialogTitles() {
  return Array.from(document.body.querySelectorAll('[role="dialog"]'))
    .map((d) => d.querySelector('h1,h2,h3,[id$="-title"]')?.textContent ?? '?')
    .filter((t) => t === UPDATE_TITLE || t === LINK_TITLE);
}

function enter() {
  const target = document.activeElement ?? document.body;
  act(() => {
    target.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Enter', code: 'Enter', bubbles: true, cancelable: true,
    }));
  });
  act(() => {
    target.dispatchEvent(new KeyboardEvent('keyup', {
      key: 'Enter', code: 'Enter', bubbles: true, cancelable: true,
    }));
  });
}

beforeEach(() => {
  vi.stubGlobal('location', {
    protocol: 'http:', hostname: 'localhost', port: '3000',
    origin: 'http://localhost:3000', href: 'http://localhost:3000/message/m/1/edit', assign: () => undefined,
  });
  hoisted.push.mockClear();
  updateConfirmed.mockClear();
  linkRouter = createLinkRouter();
});
afterEach(() => {
  vi.unstubAllGlobals();
  unmountDom();
});

describe('probe: the Enter key with the link prompt and the update prompt open together', () => {
  it('control A: the update prompt alone is answered by one Enter', () => {
    mountTree();
    raiseUpdate();
    expect(document.body.textContent).toContain(UPDATE_TITLE);

    enter();

    console.log(`PROBE control-A updateConfirmed=${updateConfirmed.mock.calls.length} push=${hoisted.push.mock.calls.length}`);
    expect(updateConfirmed).toHaveBeenCalledTimes(1);
  });

  it('control B: the link prompt alone is answered by one Enter', () => {
    mountTree();
    clickLink();
    expect(document.body.textContent).toContain(LINK_TITLE);

    enter();

    console.log(`PROBE control-B updateConfirmed=${updateConfirmed.mock.calls.length} push=${hoisted.push.mock.calls.length}`);
    expect(hoisted.push).toHaveBeenCalledTimes(1);
  });

  it('M4-b: one Enter answers at most one of two open prompts', () => {
    mountTree();
    raiseUpdate();
    clickLink();
    expect(document.body.textContent).toContain(UPDATE_TITLE);
    expect(document.body.textContent).toContain(LINK_TITLE);

    enter();

    const answered = updateConfirmed.mock.calls.length + hoisted.push.mock.calls.length;
    console.log(`PROBE both-open updateConfirmed=${updateConfirmed.mock.calls.length} push=${hoisted.push.mock.calls.length} answered=${answered}`);
    expect(answered).toBeLessThanOrEqual(1);
  });

  it('M4-b, production order: link prompt first, then the update prompt; one Enter answers at most one', () => {
    mountTree();
    clickLink();
    raiseUpdate();
    expect(document.body.textContent).toContain(UPDATE_TITLE);
    expect(document.body.textContent).toContain(LINK_TITLE);

    enter();

    const answered = updateConfirmed.mock.calls.length + hoisted.push.mock.calls.length;
    console.log(`PROBE both-open-link-first updateConfirmed=${updateConfirmed.mock.calls.length} push=${hoisted.push.mock.calls.length} answered=${answered}`);
    console.log(`PROBE both-open-link-first dialogs-after-enter=${JSON.stringify(openDialogTitles())}`);
    expect(answered).toBeLessThanOrEqual(1);
  });
});
