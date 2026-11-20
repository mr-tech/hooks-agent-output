import { optionalIdMessageShape } from '/tmp/claude-1000/-usr-local-bin-hooks/cc97952f-db3a-4985-8eb7-5761df3eecca/scratchpad/export/src/server/api/utils/shapes';
const n = (k: number, f: (i: number) => unknown) => Array.from({ length: k }, (_, i) => f(i));
const base = (data: object) => ({ name: 'x', data });
const validEmbed = () => ({ title: 'ok' });
const cases: Record<string, object> = {
  'a embeds max10, 50 invalid': base({ embeds: n(50, () => ({ url: 'not-a-url' })) }),
  'b components max40, 100 invalid': base({ components: n(100, () => ({ type: 999 })) }),
  'c allowed_mentions.users no max, 100 invalid': base({ allowed_mentions: { users: n(100, () => 'bad') } }),
  'd control embeds 11 valid': base({ embeds: n(11, validEmbed) }),
};
for (const [k, v] of Object.entries(cases)) {
  const r = optionalIdMessageShape.safeParse(v);
  if (r.success) { console.log(k, '| success'); continue; }
  const codes = [...new Set(r.error.issues.map((i) => i.code))];
  console.log(k, '| issues', r.error.issues.length, '| codes', codes.join(','), '| first path', JSON.stringify(r.error.issues[0].path));
}
