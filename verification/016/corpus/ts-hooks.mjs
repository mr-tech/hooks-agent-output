// Module hooks for running website TypeScript under Node 24's own type stripping.
// Resolves `~/x` to `<WEBSITE_ROOT>/src/x`, tries .ts, .tsx and /index.ts(x) on extensionless
// relative or aliased imports, and loads .ts and .tsx as module-typescript.
// Usage: WEBSITE_ROOT=<export> node --experimental-transform-types --import ./ts-register.mjs <entry>
import { existsSync } from 'node:fs';
import { pathToFileURL, fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = process.env.WEBSITE_ROOT;
const EXTS = ['', '.ts', '.tsx', '/index.ts', '/index.tsx'];

function tryFile(base) {
  for (const e of EXTS) {
    const p = base + e;
    if (existsSync(p) && !p.endsWith('/')) {
      try { if (!require_isDir(p)) return p; } catch { /* fall through */ }
    }
  }
  return null;
}
import { statSync } from 'node:fs';
function require_isDir(p) { return statSync(p).isDirectory(); }

export async function resolve(spec, ctx, next) {
  let base = null;
  if (spec.startsWith('~/')) base = path.join(ROOT, 'src', spec.slice(2));
  else if ((spec.startsWith('./') || spec.startsWith('../')) && ctx.parentURL?.startsWith('file:')) {
    base = path.resolve(path.dirname(fileURLToPath(ctx.parentURL)), spec);
  }
  if (base) {
    const hit = tryFile(base);
    if (hit) return { url: pathToFileURL(hit).href, shortCircuit: true };
  }
  return next(spec, ctx);
}

export async function load(url, ctx, next) {
  if (url.endsWith('.ts') || url.endsWith('.tsx')) {
    const r = await next(url, { ...ctx, format: 'module-typescript' });
    return { ...r, format: 'module-typescript', shortCircuit: true };
  }
  return next(url, ctx);
}
