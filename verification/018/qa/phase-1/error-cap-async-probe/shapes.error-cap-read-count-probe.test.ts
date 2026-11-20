// QA Phase 1 probe (chain 018, plan rev 3 M1-i): can a test tell "stopped" from "parsed whole, then trimmed" from outside the
// parse, by counting reads of the input elements' properties? Isolated export of website 7923a1d; the parse is the real
// optionalIdMessageShape under parseAsync (the path tRPC 11 uses).
import { writeFileSync } from 'node:fs';

import { describe, it, vi } from 'vitest';

import { optionalIdMessageShape } from '~/server/api/utils/shapes';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

let reads = 0;
const counted = () => {
  const o: Record<string, unknown> = {};
  Object.defineProperty(o, 'type', { enumerable: true, get: () => { reads += 1; return 10; } });
  Object.defineProperty(o, 'content', { enumerable: true, get: () => { reads += 1; return 1; } });
  return o;
};
const make = () => ({
  name: 'n',
  data: { components: Array.from({ length: 40 }, () => ({ type: 17, components: Array.from({ length: 40 }, counted) })) },
});

describe('read count discriminates a stopped parse', () => {
  it('reports', async () => {
    const out: string[] = [];
    reads = 0;
    const full = await optionalIdMessageShape.safeParseAsync(make());
    out.push(`full parse (no stop): ${full.success ? 0 : full.error.issues.length} issues | element property reads ${reads}`);
    reads = 0;
    const r = await optionalIdMessageShape.safeParseAsync(make());
    const trimmed = r.success ? [] : r.error.issues.slice(0, 20);
    out.push(`full parse then trimmed to 20 (the mutant): ${trimmed.length} issues kept | element property reads ${reads}`);
    const STOP = Symbol('stop');
    let calls = 0;
    const errorMap = (_: unknown, ctx: { defaultError: string }) => {
      calls += 1;
      if (calls > 20) throw STOP;
      return { message: ctx.defaultError };
    };
    reads = 0;
    try { await optionalIdMessageShape.safeParseAsync(make(), { errorMap }); } catch (e) { if (e !== STOP) throw e; }
    out.push(`stopped at the 21st issue: element property reads ${reads}`);
    writeFileSync(process.env.PROBE_OUT as string, `${out.join('\n')}\n`);
  });
});
