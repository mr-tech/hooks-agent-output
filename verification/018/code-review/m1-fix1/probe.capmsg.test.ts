import { writeFileSync } from 'node:fs';

import { it } from 'vitest';
import { z } from 'zod';

import { preferencesInputs, upsertInputs } from './inputs';

import {
  cappedInput, optionalIdMessageShape, partialMessageShape,
} from '~/server/api/utils/shapes';

const run = async (schema: { parseAsync: (v: unknown) => Promise<unknown> }, inputs: Record<string, unknown>) => {
  const out: Record<string, unknown> = {};
  for (const [name, value] of Object.entries(inputs)) {
    try {
      await schema.parseAsync(value);
      out[name] = 'accepted';
    } catch (error) {
      const { issues } = error as z.ZodError;
      out[name] = {
        issues: issues.length,
        summary: issues.some(({ code, path }) => code === 'custom' && path.length === 0),
        displayable: issues.filter(({ path }) => path.join('.').endsWith('data.components')).map(({ message }) => message),
      };
    }
  }
  return out;
};

it('records the capped refusals of both procedure input shapes', async () => {
  const out = {
    upsert: await run(cappedInput(z.object({ message: optionalIdMessageShape })), upsertInputs),
    updatePreferencesMessage: await run(cappedInput(z.object({ message: partialMessageShape.nullable().optional() })), preferencesInputs),
  };
  writeFileSync(process.env.PROBE_OUT as string, JSON.stringify(out, null, 1));
});
