// QA Phase 1 probe (chain 018, plan rev 3 M1-i and M1-b), isolated export of website 7923a1d.
// tRPC 11 parses a procedure's zod 3.22.4 input with parseAsync (getParseFn: no "~standard" key, so parser.parseAsync).
// Questions: (1) do sync and async parses of the real save schema record the same issues in the same order?
// (2) does a contextual error map that throws a sentinel on the 21st issue stop an ASYNC parse there, or do
// sibling branches keep creating issues after the throw?
import { writeFileSync } from 'node:fs';

import { describe, it, vi } from 'vitest';

import { optionalIdMessageShape } from '~/server/api/utils/shapes';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

const bad = { type: 10, content: 1 };
// Every list within its bound; issues spread across siblings: 40 containers x 40 invalid children, 10 embeds x 25 invalid fields,
// 100 invalid user ids.
const input = {
  name: 'n',
  data: {
    components: Array.from({ length: 40 }, () => ({ type: 17, components: Array.from({ length: 40 }, () => bad) })),
    embeds: Array.from({ length: 10 }, () => ({ fields: Array.from({ length: 25 }, () => ({ name: 1, value: 'b' })) })),
    allowed_mentions: { users: Array.from({ length: 100 }, () => 'x') },
  },
};
const key = (i: { code: string, path: (string | number)[] }) => `${i.code}@${i.path.join('.')}`;

describe('error cap under parseAsync', () => {
  it('reports', async () => {
    const out: string[] = [];
    const s = optionalIdMessageShape.safeParse(input);
    const a = await optionalIdMessageShape.safeParseAsync(input);
    const si = s.success ? [] : s.error.issues.map(key);
    const ai = a.success ? [] : a.error.issues.map(key);
    const firstDiff = si.findIndex((k, i) => k !== ai[i]);
    out.push(`sync issues ${si.length} | async issues ${ai.length} | same order: ${firstDiff === -1 && si.length === ai.length} | first differing index ${firstDiff}`);
    out.push(`sync first 3: ${si.slice(0, 3).join(' ')} | async first 3: ${ai.slice(0, 3).join(' ')}`);
    for (const mode of ['sync', 'async'] as const) {
      const STOP = Symbol('stop');
      let calls = 0;
      let callsAfterStop = 0;
      let stopped = false;
      const errorMap = (_: unknown, ctx: { defaultError: string }) => {
        if (stopped) { callsAfterStop += 1; throw STOP; }
        calls += 1;
        if (calls > 20) { stopped = true; throw STOP; }
        return { message: ctx.defaultError };
      };
      let outcome: string;
      const t0 = Date.now();
      try {
        const r = mode === 'sync' ? optionalIdMessageShape.safeParse(input, { errorMap }) : await optionalIdMessageShape.safeParseAsync(input, { errorMap });
        outcome = r.success ? 'success' : `returned refused, ${r.error.issues.length} issues`;
      } catch (e) {
        outcome = e === STOP ? 'threw the sentinel' : `threw other: ${String(e)}`;
      }
      await new Promise((r) => { setTimeout(r, 50); });
      out.push(`${mode} with stopping errorMap: ${outcome} | issues mapped before stop ${calls} | error-map calls after the stop ${callsAfterStop} | ${Date.now() - t0} ms`);
    }
    writeFileSync(process.env.PROBE_OUT as string, `${out.join('\n')}\n`);
  });
});
