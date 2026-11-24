import { createRequire } from 'module';
const require = createRequire('/usr/local/bin/hooks/website/package.json');
const w = await import(require.resolve('@discord/markdown-wasm'));
if (w.init) await w.init();
for (const t of ['😄:smile:', '\\*a😄']) console.log(JSON.stringify(t), JSON.stringify(w.parseLossless(t, 0x3fffffff)));
