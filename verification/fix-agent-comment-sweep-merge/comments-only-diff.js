#!/usr/bin/env node
'use strict';

const path = require('path');
const { execFileSync } = require('child_process');

const args = process.argv.slice(2);
if (args.length !== 3 && !(args.length === 6 && args[3] === '--sweep')) {
  console.error('usage: comments-only-diff.js <repo> <before-ref> <after-ref> [--sweep <base-ref> <tip-ref>]');
  process.exit(2);
}
const [repo, before, after] = args;
const sweep = args.length === 6 ? { base: args[4], tip: args[5] } : null;

let ts;
try { ts = require(path.join(repo, 'node_modules', 'typescript')); } catch {
  console.error(`no typescript under ${repo}/node_modules`);
  process.exit(2);
}

const git = (...a) => execFileSync('git', ['-C', repo, ...a], { encoding: 'utf8', maxBuffer: 1 << 28 });
const show = (ref, file) => {
  try { return git('show', `${ref}:${file}`); } catch { return null; }
};
const changed = (a, b) => git('diff', '--name-only', '--no-renames', a, b).split('\n').filter(Boolean);

const CODE = /\.(ts|tsx|mts|cts|js|jsx|mjs|cjs)$/;
const kindOf = (f) => (/x$/.test(f) ? ts.ScriptKind.TSX : (/\.[mc]?js$/.test(f) ? ts.ScriptKind.JS : ts.ScriptKind.TS));
const parse = (f, text) => ts.createSourceFile(f, text, ts.ScriptTarget.Latest, true, kindOf(f));
const printer = ts.createPrinter({ removeComments: true });

function commentsOf(f, text) {
  const sf = parse(f, text);
  const seen = new Map();
  const add = (r) => { if (r && !seen.has(r.pos)) seen.set(r.pos, text.slice(r.pos, r.end)); };
  const visit = (node) => {
    (ts.getLeadingCommentRanges(text, node.getFullStart()) || []).forEach(add);
    (ts.getTrailingCommentRanges(text, node.getEnd()) || []).forEach(add);
    node.getChildren(sf).forEach(visit);
  };
  visit(sf);
  return [...seen.values()];
}

function minus(a, b) {
  const left = new Map();
  for (const x of b) left.set(x, (left.get(x) || 0) + 1);
  const out = [];
  for (const x of a) {
    const n = left.get(x) || 0;
    if (n > 0) left.set(x, n - 1); else out.push(x);
  }
  return out;
}

const fails = [];
const report = [];
const files = changed(before, after);
const sweepFiles = sweep ? new Set(changed(sweep.base, sweep.tip)) : null;
let removedTotal = 0;
let unmatchedTotal = 0;
let addedTotal = 0;

function hunksOf(a, b, f) {
  const out = [];
  let cur = null;
  for (const line of git('diff', '-U0', '--no-renames', a, b, '--', f).split('\n')) {
    if (line.startsWith('@@')) { cur = { minus: [], plus: [] }; out.push(cur); continue; }
    if (!cur || line.startsWith('+++') || line.startsWith('---')) continue;
    if (line.startsWith('+')) cur.plus.push(line.slice(1));
    else if (line.startsWith('-')) cur.minus.push(line.slice(1));
  }
  return out;
}

for (const f of files) {
  const a = show(before, f);
  const b = show(after, f);
  if (!CODE.test(f)) { fails.push(`${f}: not a JS/TS source file`); continue; }
  if (a === null || b === null) { fails.push(`${f}: absent on one side (${a === null ? before : after})`); continue; }
  if (sweepFiles && !sweepFiles.has(f)) fails.push(`${f}: changed here but not by the sweep range`);
  const pa = printer.printFile(parse(f, a));
  const pb = printer.printFile(parse(f, b));
  if (pa !== pb) fails.push(`${f}: code differs with comments removed`);
  const ca = commentsOf(f, a);
  const cb = commentsOf(f, b);
  const added = minus(cb, ca);
  for (const c of added) fails.push(`${f}: comment present after but not before: ${JSON.stringify(c.slice(0, 80))}`);
  const removed = minus(ca, cb);
  removedTotal += removed.length;
  let unmatched = [];
  if (sweep) {
    const sa = show(sweep.base, f);
    const sb = show(sweep.tip, f);
    const sweepRemoved = sa === null || sb === null ? [] : minus(commentsOf(f, sa), commentsOf(f, sb));
    unmatched = minus(removed, sweepRemoved);
    unmatchedTotal += unmatched.length;
  }
  const norm = (s) => s.replace(/\s+/g, ' ').trim();
  let addedLines = 0;
  for (const h of hunksOf(before, after, f)) {
    for (const l of h.plus) {
      addedLines += 1;
      const ok = h.minus.some((r) => removed.some((c) => r.includes(c) && norm(r.replace(c, '')) === norm(l)));
      if (!ok) fails.push(`${f}: added line is no removed line minus a removed comment: ${JSON.stringify(l.slice(0, 120))}`);
    }
  }
  addedTotal += addedLines;
  report.push(`${f}: removed=${removed.length} addedLines=${addedLines}${sweep ? ` unmatched=${unmatched.length}` : ''}`);
  for (const c of unmatched) report.push(`  UNMATCHED ${JSON.stringify(c.slice(0, 160))}`);
}

console.log(`before=${git('rev-parse', before).trim()} after=${git('rev-parse', after).trim()}`);
if (sweep) console.log(`sweep=${git('rev-parse', sweep.base).trim()}..${git('rev-parse', sweep.tip).trim()} sweepFiles=${sweepFiles.size}`);
console.log(`files=${files.length} commentsRemoved=${removedTotal} addedLines=${addedTotal}${sweep ? ` unmatched=${unmatchedTotal}` : ''}`);
for (const r of report) console.log(r);
for (const x of fails) console.log(`FAIL ${x}`);
console.log(fails.length ? `RESULT FAIL (${fails.length})` : 'RESULT PASS');
process.exit(fails.length ? 1 : 0);
