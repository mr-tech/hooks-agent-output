// QA Phase 3 (plan 017): the call-deletion set the effort-final Assumption Not Checked owes.
//
// Usage: node call-deletion-gen.mjs --repo DIR --base SHA --tip SHA --ts PATH_TO_typescript.js --out FILE FILE...
//
// Predicate (members), over each named production FILE at --tip, restricted to lines the range changed
// by `git diff -w -U0 <base> <tip>` (whitespace-only changes are not behaviour changes):
//   stmt   an ExpressionStatement whose expression, after stripping parentheses, `await` and `void`, is a
//          CallExpression. Mutant: the statement replaced by `;` (an empty statement, valid in every
//          statement position, braceless `if` bodies included).
//   attr   a JsxAttribute or JsxSpreadAttribute. Mutant: the attribute removed.
//   wrap   a CallExpression whose callee is the identifier `waitUntil` with one argument. Mutant: the call
//          replaced by its argument.
// A member is on a changed line when the line its node starts on is a changed line.
// Exclusions (not generated): calls whose value is consumed (operands, arguments, initialisers, returns,
// expression-bodied arrows); these are reached, where at all, by mutant-gen's operator classes.
// Placement: "old" is the node text, widened backwards a line at a time (at most 4 lines) until it occurs
// exactly once in the file; a member still not unique is reported UNPLACED, never dropped silently.
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const args = process.argv.slice(2);
const opt = (k) => { const i = args.indexOf(k); if (i < 0) throw new Error(`missing ${k}`); const v = args[i + 1]; args.splice(i, 2); return v; };
const repo = opt('--repo'); const base = opt('--base'); const tip = opt('--tip');
const ts = createRequire(import.meta.url)(opt('--ts')); const out = opt('--out');
const files = args;

function changedLines(file) {
  const diff = execFileSync('git', ['-C', repo, 'diff', '-w', '-U0', base, tip, '--', file], { encoding: 'utf8' });
  const set = new Set();
  for (const m of diff.matchAll(/^@@ -\S+ \+(\d+)(?:,(\d+))? @@/gm)) {
    const start = Number(m[1]); const n = m[2] === undefined ? 1 : Number(m[2]);
    for (let i = 0; i < n; i += 1) set.add(start + i);
  }
  return set;
}

const count = (hay, needle) => { let c = 0; let i = hay.indexOf(needle); while (i >= 0) { c += 1; i = hay.indexOf(needle, i + 1); } return c; };

const mutants = []; const unplaced = []; const perFile = {};
for (const file of files) {
  const src = execFileSync('git', ['-C', repo, 'show', `${tip}:${file}`], { encoding: 'utf8' });
  const lines = changedLines(file);
  const kind = file.endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, kind);
  const lineOf = (pos) => sf.getLineAndCharacterOfPosition(pos).line + 1;
  perFile[file] = { changedLines: lines.size, stmt: 0, attr: 0, wrap: 0 };
  const add = (op, node, replacement) => {
    const start = node.getStart(sf); const end = node.getEnd(); const line = lineOf(start);
    let from = start; let old = src.slice(from, end); let widen = 0;
    while (count(src, old) !== 1 && widen < 4) {
      const prevNl = src.lastIndexOf('\n', from - 2); from = prevNl < 0 ? 0 : prevNl + 1; old = src.slice(from, end); widen += 1;
    }
    const prefix = src.slice(from, start);
    const rec = { id: `${file.split('/').pop()}:${line}:${op}`, file, old, new: prefix + replacement, op, line, text: src.slice(start, end).split('\n')[0].trim().slice(0, 160) };
    if (count(src, old) !== 1) { unplaced.push(rec); return; }
    const dup = mutants.filter((m) => m.id === rec.id || m.id.startsWith(`${rec.id}:`)).length;
    if (dup) rec.id = `${rec.id}:${dup + 1}`;
    mutants.push(rec); perFile[file][op] += 1;
  };
  const strip = (e) => { let x = e; for (;;) { if (ts.isParenthesizedExpression(x) || ts.isAwaitExpression(x) || ts.isVoidExpression(x)) x = x.expression; else return x; } };
  const visit = (node) => {
    const onChanged = () => lines.has(lineOf(node.getStart(sf)));
    if (ts.isExpressionStatement(node) && ts.isCallExpression(strip(node.expression)) && onChanged()) add('stmt', node, ';');
    if ((ts.isJsxAttribute(node) || ts.isJsxSpreadAttribute(node)) && onChanged()) add('attr', node, '');
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 'waitUntil' && node.arguments.length === 1 && onChanged()) {
      add('wrap', node, node.arguments[0].getText(sf));
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
}
writeFileSync(out, `${JSON.stringify(mutants, null, 1)}\n`);
console.log(JSON.stringify({ base, tip, files: files.length, mutants: mutants.length, unplaced: unplaced.length, perFile }, null, 1));
for (const u of unplaced) console.log('UNPLACED', u.id, u.text);
