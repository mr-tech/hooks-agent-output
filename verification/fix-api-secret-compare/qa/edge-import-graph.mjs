// edge-import-graph: does a module enter an entry point's project-local import graph?
// Usage: node edge-import-graph.mjs <website export root> <esbuild package dir>
// Bundles each entry (no output written) with every bare package external, resolving the
// tsconfig paths ~/* and bot/* via the export's tsconfig.json, and prints the project-local inputs
// and the external packages each entry reaches. Positive control: interactions-server.ts must reach
// secretEquals.ts and crypto; the edge route must reach neither for the hazard to be clear.
// Bound: esbuild follows static and string-literal dynamic imports; a computed dynamic import is
// outside it (none at this tree's edge route, by its own imports).
import { createRequire } from 'node:module';
import { join } from 'node:path';

const [root, esbuildDir] = process.argv.slice(2);
const esbuild = createRequire(join(esbuildDir, 'package.json'))(esbuildDir);

// esbuild 0.14's metafile omits external imports, so the plugin records each one as it resolves it.
let seenExternal = new Set();
const externals = {
  name: 'externals',
  setup(build) {
    build.onResolve({ filter: /^[^./~]/ }, (args) => {
      if (args.path.startsWith('bot/')) return undefined;
      seenExternal.add(args.path);
      return { path: args.path, external: true };
    });
  },
};

const entries = ['src/pages/api/interactions-edge.ts', 'src/pages/api/interactions-server.ts'];
let ok = true;
for (const entry of entries) {
  const result = await esbuild.build({
    absWorkingDir: root,
    entryPoints: [entry],
    bundle: true,
    write: false,
    metafile: true,
    platform: 'neutral',
    format: 'esm',
    tsconfig: join(root, 'tsconfig.json'),
    plugins: [externals],
    logLevel: 'silent',
  });
  const inputs = Object.keys(result.metafile.inputs).sort();
  const ext = seenExternal;
  seenExternal = new Set();
  const reachesSecret = inputs.some((p) => p.endsWith('server/api/utils/secretEquals.ts'));
  const reachesCrypto = [...ext].some((p) => p === 'crypto' || p === 'node:crypto');
  console.log(`== ${entry}`);
  console.log(`local inputs (${inputs.length}):`);
  for (const p of inputs) console.log(`  ${p}`);
  console.log(`external packages: ${[...ext].sort().join(', ')}`);
  console.log(`reaches secretEquals.ts: ${reachesSecret}; reaches crypto: ${reachesCrypto}`);
  if (entry.includes('interactions-edge') && (reachesSecret || reachesCrypto)) ok = false;
  if (entry.includes('interactions-server') && !(reachesSecret && reachesCrypto)) ok = false;
}
console.log(ok ? 'RESULT: edge route clear; positive control fires' : 'RESULT: FAIL');
process.exit(ok ? 0 : 1);
