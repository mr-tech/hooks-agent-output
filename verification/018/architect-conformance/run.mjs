import { createRequire } from 'node:module';
const require = createRequire('/usr/local/bin/hooks/website/package.json');
const superjson = require('superjson').default ?? require('superjson');
const which = process.argv[2]; const depth = Number(process.argv[3]);
const { discordMessageShape } = await import('./' + which + '.ts');
const sep = '{"type":14,"divider":true,"spacing":1}';
const wire = '{"json":{"components":[' + '{"type":17,"components":['.repeat(depth) + '{"type":10,"content":"x"}' + ']}'.repeat(depth) + (',' + sep).repeat(40) + ']}}';
let back;
let parsed; try { parsed = JSON.parse(wire); } catch (e) { console.log('JSON.parse threw', e.message); process.exit(0); }
try { back = superjson.deserialize(parsed); console.log('superjson ok, bytes', wire.length); }
catch (e) { console.log('superjson threw', e.constructor.name, e.message); process.exit(0); }
try { const r = discordMessageShape.safeParse(back); console.log(which, 'depth', depth, 'success', r.success, 'issues', r.success ? 0 : r.error.issues.length, r.success ? '' : JSON.stringify(r.error.issues.map(i => [i.code, i.path.join('.')]).slice(0,3))); }
catch (e) { console.log(which, 'depth', depth, 'safeParse THREW', e.constructor.name, e.message); }
