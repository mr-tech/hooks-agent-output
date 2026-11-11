// AC1-2 (plan 016): every limb L1 to L10 at every placement the ledger's Placement paragraph names,
// by constructed members, beside a valid control at the same placement. Each fault is put first,
// in the middle and last among valid siblings wherever its host is a list. Expected values are the
// ledger's: a fault is refused (non-empty reason), a control is sent (''). Run over an export:
//   SKIP_ENV_VALIDATION=1 WEBSITE_ROOT=<export> unshare -rn node --experimental-transform-types \
//     --import ../corpus/ts-register.mjs placement_probe.mjs <out.json>
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const { validateMessage } = await import(pathToFileURL(path.join(process.env.WEBSITE_ROOT, 'src/utils/limits.tsx')).href);
const img = 'https://example.com/a.png';
const td = (content = 'hello') => ({ type: 10, content });
const thumb = (o = {}) => ({ type: 11, media: { url: img }, ...o });
const btn = (o = {}) => ({ type: 2, style: 5, label: 'Go', url: 'https://example.com', ...o });
const drop = (o, k) => { const c = { ...o }; delete c[k]; return c; };
const okItem = { media: { url: img } };
const send = (components) => validateMessage({ username: 'Probe', flags: 32768, components });
const at = (list, piece, pos) => (pos === 'first' ? [piece, ...list] : pos === 'last' ? [...list, piece] : [list[0], piece, ...list.slice(1)]);
const POS = ['first', 'middle', 'last'];

// hosts: each returns the top-level component list for a piece at a placement and position
const hosts = {
  'top-level': (p, pos) => at([td(), td()], p, pos),
  'in Container': (p, pos) => [{ type: 17, components: at([td(), td()], p, pos) }],
  'Section child, top-level': (p, pos) => [{ type: 9, components: at([td(), td()], p, pos), accessory: thumb() }],
  'Section child, in Container': (p, pos) => [{ type: 17, components: [{ type: 9, components: at([td(), td()], p, pos), accessory: thumb() }] }],
  'Section accessory, top-level': (p) => [td(), { type: 9, components: [td()], accessory: p }, td()],
  'Section accessory, in Container': (p) => [{ type: 17, components: [td(), { type: 9, components: [td()], accessory: p }, td()] }],
  'Action Row button, top-level': (p, pos) => [td(), { type: 1, components: at([btn(), btn()], p, pos) }, td()],
  'Action Row button, in Container': (p, pos) => [{ type: 17, components: [td(), { type: 1, components: at([btn(), btn()], p, pos) }] }],
  'gallery item, top-level': (p, pos) => [td(), { type: 12, items: at([okItem, okItem], p, pos) }, td()],
  'gallery item, in Container': (p, pos) => [{ type: 17, components: [td(), { type: 12, items: at([okItem, okItem], p, pos) }] }],
};
const childPlaces = ['top-level', 'in Container'];
const textPlaces = [...childPlaces, 'Section child, top-level', 'Section child, in Container'];
const accPlaces = ['Section accessory, top-level', 'Section accessory, in Container'];
const btnPlaces = ['Action Row button, top-level', 'Action Row button, in Container', ...accPlaces];
const itemPlaces = ['gallery item, top-level', 'gallery item, in Container'];

