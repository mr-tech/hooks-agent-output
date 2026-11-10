#!/usr/bin/env node
// Usage: token-stream-diff.js <repo> <before> <after> <sweepBase> <sweepTip> [--control=<kind>:<path>]
// Reviewer's instrument, shaped differently from the fixer's printed-AST check: it compares the
// parser's leaf-token sequence (kind + text) of every changed path, and the multiset of comment ranges
// attached to those leaves. PASS needs, per path: identical leaf tokens; after-comments a sub-multiset
// of before-comments; every removed comment one the sweep range removed from that path; no removed
// comment matching comment-gate.js ALLOW (a directive). Blind spot: whitespace between tokens and
// line breaks are invisible, so a reformat passes; comments are compared as raw text.
// --control mutates the after-text in memory only: token (append `;void 0;`), comment (add a line
// comment), directive (prepend `// @ts-expect-error` to before-text so its removal shows).
const { execFileSync } = require('child_process');
const path = require('path');
const [repo, before, after, sBase, sTip, ctl] = process.argv.slice(2);
const ts = require(path.join(repo, 'node_modules/typescript'));
const git = (...a) => execFileSync('git', ['-C', repo, ...a], { encoding: 'utf8', maxBuffer: 1 << 28 });
const show = (sha, p) => { try { return git('show', `${sha}:${p}`); } catch { return null; } };
const ALLOW = [/^eslint-(disable|enable|env)\b/, /^eslint-disable-(next-)?line\b/, /^@ts-(expect-error|ignore|nocheck|check)\b/,
  /^biome-ignore\b/, /^prettier-ignore\b/, /^(c8|v8|istanbul|node:coverage)\s+ignore\b/, /^\/\s*<reference\b/,
  /^@(deprecated|internal|public|private|alpha|beta|experimental)\b/, /^(SPDX-License-Identifier|@license|@preserve|@copyright)\b/,
  /^(escaped|artefact):\s/, /^#__PURE__/, /^@(vitest|jest)-environment\b/, /^@type\s*\{/, /^@typedef\b/, /^globals?\s/];
const body = (raw) => (raw.startsWith('//') ? raw.slice(2) : raw.slice(2).replace(/\*\/$/, ''))
  .split('\n').map((l) => l.replace(/^\s*\*+/, '').trim()).filter(Boolean);
const directive = (raw) => body(raw).some((l) => ALLOW.some((r) => r.test(l)));
function scan(p, text) {
  const kind = /\.tsx$/.test(p) ? ts.ScriptKind.TSX : /\.jsx?$/.test(p) ? ts.ScriptKind.JSX : ts.ScriptKind.TS;
  const sf = ts.createSourceFile(p, text, ts.ScriptTarget.Latest, true, kind);
  const toks = [], seen = new Map();
  const add = (rs) => (rs || []).forEach((r) => seen.set(r.pos, text.slice(r.pos, r.end)));
  (function walk(n) {
    const kids = n.getChildren(sf).filter((k) => !(k.kind >= ts.SyntaxKind.FirstJSDocNode && k.kind <= ts.SyntaxKind.LastJSDocNode));
    if (!kids.length) { toks.push(`${n.kind}:${n.getText(sf)}`); add(ts.getLeadingCommentRanges(text, n.pos)); add(ts.getTrailingCommentRanges(text, n.end)); }
    else kids.forEach(walk);
  })(sf);
  return { toks, comments: [...seen.values()] };
}
const minus = (a, b) => { const m = new Map(); b.forEach((x) => m.set(x, (m.get(x) || 0) + 1)); return a.filter((x) => { const c = m.get(x) || 0; if (c) { m.set(x, c - 1); return false; } return true; }); };
const [ck, cp] = ctl ? ctl.replace(/^--control=/, '').split(':') : [];
const files = git('diff', '--name-only', before, after).split('\n').filter(Boolean);
const sweepFiles = new Set(git('diff', '--name-only', sBase, sTip).split('\n').filter(Boolean));
let fail = 0, removedTotal = 0;
for (const p of files) {
  let b = show(before, p), a = show(after, p);
  if (p === cp) { if (ck === 'token') a += '\n;void 0;\n'; if (ck === 'comment') a += '\n// added prose\n'; if (ck === 'directive') { b = '// @ts-expect-error\n' + b; } }
  const out = [];
  if (b === null || a === null) out.push('added-or-deleted path');
  else if (!/\.[cm]?[jt]sx?$/.test(p)) out.push('non-JS/TS path');
  else {
    const B = scan(p, b), A = scan(p, a);
    if (B.toks.length !== A.toks.length || B.toks.some((t, i) => t !== A.toks[i])) {
      const i = B.toks.findIndex((t, k) => t !== A.toks[k]); out.push(`TOKENS differ at leaf ${i}: before=${JSON.stringify(B.toks[i])} after=${JSON.stringify(A.toks[i])}`);
    }
    const added = minus(A.comments, B.comments); if (added.length) out.push(`ADDED comments: ${JSON.stringify(added)}`);
    const removed = minus(B.comments, A.comments); removedTotal += removed.length;
    removed.filter(directive).forEach((c) => out.push(`DIRECTIVE removed: ${JSON.stringify(c)}`));
    if (!sweepFiles.has(p)) out.push('path outside sweep range');
    else {
      const sb = show(sBase, p), st = show(sTip, p);
      const sweepRemoved = minus(scan(p, sb).comments, scan(p, st).comments);
      const unmatched = minus(removed, sweepRemoved); if (unmatched.length) out.push(`UNMATCHED removals: ${JSON.stringify(unmatched)}`);
    }
  }
  if (out.length) { fail++; console.log(`FAIL ${p}\n  ${out.join('\n  ')}`); }
}
console.log(`${fail ? 'FAIL' : 'PASS'}: ${files.length} paths, ${fail} failing, ${removedTotal} comments removed`);
process.exit(fail ? 1 : 0);
