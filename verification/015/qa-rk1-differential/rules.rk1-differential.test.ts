// QA Phase 2 instrument (chain 015, RK-1): the shipped code-block parse against Discord's rule over a generated space.
// Reference ("Discord's rule", plan RK-1 / research F-38): the fence regex below, matched over the whole message in
// inline scope (Discord has no paragraphs). Shipped: the tree's parseContent and parseEmbedField rule sets, parsed the
// way staticParserFor parses (block scope). Compared: the sequence of code blocks, [lang, content], per member.
// Observational: no case asserts; the output file is the record.
import { appendFileSync } from 'node:fs';
import SimpleMarkdown from 'simple-markdown';
import { describe, it, vi } from 'vitest';

import { translateSurrogatesToInlineEmoji } from '../emoji';
import { staticBaseRules } from '../rules';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

const OUT = process.env.PROBE_OUT ?? '/dev/null';
const DISCORD_FENCE = /^```(([a-z0-9-]+?)\n+)?\n*([^\n][^]*?)\n*```/i;

type Rules = Record<string, unknown>;
const without = (rules: Rules, keys: string[]) => Object.fromEntries(Object.entries(rules).filter(([k]) => !keys.includes(k)));

const shippedContent = SimpleMarkdown.parserFor(staticBaseRules as never);
const shippedField = SimpleMarkdown.parserFor(without(staticBaseRules, ['heading']) as never);
const referenceRules = {
  ...staticBaseRules,
  codeBlock: {
    ...(staticBaseRules as Rules).codeBlock as object,
    match: SimpleMarkdown.inlineRegex(DISCORD_FENCE),
    parse: (capture: string[]) => ({ lang: (capture[2] || '').trim(), content: capture[3] || '' }),
  },
};
const reference = SimpleMarkdown.parserFor(referenceRules as never);

function blocks(node: unknown, acc: string[][] = []): string[][] {
  if (Array.isArray(node)) { node.forEach((n) => blocks(n, acc)); return acc; }
  if (node && typeof node === 'object') {
    const n = node as { type?: string, lang?: string, content?: unknown };
    if (n.type === 'codeBlock') acc.push([n.lang ?? '', String(n.content ?? '')]);
    else if (n.content !== undefined) blocks(n.content, acc);
  }
  return acc;
}

function members(): Array<[string, string]> {
  const out: Array<[string, string]> = [];
  const prefixes = ['', 'hi ', 'hi\n', 'hi\n\n'];
  const tags = ['', 'js', 'c++', 'c#', 'objective-c', 'a-b'];
  const bodies = ['', 'x', 'foo\nbar', 'a\nb\nc\nd', '\nfoo', 'foo\n', '\n\nfoo\n\n', 'foo\n\nbar', 'foo\n \nbar',
    'foo\n\n\nbar', 'a ``` b', 'foo\n```\nbar', '`x`'];
  const suffixes = ['', ' after', '\nafter', '\n\nafter', '\n\n```\nz\n```'];
  for (const p of prefixes) {
    for (const t of tags) {
      for (const b of bodies) {
        for (const s of suffixes) {
          for (const closed of [true, false]) {
            for (const eol of ['\n', '\r\n']) {
              const src = `${p}\`\`\`${t}\n${b}${closed ? '\n```' : ''}${s}`.replace(/\n/g, eol);
              out.push([`p=${JSON.stringify(p)} t=${JSON.stringify(t)} b=${JSON.stringify(b)} s=${JSON.stringify(s)} closed=${closed} eol=${JSON.stringify(eol)}`, src]);
            }
          }
        }
      }
    }
  }
  out.push(['stray fence in two paragraphs', 'one ``` stray\n\ntwo ``` stray']);
  out.push(['fence on one line', '```foo```']);
  out.push(['fence with tag only', '```js\n```']);
  return out;
}

describe('RK-1 differential', () => {
  it('compares every member', () => {
    const all = members();
    let differ = 0;
    const kinds: Record<string, number> = {};
    for (const [name, src] of all) {
      const pre = translateSurrogatesToInlineEmoji(src);
      const ref = JSON.stringify(blocks(reference(pre, { inline: true, isEmbed: false, mounted: false } as never)));
      for (const [pn, parser] of [['parseContent', shippedContent], ['parseEmbedField', shippedField]] as const) {
        const got = JSON.stringify(blocks(parser(pre, { isEmbed: false, mounted: false } as never)));
        if (got !== ref) {
          differ += 1;
          const kind = `${pn} shipped=${got === '[]' ? 'none' : 'some'} discord=${ref === '[]' ? 'none' : 'some'}`;
          kinds[kind] = (kinds[kind] ?? 0) + 1;
          appendFileSync(OUT, `DIFF ${pn} ${name}\n  shipped=${got}\n  discord=${ref}\n`);
        }
      }
    }
    appendFileSync(OUT, `SUMMARY members=${all.length} comparisons=${all.length * 2} differ=${differ}\n`);
    for (const [k, v] of Object.entries(kinds)) appendFileSync(OUT, `KIND ${k}: ${v}\n`);
  });
});
