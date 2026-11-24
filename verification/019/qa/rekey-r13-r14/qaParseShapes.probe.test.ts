import { writeFileSync } from 'node:fs';
import { init, parse, parseLossless, Syntax } from '@discord/markdown-wasm';
import { beforeAll, it } from 'vitest';

beforeAll(async () => { await (init as () => Promise<void>)(); });

it('shows both entry points on emoji inputs', () => {
  const mask = Syntax.ALL & ~Syntax.DEV_LINKS;
  const inputs = ['😄:smile:', ':smile:😄', '\\*a😄', '\\:smile: 😄', '😄😄'];
  const out = inputs.map((t) => ({ t, parse: parse(t, mask), lossless: (parseLossless as (a: string, b: number) => unknown)(t, mask) }));
  writeFileSync(process.env.QA_OUT as string, JSON.stringify(out, (_k, v) => (typeof v === "bigint" ? v.toString() : v), 1));
});
