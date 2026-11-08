import { appendFileSync } from 'node:fs';
import { act } from 'react';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';

import Page from '../page';

import { mountDom, unmountDom } from '~/components/__tests__/helpers/dom';

const hoisted = vi.hoisted(() => ({ params: new URLSearchParams() }));

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('next/navigation', () => ({ useSearchParams: () => hoisted.params }));

afterEach(unmountDom);

async function outcome(data: string) {
  hoisted.params = new URLSearchParams({ data });
  try {
    const el = mountDom(<Page />);
    for (let i = 0; i < 20; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await act(async () => { await new Promise((r) => { setTimeout(r, 25); }); });
    }
    if (el.textContent?.includes('Invalid message data.')) return 'text:Invalid message data.';
    return `rendered:${el.querySelectorAll('*').length} nodes, text=${JSON.stringify((el.textContent ?? '').slice(0, 40))}`;
  } catch (e) {
    return `THREW:${(e as Error).message}`;
  }
}

describe('preview page, the real editor, M5-h class members', () => {
  it.each([
    ["positive control", "{\"content\":\"hello\"}", "rendered"],
    ["refused control", "null", "text:Invalid message data."],
    ["embeds absent", "{}", "?"],
    ["embeds null", "{\"embeds\":null}", "?"],
    ["embeds empty array", "{\"embeds\":[]}", "?"],
    ["embeds a number", "{\"embeds\":5}", "?"],
    ["embeds false", "{\"embeds\":false}", "?"],
    ["embeds true", "{\"embeds\":true}", "?"],
    ["embeds empty string", "{\"embeds\":\"\"}", "?"],
    ["embeds a string", "{\"embeds\":\"x\"}", "?"],
    ["embeds an object", "{\"embeds\":{}}", "?"],
    ["embed element null", "{\"embeds\":[null]}", "?"],
    ["embed element a number", "{\"embeds\":[5]}", "?"],
    ["embed element a string", "{\"embeds\":[\"x\"]}", "?"],
    ["embed element an array", "{\"embeds\":[[]]}", "?"],
    ["fields null", "{\"embeds\":[{\"title\":\"t\",\"fields\":null}]}", "?"],
    ["fields a number", "{\"embeds\":[{\"title\":\"t\",\"fields\":5}]}", "?"],
    ["fields empty string", "{\"embeds\":[{\"title\":\"t\",\"fields\":\"\"}]}", "?"],
    ["fields a string", "{\"embeds\":[{\"title\":\"t\",\"fields\":\"x\"}]}", "?"],
    ["fields an object", "{\"embeds\":[{\"title\":\"t\",\"fields\":{}}]}", "?"],
    ["field element null", "{\"embeds\":[{\"title\":\"t\",\"fields\":[null]}]}", "?"],
    ["field element a number", "{\"embeds\":[{\"title\":\"t\",\"fields\":[5]}]}", "?"],
    ["field element an array", "{\"embeds\":[{\"title\":\"t\",\"fields\":[[]]}]}", "?"],
    ["components false", "{\"components\":false}", "?"],
    ["components 0", "{\"components\":0}", "?"],
    ["components empty string", "{\"components\":\"\"}", "?"],
    ["components a number", "{\"components\":5}", "?"],
    ["components a string", "{\"components\":\"x\"}", "?"],
    ["components an object", "{\"components\":{}}", "?"],
    ["top-level component null", "{\"components\":[null]}", "?"],
    ["top-level component a number", "{\"components\":[5]}", "?"],
    ["top-level component an array", "{\"components\":[[]]}", "?"],
    ["type-1 child null", "{\"components\":[{\"type\":1,\"components\":[null]}]}", "?"],
    ["type-1 child a number", "{\"components\":[{\"type\":1,\"components\":[5]}]}", "?"],
    ["type-1 child an array", "{\"components\":[{\"type\":1,\"components\":[[]]}]}", "?"],
    ["type-9 child null", "{\"components\":[{\"type\":9,\"components\":[null]}]}", "?"],
    ["type-9 child a number", "{\"components\":[{\"type\":9,\"components\":[5]}]}", "?"],
    ["type-9 accessory null", "{\"components\":[{\"type\":9,\"components\":[],\"accessory\":null}]}", "?"],
    ["type-12 item null", "{\"components\":[{\"type\":12,\"items\":[null]}]}", "?"],
    ["type-12 item a number", "{\"components\":[{\"type\":12,\"items\":[5]}]}", "?"],
    ["type-12 items a string", "{\"components\":[{\"type\":12,\"items\":\"x\"}]}", "?"],
    ["type-17 child null", "{\"components\":[{\"type\":17,\"components\":[null]}]}", "?"],
    ["type-17 child a number", "{\"components\":[{\"type\":17,\"components\":[5]}]}", "?"],
    ["type-17 nested type-1 child null", "{\"components\":[{\"type\":17,\"components\":[{\"type\":1,\"components\":[null]}]}]}", "?"],
  ])('%s', async (_case, data, expected) => {
    const got = await outcome(data);
    appendFileSync(process.env.EDGE_OUT ?? '/dev/null', `REAL ${JSON.stringify(data)} -> ${got}\n`);
    if (expected !== '?') expect(got.startsWith(expected)).toBe(true);
  });
});
