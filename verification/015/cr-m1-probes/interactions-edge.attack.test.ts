import {
  afterAll, beforeAll, describe, expect, it, vi,
} from 'vitest';

import handler from '~/pages/api/interactions-edge';

const state = vi.hoisted(() => ({ publicKeyHex: '', commandCalls: 0 }));

vi.mock('~/env.mjs', () => ({
  env: new Proxy({}, { get: (_, key) => (key === 'DISCORD_PUBLIC_KEY' ? state.publicKeyHex : `test-${String(key)}`) }),
}));
vi.mock('bot/edgeCommands', () => ({
  default: { probe_cmd: async () => { state.commandCalls += 1; return new Response('command-ran', { status: 200 }); } },
}));

const real = globalThis.crypto;
const shimName = (alg: unknown) => (typeof alg === 'object' && alg && (alg as { name: string }).name === 'NODE-ED25519' ? 'Ed25519' : alg);
let privateKey: CryptoKey;
const toHex = (buf: ArrayBuffer) => Buffer.from(buf).toString('hex');

beforeAll(async () => {
  const pair = await real.subtle.generateKey('Ed25519', true, ['sign', 'verify']) as CryptoKeyPair;
  privateKey = pair.privateKey;
  state.publicKeyHex = toHex(await real.subtle.exportKey('raw', pair.publicKey));
  vi.stubGlobal('crypto', {
    subtle: {
      importKey: (f: string, k: ArrayBuffer, a: unknown, e: boolean, u: string[]) => real.subtle.importKey(f as 'raw', k, shimName(a) as 'Ed25519', e, u as KeyUsage[]),
      verify: (a: unknown, k: CryptoKey, s: ArrayBuffer, d: ArrayBuffer) => real.subtle.verify(shimName(a === 'NODE-ED25519' ? { name: a } : a) as 'Ed25519', k, s, d),
    },
  });
});
afterAll(() => vi.unstubAllGlobals());

async function sign(timestamp: string, body: string) {
  return toHex(await real.subtle.sign('Ed25519', privateKey, new TextEncoder().encode(`${timestamp}${body}`)));
}

const URL = 'http://probe.local/api/interactions-edge';
const TS = '1731045600';
const PING = '{"type":1}';
const COMMAND = '{"type":2,"data":{"name":"probe_cmd","type":1}}';
const MALFORMED = '{bad json';
const HUGE = 'x'.repeat(1_000_000);

type Cell = { label: string, method: string, headers: () => Promise<[string, string][]>, body: string | null, expect: number | 'throw', command?: boolean };

const sigFor = (body: string, ts = TS) => async () => [['x-signature-ed25519', await sign(ts, body)], ['x-signature-timestamp', ts]] as [string, string][];
const unsigned = (body: string) => sigFor(body);

const CELLS: Cell[] = [
  { label: 'GET, no headers', method: 'GET', headers: async () => [], body: null, expect: 405 },
  { label: 'PUT, signed ping', method: 'PUT', headers: sigFor(PING), body: PING, expect: 405 },
  { label: 'lowercase post (fetch normalises), no headers, malformed', method: 'post', headers: async () => [], body: MALFORMED, expect: 401 },
  { label: 'POST, no headers, malformed', method: 'POST', headers: async () => [], body: MALFORMED, expect: 401 },
  { label: 'POST, no headers, ping', method: 'POST', headers: async () => [], body: PING, expect: 401 },
  { label: 'POST, signature only', method: 'POST', headers: async () => [['x-signature-ed25519', 'aa']], body: MALFORMED, expect: 401 },
  { label: 'POST, timestamp only', method: 'POST', headers: async () => [['x-signature-timestamp', TS]], body: MALFORMED, expect: 401 },
  { label: 'POST, empty signature and timestamp', method: 'POST', headers: async () => [['x-signature-ed25519', ''], ['x-signature-timestamp', '']], body: MALFORMED, expect: 401 },
  { label: 'POST, odd-length signature', method: 'POST', headers: async () => [['x-signature-ed25519', 'abc'], ['x-signature-timestamp', TS]], body: MALFORMED, expect: 401 },
  { label: 'POST, 128 non-hex chars', method: 'POST', headers: async () => [['x-signature-ed25519', 'zz'.repeat(64)], ['x-signature-timestamp', TS]], body: MALFORMED, expect: 401 },
  { label: 'POST, signature of another body, malformed body', method: 'POST', headers: async () => (await sigFor(PING)()), body: MALFORMED, expect: 401 },
  { label: 'POST, signature of another body, command body', method: 'POST', headers: async () => (await sigFor(PING)()), body: COMMAND, expect: 401, command: false },
  { label: 'POST, valid signature, timestamp header altered', method: 'POST', headers: async () => [['x-signature-ed25519', await sign(TS, COMMAND)], ['x-signature-timestamp', '1731045601']], body: COMMAND, expect: 401, command: false },
  { label: 'POST, duplicated signature header', method: 'POST', headers: async () => { const s = await sign(TS, COMMAND); return [['x-signature-ed25519', s], ['x-signature-ed25519', s], ['x-signature-timestamp', TS]]; }, body: COMMAND, expect: 401, command: false },
  { label: 'POST, 1 MB unsigned junk', method: 'POST', headers: async () => [['x-signature-ed25519', 'aa'.repeat(64)], ['x-signature-timestamp', TS]], body: HUGE, expect: 401 },
  { label: 'POST, no body, valid signature of empty body', method: 'POST', headers: sigFor(''), body: null, expect: 401 },
  { label: 'control: POST, valid signature, ping', method: 'POST', headers: unsigned(PING), body: PING, expect: 200 },
  { label: 'control: POST, uppercase-hex valid signature, ping', method: 'POST', headers: async () => [['x-signature-ed25519', (await sign(TS, PING)).toUpperCase()], ['x-signature-timestamp', TS]], body: PING, expect: 200 },
  { label: 'control: POST, valid signature, command', method: 'POST', headers: sigFor(COMMAND), body: COMMAND, expect: 200, command: true },
  { label: 'POST, valid signature, malformed body (signed by the key holder only)', method: 'POST', headers: sigFor(MALFORMED), body: MALFORMED, expect: 'throw' },
];

describe('interactions-edge handler under raw Request input', () => {
  it.each(CELLS.map((c) => [c.label, c] as const))('%s', async (_label, cell) => {
    state.commandCalls = 0;
    const parse = vi.spyOn(JSON, 'parse');
    const request = new Request(URL, {
      method: cell.method,
      headers: await cell.headers(),
      body: cell.body,
    });
    let outcome: number | 'throw';
    let detail = '';
    try {
      const response = await handler(request as never);
      outcome = response.status;
      detail = (await response.text()).slice(0, 40);
    } catch (err) {
      outcome = 'throw';
      detail = `${(err as Error).name}: ${(err as Error).message}`.slice(0, 60);
    }
    const parses = parse.mock.calls.length;
    parse.mockRestore();
    console.log(`PROBE ${cell.label} :: status=${outcome} parses=${parses} commandCalls=${state.commandCalls} body="${detail}"`);
    expect(outcome).toBe(cell.expect);
    if (outcome === 401 || outcome === 405) expect(parses).toBe(0);
    if (cell.command !== undefined) expect(state.commandCalls).toBe(cell.command ? 1 : 0);
  });
});
