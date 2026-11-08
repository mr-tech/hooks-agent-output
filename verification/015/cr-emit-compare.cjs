// Code-review instrument: for each file changed between two commits, transpiles both versions with
// TypeScript (types and comments erased) and compares the emitted JavaScript's syntax tree: node kinds,
// operators, and identifier and literal texts, in order. Layout, line breaks that ASI ignores and trailing
// commas leave no node, so they compare equal; an ASI-relevant break (`return` then a newline) changes
// the tree. Equal trees mean the change cannot alter runtime behaviour for any input.
// Positive controls: one inserted token and one ASI-relevant break must each be detected; layout and a
// trailing comma must each be ignored.
// Usage: node cr-emit-compare.cjs <website-repo> <sha-a> <sha-b>
const { execFileSync } = require('child_process');
const path = require('path');

const [repo, a, b] = process.argv.slice(2);
const ts = require(path.join(repo, 'node_modules/typescript'));
const git = (...args) => execFileSync('git', ['-C', repo, ...args], { encoding: 'utf8', maxBuffer: 1 << 26 });

const emitText = (text, file) => ts.transpileModule(text, {
  fileName: file,
  compilerOptions: {
    target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.ReactJSX, removeComments: true,
  },
}).outputText;

function tokens(js) {
  const sf = ts.createSourceFile('emit.js', js, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
  const out = [];
  const visit = (node) => {
    const text = ts.isIdentifier(node) || ts.isPrivateIdentifier(node) || ts.isLiteralExpression(node)
      || ts.isTemplateLiteralLikeNode?.(node) || node.kind === ts.SyntaxKind.NoSubstitutionTemplateLiteral
      || (node.kind >= ts.SyntaxKind.FirstTemplateToken && node.kind <= ts.SyntaxKind.LastTemplateToken)
      ? `:${node.text}` : '';
    const op = ts.isBinaryExpression(node) ? `:${node.operatorToken.kind}`
      : (ts.isPrefixUnaryExpression(node) || ts.isPostfixUnaryExpression(node)) ? `:${node.operator}` : '';
    out.push(`${node.kind}${op}${text}`);
    ts.forEachChild(node, visit);
    out.push(')');
  };
  visit(sf);
  if (sf.parseDiagnostics?.length) out.push(`PARSE-ERRORS:${sf.parseDiagnostics.length}`);
  return out.join('\u0000');
}

const files = git('diff', '--name-only', a, b).split('\n').filter((f) => /\.(ts|tsx|mjs)$/.test(f));
let differing = 0;
for (const file of files) {
  const ta = tokens(emitText(git('show', `${a}:${file}`), file));
  const tb = tokens(emitText(git('show', `${b}:${file}`), file));
  const same = ta === tb;
  if (!same) differing += 1;
  console.log(`${same ? 'IDENTICAL' : 'DIFFERS  '} tokens=${ta.split('\u0000').length}/${tb.split('\u0000').length} ${file}`);
}
const base = 'function f(x) {\n  return x + 1;\n}\n';
const extraToken = tokens(base) !== tokens(base.replace('x + 1', 'x + 1 + 0'));
const asiBreak = tokens(base) !== tokens(base.replace('return x', 'return\nx'));
const layoutOnly = tokens(base) === tokens(base.replace('f(x)', 'f(\n  x\n)'));
const destructure = 'const g = ({ a, b }) => a + b;\n';
const trailingComma = tokens(destructure) === tokens(destructure.replace('b }', 'b, }'));
console.log(`files=${files.length} differing=${differing} controls: extra-token-detected=${extraToken} asi-break-detected=${asiBreak} layout-only-ignored=${layoutOnly} trailing-comma-ignored=${trailingComma}`);