const faults = [
  ['L1', 'Text Display content absent', { type: 10 }, textPlaces],
  ['L1', "Text Display content ''", td(''), textPlaces],
  ['L1', 'Text Display content U+0085 then space', td('\u0085 '), textPlaces],
  ['L2', 'Section components []', { type: 9, components: [], accessory: thumb() }, childPlaces],
  ['L2', 'Section components absent', { type: 9, accessory: thumb() }, childPlaces],
  ['L2', 'Section accessory absent', { type: 9, components: [td()] }, childPlaces],
  ['L3', 'Media Gallery items []', { type: 12, items: [] }, childPlaces],
  ['L3', 'Media Gallery items absent', { type: 12 }, childPlaces],
  ['L4', 'Container components []', { type: 17, components: [] }, ['top-level']],
  ['L4', 'Container components absent', { type: 17 }, ['top-level']],
  ['L5', 'Action Row components []', { type: 1, components: [] }, childPlaces],
  ['L5', 'Action Row components absent', { type: 1 }, childPlaces],
  ['L6', "Thumbnail media.url ''", thumb({ media: { url: '' } }), accPlaces],
  ['L6', 'Thumbnail media {}', thumb({ media: {} }), accPlaces],
  ['L6', 'Thumbnail media absent', drop(thumb(), 'media'), accPlaces],
  ['L6', "gallery item media.url ''", { media: { url: '' } }, itemPlaces],
  ['L6', 'gallery item media absent', {}, itemPlaces],
  ['L6', "link button url ''", btn({ url: '' }), btnPlaces],
  ['L6', 'link button url absent', drop(btn(), 'url'), btnPlaces],
  ['L7', "Thumbnail media.url 'abc'", thumb({ media: { url: 'abc' } }), accPlaces],
  ['L7', "gallery item media.url 'abc'", { media: { url: 'abc' } }, itemPlaces],
  ['L7', "link button url 'abc'", btn({ url: 'abc' }), btnPlaces],
  ['L7', 'link button url ftp://', btn({ url: 'ftp://example.com/x' }), btnPlaces],
  ['L8', 'link button label absent, no emoji', drop(btn(), 'label'), btnPlaces],
  ['L8', 'link button label one space, no emoji', btn({ label: ' ' }), btnPlaces],
  ['L8', 'link button label absent, emoji {}', btn({ label: undefined, emoji: {} }), btnPlaces],
  ['L9', 'File', { type: 13, file: { url: 'https://example.com/a.png' } }, childPlaces],
  ['L10', "Thumbnail description ''", thumb({ description: '' }), accPlaces],
  ['L10', 'Thumbnail description 1025', thumb({ description: 'a'.repeat(1025) }), accPlaces],
  ['L10', "gallery item description ''", { media: { url: img }, description: '' }, itemPlaces],
  ['L10', 'gallery item description 1025', { media: { url: img }, description: 'a'.repeat(1025) }, itemPlaces],
];
const controls = [
  ['control', 'Text Display filled', td('hi'), textPlaces],
  ['control', 'Section filled', { type: 9, components: [td()], accessory: thumb() }, childPlaces],
  ['control', 'Media Gallery filled', { type: 12, items: [okItem] }, childPlaces],
  ['control', 'Container filled', { type: 17, components: [td()] }, ['top-level']],
  ['control', 'Action Row filled', { type: 1, components: [btn()] }, childPlaces],
  ['control', 'Thumbnail with an ftp URL (X6)', thumb({ media: { url: 'ftp://example.com/a.png' } }), accPlaces],
  ['control', 'Thumbnail description 1024', thumb({ description: 'a'.repeat(1024) }), accPlaces],
  ['control', 'Thumbnail description one space', thumb({ description: ' ' }), accPlaces],
  ['control', 'gallery item description 1024', { media: { url: img }, description: 'a'.repeat(1024) }, itemPlaces],
  ['control', 'link button https', btn(), btnPlaces],
  ['control', 'link button discord://', btn({ url: 'discord://-/channels/1/2' }), btnPlaces],
  ['control', 'link button emoji name, no label', btn({ label: undefined, emoji: { name: 'x' } }), btnPlaces],
  ['control', 'link button emoji id, no label', btn({ label: undefined, emoji: { id: '123' } }), btnPlaces],
  ['control', 'link button label U+FEFF', btn({ label: '﻿' }), btnPlaces],
];
const listHost = (h) => !h.startsWith('Section accessory');
const rows = []; let wrong = 0;
for (const [limb, name, piece, places] of [...faults, ...controls]) {
  for (const place of places) {
    for (const pos of (listHost(place) ? POS : ['only'])) {
      const reason = send(hosts[place](piece, pos));
      const ok = limb === 'control' ? reason === '' : reason !== '';
      if (!ok) wrong += 1;
      rows.push({ limb, name, place, pos, reason, ok });
    }
  }
}
writeFileSync(process.argv[2], JSON.stringify(rows, null, 1));
const f = rows.filter((r) => r.limb !== 'control'); const c = rows.filter((r) => r.limb === 'control');
console.log(`fault rows ${f.length} refused ${f.filter((r) => r.ok).length}; control rows ${c.length} sent ${c.filter((r) => r.ok).length}; wrong ${wrong}`);
for (const r of rows.filter((x) => !x.ok)) console.log('WRONG', JSON.stringify(r));
process.exitCode = wrong ? 1 : 0;
