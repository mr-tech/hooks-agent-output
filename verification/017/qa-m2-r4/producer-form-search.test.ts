// Search: contents whose producer-form hash (hashMessage over upsertMessage's input shape) is digits only, or a minus sign and digits.
import { writeFileSync } from 'node:fs';

import { it, vi } from 'vitest';

vi.mock('~/env.mjs', () => ({ env: new Proxy({}, { get: (_, key) => `test-${String(key)}` }) }));
import { hashMessage } from '~/utils';
const messageWith = (content: string) => ({ id: '42', name: 'n', data: { content, username: 'U', embeds: [], components: [] } });
it('search', () => {
  const found: Record<string, string[]> = { digits: [], minusDigits: [] };
  for (let i = 0; i < 400000 && (found.digits.length < 3 || found.minusDigits.length < 3); i++) {
    const c = `p${i}`; const h = hashMessage(messageWith(c) as never);
    if (/^[1-9][0-9]*$/.test(h) && found.digits.length < 3) found.digits.push(`${c} ${h}`);
    if (/^-[1-9][0-9]*$/.test(h) && found.minusDigits.length < 3) found.minusDigits.push(`${c} ${h}`);
  }
  writeFileSync(process.env.SEARCH_OUT ?? 'search.json', JSON.stringify(found));
});
