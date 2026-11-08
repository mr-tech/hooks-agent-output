import { appendFileSync } from 'node:fs';
import { act } from 'react';
import {
  afterEach, describe, it, vi,
} from 'vitest';

import Page from '../page';

import { mountDom, unmountDom } from '~/components/__tests__/helpers/dom';

const hoisted = vi.hoisted(() => ({ params: new URLSearchParams() }));

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('next/navigation', () => ({ useSearchParams: () => hoisted.params }));

afterEach(() => { try { unmountDom(); } catch { /* already unmounted */ } });

async function outcome(data: string) {
  hoisted.params = new URLSearchParams({ data });
  const reported: string[] = [];
  const onError = (e: ErrorEvent) => { reported.push(`window:${e.message}`); e.preventDefault(); };
  window.addEventListener('error', onError);
  const spy = vi.spyOn(console, 'error').mockImplementation((...args: unknown[]) => {
    reported.push(`console:${String(args[0]).slice(0, 120)}`);
  });
  let result: string;
  try {
    const el = mountDom(<Page />);
    for (let i = 0; i < 20; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await act(async () => { await new Promise((r) => { setTimeout(r, 25); }); });
    }
    result = `rendered:${el.querySelectorAll('*').length} nodes fallback=${(el.textContent ?? '').includes('Something went wrong')}`;
  } catch (e) {
    result = `THREW:${(e as Error).message}`;
  }
  window.removeEventListener('error', onError);
  spy.mockRestore();
  return `${result} | reported=${reported.length} ${JSON.stringify(reported.slice(0, 2))}`;
}

describe('preview page, errors React reports without rethrowing', () => {
  it.each([
    ["positive control", "{\"content\":\"hello\"}"],
    ["throwing control", "{\"embeds\":\"\"}"],
    ["empty object", "{}"],
    ["embeds empty", "{\"embeds\":[]}"],
    ["embed element array", "{\"embeds\":[[]]}"],
    ["field element array", "{\"embeds\":[{\"title\":\"t\",\"fields\":[[]]}]}"],
    ["field element empty object", "{\"embeds\":[{\"fields\":[{}]}]}"],
    ["top-level null", "{\"components\":[null]}"],
    ["top-level number", "{\"components\":[5]}"],
    ["top-level array", "{\"components\":[[]]}"],
    ["top-level empty object", "{\"components\":[{}]}"],
    ["type-1 child array", "{\"components\":[{\"type\":1,\"components\":[[]]}]}"],
    ["type-17 child null", "{\"components\":[{\"type\":17,\"components\":[null]}]}"],
    ["type-17 child number", "{\"components\":[{\"type\":17,\"components\":[5]}]}"],
  ])('%s', async (_case, data) => {
    appendFileSync(process.env.EDGE_OUT ?? '/dev/null', `REPORTED ${JSON.stringify(data)} -> ${await outcome(data)}\n`);
  });
});
