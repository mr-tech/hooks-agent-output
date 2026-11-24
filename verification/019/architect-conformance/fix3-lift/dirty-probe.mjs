// Plain slate 0.123.0 (website's installed copy, read-only). Mirrors Fix Round 3's 4 ops per emoji line
// (set_node, remove_text, insert_node emoji, insert_node padding) after a retype that dirties every line.
import { createRequire } from 'module';
const require = createRequire('/usr/local/bin/hooks/website/package.json');
const { createEditor, Editor, Transforms } = require('slate');
function make(n, quiet) {
  const e = createEditor();
  e.isInline = (el) => el.type === 'emoji'; e.isVoid = (el) => el.type === 'emoji';
  const { getDirtyPaths } = e; let settling = false;
  if (quiet) e.getDirtyPaths = (op) => (settling ? [] : getDirtyPaths(op));
  e.children = Array.from({ length: n }, () => ({ type: 'div', children: [{ text: 'a🙂' }] }));
  return { e, run(mode) {
    Editor.withoutNormalizing(e, () => {
      for (let i = 0; i < n; i += 1) Transforms.setNodes(e, { type: 'code' }, { at: [i] }); // the retype: N dirty lines
      settling = true;
      for (let i = 0; i < n; i += 1) {
        e.apply({ type: 'set_node', path: [i], properties: { lift: undefined }, newProperties: { lift: 1 } });
        e.apply({ type: 'remove_text', path: [i, 0], offset: 1, text: '🙂' });
        e.apply({ type: 'insert_node', path: [i, 1], node: { type: 'emoji', children: [{ text: '' }] } });
        e.apply({ type: 'insert_node', path: [i, 2], node: { text: '' } });
      }
      settling = false;
    });
  } };
}
for (const quiet of [false, true]) for (const n of [200, 1000, 2000]) {
  const ms = []; for (let r = 0; r < 5; r += 1) { const { e, run } = make(n, quiet); const t = performance.now(); run(); ms.push(performance.now() - t); }
  ms.sort((a, b) => a - b); console.log(JSON.stringify({ quiet, n, medianMs: +ms[2].toFixed(1), perOpUs: +(ms[2] * 1000 / (4 * n)).toFixed(1) }));
}
