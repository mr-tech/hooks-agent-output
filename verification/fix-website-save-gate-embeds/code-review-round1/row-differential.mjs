// Code-review instrument (fix-website-save-gate-embeds). Run from a website tree:
//   npx tsx <this file> > rows-<sha>.json
// Prints resolveContentLoss's disposition (row, mode, noticeClass, options) for every cell of a
// corpus over (flags, components, content, embeds); diff two trees' outputs to find the cells the
// change moves. Corpus is exhaustive over the listed values, not random: the input class is small.
import { resolveContentLoss } from '~/utils';

const BIT = 1 << 15;
const flagsSet = [undefined, 0, BIT, BIT | 4];
const componentsSet = {
  none: undefined,
  empty: [],
  actionRow: [{ type: 1, components: [{ type: 2, style: 5, url: 'https://x', label: 'l' }] }],
  container: [{ type: 17, components: [] }],
  textDisplay: [{ type: 10, content: 'x' }],
};
const contentSet = { undef: undefined, empty: '', blank: '  ', text: 'hi' };
const embedsSet = {
  undef: undefined,
  none: [],
  empty: [{}],
  emptyTitle: [{ title: '' }],
  keyOnly: [{ _key: 'k1' }],
  emptyFields: [{ fields: [] }],
  nullDesc: [{ description: null }],
  twoEmpty: [{}, { title: '' }],
  titled: [{ title: 't' }],
  emptyPlusTitled: [{}, { title: 't' }],
};
const out = [];
for (const f of flagsSet) for (const [ck, c] of Object.entries(componentsSet))
  for (const [tk, t] of Object.entries(contentSet)) for (const [ek, e] of Object.entries(embedsSet)) {
    const d = resolveContentLoss(f, c, t, e);
    out.push({ cell: `${f}|${ck}|${tk}|${ek}`, row: d.row, mode: d.mode, notice: d.noticeClass, options: d.options });
  }
process.stdout.write(JSON.stringify(out, null, 1));
