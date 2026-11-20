import { writeFileSync } from 'node:fs';

import { expect, it } from 'vitest';
import { z } from 'zod';

import { inputs, reduce } from './inputs';

import { cappedInput, optionalIdMessageShape } from '~/server/api/utils/shapes';

it('records the upsert input refusal at the tip', async () => {
  const schema = cappedInput(z.object({ message: optionalIdMessageShape }));
  const out: Record<string, unknown> = {};
  for (const [name, value] of Object.entries(inputs)) {
    try {
      await schema.parseAsync(value);
      out[name] = 'accepted';
    } catch (error) {
      expect(error).toBeInstanceOf(z.ZodError);
      out[name] = reduce((error as z.ZodError).issues);
    }
  }
  writeFileSync(process.env.PROBE_OUT as string, JSON.stringify(out, null, 1));
});
