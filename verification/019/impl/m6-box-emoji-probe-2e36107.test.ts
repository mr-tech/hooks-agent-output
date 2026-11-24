import { writeFileSync } from 'node:fs';
import { beforeAll, it } from 'vitest';
import { openLive, type Live } from '../helpers/discordLive';
import { openBoxes } from '../helpers/discordBoxes';
import { CONTENT_MASK_LITERAL } from '../helpers/discordOracle';

let live: Live;
beforeAll(async () => { live = await openLive(); await openBoxes(live); }, 120_000);

it('probe', () => {
  const mod = live.oracle.req(live.moduleIds.nativeBox) as Record<string, unknown>;
  const fn = Object.values(mod).find((f) => typeof f === 'function' && Function.prototype.toString.call(f).includes('nativeMarkdownSyntax') && Function.prototype.toString.call(f).includes('codeBlocks')) as (e: unknown) => Record<string, unknown>;
  const editor = { children: [{ type: 'line', children: [{ text: 'a😀b :smile: <:n:123456789012345678> <@1> <t:1:f> https://x.y' }] }], nativeMarkdownSyntax: CONTENT_MASK_LITERAL };
  const doc = fn(editor);
  const blocks = doc.blocks as Array<Record<string, unknown> | null>;
  writeFileSync(process.env.PROBE_OUT as string, JSON.stringify({
    docKeys: Object.keys(doc), blockKeys: blocks.map((b) => (b ? Object.keys(b) : null)),
    entryKeys: blocks[0] ? (blocks[0].entries as Array<Record<string, unknown>>).map((e) => Object.keys(e)) : null,
    exports: Object.keys(mod), src: Function.prototype.toString.call(fn).slice(3000, 6500), entries: blocks[0] ? blocks[0].entries : null,
  }, null, 1));
}, 120_000);
