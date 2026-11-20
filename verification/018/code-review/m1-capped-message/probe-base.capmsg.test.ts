import { writeFileSync } from 'node:fs';

import { it } from 'vitest';
import { z } from 'zod';

import { inputs, reduce } from './inputs';

import { optionalIdMessageShape } from '~/server/api/utils/shapes';

it('records the upsert input refusal at the base', () => {
  const schema = z.object({ message: optionalIdMessageShape });
  const out: Record<string, unknown> = {};
  for (const [name, value] of Object.entries(inputs)) {
    const result = schema.safeParse(value);
    out[name] = result.success ? 'accepted' : reduce(result.error.issues);
  }
  writeFileSync(process.env.PROBE_OUT as string, JSON.stringify(out, null, 1));
});
