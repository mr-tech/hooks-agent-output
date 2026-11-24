// Variants on plain slate 0.123.0: which per-op cost is O(N)?
import { createRequire } from 'module';
const require = createRequire('/usr/local/bin/hooks/website/package.json');
const { createEditor, Editor, Transforms } = require('slate');
function make(n, quietAll) {
  const e = createEditor();
  e.isInline = (el) => el.type === 'emoji'; e.isVoid = (el) => el.type === 'emoji';
  const { getDirtyPaths } = e;
  if (quietAll) e.getDirtyPaths = () => [];
  e.children = Array.from({ length: n }, () => ({ type: 'div', children: [{ text: 'a🙂' }] }));
  return () => Editor.withoutNormalizing(e, () => {
    for (let i = 0; i < n; i += 1) {
      e.apply({ type: 'set_node', path: [i], properties: { type: 'div' }, newProperties: { type: 'code' } });
      e.apply({ type: 'remove_text', path: [i, 0], offset: 1, text: '🙂' });
      e.apply({ type: 'insert_node', path: [i, 1], node: { type: 'emoji', children: [{ text: '' }] } });
      e.apply({ type: 'insert_node', path: [i, 2], node: { text: '' } });
    }
  });
}
// Variant "rebuild": one remove_node + insert_node per line (line rebuilt with its new children).
function makeRebuild(n, quietAll) {
  const e = createEditor();
  e.isInline = (el) => el.type === 'emoji'; e.isVoid = (el) => el.type === 'emoji';
  if (quietAll) e.getDirtyPaths = () => [];
  e.children = Array.from({ length: n }, () => ({ type: 'div', children: [{ text: 'a🙂' }] }));
  return () => Editor.withoutNormalizing(e, () => {
    for (let i = 0; i < n; i += 1) {
      const old = e.children[i];
      e.apply({ type: 'remove_node', path: [i], node: old });
      e.apply({ type: 'insert_node', path: [i], node: { type: 'code', children: [{ text: 'a' }, { type: 'emoji', children: [{ text: '' }] }, { text: '' }] } });
    }
  });
}
const time = (fn) => { const ms = []; for (let r = 0; r < 5; r += 1) { const run = fn(); const t = performance.now(); run(); ms.push(performance.now() - t); } ms.sort((a, b) => a - b); return +ms[2].toFixed(1); };
for (const [name, f] of [['inPlace', make], ['rebuild', makeRebuild]]) for (const quietAll of [false, true]) for (const n of [200, 1000, 2000])
  console.log(JSON.stringify({ form: name, quietAll, n, medianMs: time(() => f(n, quietAll)) }));
