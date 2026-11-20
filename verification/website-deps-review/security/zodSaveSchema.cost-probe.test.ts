// A measurement, not a suite test: it is never placed in the website repository.
// Measures what the website's own save schema (`optionalIdMessageShape`, the input of the tRPC
// procedure `message.upsert`) costs on a request body of PROBE_BYTES bytes whose array elements all fail.
//
// Usage: copy this file into an isolated export of the website at
//   src/server/api/utils/__tests__/zodSaveSchema.cost-probe.test.ts
// and, with that export as cwd, run
//   SKIP_ENV_VALIDATION=1 PROBE_BYTES=1048576 PROBE_OUT=<file> npx vitest run src/server/api/utils/__tests__/zodSaveSchema.cost-probe.test.ts
// It appends one JSON line per payload to PROBE_OUT: body size, issue count, elapsed ms, heap growth,
// and the length of ZodError.message, which tRPC's default error shape returns as the response message.
import { appendFileSync, readFileSync } from 'node:fs';
import path from 'node:path';

import { it } from 'vitest';

import { optionalIdMessageShape } from '../shapes';

const limit = Number(process.env.PROBE_BYTES);
const out = String(process.env.PROBE_OUT);

type Field = 'users' | 'embeds' | 'components' | 'container';

// Each payload fills the body budget with the shortest element that fails its array's element schema.
function body(field: Field): string {
  const head = (inner: string) => `{"message":{"name":"a","data":${inner}}}`;
  const fill = (prefix: string, suffix: string) => {
    const n = Math.floor((limit - head(prefix + suffix).length) / 2);
    return head(`${prefix}${'0,'.repeat(n - 1)}0${suffix}`);
  };
  if (field === 'users') return fill('{"allowed_mentions":{"users":[', ']}}');
  if (field === 'embeds') return fill('{"embeds":[', ']}');
  if (field === 'components') return fill('{"components":[', ']}');
  return fill('{"components":[{"type":17,"components":[', ']}]}');
}

it('records the cost of each payload', () => {
  const zodVersion = (JSON.parse(readFileSync(path.join(process.cwd(), 'node_modules/zod/package.json'), 'utf8')) as { version: string }).version;
  appendFileSync(out, `${JSON.stringify({ zod: zodVersion, node: process.version, limitBytes: limit })}\n`);
  for (const field of ['users', 'embeds', 'components', 'container'] as const) {
    const json = body(field);
    const heapBefore = process.memoryUsage().heapUsed;
    const started = process.hrtime.bigint();
    const result = optionalIdMessageShape.safeParse((JSON.parse(json) as { message: unknown }).message);
    const parseMs = Number(process.hrtime.bigint() - started) / 1e6;
    const messageStarted = process.hrtime.bigint();
    const errorMessageBytes = result.success ? 0 : result.error.message.length;
    const errorMessageMs = Number(process.hrtime.bigint() - messageStarted) / 1e6;
    appendFileSync(out, `${JSON.stringify({
      field,
      bodyBytes: json.length,
      success: result.success,
      issues: result.success ? 0 : result.error.issues.length,
      parseMs: Math.round(parseMs),
      errorMessageBytes,
      errorMessageMs: Math.round(errorMessageMs),
      heapGrowthMB: Math.round((process.memoryUsage().heapUsed - heapBefore) / 1048576),
      rssMB: Math.round(process.memoryUsage().rss / 1048576),
    })}\n`);
  }
}, 200000);
