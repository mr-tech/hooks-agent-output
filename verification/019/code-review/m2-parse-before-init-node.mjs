// Calls the pinned engine's parseLossless with no init() under Node, at website 22f3e58.
// Usage: node m2-parse-before-init-node.mjs <website clone or export with its node_modules>
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
const root = process.argv[2];
const entry = createRequire(`${root}/package.json`).resolve('@discord/markdown-wasm');
const wasm = await import(pathToFileURL(entry).href);
try {
  const doc = wasm.parseLossless('**a**', 0x3fffffff);
  console.log('parsed without init:', JSON.stringify(doc).slice(0, 160));
} catch (error) {
  console.log('threw without init:', error.name, error.message);
}
