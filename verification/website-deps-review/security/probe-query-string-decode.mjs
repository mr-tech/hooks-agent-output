// Times the call expression of website src/app/_components/Providers.tsx `getMessage`
//   queryString.parse(decodeURIComponent(encodedQuery))
// over a header value an unauthenticated client can send as `x-query-params`.
//
// Usage:
//   node <this file> <website-root> <tokens> [<tokens> ...]
// <website-root> is a website tree with node_modules installed. Each <tokens> is the number of
// 3-byte percent tokens in the malformed run. The header value is encodeURIComponent(payload), as
// the header must survive the native decodeURIComponent first.
// Prints one JSON line per size: tokens, header bytes, elapsed ms, and whether parse threw.
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const [, , root, ...sizes] = process.argv;
const require = createRequire(path.join(root, 'package.json'));
const qsPath = require.resolve('query-string');
const { default: queryString } = await import(pathToFileURL(qsPath).href);

// Walk up from a resolved entry file to the package.json that names the package.
function versionOf(entryFile, name) {
  let dir = path.dirname(entryFile);
  for (;;) {
    const candidate = path.join(dir, 'package.json');
    if (fs.existsSync(candidate)) {
      const pkg = JSON.parse(fs.readFileSync(candidate, 'utf8'));
      if (pkg.name === name) return pkg.version;
    }
    const parent = path.dirname(dir);
    if (parent === dir) return 'unknown';
    dir = parent;
  }
}

const ducPath = createRequire(qsPath).resolve('decode-uri-component');
console.log(JSON.stringify({
  queryString: versionOf(qsPath, 'query-string'),
  decodeUriComponent: versionOf(ducPath, 'decode-uri-component'),
  node: process.version,
}));

for (const s of sizes) {
  const n = Number(s);
  // A run of lone UTF-8 lead bytes: every token is well-formed percent syntax, the run is not valid UTF-8.
  const payload = `code=${'%C3'.repeat(n)}`;
  const header = encodeURIComponent(payload);
  const started = process.hrtime.bigint();
  let threw = null;
  try {
    queryString.parse(decodeURIComponent(header));
  } catch (err) {
    threw = `${err.name}: ${String(err.message).slice(0, 80)}`;
  }
  const ms = Number(process.hrtime.bigint() - started) / 1e6;
  console.log(JSON.stringify({ tokens: n, headerBytes: header.length, ms: Math.round(ms), threw }));
}
