// QA Phase 1 probe (chain 018, plan rev 3 M1-i "a short reason"), isolated export of website 7923a1d. Feeds the real
// formatMutationError a tRPC-style message holding 20 zod issues plus one summary issue (code custom, path []) and
// reports how many lines it renders and whether it fell back to the raw message.
import { writeFileSync } from 'node:fs';

import { describe, it } from 'vitest';

import formatMutationError from '~/utils/formatMutationError';

describe('capped refusal through the client formatter', () => {
  it('reports', () => {
    const issues = Array.from({ length: 20 }, (_, i) => ({
      code: 'invalid_string', validation: 'regex', message: 'Invalid', path: ['message', 'data', 'allowed_mentions', 'users', i],
    }));
    const summary = { code: 'custom', message: 'Validation stopped after 20 errors', path: [] };
    const message = JSON.stringify([...issues, summary], null, 2);
    const text = formatMutationError({ message }) ?? '';
    const lines = text.split('\n');
    const out = [
      `rendered lines ${lines.length} | fell back to raw message: ${text === message}`,
      `line 1: ${lines[0]}`,
      `last line: ${lines[lines.length - 1]}`,
      `message bytes ${Buffer.byteLength(message)}`,
    ];
    writeFileSync(process.env.PROBE_OUT as string, `${out.join('\n')}\n`);
  });
});
