// Reviewer's probe, website e58f2ed (M4 round): which heading levels does @discord/markdown-wasm 0.16.0 emit? Run from an export with node_modules, under unshare -rn.
import { createRequire } from 'node:module';
const req = createRequire(process.cwd() + '/package.json');
const w = await import(req.resolve('@discord/markdown-wasm'));
for (const t of ['# a', '## a', '### a', '#### a', '##### a', '-# a', '#a', '> #### a']) {
  const tree = w.parseLossless(t, w.Syntax.ALL);
  const kinds = []; const walk = (n) => { if (n.kind.type === 'heading' || n.kind.type === 'subtext') kinds.push(JSON.stringify(n.kind.value ?? null)); n.children.forEach((c) => c.type === 'node' && walk(c)); };
  walk(tree); console.log(JSON.stringify(t), kinds.length ? kinds.join(',') : 'no heading');
}
