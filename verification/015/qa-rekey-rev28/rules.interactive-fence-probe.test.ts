// QA probe (not a suite file): interactive parseContent / parseEmbedField over M6-a's fence bodies.
// Writes probe.out (cwd):  per parser and body, the top-level node type sequence and whether a codeBlock node appears.
import { writeFileSync } from 'node:fs';
import { describe, it, vi } from 'vitest';
import markdown from '..';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

const BODIES: Array<[string, string]> = [
  ['tag-2', '```js\nfoo\nbar\n```'], ['notag-2', '```\nfoo\nbar\n```'],
  ['tag-3', '```js\na\nb\nc\n```'], ['notag-3', '```\na\nb\nc\n```'],
  ['notag-1', '```\nfoo\n```'], ['oneline', '```foo```'],
  ['empty-notag', '```\nfoo\n\nbar\n```'], ['empty-tag', '```js\nfoo\n\nbar\n```'],
  ['two-empty', '```\nfoo\n\n\nbar\n```'], ['ws-notag', '```\nfoo\n \nbar\n```'],
  ['ws-tag', '```js\nfoo\n \nbar\n```'], ['text-before', 'hi\n```\nfoo\n\nbar\n```'],
  ['text-after', '```\nfoo\n\nbar\n```\nbye'],
  ['control-nofence', 'foo\nbar'],
];
type N = { type: string; content?: unknown };
const flat = (nodes: N[]): string[] => nodes.flatMap((n) => [n.type, ...(Array.isArray(n.content) ? flat(n.content as N[]) : [])]);
describe('probe', () => {
  it('prints', () => {
    const out: string[] = [];
    for (const p of ['parseContent', 'parseEmbedField'] as const) {
      for (const [name, src] of BODIES) {
        const nodes = (markdown.interactive[p] as (s: string) => N[])(src);
        const types = flat(nodes);
        const cb = types.filter((t) => t === 'codeBlock').length;
        out.push(`PROBE ${p} ${name} codeBlockNodes=${cb} types=${types.join(',')}`);
      }
    }
    writeFileSync('probe.out', `${out.join('\n')}\n`);
  });
});
