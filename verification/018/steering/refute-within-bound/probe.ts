import { optionalIdMessageShape } from '/tmp/claude-1000/-usr-local-bin-hooks/cc97952f-db3a-4985-8eb7-5761df3eecca/scratchpad/export/src/server/api/utils/shapes';
const rep = (n: number, f: () => unknown) => Array.from({ length: n }, f);
const row = () => ({ type: 1, components: rep(5, () => ({})) });
const sec = () => ({ type: 9, components: rep(3, () => ({})), accessory: {} });
const gal = () => ({ type: 12, items: rep(10, () => ({})) });
const cont = (kids: () => unknown) => ({ type: 17, components: rep(40, kids) });
let mix = 0;
const mixed = () => [row, sec, gal][mix++ % 3]!();
const embeds = rep(10, () => ({ fields: rep(25, () => ({})) }));
const fat = () => ({ type: 2, style: 1, emoji: { id: 1, name: 1, animated: 1 }, url: 'x', disabled: 1 });
const fatRow = () => ({ type: 1, components: rep(5, fat) });
const shapes: Record<string, unknown> = {
  F_fat_buttons: { components: rep(40, () => cont(fatRow)) },
  G_fat_buttons_plus_embeds: { components: rep(40, () => cont(fatRow)), embeds },
  A_rows_only: { components: rep(40, () => cont(row)) },
  B_sections_only: { components: rep(40, () => cont(sec)) },
  C_galleries_only: { components: rep(40, () => cont(gal)) },
  D_mixed_plus_embeds: { components: rep(40, () => cont(mixed)), embeds },
  E_rows_plus_embeds: { components: rep(40, () => cont(row)), embeds },
};
const nested = (i: any): number => 1 + (i.unionErrors ?? []).reduce((s: number, e: any) => s + e.issues.reduce((t: number, x: any) => t + nested(x), 0), 0);
for (const [k, data] of Object.entries(shapes)) {
  const body = JSON.stringify({ name: 'x', data });
  const t0 = performance.now();
  const r = optionalIdMessageShape.safeParse({ name: 'x', data });
  const t1 = performance.now();
  if (r.success) { console.log(k, 'SUCCESS?'); continue; }
  const m = r.error.message;
  const t2 = performance.now();
  console.log(JSON.stringify({ shape: k, bodyBytes: body.length, under1MB: body.length < 1e6, topIssues: r.error.issues.length, nestedIssues: r.error.issues.reduce((s, i) => s + nested(i), 0), messageLen: m.length, parseMs: +(t1 - t0).toFixed(1), msgMs: +(t2 - t1).toFixed(1) }));
}
