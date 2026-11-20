import { writeFileSync } from 'node:fs';

import { it } from 'vitest';
import { z } from 'zod';

import { inputs } from './inputs';

import { cappedInput, optionalIdMessageShape } from '~/server/api/utils/shapes';

const section = { type: 9, components: [], accessory: {} };
const container = { type: 17, components: Array.from({ length: 40 }, () => section) };

const cases: Record<string, unknown> = {
  ...inputs,
  failingAccessories_40x40: { message: { name: 'n', data: { components: Array.from({ length: 40 }, () => container) } } },
};

it('records the capped refusal under the installed zod', async () => {
  const schema = cappedInput(z.object({ message: optionalIdMessageShape }));
  const out: Record<string, unknown> = { zod: (await import('zod/package.json')).version };
  for (const [name, value] of Object.entries(cases)) {
    try {
      await schema.parseAsync(value);
      out[name] = 'accepted';
    } catch (error) {
      const { issues, message } = error as z.ZodError;
      out[name] = {
        issues: issues.length,
        messageChars: message.length,
        hasSummary: issues.some(({ path, code }) => code === 'custom' && path.length === 0),
        issue19: issues[19]?.message,
      };
    }
  }
  writeFileSync(process.env.PROBE_OUT as string, JSON.stringify(out, null, 1));
});
